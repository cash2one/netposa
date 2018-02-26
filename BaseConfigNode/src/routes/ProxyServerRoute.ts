import * as express from "express";
import ProxyServerController from "../controller/ProxyServerController";

export default class ProxyServerRoute {
	constructor(app: express.Express) {
		ProxyServerRoute.activate(app);
	}

	public static activate(app: express.Express): void {

		app.route("/BaseConfigNodeServer/db/ProxyServer/findById")
			.get(ProxyServerController.findById);

		app.route("/BaseConfigNodeServer/db/ProxyServer/findAll")
            .get(ProxyServerController.findAll);

		app.route("/BaseConfigNodeServer/db/ProxyServer/findListByParams")
			.get(ProxyServerController.findListByParams);

		app.route("/BaseConfigNodeServer/db/ProxyServer/save")
			.post(ProxyServerController.save);


		app.route("/BaseConfigNodeServer/db/ProxyServer/update")
			.post(ProxyServerController.update);

		app.route("/BaseConfigNodeServer/db/ProxyServer/deleteById")
			.post(ProxyServerController.deleteById);

		app.route("/BaseConfigNodeServer/db/ProxyServer/deleteByIds")
            .post(ProxyServerController.deleteByIds);

	}
}