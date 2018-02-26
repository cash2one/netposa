/**
 * Created by dell on 2017/4/10.
 */
import * as express from "express";
import AreaController from '../controller/AreaController';
import Config from '../Config';
import HttpCache from "../extend/HttpCache";

export default class AreaRoute {
    constructor(app: express.Express) {
        AreaRoute.activate(app);
    }

    public static AREA_URL = Config.NODE_SERVER_URL + "/area";

    public static activate(app: express.Express): void {

        app.route(`${AreaRoute.AREA_URL}/findAreaListTree`)
            .get(HttpCache.setNoCache,AreaController.findAreaListTree);

        app.route(`${AreaRoute.AREA_URL}/add`)
            .post(AreaController.saveArea);

        app.route(`${AreaRoute.AREA_URL}/update`)
            .post(AreaController.updateArea);

        app.route(`${AreaRoute.AREA_URL}/deleteById`)
            .post(AreaController.deleteAreaById);

        app.route(`${AreaRoute.AREA_URL}/deleteByIds`)
            .post(AreaController.deleteAreaByIds);

        app.route(`${AreaRoute.AREA_URL}/get`)
            .get(AreaController.getArea);

    }
}