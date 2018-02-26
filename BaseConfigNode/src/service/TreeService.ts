

/**
 * Created by hjj 2017-10-25 09:54:06
 */

import AreaExt from '../extend/Area';
import CameraExt from '../extend/Camera';
import WifiExt from '../extend/Wifi';
import RmpGateExt from "../extend/Rmpgate";
import ElectronicFenceExt from "../extend/ElectronicFence";
import LampExt from "../extend/Lamp";
import Where from "../common/Where";
import { TableMap } from "../model/Table-Map";
import {  Relation } from "../model/table-col/Relation_col"
import * as log4js from "log4js";
import * as util from "util";

import { LampEx } from "../core/entity/ex/LampEx";
import { AreaEx } from "../core/entity/ex/AreaEx";
import { CameraEx } from "../core/entity/ex/CameraEx"
import { WifiEx } from "../core/entity/ex/WifiEx";
import { RmpGateEx } from "../core/entity/ex/RmpGateEx";
import { ElectronicFenceEx } from "../core/entity/ex/ElectronicFenceEx";
import ErrorCode from "../common/res/ErrorCode";
import { TreeType, TreeIconSkin } from "../core/enum/TreeType";
import { BeanHelper } from '../common/help/BeanHelper';
import { DaoType } from '../dao/enum/DaoType';
import DeviceRelationDao from '../dao/DeviceRelationDao';
import PersonDao from '../dao/PersonDao';
import UserDao from "../dao/UserDao";
import { PersonTreeEx } from "../core/entity/ex/PersonTreeEx";
import { UserTreeEx } from "../core/entity/ex/UserTreeEx";
import { extend } from "../utils/ExtendUtils";
import { EqualAndWhere } from "../model/WhereLib";
import { FildNameLib } from "../model/FildNameLib";
import RfidDao from "../dao/RfidDao";
import { ObjectType } from "../core/enum/ObjectType";
import SystemPointDao from '../dao/SystemPointDao';
import { SystemPoint } from '../core/entity/SystemPoint';

export interface ITreeService {

    findAreaListWithCamera(search?: string): Promise<Array<AreaEx | CameraEx>>;

    findAreaListWithRfid(search?: string): Promise<Array<AreaEx | WifiEx | ElectronicFenceEx>>;

    findAreaListWithWifi(search?: string): Promise<Array<AreaEx | WifiEx>>;

    findAreaListWithRmpgate(search?: string): Promise<Array<AreaEx | RmpGateEx>>;

    findAreaListWithElectronicfence(search?: string): Promise<Array<AreaEx | ElectronicFenceEx>>;

    findAreaListWithLamp(search?: string): Promise<Array<LampEx | AreaEx>>;

    findAreaListWithPerson(search?: string): Promise<any>;

    findAreaListWithUser(search?: string): Promise<any>;

    findLampListTreeWithCamera(search?: string): Promise<Array<LampEx | AreaEx | CameraEx>>;

    findLampListTreeWithRmpGate(search?: string): Promise<Array<LampEx | AreaEx | RmpGateEx>>;


    findLampListWithAndElectronicfenceTree(search?: string): Promise<Array<AreaEx | ElectronicFenceEx | LampEx>>;

    findLampListWithWifiTree(search?: string): Promise<Array<AreaEx | WifiEx | LampEx>>;

}

export class TreeService implements ITreeService {

    private static LOGGER = log4js.getLogger("TreeService");


    /**
     * @desc 新增一个虚拟区域节点
     * @param {AreaEx} area
     * @return {AreaEx}
     */
    private static copyAreaNode(area: AreaEx): AreaEx {
        let newAreaNode = extend({}, area);
        newAreaNode.ParentID = area.ID;
        newAreaNode.ID = `_${area.ID}`;
        newAreaNode.Name = `（本部）${area.Name}`;
        return newAreaNode
    }


