import { app } from "../../../common/app/main.app";
import "css!module/maintain/css/alarmStatistics.css";
import "../../main/maintainFactory";
import { IEchartFactory, ChartOptionObject, allParams } from "../../main/maintainFactory";
import * as ChartOptions from "../../../common/enum/EchartConfig";
import { dataSelectServer, moduleString } from "../../../common/factory/dataSelect.factory";
import {
    dropEnum,
    alarmTrafficReqEnum,
    selectDataEnum,
    SelectData,
    intelligentAnalysisDataEnum,
    intelligentAnalysisData,
    echartNameArr,
    AlarmSuperData,
    AlarmStatisticsModuleName,
    AlarmObjectType
} from "../../../../core/entity/maintainEnum";
import { IMaintainService } from "../../../common/services/maintain.service";
import "moment"
import { ILayerDec } from "../../../common/factory/layerMsg.factory";
declare let angular: any, moment: any;

const deviceAlarmRank: any = {
    seriesData: [],
    yData: []
}

class alarmStatisticsController {
    static $inject = ["$scope", "maintainFactory", "dataSelectServer", "maintainService", "layerDec"];
    // 切换按钮
    areaAlarmList: boolean = true;
    areaAlarmTrendList: boolean = true;
    deviceAlarmStatisticsList: boolean = true;
    dispatchedAboutAlarmList: boolean = true;

    // 获取信息
    superData: any = new AlarmSuperData();
    dataFilterParam: alarmTrafficReqEnum = new alarmTrafficReqEnum();

    // 时间控件
    timeItem: Array<selectDataEnum> = angular.copy(SelectData);
    ModuleNameArr: intelligentAnalysisDataEnum = angular.copy(intelligentAnalysisData);
    Area_Alarm_Model: allParams = new allParams(this.ModuleNameArr.areaAlarm);
    Area_Alarm_Trend_Model: allParams = new allParams(this.ModuleNameArr.areaAlarmTrend);
    Device_Alarm_Statistics_Model: allParams = new allParams(this.ModuleNameArr.deviceAlarmStatistics);
    Dispatched_About_Alarm_Model: allParams = new allParams(this.ModuleNameArr.dispatchedAboutAlarm);

    // 下拉菜单
    TrendDeviceDropList: Array<dropEnum> = [];
    TrendAreaDropList: Array<dropEnum> = [];
    dropListArea: Array<dropEnum> = [];
    dropListType: Array<dropEnum> = [];
    defaultAreaDropMenu: Array<{ [key: string]: string }> = [{ text: '全部', value: "ALL" }]

    // 报警设备相关下拉菜单
    deviceAlarmData: any = []; //设备切换数据
    areaAlarmData: any = []; //地区切换数据
    areaDefaultSelected: Array<dropEnum>;

    // 列表视图
    areaAlarmTableData: any;
    areaAlarmTrendTableData: any;
    deviceAlarmStatisticsTableData: any;
    dispatchedAboutAlarmTableData: any;

    echartNameArr: any = angular.copy(echartNameArr);
    areaAlarmTrendData: any;

    constructor(private $scope: any,
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

        // 拿到所有设备类型下拉菜单
        this.deviceAlarmData = this.maintainFactory.DeviceDropMenu();
    }

    private init(dataFilterParam?: alarmTrafficReqEnum) {
        if (!dataFilterParam) {
            dataFilterParam = {
                beginDate: moment().subtract(30, 'days').format("YYYY-MM-DD hh:mm:ss"),
                endDate: moment().format("YYYY-MM-DD hh:mm:ss"),
                resourceType: AlarmObjectType.ALL.value,
                timeType: moduleString.Year,
            } as alarmTrafficReqEnum;
        }

        // 区域报警数
        this.initAreaAlarmNum(angular.copy(dataFilterParam));

        // 区域报警趋势
        this.initAreaAlarmTrend(angular.copy(dataFilterParam));

        //设备报警统计TOP10
        this.initDeviceAlarmTop(angular.copy(dataFilterParam));

        //布控库关联报警统计
        this.initDispatchedAboutAlarm(angular.copy(dataFilterParam))

    }


