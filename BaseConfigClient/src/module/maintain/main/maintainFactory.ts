import { app } from "../../common/app/main.app";
import * as ChartOptions from "../../common/enum/EchartConfig";
import * as echarts from "echarts"
import "../../common/services/maintain.service"
import "../../common/factory/dataSelect.factory"
import { IMaintainService } from "../../common/services/maintain.service"
import * as _ from "lodash";
import "JsonExportExcel"
import {
    AlarmObjectType,
    dropEnum,
    deviceStatisticsEnum,
    alarmTrafficTrend,
    alarmTrafficTrendData,
    alarmTrafficTimeFormat,
    alarmTrafficReqEnum,
    alarmTrafficReqParams,
    AlarmSuperData,
    FlowSuperData,
    AlarmStatusType,
    dispatchedResult,
    echartNameArr,
    intelligentAnalysisDataEnum,
    intelligentAnalysisData,
    exportExcelParamEnum,
    ExcelTableEnum,
    intelligentAnalysisRequireParams
} from "../../../core/entity/maintainEnum";
import 'moment'
import { setEnlargeData, EChartOption, dataText } from "../../common/enum/EchartConfig";
import { dataSelectResult, moduleString, dataSelectServer } from "../../common/factory/dataSelect.factory";
import { OperThirdModule } from "../../../core/entity/OperThirdModule";
import { OperSecondModule } from "../../../core/entity/OperSecondModule";
import ResourceParams from "../../../core/params/ResourceParams";

declare let moment: any, angular: any, Promise: any, $: any, ExportJsonExcel: any;

export class allParams extends dataSelectResult {
    AreaName: string = "ALL"; // 地区名称
    DeviceName: string = "ALL";// 设备名称
    module: string; // 图表名称
    constructor(moduleName: string) {
        super();
        this.module = moduleName
    }
}

export class IEchartFactory {
    initChart: (config: ChartOptions.setEnlargeData) => void;
    destroyChart: () => void;
    AlarmTrafficStatistics: (dataFilterParam?: alarmTrafficReqEnum) => any;
    exportImage: (id: string) => void;
    exportExcel: (module: any, data: any) => void;
    exportTableXls: (url: string, params: any) => void;
    getTimeParams: (modelParam: allParams, value?: string) => alarmTrafficReqEnum;
    RetrievalParams: (dataTime?: string) => intelligentAnalysisRequireParams;
    alarmParams: (dataTime?: string, resourceType?: string) => ResourceParams;
    RetrievalRankParam: (dateType: dataSelectResult, resourceType?: string, value?: string) => ResourceParams;
    DeviceDropMenu: () => Array<dropEnum>;
}

export function ChartOptionObject(name: string) {
    let conf = {} as setEnlargeData;
    conf.name = name;
    conf.title = echartNameArr[name];
    conf.config = {} as EChartOption
    return conf
};



class maintainFactory implements IEchartFactory {
    static $inject = ['i18nFactory', "maintainService", "dataSelectServer"];

    charts: { [key: string]: any } = {};
    chartsImage: { [key: string]: string } = {};
    xData: Array<string>;
    legendData: Array<string>;
    AlarmTrafficTrendData: any;
    AlarmTrafficModule: string;
    dispatchedAboutAlarmData: any;
    ModuleNameArr: intelligentAnalysisDataEnum = angular.copy(intelligentAnalysisData);
    constructor(
        private i18nFactory: any,
        private maintainService: IMaintainService,
        private dataSelectServer: dataSelectServer
    ) {
    }

    // 通过typescript枚举形成配置文件
    public initChart(option: ChartOptions.setEnlargeData) {
        if (!!option && !!option.config && !_.isEmpty(echarts)) {
            let domString: string = `#${option.name} canvas`;
            let canvas: any = $(domString)[0];
            let dom: any = document.getElementById(option.name);
            if (!!this.charts && this.charts[option.name] && canvas) {
                this.charts[option.name].clear();
                this.charts[option.name].setOption(option.config);
                this.charts[option.name].resize({
                    width: 'auto',
                    height: 'auto'
                });
            } else if (dom) {
                this.charts[option.name] = echarts.init(dom);
                this.charts[option.name].setOption(option.config);
            }
        }
    }

