"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorCode_1 = require("../common/res/ErrorCode");
const log4js = require("log4js");
const util = require("util");
const BeanHelper_1 = require("../common/help/BeanHelper");
const DaoType_1 = require("../dao/enum/DaoType");
const BDaoImpl_1 = require("../dao/core/BDaoImpl");
class LayerService {
    findAll() {
        return Promise.resolve(null)
            .then(() => {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.LayerDao).findAll(BDaoImpl_1.ServerType.BCS);
        });
    }
    delete(ids) {
        return Promise.resolve(null)
            .then(validateParams).then(deleteBatchById);
        function validateParams() {
            if (!Array.isArray(ids) || ids.length <= 0) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            return null;
        }
        function deleteBatchById() {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.LayerDao).delete(ids, BDaoImpl_1.ServerType.BCS);
        }
    }
    add(model) {
        return Promise.resolve(null).then(validateParams)
            .then(() => {
            model.CreateTime = new Date();
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.LayerDao).addList([model], BDaoImpl_1.ServerType.BCS);
        });
        function validateParams() {
            if (model == null || util.isNullOrUndefined(model.Name) || util.isNullOrUndefined(model.LayerType)) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            return null;
        }
    }
    edit(model) {
        return Promise.resolve(null).then(validateParams)
            .then(() => {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.LayerDao).findByID(model.ID, BDaoImpl_1.ServerType.BCS);
        })
            .then((res) => {
            LayerService.LOGGER.debug("return result：" + JSON.stringify(res));
            if (res && res.data) {
                let layer = res.data;
                layer.Name = model.Name;
                layer.Desc = model.Desc;
                layer.Enable = model.Enable;
                layer.Ext = model.Ext;
                layer.LayerGroupID = model.LayerGroupID;
                layer.LayerType = model.LayerType;
                layer.MaxLevel = model.MaxLevel;
                layer.MinLevel = model.MinLevel;
                layer.LayerIconURL = model.LayerIconURL;
                layer.Visible = model.Visible;
                layer.CreateTime = model.CreateTime;
                return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.LayerDao).update(layer, BDaoImpl_1.ServerType.BCS);
            }
            else {
                LayerService.LOGGER.warn(util.format("edit warn: no layer updated!"));
                return Promise.reject(ErrorCode_1.default.ERROR_INVALID_PARAMETER);
            }
        });
        function validateParams() {
            if (model == null || util.isNullOrUndefined(model.Name) || util.isNullOrUndefined(model.LayerType)) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            return null;
        }
    }
}
LayerService.LOGGER = log4js.getLogger("LayerService");
exports.LayerService = LayerService;
