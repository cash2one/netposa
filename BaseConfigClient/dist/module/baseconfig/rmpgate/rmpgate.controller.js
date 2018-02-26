define(["require", "exports", "text!./rmpgate.popupRmpGate.html", "text!./rmpgate.popupLamp.html", "text!./rmpgate.rmpgateCreate.html", "../../common/app/main.app", "../../../core/params/RmpGateParams", "../../common/directive/tree/tree-params", "../../common/directive/page/page-params", "../../common/services/casecade.service", "../../../core/server/enum/CameraTypeEnum", "css!../css/baseconfig-device.css", "./rmpgate.popupRmpGate.controller", "./rmpgate.popupLamp.controller", "./rmpgate.rmpgateCreate.controller", "../../common/services/area.service", "../../common/services/camera.service", "../../common/services/rmpgate.service"], function (require, exports, popupRmpGateHtml, popupLampHtml, createHtml, main_app_1, RmpGateParams_1, tree_params_1, page_params_1, casecade_service_1, CameraTypeEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var baseConfigRmpGateController = (function () {
        function baseConfigRmpGateController($scope, $timeout, rmpgateService, areaService, layer, casCadeService, i18nFactory) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.rmpgateService = rmpgateService;
            this.areaService = areaService;
            this.layer = layer;
            this.casCadeService = casCadeService;
            this.i18nFactory = i18nFactory;
            this.areaTreeSearchInputStr = "";
            this.setTableHead = function () {
                _this.tHeadListRmpGate = [
                    { field: 'Name', title: 'DP_CONFIG_COMMON_03' },
                    { field: 'Code', title: 'DP_CONFIG_COMMON_04' },
                    { field: 'JsonUserData.Area.Name', title: 'DP_CONFIG_COMMON_09' },
                    { field: 'Lon', title: 'DP_CONFIG_COMMON_13' },
                    { field: 'Lat', title: 'DP_CONFIG_COMMON_14' },
                    { field: '', title: 'DP_CONFIG_COMMON_15' },
                ];
            };
            this.initParams();
            this.areaTreeDatas = new tree_params_1.TreeDataParams();
            this.areaTreeDatas.treeId = 'areaTreeIvs';
            this.areaTreeDatas.isDefaultSelected = true;
            this.areaTreeDatas.onClick = treeSelectNode;
            this.areaTreeDatas.treeInitComplete = treeInitComplete;
            var self_this = this;
            function treeSelectNode(event, treeId, treeNode) {
                if (treeNode.ID == self_this.findListParams.areaId) {
                    if (self_this.tBodyList) {
                        return;
                    }
                }
                self_this.findListParams.areaId = treeNode.ID;
                self_this.findListParams.currentPage = 1;
                self_this.getListByParams(self_this.findListParams);
            }
            function treeInitComplete() {
            }
            this.getAreaTreeList();
            $scope.$on("device.closePopup", function (event, isRefresh) {
                _this.closeCameraChangePopup(isRefresh);
            });
        }
        baseConfigRmpGateController.prototype.initParams = function () {
            this.tableNoData = false;
            this.pageParams = new page_params_1.default();
            this.findListParams = new RmpGateParams_1.RmpGateListParams();
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
            this.cameraTypeList = CameraTypeEnum_1.CameraTypeEnum;
            this.isSelectItems = false;
        };
        baseConfigRmpGateController.prototype._getCasCadeSearchParams = function (tableParams) {
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
        baseConfigRmpGateController.prototype.getListByParams = function (params) {
            var _this = this;
            this.casCadeService.findRmpGateList(this._getCasCadeSearchParams(params)).then(function (res) {
                if (res && res.data && res.code === 200) {
                    _this.setTableBody(res.data, res.count);
                }
                else {
                    _this.setTableBody([], 0);
                }
                _this.findListParams = params;
            });
        };
        baseConfigRmpGateController.prototype.setTableBody = function (dataList, total) {
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
        baseConfigRmpGateController.prototype.getAreaTreeList = function (keyword) {
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
        baseConfigRmpGateController.prototype.areaTreeSearchInputKeyUp = function (e) {
            if (e.keyCode === 13) {
                this.getAreaTreeList(this.areaTreeSearchInputStr);
            }
        };
        ;
        baseConfigRmpGateController.prototype.areaTreeSearchInput = function () {
            this.getAreaTreeList(this.areaTreeSearchInputStr);
        };
        ;
        baseConfigRmpGateController.prototype.setAreaTreeDatas = function (treeDatas) {
            this.areaTreeDatas.treeDatas = treeDatas;
        };
        ;
        baseConfigRmpGateController.prototype.sortByField = function (_index, field, sortStatus) {
            this.findListParams.isAsc = sortStatus;
            this.findListParams.sortName = field;
            this.getListByParams(this.findListParams);
        };
        baseConfigRmpGateController.prototype.afterChangeCheck = function (resultList, isCheckAll) {
            this.setIsSelectItems(resultList);
            this.selectedList = resultList;
            this.isSelectAll = isCheckAll;
        };
        ;
        baseConfigRmpGateController.prototype.getSelectedList = function () {
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
        baseConfigRmpGateController.prototype.configDevices = function (type) {
            var scope = this.$scope.$new();
            scope.type = type;
            scope.RmpgateDatas = this.tBodyList;
            if (type === 'area') {
                this.currentLayerIndex = this.layer.open({
                    type: 1,
                    content: popupRmpGateHtml,
                    scope: scope,
                    title: this.i18nFactory("DP_CONFIG_COMMON_08"),
                    area: ["570px", "510px"],
                    end: function () {
                        scope.$destroy();
                    }
                });
            }
            else {
                this.currentLayerIndex = this.layer.open({
                    type: 1,
                    content: popupRmpGateHtml,
                    scope: scope,
                    title: this.i18nFactory("DP_CONFIG_COMMON_07"),
                    area: ["570px", "510px"],
                    end: function () {
                        scope.$destroy();
                    }
                });
            }
        };
        baseConfigRmpGateController.prototype.changePage = function (num) {
            this.findListParams.currentPage = num;
            this.getListByParams(this.findListParams);
        };
        baseConfigRmpGateController.prototype.changePageSize = function (num) {
            this.findListParams.currentPage = 1;
            this.findListParams.pageSize = num;
            this.getListByParams(this.findListParams);
        };
        baseConfigRmpGateController.prototype.closeCameraChangePopup = function (flag) {
            var _this = this;
            this.layer.close(this.currentLayerIndex);
            this.currentLayerIndex = -1;
            if (flag) {
                this.findListParams.currentPage = 1;
                this.$timeout(function () {
                    _this.getListByParams(_this.findListParams);
                }, 2000);
            }
        };
        baseConfigRmpGateController.prototype.setIsSelectItems = function (items) {
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
        baseConfigRmpGateController.prototype.setLamp = function (data) {
            var scope = this.$scope.$new();
            scope.deviceData = data;
            this.currentLayerIndex = this.layer.open({
                type: 1,
                content: popupLampHtml,
                scope: scope,
                title: this.i18nFactory("DP_CONFIG_COMMON_17"),
                area: ["300px", "480px"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        baseConfigRmpGateController.prototype.search = function () {
            this.findListParams.Name = this.SearchParams.Name;
            this.getListByParams(this.findListParams);
        };
        baseConfigRmpGateController.prototype.create = function () {
            var scope = this.$scope.$new();
            scope.type = 'add';
            this.currentLayerIndex = this.layer.open({
                type: 1,
                content: createHtml,
                scope: scope,
                title: "新增",
                area: ["400px", "500px"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        baseConfigRmpGateController.prototype.deleteCamera = function (data) {
        };
        baseConfigRmpGateController.prototype.editCamera = function (data) {
            var scope = this.$scope.$new();
            scope.id = this.findListParams.areaId;
            scope.RmpGate = data;
            this.currentLayerIndex = this.layer.open({
                type: 1,
                content: createHtml,
                scope: scope,
                title: this.i18nFactory('DP_CONFIG_RMPGATE_02'),
                area: ["350px", "auto"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        baseConfigRmpGateController.$inject = ['$scope', '$timeout', 'cameraService', 'areaService', 'layer', 'casCadeService', 'i18nFactory'];
        return baseConfigRmpGateController;
    }());
    main_app_1.app
        .controller('baseConfigRmpGateController', baseConfigRmpGateController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9ybXBnYXRlL3JtcGdhdGUuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUF1Q0E7UUE2QkkscUNBQW9CLE1BQVUsRUFDVixRQUFZLEVBQ1osY0FBOEIsRUFDOUIsV0FBd0IsRUFDeEIsS0FBVSxFQUNWLGNBQStCLEVBQy9CLFdBQWU7WUFObkMsaUJBc0NDO1lBdENtQixXQUFNLEdBQU4sTUFBTSxDQUFJO1lBQ1YsYUFBUSxHQUFSLFFBQVEsQ0FBSTtZQUNaLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtZQUM5QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtZQUN4QixVQUFLLEdBQUwsS0FBSyxDQUFLO1lBQ1YsbUJBQWMsR0FBZCxjQUFjLENBQWlCO1lBQy9CLGdCQUFXLEdBQVgsV0FBVyxDQUFJO1lBcEJuQywyQkFBc0IsR0FBVSxFQUFFLENBQUM7WUF5RW5DLGlCQUFZLEdBQUk7Z0JBQ1osS0FBSSxDQUFDLGdCQUFnQixHQUFHO29CQUNwQixFQUFDLEtBQUssRUFBRyxNQUFNLEVBQUMsS0FBSyxFQUFDLHFCQUFxQixFQUFDO29CQUM1QyxFQUFDLEtBQUssRUFBRyxNQUFNLEVBQUMsS0FBSyxFQUFDLHFCQUFxQixFQUFDO29CQUM1QyxFQUFDLEtBQUssRUFBRSx3QkFBd0IsRUFBQyxLQUFLLEVBQUMscUJBQXFCLEVBQUM7b0JBQzdELEVBQUMsS0FBSyxFQUFHLEtBQUssRUFBRSxLQUFLLEVBQUMscUJBQXFCLEVBQUM7b0JBQzVDLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUMscUJBQXFCLEVBQUM7b0JBQzNDLEVBQUMsS0FBSyxFQUFHLEVBQUUsRUFBQyxLQUFLLEVBQUMscUJBQXFCLEVBQUM7aUJBQzNDLENBQUM7WUFFTixDQUFDLENBQUE7WUE5REcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBR2xCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSw0QkFBYyxFQUFVLENBQUM7WUFDbEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDO1lBQzFDLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1lBQzVDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztZQUM1QyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1lBQ3ZELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQztZQUVyQix3QkFBd0IsS0FBaUIsRUFBRSxNQUFhLEVBQUUsUUFBZTtnQkFFckUsRUFBRSxDQUFBLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxTQUFTLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUM7b0JBQy9DLEVBQUUsQ0FBQSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQSxDQUFDO3dCQUNwQixNQUFNLENBQUM7b0JBQ1gsQ0FBQztnQkFDTCxDQUFDO2dCQUVELFNBQVMsQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUM7Z0JBQzlDLFNBQVMsQ0FBQyxjQUFjLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztnQkFDekMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDeEQsQ0FBQztZQUVEO1lBQ0EsQ0FBQztZQUNELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUd2QixNQUFNLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLFVBQUMsS0FBVSxFQUFFLFNBQW1CO2dCQUM1RCxLQUFJLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDM0MsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQsZ0RBQVUsR0FBVjtZQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxxQkFBVSxFQUFFLENBQUM7WUFDbkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGlDQUFpQixFQUFFLENBQUM7WUFDOUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBQ3hELElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7WUFDdEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxZQUFZLEdBQUc7Z0JBQ2hCLElBQUksRUFBQyxFQUFFO2FBQ1YsQ0FBQTtZQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBRXBCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtZQUNuQixJQUFJLENBQUMsY0FBYyxHQUFHLCtCQUFjLENBQUM7WUFDckMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDL0IsQ0FBQztRQWFELDZEQUF1QixHQUF2QixVQUF3QixXQUE4QjtZQUNsRCxFQUFFLENBQUEsQ0FBQyxDQUFDLFdBQVcsQ0FBQztnQkFBQyxNQUFNLENBQUMsRUFBeUIsQ0FBQztZQUNsRCxJQUFJLE1BQU0sR0FBRyxJQUFJLHNDQUFtQixFQUFFLENBQUM7WUFDdkMsTUFBTSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQztZQUN6QyxNQUFNLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUM7WUFDdkMsTUFBTSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO1lBQ25DLE1BQU0sQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUNqQyxFQUFFLENBQUEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQztnQkFDakIsTUFBTSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQ25DLENBQUM7WUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFDRCxxREFBZSxHQUFmLFVBQWdCLE1BQXdCO1lBQXhDLGlCQVNDO1lBUkcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBb0M7Z0JBQ2hILEVBQUUsQ0FBQSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUEsQ0FBQztvQkFDcEMsS0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDM0MsQ0FBQztnQkFBQSxJQUFJLENBQUEsQ0FBQztvQkFDRixLQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsQ0FBQztnQkFDRCxLQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQztZQUNqQyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRCxrREFBWSxHQUFaLFVBQWEsUUFBWSxFQUFDLEtBQVk7WUFDbEMsRUFBRSxDQUFBLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2dCQUN6QixJQUFJLFdBQVcsR0FBRyxJQUFJLHFCQUFVLEVBQUUsQ0FBQztnQkFDbkMsV0FBVyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQztnQkFDMUQsV0FBVyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQztnQkFDcEQsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUM7WUFDbEMsQ0FBQztZQUFBLElBQUksQ0FBQSxDQUFDO2dCQUNGLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO2dCQUNwQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUM1QixDQUFDO1FBQ0wsQ0FBQztRQUdELHFEQUFlLEdBQWYsVUFBZ0IsT0FBZTtZQUEvQixpQkFhQztZQVpHLElBQUksTUFBTSxHQUFjLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO1lBQ3JELE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLElBQWtCO2dCQUMxRCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDO29CQUNMLEtBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztnQkFDOUMsQ0FBQztnQkFBQSxJQUFJLENBQUEsQ0FBQztvQkFDRixLQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7Z0JBQzdDLENBQUM7Z0JBQ0QsS0FBSSxDQUFDLFFBQVEsQ0FBQztvQkFDVixLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hDLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO1FBQUEsQ0FBQztRQUVGLDhEQUF3QixHQUF4QixVQUF5QixDQUFLO1lBQzFCLEVBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssRUFBRSxDQUFDLENBQUEsQ0FBQztnQkFDakIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUN0RCxDQUFDO1FBQ0wsQ0FBQztRQUFBLENBQUM7UUFFRix5REFBbUIsR0FBbkI7WUFDSSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3RELENBQUM7UUFBQSxDQUFDO1FBRUYsc0RBQWdCLEdBQWhCLFVBQWlCLFNBQXdCO1lBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUM3QyxDQUFDO1FBQUEsQ0FBQztRQUdGLGlEQUFXLEdBQVgsVUFBWSxNQUFhLEVBQUMsS0FBWSxFQUFDLFVBQWtCO1lBRXJELElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztZQUN2QyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFFckMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDOUMsQ0FBQztRQVFELHNEQUFnQixHQUFoQixVQUFpQixVQUF5QixFQUFDLFVBQWtCO1lBQ3pELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQztZQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztRQUNsQyxDQUFDO1FBQUEsQ0FBQztRQUdGLHFEQUFlLEdBQWY7WUFBQSxpQkFVQztZQVRHLElBQUksZ0JBQWdCLEdBQW9CLEVBQUUsQ0FBQztZQUMzQyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUEsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxTQUFtQixFQUFDLEtBQVk7b0JBQ3BELEVBQUUsQ0FBQSxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUN6QixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3JDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1lBQ0QsTUFBTSxDQUFDLGdCQUFnQixDQUFDO1FBQzVCLENBQUM7UUFBQSxDQUFDO1FBR0YsbURBQWEsR0FBYixVQUFjLElBQVc7WUFDakIsSUFBSSxLQUFLLEdBQWdFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDNUYsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7WUFDakIsS0FBSyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFBO1lBQ25DLEVBQUUsQ0FBQSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQSxDQUFDO2dCQUVwQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7b0JBQ3JDLElBQUksRUFBRSxDQUFDO29CQUNQLE9BQU8sRUFBRSxnQkFBZ0I7b0JBQ3pCLEtBQUssRUFBRSxLQUFLO29CQUNaLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDO29CQUM5QyxJQUFJLEVBQUMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO29CQUN2QixHQUFHLEVBQUU7d0JBQ0QsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUNyQixDQUFDO2lCQUNKLENBQUMsQ0FBQztZQUNQLENBQUM7WUFBQSxJQUFJLENBQUEsQ0FBQztnQkFFRixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7b0JBQ3JDLElBQUksRUFBRSxDQUFDO29CQUNQLE9BQU8sRUFBRSxnQkFBZ0I7b0JBQ3pCLEtBQUssRUFBRSxLQUFLO29CQUNaLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDO29CQUM5QyxJQUFJLEVBQUMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO29CQUN2QixHQUFHLEVBQUU7d0JBQ0QsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUNyQixDQUFDO2lCQUNKLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDTCxDQUFDO1FBRUQsZ0RBQVUsR0FBVixVQUFXLEdBQVU7WUFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFDRCxvREFBYyxHQUFkLFVBQWUsR0FBVTtZQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1lBQ25DLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFFRCw0REFBc0IsR0FBdEIsVUFBdUIsSUFBYztZQUFyQyxpQkFVQztZQVRHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM1QixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDO2dCQUVMLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDVixLQUFJLENBQUMsZUFBZSxDQUFDLEtBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDOUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFBO1lBQ1gsQ0FBQztRQUNMLENBQUM7UUFPRCxzREFBZ0IsR0FBaEIsVUFBaUIsS0FBcUI7WUFDbEMsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ25CLEVBQUUsQ0FBQSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxTQUFBLEVBQUMsR0FBRyxTQUFBLENBQUM7Z0JBQ1YsR0FBRyxDQUFBLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxHQUFHLEdBQUMsS0FBSyxDQUFDLE1BQU0sRUFBQyxDQUFDLEdBQUMsR0FBRyxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUM7b0JBQ2hDLEVBQUUsQ0FBQSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQ1QsTUFBTSxHQUFHLElBQUksQ0FBQzt3QkFDZCxLQUFLLENBQUM7b0JBQ1YsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQztZQUNELEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxhQUFhLEtBQUssTUFBTSxDQUFDLENBQUEsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7WUFDaEMsQ0FBQztRQUNMLENBQUM7UUFFRCw2Q0FBTyxHQUFQLFVBQVEsSUFBWTtZQUNoQixJQUFJLEtBQUssR0FBc0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNsRSxLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUV4QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQ3JDLElBQUksRUFBRSxDQUFDO2dCQUNQLE9BQU8sRUFBRSxhQUFhO2dCQUN0QixLQUFLLEVBQUUsS0FBSztnQkFDWixLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQztnQkFDOUMsSUFBSSxFQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztnQkFDdkIsR0FBRyxFQUFFO29CQUNELEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDckIsQ0FBQzthQUNKLENBQUMsQ0FBQztRQUNQLENBQUM7UUFDRCw0Q0FBTSxHQUFOO1lBQ0ksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7WUFDbEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDOUMsQ0FBQztRQUNELDRDQUFNLEdBQU47WUFDSSxJQUFJLEtBQUssR0FBbUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMvRCxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQTtZQUVsQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQ3JDLElBQUksRUFBRSxDQUFDO2dCQUNQLE9BQU8sRUFBRSxVQUFVO2dCQUNuQixLQUFLLEVBQUUsS0FBSztnQkFDWixLQUFLLEVBQUUsSUFBSTtnQkFDWCxJQUFJLEVBQUMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO2dCQUN2QixHQUFHLEVBQUU7b0JBQ0QsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNyQixDQUFDO2FBQ0osQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNELGtEQUFZLEdBQVosVUFBYSxJQUFZO1FBQ3pCLENBQUM7UUFDTSxnREFBVSxHQUFqQixVQUFtQixJQUFZO1lBQzNCLElBQUksS0FBSyxHQUE2RCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3pGLEtBQUssQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUM7WUFDdEMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFlLENBQUM7WUFFaEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUNyQyxJQUFJLEVBQUUsQ0FBQztnQkFDUCxPQUFPLEVBQUUsVUFBVTtnQkFDbkIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osS0FBSyxFQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUM7Z0JBQzlDLElBQUksRUFBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7Z0JBQ3RCLEdBQUcsRUFBRTtvQkFDRCxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3JCLENBQUM7YUFDSixDQUFDLENBQUM7UUFDUCxDQUFDO1FBeFVNLG1DQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLGVBQWUsRUFBQyxhQUFhLEVBQUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLGFBQWEsQ0FBQyxDQUFDO1FBeVVoSCxrQ0FBQztLQTFVRCxBQTBVQyxJQUFBO0lBRUQsY0FBRztTQUNFLFVBQVUsQ0FBQyw2QkFBNkIsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9iYXNlY29uZmlnL3JtcGdhdGUvcm1wZ2F0ZS5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZGVsbCBvbiAyMDE3LzMvMjMuXHJcbiAqL1xyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4vcm1wZ2F0ZS5wb3B1cFJtcEdhdGUuaHRtbFwiIG5hbWU9XCJwb3B1cFJtcEdhdGVIdG1sXCIgLz5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuL3JtcGdhdGUucG9wdXBMYW1wLmh0bWxcIiBuYW1lPVwicG9wdXBMYW1wSHRtbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi9ybXBnYXRlLnJtcGdhdGVDcmVhdGUuaHRtbFwiIG5hbWU9XCJjcmVhdGVIdG1sXCIgLz5cclxuaW1wb3J0IFwiY3NzIS4uL2Nzcy9iYXNlY29uZmlnLWRldmljZS5jc3NcIjtcclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCBcIi4vcm1wZ2F0ZS5wb3B1cFJtcEdhdGUuY29udHJvbGxlclwiO1xyXG5pbXBvcnQgXCIuL3JtcGdhdGUucG9wdXBMYW1wLmNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFwiLi9ybXBnYXRlLnJtcGdhdGVDcmVhdGUuY29udHJvbGxlclwiO1xyXG5cclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FyZWEuc2VydmljZVwiO1xyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vc2VydmljZXMvY2FtZXJhLnNlcnZpY2VcIjtcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL3JtcGdhdGUuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHtFbnVtfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnVtL0VudW1cIjtcclxuaW1wb3J0IHtSbXBHYXRlTGlzdFBhcmFtcywgUm1wR2F0ZUNoYW5nZUFyZWFJRE1vZGVsfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvUm1wR2F0ZVBhcmFtc1wiO1xyXG5pbXBvcnQge1JtcEdhdGVFeH0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvUm1wR2F0ZUV4JztcclxuaW1wb3J0IHtSZXNwb25zZVJlc3VsdCwgUGFnZVJlc3VsdH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdFwiO1xyXG5pbXBvcnQge0lUYWJsZUhlYWRlcn0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdW5pdC10YWJsZS90YWJsZS1wYXJhbXNcIjtcclxuaW1wb3J0IHtUcmVlRGF0YVBhcmFtc30gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLXBhcmFtc1wiO1xyXG5pbXBvcnQge0FyZWFFeH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0FyZWFFeFwiO1xyXG5pbXBvcnQge1RyZWVQYXJhbXN9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy90cmVlL1RyZWVQYXJhbXNcIjtcclxuaW1wb3J0IHtJQXJlYVNlcnZpY2V9IGZyb20gXCIuLi8uLi9jb21tb24vc2VydmljZXMvYXJlYS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SVJtcEdhdGVTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL3JtcGdhdGUuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IFBhZ2VQYXJhbXMgZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvcGFnZS9wYWdlLXBhcmFtc1wiO1xyXG5pbXBvcnQge0FyZWF9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9BcmVhXCI7XHJcbmltcG9ydCB7SUNhc0NhZGVTZXJ2aWNlLCBDYXNDYWRlU2VhcmNoUGFyYW1zfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2Nhc2VjYWRlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtDYW1lcmFUeXBlRW51bX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vQ2FtZXJhVHlwZUVudW1cIjtcclxuaW1wb3J0IHsgUm1wR2F0ZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L1JtcEdhdGUnO1xyXG5cclxuZGVjbGFyZSB2YXIgcG9wdXBSbXBHYXRlSHRtbDogYW55O1xyXG5kZWNsYXJlIHZhciBjcmVhdGVIdG1sOiBhbnk7XHJcbmRlY2xhcmUgdmFyIHBvcHVwTGFtcEh0bWw6IGFueTtcclxuXHJcblxyXG4vKiBiY0RldmljZUN0cmwgKi9cclxuY2xhc3MgYmFzZUNvbmZpZ1JtcEdhdGVDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCckdGltZW91dCcsJ2NhbWVyYVNlcnZpY2UnLCdhcmVhU2VydmljZScsJ2xheWVyJywnY2FzQ2FkZVNlcnZpY2UnLCdpMThuRmFjdG9yeSddO1xyXG5cclxuICAgIGZpbmRMaXN0UGFyYW1zOlJtcEdhdGVMaXN0UGFyYW1zO1xyXG4gICAgcGFnZVBhcmFtczpQYWdlUGFyYW1zO1xyXG4gICAgXHJcbiAgICAvLy0tLXRhYmxlXHJcbiAgICAvLyB0YWJsZSDliJfooajmlbDmja5cclxuICAgIHRIZWFkTGlzdFJtcEdhdGU6QXJyYXk8SVRhYmxlSGVhZGVyPjtcclxuICAgIHRCb2R5TGlzdDphbnk7XHJcbiAgICB0YWJsZU5vRGF0YTpib29sZWFuO1xyXG4gICAgU2VhcmNoUGFyYW1zOiBhbnkgO1xyXG4gICAgLy9hcmVhIHRyZWVcclxuICAgIGFyZWFUcmVlRGF0YXMgOlRyZWVEYXRhUGFyYW1zPEFyZWE+O1xyXG4gICAgLy9zZWFyY2hcclxuICAgIGFyZWFUcmVlU2VhcmNoSW5wdXRTdHI6c3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAvL+WkmumAieebuOWFs1xyXG4gICAgc2VsZWN0ZWRMaXN0OkFycmF5PGJvb2xlYW4+O1xyXG4gICAgaXNTZWxlY3RBbGw6Ym9vbGVhbjtcclxuXHJcbiAgICBjdXJyZW50TGF5ZXJJbmRleDogbnVtYmVyO1xyXG5cclxuICAgIGNhbWVyYVR5cGVMaXN0OiB7dmFsdWU6c3RyaW5nLCB0ZXh0OnN0cmluZ31bXTtcclxuXHJcbiAgICBpc1NlbGVjdEl0ZW1zOiBib29sZWFuO1xyXG5cclxuICAgIHNlbGVjdGVkQ2FtZXJhVHlwZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOmFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6YW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBybXBnYXRlU2VydmljZTpJUm1wR2F0ZVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGFyZWFTZXJ2aWNlOklBcmVhU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbGF5ZXI6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgY2FzQ2FkZVNlcnZpY2U6IElDYXNDYWRlU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgaTE4bkZhY3Rvcnk6YW55KSB7XHJcbiAgICAgICAgdGhpcy5pbml0UGFyYW1zKCk7XHJcbiAgICAgICAgLy8g5qCR5YiX6KGo5pWw5o2uXHJcbiAgICAgICAgLy/liJ3lp4vljJYgYXJlYSDmoJHmlbDmja5cclxuICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMgPSBuZXcgVHJlZURhdGFQYXJhbXM8QXJlYUV4PigpO1xyXG4gICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy50cmVlSWQgPSAnYXJlYVRyZWVJdnMnO1xyXG4gICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy5pc0RlZmF1bHRTZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzLm9uQ2xpY2sgPSB0cmVlU2VsZWN0Tm9kZTtcclxuICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMudHJlZUluaXRDb21wbGV0ZSA9IHRyZWVJbml0Q29tcGxldGU7XHJcbiAgICAgICAgbGV0IHNlbGZfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgLy8g6IqC54K56YCJ5oupXHJcbiAgICAgICAgZnVuY3Rpb24gdHJlZVNlbGVjdE5vZGUoZXZlbnQ6IE1vdXNlRXZlbnQsIHRyZWVJZDpzdHJpbmcsIHRyZWVOb2RlOkFyZWFFeCl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZih0cmVlTm9kZS5JRCA9PSBzZWxmX3RoaXMuZmluZExpc3RQYXJhbXMuYXJlYUlkKXtcclxuICAgICAgICAgICAgICAgIGlmKHNlbGZfdGhpcy50Qm9keUxpc3Qpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2luaXQgcmVxX3BhcmFtc1xyXG4gICAgICAgICAgICBzZWxmX3RoaXMuZmluZExpc3RQYXJhbXMuYXJlYUlkID0gdHJlZU5vZGUuSUQ7XHJcbiAgICAgICAgICAgIHNlbGZfdGhpcy5maW5kTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgIHNlbGZfdGhpcy5nZXRMaXN0QnlQYXJhbXMoc2VsZl90aGlzLmZpbmRMaXN0UGFyYW1zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRyZWVJbml0Q29tcGxldGUoKXtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZXRBcmVhVHJlZUxpc3QoKTtcclxuXHJcbiAgICAgICAgLy8g5by55Ye65qGG55u45YWzXHJcbiAgICAgICAgJHNjb3BlLiRvbihcImRldmljZS5jbG9zZVBvcHVwXCIsIChldmVudDogYW55LCBpc1JlZnJlc2g/OiBib29sZWFuKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlQ2FtZXJhQ2hhbmdlUG9wdXAoaXNSZWZyZXNoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0UGFyYW1zKCl7XHJcbiAgICAgICAgdGhpcy50YWJsZU5vRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGFnZVBhcmFtcyA9IG5ldyBQYWdlUGFyYW1zKCk7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcyA9IG5ldyBSbXBHYXRlTGlzdFBhcmFtcygpO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMucGFnZVNpemUgPSB0aGlzLnBhZ2VQYXJhbXMucGFnZVNpemU7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5hcmVhSWQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuc29ydE5hbWUgPSBcIkNvZGVcIjtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLmlzQXNjID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLlNlYXJjaFBhcmFtcyA9IHtcclxuICAgICAgICAgICAgTmFtZTonJ1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRCb2R5TGlzdCA9IFtdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2V0VGFibGVIZWFkKCkgXHJcbiAgICAgICAgdGhpcy5jYW1lcmFUeXBlTGlzdCA9IENhbWVyYVR5cGVFbnVtO1xyXG4gICAgICAgIHRoaXMuaXNTZWxlY3RJdGVtcyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRhYmxlSGVhZCA9ICAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy50SGVhZExpc3RSbXBHYXRlID0gW1xyXG4gICAgICAgICAgICB7ZmllbGQgOiAnTmFtZScsdGl0bGU6J0RQX0NPTkZJR19DT01NT05fMDMnfSxcclxuICAgICAgICAgICAge2ZpZWxkIDogJ0NvZGUnLHRpdGxlOidEUF9DT05GSUdfQ09NTU9OXzA0J30sXHJcbiAgICAgICAgICAgIHtmaWVsZDogJ0pzb25Vc2VyRGF0YS5BcmVhLk5hbWUnLHRpdGxlOidEUF9DT05GSUdfQ09NTU9OXzA5J30sXHJcbiAgICAgICAgICAgIHtmaWVsZCA6ICdMb24nLCB0aXRsZTonRFBfQ09ORklHX0NPTU1PTl8xMyd9LFxyXG4gICAgICAgICAgICB7ZmllbGQ6ICdMYXQnLCB0aXRsZTonRFBfQ09ORklHX0NPTU1PTl8xNCd9LFxyXG4gICAgICAgICAgICB7ZmllbGQgOiAnJyx0aXRsZTonRFBfQ09ORklHX0NPTU1PTl8xNSd9LFxyXG4gICAgICAgIF07XHJcblxyXG4gICAgfVxyXG4gICAgX2dldENhc0NhZGVTZWFyY2hQYXJhbXModGFibGVQYXJhbXM6IFJtcEdhdGVMaXN0UGFyYW1zKXtcclxuICAgICAgICBpZighdGFibGVQYXJhbXMpIHJldHVybiB7fSBhcyBDYXNDYWRlU2VhcmNoUGFyYW1zO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgQ2FzQ2FkZVNlYXJjaFBhcmFtcygpO1xyXG4gICAgICAgIHJlc3VsdC5wYWdlSW5kZXggPSB0YWJsZVBhcmFtcy5jdXJyZW50UGFnZTtcclxuICAgICAgICByZXN1bHQub3JkZXJGaWVsZCA9IHRhYmxlUGFyYW1zLnNvcnROYW1lO1xyXG4gICAgICAgIHJlc3VsdC5wYWdlU2l6ZSA9IHRhYmxlUGFyYW1zLnBhZ2VTaXplO1xyXG4gICAgICAgIHJlc3VsdC5hcmVhSWQgPSB0YWJsZVBhcmFtcy5hcmVhSWQ7XHJcbiAgICAgICAgcmVzdWx0LmlzQXNjID0gdGFibGVQYXJhbXMuaXNBc2M7XHJcbiAgICAgICAgaWYodGFibGVQYXJhbXMuTmFtZSl7XHJcbiAgICAgICAgICAgIHJlc3VsdC5uYW1lID0gdGFibGVQYXJhbXMuTmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIGdldExpc3RCeVBhcmFtcyhwYXJhbXM6Um1wR2F0ZUxpc3RQYXJhbXMpe1xyXG4gICAgICAgIHRoaXMuY2FzQ2FkZVNlcnZpY2UuZmluZFJtcEdhdGVMaXN0KHRoaXMuX2dldENhc0NhZGVTZWFyY2hQYXJhbXMocGFyYW1zKSkudGhlbigocmVzOlJlc3BvbnNlUmVzdWx0PEFycmF5PFJtcEdhdGVFeD4+KT0+e1xyXG4gICAgICAgICAgICBpZihyZXMgJiYgcmVzLmRhdGEgJiYgcmVzLmNvZGUgPT09IDIwMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRhYmxlQm9keShyZXMuZGF0YSwgcmVzLmNvdW50KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRhYmxlQm9keShbXSwwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zID0gcGFyYW1zO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRhYmxlQm9keShkYXRhTGlzdDphbnksdG90YWw6bnVtYmVyKXtcclxuICAgICAgICBpZihkYXRhTGlzdCAmJiBkYXRhTGlzdC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIHRoaXMudEJvZHlMaXN0ID0gZGF0YUxpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMudGFibGVOb0RhdGEgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IF9wYWdlUGFyYW1zID0gbmV3IFBhZ2VQYXJhbXMoKTtcclxuICAgICAgICAgICAgX3BhZ2VQYXJhbXMuY3VycmVudFBhZ2UgPSB0aGlzLmZpbmRMaXN0UGFyYW1zLmN1cnJlbnRQYWdlO1xyXG4gICAgICAgICAgICBfcGFnZVBhcmFtcy5wYWdlU2l6ZSA9IHRoaXMuZmluZExpc3RQYXJhbXMucGFnZVNpemU7XHJcbiAgICAgICAgICAgIF9wYWdlUGFyYW1zLnNldFRvdGFsQ291bnQodG90YWwpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wYWdlUGFyYW1zID0gX3BhZ2VQYXJhbXM7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMudEJvZHlMaXN0ID0gW107XHJcbiAgICAgICAgICAgIHRoaXMudGFibGVOb0RhdGEgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDmlbDmja7ojrflj5ZcclxuICAgIGdldEFyZWFUcmVlTGlzdChrZXl3b3JkPzpzdHJpbmcpe1xyXG4gICAgICAgIGxldCBwYXJhbXM6VHJlZVBhcmFtcyA9IHRoaXMuYXJlYVRyZWVEYXRhcy5yZXFQYXJhbXM7XHJcbiAgICAgICAgcGFyYW1zLmtleXdvcmQgPSBrZXl3b3JkO1xyXG4gICAgICAgIHRoaXMuYXJlYVNlcnZpY2UuZmluZExpc3RUcmVlKHBhcmFtcykudGhlbigocmVzcDpBcnJheTxBcmVhRXg+KT0+e1xyXG4gICAgICAgICAgICBpZihyZXNwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy5maW5pc2hlZE5vRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy5maW5pc2hlZE5vRGF0YSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBcmVhVHJlZURhdGFzKHJlc3ApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfTtcclxuICAgIC8vIOagkeaQnOe0olxyXG4gICAgYXJlYVRyZWVTZWFyY2hJbnB1dEtleVVwKGU6YW55KXtcclxuICAgICAgICBpZihlLmtleUNvZGUgPT09IDEzKXtcclxuICAgICAgICAgICAgdGhpcy5nZXRBcmVhVHJlZUxpc3QodGhpcy5hcmVhVHJlZVNlYXJjaElucHV0U3RyKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy8g5qCR5pCc57SiXHJcbiAgICBhcmVhVHJlZVNlYXJjaElucHV0KCl7XHJcbiAgICAgICAgdGhpcy5nZXRBcmVhVHJlZUxpc3QodGhpcy5hcmVhVHJlZVNlYXJjaElucHV0U3RyKTtcclxuICAgIH07XHJcbiAgICAvLyDmoJHotYvlgLxcclxuICAgIHNldEFyZWFUcmVlRGF0YXModHJlZURhdGFzOiBBcnJheTxBcmVhRXg+KXtcclxuICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMudHJlZURhdGFzID0gdHJlZURhdGFzO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyDljZXmoI/pgInmi6nmjpLluo9cclxuICAgIHNvcnRCeUZpZWxkKF9pbmRleDpudW1iZXIsZmllbGQ6c3RyaW5nLHNvcnRTdGF0dXM6Ym9vbGVhbil7XHJcblxyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuaXNBc2MgPSBzb3J0U3RhdHVzO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuc29ydE5hbWUgPSBmaWVsZDtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdFBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgInmi6nmn5DkuIDmnaHmlbDmja5cclxuICAgICAqIEB0aW1lOiAyMDE3LTA0LTIxIDE5OjQzOjA3XHJcbiAgICAgKiBAcGFyYW1zOlxyXG4gICAgICogQHJldHVybjpcclxuICAgICAqL1xyXG4gICAgYWZ0ZXJDaGFuZ2VDaGVjayhyZXN1bHRMaXN0OkFycmF5PGJvb2xlYW4+LGlzQ2hlY2tBbGw6Ym9vbGVhbik6dm9pZHtcclxuICAgICAgICB0aGlzLnNldElzU2VsZWN0SXRlbXMocmVzdWx0TGlzdCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZExpc3QgPSByZXN1bHRMaXN0O1xyXG4gICAgICAgIHRoaXMuaXNTZWxlY3RBbGwgPSBpc0NoZWNrQWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL+iOt+WPluW9k+WJjeW3suiiq+mAieS4reWIl+ihqFxyXG4gICAgZ2V0U2VsZWN0ZWRMaXN0KCk6QXJyYXk8Um1wR2F0ZUV4PntcclxuICAgICAgICBsZXQgc2VsZWN0ZWREYXRhTGlzdDpBcnJheTxSbXBHYXRlRXg+ID0gW107XHJcbiAgICAgICAgaWYodGhpcy5zZWxlY3RlZExpc3Qpe1xyXG4gICAgICAgICAgICB0aGlzLnRCb2R5TGlzdC5mb3JFYWNoKChpdnNTZXJ2ZXI6Um1wR2F0ZUV4LGluZGV4Om51bWJlcik9PntcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2VsZWN0ZWRMaXN0W2luZGV4XSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWREYXRhTGlzdC5wdXNoKGl2c1NlcnZlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VsZWN0ZWREYXRhTGlzdDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gY29uZmlnRGV2aWNlc1xyXG4gICAgY29uZmlnRGV2aWNlcyh0eXBlOnN0cmluZyl7XHJcbiAgICAgICAgICAgIGxldCBzY29wZTp7Um1wZ2F0ZURhdGFzOkFycmF5PFJtcEdhdGU+LHR5cGU6IHN0cmluZywkZGVzdHJveTogRnVuY3Rpb259PSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgICAgIHNjb3BlLnR5cGUgPSB0eXBlXHJcbiAgICAgICAgICAgIHNjb3BlLlJtcGdhdGVEYXRhcyA9IHRoaXMudEJvZHlMaXN0XHJcbiAgICAgICAgICAgIGlmKHR5cGUgPT09ICdhcmVhJyl7XHJcbiAgICAgICAgICAgIC8vIOi/memHjOWvuXNjb3Bl6L+b6KGM5LiA5qyh5paw5bu6XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudExheWVySW5kZXggPSB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHBvcHVwUm1wR2F0ZUh0bWwsXHJcbiAgICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5pMThuRmFjdG9yeShcIkRQX0NPTkZJR19DT01NT05fMDhcIiksXHJcbiAgICAgICAgICAgICAgICBhcmVhOltcIjU3MHB4XCIsIFwiNTEwcHhcIl0sXHJcbiAgICAgICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy8g6L+Z6YeM5a+5c2NvcGXov5vooYzkuIDmrKHmlrDlu7pcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50TGF5ZXJJbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogcG9wdXBSbXBHYXRlSHRtbCxcclxuICAgICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLmkxOG5GYWN0b3J5KFwiRFBfQ09ORklHX0NPTU1PTl8wN1wiKSxcclxuICAgICAgICAgICAgICAgIGFyZWE6W1wiNTcwcHhcIiwgXCI1MTBweFwiXSxcclxuICAgICAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vYWJvdXQgcGFnZSBjbGlja1xyXG4gICAgY2hhbmdlUGFnZShudW06bnVtYmVyKXtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLmN1cnJlbnRQYWdlID0gbnVtO1xyXG4gICAgICAgIHRoaXMuZ2V0TGlzdEJ5UGFyYW1zKHRoaXMuZmluZExpc3RQYXJhbXMpO1xyXG4gICAgfVxyXG4gICAgY2hhbmdlUGFnZVNpemUobnVtOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5wYWdlU2l6ZSA9IG51bTtcclxuICAgICAgICB0aGlzLmdldExpc3RCeVBhcmFtcyh0aGlzLmZpbmRMaXN0UGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZUNhbWVyYUNoYW5nZVBvcHVwKGZsYWc/OiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLmxheWVyLmNsb3NlKHRoaXMuY3VycmVudExheWVySW5kZXgpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudExheWVySW5kZXggPSAtMTtcclxuICAgICAgICBpZihmbGFnKXtcclxuICAgICAgICAgICAgLy8g5Yi35paw55WM6Z2iXHJcbiAgICAgICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldExpc3RCeVBhcmFtcyh0aGlzLmZpbmRMaXN0UGFyYW1zKTtcclxuICAgICAgICAgICAgfSwyMDAwKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdG9yIHd5cjog5Yik5pat5ZKM6K6+572u5b2T5YmN5YiX6KGo5piv5ZCm5pyJ6YCJ5Lit55qE5YWD57SgXHJcbiAgICAgKiBAcGFyYW0gaXRlbXNcclxuICAgICAqL1xyXG4gICAgc2V0SXNTZWxlY3RJdGVtcyhpdGVtczogQXJyYXk8Ym9vbGVhbj4pe1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICBpZihpdGVtcyAmJiBpdGVtcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgbGV0IGksbGVuO1xyXG4gICAgICAgICAgICBmb3IoaT0wLGxlbj1pdGVtcy5sZW5ndGg7aTxsZW47aSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKGl0ZW1zW2ldKXtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuaXNTZWxlY3RJdGVtcyAhPT0gcmVzdWx0KXtcclxuICAgICAgICAgICAgdGhpcy5pc1NlbGVjdEl0ZW1zID0gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRMYW1wKGRhdGE6Um1wR2F0ZSkge1xyXG4gICAgICAgIGxldCBzY29wZTp7ZGV2aWNlRGF0YTphbnksJGRlc3Ryb3k6IEZ1bmN0aW9ufT0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLmRldmljZURhdGEgPSBkYXRhO1xyXG4gICAgICAgIC8vIOi/memHjOWvuXNjb3Bl6L+b6KGM5LiA5qyh5paw5bu6XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGF5ZXJJbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IHBvcHVwTGFtcEh0bWwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgdGl0bGU6IHRoaXMuaTE4bkZhY3RvcnkoXCJEUF9DT05GSUdfQ09NTU9OXzE3XCIpLFxyXG4gICAgICAgICAgICBhcmVhOltcIjMwMHB4XCIsIFwiNDgwcHhcIl0sXHJcbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc2VhcmNoKCkge1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuTmFtZSA9IHRoaXMuU2VhcmNoUGFyYW1zLk5hbWU7XHJcbiAgICAgICAgdGhpcy5nZXRMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdFBhcmFtcyk7XHJcbiAgICB9XHJcbiAgICBjcmVhdGUgKCkge1xyXG4gICAgICAgIGxldCBzY29wZTp7dHlwZTpzdHJpbmcsJGRlc3Ryb3k6IEZ1bmN0aW9ufT0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLnR5cGUgPSAnYWRkJ1xyXG4gICAgICAgIC8vIOi/memHjOWvuXNjb3Bl6L+b6KGM5LiA5qyh5paw5bu6XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGF5ZXJJbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGNyZWF0ZUh0bWwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgdGl0bGU6IFwi5paw5aKeXCIsXHJcbiAgICAgICAgICAgIGFyZWE6W1wiNDAwcHhcIiwgXCI1MDBweFwiXSxcclxuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBkZWxldGVDYW1lcmEoZGF0YTpSbXBHYXRlKXtcclxuICAgIH1cclxuICAgIHB1YmxpYyBlZGl0Q2FtZXJhIChkYXRhOlJtcEdhdGUpIHtcclxuICAgICAgICBsZXQgc2NvcGU6e2lkOnN0cmluZyxSbXBHYXRlOlJtcEdhdGUsdHlwZTpzdHJpbmcsJGRlc3Ryb3k6IEZ1bmN0aW9ufT0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLmlkID0gdGhpcy5maW5kTGlzdFBhcmFtcy5hcmVhSWQ7XHJcbiAgICAgICAgc2NvcGUuUm1wR2F0ZSA9IGRhdGEgYXMgUm1wR2F0ZTtcclxuICAgICAgICAvLyDov5nph4zlr7lzY29wZei/m+ihjOS4gOasoeaWsOW7ulxyXG4gICAgICAgIHRoaXMuY3VycmVudExheWVySW5kZXggPSB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBjb250ZW50OiBjcmVhdGVIdG1sLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIHRpdGxlOnRoaXMuaTE4bkZhY3RvcnkoJ0RQX0NPTkZJR19STVBHQVRFXzAyJyksXHJcbiAgICAgICAgICAgIGFyZWE6W1wiMzUwcHhcIiwgXCJhdXRvXCJdLFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuYXBwXHJcbiAgICAuY29udHJvbGxlcignYmFzZUNvbmZpZ1JtcEdhdGVDb250cm9sbGVyJywgYmFzZUNvbmZpZ1JtcEdhdGVDb250cm9sbGVyKTsiXX0=
