"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorCode_1 = require("../common/res/ErrorCode");
const Where_1 = require("../common/Where");
const ChildWhere_1 = require("../common/ChildWhere");
const Unit_col_1 = require("../model/table-col/Unit_col");
const DataType_1 = require("../common/DataType");
const JoinType_1 = require("../common/JoinType");
const MatchingType_1 = require("../common/MatchingType");
const OrderBy_1 = require("../common/OrderBy");
const Unit_1 = require("../core/entity/Unit");
const SearchCascadeModel_1 = require("../core/server/SearchCascadeModel");
const SearchType_1 = require("../core/server/enum/SearchType");
const TreeType_1 = require("../core/enum/TreeType");
const BeanHelper_1 = require("../common/help/BeanHelper");
const DaoType_1 = require("../dao/enum/DaoType");
const BDaoImpl_1 = require("../dao/core/BDaoImpl");
class UnitService {
    static findUnitTreeList(params) {
        return Promise.resolve(null)
            .then(validateParams)
            .then(findUnitTreeList);
        function validateParams() {
            if (!params || !params.areaId) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            return null;
        }
        function findUnitTreeList() {
            let searchModel = new SearchCascadeModel_1.SearchCascadeModel();
            searchModel.searchType = SearchType_1.SearchType.Unit.value;
            searchModel.id = params ? params.areaId : searchModel.id;
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.AreaDao).findAreaResourceCascadeList(searchModel).then((res) => {
                if (res.data && res.data.length > 0) {
                    let treeType = TreeType_1.TreeType.unit.value, iconSkin = TreeType_1.TreeIconSkin.Unit;
                    res.data.forEach((model) => {
                        model.treeType = treeType;
                        model.iconSkin = iconSkin;
                    });
                }
                return res.data;
            });
        }
    }
    static getUnit(id) {
        let unit;
        return Promise.resolve(null)
            .then(validate)
            .then(getUnit)
            .then(getParentArea)
            .then(last);
        function validate() {
            if (id == null) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
            }
            return null;
        }
        function getUnit() {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UnitDao).findByID(id, BDaoImpl_1.ServerType.BCS);
        }
        function getParentArea(res) {
            unit = res.data;
            if (unit) {
                return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.AreaDao).findByID(unit.AreaID, BDaoImpl_1.ServerType.BCS);
            }
            else {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_UNIT);
            }
        }
        function last(res) {
            if (res.data) {
                unit.ParentArea = res.data;
            }
            return unit;
        }
    }
}
UnitService.save = function (unit) {
    return Promise.resolve(null).then(validateUnit).then(existUnit).then(saveUnit);
    function validateUnit() {
        if (unit && unit.Code != null && unit.ParentArea != null) {
            let model = new Unit_1.Unit();
            model.Code = unit.Code;
            model.AreaID = unit.ParentArea.ID;
            model.Name = unit.Name;
            model.Description = unit.Description;
            return model;
        }
        else {
            return Promise.reject(ErrorCode_1.default.ERROR_UNIT_PARAM_NULL);
        }
    }
    function existUnit(model) {
        let wheres = new Array();
        let where = new Where_1.default();
        let childWheres = new Array();
        let childWhere = new ChildWhere_1.default();
        childWhere.FieldName = Unit_col_1.default.Code;
        childWhere.FieldType = DataType_1.default.Text;
        childWhere.FieldValue = model.Code;
        childWhere.JType = JoinType_1.default.And;
        childWhere.MType = MatchingType_1.default.Equal;
        childWheres.push(childWhere);
        where.Childs = childWheres;
        wheres.push(where);
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UnitDao).findListByWhere(wheres, BDaoImpl_1.ServerType.BCS).then(afterExistUnit);
        function afterExistUnit(res) {
            if (res.data && res.data.length > 0) {
                return Promise.reject(ErrorCode_1.default.ERROR_UNIT_CODE_REPEAT);
            }
            else {
                return model;
            }
        }
    }
    function saveUnit(model) {
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UnitDao).save(model, BDaoImpl_1.ServerType.BCS);
    }
};
UnitService.edit = function (unit) {
    return Promise.resolve(null)
        .then(validateUnit)
        .then(existCode)
        .then(updateUnit);
    function validateUnit() {
        if (unit.ID == null || unit.ParentArea == null || unit.ParentArea.ID == null || unit.Code == null || unit.Name == null) {
            return Promise.reject(ErrorCode_1.default.ERROR_UNIT_PARAM_NULL);
        }
        return null;
    }
    function existCode() {
        let arr = [findByCode(), findByID(), findAreaByID()];
        return Promise.all(arr).then(allComplete);
        function findByCode() {
            let wheres = new Array();
            let where = new Where_1.default();
            let childWheres = new Array();
            let childWhere = new ChildWhere_1.default();
            childWhere.FieldName = Unit_col_1.default.Code;
            childWhere.FieldType = DataType_1.default.Text;
            childWhere.FieldValue = unit.Code;
            childWhere.JType = JoinType_1.default.And;
            childWhere.MType = MatchingType_1.default.Equal;
            childWheres.push(childWhere);
            childWhere = new ChildWhere_1.default();
            childWhere.FieldName = Unit_col_1.default.ID;
            childWhere.FieldType = DataType_1.default.Text;
            childWhere.FieldValue = unit.ID;
            childWhere.MType = MatchingType_1.default.UnEqual;
            childWhere.JType = JoinType_1.default.And;
            childWheres.push(childWhere);
            where.Childs = childWheres;
            wheres.push(where);
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UnitDao).findListByWhere(wheres, BDaoImpl_1.ServerType.BCS);
        }
        function findByID() {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UnitDao).findByID(unit.ID, BDaoImpl_1.ServerType.BCS);
        }
        function findAreaByID() {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.AreaDao).findByID(unit.ParentArea.ID, BDaoImpl_1.ServerType.BCS);
        }
        function allComplete(res) {
            let r1 = res[0];
            let r2 = res[1];
            let r3 = res[2];
            if (r1.data && r1.data.length > 0) {
                return Promise.reject(ErrorCode_1.default.ERROR_UNIT_CODE_REPEAT);
            }
            if (r2.data == null) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_UNIT);
            }
            if (r3.data == null) {
                return Promise.reject(ErrorCode_1.default.ERROR_NO_AREA);
            }
            let origin = r2.data;
            origin.AreaID = unit.ParentArea.ID;
            origin.Code = unit.Code;
            origin.Name = unit.Name;
            origin.Description = unit.Description;
            return origin;
        }
    }
    function updateUnit(newUnit) {
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UnitDao).update(newUnit, BDaoImpl_1.ServerType.BCS);
    }
};
UnitService.deleteById = function (id) {
    return Promise.resolve(null).then(deleteUnit);
    function deleteUnit() {
        if (id == null) {
            return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
        }
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UnitDao).delete([id], BDaoImpl_1.ServerType.BCS);
    }
};
UnitService.findListByParams = function (params) {
    return Promise.resolve(null).then(validateParams).then(findList);
    function validateParams() {
        if (params.parentId == null) {
            return Promise.reject(ErrorCode_1.default.ERROR_PARENT_AREA_ID_NULL);
        }
        return null;
    }
    function findList() {
        let whereList = [], where, childWheres = [], childWhere, orderByArr = [], orderBy;
        where = new Where_1.default();
        childWhere = new ChildWhere_1.default();
        childWhere.FieldName = Unit_col_1.default.AreaID;
        childWhere.FieldType = DataType_1.default.Text;
        childWhere.FieldValue = params.parentId;
        childWhere.MType = MatchingType_1.default.Equal;
        childWhere.JType = JoinType_1.default.And;
        childWheres.push(childWhere);
        where.Childs = childWheres;
        whereList.push(where);
        orderBy = new OrderBy_1.default();
        if (params.isAsc && params.sortName) {
            orderBy.IsAsc = params.isAsc;
            orderBy.FieldName = params.sortName;
        }
        else {
            orderBy.IsAsc = false;
            orderBy.FieldName = Unit_col_1.default.PYCode;
        }
        orderByArr.push(orderBy);
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UnitDao).findListByPageWithOrderBy(whereList, orderByArr, params.currentPage, params.pageSize, BDaoImpl_1.ServerType.BCS);
    }
};
UnitService.deleteUnitByIds = function (ids) {
    return Promise.resolve(null)
        .then(deleteUnit);
    function deleteUnit() {
        if (ids == null) {
            return Promise.reject(ErrorCode_1.default.ERROR_NO_PARAM);
        }
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.UnitDao).delete(ids, BDaoImpl_1.ServerType.BCS);
    }
};
exports.default = UnitService;
