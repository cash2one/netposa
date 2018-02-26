import * as moment from "moment";
import { OperSecondModule } from "../core/entity/OperSecondModule";
import { DateType, DateTypeServerEum } from "../core/server/enum/DataType";
import ResourceParams from "../core/params/ResourceParams";
import { OperFitstModule } from "../core/entity/OperFirstModule";
import { OperThirdModule } from "../core/entity/OperThirdModule";
import * as log4js from "log4js";
import * as util from "util";

export class ResourceTools {

    static LOGGER = log4js.getLogger('ResourceTools');

    static catchPromiseReset(fn: any): Promise<any> {
        return new Promise((resolve) => {
            fn.then((res: any) => {
                resolve(res)
            }).catch((e: any) => {
                ResourceTools.LOGGER.error(util.format('request is error %s', e));
                resolve(false)
            })
        })
    }

    static getGroudByTime(timeType: string) {
        switch (timeType) {
            case DateType.ALL:
                return this.createNowTimeLine();
            case DateType.Month:
                return this.createMonthTimeLine();
            case DateType.Day:
                return this.createDayTimeLine();
            case DateType.Week:
                return this.createWeekTimeLine();
            case DateType.Year:
                return this.createYearTimeLine();
            default:
                return this.createNowTimeLine();
        }
    }

    static FormatTimeByType(timeType: string, data: string) {
        switch (timeType) {
            case DateType.ALL:
            case DateType.Month:
                return moment(data).format("DD日");
            case DateType.Day:
                return moment(data).format("hh:00");
            case DateType.Week:
                return moment(data).format("DD日");
            case DateType.Year:
                return moment(data).format("MM月");
            default:
                return moment(data).format("DD日");
        }
    }

    static createDayTimeLine(): Array<string> {
        let result = [] as Array<string>;
        for (let i = 0; i < 24; i++) {
            result.push(`${i < 10 ? ('0' + i) : i}:00`)
        }
        return result;
    }

    static createWeekTimeLine(): Array<string> {
        let result = [] as Array<string>;
        for (let i = 1; i < 8; i++) {
            let week = moment().subtract(i, 'days').format('DD');
            result.push(`${week}日`)
        }
        return result.reverse();
    }
    static createNowTimeLine(): Array<string> {
        let result = [] as Array<string>;
        for (let i = 0; i < 30; i++) {
            let month = moment().subtract(i, 'days').format('DD');
            result.push(`${month}日`)
        }
        return result.reverse();
    }
    static createMonthTimeLine(): Array<string> {
        let result = [] as Array<string>;
        for (let i = 1; i <= 31; i++) {
            let month = moment().subtract(i, 'days').format('DD');
            result.push(`${month}日`)
        }
        return result.reverse();
    }

    static createYearTimeLine(): Array<string> {
        let result = [] as Array<string>;
        for (let i = 1; i < 13; i++) {
            let month = moment().subtract(i, 'month').format('MM');
            result.push(`${month}月`)
        }
        return result.reverse();
    }

    static AllModelListOne: Array<{ code: string, name: string }> = [
        OperFitstModule.ResourceRetrieval,
        OperSecondModule.IntelligentAnalysis_Face,
        OperSecondModule.IntelligentAnalysis_Vehicle,
        OperSecondModule.IntelligentAnalysis_Mac,
        OperSecondModule.IntelligentAnalysis_More
    ];
    static AllModelListTwo: Array<{ code: string, name: string }> = [
        OperThirdModule.ResourceRetrieval_AdvanceSearch_Vehicle,
        OperThirdModule.ResourceRetrieval_AdvanceSearch_Face,
        OperThirdModule.ResourceRetrieval_AdvanceSearch_WiFi,
        OperThirdModule.ResourceRetrieval_AdvanceSearch_EFence
    ];
    static FaceModelListOne: Array<{ code: string, name: string }> = [
        OperThirdModule.ResourceRetrieval_AdvanceSearch_Face,
        OperSecondModule.ResourceRetrieval_FullSearch
    ];
    static FaceModelListTwo: Array<{ code: string, name: string }> = [
        OperThirdModule.IntelligentAnalysis_Face_Track,
        OperThirdModule.IntelligentAnalysis_Face_Analysis,
        OperThirdModule.IntelligentAnalysis_Face_AccompanyAnalysis,
        OperThirdModule.IntelligentAnalysis_Face_CrashAnalysis,
        OperThirdModule.IntelligentAnalysis_Face_AlarmAnalysis,
        OperThirdModule.IntelligentAnalysis_Face_FrequencyAppear,
        OperThirdModule.IntelligentAnalysis_Face_FrequencyAnalysis
    ];
    static WifiModelListOne: Array<{ code: string, name: string }> = [
        OperThirdModule.ResourceRetrieval_AdvanceSearch_WiFi,
        OperSecondModule.ResourceRetrieval_FullSearch
    ];
    static WifiModelListTwo: Array<{ code: string, name: string }> = [
        OperSecondModule.IntelligentAnalysis_Mac
    ];
    static EfenceModelListOne: Array<{ code: string, name: string }> = [
        OperThirdModule.ResourceRetrieval_AdvanceSearch_EFence,
        OperSecondModule.ResourceRetrieval_FullSearch
    ];
    static EfenceModelListTwo: Array<{ code: string, name: string }> = [
        OperSecondModule.IntelligentAnalysis_Mac
    ];

