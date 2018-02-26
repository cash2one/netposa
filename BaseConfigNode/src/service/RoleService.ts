import { Person } from './../core/entity/Person';
import * as log4js from 'log4js';
import * as util from 'util';
import ErrorCode from '../common/res/ErrorCode';
import Role from '../core/entity/Role';
import RoleDao from '../dao/RoleDao';
import UserRoleDataDao from '../dao/UserRoleDataDao';
import { BackResponseBody } from '../core/params/result/ResponseResult';
import { BeanHelper } from '../common/help/BeanHelper';
import { DaoType } from '../dao/enum/DaoType';
import { EqualAndWhere, UnEqualAndWhere } from '../model/WhereLib';
import { FildNameLib } from '../model/FildNameLib';
import { ObjectType } from '../core/enum/ObjectType';
import { RoleDetailResult, RoleParams } from '../core/params/RoleParams';
import { UserRoleData } from '../core/entity/UserRoleData';
import { UserRoleDataEx } from '../core/entity/ex/UserRoleDataEx';
import PersonDao from "../dao/PersonDao"
import UserDao from "../dao/UserDao";
import { User } from './../core/entity/User';
/**
 * Created by dell on 2017/5/13.
 */
export interface IRoleService {
    list(params: RoleParams): Promise<BackResponseBody<Array<Role>>>;

    detail(roleId: string): Promise<number | RoleDetailResult>;

    save(params: RoleDetailResult): Promise<string>;

    update(params: RoleDetailResult): Promise<boolean>;

    deleteById(id: string): Promise<BackResponseBody<boolean> | number>;
}

export class RoleService implements IRoleService {

    private static LOGGER = log4js.getLogger("RoleService");

    deleteById(id: string): Promise<BackResponseBody<boolean> | number> {
        return Promise.resolve(null)
            .then<number | BackResponseBody<boolean>>(() => {
                if (id != null) {
                    return BeanHelper.getDao<RoleDao>(DaoType.RoleDao).delete([id]);
                } else {
                    return Promise.reject(ErrorCode.ERROR_NO_ROLE);
                }
            });
    }


    detail(roleId: string): Promise<number | RoleDetailResult> {
        return Promise.resolve(null)
            .then<number | null>(() => {
                if (roleId == null) {
                    return Promise.reject(ErrorCode.ERROR_NO_PARAM);
                }
                return null;
            })
            .then(() => {
                let arr: [Promise<Role>, Promise<RoleDetailResult>] = [getRoleDetail(roleId), findModuleIds(roleId)];
                return Promise.all(arr);
            }).then<number | RoleDetailResult>((data: [Role, RoleDetailResult]) => {
                let result = new RoleDetailResult();
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
                } else {
                    // role没有找到, 则请求流程失败
                    // 极少数情况才会进入此判断
                    return Promise.reject(ErrorCode.ERROR_NO_ROLE);
                }
            });

        function getRoleDetail(roleId: string) {
            return BeanHelper.getDao<RoleDao>(DaoType.RoleDao).findByID(roleId)
                .then((data: BackResponseBody<Role>) => {
                    return data.data;
                });
        }

        function findModuleIds(roleId: string) {
            return Promise.resolve(null)
                .then(() => {
                    return BeanHelper.getDao<UserRoleDataDao>(DaoType.UserRoleDataDao).findListByWhere([EqualAndWhere(FildNameLib.RoleID, roleId)])
                        .then(findModuleListByIds);
                })

        }

