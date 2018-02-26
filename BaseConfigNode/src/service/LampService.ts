import ErrorCode from "../common/res/ErrorCode";
import Where from "../common/Where";
import ChildWhere from "../common/ChildWhere";
import LampCol from "../model/table-col/Lamp_col";
import {SearchCascadeModel} from "../core/server/SearchCascadeModel";
import DataType from "../common/DataType";
import MatchingType from "../common/MatchingType";
import JoinType from "../common/JoinType";
import {TableMap} from "../model/Table-Map";
// import {CameraCol} from "../model/table-col/Camera_col";
// import {CameraEx} from "../core/entity/ex/CameraEx";
import OrderBy from "../common/OrderBy";
import * as log4js from "log4js";
import {BackResponseBody, PageResult, ResponseResult} from "../core/params/result/ResponseResult";

import {Area} from "../core/entity/Area";
import {Lamp} from "../core/entity/Lamp";
import {SystemPoint} from "../core/entity/SystemPoint";
import {RelationCol, Relation} from "../model/table-col/Relation_col"
import * as util from "util";
import DeviceExt from "../extend/Device";
import {DaoType} from '../dao/enum/DaoType';
import LampDao from '../dao/LampDao';
import {BeanHelper} from '../common/help/BeanHelper';
import DeviceRelationDao from '../dao/DeviceRelationDao';
import AreaDao from '../dao/AreaDao';
import {EqualAndWhere, EqualLikeWhere, StartAndEndForTimeWhere} from "../model/WhereLib";
import {FildNameLib} from "../model/FildNameLib";
import {LampWithDevice, LampWithDeviceID} from "../core/server/LampWithDevice";
import {ObjectType} from "../core/enum/ObjectType";
import CameraDao from "../dao/CameraDao";
import RfidDao from "../dao/RfidDao";
import RmpGateDao from "../dao/RmpGateDao";

/**
 * Created by dell on 2017/4/8.
 */
export interface ILampService {
    save(params: Lamp): Promise<boolean>;

    update(params: Lamp): Promise<boolean>;

    deleteById(id: string): Promise<boolean>;

    deleteByIds(ids: Array<string>): Promise<boolean>;

    detail(id: string): Promise<Lamp>;

    updataLampSystemPoint(params: SystemPoint): Promise<boolean>;

    findSystemPointById(id: string): Promise<SystemPoint>;

    deleteLampAndDeviceRelation(params: Relation): Promise<boolean>;

    findLampDeviceRelationById(id: string): Promise<Array<Relation>>;

    findLampDeviceChildrenById(id: string): Promise<any>;
}

export class LampService implements ILampService {
    private static LOGGER = log4js.getLogger('LampService');