    static allResourceModelOne(timeType: string) {
        let params = ResourceTools.createParams(timeType) as ResourceParams;
        params.moduleNames = ResourceTools.AllModelListOne.map((item: { code: string, name: string }) => item.code).join(',');
        return params;
    }

    static allResourceModelTwo(timeType: string) {
        let params = ResourceTools.createParams(timeType) as ResourceParams;
        params.moduleNames = ResourceTools.AllModelListTwo.map((item: { code: string, name: string }) => item.code).join(',');
        return params;
    }

    static FaceResourceModelOne(timeType: string) {
        let params = ResourceTools.createParams(timeType) as ResourceParams;
        params.moduleNames = ResourceTools.FaceModelListOne.map((item: { code: string, name: string }) => item.code).join(',');
        return params;
    }

    static FaceResourceModelTwo(timeType: string) {
        let params = ResourceTools.createParams(timeType) as ResourceParams;
        params.moduleNames = ResourceTools.FaceModelListTwo.map((item: { code: string, name: string }) => item.code).join(',');
        return params;
    }

    static WifiResourceModelOne(timeType: string) {
        let params = ResourceTools.createParams(timeType) as ResourceParams;
        params.moduleNames = ResourceTools.WifiModelListOne.map((item: { code: string, name: string }) => item.code).join(',');
        return params;
    }

    static WifiResourceModelTwo(timeType: string) {
        let params = ResourceTools.createParams(timeType) as ResourceParams;
        params.moduleNames = ResourceTools.WifiModelListTwo.map((item: { code: string, name: string }) => item.code).join(',');
        return params;
    }

    static EfenceResourceModelOne(timeType: string) {
        let params = ResourceTools.createParams(timeType) as ResourceParams;
        params.moduleNames = ResourceTools.EfenceModelListOne.map((item: { code: string, name: string }) => item.code).join(',');
        return params;
    }

    static EfenceResourceModelTwo(timeType: string) {
        let params = ResourceTools.createParams(timeType) as ResourceParams;
        params.moduleNames = ResourceTools.EfenceModelListTwo.map((item: { code: string, name: string }) => item.code).join(',');
        return params;
    }


    static createParams(timeType: string) {
        let params = {} as ResourceParams;
        switch (timeType) {
            case DateType.ALL:
                params.timeType = DateTypeServerEum.Month;
                params.beginDate = moment().subtract(30, 'days').format('YYYY-MM-DD 00:00:00');
                params.endDate = moment().format('YYYY-MM-DD hh:mm:ss');
                break;
            case DateType.Month:
                params.timeType = DateTypeServerEum.Month;
                params.beginDate = moment().subtract(31, 'days').format('YYYY-MM-DD 00:00:00');
                params.endDate = moment().subtract(1, 'days').format('YYYY-MM-DD 23:59:59');
                break;
            case DateType.Day:
                params.timeType = DateTypeServerEum.Day;
                params.beginDate = moment().subtract(1, 'days').format('YYYY-MM-DD 00:00:00');
                params.endDate = moment().subtract(1, 'days').format('YYYY-MM-DD 23:59:59');
                break;
            case DateType.Week:
                params.timeType = DateTypeServerEum.Week;
                params.beginDate = moment().subtract(8, 'days').format('YYYY-MM-DD 00:00:00');
                params.endDate = moment().subtract(1, 'days').format('YYYY-MM-DD 23:59:59');
                break;
            case DateType.Year:
                params.timeType = DateTypeServerEum.Year;
                params.beginDate = moment().subtract(13, 'month').startOf('month').format('YYYY-MM-DD 00:00:00');
                params.endDate = moment().subtract(1, 'month').endOf("month").format('YYYY-MM-DD 23:59:59');
                break;
        }
        return params;
    }
}


