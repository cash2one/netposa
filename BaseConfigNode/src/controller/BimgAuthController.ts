
import * as express from "express";
import * as log4js from "log4js";
import BimgAuthService from "../service/BimgAuthService";


export default class BimgAuthController {

    private static LOGGER = log4js.getLogger("BimgAuthController");

    /**
     * 验证图片服务器请求
     * @param req Request
     * @param res Response
     * @param next Function
     */
    public static authBimg(req: express.Request, res: express.Response, next: Function): void {
        if (req.query.username == undefined || req.query.authKey == undefined) {
            res.sendStatus(403);
        } else {
            BimgAuthService.isAuthorized(req.query.username, req.query.authKey).then(complete).catch(_catch);
        }

        function complete(data: boolean) {
            if (data) {
                next();
            } else {
                res.sendStatus(403);
            }
        }

        function _catch(err: any) {
            BimgAuthController.LOGGER.error("图片权限验证请求错误！", err);
            res.sendStatus(500);
        }
    }

    /**
     * 请求图片服务器
     * @param req Request
     * @param res Response
     * @param next Function
     */
    public static requestBimg(req: express.Request, res: express.Response, next: Function) {
        let fileName = req.url.substring(6, req.url.indexOf("?"))
        BimgAuthController.LOGGER.info("bimg file name is : %s", fileName);

        let bimgUrl = /* "http://" + Config.BIMG_HTTP_HOST + "/DownLoadFile?filename=" + fileName */"";

        

        BimgAuthService.requestBimg(bimgUrl).then(complete).catch(_catch);

        function complete(data: any) {
            res.set('Content-Type', data.headers['content-type']);
            res.send(data.body);
        }

        function _catch(error: number) {
            console.log("捕获各种异常", error);
            res.sendStatus(500)
        }
    }


}
