/// <reference path="../../../@types/map/index.d.ts" />

import { SystemPoint } from "../../../core/entity/SystemPoint";

declare let require: any;
import "heatmap";
import "npgis2";
import "es6-promise";
import OverlayLayerOpts = NPMapLib.Layers.OverlayLayerOpts;
import InfoWindowOpts = NPMapLib.Symbols.InfoWindowOpts;
import { MapConfigModel } from "./core/model/map.config.model";
import { InfoWindowFactory } from "./core/model/infowindow.factory";
import { OverlayFactory } from "./core/model/overlay.factory";
import { ClusterMarkerFactory } from "./core/model/cluster.factory";
import { MapAdapter } from "./core/MapAdapter";
import { LocateMouseEventUtil } from "./core/utils/LocateMouseEventUtil";
import { MapBaseLayerUtil } from "./core/utils/MapBaseLayerUtil";
import { MapToolBar } from "./business/MapToolBar";
import {
    INPGisMapMain, PolylineStyle, PolygonStyle, InfoWindowEvent, CircleStyle,
    ClusterMarkerEx, TraceAnalyzeOpts, MarkersOpts, IMeasureToolOptions
} from "./map.interface";
import OverlayLayer = NPMapLib.Layers.OverlayLayer;
import { TraceAnalyzeFactory } from "./core/model/trace.analyze.factory";
import Marker = NPMapLib.Symbols.Marker;

let Promise = require("es6-promise");
const ClusterLayerName = "ClusterLayer";
declare let h337: any, angular: any;

/**
 * 接口定义文件, 展示所有对外提供的接口
 */

export class NPGisMapMain implements INPGisMapMain {
    mapConfig: any;

    restartTraceAnalyze(lineId: string): void {
        this.traceAnalyzeFactory.reStartTraceAnalyze(lineId);
    }

    createTraceAnalyze(origins: Array<SystemPoint>, opts?: TraceAnalyzeOpts): string {
        if (angular.isArray(origins)) {
            let points = [] as Array<NPMapLib.Geometry.Point>;
            angular.forEach(origins, (val: SystemPoint) => {
                if (val) {
                    points.push(this.mapAdapter.getPoint(val.Lon, val.Lat));
                }
            });
            return this.traceAnalyzeFactory.createTraceAnalyze(points, opts);
        } else {
            return null;
        }
    }

    startTraceAnalyze(lineId: string): void {
        this.traceAnalyzeFactory.startTraceAnalyze(lineId);
    }

    stopTraceAnalyze(lineId: string): void {
        this.traceAnalyzeFactory.stopTraceAnalyze(lineId);
    }

    pauseTraceAnalyze(lineId: string, flag: boolean): void {
        this.traceAnalyzeFactory.pauseTraceAnalyze(lineId, flag);
    }

    clearTraceAnalyze(lineId: string): void {
        this.stopTraceAnalyze(lineId);
        this.traceAnalyzeFactory.clearTraceAnalyze(lineId);
    }

    setTraceAnalyzeSpeed(lineId: string, speed: number): void {
        this.traceAnalyzeFactory.setSpeed(lineId, speed);
    }

    setClusterMarkerVisibleByLayerType(layerType: string, visible: boolean): void {
        let layer = this.mapAdapter.getLayerByName(ClusterLayerName) as OverlayLayer;
        layer.setMakrerTypeVisiable(layerType, visible);
        layer.refresh();
    }

    drawPolygon(callBackMethod?: (points: Array<NPMapLib.Geometry.Point>) => void, style?: PolygonStyle): void {
        this.mapTools.drawPolygon((extent: NPMapLib.Geometry.Extent, geometry: NPMapLib.Geometry.Polygon) => {
            if (callBackMethod) {
                callBackMethod(geometry.getPath());
            }
        }, style);
    }

    drawLine(callBackMethod?: (points: Array<NPMapLib.Geometry.Point>) => void, style?: PolylineStyle): void {
        this.mapTools.drawLine((extent: NPMapLib.Geometry.Extent, geometry: NPMapLib.Geometry.Polyline) => {
            if (callBackMethod) {
                callBackMethod(geometry.getPath());
            }
        }, style);
    }

