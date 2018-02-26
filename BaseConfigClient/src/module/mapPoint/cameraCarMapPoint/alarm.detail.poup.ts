
import {app} from "../../common/app/main.app";
import {Capture,MockCaptureList,Alarm,MockAlarmList} from "./TestEnum";
import PageParams from "../../common/directive/page/page-params";
declare let $: any;
const image64x64:string = 'http://temp.im/64x64/ccc/fff';
const image120x90:string = 'http://temp.im/120x90/ccc/fff';
const image120x120:string = 'http://temp.im/120x120/ccc/fff';
const image45x45:string = 'http://temp.im/45x45/ccc/fff';
class AlarmDetailPoupController {
    static $inject = ['$scope','mylayer'];

    alarmNowInfo:Alarm = MockAlarmList(1,image120x120)[0];
    historyCaptrueParams:PageParams = new PageParams(1,10);
    topCaptrueList:Array<Capture> = MockCaptureList(5,image64x64);
    historyCaptrueList:Array<Capture> = MockCaptureList(12,image120x90);
    historyAlarmList:Array<Alarm> = MockAlarmList(5,image45x45);
    alarmInfoList:Array<Alarm> = MockAlarmList(6,image120x120);

    isShowHistory:boolean = false;
    historyIsShowAlarm:boolean = false;

    constructor(private $scope: any,private mylayer:any) {
        console.log(this.topCaptrueList);
        this.historyCaptrueParams.totalCount = 210;
        this.historyCaptrueParams.currentPage = 1;
        this.historyCaptrueParams.pageCount = 10;
        this.historyCaptrueParams.pageSize = 21;
    }
    closeMyLayer(){
        this.mylayer.close('huangjingjing')
    }

}

app.controller('alarmDetailPoupController', AlarmDetailPoupController);