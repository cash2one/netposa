"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SystemLogController_1 = require("../controller/SystemLogController");
const Config_1 = require("../Config");
class SystemLogRoute {
    constructor(app) {
        SystemLogRoute.activate(app);
    }
    static activate(app) {
        app.route(SystemLogRoute.SYSTEM_LOG_URL + "/save")
            .post(SystemLogController_1.default.SaveSystemLog);
    }
}
SystemLogRoute.SYSTEM_LOG_URL = Config_1.default.NODE_SERVER_URL + "/systemlog";
exports.default = SystemLogRoute;
