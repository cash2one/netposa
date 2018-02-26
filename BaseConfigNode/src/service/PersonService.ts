import Where from "../common/Where";
import DataType from "../common/DataType";
import JoinType from "../common/JoinType";
import MatchingType from "../common/MatchingType";
import ChildWhere from "../common/ChildWhere";
import ErrorCode from "../common/res/ErrorCode";
import {TableMap} from "../model/Table-Map";
import PersonCol from "../model/table-col/Person_col";
import {PersonListParams, PersonChangeStatusParams} from "../core/params/PersonParams";
import {Person} from "../core/entity/Person";
import {User} from "../core/entity/User";
import {PersonEx} from "../core/entity/ex/PersonEx";
import {BackResponseBody, PageResult} from "../core/params/result/ResponseResult";
import {Unit} from "../core/entity/Unit";
import {Area} from "../core/entity/Area";
import {UserCol} from "../model/table-col/User_col";
import * as log4js from "log4js";
import * as util from "util";
import UserRole from "../core/entity/UserRole";
import UserRoleCol from "../model/table-col/UserRole_col";
import {UserEx} from "../core/entity/ex/UserEx";

import {DaoType} from '../dao/enum/DaoType';
import {BeanHelper} from '../common/help/BeanHelper';
import UserRoleDao from '../dao/UserRoleDao';
import PersonDao from '../dao/PersonDao';
import UserDao from '../dao/UserDao';
import AreaDao from '../dao/AreaDao';
import UnitDao from '../dao/UnitDao';
import {ServerType} from '../dao/core/BDaoImpl';
import {EqualAndWhere} from "../model/WhereLib";
import {FildNameLib} from "../model/FildNameLib";

export interface IPersonService {
    save(params: PersonEx): Promise<Object>;

    update(params: PersonEx): Promise<boolean>;

    deleteById(id: string): Promise<Array<any>>;

    deleteByIds(ids: Array<string>): Promise<Array<Array<any>>>;

    detail(id: string): Promise<PersonEx>;

    findListByParams(reqParams: PersonListParams): Promise<BackResponseBody<PageResult<PersonEx>>>;

    // 改变用户状态
    changeStatusByIds(params: PersonChangeStatusParams): Promise<BackResponseBody<string>>;

    //查找所有
    findAll(): any;
}

export class PersonService implements IPersonService {

    private static LOGGER = log4js.getLogger("PersonService");

    /**
     * personModel.UnitID = model.UnitID;
     * personModel.CardID = model.CardID;
     *
     * @time: 2017-04-19 11:31:10
     * @params: params.name like Person.Name
     * @param: params.areaID == Person.AreaID
     *
     * @return:
     */
    async findListByParams(params: PersonListParams) {
        if (!params || !params.currentPage || !params.pageSize) {
            return Promise.reject<number>(ErrorCode.ERROR_NO_PARAM);
        }
        let arrWhere = [] as Array<Where>;
        let where = new Where();
        where.Childs = [] as Array<ChildWhere>;
        let childWhere = new ChildWhere();
        if (params.areaID) {
            childWhere = new ChildWhere();
            childWhere.FieldName = PersonCol.AreaID;
            childWhere.FieldType = DataType.Text;
            childWhere.FieldValue = params.areaID;
            childWhere.MType = MatchingType.Equal;
            childWhere.JType = JoinType.And;
            where.Childs.push(childWhere);
        }
        if (params.name) {
            childWhere = new ChildWhere();
            childWhere.FieldName = PersonCol.Name;
            childWhere.FieldType = DataType.Text;
            childWhere.FieldValue = params.name;
            childWhere.MType = MatchingType.Like;
            childWhere.JType = JoinType.And;
            where.Childs.push(childWhere);
        }
        if (params.unitID) {
            childWhere = new ChildWhere();
            childWhere.FieldName = PersonCol.Name;
            childWhere.FieldType = DataType.Text;
            childWhere.FieldValue = params.name;
            childWhere.MType = MatchingType.Like;

            childWhere.JType = JoinType.And;
            where.Childs.push(childWhere);
        }
        where.JType = JoinType.And;
        arrWhere.push(where);
        return await BeanHelper.getDao<PersonDao>(DaoType.PersonDao).findListByPage(arrWhere, params.currentPage, params.pageSize, ServerType.BCS);
    };

    async findAll() {
        return BeanHelper.getDao<PersonDao>(DaoType.PersonDao).findAll(ServerType.BCS);
    }

