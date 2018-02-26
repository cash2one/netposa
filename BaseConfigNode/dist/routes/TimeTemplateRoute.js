"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../Config");
const TimeTemplateController_1 = require("../controller/TimeTemplateController");
class TimeTemplateRoute {
    constructor(app) {
        TimeTemplateRoute.activate(app);
    }
    static activate(app) {
        app.route(TimeTemplateRoute.TIME_TEMPLATE_ROUTE + "/findListByParams")
            .get(TimeTemplateController_1.default.findListByParams);
        app.route(TimeTemplateRoute.TIME_TEMPLATE_ROUTE + "/findAll")
            .get(TimeTemplateController_1.default.findAll);
        app.route(TimeTemplateRoute.TIME_TEMPLATE_ROUTE + "/save")
            .post(TimeTemplateController_1.default.save);
        app.route(TimeTemplateRoute.TIME_TEMPLATE_ROUTE + "/update")
            .post(TimeTemplateController_1.default.update);
        app.route(TimeTemplateRoute.TIME_TEMPLATE_ROUTE + "/delete")
            .post(TimeTemplateController_1.default.deleteByIds);
    }
}
TimeTemplateRoute.TIME_TEMPLATE_ROUTE = Config_1.default.NODE_SERVER_URL + "/timeTemplate";
exports.default = TimeTemplateRoute;
