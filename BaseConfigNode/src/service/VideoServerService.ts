import Where from "../common/Where";
import JoinType from "../common/JoinType";
import MatchingType from "../common/MatchingType"
import DataType from "../common/DataType";
import ChildWhere from "../common/ChildWhere";
import {TableMap} from "../model/Table-Map";
import ErrorCode from "../common/res/ErrorCode";
import VideoServerCol from "../model/table-col/VideoServer_col";
import OrderBy from "../common/OrderBy";
import {VideoServerListParams} from "../core/params/VideoServerParams";
import {VideoServer} from "../core/entity/VideoServer";
import {BackResponseBody, PageResult} from "../core/params/result/ResponseResult";
import {VideoServerEx} from "../core/entity/ex/VideoServerEx";
import {Area} from "../core/entity/Area";
import { BeanHelper } from '../common/help/BeanHelper';
import VideoServerDao from '../dao/VideoServerDao';
import { DaoType } from '../dao/enum/DaoType';
import { ServerType } from '../dao/core/BDaoImpl';
import AreaDao from '../dao/AreaDao';

export interface IVideoServerService {
    save(params: VideoServerEx): Promise<BackResponseBody<string>|number>;
    update(params: VideoServerEx): Promise<BackResponseBody<string>|number>;
    deleteById(id: string): Promise<BackResponseBody<string>|number>;
    deleteByIds(ids: Array<string>): Promise<BackResponseBody<string>|number>;
    isHasTask(ids: Array<string>): Promise<BackResponseBody<string>|number>;
    detail(id: string): Promise<BackResponseBody<VideoServerEx>|number>;
    findListByParams(reqParams:VideoServerListParams): Promise<BackResponseBody<PageResult<VideoServerEx>>|number>;
}

export  class VideoServerService implements VideoServerService{

    constructor(){
    }


    /**
     *  更新
     * @time: 2017-04-10 09:40:42
     * @params: serverModel 不同的服务配置实体数据
     * @return:
     */
    update(serverModel: VideoServer) {

        return Promise.resolve(null)
            .then<null|number>(validateParams)
            .then(VideoServerService.validateModel(serverModel.Code,serverModel.ID))
            .then(findVideoById)
            .then<number| BackResponseBody<string>>(update);

        function validateParams(){
            return VideoServerService.validateParams(serverModel,true);
        }

        function  findVideoById(){
            return  BeanHelper.getDao<VideoServerDao>(DaoType.VideoServerDao).findByID(serverModel.ID, ServerType.BCS);
        }

        function  update(resp: BackResponseBody<VideoServer>){
            let oldModel = resp.data;

            if(oldModel == null){
                return Promise.reject(ErrorCode.ERROR_VIDEO_NULL);
            }

            oldModel.AreaID = serverModel.AreaID;
            oldModel.Code = serverModel.Code;
            oldModel.Description = serverModel.Description;
            oldModel.IpAddress = serverModel.IpAddress;
            oldModel.Port = serverModel.Port;
            oldModel.Name = serverModel.Name;
            oldModel.Pwd = serverModel.Pwd;
            oldModel.VideoServerType = serverModel.VideoServerType;

            return  BeanHelper.getDao<VideoServerDao>(DaoType.VideoServerDao).update(oldModel, ServerType.BCS);
        }
    }


    /**
     *  添加新的服务器配置
     * @time: 2017-04-12 14:37:32
     * @params:
     * @return:
     */
    save(serverModel:VideoServer) {

        return Promise.resolve(null)
            .then<number|null>(validateParams)
            .then(VideoServerService.validateModel(serverModel.Code,""))
            .then(save);

        function validateParams(){
            return VideoServerService.validateParams(serverModel,false);
        }
        function  save(){
            return  BeanHelper.getDao<VideoServerDao>(DaoType.VideoServerDao).save(serverModel, ServerType.BCS);
        }
    }
    /**
     *  根据ID查询详情
     * @time: 2017-04-10 09:40:42
     * @params: id 标识id
     * @return:
     */
    detail(id:string){
        if(!id){
            return Promise.reject<number>(ErrorCode.ERROR_NO_PARAM);
        }


        return BeanHelper.getDao<VideoServerDao>(DaoType.VideoServerDao).findByID(id, ServerType.BCS);

        function findAreaModel(resp: BackResponseBody<VideoServerEx>){

            return VideoServerService.findArea(resp).then(resolveResult);

            function resolveResult(data:Area|boolean){
                if(data){
                    resp.data.AreaModel = data as Area;
                }
                return Promise.resolve(resp);
            }
        }
    }

