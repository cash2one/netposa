import {BDaoImpl} from "./core/BDaoImpl";
import {TableMap} from "../model/Table-Map";
import {DaoType} from "./enum/DaoType";
import {_Dao, PostData} from "./core/_Dao";
/**
 * Created by dell on 2017/7/29.
 */
export default class UserDao extends BDaoImpl{
    DaoName = DaoType.UserDao;
    ModelName = TableMap.User;
    private static GET_ALL_ON_LINE_USER_CACHE_DATA_URL = "/baseconfig/getAllOnLineUser";
    constructor(){
        super();
    }

    //获取所有在线用户
    getAllOnLineUser(serverType ? :string) {
        return _Dao.excute( this.getUrl( UserDao.GET_ALL_ON_LINE_USER_CACHE_DATA_URL, serverType ), {} as PostData );
    }
}