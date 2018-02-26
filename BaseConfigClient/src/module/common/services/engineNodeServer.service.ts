declare var require:any;

import {app} from "../app/main.app";

import {ResponseResult} from "../../../core/params/result/ResponseResult";

import {EngineNodeParams} from "../../../core/params/EngineNodeParams";
import {
    IFindByIdParams, IDeleteById,
    IDeleteByIds
} from "../../../core/params/request/RequestParams";


import {IResponseNotifyFactory} from "../factory/response.notify.factory";
import "../factory/SystemLog.factory"
import {ISystemLogFactory} from "../factory/SystemLog.factory";
import {EngineNodeEx} from "../../../core/entity/ex/EngineNodeEx";
import {OperFitstModule} from '../../../core/entity/OperFirstModule';
import {OperSecondModule} from '../../../core/entity/OperSecondModule';
import {OperThirdModule} from  '../../../core/entity/OperThirdModule';
import {OperActionType} from '../../../core/entity/OperActionType';
import { EngineNode } from "../../../core/entity/EngineNode";
import 'angular';
export interface IEngineNodeServer {
    findListByParams( params: EngineNodeParams):Promise<ResponseResult<any>>;

    findById(id: string):Promise<ResponseResult<any>>;
    update(params: EngineNode):Promise<ResponseResult<any>>;
    deleteById(id: string):Promise<ResponseResult<any>>;
    deleteByIds(id: Array<string>):Promise<ResponseResult<any>>;
    save(params: EngineNodeEx):Promise<ResponseResult<any>>;
}
class EngineNodeServer implements IEngineNodeServer{
    static $inject:Array<string> = ['$http','notifyFactory','systemLogFactory'];
    private notifyFunc:(res: ResponseResult<any>)=>ResponseResult<any>;
    constructor(private $http: any, private notifyFactory: IResponseNotifyFactory,private systemLogFactory:ISystemLogFactory) {

    }
    findListByParams (params: EngineNodeParams) {
        return this.$http({
            method:'get',
            params: params,
            url:'/db/EngineNode/findListByParams'
        });

    };
    findById(id: string) {
        let _params:IFindByIdParams = {
            id:id
        };
        return this.$http({
            method:'get',
            params: _params,
            url:'/db/EngineNode/findById',
        });
    };

    update(params: EngineNode) {
        let _params = {
            model:params
        };

        return this.$http({
            method:'post',
            headers:{'Content-Type': 'application/json ;charset=utf-8'},
            url:'/db/EngineNode/update',
            data:JSON.stringify(_params),
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Server.code,
            OperThirdModule: OperThirdModule.BaseConfig_Server_EngineNode.code,
            ActionType: OperActionType.Modify.code
        }));
    };

    save(params: EngineNodeEx) {

        let _params = {
            model:params
        };

        return this.$http({
            method:'post',
            headers:{'Content-Type': 'application/json ;charset=utf-8'},
            url:'/db/EngineNode/save',
            data:JSON.stringify(_params)
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Server.code,
            OperThirdModule: OperThirdModule.BaseConfig_Server_EngineNode.code,
            ActionType: OperActionType.Add.code
        }));

    };

    deleteById(id: string) {
        let _params:IDeleteById = {
            id:id
        };
        return this.$http({
            method:'post',
            headers:{'Content-Type': 'application/json'},
            url:'/db/EngineNode/deleteById',
            data:JSON.stringify(_params)
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Server.code,
            OperThirdModule: OperThirdModule.BaseConfig_Server_EngineNode.code,
            ActionType: OperActionType.Del.code
        }));
    };

    deleteByIds(id: Array<string>) {
        let _params:IDeleteByIds = {
            ids:id
        };
        return this.$http({
            method:'post',
            headers:{'Content-Type': 'application/json'},
            url:'/db/EngineNode/deleteByIds',
            data:JSON.stringify(_params)
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Server.code,
            OperThirdModule: OperThirdModule.BaseConfig_Server_EngineNode.code,
            ActionType: OperActionType.Del.code
        }));
    };
}
app.service('engineNodeServer', EngineNodeServer);