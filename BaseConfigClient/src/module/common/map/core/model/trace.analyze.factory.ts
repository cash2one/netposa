/**
 * Created by dell on 2017/6/7.
 */

import {TraceAnalyzeOpts} from "../../map.interface";
import PortraitTool from "../../../portrait-tool";
import AnimationLine = NPMapLib.Symbols.AnimationLine;
import _AnimationLinePreDrawEvent = NPMapLib.Symbols._AnimationLinePreDrawEvent;
import OverlayLayer = NPMapLib.Layers.OverlayLayer;
import Point = NPMapLib.Geometry.Point;
import Layer = NPMapLib.Layer;
import Marker = NPMapLib.Symbols.Marker;

declare let angular: any;

/**
 * 轨迹实例
 */
class TraceAnalyzeModel {
    id: string;
    markers: Array<Marker>;
    animationLine: AnimationLine;
    points: Array<NPMapLib.Geometry.Point>;
    opts: TraceAnalyzeOpts;
    speed: number;
    mapId: number;
    layer: NPMapLib.Layers.OverlayLayer;
    startMarkUrl: string;
    endMarkUrl: string;
    normalMarkUrl: string;
    moveUrl:string;
    showMarkers:boolean;
    constructor(points: Array<NPMapLib.Geometry.Point>, mapId: number, layer: Layer, opts?: TraceAnalyzeOpts) {
        this.speed = opts.speed || 100;
        this.opts = opts || {} as TraceAnalyzeOpts;
        this.mapId = mapId;
        this.points = points || [];
        this.layer = layer as OverlayLayer;
        this.startMarkUrl = opts.startMarkUrl || '/images/map/map-marker-start.png';
        this.endMarkUrl = opts.endMarkUrl || '/images/map/map-marker-end.png';
        this.normalMarkUrl = opts.normalMarkUrl || '/images/map/map-marker-smallpink.png';
        this.moveUrl = opts.moveUrl || "/images/map/temptracker.png";
        this.showMarkers = opts.showMarkers || false;
        if (angular.isArray(this.points) && this.points.length > 0) {
            this.init();
        } else {
            console.error("TraceAnalyzeModel init error: points is null!");
        }
    }

    /**
     * 初始化轨迹分析实例
     * 一个实例只执行一次
     */
    private init() {
        this.id = PortraitTool.getUUID();
        this.animationLine = new NPMapLib.Symbols.AnimationLine(this.mapId, this.points, this.getAnimationLineOpt(this.points[0], this.opts));
        this.bindEvent();
        // 设置速度
        this.speed = this.opts.speed || this.speed;
        this.animationLine.setSpeed(this.opts.speed || this.speed);
        // 设置轨迹线显示的图层
        this.setLayer();
        // 初始化轨迹分析点位
        if(this.showMarkers){
            this.initMarkers();
        }

    }

    /**
     * 初始化轨迹分析线段移动路径上的点位
     */
    private initMarkers() {
        // 初始化轨迹分析过程中的点位信息
        let markers =[] as Array<Marker>;
        // temp记录点位在同一个点上重复出现次数
        let i, len, point, key, temp = {} as { [key: string]: number };
        for (i = 0, len = this.points.length; i < len; i++) {
            point = this.points[i];
            key = getPointKey(point.lat, point.lon);
            if (temp[key] == null) {
                temp[key] = 0;
            } else {
                temp[key] = temp[key] + 1;
            }
            markers.push(this.createPointMarker(point, (i + 1) + "", i, temp[key], i === (len - 1)));
        }
        this.markers = markers;


        function getPointKey(lat: number, lon: number) {
            return lat + "_" + lon;
        }
    }

    /**
     * 创建路径上的点位实例
     * @param point
     * @param label
     * @param index
     * @param repeat 同一个点位的出现次数
     * @returns {NPMapLib.Symbols.Marker}
     * TODO 里面对于位移的数字还需要统一
     */
    private createPointMarker(point: Point, label: string, index: number, repeat: number, isEnd?: boolean) {
        let marker = new NPMapLib.Symbols.Marker(point);
        if (index == 0) {
            // 起点图标
            marker.setIcon(new NPMapLib.Symbols.Icon(this.startMarkUrl, new NPMapLib.Geometry.Size(32, 32), {anchor: new NPMapLib.Geometry.Size(-14, -29)}));
        } else if (isEnd) {
            // 终点图标
            marker.setIcon(new NPMapLib.Symbols.Icon(this.endMarkUrl, new NPMapLib.Geometry.Size(32, 32), {anchor: new NPMapLib.Geometry.Size(-14, -26)}));
        } else {
            // 普通图标

            marker.setIcon(new NPMapLib.Symbols.Icon(this.normalMarkUrl, new NPMapLib.Geometry.Size(32, 32), {anchor: new NPMapLib.Geometry.Size(-14 , -26 )}));
            let l = new NPMapLib.Symbols.Label(label, {
                "position": point,
                "offset": new NPMapLib.Geometry.Size(2, 16)
            });

            l.setStyle({fontSize: 12, fontFamily: 'Arail', color: 'white', align: 'center', isBold: true});
            marker.setLabel(l);

            // marker.setLabel(new NPMapLib.Symbols.Label(label, {
            //     "position": point,
            //     "offset": new NPMapLib.Geometry.Size(20, 20)
            //     //"offset": new NPMapLib.Geometry.Size(30, (0 + 20 * repeat))
            // }));
        }
        return marker;
    }

