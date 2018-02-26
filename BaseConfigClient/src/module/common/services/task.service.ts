
import {app} from "../app/main.app";
import 'angular';
import {TaskListParams, deviceInfo, TaskConfigGetAlarmTaskIdsParam} from "../../../core/params/TaskConfigParams";
import {DataOperType} from "../../../core/server/enum/DataOperType";
import {BackResponseBody, ResponseResult} from '../../../core/params/result/ResponseResult';
import {IResponseNotifyFactory} from "../factory/response.notify.factory";
import {TaskSearchParams,TaskModel,MacMonitor,CarMonitor} from "../../../core/server/TaskModel";
import { IUserInfoCacheFactory } from '../factory/userinfo.cache.factory';

import {OperFitstModule} from '../../../core/entity/OperFirstModule';
import {OperSecondModule} from '../../../core/entity/OperSecondModule';
import {OperThirdModule} from '../../../core/entity/OperThirdModule';
import {OperActionType} from '../../../core/entity/OperActionType';
import {ISystemLogFactory} from "../factory/SystemLog.factory";
import "../factory/SystemLog.factory";
import {vehicleAuditParam} from "../../../core/entity/MyCheck";
let Promise = require('es6-promise');
declare let angular: any,$:any,require:any;

export interface ITaskService {

    // 更新审核状态
    // 审核人像布控和人像结构化任务
    updateAuditStatus(id:string,auditStatusValue:string):any;
    auditVehicleStatus(id:string,auditStatusValue:string):any;
    // 审核mac相关的 包含 mac任务 imsi任务 imei任务
    auditMacStatus(id: string, auditStatus: string):Promise<ResponseResult<boolean>>;
    findFaceByTaskId(ID:string): Promise<ResponseResult<TaskModel>>;
    findFaceById(ID:string): Promise<ResponseResult<TaskModel>>;
    findFaceListByParams(params:TaskSearchParams):any;
    findMacListByParams(params:TaskSearchParams):any;
    findCarListByParams(params:TaskSearchParams):any;
    deleteCarTaskForIDS(params:Array<string>):any;
    deleteFaceTaskForIDS(params:Array<string>):any;
    deleteMacTaskForIDS(params:Array<string>):any;

    addOrUpdateFaceTask(params:any):Promise<BackResponseBody<string>>;
    findCarById(id:string):Promise<BackResponseBody<CarMonitor>>;


    updateFaceRunStatus(ids:string,isStart:boolean):any;
    updateCarRunStatus(ids:string,isStart:boolean):any;
    updateMacRunStatus(ids:string,isStart:boolean):any;

    addOrUpdateRfidTask(params:any) : any;
    findRfidById(id:string):Promise<BackResponseBody<MacMonitor>>;

    addOrUpdateCarTask(params:any):any;

    uploadCarPhoto(params:FormData): any;
    // 通过摄像机ID拿到任务taskID
    getTaskByDeviceID(id:string,type:string): any
    /**
     * 获取当前用户可以查看的所有报警任务id
     */
    getAlarmTaskIds(): Promise<ResponseResult<Array<string>>>;
    getUserIdByPersonId(ID:Array<string>): any;
}
/** create by zxq
 *  任务管理 增删改查 请求
 * @time: 2017-06-14 11:24:01
 * @params:
 * @return:
 */
class TaskService implements ITaskService{

