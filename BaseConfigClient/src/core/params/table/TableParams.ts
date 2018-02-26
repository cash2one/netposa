export interface IPageParams {
    currentPage: number; // 页码数
    pageSize: number; // 单页大小
}

export interface IOrderByParams{
    //排序字段名
    sortName:string;
    //是否为升序
    isAsc:boolean;
}

export class TableParams implements IOrderByParams,IPageParams {
    sortName: string;
    isAsc: boolean;
    currentPage: number;
    pageSize: number;
    Name: string;
    Type: string;
}

export class IodTableParamForArea {
    ID:string;
}