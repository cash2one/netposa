/**
 * Created by dell on 2017/4/19.
 */
export const RouteKeyEnum = {
    // baseconfig
    BaseConfig: "baseconfig",
    Unit: "baseconfig.unit",
    Area: "baseconfig.area",
    User: "baseconfig.user",
    Role: "baseconfig.role",
    CreateRole: "baseconfig.role.newRole",
    FaceLib: "baseconfig.facelib",
    FaceLibLibrary: "baseconfig.facelib.library",
    FaceLibPerson: "baseconfig.facelib.person",


    MapResource: "baseconfig.mapresource",
    Camera: "baseconfig.camera",
    RmpGate: "baseconfig.rmpgate",
    Wifi: "baseconfig.wifi",
    ElectronicFence: "baseconfig.electronicfence",

    VideoServer: "baseconfig.videoServer",
    ProxyServer: "baseconfig.proxyServer",
    IvsServer: "baseconfig.ivsServer",
    EngineServer: "baseconfig.engineServer",

    SystemProperties: "baseconfig.systemproperties",
    RunPlan: "baseconfig.runplan",
    Lamp: "baseconfig.lamp",
    Iod: "baseconfig.iod",
    EventRule: "baseconfig.eventrule",
    Rfid: "baseconfig.rfid",
    Person: 'baseconfig.person',

    TaskConfig: 'baseconfig.task',
    TaskConfigNewFaceMonitor: 'baseconfig.task.newFaceMonitor',
    TaskConfigNewMacBlackMonitor: 'baseconfig.task.newMacBlackMonitor',
    TaskConfigNewMacWhiteMonitor: 'baseconfig.task.newMacWhiteMonitor',
    VideoStructuredTasks: 'baseconfig.videoStructuredTasks',
    videoNewFaceTask: 'baseconfig.videoStructuredTasks.videoNewFaceTask',
    newCarMonitor: "baseconfig.task.newCarMonitor",// 车辆布控操作
    newMacMonitor: "baseconfig.task.newMacMonitor",// mac布控操作


    Resource: 'resources', // 资源态势
    ResourceAll: 'resources.ResourceAll',
    ResourceCar: 'resources.ResourceCar',
    ResourcePerson: 'resources.ResourcePerson',
    ResourceWifi: 'resources.ResourceWifi',
    ResourceEle: 'resources.ResourceEle',

    resourceRetrieval: 'resourceRetrieval', //资源检索

    Total: "total",
    TotalGeneral: "total.general",
    TotalAlarm: 'total.alarm',
    TotalTask: 'total.task',
    TotalFlow: 'total.flow',
    TotalUser: 'total.user',
    TotalSearch: 'total.search',

    Log: "log",
    PassLog: "log.pass",
    PassPerson: "log.person",
    PassAlarm: "log.alarm",

    // 运维管理
    MainTain: "maintain",
    statisticalAnalysis: "maintain.statisticalAnalysis",
    statisticsOverview: "maintain.statisticsOverview",
    taskStatistics: "maintain.taskStatistics",
    alarmStatistics: "maintain.alarmStatistics",
    trafficStatistics: "maintain.trafficStatistics",
    retrievalStatistics: "maintain.retrievalStatistics",
    analysisStatistics: "maintain.analysisStatistics",

    DeviceStatus: "maintain.devicestatus",
    UserStatus: "maintain.userstatus",
    OperateLog: "maintain.operatelog",
    LicenceStatus: "maintain.licencestatus",
    Feedback: "maintain.feedback",

    // 技术栈
    TechnologyStack: "technologystack",
    TechnologyStackLayout: "technologystack.layout",
    TechnologyStackMap: "technologystack.map",
    TechnologyStackOcx: "technologystack.ocx",
    TechnologyStackTree: "technologystack.tree",
    TechnologyStackSocket: "technologystack.socket",

    TechnologyStackSelect: "technologystack.select",
    TechnologyStackTreeSelectModalDemo: "technologystack.treeSelectModalDemo",
    DynamicControl: "dynamiccontrol",


    IntelligentRetrieval: "intelligentretrieval",
    TrailAnalysis: "intelligentretrieval.trailanalysis",
    FaceRetrieval: "intelligentretrieval.faceretrieval",
    AlarmRetrieval: "intelligentretrieval.alarmretrieval",
    RetrievalRecord: "intelligentretrieval.retrievalrecord",

    ToolOption: "toolOption",
    Comparison: "toolOption.comparison",
    DownCenter: "toolOption.downCenter",
    Suggestions: "toolOption.suggestions",
    //我的收藏
    MyCollect: 'toolOption.myCollect',
    //我的审核
    MyCheck: 'toolOption.myCheck',
    //我的报警
    MyReport: 'toolOption.myReport',

    IntelligentAnalysis: 'IntelligentAnalysis',
    FaceTrack: 'IntelligentAnalysis.FaceTrack',
    FrequencyAnalysis: 'IntelligentAnalysis.FrequencyAnalysis',
    AccompanyingAnalysis: 'IntelligentAnalysis.AccompanyingAnalysis',
    FaceAnalysis: 'IntelligentAnalysis.FaceAnalysis',
    AlarmAnalysis: 'IntelligentAnalysis.AlarmAnalysis',
    FrequencyAppear: 'IntelligentAnalysis.FrequencyAppear',
    FaceCollisionAnalysis: 'IntelligentAnalysis.FaceCollisionAnalysis',

    CarAnalysis: 'IntelligentAnalysis.CarAnalysis',

    MacCrash: 'IntelligentAnalysis.MacCrash',
    FaceMacCrash: 'IntelligentAnalysis.FaceMacCrash',
    MacTrack: 'IntelligentAnalysis.MacTrack',
    MacAccompany: 'IntelligentAnalysis.MacAccompany',
    MacFrequency: 'IntelligentAnalysis.MacFrequency',
    MacCarCrash: 'IntelligentAnalysis.MacCarCrash',
    MacAlarm: 'IntelligentAnalysis.MacAlarm'


};