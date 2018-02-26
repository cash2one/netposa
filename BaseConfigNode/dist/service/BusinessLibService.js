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
const BusinessLib_col_1 = require("../model/table-col/BusinessLib_col");
const CommonUtils_1 = require("../utils/CommonUtils");
const log4js = require("log4js");
const util = require("util");
const Area_1 = require("../extend/Area");
const BusinessLib_1 = require("../extend/BusinessLib");
const BeanHelper_1 = require("../common/help/BeanHelper");
const DaoType_1 = require("../dao/enum/DaoType");
const WhereLib_1 = require("../model/WhereLib");
const FildNameLib_1 = require("../model/FildNameLib");
const ObjectType_1 = require("../core/enum/ObjectType");
const BusinessLibOperateType_1 = require("../core/server/enum/BusinessLibOperateType");
class BusinessLibService {
    constructor() {
    }
    findBusinessLibTree(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params || params.areaId == null) {
                BusinessLibService.LOGGER.error(util.format('params %j', params));
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let datas = yield BusinessLib_1.default.getBusinessLib();
            return CommonUtils_1.default.convert2Ztree(datas, BusinessLib_col_1.default.ID, BusinessLib_col_1.default.ParentID, "children");
        });
    }
    findBusinessLibHasSelfTree(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield BusinessLib_1.default.getBusinessLib(null, params.areaId);
            if (result.data && result.data.length > 0) {
                let resultList = [];
                let allParentIdMap = {};
                result.data.forEach((item) => {
                    item.treeID = item.ID;
                    if (item.ParentID) {
                        if (!Array.isArray(allParentIdMap[item.ParentID])) {
                            allParentIdMap[item.ParentID] = [];
                        }
                        allParentIdMap[item.ParentID].push(item);
                    }
                });
                result.data.forEach((item) => {
                    if (allParentIdMap[item.ID]) {
                        let newChildNode = copyCurrentToParentNode(item);
                        item.ID = `_${item.ID}`;
                        resultList.push(newChildNode);
                    }
                });
                return resultList.concat(result.data);
            }
            return [];
            function copyCurrentToParentNode(item) {
                let newChildNode = Object.assign({}, item);
                newChildNode.ID = item.ID;
                newChildNode.treeParentId = item.ID;
                newChildNode.Name = `（本部）${item.Name}`;
                newChildNode.treeID = `_${item.ID}`;
                return newChildNode;
            }
        });
    }
    findBusinessLibTreeWithArea() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.findHasSelfBusinessLibAndAreaTree();
            return [].concat(res.areaExList, res.businessLibExList);
        });
    }
    findTreeAreaWithRole() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.findHasSelfBusinessLibAndAreaTree();
            let moduleList = [];
            res.businessLibExList.forEach((item) => {
                let j = {};
                j.ParentID = item.AreaID;
                j.ID = item.ID;
                j.ObjectType = ObjectType_1.ObjectType.BusinessLib.value;
                j.ObjectID = item.ID;
                j.Name = item.Name.trim();
                j.operateForFaceLib = BusinessLibService.setOperateList(item);
                moduleList.push(j);
            });
            res.areaExList.forEach((item) => {
                item.ParentID = null;
            });
            return [].concat(res.areaExList, moduleList);
        });
    }
    static setOperateList(faceLib) {
        let arr = [];
        arr.push(Object.assign({}, BusinessLibOperateType_1.BusinessLibOperateType.Search, { IsEnabled: false, IsSlide: false, ParentID: faceLib.ID }));
        arr.push(Object.assign({}, BusinessLibOperateType_1.BusinessLibOperateType.Update, { IsEnabled: false, IsSlide: false, ParentID: faceLib.ID }));
        arr.push(Object.assign({}, BusinessLibOperateType_1.BusinessLibOperateType.Export, { IsEnabled: false, IsSlide: false, ParentID: faceLib.ID }));
        arr.push(Object.assign({}, BusinessLibOperateType_1.BusinessLibOperateType.Name, { IsEnabled: false, IsSlide: true, ParentID: faceLib.ID, SlideIndex: -1, SlideList: [Object.assign({}, BusinessLibOperateType_1.BusinessLibOperateType.NamePart, { IsEnabled: false }), Object.assign({}, BusinessLibOperateType_1.BusinessLibOperateType.NameNone, { IsEnabled: false })] }));
        arr.push(Object.assign({}, BusinessLibOperateType_1.BusinessLibOperateType.IdCard, { IsEnabled: false, IsSlide: true, ParentID: faceLib.ID, SlideIndex: -1, SlideList: [Object.assign({}, BusinessLibOperateType_1.BusinessLibOperateType.IdCardPart, { IsEnabled: false }), Object.assign({}, BusinessLibOperateType_1.BusinessLibOperateType.IdCardNone, { IsEnabled: false })] }));
        return arr;
    }
    findHasSelfBusinessLibAndAreaTree(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield Promise.all([
                Area_1.default.getPosaDPJavaCache(params ? params.keyword : null),
                BusinessLib_1.default.getBusinessLib(params ? params.keyword : null),
            ]);
            let areaRes = res[0];
            let libsRes = res[1];
            let j = {};
            j.businessLibExList = libsRes.data ? libsRes.data : [];
            j.areaExList = areaRes.data ? areaRes.data : [];
            return j;
        });
    }
    ;
    save(params) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BusinessLibService.validateParams(params, false);
            let validateModel = yield BusinessLibService.validateModel(params ? params.Name : "");
            if (!validateModel) {
                return Promise.reject(ErrorCode_1.default.ERROR_BUSINESSLIB_NAME_REPEAT);
            }
            params.CreateTime = Date.now().toString();
            let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.BusinessLibDao).save(params);
            if (!res || !res.data) {
                return Promise.reject(ErrorCode_1.default.ERROR_BACK_ERROR);
            }
            let ID = res.data;
            let roleDataID = yield BusinessLibService.addRoleBusinessLib(ID);
            return { ID: ID, roleDataID: roleDataID };
        });
    }
    static addRoleBusinessLib(objectID) {
        return __awaiter(this, void 0, void 0, function* () {
            let roleData = {};
            roleData.RoleID = '111';
            roleData.ObjectID = objectID;
            roleData.ObjectType = Table_Map_1.TableMap.BusinessLib;
            roleData.ObjectData = JSON.stringify({ "RoleCommandList": ["Search", "Update", "Export", "Name.Part", "IdCard.Part"] });
            roleData.IsVisible = true;
            let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UserRoleDataDao).save(roleData);
            if (res && res.data) {
                return res.data;
            }
            else {
                return Promise.reject(ErrorCode_1.default.ERROR_BACK_ERROR);
            }
        });
    }
    update(params) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BusinessLibService.validateParams(params, true);
            let validateModel = yield BusinessLibService.validateModel(params ? params.Name : "", params ? params.ID : undefined);
            if (!validateModel) {
                return Promise.reject(ErrorCode_1.default.ERROR_BUSINESSLIB_NAME_REPEAT);
            }
            let resp = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.BusinessLibDao).findByID(params.ID);
            if (!resp || !resp.data) {
                return Promise.reject(ErrorCode_1.default.ERROR_BUSINESSLIB_NULL);
            }
            let oldModel = resp.data;
            oldModel.AreaID = params.AreaID;
            oldModel.ParentID = params.ParentID;
            oldModel.Memo = params.Memo;
            oldModel.Name = params.Name;
            return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.BusinessLibDao).update(oldModel);
        });
    }
    detail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.BusinessLibDao).findByID(id);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.BusinessLibDao).delete([id]);
        });
    }
    deleteByIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ids) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.BusinessLibDao).deleteBusLib(ids);
        });
    }
    static validateParams(model, isUpdate) {
        if (!model) {
            return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
        }
        if (isUpdate && !model.ID) {
            return Promise.reject(ErrorCode_1.default.ERROR_BUSINESSLIB_NULL);
        }
        if (!model.AreaID) {
            return Promise.reject(ErrorCode_1.default.ERROR_BUSINESSLIB_AREAID_OR_PARENTID_NULL);
        }
        if (!model.Name) {
            return Promise.reject(ErrorCode_1.default.ERROR_BUSINESSLIB_NAME_NULL);
        }
        return null;
    }
    ;
    static validateModel(name, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let wheres = [];
            wheres.push(WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.Name, name));
            if (id != null) {
                wheres.push(WhereLib_1.UnEqualAndWhere(FildNameLib_1.FildNameLib.ID, id));
            }
            let resp = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.BusinessLibDao).findListByWhere(wheres);
            return !(resp.data && resp.data.length > 0);
        });
    }
    ;
}
BusinessLibService.LOGGER = log4js.getLogger("BusinessLibService");
exports.BusinessLibService = BusinessLibService;
