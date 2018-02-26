"use strict";
exports.__esModule = true;
var EventRuleCol = (function () {
    function EventRuleCol() {
    }
    EventRuleCol.ID = 'ID'; //(32) NOT NULL COMMENT '序号',
    EventRuleCol.Name = 'Name'; //(64) DEFAULT NULL COMMENT '名称',
    EventRuleCol.Description = 'Description'; //(512) DEFAULT NULL COMMENT '描述',
    EventRuleCol.Disabled = 'Disabled'; //(1) DEFAULT NULL COMMENT '是否故障',
    EventRuleCol.TimeTemplateID = 'TimeTemplateID'; //(32) DEFAULT NULL COMMENT '时间模板序号',
    EventRuleCol.CreateTime = 'CreateTime'; // DEFAULT NULL COMMENT '创建时间',
    EventRuleCol.AreaID = 'AreaID'; //(32) DEFAULT NULL COMMENT '创建区域ID',
    EventRuleCol.IsTemplate = 'IsTemplate'; //(1) DEFAULT '0' COMMENT '是否模板',
    EventRuleCol.TaskMonitorType = 'TaskMonitorType'; //(5) DEFAULT '' COMMENT '联动规则类型',
    EventRuleCol.Ext = 'Ext'; //(4096) DEFAULT NULL COMMENT '备注',
    return EventRuleCol;
}());
exports.EventRuleCol = EventRuleCol;
