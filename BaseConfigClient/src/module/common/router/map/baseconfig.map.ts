import { IRouterConfig } from '../router';
import {RouteKeyEnum} from "../enum/RouteKeyEnum";
import {GroupEnum} from "../enum/RouteGroupEnum";
import Config from "../../../../config";
/**
 * Created by dell on 2017/4/19.
 */

const BaseConfig:IRouterConfig = {
    key: RouteKeyEnum.BaseConfig,
    url: '/baseconfig',
    moduleName:'配置管理',
    controllerName: 'baseConfigMainController',
    controllerUrl: 'module/baseconfig/main/main.controller',
    controllerAs: 'baseconfigCtrl',
    templateUrl: '/module/baseconfig/main/main.html',
    redirectTo: RouteKeyEnum.Area
};

const Area:IRouterConfig = {
    key: RouteKeyEnum.Area,
    url: '/area',
    moduleName: 'DP_CONFIG_AREA_01',
    controllerName: 'baseConfigAreaController',
    controllerUrl: 'module/baseconfig/area/area.controller',
    views: {
        'baseconfig': {
            templateUrl: '/module/baseconfig/area/area.html',
            controllerName: 'baseConfigAreaController',
            controllerAs: 'areaCtrl'
        }
    },
    group: GroupEnum.BaseConfig,
    parent: RouteKeyEnum.BaseConfig,
    icon: 'area'
};




let Unit:IRouterConfig = {
    key: RouteKeyEnum.Unit,
    url: '/unit',
    moduleName: 'DP_CONFIG_UNIT_01',
    controllerName: 'baseConfigUnitController',
    controllerUrl: 'module/baseconfig/unit/unit.controller',
    views: {
        'baseconfig': {
            templateUrl: '/module/baseconfig/unit/unit.html',
            controllerName: 'baseConfigUnitController',
            controllerAs: 'unitCtrl'
        }
    },
    group: GroupEnum.BaseConfig,
    parent: RouteKeyEnum.BaseConfig,
    icon: 'unit'
};

const Person:IRouterConfig = {
    key: 'baseconfig.person',
    url: '/person',
    moduleName: 'DP_CONFIG_PERSON_01',
    controllerName: 'baseConfigPersonController',
    controllerUrl: 'module/baseconfig/person/person.controller',
    views: {
        'baseconfig': {
            templateUrl: '/module/baseconfig/person/person.html',
            controllerName: 'baseConfigPersonController',
            controllerAs: 'bcPersonCtrl'
        }
    },
    parent: 'baseconfig',
    group: GroupEnum.BaseConfig,
    icon: 'person'
};

const Role:IRouterConfig = {
    key: RouteKeyEnum.Role,
    url: '/role',
    moduleName: 'DP_CONFIG_ROLE_06',
    controllerName: 'baseConfigRoleController',
    controllerUrl: 'module/baseconfig/role/role.controller',
    views: {
        'baseconfig': {
            templateUrl: '/module/baseconfig/role/role.html',
            controllerName: 'baseConfigRoleController',
            controllerAs: 'bcRoleCtrl'
        }
    },
    group: GroupEnum.BaseConfig,
    parent: RouteKeyEnum.BaseConfig,
    icon: 'role'
};

const CreateRole:IRouterConfig = {
    key: RouteKeyEnum.CreateRole,
    url: '/newRole?roleId',
    moduleName: '新建角色',
    controllerName: 'newRoleController',
    controllerUrl: 'module/baseconfig/role/newRole/newRole.controller',
    views: {
        'roleconfig': {
            templateUrl: '/module/baseconfig/role/newRole/newRole.html',
            controllerName: 'newRoleController',
            controllerAs: 'newRoleCtrl'
        }
    },
    group: GroupEnum.BaseConfig,
    parent: RouteKeyEnum.Role,
    icon: 'role',
    isLocal:true
};

