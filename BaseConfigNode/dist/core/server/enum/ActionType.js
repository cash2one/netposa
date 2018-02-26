"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionType = {
    Unknow: { value: "Unknow", text: "未知" },
    SendAlarmToClient: { value: "SendAlarmToClient", text: "客户端接收报警" },
    SendSms: { value: "SendSms", text: "发送短信" },
    CommandSoundLightAlarm: { value: "CommandSoundLightAlarm", text: "声光报警器" },
    SendAlarmToMsgServer: { value: "SendAlarmToMsgServer", text: "推送给消息服务" },
    SendAlarmToWebChat: { value: "SendAlarmToWebChat", text: "微信推送" },
};
class EnumCheckEx {
    constructor(treeID) {
        this.treeId = treeID ? treeID : null;
        this.isShrink = false;
        this.isCheck = false;
    }
}
exports.EnumCheckEx = EnumCheckEx;
exports.ActionTypeMap = {
    Unknow: new EnumCheckEx(),
    SendAlarmToClient: new EnumCheckEx(),
    SendSms: new EnumCheckEx(),
    CommandSoundLightAlarm: new EnumCheckEx(),
    SendAlarmToMsgServer: new EnumCheckEx(),
    SendAlarmToWebChat: new EnumCheckEx()
};
