import { BDaoImpl } from './core/BDaoImpl';
import { DaoType } from './enum/DaoType';
import { TableMap } from '../model/Table-Map';
export default class LampDao extends BDaoImpl {
    DaoName = DaoType.LampDao;
    ModelName = TableMap.Lamp;

    constructor() {
        super();
    }
}