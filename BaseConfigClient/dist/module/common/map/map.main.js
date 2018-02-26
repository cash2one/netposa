define(["require", "exports", "./core/model/infowindow.factory", "./core/model/overlay.factory", "./core/model/cluster.factory", "./core/MapAdapter", "./core/utils/LocateMouseEventUtil", "./core/utils/MapBaseLayerUtil", "./business/MapToolBar", "./core/model/trace.analyze.factory", "heatmap", "npgis2", "es6-promise"], function (require, exports, infowindow_factory_1, overlay_factory_1, cluster_factory_1, MapAdapter_1, LocateMouseEventUtil_1, MapBaseLayerUtil_1, MapToolBar_1, trace_analyze_factory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Promise = require("es6-promise");
    var ClusterLayerName = "ClusterLayer";
    var NPGisMapMain = (function () {
        function NPGisMapMain() {
            this.map = null;
            this.mapId = null;
            this.clusterMarkerFactory = null;
            this.infoWindowFactory = null;
            this.defaultOptions = {
                overviewShow: true,
                navigationShow: false,
                scaleShow: true
            };
        }
        NPGisMapMain.prototype.restartTraceAnalyze = function (lineId) {
            this.traceAnalyzeFactory.reStartTraceAnalyze(lineId);
        };
        NPGisMapMain.prototype.createTraceAnalyze = function (origins, opts) {
            var _this = this;
            if (angular.isArray(origins)) {
                var points_1 = [];
                angular.forEach(origins, function (val) {
                    if (val) {
                        points_1.push(_this.mapAdapter.getPoint(val.Lon, val.Lat));
                    }
                });
                return this.traceAnalyzeFactory.createTraceAnalyze(points_1, opts);
            }
            else {
                return null;
            }
        };
        NPGisMapMain.prototype.startTraceAnalyze = function (lineId) {
            this.traceAnalyzeFactory.startTraceAnalyze(lineId);
        };
        NPGisMapMain.prototype.stopTraceAnalyze = function (lineId) {
            this.traceAnalyzeFactory.stopTraceAnalyze(lineId);
        };
        NPGisMapMain.prototype.pauseTraceAnalyze = function (lineId, flag) {
            this.traceAnalyzeFactory.pauseTraceAnalyze(lineId, flag);
        };
        NPGisMapMain.prototype.clearTraceAnalyze = function (lineId) {
            this.stopTraceAnalyze(lineId);
            this.traceAnalyzeFactory.clearTraceAnalyze(lineId);
        };
        NPGisMapMain.prototype.setTraceAnalyzeSpeed = function (lineId, speed) {
            this.traceAnalyzeFactory.setSpeed(lineId, speed);
        };
        NPGisMapMain.prototype.setClusterMarkerVisibleByLayerType = function (layerType, visible) {
            var layer = this.mapAdapter.getLayerByName(ClusterLayerName);
            layer.setMakrerTypeVisiable(layerType, visible);
            layer.refresh();
        };
        NPGisMapMain.prototype.drawPolygon = function (callBackMethod, style) {
            this.mapTools.drawPolygon(function (extent, geometry) {
                if (callBackMethod) {
                    callBackMethod(geometry.getPath());
                }
            }, style);
        };
        NPGisMapMain.prototype.drawLine = function (callBackMethod, style) {
            this.mapTools.drawLine(function (extent, geometry) {
                if (callBackMethod) {
                    callBackMethod(geometry.getPath());
                }
            }, style);
        };
        NPGisMapMain.prototype.drawRectangle = function (callBackMethod, style) {
            this.mapTools.drawRectangle(function (extent, geometry) {
                if (callBackMethod) {
                    callBackMethod(geometry.getPath());
                }
            }, style);
        };
        NPGisMapMain.prototype.drawCircle = function (callBackMethod, style) {
            this.mapTools.drawCircle(function (extent, geometry) {
                if (callBackMethod) {
                    callBackMethod(geometry.getCenter(), geometry.getRadius());
                }
            }, style);
        };
        NPGisMapMain.prototype.clearDraw = function () {
            this.cancelDraw();
            this.cancelMeasure();
            var overlays = this.mapTools.getSelectGeometrys();
            if (!overlays)
                return;
            var i, len;
            for (i = 0, len = overlays.length; i < len; i++) {
                this.mapAdapter.removeOverlay(overlays[i]);
            }
            this.mapTools.resetSelectGeometrys();
        };
        NPGisMapMain.prototype.measureDistance = function () {
            this.measureTool.setMode(NPMapLib.MEASURE_MODE_DISTANCE);
        };
        NPGisMapMain.prototype.measureArea = function () {
            this.measureTool.setMode(NPMapLib.MEASURE_MODE_AREA);
        };
        NPGisMapMain.prototype.cancelMeasure = function () {
            this.measureTool.cancel();
        };
        NPGisMapMain.prototype.selectLine = function (callBackMethod, style) {
            this.mapTools.drawLine(function (extent, geometry) {
                console.error("线选功能暂未实现.");
            }, style);
        };
        NPGisMapMain.prototype.selectPolygon = function (callBackMethod, style) {
            var _this = this;
            this.mapTools.drawPolygon(function (extent, geometry) {
                if (callBackMethod) {
                    callBackMethod(_this.getSelectPoints(geometry), geometry);
                }
            }, style);
        };
        NPGisMapMain.prototype.selectRectangle = function (callBackMethod, style) {
            var _this = this;
            this.mapTools.drawRectangle(function (extent, geometry) {
                if (callBackMethod) {
                    callBackMethod(_this.getSelectPoints(geometry), geometry);
                }
            }, style);
        };
        NPGisMapMain.prototype.selectCircle = function (callBackMethod, style) {
            var _this = this;
            this.mapTools.drawCircle(function (extent, geometry) {
                if (callBackMethod) {
                    callBackMethod(_this.getSelectPoints(geometry), geometry);
                }
            }, style);
        };
        NPGisMapMain.prototype.removeOverlay = function (overlay) {
            this.mapTools.removeOverlay(overlay);
            this.map.removeOverlay(overlay);
        };
        NPGisMapMain.prototype.drawCircleByDiameter = function (callBackMethod) {
        };
        NPGisMapMain.prototype.cancelDraw = function () {
            this.removeCircleSearchControl();
            this.mapTools.cancelDraw();
        };
        NPGisMapMain.prototype.getSelectPoints = function (geometry) {
            var points = this.clusterMarkerFactory.getPoints() || [];
            var i, len, result = [];
            var overlayLayer = this.map.getLayerByName(ClusterLayerName);
            overlayLayer.containFeatures(geometry, function (marker) {
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
                });
            });
            return result;
        };
        NPGisMapMain.prototype.addCircleSearchControl = function (point, callback, min, max) {
            var self = this;
            self.removeCircleSearchControl();
            this.mapTools.addCircleSearchControl(point, function (res) {
                if (callback) {
                    callback(self.getSelectPoints(res));
                }
            }, min, max);
        };
        NPGisMapMain.prototype.removeCircleSearchControl = function () {
            this.mapTools.removeCircleSearchControl();
        };
        NPGisMapMain.prototype.createInfoWindow = function (lon, lat, infoWindowOpt) {
            var infoWindow = infowindow_factory_1.InfoWindowFactory.getInfoWindow(new NPMapLib.Geometry.Point(lon, lat), null, null, infowindow_factory_1.InfoWindowFactory.getInfoWindowOpts(infoWindowOpt));
            return this.infoWindowFactory.addInfoWindow(infoWindow);
        };
        NPGisMapMain.prototype.getInfoWindowByID = function (uuid) {
            return this.infoWindowFactory.getById(uuid);
        };
        NPGisMapMain.prototype.closeInfoWindow = function (winId) {
            this.mapAdapter.closeInfoWindow(this.infoWindowFactory.removeInfoWindow(winId));
        };
        NPGisMapMain.prototype.openInfoWindow = function (winId, domHtml, eventOpt) {
            var win = this.infoWindowFactory.getById(winId);
            this.infoWindowFactory.addEventListener(win, winId, eventOpt);
            this.mapAdapter.addOverlay(win);
            win.setContentDom(domHtml);
            win.open();
        };
        NPGisMapMain.prototype.renderMarker = function (point) {
            if (!point)
                return;
            this.clusterMarkerFactory.addPoint(point);
            this.refreshMarker();
        };
        NPGisMapMain.prototype.mockPoints = function (points) {
            if (points && points.length > 0) {
                var i = void 0, len = void 0, num = void 0;
                for (i = 0, len = points.length; i < len; i++) {
                    num = Math.round(Math.random() * 10);
                    if (num === 2 || num === 3 || num === 4 || num === 5) {
                        points[i].LayerType = "ball";
                    }
                }
            }
            return points;
        };
        NPGisMapMain.prototype.renderMarkers = function (points, opts) {
            this.clusterMarkerFactory.setPoints(points);
            var clusterPoints = this.clusterMarkerFactory.getClusterPoints(points);
            var overlayLayer = this.map.getLayerByName(ClusterLayerName);
            if (!overlayLayer) {
                overlayLayer = new NPMapLib.Layers.OverlayLayer(ClusterLayerName, true, overlay_factory_1.OverlayFactory.getClusterOverlayOpt(opts));
                this.map.addLayer(overlayLayer);
            }
            overlayLayer.addOverlay(clusterPoints);
        };
        NPGisMapMain.prototype.getTotalPoints = function (LayerType) {
            var pointArrAll = this.map.getLayerByName(ClusterLayerName).getOverlaysByProperty(), pointArr = [];
            if (LayerType) {
                pointArrAll.forEach(function (value, index) {
                    if (value.LayerType == LayerType) {
                        pointArr.push(pointArrAll[index]);
                    }
                });
            }
            else {
                pointArr = pointArrAll;
            }
            return pointArr;
        };
        NPGisMapMain.prototype.setOverlayShowByLayerType = function (LayerType, style) {
            var arr = [];
            if (LayerType == 'all') {
                arr = this.getTotalPoints();
            }
            else {
                arr = this.getTotalPoints(LayerType);
            }
            arr.forEach(function (item, index) {
                var marker = item;
                if (style) {
                    item.setVisible(true);
                }
                else {
                    item.setVisible(false);
                }
            });
        };
        NPGisMapMain.prototype.addOverlaysForLine = function (layerName, groupName, points, opts) {
            var layer = this.map.getLayerByName(layerName);
            layer.setZIndex(200);
            var group = layer.getGroupByName(groupName);
            if (!group) {
                group = layer.addGroup(groupName);
            }
            var arr = [];
            points.forEach(function (item) {
                if (item) {
                    arr.push({ lat: item.Lat, lon: item.Lon });
                }
            });
            var polyline = new NPMapLib.Geometry.Polyline(arr, opts);
            group.addOverlay(polyline);
        };
        NPGisMapMain.prototype.renderOverlayLayer = function (layerName) {
            var layer = this.map.getLayerByName(layerName);
            if (!layer) {
                var overlayLayerMarkers = new NPMapLib.Layers.OverlayLayer(layerName);
                this.map.addLayer(overlayLayerMarkers);
            }
        };
        NPGisMapMain.prototype.addOverlaysForMakers = function (layerName, groupName, points, opts, flag, labels) {
            var _this = this;
            var layer = this.map.getLayerByName(layerName);
            var group = layer.getGroupByName(groupName);
            if (!group) {
                group = layer.addGroup(groupName);
            }
            var arrMarkers = [];
            var iconURL = opts.iconURL || '/images/map/normal-blue.png';
            points.forEach(function (item, i) {
                if (item) {
                    var point = {};
                    point.lat = item.Lat;
                    point.lon = item.Lon;
                    var icon = new NPMapLib.Symbols.Icon(iconURL, new NPMapLib.Geometry.Size(32, 32), {
                        anchor: new NPMapLib.Geometry.Size(-19, -23)
                    });
                    var marker = new NPMapLib.Symbols.Marker(point, {
                        icon: icon,
                        title: opts.title,
                        rotation: opts.rotation
                    });
                    var lable = void 0;
                    if (flag) {
                        lable = new NPMapLib.Symbols.Label(labels[i], {
                            "position": point,
                            "offset": new NPMapLib.Geometry.Size(-3, 12)
                        });
                    }
                    else {
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
            group.addOverlays(arrMarkers);
            var arr = group.getAllOverlayers();
            arr.forEach(function (marker, i) {
                _this.bindMakersEvent(marker, opts);
                marker.setZIndex(i + 1);
            });
        };
        NPGisMapMain.prototype.bindMakersEvent = function (marker, opts) {
            if (typeof opts.click === "function") {
                marker.addEventListener(NPMapLib.MARKER_EVENT_CLICK, function (evt) {
                    opts.click(evt);
                });
            }
            if (typeof opts.mouseOver === "function") {
                marker.addEventListener(NPMapLib.MARKER_EVENT_MOUSE_OVER, function (evt) {
                    opts.mouseOver(evt);
                });
            }
            if (typeof opts.mouseOut === "function") {
                marker.addEventListener(NPMapLib.MARKER_EVENT_MOUSE_OUT, function (evt) {
                    opts.mouseOut(evt);
                });
            }
            if (typeof opts.dragStart === "function") {
                marker.addEventListener(NPMapLib.MARKER_EVENT_DRAG_START, function (evt) {
                    opts.dragStart(evt);
                });
            }
            if (typeof opts.dragEnd === "function") {
                marker.addEventListener(NPMapLib.MARKER_EVENT_DRAG_END, function (evt) {
                    opts.dragEnd(evt);
                });
            }
        };
        NPGisMapMain.prototype.removeOverlaysByName = function (layerName, groupName) {
            var layer = this.map.getLayerByName(layerName);
            if (layer) {
                var group = layer.getGroupByName(groupName);
                if (group) {
                    group.removeAllOverlays();
                }
                this.map.removeOverlay(layer);
            }
        };
        NPGisMapMain.prototype.getMarkerForID = function (layerName, groupName, ID) {
            var layer = this.map.getLayerByName(layerName);
            var group = layer.getGroupByName(groupName);
            var arrMarks = group.getAllOverlayers();
            var marker;
            for (var i = 0; i < arrMarks.length; i++) {
                var m = arrMarks[i];
                var s = m.getData();
                if (ID === s.resultID) {
                    marker = m;
                    break;
                }
            }
            return marker;
        };
        NPGisMapMain.prototype.setMarkerIcon = function (layerName, groupName, ID, path, zIndex) {
            var marker = this.getMarkerForID(layerName, groupName, ID);
            if (marker) {
                marker.setIcon(new NPMapLib.Symbols.Icon(path, new NPMapLib.Geometry.Size(32, 32), { anchor: new NPMapLib.Geometry.Size(-19, -23) }));
                if (typeof zIndex === 'number')
                    marker.setZIndex(zIndex + 1);
            }
        };
        NPGisMapMain.prototype.addheatlayer = function (points, opts) {
            var dataset = {
                max: 23,
                data: []
            };
            points.forEach(function (i) {
                dataset.data.push({
                    lon: i.lon,
                    lat: i.lat,
                    count: i.count
                });
            });
            var opt = {
                isBaseLayer: false,
                opacity: 1.0,
                projection: 'EPSG:900913',
                visible: true,
                radius: 20
            };
            if (this.map.getLayerByName('heatLayer')) {
                var layer = this.map.getLayerByName('heatLayer');
                layer.setDataset(dataset);
            }
            else {
                var heatLayer = new NPMapLib.Layers.HeatMapLayer("heatLayer", opt);
                this.map.addLayer(heatLayer);
                heatLayer.setDataset(dataset);
            }
        };
        NPGisMapMain.prototype.removeMarker = function (point) {
            if (!point)
                return;
            this.clusterMarkerFactory.removePointByParams("ObjectID", point.ObjectID);
            this.refreshMarker();
        };
        NPGisMapMain.prototype.removeMarkers = function (points) {
            if (!points)
                return;
            this.clusterMarkerFactory.removePointByPoints(points);
            this.refreshMarker();
        };
        NPGisMapMain.prototype.refreshMarker = function () {
            var layer = this.map.getLayerByName(ClusterLayerName);
            if (layer != null) {
                layer.removeAllOverlays();
                layer.addOverlay(this.clusterMarkerFactory.getClusterPoints(this.clusterMarkerFactory.getPoints()));
            }
        };
        NPGisMapMain.prototype.getLayer = function (num) {
            return this.map.getLayer(num);
        };
        NPGisMapMain.prototype.locationMarker = function (objectId, zoom) {
            var point = this.clusterMarkerFactory.getSystemPointByID(objectId);
            var maxZoom;
            if (point) {
                maxZoom = this.mapAdapter.getMaxZoom();
                if (zoom && maxZoom > zoom) {
                    this.mapAdapter.centerAndZoom(this.mapAdapter.getPoint(point.Lon, point.Lat), zoom);
                }
                else {
                    this.mapAdapter.centerAndZoom(this.mapAdapter.getPoint(point.Lon, point.Lat), maxZoom - 3);
                }
                return Promise.resolve(null);
            }
            return Promise.reject(null);
        };
        NPGisMapMain.prototype.init = function (mapId, _mapConfig) {
            this.mapId = mapId;
            var mapContainer = document.getElementById(mapId);
            var mapConfig = _mapConfig;
            this.mapConfig = _mapConfig;
            this.map = new NPMapLib.Map(mapContainer, mapConfig.mapOpts);
            this.mapAdapter = new MapAdapter_1.MapAdapter(this.map);
            this.clusterMarkerFactory = new cluster_factory_1.ClusterMarkerFactory(this.mapAdapter);
            this.infoWindowFactory = new infowindow_factory_1.InfoWindowFactory();
            this.traceAnalyzeFactory = new trace_analyze_factory_1.TraceAnalyzeFactory(this.mapAdapter);
            this.mapTools = new MapToolBar_1.MapToolBar(new MapPlatForm.Base.MapTools(this.map), this.mapAdapter);
            this.measureTool = new NPMapLib.Tools.MeasureTool(this.map.id, {
                lengthUnit: NPMapLib.MAP_UNITS_METERS,
                areaUnit: NPMapLib.MAP_UNITS_SQUARE_KILOMETERS,
                mode: NPMapLib.MEASURE_MODE_DISTANCE
            });
            var ctrl = new NPMapLib.Controls.MousePositionControl();
            this.mapAdapter.addControl(ctrl);
            MapBaseLayerUtil_1.MapBaseLayerUtil.initMaplayer(this.map, mapConfig);
            this.mapAdapter.centerAndZoom(this.mapAdapter.getPoint(mapConfig.mapOpts.centerPoint[0], mapConfig.mapOpts.centerPoint[1]), mapConfig.vectorLayer[0].layerOpt.layerInfo.defaultZoom);
        };
        ;
        NPGisMapMain.prototype.setBaseMapLayer = function (mapConfig, type) {
            var centerPoint = this.map.getCenter();
            var zoom = this.map.getZoom();
            var i, len, baseLayer = [], vectorLayerItem, baseLayerItem, layerTypes;
            if (type == 'baseMapSatellite') {
                this.map.removeLayerByName('baseMap2D');
                for (i = 0, len = mapConfig.sattilateLayer.length; i < len; i++) {
                    vectorLayerItem = mapConfig.sattilateLayer[i];
                    layerTypes = vectorLayerItem.layerType.split('.');
                    var layers = NPMapLib.Layers;
                    baseLayerItem = new layers[layerTypes[layerTypes.length - 1]](vectorLayerItem.layerOpt.url, vectorLayerItem.layerName, vectorLayerItem.layerOpt);
                    baseLayer.push(baseLayerItem);
                }
                this.map.addLayers(baseLayer);
            }
            else {
                this.map.removeLayerByName('baseMapSatellite');
                for (i = 0, len = mapConfig.vectorLayer.length; i < len; i++) {
                    vectorLayerItem = mapConfig.vectorLayer[i];
                    layerTypes = vectorLayerItem.layerType.split('.');
                    var layers = NPMapLib.Layers;
                    baseLayerItem = new layers[layerTypes[layerTypes.length - 1]](vectorLayerItem.layerOpt.url, vectorLayerItem.layerName, vectorLayerItem.layerOpt);
                    baseLayer.push(baseLayerItem);
                }
                this.map.addLayers(baseLayer);
            }
            this.map.setCenter({
                lon: centerPoint.lon,
                lat: centerPoint.lat
            }, zoom);
        };
        NPGisMapMain.prototype.destroy = function () {
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
        ;
        NPGisMapMain.prototype.startLocate = function (msg) {
            if (!this.locateMouseEventUtil) {
                this.locateMouseEventUtil = new LocateMouseEventUtil_1.LocateMouseEventUtil(this.mapAdapter, this.mapId);
            }
            return this.locateMouseEventUtil.startDrag(msg).then(function (point) {
                return point;
            }).catch(function (error) {
                console.log(error);
            });
        };
        NPGisMapMain.prototype.endLocate = function () {
            this.mapAdapter.removeEventListener(NPMapLib.MAP_EVENT_CLICK);
        };
        NPGisMapMain.prototype.handMoveMap = function () {
            this.mapAdapter.addHandStyle();
        };
        NPGisMapMain.prototype.removeMoveStyle = function () {
            this.mapAdapter.removeHandStyle();
        };
        NPGisMapMain.prototype.onMouseClick = function (callback) {
            this.mapAdapter.addEventListener(NPMapLib.MAP_EVENT_CLICK, function (point) {
                callback(point);
            });
        };
        NPGisMapMain.prototype.getZoom = function () {
            return this.mapAdapter.getZoom();
        };
        NPGisMapMain.prototype.setCenter = function (point, zoom) {
            this.map.setCenter(point, zoom);
        };
        NPGisMapMain.prototype.pointToPixel = function (point) {
            return this.map.pointToPixel(point);
        };
        NPGisMapMain.prototype.pixelToPoint = function (pixel) {
            return this.map.pixelToPoint(pixel);
        };
        NPGisMapMain.prototype.getCenter = function () {
            return this.map.getCenter();
        };
        NPGisMapMain.prototype.getLayers = function () {
            return this.map.getAllLayers();
        };
        return NPGisMapMain;
    }());
    exports.NPGisMapMain = NPGisMapMain;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL21hcC9tYXAubWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUEwQkEsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3JDLElBQU0sZ0JBQWdCLEdBQUcsY0FBYyxDQUFDO0lBT3hDO1FBeXRCSTtZQTNKUSxRQUFHLEdBQXVCLElBQUksQ0FBQztZQUMvQixVQUFLLEdBQVcsSUFBSSxDQUFDO1lBQ3JCLHlCQUFvQixHQUF5QixJQUFJLENBQUM7WUFFbEQsc0JBQWlCLEdBQXNCLElBQUksQ0FBQztZQUk1QyxtQkFBYyxHQUFHO2dCQUVyQixZQUFZLEVBQUUsSUFBSTtnQkFFbEIsY0FBYyxFQUFFLEtBQUs7Z0JBRXJCLFNBQVMsRUFBRSxJQUFJO2FBQ2xCLENBQUM7UUE4SUYsQ0FBQztRQXh0QkQsMENBQW1CLEdBQW5CLFVBQW9CLE1BQWM7WUFDOUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pELENBQUM7UUFFRCx5Q0FBa0IsR0FBbEIsVUFBbUIsT0FBMkIsRUFBRSxJQUF1QjtZQUF2RSxpQkFZQztZQVhHLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLFFBQU0sR0FBRyxFQUFvQyxDQUFDO2dCQUNsRCxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFDLEdBQWdCO29CQUN0QyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNOLFFBQU0sQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDNUQsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLG1C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dkMsQ0FBQztRQUVELG1DQUFZLEdBQVosVUFBYSxLQUE4QjtZQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDdkMsQ0FBQztRQUVELGdDQUFTLEdBQVQ7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQyxDQUFDO1FBRUQsZ0NBQVMsR0FBVDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFBO1FBQ2xDLENBQUM7UUFLTCxtQkFBQztJQUFELENBNXRCQSxBQTR0QkMsSUFBQTtJQTV0Qlksb0NBQVkiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9tYXAvbWFwLm1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vQHR5cGVzL21hcC9pbmRleC5kLnRzXCIgLz5cclxuXHJcbmltcG9ydCB7IFN5c3RlbVBvaW50IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L1N5c3RlbVBvaW50XCI7XHJcblxyXG5kZWNsYXJlIGxldCByZXF1aXJlOiBhbnk7XHJcbmltcG9ydCBcImhlYXRtYXBcIjtcclxuaW1wb3J0IFwibnBnaXMyXCI7XHJcbmltcG9ydCBcImVzNi1wcm9taXNlXCI7XHJcbmltcG9ydCBPdmVybGF5TGF5ZXJPcHRzID0gTlBNYXBMaWIuTGF5ZXJzLk92ZXJsYXlMYXllck9wdHM7XHJcbmltcG9ydCBJbmZvV2luZG93T3B0cyA9IE5QTWFwTGliLlN5bWJvbHMuSW5mb1dpbmRvd09wdHM7XHJcbmltcG9ydCB7IE1hcENvbmZpZ01vZGVsIH0gZnJvbSBcIi4vY29yZS9tb2RlbC9tYXAuY29uZmlnLm1vZGVsXCI7XHJcbmltcG9ydCB7IEluZm9XaW5kb3dGYWN0b3J5IH0gZnJvbSBcIi4vY29yZS9tb2RlbC9pbmZvd2luZG93LmZhY3RvcnlcIjtcclxuaW1wb3J0IHsgT3ZlcmxheUZhY3RvcnkgfSBmcm9tIFwiLi9jb3JlL21vZGVsL292ZXJsYXkuZmFjdG9yeVwiO1xyXG5pbXBvcnQgeyBDbHVzdGVyTWFya2VyRmFjdG9yeSB9IGZyb20gXCIuL2NvcmUvbW9kZWwvY2x1c3Rlci5mYWN0b3J5XCI7XHJcbmltcG9ydCB7IE1hcEFkYXB0ZXIgfSBmcm9tIFwiLi9jb3JlL01hcEFkYXB0ZXJcIjtcclxuaW1wb3J0IHsgTG9jYXRlTW91c2VFdmVudFV0aWwgfSBmcm9tIFwiLi9jb3JlL3V0aWxzL0xvY2F0ZU1vdXNlRXZlbnRVdGlsXCI7XHJcbmltcG9ydCB7IE1hcEJhc2VMYXllclV0aWwgfSBmcm9tIFwiLi9jb3JlL3V0aWxzL01hcEJhc2VMYXllclV0aWxcIjtcclxuaW1wb3J0IHsgTWFwVG9vbEJhciB9IGZyb20gXCIuL2J1c2luZXNzL01hcFRvb2xCYXJcIjtcclxuaW1wb3J0IHtcclxuICAgIElOUEdpc01hcE1haW4sIFBvbHlsaW5lU3R5bGUsIFBvbHlnb25TdHlsZSwgSW5mb1dpbmRvd0V2ZW50LCBDaXJjbGVTdHlsZSxcclxuICAgIENsdXN0ZXJNYXJrZXJFeCwgVHJhY2VBbmFseXplT3B0cywgTWFya2Vyc09wdHMsIElNZWFzdXJlVG9vbE9wdGlvbnNcclxufSBmcm9tIFwiLi9tYXAuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCBPdmVybGF5TGF5ZXIgPSBOUE1hcExpYi5MYXllcnMuT3ZlcmxheUxheWVyO1xyXG5pbXBvcnQgeyBUcmFjZUFuYWx5emVGYWN0b3J5IH0gZnJvbSBcIi4vY29yZS9tb2RlbC90cmFjZS5hbmFseXplLmZhY3RvcnlcIjtcclxuaW1wb3J0IE1hcmtlciA9IE5QTWFwTGliLlN5bWJvbHMuTWFya2VyO1xyXG5cclxubGV0IFByb21pc2UgPSByZXF1aXJlKFwiZXM2LXByb21pc2VcIik7XHJcbmNvbnN0IENsdXN0ZXJMYXllck5hbWUgPSBcIkNsdXN0ZXJMYXllclwiO1xyXG5kZWNsYXJlIGxldCBoMzM3OiBhbnksIGFuZ3VsYXI6IGFueTtcclxuXHJcbi8qKlxyXG4gKiDmjqXlj6PlrprkuYnmlofku7YsIOWxleekuuaJgOacieWvueWkluaPkOS+m+eahOaOpeWPo1xyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBOUEdpc01hcE1haW4gaW1wbGVtZW50cyBJTlBHaXNNYXBNYWluIHtcclxuICAgIG1hcENvbmZpZzogYW55O1xyXG5cclxuICAgIHJlc3RhcnRUcmFjZUFuYWx5emUobGluZUlkOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRyYWNlQW5hbHl6ZUZhY3RvcnkucmVTdGFydFRyYWNlQW5hbHl6ZShsaW5lSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVRyYWNlQW5hbHl6ZShvcmlnaW5zOiBBcnJheTxTeXN0ZW1Qb2ludD4sIG9wdHM/OiBUcmFjZUFuYWx5emVPcHRzKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoYW5ndWxhci5pc0FycmF5KG9yaWdpbnMpKSB7XHJcbiAgICAgICAgICAgIGxldCBwb2ludHMgPSBbXSBhcyBBcnJheTxOUE1hcExpYi5HZW9tZXRyeS5Qb2ludD47XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChvcmlnaW5zLCAodmFsOiBTeXN0ZW1Qb2ludCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50cy5wdXNoKHRoaXMubWFwQWRhcHRlci5nZXRQb2ludCh2YWwuTG9uLCB2YWwuTGF0KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50cmFjZUFuYWx5emVGYWN0b3J5LmNyZWF0ZVRyYWNlQW5hbHl6ZShwb2ludHMsIG9wdHMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydFRyYWNlQW5hbHl6ZShsaW5lSWQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudHJhY2VBbmFseXplRmFjdG9yeS5zdGFydFRyYWNlQW5hbHl6ZShsaW5lSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0b3BUcmFjZUFuYWx5emUobGluZUlkOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRyYWNlQW5hbHl6ZUZhY3Rvcnkuc3RvcFRyYWNlQW5hbHl6ZShsaW5lSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHBhdXNlVHJhY2VBbmFseXplKGxpbmVJZDogc3RyaW5nLCBmbGFnOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50cmFjZUFuYWx5emVGYWN0b3J5LnBhdXNlVHJhY2VBbmFseXplKGxpbmVJZCwgZmxhZyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJUcmFjZUFuYWx5emUobGluZUlkOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0b3BUcmFjZUFuYWx5emUobGluZUlkKTtcclxuICAgICAgICB0aGlzLnRyYWNlQW5hbHl6ZUZhY3RvcnkuY2xlYXJUcmFjZUFuYWx5emUobGluZUlkKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUcmFjZUFuYWx5emVTcGVlZChsaW5lSWQ6IHN0cmluZywgc3BlZWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudHJhY2VBbmFseXplRmFjdG9yeS5zZXRTcGVlZChsaW5lSWQsIHNwZWVkKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDbHVzdGVyTWFya2VyVmlzaWJsZUJ5TGF5ZXJUeXBlKGxheWVyVHlwZTogc3RyaW5nLCB2aXNpYmxlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGxheWVyID0gdGhpcy5tYXBBZGFwdGVyLmdldExheWVyQnlOYW1lKENsdXN0ZXJMYXllck5hbWUpIGFzIE92ZXJsYXlMYXllcjtcclxuICAgICAgICBsYXllci5zZXRNYWtyZXJUeXBlVmlzaWFibGUobGF5ZXJUeXBlLCB2aXNpYmxlKTtcclxuICAgICAgICBsYXllci5yZWZyZXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd1BvbHlnb24oY2FsbEJhY2tNZXRob2Q/OiAocG9pbnRzOiBBcnJheTxOUE1hcExpYi5HZW9tZXRyeS5Qb2ludD4pID0+IHZvaWQsIHN0eWxlPzogUG9seWdvblN0eWxlKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tYXBUb29scy5kcmF3UG9seWdvbigoZXh0ZW50OiBOUE1hcExpYi5HZW9tZXRyeS5FeHRlbnQsIGdlb21ldHJ5OiBOUE1hcExpYi5HZW9tZXRyeS5Qb2x5Z29uKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsQmFja01ldGhvZCkge1xyXG4gICAgICAgICAgICAgICAgY2FsbEJhY2tNZXRob2QoZ2VvbWV0cnkuZ2V0UGF0aCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHN0eWxlKTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3TGluZShjYWxsQmFja01ldGhvZD86IChwb2ludHM6IEFycmF5PE5QTWFwTGliLkdlb21ldHJ5LlBvaW50PikgPT4gdm9pZCwgc3R5bGU/OiBQb2x5bGluZVN0eWxlKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tYXBUb29scy5kcmF3TGluZSgoZXh0ZW50OiBOUE1hcExpYi5HZW9tZXRyeS5FeHRlbnQsIGdlb21ldHJ5OiBOUE1hcExpYi5HZW9tZXRyeS5Qb2x5bGluZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2FsbEJhY2tNZXRob2QpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxCYWNrTWV0aG9kKGdlb21ldHJ5LmdldFBhdGgoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBzdHlsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd1JlY3RhbmdsZShjYWxsQmFja01ldGhvZD86IChwb2ludHM6IEFycmF5PE5QTWFwTGliLkdlb21ldHJ5LlBvaW50PikgPT4gdm9pZCwgc3R5bGU/OiBQb2x5Z29uU3R5bGUpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1hcFRvb2xzLmRyYXdSZWN0YW5nbGUoKGV4dGVudDogTlBNYXBMaWIuR2VvbWV0cnkuRXh0ZW50LCBnZW9tZXRyeTogTlBNYXBMaWIuR2VvbWV0cnkuUG9seWdvbikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2FsbEJhY2tNZXRob2QpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxCYWNrTWV0aG9kKGdlb21ldHJ5LmdldFBhdGgoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBzdHlsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd0NpcmNsZShjYWxsQmFja01ldGhvZD86IChjZW50ZXI6IE5QTWFwTGliLkdlb21ldHJ5LlBvaW50LCByYWRpdXM6IG51bWJlcikgPT4gdm9pZCwgc3R5bGU/OiBDaXJjbGVTdHlsZSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubWFwVG9vbHMuZHJhd0NpcmNsZSgoZXh0ZW50OiBOUE1hcExpYi5HZW9tZXRyeS5FeHRlbnQsIGdlb21ldHJ5OiBOUE1hcExpYi5HZW9tZXRyeS5DaXJjbGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNhbGxCYWNrTWV0aG9kKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsQmFja01ldGhvZChnZW9tZXRyeS5nZXRDZW50ZXIoKSwgZ2VvbWV0cnkuZ2V0UmFkaXVzKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgc3R5bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyRHJhdygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNhbmNlbERyYXcoKTtcclxuICAgICAgICB0aGlzLmNhbmNlbE1lYXN1cmUoKTtcclxuICAgICAgICBsZXQgb3ZlcmxheXMgPSB0aGlzLm1hcFRvb2xzLmdldFNlbGVjdEdlb21ldHJ5cygpO1xyXG4gICAgICAgIGlmICghb3ZlcmxheXMpIHJldHVybjtcclxuICAgICAgICBsZXQgaSwgbGVuO1xyXG4gICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IG92ZXJsYXlzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwQWRhcHRlci5yZW1vdmVPdmVybGF5KG92ZXJsYXlzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYXBUb29scy5yZXNldFNlbGVjdEdlb21ldHJ5cygpO1xyXG4gICAgfVxyXG5cclxuICAgIG1lYXN1cmVEaXN0YW5jZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1lYXN1cmVUb29sLnNldE1vZGUoTlBNYXBMaWIuTUVBU1VSRV9NT0RFX0RJU1RBTkNFKVxyXG4gICAgfVxyXG4gICAgbWVhc3VyZUFyZWEoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tZWFzdXJlVG9vbC5zZXRNb2RlKE5QTWFwTGliLk1FQVNVUkVfTU9ERV9BUkVBKVxyXG4gICAgfVxyXG5cclxuICAgIGNhbmNlbE1lYXN1cmUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tZWFzdXJlVG9vbC5jYW5jZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RMaW5lKGNhbGxCYWNrTWV0aG9kPzogKHBvaW50czogQXJyYXk8U3lzdGVtUG9pbnQ+KSA9PiB2b2lkLCBzdHlsZT86IFBvbHlsaW5lU3R5bGUpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1hcFRvb2xzLmRyYXdMaW5lKChleHRlbnQ6IE5QTWFwTGliLkdlb21ldHJ5LkV4dGVudCwgZ2VvbWV0cnk6IE5QTWFwTGliLkdlb21ldHJ5LlBvbHlsaW5lKSA9PiB7XHJcbiAgICAgICAgICAgIC8vVE9ETyDlm6BucGdpc+acrOi6q2FwaeS4jeaUr+aMgSwg5pWF5pyq5a6e546w57q/6YCJXHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLnur/pgInlip/og73mmoLmnKrlrp7njrAuXCIpO1xyXG5cclxuICAgICAgICB9LCBzdHlsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0UG9seWdvbihjYWxsQmFja01ldGhvZD86IChwb2ludHM6IEFycmF5PFN5c3RlbVBvaW50PiwgZ2VvbWV0cnk6IE5QTWFwTGliLkdlb21ldHJ5LlBvbHlnb24pID0+IHZvaWQsIHN0eWxlPzogUG9seWdvblN0eWxlKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tYXBUb29scy5kcmF3UG9seWdvbigoZXh0ZW50OiBOUE1hcExpYi5HZW9tZXRyeS5FeHRlbnQsIGdlb21ldHJ5OiBOUE1hcExpYi5HZW9tZXRyeS5Qb2x5Z29uKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsQmFja01ldGhvZCkge1xyXG4gICAgICAgICAgICAgICAgY2FsbEJhY2tNZXRob2QodGhpcy5nZXRTZWxlY3RQb2ludHMoZ2VvbWV0cnkpLCBnZW9tZXRyeSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBzdHlsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0UmVjdGFuZ2xlKGNhbGxCYWNrTWV0aG9kPzogKHBvaW50czogQXJyYXk8U3lzdGVtUG9pbnQ+LCBnZW9tZXRyeTogTlBNYXBMaWIuR2VvbWV0cnkuUG9seWdvbikgPT4gdm9pZCwgc3R5bGU/OiBQb2x5Z29uU3R5bGUpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1hcFRvb2xzLmRyYXdSZWN0YW5nbGUoKGV4dGVudDogTlBNYXBMaWIuR2VvbWV0cnkuRXh0ZW50LCBnZW9tZXRyeTogTlBNYXBMaWIuR2VvbWV0cnkuUG9seWdvbikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2FsbEJhY2tNZXRob2QpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxCYWNrTWV0aG9kKHRoaXMuZ2V0U2VsZWN0UG9pbnRzKGdlb21ldHJ5KSwgZ2VvbWV0cnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgc3R5bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdENpcmNsZShjYWxsQmFja01ldGhvZD86IChwb2ludHM6IEFycmF5PFN5c3RlbVBvaW50PiwgZ2VvbWV0cnk6IE5QTWFwTGliLkdlb21ldHJ5LkNpcmNsZSkgPT4gdm9pZCwgc3R5bGU/OiBDaXJjbGVTdHlsZSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubWFwVG9vbHMuZHJhd0NpcmNsZSgoZXh0ZW50OiBOUE1hcExpYi5HZW9tZXRyeS5FeHRlbnQsIGdlb21ldHJ5OiBOUE1hcExpYi5HZW9tZXRyeS5DaXJjbGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNhbGxCYWNrTWV0aG9kKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsQmFja01ldGhvZCh0aGlzLmdldFNlbGVjdFBvaW50cyhnZW9tZXRyeSksIGdlb21ldHJ5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHN0eWxlKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVPdmVybGF5KG92ZXJsYXk6IE5QTWFwTGliLk92ZXJsYXkpIHtcclxuICAgICAgICB0aGlzLm1hcFRvb2xzLnJlbW92ZU92ZXJsYXkob3ZlcmxheSk7XHJcbiAgICAgICAgdGhpcy5tYXAucmVtb3ZlT3ZlcmxheShvdmVybGF5KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFRPRE9cclxuICAgIGRyYXdDaXJjbGVCeURpYW1ldGVyKGNhbGxCYWNrTWV0aG9kPzogRnVuY3Rpb24pOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY2FuY2VsRHJhdygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUNpcmNsZVNlYXJjaENvbnRyb2woKTtcclxuICAgICAgICB0aGlzLm1hcFRvb2xzLmNhbmNlbERyYXcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+W+l3NlbGVjdOaTjeS9nOmAieS4reeahOeCueS9jVxyXG4gICAgICogQHBhcmFtIGdlb21ldHJ5XHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0U2VsZWN0UG9pbnRzKGdlb21ldHJ5OiBOUE1hcExpYi5HZW9tZXRyeSk6IEFycmF5PFN5c3RlbVBvaW50PiB7XHJcbiAgICAgICAgbGV0IHBvaW50cyA9IHRoaXMuY2x1c3Rlck1hcmtlckZhY3RvcnkuZ2V0UG9pbnRzKCkgfHwgW107XHJcbiAgICAgICAgLy8gbGV0IGksIGxlbiwgcmVzdWx0OiBBcnJheTxTeXN0ZW1Qb2ludD4gPSBbXTtcclxuICAgICAgICBsZXQgaSwgbGVuLCByZXN1bHQ6IEFycmF5PFN5c3RlbVBvaW50PiA9IFtdO1xyXG4gICAgICAgIGxldCBvdmVybGF5TGF5ZXIgPSB0aGlzLm1hcC5nZXRMYXllckJ5TmFtZShDbHVzdGVyTGF5ZXJOYW1lKSBhcyBPdmVybGF5TGF5ZXI7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImdldEJvdW5kcygpXCIsZ2VvbWV0cnkuZ2V0Qm91bmRzKCksIGdlb21ldHJ5LmdldEV4dGVudCgpKTtcclxuICAgICAgICBvdmVybGF5TGF5ZXIuY29udGFpbkZlYXR1cmVzKGdlb21ldHJ5LCAobWFya2VyOiBDbHVzdGVyTWFya2VyRXgpID0+IHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgSUQ6IG1hcmtlci5JRCxcclxuICAgICAgICAgICAgICAgIERlc2NycHRpb246IG1hcmtlci5EZXNjcnB0aW9uLFxyXG4gICAgICAgICAgICAgICAgTGF5ZXJUeXBlOiBtYXJrZXIubWFya1R5cGUsXHJcbiAgICAgICAgICAgICAgICBPYmplY3RJRDogbWFya2VyLk9iamVjdElELFxyXG4gICAgICAgICAgICAgICAgT2JqZWN0VHlwZTogbWFya2VyLk9iamVjdFR5cGUsXHJcbiAgICAgICAgICAgICAgICBMb246IG1hcmtlci5nZXRQb3NpdGlvbigpLmxvbixcclxuICAgICAgICAgICAgICAgIExhdDogbWFya2VyLmdldFBvc2l0aW9uKCkubGF0LFxyXG4gICAgICAgICAgICAgICAgT2JqZWN0U3RhdGU6IG1hcmtlci5PYmplY3RTdGF0ZSxcclxuICAgICAgICAgICAgICAgIE9iamVjdE5hbWU6IG1hcmtlci5PYmplY3ROYW1lLFxyXG4gICAgICAgICAgICAgICAgVGFza1N0YXR1czogbWFya2VyLlRhc2tTdGF0dXNcclxuICAgICAgICAgICAgfSBhcyBTeXN0ZW1Qb2ludCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUT0RPXHJcbiAgICBhZGRDaXJjbGVTZWFyY2hDb250cm9sKHBvaW50OiBhbnksIGNhbGxiYWNrOiBhbnksIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBzZWxmLnJlbW92ZUNpcmNsZVNlYXJjaENvbnRyb2woKTtcclxuICAgICAgICB0aGlzLm1hcFRvb2xzLmFkZENpcmNsZVNlYXJjaENvbnRyb2wocG9pbnQsIChyZXM6IE5QTWFwTGliLkdlb21ldHJ5KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soc2VsZi5nZXRTZWxlY3RQb2ludHMocmVzKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gc2VsZi5yZW1vdmVDaXJjbGVTZWFyY2hDb250cm9sKCk7XHJcbiAgICAgICAgfSwgbWluLCBtYXgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRPRE9cclxuICAgIHJlbW92ZUNpcmNsZVNlYXJjaENvbnRyb2woKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tYXBUb29scy5yZW1vdmVDaXJjbGVTZWFyY2hDb250cm9sKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJvlu7rkuIDkuKrnqpflj6MsIOi/lOWbnueql+WPo+eahOWUr+S4gOe8lueggVxyXG4gICAgICogQHBhcmFtIGxvblxyXG4gICAgICogQHBhcmFtIGxhdFxyXG4gICAgICogQHBhcmFtIGV2ZW50T3B0XHJcbiAgICAgKiBAcmV0dXJucyB7dXVpZDogc3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBjcmVhdGVJbmZvV2luZG93KGxvbjogbnVtYmVyLCBsYXQ6IG51bWJlciwgaW5mb1dpbmRvd09wdD86IEluZm9XaW5kb3dPcHRzKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgaW5mb1dpbmRvdyA9IEluZm9XaW5kb3dGYWN0b3J5LmdldEluZm9XaW5kb3cobmV3IE5QTWFwTGliLkdlb21ldHJ5LlBvaW50KGxvbiwgbGF0KSwgbnVsbCwgbnVsbCwgSW5mb1dpbmRvd0ZhY3RvcnkuZ2V0SW5mb1dpbmRvd09wdHMoaW5mb1dpbmRvd09wdCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluZm9XaW5kb3dGYWN0b3J5LmFkZEluZm9XaW5kb3coaW5mb1dpbmRvdyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SW5mb1dpbmRvd0J5SUQodXVpZDogc3RyaW5nKTogTlBNYXBMaWIuU3ltYm9scy5JbmZvV2luZG93IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbmZvV2luZG93RmFjdG9yeS5nZXRCeUlkKHV1aWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlSW5mb1dpbmRvdyh3aW5JZDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5tYXBBZGFwdGVyLmNsb3NlSW5mb1dpbmRvdyh0aGlzLmluZm9XaW5kb3dGYWN0b3J5LnJlbW92ZUluZm9XaW5kb3cod2luSWQpKTtcclxuICAgIH1cclxuXHJcbiAgICBvcGVuSW5mb1dpbmRvdyh3aW5JZDogc3RyaW5nLCBkb21IdG1sOiBIVE1MRG9jdW1lbnQsIGV2ZW50T3B0PzogSW5mb1dpbmRvd0V2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHdpbiA9IHRoaXMuaW5mb1dpbmRvd0ZhY3RvcnkuZ2V0QnlJZCh3aW5JZCk7XHJcbiAgICAgICAgdGhpcy5pbmZvV2luZG93RmFjdG9yeS5hZGRFdmVudExpc3RlbmVyKHdpbiwgd2luSWQsIGV2ZW50T3B0KTtcclxuICAgICAgICB0aGlzLm1hcEFkYXB0ZXIuYWRkT3ZlcmxheSh3aW4pO1xyXG4gICAgICAgIHdpbi5zZXRDb250ZW50RG9tKGRvbUh0bWwpO1xyXG4gICAgICAgIHdpbi5vcGVuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5riy5p+T5Y2V5Liq54K55L2N5Yiw5Zyw5Zu+5LitXHJcbiAgICByZW5kZXJNYXJrZXIocG9pbnQ6IFN5c3RlbVBvaW50KSB7XHJcbiAgICAgICAgaWYgKCFwb2ludCkgcmV0dXJuO1xyXG4gICAgICAgIC8vIHRoaXMuY2x1c3Rlck1hcmtlckZhY3RvcnkucmVtb3ZlUG9pbnRCeVBhcmFtcyhcIk9iamVjdElEXCIsIHBvaW50Lk9iamVjdElEKTtcclxuICAgICAgICB0aGlzLmNsdXN0ZXJNYXJrZXJGYWN0b3J5LmFkZFBvaW50KHBvaW50KTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hNYXJrZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1vY2tQb2ludHMocG9pbnRzOiBBcnJheTxTeXN0ZW1Qb2ludD4pOiBBcnJheTxTeXN0ZW1Qb2ludD4ge1xyXG4gICAgICAgIGlmIChwb2ludHMgJiYgcG9pbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy8g6ZqP5py65bCG5YW25Lit5Yeg5Liq5Y+Y5Li65Yir55qE54K55L2N57G75Z6LXHJcbiAgICAgICAgICAgIGxldCBpLCBsZW4sIG51bTtcclxuICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gcG9pbnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBudW0gPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobnVtID09PSAyIHx8IG51bSA9PT0gMyB8fCBudW0gPT09IDQgfHwgbnVtID09PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzW2ldLkxheWVyVHlwZSA9IFwiYmFsbFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcG9pbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyDliqDovb3ngrnkvY0g5Zu+5bGCIOimhueblueJqVxyXG4gICAgLyoqXHJcbiAgICAgKiDliqDovb3lnZDmoIfngrnkvY3liLDlnLDlm77kuK1cclxuICAgICAqIEBwYXJhbSBwb2ludHNcclxuICAgICAqIEBwYXJhbSBvcHRzXHJcbiAgICAgKi9cclxuICAgIHJlbmRlck1hcmtlcnMocG9pbnRzOiBBcnJheTxTeXN0ZW1Qb2ludD4sIG9wdHM/OiBPdmVybGF5TGF5ZXJPcHRzKTogYW55IHtcclxuICAgICAgICAvLyBUT0RPIOi/memHjOWPquaYr+S4uuS6huaooeaLn+S4jeWQjOeCueS9jeexu+Wei+eUqCwg562J5pGE5YOP5py654K55L2N55yf5q2j5pyJ5YW25LuW57G75Z6L5pe25L2/55So55qE5pe25YCZ6ZyA6KaB5rOo6YeK5o6J5LiL6Z2i55qE5Luj56CBIHJlc29sdmU6IHd5clxyXG4gICAgICAgIC8vIHBvaW50cyA9IHRoaXMubW9ja1BvaW50cyhwb2ludHMpO1xyXG4gICAgICAgIHRoaXMuY2x1c3Rlck1hcmtlckZhY3Rvcnkuc2V0UG9pbnRzKHBvaW50cyk7XHJcbiAgICAgICAgbGV0IGNsdXN0ZXJQb2ludHMgPSB0aGlzLmNsdXN0ZXJNYXJrZXJGYWN0b3J5LmdldENsdXN0ZXJQb2ludHMocG9pbnRzKTtcclxuICAgICAgICBsZXQgb3ZlcmxheUxheWVyID0gdGhpcy5tYXAuZ2V0TGF5ZXJCeU5hbWUoQ2x1c3RlckxheWVyTmFtZSk7XHJcbiAgICAgICAgaWYgKCFvdmVybGF5TGF5ZXIpIHtcclxuICAgICAgICAgICAgLy8g5riy5p+T5Yiw5Zyw5Zu+5LitXHJcbiAgICAgICAgICAgIG92ZXJsYXlMYXllciA9IG5ldyBOUE1hcExpYi5MYXllcnMuT3ZlcmxheUxheWVyKENsdXN0ZXJMYXllck5hbWUsIHRydWUsIE92ZXJsYXlGYWN0b3J5LmdldENsdXN0ZXJPdmVybGF5T3B0KG9wdHMpKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWFwLmFkZExheWVyKG92ZXJsYXlMYXllcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvdmVybGF5TGF5ZXIuYWRkT3ZlcmxheShjbHVzdGVyUG9pbnRzIGFzIE5QTWFwTGliLk92ZXJsYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRvdGFsUG9pbnRzKExheWVyVHlwZT86IHN0cmluZykge1xyXG4gICAgICAgIGxldCBwb2ludEFyckFsbDogQXJyYXk8U3lzdGVtUG9pbnQ+ID0gdGhpcy5tYXAuZ2V0TGF5ZXJCeU5hbWUoQ2x1c3RlckxheWVyTmFtZSkuZ2V0T3ZlcmxheXNCeVByb3BlcnR5KCksXHJcbiAgICAgICAgICAgIHBvaW50QXJyID0gW10gYXMgQXJyYXk8U3lzdGVtUG9pbnQ+O1xyXG4gICAgICAgIGlmIChMYXllclR5cGUpIHtcclxuICAgICAgICAgICAgcG9pbnRBcnJBbGwuZm9yRWFjaCgodmFsdWU6IFN5c3RlbVBvaW50LCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUuTGF5ZXJUeXBlID09IExheWVyVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50QXJyLnB1c2gocG9pbnRBcnJBbGxbaW5kZXhdKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwb2ludEFyciA9IHBvaW50QXJyQWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcG9pbnRBcnI7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0T3ZlcmxheVNob3dCeUxheWVyVHlwZShMYXllclR5cGU6IHN0cmluZywgc3R5bGU6IGJvb2xlYW4pIHtcclxuICAgICAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8YW55PjtcclxuICAgICAgICBpZiAoTGF5ZXJUeXBlID09ICdhbGwnKSB7XHJcbiAgICAgICAgICAgIGFyciA9IHRoaXMuZ2V0VG90YWxQb2ludHMoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhcnIgPSB0aGlzLmdldFRvdGFsUG9pbnRzKExheWVyVHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFyci5mb3JFYWNoKChpdGVtOiBhbnksIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBtYXJrZXIgPSBpdGVtIGFzIE5QTWFwTGliLlN5bWJvbHMuTWFya2VyO1xyXG4gICAgICAgICAgICBpZiAoc3R5bGUpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc2V0VmlzaWJsZSh0cnVlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5zZXRWaXNpYmxlKGZhbHNlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAdGl0bGXmt7vliqDlnLDlm77ngrnkvY3ov57nur8o5LmL5ZCO5Lya6IOM6L2o6L+56KaG55uWKVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxheWVyTmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGdyb3VwTmFtZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxTeXN0ZW1Qb2ludD59IHBvaW50c1xyXG4gICAgICogQHBhcmFtIHtQb2x5bGluZVN0eWxlfSBvcHRzXHJcbiAgICAgKi9cclxuICAgIGFkZE92ZXJsYXlzRm9yTGluZShsYXllck5hbWU6IHN0cmluZywgZ3JvdXBOYW1lOiBzdHJpbmcsIHBvaW50czogQXJyYXk8U3lzdGVtUG9pbnQ+LCBvcHRzPzogUG9seWxpbmVTdHlsZSkge1xyXG4gICAgICAgIGxldCBsYXllciA9IHRoaXMubWFwLmdldExheWVyQnlOYW1lKGxheWVyTmFtZSk7XHJcbiAgICAgICAgbGF5ZXIuc2V0WkluZGV4KDIwMCk7XHJcbiAgICAgICAgbGV0IGdyb3VwID0gbGF5ZXIuZ2V0R3JvdXBCeU5hbWUoZ3JvdXBOYW1lKTtcclxuICAgICAgICBpZiAoIWdyb3VwKSB7XHJcbiAgICAgICAgICAgIGdyb3VwID0gbGF5ZXIuYWRkR3JvdXAoZ3JvdXBOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PE5QTWFwTGliLkdlb21ldHJ5LlBvaW50PjtcclxuICAgICAgICBwb2ludHMuZm9yRWFjaCgoaXRlbTogU3lzdGVtUG9pbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGFyci5wdXNoKHsgbGF0OiBpdGVtLkxhdCwgbG9uOiBpdGVtLkxvbiB9IGFzIE5QTWFwTGliLkdlb21ldHJ5LlBvaW50KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IHBvbHlsaW5lID0gbmV3IE5QTWFwTGliLkdlb21ldHJ5LlBvbHlsaW5lKGFyciwgb3B0cyk7XHJcbiAgICAgICAgZ3JvdXAuYWRkT3ZlcmxheShwb2x5bGluZSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlck92ZXJsYXlMYXllcihsYXllck5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBsYXllciA9IHRoaXMubWFwLmdldExheWVyQnlOYW1lKGxheWVyTmFtZSk7XHJcbiAgICAgICAgaWYgKCFsYXllcikge1xyXG4gICAgICAgICAgICBsZXQgb3ZlcmxheUxheWVyTWFya2VyczogTlBNYXBMaWIuTGF5ZXJzLk92ZXJsYXlMYXllciA9IG5ldyBOUE1hcExpYi5MYXllcnMuT3ZlcmxheUxheWVyKGxheWVyTmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLmFkZExheWVyKG92ZXJsYXlMYXllck1hcmtlcnMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE8g5qCH5rOo5re75Yqg5Zyo5Zu+5bGC5ZCN5ZKM57uE5ZCN5LiL5L6/5LqO5riF5qWaIGZsYWflkoxsYWJsZXPnlKjkuo7oh6rlrprkuYnlnLDlm77moIfms6jmloflrZdcclxuICAgIC8qKlxyXG4gICAgICogQHRpdGxlIOaJuemHj+a3u+WKoOWcsOWbvuagh+azqFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxheWVyTmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGdyb3VwTmFtZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxTeXN0ZW1Qb2ludD59IHBvaW50c1xyXG4gICAgICogQHBhcmFtIHtNYXJrZXJzT3B0c30gb3B0c1xyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBmbGFnXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PGFueT59IGxhYmVsc1xyXG4gICAgICovXHJcbiAgICBhZGRPdmVybGF5c0Zvck1ha2VycyhsYXllck5hbWU6IHN0cmluZywgZ3JvdXBOYW1lOiBzdHJpbmcsIHBvaW50czogQXJyYXk8U3lzdGVtUG9pbnQ+LCBvcHRzPzogTWFya2Vyc09wdHMsIGZsYWc/OiBib29sZWFuLCBsYWJlbHM/OiBBcnJheTxhbnk+KSB7XHJcbiAgICAgICAgbGV0IGxheWVyID0gdGhpcy5tYXAuZ2V0TGF5ZXJCeU5hbWUobGF5ZXJOYW1lKTtcclxuICAgICAgICBsZXQgZ3JvdXAgPSBsYXllci5nZXRHcm91cEJ5TmFtZShncm91cE5hbWUpO1xyXG4gICAgICAgIGlmICghZ3JvdXApIHtcclxuICAgICAgICAgICAgZ3JvdXAgPSBsYXllci5hZGRHcm91cChncm91cE5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYXJyTWFya2VycyA9IFtdIGFzIEFycmF5PE5QTWFwTGliLk92ZXJsYXk+O1xyXG4gICAgICAgIGxldCBpY29uVVJMID0gb3B0cy5pY29uVVJMIHx8ICcvaW1hZ2VzL21hcC9ub3JtYWwtYmx1ZS5wbmcnO1xyXG4gICAgICAgIHBvaW50cy5mb3JFYWNoKChpdGVtOiBTeXN0ZW1Qb2ludCwgaTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9pbnQgPSB7fSBhcyBOUE1hcExpYi5HZW9tZXRyeS5Qb2ludDtcclxuICAgICAgICAgICAgICAgIHBvaW50LmxhdCA9IGl0ZW0uTGF0O1xyXG4gICAgICAgICAgICAgICAgcG9pbnQubG9uID0gaXRlbS5Mb247XHJcbiAgICAgICAgICAgICAgICBsZXQgaWNvbiA9IG5ldyBOUE1hcExpYi5TeW1ib2xzLkljb24oaWNvblVSTCwgbmV3IE5QTWFwTGliLkdlb21ldHJ5LlNpemUoMzIsIDMyKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGFuY2hvcjogbmV3IE5QTWFwTGliLkdlb21ldHJ5LlNpemUoLTE5LCAtMjMpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGxldCBtYXJrZXIgPSBuZXcgTlBNYXBMaWIuU3ltYm9scy5NYXJrZXIocG9pbnQsIHtcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBpY29uLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBvcHRzLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvdGF0aW9uOiBvcHRzLnJvdGF0aW9uXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGxldCBsYWJsZTogTlBNYXBMaWIuU3ltYm9scy5MYWJlbDtcclxuICAgICAgICAgICAgICAgIGlmIChmbGFnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFibGUgPSBuZXcgTlBNYXBMaWIuU3ltYm9scy5MYWJlbChsYWJlbHNbaV0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiBwb2ludCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJvZmZzZXRcIjogbmV3IE5QTWFwTGliLkdlb21ldHJ5LlNpemUoLTMsIDEyKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJsZSA9IG5ldyBOUE1hcExpYi5TeW1ib2xzLkxhYmVsKGkgKyAxICsgJycsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiBwb2ludCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJvZmZzZXRcIjogbmV3IE5QTWFwTGliLkdlb21ldHJ5LlNpemUoLTMsIDEyKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGFibGUuc2V0U3R5bGUoeyBmb250U2l6ZTogMTIsIGZvbnRGYW1pbHk6ICdBcmFpbCcsIGNvbG9yOiAnd2hpdGUnLCBhbGlnbjogJ2NlbnRlcicsIGlzQm9sZDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIG1hcmtlci5zZXRMYWJlbChsYWJsZSk7XHJcbiAgICAgICAgICAgICAgICBtYXJrZXIuc2V0RGF0YSh7IGlkOiBpdGVtLklELCBPYmplY3RJRDogaXRlbS5PYmplY3RJRCwgcmVzdWx0SUQ6IGl0ZW0ucmVzdWx0SUQgfSk7XHJcbiAgICAgICAgICAgICAgICBhcnJNYXJrZXJzLnB1c2gobWFya2VyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGdyb3VwLmFkZE92ZXJsYXlzKGFyck1hcmtlcnMgYXMgQXJyYXk8TlBNYXBMaWIuT3ZlcmxheT4pO1xyXG4gICAgICAgIGxldCBhcnIgPSBncm91cC5nZXRBbGxPdmVybGF5ZXJzKCk7XHJcbiAgICAgICAgYXJyLmZvckVhY2goKG1hcmtlcjogTlBNYXBMaWIuU3ltYm9scy5NYXJrZXIsIGk6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmJpbmRNYWtlcnNFdmVudChtYXJrZXIsIG9wdHMpO1xyXG4gICAgICAgICAgICBtYXJrZXIuc2V0WkluZGV4KGkgKyAxKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHRpdGxlIOe7keWumuWcsOWbvuagh+azqOS6i+S7tlxyXG4gICAgICogQHBhcmFtIHtOUE1hcExpYi5TeW1ib2xzLk1hcmtlcn0gbWFya2VyXHJcbiAgICAgKiBAcGFyYW0ge01hcmtlcnNPcHRzfSBvcHRzXHJcbiAgICAgKi9cclxuICAgIGJpbmRNYWtlcnNFdmVudChtYXJrZXI6IE5QTWFwTGliLlN5bWJvbHMuTWFya2VyLCBvcHRzPzogTWFya2Vyc09wdHMpIHtcclxuICAgICAgICBpZiAodHlwZW9mIG9wdHMuY2xpY2sgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICBtYXJrZXIuYWRkRXZlbnRMaXN0ZW5lcihOUE1hcExpYi5NQVJLRVJfRVZFTlRfQ0xJQ0ssIChldnQ6IENsdXN0ZXJNYXJrZXJFeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgb3B0cy5jbGljayhldnQpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0cy5tb3VzZU92ZXIgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICBtYXJrZXIuYWRkRXZlbnRMaXN0ZW5lcihOUE1hcExpYi5NQVJLRVJfRVZFTlRfTU9VU0VfT1ZFUiwgKGV2dDogQ2x1c3Rlck1hcmtlckV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvcHRzLm1vdXNlT3ZlcihldnQpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0cy5tb3VzZU91dCA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIG1hcmtlci5hZGRFdmVudExpc3RlbmVyKE5QTWFwTGliLk1BUktFUl9FVkVOVF9NT1VTRV9PVVQsIChldnQ6IENsdXN0ZXJNYXJrZXJFeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgb3B0cy5tb3VzZU91dChldnQpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0cy5kcmFnU3RhcnQgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICBtYXJrZXIuYWRkRXZlbnRMaXN0ZW5lcihOUE1hcExpYi5NQVJLRVJfRVZFTlRfRFJBR19TVEFSVCwgKGV2dDogQ2x1c3Rlck1hcmtlckV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvcHRzLmRyYWdTdGFydChldnQpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0cy5kcmFnRW5kID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgbWFya2VyLmFkZEV2ZW50TGlzdGVuZXIoTlBNYXBMaWIuTUFSS0VSX0VWRU5UX0RSQUdfRU5ELCAoZXZ0OiBDbHVzdGVyTWFya2VyRXgpID0+IHtcclxuICAgICAgICAgICAgICAgIG9wdHMuZHJhZ0VuZChldnQpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHRpdGxlIOa4healmue+pOe7hOWSjOWbvuWxglxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxheWVyTmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGdyb3VwTmFtZVxyXG4gICAgICovXHJcbiAgICByZW1vdmVPdmVybGF5c0J5TmFtZShsYXllck5hbWU6IHN0cmluZywgZ3JvdXBOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgbGF5ZXIgPSB0aGlzLm1hcC5nZXRMYXllckJ5TmFtZShsYXllck5hbWUpO1xyXG4gICAgICAgIGlmIChsYXllcikge1xyXG4gICAgICAgICAgICBsZXQgZ3JvdXAgPSBsYXllci5nZXRHcm91cEJ5TmFtZShncm91cE5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoZ3JvdXApIHtcclxuICAgICAgICAgICAgICAgIGdyb3VwLnJlbW92ZUFsbE92ZXJsYXlzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tYXAucmVtb3ZlT3ZlcmxheShsYXllcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHRpdGxlIOagh+azqOaYr+eUqOadpee7keWumuajgOe0oue7k+aenOeahO+8jOWbnuWinuWKoFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxheWVyTmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGdyb3VwTmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IElEXHJcbiAgICAgKiBAcmV0dXJuIHtOUE1hcExpYi5TeW1ib2xzLk1hcmtlcn1cclxuICAgICAqL1xyXG4gICAgZ2V0TWFya2VyRm9ySUQobGF5ZXJOYW1lOiBzdHJpbmcsIGdyb3VwTmFtZTogc3RyaW5nLCBJRDogc3RyaW5nKTogTlBNYXBMaWIuU3ltYm9scy5NYXJrZXIge1xyXG4gICAgICAgIGxldCBsYXllciA9IHRoaXMubWFwLmdldExheWVyQnlOYW1lKGxheWVyTmFtZSk7XHJcbiAgICAgICAgbGV0IGdyb3VwID0gbGF5ZXIuZ2V0R3JvdXBCeU5hbWUoZ3JvdXBOYW1lKTtcclxuICAgICAgICBsZXQgYXJyTWFya3MgPSBncm91cC5nZXRBbGxPdmVybGF5ZXJzKCk7XHJcbiAgICAgICAgbGV0IG1hcmtlcjogTlBNYXBMaWIuU3ltYm9scy5NYXJrZXI7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJNYXJrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbSA9IGFyck1hcmtzW2ldIGFzIE5QTWFwTGliLlN5bWJvbHMuTWFya2VyO1xyXG4gICAgICAgICAgICBsZXQgcyA9IG0uZ2V0RGF0YSgpIGFzIGFueTtcclxuICAgICAgICAgICAgaWYgKElEID09PSBzLnJlc3VsdElEKSB7XHJcbiAgICAgICAgICAgICAgICBtYXJrZXIgPSBtO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1hcmtlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEB0aXRsZSBzZXRNYXJrSWNvbuWIm+W7uuagh+azqOWbvuagh+WvueixoVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxheWVyTmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGdyb3VwTmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IElEXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHpJbmRleFxyXG4gICAgICovXHJcbiAgICBzZXRNYXJrZXJJY29uKGxheWVyTmFtZTogc3RyaW5nLCBncm91cE5hbWU6IHN0cmluZywgSUQ6IHN0cmluZywgcGF0aDogc3RyaW5nLCB6SW5kZXg/OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbWFya2VyID0gdGhpcy5nZXRNYXJrZXJGb3JJRChsYXllck5hbWUsIGdyb3VwTmFtZSwgSUQpO1xyXG4gICAgICAgIGlmIChtYXJrZXIpIHtcclxuICAgICAgICAgICAgbWFya2VyLnNldEljb24oXHJcbiAgICAgICAgICAgICAgICBuZXcgTlBNYXBMaWIuU3ltYm9scy5JY29uKFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IE5QTWFwTGliLkdlb21ldHJ5LlNpemUoMzIsIDMyKSxcclxuICAgICAgICAgICAgICAgICAgICB7IGFuY2hvcjogbmV3IE5QTWFwTGliLkdlb21ldHJ5LlNpemUoLTE5LCAtMjMpIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB6SW5kZXggPT09ICdudW1iZXInKSBtYXJrZXIuc2V0WkluZGV4KHpJbmRleCArIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+eDreWKm+WbvlxyXG4gICAgYWRkaGVhdGxheWVyKHBvaW50czogQXJyYXk8U3lzdGVtUG9pbnQ+IHwgYW55LCBvcHRzPzogT3ZlcmxheUxheWVyT3B0cykge1xyXG4gICAgICAgIGxldCBkYXRhc2V0ID0ge1xyXG4gICAgICAgICAgICBtYXg6IDIzLFxyXG4gICAgICAgICAgICBkYXRhOiBbXSBhcyBBcnJheTx7IGxvbjogbnVtYmVyLCBsYXQ6IG51bWJlciwgY291bnQ6IG51bWJlciB9PlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcG9pbnRzLmZvckVhY2goZnVuY3Rpb24gKGk6IGFueSkge1xyXG4gICAgICAgICAgICBkYXRhc2V0LmRhdGEucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBsb246IGkubG9uLFxyXG4gICAgICAgICAgICAgICAgbGF0OiBpLmxhdCxcclxuICAgICAgICAgICAgICAgIGNvdW50OiBpLmNvdW50XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IG9wdCA9IHtcclxuICAgICAgICAgICAgaXNCYXNlTGF5ZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICBvcGFjaXR5OiAxLjAsXHJcbiAgICAgICAgICAgIHByb2plY3Rpb246ICdFUFNHOjkwMDkxMycsXHJcbiAgICAgICAgICAgIHZpc2libGU6IHRydWUsXHJcbiAgICAgICAgICAgIHJhZGl1czogMjBcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICh0aGlzLm1hcC5nZXRMYXllckJ5TmFtZSgnaGVhdExheWVyJykpIHtcclxuICAgICAgICAgICAgbGV0IGxheWVyID0gdGhpcy5tYXAuZ2V0TGF5ZXJCeU5hbWUoJ2hlYXRMYXllcicpO1xyXG4gICAgICAgICAgICBsYXllci5zZXREYXRhc2V0KGRhdGFzZXQpO1xyXG4gICAgICAgICAgICAvLyBsYXllci5yZWZyZXNoKClcclxuICAgICAgICAgICAgLy8gdGhpcy5tYXAucmVtb3ZlTGF5ZXJCeU5hbWUobGF5ZXIuZ2V0TmFtZSgpKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBoZWF0TGF5ZXIgPSBuZXcgTlBNYXBMaWIuTGF5ZXJzLkhlYXRNYXBMYXllcihcImhlYXRMYXllclwiLCBvcHQpO1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5hZGRMYXllcihoZWF0TGF5ZXIpO1xyXG4gICAgICAgICAgICBoZWF0TGF5ZXIuc2V0RGF0YXNldChkYXRhc2V0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnp7vpmaTljZXkuKrngrnkvY1cclxuICAgICAqIEBwYXJhbSBwb2ludFxyXG4gICAgICovXHJcbiAgICByZW1vdmVNYXJrZXIocG9pbnQ6IFN5c3RlbVBvaW50KTogYW55IHtcclxuICAgICAgICBpZiAoIXBvaW50KSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jbHVzdGVyTWFya2VyRmFjdG9yeS5yZW1vdmVQb2ludEJ5UGFyYW1zKFwiT2JqZWN0SURcIiwgcG9pbnQuT2JqZWN0SUQpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaE1hcmtlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZU1hcmtlcnMocG9pbnRzOiBBcnJheTxTeXN0ZW1Qb2ludD4pOiBhbnkge1xyXG4gICAgICAgIGlmICghcG9pbnRzKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jbHVzdGVyTWFya2VyRmFjdG9yeS5yZW1vdmVQb2ludEJ5UG9pbnRzKHBvaW50cyk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoTWFya2VyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWZyZXNoTWFya2VyKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIOeUseS6jmdpc+WcsOWbvuaciWJ1Zywg5LiN6IO95Yqo5oCB5aKe5Yqg5Yig6Zmk6IGa5ZCI54K55L2NLCDmiYDku6XlnKjluIPngrnnmoTml7blgJkg6ZyA6KaB56e76Zmk6IGa5ZCI5a+56LGh5YaN6L+b6KGM6IGa5ZCI55qE5pi+56S6XHJcbiAgICAgICAgbGV0IGxheWVyID0gdGhpcy5tYXAuZ2V0TGF5ZXJCeU5hbWUoQ2x1c3RlckxheWVyTmFtZSkgYXMgT3ZlcmxheUxheWVyO1xyXG5cclxuICAgICAgICBpZiAobGF5ZXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsYXllci5yZW1vdmVBbGxPdmVybGF5cygpO1xyXG4gICAgICAgICAgICAvL2xheWVyLmFkZE92ZXJsYXkodGhpcy5jbHVzdGVyTWFya2VyRmFjdG9yeS5nZXRDbHVzdGVyUG9pbnRzKHRoaXMuY2x1c3Rlck1hcmtlckZhY3RvcnkuZ2V0UG9pbnRzKCkpKTtcclxuICAgICAgICAgICAgbGF5ZXIuYWRkT3ZlcmxheSh0aGlzLmNsdXN0ZXJNYXJrZXJGYWN0b3J5LmdldENsdXN0ZXJQb2ludHModGhpcy5jbHVzdGVyTWFya2VyRmFjdG9yeS5nZXRQb2ludHMoKSkgYXMgTlBNYXBMaWIuT3ZlcmxheSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldExheWVyKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmdldExheWVyKG51bSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWumuS9jeWvueixoWlk5omA5Zyo55qE5Zyw5Zu+54K55L2NXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0SWRcclxuICAgICAqIEBwYXJhbSB6b29tXHJcbiAgICAgKiBUT0RPOiDmmK/lkKbngrnkvY3ov5vooYzpl6rng4HlvoXliqAgcmVzb2x2ZTogd3lyXHJcbiAgICAgKi9cclxuICAgIGxvY2F0aW9uTWFya2VyKG9iamVjdElkOiBzdHJpbmcsIHpvb20/OiBudW1iZXIpOiBhbnkge1xyXG4gICAgICAgIC8vIOagueaNrm1hcmtlcklk5ZKMbWFya2VyVHlwZeaJvuWIsOe8k+WtmOS4reeahOeCuVxyXG4gICAgICAgIGxldCBwb2ludCA9IHRoaXMuY2x1c3Rlck1hcmtlckZhY3RvcnkuZ2V0U3lzdGVtUG9pbnRCeUlEKG9iamVjdElkKTtcclxuICAgICAgICBsZXQgbWF4Wm9vbTogbnVtYmVyO1xyXG4gICAgICAgIGlmIChwb2ludCkge1xyXG4gICAgICAgICAgICBtYXhab29tID0gdGhpcy5tYXBBZGFwdGVyLmdldE1heFpvb20oKTtcclxuICAgICAgICAgICAgaWYgKHpvb20gJiYgbWF4Wm9vbSA+IHpvb20pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFwQWRhcHRlci5jZW50ZXJBbmRab29tKHRoaXMubWFwQWRhcHRlci5nZXRQb2ludChwb2ludC5Mb24sIHBvaW50LkxhdCksIHpvb20pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBBZGFwdGVyLmNlbnRlckFuZFpvb20odGhpcy5tYXBBZGFwdGVyLmdldFBvaW50KHBvaW50LkxvbiwgcG9pbnQuTGF0KSwgbWF4Wm9vbSAtIDMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOWumuS9jeaIkOWKn1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDlrprkvY3lpLHotKVcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobnVsbCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qLS0tLS0tLS0tLS0tLS1wcml2YXRlIHBhcmFtcy0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuICAgIHByaXZhdGUgbWFwOiBOUE1hcExpYi5NYXAgfCBhbnkgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBtYXBJZDogc3RyaW5nID0gbnVsbDtcclxuICAgIHByaXZhdGUgY2x1c3Rlck1hcmtlckZhY3Rvcnk6IENsdXN0ZXJNYXJrZXJGYWN0b3J5ID0gbnVsbDtcclxuICAgIHByaXZhdGUgbWFwQWRhcHRlcjogTWFwQWRhcHRlcjtcclxuICAgIHByaXZhdGUgaW5mb1dpbmRvd0ZhY3Rvcnk6IEluZm9XaW5kb3dGYWN0b3J5ID0gbnVsbDtcclxuICAgIHByaXZhdGUgbG9jYXRlTW91c2VFdmVudFV0aWw6IExvY2F0ZU1vdXNlRXZlbnRVdGlsO1xyXG4gICAgcHJpdmF0ZSB0cmFjZUFuYWx5emVGYWN0b3J5OiBUcmFjZUFuYWx5emVGYWN0b3J5O1xyXG4gICAgcHJpdmF0ZSBtYXBUb29sczogTWFwVG9vbEJhcjtcclxuICAgIHByaXZhdGUgZGVmYXVsdE9wdGlvbnMgPSB7XHJcbiAgICAgICAgLy/mmK/lkKbmt7vliqDpubDnnLxcclxuICAgICAgICBvdmVydmlld1Nob3c6IHRydWUsXHJcbiAgICAgICAgLy/mmK/lkKblr7zoiKrmnaFcclxuICAgICAgICBuYXZpZ2F0aW9uU2hvdzogZmFsc2UsXHJcbiAgICAgICAgLy/mmK/lkKbmr5TkvovlsLpcclxuICAgICAgICBzY2FsZVNob3c6IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgLyotLS0tLS0tLS0tLS0tLXByaXZhdGUgcGFyYW1zIGVuZC0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuICAgIG1lYXN1cmVUb29sOk5QTWFwTGliLlRvb2xzLk1lYXN1cmVUb29sO1xyXG4gICAgaW5pdChtYXBJZDogc3RyaW5nLCBfbWFwQ29uZmlnOiBNYXBDb25maWdNb2RlbCkge1xyXG4gICAgICAgIHRoaXMubWFwSWQgPSBtYXBJZDtcclxuICAgICAgICBsZXQgbWFwQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobWFwSWQpO1xyXG4gICAgICAgIGxldCBtYXBDb25maWcgPSBfbWFwQ29uZmlnO1xyXG4gICAgICAgIHRoaXMubWFwQ29uZmlnID0gX21hcENvbmZpZ1xyXG4gICAgICAgIC8vIOWIneWni+WMluWbvuWxglxyXG4gICAgICAgIC8vIOWIneWni+WMluWcsOWbvlxyXG4gICAgICAgIHRoaXMubWFwID0gbmV3IE5QTWFwTGliLk1hcChtYXBDb250YWluZXIsIG1hcENvbmZpZy5tYXBPcHRzKTtcclxuICAgICAgICAvLyBsZXQgQmFzZU1hcENvbmZpZyA9ICBuZXcgTWFwUGxhdEZvcm0uQmFzZS5NYXBDb25maWcoKSBhcyBhbnk7XHJcbiAgICAgICAgLy8gdGhpcy5tYXAgPSBCYXNlTWFwQ29uZmlnLmNyZWF0ZU1hcChtYXBDb250YWluZXIsbWFwQ29uZmlnKTtcclxuICAgICAgICB0aGlzLm1hcEFkYXB0ZXIgPSBuZXcgTWFwQWRhcHRlcih0aGlzLm1hcCk7XHJcbiAgICAgICAgdGhpcy5jbHVzdGVyTWFya2VyRmFjdG9yeSA9IG5ldyBDbHVzdGVyTWFya2VyRmFjdG9yeSh0aGlzLm1hcEFkYXB0ZXIpO1xyXG4gICAgICAgIHRoaXMuaW5mb1dpbmRvd0ZhY3RvcnkgPSBuZXcgSW5mb1dpbmRvd0ZhY3RvcnkoKTtcclxuICAgICAgICB0aGlzLnRyYWNlQW5hbHl6ZUZhY3RvcnkgPSBuZXcgVHJhY2VBbmFseXplRmFjdG9yeSh0aGlzLm1hcEFkYXB0ZXIpO1xyXG4gICAgICAgIHRoaXMubWFwVG9vbHMgPSBuZXcgTWFwVG9vbEJhcihuZXcgTWFwUGxhdEZvcm0uQmFzZS5NYXBUb29scyh0aGlzLm1hcCksIHRoaXMubWFwQWRhcHRlcik7XHJcbiAgICAgICAgdGhpcy5tZWFzdXJlVG9vbCA9IG5ldyBOUE1hcExpYi5Ub29scy5NZWFzdXJlVG9vbCh0aGlzLm1hcC5pZCx7XHJcbiAgICAgICAgICAgIGxlbmd0aFVuaXQ6TlBNYXBMaWIuTUFQX1VOSVRTX01FVEVSUyxcclxuICAgICAgICAgICAgYXJlYVVuaXQ6TlBNYXBMaWIuTUFQX1VOSVRTX1NRVUFSRV9LSUxPTUVURVJTLFxyXG4gICAgICAgICAgICBtb2RlOiBOUE1hcExpYi5NRUFTVVJFX01PREVfRElTVEFOQ0VcclxuICAgICAgICB9IGFzIElNZWFzdXJlVG9vbE9wdGlvbnMpO1xyXG4gICAgICAgIGxldCBjdHJsID0gbmV3IE5QTWFwTGliLkNvbnRyb2xzLk1vdXNlUG9zaXRpb25Db250cm9sKCk7XHJcbiAgICAgICAgdGhpcy5tYXBBZGFwdGVyLmFkZENvbnRyb2woY3RybCk7XHJcbiAgICAgICAgLy8g5Yqg6L295Zyw5Zu+5bGV56S655So55qE5Zu+5bGCXHJcbiAgICAgICAgTWFwQmFzZUxheWVyVXRpbC5pbml0TWFwbGF5ZXIodGhpcy5tYXAsIG1hcENvbmZpZyk7XHJcblxyXG4gICAgICAgIHRoaXMubWFwQWRhcHRlci5jZW50ZXJBbmRab29tKHRoaXMubWFwQWRhcHRlci5nZXRQb2ludChtYXBDb25maWcubWFwT3B0cy5jZW50ZXJQb2ludFswXSwgbWFwQ29uZmlnLm1hcE9wdHMuY2VudGVyUG9pbnRbMV0pLFxyXG4gICAgICAgICAgICBtYXBDb25maWcudmVjdG9yTGF5ZXJbMF0ubGF5ZXJPcHQubGF5ZXJJbmZvLmRlZmF1bHRab29tKTtcclxuICAgIH07XHJcblxyXG4gICAgc2V0QmFzZU1hcExheWVyKG1hcENvbmZpZzogTWFwQ29uZmlnTW9kZWwsIHR5cGU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBjZW50ZXJQb2ludCA9IHRoaXMubWFwLmdldENlbnRlcigpO1xyXG4gICAgICAgIGxldCB6b29tID0gdGhpcy5tYXAuZ2V0Wm9vbSgpXHJcbiAgICAgICAgbGV0IGksIGxlbiwgYmFzZUxheWVyID0gW10sIHZlY3RvckxheWVySXRlbSwgYmFzZUxheWVySXRlbSwgbGF5ZXJUeXBlcztcclxuICAgICAgICBpZiAodHlwZSA9PSAnYmFzZU1hcFNhdGVsbGl0ZScpIHtcclxuICAgICAgICAgICAgdGhpcy5tYXAucmVtb3ZlTGF5ZXJCeU5hbWUoJ2Jhc2VNYXAyRCcpO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBtYXBDb25maWcuc2F0dGlsYXRlTGF5ZXIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZlY3RvckxheWVySXRlbSA9IG1hcENvbmZpZy5zYXR0aWxhdGVMYXllcltpXTtcclxuICAgICAgICAgICAgICAgIGxheWVyVHlwZXMgPSB2ZWN0b3JMYXllckl0ZW0ubGF5ZXJUeXBlLnNwbGl0KCcuJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGF5ZXJzOiBhbnkgPSBOUE1hcExpYi5MYXllcnM7XHJcbiAgICAgICAgICAgICAgICBiYXNlTGF5ZXJJdGVtID0gbmV3IGxheWVyc1tsYXllclR5cGVzW2xheWVyVHlwZXMubGVuZ3RoIC0gMV1dKHZlY3RvckxheWVySXRlbS5sYXllck9wdC51cmwsIHZlY3RvckxheWVySXRlbS5sYXllck5hbWUsIHZlY3RvckxheWVySXRlbS5sYXllck9wdCk7XHJcbiAgICAgICAgICAgICAgICBiYXNlTGF5ZXIucHVzaChiYXNlTGF5ZXJJdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1hcC5hZGRMYXllcnMoYmFzZUxheWVyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5yZW1vdmVMYXllckJ5TmFtZSgnYmFzZU1hcFNhdGVsbGl0ZScpO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBtYXBDb25maWcudmVjdG9yTGF5ZXIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZlY3RvckxheWVySXRlbSA9IG1hcENvbmZpZy52ZWN0b3JMYXllcltpXTtcclxuICAgICAgICAgICAgICAgIGxheWVyVHlwZXMgPSB2ZWN0b3JMYXllckl0ZW0ubGF5ZXJUeXBlLnNwbGl0KCcuJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGF5ZXJzOiBhbnkgPSBOUE1hcExpYi5MYXllcnM7XHJcbiAgICAgICAgICAgICAgICBiYXNlTGF5ZXJJdGVtID0gbmV3IGxheWVyc1tsYXllclR5cGVzW2xheWVyVHlwZXMubGVuZ3RoIC0gMV1dKHZlY3RvckxheWVySXRlbS5sYXllck9wdC51cmwsIHZlY3RvckxheWVySXRlbS5sYXllck5hbWUsIHZlY3RvckxheWVySXRlbS5sYXllck9wdCk7XHJcbiAgICAgICAgICAgICAgICBiYXNlTGF5ZXIucHVzaChiYXNlTGF5ZXJJdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1hcC5hZGRMYXllcnMoYmFzZUxheWVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYXAuc2V0Q2VudGVyKHtcclxuICAgICAgICAgICAgbG9uOiBjZW50ZXJQb2ludC5sb24sXHJcbiAgICAgICAgICAgIGxhdDogY2VudGVyUG9pbnQubGF0XHJcbiAgICAgICAgfSwgem9vbSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmUgOavgeWcsOWbvlxyXG4gICAgICovXHJcbiAgICBkZXN0cm95KCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1hcEFkYXB0ZXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLm1hcEFkYXB0ZXIuZGVzdHJveU1hcCgpO1xyXG4gICAgICAgICAgICB0aGlzLm1hcCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMubWFwQWRhcHRlciA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuY2x1c3Rlck1hcmtlckZhY3RvcnkgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmluZm9XaW5kb3dGYWN0b3J5ID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5sb2NhdGVNb3VzZUV2ZW50VXRpbCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMubWFwVG9vbHMgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAodGhpcy50cmFjZUFuYWx5emVGYWN0b3J5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYWNlQW5hbHl6ZUZhY3RvcnkuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudHJhY2VBbmFseXplRmFjdG9yeSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBzdGFydExvY2F0ZShtc2c6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmxvY2F0ZU1vdXNlRXZlbnRVdGlsKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9jYXRlTW91c2VFdmVudFV0aWwgPSBuZXcgTG9jYXRlTW91c2VFdmVudFV0aWwodGhpcy5tYXBBZGFwdGVyLCB0aGlzLm1hcElkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmxvY2F0ZU1vdXNlRXZlbnRVdGlsLnN0YXJ0RHJhZyhtc2cpLnRoZW4oKHBvaW50OiBOUE1hcExpYi5HZW9tZXRyeS5Qb2ludCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcG9pbnQ7XHJcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZW5kTG9jYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIHRoaXMubG9jYXRlUmVqZWN0ID0gbnVsbDtcclxuICAgICAgICAvLyBUT0RPIGVuZExvY2F0ZeWPr+eUqOaAp+i/mOmcgOimgeajgOafpSByZXNvbHZlOiB3eXJcclxuICAgICAgICB0aGlzLm1hcEFkYXB0ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihOUE1hcExpYi5NQVBfRVZFTlRfQ0xJQ0spO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRNb3ZlTWFwKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubWFwQWRhcHRlci5hZGRIYW5kU3R5bGUoKVxyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZU1vdmVTdHlsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1hcEFkYXB0ZXIucmVtb3ZlSGFuZFN0eWxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Nb3VzZUNsaWNrKGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubWFwQWRhcHRlci5hZGRFdmVudExpc3RlbmVyKE5QTWFwTGliLk1BUF9FVkVOVF9DTElDSywgZnVuY3Rpb24gKHBvaW50OiBOUE1hcExpYi5HZW9tZXRyeS5Qb2ludCkge1xyXG4gICAgICAgICAgICBjYWxsYmFjayhwb2ludClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGdldFpvb20oKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXBBZGFwdGVyLmdldFpvb20oKVxyXG4gICAgfVxyXG5cclxuICAgIHNldENlbnRlcihwb2ludDogTlBNYXBMaWIuR2VvbWV0cnkuUG9pbnQsIHpvb206IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubWFwLnNldENlbnRlcihwb2ludCwgem9vbSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcG9pbnRUb1BpeGVsKHBvaW50OiBOUE1hcExpYi5HZW9tZXRyeS5Qb2ludCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5wb2ludFRvUGl4ZWwocG9pbnQpXHJcbiAgICB9XHJcblxyXG4gICAgcGl4ZWxUb1BvaW50KHBpeGVsOiBOUE1hcExpYi5HZW9tZXRyeS5QaXhlbCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5waXhlbFRvUG9pbnQocGl4ZWwpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2VudGVyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5nZXRDZW50ZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMYXllcnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLmdldEFsbExheWVycygpXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgfVxyXG59Il19
