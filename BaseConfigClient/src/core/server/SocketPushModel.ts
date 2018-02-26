/**
 * 消息推送注册实体
 */
export default class SocketPushModel{
    // 当前登录用户的User Model的ID属性
    userID: string;
    // 此字段用于点击选定摄像机接受推送消息等 ObjectID对应的摄像机的ID或者其他资源的ID
    objectID: Array<string> | string;
    // TODO
    socketType: string;
    // 是否取消订阅
    isCancel: boolean;
    //报警数据类型
    alarmType:string
}