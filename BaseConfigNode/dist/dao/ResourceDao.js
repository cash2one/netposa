"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BDaoImpl_1 = require("./core/BDaoImpl");
const DaoType_1 = require("./enum/DaoType");
const Table_Map_1 = require("../model/Table-Map");
const _Dao_1 = require("./core/_Dao");
class ResourceDao extends BDaoImpl_1.BDaoImpl {
    constructor() {
        super(...arguments);
        this.DaoName = DaoType_1.DaoType.ResourceDao;
        this.ModelName = Table_Map_1.TableMap.Resource;
    }
    getAlarmDeviceNum(params, serverType) {
        return _Dao_1._Dao.excute(this.getUrl(ResourceDao.getAlarmDeviceNumUrl, serverType), params, true, true);
    }
    getDataServiceNum(params, serverType) {
        return _Dao_1._Dao.excute(this.getUrl(ResourceDao.getDataServiceNumUrl, serverType), params, true, true);
    }
    getResourceNumByArea(params, serverType) {
        return _Dao_1._Dao.excute(this.getUrl(ResourceDao.getResourceNumByAreaUrl, serverType), params, true, true);
    }
    getResourceNumByTime(params, serverType) {
        return _Dao_1._Dao.excute(this.getUrl(ResourceDao.getResourceNumByTimeUrl, serverType), params, true, true);
    }
    getResourceNumByType(resourceType, serverType) {
        return _Dao_1._Dao.excute(this.getUrl(ResourceDao.getResourceNumUrl, serverType), { 'objectType': resourceType }, false, true);
    }
    searchOperCountByModule(params, serverType) {
        return _Dao_1._Dao.excute(this.getUrl(ResourceDao.getsearchCountByTypeUrl, serverType), params, true, true);
    }
    carCountByColor(params, serverType) {
        return _Dao_1._Dao.excute(this.getUrl(ResourceDao.getCarCountByColor, serverType), params, true, true);
    }
    carCountByType(params, serverType) {
        return _Dao_1._Dao.excute(this.getUrl(ResourceDao.getCarCountByType, serverType), params, true, true);
    }
    topSearch(params, serverType) {
        params.topNum = 10;
        return _Dao_1._Dao.excute(this.getUrl(ResourceDao.getTopSearchUrl, serverType), params, true, true);
    }
    resourceGeneral(params, url) {
        return _Dao_1._Dao.excute(url, params, true, true);
    }
}
ResourceDao.getResourceNumUrl = "/resourceState/resourceNumByType";
ResourceDao.getTopSearchUrl = "/resourceState/topSearchKeyNum";
ResourceDao.getsearchCountByTypeUrl = "/resourceState/searchOperCountByModule";
ResourceDao.getResourceNumByTimeUrl = "/resourceState/resourceNumByTime";
ResourceDao.getResourceNumByAreaUrl = "/resourceState/resourceItem";
ResourceDao.getCarCountByType = "/resourceState/carCountByType";
ResourceDao.getCarCountByColor = "/resourceState/carCountByColor";
ResourceDao.getDataServiceNumUrl = "/resourceState/dataServiceNum";
ResourceDao.getAlarmDeviceNumUrl = "/resourceState/deviceItem";
exports.default = ResourceDao;
