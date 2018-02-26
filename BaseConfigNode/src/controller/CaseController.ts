import * as express from "express";
import { BackResponseBody} from "../core/params/result/ResponseResult";
import {ResponseResultTool} from "../common/res/ResponseResultTool"
import * as log4js from "log4js";
import { CaseService , ICaseService } from '../service/CaseService';
import {SearchCascadeModel} from "../core/server/SearchCascadeModel";

export default class CaseController{

    private static LOGGER = log4js.getLogger("CameraController");

    private static caseService:ICaseService = new CaseService();

    public static findCascadeList(req: express.Request, res1: express.Response, next: Function): void {
        let params:SearchCascadeModel = req.body;

        CaseController.caseService.findCascadeList(params).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));
    
        function  respResolve(resp: BackResponseBody<Array<any>>){
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }
    }
}