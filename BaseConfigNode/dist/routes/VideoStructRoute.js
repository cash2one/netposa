"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VideoStructController_1 = require("../controller/VideoStructController");
const Config_1 = require("../Config");
class VideoStructRoute {
    constructor(app) {
        VideoStructRoute.activate(app);
    }
    static activate(app) {
        app.route(VideoStructRoute.BASE_URL + "/findFaceList")
            .get(VideoStructController_1.default.findFaceList);
        app.route(VideoStructRoute.BASE_URL + "/findFaceById")
            .get(VideoStructController_1.default.findFaceById);
    }
}
VideoStructRoute.BASE_URL = Config_1.default.NODE_SERVER_URL + "/videoStruct";
exports.default = VideoStructRoute;
