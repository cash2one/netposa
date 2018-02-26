/**
 * Created by dell on 2017/5/13.
 */
import * as express from "express";
import {IRoleService, RoleService} from "../service/RoleService";
import {RoleDetailResult} from "../core/params/RoleParams";
import {ResponseResult, BackResponseBody} from "../core/params/result/ResponseResult";
import ErrorCode from "../common/res/ErrorCode";
import {ResponseResultTool} from "../common/res/ResponseResultTool";
import Role from "../core/entity/Role";
import * as log4js from "log4js";

export default class RoleController{

    private static LOGGER = log4js.getLogger("RoleController");

    private static roleService: IRoleService = new RoleService();

    public static list(req: express.Request, res: express.Response, next: Function): void{
        RoleController.roleService.list(req.query).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: BackResponseBody<Array<Role>>){
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }

    }

    public static detail(req: express.Request, res: express.Response, next: Function): void{
        RoleController.roleService.detail(req.query.roleId).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));


        function complete(data: RoleDetailResult){
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }

    }

    public static save(req: express.Request, res: express.Response, next: Function): void{
        RoleController.LOGGER.debug(req.body);
        RoleController.roleService.save(req.body).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: string){
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }

    }

    public static update(req: express.Request, res: express.Response, next: Function): void{
        RoleController.roleService.update(req.body).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: boolean){
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }

    }

    public static getTemplate(req: express.Request, res: express.Response, next: Function): void{
      //  RoleController.roleService.getTemplate(req.query.id).then(complete).catch(_catch);

        function complete(){

        }

        function _catch(){

        }
    }

    public static deleteRoleById(req: express.Request, res: express.Response, next: Function): void{
        RoleController.roleService.deleteById(req.body.id).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: BackResponseBody<boolean>){
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }

    }
}