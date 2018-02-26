import * as express from "express";

import EngineNodeController from "../controller/EngineNodeController";
export default class EngineNodeRoute {
	constructor(app: express.Express) {
		EngineNodeRoute.activate(app);
    }
    public static activate(app: express.Express): void {
        app.route("/BaseConfigNodeServer/db/EngineNode/findListByParams")
            .get(EngineNodeController.findListByParams);

        app.route("/BaseConfigNodeServer/db/EngineNode/findById")
			.get(EngineNodeController.findById);

		app.route("/BaseConfigNodeServer/db/EngineNode/save")
			.post(EngineNodeController.save);


		app.route("/BaseConfigNodeServer/db/EngineNode/update")
			.post(EngineNodeController.update);

		app.route("/BaseConfigNodeServer/db/EngineNode/deleteById")
			.post(EngineNodeController.deleteById);

		app.route("/BaseConfigNodeServer/db/EngineNode/deleteByIds")
            .post(EngineNodeController.deleteByIds);

    }
    
}