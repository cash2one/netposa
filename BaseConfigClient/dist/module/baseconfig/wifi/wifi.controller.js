define(["require", "exports", "text!./wifi.popupWifi.html", "text!./wifi.popupLamp.html", "text!./wifi.wifiCreate.html", "../../common/app/main.app", "../../common/directive/page/page-params", "../../common/services/casecade.service", "../../common/directive/tree/tree-params", "../../../core/params/WifiParams", "css!../css/baseconfig-device.css", "./wifi.popupWifi.controller", "./wifi.popupLamp.controller", "./wifi.wifiCreate.controller", "../../common/services/area.service", "../../common/services/wifi.service"], function (require, exports, popupWifiHtml, popupLampHtml, createHtml, main_app_1, page_params_1, casecade_service_1, tree_params_1, WifiParams_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var baseConfigWifiController = (function () {
        function baseConfigWifiController($scope, $timeout, wifiService, areaService, layer, casCadeService, i18nFactory) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.wifiService = wifiService;
            this.areaService = areaService;
            this.layer = layer;
            this.casCadeService = casCadeService;
            this.i18nFactory = i18nFactory;
            this.areaTreeSearchInputStr = "";
            this.setTableHead = function () {
                _this.tHeadListWifi = [
                    { field: 'Name', title: 'DP_CONFIG_COMMON_03' },
                    { field: 'Code', title: 'DP_CONFIG_COMMON_04' },
                    { field: 'Description', title: 'DP_CONFIG_COMMON_09' },
                    { field: 'Longitude', title: 'DP_CONFIG_COMMON_13' },
                    { field: 'Latitude', title: 'DP_CONFIG_COMMON_14' },
                    { field: 'Operate', title: 'DP_CONFIG_COMMON_15' },
                ];
            };
            this.onClickTaskTypeBtn = function (btnItemValue) {
                if (btnItemValue === _this.Type)
                    return;
                _this.Type = btnItemValue;
                _this.getListByParams(_this.findListParams);
            };
            this.initParams();
            this.areaTreeDatas = new tree_params_1.TreeDataParams();
            this.areaTreeDatas.treeId = 'areaTreeIvs';
            this.areaTreeDatas.isDefaultSelected = true;
            this.areaTreeDatas.onClick = function (event, treeId, treeNode) {
                if (treeNode.ID == _this.findListParams.areaId) {
                    if (_this.tBodyList) {
                        return;
                    }
                }
                _this.findListParams.areaId = treeNode.ID;
                _this.findListParams.currentPage = 1;
                _this.findListParams.areaId = treeNode.ID;
                _this.findListParams.currentPage = 1;
                _this.getListByParams(_this.findListParams);
            };
            this.areaTreeDatas.treeInitComplete = function () {
            };
            this.getAreaTreeList();
            $scope.$on("device.closePopup", function (event, isRefresh) {
                _this.closeWifiChangePopup(isRefresh);
            });
        }
        baseConfigWifiController.prototype.initParams = function () {
            this.tableNoData = false;
            this.pageParams = new page_params_1.default();
            this.Type = 'WiFi';
            this.findListParams = new WifiParams_1.WifiListParams();
            this.findListParams.currentPage = 1;
            this.findListParams.pageSize = this.pageParams.pageSize;
            this.findListParams.areaId = "";
            this.findListParams.sortName = "Code";
            this.findListParams.isAsc = true;
            this.SearchParams = {
                Name: ''
            };
            this.tBodyList = [];
            this.setTableHead();
            this.isSelectItems = false;
        };
        baseConfigWifiController.prototype.editAreaTd = function (data) {
            var scope = this.$scope.$new();
            scope.id = this.findListParams.areaId;
            scope.WifiData = data;
            scope.areaDatas = this.areaTreeDatas.treeDatas;
            this.currentLayerIndex = this.layer.open({
                type: 1,
                content: createHtml,
                scope: scope,
                title: this.i18nFactory("DP_CONFIG_WIFI_02"),
                area: ["350px", "auto"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        baseConfigWifiController.prototype._getCasCadeSearchParams = function (tableParams) {
            if (!tableParams)
                return {};
            var result = new casecade_service_1.CasCadeSearchParams();
            result.pageIndex = tableParams.currentPage;
            result.orderField = tableParams.sortName;
            result.pageSize = tableParams.pageSize;
            result.areaId = tableParams.areaId;
            result.isAsc = tableParams.isAsc;
            if (tableParams.Name) {
                result.name = tableParams.Name;
            }
            return result;
        };
        baseConfigWifiController.prototype._getSearchType = function () {
            return this.Type;
        };
        baseConfigWifiController.prototype.getListByParams = function (params) {
            var _this = this;
            this.casCadeService.findWifiList(this._getCasCadeSearchParams(params)).then(function (res) {
                if (res && res.data && res.code === 200) {
                    _this.setTableBody(res.data, res.count);
                }
                else {
                    _this.setTableBody([], 0);
                }
                _this.findListParams = params;
            });
        };
        baseConfigWifiController.prototype.setTableBody = function (dataList, total) {
            if (dataList && dataList.length > 0) {
                this.tBodyList = dataList;
                this.tableNoData = false;
                var _pageParams = new page_params_1.default();
                _pageParams.currentPage = this.findListParams.currentPage;
                _pageParams.pageSize = this.findListParams.pageSize;
                _pageParams.setTotalCount(total);
                this.pageParams = _pageParams;
            }
            else {
                this.tBodyList = [];
                this.tableNoData = true;
            }
        };
        baseConfigWifiController.prototype.getAreaTreeList = function (keyword) {
            var _this = this;
            var params = this.areaTreeDatas.reqParams;
            params.keyword = keyword;
            this.areaService.findListTree(params).then(function (resp) {
                if (resp) {
                    _this.areaTreeDatas.finishedNoData = false;
                }
                else {
                    _this.areaTreeDatas.finishedNoData = true;
                }
                _this.$timeout(function () {
                    _this.setAreaTreeDatas(resp);
                });
            });
        };
        ;
        baseConfigWifiController.prototype.setAreaTreeDatas = function (treeDatas) {
            this.areaTreeDatas.treeDatas = treeDatas;
        };
        ;
        baseConfigWifiController.prototype.areaTreeSearchInputKeyUp = function (e) {
            if (e.keyCode === 13) {
                this.getAreaTreeList(this.areaTreeSearchInputStr);
            }
        };
        ;
        baseConfigWifiController.prototype.areaTreeSearchInput = function () {
            this.getAreaTreeList(this.areaTreeSearchInputStr);
        };
        ;
        baseConfigWifiController.prototype.sortByField = function (_index, field, sortStatus) {
            this.findListParams.isAsc = sortStatus;
            this.findListParams.sortName = field;
            this.getListByParams(this.findListParams);
        };
        baseConfigWifiController.prototype.afterChangeCheck = function (resultList, isCheckAll) {
            this.setIsSelectItems(resultList);
            this.selectedList = resultList;
            this.isSelectAll = isCheckAll;
        };
        ;
        baseConfigWifiController.prototype.getSelectedList = function () {
            var _this = this;
            var selectedDataList = [];
            if (this.selectedList) {
                this.tBodyList.forEach(function (ivsServer, index) {
                    if (_this.selectedList[index]) {
                        selectedDataList.push(ivsServer);
                    }
                });
            }
            return selectedDataList;
        };
        ;
        baseConfigWifiController.prototype.configDevices = function (type) {
            var scope = this.$scope.$new();
            scope.type = type;
            if (type === 'area') {
                this.currentLayerIndex = this.layer.open({
                    type: 1,
                    content: popupWifiHtml,
                    scope: scope,
                    title: this.i18nFactory("DP_CONFIG_COMMON_08"),
                    area: ["570px", "auto"],
                    end: function () {
                        scope.$destroy();
                    }
                });
            }
            else {
                this.currentLayerIndex = this.layer.open({
                    type: 1,
                    content: popupWifiHtml,
                    scope: scope,
                    title: this.i18nFactory("DP_CONFIG_COMMON_07"),
                    area: ["570px", "auto"],
                    end: function () {
                        scope.$destroy();
                    }
                });
            }
        };
        baseConfigWifiController.prototype.changePage = function (num) {
            this.findListParams.currentPage = num;
            this.getListByParams(this.findListParams);
        };
        baseConfigWifiController.prototype.changePageSize = function (num) {
            this.findListParams.currentPage = 1;
            this.findListParams.pageSize = num;
            this.getListByParams(this.findListParams);
        };
        baseConfigWifiController.prototype.closeWifiChangePopup = function (flag) {
            var _this = this;
            this.layer.close(this.currentLayerIndex);
            this.currentLayerIndex = -1;
            if (flag) {
                this.findListParams.currentPage = 1;
                this.$timeout(function () {
                    _this.getListByParams(_this.findListParams);
                }, 500);
            }
        };
        baseConfigWifiController.prototype.setIsSelectItems = function (items) {
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
            if (this.isSelectItems !== result) {
                this.isSelectItems = result;
            }
        };
        baseConfigWifiController.prototype.setLamp = function (data) {
            var scope = this.$scope.$new();
            scope.deviceData = data;
            scope.type = this.Type;
            this.currentLayerIndex = this.layer.open({
                type: 1,
                content: popupLampHtml,
                scope: scope,
                title: this.i18nFactory('DP_CONFIG_COMMON_17'),
                area: ["300px", "480px"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        baseConfigWifiController.prototype.search = function () {
            this.findListParams.Name = this.SearchParams.Name;
            this.getListByParams(this.findListParams);
        };
        baseConfigWifiController.prototype.create = function () {
            var scope = this.$scope.$new();
            this.currentLayerIndex = this.layer.open({
                type: 1,
                content: createHtml,
                scope: scope,
                title: "新增",
                area: ["300px", "480px"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        baseConfigWifiController.$inject = ['$scope', '$timeout', 'wifiService', 'areaService', 'layer', 'casCadeService', 'i18nFactory'];
        return baseConfigWifiController;
    }());
    main_app_1.app
        .controller('baseConfigWifiController', baseConfigWifiController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy93aWZpL3dpZmkuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFxQ0E7UUEyQkksa0NBQW9CLE1BQVcsRUFDbkIsUUFBYSxFQUNiLFdBQXlCLEVBQ3pCLFdBQXlCLEVBQ3pCLEtBQVUsRUFDVixjQUErQixFQUMvQixXQUFnQjtZQU41QixpQkFzQ0M7WUF0Q21CLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDbkIsYUFBUSxHQUFSLFFBQVEsQ0FBSztZQUNiLGdCQUFXLEdBQVgsV0FBVyxDQUFjO1lBQ3pCLGdCQUFXLEdBQVgsV0FBVyxDQUFjO1lBQ3pCLFVBQUssR0FBTCxLQUFLLENBQUs7WUFDVixtQkFBYyxHQUFkLGNBQWMsQ0FBaUI7WUFDL0IsZ0JBQVcsR0FBWCxXQUFXLENBQUs7WUFoQjVCLDJCQUFzQixHQUFXLEVBQUUsQ0FBQztZQXVFcEMsaUJBQVksR0FBRztnQkFDWCxLQUFJLENBQUMsYUFBYSxHQUFHO29CQUNqQixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLHFCQUFxQixFQUFFO29CQUMvQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLHFCQUFxQixFQUFFO29CQUMvQyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLHFCQUFxQixFQUFFO29CQUV0RCxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLHFCQUFxQixFQUFFO29CQUNwRCxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLHFCQUFxQixFQUFFO29CQUNuRCxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLHFCQUFxQixFQUFFO2lCQUNyRCxDQUFDO1lBQ04sQ0FBQyxDQUFBO1lBc0JELHVCQUFrQixHQUFHLFVBQUMsWUFBb0I7Z0JBQ3RDLEVBQUUsQ0FBQyxDQUFDLFlBQVksS0FBSyxLQUFJLENBQUMsSUFBSSxDQUFDO29CQUFD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Q3JDLElBQUksRUFBRSxDQUFDO2dCQUNQLE9BQU8sRUFBRSxVQUFVO2dCQUNuQixLQUFLLEVBQUUsS0FBSztnQkFDWixLQUFLLEVBQUUsSUFBSTtnQkFDWCxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO2dCQUN4QixHQUFHLEVBQUU7b0JBQ0QsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNyQixDQUFDO2FBQ0osQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQWxXTSxnQ0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLENBQUMsQ0FBQztRQW9XcEgsK0JBQUM7S0FyV0QsQUFxV0MsSUFBQTtJQUVELGNBQUc7U0FDRSxVQUFVLENBQUMsMEJBQTBCLEVBQUUsd0JBQXdCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvYmFzZWNvbmZpZy93aWZpL3dpZmkuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGRlbGwgb24gMjAxNy8zLzIzLlxyXG4gKi9cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuL3dpZmkucG9wdXBXaWZpLmh0bWxcIiBuYW1lPVwicG9wdXBXaWZpSHRtbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi93aWZpLnBvcHVwTGFtcC5odG1sXCIgbmFtZT1cInBvcHVwTGFtcEh0bWxcIiAvPlxyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4vd2lmaS53aWZpQ3JlYXRlLmh0bWxcIiBuYW1lPVwiY3JlYXRlSHRtbFwiIC8+XHJcbmltcG9ydCBcImNzcyEuLi9jc3MvYmFzZWNvbmZpZy1kZXZpY2UuY3NzXCI7XHJcbmltcG9ydCB7IGFwcCB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCBcIi4vd2lmaS5wb3B1cFdpZmkuY29udHJvbGxlclwiO1xyXG5pbXBvcnQgXCIuL3dpZmkucG9wdXBMYW1wLmNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFwiLi93aWZpLndpZmlDcmVhdGUuY29udHJvbGxlclwiO1xyXG5cclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FyZWEuc2VydmljZVwiO1xyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vc2VydmljZXMvd2lmaS5zZXJ2aWNlXCI7XHJcbmltcG9ydCBQYWdlUGFyYW1zIGZyb20gXCIuLi8uLi9jb21tb24vZGlyZWN0aXZlL3BhZ2UvcGFnZS1wYXJhbXNcIjtcclxuaW1wb3J0IHsgSUNhc0NhZGVTZXJ2aWNlLCBDYXNDYWRlU2VhcmNoUGFyYW1zIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9jYXNlY2FkZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IElBcmVhU2VydmljZSB9IGZyb20gXCIuLi8uLi9jb21tb24vc2VydmljZXMvYXJlYS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IElXaWZpU2VydmljZSB9IGZyb20gXCIuLi8uLi9jb21tb24vc2VydmljZXMvd2lmaS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IElUYWJsZUhlYWRlciB9IGZyb20gXCIuLi8uLi9jb21tb24vZGlyZWN0aXZlL3VuaXQtdGFibGUvdGFibGUtcGFyYW1zXCI7XHJcbmltcG9ydCB7IFRyZWVEYXRhUGFyYW1zIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLXBhcmFtc1wiO1xyXG5cclxuaW1wb3J0IHsgRW51bSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudW0vRW51bVwiO1xyXG5pbXBvcnQgeyBXaWZpTGlzdFBhcmFtcywgV2lmaUNoYW5nZUFyZWFJRE1vZGVsIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL1dpZmlQYXJhbXNcIjtcclxuaW1wb3J0IHsgV2lmaUV4IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L1dpZmlFeFwiO1xyXG5pbXBvcnQgeyBSZXNwb25zZVJlc3VsdCwgUGFnZVJlc3VsdCB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHsgQXJlYUV4IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0FyZWFFeFwiO1xyXG5pbXBvcnQgeyBUcmVlUGFyYW1zIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3RyZWUvVHJlZVBhcmFtc1wiO1xyXG5pbXBvcnQgeyBBcmVhIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L0FyZWFcIjtcclxuaW1wb3J0IHsgV2lmaVR5cGVFbnVtIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vV2lmaVR5cGVFbnVtXCI7XHJcbmltcG9ydCB7IFdpZmkgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9XaWZpJztcclxuXHJcbmRlY2xhcmUgdmFyIHBvcHVwV2lmaUh0bWw6IGFueTtcclxuZGVjbGFyZSB2YXIgY3JlYXRlSHRtbDogYW55O1xyXG5kZWNsYXJlIHZhciBwb3B1cExhbXBIdG1sOiBhbnk7XHJcblxyXG5cclxuLyogYmNEZXZpY2VDdHJsICovXHJcbmNsYXNzIGJhc2VDb25maWdXaWZpQ29udHJvbGxlciB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHNjb3BlJywgJyR0aW1lb3V0JywgJ3dpZmlTZXJ2aWNlJywgJ2FyZWFTZXJ2aWNlJywgJ2xheWVyJywgJ2Nhc0NhZGVTZXJ2aWNlJywgJ2kxOG5GYWN0b3J5J107XHJcblxyXG4gICAgZmluZExpc3RQYXJhbXM6IFdpZmlMaXN0UGFyYW1zO1xyXG4gICAgcGFnZVBhcmFtczogUGFnZVBhcmFtcztcclxuXHJcbiAgICAvLy0tLXRhYmxlXHJcbiAgICAvLyB0YWJsZSDliJfooajmlbDmja5cclxuICAgIHRIZWFkTGlzdFdpZmk6IEFycmF5PElUYWJsZUhlYWRlcj47XHJcbiAgICB0Qm9keUxpc3Q6IGFueTtcclxuICAgIFR5cGU6IHN0cmluZztcclxuICAgIHRhYmxlTm9EYXRhOiBib29sZWFuO1xyXG4gICAgU2VhcmNoUGFyYW1zOiBhbnk7XHJcblxyXG4gICAgLy9hcmVhIHRyZWVcclxuICAgIGFyZWFUcmVlRGF0YXM6IFRyZWVEYXRhUGFyYW1zPEFyZWE+O1xyXG4gICAgLy9zZWFyY2hcclxuICAgIGFyZWFUcmVlU2VhcmNoSW5wdXRTdHI6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgLy/lpJrpgInnm7jlhbNcclxuICAgIHNlbGVjdGVkTGlzdDogQXJyYXk8Ym9vbGVhbj47XHJcbiAgICBpc1NlbGVjdEFsbDogYm9vbGVhbjtcclxuXHJcbiAgICBjdXJyZW50TGF5ZXJJbmRleDogbnVtYmVyO1xyXG5cclxuICAgIGlzU2VsZWN0SXRlbXM6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSxcclxuICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSB3aWZpU2VydmljZTogSVdpZmlTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgYXJlYVNlcnZpY2U6IElBcmVhU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGxheWVyOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBjYXNDYWRlU2VydmljZTogSUNhc0NhZGVTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgaTE4bkZhY3Rvcnk6IGFueSkge1xyXG4gICAgICAgIHRoaXMuaW5pdFBhcmFtcygpO1xyXG4gICAgICAgIC8vIOagkeWIl+ihqOaVsOaNrlxyXG4gICAgICAgIC8v5Yid5aeL5YyWIGFyZWEg5qCR5pWw5o2uXHJcbiAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzID0gbmV3IFRyZWVEYXRhUGFyYW1zPEFyZWFFeD4oKTtcclxuICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMudHJlZUlkID0gJ2FyZWFUcmVlSXZzJztcclxuICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMuaXNEZWZhdWx0U2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy5vbkNsaWNrID0gKGV2ZW50OiBNb3VzZUV2ZW50LCB0cmVlSWQ6IHN0cmluZywgdHJlZU5vZGU6IEFyZWFFeCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodHJlZU5vZGUuSUQgPT0gdGhpcy5maW5kTGlzdFBhcmFtcy5hcmVhSWQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRCb2R5TGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2luaXQgcmVxX3BhcmFtc1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLmFyZWFJZCA9IHRyZWVOb2RlLklEO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5hcmVhSWQgPSB0cmVlTm9kZS5JRDtcclxuICAgICAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0TGlzdEJ5UGFyYW1zKHRoaXMuZmluZExpc3RQYXJhbXMpO1xyXG5cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy50cmVlSW5pdENvbXBsZXRlID0gKCkgPT4ge1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICAvL+iOt+WPluWMuuWfn+WIl+ihqFxyXG4gICAgICAgIHRoaXMuZ2V0QXJlYVRyZWVMaXN0KCk7XHJcblxyXG4gICAgICAgIC8vIOW8ueWHuuahhuebuOWFs1xyXG4gICAgICAgICRzY29wZS4kb24oXCJkZXZpY2UuY2xvc2VQb3B1cFwiLCAoZXZlbnQ6IGFueSwgaXNSZWZyZXNoPzogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlV2lmaUNoYW5nZVBvcHVwKGlzUmVmcmVzaCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFBhcmFtcygpIHtcclxuICAgICAgICB0aGlzLnRhYmxlTm9EYXRhID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wYWdlUGFyYW1zID0gbmV3IFBhZ2VQYXJhbXMoKTtcclxuICAgICAgICB0aGlzLlR5cGUgPSAnV2lGaSc7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcyA9IG5ldyBXaWZpTGlzdFBhcmFtcygpO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMucGFnZVNpemUgPSB0aGlzLnBhZ2VQYXJhbXMucGFnZVNpemU7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5hcmVhSWQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuc29ydE5hbWUgPSBcIkNvZGVcIjtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLmlzQXNjID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLlNlYXJjaFBhcmFtcyA9IHtcclxuICAgICAgICAgICAgTmFtZTogJydcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudEJvZHlMaXN0ID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuc2V0VGFibGVIZWFkKCk7XHJcblxyXG4gICAgICAgIHRoaXMuaXNTZWxlY3RJdGVtcyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRhYmxlSGVhZCA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnRIZWFkTGlzdFdpZmkgPSBbXHJcbiAgICAgICAgICAgIHsgZmllbGQ6ICdOYW1lJywgdGl0bGU6ICdEUF9DT05GSUdfQ09NTU9OXzAzJyB9LFxyXG4gICAgICAgICAgICB7IGZpZWxkOiAnQ29kZScsIHRpdGxlOiAnRFBfQ09ORklHX0NPTU1PTl8wNCcgfSxcclxuICAgICAgICAgICAgeyBmaWVsZDogJ0Rlc2NyaXB0aW9uJywgdGl0bGU6ICdEUF9DT05GSUdfQ09NTU9OXzA5JyB9LFxyXG4gICAgICAgICAgICAvLyB7ZmllbGQgOiAnU2VydmVySXAnLHRpdGxlOidEUF9DT05GSUdfQ09NTU9OXzEyJ30sXHJcbiAgICAgICAgICAgIHsgZmllbGQ6ICdMb25naXR1ZGUnLCB0aXRsZTogJ0RQX0NPTkZJR19DT01NT05fMTMnIH0sXHJcbiAgICAgICAgICAgIHsgZmllbGQ6ICdMYXRpdHVkZScsIHRpdGxlOiAnRFBfQ09ORklHX0NPTU1PTl8xNCcgfSxcclxuICAgICAgICAgICAgeyBmaWVsZDogJ09wZXJhdGUnLCB0aXRsZTogJ0RQX0NPTkZJR19DT01NT05fMTUnIH0sXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICAvL+e8lui+keaTjeS9nFxyXG4gICAgZWRpdEFyZWFUZChkYXRhOiBXaWZpKSB7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IGlkOiBzdHJpbmcsIFdpZmlEYXRhOiBXaWZpLCBhcmVhRGF0YXM6IGFueSwgdHlwZTogc3RyaW5nLCAkZGVzdHJveTogRnVuY3Rpb24gfSA9IHRoaXMuJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICBzY29wZS5pZCA9IHRoaXMuZmluZExpc3RQYXJhbXMuYXJlYUlkO1xyXG4gICAgICAgIHNjb3BlLldpZmlEYXRhID0gZGF0YSBhcyBXaWZpO1xyXG4gICAgICAgIHNjb3BlLmFyZWFEYXRhcyA9IHRoaXMuYXJlYVRyZWVEYXRhcy50cmVlRGF0YXM7XHJcbiAgICAgICAgLy8g6L+Z6YeM5a+5c2NvcGXov5vooYzkuIDmrKHmlrDlu7pcclxuICAgICAgICB0aGlzLmN1cnJlbnRMYXllckluZGV4ID0gdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgY29udGVudDogY3JlYXRlSHRtbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5pMThuRmFjdG9yeShcIkRQX0NPTkZJR19XSUZJXzAyXCIpLFxyXG4gICAgICAgICAgICBhcmVhOiBbXCIzNTBweFwiLCBcImF1dG9cIl0sXHJcbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrVGFza1R5cGVCdG4gPSAoYnRuSXRlbVZhbHVlOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICAgICAgICBpZiAoYnRuSXRlbVZhbHVlID09PSB0aGlzLlR5cGUpIHJldHVybjtcclxuICAgICAgICB0aGlzLlR5cGUgPSBidG5JdGVtVmFsdWU7XHJcbiAgICAgICAgdGhpcy5nZXRMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdFBhcmFtcylcclxuICAgIH07XHJcblxyXG4gICAgX2dldENhc0NhZGVTZWFyY2hQYXJhbXModGFibGVQYXJhbXM6IFdpZmlMaXN0UGFyYW1zKSB7XHJcbiAgICAgICAgaWYgKCF0YWJsZVBhcmFtcykgcmV0dXJuIHt9IGFzIENhc0NhZGVTZWFyY2hQYXJhbXM7XHJcblxyXG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgQ2FzQ2FkZVNlYXJjaFBhcmFtcygpO1xyXG4gICAgICAgIHJlc3VsdC5wYWdlSW5kZXggPSB0YWJsZVBhcmFtcy5jdXJyZW50UGFnZTtcclxuICAgICAgICByZXN1bHQub3JkZXJGaWVsZCA9IHRhYmxlUGFyYW1zLnNvcnROYW1lO1xyXG4gICAgICAgIHJlc3VsdC5wYWdlU2l6ZSA9IHRhYmxlUGFyYW1zLnBhZ2VTaXplO1xyXG4gICAgICAgIHJlc3VsdC5hcmVhSWQgPSB0YWJsZVBhcmFtcy5hcmVhSWQ7XHJcbiAgICAgICAgcmVzdWx0LmlzQXNjID0gdGFibGVQYXJhbXMuaXNBc2M7XHJcbiAgICAgICAgaWYgKHRhYmxlUGFyYW1zLk5hbWUpIHtcclxuICAgICAgICAgICAgcmVzdWx0Lm5hbWUgPSB0YWJsZVBhcmFtcy5OYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRTZWFyY2hUeXBlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlR5cGVcclxuICAgIH1cclxuXHJcbiAgICBnZXRMaXN0QnlQYXJhbXMocGFyYW1zOiBXaWZpTGlzdFBhcmFtcykge1xyXG4gICAgICAgIHRoaXMuY2FzQ2FkZVNlcnZpY2UuZmluZFdpZmlMaXN0KHRoaXMuX2dldENhc0NhZGVTZWFyY2hQYXJhbXMocGFyYW1zKSkudGhlbigocmVzOiBSZXNwb25zZVJlc3VsdDxBcnJheTxXaWZpRXg+PikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzICYmIHJlcy5kYXRhICYmIHJlcy5jb2RlID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VGFibGVCb2R5KHJlcy5kYXRhLCByZXMuY291bnQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUYWJsZUJvZHkoW10sIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMgPSBwYXJhbXM7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGFibGVCb2R5KGRhdGFMaXN0OiBhbnksIHRvdGFsOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoZGF0YUxpc3QgJiYgZGF0YUxpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnRCb2R5TGlzdCA9IGRhdGFMaXN0O1xyXG4gICAgICAgICAgICB0aGlzLnRhYmxlTm9EYXRhID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBsZXQgX3BhZ2VQYXJhbXMgPSBuZXcgUGFnZVBhcmFtcygpO1xyXG4gICAgICAgICAgICBfcGFnZVBhcmFtcy5jdXJyZW50UGFnZSA9IHRoaXMuZmluZExpc3RQYXJhbXMuY3VycmVudFBhZ2U7XHJcbiAgICAgICAgICAgIF9wYWdlUGFyYW1zLnBhZ2VTaXplID0gdGhpcy5maW5kTGlzdFBhcmFtcy5wYWdlU2l6ZTtcclxuICAgICAgICAgICAgX3BhZ2VQYXJhbXMuc2V0VG90YWxDb3VudCh0b3RhbCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBhZ2VQYXJhbXMgPSBfcGFnZVBhcmFtcztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnRCb2R5TGlzdCA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLnRhYmxlTm9EYXRhID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5pWw5o2u6I635Y+WXHJcbiAgICBnZXRBcmVhVHJlZUxpc3Qoa2V5d29yZD86IHN0cmluZykge1xyXG4gICAgICAgIGxldCBwYXJhbXM6IFRyZWVQYXJhbXMgPSB0aGlzLmFyZWFUcmVlRGF0YXMucmVxUGFyYW1zO1xyXG4gICAgICAgIHBhcmFtcy5rZXl3b3JkID0ga2V5d29yZDtcclxuICAgICAgICB0aGlzLmFyZWFTZXJ2aWNlLmZpbmRMaXN0VHJlZShwYXJhbXMpLnRoZW4oKHJlc3A6IEFycmF5PEFyZWFFeD4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3ApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy5maW5pc2hlZE5vRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzLmZpbmlzaGVkTm9EYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXJlYVRyZWVEYXRhcyhyZXNwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH07XHJcblxyXG4gICAgLy8g5qCR6LWL5YC8XHJcbiAgICBzZXRBcmVhVHJlZURhdGFzKHRyZWVEYXRhczogQXJyYXk8QXJlYUV4Pikge1xyXG4gICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy50cmVlRGF0YXMgPSB0cmVlRGF0YXM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIOagkeaQnOe0olxyXG4gICAgYXJlYVRyZWVTZWFyY2hJbnB1dEtleVVwKGU6IGFueSkge1xyXG4gICAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0QXJlYVRyZWVMaXN0KHRoaXMuYXJlYVRyZWVTZWFyY2hJbnB1dFN0cik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyDmoJHmkJzntKJcclxuICAgIGFyZWFUcmVlU2VhcmNoSW5wdXQoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRBcmVhVHJlZUxpc3QodGhpcy5hcmVhVHJlZVNlYXJjaElucHV0U3RyKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8vIOWNleagj+mAieaLqeaOkuW6j1xyXG4gICAgc29ydEJ5RmllbGQoX2luZGV4OiBudW1iZXIsIGZpZWxkOiBzdHJpbmcsIHNvcnRTdGF0dXM6IGJvb2xlYW4pIHtcclxuXHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5pc0FzYyA9IHNvcnRTdGF0dXM7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5zb3J0TmFtZSA9IGZpZWxkO1xyXG5cclxuICAgICAgICB0aGlzLmdldExpc3RCeVBhcmFtcyh0aGlzLmZpbmRMaXN0UGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmAieaLqeafkOS4gOadoeaVsOaNrlxyXG4gICAgICogQHRpbWU6IDIwMTctMDQtMjEgMTk6NDM6MDdcclxuICAgICAqIEBwYXJhbXM6XHJcbiAgICAgKiBAcmV0dXJuOlxyXG4gICAgICovXHJcbiAgICBhZnRlckNoYW5nZUNoZWNrKHJlc3VsdExpc3Q6IEFycmF5PGJvb2xlYW4+LCBpc0NoZWNrQWxsOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRJc1NlbGVjdEl0ZW1zKHJlc3VsdExpc3QpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0ID0gcmVzdWx0TGlzdDtcclxuICAgICAgICB0aGlzLmlzU2VsZWN0QWxsID0gaXNDaGVja0FsbDtcclxuICAgIH07XHJcblxyXG4gICAgLy/ojrflj5blvZPliY3lt7LooqvpgInkuK3liJfooahcclxuICAgIGdldFNlbGVjdGVkTGlzdCgpOiBBcnJheTxXaWZpRXg+IHtcclxuICAgICAgICBsZXQgc2VsZWN0ZWREYXRhTGlzdDogQXJyYXk8V2lmaUV4PiA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLnRCb2R5TGlzdC5mb3JFYWNoKChpdnNTZXJ2ZXI6IFdpZmlFeCwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRMaXN0W2luZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRGF0YUxpc3QucHVzaChpdnNTZXJ2ZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkRGF0YUxpc3Q7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGNvbmZpZ0RldmljZXNcclxuICAgIGNvbmZpZ0RldmljZXModHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IHR5cGU6IHN0cmluZywgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUudHlwZSA9IHR5cGVcclxuICAgICAgICAvLyDov5nph4zlr7lzY29wZei/m+ihjOS4gOasoeaWsOW7ulxyXG5cclxuICAgICAgICBpZiAodHlwZSA9PT0gJ2FyZWEnKSB7XHJcbiAgICAgICAgICAgIC8vIOi/memHjOWvuXNjb3Bl6L+b6KGM5LiA5qyh5paw5bu6XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudExheWVySW5kZXggPSB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHBvcHVwV2lmaUh0bWwsXHJcbiAgICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5pMThuRmFjdG9yeShcIkRQX0NPTkZJR19DT01NT05fMDhcIiksXHJcbiAgICAgICAgICAgICAgICBhcmVhOiBbXCI1NzBweFwiLCBcImF1dG9cIl0sXHJcbiAgICAgICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDov5nph4zlr7lzY29wZei/m+ihjOS4gOasoeaWsOW7ulxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRMYXllckluZGV4ID0gdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBwb3B1cFdpZmlIdG1sLFxyXG4gICAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMuaTE4bkZhY3RvcnkoXCJEUF9DT05GSUdfQ09NTU9OXzA3XCIpLFxyXG4gICAgICAgICAgICAgICAgYXJlYTogW1wiNTcwcHhcIiwgXCJhdXRvXCJdLFxyXG4gICAgICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL2Fib3V0IHBhZ2UgY2xpY2tcclxuICAgIGNoYW5nZVBhZ2UobnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLmN1cnJlbnRQYWdlID0gbnVtO1xyXG4gICAgICAgIHRoaXMuZ2V0TGlzdEJ5UGFyYW1zKHRoaXMuZmluZExpc3RQYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVBhZ2VTaXplKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5wYWdlU2l6ZSA9IG51bTtcclxuICAgICAgICB0aGlzLmdldExpc3RCeVBhcmFtcyh0aGlzLmZpbmRMaXN0UGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZVdpZmlDaGFuZ2VQb3B1cChmbGFnPzogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMubGF5ZXIuY2xvc2UodGhpcy5jdXJyZW50TGF5ZXJJbmRleCk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGF5ZXJJbmRleCA9IC0xO1xyXG4gICAgICAgIGlmIChmbGFnKSB7XHJcbiAgICAgICAgICAgIC8vIOWIt+aWsOeVjOmdolxyXG4gICAgICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldExpc3RCeVBhcmFtcyh0aGlzLmZpbmRMaXN0UGFyYW1zKTtcclxuICAgICAgICAgICAgfSwgNTAwKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0b3Igd3lyOiDliKTmlq3lkozorr7nva7lvZPliY3liJfooajmmK/lkKbmnInpgInkuK3nmoTlhYPntKBcclxuICAgICAqIEBwYXJhbSBpdGVtc1xyXG4gICAgICovXHJcbiAgICBzZXRJc1NlbGVjdEl0ZW1zKGl0ZW1zOiBBcnJheTxib29sZWFuPikge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICBpZiAoaXRlbXMgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgaSwgbGVuO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBpdGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1zW2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5pc1NlbGVjdEl0ZW1zICE9PSByZXN1bHQpIHtcclxuICAgICAgICAgICAgdGhpcy5pc1NlbGVjdEl0ZW1zID0gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRMYW1wKGRhdGE6IFdpZmkpIHtcclxuXHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IGRldmljZURhdGE6IFdpZmksIHR5cGU6IHN0cmluZywgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUuZGV2aWNlRGF0YSA9IGRhdGFcclxuICAgICAgICBzY29wZS50eXBlID0gdGhpcy5UeXBlXHJcbiAgICAgICAgLy8g6L+Z6YeM5a+5c2NvcGXov5vooYzkuIDmrKHmlrDlu7pcclxuICAgICAgICB0aGlzLmN1cnJlbnRMYXllckluZGV4ID0gdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgY29udGVudDogcG9wdXBMYW1wSHRtbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5pMThuRmFjdG9yeSgnRFBfQ09ORklHX0NPTU1PTl8xNycpLFxyXG4gICAgICAgICAgICBhcmVhOiBbXCIzMDBweFwiLCBcIjQ4MHB4XCJdLFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzZWFyY2goKSB7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5OYW1lID0gdGhpcy5TZWFyY2hQYXJhbXMuTmFtZTtcclxuICAgICAgICB0aGlzLmdldExpc3RCeVBhcmFtcyh0aGlzLmZpbmRMaXN0UGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGUoKSB7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7ICRkZXN0cm95OiBGdW5jdGlvbiB9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIC8vIOi/memHjOWvuXNjb3Bl6L+b6KGM5LiA5qyh5paw5bu6XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGF5ZXJJbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGNyZWF0ZUh0bWwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgdGl0bGU6IFwi5paw5aKeXCIsXHJcbiAgICAgICAgICAgIGFyZWE6IFtcIjMwMHB4XCIsIFwiNDgwcHhcIl0sXHJcbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuYXBwXHJcbiAgICAuY29udHJvbGxlcignYmFzZUNvbmZpZ1dpZmlDb250cm9sbGVyJywgYmFzZUNvbmZpZ1dpZmlDb250cm9sbGVyKTsiXX0=
