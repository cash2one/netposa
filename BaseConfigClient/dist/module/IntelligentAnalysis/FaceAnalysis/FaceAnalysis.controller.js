define(["require", "exports", "text!../Analysis.facelib.popup.html", "text!../FaceAnalysisPopupDetail/faceanalysis.popup.detail.html", "text!../loading/loading.html", "text!../../common/faceHandlePopup/selectFace.popup.html", "text!../../common/faceHandlePopup/demarcate.popup.html", "../../common/app/main.app", "./Face.analysis.service", "../../../core/entity/FaceAnalysisEnum", "../AnalysisEnum", "../../../core/server/enum/SocketResultTypeEnum", "../../../core/server/enum/NationType", "../../../core/server/enum/AnalysisDataType", "css!../style/FaceAnalysis.css", "css!../FaceAnalysisPopupDetail/faceanalysis.popup.detail.css", "../../common/factory/socket.factory", "../../common/services/analysis.service", "./Face.analysis.service", "../../common/factory/layerMsg.factory", "../../common/factory/HandleStorage.factory", "../../common/services/uploadImage.service", "../Analysis.facelib.popup", "../FaceAnalysisPopupDetail/faceanalysis.popup.detail.controller"], function (require, exports, popupHtml, detailPopupHtml, loadingAnalysisHtml, selectFacePopupHtml, demarcatePopupHtml, main_app_1, Face_analysis_service_1, FaceAnalysisEnum_1, AnalysisEnum_1, SocketResultTypeEnum_1, NationType_1, AnalysisDataType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FaceAnalysisController = (function () {
        function FaceAnalysisController($scope, $timeout, layer, layerDec, analysisService, faceAnalysisService, socketFactory, handleStorage, uploadImageService, $state) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.layer = layer;
            this.layerDec = layerDec;
            this.analysisService = analysisService;
            this.faceAnalysisService = faceAnalysisService;
            this.socketFactory = socketFactory;
            this.handleStorage = handleStorage;
            this.uploadImageService = uploadImageService;
            this.$state = $state;
            this.$inject = ['$scope', '$timeout', 'layer', 'layerDec', 'analysisService', 'faceAnalysisService', 'socketFactory', 'handleStorage', 'uploadImageService', '$state'];
            this.width = 0;
            this.ResultActive = false;
            this.SexDateList = AnalysisEnum_1.getSexDataList();
            this.AgeDataList = AnalysisEnum_1.getAgeList();
            this.SexDate = AnalysisEnum_1.SexData.all;
            this.nationList = NationType_1.NationType;
            this.libNameList = [];
            this.similarityMax = 100;
            this.similarityMin = 80;
            this.resultParams = new Face_analysis_service_1.PageParams();
            this.libName = null;
            this.selectFaceCtrl = "get-face-info-quick";
            this.analysisGoTo = AnalysisDataType_1.AnalysisGoToType;
            var self = this;
            this.$scope.$on('close.facelib.popup', function (event, libsIds, libsEnum) {
                if (Array.isArray(libsIds)) {
                    _this.FaceAnalysisParams.arrLibId = libsIds;
                    _this.libNameList = libsEnum;
                }
                _this.layer.close(_this.currentLayerIndex);
            });
            self.$timeout(function () {
                _this.$scope.$emit('showItemPage', true);
            });
            self.initParams();
            self.$scope.$on(self.selectFaceCtrl, function (event, data) {
                self.$timeout(function () {
                    self.FaceAnalysisParams.imagePath = data.data.imageurl;
                    self.FaceAnalysisParams.taskId = data.data.key;
                });
            });
        }
        FaceAnalysisController.prototype.selectFaceLib = function () {
            var scope = this.$scope.$new();
            scope.selectCameraList = this.FaceAnalysisParams.arrLibId;
            this.currentLayerIndex = this.layer.open({
                type: 1,
                content: popupHtml,
                scope: scope,
                title: "人像库选择",
                area: ["710px", "620px"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        FaceAnalysisController.prototype.initLoadingPop = function () {
            var _this = this;
            var scope = this.$scope.$new();
            this.currentLayerIndex = this.layer.open({
                type: 1,
                content: loadingAnalysisHtml,
                scope: scope,
                title: false,
                area: ['500px', "280px"],
                end: function () {
                    _this.unbindSocket();
                    scope.$destroy();
                }
            });
        };
        FaceAnalysisController.prototype.uploadImage = function (event) {
            var self = this;
            var from = new FormData();
            from.append('image', event.target.files[0]);
            var data = {
                storeType: "LOC",
                imageCategory: "CaptureImage",
                commandType: "SearchFace",
                detectType: "Face"
            };
            this.uploadImageService.uploadImageForFace(from, data).then(function (res) {
                if ((res.code === 200) && (res.data && res.data.key)) {
                    self.$timeout(function () {
                        self.FaceAnalysisParams.imagePath = res.data.imageurl;
                        self.FaceAnalysisParams.taskId = res.data.key;
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
        FaceAnalysisController.prototype.deleteImage = function () {
            this.FaceAnalysisParams.imagePath = null;
        };
        FaceAnalysisController.prototype.goBack = function () {
            var _this = this;
            this.$timeout(function () {
                _this.$scope.$emit('showItemPage', false);
            });
        };
        FaceAnalysisController.prototype.openDetailPopup = function (item, index) {
            var scope = this.$scope.$new();
            scope.allResult = this.allResult;
            scope.result = item;
            scope.index = index;
            if (this.FaceAnalysisParams.imagePath) {
                scope.baseImage = this.FaceAnalysisParams.imagePath;
            }
            this.currentLayerIndex = this.layer.open({
                type: 1,
                content: detailPopupHtml,
                scope: scope,
                skin: "no-scroll",
                title: '人员详情',
                area: ["auto", "275px"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        FaceAnalysisController.prototype.initParams = function () {
            var self = this;
            var faceAnalysisParams = new FaceAnalysisEnum_1.FaceAnalysisParams();
            faceAnalysisParams.threshold = 90;
            faceAnalysisParams.featureSearchExt = [];
            var AnalysisData = self.handleStorage.getSessionStorageData(AnalysisDataType_1.AnalysisDataType.Face.key);
            if (AnalysisData) {
                faceAnalysisParams.imagePath = AnalysisData.data.AccessLog.FacePath;
                faceAnalysisParams.taskId = AnalysisData.data.AccessLog.ID;
                var item = {
                    accessLogId: AnalysisData.data.AccessLog.ID,
                    featureType: "AccessFeature",
                    imgUrl: AnalysisData.data.AccessLog.FacePath
                };
                faceAnalysisParams.featureSearchExt.push(item);
                self.handleStorage.removeSessionStorageData(AnalysisDataType_1.AnalysisDataType.Face.key);
            }
            AnalysisData = this.handleStorage.getSessionStorageData(AnalysisDataType_1.AnalysisDataType.FaceLibrary.key);
            if (AnalysisData) {
                faceAnalysisParams.imagePath = AnalysisData.data.PersonInfo.FacePicPath;
                faceAnalysisParams.taskId = AnalysisData.data.PersonInfo.ID;
                var item = {
                    accessLogId: AnalysisData.data.PersonInfo.ID,
                    featureType: "AccessFeature",
                    imgUrl: AnalysisData.data.PersonInfo.FacePicPath
                };
                faceAnalysisParams.featureSearchExt.push(item);
                self.handleStorage.removeSessionStorageData(AnalysisDataType_1.AnalysisDataType.FaceLibrary.key);
            }
            self.FaceAnalysisParams = faceAnalysisParams;
        };
        FaceAnalysisController.prototype.selectAge = function (age) {
            if (typeof age !== 'string') {
                this.FaceAnalysisParams.maxAge = age.value.maxAge;
                this.FaceAnalysisParams.minAge = age.value.minAge;
            }
            else {
                this.FaceAnalysisParams.maxAge = null;
                this.FaceAnalysisParams.minAge = null;
            }
        };
        FaceAnalysisController.prototype.nationClick = function (selected) {
            this.FaceAnalysisParams.nation = selected.value;
        };
        FaceAnalysisController.prototype.bindSocketToResult = function () {
            var _this = this;
            console.warn('socket callback is bind');
            this.socketFactory.subscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.SearchFace, function (res) {
                console.info('sockit 回调已触发 结果是：', res);
                _this.layer.close(_this.currentLayerIndex);
                if (Array.isArray(res) && res[0].code === 200) {
                    var result_1 = res[0].data;
                    result_1.LibNameList = _this.libNameList;
                    if ((result_1.TaskId === _this.FaceAnalysisParams.taskId) && (result_1.TotalCount > 0)) {
                        _this.$timeout(function () {
                            _this.faceAnalysisService.setFaceAnalysisDataList(result_1);
                            _this.showResult();
                        });
                    }
                    else {
                        _this.layerDec.info(' 没有查询到结果');
                    }
                }
                else {
                    _this.layerDec.warnInfo('查询结果失败！');
                }
                _this.unbindSocket();
            });
        };
        FaceAnalysisController.prototype.unbindSocket = function () {
            console.warn('socket callback is unbind');
            this.socketFactory.unSubscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.SearchFace);
        };
        FaceAnalysisController.prototype.analysisQuery = function () {
            var _this = this;
            var params = new FaceAnalysisEnum_1.FaceAnalysisParams();
            params.imagePath = this.FaceAnalysisParams.imagePath;
            params.idCardNumber = this.FaceAnalysisParams.idCardNumber;
            params.name = this.FaceAnalysisParams.name;
            params.threshold = this.FaceAnalysisParams.threshold;
            this.SexDate.value ? (params.arrGender = [this.SexDate.value]) : null;
            params.minAge = this.FaceAnalysisParams.minAge;
            params.maxAge = this.FaceAnalysisParams.maxAge;
            params.nation = this.FaceAnalysisParams.nation;
            params.retrievalReason = this.FaceAnalysisParams.retrievalReason;
            params.arrLibId = this.FaceAnalysisParams.arrLibId;
            params.taskId = this.FaceAnalysisParams.taskId;
            if (!params.taskId && !params.idCardNumber) {
                return this.layerDec.warnInfo('请选择图片，身份证的任意一项！');
            }
            if (!Array.isArray(params.arrLibId) || params.arrLibId.length === 0) {
                return this.layerDec.warnInfo('请选择人像库！');
            }
            if (this.FaceAnalysisParams.featureSearchExt.length > 0) {
                params.featureSearchExt = this.FaceAnalysisParams.featureSearchExt;
                params.taskId = "";
                params.imagePath = "";
            }
            this.initLoadingPop();
            this.analysisService.faceAnalysis(params).then(function (res) {
                if (res.code === 200) {
                    _this.bindSocketToResult();
                }
                else {
                    _this.layer.close(_this.currentLayerIndex);
                    _this.layerDec.failInfo('查询失败！');
                }
            });
        };
        FaceAnalysisController.prototype.showResult = function () {
            this.resultParams.currentPage = 1;
            this.resultParams.pageSize = 32;
            this.resultParams = this.faceAnalysisService.getFaceAnalysisDataByPage(this.resultParams);
            this.allResult = this.resultParams.allResult;
            this.ResultActive = true;
            this.width = $(window).width() - 360;
        };
        FaceAnalysisController.prototype.changeResultPage = function (i) {
            var _this = this;
            this.resultParams.currentPage = i;
            if (this.libName !== null) {
                this.$timeout(function () {
                    _this.resultParams = _this.faceAnalysisService.getFaceAnalysisDataByPage(_this.resultParams, _this.libName);
                });
            }
            else {
                this.$timeout(function () {
                    _this.resultParams = _this.faceAnalysisService.getFaceAnalysisDataByPage(_this.resultParams);
                });
            }
        };
        FaceAnalysisController.prototype.closeResult = function () {
            this.ResultActive = false;
            this.width = 0;
        };
        FaceAnalysisController.prototype.libNameSelect = function (lib) {
            var _this = this;
            if (lib !== null) {
                this.libName = lib.value;
                this.$timeout(function () {
                    _this.resultParams.currentPage = 1;
                    _this.resultParams = _this.faceAnalysisService.getFaceAnalysisDataByPage(_this.resultParams, lib.ID);
                    _this.allResult = _this.resultParams.allResult;
                });
            }
            else {
                this.resultParams = this.faceAnalysisService.getFaceAnalysisDataByPage(this.resultParams);
                this.allResult = this.resultParams.allResult;
            }
        };
        FaceAnalysisController.prototype.multiUserSelect = function (faceInfo, file) {
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
        FaceAnalysisController.prototype.faceDemarcate = function (faceInfo, file) {
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
        FaceAnalysisController.prototype.fullScreen = function (event, path) {
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
        FaceAnalysisController.prototype.clickSurveillance = function (event, item) {
            if (event) {
                event.stopPropagation();
            }
            item.surveillanceStatus = !item.surveillanceStatus;
        };
        FaceAnalysisController.prototype.clickAnalysis = function (event, item, type) {
            if (event) {
                event.stopPropagation();
            }
            var storageParams = AnalysisDataType_1.AnalysisDataType.FaceLibrary;
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
        return FaceAnalysisController;
    }());
    main_app_1.app.controller('FaceAnalysisController', FaceAnalysisController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9GYWNlQW5hbHlzaXMvRmFjZUFuYWx5c2lzLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBeUNBO1FBc0JJLGdDQUFvQixNQUFXLEVBQ1gsUUFBYSxFQUNiLEtBQVUsRUFDVixRQUFtQixFQUNuQixlQUFpQyxFQUNqQyxtQkFBeUMsRUFDekMsYUFBNkIsRUFDN0IsYUFBNkIsRUFDN0Isa0JBQXVDLEVBQ3ZDLE1BQVc7WUFUL0IsaUJBOEJDO1lBOUJtQixXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQ1gsYUFBUSxHQUFSLFFBQVEsQ0FBSztZQUNiLFVBQUssR0FBTCxLQUFLLENBQUs7WUFDVixhQUFRLEdBQVIsUUFBUSxDQUFXO1lBQ25CLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtZQUNqQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXNCO1lBQ3pDLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtZQUM3QixrQkFBYSxHQUFiLGFBQWEsQ0FBZ0I7WUFDN0IsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFxQjtZQUN2QyxXQUFNLEdBQU4sTUFBTSxDQUFLO1lBOUIvQixZQUFPLEdBQWtCLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLHFCQUFxQixFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFJakwsVUFBSyxHQUFXLENBQUMsQ0FBQztZQUNsQixpQkFBWSxHQUFZLEtBQUssQ0FBQztZQUM5QixnQkFBVyxHQUF3Qiw2QkFBYyxFQUFFLENBQUM7WUFDcEQsZ0JBQVcsR0FBcUIseUJBQVUsRUFBRSxDQUFDO1lBQzdDLFlBQU8sR0FBaUIsc0JBQU8sQ0FBQyxHQUFHLENBQUM7WUFDcEMsZUFBVSxHQUErRCx1QkFBVSxDQUFDO1lBQ3BGLGdCQUFXLEdBQXlDLEVBQUUsQ0FBQztZQUN2RCxrQkFBYSxHQUFXLEdBQUcsQ0FBQztZQUM1QixrQkFBYSxHQUFXLEVBQUUsQ0FBQztZQUMzQixpQkFBWSxHQUFlLElBQUksa0NBQVUsRUFBRSxDQUFDO1lBRTVDLFlBQU8sR0FBVyxJQUFJLENBQUM7WUFHdkIsbUJBQWMsR0FBVyxxQkFBcUIsQ0FBQztZQUMvQyxpQkFBWSxHQUFHLG1DQUFnQixDQUFDO1lBWTVCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztZQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxVQUFDLEtBQVUsRUFBRSxPQUFzQixFQUFFLFFBQThDO2dCQUN0SCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDekIsS0FBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7b0JBQzNDLEtBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDO2dCQUNoQyxDQUFDO2dCQUNELEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQzdDLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDVixLQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDNUMsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFFbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxVQUFVLEtBQVUsRUFBRSxJQUFTO2dCQUNoRSxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUNWLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ3ZELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ25ELENBQUMsQ0FBQyxDQUFBO1lBQ04sQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQsOENBQWEsR0FBYjtZQUNJLElBQUksS0FBSyxHQUE0RCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3hGLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDO1lBQzFELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDckMsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsT0FBTyxFQUFFLFNBQVM7Z0JBQ2xCLEtBQUssRUFBRSxLQUFLO2dCQUNaLEtBQUssRUFBRSxPQUFPO2dCQUNkLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7Z0JBQ3hCLEdBQUcsRUFBRTtvQkFDRCxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3JCLENBQUM7YUFDSixDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQsK0NBQWMsR0FBZDtZQUFBLGlCQWFDO1lBWkcsSUFBSSxLQUFLLEdBQTJCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdkQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUNyQyxJQUFJLEVBQUUsQ0FBQztnQkFDUCxPQUFPLEVBQUUsbUJBQW1CO2dCQUM1QixLQUFLLEVBQUUsS0FBSztnQkFDWixLQUFLLEVBQUUsS0FBSztnQkFDWixJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO2dCQUN4QixHQUFHLEVBQUU7b0JBQ0QsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUNwQixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3JCLENBQUM7YUFDSixDQUFDLENBQUE7UUFDTixDQUFDO1FBR0QsNENBQVcsR0FBWCxVQUFZLEtBQVU7WUFDbEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLElBQUksSUFBSSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QyxJQUFJLElBQUksR0FBRztnQkFDUCxTQUFTLEVBQUUsS0FBSztnQkFDaEIsYUFBYSxFQUFFLGNBQWM7Z0JBQzdCLFdBQVcsRUFBRSxZQUFZO2dCQUN6QixVQUFVLEVBQUUsTUFBTTthQUNyQixDQUFDO1lBQ0YsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUF3QjtnQkFDakYsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQzt3QkFDVixJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO3dCQUN0RCxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFBO29CQUNqRCxDQUFDLENBQUMsQ0FBQTtnQkFDTixDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbkQsSUFBSSxPQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztvQkFDeEIsT0FBSyxDQUFDLEdBQUcsR0FBRyx5QkFBeUIsR0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFDckQsT0FBSyxDQUFDLE1BQU0sR0FBRzt3QkFDWCxJQUFJLElBQUksR0FBRzs0QkFDSCxPQUFPLEVBQUU7Z0NBQ0wsT0FBTyxFQUFFLE9BQUssQ0FBQyxLQUFLO2dDQUNwQixRQUFRLEVBQUUsT0FBSyxDQUFDLE1BQU07NkJBQ3pCO3lCQUNKLENBQUM7d0JBQ04sSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUN6QyxDQUFDLENBQUE7Z0JBQ0wsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2hELElBQUksT0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7b0JBQ3hCLE9BQUssQ0FBQyxHQUFHLEdBQUcseUJBQXlCLEdBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7b0JBQ3JELE9BQUssQ0FBQyxNQUFNLEdBQUc7d0JBQ1gsSUFBSSxJQUFJLEdBQUc7NEJBQ1AsT0FBTyxFQUFFO2dDQUNMLE9BQU8sRUFBRSxPQUFLLENBQUMsS0FBSztnQ0FDcEIsUUFBUSxFQUFFLE9BQUssQ0FBQyxNQUFNOzZCQUN6Qjt5QkFDSixDQUFDO3dCQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDdkMsQ0FBQyxDQUFBO2dCQUNMLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3JDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRCw0Q0FBVyxHQUFYO1lBQ0ksSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDN0MsQ0FBQztRQUtELHVDQUFNLEdBQU47WUFBQSxpQkFJQztZQUhHLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ1YsS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzdDLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUVELGdEQUFlLEdBQWYsVUFBZ0IsSUFBUyxFQUFFLEtBQWE7WUFDcEMsSUFBSSxLQUFLLEdBQXlILElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDckosS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ2pDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUE7WUFDdkQsQ0FBQztZQUNELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDckMsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsT0FBTyxFQUFFLGVBQWU7Z0JBQ3hCLEtBQUssRUFBRSxLQUFLO2dCQUNaLElBQUksRUFBRSxXQUFXO2dCQUNqQixLQUFLLEVBQUUsTUFBTTtnQkFDYixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDO2dCQUN2QixHQUFHLEVBQUU7b0JBQ0QsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNyQixDQUFDO2FBQ0osQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUtPLDJDQUFVLEdBQWxCO1lBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLElBQUksa0JBQWtCLEdBQUcsSUFBSSxxQ0FBa0IsRUFBRSxDQUFDO1lBQ2xELGtCQUFrQixDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7WUFDbEMsa0JBQWtCLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1lBRXpDLElBQUksWUFBWSxHQUEwQixJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLG1DQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5RyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUNmLGtCQUFrQixDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7Z0JBQ3BFLGtCQUFrQixDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7Z0JBQzNELElBQUksSUFBSSxHQUFPO29CQUNYLFdBQVcsRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUMzQyxXQUFXLEVBQUUsZUFBZTtvQkFDNUIsTUFBTSxFQUFFLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVE7aUJBQy9DLENBQUM7Z0JBQ0Ysa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMvQyxJQUFJLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLG1DQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzRSxDQUFDO1lBRUQsWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsbUNBQWdCLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFGLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ2Ysa0JBQWtCLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztnQkFDeEUsa0JBQWtCLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztnQkFDNUQsSUFBSSxJQUFJLEdBQU87b0JBQ1gsV0FBVyxFQUFFLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7b0JBQzVDLFdBQVcsRUFBRSxlQUFlO29CQUM1QixNQUFNLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVztpQkFDbkQsQ0FBQztnQkFDRixrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxhQUFhLENBQUMsd0JBQXdCLENBQUMsbUNBQWdCLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xGLENBQUM7WUFFRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7UUFDakQsQ0FBQztRQUdELDBDQUFTLEdBQVQsVUFBVSxHQUFjO1lBQ3BCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7Z0JBQ2xELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDdEQsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUN0QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUMxQyxDQUFDO1FBQ0wsQ0FBQztRQVFELDRDQUFXLEdBQVgsVUFBWSxRQUFhO1lBQ3JCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUNwRCxDQUFDO1FBRUQsbURBQWtCLEdBQWxCO1lBQUEsaUJBc0JDO1lBckJHLE9BQU8sQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQ0FBb0IsQ0FBQyxVQUFVLEVBQUUsVUFBQyxHQUFlO2dCQUMxRSxPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUN2QyxLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDekMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQzVDLElBQUksUUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUEwQixDQUFDO29CQUMvQyxRQUFNLENBQUMsV0FBVyxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUM7b0JBQ3RDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBTSxDQUFDLE1BQU0sS0FBSyxLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLElBQUUsQ0FBQyxRQUFNLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDOUUsS0FBSSxDQUFDLFFBQVEsQ0FBQzs0QkFDVixLQUFJLENBQUMsbUJBQW1CLENBQUMsdUJBQXVCLENBQUMsUUFBTSxDQUFDLENBQUM7NEJBQ3pELEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzt3QkFDdEIsQ0FBQyxDQUFDLENBQUE7b0JBQ04sQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDSixLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDbkMsQ0FBQztnQkFFTCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN0QyxDQUFDO2dCQUNELEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRCw2Q0FBWSxHQUFaO1lBQ0ksT0FBTyxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLDJDQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BFLENBQUM7UUFHRCw4Q0FBYSxHQUFiO1lBQUEsaUJBbUNDO1lBbENHLElBQUksTUFBTSxHQUFHLElBQUkscUNBQWtCLEVBQUUsQ0FBQztZQUN0QyxNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUM7WUFDckQsTUFBTSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDO1lBQzNELE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQztZQUMzQyxNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUM7WUFDckQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3RFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQztZQUMvQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUM7WUFDL0MsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDO1lBQy9DLE1BQU0sQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQztZQUNqRSxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUM7WUFDbkQsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDO1lBQy9DLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNyRCxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDN0MsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEQsTUFBTSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDbkUsTUFBTSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQzFCLENBQUM7WUFFRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBd0I7Z0JBQ3BFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDbkIsS0FBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQzlCLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7b0JBQ3pDLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFBO2dCQUNuQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUE7UUFFTixDQUFDO1FBRU8sMkNBQVUsR0FBbEI7WUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMxRixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDO1lBQzdDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUN6QyxDQUFDO1FBRUQsaURBQWdCLEdBQWhCLFVBQWlCLENBQVM7WUFBMUIsaUJBV0M7WUFWRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDbEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDO29CQUNWLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLG1CQUFtQixDQUFDLHlCQUF5QixDQUFDLEtBQUksQ0FBQyxZQUFZLEVBQUUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM1RyxDQUFDLENBQUMsQ0FBQTtZQUNOLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsUUFBUSxDQUFDO29CQUNWLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLG1CQUFtQixDQUFDLHlCQUF5QixDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDOUYsQ0FBQyxDQUFDLENBQUE7WUFDTixDQUFDO1FBQ0wsQ0FBQztRQUVELDRDQUFXLEdBQVg7WUFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNuQixDQUFDO1FBRUQsOENBQWEsR0FBYixVQUFjLEdBQWtDO1lBQWhELGlCQVlDO1lBWEcsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO2dCQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDO29CQUNWLEtBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztvQkFDbEMsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFJLENBQUMsbUJBQW1CLENBQUMseUJBQXlCLENBQUMsS0FBSSxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ2xHLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUE7Z0JBQ2hELENBQUMsQ0FBQyxDQUFBO1lBQ04sQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDMUYsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQTtZQUNoRCxDQUFDO1FBQ0wsQ0FBQztRQU9NLGdEQUFlLEdBQXRCLFVBQXVCLFFBQWEsRUFBRSxJQUFTO1lBQzNDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztZQUNoQixJQUFJLEtBQUssR0FBa0ssSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUU5TCxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNuQixLQUFLLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztZQUN0QixLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNsQixLQUFLLENBQUMsV0FBVyxHQUFHLGlCQUFpQixDQUFDO1lBQ3RDLEtBQUssQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO1lBQzFCLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1lBRS9DLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQy9CLElBQUksRUFBRSxDQUFDO2dCQUNQLElBQUksRUFBRSxXQUFXO2dCQUNqQixLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsMEVBQTBFLENBQUM7Z0JBQzNGLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7Z0JBQ3hCLE9BQU8sRUFBRSxtQkFBbUI7Z0JBQzVCLEtBQUssRUFBRSxLQUFLO2dCQUNaLEdBQUcsRUFBRTtvQkFDRCxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3JCLENBQUM7YUFDSixDQUFDLENBQUM7UUFFUCxDQUFDO1FBT00sOENBQWEsR0FBcEIsVUFBcUIsUUFBYSxFQUFFLElBQVM7WUFDekMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLElBQUksS0FBSyxHQUFvTCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBRWhOLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ25CLEtBQUssQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO1lBQ3RCLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLEtBQUssQ0FBQyxXQUFXLEdBQUcsaUJBQWlCLENBQUM7WUFDdEMsS0FBSyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7WUFDMUIsS0FBSyxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7WUFDbEQsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7WUFFbkIsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDL0IsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSwwRUFBMEUsQ0FBQztnQkFDM0YsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztnQkFDeEIsT0FBTyxFQUFFLGtCQUFrQjtnQkFDM0IsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osR0FBRyxFQUFFO29CQUNELEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDckIsQ0FBQzthQUNKLENBQUMsQ0FBQztRQUNQLENBQUM7UUFHTSwyQ0FBVSxHQUFqQixVQUFrQixLQUFVLEVBQUUsSUFBWTtZQUN0QyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNSLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUM1QixDQUFDO1lBQ0QsSUFBSSxLQUFLLEdBQWlFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDN0YsS0FBSyxDQUFDLEtBQUssR0FBRyxpQkFBaUIsQ0FBQztZQUNoQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNQLElBQUksT0FBTyxHQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxHQUFHLENBQUM7Z0JBQzNDLElBQUksT0FBTyxHQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUM7Z0JBQzVDLElBQUksV0FBVyxHQUFHLGlCQUFlLElBQUksc0JBQWlCLE9BQU8sa0JBQWEsT0FBTyxVQUFPLENBQUM7Z0JBQ3pGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO29CQUNaLElBQUksRUFBRSxDQUFDO29CQUNQLEtBQUssRUFBRSxLQUFLO29CQUNaLFFBQVEsRUFBRSxDQUFDO29CQUNYLElBQUksRUFBRSw0QkFBNEI7b0JBQ2xDLFVBQVUsRUFBRSxJQUFJO29CQUNoQixLQUFLLEVBQUUsR0FBRztvQkFDVixJQUFJLEVBQUUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxFQUFFLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBQ3RDLE9BQU8sRUFBRSxXQUFXO29CQUNwQixLQUFLLEVBQUUsS0FBSztvQkFDWixHQUFHLEVBQUU7d0JBQ0QsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUNyQixDQUFDO2lCQUNKLENBQUMsQ0FBQztZQUNQLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUM3QixDQUFDO1FBQ0wsQ0FBQztRQU1ELGtEQUFpQixHQUFqQixVQUFrQixLQUFVLEVBQUUsSUFBUztZQUNuQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNSLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUM1QixDQUFDO1lBQ0QsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBQ3ZELENBQUM7UUFNRCw4Q0FBYSxHQUFiLFVBQWMsS0FBUyxFQUFFLElBQVEsRUFBRSxJQUFXO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQzVCLENBQUM7WUFDRCxJQUFJLGFBQWEsR0FBMEIsbUNBQWdCLENBQUMsV0FBVyxDQUFDO1lBQ3hFLGFBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQzFCLElBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUMzRSxZQUFZLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUM3QyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssbUNBQWdCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUNBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdDLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLG1DQUFnQixDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxNQUFNLENBQUMsSUFBSSxDQUFDLG1DQUFnQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwRCxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxtQ0FBZ0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDakQsTUFBTSxDQUFDLElBQUksQ0FBQyxtQ0FBZ0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakQsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssbUNBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUNBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVDLENBQUM7UUFDTCxDQUFDO1FBQ0wsNkJBQUM7SUFBRCxDQXhjQSxBQXdjQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL0ZhY2VBbmFseXNpcy9GYWNlQW5hbHlzaXMuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vQW5hbHlzaXMuZmFjZWxpYi5wb3B1cC5odG1sXCIgbmFtZT1cInBvcHVwSHRtbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vRmFjZUFuYWx5c2lzUG9wdXBEZXRhaWwvZmFjZWFuYWx5c2lzLnBvcHVwLmRldGFpbC5odG1sXCIgbmFtZT1cImRldGFpbFBvcHVwSHRtbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vbG9hZGluZy9sb2FkaW5nLmh0bWxcIiBuYW1lPVwibG9hZGluZ0FuYWx5c2lzSHRtbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vLi4vY29tbW9uL2ZhY2VIYW5kbGVQb3B1cC9zZWxlY3RGYWNlLnBvcHVwLmh0bWxcIiBuYW1lPVwic2VsZWN0RmFjZVBvcHVwSHRtbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vLi4vY29tbW9uL2ZhY2VIYW5kbGVQb3B1cC9kZW1hcmNhdGUucG9wdXAuaHRtbFwiIG5hbWU9XCJkZW1hcmNhdGVQb3B1cEh0bWxcIiAvPlxyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0ICdjc3MhLi4vc3R5bGUvRmFjZUFuYWx5c2lzLmNzcyc7XHJcbmltcG9ydCAnY3NzIS4uL0ZhY2VBbmFseXNpc1BvcHVwRGV0YWlsL2ZhY2VhbmFseXNpcy5wb3B1cC5kZXRhaWwuY3NzJztcclxuXHJcbi8vIOacjeWKoVxyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vZmFjdG9yeS9zb2NrZXQuZmFjdG9yeVwiO1xyXG5pbXBvcnQge0lTb2NrZXRGYWN0b3J5fSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZhY3Rvcnkvc29ja2V0LmZhY3RvcnlcIjtcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FuYWx5c2lzLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtJQW5hbHlzaXNTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FuYWx5c2lzLnNlcnZpY2VcIjtcclxuaW1wb3J0IFwiLi9GYWNlLmFuYWx5c2lzLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtJRmFjZUFuYWx5c2lzU2VydmljZSwgUGFnZVBhcmFtc30gZnJvbSBcIi4vRmFjZS5hbmFseXNpcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9mYWN0b3J5L2xheWVyTXNnLmZhY3RvcnlcIjtcclxuaW1wb3J0IHtJTGF5ZXJEZWN9IGZyb20gXCIuLi8uLi9jb21tb24vZmFjdG9yeS9sYXllck1zZy5mYWN0b3J5XCI7XHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL2ZhY3RvcnkvSGFuZGxlU3RvcmFnZS5mYWN0b3J5JztcclxuaW1wb3J0IHtJSGFuZGxlU3RvcmFnZX0gZnJvbSAnLi4vLi4vY29tbW9uL2ZhY3RvcnkvSGFuZGxlU3RvcmFnZS5mYWN0b3J5JztcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL3VwbG9hZEltYWdlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtJVXBsb2FkSW1hZ2VTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL3VwbG9hZEltYWdlLnNlcnZpY2VcIjtcclxuXHJcbi8vIOW8ueahhlxyXG5pbXBvcnQgJy4uL0FuYWx5c2lzLmZhY2VsaWIucG9wdXAnXHJcbmltcG9ydCAnLi4vRmFjZUFuYWx5c2lzUG9wdXBEZXRhaWwvZmFjZWFuYWx5c2lzLnBvcHVwLmRldGFpbC5jb250cm9sbGVyJztcclxuXHJcbi8vIOWPguaVsFxyXG5pbXBvcnQge05QR2lzTWFwTWFpbn0gZnJvbSAnLi4vLi4vY29tbW9uL21hcC9tYXAubWFpbic7XHJcbmltcG9ydCB7U3lzdGVtUG9pbnR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9TeXN0ZW1Qb2ludFwiO1xyXG5pbXBvcnQge0ZhY2VBbmFseXNpc1BhcmFtcywgUGVyc29uSW5mb01vZGVsLCBGYWNlQW5hbHlzaXNSZXN1bHR9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L0ZhY2VBbmFseXNpc0VudW0nO1xyXG5pbXBvcnQge1Jlc3BvbnNlUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7RW51bSwgQWdlLCBnZXRBZ2VMaXN0LCBnZXRTZXhEYXRhTGlzdCwgU2V4RGF0YX0gZnJvbSAnLi4vQW5hbHlzaXNFbnVtJztcclxuaW1wb3J0IHtTb2NrZXRSZXN1bHRUeXBlRW51bX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vU29ja2V0UmVzdWx0VHlwZUVudW1cIjtcclxuaW1wb3J0IHtOYXRpb25UeXBlfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2ZXIvZW51bS9OYXRpb25UeXBlXCI7XHJcbmltcG9ydCB7UGVyc29uQWxhcm1SZXN1bHR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9QZXJzb25BbGFybUVudW1cIjtcclxuaW1wb3J0IHtBbmFseXNpc0RhdGFUeXBlLCBBbmFseXNpc1N0b3JhZ2VQYXJhbXMsIEFuYWx5c2lzR29Ub1R5cGV9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL0FuYWx5c2lzRGF0YVR5cGVcIjtcclxuXHJcbmRlY2xhcmUgbGV0ICQ6IGFueSwgcG9wdXBIdG1sOiBhbnksIGRldGFpbFBvcHVwSHRtbDogYW55LCBsb2FkaW5nQW5hbHlzaXNIdG1sOiBhbnksIHNlbGVjdEZhY2VQb3B1cEh0bWw6IGFueSxcclxuICAgIGRlbWFyY2F0ZVBvcHVwSHRtbDogYW55O1xyXG5cclxuY2xhc3MgRmFjZUFuYWx5c2lzQ29udHJvbGxlciB7XHJcbiAgICAkaW5qZWN0OiBBcnJheTxzdHJpbmc+ID0gWyckc2NvcGUnLCAnJHRpbWVvdXQnLCAnbGF5ZXInLCAnbGF5ZXJEZWMnLCAnYW5hbHlzaXNTZXJ2aWNlJywgJ2ZhY2VBbmFseXNpc1NlcnZpY2UnLCAnc29ja2V0RmFjdG9yeScsICdoYW5kbGVTdG9yYWdlJywgJ3VwbG9hZEltYWdlU2VydmljZScsICckc3RhdGUnXTtcclxuICAgIG1hcDogTlBHaXNNYXBNYWluO1xyXG4gICAgc3lzdGVtUG9pbnRMaXN0OiBBcnJheTxTeXN0ZW1Qb2ludD47XHJcbiAgICBGYWNlQW5hbHlzaXNQYXJhbXM6IEZhY2VBbmFseXNpc1BhcmFtcztcclxuICAgIHdpZHRoOiBudW1iZXIgPSAwO1xyXG4gICAgUmVzdWx0QWN0aXZlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBTZXhEYXRlTGlzdDogQXJyYXk8RW51bTxudW1iZXI+PiA9IGdldFNleERhdGFMaXN0KCk7XHJcbiAgICBBZ2VEYXRhTGlzdDogQXJyYXk8RW51bTxBZ2U+PiA9IGdldEFnZUxpc3QoKTtcclxuICAgIFNleERhdGU6IEVudW08bnVtYmVyPiA9IFNleERhdGEuYWxsO1xyXG4gICAgbmF0aW9uTGlzdDogQXJyYXk8eyB0ZXh0OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIHBhcmVudENvZGU6IHN0cmluZyB9PiA9IE5hdGlvblR5cGU7XHJcbiAgICBsaWJOYW1lTGlzdDogQXJyYXk8eyBJRDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIH0+ID0gW107XHJcbiAgICBzaW1pbGFyaXR5TWF4OiBudW1iZXIgPSAxMDA7XHJcbiAgICBzaW1pbGFyaXR5TWluOiBudW1iZXIgPSA4MDtcclxuICAgIHJlc3VsdFBhcmFtczogUGFnZVBhcmFtcyA9IG5ldyBQYWdlUGFyYW1zKCk7IC8vIOS6uuiEuOafpeivoue7k+aenFxyXG4gICAgY3VycmVudExheWVySW5kZXg6IG51bWJlcjtcclxuICAgIGxpYk5hbWU6IHN0cmluZyA9IG51bGw7XHJcbiAgICBhbGxSZXN1bHQ6IEFycmF5PFBlcnNvbkluZm9Nb2RlbD47XHJcblxyXG4gICAgc2VsZWN0RmFjZUN0cmw6IHN0cmluZyA9IFwiZ2V0LWZhY2UtaW5mby1xdWlja1wiO1xyXG4gICAgYW5hbHlzaXNHb1RvID0gQW5hbHlzaXNHb1RvVHlwZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBsYXllcjogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBsYXllckRlYzogSUxheWVyRGVjLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBhbmFseXNpc1NlcnZpY2U6IElBbmFseXNpc1NlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGZhY2VBbmFseXNpc1NlcnZpY2U6IElGYWNlQW5hbHlzaXNTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBzb2NrZXRGYWN0b3J5OiBJU29ja2V0RmFjdG9yeSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgaGFuZGxlU3RvcmFnZTogSUhhbmRsZVN0b3JhZ2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHVwbG9hZEltYWdlU2VydmljZTogSVVwbG9hZEltYWdlU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgJHN0YXRlOiBhbnkpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJG9uKCdjbG9zZS5mYWNlbGliLnBvcHVwJywgKGV2ZW50OiBhbnksIGxpYnNJZHM6IEFycmF5PHN0cmluZz4sIGxpYnNFbnVtOiBBcnJheTx7IElEOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfT4pID0+IHtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobGlic0lkcykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuRmFjZUFuYWx5c2lzUGFyYW1zLmFyckxpYklkID0gbGlic0lkcztcclxuICAgICAgICAgICAgICAgIHRoaXMubGliTmFtZUxpc3QgPSBsaWJzRW51bTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxheWVyLmNsb3NlKHRoaXMuY3VycmVudExheWVySW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzZWxmLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoJ3Nob3dJdGVtUGFnZScsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNlbGYuaW5pdFBhcmFtcygpO1xyXG4gICAgICAgIC8vIOebkeWQrOS6uuiEuOmAieaLqeS6i+S7tlxyXG4gICAgICAgIHNlbGYuJHNjb3BlLiRvbihzZWxmLnNlbGVjdEZhY2VDdHJsLCBmdW5jdGlvbiAoZXZlbnQ6IGFueSwgZGF0YTogYW55KSB7XHJcbiAgICAgICAgICAgIHNlbGYuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5GYWNlQW5hbHlzaXNQYXJhbXMuaW1hZ2VQYXRoID0gZGF0YS5kYXRhLmltYWdldXJsO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5GYWNlQW5hbHlzaXNQYXJhbXMudGFza0lkID0gZGF0YS5kYXRhLmtleTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RGYWNlTGliKCkge1xyXG4gICAgICAgIGxldCBzY29wZTogeyBzZWxlY3RDYW1lcmFMaXN0OiBBcnJheTxzdHJpbmc+LCAkZGVzdHJveTogRnVuY3Rpb24gfSA9IHRoaXMuJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICBzY29wZS5zZWxlY3RDYW1lcmFMaXN0ID0gdGhpcy5GYWNlQW5hbHlzaXNQYXJhbXMuYXJyTGliSWQ7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGF5ZXJJbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IHBvcHVwSHRtbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICB0aXRsZTogXCLkurrlg4/lupPpgInmi6lcIixcclxuICAgICAgICAgICAgYXJlYTogW1wiNzEwcHhcIiwgXCI2MjBweFwiXSxcclxuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdExvYWRpbmdQb3AoKSB7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7ICRkZXN0cm95OiBGdW5jdGlvbiB9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudExheWVySW5kZXggPSB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBjb250ZW50OiBsb2FkaW5nQW5hbHlzaXNIdG1sLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIHRpdGxlOiBmYWxzZSxcclxuICAgICAgICAgICAgYXJlYTogWyc1MDBweCcsIFwiMjgwcHhcIl0sXHJcbiAgICAgICAgICAgIGVuZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51bmJpbmRTb2NrZXQoKTtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyDkuIrkvKDlm77niYdcclxuICAgIHVwbG9hZEltYWdlKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGZyb20gPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBmcm9tLmFwcGVuZCgnaW1hZ2UnLCBldmVudC50YXJnZXQuZmlsZXNbMF0pO1xyXG4gICAgICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgICAgICBzdG9yZVR5cGU6IFwiTE9DXCIsXHJcbiAgICAgICAgICAgIGltYWdlQ2F0ZWdvcnk6IFwiQ2FwdHVyZUltYWdlXCIsXHJcbiAgICAgICAgICAgIGNvbW1hbmRUeXBlOiBcIlNlYXJjaEZhY2VcIixcclxuICAgICAgICAgICAgZGV0ZWN0VHlwZTogXCJGYWNlXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMudXBsb2FkSW1hZ2VTZXJ2aWNlLnVwbG9hZEltYWdlRm9yRmFjZShmcm9tLCBkYXRhKS50aGVuKChyZXM6IFJlc3BvbnNlUmVzdWx0PGFueT4pID0+IHtcclxuICAgICAgICAgICAgaWYgKChyZXMuY29kZSA9PT0gMjAwKSAmJiAocmVzLmRhdGEgJiYgcmVzLmRhdGEua2V5KSkgeyAvLyDkurrohLjor4bliKvmiJDlip9cclxuICAgICAgICAgICAgICAgIHNlbGYuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuRmFjZUFuYWx5c2lzUGFyYW1zLmltYWdlUGF0aCA9IHJlcy5kYXRhLmltYWdldXJsO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuRmFjZUFuYWx5c2lzUGFyYW1zLnRhc2tJZCA9IHJlcy5kYXRhLmtleVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgocmVzLmNvZGUgPT09IDIwMCkgJiYgKHJlcy5kYXRhLmZhY2VJbmZvKSkgey8vIOS6uuiEuOmAieaLqVxyXG4gICAgICAgICAgICAgICAgbGV0IGltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5zcmMgPSAnZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwnK3Jlcy5kYXRhLmltYWdlO1xyXG4gICAgICAgICAgICAgICAgaW1hZ2Uub25sb2FkID0gKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiX2luZm9cIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogaW1hZ2Uud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogaW1hZ2UuaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5tdWx0aVVzZXJTZWxlY3QocmVzLmRhdGEsIGZpbGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChyZXMuY29kZSA9PT0gMjAwKSAmJiAocmVzLmRhdGEuaW1hZ2UpKSB7IC8vIOS6uuiEuOivhuWIq+Wksei0peW+heagh+WumlxyXG4gICAgICAgICAgICAgICAgbGV0IGltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5zcmMgPSAnZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwnK3Jlcy5kYXRhLmltYWdlO1xyXG4gICAgICAgICAgICAgICAgaW1hZ2Uub25sb2FkID0gKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJfaW5mb1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IGltYWdlLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogaW1hZ2UuaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZmFjZURlbWFyY2F0ZShyZXMuZGF0YSwgZmlsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxheWVyRGVjLndhcm5JbmZvKCfkurrohLjor4bliKvlpLHotKUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZUltYWdlKCkge1xyXG4gICAgICAgIHRoaXMuRmFjZUFuYWx5c2lzUGFyYW1zLmltYWdlUGF0aCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g6L+U5Zue5LiK57qnXHJcbiAgICAgKi9cclxuICAgIGdvQmFjaygpIHtcclxuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoJ3Nob3dJdGVtUGFnZScsIGZhbHNlKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9wZW5EZXRhaWxQb3B1cChpdGVtOiBhbnksIGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgc2NvcGU6IHsgcmVzdWx0OiBQZXJzb25JbmZvTW9kZWwsIGJhc2VJbWFnZTogc3RyaW5nLCBhbGxSZXN1bHQ6IEFycmF5PFBlcnNvbkluZm9Nb2RlbD4sIGluZGV4OiBudW1iZXIsICRkZXN0cm95OiBGdW5jdGlvbiB9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLmFsbFJlc3VsdCA9IHRoaXMuYWxsUmVzdWx0O1xyXG4gICAgICAgIHNjb3BlLnJlc3VsdCA9IGl0ZW07XHJcbiAgICAgICAgc2NvcGUuaW5kZXggPSBpbmRleDtcclxuICAgICAgICBpZiAodGhpcy5GYWNlQW5hbHlzaXNQYXJhbXMuaW1hZ2VQYXRoKSB7XHJcbiAgICAgICAgICAgIHNjb3BlLmJhc2VJbWFnZSA9IHRoaXMuRmFjZUFuYWx5c2lzUGFyYW1zLmltYWdlUGF0aFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN1cnJlbnRMYXllckluZGV4ID0gdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgY29udGVudDogZGV0YWlsUG9wdXBIdG1sLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIHNraW46IFwibm8tc2Nyb2xsXCIsXHJcbiAgICAgICAgICAgIHRpdGxlOiAn5Lq65ZGY6K+m5oOFJyxcclxuICAgICAgICAgICAgYXJlYTogW1wiYXV0b1wiLCBcIjI3NXB4XCJdLFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOWIneWni+WMluafpeivouihqOWNleWPguaVsOaVsOaNrlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRQYXJhbXMoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBmYWNlQW5hbHlzaXNQYXJhbXMgPSBuZXcgRmFjZUFuYWx5c2lzUGFyYW1zKCk7XHJcbiAgICAgICAgZmFjZUFuYWx5c2lzUGFyYW1zLnRocmVzaG9sZCA9IDkwO1xyXG4gICAgICAgIGZhY2VBbmFseXNpc1BhcmFtcy5mZWF0dXJlU2VhcmNoRXh0ID0gW107XHJcbiAgICAgICAgLy8g5Yik5pat5piv5ZCm5pyJ6YCa6KGM6K6w5b2V5b+r6YCf5qOA57SiXHJcbiAgICAgICAgbGV0IEFuYWx5c2lzRGF0YTogQW5hbHlzaXNTdG9yYWdlUGFyYW1zID0gc2VsZi5oYW5kbGVTdG9yYWdlLmdldFNlc3Npb25TdG9yYWdlRGF0YShBbmFseXNpc0RhdGFUeXBlLkZhY2Uua2V5KTtcclxuICAgICAgICBpZiAoQW5hbHlzaXNEYXRhKSB7XHJcbiAgICAgICAgICAgIGZhY2VBbmFseXNpc1BhcmFtcy5pbWFnZVBhdGggPSBBbmFseXNpc0RhdGEuZGF0YS5BY2Nlc3NMb2cuRmFjZVBhdGg7XHJcbiAgICAgICAgICAgIGZhY2VBbmFseXNpc1BhcmFtcy50YXNrSWQgPSBBbmFseXNpc0RhdGEuZGF0YS5BY2Nlc3NMb2cuSUQ7XHJcbiAgICAgICAgICAgIGxldCBpdGVtOmFueSA9IHtcclxuICAgICAgICAgICAgICAgIGFjY2Vzc0xvZ0lkOiBBbmFseXNpc0RhdGEuZGF0YS5BY2Nlc3NMb2cuSUQsXHJcbiAgICAgICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJBY2Nlc3NGZWF0dXJlXCIsXHJcbiAgICAgICAgICAgICAgICBpbWdVcmw6IEFuYWx5c2lzRGF0YS5kYXRhLkFjY2Vzc0xvZy5GYWNlUGF0aFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBmYWNlQW5hbHlzaXNQYXJhbXMuZmVhdHVyZVNlYXJjaEV4dC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICBzZWxmLmhhbmRsZVN0b3JhZ2UucmVtb3ZlU2Vzc2lvblN0b3JhZ2VEYXRhKEFuYWx5c2lzRGF0YVR5cGUuRmFjZS5rZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDliKTmlq3mmK/lkKbmnInkurrohLjliIbmnpDlv6vpgJ/mo4DntKJcclxuICAgICAgICBBbmFseXNpc0RhdGEgPSB0aGlzLmhhbmRsZVN0b3JhZ2UuZ2V0U2Vzc2lvblN0b3JhZ2VEYXRhKEFuYWx5c2lzRGF0YVR5cGUuRmFjZUxpYnJhcnkua2V5KTtcclxuICAgICAgICBpZiAoQW5hbHlzaXNEYXRhKSB7XHJcbiAgICAgICAgICAgIGZhY2VBbmFseXNpc1BhcmFtcy5pbWFnZVBhdGggPSBBbmFseXNpc0RhdGEuZGF0YS5QZXJzb25JbmZvLkZhY2VQaWNQYXRoO1xyXG4gICAgICAgICAgICBmYWNlQW5hbHlzaXNQYXJhbXMudGFza0lkID0gQW5hbHlzaXNEYXRhLmRhdGEuUGVyc29uSW5mby5JRDtcclxuICAgICAgICAgICAgbGV0IGl0ZW06YW55ID0ge1xyXG4gICAgICAgICAgICAgICAgYWNjZXNzTG9nSWQ6IEFuYWx5c2lzRGF0YS5kYXRhLlBlcnNvbkluZm8uSUQsXHJcbiAgICAgICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJBY2Nlc3NGZWF0dXJlXCIsXHJcbiAgICAgICAgICAgICAgICBpbWdVcmw6IEFuYWx5c2lzRGF0YS5kYXRhLlBlcnNvbkluZm8uRmFjZVBpY1BhdGhcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZmFjZUFuYWx5c2lzUGFyYW1zLmZlYXR1cmVTZWFyY2hFeHQucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgc2VsZi5oYW5kbGVTdG9yYWdlLnJlbW92ZVNlc3Npb25TdG9yYWdlRGF0YShBbmFseXNpc0RhdGFUeXBlLkZhY2VMaWJyYXJ5LmtleSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxmLkZhY2VBbmFseXNpc1BhcmFtcyA9IGZhY2VBbmFseXNpc1BhcmFtcztcclxuICAgIH1cclxuXHJcblxyXG4gICAgc2VsZWN0QWdlKGFnZTogRW51bTxBZ2U+KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhZ2UgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuRmFjZUFuYWx5c2lzUGFyYW1zLm1heEFnZSA9IGFnZS52YWx1ZS5tYXhBZ2U7XHJcbiAgICAgICAgICAgIHRoaXMuRmFjZUFuYWx5c2lzUGFyYW1zLm1pbkFnZSA9IGFnZS52YWx1ZS5taW5BZ2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5GYWNlQW5hbHlzaXNQYXJhbXMubWF4QWdlID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5GYWNlQW5hbHlzaXNQYXJhbXMubWluQWdlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBkZXNjcmlwdGlvbiDpgInkuK3msJHml49cclxuICAgICAqIEBwYXJhbSBzZWxlY3RlZCAvL+mAieS4reWvueixoVxyXG4gICAgICovXHJcbiAgICBuYXRpb25DbGljayhzZWxlY3RlZDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5GYWNlQW5hbHlzaXNQYXJhbXMubmF0aW9uID0gc2VsZWN0ZWQudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZFNvY2tldFRvUmVzdWx0KCkge1xyXG4gICAgICAgIGNvbnNvbGUud2Fybignc29ja2V0IGNhbGxiYWNrIGlzIGJpbmQnKTtcclxuICAgICAgICB0aGlzLnNvY2tldEZhY3Rvcnkuc3Vic2NyaWJlKFNvY2tldFJlc3VsdFR5cGVFbnVtLlNlYXJjaEZhY2UsIChyZXM6IEFycmF5PGFueT4pID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5pbmZvKCdzb2NraXQg5Zue6LCD5bey6Kem5Y+RIOe7k+aenOaYr++8micsIHJlcyk7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIuY2xvc2UodGhpcy5jdXJyZW50TGF5ZXJJbmRleCk7XHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlcykgJiYgcmVzWzBdLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHJlc1swXS5kYXRhIGFzIEZhY2VBbmFseXNpc1Jlc3VsdDtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5MaWJOYW1lTGlzdCA9IHRoaXMubGliTmFtZUxpc3Q7XHJcbiAgICAgICAgICAgICAgICBpZiAoKHJlc3VsdC5UYXNrSWQgPT09IHRoaXMuRmFjZUFuYWx5c2lzUGFyYW1zLnRhc2tJZCkmJihyZXN1bHQuVG90YWxDb3VudCA+IDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmFjZUFuYWx5c2lzU2VydmljZS5zZXRGYWNlQW5hbHlzaXNEYXRhTGlzdChyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dSZXN1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxheWVyRGVjLmluZm8oJyDmsqHmnInmn6Xor6LliLDnu5PmnpwnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyRGVjLndhcm5JbmZvKCfmn6Xor6Lnu5PmnpzlpLHotKXvvIEnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnVuYmluZFNvY2tldCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVuYmluZFNvY2tldCgpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ3NvY2tldCBjYWxsYmFjayBpcyB1bmJpbmQnKTtcclxuICAgICAgICB0aGlzLnNvY2tldEZhY3RvcnkudW5TdWJzY3JpYmUoU29ja2V0UmVzdWx0VHlwZUVudW0uU2VhcmNoRmFjZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5o+Q5Lqk5p+l6K+i6K+35rGCXHJcbiAgICBhbmFseXNpc1F1ZXJ5KCkge1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSBuZXcgRmFjZUFuYWx5c2lzUGFyYW1zKCk7XHJcbiAgICAgICAgcGFyYW1zLmltYWdlUGF0aCA9IHRoaXMuRmFjZUFuYWx5c2lzUGFyYW1zLmltYWdlUGF0aDtcclxuICAgICAgICBwYXJhbXMuaWRDYXJkTnVtYmVyID0gdGhpcy5GYWNlQW5hbHlzaXNQYXJhbXMuaWRDYXJkTnVtYmVyO1xyXG4gICAgICAgIHBhcmFtcy5uYW1lID0gdGhpcy5GYWNlQW5hbHlzaXNQYXJhbXMubmFtZTtcclxuICAgICAgICBwYXJhbXMudGhyZXNob2xkID0gdGhpcy5GYWNlQW5hbHlzaXNQYXJhbXMudGhyZXNob2xkO1xyXG4gICAgICAgIHRoaXMuU2V4RGF0ZS52YWx1ZSA/IChwYXJhbXMuYXJyR2VuZGVyID0gW3RoaXMuU2V4RGF0ZS52YWx1ZV0pIDogbnVsbDtcclxuICAgICAgICBwYXJhbXMubWluQWdlID0gdGhpcy5GYWNlQW5hbHlzaXNQYXJhbXMubWluQWdlO1xyXG4gICAgICAgIHBhcmFtcy5tYXhBZ2UgPSB0aGlzLkZhY2VBbmFseXNpc1BhcmFtcy5tYXhBZ2U7XHJcbiAgICAgICAgcGFyYW1zLm5hdGlvbiA9IHRoaXMuRmFjZUFuYWx5c2lzUGFyYW1zLm5hdGlvbjtcclxuICAgICAgICBwYXJhbXMucmV0cmlldmFsUmVhc29uID0gdGhpcy5GYWNlQW5hbHlzaXNQYXJhbXMucmV0cmlldmFsUmVhc29uO1xyXG4gICAgICAgIHBhcmFtcy5hcnJMaWJJZCA9IHRoaXMuRmFjZUFuYWx5c2lzUGFyYW1zLmFyckxpYklkO1xyXG4gICAgICAgIHBhcmFtcy50YXNrSWQgPSB0aGlzLkZhY2VBbmFseXNpc1BhcmFtcy50YXNrSWQ7XHJcbiAgICAgICAgaWYgKCFwYXJhbXMudGFza0lkICYmICFwYXJhbXMuaWRDYXJkTnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxheWVyRGVjLndhcm5JbmZvKCfor7fpgInmi6nlm77niYfvvIzouqvku73or4HnmoTku7vmhI/kuIDpobnvvIEnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHBhcmFtcy5hcnJMaWJJZCkgfHwgcGFyYW1zLmFyckxpYklkLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYXllckRlYy53YXJuSW5mbygn6K+36YCJ5oup5Lq65YOP5bqT77yBJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLkZhY2VBbmFseXNpc1BhcmFtcy5mZWF0dXJlU2VhcmNoRXh0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcGFyYW1zLmZlYXR1cmVTZWFyY2hFeHQgPSB0aGlzLkZhY2VBbmFseXNpc1BhcmFtcy5mZWF0dXJlU2VhcmNoRXh0O1xyXG4gICAgICAgICAgICBwYXJhbXMudGFza0lkID0gXCJcIjtcclxuICAgICAgICAgICAgcGFyYW1zLmltYWdlUGF0aCA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmluaXRMb2FkaW5nUG9wKCk7XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc1NlcnZpY2UuZmFjZUFuYWx5c2lzKHBhcmFtcykudGhlbigocmVzOiBSZXNwb25zZVJlc3VsdDxhbnk+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRTb2NrZXRUb1Jlc3VsdCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZSh0aGlzLmN1cnJlbnRMYXllckluZGV4KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGF5ZXJEZWMuZmFpbEluZm8oJ+afpeivouWksei0pe+8gScpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dSZXN1bHQoKSB7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMucmVzdWx0UGFyYW1zLnBhZ2VTaXplID0gMzI7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRQYXJhbXMgPSB0aGlzLmZhY2VBbmFseXNpc1NlcnZpY2UuZ2V0RmFjZUFuYWx5c2lzRGF0YUJ5UGFnZSh0aGlzLnJlc3VsdFBhcmFtcyk7XHJcbiAgICAgICAgdGhpcy5hbGxSZXN1bHQgPSB0aGlzLnJlc3VsdFBhcmFtcy5hbGxSZXN1bHQ7XHJcbiAgICAgICAgdGhpcy5SZXN1bHRBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSAkKHdpbmRvdykud2lkdGgoKSAtIDM2MDtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VSZXN1bHRQYWdlKGk6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucmVzdWx0UGFyYW1zLmN1cnJlbnRQYWdlID0gaTtcclxuICAgICAgICBpZiAodGhpcy5saWJOYW1lICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRQYXJhbXMgPSB0aGlzLmZhY2VBbmFseXNpc1NlcnZpY2UuZ2V0RmFjZUFuYWx5c2lzRGF0YUJ5UGFnZSh0aGlzLnJlc3VsdFBhcmFtcywgdGhpcy5saWJOYW1lKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0UGFyYW1zID0gdGhpcy5mYWNlQW5hbHlzaXNTZXJ2aWNlLmdldEZhY2VBbmFseXNpc0RhdGFCeVBhZ2UodGhpcy5yZXN1bHRQYXJhbXMpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbG9zZVJlc3VsdCgpIHtcclxuICAgICAgICB0aGlzLlJlc3VsdEFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGxpYk5hbWVTZWxlY3QobGliOiB7IElEOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfSkge1xyXG4gICAgICAgIGlmIChsaWIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5saWJOYW1lID0gbGliLnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0UGFyYW1zID0gdGhpcy5mYWNlQW5hbHlzaXNTZXJ2aWNlLmdldEZhY2VBbmFseXNpc0RhdGFCeVBhZ2UodGhpcy5yZXN1bHRQYXJhbXMsIGxpYi5JRCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbFJlc3VsdCA9IHRoaXMucmVzdWx0UGFyYW1zLmFsbFJlc3VsdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdWx0UGFyYW1zID0gdGhpcy5mYWNlQW5hbHlzaXNTZXJ2aWNlLmdldEZhY2VBbmFseXNpc0RhdGFCeVBhZ2UodGhpcy5yZXN1bHRQYXJhbXMpO1xyXG4gICAgICAgICAgICB0aGlzLmFsbFJlc3VsdCA9IHRoaXMucmVzdWx0UGFyYW1zLmFsbFJlc3VsdFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbuWkmuS6uuiEuOmAieaLqVxyXG4gICAgICogQHBhcmFtIGZhY2VJbmZvXHJcbiAgICAgKiBAcGFyYW0gZmlsZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbXVsdGlVc2VyU2VsZWN0KGZhY2VJbmZvOiBhbnksIGZpbGU6IGFueSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgc2NvcGU6IHsgbGF5ZXI6IGFueTsgaW5kZXg6IHN0cmluZywgJGRlc3Ryb3k6IEZ1bmN0aW9uLCBkYXRhOiBhbnksIGZpbGU6IGFueSwgY29tbWFuZFR5cGU6IHN0cmluZywgZGV0ZWN0VHlwZTogc3RyaW5nLCBsYXllckluZGV4OiBhbnksIGZyb21TZWxlY3RGYWNlQ3RybDogc3RyaW5nIH0gPSBzZWxmLiRzY29wZS4kbmV3KCk7XHJcblxyXG4gICAgICAgIHNjb3BlLmluZGV4ID0gbnVsbDtcclxuICAgICAgICBzY29wZS5kYXRhID0gZmFjZUluZm87XHJcbiAgICAgICAgc2NvcGUuZmlsZSA9IGZpbGU7XHJcbiAgICAgICAgc2NvcGUuY29tbWFuZFR5cGUgPSBcIlNlYXJjaEFjY2Vzc0xvZ1wiO1xyXG4gICAgICAgIHNjb3BlLmRldGVjdFR5cGUgPSBcIkZhY2VcIjtcclxuICAgICAgICBzY29wZS5mcm9tU2VsZWN0RmFjZUN0cmwgPSBzZWxmLnNlbGVjdEZhY2VDdHJsO1xyXG5cclxuICAgICAgICBzY29wZS5sYXllckluZGV4ID0gc2VsZi5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgc2tpbjogJ25vLXNjcm9sbCcsXHJcbiAgICAgICAgICAgIHRpdGxlOiBbJ+S6uuiEuOmAieaLqScsICdmb250LXdlaWdodDogYm9sZDtiYWNrZ3JvdW5kLWNvbG9yOiAjRjZGOEZCO2NvbG9yOiAjNjA2MDYwO2hlaWdodDogNDBweDsnXSxcclxuICAgICAgICAgICAgYXJlYTogWyc0MDBweCcsICczMTBweCddLFxyXG4gICAgICAgICAgICBjb250ZW50OiBzZWxlY3RGYWNlUG9wdXBIdG1sLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbuS6uuiEuOagh+azqFxyXG4gICAgICogQHBhcmFtIGZhY2VJbmZvXHJcbiAgICAgKiBAcGFyYW0gZmlsZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmFjZURlbWFyY2F0ZShmYWNlSW5mbzogYW55LCBmaWxlOiBhbnkpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IGxheWVyOiBhbnk7IGluZGV4OiBzdHJpbmcsICRkZXN0cm95OiBGdW5jdGlvbiwgZGF0YTogYW55LCBmaWxlOiBhbnksIGNvbW1hbmRUeXBlOiBzdHJpbmcsIGRldGVjdFR5cGU6IHN0cmluZywgbGF5ZXJJbmRleDogYW55LCBmcm9tRGVtYXJjYXRlRmFjZUN0cmw6IHN0cmluZywgZmxhZzogYm9vbGVhbiB9ID0gc2VsZi4kc2NvcGUuJG5ldygpO1xyXG5cclxuICAgICAgICBzY29wZS5pbmRleCA9IG51bGw7XHJcbiAgICAgICAgc2NvcGUuZGF0YSA9IGZhY2VJbmZvO1xyXG4gICAgICAgIHNjb3BlLmZpbGUgPSBmaWxlO1xyXG4gICAgICAgIHNjb3BlLmNvbW1hbmRUeXBlID0gXCJTZWFyY2hBY2Nlc3NMb2dcIjtcclxuICAgICAgICBzY29wZS5kZXRlY3RUeXBlID0gXCJGYWNlXCI7XHJcbiAgICAgICAgc2NvcGUuZnJvbURlbWFyY2F0ZUZhY2VDdHJsID0gc2VsZi5zZWxlY3RGYWNlQ3RybDtcclxuICAgICAgICBzY29wZS5mbGFnID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHNjb3BlLmxheWVySW5kZXggPSBzZWxmLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBza2luOiAnbm8tc2Nyb2xsJyxcclxuICAgICAgICAgICAgdGl0bGU6IFsn5Lq66IS45qCH5rOoJywgJ2ZvbnQtd2VpZ2h0OiBib2xkO2JhY2tncm91bmQtY29sb3I6ICNGNkY4RkI7Y29sb3I6ICM2MDYwNjA7aGVpZ2h0OiA0MHB4OyddLFxyXG4gICAgICAgICAgICBhcmVhOiBbJzY1MHB4JywgJzU1NXB4J10sXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGRlbWFyY2F0ZVBvcHVwSHRtbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmn6XnnIvlhajlm75cclxuICAgIHB1YmxpYyBmdWxsU2NyZWVuKGV2ZW50OiBhbnksIHBhdGg6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IGxheWVyOiBhbnk7IGluZGV4OiBzdHJpbmcsIHBhdGg6IGFueSwgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUuaW5kZXggPSBcImZ1bGxTY3JlZW5Qb3B1cFwiO1xyXG4gICAgICAgIHNjb3BlLnBhdGggPSBwYXRoO1xyXG4gICAgICAgIGlmIChwYXRoKSB7XHJcbiAgICAgICAgICAgIGxldCB3aW5kb3dXOiBhbnkgPSAkKHdpbmRvdykud2lkdGgoKSAqIDAuODtcclxuICAgICAgICAgICAgbGV0IHdpbmRvd0g6IGFueSA9ICQod2luZG93KS5oZWlnaHQoKSAqIDAuODtcclxuICAgICAgICAgICAgbGV0IGNvbnRlbnRIVE1MID0gYDxpbWcgbmctc3JjPSR7cGF0aH0gc3R5bGU9J3dpZHRoOiR7d2luZG93V31weDtoZWlnaHQ6JHt3aW5kb3dIfXB4Oyc+YDtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjbG9zZUJ0bjogMCxcclxuICAgICAgICAgICAgICAgIHNraW46ICdsYXl1aS1sYXllci1ub2JnIG5vLXNjcm9sbCcsXHJcbiAgICAgICAgICAgICAgICBzaGFkZUNsb3NlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2hhZGU6IDAuNixcclxuICAgICAgICAgICAgICAgIGFyZWE6IFt3aW5kb3dXICsgJ3B4Jywgd2luZG93SCArICdweCddLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogY29udGVudEhUTUwsXHJcbiAgICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLm1zZyhcIuWbvueJh+WcsOWdgOS4jeWtmOWcqFwiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDluIPmjqfkuI7lj5bmtojluIPmjqdcclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIGNsaWNrU3VydmVpbGxhbmNlKGV2ZW50OiBhbnksIGl0ZW06IGFueSkge1xyXG4gICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaXRlbS5zdXJ2ZWlsbGFuY2VTdGF0dXMgPSAhaXRlbS5zdXJ2ZWlsbGFuY2VTdGF0dXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5YiG5p6QXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICovXHJcbiAgICBjbGlja0FuYWx5c2lzKGV2ZW50OmFueSwgaXRlbTphbnksIHR5cGU6c3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc3RvcmFnZVBhcmFtczogQW5hbHlzaXNTdG9yYWdlUGFyYW1zID0gQW5hbHlzaXNEYXRhVHlwZS5GYWNlTGlicmFyeTtcclxuICAgICAgICBzdG9yYWdlUGFyYW1zLmRhdGEgPSBpdGVtO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlU3RvcmFnZS5zZXRTZXNzaW9uU3RvcmFnZURhdGEoc3RvcmFnZVBhcmFtcy5rZXksIHN0b3JhZ2VQYXJhbXMpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiQW5hbHlzaXNUeXBlXCIsIFwiRmFjZVwiKTtcclxuICAgICAgICBpZiAodHlwZSA9PT0gQW5hbHlzaXNHb1RvVHlwZS5UcmFjay5rZXkpIHtcclxuICAgICAgICAgICAgd2luZG93Lm9wZW4oQW5hbHlzaXNHb1RvVHlwZS5UcmFjay5kYXRhKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IEFuYWx5c2lzR29Ub1R5cGUuQWNjb21wYW55aW5nLmtleSkge1xyXG4gICAgICAgICAgICB3aW5kb3cub3BlbihBbmFseXNpc0dvVG9UeXBlLkFjY29tcGFueWluZy5kYXRhKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IEFuYWx5c2lzR29Ub1R5cGUuRnJlcXVlbmN5LmtleSkge1xyXG4gICAgICAgICAgICB3aW5kb3cub3BlbihBbmFseXNpc0dvVG9UeXBlLkZyZXF1ZW5jeS5kYXRhKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IEFuYWx5c2lzR29Ub1R5cGUuTW9yZS5rZXkpIHtcclxuICAgICAgICAgICAgd2luZG93Lm9wZW4oQW5hbHlzaXNHb1RvVHlwZS5Nb3JlLmRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ0ZhY2VBbmFseXNpc0NvbnRyb2xsZXInLCBGYWNlQW5hbHlzaXNDb250cm9sbGVyKTsiXX0=
