import {IRouterConfig} from "./router";
/**
 * Created by dell on 2017/3/23.
 */

declare let angular: any;

import {app} from "../app/main.app";
import 'angular';

class RouterRunConfig{
    static redirectToMap: {[key:string]:string};
    static $inject = ['$state', '$rootScope'];
    constructor($state:any, $rootScope:any){

        if(!RouterRunConfig.redirectToMap){
            console.error("redirectToMap初始化失败!");
        }
        // 转换出需要进行redirectTo的对象, 并匹配redirectTo的值

        // toState: 去哪个state
        // fromState:从哪个state来
        // 这里需要监听routerConfig中包含redirectTo属性的对象, 当跳转到含有redirectTo属性的对象时, 进行再次跳转
        $rootScope.$on("$stateChangeStart", function (evt:any, toState:any, toParams:any, fromState:any, fromParams:any) {
            if (RouterRunConfig.redirectToMap[toState['name']]) {
                // console.log($state);
                // console.log(toState);
                // console.log(RouterRunConfig.redirectToMap[toState['name']]);
                $state.go(RouterRunConfig.redirectToMap[toState['name']]);
                evt.preventDefault();
            }
        });
    }
}

export default class RouterRun{
    constructor() {
    }

    private static _instance: RouterRun;

    public static getInstance(): RouterRun {
        return this._instance = this._instance || new RouterRun();
    }

    _init = function(authorList: Array<IRouterConfig>){
        // 转换出需要进行redirectTo的对象, 并匹配redirectTo的值

        let parentMap: {[key:string]: Array<string>} = {}, redirectToMap: {[key:string]:string} = {}, i, len;
        let vm = this as any;

        for (i = 0, len = authorList.length; i < len; i++) {
            if (authorList[i]['parent']) {
                if (!parentMap[authorList[i]['parent']]) {
                    parentMap[authorList[i]['parent']] = [];
                }
                parentMap[authorList[i]['parent']].push(authorList[i]['key']);
            }
        }

        for (i = 0, len = authorList.length; i < len; i++) {
            if (authorList[i]['redirectTo']) {
                // 从中找子节点的第一个
                if (parentMap[authorList[i]['key']]) {
                    redirectToMap[authorList[i]['key']] = parentMap[authorList[i]['key']][0];
                }
            }
        }

        RouterRunConfig.redirectToMap = redirectToMap;
        app.run(RouterRunConfig).run(['$state', '$stateParams', angular.noop]);

    };

    init = function (authorList: Array<IRouterConfig>) {
        this._init(authorList);
    };

}
