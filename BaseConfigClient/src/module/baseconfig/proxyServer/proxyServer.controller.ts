/// <amd-dependency path="text!./proxyServer.updateModal.html" name="proxyServerUpdateModalHtml" />
import "css!../css/baseconfig-serve.css";
import "css!../style/baseconfig-area.css";
import {ITableHeader} from "../../common/directive/unit-table/table-params";
declare var require:any;

import {app} from "../../common/app/main.app";
import 'angular';

import {IProxyServerService} from '../../common/services/proxyServer.service';

import '../../common/services/proxyServer.service';
import "../server/main/serverType.filter"
import './proxyServer.updateModal.controller';
import PageParams from "../../common/directive/page/page-params";
import {ProxyServerListParams} from "../../../core/params/ProxyServerParams";
import {ProxyServer} from "../../../core/entity/ProxyServer";
import {ResponseResult, PageResult} from "../../../core/params/result/ResponseResult";
import {ProxyServerEx} from "../../../core/entity/ex/ProxyServerEx";

declare let proxyServerUpdateModalHtml: any;

declare let angular: any;

class ProxyServerController{
    tHeadList:Array<ITableHeader>;
    tBodyList:Array<ProxyServer>;
    findListParams:ProxyServerListParams;

    currentLayer?:number;

    //serverTypeEnum:{[key:string]:{key:string,value:string}} = ServerTypeEnum;
    //--------分页指令
    pageParams :PageParams;
    //---------
    //多选相关
    selectedList:Array<boolean>;
    isSelectAll:boolean;
    // alter wyr: 用于判断当前界面上的列表是否被选中
    isSelectItems: boolean;

    static $inject = ['$scope','$timeout','$controller','proxyServerService','layer','$filter','i18nFactory'];
    constructor(private $scope:any,private $timeout:Function,private $controller:any, private proxyServerService:IProxyServerService, private layer:any, private $filter:any,private i18nFactory:any){

        this.isSelectItems = false;
        this.pageParams = new PageParams();
        this.findListParams = new ProxyServerListParams();
        this.findListParams.currentPage = this.pageParams.currentPage;
        this.findListParams.pageSize = this.pageParams.pageSize;

        this.tHeadList =[
            { field: "Name", title: "DP_CONFIG_COMMON_03"},
            { field: "IpAddress", title: "DP_CONFIG_PROXYSERVER_03"},
            { field: "Port", title: "DP_CONFIG_COMMON_11"},
            { field: "ProxyServerType", title: "DP_CONFIG_PROXYSERVER_04"},
            { field: "Description", title: "DP_CONFIG_COMMON_34"},
            { field: "buttons", title: "DP_CONFIG_COMMON_15"},
        ];

        this.getListByParams(this.findListParams);

        let self_this = this;
        this.$scope.$on('closeProxyServerUpdateModel', function (even:any,data:{isCommit:boolean}) {
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

    //单删除
    deleteById(_index:ProxyServer){

        this.layer.confirm(this.i18nFactory('DP_CONFIG_PROXYSERVER_05'), {
            icon: 0,
            title: this.i18nFactory('DP_CONFIG_COMMON_42'),
            area:["500px","200px"]
        },(index: number)=>{
            this.layer.close(index);

            this.submitDelete(_index.ID,index);
        })
    }

    submitDelete(id:string,layerNum:number){
        this.proxyServerService.deleteById(id).then((resp:ResponseResult<any>)=>{
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
        this.setIsSelectItems(resultList);
        this.selectedList = resultList;
        this.isSelectAll = isCheckAll;
    };

    //获取当前已被选中列表
    getSelectedList():Array<ProxyServer>{
        let selectedDataList:Array<ProxyServer> = [];
        if(this.selectedList){
            this.tBodyList.forEach((data:ProxyServer,index:number)=>{
                if(this.selectedList[index]){
                    selectedDataList.push(data);
                }
            });
        }
        return selectedDataList;
    };

    //多个删除
    deleteByIds(){
        let selectedDataList:Array<ProxyServer> = this.getSelectedList();
        if(!selectedDataList || selectedDataList.length ==0){
            return;
        }
        let ids:Array<string> = [];

        selectedDataList.forEach((server:ProxyServer)=>{
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

    submitDeleteByIds(ids:Array<string>){
        this.proxyServerService.deleteByIds(ids).then((resp:ResponseResult<string>)=>{
            if(resp.code == 200){
                this.findListParams.currentPage =1;
                this.getListByParams(this.findListParams);
            }else{

            }
        });
    };

    addVideoServer(){
        let scope:any = this.$scope.$new();
        scope.isUpdate = false;

        let titleStr = '新建代理服务';
        this.layer.open({
            type: 1,
            title: titleStr,
            content: proxyServerUpdateModalHtml,
            scope: scope,
            area:["500px"],
        }).then((index:number)=>{
            this.setCurrentLayer(index);
        });
    }
    findById(id:string){

        return this.proxyServerService.findById(id);
    }

    updateServer(model?:ProxyServer):void{
        this.findById(model.ID).then((resp:ResponseResult<ProxyServerEx>)=>{
            if(resp.code == 200){
                this.openUpdateVideoServer(true,resp.data);
            }
        });
    };

    openUpdateVideoServer(isUpdate:boolean,data?:ProxyServer){
        let scope:any = this.$scope.$new();
        scope.isUpdate = isUpdate;
        scope.updateData = data;

        let titleStr = isUpdate?'编辑代理服务':'新建代理服务';
            this.layer.open({
                type: 1,
                title:titleStr,
                content: proxyServerUpdateModalHtml,
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

    setTBodyList(result:Array<ProxyServer>) {
        // this.tBodyList = this.$filter('proxyServerTypeFilter')(result,'ProxyServerType');
        this.tBodyList = result;
    };


    getListByParams(params:ProxyServerListParams):void{

        this.proxyServerService.findListByParams(params).then((resp:ResponseResult<PageResult<ProxyServer>>)=>{
            if(resp.code == 200 && resp.data){
                this.pageParams.setCurrentPage(params.currentPage);
                this.pageParams.setTotalCount(resp.data.TotalCount);
                this.setTBodyList(resp.data.Result);
                this.findListParams = params;
            }
        })
    };

    sortByField(_index:number,field:string,sortStatus:boolean){

        this.findListParams.isAsc = sortStatus;
        this.findListParams.sortName = field;

        this.getListByParams(this.findListParams);
        this.tHeadList[_index].isAsc = sortStatus;
    }


    //about page click
    changePage(num:number){
        this.findListParams.currentPage = num;
        this.getListByParams(this.findListParams);
    }

    changePageSize(num:number){
        this.findListParams.pageSize = num;
        this.findListParams.currentPage = 1;
        this.getListByParams(this.findListParams);
        // this.proxyServerService.findListByParams(this.findListParams).then((resp:ResponseResult<any>)=>{
        //     console.log(resp)
        //     if(resp.code == 200){
        //         this.pageParams.setPageSize(this.findListParams.pageSize);
        //         this.pageParams.setTotalCount(resp.data.TotalCount);
        //         this.setTBodyList(resp.data.Result);
        //     }
        // })
    }

    /**
     * creator wyr: 判断和设置当前列表是否有选中的元素
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

}
app
    .controller('baseConfigProxyServerController', ProxyServerController);