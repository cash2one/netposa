"use strict";
exports.__esModule = true;
/**
 * http请求工具类
 */
var HttpHelper = (function () {
    function HttpHelper() {
    }
    /**
     * 获取当前request请求的客户端ip
     * @param req
     * @return {any}
     */
    HttpHelper.getRequestClientIp = function (req) {
        var ipAddress;
        var forwardedIpsStr = req.header('x-forwarded-for');
        if (forwardedIpsStr) {
            ipAddress = forwardedIpsStr.split(',')[0];
        }
        // x-forwarded-for中取不到 则取remoteAddress
        if (!ipAddress) {
            ipAddress = req.connection && req.connection.remoteAddress;
        }
        return ipAddress;
    };
    return HttpHelper;
}());
exports["default"] = HttpHelper;
