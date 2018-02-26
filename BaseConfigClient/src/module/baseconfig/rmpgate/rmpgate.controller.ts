/**
 * Created by dell on 2017/3/23.
 */
/// <amd-dependency path="text!./rmpgate.popupRmpGate.html" name="popupRmpGateHtml" />
/// <amd-dependency path="text!./rmpgate.popupLamp.html" name="popupLampHtml" />
/// <amd-dependency path="text!./rmpgate.rmpgateCreate.html" name="createHtml" />
import "css!../css/baseconfig-device.css";
import {app} from "../../common/app/main.app";
import "./rmpgate.popupRmpGate.controller";
import "./rmpgate.popupLamp.controller";
import "./rmpgate.rmpgateCreate.controller";

import "../../common/services/area.service";
import "../../common/services/camera.service";
import "../../common/services/rmpgate.service";

import {Enum} from "../../../core/enum/Enum";
import {RmpGateListParams, RmpGateChangeAreaIDModel} from "../../../core/params/RmpGateParams";
import {RmpGateEx} from '../../../core/entity/ex/RmpGateEx';
import {ResponseResult, PageResult} from "../../../core/params/result/ResponseResult";
import {ITableHeader} from "../../common/directive/unit-table/table-params";
import {TreeDataParams} from "../../common/directive/tree/tree-params";
import {AreaEx} from "../../../core/entity/ex/AreaEx";
import {TreeParams} from "../../../core/params/tree/TreeParams";
import {IAreaService} from "../../common/services/area.service";
import {IRmpGateService} from "../../common/services/rmpgate.service";

import PageParams from "../../common/directive/page/page-params";
import {Area} from "../../../core/entity/Area";
import {ICasCadeService, CasCadeSearchParams} from "../../common/services/casecade.service";
import {CameraTypeEnum} from "../../../core/server/enum/CameraTypeEnum";
import { RmpGate } from '../../../core/entity/RmpGate';

declare var popupRmpGateHtml: any;
declare var createHtml: any;
declare var popupLampHtml: any;


/* bcDeviceCtrl */
class baseConfigRmpGateController {
    static $inject = ['$scope','$timeout','cameraService','areaService','layer','casCadeService','i18nFactory'];

    findListParams:RmpGateListParams;
    pageParams:PageParams;
    
    //---table
    // table 列表数据
    tHeadListRmpGate:Array<ITableHeader>;
    tBodyList:any;
    tableNoData:boolean;
    SearchParams: any ;
    //area tree
    areaTreeDatas :TreeDataParams<Area>;
    //search
    areaTreeSearchInputStr:string = "";

    //多选相关
    selectedList:Array<boolean>;
    isSelectAll:boolean;

    currentLayerIndex: number;

    cameraTypeList: {value:string, text:string}[];

    isSelectItems: boolean;

    selectedCameraType: string;

    constructor(private $scope:any,
                private $timeout:any,
                private rmpgateService:IRmpGateService,
                private areaService:IAreaService,
                private layer: any,
                private casCadeService: ICasCadeService,
                private i18nFactory:any) {
        this.initParams();
        // 树列表数据
        //初始化 area 树数据
        this.areaTreeDatas = new TreeDataParams<AreaEx>();
        this.areaTreeDatas.treeId = 'areaTreeIvs';
        this.areaTreeDatas.isDefaultSelected = true;
        this.areaTreeDatas.onClick = treeSelectNode;
        this.areaTreeDatas.treeInitComplete = treeInitComplete;
        let self_this = this;
        // 节点选择
        function treeSelectNode(event: MouseEvent, treeId:string, treeNode:AreaEx){
            
            if(treeNode.ID == self_this.findListParams.areaId){
                if(self_this.tBodyList){
                    return;
                }
            }
            //init req_params
            self_this.findListParams.areaId = treeNode.ID;
            self_this.findListParams.currentPage = 1;
            self_this.getListByParams(self_this.findListParams);
        }

        function treeInitComplete(){
        }
        this.getAreaTreeList();

        // 弹出框相关
        $scope.$on("device.closePopup", (event: any, isRefresh?: boolean)=>{
            this.closeCameraChangePopup(isRefresh);
        });
    }

    initParams(){
        this.tableNoData = false;
        this.pageParams = new PageParams();
        this.findListParams = new RmpGateListParams();
        this.findListParams.currentPage = 1;
        this.findListParams.pageSize = this.pageParams.pageSize;
        this.findListParams.areaId = "";
        this.findListParams.sortName = "Code";
        this.findListParams.isAsc = true;
        this.SearchParams = {
            Name:''
        }
        this.tBodyList = [];
        
        this.setTableHead() 
        this.cameraTypeList = CameraTypeEnum;
        this.isSelectItems = false;
    }

