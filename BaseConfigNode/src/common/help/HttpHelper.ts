/**
 * Created by dell on 2017/8/28.
 */
import * as express from "express";

/**
 * http请求工具类
 */
export default class HttpHelper{

    /**
     * 获取当前request请求的客户端ip
     * @param req
     * @return {any}
     */
    static getRequestClientIp(req: express.Request){
        let ipAddress;
        let forwardedIpsStr = req.header('x-forwarded-for');
        if (forwardedIpsStr) {
            ipAddress = forwardedIpsStr.split(',')[0];
        }
        // x-forwarded-for中取不到 则取remoteAddress
        if (!ipAddress) {
            ipAddress = req.connection && req.connection.remoteAddress;
        }
        return ipAddress;
    }
}