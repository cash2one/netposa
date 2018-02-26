/** create by zxq
 * 智能分析任务分组
 * @time: 2017-06-05 13:45:46
 * @params:
 * @return:
 */
export class IvsTaskGroupModel {
    // 
    ID: string;
    // 名称
    Name: string;
    // 布控用户
    CreateUserID: string;
    // 备注
    Description: string;
    // 创建时间
    CreateTime: Date;
    // 任务运行模板
    TimeTemplateID: string;
    // -1已过期，0停止，1运行中 IvsTaskStatus.value
    Status: string;
    // 控制状态(是否手动控制过开启或停止)
    ControlCmmand: boolean;
    // 任务类型 IvsTaskType.value
    TaskType: string;
    // 有效开始时间
    ValidTimeStart: Date;
    // 有效截止时间
    ValidTimeEnd: Date;
    //  权限状态(0:所有人呢可见1:仅自己可见2:部分人可见)
    AuthStatus: string;
    // 可见用户
    AuthUser: string;
    // 审核人
    AuditUser: string;
    //  审核人列表
    AuthUsers: string[];
    // 审核状态
    AuditStatus: boolean;
    // 审核描述
    AuditDesrption: string;
    // 高阈值 默认值 90
    HighThreshold: number;
    // 低阈值  默认值 90
    LowThreshold: number;
    // 是否长期有效
    IsLongEffective: boolean;
    // 拓展字段
    Ext: string;
}