/// <amd-dependency path="text!./ivsServer.updateModal.html" name="ivsServerUpdateModalHtml" />
import {UpdateModalParams} from "../main/serverUpdateModal.params";
declare var require:any;
import PageParams from "../../../common/directive/page/page-params";

import {app} from "../../../common/app/main.app";
import 'angular';
import '../../../common/services/ivsServer.service';
import '../../../common/services/area.service';

import './ivsServer.updateModal.controller';
import "../main/serverType.filter"

import {IAreaService} from "../../../common/services/area.service";
import {ITableHeader} from "../../../common/directive/unit-table/table-params";
import {IIvsServerService} from "../../../common/services/ivsServer.service";
import {ITreeDataParams, TreeDataParams} from "../../../common/directive/tree/tree-params";
import {IvsServer} from "../../../../core/entity/IvsServer";
import {AreaEx} from "../../../../core/entity/ex/AreaEx";
import {IvsServerListParams} from "../../../../core/params/IvsServerParams";
import {TreeParams} from "../../../../core/params/tree/TreeParams";
import {ResponseResult, PageResult} from "../../../../core/params/result/ResponseResult";
import {IvsServerEx} from "../../../../core/entity/ex/IvsServerEx";
import {ICasCadeService, CasCadeSearchParams} from "../../../common/services/casecade.service";

declare var ivsServerUpdateModalHtml: any;
declare var angular: any;

class BaseConfigIvsServerController{
    tHeadList:Array<ITableHeader>;
    tBodyList:Array<IvsServer>;
    currentLayer?:number;

    //--------分页指令
    pageParams :PageParams;
    //---------
    // 选择行政区域树
    areaTreeDatas:ITreeDataParams<AreaEx>;
    areaTreeSearchInputStr:string = "";

    // 列表获取参数
    findListParams:IvsServerListParams;
    //多选相关
    selectedList:Array<boolean>;
    isSelectAll:boolean;
    static $inject = ['$scope','$filter','$timeout','$controller','ivsServerService','layer','areaService','casCadeService'];
    constructor(private $scope:any,private $filter:any,private $timeout:Function,private $controller:any,
                private ivsServerService:IIvsServerService, private layer:any,private areaService:IAreaService, private casCadeService: ICasCadeService){

        // 树列表数据
        //初始化 area 树数据
        this.areaTreeDatas = new TreeDataParams<AreaEx>();
        this.areaTreeDatas.treeId = 'areaTreeIvs';
        this.areaTreeDatas.isDefaultSelected = true;
        this.areaTreeDatas.onClick = treeSelectNode;
        this.areaTreeDatas.treeInitComplete = treeInitComplete;
        this.initListParams();
        // 节点选择
        function treeSelectNode(event: MouseEvent, treeId:string, treeNode:AreaEx){
            console.log("%c ==========start==============",'color:orange');
            console.log(treeId, treeNode);
            console.log("=========end===============",);

            if(treeNode.ID == self_this.findListParams.areaId){
                if(self_this.tBodyList){
                    return;
                }
            }
            //init req_params
            let req_params:IvsServerListParams = self_this.findListParams;
            req_params.areaId = treeNode.ID;
            req_params.currentPage = 1;
            self_this.getListByParams(req_params);
        }

        function treeInitComplete(){
            // console.log(this.treeDatas);
        }
        this.getAreaTreeList();

        let self_this = this;
        this.$scope.$on('closeServerUpdateModel', function (even:any,data:{isCommit:boolean}) {
            if(data.isCommit){
                self_this.getListByParams(self_this.findListParams);
            }
            self_this.closeLayer(self_this.getCurrentLayer());
        });

        $scope.$on("$destroy", function(){
            if(self_this.layer){
                self_this.layer.closeAll();
            }
        });
    };

