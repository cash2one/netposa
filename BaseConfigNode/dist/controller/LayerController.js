"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
const LayerService_1 = require("../service/LayerService");
const log4js = require("log4js");
class LayerController {
    static findAllList(req, res, next) {
        LayerController.layerService.findAll().then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function respResolve(resp) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
    static delete(req, res, next) {
        let params = req.body.ids || [];
        LayerController.layerService.delete(params).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function respResolve(resp) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(resp));
        }
    }
    static add(req, res, next) {
        LayerController.layerService.add(req.body).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function respResolve(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static edit(req, res, next) {
        LayerController.layerService.edit(req.body).then(respResolve).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function respResolve(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
}
LayerController.LOGGER = log4js.getLogger("LayerController");
LayerController.layerService = new LayerService_1.LayerService();
exports.default = LayerController;
