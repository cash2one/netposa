var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "text!../loading/loading.html", "text!../../selectPopup/treeCamera/Tree.camera.popup.html", "text!../../selectPopup/checkAreaPopup/check.area.popup.html", "../../common/app/main.app", "../AnalysisEnum", "../../../core/server/enum/AnalyseTaskOffLine", "../../common/Pagination", "./FrequencyAppearEnum", "../../../core/enum/ObjectType", "../../../core/server/enum/AnalysisDataType", "lodash", "css!../style/FrequencyAppear.css", "../../common/factory/userinfo.cache.factory", "../../common/factory/layerMsg.factory", "../main/analysisMmap.server", "../../common/services/analysis.service", "../../common/services/resourceRetrieval.service", "../../common/factory/HandleStorage.factory", "../../selectPopup/treeCamera/Tree.camera.popup", "../../selectPopup/checkAreaPopup/check.area.popup.controller"], function (require, exports, loadingAnalysisHtml, cameraTreePopupHtml, PopupHtml, main_app_1, AnalysisEnum_1, AnalyseTaskOffLine_1, Pagination_1, FrequencyAppearEnum_1, ObjectType_1, AnalysisDataType_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CacheResult = (function (_super) {
        __extends(CacheResult, _super);
        function CacheResult() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CacheResult;
    }(FrequencyAppearEnum_1.SearchAccessResul));
    var FrequencyAppearController = (function () {
        function FrequencyAppearController($scope, $timeout, analysisService, layer, userInfoCacheFactory, layerDec, analysisMmapServer, $interval, resourceRetrievalService, handleStorage) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.analysisService = analysisService;
            this.layer = layer;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.layerDec = layerDec;
            this.analysisMmapServer = analysisMmapServer;
            this.$interval = $interval;
            this.resourceRetrievalService = resourceRetrievalService;
            this.handleStorage = handleStorage;
            this.$inject = ['$scope', '$timeout', 'analysisService', 'layer', 'userInfoCacheFactory', 'layerDec', 'IAnalysisMmapServer', '$interval', "resourceRetrievalService", "handleStorage"];
            this.FrequencyAppearParams = new FrequencyAppearEnum_1.FrequencyAppearParams();
            this.FastDateList = AnalysisEnum_1.getFastDataList();
            this.SexDateList = AnalysisEnum_1.getSexDataList();
            this.GlassDateList = AnalysisEnum_1.getGlassesDataList();
            this.AgeDataList = AnalysisEnum_1.getAgeList();
            this.MaskDateList = AnalysisEnum_1.getMaskDataList();
            this.FastDate = AnalysisEnum_1.FastData.today;
            this.SexDate = AnalysisEnum_1.SexData.all;
            this.GlassDate = AnalysisEnum_1.GlassesData.all;
            this.MaskDate = AnalysisEnum_1.MaskData.all;
            this.similarityMax = 100;
            this.similarityMin = 80;
            this.showResult = false;
            this.showForm = true;
            this.showAllResult = false;
            this.showAnalysisList = false;
            this.resultParams = new Pagination_1.PageParamsAndResult();
            this.pagination = new Pagination_1.Pagination();
            this.FrequencyOffLine = [];
            this.windowWidth = AnalysisEnum_1.getWidowSize().width - 60;
            this.windowHeight = AnalysisEnum_1.getWidowSize().height - 53;
            this.sortLetter = ['A', 'B', 'C', 'D', 'E', 'F'];
            this.isSortLetter = true;
            this.isSlideResult = [];
            this.arrCameraId = [];
            this.selectDeviceCb = "close.device.popup";
            this.analysisGoTo = AnalysisDataType_1.AnalysisGoToType;
            var self = this;
            self.FrequencyAppearParams = self.initParams();
            self.$timeout(function () {
                self.$scope.$emit('showItemPage', true);
            });
            self.$scope.$on('$destroy', function () {
                try {
                    self.analysisMmapServer.clearDraw();
                }
                catch (e) {
                    console.error('触发直接销毁Map事件，导致map对象被销毁，轨迹触发自身的销毁事件中无法获取map对象导致的报错，可以忽略！', e);
                }
                $interval.cancel(self.setInterval);
            });
            self.$scope.$on(self.selectDeviceCb, function (event, deviceIds, status, geometry, type) {
                if (status && Array.isArray(deviceIds)) {
                    self.deviceIdFilter(deviceIds, type);
                }
                else if (geometry) {
                    self.analysisMmapServer.removeDrawShape(geometry);
                }
                self.layer.close(self.currentLayerIndex);
            });
            self.setInterval = $interval(function () {
                self.getAccompOffLineList();
            }, 10000);
        }
        FrequencyAppearController.prototype.initParams = function () {
            var self = this;
            self.FastDate = AnalysisEnum_1.FastData.today;
            self.SexDate = AnalysisEnum_1.SexData.all;
            self.GlassDate = AnalysisEnum_1.GlassesData.all;
            self.MaskDate = AnalysisEnum_1.MaskData.all;
            var params = new FrequencyAppearEnum_1.FrequencyAppearParams();
            params.taskName = "";
            params.taskId = "";
            params.hauntNum = 3;
            params.imagePathList = [];
            params.startTime = self.FastDate.value.startTime;
            params.endTime = self.FastDate.value.endTime;
            params.arrCameraId = [];
            params.threshold = 90;
            params.arrGender = [];
            params.arrEyeGlasses = [];
            params.arrMask = [];
            return params;
        };
        FrequencyAppearController.prototype.deviceIdFilter = function (ids, type) {
            var self = this;
            var arrCameraId = [];
            if (type === "tree") {
                arrCameraId = ids;
            }
            else {
                arrCameraId = _.concat(ids, self.arrCameraId);
            }
            arrCameraId = _.sortedUniq(arrCameraId);
            self.arrCameraId = arrCameraId;
            self.FrequencyAppearParams.arrCameraId = arrCameraId;
        };
        FrequencyAppearController.prototype.setFastDate = function (item) {
            this.FastDate = item;
            this.FrequencyAppearParams.startTime = item.value.startTime;
            this.FrequencyAppearParams.endTime = item.value.endTime;
        };
        FrequencyAppearController.prototype.deleteImage = function () {
            this.FrequencyAppearParams.imagePath = null;
            this.FrequencyAppearParams.taskId = null;
        };
        FrequencyAppearController.prototype.selectAge = function (age) {
            if (typeof age !== 'string') {
                this.FrequencyAppearParams.maxAge = age.value.maxAge;
                this.FrequencyAppearParams.minAge = age.value.minAge;
            }
            else {
                this.FrequencyAppearParams.maxAge = null;
                this.FrequencyAppearParams.minAge = null;
            }
        };
        FrequencyAppearController.prototype.goBack = function () {
            var _this = this;
            this.$timeout(function () {
                _this.$scope.$emit('showItemPage', false);
            });
        };
        FrequencyAppearController.prototype.goBackForm = function () {
            var _this = this;
            this.analysisMmapServer.clearResultMarkers();
            this.$timeout(function () {
                _this.showForm = true;
                _this.showResult = false;
                _this.showAllResult = false;
                _this.analysisMmapServer.renderSystemPoint();
            });
        };
        FrequencyAppearController.prototype.slideRightResult = function (i) {
            this.setCheckRightResult(this.resultParams.pageSize, i);
        };
        FrequencyAppearController.prototype.setCheckRightResult = function (size, traget, isFirst) {
            var self = this;
            var arr = [];
            for (var i = 0; i < size; i++) {
                if (i === traget) {
                    arr.push(!self.isSlideResult[traget]);
                }
                else {
                    arr.push(false);
                }
            }
            self.resultIndex = traget;
            if (isFirst) {
                arr[traget] = true;
            }
            self.isSlideResult = arr;
            var params = {
                deviceIds: [],
                deviceType: '',
                ids: [],
                userId: self.userInfoCacheFactory.getCurrentUserId()
            };
            params.deviceType = ObjectType_1.ObjectType.Camera.value;
            _.forEach(self.resultParams.data[traget].SearchAccessResultList, function (value) {
                params.deviceIds.push(value.AccessLog.CameraID);
                params.ids.push(value.AccessLog.ID);
            });
            self.resourceRetrievalService.getDeviceInfoPromise(params).then(function (res) {
                _.forEach(self.resultParams.data[traget].SearchAccessResultList, function (item, index) {
                    item.deviceInfo = res.data.deviceInfo[index];
                    item.collectStatus = res.data.collectStatus[index];
                });
                self.$timeout(function () {
                    self.renderAccpMarkers();
                });
            });
        };
        FrequencyAppearController.prototype.selectCamera = function () {
            var scope = this.$scope.$new();
            scope.selectCameraList = this.FrequencyAppearParams.arrCameraId;
            scope.selectCtrlCb = this.selectDeviceCb;
            this.currentLayerIndex = this.layer.open({
                type: 1,
                content: cameraTreePopupHtml,
                scope: scope,
                title: "摄像机选择",
                closeBtn: false,
                area: ["710px", "620px"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        FrequencyAppearController.prototype.renderAccpMarkers = function () {
            var self = this;
            self.allResult = self.resultParams.data[self.resultIndex].SearchAccessResultList;
            self.$timeout(function () {
                self.setResultForMap(self.allResult);
            }).then(function () {
                var arr = self.analysisMmapServer.getSystemPointForParams(self.allResult);
                self.analysisMmapServer.renderMakers(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForResultGroup, true, arr, self.resultForMap);
            });
        };
        FrequencyAppearController.prototype.setResultForMap = function (result) {
            var obj = {};
            result.forEach(function (item, i) {
                obj[item.AccessLog.ID] = item;
                obj[item.AccessLog.ID].resultIndex = i;
            });
            this.resultForMap = obj;
        };
        FrequencyAppearController.prototype.openDetailPopup = function (item, index) {
            var self = this;
            var objectType = "";
            var newItem = {};
            var newList = [];
            objectType = ObjectType_1.ObjectType.Camera.value;
            newItem = item;
            newList.push(newItem);
            var scope = self.$scope.$new();
            scope.rank = index;
            scope.showFooter = true;
            scope.index = "";
            scope.allList = newList;
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
            self.analysisMmapServer.openDetailPopup(newItem, index, newList, objectType, scope);
        };
        FrequencyAppearController.prototype.resultToMap = function (item, index) {
            this.analysisMmapServer.resultToMap(item);
        };
        FrequencyAppearController.prototype.unResultToMap = function (item, index) {
            this.analysisMmapServer.unResultToMap(item, this.resultForMap);
        };
        FrequencyAppearController.prototype.DrawRect = function () {
            var _this = this;
            this.analysisMmapServer.drawRect(function (points, geometry) {
                _this.$timeout(function () {
                    _this.DrawCallBackMethod(points, geometry);
                });
            });
        };
        FrequencyAppearController.prototype.DrawCircle = function () {
            var _this = this;
            this.analysisMmapServer.drawCircle(function (points, geometry) {
                _this.$timeout(function () {
                    _this.DrawCallBackMethod(points, geometry);
                });
            });
        };
        FrequencyAppearController.prototype.DrawPolygon = function () {
            var _this = this;
            this.analysisMmapServer.drawPolygon(function (points, geometry) {
                _this.$timeout(function () {
                    _this.DrawCallBackMethod(points, geometry);
                });
            });
        };
        FrequencyAppearController.prototype.ClearDraw = function () {
            this.arrCameraId = [];
            this.FrequencyAppearParams.arrCameraId = [];
            this.analysisMmapServer.clearDraw();
        };
        FrequencyAppearController.prototype.DrawCallBackMethod = function (points, geometry) {
            if (points.length === 0) {
                this.analysisMmapServer.removeDrawShape(geometry);
                return this.layerDec.warnInfo('框选区域不存在设备！');
            }
            var arr = [];
            points.forEach(function (item) {
                if (item.ObjectType === ObjectType_1.ObjectType.Camera.value) {
                    arr.push(item);
                }
            });
            this.checkArea(arr, geometry);
        };
        FrequencyAppearController.prototype.checkArea = function (deviceList, geometry) {
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
        FrequencyAppearController.prototype.submitSearch = function () {
            var self = this;
            if (self.FrequencyAppearParams.taskName === "") {
                return self.layerDec.warnInfo('请输入任务名称');
            }
            if (self.FrequencyAppearParams.endTime < self.FrequencyAppearParams.startTime) {
                self.layerDec.warnInfo('开始时间不能晚于结束时间!');
                return false;
            }
            if (self.arrCameraId.length > 0) {
                self.FrequencyAppearParams.arrCameraId = self.arrCameraId;
            }
            else {
                var systemPointList = self.analysisMmapServer.getSystemPoint();
                var cameraList_1 = [];
                _(systemPointList).forEach(function (value) {
                    if (ObjectType_1.ObjectType.Camera.value === value.ObjectType) {
                        cameraList_1.push(value.ObjectID);
                    }
                });
                self.FrequencyAppearParams.arrCameraId = cameraList_1;
            }
            if (self.SexDate.value) {
                self.FrequencyAppearParams.arrGender.push(self.SexDate.value);
            }
            if (self.GlassDate.value) {
                self.FrequencyAppearParams.arrEyeGlasses.push(self.GlassDate.value);
            }
            if (self.MaskDate.value) {
                self.FrequencyAppearParams.arrMask.push(self.MaskDate.value);
            }
            self.initLoadingPop();
            self.analysisService.faceFrequencyAppear(self.FrequencyAppearParams).then(function (res) {
                if (res.code === 200) {
                    self.showAnalysisList = true;
                    self.getAccompOffLineList();
                    self.FrequencyAppearParams = self.initParams();
                }
                else {
                    self.layerDec.warnInfo('分析任务创建失败');
                }
                self.layer.close(self.currentLayerIndex);
            });
        };
        FrequencyAppearController.prototype.showAnalysisListFn = function (flag) {
            this.showAnalysisList = flag;
            if (flag) {
                this.getAccompOffLineList();
            }
        };
        FrequencyAppearController.prototype.getAccompOffLineList = function () {
            var _this = this;
            var params = {
                id: this.userInfoCacheFactory.getCurrentUserId(),
                taskType: AnalyseTaskOffLine_1.OfflineTaskType.SearchFaceFrequenceHaunt
            };
            this.analysisService.getOffLineList(params).then(function (res) {
                if (res.code === 200) {
                    _this.FrequencyOffLine = res.data ? res.data : [];
                }
            });
        };
        FrequencyAppearController.prototype.delOffLineTask = function (item) {
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
        FrequencyAppearController.prototype.changeResultPage = function (i) {
            var _this = this;
            this.resultParams.currentPage = i;
            this.resultParams = this.pagination.getByPage(this.resultParams);
            this.setCheckRightResult(this.resultParams.pageSize, 0, true);
            this.$timeout(function () {
                _this.analysisMmapServer.renderMakers(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForResultGroup, true, _this.analysisMmapServer.getSystemPointForParams(_this.resultParams.data), _this.resultForMap);
            });
        };
        FrequencyAppearController.prototype.closeAllResult = function () {
            this.showResult = true;
            this.showAllResult = false;
            this.resultParams.currentPage = 1;
            this.resultParams.pageSize = 6;
            this.resultParams = this.pagination.getByPage(this.resultParams);
            this.setCheckRightResult(this.resultParams.pageSize, 0, true);
        };
        FrequencyAppearController.prototype.goAllResult = function () {
            this.showResult = false;
            this.showAllResult = true;
            this.resultParams.pageSize = 40;
            this.resultParams.currentPage = 1;
            this.resultParams = this.pagination.getByPage(this.resultParams);
            this.setCheckRightResult(this.resultParams.pageSize, 0, true);
        };
        FrequencyAppearController.prototype.showAnalysisResult = function (item) {
            var self = this;
            var params = {
                analyseTaskType: AnalyseTaskOffLine_1.AnalyseTaskType.SearchAnalyseTaskResult,
                taskId: item.TaskId,
                TaskType: item.TaskType,
                pageSize: this.resultParams.pageSize,
                currentPage: this.resultParams.currentPage
            };
            self.initLoadingPop();
            self.analysisService.getOffLineDetail(params).then(function (res) {
                if (res.code === 200) {
                    if (res.data) {
                        self.$timeout(function () {
                            self.pagination.set(res.data.Result);
                        }).then(function () {
                            self.resultParams.currentPage = 1;
                            self.resultParams.pageSize = 6;
                            self.analysisMmapServer.removeSystemPoint();
                            self.resultParams = self.pagination.getByPage(self.resultParams);
                        }).then(function () {
                            self.showResult = true;
                            self.showForm = false;
                            self.nowOffLineInfo = item;
                            self.setCheckRightResult(self.resultParams.pageSize, 0, true);
                        }).then(function () {
                            self.layer.close(self.currentLayerIndex);
                        });
                    }
                    else {
                        self.layer.close(self.currentLayerIndex);
                        self.layerDec.info('没有查询到结果');
                    }
                }
                else {
                    self.layer.close(self.currentLayerIndex);
                    self.layerDec.warnInfo('查询结果失败');
                }
            });
        };
        FrequencyAppearController.prototype.clickCollect = function (event, item) {
            if (event) {
                event.stopPropagation();
            }
            var self = this;
            if (!item.collectStatus) {
                var params = {
                    json: angular.toJson(item),
                    objectID: item.AccessLog.ID,
                    objectType: "Face"
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
        FrequencyAppearController.prototype.clickAnalysis = function (event, item, type) {
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
        FrequencyAppearController.prototype.clickSurveillance = function (event, item) {
            if (event) {
                event.stopPropagation();
            }
            item.surveillanceStatus = !item.surveillanceStatus;
        };
        FrequencyAppearController.prototype.initLoadingPop = function () {
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
        FrequencyAppearController.prototype.fullScreen = function (event, path) {
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
        return FrequencyAppearController;
    }());
    main_app_1.app.controller('FrequencyAppearController', FrequencyAppearController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9GcmVxdWVuY3lBcHBlYXIvRnJlcXVlbmN5QXBwZWFyLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQXFEQTtRQUEwQiwrQkFBaUI7UUFBM0M7O1FBRUEsQ0FBQztRQUFELGtCQUFDO0lBQUQsQ0FGQSxBQUVDLENBRnlCLHVDQUFpQixHQUUxQztJQUVEO1FBcUNJLG1DQUFvQixNQUFXLEVBQ1gsUUFBYSxFQUNiLGVBQWlDLEVBQ2pDLEtBQVUsRUFDVixvQkFBMkMsRUFDM0MsUUFBbUIsRUFDbkIsa0JBQXVDLEVBQ3ZDLFNBQWEsRUFDYix3QkFBbUQsRUFDbkQsYUFBNkI7WUFUN0IsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLGFBQVEsR0FBUixRQUFRLENBQUs7WUFDYixvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7WUFDakMsVUFBSyxHQUFMLEtBQUssQ0FBSztZQUNWLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBdUI7WUFDM0MsYUFBUSxHQUFSLFFBQVEsQ0FBVztZQUNuQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXFCO1lBQ3ZDLGNBQVMsR0FBVCxTQUFTLENBQUk7WUFDYiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTJCO1lBQ25ELGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtZQTdDakQsWUFBTyxHQUFrQixDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLFVBQVUsRUFBRSxxQkFBcUIsRUFBRSxXQUFXLEVBQUUsMEJBQTBCLEVBQUUsZUFBZSxDQUFDLENBQUM7WUFDak0sMEJBQXFCLEdBQTBCLElBQUksMkNBQXFCLEVBQUUsQ0FBQztZQUMzRSxpQkFBWSxHQUE0Qiw4QkFBZSxFQUFFLENBQUM7WUFDMUQsZ0JBQVcsR0FBd0IsNkJBQWMsRUFBRSxDQUFDO1lBQ3BELGtCQUFhLEdBQXdCLGlDQUFrQixFQUFF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SyxFQUFFLEdBQUc7b0JBQ1YsSUFBSSxFQUFFLENBQUMsT0FBTyxHQUFHLElBQUksRUFBRSxPQUFPLEdBQUcsSUFBSSxDQUFDO29CQUN0QyxPQUFPLEVBQUUsV0FBVztvQkFDcEIsS0FBSyxFQUFFLEtBQUs7b0JBQ1osR0FBRyxFQUFFO3dCQUNELEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDckIsQ0FBQztpQkFDSixDQUFDLENBQUM7WUFDUCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDN0IsQ0FBQztRQUNMLENBQUM7UUFDTCxnQ0FBQztJQUFELENBNXFCQSxBQTRxQkMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsMkJBQTJCLEVBQUUseUJBQXlCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9GcmVxdWVuY3lBcHBlYXIvRnJlcXVlbmN5QXBwZWFyLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uL2xvYWRpbmcvbG9hZGluZy5odG1sXCIgbmFtZT1cImxvYWRpbmdBbmFseXNpc0h0bWxcIiAvPlxyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uLy4uL3NlbGVjdFBvcHVwL3RyZWVDYW1lcmEvVHJlZS5jYW1lcmEucG9wdXAuaHRtbFwiIG5hbWU9XCJjYW1lcmFUcmVlUG9wdXBIdG1sXCIgLz5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi8uLi9zZWxlY3RQb3B1cC9jaGVja0FyZWFQb3B1cC9jaGVjay5hcmVhLnBvcHVwLmh0bWxcIiBuYW1lPVwiUG9wdXBIdG1sXCIgLz5cclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAnY3NzIS4uL3N0eWxlL0ZyZXF1ZW5jeUFwcGVhci5jc3MnO1xyXG5cclxuLy8g5pyN5YqhXHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9mYWN0b3J5L3VzZXJpbmZvLmNhY2hlLmZhY3RvcnlcIjtcclxuaW1wb3J0IHtJVXNlckluZm9DYWNoZUZhY3Rvcnl9IGZyb20gXCIuLi8uLi9jb21tb24vZmFjdG9yeS91c2VyaW5mby5jYWNoZS5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9mYWN0b3J5L2xheWVyTXNnLmZhY3RvcnlcIjtcclxuaW1wb3J0IHtJTGF5ZXJEZWN9IGZyb20gXCIuLi8uLi9jb21tb24vZmFjdG9yeS9sYXllck1zZy5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uL21haW4vYW5hbHlzaXNNbWFwLnNlcnZlclwiO1xyXG5pbXBvcnQge0lBbmFseXNpc01tYXBTZXJ2ZXJ9IGZyb20gXCIuLi9tYWluL2FuYWx5c2lzTW1hcC5zZXJ2ZXJcIjtcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FuYWx5c2lzLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtJQW5hbHlzaXNTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FuYWx5c2lzLnNlcnZpY2VcIjtcclxuaW1wb3J0ICcuLi8uLi9jb21tb24vc2VydmljZXMvcmVzb3VyY2VSZXRyaWV2YWwuc2VydmljZSc7XHJcbmltcG9ydCB7SVJlc291cmNlUmV0cmlldmFsU2VydmljZX0gZnJvbSAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL3Jlc291cmNlUmV0cmlldmFsLnNlcnZpY2UnO1xyXG5pbXBvcnQgJy4uLy4uL2NvbW1vbi9mYWN0b3J5L0hhbmRsZVN0b3JhZ2UuZmFjdG9yeSc7XHJcbmltcG9ydCB7SUhhbmRsZVN0b3JhZ2V9IGZyb20gJy4uLy4uL2NvbW1vbi9mYWN0b3J5L0hhbmRsZVN0b3JhZ2UuZmFjdG9yeSc7XHJcblxyXG4vLyDlvLnmoYZcclxuaW1wb3J0ICcuLi8uLi9zZWxlY3RQb3B1cC90cmVlQ2FtZXJhL1RyZWUuY2FtZXJhLnBvcHVwJ1xyXG5pbXBvcnQgJy4uLy4uL3NlbGVjdFBvcHVwL2NoZWNrQXJlYVBvcHVwL2NoZWNrLmFyZWEucG9wdXAuY29udHJvbGxlcic7XHJcblxyXG4vLyDlj4LmlbBcclxuaW1wb3J0IHtTeXN0ZW1Qb2ludH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L1N5c3RlbVBvaW50XCI7XHJcbmltcG9ydCB7SW50ZWxpZ2VudFRhc2tJbmZvfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9JbnRlbGlnZW50VGFza0luZm8nO1xyXG5pbXBvcnQge0JhY2tSZXNwb25zZUJvZHksIFJlc3BvbnNlUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7XHJcbiAgICBGYXN0RGF0YSxcclxuICAgIGdldEZhc3REYXRhTGlzdCxcclxuICAgIEFnZSxcclxuICAgIEVudW0sXHJcbiAgICBUaW1lTGVuZ3RoLFxyXG4gICAgZ2V0R2xhc3Nlc0RhdGFMaXN0LFxyXG4gICAgZ2V0TWFza0RhdGFMaXN0LFxyXG4gICAgR2xhc3Nlc0RhdGEsXHJcbiAgICBnZXRBZ2VMaXN0LFxyXG4gICAgTWFza0RhdGEsXHJcbiAgICBnZXRTZXhEYXRhTGlzdCxcclxuICAgIGdldFdpZG93U2l6ZSxcclxuICAgIFNleERhdGEsIEFycmF5VW5pcXVlLCBPdmVybGF5TmFtZVxyXG59IGZyb20gJy4uL0FuYWx5c2lzRW51bSc7XHJcbmltcG9ydCB7QW5hbHlzZVRhc2tUeXBlLCBPZmZsaW5lVGFza1R5cGV9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL0FuYWx5c2VUYXNrT2ZmTGluZVwiO1xyXG5pbXBvcnQge1BhZ2luYXRpb24sIElQYWdpbmF0aW9uLCBQYWdlUGFyYW1zQW5kUmVzdWx0fSBmcm9tIFwiLi4vLi4vY29tbW9uL1BhZ2luYXRpb25cIjtcclxuaW1wb3J0IHtGcmVxdWVuY3lBcHBlYXJQYXJhbXMsIEZyZXF1ZW5jeUFwcGVhclJlc3VsdCwgU2VhcmNoQWNjZXNzUmVzdWx9IGZyb20gXCIuL0ZyZXF1ZW5jeUFwcGVhckVudW1cIjtcclxuaW1wb3J0IHtPYmplY3RUeXBlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudW0vT2JqZWN0VHlwZSc7XHJcbmltcG9ydCB7QW5hbHlzaXNEYXRhVHlwZSwgQW5hbHlzaXNTdG9yYWdlUGFyYW1zLCBBbmFseXNpc0dvVG9UeXBlfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2ZXIvZW51bS9BbmFseXNpc0RhdGFUeXBlXCI7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xyXG5cclxuXHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueSwgJDogYW55LCBsb2FkaW5nQW5hbHlzaXNIdG1sOiBhbnksIGNhbWVyYVRyZWVQb3B1cEh0bWw6IGFueSwgUG9wdXBIdG1sOiBhbnk7XHJcblxyXG5jbGFzcyBDYWNoZVJlc3VsdCBleHRlbmRzIFNlYXJjaEFjY2Vzc1Jlc3VsIHtcclxuICAgIHJlc3VsdEluZGV4OiBudW1iZXI7XHJcbn1cclxuXHJcbmNsYXNzIEZyZXF1ZW5jeUFwcGVhckNvbnRyb2xsZXIge1xyXG4gICAgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFsnJHNjb3BlJywgJyR0aW1lb3V0JywgJ2FuYWx5c2lzU2VydmljZScsICdsYXllcicsICd1c2VySW5mb0NhY2hlRmFjdG9yeScsICdsYXllckRlYycsICdJQW5hbHlzaXNNbWFwU2VydmVyJywgJyRpbnRlcnZhbCcsIFwicmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlXCIsIFwiaGFuZGxlU3RvcmFnZVwiXTtcclxuICAgIEZyZXF1ZW5jeUFwcGVhclBhcmFtczogRnJlcXVlbmN5QXBwZWFyUGFyYW1zID0gbmV3IEZyZXF1ZW5jeUFwcGVhclBhcmFtcygpO1xyXG4gICAgRmFzdERhdGVMaXN0OiBBcnJheTxFbnVtPFRpbWVMZW5ndGg+PiA9IGdldEZhc3REYXRhTGlzdCgpO1xyXG4gICAgU2V4RGF0ZUxpc3Q6IEFycmF5PEVudW08bnVtYmVyPj4gPSBnZXRTZXhEYXRhTGlzdCgpO1xyXG4gICAgR2xhc3NEYXRlTGlzdDogQXJyYXk8RW51bTxudW1iZXI+PiA9IGdldEdsYXNzZXNEYXRhTGlzdCgpO1xyXG4gICAgQWdlRGF0YUxpc3Q6IEFycmF5PEVudW08QWdlPj4gPSBnZXRBZ2VMaXN0KCk7XHJcbiAgICBNYXNrRGF0ZUxpc3Q6IEFycmF5PEVudW08bnVtYmVyPj4gPSBnZXRNYXNrRGF0YUxpc3QoKTtcclxuICAgIEZhc3REYXRlOiBFbnVtPFRpbWVMZW5ndGg+ID0gRmFzdERhdGEudG9kYXk7XHJcbiAgICBTZXhEYXRlOiBFbnVtPG51bWJlcj4gPSBTZXhEYXRhLmFsbDtcclxuICAgIEdsYXNzRGF0ZTogRW51bTxudW1iZXI+ID0gR2xhc3Nlc0RhdGEuYWxsO1xyXG4gICAgTWFza0RhdGU6IEVudW08bnVtYmVyPiA9IE1hc2tEYXRhLmFsbDtcclxuICAgIHNpbWlsYXJpdHlNYXg6IG51bWJlciA9IDEwMDtcclxuICAgIHNpbWlsYXJpdHlNaW46IG51bWJlciA9IDgwO1xyXG4gICAgc2hvd1Jlc3VsdDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgc2hvd0Zvcm06IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgc2hvd0FsbFJlc3VsdDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgc2hvd0FuYWx5c2lzTGlzdDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcmVzdWx0RGV0YWlsOiBGcmVxdWVuY3lBcHBlYXJSZXN1bHQ7XHJcbiAgICByZXN1bHRQYXJhbXM6IFBhZ2VQYXJhbXNBbmRSZXN1bHQgPSBuZXcgUGFnZVBhcmFtc0FuZFJlc3VsdCgpO1xyXG4gICAgcGFnaW5hdGlvbjogSVBhZ2luYXRpb24gPSBuZXcgUGFnaW5hdGlvbigpO1xyXG4gICAgcmVzdWx0Rm9yTWFwOiB7IFtrZXk6IHN0cmluZ106IFNlYXJjaEFjY2Vzc1Jlc3VsIHwgQ2FjaGVSZXN1bHQgfTtcclxuICAgIGFsbFJlc3VsdDogQXJyYXk8YW55PjtcclxuICAgIEZyZXF1ZW5jeU9mZkxpbmU6IEFycmF5PEludGVsaWdlbnRUYXNrSW5mbz4gPSBbXTtcclxuICAgIHdpbmRvd1dpZHRoOiBudW1iZXIgPSBnZXRXaWRvd1NpemUoKS53aWR0aCAtIDYwO1xyXG4gICAgd2luZG93SGVpZ2h0OiBudW1iZXIgPSBnZXRXaWRvd1NpemUoKS5oZWlnaHQgLSA1MztcclxuICAgIGN1cnJlbnRMYXllckluZGV4OiBudW1iZXI7XHJcbiAgICBzb3J0TGV0dGVyOiBBcnJheTxzdHJpbmc+ID0gWydBJywgJ0InLCAnQycsICdEJywgJ0UnLCAnRiddO1xyXG4gICAgaXNTb3J0TGV0dGVyOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIGlzU2xpZGVSZXN1bHQ6IEFycmF5PGJvb2xlYW4+ID0gW107XHJcbiAgICByZXN1bHRJbmRleDogbnVtYmVyO1xyXG4gICAgbm93T2ZmTGluZUluZm86IEludGVsaWdlbnRUYXNrSW5mbztcclxuICAgIGFyckNhbWVyYUlkOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICBzZWxlY3REZXZpY2VDYjogc3RyaW5nID0gXCJjbG9zZS5kZXZpY2UucG9wdXBcIjtcclxuICAgIHNldEludGVydmFsOmFueTtcclxuICAgIGFuYWx5c2lzR29UbyA9IEFuYWx5c2lzR29Ub1R5cGU7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgYW5hbHlzaXNTZXJ2aWNlOiBJQW5hbHlzaXNTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBsYXllcjogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB1c2VySW5mb0NhY2hlRmFjdG9yeTogSVVzZXJJbmZvQ2FjaGVGYWN0b3J5LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBsYXllckRlYzogSUxheWVyRGVjLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBhbmFseXNpc01tYXBTZXJ2ZXI6IElBbmFseXNpc01tYXBTZXJ2ZXIsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICRpbnRlcnZhbDphbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJlc291cmNlUmV0cmlldmFsU2VydmljZTogSVJlc291cmNlUmV0cmlldmFsU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgaGFuZGxlU3RvcmFnZTogSUhhbmRsZVN0b3JhZ2UpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHNlbGYuRnJlcXVlbmN5QXBwZWFyUGFyYW1zID0gc2VsZi5pbml0UGFyYW1zKCk7XHJcblxyXG4gICAgICAgIHNlbGYuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kZW1pdCgnc2hvd0l0ZW1QYWdlJywgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2VsZi4kc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHNlbGYuYW5hbHlzaXNNbWFwU2VydmVyLmNsZWFyRHJhdygpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCfop6blj5Hnm7TmjqXplIDmr4FNYXDkuovku7bvvIzlr7zoh7RtYXDlr7nosaHooqvplIDmr4HvvIzovajov7nop6blj5Hoh6rouqvnmoTplIDmr4Hkuovku7bkuK3ml6Dms5Xojrflj5ZtYXDlr7nosaHlr7zoh7TnmoTmiqXplJnvvIzlj6/ku6Xlv73nlaXvvIEnLCBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkaW50ZXJ2YWwuY2FuY2VsKHNlbGYuc2V0SW50ZXJ2YWwpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDnm5HlkKzorr7lpIfov5Tlm57kuovku7ZcclxuICAgICAgICBzZWxmLiRzY29wZS4kb24oc2VsZi5zZWxlY3REZXZpY2VDYiwgKGV2ZW50OiBhbnksIGRldmljZUlkczogQXJyYXk8c3RyaW5nPiwgc3RhdHVzOiBib29sZWFuLCBnZW9tZXRyeT86IE5QTWFwTGliLkdlb21ldHJ5LlBvbHlnb24sIHR5cGU/OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgaWYgKHN0YXR1cyAmJiBBcnJheS5pc0FycmF5KGRldmljZUlkcykpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuZGV2aWNlSWRGaWx0ZXIoZGV2aWNlSWRzLCB0eXBlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChnZW9tZXRyeSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5hbmFseXNpc01tYXBTZXJ2ZXIucmVtb3ZlRHJhd1NoYXBlKGdlb21ldHJ5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLmxheWVyLmNsb3NlKHNlbGYuY3VycmVudExheWVySW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIOWumuaXtuivt+axguemu+e6v+S7u+WKoVxyXG4gICAgICAgIHNlbGYuc2V0SW50ZXJ2YWwgID0gJGludGVydmFsKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNlbGYuZ2V0QWNjb21wT2ZmTGluZUxpc3QoKTtcclxuICAgICAgICB9LCAxMDAwMCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFBhcmFtcygpOiBGcmVxdWVuY3lBcHBlYXJQYXJhbXMge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgc2VsZi5GYXN0RGF0ZSA9IEZhc3REYXRhLnRvZGF5O1xyXG4gICAgICAgIHNlbGYuU2V4RGF0ZSA9IFNleERhdGEuYWxsO1xyXG4gICAgICAgIHNlbGYuR2xhc3NEYXRlID0gR2xhc3Nlc0RhdGEuYWxsO1xyXG4gICAgICAgIHNlbGYuTWFza0RhdGUgPSBNYXNrRGF0YS5hbGw7XHJcblxyXG4gICAgICAgIGxldCBwYXJhbXMgPSBuZXcgRnJlcXVlbmN5QXBwZWFyUGFyYW1zKCk7XHJcbiAgICAgICAgcGFyYW1zLnRhc2tOYW1lID0gXCJcIjtcclxuICAgICAgICBwYXJhbXMudGFza0lkID0gXCJcIjtcclxuICAgICAgICBwYXJhbXMuaGF1bnROdW0gPSAzO1xyXG4gICAgICAgIHBhcmFtcy5pbWFnZVBhdGhMaXN0ID0gW107XHJcbiAgICAgICAgcGFyYW1zLnN0YXJ0VGltZSA9IHNlbGYuRmFzdERhdGUudmFsdWUuc3RhcnRUaW1lO1xyXG4gICAgICAgIHBhcmFtcy5lbmRUaW1lID0gc2VsZi5GYXN0RGF0ZS52YWx1ZS5lbmRUaW1lO1xyXG4gICAgICAgIHBhcmFtcy5hcnJDYW1lcmFJZCA9IFtdO1xyXG4gICAgICAgIHBhcmFtcy50aHJlc2hvbGQgPSA5MDtcclxuICAgICAgICBwYXJhbXMuYXJyR2VuZGVyID0gW107XHJcbiAgICAgICAgcGFyYW1zLmFyckV5ZUdsYXNzZXMgPSBbXTtcclxuICAgICAgICBwYXJhbXMuYXJyTWFzayA9IFtdO1xyXG4gICAgICAgIHJldHVybiBwYXJhbXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6K6+5aSHaWTljrvph41cclxuICAgIHByaXZhdGUgZGV2aWNlSWRGaWx0ZXIoaWRzOiBBcnJheTxzdHJpbmc+LCB0eXBlPzogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBhcnJDYW1lcmFJZDogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgICAgIGlmICh0eXBlID09PSBcInRyZWVcIikge1xyXG4gICAgICAgICAgICBhcnJDYW1lcmFJZCA9IGlkcztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhcnJDYW1lcmFJZCA9IF8uY29uY2F0KGlkcywgc2VsZi5hcnJDYW1lcmFJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFyckNhbWVyYUlkID0gXy5zb3J0ZWRVbmlxKGFyckNhbWVyYUlkKTtcclxuICAgICAgICBzZWxmLmFyckNhbWVyYUlkID0gYXJyQ2FtZXJhSWQ7XHJcbiAgICAgICAgc2VsZi5GcmVxdWVuY3lBcHBlYXJQYXJhbXMuYXJyQ2FtZXJhSWQgPSBhcnJDYW1lcmFJZDtcclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE8g6K6+572u5pel5pyfXHJcbiAgICBzZXRGYXN0RGF0ZShpdGVtOiBFbnVtPFRpbWVMZW5ndGg+KSB7XHJcbiAgICAgICAgdGhpcy5GYXN0RGF0ZSA9IGl0ZW07XHJcbiAgICAgICAgdGhpcy5GcmVxdWVuY3lBcHBlYXJQYXJhbXMuc3RhcnRUaW1lID0gaXRlbS52YWx1ZS5zdGFydFRpbWU7XHJcbiAgICAgICAgdGhpcy5GcmVxdWVuY3lBcHBlYXJQYXJhbXMuZW5kVGltZSA9IGl0ZW0udmFsdWUuZW5kVGltZTtcclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE8g5Yig6Zmk5Zu+54mHXHJcbiAgICBkZWxldGVJbWFnZSgpIHtcclxuICAgICAgICB0aGlzLkZyZXF1ZW5jeUFwcGVhclBhcmFtcy5pbWFnZVBhdGggPSBudWxsO1xyXG4gICAgICAgIHRoaXMuRnJlcXVlbmN5QXBwZWFyUGFyYW1zLnRhc2tJZCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIOWIoOmZpOW5tOm+hFxyXG4gICAgc2VsZWN0QWdlKGFnZTogRW51bTxBZ2U+KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhZ2UgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuRnJlcXVlbmN5QXBwZWFyUGFyYW1zLm1heEFnZSA9IGFnZS52YWx1ZS5tYXhBZ2U7XHJcbiAgICAgICAgICAgIHRoaXMuRnJlcXVlbmN5QXBwZWFyUGFyYW1zLm1pbkFnZSA9IGFnZS52YWx1ZS5taW5BZ2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5GcmVxdWVuY3lBcHBlYXJQYXJhbXMubWF4QWdlID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5GcmVxdWVuY3lBcHBlYXJQYXJhbXMubWluQWdlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIOi/lOWbnuS4u+ebruW9lVxyXG4gICAgZ29CYWNrKCkge1xyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kZW1pdCgnc2hvd0l0ZW1QYWdlJywgZmFsc2UpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIOi/lOWbnuihqOWNlVxyXG4gICAgZ29CYWNrRm9ybSgpIHtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5jbGVhclJlc3VsdE1hcmtlcnMoKTtcclxuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaG93Rm9ybSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1Jlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dBbGxSZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIucmVuZGVyU3lzdGVtUG9pbnQoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHNsaWRlUmlnaHRSZXN1bHQoaTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zZXRDaGVja1JpZ2h0UmVzdWx0KHRoaXMucmVzdWx0UGFyYW1zLnBhZ2VTaXplLCBpKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDaGVja1JpZ2h0UmVzdWx0KHNpemU6IG51bWJlciwgdHJhZ2V0OiBudW1iZXIsIGlzRmlyc3Q/OiBib29sZWFuKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxib29sZWFuPjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaSA9PT0gdHJhZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaCghc2VsZi5pc1NsaWRlUmVzdWx0W3RyYWdldF0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaChmYWxzZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLnJlc3VsdEluZGV4ID0gdHJhZ2V0O1xyXG4gICAgICAgIGlmIChpc0ZpcnN0KSB7XHJcbiAgICAgICAgICAgIGFyclt0cmFnZXRdID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLmlzU2xpZGVSZXN1bHQgPSBhcnI7XHJcblxyXG4gICAgICAgIC8vIOWkhOeQhuiuvuWkh+S4juaUtuiXj+eKtuaAgeaVsOaNrlxyXG4gICAgICAgIGxldCBwYXJhbXM6YW55ID0ge1xyXG4gICAgICAgICAgICBkZXZpY2VJZHM6IFtdLFxyXG4gICAgICAgICAgICBkZXZpY2VUeXBlOiAnJyxcclxuICAgICAgICAgICAgaWRzOiBbXSxcclxuICAgICAgICAgICAgdXNlcklkOiBzZWxmLnVzZXJJbmZvQ2FjaGVGYWN0b3J5LmdldEN1cnJlbnRVc2VySWQoKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcGFyYW1zLmRldmljZVR5cGUgPSBPYmplY3RUeXBlLkNhbWVyYS52YWx1ZTtcclxuICAgICAgICBfLmZvckVhY2goc2VsZi5yZXN1bHRQYXJhbXMuZGF0YVt0cmFnZXRdLlNlYXJjaEFjY2Vzc1Jlc3VsdExpc3QsZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHBhcmFtcy5kZXZpY2VJZHMucHVzaCh2YWx1ZS5BY2Nlc3NMb2cuQ2FtZXJhSUQpO1xyXG4gICAgICAgICAgICBwYXJhbXMuaWRzLnB1c2godmFsdWUuQWNjZXNzTG9nLklEKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBzZWxmLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5nZXREZXZpY2VJbmZvUHJvbWlzZShwYXJhbXMpLnRoZW4oKHJlczphbnkpPT57XHJcbiAgICAgICAgICAgIF8uZm9yRWFjaChzZWxmLnJlc3VsdFBhcmFtcy5kYXRhW3RyYWdldF0uU2VhcmNoQWNjZXNzUmVzdWx0TGlzdCxmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uZGV2aWNlSW5mbyA9IHJlcy5kYXRhLmRldmljZUluZm9baW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jb2xsZWN0U3RhdHVzID0gcmVzLmRhdGEuY29sbGVjdFN0YXR1c1tpbmRleF07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzZWxmLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNlbGYucmVuZGVyQWNjcE1hcmtlcnMoKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE8g6YCJ5oup5pGE5YOP5py6XHJcbiAgICBzZWxlY3RDYW1lcmEoKSB7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IHNlbGVjdENhbWVyYUxpc3Q6IEFycmF5PHN0cmluZz4sICRkZXN0cm95OiBGdW5jdGlvbiwgc2VsZWN0Q3RybENiOiBzdHJpbmcgfSA9IHRoaXMuJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICBzY29wZS5zZWxlY3RDYW1lcmFMaXN0ID0gdGhpcy5GcmVxdWVuY3lBcHBlYXJQYXJhbXMuYXJyQ2FtZXJhSWQ7XHJcbiAgICAgICAgc2NvcGUuc2VsZWN0Q3RybENiID0gdGhpcy5zZWxlY3REZXZpY2VDYjtcclxuICAgICAgICB0aGlzLmN1cnJlbnRMYXllckluZGV4ID0gdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgY29udGVudDogY2FtZXJhVHJlZVBvcHVwSHRtbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICB0aXRsZTogXCLmkYTlg4/mnLrpgInmi6lcIixcclxuICAgICAgICAgICAgY2xvc2VCdG46ZmFsc2UsXHJcbiAgICAgICAgICAgIGFyZWE6IFtcIjcxMHB4XCIsIFwiNjIwcHhcIl0sXHJcbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVuZGVyQWNjcE1hcmtlcnMoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBzZWxmLmFsbFJlc3VsdCA9IHNlbGYucmVzdWx0UGFyYW1zLmRhdGFbc2VsZi5yZXN1bHRJbmRleF0uU2VhcmNoQWNjZXNzUmVzdWx0TGlzdDtcclxuICAgICAgICBzZWxmLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5zZXRSZXN1bHRGb3JNYXAoc2VsZi5hbGxSZXN1bHQpO1xyXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgYXJyID0gc2VsZi5hbmFseXNpc01tYXBTZXJ2ZXIuZ2V0U3lzdGVtUG9pbnRGb3JQYXJhbXMoc2VsZi5hbGxSZXN1bHQpO1xyXG4gICAgICAgICAgICBzZWxmLmFuYWx5c2lzTW1hcFNlcnZlci5yZW5kZXJNYWtlcnMoXHJcbiAgICAgICAgICAgICAgICBPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRMYXllcixcclxuICAgICAgICAgICAgICAgIE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdEdyb3VwLFxyXG4gICAgICAgICAgICAgICAgdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFycixcclxuICAgICAgICAgICAgICAgIHNlbGYucmVzdWx0Rm9yTWFwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8g57uY5Yi257uT5p6c6ZuG54K55L2NXHJcbiAgICBwcml2YXRlIHNldFJlc3VsdEZvck1hcChyZXN1bHQ6IGFueSkge1xyXG4gICAgICAgIGxldCBvYmogPSB7fSBhcyAgeyBba2V5OiBzdHJpbmddOiBDYWNoZVJlc3VsdCB9O1xyXG4gICAgICAgIHJlc3VsdC5mb3JFYWNoKChpdGVtOiBDYWNoZVJlc3VsdCwgaTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIG9ialtpdGVtLkFjY2Vzc0xvZy5JRF0gPSBpdGVtO1xyXG4gICAgICAgICAgICBvYmpbaXRlbS5BY2Nlc3NMb2cuSURdLnJlc3VsdEluZGV4ID0gaTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnJlc3VsdEZvck1hcCA9IG9iajtcclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE8g5omT5byA57uT5p6c6K+m5oOFXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7UmVzdWx0IHwgQ2FjaGVSZXN1bHR9IGl0ZW0g5b2T5YmN57uT5p6c5a+56LGhXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXgg5b2T5YmN57uT5p6c57Si5byVXHJcbiAgICAgKi9cclxuICAgIG9wZW5EZXRhaWxQb3B1cChpdGVtOiBhbnksIGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IG9iamVjdFR5cGU6c3RyaW5nID1cIlwiO1xyXG4gICAgICAgIGxldCBuZXdJdGVtOiBhbnkgPSB7fTtcclxuICAgICAgICBsZXQgbmV3TGlzdDpBcnJheTxhbnk+ID0gW107XHJcblxyXG4gICAgICAgIG9iamVjdFR5cGUgPSBPYmplY3RUeXBlLkNhbWVyYS52YWx1ZTtcclxuICAgICAgICBuZXdJdGVtID0gaXRlbTtcclxuICAgICAgICBuZXdMaXN0LnB1c2gobmV3SXRlbSk7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7XHJcbiAgICAgICAgICAgICRkZXN0cm95OiBGdW5jdGlvbixcclxuICAgICAgICAgICAgcmFuazogbnVtYmVyLFxyXG4gICAgICAgICAgICBhbGxMaXN0OiBBcnJheTxhbnk+LFxyXG4gICAgICAgICAgICBjb2xsZWN0RnVuY3Rpb246IEZ1bmN0aW9uLFxyXG4gICAgICAgICAgICBhbmFseXNpc0Z1bmN0aW9uOiBGdW5jdGlvbixcclxuICAgICAgICAgICAgc3VydmVpbGxhbmNlRnVuY3Rpb246IEZ1bmN0aW9uLFxyXG4gICAgICAgICAgICBjbG9zZVBvcHVwOiBGdW5jdGlvbixcclxuICAgICAgICAgICAgc2hvd0Zvb3RlcjogYm9vbGVhblxyXG4gICAgICAgICAgICBpbmRleDphbnlcclxuICAgICAgICB9ID0gc2VsZi4kc2NvcGUuJG5ldygpO1xyXG5cclxuICAgICAgICBzY29wZS5yYW5rID0gaW5kZXg7XHJcbiAgICAgICAgc2NvcGUuc2hvd0Zvb3RlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUuaW5kZXggPSBcIlwiO1xyXG4gICAgICAgIHNjb3BlLmFsbExpc3QgPSBuZXdMaXN0O1xyXG4gICAgICAgIHNjb3BlLmNvbGxlY3RGdW5jdGlvbiA9IChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5jbGlja0NvbGxlY3QobnVsbCwgaXRlbSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzY29wZS5hbmFseXNpc0Z1bmN0aW9uID0gKGl0ZW06IGFueSwgdHlwZTpzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5jbGlja0FuYWx5c2lzKG51bGwsIGl0ZW0sIHR5cGUpO1xyXG4gICAgICAgICAgICBzZWxmLmxheWVyLmNsb3NlKHNjb3BlLmluZGV4KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNjb3BlLnN1cnZlaWxsYW5jZUZ1bmN0aW9uID0gKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLmNsaWNrU3VydmVpbGxhbmNlKG51bGwsIGl0ZW0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2NvcGUuY2xvc2VQb3B1cCA9ICgpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5sYXllci5jbG9zZShzY29wZS5pbmRleCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZWxmLmFuYWx5c2lzTW1hcFNlcnZlci5vcGVuRGV0YWlsUG9wdXAobmV3SXRlbSwgaW5kZXgsIG5ld0xpc3QsIG9iamVjdFR5cGUsIHNjb3BlKTtcclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE8g5qC55o2u57uT5p6c5pi+56S65Zyw5Zu+5a+55bqU55qE54K55L2NXHJcbiAgICByZXN1bHRUb01hcChpdGVtOiBTZWFyY2hBY2Nlc3NSZXN1bCwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLnJlc3VsdFRvTWFwKGl0ZW0pXHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIOWPlua2iOe7k+aenOaYvuekuuWcsOWbvuWvueW6lOeahOeCueS9jVxyXG4gICAgdW5SZXN1bHRUb01hcChpdGVtOiBTZWFyY2hBY2Nlc3NSZXN1bCwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLnVuUmVzdWx0VG9NYXAoaXRlbSwgdGhpcy5yZXN1bHRGb3JNYXApXHJcbiAgICB9XHJcblxyXG4gICAgRHJhd1JlY3QoKSB7XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIuZHJhd1JlY3QoKHBvaW50czogQXJyYXk8U3lzdGVtUG9pbnQ+LCBnZW9tZXRyeTogTlBNYXBMaWIuR2VvbWV0cnkuUG9seWdvbikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuRHJhd0NhbGxCYWNrTWV0aG9kKHBvaW50cywgZ2VvbWV0cnkpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgRHJhd0NpcmNsZSgpIHtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5kcmF3Q2lyY2xlKChwb2ludHM6IEFycmF5PFN5c3RlbVBvaW50PiwgZ2VvbWV0cnk6IE5QTWFwTGliLkdlb21ldHJ5LlBvbHlnb24pID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRyYXdDYWxsQmFja01ldGhvZChwb2ludHMsIGdlb21ldHJ5KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIERyYXdQb2x5Z29uKCkge1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmRyYXdQb2x5Z29uKChwb2ludHM6IEFycmF5PFN5c3RlbVBvaW50PiwgZ2VvbWV0cnk6IE5QTWFwTGliLkdlb21ldHJ5LlBvbHlnb24pID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRyYXdDYWxsQmFja01ldGhvZChwb2ludHMsIGdlb21ldHJ5KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyDmuIXmpZrlnLDlm77lvLnmoYZcclxuICAgIENsZWFyRHJhdygpIHtcclxuICAgICAgICB0aGlzLmFyckNhbWVyYUlkID0gW107XHJcbiAgICAgICAgdGhpcy5GcmVxdWVuY3lBcHBlYXJQYXJhbXMuYXJyQ2FtZXJhSWQgPSBbXTtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5jbGVhckRyYXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIERyYXdDYWxsQmFja01ldGhvZChwb2ludHM6IEFycmF5PFN5c3RlbVBvaW50PiwgZ2VvbWV0cnk6IE5QTWFwTGliLkdlb21ldHJ5LlBvbHlnb24gfCBOUE1hcExpYi5HZW9tZXRyeS5DaXJjbGUpIHtcclxuICAgICAgICBpZiAocG9pbnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5yZW1vdmVEcmF3U2hhcGUoZ2VvbWV0cnkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYXllckRlYy53YXJuSW5mbygn5qGG6YCJ5Yy65Z+f5LiN5a2Y5Zyo6K6+5aSH77yBJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhcnI6IEFycmF5PFN5c3RlbVBvaW50PiA9IFtdO1xyXG4gICAgICAgIHBvaW50cy5mb3JFYWNoKChpdGVtOiBTeXN0ZW1Qb2ludCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5PYmplY3RUeXBlID09PSBPYmplY3RUeXBlLkNhbWVyYS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmNoZWNrQXJlYShhcnIsIGdlb21ldHJ5KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrQXJlYShkZXZpY2VMaXN0OiBhbnksIGdlb21ldHJ5OiBOUE1hcExpYi5HZW9tZXRyeS5Qb2x5Z29uIHwgTlBNYXBMaWIuR2VvbWV0cnkuQ2lyY2xlKSB7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IGRldmljZUxpc3Q6IGFueSwgZ2VvbWV0cnk6IE5QTWFwTGliLkdlb21ldHJ5LlBvbHlnb24gfCBOUE1hcExpYi5HZW9tZXRyeS5DaXJjbGUsICRkZXN0cm95OiBGdW5jdGlvbiwgc2VsZWN0Q2hlY2tBcmVhQ2I6IHN0cmluZyB9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLmRldmljZUxpc3QgPSBkZXZpY2VMaXN0O1xyXG4gICAgICAgIHNjb3BlLmdlb21ldHJ5ID0gZ2VvbWV0cnk7XHJcbiAgICAgICAgc2NvcGUuc2VsZWN0Q2hlY2tBcmVhQ2IgPSB0aGlzLnNlbGVjdERldmljZUNiO1xyXG4gICAgICAgIHRoaXMuY3VycmVudExheWVySW5kZXggPSB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBjb250ZW50OiBQb3B1cEh0bWwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgdGl0bGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBjbG9zZUJ0bjogMCxcclxuICAgICAgICAgICAgc2tpbjogXCJuby1zY3JvbGxcIixcclxuICAgICAgICAgICAgYXJlYTogW1wiMzAwcHhcIiwgXCIzMDBweFwiXSxcclxuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy9UT0RPIOaPkOS6pOemu+e6v+S7u+WKoVxyXG4gICAgc3VibWl0U2VhcmNoKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAoc2VsZi5GcmVxdWVuY3lBcHBlYXJQYXJhbXMudGFza05hbWUgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGYubGF5ZXJEZWMud2FybkluZm8oJ+ivt+i+k+WFpeS7u+WKoeWQjeensCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDliKTmlq3ml7bpl7RcclxuICAgICAgICBpZiAoc2VsZi5GcmVxdWVuY3lBcHBlYXJQYXJhbXMuZW5kVGltZSA8IHNlbGYuRnJlcXVlbmN5QXBwZWFyUGFyYW1zLnN0YXJ0VGltZSkge1xyXG4gICAgICAgICAgICBzZWxmLmxheWVyRGVjLndhcm5JbmZvKCflvIDlp4vml7bpl7TkuI3og73mmZrkuo7nu5PmnZ/ml7bpl7QhJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g6K6+572u5p+l6K+i6K6+5aSHaWRcclxuICAgICAgICBpZihzZWxmLmFyckNhbWVyYUlkLmxlbmd0aD4wKSB7XHJcbiAgICAgICAgICAgIHNlbGYuRnJlcXVlbmN5QXBwZWFyUGFyYW1zLmFyckNhbWVyYUlkID0gc2VsZi5hcnJDYW1lcmFJZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgc3lzdGVtUG9pbnRMaXN0OkFycmF5PGFueT4gPSBzZWxmLmFuYWx5c2lzTW1hcFNlcnZlci5nZXRTeXN0ZW1Qb2ludCgpO1xyXG4gICAgICAgICAgICBsZXQgY2FtZXJhTGlzdDpBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICAgICAgICAgIF8oc3lzdGVtUG9pbnRMaXN0KS5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0VHlwZS5DYW1lcmEudmFsdWUgPT09IHZhbHVlLk9iamVjdFR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYW1lcmFMaXN0LnB1c2godmFsdWUuT2JqZWN0SUQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2VsZi5GcmVxdWVuY3lBcHBlYXJQYXJhbXMuYXJyQ2FtZXJhSWQgPSBjYW1lcmFMaXN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2VsZi5TZXhEYXRlLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHNlbGYuRnJlcXVlbmN5QXBwZWFyUGFyYW1zLmFyckdlbmRlci5wdXNoKHNlbGYuU2V4RGF0ZS52YWx1ZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNlbGYuR2xhc3NEYXRlLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHNlbGYuRnJlcXVlbmN5QXBwZWFyUGFyYW1zLmFyckV5ZUdsYXNzZXMucHVzaChzZWxmLkdsYXNzRGF0ZS52YWx1ZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNlbGYuTWFza0RhdGUudmFsdWUpIHtcclxuICAgICAgICAgICAgc2VsZi5GcmVxdWVuY3lBcHBlYXJQYXJhbXMuYXJyTWFzay5wdXNoKHNlbGYuTWFza0RhdGUudmFsdWUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYuaW5pdExvYWRpbmdQb3AoKTtcclxuICAgICAgICBzZWxmLmFuYWx5c2lzU2VydmljZS5mYWNlRnJlcXVlbmN5QXBwZWFyKHNlbGYuRnJlcXVlbmN5QXBwZWFyUGFyYW1zKS50aGVuKChyZXM6IFJlc3BvbnNlUmVzdWx0PGFueT4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2hvd0FuYWx5c2lzTGlzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmdldEFjY29tcE9mZkxpbmVMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLkZyZXF1ZW5jeUFwcGVhclBhcmFtcyA9IHNlbGYuaW5pdFBhcmFtcygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sYXllckRlYy53YXJuSW5mbygn5YiG5p6Q5Lu75Yqh5Yib5bu65aSx6LSlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5sYXllci5jbG9zZShzZWxmLmN1cnJlbnRMYXllckluZGV4KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyDmmL7npLrnprvnur/ku7vliqHliJfooahcclxuICAgIHNob3dBbmFseXNpc0xpc3RGbihmbGFnOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5zaG93QW5hbHlzaXNMaXN0ID0gZmxhZztcclxuICAgICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgICAgICB0aGlzLmdldEFjY29tcE9mZkxpbmVMaXN0KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIOiOt+WPluemu+e6v+S7u+WKoeWIl+ihqFxyXG4gICAgZ2V0QWNjb21wT2ZmTGluZUxpc3QoKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IHtcclxuICAgICAgICAgICAgaWQ6IHRoaXMudXNlckluZm9DYWNoZUZhY3RvcnkuZ2V0Q3VycmVudFVzZXJJZCgpLFxyXG4gICAgICAgICAgICB0YXNrVHlwZTogT2ZmbGluZVRhc2tUeXBlLlNlYXJjaEZhY2VGcmVxdWVuY2VIYXVudFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc1NlcnZpY2UuZ2V0T2ZmTGluZUxpc3QocGFyYW1zKS50aGVuKChyZXM6IEJhY2tSZXNwb25zZUJvZHk8QXJyYXk8SW50ZWxpZ2VudFRhc2tJbmZvPj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuRnJlcXVlbmN5T2ZmTGluZSA9IHJlcy5kYXRhID8gcmVzLmRhdGEgOiBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIOWIoOmZpOWcsOWbvuemu+e6v+S7u+WKoVxyXG4gICAgZGVsT2ZmTGluZVRhc2soaXRlbTogSW50ZWxpZ2VudFRhc2tJbmZvKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIFwidGFza0lkXCI6IGl0ZW0uVGFza0lkLFxyXG4gICAgICAgICAgICBcInRhc2tUeXBlXCI6IGl0ZW0uVGFza1R5cGVcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNlbGYuYW5hbHlzaXNTZXJ2aWNlLmRlbGV0ZU9mZkxpbmVEZXRhaWwocGFyYW1zKS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sYXllckRlYy5pbmZvKCfliKDpmaTmiJDlip8nKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuZ2V0QWNjb21wT2ZmTGluZUxpc3QoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubGF5ZXJEZWMud2FybkluZm8oJ+WIoOmZpOWksei0pScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE8g5YiG6aG15Yqf6IO9XHJcbiAgICBjaGFuZ2VSZXN1bHRQYWdlKGk6IG51bWJlcikge1xyXG4gICAgICAgIC8vIHRoaXMucmVzdWx0UGFyYW1zLmN1cnJlbnRQYWdlID0gaTtcclxuICAgICAgICAvLyB0aGlzLmdldE9mZkxpbmVEZXRhaWwodGhpcy5ub3dPZmZMaW5lSW5mbylcclxuICAgICAgICB0aGlzLnJlc3VsdFBhcmFtcy5jdXJyZW50UGFnZSA9IGk7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRQYXJhbXMgPSB0aGlzLnBhZ2luYXRpb24uZ2V0QnlQYWdlKHRoaXMucmVzdWx0UGFyYW1zKTtcclxuICAgICAgICAvLyB0aGlzLnNldENoZWNrUmlnaHRSZXN1bHQodGhpcy5yZXN1bHRQYXJhbXMuZGF0YS5sZW5ndGgsIGksIHRydWUpO1xyXG4gICAgICAgIHRoaXMuc2V0Q2hlY2tSaWdodFJlc3VsdCh0aGlzLnJlc3VsdFBhcmFtcy5wYWdlU2l6ZSwgMCwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLnJlbmRlck1ha2VycyhcclxuICAgICAgICAgICAgICAgIE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdExheWVyLFxyXG4gICAgICAgICAgICAgICAgT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0R3JvdXAsXHJcbiAgICAgICAgICAgICAgICB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIuZ2V0U3lzdGVtUG9pbnRGb3JQYXJhbXModGhpcy5yZXN1bHRQYXJhbXMuZGF0YSksXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdEZvck1hcClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyDlhbPpl63lhajpg6jnu5PmnpzlsZXnpLrpobXpnaJcclxuICAgIGNsb3NlQWxsUmVzdWx0KCkge1xyXG4gICAgICAgIHRoaXMuc2hvd1Jlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zaG93QWxsUmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMucmVzdWx0UGFyYW1zLnBhZ2VTaXplID0gNjtcclxuICAgICAgICB0aGlzLnJlc3VsdFBhcmFtcyA9IHRoaXMucGFnaW5hdGlvbi5nZXRCeVBhZ2UodGhpcy5yZXN1bHRQYXJhbXMpO1xyXG4gICAgICAgIHRoaXMuc2V0Q2hlY2tSaWdodFJlc3VsdCh0aGlzLnJlc3VsdFBhcmFtcy5wYWdlU2l6ZSwgMCwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIOaJk+W8gOWFqOmDqOe7k+aenOWxleekuumhtemdolxyXG4gICAgZ29BbGxSZXN1bHQoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93UmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG93QWxsUmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJlc3VsdFBhcmFtcy5wYWdlU2l6ZSA9IDQwO1xyXG4gICAgICAgIHRoaXMucmVzdWx0UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICB0aGlzLnJlc3VsdFBhcmFtcyA9IHRoaXMucGFnaW5hdGlvbi5nZXRCeVBhZ2UodGhpcy5yZXN1bHRQYXJhbXMpO1xyXG4gICAgICAgIHRoaXMuc2V0Q2hlY2tSaWdodFJlc3VsdCh0aGlzLnJlc3VsdFBhcmFtcy5wYWdlU2l6ZSwgMCwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g6I635Y+W56a757q/5Lu75Yqh6K+m5oOFXHJcbiAgICAgKiBAcGFyYW0ge0ludGVsaWdlbnRUYXNrSW5mb30gaXRlbVxyXG4gICAgICovXHJcbiAgICBzaG93QW5hbHlzaXNSZXN1bHQoaXRlbTogSW50ZWxpZ2VudFRhc2tJbmZvKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIGFuYWx5c2VUYXNrVHlwZTogQW5hbHlzZVRhc2tUeXBlLlNlYXJjaEFuYWx5c2VUYXNrUmVzdWx0LFxyXG4gICAgICAgICAgICB0YXNrSWQ6IGl0ZW0uVGFza0lkLFxyXG4gICAgICAgICAgICBUYXNrVHlwZTogaXRlbS5UYXNrVHlwZSxcclxuICAgICAgICAgICAgcGFnZVNpemU6IHRoaXMucmVzdWx0UGFyYW1zLnBhZ2VTaXplLFxyXG4gICAgICAgICAgICBjdXJyZW50UGFnZTogdGhpcy5yZXN1bHRQYXJhbXMuY3VycmVudFBhZ2VcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNlbGYuaW5pdExvYWRpbmdQb3AoKTtcclxuICAgICAgICBzZWxmLmFuYWx5c2lzU2VydmljZS5nZXRPZmZMaW5lRGV0YWlsKHBhcmFtcykudGhlbigocmVzOiBCYWNrUmVzcG9uc2VCb2R5PGFueT4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnBhZ2luYXRpb24uc2V0KCByZXMuZGF0YS5SZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlc3VsdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVzdWx0UGFyYW1zLnBhZ2VTaXplID0gNjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hbmFseXNpc01tYXBTZXJ2ZXIucmVtb3ZlU3lzdGVtUG9pbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZXN1bHRQYXJhbXMgPSBzZWxmLnBhZ2luYXRpb24uZ2V0QnlQYWdlKHNlbGYucmVzdWx0UGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93UmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93Rm9ybSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm5vd09mZkxpbmVJbmZvID0gaXRlbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRDaGVja1JpZ2h0UmVzdWx0KHNlbGYucmVzdWx0UGFyYW1zLnBhZ2VTaXplLCAwLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXllci5jbG9zZShzZWxmLmN1cnJlbnRMYXllckluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXllci5jbG9zZShzZWxmLmN1cnJlbnRMYXllckluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxheWVyRGVjLmluZm8oJ+ayoeacieafpeivouWIsOe7k+aenCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sYXllci5jbG9zZShzZWxmLmN1cnJlbnRMYXllckluZGV4KTtcclxuICAgICAgICAgICAgICAgIHNlbGYubGF5ZXJEZWMud2FybkluZm8oJ+afpeivoue7k+aenOWksei0pScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLyoqXHJcbiAgICAvLyAgKiBAZGVzY3JpcHRpb24g6I635Y+W56a757q/5Lu75Yqh6K+m5oOFXHJcbiAgICAvLyAgKiBAcGFyYW0ge0ludGVsaWdlbnRUYXNrSW5mb30gaXRlbVxyXG4gICAgLy8gICogQHJldHVybnMge1Byb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj59XHJcbiAgICAvLyAgKi9cclxuICAgIC8vIGdldE9mZkxpbmVEZXRhaWwoaXRlbTogSW50ZWxpZ2VudFRhc2tJbmZvKSB7XHJcbiAgICAvLyAgICAgbGV0IHBhcmFtcyA9IHtcclxuICAgIC8vICAgICAgICAgYW5hbHlzZVRhc2tUeXBlOiBBbmFseXNlVGFza1R5cGUuU2VhcmNoQW5hbHlzZVRhc2tSZXN1bHQsXHJcbiAgICAvLyAgICAgICAgIHRhc2tJZDogaXRlbS5UYXNrSWQsXHJcbiAgICAvLyAgICAgICAgIFRhc2tUeXBlOiBpdGVtLlRhc2tUeXBlLFxyXG4gICAgLy8gICAgICAgICBwYWdlU2l6ZTogdGhpcy5yZXN1bHRQYXJhbXMucGFnZVNpemUsXHJcbiAgICAvLyAgICAgICAgIGN1cnJlbnRQYWdlOiB0aGlzLnJlc3VsdFBhcmFtcy5jdXJyZW50UGFnZVxyXG4gICAgLy8gICAgIH07XHJcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMuYW5hbHlzaXNTZXJ2aWNlLmdldE9mZkxpbmVEZXRhaWwocGFyYW1zKS50aGVuKChyZXM6IEJhY2tSZXNwb25zZUJvZHk8RnJlcXVlbmN5QXBwZWFyUmVzdWx0PikgPT4ge1xyXG4gICAgLy8gICAgICAgICBpZiAocmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgLy8gICAgICAgICAgICAgaWYgKHJlcy5kYXRhKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRQYXJhbXMudG90YWxDb3VudCA9IHJlcy5kYXRhLlRvdGFsQ291bnRcclxuICAgIC8vICAgICAgICAgICAgICAgICBpZiAodGhpcy5yZXN1bHRQYXJhbXMudG90YWxDb3VudCAlIHRoaXMucmVzdWx0UGFyYW1zLnBhZ2VTaXplID09PSAwKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0UGFyYW1zLnBhZ2VDb3VudCA9IE1hdGgucm91bmQodGhpcy5yZXN1bHRQYXJhbXMudG90YWxDb3VudCAvIHRoaXMucmVzdWx0UGFyYW1zLnBhZ2VTaXplKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdFBhcmFtcy5wYWdlQ291bnQgPSBNYXRoLmNlaWwodGhpcy5yZXN1bHRQYXJhbXMudG90YWxDb3VudCAvIHRoaXMucmVzdWx0UGFyYW1zLnBhZ2VTaXplKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0RGV0YWlsID0gcmVzLmRhdGE7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q2hlY2tSaWdodFJlc3VsdCh0aGlzLnJlc3VsdFBhcmFtcy5wYWdlU2l6ZSwgMCwgdHJ1ZSk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfSlcclxuICAgIC8vICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5sYXllckRlYy5pbmZvKCfmsqHmnInmn6Xor6LliLDnu5PmnpwnKTtcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMubGF5ZXJEZWMud2FybkluZm8oJ+afpeivoue7k+aenOWksei0pScpO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5pS26JeP5LiO5Y+W5raI5pS26JePXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICovXHJcbiAgICBjbGlja0NvbGxlY3QoZXZlbnQ6IGFueSwgaXRlbTogYW55KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCFpdGVtLmNvbGxlY3RTdGF0dXMpIHtcclxuICAgICAgICAgICAgbGV0IHBhcmFtczogYW55ID0ge1xyXG4gICAgICAgICAgICAgICAganNvbjogYW5ndWxhci50b0pzb24oaXRlbSksXHJcbiAgICAgICAgICAgICAgICBvYmplY3RJRDogaXRlbS5BY2Nlc3NMb2cuSUQsXHJcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBcIkZhY2VcIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzZWxmLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5jb2xsZWN0QWRkSW5mbyhwYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHBhcmFtczogYW55ID0ge1xyXG4gICAgICAgICAgICAgICAgaWRzOiBpdGVtLkFjY2Vzc0xvZy5JRFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzZWxmLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5jb2xsZWN0RGVsZXRlSW5mbyhwYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGl0ZW0uY29sbGVjdFN0YXR1cyA9ICFpdGVtLmNvbGxlY3RTdGF0dXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5YiG5p6QXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICovXHJcbiAgICBjbGlja0FuYWx5c2lzKGV2ZW50OmFueSwgaXRlbTphbnksIHR5cGU6c3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc3RvcmFnZVBhcmFtczogQW5hbHlzaXNTdG9yYWdlUGFyYW1zID0gQW5hbHlzaXNEYXRhVHlwZS5GYWNlO1xyXG4gICAgICAgIHN0b3JhZ2VQYXJhbXMuZGF0YSA9IGl0ZW07XHJcbiAgICAgICAgdGhpcy5oYW5kbGVTdG9yYWdlLnNldFNlc3Npb25TdG9yYWdlRGF0YShzdG9yYWdlUGFyYW1zLmtleSwgc3RvcmFnZVBhcmFtcyk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJBbmFseXNpc1R5cGVcIiwgXCJGYWNlXCIpO1xyXG4gICAgICAgIGlmICh0eXBlID09PSBBbmFseXNpc0dvVG9UeXBlLlRyYWNrLmtleSkge1xyXG4gICAgICAgICAgICB3aW5kb3cub3BlbihBbmFseXNpc0dvVG9UeXBlLlRyYWNrLmRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gQW5hbHlzaXNHb1RvVHlwZS5BY2NvbXBhbnlpbmcua2V5KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKEFuYWx5c2lzR29Ub1R5cGUuQWNjb21wYW55aW5nLmRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gQW5hbHlzaXNHb1RvVHlwZS5GcmVxdWVuY3kua2V5KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKEFuYWx5c2lzR29Ub1R5cGUuRnJlcXVlbmN5LmRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gQW5hbHlzaXNHb1RvVHlwZS5Nb3JlLmtleSkge1xyXG4gICAgICAgICAgICB3aW5kb3cub3BlbihBbmFseXNpc0dvVG9UeXBlLk1vcmUuZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDluIPmjqfkuI7lj5bmtojluIPmjqdcclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIGNsaWNrU3VydmVpbGxhbmNlKGV2ZW50OiBhbnksIGl0ZW06IGFueSkge1xyXG4gICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaXRlbS5zdXJ2ZWlsbGFuY2VTdGF0dXMgPSAhaXRlbS5zdXJ2ZWlsbGFuY2VTdGF0dXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Yqg6L295Lit5Yqo55S7XHJcbiAgICBpbml0TG9hZGluZ1BvcCgpIHtcclxuICAgICAgICBsZXQgc2NvcGU6IHsgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGF5ZXJJbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGxvYWRpbmdBbmFseXNpc0h0bWwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgdGl0bGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhcmVhOiBbJzUwMHB4JywgXCIyODBweFwiXSxcclxuICAgICAgICAgICAgZW5kOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyDmn6XnnIvlhajlm75cclxuICAgIHB1YmxpYyBmdWxsU2NyZWVuKGV2ZW50OiBhbnksIHBhdGg6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IGxheWVyOiBhbnk7IGluZGV4OiBzdHJpbmcsIHBhdGg6IGFueSwgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUuaW5kZXggPSBcImZ1bGxTY3JlZW5Qb3B1cFwiO1xyXG4gICAgICAgIHNjb3BlLnBhdGggPSBwYXRoO1xyXG4gICAgICAgIGlmIChwYXRoKSB7XHJcbiAgICAgICAgICAgIGxldCB3aW5kb3dXOiBhbnkgPSAkKHdpbmRvdykud2lkdGgoKSAqIDAuODtcclxuICAgICAgICAgICAgbGV0IHdpbmRvd0g6IGFueSA9ICQod2luZG93KS5oZWlnaHQoKSAqIDAuODtcclxuICAgICAgICAgICAgbGV0IGNvbnRlbnRIVE1MID0gYDxpbWcgbmctc3JjPSR7cGF0aH0gc3R5bGU9J3dpZHRoOiR7d2luZG93V31weDtoZWlnaHQ6JHt3aW5kb3dIfXB4Oyc+YDtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjbG9zZUJ0bjogMCxcclxuICAgICAgICAgICAgICAgIHNraW46ICdsYXl1aS1sYXllci1ub2JnIG5vLXNjcm9sbCcsXHJcbiAgICAgICAgICAgICAgICBzaGFkZUNsb3NlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2hhZGU6IDAuNixcclxuICAgICAgICAgICAgICAgIGFyZWE6IFt3aW5kb3dXICsgJ3B4Jywgd2luZG93SCArICdweCddLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogY29udGVudEhUTUwsXHJcbiAgICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLm1zZyhcIuWbvueJh+WcsOWdgOS4jeWtmOWcqFwiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ0ZyZXF1ZW5jeUFwcGVhckNvbnRyb2xsZXInLCBGcmVxdWVuY3lBcHBlYXJDb250cm9sbGVyKTsiXX0=
