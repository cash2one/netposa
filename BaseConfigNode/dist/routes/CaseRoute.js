"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CaseController_1 = require("../controller/CaseController");
class CameraRoute {
    constructor(app) {
        CameraRoute.activate(app);
    }
    static activate(app) {
        app.route("/BaseConfigNodeServer/db/baseconfig/findCascadeList")
            .post(CaseController_1.default.findCascadeList);
    }
}
exports.default = CameraRoute;
