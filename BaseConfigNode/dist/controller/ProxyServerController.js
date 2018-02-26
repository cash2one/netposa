"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
const ProxyServerService_1 = require("../service/ProxyServerService");
class ProxyServerController {
    static findAll(req, res1, next) {
        ProxyServerController.proxyServerService.findAll().then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
    static findById(req, res1, next) {
        let params = req.query;
        ProxyServerController.proxyServerService.detail(params.id).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
    static findListByParams(req, res1, next) {
        let params = req.query;
        ProxyServerController.proxyServerService.findListByParams(params).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
    static update(req, res1, next) {
        ProxyServerController.proxyServerService.update(req.body.model).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
    static save(req, res1, next) {
        ProxyServerController.proxyServerService.save(req.body.model).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function complete(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
    static deleteById(req, res1, next) {
        let params = req.body;
        ProxyServerController.proxyServerService.deleteById(params.id).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
    static deleteByIds(req, res1, next) {
        let params = req.body;
        ProxyServerController.proxyServerService.deleteByIds(params.ids).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
}
ProxyServerController.proxyServerService = new ProxyServerService_1.ProxyServerService();
exports.default = ProxyServerController;
