import {app} from "../../common/app/main.app";
import 'angular';
import '../../common/services/engineServerServer.service';//../../common/services/engineServer.service
import {EngineServerType} from "../../../core/enum/EngineServerType";
import {Enum} from "../../../core/enum/Enum";
import {EngineServerEx} from "../../../core/entity/ex/EngineServerEx";
import {IEngineServerTypeEnum} from "../../../core/enum/EngineServerType";
declare let angular: any;

export class EngineServerUpdateServerController{
    static $inject = ['$scope','engineServerServer','$timeout'];
    isUpdate:boolean = false;
    currentServe:EngineServerEx;
    engineServerTypeList:Array<IEngineServerTypeEnum> = [];
    proxyServerTypeObj:{[key:string]:string} = {};
    progress:number = 10;
    constructor(private $scope:any,private engineServerServer:any,private $timeout:any,){
        let vm = this;

        for(let key in EngineServerType){
            this.engineServerTypeList.push(EngineServerType[key]);
        }

        // 初始化 ctrl 传过来的参数
        this.isUpdate = this.$scope.isUpdate;
        if(this.$scope.isUpdate){
            this.currentServe = this.$scope.updateData;
        }else{
            this.currentServe = new EngineServerEx();
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
            
            this.engineServerServer.update(this.currentServe).then((resp:any)=>{
                console.log(resp);
                
                if(resp.code == 200){
                    this.closeUpdateModel(true);
                }
            });
        }else{
            
            this.engineServerServer.save(this.currentServe).then((resp:any)=>{
                
                if(resp.code == 200){
                    this.closeUpdateModel(true);
                }
            });
        }
    };

    closeUpdateModel(isCommit:boolean){
        this.$scope.$emit('closeEngineServerUpdateModel',{isCommit:isCommit});
    }

    changeTypeSelect(){
        angular.forEach(EngineServerType,(val:IEngineServerTypeEnum)=>{
            if(val.value === this.currentServe.EngineServerType){
                this.currentServe.Port = val.index;
            }
        });
    }


    //验证字段限制，返回提示语
    validateParams(model:EngineServerEx):string{

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
    .controller('engineServerUpdateServerController', EngineServerUpdateServerController);