/// <amd-dependency path="text!./enlarge.html" name="enlargeHtml" />
import { app } from "../../common/app/main.app";
import { IEchartFactory } from "./echartFactory";
import * as ChartOptions from "../../common/enum/EchartConfig";
import * as _ from "lodash";
import { ResourceStatisticalName } from "../../common/enum/EchartConfig";
import { deviceName, ResourceNameArr, ResourcePageType, ALLChartName, IconClassName } from "../../../core/entity/Resource";
declare let enlargeHtml: any, angular: any, Object: any;

interface INoMessage {
    ResourceStatisticalTotal: boolean,
    AreaTotalCollection: boolean,
    AlarmStatistics: boolean,
    DataServiceStatistics: boolean,
    ResourcebRetrievalTrend: boolean,
}

const noMessage: INoMessage = {
    ResourceStatisticalTotal: false,
    AreaTotalCollection: false,
    AlarmStatistics: false,
    DataServiceStatistics: false,
    ResourcebRetrievalTrend: false
};

class ResourceChartController {
    static $inject = ['$scope', '$timeout', 'layer', 'i18nFactory', '$q', 'echartFactory'];
    ResourceStatisticalTotalConfig: ChartOptions.setEnlargeData;
    AreaTotalCollectionConfig: ChartOptions.setEnlargeData;
    AlarmStatisticsConfig: ChartOptions.setEnlargeData;
    DataServiceStatisticsConfig: ChartOptions.setEnlargeData;
    ResourcebRetrievalTrendConfig: ChartOptions.setEnlargeData;
    AllRankListConfig: ChartOptions.setEnlargeData;
    AllRankListForEnlarge: ChartOptions.setEnlargeData;
    rankClassName: Array<string> = IconClassName;
    leftChartHidden: boolean = false;
    rightChartHidden: boolean = false;
    noMessage: any = noMessage;
    currentLayerIndex: number;
    ResourceNameArr: any = angular.copy(ResourceNameArr);
    constructor(
        private $scope: any,
        private $timeout: Function,
        private layer: any,
        private i18nFactory: any,
        private $q: any,
        private echartFactory: IEchartFactory,
    ) {
        let that = this as ResourceChartController;

        $scope.$on(ResourcePageType.ALL.value, function (event: any, data: any) {
            that.init(data);
        });

        this.init();

        that.echartFactory.getInitRequire(ResourcePageType.ALL.value).then((res: any) => {
            that.init(res);
        })
    }

    private init(chartData?: any) {
        let that: ResourceChartController = this;
        let arr = Object.keys(ALLChartName) as Array<string>;

        for (let i = 0; i < arr.length; i++) {
            if (chartData) {
                let getConfigData: ChartOptions.setEnlargeData = that.setData(arr[i], chartData[arr[i]]);
                if (getConfigData) {
                    this.noMessage[arr[i]] = false;
                    that.echartFactory.initChart(getConfigData);
                } else {
                    this.noMessage[arr[i]] = true;
                }
            } else {
                this.noMessage[arr[i]] = true;
            }
        }

        if (chartData && chartData[ALLChartName.AllRankList]) {
            that.setData(ALLChartName.AllRankList, chartData[ALLChartName.AllRankList]);
        }
    }

    public enlarge(name: string) {
        console.log(this.AllRankListForEnlarge)
        let that: any = this;
        let data: any = that[name];
        if (name == ALLChartName.AllRankList) {
            data = angular.copy(that.AllRankListForEnlarge);
        }
        that.echartFactory.enlarge(that.$scope, name, data)
    }

    hiddenLeftRightChart(target: string) {
        if (target == "left") {
            this.leftChartHidden = !this.leftChartHidden
        } else {
            this.rightChartHidden = !this.rightChartHidden
        }
    }

    private ResourceStatisticalTotal(data?: any): ChartOptions.EChartOption {
        let seriesData = [] as Array<number>;
        if (data && !_.isEmpty(data.series)) {
            seriesData = [data.series.flow, data.series.alarm];
        } else {
            seriesData = [0, 0]
        }

        let option = new ChartOptions.EChartOption();
        let seriesD = new ChartOptions.series();
        seriesD.data = [] as Array<any>;
        seriesD.type = "pie";
        seriesD.radius = "65%";
        seriesD.center = ["50%", "55%"];
        seriesD.itemStyle = new ChartOptions.itemStyle();

        option.tooltip.trigger = "item";
        option.tooltip.formatter = "{b} : {c} ({d}%)";
        option.tooltip.position = function (pos: Array<number>, params: string, dom: any, rect: any, size: any) {
            let obj: { [key: string]: number } = { top: 60 };
            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
            return obj;
        };
        option.color = ["#396AB1", "#FF5D9E"];
        option.legend.data = [] as any;
        option.legend.top = 5;
        option.series = [] as Array<any>;

        let legendData = ["流量总量", "报警总量"];


        for (let i = 0; i < legendData.length; i++) {
            let legendArrayData = {} as ChartOptions.dataText;
            legendArrayData.name = legendData[i];
            legendArrayData.textStyle = new ChartOptions.dataStyleText();
            legendArrayData.icon = "stack";
            option.legend.data.push(legendArrayData);

            let seriesDataA = {} as ChartOptions.seriesDataA;
            seriesDataA.value = seriesData[i];
            seriesDataA.name = legendData[i];
            seriesDataA.label = new ChartOptions.label();
            seriesDataA.label.normal = new ChartOptions.normal();
            seriesDataA.label.normal.formatter = String(seriesData[i]);
            seriesD.data.push(seriesDataA)
        }
        option.series.push(seriesD);
        return option
    }

