import PortraitTool from "../../portrait-tool";
import "json2";
import {app} from "../../app/main.app";
declare let angular: any;
declare let window: any;
declare let require: any;
declare let layer: any;

let JSON = require("json2");

// ocx实例本身允许的功能(videoOcx指令定义用, 业务模块不使用)
export interface IVideoOcx {
    /**
     * 播放实时视频
     * @param options
     * @param index
     * @return 0为正常 其他数字为错误
     */
    playRealTime(options: RealTimeOpt, index?: number): number;
    /**
     * 播放rtsp
     * @param options
     * @param index
     * @return 0为正常 其他数字为错误
     */
    playRtsp(options: RtspOpt, index?: number): number;
    /**
     * 播放rtsp多路视频
     * @param options
     * @return 0为正常 其他数字为错误
     */
    playRtspMultiple(options: RtspMultipleOpt): number;
    /**
     * 播放历史视频
     * @param options
     * @param index
     * @return 0为正常 其他数字为错误
     */
    playPvgBack(options: PlayBackOpt, index?: number): number;
    // 停止 按照index
    stop(index: number): void; // 关闭指定窗口, index从0开始
    stopAll():void; // 关闭所有视频
    // 销毁控件
    destroy(): void;
    setLayout(layerType: number): void;
    getFocusWindowIndex():number;
    // 截图, 默认jpg格式
    catchPicture(): ICatchPictureResult;
    CatchPictrue(index: number): string;
    GetVideoAttribute(index: number):VideoOcxAttr;
    /**
     * 获取当前窗口的空闲状态
     * @param index
     * @constructor
     */
    GetWindowBusyByIndex(index: number): boolean;

    bindOcxEvent(eventName: string, func: Function): void;
}

interface OcxControl {
    IsControlFullScreen(): boolean;
    RestoreControlScreenShow(): void;
    SetControlFullScreen(): void;
    GetWindowCount(): number;
    PlayEx2: (path: string, index: number, playCallBack: (index: number, result: number, userParam: any)=>void, userPlayParam: any,
              // 第一帧回调函数
              displayFirstFrameCallBack: (index: number, result: number, userParam: any)=>void, userDisplayFirstFrameParam: any,
              // 播放录像结束时回调函数
              pRecordEndCallBack: (index: number, result: number, userParam: any)=>void, recordEndParam: any
    )=>number;
    StopEx: Function;
    // 清除控件
    CleanUp: ()=>void;
    SetLayout(layerType: number): void;
    GetFocusWindowIndex():number;
    // picType:图片的截取类型1:bmp 2:gif 3:jpg 4:png
    CatchPictrue(index: number, picType: number): string;
    GetVideoAttribute(index: number): IVideoSize;
    CreateToolBar(strInfo: string, index: number): number;
    SetCallBack(funcName: string, func: Function): number;
    SetWndOsdProperty(color: any, lineWidth: number, fillColor: any, index: number):any;
    /**
     * 启用数字放大
     * @param type
     * @param index
     * @constructor
     */
    StartZoomByIndex(type: number, index: number): boolean;
    /**
     * 停止数字放大
     * @param index
     * @constructor
     */
    StopZoomByIndex(index: number): boolean;
    /**
     * 下载图片缓存到ocx中, 用于加载ocx控件中的图标
     * @param path
     * @constructor
     * @return OK / ERROR
     */
    DownLoadImage(path: string): string;
    /**
     * 获取错误码
     */
    GetLastError():string;
    /**
     * 设置进度条的范围
     * @param totalTime　总时间
     * @param key 进度条的可以
     * @param index 窗格位置
     * @return 0 或者 错误码
     */
    SetProgressRange(key: number, totalTime: number, index: number): number;
    /**
     * 设置进度条的位置
     * @param key
     * @param currentTime
     * @param index
     * @constructor
     * @return 0 或者错误码
     */
    SetProgressPos(key: number, currentTime: number, index: number): number;

    /**
     * 设置动作条的信息
     * @param key
     * @param strInfo
     * @param index
     * @constructor
     */
    SetContent(key: number, strInfo: string, index: number): number;
    /**
     * 获取当前控件正在播放的时间
     * @param index
     * @constructor
     * @return 大于等于0 表示正常, 小于0表示错误码
     */
    GetPlayTime(index: number):number;
    /**
     * 显示或隐藏当前窗口的工具条
     * @param bShow
     * @param index
     * @constructor
     */
    ShowToolBar(bShow: boolean, index: number):void;

    /**
     * 设置工具条的使能
     * @param strInfo
     * @param index
     * @constructor
     */
    ShowAndEnable(strInfo: string, index: number): number;

    /**
     * 获取当前窗口的空闲状态
     * @param index
     * @constructor
     * @return true/false 忙碌/空闲
     */
    GetWindowBusyByIndex(index: number): boolean;

    GetVideoAttribute(index: number):VideoOcxAttr;
    CatchPictrue(index: number, type: number): string;
}
export interface VideoOcxAttr {
    videoType: number,
    width: number,
    height: number,
    duration: number,
}
/**
 * 工具条方法名枚举
 * @type {{PLAY: string; PAUSE: string; STOP: string}}
 */
