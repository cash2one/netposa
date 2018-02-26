/**
 * Created by dell on 2017/4/26.
 */


declare namespace NPMapLib {
    export interface Map {
        addLayer(layer: NPMapLib.Layer): void;

        addLayers(layers: Array<NPMapLib.Layer>): void;

        addOverlay(overlay: NPMapLib.Overlay): void;

        addOverlays(overlays: Array<NPMapLib.Overlay>): void;

        centerAndZoom(center: NPMapLib.Geometry.Point, zoom: number): void;

        centerAtMouse(): void;

        clearOverlays(): void;

        closeAllInfoWindows(): void;

        containFeatures(extent: NPMapLib.Geometry.Extent, filter: Function, layer: NPMapLib.Layer): void;

        deactivateMouseContext(): void;

        destroyMap(): void;

        disableBoxSelect(): void;

        disableDoubleClickZoom(): void;

        disableEditing(): void;

        disableInertialDragging(): void;

        disableKeyboard(): void;

        disableLayerSwitcher(): void;

        disableMapOperation(): void;

        disableScrollWheelZoom(): void;

        enableBoxSelect(): void;

        enableDoubleClickZoom(): void;

        enableEditing(): void;

        enableInertialDragging(): void;

        enableKeyboard(): void;

        enableLayerSwitcher(): void;

        enableMapOperation(): void;

        enableScrollWheelZoom(): void;

        fullExtent(): void;

        getAllLayers(): Array<NPMapLib.Layer>;

        getCenter(): NPMapLib.Geometry.Point;

        getContainer(): HTMLDocument;

        getCursor(): string;

        getDefaultLayer(): NPMapLib.Layer;

        getDistance(start: NPMapLib.Geometry.Point, end: NPMapLib.Geometry.Point): number;

        getExtent(): NPMapLib.Geometry.Extent;

        getInfoWindows(): Array<NPMapLib.Symbols.InfoWindow>

        getLayer(id: number): NPMapLib.Layer;

        getLayerByName(name: string): NPMapLib.Layer;

        getMapId(): number;

        getMapTileUrl(point: NPMapLib.Geometry.Point): string;

        getMapUnits(): number;

        getMaxZoom(): number;

        getMinZoom(): number;

        getOverlays(): Array<NPMapLib.Overlay>;

        getProjection(): number;

        getRestrictedExtent(): NPMapLib.Geometry.Extent;

        getSize(): NPMapLib.Geometry.Pixel;

        getTitleSize(): NPMapLib.Geometry.Size;

        getVersion(): string;

        getVisibleLayers(): Array<NPMapLib.Layer>;

        getZoom(): number;

        pan(): void;

        panByPixel(x: number, y: number): void;

        panTo(center: NPMapLib.Geometry.Point): void;

        pixelToPoint(pixel: NPMapLib.Geometry.Pixel): NPMapLib.Geometry.Point;

        pointToPixel(point: NPMapLib.Geometry.Point): NPMapLib.Geometry.Pixel;

        removeControl(control: NPMapLib.Control): void;

        removeHandStyle(): void;

        removeLayer(id: number): void;

        removeLayerByName(name: string): void;

        removeOverlay(overlay: NPMapLib.Overlay): void;

        removeOverlays(overlays: Array<NPMapLib.Overlay>): void;

        reset(): void;

        setBaseLayer(layer: NPMapLib.Layer): void;

        setCenter(center: NPMapLib.Geometry.Point, zoom: number): void;

        setCursor(cursor: string): void;

        setDefaultMapCursor(cursor: string): void;

        setFallThrough(fallThrough: boolean): void;

        setMapStyle(mapStyle: string): void;

        setMaxZoom(zoom: number): void;

        setMinZoom(zoom: number): void;

        setVisibilityDefalutLayer(visibility: boolean): void

        setZoom(zoom: number): void;

        switchLayer(index: number): void;

        switchLayerByName(layerName: string): void;

        updateSize(): void;

        zoomIn(): void;

        zoomInFixed(): void;

        zoomInOutStop(): void;

        zoomOut(): void;

        zoomOutFixed(): void;

        zoomTo(position: NPMapLib.Geometry.Point, zoom: number): void;

        zoomToExtent(extent: NPMapLib.Geometry.Extent): void;

        addControl(control: NPMapLib.Controls): void;

        getAllGroups(): void;

        // Events
        addEventListener(event: any, handler: (params: any) => void): void;

        removeEventListener(event: string): void;

        addHandStyle(): void;

