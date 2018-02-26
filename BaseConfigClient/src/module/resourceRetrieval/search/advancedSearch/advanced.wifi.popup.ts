/**
 * Created by key on 2017/6/15.
 */
import 'css!../../../IntelligentAnalysis/style/cameraPopup.css';
import {app} from "../../../common/app/main.app";
import {AreaEx} from "../../../../core/entity/ex/AreaEx";
import {WifiEx} from "../../../../core/entity/ex/WifiEx";
import {TreeDataParams} from "../../../common/directive/tree/tree-params";


// 服务
import "../../../common/services/connectTree.service";
import {IConnectTreeService} from "../../../common/services/connectTree.service";
import "../../../common/directive/tree/tree.directive.service";
import {ITreeDirectiveService} from "../../../common/directive/tree/tree.directive.service";

declare let angular: any;

type AreaWifiEx = AreaEx & WifiEx;

class AdvancedWifiPopup{
    static $inject = ['$scope','connectTreeService','$timeout','treeDirectiveService','layer'];

    treeParams: TreeDataParams<AreaEx>;
    cacheSelCam:Array<WifiEx> = [];
    wifiTreeParams:TreeDataParams<AreaWifiEx>;
    searchStr:string;
    selNum:number = 0;
    constructor(private $scope: any,
                private connectTreeService: IConnectTreeService,
                private $timeout:any,
                private treeService: ITreeDirectiveService,
                private layer: any){

        this.initTreeParams();
        this.initTreeData();

    }
    private initTreeData(){
        this.connectTreeService.findAreaWithWifi().then((datas:Array<AreaWifiEx>)=>{
            this.treeParams.treeDatas = datas;
        });
    }
    private initTreeParams(){
        this.treeParams = new TreeDataParams<AreaEx>();
        this.treeParams.treeId = "wifiTree";
        this.searchStr = "";
        this.treeParams.onCheck = (event: Event, treeId: string, treeNode: any) =>{
            let checkedNodeList = this.treeService.getCheckedNodes(this.treeParams.treeId,true);
            this.cacheSelCam = [];
            this.$timeout(()=>{
                angular.forEach(checkedNodeList,(node:any)=>{
                    node.treeType === 'wifi' && this.cacheSelCam.push(node);
                });
                this.selNum = this.cacheSelCam.length;
            });
        };
    }
    saveWifi(){
        let arr = [] as Array<string>;
        this.cacheSelCam.forEach((item:WifiEx)=>{
            arr.push(item.ID)
        });
        this.$scope.$emit('close.wifi.popup',arr)
    };
    addCache(){
        let paramsList = [] as Array<{key:string,value:string}>;
        angular.forEach(this.$scope.selectWifiList,(id:string,index:number)=>{
            paramsList.push({key:'ID',value:id})
        });
        this.treeService.checkNodesByParamsList(this.treeParams.treeId,paramsList,true);

        let checkedNodeList = this.treeService.getCheckedNodes(this.treeParams.treeId,true);

        this.$timeout(()=>{
            angular.forEach(checkedNodeList,(node:any)=>{
                node.treeType === 'wifi' && this.cacheSelCam.push(node);
            });
            this.selNum = this.cacheSelCam.length;
        });
    };
    clearAll(){
        this.cacheSelCam = [];
        this.selNum = 0;
        this.treeService.checkAllNodes(this.treeParams.treeId,false)
    };
    cancelCamPop(){
        this.cacheSelCam = [];
        this.layer.closeAll();
    };
    removeChecked (node:WifiEx){
        angular.forEach(this.cacheSelCam,(wifi:any,index:number)=>{
            wifi.ID === node.ID && this.cacheSelCam.splice(index,1);
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

app.controller("AdvancedWifiPopup", AdvancedWifiPopup);