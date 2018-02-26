import {app} from "../app/main.app";
import {SystemPoint} from "../../../core/entity/SystemPoint";
import {HttpResponseResult, ResponseResult} from "../../../core/params/result/ResponseResult";
import "../factory/response.notify.factory";
import {IResponseNotifyFactory} from "../factory/response.notify.factory";
import{SystemConfigParams} from "../../../core/entity/SystemConfigParams";

export interface ISystemService {
    //获取地图服务信息
    getSystemData(): any; 
    //编辑地图服务信息
    editSystemData(model:SystemConfigParams): Promise<ResponseResult<boolean>>;
}

class SystemService implements ISystemService {
    static $inject = ["$http",'notifyFactory'];

    private $http: any;
    private notifyFunc: (res: ResponseResult<any>)=>ResponseResult<any>;

    constructor($http: any, notifyFactory: IResponseNotifyFactory) {
        this.$http = $http;
        this.notifyFunc = notifyFactory.msg({onlySuccess: true});
    }
    getSystemData() {
        return this.$http({
            method: "GET",
            url:"/db/param/findSystemConfig"
        })
    }
    editSystemData(model:SystemConfigParams){
         return this.$http({
            method: "POST",
            url:"/db/param/editSystemConfig",
            data: model
        });
    }
}

app.service("systemService", SystemService);