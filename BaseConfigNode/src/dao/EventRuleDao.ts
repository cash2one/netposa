import { BDaoImpl } from './core/BDaoImpl';
import { DaoType } from './enum/DaoType';
import { TableMap } from '../model/Table-Map';
export default class EventRuleDao extends BDaoImpl {
    DaoName = DaoType.EventRuleDao;
    ModelName = TableMap.EventRule;

    constructor() {
        super();
    }
}