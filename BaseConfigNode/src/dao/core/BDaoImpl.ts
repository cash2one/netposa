import * as log4js from "log4js";
import { BDao } from "./BDao";
import Where from "../../common/where/Where";
import OrderBy from "../../common/where/OrderBy";
import Config from "../../Config";
import { ProcedureParamStatement } from "../../core/server/ProcedureParamStatement";
import { PostData, _Dao } from "./_Dao";
export const ServerType = {
    PDP: "pdp",
    BCS: "bcs"
};
/**
 * Created by dell on 2017/7/29.
 */
export abstract class BDaoImpl implements BDao {
    abstract DaoName: string;
    abstract ModelName: string;
    private static BCS_URL = Config.BASE_CONFIG_SERVER_URL;
    private static PDP_URL = Config.POSA_CONFIG_SERVER_URL;

    private static FIND_LIST_BY_WHERE_URL = "/db/findListByWhere";
    private static SAVE_URL = "/db/add";
    private static ADD_LIST_URL = "/db/addList";
    private static UPDATE_URL = "/db/update";
    private static UPDATE_LIST_URL = "/db/updateList";
    private static DELETE_URL = "/db/delete";
    private static DELETE_BY_WHERE_URL = "/db/deleteByWhere";
    private static EXIST_URL = "/db/exist";
    private static FIND_ALL_URL = "/db/findAll";
    private static FIND_BY_ID_URL = "/db/findByID";
    private static FIND_LIST_BY_ID_URL = "/db/findListByID";
    private static FIND_LIST_BY_PAGE_URL = "/db/findListByPage";
    private static FIND_LIST_BY_PAGE_WITH_ORDER_BY_URL = "/db/findListByPageWithOrderBy";
    private static FIND_LIST_BY_WHERE_WITH_ORDER_BY_URL = "/db/findListByWhereWithOrderBy";
    private static CALL_PROCEDURE_URL = "/db/callProcedure2";
    private static COUNT_BY_WHERE_URL = "/db/countByWhere";
    // bcs和fds db/dbctrl不同
    private static CALL_PROCEDURE_NEW = "/db/callProcedure2";
    private static TREE_AREA_BY_PARAENT_AREAID = "/baseconfig/treeAreaByParentAreaID";

    protected static KEY_CLASS_SIMPLE_NAME = "classSimpleName";
    protected static KEY_ARR_WHERE_JSON = "arrWhereJson";
    protected static KEY_ARR_ORDER_BY_JSON = "arrOrderByJson";
    protected static KEY_MODEL_JSON = "modelJson";
    protected static KEY_MODEL_LIST_JSON = "modelListJson";
    protected static KEY_ID_LIST_JSON = "idListJson";
    protected static KEY_ID = "id";
    protected static KEY_CURRENT_PAGE = "currentPage";
    protected static KEY_PAGE_SIZE = "pageSize";
    protected static KEY_PROCEDURE_PARAM_STATEMENT_JSON = "procedureParamStatementJson";

    private LOGGER = log4js.getLogger("BDaoImpl");

    constructor() { }

    protected getUrl(suffix: string, serverType?: string) {
        let result = BDaoImpl.PDP_URL;
        switch (serverType) {
            case ServerType.BCS:
                result = BDaoImpl.BCS_URL;
                break;
            case ServerType.PDP:
                result = BDaoImpl.PDP_URL;
                break;
        }
        return result + suffix;
    }
    /**
     * 专门针对db和dbctrl不同前缀进行的判断处理
     * 等什么时候 db和dbctrl统一了 此方法就可以换掉
     * @param suffix 前缀
     * @param serverType 服务类型
     */
    private _get_db_Or_dbCtrlUrl(suffix: string, serverType?: string) {
        let result = null;
        switch (serverType) {
            case ServerType.BCS:
                result = BDaoImpl.BCS_URL + suffix;
                break;
            case ServerType.PDP:
                result = BDaoImpl.PDP_URL + suffix.replace(/\/db/, "\/dbCtrl");
                break;
            default:
                result = BDaoImpl.PDP_URL + suffix.replace(/\/db/, "\/dbCtrl");
                break;
        }
        return result;
    }

    protected setPostData(postData: PostData, key: string, value: Object) {
        postData[key] = value;
    }

