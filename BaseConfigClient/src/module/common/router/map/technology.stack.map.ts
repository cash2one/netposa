/**
 * Created by dell on 2017/4/24.
 */
import {IRouterConfig} from "../router";
import {RouteKeyEnum} from "../enum/RouteKeyEnum";
import Config from "../../../../config";


const TechnologyStack: IRouterConfig = {
    key: RouteKeyEnum.TechnologyStack,
    url: '/technologystack',
    moduleName: '技术栈',
    controllerName: 'technologyStackController',
    controllerUrl: 'module/technology-stack/controller',
    controllerAs: 'technologyStackCtrl',
    templateUrl: '/module/technology-stack/technology-stack.html',
    isLocal:Config.IS_DEV
};

const TechnologyStackLayout: IRouterConfig = {
    key: RouteKeyEnum.TechnologyStackLayout,
    url: '/layout',
    moduleName: "布局指令",
    controllerUrl: 'module/technology-stack/layout/layout.controller',
    views: {
        "technologystack": {
            controllerName: "layoutController",
            controllerAs: 'layoutCtrl',
            templateUrl: '/module/technology-stack/layout/layout.html'
        }
    },
    parent: RouteKeyEnum.TechnologyStack,
    isLocal:Config.IS_DEV
};

const TechnologyStackMapController: IRouterConfig = {
    key: RouteKeyEnum.TechnologyStackMap,
    url: "/map",
    moduleName: "地图",
    controllerUrl: "module/technology-stack/map/technology.stack.map.controller",
    views: {
        "technologystack": {
            controllerName: "technologyStackMapController",
            controllerAs: 'technologyStackMapCtrl',
            templateUrl: '/module/technology-stack/map/technology.stack.map.html'
        }
    },
    parent: RouteKeyEnum.TechnologyStack,
    isLocal:Config.IS_DEV
};

const TechnologyStackOcxController: IRouterConfig = {
    key: RouteKeyEnum.TechnologyStackOcx,
    url: "/ocx",
    moduleName: "ocx演示",
    controllerUrl: "module/technology-stack/ocx/ocx.controller",
    views: {
        "technologystack": {
            controllerName: "technologyStackOcxController",
            controllerAs: 'technologyStackOcxCtrl',
            templateUrl: '/module/technology-stack/ocx/ocx.html'
        }
    },
    parent: RouteKeyEnum.TechnologyStack,
    isLocal:Config.IS_DEV
};

const TechnologyStackTreeController: IRouterConfig = {
    key: RouteKeyEnum.TechnologyStackTree,
    url: "/tree",
    moduleName: "tree演示",
    controllerUrl: "module/technology-stack/tree/tree.controller",
    views: {
        "technologystack": {
            controllerName: "technologyStackTreeController",
            controllerAs: 'technologyStackTreeCtrl',
            templateUrl: '/module/technology-stack/tree/tree.html'
        }
    },
    parent: RouteKeyEnum.TechnologyStack,
    isLocal:Config.IS_DEV
};

const TechnologyStackSocketController: IRouterConfig = {
    key: RouteKeyEnum.TechnologyStackSocket,
    url: "/socket",
    moduleName: "socket演示",
    controllerUrl: "module/technology-stack/socket/socket.controller",
    views: {
        "technologystack": {
            controllerName: "technologyStackSocketController",
            controllerAs: 'technologyStackSocketCtrl',
            templateUrl: '/module/technology-stack/socket/socket.html'
        }
    },
    parent: RouteKeyEnum.TechnologyStack,
    isLocal:Config.IS_DEV
};

//zyh  下拉框测试
const TechnologyStackSelectController: IRouterConfig = {
    key: RouteKeyEnum.TechnologyStackSelect,
    url: "/select",
    moduleName: "select演示",
    controllerUrl: "module/technology-stack/util-select/utilSelect.controller",
    views: {
        "technologystack": {
            controllerName: "technologyStackSelectController",
            controllerAs: 'technologyStackSelectCtrl',
            templateUrl: '/module/technology-stack/util-select/utilSelect.html'
        }
    },
    parent: RouteKeyEnum.TechnologyStack,
    isLocal:Config.IS_DEV
};

//zyh  下拉框测试
const TechnologyStackTreeSelectModalDemoController: IRouterConfig = {
    key: RouteKeyEnum.TechnologyStackTreeSelectModalDemo,
    url: "/treeSelectModalDemo",
    moduleName: "treeSelectModalDemo",
    controllerUrl: "module/technology-stack/tree-selectModal/treeSelectModal.controller",
    views: {
        "technologystack": {
            controllerName: "tsTreeSelectModalController",
            controllerAs: 'tsTreeSelectModalCtrl',
            templateUrl: '/module/technology-stack/tree-selectModal/tree-selectModal.html'
        }
    },
    parent: RouteKeyEnum.TechnologyStack,
    isLocal:Config.IS_DEV
};

export const TechnologyStackMap = [
    TechnologyStack, TechnologyStackLayout,TechnologyStackMapController,TechnologyStackOcxController,TechnologyStackTreeController,TechnologyStackSocketController
,TechnologyStackSelectController,TechnologyStackTreeSelectModalDemoController] as Array<IRouterConfig>;