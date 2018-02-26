export class IResourceStatisticalTotal {
    dateList: Array<string> = [];
    series: { alarm: number, flow: number } = {} as { alarm: number, flow: number };
    playData: Array<{ alarm: number, flow: number }> = [];
}

export class IAreaTotalCollection {
    dateList: Array<string> = [];
    playData: Array<IAreaTotalCollectionSeries> = [];
    legendData: Array<string> = [];
    series: IAreaTotalCollectionSeries = new IAreaTotalCollectionSeries();
}

export class IAreaTotalCollectionSeries {
    rmpgate: Array<number> = [];
    camera: Array<number> = [];
    wifi: Array<number> = [];
    electronicfence: Array<number> = [];
}

export class IAlarmStatistics {
    dateList: Array<string> = [];
    series: IAreaTotalCollectionSeries = new IAreaTotalCollectionSeries();
    legendData: Array<string> = []
    playData: Array<IAreaTotalCollectionSeries> = [];
}

export class IDataServiceStatisticsSeries {
    static instance(){
        return {
            Search: 0,
            PersonAnalyse: 0,
            VehicleAnalyse: 0,
            MacCollison: 0,
            ViewCube: 0
        }
    }
    Search: number = 0;
    PersonAnalyse: number = 0;
    VehicleAnalyse: number = 0;
    MacCollison: number = 0;
    ViewCude: number = 0;
}

export class IDataServiceStatistics {
    dateList: Array<string> = [];
    playData: Array<IDataServiceStatisticsSeries> = [];
    legendData: Array<string> = [];
    series: IDataServiceStatisticsSeries = new IDataServiceStatisticsSeries()
}

export class IResourcebRetrievalTrend {
    series: IAreaTotalCollectionSeries = new IAreaTotalCollectionSeries();
    dateList: Array<string> = [];
    legendData: Array<string> = [];
    playData: Array<IAreaTotalCollectionSeries> = [];
}

export class IAllRankList {
    series:Array<{name: string,value: number}>= []
    playData: Array<Array<{name: string,value: number}>> = [];
    dateList: Array<string> = [];
}

export interface Enum {
    key: string;
    value: string;
}
export const ResourceType:{[key:string]:Enum} = {
    wifi:  { key: 'WiFi', value: 'Wi-Fi' },
    electronicfence:{ key: 'EFENCE', value: '电子围栏' },
    rmpgate:{ key: 'Vehicle', value: '卡口' },
    camera: { key: 'Face', value: '人脸' }
};

export const ResourceType2:{[key:string]:Enum} = {
    wifi:  { key: 'WiFiSearch', value: 'Wi-Fi' },
    electronicfence:{ key: 'EFenceSearch', value: '电子围栏' },
    rmpgate:{ key: 'VehicleSearch', value: '卡口' },
    camera: { key: 'FaceSearch', value: '人脸' }
};
export const AnalyseType:{[key:string]:Enum} = {
    Search:  { key: 'Search', value: '检索' },
    PersonAnalyse: { key: 'PersonAnalyse', value: '人像分析' },
    VehicleAnalyse:  { key: 'VehicleAnalyse', value: '车辆分析' },
    MacCollison:{ key: 'MacCollison', value: 'Mac碰撞' },
    ViewCube: { key: 'ViewCube', value: '视图立方' }
};
export const ResourceFaceType:{[key:string]:Enum} = {
    PersonTrack:  { key: 'PersonTrack', value: '人员轨迹' },
    FaceAnalyse: { key: 'FaceAnalyse', value: '人脸分析' },
    SimilarityAnalyse:  { key: 'SimilarityAnalyse', value: '相似度分析' },
    AccompanyAnalyse:{ key: 'AccompanyAnalyse', value: '伴随分析' },
    FaceCollision: { key: 'FaceCollision', value: '人脸碰撞' },
    FrequentInfestation: { key: 'FrequentInfestation', value: '频繁出没' },
    FaceFrequencyAnalyse: { key: 'FaceFrequencyAnalyse', value: '频次分析' },
    PersonAlarm: { key: 'PersonAlarm', value: '人员报警' }
};

