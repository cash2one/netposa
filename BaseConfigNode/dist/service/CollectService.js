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
const ErrorCode_1 = require("../common/res/ErrorCode");
const ResponseResult_1 = require("../core/params/result/ResponseResult");
const Where_1 = require("../common/Where");
const ChildWhere_1 = require("../common/ChildWhere");
const MatchingType_1 = require("../common/MatchingType");
const log4js = require("log4js");
const JoinType_1 = require("../common/JoinType");
const CommonUtils_1 = require("../utils/CommonUtils");
const DataType_1 = require("../common/where/DataType");
const CollectDataType_1 = require("../core/server/enum/CollectDataType");
const Collect_col_1 = require("../model/table-col/Collect_col");
const DaoType_1 = require("../dao/enum/DaoType");
const BeanHelper_1 = require("../common/help/BeanHelper");
const WhereLib_1 = require("../model/WhereLib");
const FildNameLib_1 = require("../model/FildNameLib");
class CollectService {
    constructor() {
    }
    findListByPage(params) {
        return Promise.resolve(null)
            .then(() => {
            if (!params.userID) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            return null;
        })
            .then(() => {
            let whereList = [];
            whereList.push(WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.UserID, params.userID));
            if (params.objectType) {
                whereList.push(WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.ObjectType, params.objectType));
            }
            if (params.startTime && params.endTime) {
                whereList.push(WhereLib_1.StartAndEndForTimeWhere(FildNameLib_1.FildNameLib.CollectTime, params.startTime, FildNameLib_1.FildNameLib.CollectTime, params.endTime));
            }
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.CollectDao).findListByWhere(whereList);
        })
            .then((res) => {
            let pageResult = res.data;
            if (pageResult) {
                pageResult.forEach((model) => {
                    model.JsonExtData = CommonUtils_1.default.parseJSONCatchError(model.Ext);
                });
            }
            return pageResult;
        });
    }
    findListAll(params) {
        return Promise.resolve(null)
            .then(() => {
            if (!params.userID) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            return null;
        })
            .then(() => {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.CollectDao).findAll();
        })
            .then((res) => {
            let pageResult = res.data;
            if (pageResult) {
                pageResult.forEach((model) => {
                    model.JsonExtData = CommonUtils_1.default.parseJSONCatchError(model.Ext);
                });
            }
            return pageResult;
        });
    }
    findCollectStatus(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.ids || !Array.isArray(params.ids) || params.ids.length === 0 || !params.userId) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = [];
            let list = (yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.CollectDao).findListByWhere([
                WhereLib_1.InAndWhere(FildNameLib_1.FildNameLib.ObjectID, params.ids),
                WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.UserID, params.userId),
                WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.DataType, 'Collection'),
            ])).data;
            if (!list || !Array.isArray(list) || list.length === 0) {
                list = [];
            }
            params.ids.forEach((id) => {
                let isHas = false;
                for (let i = 0; i < list.length; i++) {
                    let item = list[i];
                    if (id === item.ObjectID) {
                        isHas = true;
                        let j = {};
                        j[id] = true;
                        result.data.push(isHas);
                        list.splice(i, 1);
                        break;
                    }
                }
                if (!isHas) {
                    result.data.push(false);
                }
            });
            return result;
        });
    }
    add(params) {
        return Promise.resolve(null)
            .then(validateParams)
            .then(this.findCollect(params))
            .then((res) => {
            if (res && res.data && res.data.length > 0) {
                return Promise.reject(ErrorCode_1.default.ERROR_COLLECT_HAS_COLLECT);
            }
            return null;
        })
            .then(() => {
            let data = {};
            data.CollectTime = CommonUtils_1.default.formatDate(new Date());
            data.ObjectType = params.objectType;
            data.ObjectID = params.objectID;
            data.Ext = params.json;
            data.DataType = CollectDataType_1.CollectDataType.Collection.value;
            data.UserID = params.userId;
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.CollectDao).save(data);
        });
        function validateParams() {
            if (params.json == null || params.objectID == null || params.objectType == null || params.userId == null) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            return null;
        }
    }
    delete(ids) {
        return Promise.resolve(null)
            .then(validateParams)
            .then(() => {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.CollectDao).delete(ids)
                .then(() => {
                return true;
            });
        });
        function validateParams() {
            if (!ids || ids.length == 0) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            return null;
        }
    }
    deleteByObjectId(ids) {
        return Promise.resolve(null)
            .then(validateParams)
            .then(() => {
            let whereChild = new ChildWhere_1.default();
            whereChild.FieldName = Collect_col_1.default.ObjectID;
            whereChild.FieldType = DataType_1.default.Text;
            whereChild.FieldValue = ids;
            whereChild.MType = MatchingType_1.default.Equal;
            whereChild.JType = JoinType_1.default.And;
            let where = new Where_1.default();
            where.Childs.push(whereChild);
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.CollectDao).deleteByWhere([where]).then(() => {
                return true;
            });
        });
        function validateParams() {
            if (!ids || ids.length == 0) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            return null;
        }
    }
    findCollect(model) {
        return () => {
            return Promise.resolve(null)
                .then(() => {
                let where = new Where_1.default();
                let childWhere = new ChildWhere_1.default();
                childWhere.FieldName = Collect_col_1.default.UserID;
                childWhere.FieldType = DataType_1.default.Text;
                childWhere.FieldValue = model.userId;
                childWhere.MType = MatchingType_1.default.Equal;
                childWhere.JType = JoinType_1.default.And;
                where.Childs.push(childWhere);
                childWhere = new ChildWhere_1.default();
                childWhere.FieldName = Collect_col_1.default.ObjectID;
                childWhere.FieldType = DataType_1.default.Text;
                childWhere.FieldValue = model.objectID;
                childWhere.MType = MatchingType_1.default.Equal;
                childWhere.JType = JoinType_1.default.And;
                where.Childs.push(childWhere);
                childWhere = new ChildWhere_1.default();
                childWhere.FieldName = Collect_col_1.default.ObjectType;
                childWhere.FieldType = DataType_1.default.Text;
                childWhere.FieldValue = model.objectType;
                childWhere.MType = MatchingType_1.default.Equal;
                childWhere.JType = JoinType_1.default.And;
                where.Childs.push(childWhere);
                childWhere = new ChildWhere_1.default();
                childWhere.FieldName = Collect_col_1.default.DataType;
                childWhere.FieldType = DataType_1.default.Text;
                childWhere.FieldValue = model.dataType;
                childWhere.MType = MatchingType_1.default.Equal;
                childWhere.JType = JoinType_1.default.And;
                where.Childs.push(childWhere);
                return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.CollectDao).findListByWhere([where]);
            });
        };
    }
}
CollectService.LOGGER = log4js.getLogger("CollectService");
exports.CollectService = CollectService;
