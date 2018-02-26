import Where from "../../common/where/Where";
import OrderBy from "../../common/where/OrderBy";
import {ProcedureParamStatement} from "../../core/server/ProcedureParamStatement";
/**
 * Created by dell on 2017/7/29.
 */
export interface BDao{
    /**
     * 通过条件计数
     *
     * @param statement 条件表达式
     * @param serverType
     * @return 计数
     *
     */
    countByWhere(statement:Array<Where>, serverType?: string):Promise<any>;

    /**
     * @Title: getEntityId
     * @Description: 获取实体ID
     * @param model T
     * @return String
     */
    // getEntityId(model: T): ThenPromise<any>;

    /**
     * 保存实体
     *
     * @param entity 实体
     * @param serverType
     * @return 保存后的实体ID
     */
    save(entity:Object, serverType?: string):Promise<any>;

    /**
     * @Title: save
     * @Description: 保存实体
     * @param clientTag
     *            clientTag
     * @param entity
     *            实体
     * @return 保存后的实体ID
     */
    // save(clientTag:string, entity:Object):string;

    /**
     * 批量保存实体
     *
     * @param entityList 实体集合
     * @param serverType
     * @return 保存后的实体ID集合
     */
    addList(entityList:Array<Object>, serverType?: string):Promise<any>;

    /**
     * @Title: batchSave
     * @Description: 批量保存实体
     * @param clientTag
     *            clientTag
     * @param entityList
     *            实体集合
     * @return 保存后的实体ID集合
     */
    // batchSave(clientTag:string, entityList:Array<Object>):Array<string>;

    /**
     * 更新实体
     *
     * @param entity 实体
     * @param serverType
     * @return 是/否
     */
     update(entity:Object, serverType?: string):Promise<any>;

    /**
     * @Title: update
     * @Description: 更新实体
     * @param clientTag
     *            clientTag
     * @param entity
     *            Object
     * @return 是/否
     */
     // update(clientTag:string, entity:Object):Promise<any>;

    /**
     * 批量更新实体
     *
     * @param entityList  实体集合
     * @param serverType
     * @return 是/否
     */
    updateList(entityList: Array<Object>, serverType?: string):Promise<any>;

    /**
     * @Title: batchUpdate
     * @Description: 批量更新实体
     * @param clientTag clientTag
     * @param entityList 实体集合
     * @return 是/否
     */
     // batchUpdate(clientTag: string, entityList: Array<Object>):boolean;

    /**
     * 删除实体
     *
     * @param entity 实体
     * @param serverType
     */
     delete(entity: Object, serverType?: string):Promise<any>;

    /**
     * @Title: delete
     * @Description: 删除实体
     * @param clientTag
     *            clientTag
     * @param entity
     *            实体
     */
     // delete(clientTag: string, entity: Object):void;

    /**
     * @Title: deleteById
     * @Description: 通过ID删除实体
     * @param id
     *            实体id
     */
     // deleteById(id: string):void;

    /**
     * @Title: deleteById
     * @Description: 通过ID删除实体
     * @param clientTag
     *            clientTag
     * @param id
     *            实体id
     */
    // deleteById( clientTag:string, id:string):void;

    /**
     * 批量删除实体
     *
     * @param ids
     *            id集合
     * @return 是/否
     */
    // batchDelete(ids:Array<string>):boolean;

    /**
     * @Title: batchDelete
     * @Description: 批量删除实体
     * @param idList
     *            id集合
     * @return 是/否
     */
    // batchDelete(idList:Array<string>):boolean;

    /**
     *
     * @Title: batchDelete
     * @Description: 批量删除实体
     * @param clientTag
     *            clientTag
     * @param ids
     *            id集合
     * @return 是/否
     */
    // batchDelete(clientTag:string, ids:Array<string>):boolean;

    /**
     * 清除所有实体
     *
     * @return
     */
     // deleteAll():void;

    /**
     * @Title: deleteByWhere
     * @Description: 根据查询条件删除
     * @param statement Where[]
     * @param serverType
     * @return boolean
     */
    deleteByWhere(statement:Array<Where>, serverType?: string):Promise<any>;

    /**
     * 查询所有
     *
     * @return 实体集合
     */
    findAll(serverType?: string):Promise<any>;

    /**
     * 查询所有并按某一属性排序
     *
     * @param propertyName
     *            属性名称
     * @param isAsc
     *            升序/倒序
     * @return 实体集合
     */
    // findAllOrderByProperty(propertyName:string, isAsc:boolean):Array<T>;

    /**
     * 通过ID获取实体
     *
     * @param id  ID
     * @param serverType
     * @return 实体
     */
    findByID(id:string, serverType?: string):Promise<any>;

    /**
     * 通过ID集合获取实体集合
     *
     * @param idList id集合
     * @param serverType
     * @return 实体集合
     */
    findListByID(idList:Array<string>, serverType?: string):Promise<any>;

    /**
     * 通过属性集合获取实体集合
     *
     * @param propertyName 属性名称
     * @param value 属性值
     * @return 实体集合
     */
    // findByProperty(propertyName:string, value:Object):Array<T>;

    /**
     * 通过条件获取实体集合
     *
     * @param arrWhere 条件集合
     * @param serverType
     * @return List<T>
     */
    findListByWhere(arrWhere:Array<Where>, serverType?: string):Promise<any>;

    /**
     * 通过条件获取实体集合
     *
     * @param arrWhere 条件集合
     * @param arrOrderBy 排序集合
     * @param serverType
     * @return List<T>
     */
    findListByWhereWithOrderBy(arrWhere:Array<Where>, arrOrderBy:Array<OrderBy>, serverType?: string):Promise<any>;

    /**
     * 通过条件获取导出的实体集合
     *
     * @param arrWhere
     *            条件集合
     * @param arrOrderBy
     *            排序集合
     * @return List<T>
     */
    // findExportList(arrWhere:Array<Where>, arrOrderBy:Array<OrderBy>):Array<T>;

    /**
     * 分页查询
     *
     * @param arrWhere 条件集合
     * @param pageIndex 起始页面
     * @param pageSize  页面大小
     * @param serverType
     * @return 分布结果集合
     */
    findListByPage(arrWhere:Array<Where>, pageIndex:number, pageSize:number, serverType?: string): Promise<any>;

    /**
     * 分页查询
     *
     * @param arrWhere 条件集合
     * @param arrOrderBy 排序集合
     * @param pageIndex 起始页面
     * @param pageSize 页面大小
     * @param serverType
     * @return 分布结果集合
     */
    findListByPageWithOrderBy(arrWhere:Array<Where>, arrOrderBy:Array<OrderBy>, pageIndex:number, pageSize:number, serverType?: string): Promise<any>;

    /**
     * 分页查询（返回JSON）
     *
     * @param arrWhere 条件集合
     * @param arrOrderBy 排序集合
     * @param pageIndex 起始页面
     * @param pageSize 页面大小
     * @return 分布结果集合
     */
    // findListByPageWithJson(arrWhere:Array<Where>, arrOrderBy:Array<OrderBy>, pageIndex:number, pageSize:number): PageResult<T>;

    /**
     * 调用存储过程
     *
     * @param procedureParamStatement 存储过程model
     * @param serverType
     * @return 结果集合
     */
    callProcedure(procedureParamStatement: ProcedureParamStatement, serverType?: string):Promise<any>;
}