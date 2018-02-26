"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
const OperationsService_1 = require("../service/OperationsService");
const ResponseResult_1 = require("../core/params/result/ResponseResult");
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
class OperationsController {
    static taskStatistics(req, res, next) {
        OperationsController.operationsService.taskStatistics(req.body.areaId).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static userStatus(req, res, next) {
        let params = req.body;
        OperationsController.operationsService.userStatus(params).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static logManagement(req, res, next) {
        let params = req.query;
        console.log(params);
        OperationsController.operationsService.logManagement(params).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            console.log(JSON.stringify(data));
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static exceptionlog(req, res, next) {
        let params = req.body;
        OperationsController.operationsService.exceptionlog(params).then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static getDevicesStatus(req, res, next) {
        OperationsController.operationsService.getDevicesStatus().then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static taskStatisticsTotal(req, res, next) {
        OperationsController.operationsService.taskStatisticsTotal().then(complete).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function complete(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static alarmStatistics(req, res, next) {
        let params = req.query;
        OperationsController.operationsService.alarmStatistics(params).then(compile).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function compile(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static trafficStatistics(req, res, next) {
        OperationsController.operationsService.trafficStatistics().then(compile).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function compile(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static retrievalStatistics(req, res, next) {
        let params = req.body;
        OperationsController.operationsService.retrievalStatistics(params).then(compile).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function compile(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static analysissTatistics(req, res, next) {
        OperationsController.operationsService.analysissTatistics().then(compile).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function compile(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static getDevicesStatusModule(req, res, next) {
        let params = req.query;
        OperationsController.operationsService.getDevicesStatusModule(params).then(compile).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function compile(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static getServerStatusModule(req, res, next) {
        let params = req.query;
        OperationsController.operationsService.getServerStatusModule(params).then(compile).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function compile(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static alarmStatisticsModule(req, res, next) {
        let params = req.query;
        OperationsController.operationsService.alarmStatisticsModule(params).then(compile).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function compile(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static trafficStatisticsModule(req, res, next) {
        let params = req.query;
        OperationsController.operationsService.trafficStatisticsModule(params).then(compile).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function compile(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static areaTrafficStatistics(req, res, next) {
        let params = req.query;
        OperationsController.operationsService.areaTrafficStatistics(params).then(compile).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function compile(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static deveceAlarmStatisticsTop(req, res, next) {
        let params = req.query;
        OperationsController.operationsService.deveceAlarmStatisticsTop(params).then(compile).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function compile(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static deveceTrafficStatisticsTop(req, res, next) {
        let params = req.query;
        OperationsController.operationsService.deveceTrafficStatisticsTop(params).then(compile).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function compile(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static intelligentAnalysis(req, res, next) {
        let params = req.body;
        OperationsController.operationsService.intelligentAnalysis(params).then(compile).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function compile(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static dispatchedAboutAlarm(req, res, next) {
        let params = req.body;
        OperationsController.operationsService.dispatchedAboutAlarm(params).then(compile).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function compile(data) {
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(data));
        }
    }
    static retrievalTrendStatistics(req, res, next) {
        let params = req.query;
        OperationsController.operationsService.retrievalTrendStatistics(params).then(compile).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function compile(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = 200;
            result.data = data;
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(result));
        }
    }
    static retrievalKeyWordRank(req, res, next) {
        let params = req.query;
        OperationsController.operationsService.retrievalKeyWordRank(params).then(compile).catch(ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res));
        function compile(data) {
            let result = new ResponseResult_1.ResponseResult();
            result.code = 200;
            result.data = data;
            res.send(ResponseResultTool_1.ResponseResultTool.convert2ResponseResult(result));
        }
    }
}
OperationsController.Logger = log4js.getLogger("MapController");
OperationsController.operationsService = new OperationsService_1.OperationsService();
exports.default = OperationsController;
