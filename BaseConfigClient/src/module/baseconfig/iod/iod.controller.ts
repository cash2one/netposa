/**
 * Created by dell on 2017/3/23.
 */
/// <amd-dependency path="text!./iod.popup.html" name="popupHtml" />
import "css!../css/baseconfig-iod.css";
import "css!../style/baseconfig-area.css";
import {app} from "../../common/app/main.app";
import './iod.popup.controller';
import '../../common/services/iod.service';
import '../../common/services/proxyServer.service';
import {IProxyServerService} from '../../common/services/proxyServer.service';
import "../../common/services/casecade.service";
import PageParams from "../../common/directive/page/page-params";
import {IIodService} from "../../common/services/iod.service";
//import {IAreaService} from "../../common/services/area.service";
import {ITableHeader} from "../../common/directive/unit-table/table-params";
import {ITreeDataParams, TreeDataParams} from "../../common/directive/tree/tree-params";
import {IodTableParams} from "../../../core/params/IodParams";
import {Iod} from "../../../core/entity/Iod";
// import {IodEx} from "../../../core/entity/ex/IodEx";
import {Area} from "../../../core/entity/Area";
import {AreaEx} from "../../../core/entity/ex/AreaEx";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {ICasCadeService, CasCadeSearchParams} from "../../common/services/casecade.service";
import {ProxyServer} from "../../../core/entity/ProxyServer";
import {ProxyServerListParams} from "../../../core/params/ProxyServerParams";
import 'es6-promise';
declare let require :any;
//let Promise = require('es6-promise');


declare let popupHtml: any;

class TableListParams extends IodTableParams  {

    constructor() {
        super();
        this.sortName = 'Code';
        this.isAsc = true;
        this.pageSize = new PageParams().pageSize;
        this.currentPage = new PageParams().currentPage;
    };
}

class iodController {
    static $inject = ['$scope', '$timeout','casCadeService','iodService', 'layer','proxyServerService', 'i18nFactory'];
    treeSearchInput: string = null;
    currentArea: Area = new Area();
    tableListParams: TableListParams = new TableListParams();
    pageParams: PageParams =  new PageParams();
    currentLayerIndex: number;
    tableDatas: Array<any>;
    defaultSelectTreeId: string;
    tHeadList:Array<ITableHeader>;
    tBodyList:Array<Iod> = [];
    tableNoData:boolean = false;
    // // 选择行政区域树
    areaTreeDataParams:ITreeDataParams<AreaEx> = new TreeDataParams<AreaEx>();
    treeNoData:boolean = false;
    selectedList:Array<boolean> = [];
    isSelectAll:boolean = false;
    isSelectItems:boolean = false;
    proxyListForIod:Array<ProxyServer> = [];
    constructor(
        private $scope: any,
        private $timeout: Function,
        private casCadeService: ICasCadeService,
        private iodService: IIodService,
        private layer: any,
        private proxyServerService:IProxyServerService,
        private i18nFactory: any) {
        this.tHeadList =  [
            { field: "Name", title: "DP_CONFIG_IODSERVER_03"},
            { field: "AreaName", title: "DP_CONFIG_COMMON_09" /*, isSort:true,isAsc:true*/},
            { field: "IpAddress", title: "DP_CONFIG_PROXYSERVER_03"},
            { field: "Port", title: "DP_CONFIG_COMMON_11"},
            { field: "DeviceType", title: "DP_CONFIG_PROXYSERVER_04"},
            { field: "Description", title: "DP_CONFIG_COMMON_34"},
            { field: "bottoms", title: "DP_CONFIG_COMMON_35"}
        ];
        // 弹出框相关
        this.$scope.$on("iod.closePopup", (event: any, isRefresh?: boolean) =>{
            event.preventDefault();
            this.layer.close(this.currentLayerIndex);
            if (isRefresh) {
                this.$timeout(()=>{
                    this.getTableList()
                },1000);
            }
        });

        this.initTreeAndTableParams();
        this.getTreeList();
        this.initProxyList();
    }
    private initProxyList(){
        let params = {} as  ProxyServerListParams;
        params.type = 'Iod';
        params.currentPage = 1;
        params.pageSize = 100;
        this.proxyServerService.findListByParams(params).then((res)=>{
            this.proxyListForIod = res.data.Result as Array<ProxyServer>;
        })
    }
    private initTreeAndTableParams(){
        this.areaTreeDataParams.treeId = 'iodTreeIod';
        this.areaTreeDataParams.isDefaultSelected = true;
        this.areaTreeDataParams.onClick = (event: MouseEvent, treeId: string, treeNode: Area)=> {
            this.areaTreeDataParams.defaultSelectTreeId = treeNode.ID;
            this.tableListParams.currentPage = 1;
            this.tableListParams.parentId = treeNode.ID;
            this.tableListParams.sortName = 'Code';
            this.tableListParams.isAsc = true;
            this.$timeout(()=> {
                this.currentArea = treeNode;
                this.getTableList();
            });
        };
        this.areaTreeDataParams.treeInitComplete = ()=>{}
    }

