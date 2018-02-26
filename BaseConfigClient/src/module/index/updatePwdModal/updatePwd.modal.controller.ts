import "css!../../baseconfig/css/baseconfig-face.css";
import {app} from "../../common/app/main.app";
import {IMainService} from "../main.service";
import PortraitTool from "../../common/portrait-tool";
import {IUserInfoCacheFactory} from "../../common/factory/userinfo.cache.factory";
import {SystemConfig} from "../../common/system-config";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {IUpdatePwdParams} from "../../../core/params/UserParams";

declare let angular: any;

class UpdatePwdModalController {

    closeEmitName:string;

    viewPwds:{
        oldPwd:string;
        newPwd:string;
        rePwd:string;
    };
    oldPwd:string;
    // 旧密码错误
    isOldPwdError:boolean;
    // 重复密码出错
    isRePwdError:boolean;

    // 提示信息集合
    provingTexts:Array<string>;
    static $inject = [
        '$scope',
        '$timeout',
        'layer',
        '$base64',
        'mainService',
        'userInfoCacheFactory',
        'i18nFactory'
    ];
    constructor(
        private $scope: any,
        private $timeout:any,
        private layer:any,
        private $base64:any,
        private mainService:IMainService,
        private userInfoCacheFactory:IUserInfoCacheFactory,
        private i18nFactory:any
    ){
        this.viewPwds = {} as {
            oldPwd:string;
            newPwd:string;
            rePwd:string;
        };
        let loginData:{password:string} = PortraitTool.getLocalStorageData(SystemConfig.USER_DATA_KEY);
        if(loginData){
            this.oldPwd = this.$base64.decode(loginData.password) ;
        }
        this.closeEmitName = this.$scope.closeEmitName;
        this.provingTexts = [
            "FDS_00_14_01",
            "FDS_00_14_02"
        ];
    }

    closeUpdateModel(isLoginOut:boolean){

        this.$scope.$emit(this.closeEmitName, isLoginOut);
    }


    commitUpdate(){
        if(this.isRePwdError || this.isOldPwdError){
            return;
        }
        let params:IUpdatePwdParams = {
            oldPwd:PortraitTool.md5(this.oldPwd),
            newPwd:PortraitTool.md5(this.viewPwds.newPwd),
            username:this.userInfoCacheFactory.getCurrentUid()
        };
        this.mainService.updatePwdToFcs(params).then((resp:ResponseResult<any>)=>{
            if(resp.code === 200){
                this.updatePwdToBcs(params);
            }
        });
    }

    /**
     *  同步密码到 baseDB
     * @time: 2017-08-18 09:43:35
     */
    updatePwdToBcs(params:IUpdatePwdParams){
        this.mainService.updatePwdToBcs(params).then((resp:ResponseResult<any>)=>{
            if(resp.code === 200){
                this.layer.msg(this.i18nFactory('FDS_00_13_07'));
                this.$timeout(()=>{
                    this.closeUpdateModel(true);
                },2000);
            }else{
                this.rollBackUpdateToFcs(params);
            }
        },()=>{
            this.rollBackUpdateToFcs(params);
        })
    };
    /**
     *  同步密码 失败，回滚 fcs
     * @time: 2017-08-18 09:43:35
     */
    rollBackUpdateToFcs(params:IUpdatePwdParams){
        let _params= {} as IUpdatePwdParams;
        _params.newPwd = params.oldPwd;
        _params.oldPwd = params.newPwd;
        _params.username = params.username;
        this.mainService.updatePwdToFcs(params).then((resp:ResponseResult<any>)=>{

        });
    }

    compareOldPwd(valid:boolean):void{
        if(valid && this.viewPwds.oldPwd){
            if(this.oldPwd !== this.viewPwds.oldPwd){
                this.isOldPwdError = true;
            }
        }else{
            this.isOldPwdError = false;
        }
    };

    compareNewPwd(valid:boolean):void{
        this.isRePwdError = valid && this.viewPwds.newPwd !== this.viewPwds.rePwd
    };
}
app.controller("updatePwdModalController", UpdatePwdModalController);