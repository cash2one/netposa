import Where from "../common/Where";
import DataType from "../common/DataType";
import JoinType from "../common/JoinType";
import MatchingType from "../common/MatchingType";
import ChildWhere from "../common/ChildWhere";
import * as Promise from "promise";
//import IThenable = Promise.IThenable;
import { DaoType } from '../dao/enum/DaoType';
import UserDao from '../dao/UserDao';
import { BeanHelper } from '../common/help/BeanHelper';
import { ServerType } from '../dao/core/BDaoImpl';

export default class UserService {


    /**
     * 根据用户名密码获取用户列表
     * @param username 用户名
     * @param password 密码
     */
    public static findUserByUidWithPwd(username: string, password: string) {

        var arrWhere = new Array<Where>();
        var where = new Where();
        var childWhere = new ChildWhere()
        childWhere.FieldName = "Uid";
        childWhere.FieldType = DataType.Text;
        childWhere.FieldValue = username;
        childWhere.JType = JoinType.And;
        childWhere.MType = MatchingType.Equal;
        where.Childs.push(childWhere);

        childWhere = new ChildWhere()
        childWhere.FieldName = "Pwd";
        childWhere.FieldType = DataType.Text;
        childWhere.FieldValue = password;
        childWhere.JType = JoinType.And;
        childWhere.MType = MatchingType.Equal;
        where.Childs.push(childWhere);

        arrWhere.push(where);
        return BeanHelper.getDao<UserDao>(DaoType.UserDao).findListByWhere(arrWhere, ServerType.BCS);
    }


    /**
     * 综合查询 用户列表
     * @time: 2017-04-19 11:31:10
     * @params:
     * @return:
     */
    public  static findListByParams(params: any/* UserListParams */){

       /* var arrWhere = new Array<Where>();

        var where = new Where();
        where.Childs = new Array<ChildWhere>();

        if(params.name){
            let childWhere = new ChildWhere();
            childWhere.FieldName = 'Code';
            childWhere.FieldType = DataType.Text;
            childWhere.FieldValue = model.Code;
            childWhere.MType = MatchingType.Equal;

            childWhere.JType = JoinType.And;
        }

        where.Childs.push(childWhere);

        where.JType = JoinType.And;
        arrWhere.push(where);

        return BaseDao.findListByPage(TableMap.ProxyServer, arrWhere,params.currentPage,params.pageSize);
*/
        return Promise.resolve(null);
    };
}