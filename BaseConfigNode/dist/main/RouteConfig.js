"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
const PathHelper_1 = require("../common/help/PathHelper");
class RouteConfig {
    constructor() {
    }
    static init(app) {
        RouteConfig.LOGGER.info("RouteConfig init start...");
        let routes = PathHelper_1.PathHelper.getFilesPathSync(RouteConfig.ROUTE_FILE_PATHS_DIR_URL);
        routes.forEach((path) => {
            let route = require(path).default;
            new route(app);
        });
        RouteConfig.LOGGER.info("RouteConfig init success!");
    }
}
RouteConfig.LOGGER = log4js.getLogger("RouteConfig");
RouteConfig.ROUTE_FILE_PATHS_DIR_URL = PathHelper_1.PathHelper.getDirPath(PathHelper_1.PathHelper.FILE_SEPERATE + "routes" + PathHelper_1.PathHelper.FILE_SEPERATE);
exports.RouteConfig = RouteConfig;
