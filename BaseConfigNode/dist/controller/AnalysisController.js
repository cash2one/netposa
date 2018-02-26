"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AnalysisService_1 = require("../service/AnalysisService");
const ResponseResult_1 = require("../core/params/result/ResponseResult");
const ErrorCode_1 = require("../common/res/ErrorCode");
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
class AnalysisController {
    static faceAnalysis(req, res, next) {
        AnalysisController.AnalysisService.FaceAnalysis(req.body).then((data) => {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
    static PersonAlarm(req, res, next) {
        AnalysisController.AnalysisService.PersonAlarm(req.body).then((data) => {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
    static FaceTrack(req, res, next) {
        AnalysisController.AnalysisService.FaceTrack(req.body).then((data) => {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
    static Accompanying(req, res, next) {
        AnalysisController.AnalysisService.Accompanying(req.body).then((data) => {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
    static findListWithOffLineTask(req, res, next) {
        AnalysisController.AnalysisService.findListWithOffLineTask(req.body).then((data) => {
            data.data = data.data || [];
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
    static faceFrequencyAnalysis(req, res, next) {
        AnalysisController.AnalysisService.faceFrequencyAnalysis(req.body).then((data) => {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
    static faceFrequencyAppear(req, res, next) {
        AnalysisController.AnalysisService.faceFrequencyAppear(req.body).then((data) => {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
    static delOffLineTask(req, res, next) {
        AnalysisController.AnalysisService.delOffLineTask(req.body).then((data) => {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
    static RealyInfo(req, res, next) {
        AnalysisController.AnalysisService.RealyInfo(req.body).then((data) => {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
}
AnalysisController.AnalysisService = new AnalysisService_1.AnalysisService();
exports.default = AnalysisController;
