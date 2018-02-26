/**
 * Created by dell on 2017/4/10.
 */
import * as express from "express";
import IodController from "../controller/IodController";
import Config from '../Config';

export default class IodRoute {
    constructor(app : express.Express) {
        IodRoute.activate(app);
    }

    public static IOD_URL = Config.NODE_SERVER_URL + "/iod";

    public static activate (app : express.Express) : void {
        app.route(IodRoute.IOD_URL + "/findAreaListTree")
            .get(IodController.findAreaListTree);

        app.route(IodRoute.IOD_URL + "/add")
            .post(IodController.saveIod);

        app.route(IodRoute.IOD_URL + "/update")
            .post(IodController.updateIod);

        app.route(IodRoute.IOD_URL + "/deleteById")
            .post(IodController.deleteIodById);

        app.route(IodRoute.IOD_URL + "/deleteByIds")
            .post(IodController.deleteIodByIds);

    }
}