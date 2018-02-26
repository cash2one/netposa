/**
 * Created by dell on 2017/4/8.
 */
import * as express from "express";
import ErrorCode from "../common/res/ErrorCode";
import {LampService,ILampService} from "../service/LampService";
import {Lamp} from "../core/entity/Lamp";
import {ResponseResult} from "../core/params/result/ResponseResult";
import {ResponseResultTool} from "../common/res/ResponseResultTool";
import {IDeleteByIds} from "../core/params/request/RequestParams";

import {SystemPoint} from "../core/entity/SystemPoint";
import {Relation} from "../core/entity/DeviceRelation";

export default class LampController{

    private static lampService:ILampService = new LampService();

    public static saveLamp(req: express.Request, res: express.Response, next: Function) :void{
        let params = req.body as Lamp;
        LampController.lampService.save(params).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: any) {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }
    }

    public static updateLamp(req: express.Request, res: express.Response, next: Function) :void{

        let params = req.body as Lamp;
        LampController.lampService.update(params).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: any) {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }
    }

    public static getLamp(req: express.Request, res: express.Response, next: Function): void{

        let params = req.query || {};

        LampController.lampService.detail(params.id).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: Lamp){
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }
    }

    public static deleteLampById(req: express.Request, res: express.Response, next: Function) :void{
        let params = req.body || {};

        LampController.lampService.deleteById(params.id).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: boolean) {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }
    }

    public static deleteLampByIds(req: express.Request, res: express.Response, next: Function) :void{
        let params:IDeleteByIds = req.body || {};


        LampController.lampService.deleteByIds(params.ids).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: boolean) {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }
    }


    public static updataLampSystemPoint(req: express.Request, res: express.Response, next: Function) :void{
        let params = req.query || {};

        LampController.lampService.updataLampSystemPoint(params).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: boolean) {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }
    }

    public static findSystemPointById(req: express.Request, res: express.Response, next: Function) :void{
        let params = req.query || {};

        LampController.lampService.findSystemPointById(params.id).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data:SystemPoint) {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }
    }

    public static deleteLampAndDeviceRelation(req: express.Request, res: express.Response, next: Function) :void{
        let params = req.query || {};
        LampController.lampService.deleteLampAndDeviceRelation(params).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));
        function complete(data:boolean) {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }
    }
    public static findLampDeviceRelationById(req: express.Request, res: express.Response, next: Function) :void{
        let params = req.query || {};
        LampController.lampService.findLampDeviceRelationById(params.id).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));
        function complete(data:Array<Relation>) {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }
    }

    public static findLampDeviceChildrenById(req: express.Request, res: express.Response, next: Function) :void{
        let params = req.query || {};
        LampController.lampService.findLampDeviceChildrenById(params.id).then(complete)
            .catch(ResponseResultTool.convertError2ResponseResult(res));
        function complete(data:any) {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }
    }
}