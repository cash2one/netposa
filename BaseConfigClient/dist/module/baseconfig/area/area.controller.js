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
define(["require", "exports", "text!./area.popup.html", "../../common/app/main.app", "../../common/directive/page/page-params", "../../common/directive/tree/tree-params", "../../../core/params/AreaParams", "../../common/services/casecade.service", "css!../css/baseconfig-area.css", "css!../style/baseconfig-area.css", "./area.popup.controller", "../../common/services/area.service"], function (require, exports, popupHtml, main_app_1, page_params_1, tree_params_1, AreaParams_1, casecade_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TableListParams = (function (_super) {
        __extends(TableListParams, _super);
        function TableListParams() {
            var _this = _super.call(this) || this;
            _this.sortName = 'Code';
            _this.isAsc = false;
            _this.pageSize = new page_params_1.default().pageSize;
            _this.currentPage = new page_params_1.default().currentPage;
            return _this;
        }
        ;
        return TableListParams;
    }(AreaParams_1.AreaTableParams));
    var BaseConfigAreaController = (function () {
        function BaseConfigAreaController($scope, $timeout, areaService, layer, casCadeService, i18nFactory) {
            this.tableNoData = false;
            this.treeNoData = false;
            var vm = this;
            vm.areaTreeDataParams = new tree_params_1.TreeDataParams();
            vm.areaTreeDataParams.treeId = 'areaTreeArea';
            vm.areaTreeDataParams.isDefaultSelected = true;
            vm.areaTreeDataParams.onClick = treeSelectNode;
            vm.areaTreeDataParams.treeInitComplete = treeInitComplete;
            vm.treeSearchInput;
            vm.treeSearchInputFunc = treeSearchInputFunc;
            vm.treeSearchInputKeyUp = treeSearchInputKeyUp;
            vm.tHeadList = [
                { field: "Name", title: "DP_CONFIG_COMMON_32" },
                { field: "Code", title: "DP_CONFIG_COMMON_33" },
                { field: "Description", title: "DP_CONFIG_COMMON_34" },
                { field: "bottoms", title: "DP_CONFIG_COMMON_35" }
            ];
            vm.tBodyList = [];
            vm.isSelectItems = false;
            vm.editAreaTd = editAreaTd;
            vm.deleteAreaTd = deleteAreaTd;
            vm.pageParams;
            vm.currentArea = {};
            vm.tableListParams = new TableListParams();
            vm.tableListParams.sortName = 'Code';
            vm.tableListParams.isAsc = true;
            vm.sortByField = sortByField;
            vm.tableSearchInput;
            vm.tableSearchInputFunc = tableSearchInputFunc;
            vm.tableSearchInputKeyUp = tableSearchInputKeyUp;
            vm.changePage = changePage;
            vm.changePageSize = changePageSize;
            vm.selectedList = [];
            vm.isSelectAll = false;
            vm.afterChangeCheck = afterChangeCheck;
            vm.deleteByIds = deleteByIds;
            vm.editArea = editArea;
            vm.addArea = addArea;
            vm.deleteArea = deleteArea;
            $scope.$on("area.closePopup", function (event, isRefresh) {
                layer.close(vm.currentLayerIndex);
                if (isRefresh) {
                    getTreeList();
                }
            });
            getTreeList();
            function treeSearchInputKeyUp(e) {
                if (e.keyCode === 13) {
                    getTreeList();
                }
            }
            function tableSearchInputKeyUp(e) {
                if (e.keyCode === 13) {
                    vm.tableListParams.areaName = vm.tableSearchInput;
                    vm.tableListParams.currentPage = 1;
                    getTableList();
                }
            }
            function treeSearchInputFunc() {
                getTreeList();
            }
            function tableSearchInputFunc() {
                vm.tableListParams.areaName = vm.tableSearchInput;
                vm.tableListParams.currentPage = 1;
                getTableList();
            }
            function addArea(area) {
                var scope = $scope.$new();
                scope.curdType = 'add';
                scope.currentArea = area;
                vm.currentLayerIndex = layer.open({
                    type: 1,
                    content: popupHtml,
                    scope: scope,
                    skin: "no-scroll",
                    title: i18nFactory('DP_CONFIG_COMMON_40'),
                    area: ["450px", "auto"],
                    end: function () {
                        scope.$destroy();
                    }
                });
            }
            function editArea(area) {
                var scope = $scope.$new();
                scope.curdType = 'edit';
                scope.currentArea = area;
                vm.currentLayerIndex = layer.open({
                    type: 1,
                    content: popupHtml,
                    scope: scope,
                    skin: "no-scroll",
                    title: i18nFactory('DP_CONFIG_AREA_06'),
                    area: ["450px", "auto"],
                    end: function () {
                        scope.$destroy();
                    }
                });
            }
            function deleteArea(area) {
                layer.confirm(i18nFactory('DP_CONFIG_COMMON_41'), {
                    icon: 0,
                    title: i18nFactory('DP_CONFIG_COMMON_42'),
                    area: ["500px", "200px"]
                }, function (index) {
                    layer.close(index);
                    layer.confirm(i18nFactory('DP_CONFIG_COMMON_43'), {
                        icon: 0,
                        title: i18nFactory('DP_CONFIG_COMMON_42'),
                        area: ["500px", "200px"]
                    }, function (index) {
                        layer.close(index);
                        submitDeleteArea(area);
                    });
                });
            }
            function submitDeleteArea(area) {
                areaService.deleteById(area).then(complete);
                function complete(res) {
                    if (res.code === 200) {
                        vm.tableListParams.currentPage = 1;
                        $timeout(function () {
                            getTreeList();
                        }, 1000);
                    }
                    else {
                    }
                }
            }
            function editAreaTd(area) {
                editArea(area);
            }
            function deleteAreaTd(area) {
                deleteArea(area);
            }
            function treeInitComplete(treeId) {
            }
            function treeSelectNode(event, treeId, treeNode) {
                vm.areaTreeDataParams.defaultSelectTreeId = treeNode.ID;
                vm.tableListParams.currentPage = 1;
                vm.tableListParams.parentId = treeNode.ID;
                getTableList();
                $timeout(function () {
                    vm.currentArea = treeNode;
                });
            }
            function _getCasCadeSearchParams(tableParams) {
                if (!tableParams)
                    return {};
                var result = new casecade_service_1.CasCadeSearchParams();
                result.pageIndex = tableParams.currentPage;
                result.pageSize = tableParams.pageSize;
                result.areaId = tableParams.parentId;
                result.isAsc = false;
                result.name = tableParams.areaName;
                return result;
            }
            function getTableList() {
                casCadeService.findAreaList(_getCasCadeSearchParams(vm.tableListParams)).then(complete);
                function complete(result) {
                    if (result.code === 200) {
                        var pageParams = new page_params_1.default();
                        pageParams.pageSize = vm.tableListParams.pageSize;
                        pageParams.currentPage = vm.tableListParams.currentPage;
                        pageParams.totalCount = result.count;
                        vm.tBodyList = result.data || [];
                        vm.pageParams = pageParams;
                        vm.tableDatas = result.data;
                        $timeout(function () {
                            if (vm.tBodyList && vm.tBodyList.length > 0) {
                                vm.tableNoData = false;
                            }
                            else {
                                vm.tableNoData = true;
                            }
                        }, 1500);
                    }
                    else {
                        $timeout(function () {
                            vm.tableNoData = true;
                        });
                    }
                }
            }
            function getTreeList() {
                areaService.findListTree({ keyword: vm.treeSearchInput }).then(complete);
                function complete(result) {
                    vm.areaTreeDataParams.treeDatas = result;
                    vm.treeNoData = !(result && result.length > 0);
                }
            }
            function changePage(num) {
                vm.tableListParams.currentPage = num;
                getTableList();
            }
            function changePageSize(num) {
                vm.tableListParams.currentPage = 1;
                vm.tableListParams.pageSize = num;
                getTableList();
            }
            function afterChangeCheck(resultList, isCheckAll) {
                setIsSelectItems(resultList);
                vm.selectedList = resultList;
                vm.isSelectAll = isCheckAll;
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
                    layer.msg(i18nFactory("FDS_00_04_01"));
                    return;
                }
                var ids = [];
                selectedDataList.forEach(function (_data) {
                    ids.push(_data.ID);
                });
                var showText = i18nFactory('FDS_01_01_13', { value: ids.length });
                layer.confirm(showText, {
                    icon: 0,
                    title: i18nFactory('DP_CONFIG_COMMON_42'),
                    area: ["500px", "200px"]
                }, function (index) {
                    layer.close(index);
                    layer.confirm(i18nFactory('DP_CONFIG_COMMON_43'), {
                        icon: 0,
                        title: i18nFactory('DP_CONFIG_COMMON_42'),
                        area: ["500px", "200px"]
                    }, function (index) {
                        layer.close(index);
                        submitDeleteByIds(ids);
                    });
                });
            }
            function submitDeleteByIds(ids) {
                areaService.deleteByIds(ids).then(function (resp) {
                    if (resp.code == 200) {
                        vm.tableListParams.currentPage = 1;
                        $timeout(function () {
                            getTreeList();
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
        BaseConfigAreaController.$inject = ['$scope', '$timeout', 'areaService', 'layer', 'casCadeService', 'i18nFactory'];
        return BaseConfigAreaController;
    }());
    main_app_1.app.controller('baseConfigAreaController', BaseConfigAreaController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9hcmVhL2FyZWEuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBc0JBO1FBQThCLG1DQUFlO1FBRXpDO1lBQUEsWUFDSSxpQkFBTyxTQUtWO1lBSkcsS0FBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7WUFDdkIsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLHFCQUFVLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDMUMsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHFCQUFVLEVBQUUsQ0FBQyxXQUFXLENBQUM7O1FBQ3BELENBQUM7UUFBQSxDQUFDO1FBQ04sc0JBQUM7SUFBRCxDQVRBLEFBU0MsQ0FUNkIsNEJBQWUsR0FTNUM7SUFFRDtRQWlESSxrQ0FBWSxNQUFXLEVBQUUsUUFBa0IsRUFBRSxXQUF5QixFQUFFLEtBQVUsRUFBRSxjQUErQixFQUFFLFdBQWdCO1lBaEJySSxnQkFBVyxHQUFZLEtBQUssQ0FBQztZQUk3QixlQUFVLEdBQVksS0FBSyxDQUFDO1lBY3hCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztZQUlkLEVBQUUsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLDRCQUFjLEVBQVUsQ0FBQztZQUNyRCxFQUFFLENBQUMsa0JBQWtCLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQztZQUM5QyxFQUFFLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1lBQy9DLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO1lBQy9DLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztZQUcxRCxFQUFFLENBQUMsZUFBZSxDQUFDO1lBQ25CLEVBQUUsQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztZQUM3QyxFQUFFLENBQUMsb0JBQW9C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QUUsRUFBRSxDQUFDO3dCQUMzQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNYLE1BQU0sR0FBRyxJQUFJLENBQUM7NEJBQ2QsS0FBSyxDQUFDO3dCQUNWLENBQUM7b0JBQ0wsQ0FBQztnQkFDTCxDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDOUIsRUFBRSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7Z0JBQzlCLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQTdZTSxnQ0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBZ1pyRywrQkFBQztLQWpaRCxBQWlaQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQywwQkFBMEIsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9iYXNlY29uZmlnL2FyZWEvYXJlYS5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZGVsbCBvbiAyMDE3LzMvMjMuXHJcbiAqL1xyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4vYXJlYS5wb3B1cC5odG1sXCIgbmFtZT1cInBvcHVwSHRtbFwiIC8+XHJcbmltcG9ydCBcImNzcyEuLi9jc3MvYmFzZWNvbmZpZy1hcmVhLmNzc1wiO1xyXG5pbXBvcnQgXCJjc3MhLi4vc3R5bGUvYmFzZWNvbmZpZy1hcmVhLmNzc1wiO1xyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0ICcuL2FyZWEucG9wdXAuY29udHJvbGxlcic7XHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FyZWEuc2VydmljZSc7XHJcbmltcG9ydCBQYWdlUGFyYW1zIGZyb20gXCIuLi8uLi9jb21tb24vZGlyZWN0aXZlL3BhZ2UvcGFnZS1wYXJhbXNcIjtcclxuaW1wb3J0IHtJQXJlYVNlcnZpY2V9IGZyb20gXCIuLi8uLi9jb21tb24vc2VydmljZXMvYXJlYS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SVRhYmxlSGVhZGVyfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS91bml0LXRhYmxlL3RhYmxlLXBhcmFtc1wiO1xyXG5pbXBvcnQge0lUcmVlRGF0YVBhcmFtcywgVHJlZURhdGFQYXJhbXN9IGZyb20gXCIuLi8uLi9jb21tb24vZGlyZWN0aXZlL3RyZWUvdHJlZS1wYXJhbXNcIjtcclxuaW1wb3J0IHtBcmVhVGFibGVQYXJhbXN9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9BcmVhUGFyYW1zXCI7XHJcbmltcG9ydCB7QXJlYX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L0FyZWFcIjtcclxuaW1wb3J0IHtBcmVhRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9BcmVhRXhcIjtcclxuaW1wb3J0IHtSZXNwb25zZVJlc3VsdH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdFwiO1xyXG5pbXBvcnQge0lDYXNDYWRlU2VydmljZSwgQ2FzQ2FkZVNlYXJjaFBhcmFtc30gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9jYXNlY2FkZS5zZXJ2aWNlXCI7XHJcblxyXG5cclxuZGVjbGFyZSB2YXIgcG9wdXBIdG1sOiBhbnk7XHJcblxyXG5jbGFzcyBUYWJsZUxpc3RQYXJhbXMgZXh0ZW5kcyBBcmVhVGFibGVQYXJhbXMge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zb3J0TmFtZSA9ICdDb2RlJztcclxuICAgICAgICB0aGlzLmlzQXNjID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wYWdlU2l6ZSA9IG5ldyBQYWdlUGFyYW1zKCkucGFnZVNpemU7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IG5ldyBQYWdlUGFyYW1zKCkuY3VycmVudFBhZ2U7XHJcbiAgICB9O1xyXG59XHJcblxyXG5jbGFzcyBCYXNlQ29uZmlnQXJlYUNvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsICckdGltZW91dCcsICdhcmVhU2VydmljZScsICdsYXllcicsICdjYXNDYWRlU2VydmljZScsICdpMThuRmFjdG9yeSddO1xyXG5cclxuICAgIHRyZWVTZWFyY2hJbnB1dDogc3RyaW5nO1xyXG4gICAgdHJlZVNlYXJjaElucHV0RnVuYzogRnVuY3Rpb247XHJcbiAgICB0YWJsZVNlYXJjaElucHV0OiBzdHJpbmc7XHJcbiAgICB0YWJsZVNlYXJjaElucHV0RnVuYzogRnVuY3Rpb247XHJcblxyXG4gICAgZWRpdEFyZWFUZDogRnVuY3Rpb247XHJcbiAgICBkZWxldGVBcmVhVGQ6IEZ1bmN0aW9uO1xyXG4gICAgY3VycmVudEFyZWE6IEFyZWE7XHJcbiAgICB0YWJsZUxpc3RQYXJhbXM6IFRhYmxlTGlzdFBhcmFtcztcclxuXHJcbiAgICBwYWdlUGFyYW1zOiBQYWdlUGFyYW1zO1xyXG5cclxuICAgIGVkaXRBcmVhOiBGdW5jdGlvbjtcclxuICAgIGFkZEFyZWE6IEZ1bmN0aW9uO1xyXG4gICAgZGVsZXRlQXJlYTogRnVuY3Rpb247XHJcbiAgICBjdXJyZW50TGF5ZXJJbmRleDogbnVtYmVyO1xyXG5cclxuICAgIHRhYmxlRGF0YXM6IEFycmF5PGFueT47XHJcbiAgICBkZWZhdWx0U2VsZWN0VHJlZUlkOiBzdHJpbmc7XHJcblxyXG4gICAgdGFibGVTZWFyY2hJbnB1dEtleVVwOiBGdW5jdGlvbjtcclxuICAgIHRyZWVTZWFyY2hJbnB1dEtleVVwOiBGdW5jdGlvbjtcclxuXHJcbiAgICBjaGFuZ2VQYWdlOiBGdW5jdGlvbjtcclxuICAgIGNoYW5nZVBhZ2VTaXplOiBGdW5jdGlvbjtcclxuXHJcbiAgICAvLyB0YWJsZSDliJfooajmlbDmja5cclxuICAgIHRIZWFkTGlzdDogQXJyYXk8SVRhYmxlSGVhZGVyPjtcclxuICAgIHRCb2R5TGlzdDogQXJyYXk8QXJlYUV4PjtcclxuXHJcbiAgICB0YWJsZU5vRGF0YTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8vIC8vIOmAieaLqeihjOaUv+WMuuWfn+agkVxyXG4gICAgYXJlYVRyZWVEYXRhUGFyYW1zOiBJVHJlZURhdGFQYXJhbXM8QXJlYUV4PjtcclxuICAgIHRyZWVOb0RhdGE6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8v5aSa6YCJ55u45YWzXHJcbiAgICBzZWxlY3RlZExpc3Q6IEFycmF5PGJvb2xlYW4+O1xyXG4gICAgaXNTZWxlY3RBbGw6IGJvb2xlYW47XHJcbiAgICBhZnRlckNoYW5nZUNoZWNrOiBGdW5jdGlvbjtcclxuICAgIGRlbGV0ZUJ5SWRzOiBGdW5jdGlvbjtcclxuXHJcbiAgICAvL+aOkuW6j+Wbnuiwg1xyXG4gICAgc29ydEJ5RmllbGQ6IEZ1bmN0aW9uO1xyXG5cclxuICAgIGlzU2VsZWN0SXRlbXM6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IoJHNjb3BlOiBhbnksICR0aW1lb3V0OiBGdW5jdGlvbiwgYXJlYVNlcnZpY2U6IElBcmVhU2VydmljZSwgbGF5ZXI6IGFueSwgY2FzQ2FkZVNlcnZpY2U6IElDYXNDYWRlU2VydmljZSwgaTE4bkZhY3Rvcnk6IGFueSkge1xyXG5cclxuICAgICAgICBsZXQgdm0gPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyDmoJHliJfooajmlbDmja5cclxuICAgICAgICAvL+WIneWni+WMliBhcmVhIOagkeaVsOaNrlxyXG4gICAgICAgIHZtLmFyZWFUcmVlRGF0YVBhcmFtcyA9IG5ldyBUcmVlRGF0YVBhcmFtczxBcmVhRXg+KCk7XHJcbiAgICAgICAgdm0uYXJlYVRyZWVEYXRhUGFyYW1zLnRyZWVJZCA9ICdhcmVhVHJlZUFyZWEnO1xyXG4gICAgICAgIHZtLmFyZWFUcmVlRGF0YVBhcmFtcy5pc0RlZmF1bHRTZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgdm0uYXJlYVRyZWVEYXRhUGFyYW1zLm9uQ2xpY2sgPSB0cmVlU2VsZWN0Tm9kZTtcclxuICAgICAgICB2bS5hcmVhVHJlZURhdGFQYXJhbXMudHJlZUluaXRDb21wbGV0ZSA9IHRyZWVJbml0Q29tcGxldGU7XHJcblxyXG4gICAgICAgIC8vIOagkeWIl+ihqOaVsOaNrlxyXG4gICAgICAgIHZtLnRyZWVTZWFyY2hJbnB1dDtcclxuICAgICAgICB2bS50cmVlU2VhcmNoSW5wdXRGdW5jID0gdHJlZVNlYXJjaElucHV0RnVuYztcclxuICAgICAgICB2bS50cmVlU2VhcmNoSW5wdXRLZXlVcCA9IHRyZWVTZWFyY2hJbnB1dEtleVVwO1xyXG5cclxuICAgICAgICAvLyDooajmoLzmlbDmja5cclxuICAgICAgICAvLy0tLS0tLS0tLS0tLS1cclxuICAgICAgICB2bS50SGVhZExpc3QgPSBbXHJcbiAgICAgICAgICAgIHtmaWVsZDogXCJOYW1lXCIsIHRpdGxlOiBcIkRQX0NPTkZJR19DT01NT05fMzJcIn0sXHJcbiAgICAgICAgICAgIHtmaWVsZDogXCJDb2RlXCIsIHRpdGxlOiBcIkRQX0NPTkZJR19DT01NT05fMzNcIn0sXHJcbiAgICAgICAgICAgIC8vIHsgZmllbGQ6IFwibWVjaGFuaXNtVHlwZVwiLCB0aXRsZTogXCLmnLrmnoTnsbvlnotcIn0sXHJcbiAgICAgICAgICAgIC8vIHsgZmllbGQ6IFwiQ29udGFjdHNcIiwgdGl0bGU6IFwi6IGU57O75Lq6XCJ9LFxyXG4gICAgICAgICAgICAvLyB7IGZpZWxkOiBcIkNvbnRhY3ROdW1iZXJcIiwgdGl0bGU6IFwi6IGU57O755S16K+dXCJ9LFxyXG4gICAgICAgICAgICB7ZmllbGQ6IFwiRGVzY3JpcHRpb25cIiwgdGl0bGU6IFwiRFBfQ09ORklHX0NPTU1PTl8zNFwifSxcclxuICAgICAgICAgICAge2ZpZWxkOiBcImJvdHRvbXNcIiwgdGl0bGU6IFwiRFBfQ09ORklHX0NPTU1PTl8zNVwifVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgdm0udEJvZHlMaXN0ID0gW107XHJcblxyXG4gICAgICAgIHZtLmlzU2VsZWN0SXRlbXMgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdm0uZWRpdEFyZWFUZCA9IGVkaXRBcmVhVGQ7XHJcbiAgICAgICAgdm0uZGVsZXRlQXJlYVRkID0gZGVsZXRlQXJlYVRkO1xyXG4gICAgICAgIHZtLnBhZ2VQYXJhbXM7XHJcbiAgICAgICAgdm0uY3VycmVudEFyZWEgPSB7fSBhcyBBcmVhO1xyXG4gICAgICAgIHZtLnRhYmxlTGlzdFBhcmFtcyA9IG5ldyBUYWJsZUxpc3RQYXJhbXMoKTtcclxuXHJcbiAgICAgICAgLy/ov73liqDmjpLluo/lj4LmlbBcclxuICAgICAgICB2bS50YWJsZUxpc3RQYXJhbXMuc29ydE5hbWUgPSAnQ29kZSc7XHJcbiAgICAgICAgdm0udGFibGVMaXN0UGFyYW1zLmlzQXNjID0gdHJ1ZTtcclxuICAgICAgICB2bS5zb3J0QnlGaWVsZCA9IHNvcnRCeUZpZWxkO1xyXG5cclxuICAgICAgICB2bS50YWJsZVNlYXJjaElucHV0O1xyXG4gICAgICAgIHZtLnRhYmxlU2VhcmNoSW5wdXRGdW5jID0gdGFibGVTZWFyY2hJbnB1dEZ1bmM7XHJcbiAgICAgICAgdm0udGFibGVTZWFyY2hJbnB1dEtleVVwID0gdGFibGVTZWFyY2hJbnB1dEtleVVwO1xyXG5cclxuICAgICAgICAvLyDliIbpobXmjqfku7ZcclxuICAgICAgICB2bS5jaGFuZ2VQYWdlID0gY2hhbmdlUGFnZTtcclxuICAgICAgICB2bS5jaGFuZ2VQYWdlU2l6ZSA9IGNoYW5nZVBhZ2VTaXplO1xyXG5cclxuICAgICAgICAvL+WkmumAieebuOWFs1xyXG4gICAgICAgIHZtLnNlbGVjdGVkTGlzdCA9IFtdO1xyXG4gICAgICAgIHZtLmlzU2VsZWN0QWxsID0gZmFsc2U7XHJcbiAgICAgICAgdm0uYWZ0ZXJDaGFuZ2VDaGVjayA9IGFmdGVyQ2hhbmdlQ2hlY2s7XHJcbiAgICAgICAgdm0uZGVsZXRlQnlJZHMgPSBkZWxldGVCeUlkcztcclxuXHJcbiAgICAgICAgLy8g5L+h5oGv5p2h5pWw5o2uXHJcbiAgICAgICAgdm0uZWRpdEFyZWEgPSBlZGl0QXJlYTtcclxuICAgICAgICB2bS5hZGRBcmVhID0gYWRkQXJlYTtcclxuICAgICAgICB2bS5kZWxldGVBcmVhID0gZGVsZXRlQXJlYTtcclxuXHJcbiAgICAgICAgLy8g5by55Ye65qGG55u45YWzXHJcbiAgICAgICAgLy8gJHNjb3BlLiRvbihcImFyZWEuY2xvc2VQb3B1cFwiLCBjbG9zZUFyZWFQb3B1cCk7XHJcbiAgICAgICAgJHNjb3BlLiRvbihcImFyZWEuY2xvc2VQb3B1cFwiLCAoZXZlbnQ6IGFueSwgaXNSZWZyZXNoPzogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICBsYXllci5jbG9zZSh2bS5jdXJyZW50TGF5ZXJJbmRleCk7XHJcbiAgICAgICAgICAgIGlmIChpc1JlZnJlc2gpIHtcclxuICAgICAgICAgICAgICAgIGdldFRyZWVMaXN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZ2V0VHJlZUxpc3QoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdHJlZVNlYXJjaElucHV0S2V5VXAoZTogYW55KSB7XHJcbiAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XHJcbiAgICAgICAgICAgICAgICBnZXRUcmVlTGlzdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB0YWJsZVNlYXJjaElucHV0S2V5VXAoZTogYW55KSB7XHJcbiAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XHJcbiAgICAgICAgICAgICAgICB2bS50YWJsZUxpc3RQYXJhbXMuYXJlYU5hbWUgPSB2bS50YWJsZVNlYXJjaElucHV0O1xyXG4gICAgICAgICAgICAgICAgdm0udGFibGVMaXN0UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICAgICAgICAgIGdldFRhYmxlTGlzdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB0cmVlU2VhcmNoSW5wdXRGdW5jKCkge1xyXG4gICAgICAgICAgICBnZXRUcmVlTGlzdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdGFibGVTZWFyY2hJbnB1dEZ1bmMoKSB7XHJcbiAgICAgICAgICAgIHZtLnRhYmxlTGlzdFBhcmFtcy5hcmVhTmFtZSA9IHZtLnRhYmxlU2VhcmNoSW5wdXQ7XHJcbiAgICAgICAgICAgIHZtLnRhYmxlTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgIGdldFRhYmxlTGlzdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkQXJlYShhcmVhOiBBcmVhRXgpIHtcclxuICAgICAgICAgICAgLy8g55Sx5LqObGF5ZXLpnIDopoHkvKBzY29wZeWvueixoSwg5L2G546w5Zyo5ZG95ZCN5Y+C5pWw6YO95pS+5Zyodm3kuK0sIOaVheS9v+eUqHNjb3BlLiRuZXfmlrDlu7rkuIDkuKpzY29wZeS8oOWFpVxyXG5cclxuICAgICAgICAgICAgbGV0IHNjb3BlOiB7IGN1cmRUeXBlOiBzdHJpbmcsIGN1cnJlbnRBcmVhOiBBcmVhRXgsICRkZXN0cm95OiBGdW5jdGlvbiB9ID0gJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICAgICAgc2NvcGUuY3VyZFR5cGUgPSAnYWRkJztcclxuICAgICAgICAgICAgc2NvcGUuY3VycmVudEFyZWEgPSBhcmVhIGFzIEFyZWFFeDtcclxuICAgICAgICAgICAgLy8g6L+Z6YeM5a+5c2NvcGXov5vooYzkuIDmrKHmlrDlu7pcclxuXHJcbiAgICAgICAgICAgIHZtLmN1cnJlbnRMYXllckluZGV4ID0gbGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogcG9wdXBIdG1sLFxyXG4gICAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICAgICAgc2tpbjogXCJuby1zY3JvbGxcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuRmFjdG9yeSgnRFBfQ09ORklHX0NPTU1PTl80MCcpLFxyXG4gICAgICAgICAgICAgICAgYXJlYTogW1wiNDUwcHhcIiwgXCJhdXRvXCJdLFxyXG4gICAgICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBlZGl0QXJlYShhcmVhOiBBcmVhKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2NvcGU6IHsgY3VyZFR5cGU6IHN0cmluZywgY3VycmVudEFyZWE6IEFyZWFFeCwgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSAkc2NvcGUuJG5ldygpO1xyXG4gICAgICAgICAgICBzY29wZS5jdXJkVHlwZSA9ICdlZGl0JztcclxuICAgICAgICAgICAgc2NvcGUuY3VycmVudEFyZWEgPSBhcmVhIGFzIEFyZWFFeDtcclxuXHJcbiAgICAgICAgICAgIHZtLmN1cnJlbnRMYXllckluZGV4ID0gbGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogcG9wdXBIdG1sLFxyXG4gICAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICAgICAgc2tpbjogXCJuby1zY3JvbGxcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuRmFjdG9yeSgnRFBfQ09ORklHX0FSRUFfMDYnKSxcclxuICAgICAgICAgICAgICAgIGFyZWE6IFtcIjQ1MHB4XCIsIFwiYXV0b1wiXSxcclxuICAgICAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZGVsZXRlQXJlYShhcmVhOiBBcmVhKSB7XHJcblxyXG4gICAgICAgICAgICBsYXllci5jb25maXJtKGkxOG5GYWN0b3J5KCdEUF9DT05GSUdfQ09NTU9OXzQxJyksIHtcclxuICAgICAgICAgICAgICAgIGljb246IDAsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bkZhY3RvcnkoJ0RQX0NPTkZJR19DT01NT05fNDInKSxcclxuICAgICAgICAgICAgICAgIGFyZWE6IFtcIjUwMHB4XCIsIFwiMjAwcHhcIl1cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgICAgIGxheWVyLmNsb3NlKGluZGV4KTtcclxuICAgICAgICAgICAgICAgIGxheWVyLmNvbmZpcm0oaTE4bkZhY3RvcnkoJ0RQX0NPTkZJR19DT01NT05fNDMnKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGljb246IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGkxOG5GYWN0b3J5KCdEUF9DT05GSUdfQ09NTU9OXzQyJyksXHJcbiAgICAgICAgICAgICAgICAgICAgYXJlYTogW1wiNTAwcHhcIiwgXCIyMDBweFwiXVxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXllci5jbG9zZShpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VibWl0RGVsZXRlQXJlYShhcmVhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHN1Ym1pdERlbGV0ZUFyZWEoYXJlYTogQXJlYSkge1xyXG4gICAgICAgICAgICBhcmVhU2VydmljZS5kZWxldGVCeUlkKGFyZWEpLnRoZW4oY29tcGxldGUpO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gY29tcGxldGUocmVzOiBSZXNwb25zZVJlc3VsdDxzdHJpbmc+KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWIt+aWsOaVtOS4quWIl+ihqFxyXG4gICAgICAgICAgICAgICAgICAgIHZtLnRhYmxlTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRUcmVlTGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZWRpdEFyZWFUZChhcmVhOiBBcmVhKSB7XHJcbiAgICAgICAgICAgIGVkaXRBcmVhKGFyZWEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZGVsZXRlQXJlYVRkKGFyZWE6IEFyZWEpIHtcclxuICAgICAgICAgICAgZGVsZXRlQXJlYShhcmVhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRyZWVJbml0Q29tcGxldGUodHJlZUlkOiBzdHJpbmcpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRyZWVTZWxlY3ROb2RlKGV2ZW50OiBNb3VzZUV2ZW50LCB0cmVlSWQ6IHN0cmluZywgdHJlZU5vZGU6IEFyZWEpIHtcclxuICAgICAgICAgICAgLy8g57yT5a2Y6YCJ5Lit55qE57uT54K5SURcclxuICAgICAgICAgICAgdm0uYXJlYVRyZWVEYXRhUGFyYW1zLmRlZmF1bHRTZWxlY3RUcmVlSWQgPSB0cmVlTm9kZS5JRDtcclxuICAgICAgICAgICAgdm0udGFibGVMaXN0UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICAgICAgdm0udGFibGVMaXN0UGFyYW1zLnBhcmVudElkID0gdHJlZU5vZGUuSUQ7XHJcbiAgICAgICAgICAgIGdldFRhYmxlTGlzdCgpO1xyXG5cclxuICAgICAgICAgICAgJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdm0uY3VycmVudEFyZWEgPSB0cmVlTm9kZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfZ2V0Q2FzQ2FkZVNlYXJjaFBhcmFtcyh0YWJsZVBhcmFtczogVGFibGVMaXN0UGFyYW1zKSB7XHJcbiAgICAgICAgICAgIGlmICghdGFibGVQYXJhbXMpIHJldHVybiB7fSBhcyBDYXNDYWRlU2VhcmNoUGFyYW1zO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBDYXNDYWRlU2VhcmNoUGFyYW1zKCk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wYWdlSW5kZXggPSB0YWJsZVBhcmFtcy5jdXJyZW50UGFnZTtcclxuICAgICAgICAgICAgLy8gcmVzdWx0Lm9yZGVyRmllbGQgPSB0YWJsZVBhcmFtcy5zb3J0TmFtZTtcclxuICAgICAgICAgICAgcmVzdWx0LnBhZ2VTaXplID0gdGFibGVQYXJhbXMucGFnZVNpemU7XHJcbiAgICAgICAgICAgIHJlc3VsdC5hcmVhSWQgPSB0YWJsZVBhcmFtcy5wYXJlbnRJZDtcclxuICAgICAgICAgICAgcmVzdWx0LmlzQXNjID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJlc3VsdC5uYW1lID0gdGFibGVQYXJhbXMuYXJlYU5hbWU7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRUYWJsZUxpc3QoKSB7XHJcblxyXG4gICAgICAgICAgICBjYXNDYWRlU2VydmljZS5maW5kQXJlYUxpc3QoX2dldENhc0NhZGVTZWFyY2hQYXJhbXModm0udGFibGVMaXN0UGFyYW1zKSkudGhlbihjb21wbGV0ZSk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBjb21wbGV0ZShyZXN1bHQ6IFJlc3BvbnNlUmVzdWx0PEFycmF5PEFyZWFFeD4+KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5jb2RlID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGFnZVBhcmFtcyA9IG5ldyBQYWdlUGFyYW1zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZVBhcmFtcy5wYWdlU2l6ZSA9IHZtLnRhYmxlTGlzdFBhcmFtcy5wYWdlU2l6ZTtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlUGFyYW1zLmN1cnJlbnRQYWdlID0gdm0udGFibGVMaXN0UGFyYW1zLmN1cnJlbnRQYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VQYXJhbXMudG90YWxDb3VudCA9IHJlc3VsdC5jb3VudDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdm0udEJvZHlMaXN0ID0gcmVzdWx0LmRhdGEgfHwgW107XHJcbiAgICAgICAgICAgICAgICAgICAgdm0ucGFnZVBhcmFtcyA9IHBhZ2VQYXJhbXM7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0udGFibGVEYXRhcyA9IHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZtLnRCb2R5TGlzdCAmJiB2bS50Qm9keUxpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm0udGFibGVOb0RhdGEgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLnRhYmxlTm9EYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDE1MDApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLnRhYmxlTm9EYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0VHJlZUxpc3QoKSB7XHJcbiAgICAgICAgICAgIGFyZWFTZXJ2aWNlLmZpbmRMaXN0VHJlZSh7a2V5d29yZDogdm0udHJlZVNlYXJjaElucHV0fSkudGhlbihjb21wbGV0ZSk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBjb21wbGV0ZShyZXN1bHQ6IEFycmF5PEFyZWFFeD4pIHtcclxuICAgICAgICAgICAgICAgIHZtLmFyZWFUcmVlRGF0YVBhcmFtcy50cmVlRGF0YXMgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB2bS50cmVlTm9EYXRhID0gIShyZXN1bHQgJiYgcmVzdWx0Lmxlbmd0aCA+IDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjaGFuZ2VQYWdlKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHZtLnRhYmxlTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IG51bTtcclxuICAgICAgICAgICAgZ2V0VGFibGVMaXN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjaGFuZ2VQYWdlU2l6ZShudW06IG51bWJlcikge1xyXG4gICAgICAgICAgICB2bS50YWJsZUxpc3RQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgICAgICB2bS50YWJsZUxpc3RQYXJhbXMucGFnZVNpemUgPSBudW07XHJcbiAgICAgICAgICAgIGdldFRhYmxlTGlzdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g5omT6ZKpIOmAieaLqSDlm57osINcclxuICAgICAgICBmdW5jdGlvbiBhZnRlckNoYW5nZUNoZWNrKHJlc3VsdExpc3Q6IEFycmF5PGJvb2xlYW4+LCBpc0NoZWNrQWxsOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHNldElzU2VsZWN0SXRlbXMocmVzdWx0TGlzdCk7XHJcbiAgICAgICAgICAgIHZtLnNlbGVjdGVkTGlzdCA9IHJlc3VsdExpc3Q7XHJcbiAgICAgICAgICAgIHZtLmlzU2VsZWN0QWxsID0gaXNDaGVja0FsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v6I635Y+W5b2T5YmN5bey6KKr6YCJ5Lit5YiX6KGoXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0U2VsZWN0ZWRMaXN0KCk6IEFycmF5PEFyZWE+IHtcclxuICAgICAgICAgICAgbGV0IHNlbGVjdGVkRGF0YUxpc3Q6IEFycmF5PEFyZWE+ID0gW107XHJcbiAgICAgICAgICAgIGlmICh2bS5zZWxlY3RlZExpc3QpIHtcclxuICAgICAgICAgICAgICAgIHZtLnRCb2R5TGlzdC5mb3JFYWNoKChfZGF0YTogQXJlYSwgX2luZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodm0uc2VsZWN0ZWRMaXN0W19pbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWREYXRhTGlzdC5wdXNoKF9kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWREYXRhTGlzdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5aSa5Liq5Yig6ZmkXHJcbiAgICAgICAgZnVuY3Rpb24gZGVsZXRlQnlJZHMoKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZERhdGFMaXN0OiBBcnJheTxBcmVhPiA9IGdldFNlbGVjdGVkTGlzdCgpO1xyXG4gICAgICAgICAgICBpZiAoIXNlbGVjdGVkRGF0YUxpc3QgfHwgc2VsZWN0ZWREYXRhTGlzdC5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbGF5ZXIubXNnKGkxOG5GYWN0b3J5KFwiRkRTXzAwXzA0XzAxXCIpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgaWRzOiBBcnJheTxzdHJpbmc+ID0gW107XHJcblxyXG4gICAgICAgICAgICBzZWxlY3RlZERhdGFMaXN0LmZvckVhY2goKF9kYXRhOiBBcmVhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZHMucHVzaChfZGF0YS5JRCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgc2hvd1RleHQgPSBpMThuRmFjdG9yeSgnRkRTXzAxXzAxXzEzJywge3ZhbHVlOiBpZHMubGVuZ3RofSk7XHJcbiAgICAgICAgICAgIGxheWVyLmNvbmZpcm0oc2hvd1RleHQsIHtcclxuICAgICAgICAgICAgICAgIGljb246IDAsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bkZhY3RvcnkoJ0RQX0NPTkZJR19DT01NT05fNDInKSxcclxuICAgICAgICAgICAgICAgIGFyZWE6IFtcIjUwMHB4XCIsIFwiMjAwcHhcIl1cclxuICAgICAgICAgICAgfSwgKGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGxheWVyLmNsb3NlKGluZGV4KTtcclxuICAgICAgICAgICAgICAgIGxheWVyLmNvbmZpcm0oaTE4bkZhY3RvcnkoJ0RQX0NPTkZJR19DT01NT05fNDMnKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGljb246IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGkxOG5GYWN0b3J5KCdEUF9DT05GSUdfQ09NTU9OXzQyJyksXHJcbiAgICAgICAgICAgICAgICAgICAgYXJlYTogW1wiNTAwcHhcIiwgXCIyMDBweFwiXVxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXllci5jbG9zZShpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VibWl0RGVsZXRlQnlJZHMoaWRzKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/mj5DkuqTliKDpmaRcclxuICAgICAgICBmdW5jdGlvbiBzdWJtaXREZWxldGVCeUlkcyhpZHM6IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICAgICAgYXJlYVNlcnZpY2UuZGVsZXRlQnlJZHMoaWRzKS50aGVuKChyZXNwOiBSZXNwb25zZVJlc3VsdDxzdHJpbmc+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcC5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLnRhYmxlTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRUcmVlTGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDmjpLluo9cclxuICAgICAgICBmdW5jdGlvbiBzb3J0QnlGaWVsZChpbmRleDogbnVtYmVyLCBmaWVsZE5hbWU6IHN0cmluZywgc29ydFN0YXR1czogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB2bS50YWJsZUxpc3RQYXJhbXMuaXNBc2MgPSBzb3J0U3RhdHVzO1xyXG4gICAgICAgICAgICB2bS50YWJsZUxpc3RQYXJhbXMuc29ydE5hbWUgPSBmaWVsZE5hbWU7XHJcbiAgICAgICAgICAgIGdldFRhYmxlTGlzdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogY3JlYXRvciB3eXI6IOWIpOaWreWSjOiuvue9ruW9k+WJjeWIl+ihqOaYr+WQpuaciemAieS4reeahOWFg+e0oFxyXG4gICAgICAgICAqIEBwYXJhbSBpdGVtc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHNldElzU2VsZWN0SXRlbXMoaXRlbXM6IEFycmF5PGJvb2xlYW4+KSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCBpLCBsZW47XHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBpdGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1tpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHZtLmlzU2VsZWN0SXRlbXMgIT09IHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdm0uaXNTZWxlY3RJdGVtcyA9IHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcignYmFzZUNvbmZpZ0FyZWFDb250cm9sbGVyJywgQmFzZUNvbmZpZ0FyZWFDb250cm9sbGVyKTtcclxuXHJcbiJdfQ==
