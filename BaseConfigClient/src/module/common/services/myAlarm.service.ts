import { app } from "../app/main.app";
import { IAngularHttp } from '../interceptors/http';
import { ResponseResult, PageResult } from "../../../core/params/result/ResponseResult";
import { SearchAlarmLogResult } from "../../../core/server/AlarmModule";
import { SearchAlarmParams } from "../../../core/params/SearchAlarmParams";

declare let angular:any;

export class MyAlarmService{
    static $inject = ["$http"]
    constructor(private $http: IAngularHttp){

    }
    getMyAlarmList(params: SearchAlarmParams): Promise<ResponseResult<PageResult<SearchAlarmLogResult>>>{
        let _params: SearchAlarmParams = angular.copy(params);
        return this.$http({
            method: "post",
            url: "/pdp/myAlarm/getMyAlarmList",
            // url: "/mock/myAlarm/myAlarm.json?v="+new Date().getTime(),
            data: _params,
            timeout: 30000,
            showLoad: true
        });
    }



}

app.service("myAlarmService", MyAlarmService);