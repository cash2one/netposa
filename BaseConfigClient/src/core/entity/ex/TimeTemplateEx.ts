import {ITimeTemplate} from "../TimeTemplate";
/** create by zxq
 *  时间模板
 * @time: 2017-06-24 15:31:10
 */
export class TimeTemplateEx implements ITimeTemplate{
    ID: string;
    Name: string;
    IsFullDay: boolean;
    WeekContent: string;
    DayContent: string;
    CreateTime:string;
    Description: string;
    Ext: string;
    DateItems:Array<DateItem>;
    WeekItems:Array<WeekItem>;
    IsTemplate:boolean;
    TaskMonitorType:string;
}

export class WeekItem{
    DayOfWeek:string;
    TimeItems:Array<TimeItem>;
}
export class TimeItem{
    ThresholdType:string;
    StarTime:string;
    EndTime:string;
}
export class DateItem{
    DateName:string;
    StartDateOfItem:string;
    EndDateOfItem:string;
    TimeItems:Array<TimeItem>;
}

export class TimeTemplateType {
    ALL = {code: "ALL", name: "全部"};
    FaceMonitor = {code: "FaceMonitor", name: "人像布控"};

    CarMonitor = {code: "CarMonitor", name: "车辆布控"};

    MacMonitor = {code: "MacMonitor", name: "MAC布控"};

    FaceStruct = {code: "FaceStruct", name: "人脸结构化"};

    CarStruct = {code: "CarStruct", name: "车辆结构化"};
}