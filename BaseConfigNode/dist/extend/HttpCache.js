"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpCache {
    static setNoCache(req, res, next) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        next();
    }
}
exports.default = HttpCache;
