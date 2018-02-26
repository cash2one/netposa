import { app } from "../../../common/app/main.app";
import "css!module/maintain/css/analysisStatistics.css";
import "../../main/maintainFactory"
import {
    MockAreaStatistic,
    MockAreaStatisticList,
    MockNumber,
    MockStatisticsOverview,
    MockStatisticsOverviewList
} from "../mockEnum";
import * as ChartOptions from "../../../common/enum/EchartConfig";
import { IMaintainService } from "../../../common/services/maintain.service";
import {
    intelligentAnalysisRequireParams,
    analysisStatisticsParams,
    intelligentAnalysisData,
    intelligentAnalysisDataEnum,
    analysisStatisticsResult,
    SelectData,
    selectDataEnum,
    echartNameArr,
    analysisStatisticModuleNames
} from "../../../../core/entity/maintainEnum";
import { BackResponseBody } from "../../../../core/params/result/ResponseResult";
import { OperThirdModule } from "../../../../core/entity/OperThirdModule";
import { IEchartFactory, ChartOptionObject, allParams } from "../../main/maintainFactory";
import "../../../common/factory/dataSelect.factory"
import { dataSelectServer, dataSelectResult, moduleString } from "../../../common/factory/dataSelect.factory";
import "moment";
declare let angular: any, moment: any;

class analysisStatisticsController {

    static $inject = ["$scope", "$timeout", "maintainFactory", "maintainService", "dataSelectServer"];
    //mock
    mockAreaStatistic: Array<MockAreaStatistic> = MockAreaStatisticList(1);
    MockStatisticsOverview: Array<MockStatisticsOverview> = MockStatisticsOverviewList(4);
    MockNumber: any = MockNumber;
    // 切换按钮
    carAnalysisStatisticsList: boolean = true;
    personAnalysisStatisticsList: boolean = true;
    macAnalysisStatisticsList: boolean = true;
    crashAnalysisStatisticsList: boolean = true;
    // 获取后端信息
    superData: any;
    //时间控件
    ModuleNameArr: intelligentAnalysisDataEnum = angular.copy(intelligentAnalysisData);
    Vehicle_Date_Model: allParams = new allParams(this.ModuleNameArr.IntelligentAnalysis_Vehicle);
    Face_Date_Model: allParams = new allParams(this.ModuleNameArr.IntelligentAnalysis_Face);
    Mac_Date_Model: allParams = new allParams(this.ModuleNameArr.IntelligentAnalysis_Mac);
    Crash_Date_Model: allParams = new allParams(this.ModuleNameArr.IntelligentAnalysis_Crash);

    timeItem: Array<selectDataEnum> = angular.copy(SelectData);
    IntelligentAnalysis_Face_Time: any = { module: "", startTime: "", endTime: "" };

    echartNameArr: any = echartNameArr;
    CrashModuleName: string = "IntelligentAnalysis_More_FaceMacCrash, IntelligentAnalysis_More_VehicleMacCrash";
    //列表视图
    VehicleTableList: any;
    FaceTableList: any;
    MacTableList: any;
    CrashTableList: any;

    constructor(private $scope: any,
        private $timeout: any,
        private maintainFactory: IEchartFactory,
        private maintainService: IMaintainService,
        private dataSelectServer: dataSelectServer
    ) {
        this.initChart();

        $scope.$on('initChart', (evt: any, opt: any) => {
            this.initChart()
        });

        $scope.$on('$destroy', () => {
            this.maintainFactory.destroyChart();
        });
    }

    // 初始化车辆分析统计
    initVehicleAnalysis(value?: string) {
        let params = this.getTimeParams(this.Vehicle_Date_Model, value) as intelligentAnalysisRequireParams;
        if (!params) { return }
        params.moduleNames = intelligentAnalysisData.IntelligentAnalysis_Vehicle;

        this.findDataFun(params, intelligentAnalysisData.IntelligentAnalysis_Vehicle)
    }

    // 初始化人员分析统计
    initFaceAnalysis(value?: string) {
        let params = this.getTimeParams(this.Face_Date_Model, value) as intelligentAnalysisRequireParams;
        if (!params) { return }
        params.moduleNames = intelligentAnalysisData.IntelligentAnalysis_Face;

        this.findDataFun(params, intelligentAnalysisData.IntelligentAnalysis_Face)
    }

    // 初始化感知数据分析统计
    initMacAnalysis(value?: string) {
        let params = this.getTimeParams(this.Mac_Date_Model, value) as intelligentAnalysisRequireParams;
        if (!params) { return }
        params.moduleNames = intelligentAnalysisData.IntelligentAnalysis_Mac;

        this.findDataFun(params, intelligentAnalysisData.IntelligentAnalysis_Mac)
    }

