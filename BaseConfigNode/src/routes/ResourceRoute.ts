/**
 * Created by dell on 2017/4/10.
 */
import * as express from "express";
import ResourceController from "../controller/ResourceController";
import Config from '../Config';

export default class ResourceRoute {
    constructor(app : express.Express) {
        ResourceRoute.activate(app);
    }

    public static Resource_URL = Config.NODE_SERVER_URL + "/resource";

    public static activate (app : express.Express) : void {

        app.route(ResourceRoute.Resource_URL + "/getresourceNumByType")
            .post(ResourceController.getresourceNumByType);

        app.route(ResourceRoute.Resource_URL + "/getTotalDevice")
        .post(ResourceController.getTotalDevice);

        app.route(ResourceRoute.Resource_URL + "/getDeviceById")
        .post(ResourceController.getDeviceById);

        app.route(ResourceRoute.Resource_URL + "/getReourceData")
        .post(ResourceController.getReourceData)

        // app.route(ResourceRoute.Resource_URL + "/getDeviceById")
        // .post(ResourceController.getReourceData)
    }
}