    private AreaTotalCollection(data?: any, flag?: boolean): ChartOptions.EChartOption {
        let seriesData = [] as any;
        let xData = [] as Array<string>;
        if (data && !_.isEmpty(data.series)) {
            if (flag) {
                seriesData = [
                    this.echartFactory.sliceArray(data.series.camera),
                    this.echartFactory.sliceArray(data.series.electronicfence),
                    this.echartFactory.sliceArray(data.series.rmpgate),
                    this.echartFactory.sliceArray(data.series.wifi)
                ];
                xData = angular.copy(data.legendData).slice(0, 5)
            } else {
                seriesData = [
                    data.series.camera || 0,
                    data.series.electronicfence || 0,
                    data.series.rmpgate || 0,
                    data.series.wifi || 0
                ];
                xData = data.legendData
            }
        } else {
            seriesData = [0, 0, 0, 0];
            xData = data.legendData
        }

        let option = new ChartOptions.EChartOption();
        //tooltip
        option.tooltip = new ChartOptions.tooltip();

        //color
        option.color = ["#B752F8", "#3D5DE3", "#00A3FB", "#03FBD9"];

        //legend
        option.legend = new ChartOptions.legend();
        option.legend.top = 5;
        option.legend.data = [] as any;

        let legendData = ["人像", "电围", "车辆", "WI-FI"] as Array<string>;

        //xAxis
        option.xAxis = new ChartOptions.xAxis();
        option.xAxis.type = "category";
        option.xAxis.data = xData;
        option.xAxis.axisLine = new ChartOptions.axisLine();
        option.xAxis.axisTick = new ChartOptions.axisTick();
        option.xAxis.axisLabel = new ChartOptions.axisLabel();
        option.xAxis.axisLabel.interval = 0;
        option.xAxis.axisLabel.rotate = 15;
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
        option.grid.top = 60;

        option.yAxis = new ChartOptions.yAxis();
        option.yAxis.type = "value";
        option.yAxis.splitLine.lineStyle.color = ["#F8F0E9"];
        option.yAxis.splitLine.show = true;
        option.yAxis.name = "单位：万";
        option.yAxis.nameTextStyle = new ChartOptions.nameTextStyle();
        seriesData = this.echartFactory.getUnitNum(seriesData);
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
            seriesD.barWidth = 20;

            seriesD.label = new ChartOptions.label;
            seriesD.label.normal = new ChartOptions.normal;
            seriesD.label.normal.position = "insideRight";
            seriesD.data = seriesData[i];

            option.series.push(seriesD)
        }

