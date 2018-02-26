
declare var require:any;
import {app} from "../app/main.app";
import 'angular';
import {User} from "../../../core/entity/User";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {IResponseNotifyFactory} from "../factory/response.notify.factory";
import "../factory/response.notify.factory";
declare let angular: any;

export interface IUserService{
    /** create by zxq
     *  根据 功能权限 关键字 （FullNameSpacePath） 获取有对应权限的用户
     * @time: 2017-06-19 11:20:52
     * @params: funcCode:string
     * @return: Array<User>
     */
    getListByFuncAuthCode:(funcAuthCode:string)=>Promise<ResponseResult<any>>;
}

class UserService implements IUserService{

    static $inject:Array<string> = ['$http','notifyFactory'];
    private notifyFunc:(res: ResponseResult<any>)=>ResponseResult<any>;

    constructor(private $http: any, private notifyFactory: IResponseNotifyFactory) {
        this.$http = $http;
        this.notifyFunc = this.notifyFactory.msg({onlySuccess: true});
    }

    getListByFuncAuthCode = (funcAuthCode:string)=> {
        let _params = {
            functionModuleKey:funcAuthCode
        };
        return this.$http({
            method: 'post',
            params:_params,
            url: '/pdp/userrole/find/function/userlist',
        })
    }
}

app
    .service('userService', UserService);