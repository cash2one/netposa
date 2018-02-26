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
const Table_Map_1 = require("../model/Table-Map");
const log4js = require("log4js");
const Where_1 = require("../common/Where");
const ChildWhere_1 = require("../common/ChildWhere");
const SystemPoint_col_1 = require("../model/table-col/SystemPoint_col");
const DataType_1 = require("../common/DataType");
const MatchingType_1 = require("../common/MatchingType");
const JoinType_1 = require("../common/JoinType");
const Relation_col_1 = require("../model/table-col/Relation_col");
const Camera_1 = require("./Camera");
const Rmpgate_1 = require("./Rmpgate");
const Wifi_1 = require("./Wifi");
const ElectronicFence_1 = require("./ElectronicFence");
const DaoType_1 = require("../dao/enum/DaoType");
const BeanHelper_1 = require("../common/help/BeanHelper");
class DeviceExt {
    static findSystemPointForMap() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.SystemPointDao).findAll();
            let resMap = {};
            if (Array.isArray(result.data) && result.data.length > 0) {
                result.data.forEach((item) => {
                    resMap[item.ObjectID] = item;
                });
            }
            return resMap;
        });
    }
    static addSystemPoint(point) {
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.SystemPointDao).save(point).then((res) => __awaiter(this, void 0, void 0, function* () {
            return res.data;
        }));
    }
    static updateSystemPoint(point) {
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.SystemPointDao).update(point).then((res) => __awaiter(this, void 0, void 0, function* () {
            return res.data;
        }));
    }
    static updateSystemPointList(points) {
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.SystemPointDao).updateList(points).then((res) => __awaiter(this, void 0, void 0, function* () {
            return res.data;
        }));
    }
    static findSystemPointListByObjectID(ObjectID) {
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.SystemPointDao).findListByWhere(DeviceExt.ObjectIDWhere(ObjectID))
            .then((res) => {
            if (Array.isArray(res.data)) {
                return res.data;
            }
            else {
                return [];
            }
        });
    }
    static findDeviceRelationByID(ID) {
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.DeviceRelationDao).findByID(ID)
            .then((res) => {
            return res.data;
        });
    }
    static findDeviceRelationListForObjectID(ObjectID) {
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.DeviceRelationDao).findListByWhere(DeviceExt.ObjectIDWhere(ObjectID, true))
            .then((res) => {
            if (Array.isArray(res.data)) {
                return res.data;
            }
            else {
                return [];
            }
        });
    }
    static findDeviceRelationListForRelatedObjectID(RelatedObjectID) {
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.DeviceRelationDao).findListByWhere(DeviceExt.RelatedObjectIDWhere(RelatedObjectID))
            .then((res) => {
            if (Array.isArray(res.data)) {
                return res.data;
            }
            else {
                return [];
            }
        });
    }
    static updateRelation(relation) {
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.DeviceRelationDao).update(relation)
            .then((res) => __awaiter(this, void 0, void 0, function* () {
            return res.data;
        }));
    }
    static updateRelationList(relations) {
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.DeviceRelationDao).updateList(relations)
            .then((res) => __awaiter(this, void 0, void 0, function* () {
            return res.data;
        }));
    }
    static addRelation(relation) {
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.DeviceRelationDao).save(relation)
            .then((res) => {
            return res.data;
        });
    }
    static ObjectIDWhere(ObjectID, isDevice) {
        let wheres = [];
        let where = new Where_1.default();
        let childWheres = [];
        let childWhere = new ChildWhere_1.default();
        childWhere.FieldName = isDevice ? Relation_col_1.RelationCol.ObjectID : SystemPoint_col_1.SystemPointCol.ObjectID;
        childWhere.FieldValue = ObjectID;
        childWhere.FieldType = DataType_1.default.Text;
        childWhere.MType = MatchingType_1.default.Equal;
        childWhere.JType = JoinType_1.default.And;
        childWheres.push(childWhere);
        if (isDevice) {
            let childWhere2 = new ChildWhere_1.default();
            childWhere2.FieldName = Relation_col_1.RelationCol.ObjectType;
            childWhere2.FieldValue = Table_Map_1.TableMap.Lamp;
            childWhere2.FieldType = DataType_1.default.Text;
            childWhere2.MType = MatchingType_1.default.Equal;
            childWhere2.JType = JoinType_1.default.And;
            childWheres.push(childWhere2);
        }
        where.Childs = childWheres;
        wheres.push(where);
        return wheres;
    }
    static RelatedObjectIDWhere(ID) {
        let wheres = [];
        let where = new Where_1.default();
        let childWheres = [];
        let childWhere = new ChildWhere_1.default();
        childWhere.FieldName = Relation_col_1.RelationCol.RelatedObjectID;
        childWhere.FieldValue = ID;
        childWhere.FieldType = DataType_1.default.Text;
        childWhere.MType = MatchingType_1.default.Equal;
        childWhere.JType = JoinType_1.default.And;
        childWheres.push(childWhere);
        let childWhere2 = new ChildWhere_1.default();
        childWhere2.FieldName = Relation_col_1.RelationCol.ObjectType;
        childWhere2.FieldValue = Table_Map_1.TableMap.Lamp;
        childWhere2.FieldType = DataType_1.default.Text;
        childWhere2.MType = MatchingType_1.default.Equal;
        childWhere2.JType = JoinType_1.default.And;
        childWheres.push(childWhere2);
        where.Childs = childWheres;
        wheres.push(where);
        return wheres;
    }
}
DeviceExt.LOGGER = log4js.getLogger("CameraExtCache");
DeviceExt.Camera = Camera_1.default;
DeviceExt.RmpGate = Rmpgate_1.default;
DeviceExt.Wifi = Wifi_1.default;
DeviceExt.ElectronicFence = ElectronicFence_1.default;
exports.default = DeviceExt;
