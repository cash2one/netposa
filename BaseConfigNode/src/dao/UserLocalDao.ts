import { BDaoImpl, ServerType } from './core/BDaoImpl';
import { DaoType } from './enum/DaoType';
import { TableMap } from '../model/Table-Map';
import { _Dao, PostData } from './core/_Dao';
export default class UserLocalDao extends BDaoImpl{
    DaoName: string = DaoType.UserLocalDao;
    ModelName: string = TableMap.UserLocal;
    private static CHECK_LOGIN_URL = "/user/check-login";

    // private static LOGGER = log4js.getLogger("UserLocalDao");

    /**
     * 验证用户token是否登陆
     * @param username username
     * @param authKey 用户token
     */
    checkIsLogin(username: string, authKey: string) {
        let postData = {} as PostData;
        postData["username"] = username;
        postData["AuthCacheKey"] = authKey;
        return _Dao.excute(this.getUrl(UserLocalDao.CHECK_LOGIN_URL, ServerType.BCS), postData);
    }
}
