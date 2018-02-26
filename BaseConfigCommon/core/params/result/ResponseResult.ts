/**
 * Created by dell on 2017/4/8.
 */

export class BackResponseBody<T> {
    code: number;
    count: number;
    message: string;
    data: T;
    status: string;
}

export class ResponseResult<T> {
    code: number;
    count: number;
    message: string;
    status: string;
    data: T;
}

export class PageResult<T>{
    TotalCount: number;
    Result: Array<T>;
}

export class HttpResponseResult<T> {
    data: ResponseResult<T>;
    config: any;
    headers: any;
    status: number;
    statusText: string;
}