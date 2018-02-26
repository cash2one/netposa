import { app } from "../../../common/app/main.app";
import "css!module/maintain/css/taskStatistics.css";
import "../../main/maintainFactory";
import "../../../common/services/maintain.service";
import * as ChartOptions from "../../../common/enum/EchartConfig";
import { IMaintainService } from "../../../common/services/maintain.service"
import { ResponseResult } from '../../../../core/params/result/ResponseResult';
import { echartNameArr, taskStatisticsModuleName, intelligentAnalysisDataEnum, intelligentAnalysisData } from "../../../../core/entity/maintainEnum";
import { ChartOptionObject } from "../../main/maintainFactory";
declare let $: any, angular: any;

class dispatchedAboutTaskStatisticsEnum {
    seriesData: Array<number>;
    yData: Array<number>;
}

class taskStatisticsController {

    static $inject = ["$scope", "$timeout", "maintainFactory", "maintainService"];

    // 切换按钮
    areaTaskList: boolean = true;
    areaDispatchedTaskList: boolean = true;
    dispatchedAboutTaskList: boolean = true;
    // 信息缓存
    areaTaskConfig: any;
    areaDispatchedTaskConfig: any;
    dispatchedAboutTaskConfig: any;
    // 下拉菜单 时间控件
    dropList: any = [];
    // 获取后端信息
    superData: any;

    areaTaskTableTitle: Array<string> = ['行政区域', '人像结构化任务', '车辆结构化任务'];
    areaTaskTableTitleWidth: string = 100 / this.areaTaskTableTitle.length + '%';

    echartNameArr: any = angular.copy(echartNameArr);
    ModuleNameArr: intelligentAnalysisDataEnum = angular.copy(intelligentAnalysisData);
    // 列表视图
    areaTaskStatisticsList: any;
    areaDispatchedTaskStatisticsList: any;
    dispatchedAboutTaskStatisticsList: any;

    constructor(
        private $scope: any,
        private $timeout: any,
        private maintainFactory: any,
        private maintainService: IMaintainService
    ) {
        this.init();
        $scope.$on('initChart', (evt: any, opt: any) => {
            this.init()
        });
        $scope.$on('$destroy', () => {
            this.maintainFactory.destroyChart();
        });
    }

    private getSuperData(superData: any) {
        this.areaTaskStatisticsList = angular.copy(superData.areaTaskStatistics);
        this.areaDispatchedTaskStatisticsList = angular.copy(superData.areaDispatchedTaskStatistics);
        this.dispatchedAboutTaskStatisticsList = angular.copy(superData.dispatchedAboutTaskStatistics);
        this.dispatchedAboutTaskStatisticsList.legendData = ["布控库名称", "任务数"];

        let arr = Object.keys(taskStatisticsModuleName) as Array<string>;
        for (let i = 0; i < arr.length; i++) {
            try {
                this.maintainFactory.initChart(this.setData(arr[i], superData[arr[i]]))
            } catch (err) {
                console.error(err)
            }
        }
    }

    private init(chartData?: any) {
        let _self = this as taskStatisticsController;
        if (_self.superData) {
            this.getSuperData(_self.superData)
        } else {
            _self.maintainService.taskStatistic().then((res: ResponseResult<any>) => {
                _self.superData = {
                    areaTaskStatistics: {
                        seriesData: res.data.areaTaskStatistics.seriesData,
                        xData: res.data.areaTaskStatistics.xData,
                        legendData: res.data.areaTaskStatistics.legendData
                    },
                    areaDispatchedTaskStatistics: {
                        seriesData: res.data.areaDispatchedTaskStatistics.seriesData,
                        xData: res.data.areaDispatchedTaskStatistics.xData,
                        legendData: res.data.areaDispatchedTaskStatistics.legendData
                    },
                    dispatchedAboutTaskStatistics: _self.dispatchedAboutTaskData(res.data.dispatchedAboutTaskStatistics)
                };

                this.getSuperData(_self.superData)
            });
        }
    }

