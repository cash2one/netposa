import * as echarts from 'echarts';

declare let angular: any;

let graphic: any = echarts.graphic;
let linearGradient: any = graphic.LinearGradient;

export class axisPointerlineStyle {
    type: string = "dashed"
}

export class axisPointer {
    type: string = "line";
    lineStyle: axisPointerlineStyle = new axisPointerlineStyle();
}

export class tipStyle {
    fontSize: number = 12;
}

export class tooltip {
    trigger: string = "axis";
    formatter: string;
    axisPointer: axisPointer = new axisPointer();
    textStyle: tipStyle = new tipStyle();
    confine: boolean = true;
    position?: Array<string> | Function;
}

export class legend {
    itemGap?: number;
    align?: string;
    top: string | number = 0;
    left: string | number = 5;
    right: string;
    bottom: string;
    itemHeight: number = 10;
    itemWidth: number = 15;
    data: Array<any>;
    orient: string;
    x: string;
    y: string;
    icon: string = "stack";
    width: string;
    height: string;
}

export class grid {
    left: number = 10;
    right: number = 15;
    top: number = 40;
    bottom: number = 10;
    containLabel: boolean = true;
}

export class lineStyle {
    type: string;
    color: any = "#C9C9C9";
    interval: boolean = false;
}

export class axisLine {
    show: boolean = true;
    lineStyle: lineStyle = new lineStyle();
}

export class textStyle {
    color: string = "#6F6E6E";
    fontSize: number = 12;
}

export class axisLabel {
    textStyle: textStyle = new textStyle();
    color: string = "#333333";
    interval?: number;
    rotate?: number;
    margin?: number;
    fontFamily: string = 'Arial' || 'Microsoft Yahei';
}

export class splitLine {
    show: boolean;
    lineStyle: lineStyle = new lineStyle();
}

export class axisTick {
    alignWithLabel: boolean = true;
}

export class dataStyleText {
    fontSize: number = 12;
}

export class dataText {
    name: string;
    textStyle: dataStyleText = new dataStyleText();
    icon: string;
}

export class xAxis {
    scale?: boolean;
    show?: boolean;
    type: string;
    axisTick?: axisTick;
    axisLine?: axisLine;
    axisLabel?: axisLabel;
    boundaryGap?: boolean | Array<number>;
    data: Array<any>;
    splitLine?: splitLine;
    label?: label;
    min?: number
}

export class nameTextStyle {
    color: string = '#444444';
    fontSize: number = 12;
    padding: Array<number> = [0, 40, 0, 0];
}

export class yAxis {
    type: string;
    max?: number;
    min?: number;
    boundaryGap?: boolean | Array<number>;
    axisLine: axisLine = new axisLine();
    axisLabel: axisLabel = new axisLabel();
    splitLine: splitLine = new splitLine();
    splitNumber: number = 5;
    data: Array<any>;
    name?: string;
    nameLocation?: string;
    nameTextStyle: nameTextStyle
}

export class emphasis {
    shadowBlur: number = 10;
    shadowOffsetX: number = 0;
    shadowColor: string = "rgba(0, 0, 0, 0.5)"
}

export class seriesDataA {
    value?: number;
    name?: string;
    label?: label;
    barWidth?: number;
    type?: string;
}

export class normal {
    position?: string;
    show?: boolean;
    formatter?: string | number;
    barBorderRadius?: Array<number>;
    shadowColor?: string;
    shadowOffsetY?: number;
    shadowBlur?: number;
    color?: any;
    length?: number;
    length2?: number;
}

export class itemStyle {
    emphasis?: emphasis;
    normal?: normal;
}

export class label {
    normal: normal;
}

export class labelLine {
    normal?: normal;
    length: number;
    length2: number;
}

export class series {
    name: string;
    type: string;
    center?: Array<string>;
    data: Array<any>;
    itemStyle?: itemStyle;
    stack?: string;
    label?: label;
    barWidth?: number | string;
    xAxisIndex: number;
    yAxisIndex: number;
    selectedMode?: string;
    labelLine?: labelLine;
    radius?: string | Array<string | number>;
    areaStyle?: areaStyle;
}

export class ObjectNormal {
    opacity: number = 0.3;
    color: any;
}

