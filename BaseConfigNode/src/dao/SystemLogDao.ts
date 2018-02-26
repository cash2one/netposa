import { BDaoImpl } from './core/BDaoImpl';
import { DaoType } from './enum/DaoType';
import { TableMap } from '../model/Table-Map';
export default class SystemLogDao extends BDaoImpl {
    DaoName = DaoType.SystemLogDao;
    ModelName = TableMap.SystemLog;

    constructor() {
        super();
    }
}