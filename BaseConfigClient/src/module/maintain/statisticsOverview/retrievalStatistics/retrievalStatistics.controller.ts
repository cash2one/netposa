import { app } from "../../../common/app/main.app";
import "css!module/maintain/css/retrievalStatistics.css";
import "../../main/maintainFactory";
import * as ChartOptions from "../../../common/enum/EchartConfig";
import { BackResponseBody } from "../../../../core/params/result/ResponseResult";
import { IMaintainService } from "../../../common/services/maintain.service";
import {
    analysisStatisticsResult,
    intelligentAnalysisData,
    intelligentAnalysisDataEnum,
    intelligentAnalysisRequireParams,
    SelectData,
    selectDataEnum,
    echartNameArr,
    RetrievalStatisticModuleName,
    RetrievalStatisticParamModuleNames,
    AlarmObjectType
} from "../../../../core/entity/maintainEnum";
import { OperThirdModule } from "../../../../core/entity/OperThirdModule";
import { dataSelectServer, dataSelectResult, moduleString } from "../../../common/factory/dataSelect.factory";
import "moment";
import { ChartOptionObject, IEchartFactory } from "../../main/maintainFactory";
import ResourceParams from "../../../../core/params/ResourceParams";
declare let angular: any, moment: any;

export const retrievalRequireParam: any = {
    beginDate: "",
    endDate: moment().format("YYYY-MM-DD hh:mm:ss"),
    moduleNames: Object.keys(RetrievalStatisticParamModuleNames).join(','),
    statisticModuleLevel: 3
};

class RankKeyWordEnum {
    value: string;
    name: string;
    class: string;
}

const RankKeyWord: Array<RankKeyWordEnum> = [
    { value: "Vehicle", name: "车辆检索排行", class: "VehicleRetrieval" },
    { value: "Face", name: "人像检索排行", class: "FaceRetrieval" },
    { value: "WiFi", name: "Wi-Fi检索排行", class: "WiFiRetrieval" },
    { value: "EFENCE", name: "电围检索排行", class: "EFENCERetrieval" },
    { value: "Device", name: "设备检索排行", class: "DeviceRetrieval" },
    { value: "Position", name: "位置检索排行", class: "PositionRetrieval" }
];

class retrievalStatisticsController {

    static $inject = ["$scope", "$timeout", "maintainFactory", "maintainService", "dataSelectServer"];
    // 切换按钮
    retrievalStatisticsList: boolean = true;
    retrievalTrafficTrendList: boolean = true;
    rankStatisticsList: boolean = true;

    // 下拉菜单 时间控件
    rankClassName: Array<string> = ["i-rank-first", "i-rank-second", "i-rank-third", "i-rank-four", "i-rank-five"];
    retrievalKeyWordRank: Array<any>;

    Retrieval_Model: dataSelectResult = new dataSelectResult();
    Retrieval_Trend_Model: dataSelectResult = new dataSelectResult();
    RankStatistics_Model: dataSelectResult = new dataSelectResult();
    ModuleNameArr: intelligentAnalysisDataEnum = angular.copy(intelligentAnalysisData);
    timeItem: Array<selectDataEnum> = angular.copy(SelectData);

    //Rank
    OperThirdModule: any = OperThirdModule;
    RankKeyWords: Array<RankKeyWordEnum> = RankKeyWord;
    deviceModuleArr: Array<string> = [];
    deviceModuleObj: { [key: string]: Array<any> } = {};

    echartNameArr: any = angular.copy(echartNameArr);

    //视图列表
    retrievalStatisticTableList: any;
    retrievalTrafficTrendTableList: any;
    rankStatisticsTableList: any;

    constructor(
        private $scope: any,
        private $timeout: any,
        private maintainFactory: IEchartFactory,
        private maintainService: IMaintainService,
        private dataSelectServer: dataSelectServer) {
        this.init();
        $scope.$on('initChart', (evt: any, opt: any) => {
            this.init()
        });
        $scope.$on('$destroy', () => {
            this.maintainFactory.destroyChart();
        });
    }

    private init() {
        this.initRetrievalStatistics();
        this.initRetrievalTrafficTrend();
        this.rankStatistics();
    }

    // 检索统计
    initRetrievalStatistics(value?: string) {
        let params = this.timeRequireParam(this.Retrieval_Model, value);
        let RetrievalParams: intelligentAnalysisRequireParams = this.maintainFactory.RetrievalParams(this.Retrieval_Model.module);
        if (this.Retrieval_Model.module == AlarmObjectType.ALL.value || value) {
            RetrievalParams.beginDate = moment().subtract(1, 'year').format("YYYY-MM-DD 00:00:00");
            RetrievalParams.endDate = params.endDate;
        }
        if (!RetrievalParams) return;
        this.maintainService.retrievalStatistics(RetrievalParams).then((res: BackResponseBody<analysisStatisticsResult>) => {
            if (res && res.data) {
                this.maintainFactory.initChart(this.setData(RetrievalStatisticModuleName.retrievalStatistic, res.data));
            }
        });
    }

