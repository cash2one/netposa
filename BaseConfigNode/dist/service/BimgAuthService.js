"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CacheProxy_1 = require("../utils/CacheProxy");
const ErrorCode_1 = require("../common/res/ErrorCode");
const ss = require("superagent");
const KeepAliveAgent_1 = require("../utils/KeepAliveAgent");
const BeanHelper_1 = require("../common/help/BeanHelper");
const DaoType_1 = require("../dao/enum/DaoType");
let superagent = ss;
class BimgAuthService {
    static isAuthorized(username, authKey) {
        let token = CacheProxy_1.default.get(username);
        function complete(resp) {
            console.log("缓存失效");
            CacheProxy_1.default.putWithTimeout(username, authKey, 60 * 1000);
            return Promise.resolve(true);
        }
        function catchReject(errCode) {
            return Promise.resolve(false);
        }
        if (token == null || token != authKey) {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UserLocalDao).checkIsLogin(username, authKey).then(complete).catch(catchReject);
        }
        else {
            console.log("使用缓存");
            return Promise.resolve(true);
        }
    }
    static requestBimg(bimgUrl) {
        var promise = new Promise(function (resolve, reject) {
            superagent.get(bimgUrl)
                .agent(KeepAliveAgent_1.default.getAgent())
                .end(function (err, res) {
                if (!err && !res.error) {
                    resolve(res);
                }
                else {
                    reject(ErrorCode_1.default.ERROR);
                }
            });
        });
        return promise;
    }
}
exports.default = BimgAuthService;
