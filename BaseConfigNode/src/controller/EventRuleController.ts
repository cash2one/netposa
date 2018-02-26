import * as express from "express";
import {BackResponseBody} from "../core/params/result/ResponseResult";
import {ResponseResultTool} from "../common/res/ResponseResultTool";
import {IEventRuleService, EventRuleService} from "../service/EventRuleService";
import * as log4js from "log4js";
import {EventRule} from "../core/entity/EventRule";
import {EventRuleEx} from "../core/entity/ex/EventRuleEx";
import {IFindByIdParams, IDeleteById, IDeleteByIds} from "../core/params/request/RequestParams";
export default class EventRuleController {
    private static LOGGER = log4js.getLogger("ElectronicFenceController");
    private static EventRuleService: IEventRuleService = new EventRuleService();

    public static findList(req: express.Request, res1: express.Response, next: Function): void {
        let params = req.body;
        EventRuleController.EventRuleService.findList(params).then((resp: BackResponseBody<Array<EventRule>>) => {
            res1.send(ResponseResultTool.convert2ResponseResult(resp))
        }).catch(ResponseResultTool.convertError2ResponseResult(res1));

    }

    public static findAll(req: express.Request, res1: express.Response, next: Function){
        EventRuleController.EventRuleService.findAll().then((resp: BackResponseBody<Array<EventRule>>) => {
            res1.send(ResponseResultTool.convert2ResponseResult(resp))
        }).catch(ResponseResultTool.convertError2ResponseResult(res1));
    }
    public static delete(req: express.Request, res1: express.Response, next: Function): void {
        let params = req.body;
        EventRuleController.EventRuleService.delete(params.id).then((resp: BackResponseBody<boolean>) => {
            res1.send(ResponseResultTool.convert2ResponseResult(resp))
        }).catch(ResponseResultTool.convertError2ResponseResult(res1));

    }

    public static saveOrUpdate(req: express.Request, res1: express.Response, next: Function): void {
        let params = req.body;
        EventRuleController.EventRuleService.saveOrUpdate(params).then((resp: BackResponseBody<string>) => {
            res1.send(ResponseResultTool.convert2ResponseResult(resp))
        }).catch(ResponseResultTool.convertError2ResponseResult(res1));

    }

    public static detail(req: express.Request, res1: express.Response, next: Function): void {
        let params = req.body;
        EventRuleController.EventRuleService.detail(params.id).then((resp: BackResponseBody<EventRuleEx>) => {
            res1.send(ResponseResultTool.convert2ResponseResult(resp))
        }).catch(ResponseResultTool.convertError2ResponseResult(res1));

    }
    public static deleteByIds(req: express.Request, res1: express.Response, next: Function) {

        let params:IDeleteByIds = req.body;
        EventRuleController.EventRuleService.deleteByIds(params.ids).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function  respResolve(resp: BackResponseBody<string>){
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }

}