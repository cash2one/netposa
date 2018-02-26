/**
 * 枚举基本的数据类型
 * @time: 2017-04-18 19:38:47
 * @params:
 * @return:
 */
export class Enum {
    value?:any;
    text:string;
    index?: number;
}

export interface ValueTextEnumType {
    [key:string]: Enum;
}
