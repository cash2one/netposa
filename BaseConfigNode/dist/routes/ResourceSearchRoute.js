"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResourceSearchController_1 = require("../controller/ResourceSearchController");
class ResourceSearchRoute {
    constructor(app) {
        ResourceSearchRoute.activate(app);
    }
    static activate(app) {
        app.route("/BaseConfigNodeServer/db/resourceSearch/tips")
            .get(ResourceSearchController_1.default.resourceSearchTips);
        app.route("/BaseConfigNodeServer/db/resourceSearch/quickSearchByKeyWords")
            .post(ResourceSearchController_1.default.quickSearchByKeyWords);
        app.route("/BaseConfigNodeServer/db/resourceSearch/checkFace")
            .post(ResourceSearchController_1.default.checkFace);
        app.route("/BaseConfigNodeServer/db/resourceSearch/checkCar")
            .post(ResourceSearchController_1.default.checkCar);
        app.route("/BaseConfigNodeServer/db/resourceSearch/detectFace")
            .post(ResourceSearchController_1.default.detectFace);
        app.route("/BaseConfigNodeServer/db/resourceSearch/searchFace")
            .post(ResourceSearchController_1.default.searchFace);
        app.route("/BaseConfigNodeServer/db/resourceSearch/searchCar")
            .post(ResourceSearchController_1.default.searchCar);
        app.route("/BaseConfigNodeServer/db/resourceSearch/advancedSearchCar")
            .post(ResourceSearchController_1.default.advancedSearchCar);
        app.route("/BaseConfigNodeServer/db/resourceSearch/searchWiFiByParams")
            .post(ResourceSearchController_1.default.searchWiFiByParams);
        app.route("/BaseConfigNodeServer/db/resourceSearch/searchEFenceByParams")
            .post(ResourceSearchController_1.default.searchEFenceByParams);
        app.route("/BaseConfigNodeServer/db/resourceSearch/searchDevice")
            .post(ResourceSearchController_1.default.searchDevice);
    }
}
exports.default = ResourceSearchRoute;
