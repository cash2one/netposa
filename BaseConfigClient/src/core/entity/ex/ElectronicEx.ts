import {EventRule} from "../EventRule";

export class EventRuleEx extends EventRule {
    EventRuleAction:{[key:string]:any} & EventRuleAction
}

export class EventRuleAction {
    SendSms: {
        Text: string;
        recievePersonIDList: Array<string>;
        recieveUnitIDList: Array<string>;
    };
    SendAlarmToClient:{
        RecieveUserIDList:Array<string>;
        RecieveUnitIDList:Array<string>;
    }
}

