/** create by zxq
 * 任务配置相关参数
 * @time: 2017-06-05 11:00:33
 */
import {TableParams} from "./table/TableParams";
/** create by zxq
 * 获取任务列表数据
 * @time: 2017-06-05 14:22:15
 * @params:
 * @return:
 */

export class VideoTaskListParams extends TableParams{
    areaId: string;
    name: string;
    type: string;
    state: string;
    startTime: string;
	VideoAuditStatus:string;
    endTime: string;
	taskType:string;
    userID?: string;
}
export class TaskListParams extends TableParams{
    areaId: string;
    name: string;
    type: string;
    state: string;
    startTime: string;
	auditStatus:string;
    endTime: string;
	taskType:string;
    userID?: string;
}

export class TackDetailResult{
    id:string;
    name:string;
    createTime:string;
    validTimeStart:string;
    validTimeEnd:string;
    controlCommand:boolean;
    auditUser:string;
    authUsers:Array<string>;
    authStatus:string;
    auditDescrption:string;
    description:string;
    arrLibId:Array<string>;
    highThreshold:number;
    lowThreshold:number;
    timeTemplateId:string;
    prarms:string;
    removeCamaraIds:Array<string>;
    address:string;
    areaID:string;
    caseNumber:string;
    imageUrl:string;
    latitude:string;
    longitude:string;
    moduleName:string;
    requestFrom:string;
    retrievalNum:string;
    retrievalReason:string;
}

export class deviceInfo{
    ID: string;
    type: string;
}

export class TaskConfigGetAlarmTaskIdsParam{
    userId: string;
}