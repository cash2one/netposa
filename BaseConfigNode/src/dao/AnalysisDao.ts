import { BDaoImpl } from './core/BDaoImpl';
import { DaoType } from './enum/DaoType';
import { TableMap } from '../model/Table-Map';
import { _Dao } from './core/_Dao';
import { FaceAnalysisParams } from '../core/entity/FaceAnalysisEnum';
import { FaceTrackParams } from '../core/entity/FaceTrackEnum';
import { AccompanyingAnalysis } from '../core/entity/AccompanyingAnalysisEnum';
import { FrequencyAnalysisParams } from '../core/server/FrequencyAnalysisParams';
import { PersonAlarmParams } from '../core/entity/PersonAlarmEnum';
export default class AnalysisDao extends BDaoImpl{
    DaoName = DaoType.AnalysisDao;
    ModelName = TableMap.Analysis;

    private static FACE_ANALYSIS_URL = '/search/searchface';
    private static REALY_INFO = '/faceCtrl/searchidnumber';
    private static FACE_TRACK_URL = '/faceCtrl/search/accessLog';
    private static FACE_ACCOMPANY_URL = '/faceCtrl/accompany/analyse';
    private static PERSON_ALARM = '/search/alarmlog';
    private static FACE_FREQUENCY_ANALYSIS_URL = '/faceCtrl/frequency/analyse';
    private static FACE_FREQUENCY_APPEAR_URL = '/faceCtrl/frequency/appear';
    private static DEL_OFFLINE_TASK_URL = '/configCtrl/analyseTask/delete';

    constructor(){
        super()
    }

    /**
     * @title 人脸分析检索
     * @param params {}
     * @param serverType
     */
    faceAnalysis(params: FaceAnalysisParams, serverType?: string) {
        return _Dao.excute(this.getUrl(AnalysisDao.FACE_ANALYSIS_URL, serverType), params, true);
    }

    /**
     * @title 人脸轨迹检索
     * @param {FaceTrackParams} params
     * @param {string} serverType
     * @return {Promise<>}
     */
    faceTrack(params:FaceTrackParams, serverType?: string) {
        return _Dao.excute(this.getUrl(AnalysisDao.FACE_TRACK_URL, serverType), params, true);
    }

    /**
     * @title 人脸伴随检索
     * @param {AccompanyingAnalysis} params
     * @param {string} serverType
     * @return {Promise<>}
     */
    faceAccompany(params:AccompanyingAnalysis, serverType?: string) {
        return _Dao.excute(this.getUrl(AnalysisDao.FACE_ACCOMPANY_URL, serverType), params, true);
    }

    /**
     * @title 人脸频次分析
     * @param params
     * @param serverType
     * @return {Promise}
     */
    faceFrequencyAnalysis(params:FrequencyAnalysisParams, serverType?: string) {
        return _Dao.excute(this.getUrl(AnalysisDao.FACE_FREQUENCY_ANALYSIS_URL, serverType), params, true);
    }

    /**
     * @title 人脸频繁出没
     * @param params
     * @param serverType
     * @return {Promise}
     */
    faceFrequencyAppear(params: any/* FrequencyAppearParams */, serverType?: string) {
        return _Dao.excute(this.getUrl(AnalysisDao.FACE_FREQUENCY_APPEAR_URL, serverType), params, true);
    }

    /**
     * @title 删除离线任务
     * @param params
     * @param serverType
     * @return {Promise}
     */
    delOffLineTask(params:any, serverType?: string) {
        return _Dao.excute(this.getUrl(AnalysisDao.DEL_OFFLINE_TASK_URL, serverType), params, true);
    }

    /**
     * @title 人脸1:N
     * @param {{ids: Array<string>}} params
     * @param {string} serverType
     * @return {Promise<any>}
     */
    realyInfo(params:{ids: Array<string>}, serverType?: string){
        return _Dao.excute(this.getUrl(AnalysisDao.REALY_INFO, serverType), params, true);
    }

    /**
     * @title 人脸报警
     * @param params
     * @param serverType
     * @return {Promise}
     *
     */
    personAlarm(params: PersonAlarmParams, serverType?: string) {
        return _Dao.excute(this.getUrl(AnalysisDao.PERSON_ALARM, serverType), params, true);
    }


}
