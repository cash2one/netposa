"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
const CheckService_1 = require("../service/CheckService");
const log4js = require("log4js");
class CheckController {
    static findListByPage(req, res1, next) {
        CheckController.checkService.findListByPage((req.query || {})).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
}
CheckController.LOGGER = log4js.getLogger("CheckController");
CheckController.checkService = new CheckService_1.CheckService();
exports.default = CheckController;
