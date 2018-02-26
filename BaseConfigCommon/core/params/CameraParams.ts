import {TableParams} from "./table/TableParams";

export class CameraListParams extends TableParams {
    areaId: string;
}

export class CameraChangeAreaIDModel{
    id: string;
    areaId: string;
    deviceReId: string; 
    lampId:string
}

export class CameraChangeCameraType{
    id: string; // 摄像机id
    type: string; // 摄像机类型
}



