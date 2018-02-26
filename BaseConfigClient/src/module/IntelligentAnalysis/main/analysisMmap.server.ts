/// <amd-dependency path="text!../TrackPopup/track.popup.html" name="trackPopupHtml" />
/// <amd-dependency path="text!../TrackPopupDetail/track.popup.detail.html" name="detailPopupHtml" />
/// <amd-dependency path="text!../../detailPopup/personPopup/personPopup.html" name="personPopupHtml" />
/// <amd-dependency path="text!../../detailPopup/efPopup/efPopup.html" name="efPopupHtml" />
/// <amd-dependency path="text!../../detailPopup/wifiPopup/wifiPopup.html" name="wifiPopupHtml" />
import "../TrackPopup/track.popup.controller"
import "../TrackPopupDetail/track.popup.detail.controller"
import {NPGisMapMain} from "../../common/map/map.main";
import {MapConfigModel} from "../../common/map/core/model/map.config.model";
import {app} from "../../common/app/main.app";
import {IMapService} from "../../common/services/map.service";
import "../../common/services/map.service";
import {MapConfigJsonEnum} from "../../common/enum/MapConfigJsonEnum";
import {MarkersIcon, OverlayName, TrackConfig} from "../AnalysisEnum";
import {SystemPoint} from "../../../core/entity/SystemPoint";
import {PolylineStyle, TraceAnalyzeOpts} from "../../common/map/map.interface";

// 弹框controller
import '../../detailPopup/personPopup/personPopup.controller';
import '../../detailPopup/efPopup/efPopup.controller';
import '../../detailPopup/wifiPopup/wifiPopup.controller';
import "../../common/faceHandlePopup/selectFace.popup.controller";
import "../../common/faceHandlePopup/demarcate.popup.controller";

// 参数
import {ObjectType} from '../../../core/enum/ObjectType';

declare let angular: any, $: any, popupHtml: any, trackPopupHtml: any, personPopupHtml: any, efPopupHtml: any, wifiPopupHtml: any;

type MapResult = { [key: string]: any }

class WinPopupType {
    static Marker: string = 'Marker';
    static Detail: string = 'Detail';
    static Track: string = 'Track';
}

export interface IAnalysisMmapServer {

    getMap():NPGisMapMain

    getSystemPoint():Array<SystemPoint>;

    initMap(): Promise<any>;

    renderMakers(layerName: string, groupName: string,
                 isClear: boolean,
                 result: Array<SystemPoint>,
                 resultForMap: { [key: string]: any },
                 flag?: boolean,
                 lables?: Array<any>,
                 icon?: string): void;

    openDetailPopup(item: any, index: number, allResult: Array<any>, type?: string, scope?: any): void;

    createMapPopup(point: NPMapLib.Geometry.Point, data: any, type: string): void;

    getSystemPointForParams(points: Array<any>): Array<SystemPoint>;

    renderSystemPoint(Points?: Array<SystemPoint>, isReset?: boolean):void

    removeSystemPoint(): void

    resultToMap(item: any, type?: string):void

    unResultToMap(item: any, resultForMap: MapResult, type?: string):void

    drawRect(callback: Function): void

    drawCircle(callback: Function): void

    drawPolygon(callback: Function): void

    setTrackAnimation(trackResult: Array<any>, points:Array<SystemPoint>, trackResultMap: MapResult):void

    setAccpTrackAnimation(allAccpTrackResult: Array<any>, points:Array<SystemPoint>, allAccpTrackResultForMap: MapResult):void

    clearDraw(): void

    clearTraceAnalyze(): void

    clearTrackInfoWindow(): void

    clearAccpTrackInfoWindow(): void

    clearResultMarkers():void

    clearAccpMarkers():void

    destory(): void

    removeDrawShape(geometry: NPMapLib.Overlay):void
}

