/**
 * Created by dell on 2017/3/23.
 */
import Model from "./router.model";
import Config from "./router.config";
import Run from "./router.run";
import {IBackRouterConfig, IRouterConfig, IRouterConfigAndGroup, IRouterGroup} from "./router";
import {CommonGroup} from "./group/common.group";
import {ModuleItem} from "../../../core/server/ModulItemModel";

export default class RouterService{

    constructor(){}
    private static _instance: RouterService;

    public static getInstance(): RouterService{
        return this._instance = this._instance || new RouterService();
    }

    /**
     * 获取模块配置
     * @param parentStateName
     * @returns {Array}
     */
    getModuleItems = function (parentStateName: string){
        // 若parentStateName, 则表示取根路径的数据
        let nodeArr:Array<IRouterConfig> = Model.getInstance().getRouterConfig(),
            i, len, result = [];
        // 遍历数树结点, 找到parent与key匹配的数据, 然后列出返回children
        for (i = 0, len = nodeArr.length; i < len; i++) {
            if (nodeArr[i] && nodeArr[i]['parent'] == parentStateName) {
                result.push(nodeArr[i]);
            }
        }
        return result;
    };

    getModuleItemsWithGroup = function(parentStateName: string){
        let items:Array<IRouterConfig> = this.getModuleItems(parentStateName);
        let result:Array<IRouterConfigAndGroup> = [];
        let temp:{[key:string]:Array<IRouterConfig>} = {};
        let tempArr:Array<string> = []; // 用于指定group顺序
        let other:Array<IRouterConfig> = [];
        // 再将分组数据加入
        // 最后组装成一个树形 [name:'',children:['key',code]]
        for(let i=0,len = items.length; i<len; i++){
            // 路由存在组, 自定义组内有路由存在的组
            if(items[i].group && CommonGroup[items[i].group]){
                if(!temp[items[i].group]){
                    temp[items[i].group] = [];
                    tempArr.push(items[i].group);
                }
                temp[items[i].group].push(items[i]);
            }else{
                // 否则是输入没有分组的
                other.push(items[i]);
            }
        }
        for(let i=0,len=tempArr.length; i<len;i++){
            let config = CommonGroup[tempArr[i]] as IRouterConfigAndGroup;
            config.children = [].concat(temp[tempArr[i]]);
            result.push(config);
        }
        result = result.concat(other as Array<IRouterConfigAndGroup>);
        return result;

    };

    init = function (backAuthorityList: Array<IBackRouterConfig>) {
        Model.getInstance().init(backAuthorityList);
        Config.getInstance().init(Model.getInstance().getRouterConfig());
        Run.getInstance().init(Model.getInstance().getRouterConfig());
    };

};