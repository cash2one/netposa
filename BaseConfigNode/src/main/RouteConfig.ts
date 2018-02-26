import * as express from "express";
import * as log4js from "log4js";
import {PathHelper} from "../common/help/PathHelper";

/**
 * Created by dell on 2017/8/1.
 * 批量初始化路由
 */
export class RouteConfig {

    private static LOGGER = log4js.getLogger("RouteConfig");

    private static ROUTE_FILE_PATHS_DIR_URL = PathHelper.getDirPath(PathHelper.FILE_SEPERATE + "routes" + PathHelper.FILE_SEPERATE);

    constructor() {

    }

    static init(app: express.Express) {
        // 初始化路由配置函数
        RouteConfig.LOGGER.info("RouteConfig init start...");
        let routes = PathHelper.getFilesPathSync(RouteConfig.ROUTE_FILE_PATHS_DIR_URL);

        routes.forEach((path: string) => {
            let route = require(path).default;
            // 加载路由配置
            new route(app);
        });

        RouteConfig.LOGGER.info("RouteConfig init success!");
    }
}