        function findModuleListByIds(res: BackResponseBody<Array<UserRoleData>>) {
            let userRoleDataExList = {} as RoleDetailResult;
            userRoleDataExList.funcModuleList = [];
            userRoleDataExList.cameraPowerList = [];
            userRoleDataExList.wifiPowerList = [];
            userRoleDataExList.rmpgatePowerList = [];
            userRoleDataExList.efencePowerList = [];
            userRoleDataExList.facelibPowerList = [];
            if (res.data && res.data.length > 0) {
                res.data.forEach((model: UserRoleData) => {
                    let userRoleDataEx = new UserRoleDataEx();
                    userRoleDataEx.RoleID = model.RoleID;
                    userRoleDataEx.ID = model.ID;
                    userRoleDataEx.ObjectType = model.ObjectType;
                    userRoleDataEx.ObjectID = model.ObjectID;
                    try {
                        userRoleDataEx.operateList = RoleService.roleCommandListToArray(model.ObjectData);
                    } catch (e) {
                        userRoleDataEx.operateList = []
                    }
                    if (model.ObjectType === ObjectType.Module.value) {
                        userRoleDataExList.funcModuleList.push(userRoleDataEx);
                    }
                    if (model.ObjectType === ObjectType.BusinessLib.value) {
                        userRoleDataExList.facelibPowerList.push(userRoleDataEx);
                    }
                    if (model.ObjectType === ObjectType.Wifi.value) {
                        userRoleDataExList.wifiPowerList.push(userRoleDataEx);
                    }
                    if (model.ObjectType === ObjectType.RmpGate.value) {
                        userRoleDataExList.rmpgatePowerList.push(userRoleDataEx);
                    }
                    if (model.ObjectType === ObjectType.Camera.value) {
                        userRoleDataExList.cameraPowerList.push(userRoleDataEx);
                    }
                    if (model.ObjectType === ObjectType.ElectronicFence.value) {
                        userRoleDataExList.efencePowerList.push(userRoleDataEx);
                    }
                });
            }
            return Promise.resolve(userRoleDataExList);
        }
    }


    async list(params: RoleParams): Promise<BackResponseBody<Array<Role>>> {
        let res = await Promise.all([
            BeanHelper.getDao<RoleDao>(DaoType.RoleDao).findListByWhere([UnEqualAndWhere(FildNameLib.ID, '1')]),
            BeanHelper.getDao<UserDao>(DaoType.UserDao).findAll(),
            BeanHelper.getDao<PersonDao>(DaoType.PersonDao).findAll()
        ]);
        let userMap = (function () {
            let j = {} as { [key: string]: User };
            if (!Array.isArray(res[1].data)) {
                return j
            }
            res[1].data.forEach((user: User) => {
                j[user.ID] = user;
            });
            return j
        })();

        let personMap = (function () {
            let j = {} as { [key: string]: Person };
            if (!Array.isArray(res[2].data)) {
                return j
            }
            res[2].data.forEach((person: Person) => {
                j[person.ID] = person;
            });
            return j
        })();

        if (Array.isArray(res[0].data) && Array.isArray(res[1].data)) {
            res[0].data.forEach((role: Role) => {
                if(userMap[role.CreaterID] && personMap[userMap[role.CreaterID].PersonID]){
                    role.JsonUserData.Person = personMap[userMap[role.CreaterID].PersonID]
                }else{
                    role.JsonUserData.Person = {}
                }
            });
        }

        return res[0];
    }

    async save(params: RoleDetailResult): Promise<string> {
        let result_roleId: string;
        if (!params || !params.role || !params.role.Name ||
            !Array.isArray(params.roleDataList) || params.roleDataList.length === 0) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM);
        }
        let validName = await BeanHelper.getDao<RoleDao>(DaoType.RoleDao).findListByWhere([EqualAndWhere(FildNameLib.Name, params.role.Name)]);

        if (Array.isArray(validName.data) && validName.data.length > 0) {
            return Promise.reject(ErrorCode.ERROR_REPEAT_ROLE_NAME);
        }
        let res = await BeanHelper.getDao<RoleDao>(DaoType.RoleDao).save(params.role);
        if (res.data) {
            let roleId = res.data;
            result_roleId = roleId;
            let roleDatas = [] as Array<UserRoleData>;
            params.roleDataList.forEach((userRoleDataEx: UserRoleDataEx) => {
                let roleData = {} as UserRoleDataEx;
                roleData.IsVisible = true;
                roleData.ObjectData = RoleService.RoleCommandListToString(userRoleDataEx.operateList);
                roleData.ObjectID = userRoleDataEx.ObjectID;
                roleData.RoleID = roleId;
                roleData.ObjectType = userRoleDataEx.ObjectType;
                roleDatas.push(roleData);
            });
            await BeanHelper.getDao<UserRoleDataDao>(DaoType.UserRoleDataDao).addList(roleDatas);
        } else {
            return Promise.reject(ErrorCode.ERROR_SAVE_ROLE);
        }
        return result_roleId;
    }

    async update(params: RoleDetailResult) {
        if (!params || !params.role || !params.role.Name || !params.role.ID ||
            !Array.isArray(params.roleDataList) || params.roleDataList.length === 0) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM);
        }
        let validName = await BeanHelper.getDao<RoleDao>(DaoType.RoleDao).findListByWhere([EqualAndWhere(FildNameLib.Name, params.role.Name)]);
        if (Array.isArray(validName.data) && validName.data.length > 0) {
            if (validName.data[0].ID !== params.role.ID) {
                return Promise.reject(ErrorCode.ERROR_REPEAT_ROLE_NAME);
            }
        }
        let res = await BeanHelper.getDao<RoleDao>(DaoType.RoleDao).findByID(params.role.ID);
        if (res.data) {
            let origin = res.data;
            origin.Name = params.role.Name;
            origin.Description = params.role.Description;
            await BeanHelper.getDao<RoleDao>(DaoType.RoleDao).update(origin);
        } else {
            return Promise.reject(ErrorCode.ERROR_NO_ROLE);
        }
        return BeanHelper.getDao<UserRoleDataDao>(DaoType.UserRoleDataDao)
            .deleteByWhere([EqualAndWhere(FildNameLib.RoleID, params.role.ID)]).then(() => {
                let roleDatas = [] as Array<UserRoleData>;
                params.roleDataList.forEach((userRoleDataEx: UserRoleDataEx) => {
                    let roleData = {} as UserRoleDataEx;
                    roleData.IsVisible = true;
                    roleData.ObjectData = RoleService.RoleCommandListToString(userRoleDataEx.operateList);
                    roleData.ObjectID = userRoleDataEx.ObjectID;
                    roleData.RoleID = params.role.ID;
                    roleData.ObjectType = userRoleDataEx.ObjectType;
                    roleDatas.push(roleData);
                });

                return BeanHelper.getDao<UserRoleDataDao>(DaoType.UserRoleDataDao).addList(roleDatas);
            });
    }


    constructor() {
    }

    //t_user_role_data 中 RoleCommandList json 字符转换
    private static RoleCommandListToString(data: Array<string>): string {
        let result: { RoleCommandList: Array<string> } = {
            RoleCommandList: data || []
        };
        return JSON.stringify(result);
    }

    // t_user_role_data 中 RoleCommandList json 字符转换未operateList
    private static roleCommandListToArray(roleCommandList: string): Array<string> {
        let _operateList = JSON.parse(roleCommandList);
        if (_operateList && _operateList.RoleCommandList && _operateList.RoleCommandList.length > 0) {
            return _operateList.RoleCommandList;
        } else {
            return [] as Array<string>;
        }
    }
}