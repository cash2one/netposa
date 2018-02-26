"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BDaoImpl_1 = require("./core/BDaoImpl");
const DaoType_1 = require("./enum/DaoType");
const Table_Map_1 = require("../model/Table-Map");
const _Dao_1 = require("./core/_Dao");
class UserLocalDao extends BDaoImpl_1.BDaoImpl {
    constructor() {
        super(...arguments);
        this.DaoName = DaoType_1.DaoType.UserLocalDao;
        this.ModelName = Table_Map_1.TableMap.UserLocal;
    }
    checkIsLogin(username, authKey) {
        let postData = {};
        postData["username"] = username;
        postData["AuthCacheKey"] = authKey;
        return _Dao_1._Dao.excute(this.getUrl(UserLocalDao.CHECK_LOGIN_URL, BDaoImpl_1.ServerType.BCS), postData);
    }
}
UserLocalDao.CHECK_LOGIN_URL = "/user/check-login";
exports.default = UserLocalDao;
