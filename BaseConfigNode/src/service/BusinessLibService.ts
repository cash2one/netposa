import Where from "../common/Where";
import { TableMap } from "../model/Table-Map";
import ErrorCode from "../common/res/ErrorCode";
import { BusinessLib } from "../core/entity/BusinessLib";
import { BackResponseBody } from "../core/params/result/ResponseResult";
import BusinessLibCol from "../model/table-col/BusinessLib_col";
import { BusinessLibListParams } from "../core/params/BusinessLibParams";
import { BusinessLibEx } from "../core/entity/ex/BusinessLibEx";
import PortraitNodeTool from "../utils/CommonUtils";
import { AreaEx } from "../core/entity/ex/AreaEx";
import * as log4js from "log4js";
import * as util from "util";
import { AreaAndBusinessListResult } from "../core/params/BusinessLibParams";
import AreaExt from "../extend/Area";
import BusinessLibExt from "../extend/BusinessLib";
import { UserRoleData } from "../core/entity/UserRoleData";
import { BeanHelper } from '../common/help/BeanHelper';
import { DaoType } from '../dao/enum/DaoType';
import BusinessLibDao from '../dao/BusinessLibDao';
import UserRoleDataDao from '../dao/UserRoleDataDao';
import { EqualAndWhere, UnEqualAndWhere } from "../model/WhereLib";
import { FildNameLib } from "../model/FildNameLib";
import { OperateForFaceLibEnum, UserRoleDataEx } from "../core/entity/ex/UserRoleDataEx";
import { ObjectType } from "../core/enum/ObjectType";
import { BusinessLibOperateType } from "../core/server/enum/BusinessLibOperateType";


export interface IBusinessLibService {
    save(params: BusinessLib): Promise<any>;

    update(params: BusinessLib): Promise<BackResponseBody<string>>;

    detail(id: string): Promise<BackResponseBody<BusinessLib>>;

    deleteById(id: string): Promise<BackResponseBody<string>>;

    deleteByIds(ids: Array<string>): Promise<BackResponseBody<string>>;

    findBusinessLibTreeWithArea(): Promise<Array<AreaEx & BusinessLibEx>>;

    findBusinessLibTree(params: BusinessLibListParams): Promise<Array<BusinessLibEx>>;

    findHasSelfBusinessLibAndAreaTree(params: { areaId: string }): Promise<AreaAndBusinessListResult>;

    findBusinessLibHasSelfTree(params: { areaId: string }): Promise<Array<BusinessLibEx>>;

    findTreeAreaWithRole(): Promise<Array<AreaEx & UserRoleDataEx & BusinessLibEx>>;
}

export class BusinessLibService implements IBusinessLibService {

    private static LOGGER = log4js.getLogger("BusinessLibService");

    /**
     * @title 获取人像库树结构关系
     * @param {BusinessLibListParams} params
     * @returns {Promise<Array<BusinessLibEx>>}
     * @update hjj
     * @time 2017-10-24 19:41:15
     */
    async findBusinessLibTree(params: BusinessLibListParams): Promise<Array<BusinessLibEx>> {
        if (!params || params.areaId == null) {
            BusinessLibService.LOGGER.error(util.format('params %j', params));
            return Promise.reject(ErrorCode.ERROR_NO_PARAM);
        }
        let datas = await BusinessLibExt.getBusinessLib();
        return PortraitNodeTool.convert2Ztree(datas, BusinessLibCol.ID, BusinessLibCol.ParentID, "children") as Array<BusinessLibEx>;
    }

    /** create by zxq
     *  获取 当有下级库时，当前库作为子节点处理
     * @params: areaId 为空时 获取全部
     * @return: Promise<Array<BusinessLibEx>>
     * @update :hjj
     * @time: 2017-10-24 19:40:13
     */
    async findBusinessLibHasSelfTree(params: BusinessLibListParams): Promise<Array<BusinessLibEx>> {
        let result = await BusinessLibExt.getBusinessLib(null, params.areaId);
        if (result.data && result.data.length > 0) {
            let resultList: Array<BusinessLibEx> = [] as Array<BusinessLibEx>;
            let allParentIdMap = {} as { [key: string]: Array<BusinessLibEx> };
            result.data.forEach((item: BusinessLibEx) => {
                item.treeID = item.ID;
                if (item.ParentID) {
                    if (!Array.isArray(allParentIdMap[item.ParentID])) {
                        allParentIdMap[item.ParentID] = [] as Array<BusinessLibEx>;
                    }
                    allParentIdMap[item.ParentID].push(item);
                }
            });
            result.data.forEach((item: BusinessLibEx) => {
                if (allParentIdMap[item.ID]) {
                    let newChildNode = copyCurrentToParentNode(item);
                    item.ID = `_${item.ID}`;
                    resultList.push(newChildNode);
                }
            });

            return resultList.concat(result.data);
        }
        return [] as Array<BusinessLibEx>;

        /** create by zxq
         * 置当前节点为 为子节点，修改相关结构属性
         * @time: 2017-06-06 20:50:25
         */
        function copyCurrentToParentNode(item: BusinessLibEx): BusinessLibEx {
            let newChildNode: BusinessLibEx = Object.assign({}, item);
            newChildNode.ID = item.ID;
            newChildNode.treeParentId = item.ID;
            newChildNode.Name = `（本部）${item.Name}`;
            newChildNode.treeID = `_${item.ID}`;
            return newChildNode;
        }
    }


