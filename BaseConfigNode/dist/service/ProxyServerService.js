"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Where_1 = require("../common/Where");
const JoinType_1 = require("../common/JoinType");
const MatchingType_1 = require("../common/MatchingType");
const DataType_1 = require("../common/DataType");
const ChildWhere_1 = require("../common/ChildWhere");
const ErrorCode_1 = require("../common/res/ErrorCode");
const OrderBy_1 = require("../common/OrderBy");
const ProxyServer_col_1 = require("../model/table-col/ProxyServer_col");
const BeanHelper_1 = require("../common/help/BeanHelper");
const DaoType_1 = require("../dao/enum/DaoType");
const BDaoImpl_1 = require("../dao/core/BDaoImpl");
class ProxyServerService {
    constructor() {
    }
    findAll() {
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ProxyServerDao).findAll(BDaoImpl_1.ServerType.BCS);
    }
    update(serverModel) {
        return Promise.resolve(null)
            .then(validateParams)
            .then(validateModel)
            .then(findVideoById)
            .then(update);
        function validateParams() {
            return ProxyServerService.validateParams(serverModel, true);
        }
        function validateModel() {
            return ProxyServerService.validateModel(serverModel);
        }
        function findVideoById() {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ProxyServerDao).findByID(serverModel.ID, BDaoImpl_1.ServerType.BCS);
        }
        function update(resp) {
            let oldModel = resp.data;
            oldModel.Code = serverModel.Code;
            oldModel.Description = serverModel.Description;
            oldModel.IpAddress = serverModel.IpAddress;
            oldModel.Port = serverModel.Port;
            oldModel.Name = serverModel.Name;
            oldModel.ProxyServerType = serverModel.ProxyServerType;
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ProxyServerDao).update(oldModel, BDaoImpl_1.ServerType.BCS);
        }
    }
    save(serverModel) {
        return Promise.resolve(null)
            .then(validateParams)
            .then(validateModel)
            .then(save);
        function validateParams() {
            return ProxyServerService.validateParams(serverModel, false);
        }
        function validateModel() {
            return ProxyServerService.validateModel(serverModel);
        }
        function save() {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ProxyServerDao).save(serverModel, BDaoImpl_1.ServerType.BCS);
        }
    }
    detail(id) {
        return Promise.resolve(null)
            .then(() => {
            if (!id) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            return null;
        })
            .then(() => {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ProxyServerDao).findByID(id, BDaoImpl_1.ServerType.BCS);
        });
    }
    findListByParams(reqParams) {
        return Promise.resolve(null)
            .then(() => {
            if (!reqParams || !reqParams.currentPage || !reqParams.pageSize) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            return null;
        }).then(() => {
            let arrWhere = [];
            let where = new Where_1.default();
            where.JType = JoinType_1.default.And;
            if (reqParams.type) {
                let whereType = new ChildWhere_1.default();
                whereType.FieldName = ProxyServer_col_1.default.ProxyServerType;
                whereType.FieldValue = reqParams.type;
                whereType.FieldType = DataType_1.default.Text;
                whereType.MType = MatchingType_1.default.Equal;
                whereType.JType = JoinType_1.default.And;
                where.Childs.push(whereType);
            }
            arrWhere.push(where);
            let orderByList = [];
            let orderBy = new OrderBy_1.default();
            if (reqParams.sortName) {
                orderBy.FieldName = reqParams.sortName;
                orderBy.IsAsc = reqParams.isAsc;
            }
            else {
                orderBy.FieldName = ProxyServer_col_1.default.ID;
                orderBy.IsAsc = true;
            }
            orderByList.push(orderBy);
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ProxyServerDao)
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
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ProxyServerDao).delete([id], BDaoImpl_1.ServerType.BCS);
        }
    }
    deleteByIds(ids) {
        return Promise.resolve(null)
            .then(() => {
            if (!ids) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            return null;
        }).then(deleteByIds);
        function deleteByIds() {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ProxyServerDao).delete(ids, BDaoImpl_1.ServerType.BCS);
        }
    }
    static validateParams(model, isUpdate) {
        if (!model) {
            return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
        }
        if (isUpdate && !model.ID) {
            return Promise.reject(ErrorCode_1.default.ERROR_PROXY_NULL);
        }
        if (!model.Code) {
            return Promise.reject(ErrorCode_1.default.ERROR_PROXY_CODE_NULL);
        }
        if (!model.ProxyServerType) {
            return Promise.reject(ErrorCode_1.default.ERROR_PROXY_TYPE_NULL);
        }
        return null;
    }
    ;
    static validateModel(model) {
        let arrWhere = new Array();
        let where = new Where_1.default();
        where.Childs = new Array();
        let childWhere = new ChildWhere_1.default();
        if (model.Code) {
            childWhere.FieldName = 'Code';
            childWhere.FieldType = DataType_1.default.Text;
            childWhere.FieldValue = model.Code;
            childWhere.MType = MatchingType_1.default.Equal;
            childWhere.JType = JoinType_1.default.And;
            where.Childs.push(childWhere);
        }
        where.JType = JoinType_1.default.And;
        arrWhere.push(where);
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ProxyServerDao).findListByWhere(arrWhere, BDaoImpl_1.ServerType.BCS)
            .then(function (resp) {
            if (!resp.data || resp.data.length == 0) {
                return null;
            }
            if (resp.data.length == 1 && model.ID && resp.data[0].ID == model.ID) {
                return null;
            }
            return Promise.reject(ErrorCode_1.default.ERROR_PROXY_CODE_REPEAT);
        });
    }
    ;
}
exports.ProxyServerService = ProxyServerService;
