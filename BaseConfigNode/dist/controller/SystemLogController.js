"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
const SystemLogService_1 = require("../service/SystemLogService");
const HttpUtils_1 = require("../utils/HttpUtils");
const CommonUtils_1 = require("../utils/CommonUtils");
const log4js = require("log4js");
const util = require("util");
class SystemLogController {
    static SaveSystemLog(req, res, next) {
        let params = req.body || {};
        SystemLogController.LOGGER.debug(util.format("前端传来的systemLog实体为: %j", params));
        params.OperatorIP = HttpUtils_1.HttpUtils.current().getClientIp();
        params.OperatorUser = HttpUtils_1.HttpUtils.current().getUserIdStr();
        params.OperatorTime = CommonUtils_1.default.formatDate(new Date());
        SystemLogController.LOGGER.debug(util.format("用于保存到数据库里的实体为: %j", params));
        SystemLogController.SystemLogService.save(params).then(complete)
            .catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(resp) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
}
SystemLogController.LOGGER = log4js.getLogger("SystemLogController");
SystemLogController.SystemLogService = new SystemLogService_1.SystemLogService();
exports.default = SystemLogController;