    public exportImage(id: string) {
        let sampleImage: any = $(`#${id} canvas`)[0];
        let url: string = sampleImage.toDataURL("image/png");
        let triggerDownload = $("#download").attr("href", url).attr("download", echartNameArr[id] + ".png");
        triggerDownload[0].click();
    }

    // 得到时间参数初始化图表
    public getTimeParams(modelParam: allParams, value?: string) {
        let params: alarmTrafficReqEnum = alarmTrafficReqParams;
        params.endDate = moment().format("YYYY-MM-DD hh:mm:ss");

        let result: dataSelectResult = this.dataSelectServer.getParamsTime(modelParam);
        if (modelParam.module == moduleString.ALL) { result.module = moduleString.Month }

        if (modelParam.module == moduleString.Custom && value) {
            let valueArr: Array<string> = value.split(" - ");
            params.beginDate = valueArr[0];
            params.endDate = valueArr[1];
        } else {
            params.beginDate = result.startTime;
            params.endDate = result.endTime;
        }

        if (params.beginDate && params.endDate && modelParam.module && params.beginDate !== params.endDate) {
            params.timeType = result.module == moduleString.Custom ? moduleString.Day : result.module;
            params.resourceType = modelParam.DeviceName || moduleString.ALL;
            return params
        }
    }


    /*
     * 报警流量请求后台
     * @param {dataFilterParam} 按类型过滤条件参数
     * @param {alarmTrafficReqEnum} 请求后台参数
     * @returns {Promise<void>}
     * @constructor
     */

    public AlarmTrafficStatistics(dataFilterParam?: alarmTrafficReqEnum) {
        let that: any = this;
        this.dispatchedAboutAlarmFun();
        return this.maintainService.alarmStatisticsModule(dataFilterParam).then((res: any) => {
            if (res && res.data) {
                this.AlarmTrafficTrendData = res;
                this.AlarmTrafficModule = dataFilterParam.resourceType;
                return that.diffModuleData(res, dataFilterParam)
            }
        })
    }

    // 销毁echat图表
    public destroyChart() {
        Object.keys(this.charts).forEach((item: string, index) => {
            this.charts[item] = null;
        })
    }

    // 过滤后台返回数据内的所有区域
    public Areafilter(seraie: Array<any>) {
        let xData = [] as Array<string>;
        seraie.forEach((item: any) => {
            if (xData.indexOf(item.Name) == -1) {
                if (item.Name) {
                    xData.push(item.Name);
                }
            }
        });
        return xData
    }

    // 获取类型
    public TypeEnum(type?: string) {
        let AlarmObject: any = angular.copy(AlarmObjectType);
        let legendData = Object.keys(AlarmObject) as Array<string>;

        // 拿到中文legend
        let chineseLegend: Array<string> = [];
        legendData.forEach((type: string) => {
            chineseLegend.push(AlarmObject[type].text)
        });

        return type == "ch" ? chineseLegend : legendData;
    }

    // 区域报警流量统计图表方法
    private areaTrafficAlarm(res: any, Tabletype: string) {
        let seraie: any = res.data.seraie;

        this.xData = this.Areafilter(seraie);
        this.legendData = this.TypeEnum();

        let seraieData: Array<Array<number>> = [];
        // 拿到设备所在的区域报警数
        this.legendData.forEach((type, index) => {
            this.xData.forEach((area, i) => {
                seraie.forEach((data: any) => {
                    if (data.Name === area) {
                        if (!Array.isArray(seraieData[index])) {
                            seraieData[index] = [];
                        }
                        seraieData[index][i] = data.device[type] ? data.device[type][Tabletype] : 0;
                    }
                })
            })
        });

        return {
            seriesData: seraieData,
            xData: this.xData,
            legendData: this.TypeEnum('ch')
        };
    }

    // 设备统计(TOP10)图表方法
    private deviceAlarmTraffic(data: any, module: string) {
        switch (module) {
            case "alarm": {
                return this.deviceTypeData(data.Top10DeviceMap.alarmTop10Device, module)
            }
            case "flow": {
                return this.deviceTypeData(data.Top10DeviceMap.trafficTop10Device, module);
            }
        }
    }

