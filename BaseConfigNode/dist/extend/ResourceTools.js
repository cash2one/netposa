"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const OperSecondModule_1 = require("../core/entity/OperSecondModule");
const DataType_1 = require("../core/server/enum/DataType");
const OperFirstModule_1 = require("../core/entity/OperFirstModule");
const OperThirdModule_1 = require("../core/entity/OperThirdModule");
const log4js = require("log4js");
const util = require("util");
class ResourceTools {
    static catchPromiseReset(fn) {
        return new Promise((resolve) => {
            fn.then((res) => {
                resolve(res);
            }).catch((e) => {
                ResourceTools.LOGGER.error(util.format('request is error %s', e));
                resolve(false);
            });
        });
    }
    static getGroudByTime(timeType) {
        switch (timeType) {
            case DataType_1.DateType.ALL:
                return this.createNowTimeLine();
            case DataType_1.DateType.Month:
                return this.createMonthTimeLine();
            case DataType_1.DateType.Day:
                return this.createDayTimeLine();
            case DataType_1.DateType.Week:
                return this.createWeekTimeLine();
            case DataType_1.DateType.Year:
                return this.createYearTimeLine();
            default:
                return this.createNowTimeLine();
        }
    }
    static FormatTimeByType(timeType, data) {
        switch (timeType) {
            case DataType_1.DateType.ALL:
            case DataType_1.DateType.Month:
                return moment(data).format("DD日");
            case DataType_1.DateType.Day:
                return moment(data).format("hh:00");
            case DataType_1.DateType.Week:
                return moment(data).format("DD日");
            case DataType_1.DateType.Year:
                return moment(data).format("MM月");
            default:
                return moment(data).format("DD日");
        }
    }
    static createDayTimeLine() {
        let result = [];
        for (let i = 0; i < 24; i++) {
            result.push(`${i}:00`);
        }
        return result;
    }
    static createWeekTimeLine() {
        let result = [];
        for (let i = 1; i < 8; i++) {
            let week = moment().subtract(i, 'days').format('DD');
            result.push(`${week}日`);
        }
        return result.reverse();
    }
    static createNowTimeLine() {
        let result = [];
        for (let i = 0; i < 30; i++) {
            let month = moment().subtract(i, 'days').format('DD');
            result.push(`${month}日`);
        }
        return result.reverse();
    }
    static createMonthTimeLine() {
        let result = [];
        for (let i = 1; i <= 31; i++) {
            let month = moment().subtract(i, 'days').format('DD');
            result.push(`${month}日`);
        }
        return result.reverse();
    }
    static createYearTimeLine() {
        let result = [];
        for (let i = 1; i < 13; i++) {
            let month = moment().subtract(i, 'month').format('MM');
            result.push(`${month}月`);
        }
        return result.reverse();
    }
    static allResourceModelOne(timeType) {
        let params = ResourceTools.createParams(timeType);
        params.moduleNames = ResourceTools.AllModelListOne.map((item) => item.code).join(',');
        return params;
    }
    static allResourceModelTwo(timeType) {
        let params = ResourceTools.createParams(timeType);
        params.moduleNames = ResourceTools.AllModelListTwo.map((item) => item.code).join(',');
        return params;
    }
    static FaceResourceModelOne(timeType) {
        let params = ResourceTools.createParams(timeType);
        params.moduleNames = ResourceTools.FaceModelListOne.map((item) => item.code).join(',');
        return params;
    }
    static FaceResourceModelTwo(timeType) {
        let params = ResourceTools.createParams(timeType);
        params.moduleNames = ResourceTools.FaceModelListTwo.map((item) => item.code).join(',');
        return params;
    }
    static WifiResourceModelOne(timeType) {
        let params = ResourceTools.createParams(timeType);
        params.moduleNames = ResourceTools.WifiModelListOne.map((item) => item.code).join(',');
        return params;
    }
    static WifiResourceModelTwo(timeType) {
        let params = ResourceTools.createParams(timeType);
        params.moduleNames = ResourceTools.WifiModelListTwo.map((item) => item.code).join(',');
        return params;
    }
    static EfenceResourceModelOne(timeType) {
        let params = ResourceTools.createParams(timeType);
        params.moduleNames = ResourceTools.EfenceModelListOne.map((item) => item.code).join(',');
        return params;
    }
    static EfenceResourceModelTwo(timeType) {
        let params = ResourceTools.createParams(timeType);
        params.moduleNames = ResourceTools.EfenceModelListTwo.map((item) => item.code).join(',');
        return params;
    }
    static createParams(timeType) {
        let params = {};
        switch (timeType) {
            case DataType_1.DateType.ALL:
                params.timeType = DataType_1.DateTypeServerEum.Month;
                params.beginDate = moment().subtract(30, 'days').format('YYYY-MM-DD 00:00:00');
                params.endDate = moment().format('YYYY-MM-DD hh:mm:ss');
                break;
            case DataType_1.DateType.Month:
                params.timeType = DataType_1.DateTypeServerEum.Month;
                params.beginDate = moment().subtract(31, 'days').format('YYYY-MM-DD 00:00:00');
                params.endDate = moment().subtract(1, 'days').format('YYYY-MM-DD 23:59:59');
                break;
            case DataType_1.DateType.Day:
                params.timeType = DataType_1.DateTypeServerEum.Day;
                params.beginDate = moment().subtract(1, 'days').format('YYYY-MM-DD 00:00:00');
                params.endDate = moment().subtract(1, 'days').format('YYYY-MM-DD 23:59:59');
                break;
            case DataType_1.DateType.Week:
                params.timeType = DataType_1.DateTypeServerEum.Week;
                params.beginDate = moment().subtract(8, 'days').format('YYYY-MM-DD 00:00:00');
                params.endDate = moment().subtract(1, 'days').format('YYYY-MM-DD 23:59:59');
                break;
            case DataType_1.DateType.Year:
                params.timeType = DataType_1.DateTypeServerEum.Year;
                params.beginDate = moment().subtract(13, 'month').startOf('month').format('YYYY-MM-DD 00:00:00');
                params.endDate = moment().subtract(1, 'month').endOf("month").format('YYYY-MM-DD 23:59:59');
                break;
        }
        return params;
    }
}
ResourceTools.LOGGER = log4js.getLogger('ResourceTools');
ResourceTools.AllModelListOne = [
    OperFirstModule_1.OperFitstModule.ResourceRetrieval,
    OperSecondModule_1.OperSecondModule.IntelligentAnalysis_Face,
    OperSecondModule_1.OperSecondModule.IntelligentAnalysis_Vehicle,
    OperSecondModule_1.OperSecondModule.IntelligentAnalysis_Mac,
    OperSecondModule_1.OperSecondModule.IntelligentAnalysis_More
];
ResourceTools.AllModelListTwo = [
    OperThirdModule_1.OperThirdModule.ResourceRetrieval_AdvanceSearch_Vehicle,
    OperThirdModule_1.OperThirdModule.ResourceRetrieval_AdvanceSearch_Face,
    OperThirdModule_1.OperThirdModule.ResourceRetrieval_AdvanceSearch_WiFi,
    OperThirdModule_1.OperThirdModule.ResourceRetrieval_AdvanceSearch_EFence
];
ResourceTools.FaceModelListOne = [
    OperThirdModule_1.OperThirdModule.ResourceRetrieval_AdvanceSearch_Face,
    OperSecondModule_1.OperSecondModule.ResourceRetrieval_FullSearch
];
ResourceTools.FaceModelListTwo = [
    OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Face_Track,
    OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Face_Analysis,
    OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Face_AccompanyAnalysis,
    OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Face_CrashAnalysis,
    OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Face_AlarmAnalysis,
    OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Face_FrequencyAppear,
    OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Face_FrequencyAnalysis
];
ResourceTools.WifiModelListOne = [
    OperThirdModule_1.OperThirdModule.ResourceRetrieval_AdvanceSearch_WiFi,
    OperSecondModule_1.OperSecondModule.ResourceRetrieval_FullSearch
];
ResourceTools.WifiModelListTwo = [
    OperSecondModule_1.OperSecondModule.IntelligentAnalysis_Mac
];
ResourceTools.EfenceModelListOne = [
    OperThirdModule_1.OperThirdModule.ResourceRetrieval_AdvanceSearch_EFence,
    OperSecondModule_1.OperSecondModule.ResourceRetrieval_FullSearch
];
ResourceTools.EfenceModelListTwo = [
    OperSecondModule_1.OperSecondModule.IntelligentAnalysis_Mac
];
exports.ResourceTools = ResourceTools;
class CreateResourceParams {
}
CreateResourceParams.NowFaceParams = {
    AllTypeParams: ResourceTools.createParams(DataType_1.DateType.ALL),
    ALLSearchCountParams: ResourceTools.FaceResourceModelOne(DataType_1.DateType.ALL),
    ALLSearchCountParams2: ResourceTools.FaceResourceModelTwo(DataType_1.DateType.ALL),
};
CreateResourceParams.MonthFaceParams = {
    AllTypeParams: ResourceTools.createParams(DataType_1.DateType.Month),
    ALLSearchCountParams: ResourceTools.FaceResourceModelOne(DataType_1.DateType.Month),
    ALLSearchCountParams2: ResourceTools.FaceResourceModelTwo(DataType_1.DateType.Month),
};
CreateResourceParams.DayFaceParams = {
    AllTypeParams: ResourceTools.createParams(DataType_1.DateType.Day),
    ALLSearchCountParams: ResourceTools.FaceResourceModelOne(DataType_1.DateType.Day),
    ALLSearchCountParams2: ResourceTools.FaceResourceModelTwo(DataType_1.DateType.Day)
};
CreateResourceParams.WeekFaceParams = {
    AllTypeParams: ResourceTools.createParams(DataType_1.DateType.Week),
    ALLSearchCountParams: ResourceTools.FaceResourceModelOne(DataType_1.DateType.Week),
    ALLSearchCountParams2: ResourceTools.FaceResourceModelTwo(DataType_1.DateType.Week)
};
CreateResourceParams.YearFaceParams = {
    AllTypeParams: ResourceTools.createParams(DataType_1.DateType.Year),
    ALLSearchCountParams: ResourceTools.FaceResourceModelOne(DataType_1.DateType.Year),
    ALLSearchCountParams2: ResourceTools.FaceResourceModelTwo(DataType_1.DateType.Year)
};
CreateResourceParams.NowWifiParams = {
    AllTypeParams: ResourceTools.createParams(DataType_1.DateType.ALL),
    ALLSearchCountParams: ResourceTools.WifiResourceModelOne(DataType_1.DateType.ALL),
    ALLSearchCountParams2: ResourceTools.WifiResourceModelTwo(DataType_1.DateType.ALL),
};
CreateResourceParams.MonthWifiParams = {
    AllTypeParams: ResourceTools.createParams(DataType_1.DateType.Month),
    ALLSearchCountParams: ResourceTools.WifiResourceModelOne(DataType_1.DateType.Month),
    ALLSearchCountParams2: ResourceTools.WifiResourceModelTwo(DataType_1.DateType.Month),
};
CreateResourceParams.DayWifiParams = {
    AllTypeParams: ResourceTools.createParams(DataType_1.DateType.Day),
    ALLSearchCountParams: ResourceTools.WifiResourceModelOne(DataType_1.DateType.Day),
    ALLSearchCountParams2: ResourceTools.WifiResourceModelTwo(DataType_1.DateType.Day)
};
CreateResourceParams.WeekWifiParams = {
    AllTypeParams: ResourceTools.createParams(DataType_1.DateType.Week),
    ALLSearchCountParams: ResourceTools.WifiResourceModelOne(DataType_1.DateType.Week),
    ALLSearchCountParams2: ResourceTools.WifiResourceModelTwo(DataType_1.DateType.Week)
};
CreateResourceParams.YearWifiParams = {
    AllTypeParams: ResourceTools.createParams(DataType_1.DateType.Year),
    ALLSearchCountParams: ResourceTools.WifiResourceModelOne(DataType_1.DateType.Year),
    ALLSearchCountParams2: ResourceTools.WifiResourceModelTwo(DataType_1.DateType.Year)
};
CreateResourceParams.NowEfenceParams = {
    AllTypeParams: ResourceTools.createParams(DataType_1.DateType.ALL),
    ALLSearchCountParams: ResourceTools.EfenceResourceModelOne(DataType_1.DateType.ALL),
    ALLSearchCountParams2: ResourceTools.EfenceResourceModelTwo(DataType_1.DateType.ALL),
};
CreateResourceParams.MonthEfenceParams = {
    AllTypeParams: ResourceTools.createParams(DataType_1.DateType.Month),
    ALLSearchCountParams: ResourceTools.EfenceResourceModelOne(DataType_1.DateType.Month),
    ALLSearchCountParams2: ResourceTools.EfenceResourceModelTwo(DataType_1.DateType.Month),
};
CreateResourceParams.DayEfenceParams = {
    AllTypeParams: ResourceTools.createParams(DataType_1.DateType.Day),
    ALLSearchCountParams: ResourceTools.EfenceResourceModelOne(DataType_1.DateType.Day),
    ALLSearchCountParams2: ResourceTools.EfenceResourceModelTwo(DataType_1.DateType.Day)
};
CreateResourceParams.WeekEfenceParams = {
    AllTypeParams: ResourceTools.createParams(DataType_1.DateType.Week),
    ALLSearchCountParams: ResourceTools.EfenceResourceModelOne(DataType_1.DateType.Week),
    ALLSearchCountParams2: ResourceTools.EfenceResourceModelTwo(DataType_1.DateType.Week)
};
CreateResourceParams.YearEfenceParams = {
    AllTypeParams: ResourceTools.createParams(DataType_1.DateType.Year),
    ALLSearchCountParams: ResourceTools.EfenceResourceModelOne(DataType_1.DateType.Year),
    ALLSearchCountParams2: ResourceTools.EfenceResourceModelTwo(DataType_1.DateType.Year)
};
CreateResourceParams.NowCarParams = {
    AllTypeParams: ResourceTools.createParams(DataType_1.DateType.ALL),
    ALLSearchCountParams: ResourceTools.EfenceResourceModelOne(DataType_1.DateType.ALL),
    ALLSearchCountParams2: ResourceTools.EfenceResourceModelTwo(DataType_1.DateType.ALL),
};
CreateResourceParams.MonthCarParams = {
    AllTypeParams: ResourceTools.createParams(DataType_1.DateType.Month),
    ALLSearchCountParams: ResourceTools.EfenceResourceModelOne(DataType_1.DateType.Month),
    ALLSearchCountParams2: ResourceTools.EfenceResourceModelTwo(DataType_1.DateType.Month),
};
CreateResourceParams.DayCarParams = {
    AllTypeParams: ResourceTools.createParams(DataType_1.DateType.Day),
    ALLSearchCountParams: ResourceTools.EfenceResourceModelOne(DataType_1.DateType.Day),
    ALLSearchCountParams2: ResourceTools.EfenceResourceModelTwo(DataType_1.DateType.Day)
};
CreateResourceParams.WeekCarParams = {
    AllTypeParams: ResourceTools.createParams(DataType_1.DateType.Week),
    ALLSearchCountParams: ResourceTools.EfenceResourceModelOne(DataType_1.DateType.Week),
    ALLSearchCountParams2: ResourceTools.EfenceResourceModelTwo(DataType_1.DateType.Week)
};
CreateResourceParams.YearCarParams = {
    AllTypeParams: ResourceTools.createParams(DataType_1.DateType.Year),
    ALLSearchCountParams: ResourceTools.EfenceResourceModelOne(DataType_1.DateType.Year),
    ALLSearchCountParams2: ResourceTools.EfenceResourceModelTwo(DataType_1.DateType.Year)
};
CreateResourceParams.NowAllParams = {
    AllTypeParams: ResourceTools.createParams(DataType_1.DateType.ALL),
    ALLSearchCountParams: ResourceTools.allResourceModelOne(DataType_1.DateType.ALL),
    ALLSearchCountParams2: ResourceTools.allResourceModelTwo(DataType_1.DateType.ALL),
};
CreateResourceParams.MonthAllParams = {
    AllTypeParams: ResourceTools.createParams(DataType_1.DateType.Month),
    ALLSearchCountParams: ResourceTools.allResourceModelOne(DataType_1.DateType.Month),
    ALLSearchCountParams2: ResourceTools.allResourceModelTwo(DataType_1.DateType.Month),
};
CreateResourceParams.DayAllParams = {
    AllTypeParams: ResourceTools.createParams(DataType_1.DateType.Day),
    ALLSearchCountParams: ResourceTools.allResourceModelOne(DataType_1.DateType.Day),
    ALLSearchCountParams2: ResourceTools.allResourceModelTwo(DataType_1.DateType.Day)
};
CreateResourceParams.WeekAllParams = {
    AllTypeParams: ResourceTools.createParams(DataType_1.DateType.Week),
    ALLSearchCountParams: ResourceTools.allResourceModelOne(DataType_1.DateType.Week),
    ALLSearchCountParams2: ResourceTools.allResourceModelTwo(DataType_1.DateType.Week)
};
CreateResourceParams.YearAllParams = {
    AllTypeParams: ResourceTools.createParams(DataType_1.DateType.Year),
    ALLSearchCountParams: ResourceTools.allResourceModelOne(DataType_1.DateType.Year),
    ALLSearchCountParams2: ResourceTools.allResourceModelTwo(DataType_1.DateType.Year)
};
exports.CreateResourceParams = CreateResourceParams;
