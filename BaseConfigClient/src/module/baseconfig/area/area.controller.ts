/**
 * Created by dell on 2017/3/23.
 */
/// <amd-dependency path="text!./area.popup.html" name="popupHtml" />
import "css!../css/baseconfig-area.css";
import "css!../style/baseconfig-area.css";
import {app} from "../../common/app/main.app";
import './area.popup.controller';
import '../../common/services/area.service';
import PageParams from "../../common/directive/page/page-params";
import {IAreaService} from "../../common/services/area.service";
import {ITableHeader} from "../../common/directive/unit-table/table-params";
import {ITreeDataParams, TreeDataParams} from "../../common/directive/tree/tree-params";
import {AreaTableParams} from "../../../core/params/AreaParams";
import {Area} from "../../../core/entity/Area";
import {AreaEx} from "../../../core/entity/ex/AreaEx";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {ICasCadeService, CasCadeSearchParams} from "../../common/services/casecade.service";


declare var popupHtml: any;

class TableListParams extends AreaTableParams {

    constructor() {
        super();
        this.sortName = 'Code';
        this.isAsc = false;
        this.pageSize = new PageParams().pageSize;
        this.currentPage = new PageParams().currentPage;
    };
}

class BaseConfigAreaController {
    static $inject = ['$scope', '$timeout', 'areaService', 'layer', 'casCadeService', 'i18nFactory'];

    treeSearchInput: string;
    treeSearchInputFunc: Function;
    tableSearchInput: string;
    tableSearchInputFunc: Function;

    editAreaTd: Function;
    deleteAreaTd: Function;
    currentArea: Area;
    tableListParams: TableListParams;

    pageParams: PageParams;

    editArea: Function;
    addArea: Function;
    deleteArea: Function;
    currentLayerIndex: number;

    tableDatas: Array<any>;
    defaultSelectTreeId: string;

    tableSearchInputKeyUp: Function;
    treeSearchInputKeyUp: Function;

    changePage: Function;
    changePageSize: Function;

    // table 列表数据
    tHeadList: Array<ITableHeader>;
    tBodyList: Array<AreaEx>;

    tableNoData: boolean = false;

    // // 选择行政区域树
    areaTreeDataParams: ITreeDataParams<AreaEx>;
    treeNoData: boolean = false;
    //多选相关
    selectedList: Array<boolean>;
    isSelectAll: boolean;
    afterChangeCheck: Function;
    deleteByIds: Function;

    //排序回调
    sortByField: Function;

    isSelectItems: boolean;

