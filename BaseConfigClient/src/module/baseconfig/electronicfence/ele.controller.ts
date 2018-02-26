/**
 * Created by dell on 2017/3/23.
 */
/// <amd-dependency path="text!./ele.popupElectronic.html" name="popupElectronicHtml" />
/// <amd-dependency path="text!./ele.popupLamp.html" name="popupLampHtml" />
/// <amd-dependency path="text!./ele.eleCreate.html" name="createHtml" />
import "css!../css/baseconfig-device.css";
import "css!../css/baseconfig-electronic.css";
import {app} from "../../common/app/main.app";

import "./ele.popupElectronic.controller";
import "./ele.popupLamp.controller";
import "./ele.eleCreate.controller";

import "../../common/services/area.service";
import "../../common/services/electronicfence.service";
import {ITableHeader} from "../../common/directive/unit-table/table-params";
import {TreeDataParams} from "../../common/directive/tree/tree-params";
import {IAreaService} from "../../common/services/area.service";
import {IElectronicFenceService} from "../../common/services/electronicfence.service";
import PageParams from "../../common/directive/page/page-params";
import {ICasCadeService, CasCadeSearchParams} from "../../common/services/casecade.service";
//import {ElectronicFenceTableParams} from "../../../core/params/ElectronicFenceParams";

import {AreaEx} from "../../../core/entity/ex/AreaEx";
import {TreeParams} from "../../../core/params/tree/TreeParams";
import {Area} from "../../../core/entity/Area";
import {Enum} from "../../../core/enum/Enum";
import {ElectronicTypeEnum} from "../../../core/server/enum/ElectronicTypeEnum";
import {ElectronicFenceEx} from '../../../core/entity/ex/ElectronicFenceEx';
import {ElectronicFence} from '../../../core/entity/ElectronicFence';
import {
    ElectronicFenceListParams,
    ElectronicFenceChangeElectronicFenceType
} from "../../../core/params/ElectronicFenceParams";
import {RmpGateEx} from '../../../core/entity/ex/RmpGateEx';
// 编辑、删除数据类型
//import { ElectronicFence } from '../../../core/entity/ElectronicFence';
import {ResponseResult, PageResult} from "../../../core/params/result/ResponseResult";

declare var popupElectronicHtml: any;
declare var createHtml: any;
declare var popupLampHtml: any;

class baseConfigElectronicFenceController {
    //注入electronic.service.ts里面的electronicService
    static $inject = ['$scope', '$timeout', 'electronicfenceService', 'areaService', 'layer', 'casCadeService', 'i18nFactory'];

    findListParams: ElectronicFenceListParams;
    pageParams: PageParams;

    //---table
    // table 列表数据
    tHeadList: Array<ITableHeader>;
    tBodyList: any;
    Type: string;
    tableNoData: boolean;
    SearchParams: any;
    // tableListParams: TableListParams = new TableListParams();


    //area tree
    areaTreeDatas: TreeDataParams<Area>;
    //search
    areaTreeSearchInputStr: string = "";

    //多选相关
    selectedList: Array<boolean>;
    isSelectAll: boolean;

    currentLayerIndex: number;

    ElectronicFenceTypeList: { value: string, text: string }[];

    isSelectItems: boolean;

    selectedElectronicFenceType: string;

    constructor(private $scope: any,
                private $timeout: any,
                private electronicfenceService: IElectronicFenceService,
                private areaService: IAreaService,
                private layer: any,
                private casCadeService: ICasCadeService,
                private i18nFactory: any) {
        this.initParams();
        // 树列表数据
        //初始化 area 树数据
        this.areaTreeDatas = new TreeDataParams<AreaEx>();
        this.areaTreeDatas.treeId = 'areaTreeIvs';
        this.areaTreeDatas.isDefaultSelected = true;
        this.areaTreeDatas.onClick = (event: MouseEvent, treeId: string, treeNode: AreaEx) => {

            if (treeNode.ID == this.findListParams.areaId) {
                if (this.tBodyList) {
                    return;
                }
            }
            //init req_params
            this.findListParams.areaId = treeNode.ID;
            this.findListParams.currentPage = 1;
            this.getListByParams(this.findListParams);
        };
        this.getAreaTreeList();

        // 弹出框相关
        $scope.$on("device.closePopup", (event: any, isRefresh?: boolean) => {
            this.closeElectronicChangePopup(isRefresh);
        });
    }

