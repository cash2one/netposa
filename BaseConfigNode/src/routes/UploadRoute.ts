import * as express from "express";
import UploadController from "../controller/UploadController";

/**
 * create by zmp.
 * @time: 2017-08-28
 */
export default class UploadRoute {
     constructor(app : express.Express) {
		UploadRoute.activate(app);
	}

	public static activate(app: express.Express): void {
        app.route("/BaseConfigNodeServer/db/upload/image")
            .post(UploadController.imageUpload);

        app.route("/BaseConfigNodeServer/db/upload/faceImage")
            .post(UploadController.faceImageUpload);
    }
}



