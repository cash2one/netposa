/**
 * Created by dell on 2017/4/8.
 */
import * as express from "express";
import ErrorCode from "../common/res/ErrorCode";
import {IodService,IIodService} from "../service/IodService";
import {IodEx} from "../core/entity/ex/IodEx";
import {ResponseResult, BackResponseBody, PageResult} from "../core/params/result/ResponseResult";
import {ResponseResultTool} from "../common/res/ResponseResultTool";
import {Iod} from "../core/entity/Iod";
import {AreaEx} from "../core/entity/ex/AreaEx";
import {IDeleteByIds} from "../core/params/request/RequestParams";


export default class IodController{

    private static iodService:IIodService = new IodService();

    public static findAreaListTree(req: express.Request, res: express.Response, next: Function) :void{

        IodController.iodService.findAreaListTree(req.query).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: Array<AreaEx>) {

            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }

    }
    public static saveIod(req: express.Request, res: express.Response, next: Function) :void{
        let params = {} as Iod;
        params.Name = req.body.Name;
        params.Code = req.body.Code;
        params.Description = req.body.Description;
        params.DeviceType = req.body.DeviceType;
        params.IpAddress = req.body.IpAddress;
        params.MessageServerAddress = req.body.MessageServerAddress;
        params.MessageTopic = req.body.MessageTopic;
        params.Port = req.body.Port;
        params.ProxyServerID = req.body.ProxyServerID;
        params.Pwd = req.body.Pwd;
        params.Uid = req.body.Uid;
        params.AreaID = req.body.ParentArea.ID;
        IodController.iodService.save(params).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: BackResponseBody<string>) {
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }

    }

    public static updateIod(req: express.Request, res: express.Response, next: Function) :void{
        let params = req.body as IodEx;
        IodController.iodService.update(params).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: BackResponseBody<string>) {
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }

    }

    public static deleteIodById(req: express.Request, res: express.Response, next: Function) :void{
        let params = req.body || {};

        IodController.iodService.deleteById(params.id).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: BackResponseBody<string>) {
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }

    public static deleteIodByIds(req: express.Request, res: express.Response, next: Function) :void{
        let params:IDeleteByIds = req.body || [];
        IodController.iodService.deleteByIds(params.ids).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: BackResponseBody<string>) {
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }
}