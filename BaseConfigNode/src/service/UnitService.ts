import ErrorCode from "../common/res/ErrorCode";
import Where from "../common/Where";
import ChildWhere from "../common/ChildWhere";
import Unit_col from "../model/table-col/Unit_col";
import DataType from "../common/DataType";
import JoinType from "../common/JoinType";
import MatchingType from "../common/MatchingType";
import {TableMap} from "../model/Table-Map";
import OrderBy from "../common/OrderBy";
import {UnitEx} from "../core/entity/ex/UnitEx";
import {Unit} from "../core/entity/Unit";
import {BackResponseBody} from "../core/params/result/ResponseResult";
import {Area} from "../core/entity/Area";
import {UnitListParams} from "../core/params/UnitParams";
import {SearchCascadeModel} from "../core/server/SearchCascadeModel";
import {SearchType} from "../core/server/enum/SearchType";
import {TreeType, TreeIconSkin} from "../core/enum/TreeType";
import AreaDao from '../dao/AreaDao';
import { BeanHelper } from '../common/help/BeanHelper';
import { DaoType } from '../dao/enum/DaoType';
import { ServerType } from '../dao/core/BDaoImpl';
import UnitDao from '../dao/UnitDao';

/**
 * Created by dell on 2017/4/14.
 */
export default class UnitService {

    static findUnitTreeList(params: {areaId: string}) {

        return Promise.resolve(null)
            .then<number|null>(validateParams)
            .then(findUnitTreeList);

        function validateParams() {
            if (!params || !params.areaId) {
                return Promise.reject(ErrorCode.ERROR_NO_PARAM);
            }
            return null;
        }

        function findUnitTreeList() {

            let searchModel = new SearchCascadeModel();
            searchModel.searchType = SearchType.Unit.value;
            searchModel.id = params ? params.areaId : searchModel.id;

            return BeanHelper.getDao<AreaDao>(DaoType.AreaDao).findAreaResourceCascadeList(searchModel).then((res: BackResponseBody<Array<Unit>>)=>{
                if(res.data && res.data.length > 0){
                    let treeType = TreeType.unit.value, iconSkin = TreeIconSkin.Unit;
                    res.data.forEach((model: UnitEx)=>{
                        model.treeType = treeType;
                        model.iconSkin = iconSkin;
                    });
                }
                return res.data;
            });
        }

    }

