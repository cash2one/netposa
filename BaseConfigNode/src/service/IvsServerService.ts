import Where from "../common/Where";
import JoinType from "../common/JoinType";
import MatchingType from "../common/MatchingType"
import DataType from "../common/DataType";
import ChildWhere from "../common/ChildWhere";
import * as Promise from "promise";
// import {TableMap} from "../model/Table-Map";
import ErrorCode from "../common/res/ErrorCode";
import OrderBy from "../common/OrderBy";
import IvsServer_col from "../model/table-col/IvsServer_col";
import {IvsServerEx} from "../core/entity/ex/IvsServerEx";
import {BackResponseBody, PageResult} from "../core/params/result/ResponseResult";
import {IvsServerListParams} from "../core/params/IvsServerParams";
import {IvsServer} from "../core/entity/IvsServer";
import IvsServerCol from "../model/table-col/IvsServer_col";
import { BeanHelper } from '../common/help/BeanHelper';
import { DaoType } from '../dao/enum/DaoType';
import { ServerType } from '../dao/core/BDaoImpl';
import IvsServerDao from '../dao/IvsServerDao';

export interface IIvsServerService {
    save(params: IvsServer): Promise<BackResponseBody<string>>;

    update(params: IvsServer): Promise<BackResponseBody<string>>;

    deleteById(id: string): Promise<BackResponseBody<string>>;

    deleteByIds(ids: Array<string>): Promise<BackResponseBody<string>>;

    detail(id: string): Promise<BackResponseBody<IvsServer>>;

    findListByParams(reqParams:IvsServerListParams): Promise<BackResponseBody<PageResult<IvsServerEx>>>;
}

export class IvsServerService implements IIvsServerService{

    constructor(){
    }

    /**
     *  更新
     * @time: 2017-04-10 09:40:42
     * @params: serverModel 不同的服务配置实体数据
     * @return:
     */
    update(serverModel:IvsServerEx) {

        return Promise.resolve(null)
            .then<null|number>(validateParams)
            .then(IvsServerService.validateModel(serverModel.Code,serverModel.ID))
            .then(findVideoById)
            .then(update);

        function validateParams(){
            return IvsServerService.validateParams(serverModel,true);
        }

        function findVideoById(){
            return BeanHelper.getDao<IvsServerDao>(DaoType.IvsServerDao).findByID(serverModel.ID, ServerType.BCS);
        }

        function update(resp: BackResponseBody<IvsServerEx>){
            let oldModel = resp.data;

            oldModel.Code = serverModel.Code;
            oldModel.Description = serverModel.Description;
            oldModel.IpAddress = serverModel.IpAddress;
            oldModel.Port = serverModel.Port;
            oldModel.Name = serverModel.Name;
            oldModel.ServerType = serverModel.ServerType;
            oldModel.ProxyServerID = serverModel.ProxyServerID;
            oldModel.Uid = serverModel.Uid;
            oldModel.Pwd = serverModel.Pwd;
            oldModel.AreaID = serverModel.AreaID;

            return  BeanHelper.getDao<IvsServerDao>(DaoType.IvsServerDao).update(oldModel, ServerType.BCS);
        }
    }


    /**
     * 新增
     * @time: 2017-04-17 10:59:14
     * @params: serverModel 服务配置实体
     * @return:
     */
    save(serverModel:IvsServerEx) {

        return Promise.resolve(null)
            .then<number|null>(validateParams)
            .then(IvsServerService.validateModel(serverModel.Code,""))
            .then(save);

        function validateParams(){
            return IvsServerService.validateParams(serverModel,false);
        }

        function  save(){
            return  BeanHelper.getDao<IvsServerDao>(DaoType.IvsServerDao).save(serverModel, ServerType.BCS);
        }
    }

    /**
     *  根据ID查询详情
     * @time: 2017-04-10 09:40:42
     * @params: id 标识id
     * @return:
     */
    detail(id:string){
        return Promise.resolve(null)
            .then<null|number>(()=>{
                if(!id){
                    return Promise.reject<number>(ErrorCode.ERROR_NO_PARAM);
                }
                return null;
            }).then(()=>{
                return BeanHelper.getDao<IvsServerDao>(DaoType.IvsServerDao).findByID(id, ServerType.BCS);
            })

    }

