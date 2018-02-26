/**
 * Created by dell on 2017/3/23.
 */
/// <amd-dependency path="text!./camera.popupCamera.html" name="popupCameraHtml" />
/// <amd-dependency path="text!./camera.popupLamp.html" name="popupLampHtml" />
/// <amd-dependency path="text!./camera.cameraCreate.html" name="createHtml" />
import "css!../css/baseconfig-device.css";
import {app} from "../../common/app/main.app";
import "./camera.popupCamera.controller";
import "./camera.popupLamp.controller";
import "./camera.cameraCreate.controller";

import "../../common/services/area.service";
import "../../common/services/camera.service";
import "../../common/filter/app.filter";

import {Enum} from "../../../core/enum/Enum";
import {CameraListParams, CameraChangeCameraType} from "../../../core/params/CameraParams";
import {CameraEx} from "../../../core/entity/ex/CameraEx";
import {ResponseResult, PageResult} from "../../../core/params/result/ResponseResult";
import {ITableHeader} from "../../common/directive/unit-table/table-params";
import {TreeDataParams} from "../../common/directive/tree/tree-params";
import {AreaEx} from "../../../core/entity/ex/AreaEx";
import {TreeParams} from "../../../core/params/tree/TreeParams";
import {IAreaService} from "../../common/services/area.service";
import {ICameraService} from "../../common/services/camera.service";

import PageParams from "../../common/directive/page/page-params";
import {Area} from "../../../core/entity/Area";
import {ICasCadeService, CasCadeSearchParams} from "../../common/services/casecade.service";
import {CameraTypeEnum} from "../../../core/server/enum/CameraTypeEnum";
import {Camera} from '../../../core/entity/Camera';
// import { JsonUserData } from '../../../core/entity/ex/UserEx';
import {IPageParams} from '../../../core/params/table/TableParams';
import {TreeType} from "../../../core/enum/TreeType";


declare let popupCameraHtml: any, angular: any, createHtml: any, popupLampHtml: any;

/* bcDeviceCtrl */
class BaseConfigCameraController {
    static $inject = ['$scope', '$timeout', 'cameraService', 'areaService', 'layer', 'casCadeService', 'i18nFactory'];

    findListParams: CameraListParams;
    pageParams: PageParams;

    //---table
    // table 列表数据
    tHeadListCamera: Array<ITableHeader>;
    ButtonList: Array<Enum>;
    tBodyList: any;
    tableNoData: boolean;
    SearchParams: any;

    //area tree
    areaTreeDatas: TreeDataParams<Area>;
    //search
    areaTreeSearchInputStr: string = "";

    //多选相关
    selectedList: Array<boolean>;
    isSelectAll: boolean;

    currentLayerIndex: number;

    cameraTypeList: { value: string, text: string }[];

    isSelectItems: boolean;

    selectedCameraType: string;
    myoption: string = null;

    constructor(private $scope: any,
                private $timeout: any,
                private cameraService: ICameraService,
                private areaService: IAreaService,
                private layer: any,
                private casCadeService: ICasCadeService,
                private i18nFactory: any) {
        this.initParams();
        this.initTreeParams();
        this.getAreaTreeList();
        // 弹出框相关
        this.$scope.$on("device.closePopup", (event: any, isRefresh?: boolean) => {
            this.closeCameraChangePopup(isRefresh);
        });
    }

    private initTreeParams() {
        this.areaTreeDatas = new TreeDataParams<AreaEx>();
        this.areaTreeDatas.treeId = 'areaTreeIvs';
        this.areaTreeDatas.isDefaultSelected = true;
        this.areaTreeDatas.onClick = (event: MouseEvent, treeId: string, treeNode: AreaEx) => {
            if (treeNode.ID == this.findListParams.areaId) {
                if (this.tBodyList) {
                    return;
                }
            }
            this.findListParams.areaId = treeNode.ID;
            this.findListParams.currentPage = 1;
            this.getListByParams(this.findListParams);
        };
        this.areaTreeDatas.treeInitComplete = (treeID: string) => {};
        this.ButtonList = CameraTypeEnum;
        this.cameraTypeList = CameraTypeEnum;
    }

    private initParams() {
        this.tableNoData = false;
        this.pageParams = new PageParams();
        this.findListParams = new CameraListParams();
        this.findListParams.currentPage = 1;
        this.findListParams.pageSize = this.pageParams.pageSize;
        this.findListParams.areaId = "";
        this.findListParams.sortName = "Code";
        this.findListParams.isAsc = true;
        this.tBodyList = [];

        this.SearchParams = {
            Type: '',
            Name: ''
        }

        this.setTableHead()
        this.isSelectItems = false;
    }

