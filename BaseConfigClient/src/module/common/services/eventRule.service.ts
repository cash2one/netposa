import {app} from "../app/main.app";
import 'angular';
import {BackResponseBody, PageResult, ResponseResult} from '../../../core/params/result/ResponseResult';
import {IResponseNotifyFactory} from "../factory/response.notify.factory";
import {EventRuleEx} from "../../../core/entity/ex/EventRuleEx";
import {EventRuleParams} from "../../../core/params/EventRuleParams";
import {EventRule} from "../../../core/entity/EventRule";
import {
    IFindByIdParams, IDeleteById,
    IDeleteByIds
} from "../../../core/params/request/RequestParams";
import "../factory/SystemLog.factory"
import {ISystemLogFactory} from "../factory/SystemLog.factory";
import {OperFitstModule} from '../../../core/entity/OperFirstModule';
import {OperSecondModule} from '../../../core/entity/OperSecondModule';
import {OperThirdModule} from  '../../../core/entity/OperThirdModule';
import {OperActionType} from '../../../core/entity/OperActionType';

let Promise = require('es6-promise');
declare let angular: any, $: any, require: any;

export interface IEventRuleService {

    findEventRuleListByPage(params: EventRuleParams): Promise<BackResponseBody<PageResult<EventRuleEx>>>;

    saveOrUpdateEventRule(params: EventRuleEx): Promise<BackResponseBody<Array<boolean>>>;

    getDetail(id: string): Promise<BackResponseBody<EventRuleEx>>;

    deleteEventRule(id:string): Promise<BackResponseBody<boolean>>;

    findAllEventRule(): Promise<BackResponseBody<Array<EventRule>>>;

    deleteByIds(id: Array<string>):Promise<ResponseResult<any>>;

}

/** create by zxq
 *  任务管理 增删改查 请求
 * @time: 2017-06-14 11:24:01
 * @params:
 * @return:
 */
class EventRuleService implements IEventRuleService {

    static $inject: Array<string> = ['$http', 'notifyFactory','systemLogFactory'];
    private notifyFunc: (res: ResponseResult<any>) => ResponseResult<any>;

    constructor(private $http: any, private notifyFactory: IResponseNotifyFactory,private systemLogFactory:ISystemLogFactory) {
        this.notifyFunc = this.notifyFactory.msg({onlySuccess: true});
    }


    findEventRuleListByPage(params: EventRuleParams) {
        return this.$http({
            method: "post",
            data: params,
            url: "/db/eventRule/findList",
        })
    };
    findAllEventRule(){
        return this.$http({
            method: "post",
            url: "/db/eventRule/findAll",
        })
    }
    saveOrUpdateEventRule(params: EventRuleEx) {
        return this.$http({
            method: "post",
            data: params,
            url: "/db/eventRule/saveOrUpdate",
        }).then(this.notifyFunc)
    };
    getDetail(id: string){
        return this.$http({
            method: "post",
            data: {id:id},
            url: "/db/eventRule/detail",
        })
    }
    deleteEventRule(id: string){
        return this.$http({
            method: "post",
            data: {id:id},
            url: "/db/eventRule/delete",
        }).then(this.notifyFunc)
    }
    deleteByIds(id: Array<string>) {
        let _params:IDeleteByIds = {
            ids:id
        };
        return this.$http({
            method:'post',
            headers:{'Content-Type': 'application/json'},
            url:'/db/eventRule/deleteByIds',
            data:JSON.stringify(_params)
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Server.code,
            OperThirdModule: OperThirdModule.BaseConfig_Server_EventRule.code,
            ActionType: OperActionType.Del.code
        }));
    };
}

app
    .service('eventRuleService', EventRuleService)
;