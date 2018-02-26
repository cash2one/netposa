/**
 * Created by dell on 2017/4/28.
 */
import Config from '../Config';
import * as express from "express";
import MapController from "../controller/MapController";

export default class MapRoute {
    constructor(app : express.Express) {
        MapRoute.activate(app);
    }

    public static Map_URL = Config.NODE_SERVER_URL + "/systempoint";

    public static activate (app : express.Express) : void {

        app.route(MapRoute.Map_URL + "/saveorupdate")
            .post(MapController.saveOrUpdate);

        app.route(MapRoute.Map_URL + "/list")
            .get(MapController.findList);

        app.route(MapRoute.Map_URL + "/getBaseInfo")
            .get(MapController.getBaseInfo);

        app.route(MapRoute.Map_URL + "/saveOrUpdateBaseInfo")
            .post(MapController.saveOrUpdateBaseInfo);
    }
}