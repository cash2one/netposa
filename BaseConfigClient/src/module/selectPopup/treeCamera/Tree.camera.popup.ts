import {app} from "../../common/app/main.app";
import 'css!../style/tree.css';

// 服务
import {ITreeDirectiveService} from "../../common/directive/tree/tree.directive.service";
import "../../common/directive/tree/tree.directive.service";
import {IConnectTreeService} from "../../common/services/connectTree.service";
import "../../common/services/connectTree.service";

// 参数
import {AreaEx} from "../../../core/entity/ex/AreaEx";
import {CameraEx} from "../../../core/entity/ex/CameraEx";
import {TreeDataParams} from "../../common/directive/tree/tree-params";
import {TreeType} from "../../../core/enum/TreeType";
import * as _ from "lodash";

declare let angular: any;

type AreaCameraEx = AreaEx & CameraEx;

class TreeCameraPopupController {
    static $inject = ['$scope', 'connectTreeService', '$timeout', 'treeDirectiveService', 'layer'];

    treeParams: TreeDataParams<AreaEx>;
    cacheSelCam: Array<CameraEx> = [];
    cameraTreeParams: TreeDataParams<AreaCameraEx>;
    searchStr: string;
    selNum: number = 0;
    selectCtrlCb: string;
    selectCameraList: Array<string> = [];

    constructor(private $scope: any,
                private connectTreeService: IConnectTreeService,
                private $timeout: any,
                private treeService: ITreeDirectiveService,
                private layer: any) {
        this.selectCtrlCb = $scope.selectCtrlCb || "close.camera.popup";
        this.selectCameraList = $scope.selectCameraList;
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
            this.checkedUpdate(checkedNodeList);
            // this.cacheSelCam = [];
            // this.$timeout(() => {
            //     angular.forEach(checkedNodeList, (node: any) => {
            //         node.treeType === 'camera' && this.cacheSelCam.push(node);
            //     });
            //     this.selNum = this.cacheSelCam.length;
            // });
        };
        this.initTreeData();
    }

    saveCamera() {
        let arr = [] as Array<string>;
        this.cacheSelCam.forEach((item: CameraEx) => {
            arr.push(item.ID)
        });
        this.$scope.$emit(this.selectCtrlCb, arr, true, null, "tree")
    };

    addCache() {
        let self = this;
        let paramsList = [] as Array<{ key: string, value: string }>;
        angular.forEach(self.selectCameraList, (id: string, index: number) => {
            paramsList.push({key: 'ID', value: id})
        });
        self.treeService.checkNodesByParamsList(self.treeParams.treeId, paramsList, true);
        let checkedNodeList = self.treeService.getCheckedNodes(self.treeParams.treeId, true);
        let cacheSelCam: Array<CameraEx> = [];
        self.$timeout(() => {
            angular.forEach(checkedNodeList, (node: any) => {
                node.treeType === TreeType.camera.value && cacheSelCam.push(node);
            });
            self.cacheSelCam = cacheSelCam;
            self.selNum = cacheSelCam.length;
        });
    };

    clearAll() {
        this.selectCameraList = [];
        this.cacheSelCam = [];
        this.selNum = 0;
        this.treeService.checkAllNodes(this.treeParams.treeId, false)
    };

    cancelCamPop() {
        this.cacheSelCam = [];
        this.$scope.$emit(this.selectCtrlCb, [], false);
    };

    removeChecked(node: CameraEx) {
        let selectCameraList = _.pull(this.selectCameraList, node.ID);
        this.selectCameraList = selectCameraList;
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

    checkedUpdate(checkedNodeList:any) {
        let self = this;
        let cacheSelCam: Array<CameraEx> = [];
        self.$timeout(() => {
            angular.forEach(checkedNodeList, (node: any) => {
                node.treeType === TreeType.camera.value && cacheSelCam.push(node);
            });
            self.cacheSelCam = cacheSelCam;
            self.selNum = cacheSelCam.length;
        });
    }

}

app.controller("treeCameraPopupController", TreeCameraPopupController);