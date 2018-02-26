import * as express from "express";
import request = require("superagent");
import {ResponseResultTool} from "../common/res/ResponseResultTool";
import {ResponseResult, BackResponseBody, PageResult} from "../core/params/result/ResponseResult";
import {EngineNodeService, IEngineNodeService} from "../service/EngineNodeService";
import {EngineNode} from "../core/entity/EngineNode";
import {EngineNodeEx} from "../core/entity/ex/EngineNodeEx";
import {IFindByIdParams, IDeleteById, IDeleteByIds} from "../core/params/request/RequestParams";
import {EngineNodeParams} from "../core/params/EngineNodeParams";
export default class EngineNodeController{
    private static engineNodeService:IEngineNodeService = new EngineNodeService();
    public static findListByParams(req: express.Request, res1: express.Response, next: Function): void {
        let params:EngineNodeParams = req.query;
        EngineNodeController.engineNodeService.findListByParams(params).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function  respResolve(resp: BackResponseBody<PageResult<EngineNode>>){
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }
    }

    public static findById(req: express.Request, res1: express.Response, next: Function): void {

        let params:IFindByIdParams = req.query;

        EngineNodeController.engineNodeService.detail(params.id).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function  respResolve(resp: BackResponseBody<EngineNodeEx>){
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }

    public static update(req: express.Request, res1: express.Response, next: Function): void {

        EngineNodeController.engineNodeService.update(req.body.model).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function respResolve (resp: BackResponseBody<string>) {
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }

    public static save(req: express.Request, res1: express.Response, next: Function): void {
        EngineNodeController.engineNodeService.save(req.body.model).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function complete(resp: BackResponseBody<string>){
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }

    public static deleteById(req: express.Request, res1: express.Response, next: Function) {

        let params:IDeleteById = req.body;

        EngineNodeController.engineNodeService.deleteById(params.id).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function  respResolve(resp: BackResponseBody<string>){
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }

    public static deleteByIds(req: express.Request, res1: express.Response, next: Function) {

        let params:IDeleteByIds = req.body;
        EngineNodeController.engineNodeService.deleteByIds(params.ids).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function  respResolve(resp: BackResponseBody<string>){
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }
}