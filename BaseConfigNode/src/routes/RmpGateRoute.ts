import * as express from "express";
import RmpGateController from "../controller/RmpGateController";
import Config from '../Config';
import HttpCache from "../extend/HttpCache";

export default class RmpGateRoute {
    constructor(app: express.Express) {
        RmpGateRoute.activate(app);
    }

    public static RMPGATE_URL = Config.NODE_SERVER_URL + "/rmpgate";

    public static activate(app: express.Express): void {

        app.route(`${RmpGateRoute.RMPGATE_URL}/findAllList`)
            .get(RmpGateController.findAllList);
        app.route(`${RmpGateRoute.RMPGATE_URL}/findListByName`)
            .get(HttpCache.setNoCache, RmpGateController.findListByName);    

        app.route(`${RmpGateRoute.RMPGATE_URL}/changeAreaId`)
            .post(RmpGateController.changeAreaId);

        app.route(`${RmpGateRoute.RMPGATE_URL}/changeLampId`)
            .post(RmpGateController.changeLampId);
        app.route(`${RmpGateRoute.RMPGATE_URL}/edit`)
            .post(RmpGateController.edit);
    }
}