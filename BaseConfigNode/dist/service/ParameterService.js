"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Promise = require("promise");
const ErrorCode_1 = require("../common/res/ErrorCode");
const ChildWhere_1 = require("../common/ChildWhere");
const DataType_1 = require("../common/DataType");
const JoinType_1 = require("../common/JoinType");
const MatchingType_1 = require("../common/MatchingType");
const Where_1 = require("../common/Where");
const MapConfigParameter_1 = require("../core/entity/MapConfigParameter");
const SystemConfigParams_1 = require("../core/entity/SystemConfigParams");
const ResponseResult_1 = require("../core/params/result/ResponseResult");
const log4js = require("log4js");
const util = require("util");
const BeanHelper_1 = require("../common/help/BeanHelper");
const DaoType_1 = require("../dao/enum/DaoType");
class ParameterService {
    constructor() {
    }
    findAll() {
        return Promise.resolve(null)
            .then(() => {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ParameterDao).findAll();
        });
    }
    edit(models) {
        let maps = {};
        return Promise.resolve(null)
            .then(() => {
            if (!Array.isArray(models) || models.length <= 0) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            return null;
        })
            .then(() => {
            let ids = new Array();
            models.forEach((param) => {
                if (param.ID && !util.isNullOrUndefined(param.ID)) {
                    ids.push(param.ID);
                    maps[param.ID] = param;
                }
            });
            if (ids.length > 0) {
                return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ParameterDao).findListByID(ids);
            }
            else {
                return null;
            }
        })
            .then((res) => {
            ParameterService.LOGGER.debug("return result：" + JSON.stringify(res));
            if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
                let params = res.data;
                if (params && params.length > 0) {
                    let toUpdateParams = new Array();
                    params.forEach((param) => {
                        if (maps[param.ID]) {
                            let model = maps[param.ID];
                            param.ParamClass = model.ParamClass;
                            param.ParamName = model.ParamName;
                            param.ParamValue = model.ParamValue;
                            param.ParentID = model.ParentID;
                            param.PYCode = model.PYCode;
                            param.Ext = model.Ext;
                            toUpdateParams.push(model);
                        }
                        else {
                            ParameterService.LOGGER.info(util.format("update warn: %s not match!", param.ParamName));
                        }
                    });
                    return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ParameterDao).updateList(toUpdateParams);
                }
            }
            ParameterService.LOGGER.warn(util.format("update warn: no parameter updated!"));
            return Promise.reject(ErrorCode_1.default.ERROR_INVALID_PARAMETER);
        });
    }
    findMapConfigByParamClass(paramClass) {
        return Promise.resolve(null)
            .then(() => {
            if (util.isNullOrUndefined(paramClass)) {
                paramClass = MapConfigParameter_1.MapConfigParamConst.FieldValue.value;
            }
            let whereChild = new ChildWhere_1.default();
            whereChild.FieldName = MapConfigParameter_1.MapConfigParamConst.FieldName.value;
            whereChild.FieldType = DataType_1.default.Text;
            whereChild.FieldValue = paramClass;
            whereChild.MType = MatchingType_1.default.Equal;
            whereChild.JType = JoinType_1.default.And;
            let where = new Where_1.default();
            where.Childs.push(whereChild);
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ParameterDao).findListByWhere([where]);
        })
            .then((res) => {
            ParameterService.LOGGER.debug("return result: " + JSON.stringify(res.data));
            let mapConfigParam, result = new ResponseResult_1.BackResponseBody();
            if (res && res.data) {
                mapConfigParam = res.data[0];
                if (mapConfigParam.Ext) {
                    let data = JSON.parse(mapConfigParam.Ext);
                    result.code = res.code;
                    result.data = data;
                    result.status = res.status;
                    result.message = res.message;
                }
                else {
                    result.code = res.code;
                    result.status = res.status;
                    result.message = res.message;
                }
            }
            else {
                result.code = res.code;
                result.status = res.status;
                result.message = res.message;
            }
            return result;
        });
    }
    editMapConfigParam(model) {
        return Promise.resolve(null)
            .then(() => {
            let whereChild = new ChildWhere_1.default();
            whereChild.FieldName = MapConfigParameter_1.MapConfigParamConst.FieldName.value;
            whereChild.FieldType = DataType_1.default.Text;
            whereChild.FieldValue = MapConfigParameter_1.MapConfigParamConst.FieldValue.value;
            whereChild.MType = MatchingType_1.default.Equal;
            whereChild.JType = JoinType_1.default.And;
            let where = new Where_1.default();
            where.Childs.push(whereChild);
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ParameterDao).findListByWhere([where]);
        })
            .then((res) => {
            ParameterService.LOGGER.debug("return result: " + JSON.stringify(res.data));
            let mapConfigParam;
            if (res && res.data) {
                mapConfigParam = res.data[0];
                if (model) {
                    mapConfigParam.Ext = JSON.stringify(model);
                    return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ParameterDao).update(mapConfigParam);
                }
            }
        });
    }
    findSystemConfigByParamClass(paramClass) {
        return Promise.resolve(null)
            .then(() => {
            if (util.isNullOrUndefined(paramClass)) {
                paramClass = SystemConfigParams_1.SystemConfigParamConst.FieldValue.value;
            }
            let whereChild = new ChildWhere_1.default();
            whereChild.FieldName = SystemConfigParams_1.SystemConfigParamConst.FieldName.value;
            whereChild.FieldType = DataType_1.default.Text;
            whereChild.FieldValue = paramClass;
            whereChild.MType = MatchingType_1.default.Equal;
            whereChild.JType = JoinType_1.default.And;
            let where = new Where_1.default();
            where.Childs.push(whereChild);
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ParameterDao).findListByWhere([where]);
        })
            .then((res) => {
            ParameterService.LOGGER.debug("return result: " + JSON.stringify(res.data));
            let systemConfigParam, result = new ResponseResult_1.BackResponseBody();
            if (res && res.data) {
                systemConfigParam = res.data[0];
                if (systemConfigParam.Ext) {
                    let data = JSON.parse(systemConfigParam.Ext);
                    result.code = res.code;
                    result.data = data;
                    result.status = res.status;
                    result.message = res.message;
                }
                else {
                    result.code = res.code;
                    result.status = res.status;
                    result.message = res.message;
                }
            }
            else {
                result.code = res.code;
                result.status = res.status;
                result.message = res.message;
            }
            return result;
        });
    }
    editSystemConfigParam(model) {
        return Promise.resolve(null)
            .then(() => {
            let whereChild = new ChildWhere_1.default();
            whereChild.FieldName = SystemConfigParams_1.SystemConfigParamConst.FieldName.value;
            whereChild.FieldType = DataType_1.default.Text;
            whereChild.FieldValue = SystemConfigParams_1.SystemConfigParamConst.FieldValue.value;
            whereChild.MType = MatchingType_1.default.Equal;
            whereChild.JType = JoinType_1.default.And;
            let where = new Where_1.default();
            where.Childs.push(whereChild);
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ParameterDao).findListByWhere([where]);
        })
            .then((res) => {
            ParameterService.LOGGER.debug("return result: " + JSON.stringify(res.data));
            let systemConfigParam;
            if (res && res.data) {
                systemConfigParam = res.data[0];
                if (model) {
                    systemConfigParam.Ext = JSON.stringify(model);
                    return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ParameterDao).update(systemConfigParam);
                }
            }
        });
    }
}
ParameterService.LOGGER = log4js.getLogger("ParameterService");
exports.ParameterService = ParameterService;
