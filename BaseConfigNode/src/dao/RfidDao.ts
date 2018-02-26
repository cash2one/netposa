import { BDaoImpl } from './core/BDaoImpl';
import { DaoType } from './enum/DaoType';
import { TableMap } from '../model/Table-Map';
export default class RfidDao extends BDaoImpl {
    DaoName = DaoType.RfidDao;
    ModelName = TableMap.Rfid;

    constructor() {
        super();
    }
}