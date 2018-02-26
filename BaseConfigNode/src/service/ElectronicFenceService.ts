
import { TableMap } from "../model/Table-Map";
import ErrorCode from "../common/res/ErrorCode";
import { ElectronicFence } from "../core/entity/ElectronicFence";
import { BackResponseBody } from "../core/params/result/ResponseResult";
import { ElectronicFenceChangeAreaIDModel } from "../core/params/ElectronicFenceParams";
import { ElectronicFenceEx } from "../core/entity/ex/ElectronicFenceEx";
import * as log4js from "log4js";
import * as util from "util";
import { SystemPoint } from "../core/entity/SystemPoint";
import { Lamp } from "../core/entity/Lamp";
import { Relation } from "../core/entity/DeviceRelation";
import DeviceExt from "../extend/Device";
import ElectronicFenceExt from "../extend/ElectronicFence";
import { LayerType } from "../core/enum/LayerType";
import { ObjectType } from "../core/enum/ObjectType";
import { DaoType } from '../dao/enum/DaoType';
import RfidDao from '../dao/RfidDao';
import { BeanHelper } from '../common/help/BeanHelper';
import * as _ from 'lodash';
import DeviceRelationDao from "../dao/DeviceRelationDao";
import { EqualAndWhere } from "../model/WhereLib";
import { FildNameLib } from "../model/FildNameLib";

export interface IElectronicFenceService {
    findAll(): Promise<BackResponseBody<Array<ElectronicFenceEx>>>;
    findListByName(name:string): Promise<BackResponseBody<Array<ElectronicFenceEx>>>;
    edit(models: ElectronicFence): Promise<boolean>;
    changeAreaId(models: Array<ElectronicFenceChangeAreaIDModel>): Promise<boolean>;
    changeLampId(models: Array<ElectronicFenceChangeAreaIDModel>): Promise<boolean>;
}

export class ElectronicFenceService implements IElectronicFenceService {
    protected LOGGER = log4js.getLogger("ElectronicFenceService");

    /**
     * @title 获取所有电围设备
     * @returns {Promise<Array<ElectronicFenceEx>>}
     */

