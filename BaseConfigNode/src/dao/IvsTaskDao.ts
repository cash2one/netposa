import { BDaoImpl } from './core/BDaoImpl';
import { DaoType } from './enum/DaoType';
import { TableMap } from '../model/Table-Map';
export default class IvsTaskDao extends BDaoImpl {
    DaoName = DaoType.IvsTaskDao;
    ModelName = TableMap.IvsTask;

    constructor() {
        super();
    }
}