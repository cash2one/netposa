import { BDaoImpl } from './core/BDaoImpl';
import { DaoType } from './enum/DaoType';
import { TableMap } from '../model/Table-Map';
export default class ExceptionLogDao extends BDaoImpl {
    DaoName = DaoType.ExceptionLogDao;
    ModelName = TableMap.ExceptionLog;

    constructor() {
        super();
    }
}