/// <reference path="../../../@types/map/index.d.ts" />
import {SystemPoint} from "../../../core/entity/SystemPoint";
import OverlayLayerOpts = NPMapLib.Layers.OverlayLayerOpts;
import {MapConfigModel} from "./core/model/map.config.model";
import InfoWindowOpts = NPMapLib.Symbols.InfoWindowOpts;
import _PolylineStyle = NPMapLib.Geometry._PolylineStyle;
import _PolygonStyle = NPMapLib.Geometry._PolygonStyle;
import _CircleStyle = NPMapLib.Geometry._CircleStyle;
import _AnimationLineOpts = NPMapLib.Symbols._AnimationLineOpts;
import _AnimationLinePreDrawEvent = NPMapLib.Symbols._AnimationLinePreDrawEvent;
import _AnimationLineAfterDrawEvent = NPMapLib.Symbols._AnimationLineAfterDrawEvent;
import _AnimationLineAfterStepEvent = NPMapLib.Symbols._AnimationLineAfterStepEvent;


export interface IMeasureToolOptions{
    lengthUnit:string;
    areaUnit:string;
    mode:string
}

export interface InfoWindowEvent {
    open?: Function,
    close?: Function,
    hide?: Function
}

/**
 * 图形的样式
 * 此interface不使用, 只做属性释义
 */
// export interface GeometryStyle {
//     color: string; //颜色
//     fillColor: string; //填充颜色
//     weight: number; //宽度，以像素为单位
//     opacity: number; //透明度，取值范围0 - 1
//     fillOpacity: number; //填充的透明度，取值范围0 - 1,
//     strokeColor: string; // 'blue'
//     strokeDashstyle: string; // 'dash'
//     lineStyle: string; //样式 NPMapLib.LINE_ARROW_TYPE_BOTH, 在map.d.ts中搜索LINE_ARROW_TYPE_BOTH可以看其他可用值
// }

interface TraceAnalyzeEventOpts{
    afterDraw: ()=>void;
}

export interface TraceAnalyzePreDrawEvent extends _AnimationLinePreDrawEvent{

}
export interface TraceAnalyzeAfterDrawEvent extends _AnimationLineAfterDrawEvent{

}
export interface TraceAnalyzeAfterStepEvent extends _AnimationLineAfterStepEvent{

}

export interface TraceAnalyzeOpts{
    speed: number; // 设置播放速度
    color: string; // 设置线条颜色,默认red
    opacity: number; // 设置线条透明度, 默认1
    weight: number; // 线条权重
    afterDraw: (evt: TraceAnalyzeAfterDrawEvent)=>void; // 绘制新的轨迹结束触发
    preDraw: (evt: TraceAnalyzePreDrawEvent)=>void; // 绘制新的轨迹之前触发
    afterStep: (evt: TraceAnalyzeAfterStepEvent)=>void; // 每一步结束以后
    start: Function; // 轨迹绘制开始
    pause: Function; // 轨迹绘制暂停
    stop: ()=>void; // 轨迹绘制停止
    moving: Function; // 轨迹移动中
    moved: Function; // 轨迹移动完成
    startMarkUrl:string;
    endMarkUrl:string;
    normalMarkUrl:string;
    moveUrl:string;
    showMarkers:boolean;
}

export interface MarkersOpts{
    iconURL?:string;
    rotation?:number;
    title?:string;
    click?:Function;
    rightClick?:Function;
    mouseOver?:Function;
    mouseOut?:Function;
    dragStart?:Function;
    dragEnd?:Function;
}

export interface ClusterMarkerEx extends NPMapLib.Symbols.ClusterMarker{
    id: string;
    titleName: string;
    markType: string;
    deviceID:string;
    deviceName:string;
    ID: string;
    Descrption: string;
    Lat: number;
    Lon: number;
    LayerType: string;
    ObjectID: string;
    ObjectType: string;
    TaskStatus:string;
    ObjectState:string;
    ObjectName:string;
}

export interface PolylineStyle extends _PolylineStyle{
}

export interface PolygonStyle extends _PolygonStyle{
}

export interface CircleStyle extends _CircleStyle {
}

export interface INPGisMapMain {
    /**
     * 初始化地图
     * @param mapId 地图对象所在dom的id属性(id应为唯一)
     * @param mapConfig 地图初始化参数
     */
    init(mapId: string, mapConfig: MapConfigModel): void;
    /**
     * 销毁地图
     */
    destroy(): any;
    /**
     * 开始布点
     * @param markerId
     */
    startLocate(msg: string): any;
    /**
     * 结束布点
     */
    endLocate(): void;
    /**
     * 定位
     * @param markerId
     */
    locationMarker(object: string, zoom?: number): any;

    /**
     * 渲染点位到地图上
     * @param points
     */
    renderMarkers(points: Array<SystemPoint>, opts?: OverlayLayerOpts): any;
    addheatlayer(points: Array<SystemPoint>, opts?: OverlayLayerOpts): any;
    /**
     * 渲染单个单位到地图中
     * @param point
     */
    renderMarker(point: SystemPoint): any;

    /**
     * 移除指定的点位
     * 实际上是使用的ObjectID字段来匹配点位，再移除
     * @param point
     */
    removeMarker(point: SystemPoint): any;