    drawRectangle(callBackMethod?: (points: Array<NPMapLib.Geometry.Point>) => void, style?: PolygonStyle): void {
        this.mapTools.drawRectangle((extent: NPMapLib.Geometry.Extent, geometry: NPMapLib.Geometry.Polygon) => {
            if (callBackMethod) {
                callBackMethod(geometry.getPath());
            }
        }, style);
    }

    drawCircle(callBackMethod?: (center: NPMapLib.Geometry.Point, radius: number) => void, style?: CircleStyle): void {
        this.mapTools.drawCircle((extent: NPMapLib.Geometry.Extent, geometry: NPMapLib.Geometry.Circle) => {
            if (callBackMethod) {
                callBackMethod(geometry.getCenter(), geometry.getRadius());
            }
        }, style);
    }

    clearDraw(): void {
        this.cancelDraw();
        this.cancelMeasure();
        let overlays = this.mapTools.getSelectGeometrys();
        if (!overlays) return;
        let i, len;
        for (i = 0, len = overlays.length; i < len; i++) {
            this.mapAdapter.removeOverlay(overlays[i]);
        }
        this.mapTools.resetSelectGeometrys();
    }

    measureDistance(): void {
        this.measureTool.setMode(NPMapLib.MEASURE_MODE_DISTANCE)
    }
    measureArea(): void {
        this.measureTool.setMode(NPMapLib.MEASURE_MODE_AREA)
    }

    cancelMeasure(): void {
        this.measureTool.cancel();
    }

    selectLine(callBackMethod?: (points: Array<SystemPoint>) => void, style?: PolylineStyle): void {
        this.mapTools.drawLine((extent: NPMapLib.Geometry.Extent, geometry: NPMapLib.Geometry.Polyline) => {
            //TODO 因npgis本身api不支持, 故未实现线选
            console.error("线选功能暂未实现.");

        }, style);
    }

    selectPolygon(callBackMethod?: (points: Array<SystemPoint>, geometry: NPMapLib.Geometry.Polygon) => void, style?: PolygonStyle): void {
        this.mapTools.drawPolygon((extent: NPMapLib.Geometry.Extent, geometry: NPMapLib.Geometry.Polygon) => {
            if (callBackMethod) {
                callBackMethod(this.getSelectPoints(geometry), geometry);
            }
        }, style);
    }

    selectRectangle(callBackMethod?: (points: Array<SystemPoint>, geometry: NPMapLib.Geometry.Polygon) => void, style?: PolygonStyle): void {
        this.mapTools.drawRectangle((extent: NPMapLib.Geometry.Extent, geometry: NPMapLib.Geometry.Polygon) => {
            if (callBackMethod) {
                callBackMethod(this.getSelectPoints(geometry), geometry);
            }
        }, style);
    }

    selectCircle(callBackMethod?: (points: Array<SystemPoint>, geometry: NPMapLib.Geometry.Circle) => void, style?: CircleStyle): void {
        this.mapTools.drawCircle((extent: NPMapLib.Geometry.Extent, geometry: NPMapLib.Geometry.Circle) => {
            if (callBackMethod) {
                callBackMethod(this.getSelectPoints(geometry), geometry);
            }
        }, style);
    }

    removeOverlay(overlay: NPMapLib.Overlay) {
        this.mapTools.removeOverlay(overlay);
        this.map.removeOverlay(overlay)
    }

    // TODO
    drawCircleByDiameter(callBackMethod?: Function): void {

    }

    cancelDraw(): void {
        this.removeCircleSearchControl();
        this.mapTools.cancelDraw();
    }

    /**
     * 获得select操作选中的点位
     * @param geometry
     * @returns {Array}
     */
    private getSelectPoints(geometry: NPMapLib.Geometry): Array<SystemPoint> {
        let points = this.clusterMarkerFactory.getPoints() || [];
        // let i, len, result: Array<SystemPoint> = [];
        let i, len, result: Array<SystemPoint> = [];
        let overlayLayer = this.map.getLayerByName(ClusterLayerName) as OverlayLayer;
        //console.log("getBounds()",geometry.getBounds(), geometry.getExtent());
        overlayLayer.containFeatures(geometry, (marker: ClusterMarkerEx) => {
            result.push({
                ID: marker.ID,
                Descrption: marker.Descrption,
                LayerType: marker.markType,
                ObjectID: marker.ObjectID,
                ObjectType: marker.ObjectType,
                Lon: marker.getPosition().lon,
                Lat: marker.getPosition().lat,
                ObjectState: marker.ObjectState,
                ObjectName: marker.ObjectName,
                TaskStatus: marker.TaskStatus
            } as SystemPoint);
        });
        return result;
    }