    /**
     * 获取动画线配置参数
     * @param point
     * @param opts
     * @returns {{headerMarker: NPMapLib.Symbols.Marker, color: (string|string), opacity: number, weight: number}}
     */
    private getAnimationLineOpt(point: NPMapLib.Geometry.Point, opts?: TraceAnalyzeOpts) {
        return {
            headerMarker: this.createHeaderMarker(point),
            color: opts.color || 'red',
            opacity: opts.opacity || 0.8,
            weight: opts.weight || 10
        };
    }

    /**
     * 创建一个新的车辆图标, 并加载到地图中
     * @param point 初始点位
     * @returns {NPMapLib.Symbols.Marker}
     */
    private createHeaderMarker(point: NPMapLib.Geometry.Point) {
        let marker = new NPMapLib.Symbols.Marker(point, {offset: new NPMapLib.Geometry.Size(0, -12)});
        marker.setIcon(new NPMapLib.Symbols.Icon(this.moveUrl, new NPMapLib.Geometry.Size(29, 29)));
        marker.setData({name:'move'});
        this.layer.addOverlay(marker as NPMapLib.Overlay);
        return marker;
    }

    /**
     * 启动轨迹分析
     */
    start() {
        if (this.animationLine) {
            this.animationLine.start();
        }
    }

    /**
     * 重新开始执行轨迹分析
     */
    restart() {
        // 清除地图上的痕迹
        this.clear();
        if (this.animationLine) {
            this.animationLine.restart();
        }
    }

    /**
     * 暂停轨迹分析
     */
    pause() {
        if (this.animationLine) {
            this.animationLine.pause();
        }
    }

    /**
     * 停止估计分析
     */
    stop() {
        if (this.animationLine) {
            this.animationLine.stop();
        }
    }

    /**
     * 清除轨迹, 但是不销毁实例
     */
    private clear() {
        // 清除点位
        if (this.markers) {
            let i, len;
            for (i = 0, len = this.markers.length; i < len; i++) {
                this.layer.removeOverlay(this.markers[i]);
            }
        }
    }

    /**
     * 清除轨迹分析内容
     * 此操作会销毁所有资源, 需要重新新建实例才能进行轨迹分析
     */
    remove() {
        if (this.animationLine) {
            this.animationLine.remove();
        }
        this.animationLine = null;
        // 移除其他缓存的内容
        this.layer.removeAllOverlays();
        this.points = null;
        this.markers = null;
    }

    private drawMarkerInPreDraw(index: number) {
        if (this.markers) {
            let marker = this.markers[index];
            this.layer.addOverlay(marker);
            marker.showLabel();
        }
    }

    bindEvent() {
        if (this.animationLine == null || !this.opts) {
            return;
        }
        if (typeof this.opts.afterDraw === "function") {
            this.animationLine.events.register('afterDraw', (evt: _AnimationLinePreDrawEvent) => {
                this.opts.afterDraw(evt);
            });
        }

        this.animationLine.events.register('preDraw', (evt: _AnimationLinePreDrawEvent) => {
            // 主动绘制一个图标
            this.drawMarkerInPreDraw(evt.index);
            if (typeof this.opts.preDraw === "function") {
                this.opts.preDraw(evt);
            }
        });
        if (typeof this.opts.afterStep === "function") {
            this.animationLine.events.register('afterStep', (evt: _AnimationLinePreDrawEvent) => {
                this.opts.afterStep(evt);
            });
        }
        if (typeof this.opts.start === "function") {
            this.animationLine.addEventListener(NPMapLib.ANIMATION_EVENT_START, () => {
                // TODO 待测试效果
                this.opts.start();
            });
        }
        if (typeof this.opts.pause === "function") {
            this.animationLine.addEventListener(NPMapLib.ANIMATION_EVENT_PAUSE, () => {
                // TODO 待测试效果
                this.opts.pause();
            });
        }
        if (typeof this.opts.stop === "function") {
            this.animationLine.addEventListener(NPMapLib.ANIMATION_EVENT_STOP, () => {
                // TODO 待测试效果
                this.opts.stop();
            });
        }
        if (typeof this.opts.moving === "function") {
            // TODO 待测试效果
            this.animationLine.addEventListener(NPMapLib.ANIMATION_EVENT_MOVING, this.opts.moving);
        }
        if (typeof this.opts.moved === "function") {
            // TODO 待测试效果
            this.animationLine.addEventListener(NPMapLib.ANIMATION_EVENT_MOVED, this.opts.moved);
        }
    }

