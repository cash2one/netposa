/**
 * Created by dell on 2017/5/31.
 */
import {IRouterConfig} from "../router";
import {RouteKeyEnum} from "../enum/RouteKeyEnum";
import {GroupEnum} from "../enum/RouteGroupEnum";

const IntelligentRetrieval:IRouterConfig = {
    key: RouteKeyEnum.IntelligentRetrieval,
    url: '/intelligentretrieval',
    moduleName: '智能检索',
    controllerName: 'intelligentRetrievalController',
    controllerUrl: 'module/intelligentRetrieval/main/main.controller',
    controllerAs: 'intelligentRetrievalCtrl',
    templateUrl: '/module/intelligentRetrieval/main/main.html',
    redirectTo: RouteKeyEnum.TrailAnalysis,
    //hasChildRouteDownSelect: true
};

const TrailAnalysis:IRouterConfig = {
    key: RouteKeyEnum.TrailAnalysis,
    url: '/trailanalysis',
    moduleName: '轨迹分析',
    controllerName: 'trailAnalysisController',
    controllerUrl: 'module/intelligentRetrieval/trailAnalysis/trailAnalysis.controller',
    views: {
        'intelligentretrieval': {
            templateUrl: '/module/intelligentRetrieval/trailAnalysis/trailAnalysis.html',
            controllerName: 'trailAnalysisController',
            controllerAs: 'trailAnalysisCtrl'
        }
    },
    parent: RouteKeyEnum.IntelligentRetrieval,
    icon: 'trailAnalysis'
};

const FaceRetrieval:IRouterConfig = {
    key: RouteKeyEnum.FaceRetrieval,
    url: '/faceretrieval',
    moduleName: '人脸检索',
    controllerName: 'faceRetrievalController',
    controllerUrl: 'module/intelligentRetrieval/faceRetrieval/faceRetrieval.controller',
    views: {
        'intelligentretrieval': {
            templateUrl: '/module/intelligentRetrieval/faceRetrieval/faceRetrieval.html',
            controllerName: 'faceRetrievalController',
            controllerAs: 'faceRetrievalCtrl'
        }
    },
    parent: RouteKeyEnum.IntelligentRetrieval,
    icon: 'faceRetrieval'
};

const AlarmRetrieval:IRouterConfig = {
    key: RouteKeyEnum.AlarmRetrieval,
    url: '/alarmretrieval',
    moduleName: '报警检索',
    controllerName: 'alarmRetrievalController',
    controllerUrl: 'module/intelligentRetrieval/alarmRetrieval/alarmRetrieval.controller',
    views: {
        'intelligentretrieval': {
            templateUrl: '/module/intelligentRetrieval/alarmRetrieval/alarmRetrieval.html',
            controllerName: 'alarmRetrievalController',
            controllerAs: 'alarmRetrievalCtrl'
        }
    },
    parent: RouteKeyEnum.IntelligentRetrieval,
    icon: 'alarmRetrieval'
};

const RetrievalRecord:IRouterConfig = {
    key: RouteKeyEnum.RetrievalRecord,
    url: '/retrievalrecord',
    moduleName: '检索记录',
    controllerName: 'retrievalRecordController',
    controllerUrl: 'module/intelligentRetrieval/retrievalRecord/retrievalRecord.controller',
    views: {
        'intelligentretrieval': {
            templateUrl: '/module/intelligentRetrieval/retrievalRecord/retrievalRecord.html',
            controllerName: 'retrievalRecordController',
            controllerAs: 'retrievalRecordCtrl'
        }
    },
    parent: RouteKeyEnum.IntelligentRetrieval,
    icon: 'retrievalRecord'
};

export const IntelligentRetrievalMap = [
    IntelligentRetrieval,TrailAnalysis,FaceRetrieval,AlarmRetrieval,RetrievalRecord
] as Array<IRouterConfig>;