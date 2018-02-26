import * as express from "express";
import VideoStructController from "../controller/VideoStructController";
import Config from "../Config";

/**
 * create by zmp.
 * @time: 2017-08-10
 */
export default class VideoStructRoute {
    constructor(app: express.Express) {
        VideoStructRoute.activate(app);
    }

    public static BASE_URL = Config.NODE_SERVER_URL + "/videoStruct";

    public static activate(app: express.Express): void {

        app.route(VideoStructRoute.BASE_URL + "/findFaceList")
            .get(VideoStructController.findFaceList);
        app.route(VideoStructRoute.BASE_URL + "/findFaceById")
            .get(VideoStructController.findFaceById);
    }
}