/**
 * Created by dell on 2017/4/24.
 */
import { app } from "../../common/app/main.app";

import "css!module/maintain/css/maintain-deviceStatus.css";
import "angular";
import 'css!module/maintain/css/maintain-operateLog.css';
import "../../common/services/maintain.service"
import "../../common/services/casecade.service"
import "../main/maintainFactory"
import { IEchartFactory } from "../main/maintainFactory"
import { ITableHeader } from "../../common/directive/unit-table/table-params";
import { IMaintainService } from "../../common/services/maintain.service"
import { ICasCadeService } from "../../common/services/casecade.service"
import { ResponseResult } from "../../../core/params/result/ResponseResult";
import { PageParamsAndResult, IPagination, Pagination } from "../../common/Pagination";
import { ITreeDataParams, TreeDataParams } from "../../common/directive/tree/tree-params";
import { AreaEx } from "../../../core/entity/ex/AreaEx";

declare let $: any;

export interface deviceObject {
    type: string;
    name: string;
    status?: boolean;
}

export const deviceArray = [
    { type: "IvsServer", name: "服务器", status: true },
    { type: "Camera", name: "摄像机", status: false },
    { type: "WiFi", name: "WiFi", status: false },
    { type: "RmpGate", name: "卡口", status: false },
    { type: "EFENCE", name: "电子围栏", status: false }
] as Array<deviceObject>;

export const checkLine = [
    { type: "1", name: "在线" },
    { type: "0", name: "离线" }
] as Array<deviceObject>;

export class CasCadeSearchParams {
    searchType: string;
    orderType: string = 'ASC';
    name?: string;
    type?: string;
    status?: string;
    pageSize: number = 10;
    currentPage: number = 1;
    ifExport?: boolean;
    areaID?: string;
}

export class deviceStatusInfo {
    AreaId: string;
    AreaName: string;
    Code: string;
    ID?: string;
    IpAddress: string;
    Name: string;
    PortNumber?: string;
    State: string;
    Type?: string;
    ServerType?: string;
    ServerIp?: string;
}

export class runOperateLogData {
    Result: Array<deviceStatusInfo>;
    TotalCount: number;
}

export class fieldTitle {
    field: string;
    title: string;
    isShow: boolean;
}

export const tHeadList: Array<fieldTitle> = [
    { field: "Name", title: "FDS_02_02_20", isShow: true },
    { field: "AreaName", title: "FDS_02_02_21", isShow: true },
    { field: "Type", title: "FDS_02_02_22", isShow: true },
    { field: "CameraType", title: "FDS_02_02_27", isShow: true },
    { field: "AlarmNum", title: "FDS_02_02_28", isShow: true },
    { field: "IpAddress", title: "FDS_02_02_23", isShow: true },
    { field: "Status", title: "FDS_02_02_24", isShow: true }
];

class DeviceStatusController {
    static $inject = ['$scope', '$timeout', 'maintainService', 'layer', 'casCadeService', 'maintainFactory'];
    showCamera: Function;
    htmlUrl: string;
    deviceArray: Array<deviceObject> = deviceArray;
    //查询条件
    handleStartTime: string;
    handleEndTime: string;
    //输入关键字
    keyValueInput: string;
    //查询运行日志数据
    searchRunLog: Function;
    //分页
    currentPageData: Array<deviceStatusInfo>;
    pageParams: PageParamsAndResult = new PageParamsAndResult();
    Pagination: IPagination = new Pagination();
    pageType: string = 'IvsServer';
    // table 列表数据
    tHeadList: Array<fieldTitle> = this.switchTableTitle(this.pageType);
    tableNoData: boolean;
    //树
    areaTreeDataParams: ITreeDataParams<AreaEx>;
    areaId: string;
    areaName: string = "全部";
    isShowAreaTree: boolean;
    //过滤
    operatorModules: Array<deviceObject> = deviceArray;
    operatorModule: string;
    operatorStatus: string;
    checkLine: Array<deviceObject> = checkLine;
    constructor(
        private $scope: any,
        private $timeout: any,
        private maintainService: IMaintainService,
        private layer: any,
        private casCadeService: ICasCadeService,
        private maintainFactory: IEchartFactory
    ) {
        this.getTableList(null, 'IvsServer');
        this.initTree();
        this.getTreeList();
    }

