"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventRuleController_1 = require("../controller/EventRuleController");
const Config_1 = require("../Config");
class EventRuleRoute {
    constructor(app) {
        EventRuleRoute.activate(app);
    }
    static activate(app) {
        app.route(EventRuleRoute.EVENT_RULE_URL + "/findList")
            .post(EventRuleController_1.default.findList);
        app.route(EventRuleRoute.EVENT_RULE_URL + "/findAll")
            .post(EventRuleController_1.default.findAll);
        app.route(EventRuleRoute.EVENT_RULE_URL + "/saveOrUpdate")
            .post(EventRuleController_1.default.saveOrUpdate);
        app.route(EventRuleRoute.EVENT_RULE_URL + "/detail")
            .post(EventRuleController_1.default.detail);
        app.route(EventRuleRoute.EVENT_RULE_URL + "/delete")
            .post(EventRuleController_1.default.delete);
        app.route(EventRuleRoute.EVENT_RULE_URL + "/deleteByIds")
            .post(EventRuleController_1.default.deleteByIds);
    }
}
EventRuleRoute.EVENT_RULE_URL = Config_1.default.NODE_SERVER_URL + "/eventRule";
exports.default = EventRuleRoute;
