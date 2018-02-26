"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BeanHelper_1 = require("../common/help/BeanHelper");
const DaoType_1 = require("../dao/enum/DaoType");
const BDaoImpl_1 = require("../dao/core/BDaoImpl");
const ErrorCode_1 = require("../common/res/ErrorCode");
const Where_1 = require("../common/Where");
const JoinType_1 = require("../common/JoinType");
const MatchingType_1 = require("../common/MatchingType");
const DataType_1 = require("../common/DataType");
const ChildWhere_1 = require("../common/ChildWhere");
class EngineServerService {
    constructor() {
    }
    findAll() {
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EngineServerDao).findAll();
    }
    ;
    update(serverModel) {
        ;
        return Promise.resolve(null)
            .then(validateParams)
            .then(validateModel)
            .then(findVideoById)
            .then(update);
        function validateParams() {
            return EngineServerService.validateParams(serverModel, true);
        }
        function validateModel() {
            return EngineServerService.validateModel(serverModel);
        }
        function findVideoById() {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EngineServerDao).findByID(serverModel.ID, BDaoImpl_1.ServerType.BCS);
        }
        function update(resp) {
            let oldModel = resp.data;
            oldModel.Code = serverModel.Code;
            oldModel.Description = serverModel.Description;
            oldModel.IpAddress = serverModel.IpAddress;
            oldModel.Port = serverModel.Port;
            oldModel.Name = serverModel.Name;
            oldModel.EngineServerType = serverModel.EngineServerType;
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EngineServerDao).update(oldModel, BDaoImpl_1.ServerType.BCS);
        }
    }
    save(serverModel) {
        return Promise.resolve(null)
            .then(validateParams)
            .then(validateModel)
            .then(save);
        function validateParams() {
            return EngineServerService.validateParams(serverModel, false);
        }
        function validateModel() {
            return EngineServerService.validateModel(serverModel);
        }
        function save() {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EngineServerDao).save(serverModel, BDaoImpl_1.ServerType.BCS);
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
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EngineServerDao).findByID(id, BDaoImpl_1.ServerType.BCS);
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
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EngineServerDao).delete([id]);
        }
    }
    static validateParams(model, isUpdate) {
        if (!model) {
            return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
        }
        if (isUpdate && !model.ID) {
            return Promise.reject(ErrorCode_1.default.ERROR_ENGINE_NULL);
        }
        if (!model.Code) {
            return Promise.reject(ErrorCode_1.default.ERROR_ENGINE_CODE_NULL);
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
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EngineServerDao).findListByWhere(arrWhere, BDaoImpl_1.ServerType.BCS)
            .then(function (resp) {
            if (!resp.data || resp.data.length == 0) {
                return null;
            }
            if (resp.data.length == 1 && model.ID && resp.data[0].ID == model.ID) {
                return null;
            }
            return Promise.reject(ErrorCode_1.default.ERROR_ENGINE_CODE_REPEAT);
        });
    }
    ;
}
exports.EngineServerService = EngineServerService;
