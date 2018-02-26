"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UploadController_1 = require("../controller/UploadController");
class UploadRoute {
    constructor(app) {
        UploadRoute.activate(app);
    }
    static activate(app) {
        app.route("/BaseConfigNodeServer/db/upload/image")
            .post(UploadController_1.default.imageUpload);
        app.route("/BaseConfigNodeServer/db/upload/faceImage")
            .post(UploadController_1.default.faceImageUpload);
    }
}
exports.default = UploadRoute;
