"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorCode_1 = require("../common/res/ErrorCode");
const TreeService_1 = require("../service/TreeService");
const ResponseResult_1 = require("../core/params/result/ResponseResult");
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
class TreeController {
    static findAreaListWithCamera(req, res, next) {
        let params = (req.query || {});
        let search = params.keyword;
        TreeController.treeService.findAreaListWithCamera(search).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }
    }
    static findAreaListWithWifi(req, res, next) {
        let params = (req.query || {});
        let search = params.keyword;
        TreeController.treeService.findAreaListWithWifi(search).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }
    }
    static findAreaListWithRmpgate(req, res, next) {
        let params = (req.query || {});
        let search = params.keyword;
        TreeController.treeService.findAreaListWithRmpgate(search).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }
    }
    static findAreaListWithElectronicfence(req, res, next) {
        let params = (req.query || {});
        let search = params.keyword;
        TreeController.treeService.findAreaListWithElectronicfence(search).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }
    }
    static findAreaListWithLamp(req, res, next) {
        let params = (req.query || {});
        let search = params.keyword;
        TreeController.treeService.findAreaListWithLamp(search).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }
    }
    static findAreaListWithPerson(req, res, next) {
        let params = (req.query || {});
        let search = params.keyword;
        TreeController.treeService.findAreaListWithPerson(search).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }
    }
    static findAreaListWithUser(req, res, next) {
        let params = (req.query || {});
        let search = params.keyword;
        TreeController.treeService.findAreaListWithUser(search).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }
    }
    static findLampListWithAndElectronicfenceTree(req, res, next) {
        let params = (req.query || {});
        let search = params.keyword;
        TreeController.treeService.findLampListWithAndElectronicfenceTree(search).then((resp) => {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = resp;
            res.send(result);
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
    static findLampListWithWifiTree(req, res, next) {
        let params = (req.query || {});
        let search = params.keyword;
        TreeController.treeService.findLampListWithWifiTree(search).then((resp) => {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = resp;
            res.send(result);
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
    static findLampListWithRmpGate(req, res, next) {
        let params = (req.query || {});
        let search = params.keyword;
        TreeController.treeService.findLampListTreeWithRmpGate(search).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }
    }
    static findLampListWithCamera(req, res, next) {
        let params = (req.query || {});
        let search = params.keyword;
        TreeController.treeService.findLampListTreeWithCamera(search).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }
    }
}
TreeController.treeService = new TreeService_1.TreeService();
exports.default = TreeController;
