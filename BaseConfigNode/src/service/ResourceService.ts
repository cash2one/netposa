/**
 * Created by  on 2017/7/14.
 */
import ErrorCode from "../common/res/ErrorCode";
import Where from "../common/Where";
//import * as log4js from "log4js";
import {BackResponseBody, ResponseResult} from "../core/params/result/ResponseResult";
import {CameraEx} from "../core/entity/ex/CameraEx"
import {SystemPoint} from '../core/entity/SystemPoint'
import ResourceParams from '../core/params/ResourceParams'
import SystemPointDao from '../dao/SystemPointDao';
import {DaoType} from '../dao/enum/DaoType';
import {BeanHelper} from '../common/help/BeanHelper';
import {ServerType} from '../dao/core/BDaoImpl';
import CameraDao from '../dao/CameraDao';
import VideoServerDao from '../dao/VideoServerDao';
import RfidDao from '../dao/RfidDao';
import RmpGateDao from '../dao/RmpGateDao';
import ResourceDao from '../dao/ResourceDao';
import {OperFitstModule} from "../core/entity/OperFirstModule";
import {OperSecondModule} from '../core/entity/OperSecondModule';
import {OperThirdModule} from '../core/entity/OperThirdModule';
import * as log4js from "log4js";
import * as util from "util";

let _ = require('lodash') as any;
import {
    IResourceChart,
    IAllRankList,
    ResourceType,
    ResourceType2,
    ResourceFaceType,
    IResourceCount,
    IResourcebRetrievalTrend,
    AnalyseType,
    IResourceStatisticalTotal,
    IAreaTotalCollection,
    IAlarmStatistics,
    IMapResource,
    IDataServiceStatistics,
    IAreaTotalCollectionSeries,
    IDataServiceStatisticsSeries,
    IStatistics,
    IAreaOtherAlarmStatistics,
    ITypeStatistics,
    IPersonResourceChart,
    IWifiResourceChart,
    IElectronicfenceResourceChart
} from '../core/params/ResourceCharts'
import {ObjectType} from "../core/enum/ObjectType";
import {RedisClient} from "../extend/Redis";
import {RedisKeys} from "../model/RedisKeys";
import {DateType} from "../core/server/enum/DataType";
import {CreateResourceParams} from "../extend/ResourceTools";


export interface ResourceService {
    getresourceNumByType(params: { type: String }): Promise<any>;

    getTotalDevice(): Promise<any>;

    getDeviceById(params: any): Promise<any>;

    getResourceAllList(params: ResourceParams): Promise<any>

    getResourceCarList(params: ResourceParams): Promise<any>

    getResourceFaceList(params: ResourceParams): Promise<any>

    getResourceWifiList(params: ResourceParams): Promise<any>

    getResourceElectronicfenceList(params: ResourceParams): Promise<any>
}

export class ResourceServer implements ResourceService {
    private static LOGGER = log4js.getLogger("ResourceServer");

    async getresourceNumByType(params: { type: String }) {
        let para = params.type;
        return BeanHelper.getDao<ResourceDao>(DaoType.ResourceDao).getResourceNumByType(para)
            .then((res: BackResponseBody<Array<{ objectType: string, totalFlow: number, todayFlow: number }>>) => {
                let obj = new IResourceCount();
                res.data.forEach((item: { objectType: string, totalFlow: number, todayFlow: number }) => {
                    if (item.objectType === ResourceType.wifi.key) {
                        obj.WIFI.todayFlow = item.todayFlow;
                        obj.WIFI.totalFlow = item.totalFlow
                    }
                    if (item.objectType === ResourceType.electronicfence.key) {
                        obj.EFENCE.todayFlow = item.todayFlow;
                        obj.EFENCE.totalFlow = item.totalFlow
                    }
                    if (item.objectType === ResourceType.rmpgate.key) {
                        obj.Car.todayFlow = item.todayFlow;
                        obj.Car.totalFlow = item.totalFlow
                    }
                    if (item.objectType === ResourceType.camera.key) {
                        obj.Face.todayFlow = item.todayFlow;
                        obj.Face.totalFlow = item.totalFlow
                    }
                });
                return obj
            })
    }

