import { BDaoImpl } from './core/BDaoImpl';
import { DaoType } from './enum/DaoType';
import { TableMap } from '../model/Table-Map';
import { _Dao } from './core/_Dao';
export default class VideoServerDao extends BDaoImpl {
    DaoName = DaoType.VideoServerDao;
    ModelName = TableMap.VideoServer;
    private static IS_HAS_TASK_URL = '/config/pvg/isHasTask';

    constructor() {
        super();
    }
    /**
     * 根据IDs 检查是否有任务正在执行
     *     判断该pvg代理同步的相机是否有任务
     * @param {{ids: Array<string>}} params
     * @param {string} serverType
     * @return {Promise<any>}
     */
    isHasTask(videoServerIDList: Array<string>, serverType?: string){
        let stringArr = videoServerIDList.join();
        return _Dao.excute(this.getUrl(VideoServerDao.IS_HAS_TASK_URL, serverType)+"?videoServerIDList="+stringArr, null, true);
    }
}