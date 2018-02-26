/**
 *
 * @time: 2017-05-10 10:42:00
 * @params:
 * @return:
 */
import 'angular';
import "jquery.md5";
declare let require: any;
import PortraitTool from "../common/portrait-tool";
import {loginApp} from "./login.app";
import {HttpResponseResult} from "../../core/params/result/ResponseResult";
import {LoginUserInfo} from "../../core/entity/ex/UserEx";
declare var angular: any;


export interface ILoginService{
    login:(params: LoginParams)=>Promise<LoginUserInfo>;
}
export class LoginParams{
    username:string;
    password:string;
}
class LoginService implements ILoginService {

    static $inject: Array<string> = ['$http','$q'];


    constructor(private $http: any, private $q: any) {
    }

    login(params:LoginParams): Promise<LoginUserInfo> {
        let _params:LoginParams = new LoginParams();

        _params.password = PortraitTool.md5(params.password);
        _params.username = params.username;
        return this.$http({
            method:'post',
            params: _params,
            url:'/pdp/user/auth',
        }).then((resp: HttpResponseResult<LoginUserInfo>)=> {
            // 由于登录没有加拦截器, 所以需要使用resp.data才能拿到后台返回的完整数据
            if(resp && resp.data){
                if(resp.data.code == 200){
                    return resp.data.data; // 只有这种情况才返回正确的数据
                }else{
                    return this.$q.reject({code: resp.data.code, err: resp.data});
                }
            }else{
                return this.$q.reject({code: -1});
            }
        })
    }
}

loginApp
    .service('loginService', LoginService);