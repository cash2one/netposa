import { app } from "../../common/app/main.app";
import { TreeDataParams } from "../../common/directive/tree/tree-params";
import {IElectronicFenceService} from "../../common/services/electronicfence.service";

import { ElectronicFenceEx } from "../../../core/entity/ex/ElectronicFenceEx";
import { AreaEx } from "../../../core/entity/ex/AreaEx";
import { LampEx } from '../../../core/entity/ex/LampEx';
import {ElectronicFence} from "../../../core/entity/ElectronicFence";
import { ResponseResult } from "../../../core/params/result/ResponseResult";
import { IConnectTreeService } from "../../common/services/connectTree.service";
import "../../common/services/connectTree.service";
declare let angular: any;

class ElectroninfenceCreateController {
    static $inject = ['$scope', 'connectTreeService', '$timeout', 'electronicfenceService', 'treeDirectiveService'];
    areaTreeParams: TreeDataParams<AreaEx | ElectronicFenceEx>;
    lampAreaParams: TreeDataParams<AreaEx | LampEx | ElectronicFenceEx>;
    Lamp: string;
    isShowIodTree: boolean = false;
    isShowAreaTree: boolean = false;
    isRootIod: boolean = false;
    
    deviceData: ElectronicFence; //当前编辑数据
    LampID: string;
    submitData: any;
    constructor(private $scope: any,
        private connectTreeService: IConnectTreeService,
        private $timeout: any,
        private electronicfenceService: IElectronicFenceService) {
        this.deviceData = angular.copy(this.$scope.ElectronicFenceData);
        this.initParams();
        if (!this.deviceData.JsonUserData.lampPost) {
            this.deviceData.JsonUserData.lampPost = {} as LampEx;
        }
        this.getLampTree();
        this.$scope.$on('$destory',()=>{
            console.log(`$destory action`)
        })
    }
    private initParams() {
        this.areaTreeParams = new TreeDataParams<AreaEx | ElectronicFenceEx>(true);
        this.areaTreeParams.treeId = "elePopupTree";
        this.areaTreeParams.isDefaultSelected = true;
        this.areaTreeParams.onClick = (event: MouseEvent, treeId: string, treeNode: AreaEx) => {
            this.$timeout(() => {
                this.deviceData.AreaID = treeNode.ID;
                this.deviceData.JsonUserData.Area.Name = treeNode.Name;
                this.isShowIodTree = false;
            })
        };
    }
    private getLampTree() {
        this.connectTreeService.findLampTreeWithElectronicfence().then((datas: Array<AreaEx | LampEx | ElectronicFenceEx>) => {
            this.$timeout(() => {
                this.lampAreaParams = new TreeDataParams<AreaEx | LampEx | ElectronicFenceEx>(true);
                this.lampAreaParams.treeDatas = datas;
                this.lampAreaParams.treeId = "lampAreaPopupTree";
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
        this.electronicfenceService.edit(this.submitData).then((res: ResponseResult<boolean>)=>{
            console.log(res)
            if (res.data && res.code === 200) {
                this.cancel(true);
            }
        })
    }
}

app.controller("DeviceElectroninfenceCreateController", ElectroninfenceCreateController);