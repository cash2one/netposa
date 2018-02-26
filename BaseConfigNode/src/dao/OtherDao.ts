import {BDaoImpl, ServerType} from './core/BDaoImpl';
import {DaoType} from './enum/DaoType';
import {TableMap} from '../model/Table-Map';
import {ProcedureParamStatement} from '../core/server/ProcedureParamStatement';
import {PostData, _Dao} from './core/_Dao';
import {extend} from '../utils/ExtendUtils';

export default class OtherDao extends BDaoImpl {
    DaoName = DaoType.OtherDao;
    ModelName = TableMap.Other;

    private static CALLPROCEDURE_FOR_OBJECT_WITH_PAGE_URL = "/db/callProcedure/forObjectPage"; // 存储过程带分页
    private static CALL_PROCEDURE_WITH_PAGE = '/dbCtrl/callProcedureWithPage';
    private static COUNT_BY_WHERE = "/dbCtrl/countByWhere";
    private static UPDATE_LAMPWITH_DEVICE = "/dbCtrl/updateLampWithDevice";
    private static CALLPROCEDURE_FOR_OBJECT_URL = "/dbCtrl/callProcedureForObject";
    // 图片上传通用接口
    private static IMAGE_UPLOAD = "/upload/imageForNode";
    // 人脸图片上传接口
    private static FACE_IMAGE_UPLOAD = "/upload/faceImage";

    constructor() {
        super();
    }

    callProcedureForObjectWithPage(procedureParamStatement: ProcedureParamStatement, currentPage: number, pageSize: number) {
        let postData = {} as PostData;
        postData["procedureParamStatementJson"] = JSON.stringify(procedureParamStatement);
        postData["currentPage"] = currentPage;
        postData["pageSize"] = pageSize;
        console.log(postData);
        return _Dao.excute(this.getUrl(OtherDao.CALLPROCEDURE_FOR_OBJECT_WITH_PAGE_URL, ServerType.PDP), postData);
    }

    callProcedureWithPage(procedureParamStatement: ProcedureParamStatement, currentPage: number, pageSize: number) {
        let postData = {} as PostData;
        postData["procedureParamStatementJson"] = JSON.stringify(procedureParamStatement);
        postData["currentPage"] = currentPage;
        postData["pageSize"] = pageSize;
        return _Dao.excute(this.getUrl(OtherDao.CALL_PROCEDURE_WITH_PAGE, ServerType.PDP), postData);
    }

    callProcedureForObject(procedureParamStatement: ProcedureParamStatement) {
        let postData = {} as PostData;
        postData["procedureParamStatementJson"] = JSON.stringify(procedureParamStatement);
        return _Dao.excute(this.getUrl(OtherDao.CALLPROCEDURE_FOR_OBJECT_URL, ServerType.PDP), postData);
    }

    // TODO 需要验证正确性
    imageUpload(image: object, storeType: object, imageCategory: object, commandType: object, detectType: object) {
        let postData = extend({}, image, storeType, imageCategory, commandType, detectType);
        return _Dao.excute(this.getUrl(OtherDao.IMAGE_UPLOAD, ServerType.PDP), postData);
    }

    // TODO 需要验证正确性
    faceImageUpload(image: object, storeType: object, imageCategory: object) {
        let postData = extend({}, image, storeType, imageCategory);
        return _Dao.excute(this.getUrl(OtherDao.FACE_IMAGE_UPLOAD, ServerType.PDP), postData);
    }
}