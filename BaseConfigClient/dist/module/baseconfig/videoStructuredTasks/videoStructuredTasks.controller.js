define(["require", "exports", "../../common/app/main.app", "../../common/directive/tree/tree-params", "../../common/Pagination", "../../../core/server/enum/TaskType", "../../../core/server/TaskModel", "../../../core/server/enum/TaskStatus", "../../../core/server/enum/AuditStatus", "css!../css/baseconfig-task.css", "../../common/directive/tree/tree.directive.service", "../../common/services/videoStructuredTasks.service", "../../common/services/area.service", "../../common/factory/layerMsg.factory", "../../common/factory/userinfo.cache.factory"], function (require, exports, main_app_1, tree_params_1, Pagination_1, TaskType_1, TaskModel_1, TaskStatus_1, AuditStatus_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var VideoStructuredTasksController = (function () {
        function VideoStructuredTasksController($scope, $timeout, $state, layer, i18nFactory, areaService, videoStructuredTasksService, treeService, layerDec, userInfoCacheFactory) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.$state = $state;
            this.layer = layer;
            this.i18nFactory = i18nFactory;
            this.areaService = areaService;
            this.videoStructuredTasksService = videoStructuredTasksService;
            this.treeService = treeService;
            this.layerDec = layerDec;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.currentType = TaskType_1.StructTask.FaceStruct.value;
            this.areaTreeSearchInputStr = null;
            this.pageResultFace = new Pagination_1.PageParamsAndResult();
            this.searchParams = new TaskModel_1.TaskSearchParams();
            this.facePagination = new Pagination_1.Pagination();
            this.FaceAreaName = null;
            this.isSelectFaceAll = false;
            this.isSelectFaceItems = false;
            this.initTableParamsData();
            this.initTypeOptions();
            this.initStatusLib();
            this.initAreaTreeParams();
            this.getAreaTreeList();
        }
        ;
        VideoStructuredTasksController.prototype.initStatusLib = function () {
            var monitorStatus = [];
            var auditStatus = [];
            for (var k in TaskStatus_1.TaskStatus) {
                monitorStatus.push({ value: TaskStatus_1.TaskStatus[k].value, text: TaskStatus_1.TaskStatus[k].text });
            }
            for (var k in AuditStatus_1.AuditStatus) {
                auditStatus.push({ value: AuditStatus_1.AuditStatus[k].value, text: AuditStatus_1.AuditStatus[k].text });
            }
            this.MonitorStatusLib = monitorStatus;
            this.VideoAuditStatusLib = auditStatus;
        };
        VideoStructuredTasksController.prototype.initTypeOptions = function () {
            var resultList = [];
            for (var k in TaskType_1.StructTask) {
                resultList.push(TaskType_1.StructTask[k]);
            }
            this.taskTypeBtnList = resultList;
        };
        ;
        VideoStructuredTasksController.prototype.onClickTaskTypeBtn = function (btnItem) {
        };
        ;
        VideoStructuredTasksController.prototype.initTableParamsData = function () {
            this.tFaceHeadList = [
                { field: "Name", title: "DP_VIDEOSTRUCTURE_07" },
                { field: "AreaName", title: "DP_VIDEOSTRUCTURE_08" },
                { field: "CreateUserName", title: "DP_VIDEOSTRUCTURE_09" },
                { field: "EffiTime", title: "DP_VIDEOSTRUCTURE_10" },
                { field: "VideoAuditStatus", title: "DP_VIDEOSTRUCTURE_03" },
                { field: "status", title: "DP_VIDEOSTRUCTURE_04" },
                { field: "Auth", title: "DP_VIDEOSTRUCTURE_11" },
                { field: "", title: "DP_CONFIG_COMMON_15" }
            ];
        };
        VideoStructuredTasksController.prototype.onClickSearch = function () {
        };
        ;
        VideoStructuredTasksController.prototype.initAreaTreeParams = function () {
            var _this = this;
            this.areaTreeDatas = new tree_params_1.TreeDataParams();
            this.areaTreeDatas.treeId = 'areaTreeByTaskConfig';
            this.searchParams.userId = this.userInfoCacheFactory.getCurrentUserId();
            this.areaTreeDatas.onClick = function (event, treeId, treeNode) {
                _this.searchParams.areaId = treeNode.ID;
                _this.getFaceListByParams();
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
        VideoStructuredTasksController.prototype.getAreaTreeList = function (keyword) {
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
        VideoStructuredTasksController.prototype.areaTreeSearchInputKeyUp = function (e) {
            if (e.keyCode === 13) {
                this.getAreaTreeList(this.areaTreeSearchInputStr);
            }
        };
        ;
        VideoStructuredTasksController.prototype.areaTreeSearchInput = function () {
            this.getAreaTreeList(this.areaTreeSearchInputStr);
        };
        ;
        VideoStructuredTasksController.prototype.getFaceListByParams = function () {
            var _this = this;
            console.log(this.pageResultFace);
            this.videoStructuredTasksService.findFaceListByParams(this.searchParams).then(function (res) {
                _this.facePagination.set(res.data);
                _this.pageResultFace = _this.facePagination.getByPage(_this.pageResultFace);
            });
        };
        ;
        VideoStructuredTasksController.prototype.goToUpdateTask = function (taskItem) {
            this.$state.go('baseconfig.videoStructuredTasks.videoNewFaceTask', {
                taskId: taskItem.ID,
                areaId: taskItem.AreaID,
                type: 'FaceStruct'
            });
        };
        ;
        VideoStructuredTasksController.prototype.goNewMonitor = function (type) {
            this.$state.go('baseconfig.videoStructuredTasks.videoNewFaceTask', {
                areaId: this.searchParams.areaId,
                type: 'FaceStruct'
            });
        };
        ;
        VideoStructuredTasksController.prototype.changeTaskRunStatus = function (taskItem) {
            var _this = this;
            console.log(taskItem);
            if (taskItem.AuditStatus === AuditStatus_1.AuditStatus.Verified.value && taskItem.Status === TaskStatus_1.TaskStatus.Stop.value) {
                var textStr = void 0;
                textStr = "\u60A8\u786E\u5B9A\u542F\u52A8 " + taskItem.Name + "?";
                this.layer.confirm(textStr, {
                    icon: 0,
                    title: this.i18nFactory('DP_CONFIG_COMMON_47'),
                    area: ["500px", "200px"]
                }, function (index) {
                    _this.layer.close(index);
                    _this.submitChangeRunStatus([taskItem.ID], true);
                });
            }
            else if (taskItem.Status === TaskStatus_1.TaskStatus.Run.value && taskItem.AuditStatus === AuditStatus_1.AuditStatus.Verified.value) {
                var textStr = void 0;
                textStr = "\u60A8\u786E\u5B9A\u505C\u6B62 " + taskItem.Name + "?";
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
        VideoStructuredTasksController.prototype.onClickTaskRunStatusBy = function (isStart) {
            var _this = this;
            var textStr = isStart ? "确定开启:" : "确定暂停：";
            var delIds = [];
            var taskItemModels = this.getSelectedList();
            console.log(taskItemModels);
            angular.forEach(taskItemModels, function (val) {
                textStr += "<br/>" + val.Name;
                delIds.push(val.ID);
            });
            if (delIds.length > 0) {
                this.layer.confirm(textStr, {
                    icon: 0,
                    title: this.i18nFactory('DP_CONFIG_COMMON_42'),
                    area: ["500px", "200px"]
                }, function (index) {
                    _this.layer.close(index);
                    _this.submitChangeRunStatus(delIds, isStart);
                });
            }
            else {
                this.layerDec.warnInfo(isStart ? "当前没有可开启的任务！" : "当前没有可暂停的任务！");
            }
        };
        ;
        VideoStructuredTasksController.prototype.submitChangeRunStatus = function (ids, isStart) {
            var _this = this;
            if (ids && ids.length > 0) {
                var idL = ids.join(',');
                this.videoStructuredTasksService.updateFaceRunStatus(idL, isStart).then(function (resp) {
                    console.log(resp);
                    if (resp && resp.data.code == 200) {
                        console.log("5");
                        _this.getFaceListByParams();
                    }
                    else {
                        console.error(resp);
                    }
                });
            }
        };
        ;
        VideoStructuredTasksController.prototype.onClickDeleteById = function (taskItemModel) {
            var _this = this;
            var textStr;
            textStr = "\u786E\u5B9A\u8981\u5220\u9664 " + taskItemModel.Name + "?";
            this.layer.confirm(textStr, {
                icon: 0,
                title: this.i18nFactory('DP_CONFIG_COMMON_42'),
                area: ["500px", "200px"]
            }, function (index) {
                _this.layer.close(index);
                _this.submitDeleteByIds([taskItemModel.ID]);
            });
        };
        ;
        VideoStructuredTasksController.prototype.onClickDeleteByIds = function () {
            var _this = this;
            var textStr = "确定删除：";
            var delIds = [];
            var taskItemModels = this.getSelectedList();
            angular.forEach(taskItemModels, function (val) {
                textStr += "<br/>" + val.Name;
                delIds.push(val.ID);
            });
            this.layer.confirm(textStr, {
                icon: 0,
                title: this.i18nFactory('DP_CONFIG_COMMON_42'),
                area: ["500px", "200px"]
            }, function (index) {
                _this.layer.close(index);
                _this.submitDeleteByIds(delIds);
            });
        };
        VideoStructuredTasksController.prototype.submitDeleteByIds = function (ids) {
            var _this = this;
            if (ids && ids.length > 0) {
                this.videoStructuredTasksService.deleteFaceTaskForIDS(ids).then(function (resp) {
                    var res = resp.data;
                    if (res) {
                        _this.getFaceListByParams();
                    }
                });
            }
        };
        ;
        VideoStructuredTasksController.prototype.afterChangeCheck = function (resultList, isCheckAll) {
            console.log(resultList);
            this.setIsSelectItems(resultList);
            this.selectedFaceList = resultList;
            this.isSelectFaceAll = isCheckAll;
        };
        VideoStructuredTasksController.prototype.getSelectedList = function () {
            var _this = this;
            var selectedDataList = [];
            if (this.selectedFaceList) {
                angular.forEach(this.pageResultFace.data, function (val, index) {
                    if (_this.selectedFaceList[index]) {
                        selectedDataList.push(val);
                    }
                });
            }
            return selectedDataList;
        };
        VideoStructuredTasksController.prototype.changePage = function (num, type) {
            var _this = this;
            this.pageResultFace.currentPage = num;
            this.$timeout(function () {
                _this.pageResultFace = _this.facePagination.getByPage(_this.pageResultFace);
            });
        };
        VideoStructuredTasksController.prototype.changePageSize = function (num, type) {
            var _this = this;
            this.pageResultFace.pageSize = num;
            this.pageResultFace.currentPage = 1;
            this.$timeout(function () {
                _this.pageResultFace = _this.facePagination.getByPage(_this.pageResultFace);
            });
        };
        VideoStructuredTasksController.prototype.setIsSelectItems = function (items) {
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
            if (this.isSelectFaceItems !== result) {
                this.isSelectFaceItems = result;
            }
        };
        VideoStructuredTasksController.$inject = [
            '$scope',
            '$timeout',
            '$state',
            'layer',
            'i18nFactory',
            'areaService',
            'videoStructuredTasksService',
            'treeDirectiveService',
            'layerDec',
            'userInfoCacheFactory'
        ];
        return VideoStructuredTasksController;
    }());
    main_app_1.app.controller("VideoStructuredTasksController", VideoStructuredTasksController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy92aWRlb1N0cnVjdHVyZWRUYXNrcy92aWRlb1N0cnVjdHVyZWRUYXNrcy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQXFDQTtRQW9DSSx3Q0FBb0IsTUFBVyxFQUNYLFFBQWEsRUFDYixNQUFXLEVBQ1gsS0FBVSxFQUNWLFdBQXFCLEVBQ3JCLFdBQXlCLEVBQ3pCLDJCQUF5RCxFQUN6RCxXQUFrQyxFQUNsQyxRQUFrQixFQUNsQixvQkFBMEM7WUFUMUMsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLGFBQVEsR0FBUixRQUFRLENBQUs7WUFDYixXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQ1gsVUFBSyxHQUFMLEtBQUssQ0FBSztZQUNWLGdCQUFXLEdBQVgsV0FBVyxDQUFVO1lBQ3JCLGdCQUFXLEdBQVgsV0FBVyxDQUFjO1lBQ3pCLGdDQUEyQixHQUEzQiwyQkFBMkIsQ0FBOEI7WUFDekQsZ0JBQVcsR0FBWCxXQUFXLENBQXVCO1lBQ2xDLGFBQVEsR0FBUixRQUFRLENBQVU7WUFDbEIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtZQTNDOUQsZ0JBQVcsR0FBVyxxQkFBVSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7WUFNbEQsMkJBQXNCLEdBQVcsSUFBSSxDQUFDO1lBR3RDLG1CQUFjLEdBQXdCLElBQUksZ0NBQW1CLEVBQUUsQ0FBQztZQUVoRSxpQkFBWSxHQUFxQixJQUFJLDRCQUFnQixFQUFFLENBQUM7WUFDeEQsbUJBQWMsR0FBZ0IsSUFBSSx1QkFBVSxFQUFFLENBQUM7WUFFL0MsaUJBQVksR0FBVyxJQUFJLENBQUM7WUFHNUIsb0JBQWUsR0FBWSxLQUFLLENBQUM7WUFFakMsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1lBMEIvQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxD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NUIsSUFBSSxDQUFDLFNBQUEsRUFBRSxHQUFHLFNBQUEsQ0FBQztnQkFDWCxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDM0MsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDWCxNQUFNLEdBQUcsSUFBSSxDQUFDO3dCQUNkLEtBQUssQ0FBQztvQkFDVixDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUM7WUFDcEMsQ0FBQztRQUNMLENBQUM7UUEvVU0sc0NBQU8sR0FBRztZQUNiLFFBQVE7WUFDUixVQUFVO1lBQ1YsUUFBUTtZQUNSLE9BQU87WUFDUCxhQUFhO1lBQ2IsYUFBYTtZQUNiLDZCQUE2QjtZQUM3QixzQkFBc0I7WUFDdEIsVUFBVTtZQUNWLHNCQUFzQjtTQUN6QixDQUFDO1FBc1VOLHFDQUFDO0tBeFdELEFBd1dDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLGdDQUFnQyxFQUFFLDhCQUE4QixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2Jhc2Vjb25maWcvdmlkZW9TdHJ1Y3R1cmVkVGFza3MvdmlkZW9TdHJ1Y3R1cmVkVGFza3MuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcImNzcyEuLi9jc3MvYmFzZWNvbmZpZy10YXNrLmNzc1wiO1xyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IHtJVHJlZURhdGFQYXJhbXMsIFRyZWVEYXRhUGFyYW1zfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUtcGFyYW1zXCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLmRpcmVjdGl2ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SVRyZWVEaXJlY3RpdmVTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUuZGlyZWN0aXZlLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy92aWRlb1N0cnVjdHVyZWRUYXNrcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SVZpZGVvU3RydWN0dXJlZFRhc2tzU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy92aWRlb1N0cnVjdHVyZWRUYXNrcy5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQge0FyZWFFeH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0FyZWFFeFwiO1xyXG5pbXBvcnQge0lUYWJsZUhlYWRlcn0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdW5pdC10YWJsZS90YWJsZS1wYXJhbXNcIjtcclxuXHJcblxyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vc2VydmljZXMvYXJlYS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SUFyZWFTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FyZWEuc2VydmljZVwiO1xyXG5cclxuXHJcbmltcG9ydCB7VHJlZVBhcmFtc30gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3RyZWUvVHJlZVBhcmFtc1wiO1xyXG5cclxuaW1wb3J0IHtJUGFnaW5hdGlvbiwgUGFnZVBhcmFtc0FuZFJlc3VsdCwgUGFnaW5hdGlvbn0gZnJvbSAnLi4vLi4vY29tbW9uL1BhZ2luYXRpb24nO1xyXG5cclxuaW1wb3J0IHtSZXNwb25zZVJlc3VsdH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdFwiO1xyXG5cclxuaW1wb3J0IHtFbnVtfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnVtL0VudW1cIjtcclxuaW1wb3J0IHtTdHJ1Y3RUYXNrfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2ZXIvZW51bS9UYXNrVHlwZVwiO1xyXG5cclxuaW1wb3J0IHtUYXNrTW9kZWwsIENhck1vbml0b3IsIFRhc2tTZWFyY2hQYXJhbXN9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9UYXNrTW9kZWxcIjtcclxuaW1wb3J0IHtUYXNrU3RhdHVzfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2ZXIvZW51bS9UYXNrU3RhdHVzXCI7XHJcbmltcG9ydCB7QXVkaXRTdGF0dXN9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL0F1ZGl0U3RhdHVzXCI7XHJcbmltcG9ydCB7SUxheWVyRGVjfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZhY3RvcnkvbGF5ZXJNc2cuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vZmFjdG9yeS9sYXllck1zZy5mYWN0b3J5XCI7XHJcbmltcG9ydCB7SVVzZXJJbmZvQ2FjaGVGYWN0b3J5fSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZhY3RvcnkvdXNlcmluZm8uY2FjaGUuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vZmFjdG9yeS91c2VyaW5mby5jYWNoZS5mYWN0b3J5XCI7XHJcbmRlY2xhcmUgbGV0IHdpbmRvdzogYW55O1xyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcblxyXG5cclxuY2xhc3MgVmlkZW9TdHJ1Y3R1cmVkVGFza3NDb250cm9sbGVyIHtcclxuICAgIGN1cnJlbnRVc2VySWQ6IHN0cmluZztcclxuICAgIGN1cnJlbnRUeXBlOiBzdHJpbmcgPSBTdHJ1Y3RUYXNrLkZhY2VTdHJ1Y3QudmFsdWU7XHJcbiAgICB0YXNrVHlwZUJ0bkxpc3Q6IEFycmF5PEVudW0+O1xyXG4gICAgTW9uaXRvclN0YXR1c0xpYjogQXJyYXk8RW51bT47XHJcbiAgICBWaWRlb0F1ZGl0U3RhdHVzTGliOiBBcnJheTxFbnVtPjtcclxuICAgIC8vIOmAieaLqeihjOaUv+WMuuWfn+agkVxyXG4gICAgYXJlYVRyZWVEYXRhczogSVRyZWVEYXRhUGFyYW1zPEFyZWFFeD47XHJcbiAgICBhcmVhVHJlZVNlYXJjaElucHV0U3RyOiBzdHJpbmcgPSBudWxsO1xyXG4gICAgLypUT0RPIOaOpeWPo+aaguaXoCDmj5DkvpvliIbpobXlip/og70qL1xyXG4gICAgLy8tLS0tLS1kaXJlY3RpdmUgcGFnZXMgcGFyYW1zXHJcbiAgICBwYWdlUmVzdWx0RmFjZTogUGFnZVBhcmFtc0FuZFJlc3VsdCA9IG5ldyBQYWdlUGFyYW1zQW5kUmVzdWx0KCk7XHJcbiAgICAvL+iOt+WPluW4g+aOp+WIl+ihqOivt+axguWPguaVsFxyXG4gICAgc2VhcmNoUGFyYW1zOiBUYXNrU2VhcmNoUGFyYW1zID0gbmV3IFRhc2tTZWFyY2hQYXJhbXMoKTtcclxuICAgIGZhY2VQYWdpbmF0aW9uOiBJUGFnaW5hdGlvbiA9IG5ldyBQYWdpbmF0aW9uKCk7XHJcbiAgICAvLyB0YWJsZSDliJfooajmlbDmja5cclxuICAgIEZhY2VBcmVhTmFtZTogc3RyaW5nID0gbnVsbDtcclxuICAgIHRGYWNlSGVhZExpc3Q6IEFycmF5PElUYWJsZUhlYWRlcj47XHJcbiAgICBzZWxlY3RlZEZhY2VMaXN0OiBBcnJheTxib29sZWFuPjtcclxuICAgIGlzU2VsZWN0RmFjZUFsbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLy8gYWx0ZXIgd3lyOiDnlKjkuo7liKTmlq3lvZPliY3nlYzpnaLkuIrnmoTliJfooajmmK/lkKbooqvpgInkuK1cclxuICAgIGlzU2VsZWN0RmFjZUl0ZW1zOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBjdXJyZW50TGF5ZXJJbmRleDogbnVtYmVyO1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbXHJcbiAgICAgICAgJyRzY29wZScsXHJcbiAgICAgICAgJyR0aW1lb3V0JyxcclxuICAgICAgICAnJHN0YXRlJyxcclxuICAgICAgICAnbGF5ZXInLFxyXG4gICAgICAgICdpMThuRmFjdG9yeScsXHJcbiAgICAgICAgJ2FyZWFTZXJ2aWNlJyxcclxuICAgICAgICAndmlkZW9TdHJ1Y3R1cmVkVGFza3NTZXJ2aWNlJyxcclxuICAgICAgICAndHJlZURpcmVjdGl2ZVNlcnZpY2UnLFxyXG4gICAgICAgICdsYXllckRlYycsXHJcbiAgICAgICAgJ3VzZXJJbmZvQ2FjaGVGYWN0b3J5J1xyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSAkc3RhdGU6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbGF5ZXI6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgaTE4bkZhY3Rvcnk6IEZ1bmN0aW9uLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBhcmVhU2VydmljZTogSUFyZWFTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB2aWRlb1N0cnVjdHVyZWRUYXNrc1NlcnZpY2U6IElWaWRlb1N0cnVjdHVyZWRUYXNrc1NlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHRyZWVTZXJ2aWNlOiBJVHJlZURpcmVjdGl2ZVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGxheWVyRGVjOklMYXllckRlYyxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgdXNlckluZm9DYWNoZUZhY3Rvcnk6SVVzZXJJbmZvQ2FjaGVGYWN0b3J5KSB7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdFRhYmxlUGFyYW1zRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuaW5pdFR5cGVPcHRpb25zKCk7XHJcbiAgICAgICAgdGhpcy5pbml0U3RhdHVzTGliKCk7XHJcbiAgICAgICAgdGhpcy5pbml0QXJlYVRyZWVQYXJhbXMoKTtcclxuICAgICAgICB0aGlzLmdldEFyZWFUcmVlTGlzdCgpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8g5p6a5Li+6I635Y+W57G75Z6L5YiX6KGoXHJcbiAgICBwcml2YXRlIGluaXRTdGF0dXNMaWIoKSB7XHJcbiAgICAgICAgbGV0IG1vbml0b3JTdGF0dXMgPSBbXSBhcyBBcnJheTxFbnVtPjtcclxuICAgICAgICBsZXQgYXVkaXRTdGF0dXMgPSBbXSBhcyBBcnJheTxFbnVtPjtcclxuICAgICAgICBmb3IgKGxldCBrIGluIFRhc2tTdGF0dXMpIHtcclxuICAgICAgICAgICAgbW9uaXRvclN0YXR1cy5wdXNoKHt2YWx1ZTogVGFza1N0YXR1c1trXS52YWx1ZSwgdGV4dDogVGFza1N0YXR1c1trXS50ZXh0fSBhcyBFbnVtKVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBrIGluIEF1ZGl0U3RhdHVzKSB7XHJcbiAgICAgICAgICAgIGF1ZGl0U3RhdHVzLnB1c2goe3ZhbHVlOiBBdWRpdFN0YXR1c1trXS52YWx1ZSwgdGV4dDogQXVkaXRTdGF0dXNba10udGV4dH0gYXMgRW51bSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5Nb25pdG9yU3RhdHVzTGliID0gbW9uaXRvclN0YXR1cztcclxuICAgICAgICB0aGlzLlZpZGVvQXVkaXRTdGF0dXNMaWIgPSBhdWRpdFN0YXR1cztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0VHlwZU9wdGlvbnMoKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdExpc3QgPSBbXSBhcyBBcnJheTxFbnVtPjtcclxuICAgICAgICBmb3IgKGxldCBrIGluIFN0cnVjdFRhc2spIHtcclxuICAgICAgICAgICAgcmVzdWx0TGlzdC5wdXNoKFN0cnVjdFRhc2tba10pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRhc2tUeXBlQnRuTGlzdCA9IHJlc3VsdExpc3Q7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBvbkNsaWNrVGFza1R5cGVCdG4oYnRuSXRlbTogRW51bSkge1xyXG5cclxuICAgIH07XHJcblxyXG5cclxuICAgIGluaXRUYWJsZVBhcmFtc0RhdGEoKSB7XHJcbiAgICAgICAgdGhpcy50RmFjZUhlYWRMaXN0ID0gW1xyXG4gICAgICAgICAgICB7ZmllbGQ6IFwiTmFtZVwiLCB0aXRsZTogXCJEUF9WSURFT1NUUlVDVFVSRV8wN1wifSxcclxuICAgICAgICAgICAge2ZpZWxkOiBcIkFyZWFOYW1lXCIsIHRpdGxlOiBcIkRQX1ZJREVPU1RSVUNUVVJFXzA4XCJ9LFxyXG4gICAgICAgICAgICB7ZmllbGQ6IFwiQ3JlYXRlVXNlck5hbWVcIiwgdGl0bGU6IFwiRFBfVklERU9TVFJVQ1RVUkVfMDlcIn0sXHJcbiAgICAgICAgICAgIHtmaWVsZDogXCJFZmZpVGltZVwiLCB0aXRsZTogXCJEUF9WSURFT1NUUlVDVFVSRV8xMFwifSxcclxuICAgICAgICAgICAge2ZpZWxkOiBcIlZpZGVvQXVkaXRTdGF0dXNcIiwgdGl0bGU6IFwiRFBfVklERU9TVFJVQ1RVUkVfMDNcIn0sXHJcbiAgICAgICAgICAgIHtmaWVsZDogXCJzdGF0dXNcIiwgdGl0bGU6IFwiRFBfVklERU9TVFJVQ1RVUkVfMDRcIn0sXHJcbiAgICAgICAgICAgIHtmaWVsZDogXCJBdXRoXCIsIHRpdGxlOiBcIkRQX1ZJREVPU1RSVUNUVVJFXzExXCJ9LFxyXG4gICAgICAgICAgICB7ZmllbGQ6IFwiXCIsIHRpdGxlOiBcIkRQX0NPTkZJR19DT01NT05fMTVcIn1cclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+adoeS7tuaQnOe0ouS7u+WKoeWIl+ihqFxyXG4gICAgb25DbGlja1NlYXJjaCgpIHtcclxuXHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tIOagkeWIlyDmk43kvZzlh73mlbBcclxuICAgIGluaXRBcmVhVHJlZVBhcmFtcygpIHtcclxuICAgICAgICAvLyDmoJHliJfooajmlbDmja5cclxuICAgICAgICAvL+WIneWni+WMliBhcmVhIOagkeaVsOaNrlxyXG4gICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcyA9IG5ldyBUcmVlRGF0YVBhcmFtczxBcmVhRXg+KCk7XHJcbiAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzLnRyZWVJZCA9ICdhcmVhVHJlZUJ5VGFza0NvbmZpZyc7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hQYXJhbXMudXNlcklkID10aGlzLnVzZXJJbmZvQ2FjaGVGYWN0b3J5LmdldEN1cnJlbnRVc2VySWQoKTtcclxuICAgICAgICAvLyDoioLngrnpgInmi6lcclxuICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMub25DbGljayA9IChldmVudDogTW91c2VFdmVudCwgdHJlZUlkOiBzdHJpbmcsIHRyZWVOb2RlOiBBcmVhRXgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hQYXJhbXMuYXJlYUlkID0gdHJlZU5vZGUuSUQ7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RmFjZUxpc3RCeVBhcmFtcygpO1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBub3dBcmVhID0gdGhpcy50cmVlU2VydmljZS5nZXROb2RlQnlQYXJhbSh0aGlzLmFyZWFUcmVlRGF0YXMudHJlZUlkLCAnSUQnLCB0cmVlTm9kZS5JRCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkZhY2VBcmVhTmFtZSA9IG5vd0FyZWEuTmFtZTtcclxuICAgICAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzLnRyZWVJbml0Q29tcGxldGUgPSAodHJlZUlkOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLliJ3lp4vljJbluIPmjqfku7vliqHliJfooagg5Zyw5Yy65qCRXCIsIHRyZWVJZCk7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgLy8g5pWw5o2u6I635Y+WXHJcbiAgICBnZXRBcmVhVHJlZUxpc3Qoa2V5d29yZD86IHN0cmluZykge1xyXG4gICAgICAgIGxldCBwYXJhbXM6IFRyZWVQYXJhbXMgPSB0aGlzLmFyZWFUcmVlRGF0YXMucmVxUGFyYW1zO1xyXG4gICAgICAgIHBhcmFtcy5rZXl3b3JkID0ga2V5d29yZDtcclxuICAgICAgICB0aGlzLmFyZWFTZXJ2aWNlLmZpbmRMaXN0VHJlZShwYXJhbXMpLnRoZW4oKHJlc3A6IEFycmF5PEFyZWFFeD4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzLmZpbmlzaGVkTm9EYXRhID0gIXJlc3A7XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzLnRyZWVEYXRhcyA9IHJlc3BcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH07XHJcblxyXG4gICAgLy8g5qCR5pCc57SiXHJcbiAgICBhcmVhVHJlZVNlYXJjaElucHV0S2V5VXAoZTogYW55KSB7XHJcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRBcmVhVHJlZUxpc3QodGhpcy5hcmVhVHJlZVNlYXJjaElucHV0U3RyKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIOagkeaQnOe0olxyXG4gICAgYXJlYVRyZWVTZWFyY2hJbnB1dCgpIHtcclxuICAgICAgICB0aGlzLmdldEFyZWFUcmVlTGlzdCh0aGlzLmFyZWFUcmVlU2VhcmNoSW5wdXRTdHIpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgZ2V0RmFjZUxpc3RCeVBhcmFtcygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnBhZ2VSZXN1bHRGYWNlKVxyXG4gICAgICAgIHRoaXMudmlkZW9TdHJ1Y3R1cmVkVGFza3NTZXJ2aWNlLmZpbmRGYWNlTGlzdEJ5UGFyYW1zKHRoaXMuc2VhcmNoUGFyYW1zKS50aGVuKChyZXM6IFJlc3BvbnNlUmVzdWx0PEFycmF5PFRhc2tNb2RlbD4+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjZVBhZ2luYXRpb24uc2V0KHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5wYWdlUmVzdWx0RmFjZSA9IHRoaXMuZmFjZVBhZ2luYXRpb24uZ2V0QnlQYWdlKHRoaXMucGFnZVJlc3VsdEZhY2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLy/liY3lvoAg5pu05pawXHJcbiAgICBnb1RvVXBkYXRlVGFzayh0YXNrSXRlbTogVGFza01vZGVsICYgQ2FyTW9uaXRvcikge1xyXG4gICAgICAgIHRoaXMuJHN0YXRlLmdvKCdiYXNlY29uZmlnLnZpZGVvU3RydWN0dXJlZFRhc2tzLnZpZGVvTmV3RmFjZVRhc2snLCB7XHJcbiAgICAgICAgICAgIHRhc2tJZDogdGFza0l0ZW0uSUQsXHJcbiAgICAgICAgICAgIGFyZWFJZDogdGFza0l0ZW0uQXJlYUlELFxyXG4gICAgICAgICAgICB0eXBlOiAnRmFjZVN0cnVjdCdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGdvTmV3TW9uaXRvcih0eXBlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLiRzdGF0ZS5nbygnYmFzZWNvbmZpZy52aWRlb1N0cnVjdHVyZWRUYXNrcy52aWRlb05ld0ZhY2VUYXNrJywge1xyXG4gICAgICAgICAgICBhcmVhSWQ6IHRoaXMuc2VhcmNoUGFyYW1zLmFyZWFJZCxcclxuICAgICAgICAgICAgdHlwZTogJ0ZhY2VTdHJ1Y3QnXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIOaUueWPmOi/kOihjO+8jOi/h+acn+S4jeWBmuaTjeS9nCAg5YGc5q2iL+i/kOihjCDliIfmjaJcclxuICAgIGNoYW5nZVRhc2tSdW5TdGF0dXModGFza0l0ZW06IFRhc2tNb2RlbCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRhc2tJdGVtKVxyXG4gICAgICAgIGlmICh0YXNrSXRlbS5BdWRpdFN0YXR1cyA9PT0gQXVkaXRTdGF0dXMuVmVyaWZpZWQudmFsdWUgJiYgdGFza0l0ZW0uU3RhdHVzID09PSBUYXNrU3RhdHVzLlN0b3AudmFsdWUpIHtcclxuICAgICAgICAgICAgbGV0IHRleHRTdHI6IHN0cmluZztcclxuICAgICAgICAgICAgdGV4dFN0ciA9IGDmgqjnoa7lrprlkK/liqggJHt0YXNrSXRlbS5OYW1lfT9gO1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLmNvbmZpcm0odGV4dFN0ciwge1xyXG4gICAgICAgICAgICAgICAgaWNvbjogMCxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLmkxOG5GYWN0b3J5KCdEUF9DT05GSUdfQ09NTU9OXzQ3JyksXHJcbiAgICAgICAgICAgICAgICBhcmVhOiBbXCI1MDBweFwiLCBcIjIwMHB4XCJdXHJcbiAgICAgICAgICAgIH0sIChpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyLmNsb3NlKGluZGV4KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3VibWl0Q2hhbmdlUnVuU3RhdHVzKFt0YXNrSXRlbS5JRF0sIHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmICh0YXNrSXRlbS5TdGF0dXMgPT09IFRhc2tTdGF0dXMuUnVuLnZhbHVlICYmIHRhc2tJdGVtLkF1ZGl0U3RhdHVzID09PSBBdWRpdFN0YXR1cy5WZXJpZmllZC52YWx1ZSkge1xyXG4gICAgICAgICAgICBsZXQgdGV4dFN0cjogc3RyaW5nO1xyXG4gICAgICAgICAgICB0ZXh0U3RyID0gYOaCqOehruWumuWBnOatoiAke3Rhc2tJdGVtLk5hbWV9P2A7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIuY29uZmlybSh0ZXh0U3RyLCB7XHJcbiAgICAgICAgICAgICAgICBpY29uOiAwLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMuaTE4bkZhY3RvcnkoJ0RQX0NPTkZJR19DT01NT05fNDcnKSxcclxuICAgICAgICAgICAgICAgIGFyZWE6IFtcIjUwMHB4XCIsIFwiMjAwcHhcIl1cclxuICAgICAgICAgICAgfSwgKGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGF5ZXIuY2xvc2UoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdWJtaXRDaGFuZ2VSdW5TdGF0dXMoW3Rhc2tJdGVtLklEXSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgb25DbGlja1Rhc2tSdW5TdGF0dXNCeShpc1N0YXJ0OiBib29sZWFuKSB7XHJcbiAgICAgICAgbGV0IHRleHRTdHIgPSBpc1N0YXJ0ID8gXCLnoa7lrprlvIDlkK86XCIgOiBcIuehruWumuaaguWBnO+8mlwiO1xyXG4gICAgICAgIGxldCBkZWxJZHMgPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIGxldCB0YXNrSXRlbU1vZGVscyA9IHRoaXMuZ2V0U2VsZWN0ZWRMaXN0KCk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGFza0l0ZW1Nb2RlbHMpO1xyXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh0YXNrSXRlbU1vZGVscywgKHZhbDogVGFza01vZGVsKSA9PiB7XHJcbiAgICAgICAgICAgIHRleHRTdHIgKz0gXCI8YnIvPlwiICsgdmFsLk5hbWU7XHJcbiAgICAgICAgICAgIGRlbElkcy5wdXNoKHZhbC5JRClcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoZGVsSWRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5jb25maXJtKHRleHRTdHIsIHtcclxuICAgICAgICAgICAgICAgIGljb246IDAsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5pMThuRmFjdG9yeSgnRFBfQ09ORklHX0NPTU1PTl80MicpLFxyXG4gICAgICAgICAgICAgICAgYXJlYTogW1wiNTAwcHhcIiwgXCIyMDBweFwiXVxyXG4gICAgICAgICAgICB9LCAoaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZShpbmRleCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1Ym1pdENoYW5nZVJ1blN0YXR1cyhkZWxJZHMsIGlzU3RhcnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyRGVjLndhcm5JbmZvKGlzU3RhcnQgPyBcIuW9k+WJjeayoeacieWPr+W8gOWQr+eahOS7u+WKoe+8gVwiIDogXCLlvZPliY3msqHmnInlj6/mmoLlgZznmoTku7vliqHvvIFcIilcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvLyDnoa7lrprmj5DkuqQg5pS55Y+Y54q25oCBXHJcbiAgICBwcml2YXRlIHN1Ym1pdENoYW5nZVJ1blN0YXR1cyhpZHM6IEFycmF5PHN0cmluZz4sIGlzU3RhcnQ6IGJvb2xlYW4pIHtcclxuXHJcbiAgICAgICAgaWYgKGlkcyAmJiBpZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgaWRMID0gaWRzLmpvaW4oJywnKTtcclxuICAgICAgICAgICAgdGhpcy52aWRlb1N0cnVjdHVyZWRUYXNrc1NlcnZpY2UudXBkYXRlRmFjZVJ1blN0YXR1cyhpZEwsIGlzU3RhcnQpLnRoZW4oKHJlc3A6IFJlc3BvbnNlUmVzdWx0PGFueT4pID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3ApXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcCAmJiByZXNwLmRhdGEuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIjVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRGYWNlTGlzdEJ5UGFyYW1zKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IocmVzcCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qXHJcbiAgICAqIOWIoOmZpOWNleS4qlxyXG4gICAgKiAqL1xyXG4gICAgb25DbGlja0RlbGV0ZUJ5SWQodGFza0l0ZW1Nb2RlbDogVGFza01vZGVsKSB7XHJcbiAgICAgICAgbGV0IHRleHRTdHI6IHN0cmluZztcclxuICAgICAgICB0ZXh0U3RyID0gYOehruWumuimgeWIoOmZpCAke3Rhc2tJdGVtTW9kZWwuTmFtZX0/YDtcclxuICAgICAgICB0aGlzLmxheWVyLmNvbmZpcm0odGV4dFN0ciwge1xyXG4gICAgICAgICAgICBpY29uOiAwLFxyXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5pMThuRmFjdG9yeSgnRFBfQ09ORklHX0NPTU1PTl80MicpLFxyXG4gICAgICAgICAgICBhcmVhOiBbXCI1MDBweFwiLCBcIjIwMHB4XCJdXHJcbiAgICAgICAgfSwgKGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZShpbmRleCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3VibWl0RGVsZXRlQnlJZHMoW3Rhc2tJdGVtTW9kZWwuSURdKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLypcclxuICAgICog5Yig6Zmk5aSa5LiqXHJcbiAgICAqICovXHJcbiAgICBvbkNsaWNrRGVsZXRlQnlJZHMoKSB7XHJcbiAgICAgICAgbGV0IHRleHRTdHIgPSBcIuehruWumuWIoOmZpO+8mlwiO1xyXG4gICAgICAgIGxldCBkZWxJZHMgPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIGxldCB0YXNrSXRlbU1vZGVscyA9IHRoaXMuZ2V0U2VsZWN0ZWRMaXN0KCk7XHJcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKHRhc2tJdGVtTW9kZWxzLCAodmFsOiBUYXNrTW9kZWwpID0+IHtcclxuICAgICAgICAgICAgdGV4dFN0ciArPSBcIjxici8+XCIgKyB2YWwuTmFtZTtcclxuICAgICAgICAgICAgZGVsSWRzLnB1c2godmFsLklEKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubGF5ZXIuY29uZmlybSh0ZXh0U3RyLCB7XHJcbiAgICAgICAgICAgIGljb246IDAsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLmkxOG5GYWN0b3J5KCdEUF9DT05GSUdfQ09NTU9OXzQyJyksXHJcbiAgICAgICAgICAgIGFyZWE6IFtcIjUwMHB4XCIsIFwiMjAwcHhcIl1cclxuICAgICAgICB9LCAoaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLmNsb3NlKGluZGV4KTtcclxuICAgICAgICAgICAgdGhpcy5zdWJtaXREZWxldGVCeUlkcyhkZWxJZHMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN1Ym1pdERlbGV0ZUJ5SWRzKGlkczogQXJyYXk8c3RyaW5nPikge1xyXG4gICAgICAgIGlmIChpZHMgJiYgaWRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy52aWRlb1N0cnVjdHVyZWRUYXNrc1NlcnZpY2UuZGVsZXRlRmFjZVRhc2tGb3JJRFMoaWRzKS50aGVuKChyZXNwOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCByZXMgPSByZXNwLmRhdGEgYXMgUmVzcG9uc2VSZXN1bHQ8c3RyaW5nPjtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEZhY2VMaXN0QnlQYXJhbXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLy8g5omT6ZKpIOmAieaLqSDlm57osINcclxuICAgIGFmdGVyQ2hhbmdlQ2hlY2socmVzdWx0TGlzdDogQXJyYXk8Ym9vbGVhbj4sIGlzQ2hlY2tBbGw6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHRMaXN0KVxyXG4gICAgICAgIHRoaXMuc2V0SXNTZWxlY3RJdGVtcyhyZXN1bHRMaXN0KTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkRmFjZUxpc3QgPSByZXN1bHRMaXN0O1xyXG4gICAgICAgIHRoaXMuaXNTZWxlY3RGYWNlQWxsID0gaXNDaGVja0FsbDtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5blvZPliY3lt7LooqvpgInkuK3liJfooahcclxuICAgIGdldFNlbGVjdGVkTGlzdCgpOiBBcnJheTxUYXNrTW9kZWw+IHtcclxuICAgICAgICBsZXQgc2VsZWN0ZWREYXRhTGlzdDogQXJyYXk8VGFza01vZGVsPiA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkRmFjZUxpc3QpIHtcclxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHRoaXMucGFnZVJlc3VsdEZhY2UuZGF0YSwgKHZhbDogVGFza01vZGVsLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEZhY2VMaXN0W2luZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRGF0YUxpc3QucHVzaCh2YWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkRGF0YUxpc3Q7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vYWJvdXQgcGFnZSBjbGlja1xyXG4gICAgY2hhbmdlUGFnZShudW06IG51bWJlciwgdHlwZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wYWdlUmVzdWx0RmFjZS5jdXJyZW50UGFnZSA9IG51bTtcclxuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlUmVzdWx0RmFjZSA9IHRoaXMuZmFjZVBhZ2luYXRpb24uZ2V0QnlQYWdlKHRoaXMucGFnZVJlc3VsdEZhY2UpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlUGFnZVNpemUobnVtOiBudW1iZXIsIHR5cGU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucGFnZVJlc3VsdEZhY2UucGFnZVNpemUgPSBudW07XHJcbiAgICAgICAgdGhpcy5wYWdlUmVzdWx0RmFjZS5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVJlc3VsdEZhY2UgPSB0aGlzLmZhY2VQYWdpbmF0aW9uLmdldEJ5UGFnZSh0aGlzLnBhZ2VSZXN1bHRGYWNlKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRvciB3eXI6IOWIpOaWreWSjOiuvue9ruW9k+WJjeWIl+ihqOaYr+WQpuaciemAieS4reeahOWFg+e0oFxyXG4gICAgICogQHBhcmFtIGl0ZW1zXHJcbiAgICAgKi9cclxuICAgIHNldElzU2VsZWN0SXRlbXMoaXRlbXM6IEFycmF5PGJvb2xlYW4+KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChpdGVtcyAmJiBpdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBpLCBsZW47XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGl0ZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbXNbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmlzU2VsZWN0RmFjZUl0ZW1zICE9PSByZXN1bHQpIHtcclxuICAgICAgICAgICAgdGhpcy5pc1NlbGVjdEZhY2VJdGVtcyA9IHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcihcIlZpZGVvU3RydWN0dXJlZFRhc2tzQ29udHJvbGxlclwiLCBWaWRlb1N0cnVjdHVyZWRUYXNrc0NvbnRyb2xsZXIpO1xyXG5cclxuXHJcbiJdfQ==
