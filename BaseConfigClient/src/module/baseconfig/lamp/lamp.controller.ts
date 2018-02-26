/**
 * Created by dell on 2017/3/23.
 */
/// <amd-dependency path="text!./lamp.popup.html" name="lampPopup" />
/// <amd-dependency path="text!./lamp.device.popup.html" name="deviceHtml" />
import './lamp.popup';
import './lamp.device.popup';
import {app} from "../../common/app/main.app";
import "css!../css/baseconfig-lamp.css";
//引入服务
import '../../common/services/lamp.service';
import '../../common/services/area.service';
import '../../common/services/camera.service'
import '../../common/services/electronicfence.service'
import '../../common/services/rmpgate.service'
import '../../common/services/wifi.service'
import "../../common/directive/tree/tree.directive.service";
import {ILampService} from "../../common/services/lamp.service";
import {IAreaService} from "../../common/services/area.service";
import {ICameraService} from "../../common/services/camera.service";
import {IRmpGateService} from "../../common/services/rmpgate.service";
import {IWifiService} from "../../common/services/wifi.service";
import {IElectronicFenceService} from "../../common/services/electronicfence.service";

import {ITreeDirectiveService} from "../../common/directive/tree/tree.directive.service";
import PageParams from "../../common/directive/page/page-params";
import {ITableHeader} from "../../common/directive/unit-table/table-params";
import {ITreeDataParams, TreeDataParams} from "../../common/directive/tree/tree-params";
import {LampTableParams} from "../../../core/params/LampParams";
import {Area} from "../../../core/entity/Area";
import {AreaEx} from "../../../core/entity/ex/AreaEx";
import {Lamp} from "../../../core/entity/Lamp";
import {LampEx} from "../../../core/entity/ex/LampEx";
import {SystemPoint} from "../../../core/entity/SystemPoint";
//设备
import {Camera} from "../../../core/entity/Camera";
import {CameraEx} from "../../../core/entity/ex/CameraEx";
import {RmpGate} from "../../../core/entity/Rmpgate";
import {Wifi} from "../../../core/entity/Wifi";
import {ElectronicFence} from "../../../core/entity/ElectronicFence";
import "../../common/directive/tree/tree.directive.service";
import "./lamp.store.service";
import {ITaskStoreService} from "./lamp.store.service";
import {TaskListParams} from "../../../core/params/TaskConfigParams";
import {ICasCadeService, CasCadeSearchParams} from "../../common/services/casecade.service";
import {RelationCol, Relation} from "../../../core/entity/DeviceRelation";
import {BackResponseBody, ResponseResult} from "../../../core/params/result/ResponseResult";

import "es6-promise"
let Promise = require("es6-promise")
declare var require:any;
declare let angular: any;
declare let lampPopup: any;
declare var deviceHtml: any;
type AreaCameraEx = AreaEx & CameraEx;

class TableListParams extends LampTableParams  {

    constructor() {
        super();
        this.sortName = 'Code';
        this.isAsc = true;
        this.pageSize = new PageParams().pageSize;
        this.currentPage = new PageParams().currentPage;
    };
}

//摄像机参数
class parObj {
    imagePath:string = '';
    arrCameraId:string[] = [];
    startTime:string = '';
    endTime:string = '';
    arrGender:string[] = [];
    maxAge:number = null;
    minAge:number = null;
    arrEyeGlasses:number[] = [];
    arrSunGlasses:number[] = [];
    arrMask:number[] = [];
    minThreshold:number = 0;
    pageSize:number = 50;
    currentPage:number = 1;
    constructor() {
    }
}

class BaseConfigLampController {
    static $inject = ['$scope', 
                     '$timeout',
                     'lampService',
                     'areaService', 
                     'cameraService', 
                     'wifiService', 
                     'rmpgateService', 
                     'electronicfenceService', 
                     'layer', 
                     'casCadeService',
                     'i18nFactory',
                     'treeDirectiveService'];

    treeSearchInput: string;
    treeSearchInputFunc: Function;
    tableSearchInput: string;
    tableSearchInputFunc: Function;

    currentArea: Area;
    tableListParams: TableListParams;

    pageParams: PageParams;

    editLamp: Function;
    deleteLamp: Function;
    currentLayerIndex: number;

