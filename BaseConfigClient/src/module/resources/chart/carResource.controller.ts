/// <amd-dependency path="text!./enlarge.html" name="enlargeHtml" />
import { app } from "../../common/app/main.app";
import "./echartFactory";
import { IEchartFactory } from "./echartFactory";
import * as ChartOptions from "../../common/enum/EchartConfig";
import * as _ from 'lodash';
import { carStatisticsName, colorEnumArr } from "../../common/enum/EchartConfig";
import { ResourceNameArr, ResourcePageType, VehicleChartName, IconClassName } from "../../../core/entity/Resource";
declare let enlargeHtml: any, angular: any, Object: any;

interface INoMessage {
    carStatistics: boolean,
    areaCarStatistics: boolean,
    areaCarAlarmStatistics: boolean,
    carTypeStatistics: boolean,
    carColorStatistics: boolean,
}

const noMessage: INoMessage = {
    carStatistics: false,
    areaCarStatistics: false,
    areaCarAlarmStatistics: false,
    carTypeStatistics: false,
    carColorStatistics: false
};

class carResourceController {
    static $inject = ['$scope', '$timeout', 'layer', 'i18nFactory', '$q', 'echartFactory'];

    carStatisticsConfig: ChartOptions.setEnlargeData;
    areaCarStatisticsConfig: ChartOptions.setEnlargeData;
    areaCarAlarmStatisticsConfig: ChartOptions.setEnlargeData;
    carTypeStatisticsConfig: ChartOptions.setEnlargeData;
    carColorStatisticsConfig: ChartOptions.setEnlargeData;
    AllRankListConfig: ChartOptions.setEnlargeData;
    AllRankListForEnlarge: ChartOptions.setEnlargeData;
    resourceParseConfig: ChartOptions.setEnlargeData;
    rankClassName: Array<string> = IconClassName;
    carStatisticsModuleName: any = carStatisticsName;
    parseSwitch: boolean = true;
    leftChartHidden: boolean = false;
    rightChartHidden: boolean = false;

    currentLayerIndex: number;
    noMessage: any = noMessage;

    carFirstModuleName: string = ResourceNameArr.carStatistics;
    ResourceNameArr: any = ResourceNameArr;
    constructor(private $scope: any,
        private $timeout: Function,
        private layer: any,
        private i18nFactory: any,
        private $q: any,
        private echartFactory: IEchartFactory
    ) {
        let that = this as carResourceController;

        $scope.$on(ResourcePageType.Vehicle.value, function (event: any, data: any) {
            that.init(data)
        });

        this.init();

        that.echartFactory.getInitRequire(ResourcePageType.Vehicle.value).then((res: any) => {
            that.init(res);
        })
    }

    private init(chartData?: any) {
        let arr = Object.keys(this.carStatisticsModuleName) as Array<string>;
        let superData: any;

        if (!_.isEmpty(chartData)) {
            superData = {
                carStatistics: chartData.VehicleStatistics,
                areaCarStatistics: chartData.AreaVehicleStatistics,
                areaCarAlarmStatistics: chartData.AreaVehicleAlarmStatistics,
                carTypeStatistics: chartData.VehicleColorStatistics,
                carColorStatistics: chartData.VehicleTypeStatistics,
                AllRankList: chartData.VehicleAllRankList
            }
        }

        for (let i = 0; i < arr.length; i++) {
            if (chartData) {
                let getConfigData: ChartOptions.setEnlargeData = this.setData(arr[i], superData[arr[i]]);

                if (getConfigData && superData[arr[i]]) {
                    this.noMessage[arr[i]] = false;
                    this.echartFactory.initChart(getConfigData);
                } else {
                    this.noMessage[arr[i]] = true;
                }
            } else {
                this.noMessage[arr[i]] = true;
            }
        }
        if (chartData) {
            this.setData(VehicleChartName.AllRankList, chartData.VehicleAllRankList);
        }
    }


    public hiddenLeftRightChart(target: string) {
        if (target == "left") {
            this.leftChartHidden = !this.leftChartHidden
        } else {
            this.rightChartHidden = !this.rightChartHidden
        }
    }

