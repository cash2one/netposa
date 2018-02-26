import * as express from "express";
import ParameterController from "../controller/ParameterController";

/**
 * create by zmp.
 * @time: 2017-08-10
 */
export default class ParameterRoute {
    constructor(app : express.Express) {
        ParameterRoute.activate(app);
    }

    public static activate(app: express.Express): void {
        app.route("/BaseConfigNodeServer/db/param/findAllList")
            .get(ParameterController.findAllList);

        app.route("/BaseConfigNodeServer/db/param/save")
            .post(ParameterController.save);

        app.route("/BaseConfigNodeServer/db/param/findMapConfig")
            .get(ParameterController.findMapConfigByParamClass);

        app.route("/BaseConfigNodeServer/db/param/editMapConfig")
            .post(ParameterController.editMapConfigParam);
        
        app.route("/BaseConfigNodeServer/db/param/findSystemConfig")
            .get(ParameterController.findSystemConfig);

        app.route("/BaseConfigNodeServer/db/param/editSystemConfig")
            .post(ParameterController.editSystemConfigParam);
    }
}