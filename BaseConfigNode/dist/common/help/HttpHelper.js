"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpHelper {
    static getRequestClientIp(req) {
        let ipAddress;
        let forwardedIpsStr = req.header('x-forwarded-for');
        if (forwardedIpsStr) {
            ipAddress = forwardedIpsStr.split(',')[0];
        }
        if (!ipAddress) {
            ipAddress = req.connection && req.connection.remoteAddress;
        }
        return ipAddress;
    }
}
exports.default = HttpHelper;
