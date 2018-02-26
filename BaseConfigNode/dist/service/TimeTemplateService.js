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
const BeanHelper_1 = require("../common/help/BeanHelper");
const DaoType_1 = require("../dao/enum/DaoType");
const FildNameLib_1 = require("../model/FildNameLib");
const WhereLib_1 = require("../model/WhereLib");
const OrderByLib_1 = require("../model/OrderByLib");
class TimeTemplateService {
    constructor() {
    }
    findListByParams(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let wheres = [];
            let orderBys = [];
            wheres.push(WhereLib_1.EqualBooleanAndWhere(FildNameLib_1.FildNameLib.IsTemplate, true));
            orderBys.push(OrderByLib_1.SortAndOrderBy(FildNameLib_1.FildNameLib.CreateTime));
            if (params.keyword) {
                wheres.push(WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.Name, params.keyword));
            }
            if (params.startTime && params.endTime) {
                wheres.push(WhereLib_1.StartAndEndForTimeWhere(FildNameLib_1.FildNameLib.CreateTime, params.startTime, FildNameLib_1.FildNameLib.CreateTime, params.endTime));
            }
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.TimeTemplateDao)
                .findListByPageWithOrderBy(wheres, orderBys, params.currentPage, params.pageSize);
        });
    }
    findAll() {
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.TimeTemplateDao).findListByWhere([WhereLib_1.EqualBooleanAndWhere(FildNameLib_1.FildNameLib.IsTemplate, true)]);
    }
    ;
    save(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params ||
                !params.Name ||
                !params.WeekContent ||
                !params.DayContent) {
                return Promise.reject(ErrorCode_1.default.ERROR_SAVE_TIME_TEMPLATE_NO_PARAMS);
            }
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.TimeTemplateDao).save({
                Name: params.Name,
                Description: params.Description,
                WeekContent: params.WeekContent,
                DayContent: params.DayContent,
                IsFullDay: params.IsFullDay,
                CreateTime: params.CreateTime,
                IsTemplate: params.IsTemplate
            });
        });
    }
    ;
    update(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params ||
                !params.Name ||
                !params.WeekContent ||
                !params.DayContent) {
                return Promise.reject(ErrorCode_1.default.ERROR_SAVE_TIME_TEMPLATE_NO_PARAMS);
            }
            let resp = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.TimeTemplateDao).findByID(params.ID);
            if (resp.code === ErrorCode_1.default.OK) {
                let model = resp.data;
                model.Name = params.Name;
                model.DayContent = params.DayContent;
                model.WeekContent = params.WeekContent;
                model.Description = params.Description;
                return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.TimeTemplateDao).update(model);
            }
            else {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_TIME_TEMPLATE);
            }
        });
    }
    ;
    deleteByIds(params) {
        if (!params || !Array.isArray(params) || params.length === 0) {
            return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
        }
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.TimeTemplateDao).delete(params);
    }
}
exports.TimeTemplateService = TimeTemplateService;