class AnalysisMmapServer implements IAnalysisMmapServer {
    static $inject: Array<string> = ['$rootScope', '$compile', '$timeout', 'layer', 'mapService'];
    map: NPGisMapMain;
    mapId: string = "AnalysisMap";
    mapConfigName: string = MapConfigJsonEnum.MAPCONFIG;
    markerWininfo: string;
    currentLayerIndex: number;
    trackWinInfo: string;
    systemPoint: Array<SystemPoint> = [];
    mapTrackID: string;
    mapAccpTrackID: string;
    accpTrackWinInfo: string;

    constructor(private $rootScope: any,
                private $compile: any,
                private $timeout: any,
                private layer: any,
                private mapService: IMapService) {

    }



    /**
     * @title 初始化智能分析地图
     */
    initMap() {
        return this.mapService.getMapConfig(this.mapConfigName).then((data: MapConfigModel) => {
            this.map = new NPGisMapMain();
            this.map.init(this.mapId, data);
            this.initForMapLayer();
        })
    }

    /**
     * @title 暴露当前地图对象
     * @return {NPGisMapMain}
     */
    getMap(){
        return this.map;
    }


    getSystemPoint(){
        return this.systemPoint;
    }


    /**
     * 清除正常结果marker
     */
    clearResultMarkers(){
        this.map.removeOverlaysByName(OverlayName.MapForResultLayer,OverlayName.MapForResultGroup);
    }

    /**
     * 清除伴随结果maker
     */
    clearAccpMarkers(){
        this.map.removeOverlaysByName(OverlayName.MapForResultLayer,OverlayName.MapForAccpGroup);
    }
    /**
     * 初始化智能分析图层
     */
    private initForMapLayer() {
        this.map.renderOverlayLayer(OverlayName.MapForResultLayer);
        this.map.renderOverlayLayer(OverlayName.MapForTrackLineLayer);
    }

    /**
     * @title 渲染地图设备点位
     * @param {Array<SystemPoint>} Points
     * @param {boolean} isReset
     */
    renderSystemPoint(Points?: Array<SystemPoint>, isReset?: boolean) {
        if (isReset) this.systemPoint = Points;
        this.map.renderMarkers(this.systemPoint, {click: this.MarkerClick})
    }

    removeSystemPoint() {
        this.map.removeMarkers(this.systemPoint);
    }


    /**
     * @title 清楚轨迹
     */
    clearTraceAnalyze() {

        if (this.mapTrackID) {
            this.map.removeOverlaysByName(OverlayName.MapForTrackLineLayer, OverlayName.MapForResultLineGroup);
            this.map.clearTraceAnalyze(this.mapTrackID);
        }

    }

    clearTrackInfoWindow() {
        if (this.trackWinInfo) {
            this.map.getInfoWindowByID(this.trackWinInfo).close();
            this.trackWinInfo = null;
        }

    }

    clearAccpTrackInfoWindow() {
        if (this.accpTrackWinInfo) {
            this.map.getInfoWindowByID(this.accpTrackWinInfo).close();
            this.accpTrackWinInfo = null;
        }

    }

    //TODO 根据结果显示地图对应的点位
    resultToMap(item: any, type?: string) {
        if (type) {
            this.map.setMarkerIcon(OverlayName.MapForResultLayer, OverlayName.MapForAccpGroup, item.AccessLog.ID, MarkersIcon.HoverRedIcon, 999)
        } else {
            this.map.setMarkerIcon(OverlayName.MapForResultLayer, OverlayName.MapForResultGroup, item.AccessLog.ID, MarkersIcon.HoverRedIcon, 999)

        }
    }

    //TODO 取消结果显示地图对应的点位
    unResultToMap(item: any, resultForMap: MapResult, type?: string) {
        let res = resultForMap[item.AccessLog.ID];
        if (type) {
            this.map.setMarkerIcon(OverlayName.MapForResultLayer, OverlayName.MapForAccpGroup, item.AccessLog.ID, MarkersIcon.NormalGreenIcon, res.resultIndex + 1);
        } else {
            this.map.setMarkerIcon(OverlayName.MapForResultLayer, OverlayName.MapForResultGroup, item.AccessLog.ID, MarkersIcon.NormalBlueIcon, res.resultIndex + 1);

        }
    }

