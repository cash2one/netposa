import * as moment from "moment";
import { DateType } from "../core/server/enum/DataType";

import { OperThirdModule } from "../core/entity/OperThirdModule";
import {
    IAlarmStatistics,
    IAllRankList, IAreaOtherAlarmStatistics, IAreaTotalCollection, IAreaTotalCollectionSeries,
    IMapResource, IResourcebRetrievalTrend, IResourceChart,
    IResourceStatisticalTotal, IStatistics, ITypeStatistics, ResourceType
} from "../core/params/ResourceCharts";
import { RedisClient } from "./Redis";
import { RedisKeys } from "../model/RedisKeys";
import { BackResponseBody } from "../core/params/result/ResponseResult";
import { BeanHelper } from "../common/help/BeanHelper";
import ResourceDao from "../dao/ResourceDao";
import { DaoType } from "../dao/enum/DaoType";
import { CreateResourceParams, ResourceTools, Params } from "./ResourceTools";
import * as log4js from "log4js";
import * as util from "util";
import * as _ from 'lodash';
import { ResourcePageType, ResourcePageTypeEx } from "../core/entity/Resource";
import { reset } from "colors";
import { intelligentAnalysisData, intelligentAnalysisRequireParams, topSearchResult } from "../core/entity/maintainEnum";

export interface IOperationsServerExt {
    requestMonthAll(Params: intelligentAnalysisRequireParams, moduleName: string): any;
}

export class OperationsServerExt implements IOperationsServerExt {
    static LOGGER = log4js.getLogger('ResourceServerExt');
    ResourceAllType = ResourcePageType.ALL.value;

