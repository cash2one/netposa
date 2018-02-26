"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
const ResourceSearchService_1 = require("../service/ResourceSearchService");
const util = require("util");
const fs = require("fs");
const log4js = require("log4js");
let multiparty = require('multiparty');
class ResourceSearchController {
    static resourceSearchTips(req, res, next) {
        ResourceSearchController.resourceSearchService.resourceSearchTips(req.query.keyWords).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function respResolve(resp) {
            ResourceSearchController.LOGGER.debug("return result: " + JSON.stringify(resp));
            res.send(resp);
        }
    }
    static searchDevice(req, res, next) {
        ResourceSearchController.resourceSearchService.searchDevice(req.body).then((resp) => {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
    static quickSearchByKeyWords(req, res, next) {
        ResourceSearchController.resourceSearchService.quickSearchByKeyWords(req.body).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function respResolve(resp) {
            ResourceSearchController.LOGGER.debug("return result: " + JSON.stringify(resp));
            res.send(resp);
        }
    }
    static checkFace(req, res, next) {
        let form = new multiparty.Form({ uploadDir: "" }), imagePath = "", commandType = "", detectType = "";
        form.parse(req, function (err, fields, files) {
            imagePath = files.image[0].path;
            fs.readFile(files.image[0].path, "base64", function (err, chunk) {
                Object.keys(fields).forEach(function (key) {
                    if (key == "commandType") {
                        commandType = fields[key][0];
                    }
                    if (key == "detectType") {
                        detectType = fields[key][0];
                    }
                });
                ResourceSearchController.resourceSearchService.checkFace({ image: chunk }, commandType, detectType).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
            });
        });
        function respResolve(resp) {
            fs.unlink(imagePath, function (err) {
                if (!util.isNullOrUndefined(err)) {
                    console.info("delet temp image :" + imagePath + ", error is: " + err);
                }
                else {
                    console.info("delet temp image :" + imagePath);
                }
            });
            ResourceSearchController.LOGGER.debug("return result: " + JSON.stringify(resp));
            res.send(resp);
        }
    }
    static checkCar(req, res, next) {
        let form = new multiparty.Form({ uploadDir: "" }), imagePath = "";
        form.parse(req, function (err, fields, files) {
            imagePath = files.image[0].path;
            fs.readFile(files.image[0].path, "base64", function (err, chunk) {
                ResourceSearchController.resourceSearchService.checkCar({ image: chunk }).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
            });
        });
        function respResolve(resp) {
            fs.unlink(imagePath, function (err) {
                if (!util.isNullOrUndefined(err)) {
                    console.info("delet temp image :" + imagePath + ", error is: " + err);
                }
                else {
                    console.info("delet temp image :" + imagePath);
                }
            });
            ResourceSearchController.LOGGER.debug("return result: " + JSON.stringify(resp));
            res.send(resp);
        }
    }
    static detectFace(req, res, next) {
        ResourceSearchController.resourceSearchService.detectFace(req.body).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function respResolve(resp) {
            ResourceSearchController.LOGGER.debug("return result: " + JSON.stringify(resp));
            res.send(resp);
        }
    }
    static searchFace(req, res, next) {
        ResourceSearchController.resourceSearchService.searchFace(req.body).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function respResolve(resp) {
            ResourceSearchController.LOGGER.debug("return result: " + JSON.stringify(resp));
            res.send(resp);
        }
    }
    static searchCar(req, res, next) {
        ResourceSearchController.resourceSearchService.searchCar(req.body).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function respResolve(resp) {
            ResourceSearchController.LOGGER.debug("return result: " + JSON.stringify(resp));
            res.send(resp);
        }
    }
    static advancedSearchCar(req, res, next) {
        ResourceSearchController.resourceSearchService.advancedSearchCar(req.body).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function respResolve(resp) {
            ResourceSearchController.LOGGER.debug("return result: " + JSON.stringify(resp));
            res.send(resp);
        }
    }
    static searchWiFiByParams(req, res, next) {
        ResourceSearchController.resourceSearchService.searchWiFiByParams(req.body).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function respResolve(resp) {
            ResourceSearchController.LOGGER.debug("return result: " + JSON.stringify(resp));
            res.send(resp);
        }
    }
    static searchEFenceByParams(req, res, next) {
        ResourceSearchController.resourceSearchService.searchEFenceByParams(req.body).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function respResolve(resp) {
            ResourceSearchController.LOGGER.debug("return result: " + JSON.stringify(resp));
            res.send(resp);
        }
    }
}
ResourceSearchController.LOGGER = log4js.getLogger("ResourceSearchController");
ResourceSearchController.resourceSearchService = new ResourceSearchService_1.ResourceSearchService();
exports.default = ResourceSearchController;
