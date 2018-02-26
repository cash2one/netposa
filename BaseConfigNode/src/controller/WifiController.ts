import * as express from "express";

import {BackResponseBody, ResponseResult} from "../core/params/result/ResponseResult";
import {ResponseResultTool} from "../common/res/ResponseResultTool";
import {IWifiService, WifiService} from "../service/WifiService";

import {WifiEx} from "../core/entity/ex/WifiEx";
import {Wifi} from "../core/entity/Wifi";
import ErrorCode from "../common/res/ErrorCode";
import * as log4js from "log4js";
import {WifiChangeAreaIDModel} from "../core/params/WifiParams";

/**
 * create by zmp.
 * @time: 2017-08-10
 */
export default class WifiController {

    private static LOGGER = log4js.getLogger("WifiController");

    private static wifiService:IWifiService = new WifiService();


    // 查询所有的wifi设备
    public static findAllList(req: express.Request, res: express.Response, next: Function): void {
        WifiController.wifiService.findAll().then((resp:BackResponseBody<Array<WifiEx>>)=>{
            res.send(ResponseResultTool.convert2ResponseResult(resp))
        }).catch(ResponseResultTool.convertError2ResponseResult(res));
    }
    public static findListByName(req: express.Request, res1: express.Response, next: Function): void {
        WifiController.wifiService.findListByName(req.query.name).then((resp:BackResponseBody<Array<WifiEx>>)=>{
            res1.send(ResponseResultTool.convert2ResponseResult(resp))
        }).catch(ResponseResultTool.convertError2ResponseResult(res1));
    }

    // 编辑修改wifi设备
     public static edit(req: express.Request, res: express.Response, next: Function): void{
         let model = req.body as Wifi;
         if (!model.Name || !model.ID || !model.Code || !model.JsonUserData.Point || !model.JsonUserData.lampPost) {
             WifiController.LOGGER.error('参数错误');
             WifiController.ResetServiceResult(false, res);
             return;
         }
        WifiController.wifiService.edit(model).then((resp:boolean)=>{
            WifiController.ResetServiceResult(resp,res)
        }).catch(ResponseResultTool.convertError2ResponseResult(res));
    }

    // 更新wifi设备的区域ID
    public static changeAreaId(req: express.Request, res: express.Response, next: Function): void {
        let models = req.body as Array<WifiChangeAreaIDModel> || [];
        WifiController.wifiService.changeAreaId(models).then((resp:boolean)=>{
            WifiController.ResetServiceResult(resp,res)
        }).catch(ResponseResultTool.convertError2ResponseResult(res));

    }

    public static changeLampId(req: express.Request, res: express.Response, next: Function): void {
        let models = req.body as Array<WifiChangeAreaIDModel> || [];
        WifiController.wifiService.changeLampId(models).then((resp:boolean)=>{
            WifiController.ResetServiceResult(resp,res)
        }).catch(ResponseResultTool.convertError2ResponseResult(res));

    }
    static ResetServiceResult(resp: any, res1: express.Response) {
        let result = new ResponseResult();
        resp ? result.code = ErrorCode.OK : result.code = ErrorCode.ERROR_NO_PARAM;
        result.data = resp;
        res1.send(result);
    }
}