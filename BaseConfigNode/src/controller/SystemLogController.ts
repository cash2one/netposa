/**
 * Created by lb on 2017/11/22 0022.
 */

import * as express from "express";
import {BackResponseBody, PageResult} from "../core/params/result/ResponseResult";
import {ResponseResultTool} from "../common/res/ResponseResultTool";
import {SystemLogService, ISystemLogService} from "../service/SystemLogService";
import {HttpUtils} from "../utils/HttpUtils";
import PortraitNodeTool from "../utils/CommonUtils";
import * as log4js from "log4js";
import * as util from "util";

export  default class SystemLogController{

    private static LOGGER = log4js.getLogger("SystemLogController");

    private static SystemLogService: ISystemLogService = new SystemLogService();

    public static SaveSystemLog(req: express.Request, res: express.Response, next: Function): void {
        let params = req.body || {} as any;
        SystemLogController.LOGGER.debug(util.format("前端传来的systemLog实体为: %j", params));
        // 在这里组装一些数据
        // 客户端ip
        params.OperatorIP = HttpUtils.current().getClientIp();
        // 当前登录用户userId
        params.OperatorUser = HttpUtils.current().getUserIdStr();
        // 操作时间以nodejs所在时间为准
        params.OperatorTime = PortraitNodeTool.formatDate(new Date());

        SystemLogController.LOGGER.debug(util.format("用于保存到数据库里的实体为: %j", params));

        SystemLogController.SystemLogService.save(params).then(complete)
            .catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(resp: BackResponseBody<string>) {
            res.send(ResponseResultTool.convert2ResponseResult(resp));
        }
    }
}