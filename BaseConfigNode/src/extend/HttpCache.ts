import * as express from "express";

export default class HttpCache{
    static setNoCache(req: express.Request, res: express.Response, next: Function){
        res.header('Cache-Control','private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        next();
    }
}