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
const TreeType_1 = require("../core/enum/TreeType");
const SearchType_1 = require("../core/server/enum/SearchType");
const BusinessLib_col_1 = require("../model/table-col/BusinessLib_col");
const DaoType_1 = require("../dao/enum/DaoType");
const BeanHelper_1 = require("../common/help/BeanHelper");
class BusinessLibExt {
    static getBusinessLib(keyword, areaId) {
        return __awaiter(this, void 0, void 0, function* () {
            let param = {
                searchType: SearchType_1.SearchType.BusinessLib.value,
                id: areaId ? areaId : null,
                orderField: areaId ? BusinessLib_col_1.default.ParentID : null,
                orderType: areaId ? "ASC" : null
            };
            let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.AreaDao).findAreaResourceCascadeList(param);
            let result = [];
            if (Array.isArray(res.data)) {
                let r = res.data;
                let treeType = TreeType_1.TreeType.businessLib.value, iconSkin = TreeType_1.TreeIconSkin.BusinessLib;
                r.forEach((item) => {
                    if (!item.ParentID) {
                        item.ParentID = item.AreaID;
                    }
                    item.iconSkin = iconSkin;
                    item.treeType = treeType;
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
            }
            BusinessLibExt.LOGGER.info(util.format('BusinessLibExt[getBusinessLib] 共 %d 条', result.length));
            return res;
        });
    }
    static getBusinessLibForMap() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield BusinessLibExt.getBusinessLib();
            let result = {};
            if (Array.isArray(res.data)) {
                res.data.forEach((item) => {
                    result[item.ID] = item;
                });
            }
            return result;
        });
    }
}
BusinessLibExt.LOGGER = log4js.getLogger("BusinessLibExt");
exports.default = BusinessLibExt;
