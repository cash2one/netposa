export class MacAlarmParams {
    startTime: string; // 开始时间
    endTime: string; // 结束时间
    arrObjectId: Array<string>;
    currentPage: number = 1;
    pageSize: number = 10;
    exportOperation: boolean;
    sortType: string;
    taskId: string;
}


