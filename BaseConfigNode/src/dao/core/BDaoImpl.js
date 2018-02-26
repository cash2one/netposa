"use strict";
exports.__esModule = true;
var log4js = require("log4js");
var Config_1 = require("../../Config");
var _Dao_1 = require("./_Dao");
exports.ServerType = {
    PDP: "pdp",
    BCS: "bcs"
};
/**
 * Created by dell on 2017/7/29.
 */
var BDaoImpl = (function () {
    function BDaoImpl() {
        this.LOGGER = log4js.getLogger("BDaoImpl");
    }
    BDaoImpl.prototype.getUrl = function (suffix, serverType) {
        var result = BDaoImpl.PDP_URL;
        switch (serverType) {
            case exports.ServerType.BCS:
                result = BDaoImpl.BCS_URL;
                break;
            case exports.ServerType.PDP:
                result = BDaoImpl.PDP_URL;
                break;
        }
        return result + suffix;
    };
    /**
     * 专门针对db和dbctrl不同前缀进行的判断处理
     * 等什么时候 db和dbctrl统一了 此方法就可以换掉
     * @param suffix 前缀
     * @param serverType 服务类型
     */
    BDaoImpl.prototype._get_db_Or_dbCtrlUrl = function (suffix, serverType) {
        var result = null;
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
    };
    BDaoImpl.prototype.setPostData = function (postData, key, value) {
        postData[key] = value;
    };
    BDaoImpl.prototype.countByWhere = function (statement, serverType) {
        var postData = {};
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_ARR_WHERE_JSON, JSON.stringify(statement));
        return _Dao_1._Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.COUNT_BY_WHERE_URL, serverType), postData);
    };
    // getEntityId(model: T, serverType?: string): string {
    //     return undefined;
    // }
    BDaoImpl.prototype.save = function (entity, serverType) {
        debugger
        var postData = {};
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_MODEL_JSON, JSON.stringify(entity));
        return _Dao_1._Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.SAVE_URL, serverType), postData);
    };
    // save(clientTag: string, entity: Object, serverType?: string): string {
    //     return undefined;
    // }
    BDaoImpl.prototype.addList = function (entityList, serverType) {
        debugger
        var postData = {};
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_MODEL_LIST_JSON, JSON.stringify(entityList));
        return _Dao_1._Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.ADD_LIST_URL, serverType), postData);
    };
    // batchSave(clientTag: string, entityList: Array<Object>, serverType?: string): Array<string> {
    //     return undefined;
    // }
    BDaoImpl.prototype.update = function (entity, serverType) {
        debugger
        var postData = {};
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_MODEL_JSON, JSON.stringify(entity));
        return _Dao_1._Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.UPDATE_URL, serverType), postData);
    };
    // update(clientTag: string, entity: Object, serverType?: string): boolean {
    //     return undefined;
    // }
    BDaoImpl.prototype.updateList = function (entityList, serverType) {
        debugger
        var postData = {};
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_MODEL_LIST_JSON, JSON.stringify(entityList));
        return _Dao_1._Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.UPDATE_LIST_URL, serverType), postData);
    };
    // batchUpdate(clientTag: string, entityList: Array<Object>, serverType?: string): boolean {
    //     return undefined;
    // }
    BDaoImpl.prototype["delete"] = function (ids, serverType) {
        var postData = {};
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_ID_LIST_JSON, JSON.stringify(ids));
        return _Dao_1._Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.DELETE_URL, serverType), postData);
    };
    BDaoImpl.prototype.deleteByWhere = function (statement, serverType) {
        var postData = {};
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_ARR_WHERE_JSON, JSON.stringify(statement));
        return _Dao_1._Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.DELETE_BY_WHERE_URL, serverType), postData);
    };
    BDaoImpl.prototype.exist = function (id, serverType) {
        var postData = {};
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_ID, id);
        return _Dao_1._Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.EXIST_URL, serverType), postData);
    };
    BDaoImpl.prototype.findAll = function (serverType) {
        var postData = {};
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        return _Dao_1._Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.FIND_ALL_URL, serverType), postData);
    };
    BDaoImpl.prototype.findByID = function (id, serverType) {
        var postData = {};
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_ID, id);
        return _Dao_1._Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.FIND_BY_ID_URL, serverType), postData);
    };
    BDaoImpl.prototype.findListByID = function (idList, serverType) {
        var postData = {};
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_ID_LIST_JSON, JSON.stringify(idList));
        return _Dao_1._Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.FIND_LIST_BY_ID_URL, serverType), postData);
    };
    BDaoImpl.prototype.findListByWhere = function (arrWhere, serverType) {
        var postData = {};
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_ARR_WHERE_JSON, JSON.stringify(arrWhere));
        return _Dao_1._Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.FIND_LIST_BY_WHERE_URL, serverType), postData);
    };
    BDaoImpl.prototype.findListByWhereWithOrderBy = function (arrWhere, arrOrderBy, serverType) {
        var postData = {};
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_ARR_WHERE_JSON, JSON.stringify(arrWhere));
        this.setPostData(postData, BDaoImpl.KEY_ARR_ORDER_BY_JSON, JSON.stringify(arrOrderBy));
        return _Dao_1._Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.FIND_LIST_BY_WHERE_WITH_ORDER_BY_URL, serverType), postData);
    };
    BDaoImpl.prototype.findListByPage = function (arrWhere, pageIndex, pageSize, serverType) {
        var postData = {};
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_ARR_WHERE_JSON, JSON.stringify(arrWhere));
        this.setPostData(postData, BDaoImpl.KEY_CURRENT_PAGE, pageIndex);
        this.setPostData(postData, BDaoImpl.KEY_PAGE_SIZE, pageSize);
        return _Dao_1._Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.FIND_LIST_BY_PAGE_URL, serverType), postData);
    };
    BDaoImpl.prototype.findListByPageWithOrderBy = function (arrWhere, arrOrderBy, pageIndex, pageSize, serverType) {
        var postData = {};
        this.setPostData(postData, BDaoImpl.KEY_CLASS_SIMPLE_NAME, this.ModelName);
        this.setPostData(postData, BDaoImpl.KEY_ARR_WHERE_JSON, JSON.stringify(arrWhere));
        this.setPostData(postData, BDaoImpl.KEY_ARR_ORDER_BY_JSON, JSON.stringify(arrOrderBy));
        this.setPostData(postData, BDaoImpl.KEY_CURRENT_PAGE, pageIndex);
        this.setPostData(postData, BDaoImpl.KEY_PAGE_SIZE, pageSize);
        return _Dao_1._Dao.excute(this._get_db_Or_dbCtrlUrl(BDaoImpl.FIND_LIST_BY_PAGE_WITH_ORDER_BY_URL, serverType), postData);
    };
    BDaoImpl.prototype.callProcedure = function (procedureParamStatement, serverType) {
        var postData = {};
        this.setPostData(postData, BDaoImpl.KEY_PROCEDURE_PARAM_STATEMENT_JSON, JSON.stringify(procedureParamStatement));
        return _Dao_1._Dao.excute(this.getUrl(BDaoImpl.CALL_PROCEDURE_URL, serverType), postData);
    };
    BDaoImpl.prototype.callProcedureNew = function (procedureParamStatement, serverType) {
        var postData = {};
        postData["procedureParamStatementJson"] = JSON.stringify(procedureParamStatement);
        return _Dao_1._Dao.excute(this.getUrl(BDaoImpl.CALL_PROCEDURE_NEW, serverType), postData);
    };
    BDaoImpl.prototype.treeAreaByParentAreaID = function (areaId) {
        return _Dao_1._Dao.excute(this.getUrl(BDaoImpl.TREE_AREA_BY_PARAENT_AREAID, exports.ServerType.PDP), { "areaId": areaId });
    };
    BDaoImpl.BCS_URL = Config_1["default"].BASE_CONFIG_SERVER_URL;
    BDaoImpl.PDP_URL = Config_1["default"].POSA_CONFIG_SERVER_URL;
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
    // bcs和fds db/dbctrl不同
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
    return BDaoImpl;
}());
exports.BDaoImpl = BDaoImpl;
