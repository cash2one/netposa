define(["require", "exports", "text!../../detailPopup/carPopup/carPopup.html", "text!../../fullPlayPopup/fullPlayPopup.html", "../../common/app/main.app", "./camera.paging", "../../common/factory/attribute.factory", "../../../core/server/enum/PVDictType", "css!./style/cameraMapPoint.css", "../../detailPopup/carPopup/carPopup.controller", "../../fullPlayPopup/fullPlayPopup.controller", "./camera.paging", "../../../core/server/AlarmModule", "../../common/factory/userinfo.cache.factory", "../../common/services/resourceRetrieval.service", "../../common/services/analysis.service"], function (require, exports, carPopupHtml, fullPlayPopupHtml, main_app_1, camera_paging_1, attribute_factory_1, PVDictType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Promise = require("es6-promise");
    var cameraCarPointHistoryAll = (function () {
        function cameraCarPointHistoryAll($scope, $timeout, cameraPagingService, userInfoCacheFactory, resourceRetrievalService, layerDec, layer, analysisService) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.cameraPagingService = cameraPagingService;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.resourceRetrievalService = resourceRetrievalService;
            this.layerDec = layerDec;
            this.layer = layer;
            this.analysisService = analysisService;
            this.historyIsShowAlarm = false;
            this.showStatus = true;
            this.resultParams = new camera_paging_1.PageParams();
            this.resultAlarmParams = new camera_paging_1.PageParams();
            this.isResultParams = true;
            this.isResultAlarmParams = true;
            this.searchParams = {};
            this.attributeFactory = new attribute_factory_1.AttributeFactory();
            this.dataListTotal = 0;
            this.alarmdataListTotal = 0;
            this.carTypeList = [];
            this.licencePlateList = [];
            this.vehicleBrandList = [];
            this.allVehicleSubBrandList = [];
            this.currentVehicleSubBrandList = [];
            this.carColorList = [];
            this.PersonAlarmParams = {};
            this.layerIndex = '';
            this.showStatus = $scope.showStatus;
            var time = this.attributeFactory.getCrossTrainTime(1);
            this.startTime = time.startTime;
            this.endTime = time.endTime;
            this.searchParams.startTime = this.startTime;
            this.searchParams.endTime = this.endTime;
            this.searchParams.arrObjectID = [this.$scope.ID];
            this.searchParams.currentPage = 1;
            this.searchParams.pageSize = 10;
            this.search2Server();
            this.PersonAlarmParams.startTime = this.startTime;
            this.PersonAlarmParams.endTime = this.endTime;
            this.PersonAlarmParams.arrCameraId = [this.$scope.ID];
            this.PersonAlarmParams.pageSize = 10;
            this.PersonAlarmParams.currentPage = 1;
            this.PersonAlarmParams.alarmType = 'Car';
            this.getServerAlarmMessage(this.PersonAlarmParams);
            $scope.$on('$destroy', function () {
                $scope.$emit('closeiframe');
            });
        }
        cameraCarPointHistoryAll.prototype.getTypes = function () {
            var _this = this;
            var arr = [
                this.resourceRetrievalService.getPVDType(PVDictType_1.PVDictType.VehicleType.value),
                this.resourceRetrievalService.getPVDType(PVDictType_1.PVDictType.PlateColor.value),
                this.resourceRetrievalService.getPVDType(PVDictType_1.PVDictType.VehicleColor.value),
                this.resourceRetrievalService.getPVDType(PVDictType_1.PVDictType.VehicleBrand.value),
                this.resourceRetrievalService.getPVDType(PVDictType_1.PVDictType.VehicleSubBrand.value)
            ];
            return Promise.all(arr).then(function (res) {
                _this.carTypeList = _this.getEnumArr(res[0]);
                _this.licencePlateList = _this.getEnumArr(res[1]);
                _this.carColorList = _this.getEnumArr(res[2]);
                _this.vehicleBrandList = _this.getEnumArr(res[3]);
                _this.allVehicleSubBrandList = _this.getEnumArr(res[4]);
                _this.licencePlateOther = _this.licencePlateList.splice(4, 1)[0];
                _this.carColorOther = _this.carColorList.pop();
            });
        };
        cameraCarPointHistoryAll.prototype.search2Server = function () {
            var _this = this;
            this.resourceRetrievalService.advancedSearchByCarEx(this.searchParams).then(function (datas) {
                if (datas && datas.Result && datas.Result.length > 0) {
                    _this.SubcribeAccessList = datas.Result;
                    _this.dataListTotal = datas.TotalCount;
                    if (_this.isResultParams) {
                        _this.initPagagion(1);
                    }
                    _this.isResultParams = false;
                }
                else {
                    _this.SubcribeAccessList = [];
                    _this.dataListTotal = 0;
                }
            });
        };
        cameraCarPointHistoryAll.prototype.getEnumArr = function (maps) {
            var result = [], k;
            for (k in maps) {
                result.push({
                    value: k,
                    text: maps[k]
                });
            }
            return result;
        };
        cameraCarPointHistoryAll.prototype.getServerAlarmMessage = function (searchParams) {
            var self = this;
            this.analysisService.searchPersonAlarm(this.PersonAlarmParams).then(function (res) {
                if (res.code === 200) {
                    self.alarmdataListTotal = res.data.TotalCount;
                    if (self.isResultAlarmParams) {
                        self.initPagagion(2);
                    }
                    self.isResultAlarmParams = false;
                    self.SubcribeAlarmList = res.data.Result;
                }
            });
        };
        cameraCarPointHistoryAll.prototype.initPagagion = function (type) {
            if (type == 1) {
                var pageParams = new camera_paging_1.PageParams();
                pageParams.pageSize = 10;
                pageParams.currentPage = 1;
                pageParams.totalCount = this.dataListTotal;
                this.resultParams = pageParams;
            }
            if (type == 2) {
                var pageParams = new camera_paging_1.PageParams();
                pageParams.pageSize = 10;
                pageParams.currentPage = 1;
                pageParams.totalCount = this.alarmdataListTotal;
                this.resultAlarmParams = pageParams;
            }
        };
        cameraCarPointHistoryAll.prototype.showCameraStatus = function (flag) {
            this.showStatus = flag;
        };
        cameraCarPointHistoryAll.prototype.changePage = function (i) {
            if (this.showStatus) {
                this.resultAlarmParams.currentPage = i;
                this.PersonAlarmParams.currentPage = i;
                this.getServerAlarmMessage(this.PersonAlarmParams);
                return this.resultAlarmParams;
            }
            else {
                this.resultParams.currentPage = i;
                this.searchParams.currentPage = i;
                this.search2Server();
                return this.resultParams;
            }
        };
        cameraCarPointHistoryAll.prototype.changeTime = function () {
            var starttime = new Date(this.startTime.replace(/-/g, '.')).getTime(), endtime = new Date(this.endTime.replace(/-/g, '.')).getTime();
            if (starttime > endtime) {
                this.layerDec.warnInfo("开始时间不能大于结束时间！");
                return;
            }
            this.isResultParams = true;
            this.searchParams.startTime = this.startTime;
            this.searchParams.currentPage = 1;
            this.searchParams.endTime = this.endTime;
            this.search2Server();
            this.PersonAlarmParams.startTime = this.startTime;
            this.PersonAlarmParams.endTime = this.endTime;
            this.PersonAlarmParams.currentPage = 1;
            this.isResultAlarmParams = true;
            this.getServerAlarmMessage(this.PersonAlarmParams);
        };
        cameraCarPointHistoryAll.prototype.clickCollect = function (item) {
            this.$scope.$emit('clickCollect', event, item);
        };
        cameraCarPointHistoryAll.prototype.clickSurveillance = function (item) {
            this.$scope.$emit('clickSurveillance', event, item);
        };
        cameraCarPointHistoryAll.prototype.clickAnalysis = function (item) {
            event.stopPropagation();
        };
        cameraCarPointHistoryAll.prototype.detailPopup = function (rank, allList) {
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
            scope.cameraInfo = this.$scope.cameraInfo;
            scope.cameraInfo.type = 2;
            scope.cameraInfo.time = this.SubcribeAccessList[rank].passTime;
            self.layerIndex = self.layer.open({
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
        cameraCarPointHistoryAll.prototype.fullPlay = function (item) {
            var scope = this.$scope.$new();
            scope.index = "fullPlayPopup";
            scope.PointDeTail = this.$scope.cameraInfo;
            scope.PointDeTail.type = 2;
            scope.PointDeTail.time = item.AlarmLog.JsonUserData.detail.passTime;
            this.layer.open({
                type: 1,
                skin: 'no-scroll',
                title: ['查看视频', 'font-weight: bold;background-color: #F6F8FB;color: #606060;height: 40px;'],
                area: ['680px', '433px'],
                content: fullPlayPopupHtml,
                scope: scope,
                end: function () {
                    scope.$destroy();
                }
            });
        };
        cameraCarPointHistoryAll.$inject = ['$scope', '$timeout', 'cameraPagingService', 'userInfoCacheFactory', 'resourceRetrievalService', 'layerDec', 'layer', 'analysisService'];
        return cameraCarPointHistoryAll;
    }());
    main_app_1.app.controller('cameraCarPointHistoryAll', cameraCarPointHistoryAll);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbWFwUG9pbnQvY2FtZXJhQ2FyTWFwUG9pbnQvdHBsSGlzdG9yeUFsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFvQ0EsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBR3JDO1FBcUNJLGtDQUNZLE1BQVcsRUFDWCxRQUFhLEVBQ2IsbUJBQXlDLEVBQ3pDLG9CQUEyQyxFQUMzQyx3QkFBbUQsRUFDbkQsUUFBbUIsRUFDbkIsS0FBUyxFQUNULGVBQWlDO1lBUGpDLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDWCxhQUFRLEdBQVIsUUFBUSxDQUFLO1lBQ2Isd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFzQjtZQUN6Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXVCO1lBQzNDLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMkI7WUFDbkQsYUFBUSxHQUFSLFFBQVEsQ0FBVztZQUNuQixVQUFLLEdBQUwsS0FBSyxDQUFJO1lBQ1Qsb0JBQWUsR0FBZixlQUFlLENBQWtCO1lBMUM3Qyx1QkFBa0IsR0FBWSxLQUFLLENBQUM7WUFDcEMsZUFBVSxHQUFZLElBQUksQ0FBQztZQU0zQixpQkFBWSxHQUFlLElBQUksMEJBQVUsRUFBRSxDQUFDO1lBQzVDLHNCQUFpQixHQUFlLElBQUksMEJBQVUsRUFBRSxDQUFDO1lBQ2pELG1CQUFjLEdBQVksSUFBSSxDQUFDO1lBQy9CLHdCQUFtQixHQUFZLElBQUksQ0FBQztZQUVwQyxpQkFBWSxHQUF1QixFQUF3QixDQUFDO1lBRTVELHFCQUFnQixHQUFxQixJQUFJLG9DQUFnQixFQUFFLENBQUM7WUFLNUQsa0JBQWEsR0FBVyxDQUFDLENBQUM7WUFDMUIsdUJBQWtCLEdBQVcsQ0FBQyxDQUFDO1lBRS9CLGdCQUFXLEdBQTJDLEVBQUUsQ0FBQztZQUd6RCxxQkFBZ0IsR0FBMkMsRUFBRSxDQUFDO1lBQzlELHFCQUFnQixHQUEyQyxFQUFFLENBQUM7WUFDOUQsMkJBQXNCLEdBQTJD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WUFBWSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDcEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQ1osSUFBSSxFQUFFLENBQUM7Z0JBQ1AsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSwwRUFBMEUsQ0FBQztnQkFDM0YsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztnQkFDeEIsT0FBTyxFQUFFLGlCQUFpQjtnQkFDMUIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osR0FBRyxFQUFFO29CQUNELEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDckIsQ0FBQzthQUNKLENBQUMsQ0FBQztRQUNQLENBQUM7UUF6VE0sZ0NBQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUscUJBQXFCLEVBQUUsc0JBQXNCLEVBQUUsMEJBQTBCLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBMlQ5SiwrQkFBQztLQTVURCxBQTRUQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQywwQkFBMEIsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9tYXBQb2ludC9jYW1lcmFDYXJNYXBQb2ludC90cGxIaXN0b3J5QWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi8uLi9kZXRhaWxQb3B1cC9jYXJQb3B1cC9jYXJQb3B1cC5odG1sXCIgbmFtZT1cImNhclBvcHVwSHRtbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vLi4vZnVsbFBsYXlQb3B1cC9mdWxsUGxheVBvcHVwLmh0bWxcIiBuYW1lPVwiZnVsbFBsYXlQb3B1cEh0bWxcIiAvPlxyXG5pbXBvcnQgJ2NzcyEuL3N0eWxlL2NhbWVyYU1hcFBvaW50LmNzcyc7XHJcbmltcG9ydCAnLi4vLi4vZGV0YWlsUG9wdXAvY2FyUG9wdXAvY2FyUG9wdXAuY29udHJvbGxlcic7XHJcbmltcG9ydCAnLi4vLi4vZnVsbFBsYXlQb3B1cC9mdWxsUGxheVBvcHVwLmNvbnRyb2xsZXInO1xyXG5pbXBvcnQgeyBhcHAgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgeyBJQ2FtZXJhUGFnaW5nU2VydmljZSwgUGFnZVBhcmFtcyB9IGZyb20gXCIuL2NhbWVyYS5wYWdpbmdcIjtcclxuaW1wb3J0IHsgQWNjZXNzTG9nIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2VydmVyL0FjY2Vzc0xvZ1wiO1xyXG5pbXBvcnQgeyBjYXIgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnVtL1F1ZXJ5UmVjb3JkXCI7XHJcblxyXG5pbXBvcnQgXCIuL2NhbWVyYS5wYWdpbmdcIlxyXG5pbXBvcnQgXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9BbGFybU1vZHVsZVwiXHJcbi8vIOi9pui+huafpeivouWPguaVsFxyXG5pbXBvcnQgeyBTZWFyY2hWZWhpY2xlTW9kZWwgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3BhcmFtcy9TZWFyY2hWZWhpY2xlUGFyYW1zJztcclxuaW1wb3J0IHsgUmVzcG9uc2VSZXN1bHQsIFBhZ2VSZXN1bHQgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHQnO1xyXG5pbXBvcnQgeyBQVkRWZWhpY2xlTGlzdE1vZGVsIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9zZXJ2ZXIvUFZEVmVoaWNsZUxpc3RNb2RlbCc7XHJcbi8vIOWFrOWFseaWueazlSDml7bpl7TmoLzlvI/ljJZcclxuaW1wb3J0IHsgQXR0cmlidXRlRmFjdG9yeSB9IGZyb20gXCIuLi8uLi9jb21tb24vZmFjdG9yeS9hdHRyaWJ1dGUuZmFjdG9yeVwiO1xyXG4vLyDnlKjmiLflkI1cclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL2ZhY3RvcnkvdXNlcmluZm8uY2FjaGUuZmFjdG9yeVwiO1xyXG5pbXBvcnQgeyBJVXNlckluZm9DYWNoZUZhY3RvcnkgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZhY3RvcnkvdXNlcmluZm8uY2FjaGUuZmFjdG9yeVwiO1xyXG4vLyDor7fmsYLlnLDlnYBcclxuaW1wb3J0ICcuLi8uLi9jb21tb24vc2VydmljZXMvcmVzb3VyY2VSZXRyaWV2YWwuc2VydmljZSc7XHJcbmltcG9ydCB7IElSZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb21tb24vc2VydmljZXMvcmVzb3VyY2VSZXRyaWV2YWwuc2VydmljZSc7XHJcbi8vIOWPguaVsFxyXG5pbXBvcnQgeyBQVkRpY3RUeXBlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9zZXJ2ZXIvZW51bS9QVkRpY3RUeXBlJztcclxuLy8g5o+Q56S65qGGXHJcbmltcG9ydCB7IElMYXllckRlYyB9IGZyb20gXCIuLi8uLi9jb21tb24vZmFjdG9yeS9sYXllck1zZy5mYWN0b3J5XCI7XHJcbi8vIE1vY2tcclxuaW1wb3J0IHsgTW9ja0FsYXJtTGlzdDQgfSBmcm9tIFwiLi9UZXN0RW51bVwiO1xyXG5cclxuaW1wb3J0IHsgQWxhcm1SZXN1bHRJbmZvLCBQZXJzb25BbGFybVBhcmFtcywgUGVyc29uQWxhcm1SZXN1bHQgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvUGVyc29uQWxhcm1FbnVtXCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hbmFseXNpcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IElBbmFseXNpc1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FuYWx5c2lzLnNlcnZpY2VcIjtcclxuXHJcbmRlY2xhcmUgbGV0IHJlcXVpcmU6YW55O1xyXG5sZXQgUHJvbWlzZSA9IHJlcXVpcmUoXCJlczYtcHJvbWlzZVwiKTtcclxuZGVjbGFyZSBsZXQgJDogYW55LCBjYXJQb3B1cEh0bWw6IGFueSwgZnVsbFBsYXlQb3B1cEh0bWw6YW55O1xyXG5cclxuY2xhc3MgY2FtZXJhQ2FyUG9pbnRIaXN0b3J5QWxsIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAnJHRpbWVvdXQnLCAnY2FtZXJhUGFnaW5nU2VydmljZScsICd1c2VySW5mb0NhY2hlRmFjdG9yeScsICdyZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UnLCAnbGF5ZXJEZWMnLCAnbGF5ZXInLCdhbmFseXNpc1NlcnZpY2UnXTtcclxuICAgIC8v5oql6K2m44CB5oqT5ouN5YiH5o2iXHJcbiAgICBoaXN0b3J5SXNTaG93QWxhcm06IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHNob3dTdGF0dXM6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgLy/mkYTlg4/lpLTmlbDmja5cclxuICAgIFN1YmNyaWJlQWNjZXNzTGlzdDogQXJyYXk8YW55PjtcclxuICAgIFN1YmNyaWJlQWxhcm1MaXN0OiBBcnJheTxhbnk+O1xyXG5cclxuICAgIC8v5YiG6aG15p2h5Lu2XHJcbiAgICByZXN1bHRQYXJhbXM6IFBhZ2VQYXJhbXMgPSBuZXcgUGFnZVBhcmFtcygpO1xyXG4gICAgcmVzdWx0QWxhcm1QYXJhbXM6IFBhZ2VQYXJhbXMgPSBuZXcgUGFnZVBhcmFtcygpO1xyXG4gICAgaXNSZXN1bHRQYXJhbXM6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgaXNSZXN1bHRBbGFybVBhcmFtczogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAvL+WOhuWPsuafpeivouadoeS7tlxyXG4gICAgc2VhcmNoUGFyYW1zOiBTZWFyY2hWZWhpY2xlTW9kZWwgPSB7fSBhcyBTZWFyY2hWZWhpY2xlTW9kZWw7XHJcbiAgICAvLyDlhaznlKjmlrnms5VcclxuICAgIGF0dHJpYnV0ZUZhY3Rvcnk6IEF0dHJpYnV0ZUZhY3RvcnkgPSBuZXcgQXR0cmlidXRlRmFjdG9yeSgpO1xyXG4gICAgLy8g5pel5pyf5o+S5Lu2IOaXtumXtFxyXG4gICAgc3RhcnRUaW1lOiBzdHJpbmc7XHJcbiAgICBlbmRUaW1lOiBzdHJpbmc7XHJcblxyXG4gICAgZGF0YUxpc3RUb3RhbDogbnVtYmVyID0gMDtcclxuICAgIGFsYXJtZGF0YUxpc3RUb3RhbDogbnVtYmVyID0gMDtcclxuICAgIC8vIOi9pui+huS/oeaBr1xyXG4gICAgY2FyVHlwZUxpc3Q6IEFycmF5PHsgdmFsdWU6IHN0cmluZywgdGV4dDogc3RyaW5nIH0+ID0gW107XHJcbiAgICBsaWNlbmNlUGxhdGVPdGhlcjogeyB2YWx1ZTogc3RyaW5nLCB0ZXh0OiBzdHJpbmcgfTtcclxuICAgIGNhckNvbG9yT3RoZXI6IHsgdmFsdWU6IHN0cmluZywgdGV4dDogc3RyaW5nIH07XHJcbiAgICBsaWNlbmNlUGxhdGVMaXN0OiBBcnJheTx7IHZhbHVlOiBzdHJpbmcsIHRleHQ6IHN0cmluZyB9PiA9IFtdO1xyXG4gICAgdmVoaWNsZUJyYW5kTGlzdDogQXJyYXk8eyB2YWx1ZTogc3RyaW5nLCB0ZXh0OiBzdHJpbmcgfT4gPSBbXTtcclxuICAgIGFsbFZlaGljbGVTdWJCcmFuZExpc3Q6IEFycmF5PHsgdmFsdWU6IHN0cmluZywgdGV4dDogc3RyaW5nIH0+ID0gW107XHJcbiAgICBjdXJyZW50VmVoaWNsZVN1YkJyYW5kTGlzdDogQXJyYXk8eyB2YWx1ZTogc3RyaW5nLCB0ZXh0OiBzdHJpbmcgfT4gPSBbXTtcclxuICAgIGNhckNvbG9yTGlzdDogQXJyYXk8eyB2YWx1ZTogc3RyaW5nLCB0ZXh0OiBzdHJpbmcgfT4gPSBbXTtcclxuICAgIFBlcnNvbkFsYXJtUGFyYW1zOiBQZXJzb25BbGFybVBhcmFtcyA9IHt9IGFzIFBlcnNvbkFsYXJtUGFyYW1zO1xyXG5cclxuICAgIGxheWVySW5kZXg6c3RyaW5nID0gJyc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSAkc2NvcGU6IGFueSxcclxuICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBjYW1lcmFQYWdpbmdTZXJ2aWNlOiBJQ2FtZXJhUGFnaW5nU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHVzZXJJbmZvQ2FjaGVGYWN0b3J5OiBJVXNlckluZm9DYWNoZUZhY3RvcnksXHJcbiAgICAgICAgcHJpdmF0ZSByZXNvdXJjZVJldHJpZXZhbFNlcnZpY2U6IElSZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBsYXllckRlYzogSUxheWVyRGVjLFxyXG4gICAgICAgIHByaXZhdGUgbGF5ZXI6YW55LFxyXG4gICAgICAgIHByaXZhdGUgYW5hbHlzaXNTZXJ2aWNlOiBJQW5hbHlzaXNTZXJ2aWNlLFxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5zaG93U3RhdHVzID0gJHNjb3BlLnNob3dTdGF0dXM7XHJcbiAgICAgICAgLy/orr7nva7ml7bpl7Tmj5Lku7bpu5jorqTml7bpl7QgXHJcbiAgICAgICAgbGV0IHRpbWUgPSB0aGlzLmF0dHJpYnV0ZUZhY3RvcnkuZ2V0Q3Jvc3NUcmFpblRpbWUoMSk7XHJcbiAgICAgICBcclxuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IHRpbWUuc3RhcnRUaW1lO1xyXG4gICAgICAgIHRoaXMuZW5kVGltZSA9IHRpbWUuZW5kVGltZTtcclxuICAgICAgICAvL+WIneWni+WMlum7mOiupOivt+axguaVsOaNrlxyXG4gICAgICAgIC8vIHRoaXMuc2VhcmNoUGFyYW1zLnVzZXJJZCA9IHRoaXMudXNlckluZm9DYWNoZUZhY3RvcnkuZ2V0Q3VycmVudFVzZXJJZCgpO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoUGFyYW1zLnN0YXJ0VGltZSA9IHRoaXMuc3RhcnRUaW1lO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoUGFyYW1zLmVuZFRpbWUgPSB0aGlzLmVuZFRpbWU7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hQYXJhbXMuYXJyT2JqZWN0SUQgPSBbdGhpcy4kc2NvcGUuSURdO1xyXG4gICAgICAgIC8vIHRoaXMuc2VhcmNoUGFyYW1zLmFyck9iamVjdElEID1bJzcyNyddO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoUGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICB0aGlzLnNlYXJjaFBhcmFtcy5wYWdlU2l6ZSA9IDEwO1xyXG4gICAgICAgIC8vIOivt+axguaVsOaNrlxyXG4gICAgICAgIHRoaXMuc2VhcmNoMlNlcnZlcigpO1xyXG4gICAgICAgIC8vIOaKpeitpuivt+axguWPguaVsFxyXG4gICAgICAgIHRoaXMuUGVyc29uQWxhcm1QYXJhbXMuc3RhcnRUaW1lID0gdGhpcy5zdGFydFRpbWU7XHJcbiAgICAgICAgdGhpcy5QZXJzb25BbGFybVBhcmFtcy5lbmRUaW1lID0gdGhpcy5lbmRUaW1lO1xyXG4gICAgICAgIHRoaXMuUGVyc29uQWxhcm1QYXJhbXMuYXJyQ2FtZXJhSWQgPSBbdGhpcy4kc2NvcGUuSURdO1xyXG4gICAgICAgIC8vIHRoaXMuUGVyc29uQWxhcm1QYXJhbXMuYXJyQ2FtZXJhSWQgPSBbJzcyNyddO1xyXG4gICAgICAgIHRoaXMuUGVyc29uQWxhcm1QYXJhbXMucGFnZVNpemUgPSAxMDtcclxuICAgICAgICB0aGlzLlBlcnNvbkFsYXJtUGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICB0aGlzLlBlcnNvbkFsYXJtUGFyYW1zLmFsYXJtVHlwZSA9ICdDYXInO1xyXG4gICAgICAgIHRoaXMuZ2V0U2VydmVyQWxhcm1NZXNzYWdlKHRoaXMuUGVyc29uQWxhcm1QYXJhbXMpO1xyXG4gICAgICAgIC8vIOebkeWQrOmUgOavgeS6i+S7tlxyXG4gICAgICAgICRzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAkc2NvcGUuJGVtaXQoJ2Nsb3NlaWZyYW1lJylcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOWIneWni+WMluWPguaVsFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFR5cGVzKCkge1xyXG4gICAgICAgIC8vIOiOt+WPlui9pui+huexu+Wei1xyXG4gICAgICAgIC8vIOi9pueJjOminOiJslxyXG4gICAgICAgIC8vIOi9pui+huminOiJslxyXG4gICAgICAgIC8vIOi9pui+huWTgeeJjFxyXG4gICAgICAgIC8vIOi9pui+huWtkOWTgeeJjFxyXG4gICAgICAgIGxldCBhcnIgPSBbXHJcbiAgICAgICAgICAgIHRoaXMucmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLmdldFBWRFR5cGUoUFZEaWN0VHlwZS5WZWhpY2xlVHlwZS52YWx1ZSksXHJcbiAgICAgICAgICAgIHRoaXMucmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLmdldFBWRFR5cGUoUFZEaWN0VHlwZS5QbGF0ZUNvbG9yLnZhbHVlKSxcclxuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UuZ2V0UFZEVHlwZShQVkRpY3RUeXBlLlZlaGljbGVDb2xvci52YWx1ZSksXHJcbiAgICAgICAgICAgIHRoaXMucmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLmdldFBWRFR5cGUoUFZEaWN0VHlwZS5WZWhpY2xlQnJhbmQudmFsdWUpLFxyXG4gICAgICAgICAgICB0aGlzLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5nZXRQVkRUeXBlKFBWRGljdFR5cGUuVmVoaWNsZVN1YkJyYW5kLnZhbHVlKVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGFycikudGhlbigocmVzOiBbeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSxcclxuICAgICAgICAgICAgeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSxcclxuICAgICAgICAgICAgeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSxcclxuICAgICAgICAgICAgeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSxcclxuICAgICAgICAgICAgeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfV0pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jYXJUeXBlTGlzdCA9IHRoaXMuZ2V0RW51bUFycihyZXNbMF0pO1xyXG4gICAgICAgICAgICB0aGlzLmxpY2VuY2VQbGF0ZUxpc3QgPSB0aGlzLmdldEVudW1BcnIocmVzWzFdKTtcclxuICAgICAgICAgICAgdGhpcy5jYXJDb2xvckxpc3QgPSB0aGlzLmdldEVudW1BcnIocmVzWzJdKTtcclxuICAgICAgICAgICAgdGhpcy52ZWhpY2xlQnJhbmRMaXN0ID0gdGhpcy5nZXRFbnVtQXJyKHJlc1szXSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsVmVoaWNsZVN1YkJyYW5kTGlzdCA9IHRoaXMuZ2V0RW51bUFycihyZXNbNF0pO1xyXG5cclxuICAgICAgICAgICAgLy8g6L2m54mM6aKc6Imy5YiX6KGoLCDpnIDopoHmiYvliqjkv67mlLlcclxuICAgICAgICAgICAgdGhpcy5saWNlbmNlUGxhdGVPdGhlciA9IHRoaXMubGljZW5jZVBsYXRlTGlzdC5zcGxpY2UoNCwgMSlbMF07XHJcbiAgICAgICAgICAgIHRoaXMuY2FyQ29sb3JPdGhlciA9IHRoaXMuY2FyQ29sb3JMaXN0LnBvcCgpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmxpY2VuY2VQbGF0ZUxpc3QudW5zaGlmdCh7fSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5ZCR5ZCO5Y+w5p+l6K+i5Y6G5Y+y6K6w5b2V77yI5oqT5ouN77yJXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2VhcmNoMlNlcnZlcigpIHtcclxuICAgICAgICAvLyDpmLLmraLlvILmraXlvJXotbfnmoTlj5jljJYsIOaVheWwhuaYr+WQpuS4uuacieWbvuajgOe0oueahOagh+W/l+WPmOmHj+aUvuWcqOWklumDqFxyXG4gICAgICAgIHRoaXMucmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLmFkdmFuY2VkU2VhcmNoQnlDYXJFeCh0aGlzLnNlYXJjaFBhcmFtcykudGhlbigoZGF0YXM6IFBhZ2VSZXN1bHQ8UFZEVmVoaWNsZUxpc3RNb2RlbD4pID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGFzICYmIGRhdGFzLlJlc3VsdCAmJiBkYXRhcy5SZXN1bHQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TdWJjcmliZUFjY2Vzc0xpc3QgPSBkYXRhcy5SZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFMaXN0VG90YWwgPSBkYXRhcy5Ub3RhbENvdW50O1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNSZXN1bHRQYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRQYWdhZ2lvbigxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuaXNSZXN1bHRQYXJhbXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU3ViY3JpYmVBY2Nlc3NMaXN0ID0gW107XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFMaXN0VG90YWwgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRFbnVtQXJyKG1hcHM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0pIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gW10sIGs7XHJcbiAgICAgICAgZm9yIChrIGluIG1hcHMpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGssXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBtYXBzW2tdXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9u6K+35rGC5Y6G5Y+y5oql6K2m5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0ge1BlcnNvbkFsYXJtUGFyYW1zfSBQZXJzb25BbGFybVBhcmFtcyDor7fmsYLlj4LmlbBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFNlcnZlckFsYXJtTWVzc2FnZShzZWFyY2hQYXJhbXM6IFBlcnNvbkFsYXJtUGFyYW1zKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNTZXJ2aWNlLnNlYXJjaFBlcnNvbkFsYXJtKHRoaXMuUGVyc29uQWxhcm1QYXJhbXMpLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmFsYXJtZGF0YUxpc3RUb3RhbCA9IHJlcy5kYXRhLlRvdGFsQ291bnQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5pc1Jlc3VsdEFsYXJtUGFyYW1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pbml0UGFnYWdpb24oMik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZWxmLmlzUmVzdWx0QWxhcm1QYXJhbXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuU3ViY3JpYmVBbGFybUxpc3QgPSByZXMuZGF0YS5SZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbuWIneWni+WMluWIhumhteWZqFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHR5cGUgXHJcbiAgICAgKiB0eXBlID0gMTvmipPmi43orrDlvZXliIbpobVcclxuICAgICAqIHR5cGUgPSAyO+aKpeitpuiusOW9leWIhumhtVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRQYWdhZ2lvbih0eXBlOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIGxldCBwYWdlUGFyYW1zID0gbmV3IFBhZ2VQYXJhbXMoKTtcclxuICAgICAgICAgICAgcGFnZVBhcmFtcy5wYWdlU2l6ZSA9IDEwO1xyXG4gICAgICAgICAgICBwYWdlUGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICAgICAgcGFnZVBhcmFtcy50b3RhbENvdW50ID0gdGhpcy5kYXRhTGlzdFRvdGFsO1xyXG4gICAgICAgICAgICB0aGlzLnJlc3VsdFBhcmFtcyA9IHBhZ2VQYXJhbXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09IDIpIHtcclxuICAgICAgICAgICAgbGV0IHBhZ2VQYXJhbXMgPSBuZXcgUGFnZVBhcmFtcygpO1xyXG4gICAgICAgICAgICBwYWdlUGFyYW1zLnBhZ2VTaXplID0gMTA7XHJcbiAgICAgICAgICAgIHBhZ2VQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgICAgICBwYWdlUGFyYW1zLnRvdGFsQ291bnQgPSB0aGlzLmFsYXJtZGF0YUxpc3RUb3RhbDtcclxuICAgICAgICAgICAgdGhpcy5yZXN1bHRBbGFybVBhcmFtcyA9IHBhZ2VQYXJhbXM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOWvvOiIquWIh+aNolxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBmbGFnIFxyXG4gICAgICovXHJcbiAgICBzaG93Q2FtZXJhU3RhdHVzKGZsYWc6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLnNob3dTdGF0dXMgPSBmbGFnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOWIhumhteWZqFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGkg5b2T5YmN6aG16Z2iXHJcbiAgICAgKi9cclxuICAgIGNoYW5nZVBhZ2UoaTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hvd1N0YXR1cykge1xyXG4gICAgICAgICAgICB0aGlzLnJlc3VsdEFsYXJtUGFyYW1zLmN1cnJlbnRQYWdlID0gaTtcclxuICAgICAgICAgICAgdGhpcy5QZXJzb25BbGFybVBhcmFtcy5jdXJyZW50UGFnZSA9IGk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0U2VydmVyQWxhcm1NZXNzYWdlKHRoaXMuUGVyc29uQWxhcm1QYXJhbXMpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXN1bHRBbGFybVBhcmFtcztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlc3VsdFBhcmFtcy5jdXJyZW50UGFnZSA9IGk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoUGFyYW1zLmN1cnJlbnRQYWdlID0gaTtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2gyU2VydmVyKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlc3VsdFBhcmFtcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5pe26Ze05pS55Y+YXHJcbiAgICAgKi9cclxuICAgIGNoYW5nZVRpbWUoKSB7XHJcbiAgICAgICAgLy8g5pe26Ze05qOA5rWLXHJcbiAgICAgICAgbGV0IHN0YXJ0dGltZSA9IG5ldyBEYXRlKHRoaXMuc3RhcnRUaW1lLnJlcGxhY2UoLy0vZywgJy4nKSkuZ2V0VGltZSgpLFxyXG4gICAgICAgICAgICBlbmR0aW1lID0gbmV3IERhdGUodGhpcy5lbmRUaW1lLnJlcGxhY2UoLy0vZywgJy4nKSkuZ2V0VGltZSgpO1xyXG4gICAgICAgIC8vIOaXtumXtOi+k+WFpemUmeivr+e7iOatouajgOe0olxyXG4gICAgICAgIGlmIChzdGFydHRpbWUgPiBlbmR0aW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXJEZWMud2FybkluZm8oXCLlvIDlp4vml7bpl7TkuI3og73lpKfkuo7nu5PmnZ/ml7bpl7TvvIFcIik7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzUmVzdWx0UGFyYW1zID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNlYXJjaFBhcmFtcy5zdGFydFRpbWUgPSB0aGlzLnN0YXJ0VGltZTtcclxuICAgICAgICB0aGlzLnNlYXJjaFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hQYXJhbXMuZW5kVGltZSA9IHRoaXMuZW5kVGltZTtcclxuICAgICAgICB0aGlzLnNlYXJjaDJTZXJ2ZXIoKTtcclxuICAgICAgICB0aGlzLlBlcnNvbkFsYXJtUGFyYW1zLnN0YXJ0VGltZSA9IHRoaXMuc3RhcnRUaW1lO1xyXG4gICAgICAgIHRoaXMuUGVyc29uQWxhcm1QYXJhbXMuZW5kVGltZSA9IHRoaXMuZW5kVGltZTtcclxuICAgICAgICB0aGlzLlBlcnNvbkFsYXJtUGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICB0aGlzLmlzUmVzdWx0QWxhcm1QYXJhbXMgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZ2V0U2VydmVyQWxhcm1NZXNzYWdlKHRoaXMuUGVyc29uQWxhcm1QYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOaUtuiXj1xyXG4gICAgICogQHBhcmFtIGl0ZW1cclxuICAgICAqL1xyXG4gICAgY2xpY2tDb2xsZWN0KCBpdGVtOiBhbnkpIHtcclxuICAgICAgICB0aGlzLiRzY29wZS4kZW1pdCgnY2xpY2tDb2xsZWN0JywgZXZlbnQsIGl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOW4g+aOp+S4juWPlua2iOW4g+aOp1xyXG4gICAgICogQHBhcmFtIGl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsaWNrU3VydmVpbGxhbmNlKGl0ZW06IGNhcikge1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRlbWl0KCdjbGlja1N1cnZlaWxsYW5jZScsIGV2ZW50LCBpdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDliIbmnpBcclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGlja0FuYWx5c2lzKCBpdGVtOiBjYXIpIHtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5pi+56S66K+m5oOF5by55qGGXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGV0YWlsUG9wdXAocmFuazogbnVtYmVyLCBhbGxMaXN0OiBBcnJheTxjYXI+KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBzY29wZTogeyAkZGVzdHJveTogRnVuY3Rpb24sIHJhbms6IG51bWJlciwgYWxsTGlzdDogQXJyYXk8Y2FyPiwgY29sbGVjdEZ1bmN0aW9uOiBGdW5jdGlvbiwgYW5hbHlzaXNGdW5jdGlvbjogRnVuY3Rpb24sIHN1cnZlaWxsYW5jZUZ1bmN0aW9uOiBGdW5jdGlvbiwgY2xvc2VQb3B1cDogRnVuY3Rpb24sIGNhbWVyYUluZm86YW55fSA9IHNlbGYuJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICBzY29wZS5yYW5rID0gcmFuaztcclxuICAgICAgICBzY29wZS5hbGxMaXN0ID0gYWxsTGlzdDtcclxuICAgICAgICBzY29wZS5jb2xsZWN0RnVuY3Rpb24gPSAoaXRlbTogY2FyKSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuY2xpY2tDb2xsZWN0KGl0ZW0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2NvcGUuYW5hbHlzaXNGdW5jdGlvbiA9IChpdGVtOiBjYXIpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5jbGlja0FuYWx5c2lzKGl0ZW0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2NvcGUuc3VydmVpbGxhbmNlRnVuY3Rpb24gPSAoaXRlbTogY2FyKSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuY2xpY2tTdXJ2ZWlsbGFuY2UoaXRlbSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzY29wZS5jbG9zZVBvcHVwID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLmxheWVyLmNsb3NlKHNlbGYubGF5ZXJJbmRleCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzY29wZS5jYW1lcmFJbmZvID0gdGhpcy4kc2NvcGUuY2FtZXJhSW5mbztcclxuICAgICAgICBzY29wZS5jYW1lcmFJbmZvLnR5cGUgPSAyO1xyXG4gICAgICAgIHNjb3BlLmNhbWVyYUluZm8udGltZSA9IHRoaXMuU3ViY3JpYmVBY2Nlc3NMaXN0W3JhbmtdLnBhc3NUaW1lO1xyXG4gICAgICAgIHNlbGYubGF5ZXJJbmRleCA9IHNlbGYubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIHNraW46ICdkZXRhaWwtcG9wdXAtYm94JyxcclxuICAgICAgICAgICAgdGl0bGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhcmVhOiBbJzY3MHB4JywgJzQyMHB4J10sXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGNhclBvcHVwSHRtbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmn6XnnIvop4bpopFcclxuICAgIHB1YmxpYyBmdWxsUGxheShpdGVtOmFueSkge1xyXG4gICAgICAgIGxldCBzY29wZTogeyBsYXllcjogYW55OyBpbmRleDogc3RyaW5nLCAkZGVzdHJveTogRnVuY3Rpb24sIFBvaW50RGVUYWlsOiBhbnkgfSA9IHRoaXMuJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICBzY29wZS5pbmRleCA9IFwiZnVsbFBsYXlQb3B1cFwiO1xyXG4gICAgICAgIHNjb3BlLlBvaW50RGVUYWlsID0gdGhpcy4kc2NvcGUuY2FtZXJhSW5mbztcclxuICAgICAgICBzY29wZS5Qb2ludERlVGFpbC50eXBlID0gMjtcclxuICAgICAgICBzY29wZS5Qb2ludERlVGFpbC50aW1lID0gaXRlbS5BbGFybUxvZy5Kc29uVXNlckRhdGEuZGV0YWlsLnBhc3NUaW1lO1xyXG4gICAgICAgIHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIHNraW46ICduby1zY3JvbGwnLFxyXG4gICAgICAgICAgICB0aXRsZTogWyfmn6XnnIvop4bpopEnLCAnZm9udC13ZWlnaHQ6IGJvbGQ7YmFja2dyb3VuZC1jb2xvcjogI0Y2RjhGQjtjb2xvcjogIzYwNjA2MDtoZWlnaHQ6IDQwcHg7J10sXHJcbiAgICAgICAgICAgIGFyZWE6IFsnNjgwcHgnLCAnNDMzcHgnXSxcclxuICAgICAgICAgICAgY29udGVudDogZnVsbFBsYXlQb3B1cEh0bWwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcignY2FtZXJhQ2FyUG9pbnRIaXN0b3J5QWxsJywgY2FtZXJhQ2FyUG9pbnRIaXN0b3J5QWxsKTsiXX0=