    private dispatchedAboutTaskData(data: any) {
        let dispatchedAboutTaskStatistics: dispatchedAboutTaskStatisticsEnum = {
            seriesData: [],
            yData: []
        };
        data.forEach((item: any) => {
            if (!this.dropList.length) {
                this.dropList.push({ text: item.area })
            }
            this.dropList.forEach((dropData: any) => {
                if (dropData.text.indexOf(item.area) == -1) {
                    this.dropList.push({ text: item.area })
                }
            });

            dispatchedAboutTaskStatistics.yData.push(item.yData);
            dispatchedAboutTaskStatistics.seriesData.push(item.seriesData);
        });
        return dispatchedAboutTaskStatistics
    }

    // 区域结构化任务统计
    private static areaTaskStatistics(data?: any) {
        console.log(data);
        if (!data) { return false }
        let seriesData = angular.copy(data.seriesData) as Array<Array<number>>;
        let xData = data.xData as Array<string>;

        let option = new ChartOptions.EChartOption();
        //tooltip
        option.tooltip = new ChartOptions.tooltip();

        //color
        option.color = ["#6c8ce4", "#7cccf2", "#dcbe99"];

        //legend
        option.legend = new ChartOptions.legend();
        delete option.legend.left;
        option.legend.right = "20px";
        option.legend.top = "10px";
        option.legend.data = [] as any;
        option.legend.itemWidth = 15;
        option.legend.itemHeight = 10;
        option.legend.itemGap = 60;

        let legendData = data.legendData as Array<string>;

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

        for (let i = 0; i < legendData.length; i++) {
            // legend
            let legendArrayData = {} as ChartOptions.dataText;
            legendArrayData.name = legendData[i];
            legendArrayData.textStyle = new ChartOptions.dataStyleText();
            legendArrayData.icon = "stack";
            option.legend.data.push(legendArrayData);
            // series
            let seriesD = new ChartOptions.series();
            seriesD.name = legendData[i];
            seriesD.type = "bar";
            seriesD.stack = "总量";
            seriesD.barWidth = 35;

            seriesD.label = new ChartOptions.label;
            seriesD.label.normal = new ChartOptions.normal;
            seriesD.label.normal.position = "insideRight";
            seriesD.data = seriesData[i];

            option.series.push(seriesD)
        }

        return option
    }

    // 区域布控任务统计
    private static areaDispatchedTaskStatistics(data?: any) {
        if (!data) { return false }
        let seriesData = angular.copy(data.seriesData) as Array<Array<number>>;
        let xData = data.xData as Array<string>;

        let option = new ChartOptions.EChartOption();
        //tooltip
        option.tooltip = new ChartOptions.tooltip();

        //color
        option.color = ["#6c8ce4", "#7cccf2", "#dcbe99"];

        //legend
        option.legend = new ChartOptions.legend();
        delete option.legend.left;
        option.legend.right = "20px";
        option.legend.top = "10px";
        option.legend.data = [] as any;
        option.legend.itemWidth = 15;
        option.legend.itemHeight = 10;
        option.legend.itemGap = 60;

        let legendData = data.legendData as Array<string>;

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
        for (let i = 0; i < legendData.length; i++) {
            // legend
            let legendArrayData = {} as ChartOptions.dataText;
            legendArrayData.name = legendData[i];
            legendArrayData.textStyle = new ChartOptions.dataStyleText();
            legendArrayData.icon = "stack";
            option.legend.data.push(legendArrayData);
            // series
            let seriesD = new ChartOptions.series();
            seriesD.name = legendData[i];
            seriesD.type = "bar";
            seriesD.stack = "总量";
            seriesD.barWidth = 35;

            seriesD.label = new ChartOptions.label;
            seriesD.label.normal = new ChartOptions.normal;
            seriesD.label.normal.position = "insideRight";
            seriesD.data = seriesData[i];

            option.series.push(seriesD)
        }
        // console.log(JSON.stringify(option));
        return option
    }

