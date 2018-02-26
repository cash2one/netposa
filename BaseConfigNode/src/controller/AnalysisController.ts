/**
 * create by huangjingjing 2017-08-04
 */
import * as express from 'express';
import {AnalysisService, IAnalysisService} from '../service/AnalysisService'
import {ResultTrack} from "../core/entity/FaceTrackEnum";
import {AccompanyingAnalysisResult} from '../core/entity/AccompanyingAnalysisEnum'

import {ResponseResult} from "../core/params/result/ResponseResult";
import {FaceAnalysisResult} from '../core/entity/FaceAnalysisEnum'
import {PersonAlarmResult} from '../core/entity/PersonAlarmEnum'
import ErrorCode from "../common/res/ErrorCode";
import {ResponseResultTool} from "../common/res/ResponseResultTool";
export default class AnalysisController {
    public static AnalysisService: IAnalysisService = new AnalysisService();

    public static faceAnalysis(req: express.Request, res: express.Response, next: Function) {

        AnalysisController.AnalysisService.FaceAnalysis(req.body).then((data: any) => {
            res.send(ResponseResultTool.convert2ResponseResult(data))
        }).catch(ResponseResultTool.convertError2ResponseResult(res))
    }
    public  static PersonAlarm(req: express.Request, res: express.Response, next: Function) {

        AnalysisController.AnalysisService.PersonAlarm(req.body).then((data: any) => {
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }).catch(ResponseResultTool.convertError2ResponseResult(res))
    }
    public static FaceTrack(req: express.Request, res: express.Response, next: Function) {
        AnalysisController.AnalysisService.FaceTrack(req.body).then((data: any) => {
            res.send(ResponseResultTool.convert2ResponseResult(data))
        }).catch(ResponseResultTool.convertError2ResponseResult(res))
    }
    public static Accompanying(req: express.Request, res: express.Response, next: Function) {
        AnalysisController.AnalysisService.Accompanying(req.body).then((data: any) => {
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }).catch(ResponseResultTool.convertError2ResponseResult(res))
    }
    public static findListWithOffLineTask(req: express.Request, res: express.Response, next: Function) {
        AnalysisController.AnalysisService.findListWithOffLineTask(req.body).then((data: any) => {
            data.data = data.data || [];
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }).catch(ResponseResultTool.convertError2ResponseResult(res))
    }
    public static faceFrequencyAnalysis(req: express.Request, res: express.Response, next: Function) {
        AnalysisController.AnalysisService.faceFrequencyAnalysis(req.body).then((data: any) => {
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }).catch(ResponseResultTool.convertError2ResponseResult(res))
    }
    public static faceFrequencyAppear(req: express.Request, res: express.Response, next: Function) {
        AnalysisController.AnalysisService.faceFrequencyAppear(req.body).then((data: any) => {
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }).catch(ResponseResultTool.convertError2ResponseResult(res))
    }

    public static delOffLineTask(req: express.Request, res: express.Response, next: Function) {
        AnalysisController.AnalysisService.delOffLineTask(req.body).then((data: any) => {
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }).catch(ResponseResultTool.convertError2ResponseResult(res))
    }
    static RealyInfo(req: express.Request, res: express.Response, next: Function) {
        AnalysisController.AnalysisService.RealyInfo(req.body).then((data: AccompanyingAnalysisResult) => {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }).catch(ResponseResultTool.convertError2ResponseResult(res))
    }
}