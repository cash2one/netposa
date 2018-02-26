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
define(["require", "exports", "text!../../selectPopup/checkAreaPopup/check.area.popup.html", "text!../loading/loading.html", "../../common/app/main.app", "../../../core/server/enum/AnalyseTaskOffLine", "./MacCollisionAnalysis", "../../common/Pagination", "../AnalysisEnum", "../../../core/enum/ObjectType", "../../../core/server/enum/CollectDataType", "../../../core/server/enum/AnalysisDataType", "lodash", "css!../style/MacCrash.css", "../../selectPopup/checkAreaPopup/check.area.popup.controller", "../../common/services/resourceRetrieval.service", "../../common/factory/userinfo.cache.factory", "../../common/services/analysis.service", "../../common/factory/layerMsg.factory"], function (require, exports, PopupHtml, loadingAnalysisHtml, main_app_1, AnalyseTaskOffLine_1, MacCollisionAnalysis_1, Pagination_1, AnalysisEnum_1, ObjectType_1, CollectDataType_1, AnalysisDataType_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CacheResult = (function (_super) {
        __extends(CacheResult, _super);
        function CacheResult() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CacheResult;
    }(MacCollisionAnalysis_1.PerceiveCollideAccessesModel));
    exports.CacheResult = CacheResult;
    var MacCollisionAnalysisController = (function () {
        function MacCollisionAnalysisController($scope, $timeout, analysisService, layer, analysisMmapServer, layerDec, userInfoCacheFactory, $interval, resourceRetrievalService) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.analysisService = analysisService;
            this.layer = layer;
            this.analysisMmapServer = analysisMmapServer;
            this.layerDec = layerDec;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.$interval = $interval;
            this.resourceRetrievalService = resourceRetrievalService;
            this.$inject = ['$scope', '$timeout', 'analysisService', 'layer', 'analysisMmapServer', 'layerDec', '$interval', 'resourceRetrievalService'];
            this.MacImpact = [];
            this.FastDateList = AnalysisEnum_1.getFastDataList();
            this.FastDate = [];
            this.showForm = true;
            this.showResult = false;
            this.showAnalysisList = false;
            this.MacCollisionOffLine = [];
            this.windowHeight = AnalysisEnum_1.getWidowSize().height;
            this.resultParams = new Pagination_1.PageParamsAndResult();
            this.selectDrawArr = [];
            this.isSlideResult = [false];
            this.pagination = new Pagination_1.Pagination();
            this.selectDeviceCb = "close.device.popup";
            this.analysisGoTo = AnalysisDataType_1.AnalysisGoToType;
            var self = this;
            self.initParams();
            self.$scope.$on('$destroy', function () {
                try {
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
            self.$scope.$on(self.selectDeviceCb, function (event, deviceIds, status, geometry) {
                if (status) {
                    self.addArea();
                    self.selectDrawArr.push(geometry);
                    self.$timeout(function () {
                        self.MacImpact[self.MacImpact.length - 1].deviceType = deviceIds;
                        self.setFastDate(AnalysisEnum_1.FastData.today, self.MacImpact.length - 1);
                    });
                }
                else {
                    self.analysisMmapServer.removeDrawShape(geometry);
                }
                self.layer.close(self.currentLayerIndex);
            });
            self.setInterval = $interval(function () {
                self.findOffLineList();
            }, 10000);
        }
        MacCollisionAnalysisController.prototype.initParams = function () {
            var params = new MacCollisionAnalysis_1.MacCollisionAnalysisParams();
            params.taskName = "";
            params.macImpactList = [];
            this.requsetParams = params;
        };
        MacCollisionAnalysisController.prototype.delOffLineTask = function (item) {
            var self = this;
            var params = {
                "taskId": item.TaskId,
                "taskType": item.TaskType
            };
            self.analysisService.deleteOffLineDetail(params).then(function (res) {
                if (res.code === 200) {
                    self.layerDec.info('删除成功');
                    self.findOffLineList();
                }
                else {
                    self.layerDec.warnInfo('删除失败');
                }
            });
        };
        MacCollisionAnalysisController.prototype.setFastDate = function (item, index) {
            this.FastDate[index] = item;
            this.MacImpact[index].startTime = item.value.startTime;
            this.MacImpact[index].endTime = item.value.endTime;
        };
        MacCollisionAnalysisController.prototype.goBack = function () {
            var _this = this;
            this.$timeout(function () {
                _this.$scope.$emit('showItemPage', false);
            });
        };
        MacCollisionAnalysisController.prototype.setTime = function (item, index, i) {
            this.FastDate[index] = item;
        };
        MacCollisionAnalysisController.prototype.goBackForm = function () {
            var _this = this;
            this.$timeout(function () {
                _this.showResult = false;
                _this.showForm = true;
                _this.destoryForMapMarker();
                _this.analysisMmapServer.renderSystemPoint();
            });
        };
        MacCollisionAnalysisController.prototype.destoryForMapMarker = function () {
            this.analysisMmapServer.clearDraw();
            this.analysisMmapServer.clearTraceAnalyze();
            this.analysisMmapServer.clearResultMarkers();
            this.analysisMmapServer.clearAccpMarkers();
            this.analysisMmapServer.clearTrackInfoWindow();
        };
        MacCollisionAnalysisController.prototype.openDetailPopup = function (item, index) {
            var self = this;
            var objectType = "";
            var newItem = {};
            var newList = [];
            if (item.WiFiLog) {
                objectType = CollectDataType_1.CollectDataType.WiFi.value;
                newItem.wifiLog = {};
                newItem.wifiLog = item.WiFiLog;
                newList.push(newItem);
            }
            else if (item.EFenceLog) {
                objectType = CollectDataType_1.CollectDataType.EFENCE.value;
                newItem.eFenceLog = {};
                newItem.eFenceLog = item.EFenceLog;
                newList.push(newItem);
            }
            var scope = self.$scope.$new();
            scope.rank = index;
            scope.allList = newList;
            scope.showFooter = true;
            scope.index = "";
            scope.collectFunction = function (item) {
                self.clickCollect(null, item);
            };
            scope.analysisFunction = function (item) {
                self.clickAnalysis(null, item);
            };
            scope.surveillanceFunction = function (item) {
                self.clickSurveillance(null, item);
            };
            scope.closePopup = function () {
                self.layer.close(scope.index);
            };
            self.analysisMmapServer.openDetailPopup(newItem, index, newList, objectType, scope);
        };
        MacCollisionAnalysisController.prototype.resultToMap = function (item, index) {
            var ID = "";
            if (item.WiFiLog) {
                ID = item.AreaNo + item.WiFiLog.ID;
            }
            else if (item.EFenceLog) {
                ID = item.AreaNo + item.EFenceLog.ID;
            }
            this.analysisMmapServer.getMap().setMarkerIcon(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForResultGroup, ID, AnalysisEnum_1.MarkersIcon.HoverRedIcon, 999);
        };
        MacCollisionAnalysisController.prototype.unResultToMap = function (item, index) {
            var ID = "";
            if (item.WiFiLog) {
                ID = item.AreaNo + item.WiFiLog.ID;
            }
            else if (item.EFenceLog) {
                ID = item.AreaNo + item.EFenceLog.ID;
            }
            var res = this.resultForMap[ID];
            this.analysisMmapServer.getMap().setMarkerIcon(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForResultGroup, ID, AnalysisEnum_1.MarkersIcon.NormalBlueIcon, res.resultIndex + 1);
        };
        MacCollisionAnalysisController.prototype.addArea = function () {
            var arr = new MacCollisionAnalysis_1.MacImpact();
            this.FastDate.push(AnalysisEnum_1.FastData.today);
            this.MacImpact.push(arr);
        };
        MacCollisionAnalysisController.prototype.delArea = function (i) {
            var geometry = this.selectDrawArr[i];
            this.analysisMmapServer.removeDrawShape(geometry);
            this.MacImpact.splice(i, 1);
            this.selectDrawArr.splice(i, 1);
        };
        MacCollisionAnalysisController.prototype.showAnalysisListFn = function (flag) {
            this.showAnalysisList = flag;
            if (flag) {
                this.findOffLineList();
            }
        };
        MacCollisionAnalysisController.prototype.findOffLineList = function () {
            var _this = this;
            var params = {
                id: this.userInfoCacheFactory.getCurrentUserId(),
                taskType: AnalyseTaskOffLine_1.OfflineTaskType.SearchPerceiveCollision
            };
            this.analysisService.getOffLineList(params).then(function (res) {
                if (res.code === 200) {
                    _this.MacCollisionOffLine = res.data ? res.data : [];
                }
            });
        };
        MacCollisionAnalysisController.prototype.submitSearch = function () {
            var self = this;
            var params = new MacCollisionAnalysis_1.MacCollisionAnalysisParams();
            params.taskName = self.requsetParams.taskName;
            params.macImpactList = [];
            var item;
            for (var i = 0; i < self.MacImpact.length; i++) {
                item = this.MacImpact[i];
                item.areaNo = "areaNo" + i;
                params.macImpactList.push(item);
            }
            if (params.taskName === "") {
                self.layerDec.warnInfo('请输入任务名称');
                return false;
            }
            if (params.macImpactList.length < 2) {
                self.layerDec.warnInfo('最少选择两个区域');
                return false;
            }
            for (var y = 0; y < params.macImpactList.length; y++) {
                if (params.macImpactList[0].endTime < params.macImpactList[0].startTime) {
                    this.layerDec.warnInfo('开始时间不能晚于结束时间!');
                    return false;
                }
            }
            self.analysisService.macCollision(params).then(function (res) {
                if (res.code === 200) {
                    self.showAnalysisList = true;
                    self.findOffLineList();
                }
                else {
                    self.layerDec.warnInfo('任务创建失败');
                }
            });
        };
        MacCollisionAnalysisController.prototype.setCheckRightResult = function (size, traget, isFirst) {
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
            _.forEach(self.resultParams.data[traget].PerceiveCollideAccesses, function (value) {
                if (value.WiFiLog) {
                    params.deviceIds.push(value.WiFiLog.MacDeviceId);
                    params.ids.push(value.WiFiLog.ID);
                    params.deviceType = ObjectType_1.ObjectType.Wifi.value;
                }
                else if (value.EFenceLog) {
                    params.deviceIds.push(value.EFenceLog.MobileDeviceId);
                    params.ids.push(value.EFenceLog.ID);
                    params.deviceType = ObjectType_1.ObjectType.ElectronicFence.value;
                }
            });
            self.resourceRetrievalService.getDeviceInfoPromise(params).then(function (res) {
                _.forEach(self.resultParams.data[traget].PerceiveCollideAccesses, function (item, index) {
                    item.deviceInfo = res.data.deviceInfo[index];
                    item.collectStatus = res.data.collectStatus[index];
                });
                self.$timeout(function () {
                    self.renderAccpMarkers();
                });
            });
        };
        MacCollisionAnalysisController.prototype.renderAccpMarkers = function () {
            var accpArr = this.resultParams.data[this.resultIndex].PerceiveCollideAccesses;
            var obj = {};
            accpArr.forEach(function (item, index) {
                var ID = "";
                if (item.WiFiLog) {
                    ID = item.AreaNo + item.WiFiLog.ID;
                }
                else if (item.EFenceLog) {
                    ID = item.AreaNo + item.EFenceLog.ID;
                }
                obj[ID] = item;
                obj[ID].resultIndex = index;
            });
            this.resultForMap = obj;
            this.allResult = accpArr;
            this.analysisMmapServer.renderMakers(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForResultGroup, true, this.getSystemPointForParams(this.allResult), this.resultForMap, false, null, AnalysisEnum_1.MarkersIcon.NormalGreenIcon);
        };
        MacCollisionAnalysisController.prototype.getSystemPointForParams = function (points) {
            var _this = this;
            var arr = [];
            points.forEach(function (item) {
                var ID = "";
                if (item.WiFiLog) {
                    ID = item.WiFiLog.MacDeviceId;
                }
                else if (item.EFenceLog) {
                    ID = item.EFenceLog.MobileDeviceId;
                }
                var s = false;
                for (var index = 0; index < _this.analysisMmapServer.getSystemPoint().length; index++) {
                    var point = _this.analysisMmapServer.getSystemPoint()[index];
                    if (ID === point.ObjectID) {
                        s = true;
                        var arrItem = {
                            Lat: point.Lat,
                            Lon: point.Lon,
                            ID: point.ID,
                            ObjectID: point.ObjectID,
                            resultID: "",
                            Descrption: point.Descrption,
                            LayerType: point.LayerType,
                            ObjectType: point.ObjectType,
                            TaskStatus: point.TaskStatus,
                            ObjectState: point.ObjectState,
                            ObjectName: point.ObjectName
                        };
                        if (item.WiFiLog) {
                            arrItem.resultID = item.AreaNo + item.WiFiLog.ID;
                        }
                        else if (item.EFenceLog) {
                            arrItem.resultID = item.AreaNo + item.EFenceLog.ID;
                        }
                        arr.push(arrItem);
                    }
                }
                if (!s) {
                    arr.push(null);
                }
            });
            return arr;
        };
        MacCollisionAnalysisController.prototype.slideRightResult = function (i) {
            this.setCheckRightResult(this.resultParams.pageSize, i);
        };
        MacCollisionAnalysisController.prototype.showAnalysisResult = function (item) {
            var self = this;
            var params = {
                analyseTaskType: AnalyseTaskOffLine_1.AnalyseTaskType.SearchAnalyseTaskResult,
                taskId: item.TaskId,
                TaskType: item.TaskType
            };
            self.destoryForMapMarker();
            self.initParams();
            self.initLoadingPop();
            self.analysisService.getOffLineDetail(params).then(function (res) {
                if (res.code === 200) {
                    if (res.data && res.data.PerceiveCollideEntities && (res.data.PerceiveCollideEntities.length > 0)) {
                        self.offLineResult = res.data;
                        self.pagination.set(res.data.PerceiveCollideEntities);
                        self.showResult = true;
                        self.showForm = false;
                        self.resultParams.currentPage = 1;
                        self.resultParams.pageSize = 6;
                        self.$timeout(function () {
                            self.analysisMmapServer.removeSystemPoint();
                            self.resultParams = self.pagination.getByPage(self.resultParams);
                            self.allResult = self.resultParams.allData;
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
        MacCollisionAnalysisController.prototype.DrawRect = function () {
            var _this = this;
            this.analysisMmapServer.drawRect(function (points, geometry) {
                _this.$timeout(function () {
                    _this.DrawCallBackMethod(points, geometry);
                });
            });
        };
        MacCollisionAnalysisController.prototype.DrawCircle = function () {
            var _this = this;
            this.analysisMmapServer.drawCircle(function (points, geometry) {
                _this.$timeout(function () {
                    _this.DrawCallBackMethod(points, geometry);
                });
            });
        };
        MacCollisionAnalysisController.prototype.DrawPolygon = function () {
            var _this = this;
            this.analysisMmapServer.drawPolygon(function (points, geometry) {
                _this.$timeout(function () {
                    _this.DrawCallBackMethod(points, geometry);
                });
            });
        };
        MacCollisionAnalysisController.prototype.DrawCallBackMethod = function (points, geometry) {
            var self = this;
            if (self.requsetParams.macImpactList.length < 5) {
                var arr_1 = [];
                points.forEach(function (item) {
                    if (item.ObjectType === ObjectType_1.ObjectType.Wifi.value) {
                        arr_1.push(item);
                    }
                    else if (item.ObjectType === ObjectType_1.ObjectType.ElectronicFence.value) {
                        arr_1.push(item);
                    }
                });
                if (arr_1.length === 0) {
                    self.analysisMmapServer.removeDrawShape(geometry);
                    return self.layerDec.warnInfo('框选区域不存在设备！');
                }
                else {
                    self.checkArea(arr_1, geometry);
                }
            }
            else {
                self.analysisMmapServer.removeDrawShape(geometry);
                return self.layerDec.warnInfo('碰撞区域最大只能有5个！');
            }
        };
        MacCollisionAnalysisController.prototype.checkArea = function (deviceList, geometry) {
            var scope = this.$scope.$new();
            scope.deviceList = deviceList;
            scope.geometry = geometry;
            scope.selectCheckAreaCb = this.selectDeviceCb;
            scope.cbDataList = [ObjectType_1.ObjectType.Wifi.value, ObjectType_1.ObjectType.ElectronicFence.value];
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
        MacCollisionAnalysisController.prototype.initLoadingPop = function () {
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
        MacCollisionAnalysisController.prototype.changeResultPage = function (i) {
            this.resultParams.currentPage = i;
            this.resultParams = this.pagination.getByPage(this.resultParams);
            this.setCheckRightResult(this.resultParams.pageSize, 0, true);
        };
        MacCollisionAnalysisController.prototype.clickCollect = function (event, item) {
            if (event) {
                event.stopPropagation();
            }
            var self = this;
            var ID = "";
            var objectType = "";
            var newItem = {};
            if (item.WiFiLog) {
                ID = item.AreaNo + item.WiFiLog.ID;
                newItem.wifiLog = item.WiFiLog;
                newItem.deviceInfo = item.deviceInfo;
                objectType = CollectDataType_1.CollectDataType.WiFi.value;
            }
            else if (item.EFenceLog) {
                ID = item.AreaNo + item.EFenceLog.ID;
                newItem.eFenceLog = item.EFenceLog;
                newItem.deviceInfo = item.deviceInfo;
                objectType = CollectDataType_1.CollectDataType.EFENCE.value;
            }
            if (!item.collectStatus) {
                var params = {
                    json: JSON.stringify(newItem),
                    objectID: ID,
                    objectType: objectType
                };
                self.resourceRetrievalService.collectAddInfo(params)
                    .then(function (res) {
                    if (res) {
                    }
                });
            }
            else {
                var params = {
                    ids: ID
                };
                self.resourceRetrievalService.collectDeleteInfo(params)
                    .then(function (res) {
                    if (res) {
                    }
                });
            }
            item.collectStatus = !item.collectStatus;
        };
        MacCollisionAnalysisController.prototype.clickAnalysis = function (event, item) {
            if (event) {
                event.stopPropagation();
            }
        };
        MacCollisionAnalysisController.prototype.clickSurveillance = function (event, item) {
            if (event) {
                event.stopPropagation();
            }
            item.surveillanceStatus = !item.surveillanceStatus;
        };
        return MacCollisionAnalysisController;
    }());
    main_app_1.app.controller('macCollisionAnalysisController', MacCollisionAnalysisController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9NYWNDb2xsaXNpb25BbmFseXNpcy9NYWNDb2xsaXNpb25BbmFseXNpcy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUF5Q0E7UUFBaUMsK0JBQTRCO1FBQTdEOztRQUVBLENBQUM7UUFBRCxrQkFBQztJQUFELENBRkEsQUFFQyxDQUZnQyxtREFBNEIsR0FFNUQ7SUFGWSxrQ0FBVztJQUl4QjtRQTJCSSx3Q0FBb0IsTUFBVyxFQUNYLFFBQWEsRUFDYixlQUFpQyxFQUNqQyxLQUFVLEVBQ1Ysa0JBQXVDLEVBQ3ZDLFFBQW1CLEVBQ25CLG9CQUEyQyxFQUMzQyxTQUFhLEVBQ2Isd0JBQW1EO1lBUm5ELFdBQU0sR0FBTixNQUFNLENBQUs7WUFDWCxhQUFRLEdBQVIsUUFBUSxDQUFLO1lBQ2Isb0JBQWUsR0FBZixlQUFlLENBQWtCO1lBQ2pDLFVBQUssR0FBTCxLQUFLLENBQUs7WUFDVix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXFCO1lBQ3ZDLGFBQVEsR0FBUixRQUFRLENBQVc7WUFDbkIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUF1QjtZQUMzQyxjQUFTLEdBQVQsU0FBUyxDQUFJO1lBQ2IsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEyQjtZQWxDdkUsWUFBTyxHQUFrQixDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztZQUV2SixjQUFTLEdBQXFCLEVBQUUsQ0FBQztZQUVqQyxpQkFBWSxHQUE0Qiw4QkFBZSxFQUFFLENBQUM7WUFDMUQsYUFBUSxHQUE0QixFQUFFLENBQUM7WUFDdkMsYUFBUSxHQUFZLElBQUksQ0FBQztZQUN6QixlQUFVLEdBQVksS0FBSyxDQUFDO1lBQzVCLHFCQUFnQixHQUFZLEtBQUssQ0FBQztZQUNsQyx3QkFB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O1lBQ1YsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksTUFBTSxHQUFRO29CQUNkLEdBQUcsRUFBRSxFQUFFO2lCQUNWLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLHdCQUF3QixDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQztxQkFDbEQsSUFBSSxDQUFDLFVBQUMsR0FBUTtvQkFDWCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUVWLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUE7WUFDVixDQUFDO1lBQ0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDN0MsQ0FBQztRQU1ELHNEQUFhLEdBQWIsVUFBYyxLQUFVLEVBQUUsSUFBUztZQUMvQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNSLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUM1QixDQUFDO1FBRUwsQ0FBQztRQU1ELDBEQUFpQixHQUFqQixVQUFrQixLQUFVLEVBQUUsSUFBUztZQUNuQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNSLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUM1QixDQUFDO1lBQ0QsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBQ3ZELENBQUM7UUFDTCxxQ0FBQztJQUFELENBemtCQSxBQXlrQkMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsZ0NBQWdDLEVBQUUsOEJBQThCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9NYWNDb2xsaXNpb25BbmFseXNpcy9NYWNDb2xsaXNpb25BbmFseXNpcy5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi8uLi9zZWxlY3RQb3B1cC9jaGVja0FyZWFQb3B1cC9jaGVjay5hcmVhLnBvcHVwLmh0bWxcIiBuYW1lPVwiUG9wdXBIdG1sXCIgLz5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi9sb2FkaW5nL2xvYWRpbmcuaHRtbFwiIG5hbWU9XCJsb2FkaW5nQW5hbHlzaXNIdG1sXCIgLz5cclxuaW1wb3J0IHthcHB9IGZyb20gJy4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHAnO1xyXG5pbXBvcnQgJ2NzcyEuLi9zdHlsZS9NYWNDcmFzaC5jc3MnO1xyXG5cclxuLy8g5by55qGGXHJcbmltcG9ydCAnLi4vLi4vc2VsZWN0UG9wdXAvY2hlY2tBcmVhUG9wdXAvY2hlY2suYXJlYS5wb3B1cC5jb250cm9sbGVyJztcclxuXHJcbi8vIOacjeWKoVxyXG5pbXBvcnQgJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9yZXNvdXJjZVJldHJpZXZhbC5zZXJ2aWNlJztcclxuaW1wb3J0IHtJUmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlfSBmcm9tICcuLi8uLi9jb21tb24vc2VydmljZXMvcmVzb3VyY2VSZXRyaWV2YWwuc2VydmljZSc7XHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL2ZhY3RvcnkvdXNlcmluZm8uY2FjaGUuZmFjdG9yeSc7XHJcbmltcG9ydCB7SVVzZXJJbmZvQ2FjaGVGYWN0b3J5fSBmcm9tICcuLi8uLi9jb21tb24vZmFjdG9yeS91c2VyaW5mby5jYWNoZS5mYWN0b3J5JztcclxuaW1wb3J0ICcuLi8uLi9jb21tb24vc2VydmljZXMvYW5hbHlzaXMuc2VydmljZSc7XHJcbmltcG9ydCB7SUFuYWx5c2lzU2VydmljZX0gZnJvbSAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FuYWx5c2lzLnNlcnZpY2UnO1xyXG5pbXBvcnQgJy4uLy4uL2NvbW1vbi9mYWN0b3J5L2xheWVyTXNnLmZhY3RvcnknO1xyXG5pbXBvcnQge0lMYXllckRlY30gZnJvbSAnLi4vLi4vY29tbW9uL2ZhY3RvcnkvbGF5ZXJNc2cuZmFjdG9yeSc7XHJcblxyXG4vLyDlj4LmlbBcclxuaW1wb3J0IHtBbmFseXNlVGFza1R5cGUsIE9mZmxpbmVUYXNrVHlwZX0gZnJvbSAnLi4vLi4vLi4vY29yZS9zZXJ2ZXIvZW51bS9BbmFseXNlVGFza09mZkxpbmUnO1xyXG5pbXBvcnQge0JhY2tSZXNwb25zZUJvZHl9IGZyb20gJy4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdCc7XHJcbmltcG9ydCB7XHJcbiAgICBEZXZpY2VUeXBlLFxyXG4gICAgTWFjQ29sbGlzaW9uQW5hbHlzaXNQYXJhbXMsXHJcbiAgICBNYWNDb2xsaXNpb25BbmFseXNpc1Jlc3VsdCxcclxuICAgIE1hY0ltcGFjdCxcclxuICAgIFBlcmNlaXZlQ29sbGlkZUFjY2Vzc2VzTW9kZWxcclxufSBmcm9tICcuL01hY0NvbGxpc2lvbkFuYWx5c2lzJztcclxuaW1wb3J0IHtJQW5hbHlzaXNNbWFwU2VydmVyfSBmcm9tICcuLi9tYWluL2FuYWx5c2lzTW1hcC5zZXJ2ZXInO1xyXG5pbXBvcnQge0ludGVsaWdlbnRUYXNrSW5mb30gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvSW50ZWxpZ2VudFRhc2tJbmZvJztcclxuaW1wb3J0IHtJUGFnaW5hdGlvbiwgUGFnZVBhcmFtc0FuZFJlc3VsdCwgUGFnaW5hdGlvbn0gZnJvbSAnLi4vLi4vY29tbW9uL1BhZ2luYXRpb24nO1xyXG5pbXBvcnQge1N5c3RlbVBvaW50fSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9TeXN0ZW1Qb2ludCc7XHJcbmltcG9ydCB7RmFzdERhdGEsIGdldEZhc3REYXRhTGlzdCwgRW51bSwgVGltZUxlbmd0aCwgZ2V0V2lkb3dTaXplLCBPdmVybGF5TmFtZSwgTWFya2Vyc0ljb24sfSBmcm9tICcuLi9BbmFseXNpc0VudW0nO1xyXG5pbXBvcnQge09iamVjdFR5cGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW51bS9PYmplY3RUeXBlJztcclxuaW1wb3J0IHtDb2xsZWN0RGF0YVR5cGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vQ29sbGVjdERhdGFUeXBlJztcclxuaW1wb3J0IHtBbmFseXNpc0RhdGFUeXBlLCBBbmFseXNpc1N0b3JhZ2VQYXJhbXMsIEFuYWx5c2lzR29Ub1R5cGV9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL0FuYWx5c2lzRGF0YVR5cGVcIjtcclxuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XHJcblxyXG5cclxuZGVjbGFyZSBsZXQgUG9wdXBIdG1sOiBhbnksIGFuZ3VsYXI6IGFueSwgbG9hZGluZ0FuYWx5c2lzSHRtbDogYW55O1xyXG5cclxuZXhwb3J0IGNsYXNzIENhY2hlUmVzdWx0IGV4dGVuZHMgUGVyY2VpdmVDb2xsaWRlQWNjZXNzZXNNb2RlbCB7XHJcbiAgICByZXN1bHRJbmRleDogbnVtYmVyO1xyXG59XHJcblxyXG5jbGFzcyBNYWNDb2xsaXNpb25BbmFseXNpc0NvbnRyb2xsZXIge1xyXG4gICAgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFsnJHNjb3BlJywgJyR0aW1lb3V0JywgJ2FuYWx5c2lzU2VydmljZScsICdsYXllcicsICdhbmFseXNpc01tYXBTZXJ2ZXInLCAnbGF5ZXJEZWMnLCAnJGludGVydmFsJywgJ3Jlc291cmNlUmV0cmlldmFsU2VydmljZSddO1xyXG4gICAgc3lzdGVtUG9pbnRMaXN0OiBBcnJheTxTeXN0ZW1Qb2ludD47XHJcbiAgICBNYWNJbXBhY3Q6IEFycmF5PE1hY0ltcGFjdD4gPSBbXTtcclxuICAgIHJlcXVzZXRQYXJhbXM6IE1hY0NvbGxpc2lvbkFuYWx5c2lzUGFyYW1zO1xyXG4gICAgRmFzdERhdGVMaXN0OiBBcnJheTxFbnVtPFRpbWVMZW5ndGg+PiA9IGdldEZhc3REYXRhTGlzdCgpO1xyXG4gICAgRmFzdERhdGU6IEFycmF5PEVudW08VGltZUxlbmd0aD4+ID0gW107XHJcbiAgICBzaG93Rm9ybTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBzaG93UmVzdWx0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBzaG93QW5hbHlzaXNMaXN0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBNYWNDb2xsaXNpb25PZmZMaW5lOiBBcnJheTxJbnRlbGlnZW50VGFza0luZm8+ID0gW107XHJcbiAgICBvZmZMaW5lUmVzdWx0OiBNYWNDb2xsaXNpb25BbmFseXNpc1Jlc3VsdDtcclxuICAgIHdpbmRvd0hlaWdodDogbnVtYmVyID0gZ2V0V2lkb3dTaXplKCkuaGVpZ2h0O1xyXG4gICAgcmVzdWx0UGFyYW1zOiBQYWdlUGFyYW1zQW5kUmVzdWx0ID0gbmV3IFBhZ2VQYXJhbXNBbmRSZXN1bHQoKTtcclxuICAgIGFsbFRyYWNrUmVzdWx0OiBBcnJheTxhbnk+O1xyXG4gICAgdHJhY2tSZXN1bHRGb3JNYXA6IHsgW2tleTogc3RyaW5nXTogYW55IH07XHJcbiAgICBjdXJyZW50TGF5ZXJJbmRleDogbnVtYmVyO1xyXG4gICAgc2VsZWN0RHJhd0FycjogQXJyYXk8TlBNYXBMaWIuT3ZlcmxheT4gPSBbXTtcclxuICAgIGlzU2xpZGVSZXN1bHQ6IEFycmF5PGJvb2xlYW4+ID0gW2ZhbHNlXTtcclxuICAgIHBhZ2luYXRpb246IElQYWdpbmF0aW9uID0gbmV3IFBhZ2luYXRpb24oKTtcclxuICAgIHJlc3VsdEluZGV4OiBudW1iZXI7XHJcbiAgICByZXN1bHRGb3JNYXA6IHsgW2tleTogc3RyaW5nXTogQ2FjaGVSZXN1bHQgfTtcclxuICAgIGFsbFJlc3VsdDogQXJyYXk8UGVyY2VpdmVDb2xsaWRlQWNjZXNzZXNNb2RlbD47XHJcbiAgICBzZWxlY3REZXZpY2VDYjogc3RyaW5nID0gXCJjbG9zZS5kZXZpY2UucG9wdXBcIjtcclxuICAgIHNldEludGVydmFsOmFueTtcclxuICAgIGFuYWx5c2lzR29UbyA9IEFuYWx5c2lzR29Ub1R5cGU7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgYW5hbHlzaXNTZXJ2aWNlOiBJQW5hbHlzaXNTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBsYXllcjogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBhbmFseXNpc01tYXBTZXJ2ZXI6IElBbmFseXNpc01tYXBTZXJ2ZXIsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGxheWVyRGVjOiBJTGF5ZXJEZWMsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHVzZXJJbmZvQ2FjaGVGYWN0b3J5OiBJVXNlckluZm9DYWNoZUZhY3RvcnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICRpbnRlcnZhbDphbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJlc291cmNlUmV0cmlldmFsU2VydmljZTogSVJlc291cmNlUmV0cmlldmFsU2VydmljZSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgc2VsZi5pbml0UGFyYW1zKCk7XHJcbiAgICAgICAgc2VsZi4kc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHNlbGYuZGVzdG9yeUZvck1hcE1hcmtlcigpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCfop6blj5Hnm7TmjqXplIDmr4FNYXDkuovku7bvvIzlr7zoh7RtYXDlr7nosaHooqvplIDmr4HvvIzovajov7nop6blj5Hoh6rouqvnmoTplIDmr4Hkuovku7bkuK3ml6Dms5Xojrflj5ZtYXDlr7nosaHlr7zoh7TnmoTmiqXplJnvvIzlj6/ku6Xlv73nlaXvvIEnLCBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkaW50ZXJ2YWwuY2FuY2VsKHNlbGYuc2V0SW50ZXJ2YWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNlbGYuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kZW1pdCgnc2hvd0l0ZW1QYWdlJywgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8g55uR5ZCs6K6+5aSH6L+U5Zue5LqL5Lu2XHJcbiAgICAgICAgc2VsZi4kc2NvcGUuJG9uKHNlbGYuc2VsZWN0RGV2aWNlQ2IsIChldmVudDogYW55LCBkZXZpY2VJZHM6IGFueSwgc3RhdHVzOmJvb2xlYW4sIGdlb21ldHJ5PzogTlBNYXBMaWIuR2VvbWV0cnkuUG9seWdvbikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmFkZEFyZWEoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0RHJhd0Fyci5wdXNoKGdlb21ldHJ5KTtcclxuICAgICAgICAgICAgICAgIHNlbGYuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuTWFjSW1wYWN0W3NlbGYuTWFjSW1wYWN0Lmxlbmd0aCAtIDFdLmRldmljZVR5cGUgPSBkZXZpY2VJZHM7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRGYXN0RGF0ZShGYXN0RGF0YS50b2RheSwgc2VsZi5NYWNJbXBhY3QubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuYW5hbHlzaXNNbWFwU2VydmVyLnJlbW92ZURyYXdTaGFwZShnZW9tZXRyeSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5sYXllci5jbG9zZShzZWxmLmN1cnJlbnRMYXllckluZGV4KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIOWumuaXtuivt+axguemu+e6v+S7u+WKoVxyXG4gICAgICAgIHNlbGYuc2V0SW50ZXJ2YWwgID0gJGludGVydmFsKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNlbGYuZmluZE9mZkxpbmVMaXN0KCk7XHJcbiAgICAgICAgfSwgMTAwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFBhcmFtcygpIHtcclxuICAgICAgICBsZXQgcGFyYW1zOiBNYWNDb2xsaXNpb25BbmFseXNpc1BhcmFtcyA9IG5ldyBNYWNDb2xsaXNpb25BbmFseXNpc1BhcmFtcygpO1xyXG4gICAgICAgIHBhcmFtcy50YXNrTmFtZSA9IFwiXCI7XHJcbiAgICAgICAgcGFyYW1zLm1hY0ltcGFjdExpc3QgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5yZXF1c2V0UGFyYW1zID0gcGFyYW1zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOWIoOmZpOemu+e6v+S7u+WKoVxyXG4gICAgICogQHBhcmFtIHtBY2NvbXBPZmZMaW5lfSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGVsT2ZmTGluZVRhc2soaXRlbTogSW50ZWxpZ2VudFRhc2tJbmZvKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIFwidGFza0lkXCI6IGl0ZW0uVGFza0lkLFxyXG4gICAgICAgICAgICBcInRhc2tUeXBlXCI6IGl0ZW0uVGFza1R5cGVcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNlbGYuYW5hbHlzaXNTZXJ2aWNlLmRlbGV0ZU9mZkxpbmVEZXRhaWwocGFyYW1zKS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sYXllckRlYy5pbmZvKCfliKDpmaTmiJDlip8nKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuZmluZE9mZkxpbmVMaXN0KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxheWVyRGVjLndhcm5JbmZvKCfliKDpmaTlpLHotKUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgc2V0RmFzdERhdGUoaXRlbTogRW51bTxUaW1lTGVuZ3RoPiwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuRmFzdERhdGVbaW5kZXhdID0gaXRlbTtcclxuICAgICAgICB0aGlzLk1hY0ltcGFjdFtpbmRleF0uc3RhcnRUaW1lID0gaXRlbS52YWx1ZS5zdGFydFRpbWU7XHJcbiAgICAgICAgdGhpcy5NYWNJbXBhY3RbaW5kZXhdLmVuZFRpbWUgPSBpdGVtLnZhbHVlLmVuZFRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ29CYWNrKCkge1xyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kZW1pdCgnc2hvd0l0ZW1QYWdlJywgZmFsc2UpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZShpdGVtOiBFbnVtPFRpbWVMZW5ndGg+LCBpbmRleDogbnVtYmVyLCBpOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLkZhc3REYXRlW2luZGV4XSA9IGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgZ29CYWNrRm9ybSgpIHtcclxuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaG93UmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0Zvcm0gPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmRlc3RvcnlGb3JNYXBNYXJrZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIucmVuZGVyU3lzdGVtUG9pbnQoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGVzdG9yeUZvck1hcE1hcmtlcigpIHtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5jbGVhckRyYXcoKTtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5jbGVhclRyYWNlQW5hbHl6ZSgpO1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmNsZWFyUmVzdWx0TWFya2VycygpO1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmNsZWFyQWNjcE1hcmtlcnMoKTtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5jbGVhclRyYWNrSW5mb1dpbmRvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIG9wZW5EZXRhaWxQb3B1cChpdGVtOiBDYWNoZVJlc3VsdCwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgb2JqZWN0VHlwZTpzdHJpbmcgPVwiXCI7XHJcbiAgICAgICAgbGV0IG5ld0l0ZW06IGFueSA9IHt9O1xyXG4gICAgICAgIGxldCBuZXdMaXN0OkFycmF5PGFueT4gPSBbXTtcclxuICAgICAgICBpZiAoaXRlbS5XaUZpTG9nKSB7XHJcbiAgICAgICAgICAgIG9iamVjdFR5cGUgPSBDb2xsZWN0RGF0YVR5cGUuV2lGaS52YWx1ZTtcclxuICAgICAgICAgICAgbmV3SXRlbS53aWZpTG9nID0ge307XHJcbiAgICAgICAgICAgIG5ld0l0ZW0ud2lmaUxvZyA9IGl0ZW0uV2lGaUxvZztcclxuICAgICAgICAgICAgbmV3TGlzdC5wdXNoKG5ld0l0ZW0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbS5FRmVuY2VMb2cpIHtcclxuICAgICAgICAgICAgb2JqZWN0VHlwZSA9IENvbGxlY3REYXRhVHlwZS5FRkVOQ0UudmFsdWU7XHJcbiAgICAgICAgICAgIG5ld0l0ZW0uZUZlbmNlTG9nID0ge307XHJcbiAgICAgICAgICAgIG5ld0l0ZW0uZUZlbmNlTG9nID0gaXRlbS5FRmVuY2VMb2c7XHJcbiAgICAgICAgICAgIG5ld0xpc3QucHVzaChuZXdJdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7XHJcbiAgICAgICAgICAgICRkZXN0cm95OiBGdW5jdGlvbixcclxuICAgICAgICAgICAgcmFuazogbnVtYmVyLFxyXG4gICAgICAgICAgICBhbGxMaXN0OiBBcnJheTxhbnk+LFxyXG4gICAgICAgICAgICBjb2xsZWN0RnVuY3Rpb246IEZ1bmN0aW9uLFxyXG4gICAgICAgICAgICBhbmFseXNpc0Z1bmN0aW9uOiBGdW5jdGlvbixcclxuICAgICAgICAgICAgc3VydmVpbGxhbmNlRnVuY3Rpb246IEZ1bmN0aW9uLFxyXG4gICAgICAgICAgICBjbG9zZVBvcHVwOiBGdW5jdGlvbixcclxuICAgICAgICAgICAgc2hvd0Zvb3RlcjogYm9vbGVhblxyXG4gICAgICAgICAgICBpbmRleDphbnlcclxuICAgICAgICB9ID0gc2VsZi4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLnJhbmsgPSBpbmRleDtcclxuICAgICAgICBzY29wZS5hbGxMaXN0ID0gIG5ld0xpc3Q7XHJcbiAgICAgICAgc2NvcGUuc2hvd0Zvb3RlciA9IHRydWU7XHJcbiAgICAgICAgc2NvcGUuaW5kZXggPSBcIlwiO1xyXG4gICAgICAgIHNjb3BlLmNvbGxlY3RGdW5jdGlvbiA9IChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5jbGlja0NvbGxlY3QobnVsbCwgaXRlbSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzY29wZS5hbmFseXNpc0Z1bmN0aW9uID0gKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLmNsaWNrQW5hbHlzaXMobnVsbCwgaXRlbSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzY29wZS5zdXJ2ZWlsbGFuY2VGdW5jdGlvbiA9IChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5jbGlja1N1cnZlaWxsYW5jZShudWxsLCBpdGVtKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNjb3BlLmNsb3NlUG9wdXAgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYubGF5ZXIuY2xvc2Uoc2NvcGUuaW5kZXgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2VsZi5hbmFseXNpc01tYXBTZXJ2ZXIub3BlbkRldGFpbFBvcHVwKG5ld0l0ZW0sIGluZGV4LCBuZXdMaXN0LCBvYmplY3RUeXBlLCBzY29wZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIOagueaNrue7k+aenOaYvuekuuWcsOWbvuWvueW6lOeahOeCueS9jVxyXG4gICAgcmVzdWx0VG9NYXAoaXRlbTogQ2FjaGVSZXN1bHQsIGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgSUQgPSBcIlwiO1xyXG4gICAgICAgIGlmIChpdGVtLldpRmlMb2cpIHtcclxuICAgICAgICAgICAgSUQgPSBpdGVtLkFyZWFObyArIGl0ZW0uV2lGaUxvZy5JRDtcclxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uRUZlbmNlTG9nKSB7XHJcbiAgICAgICAgICAgIElEID0gaXRlbS5BcmVhTm8gKyBpdGVtLkVGZW5jZUxvZy5JRDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIuZ2V0TWFwKCkuc2V0TWFya2VySWNvbihPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRMYXllciwgT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0R3JvdXAsIElELCBNYXJrZXJzSWNvbi5Ib3ZlclJlZEljb24sIDk5OSlcclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE8g5Y+W5raI57uT5p6c5pi+56S65Zyw5Zu+5a+55bqU55qE54K55L2NXHJcbiAgICB1blJlc3VsdFRvTWFwKGl0ZW06IENhY2hlUmVzdWx0LCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IElEID0gXCJcIjtcclxuICAgICAgICBpZiAoaXRlbS5XaUZpTG9nKSB7XHJcbiAgICAgICAgICAgIElEID0gaXRlbS5BcmVhTm8gKyBpdGVtLldpRmlMb2cuSUQ7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLkVGZW5jZUxvZykge1xyXG4gICAgICAgICAgICBJRCA9IGl0ZW0uQXJlYU5vICsgaXRlbS5FRmVuY2VMb2cuSUQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZXMgPSB0aGlzLnJlc3VsdEZvck1hcFtJRF07XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIuZ2V0TWFwKCkuc2V0TWFya2VySWNvbihPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRMYXllciwgT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0R3JvdXAsIElELCBNYXJrZXJzSWNvbi5Ob3JtYWxCbHVlSWNvbiwgcmVzLnJlc3VsdEluZGV4ICsgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkQXJlYSgpIHtcclxuICAgICAgICBsZXQgYXJyID0gbmV3IE1hY0ltcGFjdCgpO1xyXG4gICAgICAgIHRoaXMuRmFzdERhdGUucHVzaChGYXN0RGF0YS50b2RheSk7XHJcbiAgICAgICAgdGhpcy5NYWNJbXBhY3QucHVzaChhcnIpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbEFyZWEoaTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGdlb21ldHJ5ID0gdGhpcy5zZWxlY3REcmF3QXJyW2ldO1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLnJlbW92ZURyYXdTaGFwZShnZW9tZXRyeSk7XHJcbiAgICAgICAgdGhpcy5NYWNJbXBhY3Quc3BsaWNlKGksIDEpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0RHJhd0Fyci5zcGxpY2UoaSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIOaYvuekuuemu+e6v+S7u+WKoeWIl+ihqFxyXG4gICAgc2hvd0FuYWx5c2lzTGlzdEZuKGZsYWc6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLnNob3dBbmFseXNpc0xpc3QgPSBmbGFnO1xyXG4gICAgICAgIGlmIChmbGFnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmluZE9mZkxpbmVMaXN0KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIOiOt+WPluemu+e6v+S7u+WKoeWIl+ihqFxyXG4gICAgZmluZE9mZkxpbmVMaXN0KCkge1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIGlkOiB0aGlzLnVzZXJJbmZvQ2FjaGVGYWN0b3J5LmdldEN1cnJlbnRVc2VySWQoKSxcclxuICAgICAgICAgICAgdGFza1R5cGU6IE9mZmxpbmVUYXNrVHlwZS5TZWFyY2hQZXJjZWl2ZUNvbGxpc2lvblxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc1NlcnZpY2UuZ2V0T2ZmTGluZUxpc3QocGFyYW1zKS50aGVuKChyZXM6IEJhY2tSZXNwb25zZUJvZHk8QXJyYXk8SW50ZWxpZ2VudFRhc2tJbmZvPj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTWFjQ29sbGlzaW9uT2ZmTGluZSA9IHJlcy5kYXRhID8gcmVzLmRhdGEgOiBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgc3VibWl0U2VhcmNoKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgcGFyYW1zOiBNYWNDb2xsaXNpb25BbmFseXNpc1BhcmFtcyA9IG5ldyBNYWNDb2xsaXNpb25BbmFseXNpc1BhcmFtcygpO1xyXG4gICAgICAgIHBhcmFtcy50YXNrTmFtZSA9IHNlbGYucmVxdXNldFBhcmFtcy50YXNrTmFtZTtcclxuICAgICAgICBwYXJhbXMubWFjSW1wYWN0TGlzdCA9IFtdO1xyXG4gICAgICAgIGxldCBpdGVtOiBNYWNJbXBhY3Q7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxmLk1hY0ltcGFjdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpdGVtID0gdGhpcy5NYWNJbXBhY3RbaV07XHJcbiAgICAgICAgICAgIGl0ZW0uYXJlYU5vID0gXCJhcmVhTm9cIiArIGk7XHJcbiAgICAgICAgICAgIHBhcmFtcy5tYWNJbXBhY3RMaXN0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXJhbXMudGFza05hbWUgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgc2VsZi5sYXllckRlYy53YXJuSW5mbygn6K+36L6T5YWl5Lu75Yqh5ZCN56ewJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBhcmFtcy5tYWNJbXBhY3RMaXN0Lmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgc2VsZi5sYXllckRlYy53YXJuSW5mbygn5pyA5bCR6YCJ5oup5Lik5Liq5Yy65Z+fJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKGxldCB5ID0gMDsgeSA8IHBhcmFtcy5tYWNJbXBhY3RMaXN0Lmxlbmd0aDsgeSsrKXtcclxuICAgICAgICAgICAgLy8g5Yik5pat5pe26Ze0XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMubWFjSW1wYWN0TGlzdFswXS5lbmRUaW1lIDwgcGFyYW1zLm1hY0ltcGFjdExpc3RbMF0uc3RhcnRUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyRGVjLndhcm5JbmZvKCflvIDlp4vml7bpl7TkuI3og73mmZrkuo7nu5PmnZ/ml7bpl7QhJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5hbmFseXNpc1NlcnZpY2UubWFjQ29sbGlzaW9uKHBhcmFtcykudGhlbigocmVzOiBCYWNrUmVzcG9uc2VCb2R5PE1hY0NvbGxpc2lvbkFuYWx5c2lzUmVzdWx0PikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zaG93QW5hbHlzaXNMaXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuZmluZE9mZkxpbmVMaXN0KClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubGF5ZXJEZWMud2FybkluZm8oJ+S7u+WKoeWIm+W7uuWksei0pScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q2hlY2tSaWdodFJlc3VsdChzaXplOiBudW1iZXIsIHRyYWdldDogbnVtYmVyLCBpc0ZpcnN0PzogYm9vbGVhbikge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8Ym9vbGVhbj47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGkgPT09IHRyYWdldCkge1xyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2goIXNlbGYuaXNTbGlkZVJlc3VsdFt0cmFnZXRdKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2goZmFsc2UpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5yZXN1bHRJbmRleCA9IHRyYWdldDtcclxuICAgICAgICBpZiAoaXNGaXJzdCkge1xyXG4gICAgICAgICAgICBhcnJbdHJhZ2V0XSA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5pc1NsaWRlUmVzdWx0ID0gYXJyO1xyXG5cclxuICAgICAgICAvLyDlpITnkIborr7lpIfkuI7mlLbol4/nirbmgIHmlbDmja5cclxuICAgICAgICBsZXQgcGFyYW1zOmFueSA9IHtcclxuICAgICAgICAgICAgZGV2aWNlSWRzOiBbXSxcclxuICAgICAgICAgICAgZGV2aWNlVHlwZTogJycsXHJcbiAgICAgICAgICAgIGlkczogW10sXHJcbiAgICAgICAgICAgIHVzZXJJZDogc2VsZi51c2VySW5mb0NhY2hlRmFjdG9yeS5nZXRDdXJyZW50VXNlcklkKClcclxuICAgICAgICB9O1xyXG4gICAgICAgIF8uZm9yRWFjaChzZWxmLnJlc3VsdFBhcmFtcy5kYXRhW3RyYWdldF0uUGVyY2VpdmVDb2xsaWRlQWNjZXNzZXMsZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS5XaUZpTG9nKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXMuZGV2aWNlSWRzLnB1c2godmFsdWUuV2lGaUxvZy5NYWNEZXZpY2VJZCk7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXMuaWRzLnB1c2godmFsdWUuV2lGaUxvZy5JRCk7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXMuZGV2aWNlVHlwZSA9IE9iamVjdFR5cGUuV2lmaS52YWx1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZS5FRmVuY2VMb2cpIHtcclxuICAgICAgICAgICAgICAgIHBhcmFtcy5kZXZpY2VJZHMucHVzaCh2YWx1ZS5FRmVuY2VMb2cuTW9iaWxlRGV2aWNlSWQpO1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zLmlkcy5wdXNoKHZhbHVlLkVGZW5jZUxvZy5JRCk7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXMuZGV2aWNlVHlwZSA9IE9iamVjdFR5cGUuRWxlY3Ryb25pY0ZlbmNlLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2VsZi5yZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UuZ2V0RGV2aWNlSW5mb1Byb21pc2UocGFyYW1zKS50aGVuKChyZXM6YW55KT0+e1xyXG4gICAgICAgICAgICBfLmZvckVhY2goc2VsZi5yZXN1bHRQYXJhbXMuZGF0YVt0cmFnZXRdLlBlcmNlaXZlQ29sbGlkZUFjY2Vzc2VzLGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5kZXZpY2VJbmZvID0gcmVzLmRhdGEuZGV2aWNlSW5mb1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNvbGxlY3RTdGF0dXMgPSByZXMuZGF0YS5jb2xsZWN0U3RhdHVzW2luZGV4XTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNlbGYuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5yZW5kZXJBY2NwTWFya2VycygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbmRlckFjY3BNYXJrZXJzKCkge1xyXG4gICAgICAgIGxldCBhY2NwQXJyID0gdGhpcy5yZXN1bHRQYXJhbXMuZGF0YVt0aGlzLnJlc3VsdEluZGV4XS5QZXJjZWl2ZUNvbGxpZGVBY2Nlc3NlcztcclxuICAgICAgICBsZXQgb2JqID0ge30gYXMgeyBba2V5OiBzdHJpbmddOiBDYWNoZVJlc3VsdCB9O1xyXG4gICAgICAgIGFjY3BBcnIuZm9yRWFjaCgoaXRlbTogQ2FjaGVSZXN1bHQsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgbGV0IElEID0gXCJcIjtcclxuICAgICAgICAgICAgaWYgKGl0ZW0uV2lGaUxvZykge1xyXG4gICAgICAgICAgICAgICAgSUQgPSBpdGVtLkFyZWFObyArIGl0ZW0uV2lGaUxvZy5JRDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLkVGZW5jZUxvZykge1xyXG4gICAgICAgICAgICAgICAgSUQgPSBpdGVtLkFyZWFObyArIGl0ZW0uRUZlbmNlTG9nLklEO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9ialtJRF0gPSBpdGVtO1xyXG4gICAgICAgICAgICBvYmpbSURdLnJlc3VsdEluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRGb3JNYXAgPSBvYmo7XHJcbiAgICAgICAgdGhpcy5hbGxSZXN1bHQgPSBhY2NwQXJyO1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLnJlbmRlck1ha2VycyhcclxuICAgICAgICAgICAgT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0TGF5ZXIsXHJcbiAgICAgICAgICAgIE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdEdyb3VwLFxyXG4gICAgICAgICAgICB0cnVlLFxyXG4gICAgICAgICAgICB0aGlzLmdldFN5c3RlbVBvaW50Rm9yUGFyYW1zKHRoaXMuYWxsUmVzdWx0KSxcclxuICAgICAgICAgICAgdGhpcy5yZXN1bHRGb3JNYXAsXHJcbiAgICAgICAgICAgIGZhbHNlLCBudWxsLCBNYXJrZXJzSWNvbi5Ob3JtYWxHcmVlbkljb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyDmoLnmja7ngrnkvY3pm4blkIjojrflj5blr7nlupTnmoTorr7lpIfpm4blkIhcclxuICAgIGdldFN5c3RlbVBvaW50Rm9yUGFyYW1zKHBvaW50czogQXJyYXk8UGVyY2VpdmVDb2xsaWRlQWNjZXNzZXNNb2RlbD4pOiBBcnJheTxTeXN0ZW1Qb2ludD4ge1xyXG4gICAgICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxTeXN0ZW1Qb2ludD47XHJcbiAgICAgICAgcG9pbnRzLmZvckVhY2goKGl0ZW06IFBlcmNlaXZlQ29sbGlkZUFjY2Vzc2VzTW9kZWwpID0+IHtcclxuICAgICAgICAgICAgbGV0IElEID0gXCJcIjtcclxuICAgICAgICAgICAgaWYgKGl0ZW0uV2lGaUxvZykge1xyXG4gICAgICAgICAgICAgICAgSUQgPSBpdGVtLldpRmlMb2cuTWFjRGV2aWNlSWQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5FRmVuY2VMb2cpIHtcclxuICAgICAgICAgICAgICAgIElEID0gaXRlbS5FRmVuY2VMb2cuTW9iaWxlRGV2aWNlSWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHMgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmdldFN5c3RlbVBvaW50KCkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9pbnQgPSB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5nZXRTeXN0ZW1Qb2ludCgpW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGlmIChJRCA9PT0gcG9pbnQuT2JqZWN0SUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYXJySXRlbSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTGF0OiBwb2ludC5MYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvbjogcG9pbnQuTG9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBJRDogcG9pbnQuSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdElEOiBwb2ludC5PYmplY3RJRCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SUQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERlc2NycHRpb246IHBvaW50LkRlc2NycHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExheWVyVHlwZTogcG9pbnQuTGF5ZXJUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3RUeXBlOiBwb2ludC5PYmplY3RUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUYXNrU3RhdHVzOiBwb2ludC5UYXNrU3RhdHVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3RTdGF0ZTogcG9pbnQuT2JqZWN0U3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdE5hbWU6IHBvaW50Lk9iamVjdE5hbWVcclxuICAgICAgICAgICAgICAgICAgICB9IGFzIFN5c3RlbVBvaW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLldpRmlMb2cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJySXRlbS5yZXN1bHRJRCA9IGl0ZW0uQXJlYU5vICsgaXRlbS5XaUZpTG9nLklEO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5FRmVuY2VMb2cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJySXRlbS5yZXN1bHRJRCA9IGl0ZW0uQXJlYU5vICsgaXRlbS5FRmVuY2VMb2cuSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhcnIucHVzaChhcnJJdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXMpIHtcclxuICAgICAgICAgICAgICAgIGFyci5wdXNoKG51bGwpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfVxyXG5cclxuICAgIHNsaWRlUmlnaHRSZXN1bHQoaTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zZXRDaGVja1JpZ2h0UmVzdWx0KHRoaXMucmVzdWx0UGFyYW1zLnBhZ2VTaXplLCBpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDojrflj5bnprvnur/ku7vliqHor6bmg4VcclxuICAgIHNob3dBbmFseXNpc1Jlc3VsdChpdGVtOiBJbnRlbGlnZW50VGFza0luZm8pIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IHtcclxuICAgICAgICAgICAgYW5hbHlzZVRhc2tUeXBlOiBBbmFseXNlVGFza1R5cGUuU2VhcmNoQW5hbHlzZVRhc2tSZXN1bHQsXHJcbiAgICAgICAgICAgIHRhc2tJZDogaXRlbS5UYXNrSWQsXHJcbiAgICAgICAgICAgIFRhc2tUeXBlOiBpdGVtLlRhc2tUeXBlXHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZWxmLmRlc3RvcnlGb3JNYXBNYXJrZXIoKTtcclxuICAgICAgICBzZWxmLmluaXRQYXJhbXMoKTtcclxuICAgICAgICBzZWxmLmluaXRMb2FkaW5nUG9wKCk7XHJcbiAgICAgICAgc2VsZi5hbmFseXNpc1NlcnZpY2UuZ2V0T2ZmTGluZURldGFpbChwYXJhbXMpLnRoZW4oKHJlczogQmFja1Jlc3BvbnNlQm9keTxNYWNDb2xsaXNpb25BbmFseXNpc1Jlc3VsdD4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YSAmJiByZXMuZGF0YS5QZXJjZWl2ZUNvbGxpZGVFbnRpdGllcyAmJiAocmVzLmRhdGEuUGVyY2VpdmVDb2xsaWRlRW50aXRpZXMubGVuZ3RoID4gMCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYub2ZmTGluZVJlc3VsdCA9IHJlcy5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucGFnaW5hdGlvbi5zZXQocmVzLmRhdGEuUGVyY2VpdmVDb2xsaWRlRW50aXRpZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd1Jlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93Rm9ybSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucmVzdWx0UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnJlc3VsdFBhcmFtcy5wYWdlU2l6ZSA9IDY7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYW5hbHlzaXNNbWFwU2VydmVyLnJlbW92ZVN5c3RlbVBvaW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVzdWx0UGFyYW1zID0gc2VsZi5wYWdpbmF0aW9uLmdldEJ5UGFnZShzZWxmLnJlc3VsdFBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWxsUmVzdWx0ID0gc2VsZi5yZXN1bHRQYXJhbXMuYWxsRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRDaGVja1JpZ2h0UmVzdWx0KHNlbGYucmVzdWx0UGFyYW1zLnBhZ2VTaXplLCAwLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXllci5jbG9zZShzZWxmLmN1cnJlbnRMYXllckluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxheWVyLmNsb3NlKHNlbGYuY3VycmVudExheWVySW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubGF5ZXJEZWMuaW5mbygn5rKh5pyJ5p+l6K+i5Yiw57uT5p6cJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubGF5ZXIuY2xvc2Uoc2VsZi5jdXJyZW50TGF5ZXJJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxheWVyRGVjLndhcm5JbmZvKCfmn6Xor6Lnu5PmnpzlpLHotKUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOmAieaLqeWMuuWfn1xyXG4gICAgRHJhd1JlY3QoKSB7XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIuZHJhd1JlY3QoKHBvaW50czogQXJyYXk8U3lzdGVtUG9pbnQ+LCBnZW9tZXRyeTogTlBNYXBMaWIuR2VvbWV0cnkuUG9seWdvbikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuRHJhd0NhbGxCYWNrTWV0aG9kKHBvaW50cywgZ2VvbWV0cnkpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgRHJhd0NpcmNsZSgpIHtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5kcmF3Q2lyY2xlKChwb2ludHM6IEFycmF5PFN5c3RlbVBvaW50PiwgZ2VvbWV0cnk6IE5QTWFwTGliLkdlb21ldHJ5LkNpcmNsZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuRHJhd0NhbGxCYWNrTWV0aG9kKHBvaW50cywgZ2VvbWV0cnkpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgRHJhd1BvbHlnb24oKSB7XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIuZHJhd1BvbHlnb24oKHBvaW50czogQXJyYXk8U3lzdGVtUG9pbnQ+LCBnZW9tZXRyeTogTlBNYXBMaWIuR2VvbWV0cnkuUG9seWdvbikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuRHJhd0NhbGxCYWNrTWV0aG9kKHBvaW50cywgZ2VvbWV0cnkpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBEcmF3Q2FsbEJhY2tNZXRob2QocG9pbnRzOiBBcnJheTxTeXN0ZW1Qb2ludD4sIGdlb21ldHJ5OiBOUE1hcExpYi5HZW9tZXRyeS5Qb2x5Z29uIHwgTlBNYXBMaWIuR2VvbWV0cnkuQ2lyY2xlKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGlmIChzZWxmLnJlcXVzZXRQYXJhbXMubWFjSW1wYWN0TGlzdC5sZW5ndGggPCA1KSB7XHJcbiAgICAgICAgICAgIGxldCBhcnI6IEFycmF5PFN5c3RlbVBvaW50PiA9IFtdO1xyXG4gICAgICAgICAgICBwb2ludHMuZm9yRWFjaCgoaXRlbTogU3lzdGVtUG9pbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLk9iamVjdFR5cGUgPT09IE9iamVjdFR5cGUuV2lmaS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLk9iamVjdFR5cGUgPT09IE9iamVjdFR5cGUuRWxlY3Ryb25pY0ZlbmNlLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5hbmFseXNpc01tYXBTZXJ2ZXIucmVtb3ZlRHJhd1NoYXBlKGdlb21ldHJ5KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmxheWVyRGVjLndhcm5JbmZvKCfmoYbpgInljLrln5/kuI3lrZjlnKjorr7lpIfvvIEnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuY2hlY2tBcmVhKGFyciwgZ2VvbWV0cnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VsZi5hbmFseXNpc01tYXBTZXJ2ZXIucmVtb3ZlRHJhd1NoYXBlKGdlb21ldHJ5KTtcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGYubGF5ZXJEZWMud2FybkluZm8oJ+eisOaSnuWMuuWfn+acgOWkp+WPquiDveaciTXkuKrvvIEnKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrQXJlYShkZXZpY2VMaXN0OiBhbnksIGdlb21ldHJ5OiBOUE1hcExpYi5HZW9tZXRyeS5Qb2x5Z29uIHwgTlBNYXBMaWIuR2VvbWV0cnkuQ2lyY2xlKSB7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IGRldmljZUxpc3Q6IGFueSwgZ2VvbWV0cnk6IE5QTWFwTGliLkdlb21ldHJ5LlBvbHlnb24gfCBOUE1hcExpYi5HZW9tZXRyeS5DaXJjbGUsICRkZXN0cm95OiBGdW5jdGlvbixjYkRhdGFMaXN0OiBBcnJheTxzdHJpbmc+LCBzZWxlY3RDaGVja0FyZWFDYjpzdHJpbmcgfSA9IHRoaXMuJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICBzY29wZS5kZXZpY2VMaXN0ID0gZGV2aWNlTGlzdDtcclxuICAgICAgICBzY29wZS5nZW9tZXRyeSA9IGdlb21ldHJ5O1xyXG4gICAgICAgIHNjb3BlLnNlbGVjdENoZWNrQXJlYUNiID0gdGhpcy5zZWxlY3REZXZpY2VDYjtcclxuICAgICAgICBzY29wZS5jYkRhdGFMaXN0ID0gW09iamVjdFR5cGUuV2lmaS52YWx1ZSxPYmplY3RUeXBlLkVsZWN0cm9uaWNGZW5jZS52YWx1ZV07XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGF5ZXJJbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFBvcHVwSHRtbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICB0aXRsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGNsb3NlQnRuOiAwLFxyXG4gICAgICAgICAgICBza2luOiBcIm5vLXNjcm9sbFwiLFxyXG4gICAgICAgICAgICBhcmVhOiBbXCIzMDBweFwiLCBcIjMwMHB4XCJdLFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOWKoOi9veS4reWKqOeUu1xyXG4gICAgaW5pdExvYWRpbmdQb3AoKSB7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7ICRkZXN0cm95OiBGdW5jdGlvbiB9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudExheWVySW5kZXggPSB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBjb250ZW50OiBsb2FkaW5nQW5hbHlzaXNIdG1sLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIHRpdGxlOiBmYWxzZSxcclxuICAgICAgICAgICAgYXJlYTogWyc1MDBweCcsIFwiMjgwcHhcIl0sXHJcbiAgICAgICAgICAgIGVuZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlUmVzdWx0UGFnZShpOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnJlc3VsdFBhcmFtcy5jdXJyZW50UGFnZSA9IGk7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRQYXJhbXMgPSB0aGlzLnBhZ2luYXRpb24uZ2V0QnlQYWdlKHRoaXMucmVzdWx0UGFyYW1zKTtcclxuICAgICAgICB0aGlzLnNldENoZWNrUmlnaHRSZXN1bHQodGhpcy5yZXN1bHRQYXJhbXMucGFnZVNpemUsIDAsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOaUtuiXj+S4juWPlua2iOaUtuiXj1xyXG4gICAgICogQHBhcmFtIGl0ZW1cclxuICAgICAqL1xyXG4gICAgY2xpY2tDb2xsZWN0KGV2ZW50OiBhbnksIGl0ZW06IGFueSkge1xyXG4gICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBJRDpzdHJpbmcgPVwiXCI7XHJcbiAgICAgICAgbGV0IG9iamVjdFR5cGU6c3RyaW5nID1cIlwiO1xyXG4gICAgICAgIGxldCBuZXdJdGVtOmFueSA9IHt9O1xyXG4gICAgICAgIGlmIChpdGVtLldpRmlMb2cpIHtcclxuICAgICAgICAgICAgSUQgPSBpdGVtLkFyZWFObyArIGl0ZW0uV2lGaUxvZy5JRDtcclxuICAgICAgICAgICAgbmV3SXRlbS53aWZpTG9nID0gaXRlbS5XaUZpTG9nO1xyXG4gICAgICAgICAgICBuZXdJdGVtLmRldmljZUluZm8gPSBpdGVtLmRldmljZUluZm87XHJcbiAgICAgICAgICAgIG9iamVjdFR5cGUgPSBDb2xsZWN0RGF0YVR5cGUuV2lGaS52YWx1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uRUZlbmNlTG9nKSB7XHJcbiAgICAgICAgICAgIElEID0gaXRlbS5BcmVhTm8gKyBpdGVtLkVGZW5jZUxvZy5JRDtcclxuICAgICAgICAgICAgbmV3SXRlbS5lRmVuY2VMb2cgPSBpdGVtLkVGZW5jZUxvZztcclxuICAgICAgICAgICAgbmV3SXRlbS5kZXZpY2VJbmZvID0gaXRlbS5kZXZpY2VJbmZvO1xyXG4gICAgICAgICAgICBvYmplY3RUeXBlID0gQ29sbGVjdERhdGFUeXBlLkVGRU5DRS52YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpdGVtLmNvbGxlY3RTdGF0dXMpIHtcclxuICAgICAgICAgICAgbGV0IHBhcmFtczogYW55ID0ge1xyXG4gICAgICAgICAgICAgICAganNvbjogSlNPTi5zdHJpbmdpZnkobmV3SXRlbSksXHJcbiAgICAgICAgICAgICAgICBvYmplY3RJRDogSUQsXHJcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBvYmplY3RUeXBlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHNlbGYucmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLmNvbGxlY3RBZGRJbmZvKHBhcmFtcylcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcGFyYW1zOiBhbnkgPSB7XHJcbiAgICAgICAgICAgICAgICBpZHM6IElEXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHNlbGYucmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLmNvbGxlY3REZWxldGVJbmZvKHBhcmFtcylcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaXRlbS5jb2xsZWN0U3RhdHVzID0gIWl0ZW0uY29sbGVjdFN0YXR1cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDliIbmnpBcclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIGNsaWNrQW5hbHlzaXMoZXZlbnQ6IGFueSwgaXRlbTogYW55KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5biD5o6n5LiO5Y+W5raI5biD5o6nXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICovXHJcbiAgICBjbGlja1N1cnZlaWxsYW5jZShldmVudDogYW55LCBpdGVtOiBhbnkpIHtcclxuICAgICAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGl0ZW0uc3VydmVpbGxhbmNlU3RhdHVzID0gIWl0ZW0uc3VydmVpbGxhbmNlU3RhdHVzO1xyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcignbWFjQ29sbGlzaW9uQW5hbHlzaXNDb250cm9sbGVyJywgTWFjQ29sbGlzaW9uQW5hbHlzaXNDb250cm9sbGVyKTtcclxuIl19
