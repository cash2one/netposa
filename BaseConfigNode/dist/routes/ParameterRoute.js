"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ParameterController_1 = require("../controller/ParameterController");
class ParameterRoute {
    constructor(app) {
        ParameterRoute.activate(app);
    }
    static activate(app) {
        app.route("/BaseConfigNodeServer/db/param/findAllList")
            .get(ParameterController_1.default.findAllList);
        app.route("/BaseConfigNodeServer/db/param/save")
            .post(ParameterController_1.default.save);
        app.route("/BaseConfigNodeServer/db/param/findMapConfig")
            .get(ParameterController_1.default.findMapConfigByParamClass);
        app.route("/BaseConfigNodeServer/db/param/editMapConfig")
            .post(ParameterController_1.default.editMapConfigParam);
        app.route("/BaseConfigNodeServer/db/param/findSystemConfig")
            .get(ParameterController_1.default.findSystemConfig);
        app.route("/BaseConfigNodeServer/db/param/editSystemConfig")
            .post(ParameterController_1.default.editSystemConfigParam);
    }
}
exports.default = ParameterRoute;
