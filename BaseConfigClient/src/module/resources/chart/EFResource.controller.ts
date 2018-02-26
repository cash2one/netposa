/// <amd-dependency path="text!./enlarge.html" name="enlargeHtml" />
import { app } from "../../common/app/main.app";
import "./echartFactory";
import { IEchartFactory } from "./echartFactory";
import * as ChartOptions from "../../common/enum/EchartConfig";
import { ResourceNameArr, ResourcePageType, EFENCEChartName, IconClassName } from "../../../core/entity/Resource";
import { EFENCEStatisticsName } from "../../common/enum/EchartConfig";
declare let enlargeHtml: any, angular: any, $: any, Object: any;

interface INoMessage {
    EFStatistics: boolean,
    AreaEFStatistics: boolean,
    AreaEFAlarmStatistics: boolean,
    EFTypeStatistics: boolean,
    EFColorStatistics: boolean,
}

const noMessage: INoMessage = {
    EFStatistics: false,
    AreaEFStatistics: false,
    AreaEFAlarmStatistics: false,
    EFTypeStatistics: false,
    EFColorStatistics: false
};

class EFResourceController {
    static $inject = ['$scope', '$timeout', 'layer', 'i18nFactory', '$q', 'echartFactory'];

    EFStatisticsConfig: ChartOptions.setEnlargeData;
    areaEFStatisticsConfig: ChartOptions.setEnlargeData;
    areaEFAlarmStatisticsConfig: ChartOptions.setEnlargeData;
    EFTypeStatisticsConfig: ChartOptions.setEnlargeData;
    EFColorStatisticsConfig: ChartOptions.setEnlargeData;
    AllRankListConfig: ChartOptions.setEnlargeData;
    AllRankListForEnlarge: ChartOptions.setEnlargeData;
    rankClassName: Array<string> = IconClassName;
    leftChartHidden: boolean = false;
    rightChartHidden: boolean = false;
    currentLayerIndex: number;
    noMessage: any = noMessage;
    ResourceNameArr: any = ResourceNameArr;
    constructor(private $scope: any,
        private $timeout: Function,
        private layer: any,
        private i18nFactory: any,
        private $q: any,
        private echartFactory: IEchartFactory
    ) {
        let that = this as any;
        $scope.$on(ResourcePageType.EFENCE.value, function (event: any, data: any) {
            that.init(data);
        });

        this.init();

        that.echartFactory.getInitRequire(ResourcePageType.EFENCE.value).then((res: any) => {
            that.init(res);
        })
    }

    private init(chartData?: any) {
        let arr = Object.keys(EFENCEStatisticsName) as Array<string>;
        let _noMessage: { [key: string]: boolean } = this.noMessage as any;
        for (let i = 0; i < arr.length; i++) {
            if (chartData) {
                let getConfigData: ChartOptions.setEnlargeData = this.setData(arr[i], chartData[arr[i]]);
                if (getConfigData) {
                    this.noMessage[arr[i]] = false;
                    this.echartFactory.initChart(getConfigData);
                } else {
                    this.noMessage[arr[i]] = true;
                }
            } else {
                this.noMessage[arr[i]] = true;
            }
        }
        this.noMessage = _noMessage as any;

        if (chartData) {
            this.setData(EFENCEChartName.EFAllRankList, chartData[EFENCEChartName.EFAllRankList]);
        }
    }

    hiddenLeftRightChart(target: string) {
        if (target == "left") {
            this.leftChartHidden = !this.leftChartHidden
        } else {
            this.rightChartHidden = !this.rightChartHidden
        }
    }

    // 使用缓存的配置文件实现放大效果
    public enlarge(name: string) {
        let that: any = this;
        let data: ChartOptions.setEnlargeData = that[name];
        if (name == EFENCEChartName.EFAllRankList) {
            that.AllRankListForEnlarge.name = "AllRankList";
            that.AllRankListForEnlarge.title = ResourceNameArr.EFRankList;
            data = angular.copy(that.AllRankListForEnlarge);
        }

        that.echartFactory.enlarge(that.$scope, name, data)
    }