    static save = function (unit: UnitEx) {
        return Promise.resolve(null).then<Unit|number>(validateUnit).then<Unit|number>(existUnit).then(saveUnit);

        function validateUnit() {
            if (unit && unit.Code != null && unit.ParentArea != null) {
                let model = new Unit();
                model.Code = unit.Code;
                model.AreaID = unit.ParentArea.ID;
                model.Name = unit.Name;
                model.Description = unit.Description;
                return model;
            } else {
                return Promise.reject(ErrorCode.ERROR_UNIT_PARAM_NULL);
            }
        }

        function existUnit(model: Unit) {
            let wheres = new Array<Where>();
            let where = new Where();
            let childWheres = new Array<ChildWhere>();
            let childWhere = new ChildWhere();

            childWhere.FieldName = Unit_col.Code;
            childWhere.FieldType = DataType.Text;
            childWhere.FieldValue = model.Code;
            childWhere.JType = JoinType.And;
            childWhere.MType = MatchingType.Equal;

            childWheres.push(childWhere);
            where.Childs = childWheres;
            wheres.push(where);

            return BeanHelper.getDao<UnitDao>(DaoType.UnitDao).findListByWhere(wheres, ServerType.BCS).then<number|Unit>(afterExistUnit);

            function afterExistUnit(res: BackResponseBody<Array<Unit>>) {
                if (res.data && res.data.length > 0) {
                    return Promise.reject(ErrorCode.ERROR_UNIT_CODE_REPEAT);
                } else {
                    return model;
                }
            }
        }

        function saveUnit(model: Unit) {
            return BeanHelper.getDao<UnitDao>(DaoType.UnitDao).save(model, ServerType.BCS);
        }
    };
    static edit = function (unit: UnitEx) {

        return Promise.resolve(null)
        // 验证unit格式是否正确
            .then<number| null>(validateUnit)
            // Code是否重复
            .then(existCode)
            // 更新Unit
            .then(updateUnit);

        function validateUnit() {
            if (unit.ID == null || unit.ParentArea == null || unit.ParentArea.ID == null || unit.Code == null || unit.Name == null) {
                return Promise.reject(ErrorCode.ERROR_UNIT_PARAM_NULL);
            }
            return null;
        }

        function existCode() {
            let arr: [Promise<BackResponseBody<Array<Unit>>>, Promise<BackResponseBody<Unit>>, Promise<BackResponseBody<Area>>]
                = [findByCode(), findByID(), findAreaByID()];
            //
            return Promise.all(arr).then<number|Unit>(allComplete);

            function findByCode() {
                let wheres = new Array<Where>();
                let where = new Where();
                let childWheres = new Array<ChildWhere>();
                let childWhere = new ChildWhere();

                childWhere.FieldName = Unit_col.Code;
                childWhere.FieldType = DataType.Text;
                childWhere.FieldValue = unit.Code;
                childWhere.JType = JoinType.And;
                childWhere.MType = MatchingType.Equal;
                childWheres.push(childWhere);

                childWhere = new ChildWhere();
                childWhere.FieldName = Unit_col.ID;
                childWhere.FieldType = DataType.Text;
                childWhere.FieldValue = unit.ID;
                childWhere.MType = MatchingType.UnEqual;
                childWhere.JType = JoinType.And;
                childWheres.push(childWhere);

                where.Childs = childWheres;
                wheres.push(where);

                return BeanHelper.getDao<UnitDao>(DaoType.UnitDao).findListByWhere(wheres, ServerType.BCS);
            }

            function findByID() {
                return BeanHelper.getDao<UnitDao>(DaoType.UnitDao).findByID(unit.ID, ServerType.BCS);
            }

            function findAreaByID() {
                return BeanHelper.getDao<AreaDao>(DaoType.AreaDao).findByID(unit.ParentArea.ID, ServerType.BCS);
            }

            function allComplete(res: [BackResponseBody<Array<Unit>>, BackResponseBody<Unit>, BackResponseBody<Area>]) {
                let r1 = res[0];
                let r2 = res[1];
                let r3 = res[2];
                if (r1.data && r1.data.length > 0) {
                    return Promise.reject(ErrorCode.ERROR_UNIT_CODE_REPEAT);
                }
                if (r2.data == null) {
                    return Promise.reject(ErrorCode.ERROR_NO_UNIT);
                }
                if (r3.data == null) {
                    return Promise.reject(ErrorCode.ERROR_NO_AREA);
                }

                let origin: Unit = r2.data;
                origin.AreaID = unit.ParentArea.ID;
                origin.Code = unit.Code;
                origin.Name = unit.Name;
                origin.Description = unit.Description;

                return origin;
            }
        }

        function updateUnit(newUnit: Unit) {
            return BeanHelper.getDao<UnitDao>(DaoType.UnitDao).update(newUnit, ServerType.BCS);
        }
    };
    static deleteById = function (id: string) {
        return Promise.resolve(null).then<number|BackResponseBody<string>>(deleteUnit);

        function deleteUnit() {
            if (id == null) {
                return Promise.reject(ErrorCode.ERROR_NO_PARAM);
            }
            return BeanHelper.getDao<UnitDao>(DaoType.UnitDao).delete([id], ServerType.BCS);
        }

    };
    // TODO 没有使用的代码??
    // static findListByPage = function (params: UnitListParams) {
    //
    //     return Promise.resolve(null).then<number|null>(validateParams).then(findList);
    //
    //     function validateParams() {
    //         if (params.parentId == null) {
    //             return Promise.reject(ErrorCode.ERROR_PARENT_AREA_ID_NULL);
    //         }
    //         return null;
    //     }
    //
    //     function findList() {
    //         let
    //             whereList = [],
    //             where,
    //             childWheres = [],
    //             childWhere;
    //
    //         where = new Where();
    //
    //         childWhere = new ChildWhere();
    //         childWhere.FieldName = Unit_col.AreaID;
    //         childWhere.FieldType = DataType.Text;
    //         childWhere.FieldValue = params.parentId;
    //         childWhere.MType = MatchingType.Equal;
    //         childWhere.JType = JoinType.And;
    //
    //         childWheres.push(childWhere);
    //
    //         where.Childs = childWheres;
    //         whereList.push(where);
    //         return BaseDao.findListByPage(TableMap.Unit, whereList, params.currentPage, params.pageSize);
    //     }
    // };

