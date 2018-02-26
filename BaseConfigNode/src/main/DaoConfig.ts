import * as express from "express";
import * as log4js from "log4js";
import {PathHelper} from "../common/help/PathHelper";
import {BeanHelper} from "../common/help/BeanHelper";
/**
 * Created by dell on 2017/8/1.
 * 批量初始化路由
 */
export class DaoConfig{

    private static LOGGER = log4js.getLogger("DaoConfig");

    private static DAO_FILE_PATHS_DIR_URL = PathHelper.getDirPath(PathHelper.FILE_SEPERATE+"dao"+PathHelper.FILE_SEPERATE);

    constructor(){

    }
    static init(app:express.Express){
        // 初始化路由配置函数
        DaoConfig.LOGGER.info("DaoConfig init start...");
        let daos = PathHelper.getFilesPathSync(DaoConfig.DAO_FILE_PATHS_DIR_URL);

        daos.forEach((path: string)=>{
            let dao = require(path).default;
            // 加载路由配置
            BeanHelper.saveDao(new dao());
        });
        DaoConfig.LOGGER.info("DaoConfig init success!");
    }
}