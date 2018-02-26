define(["require", "exports", "text!../../../selectPopup/personSelect/person.select.html", "text!../../runPlan/runPlan.popup.html", "text!../../eventRule/eventRule.popup.html", "../../../common/app/main.app", "../../../../core/server/enum/AuthStatus", "../../../../core/server/TaskModel", "../../../common/directive/tree/tree-params", "../../../../core/enum/TreeType", "../../../../core/server/enum/TaskType", "../../../../core/server/enum/ThresholdType", "../../../../core/server/enum/AuditStatus", "../../../../core/server/enum/TaskStatus", "./DrawSpace", "../../../../core/enum/ObjectType", "../../../common/directive/ocx/video.ocx.directive", "../../../selectPopup/personSelect/person.select.controller", "../../runPlan/runPlan.popup.controller", "../../eventRule/eventRule.popup.controller", "css!../../style/baseconfig-face-monitor.css", "angular", "../../../common/services/connectTree.service", "../../../common/services/task.service", "../../../common/directive/tree/tree.directive.service", "../../../common/services/user.service", "../../../common/factory/layerMsg.factory", "../../../common/services/businessLib.service", "../../../common/services/resource.service"], function (require, exports, personSelectHtml, runplanTpl, eventRuleTpl, main_app_1, AuthStatus_1, TaskModel_1, tree_params_1, TreeType_1, TaskType_1, ThresholdType_1, AuditStatus_1, TaskStatus_1, DrawSpace_1, ObjectType_1, video_ocx_directive_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NewFaceMonitorController = (function () {
        function NewFaceMonitorController($scope, $state, $stateParams, $timeout, layer, treeDirectiveService, taskService, connectTreeService, userInfoCacheFactory, userService, layerDec, businessLibService, resourceService) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.$timeout = $timeout;
            this.layer = layer;
            this.treeDirectiveService = treeDirectiveService;
            this.taskService = taskService;
            this.connectTreeService = connectTreeService;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.userService = userService;
            this.layerDec = layerDec;
            this.businessLibService = businessLibService;
            this.resourceService = resourceService;
            this.taskConfigAuditKey = "toolOption.myCheck";
            this.areaList = [];
            this.taskModel = new TaskModel_1.TaskModel();
            this.selectCameraList = [];
            this.cameraParamSelectedList = [];
            this.tempSelectedPerson = [];
            this.cameraListForMap = {};
            this.cameraTreeParams = new tree_params_1.TreeDataParams();
            this.selectCameraTreeParams = new tree_params_1.TreeDataParams();
            this.faceLibTreeParams = new tree_params_1.TreeDataParams();
            this.userAuditList = [];
            this.timeTemplateList = [];
            this.eventRuleList = [];
            this.thresholdType = ThresholdType_1.ThresholdType.Hight.value;
            this.faceLibSelectedIdList = [];
            this.tempSelectPositonCameraList = [];
            this.showCameraConfig = false;
            this.showOcx = false;
            this.playSuccess = false;
            this.defaultCheckTreeByIds = function (treeType, treeId, ids, paramName) {
                if (!paramName) {
                    paramName = "ID";
                }
                if (Array.isArray(ids) && ids.length > 0) {
                    var checkParamsList_1 = [];
                    angular.forEach(ids, function (val) {
                        checkParamsList_1.push({ key: paramName, value: val });
                    });
                    _this.treeDirectiveService.checkNodesByParamsList(treeId, checkParamsList_1, true);
                }
            };
            this.DrawSpace = new DrawSpace_1.DrawSpace();
            this.hasTaskAudit = this.userInfoCacheFactory.hasFuncAuth(this.taskConfigAuditKey);
            this.getTaskDetail(this.$stateParams.taskId);
            this.initAuthStatusList();
            this.getEnumList();
            this.initSelectCameraTreeParams();
            this.$scope.$on('person.select.popup', function (event, data) {
                if (Array.isArray(data)) {
                    _this.selectPersonID = data;
                }
                _this.layer.close(_this.layerIndex);
            });
            this.$scope.$on('add.runplan.popup', function (event, isFresh, data) {
                if (isFresh) {
                    _this.taskModel.TimeTemplateID = data.ID;
                    _this.taskModel.TimeTemplate = data;
                }
                _this.layer.close(_this.layerIndex);
            });
            this.$scope.$on('close.eventRule.popup', function (event, isFresh, eventRule) {
                _this.layer.close(_this.layerIndex);
                if (isFresh) {
                    _this.taskModel.EventRule = eventRule;
                }
            });
        }
        NewFaceMonitorController.prototype.initComplete = function (ocxControlFunc) {
            this.videoOcx = ocxControlFunc;
        };
        NewFaceMonitorController.prototype.initCameraTreeParams = function () {
            var _this = this;
            this.cameraTreeParams.treeId = 'CameraTreeID_FaceMonitor';
            this.cameraTreeParams.isShowIcon = true;
            this.cameraTreeParams.isShowLine = false;
            this.cameraTreeParams.checkEnable = true;
            this.cameraTreeParams.isSingleSelect = false;
            this.cameraTreeParams.isSimpleData = true;
            this.cameraTreeParams.onCheck = function (event, treeId, treeNode) {
                _this.$timeout(function () {
                    _this.selectCameraList = _this.getCheckedList(TreeType_1.TreeType.camera.value, _this.cameraTreeParams.treeId);
                    _this.cameraParamSelectedList = _this.selectCameraToCameraParams(_this.selectCameraList);
                });
            };
            this.cameraTreeParams.treeInitComplete = function (treeId) {
                if (_this.$stateParams.taskId) {
                    _this.cameraParamSelectedList = _this.taskModel.CameraParams;
                }
                if (Array.isArray(_this.taskModel.CameraParams) && _this.taskModel.CameraParams.length > 0) {
                    var ids = _this.taskModel.CameraParams.map(function (item) {
                        return item.CameraID;
                    });
                    _this.defaultCheckTreeByIds(TreeType_1.TreeType.camera.value, _this.cameraTreeParams.treeId, ids);
                    _this.selectCameraList = _this.getCheckedList(TreeType_1.TreeType.camera.value, _this.cameraTreeParams.treeId);
                }
            };
            this.connectTreeService.findAreaCamera().then(function (res) {
                _this.cameraTreeParams.treeDatas = res;
                _this.$timeout(function () {
                    res.forEach(function (item) {
                        _this.cameraListForMap[item.ID] = item;
                    });
                });
            });
        };
        NewFaceMonitorController.prototype.selectCameraToCameraParams = function (list) {
            var _this = this;
            var arr = [];
            list.forEach(function (item, index) {
                var isHava = false;
                var l;
                for (var i = 0; i < _this.cameraParamSelectedList.length; i++) {
                    if (_this.cameraParamSelectedList[i].CameraID === item.ID) {
                        isHava = true;
                        l = i;
                        break;
                    }
                }
                if (!isHava) {
                    var CameraPositon = new TaskModel_1.CameraParam();
                    CameraPositon.CameraID = item.ID;
                    arr.push(CameraPositon);
                }
                else {
                    arr.push(_this.cameraParamSelectedList[l]);
                }
            });
            return arr;
        };
        NewFaceMonitorController.prototype.initSelectCameraTreeParams = function () {
            var _this = this;
            this.selectCameraTreeParams = new tree_params_1.TreeDataParams(true);
            this.selectCameraTreeParams.treeId = 'Select_CameraTreeID_FaceMonitor';
            this.selectCameraTreeParams.isShowIcon = true;
            this.selectCameraTreeParams.isShowLine = false;
            this.selectCameraTreeParams.checkEnable = true;
            this.selectCameraTreeParams.isSingleSelect = false;
            this.selectCameraTreeParams.isSimpleData = true;
            this.selectCameraTreeParams.onCheck = function (event, treeId, treeNode) {
                _this.$timeout(function () {
                    _this.tempSelectPositonCameraList = _this.getCheckedList(TreeType_1.TreeType.camera.value, _this.selectCameraTreeParams.treeId);
                });
            };
            this.selectCameraTreeParams.onDblClick = function (event, treeId, treeNode) {
                if (treeNode.treeType === TreeType_1.TreeType.camera.value) {
                    _this.playSuccess = false;
                    _this.DrawSpace.isShowAreaSpace(false);
                    _this.showOcx = true;
                    _this.playRealTime(treeNode);
                    _this.$timeout(function () {
                        if (_this.treeDirectiveService.updateNodeChecked(treeId, treeNode.tId, true)) {
                            _this.tempSelectPositonCameraList = _this.getCheckedList(TreeType_1.TreeType.camera.value, _this.selectCameraTreeParams.treeId);
                        }
                    });
                }
            };
            this.selectCameraTreeParams.treeInitComplete = function (treeId) {
                _this.treeDirectiveService.expandAll(_this.selectCameraTreeParams.treeId, true);
                _this.treeDirectiveService.checkAllNodes(_this.selectCameraTreeParams.treeId, false);
            };
            this.selectCameraTreeParams.addDiyDom = function (treeId, treeNode) {
                if (treeNode && treeNode.isSetCameraParams) {
                    var locateStr = "<span class='js-locate-diy-dom'>√</span>";
                    var aObj = angular.element(document.getElementById(treeNode.tId + "_a"), "#" + treeNode.tId + "_a");
                    if (aObj.children(".js-locate-diy-dom").size() <= 0) {
                        aObj.append(locateStr);
                    }
                }
                else if (treeNode) {
                    var aObj = angular.element(document.getElementById(treeNode.tId + "_a"), "#" + treeNode.tId + "_a");
                    if (aObj.children(".js-locate-diy-dom").size() >= 0) {
                        aObj.children(".js-locate-diy-dom").remove();
                    }
                }
            };
        };
        ;
        NewFaceMonitorController.prototype.initFaceLibTreeParams = function () {
            var _this = this;
            this.faceLibTreeParams = new tree_params_1.TreeDataParams(true);
            this.faceLibTreeParams.treeId = 'FaceLibTreeID_FaceMonitor';
            this.faceLibTreeParams.isShowIcon = true;
            this.faceLibTreeParams.isShowLine = false;
            this.faceLibTreeParams.checkEnable = true;
            this.faceLibTreeParams.isSingleSelect = false;
            this.faceLibTreeParams.isSimpleData = true;
            this.faceLibTreeParams.onCheck = function (event, treeId, treeNode) {
                _this.$timeout(function () {
                    _this.updateFaceLibCheckIdList();
                });
            };
            this.faceLibTreeParams.treeInitComplete = function (treeId) {
                if (_this.$stateParams.taskId) {
                    _this.faceLibSelectedIdList = _this.taskModel.ArrLibIds;
                }
                _this.defaultCheckTreeByIds(TreeType_1.TreeType.businessLib.value, treeId, _this.faceLibSelectedIdList);
            };
            this.businessLibService.findHasSelfTreeWithArea().then(function (resp) {
                if (resp && resp.code == 200 && resp.data) {
                    _this.areaList = resp.data.areaExList;
                    var treeData_1 = [].concat(resp.data.businessLibExList, _this.areaList);
                    _this.$timeout(function () {
                        _this.faceLibTreeParams.treeDatas = treeData_1;
                    });
                }
            });
        };
        ;
        NewFaceMonitorController.prototype.updateFaceLibCheckIdList = function () {
            var treeType = TreeType_1.TreeType.businessLib.value;
            var treeId = this.faceLibTreeParams.treeId;
            var allCheckBusinessLib = this.getCheckedList(treeType, treeId);
            var faceLibIdList = [];
            if (allCheckBusinessLib && allCheckBusinessLib.length > 0) {
                angular.forEach(allCheckBusinessLib, function (val) {
                    if (val.treeType === TreeType_1.TreeType.businessLib.value) {
                        faceLibIdList.push(val.ID);
                    }
                });
            }
            this.faceLibSelectedIdList = faceLibIdList;
        };
        NewFaceMonitorController.prototype.showCameraConfigFn = function () {
            var _this = this;
            if (this.selectCameraList.length > 0) {
                this.selectCameraList.forEach(function (item) {
                    item.ParentID = item.AreaID;
                });
                var treeDate_1 = [].concat(angular.copy(this.selectCameraList), this.areaList);
                this.$timeout(function () {
                    _this.selectCameraTreeParams.treeDatas = treeDate_1;
                });
                this.showCameraConfig = true;
                this.showOcx = true;
                this.DrawSpace.isShowAreaSpace(false);
                this.treeDirectiveService.setChkDisabledAll(this.cameraTreeParams.treeId, true);
            }
            else {
                this.layerDec.warnInfo('当前未选择任何摄像机！');
            }
        };
        NewFaceMonitorController.prototype.cencalConfig = function () {
            this.showCameraConfig = false;
            this.showOcx = false;
            this.treeDirectiveService.setChkDisabledAll(this.cameraTreeParams.treeId, false);
        };
        NewFaceMonitorController.prototype.playRealTime = function (item) {
            var _this = this;
            if (item && this.videoOcx) {
                this.resourceService.getDeviceById(item.ID, ObjectType_1.ObjectType.Camera.value).then(function (res) {
                    if (res && res.JsonUserData.hasOwnProperty('VideoServer')) {
                        var opts = new video_ocx_directive_1.VideoOcxRealTimeOpt();
                        opts.ip = res.JsonUserData.VideoServer.IpAddress;
                        opts.port = res.JsonUserData.VideoServer.Port;
                        opts.path = res.PlayName;
                        opts.user = res.JsonUserData.VideoServer.Uid;
                        opts.passwd = res.JsonUserData.VideoServer.Pwd;
                        var playRes = _this.videoOcx.playRealTime(opts, _this.videoOcx.getFocusWindowIndex());
                        if (playRes === true) {
                            _this.$timeout(function () {
                                _this.DrawSpace.resetPositionArea();
                                _this.DrawSpace.resetPositionSize();
                                _this.playSuccess = true;
                                _this.nowVideoOcxAttr = _this.videoOcx.getVideoAttribute(_this.videoOcx.getFocusWindowIndex());
                                var scale = new DrawSpace_1.IScale();
                                scale.XScale = _this.nowVideoOcxAttr.width / _this.DrawSpace.getPosition().area.width;
                                scale.YScale = _this.nowVideoOcxAttr.height / _this.DrawSpace.getPosition().area.height;
                                _this.nowVideoScale = scale;
                                console.log(_this.DrawSpace.getPosition().area, scale);
                                _this.DrawSpace.setScale(scale);
                            }, 2000);
                        }
                    }
                    else {
                        _this.layerDec.warnInfo('无法播放摄像机！');
                    }
                });
            }
        };
        NewFaceMonitorController.prototype.capturePic = function () {
            var PicStr = this.videoOcx.catchPictrue(this.videoOcx.getFocusWindowIndex());
            this.ocxCapturePicStr = "data:image/jpg;base64," + PicStr;
            this.stop();
            this.showOcx = false;
            this.DrawSpace.isShowAreaSpace(true);
            this.DrawSpace.setImage(this.ocxCapturePicStr);
        };
        NewFaceMonitorController.prototype.stop = function () {
            if (this.videoOcx) {
                this.videoOcx.stop(this.videoOcx.getFocusWindowIndex());
            }
        };
        NewFaceMonitorController.prototype.setCaneraPositon = function () {
            var _this = this;
            this.tempSelectPositonCameraList = this.getCheckedList(TreeType_1.TreeType.camera.value, this.selectCameraTreeParams.treeId);
            var positions = this.DrawSpace.getPosition();
            var defaultOptions = this.DrawSpace.getDefaultOptions();
            this.tempSelectPositonCameraList.forEach(function (item) {
                item.isSetCameraParams = true;
                _this.cameraParamSelectedList.forEach(function (itemCamera) {
                    if (item.ID === itemCamera.CameraID) {
                        itemCamera.DetectMaxSize = positions.max.width;
                        itemCamera.DetectMinSize = positions.min.width;
                        itemCamera.VideoLeft = positions.area.left * _this.nowVideoScale.XScale;
                        itemCamera.VideoTop = positions.area.top * _this.nowVideoScale.YScale;
                        itemCamera.VideoBottom = (defaultOptions.parent.height - positions.area.height - positions.area.top) * _this.nowVideoScale.YScale;
                        itemCamera.VideoRight = (defaultOptions.parent.width - positions.area.width - positions.area.left) * _this.nowVideoScale.XScale;
                    }
                });
            });
            this.treeDirectiveService.updateNodes(this.selectCameraTreeParams.treeId, this.tempSelectPositonCameraList);
            this.updateTreeDiyDom(this.selectCameraTreeParams.treeId, this.tempSelectPositonCameraList);
            this.treeDirectiveService.checkAllNodes(this.selectCameraTreeParams.treeId, false);
            this.tempSelectPositonCameraList = [];
            this.layerDec.successInfo('设置成功！');
        };
        NewFaceMonitorController.prototype.updateTreeDiyDom = function (treeId, treeNodes) {
            var _this = this;
            this.$timeout(function () {
                treeNodes.forEach(function (item) {
                    _this.selectCameraTreeParams.addDiyDom(treeId, item);
                });
            });
        };
        NewFaceMonitorController.prototype.changeThresholdType = function (type) {
            switch (type) {
                case ThresholdType_1.ThresholdType.Hight.value:
                    this.taskModel.LowThreshold = null;
                    break;
                case ThresholdType_1.ThresholdType.Low.value:
                    this.taskModel.HighThreshold = null;
                    break;
            }
        };
        NewFaceMonitorController.prototype.getEnumList = function () {
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
        ;
        NewFaceMonitorController.prototype.getCheckedList = function (treeType, treeId) {
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
        NewFaceMonitorController.prototype.onChangeSearchTree = function (treeId, name) {
            var _this = this;
            this.$timeout(function () {
                _this.treeDirectiveService.filterShowNodes(treeId, 'Name', name);
            });
        };
        ;
        NewFaceMonitorController.prototype.getTaskDetail = function (taskId) {
            var _this = this;
            if (taskId) {
                this.taskService.findFaceById(taskId).then(function (resp) {
                    if (resp && resp.code == 200) {
                        _this.initNewTackBaseParams(resp.data);
                    }
                    else {
                        _this.initNewTackBaseParams(null);
                    }
                    _this.initCameraTreeParams();
                    _this.initFaceLibTreeParams();
                });
            }
            else {
                this.initCameraTreeParams();
                this.initFaceLibTreeParams();
                this.initNewTackBaseParams(null);
            }
        };
        ;
        NewFaceMonitorController.prototype.initAuthStatusList = function () {
            this.authStatusList = [];
            for (var key in AuthStatus_1.AuthStatus) {
                this.authStatusList.push(AuthStatus_1.AuthStatus[key]);
            }
        };
        ;
        NewFaceMonitorController.prototype.initNewTackBaseParams = function (tackDetail) {
            if (!tackDetail) {
                this.taskModel.AuthStatus = AuthStatus_1.AuthStatus.Self.value;
                this.taskModel.AreaID = this.$stateParams.areaId;
                this.taskModel.Type = TaskType_1.TaskType.FaceMonitor.value;
                this.taskModel.TaskType = TaskType_1.TaskType.FaceMonitor.value;
                this.taskModel.OperateType = 'Add';
            }
            else {
                this.taskModel = tackDetail;
                this.taskModel.Type = TaskType_1.TaskType.FaceMonitor.value;
                this.taskModel.OperateType = 'Update';
                this.taskModel.HighThreshold == 0 ? this.taskModel.HighThreshold = null : null;
                this.taskModel.LowThreshold == 0 ? this.taskModel.LowThreshold = null : null;
                if (this.taskModel.AuthStatus === AuthStatus_1.AuthStatus.Part.value) {
                    this.selectPersonID = eval(this.taskModel.AuthUser);
                }
            }
        };
        ;
        NewFaceMonitorController.prototype.addTimeTemplate = function () {
            var scope = this.$scope.$new();
            scope.timeTplModel = this.taskModel.TimeTemplate;
            scope.isTask = true;
            this.layerIndex = this.layer.open({
                type: 1,
                content: runplanTpl,
                scope: scope,
                skin: "no-scroll",
                title: "选择时间模版",
                area: ["780px", "auto"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        NewFaceMonitorController.prototype.addEventRule = function () {
            var scope = this.$scope.$new();
            scope.isTask = true;
            scope.eventRule = this.taskModel.EventRule;
            this.layerIndex = this.layer.open({
                type: 1,
                content: eventRuleTpl,
                scope: scope,
                skin: "no-scroll",
                title: "选择联动策略",
                area: ["780px", "auto"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        NewFaceMonitorController.prototype.openPersonSelectModel = function () {
            var scope = this.$scope.$new();
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
        NewFaceMonitorController.prototype.validAndRestParams = function () {
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
            if (!this.taskModel.EventRule) {
                this.layerDec.warnInfo('请选择联动策略');
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
            if (this.faceLibSelectedIdList.length === 0) {
                this.layerDec.warnInfo('请选择人像库');
                return result;
            }
            else {
                this.taskModel.ArrLibIds = this.faceLibSelectedIdList;
            }
            if (this.selectCameraList.length === 0) {
                this.layerDec.warnInfo('请选择摄像机');
                return result;
            }
            else {
                this.taskModel.CameraParams = this.cameraParamSelectedList;
            }
            if (this.taskModel.AuthStatus === AuthStatus_1.AuthStatus.Part.value && this.selectPersonID.length === 0) {
                this.layerDec.warnInfo('请选择可见的用户');
                return result;
            }
            else {
                this.taskModel.AuthUsers = this.selectPersonID;
            }
            if (this.taskModel.HighThreshold)
                this.taskModel.HighThreshold = Number(this.taskModel.HighThreshold);
            if (this.taskModel.LowThreshold)
                this.taskModel.LowThreshold = Number(this.taskModel.LowThreshold);
            if (this.thresholdType === ThresholdType_1.ThresholdType.Hight.value && !this.taskModel.HighThreshold) {
                this.layerDec.warnInfo('请填写报警规则');
                return result;
            }
            if (this.thresholdType === ThresholdType_1.ThresholdType.Low.value && !this.taskModel.LowThreshold) {
                this.layerDec.warnInfo('请填写报警规则');
                return result;
            }
            return !result;
        };
        ;
        NewFaceMonitorController.prototype.submitTask = function () {
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
            var params = {};
            params.taskModel = this.taskModel;
            params.eventRule = this.taskModel.EventRule;
            this.taskService.addOrUpdateFaceTask(params).then(function (res) {
                if (res.code === 200) {
                    _this.cancelTask();
                }
            });
        };
        NewFaceMonitorController.prototype.cancelTask = function () {
            this.$state.go('baseconfig.task');
        };
        NewFaceMonitorController.$inject = [
            '$scope',
            '$state',
            '$stateParams',
            '$timeout',
            'layer',
            'treeDirectiveService',
            'taskService',
            'connectTreeService',
            'userInfoCacheFactory',
            'userService',
            'layerDec',
            'businessLibService',
            'resourceService',
        ];
        return NewFaceMonitorController;
    }());
    main_app_1.app.controller('newFaceMonitorController', NewFaceMonitorController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy90YXNrY29uZmlnL25ld0ZhY2VNb25pdG9yL25ld0ZhY2VNb25pdG9yLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBd0RBO1FBZ0RJLGtDQUFvQixNQUFXLEVBQ25CLE1BQVcsRUFDWCxZQUFpQixFQUNqQixRQUFhLEVBQ2IsS0FBVSxFQUNWLG9CQUEyQyxFQUMzQyxXQUF5QixFQUN6QixrQkFBdUMsRUFDdkMsb0JBQTJDLEVBQzNDLFdBQXlCLEVBQ3pCLFFBQW1CLEVBQ25CLGtCQUF1QyxFQUN2QyxlQUFpQztZQVo3QyxpQkF3Q0M7WUF4Q21CLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDbkIsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLGlCQUFZLEdBQVosWUFBWSxDQUFLO1lBQ2pCLGFBQVEsR0FBUixRQUFRLENBQUs7WUFDYixVQUFLLEdBQUwsS0FBSyxDQUFLO1lBQ1YseUJBQW9CLEdBQXBCLG9CQUFvQixDQUF1QjtZQUMzQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYztZQUN6Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXFCO1lBQ3ZDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBdUI7WUFDM0MsZ0JBQVcsR0FBWCxXQUFXLENBQWM7WUFDekIsYUFBUSxHQUFSLFFBQVEsQ0FBVztZQUNuQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXFCO1lBQ3ZDLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtZQTNEN0MsdUJBQWtCLEdBQVcsb0JBQW9CLENBQUM7WUFHbEQsYUFBUSxHQUFrQixFQUFFLENBQUM7WUFDN0IsY0FBUyxHQUFjLElBQUkscUJBQVMsRUFBRSxDQUFDO1lBQ3ZDLHFCQUFnQixHQUFvQixFQUFFLENBQUM7WUFDdkMsNEJBQXVCLEdBQXVCLEVBQUUsQ0FBQztZQUNqRCx1QkFBa0IsR0FBa0IsRUFBRSxDQUFDO1lBQ3ZDLHFCQUFnQixHQUFnQyxFQUFFLENBQUM7WUFDbkQscUJBQWdCLEdB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S0FBSyxDQUFBO1lBQ3BELENBQUM7WUFDRCxJQUFJLE1BQU0sR0FBRyxFQUFzRCxDQUFDO1lBQ3BFLE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNsQyxNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1lBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBNkI7Z0JBQzVFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDbkIsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO2dCQUNyQixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUE7UUFFTixDQUFDO1FBS0QsNkNBQVUsR0FBVjtZQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDckMsQ0FBQztRQXhwQk0sZ0NBQU8sR0FBRztZQUNiLFFBQVE7WUFDUixRQUFRO1lBQ1IsY0FBYztZQUNkLFVBQVU7WUFDVixPQUFPO1lBQ1Asc0JBQXNCO1lBQ3RCLGFBQWE7WUFDYixvQkFBb0I7WUFDcEIsc0JBQXNCO1lBQ3RCLGFBQWE7WUFDYixVQUFVO1lBQ1Ysb0JBQW9CO1lBQ3BCLGlCQUFpQjtTQUNwQixDQUFDO1FBMm9CTiwrQkFBQztLQXpyQkQsQUF5ckJDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLDBCQUEwQixFQUFFLHdCQUF3QixDQUFDLENBQUEiLCJmaWxlIjoibW9kdWxlL2Jhc2Vjb25maWcvdGFza2NvbmZpZy9uZXdGYWNlTW9uaXRvci9uZXdGYWNlTW9uaXRvci5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi8uLi8uLi9zZWxlY3RQb3B1cC9wZXJzb25TZWxlY3QvcGVyc29uLnNlbGVjdC5odG1sXCIgbmFtZT1cInBlcnNvblNlbGVjdEh0bWxcIiAvPlxyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uLy4uL3J1blBsYW4vcnVuUGxhbi5wb3B1cC5odG1sXCIgbmFtZT1cInJ1bnBsYW5UcGxcIiAvPlxyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uLy4uL2V2ZW50UnVsZS9ldmVudFJ1bGUucG9wdXAuaHRtbFwiIG5hbWU9XCJldmVudFJ1bGVUcGxcIiAvPlxyXG5pbXBvcnQgXCIuLi8uLi8uLi9zZWxlY3RQb3B1cC9wZXJzb25TZWxlY3QvcGVyc29uLnNlbGVjdC5jb250cm9sbGVyXCI7XHJcbmltcG9ydCBcIi4uLy4uL3J1blBsYW4vcnVuUGxhbi5wb3B1cC5jb250cm9sbGVyXCI7XHJcbmltcG9ydCBcIi4uLy4uL2V2ZW50UnVsZS9ldmVudFJ1bGUucG9wdXAuY29udHJvbGxlclwiO1xyXG5pbXBvcnQgXCJjc3MhLi4vLi4vc3R5bGUvYmFzZWNvbmZpZy1mYWNlLW1vbml0b3IuY3NzXCI7XHJcbmltcG9ydCB7IGFwcCB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCBcImFuZ3VsYXJcIjtcclxuaW1wb3J0IHsgRW51bSB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2VudW0vRW51bVwiO1xyXG5pbXBvcnQgeyBBdXRoU3RhdHVzIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vQXV0aFN0YXR1c1wiO1xyXG5pbXBvcnQgeyBUYXNrTW9kZWwsIENhbWVyYVBhcmFtIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvc2VydmVyL1Rhc2tNb2RlbFwiO1xyXG5cclxuaW1wb3J0IFwiLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL2Nvbm5lY3RUcmVlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgSUNvbm5lY3RUcmVlU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvY29ubmVjdFRyZWUuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBCYWNrUmVzcG9uc2VCb2R5LCBSZXNwb25zZVJlc3VsdCB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuXHJcblxyXG5pbXBvcnQgXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvdGFzay5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IElUYXNrU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvdGFzay5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEFyZWFFeCB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2VudGl0eS9leC9BcmVhRXhcIjtcclxuaW1wb3J0IHsgQ2FtZXJhRXggfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvQ2FtZXJhRXhcIjtcclxuaW1wb3J0IHsgVHJlZURhdGFQYXJhbXMgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUtcGFyYW1zXCI7XHJcbmltcG9ydCB7IFRyZWVUeXBlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvZW51bS9UcmVlVHlwZVwiO1xyXG5cclxuaW1wb3J0IHsgSVRyZWVEaXJlY3RpdmVTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLmRpcmVjdGl2ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uLy4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLmRpcmVjdGl2ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFRhc2tUeXBlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vVGFza1R5cGVcIjtcclxuaW1wb3J0IHsgUGVyc29uVHJlZUV4IH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L1BlcnNvblRyZWVFeFwiO1xyXG5pbXBvcnQgeyBJVXNlckluZm9DYWNoZUZhY3RvcnkgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2ZhY3RvcnkvdXNlcmluZm8uY2FjaGUuZmFjdG9yeVwiO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvZW50aXR5L1VzZXJcIjtcclxuaW1wb3J0IHsgSVVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcclxuaW1wb3J0IFwiLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL3VzZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBUaW1lVGVtcGxhdGUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9lbnRpdHkvVGltZVRlbXBsYXRlXCI7XHJcbmltcG9ydCB7IFRocmVzaG9sZFR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9zZXJ2ZXIvZW51bS9UaHJlc2hvbGRUeXBlXCI7XHJcbmltcG9ydCB7IElMYXllckRlYyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZmFjdG9yeS9sYXllck1zZy5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uLy4uLy4uL2NvbW1vbi9mYWN0b3J5L2xheWVyTXNnLmZhY3RvcnlcIjtcclxuaW1wb3J0IHsgQXVkaXRTdGF0dXMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9zZXJ2ZXIvZW51bS9BdWRpdFN0YXR1c1wiO1xyXG5pbXBvcnQgeyBUYXNrU3RhdHVzIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vVGFza1N0YXR1c1wiO1xyXG5pbXBvcnQgeyBCdXNpbmVzc0xpYkV4IH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0J1c2luZXNzTGliRXhcIjtcclxuaW1wb3J0IHsgQXJlYUFuZEJ1c2luZXNzTGlzdFJlc3VsdCB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL3BhcmFtcy9CdXNpbmVzc0xpYlBhcmFtc1wiO1xyXG5pbXBvcnQgeyBJQnVzaW5lc3NMaWJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9idXNpbmVzc0xpYi5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9idXNpbmVzc0xpYi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IERyYXdTcGFjZSwgSURyYXdTcGFjZSwgSURyYXdTcGFjZVBvc2l0aW9uVG9wLCBJU2NhbGUgfSBmcm9tIFwiLi9EcmF3U3BhY2VcIjtcclxuaW1wb3J0IHsgT2JqZWN0VHlwZSB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2VudW0vT2JqZWN0VHlwZVwiO1xyXG5pbXBvcnQgeyBJVmlkZW9PY3hDb250cm9sRnVuYywgVmlkZW9PY3hSZWFsVGltZU9wdCB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZGlyZWN0aXZlL29jeC92aWRlby5vY3guZGlyZWN0aXZlXCI7XHJcbmltcG9ydCB7IFZpZGVvT2N4QXR0ciB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZGlyZWN0aXZlL29jeC92aWRlby5vY3gubW9kZWxcIjtcclxuaW1wb3J0IHsgSVJlc291cmNlU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvcmVzb3VyY2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvcmVzb3VyY2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBFdmVudFJ1bGVFeCB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2VudGl0eS9leC9FdmVudFJ1bGVFeFwiO1xyXG5cclxuXHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueTtcclxuZGVjbGFyZSBsZXQgcGVyc29uU2VsZWN0SHRtbDogYW55LCBydW5wbGFuVHBsOiBhbnksIGV2ZW50UnVsZVRwbDogYW55O1xyXG50eXBlIEFyZWFCdXNpbmVzc0xpYkV4ID0gQXJlYUV4ICYgQnVzaW5lc3NMaWJFeDtcclxuXHJcbmNsYXNzIE5ld0ZhY2VNb25pdG9yQ29udHJvbGxlciB7XHJcbiAgICB0YXNrQ29uZmlnQXVkaXRLZXk6IHN0cmluZyA9IFwidG9vbE9wdGlvbi5teUNoZWNrXCI7Ly/lrqHmoLjkurrlkZjmnYPpmZDmoIforrBcclxuICAgIGF1dGhTdGF0dXNMaXN0OiBBcnJheTxFbnVtPjsvL+adg+mZkOaemuS4vlxyXG4gICAgbGF5ZXJJbmRleDogbnVtYmVyOy8vXHJcbiAgICBhcmVhTGlzdDogQXJyYXk8QXJlYUV4PiA9IFtdOy8v5Yy65Z+f5pWw5o2u55So5LqO5ZCI5oiQ6YCJ5Lit5pGE5YOP5py65qCR57uT5p6EXHJcbiAgICB0YXNrTW9kZWw6IFRhc2tNb2RlbCA9IG5ldyBUYXNrTW9kZWwoKTsvL+W9k+WJjeS7u+WKoW1vZGVsXHJcbiAgICBzZWxlY3RDYW1lcmFMaXN0OiBBcnJheTxDYW1lcmFFeD4gPSBbXTsvL+mAieS4reaRhOWDj+acuuWIl+ihqFxyXG4gICAgY2FtZXJhUGFyYW1TZWxlY3RlZExpc3Q6IEFycmF5PENhbWVyYVBhcmFtPiA9IFtdOy8v5pGE5YOP5py66YWN572u55qE5YiX6KGoXHJcbiAgICB0ZW1wU2VsZWN0ZWRQZXJzb246IEFycmF5PHN0cmluZz4gPSBbXTsvL+mAieaLqemDqOWIhuS6uuWPr+ingeeahOS6uuWRmGlk6ZuG5ZCIXHJcbiAgICBjYW1lcmFMaXN0Rm9yTWFwOiB7IFtrZXk6IHN0cmluZ106IENhbWVyYUV4IH0gPSB7fTsvL+aRhOWDj+acuueahG1hcOWvueixoVxyXG4gICAgY2FtZXJhVHJlZVBhcmFtczogVHJlZURhdGFQYXJhbXM8QXJlYUV4IHwgQ2FtZXJhRXg+ID0gbmV3IFRyZWVEYXRhUGFyYW1zPEFyZWFFeCB8IENhbWVyYUV4PigpOy8v5pGE5YOP5py65qCRXHJcbiAgICBzZWxlY3RDYW1lcmFUcmVlUGFyYW1zOiBUcmVlRGF0YVBhcmFtczxBcmVhRXggfCBDYW1lcmFFeD4gPSBuZXcgVHJlZURhdGFQYXJhbXM8QXJlYUV4IHwgQ2FtZXJhRXg+KCk7Ly/lt7LpgInmkYTlg4/mnLrmoJFcclxuICAgIGZhY2VMaWJUcmVlUGFyYW1zOiBUcmVlRGF0YVBhcmFtczxBcmVhQnVzaW5lc3NMaWJFeD4gPSBuZXcgVHJlZURhdGFQYXJhbXM8QXJlYUJ1c2luZXNzTGliRXg+KCk7Ly/kurrlg4/lupPmoJFcclxuICAgIHNlYXJjaENhbWVyYVN0cjogc3RyaW5nO1xyXG4gICAgc2VhcmNoU2VsZWN0Q2FtZXJhU3RyOiBzdHJpbmc7XHJcbiAgICBzZWFyY2hGYWNlTGliU3RyOiBzdHJpbmc7XHJcbiAgICBzZWxlY3RQZXJzb25JRDogQXJyYXk8c3RyaW5nPjtcclxuICAgIGhhc1Rhc2tBdWRpdDogYm9vbGVhbjtcclxuICAgIHVzZXJBdWRpdExpc3Q6IEFycmF5PFVzZXI+ID0gW107XHJcbiAgICB0aW1lVGVtcGxhdGVMaXN0OiBBcnJheTxUaW1lVGVtcGxhdGU+ID0gW107XHJcbiAgICBldmVudFJ1bGVMaXN0OiBBcnJheTxFdmVudFJ1bGVFeD4gPSBbXTtcclxuICAgIHRocmVzaG9sZFR5cGU6IHN0cmluZyA9IFRocmVzaG9sZFR5cGUuSGlnaHQudmFsdWU7XHJcbiAgICBmYWNlTGliU2VsZWN0ZWRJZExpc3Q6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgIHRlbXBTZWxlY3RQb3NpdG9uQ2FtZXJhTGlzdDogQXJyYXk8Q2FtZXJhRXg+ID0gW107XHJcbiAgICBEcmF3U3BhY2U6IElEcmF3U3BhY2U7XHJcbiAgICB2aWRlb09jeDogSVZpZGVvT2N4Q29udHJvbEZ1bmM7XHJcbiAgICBub3dWaWRlb09jeEF0dHI6IFZpZGVvT2N4QXR0cjtcclxuICAgIG5vd1ZpZGVvU2NhbGU6IElTY2FsZTtcclxuICAgIG9jeENhcHR1cmVQaWNTdHI6IHN0cmluZztcclxuICAgIHNob3dDYW1lcmFDb25maWc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHNob3dPY3g6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHBsYXlTdWNjZXNzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFtcclxuICAgICAgICAnJHNjb3BlJyxcclxuICAgICAgICAnJHN0YXRlJyxcclxuICAgICAgICAnJHN0YXRlUGFyYW1zJyxcclxuICAgICAgICAnJHRpbWVvdXQnLFxyXG4gICAgICAgICdsYXllcicsXHJcbiAgICAgICAgJ3RyZWVEaXJlY3RpdmVTZXJ2aWNlJyxcclxuICAgICAgICAndGFza1NlcnZpY2UnLFxyXG4gICAgICAgICdjb25uZWN0VHJlZVNlcnZpY2UnLFxyXG4gICAgICAgICd1c2VySW5mb0NhY2hlRmFjdG9yeScsXHJcbiAgICAgICAgJ3VzZXJTZXJ2aWNlJyxcclxuICAgICAgICAnbGF5ZXJEZWMnLFxyXG4gICAgICAgICdidXNpbmVzc0xpYlNlcnZpY2UnLFxyXG4gICAgICAgICdyZXNvdXJjZVNlcnZpY2UnLFxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW55LFxyXG4gICAgICAgIHByaXZhdGUgJHN0YXRlOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSAkc3RhdGVQYXJhbXM6IGFueSxcclxuICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBsYXllcjogYW55LFxyXG4gICAgICAgIHByaXZhdGUgdHJlZURpcmVjdGl2ZVNlcnZpY2U6IElUcmVlRGlyZWN0aXZlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHRhc2tTZXJ2aWNlOiBJVGFza1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBjb25uZWN0VHJlZVNlcnZpY2U6IElDb25uZWN0VHJlZVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSB1c2VySW5mb0NhY2hlRmFjdG9yeTogSVVzZXJJbmZvQ2FjaGVGYWN0b3J5LFxyXG4gICAgICAgIHByaXZhdGUgdXNlclNlcnZpY2U6IElVc2VyU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGxheWVyRGVjOiBJTGF5ZXJEZWMsXHJcbiAgICAgICAgcHJpdmF0ZSBidXNpbmVzc0xpYlNlcnZpY2U6IElCdXNpbmVzc0xpYlNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSByZXNvdXJjZVNlcnZpY2U6IElSZXNvdXJjZVNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLkRyYXdTcGFjZSA9IG5ldyBEcmF3U3BhY2UoKTtcclxuICAgICAgICB0aGlzLmhhc1Rhc2tBdWRpdCA9IHRoaXMudXNlckluZm9DYWNoZUZhY3RvcnkuaGFzRnVuY0F1dGgodGhpcy50YXNrQ29uZmlnQXVkaXRLZXkpO1xyXG4gICAgICAgIHRoaXMuZ2V0VGFza0RldGFpbCh0aGlzLiRzdGF0ZVBhcmFtcy50YXNrSWQpO1xyXG4gICAgICAgIHRoaXMuaW5pdEF1dGhTdGF0dXNMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5nZXRFbnVtTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdFNlbGVjdENhbWVyYVRyZWVQYXJhbXMoKTtcclxuICAgICAgICB0aGlzLiRzY29wZS4kb24oJ3BlcnNvbi5zZWxlY3QucG9wdXAnLCAoZXZlbnQ6IGFueSwgZGF0YT86IEFycmF5PHN0cmluZz4pID0+IHtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0UGVyc29uSUQgPSBkYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIuY2xvc2UodGhpcy5sYXllckluZGV4KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLiRzY29wZS4kb24oJ2FkZC5ydW5wbGFuLnBvcHVwJywgKGV2ZW50OiBhbnksIGlzRnJlc2g/OiBib29sZWFuLCBkYXRhPzogVGltZVRlbXBsYXRlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpc0ZyZXNoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tNb2RlbC5UaW1lVGVtcGxhdGVJRCA9IGRhdGEuSUQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tNb2RlbC5UaW1lVGVtcGxhdGUgPSBkYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIuY2xvc2UodGhpcy5sYXllckluZGV4KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLiRzY29wZS4kb24oJ2Nsb3NlLmV2ZW50UnVsZS5wb3B1cCcsIChldmVudDogYW55LCBpc0ZyZXNoPzogYm9vbGVhbiwgZXZlbnRSdWxlPzogRXZlbnRSdWxlRXgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZSh0aGlzLmxheWVySW5kZXgpO1xyXG4gICAgICAgICAgICBpZiAoaXNGcmVzaCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXNrTW9kZWwuRXZlbnRSdWxlID0gZXZlbnRSdWxlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2Mg5Yid5aeL5YyWb2N4XHJcbiAgICAgKiBAcGFyYW0ge0lWaWRlb09jeENvbnRyb2xGdW5jfSBvY3hDb250cm9sRnVuY1xyXG4gICAgICovXHJcbiAgICBpbml0Q29tcGxldGUob2N4Q29udHJvbEZ1bmM6IElWaWRlb09jeENvbnRyb2xGdW5jKSB7XHJcbiAgICAgICAgdGhpcy52aWRlb09jeCA9IG9jeENvbnRyb2xGdW5jO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2Mg5Yid5aeL5YyW5pGE5YOP5py65qCRXHJcbiAgICAgKi9cclxuICAgIGluaXRDYW1lcmFUcmVlUGFyYW1zKCkge1xyXG4gICAgICAgIHRoaXMuY2FtZXJhVHJlZVBhcmFtcy50cmVlSWQgPSAnQ2FtZXJhVHJlZUlEX0ZhY2VNb25pdG9yJztcclxuICAgICAgICB0aGlzLmNhbWVyYVRyZWVQYXJhbXMuaXNTaG93SWNvbiA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jYW1lcmFUcmVlUGFyYW1zLmlzU2hvd0xpbmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNhbWVyYVRyZWVQYXJhbXMuY2hlY2tFbmFibGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhVHJlZVBhcmFtcy5pc1NpbmdsZVNlbGVjdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhVHJlZVBhcmFtcy5pc1NpbXBsZURhdGEgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhVHJlZVBhcmFtcy5vbkNoZWNrID0gKGV2ZW50OiBFdmVudCwgdHJlZUlkOiBzdHJpbmcsIHRyZWVOb2RlOiBhbnkpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdENhbWVyYUxpc3QgPSB0aGlzLmdldENoZWNrZWRMaXN0KFRyZWVUeXBlLmNhbWVyYS52YWx1ZSwgdGhpcy5jYW1lcmFUcmVlUGFyYW1zLnRyZWVJZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbWVyYVBhcmFtU2VsZWN0ZWRMaXN0ID0gdGhpcy5zZWxlY3RDYW1lcmFUb0NhbWVyYVBhcmFtcyh0aGlzLnNlbGVjdENhbWVyYUxpc3QpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuY2FtZXJhVHJlZVBhcmFtcy50cmVlSW5pdENvbXBsZXRlID0gKHRyZWVJZDogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRzdGF0ZVBhcmFtcy50YXNrSWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FtZXJhUGFyYW1TZWxlY3RlZExpc3QgPSB0aGlzLnRhc2tNb2RlbC5DYW1lcmFQYXJhbXNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLnRhc2tNb2RlbC5DYW1lcmFQYXJhbXMpICYmIHRoaXMudGFza01vZGVsLkNhbWVyYVBhcmFtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWRzOiBBcnJheTxzdHJpbmc+ID0gdGhpcy50YXNrTW9kZWwuQ2FtZXJhUGFyYW1zLm1hcCgoaXRlbTogQ2FtZXJhUGFyYW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5DYW1lcmFJRDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0Q2hlY2tUcmVlQnlJZHMoVHJlZVR5cGUuY2FtZXJhLnZhbHVlLCB0aGlzLmNhbWVyYVRyZWVQYXJhbXMudHJlZUlkLCBpZHMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RDYW1lcmFMaXN0ID0gdGhpcy5nZXRDaGVja2VkTGlzdChUcmVlVHlwZS5jYW1lcmEudmFsdWUsIHRoaXMuY2FtZXJhVHJlZVBhcmFtcy50cmVlSWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmNvbm5lY3RUcmVlU2VydmljZS5maW5kQXJlYUNhbWVyYSgpLnRoZW4oKHJlczogQXJyYXk8QXJlYUV4IHwgQ2FtZXJhRXg+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhVHJlZVBhcmFtcy50cmVlRGF0YXMgPSByZXM7XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzLmZvckVhY2goKGl0ZW06IENhbWVyYUV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW1lcmFMaXN0Rm9yTWFwW2l0ZW0uSURdID0gaXRlbTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZWxlY3RDYW1lcmFUb0NhbWVyYVBhcmFtcyhsaXN0OiBBcnJheTxDYW1lcmFFeD4pIHtcclxuICAgICAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8Q2FtZXJhUGFyYW0+O1xyXG4gICAgICAgIGxpc3QuZm9yRWFjaCgoaXRlbTogQ2FtZXJhRXgsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgbGV0IGlzSGF2YSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgbDogbnVtYmVyO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2FtZXJhUGFyYW1TZWxlY3RlZExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhbWVyYVBhcmFtU2VsZWN0ZWRMaXN0W2ldLkNhbWVyYUlEID09PSBpdGVtLklEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNIYXZhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBsID0gaTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWlzSGF2YSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IENhbWVyYVBvc2l0b24gPSBuZXcgQ2FtZXJhUGFyYW0oKTtcclxuICAgICAgICAgICAgICAgIENhbWVyYVBvc2l0b24uQ2FtZXJhSUQgPSBpdGVtLklEO1xyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2goQ2FtZXJhUG9zaXRvbik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaCh0aGlzLmNhbWVyYVBhcmFtU2VsZWN0ZWRMaXN0W2xdKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2Mg5bey6YCJ5pGE5YOP5py65qCR6YWN572uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdFNlbGVjdENhbWVyYVRyZWVQYXJhbXMoKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RDYW1lcmFUcmVlUGFyYW1zID0gbmV3IFRyZWVEYXRhUGFyYW1zPEFyZWFFeCB8IENhbWVyYUV4Pih0cnVlKTtcclxuICAgICAgICB0aGlzLnNlbGVjdENhbWVyYVRyZWVQYXJhbXMudHJlZUlkID0gJ1NlbGVjdF9DYW1lcmFUcmVlSURfRmFjZU1vbml0b3InO1xyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdENhbWVyYVRyZWVQYXJhbXMuaXNTaG93SWNvbiA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RDYW1lcmFUcmVlUGFyYW1zLmlzU2hvd0xpbmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3RDYW1lcmFUcmVlUGFyYW1zLmNoZWNrRW5hYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3RDYW1lcmFUcmVlUGFyYW1zLmlzU2luZ2xlU2VsZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RDYW1lcmFUcmVlUGFyYW1zLmlzU2ltcGxlRGF0YSA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuc2VsZWN0Q2FtZXJhVHJlZVBhcmFtcy5vbkNoZWNrID0gKGV2ZW50OiBFdmVudCwgdHJlZUlkOiBzdHJpbmcsIHRyZWVOb2RlOiBhbnkpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRlbXBTZWxlY3RQb3NpdG9uQ2FtZXJhTGlzdCA9IHRoaXMuZ2V0Q2hlY2tlZExpc3QoVHJlZVR5cGUuY2FtZXJhLnZhbHVlLCB0aGlzLnNlbGVjdENhbWVyYVRyZWVQYXJhbXMudHJlZUlkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNlbGVjdENhbWVyYVRyZWVQYXJhbXMub25EYmxDbGljayA9IChldmVudDogRXZlbnQsIHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZTogQ2FtZXJhRXgpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgaWYgKHRyZWVOb2RlLnRyZWVUeXBlID09PSBUcmVlVHlwZS5jYW1lcmEudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheVN1Y2Nlc3MgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuRHJhd1NwYWNlLmlzU2hvd0FyZWFTcGFjZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dPY3ggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5UmVhbFRpbWUodHJlZU5vZGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudHJlZURpcmVjdGl2ZVNlcnZpY2UudXBkYXRlTm9kZUNoZWNrZWQodHJlZUlkLCB0cmVlTm9kZS50SWQsIHRydWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcFNlbGVjdFBvc2l0b25DYW1lcmFMaXN0ID0gdGhpcy5nZXRDaGVja2VkTGlzdChUcmVlVHlwZS5jYW1lcmEudmFsdWUsIHRoaXMuc2VsZWN0Q2FtZXJhVHJlZVBhcmFtcy50cmVlSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNlbGVjdENhbWVyYVRyZWVQYXJhbXMudHJlZUluaXRDb21wbGV0ZSA9ICh0cmVlSWQ6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnRyZWVEaXJlY3RpdmVTZXJ2aWNlLmV4cGFuZEFsbCh0aGlzLnNlbGVjdENhbWVyYVRyZWVQYXJhbXMudHJlZUlkLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy50cmVlRGlyZWN0aXZlU2VydmljZS5jaGVja0FsbE5vZGVzKHRoaXMuc2VsZWN0Q2FtZXJhVHJlZVBhcmFtcy50cmVlSWQsIGZhbHNlKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdENhbWVyYVRyZWVQYXJhbXMuYWRkRGl5RG9tID0gKHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0cmVlTm9kZSAmJiB0cmVlTm9kZS5pc1NldENhbWVyYVBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgLy8g5pi+56S65bey5biD54K55qCH5b+XXHJcbiAgICAgICAgICAgICAgICBsZXQgbG9jYXRlU3RyID0gXCI8c3BhbiBjbGFzcz0nanMtbG9jYXRlLWRpeS1kb20nPuKImjwvc3Bhbj5cIjtcclxuICAgICAgICAgICAgICAgIGxldCBhT2JqID0gYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRyZWVOb2RlLnRJZCArIFwiX2FcIiksIFwiI1wiICsgdHJlZU5vZGUudElkICsgXCJfYVwiKTtcclxuICAgICAgICAgICAgICAgIC8vIOiLpeW3suWtmOWcqOW4g+eCueagh+W/l+WImei3s+i/h1xyXG4gICAgICAgICAgICAgICAgaWYgKGFPYmouY2hpbGRyZW4oXCIuanMtbG9jYXRlLWRpeS1kb21cIikuc2l6ZSgpIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBhT2JqLmFwcGVuZChsb2NhdGVTdHIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRyZWVOb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDnp7vpmaTluIPngrnmoIflv5dcclxuICAgICAgICAgICAgICAgIGxldCBhT2JqID0gYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRyZWVOb2RlLnRJZCArIFwiX2FcIiksIFwiI1wiICsgdHJlZU5vZGUudElkICsgXCJfYVwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChhT2JqLmNoaWxkcmVuKFwiLmpzLWxvY2F0ZS1kaXktZG9tXCIpLnNpemUoKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYU9iai5jaGlsZHJlbihcIi5qcy1sb2NhdGUtZGl5LWRvbVwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2Mg5Yid5aeL5YyW5Lq65YOP5bqT5qCRXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdEZhY2VMaWJUcmVlUGFyYW1zKCkge1xyXG4gICAgICAgIHRoaXMuZmFjZUxpYlRyZWVQYXJhbXMgPSBuZXcgVHJlZURhdGFQYXJhbXM8QXJlYUJ1c2luZXNzTGliRXg+KHRydWUpO1xyXG4gICAgICAgIHRoaXMuZmFjZUxpYlRyZWVQYXJhbXMudHJlZUlkID0gJ0ZhY2VMaWJUcmVlSURfRmFjZU1vbml0b3InO1xyXG5cclxuICAgICAgICB0aGlzLmZhY2VMaWJUcmVlUGFyYW1zLmlzU2hvd0ljb24gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZmFjZUxpYlRyZWVQYXJhbXMuaXNTaG93TGluZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLmZhY2VMaWJUcmVlUGFyYW1zLmNoZWNrRW5hYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5mYWNlTGliVHJlZVBhcmFtcy5pc1NpbmdsZVNlbGVjdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZmFjZUxpYlRyZWVQYXJhbXMuaXNTaW1wbGVEYXRhID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5mYWNlTGliVHJlZVBhcmFtcy5vbkNoZWNrID0gKGV2ZW50OiBFdmVudCwgdHJlZUlkOiBzdHJpbmcsIHRyZWVOb2RlOiBhbnkpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgLy/mm7TmlrDlt7LpgIkg5Lq66IS45bqTIGlkcyDpm4blkIhcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUZhY2VMaWJDaGVja0lkTGlzdCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmZhY2VMaWJUcmVlUGFyYW1zLnRyZWVJbml0Q29tcGxldGUgPSAodHJlZUlkOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuJHN0YXRlUGFyYW1zLnRhc2tJZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mYWNlTGliU2VsZWN0ZWRJZExpc3QgPSB0aGlzLnRhc2tNb2RlbC5BcnJMaWJJZHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0Q2hlY2tUcmVlQnlJZHMoVHJlZVR5cGUuYnVzaW5lc3NMaWIudmFsdWUsIHRyZWVJZCwgdGhpcy5mYWNlTGliU2VsZWN0ZWRJZExpc3QpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5idXNpbmVzc0xpYlNlcnZpY2UuZmluZEhhc1NlbGZUcmVlV2l0aEFyZWEoKS50aGVuKChyZXNwOiBSZXNwb25zZVJlc3VsdDxBcmVhQW5kQnVzaW5lc3NMaXN0UmVzdWx0PikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzcCAmJiByZXNwLmNvZGUgPT0gMjAwICYmIHJlc3AuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcmVhTGlzdCA9IHJlc3AuZGF0YS5hcmVhRXhMaXN0O1xyXG4gICAgICAgICAgICAgICAgbGV0IHRyZWVEYXRhID0gW10uY29uY2F0KHJlc3AuZGF0YS5idXNpbmVzc0xpYkV4TGlzdCwgdGhpcy5hcmVhTGlzdCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhY2VMaWJUcmVlUGFyYW1zLnRyZWVEYXRhcyA9IHRyZWVEYXRhO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2Mg5pu05paw5Lq65YOP5bqT5qCR77yM5Lul6YCJ5Lit6IqC54K5SUTpm4blkIhcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVGYWNlTGliQ2hlY2tJZExpc3QoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHRyZWVUeXBlOiBzdHJpbmcgPSBUcmVlVHlwZS5idXNpbmVzc0xpYi52YWx1ZTtcclxuICAgICAgICBsZXQgdHJlZUlkOiBzdHJpbmcgPSB0aGlzLmZhY2VMaWJUcmVlUGFyYW1zLnRyZWVJZDtcclxuICAgICAgICBsZXQgYWxsQ2hlY2tCdXNpbmVzc0xpYiA9IHRoaXMuZ2V0Q2hlY2tlZExpc3QodHJlZVR5cGUsIHRyZWVJZCk7XHJcbiAgICAgICAgbGV0IGZhY2VMaWJJZExpc3QgPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIGlmIChhbGxDaGVja0J1c2luZXNzTGliICYmIGFsbENoZWNrQnVzaW5lc3NMaWIubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goYWxsQ2hlY2tCdXNpbmVzc0xpYiwgKHZhbDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsLnRyZWVUeXBlID09PSBUcmVlVHlwZS5idXNpbmVzc0xpYi52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZhY2VMaWJJZExpc3QucHVzaCh2YWwuSUQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mYWNlTGliU2VsZWN0ZWRJZExpc3QgPSBmYWNlTGliSWRMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2Mg5pi+56S66YWN572u5pGE5YOP5py6XHJcbiAgICAgKi9cclxuICAgIHNob3dDYW1lcmFDb25maWdGbigpIHtcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RDYW1lcmFMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RDYW1lcmFMaXN0LmZvckVhY2goKGl0ZW06IENhbWVyYUV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLlBhcmVudElEID0gaXRlbS5BcmVhSUQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgdHJlZURhdGUgPSBbXS5jb25jYXQoYW5ndWxhci5jb3B5KHRoaXMuc2VsZWN0Q2FtZXJhTGlzdCksIHRoaXMuYXJlYUxpc3QpO1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0Q2FtZXJhVHJlZVBhcmFtcy50cmVlRGF0YXMgPSB0cmVlRGF0ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0NhbWVyYUNvbmZpZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd09jeCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuRHJhd1NwYWNlLmlzU2hvd0FyZWFTcGFjZShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMudHJlZURpcmVjdGl2ZVNlcnZpY2Uuc2V0Q2hrRGlzYWJsZWRBbGwodGhpcy5jYW1lcmFUcmVlUGFyYW1zLnRyZWVJZCwgdHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sYXllckRlYy53YXJuSW5mbygn5b2T5YmN5pyq6YCJ5oup5Lu75L2V5pGE5YOP5py677yBJylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyDlj5bmtojphY3nva7mkYTlg4/mnLrlkoxvY3hcclxuICAgICAqL1xyXG4gICAgY2VuY2FsQ29uZmlnKCkge1xyXG4gICAgICAgIHRoaXMuc2hvd0NhbWVyYUNvbmZpZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvd09jeCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudHJlZURpcmVjdGl2ZVNlcnZpY2Uuc2V0Q2hrRGlzYWJsZWRBbGwodGhpcy5jYW1lcmFUcmVlUGFyYW1zLnRyZWVJZCwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2Mg5pKt5pS+b2N4XHJcbiAgICAgKiBAcGFyYW0ge0NhbWVyYUV4fSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHBsYXlSZWFsVGltZShpdGVtOiBDYW1lcmFFeCkge1xyXG4gICAgICAgIGlmIChpdGVtICYmIHRoaXMudmlkZW9PY3gpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZVNlcnZpY2UuZ2V0RGV2aWNlQnlJZChpdGVtLklELCBPYmplY3RUeXBlLkNhbWVyYS52YWx1ZSkudGhlbigocmVzOiBDYW1lcmFFeCAmIE9iamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuSnNvblVzZXJEYXRhLmhhc093blByb3BlcnR5KCdWaWRlb1NlcnZlcicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9wdHMgPSBuZXcgVmlkZW9PY3hSZWFsVGltZU9wdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdHMuaXAgPSByZXMuSnNvblVzZXJEYXRhLlZpZGVvU2VydmVyLklwQWRkcmVzcztcclxuICAgICAgICAgICAgICAgICAgICBvcHRzLnBvcnQgPSByZXMuSnNvblVzZXJEYXRhLlZpZGVvU2VydmVyLlBvcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5wYXRoID0gcmVzLlBsYXlOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdHMudXNlciA9IHJlcy5Kc29uVXNlckRhdGEuVmlkZW9TZXJ2ZXIuVWlkO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdHMucGFzc3dkID0gcmVzLkpzb25Vc2VyRGF0YS5WaWRlb1NlcnZlci5Qd2Q7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBsYXlSZXMgPSB0aGlzLnZpZGVvT2N4LnBsYXlSZWFsVGltZShvcHRzLCB0aGlzLnZpZGVvT2N4LmdldEZvY3VzV2luZG93SW5kZXgoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXlSZXMgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1RPRE8g6YeN572u55S75biD5aSn5bCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkRyYXdTcGFjZS5yZXNldFBvc2l0aW9uQXJlYSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5EcmF3U3BhY2UucmVzZXRQb3NpdGlvblNpemUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlTdWNjZXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm93VmlkZW9PY3hBdHRyID0gdGhpcy52aWRlb09jeC5nZXRWaWRlb0F0dHJpYnV0ZSh0aGlzLnZpZGVvT2N4LmdldEZvY3VzV2luZG93SW5kZXgoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2NhbGUgPSBuZXcgSVNjYWxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZS5YU2NhbGUgPSB0aGlzLm5vd1ZpZGVvT2N4QXR0ci53aWR0aCAvIHRoaXMuRHJhd1NwYWNlLmdldFBvc2l0aW9uKCkuYXJlYS53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLllTY2FsZSA9IHRoaXMubm93VmlkZW9PY3hBdHRyLmhlaWdodCAvIHRoaXMuRHJhd1NwYWNlLmdldFBvc2l0aW9uKCkuYXJlYS5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vd1ZpZGVvU2NhbGUgPSBzY2FsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuRHJhd1NwYWNlLmdldFBvc2l0aW9uKCkuYXJlYSwgc2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5EcmF3U3BhY2Uuc2V0U2NhbGUoc2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAyMDAwKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXllckRlYy53YXJuSW5mbygn5peg5rOV5pKt5pS+5pGE5YOP5py677yBJylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2Mgb2N45oiq5Zu+XHJcbiAgICAgKi9cclxuICAgIGNhcHR1cmVQaWMoKSB7XHJcbiAgICAgICAgbGV0IFBpY1N0cjogc3RyaW5nID0gdGhpcy52aWRlb09jeC5jYXRjaFBpY3RydWUodGhpcy52aWRlb09jeC5nZXRGb2N1c1dpbmRvd0luZGV4KCkpO1xyXG4gICAgICAgIHRoaXMub2N4Q2FwdHVyZVBpY1N0ciA9IFwiZGF0YTppbWFnZS9qcGc7YmFzZTY0LFwiICsgUGljU3RyO1xyXG4gICAgICAgIHRoaXMuc3RvcCgpO1xyXG4gICAgICAgIHRoaXMuc2hvd09jeCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuRHJhd1NwYWNlLmlzU2hvd0FyZWFTcGFjZSh0cnVlKTtcclxuICAgICAgICB0aGlzLkRyYXdTcGFjZS5zZXRJbWFnZSh0aGlzLm9jeENhcHR1cmVQaWNTdHIpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyDlgZzmraLmkq3mlL5vY3hcclxuICAgICAqL1xyXG4gICAgc3RvcCgpIHtcclxuICAgICAgICBpZiAodGhpcy52aWRlb09jeCkge1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvT2N4LnN0b3AodGhpcy52aWRlb09jeC5nZXRGb2N1c1dpbmRvd0luZGV4KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyDorr7nva7luIPmjqfmkYTlg4/mnLrlj4LmlbBcclxuICAgICAqL1xyXG4gICAgc2V0Q2FuZXJhUG9zaXRvbigpIHtcclxuICAgICAgICB0aGlzLnRlbXBTZWxlY3RQb3NpdG9uQ2FtZXJhTGlzdCA9IHRoaXMuZ2V0Q2hlY2tlZExpc3QoVHJlZVR5cGUuY2FtZXJhLnZhbHVlLCB0aGlzLnNlbGVjdENhbWVyYVRyZWVQYXJhbXMudHJlZUlkKTtcclxuICAgICAgICBsZXQgcG9zaXRpb25zOiBJRHJhd1NwYWNlUG9zaXRpb25Ub3AgPSB0aGlzLkRyYXdTcGFjZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIGxldCBkZWZhdWx0T3B0aW9ucyA9IHRoaXMuRHJhd1NwYWNlLmdldERlZmF1bHRPcHRpb25zKCk7XHJcbiAgICAgICAgdGhpcy50ZW1wU2VsZWN0UG9zaXRvbkNhbWVyYUxpc3QuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGl0ZW0uaXNTZXRDYW1lcmFQYXJhbXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNhbWVyYVBhcmFtU2VsZWN0ZWRMaXN0LmZvckVhY2goKGl0ZW1DYW1lcmE6IENhbWVyYVBhcmFtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5JRCA9PT0gaXRlbUNhbWVyYS5DYW1lcmFJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1DYW1lcmEuRGV0ZWN0TWF4U2l6ZSA9IHBvc2l0aW9ucy5tYXgud2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbUNhbWVyYS5EZXRlY3RNaW5TaXplID0gcG9zaXRpb25zLm1pbi53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtQ2FtZXJhLlZpZGVvTGVmdCA9IHBvc2l0aW9ucy5hcmVhLmxlZnQgKiB0aGlzLm5vd1ZpZGVvU2NhbGUuWFNjYWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1DYW1lcmEuVmlkZW9Ub3AgPSBwb3NpdGlvbnMuYXJlYS50b3AgKiB0aGlzLm5vd1ZpZGVvU2NhbGUuWVNjYWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1DYW1lcmEuVmlkZW9Cb3R0b20gPSAoZGVmYXVsdE9wdGlvbnMucGFyZW50LmhlaWdodCAtIHBvc2l0aW9ucy5hcmVhLmhlaWdodCAtIHBvc2l0aW9ucy5hcmVhLnRvcCkgKiB0aGlzLm5vd1ZpZGVvU2NhbGUuWVNjYWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1DYW1lcmEuVmlkZW9SaWdodCA9IChkZWZhdWx0T3B0aW9ucy5wYXJlbnQud2lkdGggLSBwb3NpdGlvbnMuYXJlYS53aWR0aCAtIHBvc2l0aW9ucy5hcmVhLmxlZnQpICogdGhpcy5ub3dWaWRlb1NjYWxlLlhTY2FsZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy50cmVlRGlyZWN0aXZlU2VydmljZS51cGRhdGVOb2Rlcyh0aGlzLnNlbGVjdENhbWVyYVRyZWVQYXJhbXMudHJlZUlkLCB0aGlzLnRlbXBTZWxlY3RQb3NpdG9uQ2FtZXJhTGlzdCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUcmVlRGl5RG9tKHRoaXMuc2VsZWN0Q2FtZXJhVHJlZVBhcmFtcy50cmVlSWQsIHRoaXMudGVtcFNlbGVjdFBvc2l0b25DYW1lcmFMaXN0KTtcclxuICAgICAgICB0aGlzLnRyZWVEaXJlY3RpdmVTZXJ2aWNlLmNoZWNrQWxsTm9kZXModGhpcy5zZWxlY3RDYW1lcmFUcmVlUGFyYW1zLnRyZWVJZCwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMudGVtcFNlbGVjdFBvc2l0b25DYW1lcmFMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5sYXllckRlYy5zdWNjZXNzSW5mbygn6K6+572u5oiQ5Yqf77yBJylcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIOaJuemHj+WOu+abtOaWsGRpeURvbeeKtuaAgVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRyZWVJZFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxhbnk+fSB0cmVlTm9kZXNcclxuICAgICAqL1xyXG4gICAgdXBkYXRlVHJlZURpeURvbSh0cmVlSWQ6IHN0cmluZywgdHJlZU5vZGVzOiBBcnJheTxhbnk+KSB7XHJcbiAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRyZWVOb2Rlcy5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0Q2FtZXJhVHJlZVBhcmFtcy5hZGREaXlEb20odHJlZUlkLCBpdGVtKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2Mg5L+u5pS55oql6K2m6ZiI5YC857G75Z6LXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxyXG4gICAgICovXHJcbiAgICBjaGFuZ2VUaHJlc2hvbGRUeXBlKHR5cGU6IHN0cmluZykge1xyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFRocmVzaG9sZFR5cGUuSGlnaHQudmFsdWU6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tNb2RlbC5Mb3dUaHJlc2hvbGQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVGhyZXNob2xkVHlwZS5Mb3cudmFsdWU6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tNb2RlbC5IaWdoVGhyZXNob2xkID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyDojrflj5bml7bpl7TmqKHniYjliJfooajvvIzlrqHmoLjmnYPpmZDkurrlkZjliJfooajvvIzogZTliqjnrZbnlaXliJfooahcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRFbnVtTGlzdCgpIHtcclxuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLmdldExpc3RCeUZ1bmNBdXRoQ29kZSh0aGlzLnRhc2tDb25maWdBdWRpdEtleSkudGhlbigocmVzcDogUmVzcG9uc2VSZXN1bHQ8QXJyYXk8VXNlcj4+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXNwLmRhdGEgJiYgcmVzcC5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyQXVkaXRMaXN0ID0gcmVzcC5kYXRhO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyQXVkaXRMaXN0ID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyDojrflj5blt7LpgInmi6nnmoQg5qCR6IqC54K56ZuG5ZCIXHJcbiAgICAgKiBAdGltZTogMjAxNy0wNi0xMiAxMjowMjozMlxyXG4gICAgICogQHBhcmFtczogdHJlZVR5cGUg5Yu+6YCJ6IqC54K5IOagkeexu+Wei+agh+ivhlxyXG4gICAgICogQHBhcmFtczogdHJlZUlkIOWLvumAieiKgueCuSDmoJFJRFxyXG4gICAgICogQHJldHVybjogQXJyYXk8Q2FtZXJhRXg+JkFycmF5PEJ1c2luZXNzTGliRXg+IOiKgueCuembhuWQiCDnsbvlnovkuI4gdHJlZVR5cGUg55u45a+55bqUXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0Q2hlY2tlZExpc3QodHJlZVR5cGU6IHN0cmluZywgdHJlZUlkOiBzdHJpbmcpOiBBcnJheTxDYW1lcmFFeD4ge1xyXG4gICAgICAgIGxldCB0cmVlQ2hlY2tlZE5vZGVzID0gdGhpcy50cmVlRGlyZWN0aXZlU2VydmljZS5nZXRDaGVja2VkTm9kZXModHJlZUlkLCB0cnVlKTtcclxuICAgICAgICBsZXQgcmVzdWx0OiBBcnJheTxDYW1lcmFFeD4gPSBbXSBhcyBBcnJheTxDYW1lcmFFeD47XHJcbiAgICAgICAgaWYgKHRyZWVDaGVja2VkTm9kZXMpIHtcclxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHRyZWVDaGVja2VkTm9kZXMsICh2YWw6IENhbWVyYUV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsLnRyZWVUeXBlID09PSB0cmVlVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHZhbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvbkNoYW5nZVNlYXJjaFRyZWUodHJlZUlkOiBzdHJpbmcsIG5hbWU/OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy50cmVlRGlyZWN0aXZlU2VydmljZS5maWx0ZXJTaG93Tm9kZXModHJlZUlkLCAnTmFtZScsIG5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIOiOt+WPluS7u+WKoeivpuaDhe+8jO+8iOe8lui+keaXtuWAme+8iVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhc2tJZFxyXG4gICAgICovXHJcbiAgICBnZXRUYXNrRGV0YWlsKHRhc2tJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRhc2tJZCkge1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tTZXJ2aWNlLmZpbmRGYWNlQnlJZCh0YXNrSWQpLnRoZW4oKHJlc3A6IFJlc3BvbnNlUmVzdWx0PFRhc2tNb2RlbD4pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXNwICYmIHJlc3AuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXROZXdUYWNrQmFzZVBhcmFtcyhyZXNwLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXROZXdUYWNrQmFzZVBhcmFtcyhudWxsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdENhbWVyYVRyZWVQYXJhbXMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdEZhY2VMaWJUcmVlUGFyYW1zKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdENhbWVyYVRyZWVQYXJhbXMoKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0RmFjZUxpYlRyZWVQYXJhbXMoKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0TmV3VGFja0Jhc2VQYXJhbXMobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyDliJ3lp4vljJbmnYPpmZDnsbvlnovmnprkuL5cclxuICAgICAqL1xyXG4gICAgaW5pdEF1dGhTdGF0dXNMaXN0KCkge1xyXG4gICAgICAgIHRoaXMuYXV0aFN0YXR1c0xpc3QgPSBbXSBhcyBBcnJheTxFbnVtPjtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gQXV0aFN0YXR1cykge1xyXG4gICAgICAgICAgICB0aGlzLmF1dGhTdGF0dXNMaXN0LnB1c2goQXV0aFN0YXR1c1trZXldKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIOWIneWni+WMliDlop7mlLkg5Lu75Yqh5Z+65pys5bGe5oCnXHJcbiAgICBpbml0TmV3VGFja0Jhc2VQYXJhbXModGFja0RldGFpbDogVGFza01vZGVsKSB7XHJcbiAgICAgICAgLy8g6Iul5peg5p2D6ZmQ77yM6buY6K6kIOmAieS4rSDku4Xoh6rlt7Hlj6/op4FcclxuICAgICAgICBpZiAoIXRhY2tEZXRhaWwpIHtcclxuICAgICAgICAgICAgdGhpcy50YXNrTW9kZWwuQXV0aFN0YXR1cyA9IEF1dGhTdGF0dXMuU2VsZi52YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy50YXNrTW9kZWwuQXJlYUlEID0gdGhpcy4kc3RhdGVQYXJhbXMuYXJlYUlkO1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tNb2RlbC5UeXBlID0gVGFza1R5cGUuRmFjZU1vbml0b3IudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMudGFza01vZGVsLlRhc2tUeXBlID0gVGFza1R5cGUuRmFjZU1vbml0b3IudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMudGFza01vZGVsLk9wZXJhdGVUeXBlID0gJ0FkZCc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy50YXNrTW9kZWwgPSB0YWNrRGV0YWlsO1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tNb2RlbC5UeXBlID0gVGFza1R5cGUuRmFjZU1vbml0b3IudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMudGFza01vZGVsLk9wZXJhdGVUeXBlID0gJ1VwZGF0ZSc7XHJcbiAgICAgICAgICAgIHRoaXMudGFza01vZGVsLkhpZ2hUaHJlc2hvbGQgPT0gMCA/IHRoaXMudGFza01vZGVsLkhpZ2hUaHJlc2hvbGQgPSBudWxsIDogbnVsbDtcclxuICAgICAgICAgICAgdGhpcy50YXNrTW9kZWwuTG93VGhyZXNob2xkID09IDAgPyB0aGlzLnRhc2tNb2RlbC5Mb3dUaHJlc2hvbGQgPSBudWxsIDogbnVsbDtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGFza01vZGVsLkF1dGhTdGF0dXMgPT09IEF1dGhTdGF0dXMuUGFydC52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RQZXJzb25JRCA9IGV2YWwodGhpcy50YXNrTW9kZWwuQXV0aFVzZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyDmlrDlop7ml7bpl7TmqKHniYgo5by55qGGKVxyXG4gICAgICovXHJcbiAgICBhZGRUaW1lVGVtcGxhdGUoKSB7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IGlzVGFzazogYm9vbGVhbiwgdGltZVRwbE1vZGVsOiBUaW1lVGVtcGxhdGUsICRkZXN0cm95OiBGdW5jdGlvbiB9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLnRpbWVUcGxNb2RlbCA9IHRoaXMudGFza01vZGVsLlRpbWVUZW1wbGF0ZTtcclxuICAgICAgICBzY29wZS5pc1Rhc2sgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubGF5ZXJJbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IHJ1bnBsYW5UcGwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgc2tpbjogXCJuby1zY3JvbGxcIixcclxuICAgICAgICAgICAgdGl0bGU6IFwi6YCJ5oup5pe26Ze05qih54mIXCIsXHJcbiAgICAgICAgICAgIGFyZWE6IFtcIjc4MHB4XCIsIFwiYXV0b1wiXSxcclxuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBhZGRFdmVudFJ1bGUoKSB7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IGlzVGFzazogYm9vbGVhbiwgZXZlbnRSdWxlOiBFdmVudFJ1bGVFeCwgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUuaXNUYXNrID0gdHJ1ZTtcclxuICAgICAgICBzY29wZS5ldmVudFJ1bGUgPSB0aGlzLnRhc2tNb2RlbC5FdmVudFJ1bGU7XHJcbiAgICAgICAgdGhpcy5sYXllckluZGV4ID0gdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgY29udGVudDogZXZlbnRSdWxlVHBsLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIHNraW46IFwibm8tc2Nyb2xsXCIsXHJcbiAgICAgICAgICAgIHRpdGxlOiBcIumAieaLqeiBlOWKqOetlueVpVwiLFxyXG4gICAgICAgICAgICBhcmVhOiBbXCI3ODBweFwiLCBcImF1dG9cIl0sXHJcbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKkBkZXNjIOW9k+adg+mZkOmAieaLqemDqOWIhueUqOaIt+aXtu+8jOeUqOaIt+mAieaLqVxyXG4gICAgICovXHJcbiAgICBvcGVuUGVyc29uU2VsZWN0TW9kZWwoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IHRyZWVEYXRhOiBBcnJheTxBcmVhRXggfCBQZXJzb25UcmVlRXg+LCBzZWxlY3RQZXJzb25JRDogQXJyYXk8c3RyaW5nPiwgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUuc2VsZWN0UGVyc29uSUQgPSB0aGlzLnNlbGVjdFBlcnNvbklEO1xyXG4gICAgICAgIHRoaXMubGF5ZXJJbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIHNjcm9sbGJhcjogZmFsc2UsXHJcbiAgICAgICAgICAgIHRpdGxlOiBbJ+mAieaLqeeUqOaItycsICd0ZXh0LWFsaWduOiBsZWZ0OyddLFxyXG4gICAgICAgICAgICBjb250ZW50OiBwZXJzb25TZWxlY3RIdG1sLFxyXG4gICAgICAgICAgICBza2luOiAndXBkYXRlLXBlcnNvbi1sYXllcicsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgYXJlYTogW1wiYXV0b1wiXSxcclxuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIOagueaNriDmlbDmja7pm4blkIgg5Yu+6YCJIOWvueW6lOeahOagkeiKgueCuVxyXG4gICAgICogQHBhcmFtczogdHJlZVR5cGUg5Yu+6YCJ6IqC54K5IOagkeexu+Wei+agh+ivhlxyXG4gICAgICogQHBhcmFtczogdHJlZUlkIOWLvumAieiKgueCuSDmoJFJRFxyXG4gICAgICogQHBhcmFtczogaWRzIOe7k+WQiFxyXG4gICAgICogQHBhcmFtczogcGFyYW1OYW1lIOWMuemFjeWPguaVsOWQjeensCDpu5jorqQgXCJJRFwiXHJcbiAgICAgKiBAcmV0dXJuOlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRlZmF1bHRDaGVja1RyZWVCeUlkcyA9ICh0cmVlVHlwZTogc3RyaW5nLCB0cmVlSWQ6IHN0cmluZywgaWRzOiBBcnJheTxzdHJpbmc+LCBwYXJhbU5hbWU/OiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICAgICAgICBpZiAoIXBhcmFtTmFtZSkge1xyXG4gICAgICAgICAgICBwYXJhbU5hbWUgPSBcIklEXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGlkcykgJiYgaWRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IGNoZWNrUGFyYW1zTGlzdCA9IFtdIGFzIEFycmF5PHsga2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfT47XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChpZHMsICh2YWw6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2hlY2tQYXJhbXNMaXN0LnB1c2goeyBrZXk6IHBhcmFtTmFtZSwgdmFsdWU6IHZhbCB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMudHJlZURpcmVjdGl2ZVNlcnZpY2UuY2hlY2tOb2Rlc0J5UGFyYW1zTGlzdCh0cmVlSWQsIGNoZWNrUGFyYW1zTGlzdCwgdHJ1ZSlcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2Mg55So5LqO6aqM6K+B55So5oi36L6T5YWlXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHZhbGlkQW5kUmVzdFBhcmFtcygpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgcmVzdWx0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKCF0aGlzLnRhc2tNb2RlbCkge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyRGVjLndhcm5JbmZvKCfor7floavlhpnku7vliqHlkI3np7AnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMudGFza01vZGVsLkF1ZGl0VXNlcikge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyRGVjLndhcm5JbmZvKCfor7fpgInmi6nlrqHmoLjnlKjmiLcnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMudGFza01vZGVsLlRpbWVUZW1wbGF0ZUlEKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXJEZWMud2FybkluZm8oJ+ivt+mAieaLqei/kOihjOiuoeWIkicpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy50YXNrTW9kZWwuRXZlbnRSdWxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXJEZWMud2FybkluZm8oJ+ivt+mAieaLqeiBlOWKqOetlueVpScpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgodGhpcy50YXNrTW9kZWwuVmFsaWRUaW1lU3RhcnQgJiYgIXRoaXMudGFza01vZGVsLlZhbGlkVGltZUVuZCkgfHwgKCF0aGlzLnRhc2tNb2RlbC5WYWxpZFRpbWVTdGFydCAmJiB0aGlzLnRhc2tNb2RlbC5WYWxpZFRpbWVFbmQpIHx8ICh0aGlzLnRhc2tNb2RlbC5WYWxpZFRpbWVTdGFydCA+IHRoaXMudGFza01vZGVsLlZhbGlkVGltZUVuZCkpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXllckRlYy53YXJuSW5mbygn6K+35aGr5YaZ5q2j56Gu55qE5pyJ5pWI5pyfJyk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLnRhc2tNb2RlbC5WYWxpZFRpbWVTdGFydCAmJiAhdGhpcy50YXNrTW9kZWwuVmFsaWRUaW1lRW5kKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFza01vZGVsLklzTG9uZ0VmZmVjdGl2ZSA9IHRydWVcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tNb2RlbC5Jc0xvbmdFZmZlY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZmFjZUxpYlNlbGVjdGVkSWRMaXN0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyRGVjLndhcm5JbmZvKCfor7fpgInmi6nkurrlg4/lupMnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFza01vZGVsLkFyckxpYklkcyA9IHRoaXMuZmFjZUxpYlNlbGVjdGVkSWRMaXN0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdENhbWVyYUxpc3QubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXJEZWMud2FybkluZm8oJ+ivt+mAieaLqeaRhOWDj+acuicpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy50YXNrTW9kZWwuQ2FtZXJhUGFyYW1zID0gdGhpcy5jYW1lcmFQYXJhbVNlbGVjdGVkTGlzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudGFza01vZGVsLkF1dGhTdGF0dXMgPT09IEF1dGhTdGF0dXMuUGFydC52YWx1ZSAmJiB0aGlzLnNlbGVjdFBlcnNvbklELmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyRGVjLndhcm5JbmZvKCfor7fpgInmi6nlj6/op4HnmoTnlKjmiLcnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFza01vZGVsLkF1dGhVc2VycyA9IHRoaXMuc2VsZWN0UGVyc29uSURcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudGFza01vZGVsLkhpZ2hUaHJlc2hvbGQpIHRoaXMudGFza01vZGVsLkhpZ2hUaHJlc2hvbGQgPSBOdW1iZXIodGhpcy50YXNrTW9kZWwuSGlnaFRocmVzaG9sZCk7XHJcbiAgICAgICAgaWYgKHRoaXMudGFza01vZGVsLkxvd1RocmVzaG9sZCkgdGhpcy50YXNrTW9kZWwuTG93VGhyZXNob2xkID0gTnVtYmVyKHRoaXMudGFza01vZGVsLkxvd1RocmVzaG9sZCk7XHJcbiAgICAgICAgaWYgKHRoaXMudGhyZXNob2xkVHlwZSA9PT0gVGhyZXNob2xkVHlwZS5IaWdodC52YWx1ZSAmJiAhdGhpcy50YXNrTW9kZWwuSGlnaFRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyRGVjLndhcm5JbmZvKCfor7floavlhpnmiqXorabop4TliJknKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMudGhyZXNob2xkVHlwZSA9PT0gVGhyZXNob2xkVHlwZS5Mb3cudmFsdWUgJiYgIXRoaXMudGFza01vZGVsLkxvd1RocmVzaG9sZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyRGVjLndhcm5JbmZvKCfor7floavlhpnmiqXorabop4TliJknKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuICFyZXN1bHQ7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIOeUqOaIt+aPkOS6pOW4g+aOp+S7u+WKoVxyXG4gICAgICovXHJcbiAgICBzdWJtaXRUYXNrKCkge1xyXG4gICAgICAgIGlmICghdGhpcy52YWxpZEFuZFJlc3RQYXJhbXMoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGFza01vZGVsLkNyZWF0ZVRpbWUgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy50YXNrTW9kZWwuQ3JlYXRlVXNlcklEID0gdGhpcy51c2VySW5mb0NhY2hlRmFjdG9yeS5nZXRDdXJyZW50VXNlcklkKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRhc2tNb2RlbC5BdWRpdFVzZXIgPT09IHRoaXMudGFza01vZGVsLkNyZWF0ZVVzZXJJRCkge1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tNb2RlbC5BdWRpdFN0YXR1cyA9IEF1ZGl0U3RhdHVzLlZlcmlmaWVkLnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tNb2RlbC5TdGF0dXMgPSBUYXNrU3RhdHVzLlJ1bi52YWx1ZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFza01vZGVsLkF1ZGl0U3RhdHVzID0gQXVkaXRTdGF0dXMuVmVyaWZpbmcudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMudGFza01vZGVsLlN0YXR1cyA9IFRhc2tTdGF0dXMuV2FpdGluZy52YWx1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcGFyYW1zID0ge30gYXMgeyB0YXNrTW9kZWw6IFRhc2tNb2RlbCwgZXZlbnRSdWxlOiBFdmVudFJ1bGVFeCB9O1xyXG4gICAgICAgIHBhcmFtcy50YXNrTW9kZWwgPSB0aGlzLnRhc2tNb2RlbDtcclxuICAgICAgICBwYXJhbXMuZXZlbnRSdWxlID0gdGhpcy50YXNrTW9kZWwuRXZlbnRSdWxlO1xyXG4gICAgICAgIHRoaXMudGFza1NlcnZpY2UuYWRkT3JVcGRhdGVGYWNlVGFzayhwYXJhbXMpLnRoZW4oKHJlczogQmFja1Jlc3BvbnNlQm9keTxzdHJpbmc+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbFRhc2soKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyDlj5bmtojmlrDlop7miJbkv67mlLnku7vliqFcclxuICAgICAqL1xyXG4gICAgY2FuY2VsVGFzaygpIHtcclxuICAgICAgICB0aGlzLiRzdGF0ZS5nbygnYmFzZWNvbmZpZy50YXNrJylcclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ25ld0ZhY2VNb25pdG9yQ29udHJvbGxlcicsIE5ld0ZhY2VNb25pdG9yQ29udHJvbGxlcikiXX0=