        removeHandStyle(): void;
    }

    //export function Map(container: any, opts: {[key: string]: any}): void;
    export class Map {
        constructor(container: any, opts: { [key: string]: any })
    }
}

declare namespace NPMapLib {
    export interface Overlay {
        disableEditing?(): void;

        enableEditing?(modeL: string, options: Object): void;

        flash?(): void;

        flash2?(times: number): void;

        getBounds?(): NPMapLib.Geometry.Extent;

        getCentroid?(): NPMapLib.Geometry.Point;

        getData?(): Object;

        getId?(): number;

        getTop?(): NPMapLib.Geometry.Point;

        getZIndex?(): number;

        hide?(): void;

        isVisible?(): boolean;

        refresh?(): void;
    }
}

declare namespace NPMapLib {
    export interface Layer {
        getName?(): string;

        getUrl?(): void;

        getZIndex?(): void;

        hide?(): void;

        isVisible?(): void;

        refresh?(): void;

        setName?(): void;

        setUrl?(): void;

        setZIndex?(zIndex: number): void;

        show?(): void;
    }
}

declare namespace NPMapLib {

    interface Geometry {
    }

    namespace Geometry {
        function Extent(a: number, b: number, c: number, d: number): void;

        //function Pixel(x: number, y: number): void  ;
        export class Pixel {
            constructor(x: number, y: number)
        }

        //function Size(width: number, height: number): void;
        export class Size {
            constructor(width: number, height: number)
        }

        export interface Extent {
            equals(): boolean;

            getNorthEast(): NPMapLib.Geometry.Point;

            getSouthWest(): NPMapLib.Geometry.Point;

            containsPoint(point: NPMapLib.Geometry.Point): boolean;

            containsExtent(extent: NPMapLib.Geometry.Extent): boolean;
        }

        export interface Pixel {
            x: number;
            y: number;

            equals(other: NPMapLib.Geometry.Pixel): boolean;
        }

        export interface Size {
            equals(): boolean;
        }

        //export function Point(lon: number, lat: number): void;
        export class Point {
            constructor(lon: number, lat: number)
        }

        export interface Point {
            lon: number;
            lat: number;

            clone(): NPMapLib.Geometry.Point;

            equals(other: NPMapLib.Geometry.Point): boolean;

            toGeoJson(): string;

            toString(): string;

            transform(source: string, dest: string): void;
        }

        export interface _PolygonStyle {
            color?: string;
            fillColor?: string;
            lineStyle?: string;
            weight?: number;
            opacity?: number;
            fillOpacity?: number;
        }

        //export function Polygon(points: Array<NPMapLib.Geometry.Point>, opts: _PolygonStyle): void;
        export class Polygon {
            constructor(points: Array<NPMapLib.Geometry.Point>, opts: _PolygonStyle)
        }

        export interface Polygon extends Overlay {
            flashStop(): void;

            getArea(units: string): string;

            getExtent(): NPMapLib.Geometry.Extent;

            // 获得多边形的点数组
            getPath(): Array<Point>;

            resetIcon(icon: string): void;
        }

        export interface _PolylineStyle {
            color?: string;
            fillColor?: string;
            lineStyle?: string;
            weight?: number;
            opacity?: number;
            fillOpacity?: number;
            pointRadius?: number;
            text?: string;
        }

        //export function Polyline(points: Array<Point>, opts: _PolylineStyle):void;
        export class Polyline {
            constructor(points: Array<Point>, opts: _PolylineStyle)
        }

        export interface Polyline extends Overlay {
            getLineStyle(): string;

            getLength(): number;

            getColor(): string;

            setColor(style: string): void;

            setLineStyle(lineStyle: string): void;

            setOpacity(opacity: number): void;

            setPath(path: Array<Point>): void;

            setStyle(style: { color?: string, opacity?: number, weight?: number, lineStyle?: number }): void;

            setWeight(weight: number): void;

            getOpacity(): number;

            getPath(): Array<Point>;

            addEventListener(): void;

            removeEventListener(): void;
        }

        export interface _CircleStyle {
            color?: string;
            fillColor?: string;
            weight?: number;
            opacity?: number;
            fillOpacity?: number;
            lineStyle?: string;
            strokeColor?: string;
            strokeOpacity?: number;
            strokeWidth?: number;
        }

        //export function Circle(center: Point, radius: number, opts: _CircleStyle): void;
        export class Circle {
            constructor(center: Point, radius: number, opts: _CircleStyle)
        }

