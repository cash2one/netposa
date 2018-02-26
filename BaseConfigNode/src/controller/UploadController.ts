import * as express from "express";
import bodyParser = require("body-parser");
import {ResponseResult, BackResponseBody, PageResult} from "../core/params/result/ResponseResult";
import {ResponseResultTool} from "../common/res/ResponseResultTool";
import {IUploadService, UploadService} from "../service/UploadService";
import ErrorCode from "../common/res/ErrorCode";
import * as util from 'util';  
import * as fs from "fs";
import * as log4js from "log4js";
var multiparty = require('multiparty');


/**
 * 附件上传controller.
 * create by zmp.
 * @time: 2017-08-28
 */
export default class UploadController {
       
    private static LOGGER = log4js.getLogger("UploadController");
    
    private static uploadService: IUploadService = new UploadService();

    public static imageUpload(req: express.Request, res: express.Response, next: Function): void {
        var form = new multiparty.Form({uploadDir: ""}),
            imagePath = "";
        form.parse(req,function(err :any, fields :Array<object>, files :any) {
            if(files && util.isArray(files.image) && files.image[0]) {
                imagePath = files.image[0].path;
                fs.readFile(files.image[0].path, "base64", function(err,chunk) {
                    UploadController.uploadService.imageUpload({image: chunk}, fields).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res));
                })
            } else {
                UploadController.uploadService.imageUpload({}, fields).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res));
            }
        }); 
        
        function  respResolve(resp: BackResponseBody<string>) {
            fs.unlink(imagePath, function(err) {
                if(!util.isNullOrUndefined(err)) {
                    console.info("delet temp image :" + imagePath + ", error is: " + err);
                } else {
                    console.info("delet temp image :" + imagePath);
                }
            });
            UploadController.LOGGER.debug("return result: " + JSON.stringify(resp));
            res.send(resp);
        }
    }
    
    public static faceImageUpload(req: express.Request, res: express.Response, next: Function): void {
        var form = new multiparty.Form({uploadDir: ""}),
            imagePath = "";
        form.parse(req,function(err :any, fields :Array<object>, files :any) {
            if(files && util.isArray(files.image) && files.image[0]) {
                imagePath = files.image[0].path;
                fs.readFile(files.image[0].path, "base64", function(err,chunk) {
                    UploadController.uploadService.faceImageUpload({image: chunk}, fields).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res));
                })
            } else {
                UploadController.uploadService.faceImageUpload({}, fields).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res));
            }
        }); 
        
        function  respResolve(resp: BackResponseBody<string>) {
            fs.unlink(imagePath, function(err) {
                if(!util.isNullOrUndefined(err)) {
                    console.info("delet temp image :" + imagePath + ", error is: " + err);
                } else {
                    console.info("delet temp image :" + imagePath);
                }
            });
            UploadController.LOGGER.debug("return result: " + JSON.stringify(resp));
            res.send(resp);
        }
    }
}