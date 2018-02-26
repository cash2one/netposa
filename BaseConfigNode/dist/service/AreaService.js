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
const log4js = require("log4js");
const util = require("util");
const Area_col_1 = require("../model/table-col/Area_col");
const Area_1 = require("../extend/Area");
const ChildWhere_1 = require("../common/ChildWhere");
const DataType_1 = require("../common/DataType");
const ErrorCode_1 = require("../common/res/ErrorCode");
const JoinType_1 = require("../common/JoinType");
const MatchingType_1 = require("../common/MatchingType");
const Where_1 = require("../common/Where");
const PersonParams_1 = require("../core/params/PersonParams");
const ResponseResult_1 = require("../core/params/result/ResponseResult");
const BeanHelper_1 = require("../common/help/BeanHelper");
const Camera_col_1 = require("../model/table-col/Camera_col");
const DaoType_1 = require("../dao/enum/DaoType");
const WhereLib_1 = require("../model/WhereLib");
const FildNameLib_1 = require("../model/FildNameLib");
const BDaoImpl_1 = require("../dao/core/BDaoImpl");
const TreeType_1 = require("../core/enum/TreeType");
class AreaService {
    constructor() {
    }
    findAreaListTree(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Area_1.default.getPosaDPJavaCache(params ? params.keyword : null);
        });
    }
    findAreaListWithPerson(search) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield Promise.all([Area_1.default.getPosaDPJavaCache(search), this.FindPersonList(search)]);
            let result = new PersonParams_1.AreaAndPersonListResult();
            result.areaExList = res[0].data;
            result.personExList = res[1];
            return result;
        });
    }
    save(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params || params.Code == null || params.ParentID == null) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let r1 = yield AreaService.exist(params.Code);
            let r2 = yield AreaService.existById(params.ParentID);
            if (r1 && r2) {
                if (r1.data && r1.data.length > 0) {
                    return Promise.reject(ErrorCode_1.default.ERROR_REPEAT_LAMP);
                }
                else if (!r2.data) {
                    return Promise.reject(ErrorCode_1.default.ERROR_NO_PARENT_AREA);
                }
                else {
                    params.CreateTime = Date.now().toString();
                    return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.AreaDao).save(params, BDaoImpl_1.ServerType.BCS).then((res) => {
                        return res;
                    });
                }
            }
            else {
                return Promise.reject(ErrorCode_1.default.ERROR_BACK_ERROR);
            }
        });
    }
    update(params) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(params);
            let isRootArea = false;
            if (!params || params.ID == null) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_AREA);
            }
            if (!params || params.Code == null) {
                return Promise.reject(ErrorCode_1.default.ERROR_AREA_CODE_NULL);
            }
            if (!params || params.ParentID == null) {
                let res = yield this.detail(params.ID);
                if (res.data && res.data.ParentID == null) {
                    AreaService.LOGGER.debug("是根节点, 可以进行下一步操作");
                    isRootArea = true;
                    return null;
                }
                else {
                    return Promise.reject(ErrorCode_1.default.ERROR_NO_PARENT_AREA);
                }
            }
            if (!params || params.ParentID === params.ID) {
                return Promise.reject(ErrorCode_1.default.ERROR_PARENT_AREA_NOT_SELF);
            }
            let r1 = yield AreaService.exist(params.Code), parentArea = yield AreaService.existById(params.ParentID);
            if (r1) {
                let areas = r1.data, i, len, isSameCode = false;
                if (areas) {
                    for (i = 0, len = areas.length; i < len; i++) {
                        if (areas[i].ID !== params.ID) {
                            isSameCode = true;
                            break;
                        }
                    }
                }
                if (isSameCode) {
                    return Promise.reject(ErrorCode_1.default.ERROR_REPEAT_AREA);
                }
                if (!parentArea && !isRootArea) {
                    return Promise.reject(ErrorCode_1.default.ERROR_NO_PARENT_AREA);
                }
            }
            else {
                return Promise.reject(ErrorCode_1.default.ERROR);
            }
            let originArea = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.AreaDao).findByID(params.ID, BDaoImpl_1.ServerType.BCS).then((res) => {
                return res.data;
            });
            if (!originArea) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_AREA);
            }
            originArea.PYCode = params.PYCode;
            originArea.ParentID = params.ParentID;
            originArea.Code = params.Code;
            originArea.Description = params.Description;
            originArea.Name = params.Name;
            originArea.OrderNum = params.OrderNum;
            originArea.Ext = params.Ext;
            return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.AreaDao).update(originArea, BDaoImpl_1.ServerType.BCS).then((res) => {
                return res;
            });
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id == null) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_AREA);
            }
            let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.AreaDao).findByID(id, BDaoImpl_1.ServerType.BCS);
            if (res.data && !res.data.ParentID) {
                return Promise.reject(ErrorCode_1.default.ERROR_NOT_DELETE_ROOT_AREA);
            }
            let result = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.AreaDao).delete([id], BDaoImpl_1.ServerType.BCS);
            if (result.data) {
                AreaService.changeAreaWithAllRelation(res.data.ID, res.data.ParentID).then(() => {
                    AreaService.LOGGER.info('已更新区域相关的所有对象');
                }).catch((e) => {
                    AreaService.LOGGER.error(util.format('更新区域相关的所有对象出现异常 area: %j, error: %j', result.data, e));
                });
            }
            return result;
        });
    }
    static changeAreaWithAllRelation(id, parentId) {
        let wheres = [WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.AreaID, id)];
        return Promise.all([
            changeArea(),
            changePerson(),
            changUnit(),
            changeVideoServer(),
            changeIodServer(),
            changeIvsServer(),
            changeCamera(),
            changeRmpGate(),
            changeRfid(),
            changeLamp(),
            changeFaceLib()
        ]);
        function changeArea() {
            return __awaiter(this, void 0, void 0, function* () {
                let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.AreaDao).findListByWhere([
                    WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.ParentID, id)
                ]);
                let areaList = Array.isArray(res.data) ? res.data : [];
                if (areaList.length > 0) {
                    areaList.forEach((area) => {
                        area.ParentID = parentId;
                    });
                    return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.AreaDao).updateList(areaList, BDaoImpl_1.ServerType.BCS);
                }
            });
        }
        function changUnit() {
            return __awaiter(this, void 0, void 0, function* () {
                let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UnitDao).findListByWhere(wheres);
                let unitList = Array.isArray(res.data) ? res.data : [];
                if (unitList.length > 0) {
                    unitList.forEach((unit) => {
                        unit.AreaID = parentId;
                    });
                    return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UnitDao).updateList(unitList, BDaoImpl_1.ServerType.BCS);
                }
            });
        }
        function changePerson() {
            return __awaiter(this, void 0, void 0, function* () {
                let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.PersonDao).findListByWhere(wheres);
                let personList = Array.isArray(res.data) ? res.data : [];
                if (personList.length > 0) {
                    personList.forEach((person) => {
                        person.AreaID = parentId;
                    });
                    return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.PersonDao).updateList(personList, BDaoImpl_1.ServerType.BCS);
                }
            });
        }
        function changeVideoServer() {
            return __awaiter(this, void 0, void 0, function* () {
                let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.VideoServerDao).findListByWhere(wheres);
                let videoServerList = Array.isArray(res.data) ? res.data : [];
                if (videoServerList.length > 0) {
                    videoServerList.forEach((person) => {
                        person.AreaID = parentId;
                    });
                    return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.VideoServerDao).updateList(videoServerList, BDaoImpl_1.ServerType.BCS);
                }
            });
        }
        function changeIodServer() {
            return __awaiter(this, void 0, void 0, function* () {
                let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.IodDao).findListByWhere(wheres);
                let iodServerList = Array.isArray(res.data) ? res.data : [];
                if (iodServerList.length > 0) {
                    iodServerList.forEach((person) => {
                        person.AreaID = parentId;
                    });
                    return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.IodDao).updateList(iodServerList);
                }
            });
        }
        function changeIvsServer() {
            return __awaiter(this, void 0, void 0, function* () {
                let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.IvsServerDao).findListByWhere(wheres);
                let IvsServerList = Array.isArray(res.data) ? res.data : [];
                if (IvsServerList.length > 0) {
                    IvsServerList.forEach((person) => {
                        person.AreaID = parentId;
                    });
                    return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.IvsServerDao).updateList(IvsServerList);
                }
            });
        }
        function changeCamera() {
            return __awaiter(this, void 0, void 0, function* () {
                let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.CameraDao).findListByWhere(wheres);
                let cameraList = Array.isArray(res.data) ? res.data : [];
                if (cameraList.length > 0) {
                    cameraList.forEach((person) => {
                        person.AreaID = parentId;
                    });
                    return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.CameraDao).updateList(cameraList, BDaoImpl_1.ServerType.BCS);
                }
            });
        }
        function changeRmpGate() {
            return __awaiter(this, void 0, void 0, function* () {
                let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.RmpGateDao).findListByWhere(wheres);
                let rmpGateList = Array.isArray(res.data) ? res.data : [];
                if (rmpGateList.length > 0) {
                    rmpGateList.forEach((person) => {
                        person.AreaID = parentId;
                    });
                    return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.RmpGateDao).updateList(rmpGateList);
                }
            });
        }
        function changeRfid() {
            return __awaiter(this, void 0, void 0, function* () {
                let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.RfidDao).findListByWhere(wheres);
                let rfidList = Array.isArray(res.data) ? res.data : [];
                if (rfidList.length > 0) {
                    rfidList.forEach((person) => {
                        person.AreaID = parentId;
                    });
                    return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.RfidDao).updateList(rfidList);
                }
            });
        }
        function changeLamp() {
            return __awaiter(this, void 0, void 0, function* () {
                let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.LampDao).findListByWhere(wheres);
                let lampList = Array.isArray(res.data) ? res.data : [];
                if (lampList.length > 0) {
                    lampList.forEach((person) => {
                        person.AreaID = parentId;
                    });
                    return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.LampDao).updateList(lampList);
                }
            });
        }
        function changeFaceLib() {
            return __awaiter(this, void 0, void 0, function* () {
                let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.BusinessLibDao).findListByWhere(wheres);
                let lampList = Array.isArray(res.data) ? res.data : [];
                if (lampList.length > 0) {
                    lampList.forEach((person) => {
                        person.AreaID = parentId;
                    });
                    return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.BusinessLibDao).updateList(lampList);
                }
            });
        }
    }
    deleteByIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ids) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_AREA);
            }
            let actionList = [];
            for (let i = 0; i < ids.length; i++) {
                let res = yield this.deleteById(ids[i]);
                actionList.push(res.data);
            }
            let result = new ResponseResult_1.BackResponseBody();
            result.code = ErrorCode_1.default.OK;
            result.data = actionList;
            return result;
        });
    }
    detail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id == null) {
                return Promise.reject(ErrorCode_1.default.ERROR_AREA_ID_NULL);
            }
            let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.AreaDao).findByID(id, BDaoImpl_1.ServerType.BCS);
            if (res.data != null && res.data.ParentID != null) {
                return yield this.findParentArea(res);
            }
            else {
                return res;
            }
        });
    }
    findParentArea(result) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.AreaDao).findByID(result.data.ParentID, BDaoImpl_1.ServerType.BCS).then((res) => {
                if (res.data != null) {
                    result.data.ParentArea = res.data;
                }
                return result;
            });
        });
    }
    static exist(code) {
        let whereList = [], where, childWheres = [], childWhere;
        where = new Where_1.default();
        childWhere = new ChildWhere_1.default();
        childWhere.FieldName = Area_col_1.default.Code;
        childWhere.FieldType = DataType_1.default.Text;
        childWhere.FieldValue = code;
        childWhere.MType = MatchingType_1.default.Equal;
        childWhere.JType = JoinType_1.default.And;
        childWheres.push(childWhere);
        where.Childs = childWheres;
        whereList.push(where);
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.AreaDao).findListByWhere(whereList, BDaoImpl_1.ServerType.BCS);
    }
    static existById(id) {
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.AreaDao).findByID(id, BDaoImpl_1.ServerType.BCS);
    }
    FindPersonList(search) {
        return Promise.resolve(null).then(() => {
            let wheres = [];
            if (search != null) {
                let where = new Where_1.default();
                let childWheres = [];
                let childWhere = new ChildWhere_1.default();
                childWhere.FieldName = Camera_col_1.CameraCol.Name;
                childWhere.FieldValue = search;
                childWhere.FieldType = DataType_1.default.Text;
                childWhere.MType = MatchingType_1.default.Like;
                childWhere.JType = JoinType_1.default.And;
                childWheres.push(childWhere);
                where.Childs = childWheres;
                wheres.push(where);
            }
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.PersonDao).findListByWhere(wheres);
        }).then((data) => {
            let result = data.data || [];
            let treeType = TreeType_1.TreeType.person.value, iconSkin = TreeType_1.TreeIconSkin.Person;
            result.forEach((item) => {
                item.treeType = treeType;
                item.iconSkin = iconSkin;
                item.ParentID = item.AreaID;
            });
            return result;
        });
    }
    static sleep(timer) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, timer);
        });
    }
}
AreaService.LOGGER = log4js.getLogger("AreaService");
exports.AreaService = AreaService;
