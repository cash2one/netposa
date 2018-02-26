/** create by zxq
 *  时间模板操作
 * @time: 2017-06-22 11:27:28
 */
declare let require: any;
import { app } from "../app/main.app";
import 'angular';
import { ResponseResult, PageResult } from "../../../core/params/result/ResponseResult";
import { IResponseNotifyFactory } from "../factory/response.notify.factory";
import "../factory/response.notify.factory";
import { TimeTemplateListParams } from "../../../core/params/TimeTemplateParams";
import { TimeTemplate } from "../../../core/entity/TimeTemplate";
import { TimeTemplateEx } from "../../../core/entity/ex/TimeTemplateEx";

import { OperFitstModule } from '../../../core/entity/OperFirstModule';
import { OperSecondModule } from '../../../core/entity/OperSecondModule';
import { OperThirdModule } from '../../../core/entity/OperThirdModule';
import { OperActionType } from '../../../core/entity/OperActionType';
import { ISystemLogFactory } from "../factory/SystemLog.factory";
import "../factory/SystemLog.factory";
declare let angular: any;

export interface ITimeTemplateService {
    //获取所有时间模板列表
    findAll(): Promise<ResponseResult<Array<TimeTemplateEx>>>;

    // 根据条件获取列表
    findByListParams(params: TimeTemplateListParams): Promise<ResponseResult<TimeTemplateEx>>;

    //
    save(params: TimeTemplate): Promise<ResponseResult<string>>;
    //
    update(params: TimeTemplate): Promise<ResponseResult<string>>;

    deleteById(params: string): Promise<ResponseResult<boolean>>;

    deleteByIds(params: Array<string>): Promise<ResponseResult<boolean>>;
}

class TimeTemplateService implements ITimeTemplateService {

    static $inject: Array<string> = ['$q', '$http', 'notifyFactory', 'systemLogFactory'];
    private notifyFunc: (res: ResponseResult<any>) => ResponseResult<any>;

    constructor(private $q: any, private $http: any, private notifyFactory: IResponseNotifyFactory, private systemLogFactory: ISystemLogFactory) {
        this.$http = $http;
        this.notifyFunc = this.notifyFactory.msg({ onlySuccess: true });
    }

    findAll(){
        return this.$http({
            method: 'get',
            url: '/db/timeTemplate/findAll',
        })
    };

    findByListParams(params: TimeTemplateListParams){
        return this.$http({
            method: "GET",
            params: params,
            url: "/db/timeTemplate/findListByParams",
        })
    };

    save (params: TimeTemplate) {
        return this.$http({
            method: 'post',
            data: params,
            url: '/db/timetemplate/save',
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Business.code,
            OperThirdModule: OperThirdModule.BaseConfig_Business_TimeTemplate.code,
            ActionType: OperActionType.Add.code
        }));
    };

    update (params: TimeTemplate) {
        return this.$http({
            method: 'post',
            data: params,
            url: '/db/timeTemplate/update',
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Business.code,
            OperThirdModule: OperThirdModule.BaseConfig_Business_TimeTemplate.code,
            ActionType: OperActionType.Modify.code
        }));
    };

    deleteById (params: string) {
        let _params = [params];
        return this.$http({
            method: 'post',
            data: _params,
            url: '/db/timeTemplate/delete',
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Business.code,
            OperThirdModule: OperThirdModule.BaseConfig_Business_TimeTemplate.code,
            ActionType: OperActionType.Del.code
        }));
    };

    deleteByIds (params: Array<string>)  {
        return this.$http({
            method: 'post',
            data: params,
            url: '/db/timeTemplate/delete',
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Business.code,
            OperThirdModule: OperThirdModule.BaseConfig_Business_TimeTemplate.code,
            ActionType: OperActionType.Del.code
        }));
    };
}
app
    .service('timeTemplateService', TimeTemplateService);