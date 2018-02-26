export class EventRuleCol {
    static ID: string = 'ID';//(32) NOT NULL COMMENT '序号',
    static Name: string = 'Name';//(64) DEFAULT NULL COMMENT '名称',
    static Description: string = 'Description';//(512) DEFAULT NULL COMMENT '描述',
    static Disabled: string = 'Disabled';//(1) DEFAULT NULL COMMENT '是否故障',
    static TimeTemplateID: string = 'TimeTemplateID';//(32) DEFAULT NULL COMMENT '时间模板序号',
    static CreateTime: string = 'CreateTime';// DEFAULT NULL COMMENT '创建时间',
    static AreaID: string = 'AreaID';//(32) DEFAULT NULL COMMENT '创建区域ID',
    static IsTemplate: string = 'IsTemplate';//(1) DEFAULT '0' COMMENT '是否模板',
    static TaskMonitorType: string = 'TaskMonitorType';//(5) DEFAULT '' COMMENT '联动规则类型',
    static Ext: string = 'Ext';//(4096) DEFAULT NULL COMMENT '备注',
}