"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
const UploadService_1 = require("../service/UploadService");
const util = require("util");
const fs = require("fs");
const log4js = require("log4js");
var multiparty = require('multiparty');
class UploadController {
    static imageUpload(req, res, next) {
        var form = new multiparty.Form({ uploadDir: "" }), imagePath = "";
        form.parse(req, function (err, fields, files) {
            if (files && util.isArray(files.image) && files.image[0]) {
                imagePath = files.image[0].path;
                fs.readFile(files.image[0].path, "base64", function (err, chunk) {
                    UploadController.uploadService.imageUpload({ image: chunk }, fields).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
                });
            }
            else {
                UploadController.uploadService.imageUpload({}, fields).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
            }
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
            UploadController.LOGGER.debug("return result: " + JSON.stringify(resp));
            res.send(resp);
        }
    }
    static faceImageUpload(req, res, next) {
        var form = new multiparty.Form({ uploadDir: "" }), imagePath = "";
        form.parse(req, function (err, fields, files) {
            if (files && util.isArray(files.image) && files.image[0]) {
                imagePath = files.image[0].path;
                fs.readFile(files.image[0].path, "base64", function (err, chunk) {
                    UploadController.uploadService.faceImageUpload({ image: chunk }, fields).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
                });
            }
            else {
                UploadController.uploadService.faceImageUpload({}, fields).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
            }
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
            UploadController.LOGGER.debug("return result: " + JSON.stringify(resp));
            res.send(resp);
        }
    }
}
UploadController.LOGGER = log4js.getLogger("UploadController");
UploadController.uploadService = new UploadService_1.UploadService();
exports.default = UploadController;
