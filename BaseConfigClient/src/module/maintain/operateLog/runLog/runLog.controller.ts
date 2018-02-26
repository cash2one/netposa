/**
 * Created by tj on 2017/4/24.
 */
import { app } from "../../../common/app/main.app";
import "angular";
import 'css!module/maintain/css/maintain-operateLog.css';

import { ITableHeader } from "../../../common/directive/unit-table/table-params";
import { IMaintainService } from "../../../common/services/maintain.service"
import "../../../common/services/maintain.service"
import "../../main/maintainFactory"
import { IEchartFactory } from "../../main/maintainFactory"
import { ResponseResult } from "../../../../core/params/result/ResponseResult";
import { PageParamsAndResult, IPagination, Pagination } from "../../../common/Pagination";
import "moment";
declare let moment: any;

export class CasCadeSearchParams {
    classSimpleName: string = "ExceptionLog";
    arrWhereJson: any = [];
    pageSize: number = 10;
    currentPage: number = 1;
}

export class runOperateLog {
    ExceptionClass: string;
    ExceptionMessage: string;
    ExceptionModule: string;
    ExceptionNumber: number;
    ExceptionServerIP: string;
    ExceptionServerType: string;
    ExceptionTime: string;
    Ext: string;
    ID: string;
    JsonExtData: any;
    JsonUserData: any;
    StrJsonUserData: string;
}

export class runOperateLogData {
    Result: Array<runOperateLog>;
    TotalCount: number;
}

class RunLogController {

    static $inject = ['$scope', 'maintainService', '$timeout', 'layer', 'maintainFactory'];

    // table 列表数据
    tHeadList: Array<ITableHeader>;
    tBodyList: Array<any>;

    tableNoData: boolean;

    //查询条件
    handleStartTime: string;
    handleEndTime: string;

    currentPageData: Array<runOperateLog>;
    pageParams: PageParamsAndResult = new PageParamsAndResult();
    Pagination: IPagination = new Pagination();

    // 关键字过滤
    ExceptionMessage: string;
    searchPagingParams: any;
    constructor(
        private $scope: any,
        private maintainService: IMaintainService,
        private $timeout: any,
        private layer: any,
        private maintainFactory: IEchartFactory
    ) {
        let vm = this;
        // 表格数据
        vm.tHeadList = [
            { field: "ExceptionTime", title: "FDS_02_02_06" },
            { field: "ExceptionServerIP", title: "IP" },
            { field: "ExceptionModule", title: "FDS_02_02_08" },
            { field: "ExceptionClass", title: "FDS_02_02_19" },
            { field: "ExceptionMessage", title: "FDS_02_02_07" }
        ];

        vm.tBodyList = [];

        this.getTableList();
    }

    // 导出
    public exportFile() {
        let Params: any = {};
        Params.orderType = "ASC";
        Params.currentPage = 1;
        Params.pageSize = 10;
        console.log(this.maintainFactory);
        console.log(Params)
        this.maintainFactory.exportTableXls("/pdp/netManagerCtrl/runningLog/export", Params);
    }

    // 获取后台数据
    private getTableList(Params?: CasCadeSearchParams) {
        let that: any = this;
        let casCadeSearchParams: CasCadeSearchParams = new CasCadeSearchParams();

        // 查询
        if (!!Params) {
            casCadeSearchParams = Params
        } else {
            //如果搜索条件存在且关键字存在
            if (!!this.searchPagingParams) {
                casCadeSearchParams.arrWhereJson = this.searchPagingParams
            } else {
                casCadeSearchParams.arrWhereJson = {
                    startTime: moment().subtract(1, 'year').format("YYYY-MM-DD hh:mm:ss"),
                    endTime: "2018-01-03 00:00:00"
                }
            }
        }

        this.maintainService.getRunLogDataList(casCadeSearchParams).then(complete);

        function complete(res: ResponseResult<runOperateLogData>) {
            if (!!res && !!res.data && res.code === 200) {
                let ResultData: runOperateLogData = res.data;

                that.currentPageData = ResultData.Result as Array<runOperateLog>;

                if (Array.isArray(ResultData.Result)) {
                    if (that.Pagination.set(ResultData.Result)) {
                        that.pageParams = that.Pagination.getByPage(that.pageParams);
                        that.pageParams.totalCount = ResultData.TotalCount;
                        that.pageParams.currentPage = Params ? Params.currentPage : 1;
                        that.pageParams.pageSize = 10;
                        that.pageParams.pageCount = Math.ceil(that.pageParams.totalCount / that.pageParams.pageSize)
                    } else {
                        that.pageParams.data = [];
                    }
                }
            } else {
                that.layer.msg("获取运行日志数据失败")
            }
        }
    }

    // 改变当前页
    public changePage(num?: number) {
        if (this.handleStartTime > this.handleEndTime) {
            this.layer.msg("开始时间不能大于结束时间");
            return
        }

        let casCadeSearchParams: CasCadeSearchParams = new CasCadeSearchParams();
        casCadeSearchParams.currentPage = num || 1;

        this.searchPagingParams = casCadeSearchParams.arrWhereJson = {
            startTime: this.handleStartTime,
            endTime: this.handleEndTime
        };

        this.getTableList(casCadeSearchParams);
    }
}

app.controller("runLogController", RunLogController);