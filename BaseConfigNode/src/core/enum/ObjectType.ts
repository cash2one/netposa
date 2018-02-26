/**
 * Created by dell on 2017/5/3.
 */


interface Enum {
    value: string;
    text: string
}

interface IObjectType {
    Unknown: Enum,
    Area : Enum,
    Camera: Enum,
    Wifi: Enum,
    RmpGate: Enum,
    ElectronicFence:Enum,
    Vehicle:Enum,
    Person: Enum,
    SystemPoint: Enum,
    StructTask: Enum,
    Module:Enum,
    BusinessLib:Enum,
    IvsTaskGroup: Enum,
    WebSocketServer:Enum,
    SmsServer: Enum,
    SoundLightAlarmServer: Enum,
    MsgServer:Enum,
    WebChatServer: Enum,
	LampPost: Enum,
};

export const ObjectType :{[key:string]:Enum} & IObjectType= {

    Unknown: {value: "Unknown", text: "未知"},
    Area : {value: "Area", text: "区域"},
    Camera: {value: "Camera", text: "摄像机"},
    Wifi: {value: "WiFi", text: "Wi-Fi"},
    RmpGate: {value: "RmpGate", text: "卡口"},
    ElectronicFence: {value: "EFENCE", text: "电子围栏"},
    Person: {value: "Person", text: "人员"},
    SystemPoint: {value: "SystemPoint", text: "点位"},
    StructTask: {value: "StructTask", text: "结构化任务"},
	LampPost: {value: "LampPost", text: "立杆"},

    Vehicle: {value: "Vehicle", text: "车辆"},
    
    Module: {value: "Module", text: "功能权限"},
    /** create by zxq
     *  人脸库 权限类型是用
     * @time: 2017-06-08 09:52:00
     */
    BusinessLib: {value: "BusinessLib", text: "人脸库"},

    IvsTaskGroup: {value: "IvsTaskGroup", text: "布控/抓拍 任务组"},

    /** create by zxq
     *  用户 t_event_role_action 中的 Object_Type
     * @time: 2017-07-07 12:01:45
     */
    WebSocketServer: {value: "WebSocketServer", text: "客户端接收报警服务"},
    SmsServer: {value: "SmsServer", text: "发送短信服务"},
    SoundLightAlarmServer: {value: "SoundLightAlarmServer", text: "声光报警器服务"},
    MsgServer: {value: "MsgServer", text: "推送给消息服务服务"},
    WebChatServer: {value: "WebChatServer", text: "推送给消息服务服务"},
};
let _IsMacType = (function(){
    let macType = {} as {[key:string]: boolean};

    // wifi 和 电子围栏是mac类型
    macType[ObjectType.Wifi.value] = true;
    macType[ObjectType.ElectronicFence.value] = true;


    // 闭包,最终作为函数返回
    return function(type: string): boolean{
        return (macType[type]);
    }
})();

export let IsMacType = _IsMacType as (type:string)=>boolean;