    /**
     * @desc 为已绑定立杆的设备增加标记
     */
    private static setLampConfigStatus(list: Array<any>, relationList: Array<Relation>) {
        for (let l = 0; l <= list.length; l++) {
            let item = list[l] as CameraEx | WifiEx | RmpGateEx | ElectronicFenceEx | any;
            if (item) {
                for (let i = 0; i <= relationList.length; i++) {
                    let item2 = relationList[i] as Relation;
                    if (item2 && item.ID === item2.RelatedObjectId) {
                        item.isConfigLamp = true;
                        relationList.splice(i, 1);
                        break;
                    }
                }
            }
            if (relationList.length === 0) {
                break;
            }
        }
        return list;
    }

    /**
     * @desc 为已绑定点位的设备增加标记
     */
    private static setPointConfigStatus(list: Array<any>, pointList: Array<SystemPoint>) {
        for (let l = 0; l <= list.length; l++) {
            let item = list[l] as CameraEx & WifiEx & RmpGateEx & ElectronicFenceEx & any;
            if (item) {
                for (let i = 0; i <= pointList.length; i++) {
                    let item2 = pointList[i] as SystemPoint;
                    if (item2 && item.ID === item2.ObjectID) {
                        item.isConfigPoint = true;
                        pointList.splice(i, 1);
                        break;
                    }
                }
            }
            if (pointList.length === 0) {
                break;
            }
        }
        return list;
    }

    /**
     * create by hjj
     * @title 获取区域和摄像机树
     * @update hjj
     * @time 2017-10-25 09:41:48
     * @param {string} search
     * @return {Promise<(AreaEx | CameraEx)[]>}
     */
    async findAreaListWithCamera(search?: string): Promise<(AreaEx | CameraEx)[]> {
        let r = await Promise.all([
            AreaExt.getPosaDPJavaCache(search),
            CameraExt.getPosaDPJavaCache(search),
            BeanHelper.getDao<DeviceRelationDao>(DaoType.DeviceRelationDao).findListByWhere([
                EqualAndWhere(FildNameLib.ObjectType, ObjectType.LampPost.value),
                EqualAndWhere(FildNameLib.RelatedObjectType, ObjectType.Camera.value)
            ]),
            BeanHelper.getDao<SystemPointDao>(DaoType.SystemPointDao).findListByWhere([
                EqualAndWhere(FildNameLib.ObjectType, ObjectType.Camera.value)
            ])
        ]);

        (!r[0].data || !Array.isArray(r[0].data)) && (r[0].data = []);
        (!r[1].data || !Array.isArray(r[1].data)) && (r[1].data = []);
        (!r[2].data || !Array.isArray(r[2].data)) && (r[2].data = []);
        (!r[3].data || !Array.isArray(r[3].data)) && (r[3].data = []);


        r[1].data = TreeService.setLampConfigStatus(r[1].data, r[2].data) as Array<CameraEx>;
        r[1].data = TreeService.setPointConfigStatus(r[1].data, r[3].data) as Array<CameraEx>

        let result = [] as Array<AreaEx | CameraEx>;
        let mergeAreaList = [] as Array<AreaEx>;
        r[0].data.forEach((area: AreaEx) => {
            for (let i = 0; i < r[1].data.length; i++) {
                let camera = r[1].data[i] as CameraEx;
                if (camera.AreaID === area.ID) {
                    let newNode = TreeService.copyAreaNode(area);
                    camera.ParentID = newNode.ID;
                    if (mergeAreaList.filter((item: AreaEx) => item.ID === camera.ParentID).length === 0) {
                        mergeAreaList.push(newNode);
                    }
                }
            }
        });
        return result.concat(mergeAreaList, r[0].data, r[1].data);
    }

