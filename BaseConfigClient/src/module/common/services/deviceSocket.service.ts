/**
 * Created by lb on 2017/11/1 0001.
 */
import {app} from "../app/main.app";
import {ResponseResult} from  '../../../core/params/result/ResponseResult';
import  '../../common/factory/userinfo.cache.factory'
export  interface IdeviceSocket {
    getCameraInfo: (data:any) => Promise<any>;
    getWifiInfo:(data:any) => Promise<any>;
    subscribeInfo:(data:any) => Promise<any>;
}

class deviceSocketService implements IdeviceSocket {
    static $inject: Array<string> = ['$http','notifyFactory','userInfoCacheFactory'];
    private notifyFunc:(res: ResponseResult<any>)=>ResponseResult<any>;
    constructor(private $http: any, private notifyFactory: any,private  userInfoCacheFactory:any) {
    }

    getCameraInfo (data:any){
        return this.$http({
            method:'POST',
            url:'/pdp/commonCtrl/log/subcribeOper',
            data: data
        }).then((res:ResponseResult<any>)=>{
            if (res) {
                return res;
            }
        })
    }

    getWifiInfo (data:any){
        return this.$http({
            method:'POST',
            url:'/pdp/commonCtrl/log/subcribeOper',
            data:data
        }).then((res:ResponseResult<any>)=>{
            if (res) {
                return res;
            }
        })
    }

    subscribeInfo (data:any){
        return this.$http({
            method:'POST',
            url:'/pdp/commonCtrl/log/subcribeOper',
            data:data
        }).then((res:ResponseResult<any>)=>{
            if (res) {
                return res;
            }
        })
    }
}
app.service('deviceSocketServer',deviceSocketService);