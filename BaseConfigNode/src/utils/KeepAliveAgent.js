"use strict";
exports.__esModule = true;
/**
 * Created by xupengtao on 2017/4/21.
 */
var Agent = require("agentkeepalive");
var KeepAliveAgent = (function () {
    function KeepAliveAgent() {
    }
    /**
     * 获取keepalive agent
     */
    KeepAliveAgent.getAgent = function () {
        return KeepAliveAgent.keepaliveAgent;
    };
    /**
     * keep alive agent
     */
    KeepAliveAgent.keepaliveAgent = new Agent({
        keepAlive: true,
        maxSockets: 100,
        maxFreeSockets: 10,
        timeout: 90000,
        freeSocketKeepAliveTimeout: 60000
    });
    return KeepAliveAgent;
}());
exports["default"] = KeepAliveAgent;
