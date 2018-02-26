import { BDaoImpl } from './core/BDaoImpl';
import { DaoType } from './enum/DaoType';
import { TableMap } from '../model/Table-Map';
export default class CameraDao extends BDaoImpl {
    DaoName = DaoType.CameraDao;
    ModelName = TableMap.Camera;

    constructor() {
        super();
    }
}