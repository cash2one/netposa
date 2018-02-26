import {TableMap} from "../model/Table-Map";
import {BackResponseBody} from "../core/params/result/ResponseResult";
import * as log4js from "log4js";
import * as util from "util";
import {Wifi} from '../core/entity/Wifi';
import {WifiEx} from '../core/entity/ex/WifiEx';
import Where from '../common/Where';
import ChildWhere from '../common/ChildWhere';
import {RfidCollectCol} from "../model/table-col/RfidCollect_col"
import DataType from "../common/DataType";
import MatchingType from "../common/MatchingType";
import JoinType from "../common/JoinType";
import {TreeIconSkin, TreeType} from "../core/enum/TreeType";
import {SearchType} from "../core/server/enum/SearchType";
import {SearchCascadeModel} from "../core/server/SearchCascadeModel";
import {DaoType} from '../dao/enum/DaoType';
import RfidDao from '../dao/RfidDao';
import {BeanHelper} from '../common/help/BeanHelper';
import AreaDao from '../dao/AreaDao';

export default class WiFiExt {
    private static LOGGER = log4js.getLogger("WiFiExtCache");

    static async getPosaDPJavaCache(keyword?: string) {
        let param = {
            searchType: SearchType.Wifi.value,
        } as SearchCascadeModel;

        let res = await BeanHelper.getDao<AreaDao>(DaoType.AreaDao).findAreaResourceCascadeList(param) as BackResponseBody<Array<WifiEx>>;
        let result = [] as Array<WifiEx>;
        if (Array.isArray(res.data)) {
            let r = res.data as Array<WifiEx>;
            let treeType = TreeType.wifi.value, iconSkin = TreeIconSkin.wifi;
            r.forEach((item: WifiEx) => {
                item.treeType = treeType;
                item.iconSkin = iconSkin;
                item.ParentID = item.AreaID
            });
            if (keyword) {
                r.forEach((item: WifiEx) => {
                    if (item.Name.indexOf(keyword) > -1) {
                        result.push(item)
                    }
                })
            } else {
                result = r;
            }
            res.data = result;
            WiFiExt.LOGGER.info(util.format('从JAVA获取WiFi缓存 共 %d 条', result.length));
        }
        return res;
    }

    static async getWifiListForMap() {
        let result = await WiFiExt.getPosaDPJavaCache();
        let wifiMap = {} as { [key: string]: WifiEx };
        result.data.forEach((item: WifiEx) => {
            wifiMap[item.ID] = item;
        });
        return wifiMap
    }

    static TypeWhere(): Array<Where> {
        let wheres = [] as Array<Where>;
        let where = new Where();
        let childWheres = [] as Array<ChildWhere>;
        let childWhere = new ChildWhere();
        childWhere.FieldName = RfidCollectCol.Type;
        childWhere.FieldValue = 'WiFi';
        childWhere.FieldType = DataType.Text;
        childWhere.MType = MatchingType.Equal;
        childWhere.JType = JoinType.And;
        childWheres.push(childWhere);
        where.Childs = childWheres;
        wheres.push(where);
        return wheres
    }
}