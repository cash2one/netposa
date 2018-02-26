"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EngineServerController_1 = require("../controller/EngineServerController");
class EngineServerRoute {
    constructor(app) {
        EngineServerRoute.activate(app);
    }
    static activate(app) {
        app.route("/BaseConfigNodeServer/db/EngineServer/findAll")
            .get(EngineServerController_1.default.findAll);
        app.route("/BaseConfigNodeServer/db/EngineServer/findById")
            .get(EngineServerController_1.default.findById);
        app.route("/BaseConfigNodeServer/db/EngineServer/save")
            .post(EngineServerController_1.default.save);
        app.route("/BaseConfigNodeServer/db/EngineServer/update")
            .post(EngineServerController_1.default.update);
        app.route("/BaseConfigNodeServer/db/EngineServer/deleteById")
            .post(EngineServerController_1.default.deleteById);
    }
}
exports.default = EngineServerRoute;
