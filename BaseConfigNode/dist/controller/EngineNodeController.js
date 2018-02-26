"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
const EngineNodeService_1 = require("../service/EngineNodeService");
class EngineNodeController {
    static findListByParams(req, res1, next) {
        let params = req.query;
        EngineNodeController.engineNodeService.findListByParams(params).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
    static findById(req, res1, next) {
        let params = req.query;
        EngineNodeController.engineNodeService.detail(params.id).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
    static update(req, res1, next) {
        EngineNodeController.engineNodeService.update(req.body.model).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
    static save(req, res1, next) {
        EngineNodeController.engineNodeService.save(req.body.model).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function complete(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
    static deleteById(req, res1, next) {
        let params = req.body;
        EngineNodeController.engineNodeService.deleteById(params.id).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
    static deleteByIds(req, res1, next) {
        let params = req.body;
        EngineNodeController.engineNodeService.deleteByIds(params.ids).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
}
EngineNodeController.engineNodeService = new EngineNodeService_1.EngineNodeService();
exports.default = EngineNodeController;
