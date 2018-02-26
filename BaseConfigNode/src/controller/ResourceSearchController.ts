import * as express from "express";
import {BackResponseBody} from "../core/params/result/ResponseResult";
import {ResponseResultTool} from "../common/res/ResponseResultTool";
import {IResourceSearchService, ResourceSearchService} from "../service/ResourceSearchService";
import * as util from 'util';
import * as fs from "fs";
import * as log4js from "log4js";

let multiparty = require('multiparty');
/**
 * 资源检索controller.
 * create by zmp.
 * @time: 2017-08-23
 */
export default class ResourceSearchController {

    private static LOGGER = log4js.getLogger("ResourceSearchController");

    private static resourceSearchService: IResourceSearchService = new ResourceSearchService();

    public static resourceSearchTips(req: express.Request, res: express.Response, next: Function): void {
        ResourceSearchController.resourceSearchService.resourceSearchTips(req.query.keyWords).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res));

        function respResolve(resp: BackResponseBody<Array<string>>) {
            ResourceSearchController.LOGGER.debug("return result: " + JSON.stringify(resp));
            res.send(resp);
        }
    }
    public static searchDevice(req: express.Request, res: express.Response, next: Function):void{
        ResourceSearchController.resourceSearchService.searchDevice(req.body).then((resp:BackResponseBody<any>)=>{
            res.send(ResponseResultTool.convert2ResponseResult(resp))
        }).catch(ResponseResultTool.convertError2ResponseResult(res));

    }

    public static quickSearchByKeyWords(req: express.Request, res: express.Response, next: Function): void {
        ResourceSearchController.resourceSearchService.quickSearchByKeyWords(req.body).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res));

        function respResolve(resp: BackResponseBody<any>) {
            ResourceSearchController.LOGGER.debug("return result: " + JSON.stringify(resp));
            res.send(resp);
        }
    }

    public static checkFace(req: express.Request, res: express.Response, next: Function): void {
        let form = new multiparty.Form({uploadDir: ""}),
            imagePath = "",
            commandType = "",
            detectType = "";
        form.parse(req, function (err: any, fields: any, files: any) {
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
                ResourceSearchController.resourceSearchService.checkFace({image: chunk}, commandType, detectType).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res));
            })

        });

        function respResolve(resp: BackResponseBody<any>) {
            fs.unlink(imagePath, function (err) {
                if (!util.isNullOrUndefined(err)) {
                    console.info("delet temp image :" + imagePath + ", error is: " + err);
                } else {
                    console.info("delet temp image :" + imagePath);
                }
            });
            ResourceSearchController.LOGGER.debug("return result: " + JSON.stringify(resp));
            res.send(resp);
        }
    }

    public static checkCar(req: express.Request, res: express.Response, next: Function): void {
        let form = new multiparty.Form({uploadDir: ""}),
            imagePath = "";
        form.parse(req, function (err: any, fields: any, files: any) {
            imagePath = files.image[0].path;
            fs.readFile(files.image[0].path, "base64", function (err, chunk) {
                ResourceSearchController.resourceSearchService.checkCar({image: chunk}).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res));
            })

        });

        function respResolve(resp: BackResponseBody<any>) {
            fs.unlink(imagePath, function (err) {
                if (!util.isNullOrUndefined(err)) {
                    console.info("delet temp image :" + imagePath + ", error is: " + err);
                } else {
                    console.info("delet temp image :" + imagePath);
                }
            });
            ResourceSearchController.LOGGER.debug("return result: " + JSON.stringify(resp));
            res.send(resp);
        }
    }

    public static detectFace(req: express.Request, res: express.Response, next: Function): void {
        ResourceSearchController.resourceSearchService.detectFace(req.body).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res));

        function respResolve(resp: BackResponseBody<any>) {
            ResourceSearchController.LOGGER.debug("return result: " + JSON.stringify(resp));
            res.send(resp);
        }
    }

    public static searchFace(req: express.Request, res: express.Response, next: Function): void {
        ResourceSearchController.resourceSearchService.searchFace(req.body).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res));

        function respResolve(resp: BackResponseBody<any>) {
            ResourceSearchController.LOGGER.debug("return result: " + JSON.stringify(resp));
            res.send(resp);
        }
    }

    public static searchCar(req: express.Request, res: express.Response, next: Function): void {
        ResourceSearchController.resourceSearchService.searchCar(req.body).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res));

        function respResolve(resp: BackResponseBody<any>) {
            ResourceSearchController.LOGGER.debug("return result: " + JSON.stringify(resp));
            res.send(resp);
        }
    }

    public static advancedSearchCar(req: express.Request, res: express.Response, next: Function): void {
        ResourceSearchController.resourceSearchService.advancedSearchCar(req.body).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res));

        function respResolve(resp: BackResponseBody<any>) {
            ResourceSearchController.LOGGER.debug("return result: " + JSON.stringify(resp));
            res.send(resp);
        }
    }

    public static searchWiFiByParams(req: express.Request, res: express.Response, next: Function): void {
        ResourceSearchController.resourceSearchService.searchWiFiByParams(req.body).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res));

        function respResolve(resp: BackResponseBody<any>) {
            ResourceSearchController.LOGGER.debug("return result: " + JSON.stringify(resp));
            res.send(resp);
        }
    }

    public static searchEFenceByParams(req: express.Request, res: express.Response, next: Function): void {
        ResourceSearchController.resourceSearchService.searchEFenceByParams(req.body).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res));

        function respResolve(resp: BackResponseBody<any>) {
            ResourceSearchController.LOGGER.debug("return result: " + JSON.stringify(resp));
            res.send(resp);
        }
    }
}