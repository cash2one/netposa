/**
 * 系统全局配置参数model
 */
import {Parameter} from "../Parameter";

export class ParameterEx extends  Parameter{
    children:Array<Parameter>;
    /*页面显示 使用*/
    sortIndex:number
}