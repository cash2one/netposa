
import { app } from "../../common/app/main.app";
import { TreeDataParams } from "../../common/directive/tree/tree-params";
import { IWifiService } from "../../common/services/wifi.service";
import "../../common/directive/tree/tree.directive.service";
import { ITreeDirectiveService } from "../../common/directive/tree/tree.directive.service";

import { WifiEx } from "../../../core/entity/ex/WifiEx";
import { AreaEx } from "../../../core/entity/ex/AreaEx";
import { LampEx } from '../../../core/entity/ex/LampEx';
import { Wifi } from "../../../core/entity/Wifi";
import { WifiChangeAreaIDModel } from "../../../core/params/WifiParams";
import { ResponseResult } from "../../../core/params/result/ResponseResult";
import { TreeType } from "../../../core/enum/TreeType";
import { IConnectTreeService } from "../../common/services/connectTree.service";
import "../../common/services/connectTree.service";

declare let angular: any;

class WifiCreateController {
    static $inject = ['$scope', 'connectTreeService', '$timeout', 'wifiService', 'treeDirectiveService', 'layer'];
    areaTreeParams: TreeDataParams<AreaEx | WifiEx>;
    lampAreaParams: TreeDataParams<AreaEx | LampEx | WifiEx>;
    Lamp: string;
    isShowIodTree: boolean = false;
    isShowAreaTree: boolean = false;
    isRootIod: boolean = false;
    deviceData: Wifi; //当前编辑数据
    LampID: string;
    submitData: any;
    constructor(private $scope: any,
        private connectTreeService: IConnectTreeService,
        private $timeout: any,
        private wifiService: IWifiService,
        private treeService: ITreeDirectiveService,
        private layer: any) {
        this.deviceData = angular.copy(this.$scope.WifiData);
        if (!this.deviceData.JsonUserData.lampPost) {
            this.deviceData.JsonUserData.lampPost = {} as LampEx;
        }
        this.getLampTree();
    }
    private getLampTree() {
        this.connectTreeService.findLampTreeWithWifi().then((datas: Array<AreaEx | LampEx | WifiEx>) => {
            this.$timeout(() => {
                this.lampAreaParams = new TreeDataParams<AreaEx | LampEx | WifiEx>(true);
                this.lampAreaParams.treeDatas = datas;
                this.lampAreaParams.treeId = "wifiPopupTree";
                this.lampAreaParams.isDefaultSelected = true;
                this.lampAreaParams.onClick = (event: MouseEvent, treeId: string, treeNode: AreaEx) => {
                    this.$timeout(() => {
                        if (treeNode.treeType === "lamp") {
                            let lampPost = {
                                ID: treeNode.ID,
                                Name: treeNode.Name
                            }
                            this.deviceData.JsonUserData.lampPost = lampPost;
                            this.isShowAreaTree = false;
                        }
                    })
                };
            });
        })
    }
    cancel(flag?: boolean) {
        this.$scope.$emit('device.closePopup', flag);
    }
    submit() {
        this.submitData = this.deviceData;
        this.wifiService.edit(this.submitData).then((res: ResponseResult<boolean>)=>{
            if (res.data && res.code === 200) {
                this.layer.msg("更新成功");
                this.cancel(true);
            } else {
                this.layer.msg("更新失败");
            }
        })
    }
}

app.controller("WifiCreateController", WifiCreateController);