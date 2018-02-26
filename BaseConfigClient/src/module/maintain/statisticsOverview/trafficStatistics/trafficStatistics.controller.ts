import { app } from "../../../common/app/main.app";
import "css!module/maintain/css/trafficStatistics.css";
import "../../main/maintainFactory";
import * as ChartOptions from "../../../common/enum/EchartConfig";
// IEchartFactory
import {
    dropEnum,
    alarmTrafficReqEnum,
    selectDataEnum,
    SelectData,
    intelligentAnalysisDataEnum,
    intelligentAnalysisData,
    FlowSuperData,
    TrafficStatisticsModuleName,
    AlarmObjectType,
    echartNameArr
} from "../../../../core/entity/maintainEnum";
import { dataSelectServer, dataSelectResult, moduleString } from "../../../common/factory/dataSelect.factory";
import "moment"
import { IMaintainService } from "../../../common/services/maintain.service";
import { ChartOptionObject, IEchartFactory } from "../../main/maintainFactory";
import { ILayerDec } from "../../../common/factory/layerMsg.factory";

declare let angular: any, moment: any;

export class allParams extends dataSelectResult {
    AreaName: string = "ALL"; // 地区名称
    DeviceName: string = "ALL";// 设备名称
    module: string;// 图表名称
    constructor(moduleName: string) {
        super();
        this.module = moduleName
    }
}
const deviceTrafficRank: any = {
    seriesData: [],
    yData: []
}

class trafficStatisticsController {

    static $inject = ["$scope", "maintainFactory", "dataSelectServer", "maintainService", "layerDec"];
    // 切换按钮
    areaTrafficStatisticsList: boolean = true;
    areaTrafficTrendList: boolean = true;
    deviceTrafficStatisticsList: boolean = true;
    // 获取后端信息
    superData: any = new FlowSuperData();
    pageType: string = "flow";

    // 下拉菜单
    TrendDeviceDropList: Array<dropEnum> = [];
    TrendAreaDropList: Array<dropEnum> = [];
    defaultDropListType: string = AlarmObjectType.ALL.text;
    defaultAreaDropMenu: Array<{ [key: string]: string }> = [{ text: '全部', value: "ALL" }]

    // 请求参数
    dataFilterParam: alarmTrafficReqEnum = new alarmTrafficReqEnum();

    // 时间控件
    timeItem: Array<selectDataEnum> = angular.copy(SelectData);
    ModuleNameArr: intelligentAnalysisDataEnum = angular.copy(intelligentAnalysisData);
    Area_Traffic_Model: allParams = new allParams(this.ModuleNameArr.areaTrafficStatistics);
    Area_Traffic_Trend_Model: allParams = new allParams(this.ModuleNameArr.areaTrafficTrend);
    Device_Traffic_Model: allParams = new allParams(this.ModuleNameArr.deviceTrafficStatistics);

    // 设备相关
    deviceTrafficData: any = []; //设备切换数据
    areaTrafficData: any = []; //地区切换数据
    TrafficDeviceDropDefault: string = AlarmObjectType.ALL.text;
    TrafficAreaDropDefault: string = AlarmObjectType.ALL.text;

    echartNameArr: any = angular.copy(echartNameArr);

    DropListMore: Array<string> = [];

    //视图列表
    areaTrafficStatisticsTableList: any;
    areaTrafficTrendTableList: any;
    deviceTrafficStatisticsTableList: any;

    areaDefaultSelected: Array<dropEnum>;
    areaTrafficTrendData: any;

    constructor(
        private $scope: any,
        private maintainFactory: IEchartFactory,
        private dataSelectServer: dataSelectServer,
        private maintainService: IMaintainService,
        private layerDec: ILayerDec
    ) {

        this.init();
        $scope.$on('initChart', (evt: any, opt: any) => {
            this.init()
        });
        $scope.$on('$destroy', () => {
            this.maintainFactory.destroyChart();
        });

        this.deviceTrafficData = this.maintainFactory.DeviceDropMenu();
    }

