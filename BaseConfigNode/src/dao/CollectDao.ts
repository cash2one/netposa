import { BDaoImpl } from './core/BDaoImpl';
import { DaoType } from './enum/DaoType';
import { TableMap } from '../model/Table-Map';

// 引入收藏请求相关参数

export default class CollectDao extends BDaoImpl {
    DaoName = DaoType.CollectDao;
    ModelName = TableMap.Collect;
    constructor(){
        super()
    }
}
