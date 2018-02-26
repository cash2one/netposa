import * as log4js from 'log4js';
import * as util from 'util';
import AreaCol from '../model/table-col/Area_col';
import AreaDao from '../dao/AreaDao';
import AreaExt from '../extend/Area';
import BusinessLibDao from '../dao/BusinessLibDao';
import CameraDao from '../dao/CameraDao';
import ChildWhere from '../common/ChildWhere';
import DataType from '../common/DataType';
import ErrorCode from '../common/res/ErrorCode';
import IodDao from '../dao/IodDao';
import IvsServerDao from '../dao/IvsServerDao';
import JoinType from '../common/JoinType';
import LampDao from '../dao/LampDao';
import MatchingType from '../common/MatchingType';
import PersonDao from '../dao/PersonDao';
import RfidDao from '../dao/RfidDao';
import RmpGateDao from '../dao/RmpGateDao';
import UnitDao from '../dao/UnitDao';
import VideoServerDao from '../dao/VideoServerDao';
import Where from '../common/Where';
import { Area } from '../core/entity/Area';
import { AreaAndPersonListResult } from '../core/params/PersonParams';
import { AreaEx } from '../core/entity/ex/AreaEx';
import { BackResponseBody, ResponseResult } from '../core/params/result/ResponseResult';
import { BeanHelper } from '../common/help/BeanHelper';
import { BusinessLib } from '../core/server/FaceSearchPerson';
import { Camera } from '../core/entity/Camera';
import { CameraCol } from '../model/table-col/Camera_col';
import { DaoType } from '../dao/enum/DaoType';
import { ElectronicFence } from '../core/entity/ElectronicFence';
import { EqualAndWhere } from '../model/WhereLib';
import { FildNameLib } from '../model/FildNameLib';
import { Iod } from '../core/entity/Iod';
import { IvsServer } from '../core/entity/IvsServer';
import { Lamp } from '../core/entity/Lamp';
import { Person } from '../core/entity/Person';
import { PersonTreeEx } from '../core/entity/ex/PersonTreeEx';
import { RmpGate } from '../core/entity/RmpGate';
import { ServerType } from '../dao/core/BDaoImpl';
import { TreeIconSkin, TreeType } from '../core/enum/TreeType';
import { TreeParams } from '../core/params/tree/TreeParams';
import { Unit } from './../core/entity/Unit';
import { VideoServer } from '../core/entity/VideoServer';
import { Wifi } from '../core/entity/Wifi';

/**
 * Created by dell on 2017/4/8.
 */
export interface IAreaService {
    findAreaListTree(params?: TreeParams): Promise<any>;

    save(params: Area): Promise<any>;

    update(params: AreaEx): Promise<any>;

    deleteById(id: string): Promise<any>;

    deleteByIds(ids: Array<string>): Promise<any>;

    detail(id: string): Promise<BackResponseBody<AreaEx>>;

    findAreaListWithPerson(search?: string): Promise<any>;
}

export class AreaService implements IAreaService {

    private static LOGGER = log4js.getLogger("AreaService");

    async findAreaListTree(params?: TreeParams): Promise<any> {
        return await AreaExt.getPosaDPJavaCache(params ? params.keyword : null)
    }

    async findAreaListWithPerson(search?: string) {
        let res = await Promise.all([AreaExt.getPosaDPJavaCache(search), this.FindPersonList(search)]);
        let result = new AreaAndPersonListResult();
        result.areaExList = res[0].data;
        result.personExList = res[1];
        return result;
    }


