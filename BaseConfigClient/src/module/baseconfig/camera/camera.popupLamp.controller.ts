import { app } from "../../common/app/main.app";
import { TreeDataParams } from "../../common/directive/tree/tree-params";
import { Camera } from "../../../core/entity/Camera";

import { CameraEx } from "../../../core/entity/ex/CameraEx";
import { AreaEx } from "../../../core/entity/ex/AreaEx";
import { ICameraService } from "../../common/services/camera.service";
import "../../common/directive/tree/tree.directive.service";
import { ITreeDirectiveService } from "../../common/directive/tree/tree.directive.service";
import { CameraChangeAreaIDModel } from "../../../core/params/CameraParams";
import { ResponseResult } from "../../../core/params/result/ResponseResult";
import { TreeType } from "../../../core/enum/TreeType";
import {LampEx} from '../../../core/entity/ex/LampEx';
import { IConnectTreeService } from '../../common/services/connectTree.service';
import "../../common/services/connectTree.service";

declare let angular: any;

class CameraPopupLampController {
    static $inject = ['$scope', 'connectTreeService', '$timeout', 'cameraService', 'treeDirectiveService','layer'];
    treeParams: TreeDataParams<AreaEx | LampEx | CameraEx>;;
    lampId: string;
    deviceData: Camera;
    IsCheck:Boolean = false;
    constructor(private $scope: any, private connectTreeService: IConnectTreeService,
                private $timeout: any, private cameraService: ICameraService,
                private treeService: ITreeDirectiveService, private layer: any) {
        this.deviceData = angular.copy(this.$scope.deviceData);
        this.initTreeParams();
        if (!this.deviceData.JsonUserData.lampPost) {
            this.deviceData.JsonUserData.lampPost = {} as LampEx;
        }
        this.getTreeDatas();
    }
    private initTreeParams() {
        this.treeParams = new TreeDataParams<AreaEx | LampEx | CameraEx>();
        this.treeParams.treeId = "devicePopupRightTree";
        this.treeParams.isShowIcon = true;
        this.treeParams.isShowLine = false;
        this.treeParams.isSimpleData = true;
        this.treeParams.checkEnable = false;
        this.treeParams.isSingleSelect = false;
        this.treeParams.editEnable = true;
        this.treeParams.showRemoveBtn = false;
        this.treeParams.showRenameBtn = false;
        this.treeParams.onClick = (event: Event, treeId: string, treeNode: AreaEx)=>{
            if (treeNode.treeType === "lamp") {
               this.IsCheck = true;
               this.deviceData.JsonUserData.lampPost.ID = treeNode.ID;
               this.deviceData.JsonUserData.lampPost.Name = treeNode.Name;
            }
        };
    }
    private getTreeDatas() {
        this.connectTreeService.findLampTreeWithCamera().then((res: Array<AreaEx | LampEx | CameraEx>) => {
            this.$timeout(() => {
                this.treeParams.treeDatas = res;
            });
        })
    }
    cancel(flag?: boolean) {
        this.$scope.$emit('device.closePopup', flag);
    }
    submit() {
        if(!this.IsCheck){
            this.layer.msg("没有选择任何立杆");
            this.cancel(false);
            return ;
        }
        let models = [] as Array<CameraChangeAreaIDModel>;
        models.push({id: this.deviceData.ID,lampId: this.deviceData.JsonUserData.lampPost.ID,deviceReId:this.deviceData.JsonUserData.deviceReId} as CameraChangeAreaIDModel);
        this.cameraService.updateCameraLampID(models).then((res: ResponseResult<boolean>)=>{
            if (res.data && res.code === 200) {
                this.layer.msg("更新成功");
                this.cancel(true);
            } else {
                this.layer.msg("更新失败");
            }
        })
    }
}

app.controller("baseConfigCameraPopupLamp", CameraPopupLampController);