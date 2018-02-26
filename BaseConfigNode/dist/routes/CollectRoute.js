"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CollectController_1 = require("../controller/CollectController");
class CollectRoute {
    constructor(app) {
        CollectRoute.activate(app);
    }
    static activate(app) {
        app.route("/BaseConfigNodeServer/db/collect/findListByPage")
            .post(CollectController_1.default.findListByPage);
        app.route("/BaseConfigNodeServer/db/collect/delete")
            .post(CollectController_1.default.delete);
        app.route("/BaseConfigNodeServer/db/collect/findCollectStatus")
            .post(CollectController_1.default.findCollectStatus);
        app.route("/BaseConfigNodeServer/db/collect/deleteByObjectId")
            .post(CollectController_1.default.deleteByObjectId);
        app.route("/BaseConfigNodeServer/db/collect/add")
            .post(CollectController_1.default.add);
    }
}
exports.default = CollectRoute;
