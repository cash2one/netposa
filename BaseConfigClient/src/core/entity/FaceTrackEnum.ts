import {Camera} from "./Camera";
import {AccessLogModel} from "./AccessLog";

export class FaceTrackParams {
    startTime: string;
    endTime: string;
    age: number;
    sex: number;
    threshold: number;
    wearGlasses: number;
    wearMask: number;
    imagePath: string;
    maxAge: number;
    minAge: number;
    arrGender: Array<number> = [];
    imagePathList: Array<{id:string,path:string}> = [];
    arrCameraId: Array<string> = [];
    arrEyeGlasses: Array<number> = [];
    arrSunGlasses: Array<number> = [];
    arrSmile: Array<number> = [];
    arrMask: Array<number> = [];
    arrIsPants: Array<number> = [];
    arrIsSleeve: Array<number> = [];
    taskId:string;
}

export class Result {
    AccessLog: AccessLogModel;
    Camera: Camera;
    Score:number;//相似度
}

export class ResultTrack {
    Result: Array<Result>;
    TaskId: string;
    TotalCount: number;
}