    // TODO
    addCircleSearchControl(point: any, callback: any, min: number, max: number): void {
        let self = this;
        self.removeCircleSearchControl();
        this.mapTools.addCircleSearchControl(point, (res: NPMapLib.Geometry) => {
            if (callback) {
                callback(self.getSelectPoints(res));
            }
            // self.removeCircleSearchControl();
        }, min, max);
    }

    // TODO
    removeCircleSearchControl(): void {
        this.mapTools.removeCircleSearchControl();
    }

    /**
     * 创建一个窗口, 返回窗口的唯一编码
     * @param lon
     * @param lat
     * @param eventOpt
     * @returns {uuid: string}
     */
    createInfoWindow(lon: number, lat: number, infoWindowOpt?: InfoWindowOpts): string {
        let infoWindow = InfoWindowFactory.getInfoWindow(new NPMapLib.Geometry.Point(lon, lat), null, null, InfoWindowFactory.getInfoWindowOpts(infoWindowOpt));
        return this.infoWindowFactory.addInfoWindow(infoWindow);
    }

    getInfoWindowByID(uuid: string): NPMapLib.Symbols.InfoWindow {
        return this.infoWindowFactory.getById(uuid);
    }

    closeInfoWindow(winId: string) {
        this.mapAdapter.closeInfoWindow(this.infoWindowFactory.removeInfoWindow(winId));
    }

    openInfoWindow(winId: string, domHtml: HTMLDocument, eventOpt?: InfoWindowEvent): void {
        let win = this.infoWindowFactory.getById(winId);
        this.infoWindowFactory.addEventListener(win, winId, eventOpt);
        this.mapAdapter.addOverlay(win);
        win.setContentDom(domHtml);
        win.open();
    }

    // 渲染单个点位到地图中
    renderMarker(point: SystemPoint) {
        if (!point) return;
        // this.clusterMarkerFactory.removePointByParams("ObjectID", point.ObjectID);
        this.clusterMarkerFactory.addPoint(point);
        this.refreshMarker();
    }

    private mockPoints(points: Array<SystemPoint>): Array<SystemPoint> {
        if (points && points.length > 0) {
            // 随机将其中几个变为别的点位类型
            let i, len, num;
            for (i = 0, len = points.length; i < len; i++) {
                num = Math.round(Math.random() * 10);
                if (num === 2 || num === 3 || num === 4 || num === 5) {
                    points[i].LayerType = "ball";
                }
            }

        }
        return points;
    }

    //TODO 加载点位 图层 覆盖物
    /**
     * 加载坐标点位到地图中
     * @param points
     * @param opts
     */
    renderMarkers(points: Array<SystemPoint>, opts?: OverlayLayerOpts): any {
        // TODO 这里只是为了模拟不同点位类型用, 等摄像机点位真正有其他类型时使用的时候需要注释掉下面的代码 resolve: wyr
        // points = this.mockPoints(points);
        this.clusterMarkerFactory.setPoints(points);
        let clusterPoints = this.clusterMarkerFactory.getClusterPoints(points);
        let overlayLayer = this.map.getLayerByName(ClusterLayerName);
        if (!overlayLayer) {
            // 渲染到地图中
            overlayLayer = new NPMapLib.Layers.OverlayLayer(ClusterLayerName, true, OverlayFactory.getClusterOverlayOpt(opts));

            this.map.addLayer(overlayLayer);
        }

        overlayLayer.addOverlay(clusterPoints as NPMapLib.Overlay);
    }

    getTotalPoints(LayerType?: string) {
        let pointArrAll: Array<SystemPoint> = this.map.getLayerByName(ClusterLayerName).getOverlaysByProperty(),
            pointArr = [] as Array<SystemPoint>;
        if (LayerType) {
            pointArrAll.forEach((value: SystemPoint, index: number) => {
                if (value.LayerType == LayerType) {
                    pointArr.push(pointArrAll[index])
                }
            });
        } else {
            pointArr = pointArrAll;
        }
        return pointArr;
    }