    /**
     *  综合条件查询
     * @time: 2017-05-03 21:28:16
     * @params:
     * @return:
     */
    findListByParams(reqParams:IvsServerListParams){

        return Promise.resolve(null)
            .then<null|number>(()=>{
                if(!reqParams || !reqParams.currentPage || !reqParams.pageSize){
                    return Promise.reject<number>(ErrorCode.ERROR_NO_PARAM);
                }
                return null;
            })
            .then(()=>{

                let arrWhere = new Array<Where>();
                let where = new Where();
                let childWhere = new ChildWhere();

                if(reqParams.areaId){
                    childWhere.FieldName = IvsServer_col.AreaID;
                    childWhere.FieldType = DataType.Text;
                    childWhere.FieldValue = reqParams.areaId;
                    childWhere.MType = MatchingType.Equal;

                    childWhere.JType = JoinType.And;
                    where.Childs.push(childWhere);
                }

                where.JType = JoinType.And;
                arrWhere.push(where);

                let orderByList = new Array<OrderBy>();
                let orderBy = new OrderBy();

                if(reqParams.sortName){
                    orderBy.FieldName = reqParams.sortName;
                    orderBy.IsAsc = reqParams.isAsc;
                }else{
                    orderBy.FieldName = IvsServerCol.ID;
                    orderBy.IsAsc = true
                }

                orderByList.push(orderBy);
                return BeanHelper.getDao<IvsServerDao>(DaoType.IvsServerDao)
                    .findListByPageWithOrderBy(
                        arrWhere,orderByList,
                        reqParams.currentPage,
                        reqParams.pageSize,
                        ServerType.BCS
                    );
            });

    }

    /**
     *  根据 id 删除 一条数据
     * @time: 2017-04-10 09:40:42
     * @params: id 数据标识id
     * @return:
     */
    deleteById(id: string){
        return Promise.resolve(null)
            .then<null|number>(()=>{
                if(!id){
                    return Promise.reject<number>(ErrorCode.ERROR_NO_PARAM);
                }
                return null;
            }).then(deleteById);

        function deleteById(){
            return BeanHelper.getDao<IvsServerDao>(DaoType.IvsServerDao).delete([id], ServerType.BCS);
        }
    }

    /**
     * 删除多个
     * @time: 2017-05-06 14:03:39
     * @params:
     * @return:
     */
    deleteByIds(ids: Array<string>){
        return Promise.resolve(null)
            .then<null|number>(()=>{
                if(!ids){
                    return Promise.reject<number>(ErrorCode.ERROR_NO_PARAM);
                }
                return null;
            }).then(deleteById);

        function deleteById(){
            return BeanHelper.getDao<IvsServerDao>(DaoType.IvsServerDao).delete(ids, ServerType.BCS);
        }
    }

    /**
     *  必要参数验证 （Code、IpAddress、Name、Port、IVSServerType）
     * @time: 2017-04-17 10:59:57
     * @params: isUpdate 是否为更新验证
     * @return:
     */
    private static validateParams(model:IvsServerEx,isUpdate:boolean){
        if(!model){
            return Promise.reject<number>(ErrorCode.ERROR_NO_PARAM);
        }
        if (isUpdate && !model.ID) {
            return Promise.reject<number>(ErrorCode.ERROR_IVS_NULL);
        }
        if(!model.Code){
            return Promise.reject<number>(ErrorCode.ERROR_IVS_CODE_NULL);
        }
        return null;
    };

    /** update by zxy
     * 更新、新添条件验证 （Code 不能重复）
     * @time: 2017-06-08 19:10:09
     * @params: id 新增不传 或传 null ''
     * @return:
     */
    /*TODO 修改完后 因后台请求报错未测，*/
    private static validateModel(code:string,id?:string){

        return function (){
            return Promise.resolve(null)
                .then(()=> {
                    let wheres = new Array<Where>();
                    let where = new Where();
                    where.Childs = new Array<ChildWhere>();

                    let childWhere = new ChildWhere();

                    childWhere.FieldName = IvsServerCol.Code;
                    childWhere.FieldType = DataType.Text;
                    childWhere.FieldValue = code;
                    childWhere.MType = MatchingType.Equal;

                    where.Childs.push(childWhere);

                    if(id){
                        childWhere = new ChildWhere();

                        childWhere.FieldName = IvsServerCol.ID;
                        childWhere.FieldType = DataType.Text;
                        childWhere.FieldValue = id;
                        childWhere.MType = MatchingType.UnEqual;
                        childWhere.JType = JoinType.And;

                        where.Childs.push(childWhere);
                    }

                    where.JType = JoinType.And;
                    wheres.push(where);
                    return wheres;
                })
                .then((wheres: Array<Where>)=> {
                    return BeanHelper.getDao<IvsServerDao>(DaoType.IvsServerDao).findListByWhere(wheres, ServerType.BCS);
                })
                .then<number|null>((resp: BackResponseBody<Array<IvsServer>>)=> {
                    if (resp.data && resp.data.length > 0) {
                        return Promise.reject(ErrorCode.ERROR_IVS_CODE_REPEAT);
                    }
                    return null;
                });
        };


    };

    /**
     *  根据ID查询详情
     * @time: 2017-04-10 09:40:42
     * @params: id 标识id
     * @return:
     */
    private static findById(id:string){
        return BeanHelper.getDao<IvsServerDao>(DaoType.IvsServerDao).findByID(id, ServerType.BCS);
    }

}