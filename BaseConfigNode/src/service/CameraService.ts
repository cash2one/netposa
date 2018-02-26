import {TableMap} from "../model/Table-Map";
import ErrorCode from "../common/res/ErrorCode";
import {Camera} from "../core/entity/Camera";
import {BackResponseBody} from "../core/params/result/ResponseResult";
import {CameraChangeAreaIDModel} from "../core/params/CameraParams";
import {CameraEx} from "../core/entity/ex/CameraEx";
import * as log4js from "log4js";
import * as util from "util";
import {Relation} from "../core/entity/DeviceRelation";
import {SystemPoint} from "../core/entity/SystemPoint";
import DeviceExt from "../extend/Device";
import {Lamp} from "../core/entity/Lamp";
import CameraExt from "../extend/Camera";
import {VideoServer} from "../core/entity/VideoServer";
import {LayerType} from '../core/enum/LayerType';
import {ObjectType} from '../core/enum/ObjectType';
import CameraDao from '../dao/CameraDao';
import {DaoType} from '../dao/enum/DaoType';
import {BeanHelper} from '../common/help/BeanHelper';
import VideoServerDao from '../dao/VideoServerDao';
import {ServerType} from '../dao/core/BDaoImpl';
import * as _ from 'lodash';
import DeviceRelationDao from "../dao/DeviceRelationDao";
import {EqualAndWhere,EqualLikeWhere,InAndWhere} from "../model/WhereLib";
import {FildNameLib} from "../model/FildNameLib";


export interface ICameraService {
    findAll(): Promise<BackResponseBody<Array<CameraEx>>>;

    findListByName(name:string): Promise<BackResponseBody<Array<CameraEx>>>;

    edit(models: Camera): Promise<boolean>;

    changeAreaId(models: Array<CameraChangeAreaIDModel>): Promise<boolean>;

    changeLampId(models: Array<CameraChangeAreaIDModel>): Promise<boolean>;

    getPlayerInfoByID(id: string): Promise<any>
}

export class CameraService implements ICameraService {
    protected LOGGER = log4js.getLogger("CameraService");

