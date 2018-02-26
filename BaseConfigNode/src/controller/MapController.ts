/**
 * Created by dell on 2017/4/28.
 */
import * as log4js from "log4js";
import * as express from "express";
import {IMapService, MapService} from "../service/MapService";
import ErrorCode from "../common/res/ErrorCode";
import {BackResponseBody, PageResult, ResponseResult} from "../core/params/result/ResponseResult";
import {SystemPoint} from "../core/entity/SystemPoint";
import {ResponseResultTool} from "../common/res/ResponseResultTool";
import {MapBaseInfoModel} from "../core/server/MapBaseInfoModel";
export default class MapController{

    private static Logger = log4js.getLogger("MapController");
    private static mapService:IMapService = new MapService();

    static findList(req: express.Request, res: express.Response, next: Function): void{

        MapController.mapService.findList(req.query).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: BackResponseBody<PageResult<SystemPoint>>){
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }

    }

    static saveOrUpdate(req: express.Request, res: express.Response, next: Function): void{
        MapController.mapService.saveOrUpdate(req.body).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: BackResponseBody<string>){
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }

    }

    static getBaseInfo(req: express.Request, res: express.Response, next: Function){
        MapController.mapService.getBaseInfo().then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: MapBaseInfoModel){
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }
    }
    static saveOrUpdateBaseInfo(req: express.Request, res: express.Response, next: Function){
        MapController.mapService.saveOrUpdateBaseInfo(req.body as MapBaseInfoModel).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: boolean){
            let result = new ResponseResult<boolean>();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }
    }


}