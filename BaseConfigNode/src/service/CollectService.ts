import {TableMap} from '../model/Table-Map';
import ErrorCode from "../common/res/ErrorCode";
import {Camera} from "../core/entity/Camera";
import {BackResponseBody, PageResult, ResponseResult} from '../core/params/result/ResponseResult';
import Where from "../common/Where";
import ChildWhere from "../common/ChildWhere";
import MatchingType from "../common/MatchingType";
import * as log4js from "log4js";
import JoinType from "../common/JoinType";
// 引入收藏请求相关参数
import {Collect} from '../core/entity/Collect';
import {CollectAddParams} from '../core/params/CollectParams';
import PortraitNodeTool from '../utils/CommonUtils';
import DataType from '../common/where/DataType';
import {CollectDataType} from '../core/server/enum/CollectDataType';
import CollectCol from '../model/table-col/Collect_col';
import {SearchCollectParams} from '../core/params/CollectParams';
import {CollectEx} from '../core/entity/ex/CollectEx';
import {DaoType} from '../dao/enum/DaoType';
import {BeanHelper} from '../common/help/BeanHelper';
import CollectDao from '../dao/CollectDao';
import {EqualAndWhere, InAndWhere, StartAndEndForTimeWhere} from "../model/WhereLib";
import {FildNameLib} from "../model/FildNameLib";

/**
 * 收藏service.
 * create by chendm.
 * @time: 2017-10-13
 */
export interface ICollectService {
    // 查看收藏
    findListByPage(params: SearchCollectParams): Promise<Array<CollectEx>>;

    // 查看所有收藏列表
    findListAll(params: any): Promise<Array<CollectEx>>;

    findCollectStatus(ids: Array<string>)

    // 添加收藏
    add(params: CollectAddParams): Promise<BackResponseBody<string>>;

    // 删除收藏
    delete(ids: Array<string>): Promise<boolean>;

    // objectID删除收藏
    deleteByObjectId(ids: string): Promise<boolean>;
}

export class CollectService implements ICollectService {
    private static LOGGER = log4js.getLogger("CollectService");

    findListByPage(params: SearchCollectParams): Promise<Array<CollectEx>> {
        return Promise.resolve(null)
            .then<null | number>(() => {
                if (!params.userID) {
                    return Promise.reject(ErrorCode.ERROR_NO_PARAM);
                }
                return null;
            })
            .then(() => {
                let whereList = [] as  Array<Where>;
                whereList.push(EqualAndWhere(FildNameLib.UserID, params.userID));
                if (params.objectType) {
                    whereList.push(EqualAndWhere(FildNameLib.ObjectType, params.objectType));
                }
                if (params.startTime && params.endTime) {
                    whereList.push(StartAndEndForTimeWhere(FildNameLib.CollectTime, params.startTime, FildNameLib.CollectTime, params.endTime));
                }
                // 分页
                // return PosaDPDao.findListByPage(TableMap.Collect, whereList, params.currentPage, params.pageSize);
                return BeanHelper.getDao<CollectDao>(DaoType.CollectDao).findListByWhere(whereList);
            })
            .then((res: BackResponseBody<Array<CollectEx>>) => {
                let pageResult = res.data;
                if (pageResult) {
                    pageResult.forEach((model: CollectEx) => {
                        model.JsonExtData = PortraitNodeTool.parseJSONCatchError(model.Ext);
                    });
                }
                return pageResult;
            });
    }

    findListAll(params: any): Promise<Array<CollectEx>> {
        return Promise.resolve(null)
            .then<null | number>(() => {
                if (!params.userID) {
                    return Promise.reject(ErrorCode.ERROR_NO_PARAM);
                }
                return null;
            })
            .then(() => {
                // 分页
                // return PosaDPDao.findAll(TableMap.Collect);
                return BeanHelper.getDao<CollectDao>(DaoType.CollectDao).findAll();
            })
            .then((res: BackResponseBody<Array<CollectEx>>) => {
                // 进行数据转换
                let pageResult = res.data;
                if (pageResult) {
                    pageResult.forEach((model: CollectEx) => {
                        model.JsonExtData = PortraitNodeTool.parseJSONCatchError(model.Ext);
                    });
                }
                return pageResult;
            });
    }

    async findCollectStatus(params: any) {
        if (!params.ids || !Array.isArray(params.ids) || params.ids.length === 0 || !params.userId) {
            return Promise.reject(ErrorCode.ERROR_NO_PARAM)
        }
        let result = new ResponseResult<Array<boolean>>();
        result.code = ErrorCode.OK;
        result.data = [] as Array<boolean>;
        let list = (await BeanHelper.getDao<CollectDao>(DaoType.CollectDao).findListByWhere([
            InAndWhere(FildNameLib.ObjectID,params.ids),
            EqualAndWhere(FildNameLib.UserID,params.userId),
            EqualAndWhere(FildNameLib.DataType,'Collection'),
        ])).data;
        if (!list || !Array.isArray(list) || list.length === 0) {
            list = []
        }
        params.ids.forEach((id: string) => {
            let isHas: boolean = false;
            for (let i = 0; i < list.length; i++) {
                let item = list[i] as CollectEx;
                if (id === item.ObjectID) {
                    isHas = true;
                    let j = {} as { [key: string]: boolean };
                    j[id] = true;
                    result.data.push(isHas);
                    list.splice(i, 1);
                    break;
                }
            }
            if(!isHas){
                result.data.push(false);
            }
        });
        return result
    }

