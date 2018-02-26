import { BDaoImpl } from './core/BDaoImpl';
import { DaoType } from './enum/DaoType';
import { TableMap } from '../model/Table-Map';
export default class ProxyServerDao extends BDaoImpl {
    DaoName = DaoType.ProxyServerDao;
    ModelName = TableMap.ProxyServer;

    constructor() {
        super();
    }
}