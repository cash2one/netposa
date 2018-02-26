import * as express from "express";
import UserService from "../service/UserService";
import request = require("superagent");
import {BackResponseBody, ResponseResult} from "../core/params/result/ResponseResult";
import {User} from "../core/entity/User";
import {ResponseResultTool} from "../common/res/ResponseResultTool";
//import {UserListParams} from "../core/params/UserParams";


export default class UserController {

    public static findUserByUidWithPwd(req: express.Request, res: express.Response, next: Function): void {

        UserService.findUserByUidWithPwd(req.query.username,req.query.password).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: BackResponseBody<Array<User>>){
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }

    }

    public static findListByParams(req: express.Request, res: express.Response, next: Function): void {

        UserService.findListByParams(req.query).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: any){
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }


}