    setOverlayShowByLayerType(LayerType: string, style: boolean) {
        let arr = [] as Array<any>;
        if (LayerType == 'all') {
            arr = this.getTotalPoints();
        } else {
            arr = this.getTotalPoints(LayerType);
        }
        arr.forEach((item: any, index) => {
            let marker = item as NPMapLib.Symbols.Marker;
            if (style) {
                item.setVisible(true)
            } else {
                item.setVisible(false)
            }
        })
    }


    /**
     * @title添加地图点位连线(之后会背轨迹覆盖)
     * @param {string} layerName
     * @param {string} groupName
     * @param {Array<SystemPoint>} points
     * @param {PolylineStyle} opts
     */
    addOverlaysForLine(layerName: string, groupName: string, points: Array<SystemPoint>, opts?: PolylineStyle) {
        let layer = this.map.getLayerByName(layerName);
        layer.setZIndex(200);
        let group = layer.getGroupByName(groupName);
        if (!group) {
            group = layer.addGroup(groupName);
        }
        let arr = [] as Array<NPMapLib.Geometry.Point>;
        points.forEach((item: SystemPoint) => {
            if (item) {
                arr.push({ lat: item.Lat, lon: item.Lon } as NPMapLib.Geometry.Point)
            }
        });
        let polyline = new NPMapLib.Geometry.Polyline(arr, opts);
        group.addOverlay(polyline);

    }

    renderOverlayLayer(layerName: string) {
        let layer = this.map.getLayerByName(layerName);
        if (!layer) {
            let overlayLayerMarkers: NPMapLib.Layers.OverlayLayer = new NPMapLib.Layers.OverlayLayer(layerName);
            this.map.addLayer(overlayLayerMarkers);
        }
    }

    //TODO 标注添加在图层名和组名下便于清楚 flag和lables用于自定义地图标注文字
    /**
     * @title 批量添加地图标注
     * @param {string} layerName
     * @param {string} groupName
     * @param {Array<SystemPoint>} points
     * @param {MarkersOpts} opts
     * @param {boolean} flag
     * @param {Array<any>} labels
     */
    addOverlaysForMakers(layerName: string, groupName: string, points: Array<SystemPoint>, opts?: MarkersOpts, flag?: boolean, labels?: Array<any>) {
        let layer = this.map.getLayerByName(layerName);
        let group = layer.getGroupByName(groupName);
        if (!group) {
            group = layer.addGroup(groupName);
        }
        let arrMarkers = [] as Array<NPMapLib.Overlay>;
        let iconURL = opts.iconURL || '/images/map/normal-blue.png';
        points.forEach((item: SystemPoint, i: number) => {
            if (item) {
                let point = {} as NPMapLib.Geometry.Point;
                point.lat = item.Lat;
                point.lon = item.Lon;
                let icon = new NPMapLib.Symbols.Icon(iconURL, new NPMapLib.Geometry.Size(32, 32), {
                    anchor: new NPMapLib.Geometry.Size(-19, -23)
                });
                let marker = new NPMapLib.Symbols.Marker(point, {
                    icon: icon,
                    title: opts.title,
                    rotation: opts.rotation
                });
                let lable: NPMapLib.Symbols.Label;
                if (flag) {
                    lable = new NPMapLib.Symbols.Label(labels[i], {
                        "position": point,
                        "offset": new NPMapLib.Geometry.Size(-3, 12)
                    });
                } else {
                    lable = new NPMapLib.Symbols.Label(i + 1 + '', {
                        "position": point,
                        "offset": new NPMapLib.Geometry.Size(-3, 12)
                    });
                }
                lable.setStyle({ fontSize: 12, fontFamily: 'Arail', color: 'white', align: 'center', isBold: true });
                marker.setLabel(lable);
                marker.setData({ id: item.ID, ObjectID: item.ObjectID, resultID: item.resultID });
                arrMarkers.push(marker);
            }
        });
        group.addOverlays(arrMarkers as Array<NPMapLib.Overlay>);
        let arr = group.getAllOverlayers();
        arr.forEach((marker: NPMapLib.Symbols.Marker, i: number) => {
            this.bindMakersEvent(marker, opts);
            marker.setZIndex(i + 1);
        })
    }

