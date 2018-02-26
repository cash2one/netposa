/**
 * Created by tj on 2017/6/9.
 */
declare var require:any;
import {app} from "../app/main.app";
import 'angular';
declare let angular: any;

export interface ITotalService {
    getTaskDataList:Function;
    getUserDataList:Function;
    getFlowDataList:Function;
    getSearchDataList:Function;
    getAlarmDataList:Function;
    getCameraDataList:Function;
}

class TotalService implements ITotalService {

    static $inject: Array<string> = ['$http', '$q'];

    constructor(private $http: any, private $q: any) {
        this.$http = $http;
        this.$q = $q;
    }

    //获取任务统计后台数据
    getTaskDataList: Function = (_params:Array<object>) =>{
        return this.$http({
            method:'post',
            data: _params,
            url:'/fds/stats/task'
        })
    };

    //获取用户统计后台数据
    getUserDataList: Function = (_params:Array<object>) =>{
        return this.$http({
            method:'post',
            data: _params,
            url:'/fds/stats/user'
        })
    };

    //获取人流量统计后台数据
    getFlowDataList: Function = (_params:Array<object>) =>{
        return this.$http({
            method:'post',
            data: _params,
            url:'/fds/stats/flow'
        })
    };

    //获取像机设备统计后台数据
    getCameraDataList: Function = (_params:Array<object>) =>{
        return this.$http({
            method:'post',
            data: _params,
            url:'/fds/stats/camera'
        })
    };

    //获取区域检索统计后台数据
    getSearchDataList: Function = (_params:Array<object>) =>{
        return this.$http({
            method:'post',
            data: _params,
            url:'/fds/stats/retrieval'
        })
    };

    //获取报警统计后台数据
    getAlarmDataList: Function = (_params:Array<object>) =>{
        return this.$http({
            method:'post',
            data: _params,
            url:'/fds/stats/alarm'
        })
    };

}

app.service('totalService',TotalService);