import * as express from "express";
import request = require("superagent");
import ErrorCode from "../common/res/ErrorCode";
import {VideoServerEx} from "../core/entity/ex/VideoServerEx";
import {ResponseResult, BackResponseBody, PageResult} from "../core/params/result/ResponseResult";
import {ResponseResultTool} from "../common/res/ResponseResultTool";
import {VideoServerListParams} from "../core/params/VideoServerParams";
import {VideoServer} from "../core/entity/VideoServer";
import {IFindByIdParams, IDeleteByIds, IDeleteById} from "../core/params/request/RequestParams";
import {IVideoServerService, VideoServerService} from "../service/VideoServerService";


export default class VideoServerController {

    private static videoServerService:IVideoServerService = new VideoServerService();

    public static findListByParams(req: express.Request, res1: express.Response, next: Function) {
        let params: VideoServerListParams = req.query;

        VideoServerController.videoServerService.findListByParams(params).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function complete(resp: BackResponseBody<PageResult<VideoServerEx>>) {
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }

    public static findById(req: express.Request, res1: express.Response, next: Function): void {

        let params:IFindByIdParams = req.query;

        VideoServerController.videoServerService.detail(params.id).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function complete(resp: BackResponseBody<VideoServerEx>){
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }

    public static deleteByIds(req: express.Request, res1: express.Response, next: Function): void {

        let params:IDeleteByIds = req.body;

        VideoServerController.videoServerService.deleteByIds(params.ids).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function complete(resp: BackResponseBody<string>){
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }
    
    public static isHasTask(req: express.Request, res1: express.Response, next: Function): void {

        let params:IDeleteByIds = req.body;

        VideoServerController.videoServerService.isHasTask(params.ids).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function complete(resp: BackResponseBody<string>){
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }

    public static update(req: express.Request, res1: express.Response, next: Function): void {

        VideoServerController.videoServerService.update(req.body.model).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function  respResolve(resp: BackResponseBody<string>){
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }

    public static save(req: express.Request, res1: express.Response, next: Function): void {
        VideoServerController.videoServerService.save(req.body.model).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function  respResolve(resp: BackResponseBody<string>){
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }

    public static deleteById(req: express.Request, res1: express.Response, next: Function) {
        let params:IDeleteById = req.body;
        VideoServerController.videoServerService.deleteById(params.id).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function respResolve(resp: BackResponseBody<string>){
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

}

}