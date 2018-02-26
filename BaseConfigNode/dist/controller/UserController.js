"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = require("../service/UserService");
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
class UserController {
    static findUserByUidWithPwd(req, res, next) {
        UserService_1.default.findUserByUidWithPwd(req.query.username, req.query.password).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static findListByParams(req, res, next) {
        UserService_1.default.findListByParams(req.query).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
}
exports.default = UserController;
