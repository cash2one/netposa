import { BDaoImpl } from './core/BDaoImpl';
import { DaoType } from './enum/DaoType';
import { TableMap } from '../model/Table-Map';
export default class EventRuleActionDao extends BDaoImpl {
    DaoName = DaoType.EventRuleActionDao;
    ModelName = TableMap.EventRuleAction;

    constructor() {
        super();
    }
}