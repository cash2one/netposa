"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WifiController_1 = require("../controller/WifiController");
const Config_1 = require("../Config");
class WifiRoute {
    constructor(app) {
        WifiRoute.activate(app);
    }
    static activate(app) {
        app.route(`${WifiRoute.WIFI_URL}/findAllList`)
            .get(WifiController_1.default.findAllList);
        app.route(`${WifiRoute.WIFI_URL}/changeAreaId`)
            .post(WifiController_1.default.changeAreaId);
        app.route(`${WifiRoute.WIFI_URL}/changeLampId`)
            .post(WifiController_1.default.changeLampId);
        app.route(`${WifiRoute.WIFI_URL}/edit`)
            .post(WifiController_1.default.edit);
    }
}
WifiRoute.WIFI_URL = Config_1.default.NODE_SERVER_URL + "/wifi";
exports.default = WifiRoute;
