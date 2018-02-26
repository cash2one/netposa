
import {app} from "../../common/app/main.app";
import {TreeType} from "../../../core/enum/TreeType";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {TreeDataParams} from "../../common/directive/tree/tree-params";
import {ITreeDirectiveService} from "../../common/directive/tree/tree.directive.service";
import {AreaEx} from "../../../core/entity/ex/AreaEx";

import "../../common/directive/tree/tree.directive.service";

import {ElectronicFence} from "../../../core/entity/ElectronicFence";
import {ElectronicFenceEx} from "../../../core/entity/ex/ElectronicFenceEx";
import {IElectronicFenceService} from "../../common/services/electronicfence.service";
import {ElectronicFenceChangeAreaIDModel} from "../../../core/params/ElectronicFenceParams";
import { ObjectType } from '../../../core/enum/ObjectType';

import {IConnectTreeService} from "../../common/services/connectTree.service";
import "../../common/services/connectTree.service";
import { LampEx } from '../../../core/entity/ex/LampEx';


class ElePopupLampController {
    static $inject = ['$scope', 'connectTreeService', '$timeout', 'electronicfenceService', 'treeDirectiveService', 'layer'];
    treeParams: TreeDataParams<AreaEx | ElectronicFenceEx | LampEx>;
    deviceData:ElectronicFence;
    IsCheck:Boolean = false;
    constructor(private $scope: any, 
                private connectTreeService: IConnectTreeService, 
                private $timeout: any, 
                private electronicfenceService: IElectronicFenceService, 
                private treeService: ITreeDirectiveService, 
                private layer: any) {
        this.deviceData = $scope.deviceData;
        this.initTreeParams();
        if (!this.deviceData.JsonUserData.lampPost) {
            this.deviceData.JsonUserData.lampPost = {} as LampEx;
        }
        this.getTreeDatas();
    }
    private initTreeParams(){
        this.treeParams = new TreeDataParams<AreaEx | ElectronicFenceEx | LampEx>(true);
        this.treeParams.treeId = "elePopupRightTree";
        this.treeParams.isShowIcon = true;
        this.treeParams.isShowLine = false;
        this.treeParams.isSimpleData = true;
        this.treeParams.checkEnable = false;
        this.treeParams.isSingleSelect = false;
        this.treeParams.editEnable = true;
        this.treeParams.showRemoveBtn = false;
        this.treeParams.showRenameBtn = false;
        this.treeParams.onClick = (event: Event, treeId: string, treeNode: AreaEx)=>{
            if(treeNode.treeType === "lamp"){
                let lampPost = {
                        ID: treeNode.ID,
                        Name: treeNode.Name
                    }
                this.IsCheck = true;
                this.deviceData.JsonUserData.lampPost = lampPost;
            }
        };
    }
    private getTreeDatas(){
        this.connectTreeService.findLampTreeWithElectronicfence().then((res: Array<AreaEx | ElectronicFenceEx | LampEx>)=>{
            this.$timeout(()=> {
                this.treeParams.treeDatas = res;
            });
        })
    }
    cancel(flag?: boolean){
            this.$scope.$emit('device.closePopup', flag);
        }
    submit(){
        if(!this.IsCheck){
            this.layer.msg("没有选择任何立杆");
            this.cancel(false);
            return ;
        }
        let models = [] as Array<ElectronicFenceChangeAreaIDModel>;
        models.push({id: this.deviceData.ID,lampId: this.deviceData.JsonUserData.lampPost.ID,deviceReId:this.deviceData.JsonUserData.deviceReId} as ElectronicFenceChangeAreaIDModel);
        this.electronicfenceService.updateElectronicLampID(models).then((res: ResponseResult<boolean>)=>{
            if(res.data && res.code === 200){
                this.cancel(true);
                this.layer.msg("更新成功");
            }else{
                this.layer.msg("更新失败")
            }
        })
    }
}

app.controller("baseConfigElePopupLamp", ElePopupLampController);
