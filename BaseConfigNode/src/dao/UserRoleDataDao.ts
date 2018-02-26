import {BDaoImpl} from "./core/BDaoImpl";
import {TableMap} from "../model/Table-Map";
import {DaoType} from "./enum/DaoType";
export default class UserRoleDataDao extends BDaoImpl{
    DaoName = DaoType.UserRoleDataDao;
    ModelName = TableMap.UserRoleData;

    constructor(){
        super();
    }
}