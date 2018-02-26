import {CarMonitor, MacMonitor, TaskModel} from "../core/server/TaskModel";
import { BDaoImpl } from './core/BDaoImpl';
import { DaoType } from './enum/DaoType';
import { TableMap } from '../model/Table-Map';
import { _Dao } from './core/_Dao';
export default class TaskConfigDao extends BDaoImpl{
    DaoName: string = DaoType.TaskConfigDao;
    ModelName: string = TableMap.TaskConfig;
    private static FACE_TASK_ADD_OR_UPDATE = '/videoTask/operateTask';
    private static CAR_TASK_ADD_OR_UPDATE = '/vehicleTask/operateTask';
    private static RFID_TASK_ADD_OR_UPDATE = '/macTask/operateTask';

    constructor(){
        super()
    }
    /**
     * @title 提交人像布控任务
     * @param params
     * @param serverType
     * @return {Promise}
     */
    addOrUpdateFace(params:TaskModel, serverType?: string){
        return _Dao.excute(this.getUrl(TaskConfigDao.FACE_TASK_ADD_OR_UPDATE, serverType), params, true);
    }

    /**
     * @title 提交车辆布控任务
     * @param params
     * @param serverType
     * @return {Promise}
     */
    addOrUpdateCar(params:CarMonitor, serverType?: string){
        return _Dao.excute(this.getUrl(TaskConfigDao.CAR_TASK_ADD_OR_UPDATE, serverType), params, true);
    }

    /**
     * @title 提交RFID布控任务
     * @param params
     * @param serverType
     * @return {Promise}
     */
    addOrUpdateRfid(params:MacMonitor, serverType?: string){
        return _Dao.excute(this.getUrl(TaskConfigDao.RFID_TASK_ADD_OR_UPDATE, serverType), params, true);
    }

}
