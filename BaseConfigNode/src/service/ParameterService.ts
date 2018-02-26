
import * as Promise from "promise";
import {TableMap} from "../model/Table-Map";
import ErrorCode from "../common/res/ErrorCode";
import {Parameter} from "../core/entity/Parameter";
import ChildWhere from "../common/ChildWhere";
import DataType from "../common/DataType";
import JoinType from "../common/JoinType";
import MatchingType from "../common/MatchingType";
import Where from "../common/Where";
import {MapConfigParameterExt, MapConfigParamConst} from "../core/entity/MapConfigParameter";
import {SystemConfigParams, SystemConfigParamConst} from "../core/entity/SystemConfigParams";
import {BackResponseBody} from "../core/params/result/ResponseResult";
import {SearchType} from "../core/server/enum/SearchType";
import {SearchCascadeModel} from "../core/server/SearchCascadeModel";
import * as log4js from "log4js";
import * as util from "util";
import { BeanHelper } from '../common/help/BeanHelper';
import { DaoType } from '../dao/enum/DaoType';
import ParameterDao from '../dao/ParameterDao';

/**
 * 参数配置服务类.
 * create by zmp.
 * @time: 2017-08-10
 */
export interface IParameterService {

    // 获取所有的参数配置列表
    findAll(): Promise<BackResponseBody<Array<Parameter>>>;

    // 修改参数配置
    edit(params: Array<Parameter>): Promise<BackResponseBody<string>>;
    
    // 根据参数类型获取地图配置信息
    findMapConfigByParamClass(paramClass: string): Promise<BackResponseBody<MapConfigParameterExt>>;

    // 更新地图配置信息
    editMapConfigParam(model: MapConfigParameterExt): Promise<BackResponseBody<boolean>>;
    
    //获取系统配置数据
    findSystemConfigByParamClass(paramClass: string): Promise<BackResponseBody<SystemConfigParams>>;

    // 更新系统配置信息
    editSystemConfigParam(model: SystemConfigParams): Promise<BackResponseBody<boolean>>;
}

export class ParameterService implements IParameterService {
    private static LOGGER = log4js.getLogger("ParameterService");

    findAll(): Promise<BackResponseBody<Array<Parameter>>> {
        return Promise.resolve(null)
            .then(() => {
                // return PosaDPDao.findAll(TableMap.Parameter);
                return BeanHelper.getDao<ParameterDao>(DaoType.ParameterDao).findAll();
            });
    }

    edit(models: Array<Parameter>): Promise<BackResponseBody<string>> {
        let maps = {} as {[key: string]: Parameter};
        return Promise.resolve(null)
            .then<null | number>(() => {
                // 对参数进行一系列验证
                // ParameterService.LOGGER.debug("request parameter：" + JSON.stringify(models));
                if(!Array.isArray(models) || models.length <= 0) {
                    return Promise.reject(ErrorCode.ERROR_NO_PARAM);
                }
                return null;
            })
            .then(() => {
                let ids = new Array<string>();
                
                models.forEach((param: Parameter) => {
                    if(param.ID && !util.isNullOrUndefined(param.ID)) {
                        ids.push(param.ID);
                        maps[param.ID] = param;
                    }
                });
                if(ids.length > 0) {
                    // return PosaDPDao.findListByID(TableMap.Parameter, ids);
                    return BeanHelper.getDao<ParameterDao>(DaoType.ParameterDao).findListByID(ids);
                } else {
                    return null;
                }
            })
            .then((res: BackResponseBody<any>) => {
                ParameterService.LOGGER.debug("return result：" + JSON.stringify(res));
                if(res && res.data && Array.isArray(res.data) && res.data.length > 0) {
                    let params = res.data;
                    if(params && params.length > 0) {
                        let toUpdateParams = new Array<Parameter>();
                        params.forEach((param: Parameter) => {
                            if(maps[param.ID]) {
                                let model = maps[param.ID];
                                param.ParamClass = model.ParamClass;
                                param.ParamName = model.ParamName;
                                param.ParamValue = model.ParamValue;
                                param.ParentID = model.ParentID;
                                param.PYCode = model.PYCode;
                                param.Ext = model.Ext;
                                toUpdateParams.push(model);
                            } else {
                                ParameterService.LOGGER.info(util.format("update warn: %s not match!", param.ParamName));
                            }
                        });
                        // return PosaDPDao.updateList(TableMap.Parameter, toUpdateParams);
                        return BeanHelper.getDao<ParameterDao>(DaoType.ParameterDao).updateList(toUpdateParams);
                    } 
                }
                ParameterService.LOGGER.warn(util.format("update warn: no parameter updated!"));
                return Promise.reject(ErrorCode.ERROR_INVALID_PARAMETER);
            });
    }
    
