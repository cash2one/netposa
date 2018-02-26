import * as express from "express";
import {IvsServerListParams} from "../core/params/IvsServerParams";
import {BackResponseBody, PageResult} from "../core/params/result/ResponseResult";
import {ResponseResultTool} from "../common/res/ResponseResultTool";
import {IvsServerEx} from "../core/entity/ex/IvsServerEx";
import {IFindByIdParams, IDeleteById, IDeleteByIds} from "../core/params/request/RequestParams";
import {IIvsServerService, IvsServerService} from "../service/IvsServerService";

export default class IvsServerController{

    private static ivsServerService:IIvsServerService = new IvsServerService();

    public static findById(req: express.Request, res1: express.Response, next: Function): void {

        let params:IFindByIdParams = req.query;
        IvsServerController.ivsServerService.detail(params.id).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function  respResolve(resp: BackResponseBody<IvsServerEx>){
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }

    public static findListByParams(req: express.Request, res1: express.Response, next: Function): void {

        let params:IvsServerListParams = req.query;

        IvsServerController.ivsServerService.findListByParams(params).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function  respResolve(resp: BackResponseBody<PageResult<IvsServerEx>>){
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }

    public static update(req: express.Request, res1: express.Response, next: Function): void {

        IvsServerController.ivsServerService.update(req.body.model).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function respResolve (resp: BackResponseBody<string>) {
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }

    public static save(req: express.Request, res1: express.Response, next: Function): void {

        let params = req.body || {};

        IvsServerController.ivsServerService.save(params.model).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function complete(resp: BackResponseBody<string>){
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }

    public static deleteById(req: express.Request, res1: express.Response, next: Function) {
        let params:IDeleteById = req.body;

        IvsServerController.ivsServerService.deleteById(params.id).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function  respResolve(resp: BackResponseBody<string>){
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }

    public static deleteByIds(req: express.Request, res1: express.Response, next: Function) {

        let params:IDeleteByIds = req.body;
        IvsServerController.ivsServerService.deleteByIds(params.ids).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function  respResolve(resp: BackResponseBody<string>){
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }


}