const ToolBarFuncNameEnum = {
    PLAY: "play",
    PAUSE: "pause",
    STOP: "stop",
    DIGITAL: "digital"
};

/**
 * 工具条文字枚举
 * @type {{}}
 */
const ToolBarTextEnum = {
    PLAY: "FDS_00_07_31",
    PAUSE: "FDS_00_07_32",
    STOP: "FDS_00_07_33",
    DIGITAL: "FDS_00_07_34"
};

/**
 * 动作条bar
 */
class ToolBarItem{
    constructor(){}
    type = "button";
    style = "left-bottom";
    key: number;
    show = true;
    x = "0";
    y = "0";
    width = "40px";
    height = "100%";
    backColor = "0xffc800";
    text: string; // 必填
    textColor = "0x000000";
    font = "宋体";
    fontSize = 12;
    tooltip: string; // 必填
    enable = true;
    function = "returnFunc";

    adjustwidth: boolean;
    picture: {[key:string]:string};
}

class ToolBarContainer{
    constructor(){}
    type = "panel";
    style = "left-bottom";
    key = 0;
    x = "0";
    y = "0";
    width = "100%";
    height = "25px";
    backColor = "0x242424";
    transparent = "0.8";
    animateTime = "1000";  //毫秒值
    show = true;
    items = new Array<ToolBarItem>();
}

/**
 * 由于存在初始化
 * 此参数一定要用new RtspMultipleOpt()来创建
 */
export class RtspMultipleOpt {
    type: number = 10; // 此值固定不变
    url: string;
    user: string = "";
    password: string = "";
    tcp: boolean = false;
    autoreconncet: boolean = false;
    displayModel: number = 0; // 非必填, 0为普通模式，不支持布防布控画图功能； 1为布防布控模式，不支持放大、颜色设置等；无此项，则按普通模式进行；
    hwdecoder: number = 0;

    constructor() {
    }
}

/**
 * 由于存在初始化
 * 此参数一定要用new RtspOpt()来创建
 */
export class RtspOpt {
    type: number = 6; // 此值固定不变
    url: string; // 必填, 由调用方主动指定
    user: string = "";
    password: string = "";
    tcp: boolean = false;
    autoreconncet: boolean = false;
    displayModel: number = 0; // 非必填, 0为普通模式，不支持布防布控画图功能； 1为布防布控模式，不支持放大、颜色设置等；无此项，则按普通模式进行；
    hwdecoder: number = 0;

    constructor() {
    }
}

/**
 * 由于存在初始化
 * 此参数一定要用new RealTimeOpt()来创建
 */
export class RealTimeOpt {
    private readonly type: number = 1; // 此值固定不变, 不能被修改
    path: string; // 必填,由调用方主动指定
    user: string = "";// 非必填
    passwd: string = "";// 非必填
    ip: string; // 必填,由调用方主动指定
    port: number; // 必填, 由调用方主动指定
    displayModel: number = 0; // 非必填, 0为普通模式，不支持布防布控画图功能； 1为布防布控模式，不支持放大、颜色设置等；无此项，则按普通模式进行；
    hwdecoder: number = 0; // 非必填

    constructor() {
    }
}
/**
 * 播放历史视频参数
 */
export class PlayBackOpt{
    private readonly type: number = 2; // 此值固定不变, 不能被修改
    path: string; // 必填, 由调用方主动指定
    user: string = ""; // 非必填
    passwd: string = ""; // 非必填
    ip: string; // 必填, 由调用方主动指定
    port: number; // 必填, 由调用方主动指定
    displayModel: number = 0; // 非必填, 0为普通模式，不支持布防布控画图功能； 1为布防布控模式，不支持放大、颜色设置等；无此项，则按普通模式进行；
    hwdecoder: number = 0; // 非必填

    // 录像专用参数
    beginTime: string; // 必填项, 示例20120101132000000 即yyyyMMddhhmmssSSS
    endTime: string; // 必填项, 示例20120101152000000 即yyyyMMddhhmmssSSS
}

export interface IVideoSize{
    videoType: number;
    width: number; // 视频源本身的宽度
    height: number; // 视频源本身的高度
    duration: number; // 视频源的长度 时间戳 只在录像回放时起作用
}
export interface ICatchPictureResult{
    base64Image: string;
    videoSize: IVideoSize;
}

/*------------------------------工具条对象--------------------------------------*/
/**
 * 摄像机时间刻度工具model
 * 用来随时间对录像回放的时间刻度进行变更
 */
class PlayVideoToolModel{

    private intervalTime = 1000;
    private currentInterval: any;
    private totalTime: number;

    constructor(private ocx: OcxControl,
                private index: number,
                private toolBarContaienr: ToolBarContainer,
                private currentTimeToolBar: ToolBarItem,
                private totalTimeToolItem: ToolBarItem,
                private startTime: number,
                private endTime: number){
    }

    /**
     * 启动动作条播放刻度显示
     */
    start(){
        this.stop();
        this.currentInterval = setInterval(()=>{
            console.debug("执行循环");
            this.setCurrentPlayTime();
            this.setTotalPlayTime();
        }, this.intervalTime);
    }

    getIndex(){
        return this.index;
    }

