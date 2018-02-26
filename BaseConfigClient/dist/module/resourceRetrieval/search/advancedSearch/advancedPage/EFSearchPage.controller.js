define(["require", "exports", "text!../../../../detailPopup/efPopup/efPopup.html", "text!../../../../selectPopup/treeEfence/Tree.efence.popup.html", "../../../../common/app/main.app", "../adVanceSearchEnum", "../../../resourceRetrievalEnum", "../../../../common/factory/attribute.factory", "../../../../../core/enum/ObjectType", "../../../../../core/server/enum/CollectDataType", "lodash", "../../../../selectPopup/treeEfence/Tree.efence.popup", "../../../../common/services/resourceRetrieval.service", "../../../../common/factory/deviceCache.factory", "../../../../common/factory/userinfo.cache.factory", "../../../../common/factory/layerMsg.factory"], function (require, exports, efPopupHtml, efenceTreePopupHtml, main_app_1, adVanceSearchEnum_1, resourceRetrievalEnum_1, attribute_factory_1, ObjectType_1, CollectDataType_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EFSearchPageController = (function () {
        function EFSearchPageController($scope, $timeout, layer, resourceRetrievalService, deviceCacheServer, userInfoCacheFactory, layerDec) {
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
            this.electronicResult = resourceRetrievalEnum_1.initElectronicResult();
            this.attributeFactory = new attribute_factory_1.AttributeFactory();
            this.queryStatus = 1;
            this.selectDeviceCb = "close.efence.popup";
            var self = this;
            self.initParams();
            self.$scope.$on("search-device-id", function (event, data, dataType) {
                if (dataType === ObjectType_1.ObjectType.ElectronicFence.value) {
                    var arrCameraId = angular.copy(self.searchParams.ArObjectID);
                    arrCameraId = _.concat(data, arrCameraId);
                    arrCameraId = _.uniq(arrCameraId);
                    self.searchParams.ArObjectID = arrCameraId;
                }
            });
            self.$scope.$on(self.selectDeviceCb, function (event, electronicFenceIds, status) {
                if (status) {
                    if (Array.isArray(electronicFenceIds)) {
                        self.$timeout(function () {
                            self.searchParams.ArObjectID = electronicFenceIds;
                        });
                    }
                }
                self.layer.close(self.currentLayerIndex);
            });
            self.$scope.$on("advancedSearch-change", function (event, data) {
                if ((data === "electronicfence") || (data === "all")) {
                    self.initParams();
                }
            });
        }
        EFSearchPageController.prototype.initParams = function () {
            var _this = this;
            var self = this;
            self.crossTrainTimeList = adVanceSearchEnum_1.CrossTrainTimeList();
            self.selectTimeAcitve = 3;
            self.electronicResult.pageParams.pageSize = 24;
            self.searchParams = {
                currentPage: 1,
                pageSize: 24,
                keyWord: "",
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
                _this.layer.close();
            });
            self.eleListInfo = self.deviceCacheServer.getAllEleList();
        };
        EFSearchPageController.prototype.searchAdvancedSubmit = function () {
            var self = this;
            if (self.searchParams.keyWord === "") {
                return self.layerDec.warnInfo('请输入关键词');
            }
            self.searchParams.currentPage = 1;
            self.searchParams.pageSize = self.electronicResult.pageParams.pageSize;
            self.searchParams.isFirstSearch = true;
            self.searchParams.taskId = "";
            self.electronicResult.pageParams.currentPage = 1;
            self.queryStatus = 2;
            var searchParams = {};
            searchParams = angular.copy(self.searchParams);
            if (self.searchParams.ArObjectID.length === 0) {
                var systemPointList = self.$scope.$parent.$parent.$parent.$parent.$parent.systemPoint;
                var deviceIds_1 = [];
                _(systemPointList).forEach(function (value) {
                    if (ObjectType_1.ObjectType.ElectronicFence.value === value.ObjectType) {
                        deviceIds_1.push(value.ObjectID);
                    }
                });
                searchParams.ArObjectID = deviceIds_1;
            }
            self.getServerMessage(searchParams);
        };
        EFSearchPageController.prototype.changePage = function (num) {
            var self = this;
            self.searchParams.currentPage = num;
            self.searchParams.taskId = self.electronicResult.taskId;
            self.searchParams.isFirstSearch = false;
            self.electronicResult.pageParams.currentPage = num;
            self.queryStatus = 3;
            self.getServerMessage(self.searchParams);
            return self.electronicResult.pageParams;
        };
        ;
        EFSearchPageController.prototype.getServerMessage = function (searchParams) {
            var self = this;
            if (self.selectTimeAcitve !== 4) {
                var time = self.attributeFactory.getCrossTrainTime(self.selectTimeAcitve);
                searchParams.startTime = time.startTime;
                searchParams.endTime = time.endTime;
            }
            self.resourceRetrievalService.advancedSearchByEFence(searchParams)
                .then(function (res) {
                if ((res.code === 200) && (typeof res.data.EFENCE !== 'undefined') && (res.data.EFENCE.TotalCount > 0)) {
                    self.disposeCommonData(res.data.EFENCE);
                }
                else {
                    self.electronicResult.pageParams.totalCount = 0;
                    self.electronicResult.pageParams.pageCount = 0;
                    self.electronicResult.data = [];
                    self.electronicResult.taskId = '';
                }
                self.queryStatus = 3;
            });
        };
        EFSearchPageController.prototype.disposeCommonData = function (data) {
            var self = this;
            var params = {
                deviceIds: [],
                deviceType: '',
                ids: [],
                userId: self.userInfoCacheFactory.getCurrentUserId()
            };
            params.deviceType = ObjectType_1.ObjectType.ElectronicFence.value;
            _.forEach(data.Result, function (value) {
                params.deviceIds.push(value.eFenceLog.MobileDeviceId);
                params.ids.push(value.eFenceLog.ID);
            });
            self.resourceRetrievalService.getDeviceInfoPromise(params).then(function (res) {
                _.forEach(data.Result, function (item, index) {
                    item.deviceInfo = res.data.deviceInfo[index];
                    item.collectStatus = res.data.collectStatus[index];
                });
                self.$timeout(function () {
                    self.electronicResult.pageParams.totalCount = data.TotalCount;
                    self.electronicResult.pageParams.pageCount = Math.ceil(data.TotalCount / self.electronicResult.pageParams.pageSize);
                    self.electronicResult.data = data.Result;
                    self.electronicResult.taskId = data.TaskId;
                });
            });
        };
        EFSearchPageController.prototype.detailPopup = function (rank, allList) {
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
                content: efPopupHtml,
                scope: scope,
                end: function () {
                    scope.$destroy();
                }
            });
        };
        EFSearchPageController.prototype.selectTime = function (item) {
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
                    self.selectTimeAcitve = value.val;
                }
                else {
                    value.status = false;
                }
            });
        };
        ;
        EFSearchPageController.prototype.clickCollect = function (item) {
            var self = this;
            if (!item.collectStatus) {
                var params = {
                    json: angular.toJson(item),
                    objectID: item.eFenceLog.ID,
                    objectType: CollectDataType_1.CollectDataType.EFENCE.value
                };
                self.resourceRetrievalService.collectAddInfo(params)
                    .then(function (res) {
                    if (res) {
                    }
                });
            }
            else {
                var params = {
                    ids: item.eFenceLog.ID
                };
                self.resourceRetrievalService.collectDeleteInfo(params)
                    .then(function (res) {
                    if (res) {
                    }
                });
            }
            item.collectStatus = !item.collectStatus;
        };
        EFSearchPageController.prototype.clickAnalysis = function (item) {
        };
        EFSearchPageController.prototype.clickSurveillance = function (item) {
            item.surveillanceStatus = !item.surveillanceStatus;
        };
        EFSearchPageController.prototype.selectElectronicFence = function () {
            var self = this;
            var scope = self.$scope.$new();
            scope.selectElectronicFenceList = self.searchParams.ArObjectID;
            scope.selectCtrlCb = self.selectDeviceCb;
            self.currentLayerIndex = self.layer.open({
                type: 1,
                content: efenceTreePopupHtml,
                scope: scope,
                title: "电围选择",
                area: ["710px", "620px"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        EFSearchPageController.prototype.selectDevice = function (type) {
            this.$scope.$emit("search-device-type", type);
            this.$scope.$emit("search-pattern", "advanced");
        };
        EFSearchPageController.$inject = ["$scope", "$timeout", "layer", "resourceRetrievalService", "deviceCacheServer", "userInfoCacheFactory", "layerDec"];
        return EFSearchPageController;
    }());
    main_app_1.app.controller('EFSearchPageController', EFSearchPageController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvc2VhcmNoL2FkdmFuY2VkU2VhcmNoL2FkdmFuY2VkUGFnZS9FRlNlYXJjaFBhZ2UuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFvQ0E7UUFtQkksZ0NBQW9CLE1BQVcsRUFDWCxRQUFhLEVBQ2IsS0FBVSxFQUNWLHdCQUFtRCxFQUNuRCxpQkFBdUMsRUFDdkMsb0JBQTJDLEVBQzNDLFFBQW1CO1lBTm5CLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDWCxhQUFRLEdBQVIsUUFBUSxDQUFLO1lBQ2IsVUFBSyxHQUFMLEtBQUssQ0FBSztZQUNWLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMkI7WUFDbkQsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFzQjtZQUN2Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXVCO1lBQzNDLGFBQVEsR0FBUixRQUFRLENBQVc7WUF0QnZDLGFBQVEsR0FBVyxHQUFHLENBQUM7WUFDdkIscUJBQWdCLEdBQVcsQ0FBQyxDQUFDO1lBQzdCLGFBQVEsR0FBWSxLQUFLLENBQUM7WUFFMUIscUJBQWdCLEdBQW1CLDRDQUFvQixFQUFFLENBQUM7WUFHMUQscUJBQWdCLEdBQXFCLElBQUksb0NBQWdCLEVBQUUsQ0FBQztZQU01RCxnQkFBVyxHQUFXLENBQUMsQ0FBQztZQUN4QixtQkFBYyxHQUFXLG9CQUFvQixDQUFDO1lBUzFDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztZQUNoQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFHbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsVUFBVSxLQUFVLEVBQUUsSUFBUyxFQUFFLFFBQWdCO2dCQUNqRixFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssdUJBQVUsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDaEQsSUFBSSxXQUFXLEdBQW1CLE9BQU8sQ0FBQyxJQUFJ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NkNBQVksR0FBbkIsVUFBb0IsSUFBWTtZQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNwRCxDQUFDO1FBMVZNLDhCQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxtQkFBbUIsRUFBRSxzQkFBc0IsRUFBRSxVQUFVLENBQUMsQ0FBQztRQTJWMUksNkJBQUM7S0E1VkQsQUE0VkMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsd0JBQXdCLEVBQUUsc0JBQXNCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvc2VhcmNoL2FkdmFuY2VkU2VhcmNoL2FkdmFuY2VkUGFnZS9FRlNlYXJjaFBhZ2UuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vLi4vLi4vLi4vZGV0YWlsUG9wdXAvZWZQb3B1cC9lZlBvcHVwLmh0bWxcIiBuYW1lPVwiZWZQb3B1cEh0bWxcIiAvPlxyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uLy4uLy4uLy4uL3NlbGVjdFBvcHVwL3RyZWVFZmVuY2UvVHJlZS5lZmVuY2UucG9wdXAuaHRtbFwiIG5hbWU9XCJlZmVuY2VUcmVlUG9wdXBIdG1sXCIgLz5cclxuaW1wb3J0IHthcHB9IGZyb20gJy4uLy4uLy4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHAnO1xyXG5cclxuLy8g5by55qGGXHJcbmltcG9ydCBcIi4uLy4uLy4uLy4uL3NlbGVjdFBvcHVwL3RyZWVFZmVuY2UvVHJlZS5lZmVuY2UucG9wdXBcIjtcclxuXHJcbi8vIOmrmOe6p+ajgOe0ouWPguaVsFxyXG5pbXBvcnQge0VsZWN0cm9uaWNTZWFyY2hQYXJhbXMsIG11bHRpcGxlQ2hvaWNlLCBDcm9zc1RyYWluVGltZUxpc3R9IGZyb20gJy4uL2FkVmFuY2VTZWFyY2hFbnVtJztcclxuaW1wb3J0IHtcclxuICAgIGVsZWN0cm9uaWMsXHJcbiAgICBlbGVjdHJvbmljSXRlbSxcclxuICAgIGluaXRFbGVjdHJvbmljUmVzdWx0LFxyXG4gICAgQ29sbGVjdEFkZFBhcmFtcyxcclxuICAgIENvbGxlY3REZWxldGVQYXJhbXNcclxufSBmcm9tICcuLi8uLi8uLi9yZXNvdXJjZVJldHJpZXZhbEVudW0nO1xyXG5cclxuLy8g5pyN5YqhXHJcbmltcG9ydCAnLi4vLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL3Jlc291cmNlUmV0cmlldmFsLnNlcnZpY2UnO1xyXG5pbXBvcnQge0lSZXNvdXJjZVJldHJpZXZhbFNlcnZpY2V9IGZyb20gJy4uLy4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9yZXNvdXJjZVJldHJpZXZhbC5zZXJ2aWNlJztcclxuaW1wb3J0IFwiLi4vLi4vLi4vLi4vY29tbW9uL2ZhY3RvcnkvZGV2aWNlQ2FjaGUuZmFjdG9yeVwiO1xyXG5pbXBvcnQge0lkZXZpY2VDYWFjaGVTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29tbW9uL2ZhY3RvcnkvZGV2aWNlQ2FjaGUuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCIuLi8uLi8uLi8uLi9jb21tb24vZmFjdG9yeS91c2VyaW5mby5jYWNoZS5mYWN0b3J5XCI7XHJcbmltcG9ydCB7SVVzZXJJbmZvQ2FjaGVGYWN0b3J5fSBmcm9tIFwiLi4vLi4vLi4vLi4vY29tbW9uL2ZhY3RvcnkvdXNlcmluZm8uY2FjaGUuZmFjdG9yeVwiO1xyXG5pbXBvcnQge0lMYXllckRlY30gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbW1vbi9mYWN0b3J5L2xheWVyTXNnLmZhY3RvcnlcIjtcclxuaW1wb3J0IFwiLi4vLi4vLi4vLi4vY29tbW9uL2ZhY3RvcnkvbGF5ZXJNc2cuZmFjdG9yeVwiO1xyXG5cclxuLy8g5YWs55So5pa55rOVXHJcbmltcG9ydCB7QXR0cmlidXRlRmFjdG9yeX0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvbW1vbi9mYWN0b3J5L2F0dHJpYnV0ZS5mYWN0b3J5XCI7XHJcbmltcG9ydCB7T2JqZWN0VHlwZX0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vY29yZS9lbnVtL09iamVjdFR5cGUnO1xyXG5pbXBvcnQge1N5c3RlbVBvaW50fSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vY29yZS9lbnRpdHkvU3lzdGVtUG9pbnRcIjtcclxuaW1wb3J0IHtDb2xsZWN0RGF0YVR5cGV9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL0NvbGxlY3REYXRhVHlwZVwiO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcclxuXHJcbmRlY2xhcmUgbGV0IGVmUG9wdXBIdG1sOiBhbnksIGFuZ3VsYXI6IGFueSwgZWZlbmNlVHJlZVBvcHVwSHRtbDogYW55O1xyXG5cclxuY2xhc3MgRUZTZWFyY2hQYWdlQ29udHJvbGxlciB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFtcIiRzY29wZVwiLCBcIiR0aW1lb3V0XCIsIFwibGF5ZXJcIiwgXCJyZXNvdXJjZVJldHJpZXZhbFNlcnZpY2VcIiwgXCJkZXZpY2VDYWNoZVNlcnZlclwiLCBcInVzZXJJbmZvQ2FjaGVGYWN0b3J5XCIsIFwibGF5ZXJEZWNcIl07XHJcblxyXG4gICAgbWF4U2FjbGU6IG51bWJlciA9IDEwMDsgLy8gIOebuOS8vOW6puacgOWkp+WAvFxyXG4gICAgc2VsZWN0VGltZUFjaXR2ZTogbnVtYmVyID0gMzsvL+aXtumXtOauteWPguaVsFxyXG4gICAgc2hvd01vcmU6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuaYvuekuuabtOWkmlxyXG4gICAgc2VhcmNoUGFyYW1zOiBFbGVjdHJvbmljU2VhcmNoUGFyYW1zOy8vIOafpeivouWPguaVsFxyXG4gICAgZWxlY3Ryb25pY1Jlc3VsdDogZWxlY3Ryb25pY0l0ZW0gPSBpbml0RWxlY3Ryb25pY1Jlc3VsdCgpOyAvLyDmn6Xor6Lnu5PmnpxcclxuICAgIGNyb3NzVHJhaW5UaW1lTGlzdDogQXJyYXk8bXVsdGlwbGVDaG9pY2U+Oy8vICDml7bpl7TmrrVcclxuICAgIC8vIOWFrOeUqOaWueazlVxyXG4gICAgYXR0cmlidXRlRmFjdG9yeTogQXR0cmlidXRlRmFjdG9yeSA9IG5ldyBBdHRyaWJ1dGVGYWN0b3J5KCk7XHJcbiAgICAvLyDorr7lpIfpgInmi6nlvLnmoYZcclxuICAgIGN1cnJlbnRMYXllckluZGV4OiBudW1iZXI7XHJcbiAgICAvLyDorr7lpIfkv6Hmga9cclxuICAgIGVsZUxpc3RJbmZvOiBhbnk7XHJcbiAgICBsYXllckluZGV4OiBhbnk7XHJcbiAgICBxdWVyeVN0YXR1czogbnVtYmVyID0gMTsgLy8g5p+l6K+i54q25oCBICAxOiDliJ3lp4vnirbmgIEgMu+8muafpeivouS4rSAgM++8muafpeivoue7k+adn1xyXG4gICAgc2VsZWN0RGV2aWNlQ2I6IHN0cmluZyA9IFwiY2xvc2UuZWZlbmNlLnBvcHVwXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbGF5ZXI6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgcmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlOiBJUmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBkZXZpY2VDYWNoZVNlcnZlcjogSWRldmljZUNhYWNoZVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHVzZXJJbmZvQ2FjaGVGYWN0b3J5OiBJVXNlckluZm9DYWNoZUZhY3RvcnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGxheWVyRGVjOiBJTGF5ZXJEZWMpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi5pbml0UGFyYW1zKCk7XHJcblxyXG4gICAgICAgIC8vIOebkeWQrOW5v+aSreS6i+S7ti0t6K6+5aSHaWRcclxuICAgICAgICBzZWxmLiRzY29wZS4kb24oXCJzZWFyY2gtZGV2aWNlLWlkXCIsIGZ1bmN0aW9uIChldmVudDogYW55LCBkYXRhOiBhbnksIGRhdGFUeXBlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGFUeXBlID09PSBPYmplY3RUeXBlLkVsZWN0cm9uaWNGZW5jZS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFyckNhbWVyYUlkOiBBcnJheTxzdHJpbmc+ID0gIGFuZ3VsYXIuY29weShzZWxmLnNlYXJjaFBhcmFtcy5Bck9iamVjdElEKTtcclxuICAgICAgICAgICAgICAgIGFyckNhbWVyYUlkID0gIF8uY29uY2F0KGRhdGEsIGFyckNhbWVyYUlkKTtcclxuICAgICAgICAgICAgICAgIGFyckNhbWVyYUlkID0gXy51bmlxKGFyckNhbWVyYUlkKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLkFyT2JqZWN0SUQgPSBhcnJDYW1lcmFJZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDnm5HlkKzorr7lpIfpgInmi6nmoJFcclxuICAgICAgICBzZWxmLiRzY29wZS4kb24oc2VsZi5zZWxlY3REZXZpY2VDYiwgKGV2ZW50OiBhbnksIGVsZWN0cm9uaWNGZW5jZUlkczogQXJyYXk8c3RyaW5nPiwgc3RhdHVzOmJvb2xlYW4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWxlY3Ryb25pY0ZlbmNlSWRzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy5Bck9iamVjdElEID0gZWxlY3Ryb25pY0ZlbmNlSWRzO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGYubGF5ZXIuY2xvc2Uoc2VsZi5jdXJyZW50TGF5ZXJJbmRleCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIOebkeWQrOW5v+aSreS6i+S7ti0t5a+86Iiq5YiH5o2iLS3ph43nva7mlbDmja5cclxuICAgICAgICBzZWxmLiRzY29wZS4kb24oXCJhZHZhbmNlZFNlYXJjaC1jaGFuZ2VcIiwgZnVuY3Rpb24gKGV2ZW50OiBhbnksIGRhdGE6IGFueSkge1xyXG4gICAgICAgICAgICBpZiAoKGRhdGEgPT09IFwiZWxlY3Ryb25pY2ZlbmNlXCIpIHx8IChkYXRhID09PSBcImFsbFwiKSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5pbml0UGFyYW1zKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDliJ3lp4vljJblj4LmlbBcclxuICAgIHB1YmxpYyBpbml0UGFyYW1zKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAvLyDorr7nva7nrZvpgInmlbDmja5cclxuICAgICAgICBzZWxmLmNyb3NzVHJhaW5UaW1lTGlzdCA9IENyb3NzVHJhaW5UaW1lTGlzdCgpOy8vICDml7bpl7TmrrVcclxuICAgICAgICBzZWxmLnNlbGVjdFRpbWVBY2l0dmUgPSAzO1xyXG4gICAgICAgIC8vIOiuvue9ruafpeivouWPguaVsFxyXG4gICAgICAgIHNlbGYuZWxlY3Ryb25pY1Jlc3VsdC5wYWdlUGFyYW1zLnBhZ2VTaXplID0gMjQ7XHJcbiAgICAgICAgc2VsZi5zZWFyY2hQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiAxLFxyXG4gICAgICAgICAgICBwYWdlU2l6ZTogMjQsXHJcbiAgICAgICAgICAgIGtleVdvcmQ6IFwiXCIsXHJcbiAgICAgICAgICAgIHVzZXJJZDogc2VsZi51c2VySW5mb0NhY2hlRmFjdG9yeS5nZXRDdXJyZW50VXNlcklkKCksXHJcbiAgICAgICAgICAgIG9yZGVyQnk6IHtcclxuICAgICAgICAgICAgICAgIGlzQXNjOiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpc0ZpcnN0U2VhcmNoOiB0cnVlLFxyXG4gICAgICAgICAgICBBck9iamVjdElEOiBbXVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2VsZi5xdWVyeVN0YXR1cyA9IDE7XHJcblxyXG4gICAgICAgIC8vIOiuvue9rum7mOiupOafpeivouaXtuautVxyXG4gICAgICAgIGxldCB0aW1lID0gc2VsZi5hdHRyaWJ1dGVGYWN0b3J5LmdldENyb3NzVHJhaW5UaW1lKHNlbGYuc2VsZWN0VGltZUFjaXR2ZSk7XHJcbiAgICAgICAgc2VsZi5zZWFyY2hQYXJhbXMuc3RhcnRUaW1lID0gdGltZS5zdGFydFRpbWU7XHJcbiAgICAgICAgc2VsZi5zZWFyY2hQYXJhbXMuZW5kVGltZSA9IHRpbWUuZW5kVGltZTtcclxuXHJcbiAgICAgICAgLy8gY29udHJvbGxlciDplIDmr4HmuIXpmaTlvLnmoYZcclxuICAgICAgICBzZWxmLiRzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLmNsb3NlKClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyDliJ3lp4vljJbojrflj5borr7lpIfkv6Hmga9cclxuICAgICAgICBzZWxmLmVsZUxpc3RJbmZvID0gc2VsZi5kZXZpY2VDYWNoZVNlcnZlci5nZXRBbGxFbGVMaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5p+l6K+i5pWw5o2uXHJcbiAgICBwdWJsaWMgc2VhcmNoQWR2YW5jZWRTdWJtaXQoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGlmIChzZWxmLnNlYXJjaFBhcmFtcy5rZXlXb3JkID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmxheWVyRGVjLndhcm5JbmZvKCfor7fovpPlhaXlhbPplK7or40nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5zZWFyY2hQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLnBhZ2VTaXplID0gc2VsZi5lbGVjdHJvbmljUmVzdWx0LnBhZ2VQYXJhbXMucGFnZVNpemU7XHJcbiAgICAgICAgc2VsZi5zZWFyY2hQYXJhbXMuaXNGaXJzdFNlYXJjaCA9IHRydWU7XHJcbiAgICAgICAgc2VsZi5zZWFyY2hQYXJhbXMudGFza0lkID0gXCJcIjtcclxuICAgICAgICBzZWxmLmVsZWN0cm9uaWNSZXN1bHQucGFnZVBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgc2VsZi5xdWVyeVN0YXR1cyA9IDI7XHJcblxyXG4gICAgICAgIGxldCBzZWFyY2hQYXJhbXM6IEVsZWN0cm9uaWNTZWFyY2hQYXJhbXMgPSB7fSBhcyBFbGVjdHJvbmljU2VhcmNoUGFyYW1zO1xyXG4gICAgICAgIHNlYXJjaFBhcmFtcyA9IGFuZ3VsYXIuY29weShzZWxmLnNlYXJjaFBhcmFtcyk7XHJcbiAgICAgICAgLy8g6K6+572u5p+l6K+i6K6+5aSHaWRcclxuICAgICAgICBpZihzZWxmLnNlYXJjaFBhcmFtcy5Bck9iamVjdElELmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBsZXQgc3lzdGVtUG9pbnRMaXN0OiBBcnJheTxTeXN0ZW1Qb2ludD4gPSBzZWxmLiRzY29wZS4kcGFyZW50LiRwYXJlbnQuJHBhcmVudC4kcGFyZW50LiRwYXJlbnQuc3lzdGVtUG9pbnQ7XHJcbiAgICAgICAgICAgIGxldCBkZXZpY2VJZHM6QXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgICAgICAgICBfKHN5c3RlbVBvaW50TGlzdCkuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdFR5cGUuRWxlY3Ryb25pY0ZlbmNlLnZhbHVlID09PSB2YWx1ZS5PYmplY3RUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGV2aWNlSWRzLnB1c2godmFsdWUuT2JqZWN0SUQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2VhcmNoUGFyYW1zLkFyT2JqZWN0SUQgPSBkZXZpY2VJZHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxmLmdldFNlcnZlck1lc3NhZ2Uoc2VhcmNoUGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDliIfmjaLpobXmlbBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1cclxuICAgICAqIEByZXR1cm5zIHtQYWdlUGFyYW1zfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2hhbmdlUGFnZShudW06IG51bWJlcikge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy5jdXJyZW50UGFnZSA9IG51bTtcclxuICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy50YXNrSWQgPSBzZWxmLmVsZWN0cm9uaWNSZXN1bHQudGFza0lkO1xyXG4gICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLmlzRmlyc3RTZWFyY2ggPSBmYWxzZTtcclxuICAgICAgICBzZWxmLmVsZWN0cm9uaWNSZXN1bHQucGFnZVBhcmFtcy5jdXJyZW50UGFnZSA9IG51bTtcclxuICAgICAgICBzZWxmLnF1ZXJ5U3RhdHVzID0gMztcclxuICAgICAgICBzZWxmLmdldFNlcnZlck1lc3NhZ2Uoc2VsZi5zZWFyY2hQYXJhbXMpO1xyXG5cclxuICAgICAgICByZXR1cm4gc2VsZi5lbGVjdHJvbmljUmVzdWx0LnBhZ2VQYXJhbXM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9u6I635Y+W5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0ge0VsZWN0cm9uaWNTZWFyY2hQYXJhbXN9IHNlYXJjaFBhcmFtc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFNlcnZlck1lc3NhZ2Uoc2VhcmNoUGFyYW1zOiBFbGVjdHJvbmljU2VhcmNoUGFyYW1zKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyDorr7nva7mnIDmlrDml7bpl7RcclxuICAgICAgICBpZiAoc2VsZi5zZWxlY3RUaW1lQWNpdHZlICE9PSA0KSB7XHJcbiAgICAgICAgICAgIGxldCB0aW1lID0gc2VsZi5hdHRyaWJ1dGVGYWN0b3J5LmdldENyb3NzVHJhaW5UaW1lKHNlbGYuc2VsZWN0VGltZUFjaXR2ZSk7XHJcbiAgICAgICAgICAgIHNlYXJjaFBhcmFtcy5zdGFydFRpbWUgPSB0aW1lLnN0YXJ0VGltZTtcclxuICAgICAgICAgICAgc2VhcmNoUGFyYW1zLmVuZFRpbWUgPSB0aW1lLmVuZFRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYucmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLmFkdmFuY2VkU2VhcmNoQnlFRmVuY2Uoc2VhcmNoUGFyYW1zKVxyXG4gICAgICAgICAgICAudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICgocmVzLmNvZGUgPT09IDIwMCkgJiYgKHR5cGVvZiByZXMuZGF0YS5FRkVOQ0UgIT09ICd1bmRlZmluZWQnKSAmJiAocmVzLmRhdGEuRUZFTkNFLlRvdGFsQ291bnQgPiAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGlzcG9zZUNvbW1vbkRhdGEocmVzLmRhdGEuRUZFTkNFKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lbGVjdHJvbmljUmVzdWx0LnBhZ2VQYXJhbXMudG90YWxDb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lbGVjdHJvbmljUmVzdWx0LnBhZ2VQYXJhbXMucGFnZUNvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmVsZWN0cm9uaWNSZXN1bHQuZGF0YSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZWxlY3Ryb25pY1Jlc3VsdC50YXNrSWQgPSAnJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIOmrmOe6p+ajgOe0ouafpeivoue7k+adn+WQkeeItumhtemdouW5v+aSree7k+adn+afpeivolxyXG4gICAgICAgICAgICAgICAgc2VsZi5xdWVyeVN0YXR1cyA9IDM7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb27lpITnkIbmn6Xor6LmlbDmja5cclxuICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGlzcG9zZUNvbW1vbkRhdGEoZGF0YTogYW55KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBwYXJhbXM6YW55ID0ge1xyXG4gICAgICAgICAgICBkZXZpY2VJZHM6IFtdLFxyXG4gICAgICAgICAgICBkZXZpY2VUeXBlOiAnJyxcclxuICAgICAgICAgICAgaWRzOiBbXSxcclxuICAgICAgICAgICAgdXNlcklkOiBzZWxmLnVzZXJJbmZvQ2FjaGVGYWN0b3J5LmdldEN1cnJlbnRVc2VySWQoKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcGFyYW1zLmRldmljZVR5cGUgPSBPYmplY3RUeXBlLkVsZWN0cm9uaWNGZW5jZS52YWx1ZTtcclxuICAgICAgICBfLmZvckVhY2goZGF0YS5SZXN1bHQsZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHBhcmFtcy5kZXZpY2VJZHMucHVzaCh2YWx1ZS5lRmVuY2VMb2cuTW9iaWxlRGV2aWNlSWQpO1xyXG4gICAgICAgICAgICBwYXJhbXMuaWRzLnB1c2godmFsdWUuZUZlbmNlTG9nLklEKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBzZWxmLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5nZXREZXZpY2VJbmZvUHJvbWlzZShwYXJhbXMpLnRoZW4oKHJlczphbnkpPT57XHJcbiAgICAgICAgICAgIF8uZm9yRWFjaChkYXRhLlJlc3VsdCxmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uZGV2aWNlSW5mbyA9IHJlcy5kYXRhLmRldmljZUluZm9baW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jb2xsZWN0U3RhdHVzID0gcmVzLmRhdGEuY29sbGVjdFN0YXR1c1tpbmRleF07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzZWxmLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNlbGYuZWxlY3Ryb25pY1Jlc3VsdC5wYWdlUGFyYW1zLnRvdGFsQ291bnQgPSBkYXRhLlRvdGFsQ291bnQ7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmVsZWN0cm9uaWNSZXN1bHQucGFnZVBhcmFtcy5wYWdlQ291bnQgPSBNYXRoLmNlaWwoZGF0YS5Ub3RhbENvdW50IC8gc2VsZi5lbGVjdHJvbmljUmVzdWx0LnBhZ2VQYXJhbXMucGFnZVNpemUpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5lbGVjdHJvbmljUmVzdWx0LmRhdGEgPSBkYXRhLlJlc3VsdDtcclxuICAgICAgICAgICAgICAgIHNlbGYuZWxlY3Ryb25pY1Jlc3VsdC50YXNrSWQgPSBkYXRhLlRhc2tJZDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLror6bmg4XlvLnmoYZcclxuICAgICAqIEBwYXJhbSB7d2lmaX0gaXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGV0YWlsUG9wdXAocmFuazogbnVtYmVyLCBhbGxMaXN0OiBBcnJheTxlbGVjdHJvbmljPikge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgc2NvcGU6IHsgJGRlc3Ryb3k6IEZ1bmN0aW9uLCByYW5rOiBudW1iZXIsIGFsbExpc3Q6IEFycmF5PGVsZWN0cm9uaWM+LCBjb2xsZWN0RnVuY3Rpb246IEZ1bmN0aW9uLCBhbmFseXNpc0Z1bmN0aW9uOiBGdW5jdGlvbiwgc3VydmVpbGxhbmNlRnVuY3Rpb246IEZ1bmN0aW9uLCBjbG9zZVBvcHVwOiBGdW5jdGlvbiB9ID0gc2VsZi4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLnJhbmsgPSByYW5rO1xyXG4gICAgICAgIHNjb3BlLmFsbExpc3QgPSBhbGxMaXN0O1xyXG4gICAgICAgIHNjb3BlLmNvbGxlY3RGdW5jdGlvbiA9IChpdGVtOiBlbGVjdHJvbmljKSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuY2xpY2tDb2xsZWN0KGl0ZW0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2NvcGUuYW5hbHlzaXNGdW5jdGlvbiA9IChpdGVtOiBlbGVjdHJvbmljKSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuY2xpY2tBbmFseXNpcyhpdGVtKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNjb3BlLnN1cnZlaWxsYW5jZUZ1bmN0aW9uID0gKGl0ZW06IGVsZWN0cm9uaWMpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5jbGlja1N1cnZlaWxsYW5jZShpdGVtKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNjb3BlLmNsb3NlUG9wdXAgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYubGF5ZXIuY2xvc2Uoc2VsZi5sYXllckluZGV4KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNlbGYubGF5ZXJJbmRleCA9IHNlbGYubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIHNraW46ICdkZXRhaWwtcG9wdXAtYm94JyxcclxuICAgICAgICAgICAgdGl0bGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhcmVhOiBbJzU3NXB4JywgJzIyMHB4J10sXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGVmUG9wdXBIdG1sLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOmAieaLqeaXtumXtOautVxyXG4gICAgICogQHBhcmFtIHttdWx0aXBsZUNob2ljZX0gaXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VsZWN0VGltZShpdGVtOiBtdWx0aXBsZUNob2ljZSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgdGltZTogYW55O1xyXG5cclxuICAgICAgICAvLyDml7bmrrVcclxuICAgICAgICBpZiAoaXRlbS52YWwgPT09IDEpIHtcclxuICAgICAgICAgICAgdGltZSA9IHNlbGYuYXR0cmlidXRlRmFjdG9yeS5nZXRDcm9zc1RyYWluVGltZSgxKTtcclxuICAgICAgICAgICAgc2VsZi5zZWFyY2hQYXJhbXMuc3RhcnRUaW1lID0gdGltZS5zdGFydFRpbWU7XHJcbiAgICAgICAgICAgIHNlbGYuc2VhcmNoUGFyYW1zLmVuZFRpbWUgPSB0aW1lLmVuZFRpbWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLnZhbCA9PT0gMikge1xyXG4gICAgICAgICAgICB0aW1lID0gc2VsZi5hdHRyaWJ1dGVGYWN0b3J5LmdldENyb3NzVHJhaW5UaW1lKDIpO1xyXG4gICAgICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy5zdGFydFRpbWUgPSB0aW1lLnN0YXJ0VGltZTtcclxuICAgICAgICAgICAgc2VsZi5zZWFyY2hQYXJhbXMuZW5kVGltZSA9IHRpbWUuZW5kVGltZTtcclxuICAgICAgICB9IGVsc2UgaWYgKChpdGVtLnZhbCA9PT0gMykgfHwgKGl0ZW0udmFsID09PSBcImFsbFwiKSkge1xyXG4gICAgICAgICAgICB0aW1lID0gc2VsZi5hdHRyaWJ1dGVGYWN0b3J5LmdldENyb3NzVHJhaW5UaW1lKDMpO1xyXG4gICAgICAgICAgICBzZWxmLnNlYXJjaFBhcmFtcy5zdGFydFRpbWUgPSB0aW1lLnN0YXJ0VGltZTtcclxuICAgICAgICAgICAgc2VsZi5zZWFyY2hQYXJhbXMuZW5kVGltZSA9IHRpbWUuZW5kVGltZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGYuc2VsZWN0VGltZUFjaXR2ZSA9IGl0ZW0udmFsO1xyXG4gICAgICAgIHNlbGYuY3Jvc3NUcmFpblRpbWVMaXN0LmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBpbmRleCwgYXJyYXkpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlLnZhbCA9PT0gaXRlbS52YWwpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlLnN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdFRpbWVBY2l0dmUgPSB2YWx1ZS52YWw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5zdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDmlLbol4/kuI7lj5bmtojmlLbol49cclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGlja0NvbGxlY3QoaXRlbTogZWxlY3Ryb25pYykge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAoIWl0ZW0uY29sbGVjdFN0YXR1cykge1xyXG4gICAgICAgICAgICBsZXQgcGFyYW1zOiBDb2xsZWN0QWRkUGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAganNvbjogYW5ndWxhci50b0pzb24oaXRlbSksXHJcbiAgICAgICAgICAgICAgICBvYmplY3RJRDogaXRlbS5lRmVuY2VMb2cuSUQsXHJcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBDb2xsZWN0RGF0YVR5cGUuRUZFTkNFLnZhbHVlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHNlbGYucmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLmNvbGxlY3RBZGRJbmZvKHBhcmFtcylcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcGFyYW1zOiBDb2xsZWN0RGVsZXRlUGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAgaWRzOiBpdGVtLmVGZW5jZUxvZy5JRFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzZWxmLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5jb2xsZWN0RGVsZXRlSW5mbyhwYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGl0ZW0uY29sbGVjdFN0YXR1cyA9ICFpdGVtLmNvbGxlY3RTdGF0dXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5YiG5p6QXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xpY2tBbmFseXNpcyhpdGVtOiBlbGVjdHJvbmljKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5biD5o6n5LiO5Y+W5raI5biD5o6nMTE0LjgwNjQzNTAsIDMxLjM2MDkyMjhcclxuICAgICDpq5jnuqfmo4DntKJcclxuICAgICDovabovoZcclxuICAgICDkurrlg49cclxuICAgICBXaS1GaVxyXG4gICAgIOeUteWbtFxyXG5cclxuICAgICDlhbPplK7or43vvJpcclxuICAgICDml7bmrrXvvJrlhajpg6jov5HkuIDlpKnov5HkuIDlkajov5HkuIDmnIjoh6rlrprkuYlcclxuICAgICDotYTmupDpgInmi6nvvJrpgInmi6norr7lpIcg5pCc57SiXHJcbiAgICAg5YWo6YCJ5a+85Ye6XHJcbiAgICAg6K+36L6T5YWl5qOA57Si5p2h5Lu25qOA57SiXHJcblxyXG4gICAgICogQHBhcmFtIGl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsaWNrU3VydmVpbGxhbmNlKGl0ZW06IGVsZWN0cm9uaWMpIHtcclxuICAgICAgICBpdGVtLnN1cnZlaWxsYW5jZVN0YXR1cyA9ICFpdGVtLnN1cnZlaWxsYW5jZVN0YXR1cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VsZWN0RWxlY3Ryb25pY0ZlbmNlKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgc2NvcGU6IHsgc2VsZWN0RWxlY3Ryb25pY0ZlbmNlTGlzdDogQXJyYXk8c3RyaW5nPiwgJGRlc3Ryb3k6IEZ1bmN0aW9uLCBzZWxlY3RDdHJsQ2I6IHN0cmluZyB9ID0gc2VsZi4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLnNlbGVjdEVsZWN0cm9uaWNGZW5jZUxpc3QgPSBzZWxmLnNlYXJjaFBhcmFtcy5Bck9iamVjdElEO1xyXG4gICAgICAgIHNjb3BlLnNlbGVjdEN0cmxDYiA9IHNlbGYuc2VsZWN0RGV2aWNlQ2I7XHJcbiAgICAgICAgc2VsZi5jdXJyZW50TGF5ZXJJbmRleCA9IHNlbGYubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGVmZW5jZVRyZWVQb3B1cEh0bWwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgdGl0bGU6IFwi55S15Zu06YCJ5oupXCIsXHJcbiAgICAgICAgICAgIGFyZWE6IFtcIjcxMHB4XCIsIFwiNjIwcHhcIl0sXHJcbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZWxlY3REZXZpY2UodHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoXCJzZWFyY2gtZGV2aWNlLXR5cGVcIiwgdHlwZSk7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoXCJzZWFyY2gtcGF0dGVyblwiLCBcImFkdmFuY2VkXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcignRUZTZWFyY2hQYWdlQ29udHJvbGxlcicsIEVGU2VhcmNoUGFnZUNvbnRyb2xsZXIpOyJdfQ==