    private MarkerClick(markers: NPMapLib.Symbols.ClusterMarker) {
        console.log(markers);
        // let point = markers.getPosition() as NPMapLib.Geometry.Point;
        // this.map.setCenter(point,this.map.getZoom());
    }


    //TODO 矩形框选
    drawRect(callback: Function) {
        this.map.selectRectangle((points: Array<SystemPoint>, geometry: NPMapLib.Overlay) => {
            callback(points, geometry)
        })
    }

    //TODO 多边形框选
    drawPolygon(callback: Function) {
        this.map.selectPolygon((points: Array<SystemPoint>, geometry: NPMapLib.Overlay) => {
            callback(points, geometry)
        })
    }

    //TODO 圆形框选
    drawCircle(callback: Function) {
        this.map.selectCircle((points: Array<SystemPoint>, geometry: NPMapLib.Overlay) => {
            callback(points, geometry)
        })
    }

    removeDrawShape(geometry: NPMapLib.Overlay) {
        this.map.removeOverlay(geometry);
    }

    //TODO 清楚地图弹框
    clearDraw() {
        this.map.clearDraw();
    }

    //TODO 渲染地图Marker
    /**
     *
     * @param {string} layerName 图层名称
     * @param {string} groupName 点位组名称
     * @param {boolean} isClear 是否清楚之前的Maker
     * @param {Array<SystemPoint>} result 点位信息
     * @param {MapResult} resultForMap 结果Map对象
     * @param {boolean} flag 是否自定义文字 不穿未数组index下标
     * @param {Array<string>} lables 现在地图结果文字
     * @param {string} icon 显示体贴Maker 图标
     */
    renderMakers(layerName: string,
                 groupName: string,
                 isClear: boolean,
                 result: Array<SystemPoint>,
                 resultForMap: MapResult,
                 flag?: boolean,
                 lables?: Array<string>,
                 icon?: string) {
        if (isClear) {
            this.map.removeOverlaysByName(layerName, groupName);
        }
        this.map.addOverlaysForMakers(layerName, groupName, result, {
            click: (marker: NPMapLib.Symbols.Marker) => {
                let data = marker.getData() as any;

                let result = resultForMap[data.resultID];
                this.openDetailPopup(result, result.resultIndex);
            },
            mouseOver: (marker: NPMapLib.Symbols.Marker) => {
                let data = marker.getData() as any;
                let result = resultForMap[data.resultID];
                this.createMapPopup(marker.getPosition(), result, WinPopupType.Marker)
            },
            mouseOut: () => {
                this.map.getInfoWindowByID(this.markerWininfo).close();
            },
            iconURL: icon
        }, flag, lables);
    }


    //TODO 创建轨迹
    /**
     * @title 创建结果Marker 画线 轨迹动画
     * @param {Array<any>} trackResult
     * @param {Array<SystemPoint>} points
     * @param {MapResult} trackResultMap
     */
    setTrackAnimation(trackResult: Array<any>,points:Array<SystemPoint>, trackResultMap: MapResult) {
        if (Array.isArray(trackResult) && trackResult.length > 0) {
            this.clearTraceAnalyze();
            let style = {
                color: TrackConfig.TrackColorBlue,
                weight: TrackConfig.TrackWeight,
                speed: TrackConfig.TrackSpeed,
                startMarkUrl: MarkersIcon.StartBlueIcon,
                endMarkUrl: MarkersIcon.EndIcon,
                normalMarkUrl: MarkersIcon.NormalBlueIcon,
                moveUrl: TrackConfig.PersonTrackBlueHandle,
                afterDraw: (evt: any) => {
                    let data = trackResult[evt.index];
                    this.clearTrackInfoWindow();
                    this.trackWinInfo = this.createMapPopup(evt.point, data, WinPopupType.Track);
                },
                stop: () => {
                    this.$timeout(() => {
                        this.clearTrackInfoWindow();
                    }, 3000)
                }
            } as TraceAnalyzeOpts;
            this.map.addOverlaysForLine(OverlayName.MapForTrackLineLayer, OverlayName.MapForResultLineGroup, points, {
                weight: TrackConfig.TrackWeight,
                color: TrackConfig.LineColorForBlue
            } as PolylineStyle);
            this.renderMakers(OverlayName.MapForResultLayer, OverlayName.MapForResultGroup, true, points, trackResultMap);
            this.mapTrackID = this.map.createTraceAnalyze(points, style);
            this.map.startTraceAnalyze(this.mapTrackID);

        }
    }

