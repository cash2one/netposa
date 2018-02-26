declare var require:any;

import "../factory/SystemLog.factory"
import {app} from "../app/main.app";
import {IResponseNotifyFactory} from "../factory/response.notify.factory";
import {ResponseResult, BackResponseBody} from "../../../core/params/result/ResponseResult";
import {ISystemLogFactory} from "../factory/SystemLog.factory";
import {EngineServerListParams} from "../../../core/params/EngineServerParams";
import {EngineServerEx} from "../../../core/entity/ex/EngineServerEx";
import 'angular';
import { EngineServer } from "../../../core/entity/EngineServer";
import {
    IFindByIdParams, IDeleteById,
    IDeleteByIds
} from "../../../core/params/request/RequestParams";


import {OperFitstModule} from '../../../core/entity/OperFirstModule';
import {OperSecondModule} from '../../../core/entity/OperSecondModule';
import {OperThirdModule} from  '../../../core/entity/OperThirdModule';
import {OperActionType} from '../../../core/entity/OperActionType';
export interface IEngineServerServer {
    findAll():Promise<ResponseResult<Array<EngineServer>>>;
    // findById(id: string):Promise<ResponseResult<any>>;
    update(params: EngineServer):Promise<ResponseResult<any>>;
    deleteById(id: string):Promise<ResponseResult<any>>;
    // deleteByIds(id: Array<string>):Promise<ResponseResult<any>>;
    save(params: EngineServerEx):Promise<ResponseResult<any>>;
}
class EngineServerServer implements IEngineServerServer{
    static $inject:Array<string> = ['$http','notifyFactory','systemLogFactory'];
    private notifyFunc:(res: ResponseResult<any>)=>ResponseResult<any>;
    constructor(private $http: any , private notifyFactory: IResponseNotifyFactory,private systemLogFactory:ISystemLogFactory) {
        this.notifyFunc = this.notifyFactory.msg({onlySuccess: true});
    }
    findAll () {
        return this.$http({
            method:'get',
            url:'/db/EngineServer/findAll'
        });

    };

    // findById(id: string) {
    //     let _params:IFindByIdParams = {
    //         id:id
    //     };
    //     return this.$http({
    //         method:'get',
    //         params: _params,
    //         url:'/db/EngineServer/findById',
    //     });
    // };

    update(params: EngineServer) {
        let _params = {
            model:params
        };

        return this.$http({
            method:'post',
            headers:{'Content-Type': 'application/json ;charset=utf-8'},
            url:'/db/EngineServer/update',
            data:JSON.stringify(_params),
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Server.code,
            OperThirdModule: OperThirdModule.BaseConfig_Server_EngineServer.code,
            ActionType: OperActionType.Modify.code
        }));
    };

    save(params: EngineServerEx) {
        let _params = {
            model:params
        };

        return this.$http({
            method:'post',
            headers:{'Content-Type': 'application/json ;charset=utf-8'},
            url:'/db/EngineServer/save',
            data:JSON.stringify(_params)
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Server.code,
            OperThirdModule: OperThirdModule.BaseConfig_Server_EngineServer.code,
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
            url:'/db/EngineServer/deleteById',
            data:JSON.stringify(_params)
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Server.code,
            OperThirdModule: OperThirdModule.BaseConfig_Server_EngineServer.code,
            ActionType: OperActionType.Del.code
        }));
    };

    // deleteByIds(id: Array<string>) {
    //     let _params:IDeleteByIds = {
    //         ids:id
    //     };
    //     return this.$http({
    //         method:'post',
    //         headers:{'Content-Type': 'application/json'},
    //         url:'/db/EngineServer/deleteByIds',
    //         data:JSON.stringify(_params)
    //     }).then(this.systemLogFactory.preSaveLogEx({
    //         OperFirstModule: OperFitstModule.BaseConfig.code,
    //         OperSecondModule: OperSecondModule.BaseConfig_Server.code,
    //         OperThirdModule: OperThirdModule.BaseConfig_Server_EngineServer.code,
    //         ActionType: OperActionType.Del.code
    //     }));
    // };
}
app.service('engineServerServer', EngineServerServer);