import * as Isuperagent from "../typings/superagent.d";
import UserLocalDao from '../dao/UserLocalDao';
import CacheProxy from "../utils/CacheProxy";
import ErrorCode from "../common/res/ErrorCode";
import * as ss from "superagent";
import KeepAliveAgent from "../utils/KeepAliveAgent";
import { BeanHelper } from '../common/help/BeanHelper';
import { DaoType } from '../dao/enum/DaoType';

let superagent = ss as Isuperagent.SuperAgentStatic;

export default class BimgAuthService {

    /**
     * 是否授权
     * @param username 用户名
     * @param authKey  授权key
     */
    public static isAuthorized(username: string, authKey: string) {
        let token = CacheProxy.get(username);

        function complete(resp: any) {
            console.log("缓存失效");

            CacheProxy.putWithTimeout(username, authKey, 60 * 1000);
            return Promise.resolve(true);
        }

        function catchReject(errCode: number) {
            return Promise.resolve(false);
        }
        if (token == null || token != authKey) {
            return BeanHelper.getDao<UserLocalDao>(DaoType.UserLocalDao).checkIsLogin(username, authKey).then(complete).catch(catchReject);
        } else {
            console.log("使用缓存");
            return Promise.resolve(true);
        }
    }

    /**
    * 请求图片服务器
    * @param req Request
    * @param res Response
    * @param next Function
    */
    public static requestBimg(bimgUrl: string) {
        var promise = new Promise(
            function (resolve: Function, reject: Function) {
                superagent.get(bimgUrl)
                    .agent(KeepAliveAgent.getAgent())
                    .end(function (err, res) {
                        if (!err && !res.error) {
                            // 获取后台传来的数据
                            resolve(res);
                        } else {
                            // 这里分很多中情况, 404 timeout 等,因为前端不关心这些, 所以暂定为未知错误
                            reject(ErrorCode.ERROR);
                        }
                    });
            }
        );
        return promise;
    }

}