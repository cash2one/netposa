import {BackResponseBody} from "../core/params/result/ResponseResult";
import * as log4js from "log4js";
import * as util from "util";
import {TreeType, TreeIconSkin} from "../core/enum/TreeType";
import {BusinessLib} from "../core/entity/BusinessLib";
import {SearchType} from "../core/server/enum/SearchType";
import {SearchCascadeModel} from "../core/server/SearchCascadeModel";
import {BusinessLibEx} from "../core/entity/ex/BusinessLibEx";
import BusinessLibCol from "../model/table-col/BusinessLib_col";
import AreaDao from '../dao/AreaDao';
import { DaoType } from '../dao/enum/DaoType';
import { BeanHelper } from '../common/help/BeanHelper';


export default class BusinessLibExt {
    private static LOGGER = log4js.getLogger("BusinessLibExt");

    static async getBusinessLib(keyword?: string | null, areaId?: string|null): Promise<BackResponseBody<Array<BusinessLibEx>>> {
        let param = {
            searchType: SearchType.BusinessLib.value,
            id: areaId ? areaId : null,
            orderField: areaId ? BusinessLibCol.ParentID : null,
            orderType: areaId ? "ASC" : null
        } as SearchCascadeModel;
        let res = await BeanHelper.getDao<AreaDao>(DaoType.AreaDao).findAreaResourceCascadeList(param) as BackResponseBody<Array<BusinessLibEx>>;
        let result = [] as Array<BusinessLibEx>;
        if (Array.isArray(res.data)) {
            let r = res.data as Array<BusinessLibEx>;
            let treeType = TreeType.businessLib.value, iconSkin = TreeIconSkin.BusinessLib;
            r.forEach((item: BusinessLibEx) => {
                if (!item.ParentID) {
                    item.ParentID = item.AreaID;
                }
                item.iconSkin = iconSkin;
                item.treeType = treeType;
            });
            if (keyword) {
                r.forEach((item: BusinessLibEx) => {
                    if (item.Name.indexOf(keyword) > -1) {
                        result.push(item)
                    }
                })
            } else {
                result = r;
            }
            res.data = result;
        }
        BusinessLibExt.LOGGER.info(util.format('BusinessLibExt[getBusinessLib] 共 %d 条', result.length));
        return res;
    }


    static async getBusinessLibForMap(): Promise<{ [key: string]: BusinessLib }> {
        let res = await BusinessLibExt.getBusinessLib() as BackResponseBody<Array<BusinessLibEx>>;
        let result = {} as { [key: string]: BusinessLib };
        if (Array.isArray(res.data)) {
            res.data.forEach((item: BusinessLib) => {
                result[item.ID] = item;
            })
        }
        return result;

    }
}