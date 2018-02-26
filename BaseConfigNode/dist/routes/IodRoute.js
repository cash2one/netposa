"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IodController_1 = require("../controller/IodController");
const Config_1 = require("../Config");
class IodRoute {
    constructor(app) {
        IodRoute.activate(app);
    }
    static activate(app) {
        app.route(IodRoute.IOD_URL + "/findAreaListTree")
            .get(IodController_1.default.findAreaListTree);
        app.route(IodRoute.IOD_URL + "/add")
            .post(IodController_1.default.saveIod);
        app.route(IodRoute.IOD_URL + "/update")
            .post(IodController_1.default.updateIod);
        app.route(IodRoute.IOD_URL + "/deleteById")
            .post(IodController_1.default.deleteIodById);
        app.route(IodRoute.IOD_URL + "/deleteByIds")
            .post(IodController_1.default.deleteIodByIds);
    }
}
IodRoute.IOD_URL = Config_1.default.NODE_SERVER_URL + "/iod";
exports.default = IodRoute;
