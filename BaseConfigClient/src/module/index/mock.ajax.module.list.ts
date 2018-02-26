import {IBackRouterConfig} from "../common/router/router";
/**
 * 用于在没有后台的情况的下模拟有权限的路由模块
 */
export const MockModuleList = [
    // {
    //     //'name': '统计分析',
    //     'code': 'total'
    // },
    {
        //'name': '资源态势',
        'code': 'resources'
    },
    {
        //'name': '系统管理',
        'code': 'config'
    },
    {
        //'name': '运维管理',
        'code': 'maintain'
    },
    {
        //'name': '基础配置',
        'code': 'baseconfig'
    },
    {
        //'name': '人像库配置',
        'code': 'baseconfig.facelib'
    },
    {
        //'name': '人像库配置-库配置',
        'code': 'baseconfig.facelib.library'
    },

    {
        // 'name': '人像库-人员信息配置',
        'code': 'baseconfig.facelib.person'
    },
    // {
    //     // 'name': '联动预案管理',
    //     'code': 'baseconfig.case'
    // },
    {
        // 'name': '行政区域',
        'code': 'baseconfig.area'
    },
    {
        // 'name': '行政单位',
        'code': 'baseconfig.unit'
    },
    {
        // 'name': '地图资源',
        'code': 'baseconfig.mapresource'
    },
    {
        // 'name': '设备配置-摄像机',
        'code': 'baseconfig.camera'
    },
    {
        // 'name': '设备配置-卡口',
        'code': 'baseconfig.rmpgate'
    },
    {
        // 'name': '设备配置-wifi',
        'code': 'baseconfig.wifi'
    },
    {
        // 'name': '设备配置-电子围栏',
        'code': 'baseconfig.electronicfence'
    },
    {
        // 'name': '接入服务器',
        'code': 'baseconfig.proxyServer'
    },
    {
        // 'name': '联网服务器',
        'code': 'baseconfig.videoServer'
    },
    {
        // 'name': '智能分析服务器',
        'code': 'baseconfig.ivsServer'
    },
    {
        // 'name': '用户管理',
        'code': 'baseconfig.person'
    },
    {
        // 'name': '角色管理',
        'code': 'baseconfig.role'
    },

    {
        // 'name': '任务配置',
        'code': 'baseconfig.task'
    },
    {
        // 'name': '系统参数',
        'code': 'baseconfig.systemproperties'
    },
    {
        // 'name': '运行计划',
        'code': 'baseconfig.runplan'
    },
    {
        // 'name': '灯杆',
        'code': 'baseconfig.lamp'
    },
    {
        // 'name': 'iod',
        'code': 'baseconfig.iod'
    },
    {
        // 'name': 'Rfid',
        'code': 'baseconfig.rfid'
    },
    {
        // 'name': 'Rfid',
        'code': 'baseconfig.videoStructuredTasks'
    },
    {
        // 'name': '报警统计',
        'code': 'total.alarm'
    },
    {
        // 'name': '统计总览',
        'code': 'total.general'
    },
    {
        // 'name': '流量统计',
        'code': 'total.flow'
    },
    {
        // 'name': '任务统计',
        'code': 'total.task'
    },
    {
        // 'name': '用户统计',
        'code': 'total.user'
    },
    {
        // 'name': '区域检索',
        'code': 'total.search'
    },

    {
        'name': '运维管理',
        'code': 'maintain'
    },
    {
        'name': '统计分析',
        'code': 'maintain.statisticalAnalysis'
    },
    {
        // 'name': '统计总览',
        'code': 'maintain.statisticsOverview'
    },
    {
        // 'name': '任务统计',
        'code': 'maintain.taskStatistics'
    },
    {
        // 'name': '报警统计',
        'code': 'maintain.alarmStatistics'
    },
    {
        // 'name': '流量统计',
        'code': 'maintain.trafficStatistics'
    },
    {
        // 'name': '检索统计',
        'code': 'maintain.retrievalStatistics'
    },
    {
        // 'name': '分析统计',
        'code': 'maintain.analysisStatistics'
    },
    // {
    //     // 'name': '设备状态',
    //     'code': 'maintain.equipmentStatus'
    // },
    {
        // 'name': '设备状态',
        'code': 'maintain.devicestatus'
    },
    {
        // 'name': '用户状态',
        'code': 'maintain.userstatus'
    },
    {
        // 'name': '日志管理',
        'code': 'maintain.operatelog'
    },
    {
        'name': '用户状态',
        'code': 'maintain.userStatus'
    },
    {
        'name': '日志管理',
        'code': 'maintain.logManagement'
    },

    {
        // 'name': '新增布控配置',
        'code': 'baseconfig.task.newFaceMonitor'
    },
    {
        // 'name': '新增布控配置',
        'code': 'baseconfig.task.newMacBlackMonitor'
    },
    {
        // 'name': '新增布控配置',
        'code': 'baseconfig.task.newMacWhiteMonitor'
    },
    {
        'code': 'baseconfig.videoStructuredTasks.newFaceMonitor'
    },
    {
        'code': 'technologystack'
    },
    {
        'code': 'technologystack.layout'
    },
    {
        'code': 'technologystack.map'
    },
    {
        'code': 'technologystack.ocx'
    },
    {
        'code': 'technologystack.tree'
    },
    {
        'code': 'technologystack.socket'
    },
    {
        'code': 'technologystack.select'
    },
    {
        'code': 'technologystack.treeSelectModalDemo'
    },

    {
        //  'name': '动态布控',
        'name': '视图立方',
        'code': 'dynamiccontrol'
    },
    {
        'name': '资源检索',
        'code': 'resourceRetrieval'
    },
    // {
    //     // 'name': '智能检索',
    //     'code': 'intelligentretrieval'
    // },

    // {
    //     // 'name': '轨迹分析',
    //     'code': 'intelligentretrieval.trailanalysis'
    // },
    //
    // {
    //     // 'name': '人脸检索',
    //     'code': 'intelligentretrieval.faceretrieval'
    // },
    //
    // {
    //     // 'name': '报警检索',
    //     'code': 'intelligentretrieval.alarmretrieval'
    // },
    //
    // {
    //      'name': '检索记录',
    //     'code': 'intelligentretrieval.retrievalrecord'
    // },

    //智能分析
    {'code':'IntelligentAnalysis','name':'智能分析'},
    {'code':'IntelligentAnalysis.FaceTrack','name':'人脸轨迹'},
    {'code':'IntelligentAnalysis.FrequencyAnalysis','name':'频次分析'},
    {'code':'IntelligentAnalysis.AccompanyingAnalysis','name':'伴随分析'},
    {'code':'IntelligentAnalysis.FaceAnalysis','name':'人脸分析'},
    {'code':'IntelligentAnalysis.AlarmAnalysis','name':'报警分析'},
    {'code':'IntelligentAnalysis.FrequencyAppear','name':'频繁出没'},
    {'code':'IntelligentAnalysis.FaceCollisionAnalysis','name':'碰撞分析'},

    {'code':'IntelligentAnalysis.CarAnalysis','name':'套牌分析'},

    {'code':'IntelligentAnalysis.MacCrash','name':'Mac碰撞'},
    {'code':'IntelligentAnalysis.FaceMacCrash','name':'人脸MAC碰撞'},
    {'code':'IntelligentAnalysis.MacTrack','name':'Mac轨迹'},
    {'code':'IntelligentAnalysis.MacAccompany','name':'MAC伴随'},
    {'code':'IntelligentAnalysis.MacFrequency','name':'MAC频次'},
    {'code':'IntelligentAnalysis.MacCarCrash','name':'车辆MAC碰撞'},
    {'code':'IntelligentAnalysis.MacAlarm','name':'MAC报警'},
    {
        // 'name': '选项',
        'code': 'toolOption'
    },
    {
        // 'name': '比对',
        'code': 'toolOption.comparison'
    },

    {
        // 'name': '下载中心',
        'code': 'toolOption.downCenter'
    },

    {
        // 'name': '意见反馈',
        'code': 'toolOption.suggestions'
    },

    {
        // 'name': '我的收藏',
        'code': 'myCollect'
    },
    
    {
        // 'name': '我的审核',
        'code': 'myCheck'
    },
    
    {
        // 'name': '我的报警',
        'code': 'myReport'
    }

] as Array<IBackRouterConfig>;