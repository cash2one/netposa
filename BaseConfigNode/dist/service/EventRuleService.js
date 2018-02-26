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
const ResponseResult_1 = require("../core/params/result/ResponseResult");
const log4js = require("log4js");
const util = require("util");
const WhereLib_1 = require("../model/WhereLib");
const EventRule_col_1 = require("../model/table-col/EventRule_col");
const EventRuleAction_col_1 = require("../model/table-col/EventRuleAction_col");
const DaoType_1 = require("../dao/enum/DaoType");
const BeanHelper_1 = require("../common/help/BeanHelper");
const Area_1 = require("../extend/Area");
const FildNameLib_1 = require("../model/FildNameLib");
class EventRuleService {
    constructor() {
    }
    findList(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.AreaID) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let wheres = [];
            let areaIds = yield Area_1.default.findAreaForParentAreaIDs(params.AreaID);
            wheres.push(WhereLib_1.InAndWhere(FildNameLib_1.FildNameLib.AreaID, areaIds));
            wheres.push(WhereLib_1.EqualBooleanAndWhere(FildNameLib_1.FildNameLib.IsTemplate, true));
            if (params.Name) {
                wheres.push(WhereLib_1.EqualLikeWhere(EventRule_col_1.EventRuleCol.Name, params.Name));
            }
            if (params.startTime && params.endTime && params.endTime > params.startTime) {
                wheres.push(WhereLib_1.StartAndEndForTimeWhere(EventRule_col_1.EventRuleCol.CreateTime, params.startTime, EventRule_col_1.EventRuleCol.CreateTime, params.endTime));
            }
            wheres.push(WhereLib_1.EqualBooleanAndWhere(EventRule_col_1.EventRuleCol.IsTemplate, true));
            return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EventRuleDao).findListByPageWithOrderBy(wheres, [], params.currentPage ? params.currentPage : 1, params.pageSize ? params.pageSize : 10);
        });
    }
    deleteByIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ids) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let result = yield Promise.all([
                BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EventRuleDao).delete(ids),
                BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EventRuleActionDao).deleteByWhere([WhereLib_1.InAndWhere(FildNameLib_1.FildNameLib.EventRuleID, ids)]),
                BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EventRuleTriggerDao).deleteByWhere([WhereLib_1.InAndWhere(FildNameLib_1.FildNameLib.EventRuleID, ids)]),
            ]);
            result[0].data = result[0].data && result[1].data && result[2].data;
            return result[0];
        });
    }
    ;
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let wheres = [];
            wheres.push(WhereLib_1.EqualBooleanAndWhere(EventRule_col_1.EventRuleCol.IsTemplate, true));
            return yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EventRuleDao).findListByWhere(wheres);
        });
    }
    detail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let result = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EventRuleDao).findByID(id);
            if (!result.data || result.code !== 200) {
                return Promise.reject(ErrorCode_1.default.ERROR_BACK_ERROR);
            }
            let ruleActionRes = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EventRuleActionDao).findListByWhere([WhereLib_1.EqualAndWhere(EventRuleAction_col_1.EventRuleActionCol.EventRuleID, id)]);
            if (Array.isArray(ruleActionRes.data) && ruleActionRes.data.length > 0) {
                let rule = EventRuleService.resetRuleActionResult(ruleActionRes.data);
                result.data.EventRuleAction = rule.EventRuleAction;
            }
            return result;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            let result = yield Promise.all([
                BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EventRuleDao).delete([id]),
                BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EventRuleActionDao).deleteByWhere([WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.EventRuleID, id)]),
                BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EventRuleTriggerDao).deleteByWhere([WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.EventRuleID, id)]),
            ]);
            result[0].data = result[0].data && result[1].data && result[2].data;
            return result[0];
        });
    }
    ;
    saveOrUpdate(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let isUpdate = false;
            if (params.ID) {
                isUpdate = true;
            }
            let res = yield EventRuleService.saveEventRule(params, isUpdate, params.ID);
            let ruleAction = EventRuleService.resetRuleActionParams(params, res.data);
            yield EventRuleService.saveEventRuleAction(ruleAction, isUpdate, params.ID);
            return res;
        });
    }
    static saveEventRuleAction(list, isUpdate, eventRuleID) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(isUpdate, eventRuleID);
            if (isUpdate) {
                yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EventRuleActionDao).deleteByWhere([WhereLib_1.EqualAndWhere(FildNameLib_1.FildNameLib.EventRuleID, eventRuleID)]);
            }
            let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EventRuleActionDao).addList(list);
            if (res.code !== 200) {
                return Promise.reject(res.code);
            }
            else {
                return res;
            }
        });
    }
    static saveEventRule(params, isUpdate, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let model = {
                Name: params.Name,
                Description: params.Description,
                Disabled: params.Disabled,
                TimeTemplateID: params.TimeTemplateID,
                CreateTime: params.CreateTime ? params.CreateTime : Date.now().toString(),
                AreaID: params.AreaID,
                IsTemplate: params.IsTemplate,
                TaskMonitorType: params.TaskMonitorType,
                Ext: params.Ext
            };
            if (isUpdate) {
                id ? (model.ID = id) : null;
                yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EventRuleDao).update(model);
                let res = new ResponseResult_1.BackResponseBody();
                res.code = ErrorCode_1.default.OK;
                res.data = id;
                return res;
            }
            else {
                let res = yield BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.EventRuleDao).save(model);
                if (res.code !== 200) {
                    return Promise.reject(res.code);
                }
                else {
                    return res;
                }
            }
        });
    }
    static resetRuleActionParams(params, eventRuleId, eventRuleTriggerId) {
        let list = [];
        let eventRuleAction = params.EventRuleAction;
        if (eventRuleAction) {
            for (let key in eventRuleAction) {
                list.push({
                    EventRuleID: eventRuleId,
                    EventRuleTriggerID: eventRuleTriggerId ? eventRuleTriggerId : null,
                    ActionType: key,
                    Ext: JSON.stringify(eventRuleAction[key])
                });
            }
        }
        return list;
    }
    static resetRuleActionResult(list) {
        let model = {};
        let eventRuleAction = {};
        list.forEach((item) => {
            try {
                eventRuleAction[item.ActionType] = JSON.parse(item.Ext);
                model.EventRuleAction = eventRuleAction;
            }
            catch (e) {
                EventRuleService.LOGGER.error(util.format('JSON parse error %s', item.Ext));
            }
        });
        return model;
    }
}
EventRuleService.LOGGER = log4js.getLogger("EventRuleService");
exports.EventRuleService = EventRuleService;