        export interface Circle extends Overlay {
            // 返回圆的面积
            getArea(): number;

            // 返回中心点的坐标
            getCenter(): Point;

            // 返回圆形的边线颜色
            getColor(): string;

            getExtent(): NPMapLib.Geometry.Extent;

            getPoints(): Array<Point>;

            getRadius(): number;

            setCenter(center: NPMapLib.Geometry.Point): void;

            setColor(color: string): void;

            setFillColor(color: string): void;

            setFillText(text: string, fontSize: number): void;

            setRadius(radius: number): void;

            setStyle(style: { color?: string, fillColor?: string, weight?: number, opacity?: number, fillOpacity?: number, lineStyle?: string, text: string }): void;

            addEventListener(): void;

            removeEventListener(): void;
        }

    }
}

declare namespace NPMapLib{
    namespace Tools{
        export interface IMeasureToolOptions{
            lengthUnit:string;
            areaUnit:string;
            mode:string
        }
        export class MeasureTool {
            constructor(mapId: string, MeasureToolOptions?:IMeasureToolOptions)
        }
        interface MeasureTool{
            cancel():void;
            finishGeometry():void;
            setMode(model:string,callback?:Function,closeCallback?:Function):void;
            startUp():void;
            stop():void;
        }
    }
}

declare namespace NPMapLib {
    namespace Symbols {

        import Size = NPMapLib.Geometry.Size;

        interface InfoWindowOpts {
            width?: number; // 信息窗宽度
            height?: number; // 信息窗高度
            offset?: NPMapLib.Geometry.Size; // 信息窗位置偏移值
            iscommon?: boolean; // 是否为普通的信息窗，普通的不带箭头,默认false
            enableCloseOnClick?: boolean; // 默认false，是否开启改变地图（移动或缩放）关闭信息窗口（默认关闭）
            autoSize?: boolean; // 默认true, 窗口大小是否自适应
            paddingForPopups?: NPMapLib.Geometry.Extent; // 信息窗自动弹回后，距离四边的值。isAdaptation为true时，该设置有效
            isAdaptation?: boolean; // 默认true, 信息窗打开时，地图是否平滑移动，默认不平滑移动
            useDomStyle?: boolean;
            positionBlock?: { // 箭头样式
                imageSrc?: string;
                imageSize?: NPMapLib.Geometry.Size;
                offset?: NPMapLib.Geometry.Size;
            }

        }

        /**
         *
         * @param point
         * @param title 标题内容
         * @param dom 填充DOM，dom 和 title 互斥，只能设置一个
         * @param opts
         * @constructor
         */
            //function InfoWindow(point: NPMapLib.Geometry.Point, title: string, dom: HTMLDocument, opts: InfoWindowOpts): void;
        export class InfoWindow {
            constructor(point: NPMapLib.Geometry.Point, title: string, dom: HTMLDocument, opts: InfoWindowOpts)
        }

        export interface InfoWindow {
            close(): void;

            getBaseDiv(): void;

            getContentDivStyle(): Object;

            getPosition(): NPMapLib.Geometry.Point;

            getPositionByInfowindow(position: NPMapLib.Geometry.Point, size: NPMapLib.Geometry.Size): void;

            hide(): void;

            moveTo(point: NPMapLib.Geometry.Point): void;

            /**
             * 打开
             * @param size 信息窗大小 可不用设置
             * @param isMapAdjust 是否根据窗口位置，调整地图中心点
             */
            open(size?: NPMapLib.Geometry.Size, isMapAdjust?: boolean): void;

            /**
             * 设置信息窗口内容
             * @param content
             */
            setContent(content: string): void;

            /**
             * 设置DOM对象
             * @param dom
             */
            setContentDom(dom: HTMLDocument): void;

            /**
             * 设置信息窗的地理坐标
             * @param point
             */
            setPosition(point: NPMapLib.Geometry.Point): void;

            /**
             * 设置信息窗口的大小
             * @param size
             */
            setSize(size: NPMapLib.Geometry.Size): void;

            /**
             * 显示
             */
            show(): void;

            /**
             * 更新位置
             */
            updatePosition(): void;

            /**
             * 根据DOM元素更新信息窗的大小。
             * @param size
             */
            updateSize(size: NPMapLib.Geometry.Size): void;

            /**
             * 添加事件监听函数
             * @param event
             * @param handler
             */
            addEventListener(event: string, handler: Function): void;

            /**
             * 移除事件监听函数
             * @param event
             */
            removeEventListener(event: string): void;
        }