    addIod(area:AreaEx) {
        // 由于layer需要传scope对象, 但现在命名参数都放在vm中, 故使用scope.$new新建一个scope传入
        let scope: {curdType: string,treeDatas:Array<AreaEx>, currentArea: AreaEx,proxyListForIod:Array<ProxyServer>, $destroy: Function} = this.$scope.$new();
        scope.curdType = 'add';
        scope.currentArea = area as AreaEx ;
        scope.treeDatas = this.areaTreeDataParams.treeDatas as Array<AreaEx>;
        scope.proxyListForIod = this.proxyListForIod;
        // 这里对scope进行一次新建

        this.currentLayerIndex = this.layer.open({
            type: 1,
            content: popupHtml,
            scope: scope,
            skin: "no-scroll",
            title: this.i18nFactory('DP_CONFIG_COMMON_40'),
            area:["500px","auto"],
            end: function () {
                scope.$destroy();
            }
        })
    }
    editIod(area:AreaEx,iod: Iod) {
        let scope: {curdType: string, treeDatas:Array<AreaEx>,currentIod:Iod,currentArea: AreaEx,proxyListForIod:Array<ProxyServer>, $destroy: Function} = this.$scope.$new();
        scope.curdType = 'edit';
        scope.currentArea = area as AreaEx ;
        scope.currentIod = iod as Iod;
        scope.treeDatas = this.areaTreeDataParams.treeDatas as Array<AreaEx>;
        scope.proxyListForIod = this.proxyListForIod;
        this.currentLayerIndex = this.layer.open({
            type: 1,
            content: popupHtml,
            scope: scope,
            skin: "no-scroll",
            closeBtn: 1,
            title: this.i18nFactory('DP_CONFIG_COMMON_38'),
            area:["500px","auto"],
            end: function () {
                scope.$destroy();
            }
        });
    }
    deleteIod(iod: Iod) {
        this.layer.confirm(this.i18nFactory('DP_CONFIG_COMMON_43'), {icon: 0, title: this.i18nFactory('DP_CONFIG_COMMON_42'),iod:["500px","200px"]},  (index: number)=> {
            this.layer.close(index);
            this.submitDeleteIod(iod);
        });
    }
    submitDeleteIod(iod: Iod) {
        this.iodService.deleteById(iod).then((res: ResponseResult<string>)=> {
            if (res.code === 200) {
                this.tableListParams.currentPage = 1;
                this.$timeout(()=>{
                    this.getTableList()
                },1000);
            }
        });
    }