    public enlarge(name: string) {
        let that: any = this;
        let data: any = that[name];
        if (name == VehicleChartName.AllRankList) {
            that.AllRankListForEnlarge.title = ResourceNameArr.CarRankList;
            data = angular.copy(that.AllRankListForEnlarge);
        }
        that.echartFactory.enlarge(that.$scope, name, data)
    }

    private carStatistics(data?: any, flag?: boolean): ChartOptions.EChartOption {
        let seriesData = [] as any;
        let xData = [] as Array<string>;
        if (data && !_.isEmpty(data.series)) {
            if (flag) {
                seriesData = [angular.copy(data.series.flow).slice(-5), angular.copy(data.series.alarm).slice(-5)];
                xData = angular.copy(data.legendData).slice(-5);
            } else {
                seriesData = [angular.copy(data.series.flow), angular.copy(data.series.alarm)];
                xData = angular.copy(data.legendData);
            }
        }
        let option = new ChartOptions.EChartOption();
        //tooltip
        option.tooltip = new ChartOptions.tooltip();

        //color
        option.color = ["#6E91C6", "#B752F8"];

        //legend
        option.legend = new ChartOptions.legend();
        option.legend.top = 5;
        option.legend.data = [] as any;

        //xAxis
        option.xAxis = [] as Array<ChartOptions.xAxis>;
        let left_xAxis = new ChartOptions.xAxis();
        left_xAxis.type = "category";
        left_xAxis.data = xData;
        left_xAxis.axisLine = new ChartOptions.axisLine();
        left_xAxis.axisLabel = new ChartOptions.axisLabel();
        left_xAxis.splitLine = new ChartOptions.splitLine();
        left_xAxis.splitLine.show = true;
        left_xAxis.splitLine.lineStyle.color = ["#F8F0E9"];
        left_xAxis.splitLine.lineStyle.interval = false;
        left_xAxis.axisLine.lineStyle.color = "#C9C9C9";
        left_xAxis.axisLine.show = true;
        left_xAxis.axisLabel.textStyle.color = "#6F6E6E";
        // left_xAxis.axisLabel.textStyle.fontSize = "10"
        option.xAxis.push(left_xAxis);
        let right_xAxis = new ChartOptions.xAxis();
        right_xAxis.type = "category";
        right_xAxis.show = false;
        option.xAxis.push(right_xAxis);

        //grid
        option.grid = new ChartOptions.grid();

        //yAxis
        option.yAxis = [] as Array<ChartOptions.yAxis>;
        let left_yAxis: any = new ChartOptions.yAxis();
        left_yAxis = new ChartOptions.yAxis();
        left_yAxis.type = "value";
        left_yAxis.boundaryGap = [0.2, 0.2];
        left_yAxis.splitLine.lineStyle.color = ["#F8F0E9"];
        left_yAxis.splitLine.show = true;
        // left_yAxis.max = 40000;
        left_yAxis.min = 0;
        option.yAxis.push(left_yAxis);

        let right_yAxis: any = new ChartOptions.yAxis();
        right_yAxis = new ChartOptions.yAxis();
        right_yAxis.type = "value";
        // right_yAxis.max = 700;
        right_yAxis.min = 0;
        right_yAxis.boundaryGap = [0.2, 0.2];
        right_yAxis.splitLine.show = false;
        option.yAxis.push(right_yAxis);

        let legendData = ["流量总量", "报警总量"] as Array<string>;
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
            if (i == 0) {
                seriesD.type = "line"
            } else {
                seriesD.type = "bar";
                seriesD.yAxisIndex = 1;
                seriesD.barWidth = 20
            }
            seriesD.data = seriesData[i];

            option.series.push(seriesD)
        }
        return option
    }

    private areaCarStatistics(data?: any, flag?: boolean): ChartOptions.EChartOption {
        let seriesData = [] as any;
        let xData = [] as Array<string>;
        if (data && data.series && data.series.flow && data.series.alarm) {
            if (flag) {
                seriesData = [angular.copy(data.series.flow).slice(0, 5), angular.copy(data.series.alarm).slice(0, 5)];
                xData = angular.copy(data.legendData).slice(0, 5)
            } else {
                seriesData = [angular.copy(data.series.flow), angular.copy(data.series.alarm)];
                xData = angular.copy(data.legendData);
            }
        }
        let option = new ChartOptions.EChartOption();
        //tooltip
        option.tooltip = new ChartOptions.tooltip();
        //color
        option.color = ["#73DCA3", "#F87952"];
        //legend
        option.legend = new ChartOptions.legend();
        option.legend.top = 5;
        option.legend.data = [] as any;
        //dataZoom
        option.dataZoom = [new ChartOptions.dataZoom()];
        //xAxis
        option.xAxis = [] as Array<ChartOptions.xAxis>;

        let left_xAxis = new ChartOptions.xAxis();
        left_xAxis.type = "category";
        left_xAxis.data = xData;
        left_xAxis.axisLine = new ChartOptions.axisLine();
        left_xAxis.axisLabel = new ChartOptions.axisLabel();
        left_xAxis.splitLine = new ChartOptions.splitLine();
        left_xAxis.splitLine.show = true;
        left_xAxis.splitLine.lineStyle.color = ["#F8F0E9"];
        left_xAxis.splitLine.lineStyle.interval = false;
        left_xAxis.axisLine.lineStyle.color = "#C9C9C9";
        left_xAxis.axisLine.show = true;
        left_xAxis.axisLabel.textStyle.color = "#6F6E6E";

        // left_xAxis.axisLabel.textStyle.fontSize = "10"
        option.xAxis.push(left_xAxis);
        let right_xAxis = new ChartOptions.xAxis();
        right_xAxis.type = "category";
        right_xAxis.show = false;

        option.xAxis.push(right_xAxis);

        //grid
        option.grid = new ChartOptions.grid();

        //yAxis
        option.yAxis = [] as Array<ChartOptions.yAxis>;
        let left_yAxis: any = new ChartOptions.yAxis();
        left_yAxis = new ChartOptions.yAxis();
        left_yAxis.type = "value";
        // left_yAxis.max = 40000
        left_yAxis.min = 0;
        left_yAxis.boundaryGap = [0.2, 0.2];
        left_yAxis.splitLine.lineStyle.color = ["#F8F0E9"];
        left_yAxis.splitLine.show = true;
        option.yAxis.push(left_yAxis);

        let right_yAxis = new ChartOptions.yAxis();
        right_yAxis = new ChartOptions.yAxis();
        right_yAxis.type = "value";
        // right_yAxis.max = 700
        right_yAxis.min = 0;
        right_yAxis.boundaryGap = [0.2, 0.2];
        right_yAxis.splitLine.show = false;
        option.yAxis.push(right_yAxis);

        let legendData = ["流量总量", "报警总量"] as Array<string>;
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
            if (i == 0) {
                seriesD.type = "line"
            } else {
                seriesD.type = "bar";
                seriesD.yAxisIndex = 1;
                seriesD.barWidth = 20
            }
            seriesD.data = seriesData[i];

            option.series.push(seriesD)
        }
        return option
    }

    private areaCarAlarmStatistics(data?: any, flag?: boolean): ChartOptions.EChartOption {
        let legendData = [] as Array<string>;
        let seriesData = [] as any;
        let xData = [] as Array<string>;
        let option = new ChartOptions.EChartOption();

        if (data && !_.isEmpty(data.series)) {
            if (flag) {
                legendData = this.echartFactory.sliceArray(data.legendData);
                xData = this.echartFactory.sliceArray(data.xData);
                seriesData = this.echartFactory.sliceArray(data.series);
            } else {
                legendData = angular.copy(data.legendData);
                xData = angular.copy(data.xData);
                seriesData = angular.copy(data.series);
            }
        }
        //tooltip
        option.tooltip = new ChartOptions.tooltip();
        //color
        option.color = ["#EE8741", "#FFC820", "#6AA4D8", "#D8D8D8", "#4472C4"];
        //grid
        option.grid = new ChartOptions.grid();
        option.grid.top = 40;

        //legend
        option.legend = new ChartOptions.legend();
        option.legend.data = legendData;
        option.legend.itemWidth = 10;
        option.legend.itemHeight = 10;
        option.legend.top = 5;
        //xAxis
        option.xAxis = new ChartOptions.xAxis();
        option.xAxis.axisLabel = new ChartOptions.axisLabel();
        option.xAxis.axisLabel.textStyle.color = "#6F6E6E";
        // option.xAxis.axisLabel.interval = 0;
        // option.xAxis.axisLabel.rotate = 15;
        option.xAxis.type = "category";
        option.xAxis.data = xData;
        option.xAxis.scale = true;
        option.xAxis.boundaryGap = false;
        option.xAxis.axisLine = new ChartOptions.axisLine();
        option.xAxis.splitLine = new ChartOptions.splitLine();
        option.xAxis.splitLine.show = true;
        option.xAxis.splitLine.lineStyle.color = ["#F8F0E9"];
        option.xAxis.splitLine.lineStyle.interval = false;
        option.xAxis.axisLine.lineStyle.color = "#C9C9C9";
        option.xAxis.axisLine.show = true;
        // option.xAxis.axisLabel.textStyle.fontSize = "10"

        option.yAxis = new ChartOptions.yAxis();
        option.yAxis.type = "value";
        option.yAxis.splitLine.lineStyle.color = ["#F8F0E9"];
        option.yAxis.splitLine.show = true;
        option.yAxis.splitNumber = 6;

        option.series = [] as Array<any>;
        for (let i = 0; i < legendData.length; i++) {
            // series
            let seriesD = new ChartOptions.series();
            seriesD.name = legendData[i];
            seriesD.type = "line";
            seriesD.data = seriesData[i];

            option.series.push(seriesD)
        }
        return option
    }

    private carTypeStatistics(data?: any, flag?: boolean): ChartOptions.EChartOption {
        let legendData = [] as Array<string>;
        let seriesData = [] as Array<number>;
        let option = new ChartOptions.EChartOption();
        let colors = [] as Array<string>;

        if (data && data.xData && data.seriesData) {
            colorEnumArr.forEach((color: any, index: number) => {
                data.xData.forEach((colorItem: string, i: string) => {
                    if (color.name == colorItem) {
                        colors[index] = color.value;
                        legendData[index] = color.name;
                        seriesData[index] = data.seriesData[i];
                    }
                })
            })
        }

        //color
        option.color = colors;

        //tooltip
        option.tooltip = new ChartOptions.tooltip();
        option.tooltip.trigger = 'item';
        option.tooltip.position = function (pos: Array<number>, params: string, dom: any, rect: any, size: any) {
            let obj: { [key: string]: number } = { top: 60 };
            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
            return obj;
        };

        //grid
        option.grid = new ChartOptions.grid();
        option.grid.top = 60;

        //legend
        option.legend.data = legendData;
        option.legend.orient = "horizontal";
        option.legend.itemWidth = 10;
        option.legend.itemHeight = 10;
        option.legend.x = "left";
        option.legend.top = 5;

        //series
        option.series = [] as Array<any>;

        let series_right = new ChartOptions.series();
        series_right.type = "pie";
        series_right.radius = ["35%", "70%"];
        series_right.center = ["50%", "55%"];
        series_right.selectedMode = "single";

        series_right.label = new ChartOptions.label();
        series_right.label.normal = new ChartOptions.normal();
        series_right.label.normal.position = "outside";
        series_right.label.normal.show = false;

        series_right.labelLine = new ChartOptions.labelLine();
        series_right.labelLine.normal = new ChartOptions.normal();
        series_right.labelLine.normal.show = false;

        series_right.itemStyle = new ChartOptions.itemStyle();
        series_right.itemStyle.normal = new ChartOptions.normal();
        series_right.itemStyle.normal.shadowColor = 'rgba(2, 52, 123, 0.2)';
        series_right.itemStyle.normal.shadowOffsetY = 10;
        series_right.itemStyle.normal.shadowBlur = 7;

        series_right.data = [] as Array<any>;

        for (let i = 0; i < legendData.length; i++) {
            let seriesDataA = {} as ChartOptions.seriesDataA;
            seriesDataA.value = seriesData[i];
            seriesDataA.name = legendData[i];
            series_right.data.push(seriesDataA)
        }

        option.series.push(series_right);
        return option
    }

    private carColorStatistics(data?: any, flag?: boolean): ChartOptions.EChartOption {
        let xData = [] as Array<string>;
        let seriesData = [] as any;
        if (data && !_.isEmpty(data.seriesData)) {
            if (flag) {
                xData = angular.copy(data.xData).slice(0, 5);
                seriesData = angular.copy(data.seriesData).slice(0, 5);
            } else {
                xData = angular.copy(data.xData).slice(0, 10);
                seriesData = angular.copy(data.seriesData).slice(0, 10);
            }
        } else {
            return
        }

        let option = new ChartOptions.EChartOption();

        option.tooltip = new ChartOptions.tooltip();
        option.color = ["#00AAFF"];
        option.series = [] as Array<any>;

        //xAxis
        option.xAxis = new ChartOptions.xAxis();
        option.xAxis.type = "category";
        option.xAxis.axisTick = new ChartOptions.axisTick();
        option.xAxis.axisLine = new ChartOptions.axisLine();
        option.xAxis.axisLabel = new ChartOptions.axisLabel();
        option.xAxis.splitLine = new ChartOptions.splitLine();
        option.xAxis.splitLine.lineStyle.color = ["#F8F0E9"];
        option.xAxis.splitLine.show = true;
        option.xAxis.data = xData;

        option.grid = new ChartOptions.grid();
        option.grid.top = 20;

        option.yAxis = new ChartOptions.yAxis();
        option.yAxis.type = "value";
        option.yAxis.splitLine.lineStyle.color = ["#F8F0E9"];
        option.yAxis.splitLine.show = true;

        // series
        let seriesD = new ChartOptions.series();
        seriesD.type = "bar";
        seriesD.data = seriesData;
        seriesD.barWidth = 20;
        option.series.push(seriesD);

        return option
    }

    private AllRankList(data?: any, flag?: boolean): any {
        if (data) {
            let Ranklist = angular.copy(data.series) || [] as Array<any>;
            if (flag) {
                return angular.copy(Ranklist).slice(0, 5)
            } else {
                return angular.copy(Ranklist)
            }
        }
    }

    private setData(title: string, data?: any): ChartOptions.setEnlargeData {
        let option = {
            title: ResourceNameArr[title],
            name: title,
            config: {}
        } as ChartOptions.setEnlargeData;

        switch (title) {
            case VehicleChartName.carStatistics: {
                option.config = this.carStatistics(data, true);
                let option2 = angular.copy(option);
                option2.config = this.carStatistics(data, false);
                this.carStatisticsConfig = angular.copy(option2);
                return option
            }
            case VehicleChartName.areaCarStatistics: {
                option.config = this.areaCarStatistics(data, false);
                this.areaCarStatisticsConfig = option;
                return option
            }
            case VehicleChartName.areaCarAlarmStatistics: {
                option.config = this.areaCarAlarmStatistics(data, true);
                let option2 = angular.copy(option);
                option2.config = this.areaCarAlarmStatistics(data, false);
                this.areaCarAlarmStatisticsConfig = angular.copy(option2);
                return option
            }
            case VehicleChartName.carTypeStatistics: {
                option.config = this.carTypeStatistics(data, true)
                this.carTypeStatisticsConfig = option;
                return option
            }
            case VehicleChartName.carColorStatistics: {
                option.config = this.carColorStatistics(data, true)
                let option2 = angular.copy(option);
                option2.config = this.carColorStatistics(data, false);
                this.carColorStatisticsConfig = angular.copy(option2);
                return option
            }
            case VehicleChartName.AllRankList: {
                option.config = this.AllRankList(data, true);
                this.AllRankListConfig = angular.copy(option);
                let option2 = angular.copy(option);
                option2.config = this.AllRankList(data, false);
                this.AllRankListForEnlarge = option2;
                return option
            }
        }
    }
}

app.controller('carResourceController', carResourceController);