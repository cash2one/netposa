import { BDaoImpl } from './core/BDaoImpl';
import { DaoType } from './enum/DaoType';
import { TableMap } from '../model/Table-Map';
export default class PersonDao extends BDaoImpl {
    DaoName = DaoType.PersonDao;
    ModelName = TableMap.Person;

    constructor() {
        super();
    }
}