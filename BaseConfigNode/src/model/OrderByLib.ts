import OrderBy from "../common/OrderBy";

/**
 * @title orderby 排序输出OrderBy
 * @param {string} FieldName
 * @param {boolean} IsAsc
 * @return {OrderBy}
 * @constructor
 */
export function SortAndOrderBy(FieldName: string, IsAsc?: boolean) {
    let orderby = new OrderBy();
    orderby.FieldName = FieldName;
    orderby.IsAsc = !!IsAsc;
    return orderby;
}