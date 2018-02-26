import { ResponseResult, BackResponseBody } from "../core/params/result/ResponseResult";
import ChildWhere from "../common/ChildWhere";
import Where from "../common/Where";
import OperationsDao from '../dao/OperationsDao'
import ResourceParams from '../core/params/ResourceParams'
import PortraitNodeTool from '../utils/CommonUtils'
import { Area } from "../core/entity/Area";
import ErrorCode from "../common/res/ErrorCode";
import { extend } from "../utils/ExtendUtils";
import * as moment from "moment";
import * as _ from "lodash";
import {
    alarmTrafficReqEnum,
    alarmTrafficReqParams,
    AlarmResultEnum,
    AreaInfo,
    AlarmStatusType,
    StatisticsOverview,
    devicestausbarEnum,
    dispatchedResult,
    analysisStatisticsResult,
    alarmTrafficTrendData,
    AlarmObjectType,
    AlarmObjectEnum,
    dropEnum,
    intelligentAnalysisData,
    areaDropList,
    intelligentAnalysisRequireParams,
    CommonDeviceType
} from "../core/entity/maintainEnum";
import { BeanHelper } from '../common/help/BeanHelper';
import { DaoType } from '../dao/enum/DaoType';
import { BDaoImpl } from '../dao/core/BDaoImpl';
import ResourceDao from '../dao/ResourceDao';
import AreaDao from "../dao/AreaDao";
import ExceptionLogDao from "../dao/ExceptionLogDao";
import { OperThirdModule } from "../core/entity/OperThirdModule";
import { OperSecondModule } from "../core/entity/OperSecondModule";
// import { TaskType } from "../core/server/enum/TaskType";
import { ResourceTools } from "../extend/ResourceTools";
import { type } from "os";
import { OperationsServerExt, IOperationsServerExt } from "../extend/Operations";

const TaskType: { [key: string]: { value: string, text: string } } = {
    FaceMonitor: { value: "FaceMonitor", text: "人像布控任务" },
    VehicleMonitor: { value: "VehicleMonitor", text: "车辆布控任务" },
    MacMonitor: { value: "MacMonitor", text: "感知数据布控任务" },
    IMEIMonitor: { value: "IMEIMonitor", text: "IMEI布控任务" },
    IMSIMonitor: { value: "IMSIMonitor", text: "IMSI布控任务" },
    FaceStruct: { value: "FaceStruct", text: "人像结构化任务" },
    VehicleStruct: { value: "VehicleStruct", text: "车辆结构化任务" }
};

class OperationEnum {
    static carAlarm = "车辆报警";
    static macAlarm = "感知数据报警";
    static personAlarm = "人像报警";
    static carFlow = "车辆流量";
    static macFlow = "感知数据流量";
    static personFlow = "人像流量";
    static alarm = "alarm";
    static flow = "flow";
    static WiFi = "WiFi";
    static EFENCE = "EFENCE";
    static Vehicle = "Vehicle";
    static Face = "Face";
}


export class areaStructTaskResultParam {
    number: number;
    taskType: string;
    areaName: string;
}

export interface IOperationsService {
    //用户状态
    userStatus(params: any): any;

    //日志管理
    logManagement(params: any): any;

    //运行日志(异常日志)
    exceptionlog(params: any): any;

    //得到设备状态模块
    getDevicesStatusModule(params: any): any;

    getServerStatusModule(params: any): any;

    //任务统计
    taskStatistics(areaId?: string): any;

    // 统计分析
    getDevicesStatus(): Promise<any>;

    taskStatisticsTotal(): Promise<any>;

    alarmStatistics(params: any): Promise<any>;

    trafficStatistics(): Promise<any>;

    retrievalStatistics(params?: intelligentAnalysisRequireParams): Promise<any>;

    analysissTatistics(): Promise<any>;

    //报警统计
    alarmStatisticsModule(params: any): Promise<any>;

    deveceAlarmStatisticsTop(params: any): Promise<any>;

    dispatchedAboutAlarm(params: any): any;

    //流量统计
    areaTrafficStatistics(params: any): Promise<any>;

    trafficStatisticsModule(params: any): Promise<any>;

    deveceTrafficStatisticsTop(params: any): Promise<any>;

    //分析统计
    intelligentAnalysis(params: any): any;

    //检索统计
    retrievalTrendStatistics(params: any): any;
    retrievalKeyWordRank(params: any): any;
}

export class OperationsService implements IOperationsService {
    AlarmObjectType: AlarmObjectEnum = AlarmObjectType;

