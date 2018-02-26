
import {AlarmLogModel,AlarmLogInfo} from "./AlarmLog";

export class PersonAlarmParams {
    startTime: string;
    endTime: string;
    arrCameraId: Array<string> = [];
    pageSize:number = 15;
    currentPage:number = 1;
    alarmType?:string;
}

export class PersonAlarmResult {
    Result:Array<AlarmResultInfo>;
    TotalCount: number;
}
export class AlarmResultInfo{
    AlarmLog:AlarmLogModel;
    AlarmLogInfoArr:Array<AlarmLogInfo>
}

