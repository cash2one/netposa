"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseResult_1 = require("../core/params/result/ResponseResult");
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
const WifiService_1 = require("../service/WifiService");
const ErrorCode_1 = require("../common/res/ErrorCode");
const log4js = require("log4js");
class WifiController {
    static findAllList(req, res, next) {
        WifiController.wifiService.findAll().then((resp) => {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
    static edit(req, res, next) {
        let model = req.body;
        if (!model.Name || !model.ID || !model.Code || !model.JsonUserData.Point || !model.JsonUserData.lampPost) {
            WifiController.LOGGER.error('参数错误');
            WifiController.ResetServiceResult(false, res);
            return;
        }
        WifiController.wifiService.edit(model).then((resp) => {
            WifiController.ResetServiceResult(resp, res);
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
    static changeAreaId(req, res, next) {
        let models = req.body || [];
        WifiController.wifiService.changeAreaId(models).then((resp) => {
            WifiController.ResetServiceResult(resp, res);
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
    static changeLampId(req, res, next) {
        let models = req.body || [];
        WifiController.wifiService.changeLampId(models).then((resp) => {
            WifiController.ResetServiceResult(resp, res);
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
    static ResetServiceResult(resp, res1) {
        let result = new ResponseResult_1.ResponseResult();
        resp ? result.code = ErrorCode_1.default.OK : result.code = ErrorCode_1.default.ERROR_NO_PARAM;
        result.data = resp;
        res1.send(result);
    }
}
WifiController.LOGGER = log4js.getLogger("WifiController");
WifiController.wifiService = new WifiService_1.WifiService();
exports.default = WifiController;
