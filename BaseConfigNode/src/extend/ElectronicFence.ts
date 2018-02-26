
import { BackResponseBody } from "../core/params/result/ResponseResult";
import * as log4js from "log4js";
import * as util from "util";
import { ElectronicFenceEx } from '../core/entity/ex/ElectronicFenceEx';
import {TreeType,TreeIconSkin} from "../core/enum/TreeType";
import {SearchType} from "../core/server/enum/SearchType";
import {SearchCascadeModel} from "../core/server/SearchCascadeModel";
import { DaoType } from '../dao/enum/DaoType';
import { BeanHelper } from '../common/help/BeanHelper';
import AreaDao from '../dao/AreaDao';
export default class ElectronicFenceExt {
    private static LOGGER = log4js.getLogger("ElectronicFenceExtCache");

    static async getPosaDPJavaCache(keyword?:string){
        let param = {
            searchType: SearchType.ElectronicFence.value,
        } as SearchCascadeModel;

        let res =  await BeanHelper.getDao<AreaDao>(DaoType.AreaDao).findAreaResourceCascadeList(param) as BackResponseBody<Array<ElectronicFenceEx>>;
        let result = [] as Array<ElectronicFenceEx>;
        if (Array.isArray(res.data)) {
            let r = res.data as Array<ElectronicFenceEx>;
            let treeType = TreeType.ElectronicFence.value, iconSkin = TreeIconSkin.ElectronicFence;
            r.forEach((item:ElectronicFenceEx)=>{
                item.treeType = treeType;
                item.iconSkin = iconSkin;
                item.ParentID = item.AreaID
            });
            if(keyword){
                r.forEach((item:ElectronicFenceEx)=>{
                    if (item.Name.indexOf(keyword) > -1) {
                        result.push(item)
                    }
                })
            }else{
                result = r;
            }
            res.data = result;
            ElectronicFenceExt.LOGGER.info(util.format('从JAVA获取ElectronicFence缓存 共 %d 条',result.length));
        }
        return res;
    }
    static async getEfenceListForMap() {
        let result = await ElectronicFenceExt.getPosaDPJavaCache();
        let wifiMap = {} as { [key: string]: ElectronicFenceEx };
        result.data.forEach((item: ElectronicFenceEx) => {
            wifiMap[item.ID] = item;
        });
        return wifiMap
    }
}