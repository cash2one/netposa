import {ProxyServerEx} from "../../../core/entity/ex/ProxyServerEx";
declare var require:any;

import {app} from "../app/main.app";

import 'angular';
import {ProxyServer} from "../../../core/entity/ProxyServer";
import {ProxyServerListParams} from "../../../core/params/ProxyServerParams";
import {
    IFindByIdParams, IDeleteById,
    IDeleteByIds
} from "../../../core/params/request/RequestParams";
import {IResponseNotifyFactory} from "../factory/response.notify.factory";
import "../factory/response.notify.factory";
import {ResponseResult} from "../../../core/params/result/ResponseResult";


import {OperFitstModule} from '../../../core/entity/OperFirstModule';
import {OperSecondModule} from '../../../core/entity/OperSecondModule';
import {OperThirdModule} from  '../../../core/entity/OperThirdModule';
import {OperActionType} from '../../../core/entity/OperActionType';
import {ISystemLogFactory} from "../factory/SystemLog.factory";
import "../factory/SystemLog.factory";
declare let angular: any;

export interface IProxyServerService {
    findAll(): Promise<ResponseResult<any>>;
    findListByParams(params: ProxyServerListParams):Promise<ResponseResult<any>>;
    findById(id: string):Promise<ResponseResult<any>>;
    update(params: ProxyServer):Promise<ResponseResult<any>>;
    deleteById(id: string):Promise<ResponseResult<any>>;
    deleteByIds(id: Array<string>):Promise<ResponseResult<any>>;
    save(params: ProxyServerEx):Promise<ResponseResult<any>>;
}

class ProxyServerService implements IProxyServerService{

    static $inject:Array<string> = ['$http','notifyFactory','systemLogFactory'];
    private notifyFunc:(res: ResponseResult<any>)=>ResponseResult<any>;

    constructor(private $http: any, private notifyFactory: IResponseNotifyFactory,private systemLogFactory:ISystemLogFactory) {
        this.notifyFunc = this.notifyFactory.msg({onlySuccess: true});
    }
    findAll () {
        return this.$http({
            method:'get',
            url:'/db/ProxyServer/findAll'
        });

    };
    findListByParams(params: ProxyServerListParams) {
        return this.$http({
            method:'get',
            params: params,
            url:'/db/ProxyServer/findListByParams',
        });
    };

    findById(id: string) {
        let _params:IFindByIdParams = {
            id:id
        };
        return this.$http({
            method:'get',
            params: _params,
            url:'/db/ProxyServer/findById',
        });
    };

    update(params: ProxyServer) {
        let _params = {
            model:params
        };

        return this.$http({
            method:'post',
            headers:{'Content-Type': 'application/json ;charset=utf-8'},
            url:'/db/ProxyServer/update',
            data:JSON.stringify(_params),
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Server.code,
            OperThirdModule: OperThirdModule.BaseConfig_Server_ProxyServer.code,
            ActionType: OperActionType.Modify.code
        }));
    };

    save(params: ProxyServerEx) {

        let _params = {
            model:params
        };

        return this.$http({
            method:'post',
            headers:{'Content-Type': 'application/json ;charset=utf-8'},
            url:'/db/ProxyServer/save',
            data:JSON.stringify(_params)
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Server.code,
            OperThirdModule: OperThirdModule.BaseConfig_Server_ProxyServer.code,
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
            url:'/db/ProxyServer/deleteById',
            data:JSON.stringify(_params)
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Server.code,
            OperThirdModule: OperThirdModule.BaseConfig_Server_ProxyServer.code,
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
            url:'/db/ProxyServer/deleteByIds',
            data:JSON.stringify(_params)
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Server.code,
            OperThirdModule: OperThirdModule.BaseConfig_Server_ProxyServer.code,
            ActionType: OperActionType.Del.code
        }));
    };

}

app
    .service('proxyServerService', ProxyServerService);