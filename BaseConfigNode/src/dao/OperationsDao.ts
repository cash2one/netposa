import { BDaoImpl } from './core/BDaoImpl';
import { DaoType } from './enum/DaoType';
import { TableMap } from '../model/Table-Map';
import { _Dao, PostData } from './core/_Dao';
import { TaskType } from "../core/server/enum/TaskType";

export default class OperationsDao extends BDaoImpl {
    DaoName = DaoType.OperationsDao;
    ModelName = TableMap.Operations;

    // private static BASE_URL = Config.POSA_CONFIG_SERVER_URL;
    // 区域结构化/布控任务
    private static AREA_TASK_STATISTIC = "/netManagerCtrl/areaStructTask/statistic";
    // 布控库关联任务统计
    private static CONTROL_TASK_STATISTIC = "/netManagerCtrl/libCascadeTask/statistic";
    // 用户状态
    private static SYSTEM_USER_LIST = "/netManagerCtrl/sysUser/list";
    //设备
    private static DEVICE_STATUS_URL = "/netManagerCtrl/device/statistic";
    //设备报警数量统计
    private static DEVICE_ALARM_STATUS_URL = "/resourceState/resourceNumByType";
    // 日志管理logManagement
    private static LOG_MANAGEMENT = "/netManagerCtrl/operaLog/list";
    // 设备状态
    private static DEVICE_STATUS = "/netManagerCtrl/deviceState/list";
    // 服务器状态
    private static SERVER_STATUS = "/netManagerCtrl/serverState/list";
    //布控报警统计
    private static DISPATCHED_ABOUT_ALARM = "/resourceState/statisticAlarmByType";
    // 统计粉刺-任务统计
    private static TASK_STATISTIC = "/netManagerCtrl/task/statistic"

    /**
 * @description 统计分析-任务统计
 * @returns {}
 */
    TaskStatistic(serverType?: string) {
        let postData = {} as PostData;
        return _Dao.excute(this.getUrl(OperationsDao.TASK_STATISTIC, serverType), postData, true);
    }

    /**
     * @description 区域结构化/布控任务
     * @returns {}
     */
    areaTaskStatistic(serverType?: string) {
        let postData = {} as PostData;
        return _Dao.excute(this.getUrl(OperationsDao.AREA_TASK_STATISTIC, serverType), postData, true);
    }

    /**
     * @description 布控库关联任务统计
     * @returns {}
     */
    controlTaskStatistic(areaId?: string, serverType?: string) {
        let postData = {} as PostData;
        return _Dao.excute(this.getUrl(OperationsDao.CONTROL_TASK_STATISTIC, serverType), postData);
    }

    //用户状态
    userStatus(params?: any, serverType?: string): Promise<any> {
        return _Dao.excute(this.getUrl(OperationsDao.SYSTEM_USER_LIST, serverType), params);
    }

    //统计总览获取设备
    getDeviceStatus(params?: any, serverType?: string) {
        return _Dao.excute(this.getUrl(OperationsDao.DEVICE_STATUS_URL, serverType), params);
    }

    //设备报警统计
    getDeviceAlarmStatus(params?: { objectType: string }, serverType?: string) {
        return _Dao.excute(this.getUrl(OperationsDao.DEVICE_ALARM_STATUS_URL, serverType), params as PostData);
    }

    //日志管理
    logManagement(params?: any, serverType?: string) {
        return _Dao.excute(this.getUrl(OperationsDao.LOG_MANAGEMENT, serverType), params as PostData);
    }

    //设备状态
    getDevicesStatusModule(params?: any, serverType?: string) {
        return _Dao.excute(this.getUrl(OperationsDao.DEVICE_STATUS, serverType), params as PostData);
    }

    //服务器状态
    getServerStatusModule(params?: any, serverType?: string) {
        return _Dao.excute(this.getUrl(OperationsDao.SERVER_STATUS, serverType), params as PostData);
    }

    //布控报警
    dispatchedAboutAlarm(params?: any, serverType?: string): Promise<any> {
        return _Dao.excute(this.getUrl(OperationsDao.DISPATCHED_ABOUT_ALARM, serverType), params as PostData, true);
    }
}
