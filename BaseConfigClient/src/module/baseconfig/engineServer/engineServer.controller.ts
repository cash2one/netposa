/// <amd-dependency path="text!./engineServer.updateServer.html" name="engineServerUpdateServerHtml" />
/// <amd-dependency path="text!./engineNode.updateNode.html" name="engineNodeUpdateNodeHtml" />
import { app } from "../../common/app/main.app";
import 'angular';

import "css!../css/baseconfig-engine.css";
import "css!../css/baseconfig-area.css";
import "css!../style/baseconfig-area.css";
import "css!../css/baseconfig-serve.css";
import "css!../style/baseconfig-area.css";
import "../../common/services/engineServerServer.service"
import "../../common/services/engineNodeServer.service"
import "./engineServer.updateServer.controller"
import "./engineNode.updateNode.controller"
import { IEngineServerServer } from '../../common/services/engineServerServer.service';
import { IEngineNodeServer } from '../../common/services/engineNodeServer.service';
import { ResponseResult, PageResult } from "../../../core/params/result/ResponseResult";
import { EngineServer } from "../../../core/entity/EngineServer";
import { EngineNode } from "../../../core/entity/EngineNode";
import { EngineNodeParams } from "../../../core/params/EngineNodeParams";
import PageParams from "../../common/directive/page/page-params";
import { ITableHeader } from "../../common/directive/unit-table/table-params";
declare let engineServerUpdateServerHtml: any;
declare let engineNodeUpdateNodeHtml: any;
class BaseConfigEngineServerController {
    // 引擎服务列表
    engineServerList: Array<EngineServer> = new Array<EngineServer>();
    engineServerNoData: Boolean = false;
    //过滤条件
    findListParams: EngineNodeParams;
    // 引擎节点列表
    engineNodeList: Array<EngineNode>;
    // table 列表数据
    tHeadList: Array<ITableHeader>;
    nodeHeadList:Array<ITableHeader>;
    //--------分页指令
    pageParams: PageParams;
    //当前选择的engine服务  初始化页面时，默认点击第一个
    currentServer:EngineServer;
    //---------
    //多选相关
    selectedList:Array<boolean>;
    isSelectAll:boolean;
    // alter wyr: 用于判断当前界面上的列表是否被选中
    isSelectItems: boolean;
    
    //弹出层的id
    currentLayer?:number;
    static $inject = ['$scope', '$timeout', '$controller', 'engineServerServer', 'layer', '$filter', 'i18nFactory', 'engineNodeServer'];
    constructor(
        private $scope: any,
        private $timeout: Function,
        private $controller: any,
        private engineServerServer: IEngineServerServer,
        private layer: any,
        private $filter: any,
        private i18nFactory: any,
        private engineNodeServer: IEngineNodeServer) {
            
            //-------------表格数据初始化
            this.tHeadList = [
                { field: "Name", title: "DP_CONFIG_ENGINESERVER_14" },
                { field: "IpAddress", title: "DP_CONFIG_ENGINESERVER_15" },
                { field: "Port", title: "DP_CONFIG_ENGINESERVER_16" },
                { field: "Description", title: "DP_CONFIG_ENGINESERVER_17" },
                { field: "buttons", title: "DP_CONFIG_ENGINESERVER_18" }
            ];
            this.nodeHeadList = [
                { field: "IpAddress", title: "DP_CONFIG_ENGINESERVER_03" }
            ];
            this.isSelectItems = false;
        this.pageParams = new PageParams();
        this.findListParams = new EngineNodeParams();
        this.findListParams.currentPage = this.pageParams.currentPage;
        this.findListParams.pageSize = this.pageParams.pageSize;

        this.initEngineServerListParams();

        let self_this = this;
        
        this.$scope.$on('closeEngineNodeUpdateModel', function (even:any,data:{isCommit:boolean}) {
            
            if(data.isCommit){
                self_this.initEngineNodeListParams(self_this.findListParams);
            }
            self_this.closeLayer(self_this.getCurrentLayer());
        });
        this.$scope.$on('closeEngineServerUpdateModel', function (even:any,data:{isCommit:boolean}) {
            
            if(data.isCommit){

                self_this.initEngineServerListParams()
            }
            self_this.closeLayer(self_this.getCurrentLayer());
        });
        $scope.$on("$destroy", function(){
            if(self_this.layer){
                self_this.layer.closeAll();
            }

        });
        
    };
    addOrUpdateEngineServer(isUpdate:boolean): void {
        let scope:any = this.$scope.$new();
        scope.isUpdate = isUpdate;
        scope.updateData = isUpdate?this.currentServer:'';
        let titleStr = isUpdate?'编辑引擎服务':'新建引擎服务';
        this.layer.open({
            type: 1,
            title: titleStr,
            content: engineServerUpdateServerHtml,
            scope: scope,
            area:["500px"],
        }).then((index:number)=>{
            this.setCurrentLayer(index);
        });
    }

