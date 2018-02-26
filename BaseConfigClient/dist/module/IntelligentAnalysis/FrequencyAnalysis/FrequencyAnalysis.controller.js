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
define(["require", "exports", "text!../loading/loading.html", "text!../../selectPopup/treeCamera/Tree.camera.popup.html", "text!../../selectPopup/checkAreaPopup/check.area.popup.html", "text!../../common/faceHandlePopup/selectFace.popup.html", "text!../../common/faceHandlePopup/demarcate.popup.html", "../../common/app/main.app", "../../../core/server/FrequencyAnalysisParams", "../AnalysisEnum", "../../../core/server/enum/AnalyseTaskOffLine", "../../common/Pagination", "../../../core/entity/FaceTrackEnum", "../../../core/enum/ObjectType", "../../../core/server/enum/CollectDataType", "../../../core/server/enum/AnalysisDataType", "lodash", "../../selectPopup/treeCamera/Tree.camera.popup", "../../selectPopup/checkAreaPopup/check.area.popup.controller", "../../common/services/analysis.service", "../../common/factory/userinfo.cache.factory", "../main/analysisMmap.server", "../../common/factory/layerMsg.factory", "../../common/services/resourceRetrieval.service", "../../common/factory/HandleStorage.factory", "../../common/services/uploadImage.service"], function (require, exports, loadingAnalysisHtml, cameraTreePopupHtml, PopupHtml, selectFacePopupHtml, demarcatePopupHtml, main_app_1, FrequencyAnalysisParams_1, AnalysisEnum_1, AnalyseTaskOffLine_1, Pagination_1, FaceTrackEnum_1, ObjectType_1, CollectDataType_1, AnalysisDataType_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CacheResult = (function (_super) {
        __extends(CacheResult, _super);
        function CacheResult() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CacheResult;
    }(FaceTrackEnum_1.Result));
    var FrequencyAnalysisController = (function () {
        function FrequencyAnalysisController($scope, $timeout, analysisService, layer, userInfoCacheFactory, layerDec, analysisMmapServer, resourceRetrievalService, handleStorage, uploadImageService, $interval) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.analysisService = analysisService;
            this.layer = layer;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.layerDec = layerDec;
            this.analysisMmapServer = analysisMmapServer;
            this.resourceRetrievalService = resourceRetrievalService;
            this.handleStorage = handleStorage;
            this.uploadImageService = uploadImageService;
            this.$interval = $interval;
            this.$inject = ['$scope', '$timeout', 'analysisService', 'layer', 'userInfoCacheFactory', 'layerDec', 'IAnalysisMmapServer', "resourceRetrievalService", 'handleStorage', 'uploadImageService', '$interval'];
            this.FrequencyAnalysisParams = new FrequencyAnalysisParams_1.FrequencyAnalysisParams();
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
            this.windowWidth = AnalysisEnum_1.getWidowSize().width - 60;
            this.windowHeight = AnalysisEnum_1.getWidowSize().height - 53;
            this.isSlideResult = [];
            this.arrCameraId = [];
            this.selectDeviceCb = "close.device.popup";
            this.selectFaceCtrl = "get-face-info-quick";
            this.FrequencyAnalysisImage = "";
            this.analysisGoTo = AnalysisDataType_1.AnalysisGoToType;
            var self = this;
            self.FrequencyAnalysisParams = self.initParams();
            self.$timeout(function () {
                self.$scope.$emit('showItemPage', true);
            });
            self.$scope.$on('$destroy', function () {
                try {
                    self.analysisMmapServer.clearDraw();
                    self.analysisMmapServer.renderSystemPoint();
                }
                catch (e) {
                    console.error('触发直接销毁Map事件，导致map对象被销毁，轨迹触发自身的销毁事件中无法获取map对象导致的报错，可以忽略！', e);
                }
                $interval.cancel(self.setInterval);
            });
            self.$scope.$on(self.selectFaceCtrl, function (event, data) {
                self.$timeout(function () {
                    self.FrequencyAnalysisParams.imagePath = data.data.imageurl;
                    self.FrequencyAnalysisParams.taskId = data.data.key;
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
                self.findOffLineList();
            }, 10000);
        }
        FrequencyAnalysisController.prototype.initParams = function () {
            var self = this;
            self.FastDate = AnalysisEnum_1.FastData.today;
            self.SexDate = AnalysisEnum_1.SexData.all;
            self.GlassDate = AnalysisEnum_1.GlassesData.all;
            self.MaskDate = AnalysisEnum_1.MaskData.all;
            var params = new FrequencyAnalysisParams_1.FrequencyAnalysisParams();
            params.taskName = "";
            params.taskId = "";
            params.startTime = self.FastDate.value.startTime;
            params.endTime = self.FastDate.value.endTime;
            params.arrCameraId = [];
            params.threshold = 90;
            params.arrGender = [];
            params.arrEyeGlasses = [];
            params.arrMask = [];
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
        FrequencyAnalysisController.prototype.deviceIdFilter = function (ids, type) {
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
        FrequencyAnalysisController.prototype.setFastDate = function (item) {
            this.FastDate = item;
            this.FrequencyAnalysisParams.startTime = item.value.startTime;
            this.FrequencyAnalysisParams.endTime = item.value.endTime;
        };
        FrequencyAnalysisController.prototype.deleteImage = function () {
            this.FrequencyAnalysisParams.imagePath = null;
            this.FrequencyAnalysisParams.taskId = null;
        };
        FrequencyAnalysisController.prototype.selectAge = function (age) {
            if (typeof age !== 'string') {
                this.FrequencyAnalysisParams.maxAge = age.value.maxAge;
                this.FrequencyAnalysisParams.minAge = age.value.minAge;
            }
            else {
                this.FrequencyAnalysisParams.maxAge = null;
                this.FrequencyAnalysisParams.minAge = null;
            }
        };
        FrequencyAnalysisController.prototype.goBack = function () {
            var _this = this;
            this.$timeout(function () {
                _this.$scope.$emit('showItemPage', false);
            });
        };
        FrequencyAnalysisController.prototype.goBackForm = function () {
            var _this = this;
            this.analysisMmapServer.clearResultMarkers();
            this.$timeout(function () {
                _this.showForm = true;
                _this.showResult = false;
                _this.showAllResult = false;
                _this.analysisMmapServer.renderSystemPoint();
            });
        };
        FrequencyAnalysisController.prototype.slideRightResult = function (i) {
            this.setCheckRightResult(this.resultParams.pageSize, i);
        };
        FrequencyAnalysisController.prototype.setCheckRightResult = function (size, traget, isFirst) {
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
            _.forEach(self.resultParams.data[traget].FaceFrequencyInfos, function (value) {
                params.deviceIds.push(value.AccessLog.CameraID);
                params.ids.push(value.AccessLog.ID);
            });
            self.resourceRetrievalService.getDeviceInfoPromise(params).then(function (res) {
                _.forEach(self.resultParams.data[traget].FaceFrequencyInfos, function (item, index) {
                    item.deviceInfo = res.data.deviceInfo[index];
                    item.collectStatus = res.data.collectStatus[index];
                });
                self.$timeout(function () {
                    self.renderAccpMarkers();
                });
            });
        };
        FrequencyAnalysisController.prototype.renderAccpMarkers = function () {
            var self = this;
            self.allResult = self.resultParams.data[self.resultIndex].FaceFrequencyInfos;
            self.$timeout(function () {
                self.setResultForMap(self.allResult);
            }).then(function () {
                var arr = self.analysisMmapServer.getSystemPointForParams(self.allResult);
                self.analysisMmapServer.renderMakers(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForResultGroup, true, arr, self.resultForMap);
            });
        };
        FrequencyAnalysisController.prototype.openDetailPopup = function (item, index, groupList) {
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
        FrequencyAnalysisController.prototype.resultToMap = function (item, index) {
            this.analysisMmapServer.resultToMap(item);
        };
        FrequencyAnalysisController.prototype.unResultToMap = function (item, index) {
            this.analysisMmapServer.unResultToMap(item, this.resultForMap);
        };
        FrequencyAnalysisController.prototype.selectCamera = function () {
            var scope = this.$scope.$new();
            scope.selectCameraList = this.FrequencyAnalysisParams.arrCameraId;
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
        FrequencyAnalysisController.prototype.DrawRect = function () {
            var _this = this;
            this.analysisMmapServer.drawRect(function (points, geometry) {
                _this.$timeout(function () {
                    _this.DrawCallBackMethod(points, geometry);
                });
            });
        };
        FrequencyAnalysisController.prototype.DrawCircle = function () {
            var _this = this;
            this.analysisMmapServer.drawCircle(function (points, geometry) {
                _this.$timeout(function () {
                    _this.DrawCallBackMethod(points, geometry);
                });
            });
        };
        FrequencyAnalysisController.prototype.DrawPolygon = function () {
            var _this = this;
            this.analysisMmapServer.drawPolygon(function (points, geometry) {
                _this.$timeout(function () {
                    _this.DrawCallBackMethod(points, geometry);
                });
            });
        };
        FrequencyAnalysisController.prototype.ClearDraw = function () {
            this.arrCameraId = [];
            this.FrequencyAnalysisParams.arrCameraId = [];
            this.analysisMmapServer.clearDraw();
        };
        FrequencyAnalysisController.prototype.DrawCallBackMethod = function (points, geometry) {
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
        FrequencyAnalysisController.prototype.checkArea = function (deviceList, geometry) {
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
        FrequencyAnalysisController.prototype.delOffLineTask = function (item) {
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
        FrequencyAnalysisController.prototype.submitSearch = function () {
            var self = this;
            if (!self.FrequencyAnalysisParams.taskName) {
                return self.layerDec.warnInfo('请输入任务名称');
            }
            if (!self.FrequencyAnalysisParams.taskId) {
                return self.layerDec.warnInfo('请上传图片');
            }
            if (self.FrequencyAnalysisParams.endTime < self.FrequencyAnalysisParams.startTime) {
                self.layerDec.warnInfo('开始时间不能晚于结束时间!');
                return false;
            }
            if (self.arrCameraId.length > 0) {
                self.FrequencyAnalysisParams.arrCameraId = self.arrCameraId;
            }
            else {
                var systemPointList = self.analysisMmapServer.getSystemPoint();
                var cameraList_1 = [];
                _(systemPointList).forEach(function (value) {
                    if (ObjectType_1.ObjectType.Camera.value === value.ObjectType) {
                        cameraList_1.push(value.ObjectID);
                    }
                });
                self.FrequencyAnalysisParams.arrCameraId = cameraList_1;
            }
            if (self.SexDate.value) {
                self.FrequencyAnalysisParams.arrGender.push(self.SexDate.value);
            }
            if (self.GlassDate.value) {
                self.FrequencyAnalysisParams.arrEyeGlasses.push(self.GlassDate.value);
            }
            if (self.MaskDate.value) {
                self.FrequencyAnalysisParams.arrMask.push(self.MaskDate.value);
            }
            self.initLoadingPop();
            self.analysisService.faceFrequencyAnalysis(this.FrequencyAnalysisParams).then(function (res) {
                self.layer.close(self.currentLayerIndex);
                if (res.code === 200) {
                    self.showAnalysisList = true;
                    self.findOffLineList();
                    self.FrequencyAnalysisParams = self.initParams();
                }
                else {
                    self.layerDec.warnInfo('离线任务创建失败');
                }
            });
        };
        FrequencyAnalysisController.prototype.showAnalysisListFn = function (flag) {
            this.showAnalysisList = flag;
            if (flag) {
                this.findOffLineList();
            }
        };
        FrequencyAnalysisController.prototype.findOffLineList = function () {
            var _this = this;
            var params = {
                id: this.userInfoCacheFactory.getCurrentUserId(),
                taskType: AnalyseTaskOffLine_1.OfflineTaskType.SearchFaceFrequency
            };
            this.analysisService.getOffLineList(params).then(function (res) {
                if (res.code === 200) {
                    _this.FrequencyOffLine = res.data ? res.data : [];
                }
            });
        };
        FrequencyAnalysisController.prototype.changeResultPage = function (i) {
            var _this = this;
            this.resultParams.currentPage = i;
            this.resultParams = this.pagination.getByPage(this.resultParams);
            this.setCheckRightResult(this.resultParams.data.length, i, true);
            this.$timeout(function () {
                _this.analysisMmapServer.renderMakers(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForResultGroup, true, _this.analysisMmapServer.getSystemPointForParams(_this.resultParams.data), _this.resultForMap);
            });
        };
        FrequencyAnalysisController.prototype.setResultForMap = function (result) {
            var obj = {};
            result.forEach(function (item, i) {
                obj[item.AccessLog.ID] = item;
                obj[item.AccessLog.ID].resultIndex = i;
            });
            this.resultForMap = obj;
        };
        FrequencyAnalysisController.prototype.closeAllResult = function () {
            this.showResult = true;
            this.showAllResult = false;
            this.resultParams.currentPage = 1;
            this.resultParams.pageSize = 6;
            this.resultParams = this.pagination.getByPage(this.resultParams);
        };
        FrequencyAnalysisController.prototype.goAllResult = function () {
            this.showResult = false;
            this.showAllResult = true;
            this.resultParams.pageSize = 40;
            this.resultParams.currentPage = 1;
            this.resultParams = this.pagination.getByPage(this.resultParams);
        };
        FrequencyAnalysisController.prototype.showAnalysisResult = function (item) {
            var self = this;
            var params = {
                analyseTaskType: AnalyseTaskOffLine_1.AnalyseTaskType.SearchAnalyseTaskResult,
                taskId: item.TaskId,
                TaskType: item.TaskType
            };
            self.initLoadingPop();
            self.analysisService.getOffLineDetail(params).then(function (res) {
                if (res.code === 200) {
                    if (res.data && res.data.Result && res.data.Result.length && res.data.Result[0].FaceFrequencys.length) {
                        self.$timeout(function () {
                            self.pagination.set(res.data.Result[0].FaceFrequencys);
                        }).then(function () {
                            self.resultParams.currentPage = 1;
                            self.resultParams.pageSize = 6;
                            self.analysisMmapServer.removeSystemPoint();
                            self.FrequencyAnalysisImage = res.data.Result[0].imgUrl;
                            self.resultParams = self.pagination.getByPage(self.resultParams);
                        }).then(function () {
                            self.showResult = true;
                            self.showForm = false;
                            self.setCheckRightResult(self.resultParams.pageSize, 0, true);
                            self.layer.close(self.currentLayerIndex);
                        });
                    }
                    else {
                        self.layerDec.info('没有查询到结果');
                    }
                }
                else {
                    self.layerDec.warnInfo('查询结果失败');
                }
                self.layer.close(self.currentLayerIndex);
            });
        };
        FrequencyAnalysisController.prototype.uploadImage = function (event) {
            var self = this;
            var from = new FormData();
            from.append('image', event.target.files[0]);
            var data = {
                storeType: "LOC",
                imageCategory: "CaptureImage",
                commandType: "SearchFaceFrequency",
                detectType: "Face"
            };
            this.uploadImageService.uploadImageForFace(from, data).then(function (res) {
                if ((res.code === 200) && (res.data && res.data.key)) {
                    self.$timeout(function () {
                        self.FrequencyAnalysisParams.imagePath = res.data.imageurl;
                        self.FrequencyAnalysisParams.taskId = res.data.key;
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
        FrequencyAnalysisController.prototype.multiUserSelect = function (faceInfo, file) {
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
        FrequencyAnalysisController.prototype.faceDemarcate = function (faceInfo, file) {
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
        FrequencyAnalysisController.prototype.initLoadingPop = function () {
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
        FrequencyAnalysisController.prototype.clickCollect = function (event, item) {
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
        FrequencyAnalysisController.prototype.clickAnalysis = function (event, item, type) {
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
        FrequencyAnalysisController.prototype.clickSurveillance = function (event, item) {
            if (event) {
                event.stopPropagation();
            }
            item.surveillanceStatus = !item.surveillanceStatus;
        };
        FrequencyAnalysisController.prototype.fullScreen = function (event, path) {
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
        return FrequencyAnalysisController;
    }());
    main_app_1.app.controller('FrequencyAnalysisController', FrequencyAnalysisController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9GcmVxdWVuY3lBbmFseXNpcy9GcmVxdWVuY3lBbmFseXNpcy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUEwREE7UUFBMEIsK0JBQU07UUFBaEM7O1FBRUEsQ0FBQztRQUFELGtCQUFDO0lBQUQsQ0FGQSxBQUVDLENBRnlCLHNCQUFNLEdBRS9CO0lBRUQ7UUFvQ0kscUNBQW9CLE1BQVcsRUFDWCxRQUFhLEVBQ2IsZUFBaUMsRUFDakMsS0FBVSxFQUNWLG9CQUEyQyxFQUMzQyxRQUFtQixFQUNuQixrQkFBdUMsRUFDdkMsd0JBQW1ELEVBQ25ELGFBQTZCLEVBQzdCLGtCQUF1QyxFQUN2QyxTQUFhO1lBVmIsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLGFBQVEsR0FBUixRQUFRLENBQUs7WUFDYixvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7WUFDakMsVUFBSyxHQUFMLEtBQUssQ0FBSztZQUNWLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBdUI7WUFDM0MsYUFBUSxHQUFSLFFBQVEsQ0FBVztZQUNuQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXFCO1lBQ3ZDLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMkI7WUFDbkQsa0JBQWEsR0FBYixhQUFhLENBQWdCO1lBQzdCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBcUI7WUFDdkMsY0FBUyxHQUFULFNBQVMsQ0FBSTtZQTdDakMsWUFBTyxHQUFrQixDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLFVBQVUsRUFBRSxxQkFBcUIsRUFBRSwwQkFBMEIsRUFBRSxlQUFlLEVBQUUsb0JBQW9CLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDdk4sNEJBQXVCLEdBQTRCLElBQUksaURBQXVCLEVBQUUsQ0FBQztZQUNqRixpQkFBWSxHQUE0Qiw4QkFBZSxFQUFFLENBQUM7WUFD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QUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQztnQkFDNUMsSUFBSSxXQUFXLEdBQUcsaUJBQWUsSUFBSSxzQkFBaUIsT0FBTyxrQkFBYSxPQUFPLFVBQU8sQ0FBQztnQkFDekYsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7b0JBQ1osSUFBSSxFQUFFLENBQUM7b0JBQ1AsS0FBSyxFQUFFLEtBQUs7b0JBQ1osUUFBUSxFQUFFLENBQUM7b0JBQ1gsSUFBSSxFQUFFLDRCQUE0QjtvQkFDbEMsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLEtBQUssRUFBRSxHQUFHO29CQUNWLElBQUksRUFBRSxDQUFDLE9BQU8sR0FBRyxJQUFJLEVBQUUsT0FBTyxHQUFHLElBQUksQ0FBQztvQkFDdEMsT0FBTyxFQUFFLFdBQVc7b0JBQ3BCLEtBQUssRUFBRSxLQUFLO29CQUNaLEdBQUcsRUFBRTt3QkFDRCxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ3JCLENBQUM7aUJBQ0osQ0FBQyxDQUFDO1lBQ1AsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQzdCLENBQUM7UUFDTCxDQUFDO1FBQ0wsa0NBQUM7SUFBRCxDQXJ2QkEsQUFxdkJDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLDZCQUE2QixFQUFFLDJCQUEyQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL0ludGVsbGlnZW50QW5hbHlzaXMvRnJlcXVlbmN5QW5hbHlzaXMvRnJlcXVlbmN5QW5hbHlzaXMuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vbG9hZGluZy9sb2FkaW5nLmh0bWxcIiBuYW1lPVwibG9hZGluZ0FuYWx5c2lzSHRtbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vLi4vc2VsZWN0UG9wdXAvdHJlZUNhbWVyYS9UcmVlLmNhbWVyYS5wb3B1cC5odG1sXCIgbmFtZT1cImNhbWVyYVRyZWVQb3B1cEh0bWxcIiAvPlxyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uLy4uL3NlbGVjdFBvcHVwL2NoZWNrQXJlYVBvcHVwL2NoZWNrLmFyZWEucG9wdXAuaHRtbFwiIG5hbWU9XCJQb3B1cEh0bWxcIiAvPlxyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uLy4uL2NvbW1vbi9mYWNlSGFuZGxlUG9wdXAvc2VsZWN0RmFjZS5wb3B1cC5odG1sXCIgbmFtZT1cInNlbGVjdEZhY2VQb3B1cEh0bWxcIiAvPlxyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uLy4uL2NvbW1vbi9mYWNlSGFuZGxlUG9wdXAvZGVtYXJjYXRlLnBvcHVwLmh0bWxcIiBuYW1lPVwiZGVtYXJjYXRlUG9wdXBIdG1sXCIgLz5cclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcblxyXG4vLyDlvLnmoYZcclxuaW1wb3J0ICcuLi8uLi9zZWxlY3RQb3B1cC90cmVlQ2FtZXJhL1RyZWUuY2FtZXJhLnBvcHVwJ1xyXG5pbXBvcnQgJy4uLy4uL3NlbGVjdFBvcHVwL2NoZWNrQXJlYVBvcHVwL2NoZWNrLmFyZWEucG9wdXAuY29udHJvbGxlcic7XHJcblxyXG4vLyDmnI3liqFcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FuYWx5c2lzLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtJQW5hbHlzaXNTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FuYWx5c2lzLnNlcnZpY2VcIjtcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL2ZhY3RvcnkvdXNlcmluZm8uY2FjaGUuZmFjdG9yeVwiO1xyXG5pbXBvcnQge0lVc2VySW5mb0NhY2hlRmFjdG9yeX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9mYWN0b3J5L3VzZXJpbmZvLmNhY2hlLmZhY3RvcnlcIjtcclxuaW1wb3J0IFwiLi4vbWFpbi9hbmFseXNpc01tYXAuc2VydmVyXCI7XHJcbmltcG9ydCB7SUFuYWx5c2lzTW1hcFNlcnZlcn0gZnJvbSBcIi4uL21haW4vYW5hbHlzaXNNbWFwLnNlcnZlclwiO1xyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vZmFjdG9yeS9sYXllck1zZy5mYWN0b3J5XCI7XHJcbmltcG9ydCB7SUxheWVyRGVjfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZhY3RvcnkvbGF5ZXJNc2cuZmFjdG9yeVwiO1xyXG5pbXBvcnQgJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9yZXNvdXJjZVJldHJpZXZhbC5zZXJ2aWNlJztcclxuaW1wb3J0IHtJUmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlfSBmcm9tICcuLi8uLi9jb21tb24vc2VydmljZXMvcmVzb3VyY2VSZXRyaWV2YWwuc2VydmljZSc7XHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL2ZhY3RvcnkvSGFuZGxlU3RvcmFnZS5mYWN0b3J5JztcclxuaW1wb3J0IHtJSGFuZGxlU3RvcmFnZX0gZnJvbSAnLi4vLi4vY29tbW9uL2ZhY3RvcnkvSGFuZGxlU3RvcmFnZS5mYWN0b3J5JztcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL3VwbG9hZEltYWdlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtJVXBsb2FkSW1hZ2VTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL3VwbG9hZEltYWdlLnNlcnZpY2VcIjtcclxuXHJcblxyXG4vLyDlj4LmlbBcclxuaW1wb3J0IHtTeXN0ZW1Qb2ludH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L1N5c3RlbVBvaW50XCI7XHJcbmltcG9ydCB7RnJlcXVlbmN5QW5hbHlzaXNQYXJhbXMsIEZyZXF1ZW5jeUFuYWx5c2lzUmV1bHR9IGZyb20gJy4uLy4uLy4uL2NvcmUvc2VydmVyL0ZyZXF1ZW5jeUFuYWx5c2lzUGFyYW1zJztcclxuaW1wb3J0IHtJbnRlbGlnZW50VGFza0luZm99IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L0ludGVsaWdlbnRUYXNrSW5mbyc7XHJcbmltcG9ydCB7QmFja1Jlc3BvbnNlQm9keSwgUmVzcG9uc2VSZXN1bHR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHtcclxuICAgIEZhc3REYXRhLFxyXG4gICAgZ2V0RmFzdERhdGFMaXN0LFxyXG4gICAgQWdlLFxyXG4gICAgRW51bSxcclxuICAgIFRpbWVMZW5ndGgsXHJcbiAgICBnZXRHbGFzc2VzRGF0YUxpc3QsXHJcbiAgICBnZXRNYXNrRGF0YUxpc3QsXHJcbiAgICBHbGFzc2VzRGF0YSxcclxuICAgIGdldEFnZUxpc3QsXHJcbiAgICBNYXNrRGF0YSxcclxuICAgIGdldFNleERhdGFMaXN0LFxyXG4gICAgZ2V0V2lkb3dTaXplLFxyXG4gICAgU2V4RGF0YSwgQXJyYXlVbmlxdWUsIE92ZXJsYXlOYW1lXHJcbn0gZnJvbSAnLi4vQW5hbHlzaXNFbnVtJztcclxuaW1wb3J0IHtBbmFseXNlVGFza1R5cGUsIE9mZmxpbmVUYXNrVHlwZX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vQW5hbHlzZVRhc2tPZmZMaW5lXCI7XHJcbmltcG9ydCB7UGFnaW5hdGlvbiwgSVBhZ2luYXRpb24sIFBhZ2VQYXJhbXNBbmRSZXN1bHR9IGZyb20gXCIuLi8uLi9jb21tb24vUGFnaW5hdGlvblwiO1xyXG5pbXBvcnQge1Jlc3VsdH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L0ZhY2VUcmFja0VudW1cIjtcclxuaW1wb3J0IHtPYmplY3RUeXBlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudW0vT2JqZWN0VHlwZSc7XHJcbmltcG9ydCB7Q29sbGVjdERhdGFUeXBlfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2ZXIvZW51bS9Db2xsZWN0RGF0YVR5cGVcIlxyXG5pbXBvcnQge0FuYWx5c2lzRGF0YVR5cGUsIEFuYWx5c2lzU3RvcmFnZVBhcmFtcywgQW5hbHlzaXNHb1RvVHlwZX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vQW5hbHlzaXNEYXRhVHlwZVwiO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcclxuXHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueSwgJDogYW55LCBjYW1lcmFUcmVlUG9wdXBIdG1sOiBhbnksIGxvYWRpbmdBbmFseXNpc0h0bWw6IGFueSwgc2VsZWN0RmFjZVBvcHVwSHRtbDogYW55LCBkZW1hcmNhdGVQb3B1cEh0bWw6IGFueSwgUG9wdXBIdG1sOiBhbnk7XHJcblxyXG5jbGFzcyBDYWNoZVJlc3VsdCBleHRlbmRzIFJlc3VsdCB7XHJcbiAgICByZXN1bHRJbmRleDogbnVtYmVyO1xyXG59XHJcblxyXG5jbGFzcyBGcmVxdWVuY3lBbmFseXNpc0NvbnRyb2xsZXIge1xyXG4gICAgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFsnJHNjb3BlJywgJyR0aW1lb3V0JywgJ2FuYWx5c2lzU2VydmljZScsICdsYXllcicsICd1c2VySW5mb0NhY2hlRmFjdG9yeScsICdsYXllckRlYycsICdJQW5hbHlzaXNNbWFwU2VydmVyJywgXCJyZXNvdXJjZVJldHJpZXZhbFNlcnZpY2VcIiwgJ2hhbmRsZVN0b3JhZ2UnLCAndXBsb2FkSW1hZ2VTZXJ2aWNlJywgJyRpbnRlcnZhbCddO1xyXG4gICAgRnJlcXVlbmN5QW5hbHlzaXNQYXJhbXM6IEZyZXF1ZW5jeUFuYWx5c2lzUGFyYW1zID0gbmV3IEZyZXF1ZW5jeUFuYWx5c2lzUGFyYW1zKCk7XHJcbiAgICBGYXN0RGF0ZUxpc3Q6IEFycmF5PEVudW08VGltZUxlbmd0aD4+ID0gZ2V0RmFzdERhdGFMaXN0KCk7XHJcbiAgICBTZXhEYXRlTGlzdDogQXJyYXk8RW51bTxudW1iZXI+PiA9IGdldFNleERhdGFMaXN0KCk7XHJcbiAgICBHbGFzc0RhdGVMaXN0OiBBcnJheTxFbnVtPG51bWJlcj4+ID0gZ2V0R2xhc3Nlc0RhdGFMaXN0KCk7XHJcbiAgICBBZ2VEYXRhTGlzdDogQXJyYXk8RW51bTxBZ2U+PiA9IGdldEFnZUxpc3QoKTtcclxuICAgIE1hc2tEYXRlTGlzdDogQXJyYXk8RW51bTxudW1iZXI+PiA9IGdldE1hc2tEYXRhTGlzdCgpO1xyXG4gICAgRmFzdERhdGU6IEVudW08VGltZUxlbmd0aD4gPSBGYXN0RGF0YS50b2RheTtcclxuICAgIFNleERhdGU6IEVudW08bnVtYmVyPiA9IFNleERhdGEuYWxsO1xyXG4gICAgR2xhc3NEYXRlOiBFbnVtPG51bWJlcj4gPSBHbGFzc2VzRGF0YS5hbGw7XHJcbiAgICBNYXNrRGF0ZTogRW51bTxudW1iZXI+ID0gTWFza0RhdGEuYWxsO1xyXG4gICAgc2ltaWxhcml0eU1heDogbnVtYmVyID0gMTAwO1xyXG4gICAgc2ltaWxhcml0eU1pbjogbnVtYmVyID0gODA7XHJcbiAgICBzaG93UmVzdWx0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBzaG93Rm9ybTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBzaG93QWxsUmVzdWx0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBzaG93QW5hbHlzaXNMaXN0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICByZXN1bHREZXRhaWw6IEZyZXF1ZW5jeUFuYWx5c2lzUmV1bHQ7XHJcbiAgICByZXN1bHRQYXJhbXM6IFBhZ2VQYXJhbXNBbmRSZXN1bHQgPSBuZXcgUGFnZVBhcmFtc0FuZFJlc3VsdCgpO1xyXG4gICAgcGFnaW5hdGlvbjogSVBhZ2luYXRpb24gPSBuZXcgUGFnaW5hdGlvbigpO1xyXG4gICAgcmVzdWx0Rm9yTWFwOiB7IFtrZXk6IHN0cmluZ106IFJlc3VsdCB8IENhY2hlUmVzdWx0IH07XHJcbiAgICBhbGxSZXN1bHQ6IEFycmF5PFJlc3VsdCB8IENhY2hlUmVzdWx0PjtcclxuICAgIEZyZXF1ZW5jeU9mZkxpbmU6IEFycmF5PEludGVsaWdlbnRUYXNrSW5mbz47XHJcbiAgICB3aW5kb3dXaWR0aDogbnVtYmVyID0gZ2V0V2lkb3dTaXplKCkud2lkdGggLSA2MDtcclxuICAgIHdpbmRvd0hlaWdodDogbnVtYmVyID0gZ2V0V2lkb3dTaXplKCkuaGVpZ2h0IC0gNTM7XHJcbiAgICBjdXJyZW50TGF5ZXJJbmRleDogbnVtYmVyO1xyXG4gICAgaXNTbGlkZVJlc3VsdDogQXJyYXk8Ym9vbGVhbj4gPSBbXTtcclxuICAgIHJlc3VsdEluZGV4OiBudW1iZXI7XHJcbiAgICBhcnJDYW1lcmFJZDogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgc2VsZWN0RGV2aWNlQ2I6IHN0cmluZyA9IFwiY2xvc2UuZGV2aWNlLnBvcHVwXCI7XHJcbiAgICBzZWxlY3RGYWNlQ3RybDogc3RyaW5nID0gXCJnZXQtZmFjZS1pbmZvLXF1aWNrXCI7XHJcbiAgICBGcmVxdWVuY3lBbmFseXNpc0ltYWdlOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgc2V0SW50ZXJ2YWw6YW55O1xyXG4gICAgYW5hbHlzaXNHb1RvID0gQW5hbHlzaXNHb1RvVHlwZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBhbmFseXNpc1NlcnZpY2U6IElBbmFseXNpc1NlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGxheWVyOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHVzZXJJbmZvQ2FjaGVGYWN0b3J5OiBJVXNlckluZm9DYWNoZUZhY3RvcnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGxheWVyRGVjOiBJTGF5ZXJEZWMsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGFuYWx5c2lzTW1hcFNlcnZlcjogSUFuYWx5c2lzTW1hcFNlcnZlcixcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgcmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlOiBJUmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBoYW5kbGVTdG9yYWdlOiBJSGFuZGxlU3RvcmFnZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgdXBsb2FkSW1hZ2VTZXJ2aWNlOiBJVXBsb2FkSW1hZ2VTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSAkaW50ZXJ2YWw6YW55KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBzZWxmLkZyZXF1ZW5jeUFuYWx5c2lzUGFyYW1zID0gc2VsZi5pbml0UGFyYW1zKCk7XHJcblxyXG4gICAgICAgIHNlbGYuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLiRzY29wZS4kZW1pdCgnc2hvd0l0ZW1QYWdlJywgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2VsZi4kc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHNlbGYuYW5hbHlzaXNNbWFwU2VydmVyLmNsZWFyRHJhdygpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5hbmFseXNpc01tYXBTZXJ2ZXIucmVuZGVyU3lzdGVtUG9pbnQoKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign6Kem5Y+R55u05o6l6ZSA5q+BTWFw5LqL5Lu277yM5a+86Ie0bWFw5a+56LGh6KKr6ZSA5q+B77yM6L2o6L+56Kem5Y+R6Ieq6Lqr55qE6ZSA5q+B5LqL5Lu25Lit5peg5rOV6I635Y+WbWFw5a+56LGh5a+86Ie055qE5oql6ZSZ77yM5Y+v5Lul5b+955Wl77yBJywgZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJGludGVydmFsLmNhbmNlbChzZWxmLnNldEludGVydmFsKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g55uR5ZCs5Lq66IS46YCJ5oup5LqL5Lu2XHJcbiAgICAgICAgc2VsZi4kc2NvcGUuJG9uKHNlbGYuc2VsZWN0RmFjZUN0cmwsIGZ1bmN0aW9uIChldmVudDogYW55LCBkYXRhOiBhbnkpIHtcclxuICAgICAgICAgICAgc2VsZi4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLkZyZXF1ZW5jeUFuYWx5c2lzUGFyYW1zLmltYWdlUGF0aCA9IGRhdGEuZGF0YS5pbWFnZXVybDtcclxuICAgICAgICAgICAgICAgIHNlbGYuRnJlcXVlbmN5QW5hbHlzaXNQYXJhbXMudGFza0lkID0gZGF0YS5kYXRhLmtleTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g55uR5ZCs6K6+5aSH6L+U5Zue5LqL5Lu2XHJcbiAgICAgICAgc2VsZi4kc2NvcGUuJG9uKHNlbGYuc2VsZWN0RGV2aWNlQ2IsIChldmVudDogYW55LCBkZXZpY2VJZHM6IEFycmF5PHN0cmluZz4sIHN0YXR1czpib29sZWFuLCBnZW9tZXRyeT86IE5QTWFwTGliLkdlb21ldHJ5LlBvbHlnb24sIHR5cGU/OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgaWYoc3RhdHVzICYmIEFycmF5LmlzQXJyYXkoZGV2aWNlSWRzKSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kZXZpY2VJZEZpbHRlcihkZXZpY2VJZHMsIHR5cGUpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGdlb21ldHJ5KSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmFuYWx5c2lzTW1hcFNlcnZlci5yZW1vdmVEcmF3U2hhcGUoZ2VvbWV0cnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGYubGF5ZXIuY2xvc2Uoc2VsZi5jdXJyZW50TGF5ZXJJbmRleCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8g5a6a5pe26K+35rGC56a757q/5Lu75YqhXHJcbiAgICAgICAgc2VsZi5zZXRJbnRlcnZhbCAgPSAkaW50ZXJ2YWwoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2VsZi5maW5kT2ZmTGluZUxpc3QoKTtcclxuICAgICAgICB9LCAxMDAwMCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFBhcmFtcygpOiBGcmVxdWVuY3lBbmFseXNpc1BhcmFtcyB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBzZWxmLkZhc3REYXRlID0gRmFzdERhdGEudG9kYXk7XHJcbiAgICAgICAgc2VsZi5TZXhEYXRlID0gU2V4RGF0YS5hbGw7XHJcbiAgICAgICAgc2VsZi5HbGFzc0RhdGUgPSBHbGFzc2VzRGF0YS5hbGw7XHJcbiAgICAgICAgc2VsZi5NYXNrRGF0ZSA9IE1hc2tEYXRhLmFsbDtcclxuXHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IG5ldyBGcmVxdWVuY3lBbmFseXNpc1BhcmFtcygpO1xyXG4gICAgICAgIHBhcmFtcy50YXNrTmFtZSA9IFwiXCI7XHJcbiAgICAgICAgcGFyYW1zLnRhc2tJZCA9IFwiXCI7XHJcbiAgICAgICAgcGFyYW1zLnN0YXJ0VGltZSA9IHNlbGYuRmFzdERhdGUudmFsdWUuc3RhcnRUaW1lO1xyXG4gICAgICAgIHBhcmFtcy5lbmRUaW1lID0gc2VsZi5GYXN0RGF0ZS52YWx1ZS5lbmRUaW1lO1xyXG4gICAgICAgIHBhcmFtcy5hcnJDYW1lcmFJZCA9IFtdO1xyXG4gICAgICAgIHBhcmFtcy50aHJlc2hvbGQgPSA5MDtcclxuICAgICAgICBwYXJhbXMuYXJyR2VuZGVyID0gW107XHJcbiAgICAgICAgcGFyYW1zLmFyckV5ZUdsYXNzZXMgPSBbXTtcclxuICAgICAgICBwYXJhbXMuYXJyTWFzayA9IFtdO1xyXG5cclxuICAgICAgICAvLyDliKTmlq3mmK/lkKbmnInpgJrooYzorrDlvZXlv6vpgJ/mo4DntKJcclxuICAgICAgICBsZXQgQW5hbHlzaXNEYXRhOkFuYWx5c2lzU3RvcmFnZVBhcmFtcyA9IHRoaXMuaGFuZGxlU3RvcmFnZS5nZXRTZXNzaW9uU3RvcmFnZURhdGEoQW5hbHlzaXNEYXRhVHlwZS5GYWNlLmtleSk7XHJcbiAgICAgICAgaWYgKEFuYWx5c2lzRGF0YSkge1xyXG4gICAgICAgICAgICBwYXJhbXMuaW1hZ2VQYXRoID0gQW5hbHlzaXNEYXRhLmRhdGEuQWNjZXNzTG9nLkZhY2VQYXRoO1xyXG4gICAgICAgICAgICBwYXJhbXMudGFza0lkID0gQW5hbHlzaXNEYXRhLmRhdGEuQWNjZXNzTG9nLklEO1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZVN0b3JhZ2UucmVtb3ZlU2Vzc2lvblN0b3JhZ2VEYXRhKEFuYWx5c2lzRGF0YVR5cGUuRmFjZS5rZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDliKTmlq3mmK/lkKbmnInkurrohLjliIbmnpDlv6vpgJ/mo4DntKJcclxuICAgICAgICBBbmFseXNpc0RhdGEgPSB0aGlzLmhhbmRsZVN0b3JhZ2UuZ2V0U2Vzc2lvblN0b3JhZ2VEYXRhKEFuYWx5c2lzRGF0YVR5cGUuRmFjZUxpYnJhcnkua2V5KTtcclxuICAgICAgICBpZiAoQW5hbHlzaXNEYXRhKSB7XHJcbiAgICAgICAgICAgIHBhcmFtcy5pbWFnZVBhdGggPSBBbmFseXNpc0RhdGEuZGF0YS5QZXJzb25JbmZvLkZhY2VQaWNQYXRoO1xyXG4gICAgICAgICAgICBwYXJhbXMudGFza0lkID0gQW5hbHlzaXNEYXRhLmRhdGEuUGVyc29uSW5mby5JRDtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVTdG9yYWdlLnJlbW92ZVNlc3Npb25TdG9yYWdlRGF0YShBbmFseXNpc0RhdGFUeXBlLkZhY2VMaWJyYXJ5LmtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwYXJhbXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6K6+5aSHaWTljrvph41cclxuICAgIHByaXZhdGUgZGV2aWNlSWRGaWx0ZXIoaWRzOiBBcnJheTxzdHJpbmc+LCB0eXBlPzogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBhcnJDYW1lcmFJZDogQXJyYXk8c3RyaW5nPiA9ICBbXTtcclxuICAgICAgICBpZiAodHlwZSA9PT0gXCJ0cmVlXCIpIHtcclxuICAgICAgICAgICAgYXJyQ2FtZXJhSWQgPSBpZHM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYXJyQ2FtZXJhSWQgPSAgXy5jb25jYXQoaWRzLCBzZWxmLmFyckNhbWVyYUlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXJyQ2FtZXJhSWQgPSBfLnNvcnRlZFVuaXEoYXJyQ2FtZXJhSWQpO1xyXG4gICAgICAgIHNlbGYuYXJyQ2FtZXJhSWQgPSBhcnJDYW1lcmFJZDtcclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE8g6K6+572u5pel5pyfXHJcbiAgICBzZXRGYXN0RGF0ZShpdGVtOiBFbnVtPFRpbWVMZW5ndGg+KSB7XHJcbiAgICAgICAgdGhpcy5GYXN0RGF0ZSA9IGl0ZW07XHJcbiAgICAgICAgdGhpcy5GcmVxdWVuY3lBbmFseXNpc1BhcmFtcy5zdGFydFRpbWUgPSBpdGVtLnZhbHVlLnN0YXJ0VGltZTtcclxuICAgICAgICB0aGlzLkZyZXF1ZW5jeUFuYWx5c2lzUGFyYW1zLmVuZFRpbWUgPSBpdGVtLnZhbHVlLmVuZFRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIOWIoOmZpOWbvueJh1xyXG4gICAgZGVsZXRlSW1hZ2UoKSB7XHJcbiAgICAgICAgdGhpcy5GcmVxdWVuY3lBbmFseXNpc1BhcmFtcy5pbWFnZVBhdGggPSBudWxsO1xyXG4gICAgICAgIHRoaXMuRnJlcXVlbmN5QW5hbHlzaXNQYXJhbXMudGFza0lkID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE8g5Yig6Zmk5bm06b6EXHJcbiAgICBzZWxlY3RBZ2UoYWdlOiBFbnVtPEFnZT4pIHtcclxuICAgICAgICBpZiAodHlwZW9mIGFnZSAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdGhpcy5GcmVxdWVuY3lBbmFseXNpc1BhcmFtcy5tYXhBZ2UgPSBhZ2UudmFsdWUubWF4QWdlO1xyXG4gICAgICAgICAgICB0aGlzLkZyZXF1ZW5jeUFuYWx5c2lzUGFyYW1zLm1pbkFnZSA9IGFnZS52YWx1ZS5taW5BZ2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5GcmVxdWVuY3lBbmFseXNpc1BhcmFtcy5tYXhBZ2UgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLkZyZXF1ZW5jeUFuYWx5c2lzUGFyYW1zLm1pbkFnZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyDov5Tlm57kuLvnm67lvZVcclxuICAgIGdvQmFjaygpIHtcclxuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoJ3Nob3dJdGVtUGFnZScsIGZhbHNlKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyDov5Tlm57ooajljZVcclxuICAgIGdvQmFja0Zvcm0oKSB7XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIuY2xlYXJSZXN1bHRNYXJrZXJzKCk7XHJcbiAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0Zvcm0gPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dSZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zaG93QWxsUmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLnJlbmRlclN5c3RlbVBvaW50KCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBzbGlkZVJpZ2h0UmVzdWx0KGk6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2V0Q2hlY2tSaWdodFJlc3VsdCh0aGlzLnJlc3VsdFBhcmFtcy5wYWdlU2l6ZSwgaSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q2hlY2tSaWdodFJlc3VsdChzaXplOiBudW1iZXIsIHRyYWdldDogbnVtYmVyLCBpc0ZpcnN0PzogYm9vbGVhbikge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8Ym9vbGVhbj47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGkgPT09IHRyYWdldCkge1xyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2goIXNlbGYuaXNTbGlkZVJlc3VsdFt0cmFnZXRdKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2goZmFsc2UpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5yZXN1bHRJbmRleCA9IHRyYWdldDtcclxuICAgICAgICBpZiAoaXNGaXJzdCkge1xyXG4gICAgICAgICAgICBhcnJbdHJhZ2V0XSA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5pc1NsaWRlUmVzdWx0ID0gYXJyO1xyXG5cclxuICAgICAgICAvLyDlpITnkIborr7lpIfkuI7mlLbol4/nirbmgIHmlbDmja5cclxuICAgICAgICBsZXQgcGFyYW1zOmFueSA9IHtcclxuICAgICAgICAgICAgZGV2aWNlSWRzOiBbXSxcclxuICAgICAgICAgICAgZGV2aWNlVHlwZTogJycsXHJcbiAgICAgICAgICAgIGlkczogW10sXHJcbiAgICAgICAgICAgIHVzZXJJZDogc2VsZi51c2VySW5mb0NhY2hlRmFjdG9yeS5nZXRDdXJyZW50VXNlcklkKClcclxuICAgICAgICB9O1xyXG4gICAgICAgIHBhcmFtcy5kZXZpY2VUeXBlID0gT2JqZWN0VHlwZS5DYW1lcmEudmFsdWU7XHJcbiAgICAgICAgXy5mb3JFYWNoKHNlbGYucmVzdWx0UGFyYW1zLmRhdGFbdHJhZ2V0XS5GYWNlRnJlcXVlbmN5SW5mb3MsZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHBhcmFtcy5kZXZpY2VJZHMucHVzaCh2YWx1ZS5BY2Nlc3NMb2cuQ2FtZXJhSUQpO1xyXG4gICAgICAgICAgICBwYXJhbXMuaWRzLnB1c2godmFsdWUuQWNjZXNzTG9nLklEKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBzZWxmLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5nZXREZXZpY2VJbmZvUHJvbWlzZShwYXJhbXMpLnRoZW4oKHJlczphbnkpPT57XHJcbiAgICAgICAgICAgIF8uZm9yRWFjaChzZWxmLnJlc3VsdFBhcmFtcy5kYXRhW3RyYWdldF0uRmFjZUZyZXF1ZW5jeUluZm9zLGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5kZXZpY2VJbmZvID0gcmVzLmRhdGEuZGV2aWNlSW5mb1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNvbGxlY3RTdGF0dXMgPSByZXMuZGF0YS5jb2xsZWN0U3RhdHVzW2luZGV4XTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNlbGYuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5yZW5kZXJBY2NwTWFya2VycygpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVuZGVyQWNjcE1hcmtlcnMoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBzZWxmLmFsbFJlc3VsdCA9IHNlbGYucmVzdWx0UGFyYW1zLmRhdGFbc2VsZi5yZXN1bHRJbmRleF0uRmFjZUZyZXF1ZW5jeUluZm9zO1xyXG4gICAgICAgIHNlbGYuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLnNldFJlc3VsdEZvck1hcChzZWxmLmFsbFJlc3VsdCk7XHJcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBhcnIgPSBzZWxmLmFuYWx5c2lzTW1hcFNlcnZlci5nZXRTeXN0ZW1Qb2ludEZvclBhcmFtcyhzZWxmLmFsbFJlc3VsdCk7XHJcbiAgICAgICAgICAgIHNlbGYuYW5hbHlzaXNNbWFwU2VydmVyLnJlbmRlck1ha2VycyhcclxuICAgICAgICAgICAgICAgIE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdExheWVyLFxyXG4gICAgICAgICAgICAgICAgT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0R3JvdXAsXHJcbiAgICAgICAgICAgICAgICB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYXJyLFxyXG4gICAgICAgICAgICAgICAgc2VsZi5yZXN1bHRGb3JNYXApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyDmiZPlvIDnu5Pmnpzor6bmg4VcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtSZXN1bHQgfCBDYWNoZVJlc3VsdH0gaXRlbSDlvZPliY3nu5Pmnpzlr7nosaFcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCDlvZPliY3nu5PmnpzntKLlvJVcclxuICAgICAqL1xyXG4gICAgb3BlbkRldGFpbFBvcHVwKGl0ZW06IGFueSwgaW5kZXg6IG51bWJlciwgZ3JvdXBMaXN0OmFueSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgc2NvcGU6IHtcclxuICAgICAgICAgICAgJGRlc3Ryb3k6IEZ1bmN0aW9uLFxyXG4gICAgICAgICAgICByYW5rOiBudW1iZXIsXHJcbiAgICAgICAgICAgIGFsbExpc3Q6IEFycmF5PGFueT4sXHJcbiAgICAgICAgICAgIGNvbGxlY3RGdW5jdGlvbjogRnVuY3Rpb24sXHJcbiAgICAgICAgICAgIGFuYWx5c2lzRnVuY3Rpb246IEZ1bmN0aW9uLFxyXG4gICAgICAgICAgICBzdXJ2ZWlsbGFuY2VGdW5jdGlvbjogRnVuY3Rpb24sXHJcbiAgICAgICAgICAgIGNsb3NlUG9wdXA6IEZ1bmN0aW9uLFxyXG4gICAgICAgICAgICBzaG93Rm9vdGVyOiBib29sZWFuXHJcbiAgICAgICAgICAgIGluZGV4OmFueVxyXG4gICAgICAgIH0gPSBzZWxmLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUucmFuayA9IGluZGV4O1xyXG4gICAgICAgIHNjb3BlLnNob3dGb290ZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlLmluZGV4ID0gXCJcIjtcclxuICAgICAgICBzY29wZS5hbGxMaXN0ID0gIGdyb3VwTGlzdDtcclxuICAgICAgICBzY29wZS5jb2xsZWN0RnVuY3Rpb24gPSAoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuY2xpY2tDb2xsZWN0KG51bGwsIGl0ZW0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2NvcGUuYW5hbHlzaXNGdW5jdGlvbiA9IChpdGVtOiBhbnksIHR5cGU6c3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuY2xpY2tBbmFseXNpcyhudWxsLCBpdGVtLCB0eXBlKTtcclxuICAgICAgICAgICAgc2VsZi5sYXllci5jbG9zZShzY29wZS5pbmRleCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzY29wZS5zdXJ2ZWlsbGFuY2VGdW5jdGlvbiA9IChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5jbGlja1N1cnZlaWxsYW5jZShudWxsLCBpdGVtKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNjb3BlLmNsb3NlUG9wdXAgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYubGF5ZXIuY2xvc2Uoc2NvcGUuaW5kZXgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2VsZi5hbmFseXNpc01tYXBTZXJ2ZXIub3BlbkRldGFpbFBvcHVwKGl0ZW0sIGluZGV4LCBzZWxmLmFsbFJlc3VsdCwgT2JqZWN0VHlwZS5DYW1lcmEudmFsdWUsIHNjb3BlKTtcclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE8g5qC55o2u57uT5p6c5pi+56S65Zyw5Zu+5a+55bqU55qE54K55L2NXHJcbiAgICByZXN1bHRUb01hcChpdGVtOiBSZXN1bHQsIGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5yZXN1bHRUb01hcChpdGVtKVxyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyDlj5bmtojnu5PmnpzmmL7npLrlnLDlm77lr7nlupTnmoTngrnkvY1cclxuICAgIHVuUmVzdWx0VG9NYXAoaXRlbTogUmVzdWx0LCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIudW5SZXN1bHRUb01hcChpdGVtLCB0aGlzLnJlc3VsdEZvck1hcClcclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE8g6YCJ5oup5pGE5YOP5py6XHJcbiAgICBzZWxlY3RDYW1lcmEoKSB7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IHNlbGVjdENhbWVyYUxpc3Q6IEFycmF5PHN0cmluZz4sICRkZXN0cm95OiBGdW5jdGlvbiwgc2VsZWN0Q3RybENiOiBzdHJpbmcgfSA9IHRoaXMuJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICBzY29wZS5zZWxlY3RDYW1lcmFMaXN0ID0gdGhpcy5GcmVxdWVuY3lBbmFseXNpc1BhcmFtcy5hcnJDYW1lcmFJZDtcclxuICAgICAgICBzY29wZS5zZWxlY3RDdHJsQ2IgPSB0aGlzLnNlbGVjdERldmljZUNiO1xyXG4gICAgICAgIHRoaXMuY3VycmVudExheWVySW5kZXggPSB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBjb250ZW50OiBjYW1lcmFUcmVlUG9wdXBIdG1sLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIHRpdGxlOiBcIuaRhOWDj+acuumAieaLqVwiLFxyXG4gICAgICAgICAgICBhcmVhOiBbXCI3MTBweFwiLCBcIjYyMHB4XCJdLFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBEcmF3UmVjdCgpIHtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5kcmF3UmVjdCgocG9pbnRzOiBBcnJheTxTeXN0ZW1Qb2ludD4sIGdlb21ldHJ5OiBOUE1hcExpYi5HZW9tZXRyeS5Qb2x5Z29uKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5EcmF3Q2FsbEJhY2tNZXRob2QocG9pbnRzLCBnZW9tZXRyeSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBEcmF3Q2lyY2xlKCkge1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmRyYXdDaXJjbGUoKHBvaW50czogQXJyYXk8U3lzdGVtUG9pbnQ+LCBnZW9tZXRyeTogTlBNYXBMaWIuR2VvbWV0cnkuUG9seWdvbikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuRHJhd0NhbGxCYWNrTWV0aG9kKHBvaW50cywgZ2VvbWV0cnkpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgRHJhd1BvbHlnb24oKSB7XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIuZHJhd1BvbHlnb24oKHBvaW50czogQXJyYXk8U3lzdGVtUG9pbnQ+LCBnZW9tZXRyeTogTlBNYXBMaWIuR2VvbWV0cnkuUG9seWdvbikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuRHJhd0NhbGxCYWNrTWV0aG9kKHBvaW50cywgZ2VvbWV0cnkpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIOa4healmuWcsOWbvuW8ueahhlxyXG4gICAgQ2xlYXJEcmF3KCkge1xyXG4gICAgICAgIHRoaXMuYXJyQ2FtZXJhSWQgPSBbXTtcclxuICAgICAgICB0aGlzLkZyZXF1ZW5jeUFuYWx5c2lzUGFyYW1zLmFyckNhbWVyYUlkID0gW107XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIuY2xlYXJEcmF3KCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgRHJhd0NhbGxCYWNrTWV0aG9kKHBvaW50czogQXJyYXk8U3lzdGVtUG9pbnQ+LCBnZW9tZXRyeTogTlBNYXBMaWIuR2VvbWV0cnkuUG9seWdvbiB8IE5QTWFwTGliLkdlb21ldHJ5LkNpcmNsZSkge1xyXG4gICAgICAgIGlmIChwb2ludHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLnJlbW92ZURyYXdTaGFwZShnZW9tZXRyeSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxheWVyRGVjLndhcm5JbmZvKCfmoYbpgInljLrln5/kuI3lrZjlnKjorr7lpIfvvIEnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFycjogQXJyYXk8U3lzdGVtUG9pbnQ+ID0gW107XHJcbiAgICAgICAgcG9pbnRzLmZvckVhY2goKGl0ZW06IFN5c3RlbVBvaW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLk9iamVjdFR5cGUgPT09IE9iamVjdFR5cGUuQ2FtZXJhLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY2hlY2tBcmVhKGFyciwgZ2VvbWV0cnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tBcmVhKGRldmljZUxpc3Q6IGFueSwgZ2VvbWV0cnk6IE5QTWFwTGliLkdlb21ldHJ5LlBvbHlnb24gfCBOUE1hcExpYi5HZW9tZXRyeS5DaXJjbGUpIHtcclxuICAgICAgICBsZXQgc2NvcGU6IHsgZGV2aWNlTGlzdDogYW55LCBnZW9tZXRyeTogTlBNYXBMaWIuR2VvbWV0cnkuUG9seWdvbiB8IE5QTWFwTGliLkdlb21ldHJ5LkNpcmNsZSwgJGRlc3Ryb3k6IEZ1bmN0aW9uLCBzZWxlY3RDaGVja0FyZWFDYjogc3RyaW5nIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUuZGV2aWNlTGlzdCA9IGRldmljZUxpc3Q7XHJcbiAgICAgICAgc2NvcGUuZ2VvbWV0cnkgPSBnZW9tZXRyeTtcclxuICAgICAgICBzY29wZS5zZWxlY3RDaGVja0FyZWFDYiA9IHRoaXMuc2VsZWN0RGV2aWNlQ2I7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGF5ZXJJbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFBvcHVwSHRtbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICB0aXRsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGNsb3NlQnRuOiAwLFxyXG4gICAgICAgICAgICBza2luOiBcIm5vLXNjcm9sbFwiLFxyXG4gICAgICAgICAgICBhcmVhOiBbXCIzMDBweFwiLCBcIjMwMHB4XCJdLFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyDliKDpmaTlnLDlm77nprvnur/ku7vliqFcclxuICAgIGRlbE9mZkxpbmVUYXNrKGl0ZW06IEludGVsaWdlbnRUYXNrSW5mbykge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgcGFyYW1zID0ge1xyXG4gICAgICAgICAgICBcInRhc2tJZFwiOiBpdGVtLlRhc2tJZCxcclxuICAgICAgICAgICAgXCJ0YXNrVHlwZVwiOiBpdGVtLlRhc2tUeXBlXHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZWxmLmFuYWx5c2lzU2VydmljZS5kZWxldGVPZmZMaW5lRGV0YWlsKHBhcmFtcykudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubGF5ZXJEZWMuaW5mbygn5Yig6Zmk5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmZpbmRPZmZMaW5lTGlzdCgpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxheWVyRGVjLndhcm5JbmZvKCfliKDpmaTlpLHotKUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIOaPkOS6pOemu+e6v+S7u+WKoVxyXG4gICAgc3VibWl0U2VhcmNoKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAoIXNlbGYuRnJlcXVlbmN5QW5hbHlzaXNQYXJhbXMudGFza05hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGYubGF5ZXJEZWMud2FybkluZm8oJ+ivt+i+k+WFpeS7u+WKoeWQjeensCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXNlbGYuRnJlcXVlbmN5QW5hbHlzaXNQYXJhbXMudGFza0lkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmxheWVyRGVjLndhcm5JbmZvKCfor7fkuIrkvKDlm77niYcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5Yik5pat5pe26Ze0XHJcbiAgICAgICAgaWYgKHNlbGYuRnJlcXVlbmN5QW5hbHlzaXNQYXJhbXMuZW5kVGltZSA8IHNlbGYuRnJlcXVlbmN5QW5hbHlzaXNQYXJhbXMuc3RhcnRUaW1lKSB7XHJcbiAgICAgICAgICAgIHNlbGYubGF5ZXJEZWMud2FybkluZm8oJ+W8gOWni+aXtumXtOS4jeiDveaZmuS6jue7k+adn+aXtumXtCEnKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDorr7nva7mn6Xor6Lorr7lpIdpZFxyXG4gICAgICAgIGlmKHNlbGYuYXJyQ2FtZXJhSWQubGVuZ3RoPjApIHtcclxuICAgICAgICAgICAgc2VsZi5GcmVxdWVuY3lBbmFseXNpc1BhcmFtcy5hcnJDYW1lcmFJZCA9IHNlbGYuYXJyQ2FtZXJhSWQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHN5c3RlbVBvaW50TGlzdDpBcnJheTxhbnk+ID0gc2VsZi5hbmFseXNpc01tYXBTZXJ2ZXIuZ2V0U3lzdGVtUG9pbnQoKTtcclxuICAgICAgICAgICAgbGV0IGNhbWVyYUxpc3Q6QXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgICAgICAgICBfKHN5c3RlbVBvaW50TGlzdCkuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdFR5cGUuQ2FtZXJhLnZhbHVlID09PSB2YWx1ZS5PYmplY3RUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FtZXJhTGlzdC5wdXNoKHZhbHVlLk9iamVjdElEKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNlbGYuRnJlcXVlbmN5QW5hbHlzaXNQYXJhbXMuYXJyQ2FtZXJhSWQgPSBjYW1lcmFMaXN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2VsZi5TZXhEYXRlLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHNlbGYuRnJlcXVlbmN5QW5hbHlzaXNQYXJhbXMuYXJyR2VuZGVyLnB1c2goc2VsZi5TZXhEYXRlLnZhbHVlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2VsZi5HbGFzc0RhdGUudmFsdWUpIHtcclxuICAgICAgICAgICAgc2VsZi5GcmVxdWVuY3lBbmFseXNpc1BhcmFtcy5hcnJFeWVHbGFzc2VzLnB1c2goc2VsZi5HbGFzc0RhdGUudmFsdWUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzZWxmLk1hc2tEYXRlLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHNlbGYuRnJlcXVlbmN5QW5hbHlzaXNQYXJhbXMuYXJyTWFzay5wdXNoKHNlbGYuTWFza0RhdGUudmFsdWUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxmLmluaXRMb2FkaW5nUG9wKCk7XHJcbiAgICAgICAgc2VsZi5hbmFseXNpc1NlcnZpY2UuZmFjZUZyZXF1ZW5jeUFuYWx5c2lzKHRoaXMuRnJlcXVlbmN5QW5hbHlzaXNQYXJhbXMpLnRoZW4oKHJlczogUmVzcG9uc2VSZXN1bHQ8YW55PikgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLmxheWVyLmNsb3NlKHNlbGYuY3VycmVudExheWVySW5kZXgpO1xyXG4gICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zaG93QW5hbHlzaXNMaXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuZmluZE9mZkxpbmVMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLkZyZXF1ZW5jeUFuYWx5c2lzUGFyYW1zID0gc2VsZi5pbml0UGFyYW1zKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxheWVyRGVjLndhcm5JbmZvKCfnprvnur/ku7vliqHliJvlu7rlpLHotKUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIOaYvuekuuemu+e6v+S7u+WKoeWIl+ihqFxyXG4gICAgc2hvd0FuYWx5c2lzTGlzdEZuKGZsYWc6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLnNob3dBbmFseXNpc0xpc3QgPSBmbGFnO1xyXG4gICAgICAgIGlmIChmbGFnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmluZE9mZkxpbmVMaXN0KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIOiOt+WPluemu+e6v+S7u+WKoeWIl+ihqFxyXG4gICAgZmluZE9mZkxpbmVMaXN0KCkge1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIGlkOiB0aGlzLnVzZXJJbmZvQ2FjaGVGYWN0b3J5LmdldEN1cnJlbnRVc2VySWQoKSxcclxuICAgICAgICAgICAgdGFza1R5cGU6IE9mZmxpbmVUYXNrVHlwZS5TZWFyY2hGYWNlRnJlcXVlbmN5XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzU2VydmljZS5nZXRPZmZMaW5lTGlzdChwYXJhbXMpLnRoZW4oKHJlczogQmFja1Jlc3BvbnNlQm9keTxBcnJheTxJbnRlbGlnZW50VGFza0luZm8+PikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5GcmVxdWVuY3lPZmZMaW5lID0gcmVzLmRhdGEgPyByZXMuZGF0YSA6IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE8g5YiG6aG15Yqf6IO9XHJcbiAgICBjaGFuZ2VSZXN1bHRQYWdlKGk6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucmVzdWx0UGFyYW1zLmN1cnJlbnRQYWdlID0gaTtcclxuICAgICAgICB0aGlzLnJlc3VsdFBhcmFtcyA9IHRoaXMucGFnaW5hdGlvbi5nZXRCeVBhZ2UodGhpcy5yZXN1bHRQYXJhbXMpO1xyXG4gICAgICAgIHRoaXMuc2V0Q2hlY2tSaWdodFJlc3VsdCh0aGlzLnJlc3VsdFBhcmFtcy5kYXRhLmxlbmd0aCwgaSwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLnJlbmRlck1ha2VycyhcclxuICAgICAgICAgICAgICAgIE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdExheWVyLFxyXG4gICAgICAgICAgICAgICAgT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0R3JvdXAsXHJcbiAgICAgICAgICAgICAgICB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIuZ2V0U3lzdGVtUG9pbnRGb3JQYXJhbXModGhpcy5yZXN1bHRQYXJhbXMuZGF0YSksXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdEZvck1hcClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOe7mOWItue7k+aenOmbhueCueS9jVxyXG4gICAgcHJpdmF0ZSBzZXRSZXN1bHRGb3JNYXAocmVzdWx0OiBBcnJheTxSZXN1bHQgfCBDYWNoZVJlc3VsdD4pIHtcclxuICAgICAgICBsZXQgb2JqID0ge30gYXMgIHsgW2tleTogc3RyaW5nXTogQ2FjaGVSZXN1bHQgfTtcclxuICAgICAgICByZXN1bHQuZm9yRWFjaCgoaXRlbTogQ2FjaGVSZXN1bHQsIGk6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICBvYmpbaXRlbS5BY2Nlc3NMb2cuSURdID0gaXRlbTtcclxuICAgICAgICAgICAgb2JqW2l0ZW0uQWNjZXNzTG9nLklEXS5yZXN1bHRJbmRleCA9IGk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRGb3JNYXAgPSBvYmo7XHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIOWFs+mXreWFqOmDqOe7k+aenOWxleekuumhtemdolxyXG4gICAgY2xvc2VBbGxSZXN1bHQoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93UmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNob3dBbGxSZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJlc3VsdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRQYXJhbXMucGFnZVNpemUgPSA2O1xyXG4gICAgICAgIHRoaXMucmVzdWx0UGFyYW1zID0gdGhpcy5wYWdpbmF0aW9uLmdldEJ5UGFnZSh0aGlzLnJlc3VsdFBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIOaJk+W8gOWFqOmDqOe7k+aenOWxleekuumhtemdolxyXG4gICAgZ29BbGxSZXN1bHQoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93UmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG93QWxsUmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJlc3VsdFBhcmFtcy5wYWdlU2l6ZSA9IDQwO1xyXG4gICAgICAgIHRoaXMucmVzdWx0UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICB0aGlzLnJlc3VsdFBhcmFtcyA9IHRoaXMucGFnaW5hdGlvbi5nZXRCeVBhZ2UodGhpcy5yZXN1bHRQYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyDmmL7npLrlvZPliY3pobXkuIvnu5PmnpzpobUg6I635Y+W5pWw5o2u54S25ZCO57yT5a2Y77yM5Yip55So57yT5a2Y5pa55rOV5YiG6aG15p+l6K+i5pWw5o2u77yM54S25ZCO5riy5p+T57uT5p6c54K55L2NXHJcbiAgICBzaG93QW5hbHlzaXNSZXN1bHQoaXRlbTogSW50ZWxpZ2VudFRhc2tJbmZvKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIGFuYWx5c2VUYXNrVHlwZTogQW5hbHlzZVRhc2tUeXBlLlNlYXJjaEFuYWx5c2VUYXNrUmVzdWx0LFxyXG4gICAgICAgICAgICB0YXNrSWQ6IGl0ZW0uVGFza0lkLFxyXG4gICAgICAgICAgICBUYXNrVHlwZTogaXRlbS5UYXNrVHlwZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2VsZi5pbml0TG9hZGluZ1BvcCgpO1xyXG4gICAgICAgIHNlbGYuYW5hbHlzaXNTZXJ2aWNlLmdldE9mZkxpbmVEZXRhaWwocGFyYW1zKS50aGVuKChyZXM6IEJhY2tSZXNwb25zZUJvZHk8YW55PikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhICYmIHJlcy5kYXRhLlJlc3VsdCAmJiByZXMuZGF0YS5SZXN1bHQubGVuZ3RoICYmIHJlcy5kYXRhLlJlc3VsdFswXS5GYWNlRnJlcXVlbmN5cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5wYWdpbmF0aW9uLnNldChyZXMuZGF0YS5SZXN1bHRbMF0uRmFjZUZyZXF1ZW5jeXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlc3VsdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVzdWx0UGFyYW1zLnBhZ2VTaXplID0gNjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hbmFseXNpc01tYXBTZXJ2ZXIucmVtb3ZlU3lzdGVtUG9pbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5GcmVxdWVuY3lBbmFseXNpc0ltYWdlID0gcmVzLmRhdGEuUmVzdWx0WzBdLmltZ1VybDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZXN1bHRQYXJhbXMgPSBzZWxmLnBhZ2luYXRpb24uZ2V0QnlQYWdlKHNlbGYucmVzdWx0UGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93UmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93Rm9ybSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldENoZWNrUmlnaHRSZXN1bHQoc2VsZi5yZXN1bHRQYXJhbXMucGFnZVNpemUsIDAsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxheWVyLmNsb3NlKHNlbGYuY3VycmVudExheWVySW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxheWVyRGVjLmluZm8oJ+ayoeacieafpeivouWIsOe7k+aenCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sYXllckRlYy53YXJuSW5mbygn5p+l6K+i57uT5p6c5aSx6LSlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5sYXllci5jbG9zZShzZWxmLmN1cnJlbnRMYXllckluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE8g5LiK5Lyg5Zu+54mHXHJcbiAgICB1cGxvYWRJbWFnZShldmVudDogYW55KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBmcm9tID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgZnJvbS5hcHBlbmQoJ2ltYWdlJywgZXZlbnQudGFyZ2V0LmZpbGVzWzBdKTtcclxuICAgICAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICAgICAgc3RvcmVUeXBlOiBcIkxPQ1wiLFxyXG4gICAgICAgICAgICBpbWFnZUNhdGVnb3J5OiBcIkNhcHR1cmVJbWFnZVwiLFxyXG4gICAgICAgICAgICBjb21tYW5kVHlwZTogXCJTZWFyY2hGYWNlRnJlcXVlbmN5XCIsXHJcbiAgICAgICAgICAgIGRldGVjdFR5cGU6IFwiRmFjZVwiXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnVwbG9hZEltYWdlU2VydmljZS51cGxvYWRJbWFnZUZvckZhY2UoZnJvbSwgZGF0YSkudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKChyZXMuY29kZSA9PT0gMjAwKSAmJiAocmVzLmRhdGEgJiYgcmVzLmRhdGEua2V5KSkgeyAvLyDkurrohLjor4bliKvmiJDlip9cclxuICAgICAgICAgICAgICAgIHNlbGYuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuRnJlcXVlbmN5QW5hbHlzaXNQYXJhbXMuaW1hZ2VQYXRoID0gcmVzLmRhdGEuaW1hZ2V1cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5GcmVxdWVuY3lBbmFseXNpc1BhcmFtcy50YXNrSWQgPSByZXMuZGF0YS5rZXk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChyZXMuY29kZSA9PT0gMjAwKSAmJiAocmVzLmRhdGEuZmFjZUluZm8pKSB7Ly8g5Lq66IS46YCJ5oupXHJcbiAgICAgICAgICAgICAgICBsZXQgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICAgICAgICAgIGltYWdlLnNyYyA9ICdkYXRhOmltYWdlL2pwZWc7YmFzZTY0LCcrcmVzLmRhdGEuaW1hZ2U7XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5vbmxvYWQgPSAoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWxlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIl9pbmZvXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogaW1hZ2Uud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiOiBpbWFnZS5oZWlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5tdWx0aVVzZXJTZWxlY3QocmVzLmRhdGEsIGZpbGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChyZXMuY29kZSA9PT0gMjAwKSAmJiAocmVzLmRhdGEuaW1hZ2UpKSB7IC8vIOS6uuiEuOivhuWIq+Wksei0peW+heagh+WumlxyXG4gICAgICAgICAgICAgICAgbGV0IGltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5zcmMgPSAnZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwnK3Jlcy5kYXRhLmltYWdlO1xyXG4gICAgICAgICAgICAgICAgaW1hZ2Uub25sb2FkID0gKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJfaW5mb1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IGltYWdlLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogaW1hZ2UuaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZmFjZURlbWFyY2F0ZShyZXMuZGF0YSwgZmlsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxheWVyRGVjLndhcm5JbmZvKCfkurrohLjor4bliKvlpLHotKUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9u5aSa5Lq66IS46YCJ5oupXHJcbiAgICAgKiBAcGFyYW0gZmFjZUluZm9cclxuICAgICAqIEBwYXJhbSBmaWxlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtdWx0aVVzZXJTZWxlY3QoZmFjZUluZm86IGFueSwgZmlsZTogYW55KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBzY29wZTogeyBsYXllcjogYW55OyBpbmRleDogc3RyaW5nLCAkZGVzdHJveTogRnVuY3Rpb24sIGRhdGE6IGFueSwgZmlsZTogYW55LCBjb21tYW5kVHlwZTogc3RyaW5nLCBkZXRlY3RUeXBlOiBzdHJpbmcsIGxheWVySW5kZXg6IGFueSwgZnJvbVNlbGVjdEZhY2VDdHJsOiBzdHJpbmcgfSA9IHNlbGYuJHNjb3BlLiRuZXcoKTtcclxuXHJcbiAgICAgICAgc2NvcGUuaW5kZXggPSBudWxsO1xyXG4gICAgICAgIHNjb3BlLmRhdGEgPSBmYWNlSW5mbztcclxuICAgICAgICBzY29wZS5maWxlID0gZmlsZTtcclxuICAgICAgICBzY29wZS5jb21tYW5kVHlwZSA9IFwiU2VhcmNoQWNjZXNzTG9nXCI7XHJcbiAgICAgICAgc2NvcGUuZGV0ZWN0VHlwZSA9IFwiRmFjZVwiO1xyXG4gICAgICAgIHNjb3BlLmZyb21TZWxlY3RGYWNlQ3RybCA9IHNlbGYuc2VsZWN0RmFjZUN0cmw7XHJcblxyXG4gICAgICAgIHNjb3BlLmxheWVySW5kZXggPSBzZWxmLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBza2luOiAnbm8tc2Nyb2xsJyxcclxuICAgICAgICAgICAgdGl0bGU6IFsn5Lq66IS46YCJ5oupJywgJ2ZvbnQtd2VpZ2h0OiBib2xkO2JhY2tncm91bmQtY29sb3I6ICNGNkY4RkI7Y29sb3I6ICM2MDYwNjA7aGVpZ2h0OiA0MHB4OyddLFxyXG4gICAgICAgICAgICBhcmVhOiBbJzQwMHB4JywgJzMxMHB4J10sXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IHNlbGVjdEZhY2VQb3B1cEh0bWwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9u5Lq66IS45qCH5rOoXHJcbiAgICAgKiBAcGFyYW0gZmFjZUluZm9cclxuICAgICAqIEBwYXJhbSBmaWxlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmYWNlRGVtYXJjYXRlKGZhY2VJbmZvOiBhbnksIGZpbGU6IGFueSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgc2NvcGU6IHsgbGF5ZXI6IGFueTsgaW5kZXg6IHN0cmluZywgJGRlc3Ryb3k6IEZ1bmN0aW9uLCBkYXRhOiBhbnksIGZpbGU6IGFueSwgY29tbWFuZFR5cGU6IHN0cmluZywgZGV0ZWN0VHlwZTogc3RyaW5nLCBsYXllckluZGV4OiBhbnksIGZyb21EZW1hcmNhdGVGYWNlQ3RybDogc3RyaW5nLCBmbGFnOiBib29sZWFuIH0gPSBzZWxmLiRzY29wZS4kbmV3KCk7XHJcblxyXG4gICAgICAgIHNjb3BlLmluZGV4ID0gbnVsbDtcclxuICAgICAgICBzY29wZS5kYXRhID0gZmFjZUluZm87XHJcbiAgICAgICAgc2NvcGUuZmlsZSA9IGZpbGU7XHJcbiAgICAgICAgc2NvcGUuY29tbWFuZFR5cGUgPSBcIlNlYXJjaEFjY2Vzc0xvZ1wiO1xyXG4gICAgICAgIHNjb3BlLmRldGVjdFR5cGUgPSBcIkZhY2VcIjtcclxuICAgICAgICBzY29wZS5mcm9tRGVtYXJjYXRlRmFjZUN0cmwgPSBzZWxmLnNlbGVjdEZhY2VDdHJsO1xyXG4gICAgICAgIHNjb3BlLmZsYWcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgc2NvcGUubGF5ZXJJbmRleCA9IHNlbGYubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIHNraW46ICduby1zY3JvbGwnLFxyXG4gICAgICAgICAgICB0aXRsZTogWyfkurrohLjmoIfms6gnLCAnZm9udC13ZWlnaHQ6IGJvbGQ7YmFja2dyb3VuZC1jb2xvcjogI0Y2RjhGQjtjb2xvcjogIzYwNjA2MDtoZWlnaHQ6IDQwcHg7J10sXHJcbiAgICAgICAgICAgIGFyZWE6IFsnNjUwcHgnLCAnNTU1cHgnXSxcclxuICAgICAgICAgICAgY29udGVudDogZGVtYXJjYXRlUG9wdXBIdG1sLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOWKoOi9veS4reWKqOeUu1xyXG4gICAgaW5pdExvYWRpbmdQb3AoKSB7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7ICRkZXN0cm95OiBGdW5jdGlvbiB9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudExheWVySW5kZXggPSB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBjb250ZW50OiBsb2FkaW5nQW5hbHlzaXNIdG1sLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIHRpdGxlOiBmYWxzZSxcclxuICAgICAgICAgICAgYXJlYTogWyc1MDBweCcsIFwiMjgwcHhcIl0sXHJcbiAgICAgICAgICAgIGVuZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5pS26JeP5LiO5Y+W5raI5pS26JePXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICovXHJcbiAgICBjbGlja0NvbGxlY3QoZXZlbnQ6IGFueSwgaXRlbTogYW55KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCFpdGVtLmNvbGxlY3RTdGF0dXMpIHtcclxuICAgICAgICAgICAgbGV0IHBhcmFtczogYW55ID0ge1xyXG4gICAgICAgICAgICAgICAganNvbjogYW5ndWxhci50b0pzb24oaXRlbSksXHJcbiAgICAgICAgICAgICAgICBvYmplY3RJRDogaXRlbS5BY2Nlc3NMb2cuSUQsXHJcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBDb2xsZWN0RGF0YVR5cGUuRmFjZS52YWx1ZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzZWxmLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5jb2xsZWN0QWRkSW5mbyhwYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHBhcmFtczogYW55ID0ge1xyXG4gICAgICAgICAgICAgICAgaWRzOiBpdGVtLkFjY2Vzc0xvZy5JRFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzZWxmLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5jb2xsZWN0RGVsZXRlSW5mbyhwYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGl0ZW0uY29sbGVjdFN0YXR1cyA9ICFpdGVtLmNvbGxlY3RTdGF0dXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5YiG5p6QXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICovXHJcbiAgICBjbGlja0FuYWx5c2lzKGV2ZW50OmFueSwgaXRlbTphbnksIHR5cGU6c3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc3RvcmFnZVBhcmFtczogQW5hbHlzaXNTdG9yYWdlUGFyYW1zID0gQW5hbHlzaXNEYXRhVHlwZS5GYWNlO1xyXG4gICAgICAgIHN0b3JhZ2VQYXJhbXMuZGF0YSA9IGl0ZW07XHJcbiAgICAgICAgdGhpcy5oYW5kbGVTdG9yYWdlLnNldFNlc3Npb25TdG9yYWdlRGF0YShzdG9yYWdlUGFyYW1zLmtleSwgc3RvcmFnZVBhcmFtcyk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJBbmFseXNpc1R5cGVcIiwgXCJGYWNlXCIpO1xyXG4gICAgICAgIGlmICh0eXBlID09PSBBbmFseXNpc0dvVG9UeXBlLlRyYWNrLmtleSkge1xyXG4gICAgICAgICAgICB3aW5kb3cub3BlbihBbmFseXNpc0dvVG9UeXBlLlRyYWNrLmRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gQW5hbHlzaXNHb1RvVHlwZS5BY2NvbXBhbnlpbmcua2V5KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKEFuYWx5c2lzR29Ub1R5cGUuQWNjb21wYW55aW5nLmRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gQW5hbHlzaXNHb1RvVHlwZS5GcmVxdWVuY3kua2V5KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKEFuYWx5c2lzR29Ub1R5cGUuRnJlcXVlbmN5LmRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gQW5hbHlzaXNHb1RvVHlwZS5Nb3JlLmtleSkge1xyXG4gICAgICAgICAgICB3aW5kb3cub3BlbihBbmFseXNpc0dvVG9UeXBlLk1vcmUuZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOW4g+aOp+S4juWPlua2iOW4g+aOp1xyXG4gICAgICogQHBhcmFtIGl0ZW1cclxuICAgICAqL1xyXG4gICAgY2xpY2tTdXJ2ZWlsbGFuY2UoZXZlbnQ6IGFueSwgaXRlbTogYW55KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpdGVtLnN1cnZlaWxsYW5jZVN0YXR1cyA9ICFpdGVtLnN1cnZlaWxsYW5jZVN0YXR1cztcclxuICAgIH1cclxuXHJcbiAgICAvLyDmn6XnnIvlhajlm75cclxuICAgIHB1YmxpYyBmdWxsU2NyZWVuKGV2ZW50OiBhbnksIHBhdGg6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IGxheWVyOiBhbnk7IGluZGV4OiBzdHJpbmcsIHBhdGg6IGFueSwgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUuaW5kZXggPSBcImZ1bGxTY3JlZW5Qb3B1cFwiO1xyXG4gICAgICAgIHNjb3BlLnBhdGggPSBwYXRoO1xyXG4gICAgICAgIGlmIChwYXRoKSB7XHJcbiAgICAgICAgICAgIGxldCB3aW5kb3dXOiBhbnkgPSAkKHdpbmRvdykud2lkdGgoKSAqIDAuODtcclxuICAgICAgICAgICAgbGV0IHdpbmRvd0g6IGFueSA9ICQod2luZG93KS5oZWlnaHQoKSAqIDAuODtcclxuICAgICAgICAgICAgbGV0IGNvbnRlbnRIVE1MID0gYDxpbWcgbmctc3JjPSR7cGF0aH0gc3R5bGU9J3dpZHRoOiR7d2luZG93V31weDtoZWlnaHQ6JHt3aW5kb3dIfXB4Oyc+YDtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjbG9zZUJ0bjogMCxcclxuICAgICAgICAgICAgICAgIHNraW46ICdsYXl1aS1sYXllci1ub2JnIG5vLXNjcm9sbCcsXHJcbiAgICAgICAgICAgICAgICBzaGFkZUNsb3NlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2hhZGU6IDAuNixcclxuICAgICAgICAgICAgICAgIGFyZWE6IFt3aW5kb3dXICsgJ3B4Jywgd2luZG93SCArICdweCddLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogY29udGVudEhUTUwsXHJcbiAgICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLm1zZyhcIuWbvueJh+WcsOWdgOS4jeWtmOWcqFwiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ0ZyZXF1ZW5jeUFuYWx5c2lzQ29udHJvbGxlcicsIEZyZXF1ZW5jeUFuYWx5c2lzQ29udHJvbGxlcik7Il19
