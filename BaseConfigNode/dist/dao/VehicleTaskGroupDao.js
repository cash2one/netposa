"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BDaoImpl_1 = require("./core/BDaoImpl");
const DaoType_1 = require("./enum/DaoType");
const Table_Map_1 = require("../model/Table-Map");
class VehicleTaskGroupDao extends BDaoImpl_1.BDaoImpl {
    constructor() {
        super();
        this.DaoName = DaoType_1.DaoType.VehicleTaskGroupDao;
        this.ModelName = Table_Map_1.TableMap.VehicleTaskGroup;
    }
}
exports.default = VehicleTaskGroupDao;
