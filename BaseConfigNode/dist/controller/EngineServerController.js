"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
const EngineServerService_1 = require("../service/EngineServerService");
class EngineServerController {
    static findAll(req, res1, next) {
        EngineServerController.EngineServerService.findAll().then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
    static findById(req, res1, next) {
        let params = req.query;
        EngineServerController.EngineServerService.detail(params.id).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
    static update(req, res1, next) {
        EngineServerController.EngineServerService.update(req.body.model).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
    static save(req, res1, next) {
        EngineServerController.EngineServerService.save(req.body.model).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function complete(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
    static deleteById(req, res1, next) {
        let params = req.body;
        EngineServerController.EngineServerService.deleteById(params.id).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
}
EngineServerController.EngineServerService = new EngineServerService_1.EngineServerService();
exports.default = EngineServerController;
