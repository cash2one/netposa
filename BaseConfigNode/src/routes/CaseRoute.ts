import * as express from "express";
import CaseController from "../controller/CaseController";

export default class CameraRoute {
	constructor(app: express.Express) {
		CameraRoute.activate(app);
	}

	public static activate(app: express.Express): void {

		app.route("/BaseConfigNodeServer/db/baseconfig/findCascadeList")
			.post(CaseController.findCascadeList);

        // app.route("/BaseConfigNodeServer/db/case/findAllList")
        //     .get(CaseController.findAllList);

        // app.route("/BaseConfigNodeServer/db/case/changeAreaId")
        //     .post(CameraController.changeAreaId);

        // app.route("/BaseConfigNodeServer/db/case/changeCameraType")
        //     .post(CameraController.changeCameraType);
		
		// app.route("/BaseConfigNodeServer/db/case/delete")
        //     .post(CameraController.delete);

		// app.route("/BaseConfigNodeServer/db/case/create")
        //     .post(CameraController.create);
		
		// app.route("/BaseConfigNodeServer/db/case/edit")
        //     .post(CameraController.edit);
	}
}