import {app} from "../../common/app/main.app";
import {IConnectTreeService} from "../../common/services/connectTree.service";
import "../../common/services/connectTree.service";
import {AreaEx} from "../../../core/entity/ex/AreaEx";
import {TreeDataParams, ITreeDataParams} from "../../common/directive/tree/tree-params";
import "css!./tree.css";
import {CameraEx} from "../../../core/entity/ex/CameraEx";
import {ITreeDirectiveService} from "../../common/directive/tree/tree.directive.service";
import "../../common/directive/tree/tree.directive.service";
declare let layer:any;

class _ITreeDataParams<T> extends TreeDataParams<T>{
    constructor(){
        super();
    }
    diyDomFunc1: (treeId: string, treeNode: T)=>void;
    diyDomFunc2: (treeId: string, treeNode: T)=>void;
}

class TreeController{

    static $inject = ["$scope",'$timeout','connectTreeService','treeDirectiveService'];

    areaTreeDataParams :_ITreeDataParams<AreaEx | CameraEx>;

    constructor(private $scope: any, private $timeout: any, private connectTreeService: IConnectTreeService, private treeDirectiveService: ITreeDirectiveService){
        let vm = this;
        vm.areaTreeDataParams = new _ITreeDataParams<AreaEx | CameraEx>();
        vm.areaTreeDataParams.treeId = 'areaTreeDemo';
        vm.areaTreeDataParams.isDefaultSelected = true;
        vm.areaTreeDataParams.treeInitComplete = this.treeInitComplete;
        vm.areaTreeDataParams.diyDomFunc1 = this.diyDomFunc1;
        vm.areaTreeDataParams.diyDomFunc2 = this.diyDomFunc2;

        this.getTreeList();
    }

    private treeInitComplete = (treeId: string)=>{
        console.log(treeId,"树加载完成");
    };

    private getTreeList = ()=>{
        this.connectTreeService.findLampTreeWithCamera().then((result: Array<AreaEx | CameraEx>)=>{
            this.$timeout(()=>{
                this.areaTreeDataParams.treeDatas = result;
            });
        });
    }

    private diyDomFunc1 = (treeId: string, treeNode: AreaEx | CameraEx)=>{
        console.log("点击了定位按钮", treeId, treeNode);
        layer.msg("点击了定位按钮");
    }

    private diyDomFunc2 = (treeId: string, treeNode: any)=>{
        console.log("点击了关注按钮", treeId, treeNode);
        layer.msg("点击了关注按钮");
        setTimeout(()=>{
            // 模拟已经去后台请求了数据, 关注了此摄像机
            // 更新树结点

            this.treeDirectiveService.changeLocateAndAttentionDiyDom(treeId, "ID", treeNode.ID, !treeNode.isAttention);
        })

    }
}

app.controller("technologyStackTreeController", TreeController);