/**
 * Created by tj on 2017/4/24.
 */
import { app } from "../../../common/app/main.app";
import "angular";
import 'css!module/maintain/css/maintain-operateLog.css';
import "../../../common/services/maintain.service"
import "../../factory/seeLog.factory"
import "../../main/maintainFactory"

import { IEchartFactory } from "../../main/maintainFactory"
import { ITableHeader } from "../../../common/directive/unit-table/table-params";
import { IMaintainService } from "../../../common/services/maintain.service"
import { PageParamsAndResult, IPagination, Pagination } from "../../../common/Pagination";
import { OperFitstModule } from "../../../../core/entity/OperFirstModule";
import PortraitTool from "../../../common/portrait-tool";
import "moment"
declare let moment: any;

export class CasCadeSearchParams {
    startTime: string;
    endTime: string;
    operatorModule: string;
    operatorUser: string;
    // keyWords:string;
    orderType: string;
    currentPage: number;
    pageSize: number;
}

// export class operateLogList {
//     user: string;
//     areaName: string;
//     unit: string;
//     time: string;
//     IP: string;
//     module: string;
//     Descrption: string;
// }

export const tHeadList = [
    { field: "OperatorUserName", title: "FDS_02_02_03" },
    { field: "AreaName", title: "FDS_02_00_02" },
    { field: "UnitName", title: "FDS_02_01_07" },
    { field: "OperatorTime", title: "FDS_02_02_06" },
    { field: "OperatorIP", title: "IP" },
    { field: "OperatorModule", title: "FDS_02_02_02" },
    { field: "Descrption", title: "FDS_02_02_33" }
];
class ActionLogController {

    static $inject = ['$scope', 'maintainService', '$timeout', 'userInfoCacheFactory', 'layer', 'maintainFactory'];

    // table 列表数据
    tHeadList: Array<ITableHeader> = tHeadList;

    //查询条件
    handleStartTime: string;
    handleEndTime: string;
    //操作人输入
    operatorManInput: string;
    //所有操作模块
    OperFitstModule: any = OperFitstModule;
    //操作模块
    operatorModule: string;

    //下拉选择的操作模块
    // changeOperatorModule: Function;

    allOperatorModule: Array<string> = [];

    PortraitTool: any = PortraitTool;

    PageParamsAndResult: PageParamsAndResult = new PageParamsAndResult();
    Pagination: IPagination = new Pagination();

    constructor(
        private $scope: any,
        private maintainService: IMaintainService,
        private $timeout: any,
        private userInfoCacheFactory: any,
        private layer: any,
        private maintainFactory: IEchartFactory
    ) {
        this.getOperateLog()
    }

    private getOperateModule() {
        Object.keys(this.OperFitstModule).forEach((module: string) => {
            if (this.allOperatorModule.indexOf(module) == -1) {
                this.allOperatorModule.push(this.OperFitstModule[module]);
            }
        });
        // console.log(this.allOperatorModule);
    }

    private getOperateLog(caseCadeSearchParams?: CasCadeSearchParams) {
        this.getOperateModule();
        let that: any = this;
        let Params: CasCadeSearchParams = new CasCadeSearchParams();
        if (!caseCadeSearchParams) {
            Params.operatorUser = this.operatorManInput;
            Params.orderType = "ASC";
            Params.currentPage = 1;
            Params.pageSize = 10;
        } else {
            Params = caseCadeSearchParams
        }

        this.maintainService.logManagement(Params).then(complete);
        function complete(res: any) {
            if (res && res.code === 200) {
                let data: any = res.data.Result ? res.data.Result : [];
                that.PageParamsAndResult.pageSize = 10;
                that.PageParamsAndResult.currentPage = Params.currentPage;
                that.PageParamsAndResult.pageCount = Math.ceil(that.PageParamsAndResult.totalCount / that.PageParamsAndResult.pageSize)
                that.PageParamsAndResult.data = data;
                that.PageParamsAndResult.totalCount = res.data.TotalCount;
                //搜索
                that.userTotalCount = res.data.TotalCount;
            }
        }
    }

    public changePage(num?: number) {
        if (this.handleStartTime > this.handleEndTime) {
            this.layer.msg("开始时间不能大于结束时间");
            return
        }
        let params: CasCadeSearchParams = new CasCadeSearchParams();
        params.startTime = this.handleStartTime;
        params.endTime = this.handleEndTime;
        params.orderType = "ASC";
        params.currentPage = num || 1;
        params.pageSize = 10;
        params.operatorModule = this.operatorModule;
        params.operatorUser = this.operatorManInput;

        this.getOperateLog(params);
    }

    public exportFile() {
        let Params: CasCadeSearchParams = new CasCadeSearchParams();
        Params.orderType = "ASC";
        Params.currentPage = 1;
        Params.pageSize = 10;
        this.maintainFactory.exportTableXls("/pdp/netManagerCtrl/operationLog/export", Params);
    }
}

app.controller("actionLogController", ActionLogController);



