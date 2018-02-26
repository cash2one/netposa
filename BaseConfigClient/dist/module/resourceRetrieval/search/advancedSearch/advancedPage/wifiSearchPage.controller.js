define(["require", "exports", "text!../../../../detailPopup/wifiPopup/wifiPopup.html", "text!../../../../selectPopup/treeWiFi/Tree.wifi.popup.html", "../../../../common/app/main.app", "../adVanceSearchEnum", "../../../resourceRetrievalEnum", "../../../../common/factory/attribute.factory", "../../../../../core/enum/ObjectType", "../../../../../core/server/enum/CollectDataType", "lodash", "../../../../selectPopup/treeWiFi/Tree.wifi.popup", "../../../../common/services/resourceRetrieval.service", "../../../../common/factory/deviceCache.factory", "../../../../common/factory/userinfo.cache.factory", "../../../../common/factory/layerMsg.factory"], function (require, exports, wifiPopupHtml, wifiTreePopupHtml, main_app_1, adVanceSearchEnum_1, resourceRetrievalEnum_1, attribute_factory_1, ObjectType_1, CollectDataType_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WifiSearchPageController = (function () {
        function WifiSearchPageController($scope, $timeout, layer, resourceRetrievalService, deviceCacheServer, userInfoCacheFactory, layerDec) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.layer = layer;
            this.resourceRetrievalService = resourceRetrievalService;
            this.deviceCacheServer = deviceCacheServer;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.layerDec = layerDec;
            this.maxSacle = 100;
            this.selectTimeAcitve = 3;
            this.showMore = false;
            this.wifiResult = resourceRetrievalEnum_1.initWifiResult(0);
            this.attributeFactory = new attribute_factory_1.AttributeFactory();
            this.queryStatus = 1;
            this.selectDeviceCb = "close.wifi.popup";
            var self = this;
            self.initParams();
            self.$scope.$on("search-device-id", function (event, data, dataType) {
                if (dataType === ObjectType_1.ObjectType.Wifi.value) {
                    var arrCameraId = angular.copy(self.searchParams.ArObjectID);
                    arrCameraId = _.concat(data, arrCameraId);
                    arrCameraId = _.uniq(arrCameraId);
                    self.searchParams.ArObjectID = arrCameraId;
                }
            });
            self.$scope.$on(self.selectDeviceCb, function (event, wifiIds, status) {
                if (status) {
                    if (Array.isArray(wifiIds)) {
                        self.$timeout(function () {
                            self.searchParams.ArObjectID = wifiIds;
                        });
                    }
                }
                self.layer.close(self.currentLayerIndex);
            });
            self.$scope.$on("advancedSearch-change", function (event, data) {
                if ((data === "wifi") || (data === "all")) {
                    self.initParams();
                }
            });
        }
        WifiSearchPageController.prototype.initParams = function () {
            var self = this;
            self.crossTrainTimeList = adVanceSearchEnum_1.CrossTrainTimeList();
            self.selectTimeAcitve = 3;
            self.wifiResult.pageParams.pageSize = 24;
            self.searchParams = {
                keyWord: "",
                currentPage: 1,
                pageSize: 24,
                userId: self.userInfoCacheFactory.getCurrentUserId(),
                orderBy: {
                    isAsc: false
                },
                isFirstSearch: true,
                ArObjectID: []
            };
            self.queryStatus = 1;
            var time = self.attributeFactory.getCrossTrainTime(self.selectTimeAcitve);
            self.searchParams.startTime = time.startTime;
            self.searchParams.endTime = time.endTime;
            self.$scope.$on('$destroy', function () {
                self.layer.close();
            });
            self.wifiListInfo = self.deviceCacheServer.getAllWifiList();
        };
        WifiSearchPageController.prototype.searchAdvancedSubmit = function () {
            var self = this;
            if (self.searchParams.keyWord === "") {
                return self.layerDec.warnInfo('请输入关键词');
            }
            self.searchParams.currentPage = 1;
            self.searchParams.pageSize = self.wifiResult.pageParams.pageSize;
            self.searchParams.taskId = "";
            self.wifiResult.pageParams.currentPage = 1;
            self.searchParams.isFirstSearch = true;
            self.queryStatus = 2;
            var searchParams = {};
            searchParams = angular.copy(self.searchParams);
            if (self.searchParams.ArObjectID.length === 0) {
                var systemPointList = self.$scope.$parent.$parent.$parent.$parent.$parent.systemPoint;
                var deviceIds_1 = [];
                _(systemPointList).forEach(function (value) {
                    if (ObjectType_1.ObjectType.Wifi.value === value.ObjectType) {
                        deviceIds_1.push(value.ObjectID);
                    }
                });
                searchParams.ArObjectID = deviceIds_1;
            }
            self.getServerMessage(searchParams);
        };
        WifiSearchPageController.prototype.changePage = function (num) {
            var self = this;
            self.searchParams.currentPage = num;
            self.searchParams.taskId = self.wifiResult.taskId;
            self.searchParams.isFirstSearch = false;
            self.wifiResult.pageParams.currentPage = num;
            self.queryStatus = 2;
            self.getServerMessage(self.searchParams);
            return self.wifiResult.pageParams;
        };
        ;
        WifiSearchPageController.prototype.getServerMessage = function (searchParams) {
            var self = this;
            if (self.selectTimeAcitve !== 4) {
                var time = self.attributeFactory.getCrossTrainTime(self.selectTimeAcitve);
                searchParams.startTime = time.startTime;
                searchParams.endTime = time.endTime;
            }
            self.resourceRetrievalService.advancedSearchByWifi(searchParams).then(function (res) {
                if ((res.code === 200) && (typeof res.data.WiFi !== 'undefined') && (res.data.WiFi.TotalCount > 0)) {
                    self.disposeCommonData(res.data.WiFi);
                }
                else {
                    self.wifiResult.pageParams.totalCount = 0;
                    self.wifiResult.pageParams.pageCount = 0;
                    self.wifiResult.data = [];
                    self.wifiResult.taskId = null;
                }
                self.queryStatus = 3;
            });
        };
        WifiSearchPageController.prototype.disposeCommonData = function (data) {
            var self = this;
            var params = {
                deviceIds: [],
                deviceType: '',
                ids: [],
                userId: self.userInfoCacheFactory.getCurrentUserId()
            };
            params.deviceType = ObjectType_1.ObjectType.Wifi.value;
            _.forEach(data.Result, function (value) {
                params.deviceIds.push(value.wifiLog.MacDeviceId);
                params.ids.push(value.wifiLog.ID);
            });
            self.resourceRetrievalService.getDeviceInfoPromise(params).then(function (res) {
                _.forEach(data.Result, function (item, index) {
                    item.deviceInfo = res.data.deviceInfo[index];
                    item.collectStatus = res.data.collectStatus[index];
                });
                self.$timeout(function () {
                    self.wifiResult.pageParams.totalCount = data.TotalCount;
                    self.wifiResult.pageParams.pageCount = Math.ceil(data.TotalCount / self.wifiResult.pageParams.pageSize);
                    self.wifiResult.data = data.Result;
                    self.wifiResult.taskId = data.TaskId;
                });
            });
        };
        WifiSearchPageController.prototype.detailPopup = function (rank, allList) {
            var self = this;
            var scope = self.$scope.$new();
            scope.rank = rank;
            scope.allList = allList;
            scope.collectFunction = function (item) {
                self.clickCollect(item);
            };
            scope.analysisFunction = function (item) {
                self.clickAnalysis(item);
            };
            scope.surveillanceFunction = function (item) {
                self.clickSurveillance(item);
            };
            scope.closePopup = function () {
                self.layer.close(self.layerIndex);
            };
            self.layerIndex = self.layer.open({
                type: 1,
                skin: 'detail-popup-box',
                title: false,
                area: ['575px', '220px'],
                content: wifiPopupHtml,
                scope: scope,
                end: function () {
                    scope.$destroy();
                }
            });
        };
        WifiSearchPageController.prototype.selectTime = function (item) {
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
        WifiSearchPageController.prototype.clickCollect = function (item) {
            var self = this;
            if (!item.collectStatus) {
                var params = {
                    json: angular.toJson(item),
                    objectID: item.wifiLog.ID,
                    objectType: CollectDataType_1.CollectDataType.WiFi.value
                };
                self.resourceRetrievalService.collectAddInfo(params)
                    .then(function (res) {
                    if (res) {
                    }
                });
            }
            else {
                var params = {
                    ids: item.wifiLog.ID
                };
                self.resourceRetrievalService.collectDeleteInfo(params)
                    .then(function (res) {
                    if (res) {
                    }
                });
            }
            item.collectStatus = !item.collectStatus;
        };
        WifiSearchPageController.prototype.clickAnalysis = function (item) {
        };
        WifiSearchPageController.prototype.clickSurveillance = function (item) {
            item.surveillanceStatus = !item.surveillanceStatus;
        };
        WifiSearchPageController.prototype.selectWifi = function () {
            var self = this;
            var scope = self.$scope.$new();
            scope.selectWifiList = self.searchParams.ArObjectID;
            scope.selectCtrlCb = self.selectDeviceCb;
            self.currentLayerIndex = self.layer.open({
                type: 1,
                content: wifiTreePopupHtml,
                scope: scope,
                title: "Wi-Fi选择",
                area: ["710px", "620px"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        WifiSearchPageController.prototype.selectDevice = function (type) {
            this.$scope.$emit("search-device-type", type);
            this.$scope.$emit("search-pattern", "advanced");
        };
        WifiSearchPageController.$inject = ["$scope", "$timeout", "layer", "resourceRetrievalService", "deviceCacheServer", "userInfoCacheFactory", "layerDec"];
        return WifiSearchPageController;
    }());
    main_app_1.app.controller('WifiSearchPageController', WifiSearchPageController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvc2VhcmNoL2FkdmFuY2VkU2VhcmNoL2FkdmFuY2VkUGFnZS93aWZpU2VhcmNoUGFnZS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQThCQTtRQW1CSSxrQ0FBb0IsTUFBVyxFQUNYLFFBQWEsRUFDYixLQUFVLEVBQ1Ysd0JBQW1ELEVBQ25ELGlCQUF1QyxFQUN2QyxvQkFBMkMsRUFDM0MsUUFBbUI7WUFObkIsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLGFBQVEsR0FBUixRQUFRLENBQUs7WUFDYixVQUFLLEdBQUwsS0FBSyxDQUFLO1lBQ1YsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEyQjtZQUNuRCxzQkFBaUIsR0FBakIsaUJBQWlCLENBQXNCO1lBQ3ZDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBdUI7WUFDM0MsYUFBUSxHQUFSLFFBQVEsQ0FBVztZQXRCdkMsYUFBUSxHQUFXLEdBQUcsQ0FBQztZQUN2QixxQkFBZ0IsR0FBVyxDQUFDLENBQUM7WUFDN0IsYUFBUSxHQUFZLEtBQUssQ0FBQztZQUUxQixlQUFVLEdBQWEsc0NBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUd6QyxxQkFBZ0IsR0FBcUIsSUFBSSxvQ0FBZ0IsRUFBRSxDQUFDO1lBTTVELGdCQUFXLEdBQVcsQ0FBQyxDQUFDO1lBQ3hCLG1CQUFjLEdBQVcsa0JBQWtCLENBQUM7WUFTeEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUdsQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxVQUFVLEtBQVUsRUFBRSxJQUFTLEVBQUUsUUFBZ0I7Z0JBQ2pGLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyx1QkFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNyQyxJQUFJLFdBQVcsR0FBa0IsT0FBTyxD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LE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDcEQsQ0FBQztRQS9VTSxnQ0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsbUJBQW1CLEVBQUUsc0JBQXNCLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFnVjFJLCtCQUFDO0tBalZELEFBaVZDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLDBCQUEwQixFQUFFLHdCQUF3QixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL3Jlc291cmNlUmV0cmlldmFsL3NlYXJjaC9hZHZhbmNlZFNlYXJjaC9hZHZhbmNlZFBhZ2Uvd2lmaVNlYXJjaFBhZ2UuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vLi4vLi4vLi4vZGV0YWlsUG9wdXAvd2lmaVBvcHVwL3dpZmlQb3B1cC5odG1sXCIgbmFtZT1cIndpZmlQb3B1cEh0bWxcIiAvPlxyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uLy4uLy4uLy4uL3NlbGVjdFBvcHVwL3RyZWVXaUZpL1RyZWUud2lmaS5wb3B1cC5odG1sXCIgbmFtZT1cIndpZmlUcmVlUG9wdXBIdG1sXCIgLz5cclxuaW1wb3J0IHthcHB9IGZyb20gJy4uLy4uLy4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHAnO1xyXG5cclxuLy8g5by55qGGXHJcbmltcG9ydCBcIi4uLy4uLy4uLy4uL3NlbGVjdFBvcHVwL3RyZWVXaUZpL1RyZWUud2lmaS5wb3B1cFwiO1xyXG5cclxuLy8g6auY57qn5qOA57Si5Y+C5pWwXHJcbmltcG9ydCB7V2lmaVNlYXJjaFBhcmFtcywgbXVsdGlwbGVDaG9pY2UsIENyb3NzVHJhaW5UaW1lTGlzdH0gZnJvbSAnLi4vYWRWYW5jZVNlYXJjaEVudW0nO1xyXG5pbXBvcnQge3dpZmksIHdpZmlJdGVtLCBpbml0V2lmaVJlc3VsdCwgQ29sbGVjdEFkZFBhcmFtcywgQ29sbGVjdERlbGV0ZVBhcmFtc30gZnJvbSAnLi4vLi4vLi4vcmVzb3VyY2VSZXRyaWV2YWxFbnVtJztcclxuXHJcbi8vIOacjeWKoVxyXG5pbXBvcnQgJy4uLy4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9yZXNvdXJjZVJldHJpZXZhbC5zZXJ2aWNlJztcclxuaW1wb3J0IHtJUmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi8uLi9jb21tb24vc2VydmljZXMvcmVzb3VyY2VSZXRyaWV2YWwuc2VydmljZSc7XHJcbmltcG9ydCBcIi4uLy4uLy4uLy4uL2NvbW1vbi9mYWN0b3J5L2RldmljZUNhY2hlLmZhY3RvcnlcIjtcclxuaW1wb3J0IHtJZGV2aWNlQ2FhY2hlU2VydmljZX0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbW1vbi9mYWN0b3J5L2RldmljZUNhY2hlLmZhY3RvcnlcIjtcclxuaW1wb3J0IFwiLi4vLi4vLi4vLi4vY29tbW9uL2ZhY3RvcnkvdXNlcmluZm8uY2FjaGUuZmFjdG9yeVwiO1xyXG5pbXBvcnQge0lVc2VySW5mb0NhY2hlRmFjdG9yeX0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbW1vbi9mYWN0b3J5L3VzZXJpbmZvLmNhY2hlLmZhY3RvcnlcIjtcclxuaW1wb3J0IHsgSUxheWVyRGVjIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbW1vbi9mYWN0b3J5L2xheWVyTXNnLmZhY3RvcnlcIjtcclxuaW1wb3J0IFwiLi4vLi4vLi4vLi4vY29tbW9uL2ZhY3RvcnkvbGF5ZXJNc2cuZmFjdG9yeVwiO1xyXG5cclxuLy8g5YWs55So5pa55rOVXHJcbmltcG9ydCB7QXR0cmlidXRlRmFjdG9yeX0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbW1vbi9mYWN0b3J5L2F0dHJpYnV0ZS5mYWN0b3J5XCI7XHJcbmltcG9ydCB7T2JqZWN0VHlwZX0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vY29yZS9lbnVtL09iamVjdFR5cGUnO1xyXG5pbXBvcnQge1N5c3RlbVBvaW50fSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vY29yZS9lbnRpdHkvU3lzdGVtUG9pbnRcIjtcclxuaW1wb3J0IHtDb2xsZWN0RGF0YVR5cGV9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL0NvbGxlY3REYXRhVHlwZVwiO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcclxuXHJcbmRlY2xhcmUgbGV0IHdpZmlQb3B1cEh0bWw6IGFueSwgYW5ndWxhcjogYW55LCB3aWZpVHJlZVBvcHVwSHRtbDogYW55O1xyXG5cclxuY2xhc3MgV2lmaVNlYXJjaFBhZ2VDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gW1wiJHNjb3BlXCIsIFwiJHRpbWVvdXRcIiwgXCJsYXllclwiLCBcInJlc291cmNlUmV0cmlldmFsU2VydmljZVwiLCBcImRldmljZUNhY2hlU2VydmVyXCIsIFwidXNlckluZm9DYWNoZUZhY3RvcnlcIiwgXCJsYXllckRlY1wiXTtcclxuXHJcbiAgICBtYXhTYWNsZTogbnVtYmVyID0gMTAwOyAvLyAg55u45Ly85bqm5pyA5aSn5YC8XHJcbiAgICBzZWxlY3RUaW1lQWNpdHZlOiBudW1iZXIgPSAzOy8v5pe26Ze05q615Y+C5pWwXHJcbiAgICBzaG93TW9yZTogYm9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm5pi+56S65pu05aSaXHJcbiAgICBzZWFyY2hQYXJhbXM6IFdpZmlTZWFyY2hQYXJhbXM7Ly8g5p+l6K+i5Y+C5pWwXHJcbiAgICB3aWZpUmVzdWx0OiB3aWZpSXRlbSA9IGluaXRXaWZpUmVzdWx0KDApOyAvLyDmn6Xor6Lnu5PmnpxcclxuICAgIGNyb3NzVHJhaW5UaW1lTGlzdDogQXJyYXk8bXVsdGlwbGVDaG9pY2U+Oy8vICDml7bpl7TmrrVcclxuICAgIC8vIOWFrOeUqOaWueazlVxyXG4gICAgYXR0cmlidXRlRmFjdG9yeTogQXR0cmlidXRlRmFjdG9yeSA9IG5ldyBBdHRyaWJ1dGVGYWN0b3J5KCk7XHJcbiAgICAvLyDorr7lpIfpgInmi6nlvLnmoYZcclxuICAgIGN1cnJlbnRMYXllckluZGV4OiBudW1iZXI7XHJcbiAgICAvLyDorr7lpIfkv6Hmga9cclxuICAgIHdpZmlMaXN0SW5mbzogYW55O1xyXG4gICAgbGF5ZXJJbmRleDphbnk7XHJcbiAgICBxdWVyeVN0YXR1czogbnVtYmVyID0gMTsgLy8g5p+l6K+i54q25oCBICAxOiDliJ3lp4vnirbmgIEgMu+8muafpeivouS4rSAgM++8muafpeivoue7k+adn1xyXG4gICAgc2VsZWN0RGV2aWNlQ2I6IHN0cmluZyA9IFwiY2xvc2Uud2lmaS5wb3B1cFwiO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGxheWVyOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJlc291cmNlUmV0cmlldmFsU2VydmljZTogSVJlc291cmNlUmV0cmlldmFsU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgZGV2aWNlQ2FjaGVTZXJ2ZXI6IElkZXZpY2VDYWFjaGVTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB1c2VySW5mb0NhY2hlRmFjdG9yeTogSVVzZXJJbmZvQ2FjaGVGYWN0b3J5LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBsYXllckRlYzogSUxheWVyRGVjKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYuaW5pdFBhcmFtcygpO1xyXG5cclxuICAgICAgICAvLyDnm5HlkKzlub/mkq3kuovku7YtLeiuvuWkh2lkXHJcbiAgICAgICAgc2VsZi4kc2NvcGUuJG9uKFwic2VhcmNoLWRldmljZS1pZFwiLCBmdW5jdGlvbiAoZXZlbnQ6IGFueSwgZGF0YTogYW55LCBkYXRhVHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhVHlwZSA9PT0gT2JqZWN0VHlwZS5XaWZpLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXJyQ2FtZXJhSWQ6IEFycmF5PHN0cmluZz4gPSBhbmd1bGFyLmNvcHkoc2VsZi5zZWFyY2hQYXJhbXMuQXJPYmplY3RJRCk7XHJcbiAgICAgICAgICAgICAgICBhcnJDYW1lcmFJZCA9ICBfLmNvbmNhdChkYXRhLCBhcnJDYW1lcmFJZCk7XHJcbiAgICAgICAgICAgICAgICBhcnJDYW1lcmFJZCA9IF8udW5pcShhcnJDYW1lcmFJZCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy5Bck9iamVjdElEID0gYXJyQ2FtZXJhSWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyDnm5HlkKzorr7lpIfpgInmi6nmoJFcclxuICAgICAgICBzZWxmLiRzY29wZS4kb24oc2VsZi5zZWxlY3REZXZpY2VDYiwgKGV2ZW50OiBhbnksIHdpZmlJZHM6IEFycmF5PHN0cmluZz4sIHN0YXR1czpib29sZWFuKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHdpZmlJZHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLkFyT2JqZWN0SUQgPSB3aWZpSWRzO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGYubGF5ZXIuY2xvc2Uoc2VsZi5jdXJyZW50TGF5ZXJJbmRleCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIOebkeWQrOW5v+aSreS6i+S7ti0t5a+86Iiq5YiH5o2iLS3ph43nva7mlbDmja5cclxuICAgICAgICBzZWxmLiRzY29wZS4kb24oXCJhZHZhbmNlZFNlYXJjaC1jaGFuZ2VcIiwgZnVuY3Rpb24gKGV2ZW50OiBhbnksIGRhdGE6IGFueSkge1xyXG4gICAgICAgICAgICBpZiAoKGRhdGEgPT09IFwid2lmaVwiKXx8KGRhdGEgPT09IFwiYWxsXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmluaXRQYXJhbXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOWIneWni+WMluWPguaVsFxyXG4gICAgcHVibGljIGluaXRQYXJhbXMoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIC8vIOiuvue9ruetm+mAieaVsOaNrlxyXG4gICAgICAgIHNlbGYuY3Jvc3NUcmFpblRpbWVMaXN0ID0gQ3Jvc3NUcmFpblRpbWVMaXN0KCk7Ly8gIOaXtumXtOautVxyXG4gICAgICAgIHNlbGYuc2VsZWN0VGltZUFjaXR2ZSA9IDM7XHJcbiAgICAgICAgLy8g6K6+572u5p+l6K+i5Y+C5pWwXHJcbiAgICAgICAgc2VsZi53aWZpUmVzdWx0LnBhZ2VQYXJhbXMucGFnZVNpemUgPSAyNDtcclxuICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcyA9IHtcclxuICAgICAgICAgICAga2V5V29yZDogXCJcIixcclxuICAgICAgICAgICAgY3VycmVudFBhZ2U6IDEsXHJcbiAgICAgICAgICAgIHBhZ2VTaXplOiAyNCxcclxuICAgICAgICAgICAgdXNlcklkOiBzZWxmLnVzZXJJbmZvQ2FjaGVGYWN0b3J5LmdldEN1cnJlbnRVc2VySWQoKSxcclxuICAgICAgICAgICAgb3JkZXJCeToge1xyXG4gICAgICAgICAgICAgICAgaXNBc2M6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGlzRmlyc3RTZWFyY2g6IHRydWUsXHJcbiAgICAgICAgICAgIEFyT2JqZWN0SUQ6IFtdXHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZWxmLnF1ZXJ5U3RhdHVzID0gMTtcclxuXHJcbiAgICAgICAgLy8g6K6+572u6buY6K6k5p+l6K+i5pe25q61XHJcbiAgICAgICAgbGV0IHRpbWUgPSBzZWxmLmF0dHJpYnV0ZUZhY3RvcnkuZ2V0Q3Jvc3NUcmFpblRpbWUoc2VsZi5zZWxlY3RUaW1lQWNpdHZlKTtcclxuICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy5zdGFydFRpbWUgPSB0aW1lLnN0YXJ0VGltZTtcclxuICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy5lbmRUaW1lID0gdGltZS5lbmRUaW1lO1xyXG5cclxuICAgICAgICAvLyDplIDmr4HmuIXpmaTlvLnmoYZcclxuICAgICAgICBzZWxmLiRzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLmxheWVyLmNsb3NlKClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyDliJ3lp4vljJbojrflj5borr7lpIfkv6Hmga9cclxuICAgICAgICBzZWxmLndpZmlMaXN0SW5mbyA9IHNlbGYuZGV2aWNlQ2FjaGVTZXJ2ZXIuZ2V0QWxsV2lmaUxpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmn6Xor6LmlbDmja5cclxuICAgIHB1YmxpYyBzZWFyY2hBZHZhbmNlZFN1Ym1pdCgpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgaWYgKHNlbGYuc2VhcmNoUGFyYW1zLmtleVdvcmQgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGYubGF5ZXJEZWMud2FybkluZm8oJ+ivt+i+k+WFpeWFs+mUruivjScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgc2VsZi5zZWFyY2hQYXJhbXMucGFnZVNpemUgPSBzZWxmLndpZmlSZXN1bHQucGFnZVBhcmFtcy5wYWdlU2l6ZTtcclxuICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy50YXNrSWQgPSBcIlwiO1xyXG4gICAgICAgIHNlbGYud2lmaVJlc3VsdC5wYWdlUGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy5pc0ZpcnN0U2VhcmNoID0gdHJ1ZTtcclxuICAgICAgICBzZWxmLnF1ZXJ5U3RhdHVzID0gMjtcclxuXHJcbiAgICAgICAgbGV0IHNlYXJjaFBhcmFtczogV2lmaVNlYXJjaFBhcmFtcyA9IHt9IGFzIFdpZmlTZWFyY2hQYXJhbXM7XHJcbiAgICAgICAgc2VhcmNoUGFyYW1zID0gYW5ndWxhci5jb3B5KHNlbGYuc2VhcmNoUGFyYW1zKTtcclxuICAgICAgICAvLyDorr7nva7mn6Xor6Lorr7lpIdpZFxyXG4gICAgICAgIGlmKHNlbGYuc2VhcmNoUGFyYW1zLkFyT2JqZWN0SUQubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBzeXN0ZW1Qb2ludExpc3Q6IEFycmF5PFN5c3RlbVBvaW50PiA9IHNlbGYuJHNjb3BlLiRwYXJlbnQuJHBhcmVudC4kcGFyZW50LiRwYXJlbnQuJHBhcmVudC5zeXN0ZW1Qb2ludDtcclxuICAgICAgICAgICAgbGV0IGRldmljZUlkczpBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICAgICAgICAgIF8oc3lzdGVtUG9pbnRMaXN0KS5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0VHlwZS5XaWZpLnZhbHVlID09PSB2YWx1ZS5PYmplY3RUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGV2aWNlSWRzLnB1c2godmFsdWUuT2JqZWN0SUQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2VhcmNoUGFyYW1zLkFyT2JqZWN0SUQgPSBkZXZpY2VJZHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYuZ2V0U2VydmVyTWVzc2FnZShzZWFyY2hQYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBkZXNjcmlwdGlvbiDliIfmjaLpobXmlbBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1cclxuICAgICAqIEByZXR1cm5zIHtQYWdlUGFyYW1zfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2hhbmdlUGFnZShudW06IG51bWJlcikge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy5jdXJyZW50UGFnZSA9IG51bTtcclxuICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy50YXNrSWQgPSBzZWxmLndpZmlSZXN1bHQudGFza0lkO1xyXG4gICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLmlzRmlyc3RTZWFyY2ggPSBmYWxzZTtcclxuICAgICAgICBzZWxmLndpZmlSZXN1bHQucGFnZVBhcmFtcy5jdXJyZW50UGFnZSA9IG51bTtcclxuICAgICAgICBzZWxmLnF1ZXJ5U3RhdHVzID0gMjtcclxuICAgICAgICBzZWxmLmdldFNlcnZlck1lc3NhZ2Uoc2VsZi5zZWFyY2hQYXJhbXMpO1xyXG5cclxuICAgICAgICByZXR1cm4gc2VsZi53aWZpUmVzdWx0LnBhZ2VQYXJhbXM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9u6I635Y+W5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0ge1dpZmlTZWFyY2hQYXJhbXN9IHNlYXJjaFBhcmFtc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFNlcnZlck1lc3NhZ2Uoc2VhcmNoUGFyYW1zOiBXaWZpU2VhcmNoUGFyYW1zKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyDorr7nva7mnIDmlrDml7bpl7RcclxuICAgICAgICBpZiAoc2VsZi5zZWxlY3RUaW1lQWNpdHZlICE9PSA0KSB7XHJcbiAgICAgICAgICAgIGxldCB0aW1lID0gc2VsZi5hdHRyaWJ1dGVGYWN0b3J5LmdldENyb3NzVHJhaW5UaW1lKHNlbGYuc2VsZWN0VGltZUFjaXR2ZSk7XHJcbiAgICAgICAgICAgIHNlYXJjaFBhcmFtcy5zdGFydFRpbWUgPSB0aW1lLnN0YXJ0VGltZTtcclxuICAgICAgICAgICAgc2VhcmNoUGFyYW1zLmVuZFRpbWUgPSB0aW1lLmVuZFRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYucmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLmFkdmFuY2VkU2VhcmNoQnlXaWZpKHNlYXJjaFBhcmFtcykudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKChyZXMuY29kZSA9PT0gMjAwKSYmKHR5cGVvZiByZXMuZGF0YS5XaUZpICE9PSAndW5kZWZpbmVkJykgJiYgKHJlcy5kYXRhLldpRmkuVG90YWxDb3VudCA+IDApKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRpc3Bvc2VDb21tb25EYXRhKHJlcy5kYXRhLldpRmkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VsZi53aWZpUmVzdWx0LnBhZ2VQYXJhbXMudG90YWxDb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICBzZWxmLndpZmlSZXN1bHQucGFnZVBhcmFtcy5wYWdlQ291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgc2VsZi53aWZpUmVzdWx0LmRhdGEgPSBbXTtcclxuICAgICAgICAgICAgICAgIHNlbGYud2lmaVJlc3VsdC50YXNrSWQgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOmrmOe6p+ajgOe0ouafpeivoue7k+adn+WQkeeItumhtemdouW5v+aSree7k+adn+afpeivolxyXG4gICAgICAgICAgICBzZWxmLnF1ZXJ5U3RhdHVzID0gMztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbuWkhOeQhuafpeivouaVsOaNrlxyXG4gICAgICogQHBhcmFtIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkaXNwb3NlQ29tbW9uRGF0YShkYXRhOiBhbnkpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHBhcmFtczphbnkgPSB7XHJcbiAgICAgICAgICAgIGRldmljZUlkczogW10sXHJcbiAgICAgICAgICAgIGRldmljZVR5cGU6ICcnLFxyXG4gICAgICAgICAgICBpZHM6IFtdLFxyXG4gICAgICAgICAgICB1c2VySWQ6IHNlbGYudXNlckluZm9DYWNoZUZhY3RvcnkuZ2V0Q3VycmVudFVzZXJJZCgpXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwYXJhbXMuZGV2aWNlVHlwZSA9IE9iamVjdFR5cGUuV2lmaS52YWx1ZTtcclxuICAgICAgICBfLmZvckVhY2goZGF0YS5SZXN1bHQsZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHBhcmFtcy5kZXZpY2VJZHMucHVzaCh2YWx1ZS53aWZpTG9nLk1hY0RldmljZUlkKTtcclxuICAgICAgICAgICAgcGFyYW1zLmlkcy5wdXNoKHZhbHVlLndpZmlMb2cuSUQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNlbGYucmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLmdldERldmljZUluZm9Qcm9taXNlKHBhcmFtcykudGhlbigocmVzOmFueSk9PntcclxuICAgICAgICAgICAgXy5mb3JFYWNoKGRhdGEuUmVzdWx0LGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5kZXZpY2VJbmZvID0gcmVzLmRhdGEuZGV2aWNlSW5mb1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNvbGxlY3RTdGF0dXMgPSByZXMuZGF0YS5jb2xsZWN0U3RhdHVzW2luZGV4XTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNlbGYuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2VsZi53aWZpUmVzdWx0LnBhZ2VQYXJhbXMudG90YWxDb3VudCA9IGRhdGEuVG90YWxDb3VudDtcclxuICAgICAgICAgICAgICAgIHNlbGYud2lmaVJlc3VsdC5wYWdlUGFyYW1zLnBhZ2VDb3VudCA9IE1hdGguY2VpbChkYXRhLlRvdGFsQ291bnQgLyBzZWxmLndpZmlSZXN1bHQucGFnZVBhcmFtcy5wYWdlU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLndpZmlSZXN1bHQuZGF0YSA9IGRhdGEuUmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgc2VsZi53aWZpUmVzdWx0LnRhc2tJZCA9IGRhdGEuVGFza0lkO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuuivpuaDheW8ueahhlxyXG4gICAgICogQHBhcmFtIHt3aWZpfSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZXRhaWxQb3B1cChyYW5rOiBudW1iZXIsIGFsbExpc3Q6IEFycmF5PHdpZmk+KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBzY29wZTogeyAkZGVzdHJveTogRnVuY3Rpb24sIHJhbms6IG51bWJlciwgYWxsTGlzdDogQXJyYXk8d2lmaT4sIGNvbGxlY3RGdW5jdGlvbjogRnVuY3Rpb24sIGFuYWx5c2lzRnVuY3Rpb246IEZ1bmN0aW9uLCBzdXJ2ZWlsbGFuY2VGdW5jdGlvbjogRnVuY3Rpb24sIGNsb3NlUG9wdXA6IEZ1bmN0aW9uIH0gPSBzZWxmLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUucmFuayA9IHJhbms7XHJcbiAgICAgICAgc2NvcGUuYWxsTGlzdCA9IGFsbExpc3Q7XHJcbiAgICAgICAgc2NvcGUuY29sbGVjdEZ1bmN0aW9uID0gKGl0ZW06IHdpZmkpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5jbGlja0NvbGxlY3QoaXRlbSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzY29wZS5hbmFseXNpc0Z1bmN0aW9uID0gKGl0ZW06IHdpZmkpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5jbGlja0FuYWx5c2lzKGl0ZW0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2NvcGUuc3VydmVpbGxhbmNlRnVuY3Rpb24gPSAoaXRlbTogd2lmaSkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLmNsaWNrU3VydmVpbGxhbmNlKGl0ZW0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2NvcGUuY2xvc2VQb3B1cCA9ICgpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5sYXllci5jbG9zZShzZWxmLmxheWVySW5kZXgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2VsZi5sYXllckluZGV4ID0gc2VsZi5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgc2tpbjogJ2RldGFpbC1wb3B1cC1ib3gnLFxyXG4gICAgICAgICAgICB0aXRsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFyZWE6IFsnNTc1cHgnLCAnMjIwcHgnXSxcclxuICAgICAgICAgICAgY29udGVudDogd2lmaVBvcHVwSHRtbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g6YCJ5oup5pe26Ze05q61XHJcbiAgICAgKiBAcGFyYW0ge211bHRpcGxlQ2hvaWNlfSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZWxlY3RUaW1lKGl0ZW06IG11bHRpcGxlQ2hvaWNlKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCB0aW1lOiBhbnk7XHJcblxyXG4gICAgICAgIC8vIOaXtuautVxyXG4gICAgICAgIGlmIChpdGVtLnZhbCA9PT0gMSkge1xyXG4gICAgICAgICAgICB0aW1lID0gc2VsZi5hdHRyaWJ1dGVGYWN0b3J5LmdldENyb3NzVHJhaW5UaW1lKDEpO1xyXG4gICAgICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy5zdGFydFRpbWUgPSB0aW1lLnN0YXJ0VGltZTtcclxuICAgICAgICAgICAgc2VsZi5zZWFyY2hQYXJhbXMuZW5kVGltZSA9IHRpbWUuZW5kVGltZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udmFsID09PSAyKSB7XHJcbiAgICAgICAgICAgIHRpbWUgPSBzZWxmLmF0dHJpYnV0ZUZhY3RvcnkuZ2V0Q3Jvc3NUcmFpblRpbWUoMik7XHJcbiAgICAgICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLnN0YXJ0VGltZSA9IHRpbWUuc3RhcnRUaW1lO1xyXG4gICAgICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy5lbmRUaW1lID0gdGltZS5lbmRUaW1lO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKGl0ZW0udmFsID09PSAzKSB8fCAoaXRlbS52YWwgPT09IFwiYWxsXCIpKSB7XHJcbiAgICAgICAgICAgIHRpbWUgPSBzZWxmLmF0dHJpYnV0ZUZhY3RvcnkuZ2V0Q3Jvc3NUcmFpblRpbWUoMyk7XHJcbiAgICAgICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLnN0YXJ0VGltZSA9IHRpbWUuc3RhcnRUaW1lO1xyXG4gICAgICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy5lbmRUaW1lID0gdGltZS5lbmRUaW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZi5zZWxlY3RUaW1lQWNpdHZlID0gaXRlbS52YWw7XHJcbiAgICAgICAgc2VsZi5jcm9zc1RyYWluVGltZUxpc3QuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGluZGV4LCBhcnJheSkge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUudmFsID09PSBpdGVtLnZhbCkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUuc3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlLnN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBkZXNjcmlwdGlvbiDmlLbol4/kuI7lj5bmtojmlLbol49cclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGlja0NvbGxlY3QoaXRlbTogd2lmaSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAoIWl0ZW0uY29sbGVjdFN0YXR1cykge1xyXG4gICAgICAgICAgICBsZXQgcGFyYW1zOiBDb2xsZWN0QWRkUGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAganNvbjogYW5ndWxhci50b0pzb24oaXRlbSksXHJcbiAgICAgICAgICAgICAgICBvYmplY3RJRDogaXRlbS53aWZpTG9nLklELFxyXG4gICAgICAgICAgICAgICAgb2JqZWN0VHlwZTogQ29sbGVjdERhdGFUeXBlLldpRmkudmFsdWVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2VsZi5yZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UuY29sbGVjdEFkZEluZm8ocGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBwYXJhbXM6IENvbGxlY3REZWxldGVQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgICAgICBpZHM6IGl0ZW0ud2lmaUxvZy5JRFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzZWxmLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5jb2xsZWN0RGVsZXRlSW5mbyhwYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGl0ZW0uY29sbGVjdFN0YXR1cyA9ICFpdGVtLmNvbGxlY3RTdGF0dXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOWIhuaekFxyXG4gICAgICogQHBhcmFtIGl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsaWNrQW5hbHlzaXMoaXRlbTogd2lmaSkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBkZXNjcmlwdGlvbiDluIPmjqfkuI7lj5bmtojluIPmjqdcclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGlja1N1cnZlaWxsYW5jZShpdGVtOiB3aWZpKSB7XHJcbiAgICAgICAgaXRlbS5zdXJ2ZWlsbGFuY2VTdGF0dXMgPSAhaXRlbS5zdXJ2ZWlsbGFuY2VTdGF0dXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbGVjdFdpZmkoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBzY29wZTogeyBzZWxlY3RXaWZpTGlzdDogQXJyYXk8c3RyaW5nPiwgJGRlc3Ryb3k6IEZ1bmN0aW9uLCBzZWxlY3RDdHJsQ2I6IHN0cmluZyB9ID0gc2VsZi4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLnNlbGVjdFdpZmlMaXN0ID0gc2VsZi5zZWFyY2hQYXJhbXMuQXJPYmplY3RJRDtcclxuICAgICAgICBzY29wZS5zZWxlY3RDdHJsQ2IgPSBzZWxmLnNlbGVjdERldmljZUNiO1xyXG4gICAgICAgIHNlbGYuY3VycmVudExheWVySW5kZXggPSBzZWxmLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBjb250ZW50OiB3aWZpVHJlZVBvcHVwSHRtbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICB0aXRsZTogXCJXaS1GaemAieaLqVwiLFxyXG4gICAgICAgICAgICBhcmVhOiBbXCI3MTBweFwiLCBcIjYyMHB4XCJdLFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VsZWN0RGV2aWNlKHR5cGU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRlbWl0KFwic2VhcmNoLWRldmljZS10eXBlXCIsIHR5cGUpO1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRlbWl0KFwic2VhcmNoLXBhdHRlcm5cIiwgXCJhZHZhbmNlZFwiKTtcclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ1dpZmlTZWFyY2hQYWdlQ29udHJvbGxlcicsIFdpZmlTZWFyY2hQYWdlQ29udHJvbGxlcik7Il19
