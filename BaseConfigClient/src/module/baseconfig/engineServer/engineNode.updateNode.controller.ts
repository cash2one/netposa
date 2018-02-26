import {app} from "../../common/app/main.app";
import 'angular';
import '../../common/services/engineNodeServer.service';
import {Enum} from "../../../core/enum/Enum";
import {EngineNodeEx} from "../../../core/entity/ex/EngineNodeEx";
import { EngineNode } from "../../../core/entity/EngineNode";
declare let angular: any;

export class EngineNodeUpdateNodeController{
    static $inject = ['$scope','engineNodeServer','$timeout'];
    isUpdate:boolean = false;
    EngineServerID:string;
    currentNode:EngineNodeEx;
    proxyServerTypeObj:{[key:string]:string} = {};
    progress:number = 10;
    constructor(private $scope:any,private engineNodeServer:any,private $timeout:any){
        let vm = this;

        // 初始化 ctrl 传过来的参数
        this.isUpdate = this.$scope.isUpdate;
        this.EngineServerID = this.$scope.engineServerID
        if(this.$scope.isUpdate){
            this.currentNode = this.$scope.updateData;
        }else{
            this.currentNode = new EngineNodeEx();
        }
        $scope.$on("$destroy", function(){
            console.log("销毁了弹出框");
        });
    }


    commitSaveOrUpdateNode(currentNode:EngineNode){
        let checkStr = this.validateParams(currentNode);
        if(checkStr){
            return;
        }
        if(currentNode.ID){
            this.engineNodeServer.update(currentNode).then((resp:any)=>{
                if(resp.code == 200){
                    this.closeUpdateModel(true);
                }
            });
        }else{
            this.currentNode.EngineServerID = this.EngineServerID;
            this.engineNodeServer.save(this.currentNode).then((resp:any)=>{
                if(resp.code == 200){
                    this.closeUpdateModel(true);
                }
            });
        }
    };

    closeUpdateModel(isCommit:boolean){
        this.$scope.$emit('closeEngineNodeUpdateModel',{isCommit:isCommit});
    }


    //验证字段限制，返回提示语
    validateParams(model:EngineNodeEx):string{

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
        return '';
    }
}
app
    .controller('engineNodeUpdateNodeController', EngineNodeUpdateNodeController);