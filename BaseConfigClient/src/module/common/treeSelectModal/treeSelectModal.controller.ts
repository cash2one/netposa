/** create by zxq
 *  选择 部分人可见 person 窗口弹出供选择
 * @time: 2017-06-13 14:01:32
 */
import {app} from "../../common/app/main.app";
import "css!./treeSelectModal.css";
import {TreeDataParams} from "../../common/directive/tree/tree-params";
import {PersonTreeEx} from "../../../core/entity/ex/PersonTreeEx";
import {AreaEx} from "../../../core/entity/ex/AreaEx";
import {PersonEx} from "../../../core/entity/ex/PersonEx";

import "../../common/directive/tree/tree.directive.service";
import {ITreeDirectiveService} from "../../common/directive/tree/tree.directive.service";

import "./treeSelectModal.factory";
import {ITreeSelectModalFactory} from "./treeSelectModal.factory";

declare let angular:any;

export class TreeSelectResult<T>{
    treeSelectedIdList:Array<string>;
    treeSelectedNodeList:Array<T>;
    isCommit:boolean
}

class TreeSelectModalModalController{

    public baseTreeParams:TreeDataParams<any>;

    currentTreeId:string = "personSelectModelTree";

    treeSelectedNodeList:Array<PersonTreeEx> = [] as Array<PersonTreeEx>;

    private treeSelectedIdList:Array<string> =  [] as Array<string>;

    public checkKeyName:string;
    public checkTreeType:string;
    //搜索关键字
    searchTreeNodeStr:string = "";

    personTotal:number = 0;

    static $inject = ['$scope','$timeout','treeSelectModalFactory',"treeDirectiveService"];
    constructor(private $scope:any,private $timeout:any,
                private treeSelectModalFactory:ITreeSelectModalFactory,
                private treeService: ITreeDirectiveService
    ){
        this.checkKeyName = this.treeSelectModalFactory.getTreeKeyName();
        this.checkTreeType = this.treeSelectModalFactory.getTreeCheckType();
        console.log("权限选择列表窗口");
        this.initPersonTreeParams();
        this.initModalData();
    }

    initModalData = ()=>{
        let personTreeDatas = this.treeSelectModalFactory.getTreeBase();
       // this.personTotal = personTreeDatas.personExList.length;
        this.baseTreeParams.treeDatas = personTreeDatas;
    };
    //获取已选 ids 集合
    private getSelectedIdList = ():Array<string>=>{
        return this.treeSelectModalFactory.getTreeSelectedIds()
    };
    //搜索框改变
    onChangeSearch(treeId:string,searchStr:string,paramsName?:string):void{
        console.log(treeId,searchStr,paramsName);
        if(!treeId){
            return;
        }
        if(!paramsName){
            paramsName = "Name";
        }
        this.$timeout(()=>{
            this.treeService.filterShowNodes(treeId,paramsName,searchStr);
        });
    };
    //初始化 摄像机 树相关参数
    private initPersonTreeParams(){
        this.baseTreeParams = new TreeDataParams<PersonTreeEx & AreaEx>(true);
        this.baseTreeParams.treeId = this.currentTreeId;

        this.baseTreeParams.isShowIcon = true;
        this.baseTreeParams.isShowLine = false;

        this.baseTreeParams.checkEnable = true;

        this.baseTreeParams.isSingleSelect = false;
        this.baseTreeParams.isSimpleData = true;

        this.baseTreeParams.treeIdKey = this.treeSelectModalFactory.getTreeKeyName();
        this.baseTreeParams.treePidKey = this.treeSelectModalFactory.getTreeParentKeyName();

        this.baseTreeParams.onCheck = (event: Event, treeId: string, treeNode: any):void=>{
            this.$timeout(()=>{
                this.updateTreeSelectedList(this.currentTreeId);
            });
        };
        this.baseTreeParams.treeInitComplete= (treeId:string):void=>{
            let checkedIdList :Array<string> = this.treeSelectModalFactory.getTreeSelectedIds();
            if(checkedIdList.length > 0){
                this.defaultCheckTreeByIds(this.currentTreeId,checkedIdList);
            }
        }
    };
    /** create by zxq
     * 根据 数据集合 勾选 对应的树节点
     * @time: 2017-06-12 12:02:32
     * @params: treeType 勾选节点 树类型标识
     * @params: treeId 勾选节点 树ID
     * @params: ids 结合
     * @params: paramName 匹配参数名称 默认 "ID"
     * @return:
     */
    private defaultCheckTreeByIds = (treeId:string,ids:Array<string>,paramName?:string):void=>{
        if(!paramName){
            paramName = this.checkKeyName;
        }
        if(ids.length>0){
            let checkParamsList = [] as Array<{key:string,value:string}>;
            angular.forEach(ids,(val:string)=>{
                checkParamsList.push({key:paramName,value:val});
            });
            if(this.treeService.checkNodesByParamsList(treeId,checkParamsList,true)){
                this.updateTreeSelectedList(treeId);
            }
        }
    };
    /** create by zxq
     * 获取已选择的 树节点集合
     * @time: 2017-06-12 12:02:32
     * @params: treeType 勾选节点 树类型标识
     * @params: treeId 勾选节点 树ID
     * @return: Array<CameraEx>&Array<BusinessLibEx> 节点集合 类型与 treeType 相对应
     */
    private getCheckedList(treeId:string,treeType:string):Array<any>{
        let treeCheckedNodes = this.treeService.getCheckedNodes(treeId,true);
        let result:Array<any> = [] as Array<any>;
        if(treeCheckedNodes){
            if(treeType){
                angular.forEach(treeCheckedNodes,(val:PersonTreeEx&AreaEx)=>{
                    if(val.treeType === treeType){
                        result.push(val);
                    }
                });
            }else{
                result = treeCheckedNodes.concat();
            }
        }
        return result;
    }
    //更新 当前选中列表数据
    private updateTreeSelectedList(treeId:string){
        let treeType = this.checkTreeType;
        this.treeSelectedNodeList = this.getCheckedList(treeId,treeType);
    };
    //移除 已选 目的项
    removeSelected(pItem:any){
        if(pItem.tId){
            this.treeService.updateNodeChecked(this.currentTreeId,pItem.tId,false);
            this.updateTreeSelectedList(this.currentTreeId);
        }
    }
    //清空所有已选项
    removeAllSelected(){
        if(this.treeSelectedNodeList && this.treeSelectedNodeList.length>0){
            if(this.treeService.checkAllNodes(this.currentTreeId,false)){
                this.treeSelectedNodeList = [];
            }
        }
    }

    commitCloseModal(){
        if(this.treeSelectedNodeList.length == 0){
            console.log("选中 null ................ ");
          //  return ;
        }
        let resultIdList = [] as Array<string>;
        angular.forEach(this.treeSelectedNodeList,(val:PersonEx)=>{
            resultIdList.push(val.ID);
        });
        console.log("广播回调 关闭，回传 选择结果 供使用。。。");
        console.log(resultIdList);

        let result = new TreeSelectResult();
        result.isCommit = true;
        result.treeSelectedNodeList = this.treeSelectedNodeList;
        result.treeSelectedIdList = resultIdList;

        this.$scope.$emit(this.treeSelectModalFactory.getSelectModalClosedWatchName(),result);
    }

    cancelCommit(){
        let result = new TreeSelectResult();
        result.isCommit = false;
        this.$scope.$emit(this.treeSelectModalFactory.getSelectModalClosedWatchName(),result);
    }
}

app.controller('treeSelectModalController', TreeSelectModalModalController);