"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
const Config_1 = require("../../Config");
const _Dao_1 = require("./_Dao");
exports.ServerType = {
    PDP: "pdp",
    BCS: "bcs"
};
class BDaoImpl {
    constructor() {
        this.LOGGER = log4js.getLogger("BDaoImpl");
    }
    getUrl(suffix, serverType) {
        let result = BDaoImpl.PDP_URL;
        switch (serverType) {
            case exports.ServerType.BCS:
                result = BDaoImpl.BCS_URL;
                break;
            case exports.ServerType.PDP:
                result = BDaoImpl.PDP_URL;
                break;
        }
        return result + suffix;
    }
    _get_db_Or_dbCtrlUrl(suffix, serverType) {
        let result = null;
        switch (serverType) {
            case exports.ServerType.BCS:
                result = BDaoImpl.BCS_URL + suffix;
                break;
            case exports.ServerType.PDP:
                result = BDaoImpl.PDP_URL + suffix.replace(/\/db/, "\/dbCtrl");
                break;
            default:
                result = BDaoImpl.PDP_URL + suffix.replace(/\/db/, "\/dbCtrl");
                break;
        }
        return result;
    }
    setPostData(postData, key, value) {
        postData[key] = value;
    }
    countByWhere(statement, serverType) {
        let postData = {};
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_ARR_WHERE_JSON, JSON.stringify(statement));
        return _Dao_1._Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.COUNT_BY_WHERE_URL, serverType), postData);
    }
    save(entity, serverType) {
        let postData = {};
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_MODEL_JSON, JSON.stringify(entity));
        return _Dao_1._Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.SAVE_URL, serverType), postData);
    }
    addList(entityList, serverType) {
        let postData = {};
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_MODEL_LIST_JSON, JSON.stringify(entityList));
        console.log('event=========', JSON.stringify(entityList));
        return _Dao_1._Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.ADD_LIST_URL, serverType), postData);
    }
    update(entity, serverType) {
        let postData = {};
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_MODEL_JSON, JSON.stringify(entity));
        return _Dao_1._Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.UPDATE_URL, serverType), postData);
    }
    updateList(entityList, serverType) {
        let postData = {};
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_MODEL_LIST_JSON, JSON.stringify(entityList));
        return _Dao_1._Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.UPDATE_LIST_URL, serverType), postData);
    }
    delete(ids, serverType) {
        let postData = {};
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_ID_LIST_JSON, JSON.stringify(ids));
        return _Dao_1._Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.DELETE_URL, serverType), postData);
    }
    deleteByWhere(statement, serverType) {
        let postData = {};
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_ARR_WHERE_JSON, JSON.stringify(statement));
        return _Dao_1._Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.DELETE_BY_WHERE_URL, serverType), postData);
    }
    exist(id, serverType) {
        let postData = {};
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_ID, id);
        return _Dao_1._Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.EXIST_URL, serverType), postData);
    }
    findAll(serverType) {
        let postData = {};
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        return _Dao_1._Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.FIND_ALL_URL, serverType), postData);
    }
    findByID(id, serverType) {
        let postData = {};
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_ID, id);
        return _Dao_1._Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.FIND_BY_ID_URL, serverType), postData);
    }
    findListByID(idList, serverType) {
        let postData = {};
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_ID_LIST_JSON, JSON.stringify(idList));
        return _Dao_1._Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.FIND_LIST_BY_ID_URL, serverType), postData);
    }
    findListByWhere(arrWhere, serverType) {
        let postData = {};
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_ARR_WHERE_JSON, JSON.stringify(arrWhere));
        return _Dao_1._Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.FIND_LIST_BY_WHERE_URL, serverType), postData);
    }
    findListByWhereWithOrderBy(arrWhere, arrOrderBy, serverType) {
        let postData = {};
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_ARR_WHERE_JSON, JSON.stringify(arrWhere));
        this.setPostData(postData, BDaoImpl.KEY_ARR_ORDER_BY_JSON, JSON.stringify(arrOrderBy));
        return _Dao_1._Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.FIND_LIST_BY_WHERE_WITH_ORDER_BY_URL, serverType), postData);
    }
    findListByPage(arrWhere, pageIndex, pageSize, serverType) {
        let postData = {};
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_ARR_WHERE_JSON, JSON.stringify(arrWhere));
        this.setPostData(postData, BDaoImpl.KEY_CURRENT_PAGE, pageIndex);
        this.setPostData(postData, BDaoImpl.KEY_PAGE_SIZE, pageSize);
        return _Dao_1._Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.FIND_LIST_BY_PAGE_URL, serverType), postData);
    }
    findListByPageWithOrderBy(arrWhere, arrOrderBy, pageIndex, pageSize, serverType) {
        let postData = {};
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_ARR_WHERE_JSON, JSON.stringify(arrWhere));
        this.setPostData(postData, BDaoImpl.KEY_ARR_ORDER_BY_JSON, JSON.stringify(arrOrderBy));
        this.setPostData(postData, BDaoImpl.KEY_CURRENT_PAGE, pageIndex);
        this.setPostData(postData, BDaoImpl.KEY_PAGE_SIZE, pageSize);
        return _Dao_1._Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.FIND_LIST_BY_PAGE_WITH_ORDER_BY_URL, serverType), postData);
    }
    callProcedure(procedureParamStatement, serverType) {
        let postData = {};
        this.setPostData(postData, BDaoImpl.KEY_PROCEDURE_PARAM_STATEMENT_JSON, JSON.stringify(procedureParamStatement));
        return _Dao_1._Dao.excute(this.getUrl(BDaoImpl.CALL_PROCEDURE_URL, serverType), postData);
    }
    callProcedureNew(procedureParamStatement, serverType) {
        let postData = {};
        postData["procedureParamStatementJson"] = JSON.stringify(procedureParamStatement);
        return _Dao_1._Dao.excute(this.getUrl(BDaoImpl.CALL_PROCEDURE_NEW, serverType), postData);
    }
    treeAreaByParentAreaID(areaId) {
        return _Dao_1._Dao.excute(this.getUrl(BDaoImpl.TREE_AREA_BY_PARAENT_AREAID, exports.ServerType.PDP), { "areaId": areaId });
    }
}
BDaoImpl.BCS_URL = Config_1.default.BASE_CONFIG_SERVER_URL;
BDaoImpl.PDP_URL = Config_1.default.POSA_CONFIG_SERVER_URL;
BDaoImpl.FIND_LIST_BY_WHERE_URL = "/db/findListByWhere";
BDaoImpl.SAVE_URL = "/db/add";
BDaoImpl.ADD_LIST_URL = "/db/addList";
BDaoImpl.UPDATE_URL = "/db/update";
BDaoImpl.UPDATE_LIST_URL = "/db/updateList";
BDaoImpl.DELETE_URL = "/db/delete";
BDaoImpl.DELETE_BY_WHERE_URL = "/db/deleteByWhere";
BDaoImpl.EXIST_URL = "/db/exist";
BDaoImpl.FIND_ALL_URL = "/db/findAll";
BDaoImpl.FIND_BY_ID_URL = "/db/findByID";
BDaoImpl.FIND_LIST_BY_ID_URL = "/db/findListByID";
BDaoImpl.FIND_LIST_BY_PAGE_URL = "/db/findListByPage";
BDaoImpl.FIND_LIST_BY_PAGE_WITH_ORDER_BY_URL = "/db/findListByPageWithOrderBy";
BDaoImpl.FIND_LIST_BY_WHERE_WITH_ORDER_BY_URL = "/db/findListByWhereWithOrderBy";
BDaoImpl.CALL_PROCEDURE_URL = "/db/callProcedure2";
BDaoImpl.COUNT_BY_WHERE_URL = "/db/countByWhere";
BDaoImpl.CALL_PROCEDURE_NEW = "/db/callProcedure2";
BDaoImpl.TREE_AREA_BY_PARAENT_AREAID = "/baseconfig/treeAreaByParentAreaID";
BDaoImpl.KEY_CLASS_SIMPLE_NAME = "classSimpleName";
BDaoImpl.KEY_ARR_WHERE_JSON = "arrWhereJson";
BDaoImpl.KEY_ARR_ORDER_BY_JSON = "arrOrderByJson";
BDaoImpl.KEY_MODEL_JSON = "modelJson";
BDaoImpl.KEY_MODEL_LIST_JSON = "modelListJson";
BDaoImpl.KEY_ID_LIST_JSON = "idListJson";
BDaoImpl.KEY_ID = "id";
BDaoImpl.KEY_CURRENT_PAGE = "currentPage";
BDaoImpl.KEY_PAGE_SIZE = "pageSize";
BDaoImpl.KEY_PROCEDURE_PARAM_STATEMENT_JSON = "procedureParamStatementJson";
exports.BDaoImpl = BDaoImpl;
