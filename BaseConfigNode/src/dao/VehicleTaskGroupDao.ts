import { BDaoImpl } from './core/BDaoImpl';
import { DaoType } from './enum/DaoType';
import { TableMap } from '../model/Table-Map';
export default class VehicleTaskGroupDao extends BDaoImpl {
    DaoName = DaoType.VehicleTaskGroupDao;
    ModelName = TableMap.VehicleTaskGroup;

    constructor() {
        super();
    }
}