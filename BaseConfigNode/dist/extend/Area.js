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
const BeanHelper_1 = require("../common/help/BeanHelper");
const DaoType_1 = require("../dao/enum/DaoType");
const ErrorCode_1 = require("../common/res/ErrorCode");
class AreaExt {
    static getPosaDPJavaCache(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            let param = {
                searchType: SearchType_1.SearchType.Area.value,
            };
            let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.AreaDao).findAreaResourceCascadeList(param);
            let result = [];
            if (Array.isArray(res.data)) {
                let r = res.data;
                let iconSkin = TreeType_1.TreeIconSkin.Area;
                let treeType = TreeType_1.TreeType.area.value;
                r.forEach((item) => {
                    item.treeType = treeType;
                    item.iconSkin = iconSkin;
                });
                if (keyword) {
                    r.forEach((item) => {
                        if (item.Name.indexOf(keyword) > -1 || item.Code.indexOf(keyword) > -1) {
                            result.push(item);
                        }
                    });
                }
                else {
                    result = r;
                }
                res.data = result;
                AreaExt.LOGGER.info(util.format('从JAVA获取Area存 共 %d 条', result.length));
            }
            return res;
        });
    }
    static getAnyListByAreaID(list, AreaID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(list)) {
                AreaExt.LOGGER.error(util.format('list type error %j', list));
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let result = [];
            let areaList = yield AreaExt.findAreaForParentArea(AreaID);
            let areaIds = areaList.map((area) => area.ID);
            list.forEach((item) => {
                let index = areaIds.indexOf(item.AreaID);
                if (index !== -1) {
                    if (typeof item.JsonUserData !== 'object') {
                        item.JsonUserData = {};
                    }
                    item.JsonUserData.Area = areaList[index];
                    result.push(item);
                }
            });
            return result;
        });
    }
    static findAreaForParentAreaIDs(ID) {
        return __awaiter(this, void 0, void 0, function* () {
            let allAreaList = yield AreaExt.findAreaForParentArea(ID);
            return allAreaList.map((item) => item.ID);
        });
    }
    static findAreaForParentArea(ID) {
        return __awaiter(this, void 0, void 0, function* () {
            let allAreaList = yield AreaExt.getPosaDPJavaCache();
            return AreaExt.compileAreaLevel(allAreaList.data, ID, []);
        });
    }
    static compileAreaLevel(arr, id, newArr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].ID === id) {
                newArr.push(arr[i]);
            }
            if (arr[i].ParentID && arr[i].ParentID === id) {
                AreaExt.compileAreaLevel(arr, arr[i].ID, newArr);
            }
        }
        return newArr;
    }
}
AreaExt.LOGGER = log4js.getLogger("AreaExt");
exports.default = AreaExt;
