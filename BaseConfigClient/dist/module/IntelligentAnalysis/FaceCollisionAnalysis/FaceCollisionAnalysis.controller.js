define(["require", "exports", "text!../../selectPopup/checkAreaPopup/check.area.popup.html", "text!../loading/loading.html", "../../common/app/main.app", "../AnalysisEnum", "./FaceCollisionAnalysis", "../../common/Pagination", "../../../core/server/enum/AnalyseTaskOffLine", "../../../core/enum/ObjectType", "../../../core/server/enum/CollectDataType", "../../../core/server/enum/AnalysisDataType", "lodash", "../../common/factory/layerMsg.factory", "../../common/services/analysis.service", "../../common/factory/userinfo.cache.factory", "../main/analysisMmap.server", "../../common/services/resourceRetrieval.service", "../../common/factory/HandleStorage.factory", "../../selectPopup/checkAreaPopup/check.area.popup.controller"], function (require, exports, PopupHtml, loadingAnalysisHtml, main_app_1, AnalysisEnum_1, FaceCollisionAnalysis_1, Pagination_1, AnalyseTaskOffLine_1, ObjectType_1, CollectDataType_1, AnalysisDataType_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FaceCollisionAnalysisController = (function () {
        function FaceCollisionAnalysisController($scope, $timeout, analysisService, layer, analysisMmapServer, layerDec, userInfoCacheFactory, resourceRetrievalService, $interval, handleStorage) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.analysisService = analysisService;
            this.layer = layer;
            this.analysisMmapServer = analysisMmapServer;
            this.layerDec = layerDec;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.resourceRetrievalService = resourceRetrievalService;
            this.$interval = $interval;
            this.handleStorage = handleStorage;
            this.FaceCollisionAnalysisParams = [];
            this.FastDateList = AnalysisEnum_1.getdataList();
            this.FastDate = [];
            this.showForm = true;
            this.showResult = false;
            this.showAnalysisList = false;
            this.resultParams = new Pagination_1.PageParamsAndResult();
            this.selectDrawArr = [];
            this.windowHeight = AnalysisEnum_1.getWidowSize().height;
            this.Similarity = 90;
            this.showAllResult = false;
            this.checkResult = [];
            this.resultForMap = {};
            this.pagination = new Pagination_1.Pagination();
            this.QueryAnalysisParams = new FaceCollisionAnalysis_1.QueryAnalysisParams();
            this.minValue = 80;
            this.maxValue = 100;
            this.windowWidth = AnalysisEnum_1.getWidowSize().width - 60;
            this.selectDeviceCb = "close.device.popup";
            this.analysisGoTo = AnalysisDataType_1.AnalysisGoToType;
            var self = this;
            self.QueryAnalysisParams = self.initParams();
            self.$scope.$on('$destroy', function () {
                try {
                    self.analysisMmapServer.clearDraw();
                    self.destoryForMapMarker();
                }
                catch (e) {
                    console.error('触发直接销毁Map事件，导致map对象被销毁，轨迹触发自身的销毁事件中无法获取map对象导致的报错，可以忽略！', e);
                }
                $interval.cancel(self.setInterval);
            });
            self.$timeout(function () {
                self.$scope.$emit('showItemPage', true);
            });
            self.getAccompOffLineList();
            self.$scope.$on(self.selectDeviceCb, function (event, deviceIds, status, geometry, type) {
                if (status) {
                    if (deviceIds.length === 0) {
                        self.layerDec.warnInfo('框选区域不存在摄像机设备！');
                        self.analysisMmapServer.removeDrawShape(geometry);
                    }
                    else {
                        self.addArea();
                        self.selectDrawArr.push(geometry);
                        self.$timeout(function () {
                            self.FaceCollisionAnalysisParams[self.FaceCollisionAnalysisParams.length - 1].arrCameraId = deviceIds;
                            self.setFastDate(AnalysisEnum_1.FastData.today, self.FaceCollisionAnalysisParams.length - 1);
                        });
                    }
                }
                else {
                    self.analysisMmapServer.removeDrawShape(geometry);
                }
                self.layer.close(self.currentLayerIndex);
            });
            self.setInterval = $interval(function () {
                self.getAccompOffLineList();
            }, 10000);
        }
        FaceCollisionAnalysisController.prototype.initParams = function () {
            if (this.FaceCollisionAnalysisParams.length) {
                this.analysisMmapServer.clearDraw();
            }
            this.FaceCollisionAnalysisParams = [];
            var params = new FaceCollisionAnalysis_1.QueryAnalysisParams();
            params.taskName = "";
            params.threshold = 90;
            params.impactArr = [];
            return params;
        };
        FaceCollisionAnalysisController.prototype.destoryForMapMarker = function () {
            this.analysisMmapServer.clearTraceAnalyze();
            this.analysisMmapServer.clearResultMarkers();
            this.analysisMmapServer.clearAccpMarkers();
            this.analysisMmapServer.clearTrackInfoWindow();
        };
        FaceCollisionAnalysisController.prototype.DrawRect = function () {
            var _this = this;
            this.analysisMmapServer.drawRect(function (points, geometry) {
                _this.$timeout(function () {
                    _this.DrawCallBackMethod(points, geometry);
                });
            });
        };
        FaceCollisionAnalysisController.prototype.DrawCircle = function () {
            var _this = this;
            this.analysisMmapServer.drawCircle(function (points, geometry) {
                _this.$timeout(function () {
                    _this.DrawCallBackMethod(points, geometry);
                });
            });
        };
        FaceCollisionAnalysisController.prototype.DrawPolygon = function () {
            var _this = this;
            this.analysisMmapServer.drawPolygon(function (points, geometry) {
                _this.$timeout(function () {
                    _this.DrawCallBackMethod(points, geometry);
                });
            });
        };
        FaceCollisionAnalysisController.prototype.DrawCallBackMethod = function (points, geometry) {
            var self = this;
            if (self.FaceCollisionAnalysisParams.length < 5) {
                var arr_1 = [];
                points.forEach(function (item) {
                    if (item.ObjectType === ObjectType_1.ObjectType.Camera.value) {
                        arr_1.push(item);
                    }
                });
                if (arr_1.length === 0) {
                    self.analysisMmapServer.removeDrawShape(geometry);
                    return self.layerDec.warnInfo('框选区域不存在摄像机设备！');
                }
                self.checkArea(arr_1, geometry);
            }
            else {
                self.analysisMmapServer.removeDrawShape(geometry);
                return self.layerDec.warnInfo('碰撞区域最大只能有5个！');
            }
        };
        FaceCollisionAnalysisController.prototype.delOffLineTask = function (item) {
            var self = this;
            var params = {
                "taskId": item.TaskId,
                "taskType": item.TaskType
            };
            self.analysisService.deleteOffLineDetail(params).then(function (res) {
                if (res.code === 200) {
                    self.layerDec.info('删除成功');
                    self.getAccompOffLineList();
                }
                else {
                    self.layerDec.warnInfo('删除失败');
                }
            });
        };
        FaceCollisionAnalysisController.prototype.setFastDate = function (item, index) {
            var time;
            switch (item.key) {
                case "today":
                    time = AnalysisEnum_1.getHours(0);
                    break;
                case "lasthour":
                    time = AnalysisEnum_1.getHours(1);
                    break;
                case "lastFourHour":
                    time = AnalysisEnum_1.getHours(6);
                    break;
                case "lastThreeDay":
                    time = AnalysisEnum_1.getHours(12);
                    break;
            }
            this.FaceCollisionAnalysisParams[index].startTime = time.startTime;
            this.FaceCollisionAnalysisParams[index].endTime = time.endTime;
            this.FastDate[index] = item;
        };
        FaceCollisionAnalysisController.prototype.setCheckResult = function (size, traget, isFirst) {
            var self = this;
            var arr = [];
            for (var i = 0; i < size; i++) {
                if (i === traget) {
                    arr.push(!self.checkResult[traget]);
                }
                else {
                    arr.push(false);
                }
            }
            self.resultIndex = traget;
            if (isFirst) {
                arr[traget] = true;
            }
            self.checkResult = arr;
            var params = {
                deviceIds: [],
                deviceType: '',
                ids: [],
                userId: self.userInfoCacheFactory.getCurrentUserId()
            };
            params.deviceType = ObjectType_1.ObjectType.Camera.value;
            _.forEach(self.resultParams.data[traget].FaceCollideAccesses, function (value) {
                params.deviceIds.push(value.AccessLog.CameraID);
                params.ids.push(value.AccessLog.ID);
            });
            self.resourceRetrievalService.getDeviceInfoPromise(params).then(function (res) {
                _.forEach(self.resultParams.data[traget].FaceCollideAccesses, function (item, index) {
                    item.deviceInfo = res.data.deviceInfo[index];
                    item.collectStatus = res.data.collectStatus[index];
                });
                self.$timeout(function () {
                    self.renderMarkersForResult();
                });
            });
        };
        FaceCollisionAnalysisController.prototype.slideResult = function (i) {
            this.setCheckResult(this.resultParams.pageSize, i);
        };
        FaceCollisionAnalysisController.prototype.checkArea = function (deviceList, geometry) {
            var scope = this.$scope.$new();
            scope.deviceList = deviceList;
            scope.geometry = geometry;
            scope.selectCheckAreaCb = this.selectDeviceCb;
            this.currentLayerIndex = this.layer.open({
                type: 1,
                content: PopupHtml,
                scope: scope,
                title: false,
                closeBtn: 0,
                skin: "no-scroll",
                area: ["300px", "300px"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        FaceCollisionAnalysisController.prototype.renderMarkersForResult = function () {
            var accpArr = this.resultParams.data[this.resultIndex].FaceCollideAccesses;
            var obj = {};
            accpArr.forEach(function (item, index) {
                obj[item.AccessLog.ID] = item;
                obj[item.AccessLog.ID].resultIndex = index;
            });
            this.resultForMap = obj;
            this.allResult = accpArr;
            this.analysisMmapServer.renderMakers(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForAccpGroup, true, this.analysisMmapServer.getSystemPointForParams(this.allResult), this.resultForMap, false, null, AnalysisEnum_1.MarkersIcon.NormalGreenIcon);
        };
        FaceCollisionAnalysisController.prototype.openDetailPopup = function (item, index, groupList) {
            var self = this;
            var scope = self.$scope.$new();
            scope.rank = index;
            scope.showFooter = true;
            scope.index = "";
            scope.allList = groupList;
            scope.collectFunction = function (item) {
                self.clickCollect(null, item);
            };
            scope.analysisFunction = function (item, type) {
                self.clickAnalysis(null, item, type);
                self.layer.close(scope.index);
            };
            scope.surveillanceFunction = function (item) {
                self.clickSurveillance(null, item);
            };
            scope.closePopup = function () {
                self.layer.close(scope.index);
            };
            self.analysisMmapServer.openDetailPopup(item, index, self.allResult, ObjectType_1.ObjectType.Camera.value, scope);
        };
        FaceCollisionAnalysisController.prototype.resultToMap = function (item, index, type) {
            this.analysisMmapServer.resultToMap(item, type);
        };
        FaceCollisionAnalysisController.prototype.unResultToMap = function (item, index, type) {
            this.analysisMmapServer.unResultToMap(item, this.resultForMap, type);
        };
        FaceCollisionAnalysisController.prototype.goBack = function () {
            var _this = this;
            this.$timeout(function () {
                _this.$scope.$emit('showItemPage', false);
            });
        };
        FaceCollisionAnalysisController.prototype.goBackForm = function () {
            var _this = this;
            this.$timeout(function () {
                _this.showForm = true;
                _this.showResult = false;
                _this.showAnalysisList = false;
                _this.destoryForMapMarker();
                _this.analysisMmapServer.renderSystemPoint();
            });
        };
        FaceCollisionAnalysisController.prototype.goAllResult = function () {
            this.showForm = false;
            this.showResult = false;
            this.showAllResult = true;
            this.resultParams.pageSize = 40;
            this.resultParams.currentPage = 1;
            this.resultParams = this.pagination.getByPage(this.resultParams);
            this.setCheckResult(this.resultParams.pageSize, 0, true);
        };
        FaceCollisionAnalysisController.prototype.closeAllResult = function () {
            this.showResult = true;
            this.showAllResult = false;
            this.resultParams.currentPage = 1;
            this.resultParams.pageSize = 6;
            this.resultParams = this.pagination.getByPage(this.resultParams);
            this.setCheckResult(this.resultParams.pageSize, 0, true);
        };
        FaceCollisionAnalysisController.prototype.addArea = function () {
            var arr = new FaceCollisionAnalysis_1.FaceCollisionAnalysisParams();
            this.FaceCollisionAnalysisParams.push(arr);
            this.FastDate.push(AnalysisEnum_1.FastData.today);
        };
        FaceCollisionAnalysisController.prototype.delArea = function (i) {
            var geometry = this.selectDrawArr[i];
            this.analysisMmapServer.removeDrawShape(geometry);
            this.FaceCollisionAnalysisParams.splice(i, 1);
            this.selectDrawArr.splice(i, 1);
        };
        FaceCollisionAnalysisController.prototype.showAnalysisResult = function (item) {
            var _this = this;
            var self = this;
            self.initLoadingPop();
            var params = {
                "analyseTaskType": AnalyseTaskOffLine_1.AnalyseTaskType.SearchAnalyseTaskResult,
                "taskId": item.TaskId,
                "TaskType": item.TaskType
            };
            self.analysisService.getOffLineDetail(params).then(function (res) {
                self.layer.close(self.currentLayerIndex);
                if (res.code === 200) {
                    if (res.data && res.data.FaceCollideEntities && res.data.FaceCollideEntities.length) {
                        self.destoryForMapMarker();
                        self.$timeout(function () {
                            self.pagination.set(res.data.FaceCollideEntities);
                        }).then(function () {
                            self.resultParams.pageSize = 6;
                            self.resultParams.currentPage = 1;
                            self.resultParams = self.pagination.getByPage(_this.resultParams);
                            self.allResult = self.pagination.get();
                        }).then(function () {
                            self.showForm = false;
                            self.showResult = true;
                            self.analysisMmapServer.removeSystemPoint();
                            self.setCheckResult(self.resultParams.pageSize, 0, true);
                        });
                    }
                    else {
                        self.layerDec.info('没有查询到结果');
                    }
                }
                else {
                    self.layerDec.warnInfo('查询结果失败');
                }
            });
        };
        FaceCollisionAnalysisController.prototype.submitSearch = function () {
            var self = this;
            var params = new FaceCollisionAnalysis_1.QueryAnalysisParams();
            params.taskName = self.QueryAnalysisParams.taskName;
            params.threshold = self.QueryAnalysisParams.threshold;
            params.impactArr = [];
            var item;
            for (var i = 0; i < self.FaceCollisionAnalysisParams.length; i++) {
                item = this.FaceCollisionAnalysisParams[i];
                item.areaNo = "areaNo" + i;
                params.impactArr.push(item);
            }
            if (params.taskName === "") {
                self.layerDec.warnInfo('请输入任务名称');
                return false;
            }
            if (params.impactArr.length < 2) {
                self.layerDec.warnInfo('最少选择两个区域');
                return false;
            }
            for (var y = 0; y < params.impactArr.length; y++) {
                if (params.impactArr[0].endTime < params.impactArr[0].startTime) {
                    this.layerDec.warnInfo('开始时间不能晚于结束时间!');
                    return false;
                }
            }
            self.initLoadingPop();
            self.analysisService.FaceCollisionAccompanying(params).then(function (res) {
                self.layer.close(self.currentLayerIndex);
                if (res.code === 200) {
                    self.showAnalysisList = true;
                    self.getAccompOffLineList();
                    self.QueryAnalysisParams = self.initParams();
                }
                else {
                    self.layerDec.warnInfo('任务创建失败');
                }
            });
        };
        FaceCollisionAnalysisController.prototype.changeResultPage = function (i) {
            this.resultParams.currentPage = i;
            this.resultParams = this.pagination.getByPage(this.resultParams);
            this.setCheckResult(this.resultParams.pageSize, 0, true);
        };
        FaceCollisionAnalysisController.prototype.getAccompOffLineList = function () {
            var self = this;
            var params = {
                "id": self.userInfoCacheFactory.getCurrentUserId(),
                "taskType": AnalyseTaskOffLine_1.OfflineTaskType.SearchFaceCollision
            };
            self.analysisService.getOffLineList(params).then(function (res) {
                if (res.code === 200 && Array.isArray(res.data)) {
                    var List = [];
                    for (var i = 0; i < res.data.length; i++) {
                        res.data[i].Ext = JSON.parse(res.data[i].Ext);
                        List.push(res.data[i]);
                    }
                    self.FaceCollisionOffLine = List;
                }
            });
        };
        FaceCollisionAnalysisController.prototype.deleteAccompOffLine = function (item) {
            var self = this;
            var params = {
                "taskId": item.TaskId,
                "taskType": item.TaskType
            };
            self.analysisService.deleteOffLineDetail(params).then(function (res) {
                if (res.code === 200) {
                    self.layerDec.warnInfo('删除成功');
                    self.getAccompOffLineList();
                }
            });
        };
        FaceCollisionAnalysisController.prototype.setShowAnalysisList = function (status) {
            this.showAnalysisList = status;
            if (status) {
                this.getAccompOffLineList();
            }
        };
        FaceCollisionAnalysisController.prototype.initLoadingPop = function () {
            var scope = this.$scope.$new();
            this.currentLayerIndex = this.layer.open({
                type: 1,
                content: loadingAnalysisHtml,
                scope: scope,
                title: false,
                area: ['500px', "280px"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        FaceCollisionAnalysisController.prototype.clickCollect = function (event, item) {
            if (event) {
                event.stopPropagation();
            }
            var self = this;
            if (!item.collectStatus) {
                var params = {
                    json: angular.toJson(item),
                    objectID: item.AccessLog.ID,
                    objectType: CollectDataType_1.CollectDataType.Face.value
                };
                self.resourceRetrievalService.collectAddInfo(params)
                    .then(function (res) {
                    if (res) {
                    }
                });
            }
            else {
                var params = {
                    ids: item.AccessLog.ID
                };
                self.resourceRetrievalService.collectDeleteInfo(params)
                    .then(function (res) {
                    if (res) {
                    }
                });
            }
            item.collectStatus = !item.collectStatus;
        };
        FaceCollisionAnalysisController.prototype.clickAnalysis = function (event, item, type) {
            if (event) {
                event.stopPropagation();
            }
            var storageParams = AnalysisDataType_1.AnalysisDataType.Face;
            storageParams.data = item;
            this.handleStorage.setSessionStorageData(storageParams.key, storageParams);
            localStorage.setItem("AnalysisType", "Face");
            if (type === AnalysisDataType_1.AnalysisGoToType.Track.key) {
                window.open(AnalysisDataType_1.AnalysisGoToType.Track.data);
            }
            else if (type === AnalysisDataType_1.AnalysisGoToType.Accompanying.key) {
                window.open(AnalysisDataType_1.AnalysisGoToType.Accompanying.data);
            }
            else if (type === AnalysisDataType_1.AnalysisGoToType.Frequency.key) {
                window.open(AnalysisDataType_1.AnalysisGoToType.Frequency.data);
            }
            else if (type === AnalysisDataType_1.AnalysisGoToType.More.key) {
                window.open(AnalysisDataType_1.AnalysisGoToType.More.data);
            }
        };
        FaceCollisionAnalysisController.prototype.clickSurveillance = function (event, item) {
            if (event) {
                event.stopPropagation();
            }
            item.surveillanceStatus = !item.surveillanceStatus;
        };
        FaceCollisionAnalysisController.prototype.fullScreen = function (event, path) {
            if (event) {
                event.stopPropagation();
            }
            var scope = this.$scope.$new();
            scope.index = "fullScreenPopup";
            scope.path = path;
            if (path) {
                var windowW = $(window).width() * 0.8;
                var windowH = $(window).height() * 0.8;
                var contentHTML = "<img ng-src=" + path + " style='width:" + windowW + "px;height:" + windowH + "px;'>";
                this.layer.open({
                    type: 1,
                    title: false,
                    closeBtn: 0,
                    skin: 'layui-layer-nobg no-scroll',
                    shadeClose: true,
                    shade: 0.6,
                    area: [windowW + 'px', windowH + 'px'],
                    content: contentHTML,
                    scope: scope,
                    end: function () {
                        scope.$destroy();
                    }
                });
            }
            else {
                this.layer.msg("图片地址不存在");
            }
        };
        FaceCollisionAnalysisController.$inject = ['$scope', '$timeout', 'analysisService', 'layer', 'analysisMmapServer', 'layerDec', 'userInfoCacheFactory', "resourceRetrievalService", '$interval', 'handleStorage'];
        return FaceCollisionAnalysisController;
    }());
    main_app_1.app.controller('FaceCollisionAnalysisController', FaceCollisionAnalysisController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9GYWNlQ29sbGlzaW9uQW5hbHlzaXMvRmFjZUNvbGxpc2lvbkFuYWx5c2lzLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBeUNBO1FBOEJJLHlDQUFvQixNQUFXLEVBQ1gsUUFBYSxFQUNiLGVBQWlDLEVBQ2pDLEtBQVUsRUFDVixrQkFBdUMsRUFDdkMsUUFBbUIsRUFDbkIsb0JBQTJDLEVBQzNDLHdCQUFtRCxFQUNuRCxTQUFhLEVBQ2IsYUFBNkI7WUFUN0IsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLGFBQVEsR0FBUixRQUFRLENBQUs7WUFDYixvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7WUFDakMsVUFBSyxHQUFMLEtBQUssQ0FBSztZQUNWLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBcUI7WUFDdkMsYUFBUSxHQUFSLFFBQVEsQ0FBVztZQUNuQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXVCO1lBQzNDLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMkI7WUFDbkQsY0FBUyxHQUFULFNBQVMsQ0FBSTtZQUNiLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtZQW5DakQsZ0NBQTJCLEdBQTZCLEVBQUUsQ0FBQztZQUMzRCxpQkFBWSxHQUE0QiwwQkFBVyxFQUFFLENBQUM7WUFDdEQsYUFBUSxHQUE2QixFQUFFLENBQUM7WUFDeEMsYUFBUSxHQUFZLElBQUksQ0FBQztZQUN6QixlQUFVLEdBQVksS0FBSyxDQUFDO1lBQzVCLHFCQUFnQixHQUFZLEtBQUssQ0FBQztZQUVsQyxpQkFBWSxHQUF3QixJQUFJLGdDQUFtQixFQUFFLENBQUM7WUFDOUQsa0JBQWEsR0FBNEIsRUFBRSxDQUFDO1lBQzVDLGlCQUFZLEdBQVcsMkJBQVksRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUU3QyxlQUFVLEdBQVcsRUFBRSxDQUFDO1lBRXhCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1lBQy9CLGdCQUFXLEdBQW1C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TyxVQUFPLENBQUM7Z0JBQ3pGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO29CQUNaLElBQUksRUFBRSxDQUFDO29CQUNQLEtBQUssRUFBRSxLQUFLO29CQUNaLFFBQVEsRUFBRSxDQUFDO29CQUNYLElBQUksRUFBRSw0QkFBNEI7b0JBQ2xDLFVBQVUsRUFBRSxJQUFJO29CQUNoQixLQUFLLEVBQUUsR0FBRztvQkFDVixJQUFJLEVBQUUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxFQUFFLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBQ3RDLE9BQU8sRUFBRSxXQUFXO29CQUNwQixLQUFLLEVBQUUsS0FBSztvQkFDWixHQUFHLEVBQUU7d0JBQ0QsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUNyQixDQUFDO2lCQUNKLENBQUMsQ0FBQztZQUNQLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUM3QixDQUFDO1FBQ0wsQ0FBQztRQS9rQk0sdUNBQU8sR0FBa0IsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxVQUFVLEVBQUUsc0JBQXNCLEVBQUUsMEJBQTBCLEVBQUUsV0FBVyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBZ2xCM00sc0NBQUM7S0FqbEJELEFBaWxCQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyxpQ0FBaUMsRUFBRSwrQkFBK0IsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL0ZhY2VDb2xsaXNpb25BbmFseXNpcy9GYWNlQ29sbGlzaW9uQW5hbHlzaXMuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vLi4vc2VsZWN0UG9wdXAvY2hlY2tBcmVhUG9wdXAvY2hlY2suYXJlYS5wb3B1cC5odG1sXCIgbmFtZT1cIlBvcHVwSHRtbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vbG9hZGluZy9sb2FkaW5nLmh0bWxcIiBuYW1lPVwibG9hZGluZ0FuYWx5c2lzSHRtbFwiIC8+XHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5cclxuLy8g5pyN5YqhXHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9mYWN0b3J5L2xheWVyTXNnLmZhY3RvcnlcIjtcclxuaW1wb3J0IHtJTGF5ZXJEZWN9IGZyb20gXCIuLi8uLi9jb21tb24vZmFjdG9yeS9sYXllck1zZy5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hbmFseXNpcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SUFuYWx5c2lzU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hbmFseXNpcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9mYWN0b3J5L3VzZXJpbmZvLmNhY2hlLmZhY3RvcnlcIjtcclxuaW1wb3J0IHtJVXNlckluZm9DYWNoZUZhY3Rvcnl9IGZyb20gXCIuLi8uLi9jb21tb24vZmFjdG9yeS91c2VyaW5mby5jYWNoZS5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uL21haW4vYW5hbHlzaXNNbWFwLnNlcnZlclwiO1xyXG5pbXBvcnQge0lBbmFseXNpc01tYXBTZXJ2ZXJ9IGZyb20gXCIuLi9tYWluL2FuYWx5c2lzTW1hcC5zZXJ2ZXJcIjtcclxuaW1wb3J0ICcuLi8uLi9jb21tb24vc2VydmljZXMvcmVzb3VyY2VSZXRyaWV2YWwuc2VydmljZSc7XHJcbmltcG9ydCB7SVJlc291cmNlUmV0cmlldmFsU2VydmljZX0gZnJvbSAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL3Jlc291cmNlUmV0cmlldmFsLnNlcnZpY2UnO1xyXG5pbXBvcnQgJy4uLy4uL2NvbW1vbi9mYWN0b3J5L0hhbmRsZVN0b3JhZ2UuZmFjdG9yeSc7XHJcbmltcG9ydCB7SUhhbmRsZVN0b3JhZ2V9IGZyb20gJy4uLy4uL2NvbW1vbi9mYWN0b3J5L0hhbmRsZVN0b3JhZ2UuZmFjdG9yeSc7XHJcblxyXG4vLyDlvLnmoYZcclxuaW1wb3J0ICcuLi8uLi9zZWxlY3RQb3B1cC9jaGVja0FyZWFQb3B1cC9jaGVjay5hcmVhLnBvcHVwLmNvbnRyb2xsZXInO1xyXG5cclxuLy8g5Y+C5pWwXHJcbmltcG9ydCB7UmVzcG9uc2VSZXN1bHR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHtTeXN0ZW1Qb2ludH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L1N5c3RlbVBvaW50XCI7XHJcbmltcG9ydCB7RmFzdERhdGEsIGdldEZhc3REYXRhTGlzdCwgRW51bSwgVGltZUxlbmd0aCwgZ2V0V2lkb3dTaXplLCBPdmVybGF5TmFtZSwgTWFya2Vyc0ljb24sICBkYXRhLCB0aW1lTGVuZ3RoLCBnZXRkYXRhTGlzdCwgZ2V0SG91cnMsIGRhdGFMaXN0c30gZnJvbSAnLi4vQW5hbHlzaXNFbnVtJztcclxuaW1wb3J0IHtcclxuICAgIEZhY2VDb2xsaXNpb25BbmFseXNpc1BhcmFtcyxcclxuICAgIFF1ZXJ5QW5hbHlzaXNJdGVtLFxyXG4gICAgUXVlcnlBbmFseXNpc1BhcmFtcyxcclxuICAgIEZhY2VDb2xsaXNpb25PZmZMaW5lXHJcbn0gZnJvbSAnLi9GYWNlQ29sbGlzaW9uQW5hbHlzaXMnO1xyXG5pbXBvcnQge1BhZ2luYXRpb24sIElQYWdpbmF0aW9uLCBQYWdlUGFyYW1zQW5kUmVzdWx0fSBmcm9tIFwiLi4vLi4vY29tbW9uL1BhZ2luYXRpb25cIjtcclxuaW1wb3J0IHtJbnRlbGlnZW50VGFza0luZm99IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9JbnRlbGlnZW50VGFza0luZm9cIjtcclxuaW1wb3J0IHtBbmFseXNlVGFza1R5cGUsIE9mZmxpbmVUYXNrVHlwZX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vQW5hbHlzZVRhc2tPZmZMaW5lXCI7XHJcbmltcG9ydCB7T2JqZWN0VHlwZX0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnVtL09iamVjdFR5cGUnO1xyXG5pbXBvcnQge0NvbGxlY3REYXRhVHlwZX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vQ29sbGVjdERhdGFUeXBlXCI7XHJcbmltcG9ydCB7QW5hbHlzaXNEYXRhVHlwZSwgQW5hbHlzaXNTdG9yYWdlUGFyYW1zLCBBbmFseXNpc0dvVG9UeXBlfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2ZXIvZW51bS9BbmFseXNpc0RhdGFUeXBlXCI7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xyXG5cclxuZGVjbGFyZSBsZXQgUG9wdXBIdG1sOiBhbnksICQ6IGFueSwgbG9hZGluZ0FuYWx5c2lzSHRtbDogYW55LCBhbmd1bGFyOiBhbnk7XHJcblxyXG5jbGFzcyBGYWNlQ29sbGlzaW9uQW5hbHlzaXNDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0OiBBcnJheTxzdHJpbmc+ID0gWyckc2NvcGUnLCAnJHRpbWVvdXQnLCAnYW5hbHlzaXNTZXJ2aWNlJywgJ2xheWVyJywgJ2FuYWx5c2lzTW1hcFNlcnZlcicsICdsYXllckRlYycsICd1c2VySW5mb0NhY2hlRmFjdG9yeScsIFwicmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlXCIsICckaW50ZXJ2YWwnLCAnaGFuZGxlU3RvcmFnZSddO1xyXG5cclxuICAgIHN5c3RlbVBvaW50TGlzdDogQXJyYXk8U3lzdGVtUG9pbnQ+O1xyXG4gICAgRmFjZUNvbGxpc2lvbkFuYWx5c2lzUGFyYW1zOiBBcnJheTxRdWVyeUFuYWx5c2lzSXRlbT4gPSBbXTtcclxuICAgIEZhc3REYXRlTGlzdDogQXJyYXk8ZGF0YTx0aW1lTGVuZ3RoPj4gPSBnZXRkYXRhTGlzdCgpO1xyXG4gICAgRmFzdERhdGU6IEFycmF5PGRhdGE8dGltZUxlbmd0aD4+ICA9IFtdO1xyXG4gICAgc2hvd0Zvcm06IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgc2hvd1Jlc3VsdDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgc2hvd0FuYWx5c2lzTGlzdDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgRmFjZUNvbGxpc2lvbk9mZkxpbmU6IEFycmF5PEludGVsaWdlbnRUYXNrSW5mbz47XHJcbiAgICByZXN1bHRQYXJhbXM6IFBhZ2VQYXJhbXNBbmRSZXN1bHQgPSBuZXcgUGFnZVBhcmFtc0FuZFJlc3VsdCgpO1xyXG4gICAgc2VsZWN0RHJhd0FycjogQXJyYXk8TlBNYXBMaWIuT3ZlcmxheT4gPSBbXTtcclxuICAgIHdpbmRvd0hlaWdodDogbnVtYmVyID0gZ2V0V2lkb3dTaXplKCkuaGVpZ2h0O1xyXG4gICAgY3VycmVudExheWVySW5kZXg6IG51bWJlcjtcclxuICAgIFNpbWlsYXJpdHk6IG51bWJlciA9IDkwO1xyXG4gICAgYWxsUmVzdWx0OiBBcnJheTxhbnk+O1xyXG4gICAgc2hvd0FsbFJlc3VsdDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgY2hlY2tSZXN1bHQ6IEFycmF5PGJvb2xlYW4+ID0gW107XHJcbiAgICByZXN1bHRJbmRleDogbnVtYmVyO1xyXG4gICAgcmVzdWx0Rm9yTWFwOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge307XHJcbiAgICBwYWdpbmF0aW9uOiBJUGFnaW5hdGlvbiA9IG5ldyBQYWdpbmF0aW9uKCk7XHJcbiAgICBRdWVyeUFuYWx5c2lzUGFyYW1zOiBRdWVyeUFuYWx5c2lzUGFyYW1zID0gbmV3IFF1ZXJ5QW5hbHlzaXNQYXJhbXMoKTtcclxuICAgIG1pblZhbHVlOiBudW1iZXIgPSA4MDtcclxuICAgIG1heFZhbHVlOiBudW1iZXIgPSAxMDA7XHJcbiAgICB3aW5kb3dXaWR0aDogbnVtYmVyID0gZ2V0V2lkb3dTaXplKCkud2lkdGggLSA2MDtcclxuICAgIHNlbGVjdERldmljZUNiOiBzdHJpbmcgPSBcImNsb3NlLmRldmljZS5wb3B1cFwiO1xyXG4gICAgc2V0SW50ZXJ2YWw6YW55O1xyXG4gICAgYW5hbHlzaXNHb1RvID0gQW5hbHlzaXNHb1RvVHlwZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBhbmFseXNpc1NlcnZpY2U6IElBbmFseXNpc1NlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGxheWVyOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGFuYWx5c2lzTW1hcFNlcnZlcjogSUFuYWx5c2lzTW1hcFNlcnZlcixcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbGF5ZXJEZWM6IElMYXllckRlYyxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgdXNlckluZm9DYWNoZUZhY3Rvcnk6IElVc2VySW5mb0NhY2hlRmFjdG9yeSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgcmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlOiBJUmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSAkaW50ZXJ2YWw6YW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBoYW5kbGVTdG9yYWdlOiBJSGFuZGxlU3RvcmFnZSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgc2VsZi5RdWVyeUFuYWx5c2lzUGFyYW1zID0gc2VsZi5pbml0UGFyYW1zKCk7XHJcblxyXG4gICAgICAgIHNlbGYuJHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmFuYWx5c2lzTW1hcFNlcnZlci5jbGVhckRyYXcoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuZGVzdG9yeUZvck1hcE1hcmtlcigpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCfop6blj5Hnm7TmjqXplIDmr4FNYXDkuovku7bvvIzlr7zoh7RtYXDlr7nosaHooqvplIDmr4HvvIzovajov7nop6blj5Hoh6rouqvnmoTplIDmr4Hkuovku7bkuK3ml6Dms5Xojrflj5ZtYXDlr7nosaHlr7zoh7TnmoTmiqXplJnvvIzlj6/ku6Xlv73nlaXvvIEnLCBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkaW50ZXJ2YWwuY2FuY2VsKHNlbGYuc2V0SW50ZXJ2YWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNlbGYuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kZW1pdCgnc2hvd0l0ZW1QYWdlJywgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNlbGYuZ2V0QWNjb21wT2ZmTGluZUxpc3QoKTtcclxuXHJcbiAgICAgICAgLy8g55uR5ZCs6K6+5aSH6L+U5Zue5LqL5Lu2XHJcbiAgICAgICAgc2VsZi4kc2NvcGUuJG9uKHNlbGYuc2VsZWN0RGV2aWNlQ2IsIChldmVudDogYW55LCBkZXZpY2VJZHM6IEFycmF5PHN0cmluZz4sIHN0YXR1czpib29sZWFuLCBnZW9tZXRyeT86IE5QTWFwTGliLkdlb21ldHJ5LlBvbHlnb24sIHR5cGU/OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgaWYgKHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgLy8g5Yik5pat6K6+5aSH5pWw6YePXHJcbiAgICAgICAgICAgICAgICBpZiAoZGV2aWNlSWRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubGF5ZXJEZWMud2FybkluZm8oJ+ahhumAieWMuuWfn+S4jeWtmOWcqOaRhOWDj+acuuiuvuWkh++8gScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYW5hbHlzaXNNbWFwU2VydmVyLnJlbW92ZURyYXdTaGFwZShnZW9tZXRyeSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5hZGRBcmVhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZWxlY3REcmF3QXJyLnB1c2goZ2VvbWV0cnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkZhY2VDb2xsaXNpb25BbmFseXNpc1BhcmFtc1tzZWxmLkZhY2VDb2xsaXNpb25BbmFseXNpc1BhcmFtcy5sZW5ndGggLSAxXS5hcnJDYW1lcmFJZCA9IGRldmljZUlkcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRGYXN0RGF0ZShGYXN0RGF0YS50b2RheSwgc2VsZi5GYWNlQ29sbGlzaW9uQW5hbHlzaXNQYXJhbXMubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmFuYWx5c2lzTW1hcFNlcnZlci5yZW1vdmVEcmF3U2hhcGUoZ2VvbWV0cnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGYubGF5ZXIuY2xvc2Uoc2VsZi5jdXJyZW50TGF5ZXJJbmRleCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8g5a6a5pe26K+35rGC56a757q/5Lu75YqhXHJcbiAgICAgICAgc2VsZi5zZXRJbnRlcnZhbCAgPSAkaW50ZXJ2YWwoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2VsZi5nZXRBY2NvbXBPZmZMaW5lTGlzdCgpO1xyXG4gICAgICAgIH0sIDEwMDAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRQYXJhbXMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuRmFjZUNvbGxpc2lvbkFuYWx5c2lzUGFyYW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5jbGVhckRyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5GYWNlQ29sbGlzaW9uQW5hbHlzaXNQYXJhbXMgPSBbXTtcclxuICAgICAgICBsZXQgcGFyYW1zOiBRdWVyeUFuYWx5c2lzUGFyYW1zID0gbmV3IFF1ZXJ5QW5hbHlzaXNQYXJhbXMoKTtcclxuICAgICAgICBwYXJhbXMudGFza05hbWUgPSBcIlwiO1xyXG4gICAgICAgIHBhcmFtcy50aHJlc2hvbGQgPSA5MDtcclxuICAgICAgICBwYXJhbXMuaW1wYWN0QXJyID0gW107XHJcbiAgICAgICAgcmV0dXJuIHBhcmFtcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRlc3RvcnlGb3JNYXBNYXJrZXIoKSB7XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIuY2xlYXJUcmFjZUFuYWx5emUoKTtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5jbGVhclJlc3VsdE1hcmtlcnMoKTtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5jbGVhckFjY3BNYXJrZXJzKCk7XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIuY2xlYXJUcmFja0luZm9XaW5kb3coKTtcclxuICAgIH1cclxuXHJcbiAgICBEcmF3UmVjdCgpIHtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5kcmF3UmVjdCgocG9pbnRzOiBBcnJheTxTeXN0ZW1Qb2ludD4sIGdlb21ldHJ5OiBOUE1hcExpYi5HZW9tZXRyeS5Qb2x5Z29uKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5EcmF3Q2FsbEJhY2tNZXRob2QocG9pbnRzLCBnZW9tZXRyeSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBEcmF3Q2lyY2xlKCkge1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmRyYXdDaXJjbGUoKHBvaW50czogQXJyYXk8U3lzdGVtUG9pbnQ+LCBnZW9tZXRyeTogTlBNYXBMaWIuR2VvbWV0cnkuQ2lyY2xlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5EcmF3Q2FsbEJhY2tNZXRob2QocG9pbnRzLCBnZW9tZXRyeSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBEcmF3UG9seWdvbigpIHtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5kcmF3UG9seWdvbigocG9pbnRzOiBBcnJheTxTeXN0ZW1Qb2ludD4sIGdlb21ldHJ5OiBOUE1hcExpYi5HZW9tZXRyeS5Qb2x5Z29uKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5EcmF3Q2FsbEJhY2tNZXRob2QocG9pbnRzLCBnZW9tZXRyeSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIERyYXdDYWxsQmFja01ldGhvZChwb2ludHM6IEFycmF5PFN5c3RlbVBvaW50PiwgZ2VvbWV0cnk6IE5QTWFwTGliLkdlb21ldHJ5LlBvbHlnb24gfCBOUE1hcExpYi5HZW9tZXRyeS5DaXJjbGUpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgaWYgKHNlbGYuRmFjZUNvbGxpc2lvbkFuYWx5c2lzUGFyYW1zLmxlbmd0aCA8IDUpIHtcclxuICAgICAgICAgICAgbGV0IGFycjogQXJyYXk8U3lzdGVtUG9pbnQ+ID0gW107XHJcbiAgICAgICAgICAgIHBvaW50cy5mb3JFYWNoKChpdGVtOiBTeXN0ZW1Qb2ludCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uT2JqZWN0VHlwZSA9PT0gT2JqZWN0VHlwZS5DYW1lcmEudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcnIucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmIChhcnIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmFuYWx5c2lzTW1hcFNlcnZlci5yZW1vdmVEcmF3U2hhcGUoZ2VvbWV0cnkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYubGF5ZXJEZWMud2FybkluZm8oJ+ahhumAieWMuuWfn+S4jeWtmOWcqOaRhOWDj+acuuiuvuWkh++8gScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGYuY2hlY2tBcmVhKGFyciwgZ2VvbWV0cnkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlbGYuYW5hbHlzaXNNbWFwU2VydmVyLnJlbW92ZURyYXdTaGFwZShnZW9tZXRyeSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmxheWVyRGVjLndhcm5JbmZvKCfnorDmkp7ljLrln5/mnIDlpKflj6rog73mnIk15Liq77yBJylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVsT2ZmTGluZVRhc2soaXRlbTogSW50ZWxpZ2VudFRhc2tJbmZvKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIFwidGFza0lkXCI6IGl0ZW0uVGFza0lkLFxyXG4gICAgICAgICAgICBcInRhc2tUeXBlXCI6IGl0ZW0uVGFza1R5cGVcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNlbGYuYW5hbHlzaXNTZXJ2aWNlLmRlbGV0ZU9mZkxpbmVEZXRhaWwocGFyYW1zKS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sYXllckRlYy5pbmZvKCfliKDpmaTmiJDlip8nKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuZ2V0QWNjb21wT2ZmTGluZUxpc3QoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubGF5ZXJEZWMud2FybkluZm8oJ+WIoOmZpOWksei0pScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBzZXRGYXN0RGF0ZShpdGVtOiBFbnVtPFRpbWVMZW5ndGg+LCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHRpbWU6IHRpbWVMZW5ndGg7XHJcbiAgICAgICAgc3dpdGNoIChpdGVtLmtleSkge1xyXG4gICAgICAgICAgICBjYXNlIFwidG9kYXlcIjpcclxuICAgICAgICAgICAgICAgIHRpbWUgPSBnZXRIb3VycygwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwibGFzdGhvdXJcIjpcclxuICAgICAgICAgICAgICAgIHRpbWUgPSBnZXRIb3VycygxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwibGFzdEZvdXJIb3VyXCI6XHJcbiAgICAgICAgICAgICAgICB0aW1lID0gZ2V0SG91cnMoNik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImxhc3RUaHJlZURheVwiOlxyXG4gICAgICAgICAgICAgICAgdGltZSA9IGdldEhvdXJzKDEyKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkZhY2VDb2xsaXNpb25BbmFseXNpc1BhcmFtc1tpbmRleF0uc3RhcnRUaW1lID0gdGltZS5zdGFydFRpbWU7XHJcbiAgICAgICAgdGhpcy5GYWNlQ29sbGlzaW9uQW5hbHlzaXNQYXJhbXNbaW5kZXhdLmVuZFRpbWUgPSB0aW1lLmVuZFRpbWU7XHJcbiAgICAgICAgdGhpcy5GYXN0RGF0ZVtpbmRleF0gPSBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENoZWNrUmVzdWx0KHNpemU6IG51bWJlciwgdHJhZ2V0OiBudW1iZXIsIGlzRmlyc3Q/OiBib29sZWFuKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxib29sZWFuPjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaSA9PT0gdHJhZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaCghc2VsZi5jaGVja1Jlc3VsdFt0cmFnZXRdKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2goZmFsc2UpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5yZXN1bHRJbmRleCA9IHRyYWdldDtcclxuICAgICAgICBpZiAoaXNGaXJzdCkge1xyXG4gICAgICAgICAgICBhcnJbdHJhZ2V0XSA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5jaGVja1Jlc3VsdCA9IGFycjtcclxuXHJcbiAgICAgICAgLy8g5aSE55CG6K6+5aSH5LiO5pS26JeP54q25oCB5pWw5o2uXHJcbiAgICAgICAgbGV0IHBhcmFtczphbnkgPSB7XHJcbiAgICAgICAgICAgIGRldmljZUlkczogW10sXHJcbiAgICAgICAgICAgIGRldmljZVR5cGU6ICcnLFxyXG4gICAgICAgICAgICBpZHM6IFtdLFxyXG4gICAgICAgICAgICB1c2VySWQ6IHNlbGYudXNlckluZm9DYWNoZUZhY3RvcnkuZ2V0Q3VycmVudFVzZXJJZCgpXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwYXJhbXMuZGV2aWNlVHlwZSA9IE9iamVjdFR5cGUuQ2FtZXJhLnZhbHVlO1xyXG4gICAgICAgIF8uZm9yRWFjaChzZWxmLnJlc3VsdFBhcmFtcy5kYXRhW3RyYWdldF0uRmFjZUNvbGxpZGVBY2Nlc3NlcyxmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgcGFyYW1zLmRldmljZUlkcy5wdXNoKHZhbHVlLkFjY2Vzc0xvZy5DYW1lcmFJRCk7XHJcbiAgICAgICAgICAgIHBhcmFtcy5pZHMucHVzaCh2YWx1ZS5BY2Nlc3NMb2cuSUQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNlbGYucmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLmdldERldmljZUluZm9Qcm9taXNlKHBhcmFtcykudGhlbigocmVzOmFueSk9PntcclxuICAgICAgICAgICAgXy5mb3JFYWNoKHNlbGYucmVzdWx0UGFyYW1zLmRhdGFbdHJhZ2V0XS5GYWNlQ29sbGlkZUFjY2Vzc2VzLGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5kZXZpY2VJbmZvID0gcmVzLmRhdGEuZGV2aWNlSW5mb1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNvbGxlY3RTdGF0dXMgPSByZXMuZGF0YS5jb2xsZWN0U3RhdHVzW2luZGV4XTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNlbGYuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5yZW5kZXJNYXJrZXJzRm9yUmVzdWx0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNsaWRlUmVzdWx0KGk6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2V0Q2hlY2tSZXN1bHQodGhpcy5yZXN1bHRQYXJhbXMucGFnZVNpemUsIGkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tBcmVhKGRldmljZUxpc3Q6IGFueSwgZ2VvbWV0cnk6IE5QTWFwTGliLkdlb21ldHJ5LlBvbHlnb24gfCBOUE1hcExpYi5HZW9tZXRyeS5DaXJjbGUpIHtcclxuICAgICAgICBsZXQgc2NvcGU6IHsgZGV2aWNlTGlzdDogYW55LCBnZW9tZXRyeTogTlBNYXBMaWIuR2VvbWV0cnkuUG9seWdvbiB8IE5QTWFwTGliLkdlb21ldHJ5LkNpcmNsZSwgJGRlc3Ryb3k6IEZ1bmN0aW9uLCBzZWxlY3RDaGVja0FyZWFDYjpzdHJpbmcgfSA9IHRoaXMuJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICBzY29wZS5kZXZpY2VMaXN0ID0gZGV2aWNlTGlzdDtcclxuICAgICAgICBzY29wZS5nZW9tZXRyeSA9IGdlb21ldHJ5O1xyXG4gICAgICAgIHNjb3BlLnNlbGVjdENoZWNrQXJlYUNiID0gdGhpcy5zZWxlY3REZXZpY2VDYjtcclxuICAgICAgICB0aGlzLmN1cnJlbnRMYXllckluZGV4ID0gdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgY29udGVudDogUG9wdXBIdG1sLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIHRpdGxlOiBmYWxzZSxcclxuICAgICAgICAgICAgY2xvc2VCdG46IDAsXHJcbiAgICAgICAgICAgIHNraW46IFwibm8tc2Nyb2xsXCIsXHJcbiAgICAgICAgICAgIGFyZWE6IFtcIjMwMHB4XCIsIFwiMzAwcHhcIl0sXHJcbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW5kZXJNYXJrZXJzRm9yUmVzdWx0KCkge1xyXG4gICAgICAgIGxldCBhY2NwQXJyID0gdGhpcy5yZXN1bHRQYXJhbXMuZGF0YVt0aGlzLnJlc3VsdEluZGV4XS5GYWNlQ29sbGlkZUFjY2Vzc2VzO1xyXG4gICAgICAgIGxldCBvYmogPSB7fSBhcyB7IFtrZXk6IHN0cmluZ106IGFueSB9O1xyXG4gICAgICAgIGFjY3BBcnIuZm9yRWFjaCgoaXRlbTogYW55LCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIG9ialtpdGVtLkFjY2Vzc0xvZy5JRF0gPSBpdGVtO1xyXG4gICAgICAgICAgICBvYmpbaXRlbS5BY2Nlc3NMb2cuSURdLnJlc3VsdEluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRGb3JNYXAgPSBvYmo7XHJcbiAgICAgICAgdGhpcy5hbGxSZXN1bHQgPSBhY2NwQXJyO1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLnJlbmRlck1ha2VycyhcclxuICAgICAgICAgICAgT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0TGF5ZXIsIE92ZXJsYXlOYW1lLk1hcEZvckFjY3BHcm91cCxcclxuICAgICAgICAgICAgdHJ1ZSwgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIuZ2V0U3lzdGVtUG9pbnRGb3JQYXJhbXModGhpcy5hbGxSZXN1bHQpLCB0aGlzLnJlc3VsdEZvck1hcCxcclxuICAgICAgICAgICAgZmFsc2UsIG51bGwsIE1hcmtlcnNJY29uLk5vcm1hbEdyZWVuSWNvbik7XHJcbiAgICB9XHJcblxyXG4gICAgb3BlbkRldGFpbFBvcHVwKGl0ZW06IGFueSwgaW5kZXg6IG51bWJlciwgZ3JvdXBMaXN0OmFueSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgc2NvcGU6IHtcclxuICAgICAgICAgICAgJGRlc3Ryb3k6IEZ1bmN0aW9uLFxyXG4gICAgICAgICAgICByYW5rOiBudW1iZXIsXHJcbiAgICAgICAgICAgIGFsbExpc3Q6IEFycmF5PGFueT4sXHJcbiAgICAgICAgICAgIGNvbGxlY3RGdW5jdGlvbjogRnVuY3Rpb24sXHJcbiAgICAgICAgICAgIGFuYWx5c2lzRnVuY3Rpb246IEZ1bmN0aW9uLFxyXG4gICAgICAgICAgICBzdXJ2ZWlsbGFuY2VGdW5jdGlvbjogRnVuY3Rpb24sXHJcbiAgICAgICAgICAgIGNsb3NlUG9wdXA6IEZ1bmN0aW9uLFxyXG4gICAgICAgICAgICBzaG93Rm9vdGVyOiBib29sZWFuXHJcbiAgICAgICAgICAgIGluZGV4OmFueVxyXG4gICAgICAgIH0gPSBzZWxmLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUucmFuayA9IGluZGV4O1xyXG4gICAgICAgIHNjb3BlLnNob3dGb290ZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlLmluZGV4ID0gXCJcIjtcclxuICAgICAgICBzY29wZS5hbGxMaXN0ID0gIGdyb3VwTGlzdDtcclxuICAgICAgICBzY29wZS5jb2xsZWN0RnVuY3Rpb24gPSAoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuY2xpY2tDb2xsZWN0KG51bGwsIGl0ZW0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2NvcGUuYW5hbHlzaXNGdW5jdGlvbiA9IChpdGVtOiBhbnksIHR5cGUpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5jbGlja0FuYWx5c2lzKG51bGwsIGl0ZW0sIHR5cGUpO1xyXG4gICAgICAgICAgICBzZWxmLmxheWVyLmNsb3NlKHNjb3BlLmluZGV4KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNjb3BlLnN1cnZlaWxsYW5jZUZ1bmN0aW9uID0gKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLmNsaWNrU3VydmVpbGxhbmNlKG51bGwsIGl0ZW0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2NvcGUuY2xvc2VQb3B1cCA9ICgpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5sYXllci5jbG9zZShzY29wZS5pbmRleCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZWxmLmFuYWx5c2lzTW1hcFNlcnZlci5vcGVuRGV0YWlsUG9wdXAoaXRlbSwgaW5kZXgsIHNlbGYuYWxsUmVzdWx0LCBPYmplY3RUeXBlLkNhbWVyYS52YWx1ZSwgc2NvcGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyDmoLnmja7nu5PmnpzmmL7npLrlnLDlm77lr7nlupTnmoTngrnkvY1cclxuICAgIHJlc3VsdFRvTWFwKGl0ZW06IGFueSwgaW5kZXg6IG51bWJlciwgdHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIucmVzdWx0VG9NYXAoaXRlbSwgdHlwZSlcclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE8g5Y+W5raI57uT5p6c5pi+56S65Zyw5Zu+5a+55bqU55qE54K55L2NXHJcbiAgICB1blJlc3VsdFRvTWFwKGl0ZW06IGFueSwgaW5kZXg6IG51bWJlciwgdHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIudW5SZXN1bHRUb01hcChpdGVtLCB0aGlzLnJlc3VsdEZvck1hcCwgdHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ29CYWNrKCkge1xyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kZW1pdCgnc2hvd0l0ZW1QYWdlJywgZmFsc2UpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ29CYWNrRm9ybSgpIHtcclxuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaG93Rm9ybSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1Jlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dBbmFseXNpc0xpc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5kZXN0b3J5Rm9yTWFwTWFya2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLnJlbmRlclN5c3RlbVBvaW50KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ29BbGxSZXN1bHQoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93Rm9ybSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvd1Jlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvd0FsbFJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRQYXJhbXMucGFnZVNpemUgPSA0MDtcclxuICAgICAgICB0aGlzLnJlc3VsdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRQYXJhbXMgPSB0aGlzLnBhZ2luYXRpb24uZ2V0QnlQYWdlKHRoaXMucmVzdWx0UGFyYW1zKTtcclxuICAgICAgICB0aGlzLnNldENoZWNrUmVzdWx0KHRoaXMucmVzdWx0UGFyYW1zLnBhZ2VTaXplLCAwLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZUFsbFJlc3VsdCgpIHtcclxuICAgICAgICB0aGlzLnNob3dSZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2hvd0FsbFJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVzdWx0UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICB0aGlzLnJlc3VsdFBhcmFtcy5wYWdlU2l6ZSA9IDY7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRQYXJhbXMgPSB0aGlzLnBhZ2luYXRpb24uZ2V0QnlQYWdlKHRoaXMucmVzdWx0UGFyYW1zKTtcclxuICAgICAgICB0aGlzLnNldENoZWNrUmVzdWx0KHRoaXMucmVzdWx0UGFyYW1zLnBhZ2VTaXplLCAwLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRBcmVhKCkge1xyXG4gICAgICAgIGxldCBhcnIgPSBuZXcgRmFjZUNvbGxpc2lvbkFuYWx5c2lzUGFyYW1zKCk7XHJcbiAgICAgICAgdGhpcy5GYWNlQ29sbGlzaW9uQW5hbHlzaXNQYXJhbXMucHVzaChhcnIpO1xyXG4gICAgICAgIHRoaXMuRmFzdERhdGUucHVzaChGYXN0RGF0YS50b2RheSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsQXJlYShpOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgZ2VvbWV0cnkgPSB0aGlzLnNlbGVjdERyYXdBcnJbaV07XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIucmVtb3ZlRHJhd1NoYXBlKGdlb21ldHJ5KTtcclxuICAgICAgICB0aGlzLkZhY2VDb2xsaXNpb25BbmFseXNpc1BhcmFtcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3REcmF3QXJyLnNwbGljZShpLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93QW5hbHlzaXNSZXN1bHQoaXRlbTogSW50ZWxpZ2VudFRhc2tJbmZvKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYuaW5pdExvYWRpbmdQb3AoKTtcclxuICAgICAgICBsZXQgcGFyYW1zID0ge1xyXG4gICAgICAgICAgICBcImFuYWx5c2VUYXNrVHlwZVwiOiBBbmFseXNlVGFza1R5cGUuU2VhcmNoQW5hbHlzZVRhc2tSZXN1bHQsXHJcbiAgICAgICAgICAgIFwidGFza0lkXCI6IGl0ZW0uVGFza0lkLFxyXG4gICAgICAgICAgICBcIlRhc2tUeXBlXCI6IGl0ZW0uVGFza1R5cGVcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNlbGYuYW5hbHlzaXNTZXJ2aWNlLmdldE9mZkxpbmVEZXRhaWwocGFyYW1zKS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLmxheWVyLmNsb3NlKHNlbGYuY3VycmVudExheWVySW5kZXgpO1xyXG4gICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhICYmIHJlcy5kYXRhLkZhY2VDb2xsaWRlRW50aXRpZXMgJiYgcmVzLmRhdGEuRmFjZUNvbGxpZGVFbnRpdGllcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmRlc3RvcnlGb3JNYXBNYXJrZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5wYWdpbmF0aW9uLnNldChyZXMuZGF0YS5GYWNlQ29sbGlkZUVudGl0aWVzKTtcclxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZXN1bHRQYXJhbXMucGFnZVNpemUgPSA2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlc3VsdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVzdWx0UGFyYW1zID0gc2VsZi5wYWdpbmF0aW9uLmdldEJ5UGFnZSh0aGlzLnJlc3VsdFBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWxsUmVzdWx0ID0gc2VsZi5wYWdpbmF0aW9uLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNob3dGb3JtID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd1Jlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYW5hbHlzaXNNbWFwU2VydmVyLnJlbW92ZVN5c3RlbVBvaW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0Q2hlY2tSZXN1bHQoc2VsZi5yZXN1bHRQYXJhbXMucGFnZVNpemUsIDAsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXllckRlYy5pbmZvKCfmsqHmnInmn6Xor6LliLDnu5PmnpwnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubGF5ZXJEZWMud2FybkluZm8oJ+afpeivoue7k+aenOWksei0pScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3VibWl0U2VhcmNoKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgcGFyYW1zOiBRdWVyeUFuYWx5c2lzUGFyYW1zID0gbmV3IFF1ZXJ5QW5hbHlzaXNQYXJhbXMoKTtcclxuICAgICAgICBwYXJhbXMudGFza05hbWUgPSBzZWxmLlF1ZXJ5QW5hbHlzaXNQYXJhbXMudGFza05hbWU7XHJcbiAgICAgICAgcGFyYW1zLnRocmVzaG9sZCA9IHNlbGYuUXVlcnlBbmFseXNpc1BhcmFtcy50aHJlc2hvbGQ7XHJcbiAgICAgICAgcGFyYW1zLmltcGFjdEFyciA9IFtdO1xyXG4gICAgICAgIGxldCBpdGVtOiBRdWVyeUFuYWx5c2lzSXRlbTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGYuRmFjZUNvbGxpc2lvbkFuYWx5c2lzUGFyYW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGl0ZW0gPSB0aGlzLkZhY2VDb2xsaXNpb25BbmFseXNpc1BhcmFtc1tpXTtcclxuICAgICAgICAgICAgaXRlbS5hcmVhTm8gPSBcImFyZWFOb1wiICsgaTtcclxuICAgICAgICAgICAgcGFyYW1zLmltcGFjdEFyci5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFyYW1zLnRhc2tOYW1lID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHNlbGYubGF5ZXJEZWMud2FybkluZm8oJ+ivt+i+k+WFpeS7u+WKoeWQjeensCcpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXJhbXMuaW1wYWN0QXJyLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgc2VsZi5sYXllckRlYy53YXJuSW5mbygn5pyA5bCR6YCJ5oup5Lik5Liq5Yy65Z+fJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKGxldCB5ID0gMDsgeSA8IHBhcmFtcy5pbXBhY3RBcnIubGVuZ3RoOyB5Kyspe1xyXG4gICAgICAgICAgICAvLyDliKTmlq3ml7bpl7RcclxuICAgICAgICAgICAgaWYgKHBhcmFtcy5pbXBhY3RBcnJbMF0uZW5kVGltZSA8IHBhcmFtcy5pbXBhY3RBcnJbMF0uc3RhcnRUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyRGVjLndhcm5JbmZvKCflvIDlp4vml7bpl7TkuI3og73mmZrkuo7nu5PmnZ/ml7bpl7QhJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5pbml0TG9hZGluZ1BvcCgpO1xyXG4gICAgICAgIHNlbGYuYW5hbHlzaXNTZXJ2aWNlLkZhY2VDb2xsaXNpb25BY2NvbXBhbnlpbmcocGFyYW1zKS50aGVuKChyZXM6IFJlc3BvbnNlUmVzdWx0PGFueT4pID0+IHtcclxuICAgICAgICAgICAgc2VsZi5sYXllci5jbG9zZShzZWxmLmN1cnJlbnRMYXllckluZGV4KTtcclxuICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2hvd0FuYWx5c2lzTGlzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmdldEFjY29tcE9mZkxpbmVMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICAvLyDmuIXpmaTmn6Xor6Llj4LmlbBcclxuICAgICAgICAgICAgICAgIHNlbGYuUXVlcnlBbmFseXNpc1BhcmFtcyA9IHNlbGYuaW5pdFBhcmFtcygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sYXllckRlYy53YXJuSW5mbygn5Lu75Yqh5Yib5bu65aSx6LSlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVJlc3VsdFBhZ2UoaTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRQYXJhbXMuY3VycmVudFBhZ2UgPSBpO1xyXG4gICAgICAgIHRoaXMucmVzdWx0UGFyYW1zID0gdGhpcy5wYWdpbmF0aW9uLmdldEJ5UGFnZSh0aGlzLnJlc3VsdFBhcmFtcyk7XHJcbiAgICAgICAgdGhpcy5zZXRDaGVja1Jlc3VsdCh0aGlzLnJlc3VsdFBhcmFtcy5wYWdlU2l6ZSwgMCwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6I635Y+W56a757q/5Lu75Yqh5YiX6KGoXHJcbiAgICBwcml2YXRlIGdldEFjY29tcE9mZkxpbmVMaXN0KCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgcGFyYW1zID0ge1xyXG4gICAgICAgICAgICBcImlkXCI6IHNlbGYudXNlckluZm9DYWNoZUZhY3RvcnkuZ2V0Q3VycmVudFVzZXJJZCgpLFxyXG4gICAgICAgICAgICBcInRhc2tUeXBlXCI6IE9mZmxpbmVUYXNrVHlwZS5TZWFyY2hGYWNlQ29sbGlzaW9uXHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZWxmLmFuYWx5c2lzU2VydmljZS5nZXRPZmZMaW5lTGlzdChwYXJhbXMpLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMjAwICYmIEFycmF5LmlzQXJyYXkocmVzLmRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgTGlzdDogQXJyYXk8SW50ZWxpZ2VudFRhc2tJbmZvPiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXMuZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5kYXRhW2ldLkV4dCA9IEpTT04ucGFyc2UocmVzLmRhdGFbaV0uRXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBMaXN0LnB1c2gocmVzLmRhdGFbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2VsZi5GYWNlQ29sbGlzaW9uT2ZmTGluZSA9IExpc3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOWIoOmZpOemu+e6v+S7u+WKoVxyXG4gICAgICogQHBhcmFtIHtBY2NvbXBPZmZMaW5lfSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGVsZXRlQWNjb21wT2ZmTGluZShpdGVtOiBJbnRlbGlnZW50VGFza0luZm8pIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IHtcclxuICAgICAgICAgICAgXCJ0YXNrSWRcIjogaXRlbS5UYXNrSWQsXHJcbiAgICAgICAgICAgIFwidGFza1R5cGVcIjogaXRlbS5UYXNrVHlwZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2VsZi5hbmFseXNpc1NlcnZpY2UuZGVsZXRlT2ZmTGluZURldGFpbChwYXJhbXMpLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxheWVyRGVjLndhcm5JbmZvKCfliKDpmaTmiJDlip8nKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuZ2V0QWNjb21wT2ZmTGluZUxpc3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2hvd0FuYWx5c2lzTGlzdChzdGF0dXM6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLnNob3dBbmFseXNpc0xpc3QgPSBzdGF0dXM7XHJcbiAgICAgICAgaWYgKHN0YXR1cykge1xyXG4gICAgICAgICAgICB0aGlzLmdldEFjY29tcE9mZkxpbmVMaXN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOWKoOi9veS4reWKqOeUu1xyXG4gICAgaW5pdExvYWRpbmdQb3AoKSB7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7ICRkZXN0cm95OiBGdW5jdGlvbiB9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudExheWVySW5kZXggPSB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBjb250ZW50OiBsb2FkaW5nQW5hbHlzaXNIdG1sLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIHRpdGxlOiBmYWxzZSxcclxuICAgICAgICAgICAgYXJlYTogWyc1MDBweCcsIFwiMjgwcHhcIl0sXHJcbiAgICAgICAgICAgIGVuZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5pS26JeP5LiO5Y+W5raI5pS26JePXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICovXHJcbiAgICBjbGlja0NvbGxlY3QoZXZlbnQ6IGFueSwgaXRlbTogYW55KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCFpdGVtLmNvbGxlY3RTdGF0dXMpIHtcclxuICAgICAgICAgICAgbGV0IHBhcmFtczogYW55ID0ge1xyXG4gICAgICAgICAgICAgICAganNvbjogYW5ndWxhci50b0pzb24oaXRlbSksXHJcbiAgICAgICAgICAgICAgICBvYmplY3RJRDogaXRlbS5BY2Nlc3NMb2cuSUQsXHJcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBDb2xsZWN0RGF0YVR5cGUuRmFjZS52YWx1ZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzZWxmLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5jb2xsZWN0QWRkSW5mbyhwYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHBhcmFtczogYW55ID0ge1xyXG4gICAgICAgICAgICAgICAgaWRzOiBpdGVtLkFjY2Vzc0xvZy5JRFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzZWxmLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5jb2xsZWN0RGVsZXRlSW5mbyhwYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGl0ZW0uY29sbGVjdFN0YXR1cyA9ICFpdGVtLmNvbGxlY3RTdGF0dXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5YiG5p6QXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICovXHJcbiAgICBjbGlja0FuYWx5c2lzKGV2ZW50OmFueSwgaXRlbTphbnksIHR5cGU6c3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc3RvcmFnZVBhcmFtczogQW5hbHlzaXNTdG9yYWdlUGFyYW1zID0gQW5hbHlzaXNEYXRhVHlwZS5GYWNlO1xyXG4gICAgICAgIHN0b3JhZ2VQYXJhbXMuZGF0YSA9IGl0ZW07XHJcbiAgICAgICAgdGhpcy5oYW5kbGVTdG9yYWdlLnNldFNlc3Npb25TdG9yYWdlRGF0YShzdG9yYWdlUGFyYW1zLmtleSwgc3RvcmFnZVBhcmFtcyk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJBbmFseXNpc1R5cGVcIiwgXCJGYWNlXCIpO1xyXG4gICAgICAgIGlmICh0eXBlID09PSBBbmFseXNpc0dvVG9UeXBlLlRyYWNrLmtleSkge1xyXG4gICAgICAgICAgICB3aW5kb3cub3BlbihBbmFseXNpc0dvVG9UeXBlLlRyYWNrLmRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gQW5hbHlzaXNHb1RvVHlwZS5BY2NvbXBhbnlpbmcua2V5KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKEFuYWx5c2lzR29Ub1R5cGUuQWNjb21wYW55aW5nLmRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gQW5hbHlzaXNHb1RvVHlwZS5GcmVxdWVuY3kua2V5KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKEFuYWx5c2lzR29Ub1R5cGUuRnJlcXVlbmN5LmRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gQW5hbHlzaXNHb1RvVHlwZS5Nb3JlLmtleSkge1xyXG4gICAgICAgICAgICB3aW5kb3cub3BlbihBbmFseXNpc0dvVG9UeXBlLk1vcmUuZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOW4g+aOp+S4juWPlua2iOW4g+aOp1xyXG4gICAgICogQHBhcmFtIGl0ZW1cclxuICAgICAqL1xyXG4gICAgY2xpY2tTdXJ2ZWlsbGFuY2UoZXZlbnQ6IGFueSwgaXRlbTogYW55KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpdGVtLnN1cnZlaWxsYW5jZVN0YXR1cyA9ICFpdGVtLnN1cnZlaWxsYW5jZVN0YXR1cztcclxuICAgIH1cclxuXHJcbiAgICAvLyDmn6XnnIvlhajlm75cclxuICAgIHB1YmxpYyBmdWxsU2NyZWVuKGV2ZW50OiBhbnksIHBhdGg6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IGxheWVyOiBhbnk7IGluZGV4OiBzdHJpbmcsIHBhdGg6IGFueSwgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUuaW5kZXggPSBcImZ1bGxTY3JlZW5Qb3B1cFwiO1xyXG4gICAgICAgIHNjb3BlLnBhdGggPSBwYXRoO1xyXG4gICAgICAgIGlmIChwYXRoKSB7XHJcbiAgICAgICAgICAgIGxldCB3aW5kb3dXOiBhbnkgPSAkKHdpbmRvdykud2lkdGgoKSAqIDAuODtcclxuICAgICAgICAgICAgbGV0IHdpbmRvd0g6IGFueSA9ICQod2luZG93KS5oZWlnaHQoKSAqIDAuODtcclxuICAgICAgICAgICAgbGV0IGNvbnRlbnRIVE1MID0gYDxpbWcgbmctc3JjPSR7cGF0aH0gc3R5bGU9J3dpZHRoOiR7d2luZG93V31weDtoZWlnaHQ6JHt3aW5kb3dIfXB4Oyc+YDtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjbG9zZUJ0bjogMCxcclxuICAgICAgICAgICAgICAgIHNraW46ICdsYXl1aS1sYXllci1ub2JnIG5vLXNjcm9sbCcsXHJcbiAgICAgICAgICAgICAgICBzaGFkZUNsb3NlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2hhZGU6IDAuNixcclxuICAgICAgICAgICAgICAgIGFyZWE6IFt3aW5kb3dXICsgJ3B4Jywgd2luZG93SCArICdweCddLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogY29udGVudEhUTUwsXHJcbiAgICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLm1zZyhcIuWbvueJh+WcsOWdgOS4jeWtmOWcqFwiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ0ZhY2VDb2xsaXNpb25BbmFseXNpc0NvbnRyb2xsZXInLCBGYWNlQ29sbGlzaW9uQW5hbHlzaXNDb250cm9sbGVyKTsiXX0=