    /**
     * @title 新增立杆
     * @param {Lamp} params
     * @return {Promise<boolean>}
     * @update hjj
     * @time 2017-10-27 13:34:55
     */
    async save(params: Lamp): Promise<boolean> {
        if (!params || !params.Code || !params.AreaID) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM);
        }
        await Promise.all([LampService.exist(params.Code), LampService.existById(params.AreaID)]) as Array<Boolean>;

        let LampModel = {} as Lamp;
        LampModel.Code = params.Code;
        LampModel.Name = params.Name;
        LampModel.AreaID = params.AreaID;
        LampModel.Description = params.Description;
        LampModel.CreateTime = Date.now().toString();
        LampModel.ImgUrl = params.ImgUrl;

        let res = await BeanHelper.getDao<LampDao>(DaoType.LampDao).save(LampModel);

        if (!res || !res.data) {
            return Promise.reject(ErrorCode.ERROR_BACK_ERROR)
        }
        let LampID = res.data;

        let device = [] as Array<{ type: string, id: string }>;
        try {
            let j = JSON.parse(params.Ext) as { [key: string]: Array<string> };
            for (let k in j) {
                let ids = j[k] as Array<string>;
                ids.forEach((item: string) => {
                    device.push({type: k, id: item})
                });
            }
        } catch (e) {
            LampService.LOGGER.debug(util.format('没有配置的设备 %s'), params.Ext)
        }
        if (device.length > 0) {
            for (let i = 0; i < device.length; i++) {
                let item = device[i] as { type: string, id: string };
                let r = await DeviceExt.findDeviceRelationListForRelatedObjectID(item.id) as Array<Relation>;
                if (Array.isArray(r) && r.length > 0) {
                    let relation = r[0] as Relation;
                    relation.ObjectId = LampID;
                    await DeviceExt.updateRelation(relation);
                } else {
                    let relation = {
                        ObjectId: LampID,
                        ObjectType: TableMap.Lamp,
                        RelatedObjectType: (item.type === TableMap.Wifi || item.type === TableMap.ElectronicFence) ? TableMap.Rfid : item.type,
                        Type: item.type,
                        RelatedObjectId: item.id
                    } as Relation;

                    await DeviceExt.addRelation(relation);
                }
            }

        }
        return true;
    }

    /**
     * @title 更新灯杆
     * @param params
     * @return {Promise<boolean>}
     * @update hjj
     * @time 2017-10-27 13:35:48
     */
    async update(params: Lamp): Promise<boolean> {
        if (!params || !params.ID || !params.AreaID) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM);
        }
        let LampModel = await this.detail(params.ID);
        LampModel.Code = params.Code;
        LampModel.Name = params.Name;
        LampModel.AreaID = params.AreaID;
        LampModel.Description = params.Description;
        let r = await BeanHelper.getDao<LampDao>(DaoType.LampDao).update(LampModel) as BackResponseBody<any>;
        if (!r || !r.data) {
            return Promise.reject(ErrorCode.ERROR_BACK_ERROR);
        }
        let res = await DeviceExt.findDeviceRelationListForObjectID(params.ID) as Array<Relation>;
        if (Array.isArray(res) && res.length > 0) {
            let ids = [] as Array<string>;
            res.forEach((item: Relation) => {
                ids.push(item.ID)
            });
            await BeanHelper.getDao<DeviceRelationDao>(DaoType.DeviceRelationDao).delete(ids);
        }
        let device = [] as Array<{ type: string, id: string }>;
        try {
            let j = JSON.parse(params.Ext) as { [key: string]: Array<string> };
            for (let k in j) {
                let ids = j[k] as Array<string>;
                ids.forEach((item: string) => {
                    device.push({type: k, id: item})
                });
            }
        } catch (e) {
            LampService.LOGGER.debug(util.format('没有配置的设备 %s'), params.Ext)
        }
        if (device.length > 0) {
            for (let i = 0; i < device.length; i++) {
                let item = device[i] as { type: string, id: string };
                let r = await DeviceExt.findDeviceRelationListForRelatedObjectID(item.id) as Array<Relation>;
                if (Array.isArray(r) && r.length > 0) {
                    let relation = r[0] as Relation;
                    relation.ObjectId = params.ID;
                    await DeviceExt.updateRelation(relation);
                } else {
                    let relation = {
                        ObjectId: params.ID,
                        ObjectType: TableMap.Lamp,
                        RelatedObjectType: (item.type === TableMap.Wifi || item.type === TableMap.ElectronicFence) ? TableMap.Rfid : item.type,
                        Type: item.type,
                        RelatedObjectId: item.id
                    } as Relation;

                    await DeviceExt.addRelation(relation);
                }
            }

        }
        return true;
    }


    /**
     * @title 删除立杆
     * @param {string} id
     * @return {Promise<boolean>}
     * @update hjj
     * @time 2017-10-27 13:36:48
     */
    async deleteById(id: string): Promise<boolean> {
        if (!id) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM);
        }
        let res = await BeanHelper.getDao<LampDao>(DaoType.LampDao).delete([id]) as BackResponseBody<boolean>;
        if (!res.data) {
            return Promise.reject(ErrorCode.ERROR_BACK_ERROR)
        }
        let ralationList = await DeviceExt.findDeviceRelationListForObjectID(id) as Array<Relation>;
        let result: boolean;
        if (Array.isArray(ralationList) && ralationList.length > 0) {
            let ids = [] as Array<string>;
            ralationList.forEach((item: Relation) => {
                ids.push(item.ID)
            });
            let r = await Promise.all([
                BeanHelper.getDao<DeviceRelationDao>(DaoType.DeviceRelationDao).delete(ids),
                BeanHelper.getDao<LampDao>(DaoType.LampDao).delete([id])
            ]);
            result = r[0].data && r[1].data
        } else {
            let r = await BeanHelper.getDao<LampDao>(DaoType.LampDao).delete([id]) as BackResponseBody<boolean>;
            result = !!r.data
        }
        if (!result) {
            return Promise.reject(ErrorCode.ERROR_BACK_ERROR)
        }
        return result
    }

    /**
     * @title 批量删除立杆
     * @param  {string[]} ids
     * @return {Promise<boolean>}
     * @update hjj
     * @time 2017-10-27 13:36:48
     * @info 遍历调用单个删除
     */
    async deleteByIds(ids: Array<string>) {
        if (!ids) {
            return Promise.reject(ErrorCode.ERROR_NO_AREA);
        }
        for (let i = 0; i < ids.length; i++) {
            await this.deleteById(ids[i])
        }
        return true;
    }

    /**
     * @title 获取灯杆详情
     * @param {string} id
     * @return {Promise<Lamp>}
     * @update hjj
     * @time 2017-10-27 13:38:35
     */
    async detail(id: string): Promise<Lamp> {
        let res = await BeanHelper.getDao<LampDao>(DaoType.LampDao).findByID(id) as BackResponseBody<Lamp>;
        if (res && res.data) {
            return res.data;
        } else {
            return Promise.reject(ErrorCode.ERROR_NO_LAMP)
        }
    }


    //通过设备ID找到坐标关系表
    async findSystemPointById(id: string): Promise<SystemPoint> {
        if (!id) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM)
        }
        let res = await DeviceExt.findSystemPointListByObjectID(id) as SystemPoint[];
        if (res.length > 0) {
            return res[0]
        } else {
            return {} as SystemPoint
        }
    }

    //更新立杆坐标
    async updataLampSystemPoint(params: SystemPoint): Promise<boolean> {
        if (!params || !params.ObjectID || !params.Lon || !params.Lat) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM)
        }
        let res = await DeviceExt.findSystemPointListByObjectID(params.ObjectID) as Array<SystemPoint>;
        let result: boolean;
        if (res.length > 0) {
            let oldModel = res[0];
            oldModel.Lat = params.Lat;
            oldModel.Lon = params.Lon;
            oldModel.Ext = params.Ext;
            let r = await DeviceExt.updateSystemPoint(oldModel);
            result = !!r;
        } else {
            let r = await DeviceExt.addSystemPoint(params);
            result = !!r;
        }
        return result
    }


    /* 判断灯杆编号是否重复*/
    private static async exist(code: string): Promise<boolean> {
        let
            whereList = [] as Array<Where>,
            where: Where,
            childWheres = [] as Array<ChildWhere>,
            childWhere: ChildWhere;
        where = new Where();
        childWhere = new ChildWhere();
        childWhere.FieldName = LampCol.Code;
        childWhere.FieldType = DataType.Text;
        childWhere.FieldValue = code;
        childWhere.MType = MatchingType.Equal;
        childWhere.JType = JoinType.And;
        childWheres.push(childWhere);
        where.Childs = childWheres;
        whereList.push(where);
        let res = await BeanHelper.getDao<LampDao>(DaoType.LampDao).findListByWhere(whereList) as BackResponseBody<Array<Lamp>>;
        if (!Array.isArray(res.data) || res.data.length === 0) {
            return true
        } else {
            return Promise.reject(ErrorCode.ERROR_LAMP_REPEAT)
        }
    }

    /* 判断行政区域是否存在 */
    private static async existById(id: string): Promise<boolean> {
        let res = await BeanHelper.getDao<AreaDao>(DaoType.AreaDao).findByID(id) as BackResponseBody<Area>;
        if (res && res.data) {
            return true
        } else {
            return Promise.reject(ErrorCode.ERROR_NO_AREA)
        }
    }

    async findLampDeviceRelationById(id: string): Promise<Array<Relation>> {
        if (!id) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM)
        }
        return await DeviceExt.findDeviceRelationListForObjectID(id) as Array<Relation>;

    }

    async findLampDeviceChildrenById(id: string) {
        if (!id) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM)
        }
        let relationRes = await BeanHelper.getDao<DeviceRelationDao>(DaoType.DeviceRelationDao).findListByWhere([EqualAndWhere(FildNameLib.ObjectId, id)]) as BackResponseBody<Array<Relation>>;
        if (relationRes.code != 200 || !Array.isArray(relationRes.data) || relationRes.data.length === 0) {
            let result: LampWithDevice = new LampWithDevice();
            result.Camera = [];
            result.WiFi = [];
            result.ElectronicFence =[];
            result.RmpGate =  [];
            return result
        }

        let lampDeviceID: LampWithDeviceID = new LampWithDeviceID();

        relationRes.data.forEach((item: Relation) => {
            if (item.Type === ObjectType.Camera.value) {
                lampDeviceID.Camera.push(item.RelatedObjectId)
            }
            if (item.Type === ObjectType.ElectronicFence.value) {
                lampDeviceID.ElectronicFence.push(item.RelatedObjectId)
            }
            if (item.Type === ObjectType.Wifi.value) {
                lampDeviceID.WiFi.push(item.RelatedObjectId)
            }
            if (item.Type === ObjectType.RmpGate.value) {
                lampDeviceID.RmpGate.push(item.RelatedObjectId)
            }
        });
        let res = await Promise.all([
            BeanHelper.getDao<CameraDao>(DaoType.CameraDao).findListByID(lampDeviceID.Camera),
            BeanHelper.getDao<RfidDao>(DaoType.RfidDao).findListByID(lampDeviceID.WiFi),
            BeanHelper.getDao<RfidDao>(DaoType.RfidDao).findListByID(lampDeviceID.ElectronicFence),
            BeanHelper.getDao<RmpGateDao>(DaoType.RmpGateDao).findListByID(lampDeviceID.RmpGate),
        ]);
        let result: LampWithDevice = new LampWithDevice();
        result.Camera = res[0].data ? res[0].data : [];
        result.WiFi = res[1].data ? res[1].data : [];
        result.ElectronicFence = res[2].data ? res[2].data : [];
        result.RmpGate = res[3].data ? res[3].data : [];
        return result;
    }

    async deleteLampAndDeviceRelation(params: Relation): Promise<boolean> {
        if (!params || !params.ObjectId || !params.RelatedObjectId) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM)
        }
        let wheres = [LampService.ObjectIDWhere(params.ObjectId), LampService.RelatedObjectIDWhere(params.RelatedObjectId)] as Array<Where>;
        let res = await BeanHelper.getDao<DeviceRelationDao>(DaoType.DeviceRelationDao).deleteByWhere(wheres) as BackResponseBody<any>;
        if (!res || !res.data) {
            return Promise.reject(ErrorCode.ERROR_BACK_ERROR)
        }
        return true
    }

    // 搜索条件
    static ObjectIDWhere(ObjectID: string): Where {
        let where = new Where();
        let childWheres = [] as  Array<ChildWhere>;
        let childWhere: ChildWhere;
        childWhere = new ChildWhere();
        childWhere.FieldName = RelationCol.ObjectID;
        childWhere.FieldValue = ObjectID;
        childWhere.FieldType = DataType.Text;
        childWhere.MType = MatchingType.Equal;
        childWhere.JType = JoinType.And;
        childWheres.push(childWhere);
        where.Childs = childWheres;
        return where
    }

    // 根据灯杆ID搜索设备||根据设备ID去查找坐标关系表ID
    static RelatedObjectIDWhere(RelatedObjectID: string): Where {
        let where = new Where();
        let childWheres = [] as  Array<ChildWhere>;
        let childWhere: ChildWhere;
        childWhere = new ChildWhere();
        childWhere.FieldName = RelationCol.RelatedObjectID;
        childWhere.FieldValue = RelatedObjectID;
        childWhere.FieldType = DataType.Text;
        childWhere.MType = MatchingType.Equal;
        childWhere.JType = JoinType.And;
        childWheres.push(childWhere);
        where.Childs = childWheres;
        return where
    }

    constructor() {
    }
}