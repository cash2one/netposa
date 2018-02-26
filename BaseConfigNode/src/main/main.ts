import * as bodyParser from "body-parser";
import Config from "../Config";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as log4js from "log4js";
import * as path from "path";
import * as util from "util";
import * as process from "process";
import * as favicon from "serve-favicon";
import * as colors from "colors";
import {HttpUtils} from "../utils/HttpUtils";
import {ResponseResultTool} from "../common/res/ResponseResultTool";
import {DaoConfig} from './DaoConfig';
import {RouteConfig} from './RouteConfig';
import * as http from 'http';
import {PathHelper} from '../common/help/PathHelper';
import Log4Conf from "../log4jsConfig"
import {RedisClient} from "../extend/Redis"
import {TimedTask} from "../extend/TimedTask";
// set theme
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


// outputs red text
console.log("测试 npm install colors".red);

// outputs yellow text
console.log("this is a warning colors".yellow);
let dirPath = PathHelper.getDirPath(".." + PathHelper.FILE_SEPERATE);
//----------------- end
log4js.configure(Log4Conf);

let LOGGER = log4js.getLogger("Express");

linkStart();

function linkStart() {

    LOGGER.info("Current nodejs root path is: " + dirPath);

    let app: express.Express;

    // 创建一个cls命名空间
    HttpUtils.init();

    Promise.resolve(null)
        .then(createApp)
        .then(initLog4jsInApp)
        .then(initParserInApp)
        .then(initIcon)
        .then(setClsMiddleWare)
        // 拦截器以后再使用
        // .then(registerInterceptor)
        .then(registerDao)
        .then(registerRoute)
        .then(initErrorConfig)
        .then(createServer)
        .then(createProcessCatch)
        .then(createRedis)
        .then(createTaskTime)
        .catch(catchError);

    /**
     * 初始化express
     * @returns {null}
     */
    function createApp() {
        app = express();
    }

    /**
     * 初始化log4js日志配置
     * @returns {null}
     */
    function initLog4jsInApp() {
        // 页面请求日志, level用auto时,默认级别是WARN
        app.use(log4js.connectLogger(log4js.getLogger("http"), {
            level: 'auto',
            format: ':method :url :status :response-time ms :remote-addr'
        }));
    }

    /**
     * 初始化解析配置
     * @returns {null}
     */
    function initParserInApp() {
        app.use(bodyParser.json({limit: '10mb'}));
        app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
        app.use(cookieParser());
    }

    /**
     * 设置图标
     */
    function initIcon() {
        // 设置图标
        app.use(favicon(path.join(__dirname, '../images', 'sensenets.ico')));
        app.use(express.static(path.join(__dirname, "../swagger-ui")));
    }

    /**
     * 设置上下文中间件
     * @returns {null}
     */
    function setClsMiddleWare() {
        app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
            HttpUtils.setup(req, res, next);
        });
    }

    function registerDao() {
        DaoConfig.init(app);
    }

    function registerRoute() {
        RouteConfig.init(app);
    }

    function initErrorConfig() {
        app.use((req: express.Request, res: express.Response, next: Function): void => {
            let err: Error = new Error("Not Found");
            next(err);
        });

        // production error handler
        app.use((err: any, req: express.Request, res: express.Response, next: Function): void => {
            LOGGER.error(util.format("express caught error: %s %s", err && err.message, err && err.stack));
            ResponseResultTool.convertError2ResponseResult(res)(err);
        });
    }

    /**
     * 创建服务
     */
    function createServer() {
        // Init the express application
        const server: http.Server = http.createServer(app);
        server.listen(Config.port);
        server.on("error", (e: Error) => {
            LOGGER.info("Error starting server" + e);
        });
        server.on("listening", () => {
            LOGGER.info("starting server: " + Config.port);
        });
    }

    function createProcessCatch() {
        process.on('uncaughtException', (err: Error) => {
            LOGGER.error(util.format("node uncaughtException %s %s", err && err.message, err && err.stack));
        });

        process.on('exit', (code) => {
            LOGGER.error(util.format("node exit %s", code));
        });
    }

    function createRedis() {
        RedisClient.instance().init();
    }

    function createTaskTime(){
        TimedTask.TaskNowResource(true);
        TimedTask.TaskHistoryResource(true);
    }

    function catchError(err: Error) {
        LOGGER.error(util.format("App Server start Error %j %j", err.toString(), err.stack));
    }
}