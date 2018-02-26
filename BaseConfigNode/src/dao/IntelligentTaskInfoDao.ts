import { BDaoImpl } from './core/BDaoImpl';
import { DaoType } from './enum/DaoType';
import { TableMap } from '../model/Table-Map';
export default class IntelligentTaskInfoDao extends BDaoImpl {
    DaoName = DaoType.IntelligentTaskInfoDao;
    ModelName = TableMap.IntelligentTaskInfo;

    constructor() {
        super();
    }
}