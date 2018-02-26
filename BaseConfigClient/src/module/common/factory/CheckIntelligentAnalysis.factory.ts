/**
 * Created by tj on 2017/8/2.
 */
import {app} from "../../common/app/main.app";
import { SystemConfig } from "../../common/system-config";
import { ModuleItemEx } from "../../../core/entity/ex/ModuleItemEx";
import { IBackRouterConfig } from "../../common/router/router";
import 'angular';

declare let angular: any;

export class MsgCenter{
    taskMsgNum:number = 0;
    feedbackMsgNum:number = 0;
    msgTotalNum:number = 0;
}

export interface ICheckIntelligentAnalysis {
    checkFaceTrack: Function;
    checkAccompanyingAnalysis: Function;
    checkFrequencyAnalysis: Function;
    checkAnalysis: Function;
}

class CheckIntelligentAnalysis implements ICheckIntelligentAnalysis {

    checkFaceTrack() {
        let temp = angular.fromJson(localStorage.getItem(SystemConfig.USER_INFO_KEY));
        let authorities = temp.JsonUserData.ModuleItemList as Array<ModuleItemEx>;
        for (let i = 0; i < authorities.length; i++) {
            if (authorities[i].FullNameSpacePath === "IntelligentAnalysis.FaceTrack") {
                return true;
            }
        }
        return false;
    }

    checkAccompanyingAnalysis() {
        let temp = angular.fromJson(localStorage.getItem(SystemConfig.USER_INFO_KEY));
        let authorities = temp.JsonUserData.ModuleItemList as Array<ModuleItemEx>;
        for (let i = 0; i < authorities.length; i++) {
            if (authorities[i].FullNameSpacePath === "IntelligentAnalysis.AccompanyingAnalysis") {
                return true;
            }
        }
        return false;
    }

    checkFrequencyAnalysis() {
        let temp = angular.fromJson(localStorage.getItem(SystemConfig.USER_INFO_KEY));
        let authorities = temp.JsonUserData.ModuleItemList as Array<ModuleItemEx>;
        for (let i = 0; i < authorities.length; i++) {
            if (authorities[i].FullNameSpacePath === "IntelligentAnalysis.FrequencyAnalysis") {
                return true;
            }
        }
        return false;
    }

    checkAnalysis() {
        let temp = angular.fromJson(localStorage.getItem(SystemConfig.USER_INFO_KEY));
        let authorities = temp.JsonUserData.ModuleItemList as Array<ModuleItemEx>;
        for (let i = 0; i < authorities.length; i++) {
            if (authorities[i].FullNameSpacePath === "IntelligentAnalysis.FaceGroup") {
                return true;
            }
        }
        return false;
    }
}

app
    .service('checkIntelligentAnalysis', CheckIntelligentAnalysis);