    tableDatas: Array<any>;
    defaultSelectTreeId: string;

    tableSearchInputKeyUp: Function;
    treeSearchInputKeyUp: Function;

    changePage: Function;
    changePageSize:Function;

    // table 列表数据
    tHeadList:Array<ITableHeader>;
    tBodyList:Array<LampEx>;

    tableNoData:boolean = false;

    // 选择行政区域树
    AreaTreeDataParams:ITreeDataParams<AreaEx>;
    treeNoData:boolean = false;

    // 摄像机树
    clearCondition:() => void;
    cacheSelCamera:Array<{[key:string]:any}> = [];
    cameraParams:ITreeDataParams<AreaEx>;
    ageRange:number[] = [];
    glassType:number = 0;
    params:any;
    isUploadImg:boolean = false;
    funArr:any;
    DevicePopup:Function

    // 多选相关
    selectedList:Array<boolean>;
    isSelectAll:boolean;
    afterChangeCheck:Function;
    deleteByIds:Function;

    // 排序回调
    sortByField:Function;
    isSelectItems:boolean;

    // 条件查询
    findListParams:TaskListParams;

    onClickSearch:Function;
    // aboutDevice: Array<{value:string, text:string}>;
    allLampDeviceRalation: Array<Relation>

    // 设备
    // AllCamera:Array<Camera>;
    // AllWifi:Array<Wifi>;
    // AllRmpgate:Array<RmpGate>; 
    // AllElectronicFence:Array<ElectronicFence>;
    SystemPointList:Array<SystemPoint>;