    updateEngineNode(node:EngineNode): void {
        let scope:any = this.$scope.$new();
        scope.isUpdate = true;
        scope.updateData = node;
        let titleStr = '编辑引擎节点服务';
        this.layer.open({
            type: 1,
            title: titleStr,
            content: engineNodeUpdateNodeHtml,
            scope: scope,
            area:["500px"],
        }).then((index:number)=>{
            this.setCurrentLayer(index);
        });
    }

    addEngineNode(): void {
        let scope:any = this.$scope.$new();
        scope.isUpdate = false;
        scope.updateData = '';
        scope.engineServerID = this.currentServer.ID;
        let titleStr = '新建引擎节点服务';
        this.layer.open({
            type: 1,
            title: titleStr,
            content: engineNodeUpdateNodeHtml,
            scope: scope,
            area:["500px"],
        }).then((index:number)=>{
            this.setCurrentLayer(index);
        });
    }

    //单删除
    deleteById(){
        var _index = this.currentServer;
        this.layer.confirm(this.i18nFactory('DP_CONFIG_ENGINESERVER_19'), {
            icon: 0,
            title: this.i18nFactory('DP_CONFIG_COMMON_42'),
            area:["500px","200px"]
        },(index: number)=>{
            this.layer.close(index);
            this.submitDelete(_index.ID,index);
        })
    }

    submitDelete(id:string,layerNum:number){
        this.engineServerServer.deleteById(id).then((resp:ResponseResult<any>)=>{
            if(resp.code == 200){
                this.initEngineServerListParams();
                this.layer.close(layerNum);
            }
        });
    }

    //单删除node
    deleteNodeById(_index:EngineNode){
        this.layer.confirm(this.i18nFactory('DP_CONFIG_ENGINESERVER_20'), {
            icon: 0,
            title: this.i18nFactory('DP_CONFIG_COMMON_42'),
            area:["500px","200px"]
        },(index: number)=>{
            this.layer.close(index);

            this.submitDeleteNode(_index.ID,index);
        })
    }

    submitDeleteNode(id:string,layerNum:number){
        this.engineNodeServer.deleteById(id).then((resp:ResponseResult<any>)=>{
            if(resp.code == 200){
                this.initEngineNodeListParams(this.findListParams);
                this.layer.close(layerNum);
            }
        });
    }

    //多个删除node
    deleteByIds(){
        let selectedDataList:Array<EngineNode> = this.getSelectedList();
        if(!selectedDataList || selectedDataList.length ==0){
            return;
        }
        let ids:Array<string> = [];

        selectedDataList.forEach((server:EngineNode)=>{
            ids.push(server.ID);
        });
        let showText = '确定删除当前选中的 ' + ids.length + ' 条代理服务配置吗?';
        this.layer.confirm(showText, {
            icon: 0,
            title: this.i18nFactory('DP_CONFIG_COMMON_42'),
            area:["500px","200px"]
        },(index: number)=>{
            this.layer.close(index);
            this.submitDeleteByIds(ids);
        });

    }

    //获取当前已被选中列表
    getSelectedList():Array<EngineNode>{
        let selectedDataList:Array<EngineNode> = [];
        if(this.selectedList){
            this.engineNodeList.forEach((data:EngineNode,index:number)=>{
                if(this.selectedList[index]){
                    selectedDataList.push(data);
                }
            });
        }
        return selectedDataList;
    };

