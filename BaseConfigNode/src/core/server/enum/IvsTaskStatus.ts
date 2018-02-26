/** create by zxq
 * 智能分析任务状态
 * @time: 2017-06-05 11:57:32
 * @params:
 * @return:
 */
/*TODO create zxq 枚举类型字段未确定，未跟后端拿*/
export const IvsTaskStatus:{[key: string]: {value:number, text:string}}  = {

    "-1": {value: 0, text: "已过期"},
    "0": {value: 1, text: "停止"},
    "1": {value: 2, text: "运行"},
};