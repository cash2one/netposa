import {TableParams} from "./table/TableParams";

export class ElectronicListParams extends TableParams {
    areaId: string;
}

export class ElectronicChangeAreaIDModel{
    id: string;
    areaId: string;
}

export class ElectronicChangeCameraType{
    id: string; // 摄像机id
    type: string; // 摄像机类型
}



