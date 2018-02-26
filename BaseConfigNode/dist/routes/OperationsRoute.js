"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../Config");
const OperationsController_1 = require("../controller/OperationsController");
class OperationsRoute {
    constructor(app) {
        OperationsRoute.activate(app);
    }
    static activate(app) {
        app.route(OperationsRoute.Operations_URL + "/areaTaskStatistic")
            .post(OperationsController_1.default.taskStatistics);
        app.route(OperationsRoute.Operations_URL + "/userStatus")
            .post(OperationsController_1.default.userStatus);
        app.route(OperationsRoute.Operations_URL + "/logManagement")
            .post(OperationsController_1.default.logManagement);
        app.route(OperationsRoute.Operations_URL + "/exceptionlog")
            .post(OperationsController_1.default.exceptionlog);
        app.route(OperationsRoute.Operations_URL + "/getDevicesStatusModule")
            .get(OperationsController_1.default.getDevicesStatusModule);
        app.route(OperationsRoute.Operations_URL + "/getServerStatusModule")
            .get(OperationsController_1.default.getServerStatusModule);
        app.route(OperationsRoute.Operations_URL + "/getDevicesStatus")
            .get(OperationsController_1.default.getDevicesStatus);
        app.route(OperationsRoute.Operations_URL + "/taskStatisticsTotal")
            .get(OperationsController_1.default.taskStatisticsTotal);
        app.route(OperationsRoute.Operations_URL + "/alarmStatistics")
            .post(OperationsController_1.default.alarmStatistics);
        app.route(OperationsRoute.Operations_URL + "/trafficStatistics")
            .get(OperationsController_1.default.trafficStatistics);
        app.route(OperationsRoute.Operations_URL + "/retrievalStatistics")
            .post(OperationsController_1.default.retrievalStatistics);
        app.route(OperationsRoute.Operations_URL + "/analysissTatistics")
            .get(OperationsController_1.default.analysissTatistics);
        app.route(OperationsRoute.Operations_URL + "/alarmStatisticsModule")
            .get(OperationsController_1.default.alarmStatisticsModule);
        app.route(OperationsRoute.Operations_URL + "/deveceAlarmStatisticsTop")
            .post(OperationsController_1.default.deveceAlarmStatisticsTop);
        app.route(OperationsRoute.Operations_URL + "/areaTrafficStatistics")
            .post(OperationsController_1.default.areaTrafficStatistics);
        app.route(OperationsRoute.Operations_URL + "/trafficStatisticsModule")
            .get(OperationsController_1.default.trafficStatisticsModule);
        app.route(OperationsRoute.Operations_URL + "/deveceTrafficStatisticsTop")
            .post(OperationsController_1.default.deveceTrafficStatisticsTop);
        app.route(OperationsRoute.Operations_URL + "/retrievalTrendStatistics")
            .post(OperationsController_1.default.retrievalTrendStatistics);
        app.route(OperationsRoute.Operations_URL + "/retrievalKeyWordRank")
            .post(OperationsController_1.default.retrievalKeyWordRank);
        app.route(OperationsRoute.Operations_URL + "/intelligentAnalysis")
            .post(OperationsController_1.default.intelligentAnalysis);
        app.route(OperationsRoute.Operations_URL + "/dispatchedAboutAlarm")
            .post(OperationsController_1.default.dispatchedAboutAlarm);
    }
}
OperationsRoute.Operations_URL = Config_1.default.NODE_SERVER_URL + "/OperationsController";
exports.default = OperationsRoute;
