/**
 * Created by dell on 2017/4/11.
 */

import {app} from "../app/main.app";
import "angular";
import {LayerType} from "../../../core/enum/LayerType";

declare let angular: any;

class DefaultValue {

    static instance = function () {
        return function (value: any, defaultValue: string) {
            if (value == null) {
                return defaultValue;
            }
            return value;
        }
    }
}

class GetValueFromListByIndex {
    static instance = function () {
        return function (value: Array<any>, index: number, defaultValue: string) {
            defaultValue = defaultValue ? defaultValue : "";
            let len = 0, result = defaultValue;
            if (value && value.length > 0) {
                len = value.length;
                if (index > len - 1) {
                    index = len - 1;
                }
                result = value[index];
            }
            return result;
        }
    }
}

class AddImagePrefix {
    static instance = function () {
        return function (value: string, prefix: string) {
            if (value) {
                value = prefix + value;
            }
            return value;
        }
    }
}

/** create by zxq
 *  枚举 根据枚举类 、枚举键值 获取 对应的 value
 * @time: 2017-06-15 15:53:23
 * @params: enumClass 枚举数据，enumValue 枚举 value值
 * @return: enumText :string 枚举类型 text 值，找不到 默认 未知
 */
class ToEnumText {
    static instance = function () {
        return function (enumClass: any, enumValue: any) {
            let len = 0, result = "未知";
            if (angular.isUndefined(enumClass) || angular.isUndefined(enumValue)) {
                return result;
            }
            for (let k in enumClass) {
                if (enumClass[k].value == enumValue) {
                    return enumClass[k].text;
                }
            }
            return result;
        }
    }
}

const IodEmu = {
    Wifi: {key: 'Wifi', value: 'Wi-Fi'},
    WiFi: {key: 'WiFi', value: 'Wi-Fi'},
    ElecFence: {key: 'ElecFence', value: '电子围栏'},
    EFENCE: {key: 'EFENCE', value: '电子围栏'},
    Gate: {key: 'Gate', value: '卡口'},
    RmpGate: {key: 'RmpGate', value: '卡口'},
    Camera: {key: 'Camera', value: '摄相机'}
};

class toIodText {
    static instance = () => {
        return function (value: string) {
            if (value == "0.000000") {
                return '未知'
            }
            switch (value) {
                case IodEmu.Wifi.key:
                    return IodEmu.Wifi.value;
                case IodEmu.WiFi.key:
                    return IodEmu.WiFi.value;
                case IodEmu.ElecFence.key:
                    return IodEmu.ElecFence.value;
                case IodEmu.EFENCE.key:
                    return IodEmu.EFENCE.value;
                case IodEmu.Gate.key:
                    return IodEmu.Gate.value;
                case IodEmu.RmpGate.key:
                    return IodEmu.RmpGate.value;
                case IodEmu.Camera.key:
                    return IodEmu.Camera.value;
                default:
                    return '未知'
            }
        }
    }
}

const CameraTypeEmu = {
    HighCamera: {key: 'HighCamera', value: '高清摄像机'},
    FaceCamera: {key: 'FaceCamera', value: '人脸摄像机'},
    CarCamera: {key: 'CarCamera', value: '车辆摄像机'},
    PortraitCamera: {key: 'PortraitCamera', value: '人像摄相机'}
};

class toCameraTypeText {
    static instance = () => {
        return function (value: string) {
            switch (value) {
                case CameraTypeEmu.HighCamera.key:
                    return CameraTypeEmu.HighCamera.value;
                case CameraTypeEmu.FaceCamera.key:
                    return CameraTypeEmu.FaceCamera.value;
                case CameraTypeEmu.CarCamera.key:
                    return CameraTypeEmu.CarCamera.value;
                case CameraTypeEmu.PortraitCamera.key:
                    return CameraTypeEmu.PortraitCamera.value;
                default:
                    return '未知'
            }
        }
    }
}

class ToEntryTypeFilter {
    static instance = function () {
        let map = {} as { [key: string]: string };
        for (let k in LayerType) {
            map[LayerType[k].value] = LayerType[k].text;
        }
        return function (val: string, defaultStr: string) {
            return map[val] || defaultStr;
        }
    }
}

import {TaskStatus} from "../../../core/server/enum/TaskStatus";

