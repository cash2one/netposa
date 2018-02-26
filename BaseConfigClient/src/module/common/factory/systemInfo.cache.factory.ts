/** create by chendm
 *
 * @time: 2017-11-28
 * @params:
 * @return:
 */
import {app} from "../../common/app/main.app";
import {SystemConfigParams} from "../../../core/entity/SystemConfigParams";

declare let angular: any;

export interface ISystemInfoCacheProvider {
    getSystemInfo(): SystemConfigParams;

    setSystemInfo(data: SystemConfigParams): void;
}

export class SystemInfoCacheProvider {
    constructor() {

    }

    getSystemInfo(): SystemConfigParams {
        let string = localStorage.getItem("systemData");
        let systemInfo: SystemConfigParams;
        let unSystemInfo: SystemConfigParams = {
            "AlarmPhotoNum": 3,
            "PhotoFind": 3,
            "Identity": 3,
            "IdentityValue": 80,
            "StoreTime": "6个月",
            "videoBeforeTime": 10,
            "videoAfterTime": 10,
            "desc": ""
        };
        if (string) {
            try {
                systemInfo = angular.fromJson(string);
            } catch (e) {
                console.log(e, "systemData ud doesn't jsonString");
                systemInfo = {
                    "AlarmPhotoNum": 3,
                    "PhotoFind": 3,
                    "Identity": 3,
                    "IdentityValue": 80,
                    "StoreTime": "6个月",
                    "videoBeforeTime": 10,
                    "videoAfterTime": 10,
                    "desc": ""
                };
            }

            unSystemInfo = {
                "AlarmPhotoNum": systemInfo.AlarmPhotoNum || 3,
                "PhotoFind": systemInfo.PhotoFind || 3,
                "Identity": systemInfo.Identity || 3,
                "IdentityValue": systemInfo.IdentityValue || 80,
                "StoreTime": systemInfo.StoreTime || "6个月",
                "videoBeforeTime": systemInfo.videoBeforeTime || 10,
                "videoAfterTime": systemInfo.videoAfterTime || 10,
                "desc": systemInfo.desc || ""
            };
        }
        return unSystemInfo;

    }

    setSystemInfo(data: SystemConfigParams) {
        let systemInfo: SystemConfigParams = {
            "AlarmPhotoNum": data.AlarmPhotoNum || 3,
            "PhotoFind": data.PhotoFind || 3,
            "Identity": data.Identity || 3,
            "IdentityValue": data.IdentityValue || 80,
            "StoreTime": data.StoreTime || "6个月",
            "videoBeforeTime": data.videoBeforeTime || 10,
            "videoAfterTime": data.videoAfterTime || 10,
            "desc": data.desc || ""
        };
        localStorage.setItem("systemData", angular.toJson(systemInfo));
        return 1;
    }
}

app.service('systemInfoCacheFactory', SystemInfoCacheProvider);

