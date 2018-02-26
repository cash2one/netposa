"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Agent = require("agentkeepalive");
class KeepAliveAgent {
    static getAgent() {
        return KeepAliveAgent.keepaliveAgent;
    }
}
KeepAliveAgent.keepaliveAgent = new Agent({
    keepAlive: true,
    maxSockets: 100,
    maxFreeSockets: 10,
    timeout: 90000,
    freeSocketKeepAliveTimeout: 60000,
});
exports.default = KeepAliveAgent;
