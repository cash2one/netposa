/// <amd-dependency path="text!./technology.stack.map.popup.html" name="popupHtml" />
import {app} from "../../common/app/main.app";
import "css!./technology.stack.map.css";
import {MapConfigJsonEnum} from "../../common/enum/MapConfigJsonEnum";
import {IMapService} from "../../common/services/map.service";
import '../../common/services/map.service';
import {SystemPoint} from "../../../core/entity/SystemPoint";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {NPGisMapMain} from "../../common/map/map.main";
import "es6-promise";
import "./technology.stack.map.popup.controller";
import OverlayLayerOpts = NPMapLib.Layers.OverlayLayerOpts;
import {
    INPGisMapMain, InfoWindowEvent, TraceAnalyzeAfterDrawEvent,
    TraceAnalyzeOpts
} from "../../common/map/map.interface";
import {MapConfigModel} from "../../common/map/core/model/map.config.model";
declare var require: any;
let Promise = require("es6-promise");
declare let angular: any;
declare let popupHtml: string;
/**
 * 用于展示地图的相关操作
 */
// controllerAs mapCtrl
class TechnologyStackMapController {

    static $inject = ["$scope", "$compile", "$timeout", "mapService"];

    map: INPGisMapMain;
    mapConfig: MapConfigModel;
    mapId: string;
    mapConfigName: string;
    buttonName: string;
    locateCamera: Function;
    closeInfoWindowEventName: string;
    measureDistance: Function;
    measureArea: Function;
    selectLine: Function;
    selectPolygon: Function;
    selectRect: Function;
    selectCircle: Function;
    drawLine: Function;
    drawPolygon: Function;
    drawRect: Function;
    drawCircle: Function;
    clearAll: Function;
    showCamera: Function;
    hideCamera: Function;
    selectPoints: Array<SystemPoint>;
    startTraceAnalyze: Function;
    stopTraceAnalyze: Function;
    pauseTraceAnalyze: Function;
    reStartTraceAnalyze: Function;
    clearTraceAnalyze: Function;
    lineId: string;
    isRunTraceAnalyze: boolean;