    private EFStatistics(data?: any, flag?: boolean): ChartOptions.EChartOption {
        let seriesData = [] as any;
        let xData = [] as Array<string>;
        if (data) {
            let dataListData: Array<string> = data.xData ? data.xData : data.dateList;
            if (flag) {
                seriesData = [angular.copy(data.series.flow).splice(-5), angular.copy(data.series.alarm).splice(-5)];
                xData = angular.copy(dataListData).splice(-5);
            } else {
                seriesData = [angular.copy(data.series.flow), angular.copy(data.series.alarm)];
                xData = angular.copy(data.dateList);
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

        // let xData = ["08-01","08-02","08-03","08-04","08-05"] as Array<string>;
        // let seriesData = [
        //     [10000,31000,2000,33000,28000],
        //     [500,410,120,550,200]
        // ] as any;

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

        let right_yAxis = new ChartOptions.yAxis();
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

    private AreaEFStatistics(data?: any, flag?: boolean): ChartOptions.EChartOption {
        let seriesData = [] as any;
        let xData = [] as Array<string>;
        if (data) {
            if (flag) {
                seriesData = [angular.copy(data.series.flow).splice(0, 5), angular.copy(data.series.alarm).splice(0, 5)];
                xData = angular.copy(data.legendData).splice(0, 5)
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

    private AreaEFAlarmStatistics(data?: any, flag?: boolean): ChartOptions.EChartOption {
        let legendData = [] as Array<string>;
        let seriesData = [] as any;
        let xData = [] as Array<string>;
        if (data) {
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
        let option = new ChartOptions.EChartOption();
        //tooltip
        option.tooltip = new ChartOptions.tooltip();
        //color
        option.color = ["#EE8741", "#FFC820", "#6AA4D8", "#D8D8D8", "#4472C4"];
        //grid
        option.grid = new ChartOptions.grid();
        //legend
        option.legend = new ChartOptions.legend();
        option.legend.data = legendData;

        //xAxis
        option.xAxis = new ChartOptions.xAxis();
        option.xAxis.type = "category";
        option.xAxis.data = xData;
        option.xAxis.scale = true;
        option.xAxis.boundaryGap = false;
        option.xAxis.axisLine = new ChartOptions.axisLine();
        option.xAxis.axisLabel = new ChartOptions.axisLabel();
        option.xAxis.splitLine = new ChartOptions.splitLine();
        option.xAxis.splitLine.show = true;
        option.xAxis.splitLine.lineStyle.color = ["#F8F0E9"];
        option.xAxis.splitLine.lineStyle.interval = false;
        option.xAxis.axisLine.lineStyle.color = "#C9C9C9";
        option.xAxis.axisLine.show = true;
        option.xAxis.axisLabel.textStyle.color = "#6F6E6E";

        option.yAxis = new ChartOptions.yAxis();
        option.yAxis.type = "value";
        option.yAxis.splitLine.lineStyle.color = ["#F8F0E9"];
        option.yAxis.splitLine.show = true;

        option.series = [] as Array<any>;
        for (let i = 0; i < legendData.length; i++) {
            if (legendData[i]) {
                // series
                let seriesD = new ChartOptions.series();
                seriesD.name = legendData[i];
                seriesD.type = "line";
                seriesD.data = seriesData[i];

                option.series.push(seriesD)
            } else {
                delete legendData[i];
            }

        }
        return option
    }

    private EFTypeStatistics(data?: any, flag?: boolean): ChartOptions.EChartOption {
        let option = new ChartOptions.EChartOption();

        option.tooltip = new ChartOptions.tooltip();
        option.color = ["#00AAFF"];
        option.series = [] as Array<any>;

        // let xData = ["1月", "2月", "3月", "4月", "5月", "6月"] as Array<string>
        // let seriesData = [1200, 1500, 2500, 4500, 3500, 1600] as any
        let xData = [] as Array<string>;
        let seriesData = [] as any;
        if (data) {
            if (flag) {
                if (!data.legendData) {
                    data.legendData = []
                }
                xData = data.xData ? data.xData : this.echartFactory.sliceArray(data.dateList);
                seriesData = this.echartFactory.sliceArray(data.series);
            } else {
                xData = angular.copy(data.dateList);
                seriesData = angular.copy(data.series);
            }
        }
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
        option.yAxis.splitNumber = 8;

        // series
        let seriesD = new ChartOptions.series();
        seriesD.type = "bar";
        seriesD.data = seriesData;
        seriesD.barWidth = 20;
        option.series.push(seriesD);

        return option
    }

    private EFColorStatistics(data?: any, flag?: boolean): ChartOptions.EChartOption {
        let option = new ChartOptions.EChartOption();

        let seriesData = [] as Array<Array<number>>;
        let xData = [] as Array<string>;
        if (data) {
            if (flag) {
                seriesData = angular.copy(data.series).slice(0, 5);
                xData = angular.copy(data.legendData).slice(0, 5)
            } else {
                seriesData = angular.copy(data.series);
                xData = angular.copy(data.legendData)
            }
        }

        //grid
        option.grid = new ChartOptions.grid();
        option.grid.top = 20;
        // option.grid.bottom = 40;

        // let xData = ["人员轨迹","人脸碰撞", "伴随分析", "人脸1:1", "人脸1:N"] as Array<string>;

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
        // option.xAxis.axisLabel.textStyle.fontSize = "10"

        option.yAxis = new ChartOptions.yAxis();
        option.yAxis.type = "value";
        option.yAxis.splitLine.lineStyle.color = ["#F8F0E9"];
        option.yAxis.splitLine.show = true;

        // series
        let seriesD = new ChartOptions.series();
        seriesD.type = "bar";
        seriesD.data = seriesData;
        seriesD.barWidth = 20;
        seriesD.itemStyle = new ChartOptions.itemStyle();
        seriesD.itemStyle.normal = new ChartOptions.normal();

        let areaStyleColor: any = new ChartOptions.areaStyleColor(["#F8A311", "#ABD4EF", "#00D5E2", "#FB7061", "#6C8CE4", "#7CCCF2"]);
        let object: any = Object;
        seriesD.itemStyle.normal = $.extend(areaStyleColor.colorDiff(), seriesD.itemStyle.normal);

        option.series = [seriesD];

        return option
    }

    private EFAllRankList(data?: any, flag?: boolean): any {
        if (data) {
            if (flag) {
                return angular.copy(data.series).splice(0, 5)
            } else {
                return angular.copy(data.series)
            }
        }
    }

    private setData(title: string, data?: any) {
        let option = {
            title: ResourceNameArr[title],
            name: title,
            config: {}
        } as ChartOptions.setEnlargeData;

        switch (title) {
            case EFENCEChartName.EFStatistics: {
                option.config = this.EFStatistics(data, true);
                let option2 = angular.copy(option);
                option2.config = this.EFStatistics(data, false);
                this.EFStatisticsConfig = angular.copy(option2);
                return option
            }
            case EFENCEChartName.AreaEFStatistics: {
                option.config = this.AreaEFStatistics(data, true);
                let option2 = angular.copy(option);
                option2.config = this.AreaEFStatistics(data, false);
                this.areaEFStatisticsConfig = angular.copy(option2);
                return option
            }
            case EFENCEChartName.AreaEFAlarmStatistics: {
                option.config = this.AreaEFAlarmStatistics(data, true);
                let option2 = angular.copy(option);
                option2.config = this.AreaEFAlarmStatistics(data, false);
                this.areaEFAlarmStatisticsConfig = angular.copy(option2);
                return option
            }
            case EFENCEChartName.EFTypeStatistics: {
                option.config = this.EFTypeStatistics(data, true);
                let option2 = angular.copy(option);
                option2.config = this.EFTypeStatistics(data, false);
                this.EFTypeStatisticsConfig = angular.copy(option2);
                return option
            }
            case EFENCEChartName.EFColorStatistics: {
                option.config = this.EFColorStatistics(data, true);
                let option2 = angular.copy(option);
                option2.config = this.EFColorStatistics(data, false);
                this.EFColorStatisticsConfig = angular.copy(option2);
                return option
            }
            case EFENCEChartName.EFAllRankList: {
                option.config = this.EFAllRankList(data, true);
                this.AllRankListConfig = angular.copy(option);
                let option2 = angular.copy(option);
                option2.config = this.EFAllRankList(data, false);
                this.AllRankListForEnlarge = option2;
                return option
            }
        }
    }
}

app.controller('EFResourceController', EFResourceController);