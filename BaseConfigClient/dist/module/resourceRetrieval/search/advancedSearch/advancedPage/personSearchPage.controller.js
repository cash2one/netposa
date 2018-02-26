define(["require", "exports", "text!../../../../detailPopup/personPopup/personPopup.html", "text!../../../../common/faceHandlePopup/selectFace.popup.html", "text!../../../../common/faceHandlePopup/demarcate.popup.html", "text!../../../../selectPopup/treeCamera/Tree.camera.popup.html", "../../../../common/app/main.app", "../adVanceSearchEnum", "../../../resourceRetrievalEnum", "../../../../../core/server/enum/AnalysisDataType", "../../../../../core/server/enum/SocketResultTypeEnum", "../../../../common/factory/attribute.factory", "../../../../../core/enum/ObjectType", "../../../../../core/server/enum/CollectDataType", "lodash", "../../../../selectPopup/treeCamera/Tree.camera.popup", "../../../../common/services/resourceRetrieval.service", "../../../../common/factory/socket.factory", "../../../../common/factory/deviceCache.factory", "../../../../common/factory/userinfo.cache.factory", "../../../../common/factory/layerMsg.factory", "../../../../common/factory/systemInfo.cache.factory", "../../../../common/factory/HandleStorage.factory", "../../../../common/services/uploadImage.service"], function (require, exports, personPopupHtml, selectFacePopupHtml, demarcatePopupHtml, cameraTreePopupHtml, main_app_1, adVanceSearchEnum_1, resourceRetrievalEnum_1, AnalysisDataType_1, SocketResultTypeEnum_1, attribute_factory_1, ObjectType_1, CollectDataType_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PersonSearchPageController = (function () {
        function PersonSearchPageController($scope, $timeout, layer, resourceRetrievalService, socketFactory, deviceCacheServer, userInfoCacheFactory, layerDec, systemInfoCacheFactory, $filter, handleStorage, $state, uploadImageService) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.layer = layer;
            this.resourceRetrievalService = resourceRetrievalService;
            this.socketFactory = socketFactory;
            this.deviceCacheServer = deviceCacheServer;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.layerDec = layerDec;
            this.systemInfoCacheFactory = systemInfoCacheFactory;
            this.$filter = $filter;
            this.handleStorage = handleStorage;
            this.$state = $state;
            this.uploadImageService = uploadImageService;
            this.minSacle = 1;
            this.maxSacle = 100;
            this.selectTimeAcitve = 3;
            this.showMore = false;
            this.faceResult = resourceRetrievalEnum_1.initFaceResult(0);
            this.faceImgList = [];
            this.attributeFactory = new attribute_factory_1.AttributeFactory();
            this.fromSelectFaceCtrl = "get-face-info-advance";
            this.selectDeviceCb = "close.camera.popup";
            this.uploadIndex = 0;
            this.queryStatus = 1;
            this.analysisGoTo = AnalysisDataType_1.AnalysisGoToType;
            var self = this;
            self.initParams();
            self.$scope.$on("search-device-id", function (event, data, dataType) {
                if (dataType === ObjectType_1.ObjectType.Camera.value) {
                    var arrCameraId = angular.copy(self.searchParams.arrCameraId);
                    arrCameraId = _.concat(data, arrCameraId);
                    arrCameraId = _.uniq(arrCameraId);
                    self.searchParams.arrCameraId = arrCameraId;
                }
            });
            self.$scope.$on(self.selectDeviceCb, function (event, cameraIds, status) {
                if (status) {
                    if (Array.isArray(cameraIds)) {
                        self.$timeout(function () {
                            self.searchParams.arrCameraId = cameraIds;
                        });
                    }
                }
                self.layer.close(self.currentLayerIndex);
            });
            self.$scope.$on(self.fromSelectFaceCtrl, function (event, data) {
                var item = {
                    id: 0,
                    value: data.data.imageurl,
                    key: data.data.key,
                    fetureTaskParam: {
                        arrFetureTaskId: data.data.imageurl,
                        imageUrl: data.data.key
                    }
                };
                self.faceImgList[self.uploadIndex] = item;
            });
            self.$scope.$on("advancedSearch-change", function (event, data) {
                if ((data === "person") || (data === "all")) {
                    self.initParams();
                }
            });
            self.$scope.$on("$destroy", function () {
                self.layer.close(self.currentLayerIndex);
                self.cancelMonitorSocket();
            });
        }
        PersonSearchPageController.prototype.monitorSocket = function () {
            var self = this;
            self.socketFactory.subscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.FaceSearch, function (result) {
                if (result[0].code === 200) {
                    self.socketData = result[0].data.Face;
                    self.$timeout(function () {
                        self.dealSocketData();
                    });
                }
                else {
                    self.$timeout(function () {
                        self.queryStatus = 3;
                    });
                }
                self.cancelMonitorSocket();
            });
        };
        PersonSearchPageController.prototype.cancelMonitorSocket = function () {
            var self = this;
            self.socketFactory.unSubscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.FaceSearch);
        };
        PersonSearchPageController.prototype.initParams = function () {
            var self = this;
            var systemData = self.systemInfoCacheFactory.getSystemInfo();
            self.faceImgList = [
                {
                    id: 0,
                    value: "",
                    key: ""
                }, {
                    id: 1,
                    value: "",
                    key: ""
                }, {
                    id: 2,
                    value: "",
                    key: ""
                }, {
                    id: 3,
                    value: "",
                    key: ""
                }, {
                    id: 4,
                    value: "",
                    key: ""
                }
            ];
            self.sexList = adVanceSearchEnum_1.SexList();
            self.crossTrainTimeList = adVanceSearchEnum_1.CrossTrainTimeList();
            self.patternList = adVanceSearchEnum_1.PatternList();
            self.equipmentList = adVanceSearchEnum_1.EquipmentList();
            self.ageList = adVanceSearchEnum_1.AgeList();
            self.clothesList = adVanceSearchEnum_1.ClothesList();
            self.hairList = adVanceSearchEnum_1.HairList();
            self.shoeList = adVanceSearchEnum_1.ShoeList();
            self.glassesList = adVanceSearchEnum_1.GlassesList();
            self.maskList = adVanceSearchEnum_1.MaskList();
            self.capList = adVanceSearchEnum_1.CapList();
            self.selectTimeAcitve = 3;
            self.faceResult.pageParams.pageSize = 16;
            self.searchParams = {
                currentPage: 1,
                pageSize: 16,
                keyWord: "",
                userId: self.userInfoCacheFactory.getCurrentUserId(),
                orderBy: {
                    isAsc: false
                },
                threshold: systemData.IdentityValue || 75,
                imagePath: "",
                arrCameraId: []
            };
            self.queryStatus = 1;
            var time = self.attributeFactory.getCrossTrainTime(self.selectTimeAcitve);
            self.searchParams.startTime = time.startTime;
            self.searchParams.endTime = time.endTime;
            self.$scope.$on('$destroy', function () {
                self.layer.close();
            });
            self.cameraListInfo = self.deviceCacheServer.getAllCameraList();
        };
        PersonSearchPageController.prototype.dealSocketData = function () {
            var self = this;
            var faceResultData = [];
            var min = self.faceResult.pageParams.pageSize * (self.faceResult.pageParams.currentPage - 1);
            var max = self.faceResult.pageParams.pageSize * self.faceResult.pageParams.currentPage;
            var deviceInfo;
            var newData = {
                Result: [],
                TotalCount: self.socketData.TotalCount,
                TaskId: self.socketData.TaskId
            };
            for (var i = min; i < max && i < self.socketData.TotalCount; i++) {
                newData.Result.push(self.socketData.Result[i]);
            }
            self.disposeCommonData(self.socketData, newData);
        };
        PersonSearchPageController.prototype.searchAdvancedSubmit = function () {
            var self = this;
            self.searchParams.currentPage = 1;
            self.searchParams.pageSize = self.faceResult.pageParams.pageSize;
            self.searchParams.isFirstSearch = true;
            self.searchParams.taskId = "";
            self.searchParams.imagePath = "";
            self.faceResult.pageParams.currentPage = 1;
            var featureSearchExt = [];
            var fetureTaskParam = [];
            _.forEach(self.faceImgList, function (value, key) {
                if (value.featureSearchExt) {
                    self.searchParams.imagePath = "Face";
                    featureSearchExt.push(value.featureSearchExt);
                }
                else if (value.fetureTaskParam) {
                    self.searchParams.imagePath = "Face";
                    fetureTaskParam.push(value.fetureTaskParam);
                }
            });
            if (self.searchParams.imagePath === "Face") {
                if ((self.searchParams.featureSearchExt === featureSearchExt) && (self.searchParams.fetureTaskParam === fetureTaskParam)) {
                    self.searchParams.isFirstSearch = false;
                    self.searchParams.taskId = self.faceResult.taskId;
                }
                else {
                    self.searchParams.featureSearchExt = featureSearchExt;
                    self.searchParams.fetureTaskParam = fetureTaskParam;
                }
            }
            else {
                self.searchParams.featureSearchExt = featureSearchExt;
                self.searchParams.fetureTaskParam = fetureTaskParam;
            }
            var searchParams = {};
            searchParams = angular.copy(self.searchParams);
            if (self.searchParams.arrCameraId.length === 0) {
                var systemPointList = self.$scope.$parent.$parent.$parent.$parent.$parent.systemPoint;
                var deviceIds_1 = [];
                _(systemPointList).forEach(function (value) {
                    if (ObjectType_1.ObjectType.Camera.value === value.ObjectType) {
                        deviceIds_1.push(value.ObjectID);
                    }
                });
                searchParams.arrCameraId = deviceIds_1;
            }
            self.getServerMessage(searchParams);
        };
        PersonSearchPageController.prototype.changePage = function (num) {
            var self = this;
            self.searchParams.currentPage = num;
            self.searchParams.taskId = self.faceResult.taskId;
            self.faceResult.pageParams.currentPage = num;
            if (self.searchParams.imagePath === "") {
                self.getServerMessage(self.searchParams);
            }
            else {
                self.dealSocketData();
            }
            return self.faceResult.pageParams;
        };
        ;
        PersonSearchPageController.prototype.getServerMessage = function (searchParams) {
            var self = this;
            if (searchParams.imagePath === "Face") {
                searchParams.keyWord = "";
            }
            else if (searchParams.keyWord === "") {
                return self.layerDec.warnInfo('请输入关键词');
            }
            if (self.selectTimeAcitve !== 4) {
                var time = self.attributeFactory.getCrossTrainTime(self.selectTimeAcitve);
                searchParams.startTime = time.startTime;
                searchParams.endTime = time.endTime;
            }
            self.queryStatus = 2;
            self.cancelMonitorSocket();
            self.resourceRetrievalService.advancedSearchByFace(searchParams).then(function (res) {
                self.searchParams.isFirstSearch = false;
                if (searchParams.imagePath !== "Face") {
                    if ((res.code === 200) && (typeof res.data !== 'undefined') && (res.data.Face.TotalCount > 0)) {
                        self.disposeCommonData(self.faceResult, res.data.Face);
                    }
                    else {
                        self.faceResult.pageParams.totalCount = 0;
                        self.faceResult.pageParams.pageCount = 0;
                        self.faceResult.data = [];
                        self.faceResult.taskId = null;
                    }
                    self.queryStatus = 3;
                }
                else {
                    self.monitorSocket();
                }
            });
        };
        PersonSearchPageController.prototype.disposeCommonData = function (resultData, data) {
            var self = this;
            var params = {
                deviceIds: [],
                deviceType: '',
                ids: [],
                userId: self.userInfoCacheFactory.getCurrentUserId()
            };
            params.deviceType = ObjectType_1.ObjectType.Camera.value;
            _.forEach(data.Result, function (value) {
                params.deviceIds.push(value.AccessLog.CameraID);
                params.ids.push(value.AccessLog.ID);
            });
            self.resourceRetrievalService.getDeviceInfoPromise(params).then(function (res) {
                _.forEach(data.Result, function (item, index) {
                    item.deviceInfo = res.data.deviceInfo[index];
                    item.collectStatus = res.data.collectStatus[index];
                });
                self.$timeout(function () {
                    self.faceResult.pageParams.totalCount = data.TotalCount;
                    self.faceResult.pageParams.pageCount = Math.ceil(data.TotalCount / self.faceResult.pageParams.pageSize);
                    self.faceResult.data = data.Result;
                    self.faceResult.taskId = data.TaskId;
                    self.queryStatus = 3;
                });
            });
        };
        PersonSearchPageController.prototype.selectSex = function (item) {
            var self = this;
            self.searchParams.arrGender = [];
            if (item.val !== "all") {
                self.searchParams.arrGender.push(item.val);
            }
            self.sexList.forEach(function (value, index, array) {
                if (value.val === item.val) {
                    value.status = true;
                }
                else {
                    value.status = false;
                }
            });
        };
        ;
        PersonSearchPageController.prototype.selectTime = function (item) {
            var self = this;
            var time;
            if (item.val === 1) {
                time = self.attributeFactory.getCrossTrainTime(1);
                self.searchParams.startTime = time.startTime;
                self.searchParams.endTime = time.endTime;
            }
            else if (item.val === 2) {
                time = self.attributeFactory.getCrossTrainTime(2);
                self.searchParams.startTime = time.startTime;
                self.searchParams.endTime = time.endTime;
            }
            else if ((item.val === 3) || (item.val === "all")) {
                time = self.attributeFactory.getCrossTrainTime(3);
                self.searchParams.startTime = time.startTime;
                self.searchParams.endTime = time.endTime;
            }
            self.selectTimeAcitve = item.val;
            self.crossTrainTimeList.forEach(function (value, index, array) {
                if (value.val === item.val) {
                    value.status = true;
                }
                else {
                    value.status = false;
                }
            });
        };
        ;
        PersonSearchPageController.prototype.selectPattern = function (item) {
            var self = this;
            self.searchParams.arrType = [];
            if (item.val !== "all") {
                self.searchParams.arrType.push(item.val);
            }
            self.patternList.forEach(function (value, index, array) {
                if (value.val === item.val) {
                    value.status = true;
                }
                else {
                    value.status = false;
                }
            });
        };
        ;
        PersonSearchPageController.prototype.selectEquipment = function (item) {
            var self = this;
            self.searchParams.arrCarryThings = [];
            if (item.val !== "all") {
                self.searchParams.arrCarryThings.push(item.val);
            }
            self.equipmentList.forEach(function (value, index, array) {
                if (value.val === item.val) {
                    value.status = true;
                }
                else {
                    value.status = false;
                }
            });
        };
        ;
        PersonSearchPageController.prototype.selectAge = function (item) {
            var self = this;
            if (item.val === 0) {
                self.searchParams.minAge = null;
                self.searchParams.maxAge = null;
            }
            else if (item.val === 1) {
                self.searchParams.minAge = 1;
                self.searchParams.maxAge = 20;
            }
            else if (item.val === 2) {
                self.searchParams.minAge = 21;
                self.searchParams.maxAge = 40;
            }
            else if (item.val === 3) {
                self.searchParams.minAge = 41;
                self.searchParams.maxAge = 60;
            }
            else if (item.val === 3) {
                self.searchParams.minAge = 60;
                self.searchParams.maxAge = null;
            }
            self.ageList.forEach(function (value, index, array) {
                if (value.val === item.val) {
                    value.status = true;
                }
                else {
                    value.status = false;
                }
            });
        };
        ;
        PersonSearchPageController.prototype.selectClothes = function (item) {
            var self = this;
            self.clothesList.forEach(function (value, index, array) {
                if (value.val === item.val) {
                    value.status = true;
                }
                else {
                    value.status = false;
                }
            });
        };
        ;
        PersonSearchPageController.prototype.selectShoe = function (item) {
            var self = this;
            self.searchParams.arrShoes = [];
            if (item.val !== "all") {
                self.searchParams.arrShoes.push(item.val);
            }
            self.shoeList.forEach(function (value, index, array) {
                if (value.val === item.val) {
                    value.status = true;
                }
                else {
                    value.status = false;
                }
            });
        };
        ;
        PersonSearchPageController.prototype.selectGlasses = function (item) {
            var self = this;
            self.searchParams.arrEyeGlasses = [];
            if (item.val !== "all") {
                self.searchParams.arrEyeGlasses.push(item.val);
            }
            self.glassesList.forEach(function (value, index, array) {
                if (value.val === item.val) {
                    value.status = true;
                }
                else {
                    value.status = false;
                }
            });
        };
        ;
        PersonSearchPageController.prototype.selectMask = function (item) {
            var self = this;
            self.searchParams.arrMask = [];
            if (item.val !== "all") {
                self.searchParams.arrMask.push(item.val);
            }
            self.maskList.forEach(function (value, index, array) {
                if (value.val === item.val) {
                    value.status = true;
                }
                else {
                    value.status = false;
                }
            });
        };
        ;
        PersonSearchPageController.prototype.selectCap = function (item) {
            var self = this;
            self.searchParams.arrHat = [];
            if (item.val !== "all") {
                self.searchParams.arrHat.push(item.val);
            }
            self.capList.forEach(function (value, index, array) {
                if (value.val === item.val) {
                    value.status = true;
                }
                else {
                    value.status = false;
                }
            });
        };
        ;
        PersonSearchPageController.prototype.selectHair = function (item) {
            var self = this;
            self.searchParams.arrHairType = [];
            if (item.val !== "all") {
                self.searchParams.arrHairType.push(item.val);
            }
            self.hairList.forEach(function (value, index, array) {
                if (value.val === item.val) {
                    value.status = true;
                }
                else {
                    value.status = false;
                }
            });
        };
        ;
        PersonSearchPageController.prototype.clickCollect = function (event, item) {
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
        PersonSearchPageController.prototype.clickAnalysis = function (event, item, type) {
            if (event) {
                event.stopPropagation();
            }
            var storageParams = AnalysisDataType_1.AnalysisDataType.Face;
            storageParams.data = item;
            this.handleStorage.setSessionStorageData(storageParams.key, storageParams);
            localStorage.setItem("AnalysisType", "Face");
            if (type = AnalysisDataType_1.AnalysisGoToType.Track.key) {
                window.open(AnalysisDataType_1.AnalysisGoToType.Track.data);
            }
            else if (type = AnalysisDataType_1.AnalysisGoToType.Accompanying.key) {
                window.open(AnalysisDataType_1.AnalysisGoToType.Accompanying.data);
            }
            else if (type = AnalysisDataType_1.AnalysisGoToType.Frequency.key) {
                window.open(AnalysisDataType_1.AnalysisGoToType.Frequency.data);
            }
            else if (type = AnalysisDataType_1.AnalysisGoToType.More.key) {
                window.open(AnalysisDataType_1.AnalysisGoToType.More.data);
            }
        };
        PersonSearchPageController.prototype.clickSurveillance = function (event, item) {
            if (event) {
                event.stopPropagation();
            }
            item.surveillanceStatus = !item.surveillanceStatus;
        };
        PersonSearchPageController.prototype.imgUploading = function (event, item, index) {
            var self = this;
            self.searchParams.keyWord = "";
            self.uploadIndex = index;
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
                    var obj_1 = {
                        id: 0,
                        value: res.data.imageurl,
                        key: res.data.key,
                        fetureTaskParam: {
                            arrFetureTaskId: res.data.key,
                            imageUrl: res.data.imageurl
                        }
                    };
                    self.$timeout(function () {
                        self.faceImgList[index] = obj_1;
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
        PersonSearchPageController.prototype.imgCancel = function (index) {
            var self = this;
            var item = {
                id: 0,
                value: "",
                key: "",
                fetureTaskParam: null,
                featureSearchExt: null
            };
            self.faceImgList[index] = item;
        };
        PersonSearchPageController.prototype.detailPopup = function (rank, allList) {
            var self = this;
            var scope = self.$scope.$new();
            scope.rank = rank;
            scope.allList = allList;
            scope.collectFunction = function (item) {
                self.clickCollect(null, item);
            };
            scope.analysisFunction = function (item, type) {
                self.clickAnalysis(null, item, type);
            };
            scope.surveillanceFunction = function (item) {
                self.clickSurveillance(null, item);
            };
            scope.closePopup = function () {
                self.layer.close(self.currentLayerIndex);
            };
            self.currentLayerIndex = self.layer.open({
                type: 1,
                skin: 'detail-popup-box',
                title: false,
                area: ['600px', '440px'],
                content: personPopupHtml,
                scope: scope,
                end: function () {
                    scope.$destroy();
                }
            });
        };
        PersonSearchPageController.prototype.multiUserSelect = function (faceInfo, file) {
            var self = this;
            var scope = self.$scope.$new();
            scope.index = null;
            scope.data = faceInfo;
            scope.file = file;
            scope.commandType = "SearchAccessLog";
            scope.detectType = "Face";
            scope.fromSelectFaceCtrl = self.fromSelectFaceCtrl;
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
        PersonSearchPageController.prototype.faceDemarcate = function (faceInfo, file) {
            var self = this;
            var scope = self.$scope.$new();
            scope.index = null;
            scope.data = faceInfo;
            scope.file = file;
            scope.commandType = "SearchAccessLog";
            scope.detectType = "Face";
            scope.fromDemarcateFaceCtrl = self.fromSelectFaceCtrl;
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
        PersonSearchPageController.prototype.selectCamera = function () {
            var self = this;
            var scope = self.$scope.$new();
            scope.selectCameraList = self.searchParams.arrCameraId;
            scope.selectCtrlCb = self.selectDeviceCb;
            self.currentLayerIndex = self.layer.open({
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
        PersonSearchPageController.prototype.onDropComplete = function (dragData, evt, index) {
            var self = this;
            var item = {
                id: 0,
                value: "",
                key: ""
            };
            item.featureSearchExt = {
                accessLogId: dragData.AccessLog.ID,
                featureType: "AccessFeature",
                imgUrl: dragData.AccessLog.FacePath
            };
            item.value = dragData.AccessLog.FacePath;
            item.key = dragData.AccessLog.ID;
            self.faceImgList[index] = item;
        };
        PersonSearchPageController.prototype.selectDevice = function (type) {
            this.$scope.$emit("search-device-type", type);
            this.$scope.$emit("search-pattern", "advanced");
        };
        PersonSearchPageController.$inject = ["$scope", "$timeout", "layer", "resourceRetrievalService", "socketFactory", "deviceCacheServer", "userInfoCacheFactory", "layerDec", 'systemInfoCacheFactory', "$filter", "handleStorage", "$state", 'uploadImageService'];
        return PersonSearchPageController;
    }());
    main_app_1.app.controller('PersonSearchPageController', PersonSearchPageController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvc2VhcmNoL2FkdmFuY2VkU2VhcmNoL2FkdmFuY2VkUGFnZS9wZXJzb25TZWFyY2hQYWdlLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBa0VBO1FBaUNJLG9DQUFvQixNQUFXLEVBQ1gsUUFBYSxFQUNiLEtBQVUsRUFDVix3QkFBbUQsRUFDbkQsYUFBNkIsRUFDN0IsaUJBQXVDLEVBQ3ZDLG9CQUEyQyxFQUMzQyxRQUFtQixFQUNuQixzQkFBZ0QsRUFDaEQsT0FBVyxFQUNYLGFBQTZCLEVBQzdCLE1BQVcsRUFDWCxrQkFBdUM7WUFadkMsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLGFBQVEsR0FBUixRQUFRLENBQUs7WUFDYixVQUFLLEdBQUwsS0FBSyxDQUFLO1lBQ1YsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEyQjtZQUNuRCxrQkFBYSxHQUFiLGFBQWEsQ0FBZ0I7WUFDN0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFzQjtZQUN2Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXVCO1lBQzNDLGFBQVEsR0FBUixRQUFRLENBQVc7WUFDbkIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUEwQjtZQUNoRCxZQUFPLEdBQVAsT0FBTyxDQUFJO1lBQ1gsa0JBQWEsR0FBYixhQUFhLENBQWdCO1lBQzdCLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDWCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXFCO1lBM0MzRCxhQUFRLEdBQVcsQ0FBQyxDQUFDO1lBQ3JCLGFBQVEsR0FBVyxHQUFHLENBQUM7WUFDdkIscUJBQWdCLEdBQVcsQ0FBQyxDQUFDO1lBQzdCLGFBQVEsR0FBWSxLQUFLLENBQUM7WUFFMUIsZUFBVSxHQUFhLHNDQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFekMsZ0JBQVcsR0FBcUIsRUFBRSxDQUFDO1lBYW5DLHFCQUFnQixHQUFxQixJQUFJLG9DQUFnQixFQUFFLENBQUM7WUFL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R0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLGVBQWUsRUFBRSxtQkFBbUIsRUFBRSxzQkFBc0IsRUFBRSxVQUFVLEVBQUUsd0JBQXdCLEVBQUMsU0FBUyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQXcyQmhQLGlDQUFDO0tBejJCRCxBQXkyQkMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsNEJBQTRCLEVBQUUsMEJBQTBCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvc2VhcmNoL2FkdmFuY2VkU2VhcmNoL2FkdmFuY2VkUGFnZS9wZXJzb25TZWFyY2hQYWdlLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uLy4uLy4uLy4uL2RldGFpbFBvcHVwL3BlcnNvblBvcHVwL3BlcnNvblBvcHVwLmh0bWxcIiBuYW1lPVwicGVyc29uUG9wdXBIdG1sXCIgLz5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi8uLi8uLi8uLi9jb21tb24vZmFjZUhhbmRsZVBvcHVwL3NlbGVjdEZhY2UucG9wdXAuaHRtbFwiIG5hbWU9XCJzZWxlY3RGYWNlUG9wdXBIdG1sXCIgLz5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi8uLi8uLi8uLi9jb21tb24vZmFjZUhhbmRsZVBvcHVwL2RlbWFyY2F0ZS5wb3B1cC5odG1sXCIgbmFtZT1cImRlbWFyY2F0ZVBvcHVwSHRtbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vLi4vLi4vLi4vc2VsZWN0UG9wdXAvdHJlZUNhbWVyYS9UcmVlLmNhbWVyYS5wb3B1cC5odG1sXCIgbmFtZT1cImNhbWVyYVRyZWVQb3B1cEh0bWxcIiAvPlxyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuXHJcbi8vIOW8ueahhlxyXG5pbXBvcnQgJy4uLy4uLy4uLy4uL3NlbGVjdFBvcHVwL3RyZWVDYW1lcmEvVHJlZS5jYW1lcmEucG9wdXAnO1xyXG5cclxuLy8g6auY57qn5qOA57Si5Y+C5pWwXHJcbmltcG9ydCB7XHJcbiAgICBGYWNlU2VhcmNoUGFyYW1zLFxyXG4gICAgbXVsdGlwbGVDaG9pY2UsXHJcbiAgICBTZXhMaXN0LFxyXG4gICAgQ3Jvc3NUcmFpblRpbWVMaXN0LFxyXG4gICAgUGF0dGVybkxpc3QsXHJcbiAgICBFcXVpcG1lbnRMaXN0LFxyXG4gICAgQWdlTGlzdCxcclxuICAgIENsb3RoZXNMaXN0LFxyXG4gICAgSGFpckxpc3QsXHJcbiAgICBTaG9lTGlzdCxcclxuICAgIEdsYXNzZXNMaXN0LFxyXG4gICAgTWFza0xpc3QsXHJcbiAgICBDYXBMaXN0XHJcbn0gZnJvbSAnLi4vYWRWYW5jZVNlYXJjaEVudW0nO1xyXG5pbXBvcnQge1xyXG4gICAgZmFjZSxcclxuICAgIGZhY2VJdGVtLFxyXG4gICAgaW5pdEZhY2VSZXN1bHQsXHJcbiAgICBRdWVyeUl0ZW0sXHJcbiAgICBDb2xsZWN0QWRkUGFyYW1zLFxyXG4gICAgQ29sbGVjdERlbGV0ZVBhcmFtc1xyXG59IGZyb20gJy4uLy4uLy4uL3Jlc291cmNlUmV0cmlldmFsRW51bSc7XHJcbmltcG9ydCB7QW5hbHlzaXNEYXRhVHlwZSwgQW5hbHlzaXNTdG9yYWdlUGFyYW1zLCBBbmFseXNpc0dvVG9UeXBlfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vY29yZS9zZXJ2ZXIvZW51bS9BbmFseXNpc0RhdGFUeXBlXCI7XHJcblxyXG4vLyDmnI3liqFcclxuaW1wb3J0ICcuLi8uLi8uLi8uLi9jb21tb24vc2VydmljZXMvcmVzb3VyY2VSZXRyaWV2YWwuc2VydmljZSc7XHJcbmltcG9ydCB7SVJlc291cmNlUmV0cmlldmFsU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL3Jlc291cmNlUmV0cmlldmFsLnNlcnZpY2UnO1xyXG5pbXBvcnQge1Jlc3BvbnNlUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCBcIi4uLy4uLy4uLy4uL2NvbW1vbi9mYWN0b3J5L3NvY2tldC5mYWN0b3J5XCI7XHJcbmltcG9ydCB7SVNvY2tldEZhY3Rvcnl9IGZyb20gXCIuLi8uLi8uLi8uLi9jb21tb24vZmFjdG9yeS9zb2NrZXQuZmFjdG9yeVwiO1xyXG5pbXBvcnQge1NvY2tldFJlc3VsdFR5cGVFbnVtfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vY29yZS9zZXJ2ZXIvZW51bS9Tb2NrZXRSZXN1bHRUeXBlRW51bVwiO1xyXG5pbXBvcnQgXCIuLi8uLi8uLi8uLi9jb21tb24vZmFjdG9yeS9kZXZpY2VDYWNoZS5mYWN0b3J5XCI7XHJcbmltcG9ydCB7SWRldmljZUNhYWNoZVNlcnZpY2V9IGZyb20gXCIuLi8uLi8uLi8uLi9jb21tb24vZmFjdG9yeS9kZXZpY2VDYWNoZS5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uLy4uLy4uLy4uL2NvbW1vbi9mYWN0b3J5L3VzZXJpbmZvLmNhY2hlLmZhY3RvcnlcIjtcclxuaW1wb3J0IHtJVXNlckluZm9DYWNoZUZhY3Rvcnl9IGZyb20gXCIuLi8uLi8uLi8uLi9jb21tb24vZmFjdG9yeS91c2VyaW5mby5jYWNoZS5mYWN0b3J5XCI7XHJcbmltcG9ydCB7SUxheWVyRGVjfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29tbW9uL2ZhY3RvcnkvbGF5ZXJNc2cuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCIuLi8uLi8uLi8uLi9jb21tb24vZmFjdG9yeS9sYXllck1zZy5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uLy4uLy4uLy4uL2NvbW1vbi9mYWN0b3J5L3N5c3RlbUluZm8uY2FjaGUuZmFjdG9yeVwiO1xyXG5pbXBvcnQge0lTeXN0ZW1JbmZvQ2FjaGVQcm92aWRlcn0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbW1vbi9mYWN0b3J5L3N5c3RlbUluZm8uY2FjaGUuZmFjdG9yeVwiO1xyXG5pbXBvcnQge1N5c3RlbUNvbmZpZ1BhcmFtc30gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2NvcmUvZW50aXR5L1N5c3RlbUNvbmZpZ1BhcmFtc1wiO1xyXG5pbXBvcnQgJy4uLy4uLy4uLy4uL2NvbW1vbi9mYWN0b3J5L0hhbmRsZVN0b3JhZ2UuZmFjdG9yeSc7XHJcbmltcG9ydCB7SUhhbmRsZVN0b3JhZ2V9IGZyb20gJy4uLy4uLy4uLy4uL2NvbW1vbi9mYWN0b3J5L0hhbmRsZVN0b3JhZ2UuZmFjdG9yeSc7XHJcbmltcG9ydCBcIi4uLy4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy91cGxvYWRJbWFnZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SVVwbG9hZEltYWdlU2VydmljZX0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy91cGxvYWRJbWFnZS5zZXJ2aWNlXCI7XHJcblxyXG4vLyDlhaznlKjmlrnms5VcclxuaW1wb3J0IHtBdHRyaWJ1dGVGYWN0b3J5fSBmcm9tIFwiLi4vLi4vLi4vLi4vY29tbW9uL2ZhY3RvcnkvYXR0cmlidXRlLmZhY3RvcnlcIjtcclxuaW1wb3J0IHtPYmplY3RUeXBlfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9jb3JlL2VudW0vT2JqZWN0VHlwZSc7XHJcbmltcG9ydCB7U3lzdGVtUG9pbnR9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi9jb3JlL2VudGl0eS9TeXN0ZW1Qb2ludFwiO1xyXG5pbXBvcnQge0NvbGxlY3REYXRhVHlwZX0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vQ29sbGVjdERhdGFUeXBlXCI7XHJcbmltcG9ydCB7UmVzb3VyY2VUeXBlRW51bX0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vUmVzb3VyY2VUeXBlXCI7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xyXG5cclxuZGVjbGFyZSBsZXQgcGVyc29uUG9wdXBIdG1sOiBhbnksIGFuZ3VsYXI6IGFueSwgc2VsZWN0RmFjZVBvcHVwSHRtbDogYW55LCBkZW1hcmNhdGVQb3B1cEh0bWw6IGFueSwgY2FtZXJhVHJlZVBvcHVwSHRtbDogYW55O1xyXG5cclxuY2xhc3MgUGVyc29uU2VhcmNoUGFnZUNvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbXCIkc2NvcGVcIiwgXCIkdGltZW91dFwiLCBcImxheWVyXCIsIFwicmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlXCIsIFwic29ja2V0RmFjdG9yeVwiLCBcImRldmljZUNhY2hlU2VydmVyXCIsIFwidXNlckluZm9DYWNoZUZhY3RvcnlcIiwgXCJsYXllckRlY1wiLCAnc3lzdGVtSW5mb0NhY2hlRmFjdG9yeScsXCIkZmlsdGVyXCIsIFwiaGFuZGxlU3RvcmFnZVwiLCBcIiRzdGF0ZVwiLCAndXBsb2FkSW1hZ2VTZXJ2aWNlJ107XHJcbiAgICBtaW5TYWNsZTogbnVtYmVyID0gMTtcclxuICAgIG1heFNhY2xlOiBudW1iZXIgPSAxMDA7IC8vICDnm7jkvLzluqbmnIDlpKflgLxcclxuICAgIHNlbGVjdFRpbWVBY2l0dmU6IG51bWJlciA9IDM7Ly/ml7bpl7TmrrXlj4LmlbBcclxuICAgIHNob3dNb3JlOiBib29sZWFuID0gZmFsc2U7Ly/mmK/lkKbmmL7npLrmm7TlpJpcclxuICAgIHNlYXJjaFBhcmFtczogRmFjZVNlYXJjaFBhcmFtczsvLyDmn6Xor6Llj4LmlbBcclxuICAgIGZhY2VSZXN1bHQ6IGZhY2VJdGVtID0gaW5pdEZhY2VSZXN1bHQoMCk7IC8vIOafpeivoue7k+aenFxyXG4gICAgc29ja2V0RGF0YTogYW55O1xyXG4gICAgZmFjZUltZ0xpc3Q6IEFycmF5PFF1ZXJ5SXRlbT4gPSBbXTsvL+S4iuS8oOWbvueJh1xyXG4gICAgc2V4TGlzdDogQXJyYXk8bXVsdGlwbGVDaG9pY2U+Oy8vIOaAp+WIq1xyXG4gICAgY3Jvc3NUcmFpblRpbWVMaXN0OiBBcnJheTxtdWx0aXBsZUNob2ljZT47Ly8gIOaXtumXtOautVxyXG4gICAgcGF0dGVybkxpc3Q6IEFycmF5PG11bHRpcGxlQ2hvaWNlPjsvLyDmqKHlvI9cclxuICAgIGVxdWlwbWVudExpc3Q6IEFycmF5PG11bHRpcGxlQ2hvaWNlPjsvLyDmkLrluKbnialcclxuICAgIGFnZUxpc3Q6IEFycmF5PG11bHRpcGxlQ2hvaWNlPjsvLyDlubTpvoTmrrVcclxuICAgIGNsb3RoZXNMaXN0OiBBcnJheTxtdWx0aXBsZUNob2ljZT47Ly8g6KGj5bi954m55b6BXHJcbiAgICBoYWlyTGlzdDogQXJyYXk8bXVsdGlwbGVDaG9pY2U+Oy8vIOWPkeWei1xyXG4gICAgc2hvZUxpc3Q6IEFycmF5PG11bHRpcGxlQ2hvaWNlPjsvLyDpnovlrZBcclxuICAgIGdsYXNzZXNMaXN0OiBBcnJheTxtdWx0aXBsZUNob2ljZT47Ly8g55y86ZWcXHJcbiAgICBtYXNrTGlzdDogQXJyYXk8bXVsdGlwbGVDaG9pY2U+Oy8vIOWPo+e9qVxyXG4gICAgY2FwTGlzdDogQXJyYXk8bXVsdGlwbGVDaG9pY2U+Oy8vIOW4veWtkFxyXG4gICAgLy8g5YWs55So5pa55rOVXHJcbiAgICBhdHRyaWJ1dGVGYWN0b3J5OiBBdHRyaWJ1dGVGYWN0b3J5ID0gbmV3IEF0dHJpYnV0ZUZhY3RvcnkoKTtcclxuICAgIC8vIOiuvuWkh+mAieaLqeW8ueahhlxyXG4gICAgY3VycmVudExheWVySW5kZXg6IG51bWJlcjtcclxuICAgIC8vIOiuvuWkh+S/oeaBr1xyXG4gICAgY2FtZXJhTGlzdEluZm86IGFueTtcclxuICAgIGZyb21TZWxlY3RGYWNlQ3RybDpzdHJpbmcgPSBcImdldC1mYWNlLWluZm8tYWR2YW5jZVwiO1xyXG4gICAgc2VsZWN0RGV2aWNlQ2I6IHN0cmluZyA9IFwiY2xvc2UuY2FtZXJhLnBvcHVwXCI7XHJcbiAgICB1cGxvYWRJbmRleDogbnVtYmVyID0gMDtcclxuICAgIHF1ZXJ5U3RhdHVzOiBudW1iZXIgPSAxOyAvLyDmn6Xor6LnirbmgIEgIDE6IOWIneWni+eKtuaAgSAy77ya5p+l6K+i5LitICAz77ya5p+l6K+i57uT5p2fXHJcbiAgICBhbmFseXNpc0dvVG8gPSBBbmFseXNpc0dvVG9UeXBlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGxheWVyOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJlc291cmNlUmV0cmlldmFsU2VydmljZTogSVJlc291cmNlUmV0cmlldmFsU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgc29ja2V0RmFjdG9yeTogSVNvY2tldEZhY3RvcnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGRldmljZUNhY2hlU2VydmVyOiBJZGV2aWNlQ2FhY2hlU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgdXNlckluZm9DYWNoZUZhY3Rvcnk6IElVc2VySW5mb0NhY2hlRmFjdG9yeSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbGF5ZXJEZWM6IElMYXllckRlYyxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgc3lzdGVtSW5mb0NhY2hlRmFjdG9yeTogSVN5c3RlbUluZm9DYWNoZVByb3ZpZGVyLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSAkZmlsdGVyOmFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgaGFuZGxlU3RvcmFnZTogSUhhbmRsZVN0b3JhZ2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICRzdGF0ZTogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB1cGxvYWRJbWFnZVNlcnZpY2U6IElVcGxvYWRJbWFnZVNlcnZpY2UpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHNlbGYuaW5pdFBhcmFtcygpO1xyXG4gICAgICAgIC8vIOebkeWQrOW5v+aSreS6i+S7ti0t5qGG6YCJ5Zyw5Zu+6L+U5Zue6K6+5aSHaWRcclxuICAgICAgICBzZWxmLiRzY29wZS4kb24oXCJzZWFyY2gtZGV2aWNlLWlkXCIsIGZ1bmN0aW9uIChldmVudDogYW55LCBkYXRhOiBhbnksIGRhdGFUeXBlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGFUeXBlID09PSBPYmplY3RUeXBlLkNhbWVyYS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFyckNhbWVyYUlkOiBBcnJheTxzdHJpbmc+ID0gYW5ndWxhci5jb3B5KHNlbGYuc2VhcmNoUGFyYW1zLmFyckNhbWVyYUlkKTtcclxuICAgICAgICAgICAgICAgIGFyckNhbWVyYUlkID0gIF8uY29uY2F0KGRhdGEsIGFyckNhbWVyYUlkKTtcclxuICAgICAgICAgICAgICAgIGFyckNhbWVyYUlkID0gXy51bmlxKGFyckNhbWVyYUlkKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLmFyckNhbWVyYUlkID0gYXJyQ2FtZXJhSWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g55uR5ZCs6K6+5aSH6YCJ5oup5qCRXHJcbiAgICAgICAgc2VsZi4kc2NvcGUuJG9uKHNlbGYuc2VsZWN0RGV2aWNlQ2IsIChldmVudDogYW55LCBjYW1lcmFJZHM6IEFycmF5PHN0cmluZz4sIHN0YXR1czpib29sZWFuKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNhbWVyYUlkcykpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZWFyY2hQYXJhbXMuYXJyQ2FtZXJhSWQgPSBjYW1lcmFJZHM7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5sYXllci5jbG9zZShzZWxmLmN1cnJlbnRMYXllckluZGV4KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g55uR5ZCs5Lq66IS46YCJ5oup5LqL5Lu2XHJcbiAgICAgICAgc2VsZi4kc2NvcGUuJG9uKHNlbGYuZnJvbVNlbGVjdEZhY2VDdHJsLCBmdW5jdGlvbiAoZXZlbnQ6IGFueSwgZGF0YTogYW55KSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtOmFueSA9IHtcclxuICAgICAgICAgICAgICAgIGlkOiAwLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuZGF0YS5pbWFnZXVybCxcclxuICAgICAgICAgICAgICAgIGtleTogZGF0YS5kYXRhLmtleSxcclxuICAgICAgICAgICAgICAgIGZldHVyZVRhc2tQYXJhbToge1xyXG4gICAgICAgICAgICAgICAgICAgIGFyckZldHVyZVRhc2tJZDogZGF0YS5kYXRhLmltYWdldXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlVXJsOiBkYXRhLmRhdGEua2V5XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHNlbGYuZmFjZUltZ0xpc3Rbc2VsZi51cGxvYWRJbmRleF0gPSBpdGVtO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDnm5HlkKzlub/mkq3kuovku7YtLeWvvOiIquWIh+aNoi0t6YeN572u5pWw5o2uXHJcbiAgICAgICAgc2VsZi4kc2NvcGUuJG9uKFwiYWR2YW5jZWRTZWFyY2gtY2hhbmdlXCIsIGZ1bmN0aW9uIChldmVudDogYW55LCBkYXRhOiBhbnkpIHtcclxuICAgICAgICAgICAgaWYgKChkYXRhID09PSBcInBlcnNvblwiKSB8fCAoZGF0YSA9PT0gXCJhbGxcIikpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuaW5pdFBhcmFtcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIOino+e7kXNvY2tldOS6i+S7tlxyXG4gICAgICAgIHNlbGYuJHNjb3BlLiRvbihcIiRkZXN0cm95XCIsICgpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5sYXllci5jbG9zZShzZWxmLmN1cnJlbnRMYXllckluZGV4KTtcclxuICAgICAgICAgICAgc2VsZi5jYW5jZWxNb25pdG9yU29ja2V0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g55uR5ZCsc29ja2V0XHJcbiAgICBwdWJsaWMgbW9uaXRvclNvY2tldCgpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi5zb2NrZXRGYWN0b3J5LnN1YnNjcmliZShTb2NrZXRSZXN1bHRUeXBlRW51bS5GYWNlU2VhcmNoLCAocmVzdWx0OiBBcnJheTxhbnk+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHRbMF0uY29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNvY2tldERhdGEgPSByZXN1bHRbMF0uZGF0YS5GYWNlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kZWFsU29ja2V0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VsZi4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5xdWVyeVN0YXR1cyA9IDM7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLmNhbmNlbE1vbml0b3JTb2NrZXQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDms6jplIDnm5HlkKxzb2NrZXRcclxuICAgIHB1YmxpYyBjYW5jZWxNb25pdG9yU29ja2V0KCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBzZWxmLnNvY2tldEZhY3RvcnkudW5TdWJzY3JpYmUoU29ja2V0UmVzdWx0VHlwZUVudW0uRmFjZVNlYXJjaCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Yid5aeL5YyW5Y+C5pWwXHJcbiAgICBwdWJsaWMgaW5pdFBhcmFtcygpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgLy8g5Yid5aeL5YyW57O757uf6YWN572uXHJcbiAgICAgICAgbGV0IHN5c3RlbURhdGE6IFN5c3RlbUNvbmZpZ1BhcmFtcyA9IHNlbGYuc3lzdGVtSW5mb0NhY2hlRmFjdG9yeS5nZXRTeXN0ZW1JbmZvKCk7XHJcbiAgICAgICAgLy8g5Yid5aeL5YyW5Zu+54mH5LiK5Lyg5YiX6KGoXHJcbiAgICAgICAgc2VsZi5mYWNlSW1nTGlzdCA9IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWQ6IDAsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgICAgICAgIGtleTogXCJcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBpZDogMSxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAga2V5OiBcIlwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGlkOiAyLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBrZXk6IFwiXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgaWQ6IDMsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgICAgICAgIGtleTogXCJcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBpZDogNCxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAga2V5OiBcIlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdO1xyXG4gICAgICAgIC8vIOiuvue9ruetm+mAieaVsOaNrlxyXG4gICAgICAgIHNlbGYuc2V4TGlzdCA9IFNleExpc3QoKTsvLyDmgKfliKtcclxuICAgICAgICBzZWxmLmNyb3NzVHJhaW5UaW1lTGlzdCA9IENyb3NzVHJhaW5UaW1lTGlzdCgpOy8vICDml7bpl7TmrrVcclxuICAgICAgICBzZWxmLnBhdHRlcm5MaXN0ID0gUGF0dGVybkxpc3QoKTsvLyDmqKHlvI9cclxuICAgICAgICBzZWxmLmVxdWlwbWVudExpc3QgPSBFcXVpcG1lbnRMaXN0KCk7Ly8g5pC65bim54mpXHJcbiAgICAgICAgc2VsZi5hZ2VMaXN0ID0gQWdlTGlzdCgpOy8vIOW5tOm+hOautVxyXG4gICAgICAgIHNlbGYuY2xvdGhlc0xpc3QgPSBDbG90aGVzTGlzdCgpOy8vIOiho+W4veeJueW+gVxyXG4gICAgICAgIHNlbGYuaGFpckxpc3QgPSBIYWlyTGlzdCgpOy8vIOWPkeWei1xyXG4gICAgICAgIHNlbGYuc2hvZUxpc3QgPSBTaG9lTGlzdCgpOy8vIOmei+WtkFxyXG4gICAgICAgIHNlbGYuZ2xhc3Nlc0xpc3QgPSBHbGFzc2VzTGlzdCgpOy8vIOecvOmVnFxyXG4gICAgICAgIHNlbGYubWFza0xpc3QgPSBNYXNrTGlzdCgpOy8vIOWPo+e9qVxyXG4gICAgICAgIHNlbGYuY2FwTGlzdCA9IENhcExpc3QoKTsvLyDluL3lrZBcclxuICAgICAgICBzZWxmLnNlbGVjdFRpbWVBY2l0dmUgPSAzO1xyXG4gICAgICAgIC8vIOiuvue9ruafpeivouWPguaVsFxyXG4gICAgICAgIHNlbGYuZmFjZVJlc3VsdC5wYWdlUGFyYW1zLnBhZ2VTaXplID0gMTY7XHJcbiAgICAgICAgc2VsZi5zZWFyY2hQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiAxLFxyXG4gICAgICAgICAgICBwYWdlU2l6ZTogMTYsXHJcbiAgICAgICAgICAgIGtleVdvcmQ6IFwiXCIsXHJcbiAgICAgICAgICAgIHVzZXJJZDogc2VsZi51c2VySW5mb0NhY2hlRmFjdG9yeS5nZXRDdXJyZW50VXNlcklkKCksXHJcbiAgICAgICAgICAgIG9yZGVyQnk6IHtcclxuICAgICAgICAgICAgICAgIGlzQXNjOiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aHJlc2hvbGQ6IHN5c3RlbURhdGEuSWRlbnRpdHlWYWx1ZSB8fCA3NSxcclxuICAgICAgICAgICAgaW1hZ2VQYXRoOiBcIlwiLFxyXG4gICAgICAgICAgICBhcnJDYW1lcmFJZDogW11cclxuICAgICAgICB9O1xyXG4gICAgICAgIHNlbGYucXVlcnlTdGF0dXMgPSAxO1xyXG5cclxuICAgICAgICAvLyDorr7nva7pu5jorqTmn6Xor6Lml7bmrrVcclxuICAgICAgICBsZXQgdGltZSA9IHNlbGYuYXR0cmlidXRlRmFjdG9yeS5nZXRDcm9zc1RyYWluVGltZShzZWxmLnNlbGVjdFRpbWVBY2l0dmUpO1xyXG4gICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLnN0YXJ0VGltZSA9IHRpbWUuc3RhcnRUaW1lO1xyXG4gICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLmVuZFRpbWUgPSB0aW1lLmVuZFRpbWU7XHJcblxyXG4gICAgICAgIC8vIOmUgOavgea4hemZpOW8ueahhlxyXG4gICAgICAgIHNlbGYuJHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYubGF5ZXIuY2xvc2UoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vIOWIneWni+WMluiOt+WPluiuvuWkh+S/oeaBr1xyXG4gICAgICAgIHNlbGYuY2FtZXJhTGlzdEluZm8gPSBzZWxmLmRldmljZUNhY2hlU2VydmVyLmdldEFsbENhbWVyYUxpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDorr7nva5zb2NrZXTor7fmsYLlj4LmlbBcclxuICAgIHB1YmxpYyBkZWFsU29ja2V0RGF0YSgpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGZhY2VSZXN1bHREYXRhOiBBcnJheTxmYWNlPiA9IFtdO1xyXG4gICAgICAgIGxldCBtaW4gPSBzZWxmLmZhY2VSZXN1bHQucGFnZVBhcmFtcy5wYWdlU2l6ZSAqIChzZWxmLmZhY2VSZXN1bHQucGFnZVBhcmFtcy5jdXJyZW50UGFnZSAtIDEpO1xyXG4gICAgICAgIGxldCBtYXggPSBzZWxmLmZhY2VSZXN1bHQucGFnZVBhcmFtcy5wYWdlU2l6ZSAqIHNlbGYuZmFjZVJlc3VsdC5wYWdlUGFyYW1zLmN1cnJlbnRQYWdlO1xyXG4gICAgICAgIGxldCBkZXZpY2VJbmZvOiBhbnk7XHJcbiAgICAgICAgbGV0IG5ld0RhdGE6YW55ID0ge1xyXG4gICAgICAgICAgICBSZXN1bHQ6IFtdLFxyXG4gICAgICAgICAgICBUb3RhbENvdW50OiBzZWxmLnNvY2tldERhdGEuVG90YWxDb3VudCxcclxuICAgICAgICAgICAgVGFza0lkOiBzZWxmLnNvY2tldERhdGEuVGFza0lkXHJcbiAgICAgICAgfTtcclxuICAgICAgICBmb3IgKGxldCBpID0gbWluOyBpIDwgbWF4ICYmIGkgPCBzZWxmLnNvY2tldERhdGEuVG90YWxDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG5ld0RhdGEuUmVzdWx0LnB1c2goc2VsZi5zb2NrZXREYXRhLlJlc3VsdFtpXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxmLmRpc3Bvc2VDb21tb25EYXRhKHNlbGYuc29ja2V0RGF0YSwgbmV3RGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5p+l6K+i5pWw5o2uXHJcbiAgICBwdWJsaWMgc2VhcmNoQWR2YW5jZWRTdWJtaXQoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy5wYWdlU2l6ZSA9IHNlbGYuZmFjZVJlc3VsdC5wYWdlUGFyYW1zLnBhZ2VTaXplO1xyXG4gICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLmlzRmlyc3RTZWFyY2ggPSB0cnVlO1xyXG4gICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLnRhc2tJZCA9IFwiXCI7XHJcbiAgICAgICAgc2VsZi5zZWFyY2hQYXJhbXMuaW1hZ2VQYXRoID0gXCJcIjtcclxuICAgICAgICBzZWxmLmZhY2VSZXN1bHQucGFnZVBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcblxyXG4gICAgICAgIGxldCBmZWF0dXJlU2VhcmNoRXh0OkFycmF5PGFueT4gPSBbXTtcclxuICAgICAgICBsZXQgZmV0dXJlVGFza1BhcmFtOkFycmF5PGFueT4gPSBbXTtcclxuICAgICAgICBfLmZvckVhY2goc2VsZi5mYWNlSW1nTGlzdCwgZnVuY3Rpb24odmFsdWUsIGtleSkge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUuZmVhdHVyZVNlYXJjaEV4dCl7IC8vIOaLluaLvVxyXG4gICAgICAgICAgICAgICAgc2VsZi5zZWFyY2hQYXJhbXMuaW1hZ2VQYXRoID0gXCJGYWNlXCI7XHJcbiAgICAgICAgICAgICAgICBmZWF0dXJlU2VhcmNoRXh0LnB1c2godmFsdWUuZmVhdHVyZVNlYXJjaEV4dCk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmICh2YWx1ZS5mZXR1cmVUYXNrUGFyYW0pIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLmltYWdlUGF0aCA9IFwiRmFjZVwiO1xyXG4gICAgICAgICAgICAgICAgZmV0dXJlVGFza1BhcmFtLnB1c2godmFsdWUuZmV0dXJlVGFza1BhcmFtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIOWbvueJh+S6jOasoeetm+mAiVxyXG4gICAgICAgIGlmIChzZWxmLnNlYXJjaFBhcmFtcy5pbWFnZVBhdGggPT09IFwiRmFjZVwiKSB7XHJcbiAgICAgICAgICAgIGlmICgoc2VsZi5zZWFyY2hQYXJhbXMuZmVhdHVyZVNlYXJjaEV4dCA9PT0gZmVhdHVyZVNlYXJjaEV4dCkmJihzZWxmLnNlYXJjaFBhcmFtcy5mZXR1cmVUYXNrUGFyYW0gPT09IGZldHVyZVRhc2tQYXJhbSkpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLmlzRmlyc3RTZWFyY2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLnRhc2tJZCA9IHNlbGYuZmFjZVJlc3VsdC50YXNrSWRcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLmZlYXR1cmVTZWFyY2hFeHQgPSBmZWF0dXJlU2VhcmNoRXh0O1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZWFyY2hQYXJhbXMuZmV0dXJlVGFza1BhcmFtID0gZmV0dXJlVGFza1BhcmFtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy5mZWF0dXJlU2VhcmNoRXh0ID0gZmVhdHVyZVNlYXJjaEV4dDtcclxuICAgICAgICAgICAgc2VsZi5zZWFyY2hQYXJhbXMuZmV0dXJlVGFza1BhcmFtID0gZmV0dXJlVGFza1BhcmFtO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc2VhcmNoUGFyYW1zOiBGYWNlU2VhcmNoUGFyYW1zID0ge30gYXMgRmFjZVNlYXJjaFBhcmFtcztcclxuICAgICAgICBzZWFyY2hQYXJhbXMgPSBhbmd1bGFyLmNvcHkoc2VsZi5zZWFyY2hQYXJhbXMpO1xyXG4gICAgICAgIC8vIOiuvue9ruafpeivouiuvuWkh2lkXHJcbiAgICAgICAgaWYoc2VsZi5zZWFyY2hQYXJhbXMuYXJyQ2FtZXJhSWQubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBzeXN0ZW1Qb2ludExpc3Q6IEFycmF5PFN5c3RlbVBvaW50PiA9IHNlbGYuJHNjb3BlLiRwYXJlbnQuJHBhcmVudC4kcGFyZW50LiRwYXJlbnQuJHBhcmVudC5zeXN0ZW1Qb2ludDtcclxuICAgICAgICAgICAgbGV0IGRldmljZUlkczpBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICAgICAgICAgIF8oc3lzdGVtUG9pbnRMaXN0KS5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0VHlwZS5DYW1lcmEudmFsdWUgPT09IHZhbHVlLk9iamVjdFR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZXZpY2VJZHMucHVzaCh2YWx1ZS5PYmplY3RJRCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzZWFyY2hQYXJhbXMuYXJyQ2FtZXJhSWQgPSBkZXZpY2VJZHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxmLmdldFNlcnZlck1lc3NhZ2Uoc2VhcmNoUGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDliIfmjaLpobXmlbBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1cclxuICAgICAqIEByZXR1cm5zIHtQYWdlUGFyYW1zfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2hhbmdlUGFnZShudW06IG51bWJlcikge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy5jdXJyZW50UGFnZSA9IG51bTtcclxuICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy50YXNrSWQgPSBzZWxmLmZhY2VSZXN1bHQudGFza0lkO1xyXG4gICAgICAgIHNlbGYuZmFjZVJlc3VsdC5wYWdlUGFyYW1zLmN1cnJlbnRQYWdlID0gbnVtO1xyXG5cclxuICAgICAgICAvLyDpnZ7lm77niYfmn6Xor6JcclxuICAgICAgICBpZiAoc2VsZi5zZWFyY2hQYXJhbXMuaW1hZ2VQYXRoID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHNlbGYuZ2V0U2VydmVyTWVzc2FnZShzZWxmLnNlYXJjaFBhcmFtcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VsZi5kZWFsU29ja2V0RGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VsZi5mYWNlUmVzdWx0LnBhZ2VQYXJhbXM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9u6I635Y+W5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0ge0ZhY2VTZWFyY2hQYXJhbXN9IHNlYXJjaFBhcmFtc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFNlcnZlck1lc3NhZ2Uoc2VhcmNoUGFyYW1zOiBGYWNlU2VhcmNoUGFyYW1zKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyDliKTmlq3mmK/lm77niYfmn6Xor6Lov5jmmK/mloflrZfmo4DntKJcclxuICAgICAgICBpZiAoc2VhcmNoUGFyYW1zLmltYWdlUGF0aCA9PT0gXCJGYWNlXCIpIHtcclxuICAgICAgICAgICAgc2VhcmNoUGFyYW1zLmtleVdvcmQgPSBcIlwiO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc2VhcmNoUGFyYW1zLmtleVdvcmQgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGYubGF5ZXJEZWMud2FybkluZm8oJ+ivt+i+k+WFpeWFs+mUruivjScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDorr7nva7mnIDmlrDml7bpl7RcclxuICAgICAgICBpZiAoc2VsZi5zZWxlY3RUaW1lQWNpdHZlICE9PSA0KSB7XHJcbiAgICAgICAgICAgIGxldCB0aW1lID0gc2VsZi5hdHRyaWJ1dGVGYWN0b3J5LmdldENyb3NzVHJhaW5UaW1lKHNlbGYuc2VsZWN0VGltZUFjaXR2ZSk7XHJcbiAgICAgICAgICAgIHNlYXJjaFBhcmFtcy5zdGFydFRpbWUgPSB0aW1lLnN0YXJ0VGltZTtcclxuICAgICAgICAgICAgc2VhcmNoUGFyYW1zLmVuZFRpbWUgPSB0aW1lLmVuZFRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOafpeivouW8gOWni1xyXG4gICAgICAgIHNlbGYucXVlcnlTdGF0dXMgPSAyO1xyXG4gICAgICAgIHNlbGYuY2FuY2VsTW9uaXRvclNvY2tldCgpO1xyXG4gICAgICAgIHNlbGYucmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLmFkdmFuY2VkU2VhcmNoQnlGYWNlKHNlYXJjaFBhcmFtcykudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5zZWFyY2hQYXJhbXMuaXNGaXJzdFNlYXJjaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyDmn6Xor6Lnu5PmnZ9cclxuICAgICAgICAgICAgaWYgKHNlYXJjaFBhcmFtcy5pbWFnZVBhdGggIT09IFwiRmFjZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKHJlcy5jb2RlID09PSAyMDApICYmICh0eXBlb2YgcmVzLmRhdGEgIT09ICd1bmRlZmluZWQnKSAmJiAocmVzLmRhdGEuRmFjZS5Ub3RhbENvdW50ID4gMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmRpc3Bvc2VDb21tb25EYXRhKHNlbGYuZmFjZVJlc3VsdCwgcmVzLmRhdGEuRmFjZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZmFjZVJlc3VsdC5wYWdlUGFyYW1zLnRvdGFsQ291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZmFjZVJlc3VsdC5wYWdlUGFyYW1zLnBhZ2VDb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5mYWNlUmVzdWx0LmRhdGEgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmZhY2VSZXN1bHQudGFza0lkID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNlbGYucXVlcnlTdGF0dXMgPSAzO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5tb25pdG9yU29ja2V0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9u5aSE55CG5p+l6K+i5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gcmVzdWx0RGF0YVxyXG4gICAgICogQHBhcmFtIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkaXNwb3NlQ29tbW9uRGF0YShyZXN1bHREYXRhOiBhbnksIGRhdGE6IGFueSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgcGFyYW1zOmFueSA9IHtcclxuICAgICAgICAgICAgZGV2aWNlSWRzOiBbXSxcclxuICAgICAgICAgICAgZGV2aWNlVHlwZTogJycsXHJcbiAgICAgICAgICAgIGlkczogW10sXHJcbiAgICAgICAgICAgIHVzZXJJZDogc2VsZi51c2VySW5mb0NhY2hlRmFjdG9yeS5nZXRDdXJyZW50VXNlcklkKClcclxuICAgICAgICB9O1xyXG4gICAgICAgIHBhcmFtcy5kZXZpY2VUeXBlID0gT2JqZWN0VHlwZS5DYW1lcmEudmFsdWU7XHJcbiAgICAgICAgXy5mb3JFYWNoKGRhdGEuUmVzdWx0LGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICBwYXJhbXMuZGV2aWNlSWRzLnB1c2godmFsdWUuQWNjZXNzTG9nLkNhbWVyYUlEKTtcclxuICAgICAgICAgICAgcGFyYW1zLmlkcy5wdXNoKHZhbHVlLkFjY2Vzc0xvZy5JRCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2VsZi5yZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UuZ2V0RGV2aWNlSW5mb1Byb21pc2UocGFyYW1zKS50aGVuKChyZXM6YW55KT0+e1xyXG4gICAgICAgICAgICBfLmZvckVhY2goZGF0YS5SZXN1bHQsZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmRldmljZUluZm8gPSByZXMuZGF0YS5kZXZpY2VJbmZvW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY29sbGVjdFN0YXR1cyA9IHJlcy5kYXRhLmNvbGxlY3RTdGF0dXNbaW5kZXhdO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2VsZi4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmZhY2VSZXN1bHQucGFnZVBhcmFtcy50b3RhbENvdW50ID0gZGF0YS5Ub3RhbENvdW50O1xyXG4gICAgICAgICAgICAgICAgc2VsZi5mYWNlUmVzdWx0LnBhZ2VQYXJhbXMucGFnZUNvdW50ID0gTWF0aC5jZWlsKGRhdGEuVG90YWxDb3VudCAvIHNlbGYuZmFjZVJlc3VsdC5wYWdlUGFyYW1zLnBhZ2VTaXplKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuZmFjZVJlc3VsdC5kYXRhID0gZGF0YS5SZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmZhY2VSZXN1bHQudGFza0lkID0gZGF0YS5UYXNrSWQ7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnF1ZXJ5U3RhdHVzID0gMztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g6YCJ5oup5oCn5YirXHJcbiAgICAgKiBAcGFyYW0ge211bHRpcGxlQ2hvaWNlfSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZWxlY3RTZXgoaXRlbTogbXVsdGlwbGVDaG9pY2UpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi5zZWFyY2hQYXJhbXMuYXJyR2VuZGVyID0gW107XHJcbiAgICAgICAgaWYgKGl0ZW0udmFsICE9PSBcImFsbFwiKSB7XHJcbiAgICAgICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLmFyckdlbmRlci5wdXNoKGl0ZW0udmFsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5zZXhMaXN0LmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBpbmRleCwgYXJyYXkpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlLnZhbCA9PT0gaXRlbS52YWwpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlLnN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5zdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDpgInmi6nml7bpl7TmrrVcclxuICAgICAqIEBwYXJhbSB7bXVsdGlwbGVDaG9pY2V9IGl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNlbGVjdFRpbWUoaXRlbTogbXVsdGlwbGVDaG9pY2UpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHRpbWU6IGFueTtcclxuXHJcbiAgICAgICAgLy8g5pe25q61XHJcbiAgICAgICAgaWYgKGl0ZW0udmFsID09PSAxKSB7XHJcbiAgICAgICAgICAgIHRpbWUgPSBzZWxmLmF0dHJpYnV0ZUZhY3RvcnkuZ2V0Q3Jvc3NUcmFpblRpbWUoMSk7XHJcbiAgICAgICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLnN0YXJ0VGltZSA9IHRpbWUuc3RhcnRUaW1lO1xyXG4gICAgICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy5lbmRUaW1lID0gdGltZS5lbmRUaW1lO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbS52YWwgPT09IDIpIHtcclxuICAgICAgICAgICAgdGltZSA9IHNlbGYuYXR0cmlidXRlRmFjdG9yeS5nZXRDcm9zc1RyYWluVGltZSgyKTtcclxuICAgICAgICAgICAgc2VsZi5zZWFyY2hQYXJhbXMuc3RhcnRUaW1lID0gdGltZS5zdGFydFRpbWU7XHJcbiAgICAgICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLmVuZFRpbWUgPSB0aW1lLmVuZFRpbWU7XHJcbiAgICAgICAgfSBlbHNlIGlmICgoaXRlbS52YWwgPT09IDMpIHx8IChpdGVtLnZhbCA9PT0gXCJhbGxcIikpIHtcclxuICAgICAgICAgICAgdGltZSA9IHNlbGYuYXR0cmlidXRlRmFjdG9yeS5nZXRDcm9zc1RyYWluVGltZSgzKTtcclxuICAgICAgICAgICAgc2VsZi5zZWFyY2hQYXJhbXMuc3RhcnRUaW1lID0gdGltZS5zdGFydFRpbWU7XHJcbiAgICAgICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLmVuZFRpbWUgPSB0aW1lLmVuZFRpbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxmLnNlbGVjdFRpbWVBY2l0dmUgPSBpdGVtLnZhbDtcclxuICAgICAgICBzZWxmLmNyb3NzVHJhaW5UaW1lTGlzdC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIGFycmF5KSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS52YWwgPT09IGl0ZW0udmFsKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5zdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUuc3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g6YCJ5oup5qih5byPXHJcbiAgICAgKiBAcGFyYW0ge211bHRpcGxlQ2hvaWNlfSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZWxlY3RQYXR0ZXJuKGl0ZW06IG11bHRpcGxlQ2hvaWNlKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLmFyclR5cGUgPSBbXTtcclxuICAgICAgICBpZiAoaXRlbS52YWwgIT09IFwiYWxsXCIpIHtcclxuICAgICAgICAgICAgc2VsZi5zZWFyY2hQYXJhbXMuYXJyVHlwZS5wdXNoKGl0ZW0udmFsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5wYXR0ZXJuTGlzdC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIGFycmF5KSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS52YWwgPT09IGl0ZW0udmFsKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5zdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUuc3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g6YCJ5oup5pC65bim54mpXHJcbiAgICAgKiBAcGFyYW0ge211bHRpcGxlQ2hvaWNlfSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZWxlY3RFcXVpcG1lbnQoaXRlbTogbXVsdGlwbGVDaG9pY2UpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi5zZWFyY2hQYXJhbXMuYXJyQ2FycnlUaGluZ3MgPSBbXTtcclxuICAgICAgICBpZiAoaXRlbS52YWwgIT09IFwiYWxsXCIpIHtcclxuICAgICAgICAgICAgc2VsZi5zZWFyY2hQYXJhbXMuYXJyQ2FycnlUaGluZ3MucHVzaChpdGVtLnZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYuZXF1aXBtZW50TGlzdC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIGFycmF5KSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS52YWwgPT09IGl0ZW0udmFsKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5zdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUuc3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g6YCJ5oup5bm06b6E5q61XHJcbiAgICAgKiBAcGFyYW0ge211bHRpcGxlQ2hvaWNlfSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZWxlY3RBZ2UoaXRlbTogbXVsdGlwbGVDaG9pY2UpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgaWYgKGl0ZW0udmFsID09PSAwKSB7XHJcbiAgICAgICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLm1pbkFnZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLm1heEFnZSA9IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLnZhbCA9PT0gMSkge1xyXG4gICAgICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy5taW5BZ2UgPSAxO1xyXG4gICAgICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy5tYXhBZ2UgPSAyMDtcclxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udmFsID09PSAyKSB7XHJcbiAgICAgICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLm1pbkFnZSA9IDIxO1xyXG4gICAgICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy5tYXhBZ2UgPSA0MDtcclxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udmFsID09PSAzKSB7XHJcbiAgICAgICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLm1pbkFnZSA9IDQxO1xyXG4gICAgICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy5tYXhBZ2UgPSA2MDtcclxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udmFsID09PSAzKSB7XHJcbiAgICAgICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLm1pbkFnZSA9IDYwO1xyXG4gICAgICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy5tYXhBZ2UgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLmFnZUxpc3QuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGluZGV4LCBhcnJheSkge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUudmFsID09PSBpdGVtLnZhbCkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUuc3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlLnN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOmAieaLqeiho+W4veeJueW+gVxyXG4gICAgICogQHBhcmFtIHttdWx0aXBsZUNob2ljZX0gaXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VsZWN0Q2xvdGhlcyhpdGVtOiBtdWx0aXBsZUNob2ljZSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBzZWxmLmNsb3RoZXNMaXN0LmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBpbmRleCwgYXJyYXkpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlLnZhbCA9PT0gaXRlbS52YWwpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlLnN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5zdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDpgInmi6npnovlrZBcclxuICAgICAqIEBwYXJhbSB7bXVsdGlwbGVDaG9pY2V9IGl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNlbGVjdFNob2UoaXRlbTogbXVsdGlwbGVDaG9pY2UpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi5zZWFyY2hQYXJhbXMuYXJyU2hvZXMgPSBbXTtcclxuICAgICAgICBpZiAoaXRlbS52YWwgIT09IFwiYWxsXCIpIHtcclxuICAgICAgICAgICAgc2VsZi5zZWFyY2hQYXJhbXMuYXJyU2hvZXMucHVzaChpdGVtLnZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYuc2hvZUxpc3QuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGluZGV4LCBhcnJheSkge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUudmFsID09PSBpdGVtLnZhbCkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUuc3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlLnN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOmAieaLqeecvOmVnFxyXG4gICAgICogQHBhcmFtIHttdWx0aXBsZUNob2ljZX0gaXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VsZWN0R2xhc3NlcyhpdGVtOiBtdWx0aXBsZUNob2ljZSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy5hcnJFeWVHbGFzc2VzID0gW107XHJcbiAgICAgICAgaWYgKGl0ZW0udmFsICE9PSBcImFsbFwiKSB7XHJcbiAgICAgICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLmFyckV5ZUdsYXNzZXMucHVzaChpdGVtLnZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYuZ2xhc3Nlc0xpc3QuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGluZGV4LCBhcnJheSkge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUudmFsID09PSBpdGVtLnZhbCkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUuc3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlLnN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOmAieaLqeWPo+e9qVxyXG4gICAgICogQHBhcmFtIHttdWx0aXBsZUNob2ljZX0gaXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VsZWN0TWFzayhpdGVtOiBtdWx0aXBsZUNob2ljZSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy5hcnJNYXNrID0gW107XHJcbiAgICAgICAgaWYgKGl0ZW0udmFsICE9PSBcImFsbFwiKSB7XHJcbiAgICAgICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLmFyck1hc2sucHVzaChpdGVtLnZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYubWFza0xpc3QuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGluZGV4LCBhcnJheSkge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUudmFsID09PSBpdGVtLnZhbCkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUuc3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlLnN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOmAieaLqeW4veWtkFxyXG4gICAgICogQHBhcmFtIHttdWx0aXBsZUNob2ljZX0gaXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VsZWN0Q2FwKGl0ZW06IG11bHRpcGxlQ2hvaWNlKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLmFyckhhdCA9IFtdO1xyXG4gICAgICAgIGlmIChpdGVtLnZhbCAhPT0gXCJhbGxcIikge1xyXG4gICAgICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy5hcnJIYXQucHVzaChpdGVtLnZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYuY2FwTGlzdC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIGFycmF5KSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS52YWwgPT09IGl0ZW0udmFsKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5zdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUuc3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g6YCJ5oup5Y+R5Z6LXHJcbiAgICAgKiBAcGFyYW0ge211bHRpcGxlQ2hvaWNlfSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZWxlY3RIYWlyKGl0ZW06IG11bHRpcGxlQ2hvaWNlKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLmFyckhhaXJUeXBlID0gW107XHJcbiAgICAgICAgaWYgKGl0ZW0udmFsICE9PSBcImFsbFwiKSB7XHJcbiAgICAgICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLmFyckhhaXJUeXBlLnB1c2goaXRlbS52YWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLmhhaXJMaXN0LmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBpbmRleCwgYXJyYXkpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlLnZhbCA9PT0gaXRlbS52YWwpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlLnN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5zdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDmlLbol4/kuI7lj5bmtojmlLbol49cclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGlja0NvbGxlY3QoZXZlbnQ6IGFueSwgaXRlbTogZmFjZSkge1xyXG4gICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGlmICghaXRlbS5jb2xsZWN0U3RhdHVzKSB7XHJcbiAgICAgICAgICAgIGxldCBwYXJhbXM6IENvbGxlY3RBZGRQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgICAgICBqc29uOiBhbmd1bGFyLnRvSnNvbihpdGVtKSxcclxuICAgICAgICAgICAgICAgIG9iamVjdElEOiBpdGVtLkFjY2Vzc0xvZy5JRCxcclxuICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IENvbGxlY3REYXRhVHlwZS5GYWNlLnZhbHVlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHNlbGYucmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLmNvbGxlY3RBZGRJbmZvKHBhcmFtcylcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcGFyYW1zOiBDb2xsZWN0RGVsZXRlUGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAgaWRzOiBpdGVtLkFjY2Vzc0xvZy5JRFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzZWxmLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5jb2xsZWN0RGVsZXRlSW5mbyhwYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGl0ZW0uY29sbGVjdFN0YXR1cyA9ICFpdGVtLmNvbGxlY3RTdGF0dXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5YiG5p6QXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xpY2tBbmFseXNpcyhldmVudDogYW55LCBpdGVtOiBmYWNlLCB0eXBlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzdG9yYWdlUGFyYW1zOiBBbmFseXNpc1N0b3JhZ2VQYXJhbXMgPSBBbmFseXNpc0RhdGFUeXBlLkZhY2U7XHJcbiAgICAgICAgc3RvcmFnZVBhcmFtcy5kYXRhID0gaXRlbTtcclxuICAgICAgICB0aGlzLmhhbmRsZVN0b3JhZ2Uuc2V0U2Vzc2lvblN0b3JhZ2VEYXRhKHN0b3JhZ2VQYXJhbXMua2V5LCBzdG9yYWdlUGFyYW1zKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIkFuYWx5c2lzVHlwZVwiLCBcIkZhY2VcIik7XHJcbiAgICAgICAgaWYgKHR5cGUgPSBBbmFseXNpc0dvVG9UeXBlLlRyYWNrLmtleSkge1xyXG4gICAgICAgICAgICB3aW5kb3cub3BlbihBbmFseXNpc0dvVG9UeXBlLlRyYWNrLmRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9IEFuYWx5c2lzR29Ub1R5cGUuQWNjb21wYW55aW5nLmtleSkge1xyXG4gICAgICAgICAgICB3aW5kb3cub3BlbihBbmFseXNpc0dvVG9UeXBlLkFjY29tcGFueWluZy5kYXRhKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPSBBbmFseXNpc0dvVG9UeXBlLkZyZXF1ZW5jeS5rZXkpIHtcclxuICAgICAgICAgICAgd2luZG93Lm9wZW4oQW5hbHlzaXNHb1RvVHlwZS5GcmVxdWVuY3kuZGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID0gQW5hbHlzaXNHb1RvVHlwZS5Nb3JlLmtleSkge1xyXG4gICAgICAgICAgICB3aW5kb3cub3BlbihBbmFseXNpc0dvVG9UeXBlLk1vcmUuZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOW4g+aOp+S4juWPlua2iOW4g+aOp1xyXG4gICAgICogQHBhcmFtIGl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsaWNrU3VydmVpbGxhbmNlKGV2ZW50OiBhbnksIGl0ZW06IGZhY2UpIHtcclxuICAgICAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGl0ZW0uc3VydmVpbGxhbmNlU3RhdHVzID0gIWl0ZW0uc3VydmVpbGxhbmNlU3RhdHVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9u5Zu+54mH5LiK5LygXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRcclxuICAgICAqIEBwYXJhbSB7UXVlcnlJdGVtfSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbWdVcGxvYWRpbmcoZXZlbnQ6IGFueSwgaXRlbTogUXVlcnlJdGVtLCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLmtleVdvcmQgPSBcIlwiO1xyXG4gICAgICAgIHNlbGYudXBsb2FkSW5kZXggPSBpbmRleDtcclxuXHJcbiAgICAgICAgbGV0IGZyb20gPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBmcm9tLmFwcGVuZCgnaW1hZ2UnLCBldmVudC50YXJnZXQuZmlsZXNbMF0pO1xyXG4gICAgICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgICAgICBzdG9yZVR5cGU6IFwiTE9DXCIsXHJcbiAgICAgICAgICAgIGltYWdlQ2F0ZWdvcnk6IFwiQ2FwdHVyZUltYWdlXCIsXHJcbiAgICAgICAgICAgIGNvbW1hbmRUeXBlOiBcIlNlYXJjaEFjY2Vzc0xvZ1wiLFxyXG4gICAgICAgICAgICBkZXRlY3RUeXBlOiBcIkZhY2VcIlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy51cGxvYWRJbWFnZVNlcnZpY2UudXBsb2FkSW1hZ2VGb3JGYWNlKGZyb20sIGRhdGEpLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICgocmVzLmNvZGUgPT09IDIwMCkgJiYgKHJlcy5kYXRhICYmIHJlcy5kYXRhLmtleSkpIHsgLy8g5Lq66IS46K+G5Yir5oiQ5YqfXHJcbiAgICAgICAgICAgICAgICBsZXQgb2JqOlF1ZXJ5SXRlbSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogMCxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzLmRhdGEuaW1hZ2V1cmwsXHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiByZXMuZGF0YS5rZXksXHJcbiAgICAgICAgICAgICAgICAgICAgZmV0dXJlVGFza1BhcmFtOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyckZldHVyZVRhc2tJZDogcmVzLmRhdGEua2V5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZVVybDogcmVzLmRhdGEuaW1hZ2V1cmxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgc2VsZi4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5mYWNlSW1nTGlzdFtpbmRleF0gPSBvYmo7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgocmVzLmNvZGUgPT09IDIwMCkgJiYgKHJlcy5kYXRhLmZhY2VJbmZvKSkgey8vIOS6uuiEuOmAieaLqVxyXG4gICAgICAgICAgICAgICAgbGV0IGltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5zcmMgPSAnZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwnK3Jlcy5kYXRhLmltYWdlO1xyXG4gICAgICAgICAgICAgICAgaW1hZ2Uub25sb2FkID0gKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJfaW5mb1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IGltYWdlLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogaW1hZ2UuaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubXVsdGlVc2VyU2VsZWN0KHJlcy5kYXRhLCBmaWxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmICgocmVzLmNvZGUgPT09IDIwMCkgJiYgKHJlcy5kYXRhLmltYWdlKSkgeyAvLyDkurrohLjor4bliKvlpLHotKXlvoXmoIflrppcclxuICAgICAgICAgICAgICAgIGxldCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgICAgICAgaW1hZ2Uuc3JjID0gJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJytyZXMuZGF0YS5pbWFnZTtcclxuICAgICAgICAgICAgICAgIGltYWdlLm9ubG9hZCA9ICgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiX2luZm9cIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBpbWFnZS53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IGltYWdlLmhlaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmZhY2VEZW1hcmNhdGUocmVzLmRhdGEsIGZpbGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sYXllckRlYy53YXJuSW5mbygn5Lq66IS46K+G5Yir5aSx6LSlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPlua2iOS4iuS8oOWbvueJh1xyXG4gICAgICogQHBhcmFtIHtRdWVyeUl0ZW19IGl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGltZ0NhbmNlbChpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBpdGVtOlF1ZXJ5SXRlbSA9IHtcclxuICAgICAgICAgICAgaWQ6IDAsXHJcbiAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICBrZXk6IFwiXCIsXHJcbiAgICAgICAgICAgIGZldHVyZVRhc2tQYXJhbTogbnVsbCxcclxuICAgICAgICAgICAgZmVhdHVyZVNlYXJjaEV4dDogbnVsbFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2VsZi5mYWNlSW1nTGlzdFtpbmRleF0gPSBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9u5pi+56S66K+m5oOF5by55qGGXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFua1xyXG4gICAgICogQHBhcmFtIHtBcnJheTxmYWNlPn0gbGlzdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGV0YWlsUG9wdXAocmFuazogbnVtYmVyLGFsbExpc3Q6QXJyYXk8ZmFjZT4pIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7ICRkZXN0cm95OiBGdW5jdGlvbiwgcmFuazogbnVtYmVyLCBhbGxMaXN0OiBBcnJheTxmYWNlPiwgY29sbGVjdEZ1bmN0aW9uOiBGdW5jdGlvbiwgYW5hbHlzaXNGdW5jdGlvbjogRnVuY3Rpb24sIHN1cnZlaWxsYW5jZUZ1bmN0aW9uOiBGdW5jdGlvbiwgY2xvc2VQb3B1cDogRnVuY3Rpb24gfSA9IHNlbGYuJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICBzY29wZS5yYW5rID0gcmFuaztcclxuICAgICAgICBzY29wZS5hbGxMaXN0ID0gYWxsTGlzdDtcclxuICAgICAgICBzY29wZS5jb2xsZWN0RnVuY3Rpb24gPSAoaXRlbTogZmFjZSkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLmNsaWNrQ29sbGVjdChudWxsLCBpdGVtKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNjb3BlLmFuYWx5c2lzRnVuY3Rpb24gPSAoaXRlbTogZmFjZSwgdHlwZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuY2xpY2tBbmFseXNpcyhudWxsLCBpdGVtLCB0eXBlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNjb3BlLnN1cnZlaWxsYW5jZUZ1bmN0aW9uID0gKGl0ZW06IGZhY2UpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5jbGlja1N1cnZlaWxsYW5jZShudWxsLCBpdGVtKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNjb3BlLmNsb3NlUG9wdXAgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYubGF5ZXIuY2xvc2Uoc2VsZi5jdXJyZW50TGF5ZXJJbmRleCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZWxmLmN1cnJlbnRMYXllckluZGV4ID0gc2VsZi5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgc2tpbjogJ2RldGFpbC1wb3B1cC1ib3gnLFxyXG4gICAgICAgICAgICB0aXRsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFyZWE6IFsnNjAwcHgnLCAnNDQwcHgnXSxcclxuICAgICAgICAgICAgY29udGVudDogcGVyc29uUG9wdXBIdG1sLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9u5aSa5Lq66IS46YCJ5oupXHJcbiAgICAgKiBAcGFyYW0gZmFjZUluZm9cclxuICAgICAqIEBwYXJhbSBmaWxlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtdWx0aVVzZXJTZWxlY3QoZmFjZUluZm86IGFueSwgZmlsZTogYW55KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBzY29wZTogeyBsYXllcjogYW55OyBpbmRleDogc3RyaW5nLCAkZGVzdHJveTogRnVuY3Rpb24sIGRhdGE6IGFueSwgZmlsZTogYW55LCBjb21tYW5kVHlwZTogc3RyaW5nLCBkZXRlY3RUeXBlOiBzdHJpbmcsIGxheWVySW5kZXg6IGFueSwgZnJvbVNlbGVjdEZhY2VDdHJsOiBzdHJpbmcgfSA9IHNlbGYuJHNjb3BlLiRuZXcoKTtcclxuXHJcbiAgICAgICAgc2NvcGUuaW5kZXggPSBudWxsO1xyXG4gICAgICAgIHNjb3BlLmRhdGEgPSBmYWNlSW5mbztcclxuICAgICAgICBzY29wZS5maWxlID0gZmlsZTtcclxuICAgICAgICBzY29wZS5jb21tYW5kVHlwZSA9IFwiU2VhcmNoQWNjZXNzTG9nXCI7XHJcbiAgICAgICAgc2NvcGUuZGV0ZWN0VHlwZSA9IFwiRmFjZVwiO1xyXG4gICAgICAgIHNjb3BlLmZyb21TZWxlY3RGYWNlQ3RybCA9IHNlbGYuZnJvbVNlbGVjdEZhY2VDdHJsO1xyXG5cclxuICAgICAgICBzY29wZS5sYXllckluZGV4ID0gc2VsZi5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgc2tpbjogJ25vLXNjcm9sbCcsXHJcbiAgICAgICAgICAgIHRpdGxlOiBbJ+S6uuiEuOmAieaLqScsICdmb250LXdlaWdodDogYm9sZDtiYWNrZ3JvdW5kLWNvbG9yOiAjRjZGOEZCO2NvbG9yOiAjNjA2MDYwO2hlaWdodDogNDBweDsnXSxcclxuICAgICAgICAgICAgYXJlYTogWyc0MDBweCcsICczMTBweCddLFxyXG4gICAgICAgICAgICBjb250ZW50OiBzZWxlY3RGYWNlUG9wdXBIdG1sLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbuS6uuiEuOagh+azqFxyXG4gICAgICogQHBhcmFtIGZhY2VJbmZvXHJcbiAgICAgKiBAcGFyYW0gZmlsZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmFjZURlbWFyY2F0ZShmYWNlSW5mbzogYW55LCBmaWxlOiBhbnkpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IGxheWVyOiBhbnk7IGluZGV4OiBzdHJpbmcsICRkZXN0cm95OiBGdW5jdGlvbiwgZGF0YTogYW55LCBmaWxlOiBhbnksIGNvbW1hbmRUeXBlOiBzdHJpbmcsIGRldGVjdFR5cGU6IHN0cmluZywgbGF5ZXJJbmRleDogYW55LCBmcm9tRGVtYXJjYXRlRmFjZUN0cmw6IHN0cmluZywgZmxhZzogYm9vbGVhbiB9ID0gc2VsZi4kc2NvcGUuJG5ldygpO1xyXG5cclxuICAgICAgICBzY29wZS5pbmRleCA9IG51bGw7XHJcbiAgICAgICAgc2NvcGUuZGF0YSA9IGZhY2VJbmZvO1xyXG4gICAgICAgIHNjb3BlLmZpbGUgPSBmaWxlO1xyXG4gICAgICAgIHNjb3BlLmNvbW1hbmRUeXBlID0gXCJTZWFyY2hBY2Nlc3NMb2dcIjtcclxuICAgICAgICBzY29wZS5kZXRlY3RUeXBlID0gXCJGYWNlXCI7XHJcbiAgICAgICAgc2NvcGUuZnJvbURlbWFyY2F0ZUZhY2VDdHJsID0gc2VsZi5mcm9tU2VsZWN0RmFjZUN0cmw7XHJcbiAgICAgICAgc2NvcGUuZmxhZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBzY29wZS5sYXllckluZGV4ID0gc2VsZi5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgc2tpbjogJ25vLXNjcm9sbCcsXHJcbiAgICAgICAgICAgIHRpdGxlOiBbJ+S6uuiEuOagh+azqCcsICdmb250LXdlaWdodDogYm9sZDtiYWNrZ3JvdW5kLWNvbG9yOiAjRjZGOEZCO2NvbG9yOiAjNjA2MDYwO2hlaWdodDogNDBweDsnXSxcclxuICAgICAgICAgICAgYXJlYTogWyc2NTBweCcsICc1NTVweCddLFxyXG4gICAgICAgICAgICBjb250ZW50OiBkZW1hcmNhdGVQb3B1cEh0bWwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6YCJ5oup6K6+5aSHXHJcbiAgICBwdWJsaWMgc2VsZWN0Q2FtZXJhKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgc2NvcGU6IHsgc2VsZWN0Q2FtZXJhTGlzdDogQXJyYXk8c3RyaW5nPiwgJGRlc3Ryb3k6IEZ1bmN0aW9uLCBzZWxlY3RDdHJsQ2I6IHN0cmluZyB9ID0gc2VsZi4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLnNlbGVjdENhbWVyYUxpc3QgPSBzZWxmLnNlYXJjaFBhcmFtcy5hcnJDYW1lcmFJZDtcclxuICAgICAgICBzY29wZS5zZWxlY3RDdHJsQ2IgPSBzZWxmLnNlbGVjdERldmljZUNiO1xyXG4gICAgICAgIHNlbGYuY3VycmVudExheWVySW5kZXggPSBzZWxmLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBjb250ZW50OiBjYW1lcmFUcmVlUG9wdXBIdG1sLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIHRpdGxlOiBcIuaRhOWDj+acuumAieaLqVwiLFxyXG4gICAgICAgICAgICBhcmVhOiBbXCI3MTBweFwiLCBcIjYyMHB4XCJdLFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25Ecm9wQ29tcGxldGUoZHJhZ0RhdGE6IGFueSwgZXZ0OiBFdmVudCwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgaXRlbTphbnkgPSB7XHJcbiAgICAgICAgICAgIGlkOiAwLFxyXG4gICAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgICAga2V5OiBcIlwiXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpdGVtLmZlYXR1cmVTZWFyY2hFeHQgPSB7XHJcbiAgICAgICAgICAgIGFjY2Vzc0xvZ0lkOiBkcmFnRGF0YS5BY2Nlc3NMb2cuSUQsXHJcbiAgICAgICAgICAgIGZlYXR1cmVUeXBlOiBcIkFjY2Vzc0ZlYXR1cmVcIixcclxuICAgICAgICAgICAgaW1nVXJsOiBkcmFnRGF0YS5BY2Nlc3NMb2cuRmFjZVBhdGhcclxuICAgICAgICB9O1xyXG4gICAgICAgIGl0ZW0udmFsdWUgPSBkcmFnRGF0YS5BY2Nlc3NMb2cuRmFjZVBhdGg7XHJcbiAgICAgICAgaXRlbS5rZXkgPSBkcmFnRGF0YS5BY2Nlc3NMb2cuSUQ7XHJcblxyXG4gICAgICAgIHNlbGYuZmFjZUltZ0xpc3RbaW5kZXhdID0gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VsZWN0RGV2aWNlKHR5cGU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRlbWl0KFwic2VhcmNoLWRldmljZS10eXBlXCIsIHR5cGUpO1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRlbWl0KFwic2VhcmNoLXBhdHRlcm5cIiwgXCJhZHZhbmNlZFwiKTtcclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ1BlcnNvblNlYXJjaFBhZ2VDb250cm9sbGVyJywgUGVyc29uU2VhcmNoUGFnZUNvbnRyb2xsZXIpOyJdfQ==
