/** create by zxq
 * 布控/结构化 任务请求model
 * @time: 2017-06-12 10:42:04
 * @params:
 * @return:
 */
import {Person} from "../entity/Person";
import {EventRuleEx} from "../entity/ex/EventRuleEx";
import {TimeTemplate} from "../entity/TimeTemplate";

export class TaskSearchParams{
    startTime:string;
    endTime:string;
    runStatus:string;
    auditStatus:string;
    name:string;
    listType:string;
    perceiveData:string;
    plateNumber:string;
    pageSize:number;
    currentPage:number;
    areaId:string;
    userId:string;
}

export class TaskModel{
    ArrLibIds: Array<string>;
    AuditDescrption: string;
    AuditStatus: string;
    AuditUser: string;
    AuthUser:string;
    //枚举
    AuthStatus:string;
    AuthUsers: Array<string>;
    CreateUserID:string;
    ControlCommand: boolean;
    CreateTime: string;
    Description: string;
    ID: string;
    Status:string;
    IsLongEffective: boolean;
    HighThreshold: number;
    LowThreshold: number;
    Name: string;
    CameraParams: Array<CameraParam>;
    TimeTemplateID: string;
    TimeTemplate: TimeTemplate;
    TaskType:  string;
    Type:string;
    ValidTimeEnd:  string;
    ValidTimeStart:  string;
    OperateType:string;
    JsonUserData:any;
    AreaID: string;
    EventRule:EventRuleEx;
    EventRuleID:string;
    Ext:string;
}


export class CarMonitor{
    PlateNumber:string;
    PlateColor:string;
    CarPhoto:string;
    DeviceType:string;
    ValidTimeStart:string;
    ValidTimeEnd:string;
    OperateType:string;
    TimeTemplateId:string;
    TimeTemplate: TimeTemplate;
    ListType:string;
    ID:string;
    TaskId:string;
    Name:string;
    CreateTime:string;
    IsLongEffective:boolean;
    CreateUserID:string;
    Status:string;
    ControlCommand:number;
    AuditUser:string;
    AuditUserName:string;
    AuditStatus:string;
    AuthUser:string;
    AuditDesrption:string;
    Description:string;
    TaskType:string;
    EventRuleID:string;
    Ext:any;
    AreaID:string;
    EventRuleName:string;
    JsonUserData:any;
    IsControlByProgram:boolean;
    EventRule:EventRuleEx;
}

export class MacMonitor {
    ID:string;
    Name:string;
    CreateTime:string;
    IsLongEffective:boolean;
    ValidTimeStart:string;
    ValidTimeEnd:string;
    CreateUserID:string;
    TimeTemplateID:string;
    TimeTemplate: TimeTemplate;
    Status:string;
    AuditUser:string;
    AuditStatus:string;
    TaskType:string;
    PerceiveData:string;
    ListType:string;
    Description:string;
    DeviceType:string;
    Ext:any;
    AuditUserName?:string;
    JsonUserData?:any;
    EventRuleID:string;
    OperateType:string;
    EventRule:EventRuleEx;
}

export class CameraParam{
    ID:string;
    Name:string;
    IvsServerID:string;
    Status:boolean;
    CameraID: string;
    DetectMinSize:number = 60;
    DetectMaxSize:number = 200;
    VideoLeft:number = -1;
    VideoRight:number = -1;
    VideoTop:number = -1;
    VideoBottom:number = -1;
    IvsTaskGroupID:string;
    Ext:any;
}