    // 初始化流量统计图表
    private init(dataFilterParam?: alarmTrafficReqEnum) {
        let that: trafficStatisticsController = this;
        let arr = ["areaTrafficStatistics", "areaTrafficTrend", "deviceTrafficStatistics"] as Array<string>;
        // 数据整合
        that.superData = new FlowSuperData();

        if (!dataFilterParam) {
            dataFilterParam = {
                beginDate: "",
                endDate: moment().format("YYYY-MM-DD hh:mm:ss"),
                resourceType: AlarmObjectType.ALL.value,
                timeType: moduleString.Year,
            } as alarmTrafficReqEnum;
        }

        this.initAreaTrafficStatictis(dataFilterParam);

        this.initAreaTrafficTrend(dataFilterParam);

        this.initDeviceTrafficTop(dataFilterParam);

    }

    // 初始化单个图表
    public initChart(dataFilterParam: alarmTrafficReqEnum, module: string) {
        this.maintainFactory.AlarmTrafficStatistics(dataFilterParam).then((res: any) => {
            this.getDataAndInitChart(module, this.superData[module])
        })
    }

    // 设备切换类型
    public deviceStatusType(selected: any) {
        let superData: any = angular.copy(this.superData);
        superData.deviceTrafficStatistics = this.singleDeviceTop10(this.deviceTrafficData, selected.value);
        this.maintainFactory.initChart(this.setData('deviceTrafficStatistics', superData['deviceTrafficStatistics']))
    }

    // 切换设备图表类型
    private allDataMap(data: any, module: string = "ALL") {
        let superData: any = angular.copy(this.superData);
        // 所有设备前10
        if (data) {
            this.deviceTrafficData = angular.copy(data.deviceTrafficStatistics);
            superData.deviceTrafficStatistics = this.singleDeviceTop10(data.deviceTrafficStatistics, module);
            Object.keys(data).forEach((key) => {
                if (data[key] && data[key].seriesData && key != "dropListArea" && key != "dropListType") {
                    superData[key] = data[key]
                }
            });
            return superData
        }
    }

    // 返回单个设备排名前十的数据
    private singleDeviceTop10(obj: any, type: string) {
        let result: any = {};
        Object.keys(obj).forEach((key: string) => {
            if (key == type) {
                result = obj[key];
            }
        });

        return result
    }

