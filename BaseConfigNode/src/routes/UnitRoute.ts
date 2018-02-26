/**
 * Created by dell on 2017/4/14.
 */

import * as express from 'express';
import Config from '../Config';
import UnitController from "../controller/UnitController";

export default class UnitRoute{
    constructor(app : express.Express){
        UnitRoute.activate(app);
    }

    public static UNIT_URL = Config.NODE_SERVER_URL + "/unit";

    public static activate(app: express.Express) : void{

        app.route(UnitRoute.UNIT_URL + "/findListByParams")
            .get(UnitController.findUnitListByParams);

        app.route(UnitRoute.UNIT_URL + "/add")
            .post(UnitController.saveUnit);

        app.route(UnitRoute.UNIT_URL + "/update")
            .post(UnitController.updateUnit);

        app.route(UnitRoute.UNIT_URL + "/delete")
            .post(UnitController.deleteUnit);

        app.route(UnitRoute.UNIT_URL + "/deleteByIds")
            .post(UnitController.deleteUnitByIds);

        app.route(UnitRoute.UNIT_URL + "/get")
            .get(UnitController.getUnit);

        app.route(UnitRoute.UNIT_URL + "/findUnitTreeList")
            .get(UnitController.findUnitTreeList);
    }

}