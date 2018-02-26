/**
 * Created by dell on 2017/5/31.
 */
import {IRouterConfig} from "../router";
import {RouteKeyEnum} from "../enum/RouteKeyEnum";
import {GroupEnum} from "../enum/RouteGroupEnum";


const IntelligentAnalysis:IRouterConfig = {
    key: RouteKeyEnum.IntelligentAnalysis,
    url: '/IntelligentAnalysis?type',
    moduleName: '智能分析',
    controllerName: 'IntelligentAnalysisController',
    controllerUrl: 'module/IntelligentAnalysis/main/main.controller',
    controllerAs: 'IntelligentAnalysisCtrl',
    templateUrl: '/module/IntelligentAnalysis/main/main.html'
};
const FaceTrack:IRouterConfig = {
    key: RouteKeyEnum.FaceTrack,
    url: '/FaceTrack',
    moduleName: '人脸轨迹',
    controllerName: 'FaceTrackController',
    controllerUrl: 'module/IntelligentAnalysis/FaceTrack/FaceTrack.controller',
    views: {
        'analysis': {
            templateUrl: '/module/IntelligentAnalysis/FaceTrack/FaceTrack.html',
            controllerName: 'FaceTrackController',
            controllerAs: 'FaceTrackCrtl'
        }
    },
    group: GroupEnum.IntelligentAnalysisGroup,
    parent: RouteKeyEnum.IntelligentAnalysis,
    icon: null
};

const FaceAnalysis:IRouterConfig = {
    key: RouteKeyEnum.FaceAnalysis,
    url: '/FaceAnalysis',
    moduleName: '人脸分析',
    controllerName: 'FaceAnalysisController',
    controllerUrl: 'module/IntelligentAnalysis/FaceAnalysis/FaceAnalysis.controller',
    views: {
        'analysis': {
            templateUrl: '/module/IntelligentAnalysis/FaceAnalysis/FaceAnalysis.html',
            controllerName: 'FaceAnalysisController',
            controllerAs: 'FaceAnalysisCtrl'
        }
    },
    group: GroupEnum.IntelligentAnalysisGroup,
    parent: RouteKeyEnum.IntelligentAnalysis,
    icon: null
};

const AccompanyingAnalysis:IRouterConfig = {
    key: RouteKeyEnum.AccompanyingAnalysis,
    url: '/AccompanyingAnalysis',
    moduleName: '伴随分析',
    controllerName: 'AccompanyingAnalysisController',
    controllerUrl: 'module/IntelligentAnalysis/AccompanyingAnalysis/AccompanyingAnalysis.controller',
    views: {
        'analysis': {
            templateUrl: '/module/IntelligentAnalysis/AccompanyingAnalysis/AccompanyingAnalysis.html',
            controllerName: 'AccompanyingAnalysisController',
            controllerAs: 'AccompanyingAnalysisCrtl'
        }
    },
    group: GroupEnum.IntelligentAnalysisGroup,
    parent: RouteKeyEnum.IntelligentAnalysis,
    icon: null
};

const AlarmAnalysis:IRouterConfig = {
    key: RouteKeyEnum.AlarmAnalysis,
    url: '/AlarmAnalysis',
    moduleName: '伴随分析',
    controllerName: 'PersonAlarmController',
    controllerUrl: 'module/IntelligentAnalysis/PersonAlarm/PersonAlarm.controller',
    views: {
        'analysis': {
            templateUrl: '/module/IntelligentAnalysis/PersonAlarm/PersonAlarm.html',
            controllerName: 'PersonAlarmController',
            controllerAs: 'PersonAlarmCtrl'
        }
    },
    group: GroupEnum.IntelligentAnalysisGroup,
    parent: RouteKeyEnum.IntelligentAnalysis,
    icon: null
};

const FrequencyAnalysis:IRouterConfig = {
    key: RouteKeyEnum.FrequencyAnalysis,
    url: '/FrequencyAnalysis',
    moduleName: '频次分析',
    controllerName: 'FrequencyAnalysisController',
    controllerUrl: 'module/IntelligentAnalysis/FrequencyAnalysis/FrequencyAnalysis.controller',
    views: {
        'analysis': {
            templateUrl: '/module/IntelligentAnalysis/FrequencyAnalysis/FrequencyAnalysis.html',
            controllerName: 'FrequencyAnalysisController',
            controllerAs: 'FrequencyAnalysisCtrl'
        }
    },
    group: GroupEnum.IntelligentAnalysisGroup,
    parent: RouteKeyEnum.IntelligentAnalysis,
    icon: null
};

