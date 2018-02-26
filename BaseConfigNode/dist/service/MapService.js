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
const Where_1 = require("../common/Where");
const ChildWhere_1 = require("../common/ChildWhere");
const ErrorCode_1 = require("../common/res/ErrorCode");
const DataType_1 = require("../common/DataType");
const JoinType_1 = require("../common/JoinType");
const MatchingType_1 = require("../common/MatchingType");
const Layer_1 = require("../core/entity/Layer");
const LayerType_1 = require("../core/enum/LayerType");
const MapBaseInfoModel_1 = require("../core/server/MapBaseInfoModel");
const Parameter_col_1 = require("../model/table-col/Parameter_col");
const MapParameterType_1 = require("../core/server/enum/MapParameterType");
const BeanHelper_1 = require("../common/help/BeanHelper");
const DaoType_1 = require("../dao/enum/DaoType");
const ProcedureParamStatement_1 = require("../core/server/ProcedureParamStatement");
const WhereLib_1 = require("../model/WhereLib");
const FildNameLib_1 = require("../model/FildNameLib");
const ProcedureType_1 = require("../core/server/enum/ProcedureType");
class MapService {
    saveOrUpdateBaseInfo(model) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!model || !model.parameters || model.parameters.length <= 0 || !model.layerTypeList || model.layerTypeList.length <= 0) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let result = yield Promise.all([MapService.saveLayers(model.layerTypeList),
                MapService.saveBaseInfos(model.parameters)]);
            return result[0] && result[1] ? true : Promise.reject(ErrorCode_1.default.ERROR_BACK_ERROR);
        });
    }
    static saveLayers(layers) {
        return __awaiter(this, void 0, void 0, function* () {
            let needAdd = [];
            let needUpdate = [];
            let i, len;
            for (i = 0, len = layers.length; i < len; i++) {
                if (layers[i].ID != null) {
                    needUpdate.push(layers[i]);
                }
                else {
                    needAdd.push(layers[i]);
                }
            }
            let result = false;
            if (needAdd.length > 0 && needUpdate.length > 0) {
                let arr = yield Promise.all([BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.LayerDao).addList(needAdd), BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.LayerDao).updateList(needUpdate)]);
                result = arr[0].data && arr[1].data;
            }
            if (needAdd.length > 0 && needUpdate.length === 0) {
                let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.LayerDao).addList(needAdd);
                result = !!res.data;
            }
            if (needUpdate.length > 0 && needAdd.length == 0) {
                let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.LayerDao).updateList(needUpdate);
                result = !!res.data;
            }
            return result;
        });
    }
    static saveBaseInfos(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let needAdd = [];
            let needUpdate = [];
            let i, len;
            for (i = 0, len = params.length; i < len; i++) {
                if (params[i].ID != null) {
                    needUpdate.push(params[i]);
                }
                else {
                    needAdd.push(params[i]);
                }
            }
            let result = false;
            if (needAdd.length > 0 && needUpdate.length > 0) {
                let arr = yield Promise.all([BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ParameterDao).addList(needAdd), BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ParameterDao).updateList(needUpdate)]);
                result = arr[0].data && arr[1].data;
            }
            if (needAdd.length > 0 && needUpdate.length === 0) {
                let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ParameterDao).addList(needAdd);
                result = !!res.data;
            }
            if (needUpdate.length > 0 && needAdd.length == 0) {
                let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ParameterDao).updateList(needUpdate);
                result = !!res.data;
            }
            return result;
        });
    }
    getBaseInfo() {
        let arr = [this.getLayerTypes(), MapService.getMapParameters()];
        return Promise.all(arr).then((datas) => {
            let result = new MapBaseInfoModel_1.MapBaseInfoModel();
            let layers = datas[0];
            let parameters = datas[1];
            result.layerTypeList = layers;
            result.parameters = parameters;
            return result;
        });
    }
    getLayerTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.LayerDao).findAll();
            let result = null;
            if (res.data && res.data.length > 0) {
                result = res.data;
            }
            else {
                result = this.getDefaultLayerTypes();
            }
            return result;
        });
    }
    static getMapParameters() {
        return __awaiter(this, void 0, void 0, function* () {
            let wheres = [];
            let where = new Where_1.default();
            let childWhere = new ChildWhere_1.default();
            childWhere.FieldName = Parameter_col_1.default.ParamClass;
            childWhere.FieldType = DataType_1.default.Text;
            childWhere.FieldValue = [MapParameterType_1.MapParameterObj.PointClusterDistance.value, MapParameterType_1.MapParameterObj.MapInitDefaultLevel.value].join(",");
            childWhere.MType = MatchingType_1.default.Include;
            childWhere.JType = JoinType_1.default.And;
            where.Childs.push(childWhere);
            wheres.push(where);
            let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ParameterDao).findListByWhere(wheres);
            return res.data;
        });
    }
    getDefaultLayerTypes() {
        let result = new Array();
        for (let k in LayerType_1.LayerType) {
            let layer = new Layer_1.Layer();
            layer.LayerType = LayerType_1.LayerType[k].value;
            layer.Name = LayerType_1.LayerType[k].text;
            result.push(layer);
        }
        return result;
    }
    findList(params) {
        if (!params.roleId) {
            return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
        }
        let procParams = new ProcedureParamStatement_1.ProcedureParamStatement();
        procParams.ProcName = ProcedureType_1.PROCEDURE_TYPE.PROC_GET_DEVICE_STATE;
        procParams.JsonProcParams = [params.roleId];
        return Promise.resolve(null).then(() => {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.OtherDao).callProcedureForObject(procParams);
        }).then((data) => {
            return data;
        });
    }
    saveOrUpdate(model) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!model || !model.Lat || !model.Lon || !model.LayerType || !model.ObjectType) {
                return Promise.reject(ErrorCode_1.default.ERROR_SYSTEM_POINT_POINT_NULL);
            }
            let oldModelRes = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.SystemPointDao).findListByWhere([WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.ObjectID, model.ObjectID)]);
            if (oldModelRes && Array.isArray(oldModelRes.data) && oldModelRes.data.length > 0) {
                let oldModel = oldModelRes.data[0];
                oldModel.Lat = model.Lat;
                oldModel.Lon = model.Lon;
                oldModel.LayerType = model.LayerType;
                oldModel.ObjectID = model.ObjectID;
                oldModel.ObjectType = model.ObjectType;
                oldModel.ObjectName = model.ObjectName;
                return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.SystemPointDao).update(oldModel);
            }
            return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.SystemPointDao).save(model);
        });
    }
}
exports.MapService = MapService;
