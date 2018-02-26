/**
 * Created by dell on 2017/4/10.
 */
import * as express from "express";
import AnalysisController from "../controller/AnalysisController";
import Config from '../Config';

export default class AreaRoute {
    constructor(app : express.Express) {
        AreaRoute.activate(app);
    }
    public static activate (app : express.Express) : void {
        app.route(Config.NODE_SERVER_URL + "/analysis/faceanalysis")
            .post(AnalysisController.faceAnalysis);
        app.route(Config.NODE_SERVER_URL + "/analysis/personalarm")
            .post(AnalysisController.PersonAlarm);
        app.route(Config.NODE_SERVER_URL + "/analysis/facetrack")
            .post(AnalysisController.FaceTrack);
        app.route(Config.NODE_SERVER_URL + "/analysis/accompanying")
            .post(AnalysisController.Accompanying);
        app.route(Config.NODE_SERVER_URL + "/analysis/faceFrequencyAnalysis")
            .post(AnalysisController.faceFrequencyAnalysis);
        app.route(Config.NODE_SERVER_URL + "/analysis/faceFrequencyAppear")
            .post(AnalysisController.faceFrequencyAppear);

        app.route(Config.NODE_SERVER_URL + "/analysis/searchrealyinfo")
            .post(AnalysisController.RealyInfo);
        app.route(Config.NODE_SERVER_URL + "/analysis/findlistwithofflinetask")
            .post(AnalysisController.findListWithOffLineTask);
        app.route(Config.NODE_SERVER_URL + "/analysis/delOffLineTask")
            .post(AnalysisController.delOffLineTask)
    }
}