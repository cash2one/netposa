import {CameraParam} from "./CameraParam";

export class SearchTaskResult {
    // 任务ID
    TaskID: string;
    // 任务名称
    TaskName: string;
    // 区域Id
    AreaID: string;
    // 区域名称
    AreaName: string;
    // 创建时间
    CreateTime: Date;
    // 创建人
    CreateUserName: string;
    // 运行状态
    RunStatus: string;
    // 审核状态
    AuditStatus: string;
    // 描述
    Description: string;
}

export class VideoTaskModel {
    /**
     * 任务ID
     */
    Id: string;

    /**
     * 任务类型
     */
    Type: string;
    /**
     * 名称
     */
    Name: string;

    /**
     * 创建时间
     */
    CreateTime: Date;

    /**
     * 是否长期有效
     */
    LongEffective: boolean;

    /**
     * 有效开始时间
     */
    ValidTimeStart: Date;
    /**
     * 有效终止时间
     */
    ValidTimeEnd: Date;

    /**
     * 创建人
     */
    CreateUserId: string;

    /**
     * 时间模板id
     */
    TimeTemplateID: string;

    /**
     * 控制命令
     */
    ControlCommand: boolean;

    /**
     * 审核者
     */
    AuditUser: string;
    /**
     * 审核状态
     */
    AuditStatus: boolean;
    /**
     * 可见用户.
     */
    AuthUser: string;
    /**
     * 可见用户列表.
     */
    AuthUsers: string[];

    /**
     * 权限状态
     */
    AuthStatus: string;
    /**
     * 审核描述
     */
    AuditDescrption: string;
    /**
     * 描述
     */
    Description: string;
    /**
     * 布控库id
     */
    ArrLibIds: string[];
    /**
     * 高阈值报警
     */
    HighThreshold: number;
    /**
     * 低阈值报警
     */
    LowThreshold: number;
    /**
     * 是否长期有效
     */
    IsLongEffective: boolean;
    /**
     * -1已过期，0停止，1运行中 IvsTaskStatus.value
     */
    Status: string;
    /**
     * 拓展字段
     */ 
    Ext: string;
    /**
     * 相机参数
     */
    CameraParams: CameraParam[];

    userID: string;
}