    /**
     * 设置窗格的index, 当窗格变动时触发
     * @param index
     */
    setIndex(index: number){
        this.index = index;
    }

    /**
     * 开始设置播放时间
     */
    private setCurrentPlayTime(){
        let time = this.getCurrentPlayTime(this.index);
        if(time == null) return;
        try{
            this.ocx.SetContent(this.currentTimeToolBar.key, this.getTimeStr(time/1000), this.index);
        }catch(e){
            if(window.console){
                console.error("ocx.SetContent error: ", e);
            }
        }
    }

    private setTotalPlayTime(){
        this.totalTime = this.getTotalTime(this.index);
        try{
            this.ocx.SetContent(this.totalTimeToolItem.key, this.getTimeStr(this.totalTime/1000), this.index);
        }catch(e){
            if(window.console){
                console.error("ocx.SetContent error: ", e);
            }
        }

    }

    private getCurrentPlayTime(index: number): number{
        try{
            return this.ocx.GetPlayTime(index);
        }catch(e){
            console.error("ocx.GetPlayTime error:", e);
        }
    }

    /**
     *
     * @param index
     * @return {number}
     */
    private getTotalTime(index: number): number{
        let result: IVideoSize;
        try{
            result = JSON.parse(this.ocx.GetVideoAttribute(index));
        }catch(e){
            if(window.console){
                console.error("GetVideoAttribute", e);
            }
        }
        return (result && result.duration) || 0;
    }

    /**
     * 根据当前时间戳获取时分秒
     * 格式为 00:00:00
     */
    private getTimeStr(time: number){
        return (this.toStr(Math.floor(time/3600))+":"+this.toStr(Math.floor((time%3600)/60))+":"+this.toStr(Math.floor(time % 60)));
    }

    /**
     * 将字符串自动补全0
     */
    private toStr(i: number): string{
        return (i<10) ? ("0" + i) : (i + "");
    }

    /**
     * 播放结束, 停止interval
     */
    stop(){
        if(this.currentInterval){
            clearInterval(this.currentInterval);
        }
        this.currentInterval = null;
    }

    hide(){
        this.stop();
        this._toggle(false);
    }

    show(){
        this._toggle(true);
    }

    /**
     * 由于工具条创建以后无法主动调用api销毁, 所以为了避免重复创建, 故增加此方法, 在stop窗口之前隐藏工具条
     * 当再次在此窗口上播放时, 再显示此工具条
     */
    _toggle(bShow: boolean){
        let str = {
            key: this.toolBarContaienr.key,
            show: bShow,
            enable: bShow,
            status: 0
        };
        try{
            this.ocx.ShowAndEnable(JSON.stringify(str), this.index);
        }catch(e){
            if(window.console){
                console.error("ocx.showToolBar error: ", e);
            }
        }
    }


    clear(){
        this.stop();
        this.currentTimeToolBar = null as any;
        this.totalTimeToolItem = null as any;
        this.toolBarContaienr = null as any;
        this.index = null as any;
        this.ocx = null as any;
    }
}

/*-----------------------ocx实体----------------------------------*/

/**
 * ocx控件实例
 */
class VideoOcx implements IVideoOcx {

    private ocxId: string;
    private containerDom: Document;
    private ocx: OcxControl;
    private videoSize: IVideoSize;
    private i18nFactory: any;
    private _cacheWindowDigitalStatus = {} as {[key:string]:boolean};
    // private _currentPlayVideoToolModel:PlayVideoToolModel;
    private _cachePlayVideoToolModel = {} as {[key: string]: PlayVideoToolModel};

    private dbClickCallBack: Function;

    /**
     * 当前工具条key计数, 每生成一个工具条加1
     * @type {number}
     */
    private currentKey = 0;

    constructor(containerDom: Document, i18nFactory: any) {
        this.ocxId = PortraitTool.getUUID();
        this.containerDom = containerDom;
        this.i18nFactory = i18nFactory;
        this._init();
    }
    private _CatchPictrue(index: number): string {
        let result: string;
        try {
            result = this.ocx.CatchPictrue(index, 3)
        } catch (e) {
            console.log(`截图失败${e}`)
        }
        return result
    }

    CatchPictrue(index: number) {
        if (index <= this._getWindowCount()) {
            return this._CatchPictrue(index);
        }
    }

    GetVideoAttribute(index: number) :VideoOcxAttr{
        try {
            return JSON.parse(this.ocx.GetVideoAttribute(index))
        } catch (e) {
            console.log(`获取失败`)
        }
    }

