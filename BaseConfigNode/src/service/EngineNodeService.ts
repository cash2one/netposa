declare var require: any;
import { BeanHelper } from '../common/help/BeanHelper';
import { BackResponseBody, PageResult } from "../core/params/result/ResponseResult";
import EngineNodeDao from '../dao/EngineNodeDao';
import { DaoType } from '../dao/enum/DaoType';
import { ServerType } from '../dao/core/BDaoImpl';
import { EngineNodeParams } from "../core/params/EngineNodeParams";
import ErrorCode from "../common/res/ErrorCode";
import Where from "../common/Where";
import JoinType from "../common/JoinType";
import MatchingType from "../common/MatchingType"
import DataType from "../common/DataType";
import ChildWhere from "../common/ChildWhere";
import EngineNodeServerCol from "../model/table-col/EngineNodeServer_col";
import OrderBy from "../common/OrderBy";
import { EngineNode } from "../core/entity/EngineNode";
import { debug } from 'memory-cache';
import { EqualAndWhere } from "../model/WhereLib";
import { FildNameLib } from "../model/FildNameLib";
import { SortAndOrderBy } from "../model/OrderByLib";
export interface IEngineNodeService {
    save(params: EngineNode): Promise<BackResponseBody<string>>;
    update(params: EngineNode): Promise<BackResponseBody<string>>;
    deleteById(id: string): Promise<BackResponseBody<string>>;
    deleteByIds(ids: Array<string>): Promise<BackResponseBody<string>>;
    detail(id: string): Promise<BackResponseBody<EngineNode>>;
    findAll(): Promise<BackResponseBody<any>>;
    findListByParams(reqParams: EngineNodeParams): Promise<BackResponseBody<PageResult<EngineNode>>>;
}
export class EngineNodeService implements IEngineNodeService {
    constructor() {

    }
    findAll() {
        return BeanHelper.getDao<EngineNodeDao>(DaoType.EngineNodeDao).findAll();
    };

    /**
    * 综合条件查询
    * @time: 2017-05-03 21:28:16
    * @params:
    * @return:
    */
    async findListByParams(reqParams: EngineNodeParams) {
        if (!reqParams || !reqParams.currentPage || !reqParams.pageSize) {
            return Promise.reject<number>(ErrorCode.ERROR_NO_PARAM);
        }
        let arrWhere = [EqualAndWhere(FildNameLib.EngineServerID, reqParams.engineServerId)] as Array<Where>;
        return BeanHelper.getDao<EngineNodeDao>(DaoType.EngineNodeDao)
            .findListByPage(
            arrWhere,
            reqParams.currentPage,
            reqParams.pageSize,
            ServerType.BCS
            );
    }

    /**
     *  更新
     * @time: 2017-04-10 09:40:42
     * @params: serverModel 不同的服务配置实体数据
     * @return:
     */
    update(serverModel:EngineNode) {

        return Promise.resolve(null)
            .then<null|number>(validateParams)
            .then(validateModel)
            .then(findVideoById)
            .then(update);

        function validateParams(){
            return EngineNodeService.validateParams(serverModel,true);
        }

        function validateModel(){
            return EngineNodeService.validateModel(serverModel);
        }

        function findVideoById(){
            return BeanHelper.getDao<EngineNodeDao>(DaoType.EngineNodeDao).findByID(serverModel.ID, ServerType.BCS);
        }

        function update(resp: BackResponseBody<EngineNode>){
            let oldModel = resp.data;

            oldModel.Code = serverModel.Code;
            oldModel.Description = serverModel.Description;
            oldModel.IpAddress = serverModel.IpAddress;
            oldModel.Port = serverModel.Port;
            oldModel.Name = serverModel.Name;
            oldModel.EngineServerID = serverModel.EngineServerID;

            return  BeanHelper.getDao<EngineNodeDao>(DaoType.EngineNodeDao).update(oldModel, ServerType.BCS);
        }
    }

    /**
     * 新增
     * @time: 2017-04-17 10:59:14
     * @params: serverModel 服务配置实体
     * @return:
     */
    save(serverModel:EngineNode) {

        return Promise.resolve(null)
            .then<number|null>(validateParams)
            .then(validateModel)
            .then(save);

        function validateParams(){
            return EngineNodeService.validateParams(serverModel,false);
        }

        function validateModel(){
            return EngineNodeService.validateModel(serverModel);
        }

        function  save(){
            return  BeanHelper.getDao<EngineNodeDao>(DaoType.EngineNodeDao).save(serverModel, ServerType.BCS);
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
                return BeanHelper.getDao<EngineNodeDao>(DaoType.EngineNodeDao).findByID(id, ServerType.BCS);
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
            return BeanHelper.getDao<EngineNodeDao>(DaoType.EngineNodeDao).delete([id], ServerType.BCS);
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
            return BeanHelper.getDao<EngineNodeDao>(DaoType.EngineNodeDao).delete(ids, ServerType.BCS);
        }
    }


    /**
     *  必要参数验证 （Code、IpAddress、Name、Port、EngineNodeType）
     * @time: 2017-04-17 10:59:57
     * @params: isUpdate 是否为更新验证
     * @return:
     */
    private static validateParams(model:EngineNode,isUpdate:boolean){
        if(!model){
            return Promise.reject<number>(ErrorCode.ERROR_NO_PARAM);
        }

        if (isUpdate && !model.ID) {
            return Promise.reject<number>(ErrorCode.ERROR_PROXY_NULL);
        }
        if(!model.Code){
            return Promise.reject<number>(ErrorCode.ERROR_PROXY_CODE_NULL);
        }
        if(!model.EngineServerID){
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
    private static validateModel(model:EngineNode){
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
        return BeanHelper.getDao<EngineNodeDao>(DaoType.EngineNodeDao).findListByWhere(arrWhere, ServerType.BCS)
            .then<number|null>(function (resp: BackResponseBody<Array<EngineNode>>) {
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