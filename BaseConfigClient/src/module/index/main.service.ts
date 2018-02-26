import {ResponseResult} from "../../core/params/result/ResponseResult";
/**
 * 全局请求操作
 * @time: 2017-05-11 10:10:49
 * @params:
 * @return:
 */
declare var angular: any;

import 'angular';
import {app} from '../common/app/main.app';
import {IUpdatePwdParams} from "../../core/params/UserParams";

export interface IMainService{
    loginOut(userKey: string): Promise<ResponseResult<any>>;
    checkLogin(userName: string): Promise<ResponseResult<any>>;

    updatePwdToFcs(params: IUpdatePwdParams): Promise<ResponseResult<any>>;

    /**
     *  修改密码后 同步到 基础db
     * @time: 2017-08-18 09:39:09
     */
    updatePwdToBcs(params: IUpdatePwdParams): Promise<ResponseResult<boolean>>;
    /**
     * 请求系统配置
     */
    updateSystemData(): Promise<ResponseResult<any>>;
}

class MainService {
    static $inject:Array<string> = ['$http'];
    constructor(private $http:any){

    }
    loginOut(userKey: string){
        console.debug(userKey);
        return this.$http({
            method:'post',
            headers:{'Content-Type': 'application/json ;charset=utf-8'},
            url:'/fds/user/logout',
            params: {userKey: userKey}
        })
    }

    checkLogin(userName: string){
        // 存本地数据。。。。

        return this.$http({
            method:'post',
            headers:{'Content-Type': 'application/json ;charset=utf-8'},
            url:'/pdp/user/check-login',
            params: {username: userName}
        })
    }

    updatePwdToFcs(params: IUpdatePwdParams){
        return this.$http({
            method:'post',
            url:'/pdp/user/changeUser',
            params:params
        })
    }

    updatePwdToBcs(params: IUpdatePwdParams){
        return this.$http({
            method:'post',
            url:'/db/user/updatePwd',
            data:params
        })
    }

    updateSystemData(){
        return this.$http({
            method:'get',
            url:'/db/param/findSystemConfig'
        })
    }
}
app
    .service('mainService', MainService);