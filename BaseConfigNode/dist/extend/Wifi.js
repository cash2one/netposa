"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
const util = require("util");
const Where_1 = require("../common/Where");
const ChildWhere_1 = require("../common/ChildWhere");
const RfidCollect_col_1 = require("../model/table-col/RfidCollect_col");
const DataType_1 = require("../common/DataType");
const MatchingType_1 = require("../common/MatchingType");
const JoinType_1 = require("../common/JoinType");
const TreeType_1 = require("../core/enum/TreeType");
const SearchType_1 = require("../core/server/enum/SearchType");
const DaoType_1 = require("../dao/enum/DaoType");
const BeanHelper_1 = require("../common/help/BeanHelper");
class WiFiExt {
    static getPosaDPJavaCache(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            let param = {
                searchType: SearchType_1.SearchType.Wifi.value,
            };
            let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.AreaDao).findAreaResourceCascadeList(param);
            let result = [];
            if (Array.isArray(res.data)) {
                let r = res.data;
                let treeType = TreeType_1.TreeType.wifi.value, iconSkin = TreeType_1.TreeIconSkin.wifi;
                r.forEach((item) => {
                    item.treeType = treeType;
                    item.iconSkin = iconSkin;
                    item.ParentID = item.AreaID;
                });
                if (keyword) {
                    r.forEach((item) => {
                        if (item.Name.indexOf(keyword) > -1) {
                            result.push(item);
                        }
                    });
                }
                else {
                    result = r;
                }
                res.data = result;
                WiFiExt.LOGGER.info(util.format('从JAVA获取WiFi缓存 共 %d 条', result.length));
            }
            return res;
        });
    }
    static getWifiListForMap() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield WiFiExt.getPosaDPJavaCache();
            let wifiMap = {};
            result.data.forEach((item) => {
                wifiMap[item.ID] = item;
            });
            return wifiMap;
        });
    }
    static TypeWhere() {
        let wheres = [];
        let where = new Where_1.default();
        let childWheres = [];
        let childWhere = new ChildWhere_1.default();
        childWhere.FieldName = RfidCollect_col_1.RfidCollectCol.Type;
        childWhere.FieldValue = 'WiFi';
        childWhere.FieldType = DataType_1.default.Text;
        childWhere.MType = MatchingType_1.default.Equal;
        childWhere.JType = JoinType_1.default.And;
        childWheres.push(childWhere);
        where.Childs = childWheres;
        wheres.push(where);
        return wheres;
    }
}
WiFiExt.LOGGER = log4js.getLogger("WiFiExtCache");
exports.default = WiFiExt;
