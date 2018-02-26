import { BDaoImpl } from './core/BDaoImpl';
import { DaoType } from './enum/DaoType';
import { TableMap } from '../model/Table-Map';
export default class ObjectRelationDao extends BDaoImpl {
    DaoName = DaoType.ObjectRelationDao;
    ModelName = TableMap.ObjectRelation;

    constructor() {
        super();
    }
}