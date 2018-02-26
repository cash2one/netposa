define(["require", "exports", "text!../../../selectPopup/personSelect/person.select.html", "text!../../runPlan/runPlan.popup.html", "../../../common/app/main.app", "../../../../core/server/enum/AuthStatus", "../../../../core/server/TaskModel", "../../../common/directive/tree/tree-params", "../../../../core/enum/TreeType", "../../../../core/server/enum/TaskType", "../../../../core/server/enum/ThresholdType", "../../../../core/server/enum/AuditStatus", "../../../../core/server/enum/TaskStatus", "../../../selectPopup/personSelect/person.select.controller", "../../runPlan/runPlan.popup.controller", "css!../../style/baseconfig-face-struct.css", "angular", "../../../common/services/connectTree.service", "../../../common/services/videoStructuredTasks.service", "../../../common/directive/tree/tree.directive.service", "../../../common/services/user.service", "../../../common/services/timeTemplate.service", "../../../common/factory/layerMsg.factory"], function (require, exports, personSelectHtml, runplanTpl, main_app_1, AuthStatus_1, TaskModel_1, tree_params_1, TreeType_1, TaskType_1, ThresholdType_1, AuditStatus_1, TaskStatus_1) {
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
            this.taskConfigAuditKey = "toolOption.myCheck";
            this.taskModel = new TaskModel_1.TaskModel();
            this.selectCameraList = [];
            this.tempSelectedPerson = [];
            this.cameraTreeParams = new tree_params_1.TreeDataParams();
            this.cameraTreeData = [];
            this.personTreeData = [];
            this.userAuditList = [];
            this.timeTemplateList = [];
            this.treeModelTpl = '/module/baseconfig/videoStructuredTasks/newFaceTask/camera.select.html?time=' + Date.now().toString();
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
            this.connectTreeService.findAreaCamera().then(function (res) {
                _this.cameraTreeParams.treeDatas = res;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy92aWRlb1N0cnVjdHVyZWRUYXNrcy9uZXdGYWNlVGFzay9uZXdWaWRlb1N0cnVjdC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQTJDQTtRQStCSSwrQkFBb0IsTUFBVyxFQUNYLE1BQVcsRUFDWCxZQUFpQixFQUNqQixRQUFhLEVBQ2IsS0FBVSxFQUNWLG9CQUEyQyxFQUMzQywyQkFBeUQsRUFDekQsa0JBQXVDLEVBQ3ZDLG9CQUEyQyxFQUMzQyxXQUF5QixFQUN6QixtQkFBeUMsRUFDekMsUUFBbUI7WUFYdkMsaUJBZ0NDO1lBaENtQixXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQ1gsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLGlCQUFZLEdBQVosWUFBWSxDQUFLO1lBQ2pCLGFBQVEsR0FBUixRQUFRLENBQUs7WUFDYixVQUFLLEdBQUwsS0FBSyxDQUFLO1lBQ1YseUJBQW9CLEdBQXBCLG9CQUFvQixDQUF1QjtZQUMzQyxnQ0FBMkIsR0FBM0IsMkJBQTJCLENBQThCO1lBQ3pELHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBcUI7WUFDdkMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUF1QjtZQUMzQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYztZQUN6Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXNCO1lBQ3pDLGFBQVEsR0FBUixRQUFRLENBQVc7WUF6Q3ZDLHVCQUFrQixHQUFXLG9CQUFvQixDQUFDO1lBR2xELGNBQVMsR0FBYyxJQUFJLHFCQUFTLEVBQUUsQ0FBQztZQUN2QyxxQkFBZ0IsR0FBb0IsRUFBRSxDQUFDO1lBQ3ZDLHVCQUFrQixHQUFrQixFQUFFLENBQUM7WUFDdkMscUJBQWdCLEdBQXNDLElBQUksNEJBQWMsRUFBcUIsQ0FBQztZQUM5RixtQkFBYyxHQUE2QixFQUFFLENBQUM7WUFDOUMsbUJBQWMsR0FBaUMsRUFBRSxDQUFDO1lBSWxELGtCQUFhLEdBQWdCLEVBQUUsQ0FBQztZQUNo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QkFBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7Z0JBQ3hELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLHVCQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQTtZQUNoRCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcseUJBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO2dCQUN4RCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyx1QkFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUE7WUFDcEQsQ0FBQztZQUNELElBQUksQ0FBQywyQkFBMkIsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBNkI7Z0JBQ3BHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDbkIsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFBO2dCQUMxQixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUE7UUFFTixDQUFDO1FBQ0QsK0NBQWUsR0FBZjtZQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGlDQUFpQyxDQUFDLENBQUE7UUFDckQsQ0FBQztRQWxVTSw2QkFBTyxHQUFHO1lBQ2IsUUFBUTtZQUNSLFFBQVE7WUFDUixjQUFjO1lBQ2QsVUFBVTtZQUNWLE9BQU87WUFDUCxzQkFBc0I7WUFDdEIsNkJBQTZCO1lBQzdCLG9CQUFvQjtZQUNwQixzQkFBc0I7WUFDdEIsYUFBYTtZQUNiLHFCQUFxQjtZQUNyQixVQUFVO1NBQ2IsQ0FBQztRQXNUTiw0QkFBQztLQW5WRCxBQW1WQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9iYXNlY29uZmlnL3ZpZGVvU3RydWN0dXJlZFRhc2tzL25ld0ZhY2VUYXNrL25ld1ZpZGVvU3RydWN0LmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uLy4uLy4uL3NlbGVjdFBvcHVwL3BlcnNvblNlbGVjdC9wZXJzb24uc2VsZWN0Lmh0bWxcIiBuYW1lPVwicGVyc29uU2VsZWN0SHRtbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vLi4vcnVuUGxhbi9ydW5QbGFuLnBvcHVwLmh0bWxcIiBuYW1lPVwicnVucGxhblRwbFwiIC8+XHJcbmltcG9ydCBcIi4uLy4uLy4uL3NlbGVjdFBvcHVwL3BlcnNvblNlbGVjdC9wZXJzb24uc2VsZWN0LmNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFwiLi4vLi4vcnVuUGxhbi9ydW5QbGFuLnBvcHVwLmNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFwiY3NzIS4uLy4uL3N0eWxlL2Jhc2Vjb25maWctZmFjZS1zdHJ1Y3QuY3NzXCI7XHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgXCJhbmd1bGFyXCI7XHJcbmltcG9ydCB7RW51bX0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvZW51bS9FbnVtXCI7XHJcbmltcG9ydCB7QXV0aFN0YXR1c30gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vQXV0aFN0YXR1c1wiO1xyXG5pbXBvcnQge1Rhc2tNb2RlbCwgQ2FtZXJhUGFyYW19IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL3NlcnZlci9UYXNrTW9kZWxcIjtcclxuXHJcbmltcG9ydCBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9jb25uZWN0VHJlZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SUNvbm5lY3RUcmVlU2VydmljZX0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9jb25uZWN0VHJlZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7QmFja1Jlc3BvbnNlQm9keSwgUmVzcG9uc2VSZXN1bHR9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuXHJcblxyXG5pbXBvcnQgXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvdmlkZW9TdHJ1Y3R1cmVkVGFza3Muc2VydmljZVwiO1xyXG5pbXBvcnQge0lWaWRlb1N0cnVjdHVyZWRUYXNrc1NlcnZpY2V9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvdmlkZW9TdHJ1Y3R1cmVkVGFza3Muc2VydmljZVwiO1xyXG5pbXBvcnQge0FyZWFFeH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0FyZWFFeFwiO1xyXG5pbXBvcnQge0NhbWVyYUV4fSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvQ2FtZXJhRXhcIjtcclxuaW1wb3J0IHtUcmVlRGF0YVBhcmFtc30gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLXBhcmFtc1wiO1xyXG5pbXBvcnQge1RyZWVUeXBlfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9lbnVtL1RyZWVUeXBlXCI7XHJcblxyXG5pbXBvcnQge0lUcmVlRGlyZWN0aXZlU2VydmljZX0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLmRpcmVjdGl2ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uLy4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLmRpcmVjdGl2ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7U3RydWN0VGFza30gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vVGFza1R5cGVcIjtcclxuaW1wb3J0IHtQZXJzb25UcmVlRXh9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2VudGl0eS9leC9QZXJzb25UcmVlRXhcIjtcclxuaW1wb3J0IHtJVXNlckluZm9DYWNoZUZhY3Rvcnl9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZmFjdG9yeS91c2VyaW5mby5jYWNoZS5mYWN0b3J5XCI7XHJcbmltcG9ydCB7VXNlcn0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvZW50aXR5L1VzZXJcIjtcclxuaW1wb3J0IHtJVXNlclNlcnZpY2V9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvdXNlci5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtUaW1lVGVtcGxhdGV9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2VudGl0eS9UaW1lVGVtcGxhdGVcIjtcclxuaW1wb3J0IHtJVGltZVRlbXBsYXRlU2VydmljZX0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy90aW1lVGVtcGxhdGUuc2VydmljZVwiO1xyXG5pbXBvcnQgXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvdGltZVRlbXBsYXRlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtUaHJlc2hvbGRUeXBlfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9zZXJ2ZXIvZW51bS9UaHJlc2hvbGRUeXBlXCI7XHJcbmltcG9ydCB7SUxheWVyRGVjfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2ZhY3RvcnkvbGF5ZXJNc2cuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCIuLi8uLi8uLi9jb21tb24vZmFjdG9yeS9sYXllck1zZy5mYWN0b3J5XCI7XHJcbmltcG9ydCB7QXVkaXRTdGF0dXN9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL0F1ZGl0U3RhdHVzXCI7XHJcbmltcG9ydCB7VGFza1N0YXR1c30gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vVGFza1N0YXR1c1wiO1xyXG5cclxuZGVjbGFyZSBsZXQgYW5ndWxhcjogYW55O1xyXG5kZWNsYXJlIGxldCBwZXJzb25TZWxlY3RIdG1sOiBhbnksIHJ1bnBsYW5UcGw6IGFueTtcclxuXHJcbmNsYXNzIFZpZXdOZXdUYXNrQ29udHJvbGxlciB7XHJcbiAgICB0YXNrQ29uZmlnQXVkaXRLZXk6IHN0cmluZyA9IFwidG9vbE9wdGlvbi5teUNoZWNrXCI7XHJcbiAgICBhdXRoU3RhdHVzTGlzdDogQXJyYXk8RW51bT47XHJcbiAgICBsYXllckluZGV4OiBudW1iZXI7XHJcbiAgICB0YXNrTW9kZWw6IFRhc2tNb2RlbCA9IG5ldyBUYXNrTW9kZWwoKTtcclxuICAgIHNlbGVjdENhbWVyYUxpc3Q6IEFycmF5PENhbWVyYUV4PiA9IFtdO1xyXG4gICAgdGVtcFNlbGVjdGVkUGVyc29uOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICBjYW1lcmFUcmVlUGFyYW1zOiBUcmVlRGF0YVBhcmFtczxBcmVhRXggfCBDYW1lcmFFeD4gPSBuZXcgVHJlZURhdGFQYXJhbXM8QXJlYUV4IHwgQ2FtZXJhRXg+KCk7XHJcbiAgICBjYW1lcmFUcmVlRGF0YTogQXJyYXk8QXJlYUV4IHwgQ2FtZXJhRXg+ID0gW107XHJcbiAgICBwZXJzb25UcmVlRGF0YTogQXJyYXk8QXJlYUV4IHwgUGVyc29uVHJlZUV4PiA9IFtdO1xyXG4gICAgc2VhcmNoQ2FtZXJhU3RyOiBzdHJpbmc7XHJcbiAgICBzZWxlY3RQZXJzb25JRDogQXJyYXk8c3RyaW5nPjtcclxuICAgIGhhc1Rhc2tBdWRpdDogYm9vbGVhbjtcclxuICAgIHVzZXJBdWRpdExpc3Q6IEFycmF5PFVzZXI+ID0gW107XHJcbiAgICB0aW1lVGVtcGxhdGVMaXN0OiBBcnJheTxUaW1lVGVtcGxhdGU+ID0gW107XHJcbiAgICB0cmVlTW9kZWxUcGw6IHN0cmluZyA9ICcvbW9kdWxlL2Jhc2Vjb25maWcvdmlkZW9TdHJ1Y3R1cmVkVGFza3MvbmV3RmFjZVRhc2svY2FtZXJhLnNlbGVjdC5odG1sP3RpbWU9JyArIERhdGUubm93KCkudG9TdHJpbmcoKTtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gW1xyXG4gICAgICAgICckc2NvcGUnLFxyXG4gICAgICAgICckc3RhdGUnLFxyXG4gICAgICAgICckc3RhdGVQYXJhbXMnLFxyXG4gICAgICAgICckdGltZW91dCcsXHJcbiAgICAgICAgJ2xheWVyJyxcclxuICAgICAgICAndHJlZURpcmVjdGl2ZVNlcnZpY2UnLFxyXG4gICAgICAgICd2aWRlb1N0cnVjdHVyZWRUYXNrc1NlcnZpY2UnLFxyXG4gICAgICAgICdjb25uZWN0VHJlZVNlcnZpY2UnLFxyXG4gICAgICAgICd1c2VySW5mb0NhY2hlRmFjdG9yeScsXHJcbiAgICAgICAgJ3VzZXJTZXJ2aWNlJyxcclxuICAgICAgICAndGltZVRlbXBsYXRlU2VydmljZScsXHJcbiAgICAgICAgJ2xheWVyRGVjJ1xyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSAkc3RhdGU6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgJHN0YXRlUGFyYW1zOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGxheWVyOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHRyZWVEaXJlY3RpdmVTZXJ2aWNlOiBJVHJlZURpcmVjdGl2ZVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHZpZGVvU3RydWN0dXJlZFRhc2tzU2VydmljZTogSVZpZGVvU3RydWN0dXJlZFRhc2tzU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgY29ubmVjdFRyZWVTZXJ2aWNlOiBJQ29ubmVjdFRyZWVTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB1c2VySW5mb0NhY2hlRmFjdG9yeTogSVVzZXJJbmZvQ2FjaGVGYWN0b3J5LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB1c2VyU2VydmljZTogSVVzZXJTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB0aW1lVGVtcGxhdGVTZXJ2aWNlOiBJVGltZVRlbXBsYXRlU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbGF5ZXJEZWM6IElMYXllckRlYykge1xyXG4gICAgICAgIHRoaXMuaGFzVGFza0F1ZGl0ID0gdGhpcy51c2VySW5mb0NhY2hlRmFjdG9yeS5oYXNGdW5jQXV0aCh0aGlzLnRhc2tDb25maWdBdWRpdEtleSk7XHJcbiAgICAgICAgdGhpcy5pbml0Q2FtZXJhVHJlZVBhcmFtcygpO1xyXG4gICAgICAgIHRoaXMuZ2V0VGFza0RldGFpbCh0aGlzLiRzdGF0ZVBhcmFtcy50YXNrSWQpO1xyXG4gICAgICAgIHRoaXMuaW5pdEF1dGhTdGF0dXNMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5nZXRBdWRpdFVzZXJMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5nZXRUaW1lVGVtcGxhdGVMaXN0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRvbigncGVyc29uLnNlbGVjdC5wb3B1cCcsIChldmVudDogYW55LCBkYXRhPzogQXJyYXk8c3RyaW5nPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RQZXJzb25JRCA9IGRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZSh0aGlzLmxheWVySW5kZXgpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJG9uKCdhZGQucnVucGxhbi5wb3B1cCcsIChldmVudDogYW55LCBkYXRhPzogVGltZVRlbXBsYXRlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVUZW1wbGF0ZUxpc3QucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFza01vZGVsLlRpbWVUZW1wbGF0ZUlEID0gZGF0YS5JRDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxheWVyLmNsb3NlKHRoaXMubGF5ZXJJbmRleClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGluaXRDYW1lcmFUcmVlUGFyYW1zKCkge1xyXG4gICAgICAgIHRoaXMuY2FtZXJhVHJlZVBhcmFtcy50cmVlSWQgPSAnQ2FtZXJhVHJlZUlEX0ZhY2VTdHJ1Y3QnO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhVHJlZVBhcmFtcy5pc1Nob3dJY29uID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNhbWVyYVRyZWVQYXJhbXMuaXNTaG93TGluZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhVHJlZVBhcmFtcy5jaGVja0VuYWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jYW1lcmFUcmVlUGFyYW1zLmlzU2luZ2xlU2VsZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jYW1lcmFUcmVlUGFyYW1zLmlzU2ltcGxlRGF0YSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jYW1lcmFUcmVlUGFyYW1zLnRyZWVEYXRhcyA9IHRoaXMuY2FtZXJhVHJlZURhdGE7XHJcbiAgICAgICAgdGhpcy5jYW1lcmFUcmVlUGFyYW1zLm9uQ2hlY2sgPSAoZXZlbnQ6IEV2ZW50LCB0cmVlSWQ6IHN0cmluZywgdHJlZU5vZGU6IGFueSk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0Q2FtZXJhTGlzdCA9IHRoaXMuZ2V0Q2hlY2tlZExpc3QoVHJlZVR5cGUuY2FtZXJhLnZhbHVlLCB0cmVlSWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuY2FtZXJhVHJlZVBhcmFtcy50cmVlSW5pdENvbXBsZXRlID0gKHRyZWVJZDogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMudGFza01vZGVsLkNhbWVyYVBhcmFtcykgJiYgdGhpcy50YXNrTW9kZWwuQ2FtZXJhUGFyYW1zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCBpZHM6IEFycmF5PHN0cmluZz4gPSB0aGlzLnRhc2tNb2RlbC5DYW1lcmFQYXJhbXMubWFwKChpdGVtOiBDYW1lcmFQYXJhbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLkNhbWVyYUlEO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpZHMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0Q2hlY2tUcmVlQnlJZHMoVHJlZVR5cGUuY2FtZXJhLnZhbHVlLCB0aGlzLmNhbWVyYVRyZWVQYXJhbXMudHJlZUlkLCBpZHMpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuY29ubmVjdFRyZWVTZXJ2aWNlLmZpbmRBcmVhQ2FtZXJhKCkudGhlbigocmVzOiBBcnJheTxBcmVhRXggfCBDYW1lcmFFeD4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jYW1lcmFUcmVlUGFyYW1zLnRyZWVEYXRhcyA9IHJlcztcclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0QXVkaXRVc2VyTGlzdCgpIHtcclxuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmdldExpc3RCeUZ1bmNBdXRoQ29kZSh0aGlzLnRhc2tDb25maWdBdWRpdEtleSkudGhlbigocmVzcDogUmVzcG9uc2VSZXN1bHQ8QXJyYXk8VXNlcj4+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXNwLmRhdGEgJiYgcmVzcC5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyQXVkaXRMaXN0ID0gcmVzcC5kYXRhO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyQXVkaXRMaXN0ID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VUaHJlc2hvbGRUeXBlKHR5cGU6IHN0cmluZykge1xyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFRocmVzaG9sZFR5cGUuSGlnaHQudmFsdWU6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tNb2RlbC5Mb3dUaHJlc2hvbGQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVGhyZXNob2xkVHlwZS5Mb3cudmFsdWU6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tNb2RlbC5IaWdoVGhyZXNob2xkID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBnZXRUaW1lVGVtcGxhdGVMaXN0KCkge1xyXG4gICAgICAgIHRoaXMudGltZVRlbXBsYXRlU2VydmljZS5maW5kQWxsKCkudGhlbigocmVzcDogUmVzcG9uc2VSZXN1bHQ8QXJyYXk8VGltZVRlbXBsYXRlPj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3AuY29kZSA9PT0gMjAwICYmIHJlc3AuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lVGVtcGxhdGVMaXN0ID0gcmVzcC5kYXRhO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyQXVkaXRMaXN0ID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqIGNyZWF0ZSBieSB6eHFcclxuICAgICAqIOiOt+WPluW3sumAieaLqeeahCDmoJHoioLngrnpm4blkIhcclxuICAgICAqIEB0aW1lOiAyMDE3LTA2LTEyIDEyOjAyOjMyXHJcbiAgICAgKiBAcGFyYW1zOiB0cmVlVHlwZSDli77pgInoioLngrkg5qCR57G75Z6L5qCH6K+GXHJcbiAgICAgKiBAcGFyYW1zOiB0cmVlSWQg5Yu+6YCJ6IqC54K5IOagkUlEXHJcbiAgICAgKiBAcmV0dXJuOiBBcnJheTxDYW1lcmFFeD4mQXJyYXk8QnVzaW5lc3NMaWJFeD4g6IqC54K56ZuG5ZCIIOexu+Wei+S4jiB0cmVlVHlwZSDnm7jlr7nlupRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRDaGVja2VkTGlzdCh0cmVlVHlwZTogc3RyaW5nLCB0cmVlSWQ6IHN0cmluZyk6IEFycmF5PENhbWVyYUV4PiB7XHJcbiAgICAgICAgbGV0IHRyZWVDaGVja2VkTm9kZXMgPSB0aGlzLnRyZWVEaXJlY3RpdmVTZXJ2aWNlLmdldENoZWNrZWROb2Rlcyh0cmVlSWQsIHRydWUpO1xyXG4gICAgICAgIGxldCByZXN1bHQ6IEFycmF5PENhbWVyYUV4PiA9IFtdIGFzIEFycmF5PENhbWVyYUV4PjtcclxuICAgICAgICBpZiAodHJlZUNoZWNrZWROb2Rlcykge1xyXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2godHJlZUNoZWNrZWROb2RlcywgKHZhbDogQ2FtZXJhRXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWwudHJlZVR5cGUgPT09IHRyZWVUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godmFsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlQ2FtZXJhU2VsZWN0ZWQoaXRlbTogQ2FtZXJhRXgsIGlzUmVtb3ZlQWxsPzogYm9vbGVhbikge1xyXG4gICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHJlZURpcmVjdGl2ZVNlcnZpY2UudXBkYXRlTm9kZUNoZWNrZWQodGhpcy5jYW1lcmFUcmVlUGFyYW1zLnRyZWVJZCwgaXRlbS50SWQsIGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RDYW1lcmFMaXN0ID0gdGhpcy5nZXRDaGVja2VkTGlzdChUcmVlVHlwZS5jYW1lcmEudmFsdWUsIHRoaXMuY2FtZXJhVHJlZVBhcmFtcy50cmVlSWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNSZW1vdmVBbGwpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJlZURpcmVjdGl2ZVNlcnZpY2UuY2hlY2tBbGxOb2Rlcyh0aGlzLmNhbWVyYVRyZWVQYXJhbXMudHJlZUlkLCBmYWxzZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0Q2FtZXJhTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2hhbmdlU2VhcmNoVHJlZShwYXJhbXNOYW1lPzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudHJlZURpcmVjdGl2ZVNlcnZpY2UuZmlsdGVyU2hvd05vZGVzKHRoaXMuY2FtZXJhVHJlZVBhcmFtcy50cmVlSWQsIHBhcmFtc05hbWUsICdOYW1lJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8v6I635Y+W5Lu75Yqh6K+m5oOFXHJcbiAgICBnZXRUYXNrRGV0YWlsKHRhc2tJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRhc2tJZCkge1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvU3RydWN0dXJlZFRhc2tzU2VydmljZS5nZXRGYWNlRGV0YWlsKHRhc2tJZCkudGhlbigocmVzcDogUmVzcG9uc2VSZXN1bHQ8VGFza01vZGVsPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3AgJiYgcmVzcC5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdE5ld1RhY2tCYXNlUGFyYW1zKHJlc3AuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdE5ld1RhY2tCYXNlUGFyYW1zKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmluaXROZXdUYWNrQmFzZVBhcmFtcyhudWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvLyDliJ3lp4vljJYg5p2D6ZmQIOexu+Wei+mAieaLqVxyXG4gICAgaW5pdEF1dGhTdGF0dXNMaXN0KCkge1xyXG4gICAgICAgIHRoaXMuYXV0aFN0YXR1c0xpc3QgPSBbXSBhcyBBcnJheTxFbnVtPjtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gQXV0aFN0YXR1cykge1xyXG4gICAgICAgICAgICB0aGlzLmF1dGhTdGF0dXNMaXN0LnB1c2goQXV0aFN0YXR1c1trZXldKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIOWIneWni+WMliDlop7mlLkg5Lu75Yqh5Z+65pys5bGe5oCnXHJcbiAgICBpbml0TmV3VGFja0Jhc2VQYXJhbXModGFja0RldGFpbDogVGFza01vZGVsKSB7XHJcbiAgICAgICAgLy8g6Iul5peg5p2D6ZmQ77yM6buY6K6kIOmAieS4rSDku4Xoh6rlt7Hlj6/op4FcclxuICAgICAgICBpZiAoIXRhY2tEZXRhaWwpIHtcclxuICAgICAgICAgICAgdGhpcy50YXNrTW9kZWwuQXV0aFN0YXR1cyA9IEF1dGhTdGF0dXMuU2VsZi52YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy50YXNrTW9kZWwuQXJlYUlEID0gdGhpcy4kc3RhdGVQYXJhbXMuYXJlYUlkO1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tNb2RlbC5UeXBlID0gU3RydWN0VGFzay5GYWNlU3RydWN0LnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tNb2RlbC5UYXNrVHlwZSA9IFN0cnVjdFRhc2suRmFjZVN0cnVjdC52YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy50YXNrTW9kZWwuT3BlcmF0ZVR5cGUgPSAnQWRkJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tNb2RlbCA9IHRhY2tEZXRhaWw7XHJcbiAgICAgICAgICAgIHRoaXMudGFza01vZGVsLlR5cGUgPSBTdHJ1Y3RUYXNrLkZhY2VTdHJ1Y3QudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMudGFza01vZGVsLk9wZXJhdGVUeXBlID0gJ1VwZGF0ZSc7XHJcbiAgICAgICAgICAgIHRoaXMudGFza01vZGVsLkhpZ2hUaHJlc2hvbGQgPT0gMCA/IHRoaXMudGFza01vZGVsLkhpZ2hUaHJlc2hvbGQgPSBudWxsIDogbnVsbDtcclxuICAgICAgICAgICAgdGhpcy50YXNrTW9kZWwuTG93VGhyZXNob2xkID09IDAgPyB0aGlzLnRhc2tNb2RlbC5Mb3dUaHJlc2hvbGQgPSBudWxsIDogbnVsbDtcclxuICAgICAgICAgICAgaWYodGhpcy50YXNrTW9kZWwuQXV0aFN0YXR1cyA9PT0gQXV0aFN0YXR1cy5QYXJ0LnZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0UGVyc29uSUQgPSBldmFsKHRoaXMudGFza01vZGVsLkF1dGhVc2VyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGFkZFRpbWVUZW1wbGF0ZSgpIHtcclxuICAgICAgICBsZXQgc2NvcGU6IHsgdHBsTGlzdDogQXJyYXk8VGltZVRlbXBsYXRlPiwgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUudHBsTGlzdCA9IHRoaXMudGltZVRlbXBsYXRlTGlzdDtcclxuICAgICAgICB0aGlzLmxheWVySW5kZXggPSB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBjb250ZW50OiBydW5wbGFuVHBsLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIHNraW46IFwibm8tc2Nyb2xsXCIsXHJcbiAgICAgICAgICAgIHRpdGxlOiBcIuaXtumXtOaooeeJiFwiLFxyXG4gICAgICAgICAgICBhcmVhOiBbXCI3ODBweFwiLCBcImF1dG9cIl0sXHJcbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8g5omT5byA55So5oi36YCJ5oup56qX5Y+jXHJcbiAgICBvcGVuUGVyc29uU2VsZWN0TW9kZWwoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IHRyZWVEYXRhOiBBcnJheTxBcmVhRXggfCBQZXJzb25UcmVlRXg+LCBzZWxlY3RQZXJzb25JRDogQXJyYXk8c3RyaW5nPiwgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUudHJlZURhdGEgPSB0aGlzLnBlcnNvblRyZWVEYXRhO1xyXG4gICAgICAgIHNjb3BlLnNlbGVjdFBlcnNvbklEID0gdGhpcy5zZWxlY3RQZXJzb25JRDtcclxuICAgICAgICB0aGlzLmxheWVySW5kZXggPSB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBzY3JvbGxiYXI6IGZhbHNlLFxyXG4gICAgICAgICAgICB0aXRsZTogWyfpgInmi6nnlKjmiLcnLCAndGV4dC1hbGlnbjogbGVmdDsnXSxcclxuICAgICAgICAgICAgY29udGVudDogcGVyc29uU2VsZWN0SHRtbCxcclxuICAgICAgICAgICAgc2tpbjogJ3VwZGF0ZS1wZXJzb24tbGF5ZXInLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIGFyZWE6IFtcImF1dG9cIl0sXHJcbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGNyZWF0ZSBieSB6eHFcclxuICAgICAqIOagueaNriDmlbDmja7pm4blkIgg5Yu+6YCJIOWvueW6lOeahOagkeiKgueCuVxyXG4gICAgICogQHRpbWU6IDIwMTctMDYtMTIgMTI6MDI6MzJcclxuICAgICAqIEBwYXJhbXM6IHRyZWVUeXBlIOWLvumAieiKgueCuSDmoJHnsbvlnovmoIfor4ZcclxuICAgICAqIEBwYXJhbXM6IHRyZWVJZCDli77pgInoioLngrkg5qCRSURcclxuICAgICAqIEBwYXJhbXM6IGlkcyDnu5PlkIhcclxuICAgICAqIEBwYXJhbXM6IHBhcmFtTmFtZSDljLnphY3lj4LmlbDlkI3np7Ag6buY6K6kIFwiSURcIlxyXG4gICAgICogQHJldHVybjpcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZWZhdWx0Q2hlY2tUcmVlQnlJZHMgPSAodHJlZVR5cGU6IHN0cmluZywgdHJlZUlkOiBzdHJpbmcsIGlkczogQXJyYXk8c3RyaW5nPiwgcGFyYW1OYW1lPzogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgICAgICAgaWYgKCFwYXJhbU5hbWUpIHtcclxuICAgICAgICAgICAgcGFyYW1OYW1lID0gXCJJRFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaWRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IGNoZWNrUGFyYW1zTGlzdCA9IFtdIGFzIEFycmF5PHsga2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfT47XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChpZHMsICh2YWw6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2hlY2tQYXJhbXNMaXN0LnB1c2goe2tleTogcGFyYW1OYW1lLCB2YWx1ZTogdmFsfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMudHJlZURpcmVjdGl2ZVNlcnZpY2UuY2hlY2tOb2Rlc0J5UGFyYW1zTGlzdCh0cmVlSWQsIGNoZWNrUGFyYW1zTGlzdCwgdHJ1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0Q2FtZXJhTGlzdCA9IHRoaXMuZ2V0Q2hlY2tlZExpc3QodHJlZVR5cGUsIHRyZWVJZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdENhbWVyYUxpc3QgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgdmFsaWRBbmRSZXN0UGFyYW1zKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCByZXN1bHQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBpZiAoIXRoaXMudGFza01vZGVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXJEZWMud2FybkluZm8oJ+ivt+Whq+WGmeS7u+WKoeWQjeensCcpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy50YXNrTW9kZWwuQXVkaXRVc2VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXJEZWMud2FybkluZm8oJ+ivt+mAieaLqeWuoeaguOeUqOaItycpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy50YXNrTW9kZWwuVGltZVRlbXBsYXRlSUQpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXllckRlYy53YXJuSW5mbygn6K+36YCJ5oup6L+Q6KGM6K6h5YiSJyk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCh0aGlzLnRhc2tNb2RlbC5WYWxpZFRpbWVTdGFydCAmJiAhdGhpcy50YXNrTW9kZWwuVmFsaWRUaW1lRW5kKSB8fCAoIXRoaXMudGFza01vZGVsLlZhbGlkVGltZVN0YXJ0ICYmIHRoaXMudGFza01vZGVsLlZhbGlkVGltZUVuZCkgfHwgKHRoaXMudGFza01vZGVsLlZhbGlkVGltZVN0YXJ0ID4gdGhpcy50YXNrTW9kZWwuVmFsaWRUaW1lRW5kKSkge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyRGVjLndhcm5JbmZvKCfor7floavlhpnmraPnoa7nmoTmnInmlYjmnJ8nKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMudGFza01vZGVsLlZhbGlkVGltZVN0YXJ0ICYmICF0aGlzLnRhc2tNb2RlbC5WYWxpZFRpbWVFbmQpIHtcclxuICAgICAgICAgICAgdGhpcy50YXNrTW9kZWwuSXNMb25nRWZmZWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFza01vZGVsLklzTG9uZ0VmZmVjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RDYW1lcmFMaXN0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyRGVjLndhcm5JbmZvKCfor7fpgInmi6nmkYTlg4/mnLonKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFza01vZGVsLkNhbWVyYVBhcmFtcyA9IHRoaXMuc2VsZWN0Q2FtZXJhTGlzdC5tYXAoKGl0ZW06IENhbWVyYUV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2FtZXJhUGFyYW0gPSBuZXcgQ2FtZXJhUGFyYW0oKTtcclxuICAgICAgICAgICAgICAgIGNhbWVyYVBhcmFtLkNhbWVyYUlEID0gaXRlbS5JRDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYW1lcmFQYXJhbTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudGFza01vZGVsLkF1dGhTdGF0dXMgPT09IEF1dGhTdGF0dXMuUGFydC52YWx1ZSAmJiB0aGlzLnNlbGVjdFBlcnNvbklELmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyRGVjLndhcm5JbmZvKCfor7fpgInmi6nlj6/op4HnmoTnlKjmiLcnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFza01vZGVsLkF1dGhVc2VycyA9IHRoaXMuc2VsZWN0UGVyc29uSURcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICFyZXN1bHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHN1Ym1pdFN0cnVjdCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMudmFsaWRBbmRSZXN0UGFyYW1zKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRhc2tNb2RlbC5DcmVhdGVUaW1lID0gbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpO1xyXG4gICAgICAgIHRoaXMudGFza01vZGVsLkNyZWF0ZVVzZXJJRCA9IHRoaXMudXNlckluZm9DYWNoZUZhY3RvcnkuZ2V0Q3VycmVudFVzZXJJZCgpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy50YXNrTW9kZWwuQXVkaXRVc2VyID09PSB0aGlzLnRhc2tNb2RlbC5DcmVhdGVVc2VySUQpIHtcclxuICAgICAgICAgICAgdGhpcy50YXNrTW9kZWwuQXVkaXRTdGF0dXMgPSBBdWRpdFN0YXR1cy5WZXJpZmllZC52YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy50YXNrTW9kZWwuU3RhdHVzID0gVGFza1N0YXR1cy5SdW4udmFsdWVcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tNb2RlbC5BdWRpdFN0YXR1cyA9IEF1ZGl0U3RhdHVzLlZlcmlmaW5nLnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tNb2RlbC5TdGF0dXMgPSBUYXNrU3RhdHVzLldhaXRpbmcudmFsdWVcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy52aWRlb1N0cnVjdHVyZWRUYXNrc1NlcnZpY2UuYWRkT3JVcGRhdGVGYWNlVGFzayh0aGlzLnRhc2tNb2RlbCkudGhlbigocmVzOiBCYWNrUmVzcG9uc2VCb2R5PHN0cmluZz4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsQWRkU3RydWN0KClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG4gICAgY2FuY2VsQWRkU3RydWN0KCl7XHJcbiAgICAgICAgdGhpcy4kc3RhdGUuZ28oJ2Jhc2Vjb25maWcudmlkZW9TdHJ1Y3R1cmVkVGFza3MnKVxyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcigndmlld05ld1Rhc2tDb250cm9sbGVyJywgVmlld05ld1Rhc2tDb250cm9sbGVyKTtcclxuXHJcbiJdfQ==
