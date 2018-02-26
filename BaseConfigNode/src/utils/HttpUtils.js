"use strict";
exports.__esModule = true;
var continuation = require("continuation-local-storage");
var HttpHelper_1 = require("../common/help/HttpHelper");
var Config_1 = require("../Config");
var LocalHttpContext = (function () {
    function LocalHttpContext(req) {
        this.requestTime = Date.now().toString();
        this.userKey = req.header(LocalHttpContext.USER_TOKEN_KEY);
        this.userId = req.header(LocalHttpContext.USER_ID_KEY);
        this.clientIp = HttpHelper_1["default"].getRequestClientIp(req);
    }
    LocalHttpContext.prototype.getUserKey = function () {
        var result = {};
        result[LocalHttpContext.USER_TOKEN_KEY] = this.userKey || ""; // 若UserKey不存在, 则默认为空字符串
        return result;
    };
    LocalHttpContext.prototype.getUserIdStr = function () {
        return this.userId;
    };
    LocalHttpContext.prototype.getClientIp = function () {
        return this.clientIp;
    };
    LocalHttpContext.prototype.getRequestTime = function () {
        return this.requestTime;
    };
    LocalHttpContext.USER_TOKEN_KEY = "AuthCacheKey";
    LocalHttpContext.USER_ID_KEY = Config_1["default"].USER_ID_KEY;
    return LocalHttpContext;
}());
var HttpUtils = (function () {
    function HttpUtils() {
    }
    /**
     * 只执行一次
     */
    HttpUtils.init = function () {
        continuation.createNamespace(HttpUtils.Context_Name);
    };
    HttpUtils.setup = function (req, res, next) {
        var namespace = continuation.getNamespace(HttpUtils.Context_Name);
        namespace.bindEmitter(req);
        namespace.bindEmitter(res);
        namespace.run(function () {
            namespace.set('context', new LocalHttpContext(req));
            next();
        });
    };
    HttpUtils.getNameSpace = function () {
        return continuation.getNamespace(HttpUtils.Context_Name);
    };
    HttpUtils.current = function () {
        return continuation.getNamespace(HttpUtils.Context_Name).get('context');
    };
    HttpUtils.Context_Name = "app_name";
    return HttpUtils;
}());
exports.HttpUtils = HttpUtils;