    /**
     * @title 绑定地图标注事件
     * @param {NPMapLib.Symbols.Marker} marker
     * @param {MarkersOpts} opts
     */
    bindMakersEvent(marker: NPMapLib.Symbols.Marker, opts?: MarkersOpts) {
        if (typeof opts.click === "function") {
            marker.addEventListener(NPMapLib.MARKER_EVENT_CLICK, (evt: ClusterMarkerEx) => {
                opts.click(evt)
            })
        }
        if (typeof opts.mouseOver === "function") {
            marker.addEventListener(NPMapLib.MARKER_EVENT_MOUSE_OVER, (evt: ClusterMarkerEx) => {
                opts.mouseOver(evt)
            })
        }
        if (typeof opts.mouseOut === "function") {
            marker.addEventListener(NPMapLib.MARKER_EVENT_MOUSE_OUT, (evt: ClusterMarkerEx) => {
                opts.mouseOut(evt)
            })
        }
        if (typeof opts.dragStart === "function") {
            marker.addEventListener(NPMapLib.MARKER_EVENT_DRAG_START, (evt: ClusterMarkerEx) => {
                opts.dragStart(evt)
            })
        }
        if (typeof opts.dragEnd === "function") {
            marker.addEventListener(NPMapLib.MARKER_EVENT_DRAG_END, (evt: ClusterMarkerEx) => {
                opts.dragEnd(evt)
            })
        }
    }

    /**
     * @title 清楚群组和图层
     * @param {string} layerName
     * @param {string} groupName
     */
    removeOverlaysByName(layerName: string, groupName: string) {
        let layer = this.map.getLayerByName(layerName);
        if (layer) {
            let group = layer.getGroupByName(groupName);
            if (group) {
                group.removeAllOverlays();
            }
            this.map.removeOverlay(layer);
        }
    }

    /**
     * @title 标注是用来绑定检索结果的，回增加
     * @param {string} layerName
     * @param {string} groupName
     * @param {string} ID
     * @return {NPMapLib.Symbols.Marker}
     */
    getMarkerForID(layerName: string, groupName: string, ID: string): NPMapLib.Symbols.Marker {
        let layer = this.map.getLayerByName(layerName);
        let group = layer.getGroupByName(groupName);
        let arrMarks = group.getAllOverlayers();
        let marker: NPMapLib.Symbols.Marker;
        for (let i = 0; i < arrMarks.length; i++) {
            let m = arrMarks[i] as NPMapLib.Symbols.Marker;
            let s = m.getData() as any;
            if (ID === s.resultID) {
                marker = m;
                break;
            }
        }
        return marker;
    }

    /**
     * @title setMarkIcon创建标注图标对象
     * @param {string} layerName
     * @param {string} groupName
     * @param {string} ID
     * @param {string} path
     * @param {number} zIndex
     */
    setMarkerIcon(layerName: string, groupName: string, ID: string, path: string, zIndex?: number) {
        let marker = this.getMarkerForID(layerName, groupName, ID);
        if (marker) {
            marker.setIcon(
                new NPMapLib.Symbols.Icon(
                    path,
                    new NPMapLib.Geometry.Size(32, 32),
                    { anchor: new NPMapLib.Geometry.Size(-19, -23) }
                )
            );
            if (typeof zIndex === 'number') marker.setZIndex(zIndex + 1);
        }
    }

    //热力图
    addheatlayer(points: Array<SystemPoint> | any, opts?: OverlayLayerOpts) {
        let dataset = {
            max: 23,
            data: [] as Array<{ lon: number, lat: number, count: number }>
        };
        points.forEach(function (i: any) {
            dataset.data.push({
                lon: i.lon,
                lat: i.lat,
                count: i.count
            })
        });
        let opt = {
            isBaseLayer: false,
            opacity: 1.0,
            projection: 'EPSG:900913',
            visible: true,
            radius: 20
        };
        if (this.map.getLayerByName('heatLayer')) {
            let layer = this.map.getLayerByName('heatLayer');
            layer.setDataset(dataset);
            // layer.refresh()
            // this.map.removeLayerByName(layer.getName())
        } else {
            let heatLayer = new NPMapLib.Layers.HeatMapLayer("heatLayer", opt);
            this.map.addLayer(heatLayer);
            heatLayer.setDataset(dataset);
        }
    }

