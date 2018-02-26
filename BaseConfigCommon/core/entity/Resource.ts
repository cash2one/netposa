export class ResourcePageEnum {
    value: string;
    number: num;
    name: string;
}

export class num {
    todayFlow: string | number;
    totalFlow: string | number;
    totalCountNum: number = 0;
}

export const numTypeEnum = {
    todayFlow: 0,
    totalFlow: 0,
    totalCountNum: 0
};

export const IconClassName = ["i-rank-first", "i-rank-second", "i-rank-third", "i-rank-four", "i-rank-five"] as Array<string>;

//全部
export const ALLChartName = {
    ResourceStatisticalTotal: "ResourceStatisticalTotal",
    AreaTotalCollection: "AreaTotalCollection",
    AlarmStatistics: "AlarmStatistics",
    DataServiceStatistics: "DataServiceStatistics",
    ResourcebRetrievalTrend: "ResourcebRetrievalTrend",
    AllRankList: "AllRankList"
} as { [key: string]: string };

// 车辆
export const VehicleChartName = {
    carStatistics: "carStatistics",
    areaCarStatistics: "areaCarStatistics",
    areaCarAlarmStatistics: "areaCarAlarmStatistics",
    carTypeStatistics: "carTypeStatistics",
    carColorStatistics: "carColorStatistics",
    AllRankList: "AllRankList"
} as { [key: string]: string };

// 人像
export const FaceChartName = {
    PersonStatistics: "PersonStatistics",
    AreaPersonStatistics: "AreaPersonStatistics",
    AreaPersonAlarmStatistics: "AreaPersonAlarmStatistics",
    PersonTypeStatistics: "PersonTypeStatistics",
    PersonColorStatistics: "PersonColorStatistics",
    AllRankList: "AllRankList",
} as { [key: string]: string };

// wifi
export const WiFiChartName = {
    WifiStatistics: "WifiStatistics",
    AreaWifiStatistics: "AreaWifiStatistics",
    AreaWifiAlarmStatistics: "AreaWifiAlarmStatistics",
    WifiTypeStatistics: "WifiTypeStatistics",
    WifiColorStatistics: "WifiColorStatistics",
    WifiAllRankList: "WifiAllRankList"
} as { [key: string]: string };

// 电围
export const EFENCEChartName = {
    EFStatistics: "EFStatistics",
    AreaEFStatistics: "AreaEFStatistics",
    AreaEFAlarmStatistics: "AreaEFAlarmStatistics",
    EFTypeStatistics: "EFTypeStatistics",
    EFColorStatistics: "EFColorStatistics",
    EFAllRankList: "EFAllRankList"
} as { [key: string]: string };



export class ResourcePageTypeEnum {
    ALL: ResourcePageEnum;
    Vehicle: ResourcePageEnum;
    Face: ResourcePageEnum;
    WiFi: ResourcePageEnum;
    EFENCE: ResourcePageEnum;
}


export const ResourcePageType: ResourcePageTypeEnum = {
    ALL: { value: "ALL", name: "全部", number: numTypeEnum },
    Vehicle: { value: "Vehicle", name: "卡口车辆", number: numTypeEnum },
    Face: { value: "Face", name: "人像抓拍", number: numTypeEnum },
    WiFi: { value: "WiFi", name: "Wi-Fi热点", number: numTypeEnum },
    EFENCE: { value: "EFENCE", name: "电子围栏", number: numTypeEnum }
};

export const ResourcePageTypeEx = {
    Device: { value: "Device", name: "设备", number: numTypeEnum },
    Position: { value: "Position", name: "位置", number: numTypeEnum }
}

export class deviceNameEnum {
    person: string;
    EFENCE: string;
    Vehicle: string;
    WiFi: string;
}

export const deviceName: deviceNameEnum = {
    person: "人像",
    EFENCE: "电围",
    Vehicle: "车辆",
    WiFi: "Wi-Fi"
}

export class ISwitchButton {
    //控制全部、卡口、人像、热点、电围的切换
    VehicleStatistics: boolean;
    FaceStatistics: boolean;
    ALLStatistics: boolean;
    // 控制全部、卡口等的右边切换为统计
    VehicleRight: boolean;
    FaceRight: boolean;
    ALLRight: boolean;
    // 控制切换图表相关
    switch: boolean;
    switchChart: string[];
    defaultChart: string;
}

export const switchButton: ISwitchButton = {
    ALLStatistics: true,
    VehicleStatistics: false,
    FaceStatistics: false,

    ALLRight: true,
    VehicleRight: false,
    FaceRight: false,

    switch: false,
    switchChart: Object.keys(ResourcePageType),
    defaultChart: ''
};

export const ResourceNameArr: { [key: string]: string } = {
    ResourceStatisticalTotal: "资源统计总量",
    AreaTotalCollection: "区域分类采集总量(TOP5)",
    AlarmStatistics: "资源类型报警统计趋势",
    DataServiceStatistics: "数据服务统计",
    ResourcebRetrievalTrend: "资源检索趋势统计",
    AllRankList: "高频检索关键字(TOP5)",

    carStatistics: "车辆统计总量",
    areaCarStatistics: "区域车辆统计总量(TOP5)",
    areaCarAlarmStatistics: "区域车辆报警统计趋势",
    carTypeStatistics: "车牌颜色统计",
    carColorStatistics: "车辆类型统计",
    CarRankList: "高频检索车辆关键字(TOP5)",

    PersonStatistics: "人员统计总量",
    AreaPersonStatistics: "区域人员统计总量(TOP5)",
    AreaPersonAlarmStatistics: "区域人员报警统计趋势",
    PersonTypeStatistics: "人员检索服务统计",
    PersonColorStatistics: "人员分析服务统计",
    PersonRankList: "高频检索人像关键字(TOP5)",

    WifiStatistics: "Wi-Fi统计总量",
    AreaWifiStatistics: "区域Wi-Fi统计总量(TOP5)",
    AreaWifiAlarmStatistics: "区域Wi-Fi报警统计趋势",
    WifiTypeStatistics: "Wi-Fi检索服务统计",
    WifiColorStatistics: "Wi-Fi设备报警统计",
    WifiAllRankList: "高频检索Wi-Fi关键字(TOP5)",

    EFStatistics: "电围统计总量",
    AreaEFStatistics: "区域电围统计总量(TOP5)",
    AreaEFAlarmStatistics: "区域电围报警统计趋势",
    EFTypeStatistics: "电围检索服务统计",
    EFColorStatistics: "电围设备报警统计",
    EFRankList: "高频检索电围关键字(TOP5)",

    NOData: "暂无数据"
}