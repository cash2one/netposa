"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LayerController_1 = require("../controller/LayerController");
class LayerRoute {
    constructor(app) {
        LayerRoute.activate(app);
    }
    static activate(app) {
        app.route("/BaseConfigNodeServer/db/layer/findAllList")
            .get(LayerController_1.default.findAllList);
        app.route("/BaseConfigNodeServer/db/layer/delete")
            .post(LayerController_1.default.delete);
        app.route("/BaseConfigNodeServer/db/layer/add")
            .post(LayerController_1.default.add);
        app.route("/BaseConfigNodeServer/db/layer/edit")
            .post(LayerController_1.default.edit);
    }
}
exports.default = LayerRoute;
