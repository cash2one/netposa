"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PersonController_1 = require("../controller/PersonController");
class PersonRoute {
    constructor(app) {
        PersonRoute.activate(app);
    }
    static activate(app) {
        app.route("/BaseConfigNodeServer/db/person/findListByParams")
            .get(PersonController_1.default.findListByParams);
        app.route("/BaseConfigNodeServer/db/person/findDetailById")
            .get(PersonController_1.default.findDetailById);
        app.route("/BaseConfigNodeServer/db/person/save")
            .post(PersonController_1.default.save);
        app.route("/BaseConfigNodeServer/db/person/update")
            .post(PersonController_1.default.update);
        app.route("/BaseConfigNodeServer/db/person/deleteById")
            .post(PersonController_1.default.deleteById);
        app.route("/BaseConfigNodeServer/db/person/deleteByIds")
            .post(PersonController_1.default.deleteByIds);
        app.route("/BaseConfigNodeServer/db/person/changeStatusByUserIds")
            .post(PersonController_1.default.changeStatusByUserIds);
    }
}
exports.default = PersonRoute;
