import * as express from "express";
import CameraController from "../controller/CameraController";
import Config from '../Config';
import HttpCache from "../extend/HttpCache";


export default class CameraRoute {
    constructor(app: express.Express) {
        CameraRoute.activate(app);
    }

    public static CAMERA_URL = Config.NODE_SERVER_URL + "/camera";

    public static activate(app: express.Express): void {
        app.route(`${CameraRoute.CAMERA_URL}/findAllList`)
            .get(HttpCache.setNoCache, CameraController.findAllList);
        app.route(`${CameraRoute.CAMERA_URL}/findListByName`)
            .get(HttpCache.setNoCache, CameraController.findListByName);
        app.route(`${CameraRoute.CAMERA_URL}/changeAreaId`)
            .post(CameraController.changeAreaId);
        app.route(`${CameraRoute.CAMERA_URL}/changeLampId`)
            .post(CameraController.changeLampId);
        app.route(`${CameraRoute.CAMERA_URL}/edit`)
            .post(CameraController.edit);
        app.route(`${CameraRoute.CAMERA_URL}/getPlayerInfoByID`)
            .post(CameraController.getPlayerInfoByID);
    }
}