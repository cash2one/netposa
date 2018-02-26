/**
 20 * Created by dell on 2017/4/13.
 */
/// <amd-dependency path="text!./unit.popup.html" name="popupHtml" />
import "css!../css/baseconfig-unit.css";
import "css!../style/baseconfig-area.css";
import {app} from "../../common/app/main.app";
import '../../common/services/unit.service';
import '../../common/services/area.service';
import "./unit.popup.controller";
import PageParams from "../../common/directive/page/page-params";
import {UnitListParams} from "../../../core/params/UnitParams"
import {Unit} from "../../../core/entity/Unit";
import {UnitEx} from "../../../core/entity/ex/UnitEx";
import {Area} from "../../../core/entity/Area";
import {AreaEx} from "../../../core/entity/ex/AreaEx";
import {PageResult, ResponseResult} from "../../../core/params/result/ResponseResult"
import {TreeParams} from "../../../core/params/tree/TreeParams";
import {IUnitService} from "../../common/services/unit.service";
import {IAreaService} from "../../common/services/area.service";

import {ITableHeader} from "../../common/directive/unit-table/table-params";
import {ITreeDataParams, TreeDataParams} from "../../common/directive/tree/tree-params";
import {ICasCadeService, CasCadeSearchParams} from "../../common/services/casecade.service";

declare var popupHtml: any;

class TableParams extends UnitListParams {

    constructor() {
        super();
        this.currentPage = 1;
        this.pageSize = 10;
        this.sortName = 'Code';
        this.isAsc = false;
    };
}

class BaseConfigUnitController {
    static $inject = ['$scope', '$timeout', 'unitService', 'areaService', 'layer', 'casCadeService', 'i18nFactory'];

    // 树控件相关

    treeSearchInput: string;
    treeSearchInputFunc: ()=>void;
    treeSearchInputKeyUp: ($event: Event)=>void;

    editTd: Function;
    deleteTd: Function;
    pageParams: PageParams;
    currentUnit: Unit;
    tableListParams: TableParams;
    changePage: Function;
    changePageSize: (num: number)=>void;
    currentArea: Area;
    addUnit: Function;
    currentLayerIndex: number;
    tableSearchInput: string;


    // table 列表数据
    tHeadList: Array<ITableHeader>;
    tBodyList: Array<Unit>;
    tableSearchInputFunc: ()=>void;
    tableSearchInputKeyUp: ($event: KeyboardEvent)=>void;
    // 排序回调
    sortByField: Function;


    tableNoData: boolean = false;

    // // 选择行政区域树
    areaTreeDataParams: ITreeDataParams<AreaEx>;
    treeNoData: boolean = false;

    //多选相关
    selectedList: Array<boolean>;
    isSelectAll: boolean;
    afterChangeCheck: Function;
    deleteByIds: Function;

    // 列表是否有选中项
    isSelectItems: boolean;

