import {app} from "../../../common/app/main.app";
import '../../../common/services/proxyServer.service';

import 'angular';
import {ProxyServerType} from "../../../../core/enum/ProxyServerType";
import {Enum} from "../../../../core/enum/Enum";
import {ProxyServerEx} from "../../../../core/entity/ex/ProxyServerEx";
declare let angular: any;

class ProxyServerUpdateModalController{
    static $inject = ['$scope','proxyServerService','$timeout'];
    isUpdate:boolean = false;

    currentServe:ProxyServerEx;
    proxyServerTypeList:Array<Enum> = [];
    progress:number = 10;
    constructor(private $scope:any,private proxyServerService:any,private $timeout:any,){
        let vm = this;

        for(let key in ProxyServerType){
            this.proxyServerTypeList.push(ProxyServerType[key]);
        }

        // 初始化 ctrl 传过来的参数
        this.isUpdate = this.$scope.isUpdate;
        if(this.$scope.isUpdate){
            this.currentServe = this.$scope.updateData;
            console.log(this.currentServe);
        }else{
            this.currentServe = new ProxyServerEx();
        }
        //this.currentServe = this.isUpdate?angular.copy(this.$scope.updateData): new ProxyServerModelExImpl();

        console.log("%c =====VideoServerUpdatePopupController $scope=====start==============","color:blue");
        console.log("初始化 ctrl 传过来的参数");
        console.log(this.currentServe);
        console.log("%c =========end===============","color:blue");
        //-------------


        $scope.$on("$destroy", function(){
            console.log("%c =====ProxyServerUpdateModalController $scope.$destroy=====start==============","color:green");
            console.log("销毁了弹出框");
            console.log("%c =========end===============","color:green");
        });



    }



    commitSaveOrUpdate(){
        console.log(this.currentServe);
        let checkStr = this.validateParams(this.currentServe);
        if(checkStr){
            console.log("=======checkStr===result==============",);
            console.log(checkStr + "未填写");
            console.log("=========end===============",);
            return;
        }else{
            console.log("=======checkStr===result==============",);
            console.log("参数全已经填写");
            console.log("=========end===============",);
        }
        if(this.currentServe.ID){
            console.log("=========更新===============");
            this.proxyServerService.update(this.currentServe).then((resp:any)=>{
                if(resp.code == 200){
                    this.closeUpdateModel(true);
                }
            });
        }else{
            console.log("===========新加=============");
            this.proxyServerService.save(this.currentServe).then((resp:any)=>{
                if(resp.code == 200){
                    this.closeUpdateModel(true);
                }
            });
        }
    };

    closeUpdateModel(isCommit:boolean){
        this.$scope.$emit('closeProxyServerUpdateModel',{isCommit:isCommit});
    }

    changeTypeSelect(data : any){
        console.log(this.currentServe);
        console.log(data);

    }


    //验证字段限制，返回提示语
    validateParams(model:ProxyServerEx):string{

        if(!model.Code){
            return 'Code';
        }
     /*   if(!model.Description){
            return 'Description';
        }*/
        if(!model.IpAddress){
            return 'IpAddress';
        }
        if(!model.Name){
            return 'Name';
        }
        if(!model.Port){
            return 'Port';
        }
        if(!model.ProxyServerType){
            return 'ProxyServerType';
        }
        return '';
    }
}
app
    .controller('proxyServerUpdateModalController', ProxyServerUpdateModalController);