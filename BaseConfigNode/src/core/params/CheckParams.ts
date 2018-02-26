import { TableParams, IPageParams } from "./table/TableParams";

export class CheckGetListParams implements IPageParams{
    currentPage: number;
    pageSize: number;
    userId: string;
    taskType: string;
    auditStatus: string;
    timeStart: string;
    timeEnd: string;
}