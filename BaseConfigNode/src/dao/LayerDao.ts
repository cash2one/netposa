import { BDaoImpl } from './core/BDaoImpl';
import { DaoType } from './enum/DaoType';
import { TableMap } from '../model/Table-Map';
export default class LayerDao extends BDaoImpl {
    DaoName = DaoType.LayerDao;
    ModelName = TableMap.Layer;

    constructor() {
        super();
    }
}