import {Enum, ValueTextEnumType} from "../../enum/Enum";

class State {
    All: Enum;
    Unknow: Enum;
    Stop: Enum;
    Run: Enum;
    Overdue: Enum;
    Waiting: Enum;
}
export const TaskState: ValueTextEnumType & State = {
    All: {value: '', text: "全部"},
    Unknow: {value: 'noRuning', text: "未运行"},
    Stop: {value: 'Stop', text: "暂停中"},
    Run: {value: 'Run', text: "运行中"},
    Overdue: {value: 'Overdue', text: "已过期"},
    Waiting: {value: 'Waiting', text: "等待程序自动启动"}
};

export const VerifyState: ValueTextEnumType = {
    All: {value: '', text: "全部"},
    UnCommite: {value:  'UnCommite', text: "草稿"},
    Refuse: {value: 'Refuse', text: "未通过"},
    Verifing: {value: 'Verifing', text: "审核中"},
    Verified: {value: 'Verified', text: "已通过"}
};