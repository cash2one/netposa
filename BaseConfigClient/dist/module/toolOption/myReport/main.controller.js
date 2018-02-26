define(["require", "exports", "../../common/app/main.app", "../../common/directive/page/page-params", "../../../core/enum/ObjectType", "../../../core/server/enum/CollectDataType", "css!./style/report.css", "../../common/services/task.service", "../../common/services/myAlarm.service", "./myReport.cache.factory", "../../common/services/resourceRetrieval.service", "../../common/factory/layerMsg.factory", "../../common/popup/alarmFacePopup/alarm.face.popup.factory", "../../common/fullImagePopup/fullImagePopup.factory", "moment"], function (require, exports, main_app_1, page_params_1, ObjectType_1, CollectDataType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MyReportEnum = [
        {
            index: 0,
            value: null,
            text: "全部"
        },
        {
            index: 1,
            value: ObjectType_1.ObjectType.Camera.value,
            text: "人员报警"
        },
        {
            index: 3,
            text: "车辆报警",
            value: ObjectType_1.ObjectType.Vehicle.value,
        },
        {
            index: 4,
            value: "MAC",
            text: "MAC报警"
        }
    ];
    var MyReportController = (function () {
        function MyReportController($scope, taskService, myAlarmService, $q, myReportFactory, $timeout, resourceRetrievalService, layerDec, commonAlarmFacePopup, commonFullImagePopup, userInfoCacheFactory) {
            var _this = this;
            this.$scope = $scope;
            this.taskService = taskService;
            this.myAlarmService = myAlarmService;
            this.$q = $q;
            this.myReportFactory = myReportFactory;
            this.$timeout = $timeout;
            this.resourceRetrievalService = resourceRetrievalService;
            this.layerDec = layerDec;
            this.commonAlarmFacePopup = commonAlarmFacePopup;
            this.commonFullImagePopup = commonFullImagePopup;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.ButtonList = MyReportEnum;
            this.selectedIndex = MyReportEnum[0].index;
            this.allReportPage = '../module/toolOption/myReport/myReportPage/allReportPage.html?v=' + new Date().getTime();
            this.searchAlarmParams = {};
            this.pageParams = new page_params_1.default(1, 100);
            this.searchAlarmParams.pageSize = this.pageParams.pageSize;
            this.searchAlarmParams.currentPage = this.pageParams.currentPage;
            this.search();
            this.$scope.$on("$destroy", function () {
                _this.myReportFactory.clearDatas();
            });
        }
        MyReportController.prototype.changeIndex = function (data) {
            if (data.index === this.selectedIndex) {
                return;
            }
            this.selectedIndex = data.index;
            this.searchByObjectType(data.value);
        };
        MyReportController.prototype.expanderMore = function (data) {
            data.isExpand = true;
        };
        MyReportController.prototype.isMacType = function (val) {
            return ObjectType_1.IsMacType(val);
        };
        MyReportController.prototype.isVehicleType = function (val) {
            return val == "Car";
        };
        MyReportController.prototype.isFaceType = function (val) {
            return val === ObjectType_1.ObjectType.Camera.value;
        };
        MyReportController.prototype.search = function () {
            this.myReportFactory.clearDatas();
            this.searchAlarmParams.currentPage = 1;
            this._search();
        };
        MyReportController.prototype.showAlarmFacePopup = function (item) {
            this.commonAlarmFacePopup.showPopup(this.$scope, item);
        };
        MyReportController.prototype._search = function () {
            var _this = this;
            this.taskService.getAlarmTaskIds().then(function (res) {
                var arr = (res && res.data) || [];
                _this.searchAlarmParams.arrStructureTaskId = arr;
                _this.searchAlarmParams.startTime = moment().subtract(10, 'days').format("YYYY-MM-DD 00:00:00");
                _this.searchAlarmParams.endTime = moment().format("YYYY-MM-DD 23:59:59");
                if (!_this.searchAlarmParams.objectType) {
                    _this.searchAlarmParams.objectType = ['Car', 'Camera', 'WiFi', 'EFENCE'];
                }
                return _this.myAlarmService.getMyAlarmList(_this.searchAlarmParams);
            }).then(function (res) {
                console.log(res, "==============================");
                if (res && res.data && res.code === 200) {
                    _this.pageParams.currentPage = _this.searchAlarmParams.currentPage;
                    _this.pageParams.setTotalCount(res.data.TotalCount || 0);
                    _this.myReportFactory.cacheDatas(res.data.Result || []);
                }
                else if (res && res.code == 200) {
                    _this.pageParams.currentPage = _this.searchAlarmParams.currentPage;
                    _this.pageParams.setTotalCount(0);
                    _this.myReportFactory.cacheDatas([]);
                }
                else {
                    return _this.$q.reject(null);
                }
            }).then(function () {
                var result = _this.myReportFactory.getDatas();
                _this.isShowMoreBtn();
                console.debug("拿到的数据为", result);
                _this.$timeout(function () {
                    _this.alarmDatas = result;
                });
            });
        };
        MyReportController.prototype.getMoreAlarm = function () {
            this.searchAlarmParams.currentPage = this.pageParams.currentPage + 1;
            this._search();
        };
        MyReportController.prototype.attention = function (data) {
            if (data.Collected) {
                this.layerDec.failInfo("此报警已收藏");
                return;
            }
            var params = {
                json: angular.toJson(data),
                objectID: data.AlarmLog.ID,
                objectType: data.AlarmLog.ObjectType,
                userId: this.userInfoCacheFactory.getCurrentUserId(),
                dataType: CollectDataType_1.CollectDataType.Collection.value
            };
            console.log(data);
            this.resourceRetrievalService.collectAddInfo(params).then(function (str) {
                if (str) {
                    data.Collected = true;
                }
            });
        };
        MyReportController.prototype.fullScreen = function (imgUrl, event) {
            event.stopPropagation();
            console.log(imgUrl);
            this.commonFullImagePopup.showPopup(this.$scope, imgUrl);
        };
        MyReportController.prototype.getValueByTimeKey = function (timeKey, paramName) {
            var arr = timeKey.split("-");
            var result = "";
            switch (paramName) {
                case "yyyy":
                    result = arr[0];
                    break;
                case "MM":
                    result = arr[1];
                    break;
                case "dd":
                    result = arr[2];
                    break;
            }
            return result;
        };
        MyReportController.prototype.isShowMoreBtn = function () {
            console.debug("isShowMoreBtn");
            var currentIndex = this.pageParams.currentPage;
            var pageCount = this.pageParams.pageCount;
            if (currentIndex >= pageCount) {
                this.moreBtn = false;
            }
            else {
                this.moreBtn = true;
            }
        };
        MyReportController.prototype.searchByObjectType = function (objectType) {
            var _objectType = [];
            if (objectType === "MAC") {
                _objectType.push(ObjectType_1.ObjectType.Wifi.value);
                _objectType.push(ObjectType_1.ObjectType.ElectronicFence.value);
            }
            else if (objectType === "Vehicle") {
                _objectType.push("Car");
            }
            else if (objectType != null) {
                _objectType.push(objectType);
            }
            else {
                _objectType = null;
            }
            this.searchAlarmParams.objectType = _objectType;
            this.myReportFactory.clearDatas();
            this.pageParams.setCurrentPage(1);
            this.searchAlarmParams.currentPage = 1;
            this._search();
        };
        MyReportController.$inject = ['$scope', 'taskService', 'myAlarmService', '$q', "myReportFactory",
            "$timeout", "resourceRetrievalService", "layerDec", "commonAlarmFacePopup",
            "commonFullImagePopup", "userInfoCacheFactory"];
        return MyReportController;
    }());
    main_app_1.app
        .controller('MyReportController', MyReportController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvdG9vbE9wdGlvbi9teVJlcG9ydC9tYWluLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBbUNBLElBQU0sWUFBWSxHQUFHO1FBQ2pCO1lBQ0ksS0FBSyxFQUFFLENBQUM7WUFDUixLQUFLLEVBQUUsSUFBSTtZQUNYLElBQUksRUFBRSxJQUFJO1NBQ2I7UUFDRDtZQUNJLEtBQUssRUFBRSxDQUFDO1lBQ1IsS0FBSyxFQUFFLHVCQUFVLENBQUMsTUFBTSxDQUFDLEtBQUs7WUFDOUIsSUFBSSxFQUFFLE1BQU07U0FDZjtRQUNEO1lBQ0ksS0FBSyxFQUFFLENBQUM7WUFDUixJQUFJLEVBQUUsTUFBTTtZQUNaLEtBQUssRUFBRSx1QkFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLO1NBQ2xDO1FBQ0Q7WUFDSSxLQUFLLEVBQUUsQ0FBQztZQUNSLEtBQUssRUFBRSxLQUFLO1lBQ1osSUFBSSxFQUFFLE9BQU87U0FDaEI7S0FBQyxDQUFDO0lBRVA7UUFnQkksNEJBQW9CLE1BQW9CLEVBQzVCLFdBQXlCLEVBQ3pCLGNBQThCLEVBQzlCLEVBQU8sRUFDUCxlQUFnQyxFQUNoQyxRQUFhLEVBQ2Isd0JBQW1ELEVBQ25ELFFBQW1CLEVBQ25CLG9CQUFpRCxFQUNqRCxvQkFBaUQsRUFDakQsb0JBQTJDO1lBVnZELGlCQTBCQztZQTFCbUIsV0FBTSxHQUFOLE1BQU0sQ0FBYztZQUM1QixnQkFBVyxHQUFYLFdBQVcsQ0FBYztZQUN6QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7WUFDOUIsT0FBRSxHQUFGLEVBQUUsQ0FBSztZQUNQLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtZQUNoQyxhQUFRLEdBQVIsUUFBUSxDQUFLO1lBQ2IsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEyQjtZQUNuRCxhQUFRLEdBQVIsUUFBUSxDQUFXO1lBQ25CLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBNkI7WUFDakQseUJBQW9CLEdBQXBCLG9CQUFvQixDQUE2QjtZQUNqRCx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXVCO1lBRW5ELElBQUksQ0FBQyxVQUFVLEdBQUcsWUFBWSxDQUFDO1lBQy9CLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUMzQyxJQUFJLENBQUMsYUFBYSxHQUFHLGtFQUFrRSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFL0csSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQXVCLENBQUM7WUFDakQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLHFCQUFVLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDM0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztZQUVqRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFZCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUU7Z0JBQ3hCLEtBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDdEMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQsd0NBQVcsR0FBWCxVQUFZLElBQXNDO1lBQzlDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLE1BQU0sQ0FBQztZQUNYLENBQUM7WUFDRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFaEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QyxDQUFDO1FBRUQseUNBQVksR0FBWixVQUFhLElBQXVCO1lBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLENBQUM7UUFFRCxzQ0FBUyxHQUFULFVBQVUsR0FBVztZQUNqQixNQUFNLENBQUMsc0JBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQixDQUFDO1FBRUQsMENBQWEsR0FBYixVQUFjLEdBQVc7WUFDckIsTUFBTSxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUM7UUFDeEIsQ0FBQztRQUVELHVDQUFVLEdBQVYsVUFBVyxHQUFXO1lBQ2xCLE1BQU0sQ0FBQyxHQUFHLEtBQUssdUJBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzNDLENBQUM7UUFFRCxtQ0FBTSxHQUFOO1lBQ0ksSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkIsQ0FBQztRQUVELCtDQUFrQixHQUFsQixVQUFtQixJQUEwQjtZQUN6QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0QsQ0FBQztRQUtPLG9DQUFPLEdBQWY7WUFBQSxpQkFpQ0M7WUFoQ0csSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFrQztnQkFDdkUsSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQW1CLENBQUM7Z0JBQ25ELEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsR0FBRyxHQUFHLENBQUM7Z0JBQ2hELEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEdBQUcsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztnQkFDL0YsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sR0FBRyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztnQkFDeEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDckMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUM1RSxDQUFDO2dCQUNELE1BQU0sQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUN0RSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFxRDtnQkFDMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQTtnQkFDbEQsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUN0QyxLQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxLQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDO29CQUNqRSxLQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDeEQsS0FBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUssRUFBa0MsQ0FBQyxDQUFDO2dCQUM1RixDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNoQyxLQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxLQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDO29CQUNqRSxLQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsRUFBaUMsQ0FBQyxDQUFDO2dCQUN2RSxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUVKLE1BQU0sQ0FBQyxLQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDSixJQUFJLE1BQU0sR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUM3QyxLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3JCLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNoQyxLQUFJLENBQUMsUUFBUSxDQUFDO29CQUNWLEtBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO2dCQUM3QixDQUFDLENBQUMsQ0FBQztZQUVQLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQU1ELHlDQUFZLEdBQVo7WUFFSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztZQUNyRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkIsQ0FBQztRQUVELHNDQUFTLEdBQVQsVUFBVSxJQUEwQjtZQUNoQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2pDLE1BQU0sQ0FBQztZQUNYLENBQUM7WUFFRCxJQUFJLE1BQU0sR0FBcUI7Z0JBQzNCLElBQUksRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDMUIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDMUIsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVTtnQkFDcEMsTUFBTSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDcEQsUUFBUSxFQUFFLGlDQUFlLENBQUMsVUFBVSxDQUFDLEtBQUs7YUFDN0MsQ0FBQztZQUVGLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFbEIsSUFBSSxDQUFDLHdCQUF3QixDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFXO2dCQUNsRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUVOLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUMxQixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBS0QsdUNBQVUsR0FBVixVQUFXLE1BQWMsRUFBRSxLQUFZO1lBQ25DLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ25CLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUU3RCxDQUFDO1FBRUQsOENBQWlCLEdBQWpCLFVBQWtCLE9BQWUsRUFBRSxTQUFpQjtZQUNoRCxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNoQixNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixLQUFLLE1BQU07b0JBQ1AsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDaEIsS0FBSyxDQUFDO2dCQUNWLEtBQUssSUFBSTtvQkFDTCxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoQixLQUFLLENBQUM7Z0JBQ1YsS0FBSyxJQUFJO29CQUNMLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2hCLEtBQUssQ0FBQztZQUNkLENBQUM7WUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFHTywwQ0FBYSxHQUFyQjtZQUNJLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDL0IsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7WUFDL0MsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7WUFDMUMsRUFBRSxDQUFDLENBQUMsWUFBWSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUN4QixDQUFDO1FBQ0wsQ0FBQztRQUVPLCtDQUFrQixHQUExQixVQUEyQixVQUFrQjtZQUN6QyxJQUFJLFdBQVcsR0FBRyxFQUFtQixDQUFDO1lBQ3RDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixXQUFXLENBQUMsSUFBSSxDQUFDLHVCQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN4QyxXQUFXLENBQUMsSUFBSSxDQUFDLHVCQUFVLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZELENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUIsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDNUIsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNqQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osV0FBVyxHQUFHLElBQUksQ0FBQztZQUN2QixDQUFDO1lBQ0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUM7WUFFaEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztZQUV2QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkIsQ0FBQztRQS9NTSwwQkFBTyxHQUFHLENBQUMsUUFBUSxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsaUJBQWlCO1lBQ2hGLFVBQVUsRUFBRSwwQkFBMEIsRUFBRSxVQUFVLEVBQUUsc0JBQXNCO1lBQzFFLHNCQUFzQixFQUFFLHNCQUFzQixDQUFDLENBQUM7UUE4TXhELHlCQUFDO0tBbE5ELEFBa05DLElBQUE7SUFFRCxjQUFHO1NBQ0UsVUFBVSxDQUFDLG9CQUFvQixFQUFFLGtCQUFrQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL3Rvb2xPcHRpb24vbXlSZXBvcnQvbWFpbi5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXBwIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IFwiY3NzIS4vc3R5bGUvcmVwb3J0LmNzc1wiO1xyXG5pbXBvcnQgeyBFbnVtIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW51bS9FbnVtXCI7XHJcbmltcG9ydCB7IE1vY2tDYXIsIE1vY2tDYXJMaXN0LCBNb2NrUGVyc29uLCBNb2NrUGVyc29uTGlzdCwgTW9ja01hYywgTW9ja01hY0xpc3QgfSBmcm9tIFwiLi9yZXBvcnRUZXN0RW51bVwiO1xyXG5pbXBvcnQgeyBJVGFza1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL3Rhc2suc2VydmljZVwiO1xyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vc2VydmljZXMvdGFzay5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFJlc3BvbnNlUmVzdWx0LCBQYWdlUmVzdWx0IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdFwiO1xyXG5pbXBvcnQgeyBNeUFsYXJtU2VydmljZSB9IGZyb20gXCIuLi8uLi9jb21tb24vc2VydmljZXMvbXlBbGFybS5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9teUFsYXJtLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU2VhcmNoQWxhcm1QYXJhbXMgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvU2VhcmNoQWxhcm1QYXJhbXNcIjtcclxuaW1wb3J0IFBhZ2VQYXJhbXMgZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvcGFnZS9wYWdlLXBhcmFtc1wiO1xyXG5pbXBvcnQgeyBNeVJlcG9ydE1vY2sgfSBmcm9tICcuL215UmVwb3J0TW9jayc7XHJcbmltcG9ydCB7IE15UmVwb3J0RmFjdG9yeSwgTXlSZXBvcnRWaWV3TW9kZWwgfSBmcm9tICcuL215UmVwb3J0LmNhY2hlLmZhY3RvcnknO1xyXG5pbXBvcnQgXCIuL215UmVwb3J0LmNhY2hlLmZhY3RvcnlcIjtcclxuaW1wb3J0IHsgU2VhcmNoQWxhcm1Mb2dSZXN1bHQgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2ZXIvQWxhcm1Nb2R1bGVcIjtcclxuaW1wb3J0IHsgSXNNYWNUeXBlLCBPYmplY3RUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW51bS9PYmplY3RUeXBlXCI7XHJcbmltcG9ydCBQb3J0cmFpdFRvb2wgZnJvbSAnLi4vLi4vY29tbW9uL3BvcnRyYWl0LXRvb2wnO1xyXG5pbXBvcnQgeyBDYW1lcmEgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9DYW1lcmEnO1xyXG5pbXBvcnQgeyBXaWZpIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvV2lmaSc7XHJcbmltcG9ydCB7IElSZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL3Jlc291cmNlUmV0cmlldmFsLnNlcnZpY2VcIjtcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL3Jlc291cmNlUmV0cmlldmFsLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgSUxheWVyRGVjIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9mYWN0b3J5L2xheWVyTXNnLmZhY3RvcnlcIjtcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL2ZhY3RvcnkvbGF5ZXJNc2cuZmFjdG9yeVwiO1xyXG5pbXBvcnQgeyBDb2xsZWN0QWRkUGFyYW1zIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL0NvbGxlY3RQYXJhbXNcIjtcclxuaW1wb3J0IHsgQ29sbGVjdERhdGFUeXBlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9zZXJ2ZXIvZW51bS9Db2xsZWN0RGF0YVR5cGUnO1xyXG5pbXBvcnQgeyBNYWNNb25pdG9yIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9zZXJ2ZXIvVGFza01vZGVsJztcclxuaW1wb3J0IHsgQW5ndWxhclNjb3BlIH0gZnJvbSAnLi4vLi4vY29tbW9uL3R5cGVzL2Jhc2VBbmd1bGFyU2NvcGUnO1xyXG5pbXBvcnQgeyBDb21tb25BbGFybUZhY2VQb3B1cEZhY3RvcnkgfSBmcm9tICcuLi8uLi9jb21tb24vcG9wdXAvYWxhcm1GYWNlUG9wdXAvYWxhcm0uZmFjZS5wb3B1cC5mYWN0b3J5JztcclxuaW1wb3J0ICcuLi8uLi9jb21tb24vcG9wdXAvYWxhcm1GYWNlUG9wdXAvYWxhcm0uZmFjZS5wb3B1cC5mYWN0b3J5JztcclxuaW1wb3J0IHsgQ29tbW9uRnVsbEltYWdlUG9wdXBGYWN0b3J5IH0gZnJvbSAnLi4vLi4vY29tbW9uL2Z1bGxJbWFnZVBvcHVwL2Z1bGxJbWFnZVBvcHVwLmZhY3RvcnknO1xyXG5pbXBvcnQgJy4uLy4uL2NvbW1vbi9mdWxsSW1hZ2VQb3B1cC9mdWxsSW1hZ2VQb3B1cC5mYWN0b3J5JztcclxuaW1wb3J0IHsgSVVzZXJJbmZvQ2FjaGVGYWN0b3J5IH0gZnJvbSAnLi4vLi4vY29tbW9uL2ZhY3RvcnkvdXNlcmluZm8uY2FjaGUuZmFjdG9yeSc7XHJcbmltcG9ydCBcIm1vbWVudFwiXHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueSwgbW9tZW50OiBhbnk7XHJcblxyXG5jb25zdCBNeVJlcG9ydEVudW0gPSBbXHJcbiAgICB7XHJcbiAgICAgICAgaW5kZXg6IDAsXHJcbiAgICAgICAgdmFsdWU6IG51bGwsXHJcbiAgICAgICAgdGV4dDogXCLlhajpg6hcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBpbmRleDogMSxcclxuICAgICAgICB2YWx1ZTogT2JqZWN0VHlwZS5DYW1lcmEudmFsdWUsXHJcbiAgICAgICAgdGV4dDogXCLkurrlkZjmiqXoraZcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBpbmRleDogMyxcclxuICAgICAgICB0ZXh0OiBcIui9pui+huaKpeitplwiLFxyXG4gICAgICAgIHZhbHVlOiBPYmplY3RUeXBlLlZlaGljbGUudmFsdWUsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGluZGV4OiA0LFxyXG4gICAgICAgIHZhbHVlOiBcIk1BQ1wiLFxyXG4gICAgICAgIHRleHQ6IFwiTUFD5oql6K2mXCJcclxuICAgIH1dO1xyXG5cclxuY2xhc3MgTXlSZXBvcnRDb250cm9sbGVyIHtcclxuICAgIHNlYXJjaEFsYXJtUGFyYW1zOiBTZWFyY2hBbGFybVBhcmFtcztcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAndGFza1NlcnZpY2UnLCAnbXlBbGFybVNlcnZpY2UnLCAnJHEnLCBcIm15UmVwb3J0RmFjdG9yeVwiLFxyXG4gICAgICAgIFwiJHRpbWVvdXRcIiwgXCJyZXNvdXJjZVJldHJpZXZhbFNlcnZpY2VcIiwgXCJsYXllckRlY1wiLCBcImNvbW1vbkFsYXJtRmFjZVBvcHVwXCIsXHJcbiAgICAgICAgXCJjb21tb25GdWxsSW1hZ2VQb3B1cFwiLCBcInVzZXJJbmZvQ2FjaGVGYWN0b3J5XCJdO1xyXG4gICAgQnV0dG9uTGlzdDogQXJyYXk8RW51bT47XHJcbiAgICBzZWxlY3RlZEluZGV4OiBudW1iZXI7XHJcbiAgICBhbGxSZXBvcnRQYWdlOiBzdHJpbmc7XHJcbiAgICBwZXJzb25SZXBvcnRQYWdlOiBzdHJpbmc7XHJcbiAgICBjYXJSZXBvcnRQYWdlOiBzdHJpbmc7XHJcbiAgICBtYWNSZXBvcnRQYWdlOiBzdHJpbmc7XHJcbiAgICBhbGFybURhdGFzOiBBcnJheTxNeVJlcG9ydFZpZXdNb2RlbD47XHJcbiAgICBwcml2YXRlIHBhZ2VQYXJhbXM6IFBhZ2VQYXJhbXM7XHJcbiAgICBtb3JlQnRuOiBib29sZWFuO1xyXG5cclxuICAgIC8v5pWw5o2uXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogQW5ndWxhclNjb3BlLFxyXG4gICAgICAgIHByaXZhdGUgdGFza1NlcnZpY2U6IElUYXNrU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIG15QWxhcm1TZXJ2aWNlOiBNeUFsYXJtU2VydmljZSxcclxuICAgICAgICBwcml2YXRlICRxOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBteVJlcG9ydEZhY3Rvcnk6IE15UmVwb3J0RmFjdG9yeSxcclxuICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSByZXNvdXJjZVJldHJpZXZhbFNlcnZpY2U6IElSZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBsYXllckRlYzogSUxheWVyRGVjLFxyXG4gICAgICAgIHByaXZhdGUgY29tbW9uQWxhcm1GYWNlUG9wdXA6IENvbW1vbkFsYXJtRmFjZVBvcHVwRmFjdG9yeSxcclxuICAgICAgICBwcml2YXRlIGNvbW1vbkZ1bGxJbWFnZVBvcHVwOiBDb21tb25GdWxsSW1hZ2VQb3B1cEZhY3RvcnksXHJcbiAgICAgICAgcHJpdmF0ZSB1c2VySW5mb0NhY2hlRmFjdG9yeTogSVVzZXJJbmZvQ2FjaGVGYWN0b3J5LFxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5CdXR0b25MaXN0ID0gTXlSZXBvcnRFbnVtO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IE15UmVwb3J0RW51bVswXS5pbmRleDtcclxuICAgICAgICB0aGlzLmFsbFJlcG9ydFBhZ2UgPSAnLi4vbW9kdWxlL3Rvb2xPcHRpb24vbXlSZXBvcnQvbXlSZXBvcnRQYWdlL2FsbFJlcG9ydFBhZ2UuaHRtbD92PScgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZWFyY2hBbGFybVBhcmFtcyA9IHt9IGFzIFNlYXJjaEFsYXJtUGFyYW1zO1xyXG4gICAgICAgIHRoaXMucGFnZVBhcmFtcyA9IG5ldyBQYWdlUGFyYW1zKDEsIDEwMCk7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hBbGFybVBhcmFtcy5wYWdlU2l6ZSA9IHRoaXMucGFnZVBhcmFtcy5wYWdlU2l6ZTtcclxuICAgICAgICB0aGlzLnNlYXJjaEFsYXJtUGFyYW1zLmN1cnJlbnRQYWdlID0gdGhpcy5wYWdlUGFyYW1zLmN1cnJlbnRQYWdlO1xyXG5cclxuICAgICAgICB0aGlzLnNlYXJjaCgpO1xyXG5cclxuICAgICAgICB0aGlzLiRzY29wZS4kb24oXCIkZGVzdHJveVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubXlSZXBvcnRGYWN0b3J5LmNsZWFyRGF0YXMoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VJbmRleChkYXRhOiB7IHZhbHVlOiBzdHJpbmcsIGluZGV4OiBudW1iZXIgfSkge1xyXG4gICAgICAgIGlmIChkYXRhLmluZGV4ID09PSB0aGlzLnNlbGVjdGVkSW5kZXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBkYXRhLmluZGV4O1xyXG4gICAgICAgIC8vIOafpeaJvumhtemdolxyXG4gICAgICAgIHRoaXMuc2VhcmNoQnlPYmplY3RUeXBlKGRhdGEudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cGFuZGVyTW9yZShkYXRhOiBNeVJlcG9ydFZpZXdNb2RlbCkge1xyXG4gICAgICAgIGRhdGEuaXNFeHBhbmQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlzTWFjVHlwZSh2YWw6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBJc01hY1R5cGUodmFsKTtcclxuICAgIH1cclxuXHJcbiAgICBpc1ZlaGljbGVUeXBlKHZhbDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbCA9PSBcIkNhclwiO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRmFjZVR5cGUodmFsOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdmFsID09PSBPYmplY3RUeXBlLkNhbWVyYS52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZWFyY2goKSB7XHJcbiAgICAgICAgdGhpcy5teVJlcG9ydEZhY3RvcnkuY2xlYXJEYXRhcygpO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoQWxhcm1QYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMuX3NlYXJjaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dBbGFybUZhY2VQb3B1cChpdGVtOiBTZWFyY2hBbGFybUxvZ1Jlc3VsdCkge1xyXG4gICAgICAgIHRoaXMuY29tbW9uQWxhcm1GYWNlUG9wdXAuc2hvd1BvcHVwKHRoaXMuJHNjb3BlLCBpdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOafpeivouW5tuWxleekuuWcqOeVjOmdouS4ilxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9zZWFyY2goKSB7XHJcbiAgICAgICAgdGhpcy50YXNrU2VydmljZS5nZXRBbGFybVRhc2tJZHMoKS50aGVuKChyZXM6IFJlc3BvbnNlUmVzdWx0PEFycmF5PHN0cmluZz4+KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBhcnIgPSAocmVzICYmIHJlcy5kYXRhKSB8fCBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaEFsYXJtUGFyYW1zLmFyclN0cnVjdHVyZVRhc2tJZCA9IGFycjtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hBbGFybVBhcmFtcy5zdGFydFRpbWUgPSBtb21lbnQoKS5zdWJ0cmFjdCgxMCwgJ2RheXMnKS5mb3JtYXQoXCJZWVlZLU1NLUREIDAwOjAwOjAwXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaEFsYXJtUGFyYW1zLmVuZFRpbWUgPSBtb21lbnQoKS5mb3JtYXQoXCJZWVlZLU1NLUREIDIzOjU5OjU5XCIpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2VhcmNoQWxhcm1QYXJhbXMub2JqZWN0VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hBbGFybVBhcmFtcy5vYmplY3RUeXBlID0gWydDYXInLCAnQ2FtZXJhJywgJ1dpRmknLCAnRUZFTkNFJ107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubXlBbGFybVNlcnZpY2UuZ2V0TXlBbGFybUxpc3QodGhpcy5zZWFyY2hBbGFybVBhcmFtcyk7XHJcbiAgICAgICAgfSkudGhlbigocmVzOiBSZXNwb25zZVJlc3VsdDxQYWdlUmVzdWx0PFNlYXJjaEFsYXJtTG9nUmVzdWx0Pj4pID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLCBcIj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiKVxyXG4gICAgICAgICAgICBpZiAocmVzICYmIHJlcy5kYXRhICYmIHJlcy5jb2RlID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZVBhcmFtcy5jdXJyZW50UGFnZSA9IHRoaXMuc2VhcmNoQWxhcm1QYXJhbXMuY3VycmVudFBhZ2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2VQYXJhbXMuc2V0VG90YWxDb3VudChyZXMuZGF0YS5Ub3RhbENvdW50IHx8IDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5teVJlcG9ydEZhY3RvcnkuY2FjaGVEYXRhcyhyZXMuZGF0YS5SZXN1bHQgfHwgKFtdIGFzIEFycmF5PFNlYXJjaEFsYXJtTG9nUmVzdWx0PikpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlcyAmJiByZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZVBhcmFtcy5jdXJyZW50UGFnZSA9IHRoaXMuc2VhcmNoQWxhcm1QYXJhbXMuY3VycmVudFBhZ2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2VQYXJhbXMuc2V0VG90YWxDb3VudCgwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubXlSZXBvcnRGYWN0b3J5LmNhY2hlRGF0YXMoW10gYXMgQXJyYXk8U2VhcmNoQWxhcm1Mb2dSZXN1bHQ+KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIOS4jei/m+ihjOWQjue7reaTjeS9nFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHEucmVqZWN0KG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLm15UmVwb3J0RmFjdG9yeS5nZXREYXRhcygpO1xyXG4gICAgICAgICAgICB0aGlzLmlzU2hvd01vcmVCdG4oKTtcclxuICAgICAgICAgICAgY29uc29sZS5kZWJ1ZyhcIuaLv+WIsOeahOaVsOaNruS4ulwiLCByZXN1bHQpO1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWxhcm1EYXRhcyA9IHJlc3VsdDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflvpfmm7TlpJrnmoTmlLbol4/mlbDmja5cclxuICAgICAqIOmAu+i+kTog5Zyo546w5pyJ55qE5YiG6aG15Z+656GA5LiKLCDlkJHlkI7liqDkuIDpobUsIOafpeivolxyXG4gICAgICovXHJcbiAgICBnZXRNb3JlQWxhcm0oKSB7XHJcbiAgICAgICAgLy8g5q2kaWbnlKjkuo7liKTmlq3lvZPliY3pobXor7fmsYLmmK/lkKbmiJDlip/jgIIg6Iul5LiN5oOz562J77yM6K+05piO5LiK5qyh6K+35rGC5LiN5piv5q2j5bi457uT5p2f5LqG44CCXHJcbiAgICAgICAgdGhpcy5zZWFyY2hBbGFybVBhcmFtcy5jdXJyZW50UGFnZSA9IHRoaXMucGFnZVBhcmFtcy5jdXJyZW50UGFnZSArIDE7XHJcbiAgICAgICAgdGhpcy5fc2VhcmNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXR0ZW50aW9uKGRhdGE6IFNlYXJjaEFsYXJtTG9nUmVzdWx0KSB7XHJcbiAgICAgICAgaWYgKGRhdGEuQ29sbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXJEZWMuZmFpbEluZm8oXCLmraTmiqXorablt7LmlLbol49cIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwYXJhbXM6IENvbGxlY3RBZGRQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIGpzb246IGFuZ3VsYXIudG9Kc29uKGRhdGEpLFxyXG4gICAgICAgICAgICBvYmplY3RJRDogZGF0YS5BbGFybUxvZy5JRCxcclxuICAgICAgICAgICAgb2JqZWN0VHlwZTogZGF0YS5BbGFybUxvZy5PYmplY3RUeXBlLFxyXG4gICAgICAgICAgICB1c2VySWQ6IHRoaXMudXNlckluZm9DYWNoZUZhY3RvcnkuZ2V0Q3VycmVudFVzZXJJZCgpLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogQ29sbGVjdERhdGFUeXBlLkNvbGxlY3Rpb24udmFsdWVcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UuY29sbGVjdEFkZEluZm8ocGFyYW1zKS50aGVuKChzdHI6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc3RyKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDlnKjov5nph4zmiYvliqjorr7nva4sIOiuqeeVjOmdouaUtuiXj+agt+W8j+WPkeeUn+WPmOWMllxyXG4gICAgICAgICAgICAgICAgZGF0YS5Db2xsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlsZXnpLrlpKflm75cclxuICAgICAqL1xyXG4gICAgZnVsbFNjcmVlbihpbWdVcmw6IHN0cmluZywgZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coaW1nVXJsKVxyXG4gICAgICAgIHRoaXMuY29tbW9uRnVsbEltYWdlUG9wdXAuc2hvd1BvcHVwKHRoaXMuJHNjb3BlLCBpbWdVcmwpO1xyXG4gICAgICAgIC8vIOmYu+atouWGkuazoVxyXG4gICAgfVxyXG5cclxuICAgIGdldFZhbHVlQnlUaW1lS2V5KHRpbWVLZXk6IHN0cmluZywgcGFyYW1OYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgYXJyID0gdGltZUtleS5zcGxpdChcIi1cIik7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XHJcbiAgICAgICAgc3dpdGNoIChwYXJhbU5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcInl5eXlcIjpcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGFyclswXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiTU1cIjpcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGFyclsxXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZGRcIjpcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGFyclsyXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGlzU2hvd01vcmVCdG4oKSB7XHJcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcImlzU2hvd01vcmVCdG5cIik7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRJbmRleCA9IHRoaXMucGFnZVBhcmFtcy5jdXJyZW50UGFnZTtcclxuICAgICAgICBsZXQgcGFnZUNvdW50ID0gdGhpcy5wYWdlUGFyYW1zLnBhZ2VDb3VudDtcclxuICAgICAgICBpZiAoY3VycmVudEluZGV4ID49IHBhZ2VDb3VudCkge1xyXG4gICAgICAgICAgICB0aGlzLm1vcmVCdG4gPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm1vcmVCdG4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlYXJjaEJ5T2JqZWN0VHlwZShvYmplY3RUeXBlOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgX29iamVjdFR5cGUgPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIGlmIChvYmplY3RUeXBlID09PSBcIk1BQ1wiKSB7XHJcbiAgICAgICAgICAgIF9vYmplY3RUeXBlLnB1c2goT2JqZWN0VHlwZS5XaWZpLnZhbHVlKTtcclxuICAgICAgICAgICAgX29iamVjdFR5cGUucHVzaChPYmplY3RUeXBlLkVsZWN0cm9uaWNGZW5jZS52YWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChvYmplY3RUeXBlID09PSBcIlZlaGljbGVcIikge1xyXG4gICAgICAgICAgICBfb2JqZWN0VHlwZS5wdXNoKFwiQ2FyXCIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAob2JqZWN0VHlwZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIF9vYmplY3RUeXBlLnB1c2gob2JqZWN0VHlwZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgX29iamVjdFR5cGUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNlYXJjaEFsYXJtUGFyYW1zLm9iamVjdFR5cGUgPSBfb2JqZWN0VHlwZTtcclxuICAgICAgICAvLyDmuIXnqbrnvJPlrZhcclxuICAgICAgICB0aGlzLm15UmVwb3J0RmFjdG9yeS5jbGVhckRhdGFzKCk7XHJcbiAgICAgICAgdGhpcy5wYWdlUGFyYW1zLnNldEN1cnJlbnRQYWdlKDEpO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoQWxhcm1QYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIC8vIOi/m+ihjOafpeivouWSjOWxleekulxyXG4gICAgICAgIHRoaXMuX3NlYXJjaCgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5hcHBcclxuICAgIC5jb250cm9sbGVyKCdNeVJlcG9ydENvbnRyb2xsZXInLCBNeVJlcG9ydENvbnRyb2xsZXIpOyJdfQ==
