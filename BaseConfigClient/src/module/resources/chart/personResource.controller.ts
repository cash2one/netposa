/// <amd-dependency path="text!./enlarge.html" name="enlargeHtml" />
import { app } from "../../common/app/main.app";
import "./echartFactory";
import { IEchartFactory } from "./echartFactory";
import * as ChartOptions from "../../common/enum/EchartConfig";
import { ResourceNameArr, FaceChartName, IconClassName, ResourcePageType } from "../../../core/entity/Resource";
import { personStatisticsName } from "../../common/enum/EchartConfig";
declare let enlargeHtml: any, angular: any, $: any, Object: any;

interface INoMessage {
    PersonStatistics: boolean,
    AreaPersonStatistics: boolean,
    AreaPersonAlarmStatistics: boolean,
    PersonTypeStatistics: boolean,
    PersonColorStatistics: boolean,
}

const noMessage: INoMessage = {
    PersonStatistics: false,
    AreaPersonStatistics: false,
    AreaPersonAlarmStatistics: false,
    PersonTypeStatistics: false,
    PersonColorStatistics: false
};

class personResourceController {
    static $inject = ['$scope', '$timeout', 'layer', 'i18nFactory', '$q', 'echartFactory'];

    personStatisticsConfig: ChartOptions.setEnlargeData;
    areaPersonStatisticsConfig: ChartOptions.setEnlargeData;
    areaPersonAlarmStatisticsConfig: ChartOptions.setEnlargeData;
    personTypeStatisticsConfig: ChartOptions.setEnlargeData;
    personColorStatisticsConfig: ChartOptions.setEnlargeData;
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
        $scope.$on(ResourcePageType.Face.value, function (event: any, data: any) {
            that.init(data, true)
        });

        this.init();

