import Where from "../common/Where";
import JoinType from "../common/JoinType";
import MatchingType from "../common/MatchingType"
import DataType from "../common/DataType";
import ChildWhere from "../common/ChildWhere";
import {TableMap} from "../model/Table-Map";
import ErrorCode from "../common/res/ErrorCode";
import OrderBy from "../common/OrderBy";
import {ProxyServer} from "../core/entity/ProxyServer";
import {BackResponseBody, PageResult} from "../core/params/result/ResponseResult";
import {ProxyServerListParams} from "../core/params/ProxyServerParams";
import ProxyServerCol from "../model/table-col/ProxyServer_col";
import { BeanHelper } from '../common/help/BeanHelper';
import { DaoType } from '../dao/enum/DaoType';
import { ServerType } from '../dao/core/BDaoImpl';
import ProxyServerDao from '../dao/ProxyServerDao';

export interface IProxyServerService {
    save(params: ProxyServer): Promise<BackResponseBody<string>>;
    update(params: ProxyServer): Promise<BackResponseBody<string>>;
    deleteById(id: string): Promise<BackResponseBody<string>>;
    deleteByIds(ids: Array<string>): Promise<BackResponseBody<string>>;
    detail(id: string): Promise<BackResponseBody<ProxyServer>>;

    findListByParams(reqParams:ProxyServerListParams): Promise<BackResponseBody<PageResult<ProxyServer>>>;

    findAll(): Promise<BackResponseBody<PageResult<ProxyServer>>>;
}

export class ProxyServerService implements IProxyServerService{

    constructor(){
    }

    findAll(){
        return  BeanHelper.getDao<ProxyServerDao>(DaoType.ProxyServerDao).findAll(ServerType.BCS);
    }

    /**
     *  更新
     * @time: 2017-04-10 09:40:42
     * @params: serverModel 不同的服务配置实体数据
     * @return:
     */
    update(serverModel:ProxyServer) {

        return Promise.resolve(null)
            .then<null|number>(validateParams)
            .then(validateModel)
            .then(findVideoById)
            .then(update);

        function validateParams(){
            return ProxyServerService.validateParams(serverModel,true);
        }

        function validateModel(){
            return ProxyServerService.validateModel(serverModel);
        }

        function findVideoById(){
            return BeanHelper.getDao<ProxyServerDao>(DaoType.ProxyServerDao).findByID(serverModel.ID, ServerType.BCS);
        }

        function update(resp: BackResponseBody<ProxyServer>){
            let oldModel = resp.data;

            oldModel.Code = serverModel.Code;
            oldModel.Description = serverModel.Description;
            oldModel.IpAddress = serverModel.IpAddress;
            oldModel.Port = serverModel.Port;
            oldModel.Name = serverModel.Name;
            oldModel.ProxyServerType = serverModel.ProxyServerType;

            return  BeanHelper.getDao<ProxyServerDao>(DaoType.ProxyServerDao).update(oldModel, ServerType.BCS);
        }
    }

