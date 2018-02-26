import {app} from "../app/main.app";
import 'angular';
declare let angular: any;

export interface IintellRetService{
    trailAnalysisSearch: Function;
    faceRetrievalSearch:Function;
    searchFace:Function;
    searchAlarm:Function;
    operationrecord:Function;
    recordSearch:Function;
    log:Function;
    findUserPersonInfoInCreateTaskUser:Function;
    exportAccessLogData:Function;
    findPersonArea:Function;
    exportAlarmlog:Function;
    exportSearchface:Function;
    exportRetrievalLog:Function;
}

class intellRetService implements IintellRetService {

    static $inject:Array<string> = ['$http'];

    constructor(private $http: any) {
        this.$http = $http;
    }

    trailAnalysisSearch:Function = (param:{[key:string]:any})=>{
        return this.$http({
            method: 'post',
            headers:{'Content-Type': 'application/json ;charset=utf-8'},
            data: param,
            url: '/fds/search/searchaccesslog'
        });
    };

    faceRetrievalSearch:Function = (param:{[key:string]:any}) => {
        return this.$http({
            method: 'post',
            headers:{'Content-Type': 'application/json ;charset=utf-8'},
            data: param,
            url: '/fds/businesslib/person/list '
        });
    };

    searchFace:Function = (param:{[key:string]:any})=>{
        return this.$http({
            method: 'post',
            headers:{'Content-Type': 'application/json ;charset=utf-8'},
            data: param,
            url: '/fds/search/searchface'
        });
    };

    searchAlarm:Function = (param:{[key:string]:any})=>{
        return this.$http({
            method: 'post',
            headers:{'Content-Type': 'application/json ;charset=utf-8'},
            data: param,
            url: '/fds/search/alarmlog '
        });
    };

    operationrecord:Function = (param:{[key:string]:any})=>{
        return this.$http({
            method: 'post',
            headers:{'Content-Type': 'application/json ;charset=utf-8'},
            data: param,
            url: '/fds/search/alarmlog/operationrecord'
        });
    };

    recordSearch:Function = (param:{[key:string]:any})=>{
        return this.$http({
            method: 'post',
            headers:{'Content-Type': 'application/json ;charset=utf-8'},
            data: param,
            url: '/fds/search/searchretrievallog'
        });
    };

    log:Function = (param : {[key:string]:any})=>{
        return this.$http({
            method: 'post',
            headers:{'Content-Type': 'application/json ;charset=utf-8'},
            data: param,
            url: '/fds/search/log '
        });
    };

    findUserPersonInfoInCreateTaskUser:Function = (param:{[key:string]:any})=>{
        return this.$http({
            method: 'get',
            headers:{'Content-Type': 'application/json ;charset=utf-8'},
            data: param,
            url: '/db/user/findUserPersonInfoInCreateTaskUser'
        });
    };

    findPersonArea:Function = (param:{[key:string]:any})=>{
        return this.$http({
            method: 'post',
            headers:{'Content-Type': 'application/json ;charset=utf-8'},
            data: param,
            url: '/fds/baseconfig/findPersonArea'
        });
    };

    exportAccessLogData:Function = (param:{[key:string]:any})=>{
        return this.$http({
            method: 'post',
            headers:{'Content-Type': 'application/json ;charset=utf-8'},
            data: param,
            url: '/db/export/exportAccessLog'
        });
    };

    exportAlarmlog:Function = (param:{[key:string]:any})=>{
        return this.$http({
            method: 'post',
            headers:{'Content-Type': 'application/json ;charset=utf-8'},
            data: param,
            url: '/db/export/exportAlarm'
        });
    };

    exportSearchface:Function = (param:{[key:string]:any})=>{
        return this.$http({
            method: 'post',
            headers:{'Content-Type': 'application/json ;charset=utf-8'},
            data: param,
            url: '/db/export/exportFace'
        });
    };

    exportRetrievalLog:Function = (param:{[key:string]:any})=>{
        return this.$http({
            method: 'post',
            headers:{'Content-Type': 'application/json ;charset=utf-8'},
            data: param,
            url: '/db/export/exportRetrievalLog'
        });
    };
}

app.service('intellRetService', intellRetService);