const Camera:IRouterConfig = {
    key: RouteKeyEnum.Camera,
    url: '/camera',
    moduleName: 'DP_CONFIG_CAMERA_01',
    controllerUrl: 'module/baseconfig/camera/camera.controller',
    controllerName: 'baseConfigCameraController',
    views: {
        'baseconfig': {
            templateUrl: '/module/baseconfig/camera/camera.html',
            controllerName: 'baseConfigCameraController',
            controllerAs: 'bcCameraCtrl'
        }
    },
    parent: RouteKeyEnum.BaseConfig,
    group: GroupEnum.DeviceConfig,
    icon: 'cameraIcon'
};
const RmpGate:IRouterConfig = {
    key: RouteKeyEnum.RmpGate,
    url: '/rmpgate',
    moduleName: 'DP_CONFIG_RMPGATE_03',
    controllerUrl: 'module/baseconfig/rmpgate/rmpgate.controller',
    controllerName: 'baseConfigRmpGateController',
    views: {
        'baseconfig': {
            templateUrl: '/module/baseconfig/rmpgate/rmpgate.html',
            controllerName: 'baseConfigRmpGateController',
            controllerAs: 'bcRmpGateCtrl'
        }
    },
    parent: RouteKeyEnum.BaseConfig,
    group: GroupEnum.DeviceConfig,
    icon: 'rmpgate'
};

const Wifi:IRouterConfig = {
    key: RouteKeyEnum.Wifi,
    url: '/wifi',
    moduleName: 'DP_CONFIG_WIFI_03',
    controllerUrl: 'module/baseconfig/wifi/wifi.controller',
    controllerName: 'baseConfigWifiController',
    views: {
        'baseconfig': {
            templateUrl: '/module/baseconfig/wifi/wifi.html',
            controllerName: 'baseConfigWifiController',
            controllerAs: 'bcWifiCtrl'
        }
    },
    parent: RouteKeyEnum.BaseConfig,
    group: GroupEnum.DeviceConfig,
    icon: 'wifi'
};

const ElectronicFence:IRouterConfig = {
    key: RouteKeyEnum.ElectronicFence,
    url: '/electronicfence',
    moduleName: 'DP_CONFIG_ELECTRONICFENCE_01',
    controllerUrl: 'module/baseconfig/electronicfence/ele.controller',
    controllerName: 'baseConfigElectronicFenceController',
    views: {
        'baseconfig': {
            templateUrl: '/module/baseconfig/electronicfence/ele.html',
            controllerName: 'baseConfigElectronicFenceController',
            controllerAs: 'bcElectronicFenceCtrl'
        }
    },
    parent: RouteKeyEnum.BaseConfig,
    group: GroupEnum.DeviceConfig,
    icon: 'ele'
};


/**
 * Lamp router config
 */
const Lamp:IRouterConfig = {
    key: RouteKeyEnum.Lamp,
    url: '/lamp',
    moduleName: 'DP_CONFIG_LAMP_00',
    controllerName: 'baseConfigLampController',
    controllerUrl: 'module/baseconfig/lamp/lamp.controller',
    views: {
        'baseconfig': {
            templateUrl: '/module/baseconfig/lamp/lamp.html',
            controllerName: 'baseConfigLampController',
            controllerAs: 'lampCtrl'
        }
    },
    group: GroupEnum.DeviceConfig,
    parent: RouteKeyEnum.BaseConfig,
    icon: 'lampIcon'
};

const VideoServer:IRouterConfig = {
    key: RouteKeyEnum.VideoServer,
    url: '/videoServer',
    moduleName: 'DP_CONFIG_VIDEOSERVER_00',
    controllerName: 'baseConfigVideoServerController',
    controllerUrl: 'module/baseconfig/videoServer/videoServer.controller',
    views: {
        'baseconfig': {
            templateUrl: '/module/baseconfig/videoServer/videoServer.html',
            controllerName: 'baseConfigVideoServerController',
            controllerAs: 'bcVideoServerCtrl'
        }
    },
    parent: RouteKeyEnum.BaseConfig,
    group: GroupEnum.ServiceConfig,
    icon: 'videoserver'
};


