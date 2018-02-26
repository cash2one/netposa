import {BDaoImpl} from "./core/BDaoImpl";
import {TableMap} from "../model/Table-Map";
import {DaoType} from "./enum/DaoType";
import {SearchCascadeModel} from "../core/server/SearchCascadeModel";
import {PostData, _Dao} from "./core/_Dao";

/**
 * Created by dell on 2017/7/29.
 */

export default class AreaDao extends BDaoImpl {
    DaoName = DaoType.AreaDao;
    ModelName = TableMap.Area;

    private static FIND_AREA_RESOURCE_CASCADE_LIST_URL = "/baseconfig/findCascadeList";
    private static FIND_AREA_LIST_BY_AREA_ID_URL = "/baseconfig/getAreaListByAreaId";

    constructor() {
        super();
    }

    /**
     * Area特有的方法
     */
    findAreaResourceCascadeList(searchModel: SearchCascadeModel, serverType?: string) {
        return _Dao.excute(this.getUrl(AreaDao.FIND_AREA_RESOURCE_CASCADE_LIST_URL, serverType), searchModel as PostData);
    }

    /**
     *根据区域Id获取该区域下的所有区域
     */
    findAreaListByAreaId(areaId: string, serverType?: string) {
        return _Dao.excute(this.getUrl(AreaDao.FIND_AREA_LIST_BY_AREA_ID_URL, serverType), {areaId: areaId} as PostData);
    }
}