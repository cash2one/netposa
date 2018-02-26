import { app } from '../app/main.app';
import { PageResult } from '../../../core/params/result/ResponseResult';
declare let angular:any;
export class PageModel<T>{

    datas: Array<T>;
    totalCount: number;
    setData(datas: Array<T>): void{
        this.datas = datas || ([] as Array<T>);
        this.totalCount = this.datas.length;
    }

    getDataByPage(currentIndex: number, pageSize: number): PageResult<T>{
        let arr = this.datas.slice((currentIndex - 1)*pageSize, currentIndex * pageSize);
        let result = {} as PageResult<T>;
        result.Result = angular.copy(arr);
        result.TotalCount = this.totalCount;
        return result;
    }

    delete(): void{
        this.datas = null;
    }
}

export class DatasCachePageFactory{
    getPageModel<T>(): PageModel<T>{
        return new PageModel<T>();
    }
}

app.service("datasCachePageFactory", DatasCachePageFactory);