    setTableHead =  () => {
        this.tHeadListRmpGate = [
            {field : 'Name',title:'DP_CONFIG_COMMON_03'},
            {field : 'Code',title:'DP_CONFIG_COMMON_04'},
            {field: 'JsonUserData.Area.Name',title:'DP_CONFIG_COMMON_09'},
            {field : 'Lon', title:'DP_CONFIG_COMMON_13'},
            {field: 'Lat', title:'DP_CONFIG_COMMON_14'},
            {field : '',title:'DP_CONFIG_COMMON_15'},
        ];

    }
    _getCasCadeSearchParams(tableParams: RmpGateListParams){
        if(!tableParams) return {} as CasCadeSearchParams;
        let result = new CasCadeSearchParams();
        result.pageIndex = tableParams.currentPage;
        result.orderField = tableParams.sortName;
        result.pageSize = tableParams.pageSize;
        result.areaId = tableParams.areaId;
        result.isAsc = tableParams.isAsc;
        if(tableParams.Name){
            result.name = tableParams.Name;
        }
        return result;
    }
    getListByParams(params:RmpGateListParams){
        this.casCadeService.findRmpGateList(this._getCasCadeSearchParams(params)).then((res:ResponseResult<Array<RmpGateEx>>)=>{
            if(res && res.data && res.code === 200){
                this.setTableBody(res.data, res.count);
            }else{
                this.setTableBody([],0);
            }
            this.findListParams = params;
        });
    }

    setTableBody(dataList:any,total:number){
        if(dataList && dataList.length>0){
            this.tBodyList = dataList;
            this.tableNoData = false;
            let _pageParams = new PageParams();
            _pageParams.currentPage = this.findListParams.currentPage;
            _pageParams.pageSize = this.findListParams.pageSize;
            _pageParams.setTotalCount(total);

            this.pageParams = _pageParams;
        }else{
            this.tBodyList = [];
            this.tableNoData = true;
        }
    }

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

    // 单栏选择排序
    sortByField(_index:number,field:string,sortStatus:boolean){

        this.findListParams.isAsc = sortStatus;
        this.findListParams.sortName = field;

        this.getListByParams(this.findListParams);
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
    getSelectedList():Array<RmpGateEx>{
        let selectedDataList:Array<RmpGateEx> = [];
        if(this.selectedList){
            this.tBodyList.forEach((ivsServer:RmpGateEx,index:number)=>{
                if(this.selectedList[index]){
                    selectedDataList.push(ivsServer);
                }
            });
        }
        return selectedDataList;
    };

    // configDevices
    configDevices(type:string){
            let scope:{RmpgateDatas:Array<RmpGate>,type: string,$destroy: Function}= this.$scope.$new();
            scope.type = type
            scope.RmpgateDatas = this.tBodyList
            if(type === 'area'){
            // 这里对scope进行一次新建
            this.currentLayerIndex = this.layer.open({
                type: 1,
                content: popupRmpGateHtml,
                scope: scope,
                title: this.i18nFactory("DP_CONFIG_COMMON_08"),
                area:["570px", "510px"],
                end: function () {
                    scope.$destroy();
                }
            });
        }else{
            // 这里对scope进行一次新建
            this.currentLayerIndex = this.layer.open({
                type: 1,
                content: popupRmpGateHtml,
                scope: scope,
                title: this.i18nFactory("DP_CONFIG_COMMON_07"),
                area:["570px", "510px"],
                end: function () {
                    scope.$destroy();
                }
            });
        }
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

    closeCameraChangePopup(flag?: boolean){
        this.layer.close(this.currentLayerIndex);
        this.currentLayerIndex = -1;
        if(flag){
            // 刷新界面
            this.findListParams.currentPage = 1;
            this.$timeout(()=>{
                this.getListByParams(this.findListParams);
            },2000)
        }
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

    setLamp(data:RmpGate) {
        let scope:{deviceData:any,$destroy: Function}= this.$scope.$new();
        scope.deviceData = data;
        // 这里对scope进行一次新建
        this.currentLayerIndex = this.layer.open({
            type: 1,
            content: popupLampHtml,
            scope: scope,
            title: this.i18nFactory("DP_CONFIG_COMMON_17"),
            area:["300px", "480px"],
            end: function () {
                scope.$destroy();
            }
        });
    }
    search() {
        this.findListParams.Name = this.SearchParams.Name;
        this.getListByParams(this.findListParams);
    }
    create () {
        let scope:{type:string,$destroy: Function}= this.$scope.$new();
        scope.type = 'add'
        // 这里对scope进行一次新建
        this.currentLayerIndex = this.layer.open({
            type: 1,
            content: createHtml,
            scope: scope,
            title: "新增",
            area:["400px", "500px"],
            end: function () {
                scope.$destroy();
            }
        });
    }
    deleteCamera(data:RmpGate){
    }
    public editCamera (data:RmpGate) {
        let scope:{id:string,RmpGate:RmpGate,type:string,$destroy: Function}= this.$scope.$new();
        scope.id = this.findListParams.areaId;
        scope.RmpGate = data as RmpGate;
        // 这里对scope进行一次新建
        this.currentLayerIndex = this.layer.open({
            type: 1,
            content: createHtml,
            scope: scope,
            title:this.i18nFactory('DP_CONFIG_RMPGATE_02'),
            area:["350px", "auto"],
            end: function () {
                scope.$destroy();
            }
        });
    }
}

app
    .controller('baseConfigRmpGateController', baseConfigRmpGateController);