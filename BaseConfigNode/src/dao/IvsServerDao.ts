import { BDaoImpl } from './core/BDaoImpl';
import { DaoType } from './enum/DaoType';
import { TableMap } from '../model/Table-Map';
export default class IvsServerDao extends BDaoImpl {
    DaoName = DaoType.IvsServerDao;
    ModelName = TableMap.IvsServer;

    constructor() {
        super();
    }
}