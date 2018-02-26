import * as express from "express";
import request = require("superagent");
import {ResponseResultTool} from "../common/res/ResponseResultTool";
import {ResponseResult, BackResponseBody, PageResult} from "../core/params/result/ResponseResult";
import {EngineServerService, IEngineServerService} from "../service/EngineServerService";
import {EngineServer} from "../core/entity/EngineServer";
import {IFindByIdParams, IDeleteById, IDeleteByIds} from "../core/params/request/RequestParams";
import {EngineServerEx} from "../core/entity/ex/EngineServerEx";
export default class EngineServerController{
    private static EngineServerService:IEngineServerService = new EngineServerService();
    public static findAll(req: express.Request, res1: express.Response, next: Function): void {
        EngineServerController.EngineServerService.findAll().then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function  respResolve(resp: BackResponseBody<EngineServer>){
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }

    public static findById(req: express.Request, res1: express.Response, next: Function): void {

        let params:IFindByIdParams = req.query;

        EngineServerController.EngineServerService.detail(params.id).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function  respResolve(resp: BackResponseBody<EngineServerEx>){
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }

    public static update(req: express.Request, res1: express.Response, next: Function): void {

        EngineServerController.EngineServerService.update(req.body.model).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function respResolve (resp: BackResponseBody<string>) {
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }

    public static save(req: express.Request, res1: express.Response, next: Function): void {
        EngineServerController.EngineServerService.save(req.body.model).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function complete(resp: BackResponseBody<any>){
            
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }

    public static deleteById(req: express.Request, res1: express.Response, next: Function) {

        let params:IDeleteById = req.body;

        EngineServerController.EngineServerService.deleteById(params.id).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function  respResolve(resp: BackResponseBody<string>){
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }

}