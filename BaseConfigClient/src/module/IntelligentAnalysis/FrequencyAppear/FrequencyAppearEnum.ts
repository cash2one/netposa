import { AccessLogModel } from "../../../core/entity/AccessLog";

export class FrequencyAppearParams{
    startTime: string;
    endTime: string;
    age: number;
    sex: number;
    threshold: number = 90;
    wearGlasses: number;
    wearMask: number;
    imagePath: string;
    maxAge: number;
    minAge: number;
    arrGender: Array<any> = [];
    imagePathList: Array<{id:string,path:string}> = [];
    arrCameraId: Array<string> = [];
    arrEyeGlasses: Array<number> = [];
    arrSunGlasses: Array<number> = [];
    arrSmile: Array<number> = [];
    arrMask: Array<number> = [];
    arrIsPants: Array<number> = [];
    arrIsSleeve: Array<number> = [];
    taskName:string;
    taskId:string;
    hauntNum:number;
}


export class FrequencyAppearResult{
    Result:Array<AppearResult>;
    TotalCount:number;
}

export class AppearResult{
    AccessLog:AccessLogModel;
    Count:number;
    SearchAccessResultList:Array<SearchAccessResul>
}

export class SearchAccessResul{
    Score:number;
    AccessLog:AccessLogModel
}