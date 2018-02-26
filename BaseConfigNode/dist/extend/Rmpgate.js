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
const SearchType_1 = require("../core/server/enum/SearchType");
const TreeType_1 = require("../core/enum/TreeType");
const DaoType_1 = require("../dao/enum/DaoType");
const BeanHelper_1 = require("../common/help/BeanHelper");
class RmpGateExt {
    static getPosaDPJavaCache(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            let param = {
                searchType: SearchType_1.SearchType.RmapGate.value,
            };
            let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.AreaDao).findAreaResourceCascadeList(param);
            let result = [];
            if (Array.isArray(res.data)) {
                let r = res.data;
                let treeType = TreeType_1.TreeType.rmpGate.value, iconSkin = TreeType_1.TreeIconSkin.rmpGate;
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
                RmpGateExt.LOGGER.info(util.format('从JAVA获取RmpGate缓存 共 %d 条', result.length));
            }
            return res;
        });
    }
    static getRmpGateForMap() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield RmpGateExt.getPosaDPJavaCache();
            let result = {};
            if (Array.isArray(res)) {
                res.forEach((item) => {
                    result[item.ID] = item;
                });
            }
            return result;
        });
    }
}
RmpGateExt.LOGGER = log4js.getLogger("RmpGateExtCache");
exports.default = RmpGateExt;
