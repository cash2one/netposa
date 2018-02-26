"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnitService_1 = require("../service/UnitService");
const ErrorCode_1 = require("../common/res/ErrorCode");
const ResponseResult_1 = require("../core/params/result/ResponseResult");
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
class UnitController {
    static findUnitListByParams(req, res, next) {
        let params = req.query;
        UnitService_1.default.findListByParams(params).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static saveUnit(req, res, next) {
        UnitService_1.default.save(req.body).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static updateUnit(req, res, next) {
        UnitService_1.default.edit(req.body).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static deleteUnit(req, res, next) {
        UnitService_1.default.deleteById(req.body.id).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static deleteUnitByIds(req, res, next) {
        let params = req.body;
        UnitService_1.default.deleteUnitByIds(params.ids).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static getUnit(req, res, next) {
        UnitService_1.default.getUnit(req.query.id).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }
    }
    static findUnitTreeList(req, res, next) {
        UnitService_1.default.findUnitTreeList(req.query).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }
    }
}
exports.default = UnitController;