    /**
     * 新增
     * @time: 2017-04-17 10:59:14
     * @params: serverModel 服务配置实体
     * @return:
     */
    save(serverModel:ProxyServer) {

        return Promise.resolve(null)
            .then<number|null>(validateParams)
            .then(validateModel)
            .then(save);

        function validateParams(){
            return ProxyServerService.validateParams(serverModel,false);
        }

        function validateModel(){
            return ProxyServerService.validateModel(serverModel);
        }

        function  save(){
            return  BeanHelper.getDao<ProxyServerDao>(DaoType.ProxyServerDao).save(serverModel, ServerType.BCS);
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
            .then<number|null>(()=>{
                if(!id){
                    return Promise.reject<number>(ErrorCode.ERROR_NO_PARAM);
                }
                return null;
            })
            .then(()=>{
                return BeanHelper.getDao<ProxyServerDao>(DaoType.ProxyServerDao).findByID(id, ServerType.BCS);
            });
    }
    /**
     *  综合条件查询
     * @time: 2017-05-03 21:28:16
     * @params:
     * @return:
     */
    findListByParams(reqParams:ProxyServerListParams){

        return Promise.resolve(null)
            .then<number|null>(()=>{
                if(!reqParams || !reqParams.currentPage || !reqParams.pageSize){
                    return Promise.reject<number>(ErrorCode.ERROR_NO_PARAM);
                }
                return null;
            }).then(()=>{
                let arrWhere = [] as Array<Where>;
                let where = new Where();
                where.JType = JoinType.And;
                if(reqParams.type){
                    let whereType = new ChildWhere();
                    whereType.FieldName = ProxyServerCol.ProxyServerType;
                    whereType.FieldValue = reqParams.type;
                    whereType.FieldType = DataType.Text;
                    whereType.MType = MatchingType.Equal;
                    whereType.JType = JoinType.And;
                    where.Childs.push(whereType);
                }
                arrWhere.push(where);
                let orderByList = [] as Array<OrderBy>;

                let orderBy = new OrderBy();
                if(reqParams.sortName){
                    orderBy.FieldName = reqParams.sortName;
                    orderBy.IsAsc = reqParams.isAsc;
                }else{
                    orderBy.FieldName = ProxyServerCol.ID;
                    orderBy.IsAsc = true;
                }
                orderByList.push(orderBy);

                return BeanHelper.getDao<ProxyServerDao>(DaoType.ProxyServerDao)
                    .findListByPageWithOrderBy(
                        arrWhere,
                        orderByList,
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
            .then<number|null>(()=>{
                if(!id){
                    return Promise.reject<number>(ErrorCode.ERROR_NO_PARAM);
                }
                return null;
            }).then(deleteById);


        function deleteById(){
            return BeanHelper.getDao<ProxyServerDao>(DaoType.ProxyServerDao).delete([id], ServerType.BCS);
        }
    }

    /**
     * 根据ID 列表删除对应的数据
     * @time: 2017-05-06 11:50:14
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
            }).then(deleteByIds);

        function deleteByIds(){
            return BeanHelper.getDao<ProxyServerDao>(DaoType.ProxyServerDao).delete(ids, ServerType.BCS);
        }
    }


    /**
     *  必要参数验证 （Code、IpAddress、Name、Port、ProxyServerType）
     * @time: 2017-04-17 10:59:57
     * @params: isUpdate 是否为更新验证
     * @return:
     */
    private static validateParams(model:ProxyServer,isUpdate:boolean){
        if(!model){
            return Promise.reject<number>(ErrorCode.ERROR_NO_PARAM);
        }

        if (isUpdate && !model.ID) {
            return Promise.reject<number>(ErrorCode.ERROR_PROXY_NULL);
        }
        if(!model.Code){
            return Promise.reject<number>(ErrorCode.ERROR_PROXY_CODE_NULL);
        }
        if(!model.ProxyServerType){
            return Promise.reject<number>(ErrorCode.ERROR_PROXY_TYPE_NULL);
        }
        return null;
    };
    /**
     * 更新、新添条件验证 （Code 不能重复）
     * @time: 2017-04-14 15:29:33
     * @params: model：验证实体
     * @return:
     */
    private static validateModel(model:ProxyServer){
        let arrWhere = new Array<Where>();
        let where = new Where();
        where.Childs =  new Array<ChildWhere>();

        let childWhere = new ChildWhere();

        //code 值唯一
        if(model.Code){
            childWhere.FieldName = 'Code';
            childWhere.FieldType = DataType.Text;
            childWhere.FieldValue = model.Code;
            childWhere.MType = MatchingType.Equal;

            childWhere.JType = JoinType.And;
            where.Childs.push(childWhere);
        }

        //  IpAddress && Prot   IP:端口 唯一
        where.JType = JoinType.And;
        arrWhere.push(where);
        return BeanHelper.getDao<ProxyServerDao>(DaoType.ProxyServerDao).findListByWhere(arrWhere, ServerType.BCS)
            .then<number|null>(function (resp: BackResponseBody<Array<ProxyServer>>) {
                if(!resp.data || resp.data.length == 0){
                    return null;
                }
                if(resp.data.length == 1 && model.ID && resp.data[0].ID == model.ID){
                    return null;
                }
                return Promise.reject(ErrorCode.ERROR_PROXY_CODE_REPEAT);
        });
    };
}