import { BDaoImpl } from './core/BDaoImpl';
import { DaoType } from './enum/DaoType';
import { TableMap } from '../model/Table-Map';
export default class IodDao extends BDaoImpl {
    DaoName = DaoType.IodDao;
    ModelName = TableMap.Iod;

    constructor() {
        super();
    }
}