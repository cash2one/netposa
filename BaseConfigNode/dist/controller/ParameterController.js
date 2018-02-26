"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseResult_1 = require("../core/params/result/ResponseResult");
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
const ParameterService_1 = require("../service/ParameterService");
const ErrorCode_1 = require("../common/res/ErrorCode");
const log4js = require("log4js");
class ParameterController {
    static findAllList(req, res, next) {
        ParameterController.parameterService.findAll().then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function respResolve(resp) {
            ParameterController.LOGGER.info("return result：" + JSON.stringify(resp));
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = resp;
            res.send(result);
        }
    }
    static save(req, res, next) {
        let models = req.body || [];
        ParameterController.parameterService.edit(models).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function respResolve(resp) {
            ParameterController.LOGGER.info("return result：" + JSON.stringify(resp));
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
    static findMapConfigByParamClass(req, res, next) {
        let paramClass = req.query.paramClass;
        ParameterController.parameterService.findMapConfigByParamClass(paramClass).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function respResolve(resp) {
            ParameterController.LOGGER.info("return result：" + JSON.stringify(resp));
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
    static editMapConfigParam(req, res, next) {
        let model = req.body;
        ParameterController.parameterService.editMapConfigParam(model).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function respResolve(resp) {
            ParameterController.LOGGER.info("return result：" + JSON.stringify(resp));
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
    static findSystemConfig(req, res, next) {
        let paramClass = req.query.paramClass;
        ParameterController.parameterService.findSystemConfigByParamClass(paramClass).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function respResolve(resp) {
            ParameterController.LOGGER.info("return result：" + JSON.stringify(resp));
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
    static editSystemConfigParam(req, res, next) {
        let model = req.body;
        ParameterController.parameterService.editSystemConfigParam(model).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function respResolve(resp) {
            ParameterController.LOGGER.info("return result：" + JSON.stringify(resp));
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
}
ParameterController.LOGGER = log4js.getLogger("ParameterController");
ParameterController.parameterService = new ParameterService_1.ParameterService();
exports.default = ParameterController;
