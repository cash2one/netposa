"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResourceController_1 = require("../controller/ResourceController");
const Config_1 = require("../Config");
class ResourceRoute {
    constructor(app) {
        ResourceRoute.activate(app);
    }
    static activate(app) {
        app.route(ResourceRoute.Resource_URL + "/getresourceNumByType")
            .post(ResourceController_1.default.getresourceNumByType);
        app.route(ResourceRoute.Resource_URL + "/getTotalDevice")
            .post(ResourceController_1.default.getTotalDevice);
        app.route(ResourceRoute.Resource_URL + "/getDeviceById")
            .post(ResourceController_1.default.getDeviceById);
        app.route(ResourceRoute.Resource_URL + "/getReourceData")
            .post(ResourceController_1.default.getReourceData);
    }
}
ResourceRoute.Resource_URL = Config_1.default.NODE_SERVER_URL + "/resource";
exports.default = ResourceRoute;
