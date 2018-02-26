
import * as express from "express";
import {  BackResponseBody } from "../core/params/result/ResponseResult";
import { ResponseResultTool } from "../common/res/ResponseResultTool";
import { VideoStructService, IVideoStructService } from "../service/VideoStructService";
import * as log4js from "log4js";
import {TaskModel} from "../core/server/TaskModel";

export default class VideoStructController {

    private static LOGGER = log4js.getLogger("VideoStructController");

    private static VideoStructService: IVideoStructService = new VideoStructService();

    public static findFaceList(req: express.Request, res: express.Response, next: Function): void {
        VideoStructController.VideoStructService.FindFaceList(req.query).then((resp:BackResponseBody<Array<TaskModel>>)=>{
            res.send(ResponseResultTool.convert2ResponseResult(resp));
        }).catch(ResponseResultTool.convertError2ResponseResult(res));
    }
    public static findFaceById(req: express.Request, res: express.Response, next: Function): void {
        VideoStructController.VideoStructService.GetFaceDetail(req.query.id).then((resp:BackResponseBody<TaskModel>) => {
            res.send(ResponseResultTool.convert2ResponseResult(resp));
        }).catch(ResponseResultTool.convertError2ResponseResult(res));
    }
}