    // 按模块按设备类型转换为Echart数据
    private deviceTypeData(data: any, module: string) {
        let result: any = angular.copy(data);
        let AlarmObject: any = angular.copy(AlarmObjectType);
        let switchResult: any = {};
        if (AlarmObject && result) {
            Object.keys(AlarmObject).forEach((type) => {
                Object.keys(result).forEach((item: string) => {
                    if (type == item) {
                        if (!switchResult[item]) {
                            switchResult[item] = {} as deviceStatisticsEnum;
                            switchResult[item].seriesData = [];
                            switchResult[item].yData = [];
                        }
                        result[item].forEach((resu: any) => {
                            if (resu[module] && resu.deviceID) {
                                switchResult[item].seriesData.push(resu[module]);
                                switchResult[item].yData.push(resu.deviceID);
                            }
                        });
                    }
                });
            });
        }
        return switchResult
    }

    private dispatchedAboutAlarmFun() {
        let params: alarmTrafficReqEnum = {
            beginDate: "",
            endDate: "2017-11-28 23:59:59",
            groupType: "ByLib",
            timeType: "Day"
        };

        this.maintainService.dispatchedAboutAlarm(params).then((res: any) => {
            this.dispatchedAboutAlarmData = res.data;
        })
    }

    // 查询不同模块的数据
    private diffModuleData(res: any, dataFilterParam: alarmTrafficReqEnum) {
        let superData: any;
        let resultData: any = this.areaTrafficAlarm(res, dataFilterParam.module);

        if (dataFilterParam.module == "alarm") {
            superData = new AlarmSuperData();
            superData.dropListArea = this.DropListData(resultData.xData);
            superData.dropListType = this.DropListData(resultData.legendData);
            superData.areaAlarm = resultData;
            superData.deviceAlarmStatistics = this.deviceAlarmTraffic(res.data, dataFilterParam.module);
            superData.areaAlarmTrend = this.AlarmTraffeicTrend(res.data.trendStatistics, dataFilterParam);
            superData.dispatchedAboutAlarm = this.dispatchedAboutAlarmData
        } else if (dataFilterParam.module == 'flow') {
            superData = new FlowSuperData();
            superData.dropListArea = this.DropListData(resultData.xData);
            superData.dropListType = this.DropListData(resultData.legendData);
            superData.areaTrafficStatistics = resultData;
            superData.deviceTrafficStatistics = this.deviceAlarmTraffic(res.data, dataFilterParam.module);
            superData.areaTrafficTrend = this.AlarmTraffeicTrend(res.data.trendStatistics, dataFilterParam)
        }

        return Promise.resolve(superData)
    }

    // 报警流量趋势
    private AlarmTraffeicTrend(alarmTrafficTrend: alarmTrafficTrend, dataFilterParam: alarmTrafficReqEnum) {
        let xData = this.timeFiler(dataFilterParam.timeType);
        if (dataFilterParam.timeType == "Day") {
            let infoArr: Array<alarmTrafficTimeFormat> = [];

            xData.forEach((x: string) => {
                let lastDay = moment().subtract(1, 'days').format('YYYY-MM-DD ') + x;
                let info = {
                    AlarmNm: 0,
                    FlowNm: 0,
                    timeItem: lastDay
                } as alarmTrafficTimeFormat;
                let _a: string = moment(new Date(lastDay)).format('YYYY-MM-DD hh');

                alarmTrafficTrend.trendStatistics.forEach((item: alarmTrafficTrendData) => {
                    let _b: string = moment(new Date(item.timeItem)).format('YYYY-MM-DD hh');
                    // 时间过滤 区域过滤

                    if (_a == _b && item.areaName == dataFilterParam.AreaName) {
                        info.AlarmNm += item.alarm;
                        info.FlowNm += item.flow;
                    }
                });
                infoArr.push(info);
            });
            return this.changeChartDataForThird(dataFilterParam, xData, infoArr)
        }
    }

