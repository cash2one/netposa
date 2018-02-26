import {PersonInfo} from "./PersonInfo";

export class FaceAnalysisParams {
    idCardNumber: string; // 身份信息
    arrLibId: Array<string>; // 选中人像库
    threshold: number; // 相似度
    arrGender: Array<any>; // 性别 0 全部 1 男  2 女
    nation: string; // 民族
    retrievalReason: string; // 检索事由
    maxAge: number;
    minAge: number;
    name: string;
    address: string;
    imagePath?: string; // 上传图片识别人脸
    taskId?: string;
    featureType?: string;
    accessLogId?: string;
    ImgUrl?: string;
    LibId?: string;
    PersonId?: string;
}

export class FaceAnalysisResult {
    Result: Array<PersonInfoModel>;
    LibNameList: Array<{ID:string,value:string}>;
    TaskId: string;
    TotalCount: number;
}

export class PersonInfoModel {
    PersonInfo: PersonInfo;
    Score: number;
    LibId:string;
    LibName:string;
    PersonMemo:string;
}




