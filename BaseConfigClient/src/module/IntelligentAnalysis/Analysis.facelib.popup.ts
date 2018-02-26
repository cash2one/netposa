/**
 * Created by key on 2017/6/15.
 */
import 'css!./style/cameraPopup.css';
import {app} from "../common/app/main.app";
import {IBusinessLibService} from "../common/services/businessLib.service";
import {AreaEx} from "../../core/entity/ex/AreaEx";
import {BusinessLibEx} from "../../core/entity/ex/BusinessLibEx";
import {TreeDataParams} from "../common/directive/tree/tree-params";
import {ITreeDirectiveService} from "../common/directive/tree/tree.directive.service";
import "../common/services/businessLib.service";
import "../common/directive/tree/tree.directive.service";

declare let angular: any;

type AreaFaceLibEx = AreaEx & BusinessLibEx;

class AnalysisFacelibPopup{
    static $inject = ['$scope','businessLibService','$timeout','treeDirectiveService','layer'];

    treeParams: TreeDataParams<AreaEx>;
    cacheSelFaceLib:Array<BusinessLibEx> = [];
    searchStr:string;
    selNum:number = 0;
    constructor(private $scope: any,
                private businessLibService: IBusinessLibService,
                private $timeout:any,
                private treeService: ITreeDirectiveService,
                private layer: any){

        this.initTreeParams();
        this.initTreeData();

    }
    private initTreeData(){
        this.businessLibService.findTreeWithArea().then((res:any)=>{
            this.treeParams.treeDatas = res.data;
        });
    }
    private initTreeParams(){
        this.treeParams = new TreeDataParams<AreaEx>();
        this.treeParams.treeId = "faceLibTree";
        this.searchStr = "";
        this.treeParams.onCheck = (event: Event, treeId: string, treeNode: any) =>{
            let checkedNodeList = this.treeService.getCheckedNodes(this.treeParams.treeId,true);
            this.cacheSelFaceLib = [];
            this.$timeout(()=>{
                angular.forEach(checkedNodeList,(node:any)=>{
                    node.treeType === 'businessLib' && this.cacheSelFaceLib.push(node);
                });
                this.selNum = this.cacheSelFaceLib.length;
            });
        };
    }
    saveFacelib(){
        let arr = [] as Array<string>;
        let arrMap = [] as Array<{ID:string,value:string}>;
        this.cacheSelFaceLib.forEach((item:BusinessLibEx)=>{
            arr.push(item.ID);
            arrMap.push({ID:item.ID,value:item.Name});
        });
        this.$scope.$emit('close.facelib.popup',arr,arrMap)
    };
    addCache(){
        let paramsList = [] as Array<{key:string,value:string}>;
        angular.forEach(this.$scope.selectCameraList,(id:string,index:number)=>{
            paramsList.push({key:'ID',value:id})
        });
        this.treeService.checkNodesByParamsList(this.treeParams.treeId,paramsList,true);

        let checkedNodeList = this.treeService.getCheckedNodes(this.treeParams.treeId,true);

        this.$timeout(()=>{
            angular.forEach(checkedNodeList,(node:any)=>{
                node.treeType === 'businessLib' && this.cacheSelFaceLib.push(node);
            });
            this.selNum = this.cacheSelFaceLib.length;
        });
    };
    clearAll(){
        this.cacheSelFaceLib = [];
        this.selNum = 0;
        this.treeService.checkAllNodes(this.treeParams.treeId,false)
    };
    cancelFacelibPop(){
        this.cacheSelFaceLib = [];
        this.layer.closeAll();
    };
    removeChecked (node:BusinessLibEx){
        angular.forEach(this.cacheSelFaceLib,(businessLib:any,index:number)=>{
            businessLib.ID === node.ID && this.cacheSelFaceLib.splice(index,1);
        });
        this.selNum > 0 && (this.selNum = this.selNum-1);
    };
    //搜索框改变

    onChangeSearch():boolean{
        if(!this.treeParams.treeDatas){return}
        this.$timeout(()=>{
            this.treeService.filterShowNodes(this.treeParams.treeId,"Name",this.searchStr);
        });
        return true;
    };
}

app.controller("AnalysisFacelibPopup", AnalysisFacelibPopup);