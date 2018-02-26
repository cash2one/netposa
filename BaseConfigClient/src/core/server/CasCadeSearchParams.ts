export class CasCadeSearchParams {
    areaId: string;
    name: string;
    orderField: string;
    isAsc: boolean;
    pageIndex: number;
    pageSize: number;
    lampId?:string;
    code:string;
    cameratype:string;
}
export class CasCadeOrderType {
    static ASC = "ASC";
    static DESC = "DESC";
}