"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VideoServerController_1 = require("../controller/VideoServerController");
class VideoServerRoute {
    constructor(app) {
        VideoServerRoute.activate(app);
    }
    static activate(app) {
        app.route("/BaseConfigNodeServer/db/VideoServer/findListByParams")
            .get(VideoServerController_1.default.findListByParams);
        app.route("/BaseConfigNodeServer/db/VideoServer/findById")
            .get(VideoServerController_1.default.findById);
        app.route("/BaseConfigNodeServer/db/VideoServer/save")
            .post(VideoServerController_1.default.save);
        app.route("/BaseConfigNodeServer/db/VideoServer/update")
            .post(VideoServerController_1.default.update);
        app.route("/BaseConfigNodeServer/db/VideoServer/deleteById")
            .post(VideoServerController_1.default.deleteById);
        app.route("/BaseConfigNodeServer/db/VideoServer/deleteByIds")
            .post(VideoServerController_1.default.deleteByIds);
        app.route("/BaseConfigNodeServer/db/VideoServer/isHasTask")
            .post(VideoServerController_1.default.isHasTask);
    }
}
exports.default = VideoServerRoute;