    /**
     * @title 伴随轨迹
     * @param {Array<any>} allAccpTrackResult
     * @param {Array<SystemPoint>} points
     * @param {MapResult} allAccpTrackResultForMap
     */
    setAccpTrackAnimation(allAccpTrackResult: Array<any>, points:Array<SystemPoint>,allAccpTrackResultForMap: MapResult) {
        if (Array.isArray(allAccpTrackResult) && allAccpTrackResult.length > 0) {
            this.map.clearTraceAnalyze(this.mapAccpTrackID);
            let style = {
                color: TrackConfig.TrackColorBlue,
                weight: TrackConfig.TrackWeight,
                speed: TrackConfig.TrackSpeed,
                moveUrl: TrackConfig.PersonTrackGreenHandle,
                afterDraw: (evt: any) => {
                    let data = allAccpTrackResult[evt.index];
                    this.clearAccpTrackInfoWindow();
                    this.accpTrackWinInfo = this.createMapPopup(evt.point, data, WinPopupType.Track);
                },
                stop: () => {
                    this.$timeout(() => {
                        this.clearAccpTrackInfoWindow()
                    }, 3000)
                }
            } as TraceAnalyzeOpts;
            this.map.addOverlaysForLine(OverlayName.MapForTrackLineLayer, OverlayName.MapForAccpLineGroup, points, {
                weight: TrackConfig.TrackWeight,
                color: TrackConfig.LineColorForBlue
            } as PolylineStyle);
            this.renderMakers(OverlayName.MapForResultLayer, OverlayName.MapForAccpGroup, true, points, allAccpTrackResultForMap, false, [], MarkersIcon.NormalGreenIcon);
            this.mapAccpTrackID = this.map.createTraceAnalyze(points, style);
            this.map.startTraceAnalyze(this.mapAccpTrackID);

        }
    }


    //TODO 打开结果详情
    /**
     * @param {Result | CacheResult} item 当前结果对象
     * @param {number} index 当前结果索引
     * @param allResult Array<any>
     */
    openDetailPopup(item: any, rank: number, allList?: Array<any>, type?: string, scope?: any) {
        scope.rank = 0;
        if (type === ObjectType.Camera.value) {
            scope.index = this.layer.open({
                type: 1,
                skin: 'detail-popup-box',
                title: false,
                area: ['600px', '390px'],
                content: personPopupHtml,
                scope: scope,
                end: function () {
                    scope.$destroy();
                }
            });
        }else if (type === ObjectType.Wifi.value) {
            scope.index = this.layer.open({
                type: 1,
                skin: 'detail-popup-box',
                title: false,
                area: ['575px', '220px'],
                content: wifiPopupHtml,
                scope: scope,
                end: function () {
                    scope.$destroy();
                }
            });
        }else if (type === ObjectType.ElectronicFence.value) {
            scope.index = this.layer.open({
                type: 1,
                skin: 'detail-popup-box',
                title: false,
                area: ['575px', '220px'],
                content: efPopupHtml,
                scope: scope,
                end: function () {
                    scope.$destroy();
                }
            });
        }
    }

