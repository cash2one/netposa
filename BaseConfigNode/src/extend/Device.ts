import { TableMap } from "../model/Table-Map";
import { SystemPoint } from "../core/entity/SystemPoint";
import { BackResponseBody } from "../core/params/result/ResponseResult";
import * as log4js from "log4js";
import * as util from "util";
import { Relation } from "../core/entity/DeviceRelation";
import Where from "../common/Where";
import ChildWhere from "../common/ChildWhere";
import { SystemPointCol } from "../model/table-col/SystemPoint_col";
import DataType from "../common/DataType";
import MatchingType from "../common/MatchingType";
import JoinType from "../common/JoinType";
import { RelationCol } from "../model/table-col/Relation_col";
import CameraExt from './Camera';
import RmpGateExt from './Rmpgate';
import WiFiExt from './Wifi';
import ElectronicFenceExt from './ElectronicFence';
import { DaoType } from '../dao/enum/DaoType';
import SystemPointDao from '../dao/SystemPointDao';
import { BeanHelper } from '../common/help/BeanHelper';
import DeviceRelationDao from '../dao/DeviceRelationDao';
export default class DeviceExt {
    private static LOGGER = log4js.getLogger("CameraExtCache");
    static Camera = CameraExt;
    static RmpGate = RmpGateExt;
    static Wifi = WiFiExt;
    static ElectronicFence = ElectronicFenceExt;

    static async findSystemPointForMap(){
        let result = await BeanHelper.getDao<SystemPointDao>(DaoType.SystemPointDao).findAll() as BackResponseBody<Array<SystemPoint>>;
        let resMap = {} as {[key:string]:SystemPoint};
        if(Array.isArray(result.data) && result.data.length>0){
            result.data.forEach((item:SystemPoint)=>{
                resMap[item.ObjectID] = item;
            })
        }
        return resMap;
    }
    static addSystemPoint(point: SystemPoint) {
        return BeanHelper.getDao<SystemPointDao>(DaoType.SystemPointDao).save(point).then(async (res: BackResponseBody<any>) => {
            return res.data;
        });
    }

    static updateSystemPoint(point: SystemPoint) {
        return BeanHelper.getDao<SystemPointDao>(DaoType.SystemPointDao).update(point).then(async (res: BackResponseBody<any>) => {
            return res.data;
        });
    }

    static updateSystemPointList(points: Array<SystemPoint>) {
        return BeanHelper.getDao<SystemPointDao>(DaoType.SystemPointDao).updateList(points).then(async (res: BackResponseBody<any>) => {
            return res.data;
        });
    }

    static findSystemPointListByObjectID(ObjectID: string) {
        // return PosaDPDao.findListByWhere(TableMap.SystemPoint, DeviceExt.ObjectIDWhere(ObjectID))
        return BeanHelper.getDao<SystemPointDao>(DaoType.SystemPointDao).findListByWhere(DeviceExt.ObjectIDWhere(ObjectID))
            .then((res: BackResponseBody<Array<SystemPoint>>) => {
                if (Array.isArray(res.data)) {
                    return res.data
                } else {
                    return []
                }
            });
    }

    static findDeviceRelationByID(ID: string) {
        return BeanHelper.getDao<DeviceRelationDao>(DaoType.DeviceRelationDao).findByID(ID)
            .then((res: BackResponseBody<Relation>) => {
                return res.data;
            });
    }

    static findDeviceRelationListForObjectID(ObjectID: string) {
        return BeanHelper.getDao<DeviceRelationDao>(DaoType.DeviceRelationDao).findListByWhere(DeviceExt.ObjectIDWhere(ObjectID, true))
            .then((res: BackResponseBody<Array<Relation>>) => {
                if (Array.isArray(res.data)) {
                    return res.data
                } else {
                    return []
                }
            });
    }

    static findDeviceRelationListForRelatedObjectID(RelatedObjectID: string) {
        // return PosaDPDao.findListByWhere(TableMap.DeviceRelation, DeviceExt.RelatedObjectIDWhere(RelatedObjectID))
        return BeanHelper.getDao<DeviceRelationDao>(DaoType.DeviceRelationDao).findListByWhere(DeviceExt.RelatedObjectIDWhere(RelatedObjectID))
        .then((res: BackResponseBody<Array<Relation>>) => {
                if (Array.isArray(res.data)) {
                    return res.data
                } else {
                    return []
                }
            });
    }

    static updateRelation(relation: Relation) {
        // return PosaDPDao.update(TableMap.DeviceRelation, relation)
        return BeanHelper.getDao<DeviceRelationDao>(DaoType.DeviceRelationDao).update(relation)
        .then(async (res: BackResponseBody<any>) => {
            return res.data;
        });
    }

    static updateRelationList(relations: Array<Relation>) {
        // return PosaDPDao.updateList(TableMap.DeviceRelation, relations)
        return BeanHelper.getDao<DeviceRelationDao>(DaoType.DeviceRelationDao).updateList(relations)
        .then(async (res: BackResponseBody<any>) => {
            return res.data;
        });
    }

    static addRelation(relation: Relation) {
        return BeanHelper.getDao<DeviceRelationDao>(DaoType.DeviceRelationDao).save(relation)
        .then((res: BackResponseBody<string>) => {
            return res.data;
        });
    }

    static ObjectIDWhere(ObjectID: string, isDevice?: boolean): Array<Where> {
        let wheres = [] as Array<Where>;
        let where = new Where();
        let childWheres = [] as Array<ChildWhere>;
        // 若存在查询条件的, 增加一个查询条件
        let childWhere = new ChildWhere();
        childWhere.FieldName = isDevice ? RelationCol.ObjectID : SystemPointCol.ObjectID;
        childWhere.FieldValue = ObjectID;
        childWhere.FieldType = DataType.Text;
        childWhere.MType = MatchingType.Equal;
        childWhere.JType = JoinType.And;
        childWheres.push(childWhere);
        if (isDevice) {
            let childWhere2 = new ChildWhere();
            childWhere2.FieldName = RelationCol.ObjectType;
            childWhere2.FieldValue = TableMap.Lamp;
            childWhere2.FieldType = DataType.Text;
            childWhere2.MType = MatchingType.Equal;
            childWhere2.JType = JoinType.And;
            childWheres.push(childWhere2);
        }
        where.Childs = childWheres;
        wheres.push(where);
        return wheres;
    }

    static RelatedObjectIDWhere(ID: string): Array<Where> {
        let wheres = [] as Array<Where>;
        let where = new Where();
        let childWheres = [] as Array<ChildWhere>;
        // 若存在查询条件的, 增加一个查询条件
        let childWhere = new ChildWhere();
        childWhere.FieldName = RelationCol.RelatedObjectID;
        childWhere.FieldValue = ID;
        childWhere.FieldType = DataType.Text;
        childWhere.MType = MatchingType.Equal;
        childWhere.JType = JoinType.And;
        childWheres.push(childWhere);

        let childWhere2 = new ChildWhere();
        childWhere2.FieldName = RelationCol.ObjectType;
        childWhere2.FieldValue = TableMap.Lamp;
        childWhere2.FieldType = DataType.Text;
        childWhere2.MType = MatchingType.Equal;
        childWhere2.JType = JoinType.And;
        childWheres.push(childWhere2);
        where.Childs = childWheres;
        wheres.push(where);
        return wheres;
    }

}