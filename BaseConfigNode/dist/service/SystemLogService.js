"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Promise = require("promise");
const ErrorCode_1 = require("../common/res/ErrorCode");
const DaoType_1 = require("../dao/enum/DaoType");
const BeanHelper_1 = require("../common/help/BeanHelper");
class SystemLogService {
    save(params) {
        return Promise.resolve(null)
            .then(validateParams)
            .then(saveSystemLog);
        function validateParams() {
            if (!params || params.OperatorUser == null || params.OperatorIP == null || params.OperFirstModule == null || params.OperatorTime == null) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            return null;
        }
        function saveSystemLog() {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.SystemLogDao).save(params);
        }
    }
}
exports.SystemLogService = SystemLogService;
