import {app} from "../../common/app/main.app";
import 'css!../style/tree.css';

// 服务
import "../../common/directive/tree/tree.directive.service";
import {ITreeDirectiveService} from "../../common/directive/tree/tree.directive.service";
import "../../common/services/connectTree.service";
import {IConnectTreeService} from "../../common/services/connectTree.service";

// 参数
import {AreaEx} from "../../../core/entity/ex/AreaEx";
import {RmpGateEx} from "../../../core/entity/ex/RmpGateEx";
import {TreeDataParams} from "../../common/directive/tree/tree-params";
import {TreeType} from "../../../core/enum/TreeType";

import * as _ from "lodash";

declare let angular: any;

type AreaRmpGateEx = AreaEx & RmpGateEx;

class TreeBayonetPopupController {
    static $inject = ['$scope', 'connectTreeService', '$timeout', 'treeDirectiveService', 'layer'];

    treeParams: TreeDataParams<AreaEx>;
    cacheSelCam: Array<RmpGateEx> = [];
    cameraTreeParams: TreeDataParams<AreaRmpGateEx>;
    searchStr: string;
    selNum: number = 0;
    selectCtrlCb: string;
    selectBayonetList: Array<string> = [];

    constructor(private $scope: any,
                private connectTreeService: IConnectTreeService,
                private $timeout: any,
                private treeService: ITreeDirectiveService,
                private layer: any) {
        this.selectCtrlCb = $scope.selectCtrlCb || "close.bayonet.popup";
        this.selectBayonetList = $scope.selectBayonetList;
        this.initTreeParams();
    }

    private initTreeData() {
        this.connectTreeService.findAreaWithRmpgate().then((datas: Array<AreaRmpGateEx>) => {
            this.treeParams.treeDatas = datas;
        });
    }

    private initTreeParams() {
        this.treeParams = new TreeDataParams<AreaEx>();
        this.treeParams.treeId = "bayonetTree";
        this.searchStr = "";
        this.treeParams.onCheck = (event: Event, treeId: string, treeNode: any) => {
            let checkedNodeList = this.treeService.getCheckedNodes(this.treeParams.treeId, true);
            this.checkedUpdate(checkedNodeList);
        };
        this.initTreeData();
    }

    saveCamera() {
        let arr = [] as Array<string>;
        this.cacheSelCam.forEach((item: RmpGateEx) => {
            arr.push(item.ID)
        });
        this.$scope.$emit(this.selectCtrlCb, arr, true, null, "tree")
    };

    addCache() {
        let self = this;
        let paramsList = [] as Array<{ key: string, value: string }>;
        angular.forEach(self.selectBayonetList, (id: string, index: number) => {
            paramsList.push({key: 'ID', value: id})
        });
        self.treeService.checkNodesByParamsList(self.treeParams.treeId, paramsList, true);
        let checkedNodeList = self.treeService.getCheckedNodes(self.treeParams.treeId, true);
        let cacheSelCam: Array<RmpGateEx> = [];
        self.$timeout(() => {
            angular.forEach(checkedNodeList, (node: any) => {
                node.treeType === TreeType.rmpGate.value && cacheSelCam.push(node);
            });
            self.cacheSelCam = cacheSelCam;
            self.selNum = cacheSelCam.length;
        });
    };

    clearAll() {
        this.selectBayonetList = [];
        this.cacheSelCam = [];
        this.selNum = 0;
        this.treeService.checkAllNodes(this.treeParams.treeId, false)
    };

    cancelCamPop() {
        this.cacheSelCam = [];
        this.$scope.$emit(this.selectCtrlCb, [], false);
    };

    removeChecked(node: RmpGateEx) {
        let selectBayonetList = _.pull(this.selectBayonetList, node.ID);
        this.selectBayonetList = selectBayonetList;
        angular.forEach(this.cacheSelCam, (camera: any, index: number) => {
            camera.ID === node.ID && this.cacheSelCam.splice(index, 1);
        });
        this.selNum > 0 && (this.selNum = this.selNum - 1);
        this.treeService.updateNodeChecked(this.treeParams.treeId, node.tId, false);
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
        let cacheSelCam: Array<RmpGateEx> = [];
        self.$timeout(() => {
            angular.forEach(checkedNodeList, (node: any) => {
                node.treeType === TreeType.rmpGate.value && cacheSelCam.push(node);
            });
            self.cacheSelCam = cacheSelCam;
            self.selNum = cacheSelCam.length;
        });
    }

}

app.controller("treeBayonetPopupController", TreeBayonetPopupController);