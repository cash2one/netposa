"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BDaoImpl_1 = require("./core/BDaoImpl");
const DaoType_1 = require("./enum/DaoType");
const Table_Map_1 = require("../model/Table-Map");
const _Dao_1 = require("./core/_Dao");
class OperationsDao extends BDaoImpl_1.BDaoImpl {
    constructor() {
        super(...arguments);
        this.DaoName = DaoType_1.DaoType.OperationsDao;
        this.ModelName = Table_Map_1.TableMap.Operations;
    }
    areaTaskStatistic(serverType) {
        let postData = {};
        return _Dao_1._Dao.excute(this.getUrl(OperationsDao.AREA_TASK_STATISTIC, serverType), postData, true);
    }
    controlTaskStatistic(areaId, serverType) {
        let postData = {};
        return _Dao_1._Dao.excute(this.getUrl(OperationsDao.CONTROL_TASK_STATISTIC, serverType), postData);
    }
    userStatus(params, serverType) {
        return _Dao_1._Dao.excute(this.getUrl(OperationsDao.SYSTEM_USER_LIST, serverType), params);
    }
    getDeviceStatus(params, serverType) {
        return _Dao_1._Dao.excute(this.getUrl(OperationsDao.DEVICE_STATUS_URL, serverType), params);
    }
    getDeviceAlarmStatus(params, serverType) {
        return _Dao_1._Dao.excute(this.getUrl(OperationsDao.DEVICE_ALARM_STATUS_URL, serverType), params);
    }
    logManagement(params, serverType) {
        return _Dao_1._Dao.excute(this.getUrl(OperationsDao.LOG_MANAGEMENT, serverType), params);
    }
    getDevicesStatusModule(params, serverType) {
        return _Dao_1._Dao.excute(this.getUrl(OperationsDao.DEVICE_STATUS, serverType), params);
    }
    getServerStatusModule(params, serverType) {
        return _Dao_1._Dao.excute(this.getUrl(OperationsDao.SERVER_STATUS, serverType), params);
    }
    dispatchedAboutAlarm(params, serverType) {
        return _Dao_1._Dao.excute(this.getUrl(OperationsDao.DISPATCHED_ABOUT_ALARM, serverType), params, true);
    }
}
OperationsDao.AREA_TASK_STATISTIC = "/netManagerCtrl/areaStructTask/statistic";
OperationsDao.CONTROL_TASK_STATISTIC = "/netManagerCtrl/libCascadeTask/statistic";
OperationsDao.SYSTEM_USER_LIST = "/netManagerCtrl/sysUser/list";
OperationsDao.DEVICE_STATUS_URL = "/netManagerCtrl/device/statistic";
OperationsDao.DEVICE_ALARM_STATUS_URL = "/resourceState/resourceNumByType";
OperationsDao.LOG_MANAGEMENT = "/netManagerCtrl/operaLog/list";
OperationsDao.DEVICE_STATUS = "/netManagerCtrl/deviceState/list";
OperationsDao.SERVER_STATUS = "/netManagerCtrl/serverState/list";
OperationsDao.DISPATCHED_ABOUT_ALARM = "/resourceState/statisticAlarmByType";
exports.default = OperationsDao;
