"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BDaoImpl_1 = require("./core/BDaoImpl");
const DaoType_1 = require("./enum/DaoType");
const Table_Map_1 = require("../model/Table-Map");
const _Dao_1 = require("./core/_Dao");
const ExtendUtils_1 = require("../utils/ExtendUtils");
class OtherDao extends BDaoImpl_1.BDaoImpl {
    constructor() {
        super();
        this.DaoName = DaoType_1.DaoType.OtherDao;
        this.ModelName = Table_Map_1.TableMap.Other;
    }
    callProcedureForObjectWithPage(procedureParamStatement, currentPage, pageSize) {
        let postData = {};
        postData["procedureParamStatementJson"] = JSON.stringify(procedureParamStatement);
        postData["currentPage"] = currentPage;
        postData["pageSize"] = pageSize;
        console.log(postData);
        return _Dao_1._Dao.excute(this.getUrl(OtherDao.CALLPROCEDURE_FOR_OBJECT_WITH_PAGE_URL, BDaoImpl_1.ServerType.PDP), postData);
    }
    callProcedureWithPage(procedureParamStatement, currentPage, pageSize) {
        let postData = {};
        postData["procedureParamStatementJson"] = JSON.stringify(procedureParamStatement);
        postData["currentPage"] = currentPage;
        postData["pageSize"] = pageSize;
        return _Dao_1._Dao.excute(this.getUrl(OtherDao.CALL_PROCEDURE_WITH_PAGE, BDaoImpl_1.ServerType.PDP), postData);
    }
    callProcedureForObject(procedureParamStatement) {
        let postData = {};
        postData["procedureParamStatementJson"] = JSON.stringify(procedureParamStatement);
        return _Dao_1._Dao.excute(this.getUrl(OtherDao.CALLPROCEDURE_FOR_OBJECT_URL, BDaoImpl_1.ServerType.PDP), postData);
    }
    imageUpload(image, storeType, imageCategory, commandType, detectType) {
        let postData = ExtendUtils_1.extend({}, image, storeType, imageCategory, commandType, detectType);
        return _Dao_1._Dao.excute(this.getUrl(OtherDao.IMAGE_UPLOAD, BDaoImpl_1.ServerType.PDP), postData);
    }
    faceImageUpload(image, storeType, imageCategory) {
        let postData = ExtendUtils_1.extend({}, image, storeType, imageCategory);
        return _Dao_1._Dao.excute(this.getUrl(OtherDao.FACE_IMAGE_UPLOAD, BDaoImpl_1.ServerType.PDP), postData);
    }
}
OtherDao.CALLPROCEDURE_FOR_OBJECT_WITH_PAGE_URL = "/db/callProcedure/forObjectPage";
OtherDao.CALL_PROCEDURE_WITH_PAGE = '/dbCtrl/callProcedureWithPage';
OtherDao.COUNT_BY_WHERE = "/dbCtrl/countByWhere";
OtherDao.UPDATE_LAMPWITH_DEVICE = "/dbCtrl/updateLampWithDevice";
OtherDao.CALLPROCEDURE_FOR_OBJECT_URL = "/dbCtrl/callProcedureForObject";
OtherDao.IMAGE_UPLOAD = "/upload/imageForNode";
OtherDao.FACE_IMAGE_UPLOAD = "/upload/faceImage";
exports.default = OtherDao;
