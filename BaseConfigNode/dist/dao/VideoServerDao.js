"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BDaoImpl_1 = require("./core/BDaoImpl");
const DaoType_1 = require("./enum/DaoType");
const Table_Map_1 = require("../model/Table-Map");
const _Dao_1 = require("./core/_Dao");
class VideoServerDao extends BDaoImpl_1.BDaoImpl {
    constructor() {
        super();
        this.DaoName = DaoType_1.DaoType.VideoServerDao;
        this.ModelName = Table_Map_1.TableMap.VideoServer;
    }
    isHasTask(videoServerIDList, serverType) {
        let stringArr = videoServerIDList.join();
        return _Dao_1._Dao.excute(this.getUrl(VideoServerDao.IS_HAS_TASK_URL, serverType) + "?videoServerIDList=" + stringArr, null, true);
    }
}
VideoServerDao.IS_HAS_TASK_URL = '/config/pvg/isHasTask';
exports.default = VideoServerDao;
