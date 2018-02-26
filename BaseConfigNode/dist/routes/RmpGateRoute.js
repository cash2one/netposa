"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RmpGateController_1 = require("../controller/RmpGateController");
const Config_1 = require("../Config");
class RmpGateRoute {
    constructor(app) {
        RmpGateRoute.activate(app);
    }
    static activate(app) {
        app.route(`${RmpGateRoute.RMPGATE_URL}/findAllList`)
            .get(RmpGateController_1.default.findAllList);
        app.route(`${RmpGateRoute.RMPGATE_URL}/changeAreaId`)
            .post(RmpGateController_1.default.changeAreaId);
        app.route(`${RmpGateRoute.RMPGATE_URL}/changeLampId`)
            .post(RmpGateController_1.default.changeLampId);
        app.route(`${RmpGateRoute.RMPGATE_URL}/edit`)
            .post(RmpGateController_1.default.edit);
    }
}
RmpGateRoute.RMPGATE_URL = Config_1.default.NODE_SERVER_URL + "/rmpgate";
exports.default = RmpGateRoute;
