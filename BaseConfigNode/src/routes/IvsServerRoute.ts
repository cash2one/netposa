import * as express from "express";
import IvsServerController from "../controller/IvsServerController";

export default class IvsServerRoute {
	constructor(app: express.Express) {
		IvsServerRoute.activate(app);
	}

	public static activate(app: express.Express): void {

		app.route("/BaseConfigNodeServer/db/IvsServer/findById")
			.get(IvsServerController.findById);

		app.route("/BaseConfigNodeServer/db/IvsServer/findListByParams")
			.get(IvsServerController.findListByParams);

		app.route("/BaseConfigNodeServer/db/IvsServer/save")
			.post(IvsServerController.save);

		app.route("/BaseConfigNodeServer/db/IvsServer/update")
			.post(IvsServerController.update);

		app.route("/BaseConfigNodeServer/db/IvsServer/deleteById")
			.post(IvsServerController.deleteById);

		app.route("/BaseConfigNodeServer/db/IvsServer/deleteByIds")
            .post(IvsServerController.deleteByIds);


	}
}