"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TaskConfigController_1 = require("../controller/TaskConfigController");
const Config_1 = require("../Config");
class TaskConfigRoute {
    constructor(app) {
        TaskConfigRoute.activate(app);
    }
    static activate(app) {
        app.route(TaskConfigRoute.TASK_URL + "/mactask/search")
            .get(TaskConfigController_1.default.FindMacList);
        app.route(TaskConfigRoute.TASK_URL + "/rfidtask/addOrUpdate")
            .post(TaskConfigController_1.default.AddOrUpdateRfid);
        app.route(TaskConfigRoute.TASK_URL + "/facetask/addOrUpdate")
            .post(TaskConfigController_1.default.AddOrUpdateFace);
        app.route(TaskConfigRoute.TASK_URL + "/facetask/search")
            .get(TaskConfigController_1.default.FindFaceList);
        app.route(TaskConfigRoute.TASK_URL + "/facetask/detail")
            .get(TaskConfigController_1.default.FindFaceDetail);
        app.route(TaskConfigRoute.TASK_URL + "/task/findFaceByTaskId")
            .get(TaskConfigController_1.default.FindFaceByTaskId);
        app.route(TaskConfigRoute.TASK_URL + "/rfidtask/detail")
            .get(TaskConfigController_1.default.FindRfidDetail);
        app.route(TaskConfigRoute.TASK_URL + "/cartask/detail")
            .get(TaskConfigController_1.default.FindCarDetail);
        app.route(TaskConfigRoute.TASK_URL + "/cartask/search")
            .get(TaskConfigController_1.default.FindCarList);
        app.route(TaskConfigRoute.TASK_URL + "/cartask/addOrUpdate")
            .post(TaskConfigController_1.default.AddOrUpdateCar);
        app.route(TaskConfigRoute.TASK_URL + "/facetask/getFaceTaskIDs")
            .post(TaskConfigController_1.default.getFaceTaskIDs);
        app.route(TaskConfigRoute.TASK_URL + "/getTaskIdsByUserId")
            .get(TaskConfigController_1.default.getTaskIdsByUserId);
        app.route(TaskConfigRoute.TASK_URL + "/getUserIdByPersonId")
            .post(TaskConfigController_1.default.getUserIdByPersonId);
    }
}
TaskConfigRoute.TASK_URL = Config_1.default.NODE_SERVER_URL + "/taskconfig";
exports.default = TaskConfigRoute;
