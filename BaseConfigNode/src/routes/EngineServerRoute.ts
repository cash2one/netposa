import * as express from "express";

import EngineServerController from "../controller/EngineServerController";
export default class EngineServerRoute {
	constructor(app: express.Express) {
		EngineServerRoute.activate(app);
    }
    public static activate(app: express.Express): void {
        app.route("/BaseConfigNodeServer/db/EngineServer/findAll")
            .get(EngineServerController.findAll);


        app.route("/BaseConfigNodeServer/db/EngineServer/findById")
			.get(EngineServerController.findById);


		app.route("/BaseConfigNodeServer/db/EngineServer/save")
			.post(EngineServerController.save);


		app.route("/BaseConfigNodeServer/db/EngineServer/update")
			.post(EngineServerController.update);

		app.route("/BaseConfigNodeServer/db/EngineServer/deleteById")
			.post(EngineServerController.deleteById);


    }




    
}