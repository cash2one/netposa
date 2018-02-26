
/**
 * 定义一个接口, 因为界面上使用时, 有些参数可填可不填, 为了ts在非必填的情况下不抱错, 且不影响业务代码的情况下, 在这里增加一个ISystemLog
 */
export interface ISystemLog{
    //编号
    ID?: string;
    //操作用户Id
    OperatorUser?:string;
    //操作Ip
    OperatorIP?:string;
    //操作模块
    OperModule?:string;
    //二级操作模块
    OperSecondModule?:string;
    //三级功能
    OperThirdModule?:string;
    //操作时间
    OperatorTime?:string;
    //详情
    Descrption?:string;
    //动作类型
    ActionType?:string;
    //对象类型
    ObjectType?:string;
    //对象Id
    ObjectID?:string;
    //对象名称
    ObjectName?:string;
    //请求返回值
    OperResult?:string;
    //扩展字段
    Ext?:string;
}
export class SystemLog implements ISystemLog{
    //编号
    ID: string;
    //操作用户Id
    OperatorUser:string;
    //操作Ip
    OperatorIP:string;
    //操作模块
    OperModule:string;
    //二级操作模块
    OperSecondModule: string;
    //三级功能
    OperThirdModule: string;
    //操作时间
    OperatorTime:string;
    //详情
    Descrption:string;
    //动作类型
    ActionType:string;
    //对象类型
    ObjectType:string;
    //对象Id
    ObjectID:string;
    //对象名称
    ObjectName:string;
    //请求返回值
    OperResult?: string;
    //扩展字段
    Ext:string;
}
