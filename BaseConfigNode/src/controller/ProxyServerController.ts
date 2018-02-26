import * as express from "express";
import request = require("superagent");
import {ProxyServerListParams} from "../core/params/ProxyServerParams";
import {ResponseResultTool} from "../common/res/ResponseResultTool";
import {ResponseResult, BackResponseBody, PageResult} from "../core/params/result/ResponseResult";
import {ProxyServer} from "../core/entity/ProxyServer";
import {IFindByIdParams, IDeleteById, IDeleteByIds} from "../core/params/request/RequestParams";
import {ProxyServerService, IProxyServerService} from "../service/ProxyServerService";
import {ProxyServerEx} from "../core/entity/ex/ProxyServerEx";

export default class ProxyServerController {

    private static proxyServerService:IProxyServerService = new ProxyServerService();


    public static findAll(req: express.Request, res1: express.Response, next: Function): void {
        ProxyServerController.proxyServerService.findAll().then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function  respResolve(resp: BackResponseBody<PageResult<ProxyServer>>){
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }

    public static findById(req: express.Request, res1: express.Response, next: Function): void {

        let params:IFindByIdParams = req.query;

        ProxyServerController.proxyServerService.detail(params.id).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function  respResolve(resp: BackResponseBody<ProxyServerEx>){
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }

    public static findListByParams(req: express.Request, res1: express.Response, next: Function): void {
        let params:ProxyServerListParams = req.query;

        ProxyServerController.proxyServerService.findListByParams(params).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function  respResolve(resp: BackResponseBody<PageResult<ProxyServer>>){
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }

    public static update(req: express.Request, res1: express.Response, next: Function): void {

        ProxyServerController.proxyServerService.update(req.body.model).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function respResolve (resp: BackResponseBody<string>) {
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }

    public static save(req: express.Request, res1: express.Response, next: Function): void {
        ProxyServerController.proxyServerService.save(req.body.model).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function complete(resp: BackResponseBody<string>){
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }

    public static deleteById(req: express.Request, res1: express.Response, next: Function) {

        let params:IDeleteById = req.body;

        ProxyServerController.proxyServerService.deleteById(params.id).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function  respResolve(resp: BackResponseBody<string>){
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }

    public static deleteByIds(req: express.Request, res1: express.Response, next: Function) {

        let params:IDeleteByIds = req.body;
        ProxyServerController.proxyServerService.deleteByIds(params.ids).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function  respResolve(resp: BackResponseBody<string>){
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }


}