    // 区域流量统计
    private static areaTrafficStatistics(data?: any) {
        let seriesData = data.seriesData as any;
        let xData = data.xData as Array<string>;
        let legendData = data.legendData as Array<string>;

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

    // 区域流量趋势
    private static areaTrafficTrend(data?: any) {
        let seriesData = data.seriesData as any;
        let xData = data.xData as Array<string>;
        let legendData = [] as Array<string>;
        let colors = [] as Array<string>;
        data.areaDropMenu.forEach((area) => {
            legendData.push(area.text)
            colors.push(area.color)
        });

        let option = new ChartOptions.EChartOption();

        //tooltop
        option.tooltip = new ChartOptions.tooltip();
        option.tooltip.trigger = "axis";

        // color
        option.color = colors;

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
        option.yAxis.min = 0
        // option.yAxis.max = 40000

        option.series = [] as Array<any>;
        for (let i = 0; i < legendData.length; i++) {
            // series
            let seriesD = new ChartOptions.series();
            let areaColor: any = "124,204,242";
            seriesD.type = "line";

            //color
            let areaStyleColor: any = new ChartOptions.areaStyleColor(areaColor);
            seriesD.areaStyle = new ChartOptions.areaStyle();
            seriesD.areaStyle.normal = new ChartOptions.ObjectNormal();
            seriesD.areaStyle.normal = areaStyleColor.getColor();

            seriesD.data = seriesData[i];
            seriesD.name = legendData[i];
            option.series.push(seriesD);
        };
        // // series
        // let seriesD = new ChartOptions.series();

        // //color
        // let areaColor: any = "124,204,242";
        // let areaStyleColor: any = new ChartOptions.areaStyleColor(areaColor);
        // seriesD.areaStyle = new ChartOptions.areaStyle();
        // seriesD.areaStyle.normal = new ChartOptions.ObjectNormal();
        // seriesD.areaStyle.normal = areaStyleColor.getColor();

        // seriesD.type = "line";
        // seriesD.stack = "总量";
        // seriesD.data = seriesData[0];
        // // seriesD.name = legendData;
        // option.series.push(seriesD);
        return option
    }

    // 设备流量统计
    private static deviceTrafficStatistics(data?: any) {
        if (!data) { return false }
        let option = new ChartOptions.EChartOption();
        let seriesData = data.seriesData;
        let yData = data.yData;

        //tooltip
        option.tooltip = new ChartOptions.tooltip();
        option.tooltip.trigger = "axis";
        option.tooltip.axisPointer = new ChartOptions.axisPointer();
        option.tooltip.axisPointer.type = "line";
        // option.tooltip.axisPointer.type = "cross";

        //color
        option.color = ["#53c68c"];

        //grid
        option.grid = new ChartOptions.grid();
        option.grid.top = 50;

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
        // seriesD.name = yData[i];
        seriesD.type = 'bar';
        seriesD.stack = '总量';
        seriesD.data = seriesData;
        seriesD.barWidth = 15;
        seriesD.itemStyle = new ChartOptions.itemStyle();
        seriesD.itemStyle.normal = new ChartOptions.normal();
        seriesD.itemStyle.normal.barBorderRadius = [0, 20, 20, 0];
        option.series.push(seriesD);

        delete option.legend;
        return option
    }

    private setData(name: string, data?: any) {
        let option: any = ChartOptionObject(name);
        switch (name) {
            case 'areaTrafficStatistics': {
                option.config = trafficStatisticsController.areaTrafficStatistics(data)
                return option
            }
            case 'areaTrafficTrend': {
                option.config = trafficStatisticsController.areaTrafficTrend(data)
                return option
            }
            case 'deviceTrafficStatistics': {
                option.config = trafficStatisticsController.deviceTrafficStatistics(data)
                return option
            }
        }
    }

    public trafficSwitch(switchString: string) {
        let that: trafficStatisticsController = this;
        switch (switchString) {
            case 'areaTrafficHistogram': {
                that.areaTrafficStatisticsList = true;
                break;
            }
            case 'areaTrafficList': {
                that.areaTrafficStatisticsList = false;
                break;
            }
            case 'areaTrafficTrendHistogram': {
                that.areaTrafficTrendList = true;
                break;
            }
            case 'areaTrendList': {
                that.areaTrafficTrendList = false;
                break;
            }
            case 'trafficStatisticsHistogram': {
                that.deviceTrafficStatisticsList = true;
                break;
            }
            case 'trafficStatisticsList': {
                that.deviceTrafficStatisticsList = false;
                break;
            }
        }
    }

    // 区域流量统计 ========================>
    private initAreaTrafficStatictis(dataFilterParam: any) {
        let that: trafficStatisticsController = this;
        that.maintainService.areaTrafficStatistics(dataFilterParam).then((res: any) => {
            that.areaTrafficStatisticsTableList = angular.copy(res.data);
            that.areaTrafficStatisticsTableList.legendData.unshift('行政区域');
            that.getDataAndInitChart(TrafficStatisticsModuleName.areaTrafficStatistics, res.data);
        });
    }

    // 时间控件
    public TrafficTimeButtonClick(value?: string) {
        let param: alarmTrafficReqEnum = this.maintainFactory.getTimeParams(this.Area_Traffic_Model, value);
        if (param) {
            this.initAreaTrafficStatictis(param);
        }
    }

    // 区域流量趋势 =========================>>>>>>>>>>>>>>>>>>>>>
    private initAreaTrafficTrend(dataFilterParam?: alarmTrafficReqEnum) {
        let that: trafficStatisticsController = this;
        let param: alarmTrafficReqEnum;
        if (dataFilterParam) {
            param = angular.copy(dataFilterParam);
            param.timeType = moduleString.Month;
        }
        that.maintainService.trafficStatisticsModule(param).then((res: any) => {
            that.TrendDeviceDropList = angular.copy(res.data.deviceDropMenu);
            that.TrendAreaDropList = angular.copy(res.data.areaDropMenu);
            that.areaDefaultSelected = [that.TrendAreaDropList[0]]
            that.areaTrafficTrendData = angular.copy(res.data);

            let result: any = {};
            result.xData = that.areaTrafficTrendData.xData;
            result.seriesData = [that.areaTrafficTrendData.seriesData[0]];
            result.areaDropMenu = [that.areaTrafficTrendData.areaDropMenu[0]]
            that.getDataAndInitChart(TrafficStatisticsModuleName.areaTrafficTrend, result);
        })
    }

    // 切换设备类型
    public TrendStatusType(selected: dropEnum) {
        let param: alarmTrafficReqEnum = this.maintainFactory.getTimeParams(this.Area_Traffic_Trend_Model);
        param.resourceType = selected.value
        if (param) {
            this.initAreaTrafficTrend(param);
        }
    }

    public TrendStatusArea(selected: Array<dropEnum>) {
        let indexArr = [] as Array<number>
        selected.forEach((sel: dropEnum) => {
            this.areaTrafficTrendData.areaDropMenu.forEach((item: dropEnum, index: number) => {
                if (sel.text === item.text) {
                    indexArr.push(index)
                }
            });
        })
        let result = {} as any;
        result.areaDropMenu = selected;
        result.seriesData = [];
        this.areaTrafficTrendData.seriesData.forEach((item, index) => {
            if (indexArr.indexOf(index) !== -1) {
                result.seriesData.push(item)
            }
        })
        result.xData = this.areaTrafficTrendData.xData;
        this.getDataAndInitChart(TrafficStatisticsModuleName.areaTrafficTrend, result);
    }


    // 时间控件
    public AreaTrafficTrendTimeButtonClick(value?: string) {
        let param: alarmTrafficReqEnum = this.maintainFactory.getTimeParams(this.Area_Traffic_Trend_Model, value);
        if (param) {
            this.initAreaTrafficTrend(param);
        }
    }

    // 设备流量TOP10  ========================>
    private initDeviceTrafficTop(dataFilterParam?: alarmTrafficReqEnum) {
        let that: trafficStatisticsController = this;

        that.maintainService.deveceTrafficStatisticsTop(dataFilterParam).then((res: any) => {
            that.deviceTrafficData = angular.copy(res.data.deviceObj);
            that.areaTrafficData = angular.copy(res.data.areaObj);
            that.areaTrafficData[AlarmObjectType.ALL.text] = angular.copy(res.data.deviceObj.ALL);
            that.deviceTrafficStatisticsTableList = that.deviceTrafficData[AlarmObjectType.ALL.value];
            that.deviceTrafficStatisticsTableList.legendData = ['报警设备', '流量数'];
            that.defaultAreaDropMenu = [].concat([{ text: '全部', value: "ALL" }], that.areaTrafficData.dropListMenu);

            // that.getDataAndInitChart(TrafficStatisticsModuleName.deviceTrafficStatistics, that.deviceTrafficData[AlarmObjectType.ALL.value]);

            let result: any = res.data.deviceObj[AlarmObjectType.ALL.value];
            if (result && result.yData.length && result.seriesData.length) {
                that.deviceTrafficData = result;
                that.getDataAndInitChart(TrafficStatisticsModuleName.deviceTrafficStatistics, result);
            } else {
                that.layerDec.warnInfo("暂无数据");
                that.getDataAndInitChart(TrafficStatisticsModuleName.deviceTrafficStatistics, angular.copy(deviceTrafficRank));
            }
        })
    }

    // 报警设备类型切换
    public TrafficDeviceDrop(selected: dropEnum) {
        let param: alarmTrafficReqEnum = this.maintainFactory.getTimeParams(this.Device_Traffic_Model);
        param.resourceType = selected.value;
        if (param) {
            this.initDeviceTrafficTop(param);
        }
    }

    // 报警区域切换
    public TrafficAreaDrop(selected: dropEnum) {
        let data: any = this.areaTrafficData[selected.text];
        this.getDataAndInitChart(TrafficStatisticsModuleName.deviceTrafficStatistics, data);
    }

    private getDataAndInitChart(chartName: string, data: any) {
        let chartConfig: any = this.setData(chartName, data);
        if (chartConfig) {
            this.maintainFactory.initChart(chartConfig);
        }
    }

    // 时间控件
    public DeviceTrafficTimeButtonClick(value?: string) {
        let param: alarmTrafficReqEnum = this.maintainFactory.getTimeParams(this.Device_Traffic_Model, value);
        if (param) {
            this.initDeviceTrafficTop(param);
        }
    }

    public exportImage(id: string) {
        this.maintainFactory.exportImage(id)
    }

    public exportExcel(module: string, data: any) {
        this.maintainFactory.exportExcel(module, data);
    }
}

app.controller("trafficStatisticsController", trafficStatisticsController);