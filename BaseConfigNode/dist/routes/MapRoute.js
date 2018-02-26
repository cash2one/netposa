"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../Config");
const MapController_1 = require("../controller/MapController");
class MapRoute {
    constructor(app) {
        MapRoute.activate(app);
    }
    static activate(app) {
        app.route(MapRoute.Map_URL + "/saveorupdate")
            .post(MapController_1.default.saveOrUpdate);
        app.route(MapRoute.Map_URL + "/list")
            .get(MapController_1.default.findList);
        app.route(MapRoute.Map_URL + "/getBaseInfo")
            .get(MapController_1.default.getBaseInfo);
        app.route(MapRoute.Map_URL + "/saveOrUpdateBaseInfo")
            .post(MapController_1.default.saveOrUpdateBaseInfo);
    }
}
MapRoute.Map_URL = Config_1.default.NODE_SERVER_URL + "/systempoint";
exports.default = MapRoute;
