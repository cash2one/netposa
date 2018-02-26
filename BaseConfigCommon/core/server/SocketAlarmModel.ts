//
// import {TrailAccssLogModel} from "./TrailAccssLog";
// /**
//  *
//  */
// export class LocalPersonInfo{
//     id: string;
//     name: string;
//     idCardNumber: string;
//     birth: string;
//     homeAddress: string;
//     personGender: string;
//     // 籍贯
//     nation: string;
//     facePicPath: Array<string>;
//     certifyingAuthority: string;
//     beginDate: string;
//     endDate: string;
//     createTime: string;
//     updateTime: string;
//     libId: string;
//     libName: string;
//     memo: string;
// }
// /**
//  * 本地报警记录
//  */
// export class LocalAlarmLog{
//     ID: string;
//     AccessLogId: string;
//     AlarmTime: Date;
//     TaskId: string;
//     ObjectID: string;
//     ObjectName: string;
//     ObjectType: string;
//     AreaId: string;
//     AreaName: string;
//     CapFacePicUrl: string;
//     CapSencePicUrl: string;
//     Level: number;
//     EventType: string;
//     ResponseState: string;
//     ResponsePerson: string;
//     ResponsePersonName: string;
// }
//
// /**
//  * 本地报警信息对象
//  */
// export class LocalAlarmLogInfo{
//     AlarmLogInfo:AlarmLogInfo;
//     LibName:string;
//     Memo:string;
// }
//
// export class AlarmLogInfo{
//     AlarmLogID:string;
//     ID:string;
//     LibID:string;
//     PersonInfo:PersonInfo;
//     Similarty:number;
//     SimilartyStatus? : string;
// }
//
// export class PersonInfo{
//     BeginDate:string;
//     EndDate:string;
//     CreateTime:string;
//     FacePicPath:Array<string>;
//     Gender:string;
//     ID:string;
//     IDCardNumber:string;
//     LibId:string;
//     Name:string;
//     UpdateTime:string;
//     Birth:string;
//     HomeAddress:string;
//     Nation:string;
//     CertifyingAuthority:string;
// }
//
// /**
//  * 不带图片的报警检索前端model
//  */
// export class LocalSearchAlarmLogResult{
//     AlarmLog: LocalAlarmLog;
//     AlarmLogInfoArr: Array<LocalAlarmLogInfo>;
// }
// // 带图片的报警检索前端model
// export class LocalSearchAlarmLogInfoResult{
//     // 报警日志
//     alarmLogArr: Array<LocalAlarmLog>;
//     // 库人员信息
//     AlarmPersonInfo: LocalPersonInfo;
//     // 比分
//     score: number;
//     // 报警次数
//     alarmNum: number;
// }
//
// /**
//  * 轨迹分析model
//  */
// export class TraceResult{
//     result:Array<TrailAccssLogModel>;
//     taskId:string;
//     totalCount:number
// }
//
// /**
//  * 报警处理提交参数 前端model
//  */
// export class PopupAlarmDispose{
//
//     AlarmStatus : alarmStatus;
//     //人员比对信息 ID 数组
//     AlarmInfoStatusArr? : any;
//
// }
// export class alarmStatus{
//     //报警ID
//     ID : string;
//     //处理的状态
//     ResponseStatus : string;
//     //处理意见说明
//     ResponseNotes : string;
// }
// export class alarmInfoStatusArr{
//     ID : string;
//     Status : string;
// }