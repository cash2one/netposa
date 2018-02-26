"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
const PersonService_1 = require("../service/PersonService");
const ResponseResult_1 = require("../core/params/result/ResponseResult");
const ErrorCode_1 = require("../common/res/ErrorCode");
class PersonController {
    static save(req, res1, next) {
        PersonController.personService.save(req.body).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function complete(resp) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = resp;
            res1.send(result);
        }
    }
    static update(req, res1, next) {
        PersonController.personService.update(req.body).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res1));
        function complete(resp) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = resp;
            res1.send(result);
        }
    }
    static findListByParams(req, res, next) {
        let params = req.query;
        PersonController.personService.findListByParams(params).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static findDetailById(req, res, next) {
        let params = req.query;
        PersonController.personService.detail(params.id).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(resp) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = resp;
            res.send(result);
        }
    }
    static deleteById(req, res, next) {
        let params = req.body;
        PersonController.personService.deleteById(params.id).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }
    }
    static deleteByIds(req, res, next) {
        let params = req.body;
        PersonController.personService.deleteByIds(params.ids).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = ErrorCode_1.default.OK;
            result.data = data;
            res.send(result);
        }
    }
    static changeStatusByUserIds(req, res, next) {
        PersonController.personService.changeStatusByIds(req.body).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
}
PersonController.personService = new PersonService_1.PersonService();
exports.default = PersonController;
