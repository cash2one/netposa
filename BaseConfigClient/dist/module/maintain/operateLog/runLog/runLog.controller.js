define(["require", "exports", "../../../common/app/main.app", "../../../common/Pagination", "angular", "css!module/maintain/css/maintain-operateLog.css", "../../../common/services/maintain.service", "../../main/maintainFactory", "moment"], function (require, exports, main_app_1, Pagination_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CasCadeSearchParams = (function () {
        function CasCadeSearchParams() {
            this.classSimpleName = "ExceptionLog";
            this.arrWhereJson = [];
            this.pageSize = 10;
            this.currentPage = 1;
        }
        return CasCadeSearchParams;
    }());
    exports.CasCadeSearchParams = CasCadeSearchParams;
    var runOperateLog = (function () {
        function runOperateLog() {
        }
        return runOperateLog;
    }());
    exports.runOperateLog = runOperateLog;
    var runOperateLogData = (function () {
        function runOperateLogData() {
        }
        return runOperateLogData;
    }());
    exports.runOperateLogData = runOperateLogData;
    var RunLogController = (function () {
        function RunLogController($scope, maintainService, $timeout, layer, maintainFactory) {
            this.$scope = $scope;
            this.maintainService = maintainService;
            this.$timeout = $timeout;
            this.layer = layer;
            this.maintainFactory = maintainFactory;
            this.pageParams = new Pagination_1.PageParamsAndResult();
            this.Pagination = new Pagination_1.Pagination();
            var vm = this;
            vm.tHeadList = [
                { field: "ExceptionTime", title: "FDS_02_02_06" },
                { field: "ExceptionServerIP", title: "IP" },
                { field: "ExceptionModule", title: "FDS_02_02_08" },
                { field: "ExceptionClass", title: "FDS_02_02_19" },
                { field: "ExceptionMessage", title: "FDS_02_02_07" }
            ];
            vm.tBodyList = [];
            this.getTableList();
        }
        RunLogController.prototype.exportFile = function () {
            var Params = {};
            Params.orderType = "ASC";
            Params.currentPage = 1;
            Params.pageSize = 10;
            console.log(this.maintainFactory);
            console.log(Params);
            this.maintainFactory.exportTableXls("/pdp/netManagerCtrl/runningLog/export", Params);
        };
        RunLogController.prototype.getTableList = function (Params) {
            var that = this;
            var casCadeSearchParams = new CasCadeSearchParams();
            if (!!Params) {
                casCadeSearchParams = Params;
            }
            else {
                if (!!this.searchPagingParams) {
                    casCadeSearchParams.arrWhereJson = this.searchPagingParams;
                }
                else {
                    casCadeSearchParams.arrWhereJson = {
                        startTime: moment().subtract(1, 'year').format("YYYY-MM-DD hh:mm:ss"),
                        endTime: "2018-01-03 00:00:00"
                    };
                }
            }
            this.maintainService.getRunLogDataList(casCadeSearchParams).then(complete);
            function complete(res) {
                if (!!res && !!res.data && res.code === 200) {
                    var ResultData = res.data;
                    that.currentPageData = ResultData.Result;
                    if (Array.isArray(ResultData.Result)) {
                        if (that.Pagination.set(ResultData.Result)) {
                            that.pageParams = that.Pagination.getByPage(that.pageParams);
                            that.pageParams.totalCount = ResultData.TotalCount;
                            that.pageParams.currentPage = Params ? Params.currentPage : 1;
                            that.pageParams.pageSize = 10;
                            that.pageParams.pageCount = Math.ceil(that.pageParams.totalCount / that.pageParams.pageSize);
                        }
                        else {
                            that.pageParams.data = [];
                        }
                    }
                }
                else {
                    that.layer.msg("获取运行日志数据失败");
                }
            }
        };
        RunLogController.prototype.changePage = function (num) {
            if (this.handleStartTime > this.handleEndTime) {
                this.layer.msg("开始时间不能大于结束时间");
                return;
            }
            var casCadeSearchParams = new CasCadeSearchParams();
            casCadeSearchParams.currentPage = num || 1;
            this.searchPagingParams = casCadeSearchParams.arrWhereJson = {
                startTime: this.handleStartTime,
                endTime: this.handleEndTime
            };
            this.getTableList(casCadeSearchParams);
        };
        RunLogController.$inject = ['$scope', 'maintainService', '$timeout', 'layer', 'maintainFactory'];
        return RunLogController;
    }());
    main_app_1.app.controller("runLogController", RunLogController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbWFpbnRhaW4vb3BlcmF0ZUxvZy9ydW5Mb2cvcnVuTG9nLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBaUJBO1FBQUE7WUFDSSxvQkFBZSxHQUFXLGNBQWMsQ0FBQztZQUN6QyxpQkFBWSxHQUFRLEVBQUUsQ0FBQztZQUN2QixhQUFRLEdBQVcsRUFBRSxDQUFDO1lBQ3RCLGdCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBQzVCLENBQUM7UUFBRCwwQkFBQztJQUFELENBTEEsQUFLQyxJQUFBO0lBTFksa0RBQW1CO0lBT2hDO1FBQUE7UUFhQSxDQUFDO1FBQUQsb0JBQUM7SUFBRCxDQWJBLEFBYUMsSUFBQTtJQWJZLHNDQUFhO0lBZTFCO1FBQUE7UUFHQSxDQUFDO1FBQUQsd0JBQUM7SUFBRCxDQUhBLEFBR0MsSUFBQTtJQUhZLDhDQUFpQjtJQUs5QjtRQXFCSSwwQkFDWSxNQUFXLEVBQ1gsZUFBaUMsRUFDakMsUUFBYSxFQUNiLEtBQVUsRUFDVixlQUErQjtZQUovQixXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQ1gsb0JBQWUsR0FBZixlQUFlLENBQWtCO1lBQ2pDLGFBQVEsR0FBUixRQUFRLENBQUs7WUFDYixVQUFLLEdBQUwsS0FBSyxDQUFLO1lBQ1Ysb0JBQWUsR0FBZixlQUFlLENBQWdCO1lBWDNDLGVBQVUsR0FBd0IsSUFBSSxnQ0FBbUIsRUFBRSxDQUFDO1lBQzVELGVBQVUsR0FBZ0IsSUFBSSx1QkFBVSxFQUFFLENBQUM7WUFZdkMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBRWQsRUFBRSxDQUFDLFNBQVMsR0FBRztnQkFDWCxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRTtnQkFDakQsRUFBRSxLQUFLLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtnQkFDM0MsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRTtn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SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLGtCQUFrQixFQUFFLGdCQUFnQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL21haW50YWluL29wZXJhdGVMb2cvcnVuTG9nL3J1bkxvZy5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgdGogb24gMjAxNy80LzI0LlxyXG4gKi9cclxuaW1wb3J0IHsgYXBwIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IFwiYW5ndWxhclwiO1xyXG5pbXBvcnQgJ2NzcyFtb2R1bGUvbWFpbnRhaW4vY3NzL21haW50YWluLW9wZXJhdGVMb2cuY3NzJztcclxuXHJcbmltcG9ydCB7IElUYWJsZUhlYWRlciB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZGlyZWN0aXZlL3VuaXQtdGFibGUvdGFibGUtcGFyYW1zXCI7XHJcbmltcG9ydCB7IElNYWludGFpblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL21haW50YWluLnNlcnZpY2VcIlxyXG5pbXBvcnQgXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvbWFpbnRhaW4uc2VydmljZVwiXHJcbmltcG9ydCBcIi4uLy4uL21haW4vbWFpbnRhaW5GYWN0b3J5XCJcclxuaW1wb3J0IHsgSUVjaGFydEZhY3RvcnkgfSBmcm9tIFwiLi4vLi4vbWFpbi9tYWludGFpbkZhY3RvcnlcIlxyXG5pbXBvcnQgeyBSZXNwb25zZVJlc3VsdCB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHsgUGFnZVBhcmFtc0FuZFJlc3VsdCwgSVBhZ2luYXRpb24sIFBhZ2luYXRpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL1BhZ2luYXRpb25cIjtcclxuaW1wb3J0IFwibW9tZW50XCI7XHJcbmRlY2xhcmUgbGV0IG1vbWVudDogYW55O1xyXG5cclxuZXhwb3J0IGNsYXNzIENhc0NhZGVTZWFyY2hQYXJhbXMge1xyXG4gICAgY2xhc3NTaW1wbGVOYW1lOiBzdHJpbmcgPSBcIkV4Y2VwdGlvbkxvZ1wiO1xyXG4gICAgYXJyV2hlcmVKc29uOiBhbnkgPSBbXTtcclxuICAgIHBhZ2VTaXplOiBudW1iZXIgPSAxMDtcclxuICAgIGN1cnJlbnRQYWdlOiBudW1iZXIgPSAxO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgcnVuT3BlcmF0ZUxvZyB7XHJcbiAgICBFeGNlcHRpb25DbGFzczogc3RyaW5nO1xyXG4gICAgRXhjZXB0aW9uTWVzc2FnZTogc3RyaW5nO1xyXG4gICAgRXhjZXB0aW9uTW9kdWxlOiBzdHJpbmc7XHJcbiAgICBFeGNlcHRpb25OdW1iZXI6IG51bWJlcjtcclxuICAgIEV4Y2VwdGlvblNlcnZlcklQOiBzdHJpbmc7XHJcbiAgICBFeGNlcHRpb25TZXJ2ZXJUeXBlOiBzdHJpbmc7XHJcbiAgICBFeGNlcHRpb25UaW1lOiBzdHJpbmc7XHJcbiAgICBFeHQ6IHN0cmluZztcclxuICAgIElEOiBzdHJpbmc7XHJcbiAgICBKc29uRXh0RGF0YTogYW55O1xyXG4gICAgSnNvblVzZXJEYXRhOiBhbnk7XHJcbiAgICBTdHJKc29uVXNlckRhdGE6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIHJ1bk9wZXJhdGVMb2dEYXRhIHtcclxuICAgIFJlc3VsdDogQXJyYXk8cnVuT3BlcmF0ZUxvZz47XHJcbiAgICBUb3RhbENvdW50OiBudW1iZXI7XHJcbn1cclxuXHJcbmNsYXNzIFJ1bkxvZ0NvbnRyb2xsZXIge1xyXG5cclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAnbWFpbnRhaW5TZXJ2aWNlJywgJyR0aW1lb3V0JywgJ2xheWVyJywgJ21haW50YWluRmFjdG9yeSddO1xyXG5cclxuICAgIC8vIHRhYmxlIOWIl+ihqOaVsOaNrlxyXG4gICAgdEhlYWRMaXN0OiBBcnJheTxJVGFibGVIZWFkZXI+O1xyXG4gICAgdEJvZHlMaXN0OiBBcnJheTxhbnk+O1xyXG5cclxuICAgIHRhYmxlTm9EYXRhOiBib29sZWFuO1xyXG5cclxuICAgIC8v5p+l6K+i5p2h5Lu2XHJcbiAgICBoYW5kbGVTdGFydFRpbWU6IHN0cmluZztcclxuICAgIGhhbmRsZUVuZFRpbWU6IHN0cmluZztcclxuXHJcbiAgICBjdXJyZW50UGFnZURhdGE6IEFycmF5PHJ1bk9wZXJhdGVMb2c+O1xyXG4gICAgcGFnZVBhcmFtczogUGFnZVBhcmFtc0FuZFJlc3VsdCA9IG5ldyBQYWdlUGFyYW1zQW5kUmVzdWx0KCk7XHJcbiAgICBQYWdpbmF0aW9uOiBJUGFnaW5hdGlvbiA9IG5ldyBQYWdpbmF0aW9uKCk7XHJcblxyXG4gICAgLy8g5YWz6ZSu5a2X6L+H5rukXHJcbiAgICBFeGNlcHRpb25NZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBzZWFyY2hQYWdpbmdQYXJhbXM6IGFueTtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBtYWludGFpblNlcnZpY2U6IElNYWludGFpblNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogYW55LFxyXG4gICAgICAgIHByaXZhdGUgbGF5ZXI6IGFueSxcclxuICAgICAgICBwcml2YXRlIG1haW50YWluRmFjdG9yeTogSUVjaGFydEZhY3RvcnlcclxuICAgICkge1xyXG4gICAgICAgIGxldCB2bSA9IHRoaXM7XHJcbiAgICAgICAgLy8g6KGo5qC85pWw5o2uXHJcbiAgICAgICAgdm0udEhlYWRMaXN0ID0gW1xyXG4gICAgICAgICAgICB7IGZpZWxkOiBcIkV4Y2VwdGlvblRpbWVcIiwgdGl0bGU6IFwiRkRTXzAyXzAyXzA2XCIgfSxcclxuICAgICAgICAgICAgeyBmaWVsZDogXCJFeGNlcHRpb25TZXJ2ZXJJUFwiLCB0aXRsZTogXCJJUFwiIH0sXHJcbiAgICAgICAgICAgIHsgZmllbGQ6IFwiRXhjZXB0aW9uTW9kdWxlXCIsIHRpdGxlOiBcIkZEU18wMl8wMl8wOFwiIH0sXHJcbiAgICAgICAgICAgIHsgZmllbGQ6IFwiRXhjZXB0aW9uQ2xhc3NcIiwgdGl0bGU6IFwiRkRTXzAyXzAyXzE5XCIgfSxcclxuICAgICAgICAgICAgeyBmaWVsZDogXCJFeGNlcHRpb25NZXNzYWdlXCIsIHRpdGxlOiBcIkZEU18wMl8wMl8wN1wiIH1cclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICB2bS50Qm9keUxpc3QgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRUYWJsZUxpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDlr7zlh7pcclxuICAgIHB1YmxpYyBleHBvcnRGaWxlKCkge1xyXG4gICAgICAgIGxldCBQYXJhbXM6IGFueSA9IHt9O1xyXG4gICAgICAgIFBhcmFtcy5vcmRlclR5cGUgPSBcIkFTQ1wiO1xyXG4gICAgICAgIFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgUGFyYW1zLnBhZ2VTaXplID0gMTA7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5tYWludGFpbkZhY3RvcnkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFBhcmFtcylcclxuICAgICAgICB0aGlzLm1haW50YWluRmFjdG9yeS5leHBvcnRUYWJsZVhscyhcIi9wZHAvbmV0TWFuYWdlckN0cmwvcnVubmluZ0xvZy9leHBvcnRcIiwgUGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDojrflj5blkI7lj7DmlbDmja5cclxuICAgIHByaXZhdGUgZ2V0VGFibGVMaXN0KFBhcmFtcz86IENhc0NhZGVTZWFyY2hQYXJhbXMpIHtcclxuICAgICAgICBsZXQgdGhhdDogYW55ID0gdGhpcztcclxuICAgICAgICBsZXQgY2FzQ2FkZVNlYXJjaFBhcmFtczogQ2FzQ2FkZVNlYXJjaFBhcmFtcyA9IG5ldyBDYXNDYWRlU2VhcmNoUGFyYW1zKCk7XHJcblxyXG4gICAgICAgIC8vIOafpeivolxyXG4gICAgICAgIGlmICghIVBhcmFtcykge1xyXG4gICAgICAgICAgICBjYXNDYWRlU2VhcmNoUGFyYW1zID0gUGFyYW1zXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy/lpoLmnpzmkJzntKLmnaHku7blrZjlnKjkuJTlhbPplK7lrZflrZjlnKhcclxuICAgICAgICAgICAgaWYgKCEhdGhpcy5zZWFyY2hQYWdpbmdQYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgIGNhc0NhZGVTZWFyY2hQYXJhbXMuYXJyV2hlcmVKc29uID0gdGhpcy5zZWFyY2hQYWdpbmdQYXJhbXNcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNhc0NhZGVTZWFyY2hQYXJhbXMuYXJyV2hlcmVKc29uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0VGltZTogbW9tZW50KCkuc3VidHJhY3QoMSwgJ3llYXInKS5mb3JtYXQoXCJZWVlZLU1NLUREIGhoOm1tOnNzXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZFRpbWU6IFwiMjAxOC0wMS0wMyAwMDowMDowMFwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubWFpbnRhaW5TZXJ2aWNlLmdldFJ1bkxvZ0RhdGFMaXN0KGNhc0NhZGVTZWFyY2hQYXJhbXMpLnRoZW4oY29tcGxldGUpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjb21wbGV0ZShyZXM6IFJlc3BvbnNlUmVzdWx0PHJ1bk9wZXJhdGVMb2dEYXRhPikge1xyXG4gICAgICAgICAgICBpZiAoISFyZXMgJiYgISFyZXMuZGF0YSAmJiByZXMuY29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgUmVzdWx0RGF0YTogcnVuT3BlcmF0ZUxvZ0RhdGEgPSByZXMuZGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LmN1cnJlbnRQYWdlRGF0YSA9IFJlc3VsdERhdGEuUmVzdWx0IGFzIEFycmF5PHJ1bk9wZXJhdGVMb2c+O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KFJlc3VsdERhdGEuUmVzdWx0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LlBhZ2luYXRpb24uc2V0KFJlc3VsdERhdGEuUmVzdWx0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBhZ2VQYXJhbXMgPSB0aGF0LlBhZ2luYXRpb24uZ2V0QnlQYWdlKHRoYXQucGFnZVBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGFnZVBhcmFtcy50b3RhbENvdW50ID0gUmVzdWx0RGF0YS5Ub3RhbENvdW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBhZ2VQYXJhbXMuY3VycmVudFBhZ2UgPSBQYXJhbXMgPyBQYXJhbXMuY3VycmVudFBhZ2UgOiAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBhZ2VQYXJhbXMucGFnZVNpemUgPSAxMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wYWdlUGFyYW1zLnBhZ2VDb3VudCA9IE1hdGguY2VpbCh0aGF0LnBhZ2VQYXJhbXMudG90YWxDb3VudCAvIHRoYXQucGFnZVBhcmFtcy5wYWdlU2l6ZSlcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBhZ2VQYXJhbXMuZGF0YSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoYXQubGF5ZXIubXNnKFwi6I635Y+W6L+Q6KGM5pel5b+X5pWw5o2u5aSx6LSlXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5pS55Y+Y5b2T5YmN6aG1XHJcbiAgICBwdWJsaWMgY2hhbmdlUGFnZShudW0/OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5oYW5kbGVTdGFydFRpbWUgPiB0aGlzLmhhbmRsZUVuZFRpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5tc2coXCLlvIDlp4vml7bpl7TkuI3og73lpKfkuo7nu5PmnZ/ml7bpl7RcIik7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNhc0NhZGVTZWFyY2hQYXJhbXM6IENhc0NhZGVTZWFyY2hQYXJhbXMgPSBuZXcgQ2FzQ2FkZVNlYXJjaFBhcmFtcygpO1xyXG4gICAgICAgIGNhc0NhZGVTZWFyY2hQYXJhbXMuY3VycmVudFBhZ2UgPSBudW0gfHwgMTtcclxuXHJcbiAgICAgICAgdGhpcy5zZWFyY2hQYWdpbmdQYXJhbXMgPSBjYXNDYWRlU2VhcmNoUGFyYW1zLmFycldoZXJlSnNvbiA9IHtcclxuICAgICAgICAgICAgc3RhcnRUaW1lOiB0aGlzLmhhbmRsZVN0YXJ0VGltZSxcclxuICAgICAgICAgICAgZW5kVGltZTogdGhpcy5oYW5kbGVFbmRUaW1lXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRUYWJsZUxpc3QoY2FzQ2FkZVNlYXJjaFBhcmFtcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKFwicnVuTG9nQ29udHJvbGxlclwiLCBSdW5Mb2dDb250cm9sbGVyKTsiXX0=
