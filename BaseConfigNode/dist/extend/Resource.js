"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const DataType_1 = require("../core/server/enum/DataType");
const OperThirdModule_1 = require("../core/entity/OperThirdModule");
const ResourceCharts_1 = require("../core/params/ResourceCharts");
const Redis_1 = require("./Redis");
const RedisKeys_1 = require("../model/RedisKeys");
const BeanHelper_1 = require("../common/help/BeanHelper");
const DaoType_1 = require("../dao/enum/DaoType");
const ResourceTools_1 = require("./ResourceTools");
const log4js = require("log4js");
const util = require("util");
const _ = require("lodash");
const Resource_1 = require("../core/entity/Resource");
class ResourceServerExt {
    constructor() {
        this.ResourceAllType = Resource_1.ResourcePageType.ALL.value;
        this.ResourceFaceType = Resource_1.ResourcePageType.Face.value;
        this.ResourceWifiType = Resource_1.ResourcePageType.WiFi.value;
        this.ResourceEfenceType = Resource_1.ResourcePageType.EFENCE.value;
        this.ResourceCarType = Resource_1.ResourcePageType.Vehicle.value;
    }
    requestAllResource(timeType) {
        let nowTimeLine = ResourceTools_1.ResourceTools.createNowTimeLine();
        let dayTimeLine = ResourceTools_1.ResourceTools.createDayTimeLine();
        let weekTimeLine = ResourceTools_1.ResourceTools.createWeekTimeLine();
        let monthTimeLine = ResourceTools_1.ResourceTools.createMonthTimeLine();
        let yearTimeLine = ResourceTools_1.ResourceTools.createYearTimeLine();
        let params, dataList, redisKey;
        switch (timeType) {
            case DataType_1.DateType.ALL:
                params = ResourceTools_1.CreateResourceParams.NowAllParams;
                dataList = nowTimeLine;
                redisKey = RedisKeys_1.RedisKeys.ResourceNowAllResult;
                break;
            case DataType_1.DateType.Month:
                params = ResourceTools_1.CreateResourceParams.MonthAllParams;
                dataList = monthTimeLine;
                redisKey = RedisKeys_1.RedisKeys.ResourceMonthAllResult;
                break;
            case DataType_1.DateType.Day:
                params = ResourceTools_1.CreateResourceParams.DayAllParams;
                dataList = dayTimeLine;
                redisKey = RedisKeys_1.RedisKeys.ResourceDayAllResult;
                break;
            case DataType_1.DateType.Week:
                params = ResourceTools_1.CreateResourceParams.WeekAllParams;
                dataList = weekTimeLine;
                redisKey = RedisKeys_1.RedisKeys.ResourceWeekAllResult;
                break;
            case DataType_1.DateType.Year:
                params = ResourceTools_1.CreateResourceParams.YearAllParams;
                dataList = yearTimeLine;
                redisKey = RedisKeys_1.RedisKeys.ResourceYearAllResult;
                break;
        }
        params.ALLSearchCountParams.resourceType = this.ResourceAllType;
        params.AllTypeParams.resourceType = this.ResourceAllType;
        params.ALLSearchCountParams2.resourceType = this.ResourceAllType;
        Promise.all([
            ResourceTools_1.ResourceTools.catchPromiseReset(BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).getResourceNumByArea(_.cloneDeep(params.AllTypeParams))),
            ResourceTools_1.ResourceTools.catchPromiseReset(BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).searchOperCountByModule(_.cloneDeep(params.ALLSearchCountParams2))),
            ResourceTools_1.ResourceTools.catchPromiseReset(BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).searchOperCountByModule(_.cloneDeep(params.ALLSearchCountParams))),
            ResourceTools_1.ResourceTools.catchPromiseReset(BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).topSearch(_.cloneDeep(params.AllTypeParams))),
            ResourceTools_1.ResourceTools.catchPromiseReset(BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).getAlarmDeviceNum(_.cloneDeep(params.AllTypeParams)))
        ]).then((res) => {
            return this.FormatAll(res, redisKey, timeType, dataList);
        });
    }
    requestFaceResource(timeType) {
        let nowTimeLine = ResourceTools_1.ResourceTools.createNowTimeLine();
        let dayTimeLine = ResourceTools_1.ResourceTools.createDayTimeLine();
        let weekTimeLine = ResourceTools_1.ResourceTools.createWeekTimeLine();
        let monthTimeLine = ResourceTools_1.ResourceTools.createMonthTimeLine();
        let yearTimeLine = ResourceTools_1.ResourceTools.createYearTimeLine();
        let params, dataList, redisKey;
        switch (timeType) {
            case DataType_1.DateType.ALL:
                params = ResourceTools_1.CreateResourceParams.NowFaceParams;
                dataList = nowTimeLine;
                redisKey = RedisKeys_1.RedisKeys.ResourceNowFaceResult;
                break;
            case DataType_1.DateType.Month:
                params = ResourceTools_1.CreateResourceParams.MonthFaceParams;
                dataList = monthTimeLine;
                redisKey = RedisKeys_1.RedisKeys.ResourceMonthFaceResult;
                break;
            case DataType_1.DateType.Day:
                params = ResourceTools_1.CreateResourceParams.DayFaceParams;
                dataList = dayTimeLine;
                redisKey = RedisKeys_1.RedisKeys.ResourceDayFaceResult;
                break;
            case DataType_1.DateType.Week:
                params = ResourceTools_1.CreateResourceParams.WeekFaceParams;
                dataList = weekTimeLine;
                redisKey = RedisKeys_1.RedisKeys.ResourceWeekFaceResult;
                break;
            case DataType_1.DateType.Year:
                params = ResourceTools_1.CreateResourceParams.YearFaceParams;
                dataList = yearTimeLine;
                redisKey = RedisKeys_1.RedisKeys.ResourceYearFaceResult;
                break;
        }
        params.ALLSearchCountParams.resourceType = this.ResourceFaceType;
        params.AllTypeParams.resourceType = this.ResourceFaceType;
        params.ALLSearchCountParams2.resourceType = this.ResourceFaceType;
        Promise.all([
            ResourceTools_1.ResourceTools.catchPromiseReset(BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).getResourceNumByArea(_.cloneDeep(params.AllTypeParams))),
            ResourceTools_1.ResourceTools.catchPromiseReset(BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).searchOperCountByModule(params.ALLSearchCountParams)),
            ResourceTools_1.ResourceTools.catchPromiseReset(BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).searchOperCountByModule(params.ALLSearchCountParams2)),
            ResourceTools_1.ResourceTools.catchPromiseReset(BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).topSearch(_.cloneDeep(params.AllTypeParams))),
            ResourceTools_1.ResourceTools.catchPromiseReset(BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).getAlarmDeviceNum(_.cloneDeep(params.AllTypeParams)))
        ]).then((res) => {
            return this.FormatFace(res, redisKey, timeType, dataList);
        });
    }
    requestWifiResource(timeType) {
        let nowTimeLine = ResourceTools_1.ResourceTools.createNowTimeLine();
        let dayTimeLine = ResourceTools_1.ResourceTools.createDayTimeLine();
        let weekTimeLine = ResourceTools_1.ResourceTools.createWeekTimeLine();
        let monthTimeLine = ResourceTools_1.ResourceTools.createMonthTimeLine();
        let yearTimeLine = ResourceTools_1.ResourceTools.createYearTimeLine();
        let params, dataList, redisKey;
        switch (timeType) {
            case DataType_1.DateType.ALL:
                params = ResourceTools_1.CreateResourceParams.NowWifiParams;
                dataList = nowTimeLine;
                redisKey = RedisKeys_1.RedisKeys.ResourceNowWifiResult;
                break;
            case DataType_1.DateType.Month:
                params = ResourceTools_1.CreateResourceParams.MonthWifiParams;
                dataList = monthTimeLine;
                redisKey = RedisKeys_1.RedisKeys.ResourceMonthWifiResult;
                break;
            case DataType_1.DateType.Day:
                params = ResourceTools_1.CreateResourceParams.DayWifiParams;
                dataList = dayTimeLine;
                redisKey = RedisKeys_1.RedisKeys.ResourceDayWifiResult;
                break;
            case DataType_1.DateType.Week:
                params = ResourceTools_1.CreateResourceParams.WeekWifiParams;
                dataList = weekTimeLine;
                redisKey = RedisKeys_1.RedisKeys.ResourceWeekWifiResult;
                break;
            case DataType_1.DateType.Year:
                params = ResourceTools_1.CreateResourceParams.YearWifiParams;
                dataList = yearTimeLine;
                redisKey = RedisKeys_1.RedisKeys.ResourceYearWifiResult;
                break;
        }
        params.ALLSearchCountParams.resourceType = this.ResourceWifiType;
        params.AllTypeParams.resourceType = this.ResourceWifiType;
        params.ALLSearchCountParams2.resourceType = this.ResourceWifiType;
        Promise.all([
            ResourceTools_1.ResourceTools.catchPromiseReset(BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).getResourceNumByArea(_.cloneDeep(params.AllTypeParams))),
            ResourceTools_1.ResourceTools.catchPromiseReset(BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).searchOperCountByModule(params.ALLSearchCountParams2)),
            ResourceTools_1.ResourceTools.catchPromiseReset(BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).getAlarmDeviceNum(params.AllTypeParams)),
            ResourceTools_1.ResourceTools.catchPromiseReset(BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).topSearch(_.cloneDeep(params.AllTypeParams)))
        ]).then((res) => {
            return this.FormatWifi(res, redisKey, timeType, dataList);
        });
    }
    requestEfenceResource(timeType) {
        let nowTimeLine = ResourceTools_1.ResourceTools.createNowTimeLine();
        let dayTimeLine = ResourceTools_1.ResourceTools.createDayTimeLine();
        let weekTimeLine = ResourceTools_1.ResourceTools.createWeekTimeLine();
        let monthTimeLine = ResourceTools_1.ResourceTools.createMonthTimeLine();
        let yearTimeLine = ResourceTools_1.ResourceTools.createYearTimeLine();
        let params, dataList, redisKey;
        switch (timeType) {
            case DataType_1.DateType.ALL:
                params = ResourceTools_1.CreateResourceParams.NowEfenceParams;
                dataList = nowTimeLine;
                redisKey = RedisKeys_1.RedisKeys.ResourceNowEfenceResult;
                break;
            case DataType_1.DateType.Month:
                params = ResourceTools_1.CreateResourceParams.MonthEfenceParams;
                dataList = monthTimeLine;
                redisKey = RedisKeys_1.RedisKeys.ResourceMonthEfenceResult;
                break;
            case DataType_1.DateType.Day:
                params = ResourceTools_1.CreateResourceParams.DayEfenceParams;
                dataList = dayTimeLine;
                redisKey = RedisKeys_1.RedisKeys.ResourceDayEfenceResult;
                break;
            case DataType_1.DateType.Week:
                params = ResourceTools_1.CreateResourceParams.WeekEfenceParams;
                dataList = weekTimeLine;
                redisKey = RedisKeys_1.RedisKeys.ResourceWeekEfenceResult;
                break;
            case DataType_1.DateType.Year:
                params = ResourceTools_1.CreateResourceParams.YearEfenceParams;
                dataList = yearTimeLine;
                redisKey = RedisKeys_1.RedisKeys.ResourceYearEfenceResult;
                break;
        }
        params.ALLSearchCountParams.resourceType = this.ResourceEfenceType;
        params.AllTypeParams.resourceType = this.ResourceEfenceType;
        params.ALLSearchCountParams2.resourceType = this.ResourceEfenceType;
        Promise.all([
            ResourceTools_1.ResourceTools.catchPromiseReset(BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).getResourceNumByArea(_.cloneDeep(params.AllTypeParams))),
            ResourceTools_1.ResourceTools.catchPromiseReset(BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).searchOperCountByModule(params.ALLSearchCountParams2)),
            ResourceTools_1.ResourceTools.catchPromiseReset(BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).getAlarmDeviceNum(params.AllTypeParams)),
            ResourceTools_1.ResourceTools.catchPromiseReset(BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).topSearch(_.cloneDeep(params.AllTypeParams)))
        ]).then((res) => {
            return this.FormatElectronicfence(res, redisKey, timeType, dataList);
        });
    }
    requestCarResource(timeType) {
        let nowTimeLine = ResourceTools_1.ResourceTools.createNowTimeLine();
        let dayTimeLine = ResourceTools_1.ResourceTools.createDayTimeLine();
        let weekTimeLine = ResourceTools_1.ResourceTools.createWeekTimeLine();
        let monthTimeLine = ResourceTools_1.ResourceTools.createMonthTimeLine();
        let yearTimeLine = ResourceTools_1.ResourceTools.createYearTimeLine();
        let params, dataList, redisKey;
        switch (timeType) {
            case DataType_1.DateType.ALL:
                params = ResourceTools_1.CreateResourceParams.NowCarParams;
                dataList = nowTimeLine;
                redisKey = RedisKeys_1.RedisKeys.ResourceNowCarResult;
                break;
            case DataType_1.DateType.Month:
                params = ResourceTools_1.CreateResourceParams.MonthCarParams;
                dataList = monthTimeLine;
                redisKey = RedisKeys_1.RedisKeys.ResourceMonthCarResult;
                break;
            case DataType_1.DateType.Day:
                params = ResourceTools_1.CreateResourceParams.DayCarParams;
                dataList = dayTimeLine;
                redisKey = RedisKeys_1.RedisKeys.ResourceDayCarResult;
                break;
            case DataType_1.DateType.Week:
                params = ResourceTools_1.CreateResourceParams.WeekCarParams;
                dataList = weekTimeLine;
                redisKey = RedisKeys_1.RedisKeys.ResourceWeekCarResult;
                break;
            case DataType_1.DateType.Year:
                params = ResourceTools_1.CreateResourceParams.YearCarParams;
                dataList = yearTimeLine;
                redisKey = RedisKeys_1.RedisKeys.ResourceYearCarResult;
                break;
        }
        params.AllTypeParams.resourceType = this.ResourceCarType;
        Promise.all([
            ResourceTools_1.ResourceTools.catchPromiseReset(BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).getResourceNumByArea(_.cloneDeep(params.AllTypeParams))),
            ResourceTools_1.ResourceTools.catchPromiseReset(BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).carCountByColor(params.AllTypeParams)),
            ResourceTools_1.ResourceTools.catchPromiseReset(BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).carCountByType(params.AllTypeParams)),
            ResourceTools_1.ResourceTools.catchPromiseReset(BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).topSearch(_.cloneDeep(params.AllTypeParams)))
        ]).then((res) => {
            return this.FormatCar(res, redisKey, timeType, dataList);
        });
    }
    FormatCar(res, redisKey, timeType, dataList) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.all([
                this.FormatChartOtherOne(_.cloneDeep(res[0].data), timeType, dataList),
                this.FormatChartOtherTwo(_.cloneDeep(res[0].data), timeType, dataList),
                this.FormatChartOtherThree(_.cloneDeep(res[0].data), timeType, dataList),
                this.FromatChartCarFour(_.cloneDeep(res[1].data), timeType, dataList),
                this.FromatChartCarFive(_.cloneDeep(res[2].data), timeType, dataList),
                this.FormatChartOtherSix(_.cloneDeep(res[3].data), timeType, dataList),
                this.FormatMap(_.cloneDeep(res[3].data), timeType, dataList)
            ]).then((res) => {
                return Promise.all([
                    Redis_1.RedisClient.instance().set(redisKey + '_VehicleStatistics', res[0]),
                    Redis_1.RedisClient.instance().set(redisKey + '_AreaVehicleStatistics', res[1]),
                    Redis_1.RedisClient.instance().set(redisKey + '_AreaVehicleAlarmStatistics', res[2]),
                    Redis_1.RedisClient.instance().set(redisKey + '_VehicleColorStatistics', res[3]),
                    Redis_1.RedisClient.instance().set(redisKey + '_VehicleTypeStatistics', res[4]),
                    Redis_1.RedisClient.instance().set(redisKey + '_VehicleAllRankList', res[5]),
                    Redis_1.RedisClient.instance().set(redisKey + '_IMapResource', res[6])
                ]);
            });
        });
    }
    FormatElectronicfence(res, redisKey, timeType, dataList) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.all([
                this.FormatChartOtherOne(_.cloneDeep(res[0].data), timeType, dataList),
                this.FormatChartOtherTwo(_.cloneDeep(res[0].data), timeType, dataList),
                this.FormatChartOtherThree(_.cloneDeep(res[0].data), timeType, dataList),
                this.FormatChartOtherFour(_.cloneDeep(res[1].data), timeType, dataList),
                this.FormatChartWifiFive(_.cloneDeep(res[2].data), timeType, dataList),
                this.FormatChartOtherSix(_.cloneDeep(res[3].data), timeType, dataList),
                this.FormatMap(_.cloneDeep(res[2].data), timeType, dataList)
            ]).then((res) => {
                return Promise.all([
                    Redis_1.RedisClient.instance().set(redisKey + '_EFStatistics', res[0]),
                    Redis_1.RedisClient.instance().set(redisKey + '_AreaEFStatistics', res[1]),
                    Redis_1.RedisClient.instance().set(redisKey + '_AreaEFAlarmStatistics', res[2]),
                    Redis_1.RedisClient.instance().set(redisKey + '_EFTypeStatistics', res[3]),
                    Redis_1.RedisClient.instance().set(redisKey + '_EFColorStatistics', res[4]),
                    Redis_1.RedisClient.instance().set(redisKey + '_EFAllRankList', res[5]),
                    Redis_1.RedisClient.instance().set(redisKey + '_IMapResource', res[6])
                ]);
            });
        });
    }
    FormatWifi(res, redisKey, timeType, dataList) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.all([
                this.FormatChartOtherOne(_.cloneDeep(res[0].data), timeType, dataList),
                this.FormatChartOtherTwo(_.cloneDeep(res[0].data), timeType, dataList),
                this.FormatChartOtherThree(_.cloneDeep(res[0].data), timeType, dataList),
                this.FormatChartOtherFour(_.cloneDeep(res[1].data), timeType, dataList),
                this.FormatChartWifiFive(_.cloneDeep(res[2].data), timeType, dataList),
                this.FormatChartOtherSix(_.cloneDeep(res[3].data), timeType, dataList),
                this.FormatMap(_.cloneDeep(res[0].data), timeType, dataList)
            ]).then((res) => {
                return Promise.all([
                    Redis_1.RedisClient.instance().set(redisKey + '_WifiStatistics', res[0]),
                    Redis_1.RedisClient.instance().set(redisKey + '_AreaWifiStatistics', res[1]),
                    Redis_1.RedisClient.instance().set(redisKey + '_AreaWifiAlarmStatistics', res[2]),
                    Redis_1.RedisClient.instance().set(redisKey + '_WifiTypeStatistics', res[3]),
                    Redis_1.RedisClient.instance().set(redisKey + '_WifiColorStatistics', res[4]),
                    Redis_1.RedisClient.instance().set(redisKey + '_WifiAllRankList', res[5]),
                    Redis_1.RedisClient.instance().set(redisKey + '_IMapResource', res[6])
                ]);
            });
        });
    }
    FormatFace(res, redisKey, timeType, dataList) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.all([
                this.FormatChartOtherOne(_.cloneDeep(res[0].data), timeType, dataList),
                this.FormatChartOtherTwo(_.cloneDeep(res[0].data), timeType, dataList),
                this.FormatChartOtherThree(_.cloneDeep(res[0].data), timeType, dataList),
                this.FormatChartOtherFour(_.cloneDeep(res[1].data), timeType, dataList),
                this.FormatChartFaceFive(_.cloneDeep(res[2].data), timeType, dataList),
                this.FormatChartOtherSix(_.cloneDeep(res[3].data), timeType, dataList),
                this.FormatMap(_.cloneDeep(res[4].data), timeType, dataList)
            ]).then((res) => {
                return Promise.all([
                    Redis_1.RedisClient.instance().set(redisKey + '_PersonStatistics', res[0]),
                    Redis_1.RedisClient.instance().set(redisKey + '_AreaPersonStatistics', res[1]),
                    Redis_1.RedisClient.instance().set(redisKey + '_AreaPersonAlarmStatistics', res[2]),
                    Redis_1.RedisClient.instance().set(redisKey + '_PersonTypeStatistics', res[3]),
                    Redis_1.RedisClient.instance().set(redisKey + '_PersonColorStatistics', res[4]),
                    Redis_1.RedisClient.instance().set(redisKey + '_PersonAllRankList', res[5]),
                    Redis_1.RedisClient.instance().set(redisKey + '_IMapResource', res[6])
                ]);
            });
        });
    }
    FormatAll(res, redisKey, timeType, dataList) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.all([
                this.FormatChartOne(_.cloneDeep(res[0].data), timeType, dataList),
                this.FormatChartTwo(_.cloneDeep(res[0].data), timeType, dataList),
                this.FromatChartThree(_.cloneDeep(res[0].data), timeType, dataList),
                this.FormatChartFour(_.cloneDeep(res[2].data), timeType, dataList),
                this.FormatChartFive(_.cloneDeep(res[1].data), timeType, dataList),
                this.FormatChartSix(_.cloneDeep(res[3].data), timeType, dataList),
                this.FormatMap(_.cloneDeep(res[4].data), timeType, dataList)
            ]).then((res) => {
                return Promise.all([
                    Redis_1.RedisClient.instance().set(redisKey + '_ResourceStatisticalTotal', res[0]),
                    Redis_1.RedisClient.instance().set(redisKey + '_AreaTotalCollection', res[1]),
                    Redis_1.RedisClient.instance().set(redisKey + '_AlarmStatistics', res[2]),
                    Redis_1.RedisClient.instance().set(redisKey + '_DataServiceStatistics', res[3]),
                    Redis_1.RedisClient.instance().set(redisKey + '_ResourcebRetrievalTrend', res[4]),
                    Redis_1.RedisClient.instance().set(redisKey + '_AllRankList', res[5]),
                    Redis_1.RedisClient.instance().set(redisKey + '_IMapResource', res[6])
                ]);
            });
        });
    }
    FormatChartOtherOne(res, timeType, dateList) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!res || (Array.isArray(res) && res.length === 0)) {
                ResourceServerExt.LOGGER.warn(util.format('%s Result is not found', timeType));
                return null;
            }
            let PersonStatistics = new ResourceCharts_1.IStatistics();
            let flowList = [];
            let alarmList = [];
            let playData = [];
            res.forEach((item) => {
                item.dateTime = item.timeItem;
                switch (timeType) {
                    case DataType_1.DateType.ALL:
                    case DataType_1.DateType.Month:
                        item.timeItem = moment(item.timeItem).format('DD') + '日';
                        break;
                    case DataType_1.DateType.Day:
                        item.timeItem = moment(item.timeItem).format('hh') + ':00';
                        break;
                    case DataType_1.DateType.Week:
                        item.timeItem = moment(item.timeItem).format('DD') + '日';
                        break;
                    case DataType_1.DateType.Year:
                        item.timeItem = moment(item.timeItem).format('MM') + '月';
                        break;
                }
            });
            dateList.forEach((date, index) => {
                playData.push({ alarm: [], flow: [] });
                flowList[index] = 0;
                alarmList[index] = 0;
                res.forEach((item) => {
                    if (item.timeItem === date) {
                        if (typeof flowList[index] === 'number') {
                            flowList[index] += Number(item.flow);
                        }
                        else {
                            flowList[index] = Number(item.flow);
                        }
                        if (typeof alarmList[index] === 'number') {
                            alarmList[index] += Number(item.alarm);
                        }
                        else {
                            alarmList[index] = Number(item.alarm);
                        }
                    }
                });
            });
            dateList.forEach((date, index) => {
                playData[index].alarm[0] = alarmList[index] ? alarmList[index] : 0;
                playData[index].flow[0] = flowList[index] ? flowList[index] : 0;
            });
            PersonStatistics.playData = playData;
            PersonStatistics.legendData = dateList;
            PersonStatistics.series.flow = flowList;
            PersonStatistics.series.alarm = alarmList;
            PersonStatistics.dateList = dateList;
            return PersonStatistics;
        });
    }
    FormatChartOtherTwo(res, timeType, dateList) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!res || (Array.isArray(res) && res.length === 0)) {
                ResourceServerExt.LOGGER.warn(util.format('%s Result is not found', timeType));
                return null;
            }
            let PersonStatistics = new ResourceCharts_1.IStatistics();
            let areaList = [];
            let flowList = [];
            let alarmList = [];
            let playData = [];
            res.forEach((item) => {
                if (areaList.indexOf(item.areaName) === -1) {
                    areaList.push(item.areaName);
                }
                item.dateTime = item.timeItem;
                switch (timeType) {
                    case DataType_1.DateType.ALL:
                    case DataType_1.DateType.Month:
                        item.timeItem = moment(item.timeItem).format('DD') + '日';
                        break;
                    case DataType_1.DateType.Day:
                        item.timeItem = moment(item.timeItem).format('hh') + ':00';
                        break;
                    case DataType_1.DateType.Week:
                        item.timeItem = moment(item.timeItem).format('DD') + '日';
                        break;
                    case DataType_1.DateType.Year:
                        item.timeItem = moment(item.timeItem).format('MM') + '月';
                        break;
                }
            });
            areaList.forEach((area, index) => {
                res.forEach((item) => {
                    if (item.areaName === area) {
                        if (typeof flowList[index] === 'number') {
                            flowList[index] += Number(item.flow);
                        }
                        else {
                            flowList[index] = Number(item.flow);
                        }
                        if (typeof alarmList[index] === 'number') {
                            alarmList[index] += Number(item.alarm);
                        }
                        else {
                            alarmList[index] = Number(item.alarm);
                        }
                    }
                });
            });
            dateList.forEach((date, index) => {
                playData.push({ alarm: [], flow: [] });
                res.forEach((item) => {
                    if (item.timeItem === date) {
                        areaList.forEach((area, i) => {
                            let isHasFlow = false, isHasAlarm = false;
                            if (item.areaName === area) {
                                if (typeof playData[index].flow[i] === "number") {
                                    playData[index].flow[i] += item.flow;
                                    isHasFlow = true;
                                }
                                else {
                                    playData[index].flow[i] = item.flow;
                                    isHasFlow = true;
                                }
                                if (typeof playData[index].alarm[i] === "number") {
                                    playData[index].alarm[i] += item.alarm;
                                    isHasAlarm = true;
                                }
                                else {
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
                        });
                    }
                });
            });
            PersonStatistics.dateList = dateList;
            PersonStatistics.playData = playData;
            PersonStatistics.legendData = areaList;
            PersonStatistics.series.flow = flowList;
            PersonStatistics.series.alarm = alarmList;
            return PersonStatistics;
        });
    }
    FormatChartOtherThree(res, timeType, dateList) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!res || (Array.isArray(res) && res.length === 0)) {
                ResourceServerExt.LOGGER.warn(util.format('%s Result is not found', timeType));
                return null;
            }
            let AreaPersonAlarmStatistics = new ResourceCharts_1.IAreaOtherAlarmStatistics();
            let areaList = [];
            let serise = [];
            let playData = [];
            res.forEach((item) => {
                if (item.areaName && areaList.indexOf(item.areaName) === -1) {
                    areaList.push(item.areaName);
                }
                item.dateTime = item.timeItem;
                switch (timeType) {
                    case DataType_1.DateType.ALL:
                    case DataType_1.DateType.Month:
                        item.timeItem = moment(item.timeItem).format('DD') + '日';
                        break;
                    case DataType_1.DateType.Day:
                        item.timeItem = moment(item.timeItem).format('hh') + ':00';
                        break;
                    case DataType_1.DateType.Week:
                        item.timeItem = moment(item.timeItem).format('DD') + '日';
                        break;
                    case DataType_1.DateType.Year:
                        item.timeItem = moment(item.timeItem).format('MM') + '月';
                        break;
                }
            });
            areaList.forEach((area, index) => {
                serise.push([]);
                serise[index].length = dateList.length;
                serise[index].fill(0);
                res.forEach((item) => {
                    if (item.areaName === area) {
                        dateList.forEach((date, i) => {
                            if (item.timeItem === date) {
                                if (typeof serise[index][i] === 'number') {
                                    serise[index][i] += Number(item.alarm);
                                }
                                else {
                                    serise[index][i] = Number(item.alarm);
                                }
                            }
                        });
                    }
                });
            });
            dateList.forEach((date, index) => {
                playData.push([]);
                areaList.forEach((item, i) => {
                    playData[index].push([]);
                    playData[index][i][0] = serise[i][index] ? serise[i][index] : 0;
                });
            });
            AreaPersonAlarmStatistics.playData = playData;
            AreaPersonAlarmStatistics.dateList = dateList;
            AreaPersonAlarmStatistics.legendData = areaList;
            AreaPersonAlarmStatistics.xData = dateList;
            AreaPersonAlarmStatistics.series = serise;
            return AreaPersonAlarmStatistics;
        });
    }
    FormatChartOtherFour(res, timeType, dateList) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!res || (Array.isArray(res) && res.length === 0)) {
                ResourceServerExt.LOGGER.warn(util.format('%s Result is not found', timeType));
                return null;
            }
            let AreaPersonAlarmStatistics = {};
            let LegendData = [];
            let playData = [];
            let series = [];
            res.forEach((item) => {
                item.dateTime = item.timeItem;
                switch (timeType) {
                    case DataType_1.DateType.ALL:
                    case DataType_1.DateType.Month:
                        item.timeItem = moment(item.timeItem).format('DD') + '日';
                        break;
                    case DataType_1.DateType.Day:
                        item.timeItem = moment(item.timeItem).format('hh') + ':00';
                        break;
                    case DataType_1.DateType.Week:
                        item.timeItem = moment(item.timeItem).format('DD') + '日';
                        break;
                    case DataType_1.DateType.Year:
                        item.timeItem = moment(item.timeItem).format('MM') + '月';
                        break;
                }
                if (LegendData.indexOf(item.functionType) === -1) {
                    LegendData.push(item.functionType);
                }
            });
            let modelMap = {};
            ResourceTools_1.ResourceTools.FaceModelListOne.forEach((item) => {
                modelMap[item.code] = item;
                if (LegendData.indexOf(item.code) === -1) {
                    LegendData.push(item.code);
                }
            });
            dateList.forEach((date, index) => {
                let isHas = false;
                res.forEach((item) => {
                    if (date === item.timeItem) {
                        isHas = true;
                        if (typeof series[index] === 'number') {
                            series[index] += Number(item.num);
                        }
                        else {
                            series[index] = Number(item.num);
                        }
                    }
                });
                if (!isHas) {
                    series[index] = 0;
                }
            });
            dateList.forEach((date, index) => {
                playData.push([]);
                playData[index][0] = series[index] ? series[index] : 0;
            });
            AreaPersonAlarmStatistics.series = series;
            AreaPersonAlarmStatistics.LegendData = LegendData;
            AreaPersonAlarmStatistics.dateList = dateList;
            AreaPersonAlarmStatistics.playData = playData;
            return AreaPersonAlarmStatistics;
        });
    }
    FromatChartCarFour(res, timeType, dateList) {
        return __awaiter(this, void 0, void 0, function* () {
            let carTypeList = [];
            let series = [];
            let VehicleColorStatistics = {};
            if (res && res.length > 0) {
                res.forEach((item, index) => {
                    if (carTypeList.indexOf(item.nameCHN) === -1) {
                        carTypeList.push(item.nameCHN);
                    }
                });
                carTypeList.forEach((item, index) => {
                    res.forEach((item2, index2) => {
                        if (item2.nameCHN == item) {
                            if (typeof series[index] === 'number') {
                                series[index] += item2.count;
                            }
                            else {
                                series[index] = item2.count;
                            }
                        }
                    });
                });
            }
            VehicleColorStatistics.xData = carTypeList;
            VehicleColorStatistics.seriesData = series;
            return VehicleColorStatistics;
        });
    }
    FromatChartCarFive(res, timeType, dateList) {
        return __awaiter(this, void 0, void 0, function* () {
            let carTypeList = [];
            let series = [];
            let VehicleTypeStatistics = {};
            if (res && res.length > 0) {
                res.forEach((item, index) => {
                    if (carTypeList.indexOf(item.name) === -1) {
                        carTypeList.push(item.name);
                    }
                });
                carTypeList.forEach((item, index) => {
                    res.forEach((item2, index2) => {
                        if (item2.name == item) {
                            if (typeof series[index] === 'number') {
                                series[index] += item2.count;
                            }
                            else {
                                series[index] = item2.count;
                            }
                        }
                    });
                });
            }
            VehicleTypeStatistics.xData = carTypeList;
            VehicleTypeStatistics.seriesData = series;
            return VehicleTypeStatistics;
        });
    }
    FormatChartFaceFive(res, timeType, dateList) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!res || (Array.isArray(res) && res.length === 0)) {
                ResourceServerExt.LOGGER.warn(util.format('%s Result is not found', timeType));
                return null;
            }
            let PersonColorStatistics = new ResourceCharts_1.ITypeStatistics();
            let legendData = [];
            let series = [];
            let playData = [];
            let modelMap = {};
            ResourceTools_1.ResourceTools.FaceModelListTwo.forEach((item) => {
                modelMap[item.code] = item;
                if (legendData.indexOf(item.code) === -1) {
                    legendData.push(item.code);
                }
            });
            res.forEach((item, index) => {
                item.dateTime = item.timeItem;
                switch (timeType) {
                    case DataType_1.DateType.ALL:
                    case DataType_1.DateType.Month:
                        item.timeItem = moment(item.timeItem).format('DD') + '日';
                        break;
                    case DataType_1.DateType.Day:
                        item.timeItem = moment(item.timeItem).format('hh') + ':00';
                        break;
                    case DataType_1.DateType.Week:
                        item.timeItem = moment(item.timeItem).format('DD') + '日';
                        break;
                    case DataType_1.DateType.Year:
                        item.timeItem = moment(item.timeItem).format('MM') + '月';
                        break;
                }
            });
            legendData.forEach((type, index) => {
                res.forEach((item) => {
                    if (item.functionType === type) {
                        if (typeof series[index] === "number") {
                            series[index] += Number(item.num);
                        }
                        else {
                            series[index] = Number(item.num);
                        }
                    }
                });
                if (!series[index]) {
                    series[index] = 0;
                }
            });
            dateList.forEach((date, index) => {
                playData.push([]);
                res.forEach((item) => {
                    if (item.timeItem === date) {
                        legendData.forEach((type, i) => {
                            if (item.functionType === type) {
                                if (typeof playData[index][i] === "number") {
                                    playData[index][i] += Number(item.num);
                                }
                                else {
                                    playData[index][i] = Number(item.num);
                                }
                            }
                        });
                    }
                });
            });
            PersonColorStatistics.dateList = dateList;
            PersonColorStatistics.playData = playData;
            PersonColorStatistics.legendData = legendData.map((item) => modelMap[item].name);
            PersonColorStatistics.series = series;
            return PersonColorStatistics;
        });
    }
    FormatChartWifiFive(res, timeType, dateList) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!res || (Array.isArray(res) && res.length === 0)) {
                ResourceServerExt.LOGGER.warn(util.format('%s Result is not found', timeType));
                return null;
            }
            let PersonColorStatistics = new ResourceCharts_1.ITypeStatistics();
            let deviceList = [];
            let series = [];
            let playData = [];
            res.forEach((item) => {
                if (deviceList.indexOf(item.deviceName) === -1) {
                    deviceList.push(item.deviceName);
                }
                item.dateTime = item.timeItem;
                switch (timeType) {
                    case DataType_1.DateType.ALL:
                    case DataType_1.DateType.Month:
                        item.timeItem = moment(item.timeItem).format('DD') + '日';
                        break;
                    case DataType_1.DateType.Day:
                        item.timeItem = moment(item.timeItem).format('hh') + ':00';
                        break;
                    case DataType_1.DateType.Week:
                        item.timeItem = moment(item.timeItem).format('DD') + '日';
                        break;
                    case DataType_1.DateType.Year:
                        item.timeItem = moment(item.timeItem).format('MM') + '月';
                        break;
                }
            });
            deviceList.forEach((device, index) => {
                res.forEach((item) => {
                    if (item.deviceName === device) {
                        if (typeof series[index] === "number") {
                            series[index] += item.flow;
                        }
                        else {
                            series[index] = item.flow;
                        }
                    }
                });
            });
            dateList.forEach((date, index) => {
                playData.push([]);
                res.forEach((item) => {
                    if (item.timeItem === date) {
                        deviceList.forEach((device, i) => {
                            if (item.deviceName === device) {
                                if (typeof playData[index][i] === "number") {
                                    playData[index][i] += item.flow;
                                }
                                else {
                                    playData[index][i] = item.flow;
                                }
                            }
                        });
                    }
                });
            });
            PersonColorStatistics.dateList = dateList;
            PersonColorStatistics.playData = playData;
            PersonColorStatistics.legendData = deviceList;
            PersonColorStatistics.series = series;
            return PersonColorStatistics;
        });
    }
    FormatChartOtherSix(res, timeType, dateList) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!res || (Array.isArray(res) && res.length === 0)) {
                ResourceServerExt.LOGGER.warn(util.format('%s Result is not found', timeType));
                return null;
            }
            let AllRankList = new ResourceCharts_1.IAllRankList();
            let nameList = [];
            let playData = [];
            res.forEach((item) => {
                if (nameList.indexOf(item.statisticsItem) === -1) {
                    nameList.push(item.statisticsItem);
                }
                item.dateTime = item.timeItem;
                switch (timeType) {
                    case DataType_1.DateType.ALL:
                    case DataType_1.DateType.Month:
                        item.timeItem = moment(item.timeItem).format('DD') + '日';
                        break;
                    case DataType_1.DateType.Day:
                        item.timeItem = moment(item.timeItem).format('hh') + ':00';
                        break;
                    case DataType_1.DateType.Week:
                        item.timeItem = moment(item.timeItem).format('DD') + '日';
                        break;
                    case DataType_1.DateType.Year:
                        item.timeItem = moment(item.timeItem).format('MM') + '月';
                        break;
                }
            });
            nameList.forEach((name) => {
                let num = 0;
                res.forEach((item) => {
                    if (name === item.statisticsItem) {
                        num += item.num;
                    }
                });
                AllRankList.series.push({ name: name, value: num });
            });
            AllRankList.series.sort((a, b) => {
                return (b.value - a.value);
            });
            dateList.forEach((date, index) => {
                playData.push([]);
                nameList.forEach((name) => {
                    let num = 0;
                    res.forEach((item) => {
                        if (name === item.statisticsItem && date === item.timeItem) {
                            num += item.num;
                        }
                    });
                    playData[index].push({ name: name, value: num });
                });
                playData[index].sort((a, b) => {
                    return (b.value - a.value);
                });
            });
            AllRankList.dateList = dateList;
            AllRankList.playData = playData;
            return AllRankList;
        });
    }
    FormatChartOne(res, timeType, dateList) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!res || (Array.isArray(res) && res.length === 0)) {
                ResourceServerExt.LOGGER.warn(util.format('%s Result is not found', timeType));
                return null;
            }
            let ResourceStatisticalTotal = new ResourceCharts_1.IResourceStatisticalTotal();
            let playData = [];
            res.forEach((item) => {
                if (typeof ResourceStatisticalTotal.series.flow === "number") {
                    ResourceStatisticalTotal.series.flow += Number(item.flow);
                }
                else {
                    ResourceStatisticalTotal.series.flow = Number(item.flow);
                }
                if (typeof ResourceStatisticalTotal.series.alarm === "number") {
                    ResourceStatisticalTotal.series.alarm += Number(item.alarm);
                }
                else {
                    ResourceStatisticalTotal.series.alarm = Number(item.alarm);
                }
                item.dateTime = item.timeItem;
                switch (timeType) {
                    case DataType_1.DateType.ALL:
                    case DataType_1.DateType.Month:
                        item.timeItem = moment(item.timeItem).format('DD') + '日';
                        break;
                    case DataType_1.DateType.Day:
                        item.timeItem = moment(item.timeItem).format('hh') + ':00';
                        break;
                    case DataType_1.DateType.Week:
                        item.timeItem = moment(item.timeItem).format('DD') + '日';
                        break;
                    case DataType_1.DateType.Year:
                        item.timeItem = moment(item.timeItem).format('MM') + '月';
                        break;
                }
            });
            dateList.forEach((date, index) => {
                playData.push({});
                res.forEach((item) => {
                    if (item.timeItem === date) {
                        if (typeof playData[index].flow === "number") {
                            playData[index].flow += Number(item.flow);
                        }
                        else {
                            playData[index].flow = Number(item.flow);
                        }
                        if (typeof playData[index].alarm === "number") {
                            playData[index].alarm += Number(item.alarm);
                        }
                        else {
                            playData[index].alarm = Number(item.alarm);
                        }
                    }
                });
            });
            ResourceStatisticalTotal.dateList = dateList;
            ResourceStatisticalTotal.playData = playData;
            return ResourceStatisticalTotal;
        });
    }
    FormatChartTwo(res, timeType, dateList) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!res) {
                ResourceServerExt.LOGGER.warn(util.format('%s Result is not found', timeType));
                return null;
            }
            let AreaTotalCollection = new ResourceCharts_1.IAreaTotalCollection();
            let areaList = [];
            let wifiListForArea = [];
            let electronicfenceListForArea = [];
            let rmpgateListForArea = [];
            let cameraListForArea = [];
            let playDate = [];
            res.forEach((item) => {
                if (areaList.indexOf(item.areaName) === -1 && item.areaName !== '') {
                    areaList.push(item.areaName);
                }
                item.dateTime = item.timeItem;
                switch (timeType) {
                    case DataType_1.DateType.ALL:
                    case DataType_1.DateType.Month:
                        item.timeItem = moment(item.timeItem).format('DD') + '日';
                        break;
                    case DataType_1.DateType.Day:
                        item.timeItem = moment(item.timeItem).format('hh') + ':00';
                        break;
                    case DataType_1.DateType.Week:
                        item.timeItem = moment(item.timeItem).format('DD') + '日';
                        break;
                    case DataType_1.DateType.Year:
                        item.timeItem = moment(item.timeItem).format('MM') + '月';
                        break;
                }
            });
            areaList.forEach((area, index) => {
                let isNoCamera = true, isNoWifi = true, isNoRmpGate = true, isNoElefence = true;
                res.forEach((item) => {
                    if (item.areaName === area) {
                        if (item.objectType === ResourceCharts_1.ResourceType.wifi.key) {
                            isNoWifi = false;
                            if (typeof wifiListForArea[index] === 'number') {
                                wifiListForArea[index] += item.flow;
                            }
                            else {
                                wifiListForArea[index] = item.flow;
                            }
                        }
                        if (item.objectType === ResourceCharts_1.ResourceType.electronicfence.key) {
                            isNoElefence = false;
                            if (typeof electronicfenceListForArea[index] === 'number') {
                                electronicfenceListForArea[index] += item.flow;
                            }
                            else {
                                electronicfenceListForArea[index] = item.flow;
                            }
                        }
                        if (item.objectType === ResourceCharts_1.ResourceType.rmpgate.key) {
                            isNoRmpGate = false;
                            if (typeof rmpgateListForArea[index] === 'number') {
                                rmpgateListForArea[index] += item.flow;
                            }
                            else {
                                rmpgateListForArea[index] = item.flow;
                            }
                        }
                        if (item.objectType === ResourceCharts_1.ResourceType.camera.key) {
                            isNoCamera = false;
                            if (typeof cameraListForArea[index] === 'number') {
                                cameraListForArea[index] += item.flow;
                            }
                            else {
                                cameraListForArea[index] = item.flow;
                            }
                        }
                    }
                });
                if (isNoCamera) {
                    cameraListForArea[index] = 0;
                }
                if (isNoElefence) {
                    electronicfenceListForArea[index] = 0;
                }
                if (isNoWifi) {
                    wifiListForArea[index] = 0;
                }
                if (isNoRmpGate) {
                    rmpgateListForArea[index] = 0;
                }
            });
            dateList.forEach((date, index) => {
                playDate.push({ wifi: [], camera: [], electronicfence: [], rmpgate: [] });
                res.forEach((item) => {
                    if (item.timeItem === date) {
                        let isNoCamera = true, isNoWifi = true, isNoRmpGate = true, isNoElefence = true;
                        areaList.forEach((area, i) => {
                            if (area === item.areaName) {
                                if (item.objectType === ResourceCharts_1.ResourceType.wifi.key) {
                                    isNoWifi = false;
                                    if (typeof playDate[index].wifi[i] === 'number') {
                                        playDate[index].wifi[i] += item.flow;
                                    }
                                    else {
                                        playDate[index].wifi[i] = item.flow;
                                    }
                                }
                                if (item.objectType === ResourceCharts_1.ResourceType.electronicfence.key) {
                                    isNoElefence = false;
                                    if (typeof playDate[index].electronicfence[i] === 'number') {
                                        playDate[index].electronicfence[i] += item.flow;
                                    }
                                    else {
                                        playDate[index].electronicfence[i] = item.flow;
                                    }
                                }
                                if (item.objectType === ResourceCharts_1.ResourceType.rmpgate.key) {
                                    isNoRmpGate = false;
                                    if (typeof playDate[index].rmpgate[i] === 'number') {
                                        playDate[index].rmpgate[i] += item.flow;
                                    }
                                    else {
                                        playDate[index].rmpgate[i] = item.flow;
                                    }
                                }
                                if (item.objectType === ResourceCharts_1.ResourceType.camera.key) {
                                    isNoCamera = false;
                                    if (typeof playDate[index].camera[i] === 'number') {
                                        playDate[index].camera[i] += item.flow;
                                    }
                                    else {
                                        playDate[index].camera[i] = item.flow;
                                    }
                                }
                            }
                            if (isNoCamera) {
                                playDate[index].camera[i] = 0;
                            }
                            if (isNoElefence) {
                                playDate[index].electronicfence[i] = 0;
                            }
                            if (isNoWifi) {
                                playDate[index].wifi[i] = 0;
                            }
                            if (isNoRmpGate) {
                                playDate[index].rmpgate[i] = 0;
                            }
                        });
                    }
                });
            });
            AreaTotalCollection.dateList = dateList;
            AreaTotalCollection.legendData = areaList;
            AreaTotalCollection.series.wifi = wifiListForArea;
            AreaTotalCollection.series.electronicfence = electronicfenceListForArea;
            AreaTotalCollection.series.rmpgate = rmpgateListForArea;
            AreaTotalCollection.series.camera = cameraListForArea;
            AreaTotalCollection.playData = playDate;
            return AreaTotalCollection;
        });
    }
    FromatChartThree(res, timeType, dateList) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!res) {
                ResourceServerExt.LOGGER.warn(util.format('%s Result is not found', timeType));
                return null;
            }
            let AlarmStatistics = new ResourceCharts_1.IAlarmStatistics();
            let wifiListForDate = [];
            let electronicfenceListForDate = [];
            let rmpgateListForDate = [];
            let cameraListForDate = [];
            let playDate = [];
            res.forEach((item) => {
                item.dateTime = item.timeItem;
                switch (timeType) {
                    case DataType_1.DateType.ALL:
                    case DataType_1.DateType.Month:
                        item.timeItem = moment(item.timeItem).format('DD') + '日';
                        break;
                    case DataType_1.DateType.Day:
                        item.timeItem = moment(item.timeItem).format('hh') + ':00';
                        break;
                    case DataType_1.DateType.Week:
                        item.timeItem = moment(item.timeItem).format('DD') + '日';
                        break;
                    case DataType_1.DateType.Year:
                        item.timeItem = moment(item.timeItem).format('MM') + '月';
                        break;
                }
            });
            dateList.forEach((date, index) => {
                let isNoCamera = true, isNoWifi = true, isNoRmpGate = true, isNoElefence = true;
                playDate.push({ wifi: [], camera: [], electronicfence: [], rmpgate: [] });
                res.forEach((item) => {
                    if (item.timeItem === date) {
                        if (item.objectType === ResourceCharts_1.ResourceType.wifi.key) {
                            isNoWifi = false;
                            if (typeof wifiListForDate[index] === 'number') {
                                wifiListForDate[index] += Number(item.alarm);
                            }
                            else {
                                wifiListForDate[index] = Number(item.alarm);
                            }
                        }
                        if (item.objectType === ResourceCharts_1.ResourceType.electronicfence.key) {
                            isNoElefence = false;
                            if (typeof electronicfenceListForDate[index] === 'number') {
                                electronicfenceListForDate[index] += Number(item.alarm);
                            }
                            else {
                                electronicfenceListForDate[index] = Number(item.alarm);
                            }
                        }
                        if (item.objectType === ResourceCharts_1.ResourceType.rmpgate.key) {
                            isNoRmpGate = false;
                            if (typeof rmpgateListForDate[index] === 'number') {
                                rmpgateListForDate[index] += Number(item.alarm);
                            }
                            else {
                                rmpgateListForDate[index] = Number(item.alarm);
                            }
                        }
                        if (item.objectType === ResourceCharts_1.ResourceType.camera.key) {
                            isNoCamera = false;
                            if (typeof cameraListForDate[index] === 'number') {
                                cameraListForDate[index] += Number(item.alarm);
                            }
                            else {
                                cameraListForDate[index] = Number(item.alarm);
                            }
                        }
                    }
                });
                if (isNoCamera) {
                    cameraListForDate[index] = 0;
                }
                if (isNoElefence) {
                    electronicfenceListForDate[index] = 0;
                }
                if (isNoWifi) {
                    wifiListForDate[index] = 0;
                }
                if (isNoRmpGate) {
                    rmpgateListForDate[index] = 0;
                }
            });
            dateList.forEach((date, index) => {
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
        });
    }
    FormatChartFour(res, timeType, dateList) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!res) {
                ResourceServerExt.LOGGER.warn(util.format('%s Result is not found', timeType));
                return null;
            }
            let DataServiceStatistics = {};
            let LegendData = [];
            let playData = [];
            let series = [];
            let modelMap = {};
            ResourceTools_1.ResourceTools.AllModelListOne.forEach((item) => {
                modelMap[item.code] = item;
                if (LegendData.indexOf(item.code) === -1) {
                    LegendData.push(item.code);
                }
            });
            res.forEach((item) => {
                item.dateTime = item.timeItem;
                switch (timeType) {
                    case DataType_1.DateType.ALL:
                    case DataType_1.DateType.Month:
                        item.timeItem = moment(item.timeItem).format('DD') + '日';
                        break;
                    case DataType_1.DateType.Day:
                        item.timeItem = moment(item.timeItem).format('hh') + ':00';
                        break;
                    case DataType_1.DateType.Week:
                        item.timeItem = moment(item.timeItem).format('DD') + '日';
                        break;
                    case DataType_1.DateType.Year:
                        item.timeItem = moment(item.timeItem).format('MM') + '月';
                        break;
                }
            });
            LegendData.forEach((type, index) => {
                let isNoA = true, isNoB = true, isNoC = true, isNoD = true, isNoE = true;
                res.forEach((item) => {
                    if (type == item.functionType) {
                        if (typeof series[index] === 'number') {
                            series[index] += Number(item.num);
                        }
                        else {
                            series[index] = Number(item.num);
                        }
                    }
                    item.functionType === modelMap.ResourceRetrieval.code ? isNoA = false : null;
                    item.functionType === modelMap.IntelligentAnalysis_Face.code ? isNoB = false : null;
                    item.functionType === modelMap.IntelligentAnalysis_Vehicle.code ? isNoC = false : null;
                    item.functionType === modelMap.IntelligentAnalysis_Mac.code ? isNoD = false : null;
                    item.functionType === modelMap.IntelligentAnalysis_More.code ? isNoE = false : null;
                });
                if (isNoA)
                    series[0] = 0;
                if (isNoB)
                    series[1] = 0;
                if (isNoC)
                    series[2] = 0;
                if (isNoD)
                    series[3] = 0;
                if (isNoE)
                    series[4] = 0;
            });
            dateList.forEach((date, index) => {
                playData.push([]);
                res.forEach((item) => {
                    if (item.timeItem == date) {
                        LegendData.forEach((type, index2) => {
                            if (type == item.functionType) {
                                if (typeof playData[index][index2] === 'number') {
                                    playData[index][index2] += Number(item.num);
                                }
                                else {
                                    playData[index][index2] = Number(item.num);
                                }
                            }
                            if (item.functionType !== modelMap.ResourceRetrieval.code)
                                playData[index][0] = 0;
                            if (item.functionType !== modelMap.IntelligentAnalysis_Face.code)
                                playData[index][1] = 0;
                            if (item.functionType !== modelMap.IntelligentAnalysis_Vehicle.code)
                                playData[index][2] = 0;
                            if (item.functionType !== modelMap.IntelligentAnalysis_Mac.code)
                                playData[index][3] = 0;
                            if (item.functionType !== modelMap.IntelligentAnalysis_More.code)
                                playData[index][4] = 0;
                        });
                    }
                });
            });
            DataServiceStatistics.series = series;
            DataServiceStatistics.LegendData = LegendData.map((type) => {
                return modelMap[type].name;
            });
            DataServiceStatistics.dateList = dateList;
            DataServiceStatistics.playData = playData;
            return DataServiceStatistics;
        });
    }
    FormatChartFive(res, timeType, dateList) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!res) {
                ResourceServerExt.LOGGER.warn(util.format('%s Result is not found', timeType));
                return null;
            }
            let LegendData = [];
            let ResourcebRetrievalTrend = new ResourceCharts_1.IResourcebRetrievalTrend();
            let Wifi = [];
            let Electronicfence = [];
            let Rmpgate = [];
            let Camera = [];
            let playDate = [];
            let modelMap = {};
            ResourceTools_1.ResourceTools.AllModelListTwo.forEach((item) => {
                modelMap[item.code] = item;
                if (LegendData.indexOf(item.code) === -1) {
                    LegendData.push(item.code);
                }
            });
            res.forEach((item) => {
                item.dateTime = item.timeItem;
                switch (timeType) {
                    case DataType_1.DateType.ALL:
                    case DataType_1.DateType.Month:
                        item.timeItem = moment(item.timeItem).format('DD') + '日';
                        break;
                    case DataType_1.DateType.Day:
                        item.timeItem = moment(item.timeItem).format('hh') + ':00';
                        break;
                    case DataType_1.DateType.Week:
                        item.timeItem = moment(item.timeItem).format('DD') + '日';
                        break;
                    case DataType_1.DateType.Year:
                        item.timeItem = moment(item.timeItem).format('MM') + '月';
                        break;
                }
            });
            dateList.forEach((date, index) => {
                let isNoCamera = true, isNoWifi = true, isNoRmpGate = true, isNoElefence = true;
                playDate.push({ rmpgate: [], camera: [], wifi: [], electronicfence: [] });
                res.forEach((item) => {
                    if (item.timeItem === date) {
                        if (item.functionType === OperThirdModule_1.OperThirdModule.ResourceRetrieval_AdvanceSearch_WiFi.code) {
                            isNoWifi = false;
                            if (typeof Wifi[index] === 'number') {
                                Wifi[index] += Number(item.num);
                            }
                            else {
                                Wifi[index] = Number(item.num);
                            }
                        }
                        if (item.functionType === OperThirdModule_1.OperThirdModule.ResourceRetrieval_AdvanceSearch_EFence.code) {
                            isNoElefence = false;
                            if (typeof Electronicfence[index] === 'number') {
                                Electronicfence[index] += Number(item.num);
                            }
                            else {
                                Electronicfence[index] = Number(item.num);
                            }
                        }
                        if (item.functionType === OperThirdModule_1.OperThirdModule.ResourceRetrieval_AdvanceSearch_Vehicle.code) {
                            isNoRmpGate = false;
                            if (typeof Rmpgate[index] === 'number') {
                                Rmpgate[index] += Number(item.num);
                            }
                            else {
                                Rmpgate[index] = Number(item.num);
                            }
                        }
                        if (item.functionType === OperThirdModule_1.OperThirdModule.ResourceRetrieval_AdvanceSearch_Face.code) {
                            isNoCamera = false;
                            if (typeof Camera[index] === 'number') {
                                Camera[index] += Number(item.num);
                            }
                            else {
                                Camera[index] = Number(item.num);
                            }
                        }
                    }
                });
                if (isNoCamera) {
                    Camera[index] = 0;
                }
                if (isNoElefence) {
                    Electronicfence[index] = 0;
                }
                if (isNoWifi) {
                    Wifi[index] = 0;
                }
                if (isNoRmpGate) {
                    Rmpgate[index] = 0;
                }
            });
            dateList.forEach((date, index) => {
                playDate[index].wifi[0] = Wifi[index];
                playDate[index].electronicfence[0] = Electronicfence[index];
                playDate[index].rmpgate[0] = Rmpgate[index];
                playDate[index].camera[0] = Camera[index];
            });
            ResourcebRetrievalTrend.legendData = LegendData.map((type) => {
                return modelMap[type].name;
            });
            ResourcebRetrievalTrend.dateList = dateList;
            ResourcebRetrievalTrend.playData = playDate;
            ResourcebRetrievalTrend.series.wifi = Wifi;
            ResourcebRetrievalTrend.series.electronicfence = Electronicfence;
            ResourcebRetrievalTrend.series.rmpgate = Rmpgate;
            ResourcebRetrievalTrend.series.camera = Camera;
            return ResourcebRetrievalTrend;
        });
    }
    FormatChartSix(res, timeType, dateList) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!res) {
                ResourceServerExt.LOGGER.warn(util.format('%s Result is not found', timeType));
                return null;
            }
            let AllRankList = new ResourceCharts_1.IAllRankList();
            let playData = [];
            let series = [];
            res.forEach((item) => {
                item.dateTime = item.timeItem;
                switch (timeType) {
                    case DataType_1.DateType.ALL:
                    case DataType_1.DateType.Month:
                        item.timeItem = moment(item.timeItem).format('DD') + '日';
                        break;
                    case DataType_1.DateType.Day:
                        item.timeItem = moment(item.timeItem).format('hh') + ':00';
                        break;
                    case DataType_1.DateType.Week:
                        item.timeItem = moment(item.timeItem).format('DD') + '日';
                        break;
                    case DataType_1.DateType.Year:
                        item.timeItem = moment(item.timeItem).format('MM') + '月';
                        break;
                }
                let name = item.statisticsItem;
                let s = series.filter((item2) => item2.name == name);
                if (s.length === 0) {
                    series.push({ name: name, value: 0 });
                }
            });
            series.forEach((item) => {
                res.forEach((item2) => {
                    if (item.name === item2.statisticsItem) {
                        item.value += Number(item2.num);
                    }
                });
            });
            AllRankList.series = series;
            AllRankList.series.sort((a, b) => {
                return (b.value - a.value);
            });
            dateList.forEach((date, index) => {
                playData.push([]);
                res.forEach((item) => {
                    if (date === item.timeItem) {
                        playData[index].push({ name: item.statisticsItem, value: item.num });
                    }
                });
            });
            playData.forEach((item, index) => {
                let seriesPlayer = [];
                item.forEach((child) => {
                    let name = child.name;
                    let s = seriesPlayer.filter((item2) => item2.name == name);
                    if (s.length === 0) {
                        seriesPlayer.push({ name: name, value: 0 });
                    }
                });
                seriesPlayer.forEach((item3) => {
                    item.forEach((item4) => {
                        if (item3.name === item4.statisticsItem) {
                            item3.value += Number(item4.num);
                        }
                    });
                });
                playData[index] = seriesPlayer;
            });
            AllRankList.dateList = dateList;
            AllRankList.playData = playData;
            return AllRankList;
        });
    }
    FormatMap(res, timeType, dateList) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!res || (Array.isArray(res) && res.length === 0)) {
                ResourceServerExt.LOGGER.warn(util.format('%s Result is not found', timeType));
                return null;
            }
            let PersonColorStatistics = new ResourceCharts_1.IMapResource();
            let deviceList = [];
            let series = [];
            let playData = [];
            res.forEach((item) => {
                if (deviceList.indexOf(item.deviceID) === -1) {
                    deviceList.push(item.deviceID);
                }
                item.dateTime = item.timeItem;
                switch (timeType) {
                    case DataType_1.DateType.ALL:
                    case DataType_1.DateType.Month:
                        item.timeItem = moment(item.timeItem).format('DD') + '日';
                        break;
                    case DataType_1.DateType.Day:
                        item.timeItem = moment(item.timeItem).format('hh') + ':00';
                        break;
                    case DataType_1.DateType.Week:
                        item.timeItem = moment(item.timeItem).format('DD') + '日';
                        break;
                    case DataType_1.DateType.Year:
                        item.timeItem = moment(item.timeItem).format('MM') + '月';
                        break;
                }
            });
            dateList.forEach((date, index) => {
                playData.push([]);
                res.forEach((item) => {
                    if (item.timeItem === date) {
                        deviceList.forEach((device, i) => {
                            if (item.deviceID === device) {
                                playData[index][i] = {
                                    flow: item.flow,
                                    longitude: item.longitude,
                                    latitude: item.latitude
                                };
                            }
                        });
                    }
                });
            });
            deviceList.forEach((device, index) => {
                res.forEach((item) => {
                    if (item.deviceID === device) {
                        series[index] = {
                            flow: item.flow,
                            longitude: item.longitude,
                            latitude: item.latitude
                        };
                    }
                });
            });
            PersonColorStatistics.dateList = dateList;
            PersonColorStatistics.playData = playData;
            PersonColorStatistics.deviceList = deviceList;
            PersonColorStatistics.series = series;
            return PersonColorStatistics;
        });
    }
}
ResourceServerExt.LOGGER = log4js.getLogger('ResourceServerExt');
exports.ResourceServerExt = ResourceServerExt;
