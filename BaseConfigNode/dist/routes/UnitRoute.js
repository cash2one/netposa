"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../Config");
const UnitController_1 = require("../controller/UnitController");
class UnitRoute {
    constructor(app) {
        UnitRoute.activate(app);
    }
    static activate(app) {
        app.route(UnitRoute.UNIT_URL + "/findListByParams")
            .get(UnitController_1.default.findUnitListByParams);
        app.route(UnitRoute.UNIT_URL + "/add")
            .post(UnitController_1.default.saveUnit);
        app.route(UnitRoute.UNIT_URL + "/update")
            .post(UnitController_1.default.updateUnit);
        app.route(UnitRoute.UNIT_URL + "/delete")
            .post(UnitController_1.default.deleteUnit);
        app.route(UnitRoute.UNIT_URL + "/deleteByIds")
            .post(UnitController_1.default.deleteUnitByIds);
        app.route(UnitRoute.UNIT_URL + "/get")
            .get(UnitController_1.default.getUnit);
        app.route(UnitRoute.UNIT_URL + "/findUnitTreeList")
            .get(UnitController_1.default.findUnitTreeList);
    }
}
UnitRoute.UNIT_URL = Config_1.default.NODE_SERVER_URL + "/unit";
exports.default = UnitRoute;