export class IResourceChart {
    ResourceStatisticalTotal: IResourceStatisticalTotal = new IResourceStatisticalTotal();
    AreaTotalCollection: IAreaTotalCollection = new IAreaTotalCollection();
    AlarmStatistics: IAlarmStatistics = new IAlarmStatistics();
    DataServiceStatistics: IDataServiceStatistics = new IDataServiceStatistics(); 
    ResourcebRetrievalTrend: IResourcebRetrievalTrend = new IResourcebRetrievalTrend();
    AllRankList:IAllRankList = new IAllRankList();
    IMapResource:IMapResource = new IMapResource();
}
export class IMapResource {
    deviceList: Array<string> = [];
    series:  Array<{longitude:string,latitude:string,flow:string}>= [];
    dateList:Array<string> = [];
    playData:Array<Array<any>> = [];
}

export class CountEnum {
    todayFlow: number = 0;
    totalFlow: number = 0;
}

export class IResourceCount {
    WIFI: CountEnum = new CountEnum();
    EFENCE: CountEnum = new CountEnum();
    Car: CountEnum = new CountEnum();
    Face: CountEnum = new CountEnum();
}



export class IStatistics {
    dateList:Array<string> = [];
    playData:Array<{alarm: Array<number> ,flow: Array<number>}> = [];
    legendData: Array<string> = [];
    series:{alarm: Array<number> ,flow: Array<number>} = {alarm:[],flow:[]}
}

export class IAreaOtherAlarmStatistics {
    legendData: Array<string> = [];
    xData: Array<string> = [];
    series: Array<Array<number>> = [];
    dateList:Array<string> = [];
    playData:Array<Array<Array<number>>> = [];
}
export class ITypeStatistics {
    legendData: Array<string> = [];
    series: Array<number> = [];
    dateList:Array<string> = [];
    playData:Array<Array<number>> = [];
}


export class IPersonStatistics extends IStatistics { }
export class IAreaPersonAlarmStatistics extends IAreaOtherAlarmStatistics { }
export class IPersonTypeStatistics extends ITypeStatistics { }

export class IWifiStatistics extends IStatistics { }
export class IAreaWifiAlarmStatistics extends IAreaOtherAlarmStatistics { }
export class IWifiTypeStatistics extends ITypeStatistics { }

export class IElectronicfenceStatistics extends IStatistics { }
export class IAreaElectronicfenceAlarmStatistics extends IAreaOtherAlarmStatistics { }
export class IElectronicfenceTypeStatistics extends ITypeStatistics { }

export class IPersonResourceChart {
    PersonStatistics: IPersonStatistics = new IPersonStatistics();
    AreaPersonStatistics: IPersonStatistics = new IPersonStatistics();
    AreaPersonAlarmStatistics: IAreaPersonAlarmStatistics = new IAreaPersonAlarmStatistics();
    PersonTypeStatistics: IPersonTypeStatistics = new IPersonTypeStatistics();
    PersonColorStatistics: IPersonTypeStatistics = new IPersonTypeStatistics();
    PersonAllRankList:IAllRankList = new IAllRankList();
    IMapResource:IMapResource = new IMapResource();
}

export class IWifiResourceChart {
    WifiStatistics: IWifiStatistics = new IWifiStatistics();
    AreaWifiStatistics: IWifiStatistics = new IWifiStatistics();
    AreaWifiAlarmStatistics: IAreaWifiAlarmStatistics = new IAreaWifiAlarmStatistics();
    WifiTypeStatistics: IWifiTypeStatistics = new IWifiTypeStatistics();
    WifiColorStatistics: IWifiTypeStatistics = new IWifiTypeStatistics();
    WifiAllRankList:IAllRankList = new IAllRankList();
    IMapResource:IMapResource = new IMapResource();
}

export class IElectronicfenceResourceChart {
    EFStatistics: IElectronicfenceStatistics = new IElectronicfenceStatistics();
    AreaEFStatistics: IElectronicfenceStatistics = new IElectronicfenceStatistics();
    AreaEFAlarmStatistics: IAreaElectronicfenceAlarmStatistics = new IAreaElectronicfenceAlarmStatistics();
    EFTypeStatistics: IElectronicfenceTypeStatistics = new IElectronicfenceTypeStatistics();
    EFColorStatistics: IElectronicfenceTypeStatistics = new IElectronicfenceTypeStatistics();
    EFAllRankList:IAllRankList = new IAllRankList();
    IMapResource:IMapResource = new IMapResource();
}