    //获取区域树信息
    private initTree() {
        let that: any = this;
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
        };

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
    };

    public getTableTitle(arrTitle: Array<string>) {
        let newArrTitle: Array<fieldTitle> = [];
        tHeadList.forEach((item) => {
            arrTitle.forEach((itemTit) => {
                if (item.field == itemTit) {
                    newArrTitle.push(item);
                }
            })
        });
        return newArrTitle;
    };

    // 不同的表获取不同的表头
    public switchTableTitle(deviceName: string) {
        switch (deviceName) {
            case "IvsServer": {
                return this.getTableTitle(['Name', 'AreaName', 'Type', 'IpAddress', 'Status']);
            }
            case "Camera": {
                return this.getTableTitle(['Name', 'AreaName', 'CameraType', 'AlarmNum', 'IpAddress', 'Status']);
            }
            default: {
                return this.getTableTitle(['Name', 'AreaName', 'AlarmNum', 'IpAddress', 'Status']);
            }
        }
    }

    public switchDevicePage(deviceName: string) {
        if (deviceName) {
            this.pageType = deviceName;

            this.tHeadList = this.switchTableTitle(deviceName);
            this.keyValueInput = "";
            for (let i = 0; i < this.deviceArray.length; i++) {
                if (this.deviceArray[i].type == deviceName) {
                    this.deviceArray[i].status = true;
                    // this.htmlUrl = this.deviceArray[i].path;
                    this.getTableList(null, deviceName);
                } else {
                    this.deviceArray[i].status = false
                }
            }
        }
    }

    //获取后台数据
    private getTableList(Params?: CasCadeSearchParams, deviceName?: string) {
        let that: any = this;
        let casCadeSearchParams: CasCadeSearchParams = new CasCadeSearchParams();
        casCadeSearchParams.searchType = deviceName;
        // 获取之前清空数据
        that.pageParams = new PageParamsAndResult();
        that.pageParams.data = [];

        if (Params) {
            casCadeSearchParams = Params
        }

        // console.log(casCadeSearchParams);

        if (casCadeSearchParams.searchType === "IvsServer") {
            casCadeSearchParams.searchType = "";
            this.maintainService.getServerStatusModule(casCadeSearchParams).then(complete);
        } else {
            this.maintainService.getDevicesStatusModule(casCadeSearchParams).then(complete);
        }

        function complete(res: ResponseResult<runOperateLogData>) {
            console.log(res);
            if (res && res.data && res.data.Result) {
                let ResultData: runOperateLogData = res.data;
                // that.currentPageData = ResultData.Result as Array<deviceStatusInfo>;
                if (Array.isArray(ResultData.Result)) {
                    // that.pageParams = that.Pagination.getByPage(that.pageParams);
                    that.pageParams.totalCount = ResultData.TotalCount;
                    that.pageParams.currentPage = Params ? Params.currentPage : 1;
                    that.pageParams.pageSize = 10;
                    that.pageParams.pageCount = Math.ceil(that.pageParams.totalCount / that.pageParams.pageSize);
                    that.pageParams.data = ResultData.Result;
                    console.log(that.pageParams)
                }
            } else {
                that.pageParams.data = [];
                that.layer.msg(`没有数据`);
            }
        }
    }

    // 改变当前页
    public changePage(num: number) {
        let casCadeSearchParams: CasCadeSearchParams = new CasCadeSearchParams();
        casCadeSearchParams.currentPage = num;
        casCadeSearchParams.searchType = this.pageType;
        casCadeSearchParams.name = this.keyValueInput;
        casCadeSearchParams.type = this.operatorModule;
        casCadeSearchParams.status = this.operatorStatus;
        this.getTableList(casCadeSearchParams, this.pageType);
    }

    // 查询按钮
    public operatorSearch() {
        let casCadeSearchParams: CasCadeSearchParams = new CasCadeSearchParams();
        casCadeSearchParams.currentPage = 1;
        casCadeSearchParams.searchType = this.pageType;
        casCadeSearchParams.name = this.keyValueInput;
        casCadeSearchParams.type = this.operatorModule;
        casCadeSearchParams.status = this.operatorStatus;
        casCadeSearchParams.areaID = this.areaId;

        this.getTableList(casCadeSearchParams, this.pageType);
    }

    // 导出按钮
    public operatorExport() {
        let casCadeSearchParams: CasCadeSearchParams = new CasCadeSearchParams();
        casCadeSearchParams.currentPage = 1;
        casCadeSearchParams.searchType = this.pageType;
        casCadeSearchParams.name = this.keyValueInput;
        casCadeSearchParams.type = this.operatorModule;
        casCadeSearchParams.status = this.operatorStatus;
        casCadeSearchParams.areaID = this.areaId;
        casCadeSearchParams.ifExport = true;

        this.getTableListExport(casCadeSearchParams, this.pageType);
    }

    public getTableListExport(Params?: CasCadeSearchParams, deviceName?: string) {
        let that: DeviceStatusController = this;
        let casCadeSearchParams: CasCadeSearchParams = new CasCadeSearchParams();
        casCadeSearchParams.searchType = deviceName;

        if (Params) {
            casCadeSearchParams = Params
        }

        if (casCadeSearchParams.searchType === "IvsServer") {
            delete casCadeSearchParams.searchType;
            that.maintainFactory.exportTableXls("/pdp/netManagerCtrl/serverState/export", casCadeSearchParams);
        } else {
            that.maintainFactory.exportTableXls("/pdp/netManagerCtrl/deviceState/export", casCadeSearchParams);
        }
    }
}

app.controller("deviceStatusController", DeviceStatusController);

