import * as express from "express";
import EventRuleController from "../controller/EventRuleController";
import Config from '../Config';

export default class EventRuleRoute {
    constructor(app: express.Express) {
        EventRuleRoute.activate(app);
    }

    public static EVENT_RULE_URL = Config.NODE_SERVER_URL + "/eventRule";

    public static activate(app: express.Express): void {
        app.route(EventRuleRoute.EVENT_RULE_URL + "/findList")
            .post(EventRuleController.findList);

        app.route(EventRuleRoute.EVENT_RULE_URL + "/findAll")
            .post(EventRuleController.findAll);

        app.route(EventRuleRoute.EVENT_RULE_URL + "/saveOrUpdate")
            .post(EventRuleController.saveOrUpdate);

        app.route(EventRuleRoute.EVENT_RULE_URL + "/detail")
            .post(EventRuleController.detail);

        app.route(EventRuleRoute.EVENT_RULE_URL + "/delete")
            .post(EventRuleController.delete);
        
        app.route(EventRuleRoute.EVENT_RULE_URL + "/deleteByIds")
            .post(EventRuleController.deleteByIds);
    }

}