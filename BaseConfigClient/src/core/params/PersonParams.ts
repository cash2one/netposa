import {TableParams} from "./table/TableParams";
import {AreaEx} from "../entity/ex/AreaEx";
import {PersonTreeEx} from "../entity/ex/PersonTreeEx";
/**
 *  用户管理相关的请求参数
 * @time: 2017-04-18 16:28:16
 * @params:
 * @return:
 */
export class PersonListParams extends TableParams{
    name: string;
    areaID: string;
    unitID: string;
    roleID?:string;
}

/**
 *  根据id delete 单个用户
 * @time: 2017-04-18 16:28:16
 * @params:
 * @return:
 */
export class PersonDeleteParams {
   id:string;
}
/**
 *  根据id 获取详情
 * @time: 2017-04-22 10:26:40
 * @params:
 * @return:
 */
export class PersonFindByIdParams {
    id:string;
}

/**
 *  根据ids delete 单个用户
 * @time: 2017-04-18 16:28:16
 * @params: 字符串数组
 * @return:
 */
export interface PersonDeleteListParams {
    ids:Array<string>;
}

/**
 * 用户该变用户状态
 * ids: 用户的id字段, 多个id用逗号隔开
 * status: 当前状态
 */
export interface PersonChangeStatusParams{
    userIds: string;
    status: boolean;
}

export class AreaAndPersonListResult{
    areaExList:Array<AreaEx>;
    personExList:Array<PersonTreeEx>;
}