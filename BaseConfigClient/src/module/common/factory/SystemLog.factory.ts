
import { SystemLog } from "../../../core/entity/SystemLog";
import { app } from "../app/main.app";
import "../services/SystemLog.service";
import { ISystemLogService } from "../services/SystemLog.service";
import { PreSystemLog } from "../interceptors/http";
// import {SaveSystemLogParams} from "../../../core/entity/ex/SystemLogEx";
import { ResponseResult } from "../../../core/params/result/ResponseResult";

/**
 * 系统操作日志工厂
 */

export interface ISystemLogFactory {
    preSaveLogEx: IPreSaveLogEx;
    /**
     * 由于部分也不需要同步进行处理, 所以这里把核心数据转换方法封装供外部调用
     * @param log
     */
    getSaveLogEx(log: PreSystemLog): any;

    saveLog(log: any): Promise<any>;
}

/**
 * 保存日志时候的额外参数
 */
export type AfterResponseCallBack = (log: PreSystemLog, res: ResponseResult<any>) => void;
export type IPreSaveLogEx = (log: PreSystemLog, callback?: AfterResponseCallBack) => (origin: ResponseResult<any>) => ResponseResult<any>;

class SystemLogFactory {
    static $inject = ['$injector'];

    constructor(private $injector: any) {

    }

    /**
     * 处理一些逻辑, 比如当前界面所在模块名
     * @param log
     * @return {PreSystemLog}
     */
    private processPreSystemLog(log: PreSystemLog) {
        return log;
    }

    preSaveLogEx: IPreSaveLogEx = (log: PreSystemLog, callback?: AfterResponseCallBack) => {
        let vm = this;
        let _tempPreSystemLog = vm.processPreSystemLog(log);
        log = null;
        // this.preSaveLog(uuid, log);
        return function (origin: ResponseResult<any>): ResponseResult<any> {
            // 只有成功的才保存日志
            if (origin && origin.code === 200) {

                if (typeof callback === "function") {
                    callback(_tempPreSystemLog, origin);
                    callback = null as any;
                }
                // 这里可能还需要进行一些转换
                // 由于此值是从拦截器中传来, 为了不阻塞拦截器, 故在这里使用setTimeout来进行异步
                ((saveLog: PreSystemLog) => {
                    setTimeout(() => {
                        vm.saveLog(saveLog);
                    }, 0);
                })(_tempPreSystemLog);
            }
            _tempPreSystemLog = null as any;
            // 返回传来的值
            return origin;
        }
    };


    /**
     * 获取最终加工要保存的日志记录
     * @param log
     * @return {SaveSystemLogParams}
     */
    private getSaveLogEx = (log: PreSystemLog) => {
        let saveSystemlog = {} as any;
        saveSystemlog.OperFirstModule = log.OperFirstModule;
        saveSystemlog.OperSecondModule = log.OperSecondModule;
        saveSystemlog.OperThirdModule = log.OperThirdModule;
        saveSystemlog.ActionType = log.ActionType;
        saveSystemlog.ObjectID = log.ObjectID;
        saveSystemlog.ObjectType = log.ObjectType;
        saveSystemlog.ObjectName = log.ObjectName;
        if (log.ObjectIDS || log.ObjectNames) {
            saveSystemlog.JsonExtData = {} as SystemLog;
            // 这里只记录objectIDS 放在objectID里
            if (log.ObjectIDS) {
                saveSystemlog.JsonExtData.ObjectID = log.ObjectIDS;
            }
            if (log.ObjectNames) {
                saveSystemlog.JsonExtData.ObjectName = log.ObjectNames;
            }
        }
        return saveSystemlog;
    };

    saveLog(log: PreSystemLog) {
        // 由于httpInterceptor会有循环依赖, 所以在这里每次调用的时候获取systemLogService
        let systemLogService: ISystemLogService = this.$injector.get("systemLogService");
        // 在这里请求后台保存日志
        return systemLogService.save(this.getSaveLogEx(log));
    }
}

app.service('systemLogFactory', SystemLogFactory);