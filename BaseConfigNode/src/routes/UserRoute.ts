import * as express from "express";
import UserController from "../controller/UserController";

export default class UserRoute {
	constructor(app : express.Express) {
		UserRoute.activate(app);
	}
	
	public static activate (app : express.Express) : void {
	
		app.route("/BaseConfigNodeServer/db/findUserByUidWithPwd")
			.get(UserController.findUserByUidWithPwd);


		app.route("/BaseConfigNodeServer/db/user/findListByParams")
            .get(UserController.findListByParams);
	}
}