    // 区域报警数
    private static areaAlarm(data?: any) {
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

    // 区域报警趋势
    private static areaAlarmTrend(data?: any) {
        let seriesData = angular.copy(data.seriesData) as any;
        let xData = angular.copy(data.xData) as Array<string>;
        let legendData = [] as Array<string>;
        let colors = [] as Array<string>;
        data.areaDropMenu.forEach((area: dropEnum) => {
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

        return option
    }

    // 设备报警统计
    private static deviceAlarmStatistics(data?: any) {
        let seriesData = angular.copy(data.seriesData);
        let yData = angular.copy(data.yData);

        let option = new ChartOptions.EChartOption();
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

    // 布控库关联报警统计
    private static dispatchedAboutAlarm(data?: any) {
        let seriesData = data.seriesData;
        let yData = data.yData;
        let legendData = data.legendData as Array<string>;

        let option = new ChartOptions.EChartOption();
        //tooltip
        option.tooltip = new ChartOptions.tooltip();
        option.tooltip.trigger = "axis";
        option.tooltip.axisPointer = new ChartOptions.axisPointer();
        option.tooltip.axisPointer.type = "line";
        // option.tooltip.axisPointer.type = "cross";

        //color
        option.color = ["#9ad941", "#fbd15a", "#9cdcee", "#e98371"];

        //legend
        option.legend = new ChartOptions.legend();
        delete option.legend.left;
        option.legend.right = "20px";
        option.legend.top = "10px";
        option.legend.data = [] as Array<string>;
        option.legend.itemWidth = 15;
        option.legend.itemHeight = 10;

        option.legend.itemGap = 60;

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

        for (let i: number = 0; i < legendData.length; i++) {
            // legend
            let legendArrayData = {} as ChartOptions.dataText;
            legendArrayData.name = legendData[i];
            legendArrayData.textStyle = new ChartOptions.dataStyleText();
            legendArrayData.icon = "stack";
            option.legend.data.push(legendArrayData);

            //series
            let seriesD = new ChartOptions.series();
            seriesD.name = legendData[i];
            seriesD.type = 'bar';
            seriesD.stack = '总量';
            seriesD.data = seriesData[i];
            seriesD.barWidth = 15;
            if (i == legendData.length - 1) {
                seriesD.itemStyle = new ChartOptions.itemStyle();
                seriesD.itemStyle.normal = new ChartOptions.normal();
                seriesD.itemStyle.normal.barBorderRadius = [0, 20, 20, 0];
            }
            option.series.push(seriesD);
        }

        return option
    }

    // 绘制图表
    private setData(name: string, data?: any) {
        let option: any = ChartOptionObject(name);
        switch (name) {
            case 'areaAlarm': {
                option.config = alarmStatisticsController.areaAlarm(data)
                return option
            }
            case 'areaAlarmTrend': {
                option.config = alarmStatisticsController.areaAlarmTrend(data)
                return option
            }
            case 'deviceAlarmStatistics': {
                option.config = alarmStatisticsController.deviceAlarmStatistics(data)
                return option
            }
            case 'dispatchedAboutAlarm': {
                option.config = alarmStatisticsController.dispatchedAboutAlarm(data)
                return option
            }
        }
    }

    // 图形与列表视图切换
    public AlarmSwitch(switchString: string) {
        let that: any = this;
        switch (switchString) {
            case 'alarmStatisticsHistogram': {
                that.areaAlarmList = true;
                break;
            }
            case 'alarmStatisticsList': {
                that.areaAlarmList = false;
                break;
            }
            case 'areaAlarmTrendHistogram': {
                that.areaAlarmTrendList = true;
                break;
            }
            case 'areaAlarmTrendList': {
                that.areaAlarmTrendList = false;
                break;
            }
            case 'deviceAlarmHistogram': {
                that.deviceAlarmStatisticsList = true;
                break;
            }
            case 'deviceAlarmList': {
                that.deviceAlarmStatisticsList = false;
                break;
            }
            case 'dispatchedAboutAlarmHistogram': {
                that.dispatchedAboutAlarmList = true;
                break;
            }
            case 'dispatchedAboutList': {
                that.dispatchedAboutAlarmList = false;
                break;
            }
        }
    }

    // 区域报警数(TOP10) ===============================>
    public initAreaAlarmNum(dataFilterParam: alarmTrafficReqEnum) {
        let that: any = this;
        that.maintainService.alarmStatistics(dataFilterParam).then((res: any) => {
            that.areaAlarmTableData = res.data
            that.getDataAndInitChart(AlarmStatisticsModuleName.areaAlarm, res.data);
        });
    }

    // 时间控件
    public AreaAlarmNumTimeButtonClick(value?: string) {
        let param: alarmTrafficReqEnum = this.maintainFactory.getTimeParams(this.Area_Alarm_Model, value);
        if (param) {
            this.initAreaAlarmNum(param);
        }
    }

    // 区域报警趋势 ==========================================>
    public initAreaAlarmTrend(dataFilterParam: alarmTrafficReqEnum) {
        let that: alarmStatisticsController = this;
        let param: alarmTrafficReqEnum;

        if (dataFilterParam) {
            param = angular.copy(dataFilterParam);
            param.timeType = moduleString.Month;
        };

        that.maintainService.alarmStatisticsModule(param).then((res: any) => {
            that.TrendDeviceDropList = res.data.deviceDropMenu;
            that.TrendAreaDropList = res.data.areaDropMenu;
            that.areaDefaultSelected = [that.TrendAreaDropList[0]];
            that.areaAlarmTrendData = angular.copy(res.data);
            console.log(that.areaAlarmTrendData, "=========================");

            let result: any = {};
            result.xData = that.areaAlarmTrendData.xData;
            result.seriesData = [that.areaAlarmTrendData.seriesData[0]];
            result.areaDropMenu = [that.areaAlarmTrendData.areaDropMenu[0]]
            that.getDataAndInitChart(AlarmStatisticsModuleName.areaAlarmTrend, result);
        })
    }

    // 切换设备类型
    public TrendStatusType(selected: dropEnum) {
        let param: alarmTrafficReqEnum = this.maintainFactory.getTimeParams(this.Area_Alarm_Trend_Model);
        param.resourceType = selected.value
        if (param) {
            this.initAreaAlarmTrend(param);
        }
    }

    // 区域切换
    public TrendStatusArea(selected: Array<dropEnum>) {

        let indexArr = [] as Array<number>
        selected.forEach((sel: dropEnum) => {
            this.areaAlarmTrendData.areaDropMenu.forEach((item: dropEnum, index: number) => {
                if (sel.text === item.text) {
                    indexArr.push(index)
                }
            });
        })
        let result = {} as any;
        result.areaDropMenu = selected;
        result.seriesData = [];
        this.areaAlarmTrendData.seriesData.forEach((item: any, index: number) => {
            if (indexArr.indexOf(index) !== -1) {
                result.seriesData.push(item)
            }
        })
        result.xData = this.areaAlarmTrendData.xData;
        this.getDataAndInitChart(AlarmStatisticsModuleName.areaAlarmTrend, result);
    }

    // 报警趋势时间控件
    public AreaTrendTimeButtonClick(value?: string) {
        let param: alarmTrafficReqEnum = this.maintainFactory.getTimeParams(this.Area_Alarm_Trend_Model, value);
        if (param) {
            this.initAreaAlarmTrend(param);
        }
    }

    // 设备报警统计(TOP10) ===============================>

    // 请求数据
    public initDeviceAlarmTop(dataFilterParam: alarmTrafficReqEnum) {
        let that: any = this;

        this.maintainService.deveceAlarmStatisticsTop(dataFilterParam).then((res: any) => {
            if (res && res.data) {
                that.areaAlarmData = angular.copy(res.data.areaObj);
                that.areaAlarmData[AlarmObjectType.ALL.text] = angular.copy(res.data.deviceObj.ALL);
                that.defaultAreaDropMenu = [].concat([{ text: '全部', value: "ALL" }], that.areaAlarmData.dropListMenu);
                that.areaAlarmTrendTableData = res.data.deviceObj.ALL;
                that.areaAlarmTrendTableData.legendData = ['报警区域', '报警数']

                let result: any = res.data.deviceObj[AlarmObjectType.ALL.value]
                if (result && result.yData.length && result.seriesData.length) {
                    that.deviceAlarmStatisticsTableData = result;
                    that.getDataAndInitChart(AlarmStatisticsModuleName.deviceAlarmStatistics, result);
                } else {
                    that.layerDec.warnInfo("暂无数据");
                    that.getDataAndInitChart(AlarmStatisticsModuleName.deviceAlarmStatistics, angular.copy(deviceAlarmRank));
                }
            }
        });
    }

    // 报警设备类型切换
    public AlarmDeviceDrop(selected: dropEnum) {
        let param: alarmTrafficReqEnum = this.maintainFactory.getTimeParams(this.Device_Alarm_Statistics_Model);
        param.resourceType = selected.value;
        if (param) {
            this.initDeviceAlarmTop(param);
        }
    }

    // 报警区域切换
    public AlarmAreaDrop(selected: dropEnum) {
        let data: any = this.areaAlarmData[selected.text];
        this.getDataAndInitChart(AlarmStatisticsModuleName.deviceAlarmStatistics, data);
    }

    // 时间控件
    public AlarmTimeButtonClick(value?: string) {
        let param: alarmTrafficReqEnum = this.maintainFactory.getTimeParams(this.Device_Alarm_Statistics_Model, value);
        if (param) {
            this.initDeviceAlarmTop(param);
        }
    }

    // TODO 布控库关联报警统计(TOP10) ===============================>
    public initDispatchedAboutAlarm(dataFilterParam: alarmTrafficReqEnum) {
        dataFilterParam.resourceType = AlarmObjectType.ALL.value;
        dataFilterParam.groupType = "ByLib";

        this.maintainService.dispatchedAboutAlarm(dataFilterParam).then((res: any) => {
            if (res && res.data) {
                this.dispatchedAboutAlarmTableData = res.data;
                this.dispatchedAboutAlarmTableData.legendData.unshift("布控库名称");
                this.getDataAndInitChart(AlarmStatisticsModuleName.dispatchedAboutAlarm, res.data);
            }
        })
    }

    // 时间控件
    public DispatchedTimeButtonClick(value?: string) {
        let param: alarmTrafficReqEnum = this.maintainFactory.getTimeParams(this.Dispatched_About_Alarm_Model, value);
        if (param) {
            this.initDispatchedAboutAlarm(param);
        }
    }

    // 得到echart配置文件, 绘制图表
    private getDataAndInitChart(chartName: string, data: any) {
        let chartConfig: any = this.setData(chartName, data);
        if (chartConfig) {
            this.maintainFactory.initChart(chartConfig);
        } else {
            this.layerDec.warnInfo("暂无数据")
        }
    }

    public exportImage(id: string) {
        this.maintainFactory.exportImage(id)
    }

    public exportExcel(module: string, data: any) {
        this.maintainFactory.exportExcel(module, data);
    }

}

app.controller("alarmStatisticsController", alarmStatisticsController);