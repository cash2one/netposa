
import ErrorCode from "../common/res/ErrorCode";
import Where from "../common/Where";
import ChildWhere from "../common/ChildWhere";
import IodCol from "../model/table-col/Iod_col";
import AreaCol from "../model/table-col/Area_col";
import DataType from "../common/DataType";
import OrderBy from "../common/OrderBy";
import MatchingType from "../common/MatchingType";
import JoinType from "../common/JoinType";
import {TableMap} from "../model/Table-Map";
//import * as log4js from "log4js";
import {BackResponseBody, ResponseResult} from "../core/params/result/ResponseResult";
import {Iod} from "../core/entity/Iod";
import {Area} from "../core/entity/Area";
import {AreaEx} from "../core/entity/ex/AreaEx";
import {TreeParams} from "../core/params/tree/TreeParams";
import {TreeIconSkin, TreeType} from "../core/enum/TreeType";
import { BeanHelper } from '../common/help/BeanHelper';
import { DaoType } from '../dao/enum/DaoType';
import IodDao from '../dao/IodDao';
import AreaDao from '../dao/AreaDao';
import { ServerType } from '../dao/core/BDaoImpl';


export interface IIodService {
    findAreaListTree(params?: TreeParams): Promise<Array<Area>>;
    // findIodListByParams(params: IodTableParams): Promise<BackResponseBody<PageResult<Iod>>|number>;
     save(params: Iod): Promise<BackResponseBody<string>>;
     update(params: Iod): Promise<BackResponseBody<string>>;
     deleteById(id: string): Promise<BackResponseBody<string>>;
     deleteByIds(ids: Array<string>): Promise<BackResponseBody<string>>;
    // detail(id: string): Promise<IodEx>;
    // findIodListWithCamera(search?: string): Promise<Array<IodEx | CameraEx>>;

}

export class IodService implements IIodService {

    //private static LOGGER = log4js.getLogger("IodService");
    findAreaListTree(params?: TreeParams): Promise<Array<AreaEx>> {

        return Promise.resolve(null).then(preFindListByWhere);

        function preFindListByWhere() {
            let
                whereList = [],
                where,
                childWheres = [],
                childWhere,
                orderByArr = [],
                orderBy;

            where = new Where();

            if (params && params.keyword) {
                childWhere = new ChildWhere();
                childWhere.FieldName = AreaCol.Name;
                childWhere.FieldType = DataType.Text;
                childWhere.FieldValue = params.keyword;
                childWhere.MType = MatchingType.Like;
                childWhere.JType = JoinType.Or;
                childWheres.push(childWhere);

                childWhere = new ChildWhere();
                childWhere.FieldName = AreaCol.Code;
                childWhere.FieldType = DataType.Text;
                childWhere.FieldValue = params.keyword;
                childWhere.MType = MatchingType.Like;
                childWhere.JType = JoinType.Or;
                childWheres.push(childWhere);
            }

            where.Childs = childWheres;
            whereList.push(where);

            orderBy = new OrderBy();
            orderBy.FieldName = AreaCol.PYCode;
            orderBy.IsAsc = true;
            orderByArr.push(orderBy);

            return BeanHelper.getDao<AreaDao>(DaoType.AreaDao).findListByWhereWithOrderBy(whereList, orderByArr, ServerType.BCS).then((res: BackResponseBody<Array<Area>>)=>{
                if(res.data && res.data.length > 0){
                    let iconSkin = TreeIconSkin.Area;
                    let treeType = TreeType.area.value;
                    // 遍历数据, 加上树节点类型和图标类型
                    res.data.forEach((model: AreaEx)=>{
                        model.treeType = treeType;
                        model.iconSkin = iconSkin;
                    });
                }
                //console.log(res.data)
                return res.data as Array<AreaEx>;
            });
        }
    }
    save(params: Iod) {
        return Promise.resolve(null).then<null|number>(validateParams).then(saveIod);
        function validateParams() {
            if (!params || params.Code == null || params.Uid == null || params.AreaID == null || params.Pwd == null  || params.IpAddress == null || params.Port == null || params.Name == null) {
                return Promise.reject<number>(ErrorCode.ERROR_NO_PARAM);
            }
            return null;
        }
        function saveIod() {
            // return PosaDPDao.save(TableMap.Iod, params);
            return BeanHelper.getDao<IodDao>(DaoType.IodDao).save(params);
        }


    }

