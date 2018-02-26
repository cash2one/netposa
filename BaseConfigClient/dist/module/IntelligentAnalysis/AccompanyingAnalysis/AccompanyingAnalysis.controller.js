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
define(["require", "exports", "text!../../selectPopup/treeCamera/Tree.camera.popup.html", "text!../../selectPopup/checkAreaPopup/check.area.popup.html", "text!../../common/faceHandlePopup/selectFace.popup.html", "text!../../common/faceHandlePopup/demarcate.popup.html", "../../common/app/main.app", "../../../core/entity/AccompanyingAnalysisEnum", "../AnalysisEnum", "../../common/Pagination", "../../../core/server/enum/AnalyseTaskOffLine", "../../../core/enum/ObjectType", "../../../core/server/enum/AnalysisDataType", "lodash", "../../common/services/analysis.service", "../../common/factory/layerMsg.factory", "../../selectPopup/treeCamera/Tree.camera.popup", "../../selectPopup/checkAreaPopup/check.area.popup.controller", "../TrackPopup/track.popup.controller", "../TrackPopupDetail/track.popup.detail.controller", "../../common/factory/userinfo.cache.factory", "../../common/services/resourceRetrieval.service", "../main/analysisMmap.server", "../../common/factory/HandleStorage.factory", "../../common/services/uploadImage.service"], function (require, exports, cameraTreePopupHtml, PopupHtml, selectFacePopupHtml, demarcatePopupHtml, main_app_1, AccompanyingAnalysisEnum_1, AnalysisEnum_1, Pagination_1, AnalyseTaskOffLine_1, ObjectType_1, AnalysisDataType_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CacheResult = (function (_super) {
        __extends(CacheResult, _super);
        function CacheResult() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CacheResult;
    }(AccompanyingAnalysisEnum_1.Result));
    var AccompanyingAnalysisController = (function () {
        function AccompanyingAnalysisController($scope, $timeout, analysisService, analysisMmapServer, layerDec, layer, userInfoCacheFactory, resourceRetrievalService, handleStorage, uploadImageService, $interval) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.analysisService = analysisService;
            this.analysisMmapServer = analysisMmapServer;
            this.layerDec = layerDec;
            this.layer = layer;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.resourceRetrievalService = resourceRetrievalService;
            this.handleStorage = handleStorage;
            this.uploadImageService = uploadImageService;
            this.$interval = $interval;
            this.$inject = ['$scope', '$rootScope', '$timeout', 'analysisService', 'analysisMmapServer', 'layerDec', 'layer', 'userInfoCacheFactory', "resourceRetrievalService", 'handleStorage', 'uploadImageService', '$interval'];
            this.FastDateList = AnalysisEnum_1.getdataList();
            this.FastDate = AnalysisEnum_1.dataLists.today;
            this.SexDateList = AnalysisEnum_1.getSexDataList();
            this.GlassDateList = AnalysisEnum_1.getGlassesDataList();
            this.AgeDataList = AnalysisEnum_1.getAgeList();
            this.MaskDateList = AnalysisEnum_1.getMaskDataList();
            this.SexDate = AnalysisEnum_1.SexData.all;
            this.GlassDate = AnalysisEnum_1.GlassesData.all;
            this.MaskDate = AnalysisEnum_1.MaskData.all;
            this.similarityMax = 100;
            this.similarityMin = 80;
            this.windowWidth = AnalysisEnum_1.getWidowSize().width;
            this.sortLetter = ['A', 'B', 'C', 'D', 'E', 'F'];
            this.showResult = false;
            this.showForm = true;
            this.showAllResult = false;
            this.showAnalysisList = false;
            this.showAllAccompanyResult = false;
            this.checkRightResult = [false];
            this.isSortLetter = false;
            this.AccompanyingAnalysisParams = new AccompanyingAnalysisEnum_1.AccompanyingAnalysis();
            this.resultParams = new Pagination_1.PageParamsAndResult();
            this.ResultPagination = new Pagination_1.Pagination();
            this.accpResultParams = new Pagination_1.PageParamsAndResult();
            this.AccpPagination = new Pagination_1.Pagination();
            this.AccompOffLine = [];
            this.arrCameraId = [];
            this.selectDeviceCb = "close.device.popup";
            this.selectFaceCtrl = "get-face-info-quick";
            this.analysisGoTo = AnalysisDataType_1.AnalysisGoToType;
            var self = this;
            self.AccompanyingAnalysisParams = self.initParams();
            self.$timeout(function () {
                self.$scope.$emit('showItemPage', true);
            });
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
            self.$scope.$on(self.selectFaceCtrl, function (event, data) {
                self.$timeout(function () {
                    self.AccompanyingAnalysisParams.imagePath = data.data.imageurl;
                    self.AccompanyingAnalysisParams.taskId = data.data.key;
                });
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
        AccompanyingAnalysisController.prototype.destoryForMapMarker = function () {
            this.analysisMmapServer.clearTraceAnalyze();
            this.analysisMmapServer.clearResultMarkers();
            this.analysisMmapServer.clearAccpMarkers();
            this.analysisMmapServer.clearTrackInfoWindow();
            this.analysisMmapServer.clearAccpTrackInfoWindow();
        };
        AccompanyingAnalysisController.prototype.initParams = function () {
            var self = this;
            self.FastDate = AnalysisEnum_1.dataLists.today;
            self.SexDate = AnalysisEnum_1.SexData.all;
            self.GlassDate = AnalysisEnum_1.GlassesData.all;
            self.MaskDate = AnalysisEnum_1.MaskData.all;
            var params = new AccompanyingAnalysisEnum_1.AccompanyingAnalysis();
            params.arrCameraId = [];
            params.imagePathList = [];
            params.arrEyeGlasses = [];
            params.arrMask = [];
            params.arrGender = [];
            params.startTime = this.FastDate.value.startTime;
            params.endTime = this.FastDate.value.endTime;
            params.taskName = "";
            params.taskId = "";
            params.agofollowTime = 5;
            params.afterfollowTime = 5;
            params.threshold = 90;
            params.followNum = 3;
            var AnalysisData = this.handleStorage.getSessionStorageData(AnalysisDataType_1.AnalysisDataType.Face.key);
            if (AnalysisData) {
                params.imagePath = AnalysisData.data.AccessLog.FacePath;
                params.taskId = AnalysisData.data.AccessLog.ID;
                this.handleStorage.removeSessionStorageData(AnalysisDataType_1.AnalysisDataType.Face.key);
            }
            AnalysisData = this.handleStorage.getSessionStorageData(AnalysisDataType_1.AnalysisDataType.FaceLibrary.key);
            if (AnalysisData) {
                params.imagePath = AnalysisData.data.PersonInfo.FacePicPath;
                params.taskId = AnalysisData.data.PersonInfo.ID;
                this.handleStorage.removeSessionStorageData(AnalysisDataType_1.AnalysisDataType.FaceLibrary.key);
            }
            return params;
        };
        AccompanyingAnalysisController.prototype.deviceIdFilter = function (ids, type) {
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
        };
        AccompanyingAnalysisController.prototype.setFastDate = function (item) {
            this.FastDate = item;
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
            this.AccompanyingAnalysisParams.startTime = time.startTime;
            this.AccompanyingAnalysisParams.endTime = time.endTime;
        };
        AccompanyingAnalysisController.prototype.selectAge = function (age) {
            if (typeof age !== 'string') {
                this.AccompanyingAnalysisParams.maxAge = age.value.maxAge;
                this.AccompanyingAnalysisParams.minAge = age.value.minAge;
            }
            else {
                this.AccompanyingAnalysisParams.maxAge = null;
                this.AccompanyingAnalysisParams.minAge = null;
            }
        };
        AccompanyingAnalysisController.prototype.slideRightResult = function (i) {
            this.setCheckRightResult(this.resultParams.pageSize, i);
        };
        AccompanyingAnalysisController.prototype.submitSearch = function () {
            var self = this;
            if (self.AccompanyingAnalysisParams.taskName === "") {
                return self.layerDec.warnInfo('请输入任务名称');
            }
            if (!self.AccompanyingAnalysisParams.taskId) {
                return self.layerDec.warnInfo('请上传图片');
            }
            if (self.AccompanyingAnalysisParams.endTime < self.AccompanyingAnalysisParams.startTime) {
                this.layerDec.warnInfo('开始时间不能晚于结束时间!');
                return false;
            }
            if (self.arrCameraId.length > 0) {
                self.AccompanyingAnalysisParams.arrCameraId = self.arrCameraId;
            }
            else {
                var systemPointList = self.analysisMmapServer.getSystemPoint();
                var cameraList_1 = [];
                _(systemPointList).forEach(function (value) {
                    if (ObjectType_1.ObjectType.Camera.value === value.ObjectType) {
                        cameraList_1.push(value.ObjectID);
                    }
                });
                self.AccompanyingAnalysisParams.arrCameraId = cameraList_1;
            }
            if (self.SexDate.value) {
                self.AccompanyingAnalysisParams.arrGender.push(self.SexDate.value);
            }
            if (self.GlassDate.value) {
                self.AccompanyingAnalysisParams.arrEyeGlasses.push(self.GlassDate.value);
            }
            if (self.MaskDate.value) {
                self.AccompanyingAnalysisParams.arrMask.push(self.MaskDate.value);
            }
            self.analysisService.searchAccompanying(self.AccompanyingAnalysisParams).then(function (res) {
                if (res.code === 200) {
                    self.showAnalysisList = true;
                    self.getAccompOffLineList();
                    self.AccompanyingAnalysisParams = self.initParams();
                }
                else {
                    self.layerDec.warnInfo('分析任务创建失败');
                }
            });
        };
        AccompanyingAnalysisController.prototype.setCheckRightResult = function (size, traget, isFirst) {
            var self = this;
            var arr = [];
            for (var i = 0; i < size; i++) {
                if (i === traget) {
                    arr.push(!self.checkRightResult[traget]);
                }
                else {
                    arr.push(false);
                }
            }
            self.accpResultIndex = traget;
            if (isFirst) {
                arr[traget] = true;
            }
            self.checkRightResult = arr;
            var params = {
                deviceIds: [],
                deviceType: '',
                ids: [],
                userId: self.userInfoCacheFactory.getCurrentUserId()
            };
            params.deviceType = ObjectType_1.ObjectType.Camera.value;
            _.forEach(self.accpResultParams.data[traget].SearchAccessResults, function (value) {
                params.deviceIds.push(value.AccessLog.CameraID);
                params.ids.push(value.AccessLog.ID);
            });
            self.resourceRetrievalService.getDeviceInfoPromise(params).then(function (res) {
                _.forEach(self.accpResultParams.data[traget].SearchAccessResults, function (item, index) {
                    item.deviceInfo = res.data.deviceInfo[index];
                    item.collectStatus = res.data.collectStatus[index];
                });
                self.$timeout(function () {
                    self.renderAccpMarkers();
                });
            });
        };
        AccompanyingAnalysisController.prototype.DrawRect = function () {
            var _this = this;
            this.analysisMmapServer.drawRect(function (points, geometry) {
                _this.$timeout(function () {
                    _this.DrawCallBackMethod(points, geometry);
                });
            });
        };
        AccompanyingAnalysisController.prototype.DrawCircle = function () {
            var _this = this;
            this.analysisMmapServer.drawCircle(function (points, geometry) {
                _this.$timeout(function () {
                    _this.DrawCallBackMethod(points, geometry);
                });
            });
        };
        AccompanyingAnalysisController.prototype.DrawPolygon = function () {
            var _this = this;
            this.analysisMmapServer.drawPolygon(function (points, geometry) {
                _this.$timeout(function () {
                    _this.DrawCallBackMethod(points, geometry);
                });
            });
        };
        AccompanyingAnalysisController.prototype.ClearDraw = function () {
            this.arrCameraId = [];
            this.AccompanyingAnalysisParams.arrCameraId = [];
            this.analysisMmapServer.clearDraw();
        };
        AccompanyingAnalysisController.prototype.DrawCallBackMethod = function (points, geometry) {
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
        AccompanyingAnalysisController.prototype.checkArea = function (deviceList, geometry) {
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
        AccompanyingAnalysisController.prototype.selectCamera = function () {
            var scope = this.$scope.$new();
            scope.selectCameraList = this.AccompanyingAnalysisParams.arrCameraId;
            scope.selectCtrlCb = this.selectDeviceCb;
            this.currentLayerIndex = this.layer.open({
                type: 1,
                content: cameraTreePopupHtml,
                scope: scope,
                title: "摄像机选择",
                area: ["710px", "620px"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        AccompanyingAnalysisController.prototype.setReultTrack = function () {
            var self = this;
            self.clearResultMarkersInfo();
            self.$timeout(function () {
                self.isSortLetter = false;
                var allResultList = _.sortBy(self.allTrackResult, function (item) {
                    return (Date.parse(item.AccessLog.LogTime));
                });
                self.ResultPagination.set(allResultList);
                self.resultParams.pageSize = 6;
                self.resultParams.currentPage = 1;
                self.resultParams = self.ResultPagination.getByPage(self.resultParams);
                self.allTrackResult = self.resultParams.allData;
                self.setResultForMap(self.allTrackResult);
            }).then(function () {
                var points = self.analysisMmapServer.getSystemPointForParams(self.allTrackResult);
                self.analysisMmapServer.setTrackAnimation(self.allTrackResult, points, self.trackResultForMap);
            });
        };
        AccompanyingAnalysisController.prototype.setAccpTrack = function (i) {
            if (!this.checkRightResult[i]) {
                this.slideRightResult(i);
            }
            var arr = this.analysisMmapServer.getSystemPointForParams(this.allAccpTrackResult);
            this.analysisMmapServer.setAccpTrackAnimation(this.allAccpTrackResult, arr, this.accpTrackResultForMap);
        };
        AccompanyingAnalysisController.prototype.clearResultMarkersInfo = function () {
            this.analysisMmapServer.clearResultMarkers();
            this.analysisMmapServer.clearTraceAnalyze();
            this.analysisMmapServer.clearTrackInfoWindow();
        };
        AccompanyingAnalysisController.prototype.openDetailPopup = function (item, index, groupName) {
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
            };
            scope.surveillanceFunction = function (item) {
                self.clickSurveillance(null, item);
                self.layer.close(scope.index);
            };
            scope.closePopup = function () {
                self.layer.close(scope.index);
            };
            self.analysisMmapServer.openDetailPopup(newItem, index, newList, objectType, scope);
        };
        AccompanyingAnalysisController.prototype.resultToMap = function (item, index, type) {
            this.analysisMmapServer.resultToMap(item, type);
        };
        AccompanyingAnalysisController.prototype.unResultToMap = function (item, index, type) {
            this.analysisMmapServer.unResultToMap(item, type ? this.accpTrackResultForMap : this.trackResultForMap, type);
        };
        AccompanyingAnalysisController.prototype.goBack = function () {
            var _this = this;
            this.$timeout(function () {
                _this.$scope.$emit('showItemPage', false);
            });
        };
        AccompanyingAnalysisController.prototype.goBackForm = function () {
            var _this = this;
            this.$timeout(function () {
                _this.showForm = true;
                _this.showResult = false;
                _this.showAllResult = false;
                _this.showAllAccompanyResult = false;
                _this.destoryForMapMarker();
                _this.analysisMmapServer.renderSystemPoint();
            });
        };
        AccompanyingAnalysisController.prototype.goAllResult = function () {
            this.showResult = false;
            this.showAllResult = true;
            this.resultParams.pageSize = 40;
            this.resultParams.currentPage = 1;
            this.resultParams = this.ResultPagination.getByPage(this.resultParams);
        };
        AccompanyingAnalysisController.prototype.closeAllResult = function () {
            this.showResult = true;
            this.showAllResult = false;
            this.resultParams.currentPage = 1;
            this.resultParams.pageSize = 6;
            this.resultParams = this.ResultPagination.getByPage(this.resultParams);
            this.allTrackResult = this.resultParams.allData;
            var arr = this.analysisMmapServer.getSystemPointForParams(this.resultParams.data);
            this.analysisMmapServer.renderMakers(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForResultGroup, true, arr, this.trackResultForMap, this.isSortLetter, this.sortLetter);
        };
        AccompanyingAnalysisController.prototype.goAccompanyAllResult = function () {
            this.showResult = false;
            this.showAllAccompanyResult = true;
            this.accpResultParams.pageSize = 15;
            this.accpResultParams.currentPage = 1;
            this.accpResultParams = this.AccpPagination.getByPage(this.accpResultParams);
            this.setCheckRightResult(this.accpResultParams.pageSize, 0, true);
        };
        AccompanyingAnalysisController.prototype.closeAllAccompanyResult = function () {
            this.showResult = true;
            this.showAllAccompanyResult = false;
            this.accpResultParams.pageSize = 6;
            this.accpResultParams.currentPage = 1;
            this.accpResultParams = this.AccpPagination.getByPage(this.accpResultParams);
            this.setCheckRightResult(this.accpResultParams.pageSize, 0, true);
        };
        AccompanyingAnalysisController.prototype.changeResultPage = function (i) {
            var _this = this;
            this.resultParams.currentPage = i;
            this.resultParams = this.ResultPagination.getByPage(this.resultParams);
            if (this.isSortLetter) {
                this.$timeout(function () {
                    _this.analysisMmapServer.renderMakers(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForResultGroup, true, _this.analysisMmapServer.getSystemPointForParams(_this.resultParams.data), _this.trackResultForMap, _this.isSortLetter, _this.sortLetter);
                });
            }
        };
        AccompanyingAnalysisController.prototype.changeAccpResultPage = function (i) {
            this.accpResultParams.currentPage = i;
            this.accpResultParams = this.AccpPagination.getByPage(this.accpResultParams);
            this.setCheckRightResult(this.accpResultParams.pageSize, 0, true);
        };
        AccompanyingAnalysisController.prototype.setResultForMap = function (result) {
            var obj = {};
            result.forEach(function (item, i) {
                obj[item.AccessLog.ID] = item;
                obj[item.AccessLog.ID].resultIndex = i;
            });
            this.trackResultForMap = obj;
        };
        AccompanyingAnalysisController.prototype.renderAccpMarkers = function () {
            var self = this;
            var accpArr = self.accpResultParams.data[self.accpResultIndex].SearchAccessResults;
            var obj = {};
            accpArr.forEach(function (item, index) {
                obj[item.AccessLog.ID] = item;
                obj[item.AccessLog.ID].resultIndex = index;
            });
            self.accpTrackResultForMap = obj;
            self.allAccpTrackResult = accpArr;
            var arr = self.analysisMmapServer.getSystemPointForParams(self.allAccpTrackResult);
            self.analysisMmapServer.renderMakers(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForAccpGroup, true, arr, self.accpTrackResultForMap, false, null, AnalysisEnum_1.MarkersIcon.NormalGreenIcon);
        };
        AccompanyingAnalysisController.prototype.showAnalysisListFn = function (flag) {
            this.showAnalysisList = flag;
            if (flag) {
                this.getAccompOffLineList();
            }
        };
        AccompanyingAnalysisController.prototype.showAnalysisResult = function (item) {
            var _this = this;
            var self = this;
            var params = {
                "analyseTaskType": AnalyseTaskOffLine_1.AnalyseTaskType.SearchAnalyseTaskResult,
                "taskId": item.TaskId,
                "TaskType": item.TaskType
            };
            self.analysisService.getOffLineDetail(params).then(function (res) {
                if (res.code === 200 && res.data) {
                    if (res.data && (res.data.SearchAccessResults.length > 0) && (res.data.FaceAccompanyEntities.length > 0)) {
                        self.analysisMmapServer.removeSystemPoint();
                        var params_1 = {
                            deviceIds: [],
                            deviceType: '',
                            ids: [],
                            userId: self.userInfoCacheFactory.getCurrentUserId()
                        };
                        params_1.deviceType = ObjectType_1.ObjectType.Camera.value;
                        var resultList_1 = _.sortBy(res.data.SearchAccessResults, function (item) {
                            return -item.Score;
                        });
                        var trackResultList_1 = _.sortBy(res.data.FaceAccompanyEntities, function (item) {
                            return -item.Num;
                        });
                        _.forEach(resultList_1, function (value) {
                            params_1.deviceIds.push(value.AccessLog.CameraID);
                            params_1.ids.push(value.AccessLog.ID);
                        });
                        self.resourceRetrievalService.getDeviceInfoPromise(params_1).then(function (res) {
                            _.forEach(resultList_1, function (item, index) {
                                item.deviceInfo = res.data.deviceInfo[index];
                                item.collectStatus = res.data.collectStatus[index];
                            });
                            self.$timeout(function () {
                                self.ResultPagination.set(resultList_1);
                                self.AccpPagination.set(trackResultList_1);
                            }).then(function () {
                                self.resultParams.pageSize = 6;
                                self.resultParams.currentPage = 1;
                                self.resultParams = self.ResultPagination.getByPage(self.resultParams);
                                self.allTrackResult = self.ResultPagination.get();
                                self.setResultForMap(self.allTrackResult);
                                self.accpResultParams.pageSize = 6;
                                self.accpResultParams.currentPage = 1;
                                self.accpResultParams = self.AccpPagination.getByPage(self.accpResultParams);
                                self.allAccpTrackResult = self.AccpPagination.get();
                            }).then(function () {
                                self.showForm = false;
                                self.showResult = true;
                                self.isSortLetter = true;
                                var arr = self.analysisMmapServer.getSystemPointForParams(self.resultParams.data);
                                self.analysisMmapServer.renderMakers(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForResultGroup, true, arr, self.trackResultForMap, self.isSortLetter, self.sortLetter);
                                self.setCheckRightResult(_this.accpResultParams.pageSize, 0, true);
                            });
                        });
                    }
                    else {
                        self.layerDec.info('没有查询到伴随结果');
                    }
                }
                else {
                    self.layerDec.warnInfo('查询结果失败');
                }
            });
        };
        AccompanyingAnalysisController.prototype.getAccompOffLineList = function () {
            var self = this;
            var params = {
                "id": self.userInfoCacheFactory.getCurrentUserId(),
                "taskType": AnalyseTaskOffLine_1.OfflineTaskType.SearchFaceAccompany
            };
            self.analysisService.getOffLineList(params).then(function (res) {
                if (res.code === 200 && Array.isArray(res.data)) {
                    var List = [];
                    for (var i = 0; i < res.data.length; i++) {
                        res.data[i].Ext = JSON.parse(res.data[i].Ext);
                        List.push(res.data[i]);
                    }
                    self.AccompOffLine = List;
                }
            });
        };
        AccompanyingAnalysisController.prototype.deleteAccompOffLine = function (item) {
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
        AccompanyingAnalysisController.prototype.deleteImage = function () {
            this.AccompanyingAnalysisParams.imagePath = null;
        };
        AccompanyingAnalysisController.prototype.uploadImage = function (event) {
            var self = this;
            var from = new FormData();
            from.append('image', event.target.files[0]);
            var data = {
                storeType: "LOC",
                imageCategory: "CaptureImage",
                commandType: "SearchFaceAccompany",
                detectType: "Face"
            };
            this.uploadImageService.uploadImageForFace(from, data).then(function (res) {
                if ((res.code === 200) && (res.data && res.data.key)) {
                    self.$timeout(function () {
                        self.AccompanyingAnalysisParams.imagePath = res.data.imageurl;
                        self.AccompanyingAnalysisParams.taskId = res.data.key;
                    });
                }
                else if ((res.code === 200) && (res.data.faceInfo)) {
                    var image_1 = new Image();
                    image_1.src = 'data:image/jpeg;base64,' + res.data.image;
                    image_1.onload = function () {
                        var file = {
                            "_info": {
                                "width": image_1.width,
                                "height": image_1.height
                            }
                        };
                        self.multiUserSelect(res.data, file);
                    };
                }
                else if ((res.code === 200) && (res.data.image)) {
                    var image_2 = new Image();
                    image_2.src = 'data:image/jpeg;base64,' + res.data.image;
                    image_2.onload = function () {
                        var file = {
                            "_info": {
                                "width": image_2.width,
                                "height": image_2.height
                            }
                        };
                        self.faceDemarcate(res.data, file);
                    };
                }
                else {
                    self.layerDec.warnInfo('人脸识别失败');
                }
            });
        };
        AccompanyingAnalysisController.prototype.multiUserSelect = function (faceInfo, file) {
            var self = this;
            var scope = self.$scope.$new();
            scope.index = null;
            scope.data = faceInfo;
            scope.file = file;
            scope.commandType = "SearchAccessLog";
            scope.detectType = "Face";
            scope.fromSelectFaceCtrl = self.selectFaceCtrl;
            scope.layerIndex = self.layer.open({
                type: 1,
                skin: 'no-scroll',
                title: ['人脸选择', 'font-weight: bold;background-color: #F6F8FB;color: #606060;height: 40px;'],
                area: ['400px', '310px'],
                content: selectFacePopupHtml,
                scope: scope,
                end: function () {
                    scope.$destroy();
                }
            });
        };
        AccompanyingAnalysisController.prototype.faceDemarcate = function (faceInfo, file) {
            var self = this;
            var scope = self.$scope.$new();
            scope.index = null;
            scope.data = faceInfo;
            scope.file = file;
            scope.commandType = "SearchAccessLog";
            scope.detectType = "Face";
            scope.fromDemarcateFaceCtrl = self.selectFaceCtrl;
            scope.flag = false;
            scope.layerIndex = self.layer.open({
                type: 1,
                skin: 'no-scroll',
                title: ['人脸标注', 'font-weight: bold;background-color: #F6F8FB;color: #606060;height: 40px;'],
                area: ['650px', '555px'],
                content: demarcatePopupHtml,
                scope: scope,
                end: function () {
                    scope.$destroy();
                }
            });
        };
        AccompanyingAnalysisController.prototype.clickCollect = function (event, item) {
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
        AccompanyingAnalysisController.prototype.clickAnalysis = function (event, item, type) {
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
        AccompanyingAnalysisController.prototype.clickSurveillance = function (event, item) {
            if (event) {
                event.stopPropagation();
            }
            item.surveillanceStatus = !item.surveillanceStatus;
        };
        AccompanyingAnalysisController.prototype.fullScreen = function (event, path) {
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
        return AccompanyingAnalysisController;
    }());
    main_app_1.app.controller('AccompanyingAnalysisController', AccompanyingAnalysisController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9BY2NvbXBhbnlpbmdBbmFseXNpcy9BY2NvbXBhbnlpbmdBbmFseXNpcy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUF3RUE7UUFBMEIsK0JBQU07UUFBaEM7O1FBRUEsQ0FBQztRQUFELGtCQUFDO0lBQUQsQ0FGQSxBQUVDLENBRnlCLGlDQUFNLEdBRS9CO0lBSUQ7UUErQ0ksd0NBQW9CLE1BQVcsRUFDWCxRQUFhLEVBQ2IsZUFBaUMsRUFDakMsa0JBQXVDLEVBQ3ZDLFFBQW1CLEVBQ25CLEtBQVUsRUFDVixvQkFBMkMsRUFDM0Msd0JBQW1ELEVBQ25ELGFBQTZCLEVBQzdCLGtCQUF1QyxFQUN2QyxTQUFhO1lBVmIsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLGFBQVEsR0FBUixRQUFRLENBQUs7WUFDYixvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7WUFDakMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFxQjtZQUN2QyxhQUFRLEdBQVIsUUFBUSxDQUFXO1lBQ25CLFVBQUssR0FBTCxLQUFLLENBQUs7WUFDVix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXVCO1lBQzNDLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMkI7WUFDbkQsa0JBQWEsR0FBYixhQUFhLENBQWdCO1lBQzdCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBcUI7WUFDdkMsY0FBUyxHQUFULFNBQVMsQ0FBSTtZQXhEakMsWUFBTyxHQUFrQixDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLG9CQUFvQixFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsMEJBQTBCLEVBQUUsZUFBZSxFQUFFLG9CQUFvQixFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBRXBPLGlCQUFZLEdBQTRCLDBCQUFXLEVBQUUsQ0FBQztZQUN0RCxhQUFRLEdBQXFCLHdCQUFTLENBQUMs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QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNQLElBQUksT0FBTyxHQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxHQUFHLENBQUM7Z0JBQzNDLElBQUksT0FBTyxHQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUM7Z0JBQzVDLElBQUksV0FBVyxHQUFHLGlCQUFlLElBQUksc0JBQWlCLE9BQU8sa0JBQWEsT0FBTyxVQUFPLENBQUM7Z0JBQ3pGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO29CQUNaLElBQUksRUFBRSxDQUFDO29CQUNQLEtBQUssRUFBRSxLQUFLO29CQUNaLFFBQVEsRUFBRSxDQUFDO29CQUNYLElBQUksRUFBRSw0QkFBNEI7b0JBQ2xDLFVBQVUsRUFBRSxJQUFJO29CQUNoQixLQUFLLEVBQUUsR0FBRztvQkFDVixJQUFJLEVBQUUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxFQUFFLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBQ3RDLE9BQU8sRUFBRSxXQUFXO29CQUNwQixLQUFLLEVBQUUsS0FBSztvQkFDWixHQUFHLEVBQUU7d0JBQ0QsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUNyQixDQUFDO2lCQUNKLENBQUMsQ0FBQztZQUNQLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUM3QixDQUFDO1FBQ0wsQ0FBQztRQUNMLHFDQUFDO0lBQUQsQ0FoNEJBLEFBZzRCQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyxnQ0FBZ0MsRUFBRSw4QkFBOEIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL0FjY29tcGFueWluZ0FuYWx5c2lzL0FjY29tcGFueWluZ0FuYWx5c2lzLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uLy4uL3NlbGVjdFBvcHVwL3RyZWVDYW1lcmEvVHJlZS5jYW1lcmEucG9wdXAuaHRtbFwiIG5hbWU9XCJjYW1lcmFUcmVlUG9wdXBIdG1sXCIgLz5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi8uLi9zZWxlY3RQb3B1cC9jaGVja0FyZWFQb3B1cC9jaGVjay5hcmVhLnBvcHVwLmh0bWxcIiBuYW1lPVwiUG9wdXBIdG1sXCIgLz5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi8uLi9jb21tb24vZmFjZUhhbmRsZVBvcHVwL3NlbGVjdEZhY2UucG9wdXAuaHRtbFwiIG5hbWU9XCJzZWxlY3RGYWNlUG9wdXBIdG1sXCIgLz5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi8uLi9jb21tb24vZmFjZUhhbmRsZVBvcHVwL2RlbWFyY2F0ZS5wb3B1cC5odG1sXCIgbmFtZT1cImRlbWFyY2F0ZVBvcHVwSHRtbFwiIC8+XHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG4vLyBpbXBvcnQgJ2NzcyEuLi9zdHlsZS9BY2NvbXBhbnlpbmdBbmFseXNpcy5jc3MnO1xyXG5cclxuaW1wb3J0IHtTeXN0ZW1Qb2ludH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L1N5c3RlbVBvaW50XCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hbmFseXNpcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SUFuYWx5c2lzU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hbmFseXNpcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SUxheWVyRGVjfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZhY3RvcnkvbGF5ZXJNc2cuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vZmFjdG9yeS9sYXllck1zZy5mYWN0b3J5XCI7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgQWNjb21wYW55aW5nQW5hbHlzaXMsXHJcbiAgICBBY2NvbXBhbnlpbmdBbmFseXNpc1Jlc3VsdCxcclxuICAgIFJlc3VsdFxyXG59IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L0FjY29tcGFueWluZ0FuYWx5c2lzRW51bSdcclxuaW1wb3J0IHtSZXNwb25zZVJlc3VsdH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdFwiO1xyXG5pbXBvcnQge1xyXG4gICAgTWFya2Vyc0ljb24sXHJcbiAgICBPdmVybGF5TmFtZSxcclxuICAgIEZhc3REYXRhLFxyXG4gICAgZ2V0RmFzdERhdGFMaXN0LFxyXG4gICAgQWdlLFxyXG4gICAgRW51bSxcclxuICAgIFRpbWVMZW5ndGgsXHJcbiAgICBnZXRHbGFzc2VzRGF0YUxpc3QsXHJcbiAgICBnZXRNYXNrRGF0YUxpc3QsXHJcbiAgICBHbGFzc2VzRGF0YSxcclxuICAgIGdldEFnZUxpc3QsXHJcbiAgICBNYXNrRGF0YSxcclxuICAgIGdldFNleERhdGFMaXN0LFxyXG4gICAgZ2V0V2lkb3dTaXplLFxyXG4gICAgU2V4RGF0YSxcclxuICAgIEFycmF5VW5pcXVlLFxyXG4gICAgZGF0YSxcclxuICAgIHRpbWVMZW5ndGgsXHJcbiAgICBnZXRkYXRhTGlzdCxcclxuICAgIGdldEhvdXJzLFxyXG4gICAgZGF0YUxpc3RzXHJcbn0gZnJvbSAnLi4vQW5hbHlzaXNFbnVtJztcclxuXHJcbi8vIOW8ueahhlxyXG5pbXBvcnQgJy4uLy4uL3NlbGVjdFBvcHVwL3RyZWVDYW1lcmEvVHJlZS5jYW1lcmEucG9wdXAnXHJcbmltcG9ydCAnLi4vLi4vc2VsZWN0UG9wdXAvY2hlY2tBcmVhUG9wdXAvY2hlY2suYXJlYS5wb3B1cC5jb250cm9sbGVyJztcclxuaW1wb3J0IFwiLi4vVHJhY2tQb3B1cC90cmFjay5wb3B1cC5jb250cm9sbGVyXCJcclxuaW1wb3J0IFwiLi4vVHJhY2tQb3B1cERldGFpbC90cmFjay5wb3B1cC5kZXRhaWwuY29udHJvbGxlclwiXHJcblxyXG4vLyAg5pyN5YqhXHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9mYWN0b3J5L3VzZXJpbmZvLmNhY2hlLmZhY3RvcnlcIjtcclxuaW1wb3J0IHtJVXNlckluZm9DYWNoZUZhY3Rvcnl9IGZyb20gXCIuLi8uLi9jb21tb24vZmFjdG9yeS91c2VyaW5mby5jYWNoZS5mYWN0b3J5XCI7XHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL3Jlc291cmNlUmV0cmlldmFsLnNlcnZpY2UnO1xyXG5pbXBvcnQge0lSZXNvdXJjZVJldHJpZXZhbFNlcnZpY2V9IGZyb20gJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9yZXNvdXJjZVJldHJpZXZhbC5zZXJ2aWNlJztcclxuaW1wb3J0IFwiLi4vbWFpbi9hbmFseXNpc01tYXAuc2VydmVyXCI7XHJcbmltcG9ydCB7SUFuYWx5c2lzTW1hcFNlcnZlcn0gZnJvbSBcIi4uL21haW4vYW5hbHlzaXNNbWFwLnNlcnZlclwiO1xyXG5pbXBvcnQgJy4uLy4uL2NvbW1vbi9mYWN0b3J5L0hhbmRsZVN0b3JhZ2UuZmFjdG9yeSc7XHJcbmltcG9ydCB7SUhhbmRsZVN0b3JhZ2V9IGZyb20gJy4uLy4uL2NvbW1vbi9mYWN0b3J5L0hhbmRsZVN0b3JhZ2UuZmFjdG9yeSc7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy91cGxvYWRJbWFnZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SVVwbG9hZEltYWdlU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy91cGxvYWRJbWFnZS5zZXJ2aWNlXCI7XHJcblxyXG4vLyDliIbpobXmlrnms5VcclxuaW1wb3J0IHtQYWdlUGFyYW1zQW5kUmVzdWx0LCBQYWdpbmF0aW9uLCBJUGFnaW5hdGlvbn0gZnJvbSAnLi4vLi4vY29tbW9uL1BhZ2luYXRpb24nXHJcbmltcG9ydCB7SW50ZWxpZ2VudFRhc2tJbmZvfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9JbnRlbGlnZW50VGFza0luZm8nO1xyXG5cclxuLy8g5Y+C5pWwXHJcbmltcG9ydCB7QW5hbHlzZVRhc2tUeXBlLCBPZmZsaW5lVGFza1R5cGV9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL0FuYWx5c2VUYXNrT2ZmTGluZVwiO1xyXG5pbXBvcnQge09iamVjdFR5cGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW51bS9PYmplY3RUeXBlJztcclxuaW1wb3J0IHtDb2xsZWN0RGF0YVR5cGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vQ29sbGVjdERhdGFUeXBlJztcclxuaW1wb3J0IHtBbmFseXNpc0RhdGFUeXBlLCBBbmFseXNpc1N0b3JhZ2VQYXJhbXMsIEFuYWx5c2lzR29Ub1R5cGV9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL0FuYWx5c2lzRGF0YVR5cGVcIjtcclxuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XHJcblxyXG5jbGFzcyBDYWNoZVJlc3VsdCBleHRlbmRzIFJlc3VsdCB7XHJcbiAgICByZXN1bHRJbmRleDogbnVtYmVyO1xyXG59XHJcblxyXG5kZWNsYXJlIGxldCBjYW1lcmFUcmVlUG9wdXBIdG1sOiBhbnksIGFuZ3VsYXI6IGFueSwgJDogYW55LCBsb2FkaW5nQW5hbHlzaXNIdG1sOiBhbnksIHNlbGVjdEZhY2VQb3B1cEh0bWw6IGFueSwgZGVtYXJjYXRlUG9wdXBIdG1sOiBhbnksIFBvcHVwSHRtbDogYW55O1xyXG5cclxuY2xhc3MgQWNjb21wYW55aW5nQW5hbHlzaXNDb250cm9sbGVyIHtcclxuICAgICRpbmplY3Q6IEFycmF5PHN0cmluZz4gPSBbJyRzY29wZScsICckcm9vdFNjb3BlJywgJyR0aW1lb3V0JywgJ2FuYWx5c2lzU2VydmljZScsICdhbmFseXNpc01tYXBTZXJ2ZXInLCAnbGF5ZXJEZWMnLCAnbGF5ZXInLCAndXNlckluZm9DYWNoZUZhY3RvcnknLCBcInJlc291cmNlUmV0cmlldmFsU2VydmljZVwiLCAnaGFuZGxlU3RvcmFnZScsICd1cGxvYWRJbWFnZVNlcnZpY2UnLCAnJGludGVydmFsJ107XHJcblxyXG4gICAgRmFzdERhdGVMaXN0OiBBcnJheTxkYXRhPHRpbWVMZW5ndGg+PiA9IGdldGRhdGFMaXN0KCk7XHJcbiAgICBGYXN0RGF0ZTogZGF0YTx0aW1lTGVuZ3RoPiA9IGRhdGFMaXN0cy50b2RheTtcclxuICAgIFNleERhdGVMaXN0OiBBcnJheTxFbnVtPG51bWJlcj4+ID0gZ2V0U2V4RGF0YUxpc3QoKTtcclxuICAgIEdsYXNzRGF0ZUxpc3Q6IEFycmF5PEVudW08bnVtYmVyPj4gPSBnZXRHbGFzc2VzRGF0YUxpc3QoKTtcclxuICAgIEFnZURhdGFMaXN0OiBBcnJheTxFbnVtPEFnZT4+ID0gZ2V0QWdlTGlzdCgpO1xyXG4gICAgTWFza0RhdGVMaXN0OiBBcnJheTxFbnVtPG51bWJlcj4+ID0gZ2V0TWFza0RhdGFMaXN0KCk7XHJcbiAgICBTZXhEYXRlOiBFbnVtPG51bWJlcj4gPSBTZXhEYXRhLmFsbDtcclxuICAgIEdsYXNzRGF0ZTogRW51bTxudW1iZXI+ID0gR2xhc3Nlc0RhdGEuYWxsO1xyXG4gICAgTWFza0RhdGU6IEVudW08bnVtYmVyPiA9IE1hc2tEYXRhLmFsbDtcclxuICAgIHNpbWlsYXJpdHlNYXg6IG51bWJlciA9IDEwMDtcclxuICAgIHNpbWlsYXJpdHlNaW46IG51bWJlciA9IDgwO1xyXG4gICAgd2luZG93V2lkdGg6IG51bWJlciA9IGdldFdpZG93U2l6ZSgpLndpZHRoO1xyXG5cclxuICAgIHNvcnRMZXR0ZXI6IEFycmF5PHN0cmluZz4gPSBbJ0EnLCAnQicsICdDJywgJ0QnLCAnRScsICdGJ107XHJcbiAgICBzaG93UmVzdWx0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBzaG93Rm9ybTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBzaG93QWxsUmVzdWx0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBzaG93QW5hbHlzaXNMaXN0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBzaG93QWxsQWNjb21wYW55UmVzdWx0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBjaGVja1JpZ2h0UmVzdWx0OiBBcnJheTxib29sZWFuPiA9IFtmYWxzZV07XHJcbiAgICBpc1NvcnRMZXR0ZXI6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBBY2NvbXBhbnlpbmdBbmFseXNpc1BhcmFtczogQWNjb21wYW55aW5nQW5hbHlzaXMgPSBuZXcgQWNjb21wYW55aW5nQW5hbHlzaXMoKTtcclxuXHJcbiAgICByZXN1bHRQYXJhbXM6IFBhZ2VQYXJhbXNBbmRSZXN1bHQgPSBuZXcgUGFnZVBhcmFtc0FuZFJlc3VsdCgpO1xyXG4gICAgUmVzdWx0UGFnaW5hdGlvbjogSVBhZ2luYXRpb24gPSBuZXcgUGFnaW5hdGlvbigpO1xyXG4gICAgYWxsVHJhY2tSZXN1bHQ6IEFycmF5PFJlc3VsdD47XHJcbiAgICB0cmFja1Jlc3VsdEZvck1hcDogeyBba2V5OiBzdHJpbmddOiBSZXN1bHQgfCBDYWNoZVJlc3VsdCB9O1xyXG5cclxuICAgIGFjY3BSZXN1bHRQYXJhbXM6IFBhZ2VQYXJhbXNBbmRSZXN1bHQgPSBuZXcgUGFnZVBhcmFtc0FuZFJlc3VsdCgpO1xyXG4gICAgQWNjcFBhZ2luYXRpb246IElQYWdpbmF0aW9uID0gbmV3IFBhZ2luYXRpb24oKTtcclxuICAgIGFsbEFjY3BUcmFja1Jlc3VsdDogQXJyYXk8UmVzdWx0PjtcclxuICAgIGFjY3BUcmFja1Jlc3VsdEZvck1hcDogeyBba2V5OiBzdHJpbmddOiBSZXN1bHQgfCBDYWNoZVJlc3VsdCB9O1xyXG5cclxuICAgIEFjY29tcE9mZkxpbmU6IEFycmF5PEludGVsaWdlbnRUYXNrSW5mbz4gPSBbXTtcclxuICAgIGN1cnJlbnRMYXllckluZGV4OiBudW1iZXI7XHJcbiAgICBhY2NwUmVzdWx0SW5kZXg6IG51bWJlcjtcclxuXHJcbiAgICBhcnJDYW1lcmFJZDogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgc2VsZWN0RGV2aWNlQ2I6IHN0cmluZyA9IFwiY2xvc2UuZGV2aWNlLnBvcHVwXCI7XHJcbiAgICBzZWxlY3RGYWNlQ3RybDogc3RyaW5nID0gXCJnZXQtZmFjZS1pbmZvLXF1aWNrXCI7XHJcbiAgICBzZXRJbnRlcnZhbDphbnk7XHJcbiAgICBhbmFseXNpc0dvVG8gPSBBbmFseXNpc0dvVG9UeXBlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGFuYWx5c2lzU2VydmljZTogSUFuYWx5c2lzU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgYW5hbHlzaXNNbWFwU2VydmVyOiBJQW5hbHlzaXNNbWFwU2VydmVyLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBsYXllckRlYzogSUxheWVyRGVjLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBsYXllcjogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB1c2VySW5mb0NhY2hlRmFjdG9yeTogSVVzZXJJbmZvQ2FjaGVGYWN0b3J5LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZXNvdXJjZVJldHJpZXZhbFNlcnZpY2U6IElSZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGhhbmRsZVN0b3JhZ2U6IElIYW5kbGVTdG9yYWdlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB1cGxvYWRJbWFnZVNlcnZpY2U6IElVcGxvYWRJbWFnZVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICRpbnRlcnZhbDphbnkpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHNlbGYuQWNjb21wYW55aW5nQW5hbHlzaXNQYXJhbXMgPSBzZWxmLmluaXRQYXJhbXMoKTtcclxuICAgICAgICBzZWxmLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGVtaXQoJ3Nob3dJdGVtUGFnZScsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNlbGYuJHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmFuYWx5c2lzTW1hcFNlcnZlci5jbGVhckRyYXcoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuZGVzdG9yeUZvck1hcE1hcmtlcigpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCfop6blj5Hnm7TmjqXplIDmr4FNYXDkuovku7bvvIzlr7zoh7RtYXDlr7nosaHooqvplIDmr4HvvIzovajov7nop6blj5Hoh6rouqvnmoTplIDmr4Hkuovku7bkuK3ml6Dms5Xojrflj5ZtYXDlr7nosaHlr7zoh7TnmoTmiqXplJnvvIzlj6/ku6Xlv73nlaXvvIEnLCBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkaW50ZXJ2YWwuY2FuY2VsKHNlbGYuc2V0SW50ZXJ2YWwpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDnm5HlkKzkurrohLjpgInmi6nkuovku7ZcclxuICAgICAgICBzZWxmLiRzY29wZS4kb24oc2VsZi5zZWxlY3RGYWNlQ3RybCwgZnVuY3Rpb24gKGV2ZW50OiBhbnksIGRhdGE6IGFueSkge1xyXG4gICAgICAgICAgICBzZWxmLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNlbGYuQWNjb21wYW55aW5nQW5hbHlzaXNQYXJhbXMuaW1hZ2VQYXRoID0gZGF0YS5kYXRhLmltYWdldXJsO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5BY2NvbXBhbnlpbmdBbmFseXNpc1BhcmFtcy50YXNrSWQgPSBkYXRhLmRhdGEua2V5O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDnm5HlkKzorr7lpIfov5Tlm57kuovku7ZcclxuICAgICAgICBzZWxmLiRzY29wZS4kb24oc2VsZi5zZWxlY3REZXZpY2VDYiwgKGV2ZW50OiBhbnksIGRldmljZUlkczogQXJyYXk8c3RyaW5nPiwgc3RhdHVzOmJvb2xlYW4sIGdlb21ldHJ5PzogTlBNYXBMaWIuR2VvbWV0cnkuUG9seWdvbiwgdHlwZT86IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBpZihzdGF0dXMgJiYgQXJyYXkuaXNBcnJheShkZXZpY2VJZHMpKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRldmljZUlkRmlsdGVyKGRldmljZUlkcywgdHlwZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZ2VvbWV0cnkpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuYW5hbHlzaXNNbWFwU2VydmVyLnJlbW92ZURyYXdTaGFwZShnZW9tZXRyeSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5sYXllci5jbG9zZShzZWxmLmN1cnJlbnRMYXllckluZGV4KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g5a6a5pe26K+35rGC56a757q/5Lu75YqhXHJcbiAgICAgICAgc2VsZi5zZXRJbnRlcnZhbCAgPSAkaW50ZXJ2YWwoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2VsZi5nZXRBY2NvbXBPZmZMaW5lTGlzdCgpO1xyXG4gICAgICAgIH0sIDEwMDAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRlc3RvcnlGb3JNYXBNYXJrZXIoKSB7XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIuY2xlYXJUcmFjZUFuYWx5emUoKTtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5jbGVhclJlc3VsdE1hcmtlcnMoKTtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5jbGVhckFjY3BNYXJrZXJzKCk7XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIuY2xlYXJUcmFja0luZm9XaW5kb3coKTtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5jbGVhckFjY3BUcmFja0luZm9XaW5kb3coKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRQYXJhbXMoKTogQWNjb21wYW55aW5nQW5hbHlzaXMge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgc2VsZi5GYXN0RGF0ZSA9IGRhdGFMaXN0cy50b2RheTtcclxuICAgICAgICBzZWxmLlNleERhdGUgPSBTZXhEYXRhLmFsbDtcclxuICAgICAgICBzZWxmLkdsYXNzRGF0ZSA9IEdsYXNzZXNEYXRhLmFsbDtcclxuICAgICAgICBzZWxmLk1hc2tEYXRlID0gTWFza0RhdGEuYWxsO1xyXG5cclxuICAgICAgICBsZXQgcGFyYW1zID0gbmV3IEFjY29tcGFueWluZ0FuYWx5c2lzKCk7XHJcblxyXG4gICAgICAgIHBhcmFtcy5hcnJDYW1lcmFJZCA9IFtdO1xyXG4gICAgICAgIHBhcmFtcy5pbWFnZVBhdGhMaXN0ID0gW107XHJcbiAgICAgICAgcGFyYW1zLmFyckV5ZUdsYXNzZXMgPSBbXTtcclxuICAgICAgICBwYXJhbXMuYXJyTWFzayA9IFtdO1xyXG4gICAgICAgIHBhcmFtcy5hcnJHZW5kZXIgPSBbXTtcclxuICAgICAgICBwYXJhbXMuc3RhcnRUaW1lID0gdGhpcy5GYXN0RGF0ZS52YWx1ZS5zdGFydFRpbWU7XHJcbiAgICAgICAgcGFyYW1zLmVuZFRpbWUgPSB0aGlzLkZhc3REYXRlLnZhbHVlLmVuZFRpbWU7XHJcbiAgICAgICAgcGFyYW1zLnRhc2tOYW1lID0gXCJcIjtcclxuICAgICAgICBwYXJhbXMudGFza0lkID0gXCJcIjtcclxuICAgICAgICBwYXJhbXMuYWdvZm9sbG93VGltZSA9IDU7XHJcbiAgICAgICAgcGFyYW1zLmFmdGVyZm9sbG93VGltZSA9IDU7XHJcbiAgICAgICAgcGFyYW1zLnRocmVzaG9sZCA9IDkwO1xyXG4gICAgICAgIHBhcmFtcy5mb2xsb3dOdW0gPSAzO1xyXG5cclxuICAgICAgICAvLyDliKTmlq3mmK/lkKbmnInpgJrooYzorrDlvZXlv6vpgJ/mo4DntKJcclxuICAgICAgICBsZXQgQW5hbHlzaXNEYXRhOkFuYWx5c2lzU3RvcmFnZVBhcmFtcyA9IHRoaXMuaGFuZGxlU3RvcmFnZS5nZXRTZXNzaW9uU3RvcmFnZURhdGEoQW5hbHlzaXNEYXRhVHlwZS5GYWNlLmtleSk7XHJcbiAgICAgICAgaWYgKEFuYWx5c2lzRGF0YSkge1xyXG4gICAgICAgICAgICBwYXJhbXMuaW1hZ2VQYXRoID0gQW5hbHlzaXNEYXRhLmRhdGEuQWNjZXNzTG9nLkZhY2VQYXRoO1xyXG4gICAgICAgICAgICBwYXJhbXMudGFza0lkID0gQW5hbHlzaXNEYXRhLmRhdGEuQWNjZXNzTG9nLklEO1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZVN0b3JhZ2UucmVtb3ZlU2Vzc2lvblN0b3JhZ2VEYXRhKEFuYWx5c2lzRGF0YVR5cGUuRmFjZS5rZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDliKTmlq3mmK/lkKbmnInkurrohLjliIbmnpDlv6vpgJ/mo4DntKJcclxuICAgICAgICBBbmFseXNpc0RhdGEgPSB0aGlzLmhhbmRsZVN0b3JhZ2UuZ2V0U2Vzc2lvblN0b3JhZ2VEYXRhKEFuYWx5c2lzRGF0YVR5cGUuRmFjZUxpYnJhcnkua2V5KTtcclxuICAgICAgICBpZiAoQW5hbHlzaXNEYXRhKSB7XHJcbiAgICAgICAgICAgIHBhcmFtcy5pbWFnZVBhdGggPSBBbmFseXNpc0RhdGEuZGF0YS5QZXJzb25JbmZvLkZhY2VQaWNQYXRoO1xyXG4gICAgICAgICAgICBwYXJhbXMudGFza0lkID0gQW5hbHlzaXNEYXRhLmRhdGEuUGVyc29uSW5mby5JRDtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVTdG9yYWdlLnJlbW92ZVNlc3Npb25TdG9yYWdlRGF0YShBbmFseXNpc0RhdGFUeXBlLkZhY2VMaWJyYXJ5LmtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwYXJhbXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6K6+5aSHaWTljrvph41cclxuICAgIHByaXZhdGUgZGV2aWNlSWRGaWx0ZXIoaWRzOiBBcnJheTxzdHJpbmc+LCB0eXBlPzogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBhcnJDYW1lcmFJZDogQXJyYXk8c3RyaW5nPiA9ICBbXTtcclxuICAgICAgICBpZiAodHlwZSA9PT0gXCJ0cmVlXCIpIHtcclxuICAgICAgICAgICAgYXJyQ2FtZXJhSWQgPSBpZHM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYXJyQ2FtZXJhSWQgPSAgXy5jb25jYXQoaWRzLCBzZWxmLmFyckNhbWVyYUlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXJyQ2FtZXJhSWQgPSBfLnNvcnRlZFVuaXEoYXJyQ2FtZXJhSWQpO1xyXG4gICAgICAgIHNlbGYuYXJyQ2FtZXJhSWQgPSBhcnJDYW1lcmFJZDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRGYXN0RGF0ZShpdGVtOiBFbnVtPFRpbWVMZW5ndGg+KSB7XHJcbiAgICAgICAgdGhpcy5GYXN0RGF0ZSA9IGl0ZW07XHJcbiAgICAgICAgbGV0IHRpbWU6IHRpbWVMZW5ndGg7XHJcbiAgICAgICAgc3dpdGNoIChpdGVtLmtleSkge1xyXG4gICAgICAgICAgICBjYXNlIFwidG9kYXlcIjpcclxuICAgICAgICAgICAgICAgIHRpbWUgPSBnZXRIb3VycygwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwibGFzdGhvdXJcIjpcclxuICAgICAgICAgICAgICAgIHRpbWUgPSBnZXRIb3VycygxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwibGFzdEZvdXJIb3VyXCI6XHJcbiAgICAgICAgICAgICAgICB0aW1lID0gZ2V0SG91cnMoNik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImxhc3RUaHJlZURheVwiOlxyXG4gICAgICAgICAgICAgICAgdGltZSA9IGdldEhvdXJzKDEyKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkFjY29tcGFueWluZ0FuYWx5c2lzUGFyYW1zLnN0YXJ0VGltZSA9IHRpbWUuc3RhcnRUaW1lO1xyXG4gICAgICAgIHRoaXMuQWNjb21wYW55aW5nQW5hbHlzaXNQYXJhbXMuZW5kVGltZSA9IHRpbWUuZW5kVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RBZ2UoYWdlOiBFbnVtPEFnZT4pIHtcclxuICAgICAgICBpZiAodHlwZW9mIGFnZSAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdGhpcy5BY2NvbXBhbnlpbmdBbmFseXNpc1BhcmFtcy5tYXhBZ2UgPSBhZ2UudmFsdWUubWF4QWdlO1xyXG4gICAgICAgICAgICB0aGlzLkFjY29tcGFueWluZ0FuYWx5c2lzUGFyYW1zLm1pbkFnZSA9IGFnZS52YWx1ZS5taW5BZ2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5BY2NvbXBhbnlpbmdBbmFseXNpc1BhcmFtcy5tYXhBZ2UgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLkFjY29tcGFueWluZ0FuYWx5c2lzUGFyYW1zLm1pbkFnZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNsaWRlUmlnaHRSZXN1bHQoaTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zZXRDaGVja1JpZ2h0UmVzdWx0KHRoaXMucmVzdWx0UGFyYW1zLnBhZ2VTaXplLCBpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDliJvlu7rnprvnur/ku7vliqFcclxuICAgIHN1Ym1pdFNlYXJjaCgpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgaWYgKHNlbGYuQWNjb21wYW55aW5nQW5hbHlzaXNQYXJhbXMudGFza05hbWUgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGYubGF5ZXJEZWMud2FybkluZm8oJ+ivt+i+k+WFpeS7u+WKoeWQjeensCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXNlbGYuQWNjb21wYW55aW5nQW5hbHlzaXNQYXJhbXMudGFza0lkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmxheWVyRGVjLndhcm5JbmZvKCfor7fkuIrkvKDlm77niYcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5Yik5pat5pe26Ze0XHJcbiAgICAgICAgaWYgKHNlbGYuQWNjb21wYW55aW5nQW5hbHlzaXNQYXJhbXMuZW5kVGltZSA8IHNlbGYuQWNjb21wYW55aW5nQW5hbHlzaXNQYXJhbXMuc3RhcnRUaW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXJEZWMud2FybkluZm8oJ+W8gOWni+aXtumXtOS4jeiDveaZmuS6jue7k+adn+aXtumXtCEnKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDorr7nva7mn6Xor6Lorr7lpIdpZFxyXG4gICAgICAgIGlmKHNlbGYuYXJyQ2FtZXJhSWQubGVuZ3RoPjApIHtcclxuICAgICAgICAgICAgc2VsZi5BY2NvbXBhbnlpbmdBbmFseXNpc1BhcmFtcy5hcnJDYW1lcmFJZCA9IHNlbGYuYXJyQ2FtZXJhSWQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHN5c3RlbVBvaW50TGlzdDpBcnJheTxhbnk+ID0gc2VsZi5hbmFseXNpc01tYXBTZXJ2ZXIuZ2V0U3lzdGVtUG9pbnQoKTtcclxuICAgICAgICAgICAgbGV0IGNhbWVyYUxpc3Q6QXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgICAgICAgICBfKHN5c3RlbVBvaW50TGlzdCkuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdFR5cGUuQ2FtZXJhLnZhbHVlID09PSB2YWx1ZS5PYmplY3RUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FtZXJhTGlzdC5wdXNoKHZhbHVlLk9iamVjdElEKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNlbGYuQWNjb21wYW55aW5nQW5hbHlzaXNQYXJhbXMuYXJyQ2FtZXJhSWQgPSBjYW1lcmFMaXN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2VsZi5TZXhEYXRlLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHNlbGYuQWNjb21wYW55aW5nQW5hbHlzaXNQYXJhbXMuYXJyR2VuZGVyLnB1c2goc2VsZi5TZXhEYXRlLnZhbHVlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2VsZi5HbGFzc0RhdGUudmFsdWUpIHtcclxuICAgICAgICAgICAgc2VsZi5BY2NvbXBhbnlpbmdBbmFseXNpc1BhcmFtcy5hcnJFeWVHbGFzc2VzLnB1c2goc2VsZi5HbGFzc0RhdGUudmFsdWUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzZWxmLk1hc2tEYXRlLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHNlbGYuQWNjb21wYW55aW5nQW5hbHlzaXNQYXJhbXMuYXJyTWFzay5wdXNoKHNlbGYuTWFza0RhdGUudmFsdWUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxmLmFuYWx5c2lzU2VydmljZS5zZWFyY2hBY2NvbXBhbnlpbmcoIHNlbGYuQWNjb21wYW55aW5nQW5hbHlzaXNQYXJhbXMpLnRoZW4oKHJlczogUmVzcG9uc2VSZXN1bHQ8QWNjb21wYW55aW5nQW5hbHlzaXNSZXN1bHQ+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNob3dBbmFseXNpc0xpc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5nZXRBY2NvbXBPZmZMaW5lTGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5BY2NvbXBhbnlpbmdBbmFseXNpc1BhcmFtcyA9IHNlbGYuaW5pdFBhcmFtcygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sYXllckRlYy53YXJuSW5mbygn5YiG5p6Q5Lu75Yqh5Yib5bu65aSx6LSlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHNldENoZWNrUmlnaHRSZXN1bHQoc2l6ZTogbnVtYmVyLCB0cmFnZXQ6IG51bWJlciwgaXNGaXJzdD86IGJvb2xlYW4pIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PGJvb2xlYW4+O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpID09PSB0cmFnZXQpIHtcclxuICAgICAgICAgICAgICAgIGFyci5wdXNoKCFzZWxmLmNoZWNrUmlnaHRSZXN1bHRbdHJhZ2V0XSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFyci5wdXNoKGZhbHNlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYuYWNjcFJlc3VsdEluZGV4ID0gdHJhZ2V0O1xyXG4gICAgICAgIGlmIChpc0ZpcnN0KSB7XHJcbiAgICAgICAgICAgIGFyclt0cmFnZXRdID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLmNoZWNrUmlnaHRSZXN1bHQgPSBhcnI7XHJcbiAgICAgICAgLy8g5aSE55CG5Ly06ZqP6K6+5aSH5LiO5pS26JeP54q25oCB5pWw5o2uXHJcbiAgICAgICAgbGV0IHBhcmFtczphbnkgPSB7XHJcbiAgICAgICAgICAgIGRldmljZUlkczogW10sXHJcbiAgICAgICAgICAgIGRldmljZVR5cGU6ICcnLFxyXG4gICAgICAgICAgICBpZHM6IFtdLFxyXG4gICAgICAgICAgICB1c2VySWQ6IHNlbGYudXNlckluZm9DYWNoZUZhY3RvcnkuZ2V0Q3VycmVudFVzZXJJZCgpXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwYXJhbXMuZGV2aWNlVHlwZSA9IE9iamVjdFR5cGUuQ2FtZXJhLnZhbHVlO1xyXG4gICAgICAgIF8uZm9yRWFjaChzZWxmLmFjY3BSZXN1bHRQYXJhbXMuZGF0YVt0cmFnZXRdLlNlYXJjaEFjY2Vzc1Jlc3VsdHMsZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHBhcmFtcy5kZXZpY2VJZHMucHVzaCh2YWx1ZS5BY2Nlc3NMb2cuQ2FtZXJhSUQpO1xyXG4gICAgICAgICAgICBwYXJhbXMuaWRzLnB1c2godmFsdWUuQWNjZXNzTG9nLklEKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBzZWxmLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5nZXREZXZpY2VJbmZvUHJvbWlzZShwYXJhbXMpLnRoZW4oKHJlczphbnkpPT57XHJcbiAgICAgICAgICAgIF8uZm9yRWFjaChzZWxmLmFjY3BSZXN1bHRQYXJhbXMuZGF0YVt0cmFnZXRdLlNlYXJjaEFjY2Vzc1Jlc3VsdHMsZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmRldmljZUluZm8gPSByZXMuZGF0YS5kZXZpY2VJbmZvW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY29sbGVjdFN0YXR1cyA9IHJlcy5kYXRhLmNvbGxlY3RTdGF0dXNbaW5kZXhdO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2VsZi4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnJlbmRlckFjY3BNYXJrZXJzKClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgRHJhd1JlY3QoKSB7XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIuZHJhd1JlY3QoKHBvaW50czogQXJyYXk8U3lzdGVtUG9pbnQ+LCBnZW9tZXRyeTogTlBNYXBMaWIuR2VvbWV0cnkuUG9seWdvbikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuRHJhd0NhbGxCYWNrTWV0aG9kKHBvaW50cywgZ2VvbWV0cnkpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgRHJhd0NpcmNsZSgpIHtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5kcmF3Q2lyY2xlKChwb2ludHM6IEFycmF5PFN5c3RlbVBvaW50PiwgZ2VvbWV0cnk6IE5QTWFwTGliLkdlb21ldHJ5LlBvbHlnb24pID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRyYXdDYWxsQmFja01ldGhvZChwb2ludHMsIGdlb21ldHJ5KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIERyYXdQb2x5Z29uKCkge1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmRyYXdQb2x5Z29uKChwb2ludHM6IEFycmF5PFN5c3RlbVBvaW50PiwgZ2VvbWV0cnk6IE5QTWFwTGliLkdlb21ldHJ5LlBvbHlnb24pID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRyYXdDYWxsQmFja01ldGhvZChwb2ludHMsIGdlb21ldHJ5KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIENsZWFyRHJhdygpIHtcclxuICAgICAgICB0aGlzLmFyckNhbWVyYUlkID0gW107XHJcbiAgICAgICAgdGhpcy5BY2NvbXBhbnlpbmdBbmFseXNpc1BhcmFtcy5hcnJDYW1lcmFJZCA9IFtdO1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmNsZWFyRHJhdygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgRHJhd0NhbGxCYWNrTWV0aG9kKHBvaW50czogQXJyYXk8U3lzdGVtUG9pbnQ+LCBnZW9tZXRyeTogTlBNYXBMaWIuR2VvbWV0cnkuUG9seWdvbiB8IE5QTWFwTGliLkdlb21ldHJ5LkNpcmNsZSkge1xyXG4gICAgICAgIGlmIChwb2ludHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLnJlbW92ZURyYXdTaGFwZShnZW9tZXRyeSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxheWVyRGVjLndhcm5JbmZvKCfmoYbpgInljLrln5/kuI3lrZjlnKjorr7lpIfvvIEnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFycjogQXJyYXk8U3lzdGVtUG9pbnQ+ID0gW107XHJcbiAgICAgICAgcG9pbnRzLmZvckVhY2goKGl0ZW06IFN5c3RlbVBvaW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLk9iamVjdFR5cGUgPT09IE9iamVjdFR5cGUuQ2FtZXJhLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY2hlY2tBcmVhKGFyciwgZ2VvbWV0cnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tBcmVhKGRldmljZUxpc3Q6IGFueSwgZ2VvbWV0cnk6IE5QTWFwTGliLkdlb21ldHJ5LlBvbHlnb24gfCBOUE1hcExpYi5HZW9tZXRyeS5DaXJjbGUpIHtcclxuICAgICAgICBsZXQgc2NvcGU6IHsgZGV2aWNlTGlzdDogYW55LCBnZW9tZXRyeTogTlBNYXBMaWIuR2VvbWV0cnkuUG9seWdvbiB8IE5QTWFwTGliLkdlb21ldHJ5LkNpcmNsZSwgJGRlc3Ryb3k6IEZ1bmN0aW9uLCBzZWxlY3RDaGVja0FyZWFDYjogc3RyaW5nIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUuZGV2aWNlTGlzdCA9IGRldmljZUxpc3Q7XHJcbiAgICAgICAgc2NvcGUuZ2VvbWV0cnkgPSBnZW9tZXRyeTtcclxuICAgICAgICBzY29wZS5zZWxlY3RDaGVja0FyZWFDYiA9IHRoaXMuc2VsZWN0RGV2aWNlQ2I7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGF5ZXJJbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFBvcHVwSHRtbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICB0aXRsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGNsb3NlQnRuOiAwLFxyXG4gICAgICAgICAgICBza2luOiBcIm5vLXNjcm9sbFwiLFxyXG4gICAgICAgICAgICBhcmVhOiBbXCIzMDBweFwiLCBcIjMwMHB4XCJdLFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdENhbWVyYSgpIHtcclxuICAgICAgICBsZXQgc2NvcGU6IHsgc2VsZWN0Q2FtZXJhTGlzdDogQXJyYXk8c3RyaW5nPiwgJGRlc3Ryb3k6IEZ1bmN0aW9uLCBzZWxlY3RDdHJsQ2I6IHN0cmluZyB9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLnNlbGVjdENhbWVyYUxpc3QgPSB0aGlzLkFjY29tcGFueWluZ0FuYWx5c2lzUGFyYW1zLmFyckNhbWVyYUlkO1xyXG4gICAgICAgIHNjb3BlLnNlbGVjdEN0cmxDYiA9IHRoaXMuc2VsZWN0RGV2aWNlQ2I7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGF5ZXJJbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGNhbWVyYVRyZWVQb3B1cEh0bWwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgdGl0bGU6IFwi5pGE5YOP5py66YCJ5oupXCIsXHJcbiAgICAgICAgICAgIGFyZWE6IFtcIjcxMHB4XCIsIFwiNjIwcHhcIl0sXHJcbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFJldWx0VHJhY2soKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYuY2xlYXJSZXN1bHRNYXJrZXJzSW5mbygpO1xyXG4gICAgICAgIHNlbGYuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLmlzU29ydExldHRlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgYWxsUmVzdWx0TGlzdCA9IF8uc29ydEJ5KHNlbGYuYWxsVHJhY2tSZXN1bHQsIGZ1bmN0aW9uIChpdGVtOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoRGF0ZS5wYXJzZShpdGVtLkFjY2Vzc0xvZy5Mb2dUaW1lKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzZWxmLlJlc3VsdFBhZ2luYXRpb24uc2V0KGFsbFJlc3VsdExpc3QpO1xyXG4gICAgICAgICAgICBzZWxmLnJlc3VsdFBhcmFtcy5wYWdlU2l6ZSA9IDY7XHJcbiAgICAgICAgICAgIHNlbGYucmVzdWx0UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICAgICAgc2VsZi5yZXN1bHRQYXJhbXMgPSBzZWxmLlJlc3VsdFBhZ2luYXRpb24uZ2V0QnlQYWdlKHNlbGYucmVzdWx0UGFyYW1zKTtcclxuICAgICAgICAgICAgc2VsZi5hbGxUcmFja1Jlc3VsdCA9IHNlbGYucmVzdWx0UGFyYW1zLmFsbERhdGE7XHJcbiAgICAgICAgICAgIHNlbGYuc2V0UmVzdWx0Rm9yTWFwKHNlbGYuYWxsVHJhY2tSZXN1bHQpO1xyXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcG9pbnRzID0gc2VsZi5hbmFseXNpc01tYXBTZXJ2ZXIuZ2V0U3lzdGVtUG9pbnRGb3JQYXJhbXMoc2VsZi5hbGxUcmFja1Jlc3VsdCk7XHJcbiAgICAgICAgICAgIHNlbGYuYW5hbHlzaXNNbWFwU2VydmVyLnNldFRyYWNrQW5pbWF0aW9uKHNlbGYuYWxsVHJhY2tSZXN1bHQsIHBvaW50cywgc2VsZi50cmFja1Jlc3VsdEZvck1hcCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QWNjcFRyYWNrKGk6IG51bWJlcikge1xyXG4gICAgICAgIGlmICghdGhpcy5jaGVja1JpZ2h0UmVzdWx0W2ldKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVSaWdodFJlc3VsdChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFyciA9IHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmdldFN5c3RlbVBvaW50Rm9yUGFyYW1zKHRoaXMuYWxsQWNjcFRyYWNrUmVzdWx0KTtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5zZXRBY2NwVHJhY2tBbmltYXRpb24odGhpcy5hbGxBY2NwVHJhY2tSZXN1bHQsIGFyciwgdGhpcy5hY2NwVHJhY2tSZXN1bHRGb3JNYXApO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyUmVzdWx0TWFya2Vyc0luZm8oKSB7XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIuY2xlYXJSZXN1bHRNYXJrZXJzKCk7XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIuY2xlYXJUcmFjZUFuYWx5emUoKTtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5jbGVhclRyYWNrSW5mb1dpbmRvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIG9wZW5EZXRhaWxQb3B1cChpdGVtOiBhbnksIGluZGV4OiBudW1iZXIsIGdyb3VwTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBvYmplY3RUeXBlOnN0cmluZyA9XCJcIjtcclxuICAgICAgICBsZXQgbmV3SXRlbTogYW55ID0ge307XHJcbiAgICAgICAgbGV0IG5ld0xpc3Q6QXJyYXk8YW55PiA9IFtdO1xyXG5cclxuICAgICAgICBvYmplY3RUeXBlID0gT2JqZWN0VHlwZS5DYW1lcmEudmFsdWU7XHJcbiAgICAgICAgbmV3SXRlbSA9IGl0ZW07XHJcbiAgICAgICAgbmV3TGlzdC5wdXNoKG5ld0l0ZW0pO1xyXG4gICAgICAgIGxldCBzY29wZToge1xyXG4gICAgICAgICAgICAkZGVzdHJveTogRnVuY3Rpb24sXHJcbiAgICAgICAgICAgIHJhbms6IG51bWJlcixcclxuICAgICAgICAgICAgYWxsTGlzdDogQXJyYXk8YW55PixcclxuICAgICAgICAgICAgY29sbGVjdEZ1bmN0aW9uOiBGdW5jdGlvbixcclxuICAgICAgICAgICAgYW5hbHlzaXNGdW5jdGlvbjogRnVuY3Rpb24sXHJcbiAgICAgICAgICAgIHN1cnZlaWxsYW5jZUZ1bmN0aW9uOiBGdW5jdGlvbixcclxuICAgICAgICAgICAgY2xvc2VQb3B1cDogRnVuY3Rpb24sXHJcbiAgICAgICAgICAgIHNob3dGb290ZXI6IGJvb2xlYW5cclxuICAgICAgICAgICAgaW5kZXg6YW55XHJcbiAgICAgICAgfSA9IHNlbGYuJHNjb3BlLiRuZXcoKTtcclxuXHJcbiAgICAgICAgc2NvcGUucmFuayA9IGluZGV4O1xyXG4gICAgICAgIHNjb3BlLnNob3dGb290ZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlLmluZGV4ID0gXCJcIjtcclxuICAgICAgICBzY29wZS5hbGxMaXN0ID0gbmV3TGlzdDtcclxuICAgICAgICBzY29wZS5jb2xsZWN0RnVuY3Rpb24gPSAoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuY2xpY2tDb2xsZWN0KG51bGwsIGl0ZW0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2NvcGUuYW5hbHlzaXNGdW5jdGlvbiA9IChpdGVtOiBhbnksIHR5cGU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLmNsaWNrQW5hbHlzaXMobnVsbCwgaXRlbSwgdHlwZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzY29wZS5zdXJ2ZWlsbGFuY2VGdW5jdGlvbiA9IChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5jbGlja1N1cnZlaWxsYW5jZShudWxsLCBpdGVtKTtcclxuICAgICAgICAgICAgc2VsZi5sYXllci5jbG9zZShzY29wZS5pbmRleCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzY29wZS5jbG9zZVBvcHVwID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLmxheWVyLmNsb3NlKHNjb3BlLmluZGV4KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNlbGYuYW5hbHlzaXNNbWFwU2VydmVyLm9wZW5EZXRhaWxQb3B1cChuZXdJdGVtLCBpbmRleCwgbmV3TGlzdCwgb2JqZWN0VHlwZSwgc2NvcGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOagueaNrue7k+aenOaYvuekuuWcsOWbvuWvueW6lOeahOeCueS9jVxyXG4gICAgcmVzdWx0VG9NYXAoaXRlbTogUmVzdWx0LCBpbmRleDogbnVtYmVyLCB0eXBlPzogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIucmVzdWx0VG9NYXAoaXRlbSwgdHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Y+W5raI57uT5p6c5pi+56S65Zyw5Zu+5a+55bqU55qE54K55L2NXHJcbiAgICB1blJlc3VsdFRvTWFwKGl0ZW06IFJlc3VsdCwgaW5kZXg6IG51bWJlciwgdHlwZT86IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLnVuUmVzdWx0VG9NYXAoaXRlbSwgdHlwZSA/IHRoaXMuYWNjcFRyYWNrUmVzdWx0Rm9yTWFwIDogdGhpcy50cmFja1Jlc3VsdEZvck1hcCwgdHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ29CYWNrKCkge1xyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kZW1pdCgnc2hvd0l0ZW1QYWdlJywgZmFsc2UpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ29CYWNrRm9ybSgpIHtcclxuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaG93Rm9ybSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1Jlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dBbGxSZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zaG93QWxsQWNjb21wYW55UmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdG9yeUZvck1hcE1hcmtlcigpO1xyXG4gICAgICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5yZW5kZXJTeXN0ZW1Qb2ludCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ29BbGxSZXN1bHQoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93UmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG93QWxsUmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJlc3VsdFBhcmFtcy5wYWdlU2l6ZSA9IDQwO1xyXG4gICAgICAgIHRoaXMucmVzdWx0UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICB0aGlzLnJlc3VsdFBhcmFtcyA9IHRoaXMuUmVzdWx0UGFnaW5hdGlvbi5nZXRCeVBhZ2UodGhpcy5yZXN1bHRQYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlQWxsUmVzdWx0KCkge1xyXG4gICAgICAgIHRoaXMuc2hvd1Jlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zaG93QWxsUmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMucmVzdWx0UGFyYW1zLnBhZ2VTaXplID0gNjtcclxuICAgICAgICB0aGlzLnJlc3VsdFBhcmFtcyA9IHRoaXMuUmVzdWx0UGFnaW5hdGlvbi5nZXRCeVBhZ2UodGhpcy5yZXN1bHRQYXJhbXMpO1xyXG4gICAgICAgIHRoaXMuYWxsVHJhY2tSZXN1bHQgPSB0aGlzLnJlc3VsdFBhcmFtcy5hbGxEYXRhO1xyXG4gICAgICAgIGxldCBhcnIgPSB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5nZXRTeXN0ZW1Qb2ludEZvclBhcmFtcyh0aGlzLnJlc3VsdFBhcmFtcy5kYXRhKTtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5yZW5kZXJNYWtlcnMoXHJcbiAgICAgICAgICAgIE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdExheWVyLFxyXG4gICAgICAgICAgICBPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRHcm91cCxcclxuICAgICAgICAgICAgdHJ1ZSxcclxuICAgICAgICAgICAgYXJyLFxyXG4gICAgICAgICAgICB0aGlzLnRyYWNrUmVzdWx0Rm9yTWFwLFxyXG4gICAgICAgICAgICB0aGlzLmlzU29ydExldHRlcixcclxuICAgICAgICAgICAgdGhpcy5zb3J0TGV0dGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBnb0FjY29tcGFueUFsbFJlc3VsdCgpIHtcclxuICAgICAgICB0aGlzLnNob3dSZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNob3dBbGxBY2NvbXBhbnlSZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYWNjcFJlc3VsdFBhcmFtcy5wYWdlU2l6ZSA9IDE1O1xyXG4gICAgICAgIHRoaXMuYWNjcFJlc3VsdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgdGhpcy5hY2NwUmVzdWx0UGFyYW1zID0gdGhpcy5BY2NwUGFnaW5hdGlvbi5nZXRCeVBhZ2UodGhpcy5hY2NwUmVzdWx0UGFyYW1zKTtcclxuICAgICAgICB0aGlzLnNldENoZWNrUmlnaHRSZXN1bHQodGhpcy5hY2NwUmVzdWx0UGFyYW1zLnBhZ2VTaXplLCAwLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZUFsbEFjY29tcGFueVJlc3VsdCgpIHtcclxuICAgICAgICB0aGlzLnNob3dSZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2hvd0FsbEFjY29tcGFueVJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYWNjcFJlc3VsdFBhcmFtcy5wYWdlU2l6ZSA9IDY7XHJcbiAgICAgICAgdGhpcy5hY2NwUmVzdWx0UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICB0aGlzLmFjY3BSZXN1bHRQYXJhbXMgPSB0aGlzLkFjY3BQYWdpbmF0aW9uLmdldEJ5UGFnZSh0aGlzLmFjY3BSZXN1bHRQYXJhbXMpO1xyXG4gICAgICAgIHRoaXMuc2V0Q2hlY2tSaWdodFJlc3VsdCh0aGlzLmFjY3BSZXN1bHRQYXJhbXMucGFnZVNpemUsIDAsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVJlc3VsdFBhZ2UoaTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRQYXJhbXMuY3VycmVudFBhZ2UgPSBpO1xyXG4gICAgICAgIHRoaXMucmVzdWx0UGFyYW1zID0gdGhpcy5SZXN1bHRQYWdpbmF0aW9uLmdldEJ5UGFnZSh0aGlzLnJlc3VsdFBhcmFtcyk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNTb3J0TGV0dGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIucmVuZGVyTWFrZXJzKFxyXG4gICAgICAgICAgICAgICAgICAgIE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdExheWVyLFxyXG4gICAgICAgICAgICAgICAgICAgIE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdEdyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgIHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIuZ2V0U3lzdGVtUG9pbnRGb3JQYXJhbXModGhpcy5yZXN1bHRQYXJhbXMuZGF0YSksXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFja1Jlc3VsdEZvck1hcCxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU29ydExldHRlcixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnRMZXR0ZXIpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VBY2NwUmVzdWx0UGFnZShpOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmFjY3BSZXN1bHRQYXJhbXMuY3VycmVudFBhZ2UgPSBpO1xyXG4gICAgICAgIHRoaXMuYWNjcFJlc3VsdFBhcmFtcyA9IHRoaXMuQWNjcFBhZ2luYXRpb24uZ2V0QnlQYWdlKHRoaXMuYWNjcFJlc3VsdFBhcmFtcyk7XHJcbiAgICAgICAgdGhpcy5zZXRDaGVja1JpZ2h0UmVzdWx0KHRoaXMuYWNjcFJlc3VsdFBhcmFtcy5wYWdlU2l6ZSwgMCwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRSZXN1bHRGb3JNYXAocmVzdWx0OiBBcnJheTxSZXN1bHQgfCBDYWNoZVJlc3VsdD4pIHtcclxuICAgICAgICBsZXQgb2JqID0ge30gYXMgeyBba2V5OiBzdHJpbmddOiBDYWNoZVJlc3VsdCB9O1xyXG4gICAgICAgIHJlc3VsdC5mb3JFYWNoKChpdGVtOiBDYWNoZVJlc3VsdCwgaTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIG9ialtpdGVtLkFjY2Vzc0xvZy5JRF0gPSBpdGVtO1xyXG4gICAgICAgICAgICBvYmpbaXRlbS5BY2Nlc3NMb2cuSURdLnJlc3VsdEluZGV4ID0gaTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnRyYWNrUmVzdWx0Rm9yTWFwID0gb2JqO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVuZGVyQWNjcE1hcmtlcnMoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBhY2NwQXJyID0gc2VsZi5hY2NwUmVzdWx0UGFyYW1zLmRhdGFbc2VsZi5hY2NwUmVzdWx0SW5kZXhdLlNlYXJjaEFjY2Vzc1Jlc3VsdHM7XHJcbiAgICAgICAgbGV0IG9iaiA9IHt9IGFzIHsgW2tleTogc3RyaW5nXTogQ2FjaGVSZXN1bHQgfTtcclxuICAgICAgICBhY2NwQXJyLmZvckVhY2goKGl0ZW06IENhY2hlUmVzdWx0LCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIG9ialtpdGVtLkFjY2Vzc0xvZy5JRF0gPSBpdGVtO1xyXG4gICAgICAgICAgICBvYmpbaXRlbS5BY2Nlc3NMb2cuSURdLnJlc3VsdEluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNlbGYuYWNjcFRyYWNrUmVzdWx0Rm9yTWFwID0gb2JqO1xyXG4gICAgICAgIHNlbGYuYWxsQWNjcFRyYWNrUmVzdWx0ID0gYWNjcEFycjtcclxuICAgICAgICBsZXQgYXJyID0gc2VsZi5hbmFseXNpc01tYXBTZXJ2ZXIuZ2V0U3lzdGVtUG9pbnRGb3JQYXJhbXMoc2VsZi5hbGxBY2NwVHJhY2tSZXN1bHQpO1xyXG4gICAgICAgIHNlbGYuYW5hbHlzaXNNbWFwU2VydmVyLnJlbmRlck1ha2VycyhcclxuICAgICAgICAgICAgT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0TGF5ZXIsXHJcbiAgICAgICAgICAgIE92ZXJsYXlOYW1lLk1hcEZvckFjY3BHcm91cCxcclxuICAgICAgICAgICAgdHJ1ZSxcclxuICAgICAgICAgICAgYXJyLFxyXG4gICAgICAgICAgICBzZWxmLmFjY3BUcmFja1Jlc3VsdEZvck1hcCxcclxuICAgICAgICAgICAgZmFsc2UsXHJcbiAgICAgICAgICAgIG51bGwsXHJcbiAgICAgICAgICAgIE1hcmtlcnNJY29uLk5vcm1hbEdyZWVuSWNvblxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5pi+56S656a757q/5Lu75Yqh5YiX6KGoXHJcbiAgICBzaG93QW5hbHlzaXNMaXN0Rm4oZmxhZzogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuc2hvd0FuYWx5c2lzTGlzdCA9IGZsYWc7XHJcbiAgICAgICAgaWYgKGZsYWcpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRBY2NvbXBPZmZMaW5lTGlzdCgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOiOt+WPluemu+e6v+S7u+WKoeivpuaDhVxyXG4gICAgICogQHBhcmFtIHtBY2NvbXBPZmZMaW5lfSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHNob3dBbmFseXNpc1Jlc3VsdChpdGVtOiBJbnRlbGlnZW50VGFza0luZm8pIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IHtcclxuICAgICAgICAgICAgXCJhbmFseXNlVGFza1R5cGVcIjogQW5hbHlzZVRhc2tUeXBlLlNlYXJjaEFuYWx5c2VUYXNrUmVzdWx0LFxyXG4gICAgICAgICAgICBcInRhc2tJZFwiOiBpdGVtLlRhc2tJZCxcclxuICAgICAgICAgICAgXCJUYXNrVHlwZVwiOiBpdGVtLlRhc2tUeXBlXHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZWxmLmFuYWx5c2lzU2VydmljZS5nZXRPZmZMaW5lRGV0YWlsKHBhcmFtcykudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAyMDAgJiYgcmVzLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YSAmJiAocmVzLmRhdGEuU2VhcmNoQWNjZXNzUmVzdWx0cy5sZW5ndGggPiAwKSAmJiAocmVzLmRhdGEuRmFjZUFjY29tcGFueUVudGl0aWVzLmxlbmd0aCA+IDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5hbmFseXNpc01tYXBTZXJ2ZXIucmVtb3ZlU3lzdGVtUG9pbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGFyYW1zOmFueSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGV2aWNlSWRzOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGV2aWNlVHlwZTogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkczogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZDogc2VsZi51c2VySW5mb0NhY2hlRmFjdG9yeS5nZXRDdXJyZW50VXNlcklkKClcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcy5kZXZpY2VUeXBlID0gT2JqZWN0VHlwZS5DYW1lcmEudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdExpc3Q6IGFueSA9IF8uc29ydEJ5KHJlcy5kYXRhLlNlYXJjaEFjY2Vzc1Jlc3VsdHMsIGZ1bmN0aW9uIChpdGVtOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1pdGVtLlNjb3JlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0cmFja1Jlc3VsdExpc3Q6IGFueSA9IF8uc29ydEJ5KHJlcy5kYXRhLkZhY2VBY2NvbXBhbnlFbnRpdGllcywgZnVuY3Rpb24gKGl0ZW06IGFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLWl0ZW0uTnVtO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIF8uZm9yRWFjaChyZXN1bHRMaXN0LGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMuZGV2aWNlSWRzLnB1c2godmFsdWUuQWNjZXNzTG9nLkNhbWVyYUlEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLmlkcy5wdXNoKHZhbHVlLkFjY2Vzc0xvZy5JRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5yZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UuZ2V0RGV2aWNlSW5mb1Byb21pc2UocGFyYW1zKS50aGVuKChyZXM6YW55KT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfLmZvckVhY2gocmVzdWx0TGlzdCxmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZGV2aWNlSW5mbyA9IHJlcy5kYXRhLmRldmljZUluZm9baW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jb2xsZWN0U3RhdHVzID0gcmVzLmRhdGEuY29sbGVjdFN0YXR1c1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuUmVzdWx0UGFnaW5hdGlvbi5zZXQocmVzdWx0TGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkFjY3BQYWdpbmF0aW9uLnNldCh0cmFja1Jlc3VsdExpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVzdWx0UGFyYW1zLnBhZ2VTaXplID0gNjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVzdWx0UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVzdWx0UGFyYW1zID0gc2VsZi5SZXN1bHRQYWdpbmF0aW9uLmdldEJ5UGFnZShzZWxmLnJlc3VsdFBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFsbFRyYWNrUmVzdWx0ID0gc2VsZi5SZXN1bHRQYWdpbmF0aW9uLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRSZXN1bHRGb3JNYXAoc2VsZi5hbGxUcmFja1Jlc3VsdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hY2NwUmVzdWx0UGFyYW1zLnBhZ2VTaXplID0gNjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWNjcFJlc3VsdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFjY3BSZXN1bHRQYXJhbXMgPSBzZWxmLkFjY3BQYWdpbmF0aW9uLmdldEJ5UGFnZShzZWxmLmFjY3BSZXN1bHRQYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hbGxBY2NwVHJhY2tSZXN1bHQgPSBzZWxmLkFjY3BQYWdpbmF0aW9uLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd0Zvcm0gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd1Jlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmlzU29ydExldHRlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXJyID0gc2VsZi5hbmFseXNpc01tYXBTZXJ2ZXIuZ2V0U3lzdGVtUG9pbnRGb3JQYXJhbXMoc2VsZi5yZXN1bHRQYXJhbXMuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFuYWx5c2lzTW1hcFNlcnZlci5yZW5kZXJNYWtlcnMoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0TGF5ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0R3JvdXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi50cmFja1Jlc3VsdEZvck1hcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmlzU29ydExldHRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNvcnRMZXR0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRDaGVja1JpZ2h0UmVzdWx0KHRoaXMuYWNjcFJlc3VsdFBhcmFtcy5wYWdlU2l6ZSwgMCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubGF5ZXJEZWMuaW5mbygn5rKh5pyJ5p+l6K+i5Yiw5Ly06ZqP57uT5p6cJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubGF5ZXJEZWMud2FybkluZm8oJ+afpeivoue7k+aenOWksei0pScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyDojrflj5bnprvnur/ku7vliqHliJfooahcclxuICAgIHByaXZhdGUgZ2V0QWNjb21wT2ZmTGluZUxpc3QoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIFwiaWRcIjogc2VsZi51c2VySW5mb0NhY2hlRmFjdG9yeS5nZXRDdXJyZW50VXNlcklkKCksXHJcbiAgICAgICAgICAgIFwidGFza1R5cGVcIjogT2ZmbGluZVRhc2tUeXBlLlNlYXJjaEZhY2VBY2NvbXBhbnlcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNlbGYuYW5hbHlzaXNTZXJ2aWNlLmdldE9mZkxpbmVMaXN0KHBhcmFtcykudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAyMDAgJiYgQXJyYXkuaXNBcnJheShyZXMuZGF0YSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBMaXN0OiBBcnJheTxJbnRlbGlnZW50VGFza0luZm8+ID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlcy5kYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLmRhdGFbaV0uRXh0ID0gSlNPTi5wYXJzZShyZXMuZGF0YVtpXS5FeHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIExpc3QucHVzaChyZXMuZGF0YVtpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZWxmLkFjY29tcE9mZkxpbmUgPSBMaXN0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDliKDpmaTnprvnur/ku7vliqFcclxuICAgICAqIEBwYXJhbSB7QWNjb21wT2ZmTGluZX0gaXRlbVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRlbGV0ZUFjY29tcE9mZkxpbmUoaXRlbTogSW50ZWxpZ2VudFRhc2tJbmZvKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIFwidGFza0lkXCI6IGl0ZW0uVGFza0lkLFxyXG4gICAgICAgICAgICBcInRhc2tUeXBlXCI6IGl0ZW0uVGFza1R5cGVcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNlbGYuYW5hbHlzaXNTZXJ2aWNlLmRlbGV0ZU9mZkxpbmVEZXRhaWwocGFyYW1zKS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sYXllckRlYy5pbmZvKCfliKDpmaTmiJDlip8nKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuZ2V0QWNjb21wT2ZmTGluZUxpc3QoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubGF5ZXJEZWMud2FybkluZm8oJ+WIoOmZpOWksei0pScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVJbWFnZSgpIHtcclxuICAgICAgICB0aGlzLkFjY29tcGFueWluZ0FuYWx5c2lzUGFyYW1zLmltYWdlUGF0aCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy/kuIrkvKDlm77niYdcclxuICAgIHVwbG9hZEltYWdlKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGZyb20gPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBmcm9tLmFwcGVuZCgnaW1hZ2UnLCBldmVudC50YXJnZXQuZmlsZXNbMF0pO1xyXG4gICAgICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgICAgICBzdG9yZVR5cGU6IFwiTE9DXCIsXHJcbiAgICAgICAgICAgIGltYWdlQ2F0ZWdvcnk6IFwiQ2FwdHVyZUltYWdlXCIsXHJcbiAgICAgICAgICAgIGNvbW1hbmRUeXBlOiBcIlNlYXJjaEZhY2VBY2NvbXBhbnlcIixcclxuICAgICAgICAgICAgZGV0ZWN0VHlwZTogXCJGYWNlXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMudXBsb2FkSW1hZ2VTZXJ2aWNlLnVwbG9hZEltYWdlRm9yRmFjZShmcm9tLCBkYXRhKS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoKHJlcy5jb2RlID09PSAyMDApICYmIChyZXMuZGF0YSAmJiByZXMuZGF0YS5rZXkpKSB7IC8vIOS6uuiEuOivhuWIq+aIkOWKn1xyXG4gICAgICAgICAgICAgICAgc2VsZi4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5BY2NvbXBhbnlpbmdBbmFseXNpc1BhcmFtcy5pbWFnZVBhdGggPSByZXMuZGF0YS5pbWFnZXVybDtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLkFjY29tcGFueWluZ0FuYWx5c2lzUGFyYW1zLnRhc2tJZCA9IHJlcy5kYXRhLmtleTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHJlcy5jb2RlID09PSAyMDApICYmIChyZXMuZGF0YS5mYWNlSW5mbykpIHsvLyDkurrohLjpgInmi6lcclxuICAgICAgICAgICAgICAgIGxldCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgICAgICAgaW1hZ2Uuc3JjID0gJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJytyZXMuZGF0YS5pbWFnZTtcclxuICAgICAgICAgICAgICAgIGltYWdlLm9ubG9hZCA9ICgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiX2luZm9cIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBpbWFnZS53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IGltYWdlLmhlaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLm11bHRpVXNlclNlbGVjdChyZXMuZGF0YSwgZmlsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHJlcy5jb2RlID09PSAyMDApICYmIChyZXMuZGF0YS5pbWFnZSkpIHsgLy8g5Lq66IS46K+G5Yir5aSx6LSl5b6F5qCH5a6aXHJcbiAgICAgICAgICAgICAgICBsZXQgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICAgICAgICAgIGltYWdlLnNyYyA9ICdkYXRhOmltYWdlL2pwZWc7YmFzZTY0LCcrcmVzLmRhdGEuaW1hZ2U7XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5vbmxvYWQgPSAoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWxlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIl9pbmZvXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogaW1hZ2Uud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBpbWFnZS5oZWlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5mYWNlRGVtYXJjYXRlKHJlcy5kYXRhLCBmaWxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubGF5ZXJEZWMud2FybkluZm8oJ+S6uuiEuOivhuWIq+Wksei0pScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb27lpJrkurrohLjpgInmi6lcclxuICAgICAqIEBwYXJhbSBmYWNlSW5mb1xyXG4gICAgICogQHBhcmFtIGZpbGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIG11bHRpVXNlclNlbGVjdChmYWNlSW5mbzogYW55LCBmaWxlOiBhbnkpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IGxheWVyOiBhbnk7IGluZGV4OiBzdHJpbmcsICRkZXN0cm95OiBGdW5jdGlvbiwgZGF0YTogYW55LCBmaWxlOiBhbnksIGNvbW1hbmRUeXBlOiBzdHJpbmcsIGRldGVjdFR5cGU6IHN0cmluZywgbGF5ZXJJbmRleDogYW55LCBmcm9tU2VsZWN0RmFjZUN0cmw6IHN0cmluZyB9ID0gc2VsZi4kc2NvcGUuJG5ldygpO1xyXG5cclxuICAgICAgICBzY29wZS5pbmRleCA9IG51bGw7XHJcbiAgICAgICAgc2NvcGUuZGF0YSA9IGZhY2VJbmZvO1xyXG4gICAgICAgIHNjb3BlLmZpbGUgPSBmaWxlO1xyXG4gICAgICAgIHNjb3BlLmNvbW1hbmRUeXBlID0gXCJTZWFyY2hBY2Nlc3NMb2dcIjtcclxuICAgICAgICBzY29wZS5kZXRlY3RUeXBlID0gXCJGYWNlXCI7XHJcbiAgICAgICAgc2NvcGUuZnJvbVNlbGVjdEZhY2VDdHJsID0gc2VsZi5zZWxlY3RGYWNlQ3RybDtcclxuXHJcbiAgICAgICAgc2NvcGUubGF5ZXJJbmRleCA9IHNlbGYubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIHNraW46ICduby1zY3JvbGwnLFxyXG4gICAgICAgICAgICB0aXRsZTogWyfkurrohLjpgInmi6knLCAnZm9udC13ZWlnaHQ6IGJvbGQ7YmFja2dyb3VuZC1jb2xvcjogI0Y2RjhGQjtjb2xvcjogIzYwNjA2MDtoZWlnaHQ6IDQwcHg7J10sXHJcbiAgICAgICAgICAgIGFyZWE6IFsnNDAwcHgnLCAnMzEwcHgnXSxcclxuICAgICAgICAgICAgY29udGVudDogc2VsZWN0RmFjZVBvcHVwSHRtbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb27kurrohLjmoIfms6hcclxuICAgICAqIEBwYXJhbSBmYWNlSW5mb1xyXG4gICAgICogQHBhcmFtIGZpbGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZhY2VEZW1hcmNhdGUoZmFjZUluZm86IGFueSwgZmlsZTogYW55KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBzY29wZTogeyBsYXllcjogYW55OyBpbmRleDogc3RyaW5nLCAkZGVzdHJveTogRnVuY3Rpb24sIGRhdGE6IGFueSwgZmlsZTogYW55LCBjb21tYW5kVHlwZTogc3RyaW5nLCBkZXRlY3RUeXBlOiBzdHJpbmcsIGxheWVySW5kZXg6IGFueSwgZnJvbURlbWFyY2F0ZUZhY2VDdHJsOiBzdHJpbmcsIGZsYWc6IGJvb2xlYW4gfSA9IHNlbGYuJHNjb3BlLiRuZXcoKTtcclxuXHJcbiAgICAgICAgc2NvcGUuaW5kZXggPSBudWxsO1xyXG4gICAgICAgIHNjb3BlLmRhdGEgPSBmYWNlSW5mbztcclxuICAgICAgICBzY29wZS5maWxlID0gZmlsZTtcclxuICAgICAgICBzY29wZS5jb21tYW5kVHlwZSA9IFwiU2VhcmNoQWNjZXNzTG9nXCI7XHJcbiAgICAgICAgc2NvcGUuZGV0ZWN0VHlwZSA9IFwiRmFjZVwiO1xyXG4gICAgICAgIHNjb3BlLmZyb21EZW1hcmNhdGVGYWNlQ3RybCA9IHNlbGYuc2VsZWN0RmFjZUN0cmw7XHJcbiAgICAgICAgc2NvcGUuZmxhZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBzY29wZS5sYXllckluZGV4ID0gc2VsZi5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgc2tpbjogJ25vLXNjcm9sbCcsXHJcbiAgICAgICAgICAgIHRpdGxlOiBbJ+S6uuiEuOagh+azqCcsICdmb250LXdlaWdodDogYm9sZDtiYWNrZ3JvdW5kLWNvbG9yOiAjRjZGOEZCO2NvbG9yOiAjNjA2MDYwO2hlaWdodDogNDBweDsnXSxcclxuICAgICAgICAgICAgYXJlYTogWyc2NTBweCcsICc1NTVweCddLFxyXG4gICAgICAgICAgICBjb250ZW50OiBkZW1hcmNhdGVQb3B1cEh0bWwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5pS26JeP5LiO5Y+W5raI5pS26JePXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICovXHJcbiAgICBjbGlja0NvbGxlY3QoZXZlbnQ6IGFueSwgaXRlbTogYW55KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCFpdGVtLmNvbGxlY3RTdGF0dXMpIHtcclxuICAgICAgICAgICAgbGV0IHBhcmFtczogYW55ID0ge1xyXG4gICAgICAgICAgICAgICAganNvbjogYW5ndWxhci50b0pzb24oaXRlbSksXHJcbiAgICAgICAgICAgICAgICBvYmplY3RJRDogaXRlbS5BY2Nlc3NMb2cuSUQsXHJcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBcIkZhY2VcIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzZWxmLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5jb2xsZWN0QWRkSW5mbyhwYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHBhcmFtczogYW55ID0ge1xyXG4gICAgICAgICAgICAgICAgaWRzOiBpdGVtLkFjY2Vzc0xvZy5JRFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzZWxmLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5jb2xsZWN0RGVsZXRlSW5mbyhwYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGl0ZW0uY29sbGVjdFN0YXR1cyA9ICFpdGVtLmNvbGxlY3RTdGF0dXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5YiG5p6QXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICovXHJcbiAgICBjbGlja0FuYWx5c2lzKGV2ZW50OmFueSwgaXRlbTphbnksIHR5cGU6c3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc3RvcmFnZVBhcmFtczogQW5hbHlzaXNTdG9yYWdlUGFyYW1zID0gQW5hbHlzaXNEYXRhVHlwZS5GYWNlO1xyXG4gICAgICAgIHN0b3JhZ2VQYXJhbXMuZGF0YSA9IGl0ZW07XHJcbiAgICAgICAgdGhpcy5oYW5kbGVTdG9yYWdlLnNldFNlc3Npb25TdG9yYWdlRGF0YShzdG9yYWdlUGFyYW1zLmtleSwgc3RvcmFnZVBhcmFtcyk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJBbmFseXNpc1R5cGVcIiwgXCJGYWNlXCIpO1xyXG4gICAgICAgIGlmICh0eXBlID09PSBBbmFseXNpc0dvVG9UeXBlLlRyYWNrLmtleSkge1xyXG4gICAgICAgICAgICB3aW5kb3cub3BlbihBbmFseXNpc0dvVG9UeXBlLlRyYWNrLmRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gQW5hbHlzaXNHb1RvVHlwZS5BY2NvbXBhbnlpbmcua2V5KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKEFuYWx5c2lzR29Ub1R5cGUuQWNjb21wYW55aW5nLmRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gQW5hbHlzaXNHb1RvVHlwZS5GcmVxdWVuY3kua2V5KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKEFuYWx5c2lzR29Ub1R5cGUuRnJlcXVlbmN5LmRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gQW5hbHlzaXNHb1RvVHlwZS5Nb3JlLmtleSkge1xyXG4gICAgICAgICAgICB3aW5kb3cub3BlbihBbmFseXNpc0dvVG9UeXBlLk1vcmUuZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOW4g+aOp+S4juWPlua2iOW4g+aOp1xyXG4gICAgICogQHBhcmFtIGl0ZW1cclxuICAgICAqL1xyXG4gICAgY2xpY2tTdXJ2ZWlsbGFuY2UoZXZlbnQ6IGFueSwgaXRlbTogYW55KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpdGVtLnN1cnZlaWxsYW5jZVN0YXR1cyA9ICFpdGVtLnN1cnZlaWxsYW5jZVN0YXR1cztcclxuICAgIH1cclxuXHJcbiAgICAvLyDmn6XnnIvlhajlm75cclxuICAgIHB1YmxpYyBmdWxsU2NyZWVuKGV2ZW50OiBhbnksIHBhdGg6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IGxheWVyOiBhbnk7IGluZGV4OiBzdHJpbmcsIHBhdGg6IGFueSwgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUuaW5kZXggPSBcImZ1bGxTY3JlZW5Qb3B1cFwiO1xyXG4gICAgICAgIHNjb3BlLnBhdGggPSBwYXRoO1xyXG4gICAgICAgIGlmIChwYXRoKSB7XHJcbiAgICAgICAgICAgIGxldCB3aW5kb3dXOiBhbnkgPSAkKHdpbmRvdykud2lkdGgoKSAqIDAuODtcclxuICAgICAgICAgICAgbGV0IHdpbmRvd0g6IGFueSA9ICQod2luZG93KS5oZWlnaHQoKSAqIDAuODtcclxuICAgICAgICAgICAgbGV0IGNvbnRlbnRIVE1MID0gYDxpbWcgbmctc3JjPSR7cGF0aH0gc3R5bGU9J3dpZHRoOiR7d2luZG93V31weDtoZWlnaHQ6JHt3aW5kb3dIfXB4Oyc+YDtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjbG9zZUJ0bjogMCxcclxuICAgICAgICAgICAgICAgIHNraW46ICdsYXl1aS1sYXllci1ub2JnIG5vLXNjcm9sbCcsXHJcbiAgICAgICAgICAgICAgICBzaGFkZUNsb3NlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2hhZGU6IDAuNixcclxuICAgICAgICAgICAgICAgIGFyZWE6IFt3aW5kb3dXICsgJ3B4Jywgd2luZG93SCArICdweCddLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogY29udGVudEhUTUwsXHJcbiAgICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLm1zZyhcIuWbvueJh+WcsOWdgOS4jeWtmOWcqFwiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ0FjY29tcGFueWluZ0FuYWx5c2lzQ29udHJvbGxlcicsIEFjY29tcGFueWluZ0FuYWx5c2lzQ29udHJvbGxlcik7XHJcbiJdfQ==
