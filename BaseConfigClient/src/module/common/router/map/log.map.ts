import {IRouterConfig} from "../router";
/**
 * Created by dell on 2017/4/19.
 */
const Log = {
    key: 'log',
    url: '/log',
    moduleName: '日志查询',
    controllerName: 'logMainController',
    controllerUrl: 'module/log/main/main.controller',
    templateUrl: '/module/log/main/main.html',
    isParent: true,
    redirectTo: 'log.pass',  // 属性只是暂时的, 实际值会在代码逻辑中进行动态调整
    level: 0
};

const PassLog = {
    key: 'log.pass',
    url: '/pass',
    moduleName: '比对日志',
    controllerName: 'logPassController',
    controllerUrl: 'module/log/pass/pass.controller',
    views: {
        'log': {
            templateUrl: '/module/log/pass/pass.html',
            controllerName: 'logPassController'
        }
    },
    parent: 'log',
    index: 0
};

const PassPerson = {
    key: 'log.person',
    url: '/person',
    moduleName: '人员日志',
    controllerName: 'logPersonController',
    controllerUrl: 'module/log/person/person.controller',
    views: {
        'log': {
            templateUrl: '/module/log/person/person.html',
            controllerName: 'logPersonController'
        }
    },
    parent: 'log',
    index: 1
};

const PassAlarm = {
    key: 'log.alarm',
    url: '/alarm',
    moduleName: '报警日志',
    controllerName: 'logAlarmController',
    controllerUrl: 'module/log/alarm/alarm.controller',
    views: {
        'log': {
            templateUrl: '/module/log/alarm/alarm.html',
            controllerName: 'logAlarmController'
        }
    },
    parent: 'log',
    index: 2
};

export const LogMap = [
    //Log, PassLog, PassPerson, PassAlarm
] as Array<IRouterConfig>;