"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const Config_1 = require("../Config");
const cookieParser = require("cookie-parser");
const express = require("express");
const log4js = require("log4js");
const path = require("path");
const util = require("util");
const process = require("process");
const favicon = require("serve-favicon");
const colors = require("colors");
const HttpUtils_1 = require("../utils/HttpUtils");
const ResponseResultTool_1 = require("../common/res/ResponseResultTool");
const DaoConfig_1 = require("./DaoConfig");
const RouteConfig_1 = require("./RouteConfig");
const http = require("http");
const PathHelper_1 = require("../common/help/PathHelper");
const log4jsConfig_1 = require("../log4jsConfig");
const Redis_1 = require("../extend/Redis");
const TimedTask_1 = require("../extend/TimedTask");
colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});
console.log("测试 npm install colors".red);
console.log("this is a warning colors".yellow);
let dirPath = PathHelper_1.PathHelper.getDirPath(".." + PathHelper_1.PathHelper.FILE_SEPERATE);
log4js.configure(log4jsConfig_1.default);
let LOGGER = log4js.getLogger("Express");
linkStart();
function linkStart() {
    LOGGER.info("Current nodejs root path is: " + dirPath);
    let app;
    HttpUtils_1.HttpUtils.init();
    Promise.resolve(null)
        .then(createApp)
        .then(initLog4jsInApp)
        .then(initParserInApp)
        .then(initIcon)
        .then(setClsMiddleWare)
        .then(registerDao)
        .then(registerRoute)
        .then(initErrorConfig)
        .then(createServer)
        .then(createProcessCatch)
        .then(createRedis)
        .then(createTaskTime)
        .catch(catchError);
    function createApp() {
        app = express();
    }
    function initLog4jsInApp() {
        app.use(log4js.connectLogger(log4js.getLogger("http"), {
            level: 'auto',
            format: ':method :url :status :response-time ms :remote-addr'
        }));
    }
    function initParserInApp() {
        app.use(bodyParser.json({ limit: '10mb' }));
        app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
        app.use(cookieParser());
    }
    function initIcon() {
        app.use(favicon(path.join(__dirname, '../images', 'sensenets.ico')));
        app.use(express.static(path.join(__dirname, "../swagger-ui")));
    }
    function setClsMiddleWare() {
        app.use(function (req, res, next) {
            HttpUtils_1.HttpUtils.setup(req, res, next);
        });
    }
    function registerDao() {
        DaoConfig_1.DaoConfig.init(app);
    }
    function registerRoute() {
        RouteConfig_1.RouteConfig.init(app);
    }
    function initErrorConfig() {
        app.use((req, res, next) => {
            let err = new Error("Not Found");
            next(err);
        });
        app.use((err, req, res, next) => {
            LOGGER.error(util.format("express caught error: %s %s", err && err.message, err && err.stack));
            ResponseResultTool_1.ResponseResultTool.convertError2ResponseResult(res)(err);
        });
    }
    function createServer() {
        const server = http.createServer(app);
        server.listen(Config_1.default.port);
        server.on("error", (e) => {
            LOGGER.info("Error starting server" + e);
        });
        server.on("listening", () => {
            LOGGER.info("starting server: " + Config_1.default.port);
        });
    }
    function createProcessCatch() {
        process.on('uncaughtException', (err) => {
            LOGGER.error(util.format("node uncaughtException %s %s", err && err.message, err && err.stack));
        });
        process.on('exit', (code) => {
            LOGGER.error(util.format("node exit %s", code));
        });
    }
    function createRedis() {
        Redis_1.RedisClient.instance().init();
    }
    function createTaskTime() {
        TimedTask_1.TimedTask.TaskNowResource(true);
        TimedTask_1.TimedTask.TaskHistoryResource(true);
    }
    function catchError(err) {
        LOGGER.error(util.format("App Server start Error %j %j", err.toString(), err.stack));
    }
}