    requestMonthAll(Params: intelligentAnalysisRequireParams, moduleName: string) {
        let timeType = Params.timeType;
        let dayTimeLine: Array<string> = ResourceTools.createDayTimeLine();
        let weekTimeLine: Array<string> = ResourceTools.createWeekTimeLine();
        let monthTimeLine: Array<string> = ResourceTools.createMonthTimeLine();
        let yearTimeLine: Array<string> = ResourceTools.createYearTimeLine();
        let params: Params, dataList: Array<string>, redisKey: string;
        switch (timeType) {
            case DateType.ALL:
            case DateType.Month:
                params = CreateResourceParams.MonthAllParams;
                dataList = monthTimeLine;
                redisKey = RedisKeys.ResourceMonthAllResult;
                break;
            case DateType.Day:
                params = CreateResourceParams.DayAllParams;
                dataList = dayTimeLine;
                redisKey = RedisKeys.ResourceDayAllResult;
                break;
            case DateType.Week:
                params = CreateResourceParams.WeekAllParams;
                dataList = weekTimeLine;
                redisKey = RedisKeys.ResourceWeekAllResult;
                break;
            case DateType.Year:
                params = CreateResourceParams.YearAllParams;
                dataList = yearTimeLine;
                redisKey = RedisKeys.ResourceYearAllResult;
                break;
        }

        params.ALLSearchCountParams.resourceType = this.ResourceAllType;
        params.AllTypeParams.resourceType = this.ResourceAllType;
        params.ALLSearchCountParams2.resourceType = this.ResourceAllType;

        let requireFun: any;
        switch (moduleName) {
            case intelligentAnalysisData.areaAlarmTrend: {
                requireFun = BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).getResourceNumByArea(_.cloneDeep(params.AllTypeParams));
                break;
            }
            case intelligentAnalysisData.Maintain_StatisOverview_Retrival_Trend: {
                requireFun = BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).searchOperCountByModule(_.cloneDeep(params.ALLSearchCountParams2))
                break;
            }
            case intelligentAnalysisData.AllRankList: {
                let param: any = Params.timeType == DateType.Year ? Params : params.AllTypeParams
                param.topNum = 10
                requireFun = BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).topSearch(_.cloneDeep(param))
                break;
            }
        }

        return requireFun.then((res: Array<any>) => {
            return this.FormatAll(res, moduleName, timeType, dataList);
        })
    }

    private async FormatAll(res: Array<BackResponseBody<Array<any>>> | any, moduleName: string, timeType: string, dataList: Array<string>) {
        console.log(res)
        if (res.data) {
            switch (moduleName) {
                case intelligentAnalysisData.areaAlarmTrend: {
                    return this.AlarmStatisticsTrend(_.cloneDeep(res.data), timeType, dataList);
                }
                case intelligentAnalysisData.Maintain_StatisOverview_Retrival_Trend: {
                    return this.ResourcebRetrievalTrend(_.cloneDeep(res.data), timeType, dataList)
                }
                case intelligentAnalysisData.AllRankList: {
                    return this.AllRankList(_.cloneDeep(res.data), timeType, dataList)
                }
            }
        } else {
            return
        }
    }

    private async AlarmStatisticsTrend(res: Array<any>, timeType: string, dateList: Array<string>) {
        let AlarmStatistics = new IAlarmStatistics();
        let wifiListForDate = [] as Array<number>;
        let electronicfenceListForDate = [] as Array<number>;
        let rmpgateListForDate = [] as Array<number>;
        let cameraListForDate = [] as Array<number>;
        let playDate = [] as Array<IAreaTotalCollectionSeries>;
        res.forEach((item: any) => {
            item.dateTime = item.timeItem;
            switch (timeType) {
                case DateType.ALL:
                case DateType.Month:
                    item.timeItem = moment(item.timeItem).format('DD') + '日';
                    break;
                case DateType.Day:
                    item.timeItem = moment(item.timeItem).format('hh') + ':00';
                    break;
                case DateType.Week:
                    item.timeItem = moment(item.timeItem).format('DD') + '日';
                    break;
                case DateType.Year:
                    item.timeItem = moment(item.timeItem).format('MM') + '月';
                    break;
            }
        });
        dateList.forEach((date: string, index) => {
            let isNoCamera = true, isNoWifi = true, isNoRmpGate = true, isNoElefence = true;
            playDate.push({ wifi: [], camera: [], electronicfence: [], rmpgate: [] } as IAreaTotalCollectionSeries);
            res.forEach((item: any) => {
                if (item.timeItem === date) {
                    if (item.objectType === ResourceType.wifi.key) {
                        isNoWifi = false;
                        if (typeof wifiListForDate[index] === 'number') {
                            wifiListForDate[index] += Number(item.alarm);
                        } else {
                            wifiListForDate[index] = Number(item.alarm);
                        }
                    }
                    if (item.objectType === ResourceType.electronicfence.key) {
                        isNoElefence = false;
                        if (typeof electronicfenceListForDate[index] === 'number') {
                            electronicfenceListForDate[index] += Number(item.alarm);
                        } else {
                            electronicfenceListForDate[index] = Number(item.alarm);
                        }
                    }
                    if (item.objectType === ResourceType.rmpgate.key) {
                        isNoRmpGate = false;
                        if (typeof rmpgateListForDate[index] === 'number') {
                            rmpgateListForDate[index] += Number(item.alarm);
                        } else {
                            rmpgateListForDate[index] = Number(item.alarm);
                        }
                    }
                    if (item.objectType === ResourceType.camera.key) {
                        isNoCamera = false;
                        if (typeof cameraListForDate[index] === 'number') {
                            cameraListForDate[index] += Number(item.alarm);
                        } else {
                            cameraListForDate[index] = Number(item.alarm);
                        }
                    }

                }
            });
            if (isNoCamera) {
                cameraListForDate[index] = 0
            }
            if (isNoElefence) {
                electronicfenceListForDate[index] = 0
            }
            if (isNoWifi) {
                wifiListForDate[index] = 0
            }
            if (isNoRmpGate) {
                rmpgateListForDate[index] = 0
            }
        });
        dateList.forEach((date: string, index: number) => {
            playDate[index].wifi[0] = wifiListForDate[index];
            playDate[index].electronicfence[0] = electronicfenceListForDate[index];
            playDate[index].rmpgate[0] = rmpgateListForDate[index];
            playDate[index].camera[0] = cameraListForDate[index];
        });
        AlarmStatistics.dateList = dateList;
        AlarmStatistics.legendData = dateList;
        AlarmStatistics.playData = playDate;
        AlarmStatistics.series.wifi = wifiListForDate;
        AlarmStatistics.series.electronicfence = electronicfenceListForDate;
        AlarmStatistics.series.rmpgate = rmpgateListForDate;
        AlarmStatistics.series.camera = cameraListForDate;
        return AlarmStatistics;
    }

    private async ResourcebRetrievalTrend(res: Array<any>, timeType: string, dateList: Array<string>) {
        let LegendData = [] as Array<string>;
        let ResourcebRetrievalTrend = new IResourcebRetrievalTrend();
        let Wifi = [] as Array<number>;
        let Electronicfence = [] as Array<number>;
        let Rmpgate = [] as Array<number>;
        let Camera = [] as Array<number>;
        let playDate = [] as Array<IAreaTotalCollectionSeries>;
        let modelMap = {} as { [key: string]: { code: string, name: string } };
        ResourceTools.AllModelListTwo.forEach((item: { code: string, name: string }) => {
            modelMap[item.code] = item;
            if (LegendData.indexOf(item.code) === -1) {
                LegendData.push(item.code)
            }
        });
        res.forEach((item: any) => {
            item.dateTime = item.timeItem;
            switch (timeType) {
                case DateType.ALL:
                case DateType.Month:
                    item.timeItem = moment(item.timeItem).format('DD') + '日';
                    break;
                case DateType.Day:
                    item.timeItem = moment(item.timeItem).format('hh') + ':00';
                    break;
                case DateType.Week:
                    item.timeItem = moment(item.timeItem).format('DD') + '日';
                    break;
                case DateType.Year:
                    item.timeItem = moment(item.timeItem).format('MM') + '月';
                    break;
            }
        });
        dateList.forEach((date: any, index: number) => {
            let isNoCamera = true, isNoWifi = true, isNoRmpGate = true, isNoElefence = true;
            playDate.push({ rmpgate: [], camera: [], wifi: [], electronicfence: [] } as IAreaTotalCollectionSeries);
            res.forEach((item: any) => {
                if (item.timeItem === date) {
                    if (item.functionType === OperThirdModule.ResourceRetrieval_AdvanceSearch_WiFi.code) {
                        isNoWifi = false;
                        if (typeof Wifi[index] === 'number') {
                            Wifi[index] += Number(item.num);

                        } else {
                            Wifi[index] = Number(item.num);
                        }
                    }
                    if (item.functionType === OperThirdModule.ResourceRetrieval_AdvanceSearch_EFence.code) {
                        isNoElefence = false;
                        if (typeof Electronicfence[index] === 'number') {
                            Electronicfence[index] += Number(item.num);
                        } else {
                            Electronicfence[index] = Number(item.num);
                        }
                    }
                    if (item.functionType === OperThirdModule.ResourceRetrieval_AdvanceSearch_Vehicle.code) {
                        isNoRmpGate = false;
                        if (typeof Rmpgate[index] === 'number') {
                            Rmpgate[index] += Number(item.num);
                        } else {
                            Rmpgate[index] = Number(item.num);
                        }
                    }
                    if (item.functionType === OperThirdModule.ResourceRetrieval_AdvanceSearch_Face.code) {
                        isNoCamera = false;
                        if (typeof Camera[index] === 'number') {
                            Camera[index] += Number(item.num);
                        } else {
                            Camera[index] = Number(item.num);
                        }
                    }
                }
            });
            if (isNoCamera) {
                Camera[index] = 0
            }
            if (isNoElefence) {
                Electronicfence[index] = 0
            }
            if (isNoWifi) {
                Wifi[index] = 0
            }
            if (isNoRmpGate) {
                Rmpgate[index] = 0
            }
        });

        dateList.forEach((date: string, index: number) => {
            playDate[index].wifi[0] = Wifi[index];
            playDate[index].electronicfence[0] = Electronicfence[index];
            playDate[index].rmpgate[0] = Rmpgate[index];
            playDate[index].camera[0] = Camera[index];
        });
        ResourcebRetrievalTrend.legendData = LegendData.map((type: string) => {
            return modelMap[type].name
        });
        ResourcebRetrievalTrend.dateList = dateList;
        ResourcebRetrievalTrend.playData = playDate;
        ResourcebRetrievalTrend.series.wifi = Wifi;
        ResourcebRetrievalTrend.series.electronicfence = Electronicfence;
        ResourcebRetrievalTrend.series.rmpgate = Rmpgate;
        ResourcebRetrievalTrend.series.camera = Camera;
        return ResourcebRetrievalTrend;
    }

    private async AllRankList(res: Array<topSearchResult>, timeType: string, dateList: Array<string>) {
        console.log(res);
        let arr: Array<string> = [
            ResourcePageType.Face.value,
            ResourcePageType.EFENCE.value,
            ResourcePageType.Vehicle.value,
            ResourcePageType.WiFi.value,
            ResourcePageTypeEx.Device.value,
            ResourcePageTypeEx.Position.value
        ];
        let result: { [key: string]: Array<topSearchResult> } = {}
        let echartData: { [key: string]: Array<{ name: string, value: number }> } = {}

        // 按设备类型分类
        arr.forEach((keyword: string) => {
            result[keyword] = [];
            res.forEach((item: topSearchResult) => {
                if (item.objectType == keyword) {
                    result[keyword].push(item)
                }
            })
        })

        // 按类型数据排名
        arr.forEach((keyword: string) => {
            if (result[keyword]) {
                echartData[keyword] = this.RankSingDevice(result[keyword], timeType);
            }
        })

        echartData.Device = echartData.Position = this.RankSingDevice(res, timeType);

        return echartData
    }

    // 计算单个设备排名
    private RankSingDevice(res: Array<topSearchResult>, timeType: string) {
        let AllRankList = {} as Array<{ name: string, value: number }>;
        let series = [] as Array<{ name: string, value: number }>;
        res.forEach((item: any) => {
            item.dateTime = item.timeItem;
            switch (timeType) {
                case DateType.ALL:
                case DateType.Month:
                    item.timeItem = moment(new Date(item.timeItem)).format('DD') + '日';
                    break;
                case DateType.Day:
                    item.timeItem = moment(new Date(item.timeItem)).format('hh') + ':00';
                    break;
                case DateType.Week:
                    item.timeItem = moment(new Date(item.timeItem)).format('DD') + '日';
                    break;
                case DateType.Year:
                    item.timeItem = moment(new Date(item.timeItem)).format('MM') + '月';
                    break;
            }
            let name = item.statisticsItem;
            let s = series.filter((item2) => item2.name == name)
            if (s.length === 0) {
                series.push({ name: name, value: 0 })
            }
        });

        series.forEach((item: { name: string, value: number }) => {
            res.forEach((item2: any) => {
                if (item.name === item2.statisticsItem) {
                    item.value += Number(item2.num)
                }
            });
        })

        AllRankList = _.cloneDeep(series);

        AllRankList.sort((a: { name: string, value: number }, b: { name: string, value: number }) => {
            return (b.value - a.value);
        });

        return AllRankList.slice(0, 5)
    }
}

