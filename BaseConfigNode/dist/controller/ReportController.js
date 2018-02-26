"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
const ReportService_1 = require("../service/ReportService");
const log4js = require("log4js");
class ReportController {
    static findListByPage(req, res1, next) {
        let params = req.query;
        ReportController.reportService.findListByPage(params).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
    static delete(req, res1, next) {
        let params = req.body || {};
        ReportController.reportService.delete(params.id).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function complete(data) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
}
ReportController.LOGGER = log4js.getLogger("ReportController");
ReportController.reportService = new ReportService_1.ReportService();
exports.default = ReportController;
