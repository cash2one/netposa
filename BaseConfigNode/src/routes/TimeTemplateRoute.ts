/** create by zxq
 *
 * @time: 2017-06-24 17:00:09
 */
import * as express from "express";
import Config from '../Config';
import RouteController from "../controller/RoleController";
import TimeTemplateController from "../controller/TimeTemplateController";
export default class TimeTemplateRoute{

    public static TIME_TEMPLATE_ROUTE = Config.NODE_SERVER_URL + "/timeTemplate";
    constructor(app: express.Express){
        TimeTemplateRoute.activate(app);
    }

    public static activate(app: express.Express): void{

        app.route(TimeTemplateRoute.TIME_TEMPLATE_ROUTE + "/findListByParams")
            .get(TimeTemplateController.findListByParams);
        app.route(TimeTemplateRoute.TIME_TEMPLATE_ROUTE + "/findAll")
            .get(TimeTemplateController.findAll);
        app.route(TimeTemplateRoute.TIME_TEMPLATE_ROUTE + "/save")
            .post(TimeTemplateController.save);

        app.route(TimeTemplateRoute.TIME_TEMPLATE_ROUTE + "/update")
            .post(TimeTemplateController.update);

        app.route(TimeTemplateRoute.TIME_TEMPLATE_ROUTE + "/delete")
            .post(TimeTemplateController.deleteByIds);
    }

}