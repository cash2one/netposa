"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RoleService_1 = require("../service/RoleService");
const ResponseResult_1 = require("../core/params/result/ResponseResult");
const ErrorCode_1 = require("../common/res/ErrorCode");
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
const log4js = require("log4js");
class RoleController {
    static list(req, res, next) {
        RoleController.roleService.list(req.query).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static detail(req, res, next) {
        RoleController.roleService.detail(req.query.roleId).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }
    }
    static save(req, res, next) {
        RoleController.LOGGER.debug(req.body);
        RoleController.roleService.save(req.body).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }
    }
    static update(req, res, next) {
        RoleController.roleService.update(req.body).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }
    }
    static getTemplate(req, res, next) {
        function complete() {
        }
        function _catch() {
        }
    }
    static deleteRoleById(req, res, next) {
        RoleController.roleService.deleteById(req.body.id).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
}
RoleController.LOGGER = log4js.getLogger("RoleController");
RoleController.roleService = new RoleService_1.RoleService();
exports.default = RoleController;
