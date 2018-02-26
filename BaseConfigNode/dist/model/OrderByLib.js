"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OrderBy_1 = require("../common/OrderBy");
function SortAndOrderBy(FieldName, IsAsc) {
    let orderby = new OrderBy_1.default();
    orderby.FieldName = FieldName;
    orderby.IsAsc = !!IsAsc;
    return orderby;
}
exports.SortAndOrderBy = SortAndOrderBy;
