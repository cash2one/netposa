"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseResult_1 = require("../core/params/result/ResponseResult");
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
const CollectService_1 = require("../service/CollectService");
const log4js = require("log4js");
const ErrorCode_1 = require("../common/res/ErrorCode");
class CollectController {
    static findListByPage(req, res1, next) {
        CollectController.collectService.findListByPage(req.body).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(resp) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.ErrorCode.OK;
            result.data = resp;
            res1.send(result);
        }
    }
    static findCollectStatus(req, res1, next) {
        CollectController.collectService.findCollectStatus(req.body).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
    static delete(req, res, next) {
        let params = (req.body || {});
        CollectController.collectService.delete(params.ids).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.ErrorCode.OK;
            result.data = data;
            res.send(result);
        }
    }
    static deleteByObjectId(req, res, next) {
        CollectController.collectService.deleteByObjectId(req.body.ids).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.ErrorCode.OK;
            result.data = data;
            res.send(result);
        }
    }
    static add(req, res, next) {
        CollectController.collectService.add(req.body).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function respResolve(resp) {
            CollectController.LOGGER.debug("return result: " + JSON.stringify(resp));
            res.send(resp);
        }
    }
}
CollectController.LOGGER = log4js.getLogger("CollectController");
CollectController.collectService = new CollectService_1.CollectService();
exports.default = CollectController;
