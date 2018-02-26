import "css!../style/task-case.css";
import {app} from "../../common/app/main.app";
import {TreeDataParams} from "../../common/directive/tree/tree-params";
import {PersonTreeEx} from "../../../core/entity/ex/PersonTreeEx";
import "../../common/directive/tree/tree.directive.service";
import {ITreeDirectiveService} from "../../common/directive/tree/tree.directive.service";
import {EventRuleEx, EventRuleAction} from "../../../core/entity/ex/EventRuleEx";
import {TreeType} from "../../../core/enum/TreeType";
import {AreaEx} from "../../../core/entity/ex/AreaEx";
import {EnumCheckEx, ActionTypeMap, IActionTypeMap, ActionType} from "../../../core/server/enum/ActionType";
import {ILayerDec} from "../../common/factory/layerMsg.factory";
import {BackResponseBody} from "../../../core/params/result/ResponseResult";
import {IConnectTreeService} from "../../common/services/connectTree.service";
import "../../common/services/connectTree.service";
import {UserTreeEx} from "../../../core/entity/ex/UserTreeEx";
import {IEventRuleService} from "../../common/services/eventRule.service";
import "../../common/services/eventRule.service";

declare let angular: any;

const sendAlarmMsgTreeId: string = "monitorSendAlarmMsgTree";
const sendAlarmPersonTreeId: string = "monitorSendAlarmPersonTree";

class EventRulePopupController {
    static $inject = ['$scope',
        '$timeout', 'connectTreeService', "treeDirectiveService",
        'layerDec', 'eventRuleService'];
    public actionTypeMap: IActionTypeMap = ActionTypeMap;

    public eventRuleList: Array<EventRuleEx> = [];
    public tplEventRuleId: string;

    // 用户树
    public eventRule: EventRuleEx = new EventRuleEx();
    // 报警
    public sendAlarmPersonTreeParams: TreeDataParams<PersonTreeEx & AreaEx>;
    public sendAlarmPersonTreeId: string = sendAlarmPersonTreeId;
    public sendAlarmToClientPersonSelectList: Array<PersonTreeEx> = [];
    showPersonTree: boolean = false;
    // 短信
    public sendAlarmMsgTreeParams: TreeDataParams<PersonTreeEx & AreaEx>;
    public sendAlarmMsgTreeId: string = sendAlarmMsgTreeId;
    showMsgTree: boolean = false;
    public sendMsgPersonSelectList: Array<UserTreeEx> = [];

    constructor(private $scope: any,
                private $timeout: any,
                private connectTreeService: IConnectTreeService,
                private treeService: ITreeDirectiveService,
                private layerDec: ILayerDec,
                private eventRuleService: IEventRuleService) {
        // 判断页面模式
        this.actionTypeMap.SendSms.treeId = sendAlarmMsgTreeId;
        this.actionTypeMap.SendAlarmToClient.treeId = sendAlarmPersonTreeId;
        this.initParams(this.$scope.eventRule ? this.$scope.eventRule.ID : null);
        this.initEventRuleList()
    }

    private initEventRuleList() {
        this.eventRuleService.findAllEventRule().then((res: BackResponseBody<Array<EventRuleEx>>) => {
            if (res.code === 200) {
                this.eventRuleList = res.data;
            }
        })
    }

