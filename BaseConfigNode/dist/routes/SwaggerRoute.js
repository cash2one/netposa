"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../Config");
const SwaggerController_1 = require("../controller/SwaggerController");
class SwaggerRoute {
    static activate(app) {
        SwaggerController_1.default.init();
        app.route(SwaggerRoute.SWAGGER_URL + "/getSwaggerConfig")
            .get(SwaggerController_1.default.getSwaggerConfig);
    }
    ;
}
SwaggerRoute.SWAGGER_URL = Config_1.default.NODE_SERVER_URL + "/swagger";
exports.default = SwaggerRoute;
