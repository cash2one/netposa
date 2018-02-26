import { IRouterConfig } from '../router';
import { RouteKeyEnum } from '../enum/RouteKeyEnum';
import { GroupEnum, MaintainGroupEnum } from "../enum/RouteGroupEnum";

const ResourceRoute: IRouterConfig = {
    key: RouteKeyEnum.Resource,
    url: '/resource',
    moduleName: 'DP_RESOURCE_01',
    controllerName: 'resourceController',
    controllerUrl: 'module/resources/resources.controller',
    controllerAs: 'resourceCtrl',
    templateUrl: '/module/resources/resources.html',
    redirectTo: RouteKeyEnum.ResourceAll
};

// all
const ResourceRouteAll: IRouterConfig = {
    isLocal: true,
    key: RouteKeyEnum.ResourceAll,
    url: '/ALL',
    moduleName: 'DP_RESOURCE_ALL',
    controllerUrl: 'module/resources/chart/allResource.controller',
    views: {
        "resource": {
            controllerName: 'ResourceChartController',
            controllerAs: 'allResourceCtrl',
            templateUrl: '/module/resources/chart/allResource.html',
        }
    },
    group: GroupEnum.Resource,
    parent: RouteKeyEnum.Resource
};
// car
const ResourceRouteCar: IRouterConfig = {
    isLocal: true,
    key: RouteKeyEnum.ResourceCar,
    url: '/Vehicle',
    moduleName: 'DP_RESOURCE_CAR',
    controllerUrl: 'module/resources/chart/carResource.controller',
    views: {
        "resource": {
            controllerName: 'carResourceController',
            controllerAs: 'carResourceCtrl',
            templateUrl: '/module/resources/chart/carResource.html',
        }
    },
    group: GroupEnum.Resource,
    parent: RouteKeyEnum.Resource
};

// person
const ResourceRoutePerson: IRouterConfig = {
    isLocal: true,
    key: RouteKeyEnum.ResourcePerson,
    url: '/Face',
    moduleName: 'DP_RESOURCE_PERSON',
    controllerUrl: 'module/resources/chart/personResource.controller',
    views: {
        "resource": {
            controllerName: 'personResourceController',
            controllerAs: 'personResourceCtrl',
            templateUrl: '/module/resources/chart/personResource.html',
        }
    },
    group: GroupEnum.Resource,
    parent: RouteKeyEnum.Resource
};

// wifi
const ResourceRouteWifi: IRouterConfig = {
    isLocal: true,
    key: RouteKeyEnum.ResourceWifi,
    url: '/WiFi',
    moduleName: 'DP_RESOURCE_WIFI',
    controllerUrl: 'module/resources/chart/wifiResource.controller',
    views: {
        "resource": {
            controllerName: 'wifiResourceController',
            controllerAs: 'wifiResourceCtrl',
            templateUrl: '/module/resources/chart/wifiResource.html',
        }
    },
    group: GroupEnum.Resource,
    parent: RouteKeyEnum.Resource
};

// electronicFence
const ResourceRouteEle: IRouterConfig = {
    isLocal: true,
    key: RouteKeyEnum.ResourceEle,
    url: '/EFENCE',
    moduleName: 'DP_RESOURCE_ELE',
    controllerUrl: 'module/resources/chart/EFResource.controller',
    views: {
        "resource": {
            controllerName: 'EFResourceController',
            controllerAs: 'EFResourceCtrl',
            templateUrl: '/module/resources/chart/EFResource.html',
        }
    },
    group: GroupEnum.Resource,
    parent: RouteKeyEnum.Resource
};


export const ResourceMap = [ResourceRoute, ResourceRouteAll, ResourceRouteCar, ResourceRoutePerson, ResourceRouteWifi, ResourceRouteEle] as Array<IRouterConfig>;