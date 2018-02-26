/**
 * Created by dell on 2017/4/8.
 */
import * as express from "express";

import ErrorCode from "../common/res/ErrorCode";
import {TreeService, ITreeService} from "../service/TreeService";
import {AreaEx} from "../core/entity/ex/AreaEx";
import {CameraEx} from "../core/entity/ex/CameraEx";
import {WifiEx} from "../core/entity/ex/WifiEx";
import {RmpGateEx} from "../core/entity/ex/RmpGateEx";
import {ElectronicFenceEx} from "../core/entity/ex/ElectronicFenceEx";
import {ResponseResult} from "../core/params/result/ResponseResult";
import {ResponseResultTool} from "../common/res/ResponseResultTool";
import {TreeParams} from "../core/params/tree/TreeParams";
import {LampEx} from '../core/entity/ex/LampEx';
import {PersonTreeEx} from "../core/entity/ex/PersonTreeEx";
import {UserTreeEx} from "../core/entity/ex/UserTreeEx";

export default class TreeController {

    private static treeService: ITreeService = new TreeService();

    public static findAreaListWithCamera(req: express.Request, res: express.Response, next: Function): void {

        let params = (req.query || {}) as TreeParams;
        let search = params.keyword;
        TreeController.treeService.findAreaListWithCamera(search).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: Array<AreaEx & CameraEx>) {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }
    }

    public static findAreaListWithWifi(req: express.Request, res: express.Response, next: Function): void {
        let params = (req.query || {}) as TreeParams;
        let search = params.keyword;
        TreeController.treeService.findAreaListWithWifi(search).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: Array<WifiEx | AreaEx>) {

            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }

    }

    public static findAreaListWithRmpgate(req: express.Request, res: express.Response, next: Function): void {
        let params = (req.query || {}) as TreeParams;
        let search = params.keyword;
        TreeController.treeService.findAreaListWithRmpgate(search).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: Array<RmpGateEx | AreaEx>) {

            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }

    }

    public static findAreaListWithElectronicfence(req: express.Request, res: express.Response, next: Function): void {
        let params = (req.query || {}) as TreeParams;
        let search = params.keyword;
        TreeController.treeService.findAreaListWithElectronicfence(search).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: Array<ElectronicFenceEx | AreaEx>) {

            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }

    }

    public static findAreaListWithLamp(req: express.Request, res: express.Response, next: Function): void {
        let params = (req.query || {}) as TreeParams;
        let search = params.keyword;
        TreeController.treeService.findAreaListWithLamp(search).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: Array<LampEx | AreaEx>) {

            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }

    }

    public static findAreaListWithPerson(req: express.Request, res: express.Response, next: Function): void {
        let params = (req.query || {}) as TreeParams;
        let search = params.keyword;
        TreeController.treeService.findAreaListWithPerson(search).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: Array<PersonTreeEx | AreaEx>) {

            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }

    }

    public static findAreaListWithUser(req: express.Request, res: express.Response, next: Function): void {
        let params = (req.query || {}) as TreeParams;
        let search = params.keyword;
        TreeController.treeService.findAreaListWithUser(search).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: Array<UserTreeEx | AreaEx>) {

            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }
    }

    public static findLampListWithAndElectronicfenceTree(req: express.Request, res: express.Response, next: Function): void {
        let params = (req.query || {}) as TreeParams;
        let search = params.keyword;
        TreeController.treeService.findLampListWithAndElectronicfenceTree(search).then((resp: Array<LampEx | AreaEx | ElectronicFenceEx>) => {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = resp;
            res.send(result);
        }).catch(ResponseResultTool.convertError2ResponseResult(res));

    }

    public static findLampListWithWifiTree(req: express.Request, res: express.Response, next: Function): void {
        let params = (req.query || {}) as TreeParams;
        let search = params.keyword;
        TreeController.treeService.findLampListWithWifiTree(search).then((resp: Array<LampEx | AreaEx | WifiEx>) => {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = resp;
            res.send(result);
        }).catch(ResponseResultTool.convertError2ResponseResult(res));

    }

    public static findLampListWithRmpGate(req: express.Request, res: express.Response, next: Function): void {
        let params = (req.query || {}) as TreeParams;
        let search = params.keyword;
        TreeController.treeService.findLampListTreeWithRmpGate(search).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: Array<LampEx | AreaEx | RmpGateEx>) {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }
    }

    public static findLampListWithCamera(req: express.Request, res: express.Response, next: Function): void {
        let params = (req.query || {}) as TreeParams;
        let search = params.keyword;
        TreeController.treeService.findLampListTreeWithCamera(search).then(complete).catch(ResponseResultTool.convertError2ResponseResult(res));

        function complete(data: Array<LampEx | AreaEx | CameraEx>) {
            let result = new ResponseResult();
            result.code = ErrorCode.OK;
            result.data = data;
            res.send(result);
        }

    }
}