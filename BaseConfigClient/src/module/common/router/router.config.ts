import {IRouterConfigModel, IRouterConfig, IRouterConfigModelViews, IRouterConfigViews} from "./router";
/**
 * 路由配置文件
 * @author simba
 * @date   2016-11-23
 *
 * 主要是项目的路由配置，文件依赖require和angular-route
 * 主体有 baseUrl 和 Router 两块
 * baseUrl: 主要是配置各模块的基础路径
 * Router: 就是配置各个模块下详细功能页面的路由
 */
declare let $: any,angular:any;
import {app} from '../app/main.app';
import 'jquery';

class RouterConfigController {
    static authorList: Array<IRouterConfig> = [];
    static $inject = ['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$requireProvider'];

    constructor($stateProvider: any, $urlRouterProvider: any, $controllerProvider: any, $requireProvider: any) {

       



        let requireJS = $requireProvider.requireJS;

        let i, len, mapResult:{[key: string]: IRouterConfigModel} = {}, defaultUrl;
        for (i = 0, len = RouterConfigController.authorList.length; i < len; i++) {
            mapResult[RouterConfigController.authorList[i]['key']] = convertRouteConfig2StateConfig(RouterConfigController.authorList[i]);
            if (!defaultUrl) {
                defaultUrl = RouterConfigController.authorList[i]['url'];
            }
        }

        function convertRouteConfig2StateConfig(routerConfig: IRouterConfig): IRouterConfigModel {
            let
                result = {} as IRouterConfigModel,
                url,
                controllerName,
                controllerUrl,
                controllerAs,
                resolve,
                templateUrl,
                _abstract,
                views;

            url = routerConfig['url'];
            controllerName = routerConfig['controllerName'];
            controllerUrl = routerConfig['controllerUrl'];
            controllerAs = routerConfig['controllerAs'];
            views = routerConfig['views'];
            templateUrl = routerConfig['templateUrl'];
            _abstract = routerConfig['abstract'];

            result["url"] = url;
            if (controllerUrl) {
                result['controller'] = controllerName;
                if (controllerAs) {
                    result['controllerAs'] = controllerAs;
                }
                result['resolve'] = {} as {deps: Function};
                result['resolve']['deps'] = requireJS([controllerUrl])
            }
            if (views) {
                result['views'] = convertViews(routerConfig['views']);
            }
            if (templateUrl) {
                result['templateUrl'] = templateUrl + '?v=' + (new Date()).getTime();
            }

            if (_abstract) {
                result['abstract'] = _abstract;
            }

            return result;
        }

        function convertViews(views: {[key: string]: IRouterConfigViews}):{[key: string]: IRouterConfigModelViews}  {
            let k, v:IRouterConfigViews, dateTime = (new Date()).getTime(), result = {} as {[key: string]: IRouterConfigModelViews};
            for (k in views) {
                v = views[k];
                result[k] = {
                    'templateUrl': v['templateUrl'] + '?v=' + dateTime,
                    'controller': v['controllerName']
                } as IRouterConfigModelViews;
                if (v['controllerAs']) {
                    result[k]['controllerAs'] = v['controllerAs'];
                }
            }
            return result;
        }

        let k;
        // 将后台可访问的模块配置到路由中
        for (k in mapResult) {
            // 在这里循环配置路由访问路径
            $stateProvider.state(k, mapResult[k]);
        }
        // 这里应该默认一个

        $urlRouterProvider.otherwise(defaultUrl || "/");
    }

}

// 这里将初始化路由函数封装成一个方法,
// 目的是为了当后台所有基本数据返回以后再进行路由初始化的配置
export default class RouterConfig {
    constructor() {
    }

    private static _instance: RouterConfig;

    public static getInstance(): RouterConfig {
        return this._instance = this._instance || new RouterConfig();
    }

    private _$controllerProvider: any = null;

    private _init(authorList: Array<IRouterConfig>) {

        if (!$.isArray(authorList)) {
            return;
        }
        RouterConfigController.authorList = authorList;
        //主内容路由配置
        app.config(RouterConfigController);

    };

    init(authorList: Array<IRouterConfig>) {
        this._init(authorList);
    };
}