    private setLayer() {
        if (this.animationLine && this.layer) {
            this.animationLine.setLayer(this.layer);
        }
    }

    setSpeed(speed: number) {
        if (this.animationLine) {
            this.animationLine.setSpeed(speed || this.speed);
        }
    }
}

/**
 * 轨迹分析工厂类
 */
export class TraceAnalyzeFactory {

    private static TRACE_ANALYZE_LAYER_NAME = "traceAnalyze";
    private static DEFAULT_SPEED = 1000;

    private mapAdapter: IMapAdapter;
    private cacheAnimationLine: { [key: string]: TraceAnalyzeModel } = {};
    private traceAnalyzeLayer: OverlayLayer = null;

    constructor(mapAdapter: IMapAdapter) {
        this.mapAdapter = mapAdapter;
        this.getTraceAnalyzeLayer();
    }

    private getTraceAnalyzeLayer() {
        if (this.traceAnalyzeLayer == null) {
            this.traceAnalyzeLayer = new NPMapLib.Layers.OverlayLayer(TraceAnalyzeFactory.TRACE_ANALYZE_LAYER_NAME);
            this.mapAdapter.addLayer(this.traceAnalyzeLayer);
        }
        return this.traceAnalyzeLayer;
    }

    /**
     * 创建动画线
     * @param mapId
     * @param points
     * @param opts
     * @returns lineId: 创建的animationLine的唯一标识
     */
    createTraceAnalyze(points: Array<NPMapLib.Geometry.Point>, opts?: TraceAnalyzeOpts) {

        opts = opts || {} as TraceAnalyzeOpts;
        if (!angular.isArray(points)) {
            console.error("creatTraceAnalyze error: points is not array");
        }
        let model = this.createTraceAnalyzeModel(points, opts);
        this.saveAnimationLine(model.id, model);
        model.layer.setZIndex(201);
        return model.id;
    }

    /**
     * 创建轨迹分析实例
     * @param points
     * @param opts
     * @returns {TraceAnalyzeModel}
     */
    private createTraceAnalyzeModel(points: Array<NPMapLib.Geometry.Point>, opts?: TraceAnalyzeOpts) {
        return new TraceAnalyzeModel(points, this.mapAdapter.getMapId(), this.getTraceAnalyzeLayer(), opts);
    }

    /**
     * 开始轨迹分析
     * @param lineId
     * TODO 还需考虑已经有正在运行的轨迹分析的情况
     */
    startTraceAnalyze(lineId: string) {
        let model = this.getAnimationLine(lineId);
        if (model) {
            model.start();
        }
    }

    /**
     * 调用原实例 重新进行轨迹分析演示
     * @param lineId
     */
    reStartTraceAnalyze(lineId: string) {
        let model = this.getAnimationLine(lineId);
        if (model) {
            model.restart();
        }
    }

    /**
     * 停止轨迹分析
     * @param lineId
     */
    stopTraceAnalyze(lineId: string) {
        let animationLine = this.getAnimationLine(lineId);
        if (animationLine) {
            animationLine.stop();
        }
    }

    /**
     * 暂停轨迹分析
     * @param lineId
     * @param flag true(暂停)/false(继续)
     */
    pauseTraceAnalyze(lineId: string, flag: boolean) {
        let model = this.getAnimationLine(lineId);
        if (model) {
            flag === false ? model.start() : model.pause();
        }
    }

    /**
     * 清除轨迹分析线
     * @param lineId
     */
    clearTraceAnalyze(lineId: string) {
        let model = this.getAnimationLine(lineId);
        if (model) {
            model.remove();
        }
        this.removeAnimationLine(lineId);
    }

    setSpeed(lineId: string, speed: number) {
        let model = this.getAnimationLine(lineId);
        if (model) {
            model.setSpeed(speed || TraceAnalyzeFactory.DEFAULT_SPEED);
        }
    }

    /**
     * 销毁此工厂实例
     */
    destroy() {
        this.cacheAnimationLine = null;
    }

    private getAnimationLine(lineId: string) {
        return this.cacheAnimationLine[lineId];
    }

    private saveAnimationLine(lineId: string, traceAnalyzeModel: TraceAnalyzeModel) {
        if (lineId != null) {
            this.cacheAnimationLine[lineId] = traceAnalyzeModel;
        } else {
            console.error("TraceAnalyzeFactory.saveAnimationLine fail: lineId is null!");
        }
    }

    private removeAnimationLine(lineId: string) {
        if (this.cacheAnimationLine[lineId]) {
            delete this.cacheAnimationLine[lineId];
        }
    }

}