/**
 * create by huangjingjing 2017-08-04
 */
import {TableMap} from '../model/Table-Map'
import {BackResponseBody} from "../core/params/result/ResponseResult";
import {MacMonitor, TaskSearchParams, CameraParam, TaskModel, CarMonitor} from '../core/server/TaskModel'
import {Person} from "../core/entity/Person";
import Where from "../common/Where";
import ErrorCode from '../common/res/ErrorCode';
import {
    EqualAndWhere,
    EqualLikeWhere,
    StartAndEndForTimeWhere,
    EqualChildWhere,
    LikeChildWhere
} from "../model/WhereLib";
import {FildNameLib} from "../model/FildNameLib";
import {ObjectType} from "../core/enum/ObjectType";
import {ProcedureParamStatement} from '../core/server/ProcedureParamStatement';
import {PROCEDURE_TYPE} from '../core/server/enum/ProcedureType';
import {EventRuleEx} from "../core/entity/ex/EventRuleEx";
import TaskConfigDao from "../dao/TaskConfigDao";
import {EventRuleService, IEventRuleService} from "./EventRuleService";
import {EventRuleTriggerModel} from "../core/server/EventRuleModel";
import {DaoType} from '../dao/enum/DaoType';
import EventRuleActionDao from '../dao/EventRuleActionDao';
import {BeanHelper} from '../common/help/BeanHelper';
import EventRuleTriggerDao from '../dao/EventRuleTriggerDao';
import MacTaskDao from '../dao/MacTaskDao';
import IvsTaskDao from '../dao/IvsTaskDao';
import OtherDao from '../dao/OtherDao';
import ObjectRelationDao from '../dao/ObjectRelationDao';
import UserDao from '../dao/UserDao';
import IvsTaskGroupDao from '../dao/IvsTaskGroupDao';
import VehicleTaskGroupDao from '../dao/VehicleTaskGroupDao';
import {TaskStatus} from "../core/server/enum/TaskStatus";
import {TaskType} from "../core/server/enum/TaskType";
import {PersonAndUserEx} from "../core/entity/ex/PersonAndUserEx";
import {User} from "../core/entity/User";
import PersonDao from "../dao/PersonDao";
import * as log4js from "log4js";
import * as util from "util";
import AreaExt from "../extend/Area";
import TimeTemplateDao from "../dao/TimeTemplateDao";
import ChildWhere from '../common/where/ChildWhere';
import {AuthStatus} from "../core/server/enum/AuthStatus";

class ICarOptions {
    static BlackList: { value: string, text: string } = {value: 'BlackList', text: '黑名单'};
    static WhiteList: { value: string, text: string } = {value: 'WhiteList', text: '白名单'};
}

export interface ITaskConfigService {

    AddOrUpdateFace(params: { [key: string]: any }): Promise<BackResponseBody<any>>;

    AddOrUpdateCar(params: { [key: string]: any }): Promise<BackResponseBody<any>>;

    AddOrUpdateRfid(params: { [key: string]: any }): Promise<BackResponseBody<any>>;

    FindMacList(params: TaskSearchParams): Promise<BackResponseBody<Array<MacMonitor>>>;

    FindFaceList(params: TaskSearchParams): Promise<BackResponseBody<Array<TaskModel>>>;

    FindCarList(params: TaskSearchParams): Promise<BackResponseBody<Array<CarMonitor>>>;

    GetFaceDetail(ID: string): Promise<TaskModel>;

    GetFaceDetailByTaskId(ID: string): Promise<TaskModel>;

    GetCarDetail(ID: string): Promise<CarMonitor>;

    GetRfidDetail(ID: string): Promise<MacMonitor>;

    getFaceTaskIDs(ID: string, type: string): Promise<Array<TaskModel>>;

    getTaskIdsByUserId(userId: string): Promise<Array<string>>;

    getUserIdByPersonId(personId: Array<string>): Promise<Array<string>>;


}

