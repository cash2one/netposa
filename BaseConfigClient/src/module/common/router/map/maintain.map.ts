/**
 * Created by dell on 2017/4/24.
 */
import {IRouterConfig} from "../router";
import {RouteKeyEnum} from "../enum/RouteKeyEnum";
import {MaintainGroupEnum} from "../enum/RouteGroupEnum";

const MainTain:IRouterConfig = {
    key: RouteKeyEnum.MainTain,
    url: '/maintain',
    moduleName: 'FDS_02',
    controllerName: 'maintainController',
    controllerUrl: 'module/maintain/main/main.controller',
    controllerAs: 'maintainCtrl',
    templateUrl: '/module/maintain/main/maintain.html',
    redirectTo: RouteKeyEnum.statisticalAnalysis
};

//统计分析
const StatisticalAnalysis:IRouterConfig = {
    key: RouteKeyEnum.statisticalAnalysis,
    url: '/statisticalanalysis',
    moduleName: 'FDS_02_02_09',
    controllerUrl: 'module/maintain/statisticsOverview/statisticalanalysis/statisticalanalysis.controller',
    views: {
        "maintain":{
            controllerName: 'statisticalAnalysisController',
            controllerAs: 'statisticalAnalysisCtrl',
            templateUrl: '/module/maintain/statisticsOverview/statisticalanalysis/statisticalanalysis.html'
        }
    },
    icon: 'statisticalAnalysis',
    group: MaintainGroupEnum.StatisticsOverview,
    parent: RouteKeyEnum.MainTain
};

// 任务统计
const TaskStatistics:IRouterConfig = {
    key: RouteKeyEnum.taskStatistics,
    url: '/taskStatistics',
    moduleName: 'FDS_02_02_11',
    controllerUrl: 'module/maintain/statisticsOverview/taskStatistics/taskStatistics.controller',
    views: {
        "maintain":{
            controllerName: 'taskStatisticsController',
            controllerAs: 'taskStatisticsCtrl',
            templateUrl: '/module/maintain/statisticsOverview/taskStatistics/taskStatistics.html'
        }
    },
    icon: 'taskStatistics',
    group: MaintainGroupEnum.StatisticsOverview,
    parent: RouteKeyEnum.MainTain
};

// 报警统计
const AlarmStatistics:IRouterConfig = {
    key: RouteKeyEnum.alarmStatistics,
    url: '/alarmStatistics',
    moduleName: 'FDS_02_02_12',
    controllerUrl: 'module/maintain/statisticsOverview/alarmStatistics/alarmStatistics.controller',
    views: {
        "maintain":{
            controllerName: 'alarmStatisticsController',
            controllerAs: 'alarmStatisticsCtrl',
            templateUrl: '/module/maintain/statisticsOverview/alarmStatistics/alarmStatistics.html'
        }
    },
    icon: 'alarmStatistics',
    group: MaintainGroupEnum.StatisticsOverview,
    parent: RouteKeyEnum.MainTain
};

// 流量统计
const TrafficStatistics:IRouterConfig = {
    key: RouteKeyEnum.trafficStatistics,
    url: '/trafficStatistics',
    moduleName: 'FDS_02_02_13',
    controllerUrl: 'module/maintain/statisticsOverview/trafficStatistics/trafficStatistics.controller',
    views: {
        "maintain":{
            controllerName: 'trafficStatisticsController',
            controllerAs: 'trafficStatisticsCtrl',
            templateUrl: '/module/maintain/statisticsOverview/trafficStatistics/trafficStatistics.html'
        }
    },
    icon: 'trafficStatistics',
    group: MaintainGroupEnum.StatisticsOverview,
    parent: RouteKeyEnum.MainTain
};

// 检索统计
const RetrievalStatistics:IRouterConfig = {
    key: RouteKeyEnum.retrievalStatistics,
    url: '/retrievalStatistics',
    moduleName: 'FDS_02_02_14',
    controllerUrl: 'module/maintain/statisticsOverview/retrievalStatistics/retrievalStatistics.controller',
    views: {
        "maintain":{
            controllerName: 'retrievalStatisticsController',
            controllerAs: 'retrievalStatisticsCtrl',
            templateUrl: '/module/maintain/statisticsOverview/retrievalStatistics/retrievalStatistics.html'
        }
    },
    icon: 'retrievalStatistics',
    group: MaintainGroupEnum.StatisticsOverview,
    parent: RouteKeyEnum.MainTain
};

