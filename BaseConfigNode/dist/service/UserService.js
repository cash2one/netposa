"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Where_1 = require("../common/Where");
const DataType_1 = require("../common/DataType");
const JoinType_1 = require("../common/JoinType");
const MatchingType_1 = require("../common/MatchingType");
const ChildWhere_1 = require("../common/ChildWhere");
const Promise = require("promise");
const DaoType_1 = require("../dao/enum/DaoType");
const BeanHelper_1 = require("../common/help/BeanHelper");
const BDaoImpl_1 = require("../dao/core/BDaoImpl");
class UserService {
    static findUserByUidWithPwd(username, password) {
        var arrWhere = new Array();
        var where = new Where_1.default();
        var childWhere = new ChildWhere_1.default();
        childWhere.FieldName = "Uid";
        childWhere.FieldType = DataType_1.default.Text;
        childWhere.FieldValue = username;
        childWhere.JType = JoinType_1.default.And;
        childWhere.MType = MatchingType_1.default.Equal;
        where.Childs.push(childWhere);
        childWhere = new ChildWhere_1.default();
        childWhere.FieldName = "Pwd";
        childWhere.FieldType = DataType_1.default.Text;
        childWhere.FieldValue = password;
        childWhere.JType = JoinType_1.default.And;
        childWhere.MType = MatchingType_1.default.Equal;
        where.Childs.push(childWhere);
        arrWhere.push(where);
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UserDao).findListByWhere(arrWhere, BDaoImpl_1.ServerType.BCS);
    }
    static findListByParams(params) {
        return Promise.resolve(null);
    }
    ;
}
exports.default = UserService;
