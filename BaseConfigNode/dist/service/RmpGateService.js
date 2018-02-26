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
const ErrorCode_1 = require("../common/res/ErrorCode");
const log4js = require("log4js");
const util = require("util");
const Rmpgate_1 = require("../extend/Rmpgate");
const SystemPoint_1 = require("../core/entity/SystemPoint");
const DeviceRelation_1 = require("../core/entity/DeviceRelation");
const Device_1 = require("../extend/Device");
const ObjectType_1 = require("../core/enum/ObjectType");
const LayerType_1 = require("../core/enum/LayerType");
const BeanHelper_1 = require("../common/help/BeanHelper");
const DaoType_1 = require("../dao/enum/DaoType");
const _ = require("lodash");
const WhereLib_1 = require("../model/WhereLib");
const FildNameLib_1 = require("../model/FildNameLib");
class RmpGateService {
    constructor() {
        this.LOGGER = log4js.getLogger("RmpGateService");
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield Promise.all([
                Rmpgate_1.default.getPosaDPJavaCache(),
                BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.DeviceRelationDao).findListByWhere([
                    WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.ObjectType, ObjectType_1.ObjectType.LampPost.value),
                    WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.RelatedObjectType, Table_Map_1.TableMap.RmpGate)
                ]),
            ]);
            if (Array.isArray(res[0].data) && res[0].data.length > 0 && Array.isArray(res[1].data) && res[1].data.length > 0) {
                for (let l = 0; l < res[0].data.length; l++) {
                    let item = res[0].data[l];
                    for (let i = 0; i < res[1].data.length; i++) {
                        let item2 = res[1].data[i];
                        if (item2 && item.ID === item2.RelatedObjectId) {
                            item.isConfigLamp = true;
                            res[1].data.splice(i, 1);
                            break;
                        }
                    }
                    if (res[1].data.length === 0) {
                        break;
                    }
                }
            }
            return res[0];
        });
    }
    edit(models) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!models.ID || !models.Name || !models.Code) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let oldModelRes = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.RmpGateDao).findByID(models.ID);
            if (oldModelRes.code != 200 || !oldModelRes.data) {
                return Promise.reject(ErrorCode_1.default.ERROR_BACK_ERROR);
            }
            let model = _.cloneDeep(oldModelRes.data);
            model.Name = models.Name;
            model.Code = models.Code;
            let point = models.JsonUserData.Point;
            let lampPost = models.JsonUserData.lampPost;
            let r1 = yield RmpGateService.updateRmpGate(model);
            let r2, r3;
            let p = yield Device_1.default.findSystemPointListByObjectID(models.ID);
            if (p && p.length > 0) {
                p.forEach((item) => {
                    item.Lat = point.Lat;
                    item.Lon = point.Lon;
                    item.LayerType = LayerType_1.LayerType.RmpGate.value;
                    item.ObjectType = ObjectType_1.ObjectType.RmpGate.value;
                });
                r2 = yield Device_1.default.updateSystemPointList(p);
            }
            else {
                let newpoint = new SystemPoint_1.SystemPoint();
                newpoint.ObjectID = model.ID;
                newpoint.LayerType = LayerType_1.LayerType.RmpGate.value;
                newpoint.ObjectType = ObjectType_1.ObjectType.RmpGate.value;
                newpoint.Lat = point.Lat;
                newpoint.Lon = point.Lon;
                r2 = yield Device_1.default.addSystemPoint(newpoint);
            }
            if (_.isEmpty(lampPost)) {
                if (r1 && r2) {
                    return true;
                }
                else {
                    this.LOGGER.error(util.format("updata error %s %s %s", r1, r2));
                    return Promise.reject(ErrorCode_1.default.ERROR_BACK_ERROR);
                }
            }
            let r = yield Device_1.default.findDeviceRelationListForRelatedObjectID(models.ID);
            if (r && r.length > 0) {
                r.forEach((item) => {
                    item.ObjectId = lampPost.ID;
                    item.ObjectType = lampPost.ObjectType;
                });
                r3 = yield Device_1.default.updateRelationList(r);
            }
            else {
                let newRelation = new DeviceRelation_1.Relation();
                newRelation.ObjectId = lampPost.ID;
                newRelation.ObjectType = lampPost.ObjectType;
                newRelation.RelatedObjectId = model.ID;
                newRelation.RelatedObjectType = Table_Map_1.TableMap.RmpGate;
                newRelation.Type = ObjectType_1.ObjectType.RmpGate.value;
                r3 = yield Device_1.default.addRelation(newRelation);
            }
            if (r1 && r2 && r3) {
                return true;
            }
            else {
                this.LOGGER.error(util.format("updata error %s %s %s", r1, r2, r3));
                return Promise.reject(ErrorCode_1.default.ERROR_BACK_ERROR);
            }
        });
    }
    changeAreaId(models) {
        return __awaiter(this, void 0, void 0, function* () {
            let ids = [];
            let maps = {};
            models.forEach((model) => {
                ids.push(model.id);
                maps[model.id] = model;
            });
            let rmpgateList = yield RmpGateService.getRmpGateForIds(ids);
            rmpgateList.forEach((item) => {
                item.AreaID = maps[item.ID].areaId;
            });
            let result = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.RmpGateDao).updateList(rmpgateList);
            if (!result) {
                this.LOGGER.error(util.format("updata error %j", result));
                return Promise.reject(ErrorCode_1.default.ERROR);
            }
            return true;
        });
    }
    changeLampId(models) {
        return __awaiter(this, void 0, void 0, function* () {
            let errorList = [];
            models.forEach((model) => __awaiter(this, void 0, void 0, function* () {
                if (model.deviceReId) {
                    let relation = yield Device_1.default.findDeviceRelationByID(model.deviceReId);
                    if (relation) {
                        relation.ObjectId = model.lampId;
                        relation.RelatedObjectId = model.id;
                        let flag = yield Device_1.default.updateRelation(relation);
                        if (!flag)
                            errorList.push(relation.RelatedObjectId);
                    }
                    else {
                        errorList.push(model.deviceReId);
                    }
                }
                else {
                    let relation = new DeviceRelation_1.Relation();
                    relation.ObjectId = model.lampId;
                    relation.ObjectType = Table_Map_1.TableMap.Lamp;
                    relation.RelatedObjectId = model.id;
                    relation.RelatedObjectType = Table_Map_1.TableMap.RmpGate;
                    relation.Type = ObjectType_1.ObjectType.RmpGate.value;
                    let flag = yield Device_1.default.addRelation(relation);
                    if (!flag)
                        errorList.push(relation.RelatedObjectId);
                }
            }));
            if (errorList.length > 0) {
                this.LOGGER.error(util.format("updata error %s", errorList));
                return Promise.reject(ErrorCode_1.default.ERROR);
            }
            return true;
        });
    }
    static updateRmpGate(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.RmpGateDao).update(model).then((res) => __awaiter(this, void 0, void 0, function* () {
                return res.data;
            }));
        });
    }
    static getRmpGateForIds(ids) {
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.RmpGateDao).findListByID(ids).then((res) => {
            return res.data;
        });
    }
}
exports.RmpGateService = RmpGateService;
