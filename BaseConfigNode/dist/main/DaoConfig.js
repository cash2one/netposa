"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
const PathHelper_1 = require("../common/help/PathHelper");
const BeanHelper_1 = require("../common/help/BeanHelper");
class DaoConfig {
    constructor() {
    }
    static init(app) {
        DaoConfig.LOGGER.info("DaoConfig init start...");
        let daos = PathHelper_1.PathHelper.getFilesPathSync(DaoConfig.DAO_FILE_PATHS_DIR_URL);
        daos.forEach((path) => {
            let dao = require(path).default;
            BeanHelper_1.BeanHelper.saveDao(new dao());
        });
        DaoConfig.LOGGER.info("DaoConfig init success!");
    }
}
DaoConfig.LOGGER = log4js.getLogger("DaoConfig");
DaoConfig.DAO_FILE_PATHS_DIR_URL = PathHelper_1.PathHelper.getDirPath(PathHelper_1.PathHelper.FILE_SEPERATE + "dao" + PathHelper_1.PathHelper.FILE_SEPERATE);
exports.DaoConfig = DaoConfig;
