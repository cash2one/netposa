"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResourcePageEnum {
}
exports.ResourcePageEnum = ResourcePageEnum;
class num {
    constructor() {
        this.totalCountNum = 0;
    }
}
exports.num = num;
exports.numTypeEnum = {
    todayFlow: 0,
    totalFlow: 0,
    totalCountNum: 0
};
class ALLChartName {
}
exports.ALLChartName = ALLChartName;
class VehicleChartName {
}
exports.VehicleChartName = VehicleChartName;
class FaceChartName {
}
exports.FaceChartName = FaceChartName;
class WiFiChartName {
}
exports.WiFiChartName = WiFiChartName;
class EFENCEChartName {
}
exports.EFENCEChartName = EFENCEChartName;
class ResourcePageTypeEnum {
}
exports.ResourcePageTypeEnum = ResourcePageTypeEnum;
exports.ResourcePageType = {
    ALL: { value: "ALL", name: "全部", number: exports.numTypeEnum },
    Vehicle: { value: "Vehicle", name: "卡口车辆", number: exports.numTypeEnum },
    Face: { value: "Face", name: "人像抓拍", number: exports.numTypeEnum },
    WiFi: { value: "WiFi", name: "Wi-Fi热点", number: exports.numTypeEnum },
    EFENCE: { value: "EFENCE", name: "电子围栏", number: exports.numTypeEnum }
};
exports.ResourcePageTypeEx = {
    Device: { value: "Device", name: "设备", number: exports.numTypeEnum },
    Position: { value: "Position", name: "位置", number: exports.numTypeEnum }
};
class deviceNameEnum {
}
exports.deviceNameEnum = deviceNameEnum;
exports.deviceName = {
    person: "人像",
    EFENCE: "电围",
    Vehicle: "车辆",
    WiFi: "Wi-Fi"
};
class ISwitchButton {
}
exports.ISwitchButton = ISwitchButton;
exports.switchButton = {
    ALLStatistics: true,
    VehicleStatistics: false,
    FaceStatistics: false,
    ALLRight: true,
    VehicleRight: false,
    FaceRight: false,
    switch: false,
    switchChart: Object.keys(exports.ResourcePageType),
    defaultChart: ''
};
exports.ResourceNameArr = {
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
    WifiRankList: "高频检索Wi-Fi关键字(TOP5)",
    EFStatistics: "电围统计总量",
    AreaEFStatistics: "区域电围统计总量(TOP5)",
    AreaEFAlarmStatistics: "区域电围报警统计趋势",
    EFTypeStatistics: "电围检索服务统计",
    EFColorStatistics: "电围设备报警统计",
    EFRankList: "高频检索电围关键字(TOP5)",
    NOData: "暂无数据"
};
