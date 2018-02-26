"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CameraTypeEnum = [
    {
        value: "HighCamera",
        text: "高清摄像机"
    },
    {
        value: "FaceCamera",
        text: "人脸摄像机"
    },
    {
        value: "PortraitCamera",
        text: "人像摄像机"
    }
];
let func = (function () {
    let cameraType = {}, highCamera = exports.CameraTypeEnum[0], faceCamera = exports.CameraTypeEnum[1], portraitCamera = exports.CameraTypeEnum[2];
    if (highCamera) {
        cameraType[highCamera.value] = highCamera.text;
    }
    if (faceCamera) {
        cameraType[faceCamera.value] = faceCamera.text;
    }
    if (portraitCamera) {
        cameraType[portraitCamera.value] = portraitCamera.text;
    }
    return function (type) {
        return (cameraType[type]);
    };
})();
exports.GetCameraType = func;
