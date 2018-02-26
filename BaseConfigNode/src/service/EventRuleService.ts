import ErrorCode from "../common/res/ErrorCode";
import {BackResponseBody} from "../core/params/result/ResponseResult";
import * as log4js from "log4js";
import * as util from "util";
import {EventRuleParams} from "../core/params/EventRuleParams";
import {EventRule, EventRuleActionModel} from "../core/entity/EventRule";
import Where from "../common/Where";
import { ServerType } from '../dao/core/BDaoImpl';
import {
    StartAndEndForTimeWhere, EqualLikeWhere, EqualAndWhere, EqualBooleanAndWhere,
    InAndWhere
} from "../model/WhereLib";
import {EventRuleCol} from "../model/table-col/EventRule_col";
import {TableMap} from "../model/Table-Map";
import {EventRuleAction, EventRuleEx} from "../core/entity/ex/EventRuleEx";
import {EventRuleActionCol} from "../model/table-col/EventRuleAction_col";
import {DaoType} from '../dao/enum/DaoType';
import {BeanHelper} from '../common/help/BeanHelper';
import EventRuleDao from '../dao/EventRuleDao';
import EventRuleActionDao from '../dao/EventRuleActionDao';
import AreaExt from "../extend/Area";
import {FildNameLib} from "../model/FildNameLib";
import EventRuleTriggerDao from "../dao/EventRuleTriggerDao";

export interface IEventRuleService {
    findList(params: EventRuleParams): Promise<BackResponseBody<Array<EventRule>>>;

    findAll(): Promise<BackResponseBody<Array<EventRule>>>;

    //edit(models: any): Promise<boolean>;

    //update(models: any): Promise<boolean>;


    saveOrUpdate(models: EventRuleEx): Promise<BackResponseBody<string>>;

    detail(id: string): Promise<BackResponseBody<EventRuleEx>>;

    delete(id: string): Promise<BackResponseBody<boolean>>;

    deleteByIds(ids: Array<string>): Promise<BackResponseBody<string>>;
}

export class EventRuleService implements IEventRuleService {
    static LOGGER = log4js.getLogger("EventRuleService");

