import {IRouterConfig, IRouterConfigTree, IBackRouterConfig} from "./router";
/**
 * Created by dell on 2017/3/23.
 */
declare let $:any;
declare let angular:any;
import {DefaultRouteConfig} from "./map/router.map";
import 'jquery';
import PortraitTool from "../portrait-tool";

// 存放所有与路由相关的配置信息
// 初始化只调用一次, 与后台传来的数据进行融合
// 注意： redirectTo属性只是暂时的, 实际值会在代码逻辑中进行动态调整\
// parent(找父节点)/isParent(是否是父结点)/index(排序)/level(等级)属性是用于业务上而设置的

export default class RouterModel {

    constructor() {
    }

    private static _instance: RouterModel;

    public static getInstance(): RouterModel {
        return this._instance = this._instance || new RouterModel();
    }

    private routerConfig: Array<IRouterConfig> = null;

    private initRouterConfig = function (list: Array<IBackRouterConfig>) {
        if (!$.isArray(list)) {
            console.error("_transform Error: 传入参数不是数组!");
            return;
        }
        this.routerConfig = [] as Array<IRouterConfig>;

        let author: IBackRouterConfig, i, len, mapResult:{[key: string]: IBackRouterConfig} = {}/*, authorStateMap = stateRouterMap*/;
        let originConfig: Array<IRouterConfig> = DefaultRouteConfig;
        for (i = 0, len = list.length; i < len; i++) {
            author = list[i];
            if (author && author.code) {
                mapResult[author.code] = author;

            } else {
                if(author){
                    console.error(author.name + "模块没有访问权限!");
                }else{
                    console.error("未知模块没有访问权限!");
                }
            }
        }
        // 对路由进行初始化
        for (i = 0, len = originConfig.length; i < len; i++) {
            if (mapResult[originConfig[i]['key']]) {
                // 只保存有访问权限的模块
                this.routerConfig.push(this.convert2RouterConfig(originConfig[i], mapResult[originConfig[i]['key']]));
            }else{
                if(originConfig[i]['isLocal']){
                    this.routerConfig.push(this.convert2RouterConfig(originConfig[i], originConfig[i].key));
                }
            }

        }
    };

    private convert2RouterConfig = function (origin:{[key:string]:any & IRouterConfig}, news: IBackRouterConfig) {
        // 将news的东西融合到左边
        if(news){
            origin['moduleName'] = news['name'] || origin['moduleName'];
        }
        return origin;
    };

    getRouterConfig = function (){
        // 由于配置会被很多模块用到，为了防止因引用引起的数据被修改，故每次取得的时候都进行深拷贝
        return angular.copy(this.routerConfig);
    };

    init = function (list:Array<IBackRouterConfig>) {
        this.initRouterConfig(list);
    };


}