    async save(reqParams: PersonEx): Promise<Object> {
        if (!reqParams) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM);
        }
        await PersonService.validateParams(reqParams, false);
        let newParams = Object.assign({}, reqParams);
        let PersonID = await PersonService.savePerson(newParams);
        let userID = await PersonService.saveUser(reqParams, PersonID);
        let userRoleID = await PersonService.saveUserRole(reqParams, userID);
        return {PersonID: PersonID, userID: userID, userRoleID: userRoleID};
    }

    static async savePerson(params: PersonEx) {
        let model = {} as Person;
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
        let res = await BeanHelper.getDao<PersonDao>(DaoType.PersonDao).save(model, ServerType.BCS) as BackResponseBody<string>;
        if (res && res.data) {
            return res.data;
        } else {
            return Promise.reject(ErrorCode.ERROR_BACK_ERROR)
        }
    }

    static async saveUser(params: PersonEx, PersonID: string) {
        let model = {} as User;
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
        let res = await BeanHelper.getDao<UserDao>(DaoType.UserDao).save(model, ServerType.BCS) as BackResponseBody<string>;
        if (res && res.data) {
            return res.data;
        } else {
            return Promise.reject(ErrorCode.ERROR_BACK_ERROR)
        }
    }

    static async saveUserRole(params: PersonEx, userID: string) {
        let model = {} as UserRole;
        model.UserID = userID;
        if (params.UserModel.roleId) {
            model.RoleID = params.UserModel.roleId;
        }
        // let res = await PosaDPDao.save(TableMap.UserRole, model) as  BackResponseBody<string>;
        let res = await BeanHelper.getDao<UserRoleDao>(DaoType.UserRoleDao).save(model) as BackResponseBody<string>;
        if (res && res.data) {
            return res.data;
        } else {
            return Promise.reject(ErrorCode.ERROR_BACK_ERROR)
        }
    }

    /**
     * @title 根据 id 获取详情
     * @update hjj
     * @time: 2017-10-26 11:14:35
     * @params: id 数据标识id
     * @return:
     */
    async detail(id: string): Promise<PersonEx> {
        if (!id) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM);
        }
        let res1 = await BeanHelper.getDao<PersonDao>(DaoType.PersonDao).findByID(id, ServerType.BCS) as BackResponseBody<PersonEx>;
        let person: PersonEx;
        if (res1 && res1.data) {
            person = res1.data;
        } else {
            return Promise.reject(ErrorCode.ERROR_BACK_ERROR)
        }

        let result = await Promise.all([
            PersonService.findArea(person.AreaID),
            PersonService.findUnit(person.UnitID),
            PersonService.findUser(person.ID)
        ]);
        person.AreaModel = result[0] ? result[0] : {} as Area;
        person.UnitModel = result[1] ? result[1] : {} as Unit;
        person.UserModel = result[2] ? result[2] : {} as UserEx;
        return person;
    }

    /**
     * @title 更新
     * @update hjj
     * @time: 2017-10-26 11:14:35
     * @params: params: PersonEx
     * @return: Promise<boolean>
     */
    async update(params: PersonEx): Promise<boolean> {
        await PersonService.validateParams(params, true);

        let result = await Promise.all([
            PersonService.updatePerson(params) as Promise<boolean>,
            PersonService.updateUser(params) as Promise<boolean>,
            PersonService.updateUserRole(params) as Promise<boolean>
        ]);
        return result[0] && result[1] && result[2];
    }

    static async updatePerson(params: PersonEx): Promise<boolean> {
        let result = await BeanHelper.getDao<PersonDao>(DaoType.PersonDao).findByID(params.ID) as BackResponseBody<Person>;
        let oldModel: Person;
        if (result && result.data) {
            oldModel = result.data
        } else {
            return Promise.reject(ErrorCode.ERROR_BACK_ERROR);
        }
        let model = {} as Person;
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
        let resp = await BeanHelper.getDao<PersonDao>(DaoType.PersonDao).update(model, ServerType.BCS) as BackResponseBody<boolean>;
        if (resp.data) {
            return true
        } else {
            return Promise.reject(ErrorCode.ERROR_BACK_ERROR)
        }
    }


    static async updateUser(params: PersonEx): Promise<boolean> {
        let result = await BeanHelper.getDao<UserDao>(DaoType.UserDao).findByID(params.UserModel.ID) as BackResponseBody<User>;
        let oldModel: User;
        if (result && result.data) {
            oldModel = result.data
        } else {
            return Promise.reject(ErrorCode.ERROR_BACK_ERROR);
        }
        let model = {} as User;
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
        let resp = await BeanHelper.getDao<UserDao>(DaoType.UserDao).update(model, ServerType.BCS) as BackResponseBody<boolean>;
        if (resp.data) {
            return true
        } else {
            return Promise.reject(ErrorCode.ERROR_BACK_ERROR)
        }
    }

    static async updateUserRole(params: PersonEx) {
        let wheres = [] as Array<Where>;
        let where;
        let childWhere;
        childWhere = new ChildWhere();
        childWhere.FieldName = UserRoleCol.UserID;
        childWhere.FieldType = DataType.Text;
        childWhere.FieldValue = params.UserModel.ID;
        childWhere.JType = JoinType.And;
        childWhere.MType = MatchingType.Equal;
        where = new Where();
        where.Childs = [childWhere];
        wheres.push(where);
        let result: boolean;
        let res = await BeanHelper.getDao<UserRoleDao>(DaoType.UserRoleDao).findListByWhere(wheres) as BackResponseBody<Array<UserRole>>;
        if (res.data && res.data.length > 0) {
            let userRole = res.data[0];
            if (params.UserModel.roleId) {
                userRole.RoleID = params.UserModel.roleId;
            }
            let u = await BeanHelper.getDao<UserRoleDao>(DaoType.UserRoleDao).update(userRole) as BackResponseBody<boolean>;
            result = u.data;
        } else {
            let userRole = new UserRole();
            userRole.UserID = params.UserModel.ID;
            if (params.UserModel.roleId) {// 由于ts的检错机制，需要写这段代码
                userRole.RoleID = params.UserModel.roleId;
            }
            let u = await BeanHelper.getDao<UserRoleDao>(DaoType.UserRoleDao).save(userRole) as BackResponseBody<string>;
            result = !!u.data;
        }
        return result;
    }


    /**
     *  根据 ids 删除 多条数据
     * @time: 2017-04-17 10:59:57
     * @params: id 数据标识id
     * @return:
     */
    async deleteByIds(ids: Array<string>): Promise<Array<Array<any>>> {
        if (!Array.isArray(ids) || ids.length === 0) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM);
        }
        let delIds = [] as Array<Array<string>>;
        for (let i = 0; i < ids.length; i++) {
            let arrId = await this.deleteById(ids[i]);
            delIds.push(arrId)
        }
        return delIds;
    }

    /**
     *  根据 id 删除 一条数据
     * @time: 2017-04-17 10:59:57
     * @params: id 数据标识id
     * @return:
     */
    async deleteById(id: string): Promise<Array<any>> {
        if (!id) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM);
        }
        let delIds = [] as Array<any>;
        let userModel: User, personModel: Person, userRoleModel: UserRole;
        let userResult = await BeanHelper.getDao<UserDao>(DaoType.UserDao).findByID(id) as BackResponseBody<User>;
        if (userResult && userResult.data) {
            userModel = userResult.data;
            let res = await BeanHelper.getDao<UserDao>(DaoType.UserDao).delete([userModel.ID], ServerType.BCS) as BackResponseBody<boolean>;
            res && res.data ? delIds.push({
                table: TableMap.User,
                ID: userModel.ID,
                state: true
            }) : delIds.push({table: TableMap.User, ID: userModel.ID, state: false});
        } else {
            PersonService.LOGGER.info(util.format('user 不存在'));
            return Promise.reject(ErrorCode.ERROR_BACK_ERROR);
        }

        let personResult = await BeanHelper.getDao<PersonDao>(DaoType.PersonDao).findByID(userModel.PersonID) as BackResponseBody<Person>;
        if (personResult && personResult.data) {
            personModel = personResult.data;
            let res = await BeanHelper.getDao<PersonDao>(DaoType.PersonDao).delete([personModel.ID], ServerType.BCS) as BackResponseBody<string>;
            res && res.data ? delIds.push({
                table: TableMap.Person,
                ID: personModel.ID,
                state: true
            }) : delIds.push({table: TableMap.Person, ID: personModel.ID, state: false});
        } else {
            PersonService.LOGGER.info(util.format('person 不存在'))
        }


        let arrWhere = [] as Array<Where>;
        let where = new Where();
        let childWhere = new ChildWhere();
        childWhere.FieldName = UserRoleCol.UserID;
        childWhere.FieldValue = userModel.ID;
        childWhere.FieldType = DataType.Text;
        childWhere.MType = MatchingType.Equal;
        childWhere.JType = JoinType.And;
        where.Childs.push(childWhere);
        arrWhere.push(where);
        let userRoleResult = await BeanHelper.getDao<UserRoleDao>(DaoType.UserRoleDao).findListByWhere(arrWhere) as BackResponseBody<Array<UserRole>>;
        if (Array.isArray(userRoleResult.data) && userRoleResult.data.length > 0) {
            userRoleModel = userRoleResult.data[0];
            let res = await BeanHelper.getDao<UserRoleDao>(DaoType.UserRoleDao).delete([userRoleModel.ID]) as BackResponseBody<string>;
            res && res.data ? delIds.push({
                table: TableMap.UserRole,
                ID: userRoleModel.ID,
                state: true
            }) : delIds.push({table: TableMap.UserRole, ID: userRoleModel.ID, state: false});
        } else {
            PersonService.LOGGER.info(util.format('userRole 不存在'))
        }

        return delIds

    }


    private static async findArea(areaID: string): Promise<Area> {
        let res = await BeanHelper.getDao<AreaDao>(DaoType.AreaDao).findByID(areaID) as BackResponseBody<Area>;
        if (res && res.data) {
            return res.data
        } else {
            return Promise.reject(ErrorCode.ERROR_BACK_ERROR)
        }
    }

    private static async findUnit(unitID: string): Promise<Unit> {
        if (unitID) {
            let res = await BeanHelper.getDao<UnitDao>(DaoType.UnitDao).findByID(unitID) as BackResponseBody<Unit>;
            if (res && res.data) {
                return res.data
            } else {
                return {} as Unit
            }
        } else {
            return {} as Unit
        }
    }

    private static async findUser(personID: string) {
        if (!personID) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM);
        }
        let arrWhere = [] as Array<Where>;
        let where = new Where();
        where.Childs = [] as Array<ChildWhere>;
        let childWhere = new ChildWhere();
        childWhere.FieldName = UserCol.PersonID;
        childWhere.FieldType = DataType.Text;
        childWhere.FieldValue = personID;
        childWhere.MType = MatchingType.Equal;
        childWhere.JType = JoinType.And;
        where.Childs.push(childWhere);
        where.JType = JoinType.And;
        arrWhere.push(where);
        let res = await BeanHelper.getDao<UserDao>(DaoType.UserDao).findListByWhere(arrWhere) as BackResponseBody<Array<UserEx>>;
        return await PersonService.getRoleIdByUserId(res.data[0]);
    }

    private static async getRoleIdByUserId(user?: UserEx) {
        if (!user) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM);
        }
        let arrWhere = [] as Array<Where>;
        let where = new Where();
        let childWhere = new ChildWhere();
        childWhere.FieldName = UserRoleCol.UserID;
        childWhere.FieldValue = user.ID;
        childWhere.FieldType = DataType.Text;
        childWhere.MType = MatchingType.Equal;
        childWhere.JType = JoinType.And;
        where.Childs.push(childWhere);
        arrWhere.push(where);
        let res = await BeanHelper.getDao<UserRoleDao>(DaoType.UserRoleDao).findListByWhere(arrWhere) as BackResponseBody<Array<UserRole>>;
        if (Array.isArray(res.data) && res.data.length > 0) {
            user.roleId = res.data[0].RoleID;
        } else {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM);
        }
        return user;
    }


    /*TODO 用户person 保存/修改 node未进行 相关字段有效非空验证*/
    /**
     *  必要参数验证
     * @time: 2017-04-20 19:56:21
     * @params:isUpdate 是否为更新验证
     * @return:
     */
    private static validateParams(reqParams: PersonEx, isUpdate: boolean) {
        //|| !reqParams.UserModel.UserType  用户类型暂时屏蔽
        if (!reqParams || !reqParams.UserModel || !reqParams.UserModel.roleId
            || !reqParams.UserModel.Uid || !reqParams.Name || !reqParams.CardID || !reqParams.AreaID) {
            return Promise.reject<number>(ErrorCode.ERROR_NO_PARAM);
        }

        // 针对更新状态的额外判断
        if (isUpdate && (!reqParams.ID || !reqParams.UserModel.ID)) {
            return Promise.reject<number>(ErrorCode.ERROR_NO_PARAM);
        }

        return BeanHelper.getDao<UserDao>(DaoType.UserDao).findListByWhere([EqualAndWhere(FildNameLib.Uid, reqParams.UserModel.Uid)])
            .then((res: BackResponseBody<Array<User>>) => {
                if (Array.isArray(res.data) && res.data.length > 0){
                    if (!isUpdate) {
                        return Promise.reject<number>(ErrorCode.ERROR_USER_UID_REPEAT);
                    }else{
                        if(reqParams.UserModel.ID !== res.data[0].ID){
                            return Promise.reject<number>(ErrorCode.ERROR_USER_UID_REPEAT);
                        }
                    }
                    return null
                }else {
                    return null
                }

            })
    };


    async changeStatusByIds(params: PersonChangeStatusParams): Promise<BackResponseBody<string>> {
        if (!params || !params.userIds || typeof params.status !== 'boolean') {
            return Promise.reject(ErrorCode.ERROR_USER_CHANGE_STATUS_PARAMS_NULL);
        }
        let idArr = params.userIds.split(",") as Array<string>;
        let res = await BeanHelper.getDao<UserDao>(DaoType.UserDao).findListByID(idArr, ServerType.BCS);
        if (res.data && res.data.length > 0) {
            res.data.forEach((data: User) => {
                if (data) {
                    data.IsDisable = params.status
                }
            })
        }
        return await BeanHelper.getDao<UserDao>(DaoType.UserDao).updateList(res.data, ServerType.BCS);
    }
}