        that.echartFactory.getInitRequire(ResourcePageType.Face.value).then((res: any) => {
            that.init(res);
        })
    }

    private init(chartData?: any) {
        let arr = Object.keys(personStatisticsName) as Array<string>;

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

        if (chartData) {
            this.setData(FaceChartName.AllRankList, chartData["PersonAllRankList"]);
        }
    }

    // 使用缓存的配置文件实现放大效果
    public enlarge(name: string) {
        let that: any = this;
        let data: any = that[name];
        if (name == FaceChartName.AllRankList) {
            that.AllRankListForEnlarge.title = ResourceNameArr.PersonRankList;
            data = angular.copy(that.AllRankListForEnlarge);
        }
        this.echartFactory.enlarge(this.$scope, name, data)
    }

    hiddenLeftRightChart(target: string) {
        if (target == "left") {
            this.leftChartHidden = !this.leftChartHidden
        } else {
            this.rightChartHidden = !this.rightChartHidden
        }
    }

    private PersonStatistics(data?: any, flag?: boolean): ChartOptions.EChartOption {
        let seriesData = [] as any;
        let xData = [] as Array<string>;
        if (data) {
            let dataListData: Array<string> = data.xData ? data.xData : data.dateList;
            if (flag) {
                seriesData = [angular.copy(data.series.flow).slice(-5), angular.copy(data.series.alarm).slice(-5)];
                xData = angular.copy(dataListData).slice(-5);
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

    private AreaPersonStatistics(data?: any, flag?: boolean): ChartOptions.EChartOption {
        let seriesData = [] as any;
        let xData = [] as Array<string>;
        if (data) {
            if (flag) {
                seriesData = [this.echartFactory.sliceArray(data.series.flow), this.echartFactory.sliceArray(data.series.alarm)];
                xData = this.echartFactory.sliceArray(data.legendData)
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
        let left_yAxis = new ChartOptions.yAxis();
        left_yAxis = new ChartOptions.yAxis();
        left_yAxis.type = "value";
        // left_yAxis.max = 40000
        left_yAxis.min = 0;
        left_yAxis.boundaryGap = [0.2, 0.2];
        left_yAxis.splitLine.lineStyle.color = ["#F8F0E9"];
        left_yAxis.splitLine.show = true;
        option.yAxis.push(left_yAxis);

        let right_yAxis: any = new ChartOptions.yAxis();
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

    private AreaPersonAlarmStatistics(data?: any, flag?: boolean): ChartOptions.EChartOption {
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
        option.legend.top = 5;

        //xAxis
        option.xAxis = new ChartOptions.xAxis();
        option.xAxis.type = "category";
        option.xAxis.data = xData;
        option.xAxis.scale = true;
        option.xAxis.boundaryGap = false;
        option.xAxis.axisLabel = new ChartOptions.axisLabel();
        option.xAxis.axisLabel.textStyle.color = "#6F6E6E";
        option.xAxis.axisLine = new ChartOptions.axisLine();
        option.xAxis.splitLine = new ChartOptions.splitLine();
        option.xAxis.splitLine.show = true;
        option.xAxis.splitLine.lineStyle.color = ["#F8F0E9"];
        option.xAxis.splitLine.lineStyle.interval = false;
        option.xAxis.axisLine.lineStyle.color = "#C9C9C9";
        option.xAxis.axisLine.show = true;

        option.yAxis = new ChartOptions.yAxis();
        option.yAxis.type = "value";
        option.yAxis.splitLine.lineStyle.color = ["#F8F0E9"];
        option.yAxis.splitLine.show = true;

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

    private PersonTypeStatistics(data?: any, flag?: boolean): ChartOptions.EChartOption {
        let option = new ChartOptions.EChartOption();

        option.tooltip = new ChartOptions.tooltip();
        option.color = ["#00AAFF"];
        option.series = [] as Array<any>;

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
        // option.xAxis.axisTick = new ChartOptions.axisTick();
        option.xAxis.axisLine = new ChartOptions.axisLine();
        option.xAxis.axisLabel = new ChartOptions.axisLabel();
        // option.xAxis.axisLabel.interval =0;
        // option.xAxis.axisLabel.rotate = 15;
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

        // console.log(JSON.stringify(option))
        return option
    }

    private PersonColorStatistics(data?: any, flag?: boolean): ChartOptions.EChartOption {
        let option = new ChartOptions.EChartOption();
        //color
        option.color = ["#FFFF00", "#5B9BD5", "#00B050", "#D9D9D9", "#000000"];

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

        // let xData = ["人员轨迹","人脸碰撞", "伴随分析", "人脸1:1", "人脸1:N"] as Array<string>;

        //xAxis
        option.xAxis = new ChartOptions.xAxis();
        option.xAxis.type = "category";
        option.xAxis.data = xData;
        option.xAxis.axisLine = new ChartOptions.axisLine();
        option.xAxis.splitLine = new ChartOptions.splitLine();
        option.xAxis.splitLine.show = true;
        option.xAxis.splitLine.lineStyle.color = ["#F8F0E9"];
        option.xAxis.splitLine.lineStyle.interval = false;
        option.xAxis.axisLine.lineStyle.color = "#C9C9C9";
        option.xAxis.axisLine.show = true;
        option.xAxis.axisLabel = new ChartOptions.axisLabel();
        option.xAxis.axisLabel.textStyle.color = "#6F6E6E";
        option.xAxis.axisLabel.interval = 0;
        option.xAxis.axisLabel.rotate = 15;
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
        seriesD.itemStyle.normal = $.extend(areaStyleColor.colorDiff(), seriesD.itemStyle.normal);

        option.series = [seriesD];

        delete option.legend;
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

    private setData(title: string, data?: any) {
        let option = {
            title: ResourceNameArr[title],
            name: title,
            config: {}
        } as ChartOptions.setEnlargeData;

        switch (title) {
            case FaceChartName.PersonStatistics: {
                option.config = this.PersonStatistics(data, true);
                let option2 = angular.copy(option);
                option2.config = this.PersonStatistics(data, false);
                this.personStatisticsConfig = angular.copy(option2);
                return option
            }
            case FaceChartName.AreaPersonStatistics: {
                option.config = this.AreaPersonStatistics(data, true);
                let option2 = angular.copy(option);
                option2.config = this.AreaPersonStatistics(data, false);
                this.areaPersonStatisticsConfig = angular.copy(option2);
                return option
            }
            case FaceChartName.AreaPersonAlarmStatistics: {
                option.config = this.AreaPersonAlarmStatistics(data, true);
                let option2 = angular.copy(option);
                option2.config = this.AreaPersonAlarmStatistics(data, false);
                this.areaPersonAlarmStatisticsConfig = angular.copy(option2);
                return option
            }
            case FaceChartName.PersonTypeStatistics: {
                option.config = this.PersonTypeStatistics(data, true);
                let option2 = angular.copy(option);
                option2.config = this.PersonTypeStatistics(data, false);
                this.personTypeStatisticsConfig = angular.copy(option2);
                return option
            }
            case FaceChartName.PersonColorStatistics: {
                option.config = this.PersonColorStatistics(data, true);
                let option2 = angular.copy(option);
                option2.config = this.PersonColorStatistics(data, false);
                this.personColorStatisticsConfig = angular.copy(option2);
                return option
            }
            case FaceChartName.AllRankList: {
                option.config = this.AllRankList(data, true);
                this.AllRankListConfig = angular.copy(option);
                let option2 = angular.copy(option);
                option2.config = this.AllRankList(data, false);
                this.AllRankListForEnlarge = angular.copy(option2);
                return option
            }
        }
    }
}

app.controller('personResourceController', personResourceController);