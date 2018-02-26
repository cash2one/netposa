"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProxyServerController_1 = require("../controller/ProxyServerController");
class ProxyServerRoute {
    constructor(app) {
        ProxyServerRoute.activate(app);
    }
    static activate(app) {
        app.route("/BaseConfigNodeServer/db/ProxyServer/findById")
            .get(ProxyServerController_1.default.findById);
        app.route("/BaseConfigNodeServer/db/ProxyServer/findAll")
            .get(ProxyServerController_1.default.findAll);
        app.route("/BaseConfigNodeServer/db/ProxyServer/findListByParams")
            .get(ProxyServerController_1.default.findListByParams);
        app.route("/BaseConfigNodeServer/db/ProxyServer/save")
            .post(ProxyServerController_1.default.save);
        app.route("/BaseConfigNodeServer/db/ProxyServer/update")
            .post(ProxyServerController_1.default.update);
        app.route("/BaseConfigNodeServer/db/ProxyServer/deleteById")
            .post(ProxyServerController_1.default.deleteById);
        app.route("/BaseConfigNodeServer/db/ProxyServer/deleteByIds")
            .post(ProxyServerController_1.default.deleteByIds);
    }
}
exports.default = ProxyServerRoute;
