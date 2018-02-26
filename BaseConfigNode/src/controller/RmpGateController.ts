import * as express from "express";
import {ResponseResult, BackResponseBody, PageResult} from "../core/params/result/ResponseResult";
import {ResponseResultTool} from "../common/res/ResponseResultTool";
import {IRmpGateService, RmpGateService} from "../service/RmpGateService";
import {RmpGateEx} from "../core/entity/ex/RmpGateEx";
import {RmpGate} from "../core/entity/RmpGate";
import ErrorCode from "../common/res/ErrorCode";
import * as log4js from "log4js";

export default class RmpGateController {

    private static LOGGER = log4js.getLogger("RmpGateaController");

    private static rmpgateService: IRmpGateService = new RmpGateService();


    public static findAllList(req: express.Request, res1: express.Response, next: Function): void {
        RmpGateController.rmpgateService.findAll().then((resp: BackResponseBody<Array<RmpGateEx>>) => {
            res1.send(ResponseResultTool.convert2ResponseResult(resp))
        }).catch(ResponseResultTool.convertError2ResponseResult(res1));
    }
    public static findListByName(req: express.Request, res1: express.Response, next: Function): void {
        RmpGateController.rmpgateService.findListByName(req.query.name).then((resp:BackResponseBody<Array<RmpGateEx>>)=>{
            res1.send(ResponseResultTool.convert2ResponseResult(resp))
        }).catch(ResponseResultTool.convertError2ResponseResult(res1));
    }

    public static edit(req: express.Request, res1: express.Response, next: Function): void {
        let model = req.body as RmpGate;
        if (!model.Name || !model.ID || !model.Code || !model.JsonUserData.Point || !model.JsonUserData.lampPost) {
            RmpGateController.LOGGER.error('参数错误');
            RmpGateController.ResetServiceResult(false, res1);
            return;
        }
        RmpGateController.rmpgateService.edit(req.body).then((resp: boolean) => {
            RmpGateController.ResetServiceResult(resp, res1);
        }).catch(ResponseResultTool.convertError2ResponseResult(res1));
    }

    public static changeAreaId(req: express.Request, res1: express.Response, next: Function): void {
        RmpGateController.rmpgateService.changeAreaId(req.body).then((resp: boolean) => {
            RmpGateController.ResetServiceResult(resp, res1);
        }).catch(ResponseResultTool.convertError2ResponseResult(res1));
    }

    public static changeLampId(req: express.Request, res1: express.Response, next: Function): void {
        RmpGateController.rmpgateService.changeLampId(req.body).then((resp: boolean) => {
            RmpGateController.ResetServiceResult(resp, res1);
        }).catch(ResponseResultTool.convertError2ResponseResult(res1));
    }

    static ResetServiceResult(resp: any, res1: express.Response) {
        let result = new ResponseResult();
        resp ? result.code = ErrorCode.OK : result.code = ErrorCode.ERROR_NO_PARAM;
        result.data = resp;
        res1.send(result);
    }
}