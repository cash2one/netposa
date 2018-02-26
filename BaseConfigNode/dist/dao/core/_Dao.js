"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ss = require("superagent");
const log4js = require("log4js");
const util = require("util");
const HttpUtils_1 = require("../../utils/HttpUtils");
const ErrorCode_1 = require("../../common/res/ErrorCode");
const KeepAliveAgent_1 = require("../../utils/KeepAliveAgent");
let superagent = ss;
class _Dao {
    static handlePromise(resolve, reject, err, res, linkUrl, datas, isNoAuthKey) {
        try {
            if (!isNoAuthKey) {
                _Dao.LOGGER.debug(util.format("handlePromise url is [%s] [%j] [%s] [%s]", linkUrl, HttpUtils_1.HttpUtils.current().getUserKey(), HttpUtils_1.HttpUtils.current().getRequestTime(), res && res.status));
                _Dao.LOGGER.debug(util.format("currentRequestParams is %s", JSON.stringify(datas)));
            }
            else {
                _Dao.LOGGER.debug(util.format("handlePromise url is [%s] ", linkUrl));
                _Dao.LOGGER.debug(util.format("currentRequestParams is [%s]", JSON.stringify(datas)));
            }
            if (!err && (res && !res.error)) {
                let body = res.body;
                if (body && body.code == ErrorCode_1.default.OK) {
                    resolve(body);
                }
                else {
                    if (body) {
                        _Dao.LOGGER.error(util.format("_Dao.handlePromise Error: [url] is %s [body] is %j", linkUrl, body));
                    }
                    else {
                        _Dao.LOGGER.error(util.format("_Dao.handlePromise Error: [url] is %s [body] is null!", linkUrl));
                    }
                    _Dao.LOGGER.debug(util.format("currentRequestParams is %s", JSON.stringify(datas)));
                    reject((body && body.code) || ErrorCode_1.default.ERROR_BACK_ERROR);
                }
            }
            else {
                if (!isNoAuthKey) {
                    _Dao.LOGGER.error(util.format("_Dao.handlePromise Error: url = %s err = %j res = %j res.error = %s", linkUrl, err, res, res && res.error));
                }
                else {
                    _Dao.LOGGER.error(util.format("_Dao.handlePromise Error: url = %s", linkUrl));
                }
                reject((res && res.status) || ErrorCode_1.default.ERROR_BACK_ERROR);
            }
        }
        catch (e) {
            if (!isNoAuthKey) {
                _Dao.LOGGER.error(util.format("_DAO.handlePromise [Function internal] Error: url = %s err = %s", linkUrl, e));
            }
            else {
                _Dao.LOGGER.error(util.format("_DAO.handlePromise [Function internal] Error: url = %s", linkUrl));
            }
            reject(ErrorCode_1.default.ERROR_NODE_ERROR);
        }
    }
    static setHeaders2Req(req, headers) {
        let header;
        for (header in headers) {
            req.set(header, headers[header]);
        }
    }
    static excute(linkUrl, datas, isJson, isNoAuthKey) {
        return new Promise(complete);
        function complete(resolve, reject) {
            let req = superagent.post(linkUrl);
            isJson = isJson || false;
            let contentType = isJson ? 'application/json;charset=utf-8' : 'application/x-www-form-urlencoded';
            if (!isNoAuthKey) {
                _Dao.setHeaders2Req(req, HttpUtils_1.HttpUtils.current().getUserKey());
                req.set('Content-Type', contentType)
                    .accept('application/json')
                    .agent(KeepAliveAgent_1.default.getAgent())
                    .timeout(_Dao._TIME_OUT)
                    .send(datas)
                    .end(HttpUtils_1.HttpUtils.getNameSpace().bind(function (err, res) {
                    _Dao.handlePromise(resolve, reject, err, res, linkUrl, datas);
                }));
            }
            else {
                req.set('Content-Type', contentType)
                    .accept('application/json')
                    .agent(KeepAliveAgent_1.default.getAgent())
                    .timeout(_Dao._TIME_OUT)
                    .send(datas)
                    .end((err, res) => {
                    _Dao.handlePromise(resolve, reject, err, res, linkUrl, datas, isNoAuthKey);
                });
            }
        }
    }
}
_Dao.LOGGER = log4js.getLogger("_Dao");
_Dao._TIME_OUT = 40 * 1000;
exports._Dao = _Dao;
