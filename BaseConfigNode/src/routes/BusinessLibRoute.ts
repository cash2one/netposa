import * as express from "express";
import BusinessLibController from "../controller/BusinessLibController";

export default class BusinessLibRoute {
    constructor(app: express.Express) {
        BusinessLibRoute.activate(app);
    }

    public static activate(app: express.Express): void {

        app.route("/BaseConfigNodeServer/db/businessLib/findById")
            .get(BusinessLibController.findById);

        app.route("/BaseConfigNodeServer/db/businessLib/findTreeWithArea")
            .get(BusinessLibController.findTreeWithArea);

        app.route("/BaseConfigNodeServer/db/businessLib/findHasSelfTreeWithArea")
            .get(BusinessLibController.findHasSelfTreeWithArea);

        app.route("/BaseConfigNodeServer/db/businessLib/findTree")
            .get(BusinessLibController.findTree);

        app.route("/BaseConfigNodeServer/db/businessLib/findBusinessLibHasSelfTree")
            .get(BusinessLibController.findBusinessLibHasSelfTree);

        app.route("/BaseConfigNodeServer/db/businessLib/person/save")
            .post(BusinessLibController.save);

        app.route("/BaseConfigNodeServer/db/businessLib/person/update")
            .post(BusinessLibController.update);

        app.route("/BaseConfigNodeServer/db/businessLib/deleteByIds")
            .post(BusinessLibController.deleteByIds);

        app.route("/BaseConfigNodeServer/db/businessLib/deleteById")
            .post(BusinessLibController.deleteById);

        app.route("/BaseConfigNodeServer/db/businessLib/findTreeAreaWithRole")
            .post(BusinessLibController.findTreeAreaWithRole)
    }
}