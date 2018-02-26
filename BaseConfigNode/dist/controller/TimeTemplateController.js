"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
const log4js = require("log4js");
const TimeTemplateService_1 = require("../service/TimeTemplateService");
class TimeTemplateController {
    static findListByParams(req, res, next) {
        TimeTemplateController.timeTemplateService.findListByParams(req.query).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static findAll(req, res, next) {
        TimeTemplateController.timeTemplateService.findAll().then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static save(req, res, next) {
        TimeTemplateController.timeTemplateService.save(req.body).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static update(req, res, next) {
        TimeTemplateController.timeTemplateService.update(req.body).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static deleteByIds(req, res, next) {
        TimeTemplateController.timeTemplateService.deleteByIds(req.body).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
}
TimeTemplateController.LOGGER = log4js.getLogger("TimeTemplateController");
TimeTemplateController.timeTemplateService = new TimeTemplateService_1.TimeTemplateService();
exports.default = TimeTemplateController;