    // 转换成图表所需格式
    private changeChartDataForThird(dataFilterParam: alarmTrafficReqEnum, xData: Array<string>, infoArr: Array<alarmTrafficTimeFormat>) {
        let chartData: any = {
            seriesData: [],
            xData: xData,
            legendData: [dataFilterParam.module]
        };

        let timeInfo: Array<number> = [];
        xData.forEach((xItem: string) => {
            let _a: string = moment().subtract(1, 'days').format('YYYY-MM-DD ') + xItem;

            infoArr.forEach((item: alarmTrafficTimeFormat) => {
                let _b: string = moment(item.timeItem).format('YYYY-MM-DD HH:mm');
                if (_a == _b) {
                    if (dataFilterParam.module == "alarm") {
                        timeInfo.push(item.AlarmNm)
                    } else if (dataFilterParam.module == "flow") {
                        timeInfo.push(item.FlowNm)
                    }
                }
            });
        });
        chartData.seriesData.push(timeInfo);
        return chartData
    };

    private static timeMatchArr(timeString: string) {
        if (timeString == "month") {
            let Arr = [];
            for (let i = 0; i < moment().format('DD'); i++) {
                if (i) {
                    Arr.push(moment().format('YYYY-MM-') + i)
                }
            }
            return Arr
        } else if (timeString == "Day") {
            let Arr: Array<any> = [];
            return Arr
        }
    }

    // 转换为下拉菜单指令所需格式
    private DropListData(xData: Array<string>) {
        let result: Array<dropEnum> = [];
        let AlarmObject: any = angular.copy(AlarmObjectType);
        let Alarmkey: Array<string> = Object.keys(AlarmObject);

        xData.forEach((item: string) => {
            let resultChild = {} as dropEnum;
            resultChild.text = item;
            Alarmkey.forEach((info: string) => {
                if (item == AlarmObject[info].text) {
                    resultChild.value = info;
                }
            });
            result.push(resultChild)
        });
        return result
    }
    //时间作为横坐标
    public timeFiler(type: string) {
        switch (type) {
            case "Day": {
                let x = [] as Array<string>;
                for (let i: number = 0; i < 24; i++) {
                    let hh: string | number = i < 10 ? '0' + i : i;
                    x.push(`${hh}:00`)
                }
                return x
            }
            case "Week": {
                return this.getTimeX(7)
            }
            case "Month": {
                return this.getTimeX(30)
            }
        }
    }

    private getTimeX(time: number) {
        let x = [] as Array<string>;
        for (let i = 0; i < time; i++) {
            x.unshift(moment().subtract(i + 1, 'days').format('YYYY-MM-DD'))
        }
        return x
    }

    public DeviceDropMenu() {
        let AlarmObject = angular.copy(AlarmObjectType);
        let deviceDropMenu = [] as Array<dropEnum>;
        Object.keys(AlarmObject).forEach((value) => {
            let dropData = {} as dropEnum;
            dropData.text = AlarmObject[value].text;
            dropData.value = AlarmObject[value].value;
            deviceDropMenu.push(dropData);
        });
        return deviceDropMenu
    }

    // ===================下载图表excel数据

    /**
     * 
     * @param options 
     * @param options.fileName 下载文件-文件名(字符串)
     * @param options.datas 下载文件数据(数组)每个数据代表一个sheet
     * @param options.datas[$index].sheetName sheet名称
     * @param options.datas[$index].sheetData 数据Array<Array<number|string>>
     * @param options.datas[$index].sheetHeader excel文件第一行
     *          
     */
    public exportExcel(module: any, data: any) {
        let option = {} as exportExcelParamEnum;

        switch (module) {
            case this.ModuleNameArr.areaAlarmTrend:
            case this.ModuleNameArr.deviceAlarmStatistics:
            case this.ModuleNameArr.deviceTrafficStatistics:
            case this.ModuleNameArr.dispatchedAboutTaskStatistics: {
                option = this.changeTheDataFormatOne(echartNameArr[module], data);
                break;
            }
            case this.ModuleNameArr.dispatchedAboutAlarm: {
                option = this.changeTheDataFormatTwo(echartNameArr[module], data);
                break;
            }
            case this.ModuleNameArr.Maintain_StatisOverview_Retrival: {
                option = this.changeTheDataFormatThird(echartNameArr[module], data);
                break;
            }
            case this.ModuleNameArr.IntelligentAnalysis_Vehicle:
            case this.ModuleNameArr.IntelligentAnalysis_Face:
            case this.ModuleNameArr.IntelligentAnalysis_Mac:
            case this.ModuleNameArr.IntelligentAnalysis_Crash: {
                option = this.changeTheDataFormatFour(echartNameArr[module], data);
                break;
            }
            case this.ModuleNameArr.Maintain_StatisOverview_Retrival_Rank: {
                option = this.changeTheDataFormatFive(echartNameArr[module], data);
                break;
            }
            default: {
                option = this.changeTheDataFormat(echartNameArr[module], data);
                break;
            }
        }
        if (option && !_.isEmpty(option)) {
            var toExcel = new ExportJsonExcel(option);
            toExcel.saveExcel();
        }
    }

