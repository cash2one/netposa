/**
 * Created by xupengtao on 2017/4/21.
 */
var Agent = require("agentkeepalive");

export default class KeepAliveAgent {

    /**
     * keep alive agent
     */
    private static keepaliveAgent = new Agent({
        keepAlive: true,
        maxSockets: 100,
        maxFreeSockets: 10,
        timeout: 90000,
        freeSocketKeepAliveTimeout: 60000, // free socket keepalive for 30 seconds 
    });

    /**
     * 获取keepalive agent
     */
    public static getAgent() {
        return KeepAliveAgent.keepaliveAgent;
    }
}