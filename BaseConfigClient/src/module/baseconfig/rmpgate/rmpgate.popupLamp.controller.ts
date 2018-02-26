import { app } from "../../common/app/main.app";
import { TreeDataParams } from "../../common/directive/tree/tree-params";
import { RmpGate } from '../../../core/entity/RmpGate';
import { RmpGateEx } from "../../../core/entity/ex/RmpGateEx";
import { AreaEx } from "../../../core/entity/ex/AreaEx";
import { LampEx } from '../../../core/entity/ex/LampEx';
import { IRmpGateService } from "../../common/services/rmpgate.service";
import "../../common/directive/tree/tree.directive.service";
import { ITreeDirectiveService } from "../../common/directive/tree/tree.directive.service";
import { RmpGateChangeAreaIDModel } from "../../../core/params/RmpGateParams";
import { ResponseResult } from "../../../core/params/result/ResponseResult";
import { TreeType } from "../../../core/enum/TreeType";
import { IConnectTreeService } from "../../common/services/connectTree.service";
import "../../common/services/connectTree.service";

declare let angular: any;

class RmpGatePopupLampController {
    static $inject = ['$scope', 'connectTreeService', '$timeout', 'rmpgateService', 'treeDirectiveService', 'layer'];

    rightSelectTreeNodeId: string;
    rightTreeParams: TreeDataParams<AreaEx | RmpGateEx | LampEx>;
    deviceData: RmpGate;
    IsCheck: Boolean = false;
    constructor(
        private $scope: any,
        private connectTreeService: IConnectTreeService,
        private $timeout: any,
        private rmpgateService: IRmpGateService,
        private treeService: ITreeDirectiveService,
        private layer: any
    ) {
        this.deviceData = angular.copy(this.$scope.deviceData)
        this.rightSelectTreeNodeId = null;
        if (!this.deviceData.JsonUserData.lampPost) {
            this.deviceData.JsonUserData.lampPost = {} as LampEx;
        }
        this.initTreeParams();
        this.getTreeDatas();
    }
    private initTreeParams() {
        this.rightTreeParams = new TreeDataParams<AreaEx | RmpGateEx | LampEx>(true);
        this.rightTreeParams.treeId = "RmpgatePopupRightTree";
        this.rightTreeParams.isShowIcon = true;
        this.rightTreeParams.isShowLine = false;
        this.rightTreeParams.isSimpleData = true;
        this.rightTreeParams.checkEnable = false;
        this.rightTreeParams.isSingleSelect = false;
        this.rightTreeParams.editEnable = true;
        this.rightTreeParams.showRemoveBtn = false;
        this.rightTreeParams.showRenameBtn = false;
        this.rightTreeParams.onClick = ((event: Event, treeId: string, treeNode: AreaEx) => {
            if (treeNode.treeType === "lamp") {
                let lampPost = {
                    ID: treeNode.ID,
                    Name: treeNode.Name
                }
                this.IsCheck = true;
                this.deviceData.JsonUserData.lampPost = lampPost;
            }
        });
    }
    private getTreeDatas() {
        this.connectTreeService.findLampTreeWithRmpGate().then((res: Array<AreaEx | RmpGateEx | LampEx>) => {
            this.$timeout(() => {
                this.rightTreeParams.treeDatas = res;
            });
        });
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
        let models = [] as Array<RmpGateChangeAreaIDModel>;
        models.push({id: this.deviceData.ID,lampId: this.deviceData.JsonUserData.lampPost.ID,deviceReId:this.deviceData.JsonUserData.deviceReId} as RmpGateChangeAreaIDModel);
        this.rmpgateService.updateRmpGateLampID(models).then((res: ResponseResult<boolean>)=>{
            if(res.data && res.code === 200){
                this.layer.msg("更新成功");
                this.cancel(true);
            }else{
                this.layer.msg("更新失败");
            }
        })
    }
}

app.controller("baseConfigRmpgatePopupLamp", RmpGatePopupLampController);