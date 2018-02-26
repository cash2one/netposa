export class PageParams<T> {
    currentPage: number;
    pageSize: number;
    count: number;
    data?:T
}