"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("../controller/UserController");
class UserRoute {
    constructor(app) {
        UserRoute.activate(app);
    }
    static activate(app) {
        app.route("/BaseConfigNodeServer/db/findUserByUidWithPwd")
            .get(UserController_1.default.findUserByUidWithPwd);
        app.route("/BaseConfigNodeServer/db/user/findListByParams")
            .get(UserController_1.default.findListByParams);
    }
}
exports.default = UserRoute;
