
import 'css!./style/cameraMapPoint.css'
import {app} from "../../common/app/main.app";
import {Capture,MockCaptureList,Alarm,MockAlarmList} from "./TestEnum";
import PageParams from "../../common/directive/page/page-params";
declare let $: any;
const image64x64:string = 'http://temp.im/64x64/ccc/fff';
const image120x90:string = 'http://temp.im/120x90/ccc/fff';
const image78x78:string = 'http://temp.im/78x78/ccc/fff';
const image45x45:string = 'http://temp.im/45x45/ccc/fff';

class cameraPointHistoryFace {
    static  $inject = ['$scope','$timeout','mylayer'];
    startTime:string;
    emdTime:string;

    alarmNowInfo:Alarm = MockAlarmList(1,image78x78)[0];
    historyCaptrueParams:PageParams = new PageParams(1,10);
    topCaptrueList:Array<Capture> = MockCaptureList(5,image64x64);
    historyCaptrueList:Array<Capture> = MockCaptureList(10,image120x90);
    historyAlarmList:Array<Alarm> = MockAlarmList(5,image45x45);
    historyIsShowAlarm:boolean = false;

    constructor (private $scope: any,private $timeout:any,private mylayer:any) {
        this.historyCaptrueParams.totalCount = 210;
        this.historyCaptrueParams.currentPage = 1;
        this.historyCaptrueParams.pageCount = 10;
        this.historyCaptrueParams.pageSize = 21;
    }
}

app.controller('cameraPointHistoryFace', cameraPointHistoryFace);