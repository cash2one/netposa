import {app} from "../../common/app/main.app";
import "css!./ocx.css";
import {
    IVideoOcxControlFunc, VideoOcxRealTimeOpt,
    VideoOcxRtspOpt, VideoOcxRtspMultipleOpt
} from "../../common/directive/ocx/video.ocx.directive";
declare let layer:any;
class OcxController{
    static $inject = ["$scope"];

    videoOcx: IVideoOcxControlFunc;

    constructor(private $scope: any){
        let vm = this;

        $scope.$on("$destroy", ()=>{
            this.videoOcx = null;
        });
    }

    initComplete = (ocxControlFunc: IVideoOcxControlFunc)=>{
        console.log("ocx初始化完成", ocxControlFunc);
        this.videoOcx = ocxControlFunc;
    }

    playRealTime = ()=>{
        // 使用前判空
        if(this.videoOcx){
            let opts = new VideoOcxRealTimeOpt();
            opts.ip = "192.168.160.151";
            opts.port = 2100;
            opts.path = "av/1/1";
            opts.user = "admin";
            opts.passwd = "admin";
            this.videoOcx.playRealTime(opts, this.videoOcx.getFocusWindowIndex());
        }
    }

    playRtsp = ()=>{
        if(this.videoOcx){
            let opts = new VideoOcxRtspOpt();
            opts.url = "rtsp://10.0.10.200:8557/H264";
            this.videoOcx.playRtsp(opts, 0);
        }
    }
    getPhoto () {
        if (this.videoOcx) {
            console.log(this.videoOcx.catchPictrue(0))
        }
    }

    playRtspMultiple = ()=>{
        if(this.videoOcx){
            let opts = new VideoOcxRtspMultipleOpt();
            opts.url = "SSN://172.17.3.78:5555/?id=PVG://172.17.3.39:2100/?user=admin&pwd=admin&avpath=av/25";
            this.videoOcx.playRtspMultiple(opts);
        }
    }

    pause = ()=>{
        layer.msg("暂未实现");
    };

    stop = ()=>{
        if(this.videoOcx){
            this.videoOcx.stop(this.videoOcx.getFocusWindowIndex());
        }

    }

    stopAll = ()=>{
        if(this.videoOcx){
            this.videoOcx.stopAll();
        }
    }

    changeLayoutType = (layoutType: number)=>{
        if(this.videoOcx){
            this.videoOcx.setLayout(layoutType);
        }
    }

}

app.controller("technologyStackOcxController", OcxController);