    setTableHead = () => {
        this.tHeadListCamera = [
            {field: 'Name', title: 'DP_CONFIG_COMMON_03'},
            {field: 'Code', title: 'DP_CONFIG_COMMON_04', isSort: false},
            {field: 'JsonUserData.Area.Name', title: 'DP_CONFIG_COMMON_09'},
            // {field: '', title:'服务器IP'},
            {field: 'IpAddress', title: 'DP_CONFIG_COMMON_25'},
            {field: '', title: 'DP_CONFIG_COMMON_13'},
            {field: '', title: 'DP_CONFIG_COMMON_14'},
            {field: '', title: 'DP_CONFIG_COMMON_15'},
        ];
    }

    onClickTaskTypeBtn(myoptin: string) {
        this.SearchParams.Type = myoptin;
    }

    _getCasCadeSearchParams(tableParams: CameraListParams) {
        if (!tableParams) return {} as CasCadeSearchParams;
        let result = new CasCadeSearchParams();
        result.pageIndex = tableParams.currentPage;
        result.orderField = tableParams.sortName;
        result.pageSize = tableParams.pageSize;
        result.areaId = tableParams.areaId;
        result.isAsc = tableParams.isAsc;
        if (this.SearchParams.Name) {
            result.name = this.SearchParams.Name;
        }
        if (this.SearchParams.Type) {
            result.type = this.SearchParams.Type;
        }
        return result;
    }

    getListByParams(params: CameraListParams) {

        this.casCadeService.findCameraList(this._getCasCadeSearchParams(params)).then((res: ResponseResult<Array<CameraEx>>) => {
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
    getSelectedList(): Array<CameraEx> {
        let selectedDataList: Array<CameraEx> = [];
        if (this.selectedList) {
            this.tBodyList.forEach((ivsServer: CameraEx, index: number) => {
                if (this.selectedList[index]) {
                    selectedDataList.push(ivsServer);
                }
            });
        }
        return selectedDataList;
    };

    // configDevices
    configDevices(type: string) {
        let scope: { type: string, $destroy: Function } = this.$scope.$new();
        scope.type = type;
        if (type === TreeType.area.value) {
            // 这里对scope进行一次新建
            this.currentLayerIndex = this.layer.open({
                type: 1,
                content: popupCameraHtml,
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
                content: popupCameraHtml,
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

    closeCameraChangePopup(flag?: boolean) {
        this.layer.close(this.currentLayerIndex);
        this.currentLayerIndex = -1;
        if (flag) {
            // 刷新界面
            this.findListParams.currentPage = 1;
            this.$timeout(()=>{
                this.getListByParams(this.findListParams);
            },2000)
        }
    }

    changeCameraType(model: CameraEx) {
        let models = [{id: model.ID, type: model.CameraType}] as Array<CameraChangeCameraType>;
        this.cameraService.updateCameraType(models);
    }

    changeCameraTypes(type: string) {
        let cameras = this.getSelectedList();
        let models = [] as Array<CameraChangeCameraType>;
        if (cameras && cameras.length > 0) {
            for (let i = 0, len = cameras.length; i < len; i++) {
                models.push({id: cameras[i].ID, type: type});
                cameras[i].CameraType = type;
            }
            this.cameraService.updateCameraType(models);
        }
        // 置为初始值
        this.selectedCameraType = "";
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

    setLamp(data: Camera) {
        let scope: { deviceData: Camera, $destroy: Function } = this.$scope.$new();
        scope.deviceData = data
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

    create() {
        let scope: { id: string, type: string, $destroy: Function } = this.$scope.$new();
        scope.id = this.findListParams.areaId;
        scope.type = 'add';
        // 这里对scope进行一次新建
        this.currentLayerIndex = this.layer.open({
            type: 1,
            content: createHtml,
            scope: scope,
            title: "新增",
            area: ["340px", "400px"],
            end: function () {
                scope.$destroy();
            }
        });
    }

    search() {
        this.findListParams.Name = this.SearchParams.Name;
        this.findListParams.Type = this.SearchParams.Type;
        this.getListByParams(this.findListParams);
    }

    editCamera(data: Camera) {
        let scope: { id: string, type: string, Camera: Camera, $destroy: Function } = this.$scope.$new();
        scope.id = this.findListParams.areaId;
        scope.Camera = angular.copy(data) as Camera;
        // 这里对scope进行一次新建
        this.currentLayerIndex = this.layer.open({
            type: 1,
            content: createHtml,
            scope: scope,
            title: this.i18nFactory('DP_CONFIG_CAMERA_02'),
            area: ["350px", "auto"],
            end: () => {
                scope.$destroy();
            }
        });
    }
}

app
    .controller('baseConfigCameraController', BaseConfigCameraController);