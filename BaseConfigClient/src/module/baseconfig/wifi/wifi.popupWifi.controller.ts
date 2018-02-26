import { app } from "../../common/app/main.app";
import { TreeDataParams } from "../../common/directive/tree/tree-params";
import { Wifi } from "../../../core/entity/Wifi";
import { WifiEx } from "../../../core/entity/ex/WifiEx";
import { AreaEx } from "../../../core/entity/ex/AreaEx";
import { LampEx } from "../../../core/entity/ex/LampEx";
import { IWifiService } from "../../common/services/wifi.service";
import "../../common/directive/tree/tree.directive.service";
import { ITreeDirectiveService } from "../../common/directive/tree/tree.directive.service";
import { WifiChangeAreaIDModel } from "../../../core/params/WifiParams";
import { ResponseResult } from "../../../core/params/result/ResponseResult";
import { TreeType } from "../../../core/enum/TreeType";
import { IConnectTreeService } from "../../common/services/connectTree.service";
import "../../common/services/connectTree.service";
import { Relation } from '../../../core/entity/DeviceRelation';
import { ObjectType } from "../../../core/enum/ObjectType";
import { ILayerDec } from "../../common/factory/layerMsg.factory";
import "../../common/factory/layerMsg.factory";

type AreaWifiEx = AreaEx & WifiEx;

interface AreaIDCacheModel {
    id: string;
    parentId: string;
    originParentId: string;
    deviceReId?: string;
}

interface AreaIDCacheCollection {
    [key: string]: AreaIDCacheModel;
}


class DevicePopupWifiController {
    static $inject = ['$scope', '$timeout', 'wifiService', 'treeDirectiveService', 'connectTreeService', 'layerDec'];
    rightSelectTreeNodeId: string;
    leftTreeParams: TreeDataParams<Wifi>;
    rightTreeParams: TreeDataParams<any>;
    type: string;
    cacheChangeNodes = {} as AreaIDCacheCollection;
    searchLeftTreeInput: string;
    constructor(
        private $scope: any,
        private $timeout: any,
        private wifiService: IWifiService,
        private treeService: ITreeDirectiveService,
        private connectTreeService: IConnectTreeService,
        private layerDec: ILayerDec
    ) {
        this.type = $scope.type;
        this.rightSelectTreeNodeId = null;
        this.initTreeParams();
        this.getLeftTreeData();
        this.getRightTreeData();
    }
    private initTreeParams() {
        this.leftTreeParams = new TreeDataParams<WifiEx>(true);
        this.leftTreeParams.treeId = "devicePopupLeftTree";
        this.leftTreeParams.isShowIcon = true;
        this.leftTreeParams.isShowLine = false;
        this.leftTreeParams.isSimpleData = true;
        this.leftTreeParams.checkEnable = false;
        this.leftTreeParams.isSingleSelect = false;
        this.leftTreeParams.editEnable = true;
        this.leftTreeParams.showRemoveBtn = false;
        this.leftTreeParams.showRenameBtn = false;
        this.leftTreeParams.beforeDrop = beforeDropRule;
        this.leftTreeParams.beforeDrag = beforeDragRule;
        if (this.type === TreeType.lamp.value) {
            this.leftTreeParams.addDiyDom = (treeId: string, treeNode: any) => {
                this.treeService.addDiyDomIsConfiStatus(treeId, treeNode);
            };
        }

        this.rightTreeParams = new TreeDataParams<AreaWifiEx>(true);
        this.rightTreeParams.treeId = "devicePopupRightTree";
        this.rightTreeParams.isShowIcon = true;
        this.rightTreeParams.isShowLine = false;
        this.rightTreeParams.isSimpleData = true;
        this.rightTreeParams.checkEnable = false;
        this.rightTreeParams.isSingleSelect = false;
        this.rightTreeParams.editEnable = true;
        this.rightTreeParams.showRemoveBtn = false;
        this.rightTreeParams.showRenameBtn = false;
        this.rightTreeParams.beforeDrop = beforeDropRule;
        this.rightTreeParams.beforeDrag = beforeDragRule;
        let _self = this as DevicePopupWifiController;
        function beforeDropRule(treeId: string, treeNodes: Array<WifiEx>, targetNode: LampEx & AreaEx & WifiEx) {
            if (treeId == _self.leftTreeParams.treeId) {
                return false;
            }
            if (_self.type === TreeType.lamp.value && targetNode.treeType !== TreeType.lamp.value) {
                return false;
            }
            if (_self.type === TreeType.area.value && targetNode.treeType !== TreeType.area.value) {
                return false;
            }
            let newNodeList = [] as Array<WifiEx>;
            let updateNodeList = [] as Array<WifiEx>;
            treeNodes.forEach((item: WifiEx | any) => {
                item.ParentID = targetNode.ID;
                item.isConfigLamp = true;
                let node = _self.treeService.getNodeByParam(treeId, 'ID', item.ID) as WifiEx;
                if (node) {
                    updateNodeList.push(item)
                } else {
                    newNodeList.push(item)
                }
            });
            if (updateNodeList.length > 0) {
                _self.$timeout(() => {
                    _self.treeService.removeNodes(treeId, updateNodeList);
                    _self.treeService.addNodes(treeId, updateNodeList, targetNode);
                })
            }
            if (newNodeList.length > 0) {
                _self.treeService.addNodes(treeId, newNodeList, targetNode);
            }
            if (_self.type === TreeType.lamp.value) {
                _self.updateTreeDiyDom(treeId, treeNodes);
            }
            _self.changeNodesParentID(treeNodes, targetNode.ID);
            return false

        }
        function beforeDragRule(treeId: string, treeNodes: Array<WifiEx>) {
            let flag = true;
            if (treeNodes && treeNodes.length > 0) {
                let i, len, treeType = TreeType.wifi.value;
                for (i = 0, len = treeNodes.length; i < len; i++) {
                    if (treeNodes[i].treeType !== treeType) {
                        flag = false;
                        break;
                    }
                }
            } else {
                flag = false;
            }
            return flag;
        }
    }
    /**
     * @desc 批量去更新diyDom状态
     * @param {string} treeId
     * @param {Array<any>} treeNodes
     */
    updateTreeDiyDom(treeId: string, treeNodes: Array<any>) {
        this.$timeout(() => {
            treeNodes.forEach((item: any) => {
                this.leftTreeParams.addDiyDom(treeId, item);
            })
        })
    }
    private changeNodesParentID(treeNodes: any, parentId: string) {
        if (!treeNodes || treeNodes.length <= 0) return;
        let i, len, temp, originParentId;
        for (i = 0, len = treeNodes.length; i < len; i++) {
            if (this.type === TreeType.area.value) {
                temp = treeNodes[i];
                originParentId = temp.AreaID;
                temp.ParentID = parentId;
                temp.AreaID = parentId;
            } else if (this.type === TreeType.lamp.value) {
                temp = treeNodes[i];
                if (!temp.JsonUserData.lampPost) {
                    let lampPost = {} as Relation;
                    lampPost.ObjectId = parentId;
                    lampPost.ObjectType = ObjectType.LampPost.value;
                    lampPost.RelatedObjectId = temp.ID;
                    lampPost.RelatedObjectType = ObjectType.Wifi.value;
                    temp.JsonUserData.lampPost = lampPost;
                    originParentId = "";
                    temp.ParentID = parentId;
                } else {
                    originParentId = temp.JsonUserData.lampPost.ID;
                    temp.ParentID = parentId;
                    temp.JsonUserData.lampPost.ID = parentId;
                }

            }

            this.addOrUpdateTreeChangeCache({ id: temp.ID, parentId: temp.ParentID, originParentId: originParentId, deviceReId: temp.JsonUserData.DeviceReId });
        }
    }
    private addOrUpdateTreeChangeCache(model: AreaIDCacheModel) {
        if (this.cacheChangeNodes[model.id]) {
            this.cacheChangeNodes[model.id].parentId = model.parentId;
        } else {
            this.cacheChangeNodes[model.id] = model;
        }
    }