    /**
     * create by hjj
     * @title 获取区域和感知数据树行结构
     * @param {string} search
     * @return {Promise<(AreaEx | WifiEx | ElectronicFenceEx)[]>}
     */
    async findAreaListWithRfid(search?: string) {
        let wheres = [] as Array<Where>;
        if (search) {
            wheres.push(EqualAndWhere(FildNameLib.Name, search))
        }
        let r = await Promise.all([
            AreaExt.getPosaDPJavaCache(search),
            BeanHelper.getDao<RfidDao>(DaoType.RfidDao).findListByWhere(wheres)]);
        let result = [] as Array<AreaEx | WifiEx | ElectronicFenceEx>;

        if (Array.isArray(r[0].data) && Array.isArray(r[1].data)) {
            if (r[1].data.length > 0) {
                let iconSkinWifi = TreeIconSkin.wifi;
                let treeTypeWifi = TreeType.wifi.value;
                let iconSkinEle = TreeIconSkin.ElectronicFence;
                let treeTypeEle = TreeType.ElectronicFence.value;
                r[1].data.forEach((item: any) => {
                    if (item.Type === ObjectType.Wifi.value) {
                        item.treeType = treeTypeWifi;
                        item.iconSkin = iconSkinWifi;
                    }
                    if (item.Type === ObjectType.ElectronicFence.value) {
                        item.treeType = treeTypeEle;
                        item.iconSkin = iconSkinEle;
                    }
                    item.ParentID = item.AreaID;
                })
            }
            let mergeAreaList = [] as Array<AreaEx>;
            r[0].data.forEach((area: AreaEx) => {
                for (let i = 0; i < r[1].data.length; i++) {
                    let camera = r[1].data[i] as WifiEx | ElectronicFenceEx;
                    if (camera.AreaID === area.ID) {
                        let newNode = TreeService.copyAreaNode(area);
                        camera.ParentID = newNode.ID;
                        if (mergeAreaList.filter((item: AreaEx) => item.ID === camera.ParentID).length === 0) {
                            mergeAreaList.push(newNode);
                        }
                    }
                }
            });
            return result.concat(mergeAreaList, r[0].data, r[1].data);
        } else {
            return Promise.reject(ErrorCode.ERROR_BACK_ERROR)
        }
    }

    /**
     * create by hjj
     * @title 获取区域和wifi树
     * @update hjj
     * @time 2017-10-25 09:43:27
     * @param {string} search
     * @return {Promise<(AreaEx | WifiEx)[]>}
     */
    async findAreaListWithWifi(search?: string) {
        let r = await Promise.all([
            AreaExt.getPosaDPJavaCache(search),
            WifiExt.getPosaDPJavaCache(search),
            BeanHelper.getDao<DeviceRelationDao>(DaoType.DeviceRelationDao).findListByWhere([
                EqualAndWhere(FildNameLib.ObjectType, ObjectType.LampPost.value),
                EqualAndWhere(FildNameLib.Type, ObjectType.Wifi.value)
            ]),
            BeanHelper.getDao<SystemPointDao>(DaoType.SystemPointDao).findListByWhere([
                EqualAndWhere(FildNameLib.ObjectType, ObjectType.Wifi.value)
            ])
        ]);

        (!r[0].data || !Array.isArray(r[0].data)) && (r[0].data = []);
        (!r[1].data || !Array.isArray(r[1].data)) && (r[1].data = []);
        (!r[2].data || !Array.isArray(r[2].data)) && (r[2].data = []);
        (!r[3].data || !Array.isArray(r[3].data)) && (r[3].data = []);

        r[1].data = TreeService.setLampConfigStatus(r[1].data, r[2].data) as Array<WifiEx>;
        r[1].data = TreeService.setPointConfigStatus(r[1].data, r[3].data) as Array<WifiEx>


        let result = [] as Array<AreaEx | WifiEx>;
        let mergeAreaList = [] as Array<AreaEx>;
        
        r[0].data.forEach((area: AreaEx) => {
            for (let i = 0; i < r[1].data.length; i++) {
                let camera = r[1].data[i] as WifiEx;
                if (camera.AreaID === area.ID) {
                    let newNode = TreeService.copyAreaNode(area);
                    camera.ParentID = newNode.ID;
                    if (mergeAreaList.filter((item: AreaEx) => item.ID === camera.ParentID).length === 0) {
                        mergeAreaList.push(newNode);
                    }
                }
            }
        });
        return result.concat(mergeAreaList, r[0].data, r[1].data);
    }