    static ResourceServerExt: IOperationsServerExt = new OperationsServerExt();
    constructor() {
    }

    // 检索趋势统计
    async retrievalTrendStatistics(params: any) {
        let result = await OperationsService.ResourceServerExt.requestMonthAll(params, intelligentAnalysisData.Maintain_StatisOverview_Retrival_Trend);
        return result
    }

    // 检索排行
    async retrievalKeyWordRank(params: any) {
        let result = await OperationsService.ResourceServerExt.requestMonthAll(params, intelligentAnalysisData.AllRankList);
        return result || []
    }

    //用户状态
    userStatus(params: any) {
        if (params) {
            return BeanHelper.getDao<OperationsDao>(DaoType.OperationsDao).userStatus(params)
        } else {
            return Promise.resolve(null)
        }
    }

    //日志管理
    logManagement(params: any) {
        if (params) {
            return BeanHelper.getDao<OperationsDao>(DaoType.OperationsDao).logManagement(params)
        } else {
            return Promise.resolve(null)
        }
    }

    // 运行日志
    exceptionlog(params: any) {
        if (params) {
            let arrWhereJson: Array<Where> = OperationsService.exceptionlogWhereJson(params.arrWhereJson) || [];
            // TODO 需要验证
            return BeanHelper.getDao<ExceptionLogDao>(DaoType.ExceptionLogDao).findListByPage(arrWhereJson, params.currentPage, params.pageSize);
        } else {
            return Promise.resolve(null)
        }
    }

    static exceptionlogWhereJson(arg: any) {
        console.log(arg);
        let where = new Where();
        where.JType = "And";
        //开始时间
        let whereChild = new ChildWhere();
        whereChild.FieldName = "F_Exception_Time";
        whereChild.FieldType = "DateTime";
        whereChild.FieldValue = arg.startTime;
        whereChild.MType = "GreaterEqual";
        whereChild.JType = "And";
        where.Childs.push(whereChild);
        //结束时间
        let whereChild1 = new ChildWhere();
        whereChild1.FieldName = "F_Exception_Time";
        whereChild1.FieldType = "DateTime";
        whereChild1.FieldValue = arg.endTime;
        whereChild1.MType = "LessEqual";
        whereChild1.JType = "And";
        where.Childs.push(whereChild1);
        console.log(where);
        //异常信息
        // let whereChild2 = new ChildWhere();
        // whereChild2.FieldName = "F_Exception_Message";
        // whereChild2.FieldType = "Text";
        // whereChild2.FieldValue = arg.keyValue;
        // whereChild2.MType = "Like";
        // whereChild2.JType = "And";
        // where.Childs.push(whereChild2);
        return [where]
    }


    // 计算相对类型的数据
    private getChartData(areas: Array<string>, chart: Array<areaStructTaskResultParam>, typeEnum: Array<string>) {
        let superData: any = {
            seriesData: [],//number
            xData: [],//area
            legendData: []//type
        }
        typeEnum.forEach((type: string, index: number) => {
            superData.legendData[index] = TaskType[type].text;
        })

        // 按地区按类型来获取数据
        superData.xData = areas;
        typeEnum.forEach((type: string, index: number) => {
            let series: Array<number> = [];
            areas.forEach((area: string, idx: number) => {
                series[idx] = 0;
                chart.forEach((item: areaStructTaskResultParam) => {
                    if (item.areaName == area && item.taskType == type) {
                        series[idx] += Number(item.number)
                    }
                })
            })
            superData.seriesData[index] = series
        })
        return superData;
    }

