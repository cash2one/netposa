"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
const VideoServerService_1 = require("../service/VideoServerService");
class VideoServerController {
    static findListByParams(req, res1, next) {
        let params = req.query;
        VideoServerController.videoServerService.findListByParams(params).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function complete(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
    static findById(req, res1, next) {
        let params = req.query;
        VideoServerController.videoServerService.detail(params.id).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function complete(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
    static deleteByIds(req, res1, next) {
        let params = req.body;
        VideoServerController.videoServerService.deleteByIds(params.ids).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function complete(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
    static isHasTask(req, res1, next) {
        let params = req.body;
        VideoServerController.videoServerService.isHasTask(params.ids).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function complete(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
    static update(req, res1, next) {
        VideoServerController.videoServerService.update(req.body.model).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
    static save(req, res1, next) {
        VideoServerController.videoServerService.save(req.body.model).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
    static deleteById(req, res1, next) {
        let params = req.body;
        VideoServerController.videoServerService.deleteById(params.id).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
}
VideoServerController.videoServerService = new VideoServerService_1.VideoServerService();
exports.default = VideoServerController;
