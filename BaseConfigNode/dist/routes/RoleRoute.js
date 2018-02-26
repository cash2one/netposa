"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../Config");
const RoleController_1 = require("../controller/RoleController");
class RoleRoute {
    constructor(app) {
        RoleRoute.activate(app);
    }
    static activate(app) {
        app.route(RoleRoute.ROLE_ROUTE + "/list")
            .get(RoleController_1.default.list);
        app.route(RoleRoute.ROLE_ROUTE + "/detail")
            .get(RoleController_1.default.detail);
        app.route(RoleRoute.ROLE_ROUTE + "/save")
            .post(RoleController_1.default.save);
        app.route(RoleRoute.ROLE_ROUTE + "/update")
            .post(RoleController_1.default.update);
        app.route(RoleRoute.ROLE_ROUTE + "/template")
            .get(RoleController_1.default.getTemplate);
        app.route(RoleRoute.ROLE_ROUTE + "/delete")
            .post(RoleController_1.default.deleteRoleById);
    }
}
RoleRoute.ROLE_ROUTE = Config_1.default.NODE_SERVER_URL + "/role";
exports.default = RoleRoute;