    // 任务统计模块
    taskStatistics(areaId?: string): any {
        return Promise.resolve(null)
            .then(() => {
                let arr: [Promise<BackResponseBody<Array<any>>>, Promise<BackResponseBody<Array<any>>>] = [BeanHelper.getDao<OperationsDao>(DaoType.OperationsDao).areaTaskStatistic(), BeanHelper.getDao<OperationsDao>(DaoType.OperationsDao).controlTaskStatistic(areaId || '')];
                return Promise.all(arr);
            })
            .then((res: [BackResponseBody<Array<any>>, BackResponseBody<Array<any>>]) => {
                let result = new ResponseResult();
                result.code = 200;
                result.count = res[0].count + res[1].count;
                let data = {
                    areaTaskStatistics: {
                        seriesData: [],//number
                        xData: [],//area
                        legendData: []//type
                    },
                    areaDispatchedTaskStatistics: {
                        seriesData: [],
                        xData: [],
                        legendData: []
                    },
                    dispatchedAboutTaskStatistics: []
                } as any;

                if (res[0].data && res[0].data.length > 0) {

                    let someData: Array<areaStructTaskResultParam> = [];
                    // 不存在taskType的数据过滤掉
                    res[0].data.forEach((item: areaStructTaskResultParam) => {
                        if (item.taskType) {
                            someData.push(item);
                        }
                    })

                    // 获取地区并去重
                    let areas: Array<string> = []
                    someData.forEach((item: areaStructTaskResultParam) => {
                        if (areas.indexOf(item.areaName) == -1) {
                            areas.push(item.areaName)
                        }
                    })

                    // 按类型区分不同数据
                    let TaskTypeItem: { [key: string]: Array<areaStructTaskResultParam> } = {};
                    Object.keys(TaskType).forEach((type: string, index: number) => {
                        TaskTypeItem[type] = [];
                        someData.forEach((item: areaStructTaskResultParam) => {
                            if (type == item.taskType) {
                                TaskTypeItem[type].push(item);
                            }
                        })
                    })
                    let chart1TypeEnum1 = [TaskType.FaceStruct.value, TaskType.VehicleStruct.value];
                    let chart1 = [].concat(TaskTypeItem.FaceStruct, TaskTypeItem.VehicleStruct);
                    data.areaTaskStatistics = this.getChartData(areas, chart1, chart1TypeEnum1)

                    let chart1TypeEnum2 = [TaskType.FaceMonitor.value, TaskType.VehicleMonitor.value, TaskType.MacMonitor.value];
                    let chart2 = [].concat(TaskTypeItem.FaceMonitor, TaskTypeItem.VehicleMonitor, TaskTypeItem.MacMonitor);
                    data.areaDispatchedTaskStatistics = this.getChartData(areas, chart2, chart1TypeEnum2)
                }

                if (res[1].data && res[1].data.length > 0) {
                    res[1].data.forEach((item, index) => {
                        data.dispatchedAboutTaskStatistics.push({
                            seriesData: item.number,
                            yData: item.libName,
                            area: item.areaName
                        })
                    })
                }
                result.data = data;
                return result
            })
    }

    // 解析设备数据
    private DeviceStatusObj(data: devicestausbarEnum) {
        let deviceType: Array<any> = [
            AlarmObjectType.Face.value,
            AlarmObjectType.WiFi.value,
            AlarmObjectType.RmpGate.value,
            AlarmObjectType.EFENCE.value
        ];

        let arr: Array<StatisticsOverview> = [];

        deviceType.forEach((item: string) => {
            let StatisticsOverviewObj = {} as StatisticsOverview;
            switch (item) {
                case AlarmObjectType.Face.value: {
                    StatisticsOverviewObj.title = item;
                    StatisticsOverviewObj.total = data['CameraCount'] || 0;
                    StatisticsOverviewObj.alarm = 0;
                    StatisticsOverviewObj.online = data['CameraOnLine'] || 0;
                    arr.push(StatisticsOverviewObj);
                    break
                }
                case AlarmObjectType.WiFi.value: {
                    StatisticsOverviewObj.title = item;
                    StatisticsOverviewObj.total = data['WIFICount'] || 0;
                    StatisticsOverviewObj.alarm = 0;
                    StatisticsOverviewObj.online = data['WIFIOnLine'] || 0;
                    arr.push(StatisticsOverviewObj);
                    break;
                }
                case AlarmObjectType.RmpGate.value: {
                    StatisticsOverviewObj.title = item;
                    StatisticsOverviewObj.total = data['RmpCount'] || 0;
                    StatisticsOverviewObj.alarm = 0;
                    StatisticsOverviewObj.online = data['RmpOnLine'] || 0;
                    arr.push(StatisticsOverviewObj);
                    break;
                }
                case AlarmObjectType.EFENCE.value: {
                    StatisticsOverviewObj.title = item;
                    StatisticsOverviewObj.total = data['EFENCECount'] || 0;
                    StatisticsOverviewObj.alarm = 0;
                    StatisticsOverviewObj.online = data['EFENCEOnLine'] || 0;
                    arr.push(StatisticsOverviewObj);
                    break;
                }
            }
        });

        return arr
    }

