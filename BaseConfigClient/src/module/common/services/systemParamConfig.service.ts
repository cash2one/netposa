
declare var require:any;
import {app} from "../app/main.app";
import 'angular';
import {User} from "../../../core/entity/User";
import {ResponseResult, BackResponseBody} from "../../../core/params/result/ResponseResult";
import {IResponseNotifyFactory} from "../factory/response.notify.factory";
import "../factory/response.notify.factory";
import {ParameterEx} from "../../../core/entity/ex/ParameterEx";
declare let angular: any;

export interface ISystemParamConfigService{
    getSystemParamsList:()=>Promise<ResponseResult<Array<ParameterEx>>>;
    updateSystemParams:(params:Array<ParameterEx>)=>Promise<ResponseResult<any>>;
}

class SystemParamConfigService implements ISystemParamConfigService{

    static $inject:Array<string> = ['$http','notifyFactory'];
    private notifyFunc:(res: ResponseResult<any>)=>ResponseResult<any>;

    constructor(private $http:any,private notifyFactory: IResponseNotifyFactory){
        this.$http = $http;
        this.notifyFunc = this.notifyFactory.msg({onlySuccess: true});
    }

    getSystemParamsList(): Promise<ResponseResult<Array<ParameterEx>>>{
        return this.$http({
            method: 'get',
            url: '/db/parameter/getSystemParamsList'
        })
    };

    updateSystemParams(params:Array<ParameterEx>): Promise<ResponseResult<any>>{
        return this.$http({
            method: 'post',
            data:params,
            showLoad: true,
            url: '/db/parameter/updateSystemParams'
        }).then(this.notifyFunc);
    }

}

app.service('systemParamConfigService', SystemParamConfigService);