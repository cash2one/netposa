"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
const log4js = require("log4js");
const CaseService_1 = require("../service/CaseService");
class CaseController {
    static findCascadeList(req, res1, next) {
        let params = req.body;
        CaseController.caseService.findCascadeList(params).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
}
CaseController.LOGGER = log4js.getLogger("CameraController");
CaseController.caseService = new CaseService_1.CaseService();
exports.default = CaseController;
