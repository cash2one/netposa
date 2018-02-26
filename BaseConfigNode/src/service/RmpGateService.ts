import {TableMap} from "../model/Table-Map";
import ErrorCode from "../common/res/ErrorCode";
import {RmpGate} from "../core/entity/RmpGate";
import {BackResponseBody} from "../core/params/result/ResponseResult";
import {RmpGateChangeAreaIDModel} from "../core/params/RmpGateParams";
import {RmpGateEx} from "../core/entity/ex/RmpGateEx";
import * as log4js from "log4js";
import * as util from "util";
import RmpGateExt from "../extend/Rmpgate";
import {SystemPoint} from "../core/entity/SystemPoint";
import {Lamp} from "../core/entity/Lamp";
import {Relation} from "../core/entity/DeviceRelation";
import DeviceExt from "../extend/Device";
import {ObjectType} from '../core/enum/ObjectType';
import {LayerType} from '../core/enum/LayerType';
import {BeanHelper} from '../common/help/BeanHelper';
import RmpGateDao from '../dao/RmpGateDao';
import {DaoType} from '../dao/enum/DaoType';
import * as _ from 'lodash';
import { EqualAndWhere } from "../model/WhereLib";
import { FildNameLib } from "../model/FildNameLib";
import DeviceRelationDao from "../dao/DeviceRelationDao";

export interface IRmpGateService {
    findAll(): Promise<BackResponseBody<Array<RmpGateEx>>>;

    findListByName(name:string): Promise<BackResponseBody<Array<RmpGateEx>>>;

    edit(models: RmpGate): Promise<boolean>;

    changeAreaId(models: Array<RmpGateChangeAreaIDModel>): Promise<boolean>;

    changeLampId(models: Array<RmpGateChangeAreaIDModel>): Promise<boolean>;
}

export class RmpGateService implements IRmpGateService {
    protected LOGGER = log4js.getLogger("RmpGateService");

    /**
     * @title 查询所有卡口设备
     * @returns {Promise<Array<RmpGateEx>>}
     */
    async findAll(): Promise<BackResponseBody<Array<RmpGateEx>>> {
        let res = await Promise.all([
            RmpGateExt.getPosaDPJavaCache(),
            BeanHelper.getDao<DeviceRelationDao>(DaoType.DeviceRelationDao).findListByWhere([
                EqualAndWhere(FildNameLib.ObjectType, ObjectType.LampPost.value),
                EqualAndWhere(FildNameLib.RelatedObjectType, TableMap.RmpGate)
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
     * @title 查询所有卡口设备
     * @returns {Promise<Array<RmpGateEx>>}
     */
    async findListByName(name:string): Promise<BackResponseBody<Array<RmpGateEx>>> {
        let res = await Promise.all([
            RmpGateExt.getPosaDPJavaCache(name),
            BeanHelper.getDao<DeviceRelationDao>(DaoType.DeviceRelationDao).findListByWhere([
                EqualAndWhere(FildNameLib.ObjectType, ObjectType.LampPost.value),
                EqualAndWhere(FildNameLib.RelatedObjectType, TableMap.RmpGate)
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
     * @title 更新卡口信息，卡口点位信息，卡口灯杆关系表
     * @param {RmpGate} models
     * @returns {Promise<boolean>}
     */
    async edit(models: RmpGate): Promise<boolean> {
        if (!models.ID || !models.Name || !models.Code) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM);
        }
        let oldModelRes = await BeanHelper.getDao<RmpGateDao>(DaoType.RmpGateDao).findByID(models.ID);

        if (oldModelRes.code != 200 || !oldModelRes.data) {
            return Promise.reject(ErrorCode.ERROR_BACK_ERROR);
        }
        let model = _.cloneDeep(oldModelRes.data) as RmpGate;
        model.Name = models.Name;
        model.Code = models.Code;
        let point = models.JsonUserData.Point as SystemPoint;
        let lampPost = models.JsonUserData.lampPost as Lamp & Relation;
        let r1 = await RmpGateService.updateRmpGate(model);
        let r2: Array<boolean>, r3: Array<boolean> | string;
        let p = await DeviceExt.findSystemPointListByObjectID(models.ID);
        if (p && p.length > 0) {
            p.forEach((item: SystemPoint) => {
                item.Lat = point.Lat;
                item.Lon = point.Lon;
                item.LayerType = LayerType.RmpGate.value;
                item.ObjectType = ObjectType.RmpGate.value;
            });
            r2 = await DeviceExt.updateSystemPointList(p);
        } else {
            let newpoint = new SystemPoint();
            newpoint.ObjectID = model.ID;
            newpoint.LayerType = LayerType.RmpGate.value;
            newpoint.ObjectType = ObjectType.RmpGate.value;
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
            newRelation.RelatedObjectType = TableMap.RmpGate;
            newRelation.Type = ObjectType.RmpGate.value;
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
     * @title 批量配置卡口区域
     * @param {Array<RmpGateChangeAreaIDModel>} models
     * @returns {Promise<any>}
     */
    async changeAreaId(models: Array<RmpGateChangeAreaIDModel>) {
        let ids = [] as Array<string>;
        let maps = {} as { [key: string]: RmpGateChangeAreaIDModel };
        models.forEach((model: RmpGateChangeAreaIDModel) => {
            ids.push(model.id);
            maps[model.id] = model;
        });
        let rmpgateList: Array<RmpGate> = await RmpGateService.getRmpGateForIds(ids);

        rmpgateList.forEach((item: RmpGate) => {
            item.AreaID = maps[item.ID].areaId
        });
        let result = await BeanHelper.getDao<RmpGateDao>(DaoType.RmpGateDao).updateList(rmpgateList);
        if (!result) {
            this.LOGGER.error(util.format("updata error %j", result));
            return Promise.reject(ErrorCode.ERROR);
        }
        return true;
    }

    /**
     * @title 批量配置卡口灯杆信息
     * @param {Array<RmpGateChangeAreaIDModel>} models
     * @returns {Promise<RmpGateChangeAreaIDModel>}
     */
    async changeLampId(models: Array<RmpGateChangeAreaIDModel>) {
        let errorList = [] as Array<string>;
        models.forEach(async (model: RmpGateChangeAreaIDModel) => {
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
                relation.RelatedObjectType = TableMap.RmpGate;
                relation.Type = ObjectType.RmpGate.value;
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

    static async updateRmpGate(model: RmpGate) {
        return await BeanHelper.getDao<RmpGateDao>(DaoType.RmpGateDao).update(model).then(async (res: BackResponseBody<any>) => {
            return res.data;
        });
    }

    static getRmpGateForIds(ids: Array<string>) {
        return BeanHelper.getDao<RmpGateDao>(DaoType.RmpGateDao).findListByID(ids).then((res: BackResponseBody<Array<RmpGate>>) => {
            return res.data;
        });
    }

    constructor() {

    }

}