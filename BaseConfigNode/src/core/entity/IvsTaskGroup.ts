export class IvsTaskGroup{
    ID: string;
    Name: string;
    CreateTime: string;
    IsLongEffective: boolean;
    ValidTimeStart: string;
    ValidTimeEnd: string;
    CreateUserID: string;
    TimeTemplateID: string; // 时间模板id
    Status: string;
    ControlCommand: boolean;// 控制状态(默认、手动开启都是1，手动停止是0)
    AuditUser: string;// 审核人
    AuditStatus: string;// 审核状态
    AuthStatus: string;// 权限状态
    AuthUser: string; // 可见用户
    AuditDesrption: string; // 审核描述
    Description: string; // 任务描述
    TaskType: string;// 任务类型
    HighThreshold: number; // 高阈值
    LowThreshold: number; // 低阈值
    IsSubCenterStruct: boolean; // 是否已在下级或专网进行结构化
}