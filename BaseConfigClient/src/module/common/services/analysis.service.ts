import {app} from "../app/main.app";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {IResponseNotifyFactory} from "../factory/response.notify.factory";
import {OperFitstModule} from "../../../core/entity/OperFirstModule";
import {OperThirdModule} from "../../../core/entity/OperThirdModule";
import {OperSecondModule} from "../../../core/entity/OperSecondModule";
import {OperActionType} from '../../../core/entity/OperActionType';
import {ISystemLogFactory} from "../factory/SystemLog.factory";
import  "../factory/SystemLog.factory";
declare let angular: any, $: any, require: any;

export interface IAnalysisService {
    searchFaceTrack(params: any): Promise<ResponseResult<any>>;

    faceAnalysis(params: any): Promise<ResponseResult<any>>;

    searchPersonAlarm(params: any): Promise<ResponseResult<any>>;

    searchAccompanying(params: any): Promise<ResponseResult<any>>;

    findRealyInfo(params: Array<string>): Promise<ResponseResult<any>>;

    faceFrequencyAnalysis(params: any): Promise<ResponseResult<any>>;

    faceFrequencyAppear(params: any): Promise<ResponseResult<any>>;

    getOffLineList(params: any): Promise<ResponseResult<any>>;

    getOffLineDetail(params: any): Promise<ResponseResult<any>>;

    deleteOffLineDetail(params: any): Promise<ResponseResult<any>>;

    searchMacAccompanying(params: any): Promise<ResponseResult<any>>;

    FaceCollisionAccompanying(params: any): Promise<ResponseResult<any>>;

    searchMacFrequency(params: any): Promise<ResponseResult<any>>;

    macCollision(params: any): Promise<ResponseResult<any>>;

    macAlarm(params: any): Promise<ResponseResult<any>>;

    faceToMac(params: any): Promise<ResponseResult<any>>;

    macToFace(params: any): Promise<ResponseResult<any>>;

    faceverify(params: any): Promise<ResponseResult<any>>;
}

class AnalysisService implements IAnalysisService {

    static $inject: Array<string> = ['$http', '$q', 'notifyFactory','systemLogFactory'];
    private notifyFunc: (res: ResponseResult<any>) => ResponseResult<any>;

    constructor(private $http: any, private $q: any, private notifyFactory: IResponseNotifyFactory, private systemLogFactory: ISystemLogFactory) {
        this.notifyFunc = this.notifyFactory.msg();
    }