        //function ClusterMarker(location: {lon: number, lat: number}, opt: {markType: string}): void;
        class ClusterMarker {
            constructor(location: { lon: number, lat: number }, opt: { markType: string })
        }

        export interface ClusterMarker {
            deviceID: string;
            markType: string;
            titleName: string;
            location: { lat: number, lon: number, _visible: boolean };

            changeStyle(style: Object, redraw: boolean): any;

            flash(flashCount: number): void;

            flashStop(): void;

            getData(): Object;

            getPosition(): NPMapLib.Geometry.Point;

            setPosition(point: NPMapLib.Geometry.Point): void;

            setVisible(visible: boolean): void;
        }

        //function ClusterPoints(dataJson: Array<NPMapLib.Symbols.ClusterMarker>, opt: {distance?: number, opactiy?: number, threshold: number}): void;
        export class ClusterPoints {
            constructor(dataJson: Array<NPMapLib.Symbols.ClusterMarker>, opt: { distance?: number, opactiy?: number, threshold: number })
        }

        export interface ClusterPoints {
            getClusterPoints(): Array<NPMapLib.Symbols.ClusterMarker>;

            getMarkersByMarkType(markType: string): NPMapLib.Symbols.ClusterMarker;
        }

        //export function Icon(imageUrl: string, size: NPMapLib.Geometry.Size, opts?: {anchor: NPMapLib.Geometry.Size}): void;
        export class Icon {
            constructor(imageUrl: string, size: NPMapLib.Geometry.Size, opts?: { anchor: NPMapLib.Geometry.Size })
        }

        export interface Icon {
            getImageSize(): NPMapLib.Geometry.Size;

            getImageUrl(): string;

            setImageSize(size: NPMapLib.Geometry.Size): void;

            setImageUrl(imageUrl: string): void;
        }

        //export function Label(content: string, opts: {offset: NPMapLib.Geometry.Size, position: NPMapLib.Geometry.Point}): void;
        export class Label {
            constructor(content: string, opts: { offset: NPMapLib.Geometry.Size, position: NPMapLib.Geometry.Point })
        }

        export interface Label extends NPMapLib.Overlay {
            getPosition(): NPMapLib.Geometry.Point;

            setContent(content: string): void;

            setPosition(position: NPMapLib.Geometry.Point): void;

            setStyle(styles: { fontSize: number, fontFamily: string, color: string, align: string, isBold: boolean }): void;

            addEventListener(event: string, handler: Function): void;

            removeEventListener(event: string): void;
        }

        //export function Marker(point: NPMapLib.Geometry.Point, opts?: {title?: string, icon?: NPMapLib.Symbols.Icon, rotation?: number, offset?: Size}): void;
        export class Marker {
            constructor(point: NPMapLib.Geometry.Point, opts?: { title?: string, icon?: NPMapLib.Symbols.Icon, rotation?: number, offset?: Size })
        }

        export interface Marker extends NPMapLib.Overlay {
            getPosition(): NPMapLib.Geometry.Point;

            hideLabel(): void;

            moveTo(point: NPMapLib.Geometry.Point): void;

            setIcon(icon: NPMapLib.Symbols.Icon): void;

            setLabel(label: NPMapLib.Symbols.Label): void;

            setPosition(point: NPMapLib.Geometry.Point): void;

            showLabel(): void;

            addEventListener(event: string, handler: Function): void;

            removeEventListener(event: string): void;

            setData(data: Object): void;

            getData(): Object;
            setZIndex?(zIndex: number): void;
        }

        export interface _AnimationLineOpts {
            color: string;
            opacity: number;
            weight: number;
            headerMarker: NPMapLib.Symbols.Marker;
        }

        //export function AnimationLine(mapId: number, points: Array<NPMapLib.Geometry.Point>, opts: _AnimationLineOpts): void;
        export class AnimationLine {
            constructor(mapId: number, points: Array<NPMapLib.Geometry.Point>, opts: _AnimationLineOpts)
        }

        export interface _AnimationLinePreDrawEvent {
            eventType: string;
            index: number;
            point: NPMapLib.Geometry.Point;
            srcObject: AnimationLine;
        }

        export interface _AnimationLineAfterDrawEvent {

        }

        export interface _AnimationLineAfterStepEvent {

        }

        export interface AnimationLine {
            afterPosition(): void;

            appendPoints(points: Array<NPMapLib.Geometry.Point>): void;

            nextPosition(): void;

            pause(): void;

            remove(): void;

            restart(): void;