class MonitorStatus {
    static instance() {
        return function (value: string) {
            switch (value) {
                case TaskStatus.Run.value:
                    return TaskStatus.Run.text;
                case TaskStatus.Overdue.value:
                    return TaskStatus.Overdue.text;
                case TaskStatus.Waiting.value:
                    return TaskStatus.Waiting.text;
                case TaskStatus.Stop.value:
                    return TaskStatus.Stop.text;
                default:
                    return '未知';
            }
        }
    }
}

import {AuditStatus} from "../../../core/server/enum/AuditStatus";

class AuditStatusFilter {
    static instance() {
        return function (value: string) {
            switch (value) {
                case AuditStatus.Refuse.value:
                    return AuditStatus.Refuse.text;
                case AuditStatus.Verifing.value:
                    return AuditStatus.Verifing.text;
                case AuditStatus.Verified.value:
                    return AuditStatus.Verified.text;
                default:
                    return '未知';
            }
        }
    }
}

import {AuthStatus as TaskAuth} from '../../../core/server/enum/AuthStatus'

class AuthStatus {
    static instance() {
        return function (value: string) {
            switch (value) {
                case TaskAuth.Self.value:
                    return TaskAuth.Self.text;
                case TaskAuth.Part.value:
                    return TaskAuth.Part.text;
                case TaskAuth.EveryBody.value:
                    return TaskAuth.EveryBody.text;
                default:
                    return '未知';
            }
        }
    }
}

class CarType {
    static instance() {
        return function (value: string) {
            switch (value) {
                case 'Black':
                    return '黑名单';
                case 'White':
                    return '白名单';
                case 'Red':
                    return '红名单';
                default:
                    return '未知';
            }
        }
    }
}

/** create by zyh
 *  权限控制的key 取值过滤器
 * @time: 2017-08-01
 * @params: mouleList 权限key
 * @return: key 页面对应功能按钮 权限的 key
 */
class CheckAuthority {
    static $inject = ['mouleList']
    static instance = function (mouleList: { [key: string]: Boolean }) {
        return function (key: string) {
            if (!!mouleList[key]) {
                return true;
            }
            return false;
        }
    }
}


class ImageUrlFilter {
    static instance = function () {
        return function (url: string) {
            let Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
            let objExp = new RegExp(Expression);
            if (objExp.test(url) == true) {
                return url;
            } else {
                return `/bigdata/images/${url}`;
            }
        }
    }
}

class GenderFilter {
    static instance = function () {
        return function (value: string) {
            if (value == '0' || value === 'Men') {
                return '男';
            } else if (value == '1' || value === 'Women') {
                return '女';
            } else {
                return '未知';
            }
        }
    }
}

class RoundNumber {
    static instance = function () {
        return function (value: number) {
            if ((typeof value).toLocaleLowerCase() === 'number') {
                return Math.floor(value)
            } else {
                return 0;
            }
        }
    }
}

class MarkFilter {
    static instance = function () {
        return function (value: number) {
            switch (value) {
                case 1:
                    return '戴口罩';
                case 0:
                    return '不戴口罩';
                case -1:
                    return '未知';
                default:
                    return '';
            }
        }
    }
}

class GlassFilter {
    static instance = function () {
        return function (value: number) {
            switch (value) {
                case 0:
                    return '太阳眼镜';
                case 1:
                    return '普通眼镜';
                case -1:
                    return '未知';
                default:
                    return '';
            }
        }
    }
}

class IsPantsFilter {
    static instance = function () {
        return function (value: number) {
            switch (value) {
                case 0:
                    return '未穿短裤';
                case 1:
                    return '穿短裤';
                default:
                    return ' ';
            }
        }
    }
}

class IsSleeveFilter {
    static instance = function () {
        return function (value: number) {
            switch (value) {
                case 0:
                    return '未穿短袖';
                case 1:
                    return '穿短袖';
                default:
                    return ' ';
            }
        }
    }
}

class MaskFilter {
    static instance = function () {
        return function (value: number) {
            switch (value) {
                case 0:
                    return '不戴口罩';
                case 1:
                    return '带口罩';
                case -1:
                    return '未知';
                default:
                    return '';
            }
        }
    }
}

class OrientationFilter {
    static instance = function () {
        return function (value: string) {
            switch (value) {
                case '0':
                    return '朝右';
                case '1':
                    return '朝后';
                case '2':
                    return '朝左';
                case '3':
                    return '朝前';
                default:
                    return '未知';
            }
        }
    }
}

class SmileFilter {
    static instance = function () {
        return function (value: number) {
            switch (value) {
                case 0:
                    return '没微笑';
                case 1:
                    return '微笑';
                default:
                    return ' ';
            }
        }
    }
}