    bindOcxEvent(eventName: string, func: Function): void {
        switch(eventName){
            case "WndDClik":
                this.dbClickCallBack = func;
                break;
        }
    }
    GetWindowBusyByIndex(index: number): boolean {
        let result = true;
        try{
            result = this.ocx.GetWindowBusyByIndex(index);
        }catch(e){
            if(window.console){
                console.error("ocx.GetWindowBusyByIndex error:", e);
            }
        }
        return result;
    }
    catchPicture(): ICatchPictureResult {
        try{
            let index = this.ocx.GetFocusWindowIndex()||0;
            let picType = 3;
            // 这里ocx控件本身的截图名字写错了
            return {base64Image: this.ocx.CatchPictrue(index, picType), videoSize: this.videoSize || {}} as ICatchPictureResult;
        }catch(e){
            console.error("ocx.CatchPictrue",e);
        }
        // 若抛异常则进入这边
        return null;
    }
    getFocusWindowIndex(): number {
        return this._getFocusWindowIndex();
    }
    /**
     * 设置布局
     * @param 输入,布局编号 1:1x1 4:2x2 9:3x3 16:4x4 41:4x1
     */
    setLayout(layoutType: number): void {
        try{
            this.ocx && this.ocx.SetLayout(layoutType);
        }catch(e){
            console.error("ocx.setLayout",e);
        }
    };
    destroy(): void {

        this.i18nFactory = null;
        this.stopAll();
        this._cleanUp();
        this._clearAllOtherResource();
        // 消除ocx的dom元素
        angular.element(this.containerDom).empty();
        this.ocxId = null;
        this.containerDom = null;
        delete this.ocx;
        this.ocx = null;
    }


    private _cleanUp(): void {
        try {
            this.ocx.CleanUp();
        } catch (e) {
            console.error("ocx.cleanUp error:", e, e && e.message);
        }
    }

    private _getFocusWindowIndex(){
        let result = 0;
        try{
            result = this.ocx?this.ocx.GetFocusWindowIndex():0;
        }catch(e){
            console.error("ocx.getFocusWindowIndex",e);
        }
        return result;
    }

    public getOcxId() {
        return this.ocxId;
    }

    public playRealTime(options: RealTimeOpt, index: number) {
        if (!options) return;
        // 放之前先关闭
        this.stop(index || 0);
        return this._play(JSON.stringify(options), index || 0);
    }

    /**
     * 播放rtsp单路视频
     * @param options
     * @param index
     */
    public playRtsp(options: RtspOpt, index: number) {
        if (!options) return;
        // 放之前先关闭
        this.stop(index || 0);
        return this._play(JSON.stringify(options), index || 0);
    }

    /**
     * 播放rtsp多路窗格视频
     */
    public playRtspMultiple(options: RtspMultipleOpt) {
        if (!options) return;
        // 强制转换为4分格
        this.setLayout(4);
        this.stopAll();
        return this._play(JSON.stringify(options), 0);
    }

    /**
     * 播放历史视频
     * @param options
     * @param index
     * @return {number}
     */
    public playPvgBack(options: PlayBackOpt, index: number){
        if(!options) return;
        // 放之前先关闭
        this.stop(index || 0);
        let result =  this._play(JSON.stringify(options), index || 0);
        this.initPlayPvgToolBar(index, options.beginTime, options.endTime);
        return result;
    }

    /**
     * 初始化录像回放工具条
     * 只有在播放录像时候启用
     */
    private initPlayPvgToolBar(index: number, startTime: string, endTime: string){
        let container, toolItem;

        let currentIndex = index || 0;

        // 还原当前窗口的数字放大状态
        if(this._cacheWindowDigitalStatus[currentIndex]){
            delete this._cacheWindowDigitalStatus[currentIndex];
        }

        // 如果当前有缓存的index, 则不在创建工具条
        if(this._cachePlayVideoToolModel[currentIndex]){
            this._cachePlayVideoToolModel[currentIndex].show();
            this._cachePlayVideoToolModel[currentIndex].start();
            return;
        }

        container = new ToolBarContainer();
        container.key = this.currentKey++;

        toolItem = new ToolBarItem();
        toolItem.text = this.i18nFactory(ToolBarTextEnum.PLAY);
        toolItem.tooltip = this.i18nFactory(ToolBarTextEnum.PLAY);
        toolItem.function = ToolBarFuncNameEnum.PLAY;
        toolItem.key = this.currentKey++;
        toolItem.x = "40px";

        container.items.push(toolItem);

        toolItem = new ToolBarItem();
        toolItem.text = this.i18nFactory(ToolBarTextEnum.PAUSE);
        toolItem.tooltip = this.i18nFactory(ToolBarTextEnum.PAUSE);
        toolItem.function = ToolBarFuncNameEnum.PAUSE;
        toolItem.key = this.currentKey++;
        toolItem.x = "80px";
        container.items.push(toolItem);

        toolItem = new ToolBarItem();
        toolItem.text = this.i18nFactory(ToolBarTextEnum.DIGITAL);
        toolItem.tooltip = this.i18nFactory(ToolBarTextEnum.DIGITAL);
        toolItem.function = ToolBarFuncNameEnum.DIGITAL;
        toolItem.key = this.currentKey++;
        toolItem.x = "120px";
        toolItem.width = "60px";
        container.items.push(toolItem);

        let currentTimeToolItem = new ToolBarItem();
        currentTimeToolItem.type = "static";
        currentTimeToolItem.key = this.currentKey++;
        currentTimeToolItem.style="right-bottom";
        currentTimeToolItem.text="00:00:00";
        currentTimeToolItem.x = "60";
        currentTimeToolItem.y = "-5";
        currentTimeToolItem.width = "60px";
        currentTimeToolItem.textColor = "0xffffff";
        currentTimeToolItem.fontSize = 14;
        container.items.push(currentTimeToolItem);

        let totalTimeToolItem = new ToolBarItem();
        totalTimeToolItem.type = "static";
        totalTimeToolItem.key = this.currentKey++;
        totalTimeToolItem.style="right-bottom";
        totalTimeToolItem.text="00:00:00";
        totalTimeToolItem.x = "0";
        totalTimeToolItem.y = "-5";
        totalTimeToolItem.width = "60px";
        totalTimeToolItem.textColor = "0xffffff";
        totalTimeToolItem.fontSize = 14;
        container.items.push(totalTimeToolItem);

        // 创建工具条
        let result = this.createToolBar(JSON.stringify(container), currentIndex);
        // 绑定工具条中的事件
        this.setToolbarCallBack(ToolBarFuncNameEnum.PLAY, this.toolbarPauseFalse.bind(this));
        this.setToolbarCallBack(ToolBarFuncNameEnum.PAUSE, this.toolbarPauseTrue.bind(this));
        this.setToolbarCallBack(ToolBarFuncNameEnum.DIGITAL, this.toolbarDigitalZoom.bind(this));

        // let currentPlayVideoToolModel = this._cachePlayVideoToolModel[currentIndex];
        // if(currentPlayVideoToolModel != null){
        //     currentPlayVideoToolModel.clear();
        // }
        let currentPlayVideoToolModel = new PlayVideoToolModel(this.ocx,currentIndex, container, currentTimeToolItem, totalTimeToolItem, this.convertTime2Date(startTime).getTime(), this.convertTime2Date(endTime).getTime());
        this._cachePlayVideoToolModel[currentIndex] = currentPlayVideoToolModel;
        // 在工具条中展示当前播放时间刻度
        currentPlayVideoToolModel.start();
    }

