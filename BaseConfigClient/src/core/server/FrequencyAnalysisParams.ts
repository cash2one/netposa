import {Result} from "../entity/FaceTrackEnum";

export class FrequencyAnalysisParams {
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
    arrGender: Array<number> = [];
    imagePathList: Array<{ id: string, path: string }> = [];
    arrCameraId: Array<string> = [];
    arrEyeGlasses: Array<number> = [];
    arrSunGlasses: Array<number> = [];
    arrSmile: Array<number> = [];
    arrMask: Array<number> = [];
    arrIsPants: Array<number> = [];
    arrIsSleeve: Array<number> = [];
    taskId: string;
    taskName: string;
}

export class FrequencyAnalysisReult {
    Result:Array<FrequencyAnalysisModel>;
    TaskId:string;
    TotalCount:0;
}

export class FrequencyAnalysisModel {
    FaceFrequencys:Array<FaceFrequencyModel>;
    imgUrl: string;
}

export class FaceFrequencyModel{
    CameraID:string;
    FaceFrequencyInfos: Array<Result>
}