    /**
     * 移除单个点位
     * @param point
     */
    removeMarker(point: SystemPoint): any {
        if (!point) return;
        this.clusterMarkerFactory.removePointByParams("ObjectID", point.ObjectID);
        this.refreshMarker();
    }

    removeMarkers(points: Array<SystemPoint>): any {
        if (!points) return;
        this.clusterMarkerFactory.removePointByPoints(points);
        this.refreshMarker();
    }

    private refreshMarker(): void {
        // 由于gis地图有bug, 不能动态增加删除聚合点位, 所以在布点的时候 需要移除聚合对象再进行聚合的显示
        let layer = this.map.getLayerByName(ClusterLayerName) as OverlayLayer;

        if (layer != null) {
            layer.removeAllOverlays();
            //layer.addOverlay(this.clusterMarkerFactory.getClusterPoints(this.clusterMarkerFactory.getPoints()));
            layer.addOverlay(this.clusterMarkerFactory.getClusterPoints(this.clusterMarkerFactory.getPoints()) as NPMapLib.Overlay);
        }
    }

    getLayer(num: number) {
        return this.map.getLayer(num)
    }

    /**
     * 定位对象id所在的地图点位
     * @param objectId
     * @param zoom
     * TODO: 是否点位进行闪烁待加 resolve: wyr
     */
    locationMarker(objectId: string, zoom?: number): any {
        // 根据markerId和markerType找到缓存中的点
        let point = this.clusterMarkerFactory.getSystemPointByID(objectId);
        let maxZoom: number;
        if (point) {
            maxZoom = this.mapAdapter.getMaxZoom();
            if (zoom && maxZoom > zoom) {
                this.mapAdapter.centerAndZoom(this.mapAdapter.getPoint(point.Lon, point.Lat), zoom);
            } else {
                this.mapAdapter.centerAndZoom(this.mapAdapter.getPoint(point.Lon, point.Lat), maxZoom - 3);
            }
            // 定位成功
            return Promise.resolve(null);
        }
        // 定位失败
        return Promise.reject(null);
    }


    /*--------------private params--------------------*/
    private map: NPMapLib.Map | any = null;
    private mapId: string = null;
    private clusterMarkerFactory: ClusterMarkerFactory = null;
    private mapAdapter: MapAdapter;
    private infoWindowFactory: InfoWindowFactory = null;
    private locateMouseEventUtil: LocateMouseEventUtil;
    private traceAnalyzeFactory: TraceAnalyzeFactory;
    private mapTools: MapToolBar;
    private defaultOptions = {
        //是否添加鹰眼
        overviewShow: true,
        //是否导航条
        navigationShow: false,
        //是否比例尺
        scaleShow: true
    };

    /*--------------private params end--------------------*/
    measureTool:NPMapLib.Tools.MeasureTool;
    init(mapId: string, _mapConfig: MapConfigModel) {
        this.mapId = mapId;
        let mapContainer = document.getElementById(mapId);
        let mapConfig = _mapConfig;
        this.mapConfig = _mapConfig
        // 初始化图层
        // 初始化地图
        this.map = new NPMapLib.Map(mapContainer, mapConfig.mapOpts);
        // let BaseMapConfig =  new MapPlatForm.Base.MapConfig() as any;
        // this.map = BaseMapConfig.createMap(mapContainer,mapConfig);
        this.mapAdapter = new MapAdapter(this.map);
        this.clusterMarkerFactory = new ClusterMarkerFactory(this.mapAdapter);
        this.infoWindowFactory = new InfoWindowFactory();
        this.traceAnalyzeFactory = new TraceAnalyzeFactory(this.mapAdapter);
        this.mapTools = new MapToolBar(new MapPlatForm.Base.MapTools(this.map), this.mapAdapter);
        this.measureTool = new NPMapLib.Tools.MeasureTool(this.map.id,{
            lengthUnit:NPMapLib.MAP_UNITS_METERS,
            areaUnit:NPMapLib.MAP_UNITS_SQUARE_KILOMETERS,
            mode: NPMapLib.MEASURE_MODE_DISTANCE
        } as IMeasureToolOptions);
        let ctrl = new NPMapLib.Controls.MousePositionControl();
        this.mapAdapter.addControl(ctrl);
        // 加载地图展示用的图层
        MapBaseLayerUtil.initMaplayer(this.map, mapConfig);

        this.mapAdapter.centerAndZoom(this.mapAdapter.getPoint(mapConfig.mapOpts.centerPoint[0], mapConfig.mapOpts.centerPoint[1]),
            mapConfig.vectorLayer[0].layerOpt.layerInfo.defaultZoom);
    };