    /**
     * 创建infoWindow
     */
    createInfoWindow(lon: number, lat: number, infoWindowOpt?: InfoWindowOpts): string;

    /**
     * 根据坐标打开地图弹出框
     * @param winId win编号
     * @param domHtml 弹出的内容的html
     * @param eventOpt 窗口的事件回调(open,close,hide)
     * @return 返回infoWindow的唯一编码
     */
    openInfoWindow(winId: string, domHtml: HTMLDocument, eventOpt?: InfoWindowEvent): void;

    /**
     * 关闭悬浮窗口
     * @param winId
     */
    closeInfoWindow(winId: string): void;

    /*--------地图基本操作---------*/
    /**
     * 量距
     */
    measureDistance(): void;

    setBaseMapLayer(mapConfig:MapConfigModel,type:string):void;

    /**
     * 量面
     */
    measureArea(): void;

    /**
     * 清除量算
     */
    cancelMeasure(): void;

    /**
     * 画线选择点位
     * @params callBackMethod: (points)=>void 返回选中的地图点位数据 TODO 暂无实现此回调函数
     * @params style 绘制完成后线段在地图上的展示样式
     */
    selectLine(callBackMethod?: (points: Array<SystemPoint>)=>void, style?: PolylineStyle): void;

    /**
     * 画多边形选择点位
     * @params callBackMethod: (points)=>void 返回选中的地图点位数据
     * @params style 绘制完成后多边形在地图上的展示样式
     */
    selectPolygon(callBackMethod?: (points: Array<SystemPoint>)=>void, style?: PolygonStyle): void;

    /**
     * 画矩形选择点位
     * @params callBackMethod: (points)=>void 返回选中的地图点位数据
     * @params style 绘制完成后矩形在地图上的展示样式
     */
    selectRectangle(callBackMethod?: (points: Array<SystemPoint>)=>void, style?: PolygonStyle): void;

    /**
     * 画圆选择点位
     * @params callBackMethod: (points)=>void 返回选中的地图点位数据
     * @params style 绘制完成后圆形在地图上的展示样式
     */
    selectCircle(callBackMethod?: (points: Array<SystemPoint>)=>void, style?: CircleStyle): void;
    /**
     * 画线
     * @param callBackMethod: 返回点位数组
     * @params style 绘制完成后圆形在地图上的展示样式
     */
    drawLine(callBackMethod?: (points: Array<NPMapLib.Geometry.Point>)=>void, style?: PolylineStyle): void;
    /**
     * 画矩形
     * @param callBackMethod 返回点位数组
     * @params style 绘制完成后圆形在地图上的展示样式
     */
    drawRectangle(callBackMethod?: (points: Array<NPMapLib.Geometry.Point>)=>void, style?: PolygonStyle): void;
    /**
     * 画圆
     * @param callBackMethod 返回点位数组
     * @params style 绘制完成后圆形在地图上的展示样式
     */
    drawCircle(callBackMethod?: (center: NPMapLib.Geometry.Point, radius: number)=>void, style?: CircleStyle): void;

    /**
     * 画多边形
     * @param callBackMethod 返回点位数组
     * @params style 绘制完成后圆形在地图上的展示样式
     */
    drawPolygon(callBackMethod?: (points: Array<NPMapLib.Geometry.Point>)=>void, style?: PolygonStyle): void;

    /**
     * 直径画圆
     * TODO 未实现
     */
    drawCircleByDiameter(callBackMethod?: Function): void;

    /**
     * 取消绘制1
     */
    cancelDraw(): void;

    /**
     * 清除所有在地图上绘制的图形
     */
    clearDraw(): void;

    /**
     * 圆搜索
     */
    addCircleSearchControl(point:any,callback:any,min:number,max:number): void;

    /**
     * 取消圆搜索
     */
    removeCircleSearchControl(): void;

    /**
     * 根据聚合点位类型, 设置点位的隐藏和显示
     * @param layerType
     * @param visible
     */
    setClusterMarkerVisibleByLayerType(layerType: string, visible: boolean): void;

    /**
     * 创建轨迹分析实例
     * @param points 轨迹线的点位
     * @param opts 一些初始化或者事件绑定函数
     * @return 轨迹分析线段对应唯一id
     */
    createTraceAnalyze(points: Array<SystemPoint>, opts?: TraceAnalyzeOpts): string;

    /**
     * 启动轨迹分析
     * @param lineId
     */
    startTraceAnalyze(lineId: string):void;

    /**
     * 停止轨迹分析
     * @param lineId
     */
    stopTraceAnalyze(lineId: string):void;

    /**
     * 暂停轨迹分析
     * @param lineId
     * @param flag true(暂停)/false(继续)
     */
    pauseTraceAnalyze(lineId: string, flag: boolean):void;

    /**
     * 重新启动轨迹分析实例
     * 对于已经clear的轨迹分析对象无效
     * @param lineId
     */
    restartTraceAnalyze(lineId: string):void;

    /**
     * 清除轨迹分析线段
     * @param lineId
     */
    clearTraceAnalyze(lineId: string):void;

    /**
     * 设置轨迹分析线速度
     * @param lineId
     * @param speed
     */

}