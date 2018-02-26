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
const ErrorCode_1 = require("../common/res/ErrorCode");
const BeanHelper_1 = require("../common/help/BeanHelper");
const DaoType_1 = require("../dao/enum/DaoType");
const WhereLib_1 = require("../model/WhereLib");
const FildNameLib_1 = require("../model/FildNameLib");
const ObjectType_1 = require("../core/enum/ObjectType");
const RoleParams_1 = require("../core/params/RoleParams");
const UserRoleDataEx_1 = require("../core/entity/ex/UserRoleDataEx");
class RoleService {
    constructor() {
    }
    deleteById(id) {
        return Promise.resolve(null)
            .then(() => {
            if (id != null) {
                return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.RoleDao).delete([id]);
            }
            else {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_ROLE);
            }
        });
    }
    detail(roleId) {
        return Promise.resolve(null)
            .then(() => {
            if (roleId == null) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            return null;
        })
            .then(() => {
            let arr = [getRoleDetail(roleId), findModuleIds(roleId)];
            return Promise.all(arr);
        }).then((data) => {
            let result = new RoleParams_1.RoleDetailResult();
            let r1 = data[0];
            let r2 = data[1];
            if (r1) {
                result.role = r1;
                result.funcModuleList = r2.funcModuleList;
                result.cameraPowerList = r2.cameraPowerList;
                result.wifiPowerList = r2.wifiPowerList;
                result.rmpgatePowerList = r2.rmpgatePowerList;
                result.efencePowerList = r2.efencePowerList;
                result.facelibPowerList = r2.facelibPowerList;
                return result;
            }
            else {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_ROLE);
            }
        });
        function getRoleDetail(roleId) {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.RoleDao).findByID(roleId)
                .then((data) => {
                return data.data;
            });
        }
        function findModuleIds(roleId) {
            return Promise.resolve(null)
                .then(() => {
                return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UserRoleDataDao).findListByWhere([WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.RoleID, roleId)])
                    .then(findModuleListByIds);
            });
        }
        function findModuleListByIds(res) {
            let userRoleDataExList = {};
            userRoleDataExList.funcModuleList = [];
            userRoleDataExList.cameraPowerList = [];
            userRoleDataExList.wifiPowerList = [];
            userRoleDataExList.rmpgatePowerList = [];
            userRoleDataExList.efencePowerList = [];
            userRoleDataExList.facelibPowerList = [];
            if (res.data && res.data.length > 0) {
                res.data.forEach((model) => {
                    let userRoleDataEx = new UserRoleDataEx_1.UserRoleDataEx();
                    userRoleDataEx.RoleID = model.RoleID;
                    userRoleDataEx.ID = model.ID;
                    userRoleDataEx.ObjectType = model.ObjectType;
                    userRoleDataEx.ObjectID = model.ObjectID;
                    try {
                        userRoleDataEx.operateList = RoleService.roleCommandListToArray(model.ObjectData);
                    }
                    catch (e) {
                        userRoleDataEx.operateList = [];
                    }
                    if (model.ObjectType === ObjectType_1.ObjectType.Module.value) {
                        userRoleDataExList.funcModuleList.push(userRoleDataEx);
                    }
                    if (model.ObjectType === ObjectType_1.ObjectType.BusinessLib.value) {
                        userRoleDataExList.facelibPowerList.push(userRoleDataEx);
                    }
                    if (model.ObjectType === ObjectType_1.ObjectType.Wifi.value) {
                        userRoleDataExList.wifiPowerList.push(userRoleDataEx);
                    }
                    if (model.ObjectType === ObjectType_1.ObjectType.RmpGate.value) {
                        userRoleDataExList.rmpgatePowerList.push(userRoleDataEx);
                    }
                    if (model.ObjectType === ObjectType_1.ObjectType.Camera.value) {
                        userRoleDataExList.cameraPowerList.push(userRoleDataEx);
                    }
                    if (model.ObjectType === ObjectType_1.ObjectType.ElectronicFence.value) {
                        userRoleDataExList.efencePowerList.push(userRoleDataEx);
                    }
                });
            }
            return Promise.resolve(userRoleDataExList);
        }
    }
    list(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield Promise.all([
                BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.RoleDao).findListByWhere([WhereLib_1.UnEqualAndWhere(FildNameLib_1.FildNameLib.ID, '1')]),
                BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UserDao).findAll(),
                BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.PersonDao).findAll()
            ]);
            let userMap = (function () {
                let j = {};
                if (!Array.isArray(res[1].data)) {
                    return j;
                }
                res[1].data.forEach((user) => {
                    j[user.ID] = user;
                });
                return j;
            })();
            let personMap = (function () {
                let j = {};
                if (!Array.isArray(res[2].data)) {
                    return j;
                }
                res[2].data.forEach((person) => {
                    j[person.ID] = person;
                });
                return j;
            })();
            if (Array.isArray(res[0].data) && Array.isArray(res[1].data)) {
                res[0].data.forEach((role) => {
                    if (userMap[role.CreaterID] && personMap[userMap[role.CreaterID].PersonID]) {
                        role.JsonUserData.Person = personMap[userMap[role.CreaterID].PersonID];
                    }
                    else {
                        role.JsonUserData.Person = {};
                    }
                });
            }
            return res[0];
        });
    }
    save(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let result_roleId;
            if (!params || !params.role || !params.role.Name ||
                !Array.isArray(params.roleDataList) || params.roleDataList.length === 0) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let validName = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.RoleDao).findListByWhere([WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.Name, params.role.Name)]);
            if (Array.isArray(validName.data) && validName.data.length > 0) {
                return Promise.reject(ErrorCode_1.default.ERROR_REPEAT_ROLE_NAME);
            }
            let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.RoleDao).save(params.role);
            if (res.data) {
                let roleId = res.data;
                result_roleId = roleId;
                let roleDatas = [];
                params.roleDataList.forEach((userRoleDataEx) => {
                    let roleData = {};
                    roleData.IsVisible = true;
                    roleData.ObjectData = RoleService.RoleCommandListToString(userRoleDataEx.operateList);
                    roleData.ObjectID = userRoleDataEx.ObjectID;
                    roleData.RoleID = roleId;
                    roleData.ObjectType = userRoleDataEx.ObjectType;
                    roleDatas.push(roleData);
                });
                yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UserRoleDataDao).addList(roleDatas);
            }
            else {
                return Promise.reject(ErrorCode_1.default.ERROR_SAVE_ROLE);
            }
            return result_roleId;
        });
    }
    update(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params || !params.role || !params.role.Name || !params.role.ID ||
                !Array.isArray(params.roleDataList) || params.roleDataList.length === 0) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let validName = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.RoleDao).findListByWhere([WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.Name, params.role.Name)]);
            if (Array.isArray(validName.data) && validName.data.length > 0) {
                if (validName.data[0].ID !== params.role.ID) {
                    return Promise.reject(ErrorCode_1.default.ERROR_REPEAT_ROLE_NAME);
                }
            }
            let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.RoleDao).findByID(params.role.ID);
            if (res.data) {
                let origin = res.data;
                origin.Name = params.role.Name;
                origin.Description = params.role.Description;
                yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.RoleDao).update(origin);
            }
            else {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_ROLE);
            }
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UserRoleDataDao)
                .deleteByWhere([WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.RoleID, params.role.ID)]).then(() => {
                let roleDatas = [];
                params.roleDataList.forEach((userRoleDataEx) => {
                    let roleData = {};
                    roleData.IsVisible = true;
                    roleData.ObjectData = RoleService.RoleCommandListToString(userRoleDataEx.operateList);
                    roleData.ObjectID = userRoleDataEx.ObjectID;
                    roleData.RoleID = params.role.ID;
                    roleData.ObjectType = userRoleDataEx.ObjectType;
                    roleDatas.push(roleData);
                });
                return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UserRoleDataDao).addList(roleDatas);
            });
        });
    }
    static RoleCommandListToString(data) {
        let result = {
            RoleCommandList: data || []
        };
        return JSON.stringify(result);
    }
    static roleCommandListToArray(roleCommandList) {
        let _operateList = JSON.parse(roleCommandList);
        if (_operateList && _operateList.RoleCommandList && _operateList.RoleCommandList.length > 0) {
            return _operateList.RoleCommandList;
        }
        else {
            return [];
        }
    }
}
RoleService.LOGGER = log4js.getLogger("RoleService");
exports.RoleService = RoleService;