    constructor(private $scope: any, 
                private $timeout: Function,
                private lampService:ILampService,
                private areaService: IAreaService, 

                private cameraService:ICameraService, 
                private wifiService:IWifiService, 
                private rmpgateService:IRmpGateService, 
                private electronicfenceService:IElectronicFenceService, 

                private layer: any,
                private casCadeService: ICasCadeService,
                private i18nFactory: any,
                private treeService:ITreeDirectiveService
                ) {
        // 弹出框相关
        this.$scope.$on("lamp.closePopup", (event: any, isRefresh?: boolean) =>{
            event.preventDefault();
            this.layer.close(this.currentLayerIndex);
            if (isRefresh) {
                this.$timeout(()=>{
                    this.getTableList();
                    this.getTreeList();
                },1000);
            }
        });
        this.$scope.$on("lampDevice.closePopup", (event: any, isRefresh?: boolean) =>{
            event.preventDefault();
            this.layer.close(this.currentLayerIndex);
                this.$timeout(()=>{
                    this.getTableList();
                    this.getTreeList();
                },1000);
        });
        this.getTreeList();
        // 标签text
        let vm = this;
        // 树列表数据
        // 初始化 area 树数据
        vm.AreaTreeDataParams = new TreeDataParams<AreaEx>();
        vm.AreaTreeDataParams.treeId = 'areaTreeArea';
        vm.AreaTreeDataParams.isDefaultSelected = true;
        vm.AreaTreeDataParams.onClick = treeSelectNode;
        vm.AreaTreeDataParams.treeInitComplete = treeInitComplete;

        // 树列表数据
        vm.treeSearchInput;
        vm.treeSearchInputFunc = treeSearchInputFunc;
        vm.treeSearchInputKeyUp = treeSearchInputKeyUp;

        // 摄像机树
        vm.cameraParams = new TreeDataParams<AreaEx>();
        vm.params;

        // 表格数据
        vm.tHeadList =  [
            { field: "Name", title: "DP_CONFIG_COMMON_03"},
            { field: "Code", title: "DP_CONFIG_COMMON_04"},
            { field: "Area", title: "DP_CONFIG_COMMON_09"},
            { field: "DeviceNum", title: "DP_CONFIG_LAMP_07"},
            { field: "Latitude", title: "DP_CONFIG_COMMON_13"},
            { field: "Longitude", title: "DP_CONFIG_COMMON_14"},
            { field: "bottoms", title: "DP_CONFIG_COMMON_15"}
        ];
        vm.tBodyList = [];
        // 设备下拉
        // vm.aboutDevice = []

        vm.isSelectItems = false;
        vm.pageParams;
        vm.currentArea = {} as Area;
        vm.tableListParams = new TableListParams();

        //追加排序参数
        vm.tableListParams.sortName = 'Code';
        vm.tableListParams.isAsc = true;
        vm.sortByField = sortByField;

        vm.tableSearchInput;
        vm.tableSearchInputFunc = tableSearchInputFunc;
        vm.tableSearchInputKeyUp = tableSearchInputKeyUp;

        // 分页控件
        vm.changePage = changePage;
        vm.changePageSize =changePageSize;

        // 多选相关
        vm.selectedList = [];
        vm.isSelectAll = false;
        vm.afterChangeCheck = afterChangeCheck;
        vm.deleteByIds = deleteByIds;

        // 信息条数据
        vm.editLamp = editLamp;
        vm.deleteLamp = deleteLamp;

        // 条件查询
        vm.findListParams = initFindTaskListParams();
        vm.onClickSearch = onClickSearch;

        // 弹出框相关
        vm.DevicePopup = DevicePopup;

        function treeSearchInputKeyUp(e: any) {
            if(e.keyCode === 13){
                vm.getTreeList();
            }
        }

        function tableSearchInputKeyUp(e: any) {
            if(e.keyCode === 13){
                vm.tableListParams.areaName = vm.tableSearchInput;
                vm.tableListParams.currentPage = 1;
                vm.getTableList();
            }
        }

        function treeSearchInputFunc() {
            vm.getTreeList();
        }

        function tableSearchInputFunc() {
            vm.tableListParams.areaName = vm.tableSearchInput;
            vm.tableListParams.currentPage = 1;
            vm.getTableList();
        }

        // 编辑灯杆
        function editLamp(area:AreaEx, lamp?:LampEx) {
            this.getAllLampRalation(lamp.ID).then(()=>{
                let scope:{curdType: string,
                    treeDatas:Array<AreaEx>,
                    currentLamp:LampEx,
                    currentArea: AreaEx,
                    getAllLampAboutDevice: any,
                    $destroy: Function} = $scope.$new();

                scope.curdType = 'edit';
                scope.currentArea = area as AreaEx;
                scope.currentLamp = lamp as LampEx;
                scope.treeDatas = vm.AreaTreeDataParams.treeDatas as Array<AreaEx>;
                console.log(this.allLampDeviceRalation);
                scope.getAllLampAboutDevice = this.allLampDeviceRalation; // 得到立杆相关设备关系表

                vm.currentLayerIndex = layer.open({
                    type: 1,
                    content: lampPopup,
                    scope: scope,
                    skin: "no-scroll",
                    title: i18nFactory('DP_CONFIG_LAMP_08'),
                    area:["650px","520px"],
                    end: function () {
                        scope.$destroy();
                    }
                });
            })
        }

        // 删除灯杆
        function deleteLamp(lamp: Lamp) {
            layer.confirm(i18nFactory('DP_CONFIG_LAMP_11'), {
                icon: 0,
                title: i18nFactory('DP_CONFIG_COMMON_42'),
                lamp:["500px","200px"]
            }, function (index: number) {
                layer.close(index);
                submitDeleteLamp(lamp);
            });
        }

        // 提交灯杆表单
        function submitDeleteLamp(lamp: Lamp) {
            
            lampService.deleteById(lamp).then(complete);

            function complete(res: ResponseResult<string>) {
                if (res.code === 200) {
                    // 刷新整个列表
                    vm.tableListParams.currentPage = 1;
                    $timeout(()=>{
                        vm.getTreeList();
                        vm.getTableList();
                    },1000)
                }
            }
        }

        function treeInitComplete(treeId: string) {
        }

        // 缓存选中的lamp结点ID
        function treeSelectNode(event: MouseEvent, treeId: string, treeNode: Area) {
            vm.AreaTreeDataParams.defaultSelectTreeId = treeNode.ID;
            vm.tableListParams.currentPage = 1;
            vm.tableListParams.parentId = treeNode.ID;
            vm.getTableList();

            $timeout(()=> {
                vm.currentArea = treeNode;
            });
        }

        // 弹出设备框
        function DevicePopup(lamp:any){
            console.log(lamp);
            if(!lamp.JsonUserData.DiviceCount||lamp.JsonUserData.DiviceCount==0){return}
            let scope:{
                getAllLampAboutDevice: any,
                currentLamp:LampEx,
                // SystemPointList: Array<SystemPoint>,
                $destroy: Function} = $scope.$new();

            scope.getAllLampAboutDevice = lamp.JsonUserData.Divices; // 得到立杆相关设备关系表
            console.log(scope.getAllLampAboutDevice)
            // scope.SystemPointList = this.SystemPointList;
            scope.currentLamp = lamp as LampEx;


            this.currentLayerIndex = layer.open({
                type: 1,
                content: deviceHtml,
                offset: '80px',
                scope: scope,
                skin: "no-scroll",
                title: "关联设备",
                area: "650px",
                end: function () {
                    scope.$destroy();
                }
            })
        }

        function changePage(num: number) {
            vm.tableListParams.currentPage = num;
            vm.getTableList();
        }

        function changePageSize(num: number) {
            vm.tableListParams.currentPage = 1;
            vm.tableListParams.pageSize = num;
            vm.getTableList();
        }

        // 打钩 选择 回调
        function afterChangeCheck(resultList: Array<boolean>, isCheckAll: boolean): void {
            setIsSelectItems(resultList);
            vm.selectedList = resultList;
            vm.isSelectAll = isCheckAll;
        }

        //获取当前已被选中列表
        function getSelectedList(): Array<LampEx> {
            let selectedDataList: Array<LampEx> = [];
            if (vm.selectedList) {
                vm.tBodyList.forEach((_data: LampEx, _index: number) => {
                    if (vm.selectedList[_index]) {
                        selectedDataList.push(_data);
                    }
                });
            }
            return selectedDataList;
        }

        //多个删除
        function deleteByIds() {
            let selectedDataList: Array<LampEx> = getSelectedList();
            if (!selectedDataList || selectedDataList.length == 0) {
                layer.msg(i18nFactory("DP_CONFIG_COMMON_84"));
                return;
            }
            let ids: Array<string> = [];

            selectedDataList.forEach((_data: LampEx) => {
                ids.push(_data.ID);
            });
            let showText = i18nFactory('DP_CONFIG_LAMP_12',{value: ids.length});
            layer.confirm(showText, {
                icon: 0,
                title: i18nFactory('DP_CONFIG_COMMON_42'),
                lamp: ["500px", "200px"]
            }, (index: number) => {
                layer.close(index);
                submitDeleteByIds(ids);
            });

        }

        //提交删除
        function submitDeleteByIds(ids: Array<string>) {
            console.log("多个删除");
            lampService.deleteByIds(ids).then((resp: ResponseResult<string>) => {
                if (resp.code == 200) {
                    vm.tableListParams.currentPage = 1;
                    $timeout(()=>{
                        vm.getTreeList();
                        vm.getTableList();
                    },1000)
                }
            });
        }
        // 排序
        function sortByField(index:number,fieldName:string,sortStatus:boolean){
            vm.tableListParams.isAsc = sortStatus;
            vm.tableListParams.sortName = fieldName;
            vm.getTableList();
        }

        /**
         * creator wyr: 判断和设置当前列表是否有选中的元素
         * @param items
         */
        function setIsSelectItems(items: Array<boolean>){
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
            if(vm.isSelectItems !== result){
                vm.isSelectItems = result;
            }
        }

        //条件搜索任务列表
        function onClickSearch(){
            if (vm.findListParams.areaId) {
                if (vm.findListParams.startTime && vm.findListParams.endTime) {
                    if (vm.findListParams.startTime > vm.findListParams.endTime) {
                        layer.msg(i18nFactory("DP_CONFIG_COMMON_85"));
                        return;
                    } else {

                    }
                }
                vm.findListParams.currentPage = 1;
                getListByParams(vm.findListParams);
            }
        };


        function initFindTaskListParams():TaskListParams{
            let newParams = new TaskListParams();
            newParams.areaId = '';
            newParams.type = '';
            newParams.state = '';
            newParams.startTime = null;
            newParams.endTime = null;
            newParams.name = '';
            // newParams.pageSize = '';
            newParams.currentPage = 1;
            return newParams;
        }

        // 表格列表相关
        function getListByParams(params:TaskListParams){
            this.taskService.findListByParams(params).then((resp:ResponseResult<Array<any>>)=>{
                if(resp && resp.code == 200){
                    this.setTaskListToCache(resp.data);
                }else{
                    this.setTaskListToCache([]);
                }
            });
        };
    }

