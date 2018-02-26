

import { BackResponseBody } from "../core/params/result/ResponseResult";
import * as log4js from "log4js";
import * as util from "util";

import { RmpGateEx } from '../core/entity/ex/RmpGateEx';
import {SearchType} from "../core/server/enum/SearchType";
import {SearchCascadeModel} from "../core/server/SearchCascadeModel";
import {TreeIconSkin, TreeType} from "../core/enum/TreeType";
import { DaoType } from '../dao/enum/DaoType';
import { BeanHelper } from '../common/help/BeanHelper';

import AreaDao from '../dao/AreaDao';
export default class RmpGateExt {
    private static LOGGER = log4js.getLogger("RmpGateExtCache");

    static async getPosaDPJavaCache(keyword?:string):Promise<BackResponseBody<Array<RmpGateEx>>>{
        let param = {
            searchType: SearchType.RmapGate.value,
        } as SearchCascadeModel;

        let res =  await BeanHelper.getDao<AreaDao>(DaoType.AreaDao).findAreaResourceCascadeList(param) as BackResponseBody<Array<RmpGateEx>>;
        let result = [] as Array<RmpGateEx>;
        if (Array.isArray(res.data)) {
            let r = res.data as Array<RmpGateEx>;
            let treeType = TreeType.rmpGate.value, iconSkin = TreeIconSkin.rmpGate;
            r.forEach((item:RmpGateEx)=>{
                item.treeType = treeType;
                item.iconSkin = iconSkin;
                item.ParentID = item.AreaID
            });
            if(keyword){
                r.forEach((item:RmpGateEx)=>{
                    if (item.Name.indexOf(keyword) > -1) {
                        result.push(item)
                    }
                })
            }else{
                result = r;
            }
            res.data = result;
            RmpGateExt.LOGGER.info(util.format('从JAVA获取RmpGate缓存 共 %d 条',result.length));
        }
        return res;
    }
    static async getRmpGateForMap(){
        let res = await RmpGateExt.getPosaDPJavaCache();
        let result = {} as { [key: string]: RmpGateEx };
        if (Array.isArray(res.data)) {
            res.data.forEach((item: RmpGateEx) => {
                result[item.ID] = item;
            })
        }
        return result;
    }
}