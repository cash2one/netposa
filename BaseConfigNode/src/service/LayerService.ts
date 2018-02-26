
import {TableMap} from "../model/Table-Map";
import ErrorCode from "../common/res/ErrorCode";
import {Layer} from "../core/entity/Layer";
import {BackResponseBody} from "../core/params/result/ResponseResult";
import * as log4js from "log4js";
import * as util from "util";
import { BeanHelper } from '../common/help/BeanHelper';
import { DaoType } from '../dao/enum/DaoType';
import LayerDao from '../dao/LayerDao';
import { ServerType } from '../dao/core/BDaoImpl';

/**
 * 图层管理服务.
 * create by zmp.
 * @time: 2017-08-10
 */
export interface ILayerService {

    // 获取所有的图层列表
    findAll(): Promise<BackResponseBody<Array<Layer>>>;

    // 批量删除图层
    delete(ids: Array<String>): Promise<BackResponseBody<boolean>>;

    // 新增图层
    add(model: Layer): Promise<BackResponseBody<string>>;

    // 编辑图层
    edit(model: Layer): Promise<BackResponseBody<boolean>>;
}

export class LayerService implements ILayerService {
    private static LOGGER = log4js.getLogger("LayerService");

    findAll(): Promise<BackResponseBody<Array<Layer>>> {
        return Promise.resolve(null)
            .then<BackResponseBody<Array<Layer>>>(() => {
                return BeanHelper.getDao<LayerDao>(DaoType.LayerDao).findAll(ServerType.BCS);
            });
    }
        

    delete(ids: Array<string>): Promise<BackResponseBody<boolean>> {
        return Promise.resolve(null)
            .then<number | null>(validateParams).then(deleteBatchById);

        function validateParams() {
            // 对参数进行一系列验证
            // LayerService.LOGGER.debug("request parameter：" + ids);
            if (!Array.isArray(ids) || ids.length <= 0) {
                return Promise.reject<number>(ErrorCode.ERROR_NO_PARAM);
            }
            return null;
        }

        function deleteBatchById() {
            return BeanHelper.getDao<LayerDao>(DaoType.LayerDao).delete(ids, ServerType.BCS);
        }
    }

    add(model: Layer): Promise<BackResponseBody<string>> {
 
        return Promise.resolve(null).then<number|null>(validateParams)
            .then(() => {
                model.CreateTime = new Date();
                return BeanHelper.getDao<LayerDao>(DaoType.LayerDao).addList([model], ServerType.BCS);
            });

        function validateParams() {
            // 对参数进行一系列验证
            // LayerService.LOGGER.debug("request parameter：" + JSON.stringify(model));        
            if (model == null || util.isNullOrUndefined(model.Name) || util.isNullOrUndefined(model.LayerType)) {
                return Promise.reject<number>(ErrorCode.ERROR_NO_PARAM);
            }
            return null;
        }
    }

    edit(model: Layer): Promise<BackResponseBody<boolean>> {
        
        return Promise.resolve(null).then<null | number>(validateParams)
            .then(() => {
                return BeanHelper.getDao<LayerDao>(DaoType.LayerDao).findByID(model.ID, ServerType.BCS);
            })
            .then((res: BackResponseBody<Layer>) => {
                LayerService.LOGGER.debug("return result：" + JSON.stringify(res));
                if(res && res.data) {
                    let layer = res.data as Layer;
                    layer.Name = model.Name;
                    layer.Desc = model.Desc;
                    layer.Enable = model.Enable;
                    layer.Ext = model.Ext;
                    layer.LayerGroupID = model.LayerGroupID;
                    layer.LayerType = model.LayerType;
                    layer.MaxLevel = model.MaxLevel;
                    layer.MinLevel = model.MinLevel;
                    layer.LayerIconURL = model.LayerIconURL;
                    layer.Visible = model.Visible;
                    layer.CreateTime = model.CreateTime;
                    return BeanHelper.getDao<LayerDao>(DaoType.LayerDao).update(layer, ServerType.BCS);
                } else {
                    LayerService.LOGGER.warn(util.format("edit warn: no layer updated!"));
                    return Promise.reject(ErrorCode.ERROR_INVALID_PARAMETER);
                }
            });
       
        function validateParams() {
            // 对参数进行一系列验证
            // LayerService.LOGGER.debug("request parameter：" + JSON.stringify(model));    
            if (model == null || util.isNullOrUndefined(model.Name) || util.isNullOrUndefined(model.LayerType)) {
                return Promise.reject<number>(ErrorCode.ERROR_NO_PARAM);
            }
            return null;
        }
    }

}


