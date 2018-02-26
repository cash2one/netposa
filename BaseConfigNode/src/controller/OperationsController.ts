import * as log4js from "log4js";
import * as express from "express";
import { IOperationsService, OperationsService } from "../service/OperationsService";
// import ErrorCode from "../common/res/ErrorCode";
import { BackResponseBody, PageResult, ResponseResult } from "../core/params/result/ResponseResult";
// import {SystemPoint} from "../core/entity/SystemPoint";
import { ResponseResultTool } from "../common/res/ResponseResultTool";
import { intelligentAnalysisRequireParams } from "../core/entity/maintainEnum";

export default class OperationsController {

    private static Logger = log4js.getLogger("MapController");
    private static operationsService: IOperationsService = new OperationsService();

    static taskStatistics(req: express.Request, res: express.Response, next: Function): void {

        OperationsController.operationsService.taskStatistics(req.body.areaId).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: BackResponseBody<PageResult<any>>) {
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }

    }

    static userStatus(req: express.Request, res: express.Response, next: Function): void {
        let params: any = req.body;

        OperationsController.operationsService.userStatus(params).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: BackResponseBody<PageResult<any>>) {
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }

    static logManagement(req: express.Request, res: express.Response, next: Function): void {

        let params: any = req.query;
        console.log(params);
        OperationsController.operationsService.logManagement(params).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: BackResponseBody<PageResult<any>>) {
            console.log(JSON.stringify(data));
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }

    static exceptionlog(req: express.Request, res: express.Response, next: Function): void {

        let params: any = req.body;

        OperationsController.operationsService.exceptionlog(params).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: BackResponseBody<PageResult<any>>) {
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }

    }

    // 统计分析
    static getDevicesStatus(req: express.Request, res: express.Response, next: Function): void {
        // let params:any = req.query;
        OperationsController.operationsService.getDevicesStatus().then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: BackResponseBody<PageResult<any>>) {
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }

    static taskStatisticsTotal(req: express.Request, res: express.Response, next: Function): void {
        OperationsController.operationsService.taskStatisticsTotal().then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: BackResponseBody<PageResult<any>>) {
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }

    public static alarmStatistics(req: express.Request, res: express.Response, next: Function) {
        let params: any = req.query;
        OperationsController.operationsService.alarmStatistics(params).then(compile).catch(ResponseResultTool.convertError2ResponseResult(res));

        function compile(data: BackResponseBody<Array<any>>) {
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }

    public static trafficStatistics(req: express.Request, res: express.Response, next: Function) {
        OperationsController.operationsService.trafficStatistics().then(compile).catch(ResponseResultTool.convertError2ResponseResult(res));

        function compile(data: BackResponseBody<Array<any>>) {

            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }

    public static retrievalStatistics(req: express.Request, res: express.Response, next: Function) {
        let params: intelligentAnalysisRequireParams = req.body;
        OperationsController.operationsService.retrievalStatistics(params).then(compile).catch(ResponseResultTool.convertError2ResponseResult(res));

        function compile(data: BackResponseBody<Array<any>>) {

            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }

    public static analysissTatistics(req: express.Request, res: express.Response, next: Function) {
        OperationsController.operationsService.analysissTatistics().then(compile).catch(ResponseResultTool.convertError2ResponseResult(res));

        function compile(data: BackResponseBody<Array<any>>) {
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }

    public static getDevicesStatusModule(req: express.Request, res: express.Response, next: Function) {
        let params: any = req.query;
        OperationsController.operationsService.getDevicesStatusModule(params).then(compile).catch(ResponseResultTool.convertError2ResponseResult(res));

        function compile(data: BackResponseBody<any>) {
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }

    public static getServerStatusModule(req: express.Request, res: express.Response, next: Function) {
        let params: any = req.query;
        OperationsController.operationsService.getServerStatusModule(params).then(compile).catch(ResponseResultTool.convertError2ResponseResult(res));

        function compile(data: BackResponseBody<Array<any>>) {
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }

    //报警统计趋势
    public static alarmStatisticsModule(req: express.Request, res: express.Response, next: Function) {
        let params: any = req.query;

        OperationsController.operationsService.alarmStatisticsModule(params).then(compile).catch(ResponseResultTool.convertError2ResponseResult(res));

        function compile(data: BackResponseBody<Array<any>>) {
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }
    //流量统计趋势
    public static trafficStatisticsModule(req: express.Request, res: express.Response, next: Function) {
        let params: any = req.query;

        OperationsController.operationsService.trafficStatisticsModule(params).then(compile).catch(ResponseResultTool.convertError2ResponseResult(res));

        function compile(data: BackResponseBody<Array<any>>) {
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }

    //流量统计
    public static areaTrafficStatistics(req: express.Request, res: express.Response, next: Function) {
        let params: any = req.query;

        OperationsController.operationsService.areaTrafficStatistics(params).then(compile).catch(ResponseResultTool.convertError2ResponseResult(res));

        function compile(data: BackResponseBody<Array<any>>) {
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }

    //取排名前十的结果
    public static deveceAlarmStatisticsTop(req: express.Request, res: express.Response, next: Function) {
        // let params: any = req.query;
        let params: any = req.query;
        OperationsController.operationsService.deveceAlarmStatisticsTop(params).then(compile).catch(ResponseResultTool.convertError2ResponseResult(res));

        function compile(data: BackResponseBody<Array<any>>) {
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }

    //取排名前十的结果
    public static deveceTrafficStatisticsTop(req: express.Request, res: express.Response, next: Function) {
        // let params: any = req.query;
        let params: any = req.query;
        OperationsController.operationsService.deveceTrafficStatisticsTop(params).then(compile).catch(ResponseResultTool.convertError2ResponseResult(res));

        function compile(data: BackResponseBody<Array<any>>) {
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }
    //分析统计
    public static intelligentAnalysis(req: express.Request, res: express.Response, next: Function) {
        let params: any = req.body;

        OperationsController.operationsService.intelligentAnalysis(params).then(compile).catch(ResponseResultTool.convertError2ResponseResult(res));

        function compile(data: BackResponseBody<Array<any>>) {
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }

    //布控报警
    public static dispatchedAboutAlarm(req: express.Request, res: express.Response, next: Function) {
        let params: any = req.body;

        OperationsController.operationsService.dispatchedAboutAlarm(params).then(compile).catch(ResponseResultTool.convertError2ResponseResult(res));

        function compile(data: BackResponseBody<Array<any>>) {
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }

    //检索趋势统计
    public static retrievalTrendStatistics(req: express.Request, res: express.Response, next: Function) {
        let params: any = req.query;

        OperationsController.operationsService.retrievalTrendStatistics(params).then(compile).catch(ResponseResultTool.convertError2ResponseResult(res));

        function compile(data: BackResponseBody<Array<any>>) {
            let result = new ResponseResult();
            result.code = 200;
            result.data = data;
            res.send(ResponseResultTool.convert2ResponseResult(result));
        }
    }

    //检索排行榜
    public static retrievalKeyWordRank(req: express.Request, res: express.Response, next: Function) {
        let params: any = req.query;

        OperationsController.operationsService.retrievalKeyWordRank(params).then(compile).catch(ResponseResultTool.convertError2ResponseResult(res));

        function compile(data: BackResponseBody<Array<any>>) {
            let result = new ResponseResult();
            result.code = 200;
            result.data = data;
            res.send(ResponseResultTool.convert2ResponseResult(result));
        }
    }


}





