"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BDaoImpl_1 = require("./core/BDaoImpl");
const Table_Map_1 = require("../model/Table-Map");
const DaoType_1 = require("./enum/DaoType");
const _Dao_1 = require("./core/_Dao");
class AreaDao extends BDaoImpl_1.BDaoImpl {
    constructor() {
        super();
        this.DaoName = DaoType_1.DaoType.AreaDao;
        this.ModelName = Table_Map_1.TableMap.Area;
    }
    findAreaResourceCascadeList(searchModel, serverType) {
        return _Dao_1._Dao.excute(this.getUrl(AreaDao.FIND_AREA_RESOURCE_CASCADE_LIST_URL, serverType), searchModel);
    }
    findAreaListByAreaId(areaId, serverType) {
        return _Dao_1._Dao.excute(this.getUrl(AreaDao.FIND_AREA_LIST_BY_AREA_ID_URL, serverType), { areaId: areaId });
    }
}
AreaDao.FIND_AREA_RESOURCE_CASCADE_LIST_URL = "/baseconfig/findCascadeList";
AreaDao.FIND_AREA_LIST_BY_AREA_ID_URL = "/baseconfig/getAreaListByAreaId";
exports.default = AreaDao;
