/**
 * Created by lb on 2017/10/30 0030.
 */
import {app} from "../../common/app/main.app";
import 'css!../style/tree.css';

// 服务
import "../../common/directive/tree/tree.directive.service";
import {ITreeDirectiveService} from "../../common/directive/tree/tree.directive.service";
import "../../common/services/area.service";
import {IAreaService} from "../../common/services/area.service";

import {AreaEx} from "../../../core/entity/ex/AreaEx";
import {BusinessLibEx} from "../../../core/entity/ex/BusinessLibEx";
import {TreeDataParams} from "../../common/directive/tree/tree-params";
import {TreeType} from "../../../core/enum/TreeType";
import * as _ from "lodash";

declare let angular: any;

type AreaFaceLibEx = AreaEx & BusinessLibEx;

class TreeArea{
    static $inject = ['$scope','areaService','$timeout','treeDirectiveService','layer'];

    treeParams: TreeDataParams<AreaEx>;
    cacheSelFaceLib:Array<BusinessLibEx> = [];
    searchStr:string;
    selNum:number = 0;
    selectCtrlCb: string;
    selectCameraList: Array<string> = [];

    constructor(private $scope: any,
                private areaService: IAreaService,
                private $timeout:any,
                private treeService: ITreeDirectiveService,
                private layer: any){
        this.selectCtrlCb = $scope.selectCtrlCb || "close.area.popup";
        this.selectCameraList = $scope.selectCameraList;
        this.initTreeParams();
        this.initTreeData();
    }

    private initTreeData(){
        this.areaService.findListTree().then((datas: Array<AreaEx>) =>{
            this.treeParams.treeDatas = datas;
        })
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
                    this.cacheSelFaceLib.push(node);
                });
                this.selNum = this.cacheSelFaceLib.length;
            });
        };
    }
    saveFacelib(){
        let arr = [] as Array<string>;
        this.cacheSelFaceLib.forEach((item:any)=>{
            arr.push(item.ID)
        });
        this.$scope.$emit(this.selectCtrlCb, arr, true)
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
        this.$scope.$emit(this.selectCtrlCb, [], true)
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

app.controller("treeAreaPupup", TreeArea);