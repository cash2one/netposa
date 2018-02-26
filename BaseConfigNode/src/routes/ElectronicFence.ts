import * as express from "express";
import ElectronicFenceController from "../controller/ElectronicFenceController";
import Config from '../Config';
import HttpCache from "../extend/HttpCache";
export default class ElectronicFenceRoute {
    constructor(app: express.Express) {
        ElectronicFenceRoute.activate(app);
    }

    public static ELECTRONICFENCE_URL = Config.NODE_SERVER_URL + "/ElectronicFence";

    public static activate(app: express.Express): void {

        app.route(`${ElectronicFenceRoute.ELECTRONICFENCE_URL}/findAllList`)
            .get(ElectronicFenceController.findAllList);

        app.route(`${ElectronicFenceRoute.ELECTRONICFENCE_URL}/findListByName`)
            .get(HttpCache.setNoCache, ElectronicFenceController.findListByName);

        app.route(`${ElectronicFenceRoute.ELECTRONICFENCE_URL}/changeAreaId`)
            .post(ElectronicFenceController.changeAreaId);

        app.route(`${ElectronicFenceRoute.ELECTRONICFENCE_URL}/changeLampId`)
            .post(ElectronicFenceController.changeLampId);
        app.route(`${ElectronicFenceRoute.ELECTRONICFENCE_URL}/edit`)
            .post(ElectronicFenceController.edit);
    }
}