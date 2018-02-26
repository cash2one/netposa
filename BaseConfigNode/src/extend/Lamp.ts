
import { BackResponseBody } from "../core/params/result/ResponseResult";
import * as log4js from "log4js";
import * as util from "util";
import {LampEx} from "../core/entity/ex/LampEx";
import {TreeType,TreeIconSkin} from "../core/enum/TreeType";
import {SearchType} from "../core/server/enum/SearchType";
import {SearchCascadeModel} from "../core/server/SearchCascadeModel";
import { DaoType } from '../dao/enum/DaoType';
import { BeanHelper } from '../common/help/BeanHelper';
import AreaDao from '../dao/AreaDao';

export default class LampExt {
    private static LOGGER = log4js.getLogger("LampExtCache");

    static async getPosaDPJavaCache(keyword?:string){
        let param = {
            searchType: SearchType.LampServer.value,
        } as SearchCascadeModel;

        let res =  await BeanHelper.getDao<AreaDao>(DaoType.AreaDao).findAreaResourceCascadeList(param) as BackResponseBody<Array<LampEx>>;
        let result = [] as Array<LampEx>;
        if (Array.isArray(res.data)) {
            let r = res.data as Array<LampEx>;
            let treeType = TreeType.lamp.value, iconSkin = TreeIconSkin.Lamp;
            r.forEach((item:LampEx)=>{
                item.treeType = treeType;
                item.iconSkin = iconSkin;
                item.ParentID = item.AreaID;
            });
            if(keyword){
                r.forEach((item:LampEx)=>{
                    if (item.Name.indexOf(keyword) > -1) {
                        result.push(item)
                    }
                })
            }else{
                result = r;
            }
            res.data = result;
            LampExt.LOGGER.info(util.format('从JAVA获取Camera缓存 共 %d 条',result.length));
        }
        return res;

    }
}