    /** update by hjj
     *  抽取获取区域总列表到 service 私有方法
     * @time: 2017-10-25 09:20:07
     */
    async findBusinessLibTreeWithArea(): Promise<Array<AreaEx & BusinessLibEx>> {
        let res = await this.findHasSelfBusinessLibAndAreaTree();
        return [].concat(res.areaExList, res.businessLibExList);
    }

    async findTreeAreaWithRole(): Promise<Array<AreaEx & UserRoleDataEx & BusinessLibEx>> {
        let res = await this.findHasSelfBusinessLibAndAreaTree();
        let moduleList = [] as Array<UserRoleDataEx & BusinessLibEx>;
        res.businessLibExList.forEach((item: BusinessLibEx) => {
            let j = {} as UserRoleDataEx & BusinessLibEx;
            j.ParentID = item.AreaID;
            j.ID = item.ID;
            j.ObjectType = ObjectType.BusinessLib.value;
            j.ObjectID = item.ID;
            j.Name = item.Name.trim();
            j.operateForFaceLib = BusinessLibService.setOperateList(item);
            moduleList.push(j)
        });
        res.areaExList.forEach((item: AreaEx) => {
            item.ParentID = null
        });
        return [].concat(res.areaExList, moduleList);
    }

    /**
     * @desc 生成人像库操作权限列表
     * @param {BusinessLibEx} faceLib
     * @return {Array<OperateForFaceLibEnum>}
     */
    static setOperateList(faceLib: BusinessLibEx) {
        let arr = [] as Array<OperateForFaceLibEnum>;
        arr.push({
            ...BusinessLibOperateType.Search,
            IsEnabled: false,
            IsSlide: false,
            ParentID: faceLib.ID,
        } as OperateForFaceLibEnum);

        arr.push({
            ...BusinessLibOperateType.Update,
            IsEnabled: false,
            IsSlide: false,
            ParentID: faceLib.ID,
        } as OperateForFaceLibEnum);

        arr.push({
            ...BusinessLibOperateType.Export,
            IsEnabled: false,
            IsSlide: false,
            ParentID: faceLib.ID,
        } as OperateForFaceLibEnum);

        arr.push({
            ...BusinessLibOperateType.Name,
            IsEnabled: false,
            IsSlide: true,
            ParentID: faceLib.ID,
            SlideIndex: -1,
            SlideList: [{ ...BusinessLibOperateType.NamePart, IsEnabled: false }, { ...BusinessLibOperateType.NameNone, IsEnabled: false }]
        } as OperateForFaceLibEnum);


        arr.push({
            ...BusinessLibOperateType.IdCard,
            IsEnabled: false,
            IsSlide: true,
            ParentID: faceLib.ID,
            SlideIndex: -1,
            SlideList: [{ ...BusinessLibOperateType.IdCardPart, IsEnabled: false }, { ...BusinessLibOperateType.IdCardNone, IsEnabled: false }]
        } as OperateForFaceLibEnum);

        return arr;
    }

    /**
     * @title 获取角色管理人像库权限树结构
     * @update  hjj
     * @time: 2017-10-24 19:42:04
     * @param params:BusinessLibListParams
     * @return Promise<AreaAndBusinessListResult>
     */
    async findHasSelfBusinessLibAndAreaTree(params?: BusinessLibListParams): Promise<AreaAndBusinessListResult> {
        let res = await Promise.all([
            AreaExt.getPosaDPJavaCache(params ? params.keyword : null),
            BusinessLibExt.getBusinessLib(params ? params.keyword : null),
        ]);
        let areaRes = res[0] as BackResponseBody<Array<AreaEx>>;
        let libsRes = res[1] as BackResponseBody<Array<BusinessLibEx>>;
        let j = {} as AreaAndBusinessListResult;
        j.businessLibExList = libsRes.data ? libsRes.data : [];
        j.areaExList = areaRes.data ? areaRes.data : [];
        return j;
    };


    /**
     * @update: hjj
     * @time: 2017-10-25 09:16:05
     * @params:
     * @return:
     */
    async save(params: BusinessLib) {
        await BusinessLibService.validateParams(params, false);
        let validateModel = await BusinessLibService.validateModel(params ? params.Name : "");
        if (!validateModel) {
            return Promise.reject(ErrorCode.ERROR_BUSINESSLIB_NAME_REPEAT);
        }
        params.CreateTime = Date.now().toString();
        let res = await BeanHelper.getDao<BusinessLibDao>(DaoType.BusinessLibDao).save(params) as BackResponseBody<string>;
        if (!res || !res.data) {
            return Promise.reject(ErrorCode.ERROR_BACK_ERROR)
        }
        let ID = res.data;
        await BusinessLibService.addRoleBusinessLib(ID, params.RoleID);
        return ID

    }

