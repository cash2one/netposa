import {User} from "../User";
import Role from "../Role";
import {Person} from "../Person";
import {ModuleItemEx} from "./ModuleItemEx";
import {Area} from "../Area";
/**
 * user的拓展对象
 */
namespace UserEx{
    export interface JsonUserData{
        /**
         * 人员信息
         */
        Person: Person;
        /**
         * 用户角色列表
         */
        ListRole: Array<Role>;
        /**
         * 用户登录时产生的令牌
         * 验证权限使用
         */
        UserKey: string;
        /**
         * 登录时间
         */
        LoginTime: number;

        /**
         * 超时时间
         */
        TimeOut: number;
        /**
         * 功能权限
         */
        ModuleItemList: Array<ModuleItemEx>;
    }
}

/**
 *  扩展 IUser personEx 详细信息
 * @time: 2017-04-18 17:16:48
 * @params:
 * @return:
 */
export class UserEx extends User{
    roleId?:string;
    roleIds?:Array<string>;
    JsonUserData:{
        Area:Area;
        ListRole:Array<Role>;
    }
}

export class LoginUserInfo extends User{
    JsonUserData: UserEx.JsonUserData;
}