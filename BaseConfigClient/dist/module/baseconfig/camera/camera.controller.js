define(["require", "exports", "text!./camera.popupCamera.html", "text!./camera.popupLamp.html", "text!./camera.cameraCreate.html", "../../common/app/main.app", "../../../core/params/CameraParams", "../../common/directive/tree/tree-params", "../../common/directive/page/page-params", "../../common/services/casecade.service", "../../../core/server/enum/CameraTypeEnum", "../../../core/enum/TreeType", "css!../css/baseconfig-device.css", "./camera.popupCamera.controller", "./camera.popupLamp.controller", "./camera.cameraCreate.controller", "../../common/services/area.service", "../../common/services/camera.service", "../../common/filter/app.filter"], function (require, exports, popupCameraHtml, popupLampHtml, createHtml, main_app_1, CameraParams_1, tree_params_1, page_params_1, casecade_service_1, CameraTypeEnum_1, TreeType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseConfigCameraController = (function () {
        function BaseConfigCameraController($scope, $timeout, cameraService, areaService, layer, casCadeService, i18nFactory) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.cameraService = cameraService;
            this.areaService = areaService;
            this.layer = layer;
            this.casCadeService = casCadeService;
            this.i18nFactory = i18nFactory;
            this.areaTreeSearchInputStr = "";
            this.myoption = null;
            this.setTableHead = function () {
                _this.tHeadListCamera = [
                    { field: 'Name', title: 'DP_CONFIG_COMMON_03' },
                    { field: 'Code', title: 'DP_CONFIG_COMMON_04', isSort: false },
                    { field: 'JsonUserData.Area.Name', title: 'DP_CONFIG_COMMON_09' },
                    { field: 'IpAddress', title: 'DP_CONFIG_COMMON_25' },
                    { field: '', title: 'DP_CONFIG_COMMON_13' },
                    { field: '', title: 'DP_CONFIG_COMMON_14' },
                    { field: '', title: 'DP_CONFIG_COMMON_15' },
                ];
            };
            this.initParams();
            this.initTreeParams();
            this.getAreaTreeList();
            this.$scope.$on("device.closePopup", function (event, isRefresh) {
                _this.closeCameraChangePopup(isRefresh);
            });
        }
        BaseConfigCameraController.prototype.initTreeParams = function () {
            var _this = this;
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
            this.areaTreeDatas.treeInitComplete = function (treeID) { };
            this.ButtonList = CameraTypeEnum_1.CameraTypeEnum;
            this.cameraTypeList = CameraTypeEnum_1.CameraTypeEnum;
        };
        BaseConfigCameraController.prototype.initParams = function () {
            this.tableNoData = false;
            this.pageParams = new page_params_1.default();
            this.findListParams = new CameraParams_1.CameraListParams();
            this.findListParams.currentPage = 1;
            this.findListParams.pageSize = this.pageParams.pageSize;
            this.findListParams.areaId = "";
            this.findListParams.sortName = "Code";
            this.findListParams.isAsc = true;
            this.tBodyList = [];
            this.SearchParams = {
                Type: '',
                Name: ''
            };
            this.setTableHead();
            this.isSelectItems = false;
        };
        BaseConfigCameraController.prototype.onClickTaskTypeBtn = function (myoptin) {
            this.SearchParams.Type = myoptin;
        };
        BaseConfigCameraController.prototype._getCasCadeSearchParams = function (tableParams) {
            if (!tableParams)
                return {};
            var result = new casecade_service_1.CasCadeSearchParams();
            result.pageIndex = tableParams.currentPage;
            result.orderField = tableParams.sortName;
            result.pageSize = tableParams.pageSize;
            result.areaId = tableParams.areaId;
            result.isAsc = tableParams.isAsc;
            if (this.SearchParams.Name) {
                result.name = this.SearchParams.Name;
            }
            if (this.SearchParams.Type) {
                result.type = this.SearchParams.Type;
            }
            return result;
        };
        BaseConfigCameraController.prototype.getListByParams = function (params) {
            var _this = this;
            this.casCadeService.findCameraList(this._getCasCadeSearchParams(params)).then(function (res) {
                if (res && res.data && res.code === 200) {
                    _this.setTableBody(res.data, res.count);
                }
                else {
                    _this.setTableBody([], 0);
                }
                _this.findListParams = params;
            });
        };
        BaseConfigCameraController.prototype.setTableBody = function (dataList, total) {
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
        BaseConfigCameraController.prototype.getAreaTreeList = function (keyword) {
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
        BaseConfigCameraController.prototype.areaTreeSearchInputKeyUp = function (e) {
            if (e.keyCode === 13) {
                this.getAreaTreeList(this.areaTreeSearchInputStr);
            }
        };
        ;
        BaseConfigCameraController.prototype.areaTreeSearchInput = function () {
            this.getAreaTreeList(this.areaTreeSearchInputStr);
        };
        ;
        BaseConfigCameraController.prototype.setAreaTreeDatas = function (treeDatas) {
            this.areaTreeDatas.treeDatas = treeDatas;
        };
        ;
        BaseConfigCameraController.prototype.sortByField = function (_index, field, sortStatus) {
            this.findListParams.isAsc = sortStatus;
            this.findListParams.sortName = field;
            this.getListByParams(this.findListParams);
        };
        BaseConfigCameraController.prototype.afterChangeCheck = function (resultList, isCheckAll) {
            this.setIsSelectItems(resultList);
            this.selectedList = resultList;
            this.isSelectAll = isCheckAll;
        };
        ;
        BaseConfigCameraController.prototype.getSelectedList = function () {
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
        BaseConfigCameraController.prototype.configDevices = function (type) {
            var scope = this.$scope.$new();
            scope.type = type;
            if (type === TreeType_1.TreeType.area.value) {
                this.currentLayerIndex = this.layer.open({
                    type: 1,
                    content: popupCameraHtml,
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
                    content: popupCameraHtml,
                    scope: scope,
                    title: this.i18nFactory("DP_CONFIG_COMMON_07"),
                    area: ["570px", "auto"],
                    end: function () {
                        scope.$destroy();
                    }
                });
            }
        };
        BaseConfigCameraController.prototype.changePage = function (num) {
            this.findListParams.currentPage = num;
            this.getListByParams(this.findListParams);
        };
        BaseConfigCameraController.prototype.changePageSize = function (num) {
            this.findListParams.currentPage = 1;
            this.findListParams.pageSize = num;
            this.getListByParams(this.findListParams);
        };
        BaseConfigCameraController.prototype.closeCameraChangePopup = function (flag) {
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
        BaseConfigCameraController.prototype.changeCameraType = function (model) {
            var models = [{ id: model.ID, type: model.CameraType }];
            this.cameraService.updateCameraType(models);
        };
        BaseConfigCameraController.prototype.changeCameraTypes = function (type) {
            var cameras = this.getSelectedList();
            var models = [];
            if (cameras && cameras.length > 0) {
                for (var i = 0, len = cameras.length; i < len; i++) {
                    models.push({ id: cameras[i].ID, type: type });
                    cameras[i].CameraType = type;
                }
                this.cameraService.updateCameraType(models);
            }
            this.selectedCameraType = "";
        };
        BaseConfigCameraController.prototype.setIsSelectItems = function (items) {
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
        BaseConfigCameraController.prototype.setLamp = function (data) {
            var scope = this.$scope.$new();
            scope.deviceData = data;
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
        BaseConfigCameraController.prototype.create = function () {
            var scope = this.$scope.$new();
            scope.id = this.findListParams.areaId;
            scope.type = 'add';
            this.currentLayerIndex = this.layer.open({
                type: 1,
                content: createHtml,
                scope: scope,
                title: "新增",
                area: ["340px", "400px"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        BaseConfigCameraController.prototype.search = function () {
            this.findListParams.Name = this.SearchParams.Name;
            this.findListParams.Type = this.SearchParams.Type;
            this.getListByParams(this.findListParams);
        };
        BaseConfigCameraController.prototype.editCamera = function (data) {
            var scope = this.$scope.$new();
            scope.id = this.findListParams.areaId;
            scope.Camera = angular.copy(data);
            this.currentLayerIndex = this.layer.open({
                type: 1,
                content: createHtml,
                scope: scope,
                title: this.i18nFactory('DP_CONFIG_CAMERA_02'),
                area: ["350px", "auto"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        BaseConfigCameraController.$inject = ['$scope', '$timeout', 'cameraService', 'areaService', 'layer', 'casCadeService', 'i18nFactory'];
        return BaseConfigCameraController;
    }());
    main_app_1.app
        .controller('baseConfigCameraController', BaseConfigCameraController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9jYW1lcmEvY2FtZXJhLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBd0NBO1FBZ0NJLG9DQUFvQixNQUFXLEVBQ1gsUUFBYSxFQUNiLGFBQTZCLEVBQzdCLFdBQXlCLEVBQ3pCLEtBQVUsRUFDVixjQUErQixFQUMvQixXQUFnQjtZQU5wQyxpQkFjQztZQWRtQixXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQ1gsYUFBUSxHQUFSLFFBQVEsQ0FBSztZQUNiLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtZQUM3QixnQkFBVyxHQUFYLFdBQVcsQ0FBYztZQUN6QixVQUFLLEdBQUwsS0FBSyxDQUFLO1lBQ1YsbUJBQWMsR0FBZCxjQUFjLENBQWlCO1lBQy9CLGdCQUFXLEdBQVgsV0FBVyxDQUFLO1lBckJwQywyQkFBc0IsR0FBVyxFQUFFLENBQUM7WUFhcEMsYUFBUSxHQUFXLElBQUksQ0FBQztZQXlEeEIsaUJBQVksR0FBRztnQkFDWCxLQUFJLENBQUMsZUFBZSxHQUFHO29CQUNuQixFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLHFCQUFxQixFQUFDO29CQUM3QyxFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUM7b0JBQzVELEVBQUMsS0FBSyxFQUFFLHdCQUF3QixFQUFFLEtBQUssRUFBRSxxQkFBcUIsRUFBQztvQkFFL0QsRUFBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxxQkFBcUIsRUFBQztvQkFDbEQsRUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxxQkFBcUIsRUFBQztvQkFDekMsRUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxxQkFBcUIsRUFBQztvQkFDekMsRUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxxQkFBcUIsRUFBQztpQkFDNUMsQ0FB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QVcsQ0FBQztZQUU1QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQ3JDLElBQUksRUFBRSxDQUFDO2dCQUNQLE9BQU8sRUFBRSxVQUFVO2dCQUNuQixLQUFLLEVBQUUsS0FBSztnQkFDWixLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQztnQkFDOUMsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztnQkFDdkIsR0FBRyxFQUFFO29CQUNELEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDckIsQ0FBQzthQUNKLENBQUMsQ0FBQztRQUNQLENBQUM7UUE3V00sa0NBQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxDQUFDLENBQUM7UUE4V3RILGlDQUFDO0tBL1dELEFBK1dDLElBQUE7SUFFRCxjQUFHO1NBQ0UsVUFBVSxDQUFDLDRCQUE0QixFQUFFLDBCQUEwQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2Jhc2Vjb25maWcvY2FtZXJhL2NhbWVyYS5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZGVsbCBvbiAyMDE3LzMvMjMuXHJcbiAqL1xyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4vY2FtZXJhLnBvcHVwQ2FtZXJhLmh0bWxcIiBuYW1lPVwicG9wdXBDYW1lcmFIdG1sXCIgLz5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuL2NhbWVyYS5wb3B1cExhbXAuaHRtbFwiIG5hbWU9XCJwb3B1cExhbXBIdG1sXCIgLz5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuL2NhbWVyYS5jYW1lcmFDcmVhdGUuaHRtbFwiIG5hbWU9XCJjcmVhdGVIdG1sXCIgLz5cclxuaW1wb3J0IFwiY3NzIS4uL2Nzcy9iYXNlY29uZmlnLWRldmljZS5jc3NcIjtcclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCBcIi4vY2FtZXJhLnBvcHVwQ2FtZXJhLmNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFwiLi9jYW1lcmEucG9wdXBMYW1wLmNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFwiLi9jYW1lcmEuY2FtZXJhQ3JlYXRlLmNvbnRyb2xsZXJcIjtcclxuXHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hcmVhLnNlcnZpY2VcIjtcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2NhbWVyYS5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9maWx0ZXIvYXBwLmZpbHRlclwiO1xyXG5cclxuaW1wb3J0IHtFbnVtfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnVtL0VudW1cIjtcclxuaW1wb3J0IHtDYW1lcmFMaXN0UGFyYW1zLCBDYW1lcmFDaGFuZ2VDYW1lcmFUeXBlfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvQ2FtZXJhUGFyYW1zXCI7XHJcbmltcG9ydCB7Q2FtZXJhRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9DYW1lcmFFeFwiO1xyXG5pbXBvcnQge1Jlc3BvbnNlUmVzdWx0LCBQYWdlUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7SVRhYmxlSGVhZGVyfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS91bml0LXRhYmxlL3RhYmxlLXBhcmFtc1wiO1xyXG5pbXBvcnQge1RyZWVEYXRhUGFyYW1zfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUtcGFyYW1zXCI7XHJcbmltcG9ydCB7QXJlYUV4fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvQXJlYUV4XCI7XHJcbmltcG9ydCB7VHJlZVBhcmFtc30gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3RyZWUvVHJlZVBhcmFtc1wiO1xyXG5pbXBvcnQge0lBcmVhU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hcmVhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtJQ2FtZXJhU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9jYW1lcmEuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IFBhZ2VQYXJhbXMgZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvcGFnZS9wYWdlLXBhcmFtc1wiO1xyXG5pbXBvcnQge0FyZWF9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9BcmVhXCI7XHJcbmltcG9ydCB7SUNhc0NhZGVTZXJ2aWNlLCBDYXNDYWRlU2VhcmNoUGFyYW1zfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2Nhc2VjYWRlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtDYW1lcmFUeXBlRW51bX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vQ2FtZXJhVHlwZUVudW1cIjtcclxuaW1wb3J0IHtDYW1lcmF9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L0NhbWVyYSc7XHJcbi8vIGltcG9ydCB7IEpzb25Vc2VyRGF0YSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L1VzZXJFeCc7XHJcbmltcG9ydCB7SVBhZ2VQYXJhbXN9IGZyb20gJy4uLy4uLy4uL2NvcmUvcGFyYW1zL3RhYmxlL1RhYmxlUGFyYW1zJztcclxuaW1wb3J0IHtUcmVlVHlwZX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW51bS9UcmVlVHlwZVwiO1xyXG5cclxuXHJcbmRlY2xhcmUgbGV0IHBvcHVwQ2FtZXJhSHRtbDogYW55LCBhbmd1bGFyOiBhbnksIGNyZWF0ZUh0bWw6IGFueSwgcG9wdXBMYW1wSHRtbDogYW55O1xyXG5cclxuLyogYmNEZXZpY2VDdHJsICovXHJcbmNsYXNzIEJhc2VDb25maWdDYW1lcmFDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAnJHRpbWVvdXQnLCAnY2FtZXJhU2VydmljZScsICdhcmVhU2VydmljZScsICdsYXllcicsICdjYXNDYWRlU2VydmljZScsICdpMThuRmFjdG9yeSddO1xyXG5cclxuICAgIGZpbmRMaXN0UGFyYW1zOiBDYW1lcmFMaXN0UGFyYW1zO1xyXG4gICAgcGFnZVBhcmFtczogUGFnZVBhcmFtcztcclxuXHJcbiAgICAvLy0tLXRhYmxlXHJcbiAgICAvLyB0YWJsZSDliJfooajmlbDmja5cclxuICAgIHRIZWFkTGlzdENhbWVyYTogQXJyYXk8SVRhYmxlSGVhZGVyPjtcclxuICAgIEJ1dHRvbkxpc3Q6IEFycmF5PEVudW0+O1xyXG4gICAgdEJvZHlMaXN0OiBhbnk7XHJcbiAgICB0YWJsZU5vRGF0YTogYm9vbGVhbjtcclxuICAgIFNlYXJjaFBhcmFtczogYW55O1xyXG5cclxuICAgIC8vYXJlYSB0cmVlXHJcbiAgICBhcmVhVHJlZURhdGFzOiBUcmVlRGF0YVBhcmFtczxBcmVhPjtcclxuICAgIC8vc2VhcmNoXHJcbiAgICBhcmVhVHJlZVNlYXJjaElucHV0U3RyOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIC8v5aSa6YCJ55u45YWzXHJcbiAgICBzZWxlY3RlZExpc3Q6IEFycmF5PGJvb2xlYW4+O1xyXG4gICAgaXNTZWxlY3RBbGw6IGJvb2xlYW47XHJcblxyXG4gICAgY3VycmVudExheWVySW5kZXg6IG51bWJlcjtcclxuXHJcbiAgICBjYW1lcmFUeXBlTGlzdDogeyB2YWx1ZTogc3RyaW5nLCB0ZXh0OiBzdHJpbmcgfVtdO1xyXG5cclxuICAgIGlzU2VsZWN0SXRlbXM6IGJvb2xlYW47XHJcblxyXG4gICAgc2VsZWN0ZWRDYW1lcmFUeXBlOiBzdHJpbmc7XHJcbiAgICBteW9wdGlvbjogc3RyaW5nID0gbnVsbDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjYW1lcmFTZXJ2aWNlOiBJQ2FtZXJhU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgYXJlYVNlcnZpY2U6IElBcmVhU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbGF5ZXI6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgY2FzQ2FkZVNlcnZpY2U6IElDYXNDYWRlU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgaTE4bkZhY3Rvcnk6IGFueSkge1xyXG4gICAgICAgIHRoaXMuaW5pdFBhcmFtcygpO1xyXG4gICAgICAgIHRoaXMuaW5pdFRyZWVQYXJhbXMoKTtcclxuICAgICAgICB0aGlzLmdldEFyZWFUcmVlTGlzdCgpO1xyXG4gICAgICAgIC8vIOW8ueWHuuahhuebuOWFs1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRvbihcImRldmljZS5jbG9zZVBvcHVwXCIsIChldmVudDogYW55LCBpc1JlZnJlc2g/OiBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VDYW1lcmFDaGFuZ2VQb3B1cChpc1JlZnJlc2gpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFRyZWVQYXJhbXMoKSB7XHJcbiAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzID0gbmV3IFRyZWVEYXRhUGFyYW1zPEFyZWFFeD4oKTtcclxuICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMudHJlZUlkID0gJ2FyZWFUcmVlSXZzJztcclxuICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMuaXNEZWZhdWx0U2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy5vbkNsaWNrID0gKGV2ZW50OiBNb3VzZUV2ZW50LCB0cmVlSWQ6IHN0cmluZywgdHJlZU5vZGU6IEFyZWFFeCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodHJlZU5vZGUuSUQgPT0gdGhpcy5maW5kTGlzdFBhcmFtcy5hcmVhSWQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRCb2R5TGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLmFyZWFJZCA9IHRyZWVOb2RlLklEO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICAgICAgdGhpcy5nZXRMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdFBhcmFtcyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMudHJlZUluaXRDb21wbGV0ZSA9ICh0cmVlSUQ6IHN0cmluZykgPT4ge307XHJcbiAgICAgICAgdGhpcy5CdXR0b25MaXN0ID0gQ2FtZXJhVHlwZUVudW07XHJcbiAgICAgICAgdGhpcy5jYW1lcmFUeXBlTGlzdCA9IENhbWVyYVR5cGVFbnVtO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFBhcmFtcygpIHtcclxuICAgICAgICB0aGlzLnRhYmxlTm9EYXRhID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wYWdlUGFyYW1zID0gbmV3IFBhZ2VQYXJhbXMoKTtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zID0gbmV3IENhbWVyYUxpc3RQYXJhbXMoKTtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLnBhZ2VTaXplID0gdGhpcy5wYWdlUGFyYW1zLnBhZ2VTaXplO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuYXJlYUlkID0gXCJcIjtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLnNvcnROYW1lID0gXCJDb2RlXCI7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5pc0FzYyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy50Qm9keUxpc3QgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5TZWFyY2hQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIFR5cGU6ICcnLFxyXG4gICAgICAgICAgICBOYW1lOiAnJ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRUYWJsZUhlYWQoKVxyXG4gICAgICAgIHRoaXMuaXNTZWxlY3RJdGVtcyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRhYmxlSGVhZCA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnRIZWFkTGlzdENhbWVyYSA9IFtcclxuICAgICAgICAgICAge2ZpZWxkOiAnTmFtZScsIHRpdGxlOiAnRFBfQ09ORklHX0NPTU1PTl8wMyd9LFxyXG4gICAgICAgICAgICB7ZmllbGQ6ICdDb2RlJywgdGl0bGU6ICdEUF9DT05GSUdfQ09NTU9OXzA0JywgaXNTb3J0OiBmYWxzZX0sXHJcbiAgICAgICAgICAgIHtmaWVsZDogJ0pzb25Vc2VyRGF0YS5BcmVhLk5hbWUnLCB0aXRsZTogJ0RQX0NPTkZJR19DT01NT05fMDknfSxcclxuICAgICAgICAgICAgLy8ge2ZpZWxkOiAnJywgdGl0bGU6J+acjeWKoeWZqElQJ30sXHJcbiAgICAgICAgICAgIHtmaWVsZDogJ0lwQWRkcmVzcycsIHRpdGxlOiAnRFBfQ09ORklHX0NPTU1PTl8yNSd9LFxyXG4gICAgICAgICAgICB7ZmllbGQ6ICcnLCB0aXRsZTogJ0RQX0NPTkZJR19DT01NT05fMTMnfSxcclxuICAgICAgICAgICAge2ZpZWxkOiAnJywgdGl0bGU6ICdEUF9DT05GSUdfQ09NTU9OXzE0J30sXHJcbiAgICAgICAgICAgIHtmaWVsZDogJycsIHRpdGxlOiAnRFBfQ09ORklHX0NPTU1PTl8xNSd9LFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja1Rhc2tUeXBlQnRuKG15b3B0aW46IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuU2VhcmNoUGFyYW1zLlR5cGUgPSBteW9wdGluO1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRDYXNDYWRlU2VhcmNoUGFyYW1zKHRhYmxlUGFyYW1zOiBDYW1lcmFMaXN0UGFyYW1zKSB7XHJcbiAgICAgICAgaWYgKCF0YWJsZVBhcmFtcykgcmV0dXJuIHt9IGFzIENhc0NhZGVTZWFyY2hQYXJhbXM7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBDYXNDYWRlU2VhcmNoUGFyYW1zKCk7XHJcbiAgICAgICAgcmVzdWx0LnBhZ2VJbmRleCA9IHRhYmxlUGFyYW1zLmN1cnJlbnRQYWdlO1xyXG4gICAgICAgIHJlc3VsdC5vcmRlckZpZWxkID0gdGFibGVQYXJhbXMuc29ydE5hbWU7XHJcbiAgICAgICAgcmVzdWx0LnBhZ2VTaXplID0gdGFibGVQYXJhbXMucGFnZVNpemU7XHJcbiAgICAgICAgcmVzdWx0LmFyZWFJZCA9IHRhYmxlUGFyYW1zLmFyZWFJZDtcclxuICAgICAgICByZXN1bHQuaXNBc2MgPSB0YWJsZVBhcmFtcy5pc0FzYztcclxuICAgICAgICBpZiAodGhpcy5TZWFyY2hQYXJhbXMuTmFtZSkge1xyXG4gICAgICAgICAgICByZXN1bHQubmFtZSA9IHRoaXMuU2VhcmNoUGFyYW1zLk5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLlNlYXJjaFBhcmFtcy5UeXBlKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC50eXBlID0gdGhpcy5TZWFyY2hQYXJhbXMuVHlwZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMaXN0QnlQYXJhbXMocGFyYW1zOiBDYW1lcmFMaXN0UGFyYW1zKSB7XHJcblxyXG4gICAgICAgIHRoaXMuY2FzQ2FkZVNlcnZpY2UuZmluZENhbWVyYUxpc3QodGhpcy5fZ2V0Q2FzQ2FkZVNlYXJjaFBhcmFtcyhwYXJhbXMpKS50aGVuKChyZXM6IFJlc3BvbnNlUmVzdWx0PEFycmF5PENhbWVyYUV4Pj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuZGF0YSAmJiByZXMuY29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRhYmxlQm9keShyZXMuZGF0YSwgcmVzLmNvdW50KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VGFibGVCb2R5KFtdLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zID0gcGFyYW1zO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzZXRUYWJsZUJvZHkoZGF0YUxpc3Q6IGFueSwgdG90YWw6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChkYXRhTGlzdCAmJiBkYXRhTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMudEJvZHlMaXN0ID0gZGF0YUxpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMudGFibGVOb0RhdGEgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IF9wYWdlUGFyYW1zID0gbmV3IFBhZ2VQYXJhbXMoKTtcclxuICAgICAgICAgICAgX3BhZ2VQYXJhbXMuY3VycmVudFBhZ2UgPSB0aGlzLmZpbmRMaXN0UGFyYW1zLmN1cnJlbnRQYWdlO1xyXG4gICAgICAgICAgICBfcGFnZVBhcmFtcy5wYWdlU2l6ZSA9IHRoaXMuZmluZExpc3RQYXJhbXMucGFnZVNpemU7XHJcbiAgICAgICAgICAgIF9wYWdlUGFyYW1zLnNldFRvdGFsQ291bnQodG90YWwpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wYWdlUGFyYW1zID0gX3BhZ2VQYXJhbXM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy50Qm9keUxpc3QgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy50YWJsZU5vRGF0YSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOaVsOaNruiOt+WPllxyXG4gICAgZ2V0QXJlYVRyZWVMaXN0KGtleXdvcmQ/OiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgcGFyYW1zOiBUcmVlUGFyYW1zID0gdGhpcy5hcmVhVHJlZURhdGFzLnJlcVBhcmFtcztcclxuICAgICAgICBwYXJhbXMua2V5d29yZCA9IGtleXdvcmQ7XHJcbiAgICAgICAgdGhpcy5hcmVhU2VydmljZS5maW5kTGlzdFRyZWUocGFyYW1zKS50aGVuKChyZXNwOiBBcnJheTxBcmVhRXg+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXNwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMuZmluaXNoZWROb0RhdGEgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy5maW5pc2hlZE5vRGF0YSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEFyZWFUcmVlRGF0YXMocmVzcCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIOagkeaQnOe0olxyXG4gICAgYXJlYVRyZWVTZWFyY2hJbnB1dEtleVVwKGU6IGFueSkge1xyXG4gICAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0QXJlYVRyZWVMaXN0KHRoaXMuYXJlYVRyZWVTZWFyY2hJbnB1dFN0cik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyDmoJHmkJzntKJcclxuICAgIGFyZWFUcmVlU2VhcmNoSW5wdXQoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRBcmVhVHJlZUxpc3QodGhpcy5hcmVhVHJlZVNlYXJjaElucHV0U3RyKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8g5qCR6LWL5YC8XHJcbiAgICBzZXRBcmVhVHJlZURhdGFzKHRyZWVEYXRhczogQXJyYXk8QXJlYUV4Pikge1xyXG4gICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy50cmVlRGF0YXMgPSB0cmVlRGF0YXM7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyDljZXmoI/pgInmi6nmjpLluo9cclxuICAgIHNvcnRCeUZpZWxkKF9pbmRleDogbnVtYmVyLCBmaWVsZDogc3RyaW5nLCBzb3J0U3RhdHVzOiBib29sZWFuKSB7XHJcblxyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuaXNBc2MgPSBzb3J0U3RhdHVzO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuc29ydE5hbWUgPSBmaWVsZDtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdFBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgInmi6nmn5DkuIDmnaHmlbDmja5cclxuICAgICAqIEB0aW1lOiAyMDE3LTA0LTIxIDE5OjQzOjA3XHJcbiAgICAgKiBAcGFyYW1zOlxyXG4gICAgICogQHJldHVybjpcclxuICAgICAqL1xyXG4gICAgYWZ0ZXJDaGFuZ2VDaGVjayhyZXN1bHRMaXN0OiBBcnJheTxib29sZWFuPiwgaXNDaGVja0FsbDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0SXNTZWxlY3RJdGVtcyhyZXN1bHRMaXN0KTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkTGlzdCA9IHJlc3VsdExpc3Q7XHJcbiAgICAgICAgdGhpcy5pc1NlbGVjdEFsbCA9IGlzQ2hlY2tBbGw7XHJcbiAgICB9O1xyXG5cclxuICAgIC8v6I635Y+W5b2T5YmN5bey6KKr6YCJ5Lit5YiX6KGoXHJcbiAgICBnZXRTZWxlY3RlZExpc3QoKTogQXJyYXk8Q2FtZXJhRXg+IHtcclxuICAgICAgICBsZXQgc2VsZWN0ZWREYXRhTGlzdDogQXJyYXk8Q2FtZXJhRXg+ID0gW107XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMudEJvZHlMaXN0LmZvckVhY2goKGl2c1NlcnZlcjogQ2FtZXJhRXgsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkTGlzdFtpbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZERhdGFMaXN0LnB1c2goaXZzU2VydmVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZWxlY3RlZERhdGFMaXN0O1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBjb25maWdEZXZpY2VzXHJcbiAgICBjb25maWdEZXZpY2VzKHR5cGU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBzY29wZTogeyB0eXBlOiBzdHJpbmcsICRkZXN0cm95OiBGdW5jdGlvbiB9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgIGlmICh0eXBlID09PSBUcmVlVHlwZS5hcmVhLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIC8vIOi/memHjOWvuXNjb3Bl6L+b6KGM5LiA5qyh5paw5bu6XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudExheWVySW5kZXggPSB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHBvcHVwQ2FtZXJhSHRtbCxcclxuICAgICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLmkxOG5GYWN0b3J5KFwiRFBfQ09ORklHX0NPTU1PTl8wOFwiKSxcclxuICAgICAgICAgICAgICAgIGFyZWE6IFtcIjU3MHB4XCIsIFwiYXV0b1wiXSxcclxuICAgICAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIOi/memHjOWvuXNjb3Bl6L+b6KGM5LiA5qyh5paw5bu6XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudExheWVySW5kZXggPSB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHBvcHVwQ2FtZXJhSHRtbCxcclxuICAgICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLmkxOG5GYWN0b3J5KFwiRFBfQ09ORklHX0NPTU1PTl8wN1wiKSxcclxuICAgICAgICAgICAgICAgIGFyZWE6IFtcIjU3MHB4XCIsIFwiYXV0b1wiXSxcclxuICAgICAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL2Fib3V0IHBhZ2UgY2xpY2tcclxuICAgIGNoYW5nZVBhZ2UobnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLmN1cnJlbnRQYWdlID0gbnVtO1xyXG4gICAgICAgIHRoaXMuZ2V0TGlzdEJ5UGFyYW1zKHRoaXMuZmluZExpc3RQYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVBhZ2VTaXplKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5wYWdlU2l6ZSA9IG51bTtcclxuICAgICAgICB0aGlzLmdldExpc3RCeVBhcmFtcyh0aGlzLmZpbmRMaXN0UGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZUNhbWVyYUNoYW5nZVBvcHVwKGZsYWc/OiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5sYXllci5jbG9zZSh0aGlzLmN1cnJlbnRMYXllckluZGV4KTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRMYXllckluZGV4ID0gLTE7XHJcbiAgICAgICAgaWYgKGZsYWcpIHtcclxuICAgICAgICAgICAgLy8g5Yi35paw55WM6Z2iXHJcbiAgICAgICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldExpc3RCeVBhcmFtcyh0aGlzLmZpbmRMaXN0UGFyYW1zKTtcclxuICAgICAgICAgICAgfSwyMDAwKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VDYW1lcmFUeXBlKG1vZGVsOiBDYW1lcmFFeCkge1xyXG4gICAgICAgIGxldCBtb2RlbHMgPSBbe2lkOiBtb2RlbC5JRCwgdHlwZTogbW9kZWwuQ2FtZXJhVHlwZX1dIGFzIEFycmF5PENhbWVyYUNoYW5nZUNhbWVyYVR5cGU+O1xyXG4gICAgICAgIHRoaXMuY2FtZXJhU2VydmljZS51cGRhdGVDYW1lcmFUeXBlKG1vZGVscyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlQ2FtZXJhVHlwZXModHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGNhbWVyYXMgPSB0aGlzLmdldFNlbGVjdGVkTGlzdCgpO1xyXG4gICAgICAgIGxldCBtb2RlbHMgPSBbXSBhcyBBcnJheTxDYW1lcmFDaGFuZ2VDYW1lcmFUeXBlPjtcclxuICAgICAgICBpZiAoY2FtZXJhcyAmJiBjYW1lcmFzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGNhbWVyYXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIG1vZGVscy5wdXNoKHtpZDogY2FtZXJhc1tpXS5JRCwgdHlwZTogdHlwZX0pO1xyXG4gICAgICAgICAgICAgICAgY2FtZXJhc1tpXS5DYW1lcmFUeXBlID0gdHlwZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNhbWVyYVNlcnZpY2UudXBkYXRlQ2FtZXJhVHlwZShtb2RlbHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDnva7kuLrliJ3lp4vlgLxcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQ2FtZXJhVHlwZSA9IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdG9yIHd5cjog5Yik5pat5ZKM6K6+572u5b2T5YmN5YiX6KGo5piv5ZCm5pyJ6YCJ5Lit55qE5YWD57SgXHJcbiAgICAgKiBAcGFyYW0gaXRlbXNcclxuICAgICAqL1xyXG4gICAgc2V0SXNTZWxlY3RJdGVtcyhpdGVtczogQXJyYXk8Ym9vbGVhbj4pIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IGksIGxlbjtcclxuICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gaXRlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtc1tpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaXNTZWxlY3RJdGVtcyAhPT0gcmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNTZWxlY3RJdGVtcyA9IHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TGFtcChkYXRhOiBDYW1lcmEpIHtcclxuICAgICAgICBsZXQgc2NvcGU6IHsgZGV2aWNlRGF0YTogQ2FtZXJhLCAkZGVzdHJveTogRnVuY3Rpb24gfSA9IHRoaXMuJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICBzY29wZS5kZXZpY2VEYXRhID0gZGF0YVxyXG4gICAgICAgIC8vIOi/memHjOWvuXNjb3Bl6L+b6KGM5LiA5qyh5paw5bu6XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGF5ZXJJbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IHBvcHVwTGFtcEh0bWwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgdGl0bGU6IHRoaXMuaTE4bkZhY3RvcnkoJ0RQX0NPTkZJR19DT01NT05fMTcnKSxcclxuICAgICAgICAgICAgYXJlYTogW1wiMzAwcHhcIiwgXCI0ODBweFwiXSxcclxuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlKCkge1xyXG4gICAgICAgIGxldCBzY29wZTogeyBpZDogc3RyaW5nLCB0eXBlOiBzdHJpbmcsICRkZXN0cm95OiBGdW5jdGlvbiB9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLmlkID0gdGhpcy5maW5kTGlzdFBhcmFtcy5hcmVhSWQ7XHJcbiAgICAgICAgc2NvcGUudHlwZSA9ICdhZGQnO1xyXG4gICAgICAgIC8vIOi/memHjOWvuXNjb3Bl6L+b6KGM5LiA5qyh5paw5bu6XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGF5ZXJJbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGNyZWF0ZUh0bWwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgdGl0bGU6IFwi5paw5aKeXCIsXHJcbiAgICAgICAgICAgIGFyZWE6IFtcIjM0MHB4XCIsIFwiNDAwcHhcIl0sXHJcbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNlYXJjaCgpIHtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLk5hbWUgPSB0aGlzLlNlYXJjaFBhcmFtcy5OYW1lO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuVHlwZSA9IHRoaXMuU2VhcmNoUGFyYW1zLlR5cGU7XHJcbiAgICAgICAgdGhpcy5nZXRMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdFBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZWRpdENhbWVyYShkYXRhOiBDYW1lcmEpIHtcclxuICAgICAgICBsZXQgc2NvcGU6IHsgaWQ6IHN0cmluZywgdHlwZTogc3RyaW5nLCBDYW1lcmE6IENhbWVyYSwgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUuaWQgPSB0aGlzLmZpbmRMaXN0UGFyYW1zLmFyZWFJZDtcclxuICAgICAgICBzY29wZS5DYW1lcmEgPSBhbmd1bGFyLmNvcHkoZGF0YSkgYXMgQ2FtZXJhO1xyXG4gICAgICAgIC8vIOi/memHjOWvuXNjb3Bl6L+b6KGM5LiA5qyh5paw5bu6XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGF5ZXJJbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGNyZWF0ZUh0bWwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgdGl0bGU6IHRoaXMuaTE4bkZhY3RvcnkoJ0RQX0NPTkZJR19DQU1FUkFfMDInKSxcclxuICAgICAgICAgICAgYXJlYTogW1wiMzUwcHhcIiwgXCJhdXRvXCJdLFxyXG4gICAgICAgICAgICBlbmQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuYXBwXHJcbiAgICAuY29udHJvbGxlcignYmFzZUNvbmZpZ0NhbWVyYUNvbnRyb2xsZXInLCBCYXNlQ29uZmlnQ2FtZXJhQ29udHJvbGxlcik7Il19