    //----------- 树列 操作函数
    // 数据获取
    getAreaTreeList(keyword?:string){
        let params:TreeParams = this.areaTreeDatas.reqParams;
        params.keyword = keyword;
        this.areaService.findListTree(params).then((resp:Array<AreaEx>)=>{
            if(resp){
                this.areaTreeDatas.finishedNoData = false;
            }else{
                this.areaTreeDatas.finishedNoData = true;
            }
            this.$timeout(()=>{
                this.setAreaTreeDatas(resp);
            });
        })
    };
    // 树搜索
    areaTreeSearchInputKeyUp(e:any){
        if(e.keyCode === 13){
            this.getAreaTreeList(this.areaTreeSearchInputStr);
        }
    };
    // 树搜索
    areaTreeSearchInput(){
        this.getAreaTreeList(this.areaTreeSearchInputStr);
    };
    // 树赋值
    setAreaTreeDatas(treeDatas: Array<AreaEx>){
        this.areaTreeDatas.treeDatas = treeDatas;
    };
    //----------------
    // 初始化列表数据
    initListParams(){
        this.pageParams = new PageParams();
        this.findListParams = new IvsServerListParams();
        this.findListParams.areaId = '';
        this.findListParams.currentPage = this.pageParams.currentPage;
        this.findListParams.pageSize = this.pageParams.pageSize;
        this.tBodyList = [];
        this.tHeadList =  [
            { field: "Name", title: "名称"},
            { field: "IpAddress", title: "IP地址"},
            { field: "Port", title: "端口"},
            { field: "ServerType", title: "服务器类型"},
            { field: "Description", title: "描述"},
            { field: "buttons", title: "操作"},
        ];
        this.findListParams.sortName = 'ServerType';
    };

    _getCasCadeSearchParams(tableParams: IvsServerListParams){
        if(!tableParams) return {} as CasCadeSearchParams;

        let result = new CasCadeSearchParams();
        result.pageIndex = tableParams.currentPage;
        result.orderField = tableParams.sortName;
        result.pageSize = tableParams.pageSize;
        result.areaId = tableParams.areaId;
        result.isAsc = tableParams.isAsc;
        // result.name = tableParams.areaName;
        return result;
    };

    // 根据finListParams:IFindIvsServerListParams 获取列表
    getListByParams(params:IvsServerListParams){

        this.casCadeService.findIvsServerList(this._getCasCadeSearchParams(params))
            .then((resp:ResponseResult<Array<IvsServer>>)=>{
            if(resp.code == 200){
                let pageParams = new PageParams();
                pageParams.setCurrentPage(params.currentPage);
                pageParams.setPageSize(params.pageSize);
                pageParams.setTotalCount(resp.count);
                this.pageParams = pageParams;
                this.findListParams = params;
                this.setTBodyList(resp.data);
            }
        });
    }

    //单删除
    deleteById(_index:IvsServer){

        this.layer.confirm("确定删除该条代理代理配置吗?", {
            icon: 0,
            title: '警告',
            area:["500px","200px"]
        },(index: number)=>{
            this.layer.close(index);

            this.submitDelete(_index.ID,index);
        })
    }

    submitDelete(id:string,layerNum:number){
        this.ivsServerService.deleteById(id).then((resp:ResponseResult<any>)=>{
            if(resp.code == 200){
                this.getListByParams(this.findListParams);
                this.layer.close(layerNum);
            }else{

            }
        });
    }
    /**
     * 选择某一条数据
     * @time: 2017-04-21 19:43:07
     * @params:
     * @return:
     */
    afterChangeCheck(resultList:Array<boolean>,isCheckAll:boolean):void{
        console.log(resultList);
        this.selectedList = resultList;
        this.isSelectAll = isCheckAll;
    };

    //获取当前已被选中列表
    getSelectedList():Array<IvsServer>{
        let selectedDataList:Array<IvsServer> = [];
        if(this.selectedList){
            this.tBodyList.forEach((ivsServer:IvsServer,index:number)=>{
                if(this.selectedList[index]){
                    selectedDataList.push(ivsServer);
                }
            });
        }
        return selectedDataList;
    };

