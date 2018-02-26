/**
 * Created by dell on 2017/8/4.
 */
export default class FaceCol{
    static ID :string = 'ID';// '编号',
    static Name :string = 'Name';// DEFAULT NULL COMMENT '任务名称',
    static CreateTime :string = 'CreateTime';// DEFAULT NULL COMMENT '创建时间',
    static IsLongEffective :string = 'IsLongEffective';// DEFAULT NULL COMMENT '任务是否长期有效,0：无效，1：有效，是否长期有效，如果为否，则看有效时间范围',
    static ValidTimeStart :string = 'ValidTimeStart';// DEFAULT NULL COMMENT '有效时间范围（开始）',
    static ValidTimeEnd :string = 'ValidTimeEnd';// DEFAULT NULL COMMENT '有效时间范围（结束）',
    static CreateUserID :string = 'CreateUserID';// DEFAULT NULL COMMENT '创建用户id',
    static TimeTemplateID :string = 'TimeTemplateID';// DEFAULT NULL COMMENT '时间模板id',
    static Status :string = 'Status';// DEFAULT NULL COMMENT '任务状态',
    static ControlCommand :string = 'ControlCommand';// DEFAULT NULL COMMENT '控制状态(默认、手动开启都是1，手动停止是0)',
    static AuditUser :string = 'AuditUser';// DEFAULT NULL COMMENT '审核人',
    static AuditStatus :string = 'AuditStatus';// DEFAULT NULL COMMENT '审核状态',
    static AuthStatus :string = 'AuthStatus';// DEFAULT NULL COMMENT '权限状态',
    static AuthUser :string = 'AuthUser';// DEFAULT NULL COMMENT '有权人员（可见用户）',
    static AuditDesrption :string = 'AuditDesrption';// DEFAULT NULL COMMENT '审核描述',
    static Description :string = 'Description';// DEFAULT NULL COMMENT '任务描述',
    static TaskType :string = 'TaskType';// DEFAULT NULL COMMENT '任务类型',
    static MacAddress :string = 'MacAddress';// NOT NULL COMMENT 'mac地址',
    static DeviceType :string = 'DeviceType';// DEFAULT NULL COMMENT '设备类型',
    static Ext :string = 'Ext';// DEFAULT NULL COMMENT '预留扩展',
    static AreaID :string = 'AreaID';// DEFAULT NULL COMMENT '行政区域id',
    static IvsTaskGroupID:string = 'IvsTaskGroupID'
}