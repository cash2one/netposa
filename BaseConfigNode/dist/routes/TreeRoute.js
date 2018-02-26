"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TreeController_1 = require("../controller/TreeController");
const Config_1 = require("../Config");
const HttpCache_1 = require("../extend/HttpCache");
class TreeRoute {
    constructor(app) {
        TreeRoute.activate(app);
    }
    static activate(app) {
        app.route(TreeRoute.TREE_URL + "/findAreaCamera")
            .get(HttpCache_1.default.setNoCache, TreeController_1.default.findAreaListWithCamera);
        app.route(TreeRoute.TREE_URL + "/findAreaWithWifi")
            .get(HttpCache_1.default.setNoCache, TreeController_1.default.findAreaListWithWifi);
        app.route(TreeRoute.TREE_URL + "/findAreaWithRmpgate")
            .get(HttpCache_1.default.setNoCache, TreeController_1.default.findAreaListWithRmpgate);
        app.route(TreeRoute.TREE_URL + "/findAreaWithElectronicfence")
            .get(HttpCache_1.default.setNoCache, TreeController_1.default.findAreaListWithElectronicfence);
        app.route(TreeRoute.TREE_URL + "/findAreaWithLamp")
            .get(HttpCache_1.default.setNoCache, TreeController_1.default.findAreaListWithLamp);
        app.route(TreeRoute.TREE_URL + "/findAreaWithBusinessLib")
            .get(HttpCache_1.default.setNoCache, TreeController_1.default.findAreaListWithLamp);
        app.route(TreeRoute.TREE_URL + "/findAreaWithPersion")
            .get(HttpCache_1.default.setNoCache, TreeController_1.default.findAreaListWithPerson);
        app.route(TreeRoute.TREE_URL + "/findAreaWithUser")
            .get(HttpCache_1.default.setNoCache, TreeController_1.default.findAreaListWithUser);
        app.route(TreeRoute.TREE_URL + "/findLampTreeWithCamera")
            .get(HttpCache_1.default.setNoCache, TreeController_1.default.findLampListWithCamera);
        app.route(TreeRoute.TREE_URL + "/findLampTreeWithRmpGate")
            .get(HttpCache_1.default.setNoCache, TreeController_1.default.findLampListWithRmpGate);
        app.route(TreeRoute.TREE_URL + "/findLampTreeWithElectronicfence")
            .get(HttpCache_1.default.setNoCache, TreeController_1.default.findLampListWithAndElectronicfenceTree);
        app.route(TreeRoute.TREE_URL + "/findLampTreeWithWifi")
            .get(HttpCache_1.default.setNoCache, TreeController_1.default.findLampListWithWifiTree);
    }
}
TreeRoute.TREE_URL = Config_1.default.NODE_SERVER_URL + "/tree";
exports.default = TreeRoute;
