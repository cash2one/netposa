/**
 * Created by dell on 2017/4/19.
 */
import {IRouterConfig} from "../router";
import {RouteKeyEnum} from "../enum/RouteKeyEnum";
import {GroupEnum} from "../enum/RouteGroupEnum";

const Total: IRouterConfig = {
    key: RouteKeyEnum.Total,
    url: '/total',
    moduleName: 'FDS_05',
    controllerName: 'totalMainController',
    controllerUrl: 'module/total/main/main.controller',
    templateUrl: '/module/total/main/main.html',
    controllerAs: 'totalMainCtrl',

    redirectTo: RouteKeyEnum.TotalGeneral
};

const TotalGeneral: IRouterConfig = {
    key: RouteKeyEnum.TotalGeneral,
    url: '/totalgeneral',
    moduleName: 'FDS_05_00',
    controllerUrl: 'module/total/general/total.general.controller',
    views: {
        'total': {
            templateUrl: '/module/total/general/total.general.html',
            controllerAs: 'totalGeneralCtrl',
            controllerName: 'totalGeneralController'
        }
    },
    parent: RouteKeyEnum.Total
};

const TotalTask: IRouterConfig = {
    key: RouteKeyEnum.TotalTask,
    url: '/totaltask',
    moduleName: "FDS_05_01",
    controllerName: 'totalTaskController',
    controllerUrl: 'module/total/task/total.task.controller',
    views: {
        'total': {
            templateUrl: '/module/total/task/total.task.html',
            controllerName: 'totalTaskController',
            controllerAs: 'totalTaskCtrl',
        }
    },
    parent: RouteKeyEnum.Total
};

const TotalAlarm: IRouterConfig = {
    key: RouteKeyEnum.TotalAlarm,
    url: '/totalalarm',
    moduleName: "FDS_05_02",
    controllerUrl: 'module/total/alarm/total.alarm.controller',
    views: {
        'total':{
            templateUrl: '/module/total/alarm/total.alarm.html',
            controllerAs: 'totalAlarmCtrl',
            controllerName: 'totalAlarmController'
        }
    },
    parent: RouteKeyEnum.Total
};


const TotalFlow: IRouterConfig = {
    key: RouteKeyEnum.TotalFlow,
    url: '/totalflow',
    moduleName: "FDS_05_03",
    controllerUrl: 'module/total/flow/total.flow.controller',
    views: {
        'total': {
            templateUrl: '/module/total/flow/total.flow.html',
            controllerAs: 'totalFlowCtrl',
            controllerName: 'totalFlowController'
        }
    },
    parent: RouteKeyEnum.Total
};

const TotalUser: IRouterConfig = {
    key: RouteKeyEnum.TotalUser,
    url: '/totaluser',
    moduleName: "FDS_05_04",
    controllerUrl: 'module/total/user/total.user.controller',
    views: {
        'total':{
            templateUrl: '/module/total/user/total.user.html',
            controllerAs: 'totalUserCtrl',
            controllerName: 'totalUserController'
        }
    },
    parent: RouteKeyEnum.Total
};

const TotalSearch: IRouterConfig = {
    key: RouteKeyEnum.TotalSearch,
    url: '/totalsearch',
    moduleName: "FDS_05_05",
    controllerUrl: 'module/total/search/total.search.controller',
    views: {
        'total':{
            templateUrl: '/module/total/search/total.search.html',
            controllerAs: 'totalSearchCtrl',
            controllerName: 'totalSearchController'
        }
    },
    parent: RouteKeyEnum.Total
};

export const TotalMap = [
    Total, TotalGeneral, TotalTask, TotalAlarm, TotalFlow, TotalUser, TotalSearch
] as Array<IRouterConfig>;