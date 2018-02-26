import { BDaoImpl } from './core/BDaoImpl';
import { DaoType } from './enum/DaoType';
import { TableMap } from '../model/Table-Map';
import { _Dao, PostData } from './core/_Dao';

export default class BusinessLibDao extends BDaoImpl {
    DaoName = DaoType.BusinessLibDao;
    ModelName = TableMap.BusinessLib;
    DELETE_URL = "/businesslib/delete";
    KEY_ID_LIST_JSON = "libIds";

    constructor() {
        super();
    }

    protected setPostData(postData: PostData, key: string, value: Object) {
        postData[key] = value;
    }

    // 删除布控库, 改为这个接口, 用来判断人像库是否在运行。
    deleteBusLib(ids: Array<string>, serverType?: string) {
        let postData = {} as PostData;
        this.setPostData(postData, this.KEY_ID_LIST_JSON, JSON.stringify(ids));
        return _Dao.excute(this.getUrl(this.DELETE_URL, serverType), postData, false);
    }
}