    private convertTime2Date(str: string){
        // 将yyyyMMddhhmmssSSS的格式转换成Date类型
        return new Date(
            parseInt(str.substring(0,4),10),
            parseInt(str.substring(4,6),10) - 1, // month减一
            parseInt(str.substring(6,8),10),
            parseInt(str.substring(8,10),10),
            parseInt(str.substring(10,12),10),
            parseInt(str.substring(12,14),10),
            parseInt(str.substring(14,17),10));
    }

    private setProgressRange(key: number, totalTime: number, index: number){
        try{
            return this.ocx.SetProgressRange(key, totalTime, index);
        }catch(e){
            if(window.console){
                console.error("ocx.SetProgressRange error: ", e);
            }
        }
    }

    private setProgressPos(key: number, currentTime: number, index: number){
        try{
            return this.ocx.SetProgressPos(key, currentTime, index);
        }catch(e){
            if(window.console){
                console.error("ocx.setProgressPos error: ", e);
            }
        }
    }

    private toolbarPauseFalse(strinfo: string)
    {
        var param = JSON.parse(strinfo);
        var index = param.index;
        this._pause(index, false);
    }

    private toolbarPauseTrue(strinfo: string){
        var param = JSON.parse(strinfo);
        var index = param.index;
        this._pause(index, true);
    }

    /**
     * 暂停/恢复录像回放
     * @param index
     * @param isPause
     * @return {any}
     * @private
     */
    private _pause(index: number, isPause: boolean){
        if(isPause){
            try{
                return this.ocx.StopEx(true, index, ()=>{}, 0);
            }catch(e){
                if(window.console){
                    console.error("ocx.pause pause error", e);
                }
            }
        }else{
            try{
                return this.ocx.PlayEx2("", index, ()=>{}, 0, ()=>{}, 0, this._RecordEndCallBack.bind(this), 0);
            }catch(e){
                console.error("ocx.pause start error: ",e);
            }
        }
    }

    private toolbarDigitalZoom(strInfo: string){
        var param = JSON.parse(strInfo);
        var index = param.index;
        if(this._cacheWindowDigitalStatus[index]){
            // 若当前是放大状态, 则变为缩小状态
            delete this._cacheWindowDigitalStatus[index];
        }else{
            // 若当前是缩小状态, 则设置为放大状态
            this._cacheWindowDigitalStatus[index] = true;
        }
        this._digitalZoom(index, !!this._cacheWindowDigitalStatus[index]);
    }

    /**
     * 启用/禁用数字放大
     * @private
     * @return true/false 成功/失败
     */
    private _digitalZoom(index: number, isEnable: boolean){
        let result = false;
        if(isEnable){
            this.ocx.SetWndOsdProperty(0xff00ff, 8, 0xffffffff, index);
            result = this.ocx.StartZoomByIndex(0, index);
        }else{
            result = this.ocx.StopZoomByIndex(index);
        }
        return true;
    }

    private getLastError():string{
        try{
            return this.ocx.GetLastError();
        }catch(e){
            console.error("ocx.getLastError err: ", e);
        }
    }


    /**
     * 关闭指定窗口
     * @param index 从0开始
     */
    public stop(index: number){
        if(index <= this._getWindowCount()){
            this._stop(index);
            this._stopOtherResource(index);
        }
    }

    /**
     * 关闭指定窗口 local
     * @param index
     * @private
     */
    private _stop(index: number){
        try{
            this.ocx.StopEx(false, index, this._stopCallBack, 0);
        }catch(e){
            if(window.console){
                console.error("ocx.stopEx error: ", e);
            }
        }

    }

