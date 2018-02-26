import {app} from "../../common/app/main.app";
import 'css!../style/tree.css';

// 服务
import {ITreeDirectiveService} from "../../common/directive/tree/tree.directive.service";
import "../../common/directive/tree/tree.directive.service";
import {IConnectTreeService} from "../../common/services/connectTree.service";
import "../../common/services/connectTree.service";

// 参数
import {AreaEx} from "../../../core/entity/ex/AreaEx";
import {ElectronicFenceEx} from "../../../core/entity/ex/ElectronicFenceEx";
import {TreeDataParams} from "../../common/directive/tree/tree-params";
import {TreeType} from "../../../core/enum/TreeType";
import * as _ from "lodash";

declare let angular: any;

type AreaElectronicFenceEx = AreaEx & ElectronicFenceEx;

class TreeEfencePopupController {
    static $inject = ['$scope', 'connectTreeService', '$timeout', 'treeDirectiveService', 'layer'];

    treeParams: TreeDataParams<AreaEx>;
    cacheSelCam: Array<ElectronicFenceEx> = [];
    electronicFenceTreeParams: TreeDataParams<AreaElectronicFenceEx>;
    searchStr: string;
    selNum: number = 0;
    selectCtrlCb: string;
    selectEfenceList: Array<string> = [];

    constructor(private $scope: any,
                private connectTreeService: IConnectTreeService,
                private $timeout: any,
                private treeService: ITreeDirectiveService,
                private layer: any) {
        this.selectCtrlCb = $scope.selectCtrlCb || "close.efence.popup";
        this.selectEfenceList = $scope.selectCameraList;
        this.initTreeParams();

    }

    private initTreeData() {
        this.connectTreeService.findAreaWithElectronicfence().then((datas: Array<AreaElectronicFenceEx>) => {
            this.treeParams.treeDatas = datas;
        });
    }

    private initTreeParams() {
        this.treeParams = new TreeDataParams<AreaEx>();
        this.treeParams.treeId = "ElectronicFenceTree";
        this.searchStr = "";
        this.treeParams.onCheck = (event: Event, treeId: string, treeNode: any) => {
            let checkedNodeList = this.treeService.getCheckedNodes(this.treeParams.treeId, true);
            this.checkedUpdate(checkedNodeList);
        };
        this.initTreeData();
    }

    saveElectronicFence() {
        let arr = [] as Array<string>;
        this.cacheSelCam.forEach((item: ElectronicFenceEx) => {
            arr.push(item.ID)
        });
        this.$scope.$emit(this.selectCtrlCb, arr, true, null, "tree");
    }

    addCache() {
        let self = this;
        let paramsList = [] as Array<{ key: string, value: string }>;
        angular.forEach(this.$scope.selectElectronicFenceList, (id: string, index: number) => {
            paramsList.push({key: 'ID', value: id})
        });
        this.treeService.checkNodesByParamsList(this.treeParams.treeId, paramsList, true);
        let checkedNodeList = this.treeService.getCheckedNodes(this.treeParams.treeId, true);
        let cacheSelCam: Array<ElectronicFenceEx> = [];
        self.$timeout(() => {
            angular.forEach(checkedNodeList, (node: any) => {
                node.treeType === TreeType.ElectronicFence.value && cacheSelCam.push(node);
            });
            self.cacheSelCam = cacheSelCam;
            self.selNum = cacheSelCam.length;
        });
    };

    clearAll() {
        this.cacheSelCam = [];
        this.selNum = 0;
        this.treeService.checkAllNodes(this.treeParams.treeId, false)
    };

    cancelCamPop() {
        this.cacheSelCam = [];
        this.$scope.$emit(this.selectCtrlCb, [], false);
    };

    removeChecked(node: ElectronicFenceEx) {
        let selectEfenceList = _.pull(this.selectEfenceList, node.ID);
        this.selectEfenceList = selectEfenceList;
        angular.forEach(this.cacheSelCam, (camera: any, index: number) => {
            camera.ID === node.ID && this.cacheSelCam.splice(index, 1);
        });
        this.selNum > 0 && (this.selNum = this.selNum - 1);
        this.treeService.updateNodeChecked(this.treeParams.treeId, node.tId, false);
        // angular.forEach(this.cacheSelCam, (ElectronicFence: any, index: number) => {
        //     ElectronicFence.ID === node.ID && this.cacheSelCam.splice(index, 1);
        // });
        // this.selNum > 0 && (this.selNum = this.selNum - 1);
    };

    //搜索框改变

    onChangeSearch(): boolean {
        if (!this.treeParams.treeDatas) {
            return
        }
        this.$timeout(() => {
            this.treeService.filterShowNodes(this.treeParams.treeId, "Name", this.searchStr);
        });
        return true;
    };

    checkedUpdate(checkedNodeList) {
        let self = this;
        let cacheSelCam: Array<ElectronicFenceEx> = [];
        self.$timeout(() => {
            angular.forEach(checkedNodeList, (node: any) => {
                node.treeType === TreeType.ElectronicFence.value && cacheSelCam.push(node);
            });
            self.cacheSelCam = cacheSelCam;
            self.selNum = cacheSelCam.length;
        });
    }
}

app.controller("treeEfencePopupController", TreeEfencePopupController);