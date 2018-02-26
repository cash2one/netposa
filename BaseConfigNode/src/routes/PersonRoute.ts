import * as express from "express";
import PersonController from "../controller/PersonController";

export default class PersonRoute {
    constructor(app: express.Express) {
        PersonRoute.activate(app);
    }

    public static activate(app: express.Express): void {
        //----------get
        app.route("/BaseConfigNodeServer/db/person/findListByParams")
            .get(PersonController.findListByParams);
        app.route("/BaseConfigNodeServer/db/person/findDetailById")
            .get(PersonController.findDetailById);

        //----------post
        app.route("/BaseConfigNodeServer/db/person/save")
            .post(PersonController.save);
        app.route("/BaseConfigNodeServer/db/person/update")
            .post(PersonController.update);
        app.route("/BaseConfigNodeServer/db/person/deleteById")
            .post(PersonController.deleteById);
        app.route("/BaseConfigNodeServer/db/person/deleteByIds")
            .post(PersonController.deleteByIds);
        app.route("/BaseConfigNodeServer/db/person/changeStatusByUserIds")
            .post(PersonController.changeStatusByUserIds);
    }
}