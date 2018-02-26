import { app } from "../../../common/app/main.app";
import "css!module/maintain/css/statisticalanalysis.css";
import "../../main/maintainFactory";
import "../../../common/services/maintain.service";
import * as ChartOptions from "../../../common/enum/EchartConfig";
import { IMaintainService } from "../../../common/services/maintain.service"
import {
    statisticalAnalysisModuleName, StatisticsOverview,
    StatisticsOverviewArr,
    intelligentAnalysisRequireParams
} from "../../../../core/entity/maintainEnum";
import "moment";
import ResourceParams from "../../../../core/params/ResourceParams";
import { ChartOptionObject, IEchartFactory } from "../../main/maintainFactory";
declare let moment: any, angular: any, $: any;

class statisticAlanalysisController {

    static $inject = ["$scope", "$timeout", "maintainFactory", "maintainService"];
    StatisticsOverview: Array<StatisticsOverview> = StatisticsOverviewArr;
    superData: any;

    constructor(private $scope: any,
        private $timeout: any,
        private maintainFactory: IEchartFactory,
        private maintainService: IMaintainService) {
        this.getAllData();
        $scope.$on('initChart', (evt: any, opt: any) => {
            this.getAllData()
        });
        $scope.$on('$destroy', () => {
            this.maintainFactory.destroyChart();
        });


    }

    private getAllData(chartData?: any) {
        let that: any = this;

        // 获取设备数据
        this.deviceStatistics();
        // 任务统计
        this.maintainService.taskStatisticsTotal().then((res: any) => {
            let chartConfig: ChartOptions.setEnlargeData = that.setData(statisticalAnalysisModuleName.taskStatistics, res.data);
            that.maintainFactory.initChart(chartConfig);
        });
        // 报警统计
        let paramsSecond: ResourceParams = this.maintainFactory.alarmParams()
        this.maintainService.alarmStatistics(paramsSecond).then((res: any) => {
            let chartConfig: ChartOptions.setEnlargeData = that.setData(statisticalAnalysisModuleName.alarmStatistics, res.data);
            that.maintainFactory.initChart(chartConfig);
        });
        // 流量统计
        this.maintainService.trafficStatistics().then((res: any) => {
            let chartConfig: ChartOptions.setEnlargeData = that.setData(statisticalAnalysisModuleName.trafficStatistics, res.data);
            that.maintainFactory.initChart(chartConfig);
        });
        // 检索统计
        let RetrievalParams: intelligentAnalysisRequireParams = this.maintainFactory.RetrievalParams();
        this.maintainService.retrievalStatistics(RetrievalParams).then((res: any) => {
            let chartConfig: ChartOptions.setEnlargeData = that.setData(statisticalAnalysisModuleName.retrievalStatistics, res.data);
            that.maintainFactory.initChart(chartConfig);
        });
        // 分析统计
        this.maintainService.analysissTatistics().then((res: any) => {
            let chartConfig: ChartOptions.setEnlargeData = that.setData(statisticalAnalysisModuleName.analysissTatistics, res.data);
            that.maintainFactory.initChart(chartConfig);
        });
    };

    // 设备统计
    private deviceStatistics() {
        let that: statisticAlanalysisController = this;
        let statisticsOverview: Array<StatisticsOverview> = StatisticsOverviewArr;
        that.maintainService.getDevicesStatus().then((res: any) => {
            if (res && res.data) {
                statisticsOverview.forEach((item, index) => {
                    res.data.forEach((itemChild: any) => {
                        if (item.type == itemChild.title) {
                            statisticsOverview[index].online = itemChild.online;
                            statisticsOverview[index].alarm = itemChild.alarm;
                            statisticsOverview[index].total = itemChild.total;
                        }
                    })
                });
                that.StatisticsOverview = statisticsOverview;
            }
        })
    }