    findMapConfigByParamClass(paramClass: string): Promise<BackResponseBody<MapConfigParameterExt>> {
        return Promise.resolve(null)
            .then(() => {
                //ParameterService.LOGGER.debug("parameterext: " + JSON.stringify(paramClass));
                if(util.isNullOrUndefined(paramClass)) {
                    paramClass = MapConfigParamConst.FieldValue.value;
                }
                // 拼装查询条件
                let whereChild = new ChildWhere();
                whereChild.FieldName = MapConfigParamConst.FieldName.value;
                whereChild.FieldType = DataType.Text;
                whereChild.FieldValue = paramClass;
                whereChild.MType = MatchingType.Equal;
                whereChild.JType = JoinType.And;
                let where = new Where();
                where.Childs.push(whereChild) ;
                // return PosaDPDao.findListByWhere(TableMap.Parameter, [where]);
                return BeanHelper.getDao<ParameterDao>(DaoType.ParameterDao).findListByWhere([where]);
            })
            .then((res: BackResponseBody<Array<Parameter>>) => {
                ParameterService.LOGGER.debug("return result: " + JSON.stringify(res.data));
                let mapConfigParam, result = new BackResponseBody<MapConfigParameterExt>();
                if(res && res.data) {
                    mapConfigParam = res.data[0] as Parameter;
                    if(mapConfigParam.Ext) {
                        let data = JSON.parse(mapConfigParam.Ext) as MapConfigParameterExt;
                        result.code = res.code;
                        result.data = data;
                        result.status = res.status;
                        result.message = res.message;
                    } else {
                        result.code = res.code;
                        result.status = res.status;
                        result.message = res.message;
                    }
                } else {
                    result.code = res.code;
                    result.status = res.status;
                    result.message = res.message;
                }
                return result;
            });
    }
    editMapConfigParam(model: MapConfigParameterExt): Promise<BackResponseBody<boolean>> {
       return Promise.resolve(null)
            .then(() => {
                
                // 拼装查询条件
                let whereChild = new ChildWhere();
                whereChild.FieldName = MapConfigParamConst.FieldName.value;
                whereChild.FieldType = DataType.Text;
                whereChild.FieldValue = MapConfigParamConst.FieldValue.value;
                whereChild.MType = MatchingType.Equal;
                whereChild.JType = JoinType.And;
                let where = new Where();
                where.Childs.push(whereChild) ;
                // return PosaDPDao.findListByWhere(TableMap.Parameter, [where]);
                return BeanHelper.getDao<ParameterDao>(DaoType.ParameterDao).findListByWhere([where]);
            })
            .then((res: BackResponseBody<Array<Parameter>>) => {
                ParameterService.LOGGER.debug("return result: " + JSON.stringify(res.data));
                let mapConfigParam;
                if(res && res.data) {
                    mapConfigParam = res.data[0] as Parameter;
                    if(model) {
                        mapConfigParam.Ext = JSON.stringify(model);
                        // return PosaDPDao.update(TableMap.Parameter, mapConfigParam);
                        return BeanHelper.getDao<ParameterDao>(DaoType.ParameterDao).update(mapConfigParam);
                    }
                }
            });
    }

    findSystemConfigByParamClass(paramClass: string): Promise<BackResponseBody<SystemConfigParams>> {
        return Promise.resolve(null)
            .then(() => {
                //ParameterService.LOGGER.debug("parameterext: " + JSON.stringify(paramClass));
                if(util.isNullOrUndefined(paramClass)) {
                    paramClass = SystemConfigParamConst.FieldValue.value;
                }
                // 拼装查询条件
                let whereChild = new ChildWhere();
                whereChild.FieldName = SystemConfigParamConst.FieldName.value;
                whereChild.FieldType = DataType.Text;
                whereChild.FieldValue = paramClass;
                whereChild.MType = MatchingType.Equal;
                whereChild.JType = JoinType.And;
                let where = new Where();
                where.Childs.push(whereChild) ;
                // return PosaDPDao.findListByWhere(TableMap.Parameter, [where]);
                return BeanHelper.getDao<ParameterDao>(DaoType.ParameterDao).findListByWhere([where]);
            })
            .then((res: BackResponseBody<Array<Parameter>>) => {
                ParameterService.LOGGER.debug("return result: " + JSON.stringify(res.data));
                let systemConfigParam, result = new BackResponseBody<SystemConfigParams>();
                if(res && res.data) {
                    systemConfigParam = res.data[0] as Parameter;
                    if(systemConfigParam.Ext) {
                        let data = JSON.parse(systemConfigParam.Ext) as SystemConfigParams;
                        result.code = res.code;
                        result.data = data;
                        result.status = res.status;
                        result.message = res.message;
                    } else {
                        result.code = res.code;
                        result.status = res.status;
                        result.message = res.message;
                    }
                } else {
                    result.code = res.code;
                    result.status = res.status;
                    result.message = res.message;
                }
                return result;
            });
    }
    editSystemConfigParam(model: SystemConfigParams): Promise<BackResponseBody<boolean>> {
       return Promise.resolve(null)
            .then(() => {
                
                // 拼装查询条件
                let whereChild = new ChildWhere();
                whereChild.FieldName = SystemConfigParamConst.FieldName.value;
                whereChild.FieldType = DataType.Text;
                whereChild.FieldValue = SystemConfigParamConst.FieldValue.value;
                whereChild.MType = MatchingType.Equal;
                whereChild.JType = JoinType.And;
                let where = new Where();
                where.Childs.push(whereChild) ;
                // return PosaDPDao.findListByWhere(TableMap.Parameter, [where]);
                return BeanHelper.getDao<ParameterDao>(DaoType.ParameterDao).findListByWhere([where]);
            })
            .then((res: BackResponseBody<Array<Parameter>>) => {
                ParameterService.LOGGER.debug("return result: " + JSON.stringify(res.data));
                let systemConfigParam;
                if(res && res.data) {
                    systemConfigParam = res.data[0] as Parameter;
                    if(model) {
                        systemConfigParam.Ext = JSON.stringify(model);
                        // return PosaDPDao.update(TableMap.Parameter, systemConfigParam);
                        return BeanHelper.getDao<ParameterDao>(DaoType.ParameterDao).update(systemConfigParam);
                    }
                }
            });
    }

    constructor() {
    }
}