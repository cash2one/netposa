"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Where_1 = require("../common/Where");
const JoinType_1 = require("../common/JoinType");
const MatchingType_1 = require("../common/MatchingType");
const DataType_1 = require("../common/DataType");
const ChildWhere_1 = require("../common/ChildWhere");
const Promise = require("promise");
const ErrorCode_1 = require("../common/res/ErrorCode");
const OrderBy_1 = require("../common/OrderBy");
const IvsServer_col_1 = require("../model/table-col/IvsServer_col");
const IvsServer_col_2 = require("../model/table-col/IvsServer_col");
const BeanHelper_1 = require("../common/help/BeanHelper");
const DaoType_1 = require("../dao/enum/DaoType");
const BDaoImpl_1 = require("../dao/core/BDaoImpl");
class IvsServerService {
    constructor() {
    }
    update(serverModel) {
        return Promise.resolve(null)
            .then(validateParams)
            .then(IvsServerService.validateModel(serverModel.Code, serverModel.ID))
            .then(findVideoById)
            .then(update);
        function validateParams() {
            return IvsServerService.validateParams(serverModel, true);
        }
        function findVideoById() {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.IvsServerDao).findByID(serverModel.ID, BDaoImpl_1.ServerType.BCS);
        }
        function update(resp) {
            let oldModel = resp.data;
            oldModel.Code = serverModel.Code;
            oldModel.Description = serverModel.Description;
            oldModel.IpAddress = serverModel.IpAddress;
            oldModel.Port = serverModel.Port;
            oldModel.Name = serverModel.Name;
            oldModel.ServerType = serverModel.ServerType;
            oldModel.ProxyServerID = serverModel.ProxyServerID;
            oldModel.Uid = serverModel.Uid;
            oldModel.Pwd = serverModel.Pwd;
            oldModel.AreaID = serverModel.AreaID;
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.IvsServerDao).update(oldModel, BDaoImpl_1.ServerType.BCS);
        }
    }
    save(serverModel) {
        return Promise.resolve(null)
            .then(validateParams)
            .then(IvsServerService.validateModel(serverModel.Code, ""))
            .then(save);
        function validateParams() {
            return IvsServerService.validateParams(serverModel, false);
        }
        function save() {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.IvsServerDao).save(serverModel, BDaoImpl_1.ServerType.BCS);
        }
    }
    detail(id) {
        return Promise.resolve(null)
            .then(() => {
            if (!id) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            return null;
        }).then(() => {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.IvsServerDao).findByID(id, BDaoImpl_1.ServerType.BCS);
        });
    }
    findListByParams(reqParams) {
        return Promise.resolve(null)
            .then(() => {
            if (!reqParams || !reqParams.currentPage || !reqParams.pageSize) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            return null;
        })
            .then(() => {
            let arrWhere = new Array();
            let where = new Where_1.default();
            let childWhere = new ChildWhere_1.default();
            if (reqParams.areaId) {
                childWhere.FieldName = IvsServer_col_1.default.AreaID;
                childWhere.FieldType = DataType_1.default.Text;
                childWhere.FieldValue = reqParams.areaId;
                childWhere.MType = MatchingType_1.default.Equal;
                childWhere.JType = JoinType_1.default.And;
                where.Childs.push(childWhere);
            }
            where.JType = JoinType_1.default.And;
            arrWhere.push(where);
            let orderByList = new Array();
            let orderBy = new OrderBy_1.default();
            if (reqParams.sortName) {
                orderBy.FieldName = reqParams.sortName;
                orderBy.IsAsc = reqParams.isAsc;
            }
            else {
                orderBy.FieldName = IvsServer_col_2.default.ID;
                orderBy.IsAsc = true;
            }
            orderByList.push(orderBy);
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.IvsServerDao)
                .findListByPageWithOrderBy(arrWhere, orderByList, reqParams.currentPage, reqParams.pageSize, BDaoImpl_1.ServerType.BCS);
        });
    }
    deleteById(id) {
        return Promise.resolve(null)
            .then(() => {
            if (!id) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            return null;
        }).then(deleteById);
        function deleteById() {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.IvsServerDao).delete([id], BDaoImpl_1.ServerType.BCS);
        }
    }
    deleteByIds(ids) {
        return Promise.resolve(null)
            .then(() => {
            if (!ids) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            return null;
        }).then(deleteById);
        function deleteById() {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.IvsServerDao).delete(ids, BDaoImpl_1.ServerType.BCS);
        }
    }
    static validateParams(model, isUpdate) {
        if (!model) {
            return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
        }
        if (isUpdate && !model.ID) {
            return Promise.reject(ErrorCode_1.default.ERROR_IVS_NULL);
        }
        if (!model.Code) {
            return Promise.reject(ErrorCode_1.default.ERROR_IVS_CODE_NULL);
        }
        return null;
    }
    ;
    static validateModel(code, id) {
        return function () {
            return Promise.resolve(null)
                .then(() => {
                let wheres = new Array();
                let where = new Where_1.default();
                where.Childs = new Array();
                let childWhere = new ChildWhere_1.default();
                childWhere.FieldName = IvsServer_col_2.default.Code;
                childWhere.FieldType = DataType_1.default.Text;
                childWhere.FieldValue = code;
                childWhere.MType = MatchingType_1.default.Equal;
                where.Childs.push(childWhere);
                if (id) {
                    childWhere = new ChildWhere_1.default();
                    childWhere.FieldName = IvsServer_col_2.default.ID;
                    childWhere.FieldType = DataType_1.default.Text;
                    childWhere.FieldValue = id;
                    childWhere.MType = MatchingType_1.default.UnEqual;
                    childWhere.JType = JoinType_1.default.And;
                    where.Childs.push(childWhere);
                }
                where.JType = JoinType_1.default.And;
                wheres.push(where);
                return wheres;
            })
                .then((wheres) => {
                return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.IvsServerDao).findListByWhere(wheres, BDaoImpl_1.ServerType.BCS);
            })
                .then((resp) => {
                if (resp.data && resp.data.length > 0) {
                    return Promise.reject(ErrorCode_1.default.ERROR_IVS_CODE_REPEAT);
                }
                return null;
            });
        };
    }
    ;
    static findById(id) {
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.IvsServerDao).findByID(id, BDaoImpl_1.ServerType.BCS);
    }
}
exports.IvsServerService = IvsServerService;
