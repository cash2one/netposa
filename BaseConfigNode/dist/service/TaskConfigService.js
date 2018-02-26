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
const Where_1 = require("../common/Where");
const ErrorCode_1 = require("../common/res/ErrorCode");
const WhereLib_1 = require("../model/WhereLib");
const FildNameLib_1 = require("../model/FildNameLib");
const ObjectType_1 = require("../core/enum/ObjectType");
const ProcedureParamStatement_1 = require("../core/server/ProcedureParamStatement");
const ProcedureType_1 = require("../core/server/enum/ProcedureType");
const EventRuleService_1 = require("./EventRuleService");
const DaoType_1 = require("../dao/enum/DaoType");
const BeanHelper_1 = require("../common/help/BeanHelper");
const TaskStatus_1 = require("../core/server/enum/TaskStatus");
const TaskType_1 = require("../core/server/enum/TaskType");
const log4js = require("log4js");
const util = require("util");
const Area_1 = require("../extend/Area");
const AuthStatus_1 = require("../core/server/enum/AuthStatus");
class ICarOptions {
}
ICarOptions.BlackList = { value: 'BlackList', text: '黑名单' };
ICarOptions.WhiteList = { value: 'WhiteList', text: '白名单' };
class TaskConfigService {
    AddOrUpdateFace(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskModel = params.taskModel;
            let eventRule = params.eventRule;
            if (!taskModel || !eventRule) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            if (!taskModel.Name || !Array.isArray(taskModel.ArrLibIds) || taskModel.ArrLibIds.length === 0 || !Array.isArray(taskModel.CameraParams) || taskModel.CameraParams.length === 0) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let isUpdate = !!eventRule.ID;
            if (!isUpdate) {
                taskModel.CreateTime = new Date().getTime().toString();
            }
            let ivsTaskRes = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.TaskConfigDao).addOrUpdateFace(taskModel);
            if (ivsTaskRes.code !== 200) {
                return ivsTaskRes;
            }
            let eventRuleRes;
            if (isUpdate && eventRule.ID) {
                let r = yield Promise.all([
                    EventRuleService_1.EventRuleService.saveEventRule(eventRule, true, eventRule.ID),
                    BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EventRuleActionDao).deleteByWhere([WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.EventRuleID, eventRule.ID)])
                ]);
                eventRuleRes = r[0];
                eventRuleRes.data = eventRule.ID;
            }
            else {
                eventRuleRes = yield EventRuleService_1.EventRuleService.saveEventRule(eventRule);
            }
            let eventRuleTriggerRes = yield TaskConfigService.saveTaskRationForEventRule(isUpdate ? taskModel.ID : ivsTaskRes.data.Id, eventRuleRes.data, Table_Map_1.TableMap.IvsTaskGroup, isUpdate);
            if (eventRuleTriggerRes.code !== 200 || !eventRuleTriggerRes.data) {
                return eventRuleTriggerRes;
            }
            yield EventRuleService_1.EventRuleService.saveEventRuleAction(EventRuleService_1.EventRuleService.resetRuleActionParams(eventRule, eventRuleRes.data, eventRuleTriggerRes.data));
            let result = {};
            result.code = ErrorCode_1.default.OK;
            result.data = {
                IvsTaskGroupID: isUpdate ? taskModel.ID : ivsTaskRes.data.Id,
                eventRuleID: eventRuleRes.data,
                eventRuleTriggerID: eventRuleTriggerRes.data
            };
            return result;
        });
    }
    AddOrUpdateCar(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskModel = params.taskModel;
            let eventRule = params.eventRule;
            if (!taskModel || !taskModel.ListType) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            if (taskModel.ListType === ICarOptions.BlackList.value && !eventRule) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let ivsTaskRes = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.TaskConfigDao).addOrUpdateCar(taskModel);
            if (ivsTaskRes.code !== 200) {
                return ivsTaskRes;
            }
            if (taskModel.ListType === ICarOptions.WhiteList.value) {
                return ivsTaskRes;
            }
            else {
                let isUpdate = !!eventRule.ID;
                let eventRuleRes;
                if (isUpdate && eventRule.ID) {
                    let r = yield Promise.all([
                        EventRuleService_1.EventRuleService.saveEventRule(eventRule, true, eventRule.ID),
                        BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EventRuleActionDao).deleteByWhere([WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.EventRuleID, eventRule.ID)])
                    ]);
                    eventRuleRes = r[0];
                    eventRuleRes.data = eventRule.ID;
                }
                else {
                    eventRuleRes = yield EventRuleService_1.EventRuleService.saveEventRule(eventRule);
                }
                let eventRuleTriggerRes = yield TaskConfigService.saveTaskRationForEventRule(isUpdate ? taskModel.ID : ivsTaskRes.data.Id, eventRuleRes.data, Table_Map_1.TableMap.VehicleTaskGroup, isUpdate);
                if (eventRuleTriggerRes.code !== 200 || !eventRuleTriggerRes.data) {
                    return eventRuleTriggerRes;
                }
                yield EventRuleService_1.EventRuleService.saveEventRuleAction(EventRuleService_1.EventRuleService.resetRuleActionParams(eventRule, eventRuleRes.data, eventRuleTriggerRes.data));
                let result = {};
                result.code = ErrorCode_1.default.OK;
                result.data = {
                    TaskID: isUpdate ? taskModel.ID : ivsTaskRes.data.Id,
                    eventRuleID: eventRuleRes.data,
                    eventRuleTriggerID: eventRuleTriggerRes.data
                };
                return result;
            }
        });
    }
    AddOrUpdateRfid(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let taskModel = params.taskModel;
            let eventRule = params.eventRule;
            if (!taskModel || !eventRule) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            if (!taskModel) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let isUpdate = !!eventRule.ID;
            let ivsTaskRes = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.TaskConfigDao).addOrUpdateRfid(taskModel);
            if (ivsTaskRes.code !== 200) {
                return ivsTaskRes;
            }
            let eventRuleRes;
            if (isUpdate && eventRule.ID) {
                let r = yield Promise.all([
                    EventRuleService_1.EventRuleService.saveEventRule(eventRule, true, eventRule.ID),
                    BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EventRuleActionDao).deleteByWhere([WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.EventRuleID, eventRule.ID)])
                ]);
                eventRuleRes = r[0];
                eventRuleRes.data = eventRule.ID;
            }
            else {
                eventRuleRes = yield EventRuleService_1.EventRuleService.saveEventRule(eventRule);
            }
            let eventRuleTriggerRes = yield TaskConfigService.saveTaskRationForEventRule(isUpdate ? taskModel.ID : ivsTaskRes.data.Id, eventRuleRes.data, Table_Map_1.TableMap.MacTask, isUpdate);
            if (eventRuleTriggerRes.code !== 200 || !eventRuleTriggerRes.data) {
                return eventRuleTriggerRes;
            }
            yield EventRuleService_1.EventRuleService.saveEventRuleAction(EventRuleService_1.EventRuleService.resetRuleActionParams(eventRule, eventRuleRes.data, eventRuleTriggerRes.data));
            let result = {};
            result.code = ErrorCode_1.default.OK;
            result.data = {
                TaskID: isUpdate ? taskModel.ID : ivsTaskRes.data.Id,
                eventRuleID: eventRuleRes.data,
                eventRuleTriggerID: eventRuleTriggerRes.data
            };
            return result;
        });
    }
    static saveTaskRationForEventRule(taskId, eventRuleId, ObjectType, isUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            let model = {};
            if (isUpdate) {
                let listRes = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EventRuleTriggerDao).findListByWhere([WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.EventRuleID, eventRuleId), WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.ObjectID, taskId)]);
                if (Array.isArray(listRes.data) && listRes.data.length > 0) {
                    model = listRes.data[0];
                }
                let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EventRuleTriggerDao).update(model);
                res.data = model.ID;
                return res;
            }
            else {
                model.EventRuleID = eventRuleId;
                model.ObjectType = ObjectType;
                model.ObjectID = taskId;
                return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EventRuleTriggerDao).save(model);
            }
        });
    }
    FindFaceList(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield Promise.all([TaskConfigService.FaceList(params), TaskConfigService.UserList()]);
            let faceArr = Array.isArray(res[0].data) ? res[0].data : [];
            let userArr = Array.isArray(res[1]) ? res[1] : [];
            faceArr.forEach((item) => {
                for (let i = 0; i < userArr.length; i++) {
                    if (item.CreateUserID === userArr[i].UserID) {
                        if (typeof item.JsonUserData !== 'object') {
                            item.JsonUserData = {};
                        }
                        item.AreaID = userArr[i].AreaID;
                        item.JsonUserData.Person = userArr[i];
                        break;
                    }
                }
            });
            res[0].data = (yield Area_1.default.getAnyListByAreaID(faceArr, params.areaId));
            return res[0];
        });
    }
    FindMacList(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield Promise.all([TaskConfigService.MacList(params), TaskConfigService.UserList()]);
            let macArr = Array.isArray(res[0].data) ? res[0].data : [];
            let userArr = Array.isArray(res[1]) ? res[1] : [];
            macArr.forEach((item) => {
                for (let i = 0; i < userArr.length; i++) {
                    if (item.CreateUserID === userArr[i].UserID) {
                        if (typeof item.JsonUserData !== 'object') {
                            item.JsonUserData = {};
                        }
                        item.JsonUserData.Person = userArr[i];
                        break;
                    }
                }
            });
            res[0].data = macArr;
            return res[0];
        });
    }
    FindCarList(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield Promise.all([TaskConfigService.CarList(params), TaskConfigService.UserList()]);
            let carArr = Array.isArray(res[0].data) ? res[0].data : [];
            let userArr = Array.isArray(res[1]) ? res[1] : [];
            carArr.forEach((item) => {
                for (let i = 0; i < userArr.length; i++) {
                    if (item.CreateUserID === userArr[i].UserID) {
                        if (typeof item.JsonUserData !== 'object') {
                            item.JsonUserData = {};
                        }
                        item.JsonUserData.Person = userArr[i];
                        break;
                    }
                }
            });
            res[0].data = carArr;
            return res[0];
        });
    }
    GetFaceDetail(ID) {
        return Promise.all([
            TaskConfigService.CameraParamForGroupID(ID),
            TaskConfigService.FaceGroupCameraList(ID),
            TaskConfigService.FaceGroupBusinessLib(ID),
            TaskConfigService.getEventRule(ID)
        ]).then((res) => __awaiter(this, void 0, void 0, function* () {
            let FaceTask = res[0];
            FaceTask.CameraParams = res[1];
            FaceTask.ArrLibIds = res[2];
            FaceTask.EventRule = res[3];
            let timeTplModelRes = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.TimeTemplateDao).findByID(FaceTask.TimeTemplateID);
            FaceTask.TimeTemplate = timeTplModelRes.data;
            return FaceTask;
        }));
    }
    GetFaceDetailByTaskId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let taskRes = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.IvsTaskDao).findByID(id);
            let taskGroupRes = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.IvsTaskGroupDao).findByID(taskRes.data.IvsTaskGroupID);
            let faceTask = taskGroupRes.data;
            let UserRes = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UserDao).findByID(faceTask.CreateUserID);
            let PersonRes = UserRes.data ? yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.PersonDao).findByID(UserRes.data.PersonID) : {};
            faceTask.JsonUserData = {
                Person: PersonRes.data,
                User: UserRes.data
            };
            return faceTask;
        });
    }
    GetCarDetail(ID) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield Promise.all([
                BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.VehicleTaskGroupDao).findByID(ID),
                TaskConfigService.getEventRule(ID)
            ]);
            let carTask = res[0].data;
            let UserRes = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UserDao).findByID(carTask.CreateUserID);
            let PersonRes = UserRes.data ? yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.PersonDao).findByID(UserRes.data.PersonID) : {};
            carTask.JsonUserData = {
                Person: PersonRes.data,
                User: UserRes.data
            };
            carTask.EventRule = res[1];
            return carTask;
        });
    }
    GetRfidDetail(ID) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield Promise.all([
                BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.MacTaskDao).findByID(ID),
                TaskConfigService.getEventRule(ID)
            ]);
            let rfidTask = res[0].data;
            let UserRes = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UserDao).findByID(rfidTask.CreateUserID);
            let PersonRes = UserRes.data ? yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.PersonDao).findByID(UserRes.data.PersonID) : {};
            rfidTask.JsonUserData = {
                Person: PersonRes.data,
                User: UserRes.data
            };
            rfidTask.EventRule = res[1];
            return rfidTask;
        });
    }
    static getEventRule(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EventRuleTriggerDao).findListByWhere([WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.ObjectID, id)]);
            if (Array.isArray(res.data) && res.data.length > 0) {
                let result = yield TaskConfigService.eventRule.detail(res.data[0].EventRuleID);
                return result.data ? result.data : {};
            }
            else {
                return null;
            }
        });
    }
    getFaceTaskIDs(ID, type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ID || !type) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let tasklistRes = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.IvsTaskDao)
                .findListByWhere([WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.CameraID, ID)]);
            if (!Array.isArray(tasklistRes.data) || tasklistRes.data.length === 0) {
                return tasklistRes;
            }
            let ids = tasklistRes.data.map((item) => {
                return item.IvsTaskGroupID;
            });
            let taskgroupRes = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.IvsTaskGroupDao).findListByID(ids);
            if (!Array.isArray(taskgroupRes.data) || taskgroupRes.data.length === 0) {
                return Promise.reject(ErrorCode_1.default.ERROR);
            }
            let tasklist = [];
            taskgroupRes.data.forEach((group) => {
                tasklistRes.data.forEach((item) => {
                    if (group.ID === item.IvsTaskGroupID && group.Status === TaskStatus_1.TaskStatus.Run.value && group.TaskType === type) {
                        tasklist.push(item);
                    }
                });
            });
            tasklistRes.data = tasklist;
            return tasklistRes;
        });
    }
    getTaskIdsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (userId == null) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let procParams = new ProcedureParamStatement_1.ProcedureParamStatement();
            procParams.ProcName = ProcedureType_1.PROCEDURE_TYPE.PROC_GET_ALARM_ALLTASK_BYUSER;
            procParams.JsonProcParams = [userId];
            let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.OtherDao).callProcedureForObject(procParams);
            let data = (res && res.data) || [];
            let result = [];
            data.forEach((model) => {
                result.push(model.value);
            });
            return yield result;
        });
    }
    static CameraParamForGroupID(ID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.IvsTaskGroupDao).findByID(ID).then((res) => {
                return res.data;
            });
        });
    }
    static FaceGroupBusinessLib(ID) {
        return __awaiter(this, void 0, void 0, function* () {
            let wheres = [];
            wheres.push(WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.ObjectID, ID));
            wheres.push(WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.RelatedObjectType, ObjectType_1.ObjectType.BusinessLib.value));
            return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ObjectRelationDao).findListByWhere(wheres).then((res) => {
                let arr = [];
                if (Array.isArray(res.data)) {
                    res.data.forEach((item) => {
                        arr.push(item.RelatedObjectID);
                    });
                }
                return arr;
            });
        });
    }
    static FaceGroupCameraList(ID) {
        return __awaiter(this, void 0, void 0, function* () {
            let wheres = [];
            wheres.push(WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.IvsTaskGroupID, ID));
            return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.IvsTaskDao).findListByWhere(wheres).then((res) => {
                let arr = [];
                if (Array.isArray(res.data)) {
                    arr = res.data;
                }
                return arr;
            });
        });
    }
    static PrviewWhere(userId) {
        let prviewWhere = new Where_1.default();
        let childs = [];
        childs.push(WhereLib_1.EqualChildWhere(FildNameLib_1.FildNameLib.CreateUserID, userId, true));
        childs.push(WhereLib_1.EqualChildWhere(FildNameLib_1.FildNameLib.AuditUser, userId, true));
        childs.push(WhereLib_1.LikeChildWhere(FildNameLib_1.FildNameLib.AuthUser, userId, true));
        childs.push(WhereLib_1.EqualChildWhere(FildNameLib_1.FildNameLib.AuthStatus, AuthStatus_1.AuthStatus.EveryBody.value, true));
        prviewWhere.Childs = childs;
        return prviewWhere;
    }
    static FaceList(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let wheres = [];
            wheres.push(WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.TaskType, TaskType_1.TaskType.FaceMonitor.value));
            wheres.push(TaskConfigService.PrviewWhere(params.userId));
            if (params.name) {
                wheres.push(WhereLib_1.EqualLikeWhere(FildNameLib_1.FildNameLib.Name, params.name));
            }
            if (params.listType) {
                wheres.push(WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.TaskType, params.listType));
            }
            if (params.runStatus) {
                wheres.push(WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.Status, params.runStatus));
            }
            if (params.startTime && params.endTime) {
                wheres.push(WhereLib_1.StartAndEndForTimeWhere(FildNameLib_1.FildNameLib.ValidTimeStart, params.startTime, FildNameLib_1.FildNameLib.ValidTimeEnd, params.endTime));
            }
            if (params.auditStatus) {
                wheres.push(WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.AuditStatus, params.auditStatus));
            }
            return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.IvsTaskGroupDao).findListByWhere(wheres);
        });
    }
    static MacList(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let wheres = [];
            if (params.listType) {
                wheres.push(WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.ListType, params.listType));
            }
            if (params.perceiveData) {
                wheres.push(WhereLib_1.EqualLikeWhere(FildNameLib_1.FildNameLib.PerceiveData, params.perceiveData));
            }
            if (params.runStatus) {
                wheres.push(WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.Status, params.runStatus));
            }
            if (params.startTime && params.endTime) {
                wheres.push(WhereLib_1.StartAndEndForTimeWhere(FildNameLib_1.FildNameLib.ValidTimeStart, params.startTime, FildNameLib_1.FildNameLib.ValidTimeEnd, params.endTime));
            }
            if (params.auditStatus) {
                wheres.push(WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.AuditStatus, params.auditStatus));
            }
            return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.MacTaskDao).findListByWhere(wheres);
        });
    }
    static CarList(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let wheres = [];
            wheres.push(WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.Ext, ''));
            if (params.listType) {
                wheres.push(WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.ListType, params.listType));
            }
            if (params.plateNumber) {
                wheres.push(WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.PlateNumber, params.plateNumber));
            }
            if (params.runStatus) {
                wheres.push(WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.Status, params.runStatus));
            }
            if (params.startTime && params.endTime) {
                wheres.push(WhereLib_1.StartAndEndForTimeWhere(FildNameLib_1.FildNameLib.ValidTimeStart, params.startTime, FildNameLib_1.FildNameLib.ValidTimeEnd, params.endTime));
            }
            if (params.auditStatus) {
                wheres.push(WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.AuditStatus, params.auditStatus));
            }
            return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.VehicleTaskGroupDao).findListByWhere(wheres);
        });
    }
    static UserList() {
        return __awaiter(this, void 0, void 0, function* () {
            let userRes = yield Promise.all([
                BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UserDao).findAll(),
                BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.PersonDao).findAll(),
            ]);
            let personList = [];
            try {
                let resUserList = userRes[0].data;
                let resPersonList = userRes[1].data;
                resUserList.forEach((user) => {
                    for (let i = 0; i < resPersonList.length; i++) {
                        let person = resPersonList[i];
                        if (user.PersonID === person.ID) {
                            person.UserID = user.ID;
                            personList.push(person);
                            resPersonList.splice(i, 1);
                        }
                    }
                });
            }
            catch (e) {
                TaskConfigService.LOGGER.warn(util.format('获取User: %j 或 Person: %j 错误 ', userRes[0], userRes[1]));
            }
            return personList;
        });
    }
    getUserIdByPersonId(IDs) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(IDs) || IDs.length === 0) {
                return [];
            }
            let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UserDao).findAll();
            let UserID = [];
            IDs.forEach((id) => {
                res.data.forEach((data) => {
                    if (id == data.PersonID) {
                        UserID.push(data.ID);
                    }
                });
            });
            return UserID;
        });
    }
}
TaskConfigService.LOGGER = log4js.getLogger("TaskConfigService");
TaskConfigService.eventRule = new EventRuleService_1.EventRuleService();
exports.TaskConfigService = TaskConfigService;
