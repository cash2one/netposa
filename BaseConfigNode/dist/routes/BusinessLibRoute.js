"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BusinessLibController_1 = require("../controller/BusinessLibController");
class BusinessLibRoute {
    constructor(app) {
        BusinessLibRoute.activate(app);
    }
    static activate(app) {
        app.route("/BaseConfigNodeServer/db/businessLib/findById")
            .get(BusinessLibController_1.default.findById);
        app.route("/BaseConfigNodeServer/db/businessLib/findTreeWithArea")
            .get(BusinessLibController_1.default.findTreeWithArea);
        app.route("/BaseConfigNodeServer/db/businessLib/findHasSelfTreeWithArea")
            .get(BusinessLibController_1.default.findHasSelfTreeWithArea);
        app.route("/BaseConfigNodeServer/db/businessLib/findTree")
            .get(BusinessLibController_1.default.findTree);
        app.route("/BaseConfigNodeServer/db/businessLib/findBusinessLibHasSelfTree")
            .get(BusinessLibController_1.default.findBusinessLibHasSelfTree);
        app.route("/BaseConfigNodeServer/db/businessLib/person/save")
            .post(BusinessLibController_1.default.save);
        app.route("/BaseConfigNodeServer/db/businessLib/person/update")
            .post(BusinessLibController_1.default.update);
        app.route("/BaseConfigNodeServer/db/businessLib/deleteByIds")
            .post(BusinessLibController_1.default.deleteByIds);
        app.route("/BaseConfigNodeServer/db/businessLib/deleteById")
            .post(BusinessLibController_1.default.deleteById);
        app.route("/BaseConfigNodeServer/db/businessLib/findTreeAreaWithRole")
            .post(BusinessLibController_1.default.findTreeAreaWithRole);
    }
}
exports.default = BusinessLibRoute;
