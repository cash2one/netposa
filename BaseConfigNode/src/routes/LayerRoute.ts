import * as express from "express";
import LayerController from "../controller/LayerController";

export default class LayerRoute {
    constructor(app : express.Express) {
        LayerRoute.activate(app);
    }

    public static activate(app : express.Express): void {

        app.route("/BaseConfigNodeServer/db/layer/findAllList")
            .get(LayerController.findAllList);

        app.route("/BaseConfigNodeServer/db/layer/delete")
            .post(LayerController.delete);

        app.route("/BaseConfigNodeServer/db/layer/add")
            .post(LayerController.add);

        app.route("/BaseConfigNodeServer/db/layer/edit")
            .post(LayerController.edit);
    }
}