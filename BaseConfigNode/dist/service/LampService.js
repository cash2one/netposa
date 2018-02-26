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
const Where_1 = require("../common/Where");
const ChildWhere_1 = require("../common/ChildWhere");
const Lamp_col_1 = require("../model/table-col/Lamp_col");
const DataType_1 = require("../common/DataType");
const MatchingType_1 = require("../common/MatchingType");
const JoinType_1 = require("../common/JoinType");
const Table_Map_1 = require("../model/Table-Map");
const log4js = require("log4js");
const Relation_col_1 = require("../model/table-col/Relation_col");
const util = require("util");
const Device_1 = require("../extend/Device");
const DaoType_1 = require("../dao/enum/DaoType");
const BeanHelper_1 = require("../common/help/BeanHelper");
const WhereLib_1 = require("../model/WhereLib");
const FildNameLib_1 = require("../model/FildNameLib");
const LampWithDevice_1 = require("../core/server/LampWithDevice");
const ObjectType_1 = require("../core/enum/ObjectType");
class LampService {
    constructor() {
    }
    save(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params || !params.Code || !params.AreaID) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            yield Promise.all([LampService.exist(params.Code), LampService.existById(params.AreaID)]);
            let LampModel = {};
            LampModel.Code = params.Code;
            LampModel.Name = params.Name;
            LampModel.AreaID = params.AreaID;
            LampModel.Description = params.Description;
            LampModel.CreateTime = Date.now().toString();
            LampModel.ImgUrl = params.ImgUrl;
            let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.LampDao).save(LampModel);
            if (!res || !res.data) {
                return Promise.reject(ErrorCode_1.default.ERROR_BACK_ERROR);
            }
            let LampID = res.data;
            let device = [];
            try {
                let j = JSON.parse(params.Ext);
                for (let k in j) {
                    let ids = j[k];
                    ids.forEach((item) => {
                        device.push({ type: k, id: item });
                    });
                }
            }
            catch (e) {
                LampService.LOGGER.debug(util.format('没有配置的设备 %s'), params.Ext);
            }
            if (device.length > 0) {
                for (let i = 0; i < device.length; i++) {
                    let item = device[i];
                    let r = yield Device_1.default.findDeviceRelationListForRelatedObjectID(item.id);
                    if (Array.isArray(r) && r.length > 0) {
                        let relation = r[0];
                        relation.ObjectId = LampID;
                        yield Device_1.default.updateRelation(relation);
                    }
                    else {
                        let relation = {
                            ObjectId: LampID,
                            ObjectType: Table_Map_1.TableMap.Lamp,
                            RelatedObjectType: (item.type === Table_Map_1.TableMap.Wifi || item.type === Table_Map_1.TableMap.ElectronicFence) ? Table_Map_1.TableMap.Rfid : item.type,
                            Type: item.type,
                            RelatedObjectId: item.id
                        };
                        yield Device_1.default.addRelation(relation);
                    }
                }
            }
            return true;
        });
    }
    update(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params || !params.ID || !params.AreaID) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let LampModel = yield this.detail(params.ID);
            LampModel.Code = params.Code;
            LampModel.Name = params.Name;
            LampModel.AreaID = params.AreaID;
            LampModel.Description = params.Description;
            let r = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.LampDao).update(LampModel);
            if (!r || !r.data) {
                return Promise.reject(ErrorCode_1.default.ERROR_BACK_ERROR);
            }
            let res = yield Device_1.default.findDeviceRelationListForObjectID(params.ID);
            if (Array.isArray(res) && res.length > 0) {
                let ids = [];
                res.forEach((item) => {
                    ids.push(item.ID);
                });
                yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.DeviceRelationDao).delete(ids);
            }
            let device = [];
            try {
                let j = JSON.parse(params.Ext);
                for (let k in j) {
                    let ids = j[k];
                    ids.forEach((item) => {
                        device.push({ type: k, id: item });
                    });
                }
            }
            catch (e) {
                LampService.LOGGER.debug(util.format('没有配置的设备 %s'), params.Ext);
            }
            if (device.length > 0) {
                for (let i = 0; i < device.length; i++) {
                    let item = device[i];
                    let r = yield Device_1.default.findDeviceRelationListForRelatedObjectID(item.id);
                    if (Array.isArray(r) && r.length > 0) {
                        let relation = r[0];
                        relation.ObjectId = params.ID;
                        yield Device_1.default.updateRelation(relation);
                    }
                    else {
                        let relation = {
                            ObjectId: params.ID,
                            ObjectType: Table_Map_1.TableMap.Lamp,
                            RelatedObjectType: (item.type === Table_Map_1.TableMap.Wifi || item.type === Table_Map_1.TableMap.ElectronicFence) ? Table_Map_1.TableMap.Rfid : item.type,
                            Type: item.type,
                            RelatedObjectId: item.id
                        };
                        yield Device_1.default.addRelation(relation);
                    }
                }
            }
            return true;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.LampDao).delete([id]);
            if (!res.data) {
                return Promise.reject(ErrorCode_1.default.ERROR_BACK_ERROR);
            }
            let ralationList = yield Device_1.default.findDeviceRelationListForObjectID(id);
            let result;
            if (Array.isArray(ralationList) && ralationList.length > 0) {
                let ids = [];
                ralationList.forEach((item) => {
                    ids.push(item.ID);
                });
                let r = yield Promise.all([
                    BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.DeviceRelationDao).delete(ids),
                    BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.LampDao).delete([id])
                ]);
                result = r[0].data && r[1].data;
            }
            else {
                let r = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.LampDao).delete([id]);
                result = !!r.data;
            }
            if (!result) {
                return Promise.reject(ErrorCode_1.default.ERROR_BACK_ERROR);
            }
            return result;
        });
    }
    deleteByIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ids) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_AREA);
            }
            for (let i = 0; i < ids.length; i++) {
                yield this.deleteById(ids[i]);
            }
            return true;
        });
    }
    detail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.LampDao).findByID(id);
            if (res && res.data) {
                return res.data;
            }
            else {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_LAMP);
            }
        });
    }
    findSystemPointById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let res = yield Device_1.default.findSystemPointListByObjectID(id);
            if (res.length > 0) {
                return res[0];
            }
            else {
                return {};
            }
        });
    }
    updataLampSystemPoint(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params || !params.ObjectID || !params.Lon || !params.Lat) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let res = yield Device_1.default.findSystemPointListByObjectID(params.ObjectID);
            let result;
            if (res.length > 0) {
                let oldModel = res[0];
                oldModel.Lat = params.Lat;
                oldModel.Lon = params.Lon;
                oldModel.Ext = params.Ext;
                let r = yield Device_1.default.updateSystemPoint(oldModel);
                result = !!r;
            }
            else {
                let r = yield Device_1.default.addSystemPoint(params);
                result = !!r;
            }
            return result;
        });
    }
    static exist(code) {
        return __awaiter(this, void 0, void 0, function* () {
            let whereList = [], where, childWheres = [], childWhere;
            where = new Where_1.default();
            childWhere = new ChildWhere_1.default();
            childWhere.FieldName = Lamp_col_1.default.Code;
            childWhere.FieldType = DataType_1.default.Text;
            childWhere.FieldValue = code;
            childWhere.MType = MatchingType_1.default.Equal;
            childWhere.JType = JoinType_1.default.And;
            childWheres.push(childWhere);
            where.Childs = childWheres;
            whereList.push(where);
            let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.LampDao).findListByWhere(whereList);
            if (!Array.isArray(res.data) || res.data.length === 0) {
                return true;
            }
            else {
                return Promise.reject(ErrorCode_1.default.ERROR_LAMP_REPEAT);
            }
        });
    }
    static existById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.AreaDao).findByID(id);
            if (res && res.data) {
                return true;
            }
            else {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_AREA);
            }
        });
    }
    findLampDeviceRelationById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            return yield Device_1.default.findDeviceRelationListForObjectID(id);
        });
    }
    findLampDeviceChildrenById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let relationRes = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.DeviceRelationDao).findListByWhere([WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.ObjectId, id)]);
            if (relationRes.code != 200 || !Array.isArray(relationRes.data) || relationRes.data.length === 0) {
                let result = new LampWithDevice_1.LampWithDevice();
                result.Camera = [];
                result.WiFi = [];
                result.ElectronicFence = [];
                result.RmpGate = [];
                return result;
            }
            let lampDeviceID = new LampWithDevice_1.LampWithDeviceID();
            relationRes.data.forEach((item) => {
                if (item.Type === ObjectType_1.ObjectType.Camera.value) {
                    lampDeviceID.Camera.push(item.RelatedObjectId);
                }
                if (item.Type === ObjectType_1.ObjectType.ElectronicFence.value) {
                    lampDeviceID.ElectronicFence.push(item.RelatedObjectId);
                }
                if (item.Type === ObjectType_1.ObjectType.Wifi.value) {
                    lampDeviceID.WiFi.push(item.RelatedObjectId);
                }
                if (item.Type === ObjectType_1.ObjectType.RmpGate.value) {
                    lampDeviceID.RmpGate.push(item.RelatedObjectId);
                }
            });
            let res = yield Promise.all([
                BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.CameraDao).findListByID(lampDeviceID.Camera),
                BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.RfidDao).findListByID(lampDeviceID.WiFi),
                BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.RfidDao).findListByID(lampDeviceID.ElectronicFence),
                BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.RmpGateDao).findListByID(lampDeviceID.RmpGate),
            ]);
            let result = new LampWithDevice_1.LampWithDevice();
            result.Camera = res[0].data ? res[0].data : [];
            result.WiFi = res[1].data ? res[1].data : [];
            result.ElectronicFence = res[2].data ? res[2].data : [];
            result.RmpGate = res[3].data ? res[3].data : [];
            return result;
        });
    }
    deleteLampAndDeviceRelation(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params || !params.ObjectId || !params.RelatedObjectId) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let wheres = [LampService.ObjectIDWhere(params.ObjectId), LampService.RelatedObjectIDWhere(params.RelatedObjectId)];
            let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.DeviceRelationDao).deleteByWhere(wheres);
            if (!res || !res.data) {
                return Promise.reject(ErrorCode_1.default.ERROR_BACK_ERROR);
            }
            return true;
        });
    }
    static ObjectIDWhere(ObjectID) {
        let where = new Where_1.default();
        let childWheres = [];
        let childWhere;
        childWhere = new ChildWhere_1.default();
        childWhere.FieldName = Relation_col_1.RelationCol.ObjectID;
        childWhere.FieldValue = ObjectID;
        childWhere.FieldType = DataType_1.default.Text;
        childWhere.MType = MatchingType_1.default.Equal;
        childWhere.JType = JoinType_1.default.And;
        childWheres.push(childWhere);
        where.Childs = childWheres;
        return where;
    }
    static RelatedObjectIDWhere(RelatedObjectID) {
        let where = new Where_1.default();
        let childWheres = [];
        let childWhere;
        childWhere = new ChildWhere_1.default();
        childWhere.FieldName = Relation_col_1.RelationCol.RelatedObjectID;
        childWhere.FieldValue = RelatedObjectID;
        childWhere.FieldType = DataType_1.default.Text;
        childWhere.MType = MatchingType_1.default.Equal;
        childWhere.JType = JoinType_1.default.And;
        childWheres.push(childWhere);
        where.Childs = childWheres;
        return where;
    }
}
LampService.LOGGER = log4js.getLogger('LampService');
exports.LampService = LampService;
