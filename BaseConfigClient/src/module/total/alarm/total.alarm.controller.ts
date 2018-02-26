/**
 * Created by dell on 2017/4/21.
 */

import {app} from "../../common/app/main.app";

import "./alarmTrend/alarmTrend.controller"
import "./areaAlarm/areaAlarm.controller"
import "./deviceAlarm/deviceAlarm.controller"
import "./libAlarm/libAlarm.controller"

class TotalAlarmController {
    static $inject = ['$scope'];

    areaAlarmHtmlUrl:string;
    alarmTrendHtmlUrl:string;
    deviceAlarmHtmlUrl:string;
    libAlarmHtmlUrl:string;

    constructor($scope: any) {
        console.log("进入报警页面");
        let vm = this;

        vm. areaAlarmHtmlUrl = "/module/total/alarm/areaAlarm/areaAlarm.html?v=" + new Date().getTime();
        vm. alarmTrendHtmlUrl = "/module/total/alarm/alarmTrend/alarmTrend.html?v=" + new Date().getTime();
        vm. deviceAlarmHtmlUrl = "/module/total/alarm/deviceAlarm/deviceAlarm.html?v=" + new Date().getTime();
        vm. libAlarmHtmlUrl = "/module/total/alarm/libAlarm/libAlarm.html?v=" + new Date().getTime();
    }
}

app.controller('totalAlarmController', TotalAlarmController);