import ResourceParams from '../core/params/ResourceParams'
import { BDaoImpl } from './core/BDaoImpl';
import { DaoType } from './enum/DaoType';
import { TableMap } from '../model/Table-Map';
import { _Dao } from './core/_Dao';

export default class ResourceDao extends BDaoImpl {
    DaoName: string = DaoType.ResourceDao;
    ModelName: string = TableMap.Resource;
    // private static BASE_URL = Config.POSA_CONFIG_SERVER_URL;

    private static getResourceNumUrl = "/resourceState/resourceNumByType";
    private static getTopSearchUrl = "/resourceState/topSearchKeyNum";
    private static getsearchCountByTypeUrl = "/resourceState/searchOperCountByModule";
    private static getResourceNumByTimeUrl = "/resourceState/resourceNumByTime";
    private static getResourceNumByAreaUrl = "/resourceState/resourceItem";
    private static getCarCountByType = "/resourceState/carCountByType";
    private static getCarCountByColor = "/resourceState/carCountByColor";
    private static getDataServiceNumUrl = "/resourceState/dataServiceNum";
    private static getAlarmDeviceNumUrl = "/resourceState/deviceItem";

    // deviceItem
    getAlarmDeviceNum(params: ResourceParams, serverType?: string) {
        return _Dao.excute(this.getUrl(ResourceDao.getAlarmDeviceNumUrl, serverType), params, true, true);
    }

    getDataServiceNum(params: ResourceParams, serverType?: string) {
        return _Dao.excute(this.getUrl(ResourceDao.getDataServiceNumUrl, serverType), params, true, true);
    }

    getResourceNumByArea(params: ResourceParams, serverType?: string): Promise<any> {
        return _Dao.excute(this.getUrl(ResourceDao.getResourceNumByAreaUrl, serverType), params, true, true);
    }

    getResourceNumByTime(params: ResourceParams, serverType?: string) {
        return _Dao.excute(this.getUrl(ResourceDao.getResourceNumByTimeUrl, serverType), params, true, true);
    }

    getResourceNumByType(resourceType: String, serverType?: string) {
        return _Dao.excute(this.getUrl(ResourceDao.getResourceNumUrl, serverType), { 'objectType': resourceType }, false, true);
    }

    searchOperCountByModule(params: ResourceParams | any, serverType?: string) {
        return _Dao.excute(this.getUrl(ResourceDao.getsearchCountByTypeUrl, serverType), params, true, true);
    }

    carCountByColor(params: ResourceParams | any, serverType?: string) {
        return _Dao.excute(this.getUrl(ResourceDao.getCarCountByColor, serverType), params, true, true);
    }

    carCountByType(params: ResourceParams | any, serverType?: string) {
        return _Dao.excute(this.getUrl(ResourceDao.getCarCountByType, serverType), params, true, true);
    }


    topSearch(params: ResourceParams | any, serverType?: string) {
        params.topNum = 10;
        return _Dao.excute(this.getUrl(ResourceDao.getTopSearchUrl, serverType), params, true, true);
    }

    // 通用接口
    resourceGeneral(params: ResourceParams, url: string) {
        return _Dao.excute(url, params, true, true);
    }
}