// 分析统计
const AnalysisStatistics:IRouterConfig = {
    key: RouteKeyEnum.analysisStatistics,
    url: '/analysisStatistics',
    moduleName: 'FDS_02_02_15',
    controllerUrl: 'module/maintain/statisticsOverview/analysisStatistics/analysisStatistics.controller',
    views: {
        "maintain":{
            controllerName: 'analysisStatisticsController',
            controllerAs: 'analysisStatisticsCtrl',
            templateUrl: '/module/maintain/statisticsOverview/analysisStatistics/analysisStatistics.html'
        }
    },
    icon: 'analysisStatistics',
    group: MaintainGroupEnum.StatisticsOverview,
    parent: RouteKeyEnum.MainTain
};

const DeviceStatus:IRouterConfig = {
    key: RouteKeyEnum.DeviceStatus,
    url: '/devicestatus',
    moduleName: 'FDS_02_00',
    controllerUrl: 'module/maintain/deviceStatus/device.status.controller',
    views: {
        "maintain":{
            controllerName: 'deviceStatusController',
            controllerAs: 'deviceStatusCtrl',
            templateUrl: '/module/maintain/deviceStatus/device.status.html'
        }
    },
    icon: 'devicestatus',
    parent: RouteKeyEnum.MainTain
};

const UserStatus:IRouterConfig = {
    key: RouteKeyEnum.UserStatus,
    url: '/userstatus',
    moduleName: 'FDS_02_01',
    controllerUrl: 'module/maintain/userStatus/user.status.controller',
    views: {
        "maintain": {
            controllerName: 'userStatusController',
            controllerAs: 'userStatusCtrl',
            templateUrl: '/module/maintain/userStatus/user.status.html'
        }
    },
    parent: RouteKeyEnum.MainTain,
    icon: 'userstatus'
};

const OperateLog:IRouterConfig = {
    key: RouteKeyEnum.OperateLog,
    url: '/operatelog',
    moduleName: 'FDS_02_02',
    controllerUrl: 'module/maintain/operateLog/operate.log.controller',
    views: {
        "maintain": {
            controllerName: 'operateLogController',
            controllerAs: 'operateLogCtrl',
            templateUrl: '/module/maintain/operateLog/operate.log.html'
        }
    },
    parent: RouteKeyEnum.MainTain,
    icon: 'operatelog'
};

// const LicenceStatus:IRouterConfig = {
//     key: RouteKeyEnum.LicenceStatus,
//     url: '/licencestatus',
//     moduleName: 'FDS_02_03',
//     controllerUrl: 'module/maintain/licence-status/licence.status.controller',
//     views: {
//         "maintain": {
//             controllerName: 'licenceStatusController',
//             controllerAs: 'licenceStatusCtrl',
//             templateUrl: '/module/maintain/licence-status/licence.status.html'
//         }
//     },
//     parent: RouteKeyEnum.MainTain,
//     icon: 'licencestatus'
// };
//
// const Feedback:IRouterConfig = {
//     key: RouteKeyEnum.Feedback,
//     url: '/feedback',
//     moduleName: 'FDS_02_04',
//     controllerUrl: 'module/maintain/feedback/feedback.controller',
//     views: {
//         "maintain": {
//             controllerName: 'feedbackController',
//             controllerAs: 'feedbackCtrl',
//             templateUrl: '/module/maintain/feedback/feedback.html'
//         }
//     },
//     parent: RouteKeyEnum.MainTain,
//     icon: 'feedback'
// };

export const MainTainMap = [
    MainTain,StatisticalAnalysis,TaskStatistics,AlarmStatistics,TrafficStatistics,RetrievalStatistics,AnalysisStatistics,
    DeviceStatus,UserStatus,OperateLog
] as Array<IRouterConfig>;