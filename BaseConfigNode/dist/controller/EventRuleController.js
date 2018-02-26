"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
const EventRuleService_1 = require("../service/EventRuleService");
const log4js = require("log4js");
class EventRuleController {
    static findList(req, res1, next) {
        let params = req.body;
        EventRuleController.EventRuleService.findList(params).then((resp) => {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
    }
    static findAll(req, res1, next) {
        EventRuleController.EventRuleService.findAll().then((resp) => {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
    }
    static delete(req, res1, next) {
        let params = req.body;
        EventRuleController.EventRuleService.delete(params.id).then((resp) => {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
    }
    static saveOrUpdate(req, res1, next) {
        let params = req.body;
        EventRuleController.EventRuleService.saveOrUpdate(params).then((resp) => {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
    }
    static detail(req, res1, next) {
        let params = req.body;
        EventRuleController.EventRuleService.detail(params.id).then((resp) => {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
    }
    static deleteByIds(req, res1, next) {
        let params = req.body;
        EventRuleController.EventRuleService.deleteByIds(params.ids).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
}
EventRuleController.LOGGER = log4js.getLogger("ElectronicFenceController");
EventRuleController.EventRuleService = new EventRuleService_1.EventRuleService();
exports.default = EventRuleController;
