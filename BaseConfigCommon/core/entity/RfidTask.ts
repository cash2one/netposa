/**
 * 此字段与IvsTaskGroup相同暂时不使用
 */
export class RfidTask{
    ID: string;
    Name: string;
    CreateTime: string;
    IsLongEffective: boolean;
    ValidTimeStart: string;
    ValidTimeEnd: string; // 
    CreateUserID: string; // 创建用户id
    TimeTemplateID: string; // 时间模版id
    Status: string; // -1已过期，0停止，1运行中 IvsTaskStatus.value
    AuditUser: string; // 审核人
    AuditStatus: string; // 审核状态
    TaskType: string; // 任务类型 IvsTaskType.value
    PerceiveData: string; // 感知数据，可以为MAC地址、IMEI、IMSI
    ListType: string; // 白名单、黑名单、红名单
    Description: string; // 任务描述
    DeviceType: string; // 设备类型
}