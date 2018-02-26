define(["require", "exports", "../app/main.app", "../../../core/params/result/ResponseResult", "../../../core/entity/OperFirstModule", "../../../core/entity/OperSecondModule", "../../../core/entity/OperThirdModule", "../../../core/server/enum/ResourceType", "../factory/response.notify.factory", "../factory/userinfo.cache.factory", "../factory/SystemLog.factory"], function (require, exports, main_app_1, ResponseResult_1, OperFirstModule_1, OperSecondModule_1, OperThirdModule_1, ResourceType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Promise = require('es6-promise');
    var ResourceRetrievalService = (function () {
        function ResourceRetrievalService($http, systemLogFactory, notifyFactory, userInfoCacheFactory) {
            this.$http = $http;
            this.systemLogFactory = systemLogFactory;
            this.notifyFactory = notifyFactory;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.notifyFunc = notifyFactory.msg({ onlySuccess: true });
            this.logFunc = systemLogFactory.preSaveLogEx;
        }
        ResourceRetrievalService.prototype.associateSearchByKeyWords = function (keyword) {
            return this.$http({
                method: 'get',
                dataType: 'json',
                url: '/db/resourceSearch/tips',
                params: {
                    keyWords: keyword
                }
            });
        };
        ResourceRetrievalService.prototype.quickSearchByKeyWords = function (params) {
            return this.$http({
                method: 'post',
                url: '/db/resourceSearch/quickSearchByKeyWords',
                data: params,
                timeout: 40 * 1000
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.ResourceRetrieval.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.ResourceRetrieval_FullSearch.code,
                OperThirdModule: ''
            }));
        };
        ResourceRetrievalService.prototype.advancedSearchByFace = function (params) {
            return this.$http({
                method: 'post',
                url: '/pdp/search/advance/searchaccesslog',
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.ResourceRetrieval.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.ResourceRetrieval_AdvanceSearch.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.ResourceRetrieval_AdvanceSearch_Face.code
            }));
        };
        ResourceRetrievalService.prototype.advancedSearchByCar = function (params) {
            return this.$http({
                method: 'post',
                url: '/db/resourceSearch/searchCar',
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.ResourceRetrieval.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.ResourceRetrieval_AdvanceSearch.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.ResourceRetrieval_AdvanceSearch_Vehicle.code
            }));
        };
        ResourceRetrievalService.prototype.advancedSearchByCarEx = function (params) {
            return this.$http({
                method: 'post',
                url: '/db/resourceSearch/advancedSearchCar',
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.ResourceRetrieval.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.ResourceRetrieval_AdvanceSearch.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.ResourceRetrieval_AdvanceSearch_Vehicle.code
            })).then(function (res) {
                return res;
            });
        };
        ResourceRetrievalService.prototype.advancedSearchByWifi = function (params) {
            return this.$http({
                method: 'post',
                url: '/db/resourceSearch/searchWiFiByParams',
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.ResourceRetrieval.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.ResourceRetrieval_AdvanceSearch.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.ResourceRetrieval_AdvanceSearch_WiFi.code
            }));
        };
        ResourceRetrievalService.prototype.advancedSearchByEFence = function (params) {
            return this.$http({
                method: 'post',
                url: '/db/resourceSearch/searchEFenceByParams',
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.ResourceRetrieval.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.ResourceRetrieval_AdvanceSearch.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.ResourceRetrieval_AdvanceSearch_EFence.code
            }));
        };
        ResourceRetrievalService.prototype.getCarDetailInfo = function (id) {
            return this.$http({
                method: 'get',
                dataType: 'json',
                url: '/db/resourceSearch/tips',
                params: {
                    keyWords: id
                }
            });
        };
        ResourceRetrievalService.prototype.getDeviceById = function (id, type) {
            return this.$http({
                method: "post",
                url: "/db/resource/getDeviceById",
                data: { id: id, type: type }
            });
        };
        ResourceRetrievalService.prototype.uploadImage = function (params) {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('POST', '/db/resourceSearch/checkFace', true);
                xhr.onreadystatechange = function (ev) {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText));
                    }
                };
                xhr.onerror = function (err) {
                    reject(err);
                };
                xhr.send(params);
            });
        };
        ResourceRetrievalService.prototype.uploadCarImage = function (params) {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('POST', '/db/resourceSearch/checkCar', true);
                xhr.onreadystatechange = function (ev) {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText));
                    }
                };
                xhr.onerror = function (err) {
                    reject(err);
                };
                xhr.send(params);
            });
        };
        ResourceRetrievalService.prototype.collectAddInfo = function (params) {
            var _params = angular.copy(params);
            _params.userId = this.userInfoCacheFactory.getCurrentUserId();
            return this.$http({
                method: 'post',
                url: '/db/collect/add',
                data: _params
            }).then(this.notifyFunc);
        };
        ResourceRetrievalService.prototype.collectDeleteInfo = function (params) {
            return this.$http({
                method: 'post',
                url: '/db/collect/deleteByObjectId',
                data: params
            }).then(this.notifyFunc);
        };
        ResourceRetrievalService.prototype.findSystemPointById = function (id) {
            return this.$http({
                method: "GET",
                url: "/db/lamp/findSystemPointById",
                params: { id: id }
            });
        };
        ;
        ResourceRetrievalService.prototype.getPVDType = function (searchType) {
            return this.$http({
                url: "/pdp/commonCtrl/dictList/ByTypeFromPVD",
                method: "post",
                params: { dictType: searchType }
            }).then(function (res) {
                return res;
            });
        };
        ResourceRetrievalService.prototype.getSubGrand = function (searchType) {
            return this.$http({
                url: "/pdp/vehicleCtrl/vehicle/getSubGrand",
                method: "get",
                params: { vehicleBrand: searchType }
            }).then(function (res) {
                return res;
            });
        };
        ResourceRetrievalService.prototype.findLampDeviceChildrenById = function (params) {
            return this.$http({
                method: "get",
                url: "/db/lamp/findLampDeviceChildrenById",
                params: {
                    id: params.id
                }
            });
        };
        ResourceRetrievalService.prototype.searchLogById = function (params) {
            return this.$http({
                method: 'post',
                url: '/pdp/search/log',
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.ResourceRetrieval.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.ResourceRetrieval_AdvanceSearch.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.ResourceRetrieval_AdvanceSearch_Face.code
            }));
        };
        ResourceRetrievalService.prototype.searchQuickByPromise = function (params) {
            var self = this;
            var arr = [];
            var arrQyery = [];
            if (params.objectType === "All") {
                arr = [angular.copy(params), angular.copy(params), angular.copy(params), angular.copy(params), angular.copy(params), angular.copy(params), angular.copy(params), angular.copy(params)];
                arr[0].objectType = ResourceType_1.ResourceTypeEnum[2].value;
                arr[1].objectType = ResourceType_1.ResourceTypeEnum[1].value;
                arr[2].objectType = ResourceType_1.ResourceTypeEnum[5].value;
                arr[3].objectType = ResourceType_1.ResourceTypeEnum[7].value;
                arr[4].objectType = ResourceType_1.ResourceTypeEnum[10].value;
                arrQyery = [
                    self.quickSearchByCommon(arr[0]),
                    self.quickSearchByCommon(arr[1]),
                    self.quickSearchByCommon(arr[2]),
                    self.quickSearchByCommon(arr[3]),
                    self.quickSearchByCommon(arr[4])
                ];
            }
            else {
                arr = [params];
                switch (params.objectType) {
                    case ResourceType_1.ResourceTypeEnum[2].value:
                    case ResourceType_1.ResourceTypeEnum[1].value:
                    case ResourceType_1.ResourceTypeEnum[5].value:
                    case ResourceType_1.ResourceTypeEnum[7].value:
                        arrQyery = [
                            self.quickSearchByCommon(arr[0])
                        ];
                        break;
                }
            }
            return Promise.all(arrQyery).then(function (res) {
                var resData;
                var newResult = new ResponseResult_1.ResponseResult();
                newResult.code = 200;
                if (params.objectType === "All") {
                    resData = {
                        Vehicle: res[0].Vehicle,
                        Face: res[1].Face,
                        WiFi: res[2].WiFi,
                        EFENCE: res[3].EFENCE
                    };
                    if (res[4].RmpGate) {
                        resData["DeviceRmpGate"] = {
                            Result: res[4].RmpGate,
                            TaskId: "",
                            TotalCount: res[4].RmpGate.length
                        };
                    }
                    else {
                        resData["DeviceRmpGate"] = {
                            Result: [],
                            TaskId: "",
                            TotalCount: 0
                        };
                    }
                    if (res[4].Camera) {
                        resData["DeviceCamera"] = {
                            Result: res[4].Camera,
                            TaskId: "",
                            TotalCount: res[4].Camera.length
                        };
                    }
                    else {
                        resData["DeviceCamera"] = {
                            Result: [],
                            TaskId: "",
                            TotalCount: 0
                        };
                    }
                    if (res[4].WiFi) {
                        resData["DeviceWiFi"] = {
                            Result: res[4].WiFi,
                            TaskId: "",
                            TotalCount: res[4].WiFi.length
                        };
                    }
                    else {
                        resData["DeviceWiFi"] = {
                            Result: [],
                            TaskId: "",
                            TotalCount: 0
                        };
                    }
                    if (res[4].EFENCE) {
                        resData["DeviceEFENCE"] = {
                            Result: res[4].EFENCE,
                            TaskId: "",
                            TotalCount: res[4].EFENCE.length
                        };
                    }
                    else {
                        resData["DeviceEFENCE"] = {
                            Result: [],
                            TaskId: "",
                            TotalCount: 0
                        };
                    }
                    newResult.count = resData.Vehicle.TotalCount + resData.Face.TotalCount + resData.WiFi.TotalCount + resData.EFENCE.TotalCount + resData.DeviceRmpGate.TotalCount + resData.DeviceCamera.TotalCount + resData.DeviceWiFi.TotalCount + resData.DeviceEFENCE.TotalCount;
                }
                else {
                    resData = res[0];
                    newResult.count = res[0][params.objectType].TotalCount;
                }
                newResult.data = resData;
                return newResult;
            }, function (error) {
                console.log(error);
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.ResourceRetrieval.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.ResourceRetrieval_FullSearch.code,
                OperThirdModule: ''
            })).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.ResourceRetrieval.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.ResourceRetrieval_FullSearch.code,
                OperThirdModule: 'Device'
            }));
        };
        ResourceRetrievalService.prototype.quickSearchByCommon = function (params) {
            return this.$http({
                method: 'post',
                url: '/pdp/search/quick/common',
                data: params,
            }).then(function (res) {
                if (res.code === 200) {
                    return res.data;
                }
                else {
                    var newRes = {};
                    newRes[params.objectType] = {
                        Result: [],
                        TaskId: "",
                        TotalCount: 0
                    };
                    return newRes;
                }
            }, function (error) {
                var newRes = {};
                newRes[params.objectType] = {
                    Result: [],
                    TaskId: "",
                    TotalCount: 0
                };
                return newRes;
            });
        };
        ResourceRetrievalService.prototype.getDeviceInfoPromise = function (params) {
            var self = this;
            var arr = [];
            var param1 = {
                ids: params.deviceIds,
                type: params.deviceType
            };
            var param2 = {
                ids: params.ids,
                userId: params.userId
            };
            var arrQyery = [];
            arrQyery = [
                self.searchDeviceList(param1),
                self.findCollectStatus(param2)
            ];
            return Promise.all(arrQyery).then(function (res) {
                var resData;
                var newResult = new ResponseResult_1.ResponseResult();
                newResult.code = 200;
                newResult.data = {
                    deviceInfo: res[0].data || [],
                    collectStatus: res[1].data || []
                };
                return newResult;
            }, function (error) {
                var resData;
                var newResult = new ResponseResult_1.ResponseResult();
                newResult.code = 200;
                newResult.data = {
                    deviceInfo: [],
                    collectStatus: []
                };
                return newResult;
            });
        };
        ResourceRetrievalService.prototype.searchDeviceList = function (params) {
            return this.$http({
                method: 'post',
                url: '/db/resourceSearch/searchDevice',
                data: params
            });
        };
        ResourceRetrievalService.prototype.findCollectStatus = function (params) {
            return this.$http({
                method: 'post',
                url: '/db/collect/findCollectStatus',
                data: params
            });
        };
        ResourceRetrievalService.$inject = ['$http', 'systemLogFactory', 'notifyFactory', 'userInfoCacheFactory'];
        return ResourceRetrievalService;
    }());
    main_app_1.app
        .service('resourceRetrievalService', ResourceRetrievalService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL3Jlc291cmNlUmV0cmlldmFsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBd0JBLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQWtFckM7UUFJSSxrQ0FBb0IsS0FBZSxFQUFVLGdCQUFtQyxFQUFVLGFBQXFDLEVBQVUsb0JBQTJDO1lBQWhLLFVBQUssR0FBTCxLQUFLLENBQVU7WUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQW1CO1lBQVUsa0JBQWEsR0FBYixhQUFhLENBQXdCO1lBQVUseUJBQW9CLEdBQXBCLG9CQUFvQixDQUF1QjtZQUNoTCxJQUFJLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDLFlBQVksQ0FBQztRQUNqRCxDQUFDO1FBTUQsNERBQXlCLEdBQXpCLFVBQTBCLE9BQWU7WUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsUUFBUSxFQUFFLE1BQU07Z0JBQ2hCLEdBQUcsRUFBRSx5QkFBeUI7Z0JBQzlCLE1BQU0sRUFBRTtvQkFDSixRQUFRLEVBQUUsT0FBTztpQkFDcEI7YUFDSixDQUFDLENBQUM7UUFDUCxDQUFDO1FBTUQsd0RBQXFCLEdBQXJCLFVBQXNCLE1BQXlCO1lBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxNQUFNO2dCQUNkLEdBQUcsRUFBRSwwQ0FBMEM7Z0JBQy9DLElBQUksRUFBRSxNQUFNO2dCQUNaLE9BQU8sRUFBRSxFQUFFLEdBQUcsSUFBSTthQUNyQixDQUFDLENBQUMsSUFBSSxDQUNILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7Z0JBQy9CLGVB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LENBQUM7UUFFTyxvREFBaUIsR0FBekIsVUFBMEIsTUFBVztZQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxHQUFHLEVBQUUsK0JBQStCO2dCQUNwQyxJQUFJLEVBQUUsTUFBTTthQUNmLENBQUMsQ0FBQztRQUNQLENBQUM7UUF2Zk0sZ0NBQU8sR0FBa0IsQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsZUFBZSxFQUFFLHNCQUFzQixDQUFDLENBQUM7UUF3ZjNHLCtCQUFDO0tBemZELEFBeWZDLElBQUE7SUFDRCxjQUFHO1NBQ0UsT0FBTyxDQUFDLDBCQUEwQixFQUFFLHdCQUF3QixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9zZXJ2aWNlcy9yZXNvdXJjZVJldHJpZXZhbC5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXBwIH0gZnJvbSBcIi4uL2FwcC9tYWluLmFwcFwiO1xyXG5cclxuLy8g5pyN5YqhXHJcbmltcG9ydCAnLi4vZmFjdG9yeS9yZXNwb25zZS5ub3RpZnkuZmFjdG9yeSc7XHJcbmltcG9ydCB7IElSZXNwb25zZU5vdGlmeUZhY3RvcnkgfSBmcm9tIFwiLi4vZmFjdG9yeS9yZXNwb25zZS5ub3RpZnkuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCIuLi9mYWN0b3J5L3VzZXJpbmZvLmNhY2hlLmZhY3RvcnlcIjtcclxuaW1wb3J0IHsgSVVzZXJJbmZvQ2FjaGVGYWN0b3J5IH0gZnJvbSBcIi4uL2ZhY3RvcnkvdXNlcmluZm8uY2FjaGUuZmFjdG9yeVwiO1xyXG5pbXBvcnQgJy4uL2ZhY3RvcnkvU3lzdGVtTG9nLmZhY3RvcnknO1xyXG5pbXBvcnQgeyBJU3lzdGVtTG9nRmFjdG9yeSwgQWZ0ZXJSZXNwb25zZUNhbGxCYWNrLCBJUHJlU2F2ZUxvZ0V4IH0gZnJvbSBcIi4uL2ZhY3RvcnkvU3lzdGVtTG9nLmZhY3RvcnlcIjtcclxuXHJcbi8vIOWPguaVsFxyXG5pbXBvcnQgeyBSZXNwb25zZVJlc3VsdCwgUGFnZVJlc3VsdCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdCc7XHJcbmltcG9ydCB7IE9wZXJGaXRzdE1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L09wZXJGaXJzdE1vZHVsZSc7XHJcbmltcG9ydCB7IE9wZXJTZWNvbmRNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyU2Vjb25kTW9kdWxlJztcclxuaW1wb3J0IHsgT3BlclRoaXJkTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvT3BlclRoaXJkTW9kdWxlJztcclxuaW1wb3J0IHsgU2VhcmNoVmVoaWNsZU1vZGVsIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9wYXJhbXMvU2VhcmNoVmVoaWNsZVBhcmFtcyc7XHJcbmltcG9ydCB7IFZlaGljbGVTdWJCcmFuZE1vZGVsIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9zZXJ2ZXIvVmVoaWNsZVN1YkJyYW5kTW9kZWwnO1xyXG5pbXBvcnQgeyBSZXNvdXJjZVR5cGVFbnVtIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vUmVzb3VyY2VUeXBlXCI7XHJcblxyXG5pbXBvcnQgeyBJQW5ndWxhckh0dHAsIFByZVN5c3RlbUxvZyB9IGZyb20gXCIuLi9pbnRlcmNlcHRvcnMvaHR0cFwiO1xyXG5pbXBvcnQgeyBPcGVyQWN0aW9uVHlwZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L09wZXJBY3Rpb25UeXBlJztcclxuaW1wb3J0IHsgUFZEaWN0VHlwZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vUFZEaWN0VHlwZSc7XHJcbmltcG9ydCB7IFBWRFZlaGljbGVMaXN0TW9kZWwgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3NlcnZlci9QVkRWZWhpY2xlTGlzdE1vZGVsJztcclxuXHJcbmxldCBQcm9taXNlID0gcmVxdWlyZSgnZXM2LXByb21pc2UnKTtcclxuZGVjbGFyZSBsZXQgcmVxdWlyZTogYW55LCBhbmd1bGFyOiBhbnk7XHJcblxyXG4vLyDlv6vpgJ/mo4DntKLlj4LmlbBcclxuaW50ZXJmYWNlIFF1aWNrU2VhcmNoUGFyYW1zIHtcclxuICAgIGtleVdvcmQ6IHN0cmluZztcclxuICAgIG9iamVjdFR5cGU6IHN0cmluZztcclxuICAgIGN1cnJlbnRQYWdlOiBudW1iZXI7XHJcbiAgICBwYWdlU2l6ZTogbnVtYmVyO1xyXG4gICAgb3JkZXJCeTogYW55O1xyXG4gICAgaXNGaXJzdFNlYXJjaD86IGJvb2xlYW47XHJcbiAgICBbcHJvcE5hbWU6IHN0cmluZ106IGFueTtcclxufVxyXG5cclxuLy8g6auY57qn5qOA57SiRmFjZeWPguaVsFxyXG5pbnRlcmZhY2UgYWR2YW5jZWRQYXJhbXNGYWNlIHtcclxuICAgIFtwcm9wTmFtZTogc3RyaW5nXTogYW55O1xyXG59XHJcblxyXG4vLyDpq5jnuqfmo4DntKJ3aWZp5Y+C5pWwXHJcbmludGVyZmFjZSBhZHZhbmNlZFBhcmFtc1dpZmkge1xyXG4gICAgW3Byb3BOYW1lOiBzdHJpbmddOiBhbnk7XHJcbn1cclxuLy8g6auY57qn5qOA57Si55S15Zu05Y+C5pWwXHJcbmludGVyZmFjZSBhZHZhbmNlZFBhcmFtc0VGZW5jZSB7XHJcbiAgICBbcHJvcE5hbWU6IHN0cmluZ106IGFueTtcclxufVxyXG5cclxuLy8g5re75Yqg5pS26JeP5Y+C5pWwXHJcbi8vIFRPRE8g5q2k5bGe5oCn5bqU6K+l5bqf5byDLCDmjaLmiJBDb2xsZWN0UGFyYW1z5paH5Lu26YeM55qE5ZCM5ZCN5bGe5oCnXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29sbGVjdEFkZFBhcmFtcyB7XHJcbiAgICBqc29uOiBzdHJpbmc7XHJcbiAgICBvYmplY3RJRDogc3RyaW5nO1xyXG4gICAgb2JqZWN0VHlwZTogc3RyaW5nO1xyXG4gICAgdXNlcklkPzogc3RyaW5nO1xyXG59XHJcblxyXG4vLyDliKDpmaTmlLbol4/lj4LmlbBcclxuLy8gVE9ETyDmraTlsZ7mgKflupTor6Xlup/lvIMsIOaNouaIkENvbGxlY3RQYXJhbXPmlofku7bph4znmoTlkIzlkI3lsZ7mgKdcclxuZXhwb3J0IGludGVyZmFjZSBDb2xsZWN0RGVsZXRlUGFyYW1zIHtcclxuICAgIGlkczogQXJyYXk8c3RyaW5nPlxyXG59XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlIHtcclxuICAgIGFzc29jaWF0ZVNlYXJjaEJ5S2V5V29yZHMoa2V5d29yZDogc3RyaW5nKTogUHJvbWlzZTxhbnk+O1xyXG4gICAgcXVpY2tTZWFyY2hCeUtleVdvcmRzKHBhcmFtczogUXVpY2tTZWFyY2hQYXJhbXMpOiBQcm9taXNlPGFueT47XHJcbiAgICBhZHZhbmNlZFNlYXJjaEJ5RmFjZShwYXJhbXM6IGFkdmFuY2VkUGFyYW1zRmFjZSk6IFByb21pc2U8YW55PjtcclxuICAgIGFkdmFuY2VkU2VhcmNoQnlDYXIocGFyYW1zOiBhbnkpOiBQcm9taXNlPGFueT47XHJcbiAgICBhZHZhbmNlZFNlYXJjaEJ5Q2FyRXgocGFyYW1zOiBhbnkpOiBQcm9taXNlPGFueT47XHJcbiAgICBhZHZhbmNlZFNlYXJjaEJ5V2lmaShwYXJhbXM6IGFkdmFuY2VkUGFyYW1zV2lmaSk6IFByb21pc2U8YW55PjtcclxuICAgIGFkdmFuY2VkU2VhcmNoQnlFRmVuY2UocGFyYW1zOiBhZHZhbmNlZFBhcmFtc0VGZW5jZSk6IFByb21pc2U8YW55PjtcclxuICAgIGdldERldmljZUJ5SWQoaWQ6IHN0cmluZywgdHlwZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+O1xyXG4gICAgdXBsb2FkSW1hZ2U6IChwYXJhbXM6IEZvcm1EYXRhKSA9PiBhbnk7XHJcbiAgICB1cGxvYWRDYXJJbWFnZTogKHBhcmFtczogRm9ybURhdGEpID0+IGFueTtcclxuICAgIGNvbGxlY3RBZGRJbmZvKHBhcmFtczogQ29sbGVjdEFkZFBhcmFtcyk6IFByb21pc2U8c3RyaW5nPjtcclxuICAgIGNvbGxlY3REZWxldGVJbmZvKHBhcmFtczogYW55KTogUHJvbWlzZTxib29sZWFuPjtcclxuICAgIGZpbmRTeXN0ZW1Qb2ludEJ5SWQ6IChpZDogc3RyaW5nKSA9PiBQcm9taXNlPGFueT47XHJcbiAgICBnZXRQVkRUeXBlKHNlYXJjaFR5cGU6IHN0cmluZyk6IFByb21pc2U8eyBba2V5OiBzdHJpbmddOiBzdHJpbmc7IH0+O1xyXG4gICAgZ2V0U3ViR3JhbmQoc2VhcmNoVHlwZTogc3RyaW5nKTogUHJvbWlzZTxBcnJheTxWZWhpY2xlU3ViQnJhbmRNb2RlbD4+O1xyXG4gICAgZmluZExhbXBEZXZpY2VDaGlsZHJlbkJ5SWQ6IChwYXJhbXM6IGFueSkgPT4gUHJvbWlzZTxhbnk+O1xyXG4gICAgc2VhcmNoTG9nQnlJZChwYXJhbXM6IGFkdmFuY2VkUGFyYW1zRmFjZSk6IFByb21pc2U8YW55PjtcclxuICAgIHNlYXJjaFF1aWNrQnlQcm9taXNlKHBhcmFtczogUXVpY2tTZWFyY2hQYXJhbXMpOiBQcm9taXNlPGFueT47XHJcbiAgICBnZXREZXZpY2VJbmZvUHJvbWlzZShwYXJhbXM6IGFkdmFuY2VkUGFyYW1zRmFjZSk6IFByb21pc2U8YW55PjtcclxufVxyXG5cclxuY2xhc3MgUmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlIGltcGxlbWVudHMgSVJlc291cmNlUmV0cmlldmFsU2VydmljZSB7XHJcbiAgICBzdGF0aWMgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFsnJGh0dHAnLCAnc3lzdGVtTG9nRmFjdG9yeScsICdub3RpZnlGYWN0b3J5JywgJ3VzZXJJbmZvQ2FjaGVGYWN0b3J5J107XHJcbiAgICBwcml2YXRlIG5vdGlmeUZ1bmM6IChyZXM6IFJlc3BvbnNlUmVzdWx0PGFueT4pID0+IFJlc3BvbnNlUmVzdWx0PGFueT47XHJcbiAgICBwcml2YXRlIGxvZ0Z1bmM6IElQcmVTYXZlTG9nRXg7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBGdW5jdGlvbiwgcHJpdmF0ZSBzeXN0ZW1Mb2dGYWN0b3J5OiBJU3lzdGVtTG9nRmFjdG9yeSwgcHJpdmF0ZSBub3RpZnlGYWN0b3J5OiBJUmVzcG9uc2VOb3RpZnlGYWN0b3J5LCBwcml2YXRlIHVzZXJJbmZvQ2FjaGVGYWN0b3J5OiBJVXNlckluZm9DYWNoZUZhY3RvcnkpIHtcclxuICAgICAgICB0aGlzLm5vdGlmeUZ1bmMgPSBub3RpZnlGYWN0b3J5Lm1zZyh7IG9ubHlTdWNjZXNzOiB0cnVlIH0pO1xyXG4gICAgICAgIHRoaXMubG9nRnVuYyA9IHN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOi1hOa6kOajgOe0ouiBlOaDs+afpeivolxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleXdvcmRcclxuICAgICAqL1xyXG4gICAgYXNzb2NpYXRlU2VhcmNoQnlLZXlXb3JkcyhrZXl3b3JkOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIHVybDogJy9kYi9yZXNvdXJjZVNlYXJjaC90aXBzJyxcclxuICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBrZXlXb3Jkczoga2V5d29yZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5b+r6YCf5qOA57SiXHJcbiAgICAgKiBAcGFyYW0ge1F1aWNrU2VhcmNoUGFyYW1zfSBwYXJhbXNcclxuICAgICAqL1xyXG4gICAgcXVpY2tTZWFyY2hCeUtleVdvcmRzKHBhcmFtczogUXVpY2tTZWFyY2hQYXJhbXMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICB1cmw6ICcvZGIvcmVzb3VyY2VTZWFyY2gvcXVpY2tTZWFyY2hCeUtleVdvcmRzJyxcclxuICAgICAgICAgICAgZGF0YTogcGFyYW1zLFxyXG4gICAgICAgICAgICB0aW1lb3V0OiA0MCAqIDEwMDAgLy8g6ICX5pe26ZW/IOaVheiuvue9rjQwc1xyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuUmVzb3VyY2VSZXRyaWV2YWwuY29kZSxcclxuICAgICAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuUmVzb3VyY2VSZXRyaWV2YWxfRnVsbFNlYXJjaC5jb2RlLFxyXG4gICAgICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiAnJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIEZhY2Xpq5jnuqfmo4DntKJcclxuICAgICAqIEBwYXJhbSB7YWR2YW5jZWRQYXJhbXNGYWNlfSBwYXJhbXNcclxuICAgICAqL1xyXG4gICAgYWR2YW5jZWRTZWFyY2hCeUZhY2UocGFyYW1zOiBhZHZhbmNlZFBhcmFtc0ZhY2UpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICB1cmw6ICcvcGRwL3NlYXJjaC9hZHZhbmNlL3NlYXJjaGFjY2Vzc2xvZycsXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtc1xyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuUmVzb3VyY2VSZXRyaWV2YWwuY29kZSxcclxuICAgICAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuUmVzb3VyY2VSZXRyaWV2YWxfQWR2YW5jZVNlYXJjaC5jb2RlLFxyXG4gICAgICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiBPcGVyVGhpcmRNb2R1bGUuUmVzb3VyY2VSZXRyaWV2YWxfQWR2YW5jZVNlYXJjaF9GYWNlLmNvZGVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIGNhcuW/q+mAn+ajgOe0ouS7peWbvuaQnOe0olxyXG4gICAgICogQHBhcmFtIHthZHZhbmNlZFBhcmFtc0ZhY2V9IHBhcmFtc1xyXG4gICAgICovXHJcbiAgICBhZHZhbmNlZFNlYXJjaEJ5Q2FyKHBhcmFtczogU2VhcmNoVmVoaWNsZU1vZGVsKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgdXJsOiAnL2RiL3Jlc291cmNlU2VhcmNoL3NlYXJjaENhcicsXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtc1xyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuUmVzb3VyY2VSZXRyaWV2YWwuY29kZSxcclxuICAgICAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuUmVzb3VyY2VSZXRyaWV2YWxfQWR2YW5jZVNlYXJjaC5jb2RlLFxyXG4gICAgICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiBPcGVyVGhpcmRNb2R1bGUuUmVzb3VyY2VSZXRyaWV2YWxfQWR2YW5jZVNlYXJjaF9WZWhpY2xlLmNvZGVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOi9pui+humrmOe6p+ajgOe0olxyXG4gICAgICogQHBhcmFtIHtTZWFyY2hWZWhpY2xlTW9kZWx9IHBhcmFtc1xyXG4gICAgICovXHJcbiAgICBhZHZhbmNlZFNlYXJjaEJ5Q2FyRXgocGFyYW1zOiBTZWFyY2hWZWhpY2xlTW9kZWwpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICB1cmw6ICcvZGIvcmVzb3VyY2VTZWFyY2gvYWR2YW5jZWRTZWFyY2hDYXInLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXNcclxuICAgICAgICAgICAgLy8gdGltZW91dDogMzAgKiAxMDAwLFxyXG4gICAgICAgICAgICAvLyBzaG93TG9hZDogdHJ1ZVxyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuUmVzb3VyY2VSZXRyaWV2YWwuY29kZSxcclxuICAgICAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuUmVzb3VyY2VSZXRyaWV2YWxfQWR2YW5jZVNlYXJjaC5jb2RlLFxyXG4gICAgICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiBPcGVyVGhpcmRNb2R1bGUuUmVzb3VyY2VSZXRyaWV2YWxfQWR2YW5jZVNlYXJjaF9WZWhpY2xlLmNvZGVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gV0lGSemrmOe6p+ajgOe0olxyXG4gICAgICogQHBhcmFtIHthZHZhbmNlZFBhcmFtc1dpZml9IHBhcmFtc1xyXG4gICAgICovXHJcbiAgICBhZHZhbmNlZFNlYXJjaEJ5V2lmaShwYXJhbXM6IGFkdmFuY2VkUGFyYW1zV2lmaSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIHVybDogJy9kYi9yZXNvdXJjZVNlYXJjaC9zZWFyY2hXaUZpQnlQYXJhbXMnLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXNcclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICB0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLlJlc291cmNlUmV0cmlldmFsLmNvZGUsXHJcbiAgICAgICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLlJlc291cmNlUmV0cmlldmFsX0FkdmFuY2VTZWFyY2guY29kZSxcclxuICAgICAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLlJlc291cmNlUmV0cmlldmFsX0FkdmFuY2VTZWFyY2hfV2lGaS5jb2RlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiBFRmVuY2Xpq5jnuqfmo4DntKJcclxuICAgICAqIEBwYXJhbSB7YWR2YW5jZWRQYXJhbXNFRmVuY2V9IHBhcmFtc1xyXG4gICAgICovXHJcbiAgICBhZHZhbmNlZFNlYXJjaEJ5RUZlbmNlKHBhcmFtczogYWR2YW5jZWRQYXJhbXNFRmVuY2UpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICB1cmw6ICcvZGIvcmVzb3VyY2VTZWFyY2gvc2VhcmNoRUZlbmNlQnlQYXJhbXMnLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXNcclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICB0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLlJlc291cmNlUmV0cmlldmFsLmNvZGUsXHJcbiAgICAgICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLlJlc291cmNlUmV0cmlldmFsX0FkdmFuY2VTZWFyY2guY29kZSxcclxuICAgICAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLlJlc291cmNlUmV0cmlldmFsX0FkdmFuY2VTZWFyY2hfRUZlbmNlLmNvZGVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOiOt+WPlui9pui+huS/oeaBr+ivpuaDhVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKi9cclxuICAgIGdldENhckRldGFpbEluZm8oaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgdXJsOiAnL2RiL3Jlc291cmNlU2VhcmNoL3RpcHMnLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIGtleVdvcmRzOiBpZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g6I635Y+W5Zyw5Zu+6K6+5aSH5L+h5oGvXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXHJcbiAgICAgKi9cclxuICAgIGdldERldmljZUJ5SWQoaWQ6IHN0cmluZywgdHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwicG9zdFwiLFxyXG4gICAgICAgICAgICB1cmw6IFwiL2RiL3Jlc291cmNlL2dldERldmljZUJ5SWRcIixcclxuICAgICAgICAgICAgZGF0YTogeyBpZDogaWQsIHR5cGU6IHR5cGUgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOWbvueJh+S4iuS8oFxyXG4gICAgICogQHBhcmFtIHtGb3JtRGF0YX0gcGFyYW1zXHJcbiAgICAgKi9cclxuICAgIHVwbG9hZEltYWdlKHBhcmFtczogRm9ybURhdGEpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmU6IGFueSwgcmVqZWN0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICB4aHIub3BlbignUE9TVCcsICcvZGIvcmVzb3VyY2VTZWFyY2gvY2hlY2tGYWNlJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoZXYpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0ICYmIHhoci5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB4aHIub25lcnJvciA9IChlcnI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycilcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgeGhyLnNlbmQocGFyYW1zKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5Zu+54mH5LiK5LygXHJcbiAgICAgKiBAcGFyYW0ge0Zvcm1EYXRhfSBwYXJhbXNcclxuICAgICAqL1xyXG4gICAgdXBsb2FkQ2FySW1hZ2UocGFyYW1zOiBGb3JtRGF0YSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZTogYW55LCByZWplY3Q6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIHhoci5vcGVuKCdQT1NUJywgJy9kYi9yZXNvdXJjZVNlYXJjaC9jaGVja0NhcicsIHRydWUpO1xyXG4gICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKGV2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiB4aHIuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgeGhyLm9uZXJyb3IgPSAoZXJyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHhoci5zZW5kKHBhcmFtcylcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9u5re75Yqg5pS26JePXHJcbiAgICAgKiBAcGFyYW0ge0NvbGxlY3RBZGRQYXJhbXN9IHBhcmFtc1xyXG4gICAgICovXHJcbiAgICBjb2xsZWN0QWRkSW5mbyhwYXJhbXM6IENvbGxlY3RBZGRQYXJhbXMpIHtcclxuICAgICAgICBsZXQgX3BhcmFtczogQ29sbGVjdEFkZFBhcmFtcyA9IGFuZ3VsYXIuY29weShwYXJhbXMpO1xyXG4gICAgICAgIF9wYXJhbXMudXNlcklkID0gdGhpcy51c2VySW5mb0NhY2hlRmFjdG9yeS5nZXRDdXJyZW50VXNlcklkKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgdXJsOiAnL2RiL2NvbGxlY3QvYWRkJyxcclxuICAgICAgICAgICAgZGF0YTogX3BhcmFtc1xyXG4gICAgICAgIH0pLnRoZW4odGhpcy5ub3RpZnlGdW5jKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbuWIoOmZpOaUtuiXj1xyXG4gICAgICogQHBhcmFtIHtDb2xsZWN0RGVsZXRlUGFyYW1zfSBwYXJhbXNcclxuICAgICAqL1xyXG4gICAgY29sbGVjdERlbGV0ZUluZm8ocGFyYW1zOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICB1cmw6ICcvZGIvY29sbGVjdC9kZWxldGVCeU9iamVjdElkJyxcclxuICAgICAgICAgICAgZGF0YTogcGFyYW1zXHJcbiAgICAgICAgfSkudGhlbih0aGlzLm5vdGlmeUZ1bmMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOiOt+WPluiuvuWkh+WdkOagh1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKi9cclxuICAgIGZpbmRTeXN0ZW1Qb2ludEJ5SWQoaWQ6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvZGIvbGFtcC9maW5kU3lzdGVtUG9pbnRCeUlkXCIsXHJcbiAgICAgICAgICAgIHBhcmFtczogeyBpZDogaWQgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+WcHZk55u45YWz55qE5pWw5o2u57G75Z6LLCDlpoI6IOi9pui+huminOiJsiwg6L2m54mM57G75Z6L562JXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBnZXRQVkRUeXBlKHNlYXJjaFR5cGU6IHN0cmluZyk6IFByb21pc2U8eyBba2V5OiBzdHJpbmddOiBzdHJpbmc7IH0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIHVybDogXCIvcGRwL2NvbW1vbkN0cmwvZGljdExpc3QvQnlUeXBlRnJvbVBWRFwiLFxyXG4gICAgICAgICAgICBtZXRob2Q6IFwicG9zdFwiLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHsgZGljdFR5cGU6IHNlYXJjaFR5cGUgfVxyXG4gICAgICAgIH0pLnRoZW4oKHJlczogUmVzcG9uc2VSZXN1bHQ8eyBba2V5OiBzdHJpbmddOiBzdHJpbmc7IH0+KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluW9k+WJjei9pueJjOeahOWtkOi9pueJjFxyXG4gICAgICovXHJcbiAgICBnZXRTdWJHcmFuZChzZWFyY2hUeXBlOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIHVybDogXCIvcGRwL3ZlaGljbGVDdHJsL3ZlaGljbGUvZ2V0U3ViR3JhbmRcIixcclxuICAgICAgICAgICAgbWV0aG9kOiBcImdldFwiLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHsgdmVoaWNsZUJyYW5kOiBzZWFyY2hUeXBlIH1cclxuICAgICAgICB9KS50aGVuKChyZXM6IFJlc3BvbnNlUmVzdWx0PEFycmF5PFZlaGljbGVTdWJCcmFuZE1vZGVsPj4pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDojrflj5blnLDlm77orr7lpIfkv6Hmga9cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcclxuICAgICAqL1xyXG4gICAgZmluZExhbXBEZXZpY2VDaGlsZHJlbkJ5SWQocGFyYW1zOiBhbnkpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcImdldFwiLFxyXG4gICAgICAgICAgICB1cmw6IFwiL2RiL2xhbXAvZmluZExhbXBEZXZpY2VDaGlsZHJlbkJ5SWRcIixcclxuICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBpZDogcGFyYW1zLmlkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDojrflj5bkurrohLjorrDlvZXpgJrnlKjml6Xlv5dcclxuICAgICAqIEBwYXJhbSB7YWR2YW5jZWRQYXJhbXNGYWNlfSBwYXJhbXNcclxuICAgICAqL1xyXG4gICAgc2VhcmNoTG9nQnlJZChwYXJhbXM6IGFkdmFuY2VkUGFyYW1zRmFjZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIHVybDogJy9wZHAvc2VhcmNoL2xvZycsXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtc1xyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuUmVzb3VyY2VSZXRyaWV2YWwuY29kZSxcclxuICAgICAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuUmVzb3VyY2VSZXRyaWV2YWxfQWR2YW5jZVNlYXJjaC5jb2RlLFxyXG4gICAgICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiBPcGVyVGhpcmRNb2R1bGUuUmVzb3VyY2VSZXRyaWV2YWxfQWR2YW5jZVNlYXJjaF9GYWNlLmNvZGVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIHNlYXJjaFF1aWNrQnlQcm9taXNlKHBhcmFtczogUXVpY2tTZWFyY2hQYXJhbXMpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGFyciA9IFtdO1xyXG4gICAgICAgIGxldCBhcnJReWVyeSA9IFtdO1xyXG5cclxuICAgICAgICBpZiAocGFyYW1zLm9iamVjdFR5cGUgPT09IFwiQWxsXCIpIHtcclxuICAgICAgICAgICAgYXJyID0gW2FuZ3VsYXIuY29weShwYXJhbXMpLCBhbmd1bGFyLmNvcHkocGFyYW1zKSwgYW5ndWxhci5jb3B5KHBhcmFtcyksIGFuZ3VsYXIuY29weShwYXJhbXMpLCBhbmd1bGFyLmNvcHkocGFyYW1zKSwgYW5ndWxhci5jb3B5KHBhcmFtcyksIGFuZ3VsYXIuY29weShwYXJhbXMpLCBhbmd1bGFyLmNvcHkocGFyYW1zKV07XHJcbiAgICAgICAgICAgIGFyclswXS5vYmplY3RUeXBlID0gUmVzb3VyY2VUeXBlRW51bVsyXS52YWx1ZTtcclxuICAgICAgICAgICAgYXJyWzFdLm9iamVjdFR5cGUgPSBSZXNvdXJjZVR5cGVFbnVtWzFdLnZhbHVlO1xyXG4gICAgICAgICAgICBhcnJbMl0ub2JqZWN0VHlwZSA9IFJlc291cmNlVHlwZUVudW1bNV0udmFsdWU7XHJcbiAgICAgICAgICAgIGFyclszXS5vYmplY3RUeXBlID0gUmVzb3VyY2VUeXBlRW51bVs3XS52YWx1ZTtcclxuICAgICAgICAgICAgYXJyWzRdLm9iamVjdFR5cGUgPSBSZXNvdXJjZVR5cGVFbnVtWzEwXS52YWx1ZTtcclxuICAgICAgICAgICAgYXJyUXllcnkgPSBbXHJcbiAgICAgICAgICAgICAgICBzZWxmLnF1aWNrU2VhcmNoQnlDb21tb24oYXJyWzBdKSxcclxuICAgICAgICAgICAgICAgIHNlbGYucXVpY2tTZWFyY2hCeUNvbW1vbihhcnJbMV0pLFxyXG4gICAgICAgICAgICAgICAgc2VsZi5xdWlja1NlYXJjaEJ5Q29tbW9uKGFyclsyXSksXHJcbiAgICAgICAgICAgICAgICBzZWxmLnF1aWNrU2VhcmNoQnlDb21tb24oYXJyWzNdKSxcclxuICAgICAgICAgICAgICAgIHNlbGYucXVpY2tTZWFyY2hCeUNvbW1vbihhcnJbNF0pXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYXJyID0gW3BhcmFtc107XHJcbiAgICAgICAgICAgIHN3aXRjaCAocGFyYW1zLm9iamVjdFR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgUmVzb3VyY2VUeXBlRW51bVsyXS52YWx1ZTpcclxuICAgICAgICAgICAgICAgIGNhc2UgUmVzb3VyY2VUeXBlRW51bVsxXS52YWx1ZTpcclxuICAgICAgICAgICAgICAgIGNhc2UgUmVzb3VyY2VUeXBlRW51bVs1XS52YWx1ZTpcclxuICAgICAgICAgICAgICAgIGNhc2UgUmVzb3VyY2VUeXBlRW51bVs3XS52YWx1ZTpcclxuICAgICAgICAgICAgICAgICAgICBhcnJReWVyeSA9IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5xdWlja1NlYXJjaEJ5Q29tbW9uKGFyclswXSlcclxuICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoYXJyUXllcnkpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICBsZXQgcmVzRGF0YTogYW55O1xyXG4gICAgICAgICAgICBsZXQgbmV3UmVzdWx0ID0gbmV3IFJlc3BvbnNlUmVzdWx0KCk7XHJcbiAgICAgICAgICAgIG5ld1Jlc3VsdC5jb2RlID0gMjAwO1xyXG4gICAgICAgICAgICBpZiAocGFyYW1zLm9iamVjdFR5cGUgPT09IFwiQWxsXCIpIHtcclxuICAgICAgICAgICAgICAgIHJlc0RhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgVmVoaWNsZTogcmVzWzBdLlZlaGljbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgRmFjZTogcmVzWzFdLkZhY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgV2lGaTogcmVzWzJdLldpRmksXHJcbiAgICAgICAgICAgICAgICAgICAgRUZFTkNFOiByZXNbM10uRUZFTkNFXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc1s0XS5SbXBHYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzRGF0YVtcIkRldmljZVJtcEdhdGVcIl0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlc3VsdDogcmVzWzRdLlJtcEdhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRhc2tJZDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgVG90YWxDb3VudDogcmVzWzRdLlJtcEdhdGUubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzRGF0YVtcIkRldmljZVJtcEdhdGVcIl0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlc3VsdDogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRhc2tJZDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgVG90YWxDb3VudDogMFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzWzRdLkNhbWVyYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc0RhdGFbXCJEZXZpY2VDYW1lcmFcIl0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlc3VsdDogcmVzWzRdLkNhbWVyYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgVGFza0lkOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUb3RhbENvdW50OiByZXNbNF0uQ2FtZXJhLmxlbmd0aFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc0RhdGFbXCJEZXZpY2VDYW1lcmFcIl0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlc3VsdDogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRhc2tJZDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgVG90YWxDb3VudDogMFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzWzRdLldpRmkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNEYXRhW1wiRGV2aWNlV2lGaVwiXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVzdWx0OiByZXNbNF0uV2lGaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgVGFza0lkOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUb3RhbENvdW50OiByZXNbNF0uV2lGaS5sZW5ndGhcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNEYXRhW1wiRGV2aWNlV2lGaVwiXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVzdWx0OiBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgVGFza0lkOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUb3RhbENvdW50OiAwXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChyZXNbNF0uRUZFTkNFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzRGF0YVtcIkRldmljZUVGRU5DRVwiXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVzdWx0OiByZXNbNF0uRUZFTkNFLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUYXNrSWQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRvdGFsQ291bnQ6IHJlc1s0XS5FRkVOQ0UubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzRGF0YVtcIkRldmljZUVGRU5DRVwiXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVzdWx0OiBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgVGFza0lkOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUb3RhbENvdW50OiAwXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5ld1Jlc3VsdC5jb3VudCA9IHJlc0RhdGEuVmVoaWNsZS5Ub3RhbENvdW50ICsgcmVzRGF0YS5GYWNlLlRvdGFsQ291bnQgKyByZXNEYXRhLldpRmkuVG90YWxDb3VudCArIHJlc0RhdGEuRUZFTkNFLlRvdGFsQ291bnQgKyByZXNEYXRhLkRldmljZVJtcEdhdGUuVG90YWxDb3VudCArIHJlc0RhdGEuRGV2aWNlQ2FtZXJhLlRvdGFsQ291bnQgKyByZXNEYXRhLkRldmljZVdpRmkuVG90YWxDb3VudCArIHJlc0RhdGEuRGV2aWNlRUZFTkNFLlRvdGFsQ291bnQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXNEYXRhID0gcmVzWzBdO1xyXG4gICAgICAgICAgICAgICAgbmV3UmVzdWx0LmNvdW50ID0gcmVzWzBdW3BhcmFtcy5vYmplY3RUeXBlXS5Ub3RhbENvdW50XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3UmVzdWx0LmRhdGEgPSByZXNEYXRhO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ld1Jlc3VsdDtcclxuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuUmVzb3VyY2VSZXRyaWV2YWwuY29kZSxcclxuICAgICAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuUmVzb3VyY2VSZXRyaWV2YWxfRnVsbFNlYXJjaC5jb2RlLFxyXG4gICAgICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiAnJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkudGhlbihcclxuICAgICAgICAgICAgdGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6T3BlckZpdHN0TW9kdWxlLlJlc291cmNlUmV0cmlldmFsLmNvZGUsXHJcbiAgICAgICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOk9wZXJTZWNvbmRNb2R1bGUuUmVzb3VyY2VSZXRyaWV2YWxfRnVsbFNlYXJjaC5jb2RlLFxyXG4gICAgICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiAnRGV2aWNlJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBxdWlja1NlYXJjaEJ5Q29tbW9uKHBhcmFtczogUXVpY2tTZWFyY2hQYXJhbXMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICB1cmw6ICcvcGRwL3NlYXJjaC9xdWljay9jb21tb24nLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXMsXHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmRhdGE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3UmVzOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgICAgIG5ld1Jlc1twYXJhbXMub2JqZWN0VHlwZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVzdWx0OiBbXSxcclxuICAgICAgICAgICAgICAgICAgICBUYXNrSWQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgVG90YWxDb3VudDogMFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXdSZXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgbGV0IG5ld1JlczogYW55ID0ge307XHJcbiAgICAgICAgICAgIG5ld1Jlc1twYXJhbXMub2JqZWN0VHlwZV0gPSB7XHJcbiAgICAgICAgICAgICAgICBSZXN1bHQ6IFtdLFxyXG4gICAgICAgICAgICAgICAgVGFza0lkOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgVG90YWxDb3VudDogMFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3UmVzO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERldmljZUluZm9Qcm9taXNlKHBhcmFtczogYW55KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBhcnIgPSBbXTtcclxuICAgICAgICBsZXQgcGFyYW0xOiBhbnkgPSB7XHJcbiAgICAgICAgICAgIGlkczogcGFyYW1zLmRldmljZUlkcyxcclxuICAgICAgICAgICAgdHlwZTogcGFyYW1zLmRldmljZVR5cGVcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBwYXJhbTI6IGFueSA9IHtcclxuICAgICAgICAgICAgaWRzOiBwYXJhbXMuaWRzLFxyXG4gICAgICAgICAgICB1c2VySWQ6IHBhcmFtcy51c2VySWRcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBhcnJReWVyeSA9IFtdO1xyXG5cclxuICAgICAgICBhcnJReWVyeSA9IFtcclxuICAgICAgICAgICAgc2VsZi5zZWFyY2hEZXZpY2VMaXN0KHBhcmFtMSksXHJcbiAgICAgICAgICAgIHNlbGYuZmluZENvbGxlY3RTdGF0dXMocGFyYW0yKVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChhcnJReWVyeSkudGhlbihmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgIGxldCByZXNEYXRhOiBhbnk7XHJcbiAgICAgICAgICAgIGxldCBuZXdSZXN1bHQgPSBuZXcgUmVzcG9uc2VSZXN1bHQoKTtcclxuICAgICAgICAgICAgbmV3UmVzdWx0LmNvZGUgPSAyMDA7XHJcbiAgICAgICAgICAgIG5ld1Jlc3VsdC5kYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgZGV2aWNlSW5mbzogcmVzWzBdLmRhdGEgfHwgW10sXHJcbiAgICAgICAgICAgICAgICBjb2xsZWN0U3RhdHVzOiByZXNbMV0uZGF0YSB8fCBbXVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3UmVzdWx0O1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICBsZXQgcmVzRGF0YTogYW55O1xyXG4gICAgICAgICAgICBsZXQgbmV3UmVzdWx0ID0gbmV3IFJlc3BvbnNlUmVzdWx0KCk7XHJcbiAgICAgICAgICAgIG5ld1Jlc3VsdC5jb2RlID0gMjAwO1xyXG4gICAgICAgICAgICBuZXdSZXN1bHQuZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIGRldmljZUluZm86IFtdLFxyXG4gICAgICAgICAgICAgICAgY29sbGVjdFN0YXR1czogW11cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ld1Jlc3VsdDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlYXJjaERldmljZUxpc3QocGFyYW1zOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICB1cmw6ICcvZGIvcmVzb3VyY2VTZWFyY2gvc2VhcmNoRGV2aWNlJyxcclxuICAgICAgICAgICAgZGF0YTogcGFyYW1zXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmaW5kQ29sbGVjdFN0YXR1cyhwYXJhbXM6IGFueSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIHVybDogJy9kYi9jb2xsZWN0L2ZpbmRDb2xsZWN0U3RhdHVzJyxcclxuICAgICAgICAgICAgZGF0YTogcGFyYW1zXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuYXBwXHJcbiAgICAuc2VydmljZSgncmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlJywgUmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlKTsiXX0=