const FaceLib:IRouterConfig = {
    key: RouteKeyEnum.FaceLib,
    url: '/faceLib',
    moduleName: 'DP_CONFIG_FACELIB_00',
    controllerUrl: 'module/baseconfig/facelib/facelib.controller',
    controllerName: 'baseConfigFaceLibController',
    views: {
        'baseconfig': {
            templateUrl: '/module/baseconfig/facelib/facelib.html',
            controllerName: 'baseConfigFaceLibController',
            controllerAs: 'faceLibCtrl'
        }
    },
    group: GroupEnum.ResourceConfig,
    parent: RouteKeyEnum.BaseConfig,
    icon: 'facelib',
    redirectTo: RouteKeyEnum.FaceLib // 这里跳自身是为了每次进入路由都执行FaceLib对应的controller
};

const FaceLibLib:IRouterConfig = {
    key: RouteKeyEnum.FaceLibLibrary,
    url: '/library',
    moduleName: '人像库-库管理',
    controllerUrl: 'module/baseconfig/facelib/library/facelib.library.controller',
    controllerName: 'bcFaceLibLibController',
    views: {
        'faceLibChildView': {
            templateUrl: '/module/baseconfig/facelib/library/facelib.library.html',
            controllerName: 'bcFaceLibLibController',
            controllerAs: 'bcFaceLibLibCtrl'
        }
    },
    parent: RouteKeyEnum.FaceLib,
    isLocal:true
};

const FaceLibPerson:IRouterConfig = {
    key: RouteKeyEnum.FaceLibPerson,
    url: '/faceLibPerson',
    moduleName: '人像库-人员管理',
    controllerUrl: 'module/baseconfig/facelib/person/facelib.person.controller',
    controllerName: 'bcFaceLibPersonController',
    views: {
        'faceLibChildView': {
            templateUrl: '/module/baseconfig/facelib/person/facelib.person.html',
            controllerName: 'bcFaceLibPersonController',
            controllerAs: 'bcFaceLibPersonCtrl'
        }
    },
    parent: RouteKeyEnum.FaceLib,
    isLocal:true
};

const MapResource:IRouterConfig = {
    key: RouteKeyEnum.MapResource,
    url: '/mapresource',
    moduleName: 'DP_CONFIG_MAPRESOURCE_00',
    controllerUrl: 'module/baseconfig/map-resource/map.resource.controller',
    controllerName: 'baseConfigMapResourceController',
    views: {
        'baseconfig': {
            templateUrl: '/module/baseconfig/map-resource/map.resource.html',
            controllerName: 'baseConfigMapResourceController',
            controllerAs: 'mapResourceCtrl'
        }
    },
    parent: RouteKeyEnum.BaseConfig,
    group: GroupEnum.ResourceConfig,
    icon: 'mapresource'
};






const ProxyServer:IRouterConfig = {
    key: RouteKeyEnum.ProxyServer,
    url: '/proxyServer',
    moduleName: 'DP_CONFIG_PROXYSERVER_00',
    controllerName: 'baseConfigProxyServerController',
    controllerUrl: 'module/baseconfig/proxyServer/proxyServer.controller',
    views: {
        'baseconfig': {
            templateUrl: '/module/baseconfig/proxyServer/proxyServer.html',
            controllerName: 'baseConfigProxyServerController',
            controllerAs: 'bcProxyServerCtrl'
        }
    },
    parent: RouteKeyEnum.BaseConfig,
    group: GroupEnum.ServiceConfig,
    icon: 'proxyserver'
};

const IvsServer:IRouterConfig = {
    key: RouteKeyEnum.IvsServer,
    url: '/ivsServer',
    moduleName: 'DP_CONFIG_IVSSERVER_01',
    controllerName: 'baseConfigIvsServerController',
    controllerUrl: 'module/baseconfig/ivsServer/ivsServer.controller',
    views: {
        'baseconfig': {
            templateUrl: '/module/baseconfig/ivsServer/ivsServer.html',
            controllerName: 'baseConfigIvsServerController',
            controllerAs: 'bcIvsServerCtrl'
        }
    },
    parent: RouteKeyEnum.BaseConfig,
    group: GroupEnum.ServiceConfig,
    icon: 'ivsserver'
};

