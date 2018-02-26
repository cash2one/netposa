/**
 * @class FildNameLib
 * @title FieldName Library 字段名仓库
 * @update hjj
 * @time 2017年11月7日 13:24:08
 */
export class FildNameLib {
    static readonly ID = 'ID';
    static readonly Uid = 'Uid';
    static readonly TaskType = 'TaskType';
    static readonly CreateUser = 'CreateUser';
    static readonly CreateUserID = 'CreateUserID';
    static readonly AuditUser = 'AuditUser';
    static readonly AuthStatus = 'AuthStatus';
    static readonly AuthUser = 'AuthUser';
    static readonly CreateTime = 'CreateTime';
    static readonly ObjectID = 'ObjectID';
    static readonly ObjectId = 'ObjectId';
    static readonly RelatedObjectType = 'RelatedObjectType';
    static readonly PlateNumber = 'PlateNumber';//' varchar(32) NOT NULL COMMENT '车牌号码',
    static readonly IvsTaskGroupID = 'IvsTaskGroupID';
    static readonly IsBlacklist = 'IsBlacklist';
    static readonly ListType = 'ListType';//' varchar(128) DEFAULT NULL COMMENT '任务类型（黑名单、白名单、红名单）',
    static readonly AuditStatus = 'AuditStatus';// DEFAULT NULL COMMENT '审核状态',
    static readonly Name = 'Name';
    static readonly Status = 'Status';// DEFAULT NULL COMMENT '任务状态',
    static readonly CameraID = 'CameraID';
    static readonly ValidTimeStart = 'ValidTimeStart';// DEFAULT NULL COMMENT '有效时间范围（开始）',
    static readonly ValidTimeEnd = 'ValidTimeEnd';// DEFAULT NULL COMMENT '有效时间范围（结束）',
    static readonly PerceiveData = 'PerceiveData';
    static readonly EventRuleID = 'EventRuleID';
    static readonly PersonID = 'PersonID';
    static readonly RoleID = 'RoleID';
    static readonly AreaID = 'AreaID';
    static readonly ParentID = 'ParentID';
    static readonly IsTemplate = 'IsTemplate';
    static readonly ObjectType = 'ObjectType';
    static readonly Type = 'Type';
    static readonly Ext = 'Ext';
    static readonly UserID = 'UserID';
    static readonly CollectTime = 'CollectTime';
    static readonly EngineServerID = 'EngineServerID';
    static readonly DataType = 'DataType'
}