    /**
     * 更新行政区域
     * @param params
     * @returns {Promise<ResponseResult>}
     */
    update(params: Iod) {
        return Promise.resolve(null).then<null|number>(validateParams).then(()=> {
            let arr: [Promise<BackResponseBody<Iod>>, Promise<BackResponseBody<Area>>] = [this.exist(params.Code), this.existById(params.AreaID)];
            return Promise.all(arr);
        }).then<null|number>(existComplete).then(updateIod);

        function validateParams() {
            if (!params || params.Code == null || params.Uid == null || params.AreaID == null || params.Pwd == null  || params.IpAddress == null || params.Port == null || params.Name == null) {
                return Promise.reject<number>(ErrorCode.ERROR_NO_PARAM);
            }
            return null;
        }
        function existComplete(res: [BackResponseBody<Iod>,BackResponseBody<Area>]) {
            let r1 = res[0];
            let r2 = res[1];
            if (r1 && r2) {
                if (!r1.data) {
                    return Promise.reject(ErrorCode.ERROR_REPEAT_IOD);
                } else if(!r2.data) {
                    // 上级行政区域不存在
                    return Promise.reject(ErrorCode.ERROR_AREA_ID_NULL);
                }else{
                    return null;
                }
            } else {
                return Promise.reject(ErrorCode.ERROR);
            }
        }

        function updateIod(){
            // return PosaDPDao.update(TableMap.Iod, params);
            return BeanHelper.getDao<IodDao>(DaoType.IodDao).update(params);
        }
    }

    deleteById(id: string) {
        return Promise.resolve(null)
            .then<number|null>(validateParams)
            .then(deleteIodById);
        function validateParams() {
            // 对IOD ID非空校验
            if (id == null) {
                return Promise.reject<number>(ErrorCode.ERROR_NO_AREA);
            }
            return null;
        }
        function deleteIodById() {
            // return PosaDPDao.delete(TableMap.Iod, [id]);
            return BeanHelper.getDao<IodDao>(DaoType.IodDao).delete([id]);
        }
    }
    /**
     * ids 集合删除
     * @time: 2017-05-06 15:42:46
     * @params:
     * @return:
     */
    deleteByIds(ids: Array<string>) {
        return Promise.resolve(null)
            .then<number|null>(validateParams)
            .then(deleteAreaById);
        function validateParams() {
            if (!ids || ids.length === 0) {
                return Promise.reject<number>(ErrorCode.ERROR_NO_IOD);
            }
            return null;
        }

        function deleteAreaById() {
            // return PosaDPDao.delete(TableMap.Iod, ids);
            return BeanHelper.getDao<IodDao>(DaoType.IodDao).delete(ids);
        }
    }

    private exist(code: string):Promise<BackResponseBody<Iod>> {
        let
            whereList = [] as Array<Where>,
            childWheres = [] as Array<ChildWhere>,
            where: Where,
            childWhere: ChildWhere;

        where = new Where();
        childWhere = new ChildWhere();
        childWhere.FieldName = IodCol.Code;
        childWhere.FieldType = DataType.Text;
        childWhere.FieldValue = code;
        childWhere.MType = MatchingType.Equal;
        childWhere.JType = JoinType.And;
        childWheres.push(childWhere);

        where.Childs = childWheres;
        whereList.push(where);

        // return PosaDPDao.findListByWhere(TableMap.Iod, whereList);
        return BeanHelper.getDao<IodDao>(DaoType.IodDao).findListByWhere(whereList);
    }

    private existById(id: string) :Promise<BackResponseBody<Area>>{
        // return PosaDPDao.findByID(TableMap.Area, id);
        return BeanHelper.getDao<AreaDao>(DaoType.AreaDao).findByID(id);
    }

    constructor() {
    }
}