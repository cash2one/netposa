import * as express from "express";

import {BackResponseBody, ResponseResult} from "../core/params/result/ResponseResult";
import {ResponseResultTool} from "../common/res/ResponseResultTool";
import {IElectronicFenceService, ElectronicFenceService} from "../service/ElectronicFenceService";
import {ElectronicFenceEx} from "../core/entity/ex/ElectronicFenceEx";
import {ElectronicFence} from "../core/entity/ElectronicFence";
import ErrorCode from "../common/res/ErrorCode";
import * as log4js from "log4js";

export default class ElectronicFenceController {

    private static LOGGER = log4js.getLogger("ElectronicFenceController");

    private static electronicFenceService: IElectronicFenceService = new ElectronicFenceService();

    public static findAllList(req: express.Request, res1: express.Response, next: Function): void {

        ElectronicFenceController.electronicFenceService.findAll().then((resp: BackResponseBody<Array<ElectronicFenceEx>>) => {
            res1.send(ResponseResultTool.convert2ResponseResult(resp))
        }).catch(ResponseResultTool.convertError2ResponseResult(res1));

    }
    public static findListByName(req: express.Request, res1: express.Response, next: Function): void {
        ElectronicFenceController.electronicFenceService.findListByName(req.query.name).then((resp:BackResponseBody<Array<ElectronicFenceEx>>)=>{
            res1.send(ResponseResultTool.convert2ResponseResult(resp))
        }).catch(ResponseResultTool.convertError2ResponseResult(res1));
    }

    public static edit(req: express.Request, res1: express.Response, next: Function): void {
        let model = req.body as ElectronicFence;
        if (!model.Name || !model.ID || !model.Code || !model.JsonUserData.Point || !model.JsonUserData.lampPost) {
            ElectronicFenceController.LOGGER.error('参数错误');
            ElectronicFenceController.ResetServiceResult(false, res1);
            return;
        }
        ElectronicFenceController.electronicFenceService.edit(req.body).then((resp: boolean) => {
            ElectronicFenceController.ResetServiceResult(resp, res1)
        }).catch(ResponseResultTool.convertError2ResponseResult(res1));

    }

    public static changeAreaId(req: express.Request, res1: express.Response, next: Function): void {
        ElectronicFenceController.electronicFenceService.changeAreaId(req.body).then((resp: boolean) => {
            ElectronicFenceController.ResetServiceResult(resp, res1)
        }).catch(ResponseResultTool.convertError2ResponseResult(res1));
    }

    public static changeLampId(req: express.Request, res1: express.Response, next: Function): void {
        ElectronicFenceController.electronicFenceService.changeLampId(req.body).then((resp: boolean) => {
            ElectronicFenceController.ResetServiceResult(resp, res1)
        }).catch(ResponseResultTool.convertError2ResponseResult(res1));

    }

    static ResetServiceResult(resp: any, res1: express.Response) {
        let result = new ResponseResult();
        resp ? result.code = ErrorCode.OK : result.code = ErrorCode.ERROR_NO_PARAM;
        result.data = resp;
        res1.send(result);
    }
}