    async findAll(): Promise<BackResponseBody<Array<ElectronicFenceEx>>> {
        let res = await Promise.all([
            ElectronicFenceExt.getPosaDPJavaCache(),
            BeanHelper.getDao<DeviceRelationDao>(DaoType.DeviceRelationDao).findListByWhere([
                EqualAndWhere(FildNameLib.ObjectType, ObjectType.LampPost.value),
                EqualAndWhere(FildNameLib.RelatedObjectType, TableMap.Rfid),
                EqualAndWhere(FildNameLib.Type,ObjectType.ElectronicFence.value)
            ])
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
     * @title 获取名字对应的电围设备
     * @returns {Promise<Array<ElectronicFenceEx>>}
     */

    async findListByName(name:string): Promise<BackResponseBody<Array<ElectronicFenceEx>>> {
        let res = await Promise.all([
            ElectronicFenceExt.getPosaDPJavaCache(name),
            BeanHelper.getDao<DeviceRelationDao>(DaoType.DeviceRelationDao).findListByWhere([
                EqualAndWhere(FildNameLib.ObjectType, ObjectType.LampPost.value),
                EqualAndWhere(FildNameLib.RelatedObjectType, TableMap.Rfid),
                EqualAndWhere(FildNameLib.Type,ObjectType.ElectronicFence.value)
            ])
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
     * @title 编辑电围信息，电围点位信息，电围灯杆关系表
     * @param {ElectronicFence} models
     * @returns {Promise<boolean>}
     */
    async edit(models: ElectronicFence): Promise<boolean> {
        if (!models.ID || !models.Name || !models.Code) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM);
        }
        let oldModelRes = await BeanHelper.getDao<RfidDao>(DaoType.RfidDao).findByID(models.ID);

        if (oldModelRes.code != 200 || !oldModelRes.data) {
            return Promise.reject(ErrorCode.ERROR_BACK_ERROR);
        }
        let model = _.cloneDeep(oldModelRes.data) as ElectronicFence;
        model.Name = models.Name;
        model.Code = models.Code;

        let point = models.JsonUserData.Point as SystemPoint;
        let lampPost = models.JsonUserData.lampPost as Lamp & Relation;
        let r1 = await ElectronicFenceService.updateElectronicFence(model);
        let r2: Array<boolean> | string, r3: Array<boolean> | string;
        let p = await DeviceExt.findSystemPointListByObjectID(models.ID);
        if (p && p.length > 0) {
            p.forEach((item: SystemPoint) => {
                item.Lat = point.Lat;
                item.Lon = point.Lon;
                item.LayerType = LayerType.ElectronicFence.value;
                item.ObjectType = ObjectType.ElectronicFence.value;
            });
            r2 = await DeviceExt.updateSystemPointList(p);
        } else {
            let newpoint = new SystemPoint();
            newpoint.ObjectID = model.ID;
            newpoint.LayerType = LayerType.ElectronicFence.value;
            newpoint.ObjectType = ObjectType.ElectronicFence.value;
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
            newRelation.ObjectType = lampPost.ObjectType;
            newRelation.RelatedObjectId = model.ID;
            newRelation.RelatedObjectType = TableMap.Rfid;
            newRelation.Type = ObjectType.ElectronicFence.value;
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
     * @title 批量更新电围区域
     * @param {Array<ElectronicFenceChangeAreaIDModel>} models
     * @returns {Promise<boolean>}
     */
    async changeAreaId(models: Array<ElectronicFenceChangeAreaIDModel>): Promise<boolean> {
        let ids = [] as Array<string>;
        let maps = {} as { [key: string]: ElectronicFenceChangeAreaIDModel };
        models.forEach((model: ElectronicFenceChangeAreaIDModel) => {
            ids.push(model.id);
            maps[model.id] = model;
        });
        let efenceList: Array<ElectronicFence> = await ElectronicFenceService.getElectronicFenceForIds(ids);

        efenceList.forEach((item: ElectronicFence) => {
            item.AreaID = maps[item.ID].areaId
        });
        // let result = await PosaDPDao.updateList(TableMap.Rfid, efenceList);
        let result = await BeanHelper.getDao<RfidDao>(DaoType.RfidDao).updateList(efenceList);
        if (!result) {
            this.LOGGER.error(util.format("updata error %j", result));
            return Promise.reject(ErrorCode.ERROR);
        }

        return true;
    }

    /**
     * @title 批量更新电围灯杆关系表
     * @param {Array<ElectronicFenceChangeAreaIDModel>} models
     * @returns {Promise<boolean>}
     */
    async changeLampId(models: Array<ElectronicFenceChangeAreaIDModel>): Promise<boolean> {
        let errorList = [] as Array<string>;
        models.forEach(async (model: ElectronicFenceChangeAreaIDModel) => {
            if (model.deviceReId) {
                let relation = await DeviceExt.findDeviceRelationByID(model.deviceReId);
                if (relation) {
                    relation.ObjectId = model.lampId;
                    relation.RelatedObjectId = model.id;
                    let flag = await DeviceExt.updateRelation(relation);
                    if (!flag) errorList.push(relation.RelatedObjectId);
                } else {
                    errorList.push(model.deviceReId);
                }
            } else {
                let relation = new Relation();
                relation.ObjectId = model.lampId;
                relation.ObjectType = TableMap.Lamp;
                relation.RelatedObjectId = model.id;
                relation.RelatedObjectType = TableMap.Rfid;
                relation.Type = ObjectType.ElectronicFence.value;
                let flag = await DeviceExt.addRelation(relation);
                if (!flag) errorList.push(relation.RelatedObjectId);
            }
        });
        if (errorList.length > 0) {
            this.LOGGER.error(util.format("updata error %s", errorList));
            return Promise.reject(ErrorCode.ERROR);
        }
        return true;
    }

    /**
     * @title 更新电围信息
     * @param {ElectronicFence} model
     * @returns {ThenPromise<any>}
     */

    static async updateElectronicFence(model: ElectronicFence) {
        // return await PosaDPDao.update(TableMap.Rfid, model)
        return await BeanHelper.getDao<RfidDao>(DaoType.RfidDao).update(model)
            .then(async (res: BackResponseBody<any>) => {
                return res.data;
            });
    }

    /**
     * @title 获取ids集合电围列表
     * @param {Array<string>} ids
     * @returns {ThenPromise<Array<ElectronicFence>>}
     */
    static getElectronicFenceForIds(ids: Array<string>) {
        // return PosaDPDao.findListByID(TableMap.Rfid, ids)
        return BeanHelper.getDao<RfidDao>(DaoType.RfidDao).findListByID(ids)
            .then((res: BackResponseBody<Array<ElectronicFence>>) => {
                return res.data;
            });
    }

    constructor() {
    }

}