    constructor($scope: any, $timeout: any, unitService: IUnitService, areaService: IAreaService, layer: any, casCadeService: ICasCadeService, i18nFactory: any) {
        let vm = this;

        vm.isSelectItems = false;
        // 树列表数据
        vm.treeSearchInputFunc = treeSearchInputFunc;
        vm.treeSearchInputKeyUp = treeSearchInputKeyUp;
        //初始化 area 树数据
        vm.areaTreeDataParams = new TreeDataParams<AreaEx>();
        vm.areaTreeDataParams.treeId = 'areaTreeArea';
        vm.areaTreeDataParams.isDefaultSelected = true;
        vm.areaTreeDataParams.onClick = treeSelectNode;
        vm.areaTreeDataParams.treeInitComplete = treeInitComplete;

        vm.treeSearchInput;
        vm.currentArea = {} as Area;


        // 表格数据
        //-------------
        vm.tHeadList = [
            {field: "Name", title: "DP_CONFIG_AREA_07"},
            {field: "Code", title: "DP_CONFIG_AREA_08"},
            {field: "Description", title: "DP_CONFIG_AREA_05"},
            {field: "bottoms", title: "DP_CONFIG_COMMON_15"}
        ];
        vm.tBodyList = [];

        // 表格数据
        vm.editTd = editTd;
        vm.deleteTd = deleteTd;
        vm.pageParams = new PageParams();
        vm.tableListParams = new TableParams();

        //追加排序参数
        vm.tableListParams.sortName = 'Code';
        vm.tableListParams.isAsc = true;
        vm.sortByField = sortByField;

        vm.addUnit = addUnit;
        vm.tableSearchInput;
        vm.tableSearchInputFunc = tableSearchInputFunc;
        vm.tableSearchInputKeyUp = tableSearchInputKeyUp;

        // 分页控件
        vm.changePage = changePage;
        vm.changePageSize = changePageSize;

        //多选相关
        vm.selectedList = [];
        vm.isSelectAll = false;
        vm.afterChangeCheck = afterChangeCheck;
        vm.deleteByIds = deleteByIds;

        $scope.$on("unit.closePopup", (event: any, isRefresh?: boolean) =>{
            layer.close(this.currentLayerIndex);
            if (isRefresh) {
                $timeout(()=>{
                    getTableList()
                },2000);
            }
        });

        // 页面渲染入口
        getTreeList();

        function tableSearchInputFunc() {
            vm.tableListParams.unitName = vm.tableSearchInput;
            vm.tableListParams.currentPage = 1;
            getTableList();
        }

        function tableSearchInputKeyUp(e: KeyboardEvent) {
            if (e.keyCode === 13) {
                vm.tableListParams.unitName = vm.tableSearchInput;
                vm.tableListParams.currentPage = 1;
                getTableList();
            }
        }

        function treeSearchInputFunc() {
            getTreeList();
        }

        function treeSearchInputKeyUp(e: KeyboardEvent) {
            if (e.keyCode === 13) {
                getTreeList();
            }
        }

        function getTreeList() {
            areaService.findListTree({keyword: vm.treeSearchInput} as TreeParams).then(complete);

            function complete(data: Array<AreaEx>) {
                $timeout(function () {
                    // 由于res.Data值没变，为了触发树刷新, 则手动hack触发
                    if (data && data.length > 0) {
                        vm.treeNoData = false;
                    } else {
                        vm.treeNoData = true;
                    }
                    vm.areaTreeDataParams.treeDatas = null;
                });

                $timeout(function () {
                    vm.areaTreeDataParams.treeDatas = data;
                });
            }
        }

        function _getCasCadeSearchParams(tableParams: TableParams) {
            if (!tableParams) return {} as CasCadeSearchParams;
            let result = new CasCadeSearchParams();
            result.pageIndex = tableParams.currentPage;
            result.orderField = tableParams.sortName;
            result.pageSize = tableParams.pageSize;
            result.areaId = tableParams.parentId;
            result.isAsc = false;
            result.name = tableParams.unitName;
            return result;
        }

        function getTableList() {

            casCadeService.findUnitList(_getCasCadeSearchParams(vm.tableListParams)).then(complete).then(initPageParams);

            function complete(res: ResponseResult<Array<Unit>>) {
                if (res && res.code === 200 && res.data) {
                    $timeout(function () {
                        if (res.data && res.data.length > 0) {
                            vm.tableNoData = false;
                            vm.tBodyList = res.data;
                        } else {
                            vm.tableNoData = true;
                            vm.tBodyList = [];
                        }
                    });
                }
                return res;
            }

            // 渲染分页
            function initPageParams(data: ResponseResult<Array<Unit>>) {
                let totalCount = (data || {} as ResponseResult<Array<Unit>>).count;
                let pageParams = new PageParams();
                pageParams.currentPage = vm.tableListParams.currentPage;
                pageParams.pageSize = vm.tableListParams.pageSize;
                pageParams.totalCount = totalCount;

                $timeout(()=> {
                    vm.pageParams = pageParams; // 会触发插件中的更新操作
                });
            }
        }

        // function closeUnitPopup(event: any, isRefresh?: boolean) {
        //     event.preventDefault();
        //     layer.close(vm.currentLayerIndex);
        //     if (isRefresh) {
        //         this.$timeout(()=>{
        //             getTreeList();
        //         })
        //     }
        // }

        function changePage(num: number) {
            vm.tableListParams.currentPage = num;
            getTableList();
        }

        function changePageSize(num: number) {
            vm.tableListParams.pageSize = num;
            vm.tableListParams.currentPage = 1;
            getTableList();
        }

        function addUnit(area: Area) {

            let scope: {curdType: string, currentArea: Area, $destroy: Function} = $scope.$new();
            scope.curdType = "add";
            scope.currentArea = area;

            vm.currentLayerIndex = layer.open({
                type: 1,
                content: popupHtml,
                scope: scope,
                title: i18nFactory('DP_CONFIG_COMMON_40'),
                area: ["500px", "auto"],
                end: function () {
                    scope.$destroy();
                }
            });
        }

        function deleteTd(unit: UnitEx) {
            layer.confirm(i18nFactory("DP_CONFIG_COMMON_43"), {
                icon: 0,
                title: i18nFactory("DP_CONFIG_COMMON_42"),
                area: ["500px", "200px"]
            }, function (index: number) {
                layer.close(index);
                submitDeleteUnit(unit);
            });
        }

        function submitDeleteUnit(unit: UnitEx) {
            unitService.deleteById(unit).then(complete);

            function complete(res: ResponseResult<string>) {
                if (res.code === 200) {
                    $timeout(()=>{
                        getTreeList();
                    },1000)
                } else {
                }
            }
        }

        function editTd(unit: Unit) {
            let scope: {curdType: string, currentUnit: Unit, $destroy: Function} = $scope.$new();
            scope.curdType = "edit";
            scope.currentUnit = unit as Unit;

            vm.currentLayerIndex = layer.open({
                type: 1,
                content: popupHtml,
                scope: scope,
                title: i18nFactory("DP_CONFIG_AREA_10"),
                area: ["500px", "auto"],
                end: function () {
                    scope.$destroy();
                }
            });
        }

        function treeInitComplete() {
        }

        function treeSelectNode(event: MouseEvent, treeId: string, treeNode: Area) {
            vm.currentArea = treeNode;

            vm.areaTreeDataParams.defaultSelectTreeId = treeNode.ID;

            vm.tableListParams.parentId = treeNode.ID;
            vm.tableListParams.currentPage = 1;
            getTableList();
        }


        // 打钩 选择 回调
        function afterChangeCheck(resultList: Array<boolean>, isCheckAll: boolean): void {
            setIsSelectItems(resultList);
            this.selectedList = resultList;
            this.isSelectAll = isCheckAll;
        }

        //获取当前已被选中列表
        function getSelectedList(): Array<Unit> {
            let selectedDataList: Array<Unit> = [];
            if (vm.selectedList) {
                vm.tBodyList.forEach((_data: Unit, _index: number) => {
                    if (vm.selectedList[_index]) {
                        selectedDataList.push(_data);
                    }
                });
            }
            return selectedDataList;
        }

        //多个删除
        function deleteByIds() {

            let selectedDataList: Array<Unit> = getSelectedList();
            if (!selectedDataList || selectedDataList.length == 0) {
                layer.msg(i18nFactory("DP_CONFIG_COMMON_84"));
                return;
            }
            let ids: Array<string> = [];

            selectedDataList.forEach((_data: Unit) => {
                ids.push(_data.ID);
            });

            //let showText = `确定要删除选中的 ${ ids.length } 条行政单位吗?删除此行政单位会级联删除所有关联的数据(包含服务,配置等) `;
            layer.confirm(i18nFactory("DP_CONFIG_COMMON_43", {value: ids.length}), {
                icon: 0,
                title: i18nFactory('DP_CONFIG_COMMON_42'),
                area: ["500px", "200px"]
            }, (index: number) => {
                layer.close(index);
                submitDeleteByIds(ids);
            });

        }

        //提交删除
        function submitDeleteByIds(ids: Array<string>) {
            unitService.deleteByIds(ids).then((resp: ResponseResult<string>) => {
                if (resp.code == 200) {
                    vm.tableListParams.currentPage = 1;
                    $timeout(()=>{
                        getTableList();
                    },1000)
                } else {

                }
            });
        }

        // 排序
        function sortByField(index: number, fieldName: string, sortStatus: boolean) {
            vm.tableListParams.isAsc = sortStatus;
            vm.tableListParams.sortName = fieldName;
            getTableList();
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
    };
}

app.controller("baseConfigUnitController", BaseConfigUnitController);