"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IResourceStatisticalTotal {
    constructor() {
        this.dateList = [];
        this.series = {};
        this.playData = [];
    }
}
exports.IResourceStatisticalTotal = IResourceStatisticalTotal;
class IAreaTotalCollection {
    constructor() {
        this.dateList = [];
        this.playData = [];
        this.legendData = [];
        this.series = new IAreaTotalCollectionSeries();
    }
}
exports.IAreaTotalCollection = IAreaTotalCollection;
class IAreaTotalCollectionSeries {
    constructor() {
        this.rmpgate = [];
        this.camera = [];
        this.wifi = [];
        this.electronicfence = [];
    }
}
exports.IAreaTotalCollectionSeries = IAreaTotalCollectionSeries;
class IAlarmStatistics {
    constructor() {
        this.dateList = [];
        this.series = new IAreaTotalCollectionSeries();
        this.legendData = [];
        this.playData = [];
    }
}
exports.IAlarmStatistics = IAlarmStatistics;
class IDataServiceStatisticsSeries {
    constructor() {
        this.Search = 0;
        this.PersonAnalyse = 0;
        this.VehicleAnalyse = 0;
        this.MacCollison = 0;
        this.ViewCude = 0;
    }
    static instance() {
        return {
            Search: 0,
            PersonAnalyse: 0,
            VehicleAnalyse: 0,
            MacCollison: 0,
            ViewCube: 0
        };
    }
}
exports.IDataServiceStatisticsSeries = IDataServiceStatisticsSeries;
class IDataServiceStatistics {
    constructor() {
        this.dateList = [];
        this.playData = [];
        this.legendData = [];
        this.series = new IDataServiceStatisticsSeries();
    }
}
exports.IDataServiceStatistics = IDataServiceStatistics;
class IResourcebRetrievalTrend {
    constructor() {
        this.series = new IAreaTotalCollectionSeries();
        this.dateList = [];
        this.legendData = [];
        this.playData = [];
    }
}
exports.IResourcebRetrievalTrend = IResourcebRetrievalTrend;
class IAllRankList {
    constructor() {
        this.series = [];
        this.playData = [];
        this.dateList = [];
    }
}
exports.IAllRankList = IAllRankList;
exports.ResourceType = {
    wifi: { key: 'WiFi', value: 'Wi-Fi' },
    electronicfence: { key: 'EFENCE', value: '电子围栏' },
    rmpgate: { key: 'Vehicle', value: '卡口' },
    camera: { key: 'Face', value: '人脸' }
};
exports.ResourceType2 = {
    wifi: { key: 'WiFiSearch', value: 'Wi-Fi' },
    electronicfence: { key: 'EFenceSearch', value: '电子围栏' },
    rmpgate: { key: 'VehicleSearch', value: '卡口' },
    camera: { key: 'FaceSearch', value: '人脸' }
};
exports.AnalyseType = {
    Search: { key: 'Search', value: '检索' },
    PersonAnalyse: { key: 'PersonAnalyse', value: '人像分析' },
    VehicleAnalyse: { key: 'VehicleAnalyse', value: '车辆分析' },
    MacCollison: { key: 'MacCollison', value: 'Mac碰撞' },
    ViewCube: { key: 'ViewCube', value: '视图立方' }
};
exports.ResourceFaceType = {
    PersonTrack: { key: 'PersonTrack', value: '人员轨迹' },
    FaceAnalyse: { key: 'FaceAnalyse', value: '人脸分析' },
    SimilarityAnalyse: { key: 'SimilarityAnalyse', value: '相似度分析' },
    AccompanyAnalyse: { key: 'AccompanyAnalyse', value: '伴随分析' },
    FaceCollision: { key: 'FaceCollision', value: '人脸碰撞' },
    FrequentInfestation: { key: 'FrequentInfestation', value: '频繁出没' },
    FaceFrequencyAnalyse: { key: 'FaceFrequencyAnalyse', value: '频次分析' },
    PersonAlarm: { key: 'PersonAlarm', value: '人员报警' }
};
class IResourceChart {
    constructor() {
        this.ResourceStatisticalTotal = new IResourceStatisticalTotal();
        this.AreaTotalCollection = new IAreaTotalCollection();
        this.AlarmStatistics = new IAlarmStatistics();
        this.DataServiceStatistics = new IDataServiceStatistics();
        this.ResourcebRetrievalTrend = new IResourcebRetrievalTrend();
        this.AllRankList = new IAllRankList();
        this.IMapResource = new IMapResource();
    }
}
exports.IResourceChart = IResourceChart;
class IMapResource {
    constructor() {
        this.deviceList = [];
        this.series = [];
        this.dateList = [];
        this.playData = [];
    }
}
exports.IMapResource = IMapResource;
class CountEnum {
    constructor() {
        this.todayFlow = 0;
        this.totalFlow = 0;
    }
}
exports.CountEnum = CountEnum;
class IResourceCount {
    constructor() {
        this.WIFI = new CountEnum();
        this.EFENCE = new CountEnum();
        this.Car = new CountEnum();
        this.Face = new CountEnum();
    }
}
exports.IResourceCount = IResourceCount;
class IStatistics {
    constructor() {
        this.dateList = [];
        this.playData = [];
        this.legendData = [];
        this.series = { alarm: [], flow: [] };
    }
}
exports.IStatistics = IStatistics;
class IAreaOtherAlarmStatistics {
    constructor() {
        this.legendData = [];
        this.xData = [];
        this.series = [];
        this.dateList = [];
        this.playData = [];
    }
}
exports.IAreaOtherAlarmStatistics = IAreaOtherAlarmStatistics;
class ITypeStatistics {
    constructor() {
        this.legendData = [];
        this.series = [];
        this.dateList = [];
        this.playData = [];
    }
}
exports.ITypeStatistics = ITypeStatistics;
class IPersonStatistics extends IStatistics {
}
exports.IPersonStatistics = IPersonStatistics;
class IAreaPersonAlarmStatistics extends IAreaOtherAlarmStatistics {
}
exports.IAreaPersonAlarmStatistics = IAreaPersonAlarmStatistics;
class IPersonTypeStatistics extends ITypeStatistics {
}
exports.IPersonTypeStatistics = IPersonTypeStatistics;
class IWifiStatistics extends IStatistics {
}
exports.IWifiStatistics = IWifiStatistics;
class IAreaWifiAlarmStatistics extends IAreaOtherAlarmStatistics {
}
exports.IAreaWifiAlarmStatistics = IAreaWifiAlarmStatistics;
class IWifiTypeStatistics extends ITypeStatistics {
}
exports.IWifiTypeStatistics = IWifiTypeStatistics;
class IElectronicfenceStatistics extends IStatistics {
}
exports.IElectronicfenceStatistics = IElectronicfenceStatistics;
class IAreaElectronicfenceAlarmStatistics extends IAreaOtherAlarmStatistics {
}
exports.IAreaElectronicfenceAlarmStatistics = IAreaElectronicfenceAlarmStatistics;
class IElectronicfenceTypeStatistics extends ITypeStatistics {
}
exports.IElectronicfenceTypeStatistics = IElectronicfenceTypeStatistics;
class IPersonResourceChart {
    constructor() {
        this.PersonStatistics = new IPersonStatistics();
        this.AreaPersonStatistics = new IPersonStatistics();
        this.AreaPersonAlarmStatistics = new IAreaPersonAlarmStatistics();
        this.PersonTypeStatistics = new IPersonTypeStatistics();
        this.PersonColorStatistics = new IPersonTypeStatistics();
        this.PersonAllRankList = new IAllRankList();
        this.IMapResource = new IMapResource();
    }
}
exports.IPersonResourceChart = IPersonResourceChart;
class IWifiResourceChart {
    constructor() {
        this.WifiStatistics = new IWifiStatistics();
        this.AreaWifiStatistics = new IWifiStatistics();
        this.AreaWifiAlarmStatistics = new IAreaWifiAlarmStatistics();
        this.WifiTypeStatistics = new IWifiTypeStatistics();
        this.WifiColorStatistics = new IWifiTypeStatistics();
        this.WifiAllRankList = new IAllRankList();
        this.IMapResource = new IMapResource();
    }
}
exports.IWifiResourceChart = IWifiResourceChart;
class IElectronicfenceResourceChart {
    constructor() {
        this.EFStatistics = new IElectronicfenceStatistics();
        this.AreaEFStatistics = new IElectronicfenceStatistics();
        this.AreaEFAlarmStatistics = new IAreaElectronicfenceAlarmStatistics();
        this.EFTypeStatistics = new IElectronicfenceTypeStatistics();
        this.EFColorStatistics = new IElectronicfenceTypeStatistics();
        this.EFAllRankList = new IAllRankList();
        this.IMapResource = new IMapResource();
    }
}
exports.IElectronicfenceResourceChart = IElectronicfenceResourceChart;
