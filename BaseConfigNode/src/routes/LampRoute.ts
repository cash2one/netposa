import * as express from "express";
import LampController from "../controller/LampController";
import Config from '../Config';

/**
 * create by zmp.
 * @time: 2017-08-10
 */
export default class LampRoute {
    constructor(app : express.Express) {
        LampRoute.activate(app);
    }

    public static LAMP_URL = Config.NODE_SERVER_URL + "/lamp";

    public static activate (app : express.Express) : void {
        app.route(LampRoute.LAMP_URL + "/add")
            .post(LampController.saveLamp);

        app.route(LampRoute.LAMP_URL + "/update")
            .post(LampController.updateLamp);

        app.route(LampRoute.LAMP_URL + "/get")
            .get(LampController.getLamp);

        app.route(LampRoute.LAMP_URL + "/deleteById")
            .post(LampController.deleteLampById);
        
        app.route(LampRoute.LAMP_URL + "/deleteByIds")
            .post(LampController.deleteLampByIds);


        app.route(LampRoute.LAMP_URL + "/findSystemPointById")
            .get(LampController.findSystemPointById);

        app.route(LampRoute.LAMP_URL + "/updataLampSystemPoint")
            .post(LampController.updataLampSystemPoint);

        app.route(LampRoute.LAMP_URL + "/deleteLampAndDeviceRelation")
            .post(LampController.deleteLampAndDeviceRelation);

        app.route(LampRoute.LAMP_URL + "/findLampDeviceRelationById")
            .get(LampController.findLampDeviceRelationById);

        app.route(LampRoute.LAMP_URL + "/findLampDeviceChildrenById")
            .get(LampController.findLampDeviceChildrenById);
    }
}