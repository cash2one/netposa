"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorCode_1 = require("../common/res/ErrorCode");
const Where_1 = require("../common/Where");
const ChildWhere_1 = require("../common/ChildWhere");
const Iod_col_1 = require("../model/table-col/Iod_col");
const Area_col_1 = require("../model/table-col/Area_col");
const DataType_1 = require("../common/DataType");
const OrderBy_1 = require("../common/OrderBy");
const MatchingType_1 = require("../common/MatchingType");
const JoinType_1 = require("../common/JoinType");
const TreeType_1 = require("../core/enum/TreeType");
const BeanHelper_1 = require("../common/help/BeanHelper");
const DaoType_1 = require("../dao/enum/DaoType");
const BDaoImpl_1 = require("../dao/core/BDaoImpl");
class IodService {
    findAreaListTree(params) {
        return Promise.resolve(null).then(preFindListByWhere);
        function preFindListByWhere() {
            let whereList = [], where, childWheres = [], childWhere, orderByArr = [], orderBy;
            where = new Where_1.default();
            if (params && params.keyword) {
                childWhere = new ChildWhere_1.default();
                childWhere.FieldName = Area_col_1.default.Name;
                childWhere.FieldType = DataType_1.default.Text;
                childWhere.FieldValue = params.keyword;
                childWhere.MType = MatchingType_1.default.Like;
                childWhere.JType = JoinType_1.default.Or;
                childWheres.push(childWhere);
                childWhere = new ChildWhere_1.default();
                childWhere.FieldName = Area_col_1.default.Code;
                childWhere.FieldType = DataType_1.default.Text;
                childWhere.FieldValue = params.keyword;
                childWhere.MType = MatchingType_1.default.Like;
                childWhere.JType = JoinType_1.default.Or;
                childWheres.push(childWhere);
            }
            where.Childs = childWheres;
            whereList.push(where);
            orderBy = new OrderBy_1.default();
            orderBy.FieldName = Area_col_1.default.PYCode;
            orderBy.IsAsc = true;
            orderByArr.push(orderBy);
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.AreaDao).findListByWhereWithOrderBy(whereList, orderByArr, BDaoImpl_1.ServerType.BCS).then((res) => {
                if (res.data && res.data.length > 0) {
                    let iconSkin = TreeType_1.TreeIconSkin.Area;
                    let treeType = TreeType_1.TreeType.area.value;
                    res.data.forEach((model) => {
                        model.treeType = treeType;
                        model.iconSkin = iconSkin;
                    });
                }
                return res.data;
            });
        }
    }
    save(params) {
        return Promise.resolve(null).then(validateParams).then(saveIod);
        function validateParams() {
            if (!params || params.Code == null || params.Uid == null || params.AreaID == null || params.Pwd == null || params.IpAddress == null || params.Port == null || params.Name == null) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            return null;
        }
        function saveIod() {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.IodDao).save(params);
        }
    }
    update(params) {
        return Promise.resolve(null).then(validateParams).then(() => {
            let arr = [this.exist(params.Code), this.existById(params.AreaID)];
            return Promise.all(arr);
        }).then(existComplete).then(updateIod);
        function validateParams() {
            if (!params || params.Code == null || params.Uid == null || params.AreaID == null || params.Pwd == null || params.IpAddress == null || params.Port == null || params.Name == null) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            return null;
        }
        function existComplete(res) {
            let r1 = res[0];
            let r2 = res[1];
            if (r1 && r2) {
                if (!r1.data) {
                    return Promise.reject(ErrorCode_1.default.ERROR_REPEAT_IOD);
                }
                else if (!r2.data) {
                    return Promise.reject(ErrorCode_1.default.ERROR_AREA_ID_NULL);
                }
                else {
                    return null;
                }
            }
            else {
                return Promise.reject(ErrorCode_1.default.ERROR);
            }
        }
        function updateIod() {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.IodDao).update(params);
        }
    }
    deleteById(id) {
        return Promise.resolve(null)
            .then(validateParams)
            .then(deleteIodById);
        function validateParams() {
            if (id == null) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_AREA);
            }
            return null;
        }
        function deleteIodById() {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.IodDao).delete([id]);
        }
    }
    deleteByIds(ids) {
        return Promise.resolve(null)
            .then(validateParams)
            .then(deleteAreaById);
        function validateParams() {
            if (!ids || ids.length === 0) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_IOD);
            }
            return null;
        }
        function deleteAreaById() {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.IodDao).delete(ids);
        }
    }
    exist(code) {
        let whereList = [], childWheres = [], where, childWhere;
        where = new Where_1.default();
        childWhere = new ChildWhere_1.default();
        childWhere.FieldName = Iod_col_1.default.Code;
        childWhere.FieldType = DataType_1.default.Text;
        childWhere.FieldValue = code;
        childWhere.MType = MatchingType_1.default.Equal;
        childWhere.JType = JoinType_1.default.And;
        childWheres.push(childWhere);
        where.Childs = childWheres;
        whereList.push(where);
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.IodDao).findListByWhere(whereList);
    }
    existById(id) {
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.AreaDao).findByID(id);
    }
    constructor() {
    }
}
exports.IodService = IodService;
