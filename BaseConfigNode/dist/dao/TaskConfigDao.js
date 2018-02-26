"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BDaoImpl_1 = require("./core/BDaoImpl");
const DaoType_1 = require("./enum/DaoType");
const Table_Map_1 = require("../model/Table-Map");
const _Dao_1 = require("./core/_Dao");
class TaskConfigDao extends BDaoImpl_1.BDaoImpl {
    constructor() {
        super();
        this.DaoName = DaoType_1.DaoType.TaskConfigDao;
        this.ModelName = Table_Map_1.TableMap.TaskConfig;
    }
    addOrUpdateFace(params, serverType) {
        return _Dao_1._Dao.excute(this.getUrl(TaskConfigDao.FACE_TASK_ADD_OR_UPDATE, serverType), params, true);
    }
    addOrUpdateCar(params, serverType) {
        return _Dao_1._Dao.excute(this.getUrl(TaskConfigDao.CAR_TASK_ADD_OR_UPDATE, serverType), params, true);
    }
    addOrUpdateRfid(params, serverType) {
        return _Dao_1._Dao.excute(this.getUrl(TaskConfigDao.RFID_TASK_ADD_OR_UPDATE, serverType), params, true);
    }
}
TaskConfigDao.FACE_TASK_ADD_OR_UPDATE = '/videoTask/operateTask';
TaskConfigDao.CAR_TASK_ADD_OR_UPDATE = '/vehicleTask/operateTask';
TaskConfigDao.RFID_TASK_ADD_OR_UPDATE = '/macTask/operateTask';
exports.default = TaskConfigDao;