const EngineServer:IRouterConfig = {
    isLocal:true,
    key: RouteKeyEnum.EngineServer,
    url: '/engineServer',
    moduleName: 'DP_CONFIG_ENGINESERVER_01',
    controllerName: 'baseConfigEngineServerController',
    controllerUrl: 'module/baseconfig/engineServer/engineServer.controller',
    views: {
        'baseconfig': {
            templateUrl: '/module/baseconfig/engineServer/engineServer.html',
            controllerName: 'baseConfigEngineServerController',
            controllerAs: 'bcEngineServerCtrl'
        }
    },
    parent: RouteKeyEnum.BaseConfig,
    group: GroupEnum.ServiceConfig,
    icon: 'engineserver'
};

const SystemProperties:IRouterConfig = {
    key: RouteKeyEnum.SystemProperties,
    url: '/systemproperties',
    moduleName: 'DP_CONFIG_SYSTEMPROPERTIES_01',
    controllerUrl: 'module/baseconfig/system-properties/system,properties.controller',
    controllerName: 'systemPropertiesController',
    views: {
        'baseconfig': {
            templateUrl: '/module/baseconfig/system-properties/system.properties.html',
            controllerName: 'systemPropertiesController',
            controllerAs: 'systemPropertiesCtrl'
        }
    },
    parent: RouteKeyEnum.BaseConfig,
    group: GroupEnum.SystemConfig,
    icon: 'systemproperties'
};


const RunPlan:IRouterConfig = {
    key: RouteKeyEnum.RunPlan,
    url: '/runplan',
    moduleName: '时间模板',
    controllerUrl: 'module/baseconfig/runPlan/runPlan.controller',
    controllerName: 'runPlanController',
    views: {
        'baseconfig': {
            templateUrl: '/module/baseconfig/runPlan/runPlan.html',
            controllerName: 'runPlanController',
            controllerAs: 'runPlanCtrl'
        }
    },
    parent: RouteKeyEnum.BaseConfig,
    group: GroupEnum.BusinessConfig,
    icon: 'runplan'
};

const TaskConfig:IRouterConfig = {
    key: RouteKeyEnum.TaskConfig,
    url: '/taskconfig',
    moduleName: 'DP_CONFIG_TASKCONFUG_02',
    controllerUrl: 'module/baseconfig/taskconfig/main/taskconfig.controller',
    controllerName: 'taskConfigController',
    views: {
        'baseconfig': {
            templateUrl: '/module/baseconfig/taskconfig/main/taskconfig.html',
            controllerName: 'taskConfigController',
            controllerAs: 'taskConfigCtrl'
        }
    },
    parent: RouteKeyEnum.BaseConfig,
    group: GroupEnum.BusinessConfig,
    icon: 'task'
};

const EventRule:IRouterConfig = {
    key: RouteKeyEnum.EventRule,
    url: '/eventrule',
    moduleName: '联动预案',
    controllerName: 'baseConfigCaseController',
    controllerUrl: 'module/baseconfig/eventRule/eventRule.controller',
    views: {
        'baseconfig': {
            templateUrl: '/module/baseconfig/eventRule/eventRule.html',
            controllerName: 'baseConfigEventRuleController',
            controllerAs: 'eventRuleCtrl'
        }
    },
    group: GroupEnum.BusinessConfig,
    parent: RouteKeyEnum.BaseConfig,
    icon: 'task'
}


/**
 * Iod router config
 */
const IodConfig:IRouterConfig = {
    key: RouteKeyEnum.Iod,
    url: '/iodconfig',
    moduleName: 'DP_CONFIG_IODSERVER_01',
    controllerUrl: 'module/baseconfig/iod/iod.controller',
    controllerName: 'iodController',
    views: {
        'baseconfig': {
            templateUrl: '/module/baseconfig/iod/iod.html',
            controllerName: 'iodController',
            controllerAs: 'iodCtrl'
        }
    },
    group: GroupEnum.ServiceConfig,
    parent: RouteKeyEnum.BaseConfig,
    icon: 'videoserver'
};

/**
 * rfid router config
 */