    // 初始碰撞分析统计
    initCrashAnalysis(value?: string) {
        let params = this.getTimeParams(this.Crash_Date_Model, value) as intelligentAnalysisRequireParams;
        if (!params) { return }

        params.moduleNames = angular.copy(this.CrashModuleName);
        this.findDataFun(params, intelligentAnalysisData.IntelligentAnalysis_Crash)
    }

    // 得到时间参数初始化图表
    private getTimeParams(modelParam: allParams, value?: string) {
        let params = {} as intelligentAnalysisRequireParams;
        params.endDate = moment().format("YYYY-MM-DD hh:mm:ss");

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
            params.statisticModuleLevel = 3;
            return params;
        }
    }

    // 后台请求
    private findDataFun(params: intelligentAnalysisRequireParams, module: string) {
        let that: analysisStatisticsController = this;
        that.maintainService.intelligentAnalysis(params).then((res: BackResponseBody<Array<analysisStatisticsResult>>) => {
            if (res && res.data) {
                that.maintainFactory.initChart(this.setData(module, res.data));
            }
        });
    }

    // 初始化图表
    private initChart(module?: intelligentAnalysisRequireParams) {
        let arr = Object.keys(analysisStatisticModuleNames) as Array<string>;
        let params: Array<intelligentAnalysisRequireParams> = this.initParams(module);

        params.forEach((param, index) => {
            this.findDataFun(param, arr[index])
        });
    }

    // 初始化参数数据
    private initParams(module?: intelligentAnalysisRequireParams) {
        let results = [] as Array<intelligentAnalysisRequireParams>;
        let allCode = Object.keys(analysisStatisticModuleNames) as Array<string>;
        if (!module) {
            allCode.forEach((code) => {
                let result = angular.copy(analysisStatisticsParams) as intelligentAnalysisRequireParams;
                result.moduleNames = code;
                result.beginDate = moment().subtract(1, 'year').format("YYYY-MM-DD 00:00:00");
                result.endDate = moment().subtract(1, 'day').format("YYYY-MM-DD 23:59:59")
                if (code == intelligentAnalysisData.IntelligentAnalysis_Crash) {
                    result.moduleNames = angular.copy(this.CrashModuleName);
                }
                results.push(result);
            });
        } else {
            let result = module as intelligentAnalysisRequireParams;
            results.push(result);
        }
        return results
    }

    // 车辆分析统计
    private static IntelligentAnalysis_Vehicle(data?: any) {
        let seriesData = data.seriesData as any;
        let xData = data.xData as Array<string>;

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

        // let legendData = this.mockAreaStatistic[0].retrievalStatistics as Array<string>;

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

    // 人员分析统计
    private static IntelligentAnalysis_Face(data?: any) {
        let seriesData = data.seriesData as any;
        let xData = data.xData as Array<string>;

        let option = new ChartOptions.EChartOption();
        //tooltip
        option.tooltip = new ChartOptions.tooltip();

        //color
        option.color = ["#7cccf2"];

        //legend
        option.legend = new ChartOptions.legend();
        delete option.legend.left;
        option.legend.right = "20px";
        option.legend.top = "10px";
        option.legend.data = [] as any;
        option.legend.itemWidth = 15;
        option.legend.itemHeight = 10;

        // let legendData = this.mockAreaStatistic[0].retrievalStatistics as Array<string>;

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

    // MAC分析统计
    private static IntelligentAnalysis_Mac(data?: any) {
        let seriesData = data.seriesData as any;
        let xData = data.xData as Array<string>;

        let option = new ChartOptions.EChartOption();
        //tooltip
        option.tooltip = new ChartOptions.tooltip();

        //color
        option.color = ["#dcbe99"];

        //legend
        option.legend = new ChartOptions.legend();
        delete option.legend.left;
        option.legend.right = "20px";
        option.legend.top = "10px";
        option.legend.data = [] as any;
        option.legend.itemWidth = 15;
        option.legend.itemHeight = 10;

        // let legendData = this.mockAreaStatistic[0].retrievalStatistics as Array<string>;

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
        // option.xAxis.axisLabel.textStyle.fontSize = "10";d

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

    // 碰撞分析统计
    private static IntelligentAnalysis_Crash(data?: any) {
        console.log(data);
        let seriesData = data.seriesData as any;
        let xData = data.xData as Array<string>;

        let option = new ChartOptions.EChartOption();
        //tooltip
        option.tooltip = new ChartOptions.tooltip();
        //color
        option.color = ["#dcbe99"];
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

    private setData(name: string, data?: any) {
        let option: any = ChartOptionObject(name);
        let listDataXData: Array<string> = ["分析统计", "统计次数"];
        switch (name) {
            case intelligentAnalysisData.IntelligentAnalysis_Vehicle: {
                data = this.getXData(analysisStatisticsController.ModelListOne, data);
                this.VehicleTableList = angular.copy(data);
                this.VehicleTableList.legendData = listDataXData;
                option.config = analysisStatisticsController.IntelligentAnalysis_Vehicle(data);
                return option
            }
            case intelligentAnalysisData.IntelligentAnalysis_Face: {
                data = this.getXData(analysisStatisticsController.ModelListTwo, data);
                this.FaceTableList = angular.copy(data);
                this.FaceTableList.legendData = listDataXData;
                option.config = analysisStatisticsController.IntelligentAnalysis_Face(data);
                return option
            }
            case intelligentAnalysisData.IntelligentAnalysis_Mac: {
                data = this.getXData(analysisStatisticsController.ModelListThird, data);
                this.MacTableList = angular.copy(data);
                this.MacTableList.legendData = listDataXData;
                option.config = analysisStatisticsController.IntelligentAnalysis_Mac(data);
                return option
            }
            case intelligentAnalysisData.IntelligentAnalysis_Crash: {
                this.CrashTableList = angular.copy(data);
                this.CrashTableList.legendData = listDataXData;
                option.config = analysisStatisticsController.IntelligentAnalysis_Crash(data);
                return option
            }
        }
    }

    private getXData(xDataModule: Array<{ code: string, name: string }>, data: any) {
        let newData: any = {
            seriesData: [],
            xData: []
        };
        xDataModule.forEach((Module: { code: string, name: string }, index: number) => {
            newData.seriesData[index] = 0;
            newData.xData[index] = Module.name;
            data.xData.forEach((xData: any, idx: number) => {
                if (Module.name == xData) {
                    newData.seriesData[index] = data.seriesData[idx];
                }
            })
        });
        return newData
    }

    //图表横坐标
    static ModelListOne: Array<{ code: string, name: string }> = [
        OperThirdModule.IntelligentAnalysis_Vehicle_Track,
        OperThirdModule.IntelligentAnalysis_Vehicle_FollowAnalysis,
        OperThirdModule.IntelligentAnalysis_Vehicle_HideDig,
        OperThirdModule.IntelligentAnalysis_Vehicle_CrashAnalysis,
        OperThirdModule.IntelligentAnalysis_Vehicle_FakePlate,
        OperThirdModule.IntelligentAnalysis_Face_FrequencyAnalysis,
        OperThirdModule.IntelligentAnalysis_Vehicle_FrequentCrose
    ];

    static ModelListTwo: Array<{ code: string, name: string }> = [
        OperThirdModule.IntelligentAnalysis_Face_Track,
        OperThirdModule.IntelligentAnalysis_Face_Analysis,
        OperThirdModule.IntelligentAnalysis_Face_AccompanyAnalysis,
        OperThirdModule.IntelligentAnalysis_Face_FrequencyAnalysis,
        OperThirdModule.IntelligentAnalysis_Face_FrequencyAppear,
        OperThirdModule.IntelligentAnalysis_More_FaceMacCrash,
        OperThirdModule.IntelligentAnalysis_Face_AlarmAnalysis
    ];

    static ModelListThird: Array<{ code: string, name: string }> = [
        OperThirdModule.IntelligentAnalysis_Mac_Track,
        OperThirdModule.IntelligentAnalysis_Mac_Accompany,
        OperThirdModule.IntelligentAnalysis_Mac_Frequency,
        OperThirdModule.IntelligentAnalysis_Mac_Alarm,
        OperThirdModule.IntelligentAnalysis_Mac_Crash,
        OperThirdModule.IntelligentAnalysis_More_FaceMacCrash,
        OperThirdModule.IntelligentAnalysis_More_VehicleMacCrash
    ];

    // 列表视图切换
    public analysisSwitch(switchString: string) {
        let that: any = this;
        switch (switchString) {
            case 'carAnalysisHistogram': {
                that.carAnalysisStatisticsList = true;
                break;
            }
            case 'carAnalysisList': {
                that.carAnalysisStatisticsList = false;
                break;
            }
            case 'personAnalysisHistogram': {
                that.personAnalysisStatisticsList = true;
                break;
            }
            case 'personAnalysisList': {
                that.personAnalysisStatisticsList = false;
                break;
            }
            case 'macAnalysisHistogram': {
                that.macAnalysisStatisticsList = true;
                break;
            }
            case 'macAnalysisList': {
                that.macAnalysisStatisticsList = false;
                break;
            }
            case 'CrashAnalysisHistogram': {
                that.crashAnalysisStatisticsList = true;
                break;
            }
            case 'CrashAnalysisList': {
                that.crashAnalysisStatisticsList = false;
                break;
            }
        }
    }

    public exportImage(id: string) {
        this.maintainFactory.exportImage(id)
    }

    public exportExcel(module: string, data: any) {
        this.maintainFactory.exportExcel(module, data);
    }
}

app.controller("analysisStatisticsController", analysisStatisticsController);