import * as express from "express";
import ResourceSearchController from "../controller/ResourceSearchController";
import * as fs from "fs";
import * as util from 'util';  


/**
 * create by zmp.
 * @time: 2017-08-24
 */
export default class ResourceSearchRoute {
    constructor(app : express.Express) {
        ResourceSearchRoute.activate(app);
    }

    public static activate(app : express.Express): void {

        app.route("/BaseConfigNodeServer/db/resourceSearch/tips")
            .get(ResourceSearchController.resourceSearchTips);

        app.route("/BaseConfigNodeServer/db/resourceSearch/quickSearchByKeyWords")
            .post(ResourceSearchController.quickSearchByKeyWords);
            
        app.route("/BaseConfigNodeServer/db/resourceSearch/checkFace")
            .post(ResourceSearchController.checkFace);

        app.route("/BaseConfigNodeServer/db/resourceSearch/checkCar")
            .post(ResourceSearchController.checkCar);

        app.route("/BaseConfigNodeServer/db/resourceSearch/detectFace")
            .post(ResourceSearchController.detectFace);

        app.route("/BaseConfigNodeServer/db/resourceSearch/searchFace")
            .post(ResourceSearchController.searchFace);

        app.route("/BaseConfigNodeServer/db/resourceSearch/searchCar")
            .post(ResourceSearchController.searchCar);

        app.route("/BaseConfigNodeServer/db/resourceSearch/advancedSearchCar")
            .post(ResourceSearchController.advancedSearchCar);
            
        app.route("/BaseConfigNodeServer/db/resourceSearch/searchWiFiByParams")
            .post(ResourceSearchController.searchWiFiByParams);

        app.route("/BaseConfigNodeServer/db/resourceSearch/searchEFenceByParams")
            .post(ResourceSearchController.searchEFenceByParams);

        app.route("/BaseConfigNodeServer/db/resourceSearch/searchDevice")
            .post(ResourceSearchController.searchDevice);
    }
}

