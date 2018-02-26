define(["require", "exports", "text!./ele.popupElectronic.html", "text!./ele.popupLamp.html", "text!./ele.eleCreate.html", "../../common/app/main.app", "../../common/directive/tree/tree-params", "../../common/directive/page/page-params", "../../common/services/casecade.service", "../../../core/server/enum/ElectronicTypeEnum", "../../../core/params/ElectronicFenceParams", "css!../css/baseconfig-device.css", "css!../css/baseconfig-electronic.css", "./ele.popupElectronic.controller", "./ele.popupLamp.controller", "./ele.eleCreate.controller", "../../common/services/area.service", "../../common/services/electronicfence.service"], function (require, exports, popupElectronicHtml, popupLampHtml, createHtml, main_app_1, tree_params_1, page_params_1, casecade_service_1, ElectronicTypeEnum_1, ElectronicFenceParams_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var baseConfigElectronicFenceController = (function () {
        function baseConfigElectronicFenceController($scope, $timeout, electronicfenceService, areaService, layer, casCadeService, i18nFactory) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.electronicfenceService = electronicfenceService;
            this.areaService = areaService;
            this.layer = layer;
            this.casCadeService = casCadeService;
            this.i18nFactory = i18nFactory;
            this.areaTreeSearchInputStr = "";
            this.setTableHead = function () {
                _this.tHeadList = [
                    { field: 'Name', title: 'DP_CONFIG_COMMON_03' },
                    { field: 'Code', title: 'DP_CONFIG_COMMON_04' },
                    { field: 'Area', title: 'DP_CONFIG_COMMON_09' },
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
                _this.getListByParams(_this.findListParams);
            };
            this.getAreaTreeList();
            $scope.$on("device.closePopup", function (event, isRefresh) {
                _this.closeElectronicChangePopup(isRefresh);
            });
        }
        baseConfigElectronicFenceController.prototype.initParams = function () {
            this.tableNoData = false;
            this.pageParams = new page_params_1.default();
            this.Type = 'ElectronicFence';
            this.findListParams = new ElectronicFenceParams_1.ElectronicFenceListParams();
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
            this.ElectronicFenceTypeList = ElectronicTypeEnum_1.ElectronicTypeEnum;
            this.isSelectItems = false;
        };
        baseConfigElectronicFenceController.prototype._getCasCadeSearchParams = function (tableParams) {
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
        baseConfigElectronicFenceController.prototype._getSearchType = function () {
            return this.Type;
        };
        baseConfigElectronicFenceController.prototype.getListByParams = function (params) {
            var _this = this;
            this.casCadeService.findElectronicFenceList(this._getCasCadeSearchParams(params)).then(function (res) {
                if (res && res.data && res.code === 200) {
                    _this.setTableBody(res.data, res.count);
                }
                else {
                    _this.setTableBody([], 0);
                }
                _this.findListParams = params;
            });
        };
        baseConfigElectronicFenceController.prototype.setTableBody = function (dataList, total) {
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
        baseConfigElectronicFenceController.prototype.getAreaTreeList = function (keyword) {
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
        baseConfigElectronicFenceController.prototype.areaTreeSearchInputKeyUp = function (e) {
            if (e.keyCode === 13) {
                this.getAreaTreeList(this.areaTreeSearchInputStr);
            }
        };
        ;
        baseConfigElectronicFenceController.prototype.areaTreeSearchInput = function () {
            this.getAreaTreeList(this.areaTreeSearchInputStr);
        };
        ;
        baseConfigElectronicFenceController.prototype.setAreaTreeDatas = function (treeDatas) {
            this.areaTreeDatas.treeDatas = treeDatas;
        };
        ;
        baseConfigElectronicFenceController.prototype.sortByField = function (_index, field, sortStatus) {
            this.findListParams.isAsc = sortStatus;
            this.findListParams.sortName = field;
            this.getListByParams(this.findListParams);
        };
        baseConfigElectronicFenceController.prototype.afterChangeCheck = function (resultList, isCheckAll) {
            this.setIsSelectItems(resultList);
            this.selectedList = resultList;
            this.isSelectAll = isCheckAll;
        };
        ;
        baseConfigElectronicFenceController.prototype.getSelectedList = function () {
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
        baseConfigElectronicFenceController.prototype.create = function () {
            var scope = this.$scope.$new();
            this.currentLayerIndex = this.layer.open({
                type: 1,
                content: popupElectronicHtml,
                scope: scope,
                title: this.i18nFactory('DP_CONFIG_COMMON_07'),
                area: ["570px", "510px"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        baseConfigElectronicFenceController.prototype.configDevices = function (type) {
            var scope = this.$scope.$new();
            scope.type = type;
            if (type === 'area') {
                this.currentLayerIndex = this.layer.open({
                    type: 1,
                    content: popupElectronicHtml,
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
                    content: popupElectronicHtml,
                    scope: scope,
                    title: this.i18nFactory("DP_CONFIG_COMMON_07"),
                    area: ["570px", "auto"],
                    end: function () {
                        scope.$destroy();
                    }
                });
            }
        };
        baseConfigElectronicFenceController.prototype.changePage = function (num) {
            this.findListParams.currentPage = num;
            this.getListByParams(this.findListParams);
        };
        baseConfigElectronicFenceController.prototype.changePageSize = function (num) {
            this.findListParams.currentPage = 1;
            this.findListParams.pageSize = num;
            this.getListByParams(this.findListParams);
        };
        baseConfigElectronicFenceController.prototype.closeElectronicChangePopup = function (flag) {
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
        baseConfigElectronicFenceController.prototype.setIsSelectItems = function (items) {
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
        baseConfigElectronicFenceController.prototype.setLamp = function (data) {
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
        baseConfigElectronicFenceController.prototype.search = function () {
            this.findListParams.Name = this.SearchParams.Name;
            this.getListByParams(this.findListParams);
        };
        baseConfigElectronicFenceController.prototype.editAreaTd = function (data) {
            var scope = this.$scope.$new();
            scope.id = this.findListParams.areaId;
            scope.ElectronicFenceData = data;
            scope.areaDatas = this.areaTreeDatas.treeDatas;
            this.currentLayerIndex = this.layer.open({
                type: 1,
                content: createHtml,
                scope: scope,
                title: this.i18nFactory('DP_CONFIG_ELECTRONICFENCE_02'),
                area: ["350px", "auto"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        baseConfigElectronicFenceController.$inject = ['$scope', '$timeout', 'electronicfenceService', 'areaService', 'layer', 'casCadeService', 'i18nFactory'];
        return baseConfigElectronicFenceController;
    }());
    main_app_1.app
        .controller('baseConfigElectronicFenceController', baseConfigElectronicFenceController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9lbGVjdHJvbmljZmVuY2UvZWxlLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBNENBO1FBa0NJLDZDQUFvQixNQUFXLEVBQ1gsUUFBYSxFQUNiLHNCQUErQyxFQUMvQyxXQUF5QixFQUN6QixLQUFVLEVBQ1YsY0FBK0IsRUFDL0IsV0FBZ0I7WUFOcEMsaUJBK0JDO1lBL0JtQixXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQ1gsYUFBUSxHQUFSLFFBQVEsQ0FBSztZQUNiLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBeUI7WUFDL0MsZ0JBQVcsR0FBWCxXQUFXLENBQWM7WUFDekIsVUFBSyxHQUFMLEtBQUssQ0FBSztZQUNWLG1CQUFjLEdBQWQsY0FBYyxDQUFpQjtZQUMvQixnQkFBVyxHQUFYLFdBQVcsQ0FBSztZQXBCcEMsMkJBQXNCLEdBQVcsRUFBRSxDQUFDO1lBd0VwQyxpQkFBWSxHQUFHO2dCQUNYLEtBQUksQ0FBQyxTQUFTLEdBQUc7b0JBQ2IsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxxQkFBcUIsRUFBQztvQkFDN0MsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxxQkFBcUIsRUFBQztvQkFDN0MsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxxQkFBcUIsRUFBQztvQkFFN0MsRUFBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxxQkFBcUIsRUFBQztvQkFDbEQsRUFBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxxQkFBcUIsRUFBQztvQkFDakQsRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxxQkFBcUIsRUFBQztpQkFDbkQsQ0FBQztZQUNOLENBQUMsQ0FBQTtZQUVELHVCQUFrQixHQUFHLFVBQUMsWUFBb0I7Z0JBQ3RDLEVBQUUsQ0FBQyxDQUFDLFlBQVksS0FBSyxLQUFJLENBQUMsSUFB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LFdBQVcsQ0FBQyw4QkFBOEIsQ0FBQztnQkFDdkQsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztnQkFDdkIsR0FBRyxFQUFFO29CQUNELEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDckIsQ0FBQzthQUNKLENBQUMsQ0FBQztRQUVQLENBQUM7UUFyV00sMkNBQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsd0JBQXdCLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLENBQUMsQ0FBQztRQXNXL0gsMENBQUM7S0F4V0QsQUF3V0MsSUFBQTtJQUVELGNBQUc7U0FDRSxVQUFVLENBQUMscUNBQXFDLEVBQUUsbUNBQW1DLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvYmFzZWNvbmZpZy9lbGVjdHJvbmljZmVuY2UvZWxlLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBkZWxsIG9uIDIwMTcvMy8yMy5cclxuICovXHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi9lbGUucG9wdXBFbGVjdHJvbmljLmh0bWxcIiBuYW1lPVwicG9wdXBFbGVjdHJvbmljSHRtbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi9lbGUucG9wdXBMYW1wLmh0bWxcIiBuYW1lPVwicG9wdXBMYW1wSHRtbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi9lbGUuZWxlQ3JlYXRlLmh0bWxcIiBuYW1lPVwiY3JlYXRlSHRtbFwiIC8+XHJcbmltcG9ydCBcImNzcyEuLi9jc3MvYmFzZWNvbmZpZy1kZXZpY2UuY3NzXCI7XHJcbmltcG9ydCBcImNzcyEuLi9jc3MvYmFzZWNvbmZpZy1lbGVjdHJvbmljLmNzc1wiO1xyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuXHJcbmltcG9ydCBcIi4vZWxlLnBvcHVwRWxlY3Ryb25pYy5jb250cm9sbGVyXCI7XHJcbmltcG9ydCBcIi4vZWxlLnBvcHVwTGFtcC5jb250cm9sbGVyXCI7XHJcbmltcG9ydCBcIi4vZWxlLmVsZUNyZWF0ZS5jb250cm9sbGVyXCI7XHJcblxyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vc2VydmljZXMvYXJlYS5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9lbGVjdHJvbmljZmVuY2Uuc2VydmljZVwiO1xyXG5pbXBvcnQge0lUYWJsZUhlYWRlcn0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdW5pdC10YWJsZS90YWJsZS1wYXJhbXNcIjtcclxuaW1wb3J0IHtUcmVlRGF0YVBhcmFtc30gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLXBhcmFtc1wiO1xyXG5pbXBvcnQge0lBcmVhU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hcmVhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtJRWxlY3Ryb25pY0ZlbmNlU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9lbGVjdHJvbmljZmVuY2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgUGFnZVBhcmFtcyBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS9wYWdlL3BhZ2UtcGFyYW1zXCI7XHJcbmltcG9ydCB7SUNhc0NhZGVTZXJ2aWNlLCBDYXNDYWRlU2VhcmNoUGFyYW1zfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2Nhc2VjYWRlLnNlcnZpY2VcIjtcclxuLy9pbXBvcnQge0VsZWN0cm9uaWNGZW5jZVRhYmxlUGFyYW1zfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvRWxlY3Ryb25pY0ZlbmNlUGFyYW1zXCI7XHJcblxyXG5pbXBvcnQge0FyZWFFeH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0FyZWFFeFwiO1xyXG5pbXBvcnQge1RyZWVQYXJhbXN9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy90cmVlL1RyZWVQYXJhbXNcIjtcclxuaW1wb3J0IHtBcmVhfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvQXJlYVwiO1xyXG5pbXBvcnQge0VudW19IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudW0vRW51bVwiO1xyXG5pbXBvcnQge0VsZWN0cm9uaWNUeXBlRW51bX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vRWxlY3Ryb25pY1R5cGVFbnVtXCI7XHJcbmltcG9ydCB7RWxlY3Ryb25pY0ZlbmNlRXh9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0VsZWN0cm9uaWNGZW5jZUV4JztcclxuaW1wb3J0IHtFbGVjdHJvbmljRmVuY2V9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L0VsZWN0cm9uaWNGZW5jZSc7XHJcbmltcG9ydCB7XHJcbiAgICBFbGVjdHJvbmljRmVuY2VMaXN0UGFyYW1zLFxyXG4gICAgRWxlY3Ryb25pY0ZlbmNlQ2hhbmdlRWxlY3Ryb25pY0ZlbmNlVHlwZVxyXG59IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9FbGVjdHJvbmljRmVuY2VQYXJhbXNcIjtcclxuaW1wb3J0IHtSbXBHYXRlRXh9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L1JtcEdhdGVFeCc7XHJcbi8vIOe8lui+keOAgeWIoOmZpOaVsOaNruexu+Wei1xyXG4vL2ltcG9ydCB7IEVsZWN0cm9uaWNGZW5jZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L0VsZWN0cm9uaWNGZW5jZSc7XHJcbmltcG9ydCB7UmVzcG9uc2VSZXN1bHQsIFBhZ2VSZXN1bHR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuXHJcbmRlY2xhcmUgdmFyIHBvcHVwRWxlY3Ryb25pY0h0bWw6IGFueTtcclxuZGVjbGFyZSB2YXIgY3JlYXRlSHRtbDogYW55O1xyXG5kZWNsYXJlIHZhciBwb3B1cExhbXBIdG1sOiBhbnk7XHJcblxyXG5jbGFzcyBiYXNlQ29uZmlnRWxlY3Ryb25pY0ZlbmNlQ29udHJvbGxlciB7XHJcbiAgICAvL+azqOWFpWVsZWN0cm9uaWMuc2VydmljZS50c+mHjOmdoueahGVsZWN0cm9uaWNTZXJ2aWNlXHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHNjb3BlJywgJyR0aW1lb3V0JywgJ2VsZWN0cm9uaWNmZW5jZVNlcnZpY2UnLCAnYXJlYVNlcnZpY2UnLCAnbGF5ZXInLCAnY2FzQ2FkZVNlcnZpY2UnLCAnaTE4bkZhY3RvcnknXTtcclxuXHJcbiAgICBmaW5kTGlzdFBhcmFtczogRWxlY3Ryb25pY0ZlbmNlTGlzdFBhcmFtcztcclxuICAgIHBhZ2VQYXJhbXM6IFBhZ2VQYXJhbXM7XHJcblxyXG4gICAgLy8tLS10YWJsZVxyXG4gICAgLy8gdGFibGUg5YiX6KGo5pWw5o2uXHJcbiAgICB0SGVhZExpc3Q6IEFycmF5PElUYWJsZUhlYWRlcj47XHJcbiAgICB0Qm9keUxpc3Q6IGFueTtcclxuICAgIFR5cGU6IHN0cmluZztcclxuICAgIHRhYmxlTm9EYXRhOiBib29sZWFuO1xyXG4gICAgU2VhcmNoUGFyYW1zOiBhbnk7XHJcbiAgICAvLyB0YWJsZUxpc3RQYXJhbXM6IFRhYmxlTGlzdFBhcmFtcyA9IG5ldyBUYWJsZUxpc3RQYXJhbXMoKTtcclxuXHJcblxyXG4gICAgLy9hcmVhIHRyZWVcclxuICAgIGFyZWFUcmVlRGF0YXM6IFRyZWVEYXRhUGFyYW1zPEFyZWE+O1xyXG4gICAgLy9zZWFyY2hcclxuICAgIGFyZWFUcmVlU2VhcmNoSW5wdXRTdHI6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgLy/lpJrpgInnm7jlhbNcclxuICAgIHNlbGVjdGVkTGlzdDogQXJyYXk8Ym9vbGVhbj47XHJcbiAgICBpc1NlbGVjdEFsbDogYm9vbGVhbjtcclxuXHJcbiAgICBjdXJyZW50TGF5ZXJJbmRleDogbnVtYmVyO1xyXG5cclxuICAgIEVsZWN0cm9uaWNGZW5jZVR5cGVMaXN0OiB7IHZhbHVlOiBzdHJpbmcsIHRleHQ6IHN0cmluZyB9W107XHJcblxyXG4gICAgaXNTZWxlY3RJdGVtczogYm9vbGVhbjtcclxuXHJcbiAgICBzZWxlY3RlZEVsZWN0cm9uaWNGZW5jZVR5cGU6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBlbGVjdHJvbmljZmVuY2VTZXJ2aWNlOiBJRWxlY3Ryb25pY0ZlbmNlU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgYXJlYVNlcnZpY2U6IElBcmVhU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbGF5ZXI6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgY2FzQ2FkZVNlcnZpY2U6IElDYXNDYWRlU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgaTE4bkZhY3Rvcnk6IGFueSkge1xyXG4gICAgICAgIHRoaXMuaW5pdFBhcmFtcygpO1xyXG4gICAgICAgIC8vIOagkeWIl+ihqOaVsOaNrlxyXG4gICAgICAgIC8v5Yid5aeL5YyWIGFyZWEg5qCR5pWw5o2uXHJcbiAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzID0gbmV3IFRyZWVEYXRhUGFyYW1zPEFyZWFFeD4oKTtcclxuICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMudHJlZUlkID0gJ2FyZWFUcmVlSXZzJztcclxuICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMuaXNEZWZhdWx0U2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy5vbkNsaWNrID0gKGV2ZW50OiBNb3VzZUV2ZW50LCB0cmVlSWQ6IHN0cmluZywgdHJlZU5vZGU6IEFyZWFFeCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKHRyZWVOb2RlLklEID09IHRoaXMuZmluZExpc3RQYXJhbXMuYXJlYUlkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50Qm9keUxpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9pbml0IHJlcV9wYXJhbXNcclxuICAgICAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5hcmVhSWQgPSB0cmVlTm9kZS5JRDtcclxuICAgICAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0TGlzdEJ5UGFyYW1zKHRoaXMuZmluZExpc3RQYXJhbXMpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5nZXRBcmVhVHJlZUxpc3QoKTtcclxuXHJcbiAgICAgICAgLy8g5by55Ye65qGG55u45YWzXHJcbiAgICAgICAgJHNjb3BlLiRvbihcImRldmljZS5jbG9zZVBvcHVwXCIsIChldmVudDogYW55LCBpc1JlZnJlc2g/OiBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VFbGVjdHJvbmljQ2hhbmdlUG9wdXAoaXNSZWZyZXNoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0UGFyYW1zKCkge1xyXG4gICAgICAgIHRoaXMudGFibGVOb0RhdGEgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBhZ2VQYXJhbXMgPSBuZXcgUGFnZVBhcmFtcygpO1xyXG4gICAgICAgIHRoaXMuVHlwZSA9ICdFbGVjdHJvbmljRmVuY2UnO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMgPSBuZXcgRWxlY3Ryb25pY0ZlbmNlTGlzdFBhcmFtcygpO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMucGFnZVNpemUgPSB0aGlzLnBhZ2VQYXJhbXMucGFnZVNpemU7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5hcmVhSWQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuc29ydE5hbWUgPSBcIkNvZGVcIjtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLmlzQXNjID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLlNlYXJjaFBhcmFtcyA9IHtcclxuICAgICAgICAgICAgTmFtZTogJydcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudEJvZHlMaXN0ID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuc2V0VGFibGVIZWFkKClcclxuICAgICAgICAvLyBmb3IobGV0IGk9MCxsZW49RWxlY3Ryb25pY0ZlbmNlVHlwZUVudW0ubGVuZ3RoO2k8bGVuOyl7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdGhpcy5FbGVjdHJvbmljRmVuY2VUeXBlTGlzdCA9IEVsZWN0cm9uaWNUeXBlRW51bTtcclxuICAgICAgICB0aGlzLmlzU2VsZWN0SXRlbXMgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgc2V0VGFibGVIZWFkID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudEhlYWRMaXN0ID0gW1xyXG4gICAgICAgICAgICB7ZmllbGQ6ICdOYW1lJywgdGl0bGU6ICdEUF9DT05GSUdfQ09NTU9OXzAzJ30sXHJcbiAgICAgICAgICAgIHtmaWVsZDogJ0NvZGUnLCB0aXRsZTogJ0RQX0NPTkZJR19DT01NT05fMDQnfSxcclxuICAgICAgICAgICAge2ZpZWxkOiAnQXJlYScsIHRpdGxlOiAnRFBfQ09ORklHX0NPTU1PTl8wOSd9LFxyXG4gICAgICAgICAgICAvLyB7ZmllbGQgOiAnU2VydmVySXAnLHRpdGxlOidEUF9DT05GSUdfQ09NTU9OXzEyJ30sXHJcbiAgICAgICAgICAgIHtmaWVsZDogJ0xvbmdpdHVkZScsIHRpdGxlOiAnRFBfQ09ORklHX0NPTU1PTl8xMyd9LFxyXG4gICAgICAgICAgICB7ZmllbGQ6ICdMYXRpdHVkZScsIHRpdGxlOiAnRFBfQ09ORklHX0NPTU1PTl8xNCd9LFxyXG4gICAgICAgICAgICB7ZmllbGQ6ICdPcGVyYXRlJywgdGl0bGU6ICdEUF9DT05GSUdfQ09NTU9OXzE1J30sXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrVGFza1R5cGVCdG4gPSAoYnRuSXRlbVZhbHVlOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICAgICAgICBpZiAoYnRuSXRlbVZhbHVlID09PSB0aGlzLlR5cGUpIHJldHVybjtcclxuICAgICAgICB0aGlzLlR5cGUgPSBidG5JdGVtVmFsdWU7XHJcbiAgICAgICAgdGhpcy5nZXRMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdFBhcmFtcylcclxuICAgIH07XHJcblxyXG4gICAgX2dldENhc0NhZGVTZWFyY2hQYXJhbXModGFibGVQYXJhbXM6IEVsZWN0cm9uaWNGZW5jZUxpc3RQYXJhbXMpIHtcclxuICAgICAgICBpZiAoIXRhYmxlUGFyYW1zKSByZXR1cm4ge30gYXMgQ2FzQ2FkZVNlYXJjaFBhcmFtcztcclxuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IENhc0NhZGVTZWFyY2hQYXJhbXMoKTtcclxuICAgICAgICByZXN1bHQucGFnZUluZGV4ID0gdGFibGVQYXJhbXMuY3VycmVudFBhZ2U7XHJcbiAgICAgICAgcmVzdWx0Lm9yZGVyRmllbGQgPSB0YWJsZVBhcmFtcy5zb3J0TmFtZTtcclxuICAgICAgICByZXN1bHQucGFnZVNpemUgPSB0YWJsZVBhcmFtcy5wYWdlU2l6ZTtcclxuICAgICAgICByZXN1bHQuYXJlYUlkID0gdGFibGVQYXJhbXMuYXJlYUlkO1xyXG4gICAgICAgIHJlc3VsdC5pc0FzYyA9IHRhYmxlUGFyYW1zLmlzQXNjO1xyXG4gICAgICAgIGlmICh0YWJsZVBhcmFtcy5OYW1lKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5uYW1lID0gdGFibGVQYXJhbXMuTmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBfZ2V0U2VhcmNoVHlwZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5UeXBlXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGlzdEJ5UGFyYW1zKHBhcmFtczogRWxlY3Ryb25pY0ZlbmNlTGlzdFBhcmFtcykge1xyXG4gICAgICAgIHRoaXMuY2FzQ2FkZVNlcnZpY2UuZmluZEVsZWN0cm9uaWNGZW5jZUxpc3QodGhpcy5fZ2V0Q2FzQ2FkZVNlYXJjaFBhcmFtcyhwYXJhbXMpKS50aGVuKChyZXM6IFJlc3BvbnNlUmVzdWx0PEFycmF5PEVsZWN0cm9uaWNGZW5jZUV4Pj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuZGF0YSAmJiByZXMuY29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRhYmxlQm9keShyZXMuZGF0YSwgcmVzLmNvdW50KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VGFibGVCb2R5KFtdLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zID0gcGFyYW1zO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzZXRUYWJsZUJvZHkoZGF0YUxpc3Q6IGFueSwgdG90YWw6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChkYXRhTGlzdCAmJiBkYXRhTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMudEJvZHlMaXN0ID0gZGF0YUxpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMudGFibGVOb0RhdGEgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBfcGFnZVBhcmFtcyA9IG5ldyBQYWdlUGFyYW1zKCk7XHJcbiAgICAgICAgICAgIF9wYWdlUGFyYW1zLmN1cnJlbnRQYWdlID0gdGhpcy5maW5kTGlzdFBhcmFtcy5jdXJyZW50UGFnZTtcclxuICAgICAgICAgICAgX3BhZ2VQYXJhbXMucGFnZVNpemUgPSB0aGlzLmZpbmRMaXN0UGFyYW1zLnBhZ2VTaXplO1xyXG4gICAgICAgICAgICBfcGFnZVBhcmFtcy5zZXRUb3RhbENvdW50KHRvdGFsKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGFnZVBhcmFtcyA9IF9wYWdlUGFyYW1zO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudEJvZHlMaXN0ID0gW107XHJcbiAgICAgICAgICAgIHRoaXMudGFibGVOb0RhdGEgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDmlbDmja7ojrflj5ZcclxuICAgIGdldEFyZWFUcmVlTGlzdChrZXl3b3JkPzogc3RyaW5nKSB7XHJcbiAgICAgICAgLy9JVHJlZVBhcmFtc1xyXG4gICAgICAgIGxldCBwYXJhbXM6IFRyZWVQYXJhbXMgPSB0aGlzLmFyZWFUcmVlRGF0YXMucmVxUGFyYW1zO1xyXG4gICAgICAgIHBhcmFtcy5rZXl3b3JkID0ga2V5d29yZDtcclxuICAgICAgICB0aGlzLmFyZWFTZXJ2aWNlLmZpbmRMaXN0VHJlZShwYXJhbXMpLnRoZW4oKHJlc3A6IEFycmF5PEFyZWFFeD4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3ApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy5maW5pc2hlZE5vRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzLmZpbmlzaGVkTm9EYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXJlYVRyZWVEYXRhcyhyZXNwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH07XHJcblxyXG4gICAgLy8g5qCR5pCc57SiXHJcbiAgICBhcmVhVHJlZVNlYXJjaElucHV0S2V5VXAoZTogYW55KSB7XHJcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRBcmVhVHJlZUxpc3QodGhpcy5hcmVhVHJlZVNlYXJjaElucHV0U3RyKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIOagkeaQnOe0olxyXG4gICAgYXJlYVRyZWVTZWFyY2hJbnB1dCgpIHtcclxuICAgICAgICB0aGlzLmdldEFyZWFUcmVlTGlzdCh0aGlzLmFyZWFUcmVlU2VhcmNoSW5wdXRTdHIpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyDmoJHotYvlgLxcclxuICAgIHNldEFyZWFUcmVlRGF0YXModHJlZURhdGFzOiBBcnJheTxBcmVhRXg+KSB7XHJcbiAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzLnRyZWVEYXRhcyA9IHRyZWVEYXRhcztcclxuICAgIH07XHJcblxyXG4gICAgLy8g5Y2V5qCP6YCJ5oup5o6S5bqPXHJcbiAgICBzb3J0QnlGaWVsZChfaW5kZXg6IG51bWJlciwgZmllbGQ6IHN0cmluZywgc29ydFN0YXR1czogYm9vbGVhbikge1xyXG5cclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLmlzQXNjID0gc29ydFN0YXR1cztcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLnNvcnROYW1lID0gZmllbGQ7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0TGlzdEJ5UGFyYW1zKHRoaXMuZmluZExpc3RQYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCJ5oup5p+Q5LiA5p2h5pWw5o2uXHJcbiAgICAgKiBAdGltZTogMjAxNy0wNC0yMSAxOTo0MzowN1xyXG4gICAgICogQHBhcmFtczpcclxuICAgICAqIEByZXR1cm46XHJcbiAgICAgKi9cclxuICAgIGFmdGVyQ2hhbmdlQ2hlY2socmVzdWx0TGlzdDogQXJyYXk8Ym9vbGVhbj4sIGlzQ2hlY2tBbGw6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldElzU2VsZWN0SXRlbXMocmVzdWx0TGlzdCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZExpc3QgPSByZXN1bHRMaXN0O1xyXG4gICAgICAgIHRoaXMuaXNTZWxlY3RBbGwgPSBpc0NoZWNrQWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL+iOt+WPluW9k+WJjeW3suiiq+mAieS4reWIl+ihqFxyXG4gICAgZ2V0U2VsZWN0ZWRMaXN0KCk6IEFycmF5PEVsZWN0cm9uaWNGZW5jZUV4PiB7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkRGF0YUxpc3Q6IEFycmF5PEVsZWN0cm9uaWNGZW5jZUV4PiA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLnRCb2R5TGlzdC5mb3JFYWNoKChpdnNTZXJ2ZXI6IEVsZWN0cm9uaWNGZW5jZUV4LCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZExpc3RbaW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWREYXRhTGlzdC5wdXNoKGl2c1NlcnZlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VsZWN0ZWREYXRhTGlzdDtcclxuICAgIH07XHJcblxyXG4gICAgLy/mibnph4/phY3nva7nq4vmnYZcclxuICAgIGNyZWF0ZSgpIHtcclxuICAgICAgICBsZXQgc2NvcGU6IHsgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgLy8g6L+Z6YeM5a+5c2NvcGXov5vooYzkuIDmrKHmlrDlu7pcclxuICAgICAgICB0aGlzLmN1cnJlbnRMYXllckluZGV4ID0gdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgY29udGVudDogcG9wdXBFbGVjdHJvbmljSHRtbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5pMThuRmFjdG9yeSgnRFBfQ09ORklHX0NPTU1PTl8wNycpLFxyXG4gICAgICAgICAgICBhcmVhOiBbXCI1NzBweFwiLCBcIjUxMHB4XCJdLFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmibnph4/phY3nva7ljLrln59cclxuICAgIGNvbmZpZ0RldmljZXModHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IHR5cGU6IHN0cmluZywgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUudHlwZSA9IHR5cGVcclxuICAgICAgICAvLyDov5nph4zlr7lzY29wZei/m+ihjOS4gOasoeaWsOW7ulxyXG4gICAgICAgIGlmICh0eXBlID09PSAnYXJlYScpIHtcclxuICAgICAgICAgICAgLy8g6L+Z6YeM5a+5c2NvcGXov5vooYzkuIDmrKHmlrDlu7pcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50TGF5ZXJJbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogcG9wdXBFbGVjdHJvbmljSHRtbCxcclxuICAgICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLmkxOG5GYWN0b3J5KFwiRFBfQ09ORklHX0NPTU1PTl8wOFwiKSxcclxuICAgICAgICAgICAgICAgIGFyZWE6IFtcIjU3MHB4XCIsIFwiYXV0b1wiXSxcclxuICAgICAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIOi/memHjOWvuXNjb3Bl6L+b6KGM5LiA5qyh5paw5bu6XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudExheWVySW5kZXggPSB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHBvcHVwRWxlY3Ryb25pY0h0bWwsXHJcbiAgICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5pMThuRmFjdG9yeShcIkRQX0NPTkZJR19DT01NT05fMDdcIiksXHJcbiAgICAgICAgICAgICAgICBhcmVhOiBbXCI1NzBweFwiLCBcImF1dG9cIl0sXHJcbiAgICAgICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9hYm91dCBwYWdlIGNsaWNrXHJcbiAgICBjaGFuZ2VQYWdlKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IG51bTtcclxuICAgICAgICB0aGlzLmdldExpc3RCeVBhcmFtcyh0aGlzLmZpbmRMaXN0UGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VQYWdlU2l6ZShudW06IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMucGFnZVNpemUgPSBudW07XHJcbiAgICAgICAgdGhpcy5nZXRMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdFBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2VFbGVjdHJvbmljQ2hhbmdlUG9wdXAoZmxhZz86IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmxheWVyLmNsb3NlKHRoaXMuY3VycmVudExheWVySW5kZXgpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudExheWVySW5kZXggPSAtMTtcclxuICAgICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgICAgICAvLyDliLfmlrDnlYzpnaJcclxuICAgICAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdFBhcmFtcyk7XHJcbiAgICAgICAgICAgIH0sIDIwMDApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0b3Igd3lyOiDliKTmlq3lkozorr7nva7lvZPliY3liJfooajmmK/lkKbmnInpgInkuK3nmoTlhYPntKBcclxuICAgICAqIEBwYXJhbSBpdGVtc1xyXG4gICAgICovXHJcbiAgICBzZXRJc1NlbGVjdEl0ZW1zKGl0ZW1zOiBBcnJheTxib29sZWFuPikge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICBpZiAoaXRlbXMgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgaSwgbGVuO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBpdGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1zW2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5pc1NlbGVjdEl0ZW1zICE9PSByZXN1bHQpIHtcclxuICAgICAgICAgICAgdGhpcy5pc1NlbGVjdEl0ZW1zID0gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRMYW1wKGRhdGE6IEVsZWN0cm9uaWNGZW5jZSkge1xyXG5cclxuICAgICAgICBsZXQgc2NvcGU6IHsgZGV2aWNlRGF0YTogRWxlY3Ryb25pY0ZlbmNlLCB0eXBlOiBzdHJpbmcsICRkZXN0cm95OiBGdW5jdGlvbiB9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLmRldmljZURhdGEgPSBkYXRhXHJcbiAgICAgICAgc2NvcGUudHlwZSA9IHRoaXMuVHlwZVxyXG4gICAgICAgIC8vIOi/memHjOWvuXNjb3Bl6L+b6KGM5LiA5qyh5paw5bu6XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGF5ZXJJbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IHBvcHVwTGFtcEh0bWwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgdGl0bGU6IHRoaXMuaTE4bkZhY3RvcnkoJ0RQX0NPTkZJR19DT01NT05fMTcnKSxcclxuICAgICAgICAgICAgYXJlYTogW1wiMzAwcHhcIiwgXCI0ODBweFwiXSxcclxuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VhcmNoKCkge1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuTmFtZSA9IHRoaXMuU2VhcmNoUGFyYW1zLk5hbWU7XHJcbiAgICAgICAgdGhpcy5nZXRMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdFBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/nvJbovpHmk43kvZxcclxuICAgIGVkaXRBcmVhVGQoZGF0YTogRWxlY3Ryb25pY0ZlbmNlKSB7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IGlkOiBzdHJpbmcsIEVsZWN0cm9uaWNGZW5jZURhdGE6IEVsZWN0cm9uaWNGZW5jZSwgYXJlYURhdGFzOiBhbnksIHR5cGU6IHN0cmluZywgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUuaWQgPSB0aGlzLmZpbmRMaXN0UGFyYW1zLmFyZWFJZDtcclxuICAgICAgICBzY29wZS5FbGVjdHJvbmljRmVuY2VEYXRhID0gZGF0YSBhcyBFbGVjdHJvbmljRmVuY2U7XHJcbiAgICAgICAgc2NvcGUuYXJlYURhdGFzID0gdGhpcy5hcmVhVHJlZURhdGFzLnRyZWVEYXRhcztcclxuICAgICAgICAvLyDov5nph4zlr7lzY29wZei/m+ihjOS4gOasoeaWsOW7ulxyXG4gICAgICAgIHRoaXMuY3VycmVudExheWVySW5kZXggPSB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBjb250ZW50OiBjcmVhdGVIdG1sLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLmkxOG5GYWN0b3J5KCdEUF9DT05GSUdfRUxFQ1RST05JQ0ZFTkNFXzAyJyksXHJcbiAgICAgICAgICAgIGFyZWE6IFtcIjM1MHB4XCIsIFwiYXV0b1wiXSxcclxuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5hcHBcclxuICAgIC5jb250cm9sbGVyKCdiYXNlQ29uZmlnRWxlY3Ryb25pY0ZlbmNlQ29udHJvbGxlcicsIGJhc2VDb25maWdFbGVjdHJvbmljRmVuY2VDb250cm9sbGVyKTsiXX0=
