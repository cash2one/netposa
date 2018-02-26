import * as express from "express";
import VideoServerController from "../controller/VideoServerController";

export default class VideoServerRoute {
	constructor(app : express.Express) {
		VideoServerRoute.activate(app);
	}
	
	public static activate (app : express.Express) : void {

		app.route("/BaseConfigNodeServer/db/VideoServer/findListByParams")
            .get(VideoServerController.findListByParams);


		app.route("/BaseConfigNodeServer/db/VideoServer/findById")
            .get(VideoServerController.findById);


		app.route("/BaseConfigNodeServer/db/VideoServer/save")
			.post(VideoServerController.save);

		app.route("/BaseConfigNodeServer/db/VideoServer/update")
            .post(VideoServerController.update);


		app.route("/BaseConfigNodeServer/db/VideoServer/deleteById")
            .post(VideoServerController.deleteById);

		app.route("/BaseConfigNodeServer/db/VideoServer/deleteByIds")
		.post(VideoServerController.deleteByIds);
		
		app.route("/BaseConfigNodeServer/db/VideoServer/isHasTask")
            .post(VideoServerController.isHasTask);

	}
}