import {ValueTextEnumType} from "../../enum/Enum";

/**
 * 快速检索以图搜图（人像）排序类型.
 * create by zmp.
 * @time: 2017-09-04
 */
export const IntelligentSortType: ValueTextEnumType = {

    Unknow: {value: "Unknow", text: "未知"},

    OrderByTime: {value: "OrderByTime", text: "按时间"},

    OrderByFreq: {value: "OrderByFreq", text: "按频率"},

    OrderBySimilar: {value: "OrderBySimilar", text: "按相似度"},

    OrderByLib: {value: "OrderByLib", text: "按库"},

    OrderByComPareCount: {value: "OrderByComPareCount", text: "按比中次数"}
}