    constructor($scope: any, $compile: any, $timeout: any, mapService: IMapService) {
        let vm = this;

        vm.map;
        vm.mapId = "mapShowContainer";
        vm.mapConfigName = MapConfigJsonEnum.MAPCONFIG;
        vm.buttonName = "定位一个摄像机结点";
        vm.closeInfoWindowEventName = "closeInfoWindowHandle";

        $scope.$on("$destroy", function () {
            console.log("销毁了MapResourceController");
            // 在这里销毁地图
            if (vm.map) {
                vm.map.destroy();
                vm.map = undefined;
            }
        });

        vm.locateCamera = locateCamera;

        vm.measureDistance = measureDistance;
        vm.measureArea = measureArea;
        vm.selectLine = selectLine;
        vm.selectPolygon = selectPolygon;
        vm.selectRect = selectRect;
        vm.selectCircle = selectCircle;
        vm.clearAll = clearAll;

        vm.drawLine = drawLine;
        vm.drawPolygon = drawPolygon;
        vm.drawRect = drawRect;
        vm.drawCircle = drawCircle;

        vm.showCamera = showCamera;
        vm.hideCamera = hideCamera;

        vm.lineId = null;
        vm.startTraceAnalyze = startTraceAnalyze;
        vm.stopTraceAnalyze = stopTraceAnalyze;
        vm.pauseTraceAnalyze = pauseTraceAnalyze;
        vm.reStartTraceAnalyze = reStartTraceAnalyze;
        vm.clearTraceAnalyze = clearTraceAnalyze;
        vm.isRunTraceAnalyze = false;

        function hideCamera() {
            vm.map.setClusterMarkerVisibleByLayerType("camera", false);
        }

        function showCamera() {
            vm.map.setClusterMarkerVisibleByLayerType("camera", true);
        }

        function drawCircle() {
            vm.map.drawCircle(null, {
                color: "black",
                fillColor: 'red',
                weight: 3,
                opacity: 1,
                fillOpacity: 1
            });
        }

        function drawRect() {
            vm.map.drawRectangle((points)=> {
                console.log("画矩形生成的points为", points);
            }, null);
        }

        function drawPolygon() {
            vm.map.drawPolygon((points)=> {
                console.log("画多边形生成的points为", points);
            }, null);
        }

        function drawLine() {
            vm.map.drawLine((points)=> {
                console.log("画线生成的points为", points);
            }, null);
        }

        function clearAll(): void {
            vm.map.clearDraw();
        }

        function measureDistance(): void {
            vm.map.measureDistance();
        }

        function measureArea(): void {
            vm.map.measureArea();
        }

        function selectLine(): void {
            vm.map.selectLine((points: Array<SystemPoint>)=> {
                console.log("选中的points为", points);
                showPoints(points);
            });
        }

        function selectPolygon(): void {
            vm.map.selectPolygon((points: Array<SystemPoint>)=> {
                console.log("选中的points为", points);
                showPoints(points);
            });
        }

        function selectRect(): void {
            vm.map.selectRectangle((points: Array<SystemPoint>)=> {
                console.log("选中的points为", points);
                showPoints(points);
            });
        }

        function selectCircle(): void {
            vm.map.selectCircle((points: Array<SystemPoint>)=> {
                showPoints(points);
            })
        }

        function showPoints(points: Array<SystemPoint>): void {
            $timeout(()=> {
                vm.selectPoints = points;
            });
        }

        initCloseInfoWindowEvent();

        // 初始化地图, 加载点位数据, 将点位数据加载到地图上
        _startInitMap().then(_getSystemPoints).then(_initSystemPoints2Map);

        function locateCamera() {
            vm.map.locationMarker("bb9d69d53e6443848e75a7543cc3c5d2");
        }

        function _startInitMap() {
            return mapService.getMapConfig(vm.mapConfigName).then(_initMap);
        }

        function _initMap(data: MapConfigModel) {
            vm.map = new NPGisMapMain();
            vm.map.init(vm.mapId, data);
        }

        function _initSystemPoints2Map(points: Array<SystemPoint>) {
            if (vm.map) {
                vm.map.renderMarkers(points, getMapEvents());
            }
        }

        function getMapEvents() {
            return {
                click: (marker: NPMapLib.Symbols.ClusterMarker)=> {
                    openInitInfoWindow(marker);
                }
            } as OverlayLayerOpts;
        }

        /**
         * 在地图总弹出信息窗口
         * @param marker
         */
        function openInitInfoWindow(marker: NPMapLib.Symbols.ClusterMarker) {
            let scope = $scope.$new();
            scope.$on("$destroy", ()=> {
                console.log("销毁地图弹出框scope");
            });
            // 弹出框步骤
            // 1. 创建一个空弹出框
            // 2. 使用$compile渲染html
            // 3. 调用oepnInfoWindow, 将创建的弹出框和html一起作为参数传入, 并打开地图
            // 4. 关闭弹出框, 在html中手动触发$emit事件, 在$scope中通过$on来监听关闭事件, 调用closeInfoWindow方法

            let winId = vm.map.createInfoWindow(marker.getPosition().lon, marker.getPosition().lat);
            // 当前弹出的infowWindow框ID
            scope.winId = winId;
            // 当前监听的关闭infowWindow事件方法
            scope.closeEventName = "aaa";
            let html = $compile(popupHtml)(scope);
            $timeout(()=> {
                vm.map.openInfoWindow(winId, html[0], {
                    close: ()=> {
                        scope.$destroy();
                    }
                } as InfoWindowEvent);
            });
        }

        /**
         * 监听infoWindow关闭事件
         */
        function initCloseInfoWindowEvent() {
            $scope.$on("aaa", (event: Event, winId: string)=> {
                closeInfoWindow(winId);
            });
        }

        /**
         * 关闭在地图中弹出的窗口
         * @param winId
         */
        function closeInfoWindow(winId: string) {
            vm.map.closeInfoWindow(winId);
        }

        function _getSystemPoints() {
            return mapService.getSystemPoints()
                .then((data: ResponseResult<Array<SystemPoint>>)=> {
                    if (data && data.code == 200) {
                        let points = data.data || [];
                        return points;
                    } else {
                        return Promise.reject(null);
                    }
                });
        }

        /**
         * 启动轨迹分析
         */
        function startTraceAnalyze() {

            clearTraceAnalyze();

            vm.map.selectPolygon((points: Array<SystemPoint>)=> {
                console.log("选中的points为", points);

                points = points.concat(points);
                points = points.concat(points);
                // 从中选几个点作为轨迹分析的点位
                vm.lineId = vm.map.createTraceAnalyze(points, {
                    afterDraw: (evt: TraceAnalyzeAfterDrawEvent)=> {
                        console.log("轨迹分析单条画线完成触发", evt);
                    }
                } as TraceAnalyzeOpts);
                console.log("lineId", vm.lineId);
                // 通过传入id来启动轨迹分析
                vm.map.startTraceAnalyze(vm.lineId);
                vm.isRunTraceAnalyze = true;
            });
        }

        function mockPoints(points: Array<SystemPoint>): Array<SystemPoint> {
            let result = [];

            if (points && points.length > 0) {
                // 随机将其中几个变为别的点位类型
                let i, len, num;
                for (i = 0, len = points.length; i < len; i++) {
                    num = Math.round(Math.random() * 10);
                    if (num === 2 || num === 3 || num === 4 || num === 5) {
                        result.push(points[i]);
                    }
                }
            }
            return result;
        }

        function stopTraceAnalyze() {
            if (vm.lineId) {
                vm.map.stopTraceAnalyze(vm.lineId);
            }
            vm.isRunTraceAnalyze = false;
        }

        function pauseTraceAnalyze() {
            if (vm.lineId) {
                vm.map.pauseTraceAnalyze(vm.lineId, vm.isRunTraceAnalyze);
                vm.isRunTraceAnalyze = !vm.isRunTraceAnalyze;
            }
        }

        function reStartTraceAnalyze() {
            if (vm.lineId) {
                vm.map.restartTraceAnalyze(vm.lineId);
            }
        }

        function clearTraceAnalyze() {
            if (vm.lineId) {
                vm.map.clearTraceAnalyze(vm.lineId);
                vm.lineId = null;
            }
        }
    }

}

app.controller("technologyStackMapController", TechnologyStackMapController);