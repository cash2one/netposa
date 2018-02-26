export class MockTask{
    task:string;
    name: string;
    area: string;
    creater: string;
    type: string;
    time: string;
    taskStatus: string;
    checkStatus: string;
    desc: string;
}

export function MockTaskList(num:number):Array<MockTask>{
    let arr = [] as Array<MockTask>;
    for (let i = 1; i<=num;i++){
        arr.push({
            task: "人像布控任务",
            name: "车辆结构化任务",
            area: "武汉市洪山区",
            creater: "张警官",
            type: "人像布控",
            time: "2016.09.10-2020-12.30",
            taskStatus: "运行中",
            checkStatus: "已通过",
            desc: "洪山区条件已具备洪山区条件已具备"
        } as MockTask)
    }
    return arr
}