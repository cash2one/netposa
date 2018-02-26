import { app } from "../../common/app/main.app";
import "css!../css/baseconfig-face.css";
import "../../common/services/area.service";

import { TreeDataParams } from "../../common/directive/tree/tree-params";
import { AreaEx } from "../../../core/entity/ex/AreaEx";
import { IAreaService } from "../../common/services/area.service";
import { TreeParams } from "../../../core/params/tree/TreeParams";
import '../../common/filter/app.filter';

class FaceLibController {
    static $inject = ['$scope', '$location', '$state', '$timeout', 'areaService'];
    //area tree
    areaTreeDatas: TreeDataParams<AreaEx>;
    //search
    areaTreeSearchInputStr: string = "";

    constructor(private $scope: any, private $location: any, private $state: any, private $timeout: any, private areaService: IAreaService) {
        // 树列表数据
        //初始化 area 树数据
        this.areaTreeDatas = new TreeDataParams<AreaEx>();
        this.areaTreeDatas.treeId = 'areaTreeFaceLib';
        this.areaTreeDatas.isDefaultSelected = true;
        this.areaTreeDatas.onClick = treeSelectNode;
        this.areaTreeDatas.treeInitComplete = treeInitComplete;

        let self_this = this;
        // 节点选择
        function treeSelectNode(event: MouseEvent, treeId: string, treeNode: AreaEx) {
            $scope.areaTreeSelectedData = null;
            //init req_params
            $scope.areaTreeSelectedData = treeNode;
            $scope.$broadcast('parentAreaSelectChange', treeNode);
            if ($state.current.name != "baseconfig.facelib.library") {
                $state.go("baseconfig.facelib.library", { reload: true });
            }
        }

        function treeInitComplete() {
            //  console.log("父级 树列表加载完成.....");
        }
        this.getAreaTreeList();
    }
    // 数据获取
    getAreaTreeList(keyword?: string) {
        let params: TreeParams = this.areaTreeDatas.reqParams;
        params.keyword = keyword;
        this.areaService.findListTree(params).then((resp: Array<AreaEx>) => {
            if (resp) {
                this.areaTreeDatas.finishedNoData = false;
            } else {
                this.areaTreeDatas.finishedNoData = true;
            }
            this.$timeout(() => {
                this.setAreaTreeDatas(resp);
            });
        })
    };
    // 树搜索
    areaTreeSearchInputKeyUp(e: any) {
        if (e.keyCode === 13) {
            this.getAreaTreeList(this.areaTreeSearchInputStr);
        }
    };
    // 树搜索
    areaTreeSearchInput() {
        this.getAreaTreeList(this.areaTreeSearchInputStr);
    };
    // 树赋值
    setAreaTreeDatas(treeDatas: Array<AreaEx>) {
        this.areaTreeDatas.treeDatas = treeDatas;
    };
}

app.controller('baseConfigFaceLibController', FaceLibController);