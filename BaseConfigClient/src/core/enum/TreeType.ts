import {CameraTypeEnum} from "../server/enum/CameraTypeEnum";
/**
 *  树 类型枚举
 * @time: 2017-05-04 15:34:17
 * @params:
 * @return:
 */
export const TreeType={
    area: {value: "area", text: "区域树"},
    businessLib: {value: "businessLib", text: "人脸库树"},
    camera: {value: "camera", text: "摄像机树"},
    person: {value: "person", text: "用户树"},
    unit: {value: "unit", text: '单位树'},
    iod: {value: "iod", text: "IOD树"},
    rfid: {value: "rfid", text: "RFID树"},
    lamp: {value: "lamp", text: "LAMP树"},
    wifi: {value: "wifi", text: "wifi树"},
    rmpGate: {value: "RmpGate", text: "rmpGate树"},
    ElectronicFence: {value: "ElectronicFence", text: "electronicFence树"},
};

export const TreeIconSkin = {
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
    Iod:"iod",
    Lamp:"lamp",
    ElectronicFence:'ElectronicFence',
    wifi:'wifi',
    rmpGate:'rmpGate'
};
let func:Function = (function(){
    let cameraType = {} as {[key:string]:string},
        normalCamera = CameraTypeEnum[0],
        faceCamera = CameraTypeEnum[1],
        bodyCamera = CameraTypeEnum[2],
        portraitCamera = CameraTypeEnum[3];

    if(normalCamera){
        cameraType[normalCamera.value] = TreeIconSkin.NormalCamera;
    }
    if(faceCamera){
        cameraType[faceCamera.value] = TreeIconSkin.FaceCamera;
    }
    if(bodyCamera){
        cameraType[bodyCamera.value] = TreeIconSkin.BodyCamera;
    }
    if(portraitCamera){
        cameraType[portraitCamera.value] = TreeIconSkin.PortraitCamera;
    }

    // 闭包,最终作为函数返回
    return function(type: string): string{
        return (cameraType[type] || TreeIconSkin.NormalCamera);
    }
})();

export let GetCameraIconByCameraType = func as (type:string)=>string;