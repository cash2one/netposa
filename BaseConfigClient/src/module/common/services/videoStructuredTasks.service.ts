
import {app} from "../app/main.app";
import 'angular';
import {TaskModel,CarMonitor,TaskSearchParams} from "../../../core/server/TaskModel";
import {DataOperType} from "../../../core/server/enum/DataOperType";
import {ObjectType} from "../../../core/enum/ObjectType";
import {ResponseResult, BackResponseBody} from "../../../core/params/result/ResponseResult";
import {EventRuleModelEx} from "../../../core/server/EventRuleModel";
import {IResponseNotifyFactory} from "../factory/response.notify.factory";
import { VideoTaskModel } from "../../../core/entity/VideoStructTask";
import {OperFitstModule} from '../../../core/entity/OperFirstModule';
import {OperSecondModule} from '../../../core/entity/OperSecondModule';
import {OperThirdModule} from '../../../core/entity/OperThirdModule';
import {OperActionType} from '../../../core/entity/OperActionType';
import {ISystemLogFactory} from "../factory/SystemLog.factory";
import "../factory/SystemLog.factory";

declare let angular: any;

export interface IVideoStructuredTasksService {
    getFaceDetail(id:string):Promise<BackResponseBody<TaskModel>>;

    addOrUpdateFaceTask(params:any):Promise<BackResponseBody<string>>

    findFaceListByParams(params:TaskSearchParams):any;

    deleteFaceTaskForIDS(params:Array<string>):any;

    updateFaceRunStatus(ids:string,isStart:boolean):any;

}
/** create by zxq
 *  任务管理 增删改查 请求
 * @time: 2017-06-14 11:24:01
 * @params:
 * @return:
 */
class VideoStructuredTasksService implements IVideoStructuredTasksService{

    static $inject:Array<string> = ['$http','$q','notifyFactory','systemLogFactory'];
    private notifyFunc:(res: ResponseResult<any>)=>ResponseResult<any>;
    constructor(private $http: any,private $q: any,private notifyFactory: IResponseNotifyFactory,private systemLogFactory:ISystemLogFactory) {
        this.notifyFunc = this.notifyFactory.msg({onlySuccess: true});
    }

    findFaceListByParams = (params:TaskSearchParams)=>{
        return this.$http({
            method:"get",
            params: params,
            url:"/db/videoStruct/findFaceList",
        })
    };
    
    getFaceDetail(ID:string){
        return this.$http({
            method:"get",
            params: {id:ID},
            url:"/db/videoStruct/findFaceById",
        })

    };


    deleteFaceTaskForIDS(ids:Array<string>){
        return this.$http({
            method:"post",
            params: {taskGroupIds:ids},
            url:"/pdp/videoTask/delete",
        }).then(this.notifyFunc).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Business.code,
            OperThirdModule: OperThirdModule.BaseConfig_Business_VideoStructTask.code,
            ActionType: OperActionType.Del.code
        }))
    }


    addOrUpdateFaceTask(params:any):Promise<BackResponseBody<string>>{
        return this.$http({
            method:"post",
            data: params,
            url:"/pdp/videoTask/operateTask",
        }).then(this.notifyFunc).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Business.code,
            OperThirdModule: OperThirdModule.BaseConfig_Business_VideoStructTask.code,
            ActionType: OperActionType.Modify.code
        }))
    }

    updateFaceRunStatus = (ids:string,isStart:boolean)=>{
       let params = {
           taskGroupIds:ids,
           isStart:isStart
       };

        return this.$http({
            method:"post",
            params: params,
            url:"/pdp/videoTask/updateTaskStatus",
        }).then(this.notifyFunc).then(this.systemLogFactory.preSaveLogEx({
            OperFirstModule: OperFitstModule.BaseConfig.code,
            OperSecondModule: OperSecondModule.BaseConfig_Business.code,
            OperThirdModule: OperThirdModule.BaseConfig_Business_VideoStructTask.code,
            ActionType: OperActionType.Modify.code
        }))
    };
}

app
    .service('videoStructuredTasksService', VideoStructuredTasksService)
;