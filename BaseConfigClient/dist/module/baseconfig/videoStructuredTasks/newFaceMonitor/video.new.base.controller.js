define(["require", "exports", "text!./person.select.html", "text!../../runPlan/runPlan.popup.html", "../../../common/app/main.app", "../../../../core/server/enum/AuthStatus", "../../../../core/server/TaskModel", "../../../common/directive/tree/tree-params", "../../../../core/enum/TreeType", "../../../../core/server/enum/TaskType", "../../../../core/server/enum/ThresholdType", "../../../../core/server/enum/AuditStatus", "../../../../core/server/enum/TaskStatus", "./person.select.controller", "../../runPlan/runPlan.popup.controller", "css!../../style/baseconfig-face-struct.css", "angular", "../../../common/services/connectTree.service", "../../../common/services/videoStructuredTasks.service", "../../../common/directive/tree/tree.directive.service", "../../../common/services/user.service", "../../../common/services/timeTemplate.service", "../../../common/factory/layerMsg.factory"], function (require, exports, personSelectHtml, runplanTpl, main_app_1, AuthStatus_1, TaskModel_1, tree_params_1, TreeType_1, TaskType_1, ThresholdType_1, AuditStatus_1, TaskStatus_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ViewNewTaskController = (function () {
        function ViewNewTaskController($scope, $state, $stateParams, $timeout, layer, treeDirectiveService, videoStructuredTasksService, connectTreeService, userInfoCacheFactory, userService, timeTemplateService, layerDec) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.$timeout = $timeout;
            this.layer = layer;
            this.treeDirectiveService = treeDirectiveService;
            this.videoStructuredTasksService = videoStructuredTasksService;
            this.connectTreeService = connectTreeService;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.userService = userService;
            this.timeTemplateService = timeTemplateService;
            this.layerDec = layerDec;
            this.taskConfigAuditKey = "myCheck";
            this.taskModel = new TaskModel_1.TaskModel();
            this.selectCameraList = [];
            this.tempSelectedPerson = [];
            this.cameraTreeParams = new tree_params_1.TreeDataParams();
            this.cameraTreeData = [];
            this.personTreeData = [];
            this.userAuditList = [];
            this.timeTemplateList = [];
            this.thresholdType = ThresholdType_1.ThresholdType.Hight.value;
            this.treeModelTpl = '/module/baseconfig/videoStructuredTasks/newFaceMonitor/camera.select.html?time=' + Date.now().toString();
            this.defaultCheckTreeByIds = function (treeType, treeId, ids, paramName) {
                if (!paramName) {
                    paramName = "ID";
                }
                if (ids.length > 0) {
                    var checkParamsList_1 = [];
                    angular.forEach(ids, function (val) {
                        checkParamsList_1.push({ key: paramName, value: val });
                    });
                    if (_this.treeDirectiveService.checkNodesByParamsList(treeId, checkParamsList_1, true)) {
                        _this.selectCameraList = _this.getCheckedList(treeType, treeId);
                    }
                }
                else {
                    _this.selectCameraList = [];
                }
            };
            this.hasTaskAudit = this.userInfoCacheFactory.hasFuncAuth(this.taskConfigAuditKey);
            this.initCameraTreeParams();
            this.getTaskDetail(this.$stateParams.taskId);
            this.initAuthStatusList();
            this.getPersonTreeData();
            this.getAuditUserList();
            this.getTimeTemplateList();
            this.$scope.$on('person.select.popup', function (event, data) {
                if (Array.isArray(data)) {
                    _this.selectPersonID = data;
                }
                _this.layer.close(_this.layerIndex);
            });
            this.$scope.$on('add.runplan.popup', function (event, data) {
                if (data) {
                    _this.timeTemplateList.push(data);
                    _this.taskModel.TimeTemplateID = data.ID;
                }
                _this.layer.close(_this.layerIndex);
            });
        }
        ViewNewTaskController.prototype.initCameraTreeParams = function () {
            var _this = this;
            this.cameraTreeParams.treeId = 'CameraTreeID_FaceStruct';
            this.cameraTreeParams.isShowIcon = true;
            this.cameraTreeParams.isShowLine = false;
            this.cameraTreeParams.checkEnable = true;
            this.cameraTreeParams.isSingleSelect = false;
            this.cameraTreeParams.isSimpleData = true;
            this.cameraTreeParams.treeDatas = this.cameraTreeData;
            this.cameraTreeParams.onCheck = function (event, treeId, treeNode) {
                _this.$timeout(function () {
                    _this.selectCameraList = _this.getCheckedList(TreeType_1.TreeType.camera.value, treeId);
                });
            };
            this.cameraTreeParams.treeInitComplete = function (treeId) {
                if (Array.isArray(_this.taskModel.CameraParams) && _this.taskModel.CameraParams.length > 0) {
                    var ids = _this.taskModel.CameraParams.map(function (item) {
                        return item.CameraID;
                    });
                    console.log(ids);
                    _this.defaultCheckTreeByIds(TreeType_1.TreeType.camera.value, _this.cameraTreeParams.treeId, ids);
                }
            };
            this.getCameraTreeData();
        };
        ViewNewTaskController.prototype.getCameraTreeData = function () {
            var _this = this;
            this.connectTreeService.findAreaCamera().then(function (res) {
                _this.cameraTreeParams.treeDatas = res;
            });
        };
        ViewNewTaskController.prototype.getPersonTreeData = function () {
            var _this = this;
            this.connectTreeService.findAreaWithPerson().then(function (res) {
                _this.personTreeData = res;
            });
        };
        ViewNewTaskController.prototype.getAuditUserList = function () {
            var _this = this;
            this.userService.getListByFuncAuthCode(this.taskConfigAuditKey).then(function (resp) {
                if (resp.data && resp.code == 200) {
                    _this.userAuditList = resp.data;
                }
                else {
                    _this.userAuditList = [];
                }
            });
        };
        ViewNewTaskController.prototype.changeThresholdType = function (type) {
            switch (type) {
                case ThresholdType_1.ThresholdType.Hight.value:
                    this.taskModel.LowThreshold = null;
                    break;
                case ThresholdType_1.ThresholdType.Low.value:
                    this.taskModel.HighThreshold = null;
                    break;
            }
        };
        ViewNewTaskController.prototype.getTimeTemplateList = function () {
            var _this = this;
            this.timeTemplateService.findAll().then(function (resp) {
                if (resp.code === 200 && resp.data) {
                    _this.timeTemplateList = resp.data;
                }
                else {
                    _this.userAuditList = [];
                }
            });
        };
        ;
        ViewNewTaskController.prototype.getCheckedList = function (treeType, treeId) {
            var treeCheckedNodes = this.treeDirectiveService.getCheckedNodes(treeId, true);
            var result = [];
            if (treeCheckedNodes) {
                angular.forEach(treeCheckedNodes, function (val) {
                    if (val.treeType === treeType) {
                        result.push(val);
                    }
                });
            }
            return result;
        };
        ViewNewTaskController.prototype.removeCameraSelected = function (item, isRemoveAll) {
            if (item) {
                this.treeDirectiveService.updateNodeChecked(this.cameraTreeParams.treeId, item.tId, false);
                this.selectCameraList = this.getCheckedList(TreeType_1.TreeType.camera.value, this.cameraTreeParams.treeId);
            }
            if (isRemoveAll) {
                if (this.treeDirectiveService.checkAllNodes(this.cameraTreeParams.treeId, false)) {
                    this.selectCameraList = [];
                }
            }
        };
        ViewNewTaskController.prototype.onChangeSearchTree = function (paramsName) {
            var _this = this;
            this.$timeout(function () {
                _this.treeDirectiveService.filterShowNodes(_this.cameraTreeParams.treeId, paramsName, 'Name');
            });
        };
        ;
        ViewNewTaskController.prototype.getTaskDetail = function (taskId) {
            var _this = this;
            if (taskId) {
                this.videoStructuredTasksService.getFaceDetail(taskId).then(function (resp) {
                    if (resp && resp.code == 200) {
                        _this.initNewTackBaseParams(resp.data);
                    }
                    else {
                        _this.initNewTackBaseParams(null);
                    }
                });
            }
            else {
                this.initNewTackBaseParams(null);
            }
        };
        ;
        ViewNewTaskController.prototype.initAuthStatusList = function () {
            this.authStatusList = [];
            for (var key in AuthStatus_1.AuthStatus) {
                this.authStatusList.push(AuthStatus_1.AuthStatus[key]);
            }
        };
        ;
        ViewNewTaskController.prototype.initNewTackBaseParams = function (tackDetail) {
            if (!tackDetail) {
                this.taskModel.AuthStatus = AuthStatus_1.AuthStatus.Self.value;
                this.taskModel.AreaID = this.$stateParams.areaId;
                this.taskModel.Type = TaskType_1.StructTask.FaceStruct.value;
                this.taskModel.TaskType = TaskType_1.StructTask.FaceStruct.value;
                this.taskModel.OperateType = 'Add';
            }
            else {
                this.taskModel = tackDetail;
                this.taskModel.Type = TaskType_1.StructTask.FaceStruct.value;
                this.taskModel.OperateType = 'Update';
                this.taskModel.HighThreshold == 0 ? this.taskModel.HighThreshold = null : null;
                this.taskModel.LowThreshold == 0 ? this.taskModel.LowThreshold = null : null;
                if (this.taskModel.AuthStatus === AuthStatus_1.AuthStatus.Part.value) {
                    this.selectPersonID = eval(this.taskModel.AuthUser);
                }
            }
        };
        ;
        ViewNewTaskController.prototype.addTimeTemplate = function () {
            var scope = this.$scope.$new();
            scope.tplList = this.timeTemplateList;
            this.layerIndex = this.layer.open({
                type: 1,
                content: runplanTpl,
                scope: scope,
                skin: "no-scroll",
                title: "时间模版",
                area: ["780px", "auto"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        ViewNewTaskController.prototype.openPersonSelectModel = function () {
            var scope = this.$scope.$new();
            scope.treeData = this.personTreeData;
            scope.selectPersonID = this.selectPersonID;
            this.layerIndex = this.layer.open({
                type: 1,
                scrollbar: false,
                title: ['选择用户', 'text-align: left;'],
                content: personSelectHtml,
                skin: 'update-person-layer',
                scope: scope,
                area: ["auto"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        ViewNewTaskController.prototype.validAndRestParams = function () {
            var result = false;
            if (!this.taskModel) {
                this.layerDec.warnInfo('请填写任务名称');
                return result;
            }
            if (!this.taskModel.AuditUser) {
                this.layerDec.warnInfo('请选择审核用户');
                return result;
            }
            if (!this.taskModel.TimeTemplateID) {
                this.layerDec.warnInfo('请选择运行计划');
                return result;
            }
            if ((this.taskModel.ValidTimeStart && !this.taskModel.ValidTimeEnd) || (!this.taskModel.ValidTimeStart && this.taskModel.ValidTimeEnd) || (this.taskModel.ValidTimeStart > this.taskModel.ValidTimeEnd)) {
                this.layerDec.warnInfo('请填写正确的有效期');
                return result;
            }
            if (!this.taskModel.ValidTimeStart && !this.taskModel.ValidTimeEnd) {
                this.taskModel.IsLongEffective = true;
            }
            else {
                this.taskModel.IsLongEffective = false;
            }
            if (this.selectCameraList.length === 0) {
                this.layerDec.warnInfo('请选择摄像机');
                return result;
            }
            else {
                this.taskModel.CameraParams = this.selectCameraList.map(function (item) {
                    var cameraParam = new TaskModel_1.CameraParam();
                    cameraParam.CameraID = item.ID;
                    return cameraParam;
                });
            }
            if (this.taskModel.AuthStatus === AuthStatus_1.AuthStatus.Part.value && this.selectPersonID.length === 0) {
                this.layerDec.warnInfo('请选择可见的用户');
                return result;
            }
            else {
                this.taskModel.AuthUsers = this.selectPersonID;
            }
            return !result;
        };
        ;
        ViewNewTaskController.prototype.submitStruct = function () {
            var _this = this;
            if (!this.validAndRestParams()) {
                return;
            }
            this.taskModel.CreateTime = new Date().toLocaleString();
            this.taskModel.CreateUserID = this.userInfoCacheFactory.getCurrentUserId();
            if (this.taskModel.AuditUser === this.taskModel.CreateUserID) {
                this.taskModel.AuditStatus = AuditStatus_1.AuditStatus.Verified.value;
                this.taskModel.Status = TaskStatus_1.TaskStatus.Run.value;
            }
            else {
                this.taskModel.AuditStatus = AuditStatus_1.AuditStatus.Verifing.value;
                this.taskModel.Status = TaskStatus_1.TaskStatus.Waiting.value;
            }
            this.videoStructuredTasksService.addOrUpdateFaceTask(this.taskModel).then(function (res) {
                if (res.code === 200) {
                    _this.cancelAddStruct();
                }
            });
        };
        ViewNewTaskController.prototype.cancelAddStruct = function () {
            this.$state.go('baseconfig.videoStructuredTasks');
        };
        ViewNewTaskController.$inject = [
            '$scope',
            '$state',
            '$stateParams',
            '$timeout',
            'layer',
            'treeDirectiveService',
            'videoStructuredTasksService',
            'connectTreeService',
            'userInfoCacheFactory',
            'userService',
            'timeTemplateService',
            'layerDec'
        ];
        return ViewNewTaskController;
    }());
    main_app_1.app.controller('viewNewTaskController', ViewNewTaskController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy92aWRlb1N0cnVjdHVyZWRUYXNrcy9uZXdGYWNlTW9uaXRvci92aWRlby5uZXcuYmFzZS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQTJDQTtRQWdDSSwrQkFBb0IsTUFBVyxFQUNYLE1BQVcsRUFDWCxZQUFpQixFQUNqQixRQUFhLEVBQ2IsS0FBVSxFQUNWLG9CQUEyQyxFQUMzQywyQkFBeUQsRUFDekQsa0JBQXVDLEVBQ3ZDLG9CQUEyQyxFQUMzQyxXQUF5QixFQUN6QixtQkFBeUMsRUFDekMsUUFBbUI7WUFYdkMsaUJBaUNDO1lBakNtQixXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQ1gsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLGlCQUFZLEdBQVosWUFBWSxDQUFLO1lBQ2pCLGFBQVEsR0FBUixRQUFRLENBQUs7WUFDYixVQUFLLEdBQUwsS0FBSyxDQUFLO1lBQ1YseUJBQW9CLEdBQXBCLG9CQUFvQixDQUF1QjtZQUMzQyxnQ0FBMkIsR0FBM0IsMkJBQTJCLENBQThCO1lBQ3pELHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBcUI7WUFDdkMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUF1QjtZQUMzQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYztZQUN6Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXNCO1lBQ3pDLGFBQVEsR0FBUixRQUFRLENBQVc7WUExQ3ZDLHVCQUFrQixHQUFXLFNBQVMsQ0FBQztZQUd2QyxjQUFTLEdBQWMsSUFBSSxxQkFBUyxFQUFFLENBQUM7WUFDdkMscUJBQWdCLEdBQW9CLEVBQUUsQ0FBQztZQUN2Qyx1QkFBa0IsR0FBa0IsRUFBRSxDQUFDO1lBQ3ZDLHFCQUFnQixHQUFzQyxJQUFJLDRCQUFjLEVBQXFCLENBQUM7WUFDOUYsbUJBQWMsR0FBNkIsRUFBRSxDQUFDO1lBQzlDLG1CQUFjLEdBQWlDLEVBQUUsQ0FBQztZQUlsRCxrQkFBYSxHQUFnQixFQUFFLENBQUM7WUFD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QU8sR0FBRztZQUNiLFFBQVE7WUFDUixRQUFRO1lBQ1IsY0FBYztZQUNkLFVBQVU7WUFDVixPQUFPO1lBQ1Asc0JBQXNCO1lBQ3RCLDZCQUE2QjtZQUM3QixvQkFBb0I7WUFDcEIsc0JBQXNCO1lBQ3RCLGFBQWE7WUFDYixxQkFBcUI7WUFDckIsVUFBVTtTQUNiLENBQUM7UUFnVU4sNEJBQUM7S0E5VkQsQUE4VkMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLEVBQUUscUJBQXFCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvYmFzZWNvbmZpZy92aWRlb1N0cnVjdHVyZWRUYXNrcy9uZXdGYWNlTW9uaXRvci92aWRlby5uZXcuYmFzZS5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuL3BlcnNvbi5zZWxlY3QuaHRtbFwiIG5hbWU9XCJwZXJzb25TZWxlY3RIdG1sXCIgLz5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi8uLi9ydW5QbGFuL3J1blBsYW4ucG9wdXAuaHRtbFwiIG5hbWU9XCJydW5wbGFuVHBsXCIgLz5cclxuaW1wb3J0IFwiLi9wZXJzb24uc2VsZWN0LmNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFwiLi4vLi4vcnVuUGxhbi9ydW5QbGFuLnBvcHVwLmNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFwiY3NzIS4uLy4uL3N0eWxlL2Jhc2Vjb25maWctZmFjZS1zdHJ1Y3QuY3NzXCI7XHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgXCJhbmd1bGFyXCI7XHJcbmltcG9ydCB7RW51bX0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvZW51bS9FbnVtXCI7XHJcbmltcG9ydCB7QXV0aFN0YXR1c30gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vQXV0aFN0YXR1c1wiO1xyXG5pbXBvcnQge1Rhc2tNb2RlbCwgQ2FtZXJhUGFyYW19IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL3NlcnZlci9UYXNrTW9kZWxcIjtcclxuXHJcbmltcG9ydCBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9jb25uZWN0VHJlZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SUNvbm5lY3RUcmVlU2VydmljZX0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9jb25uZWN0VHJlZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7QmFja1Jlc3BvbnNlQm9keSwgUmVzcG9uc2VSZXN1bHR9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuXHJcblxyXG5pbXBvcnQgXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvdmlkZW9TdHJ1Y3R1cmVkVGFza3Muc2VydmljZVwiO1xyXG5pbXBvcnQge0lWaWRlb1N0cnVjdHVyZWRUYXNrc1NlcnZpY2V9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvdmlkZW9TdHJ1Y3R1cmVkVGFza3Muc2VydmljZVwiO1xyXG5pbXBvcnQge0FyZWFFeH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0FyZWFFeFwiO1xyXG5pbXBvcnQge0NhbWVyYUV4fSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvQ2FtZXJhRXhcIjtcclxuaW1wb3J0IHtUcmVlRGF0YVBhcmFtc30gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLXBhcmFtc1wiO1xyXG5pbXBvcnQge1RyZWVUeXBlfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9lbnVtL1RyZWVUeXBlXCI7XHJcblxyXG5pbXBvcnQge0lUcmVlRGlyZWN0aXZlU2VydmljZX0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLmRpcmVjdGl2ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uLy4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLmRpcmVjdGl2ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7U3RydWN0VGFza30gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vVGFza1R5cGVcIjtcclxuaW1wb3J0IHtQZXJzb25UcmVlRXh9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2VudGl0eS9leC9QZXJzb25UcmVlRXhcIjtcclxuaW1wb3J0IHtJVXNlckluZm9DYWNoZUZhY3Rvcnl9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZmFjdG9yeS91c2VyaW5mby5jYWNoZS5mYWN0b3J5XCI7XHJcbmltcG9ydCB7VXNlcn0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvZW50aXR5L1VzZXJcIjtcclxuaW1wb3J0IHtJVXNlclNlcnZpY2V9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvdXNlci5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtUaW1lVGVtcGxhdGV9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2VudGl0eS9UaW1lVGVtcGxhdGVcIjtcclxuaW1wb3J0IHtJVGltZVRlbXBsYXRlU2VydmljZX0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy90aW1lVGVtcGxhdGUuc2VydmljZVwiO1xyXG5pbXBvcnQgXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvdGltZVRlbXBsYXRlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtUaHJlc2hvbGRUeXBlfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9zZXJ2ZXIvZW51bS9UaHJlc2hvbGRUeXBlXCI7XHJcbmltcG9ydCB7SUxheWVyRGVjfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2ZhY3RvcnkvbGF5ZXJNc2cuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCIuLi8uLi8uLi9jb21tb24vZmFjdG9yeS9sYXllck1zZy5mYWN0b3J5XCI7XHJcbmltcG9ydCB7QXVkaXRTdGF0dXN9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL0F1ZGl0U3RhdHVzXCI7XHJcbmltcG9ydCB7VGFza1N0YXR1c30gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vVGFza1N0YXR1c1wiO1xyXG5cclxuZGVjbGFyZSBsZXQgYW5ndWxhcjogYW55O1xyXG5kZWNsYXJlIGxldCBwZXJzb25TZWxlY3RIdG1sOiBhbnksIHJ1bnBsYW5UcGw6IGFueTtcclxuXHJcbmNsYXNzIFZpZXdOZXdUYXNrQ29udHJvbGxlciB7XHJcbiAgICB0YXNrQ29uZmlnQXVkaXRLZXk6IHN0cmluZyA9IFwibXlDaGVja1wiO1xyXG4gICAgYXV0aFN0YXR1c0xpc3Q6IEFycmF5PEVudW0+O1xyXG4gICAgbGF5ZXJJbmRleDogbnVtYmVyO1xyXG4gICAgdGFza01vZGVsOiBUYXNrTW9kZWwgPSBuZXcgVGFza01vZGVsKCk7XHJcbiAgICBzZWxlY3RDYW1lcmFMaXN0OiBBcnJheTxDYW1lcmFFeD4gPSBbXTtcclxuICAgIHRlbXBTZWxlY3RlZFBlcnNvbjogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgY2FtZXJhVHJlZVBhcmFtczogVHJlZURhdGFQYXJhbXM8QXJlYUV4IHwgQ2FtZXJhRXg+ID0gbmV3IFRyZWVEYXRhUGFyYW1zPEFyZWFFeCB8IENhbWVyYUV4PigpO1xyXG4gICAgY2FtZXJhVHJlZURhdGE6IEFycmF5PEFyZWFFeCB8IENhbWVyYUV4PiA9IFtdO1xyXG4gICAgcGVyc29uVHJlZURhdGE6IEFycmF5PEFyZWFFeCB8IFBlcnNvblRyZWVFeD4gPSBbXTtcclxuICAgIHNlYXJjaENhbWVyYVN0cjogc3RyaW5nO1xyXG4gICAgc2VsZWN0UGVyc29uSUQ6IEFycmF5PHN0cmluZz47XHJcbiAgICBoYXNUYXNrQXVkaXQ6IGJvb2xlYW47XHJcbiAgICB1c2VyQXVkaXRMaXN0OiBBcnJheTxVc2VyPiA9IFtdO1xyXG4gICAgdGltZVRlbXBsYXRlTGlzdDogQXJyYXk8VGltZVRlbXBsYXRlPiA9IFtdO1xyXG4gICAgdGhyZXNob2xkVHlwZTogc3RyaW5nID0gVGhyZXNob2xkVHlwZS5IaWdodC52YWx1ZTtcclxuICAgIHRyZWVNb2RlbFRwbDogc3RyaW5nID0gJy9tb2R1bGUvYmFzZWNvbmZpZy92aWRlb1N0cnVjdHVyZWRUYXNrcy9uZXdGYWNlTW9uaXRvci9jYW1lcmEuc2VsZWN0Lmh0bWw/dGltZT0nICsgRGF0ZS5ub3coKS50b1N0cmluZygpO1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbXHJcbiAgICAgICAgJyRzY29wZScsXHJcbiAgICAgICAgJyRzdGF0ZScsXHJcbiAgICAgICAgJyRzdGF0ZVBhcmFtcycsXHJcbiAgICAgICAgJyR0aW1lb3V0JyxcclxuICAgICAgICAnbGF5ZXInLFxyXG4gICAgICAgICd0cmVlRGlyZWN0aXZlU2VydmljZScsXHJcbiAgICAgICAgJ3ZpZGVvU3RydWN0dXJlZFRhc2tzU2VydmljZScsXHJcbiAgICAgICAgJ2Nvbm5lY3RUcmVlU2VydmljZScsXHJcbiAgICAgICAgJ3VzZXJJbmZvQ2FjaGVGYWN0b3J5JyxcclxuICAgICAgICAndXNlclNlcnZpY2UnLFxyXG4gICAgICAgICd0aW1lVGVtcGxhdGVTZXJ2aWNlJyxcclxuICAgICAgICAnbGF5ZXJEZWMnXHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICRzdGF0ZTogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSAkc3RhdGVQYXJhbXM6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbGF5ZXI6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgdHJlZURpcmVjdGl2ZVNlcnZpY2U6IElUcmVlRGlyZWN0aXZlU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgdmlkZW9TdHJ1Y3R1cmVkVGFza3NTZXJ2aWNlOiBJVmlkZW9TdHJ1Y3R1cmVkVGFza3NTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjb25uZWN0VHJlZVNlcnZpY2U6IElDb25uZWN0VHJlZVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHVzZXJJbmZvQ2FjaGVGYWN0b3J5OiBJVXNlckluZm9DYWNoZUZhY3RvcnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHVzZXJTZXJ2aWNlOiBJVXNlclNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHRpbWVUZW1wbGF0ZVNlcnZpY2U6IElUaW1lVGVtcGxhdGVTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBsYXllckRlYzogSUxheWVyRGVjKSB7XHJcbiAgICAgICAgdGhpcy5oYXNUYXNrQXVkaXQgPSB0aGlzLnVzZXJJbmZvQ2FjaGVGYWN0b3J5Lmhhc0Z1bmNBdXRoKHRoaXMudGFza0NvbmZpZ0F1ZGl0S2V5KTtcclxuICAgICAgICB0aGlzLmluaXRDYW1lcmFUcmVlUGFyYW1zKCk7XHJcbiAgICAgICAgdGhpcy5nZXRUYXNrRGV0YWlsKHRoaXMuJHN0YXRlUGFyYW1zLnRhc2tJZCk7XHJcbiAgICAgICAgdGhpcy5pbml0QXV0aFN0YXR1c0xpc3QoKTtcclxuICAgICAgICB0aGlzLmdldFBlcnNvblRyZWVEYXRhKCk7XHJcbiAgICAgICAgdGhpcy5nZXRBdWRpdFVzZXJMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5nZXRUaW1lVGVtcGxhdGVMaXN0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRvbigncGVyc29uLnNlbGVjdC5wb3B1cCcsIChldmVudDogYW55LCBkYXRhPzogQXJyYXk8c3RyaW5nPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RQZXJzb25JRCA9IGRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZSh0aGlzLmxheWVySW5kZXgpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJG9uKCdhZGQucnVucGxhbi5wb3B1cCcsIChldmVudDogYW55LCBkYXRhPzogVGltZVRlbXBsYXRlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVUZW1wbGF0ZUxpc3QucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFza01vZGVsLlRpbWVUZW1wbGF0ZUlEID0gZGF0YS5JRDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxheWVyLmNsb3NlKHRoaXMubGF5ZXJJbmRleClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGluaXRDYW1lcmFUcmVlUGFyYW1zKCkge1xyXG4gICAgICAgIHRoaXMuY2FtZXJhVHJlZVBhcmFtcy50cmVlSWQgPSAnQ2FtZXJhVHJlZUlEX0ZhY2VTdHJ1Y3QnO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhVHJlZVBhcmFtcy5pc1Nob3dJY29uID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNhbWVyYVRyZWVQYXJhbXMuaXNTaG93TGluZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhVHJlZVBhcmFtcy5jaGVja0VuYWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jYW1lcmFUcmVlUGFyYW1zLmlzU2luZ2xlU2VsZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jYW1lcmFUcmVlUGFyYW1zLmlzU2ltcGxlRGF0YSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jYW1lcmFUcmVlUGFyYW1zLnRyZWVEYXRhcyA9IHRoaXMuY2FtZXJhVHJlZURhdGE7XHJcbiAgICAgICAgdGhpcy5jYW1lcmFUcmVlUGFyYW1zLm9uQ2hlY2sgPSAoZXZlbnQ6IEV2ZW50LCB0cmVlSWQ6IHN0cmluZywgdHJlZU5vZGU6IGFueSk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0Q2FtZXJhTGlzdCA9IHRoaXMuZ2V0Q2hlY2tlZExpc3QoVHJlZVR5cGUuY2FtZXJhLnZhbHVlLCB0cmVlSWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuY2FtZXJhVHJlZVBhcmFtcy50cmVlSW5pdENvbXBsZXRlID0gKHRyZWVJZDogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMudGFza01vZGVsLkNhbWVyYVBhcmFtcykgJiYgdGhpcy50YXNrTW9kZWwuQ2FtZXJhUGFyYW1zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCBpZHM6IEFycmF5PHN0cmluZz4gPSB0aGlzLnRhc2tNb2RlbC5DYW1lcmFQYXJhbXMubWFwKChpdGVtOiBDYW1lcmFQYXJhbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLkNhbWVyYUlEO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpZHMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0Q2hlY2tUcmVlQnlJZHMoVHJlZVR5cGUuY2FtZXJhLnZhbHVlLCB0aGlzLmNhbWVyYVRyZWVQYXJhbXMudHJlZUlkLCBpZHMpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZ2V0Q2FtZXJhVHJlZURhdGEoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2FtZXJhVHJlZURhdGEoKSB7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0VHJlZVNlcnZpY2UuZmluZEFyZWFDYW1lcmEoKS50aGVuKChyZXM6IEFycmF5PEFyZWFFeCB8IENhbWVyYUV4PikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNhbWVyYVRyZWVQYXJhbXMudHJlZURhdGFzID0gcmVzO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGVyc29uVHJlZURhdGEoKSB7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0VHJlZVNlcnZpY2UuZmluZEFyZWFXaXRoUGVyc29uKCkudGhlbigocmVzOiBBcnJheTxBcmVhRXggfCBQZXJzb25UcmVlRXg+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucGVyc29uVHJlZURhdGEgPSByZXM7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRBdWRpdFVzZXJMaXN0KCkge1xyXG4gICAgICAgIHRoaXMudXNlclNlcnZpY2UuZ2V0TGlzdEJ5RnVuY0F1dGhDb2RlKHRoaXMudGFza0NvbmZpZ0F1ZGl0S2V5KS50aGVuKChyZXNwOiBSZXNwb25zZVJlc3VsdDxBcnJheTxVc2VyPj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3AuZGF0YSAmJiByZXNwLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJBdWRpdExpc3QgPSByZXNwLmRhdGE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJBdWRpdExpc3QgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVRocmVzaG9sZFR5cGUodHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgVGhyZXNob2xkVHlwZS5IaWdodC52YWx1ZTpcclxuICAgICAgICAgICAgICAgIHRoaXMudGFza01vZGVsLkxvd1RocmVzaG9sZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBUaHJlc2hvbGRUeXBlLkxvdy52YWx1ZTpcclxuICAgICAgICAgICAgICAgIHRoaXMudGFza01vZGVsLkhpZ2hUaHJlc2hvbGQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGdldFRpbWVUZW1wbGF0ZUxpc3QoKSB7XHJcbiAgICAgICAgdGhpcy50aW1lVGVtcGxhdGVTZXJ2aWNlLmZpbmRBbGwoKS50aGVuKChyZXNwOiBSZXNwb25zZVJlc3VsdDxBcnJheTxUaW1lVGVtcGxhdGU+PikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzcC5jb2RlID09PSAyMDAgJiYgcmVzcC5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVUZW1wbGF0ZUxpc3QgPSByZXNwLmRhdGE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJBdWRpdExpc3QgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKiogY3JlYXRlIGJ5IHp4cVxyXG4gICAgICog6I635Y+W5bey6YCJ5oup55qEIOagkeiKgueCuembhuWQiFxyXG4gICAgICogQHRpbWU6IDIwMTctMDYtMTIgMTI6MDI6MzJcclxuICAgICAqIEBwYXJhbXM6IHRyZWVUeXBlIOWLvumAieiKgueCuSDmoJHnsbvlnovmoIfor4ZcclxuICAgICAqIEBwYXJhbXM6IHRyZWVJZCDli77pgInoioLngrkg5qCRSURcclxuICAgICAqIEByZXR1cm46IEFycmF5PENhbWVyYUV4PiZBcnJheTxCdXNpbmVzc0xpYkV4PiDoioLngrnpm4blkIgg57G75Z6L5LiOIHRyZWVUeXBlIOebuOWvueW6lFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldENoZWNrZWRMaXN0KHRyZWVUeXBlOiBzdHJpbmcsIHRyZWVJZDogc3RyaW5nKTogQXJyYXk8Q2FtZXJhRXg+IHtcclxuICAgICAgICBsZXQgdHJlZUNoZWNrZWROb2RlcyA9IHRoaXMudHJlZURpcmVjdGl2ZVNlcnZpY2UuZ2V0Q2hlY2tlZE5vZGVzKHRyZWVJZCwgdHJ1ZSk7XHJcbiAgICAgICAgbGV0IHJlc3VsdDogQXJyYXk8Q2FtZXJhRXg+ID0gW10gYXMgQXJyYXk8Q2FtZXJhRXg+O1xyXG4gICAgICAgIGlmICh0cmVlQ2hlY2tlZE5vZGVzKSB7XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh0cmVlQ2hlY2tlZE5vZGVzLCAodmFsOiBDYW1lcmFFeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbC50cmVlVHlwZSA9PT0gdHJlZVR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh2YWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVDYW1lcmFTZWxlY3RlZChpdGVtOiBDYW1lcmFFeCwgaXNSZW1vdmVBbGw/OiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgdGhpcy50cmVlRGlyZWN0aXZlU2VydmljZS51cGRhdGVOb2RlQ2hlY2tlZCh0aGlzLmNhbWVyYVRyZWVQYXJhbXMudHJlZUlkLCBpdGVtLnRJZCwgZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdENhbWVyYUxpc3QgPSB0aGlzLmdldENoZWNrZWRMaXN0KFRyZWVUeXBlLmNhbWVyYS52YWx1ZSwgdGhpcy5jYW1lcmFUcmVlUGFyYW1zLnRyZWVJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc1JlbW92ZUFsbCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50cmVlRGlyZWN0aXZlU2VydmljZS5jaGVja0FsbE5vZGVzKHRoaXMuY2FtZXJhVHJlZVBhcmFtcy50cmVlSWQsIGZhbHNlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RDYW1lcmFMaXN0ID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25DaGFuZ2VTZWFyY2hUcmVlKHBhcmFtc05hbWU/OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy50cmVlRGlyZWN0aXZlU2VydmljZS5maWx0ZXJTaG93Tm9kZXModGhpcy5jYW1lcmFUcmVlUGFyYW1zLnRyZWVJZCwgcGFyYW1zTmFtZSwgJ05hbWUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLy/ojrflj5bku7vliqHor6bmg4VcclxuICAgIGdldFRhc2tEZXRhaWwodGFza0lkOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGFza0lkKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlkZW9TdHJ1Y3R1cmVkVGFza3NTZXJ2aWNlLmdldEZhY2VEZXRhaWwodGFza0lkKS50aGVuKChyZXNwOiBSZXNwb25zZVJlc3VsdDxUYXNrTW9kZWw+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcCAmJiByZXNwLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0TmV3VGFja0Jhc2VQYXJhbXMocmVzcC5kYXRhKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0TmV3VGFja0Jhc2VQYXJhbXMobnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdE5ld1RhY2tCYXNlUGFyYW1zKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIC8vIOWIneWni+WMliDmnYPpmZAg57G75Z6L6YCJ5oupXHJcbiAgICBpbml0QXV0aFN0YXR1c0xpc3QoKSB7XHJcbiAgICAgICAgdGhpcy5hdXRoU3RhdHVzTGlzdCA9IFtdIGFzIEFycmF5PEVudW0+O1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBBdXRoU3RhdHVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0aFN0YXR1c0xpc3QucHVzaChBdXRoU3RhdHVzW2tleV0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8g5Yid5aeL5YyWIOWinuaUuSDku7vliqHln7rmnKzlsZ7mgKdcclxuICAgIGluaXROZXdUYWNrQmFzZVBhcmFtcyh0YWNrRGV0YWlsOiBUYXNrTW9kZWwpIHtcclxuICAgICAgICAvLyDoi6Xml6DmnYPpmZDvvIzpu5jorqQg6YCJ5LitIOS7heiHquW3seWPr+ingVxyXG4gICAgICAgIGlmICghdGFja0RldGFpbCkge1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tNb2RlbC5BdXRoU3RhdHVzID0gQXV0aFN0YXR1cy5TZWxmLnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tNb2RlbC5BcmVhSUQgPSB0aGlzLiRzdGF0ZVBhcmFtcy5hcmVhSWQ7XHJcbiAgICAgICAgICAgIHRoaXMudGFza01vZGVsLlR5cGUgPSBTdHJ1Y3RUYXNrLkZhY2VTdHJ1Y3QudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMudGFza01vZGVsLlRhc2tUeXBlID0gU3RydWN0VGFzay5GYWNlU3RydWN0LnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tNb2RlbC5PcGVyYXRlVHlwZSA9ICdBZGQnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFza01vZGVsID0gdGFja0RldGFpbDtcclxuICAgICAgICAgICAgdGhpcy50YXNrTW9kZWwuVHlwZSA9IFN0cnVjdFRhc2suRmFjZVN0cnVjdC52YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy50YXNrTW9kZWwuT3BlcmF0ZVR5cGUgPSAnVXBkYXRlJztcclxuICAgICAgICAgICAgdGhpcy50YXNrTW9kZWwuSGlnaFRocmVzaG9sZCA9PSAwID8gdGhpcy50YXNrTW9kZWwuSGlnaFRocmVzaG9sZCA9IG51bGwgOiBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tNb2RlbC5Mb3dUaHJlc2hvbGQgPT0gMCA/IHRoaXMudGFza01vZGVsLkxvd1RocmVzaG9sZCA9IG51bGwgOiBudWxsO1xyXG4gICAgICAgICAgICBpZih0aGlzLnRhc2tNb2RlbC5BdXRoU3RhdHVzID09PSBBdXRoU3RhdHVzLlBhcnQudmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RQZXJzb25JRCA9IGV2YWwodGhpcy50YXNrTW9kZWwuQXV0aFVzZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgYWRkVGltZVRlbXBsYXRlKCkge1xyXG4gICAgICAgIGxldCBzY29wZTogeyB0cGxMaXN0OiBBcnJheTxUaW1lVGVtcGxhdGU+LCAkZGVzdHJveTogRnVuY3Rpb24gfSA9IHRoaXMuJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICBzY29wZS50cGxMaXN0ID0gdGhpcy50aW1lVGVtcGxhdGVMaXN0O1xyXG4gICAgICAgIHRoaXMubGF5ZXJJbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IHJ1bnBsYW5UcGwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgc2tpbjogXCJuby1zY3JvbGxcIixcclxuICAgICAgICAgICAgdGl0bGU6IFwi5pe26Ze05qih54mIXCIsXHJcbiAgICAgICAgICAgIGFyZWE6IFtcIjc4MHB4XCIsIFwiYXV0b1wiXSxcclxuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyDmiZPlvIDnlKjmiLfpgInmi6nnqpflj6NcclxuICAgIG9wZW5QZXJzb25TZWxlY3RNb2RlbCgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgc2NvcGU6IHsgdHJlZURhdGE6IEFycmF5PEFyZWFFeCB8IFBlcnNvblRyZWVFeD4sIHNlbGVjdFBlcnNvbklEOiBBcnJheTxzdHJpbmc+LCAkZGVzdHJveTogRnVuY3Rpb24gfSA9IHRoaXMuJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICBzY29wZS50cmVlRGF0YSA9IHRoaXMucGVyc29uVHJlZURhdGE7XHJcbiAgICAgICAgc2NvcGUuc2VsZWN0UGVyc29uSUQgPSB0aGlzLnNlbGVjdFBlcnNvbklEO1xyXG4gICAgICAgIHRoaXMubGF5ZXJJbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIHNjcm9sbGJhcjogZmFsc2UsXHJcbiAgICAgICAgICAgIHRpdGxlOiBbJ+mAieaLqeeUqOaItycsICd0ZXh0LWFsaWduOiBsZWZ0OyddLFxyXG4gICAgICAgICAgICBjb250ZW50OiBwZXJzb25TZWxlY3RIdG1sLFxyXG4gICAgICAgICAgICBza2luOiAndXBkYXRlLXBlcnNvbi1sYXllcicsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgYXJlYTogW1wiYXV0b1wiXSxcclxuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKiogY3JlYXRlIGJ5IHp4cVxyXG4gICAgICog5qC55o2uIOaVsOaNrumbhuWQiCDli77pgIkg5a+55bqU55qE5qCR6IqC54K5XHJcbiAgICAgKiBAdGltZTogMjAxNy0wNi0xMiAxMjowMjozMlxyXG4gICAgICogQHBhcmFtczogdHJlZVR5cGUg5Yu+6YCJ6IqC54K5IOagkeexu+Wei+agh+ivhlxyXG4gICAgICogQHBhcmFtczogdHJlZUlkIOWLvumAieiKgueCuSDmoJFJRFxyXG4gICAgICogQHBhcmFtczogaWRzIOe7k+WQiFxyXG4gICAgICogQHBhcmFtczogcGFyYW1OYW1lIOWMuemFjeWPguaVsOWQjeensCDpu5jorqQgXCJJRFwiXHJcbiAgICAgKiBAcmV0dXJuOlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRlZmF1bHRDaGVja1RyZWVCeUlkcyA9ICh0cmVlVHlwZTogc3RyaW5nLCB0cmVlSWQ6IHN0cmluZywgaWRzOiBBcnJheTxzdHJpbmc+LCBwYXJhbU5hbWU/OiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICAgICAgICBpZiAoIXBhcmFtTmFtZSkge1xyXG4gICAgICAgICAgICBwYXJhbU5hbWUgPSBcIklEXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgY2hlY2tQYXJhbXNMaXN0ID0gW10gYXMgQXJyYXk8eyBrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyB9PjtcclxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGlkcywgKHZhbDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjaGVja1BhcmFtc0xpc3QucHVzaCh7a2V5OiBwYXJhbU5hbWUsIHZhbHVlOiB2YWx9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy50cmVlRGlyZWN0aXZlU2VydmljZS5jaGVja05vZGVzQnlQYXJhbXNMaXN0KHRyZWVJZCwgY2hlY2tQYXJhbXNMaXN0LCB0cnVlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RDYW1lcmFMaXN0ID0gdGhpcy5nZXRDaGVja2VkTGlzdCh0cmVlVHlwZSwgdHJlZUlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0Q2FtZXJhTGlzdCA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSB2YWxpZEFuZFJlc3RQYXJhbXMoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IHJlc3VsdDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGlmICghdGhpcy50YXNrTW9kZWwpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXllckRlYy53YXJuSW5mbygn6K+35aGr5YaZ5Lu75Yqh5ZCN56ewJyk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLnRhc2tNb2RlbC5BdWRpdFVzZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXllckRlYy53YXJuSW5mbygn6K+36YCJ5oup5a6h5qC455So5oi3Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLnRhc2tNb2RlbC5UaW1lVGVtcGxhdGVJRCkge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyRGVjLndhcm5JbmZvKCfor7fpgInmi6nov5DooYzorqHliJInKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKHRoaXMudGFza01vZGVsLlZhbGlkVGltZVN0YXJ0ICYmICF0aGlzLnRhc2tNb2RlbC5WYWxpZFRpbWVFbmQpIHx8ICghdGhpcy50YXNrTW9kZWwuVmFsaWRUaW1lU3RhcnQgJiYgdGhpcy50YXNrTW9kZWwuVmFsaWRUaW1lRW5kKSB8fCAodGhpcy50YXNrTW9kZWwuVmFsaWRUaW1lU3RhcnQgPiB0aGlzLnRhc2tNb2RlbC5WYWxpZFRpbWVFbmQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXJEZWMud2FybkluZm8oJ+ivt+Whq+WGmeato+ehrueahOacieaViOacnycpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy50YXNrTW9kZWwuVmFsaWRUaW1lU3RhcnQgJiYgIXRoaXMudGFza01vZGVsLlZhbGlkVGltZUVuZCkge1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tNb2RlbC5Jc0xvbmdFZmZlY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy50YXNrTW9kZWwuSXNMb25nRWZmZWN0aXZlID0gZmFsc2VcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdENhbWVyYUxpc3QubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXJEZWMud2FybkluZm8oJ+ivt+mAieaLqeaRhOWDj+acuicpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy50YXNrTW9kZWwuQ2FtZXJhUGFyYW1zID0gdGhpcy5zZWxlY3RDYW1lcmFMaXN0Lm1hcCgoaXRlbTogQ2FtZXJhRXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBjYW1lcmFQYXJhbSA9IG5ldyBDYW1lcmFQYXJhbSgpO1xyXG4gICAgICAgICAgICAgICAgY2FtZXJhUGFyYW0uQ2FtZXJhSUQgPSBpdGVtLklEO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbWVyYVBhcmFtO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy50YXNrTW9kZWwuQXV0aFN0YXR1cyA9PT0gQXV0aFN0YXR1cy5QYXJ0LnZhbHVlICYmIHRoaXMuc2VsZWN0UGVyc29uSUQubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXJEZWMud2FybkluZm8oJ+ivt+mAieaLqeWPr+ingeeahOeUqOaItycpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy50YXNrTW9kZWwuQXV0aFVzZXJzID0gdGhpcy5zZWxlY3RQZXJzb25JRFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gIXJlc3VsdDtcclxuICAgIH07XHJcblxyXG4gICAgc3VibWl0U3RydWN0KCkge1xyXG4gICAgICAgIGlmICghdGhpcy52YWxpZEFuZFJlc3RQYXJhbXMoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGFza01vZGVsLkNyZWF0ZVRpbWUgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy50YXNrTW9kZWwuQ3JlYXRlVXNlcklEID0gdGhpcy51c2VySW5mb0NhY2hlRmFjdG9yeS5nZXRDdXJyZW50VXNlcklkKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRhc2tNb2RlbC5BdWRpdFVzZXIgPT09IHRoaXMudGFza01vZGVsLkNyZWF0ZVVzZXJJRCkge1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tNb2RlbC5BdWRpdFN0YXR1cyA9IEF1ZGl0U3RhdHVzLlZlcmlmaWVkLnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tNb2RlbC5TdGF0dXMgPSBUYXNrU3RhdHVzLlJ1bi52YWx1ZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFza01vZGVsLkF1ZGl0U3RhdHVzID0gQXVkaXRTdGF0dXMuVmVyaWZpbmcudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMudGFza01vZGVsLlN0YXR1cyA9IFRhc2tTdGF0dXMuV2FpdGluZy52YWx1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnZpZGVvU3RydWN0dXJlZFRhc2tzU2VydmljZS5hZGRPclVwZGF0ZUZhY2VUYXNrKHRoaXMudGFza01vZGVsKS50aGVuKChyZXM6IEJhY2tSZXNwb25zZUJvZHk8c3RyaW5nPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW5jZWxBZGRTdHJ1Y3QoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcbiAgICBjYW5jZWxBZGRTdHJ1Y3QoKXtcclxuICAgICAgICB0aGlzLiRzdGF0ZS5nbygnYmFzZWNvbmZpZy52aWRlb1N0cnVjdHVyZWRUYXNrcycpXHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCd2aWV3TmV3VGFza0NvbnRyb2xsZXInLCBWaWV3TmV3VGFza0NvbnRyb2xsZXIpO1xyXG5cclxuIl19