export interface Params {
    AllTypeParams: ResourceParams;
    ALLSearchCountParams: ResourceParams;
    ALLSearchCountParams2: ResourceParams;
}

export class CreateResourceParams {
    //TODO ---------------------Face-------------------------
    /**
     * 人脸下按月份查询的参数
     * @type {ResourceParams}
     */
    static NowFaceParams: Params = {
        AllTypeParams: ResourceTools.createParams(DateType.ALL) as ResourceParams,
        ALLSearchCountParams: ResourceTools.FaceResourceModelOne(DateType.ALL) as ResourceParams,
        ALLSearchCountParams2: ResourceTools.FaceResourceModelTwo(DateType.ALL) as ResourceParams,
    };
    /**
     * 人脸下按月份查询的参数
     * @type {ResourceParams}
     */
    static MonthFaceParams: Params = {
        AllTypeParams: ResourceTools.createParams(DateType.Month) as ResourceParams,
        ALLSearchCountParams: ResourceTools.FaceResourceModelOne(DateType.Month) as ResourceParams,
        ALLSearchCountParams2: ResourceTools.FaceResourceModelTwo(DateType.Month) as ResourceParams,
    };


    /**
     * 人脸下按天份查询的参数
     * @type {ResourceParams}
     */
    static DayFaceParams: Params = {
        AllTypeParams: ResourceTools.createParams(DateType.Day) as ResourceParams,
        ALLSearchCountParams: ResourceTools.FaceResourceModelOne(DateType.Day) as ResourceParams,
        ALLSearchCountParams2: ResourceTools.FaceResourceModelTwo(DateType.Day) as ResourceParams
    };


    /**
     * 人脸下按周份查询的参数
     * @type {ResourceParams}
     */
    static WeekFaceParams: Params = {
        AllTypeParams: ResourceTools.createParams(DateType.Week) as ResourceParams,
        ALLSearchCountParams: ResourceTools.FaceResourceModelOne(DateType.Week) as ResourceParams,
        ALLSearchCountParams2: ResourceTools.FaceResourceModelTwo(DateType.Week) as ResourceParams
    };


    /**
     * 人脸下按年查询的参数
     * @type {ResourceParams}
     */
    static YearFaceParams: Params = {
        AllTypeParams: ResourceTools.createParams(DateType.Year) as ResourceParams,
        ALLSearchCountParams: ResourceTools.FaceResourceModelOne(DateType.Year) as ResourceParams,
        ALLSearchCountParams2: ResourceTools.FaceResourceModelTwo(DateType.Year) as ResourceParams
    };


    //TODO ---------------------Wifi-------------------------
    /**
     * wifi下按月份查询的参数
     * @type {ResourceParams}
     */
    static NowWifiParams: Params = {
        AllTypeParams: ResourceTools.createParams(DateType.ALL) as ResourceParams,
        ALLSearchCountParams: ResourceTools.WifiResourceModelOne(DateType.ALL) as ResourceParams,
        ALLSearchCountParams2: ResourceTools.WifiResourceModelTwo(DateType.ALL) as ResourceParams,
    };
    /**
     * wifi下按月份查询的参数
     * @type {ResourceParams}
     */
    static MonthWifiParams: Params = {
        AllTypeParams: ResourceTools.createParams(DateType.Month) as ResourceParams,
        ALLSearchCountParams: ResourceTools.WifiResourceModelOne(DateType.Month) as ResourceParams,
        ALLSearchCountParams2: ResourceTools.WifiResourceModelTwo(DateType.Month) as ResourceParams,
    };