    /**
     * create by hjj
     * @desc 获取区域和卡口树
     * @time 2017-10-25 09:44:18
     * @param {string} search
     * @return {Promise<(AreaEx | RmpGateEx)[]>}
     */
    async findAreaListWithRmpgate(search?: string) {
        let r = await Promise.all([
            AreaExt.getPosaDPJavaCache(search),
            RmpGateExt.getPosaDPJavaCache(search),
            BeanHelper.getDao<DeviceRelationDao>(DaoType.DeviceRelationDao).findListByWhere([
                EqualAndWhere(FildNameLib.ObjectType, ObjectType.LampPost.value),
                EqualAndWhere(FildNameLib.RelatedObjectType, ObjectType.RmpGate.value)
            ]),
            BeanHelper.getDao<SystemPointDao>(DaoType.SystemPointDao).findListByWhere([
                EqualAndWhere(FildNameLib.ObjectType, ObjectType.RmpGate.value)
            ])
        ]);
        (!r[0].data || !Array.isArray(r[0].data)) && (r[0].data = []);
        (!r[1].data || !Array.isArray(r[1].data)) && (r[1].data = []);
        (!r[2].data || !Array.isArray(r[2].data)) && (r[2].data = []);
        (!r[3].data || !Array.isArray(r[3].data)) && (r[3].data = []);
        

        r[1].data = TreeService.setLampConfigStatus(r[1].data, r[2].data) as Array<RmpGateEx>;
        r[1].data = TreeService.setPointConfigStatus(r[1].data, r[3].data) as Array<RmpGateEx>;

        let result = [] as Array<AreaEx | RmpGateEx>;
        let mergeAreaList = [] as Array<AreaEx>;
        r[0].data.forEach((area: AreaEx) => {
            for (let i = 0; i < r[1].data.length; i++) {
                let camera = r[1].data[i] as RmpGateEx;
                if (camera.AreaID === area.ID) {
                    let newNode = TreeService.copyAreaNode(area);
                    camera.ParentID = newNode.ID;
                    if (mergeAreaList.filter((item: AreaEx) => item.ID === camera.ParentID).length === 0) {
                        mergeAreaList.push(newNode);
                    }
                }
            }
        });
        return result.concat(mergeAreaList, r[0].data, r[1].data);
    }

    /**
     * create by hjj
     * @title 获取区域和电围树
     * @update hjj
     * @time 2017-10-25 09:45:01
     * @param {string} search
     * @return {Promise<(AreaEx | ElectronicFenceEx)[]>}
     */
    async findAreaListWithElectronicfence(search?: string) {
        let r = await Promise.all([
            AreaExt.getPosaDPJavaCache(search),
            ElectronicFenceExt.getPosaDPJavaCache(search),
            BeanHelper.getDao<DeviceRelationDao>(DaoType.DeviceRelationDao).findListByWhere([
                EqualAndWhere(FildNameLib.ObjectType, ObjectType.LampPost.value),
                EqualAndWhere(FildNameLib.Type, ObjectType.ElectronicFence.value)
            ]),
            BeanHelper.getDao<SystemPointDao>(DaoType.SystemPointDao).findListByWhere([
                EqualAndWhere(FildNameLib.ObjectType, ObjectType.ElectronicFence.value)
            ])
        ]);

        (!r[0].data || !Array.isArray(r[0].data)) && (r[0].data = []);
        (!r[1].data || !Array.isArray(r[1].data)) && (r[1].data = []);
        (!r[2].data || !Array.isArray(r[2].data)) && (r[2].data = []);
        (!r[3].data || !Array.isArray(r[3].data)) && (r[3].data = []);
        r[1].data = TreeService.setLampConfigStatus(r[1].data, r[2].data) as Array<ElectronicFenceEx>
        r[1].data = TreeService.setPointConfigStatus(r[1].data, r[3].data) as Array<ElectronicFenceEx>
        let result = [] as Array<AreaEx | ElectronicFenceEx>;
        let mergeAreaList = [] as Array<AreaEx>;
        r[0].data.forEach((area: AreaEx) => {
            for (let i = 0; i < r[1].data.length; i++) {
                let camera = r[1].data[i] as ElectronicFenceEx;
                if (camera.AreaID === area.ID) {
                    let newNode = TreeService.copyAreaNode(area);
                    camera.ParentID = newNode.ID;
                    if (mergeAreaList.filter((item: AreaEx) => item.ID === camera.ParentID).length === 0) {
                        mergeAreaList.push(newNode);
                    }
                }
            }
        });
        return result.concat(mergeAreaList, r[0].data, r[1].data);
    }

