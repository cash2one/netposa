"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
exports.ObjectType = {
    Unknown: { value: "Unknown", text: "未知" },
    Area: { value: "Area", text: "区域" },
    Camera: { value: "Camera", text: "摄像机" },
    Wifi: { value: "WiFi", text: "Wi-Fi" },
    RmpGate: { value: "RmpGate", text: "卡口" },
    ElectronicFence: { value: "EFENCE", text: "电子围栏" },
    Person: { value: "Person", text: "人员" },
    SystemPoint: { value: "SystemPoint", text: "点位" },
    StructTask: { value: "StructTask", text: "结构化任务" },
    LampPost: { value: "LampPost", text: "立杆" },
    Vehicle: { value: "Vehicle", text: "车辆" },
    Module: { value: "Module", text: "功能权限" },
    BusinessLib: { value: "BusinessLib", text: "人脸库" },
    IvsTaskGroup: { value: "IvsTaskGroup", text: "布控/抓拍 任务组" },
    WebSocketServer: { value: "WebSocketServer", text: "客户端接收报警服务" },
    SmsServer: { value: "SmsServer", text: "发送短信服务" },
    SoundLightAlarmServer: { value: "SoundLightAlarmServer", text: "声光报警器服务" },
    MsgServer: { value: "MsgServer", text: "推送给消息服务服务" },
    WebChatServer: { value: "WebChatServer", text: "推送给消息服务服务" },
};
let _IsMacType = (function () {
    let macType = {};
    macType[exports.ObjectType.Wifi.value] = true;
    macType[exports.ObjectType.ElectronicFence.value] = true;
    return function (type) {
        return (macType[type]);
    };
})();
exports.IsMacType = _IsMacType;