    // 检索统计趋势
    initRetrievalTrafficTrend(value?: string) {
        let params: any = this.timeRequireParam(this.Retrieval_Trend_Model, value);

        if (!params) return;
        if (!this.Retrieval_Trend_Model.module || this.Retrieval_Trend_Model.module == moduleString.ALL) {
            params.timeType = moduleString.Month;
        } else {
            params.timeType = this.Retrieval_Trend_Model.module
        }

        this.maintainService.retrievalTrendStatistics(params).then((res: BackResponseBody<analysisStatisticsResult>) => {
            if (res && res.data) {
                this.maintainFactory.initChart(this.setData(RetrievalStatisticModuleName.retrievalTrafficTrend, res.data));
            }
        });
    }

    // 关键字排行榜
    rankStatistics(value?: string) {
        let that: retrievalStatisticsController = this;
        if (!this.RankStatistics_Model.module) {
            this.RankStatistics_Model.module = moduleString.Year
        }
        let params: ResourceParams = that.maintainFactory.RetrievalRankParam(that.RankStatistics_Model, AlarmObjectType.ALL.value, value);

        if (that.RankStatistics_Model.module == moduleString.Custom && !value) { return }

        that.maintainService.retrievalKeyWordRank(params).then((res: BackResponseBody<any>) => {
            if (res && res.data) {
                that.deviceModuleObj = res.data;
                that.deviceModuleArr = Object.keys(res.data);

                that.rankStatisticsTableList = angular.copy(res.data);
                that.rankStatisticsTableList.legendData = [];
                that.rankStatisticsTableList.seriesData = [];
                RankKeyWord.forEach((item: RankKeyWordEnum) => {
                    that.rankStatisticsTableList.legendData.push(item.name);
                    that.rankStatisticsTableList.seriesData.push(res.data[item.value])
                })
            }
        });
    }

    // 获取请求参数
    timeRequireParam(modelParam: any, value?: string) {
        let params: any = angular.copy(retrievalRequireParam);
        let result: dataSelectResult = this.dataSelectServer.getParamsTime(modelParam);

        if (modelParam.module == moduleString.Custom && value) {
            let valueArr: Array<string> = value.split(" - ");
            params.beginDate = valueArr[0];
            params.endDate = valueArr[1];
        } else {
            params.beginDate = result.startTime;
            params.endDate = result.endTime;
        }
        if (params.beginDate && params.endDate) {
            return params
        }
    }

    // 检索统计
    private static retrievalStatistic(data?: any) {
        let seriesData = data.seriesData as any;
        let xData = data.yData as Array<string>;
        // let legendData = data.legendData as Array<string>;

        let option = new ChartOptions.EChartOption();
        //tooltip
        option.tooltip = new ChartOptions.tooltip();

        //color
        option.color = ["#6c8ce4"];

        //legend
        option.legend = new ChartOptions.legend();
        delete option.legend.left;
        option.legend.right = "20px";
        option.legend.top = "10px";
        option.legend.data = [] as any;
        option.legend.itemWidth = 15;
        option.legend.itemHeight = 10;

        //xAxis
        option.xAxis = new ChartOptions.xAxis();
        option.xAxis.type = "category";
        option.xAxis.data = xData;
        option.xAxis.axisLine = new ChartOptions.axisLine();
        option.xAxis.axisLabel = new ChartOptions.axisLabel();
        option.xAxis.splitLine = new ChartOptions.splitLine();
        option.xAxis.splitLine.show = true;
        option.xAxis.splitLine.lineStyle.color = ["#F8F0E9"];
        option.xAxis.splitLine.lineStyle.interval = false;
        option.xAxis.axisLine.lineStyle.color = "#C9C9C9";
        option.xAxis.axisLine.show = true;
        option.xAxis.axisLabel.textStyle.color = "#6F6E6E";
        // option.xAxis.axisLabel.textStyle.fontSize = "10";

        //grid
        option.grid = new ChartOptions.grid();
        option.grid.top = 50;
        option.grid.bottom = 20;

        option.yAxis = new ChartOptions.yAxis();
        option.yAxis.type = "value";
        option.yAxis.splitLine.lineStyle.color = ["#F8F0E9"];
        option.yAxis.splitLine.show = true;

        option.series = [] as Array<any>;
        // legend
        let legendArrayData = {} as ChartOptions.dataText;
        legendArrayData.textStyle = new ChartOptions.dataStyleText();
        legendArrayData.icon = "stack";
        option.legend.data.push(legendArrayData);
        // series
        let seriesD = new ChartOptions.series();
        seriesD.type = "bar";
        seriesD.barWidth = 50;

        seriesD.label = new ChartOptions.label;
        seriesD.label.normal = new ChartOptions.normal;
        seriesD.label.normal.position = "insideRight";
        seriesD.data = seriesData;

        option.series.push(seriesD);

        return option
    }

