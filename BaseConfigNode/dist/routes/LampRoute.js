"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LampController_1 = require("../controller/LampController");
const Config_1 = require("../Config");
class LampRoute {
    constructor(app) {
        LampRoute.activate(app);
    }
    static activate(app) {
        app.route(LampRoute.LAMP_URL + "/add")
            .post(LampController_1.default.saveLamp);
        app.route(LampRoute.LAMP_URL + "/update")
            .post(LampController_1.default.updateLamp);
        app.route(LampRoute.LAMP_URL + "/get")
            .get(LampController_1.default.getLamp);
        app.route(LampRoute.LAMP_URL + "/deleteById")
            .post(LampController_1.default.deleteLampById);
        app.route(LampRoute.LAMP_URL + "/deleteByIds")
            .post(LampController_1.default.deleteLampByIds);
        app.route(LampRoute.LAMP_URL + "/findSystemPointById")
            .get(LampController_1.default.findSystemPointById);
        app.route(LampRoute.LAMP_URL + "/updataLampSystemPoint")
            .post(LampController_1.default.updataLampSystemPoint);
        app.route(LampRoute.LAMP_URL + "/deleteLampAndDeviceRelation")
            .post(LampController_1.default.deleteLampAndDeviceRelation);
        app.route(LampRoute.LAMP_URL + "/findLampDeviceRelationById")
            .get(LampController_1.default.findLampDeviceRelationById);
        app.route(LampRoute.LAMP_URL + "/findLampDeviceChildrenById")
            .get(LampController_1.default.findLampDeviceChildrenById);
    }
}
LampRoute.LAMP_URL = Config_1.default.NODE_SERVER_URL + "/lamp";
exports.default = LampRoute;
