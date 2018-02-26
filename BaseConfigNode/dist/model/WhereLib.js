"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Where_1 = require("../common/where/Where");
const ChildWhere_1 = require("../common/ChildWhere");
const DataType_1 = require("../common/DataType");
const MatchingType_1 = require("../common/MatchingType");
const JoinType_1 = require("../common/JoinType");
function EqualAndWhere(FildName, FieldValue) {
    let where = new Where_1.default();
    let childWheres = [];
    childWheres.push(EqualChildWhere(FildName, FieldValue));
    where.Childs = childWheres;
    return where;
}
exports.EqualAndWhere = EqualAndWhere;
function InAndWhere(FildName, FieldValue) {
    let where = new Where_1.default();
    let childWheres = [];
    let childWhere = new ChildWhere_1.default();
    childWhere.FieldName = FildName;
    childWhere.FieldValue = FieldValue.join(',');
    childWhere.FieldType = DataType_1.default.Text;
    childWhere.MType = MatchingType_1.default.Include;
    childWhere.JType = JoinType_1.default.And;
    childWheres.push(childWhere);
    where.Childs = childWheres;
    return where;
}
exports.InAndWhere = InAndWhere;
function EqualBooleanAndWhere(FildName, FieldValue) {
    let where = new Where_1.default();
    let childWheres = [];
    let childWhere = new ChildWhere_1.default();
    childWhere.FieldName = FildName;
    childWhere.FieldValue = FieldValue;
    childWhere.FieldType = DataType_1.default.Boolean;
    childWhere.MType = MatchingType_1.default.Equal;
    childWhere.JType = JoinType_1.default.And;
    childWheres.push(childWhere);
    where.Childs = childWheres;
    return where;
}
exports.EqualBooleanAndWhere = EqualBooleanAndWhere;
function EqualLikeWhere(FildName, FieldValue) {
    let where = new Where_1.default();
    let childWheres = [];
    childWheres.push(LikeChildWhere(FildName, FieldValue));
    where.Childs = childWheres;
    return where;
}
exports.EqualLikeWhere = EqualLikeWhere;
function UnEqualAndWhere(FildName, FieldValue) {
    let where = new Where_1.default();
    let childWheres = [];
    let childWhere = new ChildWhere_1.default();
    childWhere.FieldName = FildName;
    childWhere.FieldValue = FieldValue;
    childWhere.FieldType = DataType_1.default.Text;
    childWhere.MType = MatchingType_1.default.UnEqual;
    childWhere.JType = JoinType_1.default.And;
    childWheres.push(childWhere);
    where.Childs = childWheres;
    return where;
}
exports.UnEqualAndWhere = UnEqualAndWhere;
function StartAndEndForTimeWhere(startTimeFildName, startTimeFieldValue, endTimeFildName, endFieldValue) {
    let where = new Where_1.default();
    let childWheres = [];
    let childWhereStartTime = new ChildWhere_1.default();
    childWhereStartTime.FieldName = startTimeFildName;
    childWhereStartTime.FieldValue = startTimeFieldValue;
    childWhereStartTime.FieldType = DataType_1.default.DateTime;
    childWhereStartTime.MType = MatchingType_1.default.GreaterEqual;
    childWhereStartTime.JType = JoinType_1.default.And;
    childWheres.push(childWhereStartTime);
    let childWhereEndTime = new ChildWhere_1.default();
    childWhereEndTime.FieldName = endTimeFildName;
    childWhereEndTime.FieldValue = endFieldValue;
    childWhereEndTime.FieldType = DataType_1.default.DateTime;
    childWhereEndTime.MType = MatchingType_1.default.LessEqual;
    childWhereEndTime.JType = JoinType_1.default.And;
    childWheres.push(childWhereEndTime);
    where.Childs = childWheres;
    return where;
}
exports.StartAndEndForTimeWhere = StartAndEndForTimeWhere;
function EqualChildWhere(FildName, FieldValue, isOr) {
    let childWhere = new ChildWhere_1.default();
    childWhere.FieldName = FildName;
    childWhere.FieldValue = FieldValue;
    childWhere.FieldType = DataType_1.default.Text;
    childWhere.MType = MatchingType_1.default.Equal;
    childWhere.JType = isOr ? JoinType_1.default.Or : JoinType_1.default.And;
    return childWhere;
}
exports.EqualChildWhere = EqualChildWhere;
function LikeChildWhere(FildName, FieldValue, isOr) {
    let childWhere = new ChildWhere_1.default();
    childWhere.FieldName = FildName;
    childWhere.FieldValue = FieldValue;
    childWhere.FieldType = DataType_1.default.Text;
    childWhere.MType = MatchingType_1.default.Like;
    childWhere.JType = isOr ? JoinType_1.default.Or : JoinType_1.default.And;
    return childWhere;
}
exports.LikeChildWhere = LikeChildWhere;
