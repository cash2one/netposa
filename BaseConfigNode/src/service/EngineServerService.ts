declare var require:any;
import { BeanHelper } from '../common/help/BeanHelper';
import {BackResponseBody, PageResult} from "../core/params/result/ResponseResult";
import EngineServerDao from '../dao/EngineServerDao';
import { DaoType } from '../dao/enum/DaoType';
import { ServerType } from '../dao/core/BDaoImpl';
import {EngineServer} from  '../core/entity/EngineServer';

import {EngineServerListParams} from "../core/params/EngineServerParams";
import EngineServerCol from "../model/table-col/EngineServer_col";

import ErrorCode from "../common/res/ErrorCode";
import Where from "../common/Where";
import JoinType from "../common/JoinType";
import MatchingType from "../common/MatchingType"
import DataType from "../common/DataType";
import ChildWhere from "../common/ChildWhere";
export interface IEngineServerService {
    findAll():Promise<BackResponseBody<EngineServer>>;
    
    save(params: EngineServer): Promise<BackResponseBody<string>>;
    update(params: EngineServer): Promise<BackResponseBody<string>>;
    deleteById(id: string): Promise<BackResponseBody<string>>;
    detail(id: string): Promise<BackResponseBody<EngineServer>>;


}
export class EngineServerService implements IEngineServerService{
    constructor() {

    }
    findAll () {
        return  BeanHelper.getDao<EngineServerDao>(DaoType.EngineServerDao).findAll();
    };
    /**
     *  更新
     * @time: 2018-01-02 09:40:42
     * @params: serverModel 不同的服务配置实体数据
     * @return:
     */
    update(serverModel:EngineServer) {
        ;
        return Promise.resolve(null)
            .then<null|number>(validateParams)
            .then(validateModel)
            .then(findVideoById)
            .then(update);

        function validateParams(){
            return EngineServerService.validateParams(serverModel,true);
        }

        function validateModel(){
            return EngineServerService.validateModel(serverModel);
        }

        function findVideoById(){
            return BeanHelper.getDao<EngineServerDao>(DaoType.EngineServerDao).findByID(serverModel.ID, ServerType.BCS);
        }

        function update(resp: BackResponseBody<EngineServer>){
            
            let oldModel = resp.data;

            oldModel.Code = serverModel.Code;
            oldModel.Description = serverModel.Description;
            oldModel.IpAddress = serverModel.IpAddress;
            oldModel.Port = serverModel.Port;
            oldModel.Name = serverModel.Name;
            oldModel.EngineServerType = serverModel.EngineServerType;

            return  BeanHelper.getDao<EngineServerDao>(DaoType.EngineServerDao).update(oldModel, ServerType.BCS);
        }
    }

    /**
     * 新增
     * @time: 2018-01-02 09:40:42
     * @params: serverModel 服务配置实体
     * @return:
     */
    save(serverModel:EngineServer) {

        return Promise.resolve(null)
            .then<number|null>(validateParams)
            .then(validateModel)
            .then(save);

        function validateParams(){
            return EngineServerService.validateParams(serverModel,false);
        }

        function validateModel(){
            return EngineServerService.validateModel(serverModel);
        }

        function  save(){
            return  BeanHelper.getDao<EngineServerDao>(DaoType.EngineServerDao).save(serverModel, ServerType.BCS);
        }
    }
    /**
     *  根据ID查询详情
     * @time: 2018-01-02 09:40:42
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
                return BeanHelper.getDao<EngineServerDao>(DaoType.EngineServerDao).findByID(id, ServerType.BCS);
            });
    }
    

    /**
     *  根据 id 删除 一条数据
     * @time: 2018-01-02 09:40:42
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
            return BeanHelper.getDao<EngineServerDao>(DaoType.EngineServerDao).delete([id]);
        }
    }

    


    /**
     *  必要参数验证 （Code、IpAddress、Name、Port、EngineServerType）
     * @time: 2018-01-02 09:40:42
     * @params: isUpdate 是否为更新验证
     * @return:
     */
    private static validateParams(model:EngineServer,isUpdate:boolean){
        if(!model){
            return Promise.reject<number>(ErrorCode.ERROR_NO_PARAM);
        }

        if (isUpdate && !model.ID) {
            return Promise.reject<number>(ErrorCode.ERROR_ENGINE_NULL);
        }
        if(!model.Code){
            return Promise.reject<number>(ErrorCode.ERROR_ENGINE_CODE_NULL);
        }
        return null;
    };
    /**
     * 更新、新添条件验证 （Code 不能重复）
     * @time: 2018-01-02 09:40:42
     * @params: model：验证实体
     * @return:
     */
    private static validateModel(model:EngineServer){
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
        return BeanHelper.getDao<EngineServerDao>(DaoType.EngineServerDao).findListByWhere(arrWhere, ServerType.BCS)
            .then<number|null>(function (resp: BackResponseBody<Array<EngineServer>>) {
                if(!resp.data || resp.data.length == 0){
                    return null;
                }
                if(resp.data.length == 1 && model.ID && resp.data[0].ID == model.ID){
                    return null;
                }
                return Promise.reject(ErrorCode.ERROR_ENGINE_CODE_REPEAT);
        });
    };
}