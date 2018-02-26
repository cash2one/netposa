"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseResult_1 = require("../core/params/result/ResponseResult");
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
const BusinessLibService_1 = require("../service/BusinessLibService");
const ErrorCode_1 = require("../common/res/ErrorCode");
class BusinessLibController {
    static findTreeWithArea(req, res1, next) {
        BusinessLibController.businessLibService.findBusinessLibTreeWithArea().then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res1.send(result);
        }
    }
    static findHasSelfTreeWithArea(req, res1, next) {
        BusinessLibController.businessLibService.findHasSelfBusinessLibAndAreaTree(req.query).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res1.send(result);
        }
    }
    static findTreeAreaWithRole(req, res1, next) {
        BusinessLibController.businessLibService.findTreeAreaWithRole().then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res1.send(result);
        }
    }
    static findBusinessLibHasSelfTree(req, res1, next) {
        BusinessLibController.businessLibService.findBusinessLibHasSelfTree(req.query).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res1.send(result);
        }
    }
    static findTree(req, res1, next) {
        BusinessLibController.businessLibService.findBusinessLibTree(req.query).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res1.send(result);
        }
    }
    static save(req, res1, next) {
        let params = req.body;
        BusinessLibController.businessLibService.save(params).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(resp) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = resp.data;
            res1.send(result);
        }
    }
    static update(req, res1, next) {
        let params = req.body;
        BusinessLibController.businessLibService.update(params).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
    static findById(req, res1, next) {
        let params = req.query;
        BusinessLibController.businessLibService.detail(params.id).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function complete(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
    static deleteByIds(req, res1, next) {
        let params = req.body;
        BusinessLibController.businessLibService.deleteByIds(params.ids).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function complete(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
    static deleteById(req, res1, next) {
        let params = req.body;
        BusinessLibController.businessLibService.deleteById(params.id).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(resp) {
            res1.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
}
BusinessLibController.businessLibService = new BusinessLibService_1.BusinessLibService();
exports.default = BusinessLibController;
