"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ElectronicFenceController_1 = require("../controller/ElectronicFenceController");
const Config_1 = require("../Config");
class ElectronicFenceRoute {
    constructor(app) {
        ElectronicFenceRoute.activate(app);
    }
    static activate(app) {
        app.route(`${ElectronicFenceRoute.ELECTRONICFENCE_URL}/findAllList`)
            .get(ElectronicFenceController_1.default.findAllList);
        app.route(`${ElectronicFenceRoute.ELECTRONICFENCE_URL}/changeAreaId`)
            .post(ElectronicFenceController_1.default.changeAreaId);
        app.route(`${ElectronicFenceRoute.ELECTRONICFENCE_URL}/changeLampId`)
            .post(ElectronicFenceController_1.default.changeLampId);
        app.route(`${ElectronicFenceRoute.ELECTRONICFENCE_URL}/edit`)
            .post(ElectronicFenceController_1.default.edit);
    }
}
ElectronicFenceRoute.ELECTRONICFENCE_URL = Config_1.default.NODE_SERVER_URL + "/ElectronicFence";
exports.default = ElectronicFenceRoute;
