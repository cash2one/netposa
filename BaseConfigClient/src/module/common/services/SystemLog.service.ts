import {IPortraitRequestConfig} from "../interceptors/http";
import {app} from "../app/main.app";

export interface ISystemLogService{
    save(log: any): Promise<any>;
}

class SystemLogService{

    static $inject: Array<string> = ['$http'];

    constructor(private $http: any) {

    }

    save(log: any): Promise<any>{
        let config:IPortraitRequestConfig = {
            method: "post",
            url: "/db/systemlog/save",
            data: log
        };
        return this.$http(config);
    }
}

app.service('systemLogService', SystemLogService);