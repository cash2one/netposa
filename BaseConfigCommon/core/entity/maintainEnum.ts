//用户状态
export class CasCadeSearchParams {
    startTime: string;
    endTime: string;
    areaName: string;
    userName: string;
    orderType: string;
    currentPage: number;
    pageSize: number;
}

export class userInfoResult {
    userName: string;
    areaName: string;
    unit: string;
    role: string;
    IP: string;
    time: string;
    module: number;
}

// 图表
export class intelligentAnalysisRequireParams {
    beginDate: string;
    endDate: string;
    moduleNames: string;
    statisticModuleLevel: number;
    timeType?: string;
};

export const analysisStatisticsParams: intelligentAnalysisRequireParams = {
    beginDate: "",
    endDate: "",
    moduleNames: "",
    statisticModuleLevel: 3,
};

export class alarmTrafficReqEnum {
    AreaName?: string;
    module?: string;
    groupType?: string;

    beginDate: string;
    endDate: string;
    resourceType?: string;
    timeType: string;
}

export const alarmTrafficReqParams: any = {
    beginDate: "",
    endDate: "2017-11-16 23:59:59",
    resourceType: "ALL",
    timeType: "Day"
};


export class analysisStatisticsResult {
    num: string;
    timeItem: string;
    functionType: string;
}

export class echartSuperData {
    seriesData?: Array<any>;
    xData?: Array<string>;
    yData?: Array<string>;
    legendData?: Array<string>
}

// 统计分析
export class StatisticsOverview {
    title: string;
    total: number;
    online: number;
    alarm: number;
    imagesPath: string;
    type: string;
}

export const StatisticsOverviewArr: Array<StatisticsOverview> = [
    { title: "FDS_02_02_29", type: "Face", total: 0, online: 0, alarm: 0, imagesPath: "../../../images/maintain/item-camera.png" },
    { title: "FDS_02_02_30", type: "WiFi", total: 0, online: 0, alarm: 0, imagesPath: "../../../images/maintain/Wi-Fi.png" },
    { title: "FDS_02_02_31", type: "EFENCE", total: 0, online: 0, alarm: 0, imagesPath: "../../../images/maintain/electronicfence.png" },
    { title: "FDS_02_02_32", type: "RmpGate", total: 0, online: 0, alarm: 0, imagesPath: "../../../images/maintain/rmpgate.png" }
];

//报警统计
export class areaColor {
    color: string;
}

// export const areaDropList: Array<areaColor> = [
//     { text: '武昌区', value: 'aaa', color: '#6c8ce4', selected: false },
//     { text: '江岸区', value: 'bbb', color: '#7cccf2', selected: false },
//     { text: '江汉区', value: 'ccc', color: '#dcbe99', selected: false },
//     { text: '硚口区', value: 'ddd', color: '#F8F0E9', selected: false },
//     { text: '汉阳区', value: 'eee', color: '#C9C9C9', selected: false },
//     { text: '青山区', value: 'fff', color: '#6F6E6E', selected: false },
//     { text: '洪山区', value: 'ggg', color: '#7CCCF2', selected: false },
//     { text: '蔡甸区', value: 'hhh', color: '#53c68c', selected: false },
//     { text: '江夏区', value: 'iii', color: '#9ad941', selected: false },
//     { text: '黄陂区', value: 'jjj', color: '#fbd15a', selected: false },
//     { text: '新洲区', value: 'kkk', color: '#9cdcee', selected: false },
//     { text: '东西湖区', value: 'lll', color: '#e98371', selected: false }
// ];