    // 默认数据转换
    private changeTheDataFormat(title: string, data: any) {
        let newData = angular.copy(data);
        let option = {} as exportExcelParamEnum;
        option.fileName = title;
        option.datas = [];

        let tableData = {
            sheetHeader: newData.legendData,
            sheetData: newData.seriesData
        } as ExcelTableEnum;

        let newseries: Array<Array<number>> = [];
        newData.xData.forEach((area: string, index: number) => {
            newseries[index] = [];
            data.seriesData.forEach((data: Array<number>, idx: number) => {
                newseries[index][idx] = data[index]
            })
        });

        tableData.sheetData = newseries;

        newseries.forEach((item: Array<any>, index: number) => {
            tableData.sheetData[index].unshift(newData.xData[index])
        });

        option.datas.push(tableData);
        return option
    }

    private changeTheDataFormatOne(title: string, data: any) {
        let newData = angular.copy(data);
        let option = {} as exportExcelParamEnum;
        option.fileName = title;
        option.datas = [];

        let tableData = {
            sheetHeader: data.legendData,
            sheetData: []
        } as ExcelTableEnum;

        newData.seriesData.forEach((item: any, index: number) => {
            let content: Array<string | number> = [newData.seriesData[index]];
            content.unshift(newData.yData[index]);
            tableData.sheetData.push(content);
        });

        option.datas.push(tableData);
        return option
    }

    private changeTheDataFormatTwo(title: string, data: any) {
        let newData = angular.copy(data);
        let option = {} as exportExcelParamEnum;
        option.fileName = title;
        option.datas = [];

        let tableData = {
            sheetHeader: newData.legendData,
            sheetData: newData.seriesData
        } as ExcelTableEnum;

        let newseries: Array<Array<number>> = [];
        newData.yData.forEach((area: string, index: number) => {
            newseries[index] = [];
            data.seriesData.forEach((data: Array<number>, idx: number) => {
                newseries[index][idx] = data[index]
            })
        })

        tableData.sheetData = newseries;

        newseries.forEach((item: Array<any>, index: number) => {
            tableData.sheetData[index].unshift(newData.yData[index])
        })

        option.datas.push(tableData)
        return option
    }

    private changeTheDataFormatThird(title: string, data: any) {
        let newData = angular.copy(data);
        let option = {} as exportExcelParamEnum;
        option.fileName = title;
        option.datas = [];

        let tableData = {
            sheetHeader: newData.xData,
            sheetData: [newData.seriesData]
        } as ExcelTableEnum;

        option.datas.push(tableData)
        return option
    }

    private changeTheDataFormatFour(title: string, data: any) {
        let newData = angular.copy(data);
        let option = {} as exportExcelParamEnum;
        option.fileName = title;
        option.datas = [];

        let tableData = {
            sheetHeader: newData.legendData,
            sheetData: []
        } as ExcelTableEnum;

        newData.seriesData.forEach((item: any, index: number) => {
            let content: Array<string | number> = [newData.xData[index]];
            content.push(item)
            tableData.sheetData.push(content)
        })

        option.datas.push(tableData)
        return option
    }

    private changeTheDataFormatFive(title: string, data: any) {
        let newData = angular.copy(data);
        let option = {} as exportExcelParamEnum;
        option.fileName = title;
        option.datas = [];

        let tableData = {
            sheetHeader: ['排行', '设备名称', '类别', "搜索次数", "搜索时间"],
            sheetData: []
        } as ExcelTableEnum;

        newData.legendData.forEach((title: string, index: number) => {
            if (newData.seriesData[index]) {
                newData.seriesData[index].forEach((item: any, idx: number) => {
                    let content: Array<string | number> = [];
                    content[0] = idx + 1;
                    content[1] = item.statisticsItem;
                    content[2] = data.legendData[index];
                    content[3] = item.num;
                    content[4] = item.timeItem;
                    tableData.sheetData.push(content);
                })
            }

        })

        option.datas.push(tableData)
        return option
    }

