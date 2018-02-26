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
define(["require", "exports", "../../../common/app/main.app", "../../../../core/server/enum/SocketResultTypeEnum", "moment"], function (require, exports, main_app_1, SocketResultTypeEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var socketParams = (function () {
        function socketParams() {
        }
        return socketParams;
    }());
    exports.socketParams = socketParams;
    var statisticController = (function () {
        function statisticController($scope, $timeout, socketFactory, deviceSocketServer, userInfoCacheFactory, resourceRetrievalService, resourceService, echartFactory) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.socketFactory = socketFactory;
            this.deviceSocketServer = deviceSocketServer;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.resourceRetrievalService = resourceRetrievalService;
            this.resourceService = resourceService;
            this.echartFactory = echartFactory;
            this.CarAllData = [];
            this.PersonAllData = [];
            this.CarHistory();
            this.FaceHistory();
        }
        statisticController.prototype.CarHistory = function () {
            var that = this;
            var param = {
                "startTime": moment().subtract().format("YYYY-MM-DD hh:mm:ss"),
                "endTime": moment().format("YYYY-MM-DD hh:mm:ss"),
                "arrObjectID": ["f470f3e385434f4da76b772978881702"],
                "currentPage": 1,
                "pageSize": 12
            };
            this.resourceRetrievalService.advancedSearchByCarEx(param).then(function (res) {
                console.log("============抓拍车辆");
                console.log(res);
            });
        };
        statisticController.prototype.FaceHistory = function () {
            var that = this;
            var param = {
                "startTime": moment().subtract(1, "month").format("YYYY-MM-DD hh:mm:ss"),
                "endTime": moment().format("YYYY-MM-DD hh:mm:ss"),
                "arrCameraId": ["787f7e815a224fe89e369240e54777ba"],
                "currentPage": 1,
                "pageSize": 12
            };
            that.resourceRetrievalService.advancedSearchByFace(param).then(function (res) {
                if (res.data && res.data.Face.Result) {
                    res.data.Face.Result.forEach(function (item) {
                        if (that.PersonAllData.length <= 12) {
                            that.PersonAllData.push(item.AccessLog);
                        }
                    });
                }
            });
        };
        statisticController.prototype.SubscribeAllVehicleLog = function (staticID, taskAlarm, subName) {
            var _this = this;
            var that = this;
            that.deviceSocketServer.subscribeInfo(taskAlarm).then(function (res) {
                if (res && res.message == subName) {
                    res.data.forEach(function (item) {
                        if (_this.CarAllData.length <= 12) {
                            _this.CarAllData.push(item.result);
                        }
                    });
                }
                if (!taskAlarm.isCancel) {
                    that.echartFactory.CarSocketID = that.socketFactory.subscribe(subName, function (data) {
                        data.forEach(function (result) {
                            that.changeTheDom(staticID, result);
                        });
                    });
                }
                else {
                    that.echartFactory.CarSocketID = null;
                }
            });
        };
        statisticController.prototype.SubscribeAllFaceLog = function (staticID, taskAlarm, subName) {
            var _this = this;
            var that = this;
            that.deviceSocketServer.subscribeInfo(taskAlarm).then(function (res) {
                if (res && res.message == subName) {
                    res.data.forEach(function (item) {
                        if (_this.PersonAllData.length <= 12) {
                            _this.PersonAllData.push(item);
                        }
                    });
                }
                if (!taskAlarm.isCancel) {
                    that.echartFactory.FaceSocketID = that.socketFactory.subscribe(subName, function (data) {
                        data.forEach(function (result) {
                            that.changeTheDom(staticID, result);
                        });
                    });
                }
                else {
                    that.echartFactory.FaceSocketID = null;
                }
            });
        };
        statisticController.prototype.changeTheDom = function (staticID, socketData) {
            var imageNode = "";
            var imageSrc = "";
            if (socketData && socketData.plateNumber) {
                imageSrc = socketData.panoramaImage;
                imageNode = "<div style=\"display: none\" class=\"m-new-border statistic-message\">\n                                   <img src=\"" + socketData.panoramaImage + "\" class=\"m-image-margin\"/>\n                                   <span class=\"m-image-text\">" + socketData.plateNumber + "</span></div>";
            }
            else {
                var link = "/bigdata/images/" + socketData.FacePath;
                var Gender = socketData.Gender == "Men" ? "男" : "女";
                imageSrc = link;
                imageNode = "<div style=\"display: none\" class=\"m-new-border statistic-message\">\n                                   <img src=\"" + link + "\" class=\"m-image-margin\"/>\n                                   <span class=\"m-image-text\">" + Gender + " " + socketData.Age + "\u5C81</span></div>";
            }
            var pageImageNode = $(staticID + ' .m-image-margin') || [];
            if (pageImageNode && pageImageNode.length) {
                var ishas = false;
                for (var i = 0; i < pageImageNode.length; i++) {
                    if (pageImageNode[i].src.indexOf(imageSrc) > -1) {
                        ishas = true;
                        break;
                    }
                }
                if (!ishas) {
                    $(staticID + ' .m-loop-message').prepend(imageNode);
                }
            }
            else {
                $(staticID + ' .m-loop-message').prepend(imageNode);
            }
            var statisticEleFirst = $(staticID + ' .statistic-message:eq(0)');
            var statisticEle = $(staticID + ' .statistic-message:gt(12)');
            var statisticNum = $(staticID + ' .statistic-message');
            statisticEleFirst.slideDown(function () {
                if (statisticNum.length >= 13) {
                    statisticEle.remove();
                }
            });
        };
        statisticController.$inject = ["$scope", "$timeout", "socketFactory", "deviceSocketServer", 'userInfoCacheFactory', 'resourceRetrievalService', 'resourceService', 'echartFactory'];
        return statisticController;
    }());
    function socketStatistics_Face($scope, userInfoCacheFactory, that) {
        $scope.$on(SocketResultTypeEnum_1.SocketResultTypeEnum.SubscribeAllFaceLog, function (event, data) {
            var staticID = '#personStatistic';
            var taskInfo = {
                userID: userInfoCacheFactory.getCurrentUserId(),
                isCancel: data.isCancel,
                socketType: SocketResultTypeEnum_1.SocketResultTypeEnum.SubscribeAllFaceLog
            };
            if (that.echartFactory.FaceSocketID && data.isCancel) {
                console.log("取消订阅所有人像");
                that.SubscribeAllFaceLog(staticID, taskInfo, SocketResultTypeEnum_1.SocketResultTypeEnum.SubscribeAllFaceLog);
            }
            if (!data.isCancel) {
                console.log("订阅所有人像信息");
                that.SubscribeAllFaceLog(staticID, taskInfo, SocketResultTypeEnum_1.SocketResultTypeEnum.SubscribeAllFaceLog);
            }
            console.log(that.echartFactory.FaceSocketID, data.isCancel);
        });
    }
    function socketStatistics_Vehicle($scope, userInfoCacheFactory, that) {
        $scope.$on(SocketResultTypeEnum_1.SocketResultTypeEnum.SubscribeAllVehicleLog, function (event, data) {
            var staticID = '#carStatistic';
            var taskInfo = {
                userID: userInfoCacheFactory.getCurrentUserId(),
                isCancel: data.isCancel,
                socketType: SocketResultTypeEnum_1.SocketResultTypeEnum.SubscribeAllVehicleLog
            };
            if (that.echartFactory.CarSocketID && data.isCancel) {
                console.log("取消订阅车辆实时报警");
                that.SubscribeAllVehicleLog(staticID, taskInfo, SocketResultTypeEnum_1.SocketResultTypeEnum.SubscribeAllVehicleLog);
            }
            if (!data.isCancel) {
                console.log("订阅车辆实时信息");
                that.SubscribeAllVehicleLog(staticID, taskInfo, SocketResultTypeEnum_1.SocketResultTypeEnum.SubscribeAllVehicleLog);
            }
        });
    }
    var allStatisticController = (function (_super) {
        __extends(allStatisticController, _super);
        function allStatisticController($scope, $timeout, socketFactory, deviceSocketServer, userInfoCacheFactory, resourceRetrievalService, resourceService, echartFactory) {
            var _this = _super.call(this, $scope, $timeout, socketFactory, deviceSocketServer, userInfoCacheFactory, resourceRetrievalService, resourceService, echartFactory) || this;
            socketStatistics_Face($scope, userInfoCacheFactory, _this);
            socketStatistics_Vehicle($scope, userInfoCacheFactory, _this);
            return _this;
        }
        return allStatisticController;
    }(statisticController));
    var personStatisticController = (function (_super) {
        __extends(personStatisticController, _super);
        function personStatisticController($scope, $timeout, socketFactory, deviceSocketServer, userInfoCacheFactory, resourceRetrievalService, resourceService, echartFactory) {
            var _this = _super.call(this, $scope, $timeout, socketFactory, deviceSocketServer, userInfoCacheFactory, resourceRetrievalService, resourceService, echartFactory) || this;
            socketStatistics_Face($scope, userInfoCacheFactory, _this);
            return _this;
        }
        return personStatisticController;
    }(statisticController));
    var carStatisticController = (function (_super) {
        __extends(carStatisticController, _super);
        function carStatisticController($scope, $timeout, socketFactory, deviceSocketServer, userInfoCacheFactory, resourceRetrievalService, resourceService, echartFactory) {
            var _this = _super.call(this, $scope, $timeout, socketFactory, deviceSocketServer, userInfoCacheFactory, resourceRetrievalService, resourceService, echartFactory) || this;
            socketStatistics_Vehicle($scope, userInfoCacheFactory, _this);
            return _this;
        }
        return carStatisticController;
    }(statisticController));
    main_app_1.app.controller("allStatisticController", allStatisticController);
    main_app_1.app.controller("personStatisticController", personStatisticController);
    main_app_1.app.controller("carStatisticController", carStatisticController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VzL2NoYXJ0L3N0YXRpc3RpY3Mvc3RhdGlzdGljLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQVdBO1FBQUE7UUFNQSxDQUFDO1FBQUQsbUJBQUM7SUFBRCxDQU5BLEFBTUMsSUFBQTtJQU5ZLG9DQUFZO0lBUXpCO1FBT0ksNkJBQW9CLE1BQVcsRUFDbkIsUUFBYSxFQUNiLGFBQTZCLEVBQzdCLGtCQUFpQyxFQUNqQyxvQkFBeUIsRUFDekIsd0JBQW1ELEVBQ25ELGVBQWdDLEVBQ2hDLGFBQTZCO1lBUHJCLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDbkIsYUFBUSxHQUFSLFFBQVEsQ0FBSztZQUNiLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtZQUM3Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQWU7WUFDakMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFLO1lBQ3pCLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMkI7WUFDbkQsb0JBQWUsR0FBZixlQUFlLENBQWlCO1lBQ2hDLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtZQVp6QyxlQUFVLEdBQWUsRUFBRSxDQUFDO1lBQzVCLGtCQUFhLEdBQWUsRUFBRSxDQUFDO1lBYzNCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsQ0FBQztRQUdELHdDQUFVLEdBQVY7WUFDSSxJQUFJLElBQUksR0FBd0IsSUFBSSxDQUFDO1lBQ3JDLElBQUksS0FBSyxHQUFRO2dCQUNiLFdBQVcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUM7Z0JBQzlELFNBQVMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUM7Z0JBQ2pELGFBQWEsRUFBRSxDQUFDLGtDQUFrQyxDQUFDO2dCQUNuRCxhQUFhLEVBQUUsQ0FBQztnQkFD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QVcsRUFDbkIsUUFBYSxFQUNiLGFBQTZCLEVBQzdCLGtCQUFpQyxFQUNqQyxvQkFBeUIsRUFDekIsd0JBQW1ELEVBQ25ELGVBQWdDLEVBQ2hDLGFBQTZCO1lBUGpDLFlBU0ksa0JBQU0sTUFBTSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsb0JBQW9CLEVBQUUsd0JBQXdCLEVBQUUsZUFBZSxFQUFFLGFBQWEsQ0FBQyxTQUc3STtZQURHLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxvQkFBb0IsRUFBRSxLQUFJLENBQUMsQ0FBQTs7UUFDN0QsQ0FBQztRQUNMLGdDQUFDO0lBQUQsQ0FkQSxBQWNDLENBZHVDLG1CQUFtQixHQWMxRDtJQUVEO1FBQXFDLDBDQUFtQjtRQUNwRCxnQ0FBWSxNQUFXLEVBQ25CLFFBQWEsRUFDYixhQUE2QixFQUM3QixrQkFBaUMsRUFDakMsb0JBQXlCLEVBQ3pCLHdCQUFtRCxFQUNuRCxlQUFnQyxFQUNoQyxhQUE2QjtZQVBqQyxZQVNJLGtCQUFNLE1BQU0sRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLGtCQUFrQixFQUFFLG9CQUFvQixFQUFFLHdCQUF3QixFQUFFLGVBQWUsRUFBRSxhQUFhLENBQUMsU0FHN0k7WUFERyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsb0JBQW9CLEVBQUUsS0FBSSxDQUFDLENBQUE7O1FBQ2hFLENBQUM7UUFDTCw2QkFBQztJQUFELENBZEEsQUFjQyxDQWRvQyxtQkFBbUIsR0FjdkQ7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLHdCQUF3QixFQUFFLHNCQUFzQixDQUFDLENBQUM7SUFDakUsY0FBRyxDQUFDLFVBQVUsQ0FBQywyQkFBMkIsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO0lBQ3ZFLGNBQUcsQ0FBQyxVQUFVLENBQUMsd0JBQXdCLEVBQUUsc0JBQXNCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvcmVzb3VyY2VzL2NoYXJ0L3N0YXRpc3RpY3Mvc3RhdGlzdGljLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhcHAgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgeyBSZXNwb25zZVJlc3VsdCB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHsgU29ja2V0UmVzdWx0VHlwZUVudW0gfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9zZXJ2ZXIvZW51bS9Tb2NrZXRSZXN1bHRUeXBlRW51bVwiO1xyXG5pbXBvcnQgeyBJU29ja2V0RmFjdG9yeSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZmFjdG9yeS9zb2NrZXQuZmFjdG9yeVwiO1xyXG5pbXBvcnQgeyBJZGV2aWNlU29ja2V0IH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9kZXZpY2VTb2NrZXQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBJUmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9yZXNvdXJjZVJldHJpZXZhbC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IHJlc291cmNlU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvcmVzb3VyY2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBJRWNoYXJ0RmFjdG9yeSB9IGZyb20gXCIuLi9lY2hhcnRGYWN0b3J5XCI7XHJcbmltcG9ydCBcIm1vbWVudFwiO1xyXG5cclxuZGVjbGFyZSBsZXQgJDogYW55LCBtb21lbnQ6IGFueTtcclxuZXhwb3J0IGNsYXNzIHNvY2tldFBhcmFtcyB7XHJcbiAgICB1c2VySUQ6IHN0cmluZztcclxuICAgIG9iamVjdElEOiBBcnJheTxzdHJpbmc+O1xyXG4gICAgaXNDYW5jZWw6IGJvb2xlYW47XHJcbiAgICBzb2NrZXRUeXBlOiBzdHJpbmc7XHJcbiAgICBhbGFybVR5cGU6IHN0cmluZztcclxufVxyXG5cclxuY2xhc3Mgc3RhdGlzdGljQ29udHJvbGxlciB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFtcIiRzY29wZVwiLCBcIiR0aW1lb3V0XCIsIFwic29ja2V0RmFjdG9yeVwiLCBcImRldmljZVNvY2tldFNlcnZlclwiLCAndXNlckluZm9DYWNoZUZhY3RvcnknLCAncmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlJywgJ3Jlc291cmNlU2VydmljZScsICdlY2hhcnRGYWN0b3J5J107XHJcbiAgICBDYXJBbGxEYXRhOiBBcnJheTxhbnk+ID0gW107XHJcbiAgICBQZXJzb25BbGxEYXRhOiBBcnJheTxhbnk+ID0gW107XHJcbiAgICAvLyBGYWNlU29ja2V0SUQ6IG51bWJlcjtcclxuICAgIC8vIENhclNvY2tldElEOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSxcclxuICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBzb2NrZXRGYWN0b3J5OiBJU29ja2V0RmFjdG9yeSxcclxuICAgICAgICBwcml2YXRlIGRldmljZVNvY2tldFNlcnZlcjogSWRldmljZVNvY2tldCxcclxuICAgICAgICBwcml2YXRlIHVzZXJJbmZvQ2FjaGVGYWN0b3J5OiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSByZXNvdXJjZVJldHJpZXZhbFNlcnZpY2U6IElSZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSByZXNvdXJjZVNlcnZpY2U6IHJlc291cmNlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGVjaGFydEZhY3Rvcnk6IElFY2hhcnRGYWN0b3J5XHJcbiAgICApIHtcclxuICAgICAgICAvLyDojrflj5bljoblj7LmipPmi43lrp7ml7bmlbDmja5cclxuICAgICAgICB0aGlzLkNhckhpc3RvcnkoKTtcclxuICAgICAgICB0aGlzLkZhY2VIaXN0b3J5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6L2m6L6G5oqT5ouN5Y6G5Y+y5pWw5o2u6I635Y+WXHJcbiAgICBDYXJIaXN0b3J5KCkge1xyXG4gICAgICAgIGxldCB0aGF0OiBzdGF0aXN0aWNDb250cm9sbGVyID0gdGhpcztcclxuICAgICAgICBsZXQgcGFyYW06IGFueSA9IHtcclxuICAgICAgICAgICAgXCJzdGFydFRpbWVcIjogbW9tZW50KCkuc3VidHJhY3QoKS5mb3JtYXQoXCJZWVlZLU1NLUREIGhoOm1tOnNzXCIpLFxyXG4gICAgICAgICAgICBcImVuZFRpbWVcIjogbW9tZW50KCkuZm9ybWF0KFwiWVlZWS1NTS1ERCBoaDptbTpzc1wiKSxcclxuICAgICAgICAgICAgXCJhcnJPYmplY3RJRFwiOiBbXCJmNDcwZjNlMzg1NDM0ZjRkYTc2Yjc3Mjk3ODg4MTcwMlwiXSxcclxuICAgICAgICAgICAgXCJjdXJyZW50UGFnZVwiOiAxLFxyXG4gICAgICAgICAgICBcInBhZ2VTaXplXCI6IDEyXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5hZHZhbmNlZFNlYXJjaEJ5Q2FyRXgocGFyYW0pLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT095oqT5ouN6L2m6L6GXCIpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyDkurrohLjmipPmi43ljoblj7LmlbDmja7ojrflj5ZcclxuICAgIEZhY2VIaXN0b3J5KCkge1xyXG4gICAgICAgIGxldCB0aGF0OiBzdGF0aXN0aWNDb250cm9sbGVyID0gdGhpcztcclxuICAgICAgICBsZXQgcGFyYW06IGFueSA9IHtcclxuICAgICAgICAgICAgXCJzdGFydFRpbWVcIjogbW9tZW50KCkuc3VidHJhY3QoMSwgXCJtb250aFwiKS5mb3JtYXQoXCJZWVlZLU1NLUREIGhoOm1tOnNzXCIpLFxyXG4gICAgICAgICAgICBcImVuZFRpbWVcIjogbW9tZW50KCkuZm9ybWF0KFwiWVlZWS1NTS1ERCBoaDptbTpzc1wiKSxcclxuICAgICAgICAgICAgXCJhcnJDYW1lcmFJZFwiOiBbXCI3ODdmN2U4MTVhMjI0ZmU4OWUzNjkyNDBlNTQ3NzdiYVwiXSxcclxuICAgICAgICAgICAgXCJjdXJyZW50UGFnZVwiOiAxLFxyXG4gICAgICAgICAgICBcInBhZ2VTaXplXCI6IDEyXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGF0LnJlc291cmNlUmV0cmlldmFsU2VydmljZS5hZHZhbmNlZFNlYXJjaEJ5RmFjZShwYXJhbSkudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5kYXRhICYmIHJlcy5kYXRhLkZhY2UuUmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXMuZGF0YS5GYWNlLlJlc3VsdC5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5QZXJzb25BbGxEYXRhLmxlbmd0aCA8PSAxMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlBlcnNvbkFsbERhdGEucHVzaChpdGVtLkFjY2Vzc0xvZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy/orqLpmIXlhajpg6jovabovoZcclxuICAgIHB1YmxpYyBTdWJzY3JpYmVBbGxWZWhpY2xlTG9nKHN0YXRpY0lEOiBzdHJpbmcsIHRhc2tBbGFybTogYW55LCBzdWJOYW1lPzogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHRoYXQ6IHN0YXRpc3RpY0NvbnRyb2xsZXIgPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGF0LmRldmljZVNvY2tldFNlcnZlci5zdWJzY3JpYmVJbmZvKHRhc2tBbGFybSkudGhlbigocmVzOiBSZXNwb25zZVJlc3VsdDxhbnk+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLm1lc3NhZ2UgPT0gc3ViTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgcmVzLmRhdGEuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuQ2FyQWxsRGF0YS5sZW5ndGggPD0gMTIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DYXJBbGxEYXRhLnB1c2goaXRlbS5yZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghdGFza0FsYXJtLmlzQ2FuY2VsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVjaGFydEZhY3RvcnkuQ2FyU29ja2V0SUQgPSB0aGF0LnNvY2tldEZhY3Rvcnkuc3Vic2NyaWJlKHN1Yk5hbWUsIChkYXRhOiBBcnJheTxhbnk+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jaGFuZ2VUaGVEb20oc3RhdGljSUQsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZWNoYXJ0RmFjdG9yeS5DYXJTb2NrZXRJRCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8v6K6i6ZiF5YWo6YOo5Lq65YOPXHJcbiAgICBwdWJsaWMgU3Vic2NyaWJlQWxsRmFjZUxvZyhzdGF0aWNJRDogc3RyaW5nLCB0YXNrQWxhcm06IGFueSwgc3ViTmFtZT86IHN0cmluZykge1xyXG4gICAgICAgIGxldCB0aGF0OiBhbnkgPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGF0LmRldmljZVNvY2tldFNlcnZlci5zdWJzY3JpYmVJbmZvKHRhc2tBbGFybSkudGhlbigocmVzOiBSZXNwb25zZVJlc3VsdDxhbnk+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLm1lc3NhZ2UgPT0gc3ViTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgcmVzLmRhdGEuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuUGVyc29uQWxsRGF0YS5sZW5ndGggPD0gMTIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5QZXJzb25BbGxEYXRhLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCF0YXNrQWxhcm0uaXNDYW5jZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZWNoYXJ0RmFjdG9yeS5GYWNlU29ja2V0SUQgPSB0aGF0LnNvY2tldEZhY3Rvcnkuc3Vic2NyaWJlKHN1Yk5hbWUsIChkYXRhOiBBcnJheTxhbnk+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jaGFuZ2VUaGVEb20oc3RhdGljSUQsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZWNoYXJ0RmFjdG9yeS5GYWNlU29ja2V0SUQgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyDlrp7ml7bmmL7npLpzb2NrZXTov5Tlm57nmoTlm77niYdcclxuICAgIHByaXZhdGUgY2hhbmdlVGhlRG9tKHN0YXRpY0lEOiBzdHJpbmcsIHNvY2tldERhdGE6IGFueSkge1xyXG4gICAgICAgIGxldCBpbWFnZU5vZGU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgbGV0IGltYWdlU3JjOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIGlmIChzb2NrZXREYXRhICYmIHNvY2tldERhdGEucGxhdGVOdW1iZXIpIHtcclxuICAgICAgICAgICAgaW1hZ2VTcmMgPSBzb2NrZXREYXRhLnBhbm9yYW1hSW1hZ2U7XHJcbiAgICAgICAgICAgIGltYWdlTm9kZSA9IGA8ZGl2IHN0eWxlPVwiZGlzcGxheTogbm9uZVwiIGNsYXNzPVwibS1uZXctYm9yZGVyIHN0YXRpc3RpYy1tZXNzYWdlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke3NvY2tldERhdGEucGFub3JhbWFJbWFnZX1cIiBjbGFzcz1cIm0taW1hZ2UtbWFyZ2luXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibS1pbWFnZS10ZXh0XCI+JHtzb2NrZXREYXRhLnBsYXRlTnVtYmVyfTwvc3Bhbj48L2Rpdj5gO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBsaW5rOiBzdHJpbmcgPSBgL2JpZ2RhdGEvaW1hZ2VzLyR7c29ja2V0RGF0YS5GYWNlUGF0aH1gO1xyXG4gICAgICAgICAgICBsZXQgR2VuZGVyOiBzdHJpbmcgPSBzb2NrZXREYXRhLkdlbmRlciA9PSBcIk1lblwiID8gXCLnlLdcIiA6IFwi5aWzXCI7XHJcblxyXG4gICAgICAgICAgICBpbWFnZVNyYyA9IGxpbms7XHJcbiAgICAgICAgICAgIGltYWdlTm9kZSA9IGA8ZGl2IHN0eWxlPVwiZGlzcGxheTogbm9uZVwiIGNsYXNzPVwibS1uZXctYm9yZGVyIHN0YXRpc3RpYy1tZXNzYWdlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke2xpbmt9XCIgY2xhc3M9XCJtLWltYWdlLW1hcmdpblwiLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm0taW1hZ2UtdGV4dFwiPiR7R2VuZGVyfSAke3NvY2tldERhdGEuQWdlfeWygTwvc3Bhbj48L2Rpdj5gO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDljrvph41cclxuICAgICAgICBsZXQgcGFnZUltYWdlTm9kZTogYW55ID0gJChzdGF0aWNJRCArICcgLm0taW1hZ2UtbWFyZ2luJykgfHwgW107XHJcblxyXG4gICAgICAgIGlmIChwYWdlSW1hZ2VOb2RlICYmIHBhZ2VJbWFnZU5vZGUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGxldCBpc2hhczogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhZ2VJbWFnZU5vZGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChwYWdlSW1hZ2VOb2RlW2ldLnNyYy5pbmRleE9mKGltYWdlU3JjKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNoYXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNoYXMpIHtcclxuICAgICAgICAgICAgICAgICQoc3RhdGljSUQgKyAnIC5tLWxvb3AtbWVzc2FnZScpLnByZXBlbmQoaW1hZ2VOb2RlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKHN0YXRpY0lEICsgJyAubS1sb29wLW1lc3NhZ2UnKS5wcmVwZW5kKGltYWdlTm9kZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc3RhdGlzdGljRWxlRmlyc3QgPSAkKHN0YXRpY0lEICsgJyAuc3RhdGlzdGljLW1lc3NhZ2U6ZXEoMCknKSBhcyBhbnk7XHJcbiAgICAgICAgbGV0IHN0YXRpc3RpY0VsZSA9ICQoc3RhdGljSUQgKyAnIC5zdGF0aXN0aWMtbWVzc2FnZTpndCgxMiknKSBhcyBhbnk7XHJcbiAgICAgICAgbGV0IHN0YXRpc3RpY051bSA9ICQoc3RhdGljSUQgKyAnIC5zdGF0aXN0aWMtbWVzc2FnZScpIGFzIGFueTtcclxuXHJcbiAgICAgICAgc3RhdGlzdGljRWxlRmlyc3Quc2xpZGVEb3duKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHN0YXRpc3RpY051bS5sZW5ndGggPj0gMTMpIHtcclxuICAgICAgICAgICAgICAgIHN0YXRpc3RpY0VsZS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyDorqLpmIXmiYDmnInkurrlg49cclxuZnVuY3Rpb24gc29ja2V0U3RhdGlzdGljc19GYWNlKCRzY29wZTogYW55LCB1c2VySW5mb0NhY2hlRmFjdG9yeTogYW55LCB0aGF0OiBhbnkpIHtcclxuICAgICRzY29wZS4kb24oU29ja2V0UmVzdWx0VHlwZUVudW0uU3Vic2NyaWJlQWxsRmFjZUxvZywgKGV2ZW50OiBhbnksIGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgIGxldCBzdGF0aWNJRDogc3RyaW5nID0gJyNwZXJzb25TdGF0aXN0aWMnO1xyXG4gICAgICAgIGxldCB0YXNrSW5mbyA9IHtcclxuICAgICAgICAgICAgdXNlcklEOiB1c2VySW5mb0NhY2hlRmFjdG9yeS5nZXRDdXJyZW50VXNlcklkKCksXHJcbiAgICAgICAgICAgIGlzQ2FuY2VsOiBkYXRhLmlzQ2FuY2VsLFxyXG4gICAgICAgICAgICBzb2NrZXRUeXBlOiBTb2NrZXRSZXN1bHRUeXBlRW51bS5TdWJzY3JpYmVBbGxGYWNlTG9nXHJcbiAgICAgICAgfSBhcyBzb2NrZXRQYXJhbXM7XHJcblxyXG4gICAgICAgIGlmICh0aGF0LmVjaGFydEZhY3RvcnkuRmFjZVNvY2tldElEICYmIGRhdGEuaXNDYW5jZWwpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLlj5bmtojorqLpmIXmiYDmnInkurrlg49cIik7XHJcbiAgICAgICAgICAgIHRoYXQuU3Vic2NyaWJlQWxsRmFjZUxvZyhzdGF0aWNJRCwgdGFza0luZm8sIFNvY2tldFJlc3VsdFR5cGVFbnVtLlN1YnNjcmliZUFsbEZhY2VMb2cpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFkYXRhLmlzQ2FuY2VsKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6K6i6ZiF5omA5pyJ5Lq65YOP5L+h5oGvXCIpO1xyXG4gICAgICAgICAgICB0aGF0LlN1YnNjcmliZUFsbEZhY2VMb2coc3RhdGljSUQsIHRhc2tJbmZvLCBTb2NrZXRSZXN1bHRUeXBlRW51bS5TdWJzY3JpYmVBbGxGYWNlTG9nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoYXQuZWNoYXJ0RmFjdG9yeS5GYWNlU29ja2V0SUQsIGRhdGEuaXNDYW5jZWwpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vIOiuoumYheaJgOaciei9pui+hlxyXG5mdW5jdGlvbiBzb2NrZXRTdGF0aXN0aWNzX1ZlaGljbGUoJHNjb3BlOiBhbnksIHVzZXJJbmZvQ2FjaGVGYWN0b3J5OiBhbnksIHRoYXQ6IGFueSkge1xyXG4gICAgJHNjb3BlLiRvbihTb2NrZXRSZXN1bHRUeXBlRW51bS5TdWJzY3JpYmVBbGxWZWhpY2xlTG9nLCAoZXZlbnQ6IGFueSwgZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgbGV0IHN0YXRpY0lEOiBzdHJpbmcgPSAnI2NhclN0YXRpc3RpYyc7XHJcbiAgICAgICAgbGV0IHRhc2tJbmZvID0ge1xyXG4gICAgICAgICAgICB1c2VySUQ6IHVzZXJJbmZvQ2FjaGVGYWN0b3J5LmdldEN1cnJlbnRVc2VySWQoKSxcclxuICAgICAgICAgICAgaXNDYW5jZWw6IGRhdGEuaXNDYW5jZWwsXHJcbiAgICAgICAgICAgIHNvY2tldFR5cGU6IFNvY2tldFJlc3VsdFR5cGVFbnVtLlN1YnNjcmliZUFsbFZlaGljbGVMb2dcclxuICAgICAgICB9IGFzIHNvY2tldFBhcmFtcztcclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhhdC5DYXJTb2NrZXRJRCwgZGF0YS5pc0NhbmNlbCk7XHJcbiAgICAgICAgaWYgKHRoYXQuZWNoYXJ0RmFjdG9yeS5DYXJTb2NrZXRJRCAmJiBkYXRhLmlzQ2FuY2VsKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Y+W5raI6K6i6ZiF6L2m6L6G5a6e5pe25oql6K2mXCIpO1xyXG4gICAgICAgICAgICB0aGF0LlN1YnNjcmliZUFsbFZlaGljbGVMb2coc3RhdGljSUQsIHRhc2tJbmZvLCBTb2NrZXRSZXN1bHRUeXBlRW51bS5TdWJzY3JpYmVBbGxWZWhpY2xlTG9nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFkYXRhLmlzQ2FuY2VsKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6K6i6ZiF6L2m6L6G5a6e5pe25L+h5oGvXCIpO1xyXG4gICAgICAgICAgICB0aGF0LlN1YnNjcmliZUFsbFZlaGljbGVMb2coc3RhdGljSUQsIHRhc2tJbmZvLCBTb2NrZXRSZXN1bHRUeXBlRW51bS5TdWJzY3JpYmVBbGxWZWhpY2xlTG9nKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuY2xhc3MgYWxsU3RhdGlzdGljQ29udHJvbGxlciBleHRlbmRzIHN0YXRpc3RpY0NvbnRyb2xsZXIge1xyXG4gICAgY29uc3RydWN0b3IoJHNjb3BlOiBhbnksXHJcbiAgICAgICAgJHRpbWVvdXQ6IGFueSxcclxuICAgICAgICBzb2NrZXRGYWN0b3J5OiBJU29ja2V0RmFjdG9yeSxcclxuICAgICAgICBkZXZpY2VTb2NrZXRTZXJ2ZXI6IElkZXZpY2VTb2NrZXQsXHJcbiAgICAgICAgdXNlckluZm9DYWNoZUZhY3Rvcnk6IGFueSxcclxuICAgICAgICByZXNvdXJjZVJldHJpZXZhbFNlcnZpY2U6IElSZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UsXHJcbiAgICAgICAgcmVzb3VyY2VTZXJ2aWNlOiByZXNvdXJjZVNlcnZpY2UsXHJcbiAgICAgICAgZWNoYXJ0RmFjdG9yeTogSUVjaGFydEZhY3RvcnlcclxuICAgICkge1xyXG4gICAgICAgIHN1cGVyKCRzY29wZSwgJHRpbWVvdXQsIHNvY2tldEZhY3RvcnksIGRldmljZVNvY2tldFNlcnZlciwgdXNlckluZm9DYWNoZUZhY3RvcnksIHJlc291cmNlUmV0cmlldmFsU2VydmljZSwgcmVzb3VyY2VTZXJ2aWNlLCBlY2hhcnRGYWN0b3J5KTtcclxuXHJcbiAgICAgICAgc29ja2V0U3RhdGlzdGljc19GYWNlKCRzY29wZSwgdXNlckluZm9DYWNoZUZhY3RvcnksIHRoaXMpO1xyXG4gICAgICAgIHNvY2tldFN0YXRpc3RpY3NfVmVoaWNsZSgkc2NvcGUsIHVzZXJJbmZvQ2FjaGVGYWN0b3J5LCB0aGlzKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmNsYXNzIHBlcnNvblN0YXRpc3RpY0NvbnRyb2xsZXIgZXh0ZW5kcyBzdGF0aXN0aWNDb250cm9sbGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCRzY29wZTogYW55LFxyXG4gICAgICAgICR0aW1lb3V0OiBhbnksXHJcbiAgICAgICAgc29ja2V0RmFjdG9yeTogSVNvY2tldEZhY3RvcnksXHJcbiAgICAgICAgZGV2aWNlU29ja2V0U2VydmVyOiBJZGV2aWNlU29ja2V0LFxyXG4gICAgICAgIHVzZXJJbmZvQ2FjaGVGYWN0b3J5OiBhbnksXHJcbiAgICAgICAgcmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlOiBJUmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLFxyXG4gICAgICAgIHJlc291cmNlU2VydmljZTogcmVzb3VyY2VTZXJ2aWNlLFxyXG4gICAgICAgIGVjaGFydEZhY3Rvcnk6IElFY2hhcnRGYWN0b3J5XHJcbiAgICApIHtcclxuICAgICAgICBzdXBlcigkc2NvcGUsICR0aW1lb3V0LCBzb2NrZXRGYWN0b3J5LCBkZXZpY2VTb2NrZXRTZXJ2ZXIsIHVzZXJJbmZvQ2FjaGVGYWN0b3J5LCByZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UsIHJlc291cmNlU2VydmljZSwgZWNoYXJ0RmFjdG9yeSk7XHJcblxyXG4gICAgICAgIHNvY2tldFN0YXRpc3RpY3NfRmFjZSgkc2NvcGUsIHVzZXJJbmZvQ2FjaGVGYWN0b3J5LCB0aGlzKVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBjYXJTdGF0aXN0aWNDb250cm9sbGVyIGV4dGVuZHMgc3RhdGlzdGljQ29udHJvbGxlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGU6IGFueSxcclxuICAgICAgICAkdGltZW91dDogYW55LFxyXG4gICAgICAgIHNvY2tldEZhY3Rvcnk6IElTb2NrZXRGYWN0b3J5LFxyXG4gICAgICAgIGRldmljZVNvY2tldFNlcnZlcjogSWRldmljZVNvY2tldCxcclxuICAgICAgICB1c2VySW5mb0NhY2hlRmFjdG9yeTogYW55LFxyXG4gICAgICAgIHJlc291cmNlUmV0cmlldmFsU2VydmljZTogSVJlc291cmNlUmV0cmlldmFsU2VydmljZSxcclxuICAgICAgICByZXNvdXJjZVNlcnZpY2U6IHJlc291cmNlU2VydmljZSxcclxuICAgICAgICBlY2hhcnRGYWN0b3J5OiBJRWNoYXJ0RmFjdG9yeVxyXG4gICAgKSB7XHJcbiAgICAgICAgc3VwZXIoJHNjb3BlLCAkdGltZW91dCwgc29ja2V0RmFjdG9yeSwgZGV2aWNlU29ja2V0U2VydmVyLCB1c2VySW5mb0NhY2hlRmFjdG9yeSwgcmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLCByZXNvdXJjZVNlcnZpY2UsIGVjaGFydEZhY3RvcnkpO1xyXG5cclxuICAgICAgICBzb2NrZXRTdGF0aXN0aWNzX1ZlaGljbGUoJHNjb3BlLCB1c2VySW5mb0NhY2hlRmFjdG9yeSwgdGhpcylcclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoXCJhbGxTdGF0aXN0aWNDb250cm9sbGVyXCIsIGFsbFN0YXRpc3RpY0NvbnRyb2xsZXIpO1xyXG5hcHAuY29udHJvbGxlcihcInBlcnNvblN0YXRpc3RpY0NvbnRyb2xsZXJcIiwgcGVyc29uU3RhdGlzdGljQ29udHJvbGxlcik7XHJcbmFwcC5jb250cm9sbGVyKFwiY2FyU3RhdGlzdGljQ29udHJvbGxlclwiLCBjYXJTdGF0aXN0aWNDb250cm9sbGVyKTtcclxuXHJcblxyXG5cclxuIl19
