import { BDaoImpl } from './core/BDaoImpl';
import { DaoType } from './enum/DaoType';
import { TableMap } from '../model/Table-Map';
export default class MacTaskDao extends BDaoImpl {
    DaoName = DaoType.MacTaskDao;
    ModelName = TableMap.MacTask;

    constructor() {
        super();
    }
}