    /**
     * @title 根据参数获取联动预案列表
     * @returns {Promise<Array<EventRule>>}
     * @create hjj
     * @time 2017年11月17日 19:53:04
     */
    async findList(params: EventRuleParams): Promise<BackResponseBody<Array<EventRule>>> {
        if (!params.AreaID) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM)
        }
        let wheres = [] as Array<Where>;
        let areaIds = await AreaExt.findAreaForParentAreaIDs(params.AreaID);
        wheres.push(InAndWhere(FildNameLib.AreaID, areaIds));
        wheres.push(EqualBooleanAndWhere(FildNameLib.IsTemplate, true));
        if (params.Name) {
            wheres.push(EqualLikeWhere(EventRuleCol.Name, params.Name))
        }
        if (params.startTime && params.endTime && params.endTime > params.startTime) {
            wheres.push(StartAndEndForTimeWhere(EventRuleCol.CreateTime, params.startTime, EventRuleCol.CreateTime, params.endTime))
        }

        wheres.push(EqualBooleanAndWhere(EventRuleCol.IsTemplate, true));
        return await BeanHelper.getDao<EventRuleDao>(DaoType.EventRuleDao).findListByPageWithOrderBy(
            wheres, [], params.currentPage ? params.currentPage : 1, params.pageSize ? params.pageSize : 10);
    }

    /**zjh
     * @param ids 
     */
    async deleteByIds(ids: Array<string>) {
        if (!ids) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM)
        }
        let result = await Promise.all([
            BeanHelper.getDao<EventRuleDao>(DaoType.EventRuleDao).delete(ids),
            BeanHelper.getDao<EventRuleActionDao>(DaoType.EventRuleActionDao).deleteByWhere([InAndWhere(FildNameLib.EventRuleID, ids)]),
            BeanHelper.getDao<EventRuleTriggerDao>(DaoType.EventRuleTriggerDao).deleteByWhere([InAndWhere(FildNameLib.EventRuleID, ids)]),
        ]);
        result[0].data = result[0].data && result[1].data && result[2].data as boolean;
        return result[0];
    };


    /**
     * @create hjj
     * @time 2017年11月18日 12:54:02
     * @title 获取所以联动规则模版
     * @return {Promise<void>}
     */
    async findAll(): Promise<BackResponseBody<Array<EventRule>>> {
        let wheres = [] as Array<Where>;
        wheres.push(EqualBooleanAndWhere(EventRuleCol.IsTemplate, true));
        return await BeanHelper.getDao<EventRuleDao>(DaoType.EventRuleDao).findListByWhere(wheres);
    }

    /**
     * @title 查询联动源详情
     * @create hjj
     * @time 2017年11月17日 19:52:48
     * @param {string} id
     * @return {Promise<BackResponseBody<EventRuleEx>>}
     */
    async detail(id: string): Promise<BackResponseBody<EventRuleEx>> {
        if (!id) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM)
        }
        // let result = await PosaDPDao.findByID(TableMap.EventRule, id) as BackResponseBody<EventRuleEx>;
        let result = await BeanHelper.getDao<EventRuleDao>(DaoType.EventRuleDao).findByID(id) as BackResponseBody<EventRuleEx>;
        if (!result.data || result.code !== 200) {
            return Promise.reject(ErrorCode.ERROR_BACK_ERROR)
        }
        let ruleActionRes = await BeanHelper.getDao<EventRuleActionDao>(DaoType.EventRuleActionDao).findListByWhere(
            [EqualAndWhere(EventRuleActionCol.EventRuleID, id)]) as BackResponseBody<Array<EventRuleActionModel>>;
        if (Array.isArray(ruleActionRes.data) && ruleActionRes.data.length > 0) {
            let rule = EventRuleService.resetRuleActionResult(ruleActionRes.data);
            result.data.EventRuleAction = rule.EventRuleAction;
        }
        return result;

    }

    async delete(id: string) {
        if (!id) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM)
        }
        let result = await Promise.all([
            BeanHelper.getDao<EventRuleDao>(DaoType.EventRuleDao).delete([id]),
            BeanHelper.getDao<EventRuleActionDao>(DaoType.EventRuleActionDao).deleteByWhere([EqualAndWhere(FildNameLib.EventRuleID, id)]),
            BeanHelper.getDao<EventRuleTriggerDao>(DaoType.EventRuleTriggerDao).deleteByWhere([EqualAndWhere(FildNameLib.EventRuleID, id)]),
        ]);
        result[0].data = result[0].data && result[1].data && result[2].data as boolean;
        return result[0];
    };

    /**
     * @title 新增联动规则
     * @create hjj
     * @time 2017年11月17日 19:54:04
     * @param {EventRuleEx} params
     * @return {Promise<BackResponseBody<string>>}
     */
    async saveOrUpdate(params: EventRuleEx): Promise<BackResponseBody<string>> {
        let isUpdate: boolean = false;
        if (params.ID) {
            isUpdate = true
        }
        let res = await EventRuleService.saveEventRule(params, isUpdate, params.ID);
        let ruleAction = EventRuleService.resetRuleActionParams(params, res.data) as Array<EventRuleActionModel>;
        await EventRuleService.saveEventRuleAction(ruleAction, isUpdate, params.ID) as BackResponseBody<string>;
        return res;
    }

    /**
     * @title 保存联动规则动作
     * @param {Array<EventRuleActionModel>} list
     * @param isUpdate
     * @param eventRuleID
     * @return {Promise}
     */
    static async saveEventRuleAction(list: Array<EventRuleActionModel>, isUpdate?: boolean, eventRuleID?: string) {
        console.log(isUpdate, eventRuleID);
        if (isUpdate) {
            await BeanHelper.getDao<EventRuleActionDao>(DaoType.EventRuleActionDao).deleteByWhere([EqualAndWhere(FildNameLib.EventRuleID, eventRuleID)])
        }
        let res = await BeanHelper.getDao<EventRuleActionDao>(DaoType.EventRuleActionDao).addList(list) as BackResponseBody<string>;
        if (res.code !== 200) {
            return Promise.reject(res.code);
        } else {
            return res;
        }
    }

    /**
     * @title 保存联动规则基本信息
     * @param {EventRuleEx} params
     * @param {boolean} isUpdate
     * @param {string} id
     * @return {Promise}
     */
    static async saveEventRule(params: EventRuleEx, isUpdate?: boolean, id?: string) {
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
        } as EventRule;
        if (isUpdate) {
            //TODO 写法解决ts验证报错
            id ? (model.ID = id) : null;
            await BeanHelper.getDao<EventRuleDao>(DaoType.EventRuleDao).update(model);
            let res = new BackResponseBody<string>();
            res.code = ErrorCode.OK;
            res.data = id;
            return res;
        } else {
            // let res = await PosaDPDao.save(TableMap.EventRule, model) as BackResponseBody<string>;
            let res = await BeanHelper.getDao<EventRuleDao>(DaoType.EventRuleDao).save(model) as BackResponseBody<string>;
            if (res.code !== 200) {
                return Promise.reject(res.code)
            } else {
                return res;
            }
        }
    }

    // async delete(id: string) {
    //
    // }

    /**
     * @title 解析规则数据转化为EventRuleActionModel
     * @create hjj
     * @time 2017年11月17日 19:54:59
     * @param {EventRuleEx} params
     * @param {string} eventRuleId
     * @param {string} eventRuleTriggerId
     * @return {Array<EventRuleActionModel>}
     */
    static resetRuleActionParams(params: EventRuleEx, eventRuleId: string, eventRuleTriggerId?: string): Array<EventRuleActionModel> {
        let list = [] as Array<EventRuleActionModel>;
        let eventRuleAction = params.EventRuleAction as { [key: string]: any } & EventRuleAction;
        if (eventRuleAction) {
            for (let key in eventRuleAction) {
                list.push({
                    EventRuleID: eventRuleId,
                    EventRuleTriggerID: eventRuleTriggerId ? eventRuleTriggerId : null,
                    ActionType: key,
                    Ext: JSON.stringify(eventRuleAction[key])
                } as EventRuleActionModel)
            }
        }
        return list
    }


    /**
     * @title EventRuleActionModel转化为EventRuleAction
     * @create hjj
     * @time 2017年11月17日 19:56:08
     * @param {Array<EventRuleActionModel>} list
     * @return {EventRuleEx}
     */
    static resetRuleActionResult(list: Array<EventRuleActionModel>): EventRuleEx {
        let model = {} as EventRuleEx;
        let eventRuleAction = {} as { [key: string]: any } & EventRuleAction;
        list.forEach((item: EventRuleActionModel) => {
            try {
                eventRuleAction[item.ActionType] = JSON.parse(item.Ext);
                model.EventRuleAction = eventRuleAction;
            } catch (e) {
                EventRuleService.LOGGER.error(util.format('JSON parse error %s', item.Ext))
            }
        });
        return model;
    }

    constructor() {
    }

}