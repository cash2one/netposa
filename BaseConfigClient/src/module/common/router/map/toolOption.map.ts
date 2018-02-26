/**
 * Created by tj on 2017/7/1.
 */
import {IRouterConfig} from "../router";
import {RouteKeyEnum} from "../enum/RouteKeyEnum";
import {GroupEnum} from "../enum/RouteGroupEnum";

const ToolOption: IRouterConfig = {
    key: RouteKeyEnum.ToolOption,
    url: '/toolOption',
    moduleName: '选项',
    controllerName: 'toolOptionController',
    controllerUrl: 'module/toolOption/main/main.controller',
    templateUrl: '/module/toolOption/main/main.html',
    controllerAs: 'toolOptionCtrl'
};

// const Comparison: IRouterConfig = {
//     key: RouteKeyEnum.Comparison,
//     url: '/comparison',
//     moduleName: '比对',
//     controllerUrl: 'module/toolOption/comparison/comparison.controller',
//     views: {
//         "toolOption": {
//             controllerName: 'comparisonController',
//             controllerAs: 'comparisonCtrl',
//             templateUrl: '/module/toolOption/comparison/comparison.html'
//         }
//     },
//     icon: 'comparison',
//     parent: RouteKeyEnum.ToolOption
// };


const MyCollect: IRouterConfig = {
    key: RouteKeyEnum.MyCollect,
    url: '/myCollect',
    moduleName: '我的收藏',
    controllerUrl: 'module/toolOption/myCollect/main.controller',
    views: {
        "toolOption": {
            controllerName: 'MyCollectController',
            controllerAs: 'myCollectCtrl',
            templateUrl: '/module/toolOption/myCollect/main.html'
        }
    },
    icon: 'suggestions',
    parent: RouteKeyEnum.ToolOption
};

const MyCheck: IRouterConfig = {
    key: RouteKeyEnum.MyCheck,
    url: '/myCheck',
    moduleName: '我的审核',
    controllerUrl: 'module/toolOption/myCheck/main.controller',
    views: {
        "toolOption": {
            controllerName: 'MyCheckController',
            controllerAs: 'myCheckCtrl',
            templateUrl: '/module/toolOption/myCheck/main.html'
        }
    },
    icon: 'suggestions',
    parent: RouteKeyEnum.ToolOption
};

const MyReport: IRouterConfig = {
    key: RouteKeyEnum.MyReport,
    url: '/myReport',
    moduleName: '我的报警',
    controllerUrl: 'module/toolOption/myReport/main.controller',
    views: {
        "toolOption": {
            controllerName: 'MyReportController',
            controllerAs: 'myReportCtrl',
            templateUrl: '/module/toolOption/myReport/main.html'
        }
    },
    icon: 'suggestions',
    parent: RouteKeyEnum.ToolOption
};

const Suggestions: IRouterConfig = {
    key: RouteKeyEnum.Suggestions,
    url: '/suggestions',
    moduleName: '意见反馈',
    controllerUrl: 'module/toolOption/suggestions/suggestions.controller',
    views: {
        "toolOption": {
            controllerName: 'suggestionsController',
            controllerAs: 'suggestionsCtrl',
            templateUrl: '/module/toolOption/suggestions/suggestions.html'
        }
    },
    icon: 'suggestions',
    parent: RouteKeyEnum.ToolOption
};

// const DownCenter: IRouterConfig = {
//     key: RouteKeyEnum.DownCenter,
//     url: '/downCenter',
//     moduleName: '下载中心',
//     controllerUrl: 'module/toolOption/downCenter/downCenter.controller',
//     views: {
//         "toolOption": {
//             controllerName: 'downCenterController',
//             controllerAs: 'downCenterCtrl',
//             templateUrl: '/module/toolOption/downCenter/downCenter.html'
//         }
//     },
//     icon: 'downCenter',
//     parent: RouteKeyEnum.ToolOption
// };


export const ToolOptionMap = [
    ToolOption, MyCollect, MyCheck, MyReport, Suggestions
] as Array<IRouterConfig>;