    submitDeleteByIds(ids:Array<string>){
        this.engineNodeServer.deleteByIds(ids).then((resp:ResponseResult<string>)=>{
            if(resp.code == 200){
                this.findListParams.currentPage =1;
                this.initEngineNodeListParams(this.findListParams);
            }else{

            }
        });
    };

    /**
     * 选择某一条数据
     * @time: 2017-04-21 19:43:07
     * @params:
     * @return:
     */
    afterChangeCheck(resultList:Array<boolean>,isCheckAll:boolean):void{
        this.setIsSelectItems(resultList);
        this.selectedList = resultList;
        this.isSelectAll = isCheckAll;
    };

    /**
     * creator zjh: 判断和设置当前列表是否有选中的元素
     * @param items
     */
    setIsSelectItems(items: Array<boolean>){
        let result = false;
        if(items && items.length > 0){
            let i,len;
            for(i=0,len=items.length;i<len;i++){
                if(items[i]){
                    result = true;
                    break;
                }
            }
        }
        if(this.isSelectItems !== result){
            this.isSelectItems = result;
        }
    }

    sortByField(_index:number,field:string,sortStatus:boolean){

        this.findListParams.isAsc = sortStatus;
        this.findListParams.sortName = field;

        this.initEngineNodeListParams(this.findListParams);
        this.tHeadList[_index].isAsc = sortStatus;
    }

    closeLayer(index:number):any{
        return this.layer.close(index);
    }

    setCurrentLayer(index:number):void{
        this.currentLayer = index;
    }

    getCurrentLayer():number{
        return this.currentLayer;
    }

    // 初始化引擎服务列表数据
    initEngineServerListParams() {
        this.engineServerServer.findAll().then((resp: ResponseResult<Array<EngineServer>>) => {
            if (resp.code == 200 && resp.data) {
                this.setEngineServerList(resp.data);
                if (!resp.data || resp.data.length == 0) {
                    this.engineServerNoData = true;
                }
                if(resp.data.length>0){
                    this.currentServer = resp.data[0];//页面初始化，默认选择第一个
                    this.findListParams.engineServerId = resp.data[0].ID;
                    this.initEngineNodeListParams(this.findListParams);
                }
            }
        });

    };
    choiceEngineServer(even:any,server:EngineServer){
        this.currentServer = server;
        let divs = even.currentTarget.parentNode.parentNode.getElementsByClassName("engine-server-list-div");
        
        for (let index = 0; index < divs.length; index++) {
            divs[index].style.color="#333";;
        }
        even.currentTarget.parentNode.style.color="#427bff";
    }
    setEngineServerList(result: Array<EngineServer>) {
        // this.tBodyList = this.$filter('proxyServerTypeFilter')(result,'ProxyServerType');
        this.engineServerList = result;
    };

    setEngineNodeList(result: Array<EngineNode>) {
        // this.tBodyList = this.$filter('proxyServerTypeFilter')(result,'ProxyServerType');
        this.engineNodeList = result;
    };

    // 初始化节点服务列表数据
    initEngineNodeListParams(params: EngineNodeParams): void {
        this.engineNodeServer.findListByParams(params).then((resp: ResponseResult<PageResult<EngineNode>>) => {
            if (resp.code == 200 && resp.data) {
                this.pageParams.setCurrentPage(params.currentPage);
                this.pageParams.setTotalCount(resp.data.TotalCount);
                this.setEngineNodeList(resp.data.Result);
                this.findListParams = params;
                
            }
        });

    };

    //about page click
    changePage(num:number){
        this.findListParams.currentPage = num;
        this.initEngineNodeListParams(this.findListParams);
    }

    changePageSize(num:number){
        this.findListParams.pageSize = num;
        this.findListParams.currentPage = 1;
        this.initEngineNodeListParams(this.findListParams);
        // this.proxyServerService.findListByParams(this.findListParams).then((resp:ResponseResult<any>)=>{
        //     console.log(resp)
        //     if(resp.code == 200){
        //         this.pageParams.setPageSize(this.findListParams.pageSize);
        //         this.pageParams.setTotalCount(resp.data.TotalCount);
        //         this.setTBodyList(resp.data.Result);
        //     }
        // })
    }

    
}

app.controller('baseConfigEngineServerController', BaseConfigEngineServerController);