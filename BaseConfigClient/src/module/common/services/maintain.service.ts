/**
 * Created by tj on 2017/6/23.
 */
import { intelligentAnalysisRequireParams } from "../../../core/entity/maintainEnum";

declare let require: any;
import { app } from "../app/main.app";
import 'angular';
import { } from "../../common/services/maintain.service"

declare let angular: any;

export interface IMaintainService {
    getDevicesStatus: Function;

    getServerStatusModule: Function;
    getDevicesStatusModule: Function;

    getAreaTreeData: Function;
    getUserDataList: Function;
    getRunLogDataList: Function;

    taskStatistic: Function;
    statisticalanalysis: Function;
    allStatisticalanalysis: Function;

    alarmStatistics: Function;
    trafficStatistics: Function;
    areaTrafficStatistics: Function;
    retrievalStatistics: Function;
    taskStatisticsTotal: Function;
    analysissTatistics: Function;
    logManagement: Function;
    alarmStatisticsModule: Function;
    trafficStatisticsModule: Function;
    intelligentAnalysis: Function;
    dispatchedAboutAlarm: Function;
    deveceAlarmStatisticsTop: Function;
    deveceTrafficStatisticsTop: Function;

    retrievalTrendStatistics: Function;
    retrievalKeyWordRank: Function;
    areaAlarmTrend: Function;
    //导出
    exportServerStatus: Function;
    exportDeviceStatus: Function;
}

class MaintainService implements IMaintainService {

    static $inject: Array<string> = ['$http', '$q'];

    constructor(private $http: any, private $q: any) {
        this.$http = $http;
        this.$q = $q;
    }
    //服务器状态导出
    exportServerStatus(params?: any) {
        return this.$http({
            method: "post",
            url: "/pdp/netManagerCtrl/severState/export",
            params: params
        })
    }

    //设备状态导出
    exportDeviceStatus(params?: any) {
        return this.$http({
            method: "post",
            url: "/pdp/netManagerCtrl/deviceState/export",
            params: params
        })
    }

    //获取设备状态信息
    getDevicesStatus(params?: any) {
        return this.$http({
            method: "get",
            url: "/db/OperationsController/getDevicesStatus",
            params: params
        })
    }

    //获取设备状态模块信息
    getDevicesStatusModule(params?: any) {
        return this.$http({
            method: "get",
            url: "/db/OperationsController/getDevicesStatusModule",
            params: params,
        })
    };

    getServerStatusModule(params?: any) {
        return this.$http({
            method: "get",
            url: "/db/OperationsController/getServerStatusModule",
            params: params,
        })
    };

    //获取任务总览数据
    taskStatistic(params?: any) {
        return this.$http({
            method: "post",
            url: "/db/OperationsController/areaTaskStatistic"
        })
    };

    //获取统计分析数据
    statisticalanalysis(params?: any) {
        return this.$http({
            method: "post",
            url: "/db/OperationsController/statisticalanalysis",
            params: params,
        })
    };

    //获取日志管理
    logManagement(params?: any) {
        return this.$http({
            method: "post",
            url: "/db/OperationsController/logManagement",
            params: params,
        })
    };

    //报警统计
    alarmStatistics(params?: any) {
        return this.$http({
            method: "POST",
            url: "/db/OperationsController/alarmStatistics",
            params: params
        })
    }

    //报警统计
    alarmStatisticsModule(params?: any) {
        return this.$http({
            method: "GET",
            url: "/db/OperationsController/alarmStatisticsModule",
            params: params,
        })
    }

    //流量统计
    trafficStatisticsModule(params?: any) {
        return this.$http({
            method: "GET",
            url: "/db/OperationsController/trafficStatisticsModule",
            params: params,
        })
    }

    //报警统计Top10
    deveceAlarmStatisticsTop(params: any) {
        return this.$http({
            method: "POST",
            url: "/db/OperationsController/deveceAlarmStatisticsTop",
            params: params
        })
    }

    deveceTrafficStatisticsTop(params: any) {
        return this.$http({
            method: "POST",
            url: "/db/OperationsController/deveceTrafficStatisticsTop",
            params: params
        })
    }

    //流量统计
    trafficStatistics() {
        return this.$http({
            method: "GET",
            url: "/db/OperationsController/trafficStatistics"
        })
    }

    areaTrafficStatistics(params: any) {
        return this.$http({
            method: "POST",
            url: "/db/OperationsController/areaTrafficStatistics",
            params: params
        })
    }
    //检索统计
    retrievalStatistics(params: intelligentAnalysisRequireParams) {
        return this.$http({
            method: "post",
            data: params,
            url: "/db/OperationsController/retrievalStatistics"
        })
    }

    //任务统计
    taskStatisticsTotal() {
        return this.$http({
            method: "GET",
            url: "/db/OperationsController/taskStatisticsTotal"
        })
    }

    //分析统计
    analysissTatistics() {
        return this.$http({
            method: "GET",
            url: "/db/OperationsController/analysissTatistics"
        })
    }

    //统计总览
    allStatisticalanalysis(params?: any) {
        return this.$http({
            method: "GET",
            url: "/db/OperationsController/allStatisticalanalysis",
            params: params,
        })
    }

    //获取区域树数据
    getAreaTreeData(params: any) {
        return this.$http({
            method: "GET",
            url: "/db/area/findAreaListTree",
            params: params,
        })
    };

    //用户列表
    getUserDataList(_params: object) {
        return this.$http({
            method: 'post',
            data: _params,
            url: '/db/OperationsController/userStatus'
        })
    }

    //运行日志列表
    getRunLogDataList(_params: object) {
        return this.$http({
            method: 'post',
            data: _params,
            url: '/db/OperationsController/exceptionlog'
        })
    }

    //分析统计
    intelligentAnalysis(_params: intelligentAnalysisRequireParams) {
        return this.$http({
            method: 'post',
            data: _params,
            url: '/db/OperationsController/intelligentAnalysis'
        })
    }

    //布控库
    dispatchedAboutAlarm(_params: intelligentAnalysisRequireParams) {
        return this.$http({
            method: 'post',
            data: _params,
            url: '/db/OperationsController/dispatchedAboutAlarm'
        })
    }


    //检索统计趋势
    retrievalTrendStatistics(params?: any) {
        return this.$http({
            method: "post",
            url: "/db/OperationsController/retrievalTrendStatistics",
            params: params,
        })
    }

    retrievalKeyWordRank(params?: any) {
        return this.$http({
            method: "post",
            url: "/db/OperationsController/retrievalKeyWordRank",
            params: params,
        })
    }


    areaAlarmTrend(params?: any) {
        return this.$http({
            method: "post",
            url: "/db/OperationsController/areaAlarmTrend",
            params: params,
        })
    }
}

app.service('maintainService', MaintainService);