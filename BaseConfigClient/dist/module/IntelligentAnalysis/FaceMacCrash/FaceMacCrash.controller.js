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
define(["require", "exports", "text!../Analysis.camera.popup.html", "text!../TrackPopup/track.popup.html", "text!../MacTrackPopup/mac.popup.html", "text!../TrackPopupDetail/track.popup.detail.html", "text!../MacTrackPopupDetail/mac.popup.detail.html", "text!../loading/loading.html", "text!../../common/faceHandlePopup/selectFace.popup.html", "text!../../common/faceHandlePopup/demarcate.popup.html", "../../common/app/main.app", "../../../core/entity/AccompanyingAnalysisEnum", "../AnalysisEnum", "../../common/Pagination", "../../../core/server/enum/AnalyseTaskOffLine", "../../../core/enum/ObjectType", "../../../core/server/enum/AnalysisDataType", "lodash", "../Analysis.camera.popup", "../TrackPopup/track.popup.controller", "../MacTrackPopup/mac.popup.controller", "../TrackPopupDetail/track.popup.detail.controller", "../MacTrackPopupDetail/mac.popup.detail.controller", "css!../style/FaceMacCrash.css", "../../common/services/macCarCrashMock.service", "../../common/services/analysis.service", "../../common/services/resourceRetrieval.service", "../../common/factory/userinfo.cache.factory", "../../common/factory/layerMsg.factory", "../main/analysisMmap.server", "../main/macAnalysisMap.service", "../../common/services/uploadImage.service", "../../common/factory/HandleStorage.factory"], function (require, exports, popupHtml, trackPopupHtml, macPopupHtml, detailPopupHtml, detailMacPopupHtml, loadingAnalysisHtml, selectFacePopupHtml, demarcatePopupHtml, main_app_1, AccompanyingAnalysisEnum_1, AnalysisEnum_1, Pagination_1, AnalyseTaskOffLine_1, ObjectType_1, AnalysisDataType_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WinPopupType = (function () {
        function WinPopupType() {
        }
        WinPopupType.Track = 'Track';
        WinPopupType.Marker = 'Marker';
        WinPopupType.Detail = 'Detail';
        return WinPopupType;
    }());
    var CacheResult = (function (_super) {
        __extends(CacheResult, _super);
        function CacheResult() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CacheResult;
    }(AccompanyingAnalysisEnum_1.Result));
    var TypeList = [
        { key: 'FaceToMac', text: '人脸碰感知数据' },
        { key: 'MacToFace', text: '感知数据碰人脸' }
    ];
    var FaceMacCrashController = (function () {
        function FaceMacCrashController($scope, $timeout, macCarCrashMockService, layer, $compile, analysisService, layerDec, userInfoCacheFactory, analysisMmapServer, macAnalysisMapService, resourceRetrievalService, uploadImageService, $interval, handleStorage, $state) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.macCarCrashMockService = macCarCrashMockService;
            this.layer = layer;
            this.$compile = $compile;
            this.analysisService = analysisService;
            this.layerDec = layerDec;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.analysisMmapServer = analysisMmapServer;
            this.macAnalysisMapService = macAnalysisMapService;
            this.resourceRetrievalService = resourceRetrievalService;
            this.uploadImageService = uploadImageService;
            this.$interval = $interval;
            this.handleStorage = handleStorage;
            this.$state = $state;
            this.$inject = ['$scope', '$rootScope', '$timeout', 'macCarCrashMockService', 'layer', 'analysisService', 'layerDec', 'userInfoCacheFactory', 'analysisMmapServer', 'macAnalysisMapService', 'resourceRetrievalService', 'uploadImageService', '$interval', 'handleStorage', '$state'];
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
            this.showResult = false;
            this.showForm = true;
            this.showAllResult = false;
            this.showAnalysisList = false;
            this.showAllAccompanyResult = false;
            this.isSortLetter = true;
            this.resultSort = true;
            this.sortLetter = ['A', 'B', 'C', 'D', 'E', 'F'];
            this.AccompanyingAnalysisParams = new AccompanyingAnalysisEnum_1.AccompanyingAnalysis();
            this.resultParams = new Pagination_1.PageParamsAndResult();
            this.accpResultParams = new Pagination_1.PageParamsAndResult();
            this.ResultPagination = new Pagination_1.Pagination();
            this.AccpPagination = new Pagination_1.Pagination();
            this.AccompOffLine = [];
            this.resultToSystemPoints = [];
            this.checkRightResult = [false];
            this.windowWidth = AnalysisEnum_1.getWidowSize().width;
            this.typeList = TypeList;
            this.currentType = { key: 'FaceToMac', text: '人脸碰MAC' };
            this.resultRightType = 'Mac';
            this.resultLeftType = 'Mac';
            this.queryPattern = AnalysisEnum_1.QueryPattern;
            this.selectFaceCtrl = "get-face-info-quick";
            this.analysisGoTo = AnalysisDataType_1.AnalysisGoToType;
            var self = this;
            self.initQueryParams();
            self.map = self.$scope.$parent.map;
            if (self.map) {
                self.initForMapLayer();
            }
            self.systemPointList = self.$scope.$parent.systemPoint;
            self.AccompanyingAnalysisParams = self.initParams();
            self.$timeout(function () {
                self.$scope.$emit('showItemPage', true);
            });
            self.$scope.$on('map.ready', function (event, map) {
                self.map = map;
                self.initForMapLayer();
            });
            self.$scope.$on('points.ready', function (event, points) {
                self.systemPointList = points;
            });
            self.$scope.$on('$destroy', function () {
                try {
                    self.analysisMmapServer.clearDraw();
                    self.destoryForMapMarker();
                    self.analysisMmapServer.getMap().renderMarkers(_this.systemPointList);
                }
                catch (e) {
                    console.error('触发直接销毁Map事件，导致map对象被销毁，轨迹触发自身的销毁事件中无法获取map对象导致的报错，可以忽略！', e);
                }
                $interval.cancel(self.setInterval);
            });
            self.$scope.$on(self.selectFaceCtrl, function (event, data) {
                self.$timeout(function () {
                    self.queryParams.imagePath = data.data.imageurl;
                    self.queryParams.taskId = data.data.key;
                });
            });
            self.setInterval = $interval(function () {
                self.getAccompOffLineList();
            }, 10000);
        }
        FaceMacCrashController.prototype.initQueryParams = function () {
            this.queryParams = {
                imagePath: "",
                taskId: "",
                taskName: "",
                deviceVal: "",
                startTime: this.FastDate.value.startTime,
                endTime: this.FastDate.value.endTime,
                followNum: 3,
                agofollowTime: 5,
                afterfollowTime: 5,
                threshold: 90,
                arrCameraId: [],
                maxAge: null,
                minAge: null,
                wearMask: [],
                sex: [],
                wearGlasses: [],
                queryMacType: "MAC"
            };
        };
        FaceMacCrashController.prototype.initParams = function () {
            var params = new AccompanyingAnalysisEnum_1.AccompanyingAnalysis();
            params.arrCameraId = [];
            params.imagePathList = [];
            params.arrEyeGlasses = [];
            params.arrMask = [];
            params.arrGender = [];
            params.startTime = "";
            params.endTime = "";
            return params;
        };
        FaceMacCrashController.prototype.initForMapLayer = function () {
            this.map.renderOverlayLayer(AnalysisEnum_1.OverlayName.MapForResultLayer);
            this.map.renderOverlayLayer(AnalysisEnum_1.OverlayName.MapForTrackLineLayer);
        };
        FaceMacCrashController.prototype.destoryForMapMarker = function () {
            this.analysisMmapServer.clearAccpMarkers();
        };
        FaceMacCrashController.prototype.setFastDate = function (item) {
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
            this.queryParams.startTime = time.startTime;
            this.queryParams.endTime = time.endTime;
        };
        FaceMacCrashController.prototype.selectType = function (item) {
            this.currentType = item;
        };
        FaceMacCrashController.prototype.selectAge = function (age) {
            if (typeof age !== 'string') {
                this.queryParams.maxAge = age.value.maxAge;
                this.queryParams.minAge = age.value.minAge;
            }
            else {
                this.queryParams.maxAge = null;
                this.queryParams.minAge = null;
            }
        };
        FaceMacCrashController.prototype.slideRightResult = function (i) {
            this.setCheckRightResult(this.accpResultParams.pageSize, i);
        };
        FaceMacCrashController.prototype.submitSearch = function () {
            var self = this;
            if (self.queryParams.taskName === "") {
                this.layer.msg('请输入任务名称');
                return false;
            }
            if (self.currentType.key === "MacToFace") {
                var macCrashParams = {
                    "afterfollowTime": self.queryParams.afterfollowTime || 5,
                    "agofollowTime": self.queryParams.agofollowTime || 5,
                    "endTime": self.queryParams.endTime,
                    "startTime": self.queryParams.startTime,
                    "followNum": self.queryParams.followNum || 3,
                    "TaskName": self.queryParams.taskName,
                    "threshold": self.queryParams.threshold,
                    "type": self.queryParams.queryMacType,
                    "value": self.queryParams.deviceVal
                };
                if (macCrashParams.endTime < macCrashParams.startTime) {
                    this.layerDec.warnInfo('开始时间不能晚于结束时间!');
                    return false;
                }
                self.analysisService.macToFace(macCrashParams).then(function (res) {
                    if (res.code === 200) {
                        self.showAnalysisList = true;
                        self.getAccompOffLineList();
                        self.ClearDraw();
                        self.initQueryParams();
                    }
                    else {
                        self.layer.msg('离线任务创建失败');
                    }
                });
            }
            else if (self.currentType.key === "FaceToMac") {
                self.MaskDate.value !== null ? self.queryParams.wearMask.push(self.MaskDate.value) : "";
                self.SexDate.value !== null ? self.queryParams.sex.push(self.SexDate.value) : "";
                self.GlassDate.value !== null ? self.queryParams.wearGlasses.push(self.GlassDate.value) : "";
                if (self.queryParams.taskId === "") {
                    this.layer.msg('请上传图片');
                    return false;
                }
                var faceCrashParams = {
                    "afterfollowTime": self.queryParams.afterfollowTime || 5,
                    "agofollowTime": self.queryParams.agofollowTime || 5,
                    "endTime": self.queryParams.endTime,
                    "startTime": self.queryParams.startTime,
                    "followNum": self.queryParams.followNum || 3,
                    "threshold": self.queryParams.threshold,
                    "taskId": self.queryParams.taskId,
                    "imagePath": self.queryParams.imagePath,
                    "taskName": self.queryParams.taskName,
                    "arrCameraId": self.queryParams.arrCameraId,
                    "wearMask": self.queryParams.wearMask,
                    "sex": self.queryParams.sex,
                    "wearGlasses": self.queryParams.wearGlasses
                };
                if (faceCrashParams.endTime < faceCrashParams.startTime) {
                    this.layerDec.warnInfo('开始时间不能晚于结束时间!');
                    return false;
                }
                self.analysisService.faceToMac(faceCrashParams).then(function (res) {
                    if (res.code === 200) {
                        self.showAnalysisList = true;
                        self.getAccompOffLineList();
                        self.ClearDraw();
                        self.initQueryParams();
                    }
                    else {
                        self.layer.msg('离线任务创建失败');
                    }
                });
            }
        };
        FaceMacCrashController.prototype.getAccompOffLineList = function () {
            var self = this;
            var params = {
                "id": self.userInfoCacheFactory.getCurrentUserId(),
                "taskTypeList": [AnalyseTaskOffLine_1.OfflineTaskType.SearchFacePerceiveCollision, AnalyseTaskOffLine_1.OfflineTaskType.SearchPerceiveFaceCollision]
            };
            self.analysisService.getOffLineList(params).then(function (res) {
                var List = [];
                if (res.code === 200 && Array.isArray(res.data)) {
                    for (var i = 0; i < res.data.length; i++) {
                        res.data[i].Ext = JSON.parse(res.data[i].Ext);
                        List.push(res.data[i]);
                    }
                }
                var AccompOffLineList = _.sortBy(List, function (item) {
                    return -(Date.parse(item.CreateTime));
                });
                self.AccompOffLine = AccompOffLineList;
            });
        };
        FaceMacCrashController.prototype.deleteAccompOffLine = function (item) {
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
        FaceMacCrashController.prototype.setCheckRightResult = function (size, traget, isFirst) {
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
            this.accpResultIndex = traget;
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
            _.forEach(self.accpResultParams.data[traget].PerceiveAccompanyLogs, function (value) {
                if (value.MacDeviceId) {
                    params.deviceIds.push(value.MacDeviceId);
                    params.ids.push(value.ID);
                    params.deviceType = ObjectType_1.ObjectType.Wifi.value;
                }
                else if (value.MobileDeviceId) {
                    params.deviceIds.push(value.MobileDeviceId);
                    params.ids.push(value.ID);
                    params.deviceType = ObjectType_1.ObjectType.ElectronicFence.value;
                }
            });
            self.resourceRetrievalService.getDeviceInfoPromise(params).then(function (res) {
                _.forEach(self.accpResultParams.data[traget].PerceiveAccompanyLogs, function (item, index) {
                    item.deviceInfo = res.data.deviceInfo[index];
                    item.collectStatus = res.data.collectStatus[index];
                });
                self.$timeout(function () {
                    self.renderAccpMarkers();
                });
            });
        };
        FaceMacCrashController.prototype.getSystemPointForParams = function (points) {
            var _this = this;
            var arr = [];
            points.forEach(function (item) {
                var CameraID = item.AccessLog.CameraID;
                var s = false;
                for (var index = 0; index < _this.systemPointList.length; index++) {
                    var point = _this.systemPointList[index];
                    if (CameraID === point.ObjectID) {
                        s = true;
                        arr.push({
                            Lat: point.Lat,
                            Lon: point.Lon,
                            ID: point.ID,
                            ObjectID: point.ObjectID,
                            resultID: item.AccessLog.ID
                        });
                    }
                }
                if (!s) {
                    arr.push(null);
                }
            });
            return arr;
        };
        FaceMacCrashController.prototype.getSystemPointByWifi = function (points) {
            var _this = this;
            var arr = [];
            points.forEach(function (item) {
                var CameraID = item.MobileDeviceId || item.MacDeviceId;
                var s = false;
                for (var index = 0; index < _this.systemPointList.length; index++) {
                    var point = _this.systemPointList[index];
                    if (CameraID === point.ObjectID) {
                        s = true;
                        arr.push({
                            Lat: point.Lat,
                            Lon: point.Lon,
                            ID: point.ID,
                            ObjectID: point.ObjectID,
                            resultID: item.ID
                        });
                    }
                }
                if (!s) {
                    arr.push(null);
                }
            });
            return arr;
        };
        FaceMacCrashController.prototype.setReultTrack = function () {
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
        FaceMacCrashController.prototype.setAccpTrack = function (i) {
            this.clearAccpMarkersInfo();
            if (!this.checkRightResult[i]) {
                this.slideRightResult(i);
            }
            var arr = this.getSystemPointByWifi(this.allAccpTrackResult);
            this.analysisMmapServer.setAccpTrackAnimation(this.allAccpTrackResult, arr, this.accpTrackResultForMap);
        };
        FaceMacCrashController.prototype.createMapPopup = function (point, data, type, location) {
            if (type === WinPopupType.Track) {
                return this.createTrackPopup(point, data, location);
            }
            if (type === WinPopupType.Marker) {
                return this.createMarkerPopup(point, data);
            }
        };
        FaceMacCrashController.prototype.createTrackPopup = function (point, data, location) {
            var _this = this;
            var dom;
            var size;
            if (location === 'Left') {
                if (this.resultLeftType === 'Face') {
                    dom = $(trackPopupHtml).get(0);
                    size = new NPMapLib.Geometry.Size(-82, -248);
                }
                else {
                    dom = $(macPopupHtml).get(0);
                    size = new NPMapLib.Geometry.Size(-82, -128);
                }
            }
            if (location === 'Right') {
                if (this.resultRightType === 'Face') {
                    dom = $(trackPopupHtml).get(0);
                    size = new NPMapLib.Geometry.Size(-87, -248);
                }
                else {
                    dom = $(macPopupHtml).get(0);
                    size = new NPMapLib.Geometry.Size(-87, -128);
                }
            }
            var WinInfo = this.analysisMmapServer.getMap().createInfoWindow(point.lon, point.lat, {
                iscommon: true,
                offset: size
            });
            var scope = this.$scope.$new();
            scope.traceData = data;
            dom = this.$compile(dom.outerHTML)(scope);
            this.$timeout(function () {
                _this.analysisMmapServer.getMap().openInfoWindow(WinInfo, dom[0], {
                    close: function () {
                        scope.$destroy();
                        _this.analysisMmapServer.getMap().closeInfoWindow(WinInfo);
                    }
                });
            });
            return WinInfo;
        };
        FaceMacCrashController.prototype.createMarkerPopup = function (point, data) {
            var _this = this;
            var Wininfo = this.analysisMmapServer.getMap().createInfoWindow(point.lon, point.lat, {
                iscommon: true,
                offset: new NPMapLib.Geometry.Size(-82, -248)
            });
            var scope = this.$scope.$new();
            scope.traceData = data;
            var dom = $(trackPopupHtml).get(0);
            dom = this.$compile(dom.outerHTML)(scope);
            this.$timeout(function () {
                _this.analysisMmapServer.getMap().openInfoWindow(Wininfo, dom[0], {
                    close: function () {
                        scope.$destroy();
                        _this.analysisMmapServer.getMap().closeInfoWindow(Wininfo);
                    }
                });
            });
            return Wininfo;
        };
        FaceMacCrashController.prototype.openDetailPopup = function (item, index, groupName) {
            console.log(item);
            var self = this;
            var objectType = "";
            var newItem = {};
            var newList = [];
            if (groupName === 'Face') {
                objectType = ObjectType_1.ObjectType.Camera.value;
                newItem = item;
            }
            if (groupName === 'Mac') {
                if (item.Mac) {
                    objectType = ObjectType_1.ObjectType.Wifi.value;
                    newItem.wifiLog = {};
                    newItem.wifiLog = item;
                }
                else if (item.IMEI) {
                    objectType = ObjectType_1.ObjectType.ElectronicFence.value;
                    newItem.eFenceLog = {};
                    newItem.eFenceLog = item;
                }
            }
            newList.push(newItem);
            var scope = self.$scope.$new();
            scope.rank = index;
            scope.allList = newList;
            scope.showFooter = true;
            scope.index = "";
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
        FaceMacCrashController.prototype.renderMakers = function (layerName, groupName, isClear, result, flag, lables, icon) {
            var _this = this;
            if (isClear) {
                this.map.removeOverlaysByName(layerName, groupName);
            }
            this.resultToSystemPoints = result;
            this.map.addOverlaysForMakers(layerName, groupName, result, {
                iconURL: icon || AnalysisEnum_1.MarkersIcon.NormalBlueIcon,
                click: function (marker) {
                    var data = marker.getData();
                    var result;
                    if (groupName === AnalysisEnum_1.OverlayName.MapForResultGroup) {
                        result = _this.trackResultForMap[data.resultID];
                    }
                    else {
                        result = _this.accpTrackResultForMap[data.resultID];
                    }
                    _this.openDetailPopup(result, result.resultIndex, groupName);
                },
                mouseOver: function (marker) {
                    var data = marker.getData();
                    var result;
                    if (groupName === AnalysisEnum_1.OverlayName.MapForResultGroup) {
                        result = _this.trackResultForMap[data.resultID];
                    }
                    else {
                        result = _this.accpTrackResultForMap[data.resultID];
                    }
                    _this.markerWininfo = _this.createMapPopup(marker.getPosition(), result, WinPopupType.Marker);
                },
                mouseOut: function () {
                    _this.map.getInfoWindowByID(_this.markerWininfo).close();
                }
            }, flag, lables);
        };
        FaceMacCrashController.prototype.resultToMap = function (item, index, type) {
            var id;
            if (type === "Mac") {
                id = item.ID;
            }
            if (type === "Mac") {
                this.macAnalysisMapService.resultToMap(id, type);
            }
            else {
                this.analysisMmapServer.resultToMap(item, type);
            }
        };
        FaceMacCrashController.prototype.unResultToMap = function (item, index, type) {
            var id;
            if (type === "Mac") {
                id = item.ID;
            }
            if (type === "Mac") {
                this.macAnalysisMapService.unResultToMap(id, type ? this.accpTrackResultForMap : this.trackResultForMap, type);
            }
            else {
                this.analysisMmapServer.unResultToMap(item, type ? this.accpTrackResultForMap : this.trackResultForMap, type);
            }
        };
        FaceMacCrashController.prototype.goBack = function () {
            var _this = this;
            this.ClearDraw();
            this.$timeout(function () {
                _this.$scope.$emit('showItemPage', false);
            });
        };
        FaceMacCrashController.prototype.goBackForm = function () {
            var _this = this;
            this.$timeout(function () {
                _this.showForm = true;
                _this.showResult = false;
                _this.showAnalysisList = false;
                _this.isSortLetter = true;
                _this.destoryForMapMarker();
                _this.analysisMmapServer.renderSystemPoint();
            });
        };
        FaceMacCrashController.prototype.goAllResult = function () {
            this.isSortLetter = true;
            this.showResult = false;
            this.showAllResult = true;
            this.resultParams.pageSize = 40;
            this.resultParams.currentPage = 1;
            this.resultParams = this.ResultPagination.getByPage(this.resultParams);
        };
        FaceMacCrashController.prototype.closeAllResult = function () {
            this.showResult = true;
            this.showAllResult = false;
            this.resultParams.currentPage = 1;
            this.resultParams.pageSize = 6;
            this.resultParams = this.ResultPagination.getByPage(this.resultParams);
            this.allTrackResult = this.resultParams.allData;
            var arr = this.analysisMmapServer.getSystemPointForParams(this.resultParams.data);
            this.analysisMmapServer.renderMakers(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForResultGroup, true, arr, this.trackResultForMap, this.isSortLetter, this.sortLetter);
        };
        FaceMacCrashController.prototype.goAccompanyAllResult = function () {
            this.showResult = false;
            this.showAllAccompanyResult = true;
            this.accpResultParams.pageSize = 40;
            this.accpResultParams.currentPage = 1;
            this.accpResultParams = this.AccpPagination.getByPage(this.accpResultParams);
            this.setCheckRightResult(this.accpResultParams.pageSize, 0, true);
        };
        FaceMacCrashController.prototype.closeAccompanyAllResult = function () {
            this.showResult = true;
            this.showAllAccompanyResult = false;
            this.accpResultParams.pageSize = 6;
            this.accpResultParams.currentPage = 1;
            this.accpResultParams = this.AccpPagination.getByPage(this.accpResultParams);
            this.setCheckRightResult(this.accpResultParams.pageSize, 0, true);
        };
        FaceMacCrashController.prototype.changeResultPage = function (i) {
            var self = this;
            self.resultParams.currentPage = i;
            self.resultParams = self.ResultPagination.getByPage(self.resultParams);
            self.allTrackResult = self.resultParams.allData;
            if (self.isSortLetter) {
                self.$timeout(function () {
                    self.setResultForMap(self.allTrackResult);
                    var arr = self.analysisMmapServer.getSystemPointForParams(self.resultParams.data);
                    self.analysisMmapServer.renderMakers(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForResultGroup, true, arr, self.trackResultForMap, self.isSortLetter, self.sortLetter);
                });
            }
        };
        FaceMacCrashController.prototype.changeAccpResultPage = function (i) {
            this.accpResultParams.currentPage = i;
            this.accpResultParams = this.AccpPagination.getByPage(this.accpResultParams);
            this.setCheckRightResult(this.resultParams.pageSize, 0);
        };
        FaceMacCrashController.prototype.setResultForMap = function (result) {
            var obj = {};
            result.forEach(function (item, i) {
                obj[item.AccessLog.ID] = item;
                obj[item.AccessLog.ID].resultIndex = i;
            });
            this.trackResultForMap = obj;
        };
        FaceMacCrashController.prototype.renderAccpMarkers = function () {
            var self = this;
            var accpArr = self.accpResultParams.data[self.accpResultIndex].PerceiveAccompanyLogs;
            var obj = {};
            accpArr.forEach(function (item, index) {
                obj[item.ID] = item;
                obj[item.ID].resultIndex = index;
            });
            self.accpTrackResultForMap = obj;
            self.allAccpTrackResult = accpArr;
            var resultList = self.getSystemPointByWifi(self.allAccpTrackResult);
            self.renderWifiMakers(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForAccpGroup, true, resultList, self.accpTrackResultForMap, false, null, AnalysisEnum_1.MarkersIcon.NormalGreenIcon);
        };
        FaceMacCrashController.prototype.showAnalysisResult = function (item) {
            var _this = this;
            var self = this;
            var params = {
                "analyseTaskType": AnalyseTaskOffLine_1.AnalyseTaskType.SearchAnalyseTaskResult,
                "taskId": item.TaskId,
                "TaskType": item.TaskType
            };
            self.initLoadingPop();
            self.analysisMmapServer.clearDraw();
            if (item.TaskType === "SearchFacePerceiveCollision") {
                self.analysisService.getOffLineDetail(params).then(function (res) {
                    if (res.code !== 200) {
                        self.layer.close(self.currentLayerIndex);
                        self.layerDec.warnInfo('查询结果失败');
                    }
                    else if (res.data && res.data.SearchAccessResults && (res.data.SearchAccessResults.length > 0)) {
                        var resultList_1 = _.sortBy(res.data.SearchAccessResults, function (item) {
                            return -item.Score;
                        });
                        var EFenceLogAccompanyEntities = res.data.EFenceLogAccompanyEntities || [];
                        var WiFiLogAccompanyEntitites = res.data.WiFiLogAccompanyEntitites || [];
                        var trackResultList_1 = _.concat(EFenceLogAccompanyEntities, WiFiLogAccompanyEntitites);
                        trackResultList_1 = _.sortBy(trackResultList_1, function (item) {
                            return -item.Num;
                        });
                        if (trackResultList_1.length > 0) {
                            var params_1 = {
                                deviceIds: [],
                                deviceType: '',
                                ids: [],
                                userId: self.userInfoCacheFactory.getCurrentUserId()
                            };
                            params_1.deviceType = ObjectType_1.ObjectType.Camera.value;
                            _.forEach(resultList_1, function (value) {
                                params_1.deviceIds.push(value.AccessLog.CameraID);
                                params_1.ids.push(value.AccessLog.ID);
                            });
                            self.resourceRetrievalService.getDeviceInfoPromise(params_1).then(function (res) {
                                _.forEach(resultList_1, function (item, index) {
                                    item.deviceInfo = res.data.deviceInfo[index];
                                    item.collectStatus = res.data.collectStatus[index];
                                });
                                self.analysisMmapServer.removeSystemPoint();
                                self.$timeout(function () {
                                    self.ResultPagination.set(resultList_1);
                                    self.AccpPagination.set(trackResultList_1);
                                }).then(function () {
                                    self.resultParams.pageSize = 6;
                                    self.resultParams.currentPage = 1;
                                    self.resultParams = self.ResultPagination.getByPage(self.resultParams);
                                    self.allTrackResult = self.resultParams.allData;
                                    self.setResultForMap(self.allTrackResult);
                                    self.accpResultParams.pageSize = 6;
                                    self.accpResultParams.currentPage = 1;
                                    self.accpResultParams = self.AccpPagination.getByPage(self.accpResultParams);
                                }).then(function () {
                                    self.showForm = false;
                                    self.showResult = true;
                                    self.resultLeftType = 'Face';
                                    self.resultRightType = 'Mac';
                                    var arr = self.analysisMmapServer.getSystemPointForParams(self.resultParams.data);
                                    self.analysisMmapServer.renderMakers(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForResultGroup, true, arr, self.trackResultForMap, self.isSortLetter, self.sortLetter);
                                    self.setCheckRightResult(self.accpResultParams.pageSize, 0, true);
                                }).then(function () {
                                    self.layer.close(self.currentLayerIndex);
                                });
                            });
                        }
                        else {
                            self.layer.close(self.currentLayerIndex);
                            self.layerDec.info('没有查询到结果');
                        }
                    }
                    else {
                        self.layer.close(self.currentLayerIndex);
                        self.layerDec.info('没有查询到结果');
                    }
                });
            }
            else {
                self.analysisService.getOffLineDetail(params).then(function (res) {
                    if (res.code === 200 && res.data) {
                        self.clearOtherInfo();
                        self.$timeout(function () {
                            var resultList = _.sortBy(res.data.PerceiveLogs, function (item) {
                                return -(Date.parse(item.AcqTime));
                            });
                            var trackResultList = _.sortBy(res.data.FaceAccompanyEntities, function (item) {
                                return -item.Num;
                            });
                            self.ResultPagination.set(resultList);
                            self.AccpPagination.set(trackResultList);
                        }).then(function () {
                            _this.resultParams.pageSize = 6;
                            _this.resultParams.currentPage = 1;
                            _this.resultParams = _this.ResultPagination.getByPage(_this.resultParams);
                            _this.allTrackResult = self.ResultPagination.get();
                            _this.accpResultParams.pageSize = 6;
                            _this.accpResultParams.currentPage = 1;
                            _this.accpResultParams = _this.AccpPagination.getByPage(_this.accpResultParams);
                            _this.setResultForMap(_this.allTrackResult);
                        }).then(function () {
                            _this.analysisMmapServer.removeSystemPoint();
                            _this.showForm = false;
                            _this.showResult = true;
                            _this.resultLeftType = 'Mac';
                            _this.resultRightType = 'Face';
                            var arr = _this.analysisMmapServer.getSystemPointForParams(_this.resultParams.data);
                            _this.analysisMmapServer.renderMakers(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForResultGroup, true, arr, _this.trackResultForMap, true, _this.sortLetter);
                        });
                    }
                });
            }
        };
        FaceMacCrashController.prototype.showAnalysisListFn = function (flag) {
            this.showAnalysisList = flag;
            if (flag) {
                this.getAccompOffLineList();
            }
        };
        FaceMacCrashController.prototype.selectCamera = function () {
            var scope = this.$scope.$new();
            scope.selectCameraList = this.AccompanyingAnalysisParams.arrCameraId;
            this.currentLayerIndex = this.layer.open({
                type: 1,
                content: popupHtml,
                scope: scope,
                title: "摄像机选择",
                area: ["710px", "620px"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        FaceMacCrashController.prototype.DrawRect = function () {
            var _this = this;
            this.ClearDraw();
            this.analysisMmapServer.drawRect(function (points) {
                _this.getCameraListForMap(points);
            });
        };
        FaceMacCrashController.prototype.DrawCircle = function () {
            var _this = this;
            this.ClearDraw();
            this.analysisMmapServer.drawCircle(function (points) {
                _this.getCameraListForMap(points);
            });
        };
        FaceMacCrashController.prototype.DrawPolygon = function () {
            var _this = this;
            this.ClearDraw();
            this.analysisMmapServer.drawPolygon(function (points) {
                _this.getCameraListForMap(points);
            });
        };
        FaceMacCrashController.prototype.ClearDraw = function () {
            this.AccompanyingAnalysisParams.arrCameraId = [];
            this.analysisMmapServer.clearDraw();
        };
        FaceMacCrashController.prototype.getCameraListForMap = function (points) {
            var _this = this;
            points.forEach(function (point) {
                if (point.ObjectType === 'camera') {
                    _this.AccompanyingAnalysisParams.arrCameraId.push(point.ObjectID);
                }
            });
            this.AccompanyingAnalysisParams.arrCameraId = AnalysisEnum_1.ArrayUnique(this.AccompanyingAnalysisParams.arrCameraId);
            this.selectCamera();
        };
        FaceMacCrashController.prototype.selectQueryType = function (sel) {
            this.queryParams.queryMacType = sel.value;
        };
        FaceMacCrashController.prototype.sortReult = function (type) {
            var self = this;
            self.isSortLetter = true;
            self.clearResultMarkersInfo();
            var allResultList = self.ResultPagination.get();
            if (type === "score") {
                self.resultSort = true;
                allResultList = _.sortBy(allResultList, function (item) {
                    return -item.Score;
                });
            }
            else if (type === "time") {
                self.resultSort = false;
                allResultList = _.sortBy(allResultList, function (item) {
                    return -(Date.parse(item.AccessLog.LogTime));
                });
            }
            self.ResultPagination.set(allResultList);
            if (self.showAllResult) {
                self.resultParams.pageSize = 40;
                self.resultParams.currentPage = 1;
                self.resultParams = self.ResultPagination.getByPage(self.resultParams);
                self.allTrackResult = self.resultParams.allData;
            }
            else {
                self.resultParams.pageSize = 6;
                self.resultParams.currentPage = 1;
                self.resultParams = self.ResultPagination.getByPage(self.resultParams);
                self.allTrackResult = self.resultParams.allData;
                self.setResultForMap(self.allTrackResult);
                var arr = self.analysisMmapServer.getSystemPointForParams(self.resultParams.data);
                self.analysisMmapServer.renderMakers(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForResultGroup, true, arr, self.trackResultForMap, self.isSortLetter, self.sortLetter);
            }
        };
        FaceMacCrashController.prototype.renderWifiMakers = function (layerName, groupName, isClear, result, resultForMap, flag, lables, icon) {
            var _this = this;
            if (isClear) {
                this.analysisMmapServer.getMap().removeOverlaysByName(layerName, groupName);
            }
            this.analysisMmapServer.getMap().addOverlaysForMakers(layerName, groupName, result, {
                click: function (marker) {
                    var data = marker.getData();
                    var result;
                    if (groupName === AnalysisEnum_1.OverlayName.MapForResultGroup) {
                        result = _this.trackResultForMap[data.resultID];
                    }
                    else {
                        result = _this.accpTrackResultForMap[data.resultID];
                    }
                    _this.openDetailPopup(result, result.resultIndex, groupName);
                },
                mouseOver: function (marker) {
                    var data = marker.getData();
                    var result;
                    if (groupName === AnalysisEnum_1.OverlayName.MapForResultGroup) {
                        result = _this.trackResultForMap[data.resultID];
                    }
                    else {
                        result = _this.accpTrackResultForMap[data.resultID];
                    }
                    _this.markerWininfo = _this.createMapPopup(marker.getPosition(), result, WinPopupType.Track, "Right");
                },
                mouseOut: function () {
                    _this.analysisMmapServer.getMap().getInfoWindowByID(_this.markerWininfo).close();
                },
                iconURL: icon
            }, flag, lables);
        };
        FaceMacCrashController.prototype.clearOtherInfo = function () {
            this.ClearDraw();
            this.analysisMmapServer.clearResultMarkers();
            this.analysisMmapServer.clearDraw();
            this.analysisMmapServer.clearTraceAnalyze();
            this.analysisMmapServer.clearTrackInfoWindow();
        };
        FaceMacCrashController.prototype.clearResultMarkersInfo = function () {
            this.analysisMmapServer.clearResultMarkers();
            this.analysisMmapServer.clearTraceAnalyze();
            this.analysisMmapServer.clearTrackInfoWindow();
        };
        FaceMacCrashController.prototype.clearAccpMarkersInfo = function () {
            this.analysisMmapServer.clearAccpMarkers();
            this.analysisMmapServer.clearTraceAnalyze();
            this.analysisMmapServer.clearAccpTrackInfoWindow();
        };
        FaceMacCrashController.prototype.clickCollect = function (event, item) {
            if (event) {
                event.stopPropagation();
            }
            var self = this;
            if (!item.collectStatus) {
                var params = void 0;
                var newItem = void 0;
                if (item.AccessLog) {
                    newItem = item;
                    params = {
                        json: angular.toJson(item),
                        objectID: item.AccessLog.ID,
                        objectType: "Face"
                    };
                }
                else if (item.Mac) {
                    newItem = {
                        wifiLog: item,
                        deviceInfo: item.deviceInfo
                    };
                    params = {
                        json: JSON.stringify(newItem),
                        objectID: item.ID,
                        objectType: "Face"
                    };
                }
                else if (item.IMEI) {
                    newItem = {
                        eFenceLog: item,
                        deviceInfo: item.deviceInfo
                    };
                    params = {
                        json: JSON.stringify(newItem),
                        objectID: item.ID,
                        objectType: "Face"
                    };
                }
                self.resourceRetrievalService.collectAddInfo(params)
                    .then(function (res) {
                    if (res) {
                    }
                });
            }
            else {
                var params = void 0;
                if (item.AccessLog) {
                    params = {
                        ids: item.AccessLog.ID
                    };
                }
                else if (item.Mac) {
                    params = {
                        ids: item.ID
                    };
                }
                else if (item.IMEI) {
                    params = {
                        ids: item.ID
                    };
                }
                self.resourceRetrievalService.collectDeleteInfo(params)
                    .then(function (res) {
                    if (res) {
                    }
                });
            }
            item.collectStatus = !item.collectStatus;
        };
        FaceMacCrashController.prototype.clickAnalysis = function (event, item, type) {
            if (event) {
                event.stopPropagation();
            }
            var storageParams = AnalysisDataType_1.AnalysisDataType.Face;
            storageParams.data = item;
            this.handleStorage.setSessionStorageData(storageParams.key, storageParams);
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
        FaceMacCrashController.prototype.clickSurveillance = function (event, item) {
            if (event) {
                event.stopPropagation();
            }
            item.surveillanceStatus = !item.surveillanceStatus;
        };
        FaceMacCrashController.prototype.initLoadingPop = function () {
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
        FaceMacCrashController.prototype.multiUserSelect = function (faceInfo, file) {
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
        FaceMacCrashController.prototype.faceDemarcate = function (faceInfo, file) {
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
        FaceMacCrashController.prototype.fullScreen = function (event, path) {
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
        FaceMacCrashController.prototype.deleteImage = function () {
            this.queryParams.imagePath = "";
            this.queryParams.taskId = "";
        };
        FaceMacCrashController.prototype.uploadImage = function (event) {
            var self = this;
            var from = new FormData();
            from.append('image', event.target.files[0]);
            var data = {
                storeType: "LOC",
                imageCategory: "CaptureImage",
                commandType: "SearchFacePerceiveCollision",
                detectType: "Face"
            };
            this.uploadImageService.uploadImageForFace(from, data).then(function (res) {
                if ((res.code === 200) && (res.data && res.data.key)) {
                    self.$timeout(function () {
                        self.queryParams.imagePath = res.data.imageurl;
                        self.queryParams.taskId = res.data.key;
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
        return FaceMacCrashController;
    }());
    main_app_1.app.controller('FaceMacCrashController', FaceMacCrashController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9GYWNlTWFjQ3Jhc2gvRmFjZU1hY0NyYXNoLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQXNGQTtRQUFBO1FBSUEsQ0FBQztRQUhVLGtCQUFLLEdBQVcsT0FBTyxDQUFDO1FBQ3hCLG1CQUFNLEdBQVcsUUFBUSxDQUFDO1FBQzFCLG1CQUFNLEdBQVcsUUFBUSxDQUFDO1FBQ3JDLG1CQUFDO0tBSkQsQUFJQyxJQUFBO0lBQ0Q7UUFBMEIsK0JBQU07UUFBaEM7O1FBRUEsQ0FBQztRQUFELGtCQUFDO0lBQUQsQ0FGQSxBQUVDLENBRnlCLGlDQUFNLEdBRS9CO0lBQ0QsSUFBTSxRQUFRLEdBQXlDO1FBQ25ELEVBQUMsR0FBRyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDO1FBQ25DLEVBQUMsR0FBRyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDO0tBQ3RDLENBQUM7SUFJRjtRQWtFSSxnQ0FBb0IsTUFBVyxFQUNYLFFBQWEsRUFDYixzQkFBK0MsRUFDL0MsS0FBVSxFQUNWLFFBQWEsRUFDYixlQUFpQyxFQUNqQyxRQUFtQixFQUNuQixvQkFBMkMsRUFDM0Msa0JBQXVDLEVBQ3ZDLHFCQUE2QyxFQUM3Qyx3QkFBbUQsRUFDbkQsa0JBQXVDLEVBQ3ZDLFNBQWEsRUFDYixhQUE2QixFQUM3QixNQUFXO1lBZC9CLGlCQTBEQztZQTFEbUIsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLGFBQVEsR0FBUixRQUFRLENBQUs7WUFDYiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXlCO1lBQy9DLFVBQUssR0FBTCxLQUFLLENBQUs7WUFDVixhQUFRLEdBQVIsUUFBUSxDQUFLO1lBQ2Isb0JBQWUsR0FBZixlQUFlLENBQWtCO1lBQ2pDLGFBQVEsR0FBUixRQUFRLENBQVc7WUFDbkIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUF1QjtZQUMzQyx1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LENBQUM7d0JBQ0YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUN6QyxDQUFDLENBQUE7Z0JBQ0wsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2hELElBQUksT0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7b0JBQ3hCLE9BQUssQ0FBQyxHQUFHLEdBQUcseUJBQXlCLEdBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7b0JBQ3JELE9BQUssQ0FBQyxNQUFNLEdBQUc7d0JBQ1gsSUFBSSxJQUFJLEdBQUc7NEJBQ1AsT0FBTyxFQUFFO2dDQUNMLE9BQU8sRUFBRSxPQUFLLENBQUMsS0FBSztnQ0FDcEIsUUFBUSxFQUFFLE9BQUssQ0FBQyxNQUFNOzZCQUN6Qjt5QkFDSixDQUFDO3dCQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDdkMsQ0FBQyxDQUFBO2dCQUNMLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3JDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFDTCw2QkFBQztJQUFELENBbDJDQSxBQWsyQ0MsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsd0JBQXdCLEVBQUUsc0JBQXNCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9GYWNlTWFjQ3Jhc2gvRmFjZU1hY0NyYXNoLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uL0FuYWx5c2lzLmNhbWVyYS5wb3B1cC5odG1sXCIgbmFtZT1cInBvcHVwSHRtbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vVHJhY2tQb3B1cC90cmFjay5wb3B1cC5odG1sXCIgbmFtZT1cInRyYWNrUG9wdXBIdG1sXCIgLz5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi9NYWNUcmFja1BvcHVwL21hYy5wb3B1cC5odG1sXCIgbmFtZT1cIm1hY1BvcHVwSHRtbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vVHJhY2tQb3B1cERldGFpbC90cmFjay5wb3B1cC5kZXRhaWwuaHRtbFwiIG5hbWU9XCJkZXRhaWxQb3B1cEh0bWxcIiAvPlxyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uL01hY1RyYWNrUG9wdXBEZXRhaWwvbWFjLnBvcHVwLmRldGFpbC5odG1sXCIgbmFtZT1cImRldGFpbE1hY1BvcHVwSHRtbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vbG9hZGluZy9sb2FkaW5nLmh0bWxcIiBuYW1lPVwibG9hZGluZ0FuYWx5c2lzSHRtbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vLi4vY29tbW9uL2ZhY2VIYW5kbGVQb3B1cC9zZWxlY3RGYWNlLnBvcHVwLmh0bWxcIiBuYW1lPVwic2VsZWN0RmFjZVBvcHVwSHRtbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vLi4vY29tbW9uL2ZhY2VIYW5kbGVQb3B1cC9kZW1hcmNhdGUucG9wdXAuaHRtbFwiIG5hbWU9XCJkZW1hcmNhdGVQb3B1cEh0bWxcIiAvPlxyXG5pbXBvcnQgXCIuLi9BbmFseXNpcy5jYW1lcmEucG9wdXBcIlxyXG5pbXBvcnQgXCIuLi9UcmFja1BvcHVwL3RyYWNrLnBvcHVwLmNvbnRyb2xsZXJcIlxyXG5pbXBvcnQgXCIuLi9NYWNUcmFja1BvcHVwL21hYy5wb3B1cC5jb250cm9sbGVyXCJcclxuaW1wb3J0IFwiLi4vVHJhY2tQb3B1cERldGFpbC90cmFjay5wb3B1cC5kZXRhaWwuY29udHJvbGxlclwiXHJcbmltcG9ydCBcIi4uL01hY1RyYWNrUG9wdXBEZXRhaWwvbWFjLnBvcHVwLmRldGFpbC5jb250cm9sbGVyXCJcclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAnY3NzIS4uL3N0eWxlL0ZhY2VNYWNDcmFzaC5jc3MnO1xyXG5pbXBvcnQge05QR2lzTWFwTWFpbn0gZnJvbSAnLi4vLi4vY29tbW9uL21hcC9tYXAubWFpbic7XHJcbmltcG9ydCB7U3lzdGVtUG9pbnR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9TeXN0ZW1Qb2ludFwiO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIEFjY29tcGFueWluZ0FuYWx5c2lzLFxyXG4gICAgQWNjb21wYW55aW5nQW5hbHlzaXNSZXN1bHQsXHJcbiAgICBSZXN1bHQsXHJcbiAgICB3aWZpUmVzdWx0XHJcbn0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvQWNjb21wYW55aW5nQW5hbHlzaXNFbnVtJ1xyXG5cclxuaW1wb3J0IHtJTWFjQ2FyQ3Jhc2hNb2NrU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9tYWNDYXJDcmFzaE1vY2suc2VydmljZVwiO1xyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vc2VydmljZXMvbWFjQ2FyQ3Jhc2hNb2NrLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7UmVzcG9uc2VSZXN1bHR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHtUcmFjZUFuYWx5emVPcHRzLCBQb2x5bGluZVN0eWxlfSBmcm9tIFwiLi4vLi4vY29tbW9uL21hcC9tYXAuaW50ZXJmYWNlXCI7XHJcblxyXG4vLyDmnI3liqFcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FuYWx5c2lzLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtJQW5hbHlzaXNTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FuYWx5c2lzLnNlcnZpY2VcIjtcclxuaW1wb3J0ICcuLi8uLi9jb21tb24vc2VydmljZXMvcmVzb3VyY2VSZXRyaWV2YWwuc2VydmljZSc7XHJcbmltcG9ydCB7SVJlc291cmNlUmV0cmlldmFsU2VydmljZX0gZnJvbSAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL3Jlc291cmNlUmV0cmlldmFsLnNlcnZpY2UnO1xyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vZmFjdG9yeS91c2VyaW5mby5jYWNoZS5mYWN0b3J5XCI7XHJcbmltcG9ydCB7SVVzZXJJbmZvQ2FjaGVGYWN0b3J5fSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZhY3RvcnkvdXNlcmluZm8uY2FjaGUuZmFjdG9yeVwiO1xyXG5pbXBvcnQge0lMYXllckRlY30gZnJvbSBcIi4uLy4uL2NvbW1vbi9mYWN0b3J5L2xheWVyTXNnLmZhY3RvcnlcIjtcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL2ZhY3RvcnkvbGF5ZXJNc2cuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCIuLi9tYWluL2FuYWx5c2lzTW1hcC5zZXJ2ZXJcIjtcclxuaW1wb3J0IHtJQW5hbHlzaXNNbWFwU2VydmVyfSBmcm9tIFwiLi4vbWFpbi9hbmFseXNpc01tYXAuc2VydmVyXCI7XHJcbmltcG9ydCBcIi4uL21haW4vbWFjQW5hbHlzaXNNYXAuc2VydmljZVwiO1xyXG5pbXBvcnQge0lNYWNBbmFseXNpc01hcFNlcnZpY2V9IGZyb20gXCIuLi9tYWluL21hY0FuYWx5c2lzTWFwLnNlcnZpY2VcIjtcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL3VwbG9hZEltYWdlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtJVXBsb2FkSW1hZ2VTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL3VwbG9hZEltYWdlLnNlcnZpY2VcIjtcclxuaW1wb3J0ICcuLi8uLi9jb21tb24vZmFjdG9yeS9IYW5kbGVTdG9yYWdlLmZhY3RvcnknO1xyXG5pbXBvcnQge0lIYW5kbGVTdG9yYWdlfSBmcm9tICcuLi8uLi9jb21tb24vZmFjdG9yeS9IYW5kbGVTdG9yYWdlLmZhY3RvcnknO1xyXG5cclxuaW1wb3J0IHtJbnRlbGlnZW50VGFza0luZm99IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L0ludGVsaWdlbnRUYXNrSW5mbyc7XHJcbmltcG9ydCB7U3lzdGVtQ29uZmlnUGFyYW1zfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvU3lzdGVtQ29uZmlnUGFyYW1zXCI7XHJcbmltcG9ydCB7XHJcbiAgICBNYXJrZXJzSWNvbixcclxuICAgIFRyYWNrQ29uZmlnLFxyXG4gICAgT3ZlcmxheU5hbWUsXHJcbiAgICBBZ2UsXHJcbiAgICBFbnVtLFxyXG4gICAgVGltZUxlbmd0aCxcclxuICAgIGdldEdsYXNzZXNEYXRhTGlzdCxcclxuICAgIGdldE1hc2tEYXRhTGlzdCxcclxuICAgIEdsYXNzZXNEYXRhLFxyXG4gICAgZ2V0QWdlTGlzdCxcclxuICAgIE1hc2tEYXRhLFxyXG4gICAgZ2V0U2V4RGF0YUxpc3QsXHJcbiAgICBnZXRXaWRvd1NpemUsXHJcbiAgICBTZXhEYXRhLFxyXG4gICAgQ2FwdHVyZSxcclxuICAgIE1vY2tDYXB0dXJlTGlzdCxcclxuICAgIEFycmF5VW5pcXVlLFxyXG4gICAgZGF0YSxcclxuICAgIHRpbWVMZW5ndGgsXHJcbiAgICBnZXRkYXRhTGlzdCxcclxuICAgIGdldEhvdXJzLFxyXG4gICAgZGF0YUxpc3RzLFxyXG4gICAgUXVlcnlQYXR0ZXJuXHJcbn0gZnJvbSAnLi4vQW5hbHlzaXNFbnVtJztcclxuXHJcbi8vIOWIhumhteaWueazlVxyXG5pbXBvcnQge1BhZ2VQYXJhbXNBbmRSZXN1bHQsIFBhZ2luYXRpb24sIElQYWdpbmF0aW9ufSBmcm9tICcuLi8uLi9jb21tb24vUGFnaW5hdGlvbidcclxuLy8g5Lu75Yqh57G75Z6L5Y+C5pWwXHJcbmltcG9ydCB7QW5hbHlzZVRhc2tUeXBlLCBPZmZsaW5lVGFza1R5cGV9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL0FuYWx5c2VUYXNrT2ZmTGluZVwiO1xyXG5pbXBvcnQge09iamVjdFR5cGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW51bS9PYmplY3RUeXBlJztcclxuaW1wb3J0IHtDb2xsZWN0RGF0YVR5cGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vQ29sbGVjdERhdGFUeXBlJztcclxuaW1wb3J0IHtBbmFseXNpc0RhdGFUeXBlLCBBbmFseXNpc1N0b3JhZ2VQYXJhbXMsIEFuYWx5c2lzR29Ub1R5cGV9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL0FuYWx5c2lzRGF0YVR5cGVcIjtcclxuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XHJcblxyXG5jbGFzcyBXaW5Qb3B1cFR5cGUge1xyXG4gICAgc3RhdGljIFRyYWNrOiBzdHJpbmcgPSAnVHJhY2snO1xyXG4gICAgc3RhdGljIE1hcmtlcjogc3RyaW5nID0gJ01hcmtlcic7XHJcbiAgICBzdGF0aWMgRGV0YWlsOiBzdHJpbmcgPSAnRGV0YWlsJztcclxufVxyXG5jbGFzcyBDYWNoZVJlc3VsdCBleHRlbmRzIFJlc3VsdCB7XHJcbiAgICByZXN1bHRJbmRleDogbnVtYmVyO1xyXG59XHJcbmNvbnN0IFR5cGVMaXN0OiBBcnJheTx7IGtleTogc3RyaW5nLCB0ZXh0OiBzdHJpbmcgfT4gPSBbXHJcbiAgICB7a2V5OiAnRmFjZVRvTWFjJywgdGV4dDogJ+S6uuiEuOeisOaEn+efpeaVsOaNrid9LFxyXG4gICAge2tleTogJ01hY1RvRmFjZScsIHRleHQ6ICfmhJ/nn6XmlbDmja7norDkurrohLgnfVxyXG5dO1xyXG5kZWNsYXJlIGxldCBwb3B1cEh0bWw6IGFueSwgYW5ndWxhcjogYW55LCB0cmFja1BvcHVwSHRtbDogYW55LCAkOiBhbnksIGRldGFpbFBvcHVwSHRtbDogYW55LCBtYWNQb3B1cEh0bWw6IGFueSwgZGV0YWlsTWFjUG9wdXBIdG1sOiBhbnksIGxvYWRpbmdBbmFseXNpc0h0bWw6IGFueSwgc2VsZWN0RmFjZVBvcHVwSHRtbDogYW55LCBkZW1hcmNhdGVQb3B1cEh0bWw6IGFueTtcclxuXHJcblxyXG5jbGFzcyBGYWNlTWFjQ3Jhc2hDb250cm9sbGVyIHtcclxuICAgICRpbmplY3Q6IEFycmF5PHN0cmluZz4gPSBbJyRzY29wZScsICckcm9vdFNjb3BlJywgJyR0aW1lb3V0JywgJ21hY0NhckNyYXNoTW9ja1NlcnZpY2UnLCAnbGF5ZXInLCAnYW5hbHlzaXNTZXJ2aWNlJywgJ2xheWVyRGVjJywgJ3VzZXJJbmZvQ2FjaGVGYWN0b3J5JywgJ2FuYWx5c2lzTW1hcFNlcnZlcicsICdtYWNBbmFseXNpc01hcFNlcnZpY2UnLCAncmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlJywgJ3VwbG9hZEltYWdlU2VydmljZScsICckaW50ZXJ2YWwnLCAnaGFuZGxlU3RvcmFnZScsICckc3RhdGUnXTtcclxuXHJcbiAgICBtYXA6IE5QR2lzTWFwTWFpbjtcclxuICAgIHN5c3RlbVBvaW50TGlzdDogQXJyYXk8U3lzdGVtUG9pbnQ+O1xyXG5cclxuICAgIEZhc3REYXRlTGlzdDogQXJyYXk8ZGF0YTx0aW1lTGVuZ3RoPj4gPSBnZXRkYXRhTGlzdCgpOy8vIOS4gOWkqeaXtumXtOetm+mAiVxyXG4gICAgRmFzdERhdGU6IGRhdGE8dGltZUxlbmd0aD4gPSBkYXRhTGlzdHMudG9kYXk7XHJcbiAgICBTZXhEYXRlTGlzdDogQXJyYXk8RW51bTxudW1iZXI+PiA9IGdldFNleERhdGFMaXN0KCk7XHJcbiAgICBHbGFzc0RhdGVMaXN0OiBBcnJheTxFbnVtPG51bWJlcj4+ID0gZ2V0R2xhc3Nlc0RhdGFMaXN0KCk7XHJcbiAgICBBZ2VEYXRhTGlzdDogQXJyYXk8RW51bTxBZ2U+PiA9IGdldEFnZUxpc3QoKTtcclxuICAgIE1hc2tEYXRlTGlzdDogQXJyYXk8RW51bTxudW1iZXI+PiA9IGdldE1hc2tEYXRhTGlzdCgpO1xyXG4gICAgU2V4RGF0ZTogRW51bTxudW1iZXI+ID0gU2V4RGF0YS5hbGw7XHJcbiAgICBHbGFzc0RhdGU6IEVudW08bnVtYmVyPiA9IEdsYXNzZXNEYXRhLmFsbDtcclxuICAgIE1hc2tEYXRlOiBFbnVtPG51bWJlcj4gPSBNYXNrRGF0YS5hbGw7XHJcbiAgICBzaW1pbGFyaXR5TWF4OiBudW1iZXIgPSAxMDA7XHJcbiAgICBzaW1pbGFyaXR5TWluOiBudW1iZXIgPSA4MDtcclxuXHJcbiAgICBzaG93UmVzdWx0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBzaG93Rm9ybTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBzaG93QWxsUmVzdWx0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBzaG93QW5hbHlzaXNMaXN0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBzaG93QWxsQWNjb21wYW55UmVzdWx0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBpc1NvcnRMZXR0ZXI6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcmVzdWx0U29ydDogYm9vbGVhbiA9IHRydWU7IC8vIOaOkuW6j+aWueW8j1xyXG4gICAgc29ydExldHRlcjogQXJyYXk8c3RyaW5nPiA9IFsnQScsICdCJywgJ0MnLCAnRCcsICdFJywgJ0YnXTtcclxuXHJcbiAgICBBY2NvbXBhbnlpbmdBbmFseXNpc1BhcmFtczogQWNjb21wYW55aW5nQW5hbHlzaXMgPSBuZXcgQWNjb21wYW55aW5nQW5hbHlzaXMoKTsvLyDliJvlu7rnprvnur/ku7vliqHlj4LmlbBcclxuXHJcbiAgICByZXN1bHRQYXJhbXM6IFBhZ2VQYXJhbXNBbmRSZXN1bHQgPSBuZXcgUGFnZVBhcmFtc0FuZFJlc3VsdCgpO1xyXG4gICAgYWNjcFJlc3VsdFBhcmFtczogUGFnZVBhcmFtc0FuZFJlc3VsdCA9IG5ldyBQYWdlUGFyYW1zQW5kUmVzdWx0KCk7XHJcbiAgICBSZXN1bHRQYWdpbmF0aW9uOiBJUGFnaW5hdGlvbiA9IG5ldyBQYWdpbmF0aW9uKCk7XHJcbiAgICBBY2NwUGFnaW5hdGlvbjogSVBhZ2luYXRpb24gPSBuZXcgUGFnaW5hdGlvbigpO1xyXG4gICAgYWxsVHJhY2tSZXN1bHQ6IEFycmF5PFJlc3VsdD47XHJcbiAgICBhbGxBY2NwVHJhY2tSZXN1bHQ6IEFycmF5PFJlc3VsdD47XHJcbiAgICB0cmFja1Jlc3VsdEZvck1hcDogeyBba2V5OiBzdHJpbmddOiBSZXN1bHQgfCBDYWNoZVJlc3VsdCB9O1xyXG4gICAgYWNjcFRyYWNrUmVzdWx0Rm9yTWFwOiB7IFtrZXk6IHN0cmluZ106IFJlc3VsdCB8IENhY2hlUmVzdWx0IH07XHJcbiAgICBhY2NwUmVzdWx0SW5kZXg6IG51bWJlcjtcclxuXHJcbiAgICBBY2NvbXBPZmZMaW5lOiBBcnJheTxhbnk+ID0gW107XHJcbiAgICByZXN1bHRUb1N5c3RlbVBvaW50czogQXJyYXk8U3lzdGVtUG9pbnQ+ID0gW107XHJcblxyXG4gICAgY2hlY2tSaWdodFJlc3VsdDogQXJyYXk8Ym9vbGVhbj4gPSBbZmFsc2VdO1xyXG4gICAgd2luZG93V2lkdGg6IG51bWJlciA9IGdldFdpZG93U2l6ZSgpLndpZHRoO1xyXG5cclxuICAgIHJlc3VsdE1hcmtlcnM6IEFycmF5PE5QTWFwTGliLlN5bWJvbHMuTWFya2VyPjtcclxuICAgIGFjY29tcEltYWdlUGF0aDogc3RyaW5nO1xyXG4gICAgbWFwVHJhY2tJRDogc3RyaW5nO1xyXG4gICAgbWFwQWNjcFRyYWNrSUQ6IHN0cmluZztcclxuICAgIHRyYWNrV2luSW5mbzogc3RyaW5nO1xyXG4gICAgYWNjcFRyYWNrV2luSW5mbzogc3RyaW5nO1xyXG5cclxuICAgIG1hcmtlcldpbmluZm86IHN0cmluZztcclxuICAgIGN1cnJlbnRMYXllckluZGV4OiBudW1iZXI7XHJcblxyXG4gICAgdHlwZUxpc3Q6IEFycmF5PHsga2V5OiBzdHJpbmcsIHRleHQ6IHN0cmluZyB9PiA9IFR5cGVMaXN0O1xyXG4gICAgY3VycmVudFR5cGU6IHsga2V5OiBzdHJpbmcsIHRleHQ6IHN0cmluZyB9ID0ge2tleTogJ0ZhY2VUb01hYycsIHRleHQ6ICfkurrohLjnorBNQUMnfTtcclxuICAgIHJlc3VsdFJpZ2h0VHlwZTogc3RyaW5nID0gJ01hYyc7XHJcbiAgICByZXN1bHRMZWZ0VHlwZTogc3RyaW5nID0gJ01hYyc7XHJcblxyXG4gICAgcXVlcnlQYXJhbXM6IGFueTtcclxuICAgIHF1ZXJ5UGF0dGVybjogQXJyYXk8YW55PiA9IFF1ZXJ5UGF0dGVybjsgLy8g5p+l6K+i57G75Z6LXHJcbiAgICBzZWxlY3RGYWNlQ3RybDogc3RyaW5nID0gXCJnZXQtZmFjZS1pbmZvLXF1aWNrXCI7XHJcbiAgICBzZXRJbnRlcnZhbDphbnk7XHJcbiAgICBhbmFseXNpc0dvVG8gPSBBbmFseXNpc0dvVG9UeXBlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIG1hY0NhckNyYXNoTW9ja1NlcnZpY2U6IElNYWNDYXJDcmFzaE1vY2tTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBsYXllcjogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSAkY29tcGlsZTogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBhbmFseXNpc1NlcnZpY2U6IElBbmFseXNpc1NlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGxheWVyRGVjOiBJTGF5ZXJEZWMsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHVzZXJJbmZvQ2FjaGVGYWN0b3J5OiBJVXNlckluZm9DYWNoZUZhY3RvcnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGFuYWx5c2lzTW1hcFNlcnZlcjogSUFuYWx5c2lzTW1hcFNlcnZlcixcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbWFjQW5hbHlzaXNNYXBTZXJ2aWNlOiBJTWFjQW5hbHlzaXNNYXBTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZXNvdXJjZVJldHJpZXZhbFNlcnZpY2U6IElSZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHVwbG9hZEltYWdlU2VydmljZTogSVVwbG9hZEltYWdlU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgJGludGVydmFsOmFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgaGFuZGxlU3RvcmFnZTogSUhhbmRsZVN0b3JhZ2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICRzdGF0ZTogYW55KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYuaW5pdFF1ZXJ5UGFyYW1zKCk7XHJcblxyXG4gICAgICAgIHNlbGYubWFwID0gc2VsZi4kc2NvcGUuJHBhcmVudC5tYXA7XHJcbiAgICAgICAgaWYgKHNlbGYubWFwKSB7XHJcbiAgICAgICAgICAgIHNlbGYuaW5pdEZvck1hcExheWVyKClcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5zeXN0ZW1Qb2ludExpc3QgPSBzZWxmLiRzY29wZS4kcGFyZW50LnN5c3RlbVBvaW50O1xyXG4gICAgICAgIHNlbGYuQWNjb21wYW55aW5nQW5hbHlzaXNQYXJhbXMgPSBzZWxmLmluaXRQYXJhbXMoKTtcclxuICAgICAgICBzZWxmLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGVtaXQoJ3Nob3dJdGVtUGFnZScsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNlbGYuJHNjb3BlLiRvbignbWFwLnJlYWR5JywgKGV2ZW50OiBhbnksIG1hcDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYubWFwID0gbWFwO1xyXG4gICAgICAgICAgICBzZWxmLmluaXRGb3JNYXBMYXllcigpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2VsZi4kc2NvcGUuJG9uKCdwb2ludHMucmVhZHknLCAoZXZlbnQ6IGFueSwgcG9pbnRzOiBBcnJheTxTeXN0ZW1Qb2ludD4pID0+IHtcclxuICAgICAgICAgICAgc2VsZi5zeXN0ZW1Qb2ludExpc3QgPSBwb2ludHM7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2VsZi4kc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHNlbGYuYW5hbHlzaXNNbWFwU2VydmVyLmNsZWFyRHJhdygpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kZXN0b3J5Rm9yTWFwTWFya2VyKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmFuYWx5c2lzTW1hcFNlcnZlci5nZXRNYXAoKS5yZW5kZXJNYXJrZXJzKHRoaXMuc3lzdGVtUG9pbnRMaXN0KTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign6Kem5Y+R55u05o6l6ZSA5q+BTWFw5LqL5Lu277yM5a+86Ie0bWFw5a+56LGh6KKr6ZSA5q+B77yM6L2o6L+56Kem5Y+R6Ieq6Lqr55qE6ZSA5q+B5LqL5Lu25Lit5peg5rOV6I635Y+WbWFw5a+56LGh5a+86Ie055qE5oql6ZSZ77yM5Y+v5Lul5b+955Wl77yBJywgZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJGludGVydmFsLmNhbmNlbChzZWxmLnNldEludGVydmFsKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIC8vIOebkeWQrOS6uuiEuOmAieaLqeS6i+S7tlxyXG4gICAgICAgIHNlbGYuJHNjb3BlLiRvbihzZWxmLnNlbGVjdEZhY2VDdHJsLCBmdW5jdGlvbiAoZXZlbnQ6IGFueSwgZGF0YTogYW55KSB7XHJcbiAgICAgICAgICAgIHNlbGYuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5xdWVyeVBhcmFtcy5pbWFnZVBhdGggPSBkYXRhLmRhdGEuaW1hZ2V1cmw7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnF1ZXJ5UGFyYW1zLnRhc2tJZCA9IGRhdGEuZGF0YS5rZXk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIOWumuaXtuivt+axguemu+e6v+S7u+WKoVxyXG4gICAgICAgIHNlbGYuc2V0SW50ZXJ2YWwgID0gJGludGVydmFsKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNlbGYuZ2V0QWNjb21wT2ZmTGluZUxpc3QoKTtcclxuICAgICAgICB9LCAxMDAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Yid5aeL5YyW5p+l6K+i5Y+C5pWwXHJcbiAgICBwcml2YXRlIGluaXRRdWVyeVBhcmFtcygpIHtcclxuICAgICAgICB0aGlzLnF1ZXJ5UGFyYW1zID0ge1xyXG4gICAgICAgICAgICBpbWFnZVBhdGg6IFwiXCIsXHJcbiAgICAgICAgICAgIHRhc2tJZDogXCJcIixcclxuICAgICAgICAgICAgdGFza05hbWU6IFwiXCIsXHJcbiAgICAgICAgICAgIGRldmljZVZhbDogXCJcIixcclxuICAgICAgICAgICAgc3RhcnRUaW1lOiB0aGlzLkZhc3REYXRlLnZhbHVlLnN0YXJ0VGltZSxcclxuICAgICAgICAgICAgZW5kVGltZTogdGhpcy5GYXN0RGF0ZS52YWx1ZS5lbmRUaW1lLFxyXG4gICAgICAgICAgICBmb2xsb3dOdW06IDMsXHJcbiAgICAgICAgICAgIGFnb2ZvbGxvd1RpbWU6IDUsXHJcbiAgICAgICAgICAgIGFmdGVyZm9sbG93VGltZTogNSxcclxuICAgICAgICAgICAgdGhyZXNob2xkOiA5MCxcclxuICAgICAgICAgICAgYXJyQ2FtZXJhSWQ6IFtdLFxyXG4gICAgICAgICAgICBtYXhBZ2U6IG51bGwsXHJcbiAgICAgICAgICAgIG1pbkFnZTogbnVsbCxcclxuICAgICAgICAgICAgd2Vhck1hc2s6IFtdLFxyXG4gICAgICAgICAgICBzZXg6IFtdLFxyXG4gICAgICAgICAgICB3ZWFyR2xhc3NlczogW10sXHJcbiAgICAgICAgICAgIHF1ZXJ5TWFjVHlwZTogXCJNQUNcIlxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0UGFyYW1zKCk6IEFjY29tcGFueWluZ0FuYWx5c2lzIHtcclxuICAgICAgICBsZXQgcGFyYW1zID0gbmV3IEFjY29tcGFueWluZ0FuYWx5c2lzKCk7XHJcbiAgICAgICAgcGFyYW1zLmFyckNhbWVyYUlkID0gW107XHJcbiAgICAgICAgcGFyYW1zLmltYWdlUGF0aExpc3QgPSBbXTtcclxuICAgICAgICBwYXJhbXMuYXJyRXllR2xhc3NlcyA9IFtdO1xyXG4gICAgICAgIHBhcmFtcy5hcnJNYXNrID0gW107XHJcbiAgICAgICAgcGFyYW1zLmFyckdlbmRlciA9IFtdO1xyXG4gICAgICAgIHBhcmFtcy5zdGFydFRpbWUgPSBcIlwiXHJcbiAgICAgICAgcGFyYW1zLmVuZFRpbWUgPSBcIlwiO1xyXG4gICAgICAgIHJldHVybiBwYXJhbXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0Rm9yTWFwTGF5ZXIoKSB7XHJcbiAgICAgICAgdGhpcy5tYXAucmVuZGVyT3ZlcmxheUxheWVyKE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdExheWVyKTtcclxuICAgICAgICB0aGlzLm1hcC5yZW5kZXJPdmVybGF5TGF5ZXIoT3ZlcmxheU5hbWUuTWFwRm9yVHJhY2tMaW5lTGF5ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOa4hemZpOWcsOWbvueCueS9jeS7peWkluS/oeaBr1xyXG4gICAgcHJpdmF0ZSBkZXN0b3J5Rm9yTWFwTWFya2VyKCkge1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmNsZWFyQWNjcE1hcmtlcnMoKTtcclxuICAgICAgICAvLyB0aGlzLm1hcC5yZW1vdmVPdmVybGF5c0J5TmFtZShPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRMYXllciwgT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0R3JvdXApO1xyXG4gICAgICAgIC8vIHRoaXMubWFwLnJlbW92ZU92ZXJsYXlzQnlOYW1lKE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdExheWVyLCBPdmVybGF5TmFtZS5NYXBGb3JBY2NwR3JvdXApO1xyXG4gICAgICAgIC8vIHRoaXMubWFwLnJlbW92ZU92ZXJsYXlzQnlOYW1lKE92ZXJsYXlOYW1lLk1hcEZvclRyYWNrTGluZUxheWVyLCBPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRMaW5lR3JvdXApO1xyXG4gICAgICAgIC8vIHRoaXMubWFwLnJlbW92ZU92ZXJsYXlzQnlOYW1lKE92ZXJsYXlOYW1lLk1hcEZvclRyYWNrTGluZUxheWVyLCBPdmVybGF5TmFtZS5NYXBGb3JBY2NwTGluZUdyb3VwKTtcclxuICAgICAgICAvLyBpZiAodGhpcy5tYXBUcmFja0lEKSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubWFwLmNsZWFyVHJhY2VBbmFseXplKHRoaXMubWFwVHJhY2tJRCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGlmICh0aGlzLm1hcEFjY3BUcmFja0lEKSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubWFwLmNsZWFyVHJhY2VBbmFseXplKHRoaXMubWFwQWNjcFRyYWNrSUQpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBsZXQgdHJhY2tXaW5JbmZvID0gdGhpcy5tYXAuZ2V0SW5mb1dpbmRvd0J5SUQodGhpcy50cmFja1dpbkluZm8pO1xyXG4gICAgICAgIC8vIGlmICh0cmFja1dpbkluZm8pIHtcclxuICAgICAgICAvLyAgICAgdHJhY2tXaW5JbmZvLmNsb3NlKCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGxldCBhY2NwVHJhY2tXaW5JbmZvID0gdGhpcy5tYXAuZ2V0SW5mb1dpbmRvd0J5SUQodGhpcy5hY2NwVHJhY2tXaW5JbmZvKTtcclxuICAgICAgICAvLyBpZiAoYWNjcFRyYWNrV2luSW5mbykge1xyXG4gICAgICAgIC8vICAgICBhY2NwVHJhY2tXaW5JbmZvLmNsb3NlKCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIHNldEZhc3REYXRlKGl0ZW06IGRhdGE8dGltZUxlbmd0aD4pIHtcclxuICAgICAgICB0aGlzLkZhc3REYXRlID0gaXRlbTtcclxuICAgICAgICBsZXQgdGltZTogdGltZUxlbmd0aDtcclxuICAgICAgICBzd2l0Y2ggKGl0ZW0ua2V5KSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ0b2RheVwiOlxyXG4gICAgICAgICAgICAgICAgdGltZSA9IGdldEhvdXJzKDApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJsYXN0aG91clwiOlxyXG4gICAgICAgICAgICAgICAgdGltZSA9IGdldEhvdXJzKDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJsYXN0Rm91ckhvdXJcIjpcclxuICAgICAgICAgICAgICAgIHRpbWUgPSBnZXRIb3Vycyg2KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwibGFzdFRocmVlRGF5XCI6XHJcbiAgICAgICAgICAgICAgICB0aW1lID0gZ2V0SG91cnMoMTIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucXVlcnlQYXJhbXMuc3RhcnRUaW1lID0gdGltZS5zdGFydFRpbWU7XHJcbiAgICAgICAgdGhpcy5xdWVyeVBhcmFtcy5lbmRUaW1lID0gdGltZS5lbmRUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdFR5cGUoaXRlbTogeyBrZXk6IHN0cmluZywgdGV4dDogc3RyaW5nIH0pIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRUeXBlID0gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RBZ2UoYWdlOiBFbnVtPEFnZT4pIHtcclxuICAgICAgICBpZiAodHlwZW9mIGFnZSAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdGhpcy5xdWVyeVBhcmFtcy5tYXhBZ2UgPSBhZ2UudmFsdWUubWF4QWdlO1xyXG4gICAgICAgICAgICB0aGlzLnF1ZXJ5UGFyYW1zLm1pbkFnZSA9IGFnZS52YWx1ZS5taW5BZ2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5xdWVyeVBhcmFtcy5tYXhBZ2UgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLnF1ZXJ5UGFyYW1zLm1pbkFnZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNsaWRlUmlnaHRSZXN1bHQoaTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zZXRDaGVja1JpZ2h0UmVzdWx0KHRoaXMuYWNjcFJlc3VsdFBhcmFtcy5wYWdlU2l6ZSwgaSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3VibWl0U2VhcmNoKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAoc2VsZi5xdWVyeVBhcmFtcy50YXNrTmFtZSA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLm1zZygn6K+36L6T5YWl5Lu75Yqh5ZCN56ewJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNlbGYuY3VycmVudFR5cGUua2V5ID09PSBcIk1hY1RvRmFjZVwiKSB7XHJcbiAgICAgICAgICAgIGxldCBtYWNDcmFzaFBhcmFtczogYW55ID0ge1xyXG4gICAgICAgICAgICAgICAgXCJhZnRlcmZvbGxvd1RpbWVcIjogc2VsZi5xdWVyeVBhcmFtcy5hZnRlcmZvbGxvd1RpbWV8fDUsXHJcbiAgICAgICAgICAgICAgICBcImFnb2ZvbGxvd1RpbWVcIjogc2VsZi5xdWVyeVBhcmFtcy5hZ29mb2xsb3dUaW1lfHw1LFxyXG4gICAgICAgICAgICAgICAgXCJlbmRUaW1lXCI6IHNlbGYucXVlcnlQYXJhbXMuZW5kVGltZSxcclxuICAgICAgICAgICAgICAgIFwic3RhcnRUaW1lXCI6IHNlbGYucXVlcnlQYXJhbXMuc3RhcnRUaW1lLFxyXG4gICAgICAgICAgICAgICAgXCJmb2xsb3dOdW1cIjogc2VsZi5xdWVyeVBhcmFtcy5mb2xsb3dOdW18fDMsXHJcbiAgICAgICAgICAgICAgICBcIlRhc2tOYW1lXCI6IHNlbGYucXVlcnlQYXJhbXMudGFza05hbWUsXHJcbiAgICAgICAgICAgICAgICBcInRocmVzaG9sZFwiOiBzZWxmLnF1ZXJ5UGFyYW1zLnRocmVzaG9sZCxcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBzZWxmLnF1ZXJ5UGFyYW1zLnF1ZXJ5TWFjVHlwZSxcclxuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogc2VsZi5xdWVyeVBhcmFtcy5kZXZpY2VWYWxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgLy8g5Yik5pat5pe26Ze0XHJcbiAgICAgICAgICAgIGlmIChtYWNDcmFzaFBhcmFtcy5lbmRUaW1lIDwgbWFjQ3Jhc2hQYXJhbXMuc3RhcnRUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyRGVjLndhcm5JbmZvKCflvIDlp4vml7bpl7TkuI3og73mmZrkuo7nu5PmnZ/ml7bpl7QhJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5hbmFseXNpc1NlcnZpY2UubWFjVG9GYWNlKG1hY0NyYXNoUGFyYW1zKS50aGVuKChyZXM6IFJlc3BvbnNlUmVzdWx0PEFjY29tcGFueWluZ0FuYWx5c2lzUmVzdWx0PikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNob3dBbmFseXNpc0xpc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZ2V0QWNjb21wT2ZmTGluZUxpc3QoKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLkNsZWFyRHJhdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaW5pdFF1ZXJ5UGFyYW1zKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubGF5ZXIubXNnKCfnprvnur/ku7vliqHliJvlu7rlpLHotKUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2UgaWYgKHNlbGYuY3VycmVudFR5cGUua2V5ID09PSBcIkZhY2VUb01hY1wiKSB7XHJcbiAgICAgICAgICAgIHNlbGYuTWFza0RhdGUudmFsdWUgIT09IG51bGwgPyBzZWxmLnF1ZXJ5UGFyYW1zLndlYXJNYXNrLnB1c2goc2VsZi5NYXNrRGF0ZS52YWx1ZSkgOiBcIlwiO1xyXG4gICAgICAgICAgICBzZWxmLlNleERhdGUudmFsdWUgIT09IG51bGwgPyBzZWxmLnF1ZXJ5UGFyYW1zLnNleC5wdXNoKHNlbGYuU2V4RGF0ZS52YWx1ZSkgOiBcIlwiO1xyXG4gICAgICAgICAgICBzZWxmLkdsYXNzRGF0ZS52YWx1ZSAhPT0gbnVsbCA/IHNlbGYucXVlcnlQYXJhbXMud2VhckdsYXNzZXMucHVzaChzZWxmLkdsYXNzRGF0ZS52YWx1ZSkgOiBcIlwiO1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5xdWVyeVBhcmFtcy50YXNrSWQgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGF5ZXIubXNnKCfor7fkuIrkvKDlm77niYcnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZmFjZUNyYXNoUGFyYW1zOiBhbnkgPSB7XHJcbiAgICAgICAgICAgICAgICBcImFmdGVyZm9sbG93VGltZVwiOiBzZWxmLnF1ZXJ5UGFyYW1zLmFmdGVyZm9sbG93VGltZXx8NSxcclxuICAgICAgICAgICAgICAgIFwiYWdvZm9sbG93VGltZVwiOiBzZWxmLnF1ZXJ5UGFyYW1zLmFnb2ZvbGxvd1RpbWV8fDUsXHJcbiAgICAgICAgICAgICAgICBcImVuZFRpbWVcIjogc2VsZi5xdWVyeVBhcmFtcy5lbmRUaW1lLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydFRpbWVcIjogc2VsZi5xdWVyeVBhcmFtcy5zdGFydFRpbWUsXHJcbiAgICAgICAgICAgICAgICBcImZvbGxvd051bVwiOiBzZWxmLnF1ZXJ5UGFyYW1zLmZvbGxvd051bXx8MyxcclxuICAgICAgICAgICAgICAgIFwidGhyZXNob2xkXCI6IHNlbGYucXVlcnlQYXJhbXMudGhyZXNob2xkLFxyXG4gICAgICAgICAgICAgICAgXCJ0YXNrSWRcIjogc2VsZi5xdWVyeVBhcmFtcy50YXNrSWQsXHJcbiAgICAgICAgICAgICAgICBcImltYWdlUGF0aFwiOiBzZWxmLnF1ZXJ5UGFyYW1zLmltYWdlUGF0aCxcclxuICAgICAgICAgICAgICAgIFwidGFza05hbWVcIjogc2VsZi5xdWVyeVBhcmFtcy50YXNrTmFtZSxcclxuICAgICAgICAgICAgICAgIFwiYXJyQ2FtZXJhSWRcIjogc2VsZi5xdWVyeVBhcmFtcy5hcnJDYW1lcmFJZCxcclxuICAgICAgICAgICAgICAgIFwid2Vhck1hc2tcIjogc2VsZi5xdWVyeVBhcmFtcy53ZWFyTWFzayxcclxuICAgICAgICAgICAgICAgIFwic2V4XCI6IHNlbGYucXVlcnlQYXJhbXMuc2V4LFxyXG4gICAgICAgICAgICAgICAgXCJ3ZWFyR2xhc3Nlc1wiOiBzZWxmLnF1ZXJ5UGFyYW1zLndlYXJHbGFzc2VzXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIC8vIOWIpOaWreaXtumXtFxyXG4gICAgICAgICAgICBpZiAoZmFjZUNyYXNoUGFyYW1zLmVuZFRpbWUgPCBmYWNlQ3Jhc2hQYXJhbXMuc3RhcnRUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyRGVjLndhcm5JbmZvKCflvIDlp4vml7bpl7TkuI3og73mmZrkuo7nu5PmnZ/ml7bpl7QhJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5hbmFseXNpc1NlcnZpY2UuZmFjZVRvTWFjKGZhY2VDcmFzaFBhcmFtcykudGhlbigocmVzOiBSZXNwb25zZVJlc3VsdDxBY2NvbXBhbnlpbmdBbmFseXNpc1Jlc3VsdD4pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93QW5hbHlzaXNMaXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmdldEFjY29tcE9mZkxpbmVMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5DbGVhckRyYXcoKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmluaXRRdWVyeVBhcmFtcygpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxheWVyLm1zZygn56a757q/5Lu75Yqh5Yib5bu65aSx6LSlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOiOt+WPluemu+e6v+S7u+WKoeWIl+ihqFxyXG4gICAgcHJpdmF0ZSBnZXRBY2NvbXBPZmZMaW5lTGlzdCgpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IHtcclxuICAgICAgICAgICAgXCJpZFwiOiBzZWxmLnVzZXJJbmZvQ2FjaGVGYWN0b3J5LmdldEN1cnJlbnRVc2VySWQoKSxcclxuICAgICAgICAgICAgXCJ0YXNrVHlwZUxpc3RcIjogW09mZmxpbmVUYXNrVHlwZS5TZWFyY2hGYWNlUGVyY2VpdmVDb2xsaXNpb24sIE9mZmxpbmVUYXNrVHlwZS5TZWFyY2hQZXJjZWl2ZUZhY2VDb2xsaXNpb25dXHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZWxmLmFuYWx5c2lzU2VydmljZS5nZXRPZmZMaW5lTGlzdChwYXJhbXMpLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBMaXN0OiBBcnJheTxJbnRlbGlnZW50VGFza0luZm8+ID0gW107XHJcbiAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMjAwICYmIEFycmF5LmlzQXJyYXkocmVzLmRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlcy5kYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLmRhdGFbaV0uRXh0ID0gSlNPTi5wYXJzZShyZXMuZGF0YVtpXS5FeHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIExpc3QucHVzaChyZXMuZGF0YVtpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IEFjY29tcE9mZkxpbmVMaXN0OiBhbnkgID0gXy5zb3J0QnkoTGlzdCwgZnVuY3Rpb24gKGl0ZW06IGFueSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC0oRGF0ZS5wYXJzZShpdGVtLkNyZWF0ZVRpbWUpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNlbGYuQWNjb21wT2ZmTGluZSA9IEFjY29tcE9mZkxpbmVMaXN0O1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5Yig6Zmk56a757q/5Lu75YqhXHJcbiAgICAgKiBAcGFyYW0ge0FjY29tcE9mZkxpbmV9IGl0ZW1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZWxldGVBY2NvbXBPZmZMaW5lKGl0ZW06IEludGVsaWdlbnRUYXNrSW5mbykge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgcGFyYW1zID0ge1xyXG4gICAgICAgICAgICBcInRhc2tJZFwiOiBpdGVtLlRhc2tJZCxcclxuICAgICAgICAgICAgXCJ0YXNrVHlwZVwiOiBpdGVtLlRhc2tUeXBlXHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZWxmLmFuYWx5c2lzU2VydmljZS5kZWxldGVPZmZMaW5lRGV0YWlsKHBhcmFtcykudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubGF5ZXJEZWMuaW5mbygn5Yig6Zmk5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmdldEFjY29tcE9mZkxpbmVMaXN0KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxheWVyRGVjLndhcm5JbmZvKCfliKDpmaTlpLHotKUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q2hlY2tSaWdodFJlc3VsdChzaXplOiBudW1iZXIsIHRyYWdldDogbnVtYmVyLCBpc0ZpcnN0PzogYm9vbGVhbikge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8Ym9vbGVhbj47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGkgPT09IHRyYWdldCkge1xyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2goIXNlbGYuY2hlY2tSaWdodFJlc3VsdFt0cmFnZXRdKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2goZmFsc2UpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hY2NwUmVzdWx0SW5kZXggPSB0cmFnZXQ7XHJcbiAgICAgICAgaWYgKGlzRmlyc3QpIHtcclxuICAgICAgICAgICAgYXJyW3RyYWdldF0gPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYuY2hlY2tSaWdodFJlc3VsdCA9IGFycjtcclxuICAgICAgICAvLyDlpITnkIbkvLTpmo/orr7lpIfkuI7mlLbol4/nirbmgIHmlbDmja5cclxuICAgICAgICBsZXQgcGFyYW1zOmFueSA9IHtcclxuICAgICAgICAgICAgZGV2aWNlSWRzOiBbXSxcclxuICAgICAgICAgICAgZGV2aWNlVHlwZTogJycsXHJcbiAgICAgICAgICAgIGlkczogW10sXHJcbiAgICAgICAgICAgIHVzZXJJZDogc2VsZi51c2VySW5mb0NhY2hlRmFjdG9yeS5nZXRDdXJyZW50VXNlcklkKClcclxuICAgICAgICB9O1xyXG4gICAgICAgIHBhcmFtcy5kZXZpY2VUeXBlID0gT2JqZWN0VHlwZS5DYW1lcmEudmFsdWU7XHJcbiAgICAgICAgXy5mb3JFYWNoKHNlbGYuYWNjcFJlc3VsdFBhcmFtcy5kYXRhW3RyYWdldF0uUGVyY2VpdmVBY2NvbXBhbnlMb2dzLGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUuTWFjRGV2aWNlSWQpIHtcclxuICAgICAgICAgICAgICAgIHBhcmFtcy5kZXZpY2VJZHMucHVzaCh2YWx1ZS5NYWNEZXZpY2VJZCk7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXMuaWRzLnB1c2godmFsdWUuSUQpO1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zLmRldmljZVR5cGUgPSBPYmplY3RUeXBlLldpZmkudmFsdWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUuTW9iaWxlRGV2aWNlSWQpIHtcclxuICAgICAgICAgICAgICAgIHBhcmFtcy5kZXZpY2VJZHMucHVzaCh2YWx1ZS5Nb2JpbGVEZXZpY2VJZCk7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXMuaWRzLnB1c2godmFsdWUuSUQpO1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zLmRldmljZVR5cGUgPSBPYmplY3RUeXBlLkVsZWN0cm9uaWNGZW5jZS52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNlbGYucmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLmdldERldmljZUluZm9Qcm9taXNlKHBhcmFtcykudGhlbigocmVzOmFueSk9PntcclxuICAgICAgICAgICAgXy5mb3JFYWNoKHNlbGYuYWNjcFJlc3VsdFBhcmFtcy5kYXRhW3RyYWdldF0uUGVyY2VpdmVBY2NvbXBhbnlMb2dzLGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5kZXZpY2VJbmZvID0gcmVzLmRhdGEuZGV2aWNlSW5mb1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNvbGxlY3RTdGF0dXMgPSByZXMuZGF0YS5jb2xsZWN0U3RhdHVzW2luZGV4XTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNlbGYuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5yZW5kZXJBY2NwTWFya2VycygpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0U3lzdGVtUG9pbnRGb3JQYXJhbXMocG9pbnRzOiBBcnJheTxSZXN1bHQ+KTogQXJyYXk8U3lzdGVtUG9pbnQ+IHtcclxuICAgICAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8U3lzdGVtUG9pbnQ+O1xyXG4gICAgICAgIHBvaW50cy5mb3JFYWNoKChpdGVtOiBSZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgbGV0IENhbWVyYUlEID0gaXRlbS5BY2Nlc3NMb2cuQ2FtZXJhSUQ7XHJcbiAgICAgICAgICAgIGxldCBzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnN5c3RlbVBvaW50TGlzdC5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBwb2ludCA9IHRoaXMuc3lzdGVtUG9pbnRMaXN0W2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGlmIChDYW1lcmFJRCA9PT0gcG9pbnQuT2JqZWN0SUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBhcnIucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExhdDogcG9pbnQuTGF0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBMb246IHBvaW50LkxvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IHBvaW50LklELFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3RJRDogcG9pbnQuT2JqZWN0SUQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdElEOiBpdGVtLkFjY2Vzc0xvZy5JRFxyXG4gICAgICAgICAgICAgICAgICAgIH0gYXMgU3lzdGVtUG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghcykge1xyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2gobnVsbClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRTeXN0ZW1Qb2ludEJ5V2lmaShwb2ludHM6IEFycmF5PGFueT4pOiBBcnJheTxTeXN0ZW1Qb2ludD4ge1xyXG4gICAgICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxTeXN0ZW1Qb2ludD47XHJcbiAgICAgICAgcG9pbnRzLmZvckVhY2goKGl0ZW06IHdpZmlSZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgbGV0IENhbWVyYUlEID0gaXRlbS5Nb2JpbGVEZXZpY2VJZCB8fCBpdGVtLk1hY0RldmljZUlkO1xyXG4gICAgICAgICAgICBsZXQgcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5zeXN0ZW1Qb2ludExpc3QubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9pbnQgPSB0aGlzLnN5c3RlbVBvaW50TGlzdFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICBpZiAoQ2FtZXJhSUQgPT09IHBvaW50Lk9iamVjdElEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBMYXQ6IHBvaW50LkxhdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9uOiBwb2ludC5Mb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIElEOiBwb2ludC5JRCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0SUQ6IHBvaW50Lk9iamVjdElELFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRJRDogaXRlbS5JRFxyXG4gICAgICAgICAgICAgICAgICAgIH0gYXMgU3lzdGVtUG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghcykge1xyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2gobnVsbClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g57uY5Yi26L2o6L+55L+h5oGvXHJcbiAgICBzZXRSZXVsdFRyYWNrKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBzZWxmLmNsZWFyUmVzdWx0TWFya2Vyc0luZm8oKTtcclxuICAgICAgICBzZWxmLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5pc1NvcnRMZXR0ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IGFsbFJlc3VsdExpc3QgPSBfLnNvcnRCeShzZWxmLmFsbFRyYWNrUmVzdWx0LCBmdW5jdGlvbiAoaXRlbTogYW55KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKERhdGUucGFyc2UoaXRlbS5BY2Nlc3NMb2cuTG9nVGltZSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2VsZi5SZXN1bHRQYWdpbmF0aW9uLnNldChhbGxSZXN1bHRMaXN0KTtcclxuICAgICAgICAgICAgc2VsZi5yZXN1bHRQYXJhbXMucGFnZVNpemUgPSA2O1xyXG4gICAgICAgICAgICBzZWxmLnJlc3VsdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgIHNlbGYucmVzdWx0UGFyYW1zID0gc2VsZi5SZXN1bHRQYWdpbmF0aW9uLmdldEJ5UGFnZShzZWxmLnJlc3VsdFBhcmFtcyk7XHJcbiAgICAgICAgICAgIHNlbGYuYWxsVHJhY2tSZXN1bHQgPSBzZWxmLnJlc3VsdFBhcmFtcy5hbGxEYXRhO1xyXG4gICAgICAgICAgICBzZWxmLnNldFJlc3VsdEZvck1hcChzZWxmLmFsbFRyYWNrUmVzdWx0KTtcclxuICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHBvaW50cyA9IHNlbGYuYW5hbHlzaXNNbWFwU2VydmVyLmdldFN5c3RlbVBvaW50Rm9yUGFyYW1zKHNlbGYuYWxsVHJhY2tSZXN1bHQpO1xyXG4gICAgICAgICAgICBzZWxmLmFuYWx5c2lzTW1hcFNlcnZlci5zZXRUcmFja0FuaW1hdGlvbihzZWxmLmFsbFRyYWNrUmVzdWx0LCBwb2ludHMsIHNlbGYudHJhY2tSZXN1bHRGb3JNYXApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOe7mOWItuS8tOmaj+i9qOi/uVxyXG4gICAgc2V0QWNjcFRyYWNrKGk6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuY2xlYXJBY2NwTWFya2Vyc0luZm8oKTtcclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tSaWdodFJlc3VsdFtpXSkge1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlUmlnaHRSZXN1bHQoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhcnIgPSB0aGlzLmdldFN5c3RlbVBvaW50QnlXaWZpKHRoaXMuYWxsQWNjcFRyYWNrUmVzdWx0KTtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5zZXRBY2NwVHJhY2tBbmltYXRpb24odGhpcy5hbGxBY2NwVHJhY2tSZXN1bHQsIGFyciwgdGhpcy5hY2NwVHJhY2tSZXN1bHRGb3JNYXApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyDliJvlu7rlnLDlm77lvLnmoYZcclxuICAgIGNyZWF0ZU1hcFBvcHVwKHBvaW50OiBOUE1hcExpYi5HZW9tZXRyeS5Qb2ludCwgZGF0YTogUmVzdWx0LCB0eXBlOiBzdHJpbmcsIGxvY2F0aW9uPzogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodHlwZSA9PT0gV2luUG9wdXBUeXBlLlRyYWNrKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVRyYWNrUG9wdXAocG9pbnQsIGRhdGEsIGxvY2F0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IFdpblBvcHVwVHlwZS5NYXJrZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTWFya2VyUG9wdXAocG9pbnQsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVUcmFja1BvcHVwKHBvaW50OiBOUE1hcExpYi5HZW9tZXRyeS5Qb2ludCwgZGF0YTogUmVzdWx0LCBsb2NhdGlvbjogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGRvbTogYW55O1xyXG4gICAgICAgIGxldCBzaXplOiBOUE1hcExpYi5HZW9tZXRyeS5TaXplO1xyXG4gICAgICAgIGlmIChsb2NhdGlvbiA9PT0gJ0xlZnQnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlc3VsdExlZnRUeXBlID09PSAnRmFjZScpIHtcclxuICAgICAgICAgICAgICAgIGRvbSA9ICQodHJhY2tQb3B1cEh0bWwpLmdldCgwKTtcclxuICAgICAgICAgICAgICAgIHNpemUgPSBuZXcgTlBNYXBMaWIuR2VvbWV0cnkuU2l6ZSgtODIsIC0yNDgpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkb20gPSAkKG1hY1BvcHVwSHRtbCkuZ2V0KDApO1xyXG4gICAgICAgICAgICAgICAgc2l6ZSA9IG5ldyBOUE1hcExpYi5HZW9tZXRyeS5TaXplKC04MiwgLTEyOClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxvY2F0aW9uID09PSAnUmlnaHQnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlc3VsdFJpZ2h0VHlwZSA9PT0gJ0ZhY2UnKSB7XHJcbiAgICAgICAgICAgICAgICBkb20gPSAkKHRyYWNrUG9wdXBIdG1sKS5nZXQoMCk7XHJcbiAgICAgICAgICAgICAgICBzaXplID0gbmV3IE5QTWFwTGliLkdlb21ldHJ5LlNpemUoLTg3LCAtMjQ4KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZG9tID0gJChtYWNQb3B1cEh0bWwpLmdldCgwKTtcclxuICAgICAgICAgICAgICAgIHNpemUgPSBuZXcgTlBNYXBMaWIuR2VvbWV0cnkuU2l6ZSgtODcsIC0xMjgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBsZXQgV2luSW5mbyA9IHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmdldE1hcCgpLmNyZWF0ZUluZm9XaW5kb3cocG9pbnQubG9uLCBwb2ludC5sYXQsIHtcclxuICAgICAgICAgICAgaXNjb21tb246IHRydWUsXHJcbiAgICAgICAgICAgIG9mZnNldDogc2l6ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBzY29wZTogeyB0cmFjZURhdGE6IFJlc3VsdCwgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUudHJhY2VEYXRhID0gZGF0YTtcclxuXHJcbiAgICAgICAgZG9tID0gdGhpcy4kY29tcGlsZShkb20ub3V0ZXJIVE1MKShzY29wZSk7XHJcbiAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmdldE1hcCgpLm9wZW5JbmZvV2luZG93KFdpbkluZm8sIGRvbVswXSwge1xyXG4gICAgICAgICAgICAgICAgY2xvc2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmdldE1hcCgpLmNsb3NlSW5mb1dpbmRvdyhXaW5JbmZvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIFdpbkluZm87XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlTWFya2VyUG9wdXAocG9pbnQ6IE5QTWFwTGliLkdlb21ldHJ5LlBvaW50LCBkYXRhOiBSZXN1bHQpIHtcclxuICAgICAgICBsZXQgV2luaW5mbyA9IHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmdldE1hcCgpLmNyZWF0ZUluZm9XaW5kb3cocG9pbnQubG9uLCBwb2ludC5sYXQsIHtcclxuICAgICAgICAgICAgaXNjb21tb246IHRydWUsXHJcbiAgICAgICAgICAgIG9mZnNldDogbmV3IE5QTWFwTGliLkdlb21ldHJ5LlNpemUoLTgyLCAtMjQ4KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBzY29wZTogeyB0cmFjZURhdGE6IFJlc3VsdCwgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUudHJhY2VEYXRhID0gZGF0YTtcclxuICAgICAgICBsZXQgZG9tID0gJCh0cmFja1BvcHVwSHRtbCkuZ2V0KDApO1xyXG4gICAgICAgIGRvbSA9IHRoaXMuJGNvbXBpbGUoZG9tLm91dGVySFRNTCkoc2NvcGUpO1xyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5nZXRNYXAoKS5vcGVuSW5mb1dpbmRvdyhXaW5pbmZvLCBkb21bMF0sIHtcclxuICAgICAgICAgICAgICAgIGNsb3NlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5nZXRNYXAoKS5jbG9zZUluZm9XaW5kb3coV2luaW5mbyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBXaW5pbmZvXHJcbiAgICB9XHJcblxyXG4gICAgb3BlbkRldGFpbFBvcHVwKGl0ZW06IGFueSwgaW5kZXg6IG51bWJlciwgZ3JvdXBOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhpdGVtKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IG9iamVjdFR5cGU6c3RyaW5nID1cIlwiO1xyXG4gICAgICAgIGxldCBuZXdJdGVtOiBhbnkgPSB7fTtcclxuICAgICAgICBsZXQgbmV3TGlzdDpBcnJheTxhbnk+ID0gW107XHJcbiAgICAgICAgaWYgKGdyb3VwTmFtZSA9PT0gJ0ZhY2UnKSB7XHJcbiAgICAgICAgICAgIG9iamVjdFR5cGUgPSBPYmplY3RUeXBlLkNhbWVyYS52YWx1ZTtcclxuICAgICAgICAgICAgbmV3SXRlbSA9IGl0ZW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChncm91cE5hbWUgPT09ICdNYWMnKSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLk1hYykge1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0VHlwZSA9IE9iamVjdFR5cGUuV2lmaS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIG5ld0l0ZW0ud2lmaUxvZyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgbmV3SXRlbS53aWZpTG9nID0gaXRlbTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLklNRUkpIHtcclxuICAgICAgICAgICAgICAgIG9iamVjdFR5cGUgPSBPYmplY3RUeXBlLkVsZWN0cm9uaWNGZW5jZS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIG5ld0l0ZW0uZUZlbmNlTG9nID0ge307XHJcbiAgICAgICAgICAgICAgICBuZXdJdGVtLmVGZW5jZUxvZyA9IGl0ZW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbmV3TGlzdC5wdXNoKG5ld0l0ZW0pO1xyXG5cclxuICAgICAgICBsZXQgc2NvcGU6IHtcclxuICAgICAgICAgICAgJGRlc3Ryb3k6IEZ1bmN0aW9uLFxyXG4gICAgICAgICAgICByYW5rOiBudW1iZXIsXHJcbiAgICAgICAgICAgIGFsbExpc3Q6IEFycmF5PGFueT4sXHJcbiAgICAgICAgICAgIGNvbGxlY3RGdW5jdGlvbjogRnVuY3Rpb24sXHJcbiAgICAgICAgICAgIGFuYWx5c2lzRnVuY3Rpb246IEZ1bmN0aW9uLFxyXG4gICAgICAgICAgICBzdXJ2ZWlsbGFuY2VGdW5jdGlvbjogRnVuY3Rpb24sXHJcbiAgICAgICAgICAgIGNsb3NlUG9wdXA6IEZ1bmN0aW9uLFxyXG4gICAgICAgICAgICBzaG93Rm9vdGVyOiBib29sZWFuXHJcbiAgICAgICAgICAgIGluZGV4OmFueVxyXG4gICAgICAgIH0gPSBzZWxmLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUucmFuayA9IGluZGV4O1xyXG4gICAgICAgIHNjb3BlLmFsbExpc3QgPSBuZXdMaXN0O1xyXG4gICAgICAgIHNjb3BlLnNob3dGb290ZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlLmluZGV4ID0gXCJcIjtcclxuICAgICAgICBzY29wZS5jb2xsZWN0RnVuY3Rpb24gPSAoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuY2xpY2tDb2xsZWN0KG51bGwsIGl0ZW0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2NvcGUuYW5hbHlzaXNGdW5jdGlvbiA9IChpdGVtOiBhbnksdHlwZTpzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5jbGlja0FuYWx5c2lzKG51bGwsIGl0ZW0sIHR5cGUpO1xyXG4gICAgICAgICAgICBzZWxmLmxheWVyLmNsb3NlKHNjb3BlLmluZGV4KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNjb3BlLnN1cnZlaWxsYW5jZUZ1bmN0aW9uID0gKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLmNsaWNrU3VydmVpbGxhbmNlKG51bGwsIGl0ZW0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2NvcGUuY2xvc2VQb3B1cCA9ICgpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5sYXllci5jbG9zZShzY29wZS5pbmRleCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgc2VsZi5hbmFseXNpc01tYXBTZXJ2ZXIub3BlbkRldGFpbFBvcHVwKG5ld0l0ZW0sIGluZGV4LCBuZXdMaXN0LCBvYmplY3RUeXBlLCBzY29wZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIOa4suafk+WcsOWbvueCueS9jVxyXG4gICAgcHJpdmF0ZSByZW5kZXJNYWtlcnMobGF5ZXJOYW1lOiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBncm91cE5hbWU6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ2xlYXI6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IEFycmF5PFN5c3RlbVBvaW50PixcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc/OiBib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgbGFibGVzPzogQXJyYXk8YW55PixcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGljb24/OiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoaXNDbGVhcikge1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5yZW1vdmVPdmVybGF5c0J5TmFtZShsYXllck5hbWUsIGdyb3VwTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVzdWx0VG9TeXN0ZW1Qb2ludHMgPSByZXN1bHQ7XHJcbiAgICAgICAgdGhpcy5tYXAuYWRkT3ZlcmxheXNGb3JNYWtlcnMobGF5ZXJOYW1lLCBncm91cE5hbWUsIHJlc3VsdCwge1xyXG4gICAgICAgICAgICBpY29uVVJMOiBpY29uIHx8IE1hcmtlcnNJY29uLk5vcm1hbEJsdWVJY29uLFxyXG4gICAgICAgICAgICBjbGljazogKG1hcmtlcjogTlBNYXBMaWIuU3ltYm9scy5NYXJrZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gbWFya2VyLmdldERhdGEoKSBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OiBDYWNoZVJlc3VsdDtcclxuICAgICAgICAgICAgICAgIGlmIChncm91cE5hbWUgPT09IE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdEdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy50cmFja1Jlc3VsdEZvck1hcFtkYXRhLnJlc3VsdElEXSBhcyBDYWNoZVJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5hY2NwVHJhY2tSZXN1bHRGb3JNYXBbZGF0YS5yZXN1bHRJRF0gYXMgQ2FjaGVSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5EZXRhaWxQb3B1cChyZXN1bHQsIHJlc3VsdC5yZXN1bHRJbmRleCwgZ3JvdXBOYW1lKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbW91c2VPdmVyOiAobWFya2VyOiBOUE1hcExpYi5TeW1ib2xzLk1hcmtlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBtYXJrZXIuZ2V0RGF0YSgpIGFzIGFueTtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQ6IENhY2hlUmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgaWYgKGdyb3VwTmFtZSA9PT0gT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0R3JvdXApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLnRyYWNrUmVzdWx0Rm9yTWFwW2RhdGEucmVzdWx0SURdIGFzIENhY2hlUmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLmFjY3BUcmFja1Jlc3VsdEZvck1hcFtkYXRhLnJlc3VsdElEXSBhcyBDYWNoZVJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubWFya2VyV2luaW5mbyA9IHRoaXMuY3JlYXRlTWFwUG9wdXAobWFya2VyLmdldFBvc2l0aW9uKCksIHJlc3VsdCwgV2luUG9wdXBUeXBlLk1hcmtlcilcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbW91c2VPdXQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFwLmdldEluZm9XaW5kb3dCeUlEKHRoaXMubWFya2VyV2luaW5mbykuY2xvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIGZsYWcsIGxhYmxlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIOagueaNrue7k+aenOaYvuekuuWcsOWbvuWvueW6lOeahOeCueS9jVxyXG4gICAgcmVzdWx0VG9NYXAoaXRlbTogYW55LCBpbmRleDogbnVtYmVyLCB0eXBlPzogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGlkOiBzdHJpbmc7XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IFwiTWFjXCIpIHtcclxuICAgICAgICAgICAgaWQgPSBpdGVtLklEO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gXCJNYWNcIikge1xyXG4gICAgICAgICAgICB0aGlzLm1hY0FuYWx5c2lzTWFwU2VydmljZS5yZXN1bHRUb01hcChpZCwgdHlwZSk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMubWFwLnNldE1hcmtlckljb24oT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0TGF5ZXIsIE92ZXJsYXlOYW1lLk1hcEZvckFjY3BHcm91cCwgaXRlbS5BY2Nlc3NMb2cuSUQsIE1hcmtlcnNJY29uLkhvdmVyUmVkSWNvbiwgOTk5KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLnJlc3VsdFRvTWFwKGl0ZW0sIHR5cGUpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLm1hcC5zZXRNYXJrZXJJY29uKE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdExheWVyLCBPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRHcm91cCwgaXRlbS5BY2Nlc3NMb2cuSUQsIE1hcmtlcnNJY29uLkhvdmVyUmVkSWNvbiwgOTk5KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE8g5Y+W5raI57uT5p6c5pi+56S65Zyw5Zu+5a+55bqU55qE54K55L2NXHJcbiAgICB1blJlc3VsdFRvTWFwKGl0ZW06IGFueSwgaW5kZXg6IG51bWJlciwgdHlwZT86IHN0cmluZykge1xyXG4gICAgICAgIGxldCBpZDogc3RyaW5nO1xyXG4gICAgICAgIGlmICh0eXBlID09PSBcIk1hY1wiKSB7XHJcbiAgICAgICAgICAgIGlkID0gaXRlbS5JRDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IFwiTWFjXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5tYWNBbmFseXNpc01hcFNlcnZpY2UudW5SZXN1bHRUb01hcChpZCwgdHlwZSA/IHRoaXMuYWNjcFRyYWNrUmVzdWx0Rm9yTWFwIDogdGhpcy50cmFja1Jlc3VsdEZvck1hcCwgdHlwZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIudW5SZXN1bHRUb01hcChpdGVtLCB0eXBlID8gdGhpcy5hY2NwVHJhY2tSZXN1bHRGb3JNYXAgOiB0aGlzLnRyYWNrUmVzdWx0Rm9yTWFwLCB0eXBlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYgKHR5cGUpIHtcclxuICAgICAgICAvLyAgICAgbGV0IHJlcyA9IHRoaXMuYWNjcFRyYWNrUmVzdWx0Rm9yTWFwW2l0ZW0uQWNjZXNzTG9nLklEXSBhcyBDYWNoZVJlc3VsdDtcclxuICAgICAgICAvLyAgICAgdGhpcy5tYXAuc2V0TWFya2VySWNvbihPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRMYXllciwgT3ZlcmxheU5hbWUuTWFwRm9yQWNjcEdyb3VwLCBpdGVtLkFjY2Vzc0xvZy5JRCwgTWFya2Vyc0ljb24uTm9ybWFsR3JlZW5JY29uLCByZXMucmVzdWx0SW5kZXggKyAxKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgIGxldCByZXMgPSB0aGlzLnRyYWNrUmVzdWx0Rm9yTWFwW2l0ZW0uQWNjZXNzTG9nLklEXSBhcyBDYWNoZVJlc3VsdDtcclxuICAgICAgICAvLyAgICAgdGhpcy5tYXAuc2V0TWFya2VySWNvbihPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRMYXllciwgT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0R3JvdXAsIGl0ZW0uQWNjZXNzTG9nLklELCBNYXJrZXJzSWNvbi5Ob3JtYWxCbHVlSWNvbiwgcmVzLnJlc3VsdEluZGV4ICsgMSk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgZ29CYWNrKCkge1xyXG4gICAgICAgIHRoaXMuQ2xlYXJEcmF3KCk7IC8vIOa4hemZpOahhumAieWMuuWfn+WGheWuuVxyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kZW1pdCgnc2hvd0l0ZW1QYWdlJywgZmFsc2UpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ29CYWNrRm9ybSgpIHtcclxuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaG93Rm9ybSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1Jlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dBbmFseXNpc0xpc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5pc1NvcnRMZXR0ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmRlc3RvcnlGb3JNYXBNYXJrZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIucmVuZGVyU3lzdGVtUG9pbnQoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGdvQWxsUmVzdWx0KCkge1xyXG4gICAgICAgIHRoaXMuaXNTb3J0TGV0dGVyID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNob3dSZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNob3dBbGxSZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmVzdWx0UGFyYW1zLnBhZ2VTaXplID0gNDA7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMucmVzdWx0UGFyYW1zID0gdGhpcy5SZXN1bHRQYWdpbmF0aW9uLmdldEJ5UGFnZSh0aGlzLnJlc3VsdFBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2VBbGxSZXN1bHQoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93UmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNob3dBbGxSZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJlc3VsdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRQYXJhbXMucGFnZVNpemUgPSA2O1xyXG4gICAgICAgIHRoaXMucmVzdWx0UGFyYW1zID0gdGhpcy5SZXN1bHRQYWdpbmF0aW9uLmdldEJ5UGFnZSh0aGlzLnJlc3VsdFBhcmFtcyk7XHJcbiAgICAgICAgdGhpcy5hbGxUcmFja1Jlc3VsdCA9IHRoaXMucmVzdWx0UGFyYW1zLmFsbERhdGE7XHJcbiAgICAgICAgbGV0IGFyciA9IHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmdldFN5c3RlbVBvaW50Rm9yUGFyYW1zKHRoaXMucmVzdWx0UGFyYW1zLmRhdGEpO1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLnJlbmRlck1ha2VycyhcclxuICAgICAgICAgICAgT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0TGF5ZXIsXHJcbiAgICAgICAgICAgIE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdEdyb3VwLFxyXG4gICAgICAgICAgICB0cnVlLFxyXG4gICAgICAgICAgICBhcnIsXHJcbiAgICAgICAgICAgIHRoaXMudHJhY2tSZXN1bHRGb3JNYXAsXHJcbiAgICAgICAgICAgIHRoaXMuaXNTb3J0TGV0dGVyLFxyXG4gICAgICAgICAgICB0aGlzLnNvcnRMZXR0ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGdvQWNjb21wYW55QWxsUmVzdWx0KCkge1xyXG4gICAgICAgIHRoaXMuc2hvd1Jlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvd0FsbEFjY29tcGFueVJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5hY2NwUmVzdWx0UGFyYW1zLnBhZ2VTaXplID0gNDA7XHJcbiAgICAgICAgdGhpcy5hY2NwUmVzdWx0UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICB0aGlzLmFjY3BSZXN1bHRQYXJhbXMgPSB0aGlzLkFjY3BQYWdpbmF0aW9uLmdldEJ5UGFnZSh0aGlzLmFjY3BSZXN1bHRQYXJhbXMpO1xyXG4gICAgICAgIHRoaXMuc2V0Q2hlY2tSaWdodFJlc3VsdCh0aGlzLmFjY3BSZXN1bHRQYXJhbXMucGFnZVNpemUsIDAsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlQWNjb21wYW55QWxsUmVzdWx0KCkge1xyXG4gICAgICAgIHRoaXMuc2hvd1Jlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zaG93QWxsQWNjb21wYW55UmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hY2NwUmVzdWx0UGFyYW1zLnBhZ2VTaXplID0gNjtcclxuICAgICAgICB0aGlzLmFjY3BSZXN1bHRQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMuYWNjcFJlc3VsdFBhcmFtcyA9IHRoaXMuQWNjcFBhZ2luYXRpb24uZ2V0QnlQYWdlKHRoaXMuYWNjcFJlc3VsdFBhcmFtcyk7XHJcbiAgICAgICAgdGhpcy5zZXRDaGVja1JpZ2h0UmVzdWx0KHRoaXMuYWNjcFJlc3VsdFBhcmFtcy5wYWdlU2l6ZSwgMCwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlUmVzdWx0UGFnZShpOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi5yZXN1bHRQYXJhbXMuY3VycmVudFBhZ2UgPSBpO1xyXG4gICAgICAgIHNlbGYucmVzdWx0UGFyYW1zID0gc2VsZi5SZXN1bHRQYWdpbmF0aW9uLmdldEJ5UGFnZShzZWxmLnJlc3VsdFBhcmFtcyk7XHJcbiAgICAgICAgc2VsZi5hbGxUcmFja1Jlc3VsdCA9IHNlbGYucmVzdWx0UGFyYW1zLmFsbERhdGE7XHJcblxyXG4gICAgICAgIGlmIChzZWxmLmlzU29ydExldHRlcikge1xyXG4gICAgICAgICAgICBzZWxmLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0UmVzdWx0Rm9yTWFwKHNlbGYuYWxsVHJhY2tSZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGFyciA9IHNlbGYuYW5hbHlzaXNNbWFwU2VydmVyLmdldFN5c3RlbVBvaW50Rm9yUGFyYW1zKHNlbGYucmVzdWx0UGFyYW1zLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5hbmFseXNpc01tYXBTZXJ2ZXIucmVuZGVyTWFrZXJzKFxyXG4gICAgICAgICAgICAgICAgICAgIE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdExheWVyLFxyXG4gICAgICAgICAgICAgICAgICAgIE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdEdyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgIHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYXJyLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudHJhY2tSZXN1bHRGb3JNYXAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pc1NvcnRMZXR0ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zb3J0TGV0dGVyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlQWNjcFJlc3VsdFBhZ2UoaTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5hY2NwUmVzdWx0UGFyYW1zLmN1cnJlbnRQYWdlID0gaTtcclxuICAgICAgICB0aGlzLmFjY3BSZXN1bHRQYXJhbXMgPSB0aGlzLkFjY3BQYWdpbmF0aW9uLmdldEJ5UGFnZSh0aGlzLmFjY3BSZXN1bHRQYXJhbXMpO1xyXG4gICAgICAgIHRoaXMuc2V0Q2hlY2tSaWdodFJlc3VsdCh0aGlzLnJlc3VsdFBhcmFtcy5wYWdlU2l6ZSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRSZXN1bHRGb3JNYXAocmVzdWx0OiBBcnJheTxSZXN1bHQgfCBDYWNoZVJlc3VsdD4pIHtcclxuICAgICAgICBsZXQgb2JqID0ge30gYXMgIHsgW2tleTogc3RyaW5nXTogQ2FjaGVSZXN1bHQgfTtcclxuICAgICAgICByZXN1bHQuZm9yRWFjaCgoaXRlbTogQ2FjaGVSZXN1bHQsIGk6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICBvYmpbaXRlbS5BY2Nlc3NMb2cuSURdID0gaXRlbTtcclxuICAgICAgICAgICAgb2JqW2l0ZW0uQWNjZXNzTG9nLklEXS5yZXN1bHRJbmRleCA9IGk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy50cmFja1Jlc3VsdEZvck1hcCA9IG9iajtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbmRlckFjY3BNYXJrZXJzKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgYWNjcEFyciA9IHNlbGYuYWNjcFJlc3VsdFBhcmFtcy5kYXRhW3NlbGYuYWNjcFJlc3VsdEluZGV4XS5QZXJjZWl2ZUFjY29tcGFueUxvZ3M7XHJcbiAgICAgICAgbGV0IG9iaiA9IHt9IGFzICB7IFtrZXk6IHN0cmluZ106IENhY2hlUmVzdWx0IH07XHJcbiAgICAgICAgYWNjcEFyci5mb3JFYWNoKChpdGVtOiBhbnksIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgb2JqW2l0ZW0uSURdID0gaXRlbTtcclxuICAgICAgICAgICAgb2JqW2l0ZW0uSURdLnJlc3VsdEluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2VsZi5hY2NwVHJhY2tSZXN1bHRGb3JNYXAgPSBvYmo7XHJcbiAgICAgICAgc2VsZi5hbGxBY2NwVHJhY2tSZXN1bHQgPSBhY2NwQXJyO1xyXG4gICAgICAgIGxldCByZXN1bHRMaXN0ID0gc2VsZi5nZXRTeXN0ZW1Qb2ludEJ5V2lmaShzZWxmLmFsbEFjY3BUcmFja1Jlc3VsdCk7XHJcbiAgICAgICAgc2VsZi5yZW5kZXJXaWZpTWFrZXJzKFxyXG4gICAgICAgICAgICBPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRMYXllcixcclxuICAgICAgICAgICAgT3ZlcmxheU5hbWUuTWFwRm9yQWNjcEdyb3VwLFxyXG4gICAgICAgICAgICB0cnVlLFxyXG4gICAgICAgICAgICByZXN1bHRMaXN0LFxyXG4gICAgICAgICAgICBzZWxmLmFjY3BUcmFja1Jlc3VsdEZvck1hcCxcclxuICAgICAgICAgICAgZmFsc2UsXHJcbiAgICAgICAgICAgIG51bGwsXHJcbiAgICAgICAgICAgIE1hcmtlcnNJY29uLk5vcm1hbEdyZWVuSWNvblxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0FuYWx5c2lzUmVzdWx0KGl0ZW06IHsgW2tleTogc3RyaW5nXTogYW55IH0pIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IHtcclxuICAgICAgICAgICAgXCJhbmFseXNlVGFza1R5cGVcIjogQW5hbHlzZVRhc2tUeXBlLlNlYXJjaEFuYWx5c2VUYXNrUmVzdWx0LFxyXG4gICAgICAgICAgICBcInRhc2tJZFwiOiBpdGVtLlRhc2tJZCxcclxuICAgICAgICAgICAgXCJUYXNrVHlwZVwiOiAgaXRlbS5UYXNrVHlwZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2VsZi5pbml0TG9hZGluZ1BvcCgpO1xyXG4gICAgICAgIHNlbGYuYW5hbHlzaXNNbWFwU2VydmVyLmNsZWFyRHJhdygpOyAvLyDmuIXpmaTmoYbpgInljLrln5/lhoXlrrlcclxuXHJcbiAgICAgICAgaWYgKGl0ZW0uVGFza1R5cGUgPT09IFwiU2VhcmNoRmFjZVBlcmNlaXZlQ29sbGlzaW9uXCIpIHsvLyDkurrohLjnorDmhJ/nn6XmlbDmja5cclxuICAgICAgICAgICAgc2VsZi5hbmFseXNpc1NlcnZpY2UuZ2V0T2ZmTGluZURldGFpbChwYXJhbXMpLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgIT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubGF5ZXIuY2xvc2Uoc2VsZi5jdXJyZW50TGF5ZXJJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXllckRlYy53YXJuSW5mbygn5p+l6K+i57uT5p6c5aSx6LSlJyk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZiAocmVzLmRhdGEmJnJlcy5kYXRhLlNlYXJjaEFjY2Vzc1Jlc3VsdHMmJihyZXMuZGF0YS5TZWFyY2hBY2Nlc3NSZXN1bHRzLmxlbmd0aD4wKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHRMaXN0OiBhbnkgPSBfLnNvcnRCeShyZXMuZGF0YS5TZWFyY2hBY2Nlc3NSZXN1bHRzLCBmdW5jdGlvbiAoaXRlbTogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtaXRlbS5TY29yZTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgRUZlbmNlTG9nQWNjb21wYW55RW50aXRpZXMgPSByZXMuZGF0YS5FRmVuY2VMb2dBY2NvbXBhbnlFbnRpdGllcyB8fCBbXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgV2lGaUxvZ0FjY29tcGFueUVudGl0aXRlcyA9IHJlcy5kYXRhLldpRmlMb2dBY2NvbXBhbnlFbnRpdGl0ZXMgfHwgW107XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRyYWNrUmVzdWx0TGlzdDogYW55ID0gXy5jb25jYXQoRUZlbmNlTG9nQWNjb21wYW55RW50aXRpZXMsIFdpRmlMb2dBY2NvbXBhbnlFbnRpdGl0ZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrUmVzdWx0TGlzdCA9IF8uc29ydEJ5KHRyYWNrUmVzdWx0TGlzdCwgZnVuY3Rpb24gKGl0ZW06IGFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLWl0ZW0uTnVtO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmFja1Jlc3VsdExpc3QubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYXJhbXM6YW55ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV2aWNlSWRzOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldmljZVR5cGU6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRzOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZDogc2VsZi51c2VySW5mb0NhY2hlRmFjdG9yeS5nZXRDdXJyZW50VXNlcklkKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLmRldmljZVR5cGUgPSBPYmplY3RUeXBlLkNhbWVyYS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXy5mb3JFYWNoKHJlc3VsdExpc3QsZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMuZGV2aWNlSWRzLnB1c2godmFsdWUuQWNjZXNzTG9nLkNhbWVyYUlEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5pZHMucHVzaCh2YWx1ZS5BY2Nlc3NMb2cuSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UuZ2V0RGV2aWNlSW5mb1Byb21pc2UocGFyYW1zKS50aGVuKChyZXM6YW55KT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5mb3JFYWNoKHJlc3VsdExpc3QsZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5kZXZpY2VJbmZvID0gcmVzLmRhdGEuZGV2aWNlSW5mb1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jb2xsZWN0U3RhdHVzID0gcmVzLmRhdGEuY29sbGVjdFN0YXR1c1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYW5hbHlzaXNNbWFwU2VydmVyLnJlbW92ZVN5c3RlbVBvaW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLlJlc3VsdFBhZ2luYXRpb24uc2V0KHJlc3VsdExpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuQWNjcFBhZ2luYXRpb24uc2V0KHRyYWNrUmVzdWx0TGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlc3VsdFBhcmFtcy5wYWdlU2l6ZSA9IDY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZXN1bHRQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVzdWx0UGFyYW1zID0gc2VsZi5SZXN1bHRQYWdpbmF0aW9uLmdldEJ5UGFnZShzZWxmLnJlc3VsdFBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hbGxUcmFja1Jlc3VsdCA9IHNlbGYucmVzdWx0UGFyYW1zLmFsbERhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRSZXN1bHRGb3JNYXAoc2VsZi5hbGxUcmFja1Jlc3VsdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWNjcFJlc3VsdFBhcmFtcy5wYWdlU2l6ZSA9IDY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hY2NwUmVzdWx0UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFjY3BSZXN1bHRQYXJhbXMgPSBzZWxmLkFjY3BQYWdpbmF0aW9uLmdldEJ5UGFnZShzZWxmLmFjY3BSZXN1bHRQYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93Rm9ybSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd1Jlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZXN1bHRMZWZ0VHlwZSA9ICdGYWNlJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlc3VsdFJpZ2h0VHlwZSA9ICdNYWMnO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXJyID0gc2VsZi5hbmFseXNpc01tYXBTZXJ2ZXIuZ2V0U3lzdGVtUG9pbnRGb3JQYXJhbXMoc2VsZi5yZXN1bHRQYXJhbXMuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hbmFseXNpc01tYXBTZXJ2ZXIucmVuZGVyTWFrZXJzKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRMYXllcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0R3JvdXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi50cmFja1Jlc3VsdEZvck1hcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pc1NvcnRMZXR0ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc29ydExldHRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRDaGVja1JpZ2h0UmVzdWx0KHNlbGYuYWNjcFJlc3VsdFBhcmFtcy5wYWdlU2l6ZSwgMCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxheWVyLmNsb3NlKHNlbGYuY3VycmVudExheWVySW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXllci5jbG9zZShzZWxmLmN1cnJlbnRMYXllckluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXllckRlYy5pbmZvKCfmsqHmnInmn6Xor6LliLDnu5PmnpwnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubGF5ZXIuY2xvc2Uoc2VsZi5jdXJyZW50TGF5ZXJJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXllckRlYy5pbmZvKCfmsqHmnInmn6Xor6LliLDnu5PmnpwnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Ugey8vIOaEn+efpeaVsOaNrueisOS6uuiEuFxyXG4gICAgICAgICAgICBzZWxmLmFuYWx5c2lzU2VydmljZS5nZXRPZmZMaW5lRGV0YWlsKHBhcmFtcykudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMjAwICYmIHJlcy5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jbGVhck90aGVySW5mbygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0TGlzdDogYW55ID0gXy5zb3J0QnkocmVzLmRhdGEuUGVyY2VpdmVMb2dzLCBmdW5jdGlvbiAoaXRlbTogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLShEYXRlLnBhcnNlKGl0ZW0uQWNxVGltZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRyYWNrUmVzdWx0TGlzdDogYW55ID0gXy5zb3J0QnkocmVzLmRhdGEuRmFjZUFjY29tcGFueUVudGl0aWVzLCBmdW5jdGlvbiAoaXRlbTogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLWl0ZW0uTnVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5SZXN1bHRQYWdpbmF0aW9uLnNldChyZXN1bHRMaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5BY2NwUGFnaW5hdGlvbi5zZXQodHJhY2tSZXN1bHRMaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRQYXJhbXMucGFnZVNpemUgPSA2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0UGFyYW1zID0gdGhpcy5SZXN1bHRQYWdpbmF0aW9uLmdldEJ5UGFnZSh0aGlzLnJlc3VsdFBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWxsVHJhY2tSZXN1bHQgPSBzZWxmLlJlc3VsdFBhZ2luYXRpb24uZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWNjcFJlc3VsdFBhcmFtcy5wYWdlU2l6ZSA9IDY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWNjcFJlc3VsdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWNjcFJlc3VsdFBhcmFtcyA9IHRoaXMuQWNjcFBhZ2luYXRpb24uZ2V0QnlQYWdlKHRoaXMuYWNjcFJlc3VsdFBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UmVzdWx0Rm9yTWFwKHRoaXMuYWxsVHJhY2tSZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5yZW1vdmVTeXN0ZW1Qb2ludCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dGb3JtID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Jlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0TGVmdFR5cGUgPSAnTWFjJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRSaWdodFR5cGUgPSAnRmFjZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhcnIgPSB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5nZXRTeXN0ZW1Qb2ludEZvclBhcmFtcyh0aGlzLnJlc3VsdFBhcmFtcy5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIucmVuZGVyTWFrZXJzKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0TGF5ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRHcm91cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYWNrUmVzdWx0Rm9yTWFwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc29ydExldHRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc2V0Q2hlY2tSaWdodFJlc3VsdCh0aGlzLnJlc3VsdFBhcmFtcy5wYWdlU2l6ZSwgMCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0FuYWx5c2lzTGlzdEZuKGZsYWc6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLnNob3dBbmFseXNpc0xpc3QgPSBmbGFnO1xyXG4gICAgICAgIGlmIChmbGFnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0QWNjb21wT2ZmTGluZUxpc3QoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDlvLnmoYbpgInmi6nmkYTlg4/mnLpcclxuICAgIHNlbGVjdENhbWVyYSgpIHtcclxuICAgICAgICBsZXQgc2NvcGU6IHsgc2VsZWN0Q2FtZXJhTGlzdDogQXJyYXk8c3RyaW5nPiwgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUuc2VsZWN0Q2FtZXJhTGlzdCA9IHRoaXMuQWNjb21wYW55aW5nQW5hbHlzaXNQYXJhbXMuYXJyQ2FtZXJhSWQ7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGF5ZXJJbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IHBvcHVwSHRtbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICB0aXRsZTogXCLmkYTlg4/mnLrpgInmi6lcIixcclxuICAgICAgICAgICAgYXJlYTogW1wiNzEwcHhcIiwgXCI2MjBweFwiXSxcclxuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5qGG6YCJ6K6+5aSHXHJcbiAgICBEcmF3UmVjdCgpIHtcclxuICAgICAgICB0aGlzLkNsZWFyRHJhdygpO1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmRyYXdSZWN0KChwb2ludHM6IEFycmF5PFN5c3RlbVBvaW50PikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdldENhbWVyYUxpc3RGb3JNYXAocG9pbnRzKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgRHJhd0NpcmNsZSgpIHtcclxuICAgICAgICB0aGlzLkNsZWFyRHJhdygpO1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmRyYXdDaXJjbGUoKHBvaW50czogQXJyYXk8U3lzdGVtUG9pbnQ+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q2FtZXJhTGlzdEZvck1hcChwb2ludHMpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBEcmF3UG9seWdvbigpIHtcclxuICAgICAgICB0aGlzLkNsZWFyRHJhdygpO1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmRyYXdQb2x5Z29uKChwb2ludHM6IEFycmF5PFN5c3RlbVBvaW50PikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdldENhbWVyYUxpc3RGb3JNYXAocG9pbnRzKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgQ2xlYXJEcmF3KCkge1xyXG4gICAgICAgIHRoaXMuQWNjb21wYW55aW5nQW5hbHlzaXNQYXJhbXMuYXJyQ2FtZXJhSWQgPSBbXTtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5jbGVhckRyYXcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE8g5YWs5YWx6I635Y+W5pGE5YOP5py6SUTmlrnms5XvvIjlnLDlm77moYbpgInvvIlcclxuICAgIGdldENhbWVyYUxpc3RGb3JNYXAocG9pbnRzOiBBcnJheTxTeXN0ZW1Qb2ludD4pIHtcclxuICAgICAgICBwb2ludHMuZm9yRWFjaCgocG9pbnQ6IFN5c3RlbVBvaW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChwb2ludC5PYmplY3RUeXBlID09PSAnY2FtZXJhJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BY2NvbXBhbnlpbmdBbmFseXNpc1BhcmFtcy5hcnJDYW1lcmFJZC5wdXNoKHBvaW50Lk9iamVjdElEKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5BY2NvbXBhbnlpbmdBbmFseXNpc1BhcmFtcy5hcnJDYW1lcmFJZCA9IEFycmF5VW5pcXVlKHRoaXMuQWNjb21wYW55aW5nQW5hbHlzaXNQYXJhbXMuYXJyQ2FtZXJhSWQpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0Q2FtZXJhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g6YCJ5oup5p+l6K+i57G75Z6LXHJcbiAgICAgKiBAcGFyYW0gc2VsXHJcbiAgICAgKi9cclxuICAgIHNlbGVjdFF1ZXJ5VHlwZShzZWw6IGFueSkge1xyXG4gICAgICAgIHRoaXMucXVlcnlQYXJhbXMucXVlcnlNYWNUeXBlID0gc2VsLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOaOkuW6j+aWueW8j1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLy/mjpLluo/mlrnlvI9cclxuICAgICAqL1xyXG4gICAgc29ydFJldWx0KHR5cGU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBzZWxmLmlzU29ydExldHRlciA9IHRydWU7XHJcblxyXG4gICAgICAgIHNlbGYuY2xlYXJSZXN1bHRNYXJrZXJzSW5mbygpO1xyXG4gICAgICAgIGxldCBhbGxSZXN1bHRMaXN0OiBhbnkgPSBzZWxmLlJlc3VsdFBhZ2luYXRpb24uZ2V0KCk7XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IFwic2NvcmVcIikge1xyXG4gICAgICAgICAgICBzZWxmLnJlc3VsdFNvcnQgPSB0cnVlO1xyXG4gICAgICAgICAgICBhbGxSZXN1bHRMaXN0ID0gXy5zb3J0QnkoYWxsUmVzdWx0TGlzdCwgZnVuY3Rpb24gKGl0ZW06IGFueSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC1pdGVtLlNjb3JlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwidGltZVwiKSB7XHJcbiAgICAgICAgICAgIHNlbGYucmVzdWx0U29ydCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBhbGxSZXN1bHRMaXN0ID0gXy5zb3J0QnkoYWxsUmVzdWx0TGlzdCwgZnVuY3Rpb24gKGl0ZW06IGFueSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC0oRGF0ZS5wYXJzZShpdGVtLkFjY2Vzc0xvZy5Mb2dUaW1lKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLlJlc3VsdFBhZ2luYXRpb24uc2V0KGFsbFJlc3VsdExpc3QpO1xyXG4gICAgICAgIGlmIChzZWxmLnNob3dBbGxSZXN1bHQpIHtcclxuICAgICAgICAgICAgc2VsZi5yZXN1bHRQYXJhbXMucGFnZVNpemUgPSA0MDtcclxuICAgICAgICAgICAgc2VsZi5yZXN1bHRQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgICAgICBzZWxmLnJlc3VsdFBhcmFtcyA9IHNlbGYuUmVzdWx0UGFnaW5hdGlvbi5nZXRCeVBhZ2Uoc2VsZi5yZXN1bHRQYXJhbXMpO1xyXG4gICAgICAgICAgICBzZWxmLmFsbFRyYWNrUmVzdWx0ID0gc2VsZi5yZXN1bHRQYXJhbXMuYWxsRGF0YTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZWxmLnJlc3VsdFBhcmFtcy5wYWdlU2l6ZSA9IDY7XHJcbiAgICAgICAgICAgIHNlbGYucmVzdWx0UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICAgICAgc2VsZi5yZXN1bHRQYXJhbXMgPSBzZWxmLlJlc3VsdFBhZ2luYXRpb24uZ2V0QnlQYWdlKHNlbGYucmVzdWx0UGFyYW1zKTtcclxuICAgICAgICAgICAgc2VsZi5hbGxUcmFja1Jlc3VsdCA9IHNlbGYucmVzdWx0UGFyYW1zLmFsbERhdGE7XHJcbiAgICAgICAgICAgIHNlbGYuc2V0UmVzdWx0Rm9yTWFwKHNlbGYuYWxsVHJhY2tSZXN1bHQpO1xyXG4gICAgICAgICAgICBsZXQgYXJyID0gc2VsZi5hbmFseXNpc01tYXBTZXJ2ZXIuZ2V0U3lzdGVtUG9pbnRGb3JQYXJhbXMoc2VsZi5yZXN1bHRQYXJhbXMuZGF0YSk7XHJcbiAgICAgICAgICAgIHNlbGYuYW5hbHlzaXNNbWFwU2VydmVyLnJlbmRlck1ha2VycyhcclxuICAgICAgICAgICAgICAgIE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdExheWVyLFxyXG4gICAgICAgICAgICAgICAgT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0R3JvdXAsXHJcbiAgICAgICAgICAgICAgICB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYXJyLFxyXG4gICAgICAgICAgICAgICAgc2VsZi50cmFja1Jlc3VsdEZvck1hcCxcclxuICAgICAgICAgICAgICAgIHNlbGYuaXNTb3J0TGV0dGVyLFxyXG4gICAgICAgICAgICAgICAgc2VsZi5zb3J0TGV0dGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOa4suafk3dpZmkgbWFrZXJzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF5ZXJOYW1lIOWbvuWxguWQjeensFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGdyb3VwTmFtZSDngrnkvY3nu4TlkI3np7BcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNDbGVhciDmmK/lkKbmuIXmpZrkuYvliY3nmoRNYWtlclxyXG4gICAgICogQHBhcmFtIHtBcnJheTxTeXN0ZW1Qb2ludD59IHJlc3VsdCDngrnkvY3kv6Hmga9cclxuICAgICAqIEBwYXJhbSB7TWFwUmVzdWx0fSByZXN1bHRGb3JNYXAg57uT5p6cTWFw5a+56LGhXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGZsYWcg5piv5ZCm6Ieq5a6a5LmJ5paH5a2XIOS4jeepv+acquaVsOe7hGluZGV45LiL5qCHXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IGxhYmxlcyDnjrDlnKjlnLDlm77nu5PmnpzmloflrZdcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpY29uIOaYvuekuuS9k+i0tE1ha2VyIOWbvuagh1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbmRlcldpZmlNYWtlcnMobGF5ZXJOYW1lOiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBOYW1lOiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDbGVhcjogYm9vbGVhbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IEFycmF5PFN5c3RlbVBvaW50PixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRGb3JNYXA6IGFueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnPzogYm9vbGVhbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJsZXM/OiBBcnJheTxzdHJpbmc+LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb24/OiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoaXNDbGVhcikge1xyXG4gICAgICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5nZXRNYXAoKS5yZW1vdmVPdmVybGF5c0J5TmFtZShsYXllck5hbWUsIGdyb3VwTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmdldE1hcCgpLmFkZE92ZXJsYXlzRm9yTWFrZXJzKGxheWVyTmFtZSwgZ3JvdXBOYW1lLCByZXN1bHQsIHtcclxuICAgICAgICAgICAgY2xpY2s6IChtYXJrZXI6IE5QTWFwTGliLlN5bWJvbHMuTWFya2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IG1hcmtlci5nZXREYXRhKCkgYXMgYW55O1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDogQ2FjaGVSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ3JvdXBOYW1lID09PSBPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRHcm91cCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMudHJhY2tSZXN1bHRGb3JNYXBbZGF0YS5yZXN1bHRJRF0gYXMgQ2FjaGVSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuYWNjcFRyYWNrUmVzdWx0Rm9yTWFwW2RhdGEucmVzdWx0SURdIGFzIENhY2hlUmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuRGV0YWlsUG9wdXAocmVzdWx0LCByZXN1bHQucmVzdWx0SW5kZXgsIGdyb3VwTmFtZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1vdXNlT3ZlcjogKG1hcmtlcjogTlBNYXBMaWIuU3ltYm9scy5NYXJrZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gbWFya2VyLmdldERhdGEoKSBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OiBDYWNoZVJlc3VsdDtcclxuICAgICAgICAgICAgICAgIGlmIChncm91cE5hbWUgPT09IE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdEdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy50cmFja1Jlc3VsdEZvck1hcFtkYXRhLnJlc3VsdElEXSBhcyBDYWNoZVJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5hY2NwVHJhY2tSZXN1bHRGb3JNYXBbZGF0YS5yZXN1bHRJRF0gYXMgQ2FjaGVSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcmtlcldpbmluZm8gPSB0aGlzLmNyZWF0ZU1hcFBvcHVwKG1hcmtlci5nZXRQb3NpdGlvbigpLCByZXN1bHQsIFdpblBvcHVwVHlwZS5UcmFjaywgXCJSaWdodFwiKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbW91c2VPdXQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmdldE1hcCgpLmdldEluZm9XaW5kb3dCeUlEKHRoaXMubWFya2VyV2luaW5mbykuY2xvc2UoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaWNvblVSTDogaWNvblxyXG4gICAgICAgIH0sIGZsYWcsIGxhYmxlcyk7XHJcbiAgICAgICAgLy8gdGhpcy5yZXN1bHRUb1N5c3RlbVBvaW50cyA9IHJlc3VsdDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5riF6Zmk5Zyw5Zu+5LiK5Zu+5bGC5L+h5oGvXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2xlYXJPdGhlckluZm8oKSB7XHJcbiAgICAgICAgdGhpcy5DbGVhckRyYXcoKTsgLy8g5riF6Zmk5qGG6YCJ5Yy65Z+f5YaF5a65XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIuY2xlYXJSZXN1bHRNYXJrZXJzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmNsZWFyRHJhdygpO1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmNsZWFyVHJhY2VBbmFseXplKCk7XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIuY2xlYXJUcmFja0luZm9XaW5kb3coKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhclJlc3VsdE1hcmtlcnNJbmZvKCkge1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmNsZWFyUmVzdWx0TWFya2VycygpO1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmNsZWFyVHJhY2VBbmFseXplKCk7XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIuY2xlYXJUcmFja0luZm9XaW5kb3coKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhckFjY3BNYXJrZXJzSW5mbygpIHtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5jbGVhckFjY3BNYXJrZXJzKCk7XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIuY2xlYXJUcmFjZUFuYWx5emUoKTtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5jbGVhckFjY3BUcmFja0luZm9XaW5kb3coKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDmlLbol4/kuI7lj5bmtojmlLbol49cclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIGNsaWNrQ29sbGVjdChldmVudDogYW55LCBpdGVtOiBhbnkpIHtcclxuICAgICAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAoIWl0ZW0uY29sbGVjdFN0YXR1cykge1xyXG4gICAgICAgICAgICBsZXQgcGFyYW1zOiBhbnk7XHJcbiAgICAgICAgICAgIGxldCBuZXdJdGVtOiBhbnk7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLkFjY2Vzc0xvZykge1xyXG4gICAgICAgICAgICAgICAgbmV3SXRlbSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICBwYXJhbXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAganNvbjogYW5ndWxhci50b0pzb24oaXRlbSksXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0SUQ6IGl0ZW0uQWNjZXNzTG9nLklELFxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IFwiRmFjZVwiXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uTWFjKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdJdGVtID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZmlMb2c6IGl0ZW0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGV2aWNlSW5mbzogaXRlbS5kZXZpY2VJbmZvXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGpzb246IEpTT04uc3RyaW5naWZ5KG5ld0l0ZW0pLFxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdElEOiBpdGVtLklELFxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IFwiRmFjZVwiXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uSU1FSSkge1xyXG4gICAgICAgICAgICAgICAgbmV3SXRlbSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBlRmVuY2VMb2c6IGl0ZW0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGV2aWNlSW5mbzogaXRlbS5kZXZpY2VJbmZvXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGpzb246IEpTT04uc3RyaW5naWZ5KG5ld0l0ZW0pLFxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdElEOiBpdGVtLklELFxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IFwiRmFjZVwiXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGYucmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLmNvbGxlY3RBZGRJbmZvKHBhcmFtcylcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcGFyYW1zOiBhbnk7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLkFjY2Vzc0xvZykge1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkczogaXRlbS5BY2Nlc3NMb2cuSURcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5NYWMpIHtcclxuICAgICAgICAgICAgICAgIHBhcmFtcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBpZHM6IGl0ZW0uSURcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5JTUVJKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWRzOiBpdGVtLklEXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGYucmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLmNvbGxlY3REZWxldGVJbmZvKHBhcmFtcylcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaXRlbS5jb2xsZWN0U3RhdHVzID0gIWl0ZW0uY29sbGVjdFN0YXR1cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDliIbmnpBcclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIGNsaWNrQW5hbHlzaXMoZXZlbnQ6YW55LCBpdGVtOmFueSwgdHlwZTpzdHJpbmcpIHtcclxuICAgICAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzdG9yYWdlUGFyYW1zOiBBbmFseXNpc1N0b3JhZ2VQYXJhbXMgPSBBbmFseXNpc0RhdGFUeXBlLkZhY2U7XHJcbiAgICAgICAgc3RvcmFnZVBhcmFtcy5kYXRhID0gaXRlbTtcclxuICAgICAgICB0aGlzLmhhbmRsZVN0b3JhZ2Uuc2V0U2Vzc2lvblN0b3JhZ2VEYXRhKHN0b3JhZ2VQYXJhbXMua2V5LCBzdG9yYWdlUGFyYW1zKTtcclxuICAgICAgICBpZiAodHlwZSA9PT0gQW5hbHlzaXNHb1RvVHlwZS5UcmFjay5rZXkpIHtcclxuICAgICAgICAgICAgd2luZG93Lm9wZW4oQW5hbHlzaXNHb1RvVHlwZS5UcmFjay5kYXRhKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IEFuYWx5c2lzR29Ub1R5cGUuQWNjb21wYW55aW5nLmtleSkge1xyXG4gICAgICAgICAgICB3aW5kb3cub3BlbihBbmFseXNpc0dvVG9UeXBlLkFjY29tcGFueWluZy5kYXRhKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IEFuYWx5c2lzR29Ub1R5cGUuRnJlcXVlbmN5LmtleSkge1xyXG4gICAgICAgICAgICB3aW5kb3cub3BlbihBbmFseXNpc0dvVG9UeXBlLkZyZXF1ZW5jeS5kYXRhKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IEFuYWx5c2lzR29Ub1R5cGUuTW9yZS5rZXkpIHtcclxuICAgICAgICAgICAgd2luZG93Lm9wZW4oQW5hbHlzaXNHb1RvVHlwZS5Nb3JlLmRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDluIPmjqfkuI7lj5bmtojluIPmjqdcclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIGNsaWNrU3VydmVpbGxhbmNlKGV2ZW50OiBhbnksIGl0ZW06IGFueSkge1xyXG4gICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaXRlbS5zdXJ2ZWlsbGFuY2VTdGF0dXMgPSAhaXRlbS5zdXJ2ZWlsbGFuY2VTdGF0dXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Yqg6L295Lit5Yqo55S7XHJcbiAgICBpbml0TG9hZGluZ1BvcCgpIHtcclxuICAgICAgICBsZXQgc2NvcGU6IHsgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGF5ZXJJbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGxvYWRpbmdBbmFseXNpc0h0bWwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgdGl0bGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhcmVhOiBbJzUwMHB4JywgXCIyODBweFwiXSxcclxuICAgICAgICAgICAgZW5kOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbuWkmuS6uuiEuOmAieaLqVxyXG4gICAgICogQHBhcmFtIGZhY2VJbmZvXHJcbiAgICAgKiBAcGFyYW0gZmlsZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbXVsdGlVc2VyU2VsZWN0KGZhY2VJbmZvOiBhbnksIGZpbGU6IGFueSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgc2NvcGU6IHsgbGF5ZXI6IGFueTsgaW5kZXg6IHN0cmluZywgJGRlc3Ryb3k6IEZ1bmN0aW9uLCBkYXRhOiBhbnksIGZpbGU6IGFueSwgY29tbWFuZFR5cGU6IHN0cmluZywgZGV0ZWN0VHlwZTogc3RyaW5nLCBsYXllckluZGV4OiBhbnksIGZyb21TZWxlY3RGYWNlQ3RybDogc3RyaW5nIH0gPSBzZWxmLiRzY29wZS4kbmV3KCk7XHJcblxyXG4gICAgICAgIHNjb3BlLmluZGV4ID0gbnVsbDtcclxuICAgICAgICBzY29wZS5kYXRhID0gZmFjZUluZm87XHJcbiAgICAgICAgc2NvcGUuZmlsZSA9IGZpbGU7XHJcbiAgICAgICAgc2NvcGUuY29tbWFuZFR5cGUgPSBcIlNlYXJjaEFjY2Vzc0xvZ1wiO1xyXG4gICAgICAgIHNjb3BlLmRldGVjdFR5cGUgPSBcIkZhY2VcIjtcclxuICAgICAgICBzY29wZS5mcm9tU2VsZWN0RmFjZUN0cmwgPSBzZWxmLnNlbGVjdEZhY2VDdHJsO1xyXG5cclxuICAgICAgICBzY29wZS5sYXllckluZGV4ID0gc2VsZi5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgc2tpbjogJ25vLXNjcm9sbCcsXHJcbiAgICAgICAgICAgIHRpdGxlOiBbJ+S6uuiEuOmAieaLqScsICdmb250LXdlaWdodDogYm9sZDtiYWNrZ3JvdW5kLWNvbG9yOiAjRjZGOEZCO2NvbG9yOiAjNjA2MDYwO2hlaWdodDogNDBweDsnXSxcclxuICAgICAgICAgICAgYXJlYTogWyc0MDBweCcsICczMTBweCddLFxyXG4gICAgICAgICAgICBjb250ZW50OiBzZWxlY3RGYWNlUG9wdXBIdG1sLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbuS6uuiEuOagh+azqFxyXG4gICAgICogQHBhcmFtIGZhY2VJbmZvXHJcbiAgICAgKiBAcGFyYW0gZmlsZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmFjZURlbWFyY2F0ZShmYWNlSW5mbzogYW55LCBmaWxlOiBhbnkpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IGxheWVyOiBhbnk7IGluZGV4OiBzdHJpbmcsICRkZXN0cm95OiBGdW5jdGlvbiwgZGF0YTogYW55LCBmaWxlOiBhbnksIGNvbW1hbmRUeXBlOiBzdHJpbmcsIGRldGVjdFR5cGU6IHN0cmluZywgbGF5ZXJJbmRleDogYW55LCBmcm9tRGVtYXJjYXRlRmFjZUN0cmw6IHN0cmluZywgZmxhZzogYm9vbGVhbiB9ID0gc2VsZi4kc2NvcGUuJG5ldygpO1xyXG5cclxuICAgICAgICBzY29wZS5pbmRleCA9IG51bGw7XHJcbiAgICAgICAgc2NvcGUuZGF0YSA9IGZhY2VJbmZvO1xyXG4gICAgICAgIHNjb3BlLmZpbGUgPSBmaWxlO1xyXG4gICAgICAgIHNjb3BlLmNvbW1hbmRUeXBlID0gXCJTZWFyY2hBY2Nlc3NMb2dcIjtcclxuICAgICAgICBzY29wZS5kZXRlY3RUeXBlID0gXCJGYWNlXCI7XHJcbiAgICAgICAgc2NvcGUuZnJvbURlbWFyY2F0ZUZhY2VDdHJsID0gc2VsZi5zZWxlY3RGYWNlQ3RybDtcclxuICAgICAgICBzY29wZS5mbGFnID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHNjb3BlLmxheWVySW5kZXggPSBzZWxmLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBza2luOiAnbm8tc2Nyb2xsJyxcclxuICAgICAgICAgICAgdGl0bGU6IFsn5Lq66IS45qCH5rOoJywgJ2ZvbnQtd2VpZ2h0OiBib2xkO2JhY2tncm91bmQtY29sb3I6ICNGNkY4RkI7Y29sb3I6ICM2MDYwNjA7aGVpZ2h0OiA0MHB4OyddLFxyXG4gICAgICAgICAgICBhcmVhOiBbJzY1MHB4JywgJzU1NXB4J10sXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGRlbWFyY2F0ZVBvcHVwSHRtbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmn6XnnIvlhajlm75cclxuICAgIHB1YmxpYyBmdWxsU2NyZWVuKGV2ZW50OiBhbnksIHBhdGg6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IGxheWVyOiBhbnk7IGluZGV4OiBzdHJpbmcsIHBhdGg6IGFueSwgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUuaW5kZXggPSBcImZ1bGxTY3JlZW5Qb3B1cFwiO1xyXG4gICAgICAgIHNjb3BlLnBhdGggPSBwYXRoO1xyXG4gICAgICAgIGlmIChwYXRoKSB7XHJcbiAgICAgICAgICAgIGxldCB3aW5kb3dXOiBhbnkgPSAkKHdpbmRvdykud2lkdGgoKSAqIDAuODtcclxuICAgICAgICAgICAgbGV0IHdpbmRvd0g6IGFueSA9ICQod2luZG93KS5oZWlnaHQoKSAqIDAuODtcclxuICAgICAgICAgICAgbGV0IGNvbnRlbnRIVE1MID0gYDxpbWcgbmctc3JjPSR7cGF0aH0gc3R5bGU9J3dpZHRoOiR7d2luZG93V31weDtoZWlnaHQ6JHt3aW5kb3dIfXB4Oyc+YDtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjbG9zZUJ0bjogMCxcclxuICAgICAgICAgICAgICAgIHNraW46ICdsYXl1aS1sYXllci1ub2JnIG5vLXNjcm9sbCcsXHJcbiAgICAgICAgICAgICAgICBzaGFkZUNsb3NlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2hhZGU6IDAuNixcclxuICAgICAgICAgICAgICAgIGFyZWE6IFt3aW5kb3dXICsgJ3B4Jywgd2luZG93SCArICdweCddLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogY29udGVudEhUTUwsXHJcbiAgICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLm1zZyhcIuWbvueJh+WcsOWdgOS4jeWtmOWcqFwiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVJbWFnZSgpIHtcclxuICAgICAgICB0aGlzLnF1ZXJ5UGFyYW1zLmltYWdlUGF0aCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5xdWVyeVBhcmFtcy50YXNrSWQgPSBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHVwbG9hZEltYWdlKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGZyb20gPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBmcm9tLmFwcGVuZCgnaW1hZ2UnLCBldmVudC50YXJnZXQuZmlsZXNbMF0pO1xyXG4gICAgICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgICAgICBzdG9yZVR5cGU6IFwiTE9DXCIsXHJcbiAgICAgICAgICAgIGltYWdlQ2F0ZWdvcnk6IFwiQ2FwdHVyZUltYWdlXCIsXHJcbiAgICAgICAgICAgIGNvbW1hbmRUeXBlOiBcIlNlYXJjaEZhY2VQZXJjZWl2ZUNvbGxpc2lvblwiLFxyXG4gICAgICAgICAgICBkZXRlY3RUeXBlOiBcIkZhY2VcIlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy51cGxvYWRJbWFnZVNlcnZpY2UudXBsb2FkSW1hZ2VGb3JGYWNlKGZyb20sIGRhdGEpLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICgocmVzLmNvZGUgPT09IDIwMCkgJiYgKHJlcy5kYXRhICYmIHJlcy5kYXRhLmtleSkpIHsgLy8g5Lq66IS46K+G5Yir5oiQ5YqfXHJcbiAgICAgICAgICAgICAgICBzZWxmLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnF1ZXJ5UGFyYW1zLmltYWdlUGF0aCA9IHJlcy5kYXRhLmltYWdldXJsO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucXVlcnlQYXJhbXMudGFza0lkID0gcmVzLmRhdGEua2V5O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHJlcy5jb2RlID09PSAyMDApICYmIChyZXMuZGF0YS5mYWNlSW5mbykpIHsvLyDkurrohLjpgInmi6lcclxuICAgICAgICAgICAgICAgIGxldCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgICAgICAgaW1hZ2Uuc3JjID0gJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJytyZXMuZGF0YS5pbWFnZTtcclxuICAgICAgICAgICAgICAgIGltYWdlLm9ubG9hZCA9ICgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiX2luZm9cIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBpbWFnZS53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IGltYWdlLmhlaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLm11bHRpVXNlclNlbGVjdChyZXMuZGF0YSwgZmlsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHJlcy5jb2RlID09PSAyMDApICYmIChyZXMuZGF0YS5pbWFnZSkpIHsgLy8g5Lq66IS46K+G5Yir5aSx6LSl5b6F5qCH5a6aXHJcbiAgICAgICAgICAgICAgICBsZXQgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICAgICAgICAgIGltYWdlLnNyYyA9ICdkYXRhOmltYWdlL2pwZWc7YmFzZTY0LCcrcmVzLmRhdGEuaW1hZ2U7XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5vbmxvYWQgPSAoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWxlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIl9pbmZvXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogaW1hZ2Uud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBpbWFnZS5oZWlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5mYWNlRGVtYXJjYXRlKHJlcy5kYXRhLCBmaWxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubGF5ZXJEZWMud2FybkluZm8oJ+S6uuiEuOivhuWIq+Wksei0pScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCdGYWNlTWFjQ3Jhc2hDb250cm9sbGVyJywgRmFjZU1hY0NyYXNoQ29udHJvbGxlcik7XHJcbiJdfQ==
