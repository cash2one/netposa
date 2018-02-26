import { BDaoImpl } from './core/BDaoImpl';
import { DaoType } from './enum/DaoType';
import { TableMap } from '../model/Table-Map';
export default class SystemPointDao extends BDaoImpl {
    DaoName = DaoType.SystemPointDao;
    ModelName = TableMap.SystemPoint;

    constructor() {
        super();
    }
}