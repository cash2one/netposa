"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AreaController_1 = require("../controller/AreaController");
const Config_1 = require("../Config");
const HttpCache_1 = require("../extend/HttpCache");
class AreaRoute {
    constructor(app) {
        AreaRoute.activate(app);
    }
    static activate(app) {
        app.route(`${AreaRoute.AREA_URL}/findAreaListTree`)
            .get(HttpCache_1.default.setNoCache, AreaController_1.default.findAreaListTree);
        app.route(`${AreaRoute.AREA_URL}/add`)
            .post(AreaController_1.default.saveArea);
        app.route(`${AreaRoute.AREA_URL}/update`)
            .post(AreaController_1.default.updateArea);
        app.route(`${AreaRoute.AREA_URL}/deleteById`)
            .post(AreaController_1.default.deleteAreaById);
        app.route(`${AreaRoute.AREA_URL}/deleteByIds`)
            .post(AreaController_1.default.deleteAreaByIds);
        app.route(`${AreaRoute.AREA_URL}/get`)
            .get(AreaController_1.default.getArea);
    }
}
AreaRoute.AREA_URL = Config_1.default.NODE_SERVER_URL + "/area";
exports.default = AreaRoute;