    public stopAll() {
        this._stopAll();
        this._stopAllOtherResource();
    }

    public _stopAll(){
        let totalIndex, i, len;
        try {
            totalIndex = this._getWindowCount();
            for (i = 0; i < totalIndex; i++) {
                this.ocx.StopEx(false, i, this._stopCallBack, 0);
            }
        } catch (e) {
            console.error("VideoOcx.stop Error", e);
        }
    }

    /**
     * 关闭一些其他资源, 比如隐藏动作条, 销毁动作条相关的interval
     * @private
     */
    private _stopOtherResource(index: number){
        let playVideoToolModel = this._cachePlayVideoToolModel[index];
        if(playVideoToolModel){
            // 这里只隐藏工具条, 不清除缓存
            playVideoToolModel.hide();
        }
    }

    private _stopAllOtherResource(){
        let k;
        // 清空所有的时候才隐藏工具条
        for(k in this._cachePlayVideoToolModel){
            this._cachePlayVideoToolModel[k].hide();
        }
    }

    private _clearAllOtherResource(){
        let k;
        // 清空所有的时候才隐藏工具条
        for(k in this._cachePlayVideoToolModel){
            this._cachePlayVideoToolModel[k].clear();
            delete this._cachePlayVideoToolModel[k];
        }
    }

    private _stopCallBack = ()=> {

    };

    /**
     * 增加动作条
     */
    private createToolBar(strInfo: string, index: number): number{
        try{
            return this.ocx.CreateToolBar(strInfo, index);
        }catch(e){
            console.error("createToolBar Error: ", e);
        }

    }
    private setToolbarCallBack(funcName: string, func: Function)
    {
        try{
            return this.ocx.SetCallBack(funcName, func);
        }catch(e){
            console.error("ocx.setToolbarCallBack error", e);
        }
    }

    /**
     * 内部的ocx控件初始化方法
     * @private
     */
    private _init() {
        let _ocx: any, _param: any;
        _ocx = angular.element("<object></object>");
        _ocx.attr("id", this.ocxId);
        if (PortraitTool.getIEVer() > 0 && PortraitTool.getIEVer() <= 8) {
            _ocx.attr("classid", "CLSID:CEA4ADE1-AC94-4A75-AE30-85B99364FCD2");
        } else {
            _ocx.html("<param  style='width: 100px;height: 100px;background: #000;position: absolute;left: 0;top: 0;' name='unload' value='pluginLoaded'></param>");
        }

        _ocx.attr("type", "applicatin/x-firebreath-sn");
        _ocx.css("width", "100%");
        _ocx.css("height", "100%");

        angular.element(this.containerDom).append(_ocx);

        // 取得ocx的控件实例, 此实例用于其他方法调用ocx控件方法
        this.ocx = _ocx[0];
        this._bindEvent();
    }

    private _play(path: string, index: number) {
        console.debug("_play", path);
        let result = 500;
        try {
            result = this.ocx.PlayEx2(
                path,
                index,
                this._playCallBack.bind(this),//播放成功回调
                0, //播放成功参数
                this._displayFirstFrameCallBack.bind(this),//第一帧播放成功回调
                0,//第一帧播放成功回调参数,
                this._RecordEndCallBack.bind(this),//播放录像时，录像到达结束时间会触发此回调
                0//用户参数
            );
        } catch (e) {
            console.error("ocx._play error: ", e);
        }
        return result;
    }

    private _playCallBack = (index: number, result: number, userParam: any)=> {
        console.debug("playCallBack", index, result, userParam);
        // 若result不为0, 则表示播放失败, 故需要将当前录像回放视频进度条轮巡给停止
        if(result != 0){
            this._stopOtherResource(index);
        }
    };

    private _displayFirstFrameCallBack = (index: number, result: number, userParam: any)=> {
        console.debug("_displayFirstFrameCallBack", index, result, userParam);
        if (result === 0) {
            //代码获取视频参数
            // 缓存当前播放视频的videoSize, 由于只有一个videoSize, 所以若在多分格下需要进行截图的操作。就需要修改此处的代码
            this.videoSize = this._getVideoAttribute(index);
        }
    };

    private _RecordEndCallBack = (index: number, result: number, userParam: any)=> {
        console.debug("_RecordEndCallBack", index, result, userParam);
        // 若是录像回放模式, 则清空所有录像回放的资源
        this._stopOtherResource(index);
    };

    /**
     * 获取ocx指定窗格的参数(高宽等)
     */
    private _getVideoAttribute = function(index: number): IVideoSize{
        if(!this.ocx) return null;
        let result: IVideoSize;
        try{
            result = JSON.parse(this.ocx.GetVideoAttribute(index));
        }catch(e){
            if(window.console){
                console.error("ocx.GetVideoAttribute error: ", e);
            }
        }
        return result;
    };

    private _getWindowCount() {
        let result = 0;
        try{
            result = this.ocx ? this.ocx.GetWindowCount() : 0;
        }catch(e){
            console.error("ocx.GetWindowCount Error", e);
        }
        return result;
    }

