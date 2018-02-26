import Where from "../common/Where";
import ChildWhere from "../common/ChildWhere";
import {TableMap} from "../model/Table-Map";
import ErrorCode from "../common/res/ErrorCode";
import {SystemPointCol} from "../model/table-col/SystemPoint_col";
import DataType from "../common/DataType";
import JoinType from "../common/JoinType";
import MatchingType from "../common/MatchingType";
import {BackResponseBody, PageResult} from "../core/params/result/ResponseResult";
import {SystemPoint} from "../core/entity/SystemPoint";
import {Layer} from "../core/entity/Layer";
import {LayerType} from "../core/enum/LayerType";
import {MapBaseInfoModel} from "../core/server/MapBaseInfoModel";
import ParameterCol from "../model/table-col/Parameter_col";
import {MapParameterType, MapParameterObj} from "../core/server/enum/MapParameterType";
import {Parameter} from "../core/entity/Parameter";
import {BeanHelper} from '../common/help/BeanHelper';
import OtherDao from '../dao/OtherDao';
import {DaoType} from '../dao/enum/DaoType';
import {ProcedureParamStatement} from '../core/server/ProcedureParamStatement';
import DeviceRelationDao from '../dao/DeviceRelationDao';
import LayerDao from '../dao/LayerDao';
import ParameterDao from '../dao/ParameterDao';
import SystemPointDao from '../dao/SystemPointDao';
import {EqualAndWhere} from "../model/WhereLib";
import {FildNameLib} from "../model/FildNameLib";
import {PROCEDURE_TYPE} from "../core/server/enum/ProcedureType";

/**
 * Created by dell on 2017/4/28.
 */


export interface IMapService {
    findList(params:any): Promise<BackResponseBody<PageResult<SystemPoint>>>;

    saveOrUpdate(model: SystemPoint): Promise<BackResponseBody<string>>;


    getBaseInfo(): Promise<MapBaseInfoModel>;

    // 保存地图基本信息(图层+基础参数)
    saveOrUpdateBaseInfo(model: MapBaseInfoModel): Promise<boolean>;

}

export class MapService implements IMapService {


