"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CameraTypeEnum_1 = require("../server/enum/CameraTypeEnum");
exports.TreeType = {
    area: { value: "area", text: "区域树" },
    businessLib: { value: "businessLib", text: "人脸库树" },
    camera: { value: "camera", text: "摄像机树" },
    person: { value: "person", text: "用户树" },
    unit: { value: "unit", text: '单位树' },
    iod: { value: "iod", text: "IOD树" },
    rfid: { value: "rfid", text: "RFID树" },
    lamp: { value: "lamp", text: "LAMP树" },
    wifi: { value: "wifi", text: "wifi树" },
    rmpGate: { value: "RmpGate", text: "rmpGate树" },
    ElectronicFence: { value: "ElectronicFence", text: "electronicFence树" },
};
exports.TreeIconSkin = {
    Area: "area",
    BusinessLib: "businessLib",
    NormalCamera: "camera",
    BodyCamera: "bodycamera",
    FaceCamera: "facecamera",
    PortraitCamera: "portraitcamera",
    Unit: "unit",
    Police: "police",
    Person: "person",
    Rfid: 'rfid',
    Iod: "iod",
    Lamp: "lamp",
    ElectronicFence: 'ElectronicFence',
    wifi: 'wifi',
    rmpGate: 'rmpGate'
};
let func = (function () {
    let cameraType = {}, normalCamera = CameraTypeEnum_1.CameraTypeEnum[0], faceCamera = CameraTypeEnum_1.CameraTypeEnum[1], bodyCamera = CameraTypeEnum_1.CameraTypeEnum[2], portraitCamera = CameraTypeEnum_1.CameraTypeEnum[3];
    if (normalCamera) {
        cameraType[normalCamera.value] = exports.TreeIconSkin.NormalCamera;
    }
    if (faceCamera) {
        cameraType[faceCamera.value] = exports.TreeIconSkin.FaceCamera;
    }
    if (bodyCamera) {
        cameraType[bodyCamera.value] = exports.TreeIconSkin.BodyCamera;
    }
    if (portraitCamera) {
        cameraType[portraitCamera.value] = exports.TreeIconSkin.PortraitCamera;
    }
    return function (type) {
        return (cameraType[type] || exports.TreeIconSkin.NormalCamera);
    };
})();
exports.GetCameraIconByCameraType = func;
