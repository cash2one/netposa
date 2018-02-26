import { IPageParams } from "./table/TableParams";

/**
 * 用于我的报警查询报警数据用
 */
export class SearchAlarmParams implements IPageParams {
    // 当前页
    currentPage: number;
    // 单页显示
    pageSize: number;
    // 任务id
    arrStructureTaskId: Array<string>;
    // 对象
    objectType: Array<string>;
    // 开始时间
    startTime: string;
    // 结束时间
    endTime: string;
}