import * as express from "express";


import request = require("superagent");
import {PersonListParams} from "../core/params/PersonParams";
import {ResponseResultTool} from "../common/res/ResponseResultTool";
import {PersonEx} from "../core/entity/ex/PersonEx";
import {IDeleteById, IDeleteByIds, IFindByIdParams} from "../core/params/request/RequestParams";
import {IPersonService, PersonService} from "../service/PersonService";
import {ResponseResult, BackResponseBody, PageResult} from "../core/params/result/ResponseResult";
import ErrorCode from "../common/res/ErrorCode";
import {AreaAndPersonListResult} from "../core/params/PersonParams";

export default class PersonController {
    private static personService:IPersonService = new PersonService();

    public static save(req: express.Request, res1: express.Response, next: Function): void {
        PersonController.personService.save(req.body).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function complete(resp: BackResponseBody<string>){
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = resp;
            res1.send(result);
        }

    }

    public static update(req: express.Request, res1: express.Response, next: Function): void {

        PersonController.personService.update(<PersonEx>req.body).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function complete(resp: boolean){
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = resp;
            res1.send(result);
        }

    }

    public static findListByParams(req: express.Request, res: express.Response, next: Function): void {

        let params:PersonListParams = req.query;

        PersonController.personService.findListByParams(params).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: BackResponseBody<PageResult<PersonEx>>){
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }

    }

    public static findDetailById(req: express.Request, res: express.Response, next: Function): void {

        let params:IFindByIdParams = req.query;
        PersonController.personService.detail(params.id).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(resp:PersonEx){
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = resp;
            res.send(result);
        }

    }

    public static deleteById(req: express.Request, res: express.Response, next: Function): void {

        let params:IDeleteById = req.body;

        PersonController.personService.deleteById(params.id).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: Array<any>){
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }

    }

    public static deleteByIds(req: express.Request, res: express.Response, next: Function): void {

        let params:IDeleteByIds = req.body;

        PersonController.personService.deleteByIds(params.ids).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: Array<Array<any>>){
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }

    }

    public static changeStatusByUserIds(req: express.Request, res: express.Response, next: Function){

        PersonController.personService.changeStatusByIds(req.body).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: BackResponseBody<string>){
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }
}