    /**
     * 综合查询列表
     * @time: 2017-05-04 15:03:08
     * @params:
     * @return:
     */
    findListByParams(reqParams: VideoServerListParams){
        if(!reqParams || !reqParams.currentPage || !reqParams.pageSize){
            return Promise.reject<number>(ErrorCode.ERROR_NO_PARAM);
        }

        let arrWhere = new Array<Where>();
        let where = new Where();

        let childWhere:ChildWhere;

        if(reqParams.areaId){
            childWhere = new ChildWhere();
            childWhere.FieldName = VideoServerCol.AreaID;
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

        if(reqParams.sortName) {
            orderBy.FieldName = reqParams.sortName;
            orderBy.IsAsc = reqParams.isAsc;
        }else{
            orderBy.FieldName = VideoServerCol.ID;
            orderBy.IsAsc = true
        }
        orderByList.push(orderBy);

        return BeanHelper.getDao<VideoServerDao>(DaoType.VideoServerDao).findListByPageWithOrderBy(arrWhere,orderByList,reqParams.currentPage,reqParams.pageSize, ServerType.BCS);
    }

    /**
     *  根据 id 删除 一条数据
     * @time: 2017-04-10 09:40:42
     * @params: id 数据标识id
     * @return:
     */
    deleteById(id: string){
        if(!id){
            return Promise.reject<number>(ErrorCode.ERROR_NO_PARAM);
        }

        return Promise.resolve(null).then(deleteById);

        function deleteById(){
            return BeanHelper.getDao<VideoServerDao>(DaoType.VideoServerDao).delete([id], ServerType.BCS);
        }
    }

    /**
     * 根据ID 列表删除对应的数据
     * @time: 2017-05-06 11:50:14
     * @params:
     * @return:
     */
    deleteByIds(ids: Array<string>){
        if(!ids){
            return Promise.reject<number>(ErrorCode.ERROR_NO_PARAM);
        }

        return Promise.resolve(null).then(deleteById);

        function deleteById(){
            return BeanHelper.getDao<VideoServerDao>(DaoType.VideoServerDao).delete(ids, ServerType.BCS);
        }
    }

    /**
     * 根据IDs 检查是否有任务正在执行
     * @time: 2017-05-06 11:50:14
     * @params:
     * @return:
     */
    isHasTask(videoServerIDList: Array<string>){
        if(!videoServerIDList){
            return Promise.reject<number>(ErrorCode.ERROR_NO_PARAM);
        }

        return Promise.resolve(null).then(hasTask);

        function hasTask(){

            return BeanHelper.getDao<VideoServerDao>(DaoType.VideoServerDao).isHasTask(videoServerIDList, ServerType.PDP);//.delete(ids, ServerType.BCS)
        }
    }

    /**
     * 必要参数验证
     * @time: 2017-04-14 18:23:23
     * @params: model:VideoServer
     * @return:
     */
    public static validateParams(model: VideoServer,isUpdate:boolean){
        if(!model){
            return Promise.reject<number>(ErrorCode.ERROR_NO_PARAM);
        }

        if (isUpdate && !model.ID) {
            return Promise.reject<number>(ErrorCode.ERROR_VIDEO_NULL);
        }
        if(!model.Code){
            return Promise.reject<number>(ErrorCode.ERROR_VIDEO_CODE_NULL);
        }
        return null;
    };
    /** update by zxq
     * 更新、新添条件验证 （Code 不能重复）
     * @time: 2017-04-14 15:29:33
     * @params: code 编码值 VideoServerCol.Code
     * @params: id 新增不传 或传 null ''
     * @return:
     */
    public static validateModel(code:string,id?:string){

        return function (){
            return Promise.resolve(null)
                .then(()=> {
                    let wheres = new Array<Where>();
                    let where = new Where();
                    where.Childs = new Array<ChildWhere>();

                    let childWhere = new ChildWhere();

                    childWhere.FieldName = VideoServerCol.Code;
                    childWhere.FieldType = DataType.Text;
                    childWhere.FieldValue = code;
                    childWhere.MType = MatchingType.Equal;

                    where.Childs.push(childWhere);

                    if(id){
                        childWhere = new ChildWhere();

                        childWhere.FieldName = VideoServerCol.ID;
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
                    return BeanHelper.getDao<VideoServerDao>(DaoType.VideoServerDao).findListByWhere(wheres, ServerType.BCS);
                })
                .then<number|null>((resp: BackResponseBody<Array<VideoServer>>)=> {
                    if (resp.data && resp.data.length > 0) {
                        return Promise.reject(ErrorCode.ERROR_VIDEO_CODE_REPEAT);
                    }
                    return null;
                });
        };
    };

    private static findArea(resp: BackResponseBody<VideoServerEx>):Promise<Area|boolean>{
        let result = resp.data ;
        if(result && result.AreaID){
            return BeanHelper.getDao<AreaDao>(DaoType.AreaDao).findByID(result.AreaID, ServerType.BCS)
                .then((resp: BackResponseBody<Area>)=>{
                    return Promise.resolve(resp.data);
                });
        }else{
            return Promise.resolve(false);
        }
    }
}