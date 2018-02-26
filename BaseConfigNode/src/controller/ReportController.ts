import * as express from "express";
import request = require("superagent");
import {ResponseResult, BackResponseBody, PageResult} from "../core/params/result/ResponseResult";
import {ResponseResultTool} from "../common/res/ResponseResultTool";
import {IReportService, ReportService} from "../service/ReportService";
import {CameraListParams, CameraChangeCameraType} from "../core/params/CameraParams";
import {CameraEx} from "../core/entity/ex/CameraEx";
import {Camera} from "../core/entity/Camera";
import ErrorCode from "../common/res/ErrorCode";
import * as log4js from "log4js";

export default class ReportController{

    private static LOGGER = log4js.getLogger("ReportController");

    private static reportService:IReportService = new ReportService();

    public static findListByPage(req: express.Request, res1: express.Response, next: Function): void {

        let params:CameraListParams = req.query;

        ReportController.reportService.findListByPage(params).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function  respResolve(resp: BackResponseBody<Array<CameraEx>>){
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }
    }

    public static delete(req: express.Request, res1: express.Response, next: Function): void{
        let params = req.body || {}

        ReportController.reportService.delete(params.id).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res1));
        
        function complete(data: BackResponseBody<string>) {
            res1.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }
   

}