    initParams() {
        this.tableNoData = false;
        this.pageParams = new PageParams();
        this.Type = 'ElectronicFence';
        this.findListParams = new ElectronicFenceListParams();
        this.findListParams.currentPage = 1;
        this.findListParams.pageSize = this.pageParams.pageSize;
        this.findListParams.areaId = "";
        this.findListParams.sortName = "Code";
        this.findListParams.isAsc = true;
        this.SearchParams = {
            Name: ''
        }

        this.tBodyList = [];

        this.setTableHead()
        // for(let i=0,len=ElectronicFenceTypeEnum.length;i<len;){
        //
        // }
        this.ElectronicFenceTypeList = ElectronicTypeEnum;
        this.isSelectItems = false;
    }


    setTableHead = () => {
        this.tHeadList = [
            {field: 'Name', title: 'DP_CONFIG_COMMON_03'},
            {field: 'Code', title: 'DP_CONFIG_COMMON_04'},
            {field: 'Area', title: 'DP_CONFIG_COMMON_09'},
            // {field : 'ServerIp',title:'DP_CONFIG_COMMON_12'},
            {field: 'Longitude', title: 'DP_CONFIG_COMMON_13'},
            {field: 'Latitude', title: 'DP_CONFIG_COMMON_14'},
            {field: 'Operate', title: 'DP_CONFIG_COMMON_15'},
        ];
    }

    onClickTaskTypeBtn = (btnItemValue: string): void => {
        if (btnItemValue === this.Type) return;
        this.Type = btnItemValue;
        this.getListByParams(this.findListParams)
    };

    _getCasCadeSearchParams(tableParams: ElectronicFenceListParams) {
        if (!tableParams) return {} as CasCadeSearchParams;
        let result = new CasCadeSearchParams();
        result.pageIndex = tableParams.currentPage;
        result.orderField = tableParams.sortName;
        result.pageSize = tableParams.pageSize;
        result.areaId = tableParams.areaId;
        result.isAsc = tableParams.isAsc;
        if (tableParams.Name) {
            result.name = tableParams.Name;
        }
        return result;
    }

    _getSearchType() {
        return this.Type
    }

    getListByParams(params: ElectronicFenceListParams) {
        this.casCadeService.findElectronicFenceList(this._getCasCadeSearchParams(params)).then((res: ResponseResult<Array<ElectronicFenceEx>>) => {
            if (res && res.data && res.code === 200) {
                this.setTableBody(res.data, res.count);
            } else {
                this.setTableBody([], 0);
            }
            this.findListParams = params;
        });

    }

    setTableBody(dataList: any, total: number) {
        if (dataList && dataList.length > 0) {
            this.tBodyList = dataList;
            this.tableNoData = false;

            let _pageParams = new PageParams();
            _pageParams.currentPage = this.findListParams.currentPage;
            _pageParams.pageSize = this.findListParams.pageSize;
            _pageParams.setTotalCount(total);

            this.pageParams = _pageParams;
        } else {
            this.tBodyList = [];
            this.tableNoData = true;
        }
    }

    // 数据获取
    getAreaTreeList(keyword?: string) {
        //ITreeParams
        let params: TreeParams = this.areaTreeDatas.reqParams;
        params.keyword = keyword;
        this.areaService.findListTree(params).then((resp: Array<AreaEx>) => {
            if (resp) {
                this.areaTreeDatas.finishedNoData = false;
            } else {
                this.areaTreeDatas.finishedNoData = true;
            }
            this.$timeout(() => {
                this.setAreaTreeDatas(resp);
            });
        })
    };

    // 树搜索
    areaTreeSearchInputKeyUp(e: any) {
        if (e.keyCode === 13) {
            this.getAreaTreeList(this.areaTreeSearchInputStr);
        }
    };

    // 树搜索
    areaTreeSearchInput() {
        this.getAreaTreeList(this.areaTreeSearchInputStr);
    };

    // 树赋值
    setAreaTreeDatas(treeDatas: Array<AreaEx>) {
        this.areaTreeDatas.treeDatas = treeDatas;
    };