        return option
    }

    private AlarmStatistics(data?: any, flag?: boolean): ChartOptions.EChartOption {
        let seriesData = [] as any;
        let xData = [] as Array<string>;
        if (data) {
            let testData: Array<string> = data.xData ? data.xData : data.dateList;
            if (flag) {
                seriesData = [
                    angular.copy(data.series.camera).slice(-5),
                    angular.copy(data.series.electronicfence).slice(-5),
                    angular.copy(data.series.rmpgate).slice(-5),
                    angular.copy(data.series.wifi).slice(-5)
                ];

                xData = angular.copy(testData).slice(-5);
            } else {
                seriesData = [
                    data.series.camera,
                    data.series.electronicfence,
                    data.series.rmpgate,
                    data.series.wifi
                ];
                xData = angular.copy(data.dateList);
            }
        } else {
            seriesData = [0, 0, 0, 0];
            xData = data.xData
        }

        let option = new ChartOptions.EChartOption();

        option.tooltip = new ChartOptions.tooltip();

        option.color = ["#B752F8", "#3D5DE3", "#00A3FB", "#03FBD9"];
        option.legend.data = [] as any;
        option.series = [] as Array<any>;

        let legendData = [deviceName.person, deviceName.EFENCE, deviceName.Vehicle, deviceName.WiFi] as Array<string>;

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

        option.grid = new ChartOptions.grid();

        option.yAxis = new ChartOptions.yAxis();
        option.yAxis.type = "value";
        option.yAxis.splitLine.lineStyle.color = "#F8F0E9";
        option.yAxis.splitLine.show = true;
        option.yAxis.min = 0;

        for (let i = 0; i < legendData.length; i++) {
            // legend
            let legendArrayData = {} as ChartOptions.dataText;
            legendArrayData.name = legendData[i];
            legendArrayData.textStyle = new ChartOptions.dataStyleText();
            legendArrayData.icon = "stack";
            option.legend.data.push(legendArrayData);

            // series
            let seriesD = new ChartOptions.series();
            seriesD.type = "line";
            seriesD.data = seriesData[i];
            seriesD.name = legendData[i];
            option.series.push(seriesD)
        }

        return option
    }

    private DataServiceStatistics(data?: any): ChartOptions.EChartOption {
        let xData = [] as Array<string>;
        let seriesData = [] as any;

        if (data) {
            xData = data.LegendData;
            seriesData = data.series;
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
        option.xAxis.axisLabel.interval = 0;
        option.xAxis.axisLabel.rotate = 15;
        // option.xAxis.axisLabel.margin = 10;

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

    private ResourcebRetrievalTrend(data?: any, flag?: boolean): ChartOptions.EChartOption {
        let option = new ChartOptions.EChartOption();
        option.tooltip = new ChartOptions.tooltip();
        option.color = ["#B752F8", "#3D5DE3", "#00A3FB", "#03FBD9"];
        option.legend.data = [] as any;
        option.legend.top = 5;
        option.series = [] as Array<any>;

        let legendData = [deviceName.Vehicle, deviceName.person, deviceName.WiFi, deviceName.EFENCE] as Array<string>;

        let timeData = [] as Array<string>;
        let seriesData = [] as any;
        if (data.series && data.series.rmpgate && data.series.camera && data.series.wifi && data.series.electronicfence) {
            let dataListData: Array<string> = data.xData ? data.xData : data.dateList;
            if (flag) {
                timeData = dataListData.slice(-5);
                seriesData = [data.series.rmpgate.slice(-5), data.series.camera.slice(-5), data.series.wifi.slice(-5), data.series.electronicfence.slice(-5)];
            } else {
                timeData = data.dateList;
                seriesData = [data.series.rmpgate, data.series.camera, data.series.wifi, data.series.electronicfence];
            }
        } else {
            seriesData = []
        }


        //xAxis
        option.xAxis = new ChartOptions.xAxis();
        option.xAxis.type = "category";
        option.xAxis.boundaryGap = false;
        option.xAxis.axisLine = new ChartOptions.axisLine();
        option.xAxis.axisLabel = new ChartOptions.axisLabel();
        option.xAxis.splitLine = new ChartOptions.splitLine();
        option.xAxis.splitLine.lineStyle.color = "#F8F0E9";
        option.xAxis.splitLine.show = true;

        option.xAxis.data = timeData;

        option.grid = new ChartOptions.grid();

        option.yAxis = new ChartOptions.yAxis();
        option.yAxis.type = "value";
        option.yAxis.splitLine.lineStyle.color = "#F8F0E9";
        option.yAxis.splitLine.show = true;
        // option.yAxis.max = 40000
        // option.yAxis.min = 0

        for (let i = 0; i < legendData.length; i++) {
            // legend
            let legendArrayData = {} as ChartOptions.dataText;
            legendArrayData.name = legendData[i];
            legendArrayData.textStyle = new ChartOptions.dataStyleText();
            legendArrayData.icon = "stack";
            option.legend.data.push(legendArrayData);

            // series
            let seriesD = new ChartOptions.series();
            seriesD.type = "line";
            seriesD.data = seriesData[i];
            seriesD.name = legendData[i];
            option.series.push(seriesD)
        }
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
            case ALLChartName.ResourceStatisticalTotal: {
                option.config = this.ResourceStatisticalTotal(data)
                this.ResourceStatisticalTotalConfig = option;
                return option
            }
            case ALLChartName.AreaTotalCollection: {
                option.config = this.AreaTotalCollection(data, true);
                let option2 = angular.copy(option);
                option2.config = this.AreaTotalCollection(data, false);
                this.AreaTotalCollectionConfig = angular.copy(option2);
                return option
            }
            case ALLChartName.AlarmStatistics: {
                option.config = this.AlarmStatistics(data, true);
                let option2 = angular.copy(option);
                option2.config = this.AlarmStatistics(data, false);
                this.AlarmStatisticsConfig = angular.copy(option2);
                return option
            }
            case ALLChartName.DataServiceStatistics: {
                option.config = this.DataServiceStatistics(data);
                this.DataServiceStatisticsConfig = option;
                return option
            }
            case ALLChartName.ResourcebRetrievalTrend: {
                option.config = this.ResourcebRetrievalTrend(data, true);
                let option2 = angular.copy(option);
                option2.config = this.ResourcebRetrievalTrend(data, false);
                this.ResourcebRetrievalTrendConfig = angular.copy(option2);
                return option
            }
            case ALLChartName.AllRankList: {
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

app.controller('ResourceChartController', ResourceChartController);