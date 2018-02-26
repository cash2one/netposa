import * as moment from "../../node_modules/moment/moment";
import { DateType } from "../core/server/enum/DataType";

import { OperThirdModule } from "../core/entity/OperThirdModule";
import {
    IAlarmStatistics,
    IAllRankList, IAreaOtherAlarmStatistics, IAreaTotalCollection, IAreaTotalCollectionSeries,
    IElectronicfenceResourceChart,
    IMapResource, IPersonResourceChart, IResourcebRetrievalTrend, IResourceChart,
    IResourceStatisticalTotal, IStatistics, ITypeStatistics, IWifiResourceChart, ResourceType
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
import { ResourcePageType } from "../core/entity/Resource";




export interface IResourceServerExt {
    requestAllResource(timeType: string): void;

    requestFaceResource(timeType: string): void;

    requestWifiResource(timeType: string): void;

    requestEfenceResource(timeType: string): void;

    requestCarResource(timeType: string): void;
}

export class ResourceServerExt implements IResourceServerExt {
    static LOGGER = log4js.getLogger('ResourceServerExt');
    ResourceAllType = ResourcePageType.ALL.value;
    ResourceFaceType = ResourcePageType.Face.value;
    ResourceWifiType = ResourcePageType.WiFi.value;
    ResourceEfenceType = ResourcePageType.EFENCE.value;
    ResourceCarType = ResourcePageType.Vehicle.value;

    requestAllResource(timeType: string) {
        let nowTimeLine: Array<string> = ResourceTools.createNowTimeLine();
        let dayTimeLine: Array<string> = ResourceTools.createDayTimeLine();
        let weekTimeLine: Array<string> = ResourceTools.createWeekTimeLine();
        let monthTimeLine: Array<string> = ResourceTools.createMonthTimeLine();
        let yearTimeLine: Array<string> = ResourceTools.createYearTimeLine();
        let params: Params, dataList: Array<string>, redisKey: string;
        switch (timeType) {
            case DateType.ALL:
                params = CreateResourceParams.NowAllParams;
                dataList = nowTimeLine;
                redisKey = RedisKeys.ResourceNowAllResult;
                break;
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

        Promise.all([
            ResourceTools.catchPromiseReset(BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).getResourceNumByArea(_.cloneDeep(params.AllTypeParams))),
            ResourceTools.catchPromiseReset(BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).searchOperCountByModule(_.cloneDeep(params.ALLSearchCountParams2))),
            ResourceTools.catchPromiseReset(BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).searchOperCountByModule(_.cloneDeep(params.ALLSearchCountParams))),
            ResourceTools.catchPromiseReset(BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).topSearch(_.cloneDeep(params.AllTypeParams))),
            ResourceTools.catchPromiseReset(BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).getAlarmDeviceNum(_.cloneDeep(params.AllTypeParams)))
        ]).then((res: Array<any>) => {
            return this.FormatAll(res, redisKey, timeType, dataList)
        })
    }

    requestFaceResource(timeType: string) {
        let nowTimeLine: Array<string> = ResourceTools.createNowTimeLine();
        let dayTimeLine: Array<string> = ResourceTools.createDayTimeLine();
        let weekTimeLine: Array<string> = ResourceTools.createWeekTimeLine();
        let monthTimeLine: Array<string> = ResourceTools.createMonthTimeLine();
        let yearTimeLine: Array<string> = ResourceTools.createYearTimeLine();
        let params: Params, dataList: Array<string>, redisKey: string;
        switch (timeType) {
            case DateType.ALL:
                params = CreateResourceParams.NowFaceParams;
                dataList = nowTimeLine;
                redisKey = RedisKeys.ResourceNowFaceResult;
                break;
            case DateType.Month:
                params = CreateResourceParams.MonthFaceParams;
                dataList = monthTimeLine;
                redisKey = RedisKeys.ResourceMonthFaceResult;
                break;
            case DateType.Day:
                params = CreateResourceParams.DayFaceParams;
                dataList = dayTimeLine;
                redisKey = RedisKeys.ResourceDayFaceResult;
                break;
            case DateType.Week:
                params = CreateResourceParams.WeekFaceParams;
                dataList = weekTimeLine;
                redisKey = RedisKeys.ResourceWeekFaceResult;
                break;
            case DateType.Year:
                params = CreateResourceParams.YearFaceParams;
                dataList = yearTimeLine;
                redisKey = RedisKeys.ResourceYearFaceResult;
                break;
        }
        params.ALLSearchCountParams.resourceType = this.ResourceFaceType;
        params.AllTypeParams.resourceType = this.ResourceFaceType;
        params.ALLSearchCountParams2.resourceType = this.ResourceFaceType;
        Promise.all([
            ResourceTools.catchPromiseReset(BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).getResourceNumByArea(_.cloneDeep(params.AllTypeParams))),
            ResourceTools.catchPromiseReset(BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).searchOperCountByModule(params.ALLSearchCountParams)),
            ResourceTools.catchPromiseReset(BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).searchOperCountByModule(params.ALLSearchCountParams2)),
            ResourceTools.catchPromiseReset(BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).topSearch(_.cloneDeep(params.AllTypeParams))),
            ResourceTools.catchPromiseReset(BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).getAlarmDeviceNum(_.cloneDeep(params.AllTypeParams)))
        ]).then((res: Array<any>) => {
            return this.FormatFace(res, redisKey, timeType, dataList)
        })
    }

    requestWifiResource(timeType: string) {
        let nowTimeLine: Array<string> = ResourceTools.createNowTimeLine();
        let dayTimeLine: Array<string> = ResourceTools.createDayTimeLine();
        let weekTimeLine: Array<string> = ResourceTools.createWeekTimeLine();
        let monthTimeLine: Array<string> = ResourceTools.createMonthTimeLine();
        let yearTimeLine: Array<string> = ResourceTools.createYearTimeLine();
        let params: Params, dataList: Array<string>, redisKey: string;
        switch (timeType) {
            case DateType.ALL:
                params = CreateResourceParams.NowWifiParams;
                dataList = nowTimeLine;
                redisKey = RedisKeys.ResourceNowWifiResult;
                break;
            case DateType.Month:
                params = CreateResourceParams.MonthWifiParams;
                dataList = monthTimeLine;
                redisKey = RedisKeys.ResourceMonthWifiResult;
                break;
            case DateType.Day:
                params = CreateResourceParams.DayWifiParams;
                dataList = dayTimeLine;
                redisKey = RedisKeys.ResourceDayWifiResult;
                break;
            case DateType.Week:
                params = CreateResourceParams.WeekWifiParams;
                dataList = weekTimeLine;
                redisKey = RedisKeys.ResourceWeekWifiResult;
                break;
            case DateType.Year:
                params = CreateResourceParams.YearWifiParams;
                dataList = yearTimeLine;
                redisKey = RedisKeys.ResourceYearWifiResult;
                break;
        }
        params.ALLSearchCountParams.resourceType = this.ResourceWifiType;
        params.AllTypeParams.resourceType = this.ResourceWifiType;
        params.ALLSearchCountParams2.resourceType = this.ResourceWifiType;
        Promise.all([
            ResourceTools.catchPromiseReset(BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).getResourceNumByArea(_.cloneDeep(params.AllTypeParams))),
            ResourceTools.catchPromiseReset(BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).searchOperCountByModule(params.ALLSearchCountParams2)),
            ResourceTools.catchPromiseReset(BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).getAlarmDeviceNum(params.AllTypeParams)),
            ResourceTools.catchPromiseReset(BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).topSearch(_.cloneDeep(params.AllTypeParams)))
        ]).then((res: Array<any>) => {
            return this.FormatWifi(res, redisKey, timeType, dataList)
        })
    }

    requestEfenceResource(timeType: string) {
        let nowTimeLine: Array<string> = ResourceTools.createNowTimeLine();
        let dayTimeLine: Array<string> = ResourceTools.createDayTimeLine();
        let weekTimeLine: Array<string> = ResourceTools.createWeekTimeLine();
        let monthTimeLine: Array<string> = ResourceTools.createMonthTimeLine();
        let yearTimeLine: Array<string> = ResourceTools.createYearTimeLine();
        let params: Params, dataList: Array<string>, redisKey: string;
        switch (timeType) {
            case DateType.ALL:
                params = CreateResourceParams.NowEfenceParams;
                dataList = nowTimeLine;
                redisKey = RedisKeys.ResourceNowEfenceResult;
                break;
            case DateType.Month:
                params = CreateResourceParams.MonthEfenceParams;
                dataList = monthTimeLine;
                redisKey = RedisKeys.ResourceMonthEfenceResult;
                break;
            case DateType.Day:
                params = CreateResourceParams.DayEfenceParams;
                dataList = dayTimeLine;
                redisKey = RedisKeys.ResourceDayEfenceResult;
                break;
            case DateType.Week:
                params = CreateResourceParams.WeekEfenceParams;
                dataList = weekTimeLine;
                redisKey = RedisKeys.ResourceWeekEfenceResult;
                break;
            case DateType.Year:
                params = CreateResourceParams.YearEfenceParams;
                dataList = yearTimeLine;
                redisKey = RedisKeys.ResourceYearEfenceResult;
                break;
        }
        params.ALLSearchCountParams.resourceType = this.ResourceEfenceType;
        params.AllTypeParams.resourceType = this.ResourceEfenceType;
        params.ALLSearchCountParams2.resourceType = this.ResourceEfenceType;
        Promise.all([
            ResourceTools.catchPromiseReset(BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).getResourceNumByArea(_.cloneDeep(params.AllTypeParams))),
            ResourceTools.catchPromiseReset(BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).searchOperCountByModule(params.ALLSearchCountParams2)),
            ResourceTools.catchPromiseReset(BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).getAlarmDeviceNum(params.AllTypeParams)),
            ResourceTools.catchPromiseReset(BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).topSearch(_.cloneDeep(params.AllTypeParams)))
        ]).then((res: Array<any>) => {
            return this.FormatElectronicfence(res, redisKey, timeType, dataList)
        })
    }

    requestCarResource(timeType: string) {
        let nowTimeLine: Array<string> = ResourceTools.createNowTimeLine()
        let dayTimeLine: Array<string> = ResourceTools.createDayTimeLine();
        let weekTimeLine: Array<string> = ResourceTools.createWeekTimeLine();
        let monthTimeLine: Array<string> = ResourceTools.createMonthTimeLine();
        let yearTimeLine: Array<string> = ResourceTools.createYearTimeLine();
        let params: Params, dataList: Array<string>, redisKey: string;
        switch (timeType) {
            case DateType.ALL:
                params = CreateResourceParams.NowCarParams;
                dataList = nowTimeLine;
                redisKey = RedisKeys.ResourceNowCarResult;
                break;
            case DateType.Month:
                params = CreateResourceParams.MonthCarParams;
                dataList = monthTimeLine;
                redisKey = RedisKeys.ResourceMonthCarResult;
                break;
            case DateType.Day:
                params = CreateResourceParams.DayCarParams;
                dataList = dayTimeLine;
                redisKey = RedisKeys.ResourceDayCarResult;
                break;
            case DateType.Week:
                params = CreateResourceParams.WeekCarParams;
                dataList = weekTimeLine;
                redisKey = RedisKeys.ResourceWeekCarResult;
                break;
            case DateType.Year:
                params = CreateResourceParams.YearCarParams;
                dataList = yearTimeLine;
                redisKey = RedisKeys.ResourceYearCarResult;
                break;
        }
        //params.ALLSearchCountParams.resourceType = this.ResourceCarType;
        params.AllTypeParams.resourceType = this.ResourceCarType;
        //params.ALLSearchCountParams2.resourceType = this.ResourceCarType;
        Promise.all([
            ResourceTools.catchPromiseReset(BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).getResourceNumByArea(_.cloneDeep(params.AllTypeParams))),
            ResourceTools.catchPromiseReset(BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).carCountByColor(params.AllTypeParams)),
            ResourceTools.catchPromiseReset(BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).carCountByType(params.AllTypeParams)),
            // ResourceTools.catchPromiseReset(BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).getAlarmDeviceNum(params.AllTypeParams)),
            ResourceTools.catchPromiseReset(BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).topSearch(_.cloneDeep(params.AllTypeParams)))
        ]).then((res: Array<any>) => {
            return this.FormatCar(res, redisKey, timeType, dataList)
        })
    }

    private async FormatCar(res: Array<BackResponseBody<Array<any>>>, redisKey: string, timeType: string, dataList: Array<string>) {

        return await Promise.all([
            this.FormatChartOtherOne(_.cloneDeep(res[0].data), timeType, dataList),
            this.FormatChartOtherTwo(_.cloneDeep(res[0].data), timeType, dataList),
            this.FormatChartOtherThree(_.cloneDeep(res[0].data), timeType, dataList),
            this.FromatChartCarFour(_.cloneDeep(res[1].data), timeType, dataList),
            this.FromatChartCarFive(_.cloneDeep(res[2].data), timeType, dataList),
            this.FormatChartOtherSix(_.cloneDeep(res[3].data), timeType, dataList),
            this.FormatMap(_.cloneDeep(res[3].data), timeType, dataList)
        ]).then((res: Array<any>) => {
            return Promise.all([
                RedisClient.instance().set(redisKey + '_VehicleStatistics', res[0]),
                RedisClient.instance().set(redisKey + '_AreaVehicleStatistics', res[1]),
                RedisClient.instance().set(redisKey + '_AreaVehicleAlarmStatistics', res[2]),
                RedisClient.instance().set(redisKey + '_VehicleColorStatistics', res[3]),
                RedisClient.instance().set(redisKey + '_VehicleTypeStatistics', res[4]),
                RedisClient.instance().set(redisKey + '_VehicleAllRankList', res[5]),
                RedisClient.instance().set(redisKey + '_IMapResource', res[6])
            ]);
        });

    }

    private async FormatElectronicfence(res: Array<BackResponseBody<any>>, redisKey: string, timeType: string, dataList: Array<string>)/*: IElectronicfenceResourceChart*/ {
        return await Promise.all([
            this.FormatChartOtherOne(_.cloneDeep(res[0].data), timeType, dataList),
            this.FormatChartOtherTwo(_.cloneDeep(res[0].data), timeType, dataList),
            this.FormatChartOtherThree(_.cloneDeep(res[0].data), timeType, dataList),
            this.FormatChartOtherFour(_.cloneDeep(res[1].data), timeType, dataList),
            this.FormatChartWifiFive(_.cloneDeep(res[2].data), timeType, dataList),
            this.FormatChartOtherSix(_.cloneDeep(res[3].data), timeType, dataList),
            this.FormatMap(_.cloneDeep(res[2].data), timeType, dataList)
        ]).then((res: Array<any>) => {
            return Promise.all([
                RedisClient.instance().set(redisKey + '_EFStatistics', res[0]),
                RedisClient.instance().set(redisKey + '_AreaEFStatistics', res[1]),
                RedisClient.instance().set(redisKey + '_AreaEFAlarmStatistics', res[2]),
                RedisClient.instance().set(redisKey + '_EFTypeStatistics', res[3]),
                RedisClient.instance().set(redisKey + '_EFColorStatistics', res[4]),
                RedisClient.instance().set(redisKey + '_EFAllRankList', res[5]),
                RedisClient.instance().set(redisKey + '_IMapResource', res[6])
            ]);
        });
    }

    private async FormatWifi(res: Array<BackResponseBody<any>>, redisKey: string, timeType: string, dataList: Array<string>)/*: IWifiResourceChart*/ {
        return await Promise.all([
            this.FormatChartOtherOne(_.cloneDeep(res[0].data), timeType, dataList),
            this.FormatChartOtherTwo(_.cloneDeep(res[0].data), timeType, dataList),
            this.FormatChartOtherThree(_.cloneDeep(res[0].data), timeType, dataList),
            this.FormatChartOtherFour(_.cloneDeep(res[1].data), timeType, dataList),
            this.FormatChartWifiFive(_.cloneDeep(res[2].data), timeType, dataList),
            this.FormatChartOtherSix(_.cloneDeep(res[3].data), timeType, dataList),
            this.FormatMap(_.cloneDeep(res[0].data), timeType, dataList)
        ]).then((res: Array<any>) => {
            return Promise.all([
                RedisClient.instance().set(redisKey + '_WifiStatistics', res[0]),
                RedisClient.instance().set(redisKey + '_AreaWifiStatistics', res[1]),
                RedisClient.instance().set(redisKey + '_AreaWifiAlarmStatistics', res[2]),
                RedisClient.instance().set(redisKey + '_WifiTypeStatistics', res[3]),
                RedisClient.instance().set(redisKey + '_WifiColorStatistics', res[4]),
                RedisClient.instance().set(redisKey + '_WifiAllRankList', res[5]),
                RedisClient.instance().set(redisKey + '_IMapResource', res[6])
            ]);
        });
    }

    private async FormatFace(res: Array<BackResponseBody<any>>, redisKey: string, timeType: string, dataList: Array<string>)/*: IPersonResourceChart*/ {

        return await Promise.all([
            this.FormatChartOtherOne(_.cloneDeep(res[0].data), timeType, dataList),
            this.FormatChartOtherTwo(_.cloneDeep(res[0].data), timeType, dataList),
            this.FormatChartOtherThree(_.cloneDeep(res[0].data), timeType, dataList),
            this.FormatChartOtherFour(_.cloneDeep(res[1].data), timeType, dataList),
            this.FormatChartFaceFive(_.cloneDeep(res[2].data), timeType, dataList),
            this.FormatChartOtherSix(_.cloneDeep(res[3].data), timeType, dataList),
            this.FormatMap(_.cloneDeep(res[4].data), timeType, dataList)
        ]).then((res: Array<any>) => {
            return Promise.all([
                RedisClient.instance().set(redisKey + '_PersonStatistics', res[0]),
                RedisClient.instance().set(redisKey + '_AreaPersonStatistics', res[1]),
                RedisClient.instance().set(redisKey + '_AreaPersonAlarmStatistics', res[2]),
                RedisClient.instance().set(redisKey + '_PersonTypeStatistics', res[3]),
                RedisClient.instance().set(redisKey + '_PersonColorStatistics', res[4]),
                RedisClient.instance().set(redisKey + '_PersonAllRankList', res[5]),
                RedisClient.instance().set(redisKey + '_IMapResource', res[6])
            ]);
        });
    }

    private async FormatAll(res: Array<BackResponseBody<Array<any>>> | any, redisKey: string, timeType: string, dataList: Array<string>)/*: IResourceChart*/ {
        return await Promise.all([
            this.FormatChartOne(_.cloneDeep(res[0].data), timeType, dataList),
            this.FormatChartTwo(_.cloneDeep(res[0].data), timeType, dataList),
            this.FromatChartThree(_.cloneDeep(res[0].data), timeType, dataList),
            this.FormatChartFour(_.cloneDeep(res[2].data), timeType, dataList),
            this.FormatChartFive(_.cloneDeep(res[1].data), timeType, dataList),
            this.FormatChartSix(_.cloneDeep(res[3].data), timeType, dataList),
            this.FormatMap(_.cloneDeep(res[4].data), timeType, dataList)
        ]).then((res: Array<any>) => {
            return Promise.all([
                RedisClient.instance().set(redisKey + '_ResourceStatisticalTotal', res[0]),
                RedisClient.instance().set(redisKey + '_AreaTotalCollection', res[1]),
                RedisClient.instance().set(redisKey + '_AlarmStatistics', res[2]),
                RedisClient.instance().set(redisKey + '_DataServiceStatistics', res[3]),
                RedisClient.instance().set(redisKey + '_ResourcebRetrievalTrend', res[4]),
                RedisClient.instance().set(redisKey + '_AllRankList', res[5]),
                RedisClient.instance().set(redisKey + '_IMapResource', res[6])
            ]);
        });
    }


    private async FormatChartOtherOne(res: Array<any>, timeType: string, dateList: Array<string>)/*: IStatistics*/ {
        if (!res || (Array.isArray(res) && res.length === 0)) {
            ResourceServerExt.LOGGER.warn(util.format('%s Result is not found', timeType))
            return null
        }
        let PersonStatistics = new IStatistics();
        let flowList = [] as Array<number>;
        let alarmList = [] as Array<number>;
        let playData = [] as Array<{ alarm: Array<number>, flow: Array<number> }>;
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
        dateList.forEach((date: string, index: number) => {
            playData.push({ alarm: [], flow: [] });
            flowList[index] = 0;
            alarmList[index] = 0;
            res.forEach((item: any) => {
                if (item.timeItem === date) {
                    if (typeof flowList[index] === 'number') {
                        flowList[index] += Number(item.flow)
                    } else {
                        flowList[index] = Number(item.flow)
                    }
                    if (typeof alarmList[index] === 'number') {
                        alarmList[index] += Number(item.alarm)
                    } else {
                        alarmList[index] = Number(item.alarm)
                    }
                }
            })
        });
        dateList.forEach((date: string, index: number) => {
            playData[index].alarm[0] = alarmList[index] ? alarmList[index] : 0;
            playData[index].flow[0] = flowList[index] ? flowList[index] : 0;
        });
        PersonStatistics.playData = playData;
        PersonStatistics.legendData = dateList;
        PersonStatistics.series.flow = flowList;
        PersonStatistics.series.alarm = alarmList;
        PersonStatistics.dateList = dateList;

        return PersonStatistics;
    }

    private async FormatChartOtherTwo(res: Array<any>, timeType: string, dateList: Array<string>)/*: IStatistics*/ {
        if (!res || (Array.isArray(res) && res.length === 0)) {
            ResourceServerExt.LOGGER.warn(util.format('%s Result is not found', timeType))
            return null
        }
        let PersonStatistics = new IStatistics();
        let areaList = [] as Array<string>;
        let flowList = [] as Array<number>;
        let alarmList = [] as Array<number>;
        let playData = [] as Array<{ alarm: Array<number>, flow: Array<number> }>;
        res.forEach((item: any) => {
            if (areaList.indexOf(item.areaName) === -1) {
                areaList.push(item.areaName as string);
            }
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
        areaList.forEach((area: string, index: number) => {
            res.forEach((item: any) => {
                if (item.areaName === area) {
                    if (typeof flowList[index] === 'number') {
                        flowList[index] += Number(item.flow)
                    } else {
                        flowList[index] = Number(item.flow)
                    }
                    if (typeof alarmList[index] === 'number') {
                        alarmList[index] += Number(item.alarm)
                    } else {
                        alarmList[index] = Number(item.alarm)
                    }
                }
            })
        });
        dateList.forEach((date: string, index: number) => {
            playData.push({ alarm: [], flow: [] });
            res.forEach((item: any) => {
                if (item.timeItem === date) {
                    areaList.forEach((area: string, i) => {
                        let isHasFlow: boolean = false, isHasAlarm: boolean = false;
                        if (item.areaName === area) {
                            if (typeof playData[index].flow[i] === "number") {
                                playData[index].flow[i] += item.flow;
                                isHasFlow = true;
                            } else {
                                playData[index].flow[i] = item.flow;
                                isHasFlow = true;
                            }
                            if (typeof playData[index].alarm[i] === "number") {
                                playData[index].alarm[i] += item.alarm;
                                isHasAlarm = true;
                            } else {
                                playData[index].alarm[i] = item.alarm;
                                isHasAlarm = true;
                            }
                        }
                        if (!isHasFlow) {
                            playData[index].flow[i] = 0;
                        }
                        if (!isHasAlarm) {
                            playData[index].alarm[i] = 0;
                        }
                    })
                }
            })
        });
        PersonStatistics.dateList = dateList;
        PersonStatistics.playData = playData;
        PersonStatistics.legendData = areaList;
        PersonStatistics.series.flow = flowList;
        PersonStatistics.series.alarm = alarmList;
        return PersonStatistics;
    }

    private async FormatChartOtherThree(res: Array<any>, timeType: string, dateList: Array<string>)/*: IAreaOtherAlarmStatistics*/ {
        if (!res || (Array.isArray(res) && res.length === 0)) {
            ResourceServerExt.LOGGER.warn(util.format('%s Result is not found', timeType))
            return null
        }
        let AreaPersonAlarmStatistics = new IAreaOtherAlarmStatistics();
        let areaList = [] as Array<string>;
        let serise = [] as Array<Array<number>>;
        let playData = [] as Array<Array<Array<number>>>;
        res.forEach((item: any) => {
            if (item.areaName && areaList.indexOf(item.areaName) === -1) {
                areaList.push(item.areaName as string);
            }
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
        areaList.forEach((area: string, index: number) => {
            serise.push([] as Array<number>);
            serise[index].length = dateList.length;
            serise[index].fill(0);
            res.forEach((item: any) => {
                if (item.areaName === area) {
                    dateList.forEach((date: string, i: number) => {
                        if (item.timeItem === date) {
                            if (typeof serise[index][i] === 'number') {
                                serise[index][i] += Number(item.alarm);
                            } else {
                                serise[index][i] = Number(item.alarm);
                            }
                        }

                    })
                }
            })
        });
        dateList.forEach((date: string, index: number) => {
            playData.push([] as Array<Array<number>>);
            areaList.forEach((item: string, i: number) => {
                playData[index].push([] as Array<number>);
                playData[index][i][0] = serise[i][index] ? serise[i][index] : 0;
            })
        });
        AreaPersonAlarmStatistics.playData = playData;
        AreaPersonAlarmStatistics.dateList = dateList;
        AreaPersonAlarmStatistics.legendData = areaList;
        AreaPersonAlarmStatistics.xData = dateList;
        AreaPersonAlarmStatistics.series = serise;
        return AreaPersonAlarmStatistics;
    }

    private async FormatChartOtherFour(res: Array<any>, timeType: string, dateList: Array<string>)/*: ITypeStatistics*/ {
        if (!res || (Array.isArray(res) && res.length === 0)) {
            ResourceServerExt.LOGGER.warn(util.format('%s Result is not found', timeType))
            return null;
        }
        let AreaPersonAlarmStatistics = {} as any;
        let LegendData = [] as Array<string>;
        let playData: Array<any> = [];
        let series: Array<any> = [];
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
            if (LegendData.indexOf(item.functionType) === -1) {
                LegendData.push(item.functionType)
            }
        });
        let modelMap = {} as { [key: string]: { code: string, name: string } };
        ResourceTools.FaceModelListOne.forEach((item: { code: string, name: string }) => {
            modelMap[item.code] = item;
            if (LegendData.indexOf(item.code) === -1) {
                LegendData.push(item.code)
            }
        });
        dateList.forEach((date: string, index: number) => {
            let isHas: boolean = false;
            res.forEach((item: any) => {
                if (date === item.timeItem) {
                    isHas = true;
                    if (typeof series[index] === 'number') {
                        series[index] += Number(item.num);
                    } else {
                        series[index] = Number(item.num);
                    }
                }
            });
            if (!isHas) {
                series[index] = 0
            }
        });

        dateList.forEach((date: string, index: number) => {
            playData.push([]);
            playData[index][0] = series[index] ? series[index] : 0;

        });
        AreaPersonAlarmStatistics.series = series;
        AreaPersonAlarmStatistics.LegendData = LegendData;
        AreaPersonAlarmStatistics.dateList = dateList;
        AreaPersonAlarmStatistics.playData = playData;

        return AreaPersonAlarmStatistics;
    }

    private async FromatChartCarFour(res: Array<any>, timeType: string, dateList: Array<string>) {
        let carTypeList = [] as Array<string>;
        let series = [] as Array<number>;
        let VehicleColorStatistics = {} as any;
        if (res && res.length > 0) {
            res.forEach((item: any, index: number) => {
                if (carTypeList.indexOf(item.nameCHN) === -1) {
                    carTypeList.push(item.nameCHN);
                }
            });
            carTypeList.forEach((item: any, index: number) => {
                res.forEach((item2: any, index2: number) => {
                    if (item2.nameCHN == item) {
                        if (typeof series[index] === 'number') {
                            series[index] += item2.count;
                        } else {
                            series[index] = item2.count;
                        }
                    }
                })
            })
        }
        VehicleColorStatistics.xData = carTypeList;
        VehicleColorStatistics.seriesData = series;

        return VehicleColorStatistics;
    }

    private async FromatChartCarFive(res: Array<any>, timeType: string, dateList: Array<string>) {

        let carTypeList = [] as Array<string>;
        let series = [] as Array<number>;
        let VehicleTypeStatistics = {} as any;
        if (res && res.length > 0) {
            res.forEach((item: any, index: number) => {
                if (carTypeList.indexOf(item.name) === -1) {
                    carTypeList.push(item.name);
                }
            });
            carTypeList.forEach((item: any, index: number) => {
                res.forEach((item2: any, index2: number) => {
                    if (item2.name == item) {
                        if (typeof series[index] === 'number') {
                            series[index] += item2.count;
                        } else {
                            series[index] = item2.count;
                        }
                    }
                })
            })
        }
        VehicleTypeStatistics.xData = carTypeList;
        VehicleTypeStatistics.seriesData = series;

        return VehicleTypeStatistics;
    }

    private async FormatChartFaceFive(res: Array<any>, timeType: string, dateList: Array<string>)/*: ITypeStatistics*/ {
        if (!res || (Array.isArray(res) && res.length === 0)) {
            ResourceServerExt.LOGGER.warn(util.format('%s Result is not found', timeType))
            return null;
        }
        let PersonColorStatistics = new ITypeStatistics();
        let legendData = [] as Array<string>;
        let series = [] as Array<number>;
        let playData = [] as Array<Array<number>>;
        let modelMap = {} as { [key: string]: { code: string, name: string } };
        ResourceTools.FaceModelListTwo.forEach((item: { code: string, name: string }) => {
            modelMap[item.code] = item;
            if (legendData.indexOf(item.code) === -1) {
                legendData.push(item.code)
            }
        });
        res.forEach((item: any, index: number) => {
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
        legendData.forEach((type: string, index: number) => {
            res.forEach((item: any) => {
                if (item.functionType === type) {
                    if (typeof series[index] === "number") {
                        series[index] += Number(item.num);
                    } else {
                        series[index] = Number(item.num);
                    }
                }
            });
            if (!series[index]) {
                series[index] = 0;
            }
        });


        //按时间维度来查找相同类型的数据累加
        dateList.forEach((date: string, index: number) => {
            playData.push([] as Array<number>);
            res.forEach((item: any) => {
                if (item.timeItem === date) {
                    legendData.forEach((type: string, i: number) => {
                        if (item.functionType === type) {
                            if (typeof playData[index][i] === "number") {
                                playData[index][i] += Number(item.num);
                            } else {
                                playData[index][i] = Number(item.num);
                            }
                        }
                    })
                }

            })
        });
        PersonColorStatistics.dateList = dateList;
        PersonColorStatistics.playData = playData;
        PersonColorStatistics.legendData = legendData.map((item: string) => modelMap[item].name);
        PersonColorStatistics.series = series;
        return PersonColorStatistics;
    }

    private async FormatChartWifiFive(res: Array<any>, timeType: string, dateList: Array<string>)/*: ITypeStatistics */ {

        if (!res || (Array.isArray(res) && res.length === 0)) {
            ResourceServerExt.LOGGER.warn(util.format('%s Result is not found', timeType))
            return null
        }

        let PersonColorStatistics = new ITypeStatistics();
        let deviceList = [] as Array<string>;
        let series = [] as Array<number>;
        let playData = [] as Array<Array<number>>;

        res.forEach((item: any) => {
            if (deviceList.indexOf(item.deviceName) === -1) {
                deviceList.push(item.deviceName);
            }
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
        deviceList.forEach((device: string, index: number) => {
            res.forEach((item: any) => {
                if (item.deviceName === device) {
                    if (typeof series[index] === "number") {
                        series[index] += item.alarm;
                    } else {
                        series[index] = item.alarm;
                    }
                }
            })
        });
        dateList.forEach((date: string, index: number) => {
            playData.push([] as Array<number>);
            res.forEach((item: any) => {
                if (item.timeItem === date) {
                    deviceList.forEach((device: string, i: number) => {
                        if (item.deviceName === device) {
                            if (typeof playData[index][i] === "number") {
                                playData[index][i] += item.alarm
                            } else {
                                playData[index][i] = item.alarm
                            }
                        }
                    })
                }
            })
        });

        PersonColorStatistics.dateList = dateList;
        PersonColorStatistics.playData = playData;
        PersonColorStatistics.legendData = deviceList;
        PersonColorStatistics.series = series;
        return PersonColorStatistics;
    }

    private async FormatChartOtherSix(res: Array<any>, timeType: string, dateList: Array<string>)/*: IAllRankList*/ {
        if (!res || (Array.isArray(res) && res.length === 0)) {
            ResourceServerExt.LOGGER.warn(util.format('%s Result is not found', timeType))
            return null
        }
        let AllRankList = new IAllRankList();
        let nameList = [] as Array<string>;
        let playData = [] as Array<Array<{ name: string, value: number }>>;
        res.forEach((item: any) => {
            if (nameList.indexOf(item.statisticsItem) === -1) {
                nameList.push(item.statisticsItem)
            }

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
        nameList.forEach((name: string) => {
            let num = 0;
            res.forEach((item: any) => {
                if (name === item.statisticsItem) {
                    num += item.num;
                }
            });
            AllRankList.series.push({ name: name, value: num })
        });
        AllRankList.series.sort((a: { name: string, value: number }, b: { name: string, value: number }) => {
            return (b.value - a.value);
        });
        dateList.forEach((date: string, index: number) => {
            playData.push([] as Array<{ name: string, value: number }>);
            nameList.forEach((name: string) => {
                let num = 0;
                res.forEach((item: any) => {
                    if (name === item.statisticsItem && date === item.timeItem) {
                        num += item.num;
                    }
                });
                playData[index].push({ name: name, value: num })
            });
            playData[index].sort((a: { name: string, value: number }, b: { name: string, value: number }) => {
                return (b.value - a.value);
            });
        });
        AllRankList.dateList = dateList;
        AllRankList.playData = playData;
        return AllRankList
    }

    // 全部
    private async FormatChartOne(res: Array<any>, timeType: string, dateList: Array<string>)/*: IResourceStatisticalTotal*/ {
        if (!res || (Array.isArray(res) && res.length === 0)) {
            ResourceServerExt.LOGGER.warn(util.format('%s Result is not found', timeType))
            return null
        }

        let ResourceStatisticalTotal = new IResourceStatisticalTotal();
        let playData = [] as Array<{ flow: number, alarm: number }>;

        res.forEach((item: any) => {
            if (typeof ResourceStatisticalTotal.series.flow === "number") {
                ResourceStatisticalTotal.series.flow += Number(item.flow);
            } else {
                ResourceStatisticalTotal.series.flow = Number(item.flow);
            }
            if (typeof ResourceStatisticalTotal.series.alarm === "number") {
                ResourceStatisticalTotal.series.alarm += Number(item.alarm);
            } else {
                ResourceStatisticalTotal.series.alarm = Number(item.alarm);
            }

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
            playData.push({} as { flow: number, alarm: number });
            res.forEach((item: any) => {
                if (item.timeItem === date) {
                    if (typeof playData[index].flow === "number") {
                        playData[index].flow += Number(item.flow);
                    } else {
                        playData[index].flow = Number(item.flow);
                    }
                    if (typeof playData[index].alarm === "number") {
                        playData[index].alarm += Number(item.alarm);
                    } else {
                        playData[index].alarm = Number(item.alarm);
                    }

                }
            })
        });
        ResourceStatisticalTotal.dateList = dateList;
        ResourceStatisticalTotal.playData = playData;
        return ResourceStatisticalTotal;

    }

    private async FormatChartTwo(res: Array<any>, timeType: string, dateList: Array<string>)/*: IAreaTotalCollection*/ {
        if (!res) {
            ResourceServerExt.LOGGER.warn(util.format('%s Result is not found', timeType))
            return null
        }
        let AreaTotalCollection = new IAreaTotalCollection();
        let areaList = [] as Array<string>;
        let wifiListForArea = [] as Array<number>;
        let electronicfenceListForArea = [] as Array<number>;
        let rmpgateListForArea = [] as Array<number>;
        let cameraListForArea = [] as Array<number>;
        let playDate = [] as Array<IAreaTotalCollectionSeries>;
        res.forEach((item: any) => {
            if (areaList.indexOf(item.areaName) === -1 && item.areaName !== '') {
                areaList.push(item.areaName as string);
            }
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
        areaList.forEach((area: string, index) => {
            let isNoCamera = true, isNoWifi = true, isNoRmpGate = true, isNoElefence = true;
            res.forEach((item: any) => {
                if (item.areaName === area) {
                    if (item.objectType === ResourceType.wifi.key) {
                        isNoWifi = false;
                        if (typeof wifiListForArea[index] === 'number') {
                            wifiListForArea[index] += item.flow;
                        } else {
                            wifiListForArea[index] = item.flow;
                        }
                    }
                    if (item.objectType === ResourceType.electronicfence.key) {
                        isNoElefence = false;
                        if (typeof electronicfenceListForArea[index] === 'number') {
                            electronicfenceListForArea[index] += item.flow;
                        } else {
                            electronicfenceListForArea[index] = item.flow;
                        }
                    }
                    if (item.objectType === ResourceType.rmpgate.key) {
                        isNoRmpGate = false;
                        if (typeof rmpgateListForArea[index] === 'number') {
                            rmpgateListForArea[index] += item.flow;
                        } else {
                            rmpgateListForArea[index] = item.flow;
                        }
                    }
                    if (item.objectType === ResourceType.camera.key) {
                        isNoCamera = false;
                        if (typeof cameraListForArea[index] === 'number') {
                            cameraListForArea[index] += item.flow;
                        } else {
                            cameraListForArea[index] = item.flow;
                        }
                    }
                }
            });
            if (isNoCamera) {
                cameraListForArea[index] = 0
            }
            if (isNoElefence) {
                electronicfenceListForArea[index] = 0
            }
            if (isNoWifi) {
                wifiListForArea[index] = 0
            }
            if (isNoRmpGate) {
                rmpgateListForArea[index] = 0
            }
        });

        dateList.forEach((date: string, index: number) => {

            playDate.push({ wifi: [], camera: [], electronicfence: [], rmpgate: [] } as IAreaTotalCollectionSeries);
            res.forEach((item: any) => {
                if (item.timeItem === date) {
                    let isNoCamera = true, isNoWifi = true, isNoRmpGate = true, isNoElefence = true;
                    areaList.forEach((area: string, i: number) => {
                        if (area === item.areaName) {
                            if (item.objectType === ResourceType.wifi.key) {
                                isNoWifi = false;
                                if (typeof playDate[index].wifi[i] === 'number') {
                                    playDate[index].wifi[i] += item.flow;
                                } else {
                                    playDate[index].wifi[i] = item.flow;
                                }
                            }
                            if (item.objectType === ResourceType.electronicfence.key) {
                                isNoElefence = false;
                                if (typeof playDate[index].electronicfence[i] === 'number') {
                                    playDate[index].electronicfence[i] += item.flow;
                                } else {
                                    playDate[index].electronicfence[i] = item.flow;
                                }
                            }
                            if (item.objectType === ResourceType.rmpgate.key) {
                                isNoRmpGate = false;
                                if (typeof playDate[index].rmpgate[i] === 'number') {
                                    playDate[index].rmpgate[i] += item.flow;
                                } else {
                                    playDate[index].rmpgate[i] = item.flow;
                                }
                            }
                            if (item.objectType === ResourceType.camera.key) {
                                isNoCamera = false;
                                if (typeof playDate[index].camera[i] === 'number') {
                                    playDate[index].camera[i] += item.flow;
                                } else {
                                    playDate[index].camera[i] = item.flow;
                                }
                            }
                        }
                        if (isNoCamera) {
                            playDate[index].camera[i] = 0
                        }
                        if (isNoElefence) {
                            playDate[index].electronicfence[i] = 0
                        }
                        if (isNoWifi) {
                            playDate[index].wifi[i] = 0
                        }
                        if (isNoRmpGate) {
                            playDate[index].rmpgate[i] = 0
                        }
                    })
                }
            })
        });

        AreaTotalCollection.dateList = dateList;
        AreaTotalCollection.legendData = areaList;
        AreaTotalCollection.series.wifi = wifiListForArea;
        AreaTotalCollection.series.electronicfence = electronicfenceListForArea;
        AreaTotalCollection.series.rmpgate = rmpgateListForArea;
        AreaTotalCollection.series.camera = cameraListForArea;
        AreaTotalCollection.playData = playDate;
        return AreaTotalCollection;
    }

    private async FromatChartThree(res: Array<any>, timeType: string, dateList: Array<string>)/*: IAlarmStatistics*/ {
        if (!res) {
            ResourceServerExt.LOGGER.warn(util.format('%s Result is not found', timeType))
            return null
        }
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

    private async FormatChartFour(res: Array<any>, timeType: string, dateList: Array<string>)/*: IDataServiceStatistics*/ {
        if (!res) {
            ResourceServerExt.LOGGER.warn(util.format('%s Result is not found', timeType))
            return null
        }
        let DataServiceStatistics = {} as any;
        let LegendData = [] as Array<string>;
        let playData: Array<any> = [];
        let series: Array<any> = [];
        let modelMap = {} as { [key: string]: { code: string, name: string } };
        ResourceTools.AllModelListOne.forEach((item: { code: string, name: string }) => {
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
        LegendData.forEach((type: string, index: number) => {
            let isNoA = true, isNoB = true, isNoC = true, isNoD = true, isNoE = true;
            res.forEach((item: any) => {
                if (type == item.functionType) {
                    if (typeof series[index] === 'number') {
                        series[index] += Number(item.num);
                    } else {
                        series[index] = Number(item.num);
                    }
                }
                item.functionType === modelMap.ResourceRetrieval.code ? isNoA = false : null;
                item.functionType === modelMap.IntelligentAnalysis_Face.code ? isNoB = false : null;
                item.functionType === modelMap.IntelligentAnalysis_Vehicle.code ? isNoC = false : null;
                item.functionType === modelMap.IntelligentAnalysis_Mac.code ? isNoD = false : null;
                item.functionType === modelMap.IntelligentAnalysis_More.code ? isNoE = false : null;

            });
            if (isNoA) series[0] = 0;
            if (isNoB) series[1] = 0;
            if (isNoC) series[2] = 0;
            if (isNoD) series[3] = 0;
            if (isNoE) series[4] = 0;
        });
        dateList.forEach((date: string, index: number) => {
            playData.push([]);
            res.forEach((item: any) => {
                if (item.timeItem == date) {
                    LegendData.forEach((type: string, index2: number) => {
                        if (type == item.functionType) {
                            if (typeof playData[index][index2] === 'number') {
                                playData[index][index2] += Number(item.num);
                            } else {
                                playData[index][index2] = Number(item.num);
                            }
                        }
                        if (item.functionType !== modelMap.ResourceRetrieval.code) playData[index][0] = 0;
                        if (item.functionType !== modelMap.IntelligentAnalysis_Face.code) playData[index][1] = 0;
                        if (item.functionType !== modelMap.IntelligentAnalysis_Vehicle.code) playData[index][2] = 0;
                        if (item.functionType !== modelMap.IntelligentAnalysis_Mac.code) playData[index][3] = 0;
                        if (item.functionType !== modelMap.IntelligentAnalysis_More.code) playData[index][4] = 0;
                    })
                }
            })
        });
        DataServiceStatistics.series = series;
        DataServiceStatistics.LegendData = LegendData.map((type: string) => {
            return modelMap[type].name
        });
        DataServiceStatistics.dateList = dateList;
        DataServiceStatistics.playData = playData;
        return DataServiceStatistics
    }

    private async FormatChartFive(res: Array<any>, timeType: string, dateList: Array<string>)/*: IResourcebRetrievalTrend*/ {
        if (!res) {
            ResourceServerExt.LOGGER.warn(util.format('%s Result is not found', timeType))
            return null
        }
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

    private async FormatChartSix(res: Array<any>, timeType: string, dateList: Array<string>)/*: IAllRankList*/ {
        if (!res) {
            ResourceServerExt.LOGGER.warn(util.format('%s Result is not found', timeType))
            return null
        }
        let AllRankList = new IAllRankList();
        let playData = [] as Array<Array<{ name: string, value: number }>>;
        let series = [] as Array<{ name: string, value: number }>;
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

        AllRankList.series = series;

        AllRankList.series.sort((a: { name: string, value: number }, b: { name: string, value: number }) => {
            return (b.value - a.value);
        });

        dateList.forEach((date: string, index: number) => {
            playData.push([] as Array<{ name: string, value: number }>);
            res.forEach((item: any) => {
                if (date === item.timeItem) {
                    playData[index].push({ name: item.statisticsItem, value: item.num });
                }
            })
        });

        playData.forEach((item: Array<{ name: string, value: number }>, index: number) => {
            let seriesPlayer = [] as Array<{ name: string, value: number }>;
            item.forEach((child: { name: string, value: number }) => {
                let name = child.name
                let s = seriesPlayer.filter((item2) => item2.name == name)
                if (s.length === 0) {
                    seriesPlayer.push({ name: name, value: 0 })
                }
            })

            seriesPlayer.forEach((item3: { name: string, value: number }) => {
                item.forEach((item4: any) => {
                    if (item3.name === item4.statisticsItem) {
                        item3.value += Number(item4.num)
                    }
                });
            })
            playData[index] = seriesPlayer;
        })

        AllRankList.dateList = dateList;
        AllRankList.playData = playData;
        return AllRankList
    }

    private async FormatMap(res: Array<any>, timeType: string, dateList: Array<string>)/*: IMapResource */ {
        if (!res || (Array.isArray(res) && res.length === 0)) {
            ResourceServerExt.LOGGER.warn(util.format('%s Result is not found', timeType))
            return null
        }
        let PersonColorStatistics = new IMapResource();
        let deviceList = [] as Array<string>;
        let series = [] as Array<{ longitude: string, latitude: string, flow: string }>;
        let playData = [] as Array<Array<any>>;

        res.forEach((item: any) => {
            if (deviceList.indexOf(item.deviceID) === -1) {
                deviceList.push(item.deviceID);
            }
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

        dateList.forEach((date: string, index: number) => {
            playData.push([] as Array<any>);
            res.forEach((item: any) => {
                if (item.timeItem === date) {
                    deviceList.forEach((device: string, i: number) => {
                        if (item.deviceID === device) {
                            playData[index][i] = {
                                flow: item.flow,
                                longitude: item.longitude,
                                latitude: item.latitude
                            }
                        }
                    })
                }
            })
        });

        deviceList.forEach((device: string, index: number) => {
            res.forEach((item: any) => {
                if (item.deviceID === device) {
                    series[index] = {
                        flow: item.flow,
                        longitude: item.longitude,
                        latitude: item.latitude
                    }
                }
            })
        });

        PersonColorStatistics.dateList = dateList;
        PersonColorStatistics.playData = playData;
        PersonColorStatistics.deviceList = deviceList;
        PersonColorStatistics.series = series;
        return PersonColorStatistics;
    }


}