            setLayer(layer: NPMapLib.Layer): void;

            setPosition(pointIndex: number, stepIndex: number): void;

            setSpeed(speed: number): void;

            setStyle(s: { color: string, opacity: number, weight: number }): void;

            start(): void;

            stop(): void;

            addEventListener(event: string, callBack: Function): void;

            removeEventListener(event: string, callBack: Function): void;

            events: any; // 用来注册一些其他事件
        }
    }
}

declare namespace NPMapLib {
    function Control(): void;

    export interface Control {

    }
}

declare namespace NPMapLib {
    interface Controls {
    }

    namespace Controls {
        //function MousePositionControl(): void;
        export class MousePositionControl {
            constructor()
        }

        interface MousePositionControl {

        }
    }
}

declare namespace NPMapLib {

    //export let Layers: {[key: string]: any};
    namespace Layers {

        export interface OverlayLayerOpts {
            mouseover?: (marker: NPMapLib.Symbols.ClusterMarker) => void;
            mouseout?: (marker: NPMapLib.Symbols.ClusterMarker) => void;
            click?: (marker: NPMapLib.Symbols.ClusterMarker) => void;
            clusteronmouseover?: Function;
            getUrl?: (count: number, marker: NPMapLib.Symbols.ClusterMarker) => string;
            getImageSize?: (count: number, marker: NPMapLib.Symbols.ClusterMarker) => { width: number, height: number };
            getContent?: Function;
            getRotation?: (count: number, marker: NPMapLib.Symbols.ClusterMarker) => number;
            maxZoom?: number;
            fontColor?: string;
            fontSize?:number;
            clusterClickModel?: string;
            selectZoom?: number;
            distance?: number;
            minClusterCount?: number;
            getBackGroundColor?: (marker: NPMapLib.Symbols.ClusterMarker) => string;
            getCustomLabelOffset?: (marker: NPMapLib.Symbols.ClusterMarker) => { width: number, height: number };
            getClusterBGColor?: (marker: NPMapLib.Symbols.ClusterMarker) => string;
            getClusterBGStroke?: (marker: NPMapLib.Symbols.ClusterMarker) => string;
            getBackGroundStroke?: (marker: NPMapLib.Symbols.ClusterMarker) => string;
            showOrHideArrow?: (count:number,marker: NPMapLib.Symbols.ClusterMarker) => void;
            clusterclick?: Function;
            isBaseLayer?: boolean;
            opacity?: number;
            projection?: string;
            visible?: boolean;
            radius?: number;
            labelBackGroundRXY?:number;
            labelBackGroundMargin?:number;
            isAsynchronous?:boolean;
            labelYOffset?:number
        }

        //export function OverlayLayer(name: string, userCluster?: boolean, opts?: OverlayLayerOpts): void;
        export class OverlayLayer {
            constructor(name: string, userCluster?: boolean, opts?: OverlayLayerOpts)
        }

        interface OverlayLayer extends NPMapLib.Layer {
            addClusterPoints(clusterMarkers: Array<NPMapLib.Symbols.ClusterMarker>): void;

            addGroup(groupName: string): NPMapLib.Layers.LayerGroup;

            addOverlay(overlay: NPMapLib.Overlay): void;

            addOverlays(overlays: Array<NPMapLib.Overlay>): void;

            containFeatures(geometry: NPMapLib.Geometry, filter: Function): Array<NPMapLib.Overlay>;

            getAllGroups(): void;

            getGroupByName(groupName: string): NPMapLib.Layers.LayerGroup;

            getOverlays(): Object;

            getOverlaysArry(): Array<NPMapLib.Overlay>;

            getOverlaysByProperty(fieldName: string, value: Object): Array<NPMapLib.Overlay>;

            removeAllGroups(): void;

            removeAllOverlays(): void;

            removeGroup(groupName: string): void;

            removeOverlay(id: NPMapLib.Overlay | number): void;

            setClusterStatistics(statistics: Array<Object>): void;

            setMakrerTypeVisiable(markerType: string, visible: boolean): void;
        }


        //export function HeatMapLayer(name: string, userCluster?: boolean, opts?: OverlayLayerOpts): void;
        export class HeatMapLayer {
            constructor(name: string,opts?: OverlayLayerOpts)
        }

        interface HeatMapLayer extends NPMapLib.Layer {
            setDataset(Object: any): void;
        }