    // 布控库相关任务统计
    private static dispatchedAboutTaskStatistics(data?: any) {
        let option = new ChartOptions.EChartOption();
        let seriesData = data.seriesData.slice(0, 10) as Array<number>;
        let yData = data.yData.slice(0, 10) as Array<string>;

        //tooltip
        option.tooltip = new ChartOptions.tooltip();
        option.tooltip.trigger = "axis";
        option.tooltip.axisPointer = new ChartOptions.axisPointer();
        option.tooltip.axisPointer.type = "line";
        // option.tooltip.axisPointer.type = "cross";

        //grid
        option.grid = new ChartOptions.grid();
        option.grid.top = 50;
        option.grid.bottom = 20;

        //xAxis
        option.xAxis = new ChartOptions.xAxis();
        option.xAxis.boundaryGap = false;
        option.xAxis.axisLine = new ChartOptions.axisLine();
        option.xAxis.axisLabel = new ChartOptions.axisLabel();
        option.xAxis.splitLine = new ChartOptions.splitLine();
        option.xAxis.splitLine.lineStyle.color = "#F8F0E9";
        option.xAxis.splitLine.show = true;
        option.xAxis.type = "value";

        //yAxis
        option.yAxis = new ChartOptions.yAxis();
        option.yAxis.splitLine.lineStyle.color = "#F8F0E9";
        option.yAxis.splitLine.show = true;
        option.yAxis.type = "category";

        option.yAxis.data = yData;

        //series
        option.series = [] as Array<any>;

        let seriesD = new ChartOptions.series();
        seriesD.type = 'bar';
        seriesD.stack = '总量';
        seriesD.data = seriesData;
        seriesD.barWidth = 15;
        seriesD.itemStyle = new ChartOptions.itemStyle();
        seriesD.itemStyle.normal = new ChartOptions.normal();
        seriesD.itemStyle.normal.barBorderRadius = [0, 20, 20, 0];

        let colors = ["#F8A311", "#ABD4EF", "#00D5E2", "#FB7061", "#6C8CE4", "#7CCCF2"];
        let colorArr: Array<string> = [];
        yData.forEach((y: string, index: number) => {
            colors[index] = colorArr[Math.ceil(Math.round(colors.length))]
        });

        let areaStyleColor: any = new ChartOptions.areaStyleColor(["#F8A311"]);
        seriesD.itemStyle.normal = $.extend(areaStyleColor.colorDiff(), seriesD.itemStyle.normal);

        option.series.push(seriesD);

        delete option.legend;
        // console.log(JSON.stringify(option));
        return option
    }

    private setData(name: string, data?: any) {
        let option: any = ChartOptionObject(name);
        switch (name) {
            case 'areaTaskStatistics': {
                option.config = taskStatisticsController.areaTaskStatistics(data);
                this.areaTaskConfig = option;
                return option
            }
            case 'areaDispatchedTaskStatistics': {
                option.config = taskStatisticsController.areaDispatchedTaskStatistics(data);
                this.areaDispatchedTaskConfig = option;
                return option
            }
            case 'dispatchedAboutTaskStatistics': {
                option.config = taskStatisticsController.dispatchedAboutTaskStatistics(data);
                this.dispatchedAboutTaskConfig = option;
                return option
            }
        }
    }

    // 图形与列表视图切换
    public areaTaskHistogram(switchString: string) {
        let that: any = this;
        switch (switchString) {
            case 'areaTaskHistogram': {
                that.areaTaskList = true;
                break;
            }
            case 'areaTaskList': {
                that.areaTaskList = false;
                break;
            }
            case 'areaDispatchedTaskHistogram': {
                that.areaDispatchedTaskList = true;
                break;
            }
            case 'areaDispatchedTaskList': {
                that.areaDispatchedTaskList = false;
                break;
            }
            case 'dispatchedAboutTaskHistogram': {
                that.dispatchedAboutTaskList = true;
                break;
            }
            case 'dispatchedAboutList': {
                that.dispatchedAboutTaskList = false;
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

app.controller("taskStatisticsController", taskStatisticsController);