    add(params: CollectAddParams): Promise<BackResponseBody<string>> {
        return Promise.resolve(null)
            .then<number | null>(validateParams)
            .then(this.findCollect(params))
            .then<null | number>((res: BackResponseBody<Array<Collect>>) => {
                if (res && res.data && res.data.length > 0) {
                    return Promise.reject(ErrorCode.ERROR_COLLECT_HAS_COLLECT);
                }
                return null;
            })
            .then(() => {
                let data = {} as Collect;
                data.CollectTime = PortraitNodeTool.formatDate(new Date());
                data.ObjectType = params.objectType;
                data.ObjectID = params.objectID;
                data.Ext = params.json;
                data.DataType = CollectDataType.Collection.value;
                data.UserID = params.userId;
                // return PosaDPDao.save(TableMap.Collect, data);
                return BeanHelper.getDao<CollectDao>(DaoType.CollectDao).save(data);
            });

        function validateParams() {
            // 判断参数是否存在
            if (params.json == null || params.objectID == null || params.objectType == null || params.userId == null) {
                return Promise.reject(ErrorCode.ERROR_NO_PARAM);
            }
            return null;
        }
    }

    delete(ids: Array<string>) {
        return Promise.resolve(null)
            .then<number | null>(validateParams)
            .then(() => {
                // return PosaDPDao.delete(TableMap.Collect, ids)
                return BeanHelper.getDao<CollectDao>(DaoType.CollectDao).delete(ids)
                    .then(() => {
                        return true;
                    });
            });

        function validateParams() {
            // 对Area进行一系列验证
            if (!ids || ids.length == 0) {
                return Promise.reject(ErrorCode.ERROR_NO_PARAM);
            }
            return null;
        }
    }

    deleteByObjectId(ids: string) {
        return Promise.resolve(null)
            .then<number | null>(validateParams)
            .then(() => {
                let whereChild = new ChildWhere();
                whereChild.FieldName = CollectCol.ObjectID;
                whereChild.FieldType = DataType.Text;
                whereChild.FieldValue = ids;
                whereChild.MType = MatchingType.Equal;
                whereChild.JType = JoinType.And;
                let where = new Where();
                where.Childs.push(whereChild);

                // return PosaDPDao.deleteByWhere(TableMap.Collect, [where]).then(()=>{
                //     return true;
                // });
                return BeanHelper.getDao<CollectDao>(DaoType.CollectDao).deleteByWhere([where]).then(() => {
                    return true;
                });
            });

        function validateParams() {
            // 对Area进行一系列验证
            if (!ids || ids.length == 0) {
                return Promise.reject(ErrorCode.ERROR_NO_PARAM);
            }
            return null;
        }
    }

    /**
     * 查询摄像机关注对象
     * @param model
     * @return {()=>any}
     */
    private findCollect(model: CollectAddParams) {
        return () => {
            return Promise.resolve(null)
                .then(() => {
                    // 验证是否已经在数据库中有记录了, 不重复加入
                    let where = new Where();
                    let childWhere = new ChildWhere();

                    childWhere.FieldName = CollectCol.UserID;
                    childWhere.FieldType = DataType.Text;
                    childWhere.FieldValue = model.userId;
                    childWhere.MType = MatchingType.Equal;
                    childWhere.JType = JoinType.And;

                    where.Childs.push(childWhere);

                    childWhere = new ChildWhere();
                    childWhere.FieldName = CollectCol.ObjectID;
                    childWhere.FieldType = DataType.Text;
                    childWhere.FieldValue = model.objectID;
                    childWhere.MType = MatchingType.Equal;
                    childWhere.JType = JoinType.And;

                    where.Childs.push(childWhere);

                    childWhere = new ChildWhere();
                    childWhere.FieldName = CollectCol.ObjectType;
                    childWhere.FieldType = DataType.Text;
                    childWhere.FieldValue = model.objectType;
                    childWhere.MType = MatchingType.Equal;
                    childWhere.JType = JoinType.And;

                    where.Childs.push(childWhere);

                    childWhere = new ChildWhere();
                    childWhere.FieldName = CollectCol.DataType;
                    childWhere.FieldType = DataType.Text;
                    childWhere.FieldValue = model.dataType;
                    childWhere.MType = MatchingType.Equal;
                    childWhere.JType = JoinType.And;

                    where.Childs.push(childWhere);

                    // return PosaDPDao.findListByWhere(TableMap.Collect, [where])/* as Promise<BackResponseBody<Array<Collect>>>*/;
                    return BeanHelper.getDao<CollectDao>(DaoType.CollectDao).findListByWhere([where])/* as Promise<BackResponseBody<Array<Collect>>>*/;
                });
        }
    }

    constructor() {
    }

}