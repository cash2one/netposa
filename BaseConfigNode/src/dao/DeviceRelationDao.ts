import { BDaoImpl } from './core/BDaoImpl';
import { DaoType } from './enum/DaoType';
import { TableMap } from '../model/Table-Map';
export default class DeviceRelationDao extends BDaoImpl {
    DaoName = DaoType.DeviceRelationDao;
    ModelName = TableMap.DeviceRelation;

    constructor() {
        super();
    }
}