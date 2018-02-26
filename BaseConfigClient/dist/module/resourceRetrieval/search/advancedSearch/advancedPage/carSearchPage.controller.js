define(["require", "exports", "text!../../../../detailPopup/carPopup/carPopup.html", "text!../../../../selectPopup/treeBayonet/Tree.bayonet.popup.html", "../../../../common/app/main.app", "../adVanceSearchEnum", "../../../../common/directive/page/page-params", "../../../resourceRetrievalEnum", "../../../../common/factory/attribute.factory", "../../../../../core/server/enum/PVDictType", "../../../../../core/server/enum/SocketResultTypeEnum", "../../../../../core/enum/ObjectType", "../../../../../core/server/enum/CollectDataType", "lodash", "../../../../selectPopup/treeBayonet/Tree.bayonet.popup", "../../../../common/services/resourceRetrieval.service", "../../../../common/factory/layerMsg.factory", "../../../../common/factory/socket.factory", "../../../../common/services/uploadImage.service", "../../../../common/factory/userinfo.cache.factory", "../../../../common/factory/datas.cache.page.factory", "../../../../common/factory/dataSelect.factory", "../../../../common/factory/attribute.factory"], function (require, exports, carPopupHtml, bayonetTreePopupHtml, main_app_1, adVanceSearchEnum_1, page_params_1, resourceRetrievalEnum_1, attribute_factory_1, PVDictType_1, SocketResultTypeEnum_1, ObjectType_1, CollectDataType_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CarSearchPageController = (function () {
        function CarSearchPageController($scope, $timeout, layer, $q, resourceRetrievalService, dataSelectServer, layerDec, datasCachePageFactory, socketFactory, uploadImageService, userInfoCacheFactory) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.layer = layer;
            this.$q = $q;
            this.resourceRetrievalService = resourceRetrievalService;
            this.dataSelectServer = dataSelectServer;
            this.layerDec = layerDec;
            this.datasCachePageFactory = datasCachePageFactory;
            this.socketFactory = socketFactory;
            this.uploadImageService = uploadImageService;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.$inject = ['$scope', '$timeout', 'layer', '$q', 'resourceRetrievalService', 'dataSelectServer', 'layerDec', 'datasCachePageFactory', 'socketFactory', 'ResourceSearchMapController', 'uploadImageService', "userInfoCacheFactory"];
            this.minSacle = 1;
            this.maxSacle = 100;
            this.selectTimeAcitve = 3;
            this.showMore = false;
            this.carImgList = [];
            this.searchParams = {};
            this.carTypeList = [];
            this.vehicleBrandList = [];
            this.currentVehicleSubBrandList = [];
            this.carResult = resourceRetrievalEnum_1.initCarResult(0);
            this.allVehicleSubBrandList = [];
            this.pageParams = new page_params_1.default();
            this.attributeFactory = new attribute_factory_1.AttributeFactory();
            this.queryStatus = 1;
            this.selectDeviceCb = "close.bayonet.popup";
            var self = this;
            self.initParams();
            self.initPvdInfo();
            self.$scope.$on("advancedSearch-change", function (event, data) {
                if ((data === "person") || (data === "all")) {
                    self.initParams();
                }
            });
            self.$scope.$on("search-device-id", function (event, data, dataType) {
                if (dataType === ObjectType_1.ObjectType.RmpGate.value) {
                    var arrCameraId = angular.copy(self.searchParams.arrObjectID);
                    arrCameraId = _.concat(data, arrCameraId);
                    arrCameraId = _.uniq(arrCameraId);
                    self.searchParams.arrObjectID = arrCameraId;
                }
            });
            self.$scope.$on(self.selectDeviceCb, function (event, cameraIds, status) {
                if (status) {
                    if (Array.isArray(cameraIds)) {
                        self.$timeout(function () {
                            self.searchParams.arrObjectID = cameraIds;
                        });
                    }
                }
                self.layer.close(self.currentLayerIndex);
            });
            self.$scope.$on("$destroy", function () {
                self.layer.close(self.currentLayerIndex);
                self.unbindSocket();
            });
        }
        CarSearchPageController.prototype.initParams = function () {
            var self = this;
            var searchParams = {};
            self.carImgList = [
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
            self.crossTrainTimeList = adVanceSearchEnum_1.CrossTrainTimeList();
            self.licencePlateList = adVanceSearchEnum_1.LicencePlateList();
            self.carColorList = adVanceSearchEnum_1.CarColorList();
            self.selectTimeAcitve = 3;
            self.queryStatus = 1;
            self.carResult.pageParams.pageSize = 16;
            self.carResult.pageParams.pageSize = 40;
            self.carResult.pageParams.currentPage = 1;
            self.carResult.pageParams.totalCount = 0;
            self.carResult.pageParams.pageCount = 0;
            self.carResult.data = [];
            var time = self.attributeFactory.getCrossTrainTime(self.selectTimeAcitve);
            self.searchParams = {
                plateNumber: "",
                imagePath: "",
                redisId: "",
                startTime: time.startTime,
                endTime: time.endTime,
                vehicleBodyThreshold: 75,
                characterThreshold: 75,
                vehicleTypesStr: "",
                currentPage: self.carResult.pageParams.currentPage,
                pageSize: self.carResult.pageParams.pageSize,
                arrObjectID: [],
                areaId: [],
                vehicleColor: "",
                plateColor: ""
            };
            self.$timeout(function () {
                self.socketData = [];
            });
        };
        CarSearchPageController.prototype.initPvdInfo = function () {
            var self = this;
            self.resourceRetrievalService.getPVDType(PVDictType_1.PVDictType.VehicleType.value).then(function (res) {
                if (res.code === 200) {
                    var list_1 = [];
                    _.mapKeys(res.data, function (value, key) {
                        list_1.push({ status: false, name: value, val: key });
                    });
                    self.carTypeList = list_1;
                }
                else {
                    self.layerDec.warnInfo("查询车辆类型失败");
                }
            });
            self.resourceRetrievalService.getPVDType(PVDictType_1.PVDictType.VehicleBrand.value).then(function (res) {
                if (res.code === 200) {
                    var list_2 = [];
                    _.mapKeys(res.data, function (value, key) {
                        list_2.push({ status: false, name: value, val: key });
                    });
                    self.vehicleBrandList = list_2;
                }
                else {
                    self.layerDec.warnInfo("查询车辆品牌失败");
                }
            });
        };
        CarSearchPageController.prototype.selectLicencePlateList = function (item) {
            var self = this;
            self.licencePlateList.forEach(function (value, index, array) {
                if (value.name === item.name) {
                    value.status = true;
                    self.searchParams.vehicleColor = value.val;
                }
                else {
                    value.status = false;
                }
            });
        };
        CarSearchPageController.prototype.selectCarColorList = function (item) {
            var self = this;
            self.carColorList.forEach(function (value, index, array) {
                if (value.name === item.name) {
                    value.status = true;
                    self.searchParams.vehicleColor = value.val;
                }
                else {
                    value.status = false;
                }
            });
        };
        CarSearchPageController.prototype.selectTime = function (item) {
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
        CarSearchPageController.prototype.changeCarTypeSelect = function (select) {
            if (!select) {
                this.searchParams.vehicleTypesStr = null;
            }
            else {
                this.searchParams.vehicleTypesStr = select.val;
            }
        };
        CarSearchPageController.prototype.changeVehicleBrandTypeSelect = function (item) {
            var self = this;
            if (!item) {
                this.searchParams.vehicleBrand = null;
                this.searchParams.vehicleSubBrand = null;
                self.currentVehicleSubBrandList = [];
                return;
            }
            self.searchParams.vehicleBrand = item.val;
            self.resourceRetrievalService.getSubGrand(item.val).then(function (res) {
                if (res.code === 200) {
                    var list_3 = [];
                    res.data.forEach(function (value, index, array) {
                        list_3.push({ status: false, name: value.value, val: value.key });
                    });
                    self.currentVehicleSubBrandList = list_3;
                }
                else {
                    self.layerDec.warnInfo("查询车辆子品牌失败");
                }
            });
        };
        CarSearchPageController.prototype.changeVehicleSubBrand = function (select) {
            if (!select) {
                this.searchParams.vehicleSubBrand = null;
            }
            else {
                this.searchParams.vehicleSubBrand = select.val;
            }
        };
        CarSearchPageController.prototype.searchAdvancedSubmit = function () {
            var self = this;
            var searchParams = {};
            var featureSearchExt = [];
            var fetureTaskParam = [];
            searchParams = angular.copy(self.searchParams);
            searchParams.currentPage = 1;
            searchParams.redisId = "";
            searchParams.imagePath = "";
            _.forEach(self.carImgList, function (value, key) {
                if (value.featureSearchExt) {
                    searchParams.imagePath = "Car";
                    featureSearchExt.push(value.featureSearchExt);
                    searchParams.redisId = value.featureSearchExt.accessLogId;
                    searchParams.imagePath = value.featureSearchExt.imgUrl;
                }
                else if (value.fetureTaskParam) {
                    searchParams.imagePath = "Car";
                    fetureTaskParam.push(value.fetureTaskParam);
                    searchParams.redisId = value.fetureTaskParam.arrFetureTaskId;
                    searchParams.imagePath = value.fetureTaskParam.imageUrl;
                }
            });
            searchParams.featureSearchExt = featureSearchExt;
            searchParams.fetureTaskParam = fetureTaskParam;
            if (searchParams.redisId !== "") {
                searchParams.plateNumber = "";
            }
            else if (searchParams.plateNumber === "") {
                self.layerDec.warnInfo("请先上传车辆图片或输入车牌号进行检索");
                return;
            }
            if (self.selectTimeAcitve !== 4) {
                var time = self.attributeFactory.getCrossTrainTime(self.selectTimeAcitve);
                searchParams.startTime = time.startTime;
                searchParams.endTime = time.endTime;
            }
            self.getServerMessage(searchParams);
        };
        CarSearchPageController.prototype.getServerMessage = function (searchParams) {
            var self = this;
            self.searchParams = angular.copy(searchParams);
            searchParams.startTime = searchParams.startTime.substring(0, 10);
            searchParams.endTime = searchParams.endTime.substring(0, 10);
            self.queryStatus = 2;
            self.unbindSocket();
            self.resourceRetrievalService.advancedSearchByCarEx(searchParams).then(function (res) {
                if (res.code === 200) {
                    if (searchParams.redisId !== "") {
                        self.carResult.pageParams.totalCount = 0;
                        self.carResult.pageParams.pageCount = 0;
                        self.carResult.data = [];
                        self.bindingSocket();
                    }
                    else {
                        if ((typeof res.data !== 'undefined') && (res.data.Vehicle.TotalCount > 0)) {
                            self.disposeCommonData(res.data.Vehicle);
                        }
                        else {
                            self.carResult.pageParams.totalCount = 0;
                            self.carResult.pageParams.pageCount = 0;
                            self.carResult.data = [];
                        }
                        self.queryStatus = 3;
                    }
                }
                else {
                    self.queryStatus = 3;
                    self.layerDec.warnInfo("查询失败");
                }
            });
        };
        CarSearchPageController.prototype.disposeCommonData = function (data) {
            var self = this;
            var params = {
                deviceIds: [],
                deviceType: '',
                ids: [],
                userId: self.userInfoCacheFactory.getCurrentUserId()
            };
            params.deviceType = ObjectType_1.ObjectType.RmpGate.value;
            _.forEach(data.Result, function (value) {
                params.deviceIds.push(value.deviceId);
                params.ids.push(value.id);
            });
            self.resourceRetrievalService.getDeviceInfoPromise(params).then(function (res) {
                _.forEach(data.Result, function (item, index) {
                    item.deviceInfo = res.data.deviceInfo[index];
                    item.collectStatus = res.data.collectStatus[index];
                });
                self.$timeout(function () {
                    self.carResult.pageParams.totalCount = data.TotalCount;
                    self.carResult.pageParams.pageCount = Math.ceil(data.TotalCount / self.carResult.pageParams.pageSize);
                    self.carResult.data = data.Result;
                    self.carResult.taskId = data.TaskId;
                    self.queryStatus = 3;
                });
            });
        };
        CarSearchPageController.prototype.changePage = function (num) {
            var self = this;
            self.searchParams.currentPage = num;
            self.carResult.pageParams.currentPage = num;
            if ((self.searchParams.fetureTaskParam.length > 0) || (self.searchParams.featureSearchExt.length > 0)) {
                self.dealSocketData();
            }
            else {
                self.getServerMessage(self.searchParams);
            }
            return self.carResult.pageParams;
        };
        ;
        CarSearchPageController.prototype.dealSocketData = function () {
            var self = this;
            var carResultData = [];
            var min = self.carResult.pageParams.pageSize * (self.carResult.pageParams.currentPage - 1);
            var max = self.carResult.pageParams.pageSize * self.carResult.pageParams.currentPage;
            var newData = {
                Result: [],
                TotalCount: self.socketData.TotalCount,
                TaskId: self.socketData.TaskId
            };
            for (var i = min; i < max && i < self.socketData.TotalCount; i++) {
                newData.Result.push(self.socketData.Result[i]);
            }
            self.disposeCommonData(newData);
        };
        CarSearchPageController.prototype.bindingSocket = function () {
            var self = this;
            self.socketFactory.subscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.CarSearch, function (result) {
                if (result[0].code === 200) {
                    self.socketData = result[0].data.Vehicle;
                    self.$timeout(function () {
                        self.dealSocketData();
                    });
                }
                else {
                    self.$timeout(function () {
                        self.queryStatus = 3;
                    });
                }
                self.unbindSocket();
            });
        };
        CarSearchPageController.prototype.unbindSocket = function () {
            this.socketFactory.unSubscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.CarSearch);
        };
        CarSearchPageController.prototype.imgUploading = function (event, item, index) {
            var self = this;
            var from = new FormData();
            from.append('image', event.target.files[0]);
            this.uploadImageService.uploadImageForCar(from).then(function (res) {
                if (res.code === 200) {
                    var obj_1 = {
                        id: 0,
                        value: res.data.imageUrl,
                        key: res.data.redisId,
                        fetureTaskParam: {
                            arrFetureTaskId: res.data.redisId,
                            imageUrl: res.data.imageUrl
                        }
                    };
                    self.$timeout(function () {
                        self.carImgList[index] = obj_1;
                    });
                }
                else {
                    self.layerDec.warnInfo('车辆上传失败');
                }
            });
        };
        CarSearchPageController.prototype.imgCancel = function (index) {
            var self = this;
            var item = {
                id: 0,
                value: "",
                key: "",
                fetureTaskParam: null,
                featureSearchExt: null
            };
            self.carImgList[index] = item;
        };
        CarSearchPageController.prototype.selectCamera = function () {
            var self = this;
            var scope = self.$scope.$new();
            scope.selectBayonetList = self.searchParams.arrObjectID;
            scope.selectCtrlCb = self.selectDeviceCb;
            self.currentLayerIndex = self.layer.open({
                type: 1,
                content: bayonetTreePopupHtml,
                scope: scope,
                title: "卡口选择",
                area: ["710px", "620px"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        CarSearchPageController.prototype.clickCollect = function (event, item) {
            if (event) {
                event.stopPropagation();
            }
            var self = this;
            if (!item.collectStatus) {
                var params = {
                    json: angular.toJson(item),
                    objectID: item.id,
                    objectType: CollectDataType_1.CollectDataType.Car.value
                };
                self.resourceRetrievalService.collectAddInfo(params)
                    .then(function (res) {
                    if (res) {
                    }
                });
            }
            else {
                var params = {
                    ids: item.id
                };
                self.resourceRetrievalService.collectDeleteInfo(params)
                    .then(function (res) {
                    if (res) {
                    }
                });
            }
            item.collectStatus = !item.collectStatus;
        };
        CarSearchPageController.prototype.clickAnalysis = function (event, item) {
            if (event) {
                event.stopPropagation();
            }
        };
        CarSearchPageController.prototype.clickSurveillance = function (event, item) {
            if (event) {
                event.stopPropagation();
            }
            item.surveillanceStatus = !item.surveillanceStatus;
        };
        CarSearchPageController.prototype.detailPopup = function (rank, allList) {
            var self = this;
            var scope = self.$scope.$new();
            scope.rank = rank;
            scope.allList = allList;
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
                self.layer.close(self.currentLayerIndex);
            };
            self.currentLayerIndex = self.layer.open({
                type: 1,
                skin: 'detail-popup-box',
                title: false,
                area: ['670px', '420px'],
                content: carPopupHtml,
                scope: scope,
                end: function () {
                    scope.$destroy();
                }
            });
        };
        CarSearchPageController.prototype.fullScreen = function (path) {
            var scope = this.$scope.$new();
            scope.index = "fullScreenPopup";
            scope.path = path;
            if (path) {
                var contentHTML = "<img ng-src=" + path + " style='width:800px;height:632px;'>";
                this.layer.open({
                    type: 1,
                    title: false,
                    closeBtn: 0,
                    skin: 'layui-layer-nobg no-scroll',
                    shadeClose: true,
                    shade: 0.6,
                    area: ['800px', '632px'],
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
        CarSearchPageController.prototype.onDropComplete = function (dragData, evt, index) {
            var self = this;
            var item = {
                id: 0,
                value: "",
                key: ""
            };
            item.featureSearchExt = {
                accessLogId: dragData.id,
                featureType: "AccessFeature",
                imgUrl: dragData.panoramaImage
            };
            item.value = dragData.panoramaImage;
            item.key = dragData.id;
            self.carImgList[index] = item;
        };
        CarSearchPageController.prototype.selectDevice = function (type) {
            this.$scope.$emit("search-device-type", type);
            this.$scope.$emit("search-pattern", "advanced");
        };
        return CarSearchPageController;
    }());
    main_app_1.app.controller('CarSearchPageController', CarSearchPageController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvc2VhcmNoL2FkdmFuY2VkU2VhcmNoL2FkdmFuY2VkUGFnZS9jYXJTZWFyY2hQYWdlLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBNERBO1FBa0NJLGlDQUFvQixNQUFXLEVBQ25CLFFBQWEsRUFDYixLQUFVLEVBQ1YsRUFBTyxFQUNQLHdCQUFtRCxFQUNuRCxnQkFBa0MsRUFDbEMsUUFBbUIsRUFDbkIscUJBQTRDLEVBQzVDLGFBQTZCLEVBQzdCLGtCQUF1QyxFQUN2QyxvQkFBMkM7WUFWbkMsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFLO1lBQ2IsVUFBSyxHQUFMLEtBQUssQ0FBSztZQUNWLE9BQUUsR0FBRixFQUFFLENBQUs7WUFDUCw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTJCO1lBQ25ELHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7WUFDbEMsYUFBUSxHQUFSLFFBQVEsQ0FBVztZQUNuQiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1lBQzVDLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtZQUM3Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXFCO1lBQ3ZDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBdUI7WUEzQ3ZELFlBQU8sR0FBa0IsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsMEJBQTBCLEVBQUUsa0JBQWtCLEVBQUUsVUFBVSxFQUFFLHVCQUF1QixFQUFFLGVBQWUsRUFBRSw2QkFBNkIsRUFBRSxvQkFBb0IsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1lBRWxQLGFBQVEsR0FBVyxDQUFDLENBQUM7WUFDckIsYUFBUSxHQUFXLEdBQUcsQ0FBQztZQUN2QixxQkFBZ0IsR0FBVyxDQUFDLENBQUM7WUFDN0IsYUFBUSxHQUFZLEtBQUssQ0FBQztZQUMxQixlQUFVLEdBQXFCLEVBQUUsQ0FBQztZQUNsQyxpQkFBWSxHQUF1QixFQUF3QixDQUFDO1lBSTVELGdCQUFXLEdBQTBCLEVBQUUsQ0FBQztZQUN4QyxxQkFBZ0IsR0FBMEIsRUFBRSxDQUFDO1lBQzdDLCtCQUEwQixHQUEwQixFQUFFLENBQUM7WUFDdkQsY0FBUyxHQUFZLHFDQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFHdEMsMkJBQXNCLEdBQTBCLEVBQUUsQ0FBQztZQVNuRCxlQUFVLEdBQWUsSUFBSSxxQkFBVSxFQUFFLENBQUM7WUFHMUMscUJBQWdCLEdBQXFCLElBQUksb0NBQWdCLEVBQUUsQ0FBQztZQUM1RCxnQkFBVyxHQUFXLENBQUMsQ0FBQztZQUN4QixtQkFBYyxHQUFXLHFCQUFxQixDQUFDO1lBYTNDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztZQUVoQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFFbEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBR25CLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLFVBQVUsS0FBVSxFQUFFLElBQVM7Z0JBQ3BFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDMUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUN0QixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxVQUFDLEtBQVUsRUFBRSxJQUFTLEVBQUUsUUFBZ0I7Z0JBQ3hFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyx1QkFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUN4QyxJQUFJLFdBQVcsR0FBa0IsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUM3RSxXQUFXLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7b0JBQzFDLFdBQVcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7Z0JBQ2hELENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUdILElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsVUFBQyxLQUFVLEVBQUUsU0FBd0IsRUFBRSxNQUFjO2dCQUN0RixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNULEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDOzRCQUNWLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQzt3QkFDOUMsQ0FBQyxDQUFDLENBQUM7b0JBQ1AsQ0FBQztnQkFDTCxDQUFDO2dCQUNELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQzdDLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFO2dCQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDekMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVPLDRDQUFVLEdBQWxCO1lBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLElBQUksWUFBWSxHQUF1QixFQUF3QixDQUFDO1lBR2hFLElBQUksQ0FBQyxVQUFVLEdBQUc7Z0JBQ2Q7b0JBQ0ksRUFBRSxFQUFFLENBQUM7b0JBQ0wsS0FBSyxFQUFFLEVBQUU7b0JBQ1QsR0FBRyxFQUFFLEVBQUU7aUJBQ1YsRUFBRTtvQkFDQyxFQUFFLEVBQUUsQ0FBQztvQkFDTCxLQUFLLEVBQUUsRUFBRTtvQkFDVCxHQUFHLEVBQUUsRUFBRTtpQkFDVixFQUFFO29CQUNDLEVBQUUsRUFBRSxDQUFDO29CQUNMLEtBQUssRUFBRSxFQUFFO29CQUNULEdBQUcsRUFBRSxFQUFFO2lCQUNWLEVBQUU7b0JBQ0MsRUFBRSxFQUFFLENBQUM7b0JBQ0wsS0FBSyxFQUFFLEVBQUU7b0JBQ1QsR0FBRyxFQUFFLEVBQUU7aUJBQ1YsRUFBRTtvQkFDQyxFQUFFLEVBQUUsQ0FBQztvQkFDTCxLQUFLLEVBQUUsRUFBRTtvQkFDVCxHQUFHLEVBQUUsRUFBRTtpQkFDVjthQUNKLENBQUM7WUFFRixJQUFJLENBQUMsa0JBQWtCLEdBQUcsc0NBQWtCLEVBQUUsQ0FBQztZQUMvQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsb0NBQWdCLEVBQUUsQ0FBQztZQUMzQyxJQUFJLENBQUMsWUFBWSxHQUFHLGdDQUFZLEVBQUUsQ0FBQztZQUNuQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1lBRXJCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7WUFHekIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRTFFLElBQUksQ0FBQyxZQUFZLEdBQUc7Z0JBQ2hCLFdBQVcsRUFBRSxFQUFFO2dCQUNmLFNBQVMsRUFBRSxFQUFFO2dCQUNiLE9BQU8sRUFBRSxFQUFFO2dCQUNYLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztnQkFDekIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO2dCQUNyQixvQkFBb0IsRUFBRSxFQUFFO2dCQUN4QixrQkFBa0IsRUFBRSxFQUFFO2dCQUN0QixlQUFlLEVBQUUsRUFBRTtnQkFDbkIsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFdBQVc7Z0JBQ2xELFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRO2dCQUM1QyxXQUFXLEVBQUUsRUFBRTtnQkFDZixNQUFNLEVBQUUsRUFBRTtnQkFDVixZQUFZLEVBQUUsRUFBRTtnQkFDaEIsVUFBVSxFQUFFLEVBQUU7YUFDakIsQ0FBQztZQUVGLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ1YsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7WUFDekIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRU8sNkNBQVcsR0FBbkI7WUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7WUFDaEIsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFVBQVUsQ0FBQyx1QkFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFRO2dCQUNqRixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ25CLElBQUksTUFBSSxHQUFlLEVBQUUsQ0FBQztvQkFDMUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFVBQVUsS0FBSyxFQUFFLEdBQUc7d0JBQ3BDLE1BQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7b0JBQ3hELENBQUMsQ0FBQyxDQUFDO29CQUNILElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBSSxDQUFDO2dCQUM1QixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN2QyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsd0JBQXdCLENBQUMsVUFBVSxDQUFDLHVCQUFVLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQVE7Z0JBQ2xGLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDbkIsSUFBSSxNQUFJLEdBQUcsRUFBRSxDQUFDO29CQUNkLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxVQUFVLEtBQUssRUFBRSxHQUFHO3dCQUNwQyxNQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO29CQUN4RCxDQUFDLENBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsTUFBSSxDQUFDO2dCQUNqQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN2QyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBTUQsd0RBQXNCLEdBQXRCLFVBQXVCLElBQW9CO1lBQ3ZDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztZQUNoQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFVBQVUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO2dCQUN2RCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUMzQixLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztvQkFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFDL0MsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDekIsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQU1ELG9EQUFrQixHQUFsQixVQUFtQixJQUFvQjtZQUNuQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7WUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUs7Z0JBQ25ELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQzNCLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO29CQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUMvQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUN6QixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBTUQsNENBQVUsR0FBVixVQUFXLElBQW9CO1lBQzNCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztZQUNoQixJQUFJLElBQVMsQ0FBQztZQUdkLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsSUFBSSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUM3QyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUM3QyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQzdDLENBQUM7WUFFRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUNqQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFVBQVUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO2dCQUN6RCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUN6QixLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDeEIsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDekIsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUFBLENBQUM7UUFFRixxREFBbUIsR0FBbkIsVUFBb0IsTUFBc0I7WUFDdEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNWLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztZQUM3QyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUNuRCxDQUFDO1FBQ0wsQ0FBQztRQUVELDhEQUE0QixHQUE1QixVQUE2QixJQUFvQjtZQUM3QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7WUFFaEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNSLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztnQkFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO2dCQUN6QyxJQUFJLENBQUMsMEJBQTBCLEdBQUcsRUFBRSxDQUFDO2dCQUNyQyxNQUFNLENBQUM7WUFDWCxDQUFDO1lBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUMxQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFRO2dCQUM5RCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ25CLElBQUksTUFBSSxHQUFHLEVBQUUsQ0FBQztvQkFDZCxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSzt3QkFDMUMsTUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO29CQUNwRSxDQUFDLENBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsMEJBQTBCLEdBQUcsTUFBSSxDQUFDO2dCQUMzQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUN4QyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQsdURBQXFCLEdBQXJCLFVBQXNCLE1BQXNCO1lBQ3hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDVixJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7WUFDN0MsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDbkQsQ0FBQztRQUNMLENBQUM7UUFFRCxzREFBb0IsR0FBcEI7WUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7WUFDaEIsSUFBSSxZQUFZLEdBQXVCLEVBQXdCLENBQUM7WUFDaEUsSUFBSSxnQkFBZ0IsR0FBZSxFQUFFLENBQUM7WUFDdEMsSUFBSSxlQUFlLEdBQWUsRUFBRSxDQUFDO1lBRXJDLFlBQVksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMvQyxZQUFZLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztZQUM3QixZQUFZLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUMxQixZQUFZLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUU1QixDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsVUFBVSxLQUFLLEVBQUUsR0FBRztnQkFDM0MsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztvQkFDekIsWUFBWSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7b0JBQy9CLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFFOUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDO29CQUMxRCxZQUFZLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7Z0JBQzNELENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO29CQUMvQixZQUFZLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztvQkFDL0IsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7b0JBRTVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUM7b0JBQzdELFlBQVksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUM7Z0JBQzVELENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUNILFlBQVksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztZQUNqRCxZQUFZLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztZQUMvQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLFlBQVksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQ2xDLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2dCQUM3QyxNQUFNLENBQUM7WUFDWCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDMUUsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUN4QyxZQUFZLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDeEMsQ0FBQztZQWFELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN4QyxDQUFDO1FBRUQsa0RBQWdCLEdBQWhCLFVBQWlCLFlBQWdDO1lBQzdDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztZQUNoQixJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFL0MsWUFBWSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDakUsWUFBWSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFRO2dCQUU1RSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ25CLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQzt3QkFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQzt3QkFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO3dCQUN6QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3pCLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLEtBQUssV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN6RSxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDN0MsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDSixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDOzRCQUN6QyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDOzRCQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7d0JBQzdCLENBQUM7d0JBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7b0JBQ3pCLENBQUM7Z0JBQ0wsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztvQkFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ25DLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFRTyxtREFBaUIsR0FBekIsVUFBMEIsSUFBUztZQUMvQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7WUFDaEIsSUFBSSxNQUFNLEdBQU87Z0JBQ2IsU0FBUyxFQUFFLEVBQUU7Z0JBQ2IsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsR0FBRyxFQUFFLEVBQUU7Z0JBQ1AsTUFBTSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsRUFBRTthQUN2RCxDQUFDO1lBQ0YsTUFBTSxDQUFDLFVBQVUsR0FBRyx1QkFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDN0MsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLFVBQVUsS0FBSztnQkFDakMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN0QyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsd0JBQXdCLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBTztnQkFDcEUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLFVBQVUsSUFBSSxFQUFFLEtBQUs7b0JBQ3ZDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzdDLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZELENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ1YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7b0JBQ3ZELElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3RHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7b0JBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7b0JBQ3BDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO2dCQUN6QixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQU9NLDRDQUFVLEdBQWpCLFVBQWtCLEdBQVc7WUFDekIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztZQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1lBRTVDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBRSxJQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNwRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDMUIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDN0MsQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztRQUNyQyxDQUFDO1FBQUEsQ0FBQztRQUdLLGdEQUFjLEdBQXJCO1lBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLElBQUksYUFBYSxHQUFlLEVBQUUsQ0FBQztZQUNuQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDM0YsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztZQUNyRixJQUFJLE9BQU8sR0FBTztnQkFDZCxNQUFNLEVBQUUsRUFBRTtnQkFDVixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVO2dCQUN0QyxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNO2FBQ2pDLENBQUM7WUFDRixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDL0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRCxDQUFDO1lBQ0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLENBQUM7UUFFTywrQ0FBYSxHQUFyQjtZQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztZQUNoQixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQ0FBb0IsQ0FBQyxTQUFTLEVBQUUsVUFBQyxNQUFrQjtnQkFDNUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDO3dCQUNWLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDMUIsQ0FBQyxDQUFDLENBQUM7Z0JBRVAsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixJQUFJLENBQUMsUUFBUSxDQUFDO3dCQUNWLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO29CQUN6QixDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUNELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFTyw4Q0FBWSxHQUFwQjtZQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLDJDQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25FLENBQUM7UUFFRCw4Q0FBWSxHQUFaLFVBQWEsS0FBVSxFQUFFLElBQWUsRUFBRSxLQUFhO1lBQ25ELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztZQUNoQixJQUFJLElBQUksR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQVE7Z0JBQzFELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDbkIsSUFBSSxLQUFHLEdBQWM7d0JBQ2pCLEVBQUUsRUFBRSxDQUFDO3dCQUNMLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVE7d0JBQ3hCLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU87d0JBQ3JCLGVBQWUsRUFBRTs0QkFDYixlQUFlLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPOzRCQUNqQyxRQUFRLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRO3lCQUM5QjtxQkFDSixDQUFDO29CQUNGLElBQUksQ0FBQyxRQUFRLENBQUM7d0JBQ1YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFHLENBQUM7b0JBQ2pDLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3JDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRCwyQ0FBUyxHQUFULFVBQVUsS0FBYTtZQUNuQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7WUFDaEIsSUFBSSxJQUFJLEdBQWM7Z0JBQ2xCLEVBQUUsRUFBRSxDQUFDO2dCQUNMLEtBQUssRUFBRSxFQUFFO2dCQUNULEdBQUcsRUFBRSxFQUFFO2dCQUNQLGVBQWUsRUFBRSxJQUFJO2dCQUNyQixnQkFBZ0IsRUFBRSxJQUFJO2FBQ3pCLENBQUM7WUFDRixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNsQyxDQUFDO1FBRUQsOENBQVksR0FBWjtZQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztZQUNoQixJQUFJLEtBQUssR0FBbUYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMvRyxLQUFLLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUM7WUFDeEQsS0FBSyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDckMsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsT0FBTyxFQUFFLG9CQUFvQjtnQkFDN0IsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osS0FBSyxFQUFFLE1BQU07Z0JBQ2IsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztnQkFDeEIsR0FBRyxFQUFFO29CQUNELEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDckIsQ0FBQzthQUNKLENBQUMsQ0FBQztRQUNQLENBQUM7UUFNTSw4Q0FBWSxHQUFuQixVQUFvQixLQUFVLEVBQUUsSUFBUztZQUNyQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNSLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUM1QixDQUFDO1lBQ0QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksTUFBTSxHQUFxQjtvQkFDM0IsSUFBSSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO29CQUMxQixRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQUU7b0JBQ2pCLFVBQVUsRUFBRSxpQ0FBZSxDQUFDLEdBQUcsQ0FBQyxLQUFLO2lCQUN4QyxDQUFDO2dCQUNGLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO3FCQUMvQyxJQUFJLENBQUMsVUFBQyxHQUFRO29CQUNYLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBRVYsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQTtZQUNWLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLE1BQU0sR0FBd0I7b0JBQzlCLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRTtpQkFDZixDQUFDO2dCQUNGLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUM7cUJBQ2xELElBQUksQ0FBQyxVQUFDLEdBQVE7b0JBQ1gsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFFVixDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFBO1lBQ1YsQ0FBQztZQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzdDLENBQUM7UUFNTSwrQ0FBYSxHQUFwQixVQUFxQixLQUFVLEVBQUUsSUFBUztZQUN0QyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNSLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUM1QixDQUFDO1FBQ0wsQ0FBQztRQU1NLG1EQUFpQixHQUF4QixVQUF5QixLQUFVLEVBQUUsSUFBUztZQUMxQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNSLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUM1QixDQUFDO1lBQ0QsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBQ3ZELENBQUM7UUFFTSw2Q0FBVyxHQUFsQixVQUFtQixJQUFZLEVBQUUsT0FBbUI7WUFDaEQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLElBQUksS0FBSyxHQUEySyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3ZNLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3hCLEtBQUssQ0FBQyxlQUFlLEdBQUcsVUFBQyxJQUFTO2dCQUM5QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNsQyxDQUFDLENBQUM7WUFDRixLQUFLLENBQUMsZ0JBQWdCLEdBQUcsVUFBQyxJQUFTO2dCQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNuQyxDQUFDLENBQUM7WUFDRixLQUFLLENBQUMsb0JBQW9CLEdBQUcsVUFBQyxJQUFTO2dCQUNuQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQztZQUNGLEtBQUssQ0FBQyxVQUFVLEdBQUc7Z0JBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDN0MsQ0FBQyxDQUFDO1lBQ0YsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUNyQyxJQUFJLEVBQUUsQ0FBQztnQkFDUCxJQUFJLEVBQUUsa0JBQWtCO2dCQUN4QixLQUFLLEVBQUUsS0FBSztnQkFDWixJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO2dCQUN4QixPQUFPLEVBQUUsWUFBWTtnQkFDckIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osR0FBRyxFQUFFO29CQUNELEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDckIsQ0FBQzthQUNKLENBQUMsQ0FBQztRQUNQLENBQUM7UUFHTSw0Q0FBVSxHQUFqQixVQUFrQixJQUFZO1lBQzFCLElBQUksS0FBSyxHQUFpRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzdGLEtBQUssQ0FBQyxLQUFLLEdBQUcsaUJBQWlCLENBQUM7WUFDaEMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDUCxJQUFJLFdBQVcsR0FBRyxpQkFBZSxJQUFJLHdDQUFxQyxDQUFDO2dCQUMzRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztvQkFDWixJQUFJLEVBQUUsQ0FBQztvQkFDUCxLQUFLLEVBQUUsS0FBSztvQkFDWixRQUFRLEVBQUUsQ0FBQztvQkFDWCxJQUFJLEVBQUUsNEJBQTRCO29CQUNsQyxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsS0FBSyxFQUFFLEdBQUc7b0JBQ1YsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztvQkFDeEIsT0FBTyxFQUFFLFdBQVc7b0JBQ3BCLEtBQUssRUFBRSxLQUFLO29CQUNaLEdBQUcsRUFBRTt3QkFDRCxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ3JCLENBQUM7aUJBQ0osQ0FBQyxDQUFDO1lBQ1AsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQzdCLENBQUM7UUFDTCxDQUFDO1FBRU0sZ0RBQWMsR0FBckIsVUFBc0IsUUFBYSxFQUFFLEdBQVUsRUFBRSxLQUFhO1lBQzFELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztZQUNoQixJQUFJLElBQUksR0FBUTtnQkFDWixFQUFFLEVBQUUsQ0FBQztnQkFDTCxLQUFLLEVBQUUsRUFBRTtnQkFDVCxHQUFHLEVBQUUsRUFBRTthQUNWLENBQUM7WUFDRixJQUFJLENBQUMsZ0JBQWdCLEdBQUc7Z0JBQ3BCLFdBQVcsRUFBRSxRQUFRLENBQUMsRUFBRTtnQkFDeEIsV0FBVyxFQUFFLGVBQWU7Z0JBQzVCLE1BQU0sRUFBRSxRQUFRLENBQUMsYUFBYTthQUNqQyxDQUFDO1lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQztZQUV2QixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNsQyxDQUFDO1FBRU0sOENBQVksR0FBbkIsVUFBb0IsSUFBWTtZQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNwRCxDQUFDO1FBQ0wsOEJBQUM7SUFBRCxDQXhvQkEsQUF3b0JDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLHlCQUF5QixFQUFFLHVCQUF1QixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL3Jlc291cmNlUmV0cmlldmFsL3NlYXJjaC9hZHZhbmNlZFNlYXJjaC9hZHZhbmNlZFBhZ2UvY2FyU2VhcmNoUGFnZS5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi8uLi8uLi8uLi9kZXRhaWxQb3B1cC9jYXJQb3B1cC9jYXJQb3B1cC5odG1sXCIgbmFtZT1cImNhclBvcHVwSHRtbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vLi4vLi4vLi4vc2VsZWN0UG9wdXAvdHJlZUJheW9uZXQvVHJlZS5iYXlvbmV0LnBvcHVwLmh0bWxcIiBuYW1lPVwiYmF5b25ldFRyZWVQb3B1cEh0bWxcIiAvPlxyXG5pbXBvcnQgeyBhcHAgfSBmcm9tICcuLi8uLi8uLi8uLi9jb21tb24vYXBwL21haW4uYXBwJztcclxuXHJcbi8vIOW8ueahhlxyXG5pbXBvcnQgJy4uLy4uLy4uLy4uL3NlbGVjdFBvcHVwL3RyZWVCYXlvbmV0L1RyZWUuYmF5b25ldC5wb3B1cCc7XHJcblxyXG4vLyDmnI3liqFcclxuaW1wb3J0ICcuLi8uLi8uLi8uLi9jb21tb24vc2VydmljZXMvcmVzb3VyY2VSZXRyaWV2YWwuc2VydmljZSc7XHJcbmltcG9ydCB7IElSZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9jb21tb24vc2VydmljZXMvcmVzb3VyY2VSZXRyaWV2YWwuc2VydmljZSc7XHJcbmltcG9ydCAnLi4vLi4vLi4vLi4vY29tbW9uL2ZhY3RvcnkvbGF5ZXJNc2cuZmFjdG9yeSc7XHJcbmltcG9ydCB7IElMYXllckRlYyB9IGZyb20gJy4uLy4uLy4uLy4uL2NvbW1vbi9mYWN0b3J5L2xheWVyTXNnLmZhY3RvcnknO1xyXG5pbXBvcnQgXCIuLi8uLi8uLi8uLi9jb21tb24vZmFjdG9yeS9zb2NrZXQuZmFjdG9yeVwiO1xyXG5pbXBvcnQgeyBJU29ja2V0RmFjdG9yeSB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb21tb24vZmFjdG9yeS9zb2NrZXQuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCIuLi8uLi8uLi8uLi9jb21tb24vc2VydmljZXMvdXBsb2FkSW1hZ2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBJVXBsb2FkSW1hZ2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy91cGxvYWRJbWFnZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uLy4uLy4uLy4uL2NvbW1vbi9mYWN0b3J5L3VzZXJpbmZvLmNhY2hlLmZhY3RvcnlcIjtcclxuaW1wb3J0IHtJVXNlckluZm9DYWNoZUZhY3Rvcnl9IGZyb20gXCIuLi8uLi8uLi8uLi9jb21tb24vZmFjdG9yeS91c2VyaW5mby5jYWNoZS5mYWN0b3J5XCI7XHJcblxyXG4vLyDpq5jnuqfmo4DntKLlj4LmlbBcclxuaW1wb3J0IHtcclxuICAgIG11bHRpcGxlQ2hvaWNlLFxyXG4gICAgTGljZW5jZVBsYXRlTGlzdCxcclxuICAgIENhckNvbG9yTGlzdCxcclxuICAgIENyb3NzVHJhaW5UaW1lTGlzdFxyXG59IGZyb20gJy4uL2FkVmFuY2VTZWFyY2hFbnVtJztcclxuXHJcbi8vIOWPguaVsFxyXG5pbXBvcnQgeyBDb2xsZWN0QWRkUGFyYW1zLCBDb2xsZWN0RGVsZXRlUGFyYW1zIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2NvcmUvZW51bS9RdWVyeVBhcmFtc1wiO1xyXG5pbXBvcnQgUGFnZVBhcmFtcyBmcm9tICcuLi8uLi8uLi8uLi9jb21tb24vZGlyZWN0aXZlL3BhZ2UvcGFnZS1wYXJhbXMnO1xyXG5cclxuLy8g6auY57qn5qOA57Si5Y+C5pWwXHJcbmltcG9ydCB7IGNhciwgY2FySXRlbSwgaW5pdENhclJlc3VsdCwgUXVlcnlJdGVtLCBWZWhpY2xlUXVlcnlJdGVtIH0gZnJvbSAnLi4vLi4vLi4vcmVzb3VyY2VSZXRyaWV2YWxFbnVtJztcclxuaW1wb3J0ICcuLi8uLi8uLi8uLi9jb21tb24vZmFjdG9yeS9kYXRhcy5jYWNoZS5wYWdlLmZhY3RvcnknO1xyXG5pbXBvcnQgeyBEYXRhc0NhY2hlUGFnZUZhY3RvcnksIFBhZ2VNb2RlbCB9IGZyb20gJy4uLy4uLy4uLy4uL2NvbW1vbi9mYWN0b3J5L2RhdGFzLmNhY2hlLnBhZ2UuZmFjdG9yeSc7XHJcbmltcG9ydCAnLi4vLi4vLi4vLi4vY29tbW9uL2ZhY3RvcnkvZGF0YVNlbGVjdC5mYWN0b3J5JztcclxuaW1wb3J0IHtcclxuICAgIERhdGVTZWxlY3RFbnVtLFxyXG4gICAgZGF0YVNlbGVjdFNlcnZlcixcclxuICAgIGRhdGFTZWxlY3RSZXN1bHQsXHJcbiAgICBtb2R1bGVTdHJpbmdcclxufSBmcm9tICcuLi8uLi8uLi8uLi9jb21tb24vZmFjdG9yeS9kYXRhU2VsZWN0LmZhY3RvcnknO1xyXG5pbXBvcnQgXCIuLi8uLi8uLi8uLi9jb21tb24vZmFjdG9yeS9hdHRyaWJ1dGUuZmFjdG9yeVwiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVGYWN0b3J5IH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbW1vbi9mYWN0b3J5L2F0dHJpYnV0ZS5mYWN0b3J5XCI7XHJcbmltcG9ydCB7IEFuZ3VsYXJTY29wZSB9IGZyb20gJy4uLy4uLy4uLy4uL2NvbW1vbi90eXBlcy9iYXNlQW5ndWxhclNjb3BlJztcclxuaW1wb3J0IHsgUFZEaWN0VHlwZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vUFZEaWN0VHlwZSc7XHJcbmltcG9ydCB7IFNlYXJjaFZlaGljbGVNb2RlbCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2NvcmUvcGFyYW1zL1NlYXJjaFZlaGljbGVQYXJhbXMnO1xyXG5pbXBvcnQgeyBQVkRWZWhpY2xlTGlzdE1vZGVsIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vY29yZS9zZXJ2ZXIvUFZEVmVoaWNsZUxpc3RNb2RlbCc7XHJcbmltcG9ydCB7IFJlc3BvbnNlUmVzdWx0LCBQYWdlUmVzdWx0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0JztcclxuaW1wb3J0IHsgQ2hlY2tDYXJSZXN1bHRNb2RlbCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2NvcmUvc2VydmVyL0NoZWNrQ2FyUmVzdWx0TW9kZWwnO1xyXG5pbXBvcnQgeyBWZWhpY2xlU3ViQnJhbmRNb2RlbCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2NvcmUvc2VydmVyL1ZlaGljbGVTdWJCcmFuZE1vZGVsJztcclxuaW1wb3J0IHsgU29ja2V0UmVzdWx0VHlwZUVudW0gfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL1NvY2tldFJlc3VsdFR5cGVFbnVtJztcclxuaW1wb3J0IHsgT2JqZWN0VHlwZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2NvcmUvZW51bS9PYmplY3RUeXBlJztcclxuaW1wb3J0IHsgU3lzdGVtUG9pbnQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vY29yZS9lbnRpdHkvU3lzdGVtUG9pbnRcIjtcclxuaW1wb3J0IHsgQ29sbGVjdERhdGFUeXBlIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vQ29sbGVjdERhdGFUeXBlXCI7XHJcbmltcG9ydCB7UmVzb3VyY2VUeXBlRW51bX0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vUmVzb3VyY2VUeXBlXCI7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xyXG5cclxuZGVjbGFyZSBsZXQgYW5ndWxhcjogYW55LCBjYXJQb3B1cEh0bWw6IGFueSwgYmF5b25ldFRyZWVQb3B1cEh0bWw6IHN0cmluZztcclxuXHJcbmNsYXNzIENhclNlYXJjaFBhZ2VDb250cm9sbGVyIHtcclxuICAgICRpbmplY3Q6IEFycmF5PHN0cmluZz4gPSBbJyRzY29wZScsICckdGltZW91dCcsICdsYXllcicsICckcScsICdyZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UnLCAnZGF0YVNlbGVjdFNlcnZlcicsICdsYXllckRlYycsICdkYXRhc0NhY2hlUGFnZUZhY3RvcnknLCAnc29ja2V0RmFjdG9yeScsICdSZXNvdXJjZVNlYXJjaE1hcENvbnRyb2xsZXInLCAndXBsb2FkSW1hZ2VTZXJ2aWNlJywgXCJ1c2VySW5mb0NhY2hlRmFjdG9yeVwiXTtcclxuXHJcbiAgICBtaW5TYWNsZTogbnVtYmVyID0gMTtcclxuICAgIG1heFNhY2xlOiBudW1iZXIgPSAxMDA7IC8vICDnm7jkvLzluqbmnIDlpKflgLxcclxuICAgIHNlbGVjdFRpbWVBY2l0dmU6IG51bWJlciA9IDM7Ly/ml7bpl7TmrrXlj4LmlbBcclxuICAgIHNob3dNb3JlOiBib29sZWFuID0gZmFsc2U7Ly/mmL7npLrmm7TlpJogdHJ1ZTrpmpDol48gZmFsc2U65pi+56S6XHJcbiAgICBjYXJJbWdMaXN0OiBBcnJheTxRdWVyeUl0ZW0+ID0gW107Ly/kuIrkvKDlm77niYdcclxuICAgIHNlYXJjaFBhcmFtczogU2VhcmNoVmVoaWNsZU1vZGVsID0ge30gYXMgU2VhcmNoVmVoaWNsZU1vZGVsOy8vIOafpeivouWPguaVsFxyXG4gICAgY3Jvc3NUcmFpblRpbWVMaXN0OiBBcnJheTxtdWx0aXBsZUNob2ljZT47Ly8gIOaXtumXtOautVxyXG4gICAgbGljZW5jZVBsYXRlTGlzdDogQXJyYXk8bXVsdGlwbGVDaG9pY2U+Oy8vIOi9pueJjOminOiJslxyXG4gICAgY2FyQ29sb3JMaXN0OiBBcnJheTxtdWx0aXBsZUNob2ljZT47Ly8g6L2m6L6G6aKc6ImyXHJcbiAgICBjYXJUeXBlTGlzdDogQXJyYXk8bXVsdGlwbGVDaG9pY2U+ID0gW107XHJcbiAgICB2ZWhpY2xlQnJhbmRMaXN0OiBBcnJheTxtdWx0aXBsZUNob2ljZT4gPSBbXTtcclxuICAgIGN1cnJlbnRWZWhpY2xlU3ViQnJhbmRMaXN0OiBBcnJheTxtdWx0aXBsZUNob2ljZT4gPSBbXTtcclxuICAgIGNhclJlc3VsdDogY2FySXRlbSA9IGluaXRDYXJSZXN1bHQoMCk7IC8vIOafpeivoue7k+aenFxyXG4gICAgc29ja2V0RGF0YTogYW55O1xyXG5cclxuICAgIGFsbFZlaGljbGVTdWJCcmFuZExpc3Q6IEFycmF5PG11bHRpcGxlQ2hvaWNlPiA9IFtdO1xyXG4gICAgbGljZW5jZVBsYXRlT3RoZXI6IHsgdmFsdWU6IHN0cmluZywgdGV4dDogc3RyaW5nIH07XHJcbiAgICBjYXJDb2xvck90aGVyOiB7IHZhbHVlOiBzdHJpbmcsIHRleHQ6IHN0cmluZyB9O1xyXG4gICAgLy8g6L2m54mM6aKc6ImyXHJcbiAgICAvLyDovabovobpopzoibJcclxuICAgIHNlbGVjdENyb3NzVHJhaW5UaW1lOiBzdHJpbmc7XHJcbiAgICBzdGFydFRpbWU6IHN0cmluZztcclxuICAgIGVuZFRpbWU6IHN0cmluZztcclxuICAgIGN1cnJlbnRMYXllckluZGV4OiBudW1iZXI7XHJcbiAgICBwYWdlUGFyYW1zOiBQYWdlUGFyYW1zID0gbmV3IFBhZ2VQYXJhbXMoKTtcclxuICAgIHByaXZhdGUgc29ja2V0Q2FjaGVNb2RlbDogUGFnZU1vZGVsPFBWRFZlaGljbGVMaXN0TW9kZWw+O1xyXG5cclxuICAgIGF0dHJpYnV0ZUZhY3Rvcnk6IEF0dHJpYnV0ZUZhY3RvcnkgPSBuZXcgQXR0cmlidXRlRmFjdG9yeSgpO1xyXG4gICAgcXVlcnlTdGF0dXM6IG51bWJlciA9IDE7IC8vIOafpeivoueKtuaAgSAgMTog5Yid5aeL54q25oCBIDLvvJrmn6Xor6LkuK0gIDPvvJrmn6Xor6Lnu5PmnZ9cclxuICAgIHNlbGVjdERldmljZUNiOiBzdHJpbmcgPSBcImNsb3NlLmJheW9uZXQucG9wdXBcIjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW55LFxyXG4gICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6IGFueSxcclxuICAgICAgICBwcml2YXRlIGxheWVyOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSAkcTogYW55LFxyXG4gICAgICAgIHByaXZhdGUgcmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlOiBJUmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgZGF0YVNlbGVjdFNlcnZlcjogZGF0YVNlbGVjdFNlcnZlcixcclxuICAgICAgICBwcml2YXRlIGxheWVyRGVjOiBJTGF5ZXJEZWMsXHJcbiAgICAgICAgcHJpdmF0ZSBkYXRhc0NhY2hlUGFnZUZhY3Rvcnk6IERhdGFzQ2FjaGVQYWdlRmFjdG9yeSxcclxuICAgICAgICBwcml2YXRlIHNvY2tldEZhY3Rvcnk6IElTb2NrZXRGYWN0b3J5LFxyXG4gICAgICAgIHByaXZhdGUgdXBsb2FkSW1hZ2VTZXJ2aWNlOiBJVXBsb2FkSW1hZ2VTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgdXNlckluZm9DYWNoZUZhY3Rvcnk6IElVc2VySW5mb0NhY2hlRmFjdG9yeSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgc2VsZi5pbml0UGFyYW1zKCk7XHJcblxyXG4gICAgICAgIHNlbGYuaW5pdFB2ZEluZm8oKTtcclxuXHJcbiAgICAgICAgLy8g55uR5ZCs5bm/5pKt5LqL5Lu2LS3lr7zoiKrliIfmjaItLemHjee9ruaVsOaNrlxyXG4gICAgICAgIHNlbGYuJHNjb3BlLiRvbihcImFkdmFuY2VkU2VhcmNoLWNoYW5nZVwiLCBmdW5jdGlvbiAoZXZlbnQ6IGFueSwgZGF0YTogYW55KSB7XHJcbiAgICAgICAgICAgIGlmICgoZGF0YSA9PT0gXCJwZXJzb25cIikgfHwgKGRhdGEgPT09IFwiYWxsXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmluaXRQYXJhbXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzZWxmLiRzY29wZS4kb24oXCJzZWFyY2gtZGV2aWNlLWlkXCIsIChldmVudDogYW55LCBkYXRhOiBhbnksIGRhdGFUeXBlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGFUeXBlID09PSBPYmplY3RUeXBlLlJtcEdhdGUudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBhcnJDYW1lcmFJZDogQXJyYXk8c3RyaW5nPiA9IGFuZ3VsYXIuY29weShzZWxmLnNlYXJjaFBhcmFtcy5hcnJPYmplY3RJRCk7XHJcbiAgICAgICAgICAgICAgICBhcnJDYW1lcmFJZCA9IF8uY29uY2F0KGRhdGEsIGFyckNhbWVyYUlkKTtcclxuICAgICAgICAgICAgICAgIGFyckNhbWVyYUlkID0gXy51bmlxKGFyckNhbWVyYUlkKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLmFyck9iamVjdElEID0gYXJyQ2FtZXJhSWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g55uR5ZCs6K6+5aSH6YCJ5oup5qCRXHJcbiAgICAgICAgc2VsZi4kc2NvcGUuJG9uKHNlbGYuc2VsZWN0RGV2aWNlQ2IsIChldmVudDogYW55LCBjYW1lcmFJZHM6IEFycmF5PHN0cmluZz4sIHN0YXR1czpib29sZWFuKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNhbWVyYUlkcykpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZWFyY2hQYXJhbXMuYXJyT2JqZWN0SUQgPSBjYW1lcmFJZHM7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5sYXllci5jbG9zZShzZWxmLmN1cnJlbnRMYXllckluZGV4KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2VsZi4kc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLmxheWVyLmNsb3NlKHNlbGYuY3VycmVudExheWVySW5kZXgpO1xyXG4gICAgICAgICAgICBzZWxmLnVuYmluZFNvY2tldCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFBhcmFtcygpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHNlYXJjaFBhcmFtczogU2VhcmNoVmVoaWNsZU1vZGVsID0ge30gYXMgU2VhcmNoVmVoaWNsZU1vZGVsO1xyXG5cclxuICAgICAgICAvLyDliJ3lp4vljJblm77niYfkuIrkvKDliJfooahcclxuICAgICAgICBzZWxmLmNhckltZ0xpc3QgPSBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlkOiAwLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBrZXk6IFwiXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgICAgICAgIGtleTogXCJcIlxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBpZDogMixcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAga2V5OiBcIlwiXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGlkOiAzLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBrZXk6IFwiXCJcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgaWQ6IDQsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgICAgICAgIGtleTogXCJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXTtcclxuICAgICAgICAvLyDorr7nva7nrZvpgInmlbDmja5cclxuICAgICAgICBzZWxmLmNyb3NzVHJhaW5UaW1lTGlzdCA9IENyb3NzVHJhaW5UaW1lTGlzdCgpOy8vICDml7bpl7TmrrVcclxuICAgICAgICBzZWxmLmxpY2VuY2VQbGF0ZUxpc3QgPSBMaWNlbmNlUGxhdGVMaXN0KCk7Ly8g6L2m54mM6aKc6ImyXHJcbiAgICAgICAgc2VsZi5jYXJDb2xvckxpc3QgPSBDYXJDb2xvckxpc3QoKTsvLyDovabovobpopzoibJcclxuICAgICAgICBzZWxmLnNlbGVjdFRpbWVBY2l0dmUgPSAzO1xyXG4gICAgICAgIHNlbGYucXVlcnlTdGF0dXMgPSAxO1xyXG4gICAgICAgIC8vIOmHjee9ruafpeivoue7k+aenFxyXG4gICAgICAgIHNlbGYuY2FyUmVzdWx0LnBhZ2VQYXJhbXMucGFnZVNpemUgPSAxNjtcclxuICAgICAgICBzZWxmLmNhclJlc3VsdC5wYWdlUGFyYW1zLnBhZ2VTaXplID0gNDA7XHJcbiAgICAgICAgc2VsZi5jYXJSZXN1bHQucGFnZVBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgc2VsZi5jYXJSZXN1bHQucGFnZVBhcmFtcy50b3RhbENvdW50ID0gMDtcclxuICAgICAgICBzZWxmLmNhclJlc3VsdC5wYWdlUGFyYW1zLnBhZ2VDb3VudCA9IDA7XHJcbiAgICAgICAgc2VsZi5jYXJSZXN1bHQuZGF0YSA9IFtdO1xyXG5cclxuICAgICAgICAvLyDorr7nva7pu5jorqTmn6Xor6Lml7bmrrVcclxuICAgICAgICBsZXQgdGltZSA9IHNlbGYuYXR0cmlidXRlRmFjdG9yeS5nZXRDcm9zc1RyYWluVGltZShzZWxmLnNlbGVjdFRpbWVBY2l0dmUpO1xyXG4gICAgICAgIC8vIOiuvue9ruafpeivouWPguaVsFxyXG4gICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zID0ge1xyXG4gICAgICAgICAgICBwbGF0ZU51bWJlcjogXCJcIixcclxuICAgICAgICAgICAgaW1hZ2VQYXRoOiBcIlwiLFxyXG4gICAgICAgICAgICByZWRpc0lkOiBcIlwiLFxyXG4gICAgICAgICAgICBzdGFydFRpbWU6IHRpbWUuc3RhcnRUaW1lLFxyXG4gICAgICAgICAgICBlbmRUaW1lOiB0aW1lLmVuZFRpbWUsXHJcbiAgICAgICAgICAgIHZlaGljbGVCb2R5VGhyZXNob2xkOiA3NSxcclxuICAgICAgICAgICAgY2hhcmFjdGVyVGhyZXNob2xkOiA3NSxcclxuICAgICAgICAgICAgdmVoaWNsZVR5cGVzU3RyOiBcIlwiLFxyXG4gICAgICAgICAgICBjdXJyZW50UGFnZTogc2VsZi5jYXJSZXN1bHQucGFnZVBhcmFtcy5jdXJyZW50UGFnZSxcclxuICAgICAgICAgICAgcGFnZVNpemU6IHNlbGYuY2FyUmVzdWx0LnBhZ2VQYXJhbXMucGFnZVNpemUsXHJcbiAgICAgICAgICAgIGFyck9iamVjdElEOiBbXSxcclxuICAgICAgICAgICAgYXJlYUlkOiBbXSxcclxuICAgICAgICAgICAgdmVoaWNsZUNvbG9yOiBcIlwiLFxyXG4gICAgICAgICAgICBwbGF0ZUNvbG9yOiBcIlwiXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgc2VsZi4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuc29ja2V0RGF0YSA9IFtdO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFB2ZEluZm8oKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYucmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLmdldFBWRFR5cGUoUFZEaWN0VHlwZS5WZWhpY2xlVHlwZS52YWx1ZSkudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIGxldCBsaXN0OiBBcnJheTxhbnk+ID0gW107XHJcbiAgICAgICAgICAgICAgICBfLm1hcEtleXMocmVzLmRhdGEsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdC5wdXNoKHsgc3RhdHVzOiBmYWxzZSwgbmFtZTogdmFsdWUsIHZhbDoga2V5IH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNhclR5cGVMaXN0ID0gbGlzdDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubGF5ZXJEZWMud2FybkluZm8oXCLmn6Xor6LovabovobnsbvlnovlpLHotKVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBzZWxmLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5nZXRQVkRUeXBlKFBWRGljdFR5cGUuVmVoaWNsZUJyYW5kLnZhbHVlKS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxpc3QgPSBbXTtcclxuICAgICAgICAgICAgICAgIF8ubWFwS2V5cyhyZXMuZGF0YSwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0LnB1c2goeyBzdGF0dXM6IGZhbHNlLCBuYW1lOiB2YWx1ZSwgdmFsOiBrZXkgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHNlbGYudmVoaWNsZUJyYW5kTGlzdCA9IGxpc3Q7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxheWVyRGVjLndhcm5JbmZvKFwi5p+l6K+i6L2m6L6G5ZOB54mM5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g6YCJ5oup6L2m54mM6aKc6ImyXHJcbiAgICAgKiBAcGFyYW0ge211bHRpcGxlQ2hvaWNlfSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHNlbGVjdExpY2VuY2VQbGF0ZUxpc3QoaXRlbTogbXVsdGlwbGVDaG9pY2UpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi5saWNlbmNlUGxhdGVMaXN0LmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBpbmRleCwgYXJyYXkpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlLm5hbWUgPT09IGl0ZW0ubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUuc3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLnZlaGljbGVDb2xvciA9IHZhbHVlLnZhbDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlLnN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g6YCJ5oup6L2m6L6G6aKc6ImyXHJcbiAgICAgKiBAcGFyYW0ge211bHRpcGxlQ2hvaWNlfSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHNlbGVjdENhckNvbG9yTGlzdChpdGVtOiBtdWx0aXBsZUNob2ljZSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBzZWxmLmNhckNvbG9yTGlzdC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIGFycmF5KSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS5uYW1lID09PSBpdGVtLm5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlLnN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy52ZWhpY2xlQ29sb3IgPSB2YWx1ZS52YWw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5zdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOi/h+i9puaXtuautVxyXG4gICAgICogQHBhcmFtIHttdWx0aXBsZUNob2ljZX0gaXRlbVxyXG4gICAgICovXHJcbiAgICBzZWxlY3RUaW1lKGl0ZW06IG11bHRpcGxlQ2hvaWNlKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCB0aW1lOiBhbnk7XHJcblxyXG4gICAgICAgIC8vIOaXtuautVxyXG4gICAgICAgIGlmIChpdGVtLnZhbCA9PT0gMSkge1xyXG4gICAgICAgICAgICB0aW1lID0gc2VsZi5hdHRyaWJ1dGVGYWN0b3J5LmdldENyb3NzVHJhaW5UaW1lKDEpO1xyXG4gICAgICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy5zdGFydFRpbWUgPSB0aW1lLnN0YXJ0VGltZTtcclxuICAgICAgICAgICAgc2VsZi5zZWFyY2hQYXJhbXMuZW5kVGltZSA9IHRpbWUuZW5kVGltZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udmFsID09PSAyKSB7XHJcbiAgICAgICAgICAgIHRpbWUgPSBzZWxmLmF0dHJpYnV0ZUZhY3RvcnkuZ2V0Q3Jvc3NUcmFpblRpbWUoMik7XHJcbiAgICAgICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLnN0YXJ0VGltZSA9IHRpbWUuc3RhcnRUaW1lO1xyXG4gICAgICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy5lbmRUaW1lID0gdGltZS5lbmRUaW1lO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKGl0ZW0udmFsID09PSAzKSB8fCAoaXRlbS52YWwgPT09IFwiYWxsXCIpKSB7XHJcbiAgICAgICAgICAgIHRpbWUgPSBzZWxmLmF0dHJpYnV0ZUZhY3RvcnkuZ2V0Q3Jvc3NUcmFpblRpbWUoMyk7XHJcbiAgICAgICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLnN0YXJ0VGltZSA9IHRpbWUuc3RhcnRUaW1lO1xyXG4gICAgICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy5lbmRUaW1lID0gdGltZS5lbmRUaW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZi5zZWxlY3RUaW1lQWNpdHZlID0gaXRlbS52YWw7XHJcbiAgICAgICAgc2VsZi5jcm9zc1RyYWluVGltZUxpc3QuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGluZGV4LCBhcnJheSkge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUudmFsID09PSBpdGVtLnZhbCkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUuc3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlLnN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNoYW5nZUNhclR5cGVTZWxlY3Qoc2VsZWN0OiBtdWx0aXBsZUNob2ljZSkge1xyXG4gICAgICAgIGlmICghc2VsZWN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoUGFyYW1zLnZlaGljbGVUeXBlc1N0ciA9IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hQYXJhbXMudmVoaWNsZVR5cGVzU3RyID0gc2VsZWN0LnZhbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlVmVoaWNsZUJyYW5kVHlwZVNlbGVjdChpdGVtOiBtdWx0aXBsZUNob2ljZSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKCFpdGVtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoUGFyYW1zLnZlaGljbGVCcmFuZCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoUGFyYW1zLnZlaGljbGVTdWJCcmFuZCA9IG51bGw7XHJcbiAgICAgICAgICAgIHNlbGYuY3VycmVudFZlaGljbGVTdWJCcmFuZExpc3QgPSBbXTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy52ZWhpY2xlQnJhbmQgPSBpdGVtLnZhbDtcclxuICAgICAgICBzZWxmLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5nZXRTdWJHcmFuZChpdGVtLnZhbCkudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIGxldCBsaXN0ID0gW107XHJcbiAgICAgICAgICAgICAgICByZXMuZGF0YS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIGFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdC5wdXNoKHsgc3RhdHVzOiBmYWxzZSwgbmFtZTogdmFsdWUudmFsdWUsIHZhbDogdmFsdWUua2V5IH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRWZWhpY2xlU3ViQnJhbmRMaXN0ID0gbGlzdDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubGF5ZXJEZWMud2FybkluZm8oXCLmn6Xor6LovabovoblrZDlk4HniYzlpLHotKVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VWZWhpY2xlU3ViQnJhbmQoc2VsZWN0OiBtdWx0aXBsZUNob2ljZSkge1xyXG4gICAgICAgIGlmICghc2VsZWN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoUGFyYW1zLnZlaGljbGVTdWJCcmFuZCA9IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hQYXJhbXMudmVoaWNsZVN1YkJyYW5kID0gc2VsZWN0LnZhbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2VhcmNoQWR2YW5jZWRTdWJtaXQoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBzZWFyY2hQYXJhbXM6IFNlYXJjaFZlaGljbGVNb2RlbCA9IHt9IGFzIFNlYXJjaFZlaGljbGVNb2RlbDtcclxuICAgICAgICBsZXQgZmVhdHVyZVNlYXJjaEV4dDogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgICAgIGxldCBmZXR1cmVUYXNrUGFyYW06IEFycmF5PGFueT4gPSBbXTtcclxuXHJcbiAgICAgICAgc2VhcmNoUGFyYW1zID0gYW5ndWxhci5jb3B5KHNlbGYuc2VhcmNoUGFyYW1zKTtcclxuICAgICAgICBzZWFyY2hQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIHNlYXJjaFBhcmFtcy5yZWRpc0lkID0gXCJcIjtcclxuICAgICAgICBzZWFyY2hQYXJhbXMuaW1hZ2VQYXRoID0gXCJcIjtcclxuXHJcbiAgICAgICAgXy5mb3JFYWNoKHNlbGYuY2FySW1nTGlzdCwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlLmZlYXR1cmVTZWFyY2hFeHQpIHsgLy8g5ouW5ou9XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hQYXJhbXMuaW1hZ2VQYXRoID0gXCJDYXJcIjtcclxuICAgICAgICAgICAgICAgIGZlYXR1cmVTZWFyY2hFeHQucHVzaCh2YWx1ZS5mZWF0dXJlU2VhcmNoRXh0KTtcclxuICAgICAgICAgICAgICAgIC8vIOS4tOaXtlxyXG4gICAgICAgICAgICAgICAgc2VhcmNoUGFyYW1zLnJlZGlzSWQgPSB2YWx1ZS5mZWF0dXJlU2VhcmNoRXh0LmFjY2Vzc0xvZ0lkO1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoUGFyYW1zLmltYWdlUGF0aCA9IHZhbHVlLmZlYXR1cmVTZWFyY2hFeHQuaW1nVXJsO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlLmZldHVyZVRhc2tQYXJhbSkge1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoUGFyYW1zLmltYWdlUGF0aCA9IFwiQ2FyXCI7XHJcbiAgICAgICAgICAgICAgICBmZXR1cmVUYXNrUGFyYW0ucHVzaCh2YWx1ZS5mZXR1cmVUYXNrUGFyYW0pO1xyXG4gICAgICAgICAgICAgICAgLy8g5Li05pe2XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hQYXJhbXMucmVkaXNJZCA9IHZhbHVlLmZldHVyZVRhc2tQYXJhbS5hcnJGZXR1cmVUYXNrSWQ7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hQYXJhbXMuaW1hZ2VQYXRoID0gdmFsdWUuZmV0dXJlVGFza1BhcmFtLmltYWdlVXJsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2VhcmNoUGFyYW1zLmZlYXR1cmVTZWFyY2hFeHQgPSBmZWF0dXJlU2VhcmNoRXh0O1xyXG4gICAgICAgIHNlYXJjaFBhcmFtcy5mZXR1cmVUYXNrUGFyYW0gPSBmZXR1cmVUYXNrUGFyYW07XHJcbiAgICAgICAgaWYgKHNlYXJjaFBhcmFtcy5yZWRpc0lkICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHNlYXJjaFBhcmFtcy5wbGF0ZU51bWJlciA9IFwiXCI7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzZWFyY2hQYXJhbXMucGxhdGVOdW1iZXIgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgc2VsZi5sYXllckRlYy53YXJuSW5mbyhcIuivt+WFiOS4iuS8oOi9pui+huWbvueJh+aIlui+k+WFpei9pueJjOWPt+i/m+ihjOajgOe0olwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDorr7nva7mnIDmlrDml7bpl7RcclxuICAgICAgICBpZiAoc2VsZi5zZWxlY3RUaW1lQWNpdHZlICE9PSA0KSB7XHJcbiAgICAgICAgICAgIGxldCB0aW1lID0gc2VsZi5hdHRyaWJ1dGVGYWN0b3J5LmdldENyb3NzVHJhaW5UaW1lKHNlbGYuc2VsZWN0VGltZUFjaXR2ZSk7XHJcbiAgICAgICAgICAgIHNlYXJjaFBhcmFtcy5zdGFydFRpbWUgPSB0aW1lLnN0YXJ0VGltZTtcclxuICAgICAgICAgICAgc2VhcmNoUGFyYW1zLmVuZFRpbWUgPSB0aW1lLmVuZFRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIC8vIOiuvue9ruafpeivouiuvuWkh2lkXHJcbiAgICAgICAgLy8gaWYoc2VsZi5zZWFyY2hQYXJhbXMuYXJyT2JqZWN0SUQubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgLy8gICAgIGxldCBzeXN0ZW1Qb2ludExpc3Q6IEFycmF5PFN5c3RlbVBvaW50PiA9IHNlbGYuJHNjb3BlLiRwYXJlbnQuJHBhcmVudC4kcGFyZW50LiRwYXJlbnQuJHBhcmVudC5zeXN0ZW1Qb2ludDtcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCI9PT09PT09PT09PT09c3lzdGVtUG9pbnRMaXN0OlwiLCBzeXN0ZW1Qb2ludExpc3QpO1xyXG4gICAgICAgIC8vICAgICBsZXQgZGV2aWNlSWRzOkFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgICAgICAvLyAgICAgXyhzeXN0ZW1Qb2ludExpc3QpLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAvLyAgICAgICAgIGlmIChPYmplY3RUeXBlLlJtcEdhdGUudmFsdWUgPT09IHZhbHVlLk9iamVjdFR5cGUpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICBkZXZpY2VJZHMucHVzaCh2YWx1ZS5PYmplY3RJRCk7XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgIC8vICAgICBzZWFyY2hQYXJhbXMuYXJyT2JqZWN0SUQgPSBkZXZpY2VJZHM7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHNlbGYuZ2V0U2VydmVyTWVzc2FnZShzZWFyY2hQYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNlcnZlck1lc3NhZ2Uoc2VhcmNoUGFyYW1zOiBTZWFyY2hWZWhpY2xlTW9kZWwpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi5zZWFyY2hQYXJhbXMgPSBhbmd1bGFyLmNvcHkoc2VhcmNoUGFyYW1zKTtcclxuXHJcbiAgICAgICAgc2VhcmNoUGFyYW1zLnN0YXJ0VGltZSA9IHNlYXJjaFBhcmFtcy5zdGFydFRpbWUuc3Vic3RyaW5nKDAsIDEwKTtcclxuICAgICAgICBzZWFyY2hQYXJhbXMuZW5kVGltZSA9IHNlYXJjaFBhcmFtcy5lbmRUaW1lLnN1YnN0cmluZygwLCAxMCk7XHJcbiAgICAgICAgc2VsZi5xdWVyeVN0YXR1cyA9IDI7XHJcbiAgICAgICAgc2VsZi51bmJpbmRTb2NrZXQoKTtcclxuICAgICAgICBzZWxmLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5hZHZhbmNlZFNlYXJjaEJ5Q2FyRXgoc2VhcmNoUGFyYW1zKS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAvLyDmn6Xor6Lnu5PmnZ9cclxuICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChzZWFyY2hQYXJhbXMucmVkaXNJZCAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2FyUmVzdWx0LnBhZ2VQYXJhbXMudG90YWxDb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jYXJSZXN1bHQucGFnZVBhcmFtcy5wYWdlQ291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2FyUmVzdWx0LmRhdGEgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmJpbmRpbmdTb2NrZXQoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCh0eXBlb2YgcmVzLmRhdGEgIT09ICd1bmRlZmluZWQnKSAmJiAocmVzLmRhdGEuVmVoaWNsZS5Ub3RhbENvdW50ID4gMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kaXNwb3NlQ29tbW9uRGF0YShyZXMuZGF0YS5WZWhpY2xlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNhclJlc3VsdC5wYWdlUGFyYW1zLnRvdGFsQ291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNhclJlc3VsdC5wYWdlUGFyYW1zLnBhZ2VDb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2FyUmVzdWx0LmRhdGEgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5xdWVyeVN0YXR1cyA9IDM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnF1ZXJ5U3RhdHVzID0gMztcclxuICAgICAgICAgICAgICAgIHNlbGYubGF5ZXJEZWMud2FybkluZm8oXCLmn6Xor6LlpLHotKVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbuWkhOeQhuafpeivouaVsOaNrlxyXG4gICAgICogQHBhcmFtIHJlc3VsdERhdGFcclxuICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRpc3Bvc2VDb21tb25EYXRhKGRhdGE6IGFueSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgcGFyYW1zOmFueSA9IHtcclxuICAgICAgICAgICAgZGV2aWNlSWRzOiBbXSxcclxuICAgICAgICAgICAgZGV2aWNlVHlwZTogJycsXHJcbiAgICAgICAgICAgIGlkczogW10sXHJcbiAgICAgICAgICAgIHVzZXJJZDogc2VsZi51c2VySW5mb0NhY2hlRmFjdG9yeS5nZXRDdXJyZW50VXNlcklkKClcclxuICAgICAgICB9O1xyXG4gICAgICAgIHBhcmFtcy5kZXZpY2VUeXBlID0gT2JqZWN0VHlwZS5SbXBHYXRlLnZhbHVlO1xyXG4gICAgICAgIF8uZm9yRWFjaChkYXRhLlJlc3VsdCxmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgcGFyYW1zLmRldmljZUlkcy5wdXNoKHZhbHVlLmRldmljZUlkKTtcclxuICAgICAgICAgICAgcGFyYW1zLmlkcy5wdXNoKHZhbHVlLmlkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBzZWxmLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5nZXREZXZpY2VJbmZvUHJvbWlzZShwYXJhbXMpLnRoZW4oKHJlczphbnkpPT57XHJcbiAgICAgICAgICAgIF8uZm9yRWFjaChkYXRhLlJlc3VsdCxmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uZGV2aWNlSW5mbyA9IHJlcy5kYXRhLmRldmljZUluZm9baW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jb2xsZWN0U3RhdHVzID0gcmVzLmRhdGEuY29sbGVjdFN0YXR1c1tpbmRleF07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzZWxmLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNlbGYuY2FyUmVzdWx0LnBhZ2VQYXJhbXMudG90YWxDb3VudCA9IGRhdGEuVG90YWxDb3VudDtcclxuICAgICAgICAgICAgICAgIHNlbGYuY2FyUmVzdWx0LnBhZ2VQYXJhbXMucGFnZUNvdW50ID0gTWF0aC5jZWlsKGRhdGEuVG90YWxDb3VudCAvIHNlbGYuY2FyUmVzdWx0LnBhZ2VQYXJhbXMucGFnZVNpemUpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jYXJSZXN1bHQuZGF0YSA9IGRhdGEuUmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jYXJSZXN1bHQudGFza0lkID0gZGF0YS5UYXNrSWQ7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnF1ZXJ5U3RhdHVzID0gMztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5YiH5o2i6aG15pWwXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtXHJcbiAgICAgKiBAcmV0dXJucyB7UGFnZVBhcmFtc31cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNoYW5nZVBhZ2UobnVtOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi5zZWFyY2hQYXJhbXMuY3VycmVudFBhZ2UgPSBudW07XHJcbiAgICAgICAgc2VsZi5jYXJSZXN1bHQucGFnZVBhcmFtcy5jdXJyZW50UGFnZSA9IG51bTtcclxuICAgICAgICAvLyDpnZ7lm77niYfmn6Xor6JcclxuICAgICAgICBpZiAoKHNlbGYuc2VhcmNoUGFyYW1zLmZldHVyZVRhc2tQYXJhbS5sZW5ndGggPiAwICl8fChzZWxmLnNlYXJjaFBhcmFtcy5mZWF0dXJlU2VhcmNoRXh0Lmxlbmd0aCA+IDAgKSkge1xyXG4gICAgICAgICAgICBzZWxmLmRlYWxTb2NrZXREYXRhKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VsZi5nZXRTZXJ2ZXJNZXNzYWdlKHNlbGYuc2VhcmNoUGFyYW1zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlbGYuY2FyUmVzdWx0LnBhZ2VQYXJhbXM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIOiuvue9rnNvY2tldOivt+axguWPguaVsFxyXG4gICAgcHVibGljIGRlYWxTb2NrZXREYXRhKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgY2FyUmVzdWx0RGF0YTogQXJyYXk8Y2FyPiA9IFtdO1xyXG4gICAgICAgIGxldCBtaW4gPSBzZWxmLmNhclJlc3VsdC5wYWdlUGFyYW1zLnBhZ2VTaXplICogKHNlbGYuY2FyUmVzdWx0LnBhZ2VQYXJhbXMuY3VycmVudFBhZ2UgLSAxKTtcclxuICAgICAgICBsZXQgbWF4ID0gc2VsZi5jYXJSZXN1bHQucGFnZVBhcmFtcy5wYWdlU2l6ZSAqIHNlbGYuY2FyUmVzdWx0LnBhZ2VQYXJhbXMuY3VycmVudFBhZ2U7XHJcbiAgICAgICAgbGV0IG5ld0RhdGE6YW55ID0ge1xyXG4gICAgICAgICAgICBSZXN1bHQ6IFtdLFxyXG4gICAgICAgICAgICBUb3RhbENvdW50OiBzZWxmLnNvY2tldERhdGEuVG90YWxDb3VudCxcclxuICAgICAgICAgICAgVGFza0lkOiBzZWxmLnNvY2tldERhdGEuVGFza0lkXHJcbiAgICAgICAgfTtcclxuICAgICAgICBmb3IgKGxldCBpID0gbWluOyBpIDwgbWF4ICYmIGkgPCBzZWxmLnNvY2tldERhdGEuVG90YWxDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG5ld0RhdGEuUmVzdWx0LnB1c2goc2VsZi5zb2NrZXREYXRhLlJlc3VsdFtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYuZGlzcG9zZUNvbW1vbkRhdGEobmV3RGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBiaW5kaW5nU29ja2V0KCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBzZWxmLnNvY2tldEZhY3Rvcnkuc3Vic2NyaWJlKFNvY2tldFJlc3VsdFR5cGVFbnVtLkNhclNlYXJjaCwgKHJlc3VsdDogQXJyYXk8YW55PikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0WzBdLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zb2NrZXREYXRhID0gcmVzdWx0WzBdLmRhdGEuVmVoaWNsZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGVhbFNvY2tldERhdGEoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucXVlcnlTdGF0dXMgPSAzO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi51bmJpbmRTb2NrZXQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVuYmluZFNvY2tldCgpIHtcclxuICAgICAgICB0aGlzLnNvY2tldEZhY3RvcnkudW5TdWJzY3JpYmUoU29ja2V0UmVzdWx0VHlwZUVudW0uQ2FyU2VhcmNoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbWdVcGxvYWRpbmcoZXZlbnQ6IGFueSwgaXRlbTogUXVlcnlJdGVtLCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBmcm9tID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgZnJvbS5hcHBlbmQoJ2ltYWdlJywgZXZlbnQudGFyZ2V0LmZpbGVzWzBdKTtcclxuICAgICAgICB0aGlzLnVwbG9hZEltYWdlU2VydmljZS51cGxvYWRJbWFnZUZvckNhcihmcm9tKS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9iajogUXVlcnlJdGVtID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXMuZGF0YS5pbWFnZVVybCxcclxuICAgICAgICAgICAgICAgICAgICBrZXk6IHJlcy5kYXRhLnJlZGlzSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZmV0dXJlVGFza1BhcmFtOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyckZldHVyZVRhc2tJZDogcmVzLmRhdGEucmVkaXNJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VVcmw6IHJlcy5kYXRhLmltYWdlVXJsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHNlbGYuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2FySW1nTGlzdFtpbmRleF0gPSBvYmo7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubGF5ZXJEZWMud2FybkluZm8oJ+i9pui+huS4iuS8oOWksei0pScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW1nQ2FuY2VsKGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGl0ZW06IFF1ZXJ5SXRlbSA9IHtcclxuICAgICAgICAgICAgaWQ6IDAsXHJcbiAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICBrZXk6IFwiXCIsXHJcbiAgICAgICAgICAgIGZldHVyZVRhc2tQYXJhbTogbnVsbCxcclxuICAgICAgICAgICAgZmVhdHVyZVNlYXJjaEV4dDogbnVsbFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2VsZi5jYXJJbWdMaXN0W2luZGV4XSA9IGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0Q2FtZXJhKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgc2NvcGU6IHsgc2VsZWN0QmF5b25ldExpc3Q6IEFycmF5PHN0cmluZz4sICRkZXN0cm95OiBGdW5jdGlvbiwgc2VsZWN0Q3RybENiOiBzdHJpbmcgfSA9IHNlbGYuJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICBzY29wZS5zZWxlY3RCYXlvbmV0TGlzdCA9IHNlbGYuc2VhcmNoUGFyYW1zLmFyck9iamVjdElEO1xyXG4gICAgICAgIHNjb3BlLnNlbGVjdEN0cmxDYiA9IHNlbGYuc2VsZWN0RGV2aWNlQ2I7XHJcbiAgICAgICAgc2VsZi5jdXJyZW50TGF5ZXJJbmRleCA9IHNlbGYubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGJheW9uZXRUcmVlUG9wdXBIdG1sLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIHRpdGxlOiBcIuWNoeWPo+mAieaLqVwiLFxyXG4gICAgICAgICAgICBhcmVhOiBbXCI3MTBweFwiLCBcIjYyMHB4XCJdLFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDmlLbol4/kuI7lj5bmtojmlLbol49cclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGlja0NvbGxlY3QoZXZlbnQ6IGFueSwgaXRlbTogY2FyKSB7XHJcbiAgICAgICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCFpdGVtLmNvbGxlY3RTdGF0dXMpIHtcclxuICAgICAgICAgICAgbGV0IHBhcmFtczogQ29sbGVjdEFkZFBhcmFtcyA9IHtcclxuICAgICAgICAgICAgICAgIGpzb246IGFuZ3VsYXIudG9Kc29uKGl0ZW0pLFxyXG4gICAgICAgICAgICAgICAgb2JqZWN0SUQ6IGl0ZW0uaWQsXHJcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBDb2xsZWN0RGF0YVR5cGUuQ2FyLnZhbHVlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHNlbGYucmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLmNvbGxlY3RBZGRJbmZvKHBhcmFtcylcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcGFyYW1zOiBDb2xsZWN0RGVsZXRlUGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAgaWRzOiBpdGVtLmlkXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHNlbGYucmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLmNvbGxlY3REZWxldGVJbmZvKHBhcmFtcylcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaXRlbS5jb2xsZWN0U3RhdHVzID0gIWl0ZW0uY29sbGVjdFN0YXR1cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDliIbmnpBcclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGlja0FuYWx5c2lzKGV2ZW50OiBhbnksIGl0ZW06IGNhcikge1xyXG4gICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5biD5o6n5LiO5Y+W5raI5biD5o6nXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xpY2tTdXJ2ZWlsbGFuY2UoZXZlbnQ6IGFueSwgaXRlbTogY2FyKSB7XHJcbiAgICAgICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpdGVtLnN1cnZlaWxsYW5jZVN0YXR1cyA9ICFpdGVtLnN1cnZlaWxsYW5jZVN0YXR1cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGV0YWlsUG9wdXAocmFuazogbnVtYmVyLCBhbGxMaXN0OiBBcnJheTxjYXI+KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBzY29wZTogeyAkZGVzdHJveTogRnVuY3Rpb24sIHJhbms6IG51bWJlciwgYWxsTGlzdDogQXJyYXk8Y2FyPiwgY29sbGVjdEZ1bmN0aW9uOiBGdW5jdGlvbiwgYW5hbHlzaXNGdW5jdGlvbjogRnVuY3Rpb24sIHN1cnZlaWxsYW5jZUZ1bmN0aW9uOiBGdW5jdGlvbiwgY2xvc2VQb3B1cDogRnVuY3Rpb24gfSA9IHNlbGYuJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICBzY29wZS5yYW5rID0gcmFuaztcclxuICAgICAgICBzY29wZS5hbGxMaXN0ID0gYWxsTGlzdDtcclxuICAgICAgICBzY29wZS5jb2xsZWN0RnVuY3Rpb24gPSAoaXRlbTogY2FyKSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuY2xpY2tDb2xsZWN0KG51bGwsIGl0ZW0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2NvcGUuYW5hbHlzaXNGdW5jdGlvbiA9IChpdGVtOiBjYXIpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5jbGlja0FuYWx5c2lzKG51bGwsIGl0ZW0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2NvcGUuc3VydmVpbGxhbmNlRnVuY3Rpb24gPSAoaXRlbTogY2FyKSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuY2xpY2tTdXJ2ZWlsbGFuY2UobnVsbCwgaXRlbSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzY29wZS5jbG9zZVBvcHVwID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLmxheWVyLmNsb3NlKHNlbGYuY3VycmVudExheWVySW5kZXgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2VsZi5jdXJyZW50TGF5ZXJJbmRleCA9IHNlbGYubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIHNraW46ICdkZXRhaWwtcG9wdXAtYm94JyxcclxuICAgICAgICAgICAgdGl0bGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhcmVhOiBbJzY3MHB4JywgJzQyMHB4J10sXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGNhclBvcHVwSHRtbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmn6XnnIvlhajlm75cclxuICAgIHB1YmxpYyBmdWxsU2NyZWVuKHBhdGg6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBzY29wZTogeyBsYXllcjogYW55OyBpbmRleDogc3RyaW5nLCBwYXRoOiBhbnksICRkZXN0cm95OiBGdW5jdGlvbiB9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLmluZGV4ID0gXCJmdWxsU2NyZWVuUG9wdXBcIjtcclxuICAgICAgICBzY29wZS5wYXRoID0gcGF0aDtcclxuICAgICAgICBpZiAocGF0aCkge1xyXG4gICAgICAgICAgICBsZXQgY29udGVudEhUTUwgPSBgPGltZyBuZy1zcmM9JHtwYXRofSBzdHlsZT0nd2lkdGg6ODAwcHg7aGVpZ2h0OjYzMnB4Oyc+YDtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjbG9zZUJ0bjogMCxcclxuICAgICAgICAgICAgICAgIHNraW46ICdsYXl1aS1sYXllci1ub2JnIG5vLXNjcm9sbCcsXHJcbiAgICAgICAgICAgICAgICBzaGFkZUNsb3NlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2hhZGU6IDAuNixcclxuICAgICAgICAgICAgICAgIGFyZWE6IFsnODAwcHgnLCAnNjMycHgnXSxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGNvbnRlbnRIVE1MLFxyXG4gICAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5tc2coXCLlm77niYflnLDlnYDkuI3lrZjlnKhcIilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uRHJvcENvbXBsZXRlKGRyYWdEYXRhOiBhbnksIGV2dDogRXZlbnQsIGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGl0ZW06IGFueSA9IHtcclxuICAgICAgICAgICAgaWQ6IDAsXHJcbiAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICBrZXk6IFwiXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIGl0ZW0uZmVhdHVyZVNlYXJjaEV4dCA9IHtcclxuICAgICAgICAgICAgYWNjZXNzTG9nSWQ6IGRyYWdEYXRhLmlkLFxyXG4gICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJBY2Nlc3NGZWF0dXJlXCIsXHJcbiAgICAgICAgICAgIGltZ1VybDogZHJhZ0RhdGEucGFub3JhbWFJbWFnZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaXRlbS52YWx1ZSA9IGRyYWdEYXRhLnBhbm9yYW1hSW1hZ2U7XHJcbiAgICAgICAgaXRlbS5rZXkgPSBkcmFnRGF0YS5pZDtcclxuXHJcbiAgICAgICAgc2VsZi5jYXJJbWdMaXN0W2luZGV4XSA9IGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbGVjdERldmljZSh0eXBlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLiRzY29wZS4kZW1pdChcInNlYXJjaC1kZXZpY2UtdHlwZVwiLCB0eXBlKTtcclxuICAgICAgICB0aGlzLiRzY29wZS4kZW1pdChcInNlYXJjaC1wYXR0ZXJuXCIsIFwiYWR2YW5jZWRcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCdDYXJTZWFyY2hQYWdlQ29udHJvbGxlcicsIENhclNlYXJjaFBhZ2VDb250cm9sbGVyKTsiXX0=