    async getDeviceById(params: any) {
        if (!params.type || !params.id) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM);
        }
        if (ObjectType.Camera.value === params.type) {
            let cameraRes = await BeanHelper.getDao<CameraDao>(DaoType.CameraDao).findByID(params.id) as BackResponseBody<CameraEx>;
            if (!cameraRes.data) {
                return cameraRes
            }
            let vedieoRes = await BeanHelper.getDao<VideoServerDao>(DaoType.VideoServerDao).findByID(cameraRes.data.VideoServer);
            if (vedieoRes.data) {
                cameraRes.data.JsonUserData = {
                    VideoServer: vedieoRes.data
                }

            }
            return cameraRes
        }

        if (ObjectType.RmpGate.value === params.type) {
            return await BeanHelper.getDao<RmpGateDao>(DaoType.RmpGateDao).findByID(params.id)
        }
        if (ObjectType.Wifi.value === params.type || ObjectType.ElectronicFence.value === params.type) {
            return await BeanHelper.getDao<RfidDao>(DaoType.RfidDao).findByID(params.id)
        }

        return Promise.reject(ErrorCode.ERROR_NO_PARAM);
    }

    async getTotalDevice() {
        let whereList = [] as Array<Where>;
        return BeanHelper.getDao<SystemPointDao>(DaoType.SystemPointDao).findListByWhere(whereList, ServerType.BCS).then((res: BackResponseBody<Array<SystemPoint>>) => {
            return res;
        });
    }

    async getResourceAllList(params: ResourceParams) {
        let redisKey: string;
        switch (params.timeStamp) {
            case DateType.ALL:
                redisKey = RedisKeys.ResourceNowAllResult;
                break;
            case DateType.Month:
                redisKey = RedisKeys.ResourceMonthAllResult;
                break;
            case DateType.Day:
                redisKey = RedisKeys.ResourceDayAllResult;
                break;
            case DateType.Week:
                redisKey = RedisKeys.ResourceWeekAllResult;
                break;
            case DateType.Year:
                redisKey = RedisKeys.ResourceYearAllResult;
                break;
            default:
                redisKey = RedisKeys.ResourceMonthAllResult;
        }

        let result = await Promise.all([
            RedisClient.instance().get(redisKey + '_ResourceStatisticalTotal'),
            RedisClient.instance().get(redisKey + '_AreaTotalCollection'),
            RedisClient.instance().get(redisKey + '_AlarmStatistics'),
            RedisClient.instance().get(redisKey + '_DataServiceStatistics'),
            RedisClient.instance().get(redisKey + '_ResourcebRetrievalTrend'),
            RedisClient.instance().get(redisKey + '_AllRankList'),
            RedisClient.instance().get(redisKey + '_IMapResource'),
        ]);
        let resourceChart = new IResourceChart();
        resourceChart.ResourceStatisticalTotal = result[0];
        resourceChart.AreaTotalCollection = result[1];
        resourceChart.AlarmStatistics = result[2];
        resourceChart.DataServiceStatistics = result[3];
        resourceChart.ResourcebRetrievalTrend = result[4];
        resourceChart.AllRankList = result[5];
        resourceChart.IMapResource = result[6];
        return resourceChart;
    }

    async getResourceCarList(params: ResourceParams) {
        let redisKey: string;
        switch (params.timeStamp) {
            case DateType.ALL:
                redisKey = RedisKeys.ResourceNowCarResult;
                break;
            case DateType.Month:
                redisKey = RedisKeys.ResourceMonthCarResult;
                break;
            case DateType.Day:
                redisKey = RedisKeys.ResourceDayCarResult;
                break;
            case DateType.Week:
                redisKey = RedisKeys.ResourceWeekCarResult;
                break;
            case DateType.Year:
                redisKey = RedisKeys.ResourceYearCarResult;
                break;
            default:
                redisKey = RedisKeys.ResourceMonthCarResult;
        }

        let result = await Promise.all([
            RedisClient.instance().get(redisKey + '_VehicleStatistics'),
            RedisClient.instance().get(redisKey + '_AreaVehicleStatistics'),
            RedisClient.instance().get(redisKey + '_AreaVehicleAlarmStatistics'),
            RedisClient.instance().get(redisKey + '_VehicleColorStatistics'),
            RedisClient.instance().get(redisKey + '_VehicleTypeStatistics'),
            RedisClient.instance().get(redisKey + '_VehicleAllRankList'),
            RedisClient.instance().get(redisKey + '_IMapResource'),
        ]);

        let resourceChart: any = {};
        resourceChart.VehicleStatistics = result[0];
        resourceChart.AreaVehicleStatistics = result[1];
        resourceChart.AreaVehicleAlarmStatistics = result[2];
        resourceChart.VehicleColorStatistics = result[3];
        resourceChart.VehicleTypeStatistics =result[4];
        resourceChart.VehicleAllRankList = result[5];
        resourceChart.IMapResource = result[6];
        return resourceChart
    }

    async getResourceFaceList(params: ResourceParams) {
        let redisKey: string;
        switch (params.timeStamp) {
            case DateType.ALL:
                redisKey = RedisKeys.ResourceNowFaceResult;
                break;
            case DateType.Month:
                redisKey = RedisKeys.ResourceMonthFaceResult;
                break;
            case DateType.Day:
                redisKey = RedisKeys.ResourceDayFaceResult;
                break;
            case DateType.Week:
                redisKey = RedisKeys.ResourceWeekFaceResult;
                break;
            case DateType.Year:
                redisKey = RedisKeys.ResourceYearFaceResult;
                break;
            default:
                redisKey = RedisKeys.ResourceMonthFaceResult;
        }
        let result = await Promise.all([
            RedisClient.instance().get(redisKey + '_PersonStatistics'),
            RedisClient.instance().get(redisKey + '_AreaPersonStatistics'),
            RedisClient.instance().get(redisKey + '_AreaPersonAlarmStatistics'),
            RedisClient.instance().get(redisKey + '_PersonTypeStatistics'),
            RedisClient.instance().get(redisKey + '_PersonColorStatistics'),
            RedisClient.instance().get(redisKey + '_PersonAllRankList'),
            RedisClient.instance().get(redisKey + '_IMapResource')
        ]);
        let resourceChart = new IPersonResourceChart();
        resourceChart.PersonStatistics = result[0];
        resourceChart.AreaPersonStatistics = result[1];
        resourceChart.AreaPersonAlarmStatistics = result[2];
        resourceChart.PersonTypeStatistics = result[3];
        resourceChart.PersonColorStatistics = result[4];
        resourceChart.PersonAllRankList = result[5];
        resourceChart.IMapResource = result[6];
        return resourceChart
    }

    async getResourceWifiList(params: ResourceParams) {
        let redisKey: string;
        switch (params.timeStamp) {
            case DateType.ALL:
                redisKey = RedisKeys.ResourceNowWifiResult;
                break;
            case DateType.Month:
                redisKey = RedisKeys.ResourceMonthWifiResult;
                break;
            case DateType.Day:
                redisKey = RedisKeys.ResourceDayWifiResult;
                break;
            case DateType.Week:
                redisKey = RedisKeys.ResourceWeekWifiResult;
                break;
            case DateType.Year:
                redisKey = RedisKeys.ResourceYearWifiResult;
                break;
            default:
                redisKey = RedisKeys.ResourceMonthWifiResult;
        }
        let result = await Promise.all([
            RedisClient.instance().get(redisKey + '_WifiStatistics'),
            RedisClient.instance().get(redisKey + '_AreaWifiStatistics'),
            RedisClient.instance().get(redisKey + '_AreaWifiAlarmStatistics'),
            RedisClient.instance().get(redisKey + '_WifiTypeStatistics'),
            RedisClient.instance().get(redisKey + '_WifiColorStatistics'),
            RedisClient.instance().get(redisKey + '_WifiAllRankList'),
            RedisClient.instance().get(redisKey + '_IMapResource')
        ]);
        let resourceChart = new IWifiResourceChart();
        resourceChart.WifiStatistics = result[0];
        resourceChart.AreaWifiStatistics = result[1];
        resourceChart.AreaWifiAlarmStatistics = result[2];
        resourceChart.WifiTypeStatistics = result[3];
        resourceChart.WifiColorStatistics = result[4];
        resourceChart.WifiAllRankList = result[5];
        resourceChart.IMapResource = result[6];
        return resourceChart
    }

    async getResourceElectronicfenceList(params: ResourceParams) {
        let redisKey: string;
        switch (params.timeStamp) {
            case DateType.ALL:
                redisKey = RedisKeys.ResourceNowEfenceResult;
                break;
            case DateType.Month:
                redisKey = RedisKeys.ResourceMonthEfenceResult;
                break;
            case DateType.Day:
                redisKey = RedisKeys.ResourceDayEfenceResult;
                break;
            case DateType.Week:
                redisKey = RedisKeys.ResourceWeekEfenceResult;
                break;
            case DateType.Year:
                redisKey = RedisKeys.ResourceYearEfenceResult;
                break;
            default:
                redisKey = RedisKeys.ResourceMonthEfenceResult;
        }
        let result = await Promise.all([
            RedisClient.instance().get(redisKey + '_EFStatistics'),
            RedisClient.instance().get(redisKey + '_AreaEFStatistics'),
            RedisClient.instance().get(redisKey + '_AreaEFAlarmStatistics'),
            RedisClient.instance().get(redisKey + '_EFTypeStatistics'),
            RedisClient.instance().get(redisKey + '_EFColorStatistics'),
            RedisClient.instance().get(redisKey + '_EFAllRankList'),
            RedisClient.instance().get(redisKey + '_IMapResource')
        ]);

        let resourceChart = new IElectronicfenceResourceChart();
        resourceChart.EFStatistics = result[0];
        resourceChart.AreaEFStatistics = result[1];
        resourceChart.AreaEFAlarmStatistics = result[2];
        resourceChart.EFTypeStatistics = result[3];
        resourceChart.EFColorStatistics = result[4];
        resourceChart.EFAllRankList = result[5];
        resourceChart.IMapResource = result[6];
        return resourceChart
    }

    constructor() {
    }
}