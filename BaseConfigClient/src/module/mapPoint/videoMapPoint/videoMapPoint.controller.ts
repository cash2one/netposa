import {app} from "../../common/app/main.app";
import {AlarmResultInfo} from "../../../core/entity/PersonAlarmEnum";
import { IVideoOcxControlFunc, VideoOcxRealTimeOpt, VideoOcxPvgBackOpt} from "../../common/directive/ocx/video.ocx.directive";
import { IResponseNotifyFactory } from "../../common/factory/response.notify.factory";
import { ResponseResult } from "../../../core/params/result/ResponseResult";
import { BackResponseBody } from "../../../core/params/result/ResponseResult";
import "../../common/services/camera.service";
import { ICameraService } from "../../common/services/camera.service";

import "../../common/factory/systemInfo.cache.factory";
import {ISystemInfoCacheProvider} from "../../common/factory/systemInfo.cache.factory";
import {SystemConfigParams} from "../../../core/entity/SystemConfigParams";

interface PlayerInfo {
    id:string;                    //相机id 必传
    type:number                   //播放视屏的类型  @[parms] 1:实时; 2:历史;
    alarmTime?: string | number;  //报警时间 @[parms] ==>格式示例 1:( 2017/11/23 12:00:00 ) or ( 1511408127762 )
    [propName: string]: any;
}
class VideoMapPointController {
    static $inject = ["$scope", "$timeout", '$http', 'notifyFactory','cameraService', 'systemInfoCacheFactory'];
    playerInfo: PlayerInfo;
    alarmInfo: AlarmResultInfo;
    videoOcx: IVideoOcxControlFunc;
    isShowOcxPlayer: boolean = false;

    private notifyFunc: (res: ResponseResult<any>) => ResponseResult<any>;

    constructor(private $scope: any, private $timeout: any, private $http: Function, private notifyFactory: IResponseNotifyFactory, private cameraService: ICameraService, private systemInfoCacheFactory: ISystemInfoCacheProvider) {

        this.playerInfo = this.$scope.PointDeTail;
        if(!this.playerInfo.data&&!this.$scope.PointDeTail.time){
            return
        }
        this.playerInfo.data.time = this.$scope.PointDeTail.time;
        this.alarmInfo = this.$scope.alarmInfo;
        this.$scope.$on("$destroy", () => {
            this.videoOcx = null;
        });
        this.notifyFunc = this.notifyFactory.msg({ onlySuccess: true });
    }

    initComplete(ocxControlFunc: IVideoOcxControlFunc) {
        this.videoOcx = ocxControlFunc;
        this.initPlayer();
    }

    // 初始化播放参数
    private initPlayer(){
        if (this.playerInfo.status && this.playerInfo.type){
            if (this.playerInfo.type==1){
                window.setTimeout(() => { this.playRealTime(this.playerInfo) }, 0);
            }
            if(this.playerInfo.type==2){
                window.setTimeout(() => { this.playPvgBack(this.playerInfo) }, 0);
            }
        }else{
            console.log("未检测到播放指令参数");
        }
    }

    // 格式化OCX可用的播放时间
    private formatTime(time:string,timeSlot?:number) :string {
        if(!time){
            return '';
        }
        let data = new Date(time);
        if (timeSlot){
            data = new Date(data.getTime() + timeSlot*1000);
        }
        let year=data.getFullYear(),
            month = data.getMonth() >= 9 ? (data.getMonth() + 1).toString() : '0' + (data.getMonth() + 1),
            day = data.getDate() > 9 ? data.getDate().toString() : '0' + data.getDate(),
            hours = data.getHours() > 9 ? data.getHours().toString() : '0' + data.getHours(),
            minutes = data.getMinutes() > 9 ? data.getMinutes().toString() : '0' + data.getMinutes(),
            ss = data.getSeconds() > 9 ? data.getSeconds().toString() : '0' + data.getSeconds();
        return year +  month +  day +  hours +  minutes +  ss + '000';
    }

    //播放历史视屏
    private playPvgBack(data:any) {
        this.isShowOcxPlayer = true;
        // 过滤
        if(!data.time){
            return
        }
        if (this.videoOcx) {
            // 获取历史播放起始时间
            let timeSlotBegin: number = -30;
            let timeSlotAfter: number = 30;
            // 初始化系统配置
            let systemData: SystemConfigParams = this.systemInfoCacheFactory.getSystemInfo();
            timeSlotBegin = 0 - systemData.videoBeforeTime;
            timeSlotAfter = systemData.videoAfterTime*1;
            // 格式化OCX播放参数
            let opts = new VideoOcxPvgBackOpt();
            opts.ip = data.IpAddress;
            opts.port = data.Port;
            opts.path = data.PlayName;
            opts.user = data.Uid;
            opts.passwd = data.Pwd;
            opts.displayModel = this.playerInfo.displayModel || 0;
            opts.hwdecoder = this.playerInfo.hwdecoder || 0;
            opts.beginTime = this.formatTime(data.time, timeSlotBegin);
            opts.endTime = this.formatTime(data.time, timeSlotAfter);
            // 传入OCX参数，开始播放
            console.log(opts,'history video play init');
            this.videoOcx.playPvgBack(opts, this.videoOcx.getFocusWindowIndex());
        }
    }

    // 播放实时
    private playRealTime(data: any) {
        this.isShowOcxPlayer = true;
        if (this.videoOcx) {
            console.log(this.videoOcx.getFocusWindowIndex(), this.videoOcx);
            let opts = new VideoOcxRealTimeOpt();
            opts.ip = data.data.IpAddress;
            opts.port = data.data.Port;
            opts.path = data.data.PlayName;
            opts.user = data.data.Uid;
            opts.passwd = data.data.Pwd;
            console.log(opts, 'real video play init');
            this.videoOcx.playRealTime(opts, this.videoOcx.getFocusWindowIndex());
        }
    }

    // 终止播放 销毁播放窗体
    stop() {
        if (this.videoOcx) {
            this.videoOcx.stop(this.videoOcx.getFocusWindowIndex());
        }
    }

}

app.controller("videoMapPointController", VideoMapPointController);