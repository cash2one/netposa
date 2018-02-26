import { BDaoImpl } from './core/BDaoImpl';
import { DaoType } from './enum/DaoType';
import { TableMap } from '../model/Table-Map';
export default class RmpGateDao extends BDaoImpl {
    DaoName = DaoType.RmpGateDao;
    ModelName = TableMap.RmpGate;

    constructor() {
        super();
    }
}