/**
 * 登录控制
 * @time: 2017-05-10 10:52:45
 * @params:
 * @return:
 */
import 'angular';
import "css!../../style/common/layer.css"
import "./login.service"
import {loginApp} from "./login.app";
import {ILoginService, LoginParams} from "./login.service";
import {SystemConfig} from "../common/system-config";
import  "des3";
import {LoginUserInfo} from "../../core/entity/ex/UserEx";
import {ILayerDec} from "./layerMsg.factory";
import  "./layerMsg.factory";
declare let require:any;
declare let angular:any;
let des3 =  require('des3');
class LoginController{
    static $inject = ['$scope','$timeout','layerDec','loginService'];
    loginParams:LoginParams;
    isLogining:boolean = false;
    isRemember:boolean;
    USER_INFO_KEY = SystemConfig.USER_INFO_KEY;
    LOGIN_DATA_KEY = "login_data";
    ENCRYPT_KEY = "sensenets";

    constructor(private $scope:any,private $timeout:Function,private layerDec:ILayerDec,private loginService:ILoginService){
        this.isRemember = true;
        this.loginParams = new LoginParams();
        this.loginParams.username = "";
        this.loginParams.password = "";
        this.initLoginData();

        console.log(this.loginParams);
    }

    //获取本地数据解密后返回
    initLoginData(){
        let data:LoginParams = this.getFromLocalStorage(this.LOGIN_DATA_KEY);
        if(data!=null){
            data.password =  des3.decrypt(this.ENCRYPT_KEY,data.password);
        }
        if(data){
            this.loginParams.username = data.username;
            this.loginParams.password = data.password;
        }
    }

    login(){
        if(!this.loginParams.username){
            this.layerDec.failInfo("请输入账号");
            return;
        }
        if(!this.loginParams.password){
            this.layerDec.failInfo("请输入密码");
            return;
        }
        if(!this.isLogining){
            this.isLogining = true;

            this.loginService.login(this.loginParams)
                .then(this.loginSuccess.bind(this))
                .catch(this.loginError.bind(this)).then(()=>{
                    this.isLogining = false;
                });
        }
    }

    /**
     * 登录请求成功
     * @param datas
     */
    loginSuccess(datas: LoginUserInfo){
        if(this.isRemember){
            this.saveLoginData(this.loginParams);
        }
        this.updateLoginInfo(datas);
        if(!this.isRemember){
            this.removeLocalStorage(this.LOGIN_DATA_KEY);
        }
        window.location.href = "/html/";
    }

    /**
     * 
     * 登录请求失败
     * @param err
     */
    loginError(err: any){
        console.error("登录出错", err.code, err.err);
    }

    //保存前加密
    saveLoginData(params: LoginParams){
        let datas:LoginParams = params;

        let _data:string = des3.encrypt(this.ENCRYPT_KEY,datas.password);

        datas.password = _data;
        this.saveToSessionStorage(this.LOGIN_DATA_KEY, datas);
    }

    saveToLocalStorage(key:string, data:LoginParams){
        try{
            localStorage.setItem(key, angular.toJson(data));
        }catch (e){
            console.error(e);
        }
        console.log("写入saveToLocalStorage ");
    }

    /**
     * dom调用, 改变记住密码状态
     */
    changeRemember(){
        this.isRemember = ! this.isRemember;
    }


    saveToSessionStorage(key:string,data:any){
        sessionStorage.setItem(key,angular.toJson(data));
        console.log("写入saveToSessionStorage");
    }

    getFromLocalStorage(key:string){
        let result = null;

        try{
            result = angular.fromJson(localStorage.getItem(key));
        }catch (e){
            result = null;
            console.error(e);
        }

        return result;
    }

    removeLocalStorage(key:string){
        localStorage.removeItem(key);
    }
    removeSessionStorage(key:string){
        sessionStorage.removeItem(key);
    }

    updateLoginInfo(loginInfo: LoginUserInfo){
        try{
            localStorage.setItem(this.USER_INFO_KEY, angular.toJson(loginInfo));
        }catch (e){
            console.error(e);
        }
    };
}
loginApp
    .controller('loginController', LoginController);