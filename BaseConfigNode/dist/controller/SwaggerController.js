"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
const ExtendUtils_1 = require("../utils/ExtendUtils");
const fs = require("fs");
const path = require("path");
const Promise = require("promise");
class SwaggerController {
    static getSwaggerConfig(req, res, next) {
        new Promise((resolve, reject) => {
            resolve(SwaggerController.SWAGGER_CONFIG);
        }).then((data) => {
            res.send(data);
        });
    }
    static GetSwaggerConfigPathsFileNames() {
        return new Promise((resolve, reject) => {
            fs.readdir(SwaggerController.SWAGGER_CONFIG_PATHS_DIR_URL, (err, files) => {
                if (err) {
                    SwaggerController.LOGGER.error("GetSwaggerConfigPathsFileNames ERROR:", err);
                    resolve(null);
                }
                else {
                    let result = [];
                    files.forEach(file => {
                        result.push(SwaggerController.SWAGGER_CONFIG_PATHS_DIR_URL + file);
                    });
                    resolve(result);
                }
            });
        });
    }
    static GetSwaggerConfigDefinitionsFileNames() {
        return new Promise((resolve, reject) => {
            fs.readdir(SwaggerController.SWAGGER_CONFIG_DEFINITIONS_DIR_URL, (err, files) => {
                if (err) {
                    SwaggerController.LOGGER.error("GetSwaggerConfigDefinitionsFileNames ERROR:", err);
                    resolve(null);
                }
                else {
                    let result = [];
                    files.forEach(file => {
                        result.push(SwaggerController.SWAGGER_CONFIG_DEFINITIONS_DIR_URL + file);
                    });
                    resolve(result);
                }
            });
        });
    }
    static getSwaggerPaths(filePaths) {
        let result = {};
        if (filePaths) {
            filePaths.forEach((path) => {
                ExtendUtils_1.extend(true, result, require(path).default);
            });
        }
        return result;
    }
    static getSwaggerDefinitions(filePaths) {
        let result = {};
        if (filePaths) {
            filePaths.forEach((path) => {
                ExtendUtils_1.extend(true, result, require(path).default);
            });
        }
        return result;
    }
    static _getDefaultWrapSwaggerConfig() {
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
SwaggerController.SWAGGER_CONFIG_PATHS_DIR_URL = path.join(__dirname, "../swagger-ui/config/paths/");
SwaggerController.SWAGGER_CONFIG_DEFINITIONS_DIR_URL = path.join(__dirname, "../swagger-ui/config/definitions/");
SwaggerController.LOGGER = log4js.getLogger("getSwaggerConfig");
SwaggerController.SWAGGER_CONFIG = {};
SwaggerController.init = function () {
    SwaggerController.LOGGER.info("正在加载swagger...");
    let arr = [SwaggerController.GetSwaggerConfigPathsFileNames(), SwaggerController.GetSwaggerConfigDefinitionsFileNames()];
    return Promise.all(arr).then((res) => {
        let r1 = res[0];
        let r2 = res[1];
        let paths = SwaggerController.getSwaggerPaths(r1);
        let definitions = SwaggerController.getSwaggerDefinitions(r2);
        let defaultSwaggerConfig = SwaggerController._getDefaultWrapSwaggerConfig();
        defaultSwaggerConfig.paths = paths;
        defaultSwaggerConfig.definitions = definitions;
        SwaggerController.SWAGGER_CONFIG = defaultSwaggerConfig;
        SwaggerController.LOGGER.info("swagger配置加载完成");
        return null;
    });
};
exports.default = SwaggerController;
