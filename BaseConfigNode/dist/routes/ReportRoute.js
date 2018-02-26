"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReportController_1 = require("../controller/ReportController");
class ReportRoute {
    constructor(app) {
        ReportRoute.activate(app);
    }
    static activate(app) {
        app.route("/BaseConfigNodeServer/db/report/findListByPage")
            .get(ReportController_1.default.findListByPage);
        app.route("/BaseConfigNodeServer/db/report/delete")
            .post(ReportController_1.default.delete);
    }
}
exports.default = ReportRoute;
