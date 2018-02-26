"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BDaoImpl_1 = require("./core/BDaoImpl");
const Table_Map_1 = require("../model/Table-Map");
const DaoType_1 = require("./enum/DaoType");
class UnitDao extends BDaoImpl_1.BDaoImpl {
    constructor() {
        super();
        this.DaoName = DaoType_1.DaoType.UnitDao;
        this.ModelName = Table_Map_1.TableMap.Unit;
    }
}
exports.default = UnitDao;