    /**
     * create by hjj
     * @title 获取区域和灯杆树
     * @update hjj
     * @time 2017-10-25 09:45:54
     * @param {string} search
     * @return {Promise<(LampEx | AreaEx)[]>}
     */
    async findAreaListWithLamp(search?: string) {
        let r = await Promise.all([AreaExt.getPosaDPJavaCache(search), LampExt.getPosaDPJavaCache(search)]);
        let result = [] as Array<AreaEx | LampEx>;
        if (Array.isArray(r[0].data) && Array.isArray(r[1].data)) {
            let mergeAreaList = [] as Array<AreaEx>;
            r[0].data.forEach((area: AreaEx) => {
                for (let i = 0; i < r[1].data.length; i++) {
                    let lamp = r[1].data[i] as LampEx;
                    if (lamp.AreaID === area.ID) {
                        let newNode = TreeService.copyAreaNode(area);
                        lamp.ParentID = newNode.ID;
                        if (mergeAreaList.filter((item: AreaEx) => item.ID === lamp.ParentID).length === 0) {
                            mergeAreaList.push(newNode);
                        }
                    }
                }
            });
            return result.concat(mergeAreaList, r[0].data, r[1].data);
        } else {
            return Promise.reject(ErrorCode.ERROR_BACK_ERROR)
        }
    }

    /**
     * @title 获取区域和Person树行结构
     * @param search
     * @returns {Promise<>}
     */
    async findAreaListWithPerson(search?: string) {
        let r = await Promise.all([AreaExt.getPosaDPJavaCache(search), BeanHelper.getDao<PersonDao>(DaoType.PersonDao).findAll()]);
        let result = [] as Array<AreaEx | PersonTreeEx>;
        if (Array.isArray(r[0].data) && Array.isArray(r[1].data)) {
            if (r[1].data.length > 0) {
                let iconSkin = TreeIconSkin.Person;
                let treeType = TreeType.person.value;
                r[1].data.forEach((item: any) => {
                    item.treeType = treeType;
                    item.iconSkin = iconSkin;
                    item.ParentID = item.AreaID;
                })
            }
            let mergeAreaList = [] as Array<AreaEx>;
            r[0].data.forEach((area: AreaEx) => {
                for (let i = 0; i < r[1].data.length; i++) {
                    let camera = r[1].data[i] as PersonTreeEx;
                    if (camera.AreaID === area.ID) {
                        let newNode = TreeService.copyAreaNode(area);
                        camera.ParentID = newNode.ID;
                        if (mergeAreaList.filter((item: AreaEx) => item.ID === camera.ParentID).length === 0) {
                            mergeAreaList.push(newNode);
                        }
                    }
                }
            });
            return result.concat(mergeAreaList, r[0].data, r[1].data);
        } else {
            return Promise.reject(ErrorCode.ERROR_BACK_ERROR)
        }
    }

    /**
     * @title 获取区域和U树行结构
     * @param search
     * @returns {Promise<>}
     */
    async findAreaListWithUser(search?: string) {
        let r = await Promise.all([
            AreaExt.getPosaDPJavaCache(search),
            BeanHelper.getDao<PersonDao>(DaoType.PersonDao).findAll(),
            BeanHelper.getDao<UserDao>(DaoType.UserDao).findAll()]);
        let result = [] as Array<any>;
        let r1 = r[0].data as Array<AreaEx>;
        let r2 = r[1].data as Array<PersonTreeEx>;
        let r3 = r[2].data as Array<UserTreeEx>;
        let iconSkin = TreeIconSkin.Person;
        let treeType = TreeType.person.value;

        if (Array.isArray(r1) && Array.isArray(r2) && Array.isArray(r3)) {
            r2.forEach((person: PersonTreeEx) => {
                r3.forEach((user: UserTreeEx) => {
                    if (person.ID == user.PersonID) {
                        user.AreaID = person.AreaID;
                        user.treeType = treeType;
                        user.iconSkin = iconSkin;
                        user.ParentID = person.AreaID;
                        user.Name = person.Name;
                    }
                })
            });


            let mergeAreaList = [] as Array<AreaEx>;
            r1.forEach((area: AreaEx) => {
                for (let i = 0; i < r3.length; i++) {
                    let camera = r3[i] as UserTreeEx;
                    if (camera.AreaID === area.ID) {
                        let newNode = TreeService.copyAreaNode(area);
                        camera.ParentID = newNode.ID;
                        if (mergeAreaList.filter((item: AreaEx) => item.ID === camera.ParentID).length === 0) {
                            mergeAreaList.push(newNode);
                        }
                    }
                }
            });
            return result.concat(mergeAreaList, r1, r3);
        } else {
            return Promise.reject(ErrorCode.ERROR_BACK_ERROR)
        }
    }