const FrequencyAppear:IRouterConfig = {
    key: RouteKeyEnum.FrequencyAppear,
    url: '/FrequencyAppear',
    moduleName: '频次分析',
    controllerName: 'FrequencyAppearController',
    controllerUrl: 'module/IntelligentAnalysis/FrequencyAppear/FrequencyAppear.controller',
    views: {
        'analysis': {
            templateUrl: '/module/IntelligentAnalysis/FrequencyAppear/FrequencyAppear.html',
            controllerName: 'FrequencyAppearController',
            controllerAs: 'FrequencyAppearCtrl'
        }
    },
    group: GroupEnum.IntelligentAnalysisGroup,
    parent: RouteKeyEnum.IntelligentAnalysis,
    icon: null
};

const FaceCollisionAnalysis:IRouterConfig = {
    key: RouteKeyEnum.FaceCollisionAnalysis,
    url: '/FaceCollisionAnalysis',
    moduleName: '碰撞分析',
    controllerName: 'FaceCollisionAnalysisController',
    controllerUrl: 'module/IntelligentAnalysis/FaceCollisionAnalysis/FaceCollisionAnalysis.controller',
    views: {
        'analysis': {
            templateUrl: '/module/IntelligentAnalysis/FaceCollisionAnalysis/FaceCollisionAnalysis.html',
            controllerName: 'FaceCollisionAnalysisController',
            controllerAs: 'FaceCollisionAnalysisCtrl'
        }
    },
    group: GroupEnum.IntelligentAnalysisGroup,
    parent: RouteKeyEnum.IntelligentAnalysis,
    icon: null
};

const CarAnalysis:IRouterConfig = {
    key: RouteKeyEnum.CarAnalysis,
    url: '/CarAnalysis',
    moduleName: '套牌分析',
    controllerName: 'CarAnalysisController',
    controllerUrl: 'module/IntelligentAnalysis/CarAnalysis/CarAnalysis.controller',
    views: {
        'analysis': {
            templateUrl: '/module/IntelligentAnalysis/CarAnalysis/CarAnalysis.html',
            controllerName: 'CarAnalysisController',
            controllerAs: 'CarAnalysisCtrl'
        }
    },
    group: GroupEnum.IntelligentAnalysisGroup,
    parent: RouteKeyEnum.IntelligentAnalysis,
    icon: null
};

// Mac碰撞
const MacCrash:IRouterConfig = {
    key: RouteKeyEnum.MacCrash,
    url: '/MacCrash',
    moduleName: 'Mac碰撞',
    controllerName: 'macCollisionAnalysisController',
    controllerUrl: 'module/IntelligentAnalysis/MacCollisionAnalysis/MacCollisionAnalysis.controller',
    views: {
        'analysis': {
            templateUrl: '/module/IntelligentAnalysis/MacCollisionAnalysis/MacCollisionAnalysis.html',
            controllerName: 'macCollisionAnalysisController',
            controllerAs: 'macCollisionCtrl'
        }
    },
    group: GroupEnum.IntelligentAnalysisGroup,
    parent: RouteKeyEnum.IntelligentAnalysis,
    icon: null
};

