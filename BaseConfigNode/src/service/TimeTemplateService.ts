///<reference path="../core/entity/TimeTemplate.ts"/>
import Where from "../common/Where";
import ErrorCode from "../common/res/ErrorCode";
import {BackResponseBody, PageResult} from "../core/params/result/ResponseResult";

import {TimeTemplateListParams} from "../core/params/TimeTemplateParams";
import {TimeTemplate} from "../core/entity/TimeTemplate";
import OrderBy from "../common/OrderBy";
import {BeanHelper} from '../common/help/BeanHelper';
import {DaoType} from '../dao/enum/DaoType';
import TimeTemplateDao from '../dao/TimeTemplateDao';
import {FildNameLib} from "../model/FildNameLib";
import {EqualAndWhere, EqualBooleanAndWhere, StartAndEndForTimeWhere,EqualLikeWhere} from "../model/WhereLib";
import {SortAndOrderBy} from "../model/OrderByLib";

/** create by zxq
 * @time: 2017-06-24 17:28:46
 */
export interface ITimeTemplateService {
    // 根据参数获取 列表 （分页、关键字）
    findListByParams(params: TimeTemplateListParams): Promise<BackResponseBody<PageResult<TimeTemplate>>>;

    findAll(): Promise<BackResponseBody<PageResult<TimeTemplate>>>;

    save(params: TimeTemplate): Promise<BackResponseBody<string>>;

    update(params: TimeTemplate): Promise<BackResponseBody<string> | number>;

    deleteByIds(params: Array<string>): Promise<BackResponseBody<boolean>>;
}

export class TimeTemplateService implements ITimeTemplateService {
    constructor() {
    }

    async findListByParams(params: TimeTemplateListParams): Promise<BackResponseBody<PageResult<TimeTemplate>>> {
        if (!params) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM);
        }
        let wheres = [] as  Array<Where>;
        let orderBys = [] as Array<OrderBy>;
        wheres.push(EqualBooleanAndWhere(FildNameLib.IsTemplate,true));
        orderBys.push(SortAndOrderBy(FildNameLib.CreateTime));
        if (params.keyword) {
            wheres.push(EqualLikeWhere(FildNameLib.Name, params.keyword))
        }
        if (params.startTime && params.endTime) {
            wheres.push(StartAndEndForTimeWhere(FildNameLib.CreateTime, params.startTime, FildNameLib.CreateTime, params.endTime))
        }
        return BeanHelper.getDao<TimeTemplateDao>(DaoType.TimeTemplateDao)
            .findListByPageWithOrderBy(
                wheres,
                orderBys,
                params.currentPage,
                params.pageSize
            );
    }

    findAll(): Promise<BackResponseBody<PageResult<TimeTemplate>>> {
        return BeanHelper.getDao<TimeTemplateDao>(DaoType.TimeTemplateDao).findListByWhere([EqualBooleanAndWhere(FildNameLib.IsTemplate,true)]);
    };

    async save(params: TimeTemplate): Promise<BackResponseBody<string>> {
        if (!params ||
            !params.Name ||
            !params.WeekContent ||
            !params.DayContent
        ) {
            return Promise.reject(ErrorCode.ERROR_SAVE_TIME_TEMPLATE_NO_PARAMS);
        }
        return BeanHelper.getDao<TimeTemplateDao>(DaoType.TimeTemplateDao).save({
            Name: params.Name,
            Description: params.Description,
            WeekContent: params.WeekContent,
            DayContent: params.DayContent,
            IsFullDay: params.IsFullDay,
            CreateTime: params.CreateTime,
            IsTemplate: params.IsTemplate
        } as TimeTemplate);
    };

    async update(params: TimeTemplate): Promise<BackResponseBody<string> | number> {
        if (!params ||
            !params.Name ||
            !params.WeekContent ||
            !params.DayContent
        ) {
            return Promise.reject(ErrorCode.ERROR_SAVE_TIME_TEMPLATE_NO_PARAMS);
        }
        let resp = await BeanHelper.getDao<TimeTemplateDao>(DaoType.TimeTemplateDao).findByID(params.ID);
        if (resp.code === ErrorCode.OK) {
            // 保存
            let model = resp.data;
            model.Name = params.Name;
            model.DayContent = params.DayContent;
            model.WeekContent = params.WeekContent;
            model.Description = params.Description;
            return BeanHelper.getDao<TimeTemplateDao>(DaoType.TimeTemplateDao).update(model);
        } else {
            return Promise.reject(ErrorCode.ERROR_NO_TIME_TEMPLATE);
        }
    };


    deleteByIds(params: Array<string>): Promise<BackResponseBody<boolean>> {
        if (!params || !Array.isArray(params) || params.length === 0) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM);
        }
        return BeanHelper.getDao<TimeTemplateDao>(DaoType.TimeTemplateDao).delete(params);
    }
}