    // 单栏选择排序
    sortByField(_index: number, field: string, sortStatus: boolean) {

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
    afterChangeCheck(resultList: Array<boolean>, isCheckAll: boolean): void {
        this.setIsSelectItems(resultList);
        this.selectedList = resultList;
        this.isSelectAll = isCheckAll;
    };

    //获取当前已被选中列表
    getSelectedList(): Array<ElectronicFenceEx> {
        let selectedDataList: Array<ElectronicFenceEx> = [];
        if (this.selectedList) {
            this.tBodyList.forEach((ivsServer: ElectronicFenceEx, index: number) => {
                if (this.selectedList[index]) {
                    selectedDataList.push(ivsServer);
                }
            });
        }
        return selectedDataList;
    };

    //批量配置立杆
    create() {
        let scope: { $destroy: Function } = this.$scope.$new();
        // 这里对scope进行一次新建
        this.currentLayerIndex = this.layer.open({
            type: 1,
            content: popupElectronicHtml,
            scope: scope,
            title: this.i18nFactory('DP_CONFIG_COMMON_07'),
            area: ["570px", "510px"],
            end: function () {
                scope.$destroy();
            }
        });
    }

    // 批量配置区域
    configDevices(type: string) {
        let scope: { type: string, $destroy: Function } = this.$scope.$new();
        scope.type = type
        // 这里对scope进行一次新建
        if (type === 'area') {
            // 这里对scope进行一次新建
            this.currentLayerIndex = this.layer.open({
                type: 1,
                content: popupElectronicHtml,
                scope: scope,
                title: this.i18nFactory("DP_CONFIG_COMMON_08"),
                area: ["570px", "auto"],
                end: function () {
                    scope.$destroy();
                }
            });
        } else {
            // 这里对scope进行一次新建
            this.currentLayerIndex = this.layer.open({
                type: 1,
                content: popupElectronicHtml,
                scope: scope,
                title: this.i18nFactory("DP_CONFIG_COMMON_07"),
                area: ["570px", "auto"],
                end: function () {
                    scope.$destroy();
                }
            });
        }
    }

    //about page click
    changePage(num: number) {
        this.findListParams.currentPage = num;
        this.getListByParams(this.findListParams);
    }

    changePageSize(num: number) {
        this.findListParams.currentPage = 1;
        this.findListParams.pageSize = num;
        this.getListByParams(this.findListParams);
    }

    closeElectronicChangePopup(flag?: boolean) {
        this.layer.close(this.currentLayerIndex);
        this.currentLayerIndex = -1;
        if (flag) {
            // 刷新界面
            this.findListParams.currentPage = 1;
            this.$timeout(() => {
                this.getListByParams(this.findListParams);
            }, 2000)
        }
    }


    /**
     * creator wyr: 判断和设置当前列表是否有选中的元素
     * @param items
     */
    setIsSelectItems(items: Array<boolean>) {
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
        if (this.isSelectItems !== result) {
            this.isSelectItems = result;
        }
    }

    setLamp(data: ElectronicFence) {

        let scope: { deviceData: ElectronicFence, type: string, $destroy: Function } = this.$scope.$new();
        scope.deviceData = data
        scope.type = this.Type
        // 这里对scope进行一次新建
        this.currentLayerIndex = this.layer.open({
            type: 1,
            content: popupLampHtml,
            scope: scope,
            title: this.i18nFactory('DP_CONFIG_COMMON_17'),
            area: ["300px", "480px"],
            end: function () {
                scope.$destroy();
            }
        });
    }

    search() {
        this.findListParams.Name = this.SearchParams.Name;
        this.getListByParams(this.findListParams);
    }

    //编辑操作
    editAreaTd(data: ElectronicFence) {
        let scope: { id: string, ElectronicFenceData: ElectronicFence, areaDatas: any, type: string, $destroy: Function } = this.$scope.$new();
        scope.id = this.findListParams.areaId;
        scope.ElectronicFenceData = data as ElectronicFence;
        scope.areaDatas = this.areaTreeDatas.treeDatas;
        // 这里对scope进行一次新建
        this.currentLayerIndex = this.layer.open({
            type: 1,
            content: createHtml,
            scope: scope,
            title: this.i18nFactory('DP_CONFIG_ELECTRONICFENCE_02'),
            area: ["350px", "auto"],
            end: function () {
                scope.$destroy();
            }
        });

    }
}

app
    .controller('baseConfigElectronicFenceController', baseConfigElectronicFenceController);