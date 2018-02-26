/**
 * Created by dell on 2017/5/13.
 */
import * as express from "express";
import Config from '../Config';
import RouteController from "../controller/RoleController";
export default class RoleRoute{

    public static ROLE_ROUTE = Config.NODE_SERVER_URL + "/role";
    constructor(app: express.Express){
        RoleRoute.activate(app);
    }

    public static activate(app: express.Express): void{

        app.route(RoleRoute.ROLE_ROUTE + "/list")
            .get(RouteController.list);

        app.route(RoleRoute.ROLE_ROUTE + "/detail")
            .get(RouteController.detail);

        app.route(RoleRoute.ROLE_ROUTE + "/save")
            .post(RouteController.save);

        app.route(RoleRoute.ROLE_ROUTE + "/update")
            .post(RouteController.update);

        app.route(RoleRoute.ROLE_ROUTE + "/template")
            .get(RouteController.getTemplate);

        app.route(RoleRoute.ROLE_ROUTE + "/delete")
            .post(RouteController.deleteRoleById);
    }

}