/**
 * Created by dell on 2017/5/8.
 */
import * as express from "express";
import * as log4js from "log4js";
import {extend} from "../utils/ExtendUtils";
import * as fs from "fs";
import * as path from "path";
import * as Promise from "promise";


export default class SwaggerController {

    private static SWAGGER_CONFIG_PATHS_DIR_URL = path.join(__dirname, "../swagger-ui/config/paths/");
    private static SWAGGER_CONFIG_DEFINITIONS_DIR_URL = path.join(__dirname, "../swagger-ui/config/definitions/");

    private static LOGGER = log4js.getLogger("getSwaggerConfig");

    private static SWAGGER_CONFIG = {};

    public static init = function () {
        SwaggerController.LOGGER.info("正在加载swagger...");
        let arr: [Promise<Array<string>>, Promise<Array<string>>] = [SwaggerController.GetSwaggerConfigPathsFileNames(), SwaggerController.GetSwaggerConfigDefinitionsFileNames()];
        return Promise.all(arr).then((res: [Array<string>, Array<string>])=> {
            let r1 = res[0];
            let r2 = res[1];
            let paths = SwaggerController.getSwaggerPaths(r1);
            let definitions = SwaggerController.getSwaggerDefinitions(r2);
            let defaultSwaggerConfig = SwaggerController._getDefaultWrapSwaggerConfig();
            defaultSwaggerConfig.paths = paths;
            defaultSwaggerConfig.definitions = definitions;
            SwaggerController.SWAGGER_CONFIG = defaultSwaggerConfig;
            //console.log("SwaggerController.SWAGGER_CONFIG", SwaggerController.SWAGGER_CONFIG);
            SwaggerController.LOGGER.info("swagger配置加载完成");
            return null;
        });
    };

    public static getSwaggerConfig(req: express.Request, res: express.Response, next: Function): void {

        new Promise((resolve: any, reject: any)=> {
            resolve(SwaggerController.SWAGGER_CONFIG);
        }).then((data) => {
            res.send(data);
        });
    }

    private static GetSwaggerConfigPathsFileNames():Promise<Array<string>> {
        return new Promise((resolve: any, reject: any)=> {
            fs.readdir(SwaggerController.SWAGGER_CONFIG_PATHS_DIR_URL, (err, files)=> {
                if (err) {
                    SwaggerController.LOGGER.error("GetSwaggerConfigPathsFileNames ERROR:", err);
                    resolve(null);
                } else {
                    let result: Array<string> = [];
                    files.forEach(file => {
                        result.push(SwaggerController.SWAGGER_CONFIG_PATHS_DIR_URL + file);
                    });
                    resolve(result);
                }
            });

        });
    }

    private static GetSwaggerConfigDefinitionsFileNames():Promise<Array<string>> {
        return new Promise((resolve: any, reject: any)=> {
            fs.readdir(SwaggerController.SWAGGER_CONFIG_DEFINITIONS_DIR_URL, (err, files)=> {
                if (err) {
                    SwaggerController.LOGGER.error("GetSwaggerConfigDefinitionsFileNames ERROR:", err);
                    resolve(null);
                } else {
                    let result: Array<string> = [];
                    files.forEach(file => {
                        result.push(SwaggerController.SWAGGER_CONFIG_DEFINITIONS_DIR_URL + file);
                    });
                    resolve(result);
                }
            });
        });
    }

    private static getSwaggerPaths(filePaths: Array<string>) {
        let result = {};
        if (filePaths) {
            filePaths.forEach((path)=> {
                extend(true, result, require(path).default);
            });
        }
        return result;
    }

    private static getSwaggerDefinitions(filePaths: Array<string>) {
        let result = {};
        if (filePaths) {
            filePaths.forEach((path)=> {
                extend(true, result, require(path).default);
            });
        }
        return result;
    }

    private static _getDefaultWrapSwaggerConfig() {
        return {
            "swagger": "2.0",
            "info": {
                "title": "人像基础配置服务 API",
                "description": "人像基础配置服务 API",
                "version": "1.0.0"
            },
            "host": "127.0.0.1:3000",
            "schemes": [
                "http"
            ],
            "basePath": "/BaseConfigNodeServer/db",
            "produces": [
                "application/json"
            ],
            "paths": {},
            "definitions": {}
        };
    }
}