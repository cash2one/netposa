export class EventRule{
    ID:string;
    Name:string;
    Description:string;
    Disabled:boolean;
    TimeTemplateID:string;
    CreateTime:string;
    AreaID:string;
    IsTemplate:boolean;
    TaskMonitorType:string;
    Ext:string;
}

export class EventRuleActionModel{
    ID:string;
    EventRuleID:string;
    EventRuleTriggerID:string;
    ActionType:string;
    OrderNo:number;
    ObjectType:string;
    ObjectID:Array<string>;
    Ext:string;
}