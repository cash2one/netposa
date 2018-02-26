/**
 * create by huangjingjing 2017-08-04
 */
import * as express from 'express';
import {TaskConfigService, ITaskConfigService} from '../service/TaskConfigService'
import {MacMonitor, TaskModel, CarMonitor} from '../core/server/TaskModel'
import {BackResponseBody, ResponseResult} from "../core/params/result/ResponseResult";
import ErrorCode from "../common/res/ErrorCode";
import {ResponseResultTool} from "../common/res/ResponseResultTool";
import {TaskConfigGetAlarmTaskIdsParam} from '../core/params/TaskConfigParams';

export default class TaskConfigController {
    public static taskConfigService: ITaskConfigService = new TaskConfigService();

    public static FindFaceList(req: express.Request, res: express.Response, next: Function) {
        TaskConfigController.taskConfigService.FindFaceList(req.query).then((resp: BackResponseBody<Array<TaskModel>>) => {
            res.send(ResponseResultTool.convert2ResponseResult(resp))
        }).catch(ResponseResultTool.convertError2ResponseResult(res))
    }

    public static AddOrUpdateFace(req: express.Request, res: express.Response, next: Function) {
        TaskConfigController.taskConfigService.AddOrUpdateFace(req.body).then((resp: BackResponseBody<string>) => {
            res.send(ResponseResultTool.convert2ResponseResult(resp))
        }).catch(ResponseResultTool.convertError2ResponseResult(res))
    }

    public static AddOrUpdateRfid(req: express.Request, res: express.Response, next: Function) {
        TaskConfigController.taskConfigService.AddOrUpdateRfid(req.body).then((resp: BackResponseBody<string>) => {
            res.send(ResponseResultTool.convert2ResponseResult(resp))
        }).catch(ResponseResultTool.convertError2ResponseResult(res))
    }

    public static AddOrUpdateCar(req: express.Request, res: express.Response, next: Function) {
        TaskConfigController.taskConfigService.AddOrUpdateCar(req.body).then((resp: BackResponseBody<string>) => {
            res.send(ResponseResultTool.convert2ResponseResult(resp))
        }).catch(ResponseResultTool.convertError2ResponseResult(res))
    }

    public static FindMacList(req: express.Request, res: express.Response, next: Function) {
        TaskConfigController.taskConfigService.FindMacList(req.query).then((resp: BackResponseBody<Array<MacMonitor>>) => {
            res.send(ResponseResultTool.convert2ResponseResult(resp))
        }).catch(ResponseResultTool.convertError2ResponseResult(res))
    }

    public static FindCarList(req: express.Request, res: express.Response, next: Function) {
        TaskConfigController.taskConfigService.FindCarList(req.query).then((resp: BackResponseBody<Array<CarMonitor>>) => {
            res.send(ResponseResultTool.convert2ResponseResult(resp))
        }).catch(ResponseResultTool.convertError2ResponseResult(res))
    }


    public static FindFaceDetail(req: express.Request, res: express.Response, next: Function) {
        let ID = req.query.ID;
        TaskConfigController.taskConfigService.GetFaceDetail(ID).then(resp => {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = resp as TaskModel;
            res.send(result);
        }).catch(ResponseResultTool.convertError2ResponseResult(res))
    }

    public static FindFaceByTaskId(req: express.Request, res: express.Response, next: Function){
        let ID = req.query.ID;
        TaskConfigController.taskConfigService.GetFaceDetailByTaskId(ID).then(resp => {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = resp as TaskModel;
            res.send(result);
        }).catch(ResponseResultTool.convertError2ResponseResult(res))
    }

    public static FindRfidDetail(req: express.Request, res: express.Response, next: Function) {
        let ID = req.query.ID;
        TaskConfigController.taskConfigService.GetRfidDetail(ID).then(resp => {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = resp as MacMonitor;
            res.send(result);
        }).catch(ResponseResultTool.convertError2ResponseResult(res))
    }

    public static FindCarDetail(req: express.Request, res: express.Response, next: Function) {
        let ID = req.query.ID;
        TaskConfigController.taskConfigService.GetCarDetail(ID).then(resp => {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = resp as CarMonitor;
            res.send(result);
        }).catch(ResponseResultTool.convertError2ResponseResult(res))
    }

    public static getFaceTaskIDs(req: express.Request, res: express.Response, next: Function) {
        let param: any = req.query;
        TaskConfigController.taskConfigService.getFaceTaskIDs(param.ID, param.type).then(resp => {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = resp as Array<TaskModel>;
            res.send(result);
        }).catch(ResponseResultTool.convertError2ResponseResult(res))
    }

    public static getTaskIdsByUserId(req: express.Request, res: express.Response, next: Function) {
        let param = (req.query || {}) as TaskConfigGetAlarmTaskIdsParam;
        TaskConfigController.taskConfigService.getTaskIdsByUserId(param.userId).then((data: Array<string>) => {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }).catch(ResponseResultTool.convertError2ResponseResult(res))
    }

    public static getUserIdByPersonId(req: express.Request, res: express.Response, next: Function) {
        let param = req.query as any;

        TaskConfigController.taskConfigService.getUserIdByPersonId(param.IDs).then((data: Array<string>) => {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }).catch(ResponseResultTool.convertError2ResponseResult(res))
    }

}