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
define(["require", "exports", "text!../../selectPopup/treeCamera/Tree.camera.popup.html", "text!../../selectPopup/checkAreaPopup/check.area.popup.html", "text!../../common/faceHandlePopup/selectFace.popup.html", "text!../../common/faceHandlePopup/demarcate.popup.html", "text!../loading/loading.html", "../../common/app/main.app", "../AnalysisEnum", "../../common/Pagination", "../../../core/entity/FaceTrackEnum", "../../../core/server/enum/SocketResultTypeEnum", "../../../core/enum/ObjectType", "../../../core/server/enum/AnalysisDataType", "lodash", "../../common/services/resourceRetrieval.service", "../main/analysisMmap.server", "../../common/factory/layerMsg.factory", "../../common/factory/socket.factory", "../../common/services/analysis.service", "../../common/factory/HandleStorage.factory", "../../common/services/uploadImage.service", "../../common/factory/userinfo.cache.factory", "../../selectPopup/treeCamera/Tree.camera.popup", "../../selectPopup/checkAreaPopup/check.area.popup.controller", "../TrackPopup/track.popup.controller", "../TrackPopupDetail/track.popup.detail.controller"], function (require, exports, cameraTreePopupHtml, PopupHtml, selectFacePopupHtml, demarcatePopupHtml, loadingAnalysisHtml, main_app_1, AnalysisEnum_1, Pagination_1, FaceTrackEnum_1, SocketResultTypeEnum_1, ObjectType_1, AnalysisDataType_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CacheResult = (function (_super) {
        __extends(CacheResult, _super);
        function CacheResult() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CacheResult;
    }(FaceTrackEnum_1.Result));
    var FaceTrackController = (function () {
        function FaceTrackController($scope, analysisMmapServer, $timeout, analysisService, layer, socketFactory, layerDec, resourceRetrievalService, handleStorage, uploadImageService, userInfoCacheFactory) {
            this.$scope = $scope;
            this.analysisMmapServer = analysisMmapServer;
            this.$timeout = $timeout;
            this.analysisService = analysisService;
            this.layer = layer;
            this.socketFactory = socketFactory;
            this.layerDec = layerDec;
            this.resourceRetrievalService = resourceRetrievalService;
            this.handleStorage = handleStorage;
            this.uploadImageService = uploadImageService;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.$inject = ['$scope', 'analysisMmapServer', '$timeout', 'analysisService', 'layer', 'socketFactory', 'layerDec', "resourceRetrievalService", 'handleStorage', 'uploadImageService', 'userInfoCacheFactory'];
            this.FastDateList = AnalysisEnum_1.getdataList();
            this.SexDateList = AnalysisEnum_1.getSexDataList();
            this.GlassDateList = AnalysisEnum_1.getGlassesDataList();
            this.MaskDateList = AnalysisEnum_1.getMaskDataList();
            this.AgeDataList = AnalysisEnum_1.getAgeList();
            this.FastDate = AnalysisEnum_1.dataLists.today;
            this.SexDate = AnalysisEnum_1.SexData.all;
            this.GlassDate = AnalysisEnum_1.GlassesData.all;
            this.MaskDate = AnalysisEnum_1.MaskData.all;
            this.minSacle = 80;
            this.Sacle = 100;
            this.windowWidth = AnalysisEnum_1.getWidowSize().width - 60;
            this.showForm = true;
            this.showImageRes = false;
            this.showTrackRes = false;
            this.showAllResult = false;
            this.resultSort = true;
            this.isSortLetter = true;
            this.sortLetter = ['A', 'B', 'C', 'D', 'E', 'F'];
            this.trackResult = new Pagination_1.PageParamsAndResult();
            this.pagination = new Pagination_1.Pagination();
            this.arrCameraId = [];
            this.socketNum = 0;
            this.socketQueryList = [];
            this.socketResultList = [];
            this.selectDeviceCb = "close.device.popup";
            this.selectFaceCtrl = "get-face-info-quick";
            this.analysisGoTo = AnalysisDataType_1.AnalysisGoToType;
            var self = this;
            self.initParams();
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
                self.unbindSocket();
            });
            self.$scope.$on(self.selectFaceCtrl, function (event, data) {
                var item = {
                    id: data.data.key,
                    path: data.data.imageurl
                };
                self.$timeout(function () {
                    self.FaceTrackParams.imagePathList.push(item);
                    self.FaceTrackParams.imagePath = item.path;
                    self.FaceTrackParams.taskId = item.id;
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
        }
        FaceTrackController.prototype.initParams = function () {
            var self = this;
            self.FastDate = AnalysisEnum_1.dataLists.today;
            self.SexDate = AnalysisEnum_1.SexData.all;
            self.GlassDate = AnalysisEnum_1.GlassesData.all;
            self.MaskDate = AnalysisEnum_1.MaskData.all;
            self.arrCameraId = [];
            var params = new FaceTrackEnum_1.FaceTrackParams();
            params.arrCameraId = [];
            params.imagePathList = [];
            params.arrEyeGlasses = [];
            params.arrMask = [];
            params.arrGender = [];
            params.startTime = this.FastDate.value.startTime;
            params.endTime = this.FastDate.value.endTime;
            if (typeof self.FaceTrackParams === 'undefined') {
                params.threshold = 90;
            }
            else {
                params.threshold = self.FaceTrackParams.threshold;
            }
            var AnalysisData = this.handleStorage.getSessionStorageData(AnalysisDataType_1.AnalysisDataType.Face.key);
            var item;
            if (AnalysisData) {
                item = {
                    id: AnalysisData.data.AccessLog.ID,
                    path: AnalysisData.data.AccessLog.FacePath
                };
                params.imagePathList.push(item);
                this.handleStorage.removeSessionStorageData(AnalysisDataType_1.AnalysisDataType.Face.key);
            }
            AnalysisData = this.handleStorage.getSessionStorageData(AnalysisDataType_1.AnalysisDataType.FaceLibrary.key);
            if (AnalysisData) {
                item = {
                    id: AnalysisData.data.PersonInfo.ID,
                    path: AnalysisData.data.PersonInfo.FacePicPath
                };
                params.imagePathList.push(item);
                this.handleStorage.removeSessionStorageData(AnalysisDataType_1.AnalysisDataType.FaceLibrary.key);
            }
            self.FaceTrackParams = params;
        };
        FaceTrackController.prototype.setFastDate = function (item) {
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
            this.FaceTrackParams.startTime = time.startTime;
            this.FaceTrackParams.endTime = time.endTime;
        };
        FaceTrackController.prototype.selectAge = function (age) {
            if (typeof age !== 'string') {
                this.FaceTrackParams.maxAge = age.value.maxAge;
                this.FaceTrackParams.minAge = age.value.minAge;
            }
            else {
                this.FaceTrackParams.maxAge = null;
                this.FaceTrackParams.minAge = null;
            }
        };
        FaceTrackController.prototype.selectCamera = function () {
            var scope = this.$scope.$new();
            scope.selectCameraList = this.arrCameraId;
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
        FaceTrackController.prototype.DrawRect = function () {
            var _this = this;
            this.analysisMmapServer.drawRect(function (points, geometry) {
                _this.$timeout(function () {
                    _this.DrawCallBackMethod(points, geometry);
                });
            });
        };
        FaceTrackController.prototype.DrawCircle = function () {
            var _this = this;
            this.analysisMmapServer.drawCircle(function (points, geometry) {
                _this.$timeout(function () {
                    _this.DrawCallBackMethod(points, geometry);
                });
            });
        };
        FaceTrackController.prototype.DrawPolygon = function () {
            var _this = this;
            this.analysisMmapServer.drawPolygon(function (points, geometry) {
                _this.$timeout(function () {
                    _this.DrawCallBackMethod(points, geometry);
                });
            });
        };
        FaceTrackController.prototype.ClearDraw = function () {
            this.arrCameraId = [];
            this.analysisMmapServer.clearDraw();
        };
        FaceTrackController.prototype.DrawCallBackMethod = function (points, geometry) {
            var arr = [];
            points.forEach(function (item) {
                if (item.ObjectType === ObjectType_1.ObjectType.Camera.value) {
                    arr.push(item);
                }
            });
            if (arr.length === 0) {
                this.analysisMmapServer.removeDrawShape(geometry);
                return this.layerDec.info('框选区域不存在摄像机设备！');
            }
            else {
                this.checkArea(arr, geometry);
            }
        };
        FaceTrackController.prototype.checkArea = function (deviceList, geometry) {
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
        FaceTrackController.prototype.deviceIdFilter = function (ids, type) {
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
        FaceTrackController.prototype.submitSearch = function () {
            var self = this;
            if (self.FaceTrackParams.imagePathList.length === 0) {
                self.layerDec.warnInfo('请上传图片!');
                return false;
            }
            if (self.FaceTrackParams.endTime < self.FaceTrackParams.startTime) {
                self.layerDec.warnInfo('开始时间不能晚于结束时间!');
                return false;
            }
            if (self.arrCameraId.length > 0) {
                self.FaceTrackParams.arrCameraId = self.arrCameraId;
            }
            else {
                var systemPointList = self.analysisMmapServer.getSystemPoint();
                var cameraList_1 = [];
                _(systemPointList).forEach(function (value) {
                    if (ObjectType_1.ObjectType.Camera.value === value.ObjectType) {
                        cameraList_1.push(value.ObjectID);
                    }
                });
                self.FaceTrackParams.arrCameraId = cameraList_1;
            }
            if (self.SexDate.value) {
                self.FaceTrackParams.arrGender.push(self.SexDate.value);
            }
            if (self.GlassDate.value) {
                self.FaceTrackParams.arrEyeGlasses.push(self.GlassDate.value);
            }
            if (self.MaskDate.value) {
                self.FaceTrackParams.arrMask.push(self.MaskDate.value);
            }
            self.unbindSocket();
            self.socketResultList = [];
            self.socketQueryList = self.FaceTrackParams.imagePathList;
            self.socketNum = self.FaceTrackParams.imagePathList.length;
            self.bindSocketToResult();
            for (var i = 0; i < self.FaceTrackParams.imagePathList.length; i++) {
                var par = angular.copy(self.FaceTrackParams);
                par.imagePath = self.FaceTrackParams.imagePathList[i].path;
                par.taskId = self.FaceTrackParams.imagePathList[i].id;
                self.analysisService.searchFaceTrack(par).then(function (res) {
                    if (res.code !== 200) {
                        self.layerDec.warnInfo('服务请求失败!');
                    }
                });
            }
            self.initParams();
        };
        FaceTrackController.prototype.unbindSocket = function () {
            this.socketFactory.unSubscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.Track);
        };
        FaceTrackController.prototype.bindSocketToResult = function () {
            var self = this;
            self.initLoadingPop();
            self.socketFactory.subscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.Track, function (res) {
                self.layer.close(self.currentLayerIndex);
                if (Array.isArray(res)) {
                    for (var i = 0; i < self.socketQueryList.length; i++) {
                        for (var x = 0; x < res.length; x++) {
                            if ((res[x].code === 200) && (self.socketQueryList[i].id === res[x].data.TaskId)) {
                                res[x].data.path = self.socketQueryList[i].path;
                                self.socketResultList.push(res[x].data);
                                self.socketNum = self.socketNum - 1;
                            }
                        }
                    }
                    if (self.socketNum < 1) {
                        self.unbindSocket();
                    }
                }
            });
            self.goImageResult();
        };
        FaceTrackController.prototype.goImageResult = function () {
            var _this = this;
            this.$timeout(function () {
                _this.showAllResult = false;
                _this.showForm = false;
                _this.showImageRes = true;
                _this.showTrackRes = false;
                _this.isSortLetter = true;
            });
            this.ClearDraw();
        };
        FaceTrackController.prototype.closeAllResult = function () {
            this.showTrackRes = true;
            this.showAllResult = false;
            this.trackResult.currentPage = 1;
            this.trackResult.pageSize = 6;
            this.trackResult = this.pagination.getByPage(this.trackResult);
        };
        FaceTrackController.prototype.goAllResult = function () {
            this.showTrackRes = false;
            this.showAllResult = true;
            this.trackResult.pageSize = 40;
            this.trackResult.currentPage = 1;
            this.trackResult = this.pagination.getByPage(this.trackResult);
        };
        FaceTrackController.prototype.goBack = function () {
            var _this = this;
            this.$timeout(function () {
                _this.$scope.$emit('showItemPage', false);
            });
        };
        FaceTrackController.prototype.goBackForm = function () {
            var _this = this;
            this.$timeout(function () {
                _this.showImageRes = false;
                _this.showImageRes = false;
                _this.showForm = true;
                _this.destoryForMapMarker();
                _this.analysisMmapServer.renderSystemPoint();
            });
        };
        FaceTrackController.prototype.backImageResult = function () {
            var _this = this;
            this.$timeout(function () {
                _this.showAllResult = false;
                _this.showForm = false;
                _this.showImageRes = true;
                _this.showTrackRes = false;
                _this.isSortLetter = true;
                _this.destoryForMapMarker();
                _this.analysisMmapServer.removeSystemPoint();
            });
        };
        FaceTrackController.prototype.delResult = function (ID) {
            var _this = this;
            if (this.pagination.delByPageId(ID)) {
                this.trackResult = this.pagination.getByPage(this.trackResult);
                this.analysisMmapServer.renderMakers(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForResultGroup, true, this.analysisMmapServer.getSystemPointForParams(this.trackResult.data), this.trackResultForMap);
                this.$timeout(function () {
                    _this.allTrackResult = _this.trackResult.allData;
                    _this.setResultForMap(_this.allTrackResult);
                });
            }
        };
        FaceTrackController.prototype.showTrackDetail = function (i, data) {
            var _this = this;
            var self = this;
            self.isSortLetter = true;
            if (data && data.Result && (data.Result.length > 0)) {
                self.destoryForMapMarker();
                self.analysisMmapServer.removeSystemPoint();
                var params_1 = {
                    deviceIds: [],
                    deviceType: '',
                    ids: [],
                    userId: self.userInfoCacheFactory.getCurrentUserId()
                };
                params_1.deviceType = ObjectType_1.ObjectType.Camera.value;
                _.forEach(data.Result, function (value) {
                    params_1.deviceIds.push(value.AccessLog.CameraID);
                    params_1.ids.push(value.AccessLog.ID);
                });
                self.resourceRetrievalService.getDeviceInfoPromise(params_1).then(function (res) {
                    _.forEach(data.Result, function (item, index) {
                        item.deviceInfo = res.data.deviceInfo[index];
                        item.collectStatus = res.data.collectStatus[index];
                    });
                    self.$timeout(function () {
                        self.trackImagePath = data.path;
                        self.pagination.set(data.Result);
                    }).then(function () {
                        self.trackResult.currentPage = 1;
                        self.trackResult.pageSize = 6;
                        self.trackResult = self.pagination.getByPage(self.trackResult);
                        self.allTrackResult = self.trackResult.allData;
                        self.setResultForMap(self.allTrackResult);
                    }).then(function () {
                        self.showForm = false;
                        self.showImageRes = false;
                        self.showTrackRes = true;
                        self.showAllResult = false;
                        self.resultSort = true;
                        var arr = self.analysisMmapServer.getSystemPointForParams(_this.trackResult.data);
                        self.analysisMmapServer.renderMakers(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForResultGroup, true, arr, _this.trackResultForMap, _this.isSortLetter, _this.sortLetter);
                    });
                });
            }
            else {
                this.layerDec.info('没有查询到结果');
            }
        };
        FaceTrackController.prototype.setFaceTrackDetail = function (data) {
            if (data && data.Result && (data.Result.length > 0)) {
                var self_1 = this;
                self_1.analysisMmapServer.removeSystemPoint();
                self_1.allTrackResult = data.Result;
                self_1.setFaceTrack();
            }
            else {
                this.layerDec.info('没有查询到轨迹结果');
            }
        };
        FaceTrackController.prototype.setFaceTrack = function () {
            var self = this;
            self.$timeout(function () {
                self.isSortLetter = false;
                var allResultList = _.sortBy(self.allTrackResult, function (item) {
                    return (Date.parse(item.AccessLog.LogTime));
                });
                self.pagination.set(allResultList);
                self.trackResult.currentPage = 1;
                self.trackResult.pageSize = 6;
                self.trackResult = self.pagination.getByPage(self.trackResult);
                self.allTrackResult = self.trackResult.allData;
                self.setResultForMap(self.allTrackResult);
            }).then(function () {
                var points = self.analysisMmapServer.getSystemPointForParams(self.allTrackResult);
                self.analysisMmapServer.setTrackAnimation(self.allTrackResult, points, self.trackResultForMap);
            });
        };
        FaceTrackController.prototype.setResultForMap = function (result) {
            var obj = {};
            result.forEach(function (item, i) {
                obj[item.AccessLog.ID] = item;
                obj[item.AccessLog.ID].resultIndex = i;
            });
            this.trackResultForMap = obj;
        };
        FaceTrackController.prototype.resultToMap = function (item, index) {
            this.analysisMmapServer.resultToMap(item);
        };
        FaceTrackController.prototype.unResultToMap = function (item, index) {
            this.analysisMmapServer.unResultToMap(item, this.trackResultForMap);
        };
        FaceTrackController.prototype.changeResultPage = function (i) {
            var _this = this;
            this.trackResult.currentPage = i;
            this.trackResult = this.pagination.getByPage(this.trackResult);
            if (this.isSortLetter) {
                this.$timeout(function () {
                    _this.analysisMmapServer.renderMakers(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForResultGroup, true, _this.analysisMmapServer.getSystemPointForParams(_this.trackResult.data), _this.trackResultForMap, _this.isSortLetter, _this.sortLetter);
                });
            }
        };
        FaceTrackController.prototype.sortReult = function (type) {
            var self = this;
            var allResultList = self.pagination.get();
            self.isSortLetter = true;
            self.destoryForMapMarker();
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
            self.pagination.set(allResultList);
            if (self.showTrackRes) {
                self.trackResult.pageSize = 6;
                self.trackResult.currentPage = 1;
            }
            else {
                self.trackResult.pageSize = 40;
                self.trackResult.currentPage = 1;
            }
            self.trackResult = self.pagination.getByPage(self.trackResult);
            self.allTrackResult = self.trackResult.allData;
            self.setResultForMap(self.allTrackResult);
            var arr = self.analysisMmapServer.getSystemPointForParams(this.trackResult.data);
            self.analysisMmapServer.renderMakers(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForResultGroup, true, arr, this.trackResultForMap, this.isSortLetter, this.sortLetter);
        };
        FaceTrackController.prototype.uploadImage = function (event) {
            var self = this;
            var from = new FormData();
            from.append('image', event.target.files[0]);
            var data = {
                storeType: "LOC",
                imageCategory: "CaptureImage",
                commandType: "SearchAccessLog",
                detectType: "Face"
            };
            this.uploadImageService.uploadImageForFace(from, data).then(function (res) {
                if ((res.code === 200) && (res.data && res.data.key)) {
                    var item_1 = {
                        id: res.data.key,
                        path: res.data.imageurl
                    };
                    self.$timeout(function () {
                        self.FaceTrackParams.imagePathList.push(item_1);
                        self.FaceTrackParams.imagePath = item_1.path;
                        self.FaceTrackParams.taskId = item_1.id;
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
        FaceTrackController.prototype.deleteImage = function (i) {
            this.FaceTrackParams.imagePathList.splice(i, 1);
        };
        FaceTrackController.prototype.multiUserSelect = function (faceInfo, file) {
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
        FaceTrackController.prototype.faceDemarcate = function (faceInfo, file) {
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
        FaceTrackController.prototype.openDetailPopup = function (item, index) {
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
        FaceTrackController.prototype.clickCollect = function (event, item) {
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
        FaceTrackController.prototype.clickAnalysis = function (event, item, type) {
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
        FaceTrackController.prototype.clickSurveillance = function (event, item) {
            if (event) {
                event.stopPropagation();
            }
            item.surveillanceStatus = !item.surveillanceStatus;
        };
        FaceTrackController.prototype.fullScreen = function (event, path) {
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
        FaceTrackController.prototype.destoryForMapMarker = function () {
            this.analysisMmapServer.clearTraceAnalyze();
            this.analysisMmapServer.clearResultMarkers();
            this.analysisMmapServer.clearAccpMarkers();
            this.analysisMmapServer.clearTrackInfoWindow();
            this.analysisMmapServer.clearAccpTrackInfoWindow();
        };
        FaceTrackController.prototype.initLoadingPop = function () {
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
        return FaceTrackController;
    }());
    main_app_1.app.controller('FaceTrackController', FaceTrackController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9GYWNlVHJhY2svRmFjZVRyYWNrLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQStEQTtRQUEwQiwrQkFBTTtRQUFoQzs7UUFFQSxDQUFDO1FBQUQsa0JBQUM7SUFBRCxDQUZBLEFBRUMsQ0FGeUIsc0JBQU0sR0FFL0I7SUFFRDtRQXdDSSw2QkFBb0IsTUFBVyxFQUNYLGtCQUF1QyxFQUN2QyxRQUFhLEVBQ2IsZUFBaUMsRUFDakMsS0FBVSxFQUNWLGFBQTZCLEVBQzdCLFFBQW1CLEVBQ25CLHdCQUFtRCxFQUNuRCxhQUE2QixFQUM3QixrQkFBdUMsRUFDdkMsb0JBQTJDO1lBVjNDLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDWCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXFCO1lBQ3ZDLGFBQVEsR0FBUixRQUFRLENBQUs7WUFDYixvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7WUFDakMsVUFBSyxHQUFMLEtBQUssQ0FBSztZQUNWLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtZQUM3QixhQUFRLEdBQVIsUUFBUSxDQUFXO1lBQ25CLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMkI7WUFDbkQsa0JBQWEsR0FBYixhQUFhLENBQWdCO1lBQzdCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBcUI7WUFDdkMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUF1QjtZQWpEL0QsWUFBTyxHQUFrQixDQUFDLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsMEJBQTBCLEVBQUUsZUFBZSxFQUFFLG9CQUFvQixFQUFFLHNCQUFzQixDQUFDLENBQUM7WUFFMU4saUJBQVksR0FBNEIsMEJBQVcsRUFBRSxDQUFDO1lBQ3RELGdCQUFXLEdBQXdCLDZCQUFjLEVBQUUsQ0FBQztZQUNwRCxrQkFBYSxHQUF3QixpQ0FB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TixDQUFDO1FBQ0wsMEJBQUM7SUFBRCxDQWwzQkEsQUFrM0JDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLHFCQUFxQixFQUFFLG1CQUFtQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL0ludGVsbGlnZW50QW5hbHlzaXMvRmFjZVRyYWNrL0ZhY2VUcmFjay5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi8uLi9zZWxlY3RQb3B1cC90cmVlQ2FtZXJhL1RyZWUuY2FtZXJhLnBvcHVwLmh0bWxcIiBuYW1lPVwiY2FtZXJhVHJlZVBvcHVwSHRtbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vLi4vc2VsZWN0UG9wdXAvY2hlY2tBcmVhUG9wdXAvY2hlY2suYXJlYS5wb3B1cC5odG1sXCIgbmFtZT1cIlBvcHVwSHRtbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vLi4vY29tbW9uL2ZhY2VIYW5kbGVQb3B1cC9zZWxlY3RGYWNlLnBvcHVwLmh0bWxcIiBuYW1lPVwic2VsZWN0RmFjZVBvcHVwSHRtbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vLi4vY29tbW9uL2ZhY2VIYW5kbGVQb3B1cC9kZW1hcmNhdGUucG9wdXAuaHRtbFwiIG5hbWU9XCJkZW1hcmNhdGVQb3B1cEh0bWxcIiAvPlxyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uL2xvYWRpbmcvbG9hZGluZy5odG1sXCIgbmFtZT1cImxvYWRpbmdBbmFseXNpc0h0bWxcIiAvPlxyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuXHJcbi8vIOacjeWKoVxyXG5pbXBvcnQgJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9yZXNvdXJjZVJldHJpZXZhbC5zZXJ2aWNlJztcclxuaW1wb3J0IHtJUmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlfSBmcm9tICcuLi8uLi9jb21tb24vc2VydmljZXMvcmVzb3VyY2VSZXRyaWV2YWwuc2VydmljZSc7XHJcbmltcG9ydCBcIi4uL21haW4vYW5hbHlzaXNNbWFwLnNlcnZlclwiO1xyXG5pbXBvcnQge0lBbmFseXNpc01tYXBTZXJ2ZXJ9IGZyb20gXCIuLi9tYWluL2FuYWx5c2lzTW1hcC5zZXJ2ZXJcIjtcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL2ZhY3RvcnkvbGF5ZXJNc2cuZmFjdG9yeVwiO1xyXG5pbXBvcnQge0lMYXllckRlY30gZnJvbSBcIi4uLy4uL2NvbW1vbi9mYWN0b3J5L2xheWVyTXNnLmZhY3RvcnlcIjtcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL2ZhY3Rvcnkvc29ja2V0LmZhY3RvcnlcIjtcclxuaW1wb3J0IHtJU29ja2V0RmFjdG9yeX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9mYWN0b3J5L3NvY2tldC5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hbmFseXNpcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SUFuYWx5c2lzU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hbmFseXNpcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL2ZhY3RvcnkvSGFuZGxlU3RvcmFnZS5mYWN0b3J5JztcclxuaW1wb3J0IHtJSGFuZGxlU3RvcmFnZX0gZnJvbSAnLi4vLi4vY29tbW9uL2ZhY3RvcnkvSGFuZGxlU3RvcmFnZS5mYWN0b3J5JztcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL3VwbG9hZEltYWdlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtJVXBsb2FkSW1hZ2VTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL3VwbG9hZEltYWdlLnNlcnZpY2VcIjtcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL2ZhY3RvcnkvdXNlcmluZm8uY2FjaGUuZmFjdG9yeVwiO1xyXG5pbXBvcnQge0lVc2VySW5mb0NhY2hlRmFjdG9yeX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9mYWN0b3J5L3VzZXJpbmZvLmNhY2hlLmZhY3RvcnlcIjtcclxuXHJcbi8vIOW8ueahhlxyXG5pbXBvcnQgJy4uLy4uL3NlbGVjdFBvcHVwL3RyZWVDYW1lcmEvVHJlZS5jYW1lcmEucG9wdXAnXHJcbmltcG9ydCAnLi4vLi4vc2VsZWN0UG9wdXAvY2hlY2tBcmVhUG9wdXAvY2hlY2suYXJlYS5wb3B1cC5jb250cm9sbGVyJztcclxuaW1wb3J0IFwiLi4vVHJhY2tQb3B1cC90cmFjay5wb3B1cC5jb250cm9sbGVyXCJcclxuaW1wb3J0IFwiLi4vVHJhY2tQb3B1cERldGFpbC90cmFjay5wb3B1cC5kZXRhaWwuY29udHJvbGxlclwiXHJcblxyXG4vLyDlj4LmlbBcclxuaW1wb3J0IHtcclxuICAgIE92ZXJsYXlOYW1lLFxyXG4gICAgRW51bSxcclxuICAgIFRpbWVMZW5ndGgsXHJcbiAgICBBZ2UsXHJcbiAgICBnZXRBZ2VMaXN0LFxyXG4gICAgZ2V0R2xhc3Nlc0RhdGFMaXN0LFxyXG4gICAgZ2V0TWFza0RhdGFMaXN0LFxyXG4gICAgR2xhc3Nlc0RhdGEsXHJcbiAgICBNYXNrRGF0YSxcclxuICAgIGdldFNleERhdGFMaXN0LFxyXG4gICAgZ2V0V2lkb3dTaXplLFxyXG4gICAgU2V4RGF0YSxcclxuICAgIEFycmF5VW5pcXVlLFxyXG4gICAgZGF0YSxcclxuICAgIHRpbWVMZW5ndGgsXHJcbiAgICBnZXRkYXRhTGlzdCxcclxuICAgIGdldEhvdXJzLFxyXG4gICAgZGF0YUxpc3RzXHJcbn0gZnJvbSAnLi4vQW5hbHlzaXNFbnVtJztcclxuaW1wb3J0IHtQYWdlUGFyYW1zQW5kUmVzdWx0LCBQYWdpbmF0aW9uLCBJUGFnaW5hdGlvbn0gZnJvbSBcIi4uLy4uL2NvbW1vbi9QYWdpbmF0aW9uXCI7XHJcbmltcG9ydCB7U3lzdGVtUG9pbnR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9TeXN0ZW1Qb2ludFwiO1xyXG5pbXBvcnQge0ZhY2VUcmFja1BhcmFtcywgUmVzdWx0VHJhY2ssIFJlc3VsdH0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvRmFjZVRyYWNrRW51bSc7XHJcbmltcG9ydCB7QmFja1Jlc3BvbnNlQm9keX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdFwiO1xyXG5pbXBvcnQge1NvY2tldFJlc3VsdFR5cGVFbnVtfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2ZXIvZW51bS9Tb2NrZXRSZXN1bHRUeXBlRW51bVwiO1xyXG5pbXBvcnQge09iamVjdFR5cGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW51bS9PYmplY3RUeXBlJztcclxuaW1wb3J0IHtBbmFseXNpc0RhdGFUeXBlLCBBbmFseXNpc1N0b3JhZ2VQYXJhbXMsIEFuYWx5c2lzR29Ub1R5cGV9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL0FuYWx5c2lzRGF0YVR5cGVcIjtcclxuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XHJcblxyXG5kZWNsYXJlIGxldCBjYW1lcmFUcmVlUG9wdXBIdG1sOiBhbnksIGFuZ3VsYXI6IGFueSwgJDogYW55LCBsb2FkaW5nQW5hbHlzaXNIdG1sOiBhbnksIHNlbGVjdEZhY2VQb3B1cEh0bWw6IGFueSwgZGVtYXJjYXRlUG9wdXBIdG1sOiBhbnksIFBvcHVwSHRtbDogYW55O1xyXG5cclxuY2xhc3MgQ2FjaGVSZXN1bHQgZXh0ZW5kcyBSZXN1bHQge1xyXG4gICAgcmVzdWx0SW5kZXg6IG51bWJlcjtcclxufVxyXG5cclxuY2xhc3MgRmFjZVRyYWNrQ29udHJvbGxlciB7XHJcbiAgICAkaW5qZWN0OiBBcnJheTxzdHJpbmc+ID0gWyckc2NvcGUnLCAnYW5hbHlzaXNNbWFwU2VydmVyJywgJyR0aW1lb3V0JywgJ2FuYWx5c2lzU2VydmljZScsICdsYXllcicsICdzb2NrZXRGYWN0b3J5JywgJ2xheWVyRGVjJywgXCJyZXNvdXJjZVJldHJpZXZhbFNlcnZpY2VcIiwgJ2hhbmRsZVN0b3JhZ2UnLCAndXBsb2FkSW1hZ2VTZXJ2aWNlJywgJ3VzZXJJbmZvQ2FjaGVGYWN0b3J5J107XHJcblxyXG4gICAgRmFzdERhdGVMaXN0OiBBcnJheTxkYXRhPHRpbWVMZW5ndGg+PiA9IGdldGRhdGFMaXN0KCk7XHJcbiAgICBTZXhEYXRlTGlzdDogQXJyYXk8RW51bTxudW1iZXI+PiA9IGdldFNleERhdGFMaXN0KCk7XHJcbiAgICBHbGFzc0RhdGVMaXN0OiBBcnJheTxFbnVtPG51bWJlcj4+ID0gZ2V0R2xhc3Nlc0RhdGFMaXN0KCk7XHJcbiAgICBNYXNrRGF0ZUxpc3Q6IEFycmF5PEVudW08bnVtYmVyPj4gPSBnZXRNYXNrRGF0YUxpc3QoKTtcclxuICAgIEFnZURhdGFMaXN0OiBBcnJheTxFbnVtPEFnZT4+ID0gZ2V0QWdlTGlzdCgpO1xyXG4gICAgRmFzdERhdGU6IGRhdGE8dGltZUxlbmd0aD4gPSBkYXRhTGlzdHMudG9kYXk7XHJcbiAgICBTZXhEYXRlOiBFbnVtPG51bWJlcj4gPSBTZXhEYXRhLmFsbDtcclxuICAgIEdsYXNzRGF0ZTogRW51bTxudW1iZXI+ID0gR2xhc3Nlc0RhdGEuYWxsO1xyXG4gICAgTWFza0RhdGU6IEVudW08bnVtYmVyPiA9IE1hc2tEYXRhLmFsbDtcclxuICAgIG1pblNhY2xlOiBudW1iZXIgPSA4MDtcclxuICAgIFNhY2xlOiBudW1iZXIgPSAxMDA7XHJcbiAgICB3aW5kb3dXaWR0aDogbnVtYmVyID0gZ2V0V2lkb3dTaXplKCkud2lkdGggLSA2MDtcclxuXHJcbiAgICBzaG93Rm9ybTogYm9vbGVhbiA9IHRydWU7Ly8gdHJ1ZTrmmL7npLpmb3Jt6KGo5Y2V5YaF5a65XHJcbiAgICBzaG93SW1hZ2VSZXM6IGJvb2xlYW4gPSBmYWxzZTsgLy8gdHJ1ZTrmmL7npLpzb2NrZXTnu5PmnpzliJfooahcclxuICAgIHNob3dUcmFja1JlczogYm9vbGVhbiA9IGZhbHNlOyAvLyB0cnVlOuaYvuekuui+g+WwkeS6uuiEuOi9qOi/uVxyXG4gICAgc2hvd0FsbFJlc3VsdDogYm9vbGVhbiA9IGZhbHNlOyAvLyB0cnVlOuaYvuekuuabtOWkmuS6uuiEuOi9qOi/uVxyXG4gICAgcmVzdWx0U29ydDogYm9vbGVhbiA9IHRydWU7IC8vIHRydWU65oyJ55u45Ly85bqm5o6S5bqPIGZhbHNlOuaMieaXtumXtOaOkuW6j1xyXG4gICAgaXNTb3J0TGV0dGVyOiBib29sZWFuID0gdHJ1ZTsgLy8gdHJ1ZTrngrnkvY3mjInlrZfmr43mmL7npLogZmFsc2U654K55L2N5oyJ5pWw5a2X5pi+56S6XHJcblxyXG4gICAgRmFjZVRyYWNrUGFyYW1zOiBGYWNlVHJhY2tQYXJhbXM7XHJcbiAgICBjdXJyZW50TGF5ZXJJbmRleDogbnVtYmVyO1xyXG4gICAgdHJhY2tJbWFnZVBhdGg6IHN0cmluZzsgLy8g5p+l55yL6L6D5bCR57uT5p6c5piv5pi+56S65Zu+54mHXHJcbiAgICBzb3J0TGV0dGVyOiBBcnJheTxzdHJpbmc+ID0gWydBJywgJ0InLCAnQycsICdEJywgJ0UnLCAnRiddO1xyXG4gICAgdHJhY2tSZXN1bHQ6IFBhZ2VQYXJhbXNBbmRSZXN1bHQgPSBuZXcgUGFnZVBhcmFtc0FuZFJlc3VsdCgpO1xyXG4gICAgcGFnaW5hdGlvbjogSVBhZ2luYXRpb24gPSBuZXcgUGFnaW5hdGlvbigpO1xyXG4gICAgYWxsVHJhY2tSZXN1bHQ6IEFycmF5PFJlc3VsdD47XHJcbiAgICB0cmFja1Jlc3VsdEZvck1hcDogeyBba2V5OiBzdHJpbmddOiBSZXN1bHQgfCBDYWNoZVJlc3VsdCB9O1xyXG5cclxuICAgIGFyckNhbWVyYUlkOiBBcnJheTxzdHJpbmc+ID0gW107IC8vIOiuvuWkh2lk5YiX6KGoXHJcbiAgICBzb2NrZXROdW06IG51bWJlciA9IDA7XHJcbiAgICBzb2NrZXRRdWVyeUxpc3Q6IEFycmF5PGFueT4gPSBbXTtcclxuICAgIHNvY2tldFJlc3VsdExpc3Q6IEFycmF5PGFueT4gPSBbXTtcclxuICAgIHNlbGVjdERldmljZUNiOiBzdHJpbmcgPSBcImNsb3NlLmRldmljZS5wb3B1cFwiO1xyXG4gICAgc2VsZWN0RmFjZUN0cmw6IHN0cmluZyA9IFwiZ2V0LWZhY2UtaW5mby1xdWlja1wiO1xyXG4gICAgYW5hbHlzaXNHb1RvID0gQW5hbHlzaXNHb1RvVHlwZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBhbmFseXNpc01tYXBTZXJ2ZXI6IElBbmFseXNpc01tYXBTZXJ2ZXIsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGFuYWx5c2lzU2VydmljZTogSUFuYWx5c2lzU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbGF5ZXI6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgc29ja2V0RmFjdG9yeTogSVNvY2tldEZhY3RvcnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGxheWVyRGVjOiBJTGF5ZXJEZWMsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJlc291cmNlUmV0cmlldmFsU2VydmljZTogSVJlc291cmNlUmV0cmlldmFsU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgaGFuZGxlU3RvcmFnZTogSUhhbmRsZVN0b3JhZ2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHVwbG9hZEltYWdlU2VydmljZTogSVVwbG9hZEltYWdlU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgdXNlckluZm9DYWNoZUZhY3Rvcnk6IElVc2VySW5mb0NhY2hlRmFjdG9yeSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgc2VsZi5pbml0UGFyYW1zKCk7XHJcblxyXG4gICAgICAgIHNlbGYuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kZW1pdCgnc2hvd0l0ZW1QYWdlJywgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIOebkeWQrOmhtemdoumUgOavgeS6i+S7tlxyXG4gICAgICAgIHNlbGYuJHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmFuYWx5c2lzTW1hcFNlcnZlci5jbGVhckRyYXcoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuZGVzdG9yeUZvck1hcE1hcmtlcigpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCfop6blj5Hnm7TmjqXplIDmr4FNYXDkuovku7bvvIzlr7zoh7RtYXDlr7nosaHooqvplIDmr4HvvIzovajov7nop6blj5Hoh6rouqvnmoTplIDmr4Hkuovku7bkuK3ml6Dms5Xojrflj5ZtYXDlr7nosaHlr7zoh7TnmoTmiqXplJnvvIzlj6/ku6Xlv73nlaXvvIEnLCBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLnVuYmluZFNvY2tldCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDnm5HlkKzkurrohLjpgInmi6nkuovku7ZcclxuICAgICAgICBzZWxmLiRzY29wZS4kb24oc2VsZi5zZWxlY3RGYWNlQ3RybCwgZnVuY3Rpb24gKGV2ZW50OiBhbnksIGRhdGE6IGFueSkge1xyXG4gICAgICAgICAgICBsZXQgaXRlbTogYW55ID0ge1xyXG4gICAgICAgICAgICAgICAgaWQ6IGRhdGEuZGF0YS5rZXksXHJcbiAgICAgICAgICAgICAgICBwYXRoOiBkYXRhLmRhdGEuaW1hZ2V1cmxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2VsZi4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLkZhY2VUcmFja1BhcmFtcy5pbWFnZVBhdGhMaXN0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLkZhY2VUcmFja1BhcmFtcy5pbWFnZVBhdGggPSBpdGVtLnBhdGg7XHJcbiAgICAgICAgICAgICAgICBzZWxmLkZhY2VUcmFja1BhcmFtcy50YXNrSWQgPSBpdGVtLmlkO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDnm5HlkKzorr7lpIfov5Tlm57kuovku7ZcclxuICAgICAgICBzZWxmLiRzY29wZS4kb24oc2VsZi5zZWxlY3REZXZpY2VDYiwgKGV2ZW50OiBhbnksIGRldmljZUlkczogQXJyYXk8c3RyaW5nPiwgc3RhdHVzOiBib29sZWFuLCBnZW9tZXRyeT86IE5QTWFwTGliLkdlb21ldHJ5LlBvbHlnb24sIHR5cGU/OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgaWYgKHN0YXR1cyAmJiBBcnJheS5pc0FycmF5KGRldmljZUlkcykpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuZGV2aWNlSWRGaWx0ZXIoZGV2aWNlSWRzLCB0eXBlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChnZW9tZXRyeSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5hbmFseXNpc01tYXBTZXJ2ZXIucmVtb3ZlRHJhd1NoYXBlKGdlb21ldHJ5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLmxheWVyLmNsb3NlKHNlbGYuY3VycmVudExheWVySW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOWIneWni+WMluWPguaVsFxyXG4gICAgcHJpdmF0ZSBpbml0UGFyYW1zKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgc2VsZi5GYXN0RGF0ZSA9IGRhdGFMaXN0cy50b2RheTtcclxuICAgICAgICBzZWxmLlNleERhdGUgPSBTZXhEYXRhLmFsbDtcclxuICAgICAgICBzZWxmLkdsYXNzRGF0ZSA9IEdsYXNzZXNEYXRhLmFsbDtcclxuICAgICAgICBzZWxmLk1hc2tEYXRlID0gTWFza0RhdGEuYWxsO1xyXG4gICAgICAgIHNlbGYuYXJyQ2FtZXJhSWQgPSBbXTtcclxuXHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IG5ldyBGYWNlVHJhY2tQYXJhbXMoKTtcclxuXHJcbiAgICAgICAgcGFyYW1zLmFyckNhbWVyYUlkID0gW107XHJcbiAgICAgICAgcGFyYW1zLmltYWdlUGF0aExpc3QgPSBbXTtcclxuICAgICAgICBwYXJhbXMuYXJyRXllR2xhc3NlcyA9IFtdO1xyXG4gICAgICAgIHBhcmFtcy5hcnJNYXNrID0gW107XHJcbiAgICAgICAgcGFyYW1zLmFyckdlbmRlciA9IFtdO1xyXG4gICAgICAgIHBhcmFtcy5zdGFydFRpbWUgPSB0aGlzLkZhc3REYXRlLnZhbHVlLnN0YXJ0VGltZTtcclxuICAgICAgICBwYXJhbXMuZW5kVGltZSA9IHRoaXMuRmFzdERhdGUudmFsdWUuZW5kVGltZTtcclxuICAgICAgICBpZiAodHlwZW9mIHNlbGYuRmFjZVRyYWNrUGFyYW1zID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBwYXJhbXMudGhyZXNob2xkID0gOTA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGFyYW1zLnRocmVzaG9sZCA9IHNlbGYuRmFjZVRyYWNrUGFyYW1zLnRocmVzaG9sZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5Yik5pat5piv5ZCm5pyJ6YCa6KGM6K6w5b2V5b+r6YCf5qOA57SiXHJcbiAgICAgICAgbGV0IEFuYWx5c2lzRGF0YTogQW5hbHlzaXNTdG9yYWdlUGFyYW1zID0gdGhpcy5oYW5kbGVTdG9yYWdlLmdldFNlc3Npb25TdG9yYWdlRGF0YShBbmFseXNpc0RhdGFUeXBlLkZhY2Uua2V5KTtcclxuICAgICAgICBsZXQgaXRlbTogYW55O1xyXG4gICAgICAgIGlmIChBbmFseXNpc0RhdGEpIHtcclxuICAgICAgICAgICAgaXRlbSA9IHtcclxuICAgICAgICAgICAgICAgIGlkOiBBbmFseXNpc0RhdGEuZGF0YS5BY2Nlc3NMb2cuSUQsXHJcbiAgICAgICAgICAgICAgICBwYXRoOiBBbmFseXNpc0RhdGEuZGF0YS5BY2Nlc3NMb2cuRmFjZVBhdGhcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcGFyYW1zLmltYWdlUGF0aExpc3QucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVTdG9yYWdlLnJlbW92ZVNlc3Npb25TdG9yYWdlRGF0YShBbmFseXNpc0RhdGFUeXBlLkZhY2Uua2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5Yik5pat5piv5ZCm5pyJ5Lq66IS45YiG5p6Q5b+r6YCf5qOA57SiXHJcbiAgICAgICAgIEFuYWx5c2lzRGF0YSA9IHRoaXMuaGFuZGxlU3RvcmFnZS5nZXRTZXNzaW9uU3RvcmFnZURhdGEoQW5hbHlzaXNEYXRhVHlwZS5GYWNlTGlicmFyeS5rZXkpO1xyXG4gICAgICAgIGlmIChBbmFseXNpc0RhdGEpIHtcclxuICAgICAgICAgICAgaXRlbSA9IHtcclxuICAgICAgICAgICAgICAgIGlkOiBBbmFseXNpc0RhdGEuZGF0YS5QZXJzb25JbmZvLklELFxyXG4gICAgICAgICAgICAgICAgcGF0aDogQW5hbHlzaXNEYXRhLmRhdGEuUGVyc29uSW5mby5GYWNlUGljUGF0aFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBwYXJhbXMuaW1hZ2VQYXRoTGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZVN0b3JhZ2UucmVtb3ZlU2Vzc2lvblN0b3JhZ2VEYXRhKEFuYWx5c2lzRGF0YVR5cGUuRmFjZUxpYnJhcnkua2V5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGYuRmFjZVRyYWNrUGFyYW1zID0gcGFyYW1zO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOW/q+mAn+mAieaLqeaXtumXtFxyXG4gICAgc2V0RmFzdERhdGUoaXRlbTogRW51bTxUaW1lTGVuZ3RoPikge1xyXG4gICAgICAgIHRoaXMuRmFzdERhdGUgPSBpdGVtO1xyXG4gICAgICAgIGxldCB0aW1lOiB0aW1lTGVuZ3RoO1xyXG4gICAgICAgIHN3aXRjaCAoaXRlbS5rZXkpIHtcclxuICAgICAgICAgICAgY2FzZSBcInRvZGF5XCI6XHJcbiAgICAgICAgICAgICAgICB0aW1lID0gZ2V0SG91cnMoMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImxhc3Rob3VyXCI6XHJcbiAgICAgICAgICAgICAgICB0aW1lID0gZ2V0SG91cnMoMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImxhc3RGb3VySG91clwiOlxyXG4gICAgICAgICAgICAgICAgdGltZSA9IGdldEhvdXJzKDYpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJsYXN0VGhyZWVEYXlcIjpcclxuICAgICAgICAgICAgICAgIHRpbWUgPSBnZXRIb3VycygxMik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5GYWNlVHJhY2tQYXJhbXMuc3RhcnRUaW1lID0gdGltZS5zdGFydFRpbWU7XHJcbiAgICAgICAgdGhpcy5GYWNlVHJhY2tQYXJhbXMuZW5kVGltZSA9IHRpbWUuZW5kVGltZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDlv6vpgJ/pgInmi6nlubTpvoRcclxuICAgIHNlbGVjdEFnZShhZ2U6IEVudW08QWdlPikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgYWdlICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0aGlzLkZhY2VUcmFja1BhcmFtcy5tYXhBZ2UgPSBhZ2UudmFsdWUubWF4QWdlO1xyXG4gICAgICAgICAgICB0aGlzLkZhY2VUcmFja1BhcmFtcy5taW5BZ2UgPSBhZ2UudmFsdWUubWluQWdlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuRmFjZVRyYWNrUGFyYW1zLm1heEFnZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuRmFjZVRyYWNrUGFyYW1zLm1pbkFnZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdENhbWVyYSgpIHtcclxuICAgICAgICBsZXQgc2NvcGU6IHsgc2VsZWN0Q2FtZXJhTGlzdDogQXJyYXk8c3RyaW5nPiwgJGRlc3Ryb3k6IEZ1bmN0aW9uLCBzZWxlY3RDdHJsQ2I6IHN0cmluZyB9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLnNlbGVjdENhbWVyYUxpc3QgPSB0aGlzLmFyckNhbWVyYUlkO1xyXG4gICAgICAgIHNjb3BlLnNlbGVjdEN0cmxDYiA9IHRoaXMuc2VsZWN0RGV2aWNlQ2I7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGF5ZXJJbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGNhbWVyYVRyZWVQb3B1cEh0bWwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgdGl0bGU6IFwi5pGE5YOP5py66YCJ5oupXCIsXHJcbiAgICAgICAgICAgIGFyZWE6IFtcIjcxMHB4XCIsIFwiNjIwcHhcIl0sXHJcbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIERyYXdSZWN0KCkge1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmRyYXdSZWN0KChwb2ludHM6IEFycmF5PFN5c3RlbVBvaW50PiwgZ2VvbWV0cnk6IE5QTWFwTGliLkdlb21ldHJ5LlBvbHlnb24pID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRyYXdDYWxsQmFja01ldGhvZChwb2ludHMsIGdlb21ldHJ5KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIERyYXdDaXJjbGUoKSB7XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIuZHJhd0NpcmNsZSgocG9pbnRzOiBBcnJheTxTeXN0ZW1Qb2ludD4sIGdlb21ldHJ5OiBOUE1hcExpYi5HZW9tZXRyeS5Qb2x5Z29uKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5EcmF3Q2FsbEJhY2tNZXRob2QocG9pbnRzLCBnZW9tZXRyeSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBEcmF3UG9seWdvbigpIHtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5kcmF3UG9seWdvbigocG9pbnRzOiBBcnJheTxTeXN0ZW1Qb2ludD4sIGdlb21ldHJ5OiBOUE1hcExpYi5HZW9tZXRyeS5Qb2x5Z29uKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5EcmF3Q2FsbEJhY2tNZXRob2QocG9pbnRzLCBnZW9tZXRyeSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBDbGVhckRyYXcoKSB7XHJcbiAgICAgICAgdGhpcy5hcnJDYW1lcmFJZCA9IFtdO1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmNsZWFyRHJhdygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgRHJhd0NhbGxCYWNrTWV0aG9kKHBvaW50czogQXJyYXk8U3lzdGVtUG9pbnQ+LCBnZW9tZXRyeTogTlBNYXBMaWIuR2VvbWV0cnkuUG9seWdvbiB8IE5QTWFwTGliLkdlb21ldHJ5LkNpcmNsZSkge1xyXG4gICAgICAgIGxldCBhcnI6IEFycmF5PFN5c3RlbVBvaW50PiA9IFtdO1xyXG4gICAgICAgIHBvaW50cy5mb3JFYWNoKChpdGVtOiBTeXN0ZW1Qb2ludCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5PYmplY3RUeXBlID09PSBPYmplY3RUeXBlLkNhbWVyYS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5yZW1vdmVEcmF3U2hhcGUoZ2VvbWV0cnkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYXllckRlYy5pbmZvKCfmoYbpgInljLrln5/kuI3lrZjlnKjmkYTlg4/mnLrorr7lpIfvvIEnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrQXJlYShhcnIsIGdlb21ldHJ5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja0FyZWEoZGV2aWNlTGlzdDogYW55LCBnZW9tZXRyeTogTlBNYXBMaWIuR2VvbWV0cnkuUG9seWdvbiB8IE5QTWFwTGliLkdlb21ldHJ5LkNpcmNsZSkge1xyXG4gICAgICAgIGxldCBzY29wZTogeyBkZXZpY2VMaXN0OiBhbnksIGdlb21ldHJ5OiBOUE1hcExpYi5HZW9tZXRyeS5Qb2x5Z29uIHwgTlBNYXBMaWIuR2VvbWV0cnkuQ2lyY2xlLCAkZGVzdHJveTogRnVuY3Rpb24sIHNlbGVjdENoZWNrQXJlYUNiOiBzdHJpbmcgfSA9IHRoaXMuJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICBzY29wZS5kZXZpY2VMaXN0ID0gZGV2aWNlTGlzdDtcclxuICAgICAgICBzY29wZS5nZW9tZXRyeSA9IGdlb21ldHJ5O1xyXG4gICAgICAgIHNjb3BlLnNlbGVjdENoZWNrQXJlYUNiID0gdGhpcy5zZWxlY3REZXZpY2VDYjtcclxuICAgICAgICB0aGlzLmN1cnJlbnRMYXllckluZGV4ID0gdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgY29udGVudDogUG9wdXBIdG1sLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIHRpdGxlOiBmYWxzZSxcclxuICAgICAgICAgICAgY2xvc2VCdG46IDAsXHJcbiAgICAgICAgICAgIHNraW46IFwibm8tc2Nyb2xsXCIsXHJcbiAgICAgICAgICAgIGFyZWE6IFtcIjMwMHB4XCIsIFwiMzAwcHhcIl0sXHJcbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6K6+5aSHaWTljrvph41cclxuICAgIHByaXZhdGUgZGV2aWNlSWRGaWx0ZXIoaWRzOiBBcnJheTxzdHJpbmc+LCB0eXBlPzogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBhcnJDYW1lcmFJZDogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgICAgIGlmICh0eXBlID09PSBcInRyZWVcIikge1xyXG4gICAgICAgICAgICBhcnJDYW1lcmFJZCA9IGlkcztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhcnJDYW1lcmFJZCA9IF8uY29uY2F0KGlkcywgc2VsZi5hcnJDYW1lcmFJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFyckNhbWVyYUlkID0gXy5zb3J0ZWRVbmlxKGFyckNhbWVyYUlkKTtcclxuICAgICAgICBzZWxmLmFyckNhbWVyYUlkID0gYXJyQ2FtZXJhSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5p+l6K+i5Lq66IS46L2o6L+5XHJcbiAgICBzdWJtaXRTZWFyY2goKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGlmIChzZWxmLkZhY2VUcmFja1BhcmFtcy5pbWFnZVBhdGhMaXN0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBzZWxmLmxheWVyRGVjLndhcm5JbmZvKCfor7fkuIrkvKDlm77niYchJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5Yik5pat5pe26Ze0XHJcbiAgICAgICAgaWYgKHNlbGYuRmFjZVRyYWNrUGFyYW1zLmVuZFRpbWUgPCBzZWxmLkZhY2VUcmFja1BhcmFtcy5zdGFydFRpbWUpIHtcclxuICAgICAgICAgICAgc2VsZi5sYXllckRlYy53YXJuSW5mbygn5byA5aeL5pe26Ze05LiN6IO95pma5LqO57uT5p2f5pe26Ze0IScpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOiuvue9ruafpeivouiuvuWkh2lkXHJcbiAgICAgICAgaWYoc2VsZi5hcnJDYW1lcmFJZC5sZW5ndGg+MCkge1xyXG4gICAgICAgICAgICBzZWxmLkZhY2VUcmFja1BhcmFtcy5hcnJDYW1lcmFJZCA9IHNlbGYuYXJyQ2FtZXJhSWQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHN5c3RlbVBvaW50TGlzdDpBcnJheTxhbnk+ID0gc2VsZi5hbmFseXNpc01tYXBTZXJ2ZXIuZ2V0U3lzdGVtUG9pbnQoKTtcclxuICAgICAgICAgICAgbGV0IGNhbWVyYUxpc3Q6QXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgICAgICAgICBfKHN5c3RlbVBvaW50TGlzdCkuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdFR5cGUuQ2FtZXJhLnZhbHVlID09PSB2YWx1ZS5PYmplY3RUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FtZXJhTGlzdC5wdXNoKHZhbHVlLk9iamVjdElEKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNlbGYuRmFjZVRyYWNrUGFyYW1zLmFyckNhbWVyYUlkID0gY2FtZXJhTGlzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNlbGYuU2V4RGF0ZS52YWx1ZSkge1xyXG4gICAgICAgICAgICBzZWxmLkZhY2VUcmFja1BhcmFtcy5hcnJHZW5kZXIucHVzaChzZWxmLlNleERhdGUudmFsdWUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzZWxmLkdsYXNzRGF0ZS52YWx1ZSkge1xyXG4gICAgICAgICAgICBzZWxmLkZhY2VUcmFja1BhcmFtcy5hcnJFeWVHbGFzc2VzLnB1c2goc2VsZi5HbGFzc0RhdGUudmFsdWUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzZWxmLk1hc2tEYXRlLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHNlbGYuRmFjZVRyYWNrUGFyYW1zLmFyck1hc2sucHVzaChzZWxmLk1hc2tEYXRlLnZhbHVlKVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDnu5HlrprmjqjpgIFcclxuICAgICAgICBzZWxmLnVuYmluZFNvY2tldCgpO1xyXG4gICAgICAgIHNlbGYuc29ja2V0UmVzdWx0TGlzdCA9IFtdO1xyXG4gICAgICAgIHNlbGYuc29ja2V0UXVlcnlMaXN0ID0gc2VsZi5GYWNlVHJhY2tQYXJhbXMuaW1hZ2VQYXRoTGlzdDtcclxuICAgICAgICBzZWxmLnNvY2tldE51bSA9IHNlbGYuRmFjZVRyYWNrUGFyYW1zLmltYWdlUGF0aExpc3QubGVuZ3RoO1xyXG4gICAgICAgIHNlbGYuYmluZFNvY2tldFRvUmVzdWx0KCk7XHJcbiAgICAgICAgLy8g5b6q546v5p+l6K+i6L2o6L+5XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxmLkZhY2VUcmFja1BhcmFtcy5pbWFnZVBhdGhMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBwYXIgPSBhbmd1bGFyLmNvcHkoc2VsZi5GYWNlVHJhY2tQYXJhbXMpO1xyXG4gICAgICAgICAgICBwYXIuaW1hZ2VQYXRoID0gc2VsZi5GYWNlVHJhY2tQYXJhbXMuaW1hZ2VQYXRoTGlzdFtpXS5wYXRoO1xyXG4gICAgICAgICAgICBwYXIudGFza0lkID0gc2VsZi5GYWNlVHJhY2tQYXJhbXMuaW1hZ2VQYXRoTGlzdFtpXS5pZDtcclxuICAgICAgICAgICAgc2VsZi5hbmFseXNpc1NlcnZpY2Uuc2VhcmNoRmFjZVRyYWNrKHBhcikudGhlbigocmVzOiBCYWNrUmVzcG9uc2VCb2R5PFJlc3VsdFRyYWNrPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlICE9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxheWVyRGVjLndhcm5JbmZvKCfmnI3liqHor7fmsYLlpLHotKUhJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOmHjee9ruafpeivouWPguaVsFxyXG4gICAgICAgIHNlbGYuaW5pdFBhcmFtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOWPlua2iHNva2VjdOiuoumYhVxyXG4gICAgdW5iaW5kU29ja2V0KCkge1xyXG4gICAgICAgIHRoaXMuc29ja2V0RmFjdG9yeS51blN1YnNjcmliZShTb2NrZXRSZXN1bHRUeXBlRW51bS5UcmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g57uR5a6ac29ja2V06K6i6ZiFXHJcbiAgICBiaW5kU29ja2V0VG9SZXN1bHQoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYuaW5pdExvYWRpbmdQb3AoKTtcclxuICAgICAgICBzZWxmLnNvY2tldEZhY3Rvcnkuc3Vic2NyaWJlKFNvY2tldFJlc3VsdFR5cGVFbnVtLlRyYWNrLCAocmVzOiBBcnJheTxhbnk+KSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYubGF5ZXIuY2xvc2Uoc2VsZi5jdXJyZW50TGF5ZXJJbmRleCk7XHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlcykpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZi5zb2NrZXRRdWVyeUxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHJlcy5sZW5ndGg7IHgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHJlc1t4XS5jb2RlID09PSAyMDAgKSAmJiAoc2VsZi5zb2NrZXRRdWVyeUxpc3RbaV0uaWQgPT09IHJlc1t4XS5kYXRhLlRhc2tJZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc1t4XS5kYXRhLnBhdGggPSBzZWxmLnNvY2tldFF1ZXJ5TGlzdFtpXS5wYXRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zb2NrZXRSZXN1bHRMaXN0LnB1c2gocmVzW3hdLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zb2NrZXROdW0gPSBzZWxmLnNvY2tldE51bSAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5zb2NrZXROdW0gPCAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi51bmJpbmRTb2NrZXQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNlbGYuZ29JbWFnZVJlc3VsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOi/m+WFpXNvY2tldOWbvueJh+e7k+aenOmhtVxyXG4gICAgZ29JbWFnZVJlc3VsdCgpIHtcclxuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaG93QWxsUmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0Zvcm0gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zaG93SW1hZ2VSZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dUcmFja1JlcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmlzU29ydExldHRlciA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8g5riF6Zmk6aG16Z2i5qGG6YCJXHJcbiAgICAgICAgdGhpcy5DbGVhckRyYXcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WFs+mXreWFqOmDqOe7k+aenO+8iOWkp++8iVxyXG4gICAgY2xvc2VBbGxSZXN1bHQoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93VHJhY2tSZXMgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2hvd0FsbFJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudHJhY2tSZXN1bHQuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMudHJhY2tSZXN1bHQucGFnZVNpemUgPSA2O1xyXG4gICAgICAgIHRoaXMudHJhY2tSZXN1bHQgPSB0aGlzLnBhZ2luYXRpb24uZ2V0QnlQYWdlKHRoaXMudHJhY2tSZXN1bHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOaYvuekuuaJgOaciee7k+aenO+8iOWkp++8iVxyXG4gICAgZ29BbGxSZXN1bHQoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93VHJhY2tSZXMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNob3dBbGxSZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudHJhY2tSZXN1bHQucGFnZVNpemUgPSA0MDtcclxuICAgICAgICB0aGlzLnRyYWNrUmVzdWx0LmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICB0aGlzLnRyYWNrUmVzdWx0ID0gdGhpcy5wYWdpbmF0aW9uLmdldEJ5UGFnZSh0aGlzLnRyYWNrUmVzdWx0KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDov5Tlm57niLbnuqfpobXpnaJcclxuICAgIGdvQmFjaygpIHtcclxuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoJ3Nob3dJdGVtUGFnZScsIGZhbHNlKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOi/lOWbnuWIsOihqOWNlVxyXG4gICAgZ29CYWNrRm9ybSgpIHtcclxuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaG93SW1hZ2VSZXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zaG93SW1hZ2VSZXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zaG93Rm9ybSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdG9yeUZvck1hcE1hcmtlcigpO1xyXG4gICAgICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5yZW5kZXJTeXN0ZW1Qb2ludCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6L+U5Zuec29ja2V057uT5p6c6aG1XHJcbiAgICBiYWNrSW1hZ2VSZXN1bHQoKSB7XHJcbiAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0FsbFJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dGb3JtID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0ltYWdlUmVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zaG93VHJhY2tSZXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5pc1NvcnRMZXR0ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmRlc3RvcnlGb3JNYXBNYXJrZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIucmVtb3ZlU3lzdGVtUG9pbnQoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOagueaNrklE5Yig6Zmk57uT5p6cXHJcbiAgICBkZWxSZXN1bHQoSUQ6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLnBhZ2luYXRpb24uZGVsQnlQYWdlSWQoSUQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHJhY2tSZXN1bHQgPSB0aGlzLnBhZ2luYXRpb24uZ2V0QnlQYWdlKHRoaXMudHJhY2tSZXN1bHQpO1xyXG4gICAgICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5yZW5kZXJNYWtlcnMoXHJcbiAgICAgICAgICAgICAgICBPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRMYXllciwgT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0R3JvdXAsXHJcbiAgICAgICAgICAgICAgICB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIuZ2V0U3lzdGVtUG9pbnRGb3JQYXJhbXModGhpcy50cmFja1Jlc3VsdC5kYXRhKSxcclxuICAgICAgICAgICAgICAgIHRoaXMudHJhY2tSZXN1bHRGb3JNYXBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbFRyYWNrUmVzdWx0ID0gdGhpcy50cmFja1Jlc3VsdC5hbGxEYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRSZXN1bHRGb3JNYXAodGhpcy5hbGxUcmFja1Jlc3VsdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDmn6XnnIvnu5PmnpxcclxuICAgIHNob3dUcmFja0RldGFpbChpOiBudW1iZXIsIGRhdGE6IGFueSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBzZWxmLmlzU29ydExldHRlciA9IHRydWU7XHJcbiAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5SZXN1bHQgJiYgKGRhdGEuUmVzdWx0Lmxlbmd0aCA+IDApKSB7XHJcbiAgICAgICAgICAgIHNlbGYuZGVzdG9yeUZvck1hcE1hcmtlcigpO1xyXG4gICAgICAgICAgICBzZWxmLmFuYWx5c2lzTW1hcFNlcnZlci5yZW1vdmVTeXN0ZW1Qb2ludCgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHBhcmFtczphbnkgPSB7XHJcbiAgICAgICAgICAgICAgICBkZXZpY2VJZHM6IFtdLFxyXG4gICAgICAgICAgICAgICAgZGV2aWNlVHlwZTogJycsXHJcbiAgICAgICAgICAgICAgICBpZHM6IFtdLFxyXG4gICAgICAgICAgICAgICAgdXNlcklkOiBzZWxmLnVzZXJJbmZvQ2FjaGVGYWN0b3J5LmdldEN1cnJlbnRVc2VySWQoKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBwYXJhbXMuZGV2aWNlVHlwZSA9IE9iamVjdFR5cGUuQ2FtZXJhLnZhbHVlO1xyXG4gICAgICAgICAgICBfLmZvckVhY2goZGF0YS5SZXN1bHQsZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXMuZGV2aWNlSWRzLnB1c2godmFsdWUuQWNjZXNzTG9nLkNhbWVyYUlEKTtcclxuICAgICAgICAgICAgICAgIHBhcmFtcy5pZHMucHVzaCh2YWx1ZS5BY2Nlc3NMb2cuSUQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2VsZi5yZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UuZ2V0RGV2aWNlSW5mb1Byb21pc2UocGFyYW1zKS50aGVuKChyZXM6YW55KT0+e1xyXG4gICAgICAgICAgICAgICAgXy5mb3JFYWNoKGRhdGEuUmVzdWx0LGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZGV2aWNlSW5mbyA9IHJlcy5kYXRhLmRldmljZUluZm9baW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY29sbGVjdFN0YXR1cyA9IHJlcy5kYXRhLmNvbGxlY3RTdGF0dXNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnRyYWNrSW1hZ2VQYXRoID0gZGF0YS5wYXRoO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucGFnaW5hdGlvbi5zZXQoZGF0YS5SZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50cmFja1Jlc3VsdC5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50cmFja1Jlc3VsdC5wYWdlU2l6ZSA9IDY7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50cmFja1Jlc3VsdCA9IHNlbGYucGFnaW5hdGlvbi5nZXRCeVBhZ2Uoc2VsZi50cmFja1Jlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5hbGxUcmFja1Jlc3VsdCA9IHNlbGYudHJhY2tSZXN1bHQuYWxsRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFJlc3VsdEZvck1hcChzZWxmLmFsbFRyYWNrUmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd0Zvcm0gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNob3dJbWFnZVJlcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd1RyYWNrUmVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNob3dBbGxSZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnJlc3VsdFNvcnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhcnIgPSBzZWxmLmFuYWx5c2lzTW1hcFNlcnZlci5nZXRTeXN0ZW1Qb2ludEZvclBhcmFtcyh0aGlzLnRyYWNrUmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYW5hbHlzaXNNbWFwU2VydmVyLnJlbmRlck1ha2VycyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0TGF5ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdEdyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJhY2tSZXN1bHRGb3JNYXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTb3J0TGV0dGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnRMZXR0ZXJcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXJEZWMuaW5mbygn5rKh5pyJ5p+l6K+i5Yiw57uT5p6cJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOafpeeci+i9qOi/uVxyXG4gICAgc2V0RmFjZVRyYWNrRGV0YWlsKGRhdGE6IGFueSkge1xyXG4gICAgICAgIGlmIChkYXRhICYmIGRhdGEuUmVzdWx0ICYmIChkYXRhLlJlc3VsdC5sZW5ndGggPiAwKSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHNlbGYuYW5hbHlzaXNNbWFwU2VydmVyLnJlbW92ZVN5c3RlbVBvaW50KCk7XHJcbiAgICAgICAgICAgIHNlbGYuYWxsVHJhY2tSZXN1bHQgPSBkYXRhLlJlc3VsdDtcclxuICAgICAgICAgICAgc2VsZi5zZXRGYWNlVHJhY2soKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyRGVjLmluZm8oJ+ayoeacieafpeivouWIsOi9qOi/uee7k+aenCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDliJvlu7rovajov7lcclxuICAgIHNldEZhY2VUcmFjaygpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuaXNTb3J0TGV0dGVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBhbGxSZXN1bHRMaXN0ID0gXy5zb3J0Qnkoc2VsZi5hbGxUcmFja1Jlc3VsdCwgZnVuY3Rpb24gKGl0ZW06IGFueSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChEYXRlLnBhcnNlKGl0ZW0uQWNjZXNzTG9nLkxvZ1RpbWUpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNlbGYucGFnaW5hdGlvbi5zZXQoYWxsUmVzdWx0TGlzdCk7XHJcbiAgICAgICAgICAgIHNlbGYudHJhY2tSZXN1bHQuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgICAgICBzZWxmLnRyYWNrUmVzdWx0LnBhZ2VTaXplID0gNjtcclxuICAgICAgICAgICAgc2VsZi50cmFja1Jlc3VsdCA9IHNlbGYucGFnaW5hdGlvbi5nZXRCeVBhZ2Uoc2VsZi50cmFja1Jlc3VsdCk7XHJcbiAgICAgICAgICAgIHNlbGYuYWxsVHJhY2tSZXN1bHQgPSBzZWxmLnRyYWNrUmVzdWx0LmFsbERhdGE7XHJcbiAgICAgICAgICAgIHNlbGYuc2V0UmVzdWx0Rm9yTWFwKHNlbGYuYWxsVHJhY2tSZXN1bHQpO1xyXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcG9pbnRzID0gc2VsZi5hbmFseXNpc01tYXBTZXJ2ZXIuZ2V0U3lzdGVtUG9pbnRGb3JQYXJhbXMoc2VsZi5hbGxUcmFja1Jlc3VsdCkgO1xyXG4gICAgICAgICAgICBzZWxmLmFuYWx5c2lzTW1hcFNlcnZlci5zZXRUcmFja0FuaW1hdGlvbihzZWxmLmFsbFRyYWNrUmVzdWx0LCBwb2ludHMsIHNlbGYudHJhY2tSZXN1bHRGb3JNYXApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOiuvue9ruWcsOWbvueCueS9jeiusOW9lVxyXG4gICAgcHJpdmF0ZSBzZXRSZXN1bHRGb3JNYXAocmVzdWx0OiBBcnJheTxSZXN1bHQgfCBDYWNoZVJlc3VsdD4pIHtcclxuICAgICAgICBsZXQgb2JqID0ge30gYXMgIHsgW2tleTogc3RyaW5nXTogQ2FjaGVSZXN1bHQgfTtcclxuICAgICAgICByZXN1bHQuZm9yRWFjaCgoaXRlbTogQ2FjaGVSZXN1bHQsIGk6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICBvYmpbaXRlbS5BY2Nlc3NMb2cuSURdID0gaXRlbTtcclxuICAgICAgICAgICAgb2JqW2l0ZW0uQWNjZXNzTG9nLklEXS5yZXN1bHRJbmRleCA9IGk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy50cmFja1Jlc3VsdEZvck1hcCA9IG9iajtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmoLnmja7nu5PmnpzmmL7npLrlnLDlm77lr7nlupTnmoTngrnkvY1cclxuICAgIHJlc3VsdFRvTWFwKGl0ZW06IFJlc3VsdCwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLnJlc3VsdFRvTWFwKGl0ZW0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Y+W5raI57uT5p6c5pi+56S65Zyw5Zu+5a+55bqU55qE54K55L2NXHJcbiAgICB1blJlc3VsdFRvTWFwKGl0ZW06IFJlc3VsdCwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLnVuUmVzdWx0VG9NYXAoaXRlbSwgdGhpcy50cmFja1Jlc3VsdEZvck1hcCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5YiH5o2i6aG15pWwXHJcbiAgICBjaGFuZ2VSZXN1bHRQYWdlKGk6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMudHJhY2tSZXN1bHQuY3VycmVudFBhZ2UgPSBpO1xyXG4gICAgICAgIHRoaXMudHJhY2tSZXN1bHQgPSB0aGlzLnBhZ2luYXRpb24uZ2V0QnlQYWdlKHRoaXMudHJhY2tSZXN1bHQpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzU29ydExldHRlcikge1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLnJlbmRlck1ha2VycyhcclxuICAgICAgICAgICAgICAgICAgICBPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRMYXllcixcclxuICAgICAgICAgICAgICAgICAgICBPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRHcm91cCxcclxuICAgICAgICAgICAgICAgICAgICB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmdldFN5c3RlbVBvaW50Rm9yUGFyYW1zKHRoaXMudHJhY2tSZXN1bHQuZGF0YSksXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFja1Jlc3VsdEZvck1hcCxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU29ydExldHRlciwgdGhpcy5zb3J0TGV0dGVyKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDmjpLluo/mlrnlvI9cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC8v5o6S5bqP5pa55byPXHJcbiAgICAgKi9cclxuICAgIHNvcnRSZXVsdCh0eXBlOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGFsbFJlc3VsdExpc3Q6IGFueSA9IHNlbGYucGFnaW5hdGlvbi5nZXQoKTtcclxuICAgICAgICBzZWxmLmlzU29ydExldHRlciA9IHRydWU7XHJcbiAgICAgICAgc2VsZi5kZXN0b3J5Rm9yTWFwTWFya2VyKCk7XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IFwic2NvcmVcIikge1xyXG4gICAgICAgICAgICBzZWxmLnJlc3VsdFNvcnQgPSB0cnVlO1xyXG4gICAgICAgICAgICBhbGxSZXN1bHRMaXN0ID0gXy5zb3J0QnkoYWxsUmVzdWx0TGlzdCwgZnVuY3Rpb24gKGl0ZW06IGFueSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC1pdGVtLlNjb3JlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwidGltZVwiKSB7XHJcbiAgICAgICAgICAgIHNlbGYucmVzdWx0U29ydCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBhbGxSZXN1bHRMaXN0ID0gXy5zb3J0QnkoYWxsUmVzdWx0TGlzdCwgZnVuY3Rpb24gKGl0ZW06IGFueSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC0oRGF0ZS5wYXJzZShpdGVtLkFjY2Vzc0xvZy5Mb2dUaW1lKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLnBhZ2luYXRpb24uc2V0KGFsbFJlc3VsdExpc3QpO1xyXG4gICAgICAgIGlmIChzZWxmLnNob3dUcmFja1Jlcykge1xyXG4gICAgICAgICAgICBzZWxmLnRyYWNrUmVzdWx0LnBhZ2VTaXplID0gNjtcclxuICAgICAgICAgICAgc2VsZi50cmFja1Jlc3VsdC5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VsZi50cmFja1Jlc3VsdC5wYWdlU2l6ZSA9IDQwO1xyXG4gICAgICAgICAgICBzZWxmLnRyYWNrUmVzdWx0LmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi50cmFja1Jlc3VsdCA9IHNlbGYucGFnaW5hdGlvbi5nZXRCeVBhZ2Uoc2VsZi50cmFja1Jlc3VsdCk7XHJcbiAgICAgICAgc2VsZi5hbGxUcmFja1Jlc3VsdCA9IHNlbGYudHJhY2tSZXN1bHQuYWxsRGF0YTtcclxuICAgICAgICBzZWxmLnNldFJlc3VsdEZvck1hcChzZWxmLmFsbFRyYWNrUmVzdWx0KTtcclxuICAgICAgICBsZXQgYXJyID0gc2VsZi5hbmFseXNpc01tYXBTZXJ2ZXIuZ2V0U3lzdGVtUG9pbnRGb3JQYXJhbXModGhpcy50cmFja1Jlc3VsdC5kYXRhKTtcclxuICAgICAgICBzZWxmLmFuYWx5c2lzTW1hcFNlcnZlci5yZW5kZXJNYWtlcnMoXHJcbiAgICAgICAgICAgIE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdExheWVyLFxyXG4gICAgICAgICAgICBPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRHcm91cCxcclxuICAgICAgICAgICAgdHJ1ZSxcclxuICAgICAgICAgICAgYXJyLFxyXG4gICAgICAgICAgICB0aGlzLnRyYWNrUmVzdWx0Rm9yTWFwLFxyXG4gICAgICAgICAgICB0aGlzLmlzU29ydExldHRlcixcclxuICAgICAgICAgICAgdGhpcy5zb3J0TGV0dGVyXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDkuIrkvKDlm77niYdcclxuICAgIHVwbG9hZEltYWdlKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGZyb20gPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBmcm9tLmFwcGVuZCgnaW1hZ2UnLCBldmVudC50YXJnZXQuZmlsZXNbMF0pO1xyXG4gICAgICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgICAgICBzdG9yZVR5cGU6IFwiTE9DXCIsXHJcbiAgICAgICAgICAgIGltYWdlQ2F0ZWdvcnk6IFwiQ2FwdHVyZUltYWdlXCIsXHJcbiAgICAgICAgICAgIGNvbW1hbmRUeXBlOiBcIlNlYXJjaEFjY2Vzc0xvZ1wiLFxyXG4gICAgICAgICAgICBkZXRlY3RUeXBlOiBcIkZhY2VcIlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy51cGxvYWRJbWFnZVNlcnZpY2UudXBsb2FkSW1hZ2VGb3JGYWNlKGZyb20sIGRhdGEpLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICgocmVzLmNvZGUgPT09IDIwMCkgJiYgKHJlcy5kYXRhICYmIHJlcy5kYXRhLmtleSkpIHsgLy8g5Lq66IS46K+G5Yir5oiQ5YqfXHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbTogYW55ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiByZXMuZGF0YS5rZXksXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogcmVzLmRhdGEuaW1hZ2V1cmxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBzZWxmLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLkZhY2VUcmFja1BhcmFtcy5pbWFnZVBhdGhMaXN0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5GYWNlVHJhY2tQYXJhbXMuaW1hZ2VQYXRoID0gaXRlbS5wYXRoO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuRmFjZVRyYWNrUGFyYW1zLnRhc2tJZCA9IGl0ZW0uaWQ7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChyZXMuY29kZSA9PT0gMjAwKSAmJiAocmVzLmRhdGEuZmFjZUluZm8pKSB7Ly8g5Lq66IS46YCJ5oupXHJcbiAgICAgICAgICAgICAgICBsZXQgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICAgICAgICAgIGltYWdlLnNyYyA9ICdkYXRhOmltYWdlL2pwZWc7YmFzZTY0LCcgKyByZXMuZGF0YS5pbWFnZTtcclxuICAgICAgICAgICAgICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJfaW5mb1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IGltYWdlLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogaW1hZ2UuaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubXVsdGlVc2VyU2VsZWN0KHJlcy5kYXRhLCBmaWxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmICgocmVzLmNvZGUgPT09IDIwMCkgJiYgKHJlcy5kYXRhLmltYWdlKSkgeyAvLyDkurrohLjor4bliKvlpLHotKXlvoXmoIflrppcclxuICAgICAgICAgICAgICAgIGxldCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgICAgICAgaW1hZ2Uuc3JjID0gJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJyArIHJlcy5kYXRhLmltYWdlO1xyXG4gICAgICAgICAgICAgICAgaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWxlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIl9pbmZvXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogaW1hZ2Uud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBpbWFnZS5oZWlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5mYWNlRGVtYXJjYXRlKHJlcy5kYXRhLCBmaWxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubGF5ZXJEZWMud2FybkluZm8oJ+S6uuiEuOivhuWIq+Wksei0pScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Yig6Zmk5Zu+54mHXHJcbiAgICBkZWxldGVJbWFnZShpOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLkZhY2VUcmFja1BhcmFtcy5pbWFnZVBhdGhMaXN0LnNwbGljZShpLCAxKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9u5aSa5Lq66IS46YCJ5oupXHJcbiAgICAgKiBAcGFyYW0gZmFjZUluZm9cclxuICAgICAqIEBwYXJhbSBmaWxlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtdWx0aVVzZXJTZWxlY3QoZmFjZUluZm86IGFueSwgZmlsZTogYW55KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBzY29wZTogeyBsYXllcjogYW55OyBpbmRleDogc3RyaW5nLCAkZGVzdHJveTogRnVuY3Rpb24sIGRhdGE6IGFueSwgZmlsZTogYW55LCBjb21tYW5kVHlwZTogc3RyaW5nLCBkZXRlY3RUeXBlOiBzdHJpbmcsIGxheWVySW5kZXg6IGFueSwgZnJvbVNlbGVjdEZhY2VDdHJsOiBzdHJpbmcgfSA9IHNlbGYuJHNjb3BlLiRuZXcoKTtcclxuXHJcbiAgICAgICAgc2NvcGUuaW5kZXggPSBudWxsO1xyXG4gICAgICAgIHNjb3BlLmRhdGEgPSBmYWNlSW5mbztcclxuICAgICAgICBzY29wZS5maWxlID0gZmlsZTtcclxuICAgICAgICBzY29wZS5jb21tYW5kVHlwZSA9IFwiU2VhcmNoQWNjZXNzTG9nXCI7XHJcbiAgICAgICAgc2NvcGUuZGV0ZWN0VHlwZSA9IFwiRmFjZVwiO1xyXG4gICAgICAgIHNjb3BlLmZyb21TZWxlY3RGYWNlQ3RybCA9IHNlbGYuc2VsZWN0RmFjZUN0cmw7XHJcblxyXG4gICAgICAgIHNjb3BlLmxheWVySW5kZXggPSBzZWxmLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBza2luOiAnbm8tc2Nyb2xsJyxcclxuICAgICAgICAgICAgdGl0bGU6IFsn5Lq66IS46YCJ5oupJywgJ2ZvbnQtd2VpZ2h0OiBib2xkO2JhY2tncm91bmQtY29sb3I6ICNGNkY4RkI7Y29sb3I6ICM2MDYwNjA7aGVpZ2h0OiA0MHB4OyddLFxyXG4gICAgICAgICAgICBhcmVhOiBbJzQwMHB4JywgJzMxMHB4J10sXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IHNlbGVjdEZhY2VQb3B1cEh0bWwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9u5Lq66IS45qCH5rOoXHJcbiAgICAgKiBAcGFyYW0gZmFjZUluZm9cclxuICAgICAqIEBwYXJhbSBmaWxlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmYWNlRGVtYXJjYXRlKGZhY2VJbmZvOiBhbnksIGZpbGU6IGFueSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgc2NvcGU6IHsgbGF5ZXI6IGFueTsgaW5kZXg6IHN0cmluZywgJGRlc3Ryb3k6IEZ1bmN0aW9uLCBkYXRhOiBhbnksIGZpbGU6IGFueSwgY29tbWFuZFR5cGU6IHN0cmluZywgZGV0ZWN0VHlwZTogc3RyaW5nLCBsYXllckluZGV4OiBhbnksIGZyb21EZW1hcmNhdGVGYWNlQ3RybDogc3RyaW5nLCBmbGFnOiBib29sZWFuIH0gPSBzZWxmLiRzY29wZS4kbmV3KCk7XHJcblxyXG4gICAgICAgIHNjb3BlLmluZGV4ID0gbnVsbDtcclxuICAgICAgICBzY29wZS5kYXRhID0gZmFjZUluZm87XHJcbiAgICAgICAgc2NvcGUuZmlsZSA9IGZpbGU7XHJcbiAgICAgICAgc2NvcGUuY29tbWFuZFR5cGUgPSBcIlNlYXJjaEFjY2Vzc0xvZ1wiO1xyXG4gICAgICAgIHNjb3BlLmRldGVjdFR5cGUgPSBcIkZhY2VcIjtcclxuICAgICAgICBzY29wZS5mcm9tRGVtYXJjYXRlRmFjZUN0cmwgPSBzZWxmLnNlbGVjdEZhY2VDdHJsO1xyXG4gICAgICAgIHNjb3BlLmZsYWcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgc2NvcGUubGF5ZXJJbmRleCA9IHNlbGYubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIHNraW46ICduby1zY3JvbGwnLFxyXG4gICAgICAgICAgICB0aXRsZTogWyfkurrohLjmoIfms6gnLCAnZm9udC13ZWlnaHQ6IGJvbGQ7YmFja2dyb3VuZC1jb2xvcjogI0Y2RjhGQjtjb2xvcjogIzYwNjA2MDtoZWlnaHQ6IDQwcHg7J10sXHJcbiAgICAgICAgICAgIGFyZWE6IFsnNjUwcHgnLCAnNTU1cHgnXSxcclxuICAgICAgICAgICAgY29udGVudDogZGVtYXJjYXRlUG9wdXBIdG1sLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOafpeeci+ivpuaDhVxyXG4gICAgb3BlbkRldGFpbFBvcHVwKGl0ZW06IFJlc3VsdCwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgb2JqZWN0VHlwZTpzdHJpbmcgPVwiXCI7XHJcbiAgICAgICAgbGV0IG5ld0l0ZW06IGFueSA9IHt9O1xyXG4gICAgICAgIGxldCBuZXdMaXN0OkFycmF5PGFueT4gPSBbXTtcclxuXHJcbiAgICAgICAgb2JqZWN0VHlwZSA9IE9iamVjdFR5cGUuQ2FtZXJhLnZhbHVlO1xyXG4gICAgICAgIG5ld0l0ZW0gPSBpdGVtO1xyXG4gICAgICAgIG5ld0xpc3QucHVzaChuZXdJdGVtKTtcclxuXHJcbiAgICAgICAgbGV0IHNjb3BlOiB7XHJcbiAgICAgICAgICAgICRkZXN0cm95OiBGdW5jdGlvbixcclxuICAgICAgICAgICAgcmFuazogbnVtYmVyLFxyXG4gICAgICAgICAgICBhbGxMaXN0OiBBcnJheTxhbnk+LFxyXG4gICAgICAgICAgICBjb2xsZWN0RnVuY3Rpb246IEZ1bmN0aW9uLFxyXG4gICAgICAgICAgICBhbmFseXNpc0Z1bmN0aW9uOiBGdW5jdGlvbixcclxuICAgICAgICAgICAgc3VydmVpbGxhbmNlRnVuY3Rpb246IEZ1bmN0aW9uLFxyXG4gICAgICAgICAgICBjbG9zZVBvcHVwOiBGdW5jdGlvbixcclxuICAgICAgICAgICAgc2hvd0Zvb3RlcjogYm9vbGVhblxyXG4gICAgICAgICAgICBpbmRleDogYW55XHJcbiAgICAgICAgfSA9IHNlbGYuJHNjb3BlLiRuZXcoKTtcclxuXHJcbiAgICAgICAgc2NvcGUucmFuayA9IGluZGV4O1xyXG4gICAgICAgIHNjb3BlLnNob3dGb290ZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlLmluZGV4ID0gXCJcIjtcclxuICAgICAgICBzY29wZS5hbGxMaXN0ID0gbmV3TGlzdDtcclxuICAgICAgICBzY29wZS5jb2xsZWN0RnVuY3Rpb24gPSAoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuY2xpY2tDb2xsZWN0KG51bGwsIGl0ZW0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2NvcGUuYW5hbHlzaXNGdW5jdGlvbiA9IChpdGVtOiBhbnksIHR5cGU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLmNsaWNrQW5hbHlzaXMobnVsbCwgaXRlbSwgdHlwZSk7XHJcbiAgICAgICAgICAgIHNlbGYubGF5ZXIuY2xvc2Uoc2NvcGUuaW5kZXgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2NvcGUuc3VydmVpbGxhbmNlRnVuY3Rpb24gPSAoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuY2xpY2tTdXJ2ZWlsbGFuY2UobnVsbCwgaXRlbSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzY29wZS5jbG9zZVBvcHVwID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLmxheWVyLmNsb3NlKHNjb3BlLmluZGV4KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNlbGYuYW5hbHlzaXNNbWFwU2VydmVyLm9wZW5EZXRhaWxQb3B1cChuZXdJdGVtLCBpbmRleCwgbmV3TGlzdCwgb2JqZWN0VHlwZSwgc2NvcGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOaUtuiXj+S4juWPlua2iOaUtuiXj1xyXG4gICAgICogQHBhcmFtIGl0ZW1cclxuICAgICAqL1xyXG4gICAgY2xpY2tDb2xsZWN0KGV2ZW50OiBhbnksIGl0ZW06IGFueSkge1xyXG4gICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGlmICghaXRlbS5jb2xsZWN0U3RhdHVzKSB7XHJcbiAgICAgICAgICAgIGxldCBwYXJhbXM6IGFueSA9IHtcclxuICAgICAgICAgICAgICAgIGpzb246IGFuZ3VsYXIudG9Kc29uKGl0ZW0pLFxyXG4gICAgICAgICAgICAgICAgb2JqZWN0SUQ6IGl0ZW0uQWNjZXNzTG9nLklELFxyXG4gICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogXCJGYWNlXCJcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2VsZi5yZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UuY29sbGVjdEFkZEluZm8ocGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBwYXJhbXM6IGFueSA9IHtcclxuICAgICAgICAgICAgICAgIGlkczogaXRlbS5BY2Nlc3NMb2cuSURcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2VsZi5yZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UuY29sbGVjdERlbGV0ZUluZm8ocGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBpdGVtLmNvbGxlY3RTdGF0dXMgPSAhaXRlbS5jb2xsZWN0U3RhdHVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOWIhuaekFxyXG4gICAgICogQHBhcmFtIGl0ZW1cclxuICAgICAqL1xyXG4gICAgY2xpY2tBbmFseXNpcyhldmVudDphbnksIGl0ZW06YW55LCB0eXBlOnN0cmluZykge1xyXG4gICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHN0b3JhZ2VQYXJhbXM6IEFuYWx5c2lzU3RvcmFnZVBhcmFtcyA9IEFuYWx5c2lzRGF0YVR5cGUuRmFjZTtcclxuICAgICAgICBzdG9yYWdlUGFyYW1zLmRhdGEgPSBpdGVtO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlU3RvcmFnZS5zZXRTZXNzaW9uU3RvcmFnZURhdGEoc3RvcmFnZVBhcmFtcy5rZXksIHN0b3JhZ2VQYXJhbXMpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiQW5hbHlzaXNUeXBlXCIsIFwiRmFjZVwiKTtcclxuICAgICAgICBpZiAodHlwZSA9PT0gQW5hbHlzaXNHb1RvVHlwZS5UcmFjay5rZXkpIHtcclxuICAgICAgICAgICAgd2luZG93Lm9wZW4oQW5hbHlzaXNHb1RvVHlwZS5UcmFjay5kYXRhKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IEFuYWx5c2lzR29Ub1R5cGUuQWNjb21wYW55aW5nLmtleSkge1xyXG4gICAgICAgICAgICB3aW5kb3cub3BlbihBbmFseXNpc0dvVG9UeXBlLkFjY29tcGFueWluZy5kYXRhKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IEFuYWx5c2lzR29Ub1R5cGUuRnJlcXVlbmN5LmtleSkge1xyXG4gICAgICAgICAgICB3aW5kb3cub3BlbihBbmFseXNpc0dvVG9UeXBlLkZyZXF1ZW5jeS5kYXRhKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IEFuYWx5c2lzR29Ub1R5cGUuTW9yZS5rZXkpIHtcclxuICAgICAgICAgICAgd2luZG93Lm9wZW4oQW5hbHlzaXNHb1RvVHlwZS5Nb3JlLmRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDluIPmjqfkuI7lj5bmtojluIPmjqdcclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIGNsaWNrU3VydmVpbGxhbmNlKGV2ZW50OiBhbnksIGl0ZW06IGFueSkge1xyXG4gICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaXRlbS5zdXJ2ZWlsbGFuY2VTdGF0dXMgPSAhaXRlbS5zdXJ2ZWlsbGFuY2VTdGF0dXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5p+l55yL5YWo5Zu+XHJcbiAgICBwdWJsaWMgZnVsbFNjcmVlbihldmVudDogYW55LCBwYXRoOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzY29wZTogeyBsYXllcjogYW55OyBpbmRleDogc3RyaW5nLCBwYXRoOiBhbnksICRkZXN0cm95OiBGdW5jdGlvbiB9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLmluZGV4ID0gXCJmdWxsU2NyZWVuUG9wdXBcIjtcclxuICAgICAgICBzY29wZS5wYXRoID0gcGF0aDtcclxuICAgICAgICBpZiAocGF0aCkge1xyXG4gICAgICAgICAgICBsZXQgd2luZG93VzogYW55ID0gJCh3aW5kb3cpLndpZHRoKCkgKiAwLjg7XHJcbiAgICAgICAgICAgIGxldCB3aW5kb3dIOiBhbnkgPSAkKHdpbmRvdykuaGVpZ2h0KCkgKiAwLjg7XHJcbiAgICAgICAgICAgIGxldCBjb250ZW50SFRNTCA9IGA8aW1nIG5nLXNyYz0ke3BhdGh9IHN0eWxlPSd3aWR0aDoke3dpbmRvd1d9cHg7aGVpZ2h0OiR7d2luZG93SH1weDsnPmA7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY2xvc2VCdG46IDAsXHJcbiAgICAgICAgICAgICAgICBza2luOiAnbGF5dWktbGF5ZXItbm9iZyBuby1zY3JvbGwnLFxyXG4gICAgICAgICAgICAgICAgc2hhZGVDbG9zZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNoYWRlOiAwLjYsXHJcbiAgICAgICAgICAgICAgICBhcmVhOiBbd2luZG93VyArICdweCcsIHdpbmRvd0ggKyAncHgnXSxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGNvbnRlbnRIVE1MLFxyXG4gICAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5tc2coXCLlm77niYflnLDlnYDkuI3lrZjlnKhcIilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6ZSA5q+B5Zyw5Zu+5Zu+5bGCXHJcbiAgICBwcml2YXRlIGRlc3RvcnlGb3JNYXBNYXJrZXIoKSB7XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIuY2xlYXJUcmFjZUFuYWx5emUoKTtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5jbGVhclJlc3VsdE1hcmtlcnMoKTtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5jbGVhckFjY3BNYXJrZXJzKCk7XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIuY2xlYXJUcmFja0luZm9XaW5kb3coKTtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5jbGVhckFjY3BUcmFja0luZm9XaW5kb3coKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDliqDovb3kuK3liqjnlLtcclxuICAgIGluaXRMb2FkaW5nUG9wKCkge1xyXG4gICAgICAgIGxldCBzY29wZTogeyAkZGVzdHJveTogRnVuY3Rpb24gfSA9IHRoaXMuJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRMYXllckluZGV4ID0gdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgY29udGVudDogbG9hZGluZ0FuYWx5c2lzSHRtbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICB0aXRsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFyZWE6IFsnNTAwcHgnLCBcIjI4MHB4XCJdLFxyXG4gICAgICAgICAgICBlbmQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcignRmFjZVRyYWNrQ29udHJvbGxlcicsIEZhY2VUcmFja0NvbnRyb2xsZXIpOyJdfQ==
