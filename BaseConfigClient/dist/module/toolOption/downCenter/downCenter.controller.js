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
define(["require", "exports", "../../common/app/main.app", "../../common/directive/page/page-params", "../../../core/params/table/TableParams"], function (require, exports, main_app_1, page_params_1, TableParams_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TableListParams = (function (_super) {
        __extends(TableListParams, _super);
        function TableListParams() {
            var _this = _super.call(this) || this;
            _this.pageSize = new page_params_1.default().pageSize;
            _this.currentPage = new page_params_1.default().currentPage;
            return _this;
        }
        ;
        return TableListParams;
    }(TableParams_1.TableParams));
    var CasCadeSearchParams = (function () {
        function CasCadeSearchParams() {
        }
        return CasCadeSearchParams;
    }());
    var DownCenterController = (function () {
        function DownCenterController($scope, $timeout) {
            var vm = this;
            console.error("下载中心");
            vm.pageParams;
            vm.tableListParams = new TableListParams();
            vm.changePage = changePage;
            vm.changePageSize = changePageSize;
            function _getCasCadeSearchParams(tableParams) {
                if (!tableParams)
                    return {};
                var result = new CasCadeSearchParams();
                result.pageIndex = tableParams.currentPage;
                result.pageSize = tableParams.pageSize;
                return result;
            }
            function getTableList() {
                var pageParams = new page_params_1.default();
                pageParams.pageSize = vm.tableListParams.pageSize;
                pageParams.currentPage = vm.tableListParams.currentPage;
                pageParams.totalCount = 10;
                vm.pageParams = pageParams;
            }
            $timeout(function () {
                getTableList();
            });
            function changePage(num) {
                vm.tableListParams.currentPage = num;
                getTableList();
            }
            function changePageSize(num) {
                vm.tableListParams.currentPage = 1;
                vm.tableListParams.pageSize = num;
                getTableList();
            }
        }
        DownCenterController.$inject = ['$scope', '$timeout'];
        return DownCenterController;
    }());
    main_app_1.app.controller('downCenterController', DownCenterController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvdG9vbE9wdGlvbi9kb3duQ2VudGVyL2Rvd25DZW50ZXIuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBVUE7UUFBOEIsbUNBQVc7UUFDckM7WUFBQSxZQUNJLGlCQUFPLFNBR1Y7WUFGRyxLQUFJLENBQUMsUUFBUSxHQUFHLElBQUkscUJBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUMxQyxLQUFJLENBQUMsV0FBVyxHQUFHLElBQUkscUJBQVUsRUFBRSxDQUFDLFdBQVcsQ0FBQzs7UUFDcEQsQ0FBQztRQUFBLENBQUM7UUFDTixzQkFBQztJQUFELENBTkEsQUFNQyxDQU42Qix5QkFBVyxHQU14QztJQUVEO1FBQUE7UUFHQSxDQUFDO1FBQUQsMEJBQUM7SUFBRCxDQUhBLEFBR0MsSUFBQTtJQUVEO1FBVUksOEJBQVksTUFBVyxFQUFDLFFBQVk7WUFDaEMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUV0QixFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ2QsRUFBRSxDQUFDLGVBQWUsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1lBRTNDLEVBQUUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1lBQzNCLEVBQUUsQ0FBQyxjQUFjLEdBQUUsY0FBYyxDQUFDO1lBR2xDLGlDQUFpQyxXQUE0QjtnQkFDekQsRUFBRSxDQUFBLENBQUMsQ0FBQyxXQUFXLENBQUM7b0JBQUMsTUFBTSxDQUFDLEVBQXlCLENBQUM7Z0JBRWxELElBQUksTUFBTSxHQUFHLElBQUksbUJBQW1CLEVBQUUsQ0FBQztnQkFDdkMsTUFBTSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDO2dCQUMzQyxNQUFNLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUM7Z0JBQ3ZDLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDbEIsQ0FBQztZQUdEO2dCQUNJLElBQUksVUFBVSxHQUFHLElBQUkscUJBQVUsRUFBRSxDQUFDO2dCQUNsQyxVQUFVLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDO2dCQUNsRCxVQUFVLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDO2dCQUN4RCxVQUFVLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztnQkFFM0IsRUFBRSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDL0IsQ0FBQztZQUVELFFBQVEsQ0FBQztnQkFDTCxZQUFZLEVBQUUsQ0FBQTtZQUNsQixDQUFDLENBQUMsQ0FBQztZQUVILG9CQUFvQixHQUFXO2dCQUMzQixFQUFFLENBQUMsZUFBZSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7Z0JBQ3JDLFlBQVksRUFBRSxDQUFBO1lBQ2xCLENBQUM7WUFFRCx3QkFBd0IsR0FBVztnQkFDL0IsRUFBRSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQyxFQUFFLENBQUMsZUFBZSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7Z0JBQ2xDLFlBQVksRUFBRSxDQUFBO1lBQ2xCLENBQUM7UUFFTCxDQUFDO1FBdERNLDRCQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUMsVUFBVSxDQUFDLENBQUM7UUF1RDNDLDJCQUFDO0tBeERELEFBd0RDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLHNCQUFzQixFQUFFLG9CQUFvQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL3Rvb2xPcHRpb24vZG93bkNlbnRlci9kb3duQ2VudGVyLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBkZWxsIG9uIDIwMTcvNi8yOS5cclxuICovXHJcblxyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuXHJcbmltcG9ydCB7UmVzcG9uc2VSZXN1bHR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IFBhZ2VQYXJhbXMgZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvcGFnZS9wYWdlLXBhcmFtc1wiO1xyXG5pbXBvcnQge1RhYmxlUGFyYW1zfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvdGFibGUvVGFibGVQYXJhbXNcIjtcclxuXHJcbmNsYXNzIFRhYmxlTGlzdFBhcmFtcyBleHRlbmRzIFRhYmxlUGFyYW1zICB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMucGFnZVNpemUgPSBuZXcgUGFnZVBhcmFtcygpLnBhZ2VTaXplO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBuZXcgUGFnZVBhcmFtcygpLmN1cnJlbnRQYWdlO1xyXG4gICAgfTtcclxufVxyXG5cclxuY2xhc3MgQ2FzQ2FkZVNlYXJjaFBhcmFtcyB7XHJcbiAgICBwYWdlSW5kZXg6IG51bWJlcjtcclxuICAgIHBhZ2VTaXplOiBudW1iZXI7XHJcbn1cclxuXHJcbmNsYXNzIERvd25DZW50ZXJDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCckdGltZW91dCddO1xyXG5cclxuICAgIHRhYmxlTGlzdFBhcmFtczogVGFibGVMaXN0UGFyYW1zO1xyXG4gICAgcGFnZVBhcmFtczogUGFnZVBhcmFtcztcclxuICAgIGNoYW5nZVBhZ2U6IEZ1bmN0aW9uO1xyXG4gICAgY2hhbmdlUGFnZVNpemU6RnVuY3Rpb247XHJcblxyXG4gICAgdGFibGVOb0RhdGE6Ym9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGU6IGFueSwkdGltZW91dDphbnkpIHtcclxuICAgICAgICBsZXQgdm0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCLkuIvovb3kuK3lv4NcIik7XHJcblxyXG4gICAgICAgIHZtLnBhZ2VQYXJhbXM7XHJcbiAgICAgICAgdm0udGFibGVMaXN0UGFyYW1zID0gbmV3IFRhYmxlTGlzdFBhcmFtcygpO1xyXG4gICAgICAgIC8vIOWIhumhteaOp+S7tlxyXG4gICAgICAgIHZtLmNoYW5nZVBhZ2UgPSBjaGFuZ2VQYWdlO1xyXG4gICAgICAgIHZtLmNoYW5nZVBhZ2VTaXplID1jaGFuZ2VQYWdlU2l6ZTtcclxuXHJcbiAgICAgICAgLy8g5ZCR5ZCO5Y+w5Lyg55qE5Y+C5pWwXHJcbiAgICAgICAgZnVuY3Rpb24gX2dldENhc0NhZGVTZWFyY2hQYXJhbXModGFibGVQYXJhbXM6IFRhYmxlTGlzdFBhcmFtcyl7XHJcbiAgICAgICAgICAgIGlmKCF0YWJsZVBhcmFtcykgcmV0dXJuIHt9IGFzIENhc0NhZGVTZWFyY2hQYXJhbXM7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IENhc0NhZGVTZWFyY2hQYXJhbXMoKTtcclxuICAgICAgICAgICAgcmVzdWx0LnBhZ2VJbmRleCA9IHRhYmxlUGFyYW1zLmN1cnJlbnRQYWdlO1xyXG4gICAgICAgICAgICByZXN1bHQucGFnZVNpemUgPSB0YWJsZVBhcmFtcy5wYWdlU2l6ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v6I635Y+W5pWw5o2uXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0VGFibGVMaXN0KCl7XHJcbiAgICAgICAgICAgIGxldCBwYWdlUGFyYW1zID0gbmV3IFBhZ2VQYXJhbXMoKTtcclxuICAgICAgICAgICAgcGFnZVBhcmFtcy5wYWdlU2l6ZSA9IHZtLnRhYmxlTGlzdFBhcmFtcy5wYWdlU2l6ZTtcclxuICAgICAgICAgICAgcGFnZVBhcmFtcy5jdXJyZW50UGFnZSA9IHZtLnRhYmxlTGlzdFBhcmFtcy5jdXJyZW50UGFnZTtcclxuICAgICAgICAgICAgcGFnZVBhcmFtcy50b3RhbENvdW50ID0gMTA7XHJcblxyXG4gICAgICAgICAgICB2bS5wYWdlUGFyYW1zID0gcGFnZVBhcmFtcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICR0aW1lb3V0KCgpID0+e1xyXG4gICAgICAgICAgICBnZXRUYWJsZUxpc3QoKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjaGFuZ2VQYWdlKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHZtLnRhYmxlTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IG51bTtcclxuICAgICAgICAgICAgZ2V0VGFibGVMaXN0KClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNoYW5nZVBhZ2VTaXplKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHZtLnRhYmxlTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgIHZtLnRhYmxlTGlzdFBhcmFtcy5wYWdlU2l6ZSA9IG51bTtcclxuICAgICAgICAgICAgZ2V0VGFibGVMaXN0KClcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcignZG93bkNlbnRlckNvbnRyb2xsZXInLCBEb3duQ2VudGVyQ29udHJvbGxlcik7XHJcbiJdfQ==
