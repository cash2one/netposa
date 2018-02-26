"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorCode_1 = require("../common/res/ErrorCode");
const IodService_1 = require("../service/IodService");
const ResponseResult_1 = require("../core/params/result/ResponseResult");
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
class IodController {
    static findAreaListTree(req, res, next) {
        IodController.iodService.findAreaListTree(req.query).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }
    }
    static saveIod(req, res, next) {
        let params = {};
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
        IodController.iodService.save(params).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static updateIod(req, res, next) {
        let params = req.body;
        IodController.iodService.update(params).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static deleteIodById(req, res, next) {
        let params = req.body || {};
        IodController.iodService.deleteById(params.id).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static deleteIodByIds(req, res, next) {
        let params = req.body || [];
        IodController.iodService.deleteByIds(params.ids).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
}
IodController.iodService = new IodService_1.IodService();
exports.default = IodController;
