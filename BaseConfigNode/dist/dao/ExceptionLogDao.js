"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BDaoImpl_1 = require("./core/BDaoImpl");
const DaoType_1 = require("./enum/DaoType");
const Table_Map_1 = require("../model/Table-Map");
class ExceptionLogDao extends BDaoImpl_1.BDaoImpl {
    constructor() {
        super();
        this.DaoName = DaoType_1.DaoType.ExceptionLogDao;
        this.ModelName = Table_Map_1.TableMap.ExceptionLog;
    }
}
exports.default = ExceptionLogDao;