    // 统计分析 - 获取设备信息
    getDevicesStatus(): Promise<any> {
        let deviceList: [any, any] = [BeanHelper.getDao<OperationsDao>(DaoType.OperationsDao).getDeviceStatus({}), BeanHelper.getDao<OperationsDao>(DaoType.OperationsDao).getDeviceAlarmStatus({ objectType: 'ALL' })];
        return Promise.all(deviceList).then((res: Array<any>) => {
            let arr = [] as any;
            let result = new ResponseResult();
            result.code = 200;
            if (res[0] && res[0].data && res[1] && res[1].data) {
                arr = this.DeviceStatusObj(res[0].data);
                arr.forEach((item: any, index: number) => {
                    res[1].data.forEach((item2: any) => {
                        if (item2.objectType == item.title) {
                            arr[index].alarm = item2.totalAlarm;
                        }
                    })
                });
                result.data = arr;
                return result;
            }
        })
    }

    // 获取设备模块信息
    getDevicesStatusModule(params: any): Promise<any> {
        return BeanHelper.getDao<OperationsDao>(DaoType.OperationsDao).getDevicesStatusModule(params)
    }

    // 获取设备信息
    getServerStatusModule(params: any): Promise<any> {
        return BeanHelper.getDao<OperationsDao>(DaoType.OperationsDao).getServerStatusModule(params)
    }

    // 统计分析页面
    taskStatisticsTotal() {
        return BeanHelper.getDao<OperationsDao>(DaoType.OperationsDao).TaskStatistic().then((res: any) => {
            let seriesData = _.cloneDeep(res.data);
            let resultData: any = {
                seriesData: [],
                legendData: []
            };
            let result = new ResponseResult();
            result.code = 200;

            if (res && seriesData) {
                Object.keys(TaskType).forEach((type: string) => {
                    Object.keys(seriesData).forEach((type1: string) => {
                        if (type == type1) {
                            resultData.seriesData.push(seriesData[type]);
                            resultData.legendData.push(TaskType[type].text);
                        }
                    })
                })

                result.data = resultData;
                return result
            }
        })
    }

