import * as express from "express";
import request = require("superagent");
import {ResponseResult, BackResponseBody, PageResult} from "../core/params/result/ResponseResult";
import {Parameter} from "../core/entity/Parameter";
import {MapConfigParameterExt, MapConfigParamConst} from "../core/entity/MapConfigParameter";
import {SystemConfigParams, SystemConfigParamConst} from "../core/entity/SystemConfigParams";
import {ResponseResultTool} from "../common/res/ResponseResultTool";
import {IParameterService, ParameterService} from "../service/ParameterService";
import ErrorCode from "../common/res/ErrorCode";
import * as log4js from "log4js";

/**
 * create by zmp.
 * @time: 2017-08-10
 */
export default class ParameterController {

    private static LOGGER = log4js.getLogger("ParameterController");    

    private static parameterService:IParameterService = new ParameterService();

    // 查询所有的参数配置列表
    public static findAllList(req: express.Request, res: express.Response, next: Function): void {
        ParameterController.parameterService.findAll().then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res));

        function respResolve(resp: BackResponseBody<Array<Parameter>>) {
            ParameterController.LOGGER.info("return result：" + JSON.stringify(resp));
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = resp;
            res.send(result);
        }
    }

    // 修改参数配置
    public static save(req: express.Request, res: express.Response, next: Function) {
        let models = req.body as Array<Parameter> || [];
        ParameterController.parameterService.edit(models).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res));

        function respResolve(resp: BackResponseBody<string>) {
            ParameterController.LOGGER.info("return result：" + JSON.stringify(resp));
            res.send(ResponseResultTool.convert2ResponseResult(resp));
        }
    }

    public static findMapConfigByParamClass(req: express.Request, res: express.Response, next: Function) {
        let paramClass = req.query.paramClass as string;
        ParameterController.parameterService.findMapConfigByParamClass(paramClass).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res));

        function respResolve(resp: BackResponseBody<MapConfigParameterExt>) {
            ParameterController.LOGGER.info("return result：" + JSON.stringify(resp));
            res.send(ResponseResultTool.convert2ResponseResult(resp));
        }
    }

    public static editMapConfigParam(req: express.Request, res: express.Response, next: Function) {
        let model = req.body as MapConfigParameterExt;
        ParameterController.parameterService.editMapConfigParam(model).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res));

        function respResolve(resp: BackResponseBody<boolean>) {
            ParameterController.LOGGER.info("return result：" + JSON.stringify(resp));
            res.send(ResponseResultTool.convert2ResponseResult(resp));
        }
    }

    public static findSystemConfig(req: express.Request, res: express.Response, next: Function) {
        let paramClass = req.query.paramClass as string;
        ParameterController.parameterService.findSystemConfigByParamClass(paramClass).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res));

        function respResolve(resp: BackResponseBody<SystemConfigParams>) {
            ParameterController.LOGGER.info("return result：" + JSON.stringify(resp));
            res.send(ResponseResultTool.convert2ResponseResult(resp));
        }
    }

    public static editSystemConfigParam(req: express.Request, res: express.Response, next: Function) {
        let model = req.body as any;
        ParameterController.parameterService.editSystemConfigParam(model).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res));

        function respResolve(resp: BackResponseBody<boolean>) {
            ParameterController.LOGGER.info("return result：" + JSON.stringify(resp));
            res.send(ResponseResultTool.convert2ResponseResult(resp));
        }
    }
}