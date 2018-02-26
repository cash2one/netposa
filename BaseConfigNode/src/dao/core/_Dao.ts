import * as ss from 'superagent';
import * as Isuperagent from '../../typings/superagent.d';
import * as log4js from "log4js";
import * as util from "util";
import { HttpUtils } from "../../utils/HttpUtils";
import { BackResponseBody } from "../../core/params/result/ResponseResult";
import ErrorCode from "../../common/res/ErrorCode";
import KeepAliveAgent from "../../utils/KeepAliveAgent";

let superagent = ss as Isuperagent.SuperAgentStatic;

export type PostData = { [key: string]: any };

export class _Dao {

    private static LOGGER = log4js.getLogger("_Dao");

    /**
     * 默认超时时间 20秒
     * @type {number}
     * @private
     */
    private static _TIME_OUT = 40 * 1000;

    public static handlePromise(resolve: any, reject: any, err: any, res: ss.Response, linkUrl: string, datas: any, isNoAuthKey?: boolean) {
        // 这里可能引起的异常过多, 而且会因为异常引起nodejs奔溃, 故保险起见, 在此处使用try catch
        try {
            if (!isNoAuthKey) {
                _Dao.LOGGER.debug(util.format("handlePromise url is [%s] [%j] [%s] [%s]", linkUrl, HttpUtils.current().getUserKey(), HttpUtils.current().getRequestTime(), res && res.status));
                _Dao.LOGGER.debug(util.format("currentRequestParams is %s", JSON.stringify(datas)));
            } else {
                _Dao.LOGGER.debug(util.format("handlePromise url is [%s] ", linkUrl));
                _Dao.LOGGER.debug(util.format("currentRequestParams is [%s]", JSON.stringify(datas)));
            }

            if (!err && (res && !res.error)) {
                let body = res.body as BackResponseBody<any>;
                // 获取后台传来的数据
                if (body && body.code == ErrorCode.OK) {
                    // 由于后台传来的数据 只有code==200的情况下才为正确, 所以所有传回service中的body都不需要进行控制判断, 可直接body.data使用
                    resolve(body);
                } else {
                    // TODO 需对各种可能的错误类型进行尝试
                    if (body) {
                        _Dao.LOGGER.error(util.format("_Dao.handlePromise Error: [url] is %s [body] is %j", linkUrl, body));
                    } else {
                        _Dao.LOGGER.error(util.format("_Dao.handlePromise Error: [url] is %s [body] is null!", linkUrl));
                    }
                    _Dao.LOGGER.debug(util.format("currentRequestParams is %s", JSON.stringify(datas)));
                    reject((body && body.code) || ErrorCode.ERROR_BACK_ERROR);
                }
            } else {
                // 这里分很多中情况, 404 timeout 等,因为前端不关心这些, 所以暂定为未知错误
                // TODO 需对各种可能的错误类型进行尝试
                // 记录后台 报错的具体信息  res.error
                if (!isNoAuthKey) {
                    _Dao.LOGGER.error(util.format("_Dao.handlePromise Error: url = %s err = %j res = %j res.error = %s", linkUrl, err, res, res && res.error));
                } else {
                    _Dao.LOGGER.error(util.format("_Dao.handlePromise Error: url = %s", linkUrl));
                }

                //_Dao.LOGGER.error(util.format("_Dao.handlePromise Error: url = %s err = %j res = %j res.error = %s", linkUrl, err, res, res && res.error));
                reject((res && res.status) || ErrorCode.ERROR_BACK_ERROR);
            }
        } catch (e) {
            if (!isNoAuthKey) {
                _Dao.LOGGER.error(util.format("_DAO.handlePromise [Function internal] Error: url = %s err = %s", linkUrl, e));
            } else {
                _Dao.LOGGER.error(util.format("_DAO.handlePromise [Function internal] Error: url = %s", linkUrl));
            }
            // _Dao.LOGGER.error(util.format("_DAO.handlePromise [Function internal] Error: url = %s err = %s", linkUrl, e));
            reject(ErrorCode.ERROR_NODE_ERROR);
        }

    }

    private static setHeaders2Req(req: ss.Request, headers: { [key: string]: string }) {
        let header;
        for (header in headers) {
            req.set(header, headers[header]);
        }
        // _Dao.LOGGER.debug(util.format("currentRequestTime is %s", HttpUtils.current().getRequestTime()));
    }

    //新增参数isJson,当为fasle以表单的形式提交,当为true的时候以Json格式提交  lvdiquan 2017/8/12
    public static excute(linkUrl: string, datas: PostData, isJson?: boolean, isNoAuthKey?: boolean): Promise<any> {
        return new Promise(complete);

        function complete(resolve: Function, reject: Function) {
            let req = superagent.post(linkUrl);
            isJson = isJson || false;
            let contentType = isJson ? 'application/json;charset=utf-8' : 'application/x-www-form-urlencoded';
            if (!isNoAuthKey) {
                _Dao.setHeaders2Req(req, HttpUtils.current().getUserKey());
                req.set('Content-Type', contentType)
                    .accept('application/json')
                    .agent(KeepAliveAgent.getAgent() as any)
                    .timeout(_Dao._TIME_OUT)
                    .send(datas)
                    .end(HttpUtils.getNameSpace().bind(function (err: any, res: ss.Response) {
                        _Dao.handlePromise(resolve, reject, err, res, linkUrl, datas);
                    }));
            } else {
                req.set('Content-Type', contentType)
                    .accept('application/json')
                    .agent(KeepAliveAgent.getAgent() as any)
                    .timeout(_Dao._TIME_OUT)
                    .send(datas)
                    .end((err: any, res: ss.Response) => {
                        _Dao.handlePromise(resolve, reject, err, res, linkUrl, datas, isNoAuthKey);
                    });
            }
        }
    }
}