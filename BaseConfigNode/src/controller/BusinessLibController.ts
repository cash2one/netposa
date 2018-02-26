import * as express from "express";
import { ResponseResult, BackResponseBody, PageResult } from "../core/params/result/ResponseResult";
import { ResponseResultTool } from "../common/res/ResponseResultTool";
import { BusinessLib } from "../core/entity/BusinessLib";
import { IBusinessLibService, BusinessLibService } from "../service/BusinessLibService";
import { IFindByIdParams, IDeleteByIds, IDeleteById } from "../core/params/request/RequestParams";
import { AreaEx } from "../core/entity/ex/AreaEx";
import { BusinessLibEx } from "../core/entity/ex/BusinessLibEx";
import ErrorCode from "../common/res/ErrorCode";
import { AreaAndBusinessListResult } from "../core/params/BusinessLibParams";
import { UserRoleDataEx } from "../core/entity/ex/UserRoleDataEx";

export default class BusinessLibController {

    private static businessLibService: IBusinessLibService = new BusinessLibService();

    public static findTreeWithArea(req: express.Request, res1: express.Response, next: Function): void {

        BusinessLibController.businessLibService.findBusinessLibTreeWithArea().then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function respResolve(data: Array<AreaEx & BusinessLibEx>) {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res1.send(result);
        }

    }

    public static findHasSelfTreeWithArea(req: express.Request, res1: express.Response, next: Function): void {
        BusinessLibController.businessLibService.findHasSelfBusinessLibAndAreaTree(req.query).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function respResolve(data: AreaAndBusinessListResult) {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res1.send(result);
        }

    }

    public static findTreeAreaWithRole(req: express.Request, res1: express.Response, next: Function): void {
        BusinessLibController.businessLibService.findTreeAreaWithRole().then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function respResolve(data: Array<AreaEx & UserRoleDataEx & BusinessLibEx>) {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res1.send(result);
        }
    }

    public static findBusinessLibHasSelfTree(req: express.Request, res1: express.Response, next: Function): void {
        BusinessLibController.businessLibService.findBusinessLibHasSelfTree(req.query).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function respResolve(data: Array<BusinessLibEx>) {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res1.send(result);
        }

    }


    public static findTree(req: express.Request, res1: express.Response, next: Function): void {

        BusinessLibController.businessLibService.findBusinessLibTree(req.query).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function respResolve(data: Array<BusinessLibEx>) {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res1.send(result);
        }

    }

    public static save(req: express.Request, res1: express.Response, next: Function): void {

        let params: BusinessLib = req.body;

        BusinessLibController.businessLibService.save(params).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function respResolve(resp: any) {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = resp;
            res1.send(result);
        }

    }

    public static update(req: express.Request, res1: express.Response, next: Function): void {

        let params: BusinessLib = req.body;
        BusinessLibController.businessLibService.update(params).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function respResolve(resp: BackResponseBody<string>) {
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }

    public static findById(req: express.Request, res1: express.Response, next: Function): void {

        let params: IFindByIdParams = req.query;

        BusinessLibController.businessLibService.detail(params.id).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function complete(resp: BackResponseBody<BusinessLib>) {
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }

    public static deleteByIds(req: express.Request, res1: express.Response, next: Function): void {

        let params: IDeleteByIds = req.body;

        BusinessLibController.businessLibService.deleteByIds(params.ids).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function complete(resp: BackResponseBody<string>) {
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }

    public static deleteById(req: express.Request, res1: express.Response, next: Function) {
        let params: IDeleteById = req.body;
        BusinessLibController.businessLibService.deleteById(params.id).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res1));

        function respResolve(resp: BackResponseBody<string>) {
            res1.send(ResponseResultTool.convert2ResponseResult(resp));
        }

    }
}