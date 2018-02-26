import {PersonInfo} from "./PersonInfo";

export class AlarmLogModel {
    ID: string;//编号 String
    AccessLogID: string;//通行抓拍(AccessLog)或采集日志(WiFiLog或EFenceLog)等模型的ID String
    CapFacePicUrl?: string;//人脸图片路径(人像报警特有) String
    ScenePath?: string;//全景图路径（人像报警特有）
    AlarmTime: string;// 报警时间 Date
    AreaID: string;//区域ID int
    IsUpload: boolean;//是否为下级上报的事件
    Level: string;//报警等级 String
    Notes: string;//记录详情 String
    ObjectID: string;//报警对象ID String
    ObjectName: string;//报警对象名称 String
    ObjectType: string;//如Camera、WiFi、EFence String
    ReceiveSubAlarmDateTime: string;// 接收下级系统报警时间 Date
    ResponseNotes: string;// 处理备注 String
    ResponsePerson: string;// 处理人 String
    ResponseState: string;// 处理状态，AlarmStatusType枚举字符串，包含（Unknow、Valid、Invalid、Indeterminate、Undisposed） String
    ResponseTime: string;// 处理时间 Date
    SubSysAlarmLogID: string;// 下级系统的报警ID String
    TaskId: string;// 布控任务ID String
    UploadState: string;// 上传状态 String
    Similarty: number;// 相似度（暂未实用） double
}

export class AlarmLogInfo{
    AlarmLogID:string;
    ID:string;
    LibID:string;
    PersonInfo:PersonInfo;
    Similarty:number;
    SimilartyStatus:number;
}