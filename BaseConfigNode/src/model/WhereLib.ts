import Where from "../common/where/Where";
import ChildWhere from "../common/ChildWhere";
import DataType from "../common/DataType";
import MatchingType from "../common/MatchingType";
import JoinType from "../common/JoinType";


/**
 *
 * @param {string} FildName
 * @param {string} FieldValue
 * @return {Where}
 * @constructor
 * @title 通用接口字符串相当的公用where 不满足可在下面新增
 * @update hjj
 * @time 2017年11月7日 13:24:08
 */
export function EqualAndWhere(FildName: string, FieldValue: string): Where {
    let where = new Where();
    let childWheres = [] as Array<ChildWhere>;
    childWheres.push(EqualChildWhere(FildName, FieldValue));
    where.Childs = childWheres;
    return where;
}


/**
 *
 * @param {string} FildName
 * @param {string} FieldValue
 * @return {Where}
 * @constructor
 * @title 通用接口字符串相当的公用where 不满足可在下面新增
 * @update hjj
 * @time 2017年11月7日 13:24:08
 */
export function InAndWhere(FildName: string, FieldValue: Array<string | number>): Where {
    let where = new Where();
    let childWheres = [] as Array<ChildWhere>;
    let childWhere = new ChildWhere();
    childWhere.FieldName = FildName;
    childWhere.FieldValue = FieldValue.join(',');
    childWhere.FieldType = DataType.Text;
    childWhere.MType = MatchingType.Include;
    childWhere.JType = JoinType.And;
    childWheres.push(childWhere);
    where.Childs = childWheres;
    return where;
}

/**
 *
 * @param {string} FildName
 * @param {string} FieldValue
 * @return {Where}
 * @constructor
 */
export function EqualBooleanAndWhere(FildName: string, FieldValue: boolean): Where {
    let where = new Where();
    let childWheres = [] as Array<ChildWhere>;
    let childWhere = new ChildWhere();
    childWhere.FieldName = FildName;
    childWhere.FieldValue = FieldValue;
    childWhere.FieldType = DataType.Boolean;
    childWhere.MType = MatchingType.Equal;
    childWhere.JType = JoinType.And;
    childWheres.push(childWhere);
    where.Childs = childWheres;
    return where;
}

/**
 * @desc Like Where
 * @param {string} FildName
 * @param {string} FieldValue
 * @return {Where}
 * @constructor
 * @title WHere Like
 * @update hjj
 * @time 2017年11月17日 17:12:20
 */
export function EqualLikeWhere(FildName: string, FieldValue: string): Where {
    let where = new Where();
    let childWheres = [] as Array<ChildWhere>;
    childWheres.push(LikeChildWhere(FildName, FieldValue));
    where.Childs = childWheres;
    return where;
}

/**
 * @desc 不等于Where
 * @param {string} FildName
 * @param {string} FieldValue
 * @return {Where}
 * @constructor
 */
export function UnEqualAndWhere(FildName: string, FieldValue: string): Where {
    let where = new Where();
    let childWheres = [] as Array<ChildWhere>;
    let childWhere = new ChildWhere();
    childWhere.FieldName = FildName;
    childWhere.FieldValue = FieldValue;
    childWhere.FieldType = DataType.Text;
    childWhere.MType = MatchingType.UnEqual;
    childWhere.JType = JoinType.And;
    childWheres.push(childWhere);
    where.Childs = childWheres;
    return where;
}

/**
 * @title 获取时间范围Where
 * @param {string} startTimeFildName
 * @param {string} startTimeFieldValue
 * @param {string} endTimeFildName
 * @param {string} endFieldValue
 * @return {Where}
 * @constructor
 */
export function StartAndEndForTimeWhere(
    startTimeFildName: string,
    startTimeFieldValue: string,
    endTimeFildName: string,
    endFieldValue: string): Where {
    let where = new Where();
    let childWheres = [] as Array<ChildWhere>;
    let childWhereStartTime = new ChildWhere();
    childWhereStartTime.FieldName = startTimeFildName;
    childWhereStartTime.FieldValue = startTimeFieldValue;
    childWhereStartTime.FieldType = DataType.DateTime;
    childWhereStartTime.MType = MatchingType.GreaterEqual;
    childWhereStartTime.JType = JoinType.And;
    childWheres.push(childWhereStartTime);

    let childWhereEndTime = new ChildWhere();
    childWhereEndTime.FieldName = endTimeFildName;
    childWhereEndTime.FieldValue = endFieldValue;
    childWhereEndTime.FieldType = DataType.DateTime;
    childWhereEndTime.MType = MatchingType.LessEqual;
    childWhereEndTime.JType = JoinType.And;
    childWheres.push(childWhereEndTime);
    where.Childs = childWheres;
    return where
}


/**
 *
 * @param {string} FildName
 * @param {string} FieldValue
 * @return {ChildWhere}
 * @constructor
 * @title 通用接口字符串相当的公用ChildWhere 不满足可在下面新增
 * @update hjj
 * @time 2017年11月7日 13:24:08
 */
export function EqualChildWhere(FildName: string, FieldValue: string, isOr?: boolean): ChildWhere {
    let childWhere = new ChildWhere();
    childWhere.FieldName = FildName;
    childWhere.FieldValue = FieldValue;
    childWhere.FieldType = DataType.Text;
    childWhere.MType = MatchingType.Equal;
    childWhere.JType = isOr ? JoinType.Or : JoinType.And;
    return childWhere;
}


/**
 *
 * @param {string} FildName
 * @param {string} FieldValue
 * @return {ChildWhere}
 * @constructor
 * @title 通用接口字符串相当的公用ChildWhere 不满足可在下面新增
 * @update hjj
 * @time 2017年11月7日 13:24:08
 */
export function LikeChildWhere(FildName: string, FieldValue: string, isOr?: boolean): ChildWhere {
    let childWhere = new ChildWhere();
    childWhere.FieldName = FildName;
    childWhere.FieldValue = FieldValue;
    childWhere.FieldType = DataType.Text;
    childWhere.MType = MatchingType.Like;
    childWhere.JType = isOr ? JoinType.Or : JoinType.And;
    return childWhere;
}