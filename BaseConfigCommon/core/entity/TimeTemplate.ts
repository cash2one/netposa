/** create by zxq
 *  时间模板
 * @time: 2017-06-24 15:31:10
 */
export class TimeTemplate implements ITimeTemplate{
    // id
    ID:string;
    // 名称
    Name:string;
    // 是否全天
    IsFullDay:boolean;
    // 周内容
    WeekContent:string;
    // 天内容
    DayContent:string;

    Description:string;

    CreateTime:string;

    IsTemplate:boolean;

    Ext:string
}

export class ITimeTemplate{
    // id
    ID:string;
    // 名称
    Name:string;
    // 是否全天
    IsFullDay:boolean;
    // 周内容
    WeekContent:string;
    // 天内容
    DayContent:string;

    Description:string;

    CreateTime:string;

    IsTemplate:boolean;

    Ext:string
}