// 人脸MAC碰撞
const FaceMacCrash:IRouterConfig = {
    key: RouteKeyEnum.FaceMacCrash,
    url: '/FaceMacCrash',
    moduleName: '人脸MAC碰撞',
    controllerName: 'FaceMacCrashCtrl',
    controllerUrl: 'module/IntelligentAnalysis/FaceMacCrash/FaceMacCrash.controller',
    views: {
        'analysis': {
            templateUrl: '/module/IntelligentAnalysis/FaceMacCrash/FaceMacCrash.html',
            controllerName: 'FaceMacCrashController',
            controllerAs: 'FaceMacCrashCtrl'
        }
    },
    group: GroupEnum.IntelligentAnalysisGroup,
    parent: RouteKeyEnum.IntelligentAnalysis,
    icon: null
};
//
// // Mac轨迹
// const MacTrack:IRouterConfig = {
//     key: RouteKeyEnum.MacTrack,
//     url: '/MacTrack',
//     moduleName: 'Mac轨迹',
//     controllerName: 'MacTrackCtrl',
//     controllerUrl: 'module/IntelligentAnalysis/MacTrack/MacTrack.controller',
//     views: {
//         'analysis': {
//             templateUrl: '/module/IntelligentAnalysis/MacTrack/MacTrack.html',
//             controllerName: 'MacTrackController',
//             controllerAs: 'MacTrackCtrl'
//         }
//     },
//     group: GroupEnum.IntelligentAnalysisGroup,
//     parent: RouteKeyEnum.IntelligentAnalysis,
//     icon: null
// };
//
// // Mac伴随
// const MacAccompany:IRouterConfig = {
//     key: RouteKeyEnum.MacAccompany,
//     url: '/MacAccompany',
//     moduleName: 'Mac伴随',
//     controllerName: 'MacAccompanyCtrl',
//     controllerUrl: 'module/IntelligentAnalysis/MacAccompany/MacAccompany.controller',
//     views: {
//         'analysis': {
//             templateUrl: '/module/IntelligentAnalysis/MacAccompany/MacAccompany.html',
//             controllerName: 'MacAccompanyController',
//             controllerAs: 'MacAccompanyCtrl'
//         }
//     },
//     group: GroupEnum.IntelligentAnalysisGroup,
//     parent: RouteKeyEnum.IntelligentAnalysis,
//     icon: null
// };
//
// // Mac频次
// const MacFrequency:IRouterConfig = {
//     key: RouteKeyEnum.MacFrequency,
//     url: '/MacFrequency',
//     moduleName: 'MAC频次',
//     controllerName: 'MacFrequencyCtrl',
//     controllerUrl: 'module/IntelligentAnalysis/MacFrequency/MacFrequency.controller',
//     views: {
//         'analysis': {
//             templateUrl: '/module/IntelligentAnalysis/MacFrequency/MacFrequency.html',
//             controllerName: 'MacFrequencyController',
//             controllerAs: 'MacFrequencyCtrl'
//         }
//     },
//     group: GroupEnum.IntelligentAnalysisGroup,
//     parent: RouteKeyEnum.IntelligentAnalysis,
//     icon: null
// };

// 车辆MAC碰撞
const MacCarCrash:IRouterConfig = {
    key: RouteKeyEnum.MacCarCrash,
    url: '/MacCarCrash',
    moduleName: '车辆MAC碰撞',
    controllerName: 'MacCarCrashCtrl',
    controllerUrl: 'module/IntelligentAnalysis/MacCarCrash/MacCarCrash.controller',
    views: {
        'analysis': {
            templateUrl: '/module/IntelligentAnalysis/MacCarCrash/MacCarCrash.html',
            controllerName: 'MacCarCrashController',
            controllerAs: 'MacCarCrashCtrl'
        }
    },
    group: GroupEnum.IntelligentAnalysisGroup,
    parent: RouteKeyEnum.IntelligentAnalysis,
    icon: null
};
//
// // MAC报警
// const MacAlarm:IRouterConfig = {
//     key: RouteKeyEnum.MacAlarm,
//     url: '/MacAlarm',
//     moduleName: 'Mac碰撞',
//     controllerName: 'MacAlarmCtrl',
//     controllerUrl: 'module/IntelligentAnalysis/MacAlarm/MacAlarm.controller',
//     views: {
//         'analysis': {
//             templateUrl: '/module/IntelligentAnalysis/MacAlarm/MacAlarm.html',
//             controllerName: 'MacAlarmController',
//             controllerAs: 'MacAlarmCtrl'
//         }
//     },
//     group: GroupEnum.IntelligentAnalysisGroup,
//     parent: RouteKeyEnum.IntelligentAnalysis,
//     icon: null
// };

export const IntelligentAnalysisMap = [
    IntelligentAnalysis,FaceTrack,FaceAnalysis,AccompanyingAnalysis,AlarmAnalysis,FrequencyAnalysis,FrequencyAppear, FaceCollisionAnalysis,
    CarAnalysis,MacCrash,FaceMacCrash,MacCarCrash,
    // MacAlarm,MacTrack,MacAccompany,MacFrequency
] as Array<IRouterConfig>;