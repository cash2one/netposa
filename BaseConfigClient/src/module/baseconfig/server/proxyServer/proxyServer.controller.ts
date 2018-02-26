/// <amd-dependency path="text!./proxyServer.updateModal.html" name="proxyServerUpdateModalHtml" />
import {ITableHeader} from "../../../common/directive/unit-table/table-params";
declare var require:any;

import {app} from "../../../common/app/main.app";
import 'angular';

import {IProxyServerService} from '../../../common/services/proxyServer.service';

import '../../../common/services/proxyServer.service';
import "../main/serverType.filter"
import './proxyServer.updateModal.controller';
import PageParams from "../../../common/directive/page/page-params";
import {ProxyServerListParams} from "../../../../core/params/ProxyServerParams";
import {ProxyServer} from "../../../../core/entity/ProxyServer";
import {ResponseResult, PageResult} from "../../../../core/params/result/ResponseResult";
import {ProxyServerEx} from "../../../../core/entity/ex/ProxyServerEx";

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

    static $inject = ['$scope','$timeout','$controller','proxyServerService','layer','$filter'];
    constructor(private $scope:any,private $timeout:Function,private $controller:any, private proxyServerService:IProxyServerService, private layer:any, private $filter:any){

        this.pageParams = new PageParams();
        this.findListParams = new ProxyServerListParams();
        this.findListParams.currentPage = this.pageParams.currentPage;
        this.findListParams.pageSize = this.pageParams.pageSize;

      //  this.tHeadList = getHeadList();

        this.tHeadList =[
            { field: "Name", title: "名称"},
            { field: "IpAddress", title: "IP地址"},
            { field: "Port", title: "端口"},
            { field: "ProxyServerType", title: "服务器类型"},
            { field: "Description", title: "描述"},
            { field: "buttons", title: "操作"},
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
        console.log(resultList);
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
        if(! selectedDataList || selectedDataList.length ==0){
            console.error("============","当前未选择数据");
            return;
        }
        let ids:Array<string> = [];

        selectedDataList.forEach((server:ProxyServer)=>{
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

        let titleStr = '新建服务器';
        this.layer.open({
            type: 1,
            title:[titleStr,'text-align: center;'],
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
        console.log(model);
        this.findById(model.ID).then((resp:ResponseResult<ProxyServerEx>)=>{
            console.log(resp);
            if(resp.code == 200){
                this.openUpdateVideoServer(true,resp.data);
            }else{

            }
        });
    };

    openUpdateVideoServer(isUpdate:boolean,data?:ProxyServer){
        let scope:any = this.$scope.$new();
        scope.isUpdate = isUpdate;
        scope.updateData = data;

        let titleStr = isUpdate?'编辑服务器':'新建服务器';
            this.layer.open({
                type: 1,
                title:[titleStr,'text-align: center;'],
                content: proxyServerUpdateModalHtml,
                scope: scope,
                area:["500px"],
                end: function(){
                    scope.$destroy();
                    console.log("%c ==========start==============","color:orange");
                    console.log('this.layer scope.$destroy();');
                    console.log("=========end===============",);
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
        this.tBodyList = this.$filter('proxyServerTypeFilter')(result,'ProxyServerType');
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
        this.proxyServerService.findListByParams(this.findListParams).then((resp:ResponseResult<any>)=>{
            if(resp.code == 200){
                this.pageParams.setCurrentPage(1);
                this.pageParams.setPageSize(this.findListParams.pageSize);
                this.pageParams.setTotalCount(resp.data.TotalCount);
                this.setTBodyList(resp.data.Result);
            }
        })
    }

}
app
    .controller('baseConfigProxyServerController', ProxyServerController);