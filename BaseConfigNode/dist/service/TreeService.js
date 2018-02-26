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
const Area_1 = require("../extend/Area");
const Camera_1 = require("../extend/Camera");
const Wifi_1 = require("../extend/Wifi");
const Rmpgate_1 = require("../extend/Rmpgate");
const ElectronicFence_1 = require("../extend/ElectronicFence");
const Lamp_1 = require("../extend/Lamp");
const Table_Map_1 = require("../model/Table-Map");
const log4js = require("log4js");
const ErrorCode_1 = require("../common/res/ErrorCode");
const TreeType_1 = require("../core/enum/TreeType");
const BeanHelper_1 = require("../common/help/BeanHelper");
const DaoType_1 = require("../dao/enum/DaoType");
const ExtendUtils_1 = require("../utils/ExtendUtils");
const WhereLib_1 = require("../model/WhereLib");
const FildNameLib_1 = require("../model/FildNameLib");
const ObjectType_1 = require("../core/enum/ObjectType");
class TreeService {
    constructor() {
    }
    static copyAreaNode(area) {
        let newAreaNode = ExtendUtils_1.extend({}, area);
        newAreaNode.ParentID = area.ID;
        newAreaNode.ID = `_${area.ID}`;
        newAreaNode.Name = `（本部）${area.Name}`;
        return newAreaNode;
    }
    static setLampConfigStatus(list, relationList) {
        for (let l = 0; l <= list.length; l++) {
            let item = list[l];
            if (item) {
                for (let i = 0; i <= relationList.length; i++) {
                    let item2 = relationList[i];
                    if (item2 && item.ID === item2.RelatedObjectId) {
                        item.isConfigLamp = true;
                        relationList.splice(i, 1);
                        break;
                    }
                }
            }
            if (relationList.length === 0) {
                break;
            }
        }
        return list;
    }
    static setPointConfigStatus(list, pointList) {
        for (let l = 0; l <= list.length; l++) {
            let item = list[l];
            if (item) {
                for (let i = 0; i <= pointList.length; i++) {
                    let item2 = pointList[i];
                    if (item2 && item.ID === item2.ObjectID) {
                        item.isConfigPoint = true;
                        pointList.splice(i, 1);
                        break;
                    }
                }
            }
            if (pointList.length === 0) {
                break;
            }
        }
        return list;
    }
    findAreaListWithCamera(search) {
        return __awaiter(this, void 0, void 0, function* () {
            let r = yield Promise.all([
                Area_1.default.getPosaDPJavaCache(search),
                Camera_1.default.getPosaDPJavaCache(search),
                BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.DeviceRelationDao).findListByWhere([
                    WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.ObjectType, ObjectType_1.ObjectType.LampPost.value),
                    WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.RelatedObjectType, ObjectType_1.ObjectType.Camera.value)
                ]),
                BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.SystemPointDao).findListByWhere([
                    WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.ObjectType, ObjectType_1.ObjectType.Camera.value)
                ])
            ]);
            (!r[0].data || !Array.isArray(r[0].data)) && (r[0].data = []);
            (!r[1].data || !Array.isArray(r[1].data)) && (r[1].data = []);
            (!r[2].data || !Array.isArray(r[2].data)) && (r[2].data = []);
            (!r[3].data || !Array.isArray(r[3].data)) && (r[3].data = []);
            r[1].data = TreeService.setLampConfigStatus(r[1].data, r[2].data);
            r[1].data = TreeService.setPointConfigStatus(r[1].data, r[3].data);
            let result = [];
            let mergeAreaList = [];
            r[0].data.forEach((area) => {
                for (let i = 0; i < r[1].data.length; i++) {
                    let camera = r[1].data[i];
                    if (camera.AreaID === area.ID) {
                        let newNode = TreeService.copyAreaNode(area);
                        camera.ParentID = newNode.ID;
                        if (mergeAreaList.filter((item) => item.ID === camera.ParentID).length === 0) {
                            mergeAreaList.push(newNode);
                        }
                    }
                }
            });
            return result.concat(mergeAreaList, r[0].data, r[1].data);
        });
    }
    findAreaListWithRfid(search) {
        return __awaiter(this, void 0, void 0, function* () {
            let wheres = [];
            if (search) {
                wheres.push(WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.Name, search));
            }
            let r = yield Promise.all([
                Area_1.default.getPosaDPJavaCache(search),
                BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.RfidDao).findListByWhere(wheres)
            ]);
            let result = [];
            if (Array.isArray(r[0].data) && Array.isArray(r[1].data)) {
                if (r[1].data.length > 0) {
                    let iconSkinWifi = TreeType_1.TreeIconSkin.wifi;
                    let treeTypeWifi = TreeType_1.TreeType.wifi.value;
                    let iconSkinEle = TreeType_1.TreeIconSkin.ElectronicFence;
                    let treeTypeEle = TreeType_1.TreeType.ElectronicFence.value;
                    r[1].data.forEach((item) => {
                        if (item.Type === ObjectType_1.ObjectType.Wifi.value) {
                            item.treeType = treeTypeWifi;
                            item.iconSkin = iconSkinWifi;
                        }
                        if (item.Type === ObjectType_1.ObjectType.ElectronicFence.value) {
                            item.treeType = treeTypeEle;
                            item.iconSkin = iconSkinEle;
                        }
                        item.ParentID = item.AreaID;
                    });
                }
                let mergeAreaList = [];
                r[0].data.forEach((area) => {
                    for (let i = 0; i < r[1].data.length; i++) {
                        let camera = r[1].data[i];
                        if (camera.AreaID === area.ID) {
                            let newNode = TreeService.copyAreaNode(area);
                            camera.ParentID = newNode.ID;
                            if (mergeAreaList.filter((item) => item.ID === camera.ParentID).length === 0) {
                                mergeAreaList.push(newNode);
                            }
                        }
                    }
                });
                return result.concat(mergeAreaList, r[0].data, r[1].data);
            }
            else {
                return Promise.reject(ErrorCode_1.default.ERROR_BACK_ERROR);
            }
        });
    }
    findAreaListWithWifi(search) {
        return __awaiter(this, void 0, void 0, function* () {
            let r = yield Promise.all([
                Area_1.default.getPosaDPJavaCache(search),
                Wifi_1.default.getPosaDPJavaCache(search),
                BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.DeviceRelationDao).findListByWhere([
                    WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.ObjectType, ObjectType_1.ObjectType.LampPost.value),
                    WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.Type, ObjectType_1.ObjectType.Wifi.value)
                ]),
                BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.SystemPointDao).findListByWhere([
                    WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.ObjectType, ObjectType_1.ObjectType.Wifi.value)
                ])
            ]);
            (!r[0].data || !Array.isArray(r[0].data)) && (r[0].data = []);
            (!r[1].data || !Array.isArray(r[1].data)) && (r[1].data = []);
            (!r[2].data || !Array.isArray(r[2].data)) && (r[2].data = []);
            (!r[3].data || !Array.isArray(r[3].data)) && (r[3].data = []);
            r[1].data = TreeService.setLampConfigStatus(r[1].data, r[2].data);
            r[1].data = TreeService.setPointConfigStatus(r[1].data, r[3].data);
            let result = [];
            let mergeAreaList = [];
            r[0].data.forEach((area) => {
                for (let i = 0; i < r[1].data.length; i++) {
                    let camera = r[1].data[i];
                    if (camera.AreaID === area.ID) {
                        let newNode = TreeService.copyAreaNode(area);
                        camera.ParentID = newNode.ID;
                        if (mergeAreaList.filter((item) => item.ID === camera.ParentID).length === 0) {
                            mergeAreaList.push(newNode);
                        }
                    }
                }
            });
            return result.concat(mergeAreaList, r[0].data, r[1].data);
        });
    }
    findAreaListWithRmpgate(search) {
        return __awaiter(this, void 0, void 0, function* () {
            let r = yield Promise.all([
                Area_1.default.getPosaDPJavaCache(search),
                Rmpgate_1.default.getPosaDPJavaCache(search),
                BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.DeviceRelationDao).findListByWhere([
                    WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.ObjectType, ObjectType_1.ObjectType.LampPost.value),
                    WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.RelatedObjectType, ObjectType_1.ObjectType.RmpGate.value)
                ]),
                BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.SystemPointDao).findListByWhere([
                    WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.ObjectType, ObjectType_1.ObjectType.RmpGate.value)
                ])
            ]);
            (!r[0].data || !Array.isArray(r[0].data)) && (r[0].data = []);
            (!r[1].data || !Array.isArray(r[1].data)) && (r[1].data = []);
            (!r[2].data || !Array.isArray(r[2].data)) && (r[2].data = []);
            (!r[3].data || !Array.isArray(r[3].data)) && (r[3].data = []);
            r[1].data = TreeService.setLampConfigStatus(r[1].data, r[2].data);
            r[1].data = TreeService.setPointConfigStatus(r[1].data, r[3].data);
            let result = [];
            let mergeAreaList = [];
            r[0].data.forEach((area) => {
                for (let i = 0; i < r[1].data.length; i++) {
                    let camera = r[1].data[i];
                    if (camera.AreaID === area.ID) {
                        let newNode = TreeService.copyAreaNode(area);
                        camera.ParentID = newNode.ID;
                        if (mergeAreaList.filter((item) => item.ID === camera.ParentID).length === 0) {
                            mergeAreaList.push(newNode);
                        }
                    }
                }
            });
            return result.concat(mergeAreaList, r[0].data, r[1].data);
        });
    }
    findAreaListWithElectronicfence(search) {
        return __awaiter(this, void 0, void 0, function* () {
            let r = yield Promise.all([
                Area_1.default.getPosaDPJavaCache(search),
                ElectronicFence_1.default.getPosaDPJavaCache(search),
                BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.DeviceRelationDao).findListByWhere([
                    WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.ObjectType, ObjectType_1.ObjectType.LampPost.value),
                    WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.Type, ObjectType_1.ObjectType.ElectronicFence.value)
                ]),
                BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.SystemPointDao).findListByWhere([
                    WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.ObjectType, ObjectType_1.ObjectType.ElectronicFence.value)
                ])
            ]);
            (!r[0].data || !Array.isArray(r[0].data)) && (r[0].data = []);
            (!r[1].data || !Array.isArray(r[1].data)) && (r[1].data = []);
            (!r[2].data || !Array.isArray(r[2].data)) && (r[2].data = []);
            (!r[3].data || !Array.isArray(r[3].data)) && (r[3].data = []);
            r[1].data = TreeService.setLampConfigStatus(r[1].data, r[2].data);
            r[1].data = TreeService.setPointConfigStatus(r[1].data, r[3].data);
            let result = [];
            let mergeAreaList = [];
            r[0].data.forEach((area) => {
                for (let i = 0; i < r[1].data.length; i++) {
                    let camera = r[1].data[i];
                    if (camera.AreaID === area.ID) {
                        let newNode = TreeService.copyAreaNode(area);
                        camera.ParentID = newNode.ID;
                        if (mergeAreaList.filter((item) => item.ID === camera.ParentID).length === 0) {
                            mergeAreaList.push(newNode);
                        }
                    }
                }
            });
            return result.concat(mergeAreaList, r[0].data, r[1].data);
        });
    }
    findAreaListWithLamp(search) {
        return __awaiter(this, void 0, void 0, function* () {
            let r = yield Promise.all([Area_1.default.getPosaDPJavaCache(search), Lamp_1.default.getPosaDPJavaCache(search)]);
            let result = [];
            if (Array.isArray(r[0].data) && Array.isArray(r[1].data)) {
                let mergeAreaList = [];
                r[0].data.forEach((area) => {
                    for (let i = 0; i < r[1].data.length; i++) {
                        let lamp = r[1].data[i];
                        if (lamp.AreaID === area.ID) {
                            let newNode = TreeService.copyAreaNode(area);
                            lamp.ParentID = newNode.ID;
                            if (mergeAreaList.filter((item) => item.ID === lamp.ParentID).length === 0) {
                                mergeAreaList.push(newNode);
                            }
                        }
                    }
                });
                return result.concat(mergeAreaList, r[0].data, r[1].data);
            }
            else {
                return Promise.reject(ErrorCode_1.default.ERROR_BACK_ERROR);
            }
        });
    }
    findAreaListWithPerson(search) {
        return __awaiter(this, void 0, void 0, function* () {
            let r = yield Promise.all([Area_1.default.getPosaDPJavaCache(search), BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.PersonDao).findAll()]);
            let result = [];
            if (Array.isArray(r[0].data) && Array.isArray(r[1].data)) {
                if (r[1].data.length > 0) {
                    let iconSkin = TreeType_1.TreeIconSkin.Person;
                    let treeType = TreeType_1.TreeType.person.value;
                    r[1].data.forEach((item) => {
                        item.treeType = treeType;
                        item.iconSkin = iconSkin;
                        item.ParentID = item.AreaID;
                    });
                }
                let mergeAreaList = [];
                r[0].data.forEach((area) => {
                    for (let i = 0; i < r[1].data.length; i++) {
                        let camera = r[1].data[i];
                        if (camera.AreaID === area.ID) {
                            let newNode = TreeService.copyAreaNode(area);
                            camera.ParentID = newNode.ID;
                            if (mergeAreaList.filter((item) => item.ID === camera.ParentID).length === 0) {
                                mergeAreaList.push(newNode);
                            }
                        }
                    }
                });
                return result.concat(mergeAreaList, r[0].data, r[1].data);
            }
            else {
                return Promise.reject(ErrorCode_1.default.ERROR_BACK_ERROR);
            }
        });
    }
    findAreaListWithUser(search) {
        return __awaiter(this, void 0, void 0, function* () {
            let r = yield Promise.all([
                Area_1.default.getPosaDPJavaCache(search),
                BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.PersonDao).findAll(),
                BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UserDao).findAll()
            ]);
            let result = [];
            let r1 = r[0].data;
            let r2 = r[1].data;
            let r3 = r[2].data;
            let iconSkin = TreeType_1.TreeIconSkin.Person;
            let treeType = TreeType_1.TreeType.person.value;
            if (Array.isArray(r1) && Array.isArray(r2) && Array.isArray(r3)) {
                r2.forEach((person) => {
                    r3.forEach((user) => {
                        if (person.ID == user.PersonID) {
                            user.AreaID = person.AreaID;
                            user.treeType = treeType;
                            user.iconSkin = iconSkin;
                            user.ParentID = person.AreaID;
                            user.Name = person.Name;
                        }
                    });
                });
                let mergeAreaList = [];
                r1.forEach((area) => {
                    for (let i = 0; i < r3.length; i++) {
                        let camera = r3[i];
                        if (camera.AreaID === area.ID) {
                            let newNode = TreeService.copyAreaNode(area);
                            camera.ParentID = newNode.ID;
                            if (mergeAreaList.filter((item) => item.ID === camera.ParentID).length === 0) {
                                mergeAreaList.push(newNode);
                            }
                        }
                    }
                });
                return result.concat(mergeAreaList, r1, r3);
            }
            else {
                return Promise.reject(ErrorCode_1.default.ERROR_BACK_ERROR);
            }
        });
    }
    findLampListWithAndElectronicfenceTree(search) {
        return __awaiter(this, void 0, void 0, function* () {
            let r = yield Promise.all([
                Area_1.default.getPosaDPJavaCache(search),
                Lamp_1.default.getPosaDPJavaCache(search),
                ElectronicFence_1.default.getPosaDPJavaCache(search),
                TreeService.FindRelationTable(Table_Map_1.TableMap.Lamp, Table_Map_1.TableMap.Rfid)
            ]);
            let r1 = r[0].data;
            let r2 = r[1].data;
            let r3 = r[2].data;
            let r4 = r[3];
            if (!Array.isArray(r[0].data) || !Array.isArray(r[1].data) || !Array.isArray(r[2].data)) {
                return Promise.reject(ErrorCode_1.default.ERROR_BACK_ERROR);
            }
            let isBindLampElectronicFenceEx = [];
            let tempRelation = {};
            r4.forEach((item) => {
                tempRelation[item.RelatedObjectId] = item;
            });
            r3.forEach((item) => {
                if (tempRelation[item.ID]) {
                    item.ParentID = tempRelation[item.ID].ObjectId;
                    item.JsonUserData.DeviceReId = tempRelation[item.ID].ID;
                    isBindLampElectronicFenceEx.push(item);
                }
            });
            let result = [];
            return result.concat(r1, r2, isBindLampElectronicFenceEx);
        });
    }
    findLampListWithWifiTree(search) {
        return __awaiter(this, void 0, void 0, function* () {
            let r = yield Promise.all([
                Area_1.default.getPosaDPJavaCache(search),
                Lamp_1.default.getPosaDPJavaCache(search),
                Wifi_1.default.getPosaDPJavaCache(search),
                TreeService.FindRelationTable(Table_Map_1.TableMap.Lamp, Table_Map_1.TableMap.Rfid)
            ]);
            let r1 = r[0].data;
            let r2 = r[1].data;
            let r3 = r[2].data;
            let r4 = r[3];
            if (!Array.isArray(r[0].data) || !Array.isArray(r[1].data) || !Array.isArray(r[2].data)) {
                return Promise.reject(ErrorCode_1.default.ERROR_BACK_ERROR);
            }
            let isBindLampWifiEx = [];
            let tempRelation = {};
            r4.forEach((item) => {
                tempRelation[item.RelatedObjectId] = item;
            });
            r3.forEach((item) => {
                if (tempRelation[item.ID]) {
                    item.ParentID = tempRelation[item.ID].ObjectId;
                    item.JsonUserData.DeviceReId = tempRelation[item.ID].ID;
                    isBindLampWifiEx.push(item);
                }
            });
            let result = [];
            return result.concat(r1, r2, isBindLampWifiEx);
        });
    }
    findLampListTreeWithCamera(search) {
        return __awaiter(this, void 0, void 0, function* () {
            let r = yield Promise.all([
                Area_1.default.getPosaDPJavaCache(search),
                Lamp_1.default.getPosaDPJavaCache(search),
                Camera_1.default.getPosaDPJavaCache(search),
                TreeService.FindRelationTable(Table_Map_1.TableMap.Lamp, Table_Map_1.TableMap.Camera)
            ]);
            let r1 = r[0].data;
            let r2 = r[1].data;
            let r3 = r[2].data;
            let r4 = r[3];
            if (!Array.isArray(r[0].data) || !Array.isArray(r[1].data) || !Array.isArray(r[2].data)) {
                return Promise.reject(ErrorCode_1.default.ERROR_BACK_ERROR);
            }
            let isBindLampCametaEx = [];
            let tempRelation = {};
            r4.forEach((item) => {
                tempRelation[item.RelatedObjectId] = item;
            });
            r3.forEach((item) => {
                if (tempRelation[item.ID]) {
                    item.ParentID = tempRelation[item.ID].ObjectId;
                    item.JsonUserData.DeviceReId = tempRelation[item.ID].ID;
                    isBindLampCametaEx.push(item);
                }
            });
            let result = [];
            return result.concat(r1, r2, isBindLampCametaEx);
        });
    }
    findLampListTreeWithRmpGate(search) {
        return __awaiter(this, void 0, void 0, function* () {
            let r = yield Promise.all([
                Area_1.default.getPosaDPJavaCache(search),
                Lamp_1.default.getPosaDPJavaCache(search),
                Rmpgate_1.default.getPosaDPJavaCache(search),
                TreeService.FindRelationTable(Table_Map_1.TableMap.Lamp, Table_Map_1.TableMap.RmpGate)
            ]);
            let r1 = r[0].data;
            let r2 = r[1].data;
            let r3 = r[2].data;
            let r4 = r[3];
            if (!Array.isArray(r[0].data) || !Array.isArray(r[1].data) || !Array.isArray(r[2].data)) {
                return Promise.reject(ErrorCode_1.default.ERROR_BACK_ERROR);
            }
            let isBindLampRmpGateExEx = [];
            let tempRelation = {};
            r4.forEach((item) => {
                tempRelation[item.RelatedObjectId] = item;
            });
            r3.forEach((item) => {
                if (tempRelation[item.ID]) {
                    item.ParentID = tempRelation[item.ID].ObjectId;
                    item.JsonUserData.DeviceReId = tempRelation[item.ID].ID;
                    isBindLampRmpGateExEx.push(item);
                }
            });
            let result = [];
            return result.concat(r1, r2, isBindLampRmpGateExEx);
        });
    }
    static FindRelationTable(type, relationType) {
        return __awaiter(this, void 0, void 0, function* () {
            let wheres = [];
            if (type) {
                wheres.push(WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.ObjectType, type));
            }
            if (relationType) {
                wheres.push(WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.RelatedObjectType, relationType));
            }
            let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.DeviceRelationDao).findListByWhere(wheres);
            return res.data ? res.data : [];
        });
    }
}
TreeService.LOGGER = log4js.getLogger("TreeService");
exports.TreeService = TreeService;