    private initParams(id?: string) {
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
        } as EventRuleAction;
        if (id) {
            this.initEventRuleModel(id).then(() => {
                this.initTreeParams();// 初始化树数据
                this.initTreeData()
            })
        } else {
            this.initTreeParams();// 初始化树数据
            this.initTreeData()
        }

    }

    private initTreeData() {
        this.connectTreeService.findAreaWithPerson().then((resp: any) => {
            this.sendAlarmMsgTreeParams.treeDatas = resp;
        });
        this.connectTreeService.findAreaWithUser().then((resp: any) => {
            this.sendAlarmPersonTreeParams.treeDatas = resp;
        })
    }

    private initEventRuleModel(id: string) {
        return this.eventRuleService.getDetail(id).then((res: BackResponseBody<EventRuleEx>) => {
            if (res.code === 200) {
                this.eventRule = res.data;
                if (res.data.EventRuleAction) {
                    this.eventRule.EventRuleAction = res.data.EventRuleAction;
                } else {
                    this.eventRule.EventRuleAction = {} as  EventRuleAction & Object;
                }

                if (this.eventRule.EventRuleAction.hasOwnProperty(ActionType.SendSms.value)) {
                    this.eventRule.EventRuleAction.SendSms = res.data.EventRuleAction.SendSms;
                } else {
                    this.eventRule.EventRuleAction.SendSms = {
                        Text: null,
                        recievePersonIDList: [],
                        recieveUnitIDList: []
                    }
                }
                if (this.eventRule.EventRuleAction.hasOwnProperty(ActionType.SendAlarmToClient.value)) {
                    this.eventRule.EventRuleAction.SendAlarmToClient = res.data.EventRuleAction.SendAlarmToClient;
                } else {
                    this.eventRule.EventRuleAction.SendAlarmToClient = {
                        RecieveUserIDList: [],
                        RecieveUnitIDList: []
                    }
                }
                console.log(this.eventRule);
            }
        })
    }

    private initTreeParams() {
        this.sendAlarmPersonTreeParams = new TreeDataParams<PersonTreeEx & AreaEx>(true);
        this.sendAlarmPersonTreeParams.treeId = this.sendAlarmPersonTreeId;
        this.sendAlarmPersonTreeParams.treeIdKey = "ID";
        this.sendAlarmPersonTreeParams.treePidKey = "ParentID";
        this.sendAlarmPersonTreeParams.treeKeyName = "Name";

        this.sendAlarmPersonTreeParams.isShowIcon = true;
        this.sendAlarmPersonTreeParams.isShowLine = false;

        this.sendAlarmPersonTreeParams.checkEnable = true;

        this.sendAlarmPersonTreeParams.isSingleSelect = false;
        this.sendAlarmPersonTreeParams.isSimpleData = true;

        this.sendAlarmPersonTreeParams.onCheck = (event: Event, treeId: string, treeNode: any): void => {
            this.$timeout(() => {
                this.updateTreeSelectedList(this.sendAlarmPersonTreeParams.treeId);
            });
        };

        this.sendAlarmPersonTreeParams.treeInitComplete = (treeId: string): void => {
            this.treeService.expandAll(treeId, true);
            console.log(this.eventRule)
            let checkedIdList = this.eventRule.EventRuleAction.SendAlarmToClient.RecieveUserIDList || [] as Array<string>;
            if (checkedIdList && checkedIdList.length > 0) {
                this.treeService.checkNodesBy(this.sendAlarmPersonTreeParams.treeId, this.sendAlarmPersonTreeParams.treeIdKey, checkedIdList, true);
                this.$timeout(() => {
                    this.updateTreeSelectedList(this.sendAlarmPersonTreeParams.treeId);
                });
            }
        };
        //发送短信树相关参数
        this.sendAlarmMsgTreeParams = new TreeDataParams<PersonTreeEx & AreaEx>(true);
        this.sendAlarmMsgTreeParams.treeId = this.sendAlarmMsgTreeId;
        this.sendAlarmMsgTreeParams.treeIdKey = "ID";
        this.sendAlarmMsgTreeParams.treePidKey = "ParentID";
        this.sendAlarmMsgTreeParams.treeKeyName = "Name";

        this.sendAlarmMsgTreeParams.isShowIcon = true;
        this.sendAlarmMsgTreeParams.isShowLine = false;

        this.sendAlarmMsgTreeParams.checkEnable = true;

        this.sendAlarmMsgTreeParams.isSingleSelect = false;
        this.sendAlarmMsgTreeParams.isSimpleData = true;

        this.sendAlarmMsgTreeParams.onCheck = (event: Event, treeId: string, treeNode: any): void => {
            this.$timeout(() => {
                this.updateTreeSelectedList(this.sendAlarmMsgTreeParams.treeId);
            });
        };

        this.sendAlarmMsgTreeParams.treeInitComplete = (treeId: string): void => {
            this.treeService.expandAll(treeId, true);
            let checkedIdList = this.eventRule.EventRuleAction.SendSms.recievePersonIDList || [] as Array<string>;
            if (checkedIdList && checkedIdList.length > 0) {
                this.treeService.checkNodesBy(this.sendAlarmMsgTreeParams.treeId, this.sendAlarmMsgTreeParams.treeIdKey, checkedIdList, true);
                this.$timeout(() => {
                    this.updateTreeSelectedList(this.sendAlarmMsgTreeParams.treeId);
                });
            }
        };
    };

    private updateTreeSelectedList(treeId: string) {
        switch (treeId) {
            case this.sendAlarmMsgTreeParams.treeId :
                this.sendMsgPersonSelectList = this.getTreeCheckList(treeId, TreeType.person.value);
                if (this.sendMsgPersonSelectList && this.sendMsgPersonSelectList.length > 0) {
                    this.changeActionTypeBySelect(treeId);
                }
                break;

            case this.sendAlarmPersonTreeParams.treeId :
                this.sendAlarmToClientPersonSelectList = this.getTreeCheckList(treeId, TreeType.person.value);
                if (this.sendAlarmToClientPersonSelectList && this.sendAlarmToClientPersonSelectList.length > 0) {
                    this.changeActionTypeBySelect(treeId);
                }
                break;
        }
    };

    insetTplEventRule(id: string) {
        if (id) {
            this.eventRuleService.getDetail(id).then((res: BackResponseBody<EventRuleEx>) => {
                if (res.code === 200) {
                    let eventAction = res.data.EventRuleAction as EventRuleAction & Object;
                    if (eventAction) {
                        if (eventAction.hasOwnProperty(ActionType.SendSms.value)) {
                            this.eventRule.EventRuleAction.SendSms = res.data.EventRuleAction.SendSms;
                            this.sendAlarmMsgTreeParams.treeInitComplete(this.sendAlarmMsgTreeParams.treeId)
                        }
                        if (eventAction.hasOwnProperty(ActionType.SendAlarmToClient.value)) {
                            this.eventRule.EventRuleAction.SendAlarmToClient = res.data.EventRuleAction.SendAlarmToClient;
                            this.sendAlarmPersonTreeParams.treeInitComplete(this.sendAlarmPersonTreeParams.treeId)
                        }
                    }

                }
            })
        }

    }

    // 改变 事件选中状态
    onChangeActionType(data: EnumCheckEx) {
        data.isCheck = !data.isCheck;
        data.isShrink = !data.isShrink;
        // 打钩取消时  清除 树已选
        if (data.isCheck === false) {
            if (data.treeId) {
                this.removeAllSelectedPerson(data.treeId, 1);
                if (data.isShrink) {
                    this.onChangeShrinkStatus(data);
                }
            }
        } else {
            if (data.isShrink === false) {
                this.onChangeShrinkStatus(data);
            }
        }
    };

    // 改变 内容展开
    onChangeShrinkStatus(data: EnumCheckEx) {
        data.isShrink = !data.isShrink;

        angular.forEach(this.actionTypeMap, (val: EnumCheckEx, index: number) => {
            if (val.value !== data.value) {
                val.isShrink = false;
            }
        });
    };

    // 根据选择联动 打钩
    changeActionTypeBySelect(treeId: string) {
        angular.forEach(this.actionTypeMap, (val: EnumCheckEx, index: number) => {
            if (val.treeId === treeId && !val.isCheck) {
                val.isCheck = true;
            }
        });
    };

    /** create by zxq
     *  获取 用户 树 选择结果id 集合
     * @time: 2017-06-22 10:10:36
     * @params:
     * @return:
     */
    private getTreeCheckList(treeId: string, treeType: string): Array<PersonTreeEx & UserTreeEx> {
        let treeCheckedNodes = this.treeService.getCheckedNodes(treeId, true);

        let result: Array<PersonTreeEx & UserTreeEx> = [] as Array<PersonTreeEx & UserTreeEx>;
        if (treeCheckedNodes) {
            angular.forEach(treeCheckedNodes, (val: PersonTreeEx & UserTreeEx) => {
                if (val.treeType === treeType) {
                    result.push(val);
                }
            });
        }
        return result;
    }

    //移除 已选 目的项
    removeSelectedPerson(treeId: string, tItem: any) {
        this.treeService.updateNodeChecked(treeId, tItem.tId, false);
        this.updateTreeSelectedList(treeId);
    }

    //清空 所有已选项
    removeAllSelectedPerson(treeId: string, itemNum: number) {
        if (itemNum > 0) {
            this.treeService.checkAllNodes(treeId, false);
            this.updateTreeSelectedList(treeId);
        }
    }


    addOrUpdateEventRule() {
        if (!this.eventRule.Name) {
            return this.layerDec.warnInfo('请输入预案名称！')
        }
        if (this.sendAlarmToClientPersonSelectList.length === 0 && this.sendMsgPersonSelectList.length === 0) {
            return this.layerDec.warnInfo('请设置预案动作！')
        }


        if (this.sendMsgPersonSelectList.length > 0 && !this.eventRule.EventRuleAction.SendSms.Text) {
            return this.layerDec.warnInfo('请填写短信内容！')
        }
        this.eventRule.EventRuleAction.SendAlarmToClient.RecieveUserIDList = this.sendAlarmToClientPersonSelectList.map((item: PersonTreeEx) => {
            return item.ID
        });
        console.log(this.eventRule);
        this.eventRule.EventRuleAction.SendSms.recievePersonIDList = this.sendMsgPersonSelectList.map((item: UserTreeEx) => {
            return item.ID;
        });

        this.eventRule.CreateTime = Date.now().toString();
        this.eventRule.AreaID = this.$scope.AreaID;
        this.eventRule.IsTemplate = !this.$scope.isTask;
        if (!this.eventRule.EventRuleAction.SendSms.Text) {
            delete this.eventRule.EventRuleAction.SendSms
        }
        if (this.$scope.isTask) {
            this.cancelPopup(true);
        } else {
            this.eventRuleService.saveOrUpdateEventRule(this.eventRule).then((res: BackResponseBody<any>) => {
                if (res.code === 200 && res.data) {
                    this.eventRule.ID = res.data;
                    this.cancelPopup(true);
                }
            })
        }

    }


    cancelPopup(isFresh?: boolean) {
        this.$scope.$emit('close.eventRule.popup', isFresh, this.eventRule)
    }
}

app
    .controller('EventRulePopupController', EventRulePopupController);