    /**
     * @title 新增人像库后添加相应的人像库权限
     * @param {string} objectID
     * @return {Promise<string>}
     * @update hjj
     * @time 2017-10-25 17:33:25
     * @info 现在无法获取到role_id 所以用测试用户的写死（待修改）
     */
    static async addRoleBusinessLib(objectID: string, roleID: string): Promise<string> {
        let roleData = {} as UserRoleData;
        roleData.RoleID = roleID
        roleData.ObjectID = objectID;
        roleData.ObjectType = TableMap.BusinessLib;
        roleData.ObjectData = JSON.stringify({ "RoleCommandList": ["Search", "Update", "Export", "Name.Part", "IdCard.Part"] });
        roleData.IsVisible = true;
        let res = await BeanHelper.getDao<UserRoleDataDao>(DaoType.UserRoleDataDao).save(roleData) as BackResponseBody<string>;
        if (res && res.data) {
            return res.data;
        } else {
            return Promise.reject(ErrorCode.ERROR_BACK_ERROR)
        }
    }

    /**
     * @update: hjj
     * @time: 2017-10-25 09:16:05
     * @params:
     * @return:
     */
    async update(params: BusinessLib) {
        await BusinessLibService.validateParams(params, true);
        let validateModel = await BusinessLibService.validateModel(params ? params.Name : "", params ? params.ID : undefined);
        if (!validateModel) {
            return Promise.reject(ErrorCode.ERROR_BUSINESSLIB_NAME_REPEAT);
        }
        let resp = await BeanHelper.getDao<BusinessLibDao>(DaoType.BusinessLibDao).findByID(params.ID);
        if (!resp || !resp.data) {
            return Promise.reject(ErrorCode.ERROR_BUSINESSLIB_NULL);
        }
        let oldModel: BusinessLib = resp.data;
        oldModel.AreaID = params.AreaID;
        oldModel.ParentID = params.ParentID;
        oldModel.Memo = params.Memo;
        oldModel.Name = params.Name;
        return await BeanHelper.getDao<BusinessLibDao>(DaoType.BusinessLibDao).update(oldModel);
    }

    /**
     * 查询详情 不查 area 详情
     * @time: 2017-05-11 13:52:35
     * @params:
     * @return:
     */
    async detail(id: string) {
        if (!id) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM);
        }
        return await BeanHelper.getDao<BusinessLibDao>(DaoType.BusinessLibDao).findByID(id);
    }


    /**
     *  根据 id 删除 一条数据
     * @time: 2017-04-10 09:40:42
     * @params: id 数据标识id
     * @return:
     */
    async deleteById(id: string) {
        if (!id) {
            return Promise.reject<number>(ErrorCode.ERROR_NO_PARAM);
        }
        return await BeanHelper.getDao<BusinessLibDao>(DaoType.BusinessLibDao).delete([id]);
    }

    /**
     * 根据ID 列表删除对应的数据
     * @time: 2017-05-06 11:50:14
     * @params:
     * @return:
     */
    async deleteByIds(ids: Array<string>) {
        if (!ids) {
            return Promise.reject<number>(ErrorCode.ERROR_NO_PARAM);
        }
        // return await BeanHelper.getDao<BusinessLibDao>(DaoType.BusinessLibDao).delete(ids);
        return await BeanHelper.getDao<BusinessLibDao>(DaoType.BusinessLibDao).deleteBusLib(ids);
    }


    /**
     *  必要参数验证 （AreaID）
     * @time: 2017-04-17 10:59:57
     * @params: isUpdate 是否为更新验证
     * @return:
     */
    private static validateParams(model: BusinessLib, isUpdate: boolean) {

        if (!model) {
            return Promise.reject<number>(ErrorCode.ERROR_NO_PARAM);
        }

        if (isUpdate && !model.ID) {
            return Promise.reject<number>(ErrorCode.ERROR_BUSINESSLIB_NULL);
        }

        if (!model.AreaID) {
            return Promise.reject<number>(ErrorCode.ERROR_BUSINESSLIB_AREAID_OR_PARENTID_NULL);
        }

        if (!model.Name) {
            return Promise.reject<number>(ErrorCode.ERROR_BUSINESSLIB_NAME_NULL);
        }

        if (!model.RoleID) {
            return Promise.reject<number>(ErrorCode.ERROR_NO_PARAM);
        }
        return null;
    };

    /**
     * 验证库名不能重复
     * @time: 2017-05-11 17:50:41
     * @params:
     * @return:
     */
    public static async validateModel(name: string, id?: string) {
        let wheres = [] as Array<Where>;
        wheres.push(EqualAndWhere(FildNameLib.Name, name))
        if (id != null) {
            wheres.push(UnEqualAndWhere(FildNameLib.ID, id))
        }
        let resp = await BeanHelper.getDao<BusinessLibDao>(DaoType.BusinessLibDao).findListByWhere(wheres) as BackResponseBody<Array<BusinessLib>>;
        return !(resp.data && resp.data.length > 0);
    };

    constructor() {
    }
}