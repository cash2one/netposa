import * as express from "express";
import ReportController from "../controller/ReportController";

export default class ReportRoute {
	constructor(app: express.Express) {
		ReportRoute.activate(app);
	}

	public static activate(app: express.Express): void {

	  app.route("/BaseConfigNodeServer/db/report/findListByPage")
		.get(ReportController.findListByPage);

	  app.route("/BaseConfigNodeServer/db/report/delete")
		    .post(ReportController.delete);
	
	}
}