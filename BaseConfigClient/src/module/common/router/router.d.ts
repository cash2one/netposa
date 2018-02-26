// 对应ui.router views里的配置参数
import {ModuleItem} from "../../../core/server/ModulItemModel";
export interface IRouterConfigViews {
    templateUrl?: string;
    controllerName?: string;
    controllerAs?: string;
}

/**
 * 路由预定义的属性
 */
export interface IRouterConfig {
    key: string; // 路由的key
    url: string; // url路径
    moduleName?: string; // 路由的模块名,　界面展示用, 与ui.router配置无关
    controllerName?: string; // 对应angular.controller("controller名",func)中的【controller名】
    controllerUrl: string; // 对应模块controller的url路径, require加载用
    controllerAs?: string; // controller别名, 也会已用于controller和controller对应的html中
    views?: {[key: string]: IRouterConfigViews}; // 对应ui.router配置中的views 用于配置嵌套路由
    templateUrl?: string; // controller对应的路由模版的url路径, require加载用
    abstract?: boolean; // 对应ui.router配置的 abstract 现在没有使用到
    parent?: string; // 与ui.router配置无关, 用于通过此参数 查找父模块的子路由 或者子路由对应的父模块
    redirectTo?: string; // 在router.run中使用, 通过此参数配置确定是否需要主动跳转到子路由 【比如点击界面父模块, 默认会跳转到父模块下的第一个子模块功能】
    group?: string; // 路由分组配置, 此参数在配置中心(BaseConfig界面中使用到, 配置中心将各个子模块分为三组, 基础配置 资源配置 业务配置), 就是通过此参数来确定group
    icon?: string; // 配置各模块对应的图标class名, 映射到html中自动对应 class="i-icon" 此参数暂时只有配置中心左侧模块列表用到
    hasChildRouteDownSelect?: boolean; // 业务使用, 只是作为一个标志, 如: 如果鼠标移动到此模块名上, 自动通过下拉列表菜单的形式展示其子模块
    isLocal?: boolean; // 是否是本地模块, 即不受后台权限控制, 用于代码分层中设置的路由
}

/**
 * 路由预定义的属性
 */
export interface IRouterConfigTree extends IRouterConfig {
    children: Array<IRouterConfig>
}

export interface IRouterConfigModelViews {
    templateUrl: string;
    controller: string;
    controllerAs: string;
}

/**
 * 路由真正配置的属性
 */
export interface IRouterConfigModel {
    url: string;
    controller: string;
    controllerUrl: string;
    controllerAs: string;
    resolve: {deps: Function};
    views: {[key: string]: IRouterConfigModelViews};
    templateUrl: string;
    abstract: boolean;
}

export interface IBackRouterConfig{
    name: string;
    code: string;
}

/**
 * 界面布局用定义接口
 */
export interface IRouterConfigViewModel extends  IRouterConfig{
    moduleName: string;
}

export interface IRouterGroup{
    key: string;
    name: string;
    isGroup: boolean;
    children?: Array<IRouterConfig>
}

type IRouterConfigAndGroup = IRouterConfig & IRouterGroup;

export interface IRouterService{
    getAllModuleItems(): Array<IRouterConfig>;
    getModuleItems(parentStateName: string): Array<IRouterConfig>;
    getModuleItemsWithGroup(parentStateName: string): Array<IRouterConfigAndGroup>;
    setCurrentModuleName(key: string): void;
    getCurrentModuleName(): string;
    getCurrentBackModuleName(): string;
}

/**
 * ui.router返回的真正的state
 */
export interface UIRouterState extends IRouterConfigModel{
    name?: string;
}