    // 统计分析-报警统计 报警统计-区域报警统计
    alarmStatistics(params: ResourceParams) {
        return BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).getResourceNumByArea(params).then((res: ResponseResult<Array<alarmTrafficTrendData>>) => {
            if (res && res.data) {
                return this.alarmTrafficData(res, "alarm")
            }
        })
    };

    // 流量统计-区域流量统计（区域为横坐标计算数据）
    areaTrafficStatistics(params: ResourceParams) {
        let param = new ResourceParams();
        param.resourceType = 'ALL';
        param.timeType = 'Day';
        param.beginDate = moment().subtract(12, 'month').format('YYYY-MM-DD hh:mm:ss');
        param.endDate = moment().format('YYYY-MM-DD hh:mm:ss');
        return BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).getResourceNumByArea(param).then((res: ResponseResult<Array<alarmTrafficTrendData>>) => {
            if (res && res.data) {
                return this.alarmTrafficData(res, "flow")
            }
        })
    };

    //  报警统计-区域报警统计  流量统计-区域流量统计 数据计算（区域为横坐标计算数据）
    private alarmTrafficData(res: ResponseResult<Array<alarmTrafficTrendData>>, type: string) {
        let resourceData: any = {
            seriesData: [],
            xData: [],
            legendData: []
        };
        if (type == OperationEnum.alarm) {
            resourceData.legendData = [OperationEnum.carAlarm, OperationEnum.personAlarm, OperationEnum.macAlarm]
        } else if (type == OperationEnum.flow) {
            resourceData.legendData = [OperationEnum.carFlow, OperationEnum.personFlow, OperationEnum.macFlow]
        }

        //感知数据
        let MacArr: Array<alarmTrafficTrendData> = [];
        let FaceArr: Array<alarmTrafficTrendData> = [];
        let VehicleArr: Array<alarmTrafficTrendData> = [];

        // 根据类型筛选数据
        res.data.forEach((item: alarmTrafficTrendData) => {
            if (item.areaName && resourceData.xData.indexOf(item.areaName) == -1) {
                resourceData.xData.push(item.areaName)
            }

            if (item.objectType == OperationEnum.WiFi || item.objectType == OperationEnum.EFENCE) {
                MacArr.push(item);
            } else if (item.objectType == OperationEnum.Face) {
                FaceArr.push(item);
            } else if (item.objectType == OperationEnum.Vehicle) {
                VehicleArr.push(item);
            }
        });

        //累加地区
        let getAreaDeviceData: Function = (newData: Array<alarmTrafficTrendData>) => {
            let areaArr = [] as Array<number>;
            resourceData.xData.forEach((areName: string, index: number) => {
                areaArr[index] = 0;
                newData.forEach((item: any) => {
                    if (item.areaName == areName) {
                        areaArr[index] += Number(item[type]);
                    }
                })
            });
            return areaArr
        };
        resourceData.seriesData.push(getAreaDeviceData(VehicleArr));
        resourceData.seriesData.push(getAreaDeviceData(FaceArr));
        resourceData.seriesData.push(getAreaDeviceData(MacArr));
        let result = new ResponseResult();
        result.code = 200;
        result.data = resourceData;
        return result;
    }

    // 统计分析-流量趋势（时间为横坐标计算数据）
    trafficStatistics() {
        let params = new ResourceParams();
        params.resourceType = 'ALL';
        params.timeType = 'Hour';
        params.beginDate = moment().subtract(1, 'day').format('YYYY-MM-DD 00:00:00');
        params.endDate = moment().subtract(1, 'day').format('YYYY-MM-DD 23:59:59');
        console.log(params);
        return BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).getResourceNumByArea(params).then((res: ResponseResult<Array<alarmTrafficTrendData>>) => {
            if (res && res.data) {
                let result = new ResponseResult();
                result.code = 200;
                let resourceData: any = {
                    seriesData: [],
                    totalNum: 0,
                    xData: ResourceTools.createDayTimeLine(),
                    legendData: CommonDeviceType
                };
                // AlarmObjectType
                // 根据类型筛选数据
                let WiFiArr: Array<alarmTrafficTrendData> = [];
                let EFENCEArr: Array<alarmTrafficTrendData> = [];
                let FaceArr: Array<alarmTrafficTrendData> = [];
                let VehicleArr: Array<alarmTrafficTrendData> = [];
                res.data.forEach((item: alarmTrafficTrendData) => {
                    resourceData.totalNum += item.flow;
                    item.timeItem = moment(item.timeItem).format("hh:00");
                    if (item.objectType == AlarmObjectType.Face.value) {
                        FaceArr.push(item);
                    } else if (item.objectType == AlarmObjectType.Vehicle.value) {
                        VehicleArr.push(item);
                    } else if (item.objectType == AlarmObjectType.WiFi.value) {
                        WiFiArr.push(item);
                    } else if (item.objectType == AlarmObjectType.EFENCE.value) {
                        EFENCEArr.push(item);
                    }
                });

                // 根据时间累加
                let getDateData = (newData: Array<alarmTrafficTrendData>) => {
                    let result: Array<number> = [];
                    resourceData.xData.forEach((timer: string, index: number) => {
                        result[index] = 0;
                        newData.forEach((item: alarmTrafficTrendData) => {
                            if (item.timeItem == timer) {
                                result[index] += Number(item.flow);
                            }
                        })
                    });
                    return result;
                };

                resourceData.seriesData.push(getDateData(FaceArr));
                resourceData.seriesData.push(getDateData(VehicleArr));
                resourceData.seriesData.push(getDateData(WiFiArr));
                resourceData.seriesData.push(getDateData(EFENCEArr));

                result.data = resourceData;
                return result;
            }

        })
    }

    // 统计分析-检索统计
    retrievalStatistics(params?: intelligentAnalysisRequireParams) {
        return BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).searchOperCountByModule(params).then((res: BackResponseBody<any>) => {
            let result = new ResponseResult();
            result.code = 200;
            let resData: any = {
                yData: [],
                seriesData: []
            };
            let timeItem: Array<string> = [];
            let functionType: Array<string> = [
                OperThirdModule.ResourceRetrieval_AdvanceSearch_Vehicle.code,
                OperThirdModule.ResourceRetrieval_AdvanceSearch_Face.code,
                OperThirdModule.ResourceRetrieval_AdvanceSearch_WiFi.code,
                OperThirdModule.ResourceRetrieval_AdvanceSearch_EFence.code,
                OperSecondModule.ResourceRetrieval_FullSearch.code,
                ""
            ];
            // 目前空字符串代表设备和位置
            res.data.forEach((item: analysisStatisticsResult) => {
                if (timeItem.indexOf(item.timeItem) == -1) {
                    timeItem.push(item.timeItem)
                }
            });

            // console.log(functionType)
            functionType.forEach((type: string, index: number) => {
                resData.seriesData[index] = 0;
                res.data.forEach((item: analysisStatisticsResult) => {
                    if (item.functionType == type) {
                        if (!item.num) {
                            item.num = '0';
                        }
                        resData.seriesData[index] += Number(item.num);
                    }
                });
                if (type && OperThirdModule[type]) {
                    functionType[index] = OperThirdModule[type].name.trim();
                }
            });
            functionType[4] = "设备"
            functionType[5] = "位置"
            resData.seriesData[4] = resData.seriesData[5]
            resData.yData = functionType;
            result.data = resData;
            return result;
        });
    }

    // 统计分析-分析统计
    analysissTatistics() {
        let params = {} as any;
        params.beginDate = '';
        params.endDate = moment().format("YYYY-MM-DD hh:mm:ss");
        params.moduleNames = 'IntelligentAnalysis';
        params.statisticModuleLevel = 2;
        return BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).searchOperCountByModule(params).then((res: BackResponseBody<Array<analysisStatisticsResult>>) => {
            if (res && res.data) {
                let result = new ResponseResult();
                result.code = 200;
                let resourceData: any = {
                    totalNum: 0,
                    seriesData: [],
                    legendData: ['人员分析', '车辆分析', '感知数据分析']
                };

                let IntelligentType: Array<string> = [OperSecondModule.IntelligentAnalysis_Face.code, OperSecondModule.IntelligentAnalysis_Vehicle.code, OperSecondModule.IntelligentAnalysis_Mac.code];

                res.data.forEach((item: analysisStatisticsResult) => {
                    resourceData.totalNum += item.num;
                    IntelligentType.forEach((type: string) => {
                        if (item.functionType == type) {
                            resourceData.seriesData.push(item.num)
                        }
                    })
                });
                result.data = resourceData;
                return result;
            }
        })
    }

    // 分析统计
    intelligentAnalysis(params: intelligentAnalysisRequireParams) {
        return BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).searchOperCountByModule(params).then((res: any) => {
            if (res && res.data) {
                let result = new ResponseResult();
                result.code = 200;
                let OperThirdEnum = _.cloneDeep(OperThirdModule) as any;
                let results = {
                    seriesData: [],
                    xData: []
                } as any;

                Object.keys(OperThirdEnum).forEach((cate, index) => {
                    let num: number = 0;

                    res.data.forEach((item: any) => {
                        if (item.functionType && item.functionType == cate) {
                            num += Number(item.num);
                        }
                    })
                    if (num) {
                        results.seriesData.push(num);
                        results.xData.push(OperThirdEnum[cate].name);
                    }
                });

                if (results.seriesData && results.xData) {
                    result.data = results
                    return result
                }
            }
        })
    }

    // 报警统计-设备报警统计(TOP10)
    deveceAlarmStatisticsTop(params: ResourceParams) {
        console.log(params);
        return BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).getAlarmDeviceNum(params).then((res: any) => {
            if (res && res.data) {
                let result = new ResponseResult();
                result.code = 200;
                result.data = this.alarmTrafficDevice(res, params.resourceType, "alarm");
                return result
            }
        });
    }

    // 报警统计-设备报警统计(TOP10)
    deveceTrafficStatisticsTop(params: ResourceParams) {
        return BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).getAlarmDeviceNum(params).then((res: any) => {
            if (res && res.data) {
                let result = new ResponseResult();
                result.code = 200;
                result.data = this.alarmTrafficDevice(res, params.resourceType, "flow");
                return result
            }
        });
    }

    // 报警流量 设备统计计算
    alarmTrafficDevice(res: any, resourceType: string, type: string) {
        let resourceTypeStr = resourceType ? resourceType : AlarmObjectType.ALL.value;
        let deviceObj: any = { ALL: [] };
        let areaObj: any = {};

        let deviceArr = [] as Array<any>
        res.data.forEach((item: any) => {
            if (deviceArr.filter((item2: any) => item.deviceID == item2.deviceID).length === 0) {
                let item3 = _.cloneDeep(item);
                item3.flow = 0;
                item3.alarm = 0;
                deviceArr.push(item3);
            }
        })

        deviceArr.forEach((device: any) => {
            res.data.forEach((item: any) => {
                if (device.deviceID == item.deviceID) {
                    device.alarm += item.alarm;
                    device.flow += item.flow;
                }
            })
        })

        // 得到总数前10的报警
        let allDeviceAlarmNum: Array<AlarmResultEnum> = deviceArr.sort(function (a: any, b: any) {
            return b[type] - a[type]
        });
        allDeviceAlarmNum.forEach((item: AlarmResultEnum) => {
            if (deviceObj.ALL.length > 10) {
                return
            }
            if (deviceObj.ALL.length < 10 && item.deviceName) {
                deviceObj.ALL.push(item)
            }
        });

        deviceArr.forEach((item: any) => {
            // 根据设备分开设备报警结果
            if (item.objectType && !deviceObj[item.objectType] && resourceTypeStr == item.objectType) {
                deviceObj[item.objectType] = [];
            }
            // 根据地区分开报警结果
            if (item.areaName && !areaObj[item.areaName]) {
                areaObj[item.areaName] = [];
            }
            if (!!item.deviceName && !!item[type] && item.objectType != "ALL") {
                if (resourceTypeStr == item.objectType) {
                    deviceObj[item.objectType].push(item);
                }

                areaObj[item.areaName].push(item);
            }
        });

        // 得到前10
        // let dropListMenu: Array<dropEnum> = this.SortAndGetTop10(deviceObj, type);
        let dropListAreaMenu: Array<dropEnum> = this.SortAndGetTop10(areaObj, type);

        deviceObj = this.changeTheChartData(deviceObj, type);
        areaObj = this.changeTheChartData(areaObj, type);
        // deviceObj.dropListMenu = dropListMenu;
        areaObj.dropListMenu = _.cloneDeep(dropListAreaMenu);

        return {
            deviceObj: deviceObj,
            areaObj: areaObj
        };
    }

    private changeTheChartData(Obj: any, type: string) {
        // 转换为图表格式
        Object.keys(Obj).forEach((key: string) => {
            let chartNeedConstruct: any = {
                yData: [],
                seriesData: []
            };
            Obj[key].forEach((item: any) => {
                chartNeedConstruct.yData.push(item.deviceName);
                chartNeedConstruct.seriesData.push(item[type]);
            });
            Obj[key] = chartNeedConstruct
        });
        return Obj
    }

    private SortAndGetTop10(Obj: any, type: string) {
        // 给报警结果排序并只取前10个报警结果
        let dropListMenu = [] as Array<dropEnum>;
        Object.keys(Obj).forEach((key: string, index: number) => {
            if (key) {
                Obj[key] = Obj[key].sort(function (a: any, b: any) {
                    return b[type] - a[type]
                });
                Obj[key] = Obj[key].slice(0, 10);
                // 生成设备下拉菜单数据
                let dropData = {} as dropEnum;
                let alarmObjectType: any = AlarmObjectType;

                if (alarmObjectType[key]) {
                    dropData.text = alarmObjectType[key].text;
                    dropData.value = alarmObjectType[key].value;
                } else {
                    dropData.text = key;
                    dropData.value = `area${index + 1}`;
                }
                dropListMenu.push(dropData);
            }
        });
        return dropListMenu
    }

    // 报警流量统计趋势请求结果计算
    /**
     * 
     * @param param 请求参数
     * @param areaInfo 地区name+id
     * @param res 请求resourceItem返回的结果
     * @param deviceDrop 设备下拉菜单填充数据
     */
    private alarmTrafficResult(param: ResourceParams, res: any, type: string): any {
        let that: any = this;

        let AreaIDTypeUniq: any = this.getAlarmTrendDropList(res);
        let areasDrop: Array<dropEnum> = AreaIDTypeUniq[0];
        let deviceDrop: Array<dropEnum> = AreaIDTypeUniq[1];

        let alarmStatisticsTrend: any = {
            seriesData: [],
            xData: ResourceTools.getGroudByTime(param.timeType),
            areaDropMenu: areasDrop,
            deviceDropMenu: deviceDrop
        };

        let newData: Array<alarmTrafficTrendData> = _.cloneDeep(res.data);
        // 按地区找数据
        areasDrop.forEach((info: dropEnum, idx: number) => {
            alarmStatisticsTrend.seriesData[idx] = [];
            // 遍历用户选中的时间
            alarmStatisticsTrend.xData.forEach((time: string, index: number) => {
                alarmStatisticsTrend.seriesData[idx][index] = 0;
                newData.forEach((item: any) => {
                    if (ResourceTools.FormatTimeByType(param.timeType, item.timeItem) == time && info.value == item.areaID) {
                        alarmStatisticsTrend.seriesData[idx][index] += item[type]
                    }
                })
            });
        });

        return Promise.resolve(alarmStatisticsTrend)
    }

    // 流量统计趋势
    trafficStatisticsModule(params: ResourceParams) {
        let param: any = alarmTrafficReqParams;
        param.beginDate = params.beginDate;
        param.endDate = params.endDate;
        param.resourceType = params.resourceType;
        param.timeType = params.timeType || "Month";

        return BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).getResourceNumByArea(param).then((res: any) => {
            if (res && res.data) {

                return this.alarmTrafficResult(param, res, "flow").then((data: any) => {
                    let result = new ResponseResult();
                    result.code = 200;
                    result.data = data
                    return result
                });
            }
        })
    }

    // 报警统计趋势
    alarmStatisticsModule(params: ResourceParams) {
        let param: any = alarmTrafficReqParams;
        param.beginDate = params.beginDate;
        param.endDate = params.endDate;
        param.resourceType = params.resourceType;
        param.timeType = params.timeType || "Month";

        return BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).getResourceNumByArea(param).then((res: any) => {
            if (res && res.data) {

                return this.alarmTrafficResult(param, res, "alarm").then((data: any) => {
                    let result = new ResponseResult();
                    result.code = 200;
                    result.data = data
                    return result
                });
            }
        })
    }

    // 布控库关联报警统计
    dispatchedAboutAlarm(params: ResourceParams) {
        return BeanHelper.getDao<OperationsDao>(DaoType.OperationsDao).dispatchedAboutAlarm(params).then((res: ResponseResult<Array<dispatchedResult>>) => {
            let results: any = {
                seriesData: [],
                yData: [],
                legendData: []
            };

            res.data.forEach((item: any) => {
                if (results.yData.indexOf(item.name) == "-1") {
                    results.yData.push(item.name);
                }
            });

            Object.keys(AlarmStatusType).forEach((value) => {
                let cate = [] as Array<any>;
                results.yData.forEach((data: any, index: number) => {
                    if (results.legendData.indexOf(AlarmStatusType[value].text) == "-1") {
                        results.legendData.push(AlarmStatusType[value].text);
                    }
                    res.data.forEach((item: any) => {
                        if (value == item.Status && data == item.name) {
                            cate[index] = item.Count
                        } else {
                            if (!cate[index]) {
                                cate[index] = 0
                            }
                        }
                    });
                });
                results.seriesData.push(cate)
            });

            let result = new ResponseResult();
            result.code = 200;
            result.data = results;
            return result;
        });
    }

    // 检索统计 高频检索关键字排行
    highFrequencyRetrieval(params: ResourceParams) {
        return BeanHelper.getDao<OperationsDao>(DaoType.OperationsDao).dispatchedAboutAlarm(params)
    }

    //报警趋势统计得到类型和地区下拉菜单
    private getAlarmTrendDropList(res: BackResponseBody<Array<AlarmResultEnum>>) {
        let types: Array<string> = [];
        let deviceDrop: Array<dropEnum> = [{ text: '全部', value: 'ALL', isSelected: true } as dropEnum];
        let areasDrop: Array<dropEnum> = [];
        let diffAreas: Array<AlarmResultEnum> = [];
        let AlarmObjectType: any = this.AlarmObjectType
        res.data.forEach((item: AlarmResultEnum) => {
            if (!diffAreas.filter((area: AlarmResultEnum) => area.areaID == item.areaID).length && item.areaID && item.areaName) {
                diffAreas.push(item);
            }
            if (types.indexOf(item.objectType) === -1) {
                types.push(item.objectType)
            }
        });

        // 获取类型下拉菜单
        types.forEach((type: string) => {
            let dropM = {} as dropEnum;
            dropM.text = AlarmObjectType[type].text;
            dropM.value = type;
            deviceDrop.push(dropM);
        });

        // 获取地区下拉菜单
        diffAreas.forEach((item: AlarmResultEnum) => {
            let areaInfo = {} as dropEnum;
            areaInfo.text = item.areaName;
            areaInfo.value = item.areaID;
            areaInfo.color = areaDropList[areasDrop.length].color
            areasDrop.push(areaInfo);
        })

        return [areasDrop, deviceDrop]
    }

    //排序并计算设备报警前10项
    private deviceSort(allData: Array<AlarmResultEnum>, deviceObj: any, types: Array<string>, module: string) {
        let deviceSortObj = {} as { [key: string]: any };
        types.forEach((type: string) => {
            if (!deviceObj || !deviceObj[type]) {
                deviceObj[type] = []
            }
            deviceSortObj[type] = this.sortTheArrByModule(deviceObj[type], module).slice(0, 10);
        });
        // 全部设备前10
        deviceSortObj.ALL = this.sortTheArrByModule(allData, module).slice(0, 10);
        return deviceSortObj
    }

    //按module排序
    private sortTheArrByModule(Arr: Array<{ [key: string]: any & AlarmResultEnum }>, module: string) {
        Arr = Arr.sort((a: { [key: string]: any & AlarmResultEnum }, b: { [key: string]: any & AlarmResultEnum }) => {
            let n1 = a[module] as number;
            let n2 = b[module] as number;
            if (a && b && typeof n1 == 'number' && typeof n2 == 'number') {
                return b[module] - a[module]
            }
        });
        return Arr
    }

}