/** create by zxq
 * @time: 2017-06-24 17:06:56
 */
import * as express from "express";
import {ResponseResultTool} from "../common/res/ResponseResultTool";
import * as log4js from "log4js";
import {TimeTemplateService, ITimeTemplateService} from "../service/TimeTemplateService";
import {TimeTemplate} from "../core/entity/TimeTemplate";
import {PageResult, BackResponseBody} from "../core/params/result/ResponseResult";

export default class TimeTemplateController{

    private static LOGGER = log4js.getLogger("TimeTemplateController");

    private static timeTemplateService: ITimeTemplateService = new TimeTemplateService();

    public static findListByParams(req: express.Request, res: express.Response, next: Function): void{

        TimeTemplateController.timeTemplateService.findListByParams(req.query).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: BackResponseBody<PageResult<TimeTemplate>>){
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }

    public static findAll(req: express.Request, res: express.Response, next: Function): void{


        TimeTemplateController.timeTemplateService.findAll().then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: BackResponseBody<PageResult<TimeTemplate>>){
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }

    public static save(req: express.Request, res: express.Response, next: Function): void{

        TimeTemplateController.timeTemplateService.save(req.body).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: BackResponseBody<string>){
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }
    public static update(req: express.Request, res: express.Response, next: Function): void{

        TimeTemplateController.timeTemplateService.update(req.body).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: BackResponseBody<string>){
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }

    public static deleteByIds(req: express.Request, res: express.Response, next: Function): void{

        TimeTemplateController.timeTemplateService.deleteByIds(req.body).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: BackResponseBody<boolean>){
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }

}