export class TaskConfigService implements ITaskConfigService {
    private static LOGGER = log4js.getLogger("TaskConfigService");
    static eventRule: IEventRuleService = new EventRuleService();

    async AddOrUpdateFace(params: { [key: string]: any }) {
        let taskModel = params.taskModel as TaskModel;
        let eventRule = params.eventRule as EventRuleEx;
        if (!taskModel || !eventRule) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM)
        }
        if (!taskModel.Name || !Array.isArray(taskModel.ArrLibIds) || taskModel.ArrLibIds.length === 0 || !Array.isArray(taskModel.CameraParams) || taskModel.CameraParams.length === 0) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM)
        }
        //TODO 判断是否有ID 有为更新更新
        let isUpdate = !!eventRule.ID;
        if (!isUpdate) {
            taskModel.CreateTime = new Date().getTime().toString();
        }
        //TODO 调用java新增和更新的接口
        let ivsTaskRes = await BeanHelper.getDao<TaskConfigDao>(DaoType.TaskConfigDao).addOrUpdateFace(taskModel) as BackResponseBody<{ Id: string }>;
        if (ivsTaskRes.code !== 200) {
            return ivsTaskRes
        }
        let eventRuleRes: BackResponseBody<string>;
        if (isUpdate && eventRule.ID) {
            //TODO 更新EventRule 删除旧的EventRuleAction
            let r = await Promise.all([
                EventRuleService.saveEventRule(eventRule, true, eventRule.ID),
                BeanHelper.getDao<EventRuleActionDao>(DaoType.EventRuleActionDao).deleteByWhere([EqualAndWhere(FildNameLib.EventRuleID, eventRule.ID)])
            ]);
            eventRuleRes = r[0];
            eventRuleRes.data = eventRule.ID;
        } else {
            //TODO 新增EventRule
            eventRuleRes = await EventRuleService.saveEventRule(eventRule);
        }

        //TODO 更新EventRuleTrigger
        let eventRuleTriggerRes =
            await TaskConfigService.saveTaskRationForEventRule(isUpdate ? taskModel.ID : ivsTaskRes.data.Id, eventRuleRes.data, TableMap.IvsTaskGroup, isUpdate) as BackResponseBody<string>;
        if (eventRuleTriggerRes.code !== 200 || !eventRuleTriggerRes.data) {
            return eventRuleTriggerRes;
        }

        //TODO 增加 EventRuleAction
        await EventRuleService.saveEventRuleAction(
            EventRuleService.resetRuleActionParams(eventRule, eventRuleRes.data, eventRuleTriggerRes.data));
        let result = {} as BackResponseBody<{ [key: string]: string }>;

        result.code = ErrorCode.OK;
        result.data = {
            IvsTaskGroupID: isUpdate ? taskModel.ID : ivsTaskRes.data.Id,
            eventRuleID: eventRuleRes.data,
            eventRuleTriggerID: eventRuleTriggerRes.data
        };
        return result;
    }

    async AddOrUpdateCar(params: { [key: string]: any }) {
        let taskModel = params.taskModel as CarMonitor;
        let eventRule = params.eventRule as EventRuleEx;

        if (!taskModel || !taskModel.ListType) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM)
        }

        if (taskModel.ListType === ICarOptions.BlackList.value && !eventRule) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM)
        }


        //TODO 调用java新增和更新的接口
        let ivsTaskRes = await BeanHelper.getDao<TaskConfigDao>(DaoType.TaskConfigDao).addOrUpdateCar(taskModel) as BackResponseBody<{ Id: string }>;
        if (ivsTaskRes.code !== 200) {
            return ivsTaskRes
        }

        if (taskModel.ListType === ICarOptions.WhiteList.value) {
            return ivsTaskRes
        } else {
            //TODO 判断是否有ID 有为更新更新
            let isUpdate = !!eventRule.ID;
            let eventRuleRes: BackResponseBody<string>;
            if (isUpdate && eventRule.ID) {
                //TODO 更新EventRule 删除旧的EventRuleAction
                let r = await Promise.all([
                    EventRuleService.saveEventRule(eventRule, true, eventRule.ID),
                    BeanHelper.getDao<EventRuleActionDao>(DaoType.EventRuleActionDao).deleteByWhere([EqualAndWhere(FildNameLib.EventRuleID, eventRule.ID)])
                ]);
                eventRuleRes = r[0];
                eventRuleRes.data = eventRule.ID;
            } else {
                //TODO 新增EventRule
                eventRuleRes = await EventRuleService.saveEventRule(eventRule);
            }

            //TODO 更新EventRuleTrigger
            let eventRuleTriggerRes =
                await TaskConfigService.saveTaskRationForEventRule(isUpdate ? taskModel.ID : ivsTaskRes.data.Id, eventRuleRes.data, TableMap.VehicleTaskGroup, isUpdate) as BackResponseBody<string>;
            if (eventRuleTriggerRes.code !== 200 || !eventRuleTriggerRes.data) {
                return eventRuleTriggerRes;
            }

            //TODO 增加 EventRuleAction
            await EventRuleService.saveEventRuleAction(
                EventRuleService.resetRuleActionParams(eventRule, eventRuleRes.data, eventRuleTriggerRes.data));
            let result = {} as BackResponseBody<{ [key: string]: string }>;

            result.code = ErrorCode.OK;
            result.data = {
                TaskID: isUpdate ? taskModel.ID : ivsTaskRes.data.Id,
                eventRuleID: eventRuleRes.data,
                eventRuleTriggerID: eventRuleTriggerRes.data
            };
            return result;
        }


    }

    async AddOrUpdateRfid(params: { [key: string]: any }) {
        let taskModel = params.taskModel as MacMonitor;
        let eventRule = params.eventRule as EventRuleEx;
        if (!taskModel || !eventRule) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM)
        }
        if (!taskModel) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM)
        }
        //TODO 判断是否有ID 有为更新更新
        let isUpdate = !!eventRule.ID;

        //TODO 调用java新增和更新的接口
        let ivsTaskRes = await BeanHelper.getDao<TaskConfigDao>(DaoType.TaskConfigDao).addOrUpdateRfid(taskModel) as BackResponseBody<{ Id: string }>;
        if (ivsTaskRes.code !== 200) {
            return ivsTaskRes
        }
        let eventRuleRes: BackResponseBody<string>;
        if (isUpdate && eventRule.ID) {
            //TODO 更新EventRule 删除旧的EventRuleAction
            let r = await Promise.all([
                EventRuleService.saveEventRule(eventRule, true, eventRule.ID),
                BeanHelper.getDao<EventRuleActionDao>(DaoType.EventRuleActionDao).deleteByWhere([EqualAndWhere(FildNameLib.EventRuleID, eventRule.ID)])
            ]);
            eventRuleRes = r[0];
            eventRuleRes.data = eventRule.ID;
        } else {
            //TODO 新增EventRule
            eventRuleRes = await EventRuleService.saveEventRule(eventRule);
        }

        //TODO 更新EventRuleTrigger
        let eventRuleTriggerRes =
            await TaskConfigService.saveTaskRationForEventRule(isUpdate ? taskModel.ID : ivsTaskRes.data.Id, eventRuleRes.data, TableMap.MacTask, isUpdate) as BackResponseBody<string>;
        if (eventRuleTriggerRes.code !== 200 || !eventRuleTriggerRes.data) {
            return eventRuleTriggerRes;
        }

        //TODO 增加 EventRuleAction
        await EventRuleService.saveEventRuleAction(
            EventRuleService.resetRuleActionParams(eventRule, eventRuleRes.data, eventRuleTriggerRes.data));
        let result = {} as BackResponseBody<{ [key: string]: string }>;

        result.code = ErrorCode.OK;
        result.data = {
            TaskID: isUpdate ? taskModel.ID : ivsTaskRes.data.Id,
            eventRuleID: eventRuleRes.data,
            eventRuleTriggerID: eventRuleTriggerRes.data
        };
        return result;
    }

    static async saveTaskRationForEventRule(taskId: string, eventRuleId: string, ObjectType: string, isUpdate?: boolean) {
        let model = {} as EventRuleTriggerModel;
        if (isUpdate) {
            let listRes = await BeanHelper.getDao<EventRuleTriggerDao>(DaoType.EventRuleTriggerDao).findListByWhere(
                [EqualAndWhere(FildNameLib.EventRuleID, eventRuleId), EqualAndWhere(FildNameLib.ObjectID, taskId)]);
            if (Array.isArray(listRes.data) && listRes.data.length > 0) {
                model = listRes.data[0];
            }
            let res = await BeanHelper.getDao<EventRuleTriggerDao>(DaoType.EventRuleTriggerDao).update(model);
            res.data = model.ID;
            return res;
        } else {

            model.EventRuleID = eventRuleId;
            model.ObjectType = ObjectType;
            model.ObjectID = taskId;
            return await BeanHelper.getDao<EventRuleTriggerDao>(DaoType.EventRuleTriggerDao).save(model);
        }
    }


    /**
     * @title 获取人像布控列表以及布控人信息
     * @param {TaskListParams} params
     * @return {Promise}
     * @update hjj
     * @time 2017年11月18日 13:44:38
     * @constructor
     */
    async FindFaceList(params: TaskSearchParams) {
        let res = await Promise.all([TaskConfigService.FaceList(params), TaskConfigService.UserList()]);
        let faceArr = Array.isArray(res[0].data) ? res[0].data : [];
        let userArr = Array.isArray(res[1]) ? res[1] : [];
        faceArr.forEach((item: TaskModel) => {
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
        res[0].data = await AreaExt.getAnyListByAreaID(faceArr, params.areaId) as Array<TaskModel>;
        return res[0];
    }

    /**
     * @title 获取MAC布控列表以及布控人信息
     * @param {TaskSearchParams} params
     * @return {Promise}
     * @update hjj
     * @time 2017年11月18日 13:44:38
     * @constructor
     */
    async FindMacList(params: TaskSearchParams) {
        let res = await Promise.all([TaskConfigService.MacList(params), TaskConfigService.UserList()]);
        let macArr = Array.isArray(res[0].data) ? res[0].data : [];
        let userArr = Array.isArray(res[1]) ? res[1] : [];
        macArr.forEach((item: MacMonitor) => {
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
    }


    /**
     * @title 获取Car布控列表以及布控人信息
     * @param {TaskSearchParams} params
     * @return {Promise<BackResponseBody<Array<CarMonitor>> | BackResponseBody<Array<Person>>>}
     * @constructor
     */
    async FindCarList(params: TaskSearchParams) {
        let res = await Promise.all([TaskConfigService.CarList(params), TaskConfigService.UserList()]);
        let carArr = Array.isArray(res[0].data) ? res[0].data : [];
        let userArr = Array.isArray(res[1]) ? res[1] : [];
        carArr.forEach((item: CarMonitor) => {
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
    }


    GetFaceDetail(ID: string): Promise<TaskModel> {
        return Promise.all([
            TaskConfigService.CameraParamForGroupID(ID),
            TaskConfigService.FaceGroupCameraList(ID),
            TaskConfigService.FaceGroupBusinessLib(ID),
            TaskConfigService.getEventRule(ID)]).then(async (res: Array<any>) => {
            let FaceTask = res[0] as TaskModel;
            FaceTask.CameraParams = res[1];
            FaceTask.ArrLibIds = res[2];
            FaceTask.EventRule = res[3];
            let timeTplModelRes = await BeanHelper.getDao<TimeTemplateDao>(DaoType.TimeTemplateDao).findByID(FaceTask.TimeTemplateID);
            FaceTask.TimeTemplate = timeTplModelRes.data;
            return FaceTask
        })
    }

    async GetFaceDetailByTaskId(id:string): Promise<TaskModel>{
        if(!id){
            return Promise.reject(ErrorCode.ERROR_NO_PARAM);
        }
        let taskRes = await BeanHelper.getDao<IvsTaskDao>(DaoType.IvsTaskDao).findByID(id);
        let taskGroupRes = await BeanHelper.getDao<IvsTaskGroupDao>(DaoType.IvsTaskGroupDao).findByID(taskRes.data.IvsTaskGroupID);
        let faceTask = taskGroupRes.data;
        let UserRes = await BeanHelper.getDao<UserDao>(DaoType.UserDao).findByID(faceTask.CreateUserID);
        let PersonRes = UserRes.data ? await BeanHelper.getDao<PersonDao>(DaoType.PersonDao).findByID(UserRes.data.PersonID) : {};
        faceTask.JsonUserData = {
            Person:PersonRes.data,
            User:UserRes.data
        };
        return faceTask
    }

    async GetCarDetail(ID: string): Promise<CarMonitor> {
        let res = await Promise.all([
            BeanHelper.getDao<VehicleTaskGroupDao>(DaoType.VehicleTaskGroupDao).findByID(ID),
            TaskConfigService.getEventRule(ID)
        ]);
        let carTask = res[0].data;
        let UserRes = await BeanHelper.getDao<UserDao>(DaoType.UserDao).findByID(carTask.CreateUserID);
        let PersonRes = UserRes.data ? await BeanHelper.getDao<PersonDao>(DaoType.PersonDao).findByID(UserRes.data.PersonID) : {};
        carTask.JsonUserData = {
            Person:PersonRes.data,
            User:UserRes.data
        };
        carTask.EventRule = res[1];
        return carTask
    }

    async GetRfidDetail(ID: string): Promise<MacMonitor> {
        let res = await Promise.all([
            BeanHelper.getDao<MacTaskDao>(DaoType.MacTaskDao).findByID(ID),
            TaskConfigService.getEventRule(ID)
        ]);
        let rfidTask = res[0].data;

        let UserRes = await BeanHelper.getDao<UserDao>(DaoType.UserDao).findByID(rfidTask.CreateUserID);
        let PersonRes = UserRes.data ? await BeanHelper.getDao<PersonDao>(DaoType.PersonDao).findByID(UserRes.data.PersonID) : {};
        rfidTask.JsonUserData = {
            Person:PersonRes.data,
            User:UserRes.data
        };
        rfidTask.EventRule = res[1];
        return rfidTask
    }

    static async getEventRule(id: string) {
        let res = await BeanHelper.getDao<EventRuleTriggerDao>(DaoType.EventRuleTriggerDao).findListByWhere([EqualAndWhere(FildNameLib.ObjectID, id)]) as BackResponseBody<Array<EventRuleTriggerModel>>;
        if (Array.isArray(res.data) && res.data.length > 0) {
            let result = await TaskConfigService.eventRule.detail(res.data[0].EventRuleID);
            return result.data ? result.data : {} as EventRuleEx;
        } else {
            return null
        }

    }

    async getFaceTaskIDs(ID: string, type: string): Promise<any> {
        if (!ID || !type) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM)
        }
        let tasklistRes = await BeanHelper.getDao<IvsTaskDao>(DaoType.IvsTaskDao)
            .findListByWhere([EqualAndWhere(FildNameLib.CameraID, ID)]);
        if (!Array.isArray(tasklistRes.data) || tasklistRes.data.length === 0) {
            return tasklistRes
        }
        let ids = tasklistRes.data.map((item: any) => {
            return item.IvsTaskGroupID
        });

        let taskgroupRes = await BeanHelper.getDao<IvsTaskGroupDao>(DaoType.IvsTaskGroupDao).findListByID(ids);
        if (!Array.isArray(taskgroupRes.data) || taskgroupRes.data.length === 0) {
            return Promise.reject(ErrorCode.ERROR)
        }
        let tasklist = [] as Array<any>;
        taskgroupRes.data.forEach((group: any) => {
            tasklistRes.data.forEach((item: any) => {
                if (group.ID === item.IvsTaskGroupID && group.Status === TaskStatus.Run.value && group.TaskType === type) {
                    tasklist.push(item)
                }
            })
        });
        return tasklist

    }

    async getTaskIdsByUserId(userId: string): Promise<Array<string>> {
        if (userId == null) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM);
        }
        let procParams = new ProcedureParamStatement();
        procParams.ProcName = PROCEDURE_TYPE.PROC_GET_ALARM_ALLTASK_BYUSER;
        procParams.JsonProcParams = [userId];
        let res: BackResponseBody<Array<{ value: string }>> = await BeanHelper.getDao<OtherDao>(DaoType.OtherDao).callProcedureForObject(procParams) as any;
        let data = (res && res.data) || [] as Array<{ value: string }>;
        let result = [] as Array<string>;
        data.forEach((model: { value: string }) => {
            result.push(model.value);
        });
        return await result;
    }

    static async CameraParamForGroupID(ID: string): Promise<TaskModel> {
        return await BeanHelper.getDao<IvsTaskGroupDao>(DaoType.IvsTaskGroupDao).findByID(ID).then((res: BackResponseBody<TaskModel>) => {
            return res.data as TaskModel
        })
    }

    static async FaceGroupBusinessLib(ID: string): Promise<Array<string>> {
        let wheres = [] as Array<Where>;
        wheres.push(EqualAndWhere(FildNameLib.ObjectID, ID));
        wheres.push(EqualAndWhere(FildNameLib.RelatedObjectType, ObjectType.BusinessLib.value));
        return await BeanHelper.getDao<ObjectRelationDao>(DaoType.ObjectRelationDao).findListByWhere(wheres).then((res: BackResponseBody<Array<any>>) => {
            let arr = [] as Array<string>;
            if (Array.isArray(res.data)) {
                res.data.forEach((item: any) => {
                    arr.push(item.RelatedObjectID)
                });
            }
            return arr
        })
    }

    static async FaceGroupCameraList(ID: string): Promise<Array<CameraParam>> {
        let wheres = [] as Array<Where>;
        wheres.push(EqualAndWhere(FildNameLib.IvsTaskGroupID, ID));
        return await BeanHelper.getDao<IvsTaskDao>(DaoType.IvsTaskDao).findListByWhere(wheres).then((res: BackResponseBody<Array<CameraParam>>) => {
            let arr = [] as Array<CameraParam>;
            if (Array.isArray(res.data)) {
                arr = res.data;
            }
            return arr;
        })
    }

    static PrviewWhere(userId) {
        let prviewWhere = new Where();
        let childs = [] as Array<ChildWhere>;
        childs.push(EqualChildWhere(FildNameLib.CreateUserID, userId, true));
        childs.push(EqualChildWhere(FildNameLib.AuditUser, userId, true));
        childs.push(LikeChildWhere(FildNameLib.AuthUser, userId, true));
        childs.push(EqualChildWhere(FildNameLib.AuthStatus, AuthStatus.EveryBody.value, true));
        prviewWhere.Childs = childs;
        return prviewWhere
    }

    static async FaceList(params: TaskSearchParams): Promise<BackResponseBody<Array<TaskModel>>> {
        let wheres = [] as Array<Where>;
        wheres.push(EqualAndWhere(FildNameLib.TaskType, TaskType.FaceMonitor.value));
        wheres.push(TaskConfigService.PrviewWhere(params.userId));
        if (params.name) {
            wheres.push(EqualLikeWhere(FildNameLib.Name, params.name));
        }
        if (params.listType) {
            wheres.push(EqualAndWhere(FildNameLib.TaskType, params.listType));
        }
        if (params.runStatus) {
            wheres.push(EqualAndWhere(FildNameLib.Status, params.runStatus));
        }
        if (params.startTime && params.endTime) {
            wheres.push(StartAndEndForTimeWhere(FildNameLib.ValidTimeStart, params.startTime, FildNameLib.ValidTimeEnd, params.endTime));
        }
        if (params.auditStatus) {
            wheres.push(EqualAndWhere(FildNameLib.AuditStatus, params.auditStatus));
        }
        return await BeanHelper.getDao<IvsTaskGroupDao>(DaoType.IvsTaskGroupDao).findListByWhere(wheres) as BackResponseBody<Array<TaskModel>>;
    }

    static async MacList(params: TaskSearchParams): Promise<BackResponseBody<Array<MacMonitor>>> {
        let wheres = [] as Array<Where>;
        if (params.listType) {
            wheres.push(EqualAndWhere(FildNameLib.ListType, params.listType));
        }
        if (params.perceiveData) {
            wheres.push(EqualLikeWhere(FildNameLib.PerceiveData, params.perceiveData));
        }
        if (params.runStatus) {
            wheres.push(EqualAndWhere(FildNameLib.Status, params.runStatus));
        }
        if (params.startTime && params.endTime) {
            wheres.push(StartAndEndForTimeWhere(FildNameLib.ValidTimeStart, params.startTime, FildNameLib.ValidTimeEnd, params.endTime));
        }
        if (params.auditStatus) {
            wheres.push(EqualAndWhere(FildNameLib.AuditStatus, params.auditStatus));
        }
        return await BeanHelper.getDao<MacTaskDao>(DaoType.MacTaskDao).findListByWhere(wheres)
    }

    static async CarList(params: TaskSearchParams): Promise<BackResponseBody<Array<CarMonitor>>> {
        let wheres = [] as Array<Where>;
        wheres.push(EqualAndWhere(FildNameLib.Ext, ''));
        if (params.listType) {
            wheres.push(EqualAndWhere(FildNameLib.ListType, params.listType));
        }
        if (params.plateNumber) {
            wheres.push(EqualAndWhere(FildNameLib.PlateNumber, params.plateNumber));
        }
        if (params.runStatus) {
            wheres.push(EqualAndWhere(FildNameLib.Status, params.runStatus));
        }
        if (params.startTime && params.endTime) {
            wheres.push(StartAndEndForTimeWhere(FildNameLib.ValidTimeStart, params.startTime, FildNameLib.ValidTimeEnd, params.endTime));
        }
        if (params.auditStatus) {
            wheres.push(EqualAndWhere(FildNameLib.AuditStatus, params.auditStatus));
        }
        return await BeanHelper.getDao<VehicleTaskGroupDao>(DaoType.VehicleTaskGroupDao).findListByWhere(wheres)
    }

    static async UserList(): Promise<Array<PersonAndUserEx>> {
        let userRes = await Promise.all([
            BeanHelper.getDao<UserDao>(DaoType.UserDao).findAll(),
            BeanHelper.getDao<PersonDao>(DaoType.PersonDao).findAll(),
        ]) as [BackResponseBody<Array<User>>, BackResponseBody<Array<Person>>];
        let personList = [] as Array<PersonAndUserEx>;
        try {
            let resUserList = userRes[0].data;
            let resPersonList = userRes[1].data;
            resUserList.forEach((user: User) => {
                for (let i = 0; i < resPersonList.length; i++) {
                    let person = resPersonList[i] as PersonAndUserEx;
                    if (user.PersonID === person.ID) {
                        person.UserID = user.ID;
                        personList.push(person);
                        resPersonList.splice(i, 1);
                    }
                }
            });
        } catch (e) {
            TaskConfigService.LOGGER.warn(util.format('获取User: %j 或 Person: %j 错误 ', userRes[0], userRes[1]))
        }
        return personList
    }

    async getUserIdByPersonId(IDs: Array<string>) {
        if (!Array.isArray(IDs) || IDs.length === 0) {
            return []
        }
        let res = await BeanHelper.getDao<UserDao>(DaoType.UserDao).findAll();
        let UserID: Array<string> = [];
        IDs.forEach((id: string) => {
            res.data.forEach((data: any) => {
                if (id == data.PersonID) {
                    UserID.push(data.ID);
                }
            })
        });
        return UserID
    }
}