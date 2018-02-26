/**
 * Created by dell on 2017/6/29.
 */
export const CameraTypeEnum = [
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
    }] as { value: string, text: string }[];

/**
 * 返回摄像机设备类型名称.
 */
let func: Function = (function () {
    let cameraType = {} as { [key: string]: string },
        highCamera = CameraTypeEnum[0],
        faceCamera = CameraTypeEnum[1],
        portraitCamera = CameraTypeEnum[2];

    if (highCamera) {
        cameraType[highCamera.value] = highCamera.text;
    }
    if (faceCamera) {
        cameraType[faceCamera.value] = faceCamera.text;
    }
    if (portraitCamera) {
        cameraType[portraitCamera.value] = portraitCamera.text;
    }
    // 闭包,最终作为函数返回
    return function (type: string): string {
        return (cameraType[type]);
    }
})();

export let GetCameraType = func as (type: string) => string;