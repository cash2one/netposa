import {app} from "../../common/app/main.app";
import '../../common/services/proxyServer.service';

import 'angular';
import {ProxyServerType} from "../../../core/enum/ProxyServerType";
import {Enum} from "../../../core/enum/Enum";
import {ProxyServerEx} from "../../../core/entity/ex/ProxyServerEx";
import {IProxyServerTypeEnum} from "../../../core/enum/ProxyServerType";
declare let angular: any;

class ProxyServerUpdateModalController{
    static $inject = ['$scope','proxyServerService','$timeout'];
    isUpdate:boolean = false;
    currentServe:ProxyServerEx;
    proxyServerTypeList:Array<IProxyServerTypeEnum> = [];
    proxyServerTypeObj:{[key:string]:string} = {};
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
        }else{
            this.currentServe = new ProxyServerEx();
        }
        $scope.$on("$destroy", function(){
            console.log("销毁了弹出框");
        });
    }


    commitSaveOrUpdate(){
        let checkStr = this.validateParams(this.currentServe);
        if(checkStr){
            return;
        }else{
        }
        if(this.currentServe.ID){
            this.proxyServerService.update(this.currentServe).then((resp:any)=>{
                if(resp.code == 200){
                    this.closeUpdateModel(true);
                }
            });
        }else{
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

    changeTypeSelect(){
        angular.forEach(ProxyServerType,(val:IProxyServerTypeEnum)=>{
            if(val.value === this.currentServe.ProxyServerType){
                this.currentServe.Port = val.index;
            }
        });
    }


    //验证字段限制，返回提示语
    validateParams(model:ProxyServerEx):string{

        if(!model.Code){
            return 'Code';
        }
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