export class areaStyle {
    normal?: ObjectNormal;
}

export class areaStyleColor {
    color: string | Array<string>;

    constructor(color: string | Array<string>) {
        this.color = color;
    }

    //渐变
    public getColor() {
        let that: any = this;
        let gradientColor: any = {
            color: new linearGradient(0, 0, 0, 1,
                [
                    { offset: 0, color: `rgba(${that.color},0.25)` },
                    { offset: 0.5, color: `rgba(${that.color},0.13)` },
                    { offset: 1, color: `rgba(${that.color},0.00)` }
                ]
            )
        };
        return gradientColor
    }

    public colorDiff() {
        let that: any = this;
        let result: any = {
            //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
            color: function (params: any) {
                let colorList = that.color;
                return colorList[params.dataIndex];
            }
        };
        return result
    }

}

export class dataZoom {
    show: boolean = false;
    start: number = 0;
    end: number = 100;
}

export class EChartOption {
    title?: title;
    legend: legend = new legend();
    grid?: grid;
    xAxis?: xAxis | Array<xAxis>;
    yAxis?: yAxis | Array<yAxis>;
    polar?: Object;
    radiusAxis?: Object;
    angleAxis?: Object;
    radar?: Object;
    dataZoom?: Array<Object>;
    visualMap?: Array<Object>;
    tooltip?: tooltip = new tooltip();
    toolbox?: Object;
    geo?: Object;
    parallel?: Object;
    parallelAxis?: Object;
    timeline?: Object;
    series?: Array<Object>;
    color?: Array<Object> | Array<string>;
    backgroundColor?: string;
    textStyle?: Object;
    animation?: boolean;
    animationDuration?: number;
    animationEasing?: string;
    animationDurationUpdate?: number;
    animationEasingUpdate?: string;
}

export class setEnlargeData {
    title?: string;
    name?: string;
    path?: string;
    config: EChartOption;
}

export class title {
    text?: string | number;
    subtext?: string;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
}

export class ResourceStatisticalName {
    static ResourceStatisticalTotal = "ResourceStatisticalTotal";
    static AreaTotalCollection = "AreaTotalCollection";
    static AlarmStatistics = "AlarmStatistics";
    static DataServiceStatistics = "DataServiceStatistics";
    static ResourcebRetrievalTrend = "ResourcebRetrievalTrend";
}

export class carStatisticsName {
    static carStatistics = "carStatistics";
    static areaCarStatistics = "areaCarStatistics";
    static areaCarAlarmStatistics = "areaCarAlarmStatistics";
    static carTypeStatistics = "carTypeStatistics";
    static carColorStatistics = "carColorStatistics";
}

export class personStatisticsName {
    static PersonStatistics = "PersonStatistics";
    static AreaPersonStatistics = "AreaPersonStatistics";
    static AreaPersonAlarmStatistics = "AreaPersonAlarmStatistics";
    static PersonTypeStatistics = "PersonTypeStatistics";
    static PersonColorStatistics = "PersonColorStatistics";
}

export class WiFiStatisticsName {
    static WifiStatistics = "WifiStatistics";
    static AreaWifiStatistics = "AreaWifiStatistics";
    static AreaWifiAlarmStatistics = "AreaWifiAlarmStatistics";
    static WifiTypeStatistics = "WifiTypeStatistics";
    static WifiColorStatistics = "WifiColorStatistics";
}

export class EFENCEStatisticsName {
    static EFStatistics = "EFStatistics";
    static AreaEFStatistics = "AreaEFStatistics";
    static AreaEFAlarmStatistics = "AreaEFAlarmStatistics";
    static EFTypeStatistics = "EFTypeStatistics";
    static EFColorStatistics = "EFColorStatistics";
}

export class otherStatisticsName {
    static WifiAllRankList = "WifiAllRankList";
    static EFColorStatistics = "EFColorStatistics";
}
export const colorEnumArr: Array<any> = [
    { name: "黑色", value: "#333333" },
    { name: "白色", value: "#F0F0F0" },
    { name: "蓝色", value: "#5A9EFF" },
    { name: "黄色", value: "#FFB401" },
    { name: "绿色", value: "#2FCB76" }
]

