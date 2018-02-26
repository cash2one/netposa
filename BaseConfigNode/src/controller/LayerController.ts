import * as express from "express";
import {BackResponseBody} from "../core/params/result/ResponseResult";
import {ResponseResultTool} from "../common/res/ResponseResultTool";
import {ILayerService, LayerService} from "../service/LayerService";
import {Layer} from "../core/entity/Layer";
import * as log4js from "log4js";

/**
 * create by zmp.
 * @time: 2017-08-10
 */
export default class LayerController {

    private static LOGGER = log4js.getLogger("LayerController");

    private static layerService: ILayerService = new LayerService();

    // 获取所有的图层列表
    public static findAllList(req: express.Request, res: express.Response, next: Function): void {
        LayerController.layerService.findAll().then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res));
        
        function  respResolve(resp: BackResponseBody<Array<Layer>>) {
            res.send(ResponseResultTool.convert2ResponseResult(resp));
        }
    }

    // 删除图层
    public static delete(req: express.Request, res: express.Response, next: Function): void {
        let params = req.body.ids || []
        LayerController.layerService.delete(params).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res));
        
        function  respResolve(resp: BackResponseBody<boolean>) {
            res.send(ResponseResultTool.convert2ResponseResult(resp));
        }
    }

    // 添加图层
    public static add(req: express.Request, res: express.Response, next: Function): void {
        LayerController.layerService.add(req.body).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res));

        function respResolve(data: BackResponseBody<string>) {
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }

    // 编辑图层
    public static edit(req: express.Request, res: express.Response, next: Function): void {
        LayerController.layerService.edit(req.body).then(respResolve).catch(ResponseResultTool.convertError2ResponseResult(res));
        
        function respResolve(data: BackResponseBody<boolean>) {
            res.send(ResponseResultTool.convert2ResponseResult(data));
        }
    }
}