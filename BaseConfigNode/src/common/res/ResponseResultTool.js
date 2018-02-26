"use strict";
exports.__esModule = true;
var ResponseResult_1 = require("../../core/params/result/ResponseResult");
var ErrorCode_1 = require("./ErrorCode");
var log4js = require("log4js");
var util = require("util");
var ResponseResultTool = (function () {
    function ResponseResultTool() {
    }
    ResponseResultTool.LOGGER = log4js.getLogger("ResponseResultTool");
    ResponseResultTool.convert2ResponseResult = function (origin) {
        var result = new ResponseResult_1.ResponseResult();
        result.code = origin.code || result.code;
        result.count = origin.count;
        result.message = origin.message;
        result.data = origin.data;
        result.status = origin.status;
        return result;
    };
    /**
     * 统一的错误信息处理
     * @param res
     * @returns {(err:(Error|number))=>undefined}
     */
    ResponseResultTool.convertError2ResponseResult = function (res) {
        return function (err) {
            var result = new ResponseResult_1.ResponseResult();
            if (err instanceof Error) {
                result.code = ErrorCode_1["default"].ERROR;
                result.data = err.toString();
                ResponseResultTool.LOGGER.error(util.format("%s", err.stack));
                res.status(500);
            }
            else if (typeof err === "number") {
                result.code = err;
            }
            res.send(result);
        };
    };
    return ResponseResultTool;
}());
exports.ResponseResultTool = ResponseResultTool;
