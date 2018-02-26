"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorCode_1 = require("../common/res/ErrorCode");
const ResponseResult_1 = require("../core/params/result/ResponseResult");
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
const ResourceService_1 = require("../service/ResourceService");
const Resource_1 = require("../core/entity/Resource");
class ResourceController {
    static getresourceNumByType(req, res, next) {
        ResourceController.resService.getresourceNumByType(req.body)
            .then(complete)
            .catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }
    }
    static getTotalDevice(req, res, next) {
        ResourceController.resService.getTotalDevice().then((resp) => {
            ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp);
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
    static getDeviceById(req, res, next) {
        ResourceController.resService.getDeviceById(req.body).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(data);
        }
    }
    static getReourceData(req, res, next) {
        let params = req.body;
        switch (params.type) {
            case Resource_1.ResourcePageType.ALL.value:
                ResourceController.resService.getResourceAllList(params)
                    .then(complete)
                    .catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
                break;
            case Resource_1.ResourcePageType.Vehicle.value:
                ResourceController.resService.getResourceCarList(params)
                    .then(complete)
                    .catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
                break;
            case Resource_1.ResourcePageType.Face.value:
                ResourceController.resService.getResourceFaceList(params)
                    .then(complete)
                    .catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
                break;
            case Resource_1.ResourcePageType.WiFi.value:
                ResourceController.resService.getResourceWifiList(params)
                    .then(complete)
                    .catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
                break;
            case Resource_1.ResourcePageType.EFENCE.value:
                ResourceController.resService.getResourceElectronicfenceList(params)
                    .then(complete)
                    .catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
                break;
            default:
                ResourceController.resService.getResourceAllList(params)
                    .then(complete)
                    .catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        }
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }
    }
}
ResourceController.resService = new ResourceService_1.ResourceServer();
exports.default = ResourceController;