    // 任务统计
    private taskStatistics(data?: any) {
        let option = new ChartOptions.EChartOption();

        //title
        option.title = new ChartOptions.title();
        option.title.text = this.getTotel(data.seriesData);
        option.title.subtext = '任务总数';
        option.title.top = '8';
        option.title.left = '15';

        //tooltip
        option.tooltip = new ChartOptions.tooltip();
        option.tooltip.trigger = 'item';
        option.tooltip.position = ['0%', '50%'];

        //color
        option.color = ["#7CCCF2", "#6C8CE4", "#DCBE99", "#FB7061"];

        // 合并感知数据//legend
        let legendData = data.legendData;
        let seriesData = data.seriesData;

        option.legend.data = legendData;
        option.legend.orient = "vertical";
        option.legend.itemWidth = 15;
        option.legend.itemHeight = 10;
        option.legend.top = 70;
        delete option.legend.left;
        option.legend.right = "100px";
        option.legend.itemGap = 20;

        //series
        option.series = [] as Array<any>;
        let series_todo = new ChartOptions.series();
        series_todo.type = "pie";
        series_todo.radius = ['35%', '55%'];
        series_todo.center = ['15%', '50%'];

        series_todo.label = new ChartOptions.label();
        series_todo.label.normal = new ChartOptions.normal();
        series_todo.label.normal.position = "left";
        series_todo.label.normal.show = false;

        series_todo.labelLine = new ChartOptions.labelLine();
        series_todo.labelLine.normal = new ChartOptions.normal();
        series_todo.labelLine.normal.show = false;

        series_todo.itemStyle = new ChartOptions.itemStyle();
        series_todo.itemStyle.normal = new ChartOptions.normal();
        series_todo.itemStyle.normal.shadowColor = 'rgba(2, 52, 123, 0.2)';
        series_todo.itemStyle.normal.shadowOffsetY = 10;
        series_todo.itemStyle.normal.shadowBlur = 7;


        series_todo.data = [] as Array<any>;


        for (let i = 0; i < legendData.length; i++) {
            let seriesDataA = {} as ChartOptions.seriesDataA;
            seriesDataA.value = seriesData[i];
            seriesDataA.name = legendData[i];
            series_todo.data.push(seriesDataA)
        }

        option.series.push(series_todo);

        return option
    }

    // 报警统计
    private alarmStatistics(data?: any) {
        let seriesData = data.seriesData as any;
        let xData = data.xData as Array<string>;

        let option = new ChartOptions.EChartOption();
        //tooltip
        option.tooltip = new ChartOptions.tooltip();

        //color
        option.color = ["#6c8ce4", "#7cccf2", "#dcbe99"];

        //legend
        option.legend = new ChartOptions.legend();
        option.legend.top = "10px";
        delete option.legend.left;
        option.legend.right = "20px";
        option.legend.data = [] as any;
        option.legend.itemWidth = 15;
        option.legend.itemHeight = 10;
        option.legend.itemGap = 40;

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
        option.grid.top = 45;
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

        // console.log(JSON.stringify(option))
        return option
    }

    // 流量统计
    private trafficStatistics(data?: any) {
        let seriesData = data.seriesData as any;
        let xData = data.xData as Array<string>;
        let option = new ChartOptions.EChartOption();
        let text = data.totalNum || 0;
        // title
        option.title = new ChartOptions.title();
        option.title.text = text;
        option.title.subtext = "流量统计";
        option.title.top = '8';
        option.title.left = '15';

        //tooltop
        option.tooltip = new ChartOptions.tooltip();
        option.tooltip.trigger = "axis";

        // color
        option.color = ["#7CCCF2", "#6C8CE4", "#f8a619", "#00d5e2"];

        // legend
        let legendData = data.legendData as Array<string>;
        option.legend.data = [] as any;
        option.legend.top = "20px";
        delete option.legend.left;
        option.legend.right = "20px";
        option.legend.itemWidth = 20;
        option.legend.itemHeight = 10;
        option.legend.itemGap = 30;
        option.legend.icon = null;
        // let xData = ["08-01","08-02","08-03","08-04","08-05"] as Array<string>

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
        option.grid.top = 80;
        option.grid.bottom = 20;

        //yAxis
        option.yAxis = new ChartOptions.yAxis();
        option.yAxis.type = "value";
        option.yAxis.splitLine.lineStyle.color = "#F8F0E9";
        option.yAxis.splitLine.show = true;
        // option.yAxis.min = 0
        // option.yAxis.max = 40000

        option.series = [] as Array<any>;

        //渐变颜色
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
            seriesD.data = seriesData[i];
            seriesD.name = legendData[i];
            let areaStyleColor: any = new ChartOptions.areaStyleColor(areaColor[i]);
            seriesD.areaStyle = new ChartOptions.areaStyle();
            seriesD.areaStyle.normal = new ChartOptions.ObjectNormal();
            seriesD.areaStyle.normal = areaStyleColor.getColor();

            option.series.push(seriesD)
        }

