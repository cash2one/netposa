"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const Promise = require("promise");
const fs = require("fs");
const log4js = require("log4js");
const util = require("util");
class PathHelper {
    static getDirPath(relativeDirPath) {
        return path.join(PathHelper.PROJECT_PATH, relativeDirPath);
    }
    static getFilesPathSync(absoluteDirPath) {
        let result = [];
        try {
            fs.accessSync(absoluteDirPath);
            let filePaths = fs.readdirSync(absoluteDirPath) || [];
            filePaths.forEach((path) => {
                let stats = fs.lstatSync(absoluteDirPath + path);
                if (stats.isFile()) {
                    result.push(absoluteDirPath + path);
                }
            });
        }
        catch (err) {
            PathHelper.LOGGER.error(util.format("PathHelper.getFilesPath Error %s %s", err && err.message, err && err.stack));
        }
        return result;
    }
    static getFilesPath(absoluteDirPath) {
        return Promise.resolve(null)
            .then(() => {
            fs.accessSync(absoluteDirPath);
            return null;
        })
            .then(() => {
            let filePaths = fs.readdirSync(absoluteDirPath) || [];
            let result = [];
            filePaths.forEach((path) => {
                let stats = fs.lstatSync(absoluteDirPath + path);
                if (stats.isFile()) {
                    result.push(absoluteDirPath + path);
                }
            });
            return result;
        })
            .catch((err) => {
            PathHelper.LOGGER.error(util.format("PathHelper.getFilesPath Error %s %s", err && err.message, err && err.stack));
            return Promise.resolve([]);
        });
    }
}
PathHelper.LOGGER = log4js.getLogger("PathHelper");
PathHelper.FILE_SEPERATE = path.sep;
PathHelper.PROJECT_PATH = path.join(__dirname, ".." + PathHelper.FILE_SEPERATE + ".." + PathHelper.FILE_SEPERATE);
exports.PathHelper = PathHelper;
