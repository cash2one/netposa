define(["require", "exports", "../enum/RouteKeyEnum", "../enum/RouteGroupEnum"], function (require, exports, RouteKeyEnum_1, RouteGroupEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseConfig = {
        key: RouteKeyEnum_1.RouteKeyEnum.BaseConfig,
        url: '/baseconfig',
        moduleName: '配置管理',
        controllerName: 'baseConfigMainController',
        controllerUrl: 'module/baseconfig/main/main.controller',
        controllerAs: 'baseconfigCtrl',
        templateUrl: '/module/baseconfig/main/main.html',
        redirectTo: RouteKeyEnum_1.RouteKeyEnum.Area
    };
    var Area = {
        key: RouteKeyEnum_1.RouteKeyEnum.Area,
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
        group: RouteGroupEnum_1.GroupEnum.BaseConfig,
        parent: RouteKeyEnum_1.RouteKeyEnum.BaseConfig,
        icon: 'area'
    };
    var Unit = {
        key: RouteKeyEnum_1.RouteKeyEnum.Unit,
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
        group: RouteGroupEnum_1.GroupEnum.BaseConfig,
        parent: RouteKeyEnum_1.RouteKeyEnum.BaseConfig,
        icon: 'unit'
    };
    var Person = {
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
        group: RouteGroupEnum_1.GroupEnum.BaseConfig,
        icon: 'person'
    };
    var Role = {
        key: RouteKeyEnum_1.RouteKeyEnum.Role,
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
        group: RouteGroupEnum_1.GroupEnum.BaseConfig,
        parent: RouteKeyEnum_1.RouteKeyEnum.BaseConfig,
        icon: 'role'
    };
    var CreateRole = {
        key: RouteKeyEnum_1.RouteKeyEnum.CreateRole,
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
        group: RouteGroupEnum_1.GroupEnum.BaseConfig,
        parent: RouteKeyEnum_1.RouteKeyEnum.Role,
        icon: 'role',
        isLocal: true
    };
    var Camera = {
        key: RouteKeyEnum_1.RouteKeyEnum.Camera,
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
        parent: RouteKeyEnum_1.RouteKeyEnum.BaseConfig,
        group: RouteGroupEnum_1.GroupEnum.DeviceConfig,
        icon: 'cameraIcon'
    };
    var RmpGate = {
        key: RouteKeyEnum_1.RouteKeyEnum.RmpGate,
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
        parent: RouteKeyEnum_1.RouteKeyEnum.BaseConfig,
        group: RouteGroupEnum_1.GroupEnum.DeviceConfig,
        icon: 'rmpgate'
    };
    var Wifi = {
        key: RouteKeyEnum_1.RouteKeyEnum.Wifi,
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
        parent: RouteKeyEnum_1.RouteKeyEnum.BaseConfig,
        group: RouteGroupEnum_1.GroupEnum.DeviceConfig,
        icon: 'wifi'
    };
    var ElectronicFence = {
        key: RouteKeyEnum_1.RouteKeyEnum.ElectronicFence,
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
        parent: RouteKeyEnum_1.RouteKeyEnum.BaseConfig,
        group: RouteGroupEnum_1.GroupEnum.DeviceConfig,
        icon: 'ele'
    };
    var Lamp = {
        key: RouteKeyEnum_1.RouteKeyEnum.Lamp,
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
        group: RouteGroupEnum_1.GroupEnum.DeviceConfig,
        parent: RouteKeyEnum_1.RouteKeyEnum.BaseConfig,
        icon: 'lampIcon'
    };
    var VideoServer = {
        key: RouteKeyEnum_1.RouteKeyEnum.VideoServer,
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
        parent: RouteKeyEnum_1.RouteKeyEnum.BaseConfig,
        group: RouteGroupEnum_1.GroupEnum.ServiceConfig,
        icon: 'videoserver'
    };
    var FaceLib = {
        key: RouteKeyEnum_1.RouteKeyEnum.FaceLib,
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
        group: RouteGroupEnum_1.GroupEnum.ResourceConfig,
        parent: RouteKeyEnum_1.RouteKeyEnum.BaseConfig,
        icon: 'facelib',
        redirectTo: RouteKeyEnum_1.RouteKeyEnum.FaceLib
    };
    var FaceLibLib = {
        key: RouteKeyEnum_1.RouteKeyEnum.FaceLibLibrary,
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
        parent: RouteKeyEnum_1.RouteKeyEnum.FaceLib,
        isLocal: true
    };
    var FaceLibPerson = {
        key: RouteKeyEnum_1.RouteKeyEnum.FaceLibPerson,
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
        parent: RouteKeyEnum_1.RouteKeyEnum.FaceLib,
        isLocal: true
    };
    var MapResource = {
        key: RouteKeyEnum_1.RouteKeyEnum.MapResource,
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
        parent: RouteKeyEnum_1.RouteKeyEnum.BaseConfig,
        group: RouteGroupEnum_1.GroupEnum.ResourceConfig,
        icon: 'mapresource'
    };
    var ProxyServer = {
        key: RouteKeyEnum_1.RouteKeyEnum.ProxyServer,
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
        parent: RouteKeyEnum_1.RouteKeyEnum.BaseConfig,
        group: RouteGroupEnum_1.GroupEnum.ServiceConfig,
        icon: 'proxyserver'
    };
    var IvsServer = {
        key: RouteKeyEnum_1.RouteKeyEnum.IvsServer,
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
        parent: RouteKeyEnum_1.RouteKeyEnum.BaseConfig,
        group: RouteGroupEnum_1.GroupEnum.ServiceConfig,
        icon: 'ivsserver'
    };
    var EngineServer = {
        isLocal: true,
        key: RouteKeyEnum_1.RouteKeyEnum.EngineServer,
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
        parent: RouteKeyEnum_1.RouteKeyEnum.BaseConfig,
        group: RouteGroupEnum_1.GroupEnum.ServiceConfig,
        icon: 'engineserver'
    };
    var SystemProperties = {
        key: RouteKeyEnum_1.RouteKeyEnum.SystemProperties,
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
        parent: RouteKeyEnum_1.RouteKeyEnum.BaseConfig,
        group: RouteGroupEnum_1.GroupEnum.SystemConfig,
        icon: 'systemproperties'
    };
    var RunPlan = {
        key: RouteKeyEnum_1.RouteKeyEnum.RunPlan,
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
        parent: RouteKeyEnum_1.RouteKeyEnum.BaseConfig,
        group: RouteGroupEnum_1.GroupEnum.BusinessConfig,
        icon: 'runplan'
    };
    var TaskConfig = {
        key: RouteKeyEnum_1.RouteKeyEnum.TaskConfig,
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
        parent: RouteKeyEnum_1.RouteKeyEnum.BaseConfig,
        group: RouteGroupEnum_1.GroupEnum.BusinessConfig,
        icon: 'task'
    };
    var EventRule = {
        key: RouteKeyEnum_1.RouteKeyEnum.EventRule,
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
        group: RouteGroupEnum_1.GroupEnum.BusinessConfig,
        parent: RouteKeyEnum_1.RouteKeyEnum.BaseConfig,
        icon: 'task'
    };
    var IodConfig = {
        key: RouteKeyEnum_1.RouteKeyEnum.Iod,
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
        group: RouteGroupEnum_1.GroupEnum.ServiceConfig,
        parent: RouteKeyEnum_1.RouteKeyEnum.BaseConfig,
        icon: 'videoserver'
    };
    var TaskConfigNewFaceMonitor = {
        key: RouteKeyEnum_1.RouteKeyEnum.TaskConfigNewFaceMonitor,
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
        parent: RouteKeyEnum_1.RouteKeyEnum.TaskConfig,
        isLocal: true
    };
    var VideoStructuredTasksConfig = {
        key: RouteKeyEnum_1.RouteKeyEnum.VideoStructuredTasks,
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
        parent: RouteKeyEnum_1.RouteKeyEnum.BaseConfig,
        group: RouteGroupEnum_1.GroupEnum.BusinessConfig,
        icon: 'task'
    };
    var VideoStructuredTasksNewFaceMonitor = {
        key: RouteKeyEnum_1.RouteKeyEnum.videoNewFaceTask,
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
        parent: RouteKeyEnum_1.RouteKeyEnum.VideoStructuredTasks,
        isLocal: true
    };
    var newCarMonitor = {
        key: RouteKeyEnum_1.RouteKeyEnum.newCarMonitor,
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
        parent: RouteKeyEnum_1.RouteKeyEnum.TaskConfig,
        isLocal: true
    };
    var newMacMonitor = {
        key: RouteKeyEnum_1.RouteKeyEnum.newMacMonitor,
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
        parent: RouteKeyEnum_1.RouteKeyEnum.TaskConfig,
        isLocal: true
    };
    exports.BaseConfigMap = [
        BaseConfig, Area, Unit, Person, Role, CreateRole,
        ProxyServer, VideoServer, IodConfig, IvsServer, EngineServer,
        Camera, RmpGate, Wifi, ElectronicFence, Lamp,
        FaceLib, FaceLibLib, FaceLibPerson, MapResource,
        RunPlan, EventRule, TaskConfig, TaskConfigNewFaceMonitor, VideoStructuredTasksConfig,
        VideoStructuredTasksNewFaceMonitor, SystemProperties, newCarMonitor, newMacMonitor
    ];
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3JvdXRlci9tYXAvYmFzZWNvbmZpZy5tYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBUUEsSUFBTSxVQUFVLEdBQWlCO1FBQzdCLEdBQUcsRUFBRSwyQkFBWSxDQUFDLFVBQVU7UUFDNUIsR0FBRyxFQUFFLGFBQWE7UUFDbEIsVUFBVSxFQUFDLE1BQU07UUFDakIsY0FBYyxFQUFFLDBCQUEwQjtRQUMxQyxhQUFhLEVBQUUsd0NBQXdDO1FBQ3ZELFlBQVksRUFBRSxnQkFBZ0I7UUFDOUIsV0FBVyxFQUFFLG1DQUFtQztRQUNoRCxVQUFVLEVBQUUsMkJBQVksQ0FBQyxJQUFJO0tBQ2hDLENBQUM7SUFFRixJQUFNLElBQUksR0FBaUI7UUFDdkIsR0FBRyxFQUFFLDJCQUFZLENBQUMsSUFBSTtRQUN0QixHQUFHLEVBQUUsT0FBTztRQUNaLFVBQVUsRUFBRSxtQkFBbUI7UUFDL0IsY0FBYyxFQUFFLDBCQUEwQjtRQUMxQyxhQUFhLEVBQUUsd0NBQXdDO1FBQ3ZELEtBQUssRUFBRTtZQUNILFlBQVksRUFBRTtnQkFDVixXQUFXLEVBQUUsbUNBQW1DO2dCQUNoRCxjQUFjLEVBQUUsMEJBQTBCO2dCQUMxQyxZQUFZLEVBQUUsVUFBVTthQUMzQjtTQUNKO1FBQ0QsS0FBSyxFQUFFLDBCQUFTLENBQUMsVUFBVTtRQUMzQixNQUFNLEVBQUUsMkJBQVksQ0FBQyxVQUFVO1FBQy9CLElBQUksRUFBRSxNQUFNO0tBQ2YsQ0FBQztJQUtGLElBQUksSUFBSSxHQUFpQjtRQUNyQixHQUFHLEVBQUUsMkJBQVksQ0FBQyxJQUFJO1FBQ3RCLEdBQUcsRUFBRSxPQUFPO1FBQ1osVUFBVSxFQUFFLG1CQUFtQjtRQUMvQixjQUFjLEVBQUUsMEJBQTBCO1FBQzFDLGFBQWEsRUFBRSx3Q0FBd0M7UUFDdkQsS0FBSyxFQUFFO1lBQ0gsWUFBWSxFQUFFO2dCQUNWLFdBQVcsRUFBRSxtQ0FBbUM7Z0JBQ2hELGNBQWMsRUFBRSwwQkFBMEI7Z0JB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RSxtQkFBbUI7YUFDcEM7U0FDSjtRQUNELE1BQU0sRUFBRSwyQkFBWSxDQUFDLFVBQVU7UUFDL0IsT0FBTyxFQUFDLElBQUk7S0FDZixDQUFDO0lBR1csUUFBQSxhQUFhLEdBQUc7UUFDekIsVUFBVSxFQUFFLElBQUksRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBQyxVQUFVO1FBQzlDLFdBQVcsRUFBQyxXQUFXLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxZQUFZO1FBQ3hELE1BQU0sRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLGVBQWUsRUFBQyxJQUFJO1FBQ3pDLE9BQU8sRUFBQyxVQUFVLEVBQUMsYUFBYSxFQUFFLFdBQVc7UUFDN0MsT0FBTyxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsd0JBQXdCLEVBQUMsMEJBQTBCO1FBQ2hGLGtDQUFrQyxFQUFDLGdCQUFnQixFQUFDLGFBQWEsRUFBQyxhQUFhO0tBQzFELENBQUMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9yb3V0ZXIvbWFwL2Jhc2Vjb25maWcubWFwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVJvdXRlckNvbmZpZyB9IGZyb20gJy4uL3JvdXRlcic7XHJcbmltcG9ydCB7Um91dGVLZXlFbnVtfSBmcm9tIFwiLi4vZW51bS9Sb3V0ZUtleUVudW1cIjtcclxuaW1wb3J0IHtHcm91cEVudW19IGZyb20gXCIuLi9lbnVtL1JvdXRlR3JvdXBFbnVtXCI7XHJcbmltcG9ydCBDb25maWcgZnJvbSBcIi4uLy4uLy4uLy4uL2NvbmZpZ1wiO1xyXG4vKipcclxuICogQ3JlYXRlZCBieSBkZWxsIG9uIDIwMTcvNC8xOS5cclxuICovXHJcblxyXG5jb25zdCBCYXNlQ29uZmlnOklSb3V0ZXJDb25maWcgPSB7XHJcbiAgICBrZXk6IFJvdXRlS2V5RW51bS5CYXNlQ29uZmlnLFxyXG4gICAgdXJsOiAnL2Jhc2Vjb25maWcnLFxyXG4gICAgbW9kdWxlTmFtZTon6YWN572u566h55CGJyxcclxuICAgIGNvbnRyb2xsZXJOYW1lOiAnYmFzZUNvbmZpZ01haW5Db250cm9sbGVyJyxcclxuICAgIGNvbnRyb2xsZXJVcmw6ICdtb2R1bGUvYmFzZWNvbmZpZy9tYWluL21haW4uY29udHJvbGxlcicsXHJcbiAgICBjb250cm9sbGVyQXM6ICdiYXNlY29uZmlnQ3RybCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy9tb2R1bGUvYmFzZWNvbmZpZy9tYWluL21haW4uaHRtbCcsXHJcbiAgICByZWRpcmVjdFRvOiBSb3V0ZUtleUVudW0uQXJlYVxyXG59O1xyXG5cclxuY29uc3QgQXJlYTpJUm91dGVyQ29uZmlnID0ge1xyXG4gICAga2V5OiBSb3V0ZUtleUVudW0uQXJlYSxcclxuICAgIHVybDogJy9hcmVhJyxcclxuICAgIG1vZHVsZU5hbWU6ICdEUF9DT05GSUdfQVJFQV8wMScsXHJcbiAgICBjb250cm9sbGVyTmFtZTogJ2Jhc2VDb25maWdBcmVhQ29udHJvbGxlcicsXHJcbiAgICBjb250cm9sbGVyVXJsOiAnbW9kdWxlL2Jhc2Vjb25maWcvYXJlYS9hcmVhLmNvbnRyb2xsZXInLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgICAnYmFzZWNvbmZpZyc6IHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbW9kdWxlL2Jhc2Vjb25maWcvYXJlYS9hcmVhLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ2Jhc2VDb25maWdBcmVhQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ2FyZWFDdHJsJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBncm91cDogR3JvdXBFbnVtLkJhc2VDb25maWcsXHJcbiAgICBwYXJlbnQ6IFJvdXRlS2V5RW51bS5CYXNlQ29uZmlnLFxyXG4gICAgaWNvbjogJ2FyZWEnXHJcbn07XHJcblxyXG5cclxuXHJcblxyXG5sZXQgVW5pdDpJUm91dGVyQ29uZmlnID0ge1xyXG4gICAga2V5OiBSb3V0ZUtleUVudW0uVW5pdCxcclxuICAgIHVybDogJy91bml0JyxcclxuICAgIG1vZHVsZU5hbWU6ICdEUF9DT05GSUdfVU5JVF8wMScsXHJcbiAgICBjb250cm9sbGVyTmFtZTogJ2Jhc2VDb25maWdVbml0Q29udHJvbGxlcicsXHJcbiAgICBjb250cm9sbGVyVXJsOiAnbW9kdWxlL2Jhc2Vjb25maWcvdW5pdC91bml0LmNvbnRyb2xsZXInLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgICAnYmFzZWNvbmZpZyc6IHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbW9kdWxlL2Jhc2Vjb25maWcvdW5pdC91bml0Lmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ2Jhc2VDb25maWdVbml0Q29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3VuaXRDdHJsJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBncm91cDogR3JvdXBFbnVtLkJhc2VDb25maWcsXHJcbiAgICBwYXJlbnQ6IFJvdXRlS2V5RW51bS5CYXNlQ29uZmlnLFxyXG4gICAgaWNvbjogJ3VuaXQnXHJcbn07XHJcblxyXG5jb25zdCBQZXJzb246SVJvdXRlckNvbmZpZyA9IHtcclxuICAgIGtleTogJ2Jhc2Vjb25maWcucGVyc29uJyxcclxuICAgIHVybDogJy9wZXJzb24nLFxyXG4gICAgbW9kdWxlTmFtZTogJ0RQX0NPTkZJR19QRVJTT05fMDEnLFxyXG4gICAgY29udHJvbGxlck5hbWU6ICdiYXNlQ29uZmlnUGVyc29uQ29udHJvbGxlcicsXHJcbiAgICBjb250cm9sbGVyVXJsOiAnbW9kdWxlL2Jhc2Vjb25maWcvcGVyc29uL3BlcnNvbi5jb250cm9sbGVyJyxcclxuICAgIHZpZXdzOiB7XHJcbiAgICAgICAgJ2Jhc2Vjb25maWcnOiB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS9iYXNlY29uZmlnL3BlcnNvbi9wZXJzb24uaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJOYW1lOiAnYmFzZUNvbmZpZ1BlcnNvbkNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdiY1BlcnNvbkN0cmwnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBhcmVudDogJ2Jhc2Vjb25maWcnLFxyXG4gICAgZ3JvdXA6IEdyb3VwRW51bS5CYXNlQ29uZmlnLFxyXG4gICAgaWNvbjogJ3BlcnNvbidcclxufTtcclxuXHJcbmNvbnN0IFJvbGU6SVJvdXRlckNvbmZpZyA9IHtcclxuICAgIGtleTogUm91dGVLZXlFbnVtLlJvbGUsXHJcbiAgICB1cmw6ICcvcm9sZScsXHJcbiAgICBtb2R1bGVOYW1lOiAnRFBfQ09ORklHX1JPTEVfMDYnLFxyXG4gICAgY29udHJvbGxlck5hbWU6ICdiYXNlQ29uZmlnUm9sZUNvbnRyb2xsZXInLFxyXG4gICAgY29udHJvbGxlclVybDogJ21vZHVsZS9iYXNlY29uZmlnL3JvbGUvcm9sZS5jb250cm9sbGVyJyxcclxuICAgIHZpZXdzOiB7XHJcbiAgICAgICAgJ2Jhc2Vjb25maWcnOiB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS9iYXNlY29uZmlnL3JvbGUvcm9sZS5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlck5hbWU6ICdiYXNlQ29uZmlnUm9sZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdiY1JvbGVDdHJsJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBncm91cDogR3JvdXBFbnVtLkJhc2VDb25maWcsXHJcbiAgICBwYXJlbnQ6IFJvdXRlS2V5RW51bS5CYXNlQ29uZmlnLFxyXG4gICAgaWNvbjogJ3JvbGUnXHJcbn07XHJcblxyXG5jb25zdCBDcmVhdGVSb2xlOklSb3V0ZXJDb25maWcgPSB7XHJcbiAgICBrZXk6IFJvdXRlS2V5RW51bS5DcmVhdGVSb2xlLFxyXG4gICAgdXJsOiAnL25ld1JvbGU/cm9sZUlkJyxcclxuICAgIG1vZHVsZU5hbWU6ICfmlrDlu7rop5LoibInLFxyXG4gICAgY29udHJvbGxlck5hbWU6ICduZXdSb2xlQ29udHJvbGxlcicsXHJcbiAgICBjb250cm9sbGVyVXJsOiAnbW9kdWxlL2Jhc2Vjb25maWcvcm9sZS9uZXdSb2xlL25ld1JvbGUuY29udHJvbGxlcicsXHJcbiAgICB2aWV3czoge1xyXG4gICAgICAgICdyb2xlY29uZmlnJzoge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9tb2R1bGUvYmFzZWNvbmZpZy9yb2xlL25ld1JvbGUvbmV3Um9sZS5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlck5hbWU6ICduZXdSb2xlQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ25ld1JvbGVDdHJsJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBncm91cDogR3JvdXBFbnVtLkJhc2VDb25maWcsXHJcbiAgICBwYXJlbnQ6IFJvdXRlS2V5RW51bS5Sb2xlLFxyXG4gICAgaWNvbjogJ3JvbGUnLFxyXG4gICAgaXNMb2NhbDp0cnVlXHJcbn07XHJcblxyXG5jb25zdCBDYW1lcmE6SVJvdXRlckNvbmZpZyA9IHtcclxuICAgIGtleTogUm91dGVLZXlFbnVtLkNhbWVyYSxcclxuICAgIHVybDogJy9jYW1lcmEnLFxyXG4gICAgbW9kdWxlTmFtZTogJ0RQX0NPTkZJR19DQU1FUkFfMDEnLFxyXG4gICAgY29udHJvbGxlclVybDogJ21vZHVsZS9iYXNlY29uZmlnL2NhbWVyYS9jYW1lcmEuY29udHJvbGxlcicsXHJcbiAgICBjb250cm9sbGVyTmFtZTogJ2Jhc2VDb25maWdDYW1lcmFDb250cm9sbGVyJyxcclxuICAgIHZpZXdzOiB7XHJcbiAgICAgICAgJ2Jhc2Vjb25maWcnOiB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS9iYXNlY29uZmlnL2NhbWVyYS9jYW1lcmEuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJOYW1lOiAnYmFzZUNvbmZpZ0NhbWVyYUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdiY0NhbWVyYUN0cmwnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBhcmVudDogUm91dGVLZXlFbnVtLkJhc2VDb25maWcsXHJcbiAgICBncm91cDogR3JvdXBFbnVtLkRldmljZUNvbmZpZyxcclxuICAgIGljb246ICdjYW1lcmFJY29uJ1xyXG59O1xyXG5jb25zdCBSbXBHYXRlOklSb3V0ZXJDb25maWcgPSB7XHJcbiAgICBrZXk6IFJvdXRlS2V5RW51bS5SbXBHYXRlLFxyXG4gICAgdXJsOiAnL3JtcGdhdGUnLFxyXG4gICAgbW9kdWxlTmFtZTogJ0RQX0NPTkZJR19STVBHQVRFXzAzJyxcclxuICAgIGNvbnRyb2xsZXJVcmw6ICdtb2R1bGUvYmFzZWNvbmZpZy9ybXBnYXRlL3JtcGdhdGUuY29udHJvbGxlcicsXHJcbiAgICBjb250cm9sbGVyTmFtZTogJ2Jhc2VDb25maWdSbXBHYXRlQ29udHJvbGxlcicsXHJcbiAgICB2aWV3czoge1xyXG4gICAgICAgICdiYXNlY29uZmlnJzoge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9tb2R1bGUvYmFzZWNvbmZpZy9ybXBnYXRlL3JtcGdhdGUuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJOYW1lOiAnYmFzZUNvbmZpZ1JtcEdhdGVDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnYmNSbXBHYXRlQ3RybCdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcGFyZW50OiBSb3V0ZUtleUVudW0uQmFzZUNvbmZpZyxcclxuICAgIGdyb3VwOiBHcm91cEVudW0uRGV2aWNlQ29uZmlnLFxyXG4gICAgaWNvbjogJ3JtcGdhdGUnXHJcbn07XHJcblxyXG5jb25zdCBXaWZpOklSb3V0ZXJDb25maWcgPSB7XHJcbiAgICBrZXk6IFJvdXRlS2V5RW51bS5XaWZpLFxyXG4gICAgdXJsOiAnL3dpZmknLFxyXG4gICAgbW9kdWxlTmFtZTogJ0RQX0NPTkZJR19XSUZJXzAzJyxcclxuICAgIGNvbnRyb2xsZXJVcmw6ICdtb2R1bGUvYmFzZWNvbmZpZy93aWZpL3dpZmkuY29udHJvbGxlcicsXHJcbiAgICBjb250cm9sbGVyTmFtZTogJ2Jhc2VDb25maWdXaWZpQ29udHJvbGxlcicsXHJcbiAgICB2aWV3czoge1xyXG4gICAgICAgICdiYXNlY29uZmlnJzoge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9tb2R1bGUvYmFzZWNvbmZpZy93aWZpL3dpZmkuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJOYW1lOiAnYmFzZUNvbmZpZ1dpZmlDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnYmNXaWZpQ3RybCdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcGFyZW50OiBSb3V0ZUtleUVudW0uQmFzZUNvbmZpZyxcclxuICAgIGdyb3VwOiBHcm91cEVudW0uRGV2aWNlQ29uZmlnLFxyXG4gICAgaWNvbjogJ3dpZmknXHJcbn07XHJcblxyXG5jb25zdCBFbGVjdHJvbmljRmVuY2U6SVJvdXRlckNvbmZpZyA9IHtcclxuICAgIGtleTogUm91dGVLZXlFbnVtLkVsZWN0cm9uaWNGZW5jZSxcclxuICAgIHVybDogJy9lbGVjdHJvbmljZmVuY2UnLFxyXG4gICAgbW9kdWxlTmFtZTogJ0RQX0NPTkZJR19FTEVDVFJPTklDRkVOQ0VfMDEnLFxyXG4gICAgY29udHJvbGxlclVybDogJ21vZHVsZS9iYXNlY29uZmlnL2VsZWN0cm9uaWNmZW5jZS9lbGUuY29udHJvbGxlcicsXHJcbiAgICBjb250cm9sbGVyTmFtZTogJ2Jhc2VDb25maWdFbGVjdHJvbmljRmVuY2VDb250cm9sbGVyJyxcclxuICAgIHZpZXdzOiB7XHJcbiAgICAgICAgJ2Jhc2Vjb25maWcnOiB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS9iYXNlY29uZmlnL2VsZWN0cm9uaWNmZW5jZS9lbGUuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJOYW1lOiAnYmFzZUNvbmZpZ0VsZWN0cm9uaWNGZW5jZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdiY0VsZWN0cm9uaWNGZW5jZUN0cmwnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBhcmVudDogUm91dGVLZXlFbnVtLkJhc2VDb25maWcsXHJcbiAgICBncm91cDogR3JvdXBFbnVtLkRldmljZUNvbmZpZyxcclxuICAgIGljb246ICdlbGUnXHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIExhbXAgcm91dGVyIGNvbmZpZ1xyXG4gKi9cclxuY29uc3QgTGFtcDpJUm91dGVyQ29uZmlnID0ge1xyXG4gICAga2V5OiBSb3V0ZUtleUVudW0uTGFtcCxcclxuICAgIHVybDogJy9sYW1wJyxcclxuICAgIG1vZHVsZU5hbWU6ICdEUF9DT05GSUdfTEFNUF8wMCcsXHJcbiAgICBjb250cm9sbGVyTmFtZTogJ2Jhc2VDb25maWdMYW1wQ29udHJvbGxlcicsXHJcbiAgICBjb250cm9sbGVyVXJsOiAnbW9kdWxlL2Jhc2Vjb25maWcvbGFtcC9sYW1wLmNvbnRyb2xsZXInLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgICAnYmFzZWNvbmZpZyc6IHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbW9kdWxlL2Jhc2Vjb25maWcvbGFtcC9sYW1wLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ2Jhc2VDb25maWdMYW1wQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ2xhbXBDdHJsJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBncm91cDogR3JvdXBFbnVtLkRldmljZUNvbmZpZyxcclxuICAgIHBhcmVudDogUm91dGVLZXlFbnVtLkJhc2VDb25maWcsXHJcbiAgICBpY29uOiAnbGFtcEljb24nXHJcbn07XHJcblxyXG5jb25zdCBWaWRlb1NlcnZlcjpJUm91dGVyQ29uZmlnID0ge1xyXG4gICAga2V5OiBSb3V0ZUtleUVudW0uVmlkZW9TZXJ2ZXIsXHJcbiAgICB1cmw6ICcvdmlkZW9TZXJ2ZXInLFxyXG4gICAgbW9kdWxlTmFtZTogJ0RQX0NPTkZJR19WSURFT1NFUlZFUl8wMCcsXHJcbiAgICBjb250cm9sbGVyTmFtZTogJ2Jhc2VDb25maWdWaWRlb1NlcnZlckNvbnRyb2xsZXInLFxyXG4gICAgY29udHJvbGxlclVybDogJ21vZHVsZS9iYXNlY29uZmlnL3ZpZGVvU2VydmVyL3ZpZGVvU2VydmVyLmNvbnRyb2xsZXInLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgICAnYmFzZWNvbmZpZyc6IHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbW9kdWxlL2Jhc2Vjb25maWcvdmlkZW9TZXJ2ZXIvdmlkZW9TZXJ2ZXIuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJOYW1lOiAnYmFzZUNvbmZpZ1ZpZGVvU2VydmVyQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ2JjVmlkZW9TZXJ2ZXJDdHJsJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwYXJlbnQ6IFJvdXRlS2V5RW51bS5CYXNlQ29uZmlnLFxyXG4gICAgZ3JvdXA6IEdyb3VwRW51bS5TZXJ2aWNlQ29uZmlnLFxyXG4gICAgaWNvbjogJ3ZpZGVvc2VydmVyJ1xyXG59O1xyXG5cclxuXHJcbmNvbnN0IEZhY2VMaWI6SVJvdXRlckNvbmZpZyA9IHtcclxuICAgIGtleTogUm91dGVLZXlFbnVtLkZhY2VMaWIsXHJcbiAgICB1cmw6ICcvZmFjZUxpYicsXHJcbiAgICBtb2R1bGVOYW1lOiAnRFBfQ09ORklHX0ZBQ0VMSUJfMDAnLFxyXG4gICAgY29udHJvbGxlclVybDogJ21vZHVsZS9iYXNlY29uZmlnL2ZhY2VsaWIvZmFjZWxpYi5jb250cm9sbGVyJyxcclxuICAgIGNvbnRyb2xsZXJOYW1lOiAnYmFzZUNvbmZpZ0ZhY2VMaWJDb250cm9sbGVyJyxcclxuICAgIHZpZXdzOiB7XHJcbiAgICAgICAgJ2Jhc2Vjb25maWcnOiB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS9iYXNlY29uZmlnL2ZhY2VsaWIvZmFjZWxpYi5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlck5hbWU6ICdiYXNlQ29uZmlnRmFjZUxpYkNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdmYWNlTGliQ3RybCdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ3JvdXA6IEdyb3VwRW51bS5SZXNvdXJjZUNvbmZpZyxcclxuICAgIHBhcmVudDogUm91dGVLZXlFbnVtLkJhc2VDb25maWcsXHJcbiAgICBpY29uOiAnZmFjZWxpYicsXHJcbiAgICByZWRpcmVjdFRvOiBSb3V0ZUtleUVudW0uRmFjZUxpYiAvLyDov5nph4zot7Poh6rouqvmmK/kuLrkuobmr4/mrKHov5vlhaXot6/nlLHpg73miafooYxGYWNlTGli5a+55bqU55qEY29udHJvbGxlclxyXG59O1xyXG5cclxuY29uc3QgRmFjZUxpYkxpYjpJUm91dGVyQ29uZmlnID0ge1xyXG4gICAga2V5OiBSb3V0ZUtleUVudW0uRmFjZUxpYkxpYnJhcnksXHJcbiAgICB1cmw6ICcvbGlicmFyeScsXHJcbiAgICBtb2R1bGVOYW1lOiAn5Lq65YOP5bqTLeW6k+euoeeQhicsXHJcbiAgICBjb250cm9sbGVyVXJsOiAnbW9kdWxlL2Jhc2Vjb25maWcvZmFjZWxpYi9saWJyYXJ5L2ZhY2VsaWIubGlicmFyeS5jb250cm9sbGVyJyxcclxuICAgIGNvbnRyb2xsZXJOYW1lOiAnYmNGYWNlTGliTGliQ29udHJvbGxlcicsXHJcbiAgICB2aWV3czoge1xyXG4gICAgICAgICdmYWNlTGliQ2hpbGRWaWV3Jzoge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9tb2R1bGUvYmFzZWNvbmZpZy9mYWNlbGliL2xpYnJhcnkvZmFjZWxpYi5saWJyYXJ5Lmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ2JjRmFjZUxpYkxpYkNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdiY0ZhY2VMaWJMaWJDdHJsJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwYXJlbnQ6IFJvdXRlS2V5RW51bS5GYWNlTGliLFxyXG4gICAgaXNMb2NhbDp0cnVlXHJcbn07XHJcblxyXG5jb25zdCBGYWNlTGliUGVyc29uOklSb3V0ZXJDb25maWcgPSB7XHJcbiAgICBrZXk6IFJvdXRlS2V5RW51bS5GYWNlTGliUGVyc29uLFxyXG4gICAgdXJsOiAnL2ZhY2VMaWJQZXJzb24nLFxyXG4gICAgbW9kdWxlTmFtZTogJ+S6uuWDj+W6ky3kurrlkZjnrqHnkIYnLFxyXG4gICAgY29udHJvbGxlclVybDogJ21vZHVsZS9iYXNlY29uZmlnL2ZhY2VsaWIvcGVyc29uL2ZhY2VsaWIucGVyc29uLmNvbnRyb2xsZXInLFxyXG4gICAgY29udHJvbGxlck5hbWU6ICdiY0ZhY2VMaWJQZXJzb25Db250cm9sbGVyJyxcclxuICAgIHZpZXdzOiB7XHJcbiAgICAgICAgJ2ZhY2VMaWJDaGlsZFZpZXcnOiB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS9iYXNlY29uZmlnL2ZhY2VsaWIvcGVyc29uL2ZhY2VsaWIucGVyc29uLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ2JjRmFjZUxpYlBlcnNvbkNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdiY0ZhY2VMaWJQZXJzb25DdHJsJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwYXJlbnQ6IFJvdXRlS2V5RW51bS5GYWNlTGliLFxyXG4gICAgaXNMb2NhbDp0cnVlXHJcbn07XHJcblxyXG5jb25zdCBNYXBSZXNvdXJjZTpJUm91dGVyQ29uZmlnID0ge1xyXG4gICAga2V5OiBSb3V0ZUtleUVudW0uTWFwUmVzb3VyY2UsXHJcbiAgICB1cmw6ICcvbWFwcmVzb3VyY2UnLFxyXG4gICAgbW9kdWxlTmFtZTogJ0RQX0NPTkZJR19NQVBSRVNPVVJDRV8wMCcsXHJcbiAgICBjb250cm9sbGVyVXJsOiAnbW9kdWxlL2Jhc2Vjb25maWcvbWFwLXJlc291cmNlL21hcC5yZXNvdXJjZS5jb250cm9sbGVyJyxcclxuICAgIGNvbnRyb2xsZXJOYW1lOiAnYmFzZUNvbmZpZ01hcFJlc291cmNlQ29udHJvbGxlcicsXHJcbiAgICB2aWV3czoge1xyXG4gICAgICAgICdiYXNlY29uZmlnJzoge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9tb2R1bGUvYmFzZWNvbmZpZy9tYXAtcmVzb3VyY2UvbWFwLnJlc291cmNlLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ2Jhc2VDb25maWdNYXBSZXNvdXJjZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdtYXBSZXNvdXJjZUN0cmwnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBhcmVudDogUm91dGVLZXlFbnVtLkJhc2VDb25maWcsXHJcbiAgICBncm91cDogR3JvdXBFbnVtLlJlc291cmNlQ29uZmlnLFxyXG4gICAgaWNvbjogJ21hcHJlc291cmNlJ1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5jb25zdCBQcm94eVNlcnZlcjpJUm91dGVyQ29uZmlnID0ge1xyXG4gICAga2V5OiBSb3V0ZUtleUVudW0uUHJveHlTZXJ2ZXIsXHJcbiAgICB1cmw6ICcvcHJveHlTZXJ2ZXInLFxyXG4gICAgbW9kdWxlTmFtZTogJ0RQX0NPTkZJR19QUk9YWVNFUlZFUl8wMCcsXHJcbiAgICBjb250cm9sbGVyTmFtZTogJ2Jhc2VDb25maWdQcm94eVNlcnZlckNvbnRyb2xsZXInLFxyXG4gICAgY29udHJvbGxlclVybDogJ21vZHVsZS9iYXNlY29uZmlnL3Byb3h5U2VydmVyL3Byb3h5U2VydmVyLmNvbnRyb2xsZXInLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgICAnYmFzZWNvbmZpZyc6IHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbW9kdWxlL2Jhc2Vjb25maWcvcHJveHlTZXJ2ZXIvcHJveHlTZXJ2ZXIuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJOYW1lOiAnYmFzZUNvbmZpZ1Byb3h5U2VydmVyQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ2JjUHJveHlTZXJ2ZXJDdHJsJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwYXJlbnQ6IFJvdXRlS2V5RW51bS5CYXNlQ29uZmlnLFxyXG4gICAgZ3JvdXA6IEdyb3VwRW51bS5TZXJ2aWNlQ29uZmlnLFxyXG4gICAgaWNvbjogJ3Byb3h5c2VydmVyJ1xyXG59O1xyXG5cclxuY29uc3QgSXZzU2VydmVyOklSb3V0ZXJDb25maWcgPSB7XHJcbiAgICBrZXk6IFJvdXRlS2V5RW51bS5JdnNTZXJ2ZXIsXHJcbiAgICB1cmw6ICcvaXZzU2VydmVyJyxcclxuICAgIG1vZHVsZU5hbWU6ICdEUF9DT05GSUdfSVZTU0VSVkVSXzAxJyxcclxuICAgIGNvbnRyb2xsZXJOYW1lOiAnYmFzZUNvbmZpZ0l2c1NlcnZlckNvbnRyb2xsZXInLFxyXG4gICAgY29udHJvbGxlclVybDogJ21vZHVsZS9iYXNlY29uZmlnL2l2c1NlcnZlci9pdnNTZXJ2ZXIuY29udHJvbGxlcicsXHJcbiAgICB2aWV3czoge1xyXG4gICAgICAgICdiYXNlY29uZmlnJzoge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9tb2R1bGUvYmFzZWNvbmZpZy9pdnNTZXJ2ZXIvaXZzU2VydmVyLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ2Jhc2VDb25maWdJdnNTZXJ2ZXJDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnYmNJdnNTZXJ2ZXJDdHJsJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwYXJlbnQ6IFJvdXRlS2V5RW51bS5CYXNlQ29uZmlnLFxyXG4gICAgZ3JvdXA6IEdyb3VwRW51bS5TZXJ2aWNlQ29uZmlnLFxyXG4gICAgaWNvbjogJ2l2c3NlcnZlcidcclxufTtcclxuXHJcbmNvbnN0IEVuZ2luZVNlcnZlcjpJUm91dGVyQ29uZmlnID0ge1xyXG4gICAgaXNMb2NhbDp0cnVlLFxyXG4gICAga2V5OiBSb3V0ZUtleUVudW0uRW5naW5lU2VydmVyLFxyXG4gICAgdXJsOiAnL2VuZ2luZVNlcnZlcicsXHJcbiAgICBtb2R1bGVOYW1lOiAnRFBfQ09ORklHX0VOR0lORVNFUlZFUl8wMScsXHJcbiAgICBjb250cm9sbGVyTmFtZTogJ2Jhc2VDb25maWdFbmdpbmVTZXJ2ZXJDb250cm9sbGVyJyxcclxuICAgIGNvbnRyb2xsZXJVcmw6ICdtb2R1bGUvYmFzZWNvbmZpZy9lbmdpbmVTZXJ2ZXIvZW5naW5lU2VydmVyLmNvbnRyb2xsZXInLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgICAnYmFzZWNvbmZpZyc6IHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbW9kdWxlL2Jhc2Vjb25maWcvZW5naW5lU2VydmVyL2VuZ2luZVNlcnZlci5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlck5hbWU6ICdiYXNlQ29uZmlnRW5naW5lU2VydmVyQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ2JjRW5naW5lU2VydmVyQ3RybCdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcGFyZW50OiBSb3V0ZUtleUVudW0uQmFzZUNvbmZpZyxcclxuICAgIGdyb3VwOiBHcm91cEVudW0uU2VydmljZUNvbmZpZyxcclxuICAgIGljb246ICdlbmdpbmVzZXJ2ZXInXHJcbn07XHJcblxyXG5jb25zdCBTeXN0ZW1Qcm9wZXJ0aWVzOklSb3V0ZXJDb25maWcgPSB7XHJcbiAgICBrZXk6IFJvdXRlS2V5RW51bS5TeXN0ZW1Qcm9wZXJ0aWVzLFxyXG4gICAgdXJsOiAnL3N5c3RlbXByb3BlcnRpZXMnLFxyXG4gICAgbW9kdWxlTmFtZTogJ0RQX0NPTkZJR19TWVNURU1QUk9QRVJUSUVTXzAxJyxcclxuICAgIGNvbnRyb2xsZXJVcmw6ICdtb2R1bGUvYmFzZWNvbmZpZy9zeXN0ZW0tcHJvcGVydGllcy9zeXN0ZW0scHJvcGVydGllcy5jb250cm9sbGVyJyxcclxuICAgIGNvbnRyb2xsZXJOYW1lOiAnc3lzdGVtUHJvcGVydGllc0NvbnRyb2xsZXInLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgICAnYmFzZWNvbmZpZyc6IHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbW9kdWxlL2Jhc2Vjb25maWcvc3lzdGVtLXByb3BlcnRpZXMvc3lzdGVtLnByb3BlcnRpZXMuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJOYW1lOiAnc3lzdGVtUHJvcGVydGllc0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdzeXN0ZW1Qcm9wZXJ0aWVzQ3RybCdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcGFyZW50OiBSb3V0ZUtleUVudW0uQmFzZUNvbmZpZyxcclxuICAgIGdyb3VwOiBHcm91cEVudW0uU3lzdGVtQ29uZmlnLFxyXG4gICAgaWNvbjogJ3N5c3RlbXByb3BlcnRpZXMnXHJcbn07XHJcblxyXG5cclxuY29uc3QgUnVuUGxhbjpJUm91dGVyQ29uZmlnID0ge1xyXG4gICAga2V5OiBSb3V0ZUtleUVudW0uUnVuUGxhbixcclxuICAgIHVybDogJy9ydW5wbGFuJyxcclxuICAgIG1vZHVsZU5hbWU6ICfml7bpl7TmqKHmnb8nLFxyXG4gICAgY29udHJvbGxlclVybDogJ21vZHVsZS9iYXNlY29uZmlnL3J1blBsYW4vcnVuUGxhbi5jb250cm9sbGVyJyxcclxuICAgIGNvbnRyb2xsZXJOYW1lOiAncnVuUGxhbkNvbnRyb2xsZXInLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgICAnYmFzZWNvbmZpZyc6IHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbW9kdWxlL2Jhc2Vjb25maWcvcnVuUGxhbi9ydW5QbGFuLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ3J1blBsYW5Db250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAncnVuUGxhbkN0cmwnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBhcmVudDogUm91dGVLZXlFbnVtLkJhc2VDb25maWcsXHJcbiAgICBncm91cDogR3JvdXBFbnVtLkJ1c2luZXNzQ29uZmlnLFxyXG4gICAgaWNvbjogJ3J1bnBsYW4nXHJcbn07XHJcblxyXG5jb25zdCBUYXNrQ29uZmlnOklSb3V0ZXJDb25maWcgPSB7XHJcbiAgICBrZXk6IFJvdXRlS2V5RW51bS5UYXNrQ29uZmlnLFxyXG4gICAgdXJsOiAnL3Rhc2tjb25maWcnLFxyXG4gICAgbW9kdWxlTmFtZTogJ0RQX0NPTkZJR19UQVNLQ09ORlVHXzAyJyxcclxuICAgIGNvbnRyb2xsZXJVcmw6ICdtb2R1bGUvYmFzZWNvbmZpZy90YXNrY29uZmlnL21haW4vdGFza2NvbmZpZy5jb250cm9sbGVyJyxcclxuICAgIGNvbnRyb2xsZXJOYW1lOiAndGFza0NvbmZpZ0NvbnRyb2xsZXInLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgICAnYmFzZWNvbmZpZyc6IHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbW9kdWxlL2Jhc2Vjb25maWcvdGFza2NvbmZpZy9tYWluL3Rhc2tjb25maWcuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJOYW1lOiAndGFza0NvbmZpZ0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd0YXNrQ29uZmlnQ3RybCdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcGFyZW50OiBSb3V0ZUtleUVudW0uQmFzZUNvbmZpZyxcclxuICAgIGdyb3VwOiBHcm91cEVudW0uQnVzaW5lc3NDb25maWcsXHJcbiAgICBpY29uOiAndGFzaydcclxufTtcclxuXHJcbmNvbnN0IEV2ZW50UnVsZTpJUm91dGVyQ29uZmlnID0ge1xyXG4gICAga2V5OiBSb3V0ZUtleUVudW0uRXZlbnRSdWxlLFxyXG4gICAgdXJsOiAnL2V2ZW50cnVsZScsXHJcbiAgICBtb2R1bGVOYW1lOiAn6IGU5Yqo6aKE5qGIJyxcclxuICAgIGNvbnRyb2xsZXJOYW1lOiAnYmFzZUNvbmZpZ0Nhc2VDb250cm9sbGVyJyxcclxuICAgIGNvbnRyb2xsZXJVcmw6ICdtb2R1bGUvYmFzZWNvbmZpZy9ldmVudFJ1bGUvZXZlbnRSdWxlLmNvbnRyb2xsZXInLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgICAnYmFzZWNvbmZpZyc6IHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbW9kdWxlL2Jhc2Vjb25maWcvZXZlbnRSdWxlL2V2ZW50UnVsZS5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlck5hbWU6ICdiYXNlQ29uZmlnRXZlbnRSdWxlQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ2V2ZW50UnVsZUN0cmwnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdyb3VwOiBHcm91cEVudW0uQnVzaW5lc3NDb25maWcsXHJcbiAgICBwYXJlbnQ6IFJvdXRlS2V5RW51bS5CYXNlQ29uZmlnLFxyXG4gICAgaWNvbjogJ3Rhc2snXHJcbn1cclxuXHJcblxyXG4vKipcclxuICogSW9kIHJvdXRlciBjb25maWdcclxuICovXHJcbmNvbnN0IElvZENvbmZpZzpJUm91dGVyQ29uZmlnID0ge1xyXG4gICAga2V5OiBSb3V0ZUtleUVudW0uSW9kLFxyXG4gICAgdXJsOiAnL2lvZGNvbmZpZycsXHJcbiAgICBtb2R1bGVOYW1lOiAnRFBfQ09ORklHX0lPRFNFUlZFUl8wMScsXHJcbiAgICBjb250cm9sbGVyVXJsOiAnbW9kdWxlL2Jhc2Vjb25maWcvaW9kL2lvZC5jb250cm9sbGVyJyxcclxuICAgIGNvbnRyb2xsZXJOYW1lOiAnaW9kQ29udHJvbGxlcicsXHJcbiAgICB2aWV3czoge1xyXG4gICAgICAgICdiYXNlY29uZmlnJzoge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9tb2R1bGUvYmFzZWNvbmZpZy9pb2QvaW9kLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ2lvZENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdpb2RDdHJsJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBncm91cDogR3JvdXBFbnVtLlNlcnZpY2VDb25maWcsXHJcbiAgICBwYXJlbnQ6IFJvdXRlS2V5RW51bS5CYXNlQ29uZmlnLFxyXG4gICAgaWNvbjogJ3ZpZGVvc2VydmVyJ1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIHJmaWQgcm91dGVyIGNvbmZpZ1xyXG4gKi9cclxuXHJcbmNvbnN0IFRhc2tDb25maWdOZXdGYWNlTW9uaXRvcjpJUm91dGVyQ29uZmlnID0ge1xyXG4gICAga2V5OiBSb3V0ZUtleUVudW0uVGFza0NvbmZpZ05ld0ZhY2VNb25pdG9yLFxyXG4gICAgdXJsOiAnL3Rhc2tOZXdGYWNlVGFzaz90YXNrSWQ/YXJlYUlkJyxcclxuICAgIG1vZHVsZU5hbWU6ICdEUF9DT05GSUdfVEFTS0NPTkZVR18zNycsXHJcbiAgICBjb250cm9sbGVyVXJsOiAnbW9kdWxlL2Jhc2Vjb25maWcvdGFza2NvbmZpZy9uZXdGYWNlTW9uaXRvci9uZXdGYWNlTW9uaXRvci5jb250cm9sbGVyJyxcclxuICAgIGNvbnRyb2xsZXJOYW1lOiAndGFza05ld1Rhc2tDb250cm9sbGVyJyxcclxuICAgIHZpZXdzOiB7XHJcbiAgICAgICAgJ3Rhc2tjb25maWcnOiB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS9iYXNlY29uZmlnL3Rhc2tjb25maWcvbmV3RmFjZU1vbml0b3IvbmV3RmFjZU1vbml0b3IuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJOYW1lOiAnbmV3RmFjZU1vbml0b3JDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnbmV3RmFjZU1vbml0b3JDdHJsJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwYXJlbnQ6IFJvdXRlS2V5RW51bS5UYXNrQ29uZmlnLFxyXG4gICAgaXNMb2NhbDp0cnVlXHJcbn07XHJcblxyXG5jb25zdCBWaWRlb1N0cnVjdHVyZWRUYXNrc0NvbmZpZzpJUm91dGVyQ29uZmlnID0ge1xyXG4gICAga2V5OiBSb3V0ZUtleUVudW0uVmlkZW9TdHJ1Y3R1cmVkVGFza3MsXHJcbiAgICB1cmw6ICcvdmlkZW9TdHJ1Y3R1cmVkVGFza3MnLFxyXG4gICAgbW9kdWxlTmFtZTogJ+inhumikee7k+aehOWMluS7u+WKoScsXHJcbiAgICBjb250cm9sbGVyVXJsOiAnbW9kdWxlL2Jhc2Vjb25maWcvdmlkZW9TdHJ1Y3R1cmVkVGFza3MvdmlkZW9TdHJ1Y3R1cmVkVGFza3MuY29udHJvbGxlcicsXHJcbiAgICBjb250cm9sbGVyTmFtZTogJ1ZpZGVvU3RydWN0dXJlZFRhc2tzQ29udHJvbGxlcicsXHJcbiAgICB2aWV3czoge1xyXG4gICAgICAgICdiYXNlY29uZmlnJzoge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9tb2R1bGUvYmFzZWNvbmZpZy92aWRlb1N0cnVjdHVyZWRUYXNrcy92aWRlb1N0cnVjdHVyZWRUYXNrcy5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlck5hbWU6ICdWaWRlb1N0cnVjdHVyZWRUYXNrc0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdWaWRlb1N0cnVjdHVyZWRUYXNrc0N0cmwnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBhcmVudDogUm91dGVLZXlFbnVtLkJhc2VDb25maWcsXHJcbiAgICBncm91cDogR3JvdXBFbnVtLkJ1c2luZXNzQ29uZmlnLFxyXG4gICAgaWNvbjogJ3Rhc2snXHJcbn07XHJcblxyXG5jb25zdCBWaWRlb1N0cnVjdHVyZWRUYXNrc05ld0ZhY2VNb25pdG9yOklSb3V0ZXJDb25maWcgPSB7XHJcbiAgICBrZXk6IFJvdXRlS2V5RW51bS52aWRlb05ld0ZhY2VUYXNrLFxyXG4gICAgdXJsOiAnL3ZpZGVvTmV3RmFjZVRhc2s/dGFza0lkP2FyZWFJZD90eXBlJyxcclxuICAgIG1vZHVsZU5hbWU6ICdGRFNfMDFfMTJfMjUnLFxyXG4gICAgY29udHJvbGxlclVybDogJ21vZHVsZS9iYXNlY29uZmlnL3ZpZGVvU3RydWN0dXJlZFRhc2tzL25ld0ZhY2VUYXNrL25ld1ZpZGVvU3RydWN0LmNvbnRyb2xsZXInLFxyXG4gICAgY29udHJvbGxlck5hbWU6ICd2aWRlb05ld1Rhc2tDb250cm9sbGVyJyxcclxuICAgIHZpZXdzOiB7XHJcbiAgICAgICAgJ3ZpZGVvU3RydWN0dXJlZFRhc2tzJzoge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9tb2R1bGUvYmFzZWNvbmZpZy92aWRlb1N0cnVjdHVyZWRUYXNrcy9uZXdGYWNlVGFzay9uZXdWaWRlb1N0cnVjdC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlck5hbWU6ICd2aWV3TmV3VGFza0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2aWRlb05ld1Rhc2tDdHJsJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwYXJlbnQ6IFJvdXRlS2V5RW51bS5WaWRlb1N0cnVjdHVyZWRUYXNrcyxcclxuICAgIGlzTG9jYWw6dHJ1ZVxyXG59O1xyXG5cclxuXHJcbi8vIOaWsOW7uui9pui+huW4g+aOp1xyXG5jb25zdCBuZXdDYXJNb25pdG9yOklSb3V0ZXJDb25maWcgPSB7XHJcbiAgICBrZXk6IFJvdXRlS2V5RW51bS5uZXdDYXJNb25pdG9yLFxyXG4gICAgdXJsOiAnL2Nhck1vbml0b3I/dGFza0lkJyxcclxuICAgIG1vZHVsZU5hbWU6ICfovabovobluIPmjqfmk43kvZwnLFxyXG4gICAgY29udHJvbGxlck5hbWU6ICduZXdDYXJNb25pdG9yJyxcclxuICAgIGNvbnRyb2xsZXJVcmw6ICdtb2R1bGUvYmFzZWNvbmZpZy90YXNrY29uZmlnL25ld0Nhck1vbml0b3IvbmV3Q2FyTW9uaXRvci5jb250cm9sbGVyJyxcclxuICAgIHZpZXdzOiB7XHJcbiAgICAgICAgJ3Rhc2tjb25maWcnOiB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS9iYXNlY29uZmlnL3Rhc2tjb25maWcvbmV3Q2FyTW9uaXRvci9uZXdDYXJNb25pdG9yLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ25ld0Nhck1vbml0b3InLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICduZXdDYXJNb25pdG9yQ3RybCdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcGFyZW50OiBSb3V0ZUtleUVudW0uVGFza0NvbmZpZyxcclxuICAgIGlzTG9jYWw6dHJ1ZVxyXG59O1xyXG5cclxuLy8g5paw5bu6bWFj5biD5o6nXHJcbmNvbnN0IG5ld01hY01vbml0b3I6SVJvdXRlckNvbmZpZyA9IHtcclxuICAgIGtleTogUm91dGVLZXlFbnVtLm5ld01hY01vbml0b3IsXHJcbiAgICB1cmw6ICcvbWFjTW9uaXRvcj90YXNrSWQnLFxyXG4gICAgbW9kdWxlTmFtZTogJ21hY+W4g+aOp+aTjeS9nCcsXHJcbiAgICBjb250cm9sbGVyTmFtZTogJ25ld01hY01vbml0b3InLFxyXG4gICAgY29udHJvbGxlclVybDogJ21vZHVsZS9iYXNlY29uZmlnL3Rhc2tjb25maWcvbmV3TWFjTW9uaXRvci9uZXdNYWNNb25pdG9yLmNvbnRyb2xsZXInLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgICAndGFza2NvbmZpZyc6IHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbW9kdWxlL2Jhc2Vjb25maWcvdGFza2NvbmZpZy9uZXdNYWNNb25pdG9yL25ld01hY01vbml0b3IuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJOYW1lOiAnbmV3TWFjTW9uaXRvcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ25ld01hY01vbml0b3JDdHJsJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwYXJlbnQ6IFJvdXRlS2V5RW51bS5UYXNrQ29uZmlnLFxyXG4gICAgaXNMb2NhbDp0cnVlXHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IEJhc2VDb25maWdNYXAgPSBbXHJcbiAgICBCYXNlQ29uZmlnLCBBcmVhLFVuaXQsIFBlcnNvbiwgUm9sZSxDcmVhdGVSb2xlLFxyXG4gICAgUHJveHlTZXJ2ZXIsVmlkZW9TZXJ2ZXIsSW9kQ29uZmlnLEl2c1NlcnZlcixFbmdpbmVTZXJ2ZXIsXHJcbiAgICBDYW1lcmEsUm1wR2F0ZSwgV2lmaSxFbGVjdHJvbmljRmVuY2UsTGFtcCxcclxuICAgIEZhY2VMaWIsRmFjZUxpYkxpYixGYWNlTGliUGVyc29uLCBNYXBSZXNvdXJjZSxcclxuICAgIFJ1blBsYW4sRXZlbnRSdWxlLFRhc2tDb25maWcsVGFza0NvbmZpZ05ld0ZhY2VNb25pdG9yLFZpZGVvU3RydWN0dXJlZFRhc2tzQ29uZmlnLFxyXG4gICAgVmlkZW9TdHJ1Y3R1cmVkVGFza3NOZXdGYWNlTW9uaXRvcixTeXN0ZW1Qcm9wZXJ0aWVzLG5ld0Nhck1vbml0b3IsbmV3TWFjTW9uaXRvclxyXG5dIGFzIEFycmF5PElSb3V0ZXJDb25maWc+OyJdfQ==