    /**
     * wifi下按天份查询的参数
     * @type {ResourceParams}
     */
    static DayWifiParams: Params = {
        AllTypeParams: ResourceTools.createParams(DateType.Day) as ResourceParams,
        ALLSearchCountParams: ResourceTools.WifiResourceModelOne(DateType.Day) as ResourceParams,
        ALLSearchCountParams2: ResourceTools.WifiResourceModelTwo(DateType.Day) as ResourceParams
    };


    /**
     * wifi下按周份查询的参数
     * @type {ResourceParams}
     */
    static WeekWifiParams: Params = {
        AllTypeParams: ResourceTools.createParams(DateType.Week) as ResourceParams,
        ALLSearchCountParams: ResourceTools.WifiResourceModelOne(DateType.Week) as ResourceParams,
        ALLSearchCountParams2: ResourceTools.WifiResourceModelTwo(DateType.Week) as ResourceParams
    };


    /**
     * wifi下按年查询的参数
     * @type {ResourceParams}
     */
    static YearWifiParams: Params = {
        AllTypeParams: ResourceTools.createParams(DateType.Year) as ResourceParams,
        ALLSearchCountParams: ResourceTools.WifiResourceModelOne(DateType.Year) as ResourceParams,
        ALLSearchCountParams2: ResourceTools.WifiResourceModelTwo(DateType.Year) as ResourceParams
    };


    //TODO ---------------------Efence-------------------------
    /**
     * Efence下按月份查询的参数
     * @type {ResourceParams}
     */
    static NowEfenceParams: Params = {
        AllTypeParams: ResourceTools.createParams(DateType.ALL) as ResourceParams,
        ALLSearchCountParams: ResourceTools.EfenceResourceModelOne(DateType.ALL) as ResourceParams,
        ALLSearchCountParams2: ResourceTools.EfenceResourceModelTwo(DateType.ALL) as ResourceParams,
    };
    /**
     * Efence下按月份查询的参数
     * @type {ResourceParams}
     */
    static MonthEfenceParams: Params = {
        AllTypeParams: ResourceTools.createParams(DateType.Month) as ResourceParams,
        ALLSearchCountParams: ResourceTools.EfenceResourceModelOne(DateType.Month) as ResourceParams,
        ALLSearchCountParams2: ResourceTools.EfenceResourceModelTwo(DateType.Month) as ResourceParams,
    };


    /**
     * Efence下按天份查询的参数
     * @type {ResourceParams}
     */
    static DayEfenceParams: Params = {
        AllTypeParams: ResourceTools.createParams(DateType.Day) as ResourceParams,
        ALLSearchCountParams: ResourceTools.EfenceResourceModelOne(DateType.Day) as ResourceParams,
        ALLSearchCountParams2: ResourceTools.EfenceResourceModelTwo(DateType.Day) as ResourceParams
    };


    /**
     * Efence下按周份查询的参数
     * @type {ResourceParams}
     */
    static WeekEfenceParams: Params = {
        AllTypeParams: ResourceTools.createParams(DateType.Week) as ResourceParams,
        ALLSearchCountParams: ResourceTools.EfenceResourceModelOne(DateType.Week) as ResourceParams,
        ALLSearchCountParams2: ResourceTools.EfenceResourceModelTwo(DateType.Week) as ResourceParams
    };


    /**
     * Efence下按年查询的参数
     * @type {ResourceParams}
     */
    static YearEfenceParams: Params = {
        AllTypeParams: ResourceTools.createParams(DateType.Year) as ResourceParams,
        ALLSearchCountParams: ResourceTools.EfenceResourceModelOne(DateType.Year) as ResourceParams,
        ALLSearchCountParams2: ResourceTools.EfenceResourceModelTwo(DateType.Year) as ResourceParams
    };


