interface ITaskStatus{
    Run: {value: string, text: string},
    Waiting: {value:string, text:string},
    Overdue: {value: string, text: string},
    Stop:{value:string,text:string}
}

export const TaskStatus:{[key: string]: {value:string, text:string}} & ITaskStatus  = {
    Run: {value: "Run", text: "运行中"},
    Waiting: {value:"Waiting", text:"未运行"},
    Overdue: {value: "Overdue", text: "已过期"},
    Stop:{value:'Stop',text:'已停止'}
};
