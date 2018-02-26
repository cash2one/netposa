import {TableParams} from "./table/TableParams";

export class ElectronicFenceListParams extends TableParams {
    areaId: string;
}

export class ElectronicFenceChangeAreaIDModel{
    id: string;
    areaId: string;
    deviceReId: string;
    lampId:string
}

export class ElectronicFenceChangeElectronicFenceType{
    id: string; // 摄像机id
    type: string; // 摄像机类型
}



