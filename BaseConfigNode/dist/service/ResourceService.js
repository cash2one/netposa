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
const ErrorCode_1 = require("../common/res/ErrorCode");
const DaoType_1 = require("../dao/enum/DaoType");
const BeanHelper_1 = require("../common/help/BeanHelper");
const BDaoImpl_1 = require("../dao/core/BDaoImpl");
const log4js = require("log4js");
let _ = require('lodash');
const ResourceCharts_1 = require("../core/params/ResourceCharts");
const ObjectType_1 = require("../core/enum/ObjectType");
const Redis_1 = require("../extend/Redis");
const RedisKeys_1 = require("../model/RedisKeys");
const DataType_1 = require("../core/server/enum/DataType");
class ResourceServer {
    constructor() {
    }
    getresourceNumByType(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let para = params.type;
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).getResourceNumByType(para)
                .then((res) => {
                let obj = new ResourceCharts_1.IResourceCount();
                res.data.forEach((item) => {
                    if (item.objectType === ResourceCharts_1.ResourceType.wifi.key) {
                        obj.WIFI.todayFlow = item.todayFlow;
                        obj.WIFI.totalFlow = item.totalFlow;
                    }
                    if (item.objectType === ResourceCharts_1.ResourceType.electronicfence.key) {
                        obj.EFENCE.todayFlow = item.todayFlow;
                        obj.EFENCE.totalFlow = item.totalFlow;
                    }
                    if (item.objectType === ResourceCharts_1.ResourceType.rmpgate.key) {
                        obj.Car.todayFlow = item.todayFlow;
                        obj.Car.totalFlow = item.totalFlow;
                    }
                    if (item.objectType === ResourceCharts_1.ResourceType.camera.key) {
                        obj.Face.todayFlow = item.todayFlow;
                        obj.Face.totalFlow = item.totalFlow;
                    }
                });
                return obj;
            });
        });
    }
    getDeviceById(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.type || !params.id) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            if (ObjectType_1.ObjectType.Camera.value === params.type) {
                let cameraRes = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.CameraDao).findByID(params.id);
                if (!cameraRes.data) {
                    return cameraRes;
                }
                let vedieoRes = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.VideoServerDao).findByID(cameraRes.data.VideoServer);
                if (vedieoRes.data) {
                    cameraRes.data.JsonUserData = {
                        VideoServer: vedieoRes.data
                    };
                }
                return cameraRes;
            }
            if (ObjectType_1.ObjectType.RmpGate.value === params.type) {
                return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.RmpGateDao).findByID(params.id);
            }
            if (ObjectType_1.ObjectType.Wifi.value === params.type || ObjectType_1.ObjectType.ElectronicFence.value === params.type) {
                return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.RfidDao).findByID(params.id);
            }
            return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
        });
    }
    getTotalDevice() {
        return __awaiter(this, void 0, void 0, function* () {
            let whereList = [];
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.SystemPointDao).findListByWhere(whereList, BDaoImpl_1.ServerType.BCS).then((res) => {
                return res;
            });
        });
    }
    getResourceAllList(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let redisKey;
            switch (params.timeStamp) {
                case DataType_1.DateType.ALL:
                    redisKey = RedisKeys_1.RedisKeys.ResourceNowAllResult;
                    break;
                case DataType_1.DateType.Month:
                    redisKey = RedisKeys_1.RedisKeys.ResourceMonthAllResult;
                    break;
                case DataType_1.DateType.Day:
                    redisKey = RedisKeys_1.RedisKeys.ResourceDayAllResult;
                    break;
                case DataType_1.DateType.Week:
                    redisKey = RedisKeys_1.RedisKeys.ResourceWeekAllResult;
                    break;
                case DataType_1.DateType.Year:
                    redisKey = RedisKeys_1.RedisKeys.ResourceYearAllResult;
                    break;
                default:
                    redisKey = RedisKeys_1.RedisKeys.ResourceMonthAllResult;
            }
            let result = yield Promise.all([
                Redis_1.RedisClient.instance().get(redisKey + '_ResourceStatisticalTotal'),
                Redis_1.RedisClient.instance().get(redisKey + '_AreaTotalCollection'),
                Redis_1.RedisClient.instance().get(redisKey + '_AlarmStatistics'),
                Redis_1.RedisClient.instance().get(redisKey + '_DataServiceStatistics'),
                Redis_1.RedisClient.instance().get(redisKey + '_ResourcebRetrievalTrend'),
                Redis_1.RedisClient.instance().get(redisKey + '_AllRankList'),
                Redis_1.RedisClient.instance().get(redisKey + '_IMapResource'),
            ]);
            let resourceChart = new ResourceCharts_1.IResourceChart();
            resourceChart.ResourceStatisticalTotal = result[0];
            resourceChart.AreaTotalCollection = result[1];
            resourceChart.AlarmStatistics = result[2];
            resourceChart.DataServiceStatistics = result[3];
            resourceChart.ResourcebRetrievalTrend = result[4];
            resourceChart.AllRankList = result[5];
            resourceChart.IMapResource = result[6];
            return resourceChart;
        });
    }
    getResourceCarList(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let redisKey;
            switch (params.timeStamp) {
                case DataType_1.DateType.ALL:
                    redisKey = RedisKeys_1.RedisKeys.ResourceNowCarResult;
                    break;
                case DataType_1.DateType.Month:
                    redisKey = RedisKeys_1.RedisKeys.ResourceMonthCarResult;
                    break;
                case DataType_1.DateType.Day:
                    redisKey = RedisKeys_1.RedisKeys.ResourceDayCarResult;
                    break;
                case DataType_1.DateType.Week:
                    redisKey = RedisKeys_1.RedisKeys.ResourceWeekCarResult;
                    break;
                case DataType_1.DateType.Year:
                    redisKey = RedisKeys_1.RedisKeys.ResourceYearCarResult;
                    break;
                default:
                    redisKey = RedisKeys_1.RedisKeys.ResourceMonthCarResult;
            }
            let result = yield Promise.all([
                Redis_1.RedisClient.instance().get(redisKey + '_VehicleStatistics'),
                Redis_1.RedisClient.instance().get(redisKey + '_AreaVehicleStatistics'),
                Redis_1.RedisClient.instance().get(redisKey + '_AreaVehicleAlarmStatistics'),
                Redis_1.RedisClient.instance().get(redisKey + '_VehicleColorStatistics'),
                Redis_1.RedisClient.instance().get(redisKey + '_VehicleTypeStatistics'),
                Redis_1.RedisClient.instance().get(redisKey + '_VehicleAllRankList'),
                Redis_1.RedisClient.instance().get(redisKey + '_IMapResource'),
            ]);
            let resourceChart = {};
            resourceChart.VehicleStatistics = result[0];
            resourceChart.AreaVehicleStatistics = result[1];
            resourceChart.AreaVehicleAlarmStatistics = result[2];
            resourceChart.VehicleColorStatistics = result[3];
            resourceChart.VehicleTypeStatistics = result[4];
            resourceChart.VehicleAllRankList = result[5];
            resourceChart.IMapResource = result[6];
            return resourceChart;
        });
    }
    getResourceFaceList(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let redisKey;
            switch (params.timeStamp) {
                case DataType_1.DateType.ALL:
                    redisKey = RedisKeys_1.RedisKeys.ResourceNowFaceResult;
                    break;
                case DataType_1.DateType.Month:
                    redisKey = RedisKeys_1.RedisKeys.ResourceMonthFaceResult;
                    break;
                case DataType_1.DateType.Day:
                    redisKey = RedisKeys_1.RedisKeys.ResourceDayFaceResult;
                    break;
                case DataType_1.DateType.Week:
                    redisKey = RedisKeys_1.RedisKeys.ResourceWeekFaceResult;
                    break;
                case DataType_1.DateType.Year:
                    redisKey = RedisKeys_1.RedisKeys.ResourceYearFaceResult;
                    break;
                default:
                    redisKey = RedisKeys_1.RedisKeys.ResourceMonthFaceResult;
            }
            let result = yield Promise.all([
                Redis_1.RedisClient.instance().get(redisKey + '_PersonStatistics'),
                Redis_1.RedisClient.instance().get(redisKey + '_AreaPersonStatistics'),
                Redis_1.RedisClient.instance().get(redisKey + '_AreaPersonAlarmStatistics'),
                Redis_1.RedisClient.instance().get(redisKey + '_PersonTypeStatistics'),
                Redis_1.RedisClient.instance().get(redisKey + '_PersonColorStatistics'),
                Redis_1.RedisClient.instance().get(redisKey + '_PersonAllRankList'),
                Redis_1.RedisClient.instance().get(redisKey + '_IMapResource')
            ]);
            let resourceChart = new ResourceCharts_1.IPersonResourceChart();
            resourceChart.PersonStatistics = result[0];
            resourceChart.AreaPersonStatistics = result[1];
            resourceChart.AreaPersonAlarmStatistics = result[2];
            resourceChart.PersonTypeStatistics = result[3];
            resourceChart.PersonColorStatistics = result[4];
            resourceChart.PersonAllRankList = result[5];
            resourceChart.IMapResource = result[6];
            return resourceChart;
        });
    }
    getResourceWifiList(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let redisKey;
            switch (params.timeStamp) {
                case DataType_1.DateType.ALL:
                    redisKey = RedisKeys_1.RedisKeys.ResourceNowWifiResult;
                    break;
                case DataType_1.DateType.Month:
                    redisKey = RedisKeys_1.RedisKeys.ResourceMonthWifiResult;
                    break;
                case DataType_1.DateType.Day:
                    redisKey = RedisKeys_1.RedisKeys.ResourceDayWifiResult;
                    break;
                case DataType_1.DateType.Week:
                    redisKey = RedisKeys_1.RedisKeys.ResourceWeekWifiResult;
                    break;
                case DataType_1.DateType.Year:
                    redisKey = RedisKeys_1.RedisKeys.ResourceYearWifiResult;
                    break;
                default:
                    redisKey = RedisKeys_1.RedisKeys.ResourceMonthWifiResult;
            }
            let result = yield Promise.all([
                Redis_1.RedisClient.instance().get(redisKey + '_WifiStatistics'),
                Redis_1.RedisClient.instance().get(redisKey + '_AreaWifiStatistics'),
                Redis_1.RedisClient.instance().get(redisKey + '_AreaWifiAlarmStatistics'),
                Redis_1.RedisClient.instance().get(redisKey + '_WifiTypeStatistics'),
                Redis_1.RedisClient.instance().get(redisKey + '_WifiColorStatistics'),
                Redis_1.RedisClient.instance().get(redisKey + '_WifiAllRankList'),
                Redis_1.RedisClient.instance().get(redisKey + '_IMapResource')
            ]);
            let resourceChart = new ResourceCharts_1.IWifiResourceChart();
            resourceChart.WifiStatistics = result[0];
            resourceChart.AreaWifiStatistics = result[1];
            resourceChart.AreaWifiAlarmStatistics = result[2];
            resourceChart.WifiTypeStatistics = result[3];
            resourceChart.WifiColorStatistics = result[4];
            resourceChart.WifiAllRankList = result[5];
            resourceChart.IMapResource = result[6];
            return resourceChart;
        });
    }
    getResourceElectronicfenceList(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let redisKey;
            switch (params.timeStamp) {
                case DataType_1.DateType.ALL:
                    redisKey = RedisKeys_1.RedisKeys.ResourceNowEfenceResult;
                    break;
                case DataType_1.DateType.Month:
                    redisKey = RedisKeys_1.RedisKeys.ResourceMonthEfenceResult;
                    break;
                case DataType_1.DateType.Day:
                    redisKey = RedisKeys_1.RedisKeys.ResourceDayEfenceResult;
                    break;
                case DataType_1.DateType.Week:
                    redisKey = RedisKeys_1.RedisKeys.ResourceWeekEfenceResult;
                    break;
                case DataType_1.DateType.Year:
                    redisKey = RedisKeys_1.RedisKeys.ResourceYearEfenceResult;
                    break;
                default:
                    redisKey = RedisKeys_1.RedisKeys.ResourceMonthEfenceResult;
            }
            let result = yield Promise.all([
                Redis_1.RedisClient.instance().get(redisKey + '_EFStatistics'),
                Redis_1.RedisClient.instance().get(redisKey + '_AreaEFStatistics'),
                Redis_1.RedisClient.instance().get(redisKey + '_AreaEFAlarmStatistics'),
                Redis_1.RedisClient.instance().get(redisKey + '_EFTypeStatistics'),
                Redis_1.RedisClient.instance().get(redisKey + '_EFColorStatistics'),
                Redis_1.RedisClient.instance().get(redisKey + '_EFAllRankList'),
                Redis_1.RedisClient.instance().get(redisKey + '_IMapResource')
            ]);
            let resourceChart = new ResourceCharts_1.IElectronicfenceResourceChart();
            resourceChart.EFStatistics = result[0];
            resourceChart.AreaEFStatistics = result[1];
            resourceChart.AreaEFAlarmStatistics = result[2];
            resourceChart.EFTypeStatistics = result[3];
            resourceChart.EFColorStatistics = result[4];
            resourceChart.EFAllRankList = result[5];
            resourceChart.IMapResource = result[6];
            return resourceChart;
        });
    }
}
ResourceServer.LOGGER = log4js.getLogger("ResourceServer");
exports.ResourceServer = ResourceServer;
