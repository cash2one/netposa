"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TaskConfigService_1 = require("../service/TaskConfigService");
const ResponseResult_1 = require("../core/params/result/ResponseResult");
const ErrorCode_1 = require("../common/res/ErrorCode");
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
class TaskConfigController {
    static FindFaceList(req, res, next) {
        TaskConfigController.taskConfigService.FindFaceList(req.query).then((resp) => {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
    static AddOrUpdateFace(req, res, next) {
        TaskConfigController.taskConfigService.AddOrUpdateFace(req.body).then((resp) => {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
    static AddOrUpdateRfid(req, res, next) {
        TaskConfigController.taskConfigService.AddOrUpdateRfid(req.body).then((resp) => {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
    static AddOrUpdateCar(req, res, next) {
        TaskConfigController.taskConfigService.AddOrUpdateCar(req.body).then((resp) => {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
    static FindMacList(req, res, next) {
        TaskConfigController.taskConfigService.FindMacList(req.query).then((resp) => {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
    static FindCarList(req, res, next) {
        TaskConfigController.taskConfigService.FindCarList(req.query).then((resp) => {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
    static FindFaceDetail(req, res, next) {
        let ID = req.query.ID;
        TaskConfigController.taskConfigService.GetFaceDetail(ID).then(resp => {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = resp;
            res.send(result);
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
    static FindFaceByTaskId(req, res, next) {
        let ID = req.query.ID;
        TaskConfigController.taskConfigService.GetFaceDetailByTaskId(ID).then(resp => {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = resp;
            res.send(result);
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
    static FindRfidDetail(req, res, next) {
        let ID = req.query.ID;
        TaskConfigController.taskConfigService.GetRfidDetail(ID).then(resp => {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = resp;
            res.send(result);
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
    static FindCarDetail(req, res, next) {
        let ID = req.query.ID;
        TaskConfigController.taskConfigService.GetCarDetail(ID).then(resp => {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = resp;
            res.send(result);
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
    static getFaceTaskIDs(req, res, next) {
        let param = req.query;
        TaskConfigController.taskConfigService.getFaceTaskIDs(param.ID, param.type).then(resp => {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = resp;
            res.send(result);
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
    static getTaskIdsByUserId(req, res, next) {
        let param = (req.query || {});
        TaskConfigController.taskConfigService.getTaskIdsByUserId(param.userId).then((data) => {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
    static getUserIdByPersonId(req, res, next) {
        let param = req.query;
        TaskConfigController.taskConfigService.getUserIdByPersonId(param.IDs).then((data) => {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
}
TaskConfigController.taskConfigService = new TaskConfigService_1.TaskConfigService();
exports.default = TaskConfigController;
