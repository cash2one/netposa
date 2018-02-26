"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseResult_1 = require("../core/params/result/ResponseResult");
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
const CameraService_1 = require("../service/CameraService");
const ErrorCode_1 = require("../common/res/ErrorCode");
const log4js = require("log4js");
class CameraController {
    static findAllList(req, res1, next) {
        CameraController.cameraService.findAll().then((resp) => {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
    }
    static edit(req, res1, next) {
        let model = req.body;
        if (!model.Name || !model.ID || !model.Code || !model.JsonUserData.Point || !model.JsonUserData.lampPost) {
            CameraController.LOGGER.error('参数错误');
            CameraController.ResetServiceResult(false, res1);
            return;
        }
        CameraController.cameraService.edit(req.body).then((resp) => {
            CameraController.ResetServiceResult(resp, res1);
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
    }
    static changeAreaId(req, res1, next) {
        CameraController.cameraService.changeAreaId(req.body)
            .then((resp) => {
            CameraController.ResetServiceResult(resp, res1);
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
    }
    static changeLampId(req, res1, next) {
        CameraController.cameraService.changeLampId(req.body)
            .then((resp) => {
            CameraController.ResetServiceResult(resp, res1);
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
    }
    static getPlayerInfoByID(req, res1, next) {
        CameraController.cameraService.getPlayerInfoByID(req.body.id)
            .then((resp) => {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
    }
    static ResetServiceResult(resp, res1) {
        let result = new ResponseResult_1.ResponseResult();
        resp ? result.code = ErrorCode_1.default.OK : result.code = ErrorCode_1.default.ERROR_NO_PARAM;
        result.data = resp;
        res1.send(result);
    }
}
CameraController.LOGGER = log4js.getLogger("CameraController");
CameraController.cameraService = new CameraService_1.CameraService();
exports.default = CameraController;