    getTableList() {
        let params = new CasCadeSearchParams();
        params.pageIndex = this.tableListParams.currentPage;
        params.orderField = this.tableListParams.sortName;
        params.pageSize = this.tableListParams.pageSize;
        params.areaId = this.tableListParams.parentId;
        params.isAsc = this.tableListParams.isAsc;
        params.name = this.tableListParams.areaName;
        this.casCadeService.findIodServerList(params).then((res:ResponseResult<Array<Iod>>)=> {
            if (res.code === 200) {
                let pageParams = new PageParams();
                pageParams.pageSize = this.tableListParams.pageSize;
                pageParams.currentPage = this.tableListParams.currentPage;
                pageParams.totalCount = res.count;

                this.tBodyList = res.data || [];
                this.pageParams = pageParams;
                this.tableDatas = res.data;
                this.$timeout( () =>{
                    this.tableNoData = !(this.tBodyList && this.tBodyList.length > 0);
                });
            } else {
                this.$timeout(()=>{
                    this.tableNoData = true;
                });
            }
        });

    }
    getTreeList() {
        this.iodService.findListTree({keyword: this.treeSearchInput}).then((result: Array<AreaEx>)=> {
            this.$timeout( ()=> {
                this.areaTreeDataParams.treeDatas = result;
                this.treeNoData = !(result && result.length>0);
            });
        });

    }
    changePage(num: number) {
        this.tableListParams.currentPage = num;
        this.getTableList();
    }
    changePageSize(num: number) {
        this.tableListParams.currentPage = 1;
        this.tableListParams.pageSize = num;
        this.getTableList();
    }

    afterChangeCheck(resultList: Array<boolean>, isCheckAll: boolean): void {
        this.setIsSelectItems(resultList);
        this.selectedList = resultList;
        this.isSelectAll = isCheckAll;
    }

    //获取当前已被选中列表
    getSelectedList(): Array<Iod> {
        let selectedDataList: Array<Iod> = [];
        if (this.selectedList) {
            this.tBodyList.forEach((_data: Iod, _index: number) => {
                if (this.selectedList[_index]) {
                    selectedDataList.push(_data);
                }
            });
        }
        return selectedDataList;
    }
    //多个删除
    deleteByIds() {
        let selectedDataList: Array<Iod> = this.getSelectedList();
        if (!selectedDataList || selectedDataList.length == 0) {
            this.layer.msg(this.i18nFactory("DP_CONFIG_COMMON_84"));
            return;
        }
        let ids: Array<string> = [];

        selectedDataList.forEach((_data: Iod) => {
            ids.push(_data.ID);
        });
        let showText = this.i18nFactory('DP_CONFIG_IODSERVER_12',{value: ids.length});
        this.layer.confirm(showText, {
            icon: 0,
            title: this.i18nFactory('DP_CONFIG_COMMON_42'),
            iod: ["500px", "200px"]
        }, (index: number) => {
            this.layer.close(index);
            this.layer.confirm(this.i18nFactory('DP_CONFIG_COMMON_43'), {icon: 0, title: this.i18nFactory('DP_CONFIG_COMMON_42'),iod:["500px","200px"]},  (index: number)=> {
                this.layer.close(index);
                this.submitDeleteByIds(ids);
            });

        });

    }
    //提交删除
    submitDeleteByIds(ids: Array<string>) {
        this.iodService.deleteByIds(ids).then((res: ResponseResult<string>) => {
            if (res.code == 200) {
                this.tableListParams.currentPage = 1;
                this.$timeout(()=>{
                    this.getTableList()
                },1000);
            }
        });
    }
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
    treeSearchInputKeyUp(e: any) {
        if(e.keyCode === 13){
            this.getTreeList();
        }
    }
    synchronize(item:Iod){
        console.log(item)
        this.layer.confirm(`确定同步此服务器${item.Name}?`, {
            icon: 0,
            title: this.i18nFactory('DP_CONFIG_COMMON_42'),
            iod: ["500px", "200px"]
        }, (index: number) => {
            this.iodService.synchronize(item.ID).then((res:any)=>{
                console.log(res);
            });
            this.layer.close(index);

        });
    }
    treeSearchInputFunc(){
        this.getTreeList();
    }
}
app.controller('iodController', iodController);

