define(["require", "exports", "../../common/app/main.app", "../../common/directive/tree/tree-params", "../../../core/entity/ex/EventRuleEx", "../../../core/enum/TreeType", "../../../core/server/enum/ActionType", "css!../style/task-case.css", "../../common/directive/tree/tree.directive.service", "../../common/services/connectTree.service", "../../common/services/eventRule.service"], function (require, exports, main_app_1, tree_params_1, EventRuleEx_1, TreeType_1, ActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var sendAlarmMsgTreeId = "monitorSendAlarmMsgTree";
    var sendAlarmPersonTreeId = "monitorSendAlarmPersonTree";
    var EventRulePopupController = (function () {
        function EventRulePopupController($scope, $timeout, connectTreeService, treeService, layerDec, eventRuleService) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.connectTreeService = connectTreeService;
            this.treeService = treeService;
            this.layerDec = layerDec;
            this.eventRuleService = eventRuleService;
            this.actionTypeMap = ActionType_1.ActionTypeMap;
            this.eventRuleList = [];
            this.eventRule = new EventRuleEx_1.EventRuleEx();
            this.sendAlarmPersonTreeId = sendAlarmPersonTreeId;
            this.sendAlarmToClientPersonSelectList = [];
            this.showPersonTree = false;
            this.sendAlarmMsgTreeId = sendAlarmMsgTreeId;
            this.showMsgTree = false;
            this.sendMsgPersonSelectList = [];
            this.actionTypeMap.SendSms.treeId = sendAlarmMsgTreeId;
            this.actionTypeMap.SendAlarmToClient.treeId = sendAlarmPersonTreeId;
            this.initParams(this.$scope.eventRule ? this.$scope.eventRule.ID : null);
            this.initEventRuleList();
        }
        EventRulePopupController.prototype.initEventRuleList = function () {
            var _this = this;
            this.eventRuleService.findAllEventRule().then(function (res) {
                if (res.code === 200) {
                    _this.eventRuleList = res.data;
                }
            });
        };
        EventRulePopupController.prototype.initParams = function (id) {
            var _this = this;
            this.eventRule.EventRuleAction = {
                SendAlarmToClient: {
                    RecieveUserIDList: [],
                    RecieveUnitIDList: []
                },
                SendSms: {
                    Text: null,
                    recievePersonIDList: [],
                    recieveUnitIDList: []
                }
            };
            if (id) {
                this.initEventRuleModel(id).then(function () {
                    _this.initTreeParams();
                    _this.initTreeData();
                });
            }
            else {
                this.initTreeParams();
                this.initTreeData();
            }
        };
        EventRulePopupController.prototype.initTreeData = function () {
            var _this = this;
            this.connectTreeService.findAreaWithPerson().then(function (resp) {
                _this.sendAlarmMsgTreeParams.treeDatas = resp;
            });
            this.connectTreeService.findAreaWithUser().then(function (resp) {
                _this.sendAlarmPersonTreeParams.treeDatas = resp;
            });
        };
        EventRulePopupController.prototype.initEventRuleModel = function (id) {
            var _this = this;
            return this.eventRuleService.getDetail(id).then(function (res) {
                if (res.code === 200) {
                    _this.eventRule = res.data;
                    if (res.data.EventRuleAction) {
                        _this.eventRule.EventRuleAction = res.data.EventRuleAction;
                    }
                    else {
                        _this.eventRule.EventRuleAction = {};
                    }
                    if (_this.eventRule.EventRuleAction.hasOwnProperty(ActionType_1.ActionType.SendSms.value)) {
                        _this.eventRule.EventRuleAction.SendSms = res.data.EventRuleAction.SendSms;
                    }
                    else {
                        _this.eventRule.EventRuleAction.SendSms = {
                            Text: null,
                            recievePersonIDList: [],
                            recieveUnitIDList: []
                        };
                    }
                    if (_this.eventRule.EventRuleAction.hasOwnProperty(ActionType_1.ActionType.SendAlarmToClient.value)) {
                        _this.eventRule.EventRuleAction.SendAlarmToClient = res.data.EventRuleAction.SendAlarmToClient;
                    }
                    else {
                        _this.eventRule.EventRuleAction.SendAlarmToClient = {
                            RecieveUserIDList: [],
                            RecieveUnitIDList: []
                        };
                    }
                    console.log(_this.eventRule);
                }
            });
        };
        EventRulePopupController.prototype.initTreeParams = function () {
            var _this = this;
            this.sendAlarmPersonTreeParams = new tree_params_1.TreeDataParams(true);
            this.sendAlarmPersonTreeParams.treeId = this.sendAlarmPersonTreeId;
            this.sendAlarmPersonTreeParams.treeIdKey = "ID";
            this.sendAlarmPersonTreeParams.treePidKey = "ParentID";
            this.sendAlarmPersonTreeParams.treeKeyName = "Name";
            this.sendAlarmPersonTreeParams.isShowIcon = true;
            this.sendAlarmPersonTreeParams.isShowLine = false;
            this.sendAlarmPersonTreeParams.checkEnable = true;
            this.sendAlarmPersonTreeParams.isSingleSelect = false;
            this.sendAlarmPersonTreeParams.isSimpleData = true;
            this.sendAlarmPersonTreeParams.onCheck = function (event, treeId, treeNode) {
                _this.$timeout(function () {
                    _this.updateTreeSelectedList(_this.sendAlarmPersonTreeParams.treeId);
                });
            };
            this.sendAlarmPersonTreeParams.treeInitComplete = function (treeId) {
                _this.treeService.expandAll(treeId, true);
                console.log(_this.eventRule);
                var checkedIdList = _this.eventRule.EventRuleAction.SendAlarmToClient.RecieveUserIDList || [];
                if (checkedIdList && checkedIdList.length > 0) {
                    _this.treeService.checkNodesBy(_this.sendAlarmPersonTreeParams.treeId, _this.sendAlarmPersonTreeParams.treeIdKey, checkedIdList, true);
                    _this.$timeout(function () {
                        _this.updateTreeSelectedList(_this.sendAlarmPersonTreeParams.treeId);
                    });
                }
            };
            this.sendAlarmMsgTreeParams = new tree_params_1.TreeDataParams(true);
            this.sendAlarmMsgTreeParams.treeId = this.sendAlarmMsgTreeId;
            this.sendAlarmMsgTreeParams.treeIdKey = "ID";
            this.sendAlarmMsgTreeParams.treePidKey = "ParentID";
            this.sendAlarmMsgTreeParams.treeKeyName = "Name";
            this.sendAlarmMsgTreeParams.isShowIcon = true;
            this.sendAlarmMsgTreeParams.isShowLine = false;
            this.sendAlarmMsgTreeParams.checkEnable = true;
            this.sendAlarmMsgTreeParams.isSingleSelect = false;
            this.sendAlarmMsgTreeParams.isSimpleData = true;
            this.sendAlarmMsgTreeParams.onCheck = function (event, treeId, treeNode) {
                _this.$timeout(function () {
                    _this.updateTreeSelectedList(_this.sendAlarmMsgTreeParams.treeId);
                });
            };
            this.sendAlarmMsgTreeParams.treeInitComplete = function (treeId) {
                _this.treeService.expandAll(treeId, true);
                var checkedIdList = _this.eventRule.EventRuleAction.SendSms.recievePersonIDList || [];
                if (checkedIdList && checkedIdList.length > 0) {
                    _this.treeService.checkNodesBy(_this.sendAlarmMsgTreeParams.treeId, _this.sendAlarmMsgTreeParams.treeIdKey, checkedIdList, true);
                    _this.$timeout(function () {
                        _this.updateTreeSelectedList(_this.sendAlarmMsgTreeParams.treeId);
                    });
                }
            };
        };
        ;
        EventRulePopupController.prototype.updateTreeSelectedList = function (treeId) {
            switch (treeId) {
                case this.sendAlarmMsgTreeParams.treeId:
                    this.sendMsgPersonSelectList = this.getTreeCheckList(treeId, TreeType_1.TreeType.person.value);
                    if (this.sendMsgPersonSelectList && this.sendMsgPersonSelectList.length > 0) {
                        this.changeActionTypeBySelect(treeId);
                    }
                    break;
                case this.sendAlarmPersonTreeParams.treeId:
                    this.sendAlarmToClientPersonSelectList = this.getTreeCheckList(treeId, TreeType_1.TreeType.person.value);
                    if (this.sendAlarmToClientPersonSelectList && this.sendAlarmToClientPersonSelectList.length > 0) {
                        this.changeActionTypeBySelect(treeId);
                    }
                    break;
            }
        };
        ;
        EventRulePopupController.prototype.insetTplEventRule = function (id) {
            var _this = this;
            if (id) {
                this.eventRuleService.getDetail(id).then(function (res) {
                    if (res.code === 200) {
                        var eventAction = res.data.EventRuleAction;
                        if (eventAction) {
                            if (eventAction.hasOwnProperty(ActionType_1.ActionType.SendSms.value)) {
                                _this.eventRule.EventRuleAction.SendSms = res.data.EventRuleAction.SendSms;
                                _this.sendAlarmMsgTreeParams.treeInitComplete(_this.sendAlarmMsgTreeParams.treeId);
                            }
                            if (eventAction.hasOwnProperty(ActionType_1.ActionType.SendAlarmToClient.value)) {
                                _this.eventRule.EventRuleAction.SendAlarmToClient = res.data.EventRuleAction.SendAlarmToClient;
                                _this.sendAlarmPersonTreeParams.treeInitComplete(_this.sendAlarmPersonTreeParams.treeId);
                            }
                        }
                    }
                });
            }
        };
        EventRulePopupController.prototype.onChangeActionType = function (data) {
            data.isCheck = !data.isCheck;
            data.isShrink = !data.isShrink;
            if (data.isCheck === false) {
                if (data.treeId) {
                    this.removeAllSelectedPerson(data.treeId, 1);
                    if (data.isShrink) {
                        this.onChangeShrinkStatus(data);
                    }
                }
            }
            else {
                if (data.isShrink === false) {
                    this.onChangeShrinkStatus(data);
                }
            }
        };
        ;
        EventRulePopupController.prototype.onChangeShrinkStatus = function (data) {
            data.isShrink = !data.isShrink;
            angular.forEach(this.actionTypeMap, function (val, index) {
                if (val.value !== data.value) {
                    val.isShrink = false;
                }
            });
        };
        ;
        EventRulePopupController.prototype.changeActionTypeBySelect = function (treeId) {
            angular.forEach(this.actionTypeMap, function (val, index) {
                if (val.treeId === treeId && !val.isCheck) {
                    val.isCheck = true;
                }
            });
        };
        ;
        EventRulePopupController.prototype.getTreeCheckList = function (treeId, treeType) {
            var treeCheckedNodes = this.treeService.getCheckedNodes(treeId, true);
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
        EventRulePopupController.prototype.removeSelectedPerson = function (treeId, tItem) {
            this.treeService.updateNodeChecked(treeId, tItem.tId, false);
            this.updateTreeSelectedList(treeId);
        };
        EventRulePopupController.prototype.removeAllSelectedPerson = function (treeId, itemNum) {
            if (itemNum > 0) {
                this.treeService.checkAllNodes(treeId, false);
                this.updateTreeSelectedList(treeId);
            }
        };
        EventRulePopupController.prototype.addOrUpdateEventRule = function () {
            var _this = this;
            if (!this.eventRule.Name) {
                return this.layerDec.warnInfo('请输入预案名称！');
            }
            if (this.sendAlarmToClientPersonSelectList.length === 0 && this.sendMsgPersonSelectList.length === 0) {
                return this.layerDec.warnInfo('请设置预案动作！');
            }
            if (this.sendMsgPersonSelectList.length > 0 && !this.eventRule.EventRuleAction.SendSms.Text) {
                return this.layerDec.warnInfo('请填写短信内容！');
            }
            this.eventRule.EventRuleAction.SendAlarmToClient.RecieveUserIDList = this.sendAlarmToClientPersonSelectList.map(function (item) {
                return item.ID;
            });
            console.log(this.eventRule);
            this.eventRule.EventRuleAction.SendSms.recievePersonIDList = this.sendMsgPersonSelectList.map(function (item) {
                return item.ID;
            });
            this.eventRule.CreateTime = Date.now().toString();
            this.eventRule.AreaID = this.$scope.AreaID;
            this.eventRule.IsTemplate = !this.$scope.isTask;
            if (!this.eventRule.EventRuleAction.SendSms.Text) {
                delete this.eventRule.EventRuleAction.SendSms;
            }
            if (this.$scope.isTask) {
                this.cancelPopup(true);
            }
            else {
                this.eventRuleService.saveOrUpdateEventRule(this.eventRule).then(function (res) {
                    if (res.code === 200 && res.data) {
                        _this.eventRule.ID = res.data;
                        _this.cancelPopup(true);
                    }
                });
            }
        };
        EventRulePopupController.prototype.cancelPopup = function (isFresh) {
            this.$scope.$emit('close.eventRule.popup', isFresh, this.eventRule);
        };
        EventRulePopupController.$inject = ['$scope',
            '$timeout', 'connectTreeService', "treeDirectiveService",
            'layerDec', 'eventRuleService'];
        return EventRulePopupController;
    }());
    main_app_1.app
        .controller('EventRulePopupController', EventRulePopupController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9ldmVudFJ1bGUvZXZlbnRSdWxlLnBvcHVwLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBb0JBLElBQU0sa0JBQWtCLEdBQVcseUJBQXlCLENBQUM7SUFDN0QsSUFBTSxxQkFBcUIsR0FBVyw0QkFBNEIsQ0FBQztJQUVuRTtRQXNCSSxrQ0FBb0IsTUFBVyxFQUNYLFFBQWEsRUFDYixrQkFBdUMsRUFDdkMsV0FBa0MsRUFDbEMsUUFBbUIsRUFDbkIsZ0JBQW1DO1lBTG5DLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDWCxhQUFRLEdBQVIsUUFBUSxDQUFLO1lBQ2IsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFxQjtZQUN2QyxnQkFBVyxHQUFYLFdBQVcsQ0FBdUI7WUFDbEMsYUFBUSxHQUFSLFFBQVEsQ0FBVztZQUNuQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQW1CO1lBdkJoRCxrQkFBYSxHQUFtQiwwQkFBYSxDQUFDO1lBRTlDLGtCQUFhLEdBQXVCLEVBQUUsQ0FBQztZQUl2QyxjQUFTLEdBQWdCLElBQUkseUJBQVcsRUFBRSxDQUFDO1lBRzNDLDBCQUFxQixHQUFXLHFCQUFxQixDQUFDO1lBQ3RELHNDQUFpQyxHQUF3QixFQUFFLENBQUM7WUFDbkUsbUJBQWMsR0FBWSxLQUFLLENBQUM7WUFHekIsdUJBQWtCLEdBQVcsa0JBQWtCLENBQUM7WUFDdkQsZ0JBQVcsR0FBWSxLQUFLLENBQUM7WUFDdEIsNEJBQXVCLEdBQXNCLEVBQUUsQ0FBQztZQVNuRCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsa0JBQWtCLENBQUM7WUFDdkQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcscUJBQXFCLENBQUM7WUFDcEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1B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UyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUE7WUFDakQsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUEwQjtvQkFDeEYsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQy9CLEtBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7d0JBQzdCLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzNCLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUE7WUFDTixDQUFDO1FBRUwsQ0FBQztRQUdELDhDQUFXLEdBQVgsVUFBWSxPQUFpQjtZQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3ZFLENBQUM7UUF6VU0sZ0NBQU8sR0FBRyxDQUFDLFFBQVE7WUFDdEIsVUFBVSxFQUFFLG9CQUFvQixFQUFFLHNCQUFzQjtZQUN4RCxVQUFVLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQXdVeEMsK0JBQUM7S0EzVUQsQUEyVUMsSUFBQTtJQUVELGNBQUc7U0FDRSxVQUFVLENBQUMsMEJBQTBCLEVBQUUsd0JBQXdCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvYmFzZWNvbmZpZy9ldmVudFJ1bGUvZXZlbnRSdWxlLnBvcHVwLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJjc3MhLi4vc3R5bGUvdGFzay1jYXNlLmNzc1wiO1xyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IHtUcmVlRGF0YVBhcmFtc30gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLXBhcmFtc1wiO1xyXG5pbXBvcnQge1BlcnNvblRyZWVFeH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L1BlcnNvblRyZWVFeFwiO1xyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vZGlyZWN0aXZlL3RyZWUvdHJlZS5kaXJlY3RpdmUuc2VydmljZVwiO1xyXG5pbXBvcnQge0lUcmVlRGlyZWN0aXZlU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLmRpcmVjdGl2ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7RXZlbnRSdWxlRXgsIEV2ZW50UnVsZUFjdGlvbn0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0V2ZW50UnVsZUV4XCI7XHJcbmltcG9ydCB7VHJlZVR5cGV9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudW0vVHJlZVR5cGVcIjtcclxuaW1wb3J0IHtBcmVhRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9BcmVhRXhcIjtcclxuaW1wb3J0IHtFbnVtQ2hlY2tFeCwgQWN0aW9uVHlwZU1hcCwgSUFjdGlvblR5cGVNYXAsIEFjdGlvblR5cGV9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL0FjdGlvblR5cGVcIjtcclxuaW1wb3J0IHtJTGF5ZXJEZWN9IGZyb20gXCIuLi8uLi9jb21tb24vZmFjdG9yeS9sYXllck1zZy5mYWN0b3J5XCI7XHJcbmltcG9ydCB7QmFja1Jlc3BvbnNlQm9keX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdFwiO1xyXG5pbXBvcnQge0lDb25uZWN0VHJlZVNlcnZpY2V9IGZyb20gXCIuLi8uLi9jb21tb24vc2VydmljZXMvY29ubmVjdFRyZWUuc2VydmljZVwiO1xyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vc2VydmljZXMvY29ubmVjdFRyZWUuc2VydmljZVwiO1xyXG5pbXBvcnQge1VzZXJUcmVlRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9Vc2VyVHJlZUV4XCI7XHJcbmltcG9ydCB7SUV2ZW50UnVsZVNlcnZpY2V9IGZyb20gXCIuLi8uLi9jb21tb24vc2VydmljZXMvZXZlbnRSdWxlLnNlcnZpY2VcIjtcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2V2ZW50UnVsZS5zZXJ2aWNlXCI7XHJcblxyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcblxyXG5jb25zdCBzZW5kQWxhcm1Nc2dUcmVlSWQ6IHN0cmluZyA9IFwibW9uaXRvclNlbmRBbGFybU1zZ1RyZWVcIjtcclxuY29uc3Qgc2VuZEFsYXJtUGVyc29uVHJlZUlkOiBzdHJpbmcgPSBcIm1vbml0b3JTZW5kQWxhcm1QZXJzb25UcmVlXCI7XHJcblxyXG5jbGFzcyBFdmVudFJ1bGVQb3B1cENvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsXHJcbiAgICAgICAgJyR0aW1lb3V0JywgJ2Nvbm5lY3RUcmVlU2VydmljZScsIFwidHJlZURpcmVjdGl2ZVNlcnZpY2VcIixcclxuICAgICAgICAnbGF5ZXJEZWMnLCAnZXZlbnRSdWxlU2VydmljZSddO1xyXG4gICAgcHVibGljIGFjdGlvblR5cGVNYXA6IElBY3Rpb25UeXBlTWFwID0gQWN0aW9uVHlwZU1hcDtcclxuXHJcbiAgICBwdWJsaWMgZXZlbnRSdWxlTGlzdDogQXJyYXk8RXZlbnRSdWxlRXg+ID0gW107XHJcbiAgICBwdWJsaWMgdHBsRXZlbnRSdWxlSWQ6IHN0cmluZztcclxuXHJcbiAgICAvLyDnlKjmiLfmoJFcclxuICAgIHB1YmxpYyBldmVudFJ1bGU6IEV2ZW50UnVsZUV4ID0gbmV3IEV2ZW50UnVsZUV4KCk7XHJcbiAgICAvLyDmiqXoraZcclxuICAgIHB1YmxpYyBzZW5kQWxhcm1QZXJzb25UcmVlUGFyYW1zOiBUcmVlRGF0YVBhcmFtczxQZXJzb25UcmVlRXggJiBBcmVhRXg+O1xyXG4gICAgcHVibGljIHNlbmRBbGFybVBlcnNvblRyZWVJZDogc3RyaW5nID0gc2VuZEFsYXJtUGVyc29uVHJlZUlkO1xyXG4gICAgcHVibGljIHNlbmRBbGFybVRvQ2xpZW50UGVyc29uU2VsZWN0TGlzdDogQXJyYXk8UGVyc29uVHJlZUV4PiA9IFtdO1xyXG4gICAgc2hvd1BlcnNvblRyZWU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8vIOefreS/oVxyXG4gICAgcHVibGljIHNlbmRBbGFybU1zZ1RyZWVQYXJhbXM6IFRyZWVEYXRhUGFyYW1zPFBlcnNvblRyZWVFeCAmIEFyZWFFeD47XHJcbiAgICBwdWJsaWMgc2VuZEFsYXJtTXNnVHJlZUlkOiBzdHJpbmcgPSBzZW5kQWxhcm1Nc2dUcmVlSWQ7XHJcbiAgICBzaG93TXNnVHJlZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIHNlbmRNc2dQZXJzb25TZWxlY3RMaXN0OiBBcnJheTxVc2VyVHJlZUV4PiA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNvbm5lY3RUcmVlU2VydmljZTogSUNvbm5lY3RUcmVlU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgdHJlZVNlcnZpY2U6IElUcmVlRGlyZWN0aXZlU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbGF5ZXJEZWM6IElMYXllckRlYyxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgZXZlbnRSdWxlU2VydmljZTogSUV2ZW50UnVsZVNlcnZpY2UpIHtcclxuICAgICAgICAvLyDliKTmlq3pobXpnaLmqKHlvI9cclxuICAgICAgICB0aGlzLmFjdGlvblR5cGVNYXAuU2VuZFNtcy50cmVlSWQgPSBzZW5kQWxhcm1Nc2dUcmVlSWQ7XHJcbiAgICAgICAgdGhpcy5hY3Rpb25UeXBlTWFwLlNlbmRBbGFybVRvQ2xpZW50LnRyZWVJZCA9IHNlbmRBbGFybVBlcnNvblRyZWVJZDtcclxuICAgICAgICB0aGlzLmluaXRQYXJhbXModGhpcy4kc2NvcGUuZXZlbnRSdWxlID8gdGhpcy4kc2NvcGUuZXZlbnRSdWxlLklEIDogbnVsbCk7XHJcbiAgICAgICAgdGhpcy5pbml0RXZlbnRSdWxlTGlzdCgpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0RXZlbnRSdWxlTGlzdCgpIHtcclxuICAgICAgICB0aGlzLmV2ZW50UnVsZVNlcnZpY2UuZmluZEFsbEV2ZW50UnVsZSgpLnRoZW4oKHJlczogQmFja1Jlc3BvbnNlQm9keTxBcnJheTxFdmVudFJ1bGVFeD4+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50UnVsZUxpc3QgPSByZXMuZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0UGFyYW1zKGlkPzogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudFJ1bGUuRXZlbnRSdWxlQWN0aW9uID0ge1xyXG4gICAgICAgICAgICBTZW5kQWxhcm1Ub0NsaWVudDoge1xyXG4gICAgICAgICAgICAgICAgUmVjaWV2ZVVzZXJJRExpc3Q6IFtdLFxyXG4gICAgICAgICAgICAgICAgUmVjaWV2ZVVuaXRJRExpc3Q6IFtdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFNlbmRTbXM6IHtcclxuICAgICAgICAgICAgICAgIFRleHQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICByZWNpZXZlUGVyc29uSURMaXN0OiBbXSxcclxuICAgICAgICAgICAgICAgIHJlY2lldmVVbml0SURMaXN0OiBbXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBhcyBFdmVudFJ1bGVBY3Rpb247XHJcbiAgICAgICAgaWYgKGlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdEV2ZW50UnVsZU1vZGVsKGlkKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdFRyZWVQYXJhbXMoKTsvLyDliJ3lp4vljJbmoJHmlbDmja5cclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdFRyZWVEYXRhKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRUcmVlUGFyYW1zKCk7Ly8g5Yid5aeL5YyW5qCR5pWw5o2uXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdFRyZWVEYXRhKClcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFRyZWVEYXRhKCkge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdFRyZWVTZXJ2aWNlLmZpbmRBcmVhV2l0aFBlcnNvbigpLnRoZW4oKHJlc3A6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNlbmRBbGFybU1zZ1RyZWVQYXJhbXMudHJlZURhdGFzID0gcmVzcDtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmNvbm5lY3RUcmVlU2VydmljZS5maW5kQXJlYVdpdGhVc2VyKCkudGhlbigocmVzcDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZEFsYXJtUGVyc29uVHJlZVBhcmFtcy50cmVlRGF0YXMgPSByZXNwO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0RXZlbnRSdWxlTW9kZWwoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50UnVsZVNlcnZpY2UuZ2V0RGV0YWlsKGlkKS50aGVuKChyZXM6IEJhY2tSZXNwb25zZUJvZHk8RXZlbnRSdWxlRXg+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50UnVsZSA9IHJlcy5kYXRhO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkV2ZW50UnVsZUFjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRSdWxlLkV2ZW50UnVsZUFjdGlvbiA9IHJlcy5kYXRhLkV2ZW50UnVsZUFjdGlvbjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudFJ1bGUuRXZlbnRSdWxlQWN0aW9uID0ge30gYXMgIEV2ZW50UnVsZUFjdGlvbiAmIE9iamVjdDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ldmVudFJ1bGUuRXZlbnRSdWxlQWN0aW9uLmhhc093blByb3BlcnR5KEFjdGlvblR5cGUuU2VuZFNtcy52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50UnVsZS5FdmVudFJ1bGVBY3Rpb24uU2VuZFNtcyA9IHJlcy5kYXRhLkV2ZW50UnVsZUFjdGlvbi5TZW5kU21zO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50UnVsZS5FdmVudFJ1bGVBY3Rpb24uU2VuZFNtcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVGV4dDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVjaWV2ZVBlcnNvbklETGlzdDogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lldmVVbml0SURMaXN0OiBbXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmV2ZW50UnVsZS5FdmVudFJ1bGVBY3Rpb24uaGFzT3duUHJvcGVydHkoQWN0aW9uVHlwZS5TZW5kQWxhcm1Ub0NsaWVudC52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50UnVsZS5FdmVudFJ1bGVBY3Rpb24uU2VuZEFsYXJtVG9DbGllbnQgPSByZXMuZGF0YS5FdmVudFJ1bGVBY3Rpb24uU2VuZEFsYXJtVG9DbGllbnQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRSdWxlLkV2ZW50UnVsZUFjdGlvbi5TZW5kQWxhcm1Ub0NsaWVudCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVjaWV2ZVVzZXJJRExpc3Q6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWNpZXZlVW5pdElETGlzdDogW11cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmV2ZW50UnVsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFRyZWVQYXJhbXMoKSB7XHJcbiAgICAgICAgdGhpcy5zZW5kQWxhcm1QZXJzb25UcmVlUGFyYW1zID0gbmV3IFRyZWVEYXRhUGFyYW1zPFBlcnNvblRyZWVFeCAmIEFyZWFFeD4odHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5zZW5kQWxhcm1QZXJzb25UcmVlUGFyYW1zLnRyZWVJZCA9IHRoaXMuc2VuZEFsYXJtUGVyc29uVHJlZUlkO1xyXG4gICAgICAgIHRoaXMuc2VuZEFsYXJtUGVyc29uVHJlZVBhcmFtcy50cmVlSWRLZXkgPSBcIklEXCI7XHJcbiAgICAgICAgdGhpcy5zZW5kQWxhcm1QZXJzb25UcmVlUGFyYW1zLnRyZWVQaWRLZXkgPSBcIlBhcmVudElEXCI7XHJcbiAgICAgICAgdGhpcy5zZW5kQWxhcm1QZXJzb25UcmVlUGFyYW1zLnRyZWVLZXlOYW1lID0gXCJOYW1lXCI7XHJcblxyXG4gICAgICAgIHRoaXMuc2VuZEFsYXJtUGVyc29uVHJlZVBhcmFtcy5pc1Nob3dJY29uID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNlbmRBbGFybVBlcnNvblRyZWVQYXJhbXMuaXNTaG93TGluZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLnNlbmRBbGFybVBlcnNvblRyZWVQYXJhbXMuY2hlY2tFbmFibGUgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLnNlbmRBbGFybVBlcnNvblRyZWVQYXJhbXMuaXNTaW5nbGVTZWxlY3QgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNlbmRBbGFybVBlcnNvblRyZWVQYXJhbXMuaXNTaW1wbGVEYXRhID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kQWxhcm1QZXJzb25UcmVlUGFyYW1zLm9uQ2hlY2sgPSAoZXZlbnQ6IEV2ZW50LCB0cmVlSWQ6IHN0cmluZywgdHJlZU5vZGU6IGFueSk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVHJlZVNlbGVjdGVkTGlzdCh0aGlzLnNlbmRBbGFybVBlcnNvblRyZWVQYXJhbXMudHJlZUlkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kQWxhcm1QZXJzb25UcmVlUGFyYW1zLnRyZWVJbml0Q29tcGxldGUgPSAodHJlZUlkOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgdGhpcy50cmVlU2VydmljZS5leHBhbmRBbGwodHJlZUlkLCB0cnVlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5ldmVudFJ1bGUpXHJcbiAgICAgICAgICAgIGxldCBjaGVja2VkSWRMaXN0ID0gdGhpcy5ldmVudFJ1bGUuRXZlbnRSdWxlQWN0aW9uLlNlbmRBbGFybVRvQ2xpZW50LlJlY2lldmVVc2VySURMaXN0IHx8IFtdIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgICAgIGlmIChjaGVja2VkSWRMaXN0ICYmIGNoZWNrZWRJZExpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmVlU2VydmljZS5jaGVja05vZGVzQnkodGhpcy5zZW5kQWxhcm1QZXJzb25UcmVlUGFyYW1zLnRyZWVJZCwgdGhpcy5zZW5kQWxhcm1QZXJzb25UcmVlUGFyYW1zLnRyZWVJZEtleSwgY2hlY2tlZElkTGlzdCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRyZWVTZWxlY3RlZExpc3QodGhpcy5zZW5kQWxhcm1QZXJzb25UcmVlUGFyYW1zLnRyZWVJZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy/lj5HpgIHnn63kv6HmoJHnm7jlhbPlj4LmlbBcclxuICAgICAgICB0aGlzLnNlbmRBbGFybU1zZ1RyZWVQYXJhbXMgPSBuZXcgVHJlZURhdGFQYXJhbXM8UGVyc29uVHJlZUV4ICYgQXJlYUV4Pih0cnVlKTtcclxuICAgICAgICB0aGlzLnNlbmRBbGFybU1zZ1RyZWVQYXJhbXMudHJlZUlkID0gdGhpcy5zZW5kQWxhcm1Nc2dUcmVlSWQ7XHJcbiAgICAgICAgdGhpcy5zZW5kQWxhcm1Nc2dUcmVlUGFyYW1zLnRyZWVJZEtleSA9IFwiSURcIjtcclxuICAgICAgICB0aGlzLnNlbmRBbGFybU1zZ1RyZWVQYXJhbXMudHJlZVBpZEtleSA9IFwiUGFyZW50SURcIjtcclxuICAgICAgICB0aGlzLnNlbmRBbGFybU1zZ1RyZWVQYXJhbXMudHJlZUtleU5hbWUgPSBcIk5hbWVcIjtcclxuXHJcbiAgICAgICAgdGhpcy5zZW5kQWxhcm1Nc2dUcmVlUGFyYW1zLmlzU2hvd0ljb24gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2VuZEFsYXJtTXNnVHJlZVBhcmFtcy5pc1Nob3dMaW5lID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuc2VuZEFsYXJtTXNnVHJlZVBhcmFtcy5jaGVja0VuYWJsZSA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuc2VuZEFsYXJtTXNnVHJlZVBhcmFtcy5pc1NpbmdsZVNlbGVjdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2VuZEFsYXJtTXNnVHJlZVBhcmFtcy5pc1NpbXBsZURhdGEgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLnNlbmRBbGFybU1zZ1RyZWVQYXJhbXMub25DaGVjayA9IChldmVudDogRXZlbnQsIHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZTogYW55KTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUcmVlU2VsZWN0ZWRMaXN0KHRoaXMuc2VuZEFsYXJtTXNnVHJlZVBhcmFtcy50cmVlSWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnNlbmRBbGFybU1zZ1RyZWVQYXJhbXMudHJlZUluaXRDb21wbGV0ZSA9ICh0cmVlSWQ6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnRyZWVTZXJ2aWNlLmV4cGFuZEFsbCh0cmVlSWQsIHRydWUpO1xyXG4gICAgICAgICAgICBsZXQgY2hlY2tlZElkTGlzdCA9IHRoaXMuZXZlbnRSdWxlLkV2ZW50UnVsZUFjdGlvbi5TZW5kU21zLnJlY2lldmVQZXJzb25JRExpc3QgfHwgW10gYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICAgICAgaWYgKGNoZWNrZWRJZExpc3QgJiYgY2hlY2tlZElkTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWVTZXJ2aWNlLmNoZWNrTm9kZXNCeSh0aGlzLnNlbmRBbGFybU1zZ1RyZWVQYXJhbXMudHJlZUlkLCB0aGlzLnNlbmRBbGFybU1zZ1RyZWVQYXJhbXMudHJlZUlkS2V5LCBjaGVja2VkSWRMaXN0LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVHJlZVNlbGVjdGVkTGlzdCh0aGlzLnNlbmRBbGFybU1zZ1RyZWVQYXJhbXMudHJlZUlkKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVUcmVlU2VsZWN0ZWRMaXN0KHRyZWVJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3dpdGNoICh0cmVlSWQpIHtcclxuICAgICAgICAgICAgY2FzZSB0aGlzLnNlbmRBbGFybU1zZ1RyZWVQYXJhbXMudHJlZUlkIDpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VuZE1zZ1BlcnNvblNlbGVjdExpc3QgPSB0aGlzLmdldFRyZWVDaGVja0xpc3QodHJlZUlkLCBUcmVlVHlwZS5wZXJzb24udmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VuZE1zZ1BlcnNvblNlbGVjdExpc3QgJiYgdGhpcy5zZW5kTXNnUGVyc29uU2VsZWN0TGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBY3Rpb25UeXBlQnlTZWxlY3QodHJlZUlkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSB0aGlzLnNlbmRBbGFybVBlcnNvblRyZWVQYXJhbXMudHJlZUlkIDpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VuZEFsYXJtVG9DbGllbnRQZXJzb25TZWxlY3RMaXN0ID0gdGhpcy5nZXRUcmVlQ2hlY2tMaXN0KHRyZWVJZCwgVHJlZVR5cGUucGVyc29uLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbmRBbGFybVRvQ2xpZW50UGVyc29uU2VsZWN0TGlzdCAmJiB0aGlzLnNlbmRBbGFybVRvQ2xpZW50UGVyc29uU2VsZWN0TGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBY3Rpb25UeXBlQnlTZWxlY3QodHJlZUlkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaW5zZXRUcGxFdmVudFJ1bGUoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChpZCkge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50UnVsZVNlcnZpY2UuZ2V0RGV0YWlsKGlkKS50aGVuKChyZXM6IEJhY2tSZXNwb25zZUJvZHk8RXZlbnRSdWxlRXg+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBldmVudEFjdGlvbiA9IHJlcy5kYXRhLkV2ZW50UnVsZUFjdGlvbiBhcyBFdmVudFJ1bGVBY3Rpb24gJiBPYmplY3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50QWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldmVudEFjdGlvbi5oYXNPd25Qcm9wZXJ0eShBY3Rpb25UeXBlLlNlbmRTbXMudmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50UnVsZS5FdmVudFJ1bGVBY3Rpb24uU2VuZFNtcyA9IHJlcy5kYXRhLkV2ZW50UnVsZUFjdGlvbi5TZW5kU21zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kQWxhcm1Nc2dUcmVlUGFyYW1zLnRyZWVJbml0Q29tcGxldGUodGhpcy5zZW5kQWxhcm1Nc2dUcmVlUGFyYW1zLnRyZWVJZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRBY3Rpb24uaGFzT3duUHJvcGVydHkoQWN0aW9uVHlwZS5TZW5kQWxhcm1Ub0NsaWVudC52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRSdWxlLkV2ZW50UnVsZUFjdGlvbi5TZW5kQWxhcm1Ub0NsaWVudCA9IHJlcy5kYXRhLkV2ZW50UnVsZUFjdGlvbi5TZW5kQWxhcm1Ub0NsaWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VuZEFsYXJtUGVyc29uVHJlZVBhcmFtcy50cmVlSW5pdENvbXBsZXRlKHRoaXMuc2VuZEFsYXJtUGVyc29uVHJlZVBhcmFtcy50cmVlSWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8g5pS55Y+YIOS6i+S7tumAieS4reeKtuaAgVxyXG4gICAgb25DaGFuZ2VBY3Rpb25UeXBlKGRhdGE6IEVudW1DaGVja0V4KSB7XHJcbiAgICAgICAgZGF0YS5pc0NoZWNrID0gIWRhdGEuaXNDaGVjaztcclxuICAgICAgICBkYXRhLmlzU2hyaW5rID0gIWRhdGEuaXNTaHJpbms7XHJcbiAgICAgICAgLy8g5omT6ZKp5Y+W5raI5pe2ICDmuIXpmaQg5qCR5bey6YCJXHJcbiAgICAgICAgaWYgKGRhdGEuaXNDaGVjayA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEudHJlZUlkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUFsbFNlbGVjdGVkUGVyc29uKGRhdGEudHJlZUlkLCAxKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmlzU2hyaW5rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkNoYW5nZVNocmlua1N0YXR1cyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmlzU2hyaW5rID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNoYW5nZVNocmlua1N0YXR1cyhkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8g5pS55Y+YIOWGheWuueWxleW8gFxyXG4gICAgb25DaGFuZ2VTaHJpbmtTdGF0dXMoZGF0YTogRW51bUNoZWNrRXgpIHtcclxuICAgICAgICBkYXRhLmlzU2hyaW5rID0gIWRhdGEuaXNTaHJpbms7XHJcblxyXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh0aGlzLmFjdGlvblR5cGVNYXAsICh2YWw6IEVudW1DaGVja0V4LCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh2YWwudmFsdWUgIT09IGRhdGEudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHZhbC5pc1NocmluayA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIOagueaNrumAieaLqeiBlOWKqCDmiZPpkqlcclxuICAgIGNoYW5nZUFjdGlvblR5cGVCeVNlbGVjdCh0cmVlSWQ6IHN0cmluZykge1xyXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh0aGlzLmFjdGlvblR5cGVNYXAsICh2YWw6IEVudW1DaGVja0V4LCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh2YWwudHJlZUlkID09PSB0cmVlSWQgJiYgIXZhbC5pc0NoZWNrKSB7XHJcbiAgICAgICAgICAgICAgICB2YWwuaXNDaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqIGNyZWF0ZSBieSB6eHFcclxuICAgICAqICDojrflj5Yg55So5oi3IOagkSDpgInmi6nnu5PmnpxpZCDpm4blkIhcclxuICAgICAqIEB0aW1lOiAyMDE3LTA2LTIyIDEwOjEwOjM2XHJcbiAgICAgKiBAcGFyYW1zOlxyXG4gICAgICogQHJldHVybjpcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmVlQ2hlY2tMaXN0KHRyZWVJZDogc3RyaW5nLCB0cmVlVHlwZTogc3RyaW5nKTogQXJyYXk8UGVyc29uVHJlZUV4ICYgVXNlclRyZWVFeD4ge1xyXG4gICAgICAgIGxldCB0cmVlQ2hlY2tlZE5vZGVzID0gdGhpcy50cmVlU2VydmljZS5nZXRDaGVja2VkTm9kZXModHJlZUlkLCB0cnVlKTtcclxuXHJcbiAgICAgICAgbGV0IHJlc3VsdDogQXJyYXk8UGVyc29uVHJlZUV4ICYgVXNlclRyZWVFeD4gPSBbXSBhcyBBcnJheTxQZXJzb25UcmVlRXggJiBVc2VyVHJlZUV4PjtcclxuICAgICAgICBpZiAodHJlZUNoZWNrZWROb2Rlcykge1xyXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2godHJlZUNoZWNrZWROb2RlcywgKHZhbDogUGVyc29uVHJlZUV4ICYgVXNlclRyZWVFeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbC50cmVlVHlwZSA9PT0gdHJlZVR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh2YWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvL+enu+mZpCDlt7LpgIkg55uu55qE6aG5XHJcbiAgICByZW1vdmVTZWxlY3RlZFBlcnNvbih0cmVlSWQ6IHN0cmluZywgdEl0ZW06IGFueSkge1xyXG4gICAgICAgIHRoaXMudHJlZVNlcnZpY2UudXBkYXRlTm9kZUNoZWNrZWQodHJlZUlkLCB0SXRlbS50SWQsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRyZWVTZWxlY3RlZExpc3QodHJlZUlkKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+a4heepuiDmiYDmnInlt7LpgInpoblcclxuICAgIHJlbW92ZUFsbFNlbGVjdGVkUGVyc29uKHRyZWVJZDogc3RyaW5nLCBpdGVtTnVtOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoaXRlbU51bSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy50cmVlU2VydmljZS5jaGVja0FsbE5vZGVzKHRyZWVJZCwgZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRyZWVTZWxlY3RlZExpc3QodHJlZUlkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGFkZE9yVXBkYXRlRXZlbnRSdWxlKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5ldmVudFJ1bGUuTmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYXllckRlYy53YXJuSW5mbygn6K+36L6T5YWl6aKE5qGI5ZCN56ew77yBJylcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc2VuZEFsYXJtVG9DbGllbnRQZXJzb25TZWxlY3RMaXN0Lmxlbmd0aCA9PT0gMCAmJiB0aGlzLnNlbmRNc2dQZXJzb25TZWxlY3RMaXN0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYXllckRlYy53YXJuSW5mbygn6K+36K6+572u6aKE5qGI5Yqo5L2c77yBJylcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAodGhpcy5zZW5kTXNnUGVyc29uU2VsZWN0TGlzdC5sZW5ndGggPiAwICYmICF0aGlzLmV2ZW50UnVsZS5FdmVudFJ1bGVBY3Rpb24uU2VuZFNtcy5UZXh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxheWVyRGVjLndhcm5JbmZvKCfor7floavlhpnnn63kv6HlhoXlrrnvvIEnKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ldmVudFJ1bGUuRXZlbnRSdWxlQWN0aW9uLlNlbmRBbGFybVRvQ2xpZW50LlJlY2lldmVVc2VySURMaXN0ID0gdGhpcy5zZW5kQWxhcm1Ub0NsaWVudFBlcnNvblNlbGVjdExpc3QubWFwKChpdGVtOiBQZXJzb25UcmVlRXgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uSURcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmV2ZW50UnVsZSk7XHJcbiAgICAgICAgdGhpcy5ldmVudFJ1bGUuRXZlbnRSdWxlQWN0aW9uLlNlbmRTbXMucmVjaWV2ZVBlcnNvbklETGlzdCA9IHRoaXMuc2VuZE1zZ1BlcnNvblNlbGVjdExpc3QubWFwKChpdGVtOiBVc2VyVHJlZUV4KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtLklEO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmV2ZW50UnVsZS5DcmVhdGVUaW1lID0gRGF0ZS5ub3coKS50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRSdWxlLkFyZWFJRCA9IHRoaXMuJHNjb3BlLkFyZWFJRDtcclxuICAgICAgICB0aGlzLmV2ZW50UnVsZS5Jc1RlbXBsYXRlID0gIXRoaXMuJHNjb3BlLmlzVGFzaztcclxuICAgICAgICBpZiAoIXRoaXMuZXZlbnRSdWxlLkV2ZW50UnVsZUFjdGlvbi5TZW5kU21zLlRleHQpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuZXZlbnRSdWxlLkV2ZW50UnVsZUFjdGlvbi5TZW5kU21zXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLiRzY29wZS5pc1Rhc2spIHtcclxuICAgICAgICAgICAgdGhpcy5jYW5jZWxQb3B1cCh0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50UnVsZVNlcnZpY2Uuc2F2ZU9yVXBkYXRlRXZlbnRSdWxlKHRoaXMuZXZlbnRSdWxlKS50aGVuKChyZXM6IEJhY2tSZXNwb25zZUJvZHk8YW55PikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAyMDAgJiYgcmVzLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50UnVsZS5JRCA9IHJlcy5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsUG9wdXAodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgY2FuY2VsUG9wdXAoaXNGcmVzaD86IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLiRzY29wZS4kZW1pdCgnY2xvc2UuZXZlbnRSdWxlLnBvcHVwJywgaXNGcmVzaCwgdGhpcy5ldmVudFJ1bGUpXHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcFxyXG4gICAgLmNvbnRyb2xsZXIoJ0V2ZW50UnVsZVBvcHVwQ29udHJvbGxlcicsIEV2ZW50UnVsZVBvcHVwQ29udHJvbGxlcik7Il19
