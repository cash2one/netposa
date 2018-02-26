"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IvsServerController_1 = require("../controller/IvsServerController");
class IvsServerRoute {
    constructor(app) {
        IvsServerRoute.activate(app);
    }
    static activate(app) {
        app.route("/BaseConfigNodeServer/db/IvsServer/findById")
            .get(IvsServerController_1.default.findById);
        app.route("/BaseConfigNodeServer/db/IvsServer/findListByParams")
            .get(IvsServerController_1.default.findListByParams);
        app.route("/BaseConfigNodeServer/db/IvsServer/save")
            .post(IvsServerController_1.default.save);
        app.route("/BaseConfigNodeServer/db/IvsServer/update")
            .post(IvsServerController_1.default.update);
        app.route("/BaseConfigNodeServer/db/IvsServer/deleteById")
            .post(IvsServerController_1.default.deleteById);
        app.route("/BaseConfigNodeServer/db/IvsServer/deleteByIds")
            .post(IvsServerController_1.default.deleteByIds);
    }
}
exports.default = IvsServerRoute;