export const areaDropList: Array<areaColor> = [
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
/**
 *
 * @param modules 需要转换模块名为中文名的模块
 * @param type 模块内模块名的key
 * @param modulesEnum 枚举对象
 */

export function changeTheModuleName(modules: Array<any>, type: string, modulesEnum: any) {
    let moduleEnum = Object.keys(modulesEnum);
    modules.forEach((module: any, index) => {
        moduleEnum.forEach((Enum: string) => {
            if (module[type]) {
                if (module[type].trim() === Enum) {
                    modules[index][type] = modulesEnum[Enum].name
                }
            }
        });
    });
    return modules
}

//公共枚举
export class deviceInfoEnum {
    value: string;
    text: string;
    alarm: number = 0;
    flow: number = 0;
}

export class topSearchResult {
    num: number;
    objectType: string;
    statisticsItem: string;
    timeItem: string;
}


export class AlarmObjectEnum {
    Camera: deviceInfoEnum;
    WiFi: deviceInfoEnum;
    RmpGate: deviceInfoEnum;
    EFENCE: deviceInfoEnum;
    Face: deviceInfoEnum;
    Vehicle: deviceInfoEnum;
    Device: deviceInfoEnum;
    LOCATION: deviceInfoEnum;
    ALL: deviceInfoEnum;
}

export const AlarmObjectType: AlarmObjectEnum = {
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

export const CommonDeviceType: Array<string> = [AlarmObjectType.Face.text, AlarmObjectType.Vehicle.text, AlarmObjectType.WiFi.text, AlarmObjectType.EFENCE.text];

export class dropEnum {
    value?: string;
    color?: string;
    text: string;
    isSelected: boolean = false
}

export class deviceStatisticsEnum {
    seriesData: Array<number> = [];
    yData: Array<string> = [];
}


export class deviceItemResponseResult {
    alarm: number;
    deviceID: string;
    flow: number;
    latitude: number;
    longitude: number;
    objectType: string;
    timeItem: string;
}

//报警流量趋势
export class alarmTrafficTrend {
    areaInfo: Array<alarmTrafficTrendAreaInfo>;
    trendStatistics: Array<alarmTrafficTrendData>;
};

export class alarmTrafficTrendAreaInfo {
    Name: string;
    ID: string;
}

export class alarmTrafficTrendData {
    alarm: number;
    areaID: string;
    areaName: string;
    flow: number;
    objectType: string;
    timeItem: string;
}

export class alarmTrafficTimeFormat {
    timeItem: string;
    AlarmNm: number;
    FlowNm: number;
}

export class dataFilterParam {
    module: string;
    AreaName: string;
    deviceName: string;
    timeType: string;
}

export const initParam: dataFilterParam = {
    module: "alarm",
    AreaName: "ALL",
    deviceName: "EFENCE",
    timeType: "month",
};


// 时间控件
export class selectDataEnum {
    value: string;
    text: string;
}

export const SelectData = [
    { value: 'ALL', text: "全部" },
    { value: 'Day', text: "近一天" },
    { value: 'Week', text: "近一周" },
    { value: 'Month', text: "近一月" },
    { value: 'Year', text: "近一年" },
    { value: 'Custom', text: "自定义" }
] as Array<selectDataEnum>;

// echart格式
export class echartEnum {
    seriesData: Array<Array<number>> | Array<number>;
    xData?: Array<string>;
    legendData?: Array<string>;
    yData?: Array<string>;
}

// 报警统计
export class AlarmSuperData {
    dropListArea: Array<string>;
    dropListType: Array<string>;
    areaAlarm: echartEnum;
    areaAlarmTrend: echartEnum;
    deviceAlarmStatistics: echartEnum;
    dispatchedAboutAlarm: echartEnum = {
        seriesData: MockNumber(100, 10, 4),
        yData: ['车辆黑名单', '在逃库', '涉毒库', '涉稳库', '沉迷游戏库', '杀人库', '抢劫库', 'MAC黑名单', '涉黑库', '涉黄库'],
        legendData: ['有效', '无效', '待定', '未处理']
    };
};

// 流量统计
export class FlowSuperData {
    dropListArea: Array<string>;
    dropListType: Array<string>;
    areaTrafficStatistics: echartEnum;
    areaTrafficTrend: echartEnum;
    deviceTrafficStatistics: echartEnum;
};

export function MockNumber(x: number, y: number, z?: number) {
    function Arr(x: number, y: number) {
        let result: Array<number> = [];
        for (let i = 0; i < y; i++) {
            let MockNum: number = Math.round(Math.random() * x);
            result.push(MockNum)
        }
        return result
    }
    if (!z) {
        return Arr(x, y)
    } else {
        let MockArr: Array<Array<number>> = [];
        for (let i = 0; i < z; i++) {
            MockArr.push(Arr(x, y));
        }
        return MockArr
    }
}

// NODE
export class AlarmResultEnum {
    alarm: number;
    areaID: string;
    deviceID: string;
    deviceName?: string;
    areaName: string;
    flow: number;
    objectType: string;
    timeItem: string;
    latitude: number;
    longitude: number;
};

export class AreaInfo {
    Name: string = "";
    ID: string = "";
};

// 布控库状态枚举
interface IAlarmStatusType {
    Unknow: selectDataEnum;
    Valid: selectDataEnum;
    Invalid: selectDataEnum;
    Indeterminate: selectDataEnum;
    Undisposed: selectDataEnum;
}

export const AlarmStatusType: { [key: string]: selectDataEnum } & IAlarmStatusType = {
    Unknow: { value: "Unknow", text: "未知" },
    Valid: { value: "Valid", text: "有效" },
    Invalid: { value: "Invalid", text: "无效" },
    Indeterminate: { value: "Indeterminate", text: "待定" },
    Undisposed: { value: "Undisposed", text: "未处理" }
}

export class dispatchedResult {
    Count: number;
    ID: string;
    Status: string;
    name: string;
}

export class devicestausbarEnum {
    RmpCount: number;
    RmpOnLine: number;
    CameraCount: number;
    CameraOnLine: number;
    EFENCECount: number;
    EFENCEOnLine: number;
    WIFICount: number;
    WIFIOnLine: number
}
export class statisticalAnalysisModuleName {
    static taskStatistics = "taskStatistics";
    static alarmStatistics = "alarmStatistics";
    static trafficStatistics = "trafficStatistics";
    static retrievalStatistics = "retrievalStatistics";
    static analysissTatistics = "analysissTatistics";
}

export class taskStatisticsModuleName {
    static areaTaskStatistics = "areaTaskStatistics";
    static areaDispatchedTaskStatistics = "areaDispatchedTaskStatistics";
    static dispatchedAboutTaskStatistics = "dispatchedAboutTaskStatistics";
}

export class AlarmStatisticsModuleName {
    static areaAlarm = "areaAlarm";
    static areaAlarmTrend = "areaAlarmTrend";
    static deviceAlarmStatistics = "deviceAlarmStatistics";
    static dispatchedAboutAlarm = "dispatchedAboutAlarm";
}

export class TrafficStatisticsModuleName {
    static areaTrafficStatistics = "areaTrafficStatistics";
    static areaTrafficTrend = "areaTrafficTrend";
    static deviceTrafficStatistics = "deviceTrafficStatistics";
}

export class RetrievalStatisticModuleName {
    static retrievalStatistic = "retrievalStatistic";
    static retrievalTrafficTrend = "retrievalTrafficTrend";
    static rankStatistics = "rankStatistics";
}

export class analysisStatisticModuleNames {
    static IntelligentAnalysis_Vehicle = "IntelligentAnalysis_Vehicle";
    static IntelligentAnalysis_Face = "IntelligentAnalysis_Face";
    static IntelligentAnalysis_Mac = "IntelligentAnalysis_Mac";
    static IntelligentAnalysis_Crash = "IntelligentAnalysis_Crash";
}

export class RetrievalStatisticParamModuleNames {
    static ResourceRetrieval_FullSearch = "ResourceRetrieval_FullSearch";
    static ResourceRetrieval_AdvanceSearch_Vehicle = "ResourceRetrieval_AdvanceSearch_Vehicle";
    static ResourceRetrieval_AdvanceSearch_Face = "ResourceRetrieval_AdvanceSearch_Face";
    static ResourceRetrieval_AdvanceSearch_WiFi = "ResourceRetrieval_AdvanceSearch_WiFi";
    static ResourceRetrieval_AdvanceSearch_EFence = "ResourceRetrieval_AdvanceSearch_EFence";
}

export const echartNameArr: { [key: string]: string } = {
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
}

export class intelligentAnalysisDataEnum {
    //任务统计
    areaTaskStatistics: string;
    areaDispatchedTaskStatistics: string;
    dispatchedAboutTaskStatistics: string;
    //报警统计
    areaAlarm: string;
    areaAlarmTrend: string;
    deviceAlarmStatistics: string;
    dispatchedAboutAlarm: string;
    //流量统计
    areaTrafficStatistics: string;
    areaTrafficTrend: string;
    deviceTrafficStatistics: string;
    //检索统计
    Maintain_StatisOverview_Retrival: string;
    Maintain_StatisOverview_Retrival_Trend: string;
    Maintain_StatisOverview_Retrival_Rank: string;
    //分析统计
    IntelligentAnalysis_Vehicle: string;
    IntelligentAnalysis_Face: string;
    IntelligentAnalysis_Mac: string;
    IntelligentAnalysis_Crash: string;
    // 排行
    AllRankList: string;
}

export const intelligentAnalysisData: intelligentAnalysisDataEnum = {
    //任务统计
    areaTaskStatistics: "areaTaskStatistics",
    areaDispatchedTaskStatistics: "areaDispatchedTaskStatistics",
    dispatchedAboutTaskStatistics: "dispatchedAboutTaskStatistics",
    //报警统计
    areaAlarm: "areaAlarm",
    areaAlarmTrend: "areaAlarmTrend",
    deviceAlarmStatistics: "deviceAlarmStatistics",
    dispatchedAboutAlarm: "dispatchedAboutAlarm",
    //流量统计
    areaTrafficStatistics: "areaTrafficStatistics",
    areaTrafficTrend: "areaTrafficTrend",
    deviceTrafficStatistics: "deviceTrafficStatistics",
    //检索统计
    Maintain_StatisOverview_Retrival: "retrievalStatistic",
    Maintain_StatisOverview_Retrival_Trend: "retrievalTrafficTrend",
    Maintain_StatisOverview_Retrival_Rank: "rankStatistics",
    //分析统计
    IntelligentAnalysis_Vehicle: "IntelligentAnalysis_Vehicle",
    IntelligentAnalysis_Face: "IntelligentAnalysis_Face",
    IntelligentAnalysis_Mac: "IntelligentAnalysis_Mac",
    IntelligentAnalysis_Crash: "IntelligentAnalysis_Crash",
    // 排行
    AllRankList: "AllRankList",
};

export class ExcelTableEnum {
    sheetName?: string;
    sheetData: Array<Array<string | number>>;
    sheetHeader: Array<string | number>
}

export class exportExcelParamEnum {
    fileName: string;
    datas: Array<ExcelTableEnum>
}