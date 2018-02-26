"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorCode_1 = require("../common/res/ErrorCode");
const log4js = require("log4js");
const ProcedureParamStatement_1 = require("../core/server/ProcedureParamStatement");
const ProcedureType_1 = require("../core/server/enum/ProcedureType");
const DaoType_1 = require("../dao/enum/DaoType");
const BeanHelper_1 = require("../common/help/BeanHelper");
class CheckService {
    constructor() {
    }
    findListByPage(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.userId) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let procParams = new ProcedureParamStatement_1.ProcedureParamStatement();
            procParams.ProcName = ProcedureType_1.PROCEDURE_TYPE.PROC_GET_AUDIT_TASK;
            procParams.JsonProcParams = [params.userId, params.taskType, params.auditStatus, params.timeStart, params.timeEnd];
            return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.OtherDao).callProcedureForObjectWithPage(procParams, Number(params.currentPage), Number(params.pageSize));
        });
    }
}
CheckService.LOGGER = log4js.getLogger("CheckService");
exports.CheckService = CheckService;
