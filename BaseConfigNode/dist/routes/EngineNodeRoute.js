"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EngineNodeController_1 = require("../controller/EngineNodeController");
class EngineNodeRoute {
    constructor(app) {
        EngineNodeRoute.activate(app);
    }
    static activate(app) {
        app.route("/BaseConfigNodeServer/db/EngineNode/findListByParams")
            .get(EngineNodeController_1.default.findListByParams);
        app.route("/BaseConfigNodeServer/db/EngineNode/findById")
            .get(EngineNodeController_1.default.findById);
        app.route("/BaseConfigNodeServer/db/EngineNode/save")
            .post(EngineNodeController_1.default.save);
        app.route("/BaseConfigNodeServer/db/EngineNode/update")
            .post(EngineNodeController_1.default.update);
        app.route("/BaseConfigNodeServer/db/EngineNode/deleteById")
            .post(EngineNodeController_1.default.deleteById);
        app.route("/BaseConfigNodeServer/db/EngineNode/deleteByIds")
            .post(EngineNodeController_1.default.deleteByIds);
    }
}
exports.default = EngineNodeRoute;
