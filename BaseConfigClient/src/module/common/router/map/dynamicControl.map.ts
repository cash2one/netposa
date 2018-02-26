/**
 * Created by dell on 2017/5/31.
 */
import {IRouterConfig} from "../router";
import {RouteKeyEnum} from "../enum/RouteKeyEnum";
import {GroupEnum} from "../enum/RouteGroupEnum";
import Config from "../../../../config";

const DynamicControl:IRouterConfig = {
    key: RouteKeyEnum.DynamicControl,
    url: '/dynamiccontrol',
    // moduleName: '动态布控',
    moduleName: '视图立方',
    controllerName: 'dynamicControlController',
    controllerUrl: 'module/dynamicControl/main/main.controller',
    controllerAs: 'dynamicControlCtrl',
    templateUrl: '/module/dynamicControl/main/main.html',
    isLocal:Config.IS_DEV
};

export const DynamicControlMap = [
    DynamicControl
] as Array<IRouterConfig>;