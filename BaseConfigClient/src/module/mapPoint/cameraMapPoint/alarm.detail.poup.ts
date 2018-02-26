
import {app} from "../../common/app/main.app";
import {Capture,Alarm} from "./TestEnum";
import PageParams from "../../common/directive/page/page-params";
declare let $: any;
const image64x64:string = 'http://temp.im/64x64/ccc/fff';
const image120x90:string = 'http://temp.im/120x90/ccc/fff';
const image120x120:string = 'http://temp.im/120x120/ccc/fff';
const image45x45:string = 'http://temp.im/45x45/ccc/fff';
class AlarmDetailPoupController {
    static $inject = ['$scope','mylayer'];

    alarmNowInfo:Alarm ;
    historyCaptrueParams:PageParams = new PageParams(1,10);
    topCaptrueList:Array<Capture>;
    historyCaptrueList:Array<Capture> ;
    historyAlarmList:Array<Alarm>;
    alarmInfoList:Array<Alarm>;

    isShowHistory:boolean = false;
    historyIsShowAlarm:boolean = false;

    constructor(private $scope: any,private mylayer:any) {
        console.log(this.topCaptrueList);
        this.historyCaptrueParams.totalCount = 210;
        this.historyCaptrueParams.currentPage = 1;
        this.historyCaptrueParams.pageCount = 10;
        this.historyCaptrueParams.pageSize = 21;
        this.$scope.$on('$destroy', () => {
            this.$scope.$emit('closeiframe')
        })
    }
    closeMyLayer(){
        this.mylayer.close('huangjingjing')
    }

}

app.controller('alarmDetailPoupController', AlarmDetailPoupController);