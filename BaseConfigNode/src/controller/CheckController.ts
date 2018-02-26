import * as express from "express";
import {BackResponseBody, PageResult} from '../core/params/result/ResponseResult';
import {ResponseResultTool} from "../common/res/ResponseResultTool";
import {ICheckService, CheckService} from "../service/CheckService";
import * as log4js from "log4js";
import {CheckGetListParams} from "../core/params/CheckParams";
import {MyCheckModel} from '../core/server/MyCheckModel';

export default class CheckController {

    private static LOGGER = log4js.getLogger("CheckController");

    private static checkService: ICheckService = new CheckService();

    public static findListByPage(req: express.Request, res1: express.Response, next: Function): void {
        CheckController.checkService.findListByPage((req.query || {}) as CheckGetListParams).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function respResolve(resp: BackResponseBody<PageResult<MyCheckModel>>) {
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }
    }


}