        return option
    }

    // 检索统计 
    private retrievalStatistics(data?: any) {
        let option = new ChartOptions.EChartOption();
        let seriesData = data.seriesData as Array<number>;
        let yData = data.yData;

        //tooltip
        option.tooltip = new ChartOptions.tooltip();
        option.tooltip.trigger = "axis";
        option.tooltip.axisPointer = new ChartOptions.axisPointer();
        option.tooltip.axisPointer.type = "line";
        // option.tooltip.axisPointer.type = "cross";

        //color
        option.color = ["#F8A311", "#ABD4EF", "#00D5E2", "#FB7061", "#6C8CE4", "#7CCCF2"];

        //grid
        option.grid = new ChartOptions.grid();
        option.grid.right = 30;
        option.grid.bottom = 20;

        //xAxis
        option.xAxis = new ChartOptions.xAxis();
        // option.xAxis.boundaryGap = false;
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
        seriesD.data = seriesData;
        seriesD.barWidth = 12;
        seriesD.itemStyle = new ChartOptions.itemStyle();
        seriesD.itemStyle.normal = new ChartOptions.normal();
        seriesD.itemStyle.normal.barBorderRadius = [0, 50, 50, 0];

        let areaStyleColor: any = new ChartOptions.areaStyleColor(["#F8A311", "#ABD4EF", "#00D5E2", "#FB7061", "#6C8CE4", "#7CCCF2"]);
        seriesD.itemStyle.normal = $.extend(areaStyleColor.colorDiff(), seriesD.itemStyle.normal);

        option.series.push(seriesD);

        delete option.legend;

        return option
    }

    // 分析统计
    private analysissTatistics(data?: any) {
        let option = new ChartOptions.EChartOption();
        let seriesData = data.seriesData as Array<number>;
        let legendData = data.legendData;

        //tooltip
        option.tooltip = new ChartOptions.tooltip();
        option.tooltip.trigger = 'item';
        option.tooltip.position = ['0%', '50%'];

        //color
        option.color = ["#7CCCF2", "#6C8CE4", "#DCBE99"];

        //legend
        option.legend.data = legendData;
        option.legend.orient = "vertical";
        option.legend.itemWidth = 15;
        option.legend.itemHeight = 10;
        option.legend.top = "95px";
        option.legend.left = "550px";
        option.legend.itemGap = 25;

        //series
        option.series = [] as Array<any>;
        let series_todo = new ChartOptions.series();
        series_todo.type = "pie";
        series_todo.radius = ['30%', '50%'];
        series_todo.center = ['15%', '40%'];

        series_todo.label = new ChartOptions.label();
        series_todo.label.normal = new ChartOptions.normal();
        series_todo.label.normal.position = "left";
        series_todo.label.normal.show = false;

        series_todo.labelLine = new ChartOptions.labelLine();
        series_todo.labelLine.normal = new ChartOptions.normal();
        series_todo.labelLine.normal.show = false;

        series_todo.itemStyle = new ChartOptions.itemStyle();
        series_todo.itemStyle.normal = new ChartOptions.normal();
        series_todo.itemStyle.normal.shadowColor = 'rgba(2, 52, 123, 0.2)';
        series_todo.itemStyle.normal.shadowOffsetY = 10;
        series_todo.itemStyle.normal.shadowBlur = 7;

        series_todo.data = [] as Array<any>;


        if (legendData) {
            for (let i = 0; i < legendData.length; i++) {
                let seriesDataA = {} as ChartOptions.seriesDataA;
                seriesDataA.value = seriesData[i];
                seriesDataA.name = legendData[i];

                series_todo.data.push(seriesDataA)
            }
        }

        option.series.push(series_todo);

        // console.log(JSON.stringify(option));
        return option
    }

    private setData(name: string, data?: any) {
        let option: any = ChartOptionObject(name);
        switch (name) {
            case 'taskStatistics': {
                option.config = this.taskStatistics(data);
                return option
            }
            case 'alarmStatistics': {
                option.config = this.alarmStatistics(data);
                return option
            }
            case 'trafficStatistics': {
                option.config = this.trafficStatistics(data);
                return option
            }
            case 'retrievalStatistics': {
                option.config = this.retrievalStatistics(data);
                return option
            }
            case 'analysissTatistics': {
                option.config = this.analysissTatistics(data);
                return option
            }
        }
    }

    private getTotel(data: Array<any>) {
        let newArr: Array<string> = [];

        let getString: Function = (list: any) => {
            if (Array.isArray(list)) {
                list.forEach(function (result) {
                    getString(result);
                })
            } else {
                newArr.push(list);
            }
        };

        getString(data);

        return newArr.reduce(function (previousValue, currentValue, index, array) {
            return previousValue + currentValue;
        });
    }
}

app.controller('statisticalAnalysisController', statisticAlanalysisController);