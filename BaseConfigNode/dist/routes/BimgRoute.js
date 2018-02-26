"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BimgAuthController_1 = require("../controller/BimgAuthController");
class BimgRoute {
    constructor(app) {
        BimgRoute.activate(app);
    }
    static activate(app) {
        app.route("/bimg/**")
            .get(BimgAuthController_1.default.authBimg, BimgAuthController_1.default.requestBimg);
    }
}
exports.default = BimgRoute;
