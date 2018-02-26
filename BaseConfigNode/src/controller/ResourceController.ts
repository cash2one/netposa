/**
 * Created by dell on 2017/4/8.
 */
import * as express from "express";
import ErrorCode from "../common/res/ErrorCode";
import { ResponseResult } from "../core/params/result/ResponseResult";
import { ResponseResultTool } from "../common/res/ResponseResultTool";
import { ResourceServer, ResourceService } from '../service/ResourceService'
import { ResourcePageType } from "../core/entity/Resource";

export default class ResourceController {

    private static resService: ResourceService = new ResourceServer();

    public static getresourceNumByType(req: express.Request, res: express.Response, next: Function): void {
        ResourceController.resService.getresourceNumByType(req.body)
            .then(complete)
            .catch(ResponseResultTool.convertError2ResponseResult(res));
        function complete(data: Array<any>) {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }
    }

    public static getTotalDevice(req: express.Request, res: express.Response, next: Function): void {
        ResourceController.resService.getTotalDevice().then((resp: any) => {
            ResponseResultTool.convert2ResponseResult(resp)
        }).catch(ResponseResultTool.convertError2ResponseResult(res));

    }

    public static getDeviceById(req: express.Request, res: express.Response, next: Function): void {
        ResourceController.resService.getDeviceById(req.body).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: any) {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(data);
        }
    }

    public static getReourceData(req: express.Request, res: express.Response, next: Function): void {
        let params = req.body;
        switch (params.type) {
            case ResourcePageType.ALL.value:
                ResourceController.resService.getResourceAllList(params)
                    .then(complete)
                    .catch(ResponseResultTool.convertError2ResponseResult(res));
                break;
            case ResourcePageType.Vehicle.value:
                ResourceController.resService.getResourceCarList(params)
                    .then(complete)
                    .catch(ResponseResultTool.convertError2ResponseResult(res));
                break;
            case ResourcePageType.Face.value:
                ResourceController.resService.getResourceFaceList(params)
                    .then(complete)
                    .catch(ResponseResultTool.convertError2ResponseResult(res));
                break;
            case ResourcePageType.WiFi.value:
                ResourceController.resService.getResourceWifiList(params)
                    .then(complete)
                    .catch(ResponseResultTool.convertError2ResponseResult(res));
                break;
            case ResourcePageType.EFENCE.value:
                ResourceController.resService.getResourceElectronicfenceList(params)
                    .then(complete)
                    .catch(ResponseResultTool.convertError2ResponseResult(res));
                break;
            default:
                ResourceController.resService.getResourceAllList(params)
                    .then(complete)
                    .catch(ResponseResultTool.convertError2ResponseResult(res));
        }

        function complete(data: any) {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }
    }
}