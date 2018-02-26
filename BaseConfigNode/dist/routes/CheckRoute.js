"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CheckController_1 = require("../controller/CheckController");
class CheckRoute {
    constructor(app) {
        CheckRoute.activate(app);
    }
    static activate(app) {
        app.route("/BaseConfigNodeServer/db/check/findListByPage")
            .get(CheckController_1.default.findListByPage);
    }
}
exports.default = CheckRoute;
