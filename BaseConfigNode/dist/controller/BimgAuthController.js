"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
const BimgAuthService_1 = require("../service/BimgAuthService");
class BimgAuthController {
    static authBimg(req, res, next) {
        if (req.query.username == undefined || req.query.authKey == undefined) {
            res.sendStatus(403);
        }
        else {
            BimgAuthService_1.default.isAuthorized(req.query.username, req.query.authKey).then(complete).catch(_catch);
        }
        function complete(data) {
            if (data) {
                next();
            }
            else {
                res.sendStatus(403);
            }
        }
        function _catch(err) {
            BimgAuthController.LOGGER.error("图片权限验证请求错误！", err);
            res.sendStatus(500);
        }
    }
    static requestBimg(req, res, next) {
        let fileName = req.url.substring(6, req.url.indexOf("?"));
        BimgAuthController.LOGGER.info("bimg file name is : %s", fileName);
        let bimgUrl = "";
        BimgAuthService_1.default.requestBimg(bimgUrl).then(complete).catch(_catch);
        function complete(data) {
            res.set('Content-Type', data.headers['content-type']);
            res.send(data.body);
        }
        function _catch(error) {
            console.log("捕获各种异常", error);
            res.sendStatus(500);
        }
    }
}
BimgAuthController.LOGGER = log4js.getLogger("BimgAuthController");
exports.default = BimgAuthController;