    private _bindEvent() {
        // 绑定一些ocx控件的点击等事件
        var ocx = this.ocx;
        this._addEvent(ocx, 'WndClick', ()=> {
        });
        this._addEvent(ocx, 'WndDClik', (index: number, xPoint: any, yPoint: any)=> {

            if(typeof this.dbClickCallBack === "function"){
                this.dbClickCallBack(index);
            }
        });

        this._addEvent(ocx, 'MouseLeaveControl', (ulFlag: boolean, x: number, y: number, brReserved: boolean)=> {
        });
        this._addEvent(ocx, 'SwitchWindow', (srcIndex: number, desIndex: number)=>{
            this.changeLayoutPlayVideoResource(srcIndex, desIndex);
        });
    }

    private changeLayoutPlayVideoResource(srcIndex: number, desIndex: number){
        // 将srcIndex和desIndex
        let srcPlayVideoToolModel = this._cachePlayVideoToolModel[srcIndex];
        let desPlayVideoToolModel = this._cachePlayVideoToolModel[desIndex];

        this._cachePlayVideoToolModel[srcIndex] = null;
        delete this._cachePlayVideoToolModel[srcIndex];

        this._cachePlayVideoToolModel[desIndex] = null;
        delete this._cachePlayVideoToolModel[desIndex];

        // 互相交换
        if(srcPlayVideoToolModel){
            srcPlayVideoToolModel.setIndex(desIndex);
            this._cachePlayVideoToolModel[desIndex] = srcPlayVideoToolModel;
            if(!this.GetWindowBusyByIndex(desIndex)){
                srcPlayVideoToolModel && srcPlayVideoToolModel.hide();
            }
        }

        if(desPlayVideoToolModel){
            desPlayVideoToolModel.setIndex(srcIndex);
            this._cachePlayVideoToolModel[srcIndex] = desPlayVideoToolModel;
            if(!this.GetWindowBusyByIndex(srcIndex)){
                desPlayVideoToolModel && desPlayVideoToolModel.hide();
            }
        }
    }

    private _addEvent(obj: any, name: string, func: Function) {
        if (window.attachEvent) {
            obj.attachEvent('on' + name, func);
        } else {
            obj.addEventListener(name, func, false);
        }
    }
}

/*----------------------ocx实体生成工厂----------------------------------*/
export interface IVideoOcxFactory{
    getVideoOcx(containerDom: Document):IVideoOcx;

}
class VideoOcxFactory implements IVideoOcxFactory{

    static $inject = ["i18nFactory"];

    constructor(private i18nFactory: any){

    }
    getVideoOcx(containerDom: Document): IVideoOcx{
        return new VideoOcx(containerDom, this.i18nFactory);
    }
}

interface _CheckOcxResult{
    ocx: any;
    browser: string;
}

interface _DownloadResult{
    type: number;
}

export interface IVideoOcxTool{
    checkOcx(): void;
}

/*---------------------------ocx检测工具--------------------------------*/
/**
 * VideoOcx检测工具
 * 用于检测ocx时候存在并给出下载提示信息
 */
class VideoOcxTool implements IVideoOcxTool {
    static $inject = ['i18nFactory','layer'];
    constructor(private i18nFactory: any, private layer: any){
    }

    private $ = angular.element;
    private _version = "Crowd_OCX_V2.2.5";
    private _ocxDownloadUrl = "/foplayer/SN_Crowd_Plugins_2.2.5.exe";
    private _firefoxDownloadUrl = "/foplayer/Firefox_44.exe";
    private _googleDownloadUrl =  "/foplayer/GoogleChromeframeStandaloneEnterprise.4144293914.msi";

    checkOcx() {
        //检测浏览器合适程度
        //检测ocx控件是否安装
        var result = {} as _CheckOcxResult;
        result.ocx = this._checkOcx();//true false upgrade
        result.browser = this._checkBrowser();//return good normal bad
        this.showDownload(result);
    }

    /**
     * 检测ocx控件是否安装
     * @returns true or false
     */
    private _checkOcx () {
        var $ocx = this._createTempOcx();
        var result = "false";
        if (!$ocx) return result;
        var $container;
        try {
            $container = this.$("<div style='position:absolute; top:0; left:-1000px;'></div>");
            $container.appendTo('body');
            $container.append($ocx);
            if (!(PortraitTool.getIEVer() > 0 && PortraitTool.getIEVer() <= 8)) {
                this._setParamToOcx($ocx);
            }
            var version = $ocx[0].GetVersion();//获取版本号,用于检测新版本
            $ocx[0].CleanUp();

            if (version && version != this._version) {
                //提示更新
                result = "upgrade";
            } else {
                result = "true";
            }
            if (window.console) {
                console.debug("The current version of the video controls is:", version);
            }
        } catch (e) {
            if (window.console) {
                console.error("checkocx error: ",e.message);
            }
        } finally{
            if($container){
                $container.empty();
                $container.remove();
            }
            $ocx = null;
            $container = null;
        }
        return result;
    }

