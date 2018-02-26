import { app } from "../../common/app/main.app";
import { TreeDataParams } from "../../common/directive/tree/tree-params";
import { RmpGate } from '../../../core/entity/RmpGate';

import { RmpGateEx } from "../../../core/entity/ex/RmpGateEx";
import { AreaEx } from "../../../core/entity/ex/AreaEx";
import { IRmpGateService } from "../../common/services/rmpgate.service";
import "../../common/directive/tree/tree.directive.service";
import { ITreeDirectiveService } from "../../common/directive/tree/tree.directive.service";
import { ResponseResult } from "../../../core/params/result/ResponseResult";
import { TreeType } from "../../../core/enum/TreeType";

import { CameraTypeEnum } from '../../../core/server/enum/CameraTypeEnum';
import { LampEx } from '../../../core/entity/ex/LampEx';
import { IConnectTreeService } from "../../common/services/connectTree.service";
import "../../common/services/connectTree.service";

declare let angular: any;

class DeviceRmpGateCreateController {
    static $inject = ['$scope', 'connectTreeService', '$timeout', 'rmpgateService', 'treeDirectiveService', 'layer'];
    treeParams: TreeDataParams<AreaEx | RmpGateEx | LampEx>;
    Rmpgate: RmpGate;
    isShowAreaTree: boolean;
    isRootArea: boolean;
    constructor(private $scope: any, private connectTreeService: IConnectTreeService,
        private $timeout: any, private rmpgateService: IRmpGateService,
        private treeService: ITreeDirectiveService,
        private layer: any) {
        this.Rmpgate = angular.copy(this.$scope.RmpGate);
        if (!this.Rmpgate.JsonUserData.lampPost) {
            this.Rmpgate.JsonUserData.lampPost = {} as LampEx;
        }
        this.initTreeDatas();
        this.getTreeDatas();
    }
    private initTreeDatas() {
        this.treeParams = new TreeDataParams<AreaEx>();
        this.treeParams.treeId = "areaPopupAreaTree";
        this.treeParams.isDefaultSelected = true;
        this.treeParams.onClick = (event: MouseEvent, treeId: string, treeNode: AreaEx) => {
            this.$timeout(() => {
                if (treeNode.treeType === "lamp") {
                    let lampPost = {
                        ID: treeNode.ID,
                        Name: treeNode.Name
                    }
                    this.Rmpgate.JsonUserData.lampPost = lampPost;
                    this.isShowAreaTree = false;
                }
            })
        }
    }
    private getTreeDatas() {
        this.connectTreeService.findLampTreeWithRmpGate().then((res: Array<AreaEx | RmpGateEx | LampEx>) => {
            this.$timeout(() => {
                this.treeParams.treeDatas = res;
            });
        });
    }
    cancel(flag?: boolean) {
        this.$scope.$emit('device.closePopup', flag);
    }
    submit() {
        this.rmpgateService.edit(this.Rmpgate).then((res: ResponseResult<boolean>)=>{
            if(res.data && res.code === 200){
                this.layer.msg("更新成功");
                this.cancel(true);
            }else{
                this.layer.msg("更新失败");
            }
        })
    }
}

app.controller("DeviceRmpGateCreateController", DeviceRmpGateCreateController);