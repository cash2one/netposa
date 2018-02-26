"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseResult_1 = require("../../core/params/result/ResponseResult");
const ErrorCode_1 = require("./ErrorCode");
const log4js = require("log4js");
const util = require("util");
class ResponseResultTool {
}
ResponseResultTool.LOGGER = log4js.getLogger("ResponseResultTool");
ResponseResultTool.convert2ResponseResult = function (origin) {
    let result = new ResponseResult_1.ResponseResult();
    result.code = origin.code || result.code;
    result.count = origin.count;
    result.message = origin.message;
    result.data = origin.data;
    result.status = origin.status;
    return result;
};
ResponseResultTool.convertError2ResponseResult = function (res) {
    return function (err) {
        let result = new ResponseResult_1.ResponseResult();
        if (err instanceof Error) {
            result.code = ErrorCode_1.default.ERROR;
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
exports.ResponseResultTool = ResponseResultTool;
