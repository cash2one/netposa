import {Camera} from './Camera'
export class AccompanyingAnalysis{
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
    taskName: string;
    taskId: string;
    agofollowTime: number;
    afterfollowTime: number;
    followNum: number;
}


export class Result {
    AccessLog: AccessLogModel;
    camera: Camera
}
export class AccompanyingAnalysisResult{
    result: Array<Result>;
    taskId: string;
    totalCount: number;
    cameraOrderList: Array<AccessLogOrderModel>;
}

export class AccessLogOrderModel {
    serialVersionUID: string;
    Camera: any;
    recordCount: number;
    accessLogList: Array<AccessLogModel>
}

export class ModelRes {
    ID: string;
    Age: number;
    AreaID: string;
    Attractive: number;
    CameraID: string;
    Glass: number;
    Race: number;
    FaceConfidence: number;
    FaceFeature: string;
    FacePath: string;
    FaceRect: string;
    Gender: string;
    HasextractAttribute: boolean;
    HasextractFeature: boolean;
    HasfaceFeature: boolean;
    IsPants: number;
    IsSleeve: number;
    LogTime: string;
    Mask: number;
    Orientation: number;
    PersonConfidence: number;
    PersonFeature: string;
    PersonPath: string;
    PersonRect: string;
    SaveTime: string;
    ScenePath: string;
    Smile: number;
    SunGlasses: number;
    TaskID: string;
    Texture: number;
    UpperColor: number;
    BottomColor: number;
    similar:string;
    address:string;
    licencePlate:string;
    speed:string;
}

export class AccessLogModel extends ModelRes{
    AccompanyingRes:Array<Result>
}

export class wifiResult {
	AcqTime: string;
	ID: string;
	IMEI: string;
	IMSI: string;
	IMSI2: string;
	Mac: string;
	MobileDeviceId?: string;
	MacDeviceId?: string;
	resultIndex:number;
}
