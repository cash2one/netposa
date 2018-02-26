import { BDaoImpl } from './core/BDaoImpl';
import { DaoType } from './enum/DaoType';
import { TableMap } from '../model/Table-Map';
export default class EventRuleTriggerDao extends BDaoImpl {
    DaoName = DaoType.EventRuleTriggerDao;
    ModelName = TableMap.EventRuleTrigger;

    constructor() {
        super();
    }
}