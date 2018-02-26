
import {TaskType} from '../core/server/enum/TaskType';
import {BackResponseBody} from "../core/params/result/ResponseResult";
import {TaskSearchParams, CameraParam, TaskModel} from '../core/server/TaskModel'
import {Person} from "../core/entity/Person";
import Where from "../common/Where";
import ErrorCode from '../common/res/ErrorCode';
import {
    EqualAndWhere, EqualChildWhere, EqualLikeWhere, LikeChildWhere,
    StartAndEndForTimeWhere
} from "../model/WhereLib";
import {FildNameLib} from "../model/FildNameLib";
import {DaoType} from '../dao/enum/DaoType';

import {BeanHelper} from '../common/help/BeanHelper';

import IvsTaskDao from '../dao/IvsTaskDao';

import UserDao from '../dao/UserDao';
import IvsTaskGroupDao from '../dao/IvsTaskGroupDao';
import AreaExt from '../extend/Area';
import PersonDao from "../dao/PersonDao";
import {User} from "../core/entity/User";
import {PersonAndUserEx} from "../core/entity/ex/PersonAndUserEx";
import * as log4js from "log4js";
import * as util from "util";
import ChildWhere from "../common/where/ChildWhere";
import {AuthStatus} from "../core/server/enum/AuthStatus";
import {TaskConfigService} from "./TaskConfigService";

export interface IVideoStructService {

    FindFaceList(params: TaskSearchParams): Promise<BackResponseBody<Array<TaskModel>>>;

    GetFaceDetail(ID: string): Promise<BackResponseBody<TaskModel>>;

}

export class VideoStructService implements IVideoStructService {
    private static LOGGER = log4js.getLogger("VideoStructService");
    /**
     * @param {TaskListParams} params
     * @return {Promise}
     * @update hjj
     * @time 2017年11月18日 13:44:38
     * @constructor
     */
    async FindFaceList(params: TaskSearchParams) {
        if (!params.areaId) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM);
        }
        let res = await Promise.all([VideoStructService.FaceList(params), VideoStructService.UserList()]);
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

    async GetFaceDetail(ID: string): Promise<BackResponseBody<TaskModel>> {
        let res = await Promise.all([
            VideoStructService.CameraParamForGroupID(ID),
            VideoStructService.FaceGroupCameraList(ID)
        ]);
        let FaceTask = res[0] as TaskModel;
        FaceTask.CameraParams = res[1];
        let result = new BackResponseBody<TaskModel>();
        result.data = FaceTask;
        result.code = ErrorCode.OK;
        return result
    }


    static async CameraParamForGroupID(ID: string): Promise<TaskModel> {
        return await BeanHelper.getDao<IvsTaskGroupDao>(DaoType.IvsTaskGroupDao).findByID(ID).then((res: BackResponseBody<TaskModel>) => {
            return res.data as TaskModel
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
        wheres.push(EqualAndWhere(FildNameLib.TaskType, TaskType.FaceStruct.value));
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
            VideoStructService.LOGGER.warn(util.format('获取User: %j 或 Person: %j 错误 ', userRes[0], userRes[1]))
        }
        return personList
    }

}