const TaskConfigNewFaceMonitor:IRouterConfig = {
    key: RouteKeyEnum.TaskConfigNewFaceMonitor,
    url: '/taskNewFaceTask?taskId?areaId',
    moduleName: 'DP_CONFIG_TASKCONFUG_37',
    controllerUrl: 'module/baseconfig/taskconfig/newFaceMonitor/newFaceMonitor.controller',
    controllerName: 'taskNewTaskController',
    views: {
        'taskconfig': {
            templateUrl: '/module/baseconfig/taskconfig/newFaceMonitor/newFaceMonitor.html',
            controllerName: 'newFaceMonitorController',
            controllerAs: 'newFaceMonitorCtrl'
        }
    },
    parent: RouteKeyEnum.TaskConfig,
    isLocal:true
};

const VideoStructuredTasksConfig:IRouterConfig = {
    key: RouteKeyEnum.VideoStructuredTasks,
    url: '/videoStructuredTasks',
    moduleName: '视频结构化任务',
    controllerUrl: 'module/baseconfig/videoStructuredTasks/videoStructuredTasks.controller',
    controllerName: 'VideoStructuredTasksController',
    views: {
        'baseconfig': {
            templateUrl: '/module/baseconfig/videoStructuredTasks/videoStructuredTasks.html',
            controllerName: 'VideoStructuredTasksController',
            controllerAs: 'VideoStructuredTasksCtrl'
        }
    },
    parent: RouteKeyEnum.BaseConfig,
    group: GroupEnum.BusinessConfig,
    icon: 'task'
};

const VideoStructuredTasksNewFaceMonitor:IRouterConfig = {
    key: RouteKeyEnum.videoNewFaceTask,
    url: '/videoNewFaceTask?taskId?areaId?type',
    moduleName: 'FDS_01_12_25',
    controllerUrl: 'module/baseconfig/videoStructuredTasks/newFaceTask/newVideoStruct.controller',
    controllerName: 'videoNewTaskController',
    views: {
        'videoStructuredTasks': {
            templateUrl: '/module/baseconfig/videoStructuredTasks/newFaceTask/newVideoStruct.html',
            controllerName: 'viewNewTaskController',
            controllerAs: 'videoNewTaskCtrl'
        }
    },
    parent: RouteKeyEnum.VideoStructuredTasks,
    isLocal:true
};


// 新建车辆布控
const newCarMonitor:IRouterConfig = {
    key: RouteKeyEnum.newCarMonitor,
    url: '/carMonitor?taskId',
    moduleName: '车辆布控操作',
    controllerName: 'newCarMonitor',
    controllerUrl: 'module/baseconfig/taskconfig/newCarMonitor/newCarMonitor.controller',
    views: {
        'taskconfig': {
            templateUrl: '/module/baseconfig/taskconfig/newCarMonitor/newCarMonitor.html',
            controllerName: 'newCarMonitor',
            controllerAs: 'newCarMonitorCtrl'
        }
    },
    parent: RouteKeyEnum.TaskConfig,
    isLocal:true
};

// 新建mac布控
const newMacMonitor:IRouterConfig = {
    key: RouteKeyEnum.newMacMonitor,
    url: '/macMonitor?taskId',
    moduleName: 'mac布控操作',
    controllerName: 'newMacMonitor',
    controllerUrl: 'module/baseconfig/taskconfig/newMacMonitor/newMacMonitor.controller',
    views: {
        'taskconfig': {
            templateUrl: '/module/baseconfig/taskconfig/newMacMonitor/newMacMonitor.html',
            controllerName: 'newMacMonitor',
            controllerAs: 'newMacMonitorCtrl'
        }
    },
    parent: RouteKeyEnum.TaskConfig,
    isLocal:true
};


export const BaseConfigMap = [
    BaseConfig, Area,Unit, Person, Role,CreateRole,
    ProxyServer,VideoServer,IodConfig,IvsServer,EngineServer,
    Camera,RmpGate, Wifi,ElectronicFence,Lamp,
    FaceLib,FaceLibLib,FaceLibPerson, MapResource,
    RunPlan,EventRule,TaskConfig,TaskConfigNewFaceMonitor,VideoStructuredTasksConfig,
    VideoStructuredTasksNewFaceMonitor,SystemProperties,newCarMonitor,newMacMonitor
] as Array<IRouterConfig>;