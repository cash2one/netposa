/**
 * Created by key on 2017/6/15.
 */
import 'css!./style/cameraPopup.css';
import {app} from "../common/app/main.app";

import {AreaEx} from "../../core/entity/ex/AreaEx";
import {CameraEx} from "../../core/entity/ex/CameraEx";
import {TreeDataParams} from "../common/directive/tree/tree-params";
import {ITreeDirectiveService} from "../common/directive/tree/tree.directive.service";
import "../common/directive/tree/tree.directive.service";

import {IConnectTreeService} from "../common/services/connectTree.service";
import "../common/services/connectTree.service";

declare let angular: any;

type AreaCameraEx = AreaEx & CameraEx;

class AnalysisCameraPopup {
    static $inject = ['$scope', 'connectTreeService', '$timeout', 'treeDirectiveService', 'layer'];
    treeParams: TreeDataParams<AreaEx>;
    cacheSelCam: Array<CameraEx> = [];
    cameraTreeParams: TreeDataParams<AreaCameraEx>;
    searchStr: string;
    selNum: number = 0;

    constructor(private $scope: any,
                private connectTreeService: IConnectTreeService,
                private $timeout: any,
                private treeService: ITreeDirectiveService,
                private layer: any) {
        this.$scope.$on('$destory', () => {
            this.$scope.$emit('close.camera.popup', [], false)
        });
        this.initTreeParams();

    }

    private initTreeData() {
        this.connectTreeService.findAreaCamera().then((datas: Array<AreaCameraEx>) => {
            this.treeParams.treeDatas = datas;
        });
    }

    private initTreeParams() {
        this.treeParams = new TreeDataParams<AreaEx>();
        this.treeParams.treeId = "cameraTree";
        this.searchStr = "";
        this.treeParams.onCheck = (event: Event, treeId: string, treeNode: any) => {
            let checkedNodeList = this.treeService.getCheckedNodes(this.treeParams.treeId, true);
            this.cacheSelCam = [];
            this.$timeout(() => {
                angular.forEach(checkedNodeList, (node: any) => {
                    node.treeType === 'camera' && this.cacheSelCam.push(node);
                });
                this.selNum = this.cacheSelCam.length;
            });
        };
        this.initTreeData();
    }

    saveCamera() {
        let arr = [] as Array<string>;
        this.cacheSelCam.forEach((item: CameraEx) => {
            arr.push(item.ID)
        });
        this.$scope.$emit('close.camera.popup', arr, true)
    };

    addCache() {
        let paramsList = [] as Array<{ key: string, value: string }>;
        angular.forEach(this.$scope.selectCameraList, (id: string, index: number) => {
            paramsList.push({key: 'ID', value: id})
        });
        this.treeService.checkNodesByParamsList(this.treeParams.treeId, paramsList, true);

        let checkedNodeList = this.treeService.getCheckedNodes(this.treeParams.treeId, true);

        this.$timeout(() => {
            angular.forEach(checkedNodeList, (node: any) => {
                node.treeType === 'camera' && this.cacheSelCam.push(node);
            });
            this.selNum = this.cacheSelCam.length;
        });
    };

    clearAll() {
        this.cacheSelCam = [];
        this.selNum = 0;
        this.treeService.checkAllNodes(this.treeParams.treeId, false)
    };

    cancelCamPop() {
        this.cacheSelCam = [];
        this.$scope.$emit('close.camera.popup', [], false)
    };

    removeChecked(node: CameraEx) {
        angular.forEach(this.cacheSelCam, (camera: any, index: number) => {
            camera.ID === node.ID && this.cacheSelCam.splice(index, 1);
        });
        this.selNum > 0 && (this.selNum = this.selNum - 1);
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
}

app.controller("AnalysisCameraPopup", AnalysisCameraPopup);