    countByWhere(statement: Array<Where>, serverType?: string): /*number*/Promise<any> {
        let postData = {} as PostData;
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_ARR_WHERE_JSON, JSON.stringify(statement));
        return _Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.COUNT_BY_WHERE_URL, serverType), postData);
    }

    // getEntityId(model: T, serverType?: string): string {
    //     return undefined;
    // }

    save(entity: Object, serverType?: string): Promise<any>/*string*/ {
        let postData = {} as PostData;
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_MODEL_JSON, JSON.stringify(entity));
        return _Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.SAVE_URL, serverType), postData);
    }

    // save(clientTag: string, entity: Object, serverType?: string): string {
    //     return undefined;
    // }

    addList(entityList: Array<Object>, serverType?: string): /*Array<string>*/Promise<any> {
        let postData = {} as PostData;
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_MODEL_LIST_JSON, JSON.stringify(entityList));
        console.log('event=========', JSON.stringify(entityList));
        return _Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.ADD_LIST_URL, serverType), postData);
    }

    // batchSave(clientTag: string, entityList: Array<Object>, serverType?: string): Array<string> {
    //     return undefined;
    // }

    update(entity: Object, serverType?: string): /*boolean*/Promise<any> {
        let postData = {} as PostData;
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_MODEL_JSON, JSON.stringify(entity));
        return _Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.UPDATE_URL, serverType), postData);
    }

    // update(clientTag: string, entity: Object, serverType?: string): boolean {
    //     return undefined;
    // }

    updateList(entityList: Array<Object>, serverType?: string): /*boolean*/Promise<any> {
        let postData = {} as PostData;
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_MODEL_LIST_JSON, JSON.stringify(entityList));
        return _Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.UPDATE_LIST_URL, serverType), postData);
    }

    // batchUpdate(clientTag: string, entityList: Array<Object>, serverType?: string): boolean {
    //     return undefined;
    // }

    delete(ids: Array<string>, serverType?: string): /*void*/Promise<any> {
        let postData = {} as PostData;
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_ID_LIST_JSON, JSON.stringify(ids));
        return _Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.DELETE_URL, serverType), postData);
    }

    deleteByWhere(statement: Array<Where>, serverType?: string): /*boolean*/Promise<any> {
        let postData = {} as PostData;
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_ARR_WHERE_JSON, JSON.stringify(statement));
        return _Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.DELETE_BY_WHERE_URL, serverType), postData);
    }

    exist(id: string, serverType?: string): Promise<any> {
        let postData = {} as PostData;
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_ID, id);
        return _Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.EXIST_URL, serverType), postData);
    }

    findAll(serverType?: string): Promise<any>/*Array<T>*/ {
        let postData = {} as PostData;
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        return _Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.FIND_ALL_URL, serverType), postData);
    }

    findByID(id: string, serverType?: string): /*T*/Promise<any> {
        let postData = {} as PostData;
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_ID, id);
        return _Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.FIND_BY_ID_URL, serverType), postData);
    }

    findListByID(idList: Array<string>, serverType?: string): /*Array<T>*/Promise<any> {
        let postData = {} as PostData;
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_ID_LIST_JSON, JSON.stringify(idList));
        return _Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.FIND_LIST_BY_ID_URL, serverType), postData);
    }

    findListByWhere(arrWhere: Array<Where>, serverType?: string): /*Array<T>*/Promise<any> {
        let postData = {} as PostData;
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_ARR_WHERE_JSON, JSON.stringify(arrWhere));
        return _Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.FIND_LIST_BY_WHERE_URL, serverType), postData);
    }

    findListByWhereWithOrderBy(arrWhere: Array<Where>, arrOrderBy: Array<OrderBy>, serverType?: string): /*Array<T>*/Promise<any> {
        let postData = {} as PostData;
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_ARR_WHERE_JSON, JSON.stringify(arrWhere));
        this.setPostData(postData, BDaoImpl.KEY_ARR_ORDER_BY_JSON, JSON.stringify(arrOrderBy));
        return _Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.FIND_LIST_BY_WHERE_WITH_ORDER_BY_URL, serverType), postData);
    }

    findListByPage(arrWhere: Array<Where>, pageIndex: number, pageSize: number, serverType?: string): /*PageResult*/Promise<any> {
        let postData = {} as PostData;
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_ARR_WHERE_JSON, JSON.stringify(arrWhere));
        this.setPostData(postData, BDaoImpl.KEY_CURRENT_PAGE, pageIndex);
        this.setPostData(postData, BDaoImpl.KEY_PAGE_SIZE, pageSize);
        return _Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.FIND_LIST_BY_PAGE_URL, serverType), postData);
    }

    findListByPageWithOrderBy(arrWhere: Array<Where>, arrOrderBy: Array<OrderBy>, pageIndex: number, pageSize: number, serverType?: string): /*PageResult*/Promise<any> {
        let postData = {} as PostData;
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_ARR_WHERE_JSON, JSON.stringify(arrWhere));
        this.setPostData(postData, BDaoImpl.KEY_ARR_ORDER_BY_JSON, JSON.stringify(arrOrderBy));
        this.setPostData(postData, BDaoImpl.KEY_CURRENT_PAGE, pageIndex);
        this.setPostData(postData, BDaoImpl.KEY_PAGE_SIZE, pageSize);
        return _Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.FIND_LIST_BY_PAGE_WITH_ORDER_BY_URL, serverType), postData);
    }

    callProcedure(procedureParamStatement: ProcedureParamStatement, serverType?: string): Promise<any> {
        let postData = {} as PostData;
        this.setPostData(postData, BDaoImpl.KEY_PROCEDURE_PARAM_STATEMENT_JSON, JSON.stringify(procedureParamStatement));
        return _Dao.excute(this.getUrl(BDaoImpl.CALL_PROCEDURE_URL, serverType), postData);
    }

    callProcedureNew(procedureParamStatement: ProcedureParamStatement, serverType?: string): Promise<any> {
        let postData = {} as PostData;
        postData["procedureParamStatementJson"] = JSON.stringify(procedureParamStatement);
        return _Dao.excute(this.getUrl(BDaoImpl.CALL_PROCEDURE_NEW, serverType), postData);
    }

    treeAreaByParentAreaID(areaId: string): Promise<any> {
        return _Dao.excute(this.getUrl(BDaoImpl.TREE_AREA_BY_PARAENT_AREAID, ServerType.PDP), { "areaId": areaId });
    }

}