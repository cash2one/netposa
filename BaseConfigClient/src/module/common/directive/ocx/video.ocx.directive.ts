/// <reference path="video.ocx.model.ts" />
import {app} from "../../app/main.app";
import "./video.ocx.model";
import * as Ocx from "./video.ocx.model";
import IVideoOcx = Ocx.IVideoOcx;
import {ICatchPictureResult} from "./video.ocx.model";
import {IVideoOcxFactory} from "./video.ocx.model";
import {IVideoOcxTool} from "./video.ocx.model";
import {VideoOcxAttr} from "./video.ocx.model";

// 这里使用_VideoOcxDirective是由于此指令中声明的一些方法会和IVideoOcx相同, 所以就用这种方式来保持一致
// 此指令通过init-complete标签回调主动操作ocx的方法IVideoOcxControlFunc

interface _VideoOcxDirective {
    init: (dom: Document) => void;

    destroy(): void;

    checkOcx(): void;

    playRealTime(options: VideoOcxRealTimeOpt, index?: number): boolean;

    playRtsp(options: VideoOcxRtspOpt, index: number): boolean;

    playRtspMultiple(options: VideoOcxRtspMultipleOpt): boolean;

    playPvgBack(options: VideoOcxPvgBackOpt, index: number): boolean;

    stop(index: number): void;

    stopAll(): void;

    setLayout(layoutType: number): void;

    // 销毁控件
    destroy(): void;

    getFocusWindowIndex(): number;

    catchPicture(): ICatchPictureResult;

    getWindowBusyByIndex(index: number): boolean;

    ocxControlFunc: IVideoOcxControlFunc;

    // 用于清空指令中的一些资源用
    clean(): void;

    catchPictrue(index: number): string;

    getVideoAttribute(index: number): VideoOcxAttr;
}

export class VideoOcxRealTimeOpt extends Ocx.RealTimeOpt {
    constructor() {
        super();
    }
}

export class VideoOcxRtspOpt extends Ocx.RtspOpt {
    constructor() {
        super();
    }
}

export class VideoOcxRtspMultipleOpt extends Ocx.RtspMultipleOpt {
    constructor() {
        super();
    }
}

export class VideoOcxPvgBackOpt extends Ocx.PlayBackOpt {
    constructor() {
        super();
    }
}

/**
 * controller可以主动操作指令的方法
 */
export interface IVideoOcxControlFunc {
    // 播放实时视频
    playRealTime(options: VideoOcxRealTimeOpt, index?: number): boolean;

    // 播放rtsp
    playRtsp(options: VideoOcxRtspOpt, index: number): boolean;

    // 播放rtsp多路视频
    playRtspMultiple(options: VideoOcxRtspMultipleOpt): boolean;

    // 播放pvg历史视频
    playPvgBack(options: VideoOcxPvgBackOpt, index: number): boolean;

    // 设置窗格 1,4,9,16,41 (1:1x1 4:2x2 9:3x3 16:4x4 41:4x1)可用参数
    setLayout(layerType: number): void;

    // 停止所有视频
    stopAll(): void;

    // 停止单个视频 stop
    stop(index: number): void;

    // 获得焦点的index
    getFocusWindowIndex(): number;

    catchPicture(): ICatchPictureResult;

    getWindowBusyByIndex(index: number): boolean;

    catchPictrue(index: number): string;

    getVideoAttribute(index: number): VideoOcxAttr

    // 后续还有主动双击全屏, 创建工具条, 抓图, 获取当前本机允许打开的视频路数最大值--->,
    // --->获取当前本机已经打开的视频路数, 获取ocx控件中视频窗格数量, 播放录像等待添加, 如有需要联系wyr
}

class VideoOcxDirective {

    static $inject = ['$scope', 'videoOcxFactory', 'videoOcxTool'];

    constructor() {
    }

    static instance = function () {
        return new VideoOcxDirective();
    };

    scope = {
        initComplete: "&",
        dbclickCallback: '&' // {index: index}
    };

