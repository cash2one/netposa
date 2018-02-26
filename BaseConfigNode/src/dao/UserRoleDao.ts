import {BDaoImpl} from "./core/BDaoImpl";
import {TableMap} from "../model/Table-Map";
import {DaoType} from "./enum/DaoType";
export default class UserRoleDao extends BDaoImpl{
    DaoName = DaoType.UserRoleDao;
    ModelName = TableMap.UserRole;

    constructor(){
        super();
    }
}