    /**
     * @title 更新摄像机，摄像机点位，摄像机灯杆关系表
     * @param {Camera} models
     * @returns {Promise<boolean>}
     * @update hjj
     * @time 2017-10-24 18:14:33
     */
    async edit(models: Camera) {
        if (!models.ID || !models.Name || !models.Code) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM);
        }
        let oldModelRes = await BeanHelper.getDao<CameraDao>(DaoType.CameraDao).findByID(models.ID);

        if (oldModelRes.code != 200 || !oldModelRes.data) {
            return Promise.reject(ErrorCode.ERROR_BACK_ERROR);
        }
        let model = _.cloneDeep(oldModelRes.data) as Camera;
        model.Name = models.Name;
        model.Code = models.Code;
        model.CameraType = models.CameraType;
        let point = models.JsonUserData.Point as SystemPoint;

        let lampPost = models.JsonUserData.lampPost as Lamp & Relation;
        let r1 = await CameraService.updateCamera(model);
        let r2: Array<boolean>, r3: Array<boolean> | string;

        let p = await DeviceExt.findSystemPointListByObjectID(models.ID);
        if (p && p.length > 0) {
            p.forEach((item: SystemPoint) => {
                item.Lat = point.Lat;
                item.Lon = point.Lon;
                item.LayerType = models.CameraType ? models.CameraType : LayerType.Camera.value;
                item.ObjectType = ObjectType.Camera.value;
            });
            r2 = await DeviceExt.updateSystemPointList(p);
        } else {
            let newpoint = new SystemPoint();
            newpoint.ObjectID = model.ID;
            newpoint.LayerType = model.CameraType ? model.CameraType : LayerType.Camera.value;
            newpoint.ObjectType = ObjectType.Camera.value;
            newpoint.Lat = point.Lat;
            newpoint.Lon = point.Lon;
            r2 = await DeviceExt.addSystemPoint(newpoint);
        }

        //TODO 不存在立杆配置，直接返回
        if (_.isEmpty(lampPost)) {
            if (r1 && r2) {
                return true
            } else {
                this.LOGGER.error(util.format("updata error %s %s %s", r1, r2));
                return Promise.reject(ErrorCode.ERROR_BACK_ERROR)
            }
        }

        let r = await DeviceExt.findDeviceRelationListForRelatedObjectID(models.ID);
        if (r && r.length > 0) {
            r.forEach((item: Relation) => {
                item.ObjectId = lampPost.ID;
                item.ObjectType = lampPost.ObjectType;
            });
            r3 = await DeviceExt.updateRelationList(r);
        } else {
            let newRelation = new Relation();
            newRelation.ObjectId = lampPost.ID;
            newRelation.ObjectType = TableMap.Lamp;
            newRelation.RelatedObjectId = model.ID;
            newRelation.RelatedObjectType = TableMap.Camera;
            newRelation.Type = ObjectType.Camera.value;
            r3 = await DeviceExt.addRelation(newRelation);
        }

        if (r1 && r2 && r3) {
            return true
        } else {
            this.LOGGER.error(util.format("updata error %s %s %s", r1, r2, r3));
            return Promise.reject(ErrorCode.ERROR_BACK_ERROR)
        }
    }

    /**
     * @title 批量更新摄像机区域
     * @param {Array<CameraChangeAreaIDModel>} models
     * @returns {Promise<boolean>}
     * @update hjj
     * @time 2017-10-24 18:14:04
     */

    async changeAreaId(models: Array<CameraChangeAreaIDModel>) {
        let ids = [] as Array<string>;
        let maps = {} as { [key: string]: CameraChangeAreaIDModel };
        models.forEach((model: CameraChangeAreaIDModel) => {
            ids.push(model.id);
            maps[model.id] = model;
        });
        let cameras: Array<Camera> = await CameraService.getCameraForIds(ids);

        cameras.forEach((item: Camera) => {
            item.AreaID = maps[item.ID].areaId
        });
        let result = await BeanHelper.getDao<CameraDao>(DaoType.CameraDao).updateList(cameras, ServerType.BCS);
        if (!result) {
            this.LOGGER.error(util.format("updata error %j", result));
            return Promise.reject(ErrorCode.ERROR_CAMERA_CHANGE_CAMERA_TYPE_NOT_CATCH_CAMERA);
        }

        return true;
    }

    /**
     * @title 批量配置摄像机灯杆关系表
     * @param {Array<CameraChangeAreaIDModel>} models
     * @returns {Promise<boolean>}
     * @update hjj
     * @time  2017-10-24 18:11:51
     */

    async changeLampId(models: Array<CameraChangeAreaIDModel>) {
        let errorList = [] as Array<string>;
        models.forEach(async (model: CameraChangeAreaIDModel) => {
            if (model.deviceReId) {
                let relation = await DeviceExt.findDeviceRelationByID(model.deviceReId);
                if (relation) {
                    relation.ObjectId = model.lampId;
                    relation.RelatedObjectId = model.id;
                    let flag = await DeviceExt.updateRelation(relation);
                    this.LOGGER.debug(util.format("updata error %s", flag));
                    if (!flag) errorList.push(relation.RelatedObjectId);
                } else {
                    errorList.push(model.deviceReId);
                }
            } else {
                let relation = new Relation();
                relation.ObjectId = model.lampId;
                relation.ObjectType = TableMap.Lamp;
                relation.RelatedObjectId = model.id;
                relation.RelatedObjectType = TableMap.Camera;
                relation.Type = ObjectType.Camera.value;
                let flag = await DeviceExt.addRelation(relation);
                this.LOGGER.debug(util.format("updata error %s", flag));
                if (!flag) errorList.push(relation.RelatedObjectId);
            }
        });
        if (errorList.length > 0) {
            this.LOGGER.error(util.format("updata error %s", errorList));
            return Promise.reject(ErrorCode.ERROR_CAMERA_CHANGE_CAMERA_TYPE_NOT_CATCH_CAMERA);
        }
        return true;
    }

    /**
     * @title 查询所有摄像机，并标记摄像机是否绑定立杆的标记
     * @returns {Promise<Array<CameraEx>>}
     */
    async findAll(): Promise<BackResponseBody<Array<CameraEx>>> {
        let res = await Promise.all([
            CameraExt.getPosaDPJavaCache(),
            BeanHelper.getDao<DeviceRelationDao>(DaoType.DeviceRelationDao).findListByWhere([
                EqualAndWhere(FildNameLib.ObjectType, ObjectType.LampPost.value),
                EqualAndWhere(FildNameLib.RelatedObjectType, ObjectType.Camera.value)
            ]),
        ]);
        if (Array.isArray(res[0].data) && res[0].data.length > 0 && Array.isArray(res[1].data) && res[1].data.length > 0) {
            for (let l = 0; l < res[0].data.length; l++) {
                let item = res[0].data[l] as any;
                for (let i = 0; i < res[1].data.length; i++) {
                    let item2 = res[1].data[i] as Relation;
                    if (item2 && item.ID === item2.RelatedObjectId) {
                        item.isConfigLamp = true;
                        res[1].data.splice(i, 1);
                        break;
                    }
                }
                if (res[1].data.length === 0) {
                    break;
                }
            }
        }
        return res[0];
    }

    /**
     * @title 查询所有摄像机，并标记摄像机是否绑定立杆的标记
     * @returns {Promise<Array<CameraEx>>}
     */
    async findListByName(name:string): Promise<BackResponseBody<Array<CameraEx>>> {
        let res = await Promise.all([
            CameraExt.getPosaDPJavaCache(name),
            BeanHelper.getDao<DeviceRelationDao>(DaoType.DeviceRelationDao).findListByWhere([
                EqualAndWhere(FildNameLib.ObjectType, ObjectType.LampPost.value),
                EqualAndWhere(FildNameLib.RelatedObjectType, ObjectType.Camera.value)
            ]),
        ]);
        if (Array.isArray(res[0].data) && res[0].data.length > 0 && Array.isArray(res[1].data) && res[1].data.length > 0) {
            for (let l = 0; l < res[0].data.length; l++) {
                let item = res[0].data[l] as any;
                for (let i = 0; i < res[1].data.length; i++) {
                    let item2 = res[1].data[i] as Relation;
                    if (item2 && item.ID === item2.RelatedObjectId) {
                        item.isConfigLamp = true;
                        res[1].data.splice(i, 1);
                        break;
                    }
                }
                if (res[1].data.length === 0) {
                    break;
                }
            }
        }
        return res[0];
    }


    /**
     * @title 根据摄像机ID获取ocx播放参数
     * @param {string} id
     * @return {Promise<any>}
     */
    async getPlayerInfoByID(id: string): Promise<any> {
        if (!id) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM)
        }
        // let resc = await PosaDPDao.findByID(TableMap.Camera, id) as BackResponseBody<Camera>;
        let resc = await BeanHelper.getDao<CameraDao>(DaoType.CameraDao).findByID(id) as BackResponseBody<Camera>;
        if (resc.code !== 200 || !resc.data) {
            return Promise.reject(ErrorCode.ERROR_CAMERA_CHANGE_CAMERA_TYPE_NOT_CATCH_CAMERA);
        }
        let serverId = resc.data.VideoServer;
        let ress = await BeanHelper.getDao<VideoServerDao>(DaoType.VideoServerDao).findByID(serverId) as BackResponseBody<VideoServer>;
        if (ress.code !== 200 || !ress.data) {
            return Promise.reject(ErrorCode.ERROR_VIDEO_NULL)
        }
        let result = new BackResponseBody<any>();
        result.code = ErrorCode.OK;
        result.data = {
            IP: ress.data.IpAddress,
            Port: ress.data.Port,
            Path: resc.data.PlayName,
            Uid: ress.data.Uid,
            Pwd: ress.data.Pwd,
            JsonUserData: {
                Camera: resc.data,
                VedioServer: ress.data
            }
        };
        return result
    }

    /**
     * @title 从PosaDPDao获取IDS集合摄像机列表
     * @param {Array<string>} ids
     * @returns {ThenPromise<Array<Camera>>}
     */
    static getCameraForIds(ids: Array<string>) {
        return BeanHelper.getDao<CameraDao>(DaoType.CameraDao).findListByID(ids)
            .then((res: BackResponseBody<Array<Camera>>) => {
                return res.data;
            });
    }

    /**
     * @title 更新摄像机信息
     * @param {Camera} model
     * @returns {ThenPromise<any>}
     */
    static async updateCamera(model: Camera) {
        return await BeanHelper.getDao<CameraDao>(DaoType.CameraDao).update(model, ServerType.BCS)
            .then(async (res: BackResponseBody<any>) => {
                return res.data;
            });
    }


    constructor() {

    }

}