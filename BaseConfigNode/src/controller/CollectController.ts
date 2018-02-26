import * as express from "express";
import {ResponseResult, BackResponseBody, PageResult} from "../core/params/result/ResponseResult";
import {ResponseResultTool} from "../common/res/ResponseResultTool";
import {ICollectService, CollectService} from "../service/CollectService";
import * as log4js from "log4js";
import {CollectEx} from "../core/entity/ex/CollectEx";
import {ErrorCode} from "../common/res/ErrorCode";
import {CollectDeleteParams} from "../core/params/CollectParams";

export default class CollectController {
    private static LOGGER = log4js.getLogger("CollectController");
    private static collectService: ICollectService = new CollectService();

    /**
     * @description 查找收藏
     * @param {e.Request} req
     * @param {e.Response} res1
     * @param {Function} next
     */
    public static findListByPage(req: express.Request, res1: express.Response, next: Function): void {
        CollectController.collectService.findListByPage(req.body).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));
        function respResolve(resp: Array<CollectEx>) {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = resp;
            res1.send(result);
        }
    }


    public static findCollectStatus(req: express.Request, res1: express.Response, next: Function): void {
        CollectController.collectService.findCollectStatus(req.body).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function respResolve(resp: ResponseResult<any>) {
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }
    }

    /**
     * @description 删除收藏
     * @param {e.Request} req
     * @param {e.Response} res
     * @param {Function} next
     */
    public static delete(req: express.Request, res: express.Response, next: Function): void {
        let params = (req.body || {}) as CollectDeleteParams;
        CollectController.collectService.delete(params.ids).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: boolean) {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }
    }

    /**
     * @description 通过deleteByObjectId删除收藏
     * @param {e.Request} req
     * @param {e.Response} res
     * @param {Function} next
     */
    public static deleteByObjectId(req: express.Request, res: express.Response, next: Function): void {
        CollectController.collectService.deleteByObjectId(req.body.ids).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: boolean) {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }
    }

    /**
     * @description 添加收藏
     * @param {e.Request} req
     * @param {e.Response} res1
     * @param {Function} next
     */
    public static add(req: express.Request, res: express.Response, next: Function): void {
        CollectController.collectService.add(req.body).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res));

        function respResolve(resp: BackResponseBody<any>) {
            CollectController.LOGGER.debug("return result: " + JSON.stringify(resp));
            res.send(resp);
        }
    }
}