"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BDaoImpl_1 = require("./core/BDaoImpl");
const DaoType_1 = require("./enum/DaoType");
const Table_Map_1 = require("../model/Table-Map");
const _Dao_1 = require("./core/_Dao");
class BusinessLibDao extends BDaoImpl_1.BDaoImpl {
    constructor() {
        super();
        this.DaoName = DaoType_1.DaoType.BusinessLibDao;
        this.ModelName = Table_Map_1.TableMap.BusinessLib;
        this.DELETE_URL = "/businesslib/delete";
        this.KEY_ID_LIST_JSON = "libIds";
    }
    setPostData(postData, key, value) {
        postData[key] = value;
    }
    deleteBusLib(ids, serverType) {
        let postData = {};
        this.setPostData(postData, this.KEY_ID_LIST_JSON, JSON.stringify(ids));
        return _Dao_1._Dao.excute(this.getUrl(this.DELETE_URL, serverType), postData, false);
    }
}
exports.default = BusinessLibDao;