    constructor($scope: any, $timeout: Function, areaService: IAreaService, layer: any, casCadeService: ICasCadeService, i18nFactory: any) {

        let vm = this;

        // 树列表数据
        //初始化 area 树数据
        vm.areaTreeDataParams = new TreeDataParams<AreaEx>();
        vm.areaTreeDataParams.treeId = 'areaTreeArea';
        vm.areaTreeDataParams.isDefaultSelected = true;
        vm.areaTreeDataParams.onClick = treeSelectNode;
        vm.areaTreeDataParams.treeInitComplete = treeInitComplete;

        // 树列表数据
        vm.treeSearchInput;
        vm.treeSearchInputFunc = treeSearchInputFunc;
        vm.treeSearchInputKeyUp = treeSearchInputKeyUp;

        // 表格数据
        //-------------
        vm.tHeadList = [
            {field: "Name", title: "DP_CONFIG_COMMON_32"},
            {field: "Code", title: "DP_CONFIG_COMMON_33"},
            // { field: "mechanismType", title: "机构类型"},
            // { field: "Contacts", title: "联系人"},
            // { field: "ContactNumber", title: "联系电话"},
            {field: "Description", title: "DP_CONFIG_COMMON_34"},
            {field: "bottoms", title: "DP_CONFIG_COMMON_35"}
        ];
        vm.tBodyList = [];

        vm.isSelectItems = false;

        vm.editAreaTd = editAreaTd;
        vm.deleteAreaTd = deleteAreaTd;
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
        vm.changePageSize = changePageSize;

        //多选相关
        vm.selectedList = [];
        vm.isSelectAll = false;
        vm.afterChangeCheck = afterChangeCheck;
        vm.deleteByIds = deleteByIds;

        // 信息条数据
        vm.editArea = editArea;
        vm.addArea = addArea;
        vm.deleteArea = deleteArea;

        // 弹出框相关
        // $scope.$on("area.closePopup", closeAreaPopup);
        $scope.$on("area.closePopup", (event: any, isRefresh?: boolean) => {
            layer.close(vm.currentLayerIndex);
            if (isRefresh) {
                getTreeList();
            }
        });

        getTreeList();

        function treeSearchInputKeyUp(e: any) {
            if (e.keyCode === 13) {
                getTreeList();
            }
        }

        function tableSearchInputKeyUp(e: any) {
            if (e.keyCode === 13) {
                vm.tableListParams.areaName = vm.tableSearchInput;
                vm.tableListParams.currentPage = 1;
                getTableList();
            }
        }

        function treeSearchInputFunc() {
            getTreeList();
        }

        function tableSearchInputFunc() {
            vm.tableListParams.areaName = vm.tableSearchInput;
            vm.tableListParams.currentPage = 1;
            getTableList();
        }

        function addArea(area: AreaEx) {
            // 由于layer需要传scope对象, 但现在命名参数都放在vm中, 故使用scope.$new新建一个scope传入

            let scope: { curdType: string, currentArea: AreaEx, $destroy: Function } = $scope.$new();
            scope.curdType = 'add';
            scope.currentArea = area as AreaEx;
            // 这里对scope进行一次新建

            vm.currentLayerIndex = layer.open({
                type: 1,
                content: popupHtml,
                scope: scope,
                skin: "no-scroll",
                title: i18nFactory('DP_CONFIG_COMMON_40'),
                area: ["450px", "auto"],
                end: function () {
                    scope.$destroy();
                }
            });
        }

        function editArea(area: Area) {

            let scope: { curdType: string, currentArea: AreaEx, $destroy: Function } = $scope.$new();
            scope.curdType = 'edit';
            scope.currentArea = area as AreaEx;

            vm.currentLayerIndex = layer.open({
                type: 1,
                content: popupHtml,
                scope: scope,
                skin: "no-scroll",
                title: i18nFactory('DP_CONFIG_AREA_06'),
                area: ["450px", "auto"],
                end: function () {
                    scope.$destroy();
                }
            });
        }

        function deleteArea(area: Area) {

            layer.confirm(i18nFactory('DP_CONFIG_COMMON_41'), {
                icon: 0,
                title: i18nFactory('DP_CONFIG_COMMON_42'),
                area: ["500px", "200px"]
            }, function (index: number) {
                layer.close(index);
                layer.confirm(i18nFactory('DP_CONFIG_COMMON_43'), {
                    icon: 0,
                    title: i18nFactory('DP_CONFIG_COMMON_42'),
                    area: ["500px", "200px"]
                }, function (index: number) {
                    layer.close(index);
                    submitDeleteArea(area);
                });
            });
        }

        function submitDeleteArea(area: Area) {
            areaService.deleteById(area).then(complete);

            function complete(res: ResponseResult<string>) {
                if (res.code === 200) {
                    // 刷新整个列表
                    vm.tableListParams.currentPage = 1;
                    $timeout(() => {
                        getTreeList();
                    }, 1000);
                } else {
                }
            }
        }

        function editAreaTd(area: Area) {
            editArea(area);
        }

        function deleteAreaTd(area: Area) {
            deleteArea(area);
        }

        function treeInitComplete(treeId: string) {
        }

        function treeSelectNode(event: MouseEvent, treeId: string, treeNode: Area) {
            // 缓存选中的结点ID
            vm.areaTreeDataParams.defaultSelectTreeId = treeNode.ID;
            vm.tableListParams.currentPage = 1;
            vm.tableListParams.parentId = treeNode.ID;
            getTableList();

            $timeout(() => {
                vm.currentArea = treeNode;
            });
        }

        function _getCasCadeSearchParams(tableParams: TableListParams) {
            if (!tableParams) return {} as CasCadeSearchParams;

            let result = new CasCadeSearchParams();
            result.pageIndex = tableParams.currentPage;
            // result.orderField = tableParams.sortName;
            result.pageSize = tableParams.pageSize;
            result.areaId = tableParams.parentId;
            result.isAsc = false;
            result.name = tableParams.areaName;
            return result;
        }

        function getTableList() {

            casCadeService.findAreaList(_getCasCadeSearchParams(vm.tableListParams)).then(complete);

            function complete(result: ResponseResult<Array<AreaEx>>) {

                if (result.code === 200) {
                    let pageParams = new PageParams();
                    pageParams.pageSize = vm.tableListParams.pageSize;
                    pageParams.currentPage = vm.tableListParams.currentPage;
                    pageParams.totalCount = result.count;

                    vm.tBodyList = result.data || [];
                    vm.pageParams = pageParams;
                    vm.tableDatas = result.data;
                    $timeout(function () {
                        if (vm.tBodyList && vm.tBodyList.length > 0) {
                            vm.tableNoData = false;
                        } else {
                            vm.tableNoData = true;
                        }
                    }, 1500);
                } else {
                    $timeout(function () {
                        vm.tableNoData = true;
                    });
                }
            }
        }

        function getTreeList() {
            areaService.findListTree({keyword: vm.treeSearchInput}).then(complete);

            function complete(result: Array<AreaEx>) {
                vm.areaTreeDataParams.treeDatas = result;
                vm.treeNoData = !(result && result.length > 0);
            }
        }

        function changePage(num: number) {
            vm.tableListParams.currentPage = num;
            getTableList();
        }

        function changePageSize(num: number) {
            vm.tableListParams.currentPage = 1;
            vm.tableListParams.pageSize = num;
            getTableList();
        }

        // 打钩 选择 回调
        function afterChangeCheck(resultList: Array<boolean>, isCheckAll: boolean): void {
            setIsSelectItems(resultList);
            vm.selectedList = resultList;
            vm.isSelectAll = isCheckAll;
        }

        //获取当前已被选中列表
        function getSelectedList(): Array<Area> {
            let selectedDataList: Array<Area> = [];
            if (vm.selectedList) {
                vm.tBodyList.forEach((_data: Area, _index: number) => {
                    if (vm.selectedList[_index]) {
                        selectedDataList.push(_data);
                    }
                });
            }
            return selectedDataList;
        }

        //多个删除
        function deleteByIds() {
            let selectedDataList: Array<Area> = getSelectedList();
            if (!selectedDataList || selectedDataList.length == 0) {
                layer.msg(i18nFactory("FDS_00_04_01"));
                return;
            }
            let ids: Array<string> = [];

            selectedDataList.forEach((_data: Area) => {
                ids.push(_data.ID);
            });
            let showText = i18nFactory('FDS_01_01_13', {value: ids.length});
            layer.confirm(showText, {
                icon: 0,
                title: i18nFactory('DP_CONFIG_COMMON_42'),
                area: ["500px", "200px"]
            }, (index: number) => {
                layer.close(index);
                layer.confirm(i18nFactory('DP_CONFIG_COMMON_43'), {
                    icon: 0,
                    title: i18nFactory('DP_CONFIG_COMMON_42'),
                    area: ["500px", "200px"]
                }, function (index: number) {
                    layer.close(index);
                    submitDeleteByIds(ids);
                });

            });

        }

        //提交删除
        function submitDeleteByIds(ids: Array<string>) {
            areaService.deleteByIds(ids).then((resp: ResponseResult<string>) => {
                if (resp.code == 200) {
                    vm.tableListParams.currentPage = 1;
                    $timeout(() => {
                        getTreeList();
                    }, 1000)
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
        function setIsSelectItems(items: Array<boolean>) {
            let result = false;
            if (items && items.length > 0) {
                let i, len;
                for (i = 0, len = items.length; i < len; i++) {
                    if (items[i]) {
                        result = true;
                        break;
                    }
                }
            }
            if (vm.isSelectItems !== result) {
                vm.isSelectItems = result;
            }
        }
    }


}

app.controller('baseConfigAreaController', BaseConfigAreaController);

