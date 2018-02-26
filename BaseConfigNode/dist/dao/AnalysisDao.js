"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BDaoImpl_1 = require("./core/BDaoImpl");
const DaoType_1 = require("./enum/DaoType");
const Table_Map_1 = require("../model/Table-Map");
const _Dao_1 = require("./core/_Dao");
class AnalysisDao extends BDaoImpl_1.BDaoImpl {
    constructor() {
        super();
        this.DaoName = DaoType_1.DaoType.AnalysisDao;
        this.ModelName = Table_Map_1.TableMap.Analysis;
    }
    faceAnalysis(params, serverType) {
        return _Dao_1._Dao.excute(this.getUrl(AnalysisDao.FACE_ANALYSIS_URL, serverType), params, true);
    }
    faceTrack(params, serverType) {
        return _Dao_1._Dao.excute(this.getUrl(AnalysisDao.FACE_TRACK_URL, serverType), params, true);
    }
    faceAccompany(params, serverType) {
        return _Dao_1._Dao.excute(this.getUrl(AnalysisDao.FACE_ACCOMPANY_URL, serverType), params, true);
    }
    faceFrequencyAnalysis(params, serverType) {
        return _Dao_1._Dao.excute(this.getUrl(AnalysisDao.FACE_FREQUENCY_ANALYSIS_URL, serverType), params, true);
    }
    faceFrequencyAppear(params, serverType) {
        return _Dao_1._Dao.excute(this.getUrl(AnalysisDao.FACE_FREQUENCY_APPEAR_URL, serverType), params, true);
    }
    delOffLineTask(params, serverType) {
        return _Dao_1._Dao.excute(this.getUrl(AnalysisDao.DEL_OFFLINE_TASK_URL, serverType), params, true);
    }
    realyInfo(params, serverType) {
        return _Dao_1._Dao.excute(this.getUrl(AnalysisDao.REALY_INFO, serverType), params, true);
    }
    personAlarm(params, serverType) {
        return _Dao_1._Dao.excute(this.getUrl(AnalysisDao.PERSON_ALARM, serverType), params, true);
    }
}
AnalysisDao.FACE_ANALYSIS_URL = '/search/searchface';
AnalysisDao.REALY_INFO = '/faceCtrl/searchidnumber';
AnalysisDao.FACE_TRACK_URL = '/faceCtrl/search/accessLog';
AnalysisDao.FACE_ACCOMPANY_URL = '/faceCtrl/accompany/analyse';
AnalysisDao.PERSON_ALARM = '/search/alarmlog';
AnalysisDao.FACE_FREQUENCY_ANALYSIS_URL = '/faceCtrl/frequency/analyse';
AnalysisDao.FACE_FREQUENCY_APPEAR_URL = '/faceCtrl/frequency/appear';
AnalysisDao.DEL_OFFLINE_TASK_URL = '/configCtrl/analyseTask/delete';
exports.default = AnalysisDao;
