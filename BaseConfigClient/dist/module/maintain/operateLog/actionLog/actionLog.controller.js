define(["require", "exports", "../../../common/app/main.app", "../../../common/Pagination", "../../../../core/entity/OperFirstModule", "../../../common/portrait-tool", "angular", "css!module/maintain/css/maintain-operateLog.css", "../../../common/services/maintain.service", "../../factory/seeLog.factory", "../../main/maintainFactory", "moment"], function (require, exports, main_app_1, Pagination_1, OperFirstModule_1, portrait_tool_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CasCadeSearchParams = (function () {
        function CasCadeSearchParams() {
        }
        return CasCadeSearchParams;
    }());
    exports.CasCadeSearchParams = CasCadeSearchParams;
    exports.tHeadList = [
        { field: "OperatorUserName", title: "FDS_02_02_03" },
        { field: "AreaName", title: "FDS_02_00_02" },
        { field: "UnitName", title: "FDS_02_01_07" },
        { field: "OperatorTime", title: "FDS_02_02_06" },
        { field: "OperatorIP", title: "IP" },
        { field: "OperatorModule", title: "FDS_02_02_02" },
        { field: "Descrption", title: "FDS_02_02_33" }
    ];
    var ActionLogController = (function () {
        function ActionLogController($scope, maintainService, $timeout, userInfoCacheFactory, layer, maintainFactory) {
            this.$scope = $scope;
            this.maintainService = maintainService;
            this.$timeout = $timeout;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.layer = layer;
            this.maintainFactory = maintainFactory;
            this.tHeadList = exports.tHeadList;
            this.OperFitstModule = OperFirstModule_1.OperFitstModule;
            this.allOperatorModule = [];
            this.PortraitTool = portrait_tool_1.default;
            this.PageParamsAndResult = new Pagination_1.PageParamsAndResult();
            this.Pagination = new Pagination_1.Pagination();
            this.getOperateLog();
        }
        ActionLogController.prototype.getOperateModule = function () {
            var _this = this;
            Object.keys(this.OperFitstModule).forEach(function (module) {
                if (_this.allOperatorModule.indexOf(module) == -1) {
                    _this.allOperatorModule.push(_this.OperFitstModule[module]);
                }
            });
        };
        ActionLogController.prototype.getOperateLog = function (caseCadeSearchParams) {
            this.getOperateModule();
            var that = this;
            var Params = new CasCadeSearchParams();
            if (!caseCadeSearchParams) {
                Params.operatorUser = this.operatorManInput;
                Params.orderType = "ASC";
                Params.currentPage = 1;
                Params.pageSize = 10;
            }
            else {
                Params = caseCadeSearchParams;
            }
            this.maintainService.logManagement(Params).then(complete);
            function complete(res) {
                if (res && res.code === 200) {
                    var data = res.data.Result ? res.data.Result : [];
                    that.PageParamsAndResult.pageSize = 10;
                    that.PageParamsAndResult.currentPage = Params.currentPage;
                    that.PageParamsAndResult.pageCount = Math.ceil(that.PageParamsAndResult.totalCount / that.PageParamsAndResult.pageSize);
                    that.PageParamsAndResult.data = data;
                    that.PageParamsAndResult.totalCount = res.data.TotalCount;
                    that.userTotalCount = res.data.TotalCount;
                }
            }
        };
        ActionLogController.prototype.changePage = function (num) {
            if (this.handleStartTime > this.handleEndTime) {
                this.layer.msg("开始时间不能大于结束时间");
                return;
            }
            var params = new CasCadeSearchParams();
            params.startTime = this.handleStartTime;
            params.endTime = this.handleEndTime;
            params.orderType = "ASC";
            params.currentPage = num || 1;
            params.pageSize = 10;
            params.operatorModule = this.operatorModule;
            params.operatorUser = this.operatorManInput;
            this.getOperateLog(params);
        };
        ActionLogController.prototype.exportFile = function () {
            var Params = new CasCadeSearchParams();
            Params.orderType = "ASC";
            Params.currentPage = 1;
            Params.pageSize = 10;
            this.maintainFactory.exportTableXls("/pdp/netManagerCtrl/operationLog/export", Params);
        };
        ActionLogController.$inject = ['$scope', 'maintainService', '$timeout', 'userInfoCacheFactory', 'layer', 'maintainFactory'];
        return ActionLogController;
    }());
    main_app_1.app.controller("actionLogController", ActionLogController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbWFpbnRhaW4vb3BlcmF0ZUxvZy9hY3Rpb25Mb2cvYWN0aW9uTG9nLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBbUJBO1FBQUE7UUFTQSxDQUFDO1FBQUQsMEJBQUM7SUFBRCxDQVRBLEFBU0MsSUFBQTtJQVRZLGtEQUFtQjtJQXFCbkIsUUFBQSxTQUFTLEdBQUc7UUFDckIsRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRTtRQUNwRCxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRTtRQUM1QyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRTtRQUM1QyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRTtRQUNoRCxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtRQUNwQyxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFO1FBQ2xELEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFO0tBQ2pELENBQUM7SUFDRjtRQTJCSSw2QkFDWSxNQUFXLEVBQ1gsZUFBaUMsRUFDakMsUUFBYSxFQUNiLG9CQUF5QixFQUN6QixLQUFVLEVBQ1YsZUFBK0I7WUFML0IsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtZQUNqQyxhQUFRLEdBQVIsUUFBUSxDQUFLO1lBQ2IseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFLO1lBQ3pCLFVBQUssR0FBTCxLQUFLLENBQUs7WUFDVixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7WUE1QjNDLGNBQVMsR0FBd0IsaUJBQVMsQ0FBQztZQVEzQyxvQkFBZSxHQUFRLGlDQUFlLENBQUM7WUFPdkMsc0JBQWlCLEdBQWtCLEVBQUUsQ0FB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SUFBSSxtQkFBbUIsRUFBRSxDQUFDO1lBQzVELE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztZQUN4QyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDcEMsTUFBTSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDekIsTUFBTSxDQUFDLFdBQVcsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLE1BQU0sQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztZQUM1QyxNQUFNLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztZQUU1QyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFFTSx3Q0FBVSxHQUFqQjtZQUNJLElBQUksTUFBTSxHQUF3QixJQUFJLG1CQUFtQixFQUFFLENBQUM7WUFDNUQsTUFBTSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDekIsTUFBTSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDdkIsTUFBTSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMseUNBQXlDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDM0YsQ0FBQztRQWhHTSwyQkFBTyxHQUFHLENBQUMsUUFBUSxFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxzQkFBc0IsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQWlHbkgsMEJBQUM7S0FuR0QsQUFtR0MsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMscUJBQXFCLEVBQUUsbUJBQW1CLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvbWFpbnRhaW4vb3BlcmF0ZUxvZy9hY3Rpb25Mb2cvYWN0aW9uTG9nLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSB0aiBvbiAyMDE3LzQvMjQuXHJcbiAqL1xyXG5pbXBvcnQgeyBhcHAgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgXCJhbmd1bGFyXCI7XHJcbmltcG9ydCAnY3NzIW1vZHVsZS9tYWludGFpbi9jc3MvbWFpbnRhaW4tb3BlcmF0ZUxvZy5jc3MnO1xyXG5pbXBvcnQgXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvbWFpbnRhaW4uc2VydmljZVwiXHJcbmltcG9ydCBcIi4uLy4uL2ZhY3Rvcnkvc2VlTG9nLmZhY3RvcnlcIlxyXG5pbXBvcnQgXCIuLi8uLi9tYWluL21haW50YWluRmFjdG9yeVwiXHJcblxyXG5pbXBvcnQgeyBJRWNoYXJ0RmFjdG9yeSB9IGZyb20gXCIuLi8uLi9tYWluL21haW50YWluRmFjdG9yeVwiXHJcbmltcG9ydCB7IElUYWJsZUhlYWRlciB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZGlyZWN0aXZlL3VuaXQtdGFibGUvdGFibGUtcGFyYW1zXCI7XHJcbmltcG9ydCB7IElNYWludGFpblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL21haW50YWluLnNlcnZpY2VcIlxyXG5pbXBvcnQgeyBQYWdlUGFyYW1zQW5kUmVzdWx0LCBJUGFnaW5hdGlvbiwgUGFnaW5hdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vUGFnaW5hdGlvblwiO1xyXG5pbXBvcnQgeyBPcGVyRml0c3RNb2R1bGUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9lbnRpdHkvT3BlckZpcnN0TW9kdWxlXCI7XHJcbmltcG9ydCBQb3J0cmFpdFRvb2wgZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9wb3J0cmFpdC10b29sXCI7XHJcbmltcG9ydCBcIm1vbWVudFwiXHJcbmRlY2xhcmUgbGV0IG1vbWVudDogYW55O1xyXG5cclxuZXhwb3J0IGNsYXNzIENhc0NhZGVTZWFyY2hQYXJhbXMge1xyXG4gICAgc3RhcnRUaW1lOiBzdHJpbmc7XHJcbiAgICBlbmRUaW1lOiBzdHJpbmc7XHJcbiAgICBvcGVyYXRvck1vZHVsZTogc3RyaW5nO1xyXG4gICAgb3BlcmF0b3JVc2VyOiBzdHJpbmc7XHJcbiAgICAvLyBrZXlXb3JkczpzdHJpbmc7XHJcbiAgICBvcmRlclR5cGU6IHN0cmluZztcclxuICAgIGN1cnJlbnRQYWdlOiBudW1iZXI7XHJcbiAgICBwYWdlU2l6ZTogbnVtYmVyO1xyXG59XHJcblxyXG4vLyBleHBvcnQgY2xhc3Mgb3BlcmF0ZUxvZ0xpc3Qge1xyXG4vLyAgICAgdXNlcjogc3RyaW5nO1xyXG4vLyAgICAgYXJlYU5hbWU6IHN0cmluZztcclxuLy8gICAgIHVuaXQ6IHN0cmluZztcclxuLy8gICAgIHRpbWU6IHN0cmluZztcclxuLy8gICAgIElQOiBzdHJpbmc7XHJcbi8vICAgICBtb2R1bGU6IHN0cmluZztcclxuLy8gICAgIERlc2NycHRpb246IHN0cmluZztcclxuLy8gfVxyXG5cclxuZXhwb3J0IGNvbnN0IHRIZWFkTGlzdCA9IFtcclxuICAgIHsgZmllbGQ6IFwiT3BlcmF0b3JVc2VyTmFtZVwiLCB0aXRsZTogXCJGRFNfMDJfMDJfMDNcIiB9LFxyXG4gICAgeyBmaWVsZDogXCJBcmVhTmFtZVwiLCB0aXRsZTogXCJGRFNfMDJfMDBfMDJcIiB9LFxyXG4gICAgeyBmaWVsZDogXCJVbml0TmFtZVwiLCB0aXRsZTogXCJGRFNfMDJfMDFfMDdcIiB9LFxyXG4gICAgeyBmaWVsZDogXCJPcGVyYXRvclRpbWVcIiwgdGl0bGU6IFwiRkRTXzAyXzAyXzA2XCIgfSxcclxuICAgIHsgZmllbGQ6IFwiT3BlcmF0b3JJUFwiLCB0aXRsZTogXCJJUFwiIH0sXHJcbiAgICB7IGZpZWxkOiBcIk9wZXJhdG9yTW9kdWxlXCIsIHRpdGxlOiBcIkZEU18wMl8wMl8wMlwiIH0sXHJcbiAgICB7IGZpZWxkOiBcIkRlc2NycHRpb25cIiwgdGl0bGU6IFwiRkRTXzAyXzAyXzMzXCIgfVxyXG5dO1xyXG5jbGFzcyBBY3Rpb25Mb2dDb250cm9sbGVyIHtcclxuXHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHNjb3BlJywgJ21haW50YWluU2VydmljZScsICckdGltZW91dCcsICd1c2VySW5mb0NhY2hlRmFjdG9yeScsICdsYXllcicsICdtYWludGFpbkZhY3RvcnknXTtcclxuXHJcbiAgICAvLyB0YWJsZSDliJfooajmlbDmja5cclxuICAgIHRIZWFkTGlzdDogQXJyYXk8SVRhYmxlSGVhZGVyPiA9IHRIZWFkTGlzdDtcclxuXHJcbiAgICAvL+afpeivouadoeS7tlxyXG4gICAgaGFuZGxlU3RhcnRUaW1lOiBzdHJpbmc7XHJcbiAgICBoYW5kbGVFbmRUaW1lOiBzdHJpbmc7XHJcbiAgICAvL+aTjeS9nOS6uui+k+WFpVxyXG4gICAgb3BlcmF0b3JNYW5JbnB1dDogc3RyaW5nO1xyXG4gICAgLy/miYDmnInmk43kvZzmqKHlnZdcclxuICAgIE9wZXJGaXRzdE1vZHVsZTogYW55ID0gT3BlckZpdHN0TW9kdWxlO1xyXG4gICAgLy/mk43kvZzmqKHlnZdcclxuICAgIG9wZXJhdG9yTW9kdWxlOiBzdHJpbmc7XHJcblxyXG4gICAgLy/kuIvmi4npgInmi6nnmoTmk43kvZzmqKHlnZdcclxuICAgIC8vIGNoYW5nZU9wZXJhdG9yTW9kdWxlOiBGdW5jdGlvbjtcclxuXHJcbiAgICBhbGxPcGVyYXRvck1vZHVsZTogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cclxuICAgIFBvcnRyYWl0VG9vbDogYW55ID0gUG9ydHJhaXRUb29sO1xyXG5cclxuICAgIFBhZ2VQYXJhbXNBbmRSZXN1bHQ6IFBhZ2VQYXJhbXNBbmRSZXN1bHQgPSBuZXcgUGFnZVBhcmFtc0FuZFJlc3VsdCgpO1xyXG4gICAgUGFnaW5hdGlvbjogSVBhZ2luYXRpb24gPSBuZXcgUGFnaW5hdGlvbigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBtYWludGFpblNlcnZpY2U6IElNYWludGFpblNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogYW55LFxyXG4gICAgICAgIHByaXZhdGUgdXNlckluZm9DYWNoZUZhY3Rvcnk6IGFueSxcclxuICAgICAgICBwcml2YXRlIGxheWVyOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBtYWludGFpbkZhY3Rvcnk6IElFY2hhcnRGYWN0b3J5XHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLmdldE9wZXJhdGVMb2coKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0T3BlcmF0ZU1vZHVsZSgpIHtcclxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLk9wZXJGaXRzdE1vZHVsZSkuZm9yRWFjaCgobW9kdWxlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYWxsT3BlcmF0b3JNb2R1bGUuaW5kZXhPZihtb2R1bGUpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbE9wZXJhdG9yTW9kdWxlLnB1c2godGhpcy5PcGVyRml0c3RNb2R1bGVbbW9kdWxlXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmFsbE9wZXJhdG9yTW9kdWxlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE9wZXJhdGVMb2coY2FzZUNhZGVTZWFyY2hQYXJhbXM/OiBDYXNDYWRlU2VhcmNoUGFyYW1zKSB7XHJcbiAgICAgICAgdGhpcy5nZXRPcGVyYXRlTW9kdWxlKCk7XHJcbiAgICAgICAgbGV0IHRoYXQ6IGFueSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IFBhcmFtczogQ2FzQ2FkZVNlYXJjaFBhcmFtcyA9IG5ldyBDYXNDYWRlU2VhcmNoUGFyYW1zKCk7XHJcbiAgICAgICAgaWYgKCFjYXNlQ2FkZVNlYXJjaFBhcmFtcykge1xyXG4gICAgICAgICAgICBQYXJhbXMub3BlcmF0b3JVc2VyID0gdGhpcy5vcGVyYXRvck1hbklucHV0O1xyXG4gICAgICAgICAgICBQYXJhbXMub3JkZXJUeXBlID0gXCJBU0NcIjtcclxuICAgICAgICAgICAgUGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICAgICAgUGFyYW1zLnBhZ2VTaXplID0gMTA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgUGFyYW1zID0gY2FzZUNhZGVTZWFyY2hQYXJhbXNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubWFpbnRhaW5TZXJ2aWNlLmxvZ01hbmFnZW1lbnQoUGFyYW1zKS50aGVuKGNvbXBsZXRlKTtcclxuICAgICAgICBmdW5jdGlvbiBjb21wbGV0ZShyZXM6IGFueSkge1xyXG4gICAgICAgICAgICBpZiAocmVzICYmIHJlcy5jb2RlID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhOiBhbnkgPSByZXMuZGF0YS5SZXN1bHQgPyByZXMuZGF0YS5SZXN1bHQgOiBbXTtcclxuICAgICAgICAgICAgICAgIHRoYXQuUGFnZVBhcmFtc0FuZFJlc3VsdC5wYWdlU2l6ZSA9IDEwO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5QYWdlUGFyYW1zQW5kUmVzdWx0LmN1cnJlbnRQYWdlID0gUGFyYW1zLmN1cnJlbnRQYWdlO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5QYWdlUGFyYW1zQW5kUmVzdWx0LnBhZ2VDb3VudCA9IE1hdGguY2VpbCh0aGF0LlBhZ2VQYXJhbXNBbmRSZXN1bHQudG90YWxDb3VudCAvIHRoYXQuUGFnZVBhcmFtc0FuZFJlc3VsdC5wYWdlU2l6ZSlcclxuICAgICAgICAgICAgICAgIHRoYXQuUGFnZVBhcmFtc0FuZFJlc3VsdC5kYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIHRoYXQuUGFnZVBhcmFtc0FuZFJlc3VsdC50b3RhbENvdW50ID0gcmVzLmRhdGEuVG90YWxDb3VudDtcclxuICAgICAgICAgICAgICAgIC8v5pCc57SiXHJcbiAgICAgICAgICAgICAgICB0aGF0LnVzZXJUb3RhbENvdW50ID0gcmVzLmRhdGEuVG90YWxDb3VudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hhbmdlUGFnZShudW0/OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5oYW5kbGVTdGFydFRpbWUgPiB0aGlzLmhhbmRsZUVuZFRpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5tc2coXCLlvIDlp4vml7bpl7TkuI3og73lpKfkuo7nu5PmnZ/ml7bpl7RcIik7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcGFyYW1zOiBDYXNDYWRlU2VhcmNoUGFyYW1zID0gbmV3IENhc0NhZGVTZWFyY2hQYXJhbXMoKTtcclxuICAgICAgICBwYXJhbXMuc3RhcnRUaW1lID0gdGhpcy5oYW5kbGVTdGFydFRpbWU7XHJcbiAgICAgICAgcGFyYW1zLmVuZFRpbWUgPSB0aGlzLmhhbmRsZUVuZFRpbWU7XHJcbiAgICAgICAgcGFyYW1zLm9yZGVyVHlwZSA9IFwiQVNDXCI7XHJcbiAgICAgICAgcGFyYW1zLmN1cnJlbnRQYWdlID0gbnVtIHx8IDE7XHJcbiAgICAgICAgcGFyYW1zLnBhZ2VTaXplID0gMTA7XHJcbiAgICAgICAgcGFyYW1zLm9wZXJhdG9yTW9kdWxlID0gdGhpcy5vcGVyYXRvck1vZHVsZTtcclxuICAgICAgICBwYXJhbXMub3BlcmF0b3JVc2VyID0gdGhpcy5vcGVyYXRvck1hbklucHV0O1xyXG5cclxuICAgICAgICB0aGlzLmdldE9wZXJhdGVMb2cocGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXhwb3J0RmlsZSgpIHtcclxuICAgICAgICBsZXQgUGFyYW1zOiBDYXNDYWRlU2VhcmNoUGFyYW1zID0gbmV3IENhc0NhZGVTZWFyY2hQYXJhbXMoKTtcclxuICAgICAgICBQYXJhbXMub3JkZXJUeXBlID0gXCJBU0NcIjtcclxuICAgICAgICBQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIFBhcmFtcy5wYWdlU2l6ZSA9IDEwO1xyXG4gICAgICAgIHRoaXMubWFpbnRhaW5GYWN0b3J5LmV4cG9ydFRhYmxlWGxzKFwiL3BkcC9uZXRNYW5hZ2VyQ3RybC9vcGVyYXRpb25Mb2cvZXhwb3J0XCIsIFBhcmFtcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKFwiYWN0aW9uTG9nQ29udHJvbGxlclwiLCBBY3Rpb25Mb2dDb250cm9sbGVyKTtcclxuXHJcblxyXG5cclxuIl19
