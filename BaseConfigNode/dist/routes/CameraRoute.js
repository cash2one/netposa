"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CameraController_1 = require("../controller/CameraController");
const Config_1 = require("../Config");
const HttpCache_1 = require("../extend/HttpCache");
class CameraRoute {
    constructor(app) {
        CameraRoute.activate(app);
    }
    static activate(app) {
        app.route(`${CameraRoute.CAMERA_URL}/findAllList`)
            .get(HttpCache_1.default.setNoCache, CameraController_1.default.findAllList);
        app.route(`${CameraRoute.CAMERA_URL}/changeAreaId`)
            .post(CameraController_1.default.changeAreaId);
        app.route(`${CameraRoute.CAMERA_URL}/changeLampId`)
            .post(CameraController_1.default.changeLampId);
        app.route(`${CameraRoute.CAMERA_URL}/edit`)
            .post(CameraController_1.default.edit);
        app.route(`${CameraRoute.CAMERA_URL}/getPlayerInfoByID`)
            .post(CameraController_1.default.getPlayerInfoByID);
    }
}
CameraRoute.CAMERA_URL = Config_1.default.NODE_SERVER_URL + "/camera";
exports.default = CameraRoute;