    static findListByParams = function (params: UnitListParams) {

        return Promise.resolve(null).then<number|null>(validateParams).then(findList);

        function validateParams() {
            if (params.parentId == null) {
                return Promise.reject(ErrorCode.ERROR_PARENT_AREA_ID_NULL);
            }
            return null;
        }

        function findList() {
            let
                whereList = [],
                where,
                childWheres = [],
                childWhere,
                orderByArr = [],
                orderBy;

            where = new Where();

            childWhere = new ChildWhere();
            childWhere.FieldName = Unit_col.AreaID;
            childWhere.FieldType = DataType.Text;
            childWhere.FieldValue = params.parentId;
            childWhere.MType = MatchingType.Equal;
            childWhere.JType = JoinType.And;

            childWheres.push(childWhere);

            where.Childs = childWheres;
            whereList.push(where);

            orderBy = new OrderBy();
            if (params.isAsc && params.sortName) {
                orderBy.IsAsc = params.isAsc;
                orderBy.FieldName = params.sortName;
            } else {
                orderBy.IsAsc = false;
                orderBy.FieldName = Unit_col.PYCode;
            }
            orderByArr.push(orderBy);

            return BeanHelper.getDao<UnitDao>(DaoType.UnitDao).findListByPageWithOrderBy(
                whereList,
                orderByArr,
                params.currentPage,
                params.pageSize,
                ServerType.BCS
            );

        }
    };


    static getUnit(id: string) {

        let unit: UnitEx;

        return Promise.resolve(null)
            .then<number|null>(validate)
            .then(getUnit)
            .then<number|BackResponseBody<Area>>(getParentArea)
            .then(last);

        function validate() {
            if (id == null) {
                return Promise.reject(ErrorCode.ERROR_NO_PARAM);
            }
            return null;
        }

        function getUnit() {
            return BeanHelper.getDao<UnitDao>(DaoType.UnitDao).findByID(id, ServerType.BCS);
        }

        function getParentArea(res: BackResponseBody<Unit>) {
            unit = res.data as UnitEx;
            if (unit) {
                return BeanHelper.getDao<AreaDao>(DaoType.AreaDao).findByID(unit.AreaID, ServerType.BCS);
            } else {
                return Promise.reject(ErrorCode.ERROR_NO_UNIT);
            }
        }

        function last(res: BackResponseBody<Area>) {
            if (res.data) {
                unit.ParentArea = res.data;
            }
            return unit;
        }
    }

    static deleteUnitByIds = function (ids: Array<string>) {
        return Promise.resolve(null)
            .then<number|BackResponseBody<string>>(deleteUnit);

        function deleteUnit() {
            if (ids == null) {
                return Promise.reject(ErrorCode.ERROR_NO_PARAM);
            }
            return BeanHelper.getDao<UnitDao>(DaoType.UnitDao).delete(ids, ServerType.BCS);
        }
    };


}