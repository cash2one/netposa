/**
 * Created by dell on 2017/4/10.
 */
import * as express from "express";
import TreeController from '../controller/TreeController';
import Config from '../Config';
import HttpCache from "../extend/HttpCache";

export default class TreeRoute {
    constructor(app: express.Express) {
        TreeRoute.activate(app);
    }

    public static TREE_URL = Config.NODE_SERVER_URL + "/tree";

    public static activate(app: express.Express): void {

        app.route(TreeRoute.TREE_URL + "/findAreaCamera")
            .get(HttpCache.setNoCache, TreeController.findAreaListWithCamera);
        app.route(TreeRoute.TREE_URL + "/findAreaWithWifi")
            .get(HttpCache.setNoCache, TreeController.findAreaListWithWifi);
        app.route(TreeRoute.TREE_URL + "/findAreaWithRmpgate")
            .get(HttpCache.setNoCache, TreeController.findAreaListWithRmpgate);
        app.route(TreeRoute.TREE_URL + "/findAreaWithElectronicfence")
            .get(HttpCache.setNoCache, TreeController.findAreaListWithElectronicfence);
        app.route(TreeRoute.TREE_URL + "/findAreaWithLamp")
            .get(HttpCache.setNoCache, TreeController.findAreaListWithLamp);
        app.route(TreeRoute.TREE_URL + "/findAreaWithBusinessLib")
            .get(HttpCache.setNoCache, TreeController.findAreaListWithLamp);
        app.route(TreeRoute.TREE_URL + "/findAreaWithPersion")
            .get(HttpCache.setNoCache, TreeController.findAreaListWithPerson);

        app.route(TreeRoute.TREE_URL + "/findAreaWithUser")
            .get(HttpCache.setNoCache, TreeController.findAreaListWithUser);

        app.route(TreeRoute.TREE_URL + "/findLampTreeWithCamera")
            .get(HttpCache.setNoCache, TreeController.findLampListWithCamera);
        app.route(TreeRoute.TREE_URL + "/findLampTreeWithRmpGate")
            .get(HttpCache.setNoCache, TreeController.findLampListWithRmpGate);
        app.route(TreeRoute.TREE_URL + "/findLampTreeWithElectronicfence")
            .get(HttpCache.setNoCache, TreeController.findLampListWithAndElectronicfenceTree);
        app.route(TreeRoute.TREE_URL + "/findLampTreeWithWifi")
            .get(HttpCache.setNoCache, TreeController.findLampListWithWifiTree);


    }
}