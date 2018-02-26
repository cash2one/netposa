// /**
//  * Created by key on 2017/6/30.
//  */
// import {LocalSearchAlarmLogResult} from "./SocketAlarmModel"
// import {PersonInfo} from "./SocketAlarmModel"
//
// export class AlarmModel{
//     Result:Array<LocalSearchAlarmLogResult | AlarmWithImgModule>;
//     TaskId:string;
//     TotalCount:number
// }
//
// //带图片的报警检索
// export class AlarmWithImgModule{
//     AlarmLogArr:Array<AlarmLogItem>;
//     AlarmNum:number;
//     AlarmPersonInfo:AlarmPersonInfo;
//     LibName:string;
//     Score:number;
// }
//
// export class AlarmLogItem{
//     AlarmLog:AlarmLog
//     AreaName:string;
//     ResponsePersonName:string
// }
//


export class AlarmLog{
    AccessLogID:string;
    AlarmTime:string;
    AreaID:string;
    CapFacePicUrl:string;
    EventType:string;
    ID:string;
    IsUpload:boolean;
    Level:number;
    ObjectID:string;
    ObjectName:string;
    ObjectType:string;
    ReceiveSubAlarmDateTime: string;
    ResponseState:string;
    ResponseTime:string;
    Similarty:number;
    TaskId:string;

    Notes: string; // mac地址名
}

export class PersonInfo{
    Name: string;
    ID: string;
    LogTime: string;
    IDCardNumber: string;
    FacePicPath: Array<string>;
    Birth: string;
    HomeAddress: string;
    Nation: string;
    LibId: string;
    BeginDate: string;
    CreateTime: string;
    UpdateTime: string;
    CertifyingAuthority: string;
    Gender: string;
    userTag: string;
}

export class AlarmLogInfo{
    AlarmLogID: string;
    ID: string;
    LibID: string;
    PersonInfo: PersonInfo;
    Similarty: string;
    SimilartyStatus: string;
}
/**
 * 报警检索结果
 * 已使用模块 我的报警
 */
export class SearchAlarmLogResult{
    AlarmLog: AlarmLog;
    AlarmLogInfoArr: Array<AlarmLogInfo>;
    AlarmNum: number;
    AreaName: string;
    Attention: boolean;
    Collected: boolean;
    ResponsePersonName: string; // 处理人
}

export class personAlarm{
    result: SearchAlarmLogResult;
    resultType: string;
}

/**
 * 车辆报警
 */
export class VehicleAlarmLog{
    _id: number;
    dealTime: string;
    dealUser: string ;
    alarmObj: string ;
    alarmObjName: string ;
    alarmLevel: string ;
    alarmType: string ;
    alarmStatus: string ;
    comment: string ;
    source: string ;
    dealStatus: string ;
    //布控报警id
    oriId: string ;
    absTime: number ;
    statisticTime: number ;
    detail: VehicleAlarmLogDeitail;
}
/**
 * 车辆报警详情
 */
export class VehicleAlarmLogDeitail{
    x:string ;
    y:string ;
    monitorId:string ;
    vehicleType:string ;
    channelName:string ;
    imageURLs:string ;
    monitorName:string ;
    passTime:string ;
    plateColor:string ;
    vehicleBrand:string ;
    channelId:string ;
    speed:number ;
    plateType:string ;
    
    vehicleColor:string ;
}
//
// export class AlarmPersonInfo extends PersonInfo{
//     FacePicPath:string[]
// }
//
// //操作记录
// export class OperRecordModel{
//     action:string;
//     alarmLogInfoArr:Array<OperRecordItem>;
//     operateTime:string;
//     operatorName:string;
//     operatorUid:string;
//     remarks:string;
// }
//
// export class OperRecordItem{
//     alarmLogInfoId:string;
//     libId:string;
//     libName:string;
//     personGender:string;
//     personId:string;
//     personImageUrl:string;
//     personName:string;
//     similarty:number;
// }
//
// export class CreatePerson{
//     AreaCode:string;
//     AreaID:string;
//     AreaName:string;
//     ID:string;
//     PersonID:string;
//     PersonName:string;
//     PoliceID:string;
// }