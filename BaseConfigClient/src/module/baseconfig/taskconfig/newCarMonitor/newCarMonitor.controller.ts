/// <amd-dependency path="text!../../eventRule/eventRule.popup.html" name="eventRuleTpl" />
import "../../eventRule/eventRule.popup.controller";
import "css!../../style/new-car-monitor.css";
import {app} from "../../../common/app/main.app";

import {EventRuleEx} from "../../../../core/entity/ex/EventRuleEx";
import {Enum} from "../../../../core/enum/Enum";
import {ITaskOption} from "../main/taskCTypeOptions";
import {CarMonitor} from "../../../../core/server/TaskModel";
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
import {TaskType} from "../../../../core/server/enum/TaskType";
import * as moment from 'moment';
class ICarOptions{
    static BlackList:ITaskOption = {value: 'BlackList', text: '黑名单'};
    static WhiteList:ITaskOption = {value:'WhiteList',text:'白名单'};
}
const CarOptions: Array<ITaskOption> = [
    ICarOptions.BlackList,
    ICarOptions.WhiteList
];
const CarForColor: Array<Enum> = [
    {value: '0', text: '白色'},
    {value: '1', text: '黄色'},
    {value: '2', text: '蓝色'},
    {value: '3', text: '黑色'},
    {value: '101', text: '绿色'},
    {value: '4', text: '其他'},
];


declare let eventRuleTpl: any, angular: any;


class NewCarMonitor {
    static $inject = ['$scope', '$state', '$stateParams',
        '$timeout', 'layer',
        'layerDec', 'userInfoCacheFactory', 'taskService', 'userService'];

    taskConfigAuditKey: string = "toolOption.myCheck";
    taskCaseModel: boolean = true; // true:新建 false:编辑
    CarTaskType: Array<ITaskOption> = CarOptions;
    TaskModel: CarMonitor = new CarMonitor();
    CarForColor: Array<Enum> = CarForColor;
    userAuditList: Array<User>;
    isWhiteList:boolean = false;
    layerIndex:number;
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
            this.layer.close(this.layerIndex);
            if (isFresh) {
                this.TaskModel.EventRule = eventRule
            }
        })
    }

    private initTaskModel(id?:string) {
        if(id){
            this.taskService.findCarById(id).then((res: BackResponseBody<CarMonitor>) => {
                if(res.code === 200){
                    this.TaskModel = res.data;
                    this.TaskModel.OperateType = 'Update';
                    this.TaskModel.ID = this.$stateParams.taskId;
                    this.TaskModel.TaskType = TaskType.CarMonitor.value;
                }
            })
        }else{
            this.TaskModel.AreaID = this.$stateParams.areaId;
            this.TaskModel.TaskType = TaskType.CarMonitor.value;
            this.TaskModel.OperateType = 'Add';
        }

    }

    changeMonitorType(type:string){
        this.isWhiteList = (type === ICarOptions.WhiteList.value);
    }

    /** create by zxq
     * 获取有 审核权限的 人员列表
     * @time: 2017-06-16 10:45:36
     * @return: Array<User>
     */
    setUserAuditList = (): void => {
        this.userService.getListByFuncAuthCode(this.taskConfigAuditKey).then((resp: ResponseResult<Array<User>>) => {
            if (resp && resp.code == 200) {
                this.userAuditList = resp.data;
            } else {
                this.userAuditList = [];
            }
        });
    };

    //TODO 上传图片
    uploadImage(event: any) {
        let from = new FormData();
        from.append('image', event.target.files[0]);
        from.append('storeType', 'LOC');
        from.append('imageCategory', 'CaptureImage');
        from.append('commandType', 'SearchAccessLog');
        from.append('detectType', 'Face');
        this.taskService.uploadCarPhoto(from).then((res: BackResponseBody<any>) => {
            if (res.code === 200) {
                this.$timeout(() => {
                    this.TaskModel.CarPhoto = res.data;
                })

            }
        });
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
            title: "选择联动策略",
            area: ["780px", "auto"],
            end: function () {
                scope.$destroy();
            }
        })
    }

    newTaskSubmit() {
        if (!this.TaskModel.ListType) {
            return this.layerDec.warnInfo('请选择布控类型！')
        }
        if (!this.TaskModel.PlateColor) {
            return this.layerDec.warnInfo('请选择车牌颜色！')
        }
        if (!this.TaskModel.AuditUser) {
            return this.layerDec.warnInfo('请选择审核人！')
        }
        if(!this.TaskModel.ValidTimeStart && !this.TaskModel.ValidTimeEnd){
            return this.layerDec.warnInfo('请选择有效时间！')
        }
        if(this.TaskModel.ValidTimeStart >= this.TaskModel.ValidTimeEnd){
            return this.layerDec.warnInfo('请选择正确的时间范围！')
        }

        if(!this.isWhiteList){
            if (!this.TaskModel.EventRule) {
                return this.layerDec.warnInfo('请选择联动策略！')
            }
        }
        this.TaskModel.CreateTime = moment().format('YYYY-MM-DD hh:mm:ss');
        let params = {} as { taskModel: CarMonitor, eventRule: EventRuleEx };
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
        this.TaskModel.IsLongEffective = false;
        this.TaskModel.TaskType = TaskType.CarMonitor.value;
        this.taskService.addOrUpdateCarTask(params).then((res: BackResponseBody<string>) => {
            if (res.code === 200) {
                this.newTaskCancel()
            }
        })
    }

    newTaskCancel() {
        this.$state.go('baseconfig.task')
    }

}

app.controller('newCarMonitor', NewCarMonitor);

