"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AnalysisController_1 = require("../controller/AnalysisController");
const Config_1 = require("../Config");
class AreaRoute {
    constructor(app) {
        AreaRoute.activate(app);
    }
    static activate(app) {
        app.route(Config_1.default.NODE_SERVER_URL + "/analysis/faceanalysis")
            .post(AnalysisController_1.default.faceAnalysis);
        app.route(Config_1.default.NODE_SERVER_URL + "/analysis/personalarm")
            .post(AnalysisController_1.default.PersonAlarm);
        app.route(Config_1.default.NODE_SERVER_URL + "/analysis/facetrack")
            .post(AnalysisController_1.default.FaceTrack);
        app.route(Config_1.default.NODE_SERVER_URL + "/analysis/accompanying")
            .post(AnalysisController_1.default.Accompanying);
        app.route(Config_1.default.NODE_SERVER_URL + "/analysis/faceFrequencyAnalysis")
            .post(AnalysisController_1.default.faceFrequencyAnalysis);
        app.route(Config_1.default.NODE_SERVER_URL + "/analysis/faceFrequencyAppear")
            .post(AnalysisController_1.default.faceFrequencyAppear);
        app.route(Config_1.default.NODE_SERVER_URL + "/analysis/searchrealyinfo")
            .post(AnalysisController_1.default.RealyInfo);
        app.route(Config_1.default.NODE_SERVER_URL + "/analysis/findlistwithofflinetask")
            .post(AnalysisController_1.default.findListWithOffLineTask);
        app.route(Config_1.default.NODE_SERVER_URL + "/analysis/delOffLineTask")
            .post(AnalysisController_1.default.delOffLineTask);
    }
}
exports.default = AreaRoute;
