import * as express from "express";
import * as continuation from "continuation-local-storage";
import HttpHelper from "../common/help/HttpHelper";
import Config from '../Config'
class LocalHttpContext{
    private static USER_TOKEN_KEY = "AuthCacheKey";
    private static USER_ID_KEY = Config.USER_ID_KEY;
    private requestTime: string;
    private userKey: string|undefined;
    private userId: string|undefined;
    private clientIp: string|undefined;
    constructor(req: express.Request){
        this.requestTime = Date.now().toString();
        this.userKey = req.header(LocalHttpContext.USER_TOKEN_KEY);
        this.userId = req.header(LocalHttpContext.USER_ID_KEY);
        this.clientIp = HttpHelper.getRequestClientIp(req);
    }
    getUserKey(){
        let result = {} as {[key:string]:string};
        result[LocalHttpContext.USER_TOKEN_KEY] = this.userKey || ""; // 若UserKey不存在, 则默认为空字符串
        return result;
    }
    getUserIdStr(){
        return this.userId;
    }

    getClientIp(){
        return this.clientIp;
    }
    getRequestTime(){
        return this.requestTime;
    }
}

export class HttpUtils{
    private static Context_Name = "app_name";

    /**
     * 只执行一次
     */
    static init(){
        continuation.createNamespace(HttpUtils.Context_Name);
    }

    static setup(req: express.Request, res: express.Response, next: express.NextFunction) {
        const namespace = continuation.getNamespace(HttpUtils.Context_Name);
        namespace.bindEmitter(req);
        namespace.bindEmitter(res);

        namespace.run(function(){
            namespace.set('context', new LocalHttpContext(req));
            next();
        });
    }

    static getNameSpace(){
        return continuation.getNamespace(HttpUtils.Context_Name);
    }

    static current() {
        return continuation.getNamespace(HttpUtils.Context_Name).get('context');
    }

}