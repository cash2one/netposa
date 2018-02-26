"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BDaoImpl_1 = require("./core/BDaoImpl");
const Table_Map_1 = require("../model/Table-Map");
const DaoType_1 = require("./enum/DaoType");
const _Dao_1 = require("./core/_Dao");
class UserDao extends BDaoImpl_1.BDaoImpl {
    constructor() {
        super();
        this.DaoName = DaoType_1.DaoType.UserDao;
        this.ModelName = Table_Map_1.TableMap.User;
    }
    getAllOnLineUser(serverType) {
        return _Dao_1._Dao.excute(this.getUrl(UserDao.GET_ALL_ON_LINE_USER_CACHE_DATA_URL, serverType), {});
    }
}
UserDao.GET_ALL_ON_LINE_USER_CACHE_DATA_URL = "/baseconfig/getAllOnLineUser";
exports.default = UserDao;
