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
define(["require", "exports", "text!./unit.popup.html", "../../common/app/main.app", "../../common/directive/page/page-params", "../../../core/params/UnitParams", "../../common/directive/tree/tree-params", "../../common/services/casecade.service", "css!../css/baseconfig-unit.css", "css!../style/baseconfig-area.css", "../../common/services/unit.service", "../../common/services/area.service", "./unit.popup.controller"], function (require, exports, popupHtml, main_app_1, page_params_1, UnitParams_1, tree_params_1, casecade_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TableParams = (function (_super) {
        __extends(TableParams, _super);
        function TableParams() {
            var _this = _super.call(this) || this;
            _this.currentPage = 1;
            _this.pageSize = 10;
            _this.sortName = 'Code';
            _this.isAsc = false;
            return _this;
        }
        ;
        return TableParams;
    }(UnitParams_1.UnitListParams));
    var BaseConfigUnitController = (function () {
        function BaseConfigUnitController($scope, $timeout, unitService, areaService, layer, casCadeService, i18nFactory) {
            var _this = this;
            this.tableNoData = false;
            this.treeNoData = false;
            var vm = this;
            vm.isSelectItems = false;
            vm.treeSearchInputFunc = treeSearchInputFunc;
            vm.treeSearchInputKeyUp = treeSearchInputKeyUp;
            vm.areaTreeDataParams = new tree_params_1.TreeDataParams();
            vm.areaTreeDataParams.treeId = 'areaTreeArea';
            vm.areaTreeDataParams.isDefaultSelected = true;
            vm.areaTreeDataParams.onClick = treeSelectNode;
            vm.areaTreeDataParams.treeInitComplete = treeInitComplete;
            vm.treeSearchInput;
            vm.currentArea = {};
            vm.tHeadList = [
                { field: "Name", title: "DP_CONFIG_AREA_07" },
                { field: "Code", title: "DP_CONFIG_AREA_08" },
                { field: "Description", title: "DP_CONFIG_AREA_05" },
                { field: "bottoms", title: "DP_CONFIG_COMMON_15" }
            ];
            vm.tBodyList = [];
            vm.editTd = editTd;
            vm.deleteTd = deleteTd;
            vm.pageParams = new page_params_1.default();
            vm.tableListParams = new TableParams();
            vm.tableListParams.sortName = 'Code';
            vm.tableListParams.isAsc = true;
            vm.sortByField = sortByField;
            vm.addUnit = addUnit;
            vm.tableSearchInput;
            vm.tableSearchInputFunc = tableSearchInputFunc;
            vm.tableSearchInputKeyUp = tableSearchInputKeyUp;
            vm.changePage = changePage;
            vm.changePageSize = changePageSize;
            vm.selectedList = [];
            vm.isSelectAll = false;
            vm.afterChangeCheck = afterChangeCheck;
            vm.deleteByIds = deleteByIds;
            $scope.$on("unit.closePopup", function (event, isRefresh) {
                layer.close(_this.currentLayerIndex);
                if (isRefresh) {
                    $timeout(function () {
                        getTableList();
                    }, 2000);
                }
            });
            getTreeList();
            function tableSearchInputFunc() {
                vm.tableListParams.unitName = vm.tableSearchInput;
                vm.tableListParams.currentPage = 1;
                getTableList();
            }
            function tableSearchInputKeyUp(e) {
                if (e.keyCode === 13) {
                    vm.tableListParams.unitName = vm.tableSearchInput;
                    vm.tableListParams.currentPage = 1;
                    getTableList();
                }
            }
            function treeSearchInputFunc() {
                getTreeList();
            }
            function treeSearchInputKeyUp(e) {
                if (e.keyCode === 13) {
                    getTreeList();
                }
            }
            function getTreeList() {
                areaService.findListTree({ keyword: vm.treeSearchInput }).then(complete);
                function complete(data) {
                    $timeout(function () {
                        if (data && data.length > 0) {
                            vm.treeNoData = false;
                        }
                        else {
                            vm.treeNoData = true;
                        }
                        vm.areaTreeDataParams.treeDatas = null;
                    });
                    $timeout(function () {
                        vm.areaTreeDataParams.treeDatas = data;
                    });
                }
            }
            function _getCasCadeSearchParams(tableParams) {
                if (!tableParams)
                    return {};
                var result = new casecade_service_1.CasCadeSearchParams();
                result.pageIndex = tableParams.currentPage;
                result.orderField = tableParams.sortName;
                result.pageSize = tableParams.pageSize;
                result.areaId = tableParams.parentId;
                result.isAsc = false;
                result.name = tableParams.unitName;
                return result;
            }
            function getTableList() {
                casCadeService.findUnitList(_getCasCadeSearchParams(vm.tableListParams)).then(complete).then(initPageParams);
                function complete(res) {
                    if (res && res.code === 200 && res.data) {
                        $timeout(function () {
                            if (res.data && res.data.length > 0) {
                                vm.tableNoData = false;
                                vm.tBodyList = res.data;
                            }
                            else {
                                vm.tableNoData = true;
                                vm.tBodyList = [];
                            }
                        });
                    }
                    return res;
                }
                function initPageParams(data) {
                    var totalCount = (data || {}).count;
                    var pageParams = new page_params_1.default();
                    pageParams.currentPage = vm.tableListParams.currentPage;
                    pageParams.pageSize = vm.tableListParams.pageSize;
                    pageParams.totalCount = totalCount;
                    $timeout(function () {
                        vm.pageParams = pageParams;
                    });
                }
            }
            function changePage(num) {
                vm.tableListParams.currentPage = num;
                getTableList();
            }
            function changePageSize(num) {
                vm.tableListParams.pageSize = num;
                vm.tableListParams.currentPage = 1;
                getTableList();
            }
            function addUnit(area) {
                var scope = $scope.$new();
                scope.curdType = "add";
                scope.currentArea = area;
                vm.currentLayerIndex = layer.open({
                    type: 1,
                    content: popupHtml,
                    scope: scope,
                    title: i18nFactory('DP_CONFIG_COMMON_40'),
                    area: ["500px", "auto"],
                    end: function () {
                        scope.$destroy();
                    }
                });
            }
            function deleteTd(unit) {
                layer.confirm(i18nFactory("DP_CONFIG_COMMON_43"), {
                    icon: 0,
                    title: i18nFactory("DP_CONFIG_COMMON_42"),
                    area: ["500px", "200px"]
                }, function (index) {
                    layer.close(index);
                    submitDeleteUnit(unit);
                });
            }
            function submitDeleteUnit(unit) {
                unitService.deleteById(unit).then(complete);
                function complete(res) {
                    if (res.code === 200) {
                        $timeout(function () {
                            getTreeList();
                        }, 1000);
                    }
                    else {
                    }
                }
            }
            function editTd(unit) {
                var scope = $scope.$new();
                scope.curdType = "edit";
                scope.currentUnit = unit;
                vm.currentLayerIndex = layer.open({
                    type: 1,
                    content: popupHtml,
                    scope: scope,
                    title: i18nFactory("DP_CONFIG_AREA_10"),
                    area: ["500px", "auto"],
                    end: function () {
                        scope.$destroy();
                    }
                });
            }
            function treeInitComplete() {
            }
            function treeSelectNode(event, treeId, treeNode) {
                vm.currentArea = treeNode;
                vm.areaTreeDataParams.defaultSelectTreeId = treeNode.ID;
                vm.tableListParams.parentId = treeNode.ID;
                vm.tableListParams.currentPage = 1;
                getTableList();
            }
            function afterChangeCheck(resultList, isCheckAll) {
                setIsSelectItems(resultList);
                this.selectedList = resultList;
                this.isSelectAll = isCheckAll;
            }
            function getSelectedList() {
                var selectedDataList = [];
                if (vm.selectedList) {
                    vm.tBodyList.forEach(function (_data, _index) {
                        if (vm.selectedList[_index]) {
                            selectedDataList.push(_data);
                        }
                    });
                }
                return selectedDataList;
            }
            function deleteByIds() {
                var selectedDataList = getSelectedList();
                if (!selectedDataList || selectedDataList.length == 0) {
                    layer.msg(i18nFactory("DP_CONFIG_COMMON_84"));
                    return;
                }
                var ids = [];
                selectedDataList.forEach(function (_data) {
                    ids.push(_data.ID);
                });
                layer.confirm(i18nFactory("DP_CONFIG_COMMON_43", { value: ids.length }), {
                    icon: 0,
                    title: i18nFactory('DP_CONFIG_COMMON_42'),
                    area: ["500px", "200px"]
                }, function (index) {
                    layer.close(index);
                    submitDeleteByIds(ids);
                });
            }
            function submitDeleteByIds(ids) {
                unitService.deleteByIds(ids).then(function (resp) {
                    if (resp.code == 200) {
                        vm.tableListParams.currentPage = 1;
                        $timeout(function () {
                            getTableList();
                        }, 1000);
                    }
                    else {
                    }
                });
            }
            function sortByField(index, fieldName, sortStatus) {
                vm.tableListParams.isAsc = sortStatus;
                vm.tableListParams.sortName = fieldName;
                getTableList();
            }
            function setIsSelectItems(items) {
                var result = false;
                if (items && items.length > 0) {
                    var i = void 0, len = void 0;
                    for (i = 0, len = items.length; i < len; i++) {
                        if (items[i]) {
                            result = true;
                            break;
                        }
                    }
                }
                if (vm.isSelectItems !== result) {
                    vm.isSelectItems = result;
                }
            }
        }
        ;
        BaseConfigUnitController.$inject = ['$scope', '$timeout', 'unitService', 'areaService', 'layer', 'casCadeService', 'i18nFactory'];
        return BaseConfigUnitController;
    }());
    main_app_1.app.controller("baseConfigUnitController", BaseConfigUnitController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy91bml0L3VuaXQuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBMkJBO1FBQTBCLCtCQUFjO1FBRXBDO1lBQUEsWUFDSSxpQkFBTyxTQUtWO1lBSkcsS0FBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDckIsS0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDbkIsS0FBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7WUFDdkIsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7O1FBQ3ZCLENBQUM7UUFBQSxDQUFDO1FBQ04sa0JBQUM7SUFBRCxDQVRBLEFBU0MsQ0FUeUIsMkJBQWMsR0FTdkM7SUFFRDtRQThDSSxrQ0FBWSxNQUFXLEVBQUUsUUFBYSxFQUFFLFdBQXlCLEVBQUUsV0FBeUIsRUFBRSxLQUFVLEVBQUUsY0FBK0IsRUFBRSxXQUFnQjtZQUEzSixpQkErVUM7WUE5VkQsZ0JBQVcsR0FBWSxLQUFLLENBQUM7WUFJN0IsZUFBVSxHQUFZLEtBQUssQ0FBQztZQVl4QixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7WUFFZCxFQUFFLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztZQUV6QixFQUFFLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7WUFDN0MsRUFBRSxDQUFDLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDO1lBRS9DLEVBQUUsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLDRCQUFjLEVBQVUsQ0FBQztZQUNyRCxFQUFFLENBQUMsa0JBQWtCLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQztZQUM5QyxFQUFFLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1lBQy9DLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO1lBQy9DLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsR0FBRyxnQkFB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QUUsd0JBQXdCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvYmFzZWNvbmZpZy91bml0L3VuaXQuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gMjAgKiBDcmVhdGVkIGJ5IGRlbGwgb24gMjAxNy80LzEzLlxyXG4gKi9cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuL3VuaXQucG9wdXAuaHRtbFwiIG5hbWU9XCJwb3B1cEh0bWxcIiAvPlxyXG5pbXBvcnQgXCJjc3MhLi4vY3NzL2Jhc2Vjb25maWctdW5pdC5jc3NcIjtcclxuaW1wb3J0IFwiY3NzIS4uL3N0eWxlL2Jhc2Vjb25maWctYXJlYS5jc3NcIjtcclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL3VuaXQuc2VydmljZSc7XHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FyZWEuc2VydmljZSc7XHJcbmltcG9ydCBcIi4vdW5pdC5wb3B1cC5jb250cm9sbGVyXCI7XHJcbmltcG9ydCBQYWdlUGFyYW1zIGZyb20gXCIuLi8uLi9jb21tb24vZGlyZWN0aXZlL3BhZ2UvcGFnZS1wYXJhbXNcIjtcclxuaW1wb3J0IHtVbml0TGlzdFBhcmFtc30gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL1VuaXRQYXJhbXNcIlxyXG5pbXBvcnQge1VuaXR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9Vbml0XCI7XHJcbmltcG9ydCB7VW5pdEV4fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvVW5pdEV4XCI7XHJcbmltcG9ydCB7QXJlYX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L0FyZWFcIjtcclxuaW1wb3J0IHtBcmVhRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9BcmVhRXhcIjtcclxuaW1wb3J0IHtQYWdlUmVzdWx0LCBSZXNwb25zZVJlc3VsdH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdFwiXHJcbmltcG9ydCB7VHJlZVBhcmFtc30gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3RyZWUvVHJlZVBhcmFtc1wiO1xyXG5pbXBvcnQge0lVbml0U2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy91bml0LnNlcnZpY2VcIjtcclxuaW1wb3J0IHtJQXJlYVNlcnZpY2V9IGZyb20gXCIuLi8uLi9jb21tb24vc2VydmljZXMvYXJlYS5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQge0lUYWJsZUhlYWRlcn0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdW5pdC10YWJsZS90YWJsZS1wYXJhbXNcIjtcclxuaW1wb3J0IHtJVHJlZURhdGFQYXJhbXMsIFRyZWVEYXRhUGFyYW1zfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUtcGFyYW1zXCI7XHJcbmltcG9ydCB7SUNhc0NhZGVTZXJ2aWNlLCBDYXNDYWRlU2VhcmNoUGFyYW1zfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2Nhc2VjYWRlLnNlcnZpY2VcIjtcclxuXHJcbmRlY2xhcmUgdmFyIHBvcHVwSHRtbDogYW55O1xyXG5cclxuY2xhc3MgVGFibGVQYXJhbXMgZXh0ZW5kcyBVbml0TGlzdFBhcmFtcyB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICB0aGlzLnBhZ2VTaXplID0gMTA7XHJcbiAgICAgICAgdGhpcy5zb3J0TmFtZSA9ICdDb2RlJztcclxuICAgICAgICB0aGlzLmlzQXNjID0gZmFsc2U7XHJcbiAgICB9O1xyXG59XHJcblxyXG5jbGFzcyBCYXNlQ29uZmlnVW5pdENvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsICckdGltZW91dCcsICd1bml0U2VydmljZScsICdhcmVhU2VydmljZScsICdsYXllcicsICdjYXNDYWRlU2VydmljZScsICdpMThuRmFjdG9yeSddO1xyXG5cclxuICAgIC8vIOagkeaOp+S7tuebuOWFs1xyXG5cclxuICAgIHRyZWVTZWFyY2hJbnB1dDogc3RyaW5nO1xyXG4gICAgdHJlZVNlYXJjaElucHV0RnVuYzogKCk9PnZvaWQ7XHJcbiAgICB0cmVlU2VhcmNoSW5wdXRLZXlVcDogKCRldmVudDogRXZlbnQpPT52b2lkO1xyXG5cclxuICAgIGVkaXRUZDogRnVuY3Rpb247XHJcbiAgICBkZWxldGVUZDogRnVuY3Rpb247XHJcbiAgICBwYWdlUGFyYW1zOiBQYWdlUGFyYW1zO1xyXG4gICAgY3VycmVudFVuaXQ6IFVuaXQ7XHJcbiAgICB0YWJsZUxpc3RQYXJhbXM6IFRhYmxlUGFyYW1zO1xyXG4gICAgY2hhbmdlUGFnZTogRnVuY3Rpb247XHJcbiAgICBjaGFuZ2VQYWdlU2l6ZTogKG51bTogbnVtYmVyKT0+dm9pZDtcclxuICAgIGN1cnJlbnRBcmVhOiBBcmVhO1xyXG4gICAgYWRkVW5pdDogRnVuY3Rpb247XHJcbiAgICBjdXJyZW50TGF5ZXJJbmRleDogbnVtYmVyO1xyXG4gICAgdGFibGVTZWFyY2hJbnB1dDogc3RyaW5nO1xyXG5cclxuXHJcbiAgICAvLyB0YWJsZSDliJfooajmlbDmja5cclxuICAgIHRIZWFkTGlzdDogQXJyYXk8SVRhYmxlSGVhZGVyPjtcclxuICAgIHRCb2R5TGlzdDogQXJyYXk8VW5pdD47XHJcbiAgICB0YWJsZVNlYXJjaElucHV0RnVuYzogKCk9PnZvaWQ7XHJcbiAgICB0YWJsZVNlYXJjaElucHV0S2V5VXA6ICgkZXZlbnQ6IEtleWJvYXJkRXZlbnQpPT52b2lkO1xyXG4gICAgLy8g5o6S5bqP5Zue6LCDXHJcbiAgICBzb3J0QnlGaWVsZDogRnVuY3Rpb247XHJcblxyXG5cclxuICAgIHRhYmxlTm9EYXRhOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLy8gLy8g6YCJ5oup6KGM5pS/5Yy65Z+f5qCRXHJcbiAgICBhcmVhVHJlZURhdGFQYXJhbXM6IElUcmVlRGF0YVBhcmFtczxBcmVhRXg+O1xyXG4gICAgdHJlZU5vRGF0YTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8v5aSa6YCJ55u45YWzXHJcbiAgICBzZWxlY3RlZExpc3Q6IEFycmF5PGJvb2xlYW4+O1xyXG4gICAgaXNTZWxlY3RBbGw6IGJvb2xlYW47XHJcbiAgICBhZnRlckNoYW5nZUNoZWNrOiBGdW5jdGlvbjtcclxuICAgIGRlbGV0ZUJ5SWRzOiBGdW5jdGlvbjtcclxuXHJcbiAgICAvLyDliJfooajmmK/lkKbmnInpgInkuK3poblcclxuICAgIGlzU2VsZWN0SXRlbXM6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IoJHNjb3BlOiBhbnksICR0aW1lb3V0OiBhbnksIHVuaXRTZXJ2aWNlOiBJVW5pdFNlcnZpY2UsIGFyZWFTZXJ2aWNlOiBJQXJlYVNlcnZpY2UsIGxheWVyOiBhbnksIGNhc0NhZGVTZXJ2aWNlOiBJQ2FzQ2FkZVNlcnZpY2UsIGkxOG5GYWN0b3J5OiBhbnkpIHtcclxuICAgICAgICBsZXQgdm0gPSB0aGlzO1xyXG5cclxuICAgICAgICB2bS5pc1NlbGVjdEl0ZW1zID0gZmFsc2U7XHJcbiAgICAgICAgLy8g5qCR5YiX6KGo5pWw5o2uXHJcbiAgICAgICAgdm0udHJlZVNlYXJjaElucHV0RnVuYyA9IHRyZWVTZWFyY2hJbnB1dEZ1bmM7XHJcbiAgICAgICAgdm0udHJlZVNlYXJjaElucHV0S2V5VXAgPSB0cmVlU2VhcmNoSW5wdXRLZXlVcDtcclxuICAgICAgICAvL+WIneWni+WMliBhcmVhIOagkeaVsOaNrlxyXG4gICAgICAgIHZtLmFyZWFUcmVlRGF0YVBhcmFtcyA9IG5ldyBUcmVlRGF0YVBhcmFtczxBcmVhRXg+KCk7XHJcbiAgICAgICAgdm0uYXJlYVRyZWVEYXRhUGFyYW1zLnRyZWVJZCA9ICdhcmVhVHJlZUFyZWEnO1xyXG4gICAgICAgIHZtLmFyZWFUcmVlRGF0YVBhcmFtcy5pc0RlZmF1bHRTZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgdm0uYXJlYVRyZWVEYXRhUGFyYW1zLm9uQ2xpY2sgPSB0cmVlU2VsZWN0Tm9kZTtcclxuICAgICAgICB2bS5hcmVhVHJlZURhdGFQYXJhbXMudHJlZUluaXRDb21wbGV0ZSA9IHRyZWVJbml0Q29tcGxldGU7XHJcblxyXG4gICAgICAgIHZtLnRyZWVTZWFyY2hJbnB1dDtcclxuICAgICAgICB2bS5jdXJyZW50QXJlYSA9IHt9IGFzIEFyZWE7XHJcblxyXG5cclxuICAgICAgICAvLyDooajmoLzmlbDmja5cclxuICAgICAgICAvLy0tLS0tLS0tLS0tLS1cclxuICAgICAgICB2bS50SGVhZExpc3QgPSBbXHJcbiAgICAgICAgICAgIHtmaWVsZDogXCJOYW1lXCIsIHRpdGxlOiBcIkRQX0NPTkZJR19BUkVBXzA3XCJ9LFxyXG4gICAgICAgICAgICB7ZmllbGQ6IFwiQ29kZVwiLCB0aXRsZTogXCJEUF9DT05GSUdfQVJFQV8wOFwifSxcclxuICAgICAgICAgICAge2ZpZWxkOiBcIkRlc2NyaXB0aW9uXCIsIHRpdGxlOiBcIkRQX0NPTkZJR19BUkVBXzA1XCJ9LFxyXG4gICAgICAgICAgICB7ZmllbGQ6IFwiYm90dG9tc1wiLCB0aXRsZTogXCJEUF9DT05GSUdfQ09NTU9OXzE1XCJ9XHJcbiAgICAgICAgXTtcclxuICAgICAgICB2bS50Qm9keUxpc3QgPSBbXTtcclxuXHJcbiAgICAgICAgLy8g6KGo5qC85pWw5o2uXHJcbiAgICAgICAgdm0uZWRpdFRkID0gZWRpdFRkO1xyXG4gICAgICAgIHZtLmRlbGV0ZVRkID0gZGVsZXRlVGQ7XHJcbiAgICAgICAgdm0ucGFnZVBhcmFtcyA9IG5ldyBQYWdlUGFyYW1zKCk7XHJcbiAgICAgICAgdm0udGFibGVMaXN0UGFyYW1zID0gbmV3IFRhYmxlUGFyYW1zKCk7XHJcblxyXG4gICAgICAgIC8v6L+95Yqg5o6S5bqP5Y+C5pWwXHJcbiAgICAgICAgdm0udGFibGVMaXN0UGFyYW1zLnNvcnROYW1lID0gJ0NvZGUnO1xyXG4gICAgICAgIHZtLnRhYmxlTGlzdFBhcmFtcy5pc0FzYyA9IHRydWU7XHJcbiAgICAgICAgdm0uc29ydEJ5RmllbGQgPSBzb3J0QnlGaWVsZDtcclxuXHJcbiAgICAgICAgdm0uYWRkVW5pdCA9IGFkZFVuaXQ7XHJcbiAgICAgICAgdm0udGFibGVTZWFyY2hJbnB1dDtcclxuICAgICAgICB2bS50YWJsZVNlYXJjaElucHV0RnVuYyA9IHRhYmxlU2VhcmNoSW5wdXRGdW5jO1xyXG4gICAgICAgIHZtLnRhYmxlU2VhcmNoSW5wdXRLZXlVcCA9IHRhYmxlU2VhcmNoSW5wdXRLZXlVcDtcclxuXHJcbiAgICAgICAgLy8g5YiG6aG15o6n5Lu2XHJcbiAgICAgICAgdm0uY2hhbmdlUGFnZSA9IGNoYW5nZVBhZ2U7XHJcbiAgICAgICAgdm0uY2hhbmdlUGFnZVNpemUgPSBjaGFuZ2VQYWdlU2l6ZTtcclxuXHJcbiAgICAgICAgLy/lpJrpgInnm7jlhbNcclxuICAgICAgICB2bS5zZWxlY3RlZExpc3QgPSBbXTtcclxuICAgICAgICB2bS5pc1NlbGVjdEFsbCA9IGZhbHNlO1xyXG4gICAgICAgIHZtLmFmdGVyQ2hhbmdlQ2hlY2sgPSBhZnRlckNoYW5nZUNoZWNrO1xyXG4gICAgICAgIHZtLmRlbGV0ZUJ5SWRzID0gZGVsZXRlQnlJZHM7XHJcblxyXG4gICAgICAgICRzY29wZS4kb24oXCJ1bml0LmNsb3NlUG9wdXBcIiwgKGV2ZW50OiBhbnksIGlzUmVmcmVzaD86IGJvb2xlYW4pID0+e1xyXG4gICAgICAgICAgICBsYXllci5jbG9zZSh0aGlzLmN1cnJlbnRMYXllckluZGV4KTtcclxuICAgICAgICAgICAgaWYgKGlzUmVmcmVzaCkge1xyXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBnZXRUYWJsZUxpc3QoKVxyXG4gICAgICAgICAgICAgICAgfSwyMDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDpobXpnaLmuLLmn5PlhaXlj6NcclxuICAgICAgICBnZXRUcmVlTGlzdCgpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB0YWJsZVNlYXJjaElucHV0RnVuYygpIHtcclxuICAgICAgICAgICAgdm0udGFibGVMaXN0UGFyYW1zLnVuaXROYW1lID0gdm0udGFibGVTZWFyY2hJbnB1dDtcclxuICAgICAgICAgICAgdm0udGFibGVMaXN0UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICAgICAgZ2V0VGFibGVMaXN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB0YWJsZVNlYXJjaElucHV0S2V5VXAoZTogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xyXG4gICAgICAgICAgICAgICAgdm0udGFibGVMaXN0UGFyYW1zLnVuaXROYW1lID0gdm0udGFibGVTZWFyY2hJbnB1dDtcclxuICAgICAgICAgICAgICAgIHZtLnRhYmxlTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICBnZXRUYWJsZUxpc3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdHJlZVNlYXJjaElucHV0RnVuYygpIHtcclxuICAgICAgICAgICAgZ2V0VHJlZUxpc3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRyZWVTZWFyY2hJbnB1dEtleVVwKGU6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICAgICAgICAgICAgIGdldFRyZWVMaXN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldFRyZWVMaXN0KCkge1xyXG4gICAgICAgICAgICBhcmVhU2VydmljZS5maW5kTGlzdFRyZWUoe2tleXdvcmQ6IHZtLnRyZWVTZWFyY2hJbnB1dH0gYXMgVHJlZVBhcmFtcykudGhlbihjb21wbGV0ZSk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBjb21wbGV0ZShkYXRhOiBBcnJheTxBcmVhRXg+KSB7XHJcbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g55Sx5LqOcmVzLkRhdGHlgLzmsqHlj5jvvIzkuLrkuobop6blj5HmoJHliLfmlrAsIOWImeaJi+WKqGhhY2vop6blj5FcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0udHJlZU5vRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLnRyZWVOb0RhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2bS5hcmVhVHJlZURhdGFQYXJhbXMudHJlZURhdGFzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2bS5hcmVhVHJlZURhdGFQYXJhbXMudHJlZURhdGFzID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfZ2V0Q2FzQ2FkZVNlYXJjaFBhcmFtcyh0YWJsZVBhcmFtczogVGFibGVQYXJhbXMpIHtcclxuICAgICAgICAgICAgaWYgKCF0YWJsZVBhcmFtcykgcmV0dXJuIHt9IGFzIENhc0NhZGVTZWFyY2hQYXJhbXM7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBuZXcgQ2FzQ2FkZVNlYXJjaFBhcmFtcygpO1xyXG4gICAgICAgICAgICByZXN1bHQucGFnZUluZGV4ID0gdGFibGVQYXJhbXMuY3VycmVudFBhZ2U7XHJcbiAgICAgICAgICAgIHJlc3VsdC5vcmRlckZpZWxkID0gdGFibGVQYXJhbXMuc29ydE5hbWU7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wYWdlU2l6ZSA9IHRhYmxlUGFyYW1zLnBhZ2VTaXplO1xyXG4gICAgICAgICAgICByZXN1bHQuYXJlYUlkID0gdGFibGVQYXJhbXMucGFyZW50SWQ7XHJcbiAgICAgICAgICAgIHJlc3VsdC5pc0FzYyA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXN1bHQubmFtZSA9IHRhYmxlUGFyYW1zLnVuaXROYW1lO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0VGFibGVMaXN0KCkge1xyXG5cclxuICAgICAgICAgICAgY2FzQ2FkZVNlcnZpY2UuZmluZFVuaXRMaXN0KF9nZXRDYXNDYWRlU2VhcmNoUGFyYW1zKHZtLnRhYmxlTGlzdFBhcmFtcykpLnRoZW4oY29tcGxldGUpLnRoZW4oaW5pdFBhZ2VQYXJhbXMpO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gY29tcGxldGUocmVzOiBSZXNwb25zZVJlc3VsdDxBcnJheTxVbml0Pj4pIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmNvZGUgPT09IDIwMCAmJiByZXMuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhICYmIHJlcy5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLnRhYmxlTm9EYXRhID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS50Qm9keUxpc3QgPSByZXMuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLnRhYmxlTm9EYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLnRCb2R5TGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyDmuLLmn5PliIbpobVcclxuICAgICAgICAgICAgZnVuY3Rpb24gaW5pdFBhZ2VQYXJhbXMoZGF0YTogUmVzcG9uc2VSZXN1bHQ8QXJyYXk8VW5pdD4+KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG90YWxDb3VudCA9IChkYXRhIHx8IHt9IGFzIFJlc3BvbnNlUmVzdWx0PEFycmF5PFVuaXQ+PikuY291bnQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGFnZVBhcmFtcyA9IG5ldyBQYWdlUGFyYW1zKCk7XHJcbiAgICAgICAgICAgICAgICBwYWdlUGFyYW1zLmN1cnJlbnRQYWdlID0gdm0udGFibGVMaXN0UGFyYW1zLmN1cnJlbnRQYWdlO1xyXG4gICAgICAgICAgICAgICAgcGFnZVBhcmFtcy5wYWdlU2l6ZSA9IHZtLnRhYmxlTGlzdFBhcmFtcy5wYWdlU2l6ZTtcclxuICAgICAgICAgICAgICAgIHBhZ2VQYXJhbXMudG90YWxDb3VudCA9IHRvdGFsQ291bnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoKCk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0ucGFnZVBhcmFtcyA9IHBhZ2VQYXJhbXM7IC8vIOS8muinpuWPkeaPkuS7tuS4reeahOabtOaWsOaTjeS9nFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGZ1bmN0aW9uIGNsb3NlVW5pdFBvcHVwKGV2ZW50OiBhbnksIGlzUmVmcmVzaD86IGJvb2xlYW4pIHtcclxuICAgICAgICAvLyAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAvLyAgICAgbGF5ZXIuY2xvc2Uodm0uY3VycmVudExheWVySW5kZXgpO1xyXG4gICAgICAgIC8vICAgICBpZiAoaXNSZWZyZXNoKSB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLiR0aW1lb3V0KCgpPT57XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgZ2V0VHJlZUxpc3QoKTtcclxuICAgICAgICAvLyAgICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNoYW5nZVBhZ2UobnVtOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdm0udGFibGVMaXN0UGFyYW1zLmN1cnJlbnRQYWdlID0gbnVtO1xyXG4gICAgICAgICAgICBnZXRUYWJsZUxpc3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNoYW5nZVBhZ2VTaXplKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHZtLnRhYmxlTGlzdFBhcmFtcy5wYWdlU2l6ZSA9IG51bTtcclxuICAgICAgICAgICAgdm0udGFibGVMaXN0UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICAgICAgZ2V0VGFibGVMaXN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGRVbml0KGFyZWE6IEFyZWEpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBzY29wZToge2N1cmRUeXBlOiBzdHJpbmcsIGN1cnJlbnRBcmVhOiBBcmVhLCAkZGVzdHJveTogRnVuY3Rpb259ID0gJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICAgICAgc2NvcGUuY3VyZFR5cGUgPSBcImFkZFwiO1xyXG4gICAgICAgICAgICBzY29wZS5jdXJyZW50QXJlYSA9IGFyZWE7XHJcblxyXG4gICAgICAgICAgICB2bS5jdXJyZW50TGF5ZXJJbmRleCA9IGxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHBvcHVwSHRtbCxcclxuICAgICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuRmFjdG9yeSgnRFBfQ09ORklHX0NPTU1PTl80MCcpLFxyXG4gICAgICAgICAgICAgICAgYXJlYTogW1wiNTAwcHhcIiwgXCJhdXRvXCJdLFxyXG4gICAgICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBkZWxldGVUZCh1bml0OiBVbml0RXgpIHtcclxuICAgICAgICAgICAgbGF5ZXIuY29uZmlybShpMThuRmFjdG9yeShcIkRQX0NPTkZJR19DT01NT05fNDNcIiksIHtcclxuICAgICAgICAgICAgICAgIGljb246IDAsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bkZhY3RvcnkoXCJEUF9DT05GSUdfQ09NTU9OXzQyXCIpLFxyXG4gICAgICAgICAgICAgICAgYXJlYTogW1wiNTAwcHhcIiwgXCIyMDBweFwiXVxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgbGF5ZXIuY2xvc2UoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgc3VibWl0RGVsZXRlVW5pdCh1bml0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzdWJtaXREZWxldGVVbml0KHVuaXQ6IFVuaXRFeCkge1xyXG4gICAgICAgICAgICB1bml0U2VydmljZS5kZWxldGVCeUlkKHVuaXQpLnRoZW4oY29tcGxldGUpO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gY29tcGxldGUocmVzOiBSZXNwb25zZVJlc3VsdDxzdHJpbmc+KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldFRyZWVMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwxMDAwKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZWRpdFRkKHVuaXQ6IFVuaXQpIHtcclxuICAgICAgICAgICAgbGV0IHNjb3BlOiB7Y3VyZFR5cGU6IHN0cmluZywgY3VycmVudFVuaXQ6IFVuaXQsICRkZXN0cm95OiBGdW5jdGlvbn0gPSAkc2NvcGUuJG5ldygpO1xyXG4gICAgICAgICAgICBzY29wZS5jdXJkVHlwZSA9IFwiZWRpdFwiO1xyXG4gICAgICAgICAgICBzY29wZS5jdXJyZW50VW5pdCA9IHVuaXQgYXMgVW5pdDtcclxuXHJcbiAgICAgICAgICAgIHZtLmN1cnJlbnRMYXllckluZGV4ID0gbGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogcG9wdXBIdG1sLFxyXG4gICAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGkxOG5GYWN0b3J5KFwiRFBfQ09ORklHX0FSRUFfMTBcIiksXHJcbiAgICAgICAgICAgICAgICBhcmVhOiBbXCI1MDBweFwiLCBcImF1dG9cIl0sXHJcbiAgICAgICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRyZWVJbml0Q29tcGxldGUoKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB0cmVlU2VsZWN0Tm9kZShldmVudDogTW91c2VFdmVudCwgdHJlZUlkOiBzdHJpbmcsIHRyZWVOb2RlOiBBcmVhKSB7XHJcbiAgICAgICAgICAgIHZtLmN1cnJlbnRBcmVhID0gdHJlZU5vZGU7XHJcblxyXG4gICAgICAgICAgICB2bS5hcmVhVHJlZURhdGFQYXJhbXMuZGVmYXVsdFNlbGVjdFRyZWVJZCA9IHRyZWVOb2RlLklEO1xyXG5cclxuICAgICAgICAgICAgdm0udGFibGVMaXN0UGFyYW1zLnBhcmVudElkID0gdHJlZU5vZGUuSUQ7XHJcbiAgICAgICAgICAgIHZtLnRhYmxlTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgIGdldFRhYmxlTGlzdCgpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vIOaJk+mSqSDpgInmi6kg5Zue6LCDXHJcbiAgICAgICAgZnVuY3Rpb24gYWZ0ZXJDaGFuZ2VDaGVjayhyZXN1bHRMaXN0OiBBcnJheTxib29sZWFuPiwgaXNDaGVja0FsbDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgICAgICBzZXRJc1NlbGVjdEl0ZW1zKHJlc3VsdExpc3QpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkTGlzdCA9IHJlc3VsdExpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMuaXNTZWxlY3RBbGwgPSBpc0NoZWNrQWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/ojrflj5blvZPliY3lt7LooqvpgInkuK3liJfooahcclxuICAgICAgICBmdW5jdGlvbiBnZXRTZWxlY3RlZExpc3QoKTogQXJyYXk8VW5pdD4ge1xyXG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWREYXRhTGlzdDogQXJyYXk8VW5pdD4gPSBbXTtcclxuICAgICAgICAgICAgaWYgKHZtLnNlbGVjdGVkTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgdm0udEJvZHlMaXN0LmZvckVhY2goKF9kYXRhOiBVbml0LCBfaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2bS5zZWxlY3RlZExpc3RbX2luZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZERhdGFMaXN0LnB1c2goX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZERhdGFMaXN0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/lpJrkuKrliKDpmaRcclxuICAgICAgICBmdW5jdGlvbiBkZWxldGVCeUlkcygpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZERhdGFMaXN0OiBBcnJheTxVbml0PiA9IGdldFNlbGVjdGVkTGlzdCgpO1xyXG4gICAgICAgICAgICBpZiAoIXNlbGVjdGVkRGF0YUxpc3QgfHwgc2VsZWN0ZWREYXRhTGlzdC5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbGF5ZXIubXNnKGkxOG5GYWN0b3J5KFwiRFBfQ09ORklHX0NPTU1PTl84NFwiKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGlkczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cclxuICAgICAgICAgICAgc2VsZWN0ZWREYXRhTGlzdC5mb3JFYWNoKChfZGF0YTogVW5pdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWRzLnB1c2goX2RhdGEuSUQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vbGV0IHNob3dUZXh0ID0gYOehruWumuimgeWIoOmZpOmAieS4reeahCAkeyBpZHMubGVuZ3RoIH0g5p2h6KGM5pS/5Y2V5L2N5ZCXP+WIoOmZpOatpOihjOaUv+WNleS9jeS8mue6p+iBlOWIoOmZpOaJgOacieWFs+iBlOeahOaVsOaNrijljIXlkKvmnI3liqEs6YWN572u562JKSBgO1xyXG4gICAgICAgICAgICBsYXllci5jb25maXJtKGkxOG5GYWN0b3J5KFwiRFBfQ09ORklHX0NPTU1PTl80M1wiLCB7dmFsdWU6IGlkcy5sZW5ndGh9KSwge1xyXG4gICAgICAgICAgICAgICAgaWNvbjogMCxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuRmFjdG9yeSgnRFBfQ09ORklHX0NPTU1PTl80MicpLFxyXG4gICAgICAgICAgICAgICAgYXJlYTogW1wiNTAwcHhcIiwgXCIyMDBweFwiXVxyXG4gICAgICAgICAgICB9LCAoaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGF5ZXIuY2xvc2UoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgc3VibWl0RGVsZXRlQnlJZHMoaWRzKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/mj5DkuqTliKDpmaRcclxuICAgICAgICBmdW5jdGlvbiBzdWJtaXREZWxldGVCeUlkcyhpZHM6IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICAgICAgdW5pdFNlcnZpY2UuZGVsZXRlQnlJZHMoaWRzKS50aGVuKChyZXNwOiBSZXNwb25zZVJlc3VsdDxzdHJpbmc+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcC5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLnRhYmxlTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0VGFibGVMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwxMDAwKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g5o6S5bqPXHJcbiAgICAgICAgZnVuY3Rpb24gc29ydEJ5RmllbGQoaW5kZXg6IG51bWJlciwgZmllbGROYW1lOiBzdHJpbmcsIHNvcnRTdGF0dXM6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgdm0udGFibGVMaXN0UGFyYW1zLmlzQXNjID0gc29ydFN0YXR1cztcclxuICAgICAgICAgICAgdm0udGFibGVMaXN0UGFyYW1zLnNvcnROYW1lID0gZmllbGROYW1lO1xyXG4gICAgICAgICAgICBnZXRUYWJsZUxpc3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGNyZWF0b3Igd3lyOiDliKTmlq3lkozorr7nva7lvZPliY3liJfooajmmK/lkKbmnInpgInkuK3nmoTlhYPntKBcclxuICAgICAgICAgKiBAcGFyYW0gaXRlbXNcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBzZXRJc1NlbGVjdEl0ZW1zKGl0ZW1zOiBBcnJheTxib29sZWFuPil7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYoaXRlbXMgJiYgaXRlbXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaSxsZW47XHJcbiAgICAgICAgICAgICAgICBmb3IoaT0wLGxlbj1pdGVtcy5sZW5ndGg7aTxsZW47aSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihpdGVtc1tpXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih2bS5pc1NlbGVjdEl0ZW1zICE9PSByZXN1bHQpe1xyXG4gICAgICAgICAgICAgICAgdm0uaXNTZWxlY3RJdGVtcyA9IHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKFwiYmFzZUNvbmZpZ1VuaXRDb250cm9sbGVyXCIsIEJhc2VDb25maWdVbml0Q29udHJvbGxlcik7Il19