    /**
     * create by hjj
     * @title 获取区域+灯杆+电围树
     * @update hjj
     * @time 2017-10-25 09:46:42
     * @param {string} search
     * @return {Promise<(AreaEx | ElectronicFenceEx | LampEx)[]>}
     */
    async findLampListWithAndElectronicfenceTree(search?: string) {
        let r = await Promise.all([
            AreaExt.getPosaDPJavaCache(search),
            LampExt.getPosaDPJavaCache(search),
            ElectronicFenceExt.getPosaDPJavaCache(search),
            TreeService.FindRelationTable(TableMap.Lamp, TableMap.Rfid)
        ]);
        let r1 = r[0].data as Array<AreaEx>;
        let r2 = r[1].data as Array<LampEx>;
        let r3 = r[2].data as Array<ElectronicFenceEx>;
        let r4 = r[3] as Array<Relation>;
        if (!Array.isArray(r[0].data) || !Array.isArray(r[1].data) || !Array.isArray(r[2].data)) {
            return Promise.reject(ErrorCode.ERROR_BACK_ERROR)
        }
        let isBindLampElectronicFenceEx = [] as Array<ElectronicFenceEx>;
        let tempRelation = {} as { [key: string]: Relation };
        r4.forEach((item: Relation) => {
            tempRelation[item.RelatedObjectId] = item;
        });
        r3.forEach((item: ElectronicFenceEx) => {
            if (tempRelation[item.ID]) {
                item.ParentID = tempRelation[item.ID].ObjectId;
                item.JsonUserData.DeviceReId = tempRelation[item.ID].ID;
                isBindLampElectronicFenceEx.push(item)
            }
        });
        let result = [] as Array<AreaEx | ElectronicFenceEx | LampEx>;
        return result.concat(r1, r2, isBindLampElectronicFenceEx);
    }

    /**
     * create by hjj
     * @title 获取区域+灯杆+wifi树
     * @update hjj
     * @time 2017-10-25 09:47:55
     * @param {string} search
     * @return {Promise<(AreaEx | WifiEx | LampEx)[]>}
     */
    async findLampListWithWifiTree(search?: string) {
        let r = await Promise.all([
            AreaExt.getPosaDPJavaCache(search),
            LampExt.getPosaDPJavaCache(search),
            WifiExt.getPosaDPJavaCache(search),
            TreeService.FindRelationTable(TableMap.Lamp, TableMap.Rfid)
        ]);
        let r1 = r[0].data as Array<AreaEx>;
        let r2 = r[1].data as Array<LampEx>;
        let r3 = r[2].data as Array<WifiEx>;
        let r4 = r[3] as Array<Relation>;
        if (!Array.isArray(r[0].data) || !Array.isArray(r[1].data) || !Array.isArray(r[2].data)) {
            return Promise.reject(ErrorCode.ERROR_BACK_ERROR)
        }
        let isBindLampWifiEx = [] as Array<WifiEx>;
        let tempRelation = {} as { [key: string]: Relation };
        r4.forEach((item: Relation) => {
            tempRelation[item.RelatedObjectId] = item;
        });
        r3.forEach((item: WifiEx) => {
            if (tempRelation[item.ID]) {
                item.ParentID = tempRelation[item.ID].ObjectId;
                item.JsonUserData.DeviceReId = tempRelation[item.ID].ID;
                isBindLampWifiEx.push(item)
            }
        });
        let result = [] as Array<AreaEx | WifiEx | LampEx>;
        return result.concat(r1, r2, isBindLampWifiEx);
    }