    async save(params: Area): Promise<any> {
        if (!params || params.Code == null || params.ParentID == null) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM);
        }
        let r1 = await AreaService.exist(params.Code);
        let r2 = await AreaService.existById(params.ParentID);
        if (r1 && r2) {
            if (r1.data && r1.data.length > 0) {
                return Promise.reject(ErrorCode.ERROR_REPEAT_LAMP);
            } else if (!r2.data) {
                return Promise.reject(ErrorCode.ERROR_NO_PARENT_AREA);
            } else {
                params.CreateTime = Date.now().toString();
                return await BeanHelper.getDao<AreaDao>(DaoType.AreaDao).save(params, ServerType.BCS).then((res: any) => {
                    return res;
                });
            }
        } else {
            return Promise.reject(ErrorCode.ERROR_BACK_ERROR);
        }

    }

    /**
     * 更新行政区域
     * @param params
     * @returns {Promise<ResponseResult>}
     */
    async update(params: AreaEx): Promise<any> {
        console.log(params);
        params.ParentID = params.ParentArea.ID;
        let isRootArea = false;
        if (!params || params.ID == null) {
            return Promise.reject(ErrorCode.ERROR_NO_AREA);
        }
        if (!params || params.Code == null) {
            return Promise.reject(ErrorCode.ERROR_AREA_CODE_NULL);
        }
        if (!params || params.ParentID == null) {
            let res = await this.detail(params.ID);
            if (res.data && res.data.ParentID == null) {
                // 是根结点, 则允许做下一步操作
                AreaService.LOGGER.debug("是根节点, 可以进行下一步操作");
                // 这这里设置一个方法内的全局变量, 指定当前修改的是根区域
                isRootArea = true;
                return null;
            } else {
                // 否则, 则返回没有选择父行政区域的错误码
                return Promise.reject(ErrorCode.ERROR_NO_PARENT_AREA);
            }
        }
        if (!params || params.ParentID === params.ID) {
            return Promise.reject(ErrorCode.ERROR_PARENT_AREA_NOT_SELF);
        }
        let r1 = await AreaService.exist(params.Code) as BackResponseBody<Array<Area>>,
            parentArea = await AreaService.existById(params.ParentID) as Area;
        if (r1) {
            let areas = r1.data, i, len, isSameCode = false;
            // 判断是否有重复的Code
            if (areas) {
                for (i = 0, len = areas.length; i < len; i++) {
                    if (areas[i].ID !== params.ID) {
                        isSameCode = true;
                        break;
                    }
                }
            }
            if (isSameCode) {
                // 存在相同Code
                return Promise.reject(ErrorCode.ERROR_REPEAT_AREA);
            }
            if (!parentArea && !isRootArea) {
                // 若上级行政区域不存在, 且不是根区域, 则返回错误码
                return Promise.reject(ErrorCode.ERROR_NO_PARENT_AREA);
            }
        } else {
            return Promise.reject(ErrorCode.ERROR);
        }
        let originArea: Area = await BeanHelper.getDao<AreaDao>(DaoType.AreaDao).findByID(params.ID, ServerType.BCS).then((res: BackResponseBody<Area>) => {
            return res.data;
        });
        if (!originArea) {
            return Promise.reject(ErrorCode.ERROR_NO_AREA);
        }
        originArea.PYCode = params.PYCode;
        originArea.ParentID = params.ParentID;
        originArea.Code = params.Code;
        originArea.Description = params.Description;
        originArea.Name = params.Name;
        originArea.OrderNum = params.OrderNum;
        originArea.Ext = params.Ext;

        return await BeanHelper.getDao<AreaDao>(DaoType.AreaDao).update(originArea, ServerType.BCS).then((res: any) => {
            return res;
        });

    }


    async deleteById(id: string): Promise<any> {
        if (id == null) {
            return Promise.reject(ErrorCode.ERROR_NO_AREA);
        }
        let res = await BeanHelper.getDao<AreaDao>(DaoType.AreaDao).findByID(id, ServerType.BCS);
        if (res.data && !res.data.ParentID) {
            return Promise.reject(ErrorCode.ERROR_NOT_DELETE_ROOT_AREA);
        }
        let result = await BeanHelper.getDao<AreaDao>(DaoType.AreaDao).delete([id], ServerType.BCS);
        if (result.data) {
            AreaService.changeAreaWithAllRelation(res.data.ID, res.data.ParentID).then(() => {
                AreaService.LOGGER.info('已更新区域相关的所有对象')
            }).catch((e) => {
                AreaService.LOGGER.error(util.format('更新区域相关的所有对象出现异常 area: %j, error: %j', result.data, e))
            })
        }
        return result;

    }

    static changeAreaWithAllRelation(id: string, parentId: string) {
        let wheres = [EqualAndWhere(FildNameLib.AreaID, id)];
        return Promise.all([
            changeArea(),
            changePerson(),
            changUnit(),
            changeVideoServer(),
            changeIodServer(),
            changeIvsServer(),
            changeCamera(),
            changeRmpGate(),
            changeRfid(),
            changeLamp(),
            changeFaceLib()
        ]);

        /**
         * @desc 修改已删除的区域的子级区域的父级
         * @return {Promise<any>}
         */
        async function changeArea() {
            let res = await BeanHelper.getDao<AreaDao>(DaoType.AreaDao).findListByWhere([
                EqualAndWhere(FildNameLib.ParentID, id)
            ]) as BackResponseBody<Array<Area>>;
            let areaList = Array.isArray(res.data) ? res.data : [] as Array<Area>;
            if (areaList.length > 0) {
                areaList.forEach((area: Area) => {
                    area.ParentID = parentId
                });
                return BeanHelper.getDao<AreaDao>(DaoType.AreaDao).updateList(areaList,ServerType.BCS);
            }
        }

        /**
         * @desc 修改已删除的区域的子级区域的父级
         * @return {Promise<any>}
         */
        async function changUnit() {
            let res = await BeanHelper.getDao<UnitDao>(DaoType.UnitDao).findListByWhere(wheres) as BackResponseBody<Array<Unit>>;
            let unitList = Array.isArray(res.data) ? res.data : [] as Array<Unit>;
            if (unitList.length > 0) {
                unitList.forEach((unit: Unit) => {
                    unit.AreaID = parentId
                });
                return BeanHelper.getDao<UnitDao>(DaoType.UnitDao).updateList(unitList,ServerType.BCS)
            }
        }

        /**
         * @desc 修改已删除的区域的人员的父级
         * @return {Promise<any>}
         */
        async function changePerson() {
            let res = await BeanHelper.getDao<PersonDao>(DaoType.PersonDao).findListByWhere(wheres) as BackResponseBody<Array<Person>>;
            let personList = Array.isArray(res.data) ? res.data : [] as Array<Person>;
            if (personList.length > 0) {
                personList.forEach((person: Person) => {
                    person.AreaID = parentId
                });
                return BeanHelper.getDao<PersonDao>(DaoType.PersonDao).updateList(personList,ServerType.BCS);
            }
        }

        /**
         * @desc 更新视频服务器关联的AreaID
         * @return {Promise<any>}
         */
        async function changeVideoServer() {
            let res = await BeanHelper.getDao<VideoServerDao>(DaoType.VideoServerDao).findListByWhere(wheres) as BackResponseBody<Array<VideoServer>>;
            let videoServerList = Array.isArray(res.data) ? res.data : [] as Array<VideoServer>;
            if (videoServerList.length > 0) {
                videoServerList.forEach((person: VideoServer) => {
                    person.AreaID = parentId
                });
                return BeanHelper.getDao<VideoServerDao>(DaoType.VideoServerDao).updateList(videoServerList,ServerType.BCS);
            }
        }

        /**
         * @desc 更新数据服务器关联的AreaID
         * @return {Promise<any>}
         */
        async function changeIodServer() {
            let res = await BeanHelper.getDao<IodDao>(DaoType.IodDao).findListByWhere(wheres) as BackResponseBody<Array<Iod>>;
            let iodServerList = Array.isArray(res.data) ? res.data : [] as Array<Iod>;
            if (iodServerList.length > 0) {
                iodServerList.forEach((person: Iod) => {
                    person.AreaID = parentId
                });
                return BeanHelper.getDao<IodDao>(DaoType.IodDao).updateList(iodServerList);
            }
        }

        /**
         * @desc 更新视频结构化服务器关联的AreaID
         * @return {Promise<any>}
         */
        async function changeIvsServer() {
            let res = await BeanHelper.getDao<IvsServerDao>(DaoType.IvsServerDao).findListByWhere(wheres) as BackResponseBody<Array<IvsServer>>;
            let IvsServerList = Array.isArray(res.data) ? res.data : [] as Array<IvsServer>;
            if (IvsServerList.length > 0) {
                IvsServerList.forEach((person: IvsServer) => {
                    person.AreaID = parentId
                });
                return BeanHelper.getDao<IvsServerDao>(DaoType.IvsServerDao).updateList(IvsServerList);
            }
        }

        /**
         * @desc 更新Camera关联的AreaID
         * @return {Promise<any>}
         */
        async function changeCamera() {
            let res = await BeanHelper.getDao<CameraDao>(DaoType.CameraDao).findListByWhere(wheres) as BackResponseBody<Array<Camera>>;
            let cameraList = Array.isArray(res.data) ? res.data : [] as Array<Camera>;
            if (cameraList.length > 0) {
                cameraList.forEach((person: Camera) => {
                    person.AreaID = parentId
                });
                return BeanHelper.getDao<CameraDao>(DaoType.CameraDao).updateList(cameraList,ServerType.BCS);
            }
        }

        /**
         * @desc 更新RmpGate关联的AreaID
         * @return {Promise<any>}
         */
        async function changeRmpGate() {
            let res = await BeanHelper.getDao<RmpGateDao>(DaoType.RmpGateDao).findListByWhere(wheres) as BackResponseBody<Array<RmpGate>>;
            let rmpGateList = Array.isArray(res.data) ? res.data : [] as Array<RmpGate>;
            if (rmpGateList.length > 0) {
                rmpGateList.forEach((person: RmpGate) => {
                    person.AreaID = parentId
                });
                return BeanHelper.getDao<RmpGateDao>(DaoType.RmpGateDao).updateList(rmpGateList);
            }
        }

        /**
         * @desc 更新Rfid关联的AreaID
         * @return {Promise<any>}
         */
        async function changeRfid() {
            let res = await BeanHelper.getDao<RfidDao>(DaoType.RfidDao).findListByWhere(wheres) as BackResponseBody<Array<Wifi | ElectronicFence>>;
            let rfidList = Array.isArray(res.data) ? res.data : [] as Array<Wifi | ElectronicFence>;
            if (rfidList.length > 0) {
                rfidList.forEach((person: Wifi | ElectronicFence) => {
                    person.AreaID = parentId
                });
                return BeanHelper.getDao<RfidDao>(DaoType.RfidDao).updateList(rfidList);
            }
        }

        /**
         * @desc 更新Lamp关联的AreaID
         * @return {Promise<any>}
         */
        async function changeLamp() {
            let res = await BeanHelper.getDao<LampDao>(DaoType.LampDao).findListByWhere(wheres) as BackResponseBody<Array<Lamp>>;
            let lampList = Array.isArray(res.data) ? res.data : [] as Array<Lamp>;
            if (lampList.length > 0) {
                lampList.forEach((person: Lamp) => {
                    person.AreaID = parentId
                });
                return BeanHelper.getDao<LampDao>(DaoType.LampDao).updateList(lampList);
            }
        }

        /**
         * @desc 更新人像库关联的AreaID
         * @return {Promise<any>}
         */
        async function changeFaceLib() {
            let res = await BeanHelper.getDao<BusinessLibDao>(DaoType.BusinessLibDao).findListByWhere(wheres) as BackResponseBody<Array<BusinessLib>>;
            let lampList = Array.isArray(res.data) ? res.data : [] as Array<BusinessLib>;
            if (lampList.length > 0) {
                lampList.forEach((person: BusinessLib) => {
                    person.AreaID = parentId
                });
                return BeanHelper.getDao<BusinessLibDao>(DaoType.BusinessLibDao).updateList(lampList);
            }
        }
    }

    /**
     * ids 集合删除
     * @time: 2017-05-06 15:42:46
     * @params:
     * @return:
     */
    async deleteByIds(ids: Array<string>): Promise<BackResponseBody<Array<boolean>>> {
        if (!ids) {
            return Promise.reject(ErrorCode.ERROR_NO_AREA);
        }
        let actionList = [] as Array<boolean>;
        for(let i=0;i<ids.length;i++){
            let res = await this.deleteById(ids[i]);
            actionList.push(res.data)
        }
        let result = new BackResponseBody<Array<boolean>>();
        result.code = ErrorCode.OK;
        result.data = actionList;
        return result;
    }

    /**
     * 根据ID获取字段
     * @param id
     */
    async detail(id: string): Promise<BackResponseBody<AreaEx>> {
        if (id == null) {
            return Promise.reject(ErrorCode.ERROR_AREA_ID_NULL);
        }
        let res = await BeanHelper.getDao<AreaDao>(DaoType.AreaDao).findByID(id, ServerType.BCS) as BackResponseBody<AreaEx>;
        if (res.data != null && res.data.ParentID != null) {
            return await this.findParentArea(res);
        } else {
            return res
        }
    }

    private async findParentArea(result: BackResponseBody<AreaEx>) {
        return await BeanHelper.getDao<AreaDao>(DaoType.AreaDao).findByID(result.data.ParentID, ServerType.BCS).then((res: BackResponseBody<Area>) => {
            if (res.data != null) {
                // 将area组装
                result.data.ParentArea = res.data;
            }
            return result;
        });
    }


    private static exist(code: string) {
        let
            whereList = [] as Array<Where>,
            where: Where,
            childWheres = [] as Array<ChildWhere>,
            childWhere: ChildWhere;

        where = new Where();

        childWhere = new ChildWhere();
        childWhere.FieldName = AreaCol.Code;
        childWhere.FieldType = DataType.Text;
        childWhere.FieldValue = code;
        childWhere.MType = MatchingType.Equal;
        childWhere.JType = JoinType.And;
        childWheres.push(childWhere);

        where.Childs = childWheres;
        whereList.push(where);

        return BeanHelper.getDao<AreaDao>(DaoType.AreaDao).findListByWhere(whereList, ServerType.BCS);
    }

    private static existById(id: string) {
        return BeanHelper.getDao<AreaDao>(DaoType.AreaDao).findByID(id, ServerType.BCS);
    }


    private FindPersonList(search?: string) {
        return Promise.resolve(null).then(() => {
            let wheres = [] as Array<Where>;
            if (search != null) {
                let where = new Where();
                let childWheres = [] as Array<ChildWhere>;
                // 若存在查询条件的, 增加一个查询条件
                let childWhere = new ChildWhere();
                childWhere.FieldName = CameraCol.Name;
                childWhere.FieldValue = search;
                childWhere.FieldType = DataType.Text;
                childWhere.MType = MatchingType.Like;
                childWhere.JType = JoinType.And;
                childWheres.push(childWhere);
                where.Childs = childWheres;
                wheres.push(where);
            }
            // return PosaDPDao.findListByWhere(TableMap.Person, wheres);
            return BeanHelper.getDao<PersonDao>(DaoType.PersonDao).findListByWhere(wheres);
        }).then((data: BackResponseBody<Array<PersonTreeEx>>) => {
            let result = data.data || [];
            let treeType = TreeType.person.value, iconSkin = TreeIconSkin.Person;
            result.forEach((item: PersonTreeEx) => {
                item.treeType = treeType;
                item.iconSkin = iconSkin;
                item.ParentID = item.AreaID
            });
            return result;
        });
    }

    static sleep(timer: number): Promise<null> {
        return new Promise((resolve: any) => {
            setTimeout(() => {
                resolve()
            }, timer)
        })
    }

    constructor() {
    }
}