    //TODO ---------------------Car-------------------------
    /**
     * Efence下按月份查询的参数
     * @type {ResourceParams}
     */
    static NowCarParams: Params = {
        AllTypeParams: ResourceTools.createParams(DateType.ALL) as ResourceParams,
        ALLSearchCountParams: ResourceTools.EfenceResourceModelOne(DateType.ALL) as ResourceParams,
        ALLSearchCountParams2: ResourceTools.EfenceResourceModelTwo(DateType.ALL) as ResourceParams,
    };
    /**
     * Efence下按月份查询的参数
     * @type {ResourceParams}
     */
    static MonthCarParams: Params = {
        AllTypeParams: ResourceTools.createParams(DateType.Month) as ResourceParams,
        ALLSearchCountParams: ResourceTools.EfenceResourceModelOne(DateType.Month) as ResourceParams,
        ALLSearchCountParams2: ResourceTools.EfenceResourceModelTwo(DateType.Month) as ResourceParams,
    };


    /**
     * Efence下按天份查询的参数
     * @type {ResourceParams}
     */
    static DayCarParams: Params = {
        AllTypeParams: ResourceTools.createParams(DateType.Day) as ResourceParams,
        ALLSearchCountParams: ResourceTools.EfenceResourceModelOne(DateType.Day) as ResourceParams,
        ALLSearchCountParams2: ResourceTools.EfenceResourceModelTwo(DateType.Day) as ResourceParams
    };


    /**
     * Efence下按周份查询的参数
     * @type {ResourceParams}
     */
    static WeekCarParams: Params = {
        AllTypeParams: ResourceTools.createParams(DateType.Week) as ResourceParams,
        ALLSearchCountParams: ResourceTools.EfenceResourceModelOne(DateType.Week) as ResourceParams,
        ALLSearchCountParams2: ResourceTools.EfenceResourceModelTwo(DateType.Week) as ResourceParams
    };


    /**
     * Efence下按年查询的参数
     * @type {ResourceParams}
     */
    static YearCarParams: Params = {
        AllTypeParams: ResourceTools.createParams(DateType.Year) as ResourceParams,
        ALLSearchCountParams: ResourceTools.EfenceResourceModelOne(DateType.Year) as ResourceParams,
        ALLSearchCountParams2: ResourceTools.EfenceResourceModelTwo(DateType.Year) as ResourceParams
    };


    //TODO ---------------------All-------------------------
    /**
     * 所有类型下按月份查询的参数
     * @type {ResourceParams}
     */
    static NowAllParams: Params = {
        AllTypeParams: ResourceTools.createParams(DateType.ALL) as ResourceParams,
        ALLSearchCountParams: ResourceTools.allResourceModelOne(DateType.ALL) as ResourceParams,
        ALLSearchCountParams2: ResourceTools.allResourceModelTwo(DateType.ALL) as ResourceParams,
    };
    /**
     * 所有类型下按月份查询的参数
     * @type {ResourceParams}
     */
    static MonthAllParams: Params = {
        AllTypeParams: ResourceTools.createParams(DateType.Month) as ResourceParams,
        ALLSearchCountParams: ResourceTools.allResourceModelOne(DateType.Month) as ResourceParams,
        ALLSearchCountParams2: ResourceTools.allResourceModelTwo(DateType.Month) as ResourceParams,
    };


    /**
     * 所有类型下按天份查询的参数
     * @type {ResourceParams}
     */
    static DayAllParams: Params = {
        AllTypeParams: ResourceTools.createParams(DateType.Day) as ResourceParams,
        ALLSearchCountParams: ResourceTools.allResourceModelOne(DateType.Day) as ResourceParams,
        ALLSearchCountParams2: ResourceTools.allResourceModelTwo(DateType.Day) as ResourceParams
    };


    /**
     * 所有类型下按周份查询的参数
     * @type {ResourceParams}
     */
    static WeekAllParams: Params = {
        AllTypeParams: ResourceTools.createParams(DateType.Week) as ResourceParams,
        ALLSearchCountParams: ResourceTools.allResourceModelOne(DateType.Week) as ResourceParams,
        ALLSearchCountParams2: ResourceTools.allResourceModelTwo(DateType.Week) as ResourceParams
    };


    /**
     * 所有类型下按年查询的参数
     * @type {ResourceParams}
     */
    static YearAllParams: Params = {
        AllTypeParams: ResourceTools.createParams(DateType.Year) as ResourceParams,
        ALLSearchCountParams: ResourceTools.allResourceModelOne(DateType.Year) as ResourceParams,
        ALLSearchCountParams2: ResourceTools.allResourceModelTwo(DateType.Year) as ResourceParams
    }
}