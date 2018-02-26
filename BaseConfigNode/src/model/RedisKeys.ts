import Config from "../Config";


/**
 * @class RedisKeys
 * @title RedisKeys Library 字段名仓库
 * @update hjj
 * @time 2017年12月15日 15:47:28
 */

export class RedisKeys {
    static readonly ResourceNowAllResult = Config.IS_DEV ? 'ResourceNowAllResult_DEV' : 'ResourceNowAllResult';
    static readonly ResourceMonthAllResult = Config.IS_DEV ? 'ResourceMonthAllResult_DEV' : 'ResourceMonthAllResult';
    static readonly ResourceDayAllResult = Config.IS_DEV ? 'ResourceDayAllResult_DEV' : 'ResourceDayAllResult';
    static readonly ResourceWeekAllResult = Config.IS_DEV ? 'ResourceWeekAllResult_DEV' : 'ResourceWeekAllResult';
    static readonly ResourceYearAllResult = Config.IS_DEV ? 'ResourceYearAllResult_DEV' : 'ResourceYearAllResult';

    static readonly ResourceNowFaceResult = Config.IS_DEV ? 'ResourceNowFaceResult_DEV' : 'ResourceNowFaceResult';
    static readonly ResourceMonthFaceResult = Config.IS_DEV ? 'ResourceMonthFaceResult_DEV' : 'ResourceMonthFaceResult';
    static readonly ResourceDayFaceResult = Config.IS_DEV ? 'ResourceDayFaceResult_DEV' : 'ResourceDayFaceResult';
    static readonly ResourceWeekFaceResult = Config.IS_DEV ? 'ResourceWeekFaceResult_DEV' : 'ResourceWeekFaceResult';
    static readonly ResourceYearFaceResult = Config.IS_DEV ? 'ResourceYearFaceResult_DEV' : 'ResourceYearFaceResult';

    static readonly ResourceNowWifiResult = Config.IS_DEV ? 'ResourceNowWifiResult_DEV' : 'ResourceNowWifiResult';
    static readonly ResourceMonthWifiResult = Config.IS_DEV ? 'ResourceMonthWifiResult_DEV' : 'ResourceMonthWifiResult';
    static readonly ResourceDayWifiResult = Config.IS_DEV ? 'ResourceDayWifiResult_DEV' : 'ResourceDayWifiResult';
    static readonly ResourceWeekWifiResult = Config.IS_DEV ? 'ResourceWeekWifiResult_DEV' : 'ResourceWeekWifiResult';
    static readonly ResourceYearWifiResult = Config.IS_DEV ? 'ResourceYearWifiResult_DEV' : 'ResourceYearWifiResult';

    static readonly ResourceNowEfenceResult = Config.IS_DEV ? 'ResourceNowEfenceResult_DEV' : 'ResourceNowEfenceResult';
    static readonly ResourceMonthEfenceResult = Config.IS_DEV ? 'ResourceMonthEfenceResult_DEV' : 'ResourceMonthEfenceResult';
    static readonly ResourceDayEfenceResult = Config.IS_DEV ? 'ResourceDayEfenceResult_DEV' : 'ResourceDayEfenceResult';
    static readonly ResourceWeekEfenceResult = Config.IS_DEV ? 'ResourceWeekEfenceResult_DEV' : 'ResourceWeekEfenceResult';
    static readonly ResourceYearEfenceResult = Config.IS_DEV ? 'ResourceYearEfenceResult_DEV' : 'ResourceYearEfenceResult';

    static readonly ResourceNowCarResult = Config.IS_DEV ? 'ResourceNowCarResult_DEV' : 'ResourceNowCarResult';
    static readonly ResourceMonthCarResult = Config.IS_DEV ? 'ResourceMonthCarResult_DEV' : 'ResourceMonthCarResult';
    static readonly ResourceDayCarResult = Config.IS_DEV ? 'ResourceDayCarResult_DEV' : 'ResourceDayCarResult';
    static readonly ResourceWeekCarResult = Config.IS_DEV ? 'ResourceWeekCarResult_DEV' : 'ResourceWeekCarResult';
    static readonly ResourceYearCarResult = Config.IS_DEV ? 'ResourceYearCarResult_DEV' : 'ResourceYearCarResult';
}