import { app } from "../../common/app/main.app";
import { TreeDataParams } from "../../common/directive/tree/tree-params";
import { Wifi } from '../../../core/entity/Wifi';
import { WifiEx } from "../../../core/entity/ex/WifiEx";
import { AreaEx } from "../../../core/entity/ex/AreaEx";
import { LampEx } from '../../../core/entity/ex/LampEx';
import { IWifiService } from "../../common/services/wifi.service";
import "../../common/directive/tree/tree.directive.service";
import { ITreeDirectiveService } from "../../common/directive/tree/tree.directive.service";
import { WifiChangeAreaIDModel } from "../../../core/params/WifiParams";
import { ResponseResult } from "../../../core/params/result/ResponseResult";
import { TreeType } from "../../../core/enum/TreeType";
import { IConnectTreeService } from "../../common/services/connectTree.service";
import "../../common/services/connectTree.service";

declare let angular: any;

class WifiPopupLampController {
    static $inject = ['$scope', 'connectTreeService', '$timeout', 'wifiService', 'treeDirectiveService', 'layer'];
    treeParams: TreeDataParams<AreaEx | WifiEx | LampEx>;
    deviceData: Wifi;
    IsCheck: Boolean = false;
     constructor(
        private $scope: any,
        private connectTreeService: IConnectTreeService,
        private $timeout: any,
        private wifiService: IWifiService,
        private treeService: ITreeDirectiveService,
        private layer: any
    ) {
        this.deviceData = angular.copy(this.$scope.deviceData);
        this.initTreeParams();
        if (!this.deviceData.JsonUserData.lampPost) {
            this.deviceData.JsonUserData.lampPost = {} as LampEx;
        }
        this.getTreeDatas();
    }
    private initTreeParams() {
        this.treeParams = new TreeDataParams<AreaEx | WifiEx | LampEx>(true);
        this.treeParams.treeId = "devicePopupRightTree";
        this.treeParams.isShowIcon = true;
        this.treeParams.isShowLine = false;
        this.treeParams.isSimpleData = true;
        this.treeParams.checkEnable = false;
        this.treeParams.isSingleSelect = false;
        this.treeParams.editEnable = true;
        this.treeParams.showRemoveBtn = false;
        this.treeParams.showRenameBtn = false;
        this.treeParams.onClick = (event: Event, treeId: string, treeNode: AreaEx) => {
            if (treeNode.treeType === "lamp") {
                let lampPost = {
                    ID: treeNode.ID,
                    Name: treeNode.Name
                }
                this.deviceData.JsonUserData.lampPost = lampPost;
                this.IsCheck = true;
            }
        };
    }
    private getTreeDatas() {
        this.connectTreeService.findLampTreeWithWifi().then((res: Array<AreaEx | WifiEx | LampEx>) => {
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
        let models = [] as Array<WifiChangeAreaIDModel>;
        models.push({id: this.deviceData.ID,lampId: this.deviceData.JsonUserData.lampPost.ID,deviceReId:this.deviceData.JsonUserData.deviceReId} as WifiChangeAreaIDModel);
        this.wifiService.updateWifiLampID(models).then((res: ResponseResult<boolean>)=>{
            if (res.data && res.code === 200) {
                this.layer.msg("更新成功");
                this.cancel(true);
            } else {
                this.layer.msg("更新失败");
            }
        })
    }
}
app.controller("baseConfigWifiPopupLamp", WifiPopupLampController);