    /**
     * create by hjj
     * @title 获取区域+灯杆+摄像机树
     * @update hjj
     * @time 2017-10-25 09:49:28
     * @param {string} search
     * @return {Promise<(AreaEx | CameraEx | LampEx)[]>}
     */
    async findLampListTreeWithCamera(search?: string) {
        let r = await Promise.all([
            AreaExt.getPosaDPJavaCache(search),
            LampExt.getPosaDPJavaCache(search),
            CameraExt.getPosaDPJavaCache(search),
            TreeService.FindRelationTable(TableMap.Lamp, TableMap.Camera)
        ]);
        let r1 = r[0].data as Array<AreaEx>;
        let r2 = r[1].data as Array<LampEx>;
        let r3 = r[2].data as Array<CameraExt>;
        let r4 = r[3] as Array<Relation>;
        if (!Array.isArray(r[0].data) || !Array.isArray(r[1].data) || !Array.isArray(r[2].data)) {
            return Promise.reject(ErrorCode.ERROR_BACK_ERROR)
        }
        let isBindLampCametaEx = [] as Array<CameraEx>;
        let tempRelation = {} as { [key: string]: Relation };
        r4.forEach((item: Relation) => {
            tempRelation[item.RelatedObjectId] = item;
        });
        r3.forEach((item: CameraEx) => {
            if (tempRelation[item.ID]) {
                item.ParentID = tempRelation[item.ID].ObjectId;
                item.JsonUserData.DeviceReId = tempRelation[item.ID].ID;
                isBindLampCametaEx.push(item)
            }
        });
        let result = [] as Array<AreaEx | CameraEx | LampEx>;
        return result.concat(r1, r2, isBindLampCametaEx);
    }


    /**
     * create by hjj
     * @title 区域+灯杆+卡口树
     * @update hjj
     * @time 2017-10-25 09:50:04
     * @param {string} search
     * @return {Promise<(AreaEx | RmpGateEx | LampEx)[]>}
     */
    async findLampListTreeWithRmpGate(search?: string) {
        let r = await Promise.all([
            AreaExt.getPosaDPJavaCache(search),
            LampExt.getPosaDPJavaCache(search),
            RmpGateExt.getPosaDPJavaCache(search),
            TreeService.FindRelationTable(TableMap.Lamp, TableMap.RmpGate)
        ]);
        let r1 = r[0].data as Array<AreaEx>;
        let r2 = r[1].data as Array<LampEx>;
        let r3 = r[2].data as Array<RmpGateEx>;
        let r4 = r[3] as Array<Relation>;
        if (!Array.isArray(r[0].data) || !Array.isArray(r[1].data) || !Array.isArray(r[2].data)) {
            return Promise.reject(ErrorCode.ERROR_BACK_ERROR)
        }
        let isBindLampRmpGateExEx = [] as Array<RmpGateEx>;
        let tempRelation = {} as { [key: string]: Relation };
        r4.forEach((item: Relation) => {
            tempRelation[item.RelatedObjectId] = item;
        });
        r3.forEach((item: RmpGateEx) => {
            if (tempRelation[item.ID]) {
                item.ParentID = tempRelation[item.ID].ObjectId;
                item.JsonUserData.DeviceReId = tempRelation[item.ID].ID;
                isBindLampRmpGateExEx.push(item)
            }
        });
        let result = [] as Array<AreaEx | RmpGateEx | LampEx>;
        return result.concat(r1, r2, isBindLampRmpGateExEx);
    }

    /**
     * @title 获取灯杆设备关系表ID集合
     * @update hjj
     * @time 2017-10-25 09:51:26
     * @param {string} type
     * @param {string} relationType
     * @return {Promise<Array<Relation>>}
     *
     */
    private static async FindRelationTable(type: string, relationType: string) {
        let wheres = [] as Array<Where>;
        if (type) {
            wheres.push(EqualAndWhere(FildNameLib.ObjectType, type));
        }
        if (relationType) {
            wheres.push(EqualAndWhere(FildNameLib.RelatedObjectType, relationType));
        }
        let res = await BeanHelper.getDao<DeviceRelationDao>(DaoType.DeviceRelationDao).findListByWhere(wheres);
        return res.data ? res.data : [];
    }

    constructor() {
    }
}