"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorCode_1 = require("../common/res/ErrorCode");
const SearchCascadeModel_1 = require("../core/server/SearchCascadeModel");
const log4js = require("log4js");
const DaoType_1 = require("../dao/enum/DaoType");
const BeanHelper_1 = require("../common/help/BeanHelper");
const BDaoImpl_1 = require("../dao/core/BDaoImpl");
class ReportService {
    constructor() {
    }
    delete(id) {
        return Promise.resolve(null)
            .then(validateParams).then(deleteAreaById);
        function validateParams() {
            if (id == null) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_AREA);
            }
            return null;
        }
        function deleteAreaById() {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.CameraDao).delete([id], BDaoImpl_1.ServerType.BCS);
        }
    }
    findListByPage(reqParams) {
        return Promise.resolve(null)
            .then(() => {
            if (!reqParams || !reqParams.currentPage || !reqParams.pageSize || !reqParams.areaId) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let searchModel = new SearchCascadeModel_1.SearchCascadeModel();
            searchModel.id = reqParams.areaId;
            searchModel.isPage = true;
            searchModel.pageSize = reqParams.pageSize;
            searchModel.pageIndex = reqParams.currentPage;
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.AreaDao).findAreaResourceCascadeList(searchModel, BDaoImpl_1.ServerType.BCS);
        });
    }
}
ReportService.LOGGER = log4js.getLogger("ReportService");
exports.ReportService = ReportService;
