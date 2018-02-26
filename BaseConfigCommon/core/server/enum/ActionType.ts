import {Enum} from "../../enum/Enum";

/**
 * 任务权限枚举
 * @time: 2017-06-05 11:53:17
 * @params:
 * @return:
 */


interface IActionType {
    Unknow: { value: string, text: string };
    SendAlarmToClient: { value: string, text: string };
    SendSms: { value: string, text: string };
    CommandSoundLightAlarm: { value: string, text: string };
    SendAlarmToMsgServer: { value: string, text: string };
    SendAlarmToWebChat: { value: string, text: string };

}

export const ActionType: { [key: string]: { value: string, text: string } } & IActionType = {

    Unknow: {value: "Unknow", text: "未知"},
    SendAlarmToClient: {value: "SendAlarmToClient", text: "客户端接收报警"},
    SendSms: {value: "SendSms", text: "发送短信"},
    CommandSoundLightAlarm: {value: "CommandSoundLightAlarm", text: "声光报警器"},
    SendAlarmToMsgServer: {value: "SendAlarmToMsgServer", text: "推送给消息服务"},
    SendAlarmToWebChat: {value: "SendAlarmToWebChat", text: "微信推送"},
};

export class EnumCheckEx implements Enum {
    value: any;
    text: string;
    isCheck: boolean;
    isShrink: boolean;
    treeId: string | null;

    constructor(treeID?: string) {
        this.treeId = treeID ? treeID : null;
        this.isShrink = false;
        this.isCheck = false;
    }
}

export interface IActionTypeMap {
    Unknow: EnumCheckEx
    SendAlarmToClient: EnumCheckEx
    SendSms: EnumCheckEx
    CommandSoundLightAlarm: EnumCheckEx
    SendAlarmToMsgServer: EnumCheckEx
    SendAlarmToWebChat: EnumCheckEx
}

export const ActionTypeMap: { [key: string]: EnumCheckEx } & IActionTypeMap = {
    Unknow: new EnumCheckEx(),
    SendAlarmToClient: new EnumCheckEx(),
    SendSms: new EnumCheckEx(),
    CommandSoundLightAlarm: new EnumCheckEx(),
    SendAlarmToMsgServer: new EnumCheckEx(),
    SendAlarmToWebChat: new EnumCheckEx()
};