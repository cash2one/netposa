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
const BeanHelper_1 = require("../common/help/BeanHelper");
const DaoType_1 = require("../dao/enum/DaoType");
const BDaoImpl_1 = require("../dao/core/BDaoImpl");
const ErrorCode_1 = require("../common/res/ErrorCode");
const Where_1 = require("../common/Where");
const JoinType_1 = require("../common/JoinType");
const MatchingType_1 = require("../common/MatchingType");
const DataType_1 = require("../common/DataType");
const ChildWhere_1 = require("../common/ChildWhere");
const WhereLib_1 = require("../model/WhereLib");
const FildNameLib_1 = require("../model/FildNameLib");
class EngineNodeService {
    constructor() {
    }
    findAll() {
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EngineNodeDao).findAll();
    }
    ;
    findListByParams(reqParams) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!reqParams || !reqParams.currentPage || !reqParams.pageSize) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let arrWhere = [WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.EngineServerID, reqParams.engineServerId)];
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EngineNodeDao)
                .findListByPage(arrWhere, reqParams.currentPage, reqParams.pageSize, BDaoImpl_1.ServerType.BCS);
        });
    }
    update(serverModel) {
        return Promise.resolve(null)
            .then(validateParams)
            .then(validateModel)
            .then(findVideoById)
            .then(update);
        function validateParams() {
            return EngineNodeService.validateParams(serverModel, true);
        }
        function validateModel() {
            return EngineNodeService.validateModel(serverModel);
        }
        function findVideoById() {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EngineNodeDao).findByID(serverModel.ID, BDaoImpl_1.ServerType.BCS);
        }
        function update(resp) {
            let oldModel = resp.data;
            oldModel.Code = serverModel.Code;
            oldModel.Description = serverModel.Description;
            oldModel.IpAddress = serverModel.IpAddress;
            oldModel.Port = serverModel.Port;
            oldModel.Name = serverModel.Name;
            oldModel.EngineServerID = serverModel.EngineServerID;
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EngineNodeDao).update(oldModel, BDaoImpl_1.ServerType.BCS);
        }
    }
    save(serverModel) {
        return Promise.resolve(null)
            .then(validateParams)
            .then(validateModel)
            .then(save);
        function validateParams() {
            return EngineNodeService.validateParams(serverModel, false);
        }
        function validateModel() {
            return EngineNodeService.validateModel(serverModel);
        }
        function save() {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EngineNodeDao).save(serverModel, BDaoImpl_1.ServerType.BCS);
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
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EngineNodeDao).findByID(id, BDaoImpl_1.ServerType.BCS);
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
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EngineNodeDao).delete([id], BDaoImpl_1.ServerType.BCS);
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
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EngineNodeDao).delete(ids, BDaoImpl_1.ServerType.BCS);
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
        if (!model.EngineServerID) {
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
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EngineNodeDao).findListByWhere(arrWhere, BDaoImpl_1.ServerType.BCS)
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
exports.EngineNodeService = EngineNodeService;
