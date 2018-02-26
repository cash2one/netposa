import {IvsServerListParams} from "../../../core/params/IvsServerParams";
declare var require:any;
import {app} from "../app/main.app";
import 'angular';
import {IvsServerEx} from "../../../core/entity/ex/IvsServerEx";
import {
    IFindByIdParams, IDeleteByIds,
    IDeleteById
} from "../../../core/params/request/RequestParams";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {IResponseNotifyFactory} from "../factory/response.notify.factory";
import "../factory/response.notify.factory";

import {OperFitstModule} from '../../../core/entity/OperFirstModule';
import {OperSecondModule} from '../../../core/entity/OperSecondModule';
import {OperThirdModule} from '../../../core/entity/OperThirdModule';
import {OperActionType} from '../../../core/entity/OperActionType';
import {ISystemLogFactory} from "../factory/SystemLog.factory";
import "../factory/SystemLog.factory";
declare let angular: any;


export interface IIvsServerService {
    // TODO 没有使用的接口 alter: wyr
    //findListByParams(params: IvsServerListParams):Promise<ResponseResult<any>>;
    findById(id: string):Promise<ResponseResult<any>>;
    update(params: IvsServerEx):Promise<ResponseResult<any>>;
    deleteById(id: string):Promise<ResponseResult<any>>;
    deleteByIds(ids: Array<string>):Promise<ResponseResult<any>>;
    save(params: IvsServerEx):Promise<ResponseResult<any>>;
    validDelete(ids:Array<string>):Promise<ResponseResult<any>>;
}

class IvsServerService implements IIvsServerService{

    static $inject:Array<string> = ['$http','notifyFactory','systemLogFactory'];

    private notifyFunc:(res: ResponseResult<any>)=>ResponseResult<any>;

    constructor(private $http: any, private notifyFactory: IResponseNotifyFactory,private systemLogFactory:ISystemLogFactory) {
        this.$http = $http;
        this.notifyFunc = this.notifyFactory.msg({onlySuccess: true});
    }

    // TODO 没有使用的接口 alter: wyr
    // findListByParams(params: IvsServerListParams) {
    //     let _params =  params;
    //     return this.$http({
    //         method:'get',
    //         params: _params,
    //         url:'/db/IvsServer/findListByParams',
    //     })
    // };
    validDelete(ids:Array<string>){
        return this.$http({
            method:'post',
            params: {ivServerIds:ids},
            url:'/pdp/configCtrl/ivServer/status',
        }); 
    }

    findById(id: string) {
        let _params:IFindByIdParams = {
            id:id
        };
        return this.$http({
            method:'get',
            params: _params,
            url:'/db/IvsServer/findByID',
        });
    };

    update(params: IvsServerEx) {
        let _params = {
            model:params
        };
        _params.model.AreaModel = null;
        return this.$http({
            method:'post',
            headers:{'Content-Type': 'application/json ;charset=utf-8'},
            url:'/db/IvsServer/update',
            data:JSON.stringify(_params),
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Server.code,
            OperThirdModule: OperThirdModule.BaseConfig_Server_VideoStructServer.code,
            ActionType: OperActionType.Modify.code
        }));
    };

    save(params: IvsServerEx) {

        let _params = {
            model:params
        };

        return this.$http({
            method:'post',
            headers:{'Content-Type': 'application/json ;charset=utf-8'},
            url:'/db/IvsServer/save',
            data:JSON.stringify(_params),
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Server.code,
            OperThirdModule: OperThirdModule.BaseConfig_Server_VideoStructServer.code,
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
            url:'/db/IvsServer/deleteById',
            data:JSON.stringify(_params),
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Server.code,
            OperThirdModule: OperThirdModule.BaseConfig_Server_VideoStructServer.code,
            ActionType: OperActionType.Del.code
        }));
    };

    deleteByIds(ids: Array<string>) {
        let _params:IDeleteByIds = {
            ids:ids
        };
        return this.$http({
            method:'post',
            headers:{'Content-Type': 'application/json'},
            url:'/db/IvsServer/deleteByIds',
            data:JSON.stringify(_params),
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Server.code,
            OperThirdModule: OperThirdModule.BaseConfig_Server_VideoStructServer.code,
            ActionType: OperActionType.Del.code
        }));
    };
}

app
    .service('ivsServerService', IvsServerService)
;