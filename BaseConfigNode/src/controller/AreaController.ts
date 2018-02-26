/**
 * Created by dell on 2017/4/8.
 */
import * as express from "express";
import ErrorCode from "../common/res/ErrorCode";
import {AreaService, IAreaService} from "../service/AreaService";
import {AreaEx} from "../core/entity/ex/AreaEx";
import {ResponseResult, BackResponseBody, PageResult} from "../core/params/result/ResponseResult";
import {AreaAndPersonListResult} from "../core/params/PersonParams";
import {ResponseResultTool} from "../common/res/ResponseResultTool";
import {Area} from "../core/entity/Area";
import {IDeleteByIds} from "../core/params/request/RequestParams";
import {HttpUtils} from "../utils/HttpUtils";
import {TreeParams} from "../core/params/tree/TreeParams";
import { debug } from "util";
//import {exportResponse} from "../../../../BaesConfigClient/BaseConfigClient/src/module/maintain/factory/maintain.service";

export default class AreaController {

    private static areaService: IAreaService = new AreaService();

    public static findAreaListTree(req: express.Request, res: express.Response, next: Function): void {

        AreaController.areaService.findAreaListTree(req.query).then((data: BackResponseBody<Array<AreaEx>>) => {
                res.send(ResponseResultTool.convert2ResponseResult(data))
            }).catch(ResponseResultTool.convertError2ResponseResult(res));

    }

    public static saveArea(req: express.Request, res: express.Response, next: Function): void {
        let params = req.body as AreaEx;
        let area = new Area();
        area.Code = params.Code;
        area.Name = params.Name;
        area.ParentID = (params.ParentArea || {} as AreaEx).ID;
        area.OrderNum = params.OrderNum;
        area.Description = params.Description;
        area.CreateTime = HttpUtils.current().getRequestTime();
        AreaController.areaService.save(area).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));
        function complete(data: BackResponseBody<string>) {
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }

    public static updateArea(req: express.Request, res: express.Response, next: Function): void {

        let params = req.body as AreaEx;
        // if (params) {
        //     // // 组装需要保存的数据
        //     // params.ParentID = (params.ParentArea || {} as Area).ID;
        //     // // 移除未使用的参数
        //     delete params.ParentArea;
        // }
        AreaController.areaService.update(params).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: BackResponseBody<string>) {
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }

    public static deleteAreaById(req: express.Request, res: express.Response, next: Function): void {
        let params = req.body || {};

        AreaController.areaService.deleteById(params.id).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: BackResponseBody<string>) {
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }

    public static deleteAreaByIds(req: express.Request, res: express.Response, next: Function): void {
        let params: IDeleteByIds = req.body || {};


        AreaController.areaService.deleteByIds(params.ids).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: BackResponseBody<string>) {
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }


    public static getArea(req: express.Request, res: express.Response, next: Function): void {

        let params = req.query || {};

        AreaController.areaService.detail(params.id).then((resp:BackResponseBody<Area>)=>{
            res.send(ResponseResultTool.convert2ResponseResult(resp))
        }).catch(ResponseResultTool.convertError2ResponseResult(res));

    }

}