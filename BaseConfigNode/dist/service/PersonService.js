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
const DataType_1 = require("../common/DataType");
const JoinType_1 = require("../common/JoinType");
const MatchingType_1 = require("../common/MatchingType");
const ChildWhere_1 = require("../common/ChildWhere");
const ErrorCode_1 = require("../common/res/ErrorCode");
const Table_Map_1 = require("../model/Table-Map");
const Person_col_1 = require("../model/table-col/Person_col");
const User_col_1 = require("../model/table-col/User_col");
const log4js = require("log4js");
const util = require("util");
const UserRole_1 = require("../core/entity/UserRole");
const UserRole_col_1 = require("../model/table-col/UserRole_col");
const DaoType_1 = require("../dao/enum/DaoType");
const BeanHelper_1 = require("../common/help/BeanHelper");
const BDaoImpl_1 = require("../dao/core/BDaoImpl");
const WhereLib_1 = require("../model/WhereLib");
const FildNameLib_1 = require("../model/FildNameLib");
class PersonService {
    findListByParams(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params || !params.currentPage || !params.pageSize) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let arrWhere = [];
            let where = new Where_1.default();
            where.Childs = [];
            let childWhere = new ChildWhere_1.default();
            if (params.areaID) {
                childWhere = new ChildWhere_1.default();
                childWhere.FieldName = Person_col_1.default.AreaID;
                childWhere.FieldType = DataType_1.default.Text;
                childWhere.FieldValue = params.areaID;
                childWhere.MType = MatchingType_1.default.Equal;
                childWhere.JType = JoinType_1.default.And;
                where.Childs.push(childWhere);
            }
            if (params.name) {
                childWhere = new ChildWhere_1.default();
                childWhere.FieldName = Person_col_1.default.Name;
                childWhere.FieldType = DataType_1.default.Text;
                childWhere.FieldValue = params.name;
                childWhere.MType = MatchingType_1.default.Like;
                childWhere.JType = JoinType_1.default.And;
                where.Childs.push(childWhere);
            }
            if (params.unitID) {
                childWhere = new ChildWhere_1.default();
                childWhere.FieldName = Person_col_1.default.Name;
                childWhere.FieldType = DataType_1.default.Text;
                childWhere.FieldValue = params.name;
                childWhere.MType = MatchingType_1.default.Like;
                childWhere.JType = JoinType_1.default.And;
                where.Childs.push(childWhere);
            }
            where.JType = JoinType_1.default.And;
            arrWhere.push(where);
            return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.PersonDao).findListByPage(arrWhere, params.currentPage, params.pageSize, BDaoImpl_1.ServerType.BCS);
        });
    }
    ;
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.PersonDao).findAll(BDaoImpl_1.ServerType.BCS);
        });
    }
    save(reqParams) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!reqParams) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            yield PersonService.validateParams(reqParams, false);
            let newParams = Object.assign({}, reqParams);
            let PersonID = yield PersonService.savePerson(newParams);
            let userID = yield PersonService.saveUser(reqParams, PersonID);
            let userRoleID = yield PersonService.saveUserRole(reqParams, userID);
            return { PersonID: PersonID, userID: userID, userRoleID: userRoleID };
        });
    }
    static savePerson(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let model = {};
            model.Code = params.Code;
            model.Name = params.Name;
            model.AreaID = params.AreaID;
            model.UnitID = params.UnitID;
            model.Position = params.Position;
            model.Gender = params.Gender;
            model.MobTel = params.MobTel;
            model.TelePhone = params.TelePhone;
            model.EMail = params.EMail;
            model.PhotoPath = params.PhotoPath;
            model.PYCode = params.PYCode;
            model.Description = params.Description;
            model.Post = params.Post;
            model.CardID = params.CardID;
            model.CallNo = params.CallNo;
            model.PoliceID = params.PoliceID;
            model.PoliceType = params.PoliceType;
            model.Ext = params.Ext;
            let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.PersonDao).save(model, BDaoImpl_1.ServerType.BCS);
            if (res && res.data) {
                return res.data;
            }
            else {
                return Promise.reject(ErrorCode_1.default.ERROR_BACK_ERROR);
            }
        });
    }
    static saveUser(params, PersonID) {
        return __awaiter(this, void 0, void 0, function* () {
            let model = {};
            model.Uid = params.UserModel.Uid;
            model.Pwd = params.UserModel.Pwd;
            model.PersonID = PersonID;
            model.IsDisable = params.UserModel.IsDisable;
            model.UserLevel = params.UserModel.UserLevel;
            model.IsForeverValid = params.UserModel.IsForeverValid;
            model.UserType = params.UserModel.UserType;
            model.EndTimeValid = params.UserModel.EndTimeValid;
            model.StartTimeValid = params.UserModel.StartTimeValid;
            model.LastLoginTime = params.UserModel.LastLoginTime;
            model.Ext = params.Ext;
            let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UserDao).save(model, BDaoImpl_1.ServerType.BCS);
            if (res && res.data) {
                return res.data;
            }
            else {
                return Promise.reject(ErrorCode_1.default.ERROR_BACK_ERROR);
            }
        });
    }
    static saveUserRole(params, userID) {
        return __awaiter(this, void 0, void 0, function* () {
            let model = {};
            model.UserID = userID;
            if (params.UserModel.roleId) {
                model.RoleID = params.UserModel.roleId;
            }
            let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UserRoleDao).save(model);
            if (res && res.data) {
                return res.data;
            }
            else {
                return Promise.reject(ErrorCode_1.default.ERROR_BACK_ERROR);
            }
        });
    }
    detail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let res1 = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.PersonDao).findByID(id, BDaoImpl_1.ServerType.BCS);
            let person;
            if (res1 && res1.data) {
                person = res1.data;
            }
            else {
                return Promise.reject(ErrorCode_1.default.ERROR_BACK_ERROR);
            }
            let result = yield Promise.all([
                PersonService.findArea(person.AreaID),
                PersonService.findUnit(person.UnitID),
                PersonService.findUser(person.ID)
            ]);
            person.AreaModel = result[0] ? result[0] : {};
            person.UnitModel = result[1] ? result[1] : {};
            person.UserModel = result[2] ? result[2] : {};
            return person;
        });
    }
    update(params) {
        return __awaiter(this, void 0, void 0, function* () {
            yield PersonService.validateParams(params, true);
            let result = yield Promise.all([
                PersonService.updatePerson(params),
                PersonService.updateUser(params),
                PersonService.updateUserRole(params)
            ]);
            return result[0] && result[1] && result[2];
        });
    }
    static updatePerson(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.PersonDao).findByID(params.ID);
            let oldModel;
            if (result && result.data) {
                oldModel = result.data;
            }
            else {
                return Promise.reject(ErrorCode_1.default.ERROR_BACK_ERROR);
            }
            let model = {};
            model.ID = oldModel.ID;
            model.Code = params.Code;
            model.Name = params.Name;
            model.AreaID = params.AreaID;
            model.UnitID = params.UnitID;
            model.Position = params.Position;
            model.Gender = params.Gender;
            model.MobTel = params.MobTel;
            model.TelePhone = params.TelePhone;
            model.EMail = params.EMail;
            model.PhotoPath = params.PhotoPath;
            model.PYCode = params.PYCode;
            model.Description = params.Description;
            model.Post = params.Post;
            model.CardID = params.CardID;
            model.CallNo = params.CallNo;
            model.PoliceID = params.PoliceID;
            model.PoliceType = params.PoliceType;
            model.Ext = params.Ext;
            let resp = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.PersonDao).update(model, BDaoImpl_1.ServerType.BCS);
            if (resp.data) {
                return true;
            }
            else {
                return Promise.reject(ErrorCode_1.default.ERROR_BACK_ERROR);
            }
        });
    }
    static updateUser(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UserDao).findByID(params.UserModel.ID);
            let oldModel;
            if (result && result.data) {
                oldModel = result.data;
            }
            else {
                return Promise.reject(ErrorCode_1.default.ERROR_BACK_ERROR);
            }
            let model = {};
            model.ID = oldModel.ID;
            model.Uid = params.UserModel.Uid;
            model.Pwd = params.UserModel.Pwd ? params.UserModel.Pwd : oldModel.Pwd;
            model.PersonID = params.UserModel.PersonID;
            model.IsDisable = params.UserModel.IsDisable;
            model.UserLevel = params.UserModel.UserLevel;
            model.UserType = params.UserModel.UserType;
            model.EndTimeValid = params.UserModel.EndTimeValid;
            model.StartTimeValid = params.UserModel.StartTimeValid;
            model.LastLoginTime = params.UserModel.LastLoginTime;
            model.IsForeverValid = params.UserModel.IsForeverValid;
            model.Ext = params.Ext;
            let resp = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UserDao).update(model, BDaoImpl_1.ServerType.BCS);
            if (resp.data) {
                return true;
            }
            else {
                return Promise.reject(ErrorCode_1.default.ERROR_BACK_ERROR);
            }
        });
    }
    static updateUserRole(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let wheres = [];
            let where;
            let childWhere;
            childWhere = new ChildWhere_1.default();
            childWhere.FieldName = UserRole_col_1.default.UserID;
            childWhere.FieldType = DataType_1.default.Text;
            childWhere.FieldValue = params.UserModel.ID;
            childWhere.JType = JoinType_1.default.And;
            childWhere.MType = MatchingType_1.default.Equal;
            where = new Where_1.default();
            where.Childs = [childWhere];
            wheres.push(where);
            let result;
            let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UserRoleDao).findListByWhere(wheres);
            if (res.data && res.data.length > 0) {
                let userRole = res.data[0];
                if (params.UserModel.roleId) {
                    userRole.RoleID = params.UserModel.roleId;
                }
                let u = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UserRoleDao).update(userRole);
                result = u.data;
            }
            else {
                let userRole = new UserRole_1.default();
                userRole.UserID = params.UserModel.ID;
                if (params.UserModel.roleId) {
                    userRole.RoleID = params.UserModel.roleId;
                }
                let u = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UserRoleDao).save(userRole);
                result = !!u.data;
            }
            return result;
        });
    }
    deleteByIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(ids) || ids.length === 0) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let delIds = [];
            for (let i = 0; i < ids.length; i++) {
                let arrId = yield this.deleteById(ids[i]);
                delIds.push(arrId);
            }
            return delIds;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let delIds = [];
            let userModel, personModel, userRoleModel;
            let userResult = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UserDao).findByID(id);
            if (userResult && userResult.data) {
                userModel = userResult.data;
                let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UserDao).delete([userModel.ID], BDaoImpl_1.ServerType.BCS);
                res && res.data ? delIds.push({
                    table: Table_Map_1.TableMap.User,
                    ID: userModel.ID,
                    state: true
                }) : delIds.push({ table: Table_Map_1.TableMap.User, ID: userModel.ID, state: false });
            }
            else {
                PersonService.LOGGER.info(util.format('user 不存在'));
                return Promise.reject(ErrorCode_1.default.ERROR_BACK_ERROR);
            }
            let personResult = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.PersonDao).findByID(userModel.PersonID);
            if (personResult && personResult.data) {
                personModel = personResult.data;
                let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.PersonDao).delete([personModel.ID], BDaoImpl_1.ServerType.BCS);
                res && res.data ? delIds.push({
                    table: Table_Map_1.TableMap.Person,
                    ID: personModel.ID,
                    state: true
                }) : delIds.push({ table: Table_Map_1.TableMap.Person, ID: personModel.ID, state: false });
            }
            else {
                PersonService.LOGGER.info(util.format('person 不存在'));
            }
            let arrWhere = [];
            let where = new Where_1.default();
            let childWhere = new ChildWhere_1.default();
            childWhere.FieldName = UserRole_col_1.default.UserID;
            childWhere.FieldValue = userModel.ID;
            childWhere.FieldType = DataType_1.default.Text;
            childWhere.MType = MatchingType_1.default.Equal;
            childWhere.JType = JoinType_1.default.And;
            where.Childs.push(childWhere);
            arrWhere.push(where);
            let userRoleResult = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UserRoleDao).findListByWhere(arrWhere);
            if (Array.isArray(userRoleResult.data) && userRoleResult.data.length > 0) {
                userRoleModel = userRoleResult.data[0];
                let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UserRoleDao).delete([userRoleModel.ID]);
                res && res.data ? delIds.push({
                    table: Table_Map_1.TableMap.UserRole,
                    ID: userRoleModel.ID,
                    state: true
                }) : delIds.push({ table: Table_Map_1.TableMap.UserRole, ID: userRoleModel.ID, state: false });
            }
            else {
                PersonService.LOGGER.info(util.format('userRole 不存在'));
            }
            return delIds;
        });
    }
    static findArea(areaID) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.AreaDao).findByID(areaID);
            if (res && res.data) {
                return res.data;
            }
            else {
                return Promise.reject(ErrorCode_1.default.ERROR_BACK_ERROR);
            }
        });
    }
    static findUnit(unitID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (unitID) {
                let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UnitDao).findByID(unitID);
                if (res && res.data) {
                    return res.data;
                }
                else {
                    return {};
                }
            }
            else {
                return {};
            }
        });
    }
    static findUser(personID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!personID) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let arrWhere = [];
            let where = new Where_1.default();
            where.Childs = [];
            let childWhere = new ChildWhere_1.default();
            childWhere.FieldName = User_col_1.UserCol.PersonID;
            childWhere.FieldType = DataType_1.default.Text;
            childWhere.FieldValue = personID;
            childWhere.MType = MatchingType_1.default.Equal;
            childWhere.JType = JoinType_1.default.And;
            where.Childs.push(childWhere);
            where.JType = JoinType_1.default.And;
            arrWhere.push(where);
            let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UserDao).findListByWhere(arrWhere);
            return yield PersonService.getRoleIdByUserId(res.data[0]);
        });
    }
    static getRoleIdByUserId(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let arrWhere = [];
            let where = new Where_1.default();
            let childWhere = new ChildWhere_1.default();
            childWhere.FieldName = UserRole_col_1.default.UserID;
            childWhere.FieldValue = user.ID;
            childWhere.FieldType = DataType_1.default.Text;
            childWhere.MType = MatchingType_1.default.Equal;
            childWhere.JType = JoinType_1.default.And;
            where.Childs.push(childWhere);
            arrWhere.push(where);
            let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UserRoleDao).findListByWhere(arrWhere);
            if (Array.isArray(res.data) && res.data.length > 0) {
                user.roleId = res.data[0].RoleID;
            }
            else {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            return user;
        });
    }
    static validateParams(reqParams, isUpdate) {
        if (!reqParams || !reqParams.UserModel || !reqParams.UserModel.roleId
            || !reqParams.UserModel.Uid || !reqParams.Name || !reqParams.CardID || !reqParams.AreaID) {
            return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
        }
        if (isUpdate && (!reqParams.ID || !reqParams.UserModel.ID)) {
            return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
        }
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UserDao).findListByWhere([WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.Uid, reqParams.UserModel.Uid)])
            .then((res) => {
            if (Array.isArray(res.data) && res.data.length > 0) {
                if (!isUpdate) {
                    return Promise.reject(ErrorCode_1.default.ERROR_USER_UID_REPEAT);
                }
                else {
                    if (reqParams.UserModel.ID !== res.data[0].ID) {
                        return Promise.reject(ErrorCode_1.default.ERROR_USER_UID_REPEAT);
                    }
                }
                return null;
            }
            else {
                return null;
            }
        });
    }
    ;
    changeStatusByIds(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params || !params.userIds || typeof params.status !== 'boolean') {
                return Promise.reject(ErrorCode_1.default.ERROR_USER_CHANGE_STATUS_PARAMS_NULL);
            }
            let idArr = params.userIds.split(",");
            let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UserDao).findListByID(idArr, BDaoImpl_1.ServerType.BCS);
            if (res.data && res.data.length > 0) {
                res.data.forEach((data) => {
                    if (data) {
                        data.IsDisable = params.status;
                    }
                });
            }
            return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UserDao).updateList(res.data, BDaoImpl_1.ServerType.BCS);
        });
    }
}
PersonService.LOGGER = log4js.getLogger("PersonService");
exports.PersonService = PersonService;
