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
const RedisKeys_1 = require("../model/RedisKeys");
const BeanHelper_1 = require("../common/help/BeanHelper");
const DaoType_1 = require("../dao/enum/DaoType");
const ResourceTools_1 = require("./ResourceTools");
const log4js = require("log4js");
const _ = require("lodash");
const Resource_1 = require("../core/entity/Resource");
const maintainEnum_1 = require("../core/entity/maintainEnum");
class OperationsServerExt {
    constructor() {
        this.ResourceAllType = Resource_1.ResourcePageType.ALL.value;
    }
    requestMonthAll(Params, moduleName) {
        let timeType = Params.timeType;
        let dayTimeLine = ResourceTools_1.ResourceTools.createDayTimeLine();
        let weekTimeLine = ResourceTools_1.ResourceTools.createWeekTimeLine();
        let monthTimeLine = ResourceTools_1.ResourceTools.createMonthTimeLine();
        let yearTimeLine = ResourceTools_1.ResourceTools.createYearTimeLine();
        let params, dataList, redisKey;
        switch (timeType) {
            case DataType_1.DateType.ALL:
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
        let requireFun;
        switch (moduleName) {
            case maintainEnum_1.intelligentAnalysisData.areaAlarmTrend: {
                requireFun = BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).getResourceNumByArea(_.cloneDeep(params.AllTypeParams));
                break;
            }
            case maintainEnum_1.intelligentAnalysisData.Maintain_StatisOverview_Retrival_Trend: {
                requireFun = BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).searchOperCountByModule(_.cloneDeep(params.ALLSearchCountParams2));
                break;
            }
            case maintainEnum_1.intelligentAnalysisData.AllRankList: {
                let param = Params.timeType == DataType_1.DateType.Year ? Params : params.AllTypeParams;
                console.log(param);
                requireFun = BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).topSearch(_.cloneDeep(param));
                break;
            }
        }
        return requireFun.then((res) => {
            return this.FormatAll(res, moduleName, timeType, dataList);
        });
    }
    FormatAll(res, moduleName, timeType, dataList) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(res);
            if (res.data) {
                switch (moduleName) {
                    case maintainEnum_1.intelligentAnalysisData.areaAlarmTrend: {
                        return this.AlarmStatisticsTrend(_.cloneDeep(res.data), timeType, dataList);
                    }
                    case maintainEnum_1.intelligentAnalysisData.Maintain_StatisOverview_Retrival_Trend: {
                        return this.ResourcebRetrievalTrend(_.cloneDeep(res.data), timeType, dataList);
                    }
                    case maintainEnum_1.intelligentAnalysisData.AllRankList: {
                        return this.AllRankList(_.cloneDeep(res.data), timeType, dataList);
                    }
                }
            }
            else {
                return;
            }
        });
    }
    AlarmStatisticsTrend(res, timeType, dateList) {
        return __awaiter(this, void 0, void 0, function* () {
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
    ResourcebRetrievalTrend(res, timeType, dateList) {
        return __awaiter(this, void 0, void 0, function* () {
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
    AllRankList(res, timeType, dateList) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(res);
            let arr = [
                Resource_1.ResourcePageType.Face.value,
                Resource_1.ResourcePageType.EFENCE.value,
                Resource_1.ResourcePageType.Vehicle.value,
                Resource_1.ResourcePageType.WiFi.value,
                Resource_1.ResourcePageTypeEx.Device.value,
                Resource_1.ResourcePageTypeEx.Position.value
            ];
            let result = {};
            let echartData = {};
            arr.forEach((keyword) => {
                result[keyword] = [];
                res.forEach((item) => {
                    if (item.objectType == keyword) {
                        result[keyword].push(item);
                    }
                });
            });
            arr.forEach((keyword) => {
                if (result[keyword]) {
                    echartData[keyword] = this.RankSingDevice(result[keyword], timeType);
                }
            });
            echartData.Device = echartData.Position = this.RankSingDevice(res, timeType);
            return echartData;
        });
    }
    RankSingDevice(res, timeType) {
        let AllRankList = {};
        let series = [];
        res.forEach((item) => {
            item.dateTime = item.timeItem;
            switch (timeType) {
                case DataType_1.DateType.ALL:
                case DataType_1.DateType.Month:
                    item.timeItem = moment(new Date(item.timeItem)).format('DD') + '日';
                    break;
                case DataType_1.DateType.Day:
                    item.timeItem = moment(new Date(item.timeItem)).format('hh') + ':00';
                    break;
                case DataType_1.DateType.Week:
                    item.timeItem = moment(new Date(item.timeItem)).format('DD') + '日';
                    break;
                case DataType_1.DateType.Year:
                    item.timeItem = moment(new Date(item.timeItem)).format('MM') + '月';
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
        AllRankList = _.cloneDeep(series);
        AllRankList.sort((a, b) => {
            return (b.value - a.value);
        });
        return AllRankList.slice(0, 5);
    }
}
OperationsServerExt.LOGGER = log4js.getLogger('ResourceServerExt');
exports.OperationsServerExt = OperationsServerExt;
