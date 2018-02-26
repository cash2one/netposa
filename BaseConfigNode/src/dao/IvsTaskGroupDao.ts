import { BDaoImpl } from './core/BDaoImpl';
import { DaoType } from './enum/DaoType';
import { TableMap } from '../model/Table-Map';
export default class IvsTaskGroupDao extends BDaoImpl {
    DaoName = DaoType.IvsTaskGroupDao;
    ModelName = TableMap.IvsTaskGroup;

    constructor() {
        super();
    }
}