/** create by zxq
 *  事件联动规则相关
 * @time: 2017-06-21 14:50:18
 */

// 事件规则
export class EventRuleModel{
    ID:string;
    Name:string;
    Description:string;
    Disabled:boolean;
    TimeTemplateID:string;
    Ext:string;
    constructor(){

    }
}

export class EventRuleModelEx extends EventRuleModel{
    JsonUserData:{
        ListEventTrigger:Array<EventRuleTriggerModel>;
    };
}
// 事件规则 对应 触发器
export class EventRuleTriggerModel{
    ID:string;
    /**
     * 关联 事件规则 类型ID
     */
    ObjectID:string;
    /**
     * 关联 事件规则 类型 （ObjectType 枚举）
     */
    ObjectType:string;
    /**
     * 事件规则ID
     */
    EventRuleID:string;
    /**
     * 事件规则类型
     */
    EventType:string;
    // 逻辑
    Logic:string;

    Ext:string;
    constructor(){

    }
}

export class EventRuleTriggerModelEx extends EventRuleTriggerModel{
    JsonUserData:{
        ListEventRuleAction:Array<EventRuleActionModel>;
    };
}
// 事件活动内容
export class EventRuleActionModel{
    ID:string;
    /**
     * 事件规则 活动类型（ActionType 枚举）
     */
    ActionType:string;
    /**
     * 事件规则ID
     */
    EventRuleID:string;
    /**
     * 事件规则触发器ID
     */
    EventRuleTriggerID:string;
    /**TODO 未知（增改任务联动事件 前端未用到） by zxq
     *
     */
    ObjectID:string;
    /**TODO 未知（增改任务联动事件 前端未用到） by zxq
     *
     */
    ObjectType:string;

    OrderNo: number;

    Ext:string;

    constructor(){

    }
}
/**
 * 声光报警联动事件参数
 */
export class CommandSoundLightAlarmActionExt extends EventRuleActionModel{
    /**
     * 报警通道号信息集
     */
    ChannelNoList:Array<number>;
}
/**
 * 发送报警到客户端 联动事件参数
 */
export class SendAlarmToClientActionExt extends EventRuleActionModel{
    /**
     * 接收用户ID列表
     */
    RecieveUserIDList:Array<string>;
    /**TODO 未知（增改任务联动事件 前端未用到） by zxq
     * 接收机构ID列表
     */
    RecieveUnitIDList:Array<string>;
}

/**
 * 发送短信扩展参数 联动事件参数
 */
export class SendSmsMessageActionExt extends EventRuleActionModel{
    /**
     * 短信内容
     */
    Text:string;
    /**
     * 接收人员ID列表
     */
    RecievePersonIDList:Array<string>;

    /**  TODO 未知（增改任务联动事件 前端未用到） by zxq
     * 接收机构ID列表
     */
    RecieveUnitIDList:Array<string>;
}