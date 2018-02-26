"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceTypeEnum = [
    { value: "All", text: "全部" },
    { value: "Face", text: "人像" },
    { value: "Vehicle", text: "车辆" },
    { value: "Camera", text: "摄像机" },
    { value: "RfiD", text: "RFID" },
    { value: "WiFi", text: "WiFi" },
    { value: "LOCATION", text: "位置" },
    { value: "EFENCE", text: "电子围栏" },
    { value: "RmpGate", text: "卡口" },
    { value: "Device", text: "设备" },
    { value: "DeviceCamera", text: "设备：像机" },
    { value: "DeviceWiFi", text: "设备：WiFi" },
    { value: "DeviceRmpGate", text: "设备：卡口" },
    { value: "DeviceEFENCE", text: "设备：电围" }
];
let func = (function () {
    let resouceType = {}, All = exports.ResourceTypeEnum[0], Face = exports.ResourceTypeEnum[1], Vehicle = exports.ResourceTypeEnum[2], Camera = exports.ResourceTypeEnum[3], Rfid = exports.ResourceTypeEnum[4], Wifi = exports.ResourceTypeEnum[5], Location = exports.ResourceTypeEnum[6], ElecttonicFence = exports.ResourceTypeEnum[7], RmpGate = exports.ResourceTypeEnum[8];
    if (Face) {
        resouceType[Face.value] = Face.text;
    }
    if (Vehicle) {
        resouceType[Vehicle.value] = Vehicle.text;
    }
    if (Camera) {
        resouceType[Camera.value] = Camera.text;
    }
    if (Rfid) {
        resouceType[Rfid.value] = Rfid.text;
    }
    if (Wifi) {
        resouceType[Wifi.value] = Wifi.text;
    }
    if (Location) {
        resouceType[Location.value] = Location.text;
    }
    if (ElecttonicFence) {
        resouceType[ElecttonicFence.value] = ElecttonicFence.text;
    }
    if (RmpGate) {
        resouceType[RmpGate.value] = RmpGate.text;
    }
    return function (type) {
        return (resouceType[type]);
    };
})();
exports.GetResourceType = func;
