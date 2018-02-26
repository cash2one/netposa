/**
 * 任务 审核状态
 * @time: 2017-06-05 11:53:17
 * @params:
 * @return:
 */

interface IAuditStatus{
    Verifing: {value:string, text:string};
    Verified: {value:string, text:string};
    Refuse: {value:string, text:string};
}

export const AuditStatus :{[key: string]: {value:string, text:string}} & IAuditStatus = {
    Verifing: {value: "Verifing", text: "审核中"},
    Verified: {value: "Verified", text: "已审核"},
    Refuse: {value: "Refuse", text: "未通过"},
};