    //TODO 创建地图弹框
    /**
     * @title 创建地图点位时的弹框基于 传入类型
     * @param {NPMapLib.Geometry.Point} point
     * @param {Result} data
     * @param {string} type
     */
    createMapPopup(point: NPMapLib.Geometry.Point, data: any, type: string): string {
        if (type === WinPopupType.Track) {
            return this.createTrackPopup(point, data);
        }
        if (type === WinPopupType.Marker) {
            return this.createMarkerPopup(point, data);
        }

    }

    /**
     * @title 创建地图轨迹时显示的缩略图弹框
     * @param {NPMapLib.Geometry.Point} point
     * @param {Result} data
     */
    private createTrackPopup(point: NPMapLib.Geometry.Point, data: any) {
        let WinInfo = this.map.createInfoWindow(point.lon, point.lat, {
            iscommon: true,
            offset: new NPMapLib.Geometry.Size(-82, -248)
        });
        let scope: { traceData: any, $destroy: Function } = this.$rootScope.$new();
        scope.traceData = data;
        let dom = $(trackPopupHtml).get(0);
        dom = this.$compile(dom.outerHTML)(scope);
        this.$timeout(() => {
            this.map.openInfoWindow(WinInfo, dom[0], {
                close: () => {
                    scope.$destroy();
                    this.map.closeInfoWindow(WinInfo);
                }
            });
        });
        return WinInfo;
    }

    /**
     * @title 点位移入显示的缩略图弹框
     * @param {NPMapLib.Geometry.Point} point
     * @param {Result} data
     */
    createMarkerPopup(point: NPMapLib.Geometry.Point, data: any) {
        if (data.AccessLog) {
            this.markerWininfo = this.map.createInfoWindow(point.lon, point.lat, {
                iscommon: true,
                offset: new NPMapLib.Geometry.Size(-82, -248)
            });
        }else if(data.EFenceLog){
            this.markerWininfo = this.map.createInfoWindow(point.lon, point.lat, {
                iscommon: true,
                offset: new NPMapLib.Geometry.Size(-82, -140)
            });
        }else if(data.WiFiLog){
            this.markerWininfo = this.map.createInfoWindow(point.lon, point.lat, {
                iscommon: true,
                offset: new NPMapLib.Geometry.Size(-82, -125)
            });
        }
        let scope: { traceData: any, $destroy: Function } = this.$rootScope.$new();
        scope.traceData = data;
        let dom = $(trackPopupHtml).get(0);
        dom = this.$compile(dom.outerHTML)(scope);
        this.$timeout(() => {
            this.map.openInfoWindow(this.markerWininfo, dom[0], {
                close: () => {
                    scope.$destroy();
                    this.map.closeInfoWindow(this.markerWininfo);
                    this.markerWininfo = null;
                }
            });
        });
        return this.markerWininfo
    }

//TODO 根据点位集合获取对应的设备集合
    getSystemPointForParams(points: Array<any>): Array<SystemPoint> {
        let arr = [] as Array<SystemPoint>;
        points.forEach((item: any) => {
            let CameraID = item.AccessLog.CameraID;
            let s = false;
            for (let index = 0; index < this.systemPoint.length; index++) {
                let point = this.systemPoint[index];
                if (CameraID === point.ObjectID) {
                    s = true;
                    arr.push({
                        Lat: point.Lat,
                        Lon: point.Lon,
                        ID: point.ID,
                        ObjectID: point.ObjectID,
                        resultID: item.AccessLog.ID,
                        Descrption: point.Descrption,
                        LayerType: point.LayerType,
                        ObjectType: point.ObjectType,
                        TaskStatus: point.TaskStatus,
                        ObjectState: point.ObjectState,
                        ObjectName: point.ObjectName
                    }as SystemPoint);
                    break;
                }
            }
            if (!s) {
                arr.push(null)
            }
        });
        return arr;
    }

    destory() {
        if(this.map){
            this.map.destroy();
        }
    }
}

app.service('analysisMmapServer', AnalysisMmapServer);