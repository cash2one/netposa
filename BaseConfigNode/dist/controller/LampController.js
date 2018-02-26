"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorCode_1 = require("../common/res/ErrorCode");
const LampService_1 = require("../service/LampService");
const ResponseResult_1 = require("../core/params/result/ResponseResult");
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
class LampController {
    static saveLamp(req, res, next) {
        let params = req.body;
        LampController.lampService.save(params).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }
    }
    static updateLamp(req, res, next) {
        let params = req.body;
        LampController.lampService.update(params).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }
    }
    static getLamp(req, res, next) {
        let params = req.query || {};
        LampController.lampService.detail(params.id).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }
    }
    static deleteLampById(req, res, next) {
        let params = req.body || {};
        LampController.lampService.deleteById(params.id).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }
    }
    static deleteLampByIds(req, res, next) {
        let params = req.body || {};
        LampController.lampService.deleteByIds(params.ids).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }
    }
    static updataLampSystemPoint(req, res, next) {
        let params = req.query || {};
        LampController.lampService.updataLampSystemPoint(params).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }
    }
    static findSystemPointById(req, res, next) {
        let params = req.query || {};
        LampController.lampService.findSystemPointById(params.id).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }
    }
    static deleteLampAndDeviceRelation(req, res, next) {
        let params = req.query || {};
        LampController.lampService.deleteLampAndDeviceRelation(params).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }
    }
    static findLampDeviceRelationById(req, res, next) {
        let params = req.query || {};
        LampController.lampService.findLampDeviceRelationById(params.id).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }
    }
    static findLampDeviceChildrenById(req, res, next) {
        let params = req.query || {};
        LampController.lampService.findLampDeviceChildrenById(params.id).then(complete)
            .catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }
    }
}
LampController.lampService = new LampService_1.LampService();
exports.default = LampController;
