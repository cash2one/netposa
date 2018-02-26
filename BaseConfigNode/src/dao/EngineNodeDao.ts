import { BDaoImpl } from './core/BDaoImpl';
import { DaoType } from './enum/DaoType';
import { TableMap } from '../model/Table-Map';
export default class EngineNodeDao extends BDaoImpl {
    DaoName = DaoType.EngineNodeDao;
    ModelName = TableMap.EngineNode;

    constructor() {
        super();
    }
}