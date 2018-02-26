import * as express from "express";
import WifiController from "../controller/WifiController";
import Config from '../Config';
import HttpCache from "../extend/HttpCache";
/**
 * create by zmp.
 * @time: 2017-08-10
 */
export default class WifiRoute {
    constructor(app: express.Express) {
        WifiRoute.activate(app);
    }
    public static WIFI_URL = Config.NODE_SERVER_URL + "/wifi";
    public static activate(app: express.Express): void {
        app.route(`${WifiRoute.WIFI_URL}/findAllList`)
            .get(WifiController.findAllList);
        app.route(`${WifiRoute.WIFI_URL}/findListByName`)
            .get(HttpCache.setNoCache, WifiController.findListByName);
        app.route(`${WifiRoute.WIFI_URL}/changeAreaId`)
            .post(WifiController.changeAreaId);
        app.route(`${WifiRoute.WIFI_URL}/changeLampId`)
            .post(WifiController.changeLampId);
        app.route(`${WifiRoute.WIFI_URL}/edit`)
            .post(WifiController.edit);
    }
}