/**
 * Created by dell on 2017/6/23.
 */

import {app} from "../../common/app/main.app";
import {IVideoOcxControlFunc} from "../../common/directive/ocx/video.ocx.directive";
import {VideoOcxRtspOpt} from "../../common/directive/ocx/video.ocx.directive";
import  "../dynamicControl.cache.factory";
import {IDynamicControlCacheFactory} from "../dynamicControl.cache.factory";

class AlarmVideoController {

    //关闭弹窗
    closeWindow : Function;
    //跳转到视屏窗口浏览
    stateToVideoLayout : Function;
    //目标跟随开关 开关状态
    targetSwitch : Function;
    switchIsOff : Boolean = true;

    //OCX
    videoOcx: IVideoOcxControlFunc;
    //OCX初始化
    initComplete : Function = (ocxControlFunc: IVideoOcxControlFunc) => {
        console.log("ocx初始化完成", ocxControlFunc);
        this.videoOcx = ocxControlFunc;

        this.playRtsp();
    };
    //播放
    playRtsp : Function = () => {
        if(this.videoOcx){
            let opts = new VideoOcxRtspOpt();
            opts.url = "rtsp://10.0.10.200:8557/H264";
            setTimeout(()=>{
                this.videoOcx.playRtsp(opts, 0);
            },20);
        }
    };
    //关闭所有
    stopAll : Function = ()=>{
        if(this.videoOcx){
            this.videoOcx.stopAll();
        }
    }


    static $inject = ['$scope' ,'layer','dynamicControlCacheFactory','$timeout'];

    constructor($scope : any ,layer : any ,private dynamicControlCacheFactory:IDynamicControlCacheFactory,$timeout:any){
        let vm = this;

        //关窗弹窗
        vm.closeWindow = () => {
            //关闭视频
            vm.stopAll();
            //销毁OCX
            vm.videoOcx = null;
            //关闭弹窗
            layer.closeAll();
        };

        //跳转到视屏窗口浏览
        vm.stateToVideoLayout = () => {
            //关闭视频 关窗口
            vm.closeWindow();
            //切换列表模式窗格视频
           vm.dynamicControlCacheFactory.updateBtnParams(false);
        };

        //OCX 销毁
        $scope.$on('$destory' ,() => {
            vm.videoOcx = null;
        });

        //开关按钮
        vm.targetSwitch = () => {
            vm.switchIsOff = !vm.switchIsOff;
        };

        console.log($scope.data);
    };


}

app.controller('alarmVideoController' , AlarmVideoController);