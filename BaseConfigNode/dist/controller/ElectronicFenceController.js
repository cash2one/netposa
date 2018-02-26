"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseResult_1 = require("../core/params/result/ResponseResult");
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
const ElectronicFenceService_1 = require("../service/ElectronicFenceService");
const ErrorCode_1 = require("../common/res/ErrorCode");
const log4js = require("log4js");
class ElectronicFenceController {
    static findAllList(req, res1, next) {
        ElectronicFenceController.electronicFenceService.findAll().then((resp) => {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
    }
    static edit(req, res1, next) {
        let model = req.body;
        if (!model.Name || !model.ID || !model.Code || !model.JsonUserData.Point || !model.JsonUserData.lampPost) {
            ElectronicFenceController.LOGGER.error('参数错误');
            ElectronicFenceController.ResetServiceResult(false, res1);
            return;
        }
        ElectronicFenceController.electronicFenceService.edit(req.body).then((resp) => {
            ElectronicFenceController.ResetServiceResult(resp, res1);
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
    }
    static changeAreaId(req, res1, next) {
        ElectronicFenceController.electronicFenceService.changeAreaId(req.body).then((resp) => {
            ElectronicFenceController.ResetServiceResult(resp, res1);
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
    }
    static changeLampId(req, res1, next) {
        ElectronicFenceController.electronicFenceService.changeLampId(req.body).then((resp) => {
            ElectronicFenceController.ResetServiceResult(resp, res1);
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
    }
    static ResetServiceResult(resp, res1) {
        let result = new ResponseResult_1.ResponseResult();
        resp ? result.code = ErrorCode_1.default.OK : result.code = ErrorCode_1.default.ERROR_NO_PARAM;
        result.data = resp;
        res1.send(result);
    }
}
ElectronicFenceController.LOGGER = log4js.getLogger("ElectronicFenceController");
ElectronicFenceController.electronicFenceService = new ElectronicFenceService_1.ElectronicFenceService();
exports.default = ElectronicFenceController;