    submit() {
        let key, temp, models = [] as Array<WifiChangeAreaIDModel>, P: any;
        if (this.type === 'area') {
            for (key in this.cacheChangeNodes) {
                temp = this.cacheChangeNodes[key];
                models.push({ id: temp.id, areaId: temp.parentId } as WifiChangeAreaIDModel);
            }
            if (models.length > 0) {
                P = this.wifiService.updateWifiAreaID(models);
            } else {
                this.layerDec.warnInfo("没有选择任何区域");
                this.cancel(false);
            }
        } else {
            for (key in this.cacheChangeNodes) {
                temp = this.cacheChangeNodes[key];
                models.push({ id: temp.id, lampId: temp.parentId, deviceReId: temp.deviceReId } as WifiChangeAreaIDModel);
            }
            if (models.length > 0) {
                P = this.wifiService.updateWifiLampID(models);
            } else {
                this.layerDec.warnInfo("没有选择任何立杆");
                this.cancel(false);
            }
        }
        if (P) {
            P.then((res: ResponseResult<boolean>) => {
                if (res && res.code === 200) {
                    this.cancel(true);
                } else {
                    console.error("wifiService.updateRmpGateAreaID error", res);
                }
            })
        }

    }
    cancel(flag?: boolean) {
        this.$scope.$emit('device.closePopup', flag);
    }
    private getLeftTreeData() {
        this.wifiService.findAll().then((res: Array<WifiEx>) => {
            this.$timeout(() => {
                this.leftTreeParams.treeDatas = res;
            });
        });
    }
    private searchLeftTree(searchLeftTreeInput: string) {
        this.wifiService.findListByName(this.searchLeftTreeInput).then((res: Array<WifiEx>) => {
            this.$timeout(() => {
                this.leftTreeParams.treeDatas = res;
            });
        });
    }
    private getRightTreeData() {
        let P: any;
        if (this.type === 'lamp') {
            P = this.connectTreeService.findLampTreeWithWifi()
        } else {
            P = this.connectTreeService.findAreaWithWifi()
        }

        P.then((datas: Array<any>) => {
            this.$timeout(() => {
                this.rightTreeParams.treeDatas = datas;
            });
        })
    }
}

app.controller("baseConfigDevicePopupWifi", DevicePopupWifiController);