    setBaseMapLayer(mapConfig: MapConfigModel, type: string) {
        let centerPoint = this.map.getCenter();
        let zoom = this.map.getZoom()
        let i, len, baseLayer = [], vectorLayerItem, baseLayerItem, layerTypes;
        if (type == 'baseMapSatellite') {
            this.map.removeLayerByName('baseMap2D');
            for (i = 0, len = mapConfig.sattilateLayer.length; i < len; i++) {
                vectorLayerItem = mapConfig.sattilateLayer[i];
                layerTypes = vectorLayerItem.layerType.split('.');
                let layers: any = NPMapLib.Layers;
                baseLayerItem = new layers[layerTypes[layerTypes.length - 1]](vectorLayerItem.layerOpt.url, vectorLayerItem.layerName, vectorLayerItem.layerOpt);
                baseLayer.push(baseLayerItem);
            }
            this.map.addLayers(baseLayer);
        } else {
            this.map.removeLayerByName('baseMapSatellite');
            for (i = 0, len = mapConfig.vectorLayer.length; i < len; i++) {
                vectorLayerItem = mapConfig.vectorLayer[i];
                layerTypes = vectorLayerItem.layerType.split('.');
                let layers: any = NPMapLib.Layers;
                baseLayerItem = new layers[layerTypes[layerTypes.length - 1]](vectorLayerItem.layerOpt.url, vectorLayerItem.layerName, vectorLayerItem.layerOpt);
                baseLayer.push(baseLayerItem);
            }
            this.map.addLayers(baseLayer);
        }
        this.map.setCenter({
            lon: centerPoint.lon,
            lat: centerPoint.lat
        }, zoom)
    }

    /**
     * 销毁地图
     */
    destroy() {
        if (this.mapAdapter != null) {
            this.mapAdapter.destroyMap();
            this.map = null;
            this.mapAdapter = null;
            this.clusterMarkerFactory = null;
            this.infoWindowFactory = null;
            this.locateMouseEventUtil = null;
            this.mapTools = null;
            if (this.traceAnalyzeFactory) {
                this.traceAnalyzeFactory.destroy();
            }
            this.traceAnalyzeFactory = null;
        }
    };

    startLocate(msg: string): any {
        if (!this.locateMouseEventUtil) {
            this.locateMouseEventUtil = new LocateMouseEventUtil(this.mapAdapter, this.mapId);
        }

        return this.locateMouseEventUtil.startDrag(msg).then((point: NPMapLib.Geometry.Point) => {
            return point;
        }).catch((error: string) => {
            console.log(error)
        });
    }

    endLocate(): void {
        // this.locateReject = null;
        // TODO endLocate可用性还需要检查 resolve: wyr
        this.mapAdapter.removeEventListener(NPMapLib.MAP_EVENT_CLICK);
    }

    handMoveMap(): void {
        this.mapAdapter.addHandStyle()
    }

    removeMoveStyle(): void {
        this.mapAdapter.removeHandStyle();
    }

    onMouseClick(callback: Function): void {
        this.mapAdapter.addEventListener(NPMapLib.MAP_EVENT_CLICK, function (point: NPMapLib.Geometry.Point) {
            callback(point)
        })
    }

    getZoom(): number {
        return this.mapAdapter.getZoom()
    }

    setCenter(point: NPMapLib.Geometry.Point, zoom: number) {
        this.map.setCenter(point, zoom)

    }

    pointToPixel(point: NPMapLib.Geometry.Point) {
        return this.map.pointToPixel(point)
    }

    pixelToPoint(pixel: NPMapLib.Geometry.Pixel) {
        return this.map.pixelToPoint(pixel)
    }

    getCenter() {
        return this.map.getCenter();
    }

    getLayers() {
        return this.map.getAllLayers()
    }

    constructor() {

    }
}