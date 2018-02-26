import {Person} from "../Person";
import {Area} from "../Area";
import {Unit} from "../Unit";
import {UserEx} from "./UserEx";
import {User} from "../User";
/**
 *  扩展 person 行政单位 以及行政区域
 * @time: 2017-04-18 17:15:40
 * @params:
 * @return:
 */
export class PersonEx extends Person{
    AreaModel:Area;
    UnitModel:Unit;
    UserModel:UserEx;
    isSelect?:boolean;
    PersonID?:string;
    IsDisable?:boolean;
    IsForeverValid?:boolean;
}

export class FindPersonModel extends Person{
    JsonUserData: {User: User}
}