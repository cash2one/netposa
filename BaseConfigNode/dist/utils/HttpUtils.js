"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const continuation = require("continuation-local-storage");
const HttpHelper_1 = require("../common/help/HttpHelper");
const Config_1 = require("../Config");
class LocalHttpContext {
    constructor(req) {
        this.requestTime = Date.now().toString();
        this.userKey = req.header(LocalHttpContext.USER_TOKEN_KEY);
        this.userId = req.header(LocalHttpContext.USER_ID_KEY);
        this.clientIp = HttpHelper_1.default.getRequestClientIp(req);
    }
    getUserKey() {
        let result = {};
        result[LocalHttpContext.USER_TOKEN_KEY] = this.userKey || "";
        return result;
    }
    getUserIdStr() {
        return this.userId;
    }
    getClientIp() {
        return this.clientIp;
    }
    getRequestTime() {
        return this.requestTime;
    }
}
LocalHttpContext.USER_TOKEN_KEY = "AuthCacheKey";
LocalHttpContext.USER_ID_KEY = Config_1.default.USER_ID_KEY;
class HttpUtils {
    static init() {
        continuation.createNamespace(HttpUtils.Context_Name);
    }
    static setup(req, res, next) {
        const namespace = continuation.getNamespace(HttpUtils.Context_Name);
        namespace.bindEmitter(req);
        namespace.bindEmitter(res);
        namespace.run(function () {
            namespace.set('context', new LocalHttpContext(req));
            next();
        });
    }
    static getNameSpace() {
        return continuation.getNamespace(HttpUtils.Context_Name);
    }
    static current() {
        return continuation.getNamespace(HttpUtils.Context_Name).get('context');
    }
}
HttpUtils.Context_Name = "app_name";
exports.HttpUtils = HttpUtils;
