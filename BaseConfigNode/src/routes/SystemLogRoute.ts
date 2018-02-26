/**
 * Created by lb on 2017/11/22 0022.
 */

import * as express from "express";
import SystemLogController from "../controller/SystemLogController";
import Config from '../Config';
export  default class SystemLogRoute{
    constructor(app : express.Express) {
        SystemLogRoute.activate(app);
    }

    private static SYSTEM_LOG_URL = Config.NODE_SERVER_URL + "/systemlog";

    public static activate(app : express.Express){
        app.route(SystemLogRoute.SYSTEM_LOG_URL + "/save")
            .post(SystemLogController.SaveSystemLog);
    }
}