    initComplete: Function;
    dbclickCallback: Function;
    $on: Function;
    clean: Function;

    restrict = "A";
    controllerAs = 'videoOcxDirect';
    controller = function ($scope: VideoOcxDirective, videoOcxFactory: IVideoOcxFactory, videoOcxTool: IVideoOcxTool) {

        let videoOcx: IVideoOcx;
        let vm: _VideoOcxDirective = this;
        vm.init = function (dom: Document) {
            videoOcx = videoOcxFactory.getVideoOcx(dom);
            // 绑定ocx点击事件
            videoOcx.bindOcxEvent("WndDClik", (index: number) => {
                $scope.dbclickCallback({index: index});
            })
        };

        vm.checkOcx = function () {
            videoOcxTool.checkOcx();
        };

        vm.playRealTime = function (options: VideoOcxRealTimeOpt, index?: number) {
            return (videoOcx.playRealTime(options, index) === 0) ? true : false;
        };

        vm.playRtsp = function (options: VideoOcxRtspOpt, index: number) {
            return (videoOcx.playRtsp(options, index) === 0) ? true : false;
        };

        vm.playRtspMultiple = function (options: VideoOcxRtspMultipleOpt) {
            return (videoOcx.playRtspMultiple(options) === 0) ? true : false;
        };

        vm.setLayout = function (layoutType: number) {
            videoOcx.setLayout(layoutType);
        };

        vm.stopAll = function () {
            videoOcx.stopAll();
        };

        vm.stop = function (index: number) {
            videoOcx.stop(index);
        };

        vm.destroy = function () {
            videoOcx.destroy();
        };

        vm.getFocusWindowIndex = function () {
            return videoOcx.getFocusWindowIndex();
        };

        vm.catchPicture = function () {
            return videoOcx.catchPicture();
        };

        vm.playPvgBack = function (options: VideoOcxPvgBackOpt, index: number) {
            return (videoOcx.playPvgBack(options, index) === 0) ? true : false;
        };

        vm.getWindowBusyByIndex = function (index: number): boolean {
            return videoOcx.GetWindowBusyByIndex(index || 0);
        };

        vm.clean = function () {
            videoOcx = null as any;
            $scope = null as any;
        }

        vm.catchPictrue = function (index: number) {
            return videoOcx.CatchPictrue(index);
        }
        vm.getVideoAttribute = function (index: number): VideoOcxAttr {
            return videoOcx.GetVideoAttribute(index);
        }

    };
    link = function (scope: VideoOcxDirective, iElement: any, iAttrs: any, controller: _VideoOcxDirective) {

        let vm = controller;
        // 指令初始化后先检查ocx控件是否可用

        // 初始化Ocx指令
        vm.init(iElement[0]);
        vm.checkOcx();
        scope.$on("$destroy", () => {
            console.error("自动销毁");
            // 销毁一些资源
            vm.ocxControlFunc = null;
            vm.playRealTime = null;
            vm.playRtsp = null;
            vm.playRtspMultiple = null;
            vm.playPvgBack = null;
            vm.destroy();
            vm.clean();
        });

        vm.ocxControlFunc = {
            playRealTime: vm.playRealTime, // 播放实时
            playRtsp: vm.playRtsp, // 播放Rtsp视频
            playRtspMultiple: vm.playRtspMultiple, // 播放rtsp多路视频
            playPvgBack: vm.playPvgBack, // 播放pvg历史视频
            setLayout: vm.setLayout,
            stop: vm.stop,
            stopAll: vm.stopAll,
            getFocusWindowIndex: vm.getFocusWindowIndex,
            catchPicture: vm.catchPicture,
            getWindowBusyByIndex: vm.getWindowBusyByIndex,
            catchPictrue: vm.catchPictrue,
            getVideoAttribute: vm.getVideoAttribute
        };

        // 将dom所有主动控制ocx控件的方法都作为回调函数一次性返回给调用方
        scope.initComplete({ocxControlFunc: vm.ocxControlFunc});

    }

}

app.directive("videoOcx", VideoOcxDirective.instance);