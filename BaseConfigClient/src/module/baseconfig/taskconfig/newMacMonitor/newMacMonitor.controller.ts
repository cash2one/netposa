/// <amd-dependency path="text!../../eventRule/eventRule.popup.newMacMonitor.html" name="eventRuleTpl" />
import "../../eventRule/eventRule.popup.controller";
import "css!../../style/new-mac-monitor.css";
import {app} from "../../../common/app/main.app";
import {EventRuleEx} from "../../../../core/entity/ex/EventRuleEx";
import {ITaskOption} from "../main/taskCTypeOptions";
import {MacMonitor} from "../../../../core/server/TaskModel";
import {AuditStatus} from "../../../../core/server/enum/AuditStatus";
import {TaskStatus} from "../../../../core/server/enum/TaskStatus";
import {ILayerDec} from "../../../common/factory/layerMsg.factory";
import {IUserInfoCacheFactory} from "../../../common/factory/userinfo.cache.factory";
import "../../../common/factory/userinfo.cache.factory";
import {ITaskService} from "../../../common/services/task.service";
import "../../../common/services/task.service";
import {BackResponseBody, ResponseResult} from "../../../../core/params/result/ResponseResult";
import {User} from "../../../../core/entity/User";
import {IUserService} from "../../../common/services/user.service";
import "../../../common/services/user.service";


// 扩展枚举内属性，供 多选 标识使用

const QueryPattern = [
    {name: "MAC", value: "MAC", key: 0},
    {name: "IMEI", value: "IMEI", key: 1},
    {name: "IMSI", value: "IMSI", key: 2}
];
const TasksOptions: Array<ITaskOption> = [
    {value: 'Blacklist', text: '黑名单'},
    {value:'Whitelist',text:'白名单'}
];

declare let eventRuleTpl: any, angular: any;


class NewMacMonitor {
    static $inject = ['$scope', '$state', '$stateParams',
        '$timeout', 'layer',
        'layerDec', 'userInfoCacheFactory', 'taskService', 'userService'];
    taskConfigAuditKey: string = "toolOption.myCheck";
    taskCaseModel: boolean = true; // true:新建 false:编辑
    RfidTaskType: Array<ITaskOption> = TasksOptions;
    TaskModel: MacMonitor = new MacMonitor();
    userAuditList: Array<User>;
    queryPattern: Array<any> = QueryPattern;
    layerIndex:string;
    constructor(private $scope: any,
                private $state: any,
                private $stateParams: any,
                private $timeout: any,
                private layer: any,
                private layerDec: ILayerDec,
                private userInfoCacheFactory: IUserInfoCacheFactory,
                private taskService: ITaskService,
                private userService: IUserService) {

        this.setUserAuditList();
        this.initTaskModel(this.$stateParams.taskId);
        this.$scope.$on('close.eventRule.popup', (event: any, isFresh?: boolean, eventRule?: EventRuleEx) => {
            if (isFresh) {
                this.TaskModel.TimeTemplateID = eventRule.ID;
                this.TaskModel.EventRule = eventRule
            }
            this.layer.close(this.layerIndex);
        })
    }

    private initTaskModel(id:string) {
        if(id){
            this.taskService.findRfidById(id).then((res: BackResponseBody<MacMonitor>) => {
                this.TaskModel = res.data;
                this.TaskModel.OperateType = 'Update';
            })
        }else{
            this.TaskModel.TaskType = 'MAC';
            this.TaskModel.OperateType = 'Add';
        }

    }

    addEventRule() {
        let scope: { isTask: boolean, eventRule: EventRuleEx, $destroy: Function } = this.$scope.$new();
        scope.isTask = true;
        scope.eventRule = this.TaskModel.EventRule;
        this.layerIndex = this.layer.open({
            type: 1,
            content: eventRuleTpl,
            scope: scope,
            skin: "no-scroll",
            title: "新增联动策略",
            area: ["780px", "auto"],
            end: function () {
                scope.$destroy();
            }
        })
    }

    setUserAuditList(): void  {
        this.userService.getListByFuncAuthCode(this.taskConfigAuditKey).then((resp: ResponseResult<Array<User>>) => {
            if (resp && resp.code == 200) {
                this.userAuditList = resp.data;
            } else {
                this.userAuditList = [];
            }
        });
    };


    newTaskSubmit () {
        if (!this.TaskModel.ListType) {
            return this.layerDec.warnInfo('请选择布控类型！')
        }
        if (!this.TaskModel.AuditUser) {
            return this.layerDec.warnInfo('请选择审核人！')
        }
        if (!this.TaskModel.EventRule) {
            return this.layerDec.warnInfo('请选择联动策略！')
        }
        if(this.TaskModel.ValidTimeStart >= this.TaskModel.ValidTimeEnd){
            return this.layerDec.warnInfo('请选择正确的时间范围！')
        }
        this.TaskModel.CreateTime = Date.now().toString();
        let params = {} as { taskModel: MacMonitor, eventRule: EventRuleEx };
        params.taskModel = this.TaskModel;
        params.eventRule = this.TaskModel.EventRule;
        params.taskModel.CreateUserID = this.userInfoCacheFactory.getCurrentUserId();

        if (params.taskModel.AuditUser === params.taskModel.CreateUserID) {
            params.taskModel.AuditStatus = AuditStatus.Verified.value;
            params.taskModel.Status = TaskStatus.Run.value
        } else {
            params.taskModel.AuditStatus = AuditStatus.Verifing.value;
            params.taskModel.Status = TaskStatus.Waiting.value
        }
        this.TaskModel.IsLongEffective = (!this.TaskModel.ValidTimeStart && !this.TaskModel.ValidTimeEnd);

        this.taskService.addOrUpdateRfidTask(params).then((res: BackResponseBody<string>) => {
            if (res.code === 200) {
                this.newTaskCancel()
            }
        })
    }

    newTaskCancel() {
        this.$state.go('baseconfig.task')
    }
    /**
     * @description 选择查询类型
     * @param sel
     */
    selectQueryType(sel: any) {
        this.TaskModel.TaskType = sel.value;
    }
}

app.controller('newMacMonitor', NewMacMonitor);