    /**
     * 
     * @param params 导出流文件
     */

    public exportTableXls(url: string, params: any) {
        console.log(params)
        // window.open('about:blank', "_blank");
        let form = $("<form>");
        form.attr('name', 'dowmloadStatus');
        form.attr('target', '_blank');
        form.attr('method', "post");
        form.attr('action', url);
        $('body').append(form)

        Object.keys(params).forEach((item: string) => {
            var input = $('<input>');
            input.attr('type', 'hidden');
            input.attr('name', item);
            input.attr('value', params[item]);
            $("form[name='dowmloadStatus']").append(input)
        })

        $("form[name='dowmloadStatus']").submit();
        $("form[name='dowmloadStatus']").remove();
    }

    private getModuleName(dateType: dataSelectResult, value?: string) {
        if (!dateType.module || dateType.module == moduleString.ALL) {
            dateType.module = moduleString.Month
        } else if (dateType.module == moduleString.Custom && value) {
            let valueArr: Array<string> = value.split(" - ");
            dateType.startTime = valueArr[0];
            dateType.endTime = valueArr[1];
            dateType.module = moduleString.Day;
        }
        return dateType
    }
    //资源检索参数获取
    static RetrievalmoduleNames: Array<{ code: string, name: string }> = [
        OperSecondModule.ResourceRetrieval_FullSearch,
        OperThirdModule.ResourceRetrieval_AdvanceSearch_Vehicle,
        OperThirdModule.ResourceRetrieval_AdvanceSearch_Face,
        OperThirdModule.ResourceRetrieval_AdvanceSearch_WiFi,
        OperThirdModule.ResourceRetrieval_AdvanceSearch_EFence
    ];
    public RetrievalParams(dataTime?: string) {
        // 获取时间
        let dateType = {} as dataSelectResult;
        dateType.module = dataTime ? dataTime : moduleString.Year;
        let dateModule = this.dataSelectServer.getParamsTime(dateType);
        // 获取参数
        let params = {} as intelligentAnalysisRequireParams;
        params.beginDate = dateModule.startTime;
        params.endDate = dateModule.endTime;
        params.moduleNames = maintainFactory.RetrievalmoduleNames.map((item: { code: string, name: string }) => item.code).join(',');
        params.statisticModuleLevel = 3;
        return params
    }

    // 检索排行榜参数获取
    public RetrievalRankParam(dateType: dataSelectResult, resourceType?: string, value?: string) {
        let dataTypeParams: dataSelectResult = this.getModuleName(dateType, value)

        let dateModule = this.dataSelectServer.getParamsTime(dataTypeParams);
        // 获取参数
        let params = {} as ResourceParams;
        params.resourceType = resourceType ? resourceType : AlarmObjectType.ALL.value;
        params.timeType = dateModule.module;
        params.beginDate = dateModule.startTime;
        params.endDate = dateModule.endTime;
        return params
    }

    // 报警统计参数获取
    public alarmParams(dataTime?: string, resourceType?: string) {
        // 获取时间
        let dateType = {} as dataSelectResult;
        dateType.module = dataTime ? dataTime : moduleString.Year;
        let dateModule = this.dataSelectServer.getParamsTime(dateType);
        // 获取参数
        let params = {} as ResourceParams;
        params.resourceType = resourceType ? resourceType : AlarmObjectType.ALL.value;
        params.timeType = dateType.module;
        params.beginDate = dateModule.startTime;
        params.endDate = dateModule.endTime;
        return params
    }

    // 排行参数获取
    public RankParams(dataTime?: string, resourceType?: string) {
        // 获取时间
        let dateType = {} as dataSelectResult;
        dateType.module = dataTime ? dataTime : moduleString.Month;
        let dateModule = this.dataSelectServer.getParamsTime(dateType);
        // 获取参数
        let params = {} as ResourceParams;
        params.resourceType = resourceType ? resourceType : AlarmObjectType.ALL.value;
        params.timeType = dateType.module;
        params.beginDate = dateModule.startTime;
        params.endDate = dateModule.endTime;
        params.topNum = '10'
        return params
    }
}

app.service('maintainFactory', maintainFactory);