"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AreaService_1 = require("../service/AreaService");
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
const Area_1 = require("../core/entity/Area");
const HttpUtils_1 = require("../utils/HttpUtils");
class AreaController {
    static findAreaListTree(req, res, next) {
        AreaController.areaService.findAreaListTree(req.query).then((data) => {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
    static saveArea(req, res, next) {
        let params = req.body;
        let area = new Area_1.Area();
        area.Code = params.Code;
        area.Name = params.Name;
        area.ParentID = (params.ParentArea || {}).ID;
        area.OrderNum = params.OrderNum;
        area.Description = params.Description;
        area.CreateTime = HttpUtils_1.HttpUtils.current().getRequestTime();
        AreaController.areaService.save(area).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static updateArea(req, res, next) {
        let params = req.body;
        if (params) {
            delete params.ParentArea;
        }
        AreaController.areaService.update(params).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static deleteAreaById(req, res, next) {
        let params = req.body || {};
        AreaController.areaService.deleteById(params.id).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static deleteAreaByIds(req, res, next) {
        let params = req.body || {};
        AreaController.areaService.deleteByIds(params.ids).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static getArea(req, res, next) {
        let params = req.query || {};
        AreaController.areaService.detail(params.id).then((resp) => {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
    }
}
AreaController.areaService = new AreaService_1.AreaService();
exports.default = AreaController;
