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
define(["require", "exports", "text!./lamp.popup.html", "text!./lamp.device.popup.html", "../../common/app/main.app", "../../common/directive/page/page-params", "../../common/directive/tree/tree-params", "../../../core/params/LampParams", "../../../core/params/TaskConfigParams", "../../common/services/casecade.service", "./lamp.popup", "./lamp.device.popup", "css!../css/baseconfig-lamp.css", "../../common/services/lamp.service", "../../common/services/area.service", "../../common/services/camera.service", "../../common/services/electronicfence.service", "../../common/services/rmpgate.service", "../../common/services/wifi.service", "../../common/directive/tree/tree.directive.service", "../../common/directive/tree/tree.directive.service", "./lamp.store.service", "es6-promise"], function (require, exports, lampPopup, deviceHtml, main_app_1, page_params_1, tree_params_1, LampParams_1, TaskConfigParams_1, casecade_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Promise = require("es6-promise");
    var TableListParams = (function (_super) {
        __extends(TableListParams, _super);
        function TableListParams() {
            var _this = _super.call(this) || this;
            _this.sortName = 'Code';
            _this.isAsc = true;
            _this.pageSize = new page_params_1.default().pageSize;
            _this.currentPage = new page_params_1.default().currentPage;
            return _this;
        }
        ;
        return TableListParams;
    }(LampParams_1.LampTableParams));
    var parObj = (function () {
        function parObj() {
            this.imagePath = '';
            this.arrCameraId = [];
            this.startTime = '';
            this.endTime = '';
            this.arrGender = [];
            this.maxAge = null;
            this.minAge = null;
            this.arrEyeGlasses = [];
            this.arrSunGlasses = [];
            this.arrMask = [];
            this.minThreshold = 0;
            this.pageSize = 50;
            this.currentPage = 1;
        }
        return parObj;
    }());
    var BaseConfigLampController = (function () {
        function BaseConfigLampController($scope, $timeout, lampService, areaService, cameraService, wifiService, rmpgateService, electronicfenceService, layer, casCadeService, i18nFactory, treeService) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.lampService = lampService;
            this.areaService = areaService;
            this.cameraService = cameraService;
            this.wifiService = wifiService;
            this.rmpgateService = rmpgateService;
            this.electronicfenceService = electronicfenceService;
            this.layer = layer;
            this.casCadeService = casCadeService;
            this.i18nFactory = i18nFactory;
            this.treeService = treeService;
            this.tableNoData = false;
            this.treeNoData = false;
            this.cacheSelCamera = [];
            this.ageRange = [];
            this.glassType = 0;
            this.isUploadImg = false;
            this.$scope.$on("lamp.closePopup", function (event, isRefresh) {
                event.preventDefault();
                _this.layer.close(_this.currentLayerIndex);
                if (isRefresh) {
                    _this.$timeout(function () {
                        _this.getTableList();
                        _this.getTreeList();
                    }, 1000);
                }
            });
            this.$scope.$on("lampDevice.closePopup", function (event, isRefresh) {
                event.preventDefault();
                _this.layer.close(_this.currentLayerIndex);
                _this.$timeout(function () {
                    _this.getTableList();
                    _this.getTreeList();
                }, 1000);
            });
            this.getTreeList();
            var vm = this;
            vm.AreaTreeDataParams = new tree_params_1.TreeDataParams();
            vm.AreaTreeDataParams.treeId = 'areaTreeArea';
            vm.AreaTreeDataParams.isDefaultSelected = true;
            vm.AreaTreeDataParams.onClick = treeSelectNode;
            vm.AreaTreeDataParams.treeInitComplete = treeInitComplete;
            vm.treeSearchInput;
            vm.treeSearchInputFunc = treeSearchInputFunc;
            vm.treeSearchInputKeyUp = treeSearchInputKeyUp;
            vm.cameraParams = new tree_params_1.TreeDataParams();
            vm.params;
            vm.tHeadList = [
                { field: "Name", title: "DP_CONFIG_COMMON_03" },
                { field: "Code", title: "DP_CONFIG_COMMON_04" },
                { field: "Area", title: "DP_CONFIG_COMMON_09" },
                { field: "DeviceNum", title: "DP_CONFIG_LAMP_07" },
                { field: "Latitude", title: "DP_CONFIG_COMMON_13" },
                { field: "Longitude", title: "DP_CONFIG_COMMON_14" },
                { field: "bottoms", title: "DP_CONFIG_COMMON_15" }
            ];
            vm.tBodyList = [];
            vm.isSelectItems = false;
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
            vm.editLamp = editLamp;
            vm.deleteLamp = deleteLamp;
            vm.findListParams = initFindTaskListParams();
            vm.onClickSearch = onClickSearch;
            vm.DevicePopup = DevicePopup;
            function treeSearchInputKeyUp(e) {
                if (e.keyCode === 13) {
                    vm.getTreeList();
                }
            }
            function tableSearchInputKeyUp(e) {
                if (e.keyCode === 13) {
                    vm.tableListParams.areaName = vm.tableSearchInput;
                    vm.tableListParams.currentPage = 1;
                    vm.getTableList();
                }
            }
            function treeSearchInputFunc() {
                vm.getTreeList();
            }
            function tableSearchInputFunc() {
                vm.tableListParams.areaName = vm.tableSearchInput;
                vm.tableListParams.currentPage = 1;
                vm.getTableList();
            }
            function editLamp(area, lamp) {
                var _this = this;
                this.getAllLampRalation(lamp.ID).then(function () {
                    var scope = $scope.$new();
                    scope.curdType = 'edit';
                    scope.currentArea = area;
                    scope.currentLamp = lamp;
                    scope.treeDatas = vm.AreaTreeDataParams.treeDatas;
                    console.log(_this.allLampDeviceRalation);
                    scope.getAllLampAboutDevice = _this.allLampDeviceRalation;
                    vm.currentLayerIndex = layer.open({
                        type: 1,
                        content: lampPopup,
                        scope: scope,
                        skin: "no-scroll",
                        title: i18nFactory('DP_CONFIG_LAMP_08'),
                        area: ["650px", "520px"],
                        end: function () {
                            scope.$destroy();
                        }
                    });
                });
            }
            function deleteLamp(lamp) {
                layer.confirm(i18nFactory('DP_CONFIG_LAMP_11'), {
                    icon: 0,
                    title: i18nFactory('DP_CONFIG_COMMON_42'),
                    lamp: ["500px", "200px"]
                }, function (index) {
                    layer.close(index);
                    submitDeleteLamp(lamp);
                });
            }
            function submitDeleteLamp(lamp) {
                lampService.deleteById(lamp).then(complete);
                function complete(res) {
                    if (res.code === 200) {
                        vm.tableListParams.currentPage = 1;
                        $timeout(function () {
                            vm.getTreeList();
                            vm.getTableList();
                        }, 1000);
                    }
                }
            }
            function treeInitComplete(treeId) {
            }
            function treeSelectNode(event, treeId, treeNode) {
                vm.AreaTreeDataParams.defaultSelectTreeId = treeNode.ID;
                vm.tableListParams.currentPage = 1;
                vm.tableListParams.parentId = treeNode.ID;
                vm.getTableList();
                $timeout(function () {
                    vm.currentArea = treeNode;
                });
            }
            function DevicePopup(lamp) {
                console.log(lamp);
                if (!lamp.JsonUserData.DiviceCount || lamp.JsonUserData.DiviceCount == 0) {
                    return;
                }
                var scope = $scope.$new();
                scope.getAllLampAboutDevice = lamp.JsonUserData.Divices;
                console.log(scope.getAllLampAboutDevice);
                scope.currentLamp = lamp;
                this.currentLayerIndex = layer.open({
                    type: 1,
                    content: deviceHtml,
                    offset: '80px',
                    scope: scope,
                    skin: "no-scroll",
                    title: "关联设备",
                    area: "650px",
                    end: function () {
                        scope.$destroy();
                    }
                });
            }
            function changePage(num) {
                vm.tableListParams.currentPage = num;
                vm.getTableList();
            }
            function changePageSize(num) {
                vm.tableListParams.currentPage = 1;
                vm.tableListParams.pageSize = num;
                vm.getTableList();
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
                    layer.msg(i18nFactory("DP_CONFIG_COMMON_84"));
                    return;
                }
                var ids = [];
                selectedDataList.forEach(function (_data) {
                    ids.push(_data.ID);
                });
                var showText = i18nFactory('DP_CONFIG_LAMP_12', { value: ids.length });
                layer.confirm(showText, {
                    icon: 0,
                    title: i18nFactory('DP_CONFIG_COMMON_42'),
                    lamp: ["500px", "200px"]
                }, function (index) {
                    layer.close(index);
                    submitDeleteByIds(ids);
                });
            }
            function submitDeleteByIds(ids) {
                console.log("多个删除");
                lampService.deleteByIds(ids).then(function (resp) {
                    if (resp.code == 200) {
                        vm.tableListParams.currentPage = 1;
                        $timeout(function () {
                            vm.getTreeList();
                            vm.getTableList();
                        }, 1000);
                    }
                });
            }
            function sortByField(index, fieldName, sortStatus) {
                vm.tableListParams.isAsc = sortStatus;
                vm.tableListParams.sortName = fieldName;
                vm.getTableList();
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
            function onClickSearch() {
                if (vm.findListParams.areaId) {
                    if (vm.findListParams.startTime && vm.findListParams.endTime) {
                        if (vm.findListParams.startTime > vm.findListParams.endTime) {
                            layer.msg(i18nFactory("DP_CONFIG_COMMON_85"));
                            return;
                        }
                        else {
                        }
                    }
                    vm.findListParams.currentPage = 1;
                    getListByParams(vm.findListParams);
                }
            }
            ;
            function initFindTaskListParams() {
                var newParams = new TaskConfigParams_1.TaskListParams();
                newParams.areaId = '';
                newParams.type = '';
                newParams.state = '';
                newParams.startTime = null;
                newParams.endTime = null;
                newParams.name = '';
                newParams.currentPage = 1;
                return newParams;
            }
            function getListByParams(params) {
                var _this = this;
                this.taskService.findListByParams(params).then(function (resp) {
                    if (resp && resp.code == 200) {
                        _this.setTaskListToCache(resp.data);
                    }
                    else {
                        _this.setTaskListToCache([]);
                    }
                });
            }
            ;
        }
        BaseConfigLampController.prototype.addLamp = function (area) {
            var scope = this.$scope.$new();
            scope.curdType = 'add';
            scope.currentArea = area;
            scope.treeDatas = this.AreaTreeDataParams.treeDatas;
            this.currentLayerIndex = this.layer.open({
                type: 1,
                scope: scope,
                skin: "no-scroll",
                area: ["650px", "490px"],
                content: lampPopup,
                title: [this.i18nFactory('DP_CONFIG_LAMP_06'), "color:'#F6F8FB';font-size:14px"],
                end: function () {
                    scope.$destroy();
                },
            });
        };
        BaseConfigLampController.prototype._getCasCadeSearchParams = function (tableParams) {
            if (!tableParams)
                return {};
            var result = new casecade_service_1.CasCadeSearchParams();
            result.pageIndex = tableParams.currentPage;
            result.orderField = tableParams.sortName;
            result.pageSize = tableParams.pageSize;
            result.areaId = tableParams.parentId;
            result.isAsc = false;
            result.name = tableParams.areaName;
            return result;
        };
        BaseConfigLampController.prototype.getTableList = function () {
            var that = this;
            this.casCadeService.findLampList(this._getCasCadeSearchParams(this.tableListParams)).then(complete);
            function complete(result) {
                console.log('立杆列表++++++++++++++++');
                console.log(result);
                if (result.code === 200) {
                    that.$timeout(function () {
                        var pageParams = new page_params_1.default();
                        pageParams.pageSize = that.tableListParams.pageSize;
                        pageParams.currentPage = that.tableListParams.currentPage;
                        pageParams.totalCount = result.count;
                        that.tBodyList = result.data || [];
                        that.pageParams = pageParams;
                        that.tableDatas = result.data;
                        if (that.tBodyList && that.tBodyList.length > 0) {
                            that.tableNoData = false;
                        }
                        else {
                            that.tableNoData = true;
                        }
                    });
                }
                else {
                    that.$timeout(function () {
                        that.tableNoData = true;
                    });
                }
            }
        };
        BaseConfigLampController.prototype.getAllLampRalation = function (id) {
            var _this = this;
            return this.lampService.findLampDeviceRelationById(id).then(function (res) {
                _this.allLampDeviceRalation = res.data;
            });
        };
        BaseConfigLampController.prototype.getAllLampAboutDevice = function (id) {
            var allDeviceOnTheLamp = [];
            this.allLampDeviceRalation.forEach(function (relation) {
                if (relation.ObjectId == id) {
                    allDeviceOnTheLamp.push(relation);
                }
            });
            return allDeviceOnTheLamp;
        };
        BaseConfigLampController.prototype.getTreeList = function () {
            var that = this;
            this.areaService.findListTree({ keyword: this.treeSearchInput }).then(complete);
            function complete(result) {
                that.$timeout(function () {
                    that.AreaTreeDataParams.treeDatas = result;
                    if (result && result.length > 0) {
                        that.treeNoData = false;
                    }
                    else {
                        that.treeNoData = true;
                    }
                });
            }
        };
        BaseConfigLampController.$inject = ['$scope',
            '$timeout',
            'lampService',
            'areaService',
            'cameraService',
            'wifiService',
            'rmpgateService',
            'electronicfenceService',
            'layer',
            'casCadeService',
            'i18nFactory',
            'treeDirectiveService'];
        return BaseConfigLampController;
    }());
    main_app_1.app.controller('baseConfigLampController', BaseConfigLampController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9sYW1wL2xhbXAuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBaURBLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQU9wQztRQUE4QixtQ0FBZTtRQUV6QztZQUFBLFlBQ0ksaUJBQU8sU0FLVjtZQUpHLEtBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1lBQ3ZCLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxxQkFBVSxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQzFDLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxxQkFBVSxFQUFFLENBQUMsV0FBVyxDQUFDOztRQUNwRCxDQUFDO1FBQUEsQ0FBQztRQUNOLHNCQUFDO0lBQUQsQ0FUQSxBQVNDLENBVDZCLDRCQUFlLEdBUzVDO0lBR0Q7UUFjSTtZQWJBLGNBQVMsR0FBVSxFQUFFLENBQUM7WUFDdEIsZ0JBQVcsR0FBWSxFQUFFLENBQUM7WUFDMUIsY0FBUyxHQUFVLEVBQUUsQ0FBQztZQUN0QixZQUFPLEdBQVUsRUFBRSxDQUFDO1lBQ3BCLGNBQVMsR0FBWSxFQUFFLENBQUM7WUFDeEIsV0FBTSxHQUFVLElBQUksQ0FBQztZQUNyQixXQUFNLEdBQVUsSUFBSSxDQUFDO1lBQ3JCLGtCQUFhLEdBQVksRUFBRSxDQUFDO1lBQzVCLGtCQUFhLEdBQVksRUFBRSxDQUFDO1lBQzVCLFlBQU8sR0FBWSxFQUFFLENBQUM7WUFDdEIsaUJBQVksR0FBVSxDQUFDLENBQUM7WUFDeEIsYUFBUSxHQUFVLEVBQUUsQ0FBQztZQUNyQixnQkFBVyxHQUFVLENBQUMsQ0FBQztRQUV2QixDQUFDO1FBQ0wsYUFBQztJQUFELENBaEJBLEFBZ0JDLElBQUE7SUFFRDtRQWtGSSxrQ0FBb0IsTUFBVyxFQUNYLFFBQWtCLEVBQ2xCLFdBQXdCLEVBQ3hCLFdB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QUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7b0JBQzVCLENBQUM7b0JBQUEsSUFBSSxDQUFBLENBQUM7d0JBQ0YsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQzNCLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1FBQ0wsQ0FBQztRQWpqQk0sZ0NBQU8sR0FBRyxDQUFDLFFBQVE7WUFDVCxVQUFVO1lBQ1YsYUFBYTtZQUNiLGFBQWE7WUFDYixlQUFlO1lBQ2YsYUFBYTtZQUNiLGdCQUFnQjtZQUNoQix3QkFBd0I7WUFDeEIsT0FBTztZQUNQLGdCQUFnQjtZQUNoQixhQUFhO1lBQ2Isc0JBQXNCLENBQUMsQ0FBQztRQXdpQjdDLCtCQUFDO0tBcGpCRCxBQW9qQkMsSUFBQTtJQUNELGNBQUcsQ0FBQyxVQUFVLENBQUMsMEJBQTBCLEVBQUUsd0JBQXdCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvYmFzZWNvbmZpZy9sYW1wL2xhbXAuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGRlbGwgb24gMjAxNy8zLzIzLlxyXG4gKi9cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuL2xhbXAucG9wdXAuaHRtbFwiIG5hbWU9XCJsYW1wUG9wdXBcIiAvPlxyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4vbGFtcC5kZXZpY2UucG9wdXAuaHRtbFwiIG5hbWU9XCJkZXZpY2VIdG1sXCIgLz5cclxuaW1wb3J0ICcuL2xhbXAucG9wdXAnO1xyXG5pbXBvcnQgJy4vbGFtcC5kZXZpY2UucG9wdXAnO1xyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IFwiY3NzIS4uL2Nzcy9iYXNlY29uZmlnLWxhbXAuY3NzXCI7XHJcbi8v5byV5YWl5pyN5YqhXHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL2xhbXAuc2VydmljZSc7XHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FyZWEuc2VydmljZSc7XHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL2NhbWVyYS5zZXJ2aWNlJ1xyXG5pbXBvcnQgJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9lbGVjdHJvbmljZmVuY2Uuc2VydmljZSdcclxuaW1wb3J0ICcuLi8uLi9jb21tb24vc2VydmljZXMvcm1wZ2F0ZS5zZXJ2aWNlJ1xyXG5pbXBvcnQgJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy93aWZpLnNlcnZpY2UnXHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLmRpcmVjdGl2ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SUxhbXBTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2xhbXAuc2VydmljZVwiO1xyXG5pbXBvcnQge0lBcmVhU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hcmVhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtJQ2FtZXJhU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9jYW1lcmEuc2VydmljZVwiO1xyXG5pbXBvcnQge0lSbXBHYXRlU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9ybXBnYXRlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtJV2lmaVNlcnZpY2V9IGZyb20gXCIuLi8uLi9jb21tb24vc2VydmljZXMvd2lmaS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SUVsZWN0cm9uaWNGZW5jZVNlcnZpY2V9IGZyb20gXCIuLi8uLi9jb21tb24vc2VydmljZXMvZWxlY3Ryb25pY2ZlbmNlLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7SVRyZWVEaXJlY3RpdmVTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUuZGlyZWN0aXZlLnNlcnZpY2VcIjtcclxuaW1wb3J0IFBhZ2VQYXJhbXMgZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvcGFnZS9wYWdlLXBhcmFtc1wiO1xyXG5pbXBvcnQge0lUYWJsZUhlYWRlcn0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdW5pdC10YWJsZS90YWJsZS1wYXJhbXNcIjtcclxuaW1wb3J0IHtJVHJlZURhdGFQYXJhbXMsIFRyZWVEYXRhUGFyYW1zfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUtcGFyYW1zXCI7XHJcbmltcG9ydCB7TGFtcFRhYmxlUGFyYW1zfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvTGFtcFBhcmFtc1wiO1xyXG5pbXBvcnQge0FyZWF9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9BcmVhXCI7XHJcbmltcG9ydCB7QXJlYUV4fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvQXJlYUV4XCI7XHJcbmltcG9ydCB7TGFtcH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L0xhbXBcIjtcclxuaW1wb3J0IHtMYW1wRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9MYW1wRXhcIjtcclxuaW1wb3J0IHtTeXN0ZW1Qb2ludH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L1N5c3RlbVBvaW50XCI7XHJcbi8v6K6+5aSHXHJcbmltcG9ydCB7Q2FtZXJhfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvQ2FtZXJhXCI7XHJcbmltcG9ydCB7Q2FtZXJhRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9DYW1lcmFFeFwiO1xyXG5pbXBvcnQge1JtcEdhdGV9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9SbXBnYXRlXCI7XHJcbmltcG9ydCB7V2lmaX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L1dpZmlcIjtcclxuaW1wb3J0IHtFbGVjdHJvbmljRmVuY2V9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9FbGVjdHJvbmljRmVuY2VcIjtcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUuZGlyZWN0aXZlLnNlcnZpY2VcIjtcclxuaW1wb3J0IFwiLi9sYW1wLnN0b3JlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtJVGFza1N0b3JlU2VydmljZX0gZnJvbSBcIi4vbGFtcC5zdG9yZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7VGFza0xpc3RQYXJhbXN9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9UYXNrQ29uZmlnUGFyYW1zXCI7XHJcbmltcG9ydCB7SUNhc0NhZGVTZXJ2aWNlLCBDYXNDYWRlU2VhcmNoUGFyYW1zfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2Nhc2VjYWRlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtSZWxhdGlvbkNvbCwgUmVsYXRpb259IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9EZXZpY2VSZWxhdGlvblwiO1xyXG5pbXBvcnQge0JhY2tSZXNwb25zZUJvZHksIFJlc3BvbnNlUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcblxyXG5pbXBvcnQgXCJlczYtcHJvbWlzZVwiXHJcbmxldCBQcm9taXNlID0gcmVxdWlyZShcImVzNi1wcm9taXNlXCIpXHJcbmRlY2xhcmUgdmFyIHJlcXVpcmU6YW55O1xyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcbmRlY2xhcmUgbGV0IGxhbXBQb3B1cDogYW55O1xyXG5kZWNsYXJlIHZhciBkZXZpY2VIdG1sOiBhbnk7XHJcbnR5cGUgQXJlYUNhbWVyYUV4ID0gQXJlYUV4ICYgQ2FtZXJhRXg7XHJcblxyXG5jbGFzcyBUYWJsZUxpc3RQYXJhbXMgZXh0ZW5kcyBMYW1wVGFibGVQYXJhbXMgIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc29ydE5hbWUgPSAnQ29kZSc7XHJcbiAgICAgICAgdGhpcy5pc0FzYyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5wYWdlU2l6ZSA9IG5ldyBQYWdlUGFyYW1zKCkucGFnZVNpemU7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IG5ldyBQYWdlUGFyYW1zKCkuY3VycmVudFBhZ2U7XHJcbiAgICB9O1xyXG59XHJcblxyXG4vL+aRhOWDj+acuuWPguaVsFxyXG5jbGFzcyBwYXJPYmoge1xyXG4gICAgaW1hZ2VQYXRoOnN0cmluZyA9ICcnO1xyXG4gICAgYXJyQ2FtZXJhSWQ6c3RyaW5nW10gPSBbXTtcclxuICAgIHN0YXJ0VGltZTpzdHJpbmcgPSAnJztcclxuICAgIGVuZFRpbWU6c3RyaW5nID0gJyc7XHJcbiAgICBhcnJHZW5kZXI6c3RyaW5nW10gPSBbXTtcclxuICAgIG1heEFnZTpudW1iZXIgPSBudWxsO1xyXG4gICAgbWluQWdlOm51bWJlciA9IG51bGw7XHJcbiAgICBhcnJFeWVHbGFzc2VzOm51bWJlcltdID0gW107XHJcbiAgICBhcnJTdW5HbGFzc2VzOm51bWJlcltdID0gW107XHJcbiAgICBhcnJNYXNrOm51bWJlcltdID0gW107XHJcbiAgICBtaW5UaHJlc2hvbGQ6bnVtYmVyID0gMDtcclxuICAgIHBhZ2VTaXplOm51bWJlciA9IDUwO1xyXG4gICAgY3VycmVudFBhZ2U6bnVtYmVyID0gMTtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBCYXNlQ29uZmlnTGFtcENvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsIFxyXG4gICAgICAgICAgICAgICAgICAgICAnJHRpbWVvdXQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAnbGFtcFNlcnZpY2UnLFxyXG4gICAgICAgICAgICAgICAgICAgICAnYXJlYVNlcnZpY2UnLCBcclxuICAgICAgICAgICAgICAgICAgICAgJ2NhbWVyYVNlcnZpY2UnLCBcclxuICAgICAgICAgICAgICAgICAgICAgJ3dpZmlTZXJ2aWNlJywgXHJcbiAgICAgICAgICAgICAgICAgICAgICdybXBnYXRlU2VydmljZScsIFxyXG4gICAgICAgICAgICAgICAgICAgICAnZWxlY3Ryb25pY2ZlbmNlU2VydmljZScsIFxyXG4gICAgICAgICAgICAgICAgICAgICAnbGF5ZXInLCBcclxuICAgICAgICAgICAgICAgICAgICAgJ2Nhc0NhZGVTZXJ2aWNlJyxcclxuICAgICAgICAgICAgICAgICAgICAgJ2kxOG5GYWN0b3J5JyxcclxuICAgICAgICAgICAgICAgICAgICAgJ3RyZWVEaXJlY3RpdmVTZXJ2aWNlJ107XHJcblxyXG4gICAgdHJlZVNlYXJjaElucHV0OiBzdHJpbmc7XHJcbiAgICB0cmVlU2VhcmNoSW5wdXRGdW5jOiBGdW5jdGlvbjtcclxuICAgIHRhYmxlU2VhcmNoSW5wdXQ6IHN0cmluZztcclxuICAgIHRhYmxlU2VhcmNoSW5wdXRGdW5jOiBGdW5jdGlvbjtcclxuXHJcbiAgICBjdXJyZW50QXJlYTogQXJlYTtcclxuICAgIHRhYmxlTGlzdFBhcmFtczogVGFibGVMaXN0UGFyYW1zO1xyXG5cclxuICAgIHBhZ2VQYXJhbXM6IFBhZ2VQYXJhbXM7XHJcblxyXG4gICAgZWRpdExhbXA6IEZ1bmN0aW9uO1xyXG4gICAgZGVsZXRlTGFtcDogRnVuY3Rpb247XHJcbiAgICBjdXJyZW50TGF5ZXJJbmRleDogbnVtYmVyO1xyXG5cclxuICAgIHRhYmxlRGF0YXM6IEFycmF5PGFueT47XHJcbiAgICBkZWZhdWx0U2VsZWN0VHJlZUlkOiBzdHJpbmc7XHJcblxyXG4gICAgdGFibGVTZWFyY2hJbnB1dEtleVVwOiBGdW5jdGlvbjtcclxuICAgIHRyZWVTZWFyY2hJbnB1dEtleVVwOiBGdW5jdGlvbjtcclxuXHJcbiAgICBjaGFuZ2VQYWdlOiBGdW5jdGlvbjtcclxuICAgIGNoYW5nZVBhZ2VTaXplOkZ1bmN0aW9uO1xyXG5cclxuICAgIC8vIHRhYmxlIOWIl+ihqOaVsOaNrlxyXG4gICAgdEhlYWRMaXN0OkFycmF5PElUYWJsZUhlYWRlcj47XHJcbiAgICB0Qm9keUxpc3Q6QXJyYXk8TGFtcEV4PjtcclxuXHJcbiAgICB0YWJsZU5vRGF0YTpib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLy8g6YCJ5oup6KGM5pS/5Yy65Z+f5qCRXHJcbiAgICBBcmVhVHJlZURhdGFQYXJhbXM6SVRyZWVEYXRhUGFyYW1zPEFyZWFFeD47XHJcbiAgICB0cmVlTm9EYXRhOmJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAvLyDmkYTlg4/mnLrmoJFcclxuICAgIGNsZWFyQ29uZGl0aW9uOigpID0+IHZvaWQ7XHJcbiAgICBjYWNoZVNlbENhbWVyYTpBcnJheTx7W2tleTpzdHJpbmddOmFueX0+ID0gW107XHJcbiAgICBjYW1lcmFQYXJhbXM6SVRyZWVEYXRhUGFyYW1zPEFyZWFFeD47XHJcbiAgICBhZ2VSYW5nZTpudW1iZXJbXSA9IFtdO1xyXG4gICAgZ2xhc3NUeXBlOm51bWJlciA9IDA7XHJcbiAgICBwYXJhbXM6YW55O1xyXG4gICAgaXNVcGxvYWRJbWc6Ym9vbGVhbiA9IGZhbHNlO1xyXG4gICAgZnVuQXJyOmFueTtcclxuICAgIERldmljZVBvcHVwOkZ1bmN0aW9uXHJcblxyXG4gICAgLy8g5aSa6YCJ55u45YWzXHJcbiAgICBzZWxlY3RlZExpc3Q6QXJyYXk8Ym9vbGVhbj47XHJcbiAgICBpc1NlbGVjdEFsbDpib29sZWFuO1xyXG4gICAgYWZ0ZXJDaGFuZ2VDaGVjazpGdW5jdGlvbjtcclxuICAgIGRlbGV0ZUJ5SWRzOkZ1bmN0aW9uO1xyXG5cclxuICAgIC8vIOaOkuW6j+Wbnuiwg1xyXG4gICAgc29ydEJ5RmllbGQ6RnVuY3Rpb247XHJcbiAgICBpc1NlbGVjdEl0ZW1zOmJvb2xlYW47XHJcblxyXG4gICAgLy8g5p2h5Lu25p+l6K+iXHJcbiAgICBmaW5kTGlzdFBhcmFtczpUYXNrTGlzdFBhcmFtcztcclxuXHJcbiAgICBvbkNsaWNrU2VhcmNoOkZ1bmN0aW9uO1xyXG4gICAgLy8gYWJvdXREZXZpY2U6IEFycmF5PHt2YWx1ZTpzdHJpbmcsIHRleHQ6c3RyaW5nfT47XHJcbiAgICBhbGxMYW1wRGV2aWNlUmFsYXRpb246IEFycmF5PFJlbGF0aW9uPlxyXG5cclxuICAgIC8vIOiuvuWkh1xyXG4gICAgLy8gQWxsQ2FtZXJhOkFycmF5PENhbWVyYT47XHJcbiAgICAvLyBBbGxXaWZpOkFycmF5PFdpZmk+O1xyXG4gICAgLy8gQWxsUm1wZ2F0ZTpBcnJheTxSbXBHYXRlPjsgXHJcbiAgICAvLyBBbGxFbGVjdHJvbmljRmVuY2U6QXJyYXk8RWxlY3Ryb25pY0ZlbmNlPjtcclxuICAgIFN5c3RlbVBvaW50TGlzdDpBcnJheTxTeXN0ZW1Qb2ludD47XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSwgXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBGdW5jdGlvbixcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbGFtcFNlcnZpY2U6SUxhbXBTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBhcmVhU2VydmljZTogSUFyZWFTZXJ2aWNlLCBcclxuXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNhbWVyYVNlcnZpY2U6SUNhbWVyYVNlcnZpY2UsIFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB3aWZpU2VydmljZTpJV2lmaVNlcnZpY2UsIFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBybXBnYXRlU2VydmljZTpJUm1wR2F0ZVNlcnZpY2UsIFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBlbGVjdHJvbmljZmVuY2VTZXJ2aWNlOklFbGVjdHJvbmljRmVuY2VTZXJ2aWNlLCBcclxuXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGxheWVyOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNhc0NhZGVTZXJ2aWNlOiBJQ2FzQ2FkZVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGkxOG5GYWN0b3J5OiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHRyZWVTZXJ2aWNlOklUcmVlRGlyZWN0aXZlU2VydmljZVxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgLy8g5by55Ye65qGG55u45YWzXHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJG9uKFwibGFtcC5jbG9zZVBvcHVwXCIsIChldmVudDogYW55LCBpc1JlZnJlc2g/OiBib29sZWFuKSA9PntcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZSh0aGlzLmN1cnJlbnRMYXllckluZGV4KTtcclxuICAgICAgICAgICAgaWYgKGlzUmVmcmVzaCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGFibGVMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUcmVlTGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgfSwxMDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRvbihcImxhbXBEZXZpY2UuY2xvc2VQb3B1cFwiLCAoZXZlbnQ6IGFueSwgaXNSZWZyZXNoPzogYm9vbGVhbikgPT57XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIuY2xvc2UodGhpcy5jdXJyZW50TGF5ZXJJbmRleCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUYWJsZUxpc3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRyZWVMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICB9LDEwMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZ2V0VHJlZUxpc3QoKTtcclxuICAgICAgICAvLyDmoIfnrb50ZXh0XHJcbiAgICAgICAgbGV0IHZtID0gdGhpcztcclxuICAgICAgICAvLyDmoJHliJfooajmlbDmja5cclxuICAgICAgICAvLyDliJ3lp4vljJYgYXJlYSDmoJHmlbDmja5cclxuICAgICAgICB2bS5BcmVhVHJlZURhdGFQYXJhbXMgPSBuZXcgVHJlZURhdGFQYXJhbXM8QXJlYUV4PigpO1xyXG4gICAgICAgIHZtLkFyZWFUcmVlRGF0YVBhcmFtcy50cmVlSWQgPSAnYXJlYVRyZWVBcmVhJztcclxuICAgICAgICB2bS5BcmVhVHJlZURhdGFQYXJhbXMuaXNEZWZhdWx0U2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHZtLkFyZWFUcmVlRGF0YVBhcmFtcy5vbkNsaWNrID0gdHJlZVNlbGVjdE5vZGU7XHJcbiAgICAgICAgdm0uQXJlYVRyZWVEYXRhUGFyYW1zLnRyZWVJbml0Q29tcGxldGUgPSB0cmVlSW5pdENvbXBsZXRlO1xyXG5cclxuICAgICAgICAvLyDmoJHliJfooajmlbDmja5cclxuICAgICAgICB2bS50cmVlU2VhcmNoSW5wdXQ7XHJcbiAgICAgICAgdm0udHJlZVNlYXJjaElucHV0RnVuYyA9IHRyZWVTZWFyY2hJbnB1dEZ1bmM7XHJcbiAgICAgICAgdm0udHJlZVNlYXJjaElucHV0S2V5VXAgPSB0cmVlU2VhcmNoSW5wdXRLZXlVcDtcclxuXHJcbiAgICAgICAgLy8g5pGE5YOP5py65qCRXHJcbiAgICAgICAgdm0uY2FtZXJhUGFyYW1zID0gbmV3IFRyZWVEYXRhUGFyYW1zPEFyZWFFeD4oKTtcclxuICAgICAgICB2bS5wYXJhbXM7XHJcblxyXG4gICAgICAgIC8vIOihqOagvOaVsOaNrlxyXG4gICAgICAgIHZtLnRIZWFkTGlzdCA9ICBbXHJcbiAgICAgICAgICAgIHsgZmllbGQ6IFwiTmFtZVwiLCB0aXRsZTogXCJEUF9DT05GSUdfQ09NTU9OXzAzXCJ9LFxyXG4gICAgICAgICAgICB7IGZpZWxkOiBcIkNvZGVcIiwgdGl0bGU6IFwiRFBfQ09ORklHX0NPTU1PTl8wNFwifSxcclxuICAgICAgICAgICAgeyBmaWVsZDogXCJBcmVhXCIsIHRpdGxlOiBcIkRQX0NPTkZJR19DT01NT05fMDlcIn0sXHJcbiAgICAgICAgICAgIHsgZmllbGQ6IFwiRGV2aWNlTnVtXCIsIHRpdGxlOiBcIkRQX0NPTkZJR19MQU1QXzA3XCJ9LFxyXG4gICAgICAgICAgICB7IGZpZWxkOiBcIkxhdGl0dWRlXCIsIHRpdGxlOiBcIkRQX0NPTkZJR19DT01NT05fMTNcIn0sXHJcbiAgICAgICAgICAgIHsgZmllbGQ6IFwiTG9uZ2l0dWRlXCIsIHRpdGxlOiBcIkRQX0NPTkZJR19DT01NT05fMTRcIn0sXHJcbiAgICAgICAgICAgIHsgZmllbGQ6IFwiYm90dG9tc1wiLCB0aXRsZTogXCJEUF9DT05GSUdfQ09NTU9OXzE1XCJ9XHJcbiAgICAgICAgXTtcclxuICAgICAgICB2bS50Qm9keUxpc3QgPSBbXTtcclxuICAgICAgICAvLyDorr7lpIfkuIvmi4lcclxuICAgICAgICAvLyB2bS5hYm91dERldmljZSA9IFtdXHJcblxyXG4gICAgICAgIHZtLmlzU2VsZWN0SXRlbXMgPSBmYWxzZTtcclxuICAgICAgICB2bS5wYWdlUGFyYW1zO1xyXG4gICAgICAgIHZtLmN1cnJlbnRBcmVhID0ge30gYXMgQXJlYTtcclxuICAgICAgICB2bS50YWJsZUxpc3RQYXJhbXMgPSBuZXcgVGFibGVMaXN0UGFyYW1zKCk7XHJcblxyXG4gICAgICAgIC8v6L+95Yqg5o6S5bqP5Y+C5pWwXHJcbiAgICAgICAgdm0udGFibGVMaXN0UGFyYW1zLnNvcnROYW1lID0gJ0NvZGUnO1xyXG4gICAgICAgIHZtLnRhYmxlTGlzdFBhcmFtcy5pc0FzYyA9IHRydWU7XHJcbiAgICAgICAgdm0uc29ydEJ5RmllbGQgPSBzb3J0QnlGaWVsZDtcclxuXHJcbiAgICAgICAgdm0udGFibGVTZWFyY2hJbnB1dDtcclxuICAgICAgICB2bS50YWJsZVNlYXJjaElucHV0RnVuYyA9IHRhYmxlU2VhcmNoSW5wdXRGdW5jO1xyXG4gICAgICAgIHZtLnRhYmxlU2VhcmNoSW5wdXRLZXlVcCA9IHRhYmxlU2VhcmNoSW5wdXRLZXlVcDtcclxuXHJcbiAgICAgICAgLy8g5YiG6aG15o6n5Lu2XHJcbiAgICAgICAgdm0uY2hhbmdlUGFnZSA9IGNoYW5nZVBhZ2U7XHJcbiAgICAgICAgdm0uY2hhbmdlUGFnZVNpemUgPWNoYW5nZVBhZ2VTaXplO1xyXG5cclxuICAgICAgICAvLyDlpJrpgInnm7jlhbNcclxuICAgICAgICB2bS5zZWxlY3RlZExpc3QgPSBbXTtcclxuICAgICAgICB2bS5pc1NlbGVjdEFsbCA9IGZhbHNlO1xyXG4gICAgICAgIHZtLmFmdGVyQ2hhbmdlQ2hlY2sgPSBhZnRlckNoYW5nZUNoZWNrO1xyXG4gICAgICAgIHZtLmRlbGV0ZUJ5SWRzID0gZGVsZXRlQnlJZHM7XHJcblxyXG4gICAgICAgIC8vIOS/oeaBr+adoeaVsOaNrlxyXG4gICAgICAgIHZtLmVkaXRMYW1wID0gZWRpdExhbXA7XHJcbiAgICAgICAgdm0uZGVsZXRlTGFtcCA9IGRlbGV0ZUxhbXA7XHJcblxyXG4gICAgICAgIC8vIOadoeS7tuafpeivolxyXG4gICAgICAgIHZtLmZpbmRMaXN0UGFyYW1zID0gaW5pdEZpbmRUYXNrTGlzdFBhcmFtcygpO1xyXG4gICAgICAgIHZtLm9uQ2xpY2tTZWFyY2ggPSBvbkNsaWNrU2VhcmNoO1xyXG5cclxuICAgICAgICAvLyDlvLnlh7rmoYbnm7jlhbNcclxuICAgICAgICB2bS5EZXZpY2VQb3B1cCA9IERldmljZVBvcHVwO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB0cmVlU2VhcmNoSW5wdXRLZXlVcChlOiBhbnkpIHtcclxuICAgICAgICAgICAgaWYoZS5rZXlDb2RlID09PSAxMyl7XHJcbiAgICAgICAgICAgICAgICB2bS5nZXRUcmVlTGlzdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB0YWJsZVNlYXJjaElucHV0S2V5VXAoZTogYW55KSB7XHJcbiAgICAgICAgICAgIGlmKGUua2V5Q29kZSA9PT0gMTMpe1xyXG4gICAgICAgICAgICAgICAgdm0udGFibGVMaXN0UGFyYW1zLmFyZWFOYW1lID0gdm0udGFibGVTZWFyY2hJbnB1dDtcclxuICAgICAgICAgICAgICAgIHZtLnRhYmxlTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICB2bS5nZXRUYWJsZUxpc3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdHJlZVNlYXJjaElucHV0RnVuYygpIHtcclxuICAgICAgICAgICAgdm0uZ2V0VHJlZUxpc3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRhYmxlU2VhcmNoSW5wdXRGdW5jKCkge1xyXG4gICAgICAgICAgICB2bS50YWJsZUxpc3RQYXJhbXMuYXJlYU5hbWUgPSB2bS50YWJsZVNlYXJjaElucHV0O1xyXG4gICAgICAgICAgICB2bS50YWJsZUxpc3RQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgICAgICB2bS5nZXRUYWJsZUxpc3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOe8lui+keeBr+adhlxyXG4gICAgICAgIGZ1bmN0aW9uIGVkaXRMYW1wKGFyZWE6QXJlYUV4LCBsYW1wPzpMYW1wRXgpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRBbGxMYW1wUmFsYXRpb24obGFtcC5JRCkudGhlbigoKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IHNjb3BlOntjdXJkVHlwZTogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgIHRyZWVEYXRhczpBcnJheTxBcmVhRXg+LFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRMYW1wOkxhbXBFeCxcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50QXJlYTogQXJlYUV4LFxyXG4gICAgICAgICAgICAgICAgICAgIGdldEFsbExhbXBBYm91dERldmljZTogYW55LFxyXG4gICAgICAgICAgICAgICAgICAgICRkZXN0cm95OiBGdW5jdGlvbn0gPSAkc2NvcGUuJG5ldygpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNjb3BlLmN1cmRUeXBlID0gJ2VkaXQnO1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuY3VycmVudEFyZWEgPSBhcmVhIGFzIEFyZWFFeDtcclxuICAgICAgICAgICAgICAgIHNjb3BlLmN1cnJlbnRMYW1wID0gbGFtcCBhcyBMYW1wRXg7XHJcbiAgICAgICAgICAgICAgICBzY29wZS50cmVlRGF0YXMgPSB2bS5BcmVhVHJlZURhdGFQYXJhbXMudHJlZURhdGFzIGFzIEFycmF5PEFyZWFFeD47XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmFsbExhbXBEZXZpY2VSYWxhdGlvbik7XHJcbiAgICAgICAgICAgICAgICBzY29wZS5nZXRBbGxMYW1wQWJvdXREZXZpY2UgPSB0aGlzLmFsbExhbXBEZXZpY2VSYWxhdGlvbjsgLy8g5b6X5Yiw56uL5p2G55u45YWz6K6+5aSH5YWz57O76KGoXHJcblxyXG4gICAgICAgICAgICAgICAgdm0uY3VycmVudExheWVySW5kZXggPSBsYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGxhbXBQb3B1cCxcclxuICAgICAgICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2tpbjogXCJuby1zY3JvbGxcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogaTE4bkZhY3RvcnkoJ0RQX0NPTkZJR19MQU1QXzA4JyksXHJcbiAgICAgICAgICAgICAgICAgICAgYXJlYTpbXCI2NTBweFwiLFwiNTIwcHhcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDliKDpmaTnga/mnYZcclxuICAgICAgICBmdW5jdGlvbiBkZWxldGVMYW1wKGxhbXA6IExhbXApIHtcclxuICAgICAgICAgICAgbGF5ZXIuY29uZmlybShpMThuRmFjdG9yeSgnRFBfQ09ORklHX0xBTVBfMTEnKSwge1xyXG4gICAgICAgICAgICAgICAgaWNvbjogMCxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuRmFjdG9yeSgnRFBfQ09ORklHX0NPTU1PTl80MicpLFxyXG4gICAgICAgICAgICAgICAgbGFtcDpbXCI1MDBweFwiLFwiMjAwcHhcIl1cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgICAgIGxheWVyLmNsb3NlKGluZGV4KTtcclxuICAgICAgICAgICAgICAgIHN1Ym1pdERlbGV0ZUxhbXAobGFtcCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g5o+Q5Lqk54Gv5p2G6KGo5Y2VXHJcbiAgICAgICAgZnVuY3Rpb24gc3VibWl0RGVsZXRlTGFtcChsYW1wOiBMYW1wKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsYW1wU2VydmljZS5kZWxldGVCeUlkKGxhbXApLnRoZW4oY29tcGxldGUpO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gY29tcGxldGUocmVzOiBSZXNwb25zZVJlc3VsdDxzdHJpbmc+KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWIt+aWsOaVtOS4quWIl+ihqFxyXG4gICAgICAgICAgICAgICAgICAgIHZtLnRhYmxlTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uZ2V0VHJlZUxpc3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uZ2V0VGFibGVMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwxMDAwKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB0cmVlSW5pdENvbXBsZXRlKHRyZWVJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDnvJPlrZjpgInkuK3nmoRsYW1w57uT54K5SURcclxuICAgICAgICBmdW5jdGlvbiB0cmVlU2VsZWN0Tm9kZShldmVudDogTW91c2VFdmVudCwgdHJlZUlkOiBzdHJpbmcsIHRyZWVOb2RlOiBBcmVhKSB7XHJcbiAgICAgICAgICAgIHZtLkFyZWFUcmVlRGF0YVBhcmFtcy5kZWZhdWx0U2VsZWN0VHJlZUlkID0gdHJlZU5vZGUuSUQ7XHJcbiAgICAgICAgICAgIHZtLnRhYmxlTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgIHZtLnRhYmxlTGlzdFBhcmFtcy5wYXJlbnRJZCA9IHRyZWVOb2RlLklEO1xyXG4gICAgICAgICAgICB2bS5nZXRUYWJsZUxpc3QoKTtcclxuXHJcbiAgICAgICAgICAgICR0aW1lb3V0KCgpPT4ge1xyXG4gICAgICAgICAgICAgICAgdm0uY3VycmVudEFyZWEgPSB0cmVlTm9kZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDlvLnlh7rorr7lpIfmoYZcclxuICAgICAgICBmdW5jdGlvbiBEZXZpY2VQb3B1cChsYW1wOmFueSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxhbXApO1xyXG4gICAgICAgICAgICBpZighbGFtcC5Kc29uVXNlckRhdGEuRGl2aWNlQ291bnR8fGxhbXAuSnNvblVzZXJEYXRhLkRpdmljZUNvdW50PT0wKXtyZXR1cm59XHJcbiAgICAgICAgICAgIGxldCBzY29wZTp7XHJcbiAgICAgICAgICAgICAgICBnZXRBbGxMYW1wQWJvdXREZXZpY2U6IGFueSxcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRMYW1wOkxhbXBFeCxcclxuICAgICAgICAgICAgICAgIC8vIFN5c3RlbVBvaW50TGlzdDogQXJyYXk8U3lzdGVtUG9pbnQ+LFxyXG4gICAgICAgICAgICAgICAgJGRlc3Ryb3k6IEZ1bmN0aW9ufSA9ICRzY29wZS4kbmV3KCk7XHJcblxyXG4gICAgICAgICAgICBzY29wZS5nZXRBbGxMYW1wQWJvdXREZXZpY2UgPSBsYW1wLkpzb25Vc2VyRGF0YS5EaXZpY2VzOyAvLyDlvpfliLDnq4vmnYbnm7jlhbPorr7lpIflhbPns7vooahcclxuICAgICAgICAgICAgY29uc29sZS5sb2coc2NvcGUuZ2V0QWxsTGFtcEFib3V0RGV2aWNlKVxyXG4gICAgICAgICAgICAvLyBzY29wZS5TeXN0ZW1Qb2ludExpc3QgPSB0aGlzLlN5c3RlbVBvaW50TGlzdDtcclxuICAgICAgICAgICAgc2NvcGUuY3VycmVudExhbXAgPSBsYW1wIGFzIExhbXBFeDtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRMYXllckluZGV4ID0gbGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogZGV2aWNlSHRtbCxcclxuICAgICAgICAgICAgICAgIG9mZnNldDogJzgwcHgnLFxyXG4gICAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICAgICAgc2tpbjogXCJuby1zY3JvbGxcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIuWFs+iBlOiuvuWkh1wiLFxyXG4gICAgICAgICAgICAgICAgYXJlYTogXCI2NTBweFwiLFxyXG4gICAgICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNoYW5nZVBhZ2UobnVtOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdm0udGFibGVMaXN0UGFyYW1zLmN1cnJlbnRQYWdlID0gbnVtO1xyXG4gICAgICAgICAgICB2bS5nZXRUYWJsZUxpc3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNoYW5nZVBhZ2VTaXplKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHZtLnRhYmxlTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgIHZtLnRhYmxlTGlzdFBhcmFtcy5wYWdlU2l6ZSA9IG51bTtcclxuICAgICAgICAgICAgdm0uZ2V0VGFibGVMaXN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDmiZPpkqkg6YCJ5oupIOWbnuiwg1xyXG4gICAgICAgIGZ1bmN0aW9uIGFmdGVyQ2hhbmdlQ2hlY2socmVzdWx0TGlzdDogQXJyYXk8Ym9vbGVhbj4sIGlzQ2hlY2tBbGw6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICAgICAgc2V0SXNTZWxlY3RJdGVtcyhyZXN1bHRMaXN0KTtcclxuICAgICAgICAgICAgdm0uc2VsZWN0ZWRMaXN0ID0gcmVzdWx0TGlzdDtcclxuICAgICAgICAgICAgdm0uaXNTZWxlY3RBbGwgPSBpc0NoZWNrQWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/ojrflj5blvZPliY3lt7LooqvpgInkuK3liJfooahcclxuICAgICAgICBmdW5jdGlvbiBnZXRTZWxlY3RlZExpc3QoKTogQXJyYXk8TGFtcEV4PiB7XHJcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZERhdGFMaXN0OiBBcnJheTxMYW1wRXg+ID0gW107XHJcbiAgICAgICAgICAgIGlmICh2bS5zZWxlY3RlZExpc3QpIHtcclxuICAgICAgICAgICAgICAgIHZtLnRCb2R5TGlzdC5mb3JFYWNoKChfZGF0YTogTGFtcEV4LCBfaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2bS5zZWxlY3RlZExpc3RbX2luZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZERhdGFMaXN0LnB1c2goX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZERhdGFMaXN0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/lpJrkuKrliKDpmaRcclxuICAgICAgICBmdW5jdGlvbiBkZWxldGVCeUlkcygpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGVjdGVkRGF0YUxpc3Q6IEFycmF5PExhbXBFeD4gPSBnZXRTZWxlY3RlZExpc3QoKTtcclxuICAgICAgICAgICAgaWYgKCFzZWxlY3RlZERhdGFMaXN0IHx8IHNlbGVjdGVkRGF0YUxpc3QubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIGxheWVyLm1zZyhpMThuRmFjdG9yeShcIkRQX0NPTkZJR19DT01NT05fODRcIikpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBpZHM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIHNlbGVjdGVkRGF0YUxpc3QuZm9yRWFjaCgoX2RhdGE6IExhbXBFeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWRzLnB1c2goX2RhdGEuSUQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbGV0IHNob3dUZXh0ID0gaTE4bkZhY3RvcnkoJ0RQX0NPTkZJR19MQU1QXzEyJyx7dmFsdWU6IGlkcy5sZW5ndGh9KTtcclxuICAgICAgICAgICAgbGF5ZXIuY29uZmlybShzaG93VGV4dCwge1xyXG4gICAgICAgICAgICAgICAgaWNvbjogMCxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBpMThuRmFjdG9yeSgnRFBfQ09ORklHX0NPTU1PTl80MicpLFxyXG4gICAgICAgICAgICAgICAgbGFtcDogW1wiNTAwcHhcIiwgXCIyMDBweFwiXVxyXG4gICAgICAgICAgICB9LCAoaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGF5ZXIuY2xvc2UoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgc3VibWl0RGVsZXRlQnlJZHMoaWRzKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/mj5DkuqTliKDpmaRcclxuICAgICAgICBmdW5jdGlvbiBzdWJtaXREZWxldGVCeUlkcyhpZHM6IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLlpJrkuKrliKDpmaRcIik7XHJcbiAgICAgICAgICAgIGxhbXBTZXJ2aWNlLmRlbGV0ZUJ5SWRzKGlkcykudGhlbigocmVzcDogUmVzcG9uc2VSZXN1bHQ8c3RyaW5nPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3AuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICB2bS50YWJsZUxpc3RQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmdldFRyZWVMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmdldFRhYmxlTGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sMTAwMClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOaOkuW6j1xyXG4gICAgICAgIGZ1bmN0aW9uIHNvcnRCeUZpZWxkKGluZGV4Om51bWJlcixmaWVsZE5hbWU6c3RyaW5nLHNvcnRTdGF0dXM6Ym9vbGVhbil7XHJcbiAgICAgICAgICAgIHZtLnRhYmxlTGlzdFBhcmFtcy5pc0FzYyA9IHNvcnRTdGF0dXM7XHJcbiAgICAgICAgICAgIHZtLnRhYmxlTGlzdFBhcmFtcy5zb3J0TmFtZSA9IGZpZWxkTmFtZTtcclxuICAgICAgICAgICAgdm0uZ2V0VGFibGVMaXN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBjcmVhdG9yIHd5cjog5Yik5pat5ZKM6K6+572u5b2T5YmN5YiX6KGo5piv5ZCm5pyJ6YCJ5Lit55qE5YWD57SgXHJcbiAgICAgICAgICogQHBhcmFtIGl0ZW1zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0SXNTZWxlY3RJdGVtcyhpdGVtczogQXJyYXk8Ym9vbGVhbj4pe1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgbGV0IGksbGVuO1xyXG4gICAgICAgICAgICAgICAgZm9yKGk9MCxsZW49aXRlbXMubGVuZ3RoO2k8bGVuO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaXRlbXNbaV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodm0uaXNTZWxlY3RJdGVtcyAhPT0gcmVzdWx0KXtcclxuICAgICAgICAgICAgICAgIHZtLmlzU2VsZWN0SXRlbXMgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5p2h5Lu25pCc57Si5Lu75Yqh5YiX6KGoXHJcbiAgICAgICAgZnVuY3Rpb24gb25DbGlja1NlYXJjaCgpe1xyXG4gICAgICAgICAgICBpZiAodm0uZmluZExpc3RQYXJhbXMuYXJlYUlkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodm0uZmluZExpc3RQYXJhbXMuc3RhcnRUaW1lICYmIHZtLmZpbmRMaXN0UGFyYW1zLmVuZFRpbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodm0uZmluZExpc3RQYXJhbXMuc3RhcnRUaW1lID4gdm0uZmluZExpc3RQYXJhbXMuZW5kVGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXllci5tc2coaTE4bkZhY3RvcnkoXCJEUF9DT05GSUdfQ09NTU9OXzg1XCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZtLmZpbmRMaXN0UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICAgICAgICAgIGdldExpc3RCeVBhcmFtcyh2bS5maW5kTGlzdFBhcmFtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdEZpbmRUYXNrTGlzdFBhcmFtcygpOlRhc2tMaXN0UGFyYW1ze1xyXG4gICAgICAgICAgICBsZXQgbmV3UGFyYW1zID0gbmV3IFRhc2tMaXN0UGFyYW1zKCk7XHJcbiAgICAgICAgICAgIG5ld1BhcmFtcy5hcmVhSWQgPSAnJztcclxuICAgICAgICAgICAgbmV3UGFyYW1zLnR5cGUgPSAnJztcclxuICAgICAgICAgICAgbmV3UGFyYW1zLnN0YXRlID0gJyc7XHJcbiAgICAgICAgICAgIG5ld1BhcmFtcy5zdGFydFRpbWUgPSBudWxsO1xyXG4gICAgICAgICAgICBuZXdQYXJhbXMuZW5kVGltZSA9IG51bGw7XHJcbiAgICAgICAgICAgIG5ld1BhcmFtcy5uYW1lID0gJyc7XHJcbiAgICAgICAgICAgIC8vIG5ld1BhcmFtcy5wYWdlU2l6ZSA9ICcnO1xyXG4gICAgICAgICAgICBuZXdQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3UGFyYW1zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g6KGo5qC85YiX6KGo55u45YWzXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0TGlzdEJ5UGFyYW1zKHBhcmFtczpUYXNrTGlzdFBhcmFtcyl7XHJcbiAgICAgICAgICAgIHRoaXMudGFza1NlcnZpY2UuZmluZExpc3RCeVBhcmFtcyhwYXJhbXMpLnRoZW4oKHJlc3A6UmVzcG9uc2VSZXN1bHQ8QXJyYXk8YW55Pj4pPT57XHJcbiAgICAgICAgICAgICAgICBpZihyZXNwICYmIHJlc3AuY29kZSA9PSAyMDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VGFza0xpc3RUb0NhY2hlKHJlc3AuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFRhc2tMaXN0VG9DYWNoZShbXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZExhbXAoYXJlYTogQXJlYUV4KSB7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7Y3VyZFR5cGU6IHN0cmluZyx0cmVlRGF0YXM6QXJyYXk8QXJlYUV4PiwgY3VycmVudEFyZWE6IEFyZWFFeCwgJGRlc3Ryb3k6IEZ1bmN0aW9ufSA9IHRoaXMuJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICBzY29wZS5jdXJkVHlwZSA9ICdhZGQnO1xyXG4gICAgICAgIC8vIOS8oOWFpWFyZWHljLrln59cclxuICAgICAgICBzY29wZS5jdXJyZW50QXJlYSA9IGFyZWEgYXMgQXJlYUV4O1xyXG4gICAgICAgIHNjb3BlLnRyZWVEYXRhcyA9IHRoaXMuQXJlYVRyZWVEYXRhUGFyYW1zLnRyZWVEYXRhcyBhcyBBcnJheTxBcmVhRXg+O1xyXG4gICAgICAgIC8vIOi/memHjOWvuXNjb3Bl6L+b6KGM5LiA5qyh5paw5bu6XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGF5ZXJJbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgc2tpbjogXCJuby1zY3JvbGxcIixcclxuICAgICAgICAgICAgYXJlYTpbXCI2NTBweFwiLFwiNDkwcHhcIl0sXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGxhbXBQb3B1cCxcclxuICAgICAgICAgICAgdGl0bGU6IFt0aGlzLmkxOG5GYWN0b3J5KCdEUF9DT05GSUdfTEFNUF8wNicpLFwiY29sb3I6JyNGNkY4RkInO2ZvbnQtc2l6ZToxNHB4XCJdLFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g56uL5p2G5L+h5oGvXHJcbiAgICBwcml2YXRlIF9nZXRDYXNDYWRlU2VhcmNoUGFyYW1zKHRhYmxlUGFyYW1zOiBUYWJsZUxpc3RQYXJhbXMpe1xyXG4gICAgICAgIGlmKCF0YWJsZVBhcmFtcykgcmV0dXJuIHt9IGFzIENhc0NhZGVTZWFyY2hQYXJhbXM7XHJcblxyXG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgQ2FzQ2FkZVNlYXJjaFBhcmFtcygpO1xyXG4gICAgICAgIHJlc3VsdC5wYWdlSW5kZXggPSB0YWJsZVBhcmFtcy5jdXJyZW50UGFnZTtcclxuICAgICAgICByZXN1bHQub3JkZXJGaWVsZCA9IHRhYmxlUGFyYW1zLnNvcnROYW1lO1xyXG4gICAgICAgIHJlc3VsdC5wYWdlU2l6ZSA9IHRhYmxlUGFyYW1zLnBhZ2VTaXplO1xyXG4gICAgICAgIHJlc3VsdC5hcmVhSWQgPSB0YWJsZVBhcmFtcy5wYXJlbnRJZDtcclxuICAgICAgICByZXN1bHQuaXNBc2MgPSBmYWxzZTtcclxuICAgICAgICByZXN1bHQubmFtZSA9IHRhYmxlUGFyYW1zLmFyZWFOYW1lO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICAvLyDlvpfliLBMYW1wTGlzdOi1i+WAvOe7meihqOWNlVxyXG4gICAgcHJpdmF0ZSBnZXRUYWJsZUxpc3QoKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuY2FzQ2FkZVNlcnZpY2UuZmluZExhbXBMaXN0KHRoaXMuX2dldENhc0NhZGVTZWFyY2hQYXJhbXModGhpcy50YWJsZUxpc3RQYXJhbXMpKS50aGVuKGNvbXBsZXRlKTtcclxuICAgICAgICAvLyB0aGlzLmNhbWVyYVNlcnZpY2UuZmluZEFsbCgpLnRoZW4oKHJlc3VsdDpBcnJheTxDYW1lcmE+KT0+e1xyXG4gICAgICAgIC8vICAgICB0aGlzLkFsbENhbWVyYSA9IHJlc3VsdFxyXG4gICAgICAgIC8vIH0pXHJcbiAgICAgICAgLy8gdGhpcy53aWZpU2VydmljZS5maW5kQWxsKCkudGhlbigocmVzdWx0OkFycmF5PFdpZmk+KT0+e1xyXG4gICAgICAgIC8vICAgICB0aGlzLkFsbFdpZmkgPSByZXN1bHRcclxuICAgICAgICAvLyB9KVxyXG4gICAgICAgIC8vIHRoaXMucm1wZ2F0ZVNlcnZpY2UuZmluZEFsbCgpLnRoZW4oKHJlc3VsdDpBcnJheTxSbXBHYXRlPik9PntcclxuICAgICAgICAvLyAgICAgdGhpcy5BbGxSbXBnYXRlID0gcmVzdWx0XHJcbiAgICAgICAgLy8gfSlcclxuICAgICAgICAvLyB0aGlzLmVsZWN0cm9uaWNmZW5jZVNlcnZpY2UuZmluZEFsbCgpLnRoZW4oKHJlc3VsdDpBcnJheTxFbGVjdHJvbmljRmVuY2U+KT0+e1xyXG4gICAgICAgIC8vICAgICB0aGlzLkFsbEVsZWN0cm9uaWNGZW5jZSA9IHJlc3VsdFxyXG4gICAgICAgIC8vIH0pXHJcbiAgICAgICAgLy8gdGhpcy5sYW1wU2VydmljZS5maW5kU3lzdGVtUG9pbnQoKS50aGVuKChyZXN1bHQ6UmVzcG9uc2VSZXN1bHQ8QXJyYXk8U3lzdGVtUG9pbnQ+Pik9PntcclxuICAgICAgICAvLyAgICAgdGhpcy5TeXN0ZW1Qb2ludExpc3QgPSByZXN1bHQuZGF0YVxyXG4gICAgICAgIC8vIH0pXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNvbXBsZXRlKHJlc3VsdDogYW55KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnq4vmnYbliJfooagrKysrKysrKysrKysrKysrJylcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KVxyXG4gICAgICAgICAgICBpZiAocmVzdWx0LmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC4kdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhZ2VQYXJhbXMgPSBuZXcgUGFnZVBhcmFtcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VQYXJhbXMucGFnZVNpemUgPSB0aGF0LnRhYmxlTGlzdFBhcmFtcy5wYWdlU2l6ZTtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlUGFyYW1zLmN1cnJlbnRQYWdlID0gdGhhdC50YWJsZUxpc3RQYXJhbXMuY3VycmVudFBhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZVBhcmFtcy50b3RhbENvdW50ID0gcmVzdWx0LmNvdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudEJvZHlMaXN0ID0gcmVzdWx0LmRhdGEgfHwgW107XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wYWdlUGFyYW1zID0gcGFnZVBhcmFtcztcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRhYmxlRGF0YXMgPSByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGF0LnRCb2R5TGlzdCAmJiB0aGF0LnRCb2R5TGlzdC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudGFibGVOb0RhdGEgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50YWJsZU5vRGF0YSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LiR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50YWJsZU5vRGF0YSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDojrflj5bnga/mnYbnm7jlhbPnmoTmiYDmnInorr7lpIflhbPns7vooahcclxuICAgIHByaXZhdGUgZ2V0QWxsTGFtcFJhbGF0aW9uKGlkOnN0cmluZyl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGFtcFNlcnZpY2UuZmluZExhbXBEZXZpY2VSZWxhdGlvbkJ5SWQoaWQpLnRoZW4oKHJlczpCYWNrUmVzcG9uc2VCb2R5PEFycmF5PFJlbGF0aW9uPj4pPT57XHJcbiAgICAgICAgICAgIHRoaXMuYWxsTGFtcERldmljZVJhbGF0aW9uID0gcmVzLmRhdGFcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIC8vIOeCueWHu+e8lui+keaXtuaJvuWIsOaJgOacieWSjOe8lui+keeBr+adhuebuOWFs+eahOiuvuWkh0lEXHJcbiAgICBwcml2YXRlIGdldEFsbExhbXBBYm91dERldmljZShpZDogc3RyaW5nKXtcclxuICAgICAgICBsZXQgYWxsRGV2aWNlT25UaGVMYW1wID0gW10gYXMgQXJyYXk8UmVsYXRpb24+XHJcbiAgICAgICAgdGhpcy5hbGxMYW1wRGV2aWNlUmFsYXRpb24uZm9yRWFjaCgocmVsYXRpb246UmVsYXRpb24pPT57XHJcbiAgICAgICAgICAgIGlmKHJlbGF0aW9uLk9iamVjdElkPT1pZCl7XHJcbiAgICAgICAgICAgICAgICBhbGxEZXZpY2VPblRoZUxhbXAucHVzaChyZWxhdGlvbilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBhbGxEZXZpY2VPblRoZUxhbXBcclxuICAgIH1cclxuXHJcbiAgICAvKuiOt+WPluihjOaUv+WMuuWfn+agkSovXHJcbiAgICBwcml2YXRlIGdldFRyZWVMaXN0KCkge1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgICAgIHRoaXMuYXJlYVNlcnZpY2UuZmluZExpc3RUcmVlKHtrZXl3b3JkOiB0aGlzLnRyZWVTZWFyY2hJbnB1dH0pLnRoZW4oY29tcGxldGUpO1xyXG4gICAgICAgIGZ1bmN0aW9uIGNvbXBsZXRlKHJlc3VsdDogQXJyYXk8QXJlYUV4Pikge1xyXG4gICAgICAgICAgICB0aGF0LiR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuQXJlYVRyZWVEYXRhUGFyYW1zLnRyZWVEYXRhcyA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIGlmKHJlc3VsdCAmJiByZXN1bHQubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJlZU5vRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmVlTm9EYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5hcHAuY29udHJvbGxlcignYmFzZUNvbmZpZ0xhbXBDb250cm9sbGVyJywgQmFzZUNvbmZpZ0xhbXBDb250cm9sbGVyKTtcclxuXHJcbiJdfQ==
