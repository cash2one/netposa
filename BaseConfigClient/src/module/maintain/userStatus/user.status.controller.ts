/**
 * Created by dell on 2017/4/24.
 */
import "../../common/services/maintain.service"
import '../../common/services/casecade.service';
import "../main/maintainFactory"
import { IEchartFactory } from "../main/maintainFactory"
import { app } from "../../common/app/main.app";
import { ITableHeader } from "../../common/directive/unit-table/table-params";
import { PageParamsAndResult, IPagination, Pagination } from "../../common/Pagination";
import { IMaintainService } from "../../common/services/maintain.service"
import { ITreeDataParams, TreeDataParams } from "../../common/directive/tree/tree-params";
import { AreaEx } from "../../../core/entity/ex/AreaEx";
import { ICasCadeService } from "../../common/services/casecade.service"

import "css!module/maintain/css/maintain-userStatus.css";
import { CasCadeSearchParams } from "../../../core/entity/maintainEnum";

import 'moment'
import PortraitTool from "../../common/portrait-tool";
declare let moment: any;

class UserStatusController {

    static $inject = ['$scope', 'maintainService', 'casCadeService', '$timeout', 'maintainFactory'];

    moduleName: string;

    // table 列表数据
    tHeadList: Array<ITableHeader>;
    tBodyList: Array<any>;

    tableNoData: boolean;

    //区域树
    areaTreeDataParams: ITreeDataParams<AreaEx>;
    //展示区域树
    isShowAreaTree: boolean;

    PageParamsAndResult: PageParamsAndResult = new PageParamsAndResult();
    Pagination: IPagination = new Pagination();

    areaId: string;

    tableParams: CasCadeSearchParams;

    PortraitTool: any = PortraitTool;
    //用户信息
    userTotalCount: number = 0;

    //搜索
    handleStartTime: string;
    handleEndTime: string;
    areaName: string = "全部";
    personNameInput: string;

    constructor(
        private $scope: any,
        private maintainService: IMaintainService,
        private casCadeService: ICasCadeService,
        private $timeout: any,
        private maintainFactory: IEchartFactory
    ) {
        // 表格数据
        this.tHeadList = [
            { field: "PersonName", title: "FDS_02_01_01" },
            { field: "AreaName", title: "FDS_02_00_02" },
            { field: "UnitName", title: "FDS_02_01_07" },
            { field: "UserType", title: "FDS_02_01_08" },
            { field: "LoginIp", title: "IP" },
            { field: "LastLoginTime", title: "FDS_02_01_09" },
            { field: "LookMoudel", title: "FDS_02_01_10" },
            { field: "IsOnline", title: "FDS_02_00_05" }
        ];
        // {field: "Handle", title: "FDS_02_01_11"}
        this.tBodyList = [];
        this.getTableList();
        this.initTree();
        this.getTreeList();
    }

    //获取区域树信息
    private initTree() {
        this.areaTreeDataParams = new TreeDataParams<AreaEx>();
        this.areaTreeDataParams.treeId = 'areaTreeUser';
        this.areaTreeDataParams.isDefaultSelected = true;
        this.areaTreeDataParams.onClick = (event: MouseEvent, treeId: string, treeNode: any) => {
            this.areaId = treeNode.ID;
            this.areaName = treeNode.Name;
            this.isShowAreaTree = false;
            this.$timeout(() => {
                this.$scope.$apply();
            });
        }
    }

    // 获取区域树数据
    public getTreeList() {
        let that: any = this;
        that.casCadeService.findAreaList().then(complete);
        function complete(result: any) {
            that.$timeout(function () {
                that.areaTreeDataParams.treeDatas = result.data;
            });
        }
    }

    //获取后台数据
    private getTableList(casCadeSearchParams?: CasCadeSearchParams) {
        let that: any = this;
        let SearchParams: CasCadeSearchParams;

        if (!casCadeSearchParams) {
            let Params: CasCadeSearchParams = new CasCadeSearchParams();
            Params.orderType = "ASC";
            Params.currentPage = 1;
            Params.pageSize = 10;
            SearchParams = Params
        } else {
            SearchParams = casCadeSearchParams
        }

        this.maintainService.getUserDataList(SearchParams).then(complete);

        function complete(res: any) {
            if (res && res.code === 200) {
                let data: any = res.data ? res.data : [];
                that.PageParamsAndResult.currentPage = SearchParams.currentPage;
                that.PageParamsAndResult.totalCount = res.count;
                that.PageParamsAndResult.pageSize = 10;
                that.PageParamsAndResult.pageCount = Math.ceil(that.PageParamsAndResult.totalCount / that.PageParamsAndResult.pageSize);
                that.PageParamsAndResult.data = data;
                //搜索
                that.userTotalCount = data.TotalCount;
            }
        }
    }

    //分页
    public changePage(num: number) {
        console.log(num);
        let casCadeSearchParams: CasCadeSearchParams = new CasCadeSearchParams();
        casCadeSearchParams.orderType = "ASC";
        casCadeSearchParams.currentPage = num;
        casCadeSearchParams.pageSize = 10;
        this.getTableList(casCadeSearchParams);
    }

    //搜索
    public searchUser() {
        let casCadeSearchParams: CasCadeSearchParams = new CasCadeSearchParams();
        casCadeSearchParams.startTime = this.handleStartTime;
        casCadeSearchParams.endTime = this.handleEndTime;
        casCadeSearchParams.areaName = this.areaId;
        casCadeSearchParams.userName = this.personNameInput;
        casCadeSearchParams.orderType = "ASC";
        casCadeSearchParams.currentPage = 1;
        casCadeSearchParams.pageSize = 10;
        this.getTableList(casCadeSearchParams);
    }

    public operatorExport() {
        let casCadeSearchParams: CasCadeSearchParams = new CasCadeSearchParams();
        casCadeSearchParams.orderType = "ASC";
        casCadeSearchParams.currentPage = 1;
        casCadeSearchParams.pageSize = 10;
        this.maintainFactory.exportTableXls("/pdp//netManagerCtrl/sysUser/export", casCadeSearchParams);
    }
}

app.controller("userStatusController", UserStatusController);