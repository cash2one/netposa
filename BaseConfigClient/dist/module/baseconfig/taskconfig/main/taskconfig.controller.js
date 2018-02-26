define(["require", "exports", "../../../common/app/main.app", "../../../common/directive/tree/tree-params", "../../../common/directive/page/page-params", "../../../../core/server/enum/TaskType", "../../../../core/server/TaskModel", "../../../../core/server/enum/TaskStatus", "../../../../core/server/enum/AuditStatus", "./taskList.cache.factory", "./taskCTypeOptions", "./taskCTypeOptions", "css!../../style/task-config.css", "css!../style/policy-linkage.css", "../../../common/filter/app.filter", "../../../common/directive/tree/tree.directive.service", "../../../common/services/task.service", "../../../common/services/area.service", "./taskList.cache.factory", "./../../../common/factory/userinfo.cache.factory"], function (require, exports, main_app_1, tree_params_1, page_params_1, TaskType_1, TaskModel_1, TaskStatus_1, AuditStatus_1, taskList_cache_factory_1, taskCTypeOptions_1, taskCTypeOptions_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CurrentInterface = (function () {
        function CurrentInterface() {
        }
        return CurrentInterface;
    }());
    var TaskController = (function () {
        function TaskController($scope, $timeout, $state, layer, i18nFactory, areaService, taskService, taskListCacheFactory, treeService, userInfoCacheFactory) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.$state = $state;
            this.layer = layer;
            this.i18nFactory = i18nFactory;
            this.areaService = areaService;
            this.taskService = taskService;
            this.taskListCacheFactory = taskListCacheFactory;
            this.treeService = treeService;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.areaTreeSearchInputStr = "";
            this.pageParamsFace = new page_params_1.default();
            this.pageParamsMac = new page_params_1.default();
            this.pageParamsCar = new page_params_1.default();
            this.FaceAreaName = null;
            this.FaceType = TaskType_1.TaskMonitor.FaceMonitor.value;
            this.CarType = TaskType_1.TaskMonitor.CarMonitor.value;
            this.MacType = TaskType_1.TaskMonitor.MacMonitor.value;
            this.CurrentInfo = {
                LibType: this.FaceType,
                Type: null,
                Status: null,
                AuditStatus: null
            };
            this.isNewCar = false;
            this.isNewMac = false;
            this.TaskTypes = new taskList_cache_factory_1.TaskTypes;
            this.isSelectFaceAll = false;
            this.isSelectCarAll = false;
            this.isSelectMacAll = false;
            this.isSelectFaceItems = false;
            this.isSelectCarItems = false;
            this.isSelectMacItems = false;
            this.onClickTaskTypeBtn = function (btnItem) {
                if (btnItem.value === _this.CurrentInfo.LibType) {
                    return false;
                }
                _this.CurrentInfo.Type = '';
                _this.CurrentInfo.Status = '';
                _this.CurrentInfo.AuditStatus = '';
                if (btnItem.value === _this.FaceType) {
                    _this.CurrentInfo.LibType = _this.FaceType;
                    _this.findListFaceParams.name = null;
                    _this.findListFaceParams.runStatus = null;
                    _this.findListFaceParams.auditStatus = null;
                    _this.findListFaceParams.startTime = null;
                    _this.findListFaceParams.endTime = null;
                    _this.getFaceListByParams(_this.findListFaceParams);
                }
                else {
                    _this.CurrentInfo.LibType = btnItem.value;
                    if (btnItem.value === _this.CarType) {
                        _this.taskTypeOptions = taskCTypeOptions_1.CarOptions;
                        _this.findListCarParams.plateNumber = null;
                        _this.findListCarParams.runStatus = null;
                        _this.findListCarParams.auditStatus = null;
                        _this.findListCarParams.listType = null;
                        _this.findListCarParams.startTime = null;
                        _this.findListCarParams.endTime = null;
                        _this.getCarListByParams(_this.findListCarParams);
                    }
                    else {
                        _this.taskTypeOptions = taskCTypeOptions_1.MacOptions;
                        _this.findListMacParams.perceiveData = null;
                        _this.findListMacParams.runStatus = null;
                        _this.findListMacParams.auditStatus = null;
                        _this.findListMacParams.listType = null;
                        _this.findListMacParams.startTime = null;
                        _this.findListMacParams.endTime = null;
                        _this.getMacListByParams(_this.findListMacParams);
                    }
                }
                return true;
            };
            this.taskTypeOptions = taskCTypeOptions_1.CarOptions;
            this.initTableParamsData();
            this.initTypeOptions();
            this.initStatusLib();
            this.findListFaceParams = this.initFindTaskFaceListParams();
            this.findListMacParams = this.initFindTaskMacListParams();
            this.findListCarParams = this.initFindTaskCarListParams();
            this.initAreaTreeParams();
            this.getAreaTreeList();
            this.$scope.$on("taskconfig.mac.closePopup", function (event, isRefresh) {
                event.preventDefault();
                _this.layer.close(_this.currentLayerIndex);
                if (isRefresh) {
                    _this.$timeout(function () {
                        _this.getMacListByParams(_this.findListMacParams);
                    }, 1000);
                }
            });
            this.$scope.$on("taskconfig.car.closePopup", function (event, isRefresh) {
                event.preventDefault();
                _this.layer.close(_this.currentLayerIndex);
                if (isRefresh) {
                    _this.$timeout(function () {
                        _this.getCarListByParams(_this.findListCarParams);
                    }, 1000);
                }
            });
        }
        ;
        TaskController.prototype.initStatusLib = function () {
            var monitorStatus = [];
            var auditStatus = [];
            monitorStatus.push({ value: '', text: '全部' });
            auditStatus.push({ value: '', text: '全部' });
            for (var k in TaskStatus_1.TaskStatus) {
                monitorStatus.push({ value: TaskStatus_1.TaskStatus[k].value, text: TaskStatus_1.TaskStatus[k].text });
            }
            for (var k in AuditStatus_1.AuditStatus) {
                auditStatus.push({ value: AuditStatus_1.AuditStatus[k].value, text: AuditStatus_1.AuditStatus[k].text });
            }
            this.MonitorStatusLib = monitorStatus;
            this.AuditStatusLib = auditStatus;
        };
        TaskController.prototype.initTypeOptions = function () {
            var resultList = [];
            for (var k in TaskType_1.TaskMonitor) {
                resultList.push(TaskType_1.TaskMonitor[k]);
            }
            this.taskTypeBtnList = resultList;
        };
        ;
        TaskController.prototype.targetNewCar = function (event) {
            event.preventDefault();
            this.isNewMac = false;
            this.isNewCar = !this.isNewCar;
        };
        TaskController.prototype.targetNewMac = function (event) {
            event.preventDefault();
            this.isNewCar = false;
            this.isNewMac = !this.isNewMac;
        };
        TaskController.prototype.initTableParamsData = function () {
            this.tBodyListFace = [];
            this.tFaceHeadList = taskCTypeOptions_2.tFaceHeadList;
            this.tCarHeadList = taskCTypeOptions_2.tCarHeadList;
            this.tMacHeadList = taskCTypeOptions_2.tMacHeadList;
            this.CurrentInfo = {
                LibType: this.FaceType,
                Type: '',
                Status: '',
                AuditStatus: ''
            };
        };
        TaskController.prototype.initFindTaskFaceListParams = function () {
            var newParams = new TaskModel_1.TaskSearchParams();
            newParams.areaId = '';
            newParams.runStatus = '';
            newParams.startTime = null;
            newParams.endTime = null;
            newParams.name = '';
            newParams.pageSize = this.pageParamsFace.pageSize;
            newParams.currentPage = 1;
            newParams.userId = this.userInfoCacheFactory.getCurrentUserId();
            return newParams;
        };
        TaskController.prototype.initFindTaskMacListParams = function () {
            var newParams = new TaskModel_1.TaskSearchParams();
            newParams.runStatus = null;
            newParams.startTime = null;
            newParams.endTime = null;
            newParams.pageSize = this.pageParamsMac.pageSize;
            newParams.currentPage = 1;
            newParams.perceiveData = null;
            newParams.listType = null;
            newParams.userId = this.userInfoCacheFactory.getCurrentUserId();
            return newParams;
        };
        TaskController.prototype.initFindTaskCarListParams = function () {
            var newParams = new TaskModel_1.TaskSearchParams();
            newParams.areaId = null;
            newParams.runStatus = null;
            newParams.startTime = null;
            newParams.endTime = null;
            newParams.pageSize = this.pageParamsCar.pageSize;
            newParams.currentPage = 1;
            newParams.plateNumber = null;
            newParams.listType = null;
            newParams.userId = this.userInfoCacheFactory.getCurrentUserId();
            return newParams;
        };
        TaskController.prototype.onClickSearch = function () {
            if (this.CurrentInfo.LibType === this.FaceType) {
                if (this.findListFaceParams.startTime && this.findListFaceParams.endTime) {
                    if (this.findListFaceParams.startTime > this.findListFaceParams.endTime) {
                        this.layer.msg(this.i18nFactory("FDS_01_12_67"));
                        return;
                    }
                }
                this.findListFaceParams.currentPage = 1;
                this.findListFaceParams.runStatus = this.CurrentInfo.Status;
                this.findListFaceParams.auditStatus = this.CurrentInfo.AuditStatus;
                if (!this.CurrentInfo.AuditStatus)
                    this.findListFaceParams.auditStatus = null;
                this.getFaceListByParams(this.findListFaceParams);
            }
            else if (this.CurrentInfo.LibType === this.MacType) {
                this.findListMacParams.currentPage = 1;
                if (this.findListMacParams.startTime && this.findListMacParams.endTime) {
                    if (this.findListMacParams.startTime > this.findListMacParams.endTime) {
                        this.layer.msg(this.i18nFactory("FDS_01_12_67"));
                        return;
                    }
                }
                if (this.CurrentInfo.Type === 'Black')
                    this.findListMacParams.listType = 'BlackList';
                if (this.CurrentInfo.Type === 'White')
                    this.findListMacParams.listType = 'WhiteList';
                this.findListMacParams.runStatus = this.CurrentInfo.Status;
                this.findListMacParams.auditStatus = this.CurrentInfo.AuditStatus;
                if (!this.CurrentInfo.AuditStatus)
                    this.findListMacParams.auditStatus = null;
                this.getMacListByParams(this.findListMacParams);
            }
            else if (this.CurrentInfo.LibType === this.CarType) {
                this.findListCarParams.currentPage = 1;
                if (this.findListCarParams.startTime && this.findListCarParams.endTime) {
                    if (this.findListCarParams.startTime > this.findListCarParams.endTime) {
                        this.layer.msg(this.i18nFactory("FDS_01_12_67"));
                        return;
                    }
                }
                if (!this.CurrentInfo.Type)
                    this.findListCarParams.listType = null;
                else
                    this.findListCarParams.listType = this.CurrentInfo.Type;
                this.findListCarParams.runStatus = this.CurrentInfo.Status;
                this.findListCarParams.auditStatus = this.CurrentInfo.AuditStatus;
                if (!this.CurrentInfo.AuditStatus)
                    this.findListCarParams.auditStatus = null;
                this.getCarListByParams(this.findListCarParams);
            }
        };
        ;
        TaskController.prototype.initAreaTreeParams = function () {
            var _this = this;
            this.areaTreeDatas = new tree_params_1.TreeDataParams();
            this.areaTreeDatas.treeId = 'areaTreeByTaskConfig';
            this.areaTreeDatas.onClick = function (event, treeId, treeNode) {
                _this.findListFaceParams.areaId = treeNode.ID;
                _this.getFaceListByParams(_this.findListFaceParams);
                _this.$timeout(function () {
                    var nowArea = _this.treeService.getNodeByParam(_this.areaTreeDatas.treeId, 'ID', treeNode.ID);
                    _this.FaceAreaName = nowArea.Name;
                });
            };
            this.areaTreeDatas.treeInitComplete = function (treeId) {
                console.log("初始化布控任务列表 地区树", treeId);
            };
        };
        ;
        TaskController.prototype.getAreaTreeList = function (keyword) {
            var _this = this;
            var params = this.areaTreeDatas.reqParams;
            params.keyword = keyword;
            this.areaService.findListTree(params).then(function (resp) {
                _this.areaTreeDatas.finishedNoData = !resp;
                _this.$timeout(function () {
                    _this.areaTreeDatas.treeDatas = resp;
                });
            });
        };
        ;
        TaskController.prototype.areaTreeSearchInputKeyUp = function (e) {
            if (e.keyCode === 13) {
                this.getAreaTreeList(this.areaTreeSearchInputStr);
            }
        };
        ;
        TaskController.prototype.areaTreeSearchInput = function () {
            this.getAreaTreeList(this.areaTreeSearchInputStr);
        };
        ;
        TaskController.prototype.getFaceListByParams = function (params) {
            var _this = this;
            this.taskService.findFaceListByParams(params).then(function (res) {
                var resp = res;
                if (resp && resp.code == 200) {
                    _this.setTaskListToCache(resp.data, _this.TaskTypes.Face.value);
                }
                else {
                    _this.setTaskListToCache([], _this.TaskTypes.Face.value);
                }
            });
        };
        ;
        TaskController.prototype.getMacListByParams = function (params) {
            var _this = this;
            this.taskService.findMacListByParams(params).then(function (res) {
                var resp = res;
                if (resp && resp.code == 200) {
                    _this.setTaskListToCache(resp.data, _this.TaskTypes.Mac.value);
                }
                else {
                    _this.setTaskListToCache([], _this.TaskTypes.Mac.value);
                }
            });
        };
        TaskController.prototype.getCarListByParams = function (params) {
            var _this = this;
            this.taskService.findCarListByParams(params).then(function (res) {
                var resp = res;
                if (resp && resp.code == 200) {
                    _this.setTaskListToCache(resp.data, _this.TaskTypes.Car.value);
                }
                else {
                    _this.setTaskListToCache([], _this.TaskTypes.Car.value);
                }
            });
        };
        TaskController.prototype.goToUpdateTask = function (taskItem) {
            if (this.CurrentInfo.LibType === this.FaceType) {
                this.$state.go('baseconfig.task.newFaceMonitor', {
                    taskId: taskItem.ID,
                    areaId: this.findListFaceParams.areaId
                });
            }
            else if (this.CurrentInfo.LibType === this.MacType) {
                this.$state.go('baseconfig.task.newMacMonitor', {
                    taskId: taskItem.ID,
                    areaId: this.findListFaceParams.areaId
                });
            }
            else if (this.CurrentInfo.LibType === this.CarType) {
                this.$state.go('baseconfig.task.newCarMonitor', {
                    taskId: taskItem.ID,
                    areaId: this.findListFaceParams.areaId
                });
            }
        };
        ;
        TaskController.prototype.goNewMonitor = function () {
            console.log(this.CurrentInfo);
            if (this.CurrentInfo.LibType === this.FaceType) {
                this.$state.go('baseconfig.task.newFaceMonitor', { areaId: this.findListFaceParams.areaId });
            }
            else if (this.CurrentInfo.LibType === this.MacType) {
                this.$state.go('baseconfig.task.newMacMonitor', { areaId: this.findListFaceParams.areaId });
            }
            else if (this.CurrentInfo.LibType === this.CarType) {
                this.$state.go('baseconfig.task.newCarMonitor', { areaId: this.findListFaceParams.areaId });
            }
        };
        ;
        TaskController.prototype.setTaskListToCache = function (dataList, type) {
            if (!dataList) {
                dataList = [];
            }
            if (type === this.TaskTypes.Face.value) {
                this.findFaceByPageParams = new taskList_cache_factory_1.FindCacheByPageParams();
                this.findFaceByPageParams.pageSize = this.pageParamsFace.pageSize;
                this.findFaceByPageParams.currentPage = this.pageParamsFace.currentPage;
                this.taskListCacheFactory.setTaskList(dataList, type);
                this.getListByPage(this.findFaceByPageParams, type);
            }
            else if (type === this.TaskTypes.Mac.value) {
                this.findMacByPageParams = new taskList_cache_factory_1.FindCacheByPageParams();
                this.findMacByPageParams.pageSize = this.pageParamsMac.pageSize;
                this.findMacByPageParams.currentPage = this.pageParamsMac.currentPage;
                this.taskListCacheFactory.setTaskList(dataList, type);
                this.getListByPage(this.findMacByPageParams, type);
            }
            else if (type === this.TaskTypes.Car.value) {
                this.findCarByPageParams = new taskList_cache_factory_1.FindCacheByPageParams();
                this.findCarByPageParams.pageSize = this.pageParamsCar.pageSize;
                this.findCarByPageParams.currentPage = this.pageParamsCar.currentPage;
                this.taskListCacheFactory.setTaskList(dataList, type);
                this.getListByPage(this.findCarByPageParams, type);
            }
        };
        ;
        TaskController.prototype.getListByPage = function (params, type) {
            var cacheList = this.taskListCacheFactory.getListByPage(params, type);
            var pageParams = new page_params_1.default();
            pageParams.currentPage = params.currentPage;
            pageParams.pageSize = params.pageSize;
            pageParams.totalCount = this.taskListCacheFactory.getTaskTotal(type);
            if (type === this.TaskTypes.Face.value) {
                this.tBodyListFace = cacheList;
                this.pageParamsFace = pageParams;
            }
            else if (type === this.TaskTypes.Mac.value) {
                this.tBodyListMac = cacheList;
                this.pageParamsMac = pageParams;
            }
            else if (type === this.TaskTypes.Car.value) {
                this.tBodyListCar = cacheList;
                this.pageParamsCar = pageParams;
            }
        };
        ;
        TaskController.prototype.changeTaskRunStatus = function (taskItem) {
            var _this = this;
            if (taskItem.AuditStatus === 'Verified' && taskItem.Status === 'Stop') {
                var textStr = void 0;
                if (this.CurrentInfo.LibType === this.FaceType) {
                    textStr = "\u60A8\u786E\u5B9A\u542F\u52A8 " + taskItem.Name + "?";
                }
                else if (this.CurrentInfo.LibType === this.CarType) {
                    textStr = "\u60A8\u786E\u5B9A\u542F\u52A8 " + taskItem.PlateNumber + "?";
                }
                else if (this.CurrentInfo.LibType === this.MacType) {
                    textStr = "\u60A8\u786E\u5B9A\u542F\u52A8 " + taskItem.PerceiveData + "?";
                }
                this.layer.confirm(textStr, {
                    icon: 0,
                    title: this.i18nFactory('DP_CONFIG_COMMON_47'),
                    area: ["500px", "200px"]
                }, function (index) {
                    _this.layer.close(index);
                    _this.submitChangeRunStatus([taskItem.ID], true);
                });
            }
            else if (taskItem.Status === 'Run' && taskItem.AuditStatus === 'Verified') {
                var textStr = void 0;
                if (this.CurrentInfo.LibType === this.FaceType) {
                    textStr = "\u60A8\u786E\u5B9A\u505C\u6B62 " + taskItem.Name + "?";
                }
                else if (this.CurrentInfo.LibType === this.CarType) {
                    textStr = "\u60A8\u786E\u5B9A\u505C\u6B62 " + taskItem.PlateNumber + "?";
                }
                else if (this.CurrentInfo.LibType === this.MacType) {
                    textStr = "\u60A8\u786E\u5B9A\u505C\u6B62 " + taskItem.PerceiveData + "?";
                }
                this.layer.confirm(textStr, {
                    icon: 0,
                    title: this.i18nFactory('DP_CONFIG_COMMON_47'),
                    area: ["500px", "200px"]
                }, function (index) {
                    _this.layer.close(index);
                    _this.submitChangeRunStatus([taskItem.ID], false);
                });
            }
            else {
                return;
            }
        };
        ;
        TaskController.prototype.onClickTaskRunStatusBy = function (isStart) {
            var _this = this;
            var textStr = isStart ? "确定开启:" : "确定暂停：";
            var delIds = [];
            var taskItemModels = this.getSelectedList();
            if (this.CurrentInfo.LibType === this.FaceType) {
                angular.forEach(taskItemModels, function (val) {
                    textStr += "<br/>" + val.Name;
                    delIds.push(val.ID);
                });
            }
            else if (this.CurrentInfo.LibType === this.CarType) {
                angular.forEach(taskItemModels, function (val) {
                    textStr += "<br/>" + val.PlateNumber;
                    delIds.push(val.ID);
                });
            }
            else if (this.CurrentInfo.LibType === this.MacType) {
                angular.forEach(taskItemModels, function (val) {
                    textStr += "<br/>" + val.PerceiveData;
                    delIds.push(val.ID);
                });
            }
            this.layer.confirm(textStr, {
                icon: 0,
                title: this.i18nFactory('DP_CONFIG_COMMON_42'),
                area: ["500px", "200px"]
            }, function (index) {
                _this.layer.close(index);
                _this.submitChangeRunStatus(delIds, isStart);
            });
        };
        ;
        TaskController.prototype.submitChangeRunStatus = function (ids, isStart) {
            var _this = this;
            if (ids && ids.length > 0) {
                var idL = ids.join(',');
                if (this.CurrentInfo.LibType === this.FaceType) {
                    this.taskService.updateFaceRunStatus(idL, isStart).then(function (resp) {
                        if (resp && resp.code == 200) {
                            _this.getFaceListByParams(_this.findListFaceParams);
                        }
                        else {
                            console.error(resp);
                        }
                    });
                }
                else if (this.CurrentInfo.LibType === this.CarType) {
                    this.taskService.updateCarRunStatus(idL, isStart).then(function (resp) {
                        if (resp && resp.code == 200) {
                            _this.getCarListByParams(_this.findListCarParams);
                        }
                        else {
                            console.error(resp);
                        }
                    });
                }
                else if (this.CurrentInfo.LibType === this.MacType) {
                    this.taskService.updateMacRunStatus(idL, isStart).then(function (resp) {
                        if (resp && resp.code == 200) {
                            _this.getMacListByParams(_this.findListMacParams);
                        }
                        else {
                            console.error(resp);
                        }
                    });
                }
            }
        };
        ;
        TaskController.prototype.onClickDeleteById = function (TaskModel) {
            var _this = this;
            var textStr;
            if (this.CurrentInfo.LibType === this.FaceType) {
                textStr = "\u786E\u5B9A\u8981\u5220\u9664 " + TaskModel.Name + "?";
            }
            else if (this.CurrentInfo.LibType === this.CarType) {
                textStr = "\u786E\u5B9A\u8981\u5220\u9664 " + TaskModel.PlateNumber + "?";
            }
            else if (this.CurrentInfo.LibType === this.MacType) {
                textStr = "\u786E\u5B9A\u8981\u5220\u9664 " + TaskModel.MacAddress + "?";
            }
            this.layer.confirm(textStr, {
                icon: 0,
                title: this.i18nFactory('DP_CONFIG_COMMON_42'),
                area: ["500px", "200px"]
            }, function (index) {
                _this.layer.close(index);
                _this.submitDeleteByIds([TaskModel.ID]);
            });
        };
        ;
        TaskController.prototype.onClickDeleteByIds = function () {
            var _this = this;
            var textStr = "确定删除：";
            var delIds = [];
            var taskItemModels = this.getSelectedList();
            if (this.CurrentInfo.LibType === this.FaceType) {
                angular.forEach(taskItemModels, function (val) {
                    textStr += "<br/>" + val.Name;
                    delIds.push(val.ID);
                });
            }
            else if (this.CurrentInfo.LibType === this.CarType) {
                angular.forEach(taskItemModels, function (val) {
                    textStr += "<br/>" + val.PlateNumber;
                    delIds.push(val.ID);
                });
            }
            else if (this.CurrentInfo.LibType === this.MacType) {
                angular.forEach(taskItemModels, function (val) {
                    textStr += "<br/>" + val.PerceiveData;
                    delIds.push(val.ID);
                });
            }
            this.layer.confirm(textStr, {
                icon: 0,
                title: this.i18nFactory('DP_CONFIG_COMMON_42'),
                area: ["500px", "200px"]
            }, function (index) {
                _this.layer.close(index);
                _this.submitDeleteByIds(delIds);
            });
        };
        TaskController.prototype.submitDeleteByIds = function (ids) {
            var _this = this;
            if (ids && ids.length > 0) {
                if (this.CurrentInfo.LibType === this.FaceType) {
                    this.taskService.deleteFaceTaskForIDS(ids).then(function (res) {
                        if (res.code === 200) {
                            _this.getFaceListByParams(_this.findListFaceParams);
                        }
                    });
                }
                else if (this.CurrentInfo.LibType === this.CarType) {
                    this.taskService.deleteCarTaskForIDS(ids).then(function (res) {
                        if (res.code === 200) {
                            _this.getCarListByParams(_this.findListCarParams);
                        }
                    });
                }
                else if (this.CurrentInfo.LibType === this.MacType) {
                    this.taskService.deleteMacTaskForIDS(ids).then(function (res) {
                        if (res.code === 200) {
                            _this.getMacListByParams(_this.findListMacParams);
                        }
                    });
                }
            }
        };
        ;
        TaskController.prototype.afterChangeCheck = function (resultList, isCheckAll) {
            this.setIsSelectItems(resultList);
            if (this.CurrentInfo.LibType === this.FaceType) {
                this.selectedFaceList = resultList;
                this.isSelectFaceAll = isCheckAll;
            }
            else if (this.CurrentInfo.LibType === this.CarType) {
                this.selectedCarList = resultList;
                this.isSelectCarAll = isCheckAll;
            }
            else if (this.CurrentInfo.LibType === this.MacType) {
                this.selectedMacList = resultList;
                this.isSelectMacAll = isCheckAll;
            }
        };
        TaskController.prototype.getSelectedList = function () {
            var _this = this;
            var selectedDataList = [];
            if (this.CurrentInfo.LibType === this.FaceType) {
                if (this.selectedFaceList) {
                    angular.forEach(this.tBodyListFace, function (val, index) {
                        if (_this.selectedFaceList[index]) {
                            selectedDataList.push(val);
                        }
                    });
                }
            }
            else if (this.CurrentInfo.LibType === this.CarType) {
                if (this.selectedCarList) {
                    angular.forEach(this.tBodyListCar, function (val, index) {
                        if (_this.selectedCarList[index]) {
                            selectedDataList.push(val);
                        }
                    });
                }
            }
            else if (this.CurrentInfo.LibType === this.MacType) {
                if (this.selectedMacList) {
                    angular.forEach(this.tBodyListMac, function (val, index) {
                        if (_this.selectedMacList[index]) {
                            selectedDataList.push(val);
                        }
                    });
                }
            }
            return selectedDataList;
        };
        TaskController.prototype.changePage = function (num, type) {
            if (type === this.TaskTypes.Face.value) {
                this.findFaceByPageParams.currentPage = num;
                this.getListByPage(this.findFaceByPageParams, type);
            }
            else if (type === this.TaskTypes.Mac.value) {
                this.findMacByPageParams.currentPage = num;
                this.getListByPage(this.findMacByPageParams, type);
            }
            else if (type === this.TaskTypes.Car.value) {
                this.findCarByPageParams.currentPage = num;
                this.getListByPage(this.findCarByPageParams, type);
            }
        };
        TaskController.prototype.changePageSize = function (num, type) {
            if (type === this.TaskTypes.Face.value) {
                this.findFaceByPageParams.pageSize = num;
                this.getListByPage(this.findFaceByPageParams, type);
            }
            else if (type === this.TaskTypes.Mac.value) {
                this.findMacByPageParams.pageSize = num;
                this.getListByPage(this.findMacByPageParams, type);
            }
        };
        TaskController.prototype.setIsSelectItems = function (items) {
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
            if (this.CurrentInfo.LibType === this.FaceType) {
                if (this.isSelectFaceItems !== result) {
                    this.isSelectFaceItems = result;
                }
            }
            else if (this.CurrentInfo.LibType === this.CarType) {
                if (this.isSelectCarItems !== result) {
                    this.isSelectCarItems = result;
                }
            }
            else if (this.CurrentInfo.LibType === this.MacType) {
                if (this.isSelectMacItems !== result) {
                    this.isSelectMacItems = result;
                }
            }
        };
        TaskController.$inject = [
            '$scope',
            '$timeout',
            '$state',
            'layer',
            'i18nFactory',
            'areaService',
            'taskService',
            'taskListCacheFactory',
            'treeDirectiveService',
            'userInfoCacheFactory'
        ];
        return TaskController;
    }());
    main_app_1.app.controller("taskConfigController", TaskController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy90YXNrY29uZmlnL21haW4vdGFza2NvbmZpZy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWtDQTtRQUFBO1FBS0EsQ0FBQztRQUFELHVCQUFDO0lBQUQsQ0FMQSxBQUtDLElBQUE7SUFFRDtRQTZFSSx3QkFBb0IsTUFBVyxFQUNuQixRQUFhLEVBQ2IsTUFBVyxFQUNYLEtBQVUsRUFDVixXQUFxQixFQUNyQixXQUF5QixFQUN6QixXQUF5QixFQUN6QixvQkFBMkMsRUFDM0MsV0FBa0MsRUFDbEMsb0JBQTJDO1lBVHZELGlCQXdDQztZQXhDbUIsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFLO1lBQ2IsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLFVBQUssR0FBTCxLQUFLLENBQUs7WUFDVixnQkFBVyxHQUFYLFdBQVcsQ0FBVTtZQUNyQixnQkFBVyxHQUFYLFdBQVcsQ0FBYztZQUN6QixnQkFBVyxHQUFYLFdBQVcsQ0FBYztZQUN6Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXVCO1lBQzNDLGdCQUFXLEdBQVgsV0FBVyxDQUF1QjtZQUNsQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXVCO1lBdkV2RCwyQkFBc0IsR0FBVyxFQUFFLENBQUM7WUFHcEMsbUJBQWMsR0FBZSxJQUFJLHFCQUFVLEVBQUUsQ0FBQztZQUM5QyxrQkFBYSxHQUFlLElBQUkscUJBQVUsRUFBRSxDQUFDO1lBQzdDLGtCQUFhLEdBQWUsSUFBSSxxQkFBVSxFQUFFLENBQUM7WUFVN0MsaUJBQVksR0FBVyxJQUFJLENBQUM7WUFDNUIsYUFBUSxHQUFXLHNCQUFXLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUNqRCxZQUFPLEdBQVcsc0JBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1lBQy9DLFlBQU8sR0FBVyxzQkFBVyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7WUFDL0Ms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SUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNuQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDO2dCQUNuQyxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7UUFockJNLHNCQUFPLEdBQUc7WUFDYixRQUFRO1lBQ1IsVUFBVTtZQUNWLFFBQVE7WUFDUixPQUFPO1lBQ1AsYUFBYTtZQUNiLGFBQWE7WUFDYixhQUFhO1lBQ2Isc0JBQXNCO1lBQ3RCLHNCQUFzQjtZQUN0QixzQkFBc0I7U0FDekIsQ0FBQztRQXVxQk4scUJBQUM7S0FsdkJELEFBa3ZCQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsRUFBRSxjQUFjLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvYmFzZWNvbmZpZy90YXNrY29uZmlnL21haW4vdGFza2NvbmZpZy5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5pbXBvcnQgXCJjc3MhLi4vLi4vc3R5bGUvdGFzay1jb25maWcuY3NzXCI7XHJcbmltcG9ydCB7IGFwcCB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCBcImNzcyEuLi9zdHlsZS9wb2xpY3ktbGlua2FnZS5jc3NcIjtcclxuaW1wb3J0IFwiLi4vLi4vLi4vY29tbW9uL2ZpbHRlci9hcHAuZmlsdGVyXCI7XHJcbmltcG9ydCB7IElUcmVlRGF0YVBhcmFtcywgVHJlZURhdGFQYXJhbXMgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUtcGFyYW1zXCI7XHJcbmltcG9ydCBcIi4uLy4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLmRpcmVjdGl2ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IElUcmVlRGlyZWN0aXZlU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZGlyZWN0aXZlL3RyZWUvdHJlZS5kaXJlY3RpdmUuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IFwiLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL3Rhc2suc2VydmljZVwiO1xyXG5pbXBvcnQgeyBJVGFza1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL3Rhc2suc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHsgQXJlYUV4IH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0FyZWFFeFwiO1xyXG5pbXBvcnQgeyBJVGFibGVIZWFkZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS91bml0LXRhYmxlL3RhYmxlLXBhcmFtc1wiO1xyXG5pbXBvcnQgXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvYXJlYS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IElBcmVhU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvYXJlYS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFRyZWVQYXJhbXMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9wYXJhbXMvdHJlZS9UcmVlUGFyYW1zXCI7XHJcbmltcG9ydCBQYWdlUGFyYW1zIGZyb20gXCIuLi8uLi8uLi9jb21tb24vZGlyZWN0aXZlL3BhZ2UvcGFnZS1wYXJhbXNcIjtcclxuaW1wb3J0IHsgUmVzcG9uc2VSZXN1bHQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7IEVudW0gfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9lbnVtL0VudW1cIjtcclxuaW1wb3J0IHsgVGFza01vbml0b3IgfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9zZXJ2ZXIvZW51bS9UYXNrVHlwZVwiO1xyXG5pbXBvcnQgeyBUYXNrTW9kZWwsIENhck1vbml0b3IsIE1hY01vbml0b3IsIFRhc2tTZWFyY2hQYXJhbXMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9zZXJ2ZXIvVGFza01vZGVsXCI7XHJcbmltcG9ydCB7IFRhc2tTdGF0dXMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9zZXJ2ZXIvZW51bS9UYXNrU3RhdHVzXCI7XHJcbmltcG9ydCB7IEF1ZGl0U3RhdHVzIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vQXVkaXRTdGF0dXNcIjtcclxuaW1wb3J0IFwiLi90YXNrTGlzdC5jYWNoZS5mYWN0b3J5XCI7XHJcbmltcG9ydCB7IElUYXNrTGlzdENhY2hlRmFjdG9yeSwgRmluZENhY2hlQnlQYWdlUGFyYW1zLCBUYXNrVHlwZXMgfSBmcm9tIFwiLi90YXNrTGlzdC5jYWNoZS5mYWN0b3J5XCI7XHJcbmltcG9ydCB7IElUYXNrT3B0aW9uLCBNYWNPcHRpb25zLCBDYXJPcHRpb25zIH0gZnJvbSAnLi90YXNrQ1R5cGVPcHRpb25zJztcclxuaW1wb3J0IHsgdEZhY2VIZWFkTGlzdCwgdENhckhlYWRMaXN0LCB0TWFjSGVhZExpc3QgfSBmcm9tIFwiLi90YXNrQ1R5cGVPcHRpb25zXCI7XHJcbmltcG9ydCB7IElVc2VySW5mb0NhY2hlRmFjdG9yeSB9IGZyb20gJy4vLi4vLi4vLi4vY29tbW9uL2ZhY3RvcnkvdXNlcmluZm8uY2FjaGUuZmFjdG9yeSc7XHJcbmltcG9ydCAnLi8uLi8uLi8uLi9jb21tb24vZmFjdG9yeS91c2VyaW5mby5jYWNoZS5mYWN0b3J5JztcclxuZGVjbGFyZSBsZXQgd2luZG93OiBhbnk7XHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueTtcclxuXHJcbmNsYXNzIEN1cnJlbnRJbnRlcmZhY2Uge1xyXG4gICAgTGliVHlwZTogc3RyaW5nO1xyXG4gICAgVHlwZTogc3RyaW5nO1xyXG4gICAgU3RhdHVzOiBzdHJpbmc7XHJcbiAgICBBdWRpdFN0YXR1czogc3RyaW5nXHJcbn1cclxuXHJcbmNsYXNzIFRhc2tDb250cm9sbGVyIHtcclxuICAgIC8v5b2T5YmN5piv5ZCm5oul5pyJIOWuoeaguOadg+mZkFxyXG4gICAgLypUT0RPIOadg+mZkOebuOWFs2tleSDmnprkuL7mnKrlrpoqL1xyXG4gICAgdGFza1R5cGVPcHRpb25zOiBBcnJheTxJVGFza09wdGlvbj47XHJcbiAgICBjdXJyZW50VXNlcklkOiBzdHJpbmc7XHJcbiAgICB0YXNrVHlwZUJ0bkxpc3Q6IEFycmF5PEVudW0+O1xyXG5cclxuXHJcbiAgICBNb25pdG9yU3RhdHVzTGliOiBBcnJheTxFbnVtPjtcclxuXHJcbiAgICBBdWRpdFN0YXR1c0xpYjogQXJyYXk8RW51bT47XHJcblxyXG4gICAgbW9kdWxlTmFtZTogc3RyaW5nO1xyXG4gICAgLy8g6YCJ5oup6KGM5pS/5Yy65Z+f5qCRXHJcbiAgICBhcmVhVHJlZURhdGFzOiBJVHJlZURhdGFQYXJhbXM8QXJlYUV4PjtcclxuICAgIGFyZWFUcmVlU2VhcmNoSW5wdXRTdHI6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAvKlRPRE8g5o6l5Y+j5pqC5pegIOaPkOS+m+WIhumhteWKn+iDvSovXHJcbiAgICAvLy0tLS0tLWRpcmVjdGl2ZSBwYWdlcyBwYXJhbXNcclxuICAgIHBhZ2VQYXJhbXNGYWNlOiBQYWdlUGFyYW1zID0gbmV3IFBhZ2VQYXJhbXMoKTtcclxuICAgIHBhZ2VQYXJhbXNNYWM6IFBhZ2VQYXJhbXMgPSBuZXcgUGFnZVBhcmFtcygpO1xyXG4gICAgcGFnZVBhcmFtc0NhcjogUGFnZVBhcmFtcyA9IG5ldyBQYWdlUGFyYW1zKCk7XHJcbiAgICAvL+iOt+WPluW4g+aOp+WIl+ihqOivt+axguWPguaVsFxyXG4gICAgZmluZExpc3RGYWNlUGFyYW1zOiBUYXNrU2VhcmNoUGFyYW1zO1xyXG4gICAgZmluZExpc3RNYWNQYXJhbXM6IFRhc2tTZWFyY2hQYXJhbXM7XHJcbiAgICBmaW5kTGlzdENhclBhcmFtczogVGFza1NlYXJjaFBhcmFtcztcclxuICAgIC8v6I635Y+W57yT5a2Y5YaF5YiG6aG1XHJcbiAgICBmaW5kRmFjZUJ5UGFnZVBhcmFtczogRmluZENhY2hlQnlQYWdlUGFyYW1zO1xyXG4gICAgZmluZE1hY0J5UGFnZVBhcmFtczogRmluZENhY2hlQnlQYWdlUGFyYW1zO1xyXG4gICAgZmluZENhckJ5UGFnZVBhcmFtczogRmluZENhY2hlQnlQYWdlUGFyYW1zO1xyXG4gICAgLy8gdGFibGUg5YiX6KGo5pWw5o2uXHJcbiAgICBGYWNlQXJlYU5hbWU6IHN0cmluZyA9IG51bGw7XHJcbiAgICBGYWNlVHlwZTogc3RyaW5nID0gVGFza01vbml0b3IuRmFjZU1vbml0b3IudmFsdWU7XHJcbiAgICBDYXJUeXBlOiBzdHJpbmcgPSBUYXNrTW9uaXRvci5DYXJNb25pdG9yLnZhbHVlO1xyXG4gICAgTWFjVHlwZTogc3RyaW5nID0gVGFza01vbml0b3IuTWFjTW9uaXRvci52YWx1ZTtcclxuICAgIEN1cnJlbnRJbmZvOiBDdXJyZW50SW50ZXJmYWNlID0ge1xyXG4gICAgICAgIExpYlR5cGU6IHRoaXMuRmFjZVR5cGUsXHJcbiAgICAgICAgVHlwZTogbnVsbCxcclxuICAgICAgICBTdGF0dXM6IG51bGwsXHJcbiAgICAgICAgQXVkaXRTdGF0dXM6IG51bGxcclxuICAgIH07XHJcblxyXG4gICAgdEZhY2VIZWFkTGlzdDogQXJyYXk8SVRhYmxlSGVhZGVyPjtcclxuICAgIHRDYXJIZWFkTGlzdDogQXJyYXk8SVRhYmxlSGVhZGVyPjtcclxuICAgIHRNYWNIZWFkTGlzdDogQXJyYXk8SVRhYmxlSGVhZGVyPjtcclxuICAgIGlzTmV3Q2FyOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBpc05ld01hYzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgVGFza1R5cGVzOiBUYXNrVHlwZXMgPSBuZXcgVGFza1R5cGVzO1xyXG5cclxuICAgIHRCb2R5TGlzdEZhY2U6IEFycmF5PFRhc2tNb2RlbD47XHJcbiAgICB0Qm9keUxpc3RNYWM6IEFycmF5PE1hY01vbml0b3I+O1xyXG4gICAgdEJvZHlMaXN0Q2FyOiBBcnJheTxDYXJNb25pdG9yPjtcclxuICAgIC8v5aSa6YCJIOebuOWFs1xyXG4gICAgc2VsZWN0ZWRGYWNlTGlzdDogQXJyYXk8Ym9vbGVhbj47XHJcbiAgICBzZWxlY3RlZENhckxpc3Q6IEFycmF5PGJvb2xlYW4+O1xyXG4gICAgc2VsZWN0ZWRNYWNMaXN0OiBBcnJheTxib29sZWFuPjtcclxuICAgIGlzU2VsZWN0RmFjZUFsbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgaXNTZWxlY3RDYXJBbGw6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGlzU2VsZWN0TWFjQWxsOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvLyBhbHRlciB3eXI6IOeUqOS6juWIpOaWreW9k+WJjeeVjOmdouS4iueahOWIl+ihqOaYr+WQpuiiq+mAieS4rVxyXG4gICAgaXNTZWxlY3RGYWNlSXRlbXM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGlzU2VsZWN0Q2FySXRlbXM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGlzU2VsZWN0TWFjSXRlbXM6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBjdXJyZW50TGF5ZXJJbmRleDogbnVtYmVyO1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbXHJcbiAgICAgICAgJyRzY29wZScsXHJcbiAgICAgICAgJyR0aW1lb3V0JyxcclxuICAgICAgICAnJHN0YXRlJyxcclxuICAgICAgICAnbGF5ZXInLFxyXG4gICAgICAgICdpMThuRmFjdG9yeScsXHJcbiAgICAgICAgJ2FyZWFTZXJ2aWNlJyxcclxuICAgICAgICAndGFza1NlcnZpY2UnLFxyXG4gICAgICAgICd0YXNrTGlzdENhY2hlRmFjdG9yeScsXHJcbiAgICAgICAgJ3RyZWVEaXJlY3RpdmVTZXJ2aWNlJyxcclxuICAgICAgICAndXNlckluZm9DYWNoZUZhY3RvcnknXHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogYW55LFxyXG4gICAgICAgIHByaXZhdGUgJHN0YXRlOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBsYXllcjogYW55LFxyXG4gICAgICAgIHByaXZhdGUgaTE4bkZhY3Rvcnk6IEZ1bmN0aW9uLFxyXG4gICAgICAgIHByaXZhdGUgYXJlYVNlcnZpY2U6IElBcmVhU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHRhc2tTZXJ2aWNlOiBJVGFza1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSB0YXNrTGlzdENhY2hlRmFjdG9yeTogSVRhc2tMaXN0Q2FjaGVGYWN0b3J5LFxyXG4gICAgICAgIHByaXZhdGUgdHJlZVNlcnZpY2U6IElUcmVlRGlyZWN0aXZlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHVzZXJJbmZvQ2FjaGVGYWN0b3J5OiBJVXNlckluZm9DYWNoZUZhY3RvcnkpIHtcclxuXHJcbiAgICAgICAgdGhpcy50YXNrVHlwZU9wdGlvbnMgPSBDYXJPcHRpb25zO1xyXG4gICAgICAgIHRoaXMuaW5pdFRhYmxlUGFyYW1zRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuaW5pdFR5cGVPcHRpb25zKCk7XHJcbiAgICAgICAgdGhpcy5pbml0U3RhdHVzTGliKCk7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdEZhY2VQYXJhbXMgPSB0aGlzLmluaXRGaW5kVGFza0ZhY2VMaXN0UGFyYW1zKCk7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdE1hY1BhcmFtcyA9IHRoaXMuaW5pdEZpbmRUYXNrTWFjTGlzdFBhcmFtcygpO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RDYXJQYXJhbXMgPSB0aGlzLmluaXRGaW5kVGFza0Nhckxpc3RQYXJhbXMoKTtcclxuICAgICAgICB0aGlzLmluaXRBcmVhVHJlZVBhcmFtcygpO1xyXG4gICAgICAgIHRoaXMuZ2V0QXJlYVRyZWVMaXN0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRvbihcInRhc2tjb25maWcubWFjLmNsb3NlUG9wdXBcIiwgKGV2ZW50OiBhbnksIGlzUmVmcmVzaD86IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZSh0aGlzLmN1cnJlbnRMYXllckluZGV4KTtcclxuICAgICAgICAgICAgaWYgKGlzUmVmcmVzaCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRNYWNMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdE1hY1BhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRvbihcInRhc2tjb25maWcuY2FyLmNsb3NlUG9wdXBcIiwgKGV2ZW50OiBhbnksIGlzUmVmcmVzaD86IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZSh0aGlzLmN1cnJlbnRMYXllckluZGV4KTtcclxuICAgICAgICAgICAgaWYgKGlzUmVmcmVzaCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRDYXJMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdENhclBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8g5p6a5Li+6I635Y+W57G75Z6L5YiX6KGoXHJcbiAgICBwcml2YXRlIGluaXRTdGF0dXNMaWIoKSB7XHJcbiAgICAgICAgbGV0IG1vbml0b3JTdGF0dXMgPSBbXSBhcyBBcnJheTxFbnVtPjtcclxuICAgICAgICBsZXQgYXVkaXRTdGF0dXMgPSBbXSBhcyBBcnJheTxFbnVtPjtcclxuICAgICAgICBtb25pdG9yU3RhdHVzLnB1c2goeyB2YWx1ZTogJycsIHRleHQ6ICflhajpg6gnIH0pO1xyXG4gICAgICAgIGF1ZGl0U3RhdHVzLnB1c2goeyB2YWx1ZTogJycsIHRleHQ6ICflhajpg6gnIH0pO1xyXG4gICAgICAgIGZvciAobGV0IGsgaW4gVGFza1N0YXR1cykge1xyXG4gICAgICAgICAgICBtb25pdG9yU3RhdHVzLnB1c2goeyB2YWx1ZTogVGFza1N0YXR1c1trXS52YWx1ZSwgdGV4dDogVGFza1N0YXR1c1trXS50ZXh0IH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGsgaW4gQXVkaXRTdGF0dXMpIHtcclxuICAgICAgICAgICAgYXVkaXRTdGF0dXMucHVzaCh7IHZhbHVlOiBBdWRpdFN0YXR1c1trXS52YWx1ZSwgdGV4dDogQXVkaXRTdGF0dXNba10udGV4dCB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLk1vbml0b3JTdGF0dXNMaWIgPSBtb25pdG9yU3RhdHVzO1xyXG4gICAgICAgIHRoaXMuQXVkaXRTdGF0dXNMaWIgPSBhdWRpdFN0YXR1cztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0VHlwZU9wdGlvbnMoKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdExpc3QgPSBbXSBhcyBBcnJheTxFbnVtPjtcclxuICAgICAgICBmb3IgKGxldCBrIGluIFRhc2tNb25pdG9yKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdExpc3QucHVzaChUYXNrTW9uaXRvcltrXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGFza1R5cGVCdG5MaXN0ID0gcmVzdWx0TGlzdDtcclxuICAgIH07XHJcblxyXG4gICAgdGFyZ2V0TmV3Q2FyKGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdGhpcy5pc05ld01hYyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNOZXdDYXIgPSAhdGhpcy5pc05ld0NhcjtcclxuICAgIH1cclxuXHJcbiAgICB0YXJnZXROZXdNYWMoZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB0aGlzLmlzTmV3Q2FyID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc05ld01hYyA9ICF0aGlzLmlzTmV3TWFjO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tUYXNrVHlwZUJ0biA9IChidG5JdGVtOiBFbnVtKTogYm9vbGVhbiA9PiB7XHJcbiAgICAgICAgaWYgKGJ0bkl0ZW0udmFsdWUgPT09IHRoaXMuQ3VycmVudEluZm8uTGliVHlwZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5DdXJyZW50SW5mby5UeXBlID0gJyc7XHJcbiAgICAgICAgdGhpcy5DdXJyZW50SW5mby5TdGF0dXMgPSAnJztcclxuICAgICAgICB0aGlzLkN1cnJlbnRJbmZvLkF1ZGl0U3RhdHVzID0gJyc7XHJcbiAgICAgICAgaWYgKGJ0bkl0ZW0udmFsdWUgPT09IHRoaXMuRmFjZVR5cGUpIHtcclxuICAgICAgICAgICAgdGhpcy5DdXJyZW50SW5mby5MaWJUeXBlID0gdGhpcy5GYWNlVHlwZTtcclxuICAgICAgICAgICAgdGhpcy5maW5kTGlzdEZhY2VQYXJhbXMubmFtZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuZmluZExpc3RGYWNlUGFyYW1zLnJ1blN0YXR1cyA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuZmluZExpc3RGYWNlUGFyYW1zLmF1ZGl0U3RhdHVzID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5maW5kTGlzdEZhY2VQYXJhbXMuc3RhcnRUaW1lID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5maW5kTGlzdEZhY2VQYXJhbXMuZW5kVGltZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RmFjZUxpc3RCeVBhcmFtcyh0aGlzLmZpbmRMaXN0RmFjZVBhcmFtcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5DdXJyZW50SW5mby5MaWJUeXBlID0gYnRuSXRlbS52YWx1ZTtcclxuICAgICAgICAgICAgaWYgKGJ0bkl0ZW0udmFsdWUgPT09IHRoaXMuQ2FyVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXNrVHlwZU9wdGlvbnMgPSBDYXJPcHRpb25zO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5kTGlzdENhclBhcmFtcy5wbGF0ZU51bWJlciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRMaXN0Q2FyUGFyYW1zLnJ1blN0YXR1cyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRMaXN0Q2FyUGFyYW1zLmF1ZGl0U3RhdHVzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZExpc3RDYXJQYXJhbXMubGlzdFR5cGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5kTGlzdENhclBhcmFtcy5zdGFydFRpbWUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5kTGlzdENhclBhcmFtcy5lbmRUaW1lID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q2FyTGlzdEJ5UGFyYW1zKHRoaXMuZmluZExpc3RDYXJQYXJhbXMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXNrVHlwZU9wdGlvbnMgPSBNYWNPcHRpb25zO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5kTGlzdE1hY1BhcmFtcy5wZXJjZWl2ZURhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5kTGlzdE1hY1BhcmFtcy5ydW5TdGF0dXMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5kTGlzdE1hY1BhcmFtcy5hdWRpdFN0YXR1cyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRMaXN0TWFjUGFyYW1zLmxpc3RUeXBlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZExpc3RNYWNQYXJhbXMuc3RhcnRUaW1lID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZExpc3RNYWNQYXJhbXMuZW5kVGltZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldE1hY0xpc3RCeVBhcmFtcyh0aGlzLmZpbmRMaXN0TWFjUGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIGluaXRUYWJsZVBhcmFtc0RhdGEoKSB7XHJcbiAgICAgICAgdGhpcy50Qm9keUxpc3RGYWNlID0gW107XHJcbiAgICAgICAgdGhpcy50RmFjZUhlYWRMaXN0ID0gdEZhY2VIZWFkTGlzdDtcclxuICAgICAgICB0aGlzLnRDYXJIZWFkTGlzdCA9IHRDYXJIZWFkTGlzdDtcclxuICAgICAgICB0aGlzLnRNYWNIZWFkTGlzdCA9IHRNYWNIZWFkTGlzdDtcclxuICAgICAgICB0aGlzLkN1cnJlbnRJbmZvID0ge1xyXG4gICAgICAgICAgICBMaWJUeXBlOiB0aGlzLkZhY2VUeXBlLFxyXG4gICAgICAgICAgICBUeXBlOiAnJyxcclxuICAgICAgICAgICAgU3RhdHVzOiAnJyxcclxuICAgICAgICAgICAgQXVkaXRTdGF0dXM6ICcnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0RmluZFRhc2tGYWNlTGlzdFBhcmFtcygpOiBUYXNrU2VhcmNoUGFyYW1zIHtcclxuICAgICAgICBsZXQgbmV3UGFyYW1zID0gbmV3IFRhc2tTZWFyY2hQYXJhbXMoKTtcclxuICAgICAgICBuZXdQYXJhbXMuYXJlYUlkID0gJyc7XHJcbiAgICAgICAgbmV3UGFyYW1zLnJ1blN0YXR1cyA9ICcnO1xyXG4gICAgICAgIG5ld1BhcmFtcy5zdGFydFRpbWUgPSBudWxsO1xyXG4gICAgICAgIG5ld1BhcmFtcy5lbmRUaW1lID0gbnVsbDtcclxuICAgICAgICBuZXdQYXJhbXMubmFtZSA9ICcnO1xyXG4gICAgICAgIG5ld1BhcmFtcy5wYWdlU2l6ZSA9IHRoaXMucGFnZVBhcmFtc0ZhY2UucGFnZVNpemU7XHJcbiAgICAgICAgbmV3UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICBuZXdQYXJhbXMudXNlcklkID0gdGhpcy51c2VySW5mb0NhY2hlRmFjdG9yeS5nZXRDdXJyZW50VXNlcklkKCk7XHJcbiAgICAgICAgcmV0dXJuIG5ld1BhcmFtcztcclxuICAgIH1cclxuXHJcbiAgICBpbml0RmluZFRhc2tNYWNMaXN0UGFyYW1zKCk6IFRhc2tTZWFyY2hQYXJhbXMge1xyXG4gICAgICAgIGxldCBuZXdQYXJhbXMgPSBuZXcgVGFza1NlYXJjaFBhcmFtcygpO1xyXG4gICAgICAgIG5ld1BhcmFtcy5ydW5TdGF0dXMgPSBudWxsO1xyXG4gICAgICAgIG5ld1BhcmFtcy5zdGFydFRpbWUgPSBudWxsO1xyXG4gICAgICAgIG5ld1BhcmFtcy5lbmRUaW1lID0gbnVsbDtcclxuICAgICAgICBuZXdQYXJhbXMucGFnZVNpemUgPSB0aGlzLnBhZ2VQYXJhbXNNYWMucGFnZVNpemU7XHJcbiAgICAgICAgbmV3UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICBuZXdQYXJhbXMucGVyY2VpdmVEYXRhID0gbnVsbDtcclxuICAgICAgICBuZXdQYXJhbXMubGlzdFR5cGUgPSBudWxsO1xyXG4gICAgICAgIG5ld1BhcmFtcy51c2VySWQgPSB0aGlzLnVzZXJJbmZvQ2FjaGVGYWN0b3J5LmdldEN1cnJlbnRVc2VySWQoKTtcclxuICAgICAgICByZXR1cm4gbmV3UGFyYW1zO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRGaW5kVGFza0Nhckxpc3RQYXJhbXMoKTogVGFza1NlYXJjaFBhcmFtcyB7XHJcbiAgICAgICAgbGV0IG5ld1BhcmFtcyA9IG5ldyBUYXNrU2VhcmNoUGFyYW1zKCk7XHJcbiAgICAgICAgbmV3UGFyYW1zLmFyZWFJZCA9IG51bGw7XHJcbiAgICAgICAgbmV3UGFyYW1zLnJ1blN0YXR1cyA9IG51bGw7XHJcbiAgICAgICAgbmV3UGFyYW1zLnN0YXJ0VGltZSA9IG51bGw7XHJcbiAgICAgICAgbmV3UGFyYW1zLmVuZFRpbWUgPSBudWxsO1xyXG4gICAgICAgIG5ld1BhcmFtcy5wYWdlU2l6ZSA9IHRoaXMucGFnZVBhcmFtc0Nhci5wYWdlU2l6ZTtcclxuICAgICAgICBuZXdQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIG5ld1BhcmFtcy5wbGF0ZU51bWJlciA9IG51bGw7XHJcbiAgICAgICAgbmV3UGFyYW1zLmxpc3RUeXBlID0gbnVsbDtcclxuICAgICAgICBuZXdQYXJhbXMudXNlcklkID0gdGhpcy51c2VySW5mb0NhY2hlRmFjdG9yeS5nZXRDdXJyZW50VXNlcklkKCk7XHJcbiAgICAgICAgcmV0dXJuIG5ld1BhcmFtcztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy/mnaHku7bmkJzntKLku7vliqHliJfooahcclxuICAgIG9uQ2xpY2tTZWFyY2goKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEluZm8uTGliVHlwZSA9PT0gdGhpcy5GYWNlVHlwZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5maW5kTGlzdEZhY2VQYXJhbXMuc3RhcnRUaW1lICYmIHRoaXMuZmluZExpc3RGYWNlUGFyYW1zLmVuZFRpbWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpbmRMaXN0RmFjZVBhcmFtcy5zdGFydFRpbWUgPiB0aGlzLmZpbmRMaXN0RmFjZVBhcmFtcy5lbmRUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXllci5tc2codGhpcy5pMThuRmFjdG9yeShcIkZEU18wMV8xMl82N1wiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZmluZExpc3RGYWNlUGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICAgICAgdGhpcy5maW5kTGlzdEZhY2VQYXJhbXMucnVuU3RhdHVzID0gdGhpcy5DdXJyZW50SW5mby5TdGF0dXM7XHJcbiAgICAgICAgICAgIHRoaXMuZmluZExpc3RGYWNlUGFyYW1zLmF1ZGl0U3RhdHVzID0gdGhpcy5DdXJyZW50SW5mby5BdWRpdFN0YXR1cztcclxuICAgICAgICAgICAgaWYgKCF0aGlzLkN1cnJlbnRJbmZvLkF1ZGl0U3RhdHVzKSB0aGlzLmZpbmRMaXN0RmFjZVBhcmFtcy5hdWRpdFN0YXR1cyA9IG51bGw7XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5nZXRGYWNlTGlzdEJ5UGFyYW1zKHRoaXMuZmluZExpc3RGYWNlUGFyYW1zKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuQ3VycmVudEluZm8uTGliVHlwZSA9PT0gdGhpcy5NYWNUeXBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmluZExpc3RNYWNQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5maW5kTGlzdE1hY1BhcmFtcy5zdGFydFRpbWUgJiYgdGhpcy5maW5kTGlzdE1hY1BhcmFtcy5lbmRUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maW5kTGlzdE1hY1BhcmFtcy5zdGFydFRpbWUgPiB0aGlzLmZpbmRMaXN0TWFjUGFyYW1zLmVuZFRpbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxheWVyLm1zZyh0aGlzLmkxOG5GYWN0b3J5KFwiRkRTXzAxXzEyXzY3XCIpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuQ3VycmVudEluZm8uVHlwZSA9PT0gJ0JsYWNrJykgdGhpcy5maW5kTGlzdE1hY1BhcmFtcy5saXN0VHlwZSA9ICdCbGFja0xpc3QnO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5DdXJyZW50SW5mby5UeXBlID09PSAnV2hpdGUnKSB0aGlzLmZpbmRMaXN0TWFjUGFyYW1zLmxpc3RUeXBlID0gJ1doaXRlTGlzdCc7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmZpbmRMaXN0TWFjUGFyYW1zLnJ1blN0YXR1cyA9IHRoaXMuQ3VycmVudEluZm8uU3RhdHVzO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRMaXN0TWFjUGFyYW1zLmF1ZGl0U3RhdHVzID0gdGhpcy5DdXJyZW50SW5mby5BdWRpdFN0YXR1cztcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5DdXJyZW50SW5mby5BdWRpdFN0YXR1cykgdGhpcy5maW5kTGlzdE1hY1BhcmFtcy5hdWRpdFN0YXR1cyA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmdldE1hY0xpc3RCeVBhcmFtcyh0aGlzLmZpbmRMaXN0TWFjUGFyYW1zKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuQ3VycmVudEluZm8uTGliVHlwZSA9PT0gdGhpcy5DYXJUeXBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmluZExpc3RDYXJQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5maW5kTGlzdENhclBhcmFtcy5zdGFydFRpbWUgJiYgdGhpcy5maW5kTGlzdENhclBhcmFtcy5lbmRUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maW5kTGlzdENhclBhcmFtcy5zdGFydFRpbWUgPiB0aGlzLmZpbmRMaXN0Q2FyUGFyYW1zLmVuZFRpbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxheWVyLm1zZyh0aGlzLmkxOG5GYWN0b3J5KFwiRkRTXzAxXzEyXzY3XCIpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLkN1cnJlbnRJbmZvLlR5cGUpIHRoaXMuZmluZExpc3RDYXJQYXJhbXMubGlzdFR5cGUgPSBudWxsO1xyXG4gICAgICAgICAgICBlbHNlIHRoaXMuZmluZExpc3RDYXJQYXJhbXMubGlzdFR5cGUgPSB0aGlzLkN1cnJlbnRJbmZvLlR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuZmluZExpc3RDYXJQYXJhbXMucnVuU3RhdHVzID0gdGhpcy5DdXJyZW50SW5mby5TdGF0dXM7XHJcbiAgICAgICAgICAgIHRoaXMuZmluZExpc3RDYXJQYXJhbXMuYXVkaXRTdGF0dXMgPSB0aGlzLkN1cnJlbnRJbmZvLkF1ZGl0U3RhdHVzO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuQ3VycmVudEluZm8uQXVkaXRTdGF0dXMpIHRoaXMuZmluZExpc3RDYXJQYXJhbXMuYXVkaXRTdGF0dXMgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmdldENhckxpc3RCeVBhcmFtcyh0aGlzLmZpbmRMaXN0Q2FyUGFyYW1zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tIOagkeWIlyDmk43kvZzlh73mlbBcclxuICAgIGluaXRBcmVhVHJlZVBhcmFtcygpIHtcclxuICAgICAgICAvLyDmoJHliJfooajmlbDmja5cclxuICAgICAgICAvL+WIneWni+WMliBhcmVhIOagkeaVsOaNrlxyXG4gICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcyA9IG5ldyBUcmVlRGF0YVBhcmFtczxBcmVhRXg+KCk7XHJcbiAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzLnRyZWVJZCA9ICdhcmVhVHJlZUJ5VGFza0NvbmZpZyc7XHJcbiAgICAgICAgLy8g6IqC54K56YCJ5oupXHJcbiAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzLm9uQ2xpY2sgPSAoZXZlbnQ6IE1vdXNlRXZlbnQsIHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZTogQXJlYUV4KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZmluZExpc3RGYWNlUGFyYW1zLmFyZWFJZCA9IHRyZWVOb2RlLklEO1xyXG4gICAgICAgICAgICB0aGlzLmdldEZhY2VMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdEZhY2VQYXJhbXMpO1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBub3dBcmVhID0gdGhpcy50cmVlU2VydmljZS5nZXROb2RlQnlQYXJhbSh0aGlzLmFyZWFUcmVlRGF0YXMudHJlZUlkLCAnSUQnLCB0cmVlTm9kZS5JRCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkZhY2VBcmVhTmFtZSA9IG5vd0FyZWEuTmFtZTtcclxuICAgICAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzLnRyZWVJbml0Q29tcGxldGUgPSAodHJlZUlkOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLliJ3lp4vljJbluIPmjqfku7vliqHliJfooagg5Zyw5Yy65qCRXCIsIHRyZWVJZCk7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgLy8g5pWw5o2u6I635Y+WXHJcbiAgICBnZXRBcmVhVHJlZUxpc3Qoa2V5d29yZD86IHN0cmluZykge1xyXG4gICAgICAgIGxldCBwYXJhbXM6IFRyZWVQYXJhbXMgPSB0aGlzLmFyZWFUcmVlRGF0YXMucmVxUGFyYW1zO1xyXG4gICAgICAgIHBhcmFtcy5rZXl3b3JkID0ga2V5d29yZDtcclxuICAgICAgICB0aGlzLmFyZWFTZXJ2aWNlLmZpbmRMaXN0VHJlZShwYXJhbXMpLnRoZW4oKHJlc3A6IEFycmF5PEFyZWFFeD4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzLmZpbmlzaGVkTm9EYXRhID0gIXJlc3A7XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzLnRyZWVEYXRhcyA9IHJlc3BcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH07XHJcblxyXG4gICAgLy8g5qCR5pCc57SiXHJcbiAgICBhcmVhVHJlZVNlYXJjaElucHV0S2V5VXAoZTogYW55KSB7XHJcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRBcmVhVHJlZUxpc3QodGhpcy5hcmVhVHJlZVNlYXJjaElucHV0U3RyKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIOagkeaQnOe0olxyXG4gICAgYXJlYVRyZWVTZWFyY2hJbnB1dCgpIHtcclxuICAgICAgICB0aGlzLmdldEFyZWFUcmVlTGlzdCh0aGlzLmFyZWFUcmVlU2VhcmNoSW5wdXRTdHIpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgZ2V0RmFjZUxpc3RCeVBhcmFtcyhwYXJhbXM6IFRhc2tTZWFyY2hQYXJhbXMpIHtcclxuICAgICAgICB0aGlzLnRhc2tTZXJ2aWNlLmZpbmRGYWNlTGlzdEJ5UGFyYW1zKHBhcmFtcykudGhlbigocmVzOiBSZXNwb25zZVJlc3VsdDxBcnJheTxUYXNrTW9kZWw+PikgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmVzcCA9IHJlcyBhcyBSZXNwb25zZVJlc3VsdDxBcnJheTxUYXNrTW9kZWwgJiBNYWNNb25pdG9yICYgQ2FyTW9uaXRvcj4+O1xyXG4gICAgICAgICAgICBpZiAocmVzcCAmJiByZXNwLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRhc2tMaXN0VG9DYWNoZShyZXNwLmRhdGEsIHRoaXMuVGFza1R5cGVzLkZhY2UudmFsdWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUYXNrTGlzdFRvQ2FjaGUoW10sIHRoaXMuVGFza1R5cGVzLkZhY2UudmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBnZXRNYWNMaXN0QnlQYXJhbXMocGFyYW1zOiBUYXNrU2VhcmNoUGFyYW1zKSB7XHJcbiAgICAgICAgdGhpcy50YXNrU2VydmljZS5maW5kTWFjTGlzdEJ5UGFyYW1zKHBhcmFtcykudGhlbigocmVzOiBSZXNwb25zZVJlc3VsdDxBcnJheTxNYWNNb25pdG9yPj4pID0+IHtcclxuICAgICAgICAgICAgbGV0IHJlc3AgPSByZXMgYXMgUmVzcG9uc2VSZXN1bHQ8QXJyYXk8VGFza01vZGVsICYgTWFjTW9uaXRvciAmIENhck1vbml0b3I+PjtcclxuICAgICAgICAgICAgaWYgKHJlc3AgJiYgcmVzcC5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUYXNrTGlzdFRvQ2FjaGUocmVzcC5kYXRhLCB0aGlzLlRhc2tUeXBlcy5NYWMudmFsdWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUYXNrTGlzdFRvQ2FjaGUoW10sIHRoaXMuVGFza1R5cGVzLk1hYy52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDYXJMaXN0QnlQYXJhbXMocGFyYW1zOiBUYXNrU2VhcmNoUGFyYW1zKSB7XHJcbiAgICAgICAgdGhpcy50YXNrU2VydmljZS5maW5kQ2FyTGlzdEJ5UGFyYW1zKHBhcmFtcykudGhlbigocmVzOiBSZXNwb25zZVJlc3VsdDxBcnJheTxDYXJNb25pdG9yPj4pID0+IHtcclxuICAgICAgICAgICAgbGV0IHJlc3AgPSByZXMgYXMgUmVzcG9uc2VSZXN1bHQ8QXJyYXk8VGFza01vZGVsICYgTWFjTW9uaXRvciAmIENhck1vbml0b3I+PjtcclxuICAgICAgICAgICAgaWYgKHJlc3AgJiYgcmVzcC5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUYXNrTGlzdFRvQ2FjaGUocmVzcC5kYXRhLCB0aGlzLlRhc2tUeXBlcy5DYXIudmFsdWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUYXNrTGlzdFRvQ2FjaGUoW10sIHRoaXMuVGFza1R5cGVzLkNhci52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WJjeW+gCDmm7TmlrBcclxuICAgIGdvVG9VcGRhdGVUYXNrKHRhc2tJdGVtOiBUYXNrTW9kZWwgJiBNYWNNb25pdG9yICYgQ2FyTW9uaXRvcikge1xyXG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRJbmZvLkxpYlR5cGUgPT09IHRoaXMuRmFjZVR5cGUpIHtcclxuICAgICAgICAgICAgdGhpcy4kc3RhdGUuZ28oJ2Jhc2Vjb25maWcudGFzay5uZXdGYWNlTW9uaXRvcicsIHtcclxuICAgICAgICAgICAgICAgIHRhc2tJZDogdGFza0l0ZW0uSUQsXHJcbiAgICAgICAgICAgICAgICBhcmVhSWQ6IHRoaXMuZmluZExpc3RGYWNlUGFyYW1zLmFyZWFJZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuQ3VycmVudEluZm8uTGliVHlwZSA9PT0gdGhpcy5NYWNUeXBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHN0YXRlLmdvKCdiYXNlY29uZmlnLnRhc2submV3TWFjTW9uaXRvcicsIHtcclxuICAgICAgICAgICAgICAgIHRhc2tJZDogdGFza0l0ZW0uSUQsXHJcbiAgICAgICAgICAgICAgICBhcmVhSWQ6IHRoaXMuZmluZExpc3RGYWNlUGFyYW1zLmFyZWFJZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuQ3VycmVudEluZm8uTGliVHlwZSA9PT0gdGhpcy5DYXJUeXBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHN0YXRlLmdvKCdiYXNlY29uZmlnLnRhc2submV3Q2FyTW9uaXRvcicsIHtcclxuICAgICAgICAgICAgICAgIHRhc2tJZDogdGFza0l0ZW0uSUQsXHJcbiAgICAgICAgICAgICAgICBhcmVhSWQ6IHRoaXMuZmluZExpc3RGYWNlUGFyYW1zLmFyZWFJZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBnb05ld01vbml0b3IoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5DdXJyZW50SW5mbyk7XHJcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEluZm8uTGliVHlwZSA9PT0gdGhpcy5GYWNlVHlwZSkge1xyXG4gICAgICAgICAgICB0aGlzLiRzdGF0ZS5nbygnYmFzZWNvbmZpZy50YXNrLm5ld0ZhY2VNb25pdG9yJywgeyBhcmVhSWQ6IHRoaXMuZmluZExpc3RGYWNlUGFyYW1zLmFyZWFJZCB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuQ3VycmVudEluZm8uTGliVHlwZSA9PT0gdGhpcy5NYWNUeXBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHN0YXRlLmdvKCdiYXNlY29uZmlnLnRhc2submV3TWFjTW9uaXRvcicsIHsgYXJlYUlkOiB0aGlzLmZpbmRMaXN0RmFjZVBhcmFtcy5hcmVhSWQgfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLkN1cnJlbnRJbmZvLkxpYlR5cGUgPT09IHRoaXMuQ2FyVHlwZSkge1xyXG4gICAgICAgICAgICB0aGlzLiRzdGF0ZS5nbygnYmFzZWNvbmZpZy50YXNrLm5ld0Nhck1vbml0b3InLCB7IGFyZWFJZDogdGhpcy5maW5kTGlzdEZhY2VQYXJhbXMuYXJlYUlkIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHNldFRhc2tMaXN0VG9DYWNoZShkYXRhTGlzdDogQXJyYXk8VGFza01vZGVsICYgTWFjTW9uaXRvciAmIENhck1vbml0b3I+LCB0eXBlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIWRhdGFMaXN0KSB7XHJcbiAgICAgICAgICAgIGRhdGFMaXN0ID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSB0aGlzLlRhc2tUeXBlcy5GYWNlLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmluZEZhY2VCeVBhZ2VQYXJhbXMgPSBuZXcgRmluZENhY2hlQnlQYWdlUGFyYW1zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZmluZEZhY2VCeVBhZ2VQYXJhbXMucGFnZVNpemUgPSB0aGlzLnBhZ2VQYXJhbXNGYWNlLnBhZ2VTaXplO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRGYWNlQnlQYWdlUGFyYW1zLmN1cnJlbnRQYWdlID0gdGhpcy5wYWdlUGFyYW1zRmFjZS5jdXJyZW50UGFnZTtcclxuICAgICAgICAgICAgdGhpcy50YXNrTGlzdENhY2hlRmFjdG9yeS5zZXRUYXNrTGlzdChkYXRhTGlzdCwgdHlwZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0TGlzdEJ5UGFnZSh0aGlzLmZpbmRGYWNlQnlQYWdlUGFyYW1zLCB0eXBlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IHRoaXMuVGFza1R5cGVzLk1hYy52YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRNYWNCeVBhZ2VQYXJhbXMgPSBuZXcgRmluZENhY2hlQnlQYWdlUGFyYW1zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZmluZE1hY0J5UGFnZVBhcmFtcy5wYWdlU2l6ZSA9IHRoaXMucGFnZVBhcmFtc01hYy5wYWdlU2l6ZTtcclxuICAgICAgICAgICAgdGhpcy5maW5kTWFjQnlQYWdlUGFyYW1zLmN1cnJlbnRQYWdlID0gdGhpcy5wYWdlUGFyYW1zTWFjLmN1cnJlbnRQYWdlO1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tMaXN0Q2FjaGVGYWN0b3J5LnNldFRhc2tMaXN0KGRhdGFMaXN0LCB0eXBlKTtcclxuICAgICAgICAgICAgdGhpcy5nZXRMaXN0QnlQYWdlKHRoaXMuZmluZE1hY0J5UGFnZVBhcmFtcywgdHlwZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSB0aGlzLlRhc2tUeXBlcy5DYXIudmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5maW5kQ2FyQnlQYWdlUGFyYW1zID0gbmV3IEZpbmRDYWNoZUJ5UGFnZVBhcmFtcygpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRDYXJCeVBhZ2VQYXJhbXMucGFnZVNpemUgPSB0aGlzLnBhZ2VQYXJhbXNDYXIucGFnZVNpemU7XHJcbiAgICAgICAgICAgIHRoaXMuZmluZENhckJ5UGFnZVBhcmFtcy5jdXJyZW50UGFnZSA9IHRoaXMucGFnZVBhcmFtc0Nhci5jdXJyZW50UGFnZTtcclxuICAgICAgICAgICAgdGhpcy50YXNrTGlzdENhY2hlRmFjdG9yeS5zZXRUYXNrTGlzdChkYXRhTGlzdCwgdHlwZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0TGlzdEJ5UGFnZSh0aGlzLmZpbmRDYXJCeVBhZ2VQYXJhbXMsIHR5cGUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy/liIbpobXojrflj5bmnKzlnLDnvJPlrZjmlbDmja5cclxuICAgIGdldExpc3RCeVBhZ2UocGFyYW1zOiBGaW5kQ2FjaGVCeVBhZ2VQYXJhbXMsIHR5cGU6IHN0cmluZykge1xyXG5cclxuICAgICAgICBsZXQgY2FjaGVMaXN0ID0gdGhpcy50YXNrTGlzdENhY2hlRmFjdG9yeS5nZXRMaXN0QnlQYWdlKHBhcmFtcywgdHlwZSk7XHJcbiAgICAgICAgbGV0IHBhZ2VQYXJhbXMgPSBuZXcgUGFnZVBhcmFtcygpO1xyXG4gICAgICAgIHBhZ2VQYXJhbXMuY3VycmVudFBhZ2UgPSBwYXJhbXMuY3VycmVudFBhZ2U7XHJcbiAgICAgICAgcGFnZVBhcmFtcy5wYWdlU2l6ZSA9IHBhcmFtcy5wYWdlU2l6ZTtcclxuICAgICAgICBwYWdlUGFyYW1zLnRvdGFsQ291bnQgPSB0aGlzLnRhc2tMaXN0Q2FjaGVGYWN0b3J5LmdldFRhc2tUb3RhbCh0eXBlKTtcclxuICAgICAgICBpZiAodHlwZSA9PT0gdGhpcy5UYXNrVHlwZXMuRmFjZS52YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnRCb2R5TGlzdEZhY2UgPSBjYWNoZUxpc3QgYXMgQXJyYXk8VGFza01vZGVsPjtcclxuICAgICAgICAgICAgdGhpcy5wYWdlUGFyYW1zRmFjZSA9IHBhZ2VQYXJhbXM7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSB0aGlzLlRhc2tUeXBlcy5NYWMudmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy50Qm9keUxpc3RNYWMgPSBjYWNoZUxpc3QgYXMgQXJyYXk8TWFjTW9uaXRvcj47XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVBhcmFtc01hYyA9IHBhZ2VQYXJhbXM7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSB0aGlzLlRhc2tUeXBlcy5DYXIudmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy50Qm9keUxpc3RDYXIgPSBjYWNoZUxpc3QgYXMgQXJyYXk8Q2FyTW9uaXRvcj47XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVBhcmFtc0NhciA9IHBhZ2VQYXJhbXM7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLy8g5pS55Y+Y6L+Q6KGM77yM6L+H5pyf5LiN5YGa5pON5L2cICDlgZzmraIv6L+Q6KGMIOWIh+aNolxyXG4gICAgY2hhbmdlVGFza1J1blN0YXR1cyh0YXNrSXRlbTogVGFza01vZGVsICYgTWFjTW9uaXRvciAmIENhck1vbml0b3IpIHtcclxuICAgICAgICBpZiAodGFza0l0ZW0uQXVkaXRTdGF0dXMgPT09ICdWZXJpZmllZCcgJiYgdGFza0l0ZW0uU3RhdHVzID09PSAnU3RvcCcpIHtcclxuICAgICAgICAgICAgbGV0IHRleHRTdHI6IHN0cmluZztcclxuICAgICAgICAgICAgaWYgKHRoaXMuQ3VycmVudEluZm8uTGliVHlwZSA9PT0gdGhpcy5GYWNlVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgdGV4dFN0ciA9IGDmgqjnoa7lrprlkK/liqggJHt0YXNrSXRlbS5OYW1lfT9gO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuQ3VycmVudEluZm8uTGliVHlwZSA9PT0gdGhpcy5DYXJUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0U3RyID0gYOaCqOehruWumuWQr+WKqCAke3Rhc2tJdGVtLlBsYXRlTnVtYmVyfT9gO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuQ3VycmVudEluZm8uTGliVHlwZSA9PT0gdGhpcy5NYWNUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0U3RyID0gYOaCqOehruWumuWQr+WKqCAke3Rhc2tJdGVtLlBlcmNlaXZlRGF0YX0/YDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxheWVyLmNvbmZpcm0odGV4dFN0ciwge1xyXG4gICAgICAgICAgICAgICAgaWNvbjogMCxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLmkxOG5GYWN0b3J5KCdEUF9DT05GSUdfQ09NTU9OXzQ3JyksXHJcbiAgICAgICAgICAgICAgICBhcmVhOiBbXCI1MDBweFwiLCBcIjIwMHB4XCJdXHJcbiAgICAgICAgICAgIH0sIChpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyLmNsb3NlKGluZGV4KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3VibWl0Q2hhbmdlUnVuU3RhdHVzKFt0YXNrSXRlbS5JRF0sIHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmICh0YXNrSXRlbS5TdGF0dXMgPT09ICdSdW4nICYmIHRhc2tJdGVtLkF1ZGl0U3RhdHVzID09PSAnVmVyaWZpZWQnKSB7XHJcbiAgICAgICAgICAgIGxldCB0ZXh0U3RyOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkN1cnJlbnRJbmZvLkxpYlR5cGUgPT09IHRoaXMuRmFjZVR5cGUpIHtcclxuICAgICAgICAgICAgICAgIHRleHRTdHIgPSBg5oKo56Gu5a6a5YGc5q2iICR7dGFza0l0ZW0uTmFtZX0/YDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLkN1cnJlbnRJbmZvLkxpYlR5cGUgPT09IHRoaXMuQ2FyVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgdGV4dFN0ciA9IGDmgqjnoa7lrprlgZzmraIgJHt0YXNrSXRlbS5QbGF0ZU51bWJlcn0/YDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLkN1cnJlbnRJbmZvLkxpYlR5cGUgPT09IHRoaXMuTWFjVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgdGV4dFN0ciA9IGDmgqjnoa7lrprlgZzmraIgJHt0YXNrSXRlbS5QZXJjZWl2ZURhdGF9P2A7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5sYXllci5jb25maXJtKHRleHRTdHIsIHtcclxuICAgICAgICAgICAgICAgIGljb246IDAsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5pMThuRmFjdG9yeSgnRFBfQ09ORklHX0NPTU1PTl80NycpLFxyXG4gICAgICAgICAgICAgICAgYXJlYTogW1wiNTAwcHhcIiwgXCIyMDBweFwiXVxyXG4gICAgICAgICAgICB9LCAoaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZShpbmRleCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1Ym1pdENoYW5nZVJ1blN0YXR1cyhbdGFza0l0ZW0uSURdLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBvbkNsaWNrVGFza1J1blN0YXR1c0J5KGlzU3RhcnQ6IGJvb2xlYW4pIHtcclxuICAgICAgICBsZXQgdGV4dFN0ciA9IGlzU3RhcnQgPyBcIuehruWumuW8gOWQrzpcIiA6IFwi56Gu5a6a5pqC5YGc77yaXCI7XHJcbiAgICAgICAgbGV0IGRlbElkcyA9IFtdIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgbGV0IHRhc2tJdGVtTW9kZWxzID0gdGhpcy5nZXRTZWxlY3RlZExpc3QoKTtcclxuICAgICAgICBpZiAodGhpcy5DdXJyZW50SW5mby5MaWJUeXBlID09PSB0aGlzLkZhY2VUeXBlKSB7XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh0YXNrSXRlbU1vZGVscywgKHZhbDogVGFza01vZGVsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0U3RyICs9IFwiPGJyLz5cIiArIHZhbC5OYW1lO1xyXG4gICAgICAgICAgICAgICAgZGVsSWRzLnB1c2godmFsLklEKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuQ3VycmVudEluZm8uTGliVHlwZSA9PT0gdGhpcy5DYXJUeXBlKSB7XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh0YXNrSXRlbU1vZGVscywgKHZhbDogQ2FyTW9uaXRvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGV4dFN0ciArPSBcIjxici8+XCIgKyB2YWwuUGxhdGVOdW1iZXI7XHJcbiAgICAgICAgICAgICAgICBkZWxJZHMucHVzaCh2YWwuSUQpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5DdXJyZW50SW5mby5MaWJUeXBlID09PSB0aGlzLk1hY1R5cGUpIHtcclxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHRhc2tJdGVtTW9kZWxzLCAodmFsOiBNYWNNb25pdG9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0U3RyICs9IFwiPGJyLz5cIiArIHZhbC5QZXJjZWl2ZURhdGE7XHJcbiAgICAgICAgICAgICAgICBkZWxJZHMucHVzaCh2YWwuSUQpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxheWVyLmNvbmZpcm0odGV4dFN0ciwge1xyXG4gICAgICAgICAgICBpY29uOiAwLFxyXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5pMThuRmFjdG9yeSgnRFBfQ09ORklHX0NPTU1PTl80MicpLFxyXG4gICAgICAgICAgICBhcmVhOiBbXCI1MDBweFwiLCBcIjIwMHB4XCJdXHJcbiAgICAgICAgfSwgKGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZShpbmRleCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3VibWl0Q2hhbmdlUnVuU3RhdHVzKGRlbElkcywgaXNTdGFydCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIOehruWumuaPkOS6pCDmlLnlj5jnirbmgIFcclxuICAgIHByaXZhdGUgc3VibWl0Q2hhbmdlUnVuU3RhdHVzKGlkczogQXJyYXk8c3RyaW5nPiwgaXNTdGFydDogYm9vbGVhbikge1xyXG5cclxuICAgICAgICBpZiAoaWRzICYmIGlkcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBpZEwgPSBpZHMuam9pbignLCcpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5DdXJyZW50SW5mby5MaWJUeXBlID09PSB0aGlzLkZhY2VUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tTZXJ2aWNlLnVwZGF0ZUZhY2VSdW5TdGF0dXMoaWRMLCBpc1N0YXJ0KS50aGVuKChyZXNwOiBSZXNwb25zZVJlc3VsdDxhbnk+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3AgJiYgcmVzcC5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEZhY2VMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdEZhY2VQYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IocmVzcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5DdXJyZW50SW5mby5MaWJUeXBlID09PSB0aGlzLkNhclR5cGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFza1NlcnZpY2UudXBkYXRlQ2FyUnVuU3RhdHVzKGlkTCwgaXNTdGFydCkudGhlbigocmVzcDogUmVzcG9uc2VSZXN1bHQ8YW55PikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwICYmIHJlc3AuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRDYXJMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdENhclBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihyZXNwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLkN1cnJlbnRJbmZvLkxpYlR5cGUgPT09IHRoaXMuTWFjVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXNrU2VydmljZS51cGRhdGVNYWNSdW5TdGF0dXMoaWRMLCBpc1N0YXJ0KS50aGVuKChyZXNwOiBSZXNwb25zZVJlc3VsdDxhbnk+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3AgJiYgcmVzcC5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldE1hY0xpc3RCeVBhcmFtcyh0aGlzLmZpbmRMaXN0TWFjUGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKHJlc3ApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLypcclxuICAgICog5Yig6Zmk5Y2V5LiqXHJcbiAgICAqICovXHJcbiAgICBvbkNsaWNrRGVsZXRlQnlJZChUYXNrTW9kZWw6IGFueSkge1xyXG4gICAgICAgIGxldCB0ZXh0U3RyOiBzdHJpbmc7XHJcbiAgICAgICAgaWYgKHRoaXMuQ3VycmVudEluZm8uTGliVHlwZSA9PT0gdGhpcy5GYWNlVHlwZSkge1xyXG4gICAgICAgICAgICB0ZXh0U3RyID0gYOehruWumuimgeWIoOmZpCAke1Rhc2tNb2RlbC5OYW1lfT9gO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5DdXJyZW50SW5mby5MaWJUeXBlID09PSB0aGlzLkNhclR5cGUpIHtcclxuICAgICAgICAgICAgdGV4dFN0ciA9IGDnoa7lrpropoHliKDpmaQgJHtUYXNrTW9kZWwuUGxhdGVOdW1iZXJ9P2A7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLkN1cnJlbnRJbmZvLkxpYlR5cGUgPT09IHRoaXMuTWFjVHlwZSkge1xyXG4gICAgICAgICAgICB0ZXh0U3RyID0gYOehruWumuimgeWIoOmZpCAke1Rhc2tNb2RlbC5NYWNBZGRyZXNzfT9gO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxheWVyLmNvbmZpcm0odGV4dFN0ciwge1xyXG4gICAgICAgICAgICBpY29uOiAwLFxyXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5pMThuRmFjdG9yeSgnRFBfQ09ORklHX0NPTU1PTl80MicpLFxyXG4gICAgICAgICAgICBhcmVhOiBbXCI1MDBweFwiLCBcIjIwMHB4XCJdXHJcbiAgICAgICAgfSwgKGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZShpbmRleCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3VibWl0RGVsZXRlQnlJZHMoW1Rhc2tNb2RlbC5JRF0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKlxyXG4gICAgKiDliKDpmaTlpJrkuKpcclxuICAgICogKi9cclxuICAgIG9uQ2xpY2tEZWxldGVCeUlkcygpIHtcclxuICAgICAgICBsZXQgdGV4dFN0ciA9IFwi56Gu5a6a5Yig6Zmk77yaXCI7XHJcbiAgICAgICAgbGV0IGRlbElkcyA9IFtdIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgbGV0IHRhc2tJdGVtTW9kZWxzID0gdGhpcy5nZXRTZWxlY3RlZExpc3QoKTtcclxuICAgICAgICBpZiAodGhpcy5DdXJyZW50SW5mby5MaWJUeXBlID09PSB0aGlzLkZhY2VUeXBlKSB7XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh0YXNrSXRlbU1vZGVscywgKHZhbDogVGFza01vZGVsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0U3RyICs9IFwiPGJyLz5cIiArIHZhbC5OYW1lO1xyXG4gICAgICAgICAgICAgICAgZGVsSWRzLnB1c2godmFsLklEKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuQ3VycmVudEluZm8uTGliVHlwZSA9PT0gdGhpcy5DYXJUeXBlKSB7XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh0YXNrSXRlbU1vZGVscywgKHZhbDogQ2FyTW9uaXRvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGV4dFN0ciArPSBcIjxici8+XCIgKyB2YWwuUGxhdGVOdW1iZXI7XHJcbiAgICAgICAgICAgICAgICBkZWxJZHMucHVzaCh2YWwuSUQpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5DdXJyZW50SW5mby5MaWJUeXBlID09PSB0aGlzLk1hY1R5cGUpIHtcclxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHRhc2tJdGVtTW9kZWxzLCAodmFsOiBNYWNNb25pdG9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0U3RyICs9IFwiPGJyLz5cIiArIHZhbC5QZXJjZWl2ZURhdGE7XHJcbiAgICAgICAgICAgICAgICBkZWxJZHMucHVzaCh2YWwuSUQpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxheWVyLmNvbmZpcm0odGV4dFN0ciwge1xyXG4gICAgICAgICAgICBpY29uOiAwLFxyXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5pMThuRmFjdG9yeSgnRFBfQ09ORklHX0NPTU1PTl80MicpLFxyXG4gICAgICAgICAgICBhcmVhOiBbXCI1MDBweFwiLCBcIjIwMHB4XCJdXHJcbiAgICAgICAgfSwgKGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZShpbmRleCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3VibWl0RGVsZXRlQnlJZHMoZGVsSWRzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdWJtaXREZWxldGVCeUlkcyhpZHM6IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICBpZiAoaWRzICYmIGlkcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkN1cnJlbnRJbmZvLkxpYlR5cGUgPT09IHRoaXMuRmFjZVR5cGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFza1NlcnZpY2UuZGVsZXRlRmFjZVRhc2tGb3JJRFMoaWRzKS50aGVuKChyZXM6IFJlc3BvbnNlUmVzdWx0PHN0cmluZz4pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEZhY2VMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdEZhY2VQYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuQ3VycmVudEluZm8uTGliVHlwZSA9PT0gdGhpcy5DYXJUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tTZXJ2aWNlLmRlbGV0ZUNhclRhc2tGb3JJRFMoaWRzKS50aGVuKChyZXM6IFJlc3BvbnNlUmVzdWx0PHN0cmluZz4pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldENhckxpc3RCeVBhcmFtcyh0aGlzLmZpbmRMaXN0Q2FyUGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLkN1cnJlbnRJbmZvLkxpYlR5cGUgPT09IHRoaXMuTWFjVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXNrU2VydmljZS5kZWxldGVNYWNUYXNrRm9ySURTKGlkcykudGhlbigocmVzOiBSZXNwb25zZVJlc3VsdDxzdHJpbmc+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRNYWNMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdE1hY1BhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvLyDmiZPpkqkg6YCJ5oupIOWbnuiwg1xyXG4gICAgYWZ0ZXJDaGFuZ2VDaGVjayhyZXN1bHRMaXN0OiBBcnJheTxib29sZWFuPiwgaXNDaGVja0FsbDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0SXNTZWxlY3RJdGVtcyhyZXN1bHRMaXN0KTtcclxuICAgICAgICBpZiAodGhpcy5DdXJyZW50SW5mby5MaWJUeXBlID09PSB0aGlzLkZhY2VUeXBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRGYWNlTGlzdCA9IHJlc3VsdExpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMuaXNTZWxlY3RGYWNlQWxsID0gaXNDaGVja0FsbDtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuQ3VycmVudEluZm8uTGliVHlwZSA9PT0gdGhpcy5DYXJUeXBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDYXJMaXN0ID0gcmVzdWx0TGlzdDtcclxuICAgICAgICAgICAgdGhpcy5pc1NlbGVjdENhckFsbCA9IGlzQ2hlY2tBbGw7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLkN1cnJlbnRJbmZvLkxpYlR5cGUgPT09IHRoaXMuTWFjVHlwZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkTWFjTGlzdCA9IHJlc3VsdExpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMuaXNTZWxlY3RNYWNBbGwgPSBpc0NoZWNrQWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5blvZPliY3lt7LooqvpgInkuK3liJfooahcclxuICAgIGdldFNlbGVjdGVkTGlzdCgpOiBBcnJheTxUYXNrTW9kZWwgfCBNYWNNb25pdG9yIHwgQ2FyTW9uaXRvcj4ge1xyXG4gICAgICAgIGxldCBzZWxlY3RlZERhdGFMaXN0OiBBcnJheTxUYXNrTW9kZWwgfCBNYWNNb25pdG9yIHwgQ2FyTW9uaXRvcj4gPSBbXTtcclxuICAgICAgICBpZiAodGhpcy5DdXJyZW50SW5mby5MaWJUeXBlID09PSB0aGlzLkZhY2VUeXBlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkRmFjZUxpc3QpIHtcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh0aGlzLnRCb2R5TGlzdEZhY2UsICh2YWw6IFRhc2tNb2RlbCwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkRmFjZUxpc3RbaW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRGF0YUxpc3QucHVzaCh2YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLkN1cnJlbnRJbmZvLkxpYlR5cGUgPT09IHRoaXMuQ2FyVHlwZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZENhckxpc3QpIHtcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh0aGlzLnRCb2R5TGlzdENhciwgKHZhbDogQ2FyTW9uaXRvciwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkQ2FyTGlzdFtpbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWREYXRhTGlzdC5wdXNoKHZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuQ3VycmVudEluZm8uTGliVHlwZSA9PT0gdGhpcy5NYWNUeXBlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkTWFjTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHRoaXMudEJvZHlMaXN0TWFjLCAodmFsOiBNYWNNb25pdG9yLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRNYWNMaXN0W2luZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZERhdGFMaXN0LnB1c2godmFsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VsZWN0ZWREYXRhTGlzdDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy9hYm91dCBwYWdlIGNsaWNrXHJcbiAgICBjaGFuZ2VQYWdlKG51bTogbnVtYmVyLCB0eXBlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBpZiAodHlwZSA9PT0gdGhpcy5UYXNrVHlwZXMuRmFjZS52YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRGYWNlQnlQYWdlUGFyYW1zLmN1cnJlbnRQYWdlID0gbnVtO1xyXG4gICAgICAgICAgICB0aGlzLmdldExpc3RCeVBhZ2UodGhpcy5maW5kRmFjZUJ5UGFnZVBhcmFtcywgdHlwZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSB0aGlzLlRhc2tUeXBlcy5NYWMudmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5maW5kTWFjQnlQYWdlUGFyYW1zLmN1cnJlbnRQYWdlID0gbnVtO1xyXG4gICAgICAgICAgICB0aGlzLmdldExpc3RCeVBhZ2UodGhpcy5maW5kTWFjQnlQYWdlUGFyYW1zLCB0eXBlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IHRoaXMuVGFza1R5cGVzLkNhci52YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRDYXJCeVBhZ2VQYXJhbXMuY3VycmVudFBhZ2UgPSBudW07XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0TGlzdEJ5UGFnZSh0aGlzLmZpbmRDYXJCeVBhZ2VQYXJhbXMsIHR5cGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VQYWdlU2l6ZShudW06IG51bWJlciwgdHlwZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IHRoaXMuVGFza1R5cGVzLkZhY2UudmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5maW5kRmFjZUJ5UGFnZVBhcmFtcy5wYWdlU2l6ZSA9IG51bTtcclxuICAgICAgICAgICAgdGhpcy5nZXRMaXN0QnlQYWdlKHRoaXMuZmluZEZhY2VCeVBhZ2VQYXJhbXMsIHR5cGUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gdGhpcy5UYXNrVHlwZXMuTWFjLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmluZE1hY0J5UGFnZVBhcmFtcy5wYWdlU2l6ZSA9IG51bTtcclxuICAgICAgICAgICAgdGhpcy5nZXRMaXN0QnlQYWdlKHRoaXMuZmluZE1hY0J5UGFnZVBhcmFtcywgdHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRvciB3eXI6IOWIpOaWreWSjOiuvue9ruW9k+WJjeWIl+ihqOaYr+WQpuaciemAieS4reeahOWFg+e0oFxyXG4gICAgICogQHBhcmFtIGl0ZW1zXHJcbiAgICAgKi9cclxuICAgIHNldElzU2VsZWN0SXRlbXMoaXRlbXM6IEFycmF5PGJvb2xlYW4+KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChpdGVtcyAmJiBpdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBpLCBsZW47XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGl0ZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbXNbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnRJbmZvLkxpYlR5cGUgPT09IHRoaXMuRmFjZVR5cGUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNTZWxlY3RGYWNlSXRlbXMgIT09IHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1NlbGVjdEZhY2VJdGVtcyA9IHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5DdXJyZW50SW5mby5MaWJUeXBlID09PSB0aGlzLkNhclR5cGUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNTZWxlY3RDYXJJdGVtcyAhPT0gcmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzU2VsZWN0Q2FySXRlbXMgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuQ3VycmVudEluZm8uTGliVHlwZSA9PT0gdGhpcy5NYWNUeXBlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2VsZWN0TWFjSXRlbXMgIT09IHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1NlbGVjdE1hY0l0ZW1zID0gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoXCJ0YXNrQ29uZmlnQ29udHJvbGxlclwiLCBUYXNrQ29udHJvbGxlcik7Il19
