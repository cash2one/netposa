import { BDaoImpl } from './core/BDaoImpl';
import { DaoType } from './enum/DaoType';
import { TableMap } from '../model/Table-Map';
export default class EngineServerDao extends BDaoImpl {
    DaoName = DaoType.EngineServerDao;
    ModelName = TableMap.EngineServer;

    constructor() {
        super();
    }
}