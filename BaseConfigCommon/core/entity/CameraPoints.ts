import {SystemPoint} from "./SystemPoint";
/**
 * Created by key on 2017/6/26.
 */
export class Points extends SystemPoint{
    LogTime:number;
    JsonExtData:{[key:string]:any};
    JsonUserData:{[key:string]:any};
    StrJsonUserData:string;
}