        interface LayerGroup extends NPMapLib.Layer {
            addOverlays(overlays: Array<NPMapLib.Overlay>): void;
            addOverlay(overlay: NPMapLib.Overlay): void;
            removeAllOverlays():void;
            getAllOverlayers():Array<NPMapLib.Overlay>
        }
    }
}

declare namespace NPMapLib {
    export const MAP_EVENT_CLICK :string;
    export const MAP_EVENT_DBLCLICK :string;
    export const MAP_EVENT_RIGHT_CLICK :string;
    export const MAP_EVENT_MOUSE_MOVE :string;
    export const MAP_EVENT_MOUSE_OVER :string;
    export const MAP_EVENT_MOUSE_OUT :string;
    export const MAP_EVENT_ZOOM_START :string;
    export const MAP_EVENT_ZOOM_END :string;
    export const MAP_EVENT_ADD_CONTROL :string;
    export const MAP_EVENT_REMOVE_CONTROL :string;
    export const MAP_EVENT_DRAGGING :string;
    export const MAP_EVENT_DRAG_START :string;
    export const MAP_EVENT_DRAG_END :string;
    export const MAP_EVENT_MOVE_END :string;
    export const MAP_EVENT_RESIZE :string;
    export const MAP_EVENT_ZOOMCHANGE :string;
    export const MAP_EVENT_MOVE_START :string;

    export const INFOWINDOW_EVENT_CLOSE :string;
    export const INFOWINDOW_EVENT_OPEN :string;
    export const INFOWINDOW_EVENT_HIDE :string;

    // 线箭头类型 【双向】
    export const LINE_ARROW_TYPE_BOTH :string;
    // 线箭头类型 【带箭头，正向】
    export const LINE_ARROW_TYPE_FORWORD :string;
    // 线箭头类型 【不带箭头（默认）】
    export const LINE_ARROW_TYPE_NULL :string;
    // 线箭头类型 【带箭头，反向】
    export const LINE_ARROW_TYPE_REVERSE :string;
    // 线形 虚线
    export const LINE_TYPE_DASH :string;
    // 线形 虚线（中间夹杂点点)
    export const LINE_TYPE_DASHDOTDOT :string;
    // 线形 点
    export const LINE_TYPE_DOT :string;
    // 线形 实线（默认）
    export const LINE_TYPE_SOLID :string;

    export const ANIMATION_EVENT_START :string;
    export const ANIMATION_EVENT_PAUSE :string;
    export const ANIMATION_EVENT_STOP :string;
    export const ANIMATION_EVENT_MOVING :string;
    export const ANIMATION_EVENT_MOVED :string;


    export const MARKER_EVENT_CLICK :string;
    export const MARKER_EVENT_DBLCLICK :string;
    export const MARKER_EVENT_RIGHT_CLICK :string;
    export const MARKER_EVENT_MOUSE_DOWN :string;
    export const MARKER_EVENT_MOUSE_UP :string;
    export const MARKER_EVENT_MOUSE_OVER :string;
    export const MARKER_EVENT_MOUSE_OUT :string;
    export const MARKER_EVENT_DRAG_START :string;
    export const MARKER_EVENT_DRAG_END :string;
    export const MEASURE_MODE_DISTANCE:string;
    export const MEASURE_MODE_AREA:string;
    export const MAP_UNITS_METERS:string;
    export const MAP_UNITS_SQUARE_KILOMETERS:string;
}

declare namespace MapPlatForm {

    namespace Base {
        //export function MapTools(map: NPMapLib.Map): void;
        export class MapTools {
            constructor(map: NPMapLib.Map)
        }

        export interface MapTools {
            // 添加圆查询控件，用来支持圆搜索
            addCircleSearchControl(center: NPMapLib.Geometry.Point, callback: Function, minDistance: number, maxDistance: number): void;

            // 停止绘制
            cancelDraw(): void;

            // 停止量算
            cancelMeasure(): void;

            // 绘制圆
            drawCircle(callBackMethod: Function): void;

            // 两点直径绘制圆
            drawCircleByDiameter(callBackMethod: Function): void;

            // 绘制线
            drawLine(callBackMethod: Function): void;

            // 绘制多边形
            drawPolygon(callBackMethod: Function): void;

            // 绘制矩形
            drawRectangle(callBackMethod: Function): void;

            // 面积测量
            measureArea(): void;

            // 距离测量
            measureDistance(): void;

            // 移除圆搜索
            removeCircleSearchControl(): void;
        }


        export class MapConfig {
            constructor()
        }

        export interface MapConfig {
            showVectorLayer(): void;

            showSattilateLayer(): void;
        }
    }
}