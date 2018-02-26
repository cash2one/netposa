/**
 * Created by dell on 2017/4/10.
 */
import * as express from "express";
import TaskConfigController from "../controller/TaskConfigController";
import Config from '../Config';

export default class TaskConfigRoute {
    constructor(app : express.Express) {
        TaskConfigRoute.activate(app);
    }

    public static TASK_URL = Config.NODE_SERVER_URL + "/taskconfig";

    public static activate (app : express.Express) : void {
        app.route(TaskConfigRoute.TASK_URL + "/mactask/search")
            .get(TaskConfigController.FindMacList);

        app.route(TaskConfigRoute.TASK_URL + "/rfidtask/addOrUpdate")
            .post(TaskConfigController.AddOrUpdateRfid);

        app.route(TaskConfigRoute.TASK_URL + "/facetask/addOrUpdate")
            .post(TaskConfigController.AddOrUpdateFace);
        
        app.route(TaskConfigRoute.TASK_URL + "/facetask/search")
            .get(TaskConfigController.FindFaceList);

        app.route(TaskConfigRoute.TASK_URL + "/facetask/detail")
            .get(TaskConfigController.FindFaceDetail);

        app.route(TaskConfigRoute.TASK_URL + "/task/findFaceByTaskId")
            .get(TaskConfigController.FindFaceByTaskId);

        app.route(TaskConfigRoute.TASK_URL + "/rfidtask/detail")
            .get(TaskConfigController.FindRfidDetail);

        app.route(TaskConfigRoute.TASK_URL + "/cartask/detail")
            .get(TaskConfigController.FindCarDetail);

        app.route(TaskConfigRoute.TASK_URL + "/cartask/search")
            .get(TaskConfigController.FindCarList);
        app.route(TaskConfigRoute.TASK_URL + "/cartask/addOrUpdate")
            .post(TaskConfigController.AddOrUpdateCar);

        app.route(TaskConfigRoute.TASK_URL + "/facetask/getFaceTaskIDs")
            .post(TaskConfigController.getFaceTaskIDs);

        app.route(TaskConfigRoute.TASK_URL + "/getTaskIdsByUserId")
            .get(TaskConfigController.getTaskIdsByUserId);

        app.route(TaskConfigRoute.TASK_URL + "/getUserIdByPersonId")
            .post(TaskConfigController.getUserIdByPersonId);
    }
}