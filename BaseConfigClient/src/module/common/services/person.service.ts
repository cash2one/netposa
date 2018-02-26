import {PersonListParams, AreaAndPersonListResult, PersonChangeStatusParams} from "../../../core/params/PersonParams";
declare var require:any;
import {app} from "../app/main.app";
import 'angular';
import {Person} from "../../../core/entity/Person";
import {
    IFindByIdParams, IDeleteById,
    IDeleteByIds
} from "../../../core/params/request/RequestParams";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {IResponseNotifyFactory} from "../factory/response.notify.factory";
import "../factory/response.notify.factory";
declare let angular: any;

import '../factory/response.notify.factory';
import "../factory/userinfo.cache.factory";
import {OperFitstModule} from '../../../core/entity/OperFirstModule';
import {OperSecondModule} from '../../../core/entity/OperSecondModule';
import {OperThirdModule} from  '../../../core/entity/OperThirdModule';
import {OperActionType} from '../../../core/entity/OperActionType';
import {ISystemLogFactory} from "../factory/SystemLog.factory";
import "../factory/SystemLog.factory";
import {IUserInfoCacheFactory} from "../factory/userinfo.cache.factory";

export interface IPersonService{
    save(params: Person):Promise<ResponseResult<any>>;
    update(params: Person):Promise<ResponseResult<any>>;
    deleteById(id: string):Promise<ResponseResult<any>>;
    findDetailById(id: string):Promise<ResponseResult<any>>;
    findListByParams(params: PersonListParams):Promise<ResponseResult<any>>;
    deleteByIds(ids:Array<string>):Promise<ResponseResult<any>>;
    findTreeWithArea():Promise<ResponseResult<AreaAndPersonListResult>>;
    // 改变用户的可用状态
    changeUserStatus(params: PersonChangeStatusParams):Promise<ResponseResult<any>>;
}


class PersonService implements IPersonService{

    changeUserStatus(params: PersonChangeStatusParams):Promise<ResponseResult<any>>{
        return this.$http({
            method: 'post',
            data: params,
            url: '/db/person/changeStatusByUserIds'
        }).then(this.notifyFunc);
    }

    static $inject:Array<string> = ['$http','notifyFactory','systemLogFactory', 'userInfoCacheFactory'];
    private notifyFunc:(res: ResponseResult<any>)=>ResponseResult<any>;

    constructor(
        private $http: any,
        private notifyFactory: IResponseNotifyFactory,
        private systemLogFactory: ISystemLogFactory,
        private userInfoCacheFactory: IUserInfoCacheFactory
    ) {
        this.notifyFunc = this.notifyFactory.msg({onlySuccess: true});
    }

    findListByParams (params: PersonListParams) {
        return this.$http({
            method:'get',
            params: params,
            url:'/db/person/findListByParams',
        })
    };
    findTreeWithArea (){
        return this.$http({
            method:'get',
            url:'/db/tree/findAreaWithPersion',
        })
    };

    findDetailById (id: string) {
        let _params:IFindByIdParams = {
            id:id
        };

        return this.$http({
            method:'get',
            params: _params,
            url:'/db/person/findDetailById',
        })
    };

    update (params: Person): Promise<ResponseResult<any>> {
        return this.$http({
            method:'post',
            headers:{'Content-Type': 'application/json;charset=utf-8'},
            url:'/db/person/update',
            data: params

        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Base.code,
            OperThirdModule: OperThirdModule.BaseConfig_Base_Person.code,
            ActionType: OperActionType.Modify.code
        }));

    };

    save (params: Person): Promise<ResponseResult<any>>{
        return this.$http({
            method:'post',
            headers:{'Content-Type': 'application/json;charset=utf-8'},
            url:'/db/person/save',
            data: params

        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Base.code,
            OperThirdModule: OperThirdModule.BaseConfig_Base_Person.code,
            ActionType: OperActionType.Add.code
        }));

    };

    deleteById (id: string): Promise<ResponseResult<any>> {
        let _params:IDeleteById = {
            id:id
        };
        return this.$http({
            method:'post',
            headers:{'Content-Type': 'application/json;charset=utf-8'},
            url:'/db/person/deleteById',
            data:_params

        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Base.code,
            OperThirdModule: OperThirdModule.BaseConfig_Base_Person.code,
            ActionType: OperActionType.Del.code
        }));

    };

    deleteByIds (ids:Array<string>): Promise<ResponseResult<any>> {
        let _params:IDeleteByIds = {
            ids:ids
        };
        return this.$http({
            method:'post',
            headers:{'Content-Type': 'application/json;charset=utf-8'},
            url:'/db/person/deleteByIds',
            data:_params,

        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Base.code,
            OperThirdModule: OperThirdModule.BaseConfig_Base_Person.code,
            ActionType: OperActionType.Del.code
        }));

    };
}

app
    .service('personService', PersonService);