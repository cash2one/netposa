
import {TableMap} from "../model/Table-Map";
import ErrorCode from "../common/res/ErrorCode";
import {Wifi} from "../core/entity/Wifi";
import {BackResponseBody} from "../core/params/result/ResponseResult";
import {WifiChangeAreaIDModel} from "../core/params/WifiParams";
import {WifiEx} from "../core/entity/ex/WifiEx";
import * as log4js from "log4js";
import * as util from "util";
import WiFiExt from "../extend/Wifi";
import {SystemPoint} from "../core/entity/SystemPoint";
import {Lamp} from "../core/entity/Lamp";
import {Relation} from "../core/entity/DeviceRelation";
import DeviceExt from "../extend/Device";
import {ObjectType} from "../core/enum/ObjectType";
import {LayerType} from "../core/enum/LayerType";
import {BeanHelper} from '../common/help/BeanHelper';
import RfidDao from '../dao/RfidDao';
import {DaoType} from '../dao/enum/DaoType';
import * as _ from 'lodash';
import DeviceRelationDao from "../dao/DeviceRelationDao";
import { EqualAndWhere } from "../model/WhereLib";
import { FildNameLib } from "../model/FildNameLib";

export interface IWifiService {
    findAll(): Promise<BackResponseBody<Array<WifiEx>>>;

    findListByName(name:string): Promise<BackResponseBody<Array<WifiEx>>>;

    edit(models: Wifi): Promise<boolean>;

    changeAreaId(models: Array<WifiChangeAreaIDModel>): Promise<boolean>;

    changeLampId(models: Array<WifiChangeAreaIDModel>): Promise<boolean>;
}

export class WifiService implements IWifiService {
    protected LOGGER = log4js.getLogger("WifiService");

    /**
     * @title 查询所有wifi设备
     * @returns {Promise<Array<WifiEx>>}
     */
    async findAll(): Promise<BackResponseBody<Array<WifiEx>>> {
        let res = await Promise.all([
            WiFiExt.getPosaDPJavaCache(),
            BeanHelper.getDao<DeviceRelationDao>(DaoType.DeviceRelationDao).findListByWhere([
                EqualAndWhere(FildNameLib.ObjectType, ObjectType.LampPost.value),
                EqualAndWhere(FildNameLib.RelatedObjectType, TableMap.Rfid),
                EqualAndWhere(FildNameLib.Type,ObjectType.Wifi.value)
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
     * @title 查询所有wifi设备
     * @returns {Promise<Array<WifiEx>>}
     */
    async findListByName(name:string): Promise<BackResponseBody<Array<WifiEx>>> {
        let res = await Promise.all([
            WiFiExt.getPosaDPJavaCache(name),
            BeanHelper.getDao<DeviceRelationDao>(DaoType.DeviceRelationDao).findListByWhere([
                EqualAndWhere(FildNameLib.ObjectType, ObjectType.LampPost.value),
                EqualAndWhere(FildNameLib.RelatedObjectType, TableMap.Rfid),
                EqualAndWhere(FildNameLib.Type,ObjectType.Wifi.value)
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
     * @title 编辑wifi信息，wifi点位信息，wifi灯杆关系表
     * @param {Wifi} models
     * @returns {Promise}
     */
    async edit(models: Wifi): Promise<boolean> {
        if (!models.ID || !models.Name || !models.Code) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM);
        }
        let oldModelRes = await BeanHelper.getDao<RfidDao>(DaoType.RfidDao).findByID(models.ID);

        if (oldModelRes.code != 200 || !oldModelRes.data) {
            return Promise.reject(ErrorCode.ERROR_BACK_ERROR);
        }
        let model = _.cloneDeep(oldModelRes.data) as Wifi;
        model.Name = models.Name;
        model.Code = models.Code;

        let point = models.JsonUserData.Point as SystemPoint;
        let lampPost = models.JsonUserData.lampPost as Lamp & Relation;
        let r1 = await WifiService.updateWifi(model);
        let r2: Array<boolean> | string, r3: Array<boolean> | string;
        let p = await DeviceExt.findSystemPointListByObjectID(models.ID);
        if (p && p.length > 0) {
            p.forEach((item: SystemPoint) => {
                item.Lat = point.Lat;
                item.Lon = point.Lon;
                item.LayerType = LayerType.WiFi.value;
                item.ObjectType = ObjectType.Wifi.value;
            });
            r2 = await DeviceExt.updateSystemPointList(p);
        } else {
            let newpoint = new SystemPoint();
            newpoint.ObjectID = model.ID;
            newpoint.LayerType = LayerType.WiFi.value;
            newpoint.ObjectType = ObjectType.Wifi.value;
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
            newRelation.Type = ObjectType.Wifi.value;
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
     * @title 批量更新wifi灯杆关系表
     * @param {Array<WifiChangeAreaIDModel>} models
     * @returns {Promise<boolean>}
     */
    async changeLampId(models: Array<WifiChangeAreaIDModel>): Promise<boolean> {
        let errorList = [] as Array<string>;
        models.forEach(async (model: WifiChangeAreaIDModel) => {
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
                relation.Type = ObjectType.Wifi.value;
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
     * @title 批量配置wifi区域
     * @param {Array<WifiChangeAreaIDModel>} models
     * @returns {Promise<boolean>}
     */
    async changeAreaId(models: Array<WifiChangeAreaIDModel>): Promise<boolean> {
        let ids = [] as Array<string>;
        let maps = {} as { [key: string]: WifiChangeAreaIDModel };
        models.forEach((model: WifiChangeAreaIDModel) => {
            ids.push(model.id);
            maps[model.id] = model;
        });
        let wifiList: Array<Wifi> = await WifiService.getWifiForIds(ids);

        wifiList.forEach((item: Wifi) => {
            item.AreaID = maps[item.ID].areaId
        });
        let result = await BeanHelper.getDao<RfidDao>(DaoType.RfidDao).updateList(wifiList);
        if (!result) {
            this.LOGGER.error(util.format("updata error %j", result));
            return Promise.reject(ErrorCode.ERROR);
        }
        return true;
    }

    /**
     * @title 更新wifi信息
     * @param {Wifi} model
     * @returns {ThenPromise<any>}
     */
    static async updateWifi(model: Wifi) {
        return await BeanHelper.getDao<RfidDao>(DaoType.RfidDao).update(model).then(async (res: BackResponseBody<any>) => {
            return res.data;
        });
    }

    /**
     * @title 获取ids集合wifi列表
     * @param {Array<string>} ids
     * @returns {ThenPromise<Array<Wifi>>}
     */
    static getWifiForIds(ids: Array<string>) {
        return BeanHelper.getDao<RfidDao>(DaoType.RfidDao).findListByID(ids).then((res: BackResponseBody<Array<Wifi>>) => {
            return res.data;
        });
    }

    constructor() {
    }
}