class HideUnknowFilter {
    static instance = function () {
        return function (value: string) {
            if (value === '未知') {
                return ''
            } else {
                return value
            }
        }
    }
}


import {getAgeList, Age, Enum} from "../../IntelligentAnalysis/AnalysisEnum";

class AgeToGroupAge {
    static instance = function () {
        return function (value: number) {
            let ageData = getAgeList();
            let result: string;
            for (let i = 0; i < ageData.length; i++) {
                let item: Enum<Age> = ageData[i];
                if (value >= item.value.minAge && value <= item.value.maxAge) {
                    result = item.text;
                    break;
                }
            }
            return result ? result : '未知';
        }
    }
}

/** create by zxq
 *  图片路径过滤器
 * @time: 2017-06-15 15:53:23
 */
class ToFiltImgUrl {
    static instance = function () {
        return function (url: string) {
            if (!!url && angular.isString(url)) {
                let filtImgUrl: string;
                filtImgUrl = url.replace(/:6552/, ':6551')
                return filtImgUrl;
            }
        }
    }
}

class ToFiltSlice {
    static instance = function () {
        return function (arg: Array<any>, keyname: string, value: number) {
            if (arg && arg.length) {
                return arg.slice(0, value);
            } else {
                return []
            }
        }
    }
}

class ObjectTypeFilter {
    static instance = function () {
        let map = {} as { [key: string]: string };
        for (let k in ObjectType) {
            map[ObjectType[k].value] = ObjectType[k].text;
        }
        return function (val: string, defaultStr: string) {
            return map[val] || defaultStr;
        }
    }
}

class AlarmResponseStateFilter {
    static instance = function () {
        let map = {} as { [key: string]: string };
        for (let k in AlarmResponseState) {
            map[AlarmResponseState[k].value] = AlarmResponseState[k].text;
        }
        return function (val: string, defaultStr: string) {
            return map[val] || defaultStr;
        }
    }
}

class IsLongEffectiveFilter {
    static instance = function () {
        return function (val: string & boolean & number) {
            if (val === '1' || val === 1 || val === 'true' || val === true) {
                return true;
            } else {
                return false;
            }
        }
    }
}

import {AccessLog} from "../../../core/server/AccessLog";
import {ObjectType} from '../../../core/enum/ObjectType';
import {AlarmResponseState} from '../../../core/enum/AlarmResponseState';
import {PageParams} from '../../../core/params/PageParams';


app.filter("defaultValue", DefaultValue.instance);
app.filter("getValueFromListByIndex", GetValueFromListByIndex.instance);
app.filter("addImagePrefix", AddImagePrefix.instance);
app.filter("toEnumTextFilter", ToEnumText.instance);
app.filter("toIodTextFilter", toIodText.instance);
app.filter('monitorStatus', MonitorStatus.instance);
app.filter('authStatus', AuthStatus.instance);
app.filter('carType', CarType.instance);
app.filter('auditStatusFilter', AuditStatusFilter.instance);
app.filter("checkAuthority", CheckAuthority.instance);
app.filter('cameraTypeFilter', toCameraTypeText.instance);
app.filter('imageUrlFilter', ImageUrlFilter.instance);
app.filter('genderFilter', GenderFilter.instance);
app.filter('roundNumber', RoundNumber.instance);
app.filter('markFilter', MarkFilter.instance);
app.filter('glassFilter', GlassFilter.instance);//眼镜
app.filter('ageToGroupAge', AgeToGroupAge.instance);
app.filter('toFiltImgUrl', ToFiltImgUrl.instance);//大数据地址
app.filter('hideUnknowFilter', HideUnknowFilter.instance);//过滤未知
app.filter('isPantsFilter', IsPantsFilter.instance); //穿短裤
app.filter('isSleeveFilter', IsSleeveFilter.instance); //穿短袖
app.filter('maskFilter', MaskFilter.instance); //带面具
app.filter('orientationFilter', OrientationFilter.instance); //人脸朝向
app.filter('smileFilter', SmileFilter.instance); //微笑
app.filter('toFiltSlice', ToFiltSlice.instance); //微笑
app.filter('objectTypeFilter', ObjectTypeFilter.instance); // 对象类型枚举过滤器
app.filter('toEntryTypeFilter', ToEntryTypeFilter.instance);//立杆对象类型枚举过滤器
app.filter('alarmResponseStateFilter', AlarmResponseStateFilter.instance);
app.filter('isLongEffectiveFilter', IsLongEffectiveFilter.instance);