import * as express from "express";

export default class IndexController {
    public static read(req: express.Request, res: express.Response, next: Function): void {
          res.send('Weclome to Base Config NodeJS Server!');
    }
}