    public addLamp(area: AreaEx) {
        let scope: {curdType: string,treeDatas:Array<AreaEx>, currentArea: AreaEx, $destroy: Function} = this.$scope.$new();
        scope.curdType = 'add';
        // 传入area区域
        scope.currentArea = area as AreaEx;
        scope.treeDatas = this.AreaTreeDataParams.treeDatas as Array<AreaEx>;
        // 这里对scope进行一次新建
        this.currentLayerIndex = this.layer.open({
            type: 1,
            scope: scope,
            skin: "no-scroll",
            area:["650px","490px"],
            content: lampPopup,
            title: [this.i18nFactory('DP_CONFIG_LAMP_06'),"color:'#F6F8FB';font-size:14px"],
            end: function () {
                scope.$destroy();
            },
        });
    }

    // 立杆信息
    private _getCasCadeSearchParams(tableParams: TableListParams){
        if(!tableParams) return {} as CasCadeSearchParams;

        let result = new CasCadeSearchParams();
        result.pageIndex = tableParams.currentPage;
        result.orderField = tableParams.sortName;
        result.pageSize = tableParams.pageSize;
        result.areaId = tableParams.parentId;
        result.isAsc = false;
        result.name = tableParams.areaName;
        return result;
    }
    // 得到LampList赋值给表单
    private getTableList() {
        let that = this;
        this.casCadeService.findLampList(this._getCasCadeSearchParams(this.tableListParams)).then(complete);
        // this.cameraService.findAll().then((result:Array<Camera>)=>{
        //     this.AllCamera = result
        // })
        // this.wifiService.findAll().then((result:Array<Wifi>)=>{
        //     this.AllWifi = result
        // })
        // this.rmpgateService.findAll().then((result:Array<RmpGate>)=>{
        //     this.AllRmpgate = result
        // })
        // this.electronicfenceService.findAll().then((result:Array<ElectronicFence>)=>{
        //     this.AllElectronicFence = result
        // })
        // this.lampService.findSystemPoint().then((result:ResponseResult<Array<SystemPoint>>)=>{
        //     this.SystemPointList = result.data
        // })

        function complete(result: any) {
            console.log('立杆列表++++++++++++++++')
            console.log(result)
            if (result.code === 200) {
                that.$timeout(function () {
                    let pageParams = new PageParams();
                    pageParams.pageSize = that.tableListParams.pageSize;
                    pageParams.currentPage = that.tableListParams.currentPage;
                    pageParams.totalCount = result.count;
                    that.tBodyList = result.data || [];
                    that.pageParams = pageParams;
                    that.tableDatas = result.data;
                    if(that.tBodyList && that.tBodyList.length>0){
                        that.tableNoData = false;
                    }else{
                        that.tableNoData = true;
                    }
                });
            } else {
                that.$timeout(function(){
                    that.tableNoData = true;
                });
            }
        }
    }

    // 获取灯杆相关的所有设备关系表
    private getAllLampRalation(id:string){
        return this.lampService.findLampDeviceRelationById(id).then((res:BackResponseBody<Array<Relation>>)=>{
            this.allLampDeviceRalation = res.data
        })
    }

    // // 点击编辑时找到所有和编辑灯杆相关的设备ID
    private getAllLampAboutDevice(id: string){
        let allDeviceOnTheLamp = [] as Array<Relation>
        this.allLampDeviceRalation.forEach((relation:Relation)=>{
            if(relation.ObjectId==id){
                allDeviceOnTheLamp.push(relation)
            }
        });
        return allDeviceOnTheLamp
    }

    /*获取行政区域树*/
    private getTreeList() {
        var that = this
        this.areaService.findListTree({keyword: this.treeSearchInput}).then(complete);
        function complete(result: Array<AreaEx>) {
            that.$timeout(function () {
                that.AreaTreeDataParams.treeDatas = result;
                if(result && result.length>0){
                    that.treeNoData = false;
                }else{
                    that.treeNoData = true;
                }
            });
        }
    }

}
app.controller('baseConfigLampController', BaseConfigLampController);