    static $inject:Array<string> = ['$http','$q','notifyFactory','userInfoCacheFactory','systemLogFactory'];
    private notifyFunc:(res: ResponseResult<any>)=>ResponseResult<any>;
    constructor(private $http: any,private $q: any,private notifyFactory: IResponseNotifyFactory, private userInfoCacheFactory: IUserInfoCacheFactory,private systemLogFactory:ISystemLogFactory) {
        this.notifyFunc = this.notifyFactory.msg({onlySuccess: true});
    }
    addOrUpdateFaceTask(params:any){
        return this.$http({
            method: "post",
            data: params,
            url: "/db/taskconfig/facetask/addOrUpdate"
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Business.code,
            OperThirdModule: OperThirdModule.BaseConfig_Business_MonitorTask.code,
            ActionType: OperActionType.Add.code
        })).then(this.notifyFunc)
    }
    getTaskByDeviceID (id:string,type:string){
        return this.$http({
            method: "post",
            params: {ID: id,type:type},
            url: "/db/taskconfig/facetask/getFaceTaskIDs"
        })
    };

    findFaceListByParams  (params:TaskSearchParams){
        return this.$http({
            method:"get",
            params: params,
            url:"/db/taskconfig/facetask/search",
        })
    };
    findFaceById (ID:string){
        return this.$http({
            method:"get",
            params: {ID:ID},
            url:"/db/taskconfig/facetask/detail"
        })

    };
    findFaceByTaskId(ID:string){
        return this.$http({
            method:"get",
            params: {ID:ID},
            url:"/db/taskconfig/task/findFaceByTaskId"
        })

    };
    findCarById (ID:string){
        return this.$http({
            method:"get",
            params: {ID:ID},
            url:"/db/taskconfig/cartask/detail"
        })

    };

    findRfidById(ID:string){
        return this.$http({
            method:"get",
            params: {ID:ID},
            url:"/db/taskconfig/rfidtask/detail"
        })

    };

    findMacListByParams = (params:TaskSearchParams)=>{
        return this.$http({
            method:"get",
            params: params,
            url:"/db/taskconfig/mactask/search",
        })
    };
    findCarListByParams = (params:TaskSearchParams)=>{
        return this.$http({
            method:"get",
            params: params,
            url:"/db/taskconfig/cartask/search",
        })
    };



    deleteCarTaskForIDS(ids:Array<string>){
        return this.$http({
            method:"post",
            params: {taskGroupIds:ids.toString()},
            url:"/pdp/vehicleTask/delete",
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Business.code,
            OperThirdModule: OperThirdModule.BaseConfig_Business_MonitorTask.code,
            ActionType: OperActionType.Del.code
        }))
    }

    deleteFaceTaskForIDS(ids:Array<string>){
        return this.$http({
            method:"post",
            params: {taskGroupIds:ids.toString()},
            url:"/pdp/videoTask/delete",
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Business.code,
            OperThirdModule: OperThirdModule.BaseConfig_Business_MonitorTask.code,
            ActionType: OperActionType.Del.code
        }))
    }
    deleteMacTaskForIDS(ids:Array<string>){
        return this.$http({
            method:"post",
            params: {taskIds:ids.toString()},
            url:"/pdp/macTask/delete",
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Business.code,
            OperThirdModule: OperThirdModule.BaseConfig_Business_MonitorTask.code,
            ActionType: OperActionType.Del.code
        }))
    }

    updateAuditStatus  (id:string,auditStatusValue:string){
        let _params = new TaskModel();
        _params.ID = id;
        _params.AuditStatus = auditStatusValue;
        _params.OperateType =  DataOperType.Update.value;

        return this.$http({
            method:"post",
            data: _params,
            url:"/pdp/videoTask/auditTask",
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Business.code,
            OperThirdModule: OperThirdModule.BaseConfig_Business_MonitorTask.code,
            ActionType: OperActionType.Modify.code
        }));
    };

    auditMacStatus  (id: string, auditStatus: string){
        let params = {
            taskId: id,
            verifyState: auditStatus
        };

        return this.$http({
            url:"/pdp/rfidCtrl/macTask/audit",
            method:"post",
            params: params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Business.code,
            OperThirdModule: OperThirdModule.BaseConfig_Business_MonitorTask.code,
            ActionType: OperActionType.Modify.code
        }));
    };

    auditVehicleStatus  (id: string, auditStatus: string){
        let params = {} as vehicleAuditParam;
        params.id = id;
        params.auditStatus = auditStatus;

        return this.$http({
            url:"/pdp/vehicleTask/auditTask",
            method:"post",
            data: params
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Business.code,
            OperThirdModule: OperThirdModule.BaseConfig_Business_MonitorTask.code,
            ActionType: OperActionType.Modify.code
        }));
    };

    updateFaceRunStatus  (ids:string,isStart:boolean){
       let params = {
           taskGroupIds:ids,
           isStart:isStart
       };

        return this.$http({
            method:"post",
            params: params,
            url:"/pdp/videoTask/updateTaskStatus",
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Business.code,
            OperThirdModule: OperThirdModule.BaseConfig_Business_MonitorTask.code,
            ActionType: OperActionType.Modify.code
        }))
    };
    updateCarRunStatus (ids:string,isStart:boolean){
        let params = {
            taskGroupIds:ids,
            isStart:isStart
        };

        return this.$http({
            method:"post",
            params: params,
            url:"/pdp/vehicleTask/updateTaskStatus",
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Business.code,
            OperThirdModule: OperThirdModule.BaseConfig_Business_MonitorTask.code,
            ActionType: OperActionType.Modify.code
        }))
    };
    updateMacRunStatus (ids:string,isStart:boolean){
        let params = {
            taskGroupIds:ids,
            isStart:isStart
        };

        return this.$http({
            method:"post",
            params: params,
            url:"/pdp/macTask/updateTaskStatus",
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Business.code,
            OperThirdModule: OperThirdModule.BaseConfig_Business_MonitorTask.code,
            ActionType: OperActionType.Modify.code
        }))
    };


    addOrUpdateRfidTask(params:any){
        return this.$http({
            method:"post",
            data: params,
            url:"/db/taskconfig/rfidtask/addOrUpdate",
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Business.code,
            OperThirdModule: OperThirdModule.BaseConfig_Business_MonitorTask.code,
            ActionType: OperActionType.Add.code
        })).then(this.notifyFunc)
    }
    addOrUpdateCarTask(params:any){
        return this.$http({
            method: "post",
            data: params,
            url: "/db/taskconfig/cartask/addOrUpdate"
        }).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Business.code,
            OperThirdModule: OperThirdModule.BaseConfig_Business_MonitorTask.code,
            ActionType: OperActionType.Add.code
        })).then(this.notifyFunc)
    }
    uploadCarPhoto(params:FormData){
        return new Promise((resolve:any,reject:any)=>{
            let xhr = new XMLHttpRequest();
            xhr.open('POST','/db/upload/image',true);
            xhr.onreadystatechange = (ev)=>{
                if (xhr.readyState==4 && xhr.status==200) {
                    console.log(JSON.parse(xhr.responseText));
                    resolve(JSON.parse(xhr.responseText))
                }
            };
            xhr.onerror = (err:any)=>{
                reject(err)
            };
            xhr.send(params)
        })
    }

    getAlarmTaskIds(){
        let userId = this.userInfoCacheFactory.getCurrentUserId();
        let params: TaskConfigGetAlarmTaskIdsParam = {
            userId: userId
        };
        return this.$http({
            method: 'get',
            url: "/db/taskconfig/getTaskIdsByUserId",
            params: params
        });
    }

    getUserIdByPersonId(IDs:Array<string>){
        console.log(IDs);
        let params: any = {
            IDs: IDs
        };
        return this.$http({
            method: 'post',
            url: "/db/taskconfig/getUserIdByPersonId",
            params: params
        });
    }
}

app
    .service('taskService', TaskService)
;