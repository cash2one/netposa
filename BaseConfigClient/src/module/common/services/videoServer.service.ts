import {VideoServerListParams} from "../../../core/params/VideoServerParams";
import {app} from "../app/main.app";

import 'angular';
import {VideoServer} from "../../../core/entity/VideoServer";
import {
    IFindByIdParams, IDeleteById,
    IDeleteByIds
} from "../../../core/params/request/RequestParams";

import {VideoServerEx} from "../../../core/entity/ex/VideoServerEx";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {IResponseNotifyFactory} from "../factory/response.notify.factory";
import "../factory/response.notify.factory";

import {OperFitstModule} from '../../../core/entity/OperFirstModule';
import {OperSecondModule} from '../../../core/entity/OperSecondModule';
import {OperThirdModule} from  '../../../core/entity/OperThirdModule';
import {OperActionType} from '../../../core/entity/OperActionType';
import {ISystemLogFactory} from "../factory/SystemLog.factory";
import "../factory/SystemLog.factory";

declare let angular: any,require:any;

export interface IVideoServerService {
    findListByParams(params: VideoServerListParams):Promise<ResponseResult<any>>;
    findById(id: string):Promise<ResponseResult<any>>;
    update(params: VideoServerEx):Promise<ResponseResult<any>>;
    deleteById(id: string):Promise<ResponseResult<any>>;
    deleteByIds(ids: Array<string>):Promise<ResponseResult<any>>;
    save(params: VideoServer):Promise<ResponseResult<any>>;
    synchronize:(id:string)=>Promise<any>;
    isHasTask(ids: Array<string>):Promise<ResponseResult<any>>;

}
class VideoServerService implements IVideoServerService{

    static $inject:Array<string> = ['$http','notifyFactory','systemLogFactory'];
    private notifyFunc:(res: ResponseResult<any>)=>ResponseResult<any>;

    constructor(private $http: any, private notifyFactory: IResponseNotifyFactory,private systemLogFactory:ISystemLogFactory) {
        this.$http = $http;
        this.notifyFunc = this.notifyFactory.msg({onlySuccess: true});
    }

    findListByParams (params: VideoServerListParams) {
        let _params =  params;
        return this.$http({
            method:'get',
            params: _params,
            url:'/db/VideoServer/findListByParams',
        })
    };

    findById (id: string) {
        let _params:IFindByIdParams = {
            id:id
        };
        return this.$http({
            method:'get',
            params: _params,
            url:'/db/VideoServer/findById',
        })
    };

    update (params: VideoServerEx) {
        let _params = {
            model:params
        };
        return this.$http({
            method:'post',
            headers:{'Content-Type': 'application/json ;charset=utf-8'},
            url:'/db/VideoServer/update',
            data:JSON.stringify(_params),
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Server.code,
            OperThirdModule: OperThirdModule.BaseConfig_Server_VideoServer.code,
            ActionType: OperActionType.Modify.code
        }));
    };

    save (params: VideoServer) {
        console.log(params);
        let _params = {
            model:params
        };
        return this.$http({
            method:'post',
            headers:{'Content-Type': 'application/json ;charset=utf-8'},
            url:'/db/VideoServer/save',
            data:JSON.stringify(_params),
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Server.code,
            OperThirdModule: OperThirdModule.BaseConfig_Server_VideoServer.code,
            ActionType: OperActionType.Add.code
        }));
    };

    deleteById (id: string){
        let _params:IDeleteById = {
            id:id
        };
        return this.$http({
            method:'post',
            headers:{'Content-Type': 'application/json'},
            url:'/db/VideoServer/deleteById',
            data:JSON.stringify(_params),
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Server.code,
            OperThirdModule: OperThirdModule.BaseConfig_Server_VideoServer.code,
            ActionType: OperActionType.Del.code
        }));
    };

    deleteByIds (ids: Array<string>){
        let _params:IDeleteByIds = {
            ids:ids
        };
        return this.$http({
            method:'post',
            headers:{'Content-Type': 'application/json'},
            url:'/db/VideoServer/deleteByIds',
            data:JSON.stringify(_params),
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Server.code,
            OperThirdModule: OperThirdModule.BaseConfig_Server_VideoServer.code,
            ActionType: OperActionType.Del.code
        }));
    };
    isHasTask (ids: Array<string>){
        let _params:IDeleteByIds = {
            ids:ids
        };
        return this.$http({
            method:'post',
            headers:{'Content-Type': 'application/json'},
            url:'/db/VideoServer/isHasTask',
            data:JSON.stringify(_params),
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Server.code,
            OperThirdModule: OperThirdModule.BaseConfig_Server_VideoServer.code,
            ActionType: OperActionType.View.code
        }));
    };
    synchronize(id:string):Promise<any>{
        return this.$http({
            method: "post",
            url: "/bcs/video/syncVideoServer",
            params: {videoServerId:id},
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Server.code,
            OperThirdModule: OperThirdModule.BaseConfig_Server_VideoServer.code,
            ActionType: OperActionType.Sync.code
        }));
    }
}

app
    .service('videoServerService', VideoServerService);