    //多个删除
    deleteByIds(){
        let selectedDataList:Array<IvsServer> = this.getSelectedList();
        if(! selectedDataList || selectedDataList.length ==0){
            console.error("============","当前未选择数据");
            return;
        }
        let ids:Array<string> = [];

        selectedDataList.forEach((server:IvsServer)=>{
            ids.push(server.ID);
        });
        let showText = '确定删除当前选中的 ' + ids.length + ' 条IvsServer配置吗?';
        this.layer.confirm(showText, {
            icon: 0,
            title: '警告',
            area:["500px","200px"]
        },(index: number)=>{
            this.layer.close(index);
            this.submitDeleteByIds(ids);
        });

    }

    submitDeleteByIds(ids:Array<string>){
        this.ivsServerService.deleteByIds(ids).then((resp:ResponseResult<string>)=>{
            if(resp.code == 200){
                this.findListParams.currentPage =1;
                this.getListByParams(this.findListParams);
            }else{

            }
        });
    };


    addIvsServer(){
        let scope:any = this.$scope.$new();
        let updateModalParams:UpdateModalParams<IvsServer> = new UpdateModalParams<IvsServer>();
        updateModalParams.defaultDatas.areaId = this.findListParams.areaId;
        updateModalParams.isUpdate = false;
        scope.updateModalParams = updateModalParams;
        let titleStr = '新建服务器';
        this.layer.open({
            type: 1,
            title:[titleStr,'text-align: center;'],
            content: ivsServerUpdateModalHtml,
            scope: scope,
            area:["500px"],
        }).then((index:number)=>{
            this.setCurrentLayer(index);
        });
    }

    findById(id:string){

        return this.ivsServerService.findById(id);
    }

    updateIvsServer(model?:IvsServer):void{
        console.log(model);
        this.findById(model.ID).then((resp:ResponseResult<IvsServerEx>)=>{
            if(resp.code == 200){
                this.openUpdate(true,resp.data);
            }else{

            }
        });

    };

    openUpdate(isUpdate:boolean,data?:IvsServerEx){
        let scope:any = this.$scope.$new();

        let updateModalParams:UpdateModalParams<IvsServer> = new UpdateModalParams<IvsServer>();
        updateModalParams.defaultDatas.areaId = this.findListParams.areaId;
        updateModalParams.isUpdate = true;
        updateModalParams.updateModel = data;
        scope.updateModalParams = updateModalParams;
        let titleStr = isUpdate?'编辑服务器':'新建服务器';
            this.layer.open({
                type: 1,
                title:[titleStr,'text-align: center;'],
                content: ivsServerUpdateModalHtml,
                scope: scope,
                area:["500px"],
                end: function(){
                    scope.$destroy();
                }
            }).then((index:number)=>{
                this.setCurrentLayer(index);
            });
    };

    closeLayer(index:number):any{
        return this.layer.close(index);
    }

    setCurrentLayer(index:number):void{
        this.currentLayer = index;
    }

    getCurrentLayer():number{
        return this.currentLayer;
    }

    setTBodyList(result:Array<IvsServer>) {
        this.tBodyList = this.$filter('ivsServerTypeFilter')(result,'ServerType');
    };

    // 单栏选择排序
    sortByField(_index:number,field:string,sortStatus:boolean){

        this.findListParams.isAsc = sortStatus;
        this.findListParams.sortName = field;

        this.getListByParams(this.findListParams);
    }

    //about page click
    changePage(num:number){
        this.findListParams.currentPage = num;
        this.getListByParams(this.findListParams);
    }
    changePageSize(num:number){
        this.findListParams.currentPage = 1;
        this.findListParams.pageSize = num;
        this.getListByParams(this.findListParams);
    }
}
app
    .controller('baseConfigIvsServerController', BaseConfigIvsServerController);