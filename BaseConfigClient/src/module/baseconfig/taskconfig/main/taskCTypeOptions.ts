
export interface ITaskOption{
    value:string;
    text:string;
}

export const MacOptions:Array<ITaskOption> = [
    {value:'',text:'全部'},
    {value:'Blacklist',text:'黑名单'},
    {value:'Whitelist',text:'白名单'},
];
export const CarOptions:Array<ITaskOption> = [
    {value:'',text:'全部'},
    {value:'BlackList',text:'黑名单'},
    {value:'WhiteList',text:'白名单'}
];

export const tFaceHeadList = [
    {field: "Name", title: "DP_CONFIG_TASKCONFUG_12"},
    {field: "AreaName", title: "DP_CONFIG_TASKCONFUG_13"},
    {field: "CreateUserName", title: "DP_CONFIG_TASKCONFUG_14"},
    {field: "EffiTime", title: "DP_CONFIG_TASKCONFUG_15"},
    {field: "auditstatus", title: "DP_CONFIG_TASKCONFUG_16"},
    {field: "status", title: "DP_CONFIG_TASKCONFUG_17"},
    {field: "Auth", title: "DP_CONFIG_TASKCONFUG_18"},
    {field: "", title: "DP_CONFIG_COMMON_15"}
];
export const tCarHeadList = [
    {field: "CarNum", title: "DP_CONFIG_TASKCONFUG_19"},
    {field: "CreateUser", title: "DP_CONFIG_TASKCONFUG_20"},
    {field: "EffiTime", title: "DP_CONFIG_TASKCONFUG_21"},
    {field: "Name", title: "DP_CONFIG_TASKCONFUG_22"},
    {field: "Audit", title: "DP_CONFIG_TASKCONFUG_16"},
    {field: "State", title: "DP_CONFIG_TASKCONFUG_17"},
    {field: "", title: "DP_CONFIG_COMMON_15"}
];
export const tMacHeadList = [
    {field: "Name", title: "DP_CONFIG_TASKCONFUG_23"},
    {field: "CreateUser", title: "DP_CONFIG_TASKCONFUG_20"},
    {field: "EffiTime", title: "DP_CONFIG_TASKCONFUG_21"},
    {field: "Type", title: "DP_CONFIG_TASKCONFUG_22"},
    {field: "Audit", title: "DP_CONFIG_TASKCONFUG_16"},
    {field: "State", title: "DP_CONFIG_TASKCONFUG_17"},
    {field: "", title: "DP_CONFIG_COMMON_15"}
];