    searchFaceTrack(params: any): Promise<ResponseResult<any>> {
        return this.$http({
            method: "POST",
            url: "/pdp/faceCtrl/search/accessLog",
            data: params
        }).then(
            this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFitstModule.IntelligentAnalysis.code,
                OperSecondModule: OperSecondModule.IntelligentAnalysis_Face.code,
                OperThirdModule: OperThirdModule.IntelligentAnalysis_Face_Track.code,
                ActionType: OperActionType.Query.code
            }))
    }

    findRealyInfo(params: Array<string>) {
        return this.$http({
            method: "POST",
            url: "/db/analysis/searchrealyinfo",
            data: {ids: params}
        }).then(this.notifyFunc)
    }

    faceAnalysis(params: any) {
        return this.$http({
            method: 'post',
            url: '/pdp/search/searchface',
            data: params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.IntelligentAnalysis.code,
            OperSecondModule: OperSecondModule.IntelligentAnalysis_Face.code,
            OperThirdModule: OperThirdModule.IntelligentAnalysis_Face_Analysis.code,
            ActionType: OperActionType.Query.code
        }))
    }

    searchPersonAlarm(params: any) {
        return this.$http({
            method: 'post',
            url: '/pdp/search/alarmlog',
            data: params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.IntelligentAnalysis.code,
            OperSecondModule: OperSecondModule.IntelligentAnalysis_Face.code,
            OperThirdModule: OperThirdModule.IntelligentAnalysis_Face_AlarmAnalysis.code,
            ActionType: OperActionType.Query.code
        }))
    }

    searchAccompanying(params: any) {
        return this.$http({
            method: 'post',
            url: '/pdp/faceCtrl/accompany/analyse',
            data: params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.IntelligentAnalysis.code,
            OperSecondModule: OperSecondModule.IntelligentAnalysis_Face.code,
            OperThirdModule: OperThirdModule.IntelligentAnalysis_Face_AccompanyAnalysis.code,
            ActionType: OperActionType.Query.code
        }))
    }

    faceFrequencyAnalysis(params: any) {
        return this.$http({
            method: 'post',
            url: '/pdp/faceCtrl/frequency/analyse',
            data: params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.IntelligentAnalysis.code,
            OperSecondModule: OperSecondModule.IntelligentAnalysis_Face.code,
            OperThirdModule: OperThirdModule.IntelligentAnalysis_Face_FrequencyAnalysis.code,
            ActionType: OperActionType.Query.code
        }))
    }

    faceFrequencyAppear(params: any) {
        return this.$http({
            method: 'post',
            url: '/pdp/faceCtrl/frequency/appear',
            data: params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.IntelligentAnalysis.code,
            OperSecondModule: OperSecondModule.IntelligentAnalysis_Face.code,
            OperThirdModule: OperThirdModule.IntelligentAnalysis_Face_FrequencyAppear.code,
            ActionType: OperActionType.Query.code
        }))
    }

    getOffLineList(params: any) {
        return this.$http({
            method: 'post',
            url: '/db/analysis/findlistwithofflinetask',
            data: params
        })
    }

    getOffLineDetail(params: any) {
        return this.$http({
            method: 'post',
            url: '/pdp/configCtrl/analyseTask/detail',
            data: params
        })
    }

    deleteOffLineDetail(params: any) {
        return this.$http({
            method: 'post',
            url: '/pdp/IntelligentAnalyse/deleteTask',
            params: params
        }).then(this.notifyFunc)
    }

    searchMacAccompanying(params: any) {
        return this.$http({
            method: 'post',
            url: '/pdp/rfidCtrl/mac/followAnalyse',
            data: params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.IntelligentAnalysis.code,
            OperSecondModule: OperSecondModule.IntelligentAnalysis_Mac.code,
            OperThirdModule: OperThirdModule.IntelligentAnalysis_Mac_Accompany.code,
            ActionType: OperActionType.Query.code
        }))
    }

    FaceCollisionAccompanying(params: any) {
        return this.$http({
            method: 'post',
            url: '/pdp/faceCtrl/impact/analyse',
            data: params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.IntelligentAnalysis.code,
            OperSecondModule: OperSecondModule.IntelligentAnalysis_Face.code,
            OperThirdModule: OperThirdModule.IntelligentAnalysis_Face_CrashAnalysis.code,
            ActionType: OperActionType.Query.code
        }))
    }

    searchMacFrequency(params: any) {
        return this.$http({
            method: 'post',
            url: '/pdp/rfidCtrl/mac/frequencyAnalyse',
            data: params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.IntelligentAnalysis.code,
            OperSecondModule: OperSecondModule.IntelligentAnalysis_Mac.code,
            OperThirdModule: OperThirdModule.IntelligentAnalysis_Mac_Frequency.code,
            ActionType: OperActionType.Query.code
        }))
    }

    macCollision(params: any) {
        return this.$http({
            method: 'post',
            url: '/pdp/rfidCtrl/mac/impactAnalyse',
            data: params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.IntelligentAnalysis.code,
            OperSecondModule: OperSecondModule.IntelligentAnalysis_Mac.code,
            OperThirdModule: OperThirdModule.IntelligentAnalysis_Mac_Crash.code,
            ActionType: OperActionType.Query.code
        }))
    }

    macAlarm(params: any) {
        return this.$http({
            method: 'post',
            url: '/pdp/rfidCtrl/mac/alarmAnalyse',
            data: params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.IntelligentAnalysis.code,
            OperSecondModule: OperSecondModule.IntelligentAnalysis_Mac.code,
            OperThirdModule: OperThirdModule.IntelligentAnalysis_Mac_Alarm.code,
            ActionType: OperActionType.Query.code
        }))
    }

    faceToMac(params: any) {
        return this.$http({
            method: 'post',
            url: '/pdp/rfidCtrl/FaceImpactMac/analyse',
            data: params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.IntelligentAnalysis.code,
            OperSecondModule: OperSecondModule.IntelligentAnalysis_Mac.code,
            OperThirdModule: OperThirdModule.IntelligentAnalysis_More_FaceMacCrash.code,
            ActionType: OperActionType.Query.code
        }))
    }

    macToFace(params: any) {
        return this.$http({
            method: 'post',
            url: '/pdp/rfidCtrl/MacImpactFace/analyse',
            data: params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.IntelligentAnalysis.code,
            OperSecondModule: OperSecondModule.IntelligentAnalysis_Mac.code,
            OperThirdModule: OperThirdModule.IntelligentAnalysis_More_FaceMacCrash.code,
            ActionType: OperActionType.Query.code
        }))
    }



    faceverify(params: any) {
        return this.$http({
            method: 'post',
            url: '/pdp/search/faceverify',
            params: params
        })
    }
}

app.service('analysisService', AnalysisService);