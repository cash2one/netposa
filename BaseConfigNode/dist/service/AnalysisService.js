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
const WhereLib_1 = require("../model/WhereLib");
const FildNameLib_1 = require("../model/FildNameLib");
const OrderByLib_1 = require("../model/OrderByLib");
const DaoType_1 = require("../dao/enum/DaoType");
const BeanHelper_1 = require("../common/help/BeanHelper");
class AnalysisService {
    FaceTrack(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.taskId) {
                return Promise.reject(ErrorCode_1.default.ERROR_INVALID_PARAMETER);
            }
            return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.AnalysisDao).faceTrack(params);
        });
    }
    RealyInfo(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(params.ids) || params.ids.length === 0) {
                return Promise.reject(ErrorCode_1.default.ERROR_INVALID_PARAMETER);
            }
            return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.AnalysisDao).realyInfo({ ids: params.ids });
        });
    }
    FaceAnalysis(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.taskId && !params.idCardNumber) {
                return Promise.reject(ErrorCode_1.default.ERROR_INVALID_PARAMETER);
            }
            return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.AnalysisDao).faceAnalysis(params);
        });
    }
    PersonAlarm(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.endTime || !params.startTime || params.startTime > params.endTime) {
                return Promise.reject(ErrorCode_1.default.ERROR_INVALID_PARAMETER);
            }
            return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.AnalysisDao).personAlarm(params);
        });
    }
    Accompanying(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.AnalysisDao).faceAccompany(params);
        });
    }
    findListWithOffLineTask(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.id || (!params.taskType && !params.taskTypeList)) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let wheres = [];
            wheres.push(WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.CreateUser, params.id));
            if (params.taskType) {
                wheres.push(WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.TaskType, params.taskType));
            }
            if (params.taskTypeList) {
                wheres.push(WhereLib_1.InAndWhere(FildNameLib_1.FildNameLib.TaskType, params.taskTypeList));
            }
            let orderBys = [OrderByLib_1.SortAndOrderBy(FildNameLib_1.FildNameLib.CreateTime)];
            return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.IntelligentTaskInfoDao).findListByWhereWithOrderBy(wheres, orderBys);
        });
    }
    delOffLineTask(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params || !params.ids || !Array.isArray(params.ids) || params.ids.length === 0) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.IntelligentTaskInfoDao).delete(params.ids);
        });
    }
    faceFrequencyAnalysis(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.AnalysisDao).faceFrequencyAnalysis(params);
        });
    }
    faceFrequencyAppear(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.AnalysisDao).faceFrequencyAppear(params);
        });
    }
}
exports.AnalysisService = AnalysisService;
