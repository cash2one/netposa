import {ResponseResult, BackResponseBody} from "../../core/params/result/ResponseResult";
import ErrorCode from "./ErrorCode";
import * as log4js from "log4js";
import * as util from "util";
import * as express from "express";

export class ResponseResultTool{
    private static LOGGER = log4js.getLogger("ResponseResultTool");
    static convert2ResponseResult = function (origin: BackResponseBody<any>) {
        let result = new ResponseResult();
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
    static convertError2ResponseResult = function(res: express.Response){
        return function(err: Error|number){
            let result = new ResponseResult();
            if(err instanceof Error){
                result.code = ErrorCode.ERROR;
                result.data = err.toString();
                ResponseResultTool.LOGGER.error(util.format("%s", err.stack));
                res.status(500);
            }else if(typeof err === "number"){
                result.code = err;
            }
            res.send(result);
        }
    }

}