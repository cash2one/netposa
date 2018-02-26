/**
 * Created by dell on 2017/4/10.
 */
import * as express from "express";
import BimgAuthController from "../controller/BimgAuthController";

export default class BimgRoute {
    constructor(app: express.Express) {
        BimgRoute.activate(app);
    }

    public static activate(app: express.Express): void {

        app.route("/bimg/**")
            .get(BimgAuthController.authBimg, BimgAuthController.requestBimg);
    }
}