    // 检索趋势统计
    private static retrievalTrafficTrend(data?: any) {
        let seriesData = data.series as any;
        let xData = data.dateList as Array<string>;
        let legendData = data.legendData as Array<string>;

        let option = new ChartOptions.EChartOption();

        //tooltop
        option.tooltip = new ChartOptions.tooltip();
        option.tooltip.trigger = "axis";

        // color
        option.color = ["#7CCCF2", "#6C8CE4", "#f8a619", "#00d5e2"];

        // legend
        option.legend.data = [] as any;
        option.legend.top = "20px";
        delete option.legend.left;
        option.legend.right = "20px";
        option.legend.itemWidth = 20;
        option.legend.itemHeight = 10;
        option.legend.itemGap = 30;
        option.legend.icon = null;

        //xAxis
        option.xAxis = new ChartOptions.xAxis();
        option.xAxis.type = "category";
        option.xAxis.boundaryGap = false;
        option.xAxis.axisLine = new ChartOptions.axisLine();
        option.xAxis.axisLabel = new ChartOptions.axisLabel();
        option.xAxis.splitLine = new ChartOptions.splitLine();
        option.xAxis.splitLine.lineStyle.color = "#F8F0E9";
        option.xAxis.splitLine.show = true;
        option.xAxis.data = xData;

        // grid
        option.grid = new ChartOptions.grid();
        option.grid.top = 50;
        option.grid.bottom = 20;

        //yAxis
        option.yAxis = new ChartOptions.yAxis();
        option.yAxis.type = "value";
        option.yAxis.splitLine.lineStyle.color = "#F8F0E9";
        option.yAxis.splitLine.show = true;
        // option.yAxis.min = 0
        // option.yAxis.max = 40000

        option.series = [] as Array<any>;

        let areaColor: Array<string> = ["124,204,242", "108,140,228", "248,166,25", "0,213,226"];
        for (let i = 0; i < legendData.length; i++) {
            // legend
            let legendArrayData = {} as ChartOptions.dataText;
            legendArrayData.name = legendData[i];
            legendArrayData.textStyle = new ChartOptions.dataStyleText();
            option.legend.data.push(legendArrayData);

            // series
            let seriesD = new ChartOptions.series();
            seriesD.type = "line";
            seriesD.name = legendData[i];

            //color
            let areaStyleColor: any = new ChartOptions.areaStyleColor(areaColor[i]);
            seriesD.areaStyle = new ChartOptions.areaStyle();
            seriesD.areaStyle.normal = new ChartOptions.ObjectNormal();
            seriesD.areaStyle.normal = areaStyleColor.getColor();

            //data
            let key: any = Object.keys(seriesData)[i];
            seriesD.data = seriesData[key];

            option.series.push(seriesD)
        }

        return option
    }

    private setData(name: string, data?: any) {
        let option: any = ChartOptionObject(name);

        switch (name) {
            case 'retrievalStatistic': {
                this.retrievalStatisticTableList = angular.copy(data);
                this.retrievalStatisticTableList.legendData = ['设备名', '设备数'];
                option.config = retrievalStatisticsController.retrievalStatistic(data);
                return option
            }
            case 'retrievalTrafficTrend': {
                this.retrievalTrafficTrendTableList = angular.copy(data);
                this.retrievalTrafficTrendTableList.xData = angular.copy(data.dateList);
                this.retrievalTrafficTrendTableList.legendData.unshift('日期');
                this.retrievalTrafficTrendTableList.seriesData = [data.series.camera, data.series.electronicfence, data.series.rmpgate, data.series.wifi];
                option.config = retrievalStatisticsController.retrievalTrafficTrend(data);
                return option
            }
            case 'rankStatistics': {
                option.config = this.rankStatistics(data);
                return option
            }
        }
    }

    public retrievalSwitch(switchString: string) {
        let that: any = this;
        switch (switchString) {
            case 'retrievalStatisticsHistogram': {
                that.retrievalStatisticsList = true;
                break;
            }
            case 'retrievalStatisticsList': {
                that.retrievalStatisticsList = false;
                break;
            }
            case 'retrievalTrafficTrendHistogram': {
                that.retrievalTrafficTrendList = true;
                break;
            }
            case 'retrievalTrafficTrendList': {
                that.retrievalTrafficTrendList = false;
                break;
            }
        }
    }


    public exportImage(id: string) {
        this.maintainFactory.exportImage(id);
    }

    public exportExcel(module: string, data: any) {
        this.maintainFactory.exportExcel(module, data);
    }
}

app.controller("retrievalStatisticsController", retrievalStatisticsController);