    /**
     * 检测浏览器是否兼容ocx控件
     * @return 返回程度标志：good normal bad
     */
    private _checkBrowser() {
        var param = PortraitTool.getBrowser();
        var result = "good";
        // if(param.name.toUpperCase() == "EDGE"){
        // 	result = "bad";
        // }else if(param.name.toUpperCase() == "IE" && Number(param.major)>10){
        // 	result = "normal";
        // }else if(param.name.toUpperCase() == "CHROME" && Number(param.major)>40){
        // 	result = "bad";
        // }else if(param.name.toUpperCase() == "IE" && (Number(param.major)<=8)){
        // 	result = "bad";
        // }
        if (param.name.toUpperCase() == "IE" && (Number(param.major) <= 8)) {
            result = "bad";
        }
        return result;
    }
    /**
     * 通过判断ocx的检测情况，弹出相应的下载提示框
     * @param param
     */
    private showDownload(param: _CheckOcxResult) {
        if (param.browser == "bad") {//不支持,安装了检测不到
            this._showDownload({type: 3});
        } else if (param.ocx == "false") {//未安装,未安装
            this._showDownload({type: 1});
        } else if (param.browser == "normal") {//不完全支持
            this._showDownload({type: 2});
        } else if (param.ocx == "upgrade") {//新版本更新
            this._showDownload({type: 4});
        }
    }
    /**
     * @param param 1下载 2浏览器不能很好的支持ocx 3浏览器不支持ocx 4ocx版本更新
     */
    private _showDownload(param: _DownloadResult) {
        var method: Function, html: string, urlId: string, url: string;
        switch (param.type) {
            case 1:
                urlId = 'ocxDownloadUrl';
                html = "<div class='u-msg-notclose-1'><a id='" + urlId + "' href='javascript:void(0)' style='text-decoration:underline;'>" + this.i18nFactory('FDS_00_13_02') +"</a></div>";
                url = this._ocxDownloadUrl;
                break;
            case 2:
                urlId = 'firefoxDownloadUrl';
                html = "<div class='u-msg-notclose-1'><p>" + this.i18nFactory('FDS_00_13_03') +"</p><p><a id='" + urlId + "' href='javascript:void(0)' style='text-decoration:underline;'>" + this.i18nFactory('FDS_00_13_06') +"</a></p></div>";
                url = this._googleDownloadUrl;
                break;
            case 3:
                urlId = 'firefoxDownloadUrl';
                html = "<div class='u-msg-notclose-1' style='min-height:1px;'><p>" + this.i18nFactory('FDS_00_13_04') +"</p><p><a id='" + urlId + "' href='javascript:void(0)' style='text-decoration:underline;'>" + this.i18nFactory('FDS_00_13_06') +"</a></p></div>";
                url = this._googleDownloadUrl;
                break;
            case 4:
                urlId = 'ocxDownloadUrl';
                html = "<div class='u-msg-notclose-1'><a id='" + urlId + "' href='javascript:void(0)' style='text-decoration:underline;'>" + this.i18nFactory('FDS_00_13_05') +"</a></div>";
                url = this._ocxDownloadUrl;
                break;
            default:
                urlId = 'ocxDownloadUrl';
                html = "<div class='u-msg-notclose-1'><a id='" + urlId + "' href='javascript:void(0)' style='text-decoration:underline;'>" + this.i18nFactory('FDS_00_13_02') +"</a></div>";
                url = this._ocxDownloadUrl;
                break;
        }
        method = this._downloadResource;
        layer.open({
            type: 1,
            title: null,
            shade: 0,
            area: ['320px'],
            offset: 'rb',
            closeBtn: 0,
            // time: -1,
            // shift: -1,
            content: html,
            btn: this.i18nFactory('FDS_00_07_01'),
            // content: "<div style='height: 90px;'>一些文字信息</div>",
            success: (dom: Document, index: number) => {
                setTimeout(()=>{ // success调用成功时, 不能触发dom的绑定, 所以加了一层timeout
                    this.$(dom).find("#" + urlId).on('click', {index: index, url: url}, method);
                });
            }
        });
    }
    private _downloadResource(event: any) {
        var data = event.data;
        if (data) {
            window.location.href = data.url;
            layer.close(data.index);
        }
    }
    /**
     * 创建临时ocx控件，用于ocx检测
     */
    private _createTempOcx(){
        var $ocx = null;
        try {
            $ocx = this.$("<object></object>");
            $ocx.attr("id", "testOcxExist");
            $ocx.attr("type", "applicatin/x-firebreath-sn");
            if (PortraitTool.getIEVer() > 0 && PortraitTool.getIEVer() <= 8) {
                $ocx.attr("classid", "CLSID:CEA4ADE1-AC94-4A75-AE30-85B99364FCD2");
            }
        } catch (e) {
            if (window.console) {
                console.error("_createTempOcx", e.message);
            }
        }
        return $ocx;
    }
    private _setParamToOcx($ocx: any) {
        try {
            var param = "<param name='unload' value='pluginLoaded'></param>";
            $ocx.html(param);
        } catch (e) {
            if (window.console) {
                console.error("_setParamToOcx", e.message);
            }
        }
        return $ocx;
    }
}

// 将VideoOcx和VideoOcxTool弄成工厂
app.service("videoOcxFactory", VideoOcxFactory);
app.service("videoOcxTool", VideoOcxTool);