/**
 * Created by dell on 2017/4/14.
 */
import * as express from "express";
import UnitService from "../service/UnitService";
import ErrorCode from "../common/res/ErrorCode";
import {ResponseResult, BackResponseBody, PageResult} from "../core/params/result/ResponseResult";
import {ResponseResultTool} from "../common/res/ResponseResultTool";
import {Unit} from "../core/entity/Unit";
import {AreaEx} from "../core/entity/ex/AreaEx";
import {UnitEx} from "../core/entity/ex/UnitEx";
import {UnitListParams} from "../core/params/UnitParams";

export default class UnitController{

    public static findUnitListByParams(req: express.Request, res: express.Response, next: Function){
        let params:UnitListParams = req.query;
        UnitService.findListByParams(params).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: BackResponseBody<PageResult<Unit>>){
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }


    public static saveUnit(req: express.Request, res: express.Response, next: Function){

        UnitService.save(req.body).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: BackResponseBody<string>){
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }

    }

    public static updateUnit(req: express.Request, res: express.Response, next: Function){

        UnitService.edit(req.body).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: BackResponseBody<string>){
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }

    }

    public static deleteUnit(req: express.Request, res: express.Response, next: Function){

        UnitService.deleteById(req.body.id).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: BackResponseBody<string>){
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }

    }

    public static deleteUnitByIds(req: express.Request, res: express.Response, next: Function){
        // TODO IDeleteByIds
        let params = req.body;
        UnitService.deleteUnitByIds(params.ids).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: BackResponseBody<string>){
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }

    }

    public static getUnit(req: express.Request, res: express.Response, next: Function){

        UnitService.getUnit(req.query.id).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: Unit){
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }

    }

    public static findUnitTreeList(req: express.Request, res: express.Response, next: Function){
        UnitService.findUnitTreeList(req.query).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: Array<UnitEx>){
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }

    }

}