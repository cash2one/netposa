"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CasCadeSearchParams {
}
exports.CasCadeSearchParams = CasCadeSearchParams;
class userInfoResult {
}
exports.userInfoResult = userInfoResult;
class intelligentAnalysisRequireParams {
}
exports.intelligentAnalysisRequireParams = intelligentAnalysisRequireParams;
;
exports.analysisStatisticsParams = {
    beginDate: "",
    endDate: "",
    moduleNames: "",
    statisticModuleLevel: 3,
};
class alarmTrafficReqEnum {
}
exports.alarmTrafficReqEnum = alarmTrafficReqEnum;
exports.alarmTrafficReqParams = {
    beginDate: "",
    endDate: "2017-11-16 23:59:59",
    resourceType: "ALL",
    timeType: "Day"
};
class analysisStatisticsResult {
}
exports.analysisStatisticsResult = analysisStatisticsResult;
class echartSuperData {
}
exports.echartSuperData = echartSuperData;
class StatisticsOverview {
}
exports.StatisticsOverview = StatisticsOverview;
exports.StatisticsOverviewArr = [
    { title: "FDS_02_02_29", type: "Face", total: 0, online: 0, alarm: 0, imagesPath: "../../../images/maintain/item-camera.png" },
    { title: "FDS_02_02_30", type: "WiFi", total: 0, online: 0, alarm: 0, imagesPath: "../../../images/maintain/Wi-Fi.png" },
    { title: "FDS_02_02_31", type: "EFENCE", total: 0, online: 0, alarm: 0, imagesPath: "../../../images/maintain/electronicfence.png" },
    { title: "FDS_02_02_32", type: "RmpGate", total: 0, online: 0, alarm: 0, imagesPath: "../../../images/maintain/rmpgate.png" }
];
class areaColor {
}
exports.areaColor = areaColor;
exports.areaDropList = [
    { color: '#6c8ce4' },
    { color: '#7cccf2' },
    { color: '#dcbe99' },
    { color: '#F8F0E9' },
    { color: '#C9C9C9' },
    { color: '#6F6E6E' },
    { color: '#7CCCF2' },
    { color: '#53c68c' },
    { color: '#9ad941' },
    { color: '#fbd15a' },
    { color: '#9cdcee' },
    { color: '#e98371' }
];
function changeTheModuleName(modules, type, modulesEnum) {
    let moduleEnum = Object.keys(modulesEnum);
    modules.forEach((module, index) => {
        moduleEnum.forEach((Enum) => {
            if (module[type]) {
                if (module[type].trim() === Enum) {
                    modules[index][type] = modulesEnum[Enum].name;
                }
            }
        });
    });
    return modules;
}
exports.changeTheModuleName = changeTheModuleName;
class deviceInfoEnum {
    constructor() {
        this.alarm = 0;
        this.flow = 0;
    }
}
exports.deviceInfoEnum = deviceInfoEnum;
class topSearchResult {
}
exports.topSearchResult = topSearchResult;
class AlarmObjectEnum {
}
exports.AlarmObjectEnum = AlarmObjectEnum;
exports.AlarmObjectType = {
    ALL: { value: "ALL", text: "全部", alarm: 0, flow: 0 },
    Camera: { value: "Camera", text: "摄像机", alarm: 0, flow: 0 },
    WiFi: { value: "WiFi", text: "Wi-Fi", alarm: 0, flow: 0 },
    RmpGate: { value: "RmpGate", text: "卡口", alarm: 0, flow: 0 },
    EFENCE: { value: "EFENCE", text: "电子围栏", alarm: 0, flow: 0 },
    Face: { value: "Face", text: "人像", alarm: 0, flow: 0 },
    Vehicle: { value: "Vehicle", text: "车辆", alarm: 0, flow: 0 },
    Device: { value: "Device", text: "设备", alarm: 0, flow: 0 },
    LOCATION: { value: "LOCATION", text: "位置", alarm: 0, flow: 0 }
};
class dropEnum {
    constructor() {
        this.isSelected = false;
    }
}
exports.dropEnum = dropEnum;
class deviceStatisticsEnum {
    constructor() {
        this.seriesData = [];
        this.yData = [];
    }
}
exports.deviceStatisticsEnum = deviceStatisticsEnum;
class deviceItemResponseResult {
}
exports.deviceItemResponseResult = deviceItemResponseResult;
class alarmTrafficTrend {
}
exports.alarmTrafficTrend = alarmTrafficTrend;
;
class alarmTrafficTrendAreaInfo {
}
exports.alarmTrafficTrendAreaInfo = alarmTrafficTrendAreaInfo;
class alarmTrafficTrendData {
}
exports.alarmTrafficTrendData = alarmTrafficTrendData;
class alarmTrafficTimeFormat {
}
exports.alarmTrafficTimeFormat = alarmTrafficTimeFormat;
class dataFilterParam {
}
exports.dataFilterParam = dataFilterParam;
exports.initParam = {
    module: "alarm",
    AreaName: "ALL",
    deviceName: "EFENCE",
    timeType: "month",
};
class selectDataEnum {
}
exports.selectDataEnum = selectDataEnum;
exports.SelectData = [
    { value: 'ALL', text: "全部" },
    { value: 'Day', text: "近一天" },
    { value: 'Week', text: "近一周" },
    { value: 'Month', text: "近一月" },
    { value: 'Year', text: "近一年" },
    { value: 'Custom', text: "自定义" }
];
class echartEnum {
}
exports.echartEnum = echartEnum;
class AlarmSuperData {
    constructor() {
        this.dispatchedAboutAlarm = {
            seriesData: MockNumber(100, 10, 4),
            yData: ['车辆黑名单', '在逃库', '涉毒库', '涉稳库', '沉迷游戏库', '杀人库', '抢劫库', 'MAC黑名单', '涉黑库', '涉黄库'],
            legendData: ['有效', '无效', '待定', '未处理']
        };
    }
}
exports.AlarmSuperData = AlarmSuperData;
;
class FlowSuperData {
}
exports.FlowSuperData = FlowSuperData;
;
function MockNumber(x, y, z) {
    function Arr(x, y) {
        let result = [];
        for (let i = 0; i < y; i++) {
            let MockNum = Math.round(Math.random() * x);
            result.push(MockNum);
        }
        return result;
    }
    if (!z) {
        return Arr(x, y);
    }
    else {
        let MockArr = [];
        for (let i = 0; i < z; i++) {
            MockArr.push(Arr(x, y));
        }
        return MockArr;
    }
}
exports.MockNumber = MockNumber;
class AlarmResultEnum {
}
exports.AlarmResultEnum = AlarmResultEnum;
;
class AreaInfo {
    constructor() {
        this.Name = "";
        this.ID = "";
    }
}
exports.AreaInfo = AreaInfo;
;
exports.AlarmStatusType = {
    Unknow: { value: "Unknow", text: "未知" },
    Valid: { value: "Valid", text: "有效" },
    Invalid: { value: "Invalid", text: "无效" },
    Indeterminate: { value: "Indeterminate", text: "待定" },
    Undisposed: { value: "Undisposed", text: "未处理" }
};
class dispatchedResult {
}
exports.dispatchedResult = dispatchedResult;
class devicestausbarEnum {
}
exports.devicestausbarEnum = devicestausbarEnum;
class statisticalAnalysisModuleName {
}
statisticalAnalysisModuleName.taskStatistics = "taskStatistics";
statisticalAnalysisModuleName.alarmStatistics = "alarmStatistics";
statisticalAnalysisModuleName.trafficStatistics = "trafficStatistics";
statisticalAnalysisModuleName.retrievalStatistics = "retrievalStatistics";
statisticalAnalysisModuleName.analysissTatistics = "analysissTatistics";
exports.statisticalAnalysisModuleName = statisticalAnalysisModuleName;
class taskStatisticsModuleName {
}
taskStatisticsModuleName.areaTaskStatistics = "areaTaskStatistics";
taskStatisticsModuleName.areaDispatchedTaskStatistics = "areaDispatchedTaskStatistics";
taskStatisticsModuleName.dispatchedAboutTaskStatistics = "dispatchedAboutTaskStatistics";
exports.taskStatisticsModuleName = taskStatisticsModuleName;
class AlarmStatisticsModuleName {
}
AlarmStatisticsModuleName.areaAlarm = "areaAlarm";
AlarmStatisticsModuleName.areaAlarmTrend = "areaAlarmTrend";
AlarmStatisticsModuleName.deviceAlarmStatistics = "deviceAlarmStatistics";
AlarmStatisticsModuleName.dispatchedAboutAlarm = "dispatchedAboutAlarm";
exports.AlarmStatisticsModuleName = AlarmStatisticsModuleName;
class TrafficStatisticsModuleName {
}
TrafficStatisticsModuleName.areaTrafficStatistics = "areaTrafficStatistics";
TrafficStatisticsModuleName.areaTrafficTrend = "areaTrafficTrend";
TrafficStatisticsModuleName.deviceTrafficStatistics = "deviceTrafficStatistics";
exports.TrafficStatisticsModuleName = TrafficStatisticsModuleName;
class RetrievalStatisticModuleName {
}
RetrievalStatisticModuleName.retrievalStatistic = "retrievalStatistic";
RetrievalStatisticModuleName.retrievalTrafficTrend = "retrievalTrafficTrend";
RetrievalStatisticModuleName.rankStatistics = "rankStatistics";
exports.RetrievalStatisticModuleName = RetrievalStatisticModuleName;
class analysisStatisticModuleNames {
}
analysisStatisticModuleNames.IntelligentAnalysis_Vehicle = "IntelligentAnalysis_Vehicle";
analysisStatisticModuleNames.IntelligentAnalysis_Face = "IntelligentAnalysis_Face";
analysisStatisticModuleNames.IntelligentAnalysis_Mac = "IntelligentAnalysis_Mac";
analysisStatisticModuleNames.IntelligentAnalysis_Crash = "IntelligentAnalysis_Crash";
exports.analysisStatisticModuleNames = analysisStatisticModuleNames;
class RetrievalStatisticParamModuleNames {
}
RetrievalStatisticParamModuleNames.ResourceRetrieval_FullSearch = "ResourceRetrieval_FullSearch";
RetrievalStatisticParamModuleNames.ResourceRetrieval_AdvanceSearch_Vehicle = "ResourceRetrieval_AdvanceSearch_Vehicle";
RetrievalStatisticParamModuleNames.ResourceRetrieval_AdvanceSearch_Face = "ResourceRetrieval_AdvanceSearch_Face";
RetrievalStatisticParamModuleNames.ResourceRetrieval_AdvanceSearch_WiFi = "ResourceRetrieval_AdvanceSearch_WiFi";
RetrievalStatisticParamModuleNames.ResourceRetrieval_AdvanceSearch_EFence = "ResourceRetrieval_AdvanceSearch_EFence";
exports.RetrievalStatisticParamModuleNames = RetrievalStatisticParamModuleNames;
exports.echartNameArr = {
    taskStatistics: "任务统计",
    alarmStatistics: "报警统计",
    trafficStatistics: "流量统计",
    retrievalStatistics: "统计检索",
    analysissTatistics: "分析统计",
    areaTaskStatistics: "区域结构化任务统计",
    areaDispatchedTaskStatistics: "区域布控任务统计",
    dispatchedAboutTaskStatistics: "布控库关联任务统计",
    areaAlarm: "区域报警数",
    areaAlarmTrend: "区域报警趋势",
    deviceAlarmStatistics: "设备报警统计(TOP10)",
    dispatchedAboutAlarm: "布控库关联报警统计(TOP10)",
    areaTrafficStatistics: "区域流量统计",
    areaTrafficTrend: "区域流量趋势",
    deviceTrafficStatistics: "设备流量统计(TOP10)",
    retrievalStatistic: "检索统计",
    retrievalTrafficTrend: "检索趋势统计",
    rankStatistics: "高频检索关键字排行",
    IntelligentAnalysis_Vehicle: "车辆分析统计",
    IntelligentAnalysis_Face: "人员分析统计",
    IntelligentAnalysis_Mac: "感知数据分析统计",
    IntelligentAnalysis_Crash: "多元碰撞分析统计"
};
class intelligentAnalysisDataEnum {
}
exports.intelligentAnalysisDataEnum = intelligentAnalysisDataEnum;
exports.intelligentAnalysisData = {
    areaTaskStatistics: "areaTaskStatistics",
    areaDispatchedTaskStatistics: "areaDispatchedTaskStatistics",
    dispatchedAboutTaskStatistics: "dispatchedAboutTaskStatistics",
    areaAlarm: "areaAlarm",
    areaAlarmTrend: "areaAlarmTrend",
    deviceAlarmStatistics: "deviceAlarmStatistics",
    dispatchedAboutAlarm: "dispatchedAboutAlarm",
    areaTrafficStatistics: "areaTrafficStatistics",
    areaTrafficTrend: "areaTrafficTrend",
    deviceTrafficStatistics: "deviceTrafficStatistics",
    Maintain_StatisOverview_Retrival: "retrievalStatistic",
    Maintain_StatisOverview_Retrival_Trend: "retrievalTrafficTrend",
    Maintain_StatisOverview_Retrival_Rank: "rankStatistics",
    IntelligentAnalysis_Vehicle: "IntelligentAnalysis_Vehicle",
    IntelligentAnalysis_Face: "IntelligentAnalysis_Face",
    IntelligentAnalysis_Mac: "IntelligentAnalysis_Mac",
    IntelligentAnalysis_Crash: "IntelligentAnalysis_Crash",
    AllRankList: "AllRankList",
};
class ExcelTableEnum {
}
exports.ExcelTableEnum = ExcelTableEnum;
class exportExcelParamEnum {
}
exports.exportExcelParamEnum = exportExcelParamEnum;