    async saveOrUpdateBaseInfo(model: MapBaseInfoModel): Promise<boolean> {
        if (!model || !model.parameters || model.parameters.length <= 0 || !model.layerTypeList || model.layerTypeList.length <= 0) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM);
        }
        let result = await Promise.all(
            [MapService.saveLayers(model.layerTypeList),
                MapService.saveBaseInfos(model.parameters)]);

        return result[0] && result[1] ? true : Promise.reject(ErrorCode.ERROR_BACK_ERROR);

    }

    static async saveLayers(layers: Array<Layer>) {
        let needAdd = [] as Array<Layer>;
        let needUpdate = [] as Array<Layer>;
        let i, len;
        for (i = 0, len = layers.length; i < len; i++) {
            if (layers[i].ID != null) {
                needUpdate.push(layers[i]);
            } else {
                needAdd.push(layers[i]);
            }
        }
        let result: boolean = false;
        if (needAdd.length > 0 && needUpdate.length > 0) {
            let arr = await Promise.all(
                [BeanHelper.getDao<LayerDao>(DaoType.LayerDao).addList(needAdd), BeanHelper.getDao<LayerDao>(DaoType.LayerDao).updateList(needUpdate)]
            );
            result = arr[0].data && arr[1].data;
        }
        if (needAdd.length > 0 && needUpdate.length === 0) {
            let res = await BeanHelper.getDao<LayerDao>(DaoType.LayerDao).addList(needAdd);
            result = !!res.data;
        }
        if (needUpdate.length > 0 && needAdd.length == 0) {
            let res = await BeanHelper.getDao<LayerDao>(DaoType.LayerDao).updateList(needUpdate);
            result = !!res.data;
        }
        return result
    }

    static async saveBaseInfos(params: Array<Parameter>) {
        let needAdd = [] as Array<Parameter>;
        let needUpdate = [] as Array<Parameter>;
        let i, len;
        for (i = 0, len = params.length; i < len; i++) {
            if (params[i].ID != null) {
                needUpdate.push(params[i]);
            } else {
                needAdd.push(params[i]);
            }
        }
        let result: boolean = false;
        if (needAdd.length > 0 && needUpdate.length > 0) {
            let arr = await Promise.all(
                [BeanHelper.getDao<ParameterDao>(DaoType.ParameterDao).addList(needAdd), BeanHelper.getDao<ParameterDao>(DaoType.ParameterDao).updateList(needUpdate)]
            );
            result = arr[0].data && arr[1].data;
        }
        if (needAdd.length > 0 && needUpdate.length === 0) {
            let res = await BeanHelper.getDao<ParameterDao>(DaoType.ParameterDao).addList(needAdd);
            result = !!res.data;
        }
        if (needUpdate.length > 0 && needAdd.length == 0) {
            let res = await BeanHelper.getDao<ParameterDao>(DaoType.ParameterDao).updateList(needUpdate);
            result = !!res.data;
        }
        return result
    }

    getBaseInfo(): Promise<MapBaseInfoModel> {
        let arr: [Promise<Array<Layer>>, Promise<Array<Parameter>>] = [this.getLayerTypes(), MapService.getMapParameters()];
        return Promise.all(arr).then((datas: [Array<Layer>, Array<Parameter>]) => {
            let result = new MapBaseInfoModel();
            let layers = datas[0];
            let parameters = datas[1];
            result.layerTypeList = layers;
            result.parameters = parameters;
            return result;
        });
    }

    private async getLayerTypes() {
        let res = await BeanHelper.getDao<LayerDao>(DaoType.LayerDao).findAll() as BackResponseBody<Array<Layer>>;
        let result = null;
        if (res.data && res.data.length > 0) {
            result = res.data;
        } else {
            result = this.getDefaultLayerTypes();
        }
        return result;
    }

    static async getMapParameters() {
        let wheres = [] as Array<Where>;
        let where = new Where();
        let childWhere = new ChildWhere();
        childWhere.FieldName = ParameterCol.ParamClass;
        childWhere.FieldType = DataType.Text;
        childWhere.FieldValue = [MapParameterObj.PointClusterDistance.value, MapParameterObj.MapInitDefaultLevel.value].join(",");
        childWhere.MType = MatchingType.Include;
        childWhere.JType = JoinType.And;
        where.Childs.push(childWhere);
        wheres.push(where);
        let res = await BeanHelper.getDao<ParameterDao>(DaoType.ParameterDao).findListByWhere(wheres) as BackResponseBody<Array<Parameter>>
        return res.data;
    }

    private getDefaultLayerTypes() {
        let result = new Array<Layer>();
        for (let k in LayerType) {
            let layer = new Layer();
            layer.LayerType = LayerType[k].value;
            layer.Name = LayerType[k].text;
            result.push(layer);
        }
        return result;
    }

    findList(params:any): Promise<BackResponseBody<PageResult<SystemPoint>>> {
        if(!params.roleId){
            return Promise.reject(ErrorCode.ERROR_NO_PARAM);
        }
        let procParams = new ProcedureParamStatement();
        procParams.ProcName = PROCEDURE_TYPE.PROC_GET_DEVICE_STATE;
        procParams.JsonProcParams = [params.roleId];

        return Promise.resolve(null).then(() => {
            return BeanHelper.getDao<OtherDao>(DaoType.OtherDao).callProcedureForObject(procParams);
        }).then((data: any) => {
            return data
        })
    }

    async saveOrUpdate(model: SystemPoint): Promise<BackResponseBody<string>> {
        if (!model || !model.Lat || !model.Lon || !model.LayerType || !model.ObjectType) {
            return Promise.reject(ErrorCode.ERROR_SYSTEM_POINT_POINT_NULL);
        }
        let oldModelRes = await BeanHelper.getDao<SystemPointDao>(DaoType.SystemPointDao).findListByWhere([EqualAndWhere(FildNameLib.ObjectID, model.ObjectID)])
        if (oldModelRes && Array.isArray(oldModelRes.data) && oldModelRes.data.length > 0) {
            let oldModel = oldModelRes.data[0] as SystemPoint;
            oldModel.Lat = model.Lat;
            oldModel.Lon = model.Lon;
            oldModel.LayerType = model.LayerType;
            oldModel.ObjectID = model.ObjectID;
            oldModel.ObjectType = model.ObjectType;
            oldModel.ObjectName = model.ObjectName;
            return await BeanHelper.getDao<SystemPointDao>(DaoType.SystemPointDao).update(oldModel)
        }
        return await BeanHelper.getDao<SystemPointDao>(DaoType.SystemPointDao).save(model);
    }

}