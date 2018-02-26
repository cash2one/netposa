import * as express from "express";
import CheckController from "../controller/CheckController";

export default class CheckRoute {
	constructor(app: express.Express) {
		CheckRoute.activate(app);
	}

	public static activate(app: express.Express): void {

	  app.route("/BaseConfigNodeServer/db/check/findListByPage")
				.get(CheckController.findListByPage);

	//   app.route("/BaseConfigNodeServer/db/check/delete")
	// 	    .post(CheckController.delete);
	
	}
}