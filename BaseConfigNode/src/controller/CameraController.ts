import * as express from "express";
import {BackResponseBody, ResponseResult} from "../core/params/result/ResponseResult";
import {ResponseResultTool} from "../common/res/ResponseResultTool";
import {ICameraService, CameraService} from "../service/CameraService";
import {CameraEx} from "../core/entity/ex/CameraEx";
import ErrorCode from "../common/res/ErrorCode";
import * as log4js from "log4js";
import {Camera} from "../core/entity/Camera";

export default class CameraController {

    private static  LOGGER = log4js.getLogger("CameraController");

    private static cameraService: ICameraService = new CameraService();

    public static findAllList(req: express.Request, res1: express.Response, next: Function): void {
        CameraController.cameraService.findAll().then((resp:BackResponseBody<Array<CameraEx>>)=>{
            res1.send(ResponseResultTool.convert2ResponseResult(resp))
        }).catch(ResponseResultTool.convertError2ResponseResult(res1));
    }

    public static findListByName(req: express.Request, res1: express.Response, next: Function): void {
        CameraController.cameraService.findListByName(req.query.name).then((resp:BackResponseBody<Array<CameraEx>>)=>{
            res1.send(ResponseResultTool.convert2ResponseResult(resp))
        }).catch(ResponseResultTool.convertError2ResponseResult(res1));
    }

    public static edit(req: express.Request, res1: express.Response, next: Function): void {
        let model = req.body as Camera;
        if (!model.Name || !model.ID || !model.Code || !model.JsonUserData.Point || !model.JsonUserData.lampPost) {
            CameraController.LOGGER.error('参数错误');
            CameraController.ResetServiceResult(false,res1);
            return;
        }
        CameraController.cameraService.edit(req.body).then((resp:boolean)=>{
            CameraController.ResetServiceResult(resp,res1)
        }).catch(ResponseResultTool.convertError2ResponseResult(res1));
    }

    public static changeAreaId(req: express.Request, res1: express.Response, next: Function): void {
        CameraController.cameraService.changeAreaId(req.body)
            .then((resp:boolean)=>{
                CameraController.ResetServiceResult(resp,res1)
            }).catch(ResponseResultTool.convertError2ResponseResult(res1));
    }

    public static changeLampId(req: express.Request, res1: express.Response, next: Function): void {
        CameraController.cameraService.changeLampId(req.body)
            .then((resp:boolean)=>{
                CameraController.ResetServiceResult(resp,res1)
            }).catch(ResponseResultTool.convertError2ResponseResult(res1));
    }
    public static getPlayerInfoByID(req: express.Request, res1: express.Response, next: Function): void {
        CameraController.cameraService.getPlayerInfoByID(req.body.id)
            .then((resp:any)=>{
                res1.send(ResponseResultTool.convert2ResponseResult(resp))
            }).catch(ResponseResultTool.convertError2ResponseResult(res1));
    }
    static ResetServiceResult(resp:any,res1: express.Response){
        let result = new ResponseResult();
        resp?result.code = ErrorCode.OK:result.code = ErrorCode.ERROR_NO_PARAM;
        result.data = resp;
        res1.send(result);
    }


}