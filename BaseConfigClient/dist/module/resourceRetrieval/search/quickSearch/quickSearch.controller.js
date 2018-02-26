define(["require", "exports", "text!../../../selectPopup/treeArea/TreeArea.html", "../../../common/app/main.app", "../../../common/factory/attribute.factory", "../../resourceRetrievalEnum", "../../../../core/enum/ObjectType", "../../../../core/server/enum/SocketResultTypeEnum", "../../../../core/server/enum/ResourceType", "../../../common/Pagination", "lodash", "../../../selectPopup/treeArea/TreeArea", "./devicePage/carSearchPage.controller", "./devicePage/personSearchPage.controller", "./devicePage/wifiSearchPage.controller", "./devicePage/EFSearchPage.controller", "./devicePage/deviceSearchPage.controller", "./devicePage/positionSearchPage.controller", "../../../common/services/resourceRetrieval.service", "../../../common/factory/socket.factory", "../../../common/factory/layerMsg.factory", "../../../common/factory/userinfo.cache.factory", "../../../common/factory/systemInfo.cache.factory"], function (require, exports, treeAreapopupHtml, main_app_1, attribute_factory_1, resourceRetrievalEnum_1, ObjectType_1, SocketResultTypeEnum_1, ResourceType_1, Pagination_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var quickSearchController = (function () {
        function quickSearchController($scope, $timeout, resourceRetrievalService, layer, socketFactory, userInfoCacheFactory, layerDec, systemInfoCacheFactory) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.resourceRetrievalService = resourceRetrievalService;
            this.layer = layer;
            this.socketFactory = socketFactory;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.layerDec = layerDec;
            this.systemInfoCacheFactory = systemInfoCacheFactory;
            this.deviceRmpGateResult = new Pagination_1.PageParamsAndResult();
            this.RmpGateResultPagination = new Pagination_1.Pagination();
            this.deviceCameraResult = new Pagination_1.PageParamsAndResult();
            this.CameraResultPagination = new Pagination_1.Pagination();
            this.deviceWifiResult = new Pagination_1.PageParamsAndResult();
            this.WifiResultPagination = new Pagination_1.Pagination();
            this.deviceElectronicResult = new Pagination_1.PageParamsAndResult();
            this.ElectronicResultPagination = new Pagination_1.Pagination();
            this.hideSize = true;
            this.hideGopage = true;
            this.searchBar = true;
            this.deviceStatus = false;
            this.keyWord = "";
            this.timeList = [
                { name: '一天', id: 1 },
                { name: '一周', id: 2 },
                { name: '一月', id: 3 }
            ];
            this.selectTime = 3;
            this.queryStartTime = 0;
            this.queryEndTime = 0;
            this.queryTotal = 0;
            this.deviceArrId = [];
            this.selectAreaArr = [];
            this.attributeFactory = new attribute_factory_1.AttributeFactory();
            this.activeSearchParams = {
                keyWord: "",
                taskId: "",
                featureSearchExt: ""
            };
            this.selectAreaCb = "close.area.popup";
            var self = this;
            self.initParams();
            self.$scope.$on(self.selectAreaCb, function (event, areaIds, status) {
                if (status) {
                    if (Array.isArray(areaIds)) {
                        self.selectAreaArr = areaIds;
                    }
                    else {
                        self.selectAreaArr = [];
                    }
                }
                self.layer.close(self.seleAreaId);
            });
            self.$scope.$on("verify-keyword", function (event, data) {
                self.queryTotal = 0;
                self.queryStartTime = (new Date()).valueOf();
                self.socketQueryData = data;
                switch (data.type) {
                    case "quick":
                        self.searchByQuick(data);
                        break;
                    case "Face":
                        self.searchByFace(data);
                        break;
                    case "Car":
                        self.searchByCar(data);
                        break;
                    default: break;
                }
            });
        }
        quickSearchController.prototype.initParams = function () {
            var self = this;
            self.switchButton = [
                { title: "车辆", iconPath: "../../../images/resourceRetrieval/switch-car.png", name: "car", visible: true },
                {
                    title: "人像",
                    iconPath: "../../../images/resourceRetrieval/switch-person.png",
                    name: "person",
                    visible: false
                },
                {
                    title: "Wi-Fi",
                    iconPath: "../../../images/resourceRetrieval/switch-wifi.png",
                    name: "wifi",
                    visible: false
                },
                {
                    title: "RFID",
                    iconPath: "../../../images/resourceRetrieval/switch-rfid.png",
                    name: "rfid",
                    visible: false
                },
                {
                    title: "电围",
                    iconPath: "../../../images/resourceRetrieval/switch_electronicfence.png",
                    name: "electronicfence",
                    visible: false
                },
                {
                    title: "设备",
                    iconPath: "../../../images/resourceRetrieval/switch-device.png",
                    name: "device",
                    visible: false
                },
                {
                    title: "位置",
                    iconPath: "../../../images/resourceRetrieval/switch-position.png",
                    name: "position",
                    visible: false
                }
            ];
            self.switchPage = self.switchButton[0];
            self.initPageParams();
        };
        quickSearchController.prototype.initPageParams = function () {
            var self = this;
            self.carResult = resourceRetrievalEnum_1.initCarResult(0);
            self.faceResult = resourceRetrievalEnum_1.initFaceResult(0);
            self.wifiResult = resourceRetrievalEnum_1.initWifiResult(0);
            self.electronicResult = resourceRetrievalEnum_1.initElectronicResult();
            self.rfidResult = resourceRetrievalEnum_1.initWifiResult(0);
            self.positionResult = resourceRetrievalEnum_1.initPositionResult();
            self.deviceStatus = true;
        };
        quickSearchController.prototype.monitorFaceSocket = function () {
            var self = this;
            self.socketFactory.subscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.FaceSearch, function (result) {
                self.queryEndTime = (new Date()).valueOf();
                if (result[0].code === 200) {
                    self.queryTotal = result[0].data.Face.TotalCount;
                    self.socketData = result[0].data.Face;
                    self.dealSocketData();
                }
                else {
                    self.$scope.$emit("search-request-loading", false);
                }
                self.logoutFaceSocket();
            });
        };
        quickSearchController.prototype.logoutFaceSocket = function () {
            this.socketFactory.unSubscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.FaceSearch);
        };
        quickSearchController.prototype.monitorCarSocket = function () {
            var self = this;
            self.socketFactory.subscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.CarSearch, function (result) {
                self.queryEndTime = (new Date()).valueOf();
                if (result[0].code === 200) {
                    self.queryTotal = result[0].data.Vehicle.TotalCount;
                    self.socketCarData = result[0].data.Vehicle;
                    self.dealSocketCarData();
                }
                else {
                    self.$scope.$emit("search-request-loading", false);
                }
                self.logoutCarSocket();
            });
        };
        quickSearchController.prototype.logoutCarSocket = function () {
            this.socketFactory.unSubscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.CarSearch);
        };
        quickSearchController.prototype.searchByQuick = function (data) {
            var self = this;
            if (self.activeSearchParams.keyWord !== data.keyword) {
                self.selectAreaArr = [];
                self.selectTime = 3;
            }
            self.keyWord = data.keyword;
            var quickSearchParams = {
                "keyWord": data.keyword,
                "keyWords": [],
                "arrObjectID": [],
                "areaId": self.selectAreaArr,
                "objectType": "All",
                "currentPage": 1,
                "pageSize": 10,
                "userId": self.userInfoCacheFactory.getCurrentUserId(),
                "orderBy": {
                    "isAsc": false
                },
                "isFirstSearch": true
            };
            if (data.deviceArrId.length > 0) {
                quickSearchParams.arrObjectID = data.deviceArrId;
            }
            else {
                var systemPointList = self.$scope.$parent.$parent.$parent.$parent.systemPoint;
                var deviceIds_1 = [];
                _(systemPointList).forEach(function (value) {
                    deviceIds_1.push(value.ObjectID);
                });
                quickSearchParams.arrObjectID = deviceIds_1;
            }
            if (data.objectType) {
                quickSearchParams.objectType = data.objectType;
            }
            var keyWordArr = [];
            keyWordArr = data.keyword.split(" ");
            quickSearchParams.keyWords = keyWordArr;
            quickSearchParams.RelationType = "AND";
            var crossTime = self.attributeFactory.getCrossTrainTime(self.selectTime);
            quickSearchParams.startTime = crossTime.startTime;
            quickSearchParams.endTime = crossTime.endTime;
            self.activeSearchParams = quickSearchParams;
            self.getServerMessage(quickSearchParams, true);
        };
        quickSearchController.prototype.searchByFace = function (data) {
            var self = this;
            var systemData = self.systemInfoCacheFactory.getSystemInfo();
            var featureSearchExt = [];
            var fetureTaskParam = [];
            _.forEach(data.faceInfo, function (value, key) {
                if (value.featureSearchExt) {
                    featureSearchExt.push(value.featureSearchExt);
                }
                else {
                    fetureTaskParam.push(value.fetureTaskParam);
                }
            });
            if ((self.activeSearchParams.featureSearchExt !== featureSearchExt) || (self.activeSearchParams.fetureTaskParam !== fetureTaskParam)) {
                self.selectAreaArr = [];
                self.selectTime = 3;
            }
            var socketSearchParams = {
                "featureSearchExt": featureSearchExt,
                "fetureTaskParam": fetureTaskParam,
                "orderBy": {
                    "isAsc": false
                },
                "imagePath": "Face",
                "isFirstSearch": false,
                "threshold": systemData.IdentityValue || 75,
                "userId": self.userInfoCacheFactory.getCurrentUserId(),
                "arrCameraId": [],
                "arrAreaID": self.selectAreaArr
            };
            if (data.deviceArrId.length > 0) {
                socketSearchParams.arrObjectID = data.deviceArrId;
            }
            else {
                var systemPointList = self.$scope.$parent.$parent.$parent.$parent.systemPoint;
                var deviceIds_2 = [];
                _(systemPointList).forEach(function (value) {
                    if (ObjectType_1.ObjectType.Camera.value === value.ObjectType) {
                        deviceIds_2.push(value.ObjectID);
                    }
                });
                socketSearchParams.arrObjectID = deviceIds_2;
            }
            var crossTime = self.attributeFactory.getCrossTrainTime(self.selectTime);
            socketSearchParams.startTime = crossTime.startTime;
            socketSearchParams.endTime = crossTime.endTime;
            self.activeSearchParams = socketSearchParams;
            self.websocketQuickSearch(socketSearchParams);
        };
        quickSearchController.prototype.searchByCar = function (data) {
            var self = this;
            var systemData = self.systemInfoCacheFactory.getSystemInfo();
            var featureSearchExt = [];
            var fetureTaskParam = [];
            _.forEach(data.carInfo, function (value, key) {
                if (value.featureSearchExt) {
                    featureSearchExt.push(value.featureSearchExt);
                }
                else {
                    fetureTaskParam.push(value.fetureTaskParam);
                }
            });
            if ((self.activeSearchParams.featureSearchExt !== featureSearchExt) || (self.activeSearchParams.fetureTaskParam !== fetureTaskParam)) {
                self.selectAreaArr = [];
                self.selectTime = 3;
            }
            var socketSearchParams = {
                "featureSearchExt": featureSearchExt,
                "fetureTaskParam": fetureTaskParam,
                "orderBy": {
                    "isAsc": false
                },
                "imagePath": "Car",
                "isFirstSearch": false,
                "threshold": systemData.IdentityValue || 75,
                "userId": self.userInfoCacheFactory.getCurrentUserId(),
                "arrObjectID": [],
                "arrAreaID": self.selectAreaArr
            };
            if (data.deviceArrId.length > 0) {
                socketSearchParams.arrObjectID = data.deviceArrId;
            }
            else {
                var systemPointList = self.$scope.$parent.$parent.$parent.$parent.systemPoint;
                var deviceIds_3 = [];
                _(systemPointList).forEach(function (value) {
                    if (ObjectType_1.ObjectType.RmpGate.value === value.ObjectType) {
                        deviceIds_3.push(value.ObjectID);
                    }
                });
                socketSearchParams.arrObjectID = deviceIds_3;
            }
            var crossTime = self.attributeFactory.getCrossTrainTime(self.selectTime);
            socketSearchParams.startTime = crossTime.startTime;
            socketSearchParams.endTime = crossTime.endTime;
            self.activeSearchParams = socketSearchParams;
            self.websocketQuickSearchByCar(socketSearchParams);
        };
        quickSearchController.prototype.getServerMessage = function (quickSearchParams, type) {
            var self = this;
            if (type) {
                self.initPageParams();
                resourceRetrievalEnum_1.SetHistoryQueryRecord(quickSearchParams);
            }
            self.resourceRetrievalService.searchQuickByPromise(quickSearchParams).then(function (res) {
                if (quickSearchParams.objectType === "All") {
                    self.queryEndTime = (new Date()).valueOf();
                    if (res.count) {
                        self.queryTotal = res.count;
                    }
                }
                if (res.code = 200) {
                    if (res.data.Vehicle && res.data.Vehicle.TotalCount > 0) {
                        self.disposeCommonData(self.carResult, res.data.Vehicle, ResourceType_1.ResourceTypeEnum[2].value);
                    }
                    else if (type) {
                        self.carResult.pageParams.totalCount = 0;
                        self.carResult.pageParams.pageCount = 0;
                        self.carResult.data = [];
                    }
                    if (res.data.Face && res.data.Face.TotalCount > 0) {
                        self.disposeCommonData(self.faceResult, res.data.Face, ResourceType_1.ResourceTypeEnum[1].value);
                    }
                    else if (type) {
                        self.faceResult.pageParams.totalCount = 0;
                        self.faceResult.pageParams.pageCount = 0;
                        self.faceResult.data = [];
                    }
                    if (res.data.WiFi && res.data.WiFi.TotalCount > 0) {
                        self.disposeCommonData(self.wifiResult, res.data.WiFi, ResourceType_1.ResourceTypeEnum[5].value);
                    }
                    else if (type) {
                        self.wifiResult.pageParams.totalCount = 0;
                        self.wifiResult.pageParams.pageCount = 0;
                        self.wifiResult.data = [];
                    }
                    if (res.data.EFENCE && res.data.EFENCE.TotalCount > 0) {
                        self.disposeCommonData(self.electronicResult, res.data.EFENCE, ResourceType_1.ResourceTypeEnum[7].value);
                    }
                    else if (type) {
                        self.electronicResult.pageParams.totalCount = 0;
                        self.electronicResult.pageParams.pageCount = 0;
                        self.electronicResult.data = [];
                    }
                    if (type) {
                        self.deviceStatus = true;
                        self.RmpGateResultPagination.set(res.data.DeviceRmpGate.Result);
                        self.deviceRmpGateResult.pageSize = 6;
                        self.deviceRmpGateResult.currentPage = 1;
                        self.deviceRmpGateResult = self.RmpGateResultPagination.getByPage(self.deviceRmpGateResult);
                        self.CameraResultPagination.set(res.data.DeviceCamera.Result);
                        self.deviceCameraResult.pageSize = 6;
                        self.deviceCameraResult.currentPage = 1;
                        self.deviceCameraResult = self.CameraResultPagination.getByPage(self.deviceCameraResult);
                        self.WifiResultPagination.set(res.data.DeviceWiFi.Result);
                        self.deviceWifiResult.pageSize = 6;
                        self.deviceWifiResult.currentPage = 1;
                        self.deviceWifiResult = self.WifiResultPagination.getByPage(self.deviceWifiResult);
                        self.ElectronicResultPagination.set(res.data.DeviceEFENCE.Result);
                        self.deviceElectronicResult.pageSize = 6;
                        self.deviceElectronicResult.currentPage = 1;
                        self.deviceElectronicResult = self.ElectronicResultPagination.getByPage(self.deviceElectronicResult);
                    }
                }
                self.$scope.$emit("search-request-loading", false);
            }).catch(function (err) {
                self.$scope.$emit("search-request-loading", false);
            });
            self.searchBar = true;
        };
        quickSearchController.prototype.dealSocketData = function () {
            var self = this;
            self.switchButton[0].visible = false;
            self.switchButton[1].visible = true;
            self.switchPage = self.switchButton[1];
            var min = self.faceResult.pageParams.pageSize * (self.faceResult.pageParams.currentPage - 1);
            var max = self.faceResult.pageParams.pageSize * self.faceResult.pageParams.currentPage;
            var newData = {
                Result: [],
                TotalCount: self.socketData.TotalCount,
                TaskId: self.socketData.TaskId
            };
            for (var i = min; i < max && i < self.socketData.TotalCount; i++) {
                newData.Result.push(self.socketData.Result[i]);
            }
            self.disposeCommonData(self.socketData, newData, ResourceType_1.ResourceTypeEnum[1].value);
        };
        quickSearchController.prototype.dealSocketCarData = function () {
            var self = this;
            self.switchButton[0].visible = true;
            self.switchPage = self.switchButton[0];
            var carResultData = [];
            var min = self.carResult.pageParams.pageSize * (self.carResult.pageParams.currentPage - 1);
            var max = self.carResult.pageParams.pageSize * self.carResult.pageParams.currentPage;
            var newData = {
                Result: [],
                TotalCount: self.socketCarData.TotalCount,
                TaskId: self.socketCarData.TaskId
            };
            for (var i = min; i < max && i < self.socketCarData.TotalCount; i++) {
                newData.Result.push(self.socketCarData.Result[i]);
            }
            self.disposeCommonData(self.socketCarData, newData, ResourceType_1.ResourceTypeEnum[2].value);
        };
        quickSearchController.prototype.disposeCommonData = function (resultData, data, type) {
            var self = this;
            var params = {
                deviceIds: [],
                deviceType: '',
                ids: [],
                userId: self.userInfoCacheFactory.getCurrentUserId()
            };
            if (type === ResourceType_1.ResourceTypeEnum[2].value) {
                params.deviceType = ObjectType_1.ObjectType.RmpGate.value;
                _.forEach(data.Result, function (value) {
                    params.deviceIds.push(value.deviceId);
                    params.ids.push(value.id);
                });
            }
            if (type === ResourceType_1.ResourceTypeEnum[1].value) {
                params.deviceType = ObjectType_1.ObjectType.Camera.value;
                _.forEach(data.Result, function (value) {
                    params.deviceIds.push(value.AccessLog.CameraID);
                    params.ids.push(value.AccessLog.ID);
                });
            }
            if (type === ResourceType_1.ResourceTypeEnum[5].value) {
                params.deviceType = ObjectType_1.ObjectType.Wifi.value;
                _.forEach(data.Result, function (value) {
                    params.deviceIds.push(value.wifiLog.MacDeviceId);
                    params.ids.push(value.wifiLog.ID);
                });
            }
            if (type === ResourceType_1.ResourceTypeEnum[7].value) {
                params.deviceType = ObjectType_1.ObjectType.ElectronicFence.value;
                _.forEach(data.Result, function (value) {
                    params.deviceIds.push(value.eFenceLog.MobileDeviceId);
                    params.ids.push(value.eFenceLog.ID);
                });
            }
            self.resourceRetrievalService.getDeviceInfoPromise(params).then(function (res) {
                _.forEach(data.Result, function (item, index) {
                    item.deviceInfo = res.data.deviceInfo[index];
                    item.collectStatus = res.data.collectStatus[index];
                });
                if (type === ResourceType_1.ResourceTypeEnum[2].value) {
                    self.$timeout(function () {
                        self.carResult.pageParams.totalCount = data.TotalCount;
                        self.carResult.pageParams.pageCount = Math.ceil(data.TotalCount / self.carResult.pageParams.pageSize);
                        self.carResult.data = data.Result;
                        self.carResult.taskId = data.TaskId;
                        self.$scope.$emit("search-request-loading", false);
                    });
                }
                if (type === ResourceType_1.ResourceTypeEnum[1].value) {
                    self.$timeout(function () {
                        self.faceResult.pageParams.totalCount = data.TotalCount;
                        self.faceResult.pageParams.pageCount = Math.ceil(data.TotalCount / self.faceResult.pageParams.pageSize);
                        self.faceResult.data = data.Result;
                        self.faceResult.taskId = data.TaskId;
                        self.$scope.$emit("search-request-loading", false);
                    });
                }
                if (type === ResourceType_1.ResourceTypeEnum[5].value) {
                    self.$timeout(function () {
                        self.wifiResult.pageParams.totalCount = data.TotalCount;
                        self.wifiResult.pageParams.pageCount = Math.ceil(data.TotalCount / self.wifiResult.pageParams.pageSize);
                        self.wifiResult.data = data.Result;
                        self.wifiResult.taskId = data.TaskId;
                    });
                }
                if (type === ResourceType_1.ResourceTypeEnum[7].value) {
                    self.$timeout(function () {
                        self.electronicResult.pageParams.totalCount = data.TotalCount;
                        self.electronicResult.pageParams.pageCount = Math.ceil(data.TotalCount / self.electronicResult.pageParams.pageSize);
                        self.electronicResult.data = data.Result;
                        self.electronicResult.taskId = data.TaskId;
                    });
                }
            });
        };
        quickSearchController.prototype.deviceEmpty = function () {
            var self = this;
            self.deviceStatus = false;
            self.RmpGateResultPagination.set([]);
            self.deviceRmpGateResult.pageSize = 6;
            self.deviceRmpGateResult.currentPage = 1;
            self.deviceRmpGateResult = self.RmpGateResultPagination.getByPage(self.deviceRmpGateResult);
            self.CameraResultPagination.set([]);
            self.deviceCameraResult.pageSize = 6;
            self.deviceCameraResult.currentPage = 1;
            self.deviceCameraResult = self.CameraResultPagination.getByPage(self.deviceCameraResult);
            self.WifiResultPagination.set([]);
            self.deviceWifiResult.pageSize = 6;
            self.deviceWifiResult.currentPage = 1;
            self.deviceWifiResult = self.WifiResultPagination.getByPage(self.deviceWifiResult);
            self.ElectronicResultPagination.set([]);
            self.deviceElectronicResult.pageSize = 6;
            self.deviceElectronicResult.currentPage = 1;
            self.deviceElectronicResult = self.ElectronicResultPagination.getByPage(self.deviceElectronicResult);
        };
        quickSearchController.prototype.changePage = function (num, type) {
            var self = this;
            var pageParams;
            var keyWord = self.keyWord, currentPage = num, objectType, pageSize, taskId;
            switch (type) {
                case "carResult":
                    self.carResult.pageParams.currentPage = num;
                    pageParams = self.carResult.pageParams;
                    objectType = "Vehicle";
                    pageSize = self.carResult.pageParams.pageSize;
                    taskId = self.carResult.taskId;
                    break;
                case "faceResult":
                    self.faceResult.pageParams.currentPage = num;
                    pageParams = self.faceResult.pageParams;
                    objectType = "Face";
                    pageSize = self.faceResult.pageParams.pageSize;
                    taskId = self.faceResult.taskId;
                    break;
                case "wifiResult":
                    self.wifiResult.pageParams.currentPage = num;
                    pageParams = self.wifiResult.pageParams;
                    objectType = "WiFi";
                    pageSize = self.wifiResult.pageParams.pageSize;
                    taskId = self.wifiResult.taskId;
                    break;
                case "eleResult":
                    self.electronicResult.pageParams.currentPage = num;
                    pageParams = self.electronicResult.pageParams;
                    objectType = "EFENCE";
                    pageSize = self.electronicResult.pageParams.pageSize;
                    taskId = self.electronicResult.taskId;
                    break;
                case "position":
                    self.positionResult.pageParams.currentPage = num;
                    pageParams = self.positionResult.pageParams;
                    break;
                default:
                    return null;
            }
            var quickSearchParams = {
                "keyWord": keyWord,
                "keyWords": [],
                "objectType": objectType,
                "currentPage": currentPage,
                "pageSize": pageSize,
                "userId": self.userInfoCacheFactory.getCurrentUserId(),
                "orderBy": {
                    "isAsc": false
                },
                "taskId": taskId,
                "isFirstSearch": false
            };
            var keyWordArr = [];
            keyWordArr = keyWord.split(" ");
            quickSearchParams.keyWords = keyWordArr;
            if (self.socketQueryData.type === "quick") {
                self.getServerMessage(quickSearchParams, false);
            }
            else if (self.socketQueryData.type === "Face") {
                self.dealSocketData();
            }
            else if (self.socketQueryData.type === "Car") {
                self.dealSocketCarData();
            }
            return pageParams;
        };
        ;
        quickSearchController.prototype.changePageDevice = function (num, type) {
            var self = this;
            switch (type) {
                case "deviceCameraResult":
                    self.deviceCameraResult.currentPage = num;
                    self.deviceCameraResult = self.CameraResultPagination.getByPage(self.deviceCameraResult);
                    break;
                case "deviceRmpGateResult":
                    self.deviceRmpGateResult.currentPage = num;
                    self.deviceRmpGateResult = self.RmpGateResultPagination.getByPage(self.deviceRmpGateResult);
                    break;
                case "deviceWifiResult":
                    self.deviceWifiResult.currentPage = num;
                    self.deviceWifiResult = self.WifiResultPagination.getByPage(self.deviceWifiResult);
                    break;
                case "deviceElectronicResult":
                    self.deviceElectronicResult.currentPage = num;
                    self.deviceElectronicResult = self.ElectronicResultPagination.getByPage(self.deviceElectronicResult);
                    break;
            }
        };
        ;
        quickSearchController.prototype.navigationSwitch = function (name) {
            var self = this;
            var switchNav = angular.copy(self.switchButton);
            switchNav.forEach(function (Title) {
                if (Title.name === name) {
                    Title.visible = true;
                    self.switchPage = Title;
                }
                else {
                    Title.visible = false;
                }
            });
            self.switchButton = switchNav;
        };
        ;
        quickSearchController.prototype.searchSwitch = function () {
            this.searchBar = !this.searchBar;
        };
        ;
        quickSearchController.prototype.lastQuery = function () {
            var self = this;
            var lastQueryRecord = resourceRetrievalEnum_1.GetLastQueryRecord();
            if (lastQueryRecord) {
                lastQueryRecord = lastQueryRecord.value;
                self.$scope.$emit('last-query', lastQueryRecord);
                if (lastQueryRecord.keyWord !== "") {
                    self.getServerMessage(lastQueryRecord, true);
                }
                else if (lastQueryRecord.imagePath === "Face") {
                    self.websocketQuickSearch(lastQueryRecord);
                }
                else if (lastQueryRecord.imagePath === "Car") {
                    self.websocketQuickSearchByCar(lastQueryRecord);
                }
            }
            else {
                self.layerDec.info('未找到历史查询记录');
            }
        };
        quickSearchController.prototype.selectArea = function () {
            var scope = this.$scope.$new();
            scope.selectCtrlCb = this.selectAreaCb;
            scope.selectCameraList = this.selectAreaArr;
            this.seleAreaId = this.layer.open({
                type: 1,
                content: treeAreapopupHtml,
                scope: scope,
                title: "选择区域",
                area: ["710px", "620px"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        quickSearchController.prototype.searchClearParams = function () {
            this.selectTime = 3;
            this.selectAreaArr = [];
        };
        quickSearchController.prototype.websocketQuickSearch = function (socketSearchParams) {
            var self = this;
            self.$scope.$emit("search-request-loading", true);
            self.initPageParams();
            resourceRetrievalEnum_1.SetHistoryQueryRecord(socketSearchParams);
            self.initParams();
            self.resourceRetrievalService.advancedSearchByFace(socketSearchParams).then(function (res) {
                if (res.code === 200) {
                    self.monitorFaceSocket();
                }
                else {
                    self.$scope.$emit("search-request-loading", false);
                }
            });
        };
        quickSearchController.prototype.websocketQuickSearchByCar = function (socketSearchParams) {
            var self = this;
            self.$scope.$emit("search-request-loading", true);
            self.initPageParams();
            resourceRetrievalEnum_1.SetHistoryQueryRecord(socketSearchParams);
            self.initParams();
            self.resourceRetrievalService.advancedSearchByCar(socketSearchParams).then(function (res) {
                if (res.code === 200) {
                    self.monitorCarSocket();
                }
                else {
                    self.$scope.$emit("search-request-loading", false);
                }
            });
        };
        quickSearchController.$inject = ["$scope", "$timeout", "resourceRetrievalService", "layer", "socketFactory", "userInfoCacheFactory", "layerDec", "systemInfoCacheFactory"];
        return quickSearchController;
    }());
    main_app_1.app.controller("quickSearchController", quickSearchController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvc2VhcmNoL3F1aWNrU2VhcmNoL3F1aWNrU2VhcmNoLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBbUVBO1FBMkRJLCtCQUFvQixNQUFXLEVBQ1gsUUFBa0IsRUFDbEIsd0JBQW1ELEVBQ25ELEtBQVUsRUFDVixhQUE2QixFQUM3QixvQkFBMkMsRUFDM0MsUUFBbUIsRUFDbkIsc0JBQWdEO1lBUGhELFdBQU0sR0FBTixNQUFNLENBQUs7WUFDWCxhQUFRLEdBQVIsUUFBUSxDQUFVO1lBQ2xCLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMkI7WUFDbkQsVUFBSyxHQUFMLEtBQUssQ0FBSztZQUNWLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtZQUM3Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXVCO1lBQzNDLGFBQVEsR0FBUixRQUFRLENBQVc7WUFDbkIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUEwQjtZQXJEcEUsd0JBQW1CLEdBQXdCLElBQUksZ0NBQW1CLEVBQUUsQ0FBQztZQUNyRSw0QkFBdUIsR0FBZ0IsSUFBSSx1QkFBVSxFQUFFLENBQUM7WUFFeEQsdUJBQWtCLEdBQXdCLElBQUksZ0NBQW1CLEVBQUUsQ0FBQztZQUNwRSwyQkFBc0IsR0FBZ0IsSUFBSSx1QkFBVSxFQUFFLENBQUM7WUFFdkQscUJBQWdCLEdBQXdCLElBQUksZ0NBQW1CLEVBQUUsQ0FBQztZQUNsRSx5QkFBb0IsR0FBZ0IsSUFBSSx1QkFBVSxFQUFFLENBQUM7WUFFckQsMkJBQXNCLEdBQXdCLElBQUksZ0NBQW1CLEVBQUUsQ0FBQztZQUN4RSwrQkFBMEIsR0FBZ0IsSUFBSSx1QkFBVSxFQUFFLENBQUM7WUFFM0QsYUFBUSxHQUFZLElBQUksQ0FBQztZQUN6QixlQUFVLEdBQVksSUFBSSxDQUFDO1lBQzNCLGNBQVMsR0FBWSxJQUFJLENBQUM7WUFDMUIsaUJBQVksR0FBWSxLQUFLLENBQUM7WUFDOUIsWUFB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Q0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHdCQUF3QixFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN2RCxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBbnlCTSw2QkFBTyxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSwwQkFBMEIsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLHNCQUFzQixFQUFFLFVBQVUsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO1FBb3lCaEssNEJBQUM7S0FyeUJELEFBcXlCQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9yZXNvdXJjZVJldHJpZXZhbC9zZWFyY2gvcXVpY2tTZWFyY2gvcXVpY2tTZWFyY2guY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vLi4vLi4vc2VsZWN0UG9wdXAvdHJlZUFyZWEvVHJlZUFyZWEuaHRtbFwiIG5hbWU9XCJ0cmVlQXJlYXBvcHVwSHRtbFwiIC8+XHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5cclxuLy8g5by55qGGXHJcbmltcG9ydCAnLi4vLi4vLi4vc2VsZWN0UG9wdXAvdHJlZUFyZWEvVHJlZUFyZWEnXHJcblxyXG4vLyDmkJzntKLnu5PmnpxcclxuaW1wb3J0IFwiLi9kZXZpY2VQYWdlL2NhclNlYXJjaFBhZ2UuY29udHJvbGxlclwiO1xyXG5pbXBvcnQgXCIuL2RldmljZVBhZ2UvcGVyc29uU2VhcmNoUGFnZS5jb250cm9sbGVyXCI7XHJcbmltcG9ydCBcIi4vZGV2aWNlUGFnZS93aWZpU2VhcmNoUGFnZS5jb250cm9sbGVyXCI7XHJcbmltcG9ydCBcIi4vZGV2aWNlUGFnZS9FRlNlYXJjaFBhZ2UuY29udHJvbGxlclwiO1xyXG5pbXBvcnQgXCIuL2RldmljZVBhZ2UvZGV2aWNlU2VhcmNoUGFnZS5jb250cm9sbGVyXCI7XHJcbmltcG9ydCBcIi4vZGV2aWNlUGFnZS9wb3NpdGlvblNlYXJjaFBhZ2UuY29udHJvbGxlclwiO1xyXG5cclxuLy8g5pyN5YqhXHJcbmltcG9ydCBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9yZXNvdXJjZVJldHJpZXZhbC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SVJlc291cmNlUmV0cmlldmFsU2VydmljZX0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9yZXNvdXJjZVJldHJpZXZhbC5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uLy4uLy4uL2NvbW1vbi9mYWN0b3J5L3NvY2tldC5mYWN0b3J5XCI7XHJcbmltcG9ydCB7SVNvY2tldEZhY3Rvcnl9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZmFjdG9yeS9zb2NrZXQuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCIuLi8uLi8uLi9jb21tb24vZmFjdG9yeS9sYXllck1zZy5mYWN0b3J5XCI7XHJcbmltcG9ydCB7IElMYXllckRlYyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZmFjdG9yeS9sYXllck1zZy5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uLy4uLy4uL2NvbW1vbi9mYWN0b3J5L3VzZXJpbmZvLmNhY2hlLmZhY3RvcnlcIjtcclxuaW1wb3J0IHtJVXNlckluZm9DYWNoZUZhY3Rvcnl9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZmFjdG9yeS91c2VyaW5mby5jYWNoZS5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uLy4uLy4uL2NvbW1vbi9mYWN0b3J5L3N5c3RlbUluZm8uY2FjaGUuZmFjdG9yeVwiO1xyXG5pbXBvcnQge0lTeXN0ZW1JbmZvQ2FjaGVQcm92aWRlcn0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9mYWN0b3J5L3N5c3RlbUluZm8uY2FjaGUuZmFjdG9yeVwiO1xyXG5cclxuLy8g5YWs55So5pa55rOVXHJcbmltcG9ydCB7QXR0cmlidXRlRmFjdG9yeX0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9mYWN0b3J5L2F0dHJpYnV0ZS5mYWN0b3J5XCI7XHJcbmltcG9ydCB7U3lzdGVtQ29uZmlnUGFyYW1zfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9lbnRpdHkvU3lzdGVtQ29uZmlnUGFyYW1zXCI7XHJcbmltcG9ydCB7U3lzdGVtUG9pbnR9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2VudGl0eS9TeXN0ZW1Qb2ludFwiO1xyXG5pbXBvcnQge1xyXG4gICAgY2FyLFxyXG4gICAgY2FySXRlbSxcclxuICAgIGluaXRDYXJSZXN1bHQsXHJcbiAgICBmYWNlLFxyXG4gICAgZmFjZUl0ZW0sXHJcbiAgICBpbml0RmFjZVJlc3VsdCxcclxuICAgIHdpZmlJdGVtLFxyXG4gICAgaW5pdFdpZmlSZXN1bHQsXHJcbiAgICBlbGVjdHJvbmljSXRlbSxcclxuICAgIGluaXRFbGVjdHJvbmljUmVzdWx0LFxyXG4gICAgcG9zaXRpb25JdGVtLFxyXG4gICAgaW5pdFBvc2l0aW9uUmVzdWx0LFxyXG4gICAgZGV2aWNlSXRlbSxcclxuICAgIGluaXREZXZpY2VSZXN1bHQsXHJcbiAgICBRdWlja1NlYXJjaFBhcmFtcyxcclxuICAgIFNldEhpc3RvcnlRdWVyeVJlY29yZCxcclxuICAgIEdldExhc3RRdWVyeVJlY29yZFxyXG59IGZyb20gXCIuLi8uLi9yZXNvdXJjZVJldHJpZXZhbEVudW1cIjtcclxuaW1wb3J0IHtPYmplY3RUeXBlfSBmcm9tICcuLi8uLi8uLi8uLi9jb3JlL2VudW0vT2JqZWN0VHlwZSc7XHJcbmltcG9ydCB7U29ja2V0UmVzdWx0VHlwZUVudW19IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL1NvY2tldFJlc3VsdFR5cGVFbnVtXCI7XHJcbmltcG9ydCB7UmVzb3VyY2VUeXBlRW51bX0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vUmVzb3VyY2VUeXBlXCI7XHJcblxyXG4vLyDliIbpobXmlrnms5VcclxuaW1wb3J0IHtQYWdlUGFyYW1zQW5kUmVzdWx0LCBQYWdpbmF0aW9uLCBJUGFnaW5hdGlvbn0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL1BhZ2luYXRpb24nXHJcbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xyXG5cclxuZGVjbGFyZSBsZXQgYW5ndWxhcjogYW55LCB0cmVlQXJlYXBvcHVwSHRtbDogYW55O1xyXG5cclxuLy8g5p+l6K+i5qih5Z2X5YiH5o2iXHJcbmludGVyZmFjZSBJU3dpdGNoUGFnZSB7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgaWNvblBhdGg6IHN0cmluZztcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHZpc2libGU6IGJvb2xlYW47XHJcbn1cclxuXHJcbmNsYXNzIHF1aWNrU2VhcmNoQ29udHJvbGxlciB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFtcIiRzY29wZVwiLCBcIiR0aW1lb3V0XCIsIFwicmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlXCIsIFwibGF5ZXJcIiwgXCJzb2NrZXRGYWN0b3J5XCIsIFwidXNlckluZm9DYWNoZUZhY3RvcnlcIiwgXCJsYXllckRlY1wiLCBcInN5c3RlbUluZm9DYWNoZUZhY3RvcnlcIl07XHJcblxyXG4gICAgc3dpdGNoQnV0dG9uOiBBcnJheTxJU3dpdGNoUGFnZT47XHJcbiAgICBzd2l0Y2hQYWdlOiBJU3dpdGNoUGFnZTtcclxuXHJcbiAgICBjYXJSZXN1bHQ6IGNhckl0ZW07IC8vIOi9pui+huafpeivouaVsOaNrlxyXG4gICAgZmFjZVJlc3VsdDogZmFjZUl0ZW07IC8vIOS6uuiEuOafpeivouaVsOaNrlxyXG4gICAgd2lmaVJlc3VsdDogd2lmaUl0ZW07IC8vIHdpZmnmn6Xor6LmlbDmja5cclxuICAgIGVsZWN0cm9uaWNSZXN1bHQ6IGVsZWN0cm9uaWNJdGVtOyAvLyDnlLXlm7Tmn6Xor6LmlbDmja5cclxuICAgIHJmaWRSZXN1bHQ6IHdpZmlJdGVtOyAvLyByZmlk5p+l6K+i5pWw5o2uXHJcbiAgICBwb3NpdGlvblJlc3VsdDogcG9zaXRpb25JdGVtOyAvLyDkvY3nva7mn6Xor6LmlbDmja5cclxuXHJcbiAgICBkZXZpY2VSbXBHYXRlUmVzdWx0OiBQYWdlUGFyYW1zQW5kUmVzdWx0ID0gbmV3IFBhZ2VQYXJhbXNBbmRSZXN1bHQoKTtcclxuICAgIFJtcEdhdGVSZXN1bHRQYWdpbmF0aW9uOiBJUGFnaW5hdGlvbiA9IG5ldyBQYWdpbmF0aW9uKCk7XHJcblxyXG4gICAgZGV2aWNlQ2FtZXJhUmVzdWx0OiBQYWdlUGFyYW1zQW5kUmVzdWx0ID0gbmV3IFBhZ2VQYXJhbXNBbmRSZXN1bHQoKTtcclxuICAgIENhbWVyYVJlc3VsdFBhZ2luYXRpb246IElQYWdpbmF0aW9uID0gbmV3IFBhZ2luYXRpb24oKTtcclxuXHJcbiAgICBkZXZpY2VXaWZpUmVzdWx0OiBQYWdlUGFyYW1zQW5kUmVzdWx0ID0gbmV3IFBhZ2VQYXJhbXNBbmRSZXN1bHQoKTtcclxuICAgIFdpZmlSZXN1bHRQYWdpbmF0aW9uOiBJUGFnaW5hdGlvbiA9IG5ldyBQYWdpbmF0aW9uKCk7XHJcblxyXG4gICAgZGV2aWNlRWxlY3Ryb25pY1Jlc3VsdDogUGFnZVBhcmFtc0FuZFJlc3VsdCA9IG5ldyBQYWdlUGFyYW1zQW5kUmVzdWx0KCk7XHJcbiAgICBFbGVjdHJvbmljUmVzdWx0UGFnaW5hdGlvbjogSVBhZ2luYXRpb24gPSBuZXcgUGFnaW5hdGlvbigpO1xyXG5cclxuICAgIGhpZGVTaXplOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIGhpZGVHb3BhZ2U6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgc2VhcmNoQmFyOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIGRldmljZVN0YXR1czogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAga2V5V29yZDogc3RyaW5nID0gXCJcIjtcclxuICAgIHRpbWVMaXN0OiBBcnJheTx7IG5hbWU6IHN0cmluZywgaWQ6IG51bWJlciB9PiA9IFtcclxuICAgICAgICB7bmFtZTogJ+S4gOWkqScsIGlkOiAxfSxcclxuICAgICAgICB7bmFtZTogJ+S4gOWRqCcsIGlkOiAyfSxcclxuICAgICAgICB7bmFtZTogJ+S4gOaciCcsIGlkOiAzfVxyXG4gICAgXTtcclxuICAgIHNlbGVjdFRpbWU6IG51bWJlciA9IDM7XHJcbiAgICAvLyDmn6Xor6Lml7bpl7TkuI7mn6Xor6LmgLvmlbBcclxuICAgIHF1ZXJ5U3RhcnRUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcXVlcnlFbmRUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcXVlcnlUb3RhbDogbnVtYmVyID0gMDtcclxuICAgIHNlbGVBcmVhSWQ6IHN0cmluZztcclxuICAgIGRldmljZUFycklkOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICBzZWxlY3RBcmVhQXJyOiBBcnJheTxhbnk+ID0gW107XHJcbiAgICAvLyDlhaznlKjmlrnms5VcclxuICAgIGF0dHJpYnV0ZUZhY3Rvcnk6IEF0dHJpYnV0ZUZhY3RvcnkgPSBuZXcgQXR0cmlidXRlRmFjdG9yeSgpO1xyXG5cclxuICAgIC8vIHNvY2tldOe8k+WtmOaVsOaNrlxyXG4gICAgc29ja2V0RGF0YTogYW55O1xyXG4gICAgc29ja2V0Q2FyRGF0YTogYW55O1xyXG4gICAgc29ja2V0UXVlcnlEYXRhOiBhbnk7XHJcblxyXG4gICAgLy8g6K6+5aSH5L+h5oGvXHJcbiAgICBhY3RpdmVTZWFyY2hQYXJhbXM6IGFueSA9IHtcclxuICAgICAgICBrZXlXb3JkOiBcIlwiLFxyXG4gICAgICAgIHRhc2tJZDogXCJcIixcclxuICAgICAgICBmZWF0dXJlU2VhcmNoRXh0OiBcIlwiXHJcbiAgICB9O1xyXG4gICAgc2VsZWN0QXJlYUNiOiBzdHJpbmcgPSBcImNsb3NlLmFyZWEucG9wdXBcIjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogRnVuY3Rpb24sXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJlc291cmNlUmV0cmlldmFsU2VydmljZTogSVJlc291cmNlUmV0cmlldmFsU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbGF5ZXI6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgc29ja2V0RmFjdG9yeTogSVNvY2tldEZhY3RvcnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHVzZXJJbmZvQ2FjaGVGYWN0b3J5OiBJVXNlckluZm9DYWNoZUZhY3RvcnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGxheWVyRGVjOiBJTGF5ZXJEZWMsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHN5c3RlbUluZm9DYWNoZUZhY3Rvcnk6IElTeXN0ZW1JbmZvQ2FjaGVQcm92aWRlcikge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBzZWxmLmluaXRQYXJhbXMoKTtcclxuXHJcbiAgICAgICAgLy8g55uR5ZCs5Yy65Z+f6YCJ5oup5qCRXHJcbiAgICAgICAgc2VsZi4kc2NvcGUuJG9uKHNlbGYuc2VsZWN0QXJlYUNiLCBmdW5jdGlvbiAoZXZlbnQ6IGFueSwgYXJlYUlkczogQXJyYXk8c3RyaW5nPiwgc3RhdHVzOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFyZWFJZHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZWxlY3RBcmVhQXJyID0gYXJlYUlkc1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdEFyZWFBcnIgPSBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLmxheWVyLmNsb3NlKHNlbGYuc2VsZUFyZWFJZCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIOebkeWQrOeItumhtemdouW5v+aSreWPguaVsFxyXG4gICAgICAgIHNlbGYuJHNjb3BlLiRvbihcInZlcmlmeS1rZXl3b3JkXCIsIGZ1bmN0aW9uIChldmVudDogYW55LCBkYXRhOiBhbnkpIHtcclxuICAgICAgICAgICAgc2VsZi5xdWVyeVRvdGFsID0gMDtcclxuICAgICAgICAgICAgc2VsZi5xdWVyeVN0YXJ0VGltZSA9IChuZXcgRGF0ZSgpKS52YWx1ZU9mKCk7XHJcbiAgICAgICAgICAgIHNlbGYuc29ja2V0UXVlcnlEYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgc3dpdGNoIChkYXRhLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJxdWlja1wiOiBzZWxmLnNlYXJjaEJ5UXVpY2soZGF0YSk7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkZhY2VcIjogc2VsZi5zZWFyY2hCeUZhY2UoZGF0YSk7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkNhclwiOiBzZWxmLnNlYXJjaEJ5Q2FyKGRhdGEpOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0UGFyYW1zKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBzZWxmLnN3aXRjaEJ1dHRvbiA9IFtcclxuICAgICAgICAgICAge3RpdGxlOiBcIui9pui+hlwiLCBpY29uUGF0aDogXCIuLi8uLi8uLi9pbWFnZXMvcmVzb3VyY2VSZXRyaWV2YWwvc3dpdGNoLWNhci5wbmdcIiwgbmFtZTogXCJjYXJcIiwgdmlzaWJsZTogdHJ1ZX0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIuS6uuWDj1wiLFxyXG4gICAgICAgICAgICAgICAgaWNvblBhdGg6IFwiLi4vLi4vLi4vaW1hZ2VzL3Jlc291cmNlUmV0cmlldmFsL3N3aXRjaC1wZXJzb24ucG5nXCIsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInBlcnNvblwiLFxyXG4gICAgICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiV2ktRmlcIixcclxuICAgICAgICAgICAgICAgIGljb25QYXRoOiBcIi4uLy4uLy4uL2ltYWdlcy9yZXNvdXJjZVJldHJpZXZhbC9zd2l0Y2gtd2lmaS5wbmdcIixcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwid2lmaVwiLFxyXG4gICAgICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiUkZJRFwiLFxyXG4gICAgICAgICAgICAgICAgaWNvblBhdGg6IFwiLi4vLi4vLi4vaW1hZ2VzL3Jlc291cmNlUmV0cmlldmFsL3N3aXRjaC1yZmlkLnBuZ1wiLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJyZmlkXCIsXHJcbiAgICAgICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLnlLXlm7RcIixcclxuICAgICAgICAgICAgICAgIGljb25QYXRoOiBcIi4uLy4uLy4uL2ltYWdlcy9yZXNvdXJjZVJldHJpZXZhbC9zd2l0Y2hfZWxlY3Ryb25pY2ZlbmNlLnBuZ1wiLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJlbGVjdHJvbmljZmVuY2VcIixcclxuICAgICAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIuiuvuWkh1wiLFxyXG4gICAgICAgICAgICAgICAgaWNvblBhdGg6IFwiLi4vLi4vLi4vaW1hZ2VzL3Jlc291cmNlUmV0cmlldmFsL3N3aXRjaC1kZXZpY2UucG5nXCIsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImRldmljZVwiLFxyXG4gICAgICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi5L2N572uXCIsXHJcbiAgICAgICAgICAgICAgICBpY29uUGF0aDogXCIuLi8uLi8uLi9pbWFnZXMvcmVzb3VyY2VSZXRyaWV2YWwvc3dpdGNoLXBvc2l0aW9uLnBuZ1wiLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJwb3NpdGlvblwiLFxyXG4gICAgICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgc2VsZi5zd2l0Y2hQYWdlID0gc2VsZi5zd2l0Y2hCdXR0b25bMF07XHJcblxyXG4gICAgICAgIHNlbGYuaW5pdFBhZ2VQYXJhbXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRQYWdlUGFyYW1zKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAvLyDliJ3lp4vljJbmn6Xor6LmlbDmja5cclxuICAgICAgICBzZWxmLmNhclJlc3VsdCA9IGluaXRDYXJSZXN1bHQoMCk7XHJcbiAgICAgICAgc2VsZi5mYWNlUmVzdWx0ID0gaW5pdEZhY2VSZXN1bHQoMCk7XHJcbiAgICAgICAgc2VsZi53aWZpUmVzdWx0ID0gaW5pdFdpZmlSZXN1bHQoMCk7XHJcbiAgICAgICAgc2VsZi5lbGVjdHJvbmljUmVzdWx0ID0gaW5pdEVsZWN0cm9uaWNSZXN1bHQoKTtcclxuICAgICAgICBzZWxmLnJmaWRSZXN1bHQgPSBpbml0V2lmaVJlc3VsdCgwKTtcclxuICAgICAgICBzZWxmLnBvc2l0aW9uUmVzdWx0ID0gaW5pdFBvc2l0aW9uUmVzdWx0KCk7XHJcbiAgICAgICAgc2VsZi5kZXZpY2VTdGF0dXMgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbW9uaXRvckZhY2VTb2NrZXQoKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi5zb2NrZXRGYWN0b3J5LnN1YnNjcmliZShTb2NrZXRSZXN1bHRUeXBlRW51bS5GYWNlU2VhcmNoLCAocmVzdWx0OiBBcnJheTxhbnk+KSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYucXVlcnlFbmRUaW1lID0gKG5ldyBEYXRlKCkpLnZhbHVlT2YoKTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdFswXS5jb2RlID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHNlbGYucXVlcnlUb3RhbCA9IHJlc3VsdFswXS5kYXRhLkZhY2UuVG90YWxDb3VudDtcclxuICAgICAgICAgICAgICAgIHNlbGYuc29ja2V0RGF0YSA9IHJlc3VsdFswXS5kYXRhLkZhY2U7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRlYWxTb2NrZXREYXRhKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyDlkJHniLbpobXpnaLlub/mkq0tLeafpeivoue7k+adn1xyXG4gICAgICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGVtaXQoXCJzZWFyY2gtcmVxdWVzdC1sb2FkaW5nXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLmxvZ291dEZhY2VTb2NrZXQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvZ291dEZhY2VTb2NrZXQoKXtcclxuICAgICAgICB0aGlzLnNvY2tldEZhY3RvcnkudW5TdWJzY3JpYmUoU29ja2V0UmVzdWx0VHlwZUVudW0uRmFjZVNlYXJjaCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtb25pdG9yQ2FyU29ja2V0KCl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYuc29ja2V0RmFjdG9yeS5zdWJzY3JpYmUoU29ja2V0UmVzdWx0VHlwZUVudW0uQ2FyU2VhcmNoLCAocmVzdWx0OiBBcnJheTxhbnk+KSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYucXVlcnlFbmRUaW1lID0gKG5ldyBEYXRlKCkpLnZhbHVlT2YoKTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdFswXS5jb2RlID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHNlbGYucXVlcnlUb3RhbCA9IHJlc3VsdFswXS5kYXRhLlZlaGljbGUuVG90YWxDb3VudDtcclxuICAgICAgICAgICAgICAgIHNlbGYuc29ja2V0Q2FyRGF0YSA9IHJlc3VsdFswXS5kYXRhLlZlaGljbGU7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRlYWxTb2NrZXRDYXJEYXRhKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyDlkJHniLbpobXpnaLlub/mkq0tLeafpeivoue7k+adn1xyXG4gICAgICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGVtaXQoXCJzZWFyY2gtcmVxdWVzdC1sb2FkaW5nXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLmxvZ291dENhclNvY2tldCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9nb3V0Q2FyU29ja2V0KCl7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRGYWN0b3J5LnVuU3Vic2NyaWJlKFNvY2tldFJlc3VsdFR5cGVFbnVtLkNhclNlYXJjaCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5YWo5paH5qOA57SiXHJcbiAgICBwcml2YXRlIHNlYXJjaEJ5UXVpY2soZGF0YTogYW55KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIC8vIOafpeivouWGheWuueWPmOWMlumHjee9ruetm+mAieadoeS7tlxyXG4gICAgICAgIGlmIChzZWxmLmFjdGl2ZVNlYXJjaFBhcmFtcy5rZXlXb3JkICE9PSBkYXRhLmtleXdvcmQpIHtcclxuICAgICAgICAgICAgc2VsZi5zZWxlY3RBcmVhQXJyID0gW107XHJcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0VGltZSA9IDM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYua2V5V29yZCA9IGRhdGEua2V5d29yZDtcclxuICAgICAgICBsZXQgcXVpY2tTZWFyY2hQYXJhbXM6IFF1aWNrU2VhcmNoUGFyYW1zID0ge1xyXG4gICAgICAgICAgICBcImtleVdvcmRcIjogZGF0YS5rZXl3b3JkLFxyXG4gICAgICAgICAgICBcImtleVdvcmRzXCI6IFtdLFxyXG4gICAgICAgICAgICBcImFyck9iamVjdElEXCI6IFtdLFxyXG4gICAgICAgICAgICBcImFyZWFJZFwiOiBzZWxmLnNlbGVjdEFyZWFBcnIsXHJcbiAgICAgICAgICAgIFwib2JqZWN0VHlwZVwiOiBcIkFsbFwiLFxyXG4gICAgICAgICAgICBcImN1cnJlbnRQYWdlXCI6IDEsXHJcbiAgICAgICAgICAgIFwicGFnZVNpemVcIjogMTAsXHJcbiAgICAgICAgICAgIFwidXNlcklkXCI6IHNlbGYudXNlckluZm9DYWNoZUZhY3RvcnkuZ2V0Q3VycmVudFVzZXJJZCgpLFxyXG4gICAgICAgICAgICBcIm9yZGVyQnlcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJpc0FzY1wiOiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImlzRmlyc3RTZWFyY2hcIjogdHJ1ZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8g6K6+572u5p+l6K+i6K6+5aSHaWRcclxuICAgICAgICBpZihkYXRhLmRldmljZUFycklkLmxlbmd0aD4wKSB7XHJcbiAgICAgICAgICAgIHF1aWNrU2VhcmNoUGFyYW1zLmFyck9iamVjdElEID0gZGF0YS5kZXZpY2VBcnJJZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgc3lzdGVtUG9pbnRMaXN0OiBBcnJheTxTeXN0ZW1Qb2ludD4gPSBzZWxmLiRzY29wZS4kcGFyZW50LiRwYXJlbnQuJHBhcmVudC4kcGFyZW50LnN5c3RlbVBvaW50O1xyXG4gICAgICAgICAgICBsZXQgZGV2aWNlSWRzOkFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgICAgICAgICAgXyhzeXN0ZW1Qb2ludExpc3QpLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGRldmljZUlkcy5wdXNoKHZhbHVlLk9iamVjdElEKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHF1aWNrU2VhcmNoUGFyYW1zLmFyck9iamVjdElEID0gZGV2aWNlSWRzO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDmmK/lkKbmmK/ljZXnsbvmo4DntKJcclxuICAgICAgICBpZiAoZGF0YS5vYmplY3RUeXBlKSB7XHJcbiAgICAgICAgICAgIHF1aWNrU2VhcmNoUGFyYW1zLm9iamVjdFR5cGUgPSBkYXRhLm9iamVjdFR5cGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWIpOaWreaYr+WkmuWFs+mUruivjeajgOe0olxyXG4gICAgICAgIGxldCBrZXlXb3JkQXJyOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICAgICAga2V5V29yZEFyciA9IGRhdGEua2V5d29yZC5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgcXVpY2tTZWFyY2hQYXJhbXMua2V5V29yZHMgPSBrZXlXb3JkQXJyO1xyXG4gICAgICAgIHF1aWNrU2VhcmNoUGFyYW1zLlJlbGF0aW9uVHlwZSA9IFwiQU5EXCI7XHJcbiAgICAgICAgbGV0IGNyb3NzVGltZSA9IHNlbGYuYXR0cmlidXRlRmFjdG9yeS5nZXRDcm9zc1RyYWluVGltZShzZWxmLnNlbGVjdFRpbWUpO1xyXG4gICAgICAgIHF1aWNrU2VhcmNoUGFyYW1zLnN0YXJ0VGltZSA9IGNyb3NzVGltZS5zdGFydFRpbWU7XHJcbiAgICAgICAgcXVpY2tTZWFyY2hQYXJhbXMuZW5kVGltZSA9IGNyb3NzVGltZS5lbmRUaW1lO1xyXG4gICAgICAgIHNlbGYuYWN0aXZlU2VhcmNoUGFyYW1zID0gcXVpY2tTZWFyY2hQYXJhbXM7XHJcbiAgICAgICAgc2VsZi5nZXRTZXJ2ZXJNZXNzYWdlKHF1aWNrU2VhcmNoUGFyYW1zLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDkurrlkZjku6Xlm77mo4DntKJcclxuICAgIHByaXZhdGUgc2VhcmNoQnlGYWNlKGRhdGE6IGFueSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAvLyDliJ3lp4vljJbns7vnu5/phY3nva5cclxuICAgICAgICBsZXQgc3lzdGVtRGF0YTogU3lzdGVtQ29uZmlnUGFyYW1zID0gc2VsZi5zeXN0ZW1JbmZvQ2FjaGVGYWN0b3J5LmdldFN5c3RlbUluZm8oKTtcclxuICAgICAgICBsZXQgZmVhdHVyZVNlYXJjaEV4dDpBcnJheTxhbnk+ID0gW107XHJcbiAgICAgICAgbGV0IGZldHVyZVRhc2tQYXJhbTpBcnJheTxhbnk+ID0gW107XHJcbiAgICAgICAgXy5mb3JFYWNoKGRhdGEuZmFjZUluZm8sIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlLmZlYXR1cmVTZWFyY2hFeHQpeyAvLyDmi5bmi71cclxuICAgICAgICAgICAgICAgIGZlYXR1cmVTZWFyY2hFeHQucHVzaCh2YWx1ZS5mZWF0dXJlU2VhcmNoRXh0KTtcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZmV0dXJlVGFza1BhcmFtLnB1c2godmFsdWUuZmV0dXJlVGFza1BhcmFtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIOafpeivouWGheWuueWPmOWMlumHjee9ruetm+mAieadoeS7tlxyXG4gICAgICAgIGlmICgoc2VsZi5hY3RpdmVTZWFyY2hQYXJhbXMuZmVhdHVyZVNlYXJjaEV4dCAhPT0gZmVhdHVyZVNlYXJjaEV4dCl8fChzZWxmLmFjdGl2ZVNlYXJjaFBhcmFtcy5mZXR1cmVUYXNrUGFyYW0gIT09IGZldHVyZVRhc2tQYXJhbSkpIHtcclxuICAgICAgICAgICAgc2VsZi5zZWxlY3RBcmVhQXJyID0gW107XHJcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0VGltZSA9IDM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzb2NrZXRTZWFyY2hQYXJhbXM6IGFueSA9IHtcclxuICAgICAgICAgICAgXCJmZWF0dXJlU2VhcmNoRXh0XCI6IGZlYXR1cmVTZWFyY2hFeHQsXHJcbiAgICAgICAgICAgIFwiZmV0dXJlVGFza1BhcmFtXCI6IGZldHVyZVRhc2tQYXJhbSxcclxuICAgICAgICAgICAgXCJvcmRlckJ5XCI6IHtcclxuICAgICAgICAgICAgICAgIFwiaXNBc2NcIjogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJpbWFnZVBhdGhcIjogXCJGYWNlXCIsXHJcbiAgICAgICAgICAgIFwiaXNGaXJzdFNlYXJjaFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJ0aHJlc2hvbGRcIjogc3lzdGVtRGF0YS5JZGVudGl0eVZhbHVlIHx8IDc1LFxyXG4gICAgICAgICAgICBcInVzZXJJZFwiOiBzZWxmLnVzZXJJbmZvQ2FjaGVGYWN0b3J5LmdldEN1cnJlbnRVc2VySWQoKSxcclxuICAgICAgICAgICAgXCJhcnJDYW1lcmFJZFwiOiBbXSxcclxuICAgICAgICAgICAgXCJhcnJBcmVhSURcIjogc2VsZi5zZWxlY3RBcmVhQXJyXHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyDorr7nva7mn6Xor6Lorr7lpIdpZFxyXG4gICAgICAgIGlmKGRhdGEuZGV2aWNlQXJySWQubGVuZ3RoPjApIHtcclxuICAgICAgICAgICAgc29ja2V0U2VhcmNoUGFyYW1zLmFyck9iamVjdElEID0gZGF0YS5kZXZpY2VBcnJJZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgc3lzdGVtUG9pbnRMaXN0OiBBcnJheTxTeXN0ZW1Qb2ludD4gPSBzZWxmLiRzY29wZS4kcGFyZW50LiRwYXJlbnQuJHBhcmVudC4kcGFyZW50LnN5c3RlbVBvaW50O1xyXG4gICAgICAgICAgICBsZXQgZGV2aWNlSWRzOkFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgICAgICAgICAgXyhzeXN0ZW1Qb2ludExpc3QpLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChPYmplY3RUeXBlLkNhbWVyYS52YWx1ZSA9PT0gdmFsdWUuT2JqZWN0VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRldmljZUlkcy5wdXNoKHZhbHVlLk9iamVjdElEKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNvY2tldFNlYXJjaFBhcmFtcy5hcnJPYmplY3RJRCA9IGRldmljZUlkcztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNyb3NzVGltZSA9IHNlbGYuYXR0cmlidXRlRmFjdG9yeS5nZXRDcm9zc1RyYWluVGltZShzZWxmLnNlbGVjdFRpbWUpO1xyXG4gICAgICAgIHNvY2tldFNlYXJjaFBhcmFtcy5zdGFydFRpbWUgPSBjcm9zc1RpbWUuc3RhcnRUaW1lO1xyXG4gICAgICAgIHNvY2tldFNlYXJjaFBhcmFtcy5lbmRUaW1lID0gY3Jvc3NUaW1lLmVuZFRpbWU7XHJcbiAgICAgICAgc2VsZi5hY3RpdmVTZWFyY2hQYXJhbXMgPSBzb2NrZXRTZWFyY2hQYXJhbXM7XHJcbiAgICAgICAgc2VsZi53ZWJzb2NrZXRRdWlja1NlYXJjaChzb2NrZXRTZWFyY2hQYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOi9pui+huS7peWbvuajgOe0olxyXG4gICAgcHJpdmF0ZSBzZWFyY2hCeUNhcihkYXRhOiBhbnkpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgLy8g5Yid5aeL5YyW57O757uf6YWN572uXHJcbiAgICAgICAgbGV0IHN5c3RlbURhdGE6IFN5c3RlbUNvbmZpZ1BhcmFtcyA9IHNlbGYuc3lzdGVtSW5mb0NhY2hlRmFjdG9yeS5nZXRTeXN0ZW1JbmZvKCk7XHJcbiAgICAgICAgbGV0IGZlYXR1cmVTZWFyY2hFeHQ6QXJyYXk8YW55PiA9IFtdO1xyXG4gICAgICAgIGxldCBmZXR1cmVUYXNrUGFyYW06QXJyYXk8YW55PiA9IFtdO1xyXG4gICAgICAgIF8uZm9yRWFjaChkYXRhLmNhckluZm8sIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlLmZlYXR1cmVTZWFyY2hFeHQpeyAvLyDmi5bmi71cclxuICAgICAgICAgICAgICAgIGZlYXR1cmVTZWFyY2hFeHQucHVzaCh2YWx1ZS5mZWF0dXJlU2VhcmNoRXh0KTtcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZmV0dXJlVGFza1BhcmFtLnB1c2godmFsdWUuZmV0dXJlVGFza1BhcmFtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIOafpeivouWGheWuueWPmOWMlumHjee9ruetm+mAieadoeS7tlxyXG4gICAgICAgIGlmICgoc2VsZi5hY3RpdmVTZWFyY2hQYXJhbXMuZmVhdHVyZVNlYXJjaEV4dCAhPT0gZmVhdHVyZVNlYXJjaEV4dCl8fChzZWxmLmFjdGl2ZVNlYXJjaFBhcmFtcy5mZXR1cmVUYXNrUGFyYW0gIT09IGZldHVyZVRhc2tQYXJhbSkpIHtcclxuICAgICAgICAgICAgc2VsZi5zZWxlY3RBcmVhQXJyID0gW107XHJcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0VGltZSA9IDM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzb2NrZXRTZWFyY2hQYXJhbXM6IGFueSA9IHtcclxuICAgICAgICAgICAgXCJmZWF0dXJlU2VhcmNoRXh0XCI6IGZlYXR1cmVTZWFyY2hFeHQsXHJcbiAgICAgICAgICAgIFwiZmV0dXJlVGFza1BhcmFtXCI6IGZldHVyZVRhc2tQYXJhbSxcclxuICAgICAgICAgICAgXCJvcmRlckJ5XCI6IHtcclxuICAgICAgICAgICAgICAgIFwiaXNBc2NcIjogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJpbWFnZVBhdGhcIjogXCJDYXJcIixcclxuICAgICAgICAgICAgXCJpc0ZpcnN0U2VhcmNoXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcInRocmVzaG9sZFwiOiBzeXN0ZW1EYXRhLklkZW50aXR5VmFsdWUgfHwgNzUsXHJcbiAgICAgICAgICAgIFwidXNlcklkXCI6IHNlbGYudXNlckluZm9DYWNoZUZhY3RvcnkuZ2V0Q3VycmVudFVzZXJJZCgpLFxyXG4gICAgICAgICAgICBcImFyck9iamVjdElEXCI6IFtdLFxyXG4gICAgICAgICAgICBcImFyckFyZWFJRFwiOiBzZWxmLnNlbGVjdEFyZWFBcnJcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIOiuvue9ruafpeivouiuvuWkh2lkXHJcbiAgICAgICAgaWYoZGF0YS5kZXZpY2VBcnJJZC5sZW5ndGg+MCkge1xyXG4gICAgICAgICAgICBzb2NrZXRTZWFyY2hQYXJhbXMuYXJyT2JqZWN0SUQgPSBkYXRhLmRldmljZUFycklkO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBzeXN0ZW1Qb2ludExpc3Q6IEFycmF5PFN5c3RlbVBvaW50PiA9IHNlbGYuJHNjb3BlLiRwYXJlbnQuJHBhcmVudC4kcGFyZW50LiRwYXJlbnQuc3lzdGVtUG9pbnQ7XHJcbiAgICAgICAgICAgIGxldCBkZXZpY2VJZHM6QXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgICAgICAgICBfKHN5c3RlbVBvaW50TGlzdCkuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdFR5cGUuUm1wR2F0ZS52YWx1ZSA9PT0gdmFsdWUuT2JqZWN0VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRldmljZUlkcy5wdXNoKHZhbHVlLk9iamVjdElEKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNvY2tldFNlYXJjaFBhcmFtcy5hcnJPYmplY3RJRCA9IGRldmljZUlkcztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNyb3NzVGltZSA9IHNlbGYuYXR0cmlidXRlRmFjdG9yeS5nZXRDcm9zc1RyYWluVGltZShzZWxmLnNlbGVjdFRpbWUpO1xyXG4gICAgICAgIHNvY2tldFNlYXJjaFBhcmFtcy5zdGFydFRpbWUgPSBjcm9zc1RpbWUuc3RhcnRUaW1lO1xyXG4gICAgICAgIHNvY2tldFNlYXJjaFBhcmFtcy5lbmRUaW1lID0gY3Jvc3NUaW1lLmVuZFRpbWU7XHJcblxyXG4gICAgICAgIHNlbGYuYWN0aXZlU2VhcmNoUGFyYW1zID0gc29ja2V0U2VhcmNoUGFyYW1zO1xyXG4gICAgICAgIHNlbGYud2Vic29ja2V0UXVpY2tTZWFyY2hCeUNhcihzb2NrZXRTZWFyY2hQYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5b+r6YCf5qOA57Si57uT5p6cXHJcbiAgICAgKiBAcGFyYW0ge1F1aWNrU2VhcmNoUGFyYW1zfSBxdWlja1NlYXJjaFBhcmFtc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFNlcnZlck1lc3NhZ2UocXVpY2tTZWFyY2hQYXJhbXM6IFF1aWNrU2VhcmNoUGFyYW1zLCB0eXBlOiBib29sZWFuKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyDpppbmrKHmn6Xor6JcclxuICAgICAgICBpZiAodHlwZSkge1xyXG4gICAgICAgICAgICBzZWxmLmluaXRQYWdlUGFyYW1zKCk7XHJcbiAgICAgICAgICAgIC8vIOiuvue9ruafpeivouWPguaVsOe8k+WtmFxyXG4gICAgICAgICAgICBTZXRIaXN0b3J5UXVlcnlSZWNvcmQocXVpY2tTZWFyY2hQYXJhbXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5zZWFyY2hRdWlja0J5UHJvbWlzZShxdWlja1NlYXJjaFBhcmFtcykudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgLy8g6K6+572u5p+l6K+i57uT5p2f5pe26Ze0XHJcbiAgICAgICAgICAgIGlmIChxdWlja1NlYXJjaFBhcmFtcy5vYmplY3RUeXBlID09PSBcIkFsbFwiKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnF1ZXJ5RW5kVGltZSA9IChuZXcgRGF0ZSgpKS52YWx1ZU9mKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5xdWVyeVRvdGFsID0gcmVzLmNvdW50O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyZXMuY29kZSA9IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgLy8g5aSE55CG6L2m6L6G5pWw5o2uXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuVmVoaWNsZSAmJiByZXMuZGF0YS5WZWhpY2xlLlRvdGFsQ291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kaXNwb3NlQ29tbW9uRGF0YShzZWxmLmNhclJlc3VsdCwgcmVzLmRhdGEuVmVoaWNsZSwgUmVzb3VyY2VUeXBlRW51bVsyXS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNhclJlc3VsdC5wYWdlUGFyYW1zLnRvdGFsQ291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2FyUmVzdWx0LnBhZ2VQYXJhbXMucGFnZUNvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNhclJlc3VsdC5kYXRhID0gW107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyDlpITnkIbkurrohLjmlbDmja5cclxuICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5GYWNlICYmIHJlcy5kYXRhLkZhY2UuVG90YWxDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmRpc3Bvc2VDb21tb25EYXRhKHNlbGYuZmFjZVJlc3VsdCwgcmVzLmRhdGEuRmFjZSwgUmVzb3VyY2VUeXBlRW51bVsxXS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmZhY2VSZXN1bHQucGFnZVBhcmFtcy50b3RhbENvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmZhY2VSZXN1bHQucGFnZVBhcmFtcy5wYWdlQ291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZmFjZVJlc3VsdC5kYXRhID0gW107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyDlpITnkIZXSUZJ5pWw5o2uXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuV2lGaSAmJiByZXMuZGF0YS5XaUZpLlRvdGFsQ291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kaXNwb3NlQ29tbW9uRGF0YShzZWxmLndpZmlSZXN1bHQsIHJlcy5kYXRhLldpRmksIFJlc291cmNlVHlwZUVudW1bNV0udmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi53aWZpUmVzdWx0LnBhZ2VQYXJhbXMudG90YWxDb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi53aWZpUmVzdWx0LnBhZ2VQYXJhbXMucGFnZUNvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLndpZmlSZXN1bHQuZGF0YSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8g5aSE55CG55S15Zu05pWw5o2uXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuRUZFTkNFICYmIHJlcy5kYXRhLkVGRU5DRS5Ub3RhbENvdW50ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGlzcG9zZUNvbW1vbkRhdGEoc2VsZi5lbGVjdHJvbmljUmVzdWx0LCByZXMuZGF0YS5FRkVOQ0UsIFJlc291cmNlVHlwZUVudW1bN10udmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lbGVjdHJvbmljUmVzdWx0LnBhZ2VQYXJhbXMudG90YWxDb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lbGVjdHJvbmljUmVzdWx0LnBhZ2VQYXJhbXMucGFnZUNvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmVsZWN0cm9uaWNSZXN1bHQuZGF0YSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmRldmljZVN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5aSE55CG6K6+5aSHLeWNoeWPo+aVsOaNrlxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuUm1wR2F0ZVJlc3VsdFBhZ2luYXRpb24uc2V0KHJlcy5kYXRhLkRldmljZVJtcEdhdGUuUmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmRldmljZVJtcEdhdGVSZXN1bHQucGFnZVNpemUgPSA2O1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGV2aWNlUm1wR2F0ZVJlc3VsdC5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kZXZpY2VSbXBHYXRlUmVzdWx0ID0gc2VsZi5SbXBHYXRlUmVzdWx0UGFnaW5hdGlvbi5nZXRCeVBhZ2Uoc2VsZi5kZXZpY2VSbXBHYXRlUmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyDlpITnkIborr7lpIctY2FtZXJh5pWw5o2uXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5DYW1lcmFSZXN1bHRQYWdpbmF0aW9uLnNldChyZXMuZGF0YS5EZXZpY2VDYW1lcmEuUmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmRldmljZUNhbWVyYVJlc3VsdC5wYWdlU2l6ZSA9IDY7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kZXZpY2VDYW1lcmFSZXN1bHQuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGV2aWNlQ2FtZXJhUmVzdWx0ID0gc2VsZi5DYW1lcmFSZXN1bHRQYWdpbmF0aW9uLmdldEJ5UGFnZShzZWxmLmRldmljZUNhbWVyYVJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5aSE55CG6K6+5aSHLXdpZmnmlbDmja5cclxuICAgICAgICAgICAgICAgICAgICBzZWxmLldpZmlSZXN1bHRQYWdpbmF0aW9uLnNldChyZXMuZGF0YS5EZXZpY2VXaUZpLlJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kZXZpY2VXaWZpUmVzdWx0LnBhZ2VTaXplID0gNjtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmRldmljZVdpZmlSZXN1bHQuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGV2aWNlV2lmaVJlc3VsdCA9IHNlbGYuV2lmaVJlc3VsdFBhZ2luYXRpb24uZ2V0QnlQYWdlKHNlbGYuZGV2aWNlV2lmaVJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5aSE55CG6K6+5aSHLeeUteWbtOaVsOaNrlxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuRWxlY3Ryb25pY1Jlc3VsdFBhZ2luYXRpb24uc2V0KHJlcy5kYXRhLkRldmljZUVGRU5DRS5SZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGV2aWNlRWxlY3Ryb25pY1Jlc3VsdC5wYWdlU2l6ZSA9IDY7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kZXZpY2VFbGVjdHJvbmljUmVzdWx0LmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmRldmljZUVsZWN0cm9uaWNSZXN1bHQgPSBzZWxmLkVsZWN0cm9uaWNSZXN1bHRQYWdpbmF0aW9uLmdldEJ5UGFnZShzZWxmLmRldmljZUVsZWN0cm9uaWNSZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOWQkeeItumhtemdouW5v+aSrS0t5p+l6K+i57uT5p2fXHJcbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRlbWl0KFwic2VhcmNoLXJlcXVlc3QtbG9hZGluZ1wiLCBmYWxzZSk7XHJcbiAgICAgICAgfSkuY2F0Y2goKGVycjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIC8vIOWQkeeItumhtemdouW5v+aSrS0t5p+l6K+i57uT5p2fXHJcbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRlbWl0KFwic2VhcmNoLXJlcXVlc3QtbG9hZGluZ1wiLCBmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8g5qih5ouf5rWL6K+V5pWw5o2uXHJcbiAgICAgICAgc2VsZi5zZWFyY2hCYXIgPSB0cnVlXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6K6+572uc29ja2V06K+35rGC5Y+C5pWwXHJcbiAgICBwdWJsaWMgZGVhbFNvY2tldERhdGEoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIC8vIOiHquWKqOWumuS9jeWIsOS6uuiEuFxyXG4gICAgICAgIHNlbGYuc3dpdGNoQnV0dG9uWzBdLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICBzZWxmLnN3aXRjaEJ1dHRvblsxXS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICBzZWxmLnN3aXRjaFBhZ2UgPSBzZWxmLnN3aXRjaEJ1dHRvblsxXTtcclxuICAgICAgICBsZXQgbWluID0gc2VsZi5mYWNlUmVzdWx0LnBhZ2VQYXJhbXMucGFnZVNpemUgKiAoc2VsZi5mYWNlUmVzdWx0LnBhZ2VQYXJhbXMuY3VycmVudFBhZ2UgLSAxKTtcclxuICAgICAgICBsZXQgbWF4ID0gc2VsZi5mYWNlUmVzdWx0LnBhZ2VQYXJhbXMucGFnZVNpemUgKiBzZWxmLmZhY2VSZXN1bHQucGFnZVBhcmFtcy5jdXJyZW50UGFnZTtcclxuICAgICAgICBsZXQgbmV3RGF0YTphbnkgPSB7XHJcbiAgICAgICAgICAgIFJlc3VsdDogW10sXHJcbiAgICAgICAgICAgIFRvdGFsQ291bnQ6IHNlbGYuc29ja2V0RGF0YS5Ub3RhbENvdW50LFxyXG4gICAgICAgICAgICBUYXNrSWQ6IHNlbGYuc29ja2V0RGF0YS5UYXNrSWRcclxuICAgICAgICB9O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBtaW47IGkgPCBtYXggJiYgaSA8IHNlbGYuc29ja2V0RGF0YS5Ub3RhbENvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgbmV3RGF0YS5SZXN1bHQucHVzaChzZWxmLnNvY2tldERhdGEuUmVzdWx0W2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5kaXNwb3NlQ29tbW9uRGF0YShzZWxmLnNvY2tldERhdGEsIG5ld0RhdGEsIFJlc291cmNlVHlwZUVudW1bMV0udmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOiuvue9rnNvY2tldOivt+axguWPguaVsFxyXG4gICAgcHVibGljIGRlYWxTb2NrZXRDYXJEYXRhKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAvLyDoh6rliqjlrprkvY3liLDkurrohLhcclxuICAgICAgICBzZWxmLnN3aXRjaEJ1dHRvblswXS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICBzZWxmLnN3aXRjaFBhZ2UgPSBzZWxmLnN3aXRjaEJ1dHRvblswXTtcclxuICAgICAgICBsZXQgY2FyUmVzdWx0RGF0YTogQXJyYXk8Y2FyPiA9IFtdO1xyXG4gICAgICAgIGxldCBtaW4gPSBzZWxmLmNhclJlc3VsdC5wYWdlUGFyYW1zLnBhZ2VTaXplICogKHNlbGYuY2FyUmVzdWx0LnBhZ2VQYXJhbXMuY3VycmVudFBhZ2UgLSAxKTtcclxuICAgICAgICBsZXQgbWF4ID0gc2VsZi5jYXJSZXN1bHQucGFnZVBhcmFtcy5wYWdlU2l6ZSAqIHNlbGYuY2FyUmVzdWx0LnBhZ2VQYXJhbXMuY3VycmVudFBhZ2U7XHJcbiAgICAgICAgbGV0IG5ld0RhdGE6YW55ID0ge1xyXG4gICAgICAgICAgICBSZXN1bHQ6IFtdLFxyXG4gICAgICAgICAgICBUb3RhbENvdW50OiBzZWxmLnNvY2tldENhckRhdGEuVG90YWxDb3VudCxcclxuICAgICAgICAgICAgVGFza0lkOiBzZWxmLnNvY2tldENhckRhdGEuVGFza0lkXHJcbiAgICAgICAgfTtcclxuICAgICAgICBmb3IgKGxldCBpID0gbWluOyBpIDwgbWF4ICYmIGkgPCBzZWxmLnNvY2tldENhckRhdGEuVG90YWxDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG5ld0RhdGEuUmVzdWx0LnB1c2goc2VsZi5zb2NrZXRDYXJEYXRhLlJlc3VsdFtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYuZGlzcG9zZUNvbW1vbkRhdGEoc2VsZi5zb2NrZXRDYXJEYXRhLCBuZXdEYXRhLCBSZXNvdXJjZVR5cGVFbnVtWzJdLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbuWkhOeQhuafpeivouaVsOaNrlxyXG4gICAgICogQHBhcmFtIHJlc3VsdERhdGFcclxuICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRpc3Bvc2VDb21tb25EYXRhKHJlc3VsdERhdGE6IGFueSwgZGF0YTogYW55LCB0eXBlOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHBhcmFtczphbnkgPSB7XHJcbiAgICAgICAgICAgIGRldmljZUlkczogW10sXHJcbiAgICAgICAgICAgIGRldmljZVR5cGU6ICcnLFxyXG4gICAgICAgICAgICBpZHM6IFtdLFxyXG4gICAgICAgICAgICB1c2VySWQ6IHNlbGYudXNlckluZm9DYWNoZUZhY3RvcnkuZ2V0Q3VycmVudFVzZXJJZCgpXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAodHlwZSA9PT0gUmVzb3VyY2VUeXBlRW51bVsyXS52YWx1ZSkge1xyXG4gICAgICAgICAgICBwYXJhbXMuZGV2aWNlVHlwZSA9IE9iamVjdFR5cGUuUm1wR2F0ZS52YWx1ZTtcclxuICAgICAgICAgICAgXy5mb3JFYWNoKGRhdGEuUmVzdWx0LGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zLmRldmljZUlkcy5wdXNoKHZhbHVlLmRldmljZUlkKTtcclxuICAgICAgICAgICAgICAgIHBhcmFtcy5pZHMucHVzaCh2YWx1ZS5pZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gUmVzb3VyY2VUeXBlRW51bVsxXS52YWx1ZSkge1xyXG4gICAgICAgICAgICBwYXJhbXMuZGV2aWNlVHlwZSA9IE9iamVjdFR5cGUuQ2FtZXJhLnZhbHVlO1xyXG4gICAgICAgICAgICBfLmZvckVhY2goZGF0YS5SZXN1bHQsZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXMuZGV2aWNlSWRzLnB1c2godmFsdWUuQWNjZXNzTG9nLkNhbWVyYUlEKTtcclxuICAgICAgICAgICAgICAgIHBhcmFtcy5pZHMucHVzaCh2YWx1ZS5BY2Nlc3NMb2cuSUQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IFJlc291cmNlVHlwZUVudW1bNV0udmFsdWUpIHtcclxuICAgICAgICAgICAgcGFyYW1zLmRldmljZVR5cGUgPSBPYmplY3RUeXBlLldpZmkudmFsdWU7XHJcbiAgICAgICAgICAgIF8uZm9yRWFjaChkYXRhLlJlc3VsdCxmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHBhcmFtcy5kZXZpY2VJZHMucHVzaCh2YWx1ZS53aWZpTG9nLk1hY0RldmljZUlkKTtcclxuICAgICAgICAgICAgICAgIHBhcmFtcy5pZHMucHVzaCh2YWx1ZS53aWZpTG9nLklEKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBSZXNvdXJjZVR5cGVFbnVtWzddLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHBhcmFtcy5kZXZpY2VUeXBlID0gT2JqZWN0VHlwZS5FbGVjdHJvbmljRmVuY2UudmFsdWU7XHJcbiAgICAgICAgICAgIF8uZm9yRWFjaChkYXRhLlJlc3VsdCxmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHBhcmFtcy5kZXZpY2VJZHMucHVzaCh2YWx1ZS5lRmVuY2VMb2cuTW9iaWxlRGV2aWNlSWQpO1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zLmlkcy5wdXNoKHZhbHVlLmVGZW5jZUxvZy5JRCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZi5yZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UuZ2V0RGV2aWNlSW5mb1Byb21pc2UocGFyYW1zKS50aGVuKChyZXM6YW55KT0+e1xyXG4gICAgICAgICAgICBfLmZvckVhY2goZGF0YS5SZXN1bHQsZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmRldmljZUluZm8gPSByZXMuZGF0YS5kZXZpY2VJbmZvW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY29sbGVjdFN0YXR1cyA9IHJlcy5kYXRhLmNvbGxlY3RTdGF0dXNbaW5kZXhdO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlID09PSBSZXNvdXJjZVR5cGVFbnVtWzJdLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNhclJlc3VsdC5wYWdlUGFyYW1zLnRvdGFsQ291bnQgPSBkYXRhLlRvdGFsQ291bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jYXJSZXN1bHQucGFnZVBhcmFtcy5wYWdlQ291bnQgPSBNYXRoLmNlaWwoZGF0YS5Ub3RhbENvdW50IC8gc2VsZi5jYXJSZXN1bHQucGFnZVBhcmFtcy5wYWdlU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jYXJSZXN1bHQuZGF0YSA9IGRhdGEuUmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2FyUmVzdWx0LnRhc2tJZCA9IGRhdGEuVGFza0lkO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWQkeeItumhtemdouW5v+aSrS0t5p+l6K+i57uT5p2fXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGVtaXQoXCJzZWFyY2gtcmVxdWVzdC1sb2FkaW5nXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09PSBSZXNvdXJjZVR5cGVFbnVtWzFdLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmZhY2VSZXN1bHQucGFnZVBhcmFtcy50b3RhbENvdW50ID0gZGF0YS5Ub3RhbENvdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZmFjZVJlc3VsdC5wYWdlUGFyYW1zLnBhZ2VDb3VudCA9IE1hdGguY2VpbChkYXRhLlRvdGFsQ291bnQgLyBzZWxmLmZhY2VSZXN1bHQucGFnZVBhcmFtcy5wYWdlU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5mYWNlUmVzdWx0LmRhdGEgPSBkYXRhLlJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmZhY2VSZXN1bHQudGFza0lkID0gZGF0YS5UYXNrSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5ZCR54i26aG16Z2i5bm/5pKtLS3mn6Xor6Lnu5PmnZ9cclxuICAgICAgICAgICAgICAgICAgICBzZWxmLiRzY29wZS4kZW1pdChcInNlYXJjaC1yZXF1ZXN0LWxvYWRpbmdcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGUgPT09IFJlc291cmNlVHlwZUVudW1bNV0udmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYud2lmaVJlc3VsdC5wYWdlUGFyYW1zLnRvdGFsQ291bnQgPSBkYXRhLlRvdGFsQ291bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi53aWZpUmVzdWx0LnBhZ2VQYXJhbXMucGFnZUNvdW50ID0gTWF0aC5jZWlsKGRhdGEuVG90YWxDb3VudCAvIHNlbGYud2lmaVJlc3VsdC5wYWdlUGFyYW1zLnBhZ2VTaXplKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLndpZmlSZXN1bHQuZGF0YSA9IGRhdGEuUmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYud2lmaVJlc3VsdC50YXNrSWQgPSBkYXRhLlRhc2tJZDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09PSBSZXNvdXJjZVR5cGVFbnVtWzddLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmVsZWN0cm9uaWNSZXN1bHQucGFnZVBhcmFtcy50b3RhbENvdW50ID0gZGF0YS5Ub3RhbENvdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZWxlY3Ryb25pY1Jlc3VsdC5wYWdlUGFyYW1zLnBhZ2VDb3VudCA9IE1hdGguY2VpbChkYXRhLlRvdGFsQ291bnQgLyBzZWxmLmVsZWN0cm9uaWNSZXN1bHQucGFnZVBhcmFtcy5wYWdlU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lbGVjdHJvbmljUmVzdWx0LmRhdGEgPSBkYXRhLlJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmVsZWN0cm9uaWNSZXN1bHQudGFza0lkID0gZGF0YS5UYXNrSWQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOe9ruepuuiuvuWkh+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBkZXZpY2VFbXB0eSgpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi5kZXZpY2VTdGF0dXMgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8g5aSE55CG6K6+5aSHLeWNoeWPo+aVsOaNrlxyXG4gICAgICAgIHNlbGYuUm1wR2F0ZVJlc3VsdFBhZ2luYXRpb24uc2V0KFtdKTtcclxuICAgICAgICBzZWxmLmRldmljZVJtcEdhdGVSZXN1bHQucGFnZVNpemUgPSA2O1xyXG4gICAgICAgIHNlbGYuZGV2aWNlUm1wR2F0ZVJlc3VsdC5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgc2VsZi5kZXZpY2VSbXBHYXRlUmVzdWx0ID0gc2VsZi5SbXBHYXRlUmVzdWx0UGFnaW5hdGlvbi5nZXRCeVBhZ2Uoc2VsZi5kZXZpY2VSbXBHYXRlUmVzdWx0KTtcclxuICAgICAgICAvLyDlpITnkIborr7lpIctY2FtZXJh5pWw5o2uXHJcbiAgICAgICAgc2VsZi5DYW1lcmFSZXN1bHRQYWdpbmF0aW9uLnNldChbXSk7XHJcbiAgICAgICAgc2VsZi5kZXZpY2VDYW1lcmFSZXN1bHQucGFnZVNpemUgPSA2O1xyXG4gICAgICAgIHNlbGYuZGV2aWNlQ2FtZXJhUmVzdWx0LmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICBzZWxmLmRldmljZUNhbWVyYVJlc3VsdCA9IHNlbGYuQ2FtZXJhUmVzdWx0UGFnaW5hdGlvbi5nZXRCeVBhZ2Uoc2VsZi5kZXZpY2VDYW1lcmFSZXN1bHQpO1xyXG4gICAgICAgIC8vIOWkhOeQhuiuvuWkhy13aWZp5pWw5o2uXHJcbiAgICAgICAgc2VsZi5XaWZpUmVzdWx0UGFnaW5hdGlvbi5zZXQoW10pO1xyXG4gICAgICAgIHNlbGYuZGV2aWNlV2lmaVJlc3VsdC5wYWdlU2l6ZSA9IDY7XHJcbiAgICAgICAgc2VsZi5kZXZpY2VXaWZpUmVzdWx0LmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICBzZWxmLmRldmljZVdpZmlSZXN1bHQgPSBzZWxmLldpZmlSZXN1bHRQYWdpbmF0aW9uLmdldEJ5UGFnZShzZWxmLmRldmljZVdpZmlSZXN1bHQpO1xyXG4gICAgICAgIC8vIOWkhOeQhuiuvuWkhy3nlLXlm7TmlbDmja5cclxuICAgICAgICBzZWxmLkVsZWN0cm9uaWNSZXN1bHRQYWdpbmF0aW9uLnNldChbXSk7XHJcbiAgICAgICAgc2VsZi5kZXZpY2VFbGVjdHJvbmljUmVzdWx0LnBhZ2VTaXplID0gNjtcclxuICAgICAgICBzZWxmLmRldmljZUVsZWN0cm9uaWNSZXN1bHQuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIHNlbGYuZGV2aWNlRWxlY3Ryb25pY1Jlc3VsdCA9IHNlbGYuRWxlY3Ryb25pY1Jlc3VsdFBhZ2luYXRpb24uZ2V0QnlQYWdlKHNlbGYuZGV2aWNlRWxlY3Ryb25pY1Jlc3VsdCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5YiG6aG15L+h5oGvXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtXHJcbiAgICAgKiBAcmV0dXJucyB7YW55fVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2hhbmdlUGFnZShudW06IG51bWJlciwgdHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBwYWdlUGFyYW1zOiBhbnk7XHJcblxyXG4gICAgICAgIGxldCBrZXlXb3JkOiBzdHJpbmcgPSBzZWxmLmtleVdvcmQsXHJcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiBudW1iZXIgPSBudW0sXHJcbiAgICAgICAgICAgIG9iamVjdFR5cGU6IHN0cmluZyxcclxuICAgICAgICAgICAgcGFnZVNpemU6IG51bWJlcixcclxuICAgICAgICAgICAgdGFza0lkOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiY2FyUmVzdWx0XCI6XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNhclJlc3VsdC5wYWdlUGFyYW1zLmN1cnJlbnRQYWdlID0gbnVtO1xyXG4gICAgICAgICAgICAgICAgcGFnZVBhcmFtcyA9IHNlbGYuY2FyUmVzdWx0LnBhZ2VQYXJhbXM7XHJcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlID0gXCJWZWhpY2xlXCI7XHJcbiAgICAgICAgICAgICAgICBwYWdlU2l6ZSA9IHNlbGYuY2FyUmVzdWx0LnBhZ2VQYXJhbXMucGFnZVNpemU7XHJcbiAgICAgICAgICAgICAgICB0YXNrSWQgPSBzZWxmLmNhclJlc3VsdC50YXNrSWQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImZhY2VSZXN1bHRcIjpcclxuICAgICAgICAgICAgICAgIHNlbGYuZmFjZVJlc3VsdC5wYWdlUGFyYW1zLmN1cnJlbnRQYWdlID0gbnVtO1xyXG4gICAgICAgICAgICAgICAgcGFnZVBhcmFtcyA9IHNlbGYuZmFjZVJlc3VsdC5wYWdlUGFyYW1zO1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0VHlwZSA9IFwiRmFjZVwiO1xyXG4gICAgICAgICAgICAgICAgcGFnZVNpemUgPSBzZWxmLmZhY2VSZXN1bHQucGFnZVBhcmFtcy5wYWdlU2l6ZTtcclxuICAgICAgICAgICAgICAgIHRhc2tJZCA9IHNlbGYuZmFjZVJlc3VsdC50YXNrSWQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIndpZmlSZXN1bHRcIjpcclxuICAgICAgICAgICAgICAgIHNlbGYud2lmaVJlc3VsdC5wYWdlUGFyYW1zLmN1cnJlbnRQYWdlID0gbnVtO1xyXG4gICAgICAgICAgICAgICAgcGFnZVBhcmFtcyA9IHNlbGYud2lmaVJlc3VsdC5wYWdlUGFyYW1zO1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0VHlwZSA9IFwiV2lGaVwiO1xyXG4gICAgICAgICAgICAgICAgcGFnZVNpemUgPSBzZWxmLndpZmlSZXN1bHQucGFnZVBhcmFtcy5wYWdlU2l6ZTtcclxuICAgICAgICAgICAgICAgIHRhc2tJZCA9IHNlbGYud2lmaVJlc3VsdC50YXNrSWQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImVsZVJlc3VsdFwiOlxyXG4gICAgICAgICAgICAgICAgc2VsZi5lbGVjdHJvbmljUmVzdWx0LnBhZ2VQYXJhbXMuY3VycmVudFBhZ2UgPSBudW07XHJcbiAgICAgICAgICAgICAgICBwYWdlUGFyYW1zID0gc2VsZi5lbGVjdHJvbmljUmVzdWx0LnBhZ2VQYXJhbXM7XHJcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlID0gXCJFRkVOQ0VcIjtcclxuICAgICAgICAgICAgICAgIHBhZ2VTaXplID0gc2VsZi5lbGVjdHJvbmljUmVzdWx0LnBhZ2VQYXJhbXMucGFnZVNpemU7XHJcbiAgICAgICAgICAgICAgICB0YXNrSWQgPSBzZWxmLmVsZWN0cm9uaWNSZXN1bHQudGFza0lkO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJwb3NpdGlvblwiOlxyXG4gICAgICAgICAgICAgICAgc2VsZi5wb3NpdGlvblJlc3VsdC5wYWdlUGFyYW1zLmN1cnJlbnRQYWdlID0gbnVtO1xyXG4gICAgICAgICAgICAgICAgcGFnZVBhcmFtcyA9IHNlbGYucG9zaXRpb25SZXN1bHQucGFnZVBhcmFtcztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBxdWlja1NlYXJjaFBhcmFtczogUXVpY2tTZWFyY2hQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIFwia2V5V29yZFwiOiBrZXlXb3JkLFxyXG4gICAgICAgICAgICBcImtleVdvcmRzXCI6IFtdLFxyXG4gICAgICAgICAgICBcIm9iamVjdFR5cGVcIjogb2JqZWN0VHlwZSxcclxuICAgICAgICAgICAgXCJjdXJyZW50UGFnZVwiOiBjdXJyZW50UGFnZSxcclxuICAgICAgICAgICAgXCJwYWdlU2l6ZVwiOiBwYWdlU2l6ZSxcclxuICAgICAgICAgICAgXCJ1c2VySWRcIjogc2VsZi51c2VySW5mb0NhY2hlRmFjdG9yeS5nZXRDdXJyZW50VXNlcklkKCksXHJcbiAgICAgICAgICAgIFwib3JkZXJCeVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImlzQXNjXCI6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwidGFza0lkXCI6IHRhc2tJZCxcclxuICAgICAgICAgICAgXCJpc0ZpcnN0U2VhcmNoXCI6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyDliKTmlq3mmK/lpJrlhbPplK7or43mo4DntKJcclxuICAgICAgICBsZXQga2V5V29yZEFycjogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgICAgIGtleVdvcmRBcnIgPSBrZXlXb3JkLnNwbGl0KFwiIFwiKTtcclxuICAgICAgICBxdWlja1NlYXJjaFBhcmFtcy5rZXlXb3JkcyA9IGtleVdvcmRBcnI7XHJcbiAgICAgICAgaWYgKHNlbGYuc29ja2V0UXVlcnlEYXRhLnR5cGUgPT09IFwicXVpY2tcIikge1xyXG4gICAgICAgICAgICBzZWxmLmdldFNlcnZlck1lc3NhZ2UocXVpY2tTZWFyY2hQYXJhbXMsIGZhbHNlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHNlbGYuc29ja2V0UXVlcnlEYXRhLnR5cGUgPT09IFwiRmFjZVwiKSB7XHJcbiAgICAgICAgICAgIHNlbGYuZGVhbFNvY2tldERhdGEoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHNlbGYuc29ja2V0UXVlcnlEYXRhLnR5cGUgPT09IFwiQ2FyXCIpIHtcclxuICAgICAgICAgICAgc2VsZi5kZWFsU29ja2V0Q2FyRGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGFnZVBhcmFtcztcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGNoYW5nZVBhZ2VEZXZpY2UobnVtOiBudW1iZXIsIHR5cGU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImRldmljZUNhbWVyYVJlc3VsdFwiOlxyXG4gICAgICAgICAgICAgICAgc2VsZi5kZXZpY2VDYW1lcmFSZXN1bHQuY3VycmVudFBhZ2UgPSBudW07XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRldmljZUNhbWVyYVJlc3VsdCA9IHNlbGYuQ2FtZXJhUmVzdWx0UGFnaW5hdGlvbi5nZXRCeVBhZ2Uoc2VsZi5kZXZpY2VDYW1lcmFSZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJkZXZpY2VSbXBHYXRlUmVzdWx0XCI6XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRldmljZVJtcEdhdGVSZXN1bHQuY3VycmVudFBhZ2UgPSBudW07XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRldmljZVJtcEdhdGVSZXN1bHQgPSBzZWxmLlJtcEdhdGVSZXN1bHRQYWdpbmF0aW9uLmdldEJ5UGFnZShzZWxmLmRldmljZVJtcEdhdGVSZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJkZXZpY2VXaWZpUmVzdWx0XCI6XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRldmljZVdpZmlSZXN1bHQuY3VycmVudFBhZ2UgPSBudW07XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRldmljZVdpZmlSZXN1bHQgPSBzZWxmLldpZmlSZXN1bHRQYWdpbmF0aW9uLmdldEJ5UGFnZShzZWxmLmRldmljZVdpZmlSZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJkZXZpY2VFbGVjdHJvbmljUmVzdWx0XCI6XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRldmljZUVsZWN0cm9uaWNSZXN1bHQuY3VycmVudFBhZ2UgPSBudW07XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRldmljZUVsZWN0cm9uaWNSZXN1bHQgPSBzZWxmLkVsZWN0cm9uaWNSZXN1bHRQYWdpbmF0aW9uLmdldEJ5UGFnZShzZWxmLmRldmljZUVsZWN0cm9uaWNSZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyDlr7zoiKrmnaHmjInpkq7liIfmjaJcclxuICAgIHB1YmxpYyBuYXZpZ2F0aW9uU3dpdGNoKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgc3dpdGNoTmF2OiBBcnJheTxJU3dpdGNoUGFnZT4gPSBhbmd1bGFyLmNvcHkoc2VsZi5zd2l0Y2hCdXR0b24pO1xyXG5cclxuICAgICAgICBzd2l0Y2hOYXYuZm9yRWFjaCgoVGl0bGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKFRpdGxlLm5hbWUgPT09IG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIFRpdGxlLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zd2l0Y2hQYWdlID0gVGl0bGU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBUaXRsZS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBzZWxmLnN3aXRjaEJ1dHRvbiA9IHN3aXRjaE5hdjtcclxuICAgIH07XHJcblxyXG4gICAgLy8g6YCJ5oup5pCc57Si5bel5YW3XHJcbiAgICBwdWJsaWMgc2VhcmNoU3dpdGNoKCkge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoQmFyID0gIXRoaXMuc2VhcmNoQmFyXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIOi/lOWbnuS4iuasoeajgOe0olxyXG4gICAgcHVibGljIGxhc3RRdWVyeSgpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGxhc3RRdWVyeVJlY29yZDogYW55ID0gR2V0TGFzdFF1ZXJ5UmVjb3JkKCk7XHJcbiAgICAgICAgaWYgKGxhc3RRdWVyeVJlY29yZCkge1xyXG4gICAgICAgICAgICBsYXN0UXVlcnlSZWNvcmQgPSBsYXN0UXVlcnlSZWNvcmQudmFsdWU7XHJcbiAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRlbWl0KCdsYXN0LXF1ZXJ5JywgbGFzdFF1ZXJ5UmVjb3JkKTtcclxuICAgICAgICAgICAgaWYgIChsYXN0UXVlcnlSZWNvcmQua2V5V29yZCAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5nZXRTZXJ2ZXJNZXNzYWdlKGxhc3RRdWVyeVJlY29yZCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAgKGxhc3RRdWVyeVJlY29yZC5pbWFnZVBhdGggPT09IFwiRmFjZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLndlYnNvY2tldFF1aWNrU2VhcmNoKGxhc3RRdWVyeVJlY29yZCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAgKGxhc3RRdWVyeVJlY29yZC5pbWFnZVBhdGggPT09IFwiQ2FyXCIpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYud2Vic29ja2V0UXVpY2tTZWFyY2hCeUNhcihsYXN0UXVlcnlSZWNvcmQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VsZi5sYXllckRlYy5pbmZvKCfmnKrmib7liLDljoblj7Lmn6Xor6LorrDlvZUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIOmAieaLqeWMuuWfn1xyXG4gICAgcHVibGljIHNlbGVjdEFyZWEoKSB7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IHNlbGVjdENhbWVyYUxpc3Q6IEFycmF5PHN0cmluZz4sICRkZXN0cm95OiBGdW5jdGlvbiwgc2VsZWN0Q3RybENiOiBzdHJpbmcgIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUuc2VsZWN0Q3RybENiID0gdGhpcy5zZWxlY3RBcmVhQ2I7XHJcbiAgICAgICAgc2NvcGUuc2VsZWN0Q2FtZXJhTGlzdCA9IHRoaXMuc2VsZWN0QXJlYUFycjtcclxuICAgICAgICB0aGlzLnNlbGVBcmVhSWQgPSB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBjb250ZW50OiB0cmVlQXJlYXBvcHVwSHRtbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICB0aXRsZTogXCLpgInmi6nljLrln59cIixcclxuICAgICAgICAgICAgYXJlYTogW1wiNzEwcHhcIiwgXCI2MjBweFwiXSxcclxuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5riF6Zmk5pCc57Si5Y+C5pWwXHJcbiAgICBwdWJsaWMgc2VhcmNoQ2xlYXJQYXJhbXMoKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RUaW1lID0gMztcclxuICAgICAgICB0aGlzLnNlbGVjdEFyZWFBcnIgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDkurrohLhzb2NrZXTmn6Xor6JcclxuICAgICAqIEBwYXJhbSBzb2NrZXRTZWFyY2hQYXJhbXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHdlYnNvY2tldFF1aWNrU2VhcmNoKHNvY2tldFNlYXJjaFBhcmFtczogYW55KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIC8vIOWQkeeItumhtemdouW5v+aSrS0t5p+l6K+i5byA5aeLXHJcbiAgICAgICAgc2VsZi4kc2NvcGUuJGVtaXQoXCJzZWFyY2gtcmVxdWVzdC1sb2FkaW5nXCIsIHRydWUpO1xyXG5cclxuICAgICAgICBzZWxmLmluaXRQYWdlUGFyYW1zKCk7XHJcblxyXG4gICAgICAgIC8vIOiuvue9ruafpeivouWPguaVsOe8k+WtmFxyXG4gICAgICAgIFNldEhpc3RvcnlRdWVyeVJlY29yZChzb2NrZXRTZWFyY2hQYXJhbXMpO1xyXG5cclxuICAgICAgICAvLyDnva7nqbrlhbblroPmlbDmja5cclxuICAgICAgICBzZWxmLmluaXRQYXJhbXMoKTtcclxuICAgICAgICBzZWxmLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5hZHZhbmNlZFNlYXJjaEJ5RmFjZShzb2NrZXRTZWFyY2hQYXJhbXMpLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLm1vbml0b3JGYWNlU29ja2V0KCk7XHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRlbWl0KFwic2VhcmNoLXJlcXVlc3QtbG9hZGluZ1wiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDovabovoZzb2NrZXTmn6Xor6JcclxuICAgICAqIEBwYXJhbSBzb2NrZXRTZWFyY2hQYXJhbXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHdlYnNvY2tldFF1aWNrU2VhcmNoQnlDYXIoc29ja2V0U2VhcmNoUGFyYW1zOiBhbnkpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgLy8g5ZCR54i26aG16Z2i5bm/5pKtLS3mn6Xor6LlvIDlp4tcclxuICAgICAgICBzZWxmLiRzY29wZS4kZW1pdChcInNlYXJjaC1yZXF1ZXN0LWxvYWRpbmdcIiwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIHNlbGYuaW5pdFBhZ2VQYXJhbXMoKTtcclxuXHJcbiAgICAgICAgLy8g6K6+572u5p+l6K+i5Y+C5pWw57yT5a2YXHJcbiAgICAgICAgU2V0SGlzdG9yeVF1ZXJ5UmVjb3JkKHNvY2tldFNlYXJjaFBhcmFtcyk7XHJcblxyXG4gICAgICAgIC8vIOe9ruepuuWFtuWug+aVsOaNrlxyXG4gICAgICAgIHNlbGYuaW5pdFBhcmFtcygpO1xyXG4gICAgICAgIHNlbGYucmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLmFkdmFuY2VkU2VhcmNoQnlDYXIoc29ja2V0U2VhcmNoUGFyYW1zKS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5tb25pdG9yQ2FyU29ja2V0KCk7XHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRlbWl0KFwic2VhcmNoLXJlcXVlc3QtbG9hZGluZ1wiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoXCJxdWlja1NlYXJjaENvbnRyb2xsZXJcIiwgcXVpY2tTZWFyY2hDb250cm9sbGVyKTsiXX0=
