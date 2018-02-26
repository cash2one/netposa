/**
 * Created by dell on 2017/8/4.
 */
export default class CarCol {
    static ID: string = 'ID' ;//'varchar(32) NOT NULL COMMENT '编号',
    static PlateNumber: string = 'PlateNumber';//' varchar(32) NOT NULL COMMENT '车牌号码',
    static PlateColor: string = 'PlateColor';//' varchar(32) DEFAULT NULL COMMENT '车牌颜色',
    static CarPhoto: string = 'CarPhoto' ;//' varchar(512) DEFAULT NULL COMMENT '车辆图片路径',
    static CreateTime: string = 'CreateTime';//' datetime DEFAULT NULL COMMENT '创建时间',
    static IsLongEffective: string = 'IsLongEffective' ;//' tinyint(1) DEFAULT NULL COMMENT '是否长期有效',
    static ValidTimeStart: string = 'ValidTimeStart';//' datetime DEFAULT NULL COMMENT '有效时间范围（开始）',
    static ValidTimeEnd: string = 'ValidTimeEnd';//' datetime DEFAULT NULL COMMENT '有效时间范围（结束）',
    static CreateUserID: string = 'CreateUserID';//' varchar(32) NOT NULL COMMENT '创建用户id',
    static AuditUser: string = 'AuditUser';//' varchar(32) NOT NULL COMMENT '审核人id',
    static AuditStatus: string = 'AuditStatus';//' varchar(128) NOT NULL COMMENT '审核状态',
    static Status: string = 'Status';//' varchar(128) NOT NULL COMMENT '任务状态',
    static TimeTemplateID: string = 'TimeTemplateID' ;//' varchar(32) DEFAULT NULL COMMENT '时间模板id',
    static Description: string = 'Description'  ;//'varchar(512) DEFAULT NULL COMMENT '任务描述',
    static ListType: string = 'ListType';//' varchar(128) DEFAULT NULL COMMENT '任务类型（黑名单、白名单、红名单）',
    static Ext: string = 'Ext' ;//' varchar(4096) DEFAULT NULL COMMENT '预留扩展',
    static IsControlByProgram: string = 'IsControlByProgram';//' tinyint(1) NOT NULL COMMENT '是否由程序控制启动或停止',
}