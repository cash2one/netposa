/**
 * Created by dell on 2017/4/28.
 */
import Config from '../Config';
import * as express from "express";
import OperationsController from "../controller/OperationsController";

export default class OperationsRoute {

    constructor(app: express.Express) {
        OperationsRoute.activate(app);
    }

    public static Operations_URL = Config.NODE_SERVER_URL + "/OperationsController";

    public static activate(app: express.Express): void {
        //任务统计
        app.route(OperationsRoute.Operations_URL + "/areaTaskStatistic")
            .post(OperationsController.taskStatistics);

        //用户状态
        app.route(OperationsRoute.Operations_URL + "/userStatus")
            .post(OperationsController.userStatus);

        //日志管理
        app.route(OperationsRoute.Operations_URL + "/logManagement")
            .post(OperationsController.logManagement);

        //运行日志
        app.route(OperationsRoute.Operations_URL + "/exceptionlog")
            .post(OperationsController.exceptionlog);

        //设备状态
        app.route(OperationsRoute.Operations_URL + "/getDevicesStatusModule")
            .get(OperationsController.getDevicesStatusModule);
        app.route(OperationsRoute.Operations_URL + "/getServerStatusModule")
            .get(OperationsController.getServerStatusModule);

        //统计分析
        app.route(OperationsRoute.Operations_URL + "/getDevicesStatus")
            .get(OperationsController.getDevicesStatus);
        app.route(OperationsRoute.Operations_URL + "/taskStatisticsTotal")
            .get(OperationsController.taskStatisticsTotal);
        app.route(OperationsRoute.Operations_URL + "/alarmStatistics")
            .post(OperationsController.alarmStatistics);
        app.route(OperationsRoute.Operations_URL + "/trafficStatistics")
            .get(OperationsController.trafficStatistics);
        app.route(OperationsRoute.Operations_URL + "/retrievalStatistics")
            .post(OperationsController.retrievalStatistics);
        app.route(OperationsRoute.Operations_URL + "/analysissTatistics")
            .get(OperationsController.analysissTatistics);

        //报警统计
        app.route(OperationsRoute.Operations_URL + "/alarmStatisticsModule")
            .get(OperationsController.alarmStatisticsModule);
        app.route(OperationsRoute.Operations_URL + "/deveceAlarmStatisticsTop")
            .post(OperationsController.deveceAlarmStatisticsTop);

        //流量统计
        app.route(OperationsRoute.Operations_URL + "/areaTrafficStatistics")
            .post(OperationsController.areaTrafficStatistics);
        app.route(OperationsRoute.Operations_URL + "/trafficStatisticsModule")
            .get(OperationsController.trafficStatisticsModule);
        app.route(OperationsRoute.Operations_URL + "/deveceTrafficStatisticsTop")
            .post(OperationsController.deveceTrafficStatisticsTop);

        //检索趋势统计
        app.route(OperationsRoute.Operations_URL + "/retrievalTrendStatistics")
            .post(OperationsController.retrievalTrendStatistics);
        app.route(OperationsRoute.Operations_URL + "/retrievalKeyWordRank")
            .post(OperationsController.retrievalKeyWordRank);

        //分析统计
        app.route(OperationsRoute.Operations_URL + "/intelligentAnalysis")
            .post(OperationsController.intelligentAnalysis);

        //布控库关联报警
        app.route(OperationsRoute.Operations_URL + "/dispatchedAboutAlarm")
            .post(OperationsController.dispatchedAboutAlarm);

    }


}