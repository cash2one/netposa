"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
const MapService_1 = require("../service/MapService");
const ErrorCode_1 = require("../common/res/ErrorCode");
const ResponseResult_1 = require("../core/params/result/ResponseResult");
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
class MapController {
    static findList(req, res, next) {
        MapController.mapService.findList(req.query).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static saveOrUpdate(req, res, next) {
        MapController.mapService.saveOrUpdate(req.body).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static getBaseInfo(req, res, next) {
        MapController.mapService.getBaseInfo().then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }
    }
    static saveOrUpdateBaseInfo(req, res, next) {
        MapController.mapService.saveOrUpdateBaseInfo(req.body).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }
    }
}
MapController.Logger = log4js.getLogger("MapController");
MapController.mapService = new MapService_1.MapService();
exports.default = MapController;
